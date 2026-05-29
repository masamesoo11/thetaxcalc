'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import {
  Briefcase,
  DollarSign,
  Percent,
  Info,
  BarChart3,
  ArrowRight,
  Building2,
  User,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AdSlot } from './ad-slot';
import { FAQSection, SELF_EMPLOYMENT_FAQS } from './faq-sections';
import {
  formatCurrency,
  formatPercent,
  roundCurrency,
  calculateFederalTax,
  calculateStateTax,
  calculateFICA,
} from '@/lib/finance-utils';
import {
  FICA_2026,
  FEDERAL_TAX_2026,
  STATE_PROFILES,
} from '@/lib/tax-config';
import { useHashParams, updateHashState } from '@/hooks/use-hash-state';

// ─── Types ──────────────────────────────────────────────────────────────────────

type FilingStatus = 'single' | 'married' | 'head_of_household';

const FILING_LABELS: Record<FilingStatus, string> = {
  single: 'Single',
  married: 'Married Filing Jointly',
  head_of_household: 'Head of Household',
};

const STATE_KEYS = ['illinois', 'texas', 'florida', 'california', 'newyork'] as const;
type StateKey = (typeof STATE_KEYS)[number];

// ─── Self-Employment Tax Constants (2026) ───────────────────────────────────────

const SE_SS_RATE = 0.124; // 12.4% Social Security
const SE_MEDICARE_RATE = 0.029; // 2.9% Medicare
const SE_ADDITIONAL_MEDICARE_RATE = 0.009; // 0.9% additional Medicare
const SE_ADDITIONAL_MEDICARE_THRESHOLD = 200000; // Same as employee threshold
const SE_TOTAL_RATE = 0.153; // 15.3% total

// ─── Calculation ────────────────────────────────────────────────────────────────

interface SelfEmploymentResult {
  netSEIncome: number;
  seTax: number;
  seSocialSecurity: number;
  seMedicare: number;
  seAdditionalMedicare: number;
  deductibleHalfSE: number;
  adjustedIncomeForFederal: number;
  federalTax: number;
  stateTax: number;
  totalTax: number;
  netIncomeAfterTax: number;
  effectiveTaxRate: number;
  quarterlyPayment: number;

  // Employee comparison
  employeeFICA: number;
  employeeFederalTax: number;
  employeeStateTax: number;
  employeeTotalTax: number;
  employeeNetIncome: number;
  employeeEffectiveRate: number;
  taxDifference: number;
}

