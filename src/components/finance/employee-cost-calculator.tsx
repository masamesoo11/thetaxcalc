'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Calculator,
  ChevronDown,
  ChevronUp,
  DollarSign,
  TrendingDown,
  TrendingUp,
  Users,
  Building2,
  Briefcase,
  PieChart,
} from 'lucide-react';
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
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { AdSlot } from './ad-slot';
import { STATE_PROFILES, FICA_2026 } from '@/lib/tax-config';
import { useHashParams, updateHashState } from '@/hooks/use-hash-state';

// ─── SUTA (State Unemployment) Data ──────────────────────────────────────────
// New employer rates — approximate for 2026. These vary by experience rating.
interface SUTAProfile {
  rate: number;       // new employer rate (decimal)
  wageBase: number;   // wage base cap
}

const SUTA_RATES: Record<string, SUTAProfile> = {
  illinois:    { rate: 0.03225, wageBase: 13590 },
  texas:       { rate: 0.027,   wageBase: 9000  },
  florida:     { rate: 0.027,   wageBase: 7000  },
  california:  { rate: 0.034,   wageBase: 7000  },
  newyork:     { rate: 0.041,   wageBase: 12500 },
  georgia:     { rate: 0.027,   wageBase: 9500  },
  virginia:    { rate: 0.027,   wageBase: 8000  },
  northcarolina: { rate: 0.01,  wageBase: 29600 },
  pennsylvania: { rate: 0.03689, wageBase: 10000 },
  ohio:        { rate: 0.027,   wageBase: 9000  },
  michigan:    { rate: 0.027,   wageBase: 9500  },
  newjersey:   { rate: 0.03378, wageBase: 42100 },
  colorado:    { rate: 0.0171,  wageBase: 23200 },
  arizona:     { rate: 0.02,    wageBase: 8400  },
  washington:  { rate: 0.0277,  wageBase: 67500 },
  massachusetts: { rate: 0.0388, wageBase: 15000 },
  indiana:     { rate: 0.025,   wageBase: 9500  },
  tennessee:   { rate: 0.027,   wageBase: 7000  },
  missouri:    { rate: 0.0251,  wageBase: 14200 },
  maryland:    { rate: 0.0262,  wageBase: 8500  },
  wisconsin:   { rate: 0.036,   wageBase: 14000 },
  minnesota:   { rate: 0.0284,  wageBase: 40000 },
  oregon:      { rate: 0.0277,  wageBase: 50900 },
  // Default for remaining states
};

const DEFAULT_SUTA: SUTAProfile = { rate: 0.027, wageBase: 9000 };

// ─── FUTA Constants ─────────────────────────────────────────────────────────
const FUTA_RATE = 0.006; // 6% minus 5.4% credit = 0.6% effective
const FUTA_WAGE_BASE = 7000;

