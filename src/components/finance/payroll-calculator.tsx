'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Briefcase,
  Building2,
  Calculator,
  Coins,
  DollarSign,
  HeartPulse,
  Info,
  Landmark,
  Receipt,
  ShieldCheck,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { Button } from '@/components/ui/button';
import { payrollRun } from '@/lib/time-math';
import { FICA_2026, FEDERAL_TAX_2026 } from '@/lib/tax-config';
import { formatCurrency } from '@/lib/finance-utils';

// ─── Types + constants ────────────────────────────────────────────────────────

type PayBasis = 'salary' | 'hourly';
type PayFrequencyKey = 'weekly' | 'biweekly' | 'semimonthly' | 'monthly';

const PAY_FREQUENCIES: Record<PayFrequencyKey, { label: string; periods: number }> = {
  weekly: { label: 'Weekly - 52 paychecks', periods: 52 },
  biweekly: { label: 'Every 2 weeks - 26 paychecks', periods: 26 },
  semimonthly: { label: 'Semi-monthly - 24 paychecks', periods: 24 },
  monthly: { label: 'Monthly - 12 paychecks', periods: 12 },
};

// Display strings derived from the site's own config (never hardcoded).
const SS_PCT = `${(FICA_2026.socialSecurityRate * 100).toFixed(1)}%`;
const MEDICARE_PCT = `${(FICA_2026.medicareRate * 100).toFixed(2)}%`;
const SS_CAP = FICA_2026.socialSecurityWageCap.toLocaleString('en-US');
const STD_DEDUCTION = FEDERAL_TAX_2026.standardDeductionsByFiling.single.toLocaleString('en-US');

// ─── Stub row helper ──────────────────────────────────────────────────────────

interface StubRowProps {
  label: string;
  detail?: string;
  amount: number;
  negative?: boolean;
}

function StubRow({ label, detail, amount, negative }: StubRowProps) {
  return (
    <div className="flex items-start justify-between gap-3 py-2">
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {detail && <p className="text-xs text-muted-foreground">{detail}</p>}
      </div>
      <p
        className={`shrink-0 text-sm font-semibold tabular-nums ${
          negative ? 'text-rose-600' : 'text-foreground'
        }`}
      >
        {negative ? '-' : ''}
        {formatCurrency(Math.abs(amount))}
      </p>
    </div>
  );
}

// ─── Component ─────────────────────────────────────────────────────────────────