function calculateSelfEmploymentTax(
  netSEIncome: number,
  filingStatus: FilingStatus,
  stateKey: string,
  retirement401k: number,
  businessExpenses: number
): SelfEmploymentResult {
  // Adjusted net SE income (subtract business expenses)
  const adjustedNetIncome = Math.max(0, netSEIncome - businessExpenses);

  // 92.35% of net SE income is subject to SE tax
  const seTaxableIncome = adjustedNetIncome * 0.9235;

  // Self-Employment Tax Calculation
  const ssWages = Math.min(seTaxableIncome, FICA_2026.socialSecurityWageCap);
  const seSocialSecurity = ssWages * SE_SS_RATE;
  const seMedicare = seTaxableIncome * SE_MEDICARE_RATE;
  const seAdditionalMedicare = seTaxableIncome > SE_ADDITIONAL_MEDICARE_THRESHOLD
    ? (seTaxableIncome - SE_ADDITIONAL_MEDICARE_THRESHOLD) * SE_ADDITIONAL_MEDICARE_RATE
    : 0;
  const seTax = seSocialSecurity + seMedicare + seAdditionalMedicare;

  // Deductible half of SE tax (above-the-line deduction)
  const deductibleHalfSE = seTax / 2;

  // Federal income tax
  // AGI = adjustedNetIncome - deductibleHalfSE - retirement401k
  const agi = Math.max(0, adjustedNetIncome - deductibleHalfSE - retirement401k);
  const federalTax = calculateFederalTax(agi, filingStatus);

  // State income tax
  const stateTaxableIncome = Math.max(0, adjustedNetIncome - retirement401k);
  const stateTax = calculateStateTax(stateTaxableIncome, stateKey, filingStatus);

  const totalTax = seTax + federalTax + stateTax;
  const netIncomeAfterTax = adjustedNetIncome - totalTax;
  const effectiveTaxRate = adjustedNetIncome > 0 ? totalTax / adjustedNetIncome : 0;
  const quarterlyPayment = totalTax / 4;

  // ─── Employee Comparison ─────────────────────────────────────────────────
  // For the same gross income as an employee
  const employeeFICA = calculateFICA(adjustedNetIncome);
  const employeeFederalTax = calculateFederalTax(
    Math.max(0, adjustedNetIncome - employeeFICA.socialSecurity - employeeFICA.medicare - retirement401k),
    filingStatus
  );
  const employeeStateTax = calculateStateTax(
    Math.max(0, adjustedNetIncome - retirement401k),
    stateKey,
    filingStatus
  );
  const employeeTotalTax = employeeFICA.total + employeeFederalTax + employeeStateTax;
  const employeeNetIncome = adjustedNetIncome - employeeTotalTax - retirement401k;
  const employeeEffectiveRate = adjustedNetIncome > 0
    ? (employeeTotalTax) / adjustedNetIncome
    : 0;

  return {
    netSEIncome: adjustedNetIncome,
    seTax: roundCurrency(seTax),
    seSocialSecurity: roundCurrency(seSocialSecurity),
    seMedicare: roundCurrency(seMedicare),
    seAdditionalMedicare: roundCurrency(seAdditionalMedicare),
    deductibleHalfSE: roundCurrency(deductibleHalfSE),
    adjustedIncomeForFederal: roundCurrency(agi),
    federalTax: roundCurrency(federalTax),
    stateTax: roundCurrency(stateTax),
    totalTax: roundCurrency(totalTax),
    netIncomeAfterTax: roundCurrency(netIncomeAfterTax),
    effectiveTaxRate,
    quarterlyPayment: roundCurrency(quarterlyPayment),

    employeeFICA: roundCurrency(employeeFICA.total),
    employeeFederalTax: roundCurrency(employeeFederalTax),
    employeeStateTax: roundCurrency(employeeStateTax),
    employeeTotalTax: roundCurrency(employeeTotalTax),
    employeeNetIncome: roundCurrency(employeeNetIncome),
    employeeEffectiveRate,
    taxDifference: roundCurrency(totalTax - employeeTotalTax),
  };
}

// ─── Chart Colors ───────────────────────────────────────────────────────────────

const CHART_COLORS = {
  seTax: '#f97316', // orange-500
  federalTax: '#ef4444', // red-500
  stateTax: '#f59e0b', // amber-500
  netIncome: '#10b981', // emerald-500
  employee: '#6366f1', // indigo-500 (for comparison)
  selfEmployed: '#f97316', // orange-500
};

// ─── Custom Tooltip ─────────────────────────────────────────────────────────────

interface TooltipPayload {
  name: string;
  value: number;
  payload: { name: string; value: number; fill: string };
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayload[] }) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="rounded-lg border border-border/50 bg-background px-3 py-2 shadow-xl">
      <p className="text-sm font-medium text-foreground">{item.payload.name}</p>
      <p className="text-sm text-muted-foreground">{formatCurrency(item.value)}</p>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────────