// ─── Format Helpers ─────────────────────────────────────────────────────────
function fmt(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function fmtPrecise(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function fmtPct(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

// ─── Calculation Interface ──────────────────────────────────────────────────
interface EmployeeCostResult {
  // Per-employee
  salaryPerEmployee: number;
  employerFICA: number;
  employerSS: number;
  employerMedicare: number;
  futaPerEmployee: number;
  sutaPerEmployee: number;
  benefitsPerEmployee: number;
  totalCostPerEmployee: number;
  costOverSalary: number; // percentage above base salary

  // Totals
  totalSalaries: number;
  totalEmployerFICA: number;
  totalFUTA: number;
  totalSUTA: number;
  totalBenefits: number;
  totalPayrollCost: number;
  monthlyPayrollCost: number;

  // State info
  stateName: string;
  stateTaxRate: number;
  sutaRate: number;
  sutaWageBase: number;
}

function calculateEmployeeCost(
  numEmployees: number,
  avgSalary: number,
  stateKey: string,
  benefitsRate: number,
): EmployeeCostResult {
  const state = STATE_PROFILES[stateKey];
  const stateName = state?.name || 'United States';
  const suta = SUTA_RATES[stateKey] || DEFAULT_SUTA;

  // Per-employee employer FICA
  const ssWages = Math.min(avgSalary, FICA_2026.socialSecurityWageCap);
  const employerSS = ssWages * FICA_2026.socialSecurityRate; // 6.2%
  const employerMedicare = avgSalary * FICA_2026.medicareRate; // 1.45%
  const employerFICA = employerSS + employerMedicare; // 7.65%

  // FUTA per employee
  const futaPerEmployee = Math.min(avgSalary, FUTA_WAGE_BASE) * FUTA_RATE;

  // SUTA per employee
  const sutaPerEmployee = Math.min(avgSalary, suta.wageBase) * suta.rate;

  // Benefits per employee
  const benefitsPerEmployee = avgSalary * benefitsRate;

  // Total per employee
  const totalCostPerEmployee =
    avgSalary + employerFICA + futaPerEmployee + sutaPerEmployee + benefitsPerEmployee;

  // Percentage over salary
  const costOverSalary = (totalCostPerEmployee - avgSalary) / avgSalary;

  // Totals
  const totalSalaries = avgSalary * numEmployees;
  const totalEmployerFICA = employerFICA * numEmployees;
  const totalFUTA = futaPerEmployee * numEmployees;
  const totalSUTA = sutaPerEmployee * numEmployees;
  const totalBenefits = benefitsPerEmployee * numEmployees;
  const totalPayrollCost = totalCostPerEmployee * numEmployees;
  const monthlyPayrollCost = totalPayrollCost / 12;

  return {
    salaryPerEmployee: avgSalary,
    employerFICA,
    employerSS,
    employerMedicare,
    futaPerEmployee,
    sutaPerEmployee,
    benefitsPerEmployee,
    totalCostPerEmployee,
    costOverSalary,
    totalSalaries,
    totalEmployerFICA,
    totalFUTA,
    totalSUTA,
    totalBenefits,
    totalPayrollCost,
    monthlyPayrollCost,
    stateName,
    stateTaxRate: state?.incomeTaxRate || 0,
    sutaRate: suta.rate,
    sutaWageBase: suta.wageBase,
  };
}

// ─── Component ──────────────────────────────────────────────────────────────
export function EmployeeCostCalculator() {
  const hashParams = useHashParams();
  const [numEmployees, setNumEmployees] = useState<number>(() =>
    hashParams.emp ? Number(hashParams.emp) : 5
  );
  const [avgSalary, setAvgSalary] = useState<number>(() =>
    hashParams.sal ? Number(hashParams.sal) : 75000
  );
  const [stateKey, setStateKey] = useState<string>(() =>
    hashParams.state || 'illinois'
  );
  const [benefitsRate, setBenefitsRate] = useState<number>(() =>
    hashParams.ben ? Number(hashParams.ben) : 20
  );
  const [advancedOpen, setAdvancedOpen] = useState(false);

  // Sync to URL hash
  useEffect(() => {
    updateHashState('employee-cost', {
      emp: numEmployees,
      sal: avgSalary,
      state: stateKey,
      ben: benefitsRate,
    });
  }, [numEmployees, avgSalary, stateKey, benefitsRate]);

  // Compute results
  const result = useMemo(
    () => calculateEmployeeCost(numEmployees, avgSalary, stateKey, benefitsRate / 100),
    [numEmployees, avgSalary, stateKey, benefitsRate]
  );

  return (
    <div className="space-y-6">
      {/* ─── Page Title ────────────────────────────────────── */}
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Employee Cost Calculator
        </h2>
        <p className="mt-2 text-muted-foreground">
          Estimate the true cost of hiring — salary, employer taxes, and benefits in one view
        </p>
      </div>

      {/* ─── Form + Results Grid ──────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Left: Form */}
        <div className="space-y-4 lg:col-span-3">
          {/* Quick Start */}
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calculator className="h-5 w-5 text-emerald-400" />
                Quick Start
              </CardTitle>
              <CardDescription>
                Enter your payroll details for an instant calculation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="numEmployees" className="text-sm font-medium">
                    Number of Employees
                  </Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="numEmployees"
                      type="number"
                      min={1}
                      max={9999}
                      value={numEmployees || ''}
                      onChange={(e) => setNumEmployees(Number(e.target.value) || 1)}
                      className="pl-9"
                      placeholder="5"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="avgSalary" className="text-sm font-medium">
                    Average Annual Salary
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="avgSalary"
                      type="number"
                      min={0}
                      value={avgSalary || ''}
                      onChange={(e) => setAvgSalary(Number(e.target.value) || 0)}
                      className="pl-9"
                      placeholder="75000"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="state" className="text-sm font-medium">
                    State
                  </Label>
                  <Select value={stateKey} onValueChange={setStateKey}>
                    <SelectTrigger id="state">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(STATE_PROFILES).map(([key, profile]) => (
                        <SelectItem key={key} value={key}>
                          {profile.name} ({profile.incomeTaxType === 'none' ? '0%' : `${(profile.incomeTaxRate * 100).toFixed(2)}%`})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="benefits" className="text-sm font-medium">
                    Benefits Rate (% of Salary)
                  </Label>
                  <div className="relative">
                    <PieChart className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="benefits"
                      type="number"
                      min={0}
                      max={100}
                      step={1}
                      value={benefitsRate || ''}
                      onChange={(e) => setBenefitsRate(Number(e.target.value) || 0)}
                      className="pl-9"
                      placeholder="20"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Typical: 20–30% (health insurance, retirement, PTO)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Options */}
          <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
            <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer pb-4 transition-colors hover:bg-muted/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-amber-400" />
                      <CardTitle className="text-lg">Employer Tax Details</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {result.stateName}
                      </Badge>
                    </div>
                    {advancedOpen ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <CardDescription>
                    FICA, FUTA, and SUTA rates used in this calculation
                  </CardDescription>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="space-y-3 pt-0">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg bg-muted/30 p-3">
                      <p className="text-xs text-muted-foreground">Employer Social Security</p>
                      <p className="text-lg font-bold text-foreground">6.2%</p>
                      <p className="text-xs text-muted-foreground">Up to ${FICA_2026.socialSecurityWageCap.toLocaleString()} per employee</p>
                    </div>
                    <div className="rounded-lg bg-muted/30 p-3">
                      <p className="text-xs text-muted-foreground">Employer Medicare</p>
                      <p className="text-lg font-bold text-foreground">1.45%</p>
                      <p className="text-xs text-muted-foreground">No wage cap</p>
                    </div>
                    <div className="rounded-lg bg-muted/30 p-3">
                      <p className="text-xs text-muted-foreground">FUTA (effective)</p>
                      <p className="text-lg font-bold text-foreground">0.6%</p>
                      <p className="text-xs text-muted-foreground">On first $7,000 per employee</p>
                    </div>
                    <div className="rounded-lg bg-muted/30 p-3">
                      <p className="text-xs text-muted-foreground">SUTA — {result.stateName}</p>
                      <p className="text-lg font-bold text-foreground">{fmtPct(result.sutaRate)}</p>
                      <p className="text-xs text-muted-foreground">On first ${result.sutaWageBase.toLocaleString()} (new employer rate)</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    SUTA rates are new-employer estimates and decrease with experience rating. Your actual rate may be lower after 2–3 years.
                  </p>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          <AdSlot position="after-form" />
        </div>

        {/* Right: Results */}
        <div className="lg:col-span-2">
          <Card className="sticky top-20 border-emerald-500/20 bg-card/90 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-emerald-400" />
                Live Results
              </CardTitle>
              <CardDescription>
                Total payroll cost updates instantly
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Total Annual Payroll Cost - Hero Number */}
              <div className="rounded-xl bg-emerald-500/10 p-4 text-center">
                <p className="text-xs font-medium uppercase tracking-wider text-emerald-400/80">
                  Total Annual Payroll Cost
                </p>
                <p className="mt-1 text-3xl font-bold text-emerald-400">
                  {fmt(result.totalPayrollCost)}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Monthly: {fmt(result.monthlyPayrollCost)}
                </p>
              </div>

              <Separator className="bg-border/40" />

              {/* Per-Employee Summary */}
              <div className="rounded-lg bg-muted/30 p-3">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Cost Per Employee
                </p>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-sm text-muted-foreground">Total Cost</span>
                  <span className="text-lg font-bold text-foreground">{fmtPrecise(result.totalCostPerEmployee)}</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-muted-foreground">Base Salary</span>
                  <span className="text-sm font-medium text-foreground">{fmtPrecise(result.salaryPerEmployee)}</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-muted-foreground">Over Salary</span>
                  <span className="text-sm font-bold text-amber-400">+{fmtPct(result.costOverSalary)}</span>
                </div>
              </div>

              <Separator className="bg-border/40" />

              {/* Breakdown */}
              <div className="space-y-2.5">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Annual Breakdown
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Base Salaries</span>
                  <span className="text-sm font-semibold text-foreground">{fmt(result.totalSalaries)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <TrendingDown className="h-3.5 w-3.5 text-orange-400" />
                    Employer FICA
                  </span>
                  <span className="text-sm font-medium text-orange-400">{fmt(result.totalEmployerFICA)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <TrendingDown className="h-3.5 w-3.5 text-amber-400" />
                    FUTA + SUTA
                  </span>
                  <span className="text-sm font-medium text-amber-400">{fmt(result.totalFUTA + result.totalSUTA)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Briefcase className="h-3.5 w-3.5 text-blue-400" />
                    Benefits ({benefitsRate}%)
                  </span>
                  <span className="text-sm font-medium text-blue-400">{fmt(result.totalBenefits)}</span>
                </div>
              </div>

              <Separator className="bg-border/40" />

              {/* Cost Ratio */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-muted/30 p-2.5 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Salary Portion
                  </p>
                  <p className="text-lg font-bold text-foreground">
                    {fmtPct(result.totalSalaries / result.totalPayrollCost)}
                  </p>
                </div>
                <div className="rounded-lg bg-muted/30 p-2.5 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Employer Costs
                  </p>
                  <p className="text-lg font-bold text-amber-400">
                    {fmtPct(1 - result.totalSalaries / result.totalPayrollCost)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6">
            <AdSlot position="after-results" />
          </div>
        </div>
      </div>

      {/* ─── Pre-Rendered Example for SEO/LLM Crawlers ──────── */}
      <div className="mt-8 rounded-xl border border-border/30 bg-muted/10 p-6" aria-hidden="true">
        <h2 className="text-xl font-bold text-foreground">
          Example: True Cost of 5 Employees Earning $75,000 in Illinois (2026)
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          For a small business with 5 employees earning $75,000/year in Illinois with 20% benefits:
        </p>
        <div className="mt-4 space-y-1 text-sm text-muted-foreground">
          <p>Total Base Salaries: $375,000.00</p>
          <p>Employer FICA (7.65%): $28,687.50</p>
          <p>FUTA (0.6% on first $7,000): $210.00</p>
          <p>Illinois SUTA (3.225% on first $13,590): $2,190.99</p>
          <p>Benefits (20% of salary): $75,000.00</p>
          <p>Total Annual Payroll Cost: $481,088.49</p>
          <p>Cost Per Employee: $96,217.70 (28.3% above base salary)</p>
          <p>Monthly Payroll Cost: $40,090.71</p>
        </div>
      </div>

      {/* ─── Cost Breakdown Bar Chart ────────────────────────── */}
      <CostBreakdownChart result={result} numEmployees={numEmployees} />

      <AdSlot position="mid-content" />
    </div>
  );
}

// ─── Simple Cost Breakdown Visual ───────────────────────────────────────────
function CostBreakdownChart({ result, numEmployees }: { result: EmployeeCostResult; numEmployees: number }) {
  const segments = [
    { label: 'Base Salaries', value: result.totalSalaries, color: 'bg-emerald-500' },
    { label: 'Employer FICA', value: result.totalEmployerFICA, color: 'bg-orange-500' },
    { label: 'FUTA + SUTA', value: result.totalFUTA + result.totalSUTA, color: 'bg-amber-500' },
    { label: 'Benefits', value: result.totalBenefits, color: 'bg-blue-500' },
  ];

  const total = segments.reduce((sum, s) => sum + s.value, 0);

  return (
    <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <PieChart className="h-5 w-5 text-emerald-400" />
          Where Your Payroll Dollars Go
        </CardTitle>
        <CardDescription>
          {numEmployees} employee{numEmployees > 1 ? 's' : ''} in {result.stateName} — annual breakdown
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stacked Bar */}
        <div className="flex h-10 w-full overflow-hidden rounded-lg">
          {segments.map((seg) => {
            const pct = (seg.value / total) * 100;
            return (
              <div
                key={seg.label}
                className={`${seg.color} flex items-center justify-center text-xs font-medium text-white transition-all`}
                style={{ width: `${pct}%` }}
                title={`${seg.label}: ${fmt(seg.value)} (${fmtPct(seg.value / total)})`}
              >
                {pct >= 10 ? `${fmtPct(seg.value / total)}` : ''}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="grid gap-3 sm:grid-cols-2">
          {segments.map((seg) => (
            <div key={seg.label} className="flex items-center justify-between rounded-lg bg-muted/30 p-3">
              <div className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-sm ${seg.color}`} />
                <span className="text-sm text-muted-foreground">{seg.label}</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold text-foreground">{fmt(seg.value)}</span>
                <span className="ml-2 text-xs text-muted-foreground">({fmtPct(seg.value / total)})</span>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-3 pt-2">
          <div className="rounded-lg bg-emerald-500/10 p-3 text-center">
            <p className="text-[10px] uppercase tracking-wider text-emerald-400/80">Total Cost</p>
            <p className="text-lg font-bold text-emerald-400">{fmt(total)}</p>
          </div>
          <div className="rounded-lg bg-amber-500/10 p-3 text-center">
            <p className="text-[10px] uppercase tracking-wider text-amber-400/80">Over Salary</p>
            <p className="text-lg font-bold text-amber-400">+{fmtPct(result.costOverSalary)}</p>
          </div>
          <div className="rounded-lg bg-blue-500/10 p-3 text-center">
            <p className="text-[10px] uppercase tracking-wider text-blue-400/80">Per Employee</p>
            <p className="text-lg font-bold text-blue-400">{fmt(result.totalCostPerEmployee)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