export function PayrollCalculator() {
  const [payBasis, setPayBasis] = useState<PayBasis>('salary');
  const [annualSalary, setAnnualSalary] = useState(60000);
  const [hourlyRate, setHourlyRate] = useState(25);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [weeksPerYear, setWeeksPerYear] = useState(52);
  const [frequency, setFrequency] = useState<PayFrequencyKey>('monthly');
  const [sutaRatePct, setSutaRatePct] = useState(3.0);
  const [workersCompPct, setWorkersCompPct] = useState(1.0);
  const [benefitsPerMonth, setBenefitsPerMonth] = useState(0);

  const periods = PAY_FREQUENCIES[frequency].periods;

  // ─── Live math: one payroll run from the employer's seat ──────────────────
  const run = useMemo(() => {
    const gross =
      payBasis === 'salary'
        ? Math.max(0, annualSalary || 0)
        : Math.max(0, hourlyRate || 0) *
          Math.max(0, hoursPerWeek || 0) *
          Math.max(0, weeksPerYear || 0);
    return payrollRun(gross, periods, {
      sutaRatePct: Math.max(0, sutaRatePct || 0),
      workersCompPct: Math.max(0, workersCompPct || 0),
      benefitsPerMonth: Math.max(0, benefitsPerMonth || 0),
    });
  }, [
    payBasis,
    annualSalary,
    hourlyRate,
    hoursPerWeek,
    weeksPerYear,
    periods,
    sutaRatePct,
    workersCompPct,
    benefitsPerMonth,
  ]);

  const showAdditionalMedicare = run.employeeAdditionalMedicare > 0;
  const employerAddOn = run.employerTotalPerPeriod - run.periodGross;

  return (
    <div className="space-y-6">
      {/* ─── Page Title ─────────────────────────────────── */}
      <div className="text-center">
        <h2 className="flex items-center justify-center gap-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          <Briefcase className="h-8 w-8 text-amber-600" />
          Payroll Calculator
        </h2>
        <p className="mt-2 text-muted-foreground">
          Run one pay period from the employer&apos;s seat - employee
          deductions, employer contributions, and your true cost per paycheck
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <Badge className="border-amber-500/30 bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-700">
            <Building2 className="mr-1 h-3 w-3" />
            Employer FICA match included
          </Badge>
          <Badge className="border-emerald-500/30 bg-emerald-600/20 px-3 py-1 text-xs font-semibold text-emerald-700">
            <Receipt className="mr-1 h-3 w-3" />
            Pay-stub style breakdown
          </Badge>
        </div>
      </div>

      {/* ─── Setup + stub grid ──────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Left: inputs */}
        <div className="space-y-4 lg:col-span-3">
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calculator className="h-5 w-5 text-amber-600" />
                Payroll Setup
              </CardTitle>
              <CardDescription>
                How you pay, how often, and what you add on top
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="pay-basis" className="text-sm font-medium">
                    Pay Basis
                  </Label>
                  <Select value={payBasis} onValueChange={(v) => setPayBasis(v as PayBasis)}>
                    <SelectTrigger id="pay-basis" aria-label="Pay basis">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="salary">Annual salary</SelectItem>
                      <SelectItem value="hourly">Hourly rate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pay-frequency" className="text-sm font-medium">
                    Pay Frequency
                  </Label>
                  <Select
                    value={frequency}
                    onValueChange={(v) => setFrequency(v as PayFrequencyKey)}
                  >
                    <SelectTrigger id="pay-frequency" aria-label="Pay frequency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(Object.keys(PAY_FREQUENCIES) as PayFrequencyKey[]).map((k) => (
                        <SelectItem key={k} value={k}>
                          {PAY_FREQUENCIES[k].label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {payBasis === 'salary' ? (
                <div className="space-y-2">
                  <Label htmlFor="annual-salary" className="text-sm font-medium">
                    Annual Salary
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="annual-salary"
                      type="number"
                      min="0"
                      step="1000"
                      value={annualSalary}
                      onChange={(e) => setAnnualSalary(parseFloat(e.target.value) || 0)}
                      className="pl-9"
                      aria-label="Annual salary in dollars"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="hourly-rate" className="text-sm font-medium">
                      Hourly Rate
                    </Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="hourly-rate"
                        type="number"
                        min="0"
                        step="0.5"
                        value={hourlyRate}
                        onChange={(e) => setHourlyRate(parseFloat(e.target.value) || 0)}
                        className="pl-9"
                        aria-label="Hourly rate in dollars"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hours-week" className="text-sm font-medium">
                      Hours / Week
                    </Label>
                    <Input
                      id="hours-week"
                      type="number"
                      min="0"
                      max="168"
                      step="1"
                      value={hoursPerWeek}
                      onChange={(e) => setHoursPerWeek(parseFloat(e.target.value) || 0)}
                      aria-label="Hours per week"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weeks-year" className="text-sm font-medium">
                      Paid Weeks / Year
                    </Label>
                    <Input
                      id="weeks-year"
                      type="number"
                      min="0"
                      max="52"
                      step="1"
                      value={weeksPerYear}
                      onChange={(e) => setWeeksPerYear(parseFloat(e.target.value) || 0)}
                      aria-label="Paid weeks per year"
                    />
                  </div>
                </div>
              )}

              <Separator />

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="suta-rate" className="text-sm font-medium">
                    SUTA Rate (%)
                  </Label>
                  <Input
                    id="suta-rate"
                    type="number"
                    min="0"
                    max="15"
                    step="0.1"
                    value={sutaRatePct}
                    onChange={(e) => setSutaRatePct(parseFloat(e.target.value) || 0)}
                    aria-label="State unemployment tax rate in percent"
                  />
                  <p className="text-xs text-muted-foreground">
                    Varies by state - typically 1-5% on the first ~$9,500
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workers-comp" className="text-sm font-medium">
                    Workers&apos; Comp (%)
                  </Label>
                  <Input
                    id="workers-comp"
                    type="number"
                    min="0"
                    max="30"
                    step="0.1"
                    value={workersCompPct}
                    onChange={(e) => setWorkersCompPct(parseFloat(e.target.value) || 0)}
                    aria-label="Workers compensation premium as percent of wages"
                  />
                  <p className="text-xs text-muted-foreground">
                    ~0.5-2% office work, higher for riskier trades
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="benefits-month" className="text-sm font-medium">
                    Benefits / Month ($)
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="benefits-month"
                      type="number"
                      min="0"
                      step="50"
                      value={benefitsPerMonth}
                      onChange={(e) => setBenefitsPerMonth(parseFloat(e.target.value) || 0)}
                      className="pl-9"
                      aria-label="Employer paid benefits per month"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Health, retirement match, stipends
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: employee pay stub */}
        <div className="lg:col-span-2">
          <Card className="border-emerald-500/30 bg-card/90">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Receipt className="h-5 w-5 text-emerald-600" />
                Pay Stub - Employee View
              </CardTitle>
              <CardDescription>
                {PAY_FREQUENCIES[frequency].label.toLowerCase()} - {run.periodsPerYear}{' '}
                periods per year
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-xl border border-border/40 bg-background/60 p-4">
                <StubRow
                  label="Gross wages this period"
                  detail={`${formatCurrency(run.annualGross)} annualized`}
                  amount={run.periodGross}
                />
                <Separator className="my-1" />
                <StubRow
                  label={`Social Security (${SS_PCT})`}
                  detail={`capped at $${SS_CAP} of wages`}
                  amount={run.employeeSocialSecurity}
                  negative
                />
                <StubRow
                  label={`Medicare (${MEDICARE_PCT})`}
                  detail="no wage cap"
                  amount={run.employeeMedicare}
                  negative
                />
                {showAdditionalMedicare && (
                  <StubRow
                    label={`Additional Medicare (${(FICA_2026.additionalMedicareRate * 100).toFixed(1)}%)`}
                    detail={`wages above $${FICA_2026.additionalMedicareThreshold.toLocaleString('en-US')}`}
                    amount={run.employeeAdditionalMedicare}
                    negative
                  />
                )}
                <StubRow
                  label="Federal income tax (est.)"
                  detail={`2026 single-filer brackets, $${STD_DEDUCTION} standard deduction`}
                  amount={run.federalIncomeTax}
                  negative
                />
                <Separator className="my-1" />
                <div className="flex items-center justify-between gap-3 pt-1">
                  <p className="text-sm text-muted-foreground">Total withheld</p>
                  <p className="text-sm font-semibold tabular-nums text-rose-600">
                    -
                    {formatCurrency(
                      run.employeeFica + run.federalIncomeTax,
                    )}
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-emerald-600/10 p-4 text-center border border-emerald-500/20">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Estimated Net Pay
                </p>
                <p className="mt-1 text-3xl font-bold text-emerald-700">
                  {formatCurrency(run.employeeNet)}
                </p>
                <p className="mt-1 flex items-center justify-center gap-1 text-xs text-muted-foreground">
                  <Info className="h-3 w-3" />
                  estimated - filing status simplified, no state tax
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ─── Employer cost card ──────────────────────────── */}
      <Card className="border-amber-500/30 bg-card/80">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Building2 className="h-5 w-5 text-amber-600" />
            Employer Cost - This Period
          </CardTitle>
          <CardDescription>
            What the run actually costs you, on top of the paycheck
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 lg:grid-cols-5">
          <div className="space-y-1 lg:col-span-3">
            <StubRow
              label="Gross wages"
              detail="the paycheck itself"
              amount={run.periodGross}
            />
            <Separator />
            <StubRow
              label="Employer FICA match"
              detail={`${SS_PCT} Social Security + ${MEDICARE_PCT} Medicare (never the 0.9%)`}
              amount={run.employerFica}
            />
            <Separator />
            <StubRow
              label="FUTA (0.6%)"
              detail={`0.6% of the first $7,000 - ${formatCurrency(run.employerFuta * run.periodsPerYear)} for the year`}
              amount={run.employerFuta}
            />
            <Separator />
            <StubRow
              label={`SUTA (${sutaRatePct.toFixed(1)}%)`}
              detail={`${sutaRatePct.toFixed(1)}% of the first ~$9,500 - ${formatCurrency(run.employerSuta * run.periodsPerYear)} for the year`}
              amount={run.employerSuta}
            />
            <Separator />
            <StubRow
              label={`Workers' comp (${workersCompPct.toFixed(1)}%)`}
              detail="premium allocated across periods"
              amount={run.employerWorkersComp}
            />
            {run.employerBenefits > 0 && (
              <>
                <Separator />
                <StubRow
                  label="Benefits"
                  detail={`${formatCurrency(benefitsPerMonth)}/month x 12 / ${run.periodsPerYear}`}
                  amount={run.employerBenefits}
                />
              </>
            )}
          </div>

          <div className="space-y-4 lg:col-span-2">
            <div className="rounded-xl bg-amber-500/10 p-4 text-center border border-amber-500/20">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Total Employer Cost
              </p>
              <p className="mt-1 text-3xl font-bold text-amber-700">
                {formatCurrency(run.employerTotalPerPeriod)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {formatCurrency(employerAddOn)} over gross this period
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg border border-border/40 bg-background/60 p-3 text-center">
                <p className="text-xs text-muted-foreground">Annual Gross Wages</p>
                <p className="mt-0.5 font-semibold text-foreground">
                  {formatCurrency(run.annualGross)}
                </p>
              </div>
              <div className="rounded-lg border border-border/40 bg-background/60 p-3 text-center">
                <p className="text-xs text-muted-foreground">Annual Employer Cost</p>
                <p className="mt-0.5 font-semibold text-foreground">
                  {formatCurrency(run.employerAnnualCost)}
                </p>
              </div>
            </div>
            <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 text-center">
              <p className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className="h-3.5 w-3.5 text-amber-600" />
                Markup over gross wages
              </p>
              <p className="mt-0.5 text-xl font-bold text-amber-700">
                +{(run.markupPct * 100).toFixed(1)}%
              </p>
              <p className="text-xs text-muted-foreground">
                {formatCurrency(run.employerAnnualCost - run.annualGross)} per year
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ─── State tax note + CTA ───────────────────────── */}
      <div className="flex flex-col items-start justify-between gap-3 rounded-xl border border-border/40 bg-background/60 p-4 sm:flex-row sm:items-center">
        <div className="flex items-start gap-3">
          <Wallet className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
          <p className="max-w-2xl text-sm text-muted-foreground">
            State income taxes vary widely and are withheld from the employee,
            not paid by you - the net figure above is a federal-only estimate.
            For a state-accurate take-home number, use the paycheck calculator.
          </p>
        </div>
        <Button
          asChild
          variant="outline"
          className="shrink-0 border-emerald-600/40 text-emerald-700 hover:bg-emerald-600/10 hover:text-emerald-800"
        >
          <Link href="/paycheck-calculator">
            Paycheck Calculator
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* ─── What rides on top quick grid ────────────────── */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border/40 bg-background/60 p-4">
          <Landmark className="h-5 w-5 text-amber-600" />
          <p className="mt-2 text-sm font-semibold text-foreground">FICA match</p>
          <p className="text-xs text-muted-foreground">
            {SS_PCT} + {MEDICARE_PCT} on your side too, dollar for dollar
          </p>
        </div>
        <div className="rounded-xl border border-border/40 bg-background/60 p-4">
          <Coins className="h-5 w-5 text-amber-600" />
          <p className="mt-2 text-sm font-semibold text-foreground">FUTA</p>
          <p className="text-xs text-muted-foreground">
            0.6% on the first $7,000 - max $42 per employee per year
          </p>
        </div>
        <div className="rounded-xl border border-border/40 bg-background/60 p-4">
          <ShieldCheck className="h-5 w-5 text-amber-600" />
          <p className="mt-2 text-sm font-semibold text-foreground">Workers&apos; comp</p>
          <p className="text-xs text-muted-foreground">
            Set your premium % - office work runs about 0.5-2%
          </p>
        </div>
        <div className="rounded-xl border border-border/40 bg-background/60 p-4">
          <HeartPulse className="h-5 w-5 text-amber-600" />
          <p className="mt-2 text-sm font-semibold text-foreground">Benefits</p>
          <p className="text-xs text-muted-foreground">
            Monthly health, retirement match, and stipends land here
          </p>
        </div>
      </div>
    </div>
  );
}