export function SelfEmploymentCalculator() {
  const hashParams = useHashParams();

  const [netIncome, setNetIncome] = useState<number>(
    () => hashParams.income ? Number(hashParams.income) : 100000
  );
  const [filingStatus, setFilingStatus] = useState<FilingStatus>(
    () => (hashParams.filing as FilingStatus) || 'single'
  );
  const [stateKey, setStateKey] = useState<StateKey>(
    () => (hashParams.state as StateKey) || 'illinois'
  );
  const [retirement401k, setRetirement401k] = useState<number>(
    () => hashParams.k401 ? Number(hashParams.k401) : 0
  );
  const [businessExpenses, setBusinessExpenses] = useState<number>(
    () => hashParams.expenses ? Number(hashParams.expenses) : 0
  );
  const [hasCalculated, setHasCalculated] = useState(false);
  const [result, setResult] = useState<SelfEmploymentResult | null>(null);

  // Persist to hash
  useEffect(() => {
    updateHashState('self-employment', {
      income: netIncome,
      filing: filingStatus,
      state: stateKey,
      k401: retirement401k,
      expenses: businessExpenses,
    });
  }, [netIncome, filingStatus, stateKey, retirement401k, businessExpenses]);

  // Track usage
  const trackUsage = useCallback(() => {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ calculator: 'self-employment' }),
    }).catch(() => {});
  }, []);

  const handleCalculate = () => {
    if (netIncome <= 0) return;
    const res = calculateSelfEmploymentTax(
      netIncome,
      filingStatus,
      stateKey,
      retirement401k,
      businessExpenses
    );
    setResult(res);
    setHasCalculated(true);
    trackUsage();
  };

  // Pie chart data
  const pieData = useMemo(() => {
    if (!result) return [];
    const entries = [
      { name: 'Self-Employment Tax', value: result.seTax, fill: CHART_COLORS.seTax },
      { name: 'Federal Income Tax', value: result.federalTax, fill: CHART_COLORS.federalTax },
    ];
    if (result.stateTax > 0) {
      entries.push({ name: 'State Income Tax', value: result.stateTax, fill: CHART_COLORS.stateTax });
    }
    entries.push({ name: 'Net Income', value: Math.max(0, result.netIncomeAfterTax), fill: CHART_COLORS.netIncome });
    return entries.filter((e) => e.value > 0);
  }, [result]);

  // Stacked bar comparison data
  const comparisonData = useMemo(() => {
    if (!result) return [];
    return [
      {
        name: 'Employee',
        fica: result.employeeFICA,
        federal: result.employeeFederalTax,
        state: result.employeeStateTax,
      },
      {
        name: 'Self-Employed',
        fica: result.seTax,
        federal: result.federalTax,
        state: result.stateTax,
      },
    ];
  }, [result]);

  return (
    <div className="space-y-6">
      {/* ─── Page Title ─────────────────────────────────── */}
      <div className="text-center">
        <h1 className="flex items-center justify-center gap-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          <Briefcase className="h-8 w-8 text-emerald-400" />
          Self-Employment Tax Calculator
        </h1>
        <p className="mt-2 text-muted-foreground">
          Calculate your self-employment tax, quarterly payments, and compare with W-2 employment
        </p>
      </div>

      {/* ─── Info Card ──────────────────────────────────── */}
      <Card className="border-emerald-500/20 bg-emerald-500/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">How Self-Employment Tax Works</p>
              <p>
                Self-employment tax is <strong>15.3%</strong> on 92.35% of your net business income: 
                12.4% for Social Security (up to the ${FICA_2026.socialSecurityWageCap.toLocaleString()} wage cap) 
                and 2.9% for Medicare (no cap). Unlike W-2 employees who split FICA 50/50 with their 
                employer, self-employed individuals pay the full amount. However, you can deduct half 
                of your SE tax as an above-the-line deduction, reducing your adjusted gross income.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ─── Pre-rendered SEO Example ───────────────────── */}
      <div className="rounded-xl border border-border/30 bg-muted/10 p-6" aria-hidden="true">
        <h2 className="text-xl font-bold text-foreground">Self-Employment Tax Example: $100,000 Net Income (2026)</h2>
        <div className="mt-3 space-y-1 text-sm text-muted-foreground">
          <p>Net Self-Employment Income: $100,000</p>
          <p>Filing Status: Single, State: Illinois</p>
          <p>SE Taxable Income (92.35%): $92,350</p>
          <p>Self-Employment Tax: $14,130 (SS: $11,451 + Medicare: $2,678)</p>
          <p>Deductible Half of SE Tax: $7,065</p>
          <p>Federal Income Tax (on reduced AGI): ~$10,935</p>
          <p>Illinois State Tax: ~$4,952</p>
          <p>Total Tax Burden: ~$30,017</p>
          <p>Quarterly Estimated Payments: ~$7,504</p>
          <p>Effective Tax Rate: ~30.0%</p>
          <p>Additional SE tax vs W-2 employee: ~$7,065 (the employer half of FICA)</p>
        </div>
      </div>

      {/* ─── Input Section ──────────────────────────────── */}
      <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <DollarSign className="h-5 w-5 text-emerald-400" />
            Self-Employment Details
          </CardTitle>
          <CardDescription>Enter your business income and deductions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Net SE Income */}
            <div className="space-y-2">
              <Label htmlFor="se-income" className="text-sm font-medium">
                <span className="flex items-center gap-1.5">
                  <Briefcase className="h-3.5 w-3.5 text-emerald-400" />
                  Net Self-Employment Income
                </span>
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="se-income"
                  type="number"
                  min={0}
                  value={netIncome || ''}
                  onChange={(e) => setNetIncome(Number(e.target.value) || 0)}
                  className="pl-9"
                  placeholder="100000"
                />
              </div>
              <p className="text-xs text-muted-foreground">Gross revenue minus business expenses (before SE tax)</p>
            </div>

            {/* Filing Status */}
            <div className="space-y-2">
              <Label htmlFor="se-filing" className="text-sm font-medium">Filing Status</Label>
              <Select value={filingStatus} onValueChange={(v) => setFilingStatus(v as FilingStatus)}>
                <SelectTrigger id="se-filing" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(FILING_LABELS).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* State */}
            <div className="space-y-2">
              <Label htmlFor="se-state" className="text-sm font-medium">State</Label>
              <Select value={stateKey} onValueChange={(v) => setStateKey(v as StateKey)}>
                <SelectTrigger id="se-state" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATE_KEYS.map((key) => {
                    const profile = STATE_PROFILES[key];
                    return (
                      <SelectItem key={key} value={key}>
                        {profile.name}{' '}
                        {profile.incomeTaxType === 'none'
                          ? '(0%)'
                          : profile.incomeTaxType === 'flat'
                          ? `(${(profile.incomeTaxRate * 100).toFixed(2)}%)`
                          : '(Progressive)'}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            {/* 401k */}
            <div className="space-y-2">
              <Label htmlFor="se-401k" className="text-sm font-medium">
                <span className="flex items-center gap-1.5">
                  <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
                  401(k) Contribution (Annual)
                </span>
              </Label>
              <Input
                id="se-401k"
                type="number"
                min={0}
                max={23500}
                value={retirement401k || ''}
                onChange={(e) => setRetirement401k(Number(e.target.value) || 0)}
                placeholder="0"
              />
              <p className="text-xs text-muted-foreground">Reduces federal &amp; state taxable income (2026 limit: $23,500)</p>
            </div>
          </div>

          {/* Business Expenses */}
          <div className="space-y-2">
            <Label htmlFor="se-expenses" className="text-sm font-medium">Additional Business Expenses</Label>
            <div className="relative max-w-xs">
              <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="se-expenses"
                type="number"
                min={0}
                value={businessExpenses || ''}
                onChange={(e) => setBusinessExpenses(Number(e.target.value) || 0)}
                className="pl-9"
                placeholder="0"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Additional deductible expenses (home office, supplies, travel, etc.)
            </p>
          </div>

          <Separator className="bg-border/40" />

          {/* Calculate Button */}
          <Button
            onClick={handleCalculate}
            disabled={netIncome <= 0}
            className="w-full bg-emerald-600 text-white hover:bg-emerald-700 sm:w-auto"
            size="lg"
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Calculate Self-Employment Tax
          </Button>
        </CardContent>
      </Card>

      <AdSlot position="after-form" />

      {/* ─── Results Section ────────────────────────────── */}
      {result && hasCalculated && (
        <div className="space-y-6">
          {/* Hero Results */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-red-500/20 bg-red-500/5">
              <CardContent className="p-4 text-center">
                <p className="text-xs font-medium uppercase tracking-wider text-red-400/80">SE Tax</p>
                <p className="mt-1 text-2xl font-bold text-red-400">{formatCurrency(result.seTax)}</p>
                <p className="text-xs text-muted-foreground">SS + Medicare</p>
              </CardContent>
            </Card>
            <Card className="border-amber-500/20 bg-amber-500/5">
              <CardContent className="p-4 text-center">
                <p className="text-xs font-medium uppercase tracking-wider text-amber-400/80">Federal Tax</p>
                <p className="mt-1 text-2xl font-bold text-amber-400">{formatCurrency(result.federalTax)}</p>
                <p className="text-xs text-muted-foreground">Income tax on AGI</p>
              </CardContent>
            </Card>
            <Card className="border-orange-500/20 bg-orange-500/5">
              <CardContent className="p-4 text-center">
                <p className="text-xs font-medium uppercase tracking-wider text-orange-400/80">Total Tax</p>
                <p className="mt-1 text-2xl font-bold text-orange-400">{formatCurrency(result.totalTax)}</p>
                <p className="text-xs text-muted-foreground">{formatPercent(result.effectiveTaxRate)} effective rate</p>
              </CardContent>
            </Card>
            <Card className="border-emerald-500/20 bg-emerald-500/5">
              <CardContent className="p-4 text-center">
                <p className="text-xs font-medium uppercase tracking-wider text-emerald-400/80">Net Income</p>
                <p className="mt-1 text-2xl font-bold text-emerald-400">{formatCurrency(result.netIncomeAfterTax)}</p>
                <p className="text-xs text-muted-foreground">After all taxes</p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Breakdown */}
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart3 className="h-5 w-5 text-emerald-400" />
                Tax Breakdown
              </CardTitle>
              <CardDescription>Complete analysis of your self-employment tax liability</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Left Column: SE Tax */}
                <div className="space-y-3">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Self-Employment Tax
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Social Security (12.4% up to ${FICA_2026.socialSecurityWageCap.toLocaleString()})</span>
                      <span className="text-sm font-medium text-foreground">{formatCurrency(result.seSocialSecurity)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Medicare (2.9%)</span>
                      <span className="text-sm font-medium text-foreground">{formatCurrency(result.seMedicare)}</span>
                    </div>
                    {result.seAdditionalMedicare > 0 && (
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Additional Medicare (0.9% above $200K)</span>
                        <span className="text-sm font-medium text-foreground">{formatCurrency(result.seAdditionalMedicare)}</span>
                      </div>
                    )}
                    <Separator className="bg-border/30" />
                    <div className="flex justify-between">
                      <span className="text-sm font-semibold text-foreground">Total SE Tax</span>
                      <span className="text-sm font-bold text-orange-400">{formatCurrency(result.seTax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Deductible Half of SE Tax</span>
                      <span className="text-sm font-medium text-emerald-400">-{formatCurrency(result.deductibleHalfSE)}</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Income Taxes */}
                <div className="space-y-3">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Income Taxes
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Adjusted Gross Income</span>
                      <span className="text-sm font-medium text-foreground">{formatCurrency(result.adjustedIncomeForFederal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Federal Income Tax</span>
                      <span className="text-sm font-medium text-red-400">{formatCurrency(result.federalTax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">State Income Tax ({STATE_PROFILES[stateKey]?.name})</span>
                      <span className="text-sm font-medium text-amber-400">{formatCurrency(result.stateTax)}</span>
                    </div>
                    <Separator className="bg-border/30" />
                    <div className="flex justify-between">
                      <span className="text-sm font-semibold text-foreground">Total Tax Burden</span>
                      <span className="text-sm font-bold text-red-400">{formatCurrency(result.totalTax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-semibold text-foreground">Effective Tax Rate</span>
                      <span className="text-sm font-bold text-foreground">{formatPercent(result.effectiveTaxRate)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-4 bg-emerald-500/30" />

              {/* Quarterly Payments */}
              <div className="rounded-lg bg-emerald-500/10 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-emerald-400">Quarterly Estimated Tax Payment</p>
                    <p className="text-xs text-muted-foreground">Due: Apr 15, Jun 15, Sep 15, Jan 15</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-emerald-400">{formatCurrency(result.quarterlyPayment)}</p>
                    <p className="text-xs text-muted-foreground">per quarter</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Employee vs Self-Employed Comparison */}
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Building2 className="h-5 w-5 text-emerald-400" />
                Employee vs Self-Employed Comparison
              </CardTitle>
              <CardDescription>See how much more self-employed individuals pay in taxes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Employee */}
                <div className="rounded-xl border border-border/50 bg-muted/20 p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-semibold text-foreground">W-2 Employee</span>
                    <Badge variant="outline" className="text-[10px]">Employer pays half FICA</Badge>
                  </div>
                  <Separator className="bg-border/30" />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">FICA (7.65%)</span>
                      <span className="font-medium text-foreground">{formatCurrency(result.employeeFICA)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Federal Income Tax</span>
                      <span className="font-medium text-red-400">{formatCurrency(result.employeeFederalTax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">State Income Tax</span>
                      <span className="font-medium text-amber-400">{formatCurrency(result.employeeStateTax)}</span>
                    </div>
                    <Separator className="bg-border/20" />
                    <div className="flex justify-between">
                      <span className="font-semibold text-foreground">Total Tax</span>
                      <span className="font-bold text-foreground">{formatCurrency(result.employeeTotalTax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Effective Rate</span>
                      <span className="font-medium text-foreground">{formatPercent(result.employeeEffectiveRate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Net Take-Home</span>
                      <span className="font-bold text-emerald-400">{formatCurrency(result.employeeNetIncome)}</span>
                    </div>
                  </div>
                </div>

                {/* Self-Employed */}
                <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-orange-400" />
                    <span className="text-sm font-semibold text-foreground">Self-Employed</span>
                    <Badge className="bg-orange-500/20 text-orange-400 text-[10px]">You pay full FICA</Badge>
                  </div>
                  <Separator className="bg-border/30" />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">SE Tax (15.3%)</span>
                      <span className="font-medium text-orange-400">{formatCurrency(result.seTax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Federal Income Tax</span>
                      <span className="font-medium text-red-400">{formatCurrency(result.federalTax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">State Income Tax</span>
                      <span className="font-medium text-amber-400">{formatCurrency(result.stateTax)}</span>
                    </div>
                    <Separator className="bg-border/20" />
                    <div className="flex justify-between">
                      <span className="font-semibold text-foreground">Total Tax</span>
                      <span className="font-bold text-orange-400">{formatCurrency(result.totalTax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Effective Rate</span>
                      <span className="font-medium text-foreground">{formatPercent(result.effectiveTaxRate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Net Income</span>
                      <span className="font-bold text-emerald-400">{formatCurrency(result.netIncomeAfterTax)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Difference Summary */}
              <div className="mt-4 rounded-lg border border-border/30 bg-muted/30 p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-sm text-muted-foreground">
                    Self-employed individuals pay{' '}
                    <strong className="text-orange-400">{formatCurrency(result.taxDifference)}</strong> more in taxes
                    than W-2 employees earning the same income
                  </div>
                  <Badge className="bg-orange-500/20 text-orange-400 text-xs">
                    +{formatPercent(result.effectiveTaxRate - result.employeeEffectiveRate)} higher rate
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Charts */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Pie Chart */}
            <Card className="border-border/50 bg-card/80">
              <CardHeader>
                <CardTitle className="text-lg">Tax Breakdown</CardTitle>
                <CardDescription>How your self-employment taxes are distributed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full" style={{ minHeight: 300 }}>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={105}
                        paddingAngle={2}
                        dataKey="value"
                        nameKey="name"
                        stroke="none"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`pie-cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend
                        content={({ payload }) => {
                          if (!payload?.length) return null;
                          return (
                            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 pt-2">
                              {payload.map((entry, index) => (
                                <div key={index} className="flex items-center gap-1.5">
                                  <div
                                    className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                                    style={{ backgroundColor: entry.color }}
                                  />
                                  <span className="text-xs text-muted-foreground">{entry.value}</span>
                                </div>
                              ))}
                            </div>
                          );
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Stacked Bar Chart */}
            <Card className="border-border/50 bg-card/80">
              <CardHeader>
                <CardTitle className="text-lg">Employee vs Self-Employed</CardTitle>
                <CardDescription>Stacked comparison of total tax burden</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full" style={{ minHeight: 300 }}>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={comparisonData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <XAxis
                        type="category"
                        dataKey="name"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      />
                      <YAxis
                        type="number"
                        tickFormatter={(value: number) => formatCurrency(value)}
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={11}
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      />
                      <Tooltip
                        formatter={(value: number) => formatCurrency(value)}
                        contentStyle={{
                          borderRadius: '8px',
                          border: '1px solid hsl(var(--border))',
                          background: 'hsl(var(--background))',
                        }}
                      />
                      <Legend
                        content={({ payload }) => {
                          if (!payload?.length) return null;
                          return (
                            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 pt-2">
                              {payload.map((entry, index) => (
                                <div key={index} className="flex items-center gap-1.5">
                                  <div
                                    className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                                    style={{ backgroundColor: entry.color }}
                                  />
                                  <span className="text-xs text-muted-foreground">{entry.value}</span>
                                </div>
                              ))}
                            </div>
                          );
                        }}
                      />
                      <Bar dataKey="fica" name="FICA / SE Tax" stackId="tax" fill={CHART_COLORS.seTax} radius={[0, 0, 0, 0]} />
                      <Bar dataKey="federal" name="Federal Tax" stackId="tax" fill={CHART_COLORS.federalTax} />
                      <Bar dataKey="state" name="State Tax" stackId="tax" fill={CHART_COLORS.stateTax} radius={[0, 6, 6, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <AdSlot position="after-results" />
        </div>
      )}

      {/* ─── SEO Content Section ────────────────────────── */}
      <Card className="border-border/50 bg-card/80">
        <CardHeader>
          <CardTitle className="text-lg">Self-Employment Tax Guide 2026</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground">What is self-employment tax?</strong> Self-employment tax is the
            combined Social Security and Medicare tax that self-employed individuals must pay. When you work as a
            W-2 employee, your employer pays half of your FICA taxes (7.65%) and you pay the other half (7.65%).
            As a self-employed individual, you are both the employer and the employee, so you pay the full 15.3%.
          </p>
          <p>
            <strong className="text-foreground">The 92.35% rule:</strong> Before calculating self-employment tax,
            you multiply your net business income by 92.35%. This effectively gives you a deduction equal to the
            employer half of FICA, ensuring you&apos;re only taxed on the equivalent of an employee&apos;s wage
            portion. For example, on $100,000 in net SE income, only $92,350 is subject to the 15.3% SE tax.
          </p>
          <p>
            <strong className="text-foreground">The above-the-line deduction:</strong> You can deduct half of your
            self-employment tax from your gross income when calculating your adjusted gross income (AGI). This
            reduces your federal and state income tax liability. It does not reduce your self-employment tax
            itself — it only lowers your income tax.
          </p>
          <p>
            <strong className="text-foreground">Quarterly estimated tax payments:</strong> Self-employed individuals
            must pay taxes quarterly (April 15, June 15, September 15, and January 15) since there is no employer
            withholding taxes on your behalf. Failure to make quarterly payments can result in underpayment
            penalties. A safe harbor is to pay at least 100% of your prior-year tax liability (110% if your AGI
            exceeded $150,000) or 90% of your current-year liability.
          </p>
          <p>
            <strong className="text-foreground">Tax advantages for the self-employed:</strong> Despite the
            additional SE tax, self-employed individuals have access to powerful tax advantages: higher 401(k)
            contribution limits (up to $70,000 as both employer and employee in 2026), the home office deduction,
            health insurance premium deduction, and business expense deductions that W-2 employees cannot claim.
            These can often offset the additional SE tax burden.
          </p>
          <p>
            <strong className="text-foreground">Choosing the right business structure:</strong> Sole proprietors and
            single-member LLCs pay self-employment tax on all net business income. S-Corporation owners can split
            income between salary (subject to SE tax) and distributions (not subject to SE tax), potentially saving
            thousands in SE tax. However, S-Corps require reasonable compensation and additional filing
            requirements. Consult a tax professional to determine the best structure for your situation.
          </p>
        </CardContent>
      </Card>

      <FAQSection title="Self-Employment Tax FAQ — 2026 Rates, Deductions & Quarterly Payments" faqs={SELF_EMPLOYMENT_FAQS} />

      {/* ─── Internal Links ─────────────────────────────── */}
      <Card className="border-border/50 bg-card/80">
        <CardHeader>
          <CardTitle className="text-lg">Related Tax Calculators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { page: 'home', label: 'Paycheck Calculator', desc: 'Calculate W-2 take-home pay after taxes' },
              { page: 'capital-gains', label: 'Capital Gains Tax Calculator', desc: 'Calculate taxes on investment gains' },
              { page: 'relocation', label: 'Salary Relocation Calculator', desc: 'Compare take-home pay across states' },
              { page: 'retirement', label: '401(k) Retirement Projection', desc: 'Project your retirement savings growth' },
              { page: 'mortgage', label: 'Mortgage Calculator', desc: 'Calculate monthly payments and amortization' },
            ].map((link) => (
              <button
                key={link.page}
                onClick={() => { window.location.hash = link.page; window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="flex items-start gap-2 rounded-lg border border-border/50 bg-muted/20 p-3 text-left transition-colors hover:border-emerald-500/30 hover:bg-emerald-500/5"
              >
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <div>
                  <p className="text-sm font-medium text-foreground">{link.label}</p>
                  <p className="text-xs text-muted-foreground">{link.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <AdSlot position="mid-content" />
    </div>
  );
}
