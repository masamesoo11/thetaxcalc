'use client';

import { useMemo, useState, useCallback } from 'react';
import {
  Calculator,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Shield,
  Users,
  FileText,
  AlertTriangle,
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
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { AdSlot } from './ad-slot';
import { formatCurrency, roundCurrency } from '@/lib/finance-utils';
import { FEDERAL_TAX_2026, FICA_2026 } from '@/lib/tax-config';

// ─── Types ──────────────────────────────────────────────────────────────────────

type FilingStatus = 'single' | 'married' | 'head_of_household';
type PayFrequencyType = 'weekly' | 'biweekly' | 'semimonthly' | 'monthly';

const FILING_LABELS: Record<FilingStatus, string> = {
  single: 'Single',
  married: 'Married Filing Jointly',
  head_of_household: 'Head of Household',
};

const PAY_FREQUENCY_LABELS: Record<PayFrequencyType, string> = {
  weekly: 'Weekly (52)',
  biweekly: 'Bi-Weekly (26)',
  semimonthly: 'Semi-Monthly (24)',
  monthly: 'Monthly (12)',
};

const PAY_PERIODS: Record<PayFrequencyType, number> = {
  weekly: 52,
  biweekly: 26,
  semimonthly: 24,
  monthly: 12,
};

// Additional Medicare threshold by filing status
const ADDITIONAL_MEDICARE_THRESHOLD: Record<FilingStatus, number> = {
  single: 200000,
  married: 250000,
  head_of_household: 200000,
};

// ─── Calculation Interface ───────────────────────────────────────────────────────

interface WithholdingResult {
  grossPerPaycheck: number;
  pretaxDeductionsPerPaycheck: number;
  annualTaxableWages: number;
  annualFederalTax: number;
  annualFICA: number;
  annualSocialSecurity: number;
  annualMedicare: number;
  annualAdditionalMedicare: number;
  annualTotalTax: number;
  federalWithholdingPerPaycheck: number;
  ficaPerPaycheck: number;
  totalWithholdingPerPaycheck: number;
  netTakeHomePerPaycheck: number;
  annualNetTakeHome: number;
  effectiveTaxRate: number;
  marginalTaxRate: number;
  projectedRefund: number;
  projectedOwed: number;
  additionalWithholdingNeeded: number;
  estimatedAllowances: number;
  isUnderWithheld: boolean;
  isOverWithheld: boolean;
}

// ─── Federal Tax Calculation (following IRS Pub 15-T methodology) ────────────────

function calculateFederalTaxFromBrackets(
  taxableIncome: number,
  filingStatus: FilingStatus
): number {
  const brackets = FEDERAL_TAX_2026.bracketsByFiling[filingStatus] ?? FEDERAL_TAX_2026.brackets;
  if (taxableIncome <= 0) return 0;

  let tax = 0;
  let remaining = taxableIncome;

  for (const bracket of brackets) {
    if (remaining <= 0) break;
    const bracketWidth = bracket.max === null ? remaining : bracket.max - bracket.min;
    const taxableInBracket = Math.min(remaining, bracketWidth);
    tax += taxableInBracket * bracket.rate;
    remaining -= taxableInBracket;
  }

  return tax;
}

function getMarginalRate(taxableIncome: number, filingStatus: FilingStatus): number {
  const brackets = FEDERAL_TAX_2026.bracketsByFiling[filingStatus] ?? FEDERAL_TAX_2026.brackets;
  for (let i = brackets.length - 1; i >= 0; i--) {
    if (taxableIncome >= brackets[i].min) {
      return brackets[i].rate;
    }
  }
  return 0;
}

function calculateWithholding(
  grossAnnualIncome: number,
  payFrequency: PayFrequencyType,
  filingStatus: FilingStatus,
  dependents: number,
  retirement401kPerPaycheck: number,
  hsaPerPaycheck: number,
  otherPretaxPerPaycheck: number,
  currentWithholdingPerPaycheck: number
): WithholdingResult {
  const periodsPerYear = PAY_PERIODS[payFrequency];
  const grossPerPaycheck = grossAnnualIncome / periodsPerYear;

  // Pre-tax deductions per paycheck
  const pretaxDeductionsPerPaycheck = retirement401kPerPaycheck + hsaPerPaycheck + otherPretaxPerPaycheck;

  // Annualized taxable wages = (Gross per paycheck - pre-tax deductions) × pay periods
  const taxablePerPaycheck = Math.max(0, grossPerPaycheck - pretaxDeductionsPerPaycheck);
  const annualTaxableWages = taxablePerPaycheck * periodsPerYear;

  // Standard deduction
  const standardDeduction = FEDERAL_TAX_2026.standardDeductionsByFiling[filingStatus] ?? FEDERAL_TAX_2026.standardDeduction;

  // Dependents: each dependent gets a $2,000 tax credit (2026 Child Tax Credit / Other Dependent Credit)
  // For withholding purposes, this reduces the tax liability
  const dependentCredit = dependents * 2000;

  // Federal income tax on taxable income after standard deduction
  const taxableIncomeForFederal = Math.max(0, annualTaxableWages - standardDeduction);
  const federalTaxBeforeCredits = calculateFederalTaxFromBrackets(taxableIncomeForFederal, filingStatus);

  // Apply dependent credit (non-refundable, can't reduce below 0)
  const annualFederalTax = Math.max(0, federalTaxBeforeCredits - dependentCredit);

  // FICA Calculation
  // Social Security: 6.2% up to wage cap (on gross wages, not reduced by pre-tax deductions except specific ones)
  // For simplicity and following typical withholding, 401(k) reduces SS wages, HSA does not
  const ssWages = Math.max(0, (grossPerPaycheck - retirement401kPerPaycheck) * periodsPerYear);
  const ssCappedWages = Math.min(ssWages, FICA_2026.socialSecurityWageCap);
  const annualSocialSecurity = ssCappedWages * FICA_2026.socialSecurityRate;

  // Medicare: 1.45% on all wages + 0.9% additional above threshold
  const medicareWages = annualTaxableWages; // HSA and 401k reduce Medicare wages
  const annualMedicare = medicareWages * FICA_2026.medicareRate;
  const addMedicareThreshold = ADDITIONAL_MEDICARE_THRESHOLD[filingStatus];
  const annualAdditionalMedicare = medicareWages > addMedicareThreshold
    ? (medicareWages - addMedicareThreshold) * FICA_2026.additionalMedicareRate
    : 0;

  const annualFICA = annualSocialSecurity + annualMedicare + annualAdditionalMedicare;

  // Total annual tax
  const annualTotalTax = annualFederalTax + annualFICA;

  // Per-paycheck amounts
  const federalWithholdingPerPaycheck = annualFederalTax / periodsPerYear;
  const ficaPerPaycheck = annualFICA / periodsPerYear;
  const totalWithholdingPerPaycheck = federalWithholdingPerPaycheck + ficaPerPaycheck;

  // Net take-home
  const netTakeHomePerPaycheck = grossPerPaycheck - pretaxDeductionsPerPaycheck - totalWithholdingPerPaycheck;
  const annualNetTakeHome = netTakeHomePerPaycheck * periodsPerYear;

  // Effective and marginal rates
  const effectiveTaxRate = grossAnnualIncome > 0 ? annualTotalTax / grossAnnualIncome : 0;
  const marginalTaxRate = getMarginalRate(taxableIncomeForFederal, filingStatus);

  // Comparison with current withholding
  const currentAnnualWithholding = currentWithholdingPerPaycheck * periodsPerYear;
  const withholdingDifference = annualTotalTax - currentAnnualWithholding;
  const projectedRefund = withholdingDifference < 0 ? Math.abs(withholdingDifference) : 0;
  const projectedOwed = withholdingDifference > 0 ? withholdingDifference : 0;

  // W-4 Optimization: Estimate allowances
  // Each allowance is roughly worth $2,000 in tax credit equivalent (2026)
  // Simplified: allowances ≈ (standard deduction - base) / exemption_value
  // Modern W-4 doesn't use allowances, but we estimate for guidance
  const estimatedAllowances = Math.max(0, Math.round(standardDeduction / 5000) + dependents);

  // Additional withholding needed per paycheck if under-withheld
  const additionalWithholdingNeeded = projectedOwed > 0
    ? roundCurrency(projectedOwed / periodsPerYear)
    : 0;

  const isUnderWithheld = projectedOwed > 1000;
  const isOverWithheld = projectedRefund > 3000;

  return {
    grossPerPaycheck: roundCurrency(grossPerPaycheck),
    pretaxDeductionsPerPaycheck: roundCurrency(pretaxDeductionsPerPaycheck),
    annualTaxableWages: roundCurrency(annualTaxableWages),
    annualFederalTax: roundCurrency(annualFederalTax),
    annualFICA: roundCurrency(annualFICA),
    annualSocialSecurity: roundCurrency(annualSocialSecurity),
    annualMedicare: roundCurrency(annualMedicare),
    annualAdditionalMedicare: roundCurrency(annualAdditionalMedicare),
    annualTotalTax: roundCurrency(annualTotalTax),
    federalWithholdingPerPaycheck: roundCurrency(federalWithholdingPerPaycheck),
    ficaPerPaycheck: roundCurrency(ficaPerPaycheck),
    totalWithholdingPerPaycheck: roundCurrency(totalWithholdingPerPaycheck),
    netTakeHomePerPaycheck: roundCurrency(netTakeHomePerPaycheck),
    annualNetTakeHome: roundCurrency(annualNetTakeHome),
    effectiveTaxRate,
    marginalTaxRate,
    projectedRefund: roundCurrency(projectedRefund),
    projectedOwed: roundCurrency(projectedOwed),
    additionalWithholdingNeeded,
    estimatedAllowances,
    isUnderWithheld,
    isOverWithheld,
  };
}

// ─── Chart Colors ───────────────────────────────────────────────────────────────

const CHART_COLORS = {
  federalTax: '#ef4444',     // red-500
  fica: '#f97316',          // orange-500
  socialSecurity: '#f59e0b', // amber-500
  medicare: '#fb923c',      // orange-400
  takeHome: '#10b981',      // emerald-500
  pretax: '#6366f1',        // indigo-500
  current: '#94a3b8',       // slate-400
  recommended: '#10b981',   // emerald-500
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

function BarTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border/50 bg-background px-3 py-2 shadow-xl">
      <p className="mb-1 text-sm font-medium text-foreground">{label}</p>
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2 text-xs">
          <div className="h-2 w-2 shrink-0 rounded-sm" style={{ backgroundColor: entry.color }} />
          <span className="text-muted-foreground">{entry.name}:</span>
          <span className="font-medium text-foreground">{formatCurrency(entry.value)}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────────

export function IRSWithholdingCalculator() {
  const [grossAnnualIncome, setGrossAnnualIncome] = useState<number>(75000);
  const [payFrequency, setPayFrequency] = useState<PayFrequencyType>('biweekly');
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const [dependents, setDependents] = useState<number>(0);
  const [retirement401k, setRetirement401k] = useState<number>(0);
  const [hsaContribution, setHsaContribution] = useState<number>(0);
  const [otherPretax, setOtherPretax] = useState<number>(0);
  const [currentWithholding, setCurrentWithholding] = useState<number>(0);

  const trackUsage = useCallback(() => {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ calculator: 'irs-withholding' }),
    }).catch(() => {});
  }, []);

  // Compute results
  const result = useMemo(() => {
    return calculateWithholding(
      grossAnnualIncome,
      payFrequency,
      filingStatus,
      dependents,
      retirement401k,
      hsaContribution,
      otherPretax,
      currentWithholding
    );
  }, [grossAnnualIncome, payFrequency, filingStatus, dependents, retirement401k, hsaContribution, otherPretax, currentWithholding]);

  // Track usage on first calculation
  const [tracked, setTracked] = useState(false);
  if (!tracked && grossAnnualIncome > 0) {
    setTracked(true);
    trackUsage();
  }

  // Pie chart data: Where each paycheck dollar goes
  const pieData = useMemo(() => {
    if (!result) return [];
    const entries = [
      { name: 'Federal Tax', value: result.federalWithholdingPerPaycheck, fill: CHART_COLORS.federalTax },
      { name: 'Social Security', value: roundCurrency(result.annualSocialSecurity / PAY_PERIODS[payFrequency]), fill: CHART_COLORS.socialSecurity },
      { name: 'Medicare', value: roundCurrency((result.annualMedicare + result.annualAdditionalMedicare) / PAY_PERIODS[payFrequency]), fill: CHART_COLORS.medicare },
    ];
    if (result.pretaxDeductionsPerPaycheck > 0) {
      entries.push({ name: 'Pre-tax Deductions', value: result.pretaxDeductionsPerPaycheck, fill: CHART_COLORS.pretax });
    }
    entries.push({ name: 'Take-Home', value: Math.max(0, result.netTakeHomePerPaycheck), fill: CHART_COLORS.takeHome });
    return entries.filter((e) => e.value > 0);
  }, [result, payFrequency]);

  // Bar chart data: Monthly take-home comparison
  const barData = useMemo(() => {
    if (!result || currentWithholding <= 0) return [];
    const periodsPerYear = PAY_PERIODS[payFrequency];
    const currentNetPerPaycheck = result.grossPerPaycheck - result.pretaxDeductionsPerPaycheck - currentWithholding - result.ficaPerPaycheck;
    return [
      {
        name: 'Current',
        federalTax: currentWithholding,
        fica: result.ficaPerPaycheck,
        takeHome: Math.max(0, currentNetPerPaycheck),
      },
      {
        name: 'Recommended',
        federalTax: result.federalWithholdingPerPaycheck,
        fica: result.ficaPerPaycheck,
        takeHome: Math.max(0, result.netTakeHomePerPaycheck),
      },
    ];
  }, [result, currentWithholding, payFrequency]);

  const payFrequencyLabel = PAY_FREQUENCY_LABELS[payFrequency].split(' (')[0];

  return (
    <div className="space-y-6">
      {/* ─── Page Title ─────────────────────────────────── */}
      <div className="text-center">
        <h2 className="flex items-center justify-center gap-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          <Calculator className="h-8 w-8 text-emerald-400" />
          IRS Withholding Calculator
        </h2>
        <p className="mt-2 text-muted-foreground">
          Calculate your recommended federal withholding per paycheck and optimize your W-4 for 2026
        </p>
      </div>

      {/* ─── Info Card ──────────────────────────────────── */}
      <Card className="border-emerald-500/20 bg-emerald-500/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <FileText className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">About IRS Tax Withholding (2026)</p>
              <p>
                Federal withholding is the amount your employer deducts from each paycheck for federal income tax.
                Following IRS Publication 15-T methodology, this calculator estimates your required withholding
                based on progressive tax brackets (10%–37%), the standard deduction
                ({FILING_LABELS.single}: {formatCurrency(FEDERAL_TAX_2026.standardDeductionsByFiling.single)},
                {' '}{FILING_LABELS.married}: {formatCurrency(FEDERAL_TAX_2026.standardDeductionsByFiling.married)},
                {' '}{FILING_LABELS.head_of_household}: {formatCurrency(FEDERAL_TAX_2026.standardDeductionsByFiling.head_of_household)}),
                and FICA taxes (Social Security 6.2% up to ${FICA_2026.socialSecurityWageCap.toLocaleString()} + Medicare 1.45%).
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ─── Input + Results Grid ───────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Left: Form */}
        <div className="space-y-4 lg:col-span-3">
          {/* Income & Pay Frequency */}
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <DollarSign className="h-5 w-5 text-emerald-400" />
                Income Details
              </CardTitle>
              <CardDescription>Enter your gross income and pay schedule</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="gross-income" className="text-sm font-medium">
                    Gross Annual Income
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="gross-income"
                      type="number"
                      min={0}
                      value={grossAnnualIncome || ''}
                      onChange={(e) => setGrossAnnualIncome(Number(e.target.value) || 0)}
                      className="pl-9"
                      placeholder="75000"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pay-frequency" className="text-sm font-medium">
                    Pay Frequency
                  </Label>
                  <Select value={payFrequency} onValueChange={(v) => setPayFrequency(v as PayFrequencyType)}>
                    <SelectTrigger id="pay-frequency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(PAY_FREQUENCY_LABELS).map(([key, label]) => (
                        <SelectItem key={key} value={key}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="filing-status" className="text-sm font-medium">
                    Filing Status
                  </Label>
                  <Select value={filingStatus} onValueChange={(v) => setFilingStatus(v as FilingStatus)}>
                    <SelectTrigger id="filing-status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(FILING_LABELS).map(([key, label]) => (
                        <SelectItem key={key} value={key}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dependents" className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-emerald-400" />
                      Number of Dependents
                    </span>
                  </Label>
                  <Input
                    id="dependents"
                    type="number"
                    min={0}
                    max={20}
                    value={dependents}
                    onChange={(e) => setDependents(Math.max(0, Number(e.target.value) || 0))}
                    placeholder="0"
                  />
                  <p className="text-xs text-muted-foreground">$2,000 credit per dependent (2026)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pre-tax Deductions */}
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="h-5 w-5 text-amber-400" />
                Pre-tax Deductions
              </CardTitle>
              <CardDescription>Enter per-paycheck amounts that reduce taxable income</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="401k" className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <DollarSign className="h-3.5 w-3.5 text-amber-400" />
                      401(k) per Paycheck
                    </span>
                  </Label>
                  <Input
                    id="401k"
                    type="number"
                    min={0}
                    value={retirement401k || ''}
                    onChange={(e) => setRetirement401k(Number(e.target.value) || 0)}
                    placeholder="0"
                  />
                  <p className="text-xs text-muted-foreground">2026 annual limit: $24,500</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hsa" className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <Shield className="h-3.5 w-3.5 text-emerald-400" />
                      HSA per Paycheck
                    </span>
                  </Label>
                  <Input
                    id="hsa"
                    type="number"
                    min={0}
                    value={hsaContribution || ''}
                    onChange={(e) => setHsaContribution(Number(e.target.value) || 0)}
                    placeholder="0"
                  />
                  <p className="text-xs text-muted-foreground">2026 annual limit: $4,150 (individual)</p>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="other-pretax" className="text-sm font-medium">
                  Other Pre-tax Deductions per Paycheck
                </Label>
                <div className="max-w-xs">
                  <Input
                    id="other-pretax"
                    type="number"
                    min={0}
                    value={otherPretax || ''}
                    onChange={(e) => setOtherPretax(Number(e.target.value) || 0)}
                    placeholder="0"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Commuter benefits, FSA, etc.</p>
              </div>
            </CardContent>
          </Card>

          {/* Current Withholding Comparison */}
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-emerald-400" />
                Current Withholding (Optional)
              </CardTitle>
              <CardDescription>Enter your current federal withholding for comparison</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="current-wh" className="text-sm font-medium">
                  Current Federal Withholding per Paycheck
                </Label>
                <div className="relative max-w-xs">
                  <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="current-wh"
                    type="number"
                    min={0}
                    value={currentWithholding || ''}
                    onChange={(e) => setCurrentWithholding(Number(e.target.value) || 0)}
                    className="pl-9"
                    placeholder="0"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Found on your pay stub under &quot;Federal Income Tax&quot;</p>
              </div>
            </CardContent>
          </Card>

          <AdSlot position="after-form" />
        </div>

        {/* Right: Live Results */}
        <div className="lg:col-span-2">
          <Card className="sticky top-20 border-emerald-500/20 bg-card/90 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calculator className="h-5 w-5 text-emerald-400" />
                Withholding Results
              </CardTitle>
              <CardDescription>
                Calculations update instantly as you type
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Hero Number: Recommended Withholding */}
              <div className="rounded-xl bg-emerald-500/10 p-4 text-center">
                <p className="text-xs font-medium uppercase tracking-wider text-emerald-400/80">
                  Recommended Withholding per {payFrequencyLabel}
                </p>
                <p className="mt-1 text-3xl font-bold text-emerald-400">
                  {formatCurrency(result.federalWithholdingPerPaycheck)}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Federal income tax only (excludes FICA)
                </p>
              </div>

              <Separator className="bg-border/40" />

              {/* Total Withholding Per Paycheck */}
              <div className="rounded-lg bg-muted/30 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Total Deductions per {payFrequencyLabel}</span>
                  <span className="text-sm font-bold text-red-400">
                    {formatCurrency(result.pretaxDeductionsPerPaycheck + result.totalWithholdingPerPaycheck)}
                  </span>
                </div>
                <div className="mt-2 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Federal Tax Withholding</span>
                    <span className="text-xs font-medium text-red-400">
                      {formatCurrency(result.federalWithholdingPerPaycheck)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">FICA (SS + Medicare)</span>
                    <span className="text-xs font-medium text-orange-400">
                      {formatCurrency(result.ficaPerPaycheck)}
                    </span>
                  </div>
                  {result.pretaxDeductionsPerPaycheck > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Pre-tax Deductions</span>
                      <span className="text-xs font-medium text-amber-400">
                        {formatCurrency(result.pretaxDeductionsPerPaycheck)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Net Take-Home */}
              <div className="flex items-center justify-between rounded-lg bg-muted/20 p-3">
                <span className="text-sm text-muted-foreground">Take-Home per {payFrequencyLabel}</span>
                <span className="text-lg font-bold text-emerald-400">{formatCurrency(result.netTakeHomePerPaycheck)}</span>
              </div>

              <Separator className="bg-border/40" />

              {/* Tax Rate Summary */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-muted/30 p-2.5 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Effective Rate
                  </p>
                  <p className="text-lg font-bold text-foreground">
                    {(result.effectiveTaxRate * 100).toFixed(1)}%
                  </p>
                </div>
                <div className="rounded-lg bg-muted/30 p-2.5 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Marginal Rate
                  </p>
                  <p className="text-lg font-bold text-foreground">
                    {(result.marginalTaxRate * 100).toFixed(0)}%
                  </p>
                </div>
              </div>

              {/* Comparison (if current withholding entered) */}
              {currentWithholding > 0 && (
                <>
                  <Separator className="bg-border/40" />
                  <div className="space-y-2.5">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Current vs Recommended
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Current Withholding</span>
                      <span className="text-sm font-medium text-foreground">{formatCurrency(currentWithholding)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Recommended Withholding</span>
                      <span className="text-sm font-medium text-emerald-400">{formatCurrency(result.federalWithholdingPerPaycheck)}</span>
                    </div>
                    <Separator className="bg-border/20" />
                    {result.projectedRefund > 0 && (
                      <div className="flex items-center justify-between rounded-lg bg-emerald-500/10 p-2.5">
                        <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-400">
                          <TrendingDown className="h-3.5 w-3.5" />
                          Projected Refund
                        </span>
                        <span className="text-sm font-bold text-emerald-400">{formatCurrency(result.projectedRefund)}</span>
                      </div>
                    )}
                    {result.projectedOwed > 0 && (
                      <div className="flex items-center justify-between rounded-lg bg-red-500/10 p-2.5">
                        <span className="flex items-center gap-1.5 text-sm font-medium text-red-400">
                          <TrendingUp className="h-3.5 w-3.5" />
                          Projected Amount Owed
                        </span>
                        <span className="text-sm font-bold text-red-400">{formatCurrency(result.projectedOwed)}</span>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Under-withholding Warning */}
              {result.isUnderWithheld && (
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                    <div>
                      <p className="text-sm font-semibold text-red-400">Under-Withheld Warning</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        You may owe <strong className="text-red-400">{formatCurrency(result.projectedOwed)}</strong> at tax time.
                        Consider adding <strong className="text-red-400">{formatCurrency(result.additionalWithholdingNeeded)}</strong> per paycheck
                        on line 4(c) of your W-4.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="mt-6">
            <AdSlot position="after-results" />
          </div>
        </div>
      </div>

      {/* ─── Detailed Annual Breakdown ────────────────────── */}
      <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <DollarSign className="h-5 w-5 text-emerald-400" />
            Annual Tax Breakdown
          </CardTitle>
          <CardDescription>Complete analysis of your federal tax liability for 2026</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Left Column: Federal Income Tax */}
            <div className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Federal Income Tax
              </p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Gross Annual Income</span>
                  <span className="text-sm font-medium text-foreground">{formatCurrency(grossAnnualIncome)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Pre-tax Deductions (Annual)</span>
                  <span className="text-sm font-medium text-amber-400">-{formatCurrency(result.pretaxDeductionsPerPaycheck * PAY_PERIODS[payFrequency])}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Taxable Wages</span>
                  <span className="text-sm font-medium text-foreground">{formatCurrency(result.annualTaxableWages)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Standard Deduction ({FILING_LABELS[filingStatus]})
                  </span>
                  <span className="text-sm font-medium text-emerald-400">
                    -{formatCurrency(FEDERAL_TAX_2026.standardDeductionsByFiling[filingStatus] ?? FEDERAL_TAX_2026.standardDeduction)}
                  </span>
                </div>
                {dependents > 0 && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Dependent Credits ({dependents})</span>
                    <span className="text-sm font-medium text-emerald-400">
                      -{formatCurrency(dependents * 2000)}
                    </span>
                  </div>
                )}
                <Separator className="bg-border/30" />
                <div className="flex justify-between">
                  <span className="text-sm font-semibold text-foreground">Federal Income Tax</span>
                  <span className="text-sm font-bold text-red-400">{formatCurrency(result.annualFederalTax)}</span>
                </div>
              </div>
            </div>

            {/* Right Column: FICA */}
            <div className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                FICA Taxes
              </p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Social Security (6.2% up to ${FICA_2026.socialSecurityWageCap.toLocaleString()})
                  </span>
                  <span className="text-sm font-medium text-orange-400">{formatCurrency(result.annualSocialSecurity)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Medicare (1.45%)</span>
                  <span className="text-sm font-medium text-orange-400">{formatCurrency(result.annualMedicare)}</span>
                </div>
                {result.annualAdditionalMedicare > 0 && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Additional Medicare (0.9% above ${ADDITIONAL_MEDICARE_THRESHOLD[filingStatus].toLocaleString()})
                    </span>
                    <span className="text-sm font-medium text-red-400">{formatCurrency(result.annualAdditionalMedicare)}</span>
                  </div>
                )}
                <Separator className="bg-border/30" />
                <div className="flex justify-between">
                  <span className="text-sm font-semibold text-foreground">Total FICA</span>
                  <span className="text-sm font-bold text-orange-400">{formatCurrency(result.annualFICA)}</span>
                </div>
                <Separator className="bg-border/20" />
                <div className="flex justify-between">
                  <span className="text-sm font-semibold text-foreground">Total Tax Liability</span>
                  <span className="text-sm font-bold text-red-400">{formatCurrency(result.annualTotalTax)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-semibold text-foreground">Annual Take-Home</span>
                  <span className="text-sm font-bold text-emerald-400">{formatCurrency(result.annualNetTakeHome)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ─── Charts ────────────────────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pie Chart: Where Each Paycheck Dollar Goes */}
        <Card className="border-border/50 bg-card/80">
          <CardHeader>
            <CardTitle className="text-lg">Where Each Paycheck Dollar Goes</CardTitle>
            <CardDescription>Distribution of your {payFrequencyLabel.toLowerCase()} paycheck</CardDescription>
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

        {/* Bar Chart: Monthly Take-Home Comparison */}
        <Card className="border-border/50 bg-card/80">
          <CardHeader>
            <CardTitle className="text-lg">
              {currentWithholding > 0 ? 'Current vs Recommended' : 'Per-Paycheck Breakdown'}
            </CardTitle>
            <CardDescription>
              {currentWithholding > 0
                ? 'Compare your current and recommended withholding'
                : 'Federal tax, FICA, and take-home per paycheck'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full" style={{ minHeight: 300 }}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={currentWithholding > 0 ? barData : [{
                    name: payFrequencyLabel,
                    federalTax: result.federalWithholdingPerPaycheck,
                    fica: result.ficaPerPaycheck,
                    takeHome: result.netTakeHomePerPaycheck,
                  }]}
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
                    tickFormatter={(value: number) => `$${Math.round(value)}`}
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={11}
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <Tooltip content={<BarTooltip />} />
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
                  <Bar dataKey="federalTax" name="Federal Tax" stackId="pay" fill={CHART_COLORS.federalTax} radius={[0, 0, 0, 0]} />
                  <Bar dataKey="fica" name="FICA" stackId="pay" fill={CHART_COLORS.fica} />
                  <Bar dataKey="takeHome" name="Take-Home" stackId="pay" fill={CHART_COLORS.takeHome} radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ─── W-4 Optimization Section ──────────────────────── */}
      <Card className="border-emerald-500/20 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-5 w-5 text-emerald-400" />
            W-4 Optimization Guide
          </CardTitle>
          <CardDescription>Step-by-step guidance for filling out your 2026 Form W-4</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Summary Card */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-center">
              <p className="text-xs font-medium uppercase tracking-wider text-emerald-400/80">
                Filing Status (Step 1)
              </p>
              <p className="mt-1 text-lg font-bold text-emerald-400">{FILING_LABELS[filingStatus]}</p>
              <p className="text-xs text-muted-foreground">Check box on W-4</p>
            </div>
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-center">
              <p className="text-xs font-medium uppercase tracking-wider text-amber-400/80">
                Dependents (Step 3)
              </p>
              <p className="mt-1 text-lg font-bold text-amber-400">{dependents}</p>
              <p className="text-xs text-muted-foreground">{formatCurrency(dependents * 2000)} in credits</p>
            </div>
            <div className={`rounded-xl border p-4 text-center ${result.additionalWithholdingNeeded > 0 ? 'border-red-500/20 bg-red-500/5' : 'border-emerald-500/20 bg-emerald-500/5'}`}>
              <p className={`text-xs font-medium uppercase tracking-wider ${result.additionalWithholdingNeeded > 0 ? 'text-red-400/80' : 'text-emerald-400/80'}`}>
                Additional (Step 4c)
              </p>
              <p className={`mt-1 text-lg font-bold ${result.additionalWithholdingNeeded > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                {formatCurrency(result.additionalWithholdingNeeded)}
              </p>
              <p className="text-xs text-muted-foreground">per paycheck</p>
            </div>
          </div>

          <Separator className="bg-emerald-500/20" />

          {/* Step-by-Step W-4 Instructions */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">How to Fill Out Your W-4</h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-bold text-emerald-400">
                  1
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Step 1 — Personal Information</p>
                  <p className="text-xs text-muted-foreground">
                    Enter your name, address, SSN, and check the box for your filing status: <strong className="text-foreground">{FILING_LABELS[filingStatus]}</strong>.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-bold text-emerald-400">
                  2
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Step 2 — Multiple Jobs or Working Spouse</p>
                  <p className="text-xs text-muted-foreground">
                    If you have multiple jobs or your spouse works, check the box in Step 2(c) or use the IRS withholding estimator.
                    For a single job at <strong className="text-foreground">{formatCurrency(grossAnnualIncome)}</strong>/year,
                    you can skip this step.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-400">
                  3
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Step 3 — Claim Dependents</p>
                  <p className="text-xs text-muted-foreground">
                    {dependents > 0
                      ? `Enter ${formatCurrency(dependents * 2000)} for your ${dependents} dependent${dependents > 1 ? 's' : ''} ($2,000 per qualifying child/dependent).`
                      : 'If you have qualifying children or dependents, enter the total amount here. Each qualifying dependent is worth $2,000 in 2026.'}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-500/20 text-xs font-bold text-orange-400">
                  4
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Step 4 — Other Adjustments</p>
                  <div className="mt-1 space-y-1 text-xs text-muted-foreground">
                    <p>
                      <strong className="text-foreground">4(a):</strong> Other income (not from jobs) — enter if applicable.
                    </p>
                    <p>
                      <strong className="text-foreground">4(b):</strong> Deductions — if your itemized deductions exceed the standard deduction
                      ({formatCurrency(FEDERAL_TAX_2026.standardDeductionsByFiling[filingStatus] ?? FEDERAL_TAX_2026.standardDeduction)} for {FILING_LABELS[filingStatus]}),
                      enter the difference here.
                    </p>
                    <p>
                      <strong className="text-foreground">4(c):</strong> Extra withholding —{' '}
                      {result.additionalWithholdingNeeded > 0 ? (
                        <span className="text-red-400 font-medium">
                          Enter {formatCurrency(result.additionalWithholdingNeeded)} to avoid underpayment penalties.
                        </span>
                      ) : (
                        <span>Leave blank unless you want more withheld for safety.</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-bold text-emerald-400">
                  5
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Step 5 — Sign and Date</p>
                  <p className="text-xs text-muted-foreground">
                    Sign and date the form. Submit to your employer&apos;s HR/payroll department.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-border/30" />

          {/* Key Withholding Tips */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Withholding Tips</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-border/30 bg-muted/20 p-3">
                <p className="text-sm font-medium text-foreground">Safe Harbor Rule</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  To avoid underpayment penalties, you must withhold at least 90% of your current-year tax
                  or 100% of your prior-year tax (110% if AGI &gt; $150,000).
                </p>
              </div>
              <div className="rounded-lg border border-border/30 bg-muted/20 p-3">
                <p className="text-sm font-medium text-foreground">When to Update Your W-4</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Update your W-4 whenever you experience a major life change: marriage, divorce, new child,
                  second job, or significant income change. The IRS recommends checking annually.
                </p>
              </div>
              <div className="rounded-lg border border-border/30 bg-muted/20 p-3">
                <p className="text-sm font-medium text-foreground">Big Refund? Consider Adjusting</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {result.isOverWithheld
                    ? 'Your projected refund is over $3,000 — you may be giving the government an interest-free loan. Consider reducing your withholding to increase take-home pay.'
                    : 'A large refund means you overpaid throughout the year. That money could have been in your paycheck each month instead.'}
                </p>
              </div>
              <div className="rounded-lg border border-border/30 bg-muted/20 p-3">
                <p className="text-sm font-medium text-foreground">Pre-tax Deductions Help</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  401(k) and HSA contributions reduce your taxable income, lowering both your federal tax and withholding.
                  {retirement401k > 0 || hsaContribution > 0
                    ? ` Your current deductions save you approximately ${formatCurrency((result.pretaxDeductionsPerPaycheck * PAY_PERIODS[payFrequency]) * result.marginalTaxRate)} in federal tax annually.`
                    : ' Consider maximizing these accounts to reduce your tax burden.'}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ─── Comparison Cards (if current withholding entered) ── */}
      {currentWithholding > 0 && (
        <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
              Withholding Comparison
            </CardTitle>
            <CardDescription>Side-by-side analysis of your current and recommended withholding</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Current */}
              <div className="rounded-xl border border-border/50 bg-muted/20 p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-semibold text-foreground">Current Withholding</span>
                  <Badge variant="outline" className="text-[10px]">From your pay stub</Badge>
                </div>
                <Separator className="bg-border/30" />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Federal per {payFrequencyLabel}</span>
                    <span className="font-medium text-foreground">{formatCurrency(currentWithholding)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">FICA per {payFrequencyLabel}</span>
                    <span className="font-medium text-foreground">{formatCurrency(result.ficaPerPaycheck)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Annual Federal</span>
                    <span className="font-medium text-foreground">{formatCurrency(currentWithholding * PAY_PERIODS[payFrequency])}</span>
                  </div>
                  <Separator className="bg-border/20" />
                  <div className="flex justify-between">
                    <span className="font-semibold text-foreground">Annual Total Withheld</span>
                    <span className="font-bold text-foreground">
                      {formatCurrency((currentWithholding + result.ficaPerPaycheck) * PAY_PERIODS[payFrequency])}
                    </span>
                  </div>
                </div>
              </div>

              {/* Recommended */}
              <div className={`rounded-xl border p-4 space-y-3 ${result.isUnderWithheld ? 'border-red-500/30 bg-red-500/5' : result.isOverWithheld ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-emerald-500/30 bg-emerald-500/5'}`}>
                <div className="flex items-center gap-2">
                  <Calculator className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm font-semibold text-foreground">Recommended Withholding</span>
                  <Badge className="bg-emerald-500/20 text-emerald-400 text-[10px]">Calculated</Badge>
                </div>
                <Separator className="bg-border/30" />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Federal per {payFrequencyLabel}</span>
                    <span className="font-medium text-emerald-400">{formatCurrency(result.federalWithholdingPerPaycheck)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">FICA per {payFrequencyLabel}</span>
                    <span className="font-medium text-foreground">{formatCurrency(result.ficaPerPaycheck)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Annual Federal</span>
                    <span className="font-medium text-emerald-400">{formatCurrency(result.annualFederalTax)}</span>
                  </div>
                  <Separator className="bg-border/20" />
                  <div className="flex justify-between">
                    <span className="font-semibold text-foreground">Annual Total Tax</span>
                    <span className="font-bold text-foreground">
                      {formatCurrency(result.annualTotalTax)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Difference Summary */}
            <div className="mt-4 rounded-lg border border-border/30 bg-muted/30 p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-muted-foreground">
                  {result.projectedRefund > 0 ? (
                    <>
                      You are currently over-withheld by{' '}
                      <strong className="text-emerald-400">{formatCurrency(result.projectedRefund)}</strong> per year
                      ({formatCurrency(result.projectedRefund / 12)}/month extra in your paycheck if adjusted)
                    </>
                  ) : result.projectedOwed > 0 ? (
                    <>
                      You are currently under-withheld by{' '}
                      <strong className="text-red-400">{formatCurrency(result.projectedOwed)}</strong> per year
                      — you may owe at tax time
                    </>
                  ) : (
                    <>Your withholding is closely aligned with your estimated tax liability.</>
                  )}
                </div>
                {result.projectedRefund > 0 && (
                  <Badge className="bg-emerald-500/20 text-emerald-400 text-xs">
                    +{formatCurrency(result.projectedRefund / PAY_PERIODS[payFrequency])} per paycheck refund
                  </Badge>
                )}
                {result.projectedOwed > 0 && (
                  <Badge className="bg-red-500/20 text-red-400 text-xs">
                    Under-withheld
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ─── Pre-rendered SEO Example ───────────────────── */}
      <div className="rounded-xl border border-border/30 bg-muted/10 p-6" aria-hidden="true">
        <h2 className="text-xl font-bold text-foreground">
          IRS Withholding Calculator Example: $75,000 Salary (2026)
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          For a single filer earning $75,000 annually, paid bi-weekly, with standard deduction of $16,100:
        </p>
        <div className="mt-3 space-y-1 text-sm text-muted-foreground">
          <p>Gross Annual Income: $75,000</p>
          <p>Gross Bi-Weekly Pay: $2,884.62</p>
          <p>Standard Deduction (Single): $16,100</p>
          <p>Taxable Income: $58,900</p>
          <p>Federal Income Tax: $7,670.00</p>
          <p>Federal Withholding per Paycheck: $295.00</p>
          <p>Social Security (6.2%): $4,650.00 / year ($178.85 per paycheck)</p>
          <p>Medicare (1.45%): $1,087.50 / year ($41.83 per paycheck)</p>
          <p>Total FICA per Paycheck: $220.67</p>
          <p>Total Withholding per Paycheck: $555.96</p>
          <p>Bi-Weekly Take-Home: $2,328.65</p>
          <p>Effective Tax Rate: 19.2%</p>
          <p>Marginal Tax Rate: 22%</p>
        </div>
      </div>

      <AdSlot position="mid-content" />
    </div>
  );
}
