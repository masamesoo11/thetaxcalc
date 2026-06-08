'use client';

import { useMemo, useState, useCallback } from 'react';
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
import {
  Calculator,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Zap,
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
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { AdSlot } from './ad-slot';
import { FEDERAL_TAX_2026, FICA_2026, STATE_PROFILES } from '@/lib/tax-config';
import { formatCurrency, roundCurrency, calculateFederalTax, calculateStateTax } from '@/lib/finance-utils';

// ─── Types ──────────────────────────────────────────────────────────────────────

type FilingStatus = 'single' | 'married' | 'head_of_household';

const FILING_LABELS: Record<FilingStatus, string> = {
  single: 'Single',
  married: 'Married Filing Jointly',
  head_of_household: 'Head of Household',
};

// ─── States that conform to federal OT exemption ────────────────────────────────
// As of 2025, most states have NOT conformed. Only states with no income tax
// effectively "follow" since they don't tax overtime either way.

const OT_EXEMPT_STATES: string[] = [
  'texas', 'florida', // No state income tax — OT not taxed at state level
];

// ─── Get Marginal Federal Rate ──────────────────────────────────────────────────

function getMarginalFederalRate(
  annualGross: number,
  filingStatus: FilingStatus
): number {
  const brackets = FEDERAL_TAX_2026.bracketsByFiling[filingStatus];
  const stdDeduction = FEDERAL_TAX_2026.standardDeductionsByFiling[filingStatus];
  const taxableIncome = Math.max(0, annualGross - stdDeduction);

  for (let i = brackets.length - 1; i >= 0; i--) {
    if (taxableIncome >= brackets[i].min) {
      return brackets[i].rate;
    }
  }
  return 0;
}

// ─── Calculation ────────────────────────────────────────────────────────────────

interface OvertimeTaxResult {
  // Income breakdown
  regularPay: number;
  overtimePay: number;
  totalGross: number;

  // WITH the law (OT exempt from federal income tax)
  federalTaxWithLaw: number;
  ficaOnOvertime: number;
  ficaOnRegular: number;
  ficaTotal: number;
  stateTaxWithLaw: number;
  totalTaxWithLaw: number;
  takeHomeWithLaw: number;

  // WITHOUT the law (OT taxed normally)
  federalTaxWithoutLaw: number;
  stateTaxWithoutLaw: number;
  totalTaxWithoutLaw: number;
  takeHomeWithoutLaw: number;

  // Savings
  federalTaxSavings: number;
  stateTaxSavings: number;
  totalSavings: number;
  savingsPerOvertimeHour: number;
  savingsPerOvertimeWeek: number;

  // Rates
  marginalRate: number;
  effectiveRateWithLaw: number;
  effectiveRateWithoutLaw: number;
}

function calculateOvertimeTax(
  hourlyWage: number,
  regularHours: number,
  overtimeHours: number,
  overtimeMultiplier: number,
  weeksPerYear: number,
  filingStatus: FilingStatus,
  stateKey: string
): OvertimeTaxResult {
  const regularPay = hourlyWage * regularHours * weeksPerYear;
  const overtimePay = hourlyWage * overtimeMultiplier * overtimeHours * weeksPerYear;
  const totalGross = regularPay + overtimePay;

  // FICA is always on ALL wages (including overtime) — NOT exempt
  const ssWages = Math.min(totalGross, FICA_2026.socialSecurityWageCap);
  const ficaSS = ssWages * FICA_2026.socialSecurityRate;
  const ficaMedicare = totalGross * FICA_2026.medicareRate;
  const ficaAdditionalMedicare = totalGross > FICA_2026.additionalMedicareThreshold
    ? (totalGross - FICA_2026.additionalMedicareThreshold) * FICA_2026.additionalMedicareRate
    : 0;
  const ficaTotal = ficaSS + ficaMedicare + ficaAdditionalMedicare;

  // FICA on just overtime portion
  const ficaOnOvertime = overtimePay * FICA_2026.totalRate;

  // FICA on just regular portion (approximate)
  const ficaOnRegular = ficaTotal - ficaOnOvertime;

  // Marginal federal rate (determines tax rate on OT without exemption)
  const marginalRate = getMarginalFederalRate(totalGross, filingStatus);

  // ─── WITH the law: OT exempt from federal income tax ──────────────────────
  // Federal tax is only on regular pay
  const federalTaxWithLaw = calculateFederalTax(regularPay, filingStatus);
  const stateTaxWithLaw = calculateStateTax(totalGross, stateKey, filingStatus);
  const totalTaxWithLaw = federalTaxWithLaw + ficaTotal + stateTaxWithLaw;
  const takeHomeWithLaw = totalGross - totalTaxWithLaw;

  // ─── WITHOUT the law: OT taxed normally ───────────────────────────────────
  const federalTaxWithoutLaw = calculateFederalTax(totalGross, filingStatus);
  const stateTaxWithoutLaw = stateTaxWithLaw; // State tax same either way (most states don't follow)
  const totalTaxWithoutLaw = federalTaxWithoutLaw + ficaTotal + stateTaxWithoutLaw;
  const takeHomeWithoutLaw = totalGross - totalTaxWithoutLaw;

  // ─── Savings from the exemption ──────────────────────────────────────────
  const federalTaxSavings = federalTaxWithoutLaw - federalTaxWithLaw;
  const stateTaxSavings = 0; // Most states still tax OT
  const totalSavings = federalTaxSavings + stateTaxSavings;
  const totalOvertimeHours = overtimeHours * weeksPerYear;
  const savingsPerOvertimeHour = totalOvertimeHours > 0 ? totalSavings / totalOvertimeHours : 0;
  const savingsPerOvertimeWeek = overtimeHours > 0 ? totalSavings / weeksPerYear : 0;

  // Effective rates
  const effectiveRateWithLaw = totalGross > 0 ? totalTaxWithLaw / totalGross : 0;
  const effectiveRateWithoutLaw = totalGross > 0 ? totalTaxWithoutLaw / totalGross : 0;

  return {
    regularPay: roundCurrency(regularPay),
    overtimePay: roundCurrency(overtimePay),
    totalGross: roundCurrency(totalGross),
    federalTaxWithLaw: roundCurrency(federalTaxWithLaw),
    ficaOnOvertime: roundCurrency(ficaOnOvertime),
    ficaOnRegular: roundCurrency(ficaOnRegular),
    ficaTotal: roundCurrency(ficaTotal),
    stateTaxWithLaw: roundCurrency(stateTaxWithLaw),
    totalTaxWithLaw: roundCurrency(totalTaxWithLaw),
    takeHomeWithLaw: roundCurrency(takeHomeWithLaw),
    federalTaxWithoutLaw: roundCurrency(federalTaxWithoutLaw),
    stateTaxWithoutLaw: roundCurrency(stateTaxWithoutLaw),
    totalTaxWithoutLaw: roundCurrency(totalTaxWithoutLaw),
    takeHomeWithoutLaw: roundCurrency(takeHomeWithoutLaw),
    federalTaxSavings: roundCurrency(federalTaxSavings),
    stateTaxSavings: roundCurrency(stateTaxSavings),
    totalSavings: roundCurrency(totalSavings),
    savingsPerOvertimeHour: roundCurrency(savingsPerOvertimeHour),
    savingsPerOvertimeWeek: roundCurrency(savingsPerOvertimeWeek),
    marginalRate,
    effectiveRateWithLaw,
    effectiveRateWithoutLaw,
  };
}

// ─── Chart Colors ───────────────────────────────────────────────────────────────

const CHART_COLORS = {
  regularPay: '#10b981',       // emerald-500
  overtimePay: '#34d399',      // emerald-400
  federalTax: '#ef4444',       // red-500
  fica: '#f59e0b',             // amber-500
  stateTax: '#f97316',         // orange-500
  takeHome: '#10b981',         // emerald-500
  savings: '#22d3ee',          // cyan-400
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

// ─── Real-World Examples ────────────────────────────────────────────────────────

interface RealWorldExample {
  wage: number;
  otHours: number;
  filingStatus: FilingStatus;
  stateKey: string;
}

function calculateExampleSavings(wage: number, otHours: number, filingStatus: FilingStatus = 'single', stateKey: string = 'illinois'): {
  savings: number;
  otPay: number;
  totalGross: number;
} {
  const result = calculateOvertimeTax(wage, 40, otHours, 1.5, 52, filingStatus, stateKey);
  return {
    savings: result.totalSavings,
    otPay: result.overtimePay,
    totalGross: result.totalGross,
  };
}

// ─── Main Component ─────────────────────────────────────────────────────────────

export function OvertimeTaxCalculator() {
  const [hourlyWage, setHourlyWage] = useState<number>(30);
  const [regularHours, setRegularHours] = useState<number>(40);
  const [overtimeHours, setOvertimeHours] = useState<number>(10);
  const [overtimeMultiplier, setOvertimeMultiplier] = useState<number>(1.5);
  const [weeksPerYear, setWeeksPerYear] = useState<number>(52);
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const [stateKey, setStateKey] = useState<string>('illinois');
  const [hasCalculated, setHasCalculated] = useState(false);

  const result = useMemo(() => {
    if (hourlyWage <= 0 || regularHours <= 0 || overtimeHours <= 0 || weeksPerYear <= 0) {
      return null;
    }
    return calculateOvertimeTax(
      hourlyWage,
      regularHours,
      overtimeHours,
      overtimeMultiplier,
      weeksPerYear,
      filingStatus,
      stateKey
    );
  }, [hourlyWage, regularHours, overtimeHours, overtimeMultiplier, weeksPerYear, filingStatus, stateKey]);

  // Track usage
  const trackUsage = useCallback(() => {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ calculator: 'overtime-tax' }),
    }).catch(() => {});
  }, []);

  const handleCalculate = () => {
    setHasCalculated(true);
    trackUsage();
  };

  // Auto-calculate on any input change after first calculation
  const handleInputChange = (setter: (v: number) => void) => (value: number) => {
    setter(value);
    if (hasCalculated) setHasCalculated(true);
  };

  // Pie chart data: tax breakdown WITH the law
  const pieData = useMemo(() => {
    if (!result) return [];
    return [
      { name: 'Federal Tax', value: result.federalTaxWithLaw, fill: CHART_COLORS.federalTax },
      { name: 'FICA (SS + Medicare)', value: result.ficaTotal, fill: CHART_COLORS.fica },
      ...(result.stateTaxWithLaw > 0 ? [{ name: 'State Tax', value: result.stateTaxWithLaw, fill: CHART_COLORS.stateTax }] : []),
      { name: 'Take-Home Pay', value: Math.max(0, result.takeHomeWithLaw), fill: CHART_COLORS.takeHome },
    ].filter((e) => e.value > 0);
  }, [result]);

  // Bar chart data: WITH vs WITHOUT
  const barData = useMemo(() => {
    if (!result) return [];
    return [
      {
        name: 'Take-Home',
        withLaw: result.takeHomeWithLaw,
        withoutLaw: result.takeHomeWithoutLaw,
      },
      {
        name: 'Federal Tax',
        withLaw: result.federalTaxWithLaw,
        withoutLaw: result.federalTaxWithoutLaw,
      },
      {
        name: 'FICA',
        withLaw: result.ficaTotal,
        withoutLaw: result.ficaTotal,
      },
      ...(result.stateTaxWithLaw > 0 ? [{
        name: 'State Tax',
        withLaw: result.stateTaxWithLaw,
        withoutLaw: result.stateTaxWithoutLaw,
      }] : []),
    ];
  }, [result]);

  // Real-world examples
  const examples = useMemo(() => [
    {
      label: '$25/hr, 10 hrs OT/week',
      ...calculateExampleSavings(25, 10),
    },
    {
      label: '$40/hr, 15 hrs OT/week',
      ...calculateExampleSavings(40, 15),
    },
    {
      label: '$60/hr, 8 hrs OT/week',
      ...calculateExampleSavings(60, 8),
    },
  ], []);

  const stateConformsToOTExemption = OT_EXEMPT_STATES.includes(stateKey);

  return (
    <div className="space-y-6">
      {/* ─── Page Title ─────────────────────────────────── */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2">
          <h2 className="flex items-center gap-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            <Zap className="h-8 w-8 text-emerald-400" />
            No Tax on Overtime Calculator
          </h2>
        </div>
        <p className="mt-2 text-muted-foreground">
          Calculate your savings under the 2025–2028 overtime tax exemption — see how much more you take home
        </p>
        <div className="mt-3 flex items-center justify-center gap-2">
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs font-semibold px-3 py-1 animate-pulse">
            <AlertTriangle className="mr-1 h-3 w-3" />
            2025–2028 Law — Act Now
          </Badge>
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs px-3 py-1">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            In Effect Now
          </Badge>
        </div>
      </div>

      {/* ─── Urgent Law Info Card ──────────────────────── */}
      <Card className="border-amber-500/30 bg-amber-500/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">What the No Tax on Overtime Law Does</p>
              <p>
                Under the <strong className="text-foreground">2025 Trump tax law</strong>, overtime pay is{' '}
                <strong className="text-emerald-400">exempt from federal income tax</strong> — but{' '}
                <strong className="text-amber-400">NOT from FICA</strong> (Social Security 6.2% + Medicare 1.45%).
                This applies from <strong className="text-foreground">2025 through 2028</strong> and sunsets after December 31, 2028.
                Only &quot;overtime&quot; pay (hours beyond 40/week at 1.5x rate or higher) qualifies.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ─── Input + Results Grid ──────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Left: Input Form */}
        <div className="space-y-4 lg:col-span-3">
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calculator className="h-5 w-5 text-emerald-400" />
                Overtime Details
              </CardTitle>
              <CardDescription>Enter your pay and overtime information to calculate your savings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Hourly Wage */}
                <div className="space-y-2">
                  <Label htmlFor="ot-wage" className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
                      Hourly Wage
                    </span>
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="ot-wage"
                      type="number"
                      min={0}
                      step={0.5}
                      value={hourlyWage || ''}
                      onChange={(e) => handleInputChange(setHourlyWage)(Number(e.target.value) || 0)}
                      className="pl-9"
                      placeholder="30"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Your base hourly rate before OT</p>
                </div>

                {/* Overtime Hours per Week */}
                <div className="space-y-2">
                  <Label htmlFor="ot-hours" className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-amber-400" />
                      Overtime Hours / Week
                    </span>
                  </Label>
                  <Input
                    id="ot-hours"
                    type="number"
                    min={0}
                    max={80}
                    value={overtimeHours || ''}
                    onChange={(e) => handleInputChange(setOvertimeHours)(Number(e.target.value) || 0)}
                    placeholder="10"
                  />
                  <p className="text-xs text-muted-foreground">Hours beyond 40 per week</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Regular Hours per Week */}
                <div className="space-y-2">
                  <Label htmlFor="ot-regular-hours" className="text-sm font-medium">
                    Regular Hours / Week
                  </Label>
                  <Input
                    id="ot-regular-hours"
                    type="number"
                    min={1}
                    max={40}
                    value={regularHours || ''}
                    onChange={(e) => handleInputChange(setRegularHours)(Number(e.target.value) || 40)}
                    placeholder="40"
                  />
                  <p className="text-xs text-muted-foreground">Standard 40 hours for most workers</p>
                </div>

                {/* OT Rate Multiplier */}
                <div className="space-y-2">
                  <Label htmlFor="ot-multiplier" className="text-sm font-medium">
                    OT Rate Multiplier
                  </Label>
                  <Select
                    value={String(overtimeMultiplier)}
                    onValueChange={(v) => handleInputChange(setOvertimeMultiplier)(Number(v))}
                  >
                    <SelectTrigger id="ot-multiplier">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1.5">1.5x (Standard OT)</SelectItem>
                      <SelectItem value="2">2.0x (Double-Time)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">FLSA minimum is 1.5x for hours over 40</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {/* Weeks Worked per Year */}
                <div className="space-y-2">
                  <Label htmlFor="ot-weeks" className="text-sm font-medium">
                    Weeks / Year
                  </Label>
                  <Input
                    id="ot-weeks"
                    type="number"
                    min={1}
                    max={52}
                    value={weeksPerYear || ''}
                    onChange={(e) => handleInputChange(setWeeksPerYear)(Number(e.target.value) || 52)}
                    placeholder="52"
                  />
                </div>

                {/* Filing Status */}
                <div className="space-y-2">
                  <Label htmlFor="ot-filing" className="text-sm font-medium">Filing Status</Label>
                  <Select value={filingStatus} onValueChange={(v) => setFilingStatus(v as FilingStatus)}>
                    <SelectTrigger id="ot-filing">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(FILING_LABELS).map(([key, label]) => (
                        <SelectItem key={key} value={key}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* State */}
                <div className="space-y-2">
                  <Label htmlFor="ot-state" className="text-sm font-medium">State</Label>
                  <Select value={stateKey} onValueChange={setStateKey}>
                    <SelectTrigger id="ot-state">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(STATE_PROFILES).map(([key, profile]) => (
                        <SelectItem key={key} value={key}>
                          {profile.name} ({profile.incomeTaxType === 'none' ? 'No tax' : `${(profile.incomeTaxRate * 100).toFixed(2)}%`})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator className="bg-border/40" />

              {/* Calculate Button */}
              <Button
                onClick={handleCalculate}
                disabled={hourlyWage <= 0 || overtimeHours <= 0}
                className="w-full bg-emerald-600 text-white hover:bg-emerald-700 sm:w-auto"
                size="lg"
              >
                <Zap className="mr-2 h-4 w-4" />
                Calculate Overtime Savings
              </Button>
            </CardContent>
          </Card>

          <AdSlot position="after-form" />
        </div>

        {/* Right: Quick Summary / Live Results */}
        <div className="lg:col-span-2">
          <Card className="sticky top-20 border-emerald-500/20 bg-card/90 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-emerald-400" />
                Quick Summary
              </CardTitle>
              <CardDescription>
                Your overtime numbers at a glance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Overtime Pay */}
              <div className="rounded-xl bg-emerald-500/10 p-4 text-center">
                <p className="text-xs font-medium uppercase tracking-wider text-emerald-400/80">
                  Annual Overtime Pay
                </p>
                <p className="mt-1 text-3xl font-bold text-emerald-400">
                  {result ? formatCurrency(result.overtimePay) : formatCurrency(0)}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {overtimeHours} hrs/week × {overtimeMultiplier}x rate × {weeksPerYear} weeks
                </p>
              </div>

              <Separator className="bg-border/40" />

              {/* Income Breakdown */}
              <div className="space-y-2.5">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Income Breakdown
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Regular Pay</span>
                  <span className="text-sm font-medium text-foreground">
                    {result ? formatCurrency(result.regularPay) : formatCurrency(0)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="h-3.5 w-3.5 text-amber-400" />
                    Overtime Pay
                  </span>
                  <span className="text-sm font-medium text-emerald-400">
                    {result ? formatCurrency(result.overtimePay) : formatCurrency(0)}
                  </span>
                </div>
                <Separator className="bg-border/20" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Total Gross</span>
                  <span className="text-sm font-bold text-foreground">
                    {result ? formatCurrency(result.totalGross) : formatCurrency(0)}
                  </span>
                </div>
              </div>

              <Separator className="bg-border/40" />

              {/* Tax Rates */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-muted/30 p-2.5 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Marginal Rate
                  </p>
                  <p className="text-lg font-bold text-foreground">
                    {result ? `${(result.marginalRate * 100).toFixed(0)}%` : '—'}
                  </p>
                </div>
                <div className="rounded-lg bg-muted/30 p-2.5 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    OT Hrs / Year
                  </p>
                  <p className="text-lg font-bold text-foreground">
                    {(overtimeHours * weeksPerYear).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* State Conformity Notice */}
              <div className={`rounded-lg p-3 ${stateConformsToOTExemption ? 'bg-emerald-500/10' : 'bg-amber-500/10'}`}>
                <div className="flex items-start gap-2">
                  {stateConformsToOTExemption ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  ) : (
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                  )}
                  <div className="text-xs text-muted-foreground">
                    {stateConformsToOTExemption ? (
                      <p><strong className="text-emerald-400">{STATE_PROFILES[stateKey]?.name}:</strong> No state income tax — your overtime is not taxed at the state level.</p>
                    ) : (
                      <p><strong className="text-amber-400">{STATE_PROFILES[stateKey]?.name}:</strong> State still taxes overtime income. Only federal income tax is exempt.</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ─── Results Section ────────────────────────────── */}
      {result && hasCalculated && (
        <div className="space-y-6">
          {/* Hero Comparison */}
          <Card className="border-emerald-500/30 bg-card/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs font-semibold">
                  <AlertTriangle className="mr-1 h-3 w-3" />
                  2025–2028 Law — Act Now
                </Badge>
              </div>

              {/* Side-by-side Comparison */}
              <div className="grid gap-6 sm:grid-cols-2">
                {/* WITH the law */}
                <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-5 text-center">
                  <p className="text-xs font-medium uppercase tracking-wider text-emerald-400/80">
                    <CheckCircle2 className="mr-1 inline h-3.5 w-3.5" />
                    With OT Tax Exemption
                  </p>
                  <p className="mt-2 text-4xl font-bold text-emerald-400">
                    {formatCurrency(result.takeHomeWithLaw)}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">Annual Take-Home</p>
                  <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Federal Tax</span>
                      <span className="text-red-400">-{formatCurrency(result.federalTaxWithLaw)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>FICA</span>
                      <span className="text-orange-400">-{formatCurrency(result.ficaTotal)}</span>
                    </div>
                    {result.stateTaxWithLaw > 0 && (
                      <div className="flex justify-between">
                        <span>State Tax</span>
                        <span className="text-amber-400">-{formatCurrency(result.stateTaxWithLaw)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* WITHOUT the law */}
                <div className="rounded-xl bg-muted/30 border border-border/30 p-5 text-center">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    <TrendingDown className="mr-1 inline h-3.5 w-3.5" />
                    Without OT Tax Exemption
                  </p>
                  <p className="mt-2 text-4xl font-bold text-muted-foreground">
                    {formatCurrency(result.takeHomeWithoutLaw)}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">Annual Take-Home</p>
                  <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Federal Tax</span>
                      <span className="text-red-400">-{formatCurrency(result.federalTaxWithoutLaw)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>FICA</span>
                      <span className="text-orange-400">-{formatCurrency(result.ficaTotal)}</span>
                    </div>
                    {result.stateTaxWithoutLaw > 0 && (
                      <div className="flex justify-between">
                        <span>State Tax</span>
                        <span className="text-amber-400">-{formatCurrency(result.stateTaxWithoutLaw)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Separator className="my-6 bg-border/40" />

              {/* Key Savings Metrics */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg bg-cyan-500/10 border border-cyan-500/20 p-4 text-center">
                  <p className="text-xs font-medium uppercase tracking-wider text-cyan-400/80">
                    Annual Savings
                  </p>
                  <p className="mt-1 text-2xl font-bold text-cyan-400">
                    {formatCurrency(result.totalSavings)}
                  </p>
                  <p className="text-xs text-muted-foreground">From federal OT exemption</p>
                </div>
                <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-4 text-center">
                  <p className="text-xs font-medium uppercase tracking-wider text-emerald-400/80">
                    Per OT Hour Benefit
                  </p>
                  <p className="mt-1 text-2xl font-bold text-emerald-400">
                    +{formatCurrency(result.savingsPerOvertimeHour)}
                  </p>
                  <p className="text-xs text-muted-foreground">Extra take-home per OT hour</p>
                </div>
                <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-4 text-center">
                  <p className="text-xs font-medium uppercase tracking-wider text-emerald-400/80">
                    Per OT Week Benefit
                  </p>
                  <p className="mt-1 text-2xl font-bold text-emerald-400">
                    +{formatCurrency(result.savingsPerOvertimeWeek)}
                  </p>
                  <p className="text-xs text-muted-foreground">Extra take-home per week</p>
                </div>
                <div className="rounded-lg bg-muted/30 p-4 text-center">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Marginal Rate Saved
                  </p>
                  <p className="mt-1 text-2xl font-bold text-foreground">
                    {(result.marginalRate * 100).toFixed(0)}%
                  </p>
                  <p className="text-xs text-muted-foreground">Federal bracket on OT</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Breakdown */}
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calculator className="h-5 w-5 text-emerald-400" />
                Detailed Tax Breakdown
              </CardTitle>
              <CardDescription>Complete comparison with and without the overtime tax exemption</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Income */}
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-medium text-foreground">Regular Pay ({regularHours} hrs × {weeksPerYear} weeks)</span>
                  <span className="text-sm font-medium text-foreground">{formatCurrency(result.regularPay)}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-medium text-foreground">
                    Overtime Pay ({overtimeHours} OT hrs × {overtimeMultiplier}x × {weeksPerYear} weeks)
                  </span>
                  <span className="text-sm font-medium text-emerald-400">{formatCurrency(result.overtimePay)}</span>
                </div>
                <Separator className="bg-border/30" />
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-bold text-foreground">Total Gross Income</span>
                  <span className="text-sm font-bold text-foreground">{formatCurrency(result.totalGross)}</span>
                </div>

                <Separator className="bg-emerald-500/20" />

                {/* WITH the law */}
                <p className="text-xs font-medium uppercase tracking-wider text-emerald-400 mt-2">
                  With OT Tax Exemption (Current Law)
                </p>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">Federal Tax (on regular pay only)</span>
                  <span className="text-sm font-semibold text-red-400">-{formatCurrency(result.federalTaxWithLaw)}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">FICA — Social Security (6.2%)</span>
                  <span className="text-sm font-semibold text-orange-400">-{formatCurrency(Math.min(result.totalGross, FICA_2026.socialSecurityWageCap) * FICA_2026.socialSecurityRate)}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">FICA — Medicare (1.45%)</span>
                  <span className="text-sm font-semibold text-orange-400">-{formatCurrency(result.totalGross * FICA_2026.medicareRate)}</span>
                </div>
                {result.totalGross > FICA_2026.additionalMedicareThreshold && (
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted-foreground">Additional Medicare (0.9%)</span>
                    <span className="text-sm font-semibold text-orange-400">
                      -{formatCurrency((result.totalGross - FICA_2026.additionalMedicareThreshold) * FICA_2026.additionalMedicareRate)}
                    </span>
                  </div>
                )}
                {result.stateTaxWithLaw > 0 && (
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted-foreground">State Tax ({STATE_PROFILES[stateKey]?.name})</span>
                    <span className="text-sm font-semibold text-amber-400">-{formatCurrency(result.stateTaxWithLaw)}</span>
                  </div>
                )}
                <Separator className="bg-emerald-500/20" />
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-bold text-emerald-400">Take-Home WITH Exemption</span>
                  <span className="text-lg font-bold text-emerald-400">{formatCurrency(result.takeHomeWithLaw)}</span>
                </div>

                <Separator className="bg-border/30" />

                {/* WITHOUT the law */}
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mt-2">
                  Without OT Tax Exemption (Pre-2025 Law)
                </p>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">Federal Tax (on all income)</span>
                  <span className="text-sm font-semibold text-red-400">-{formatCurrency(result.federalTaxWithoutLaw)}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">FICA (same)</span>
                  <span className="text-sm font-semibold text-orange-400">-{formatCurrency(result.ficaTotal)}</span>
                </div>
                {result.stateTaxWithoutLaw > 0 && (
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted-foreground">State Tax (same)</span>
                    <span className="text-sm font-semibold text-amber-400">-{formatCurrency(result.stateTaxWithoutLaw)}</span>
                  </div>
                )}
                <Separator className="bg-border/30" />
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-bold text-muted-foreground">Take-Home WITHOUT Exemption</span>
                  <span className="text-lg font-bold text-muted-foreground">{formatCurrency(result.takeHomeWithoutLaw)}</span>
                </div>

                <Separator className="bg-cyan-500/30" />

                {/* Savings */}
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-bold text-cyan-400">
                    <Zap className="mr-1 inline h-4 w-4" />
                    Your Annual Savings from OT Exemption
                  </span>
                  <span className="text-xl font-bold text-cyan-400">{formatCurrency(result.totalSavings)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Charts */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Pie Chart - Tax Breakdown With Exemption */}
            <Card className="border-border/50 bg-card/80">
              <CardHeader>
                <CardTitle className="text-lg">Tax Breakdown With Exemption</CardTitle>
                <CardDescription>How your taxes are distributed under current law</CardDescription>
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

            {/* Bar Chart - WITH vs WITHOUT */}
            <Card className="border-border/50 bg-card/80">
              <CardHeader>
                <CardTitle className="text-lg">With vs Without Exemption</CardTitle>
                <CardDescription>Side-by-side comparison of your tax burden</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full" style={{ minHeight: 300 }}>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={barData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <XAxis
                        dataKey="name"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={11}
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      />
                      <YAxis
                        tickFormatter={(value: number) => `$${(value / 1000).toFixed(0)}k`}
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={11}
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend
                        content={({ payload }) => {
                          if (!payload?.length) return null;
                          return (
                            <div className="flex items-center justify-center gap-x-4 pt-2">
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
                      <Bar dataKey="withLaw" name="With Exemption" fill="#10b981" radius={[4, 4, 0, 0]} barSize={24} />
                      <Bar dataKey="withoutLaw" name="Without Exemption" fill="#6b7280" radius={[4, 4, 0, 0]} barSize={24} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <AdSlot position="after-results" />
        </div>
      )}

      {/* ─── Key Information Box ────────────────────────── */}
      <Card className="border-emerald-500/20 bg-card/80">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            Key Information About the Overtime Tax Exemption
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-emerald-400 mb-2">
                What Qualifies as Overtime
              </p>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                  Hours worked beyond 40 per week
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                  Must be paid at 1.5x minimum rate
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                  FLSA-covered non-exempt employees
                </li>
              </ul>
            </div>
            <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-amber-400 mb-2">
                What&apos;s Still Taxed
              </p>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li className="flex items-start gap-1.5">
                  <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
                  Social Security (6.2% on all wages)
                </li>
                <li className="flex items-start gap-1.5">
                  <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
                  Medicare (1.45% on all wages)
                </li>
                <li className="flex items-start gap-1.5">
                  <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
                  State income tax in most states
                </li>
              </ul>
            </div>
            <div className="rounded-lg bg-cyan-500/10 border border-cyan-500/20 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-cyan-400 mb-2">
                State Conformity
              </p>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-400" />
                  Texas, Florida: No state tax on OT
                </li>
                <li className="flex items-start gap-1.5">
                  <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
                  Most states still tax OT income
                </li>
                <li className="flex items-start gap-1.5">
                  <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
                  Check your state&apos;s conformity rules
                </li>
              </ul>
            </div>
            <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-red-400 mb-2">
                Sunset Date
              </p>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li className="flex items-start gap-1.5">
                  <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-400" />
                  Expires December 31, 2028
                </li>
                <li className="flex items-start gap-1.5">
                  <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-400" />
                  Part of the 2025 reconciliation bill
                </li>
                <li className="flex items-start gap-1.5">
                  <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-400" />
                  Congress must act to extend
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ─── Real-World Examples ────────────────────────── */}
      <Card className="border-border/50 bg-card/80">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <DollarSign className="h-5 w-5 text-emerald-400" />
            Real-World Savings Examples
          </CardTitle>
          <CardDescription>How much workers save under the No Tax on Overtime provision (Single filer, Illinois)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            {examples.map((example, index) => (
              <div
                key={index}
                className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5 text-center"
              >
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {example.label}
                </p>
                <div className="mt-3">
                  <p className="text-xs text-muted-foreground">Annual OT Pay</p>
                  <p className="text-lg font-semibold text-foreground">{formatCurrency(example.otPay)}</p>
                </div>
                <div className="mt-2">
                  <p className="text-xs text-muted-foreground">Total Gross</p>
                  <p className="text-sm font-medium text-foreground">{formatCurrency(example.totalGross)}</p>
                </div>
                <Separator className="my-3 bg-emerald-500/20" />
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-cyan-400/80">
                    Annual Savings
                  </p>
                  <p className="text-2xl font-bold text-cyan-400">{formatCurrency(example.savings)}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ─── Warning Banner ────────────────────────────── */}
      <Card className="border-amber-500/30 bg-amber-500/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
            <div className="space-y-1 text-sm text-muted-foreground">
              <p className="font-medium text-amber-400">This exemption expires after 2028</p>
              <p>
                The No Tax on Overtime provision is part of the 2025 reconciliation bill and is currently set to sunset on
                December 31, 2028. Unless Congress extends or makes it permanent, overtime pay will once again be subject
                to federal income tax starting in 2029. Maximize your overtime earnings while this law is in effect.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ─── SEO Pre-Rendered Example ──────────────────── */}
      <div className="rounded-xl border border-border/30 bg-muted/10 p-6" aria-hidden="true">
        <h2 className="text-xl font-bold text-foreground">
          No Tax on Overtime Calculator Example: $30/hr with 10 Hours Overtime (2026)
        </h2>
        <div className="mt-3 space-y-1 text-sm text-muted-foreground">
          <p>Hourly Wage: $30.00 | Overtime: 10 hrs/week at 1.5x | Filing: Single | State: Illinois</p>
          <p>Regular Pay: $62,400 (40 hrs × 52 weeks)</p>
          <p>Overtime Pay: $23,400 (10 OT hrs × 1.5x × 52 weeks)</p>
          <p>Total Gross: $85,800</p>
          <p>WITH Exemption — Federal Tax (on regular pay only): ~$7,008 | Take-Home: ~$68,191</p>
          <p>WITHOUT Exemption — Federal Tax (on all income): ~$11,327 | Take-Home: ~$63,872</p>
          <p>Annual Savings from OT Exemption: ~$4,319</p>
          <p>Extra Take-Home Per Overtime Hour: ~$8.31</p>
          <p>Note: FICA (7.65%) and Illinois state tax (4.95%) still apply to overtime pay.</p>
        </div>
      </div>

      {/* ─── Educational Content ───────────────────────── */}
      <Card className="border-border/50 bg-card/80">
        <CardHeader>
          <CardTitle className="text-lg">Understanding the No Tax on Overtime Provision</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground">What changed in 2025?</strong> The One Big Beautiful Bill Act, signed into law in 2025,
            created a new federal income tax exemption for qualified overtime compensation. This means that overtime pay
            — defined as compensation for hours worked beyond 40 in a workweek at a rate of at least 1.5 times the
            regular rate — is no longer subject to federal income tax. This is a significant change that can save
            workers thousands of dollars per year.
          </p>
          <p>
            <strong className="text-foreground">Who qualifies?</strong> The exemption applies to non-exempt hourly and salaried
            workers who receive overtime pay under the Fair Labor Standards Act (FLSA). Workers must be paid at least
            1.5x their regular rate for hours beyond 40 per week. Salaried employees who are exempt from FLSA overtime
            rules (typically those earning above the salary threshold in executive, administrative, or professional
            roles) do not qualify.
          </p>
          <p>
            <strong className="text-foreground">What&apos;s still taxed?</strong> Overtime pay remains subject to FICA taxes — Social
            Security (6.2% up to the wage cap of $184,500 in 2026) and Medicare (1.45% on all wages, plus 0.9%
            additional Medicare tax above $200,000). Most states also continue to tax overtime income at the state level.
            Only states with no income tax (like Texas and Florida) effectively provide full state-level exemption.
          </p>
          <p>
            <strong className="text-foreground">How much can you save?</strong> The savings depend on your marginal federal tax bracket.
            A worker in the 22% bracket earning $23,400 in overtime pay would save approximately $5,148 in federal
            income tax annually. The higher your marginal bracket and the more overtime you work, the greater your
            savings under this provision.
          </p>
          <p>
            <strong className="text-foreground">Planning for the sunset:</strong> This provision is currently scheduled to expire after
            December 31, 2028. Workers should consider maximizing overtime earnings while the exemption is in effect.
            If the provision is not extended by Congress, overtime pay will once again be fully subject to federal
            income tax starting in 2029, potentially reducing take-home pay by thousands of dollars per year for
            regular overtime workers.
          </p>
        </CardContent>
      </Card>

      <AdSlot position="mid-content" />
    </div>
  );
}
