'use client';

import { useMemo, useState } from 'react';
import {
  Calculator,
  DollarSign,
  Clock,
  TrendingUp,
  CheckCircle2,
  MapPin,
  ArrowRight,
  Info,
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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  calculateSalaryTakeHome,
  STATE_KEYS,
  STATE_LABELS,
} from '@/lib/salary-calculations';
import { formatCurrency } from '@/lib/finance-utils';

// ─── Types ──────────────────────────────────────────────────────────────────────

type FilingStatus = 'single' | 'married' | 'head_of_household';

const FILING_LABELS: Record<FilingStatus, string> = {
  single: 'Single',
  married: 'Married Filing Jointly',
  head_of_household: 'Head of Household',
};

/** Multi-word states use hyphenated calculator slugs. */
const STATE_SLUG_OVERRIDES: Record<string, string> = {
  newhampshire: 'new-hampshire-tax-calculator',
  newyork: 'new-york-tax-calculator',
  newjersey: 'new-jersey-tax-calculator',
  newmexico: 'new-mexico-tax-calculator',
  northcarolina: 'north-carolina-tax-calculator',
  northdakota: 'north-dakota-tax-calculator',
  southcarolina: 'south-carolina-tax-calculator',
  southdakota: 'south-dakota-tax-calculator',
  westvirginia: 'west-virginia-tax-calculator',
};

function stateSlugFor(stateKey: string): string {
  return STATE_SLUG_OVERRIDES[stateKey] ?? `${stateKey}-tax-calculator`;
}

// ─── Quick-reference rows (common hourly rates) ─────────────────────────────────

const QUICK_RATES = [15, 18, 20, 25, 30, 35, 40, 45, 50, 60, 75, 100];

// ─── Component ───────────────────────────────────────────────────────────────────

export function HourlyToSalaryCalculator() {
  const [hourlyRate, setHourlyRate] = useState(25);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [weeksPerYear, setWeeksPerYear] = useState(52);
  const [otHours, setOtHours] = useState(0);
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const [stateKey, setStateKey] = useState<string>('texas');

  // ─── Conversion math ─────────────────────────────────────────────────────
  const gross = useMemo(() => {
    const rate = Math.max(0, hourlyRate || 0);
    const hours = Math.max(0, hoursPerWeek || 0);
    const weeks = Math.max(0, Math.min(52, weeksPerYear || 0));
    const ot = Math.max(0, otHours || 0);
    const regular = rate * hours * weeks;
    const overtime = rate * 1.5 * ot * weeks;
    return {
      annual: regular + overtime,
      overtimePay: overtime,
      monthly: (regular + overtime) / 12,
      biweekly: (regular + overtime) / 26,
      weekly: (regular + overtime) / weeks || 0,
      daily: hours + ot > 0 ? rate * hours + rate * 1.5 * ot : 0,
    };
  }, [hourlyRate, hoursPerWeek, weeksPerYear, otHours]);

  // ─── State take-home (reuses the site's real take-home engine) ──────────
  const takeHome = useMemo(() => {
    const calc = calculateSalaryTakeHome(Math.round(gross.annual), filingStatus);
    const chosen = calc.states.find((s) => s.stateKey === stateKey) ?? calc.states[0];
    return {
      netAnnual: chosen.netAnnual,
      netMonthly: chosen.netAnnual / 12,
      netBiweekly: chosen.netAnnual / 26,
      effectiveRate: chosen.effectiveTaxRate,
      totalTax: chosen.totalDeductions,
      stateName: chosen.stateName,
      stateAbbr: chosen.stateAbbr,
    };
  }, [gross.annual, filingStatus, stateKey]);

  return (
    <div className="space-y-6">
      {/* ─── Page Title ─────────────────────────────────── */}
      <div className="text-center">
        <h2 className="flex items-center justify-center gap-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          <Clock className="h-8 w-8 text-emerald-600" />
          Hourly to Salary Calculator
        </h2>
        <p className="mt-2 text-muted-foreground">
          Convert any hourly wage to weekly, bi-weekly, monthly, and annual pay — then see your
          take-home in your state
        </p>
        <div className="mt-3 flex items-center justify-center gap-2">
          <Badge className="bg-emerald-600/20 text-emerald-600 border-emerald-500/30 text-xs font-semibold px-3 py-1">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            2,080-Hour Standard
          </Badge>
          <Badge className="bg-amber-500/20 text-amber-700 border-amber-500/30 text-xs px-3 py-1">
            <Zap className="mr-1 h-3 w-3" />
            Overtime at 1.5×
          </Badge>
        </div>
      </div>

      {/* ─── How the conversion works ────────────────────── */}
      <Card className="border-emerald-500/20 bg-emerald-600/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
            <div className="space-y-1 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">The Standard Conversion</p>
              <p>
                Employers annualize hourly pay as <strong>rate × hours per week × 52 weeks</strong>.
                Full-time means 40 hours — so $25/hour = $52,000/year (2,080 hours). Overtime past
                40 hours/week is paid at 1.5× under the FLSA, and every state except California
                uses the 40-hour weekly trigger.
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
                <Calculator className="h-5 w-5 text-emerald-600" />
                Your Hourly Wage
              </CardTitle>
              <CardDescription>Adjust anything — results update instantly</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Hourly rate */}
                <div className="space-y-2">
                  <Label htmlFor="hourly-rate" className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <DollarSign className="h-3.5 w-3.5 text-emerald-600" />
                      Hourly Rate
                    </span>
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

                {/* Hours per week */}
                <div className="space-y-2">
                  <Label htmlFor="hours-week" className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-emerald-600" />
                      Regular Hours / Week
                    </span>
                  </Label>
                  <Input
                    id="hours-week"
                    type="number"
                    min="0"
                    max="80"
                    step="1"
                    value={hoursPerWeek}
                    onChange={(e) => setHoursPerWeek(parseFloat(e.target.value) || 0)}
                    aria-label="Regular hours per week"
                  />
                </div>

                {/* OT hours */}
                <div className="space-y-2">
                  <Label htmlFor="ot-hours" className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <Zap className="h-3.5 w-3.5 text-amber-600" />
                      Overtime Hours / Week
                    </span>
                  </Label>
                  <Input
                    id="ot-hours"
                    type="number"
                    min="0"
                    max="40"
                    step="1"
                    value={otHours}
                    onChange={(e) => setOtHours(parseFloat(e.target.value) || 0)}
                    aria-label="Overtime hours per week, paid at 1.5x"
                  />
                  <p className="text-xs text-muted-foreground">Paid at 1.5× your rate</p>
                </div>

                {/* Weeks per year */}
                <div className="space-y-2">
                  <Label htmlFor="weeks-year" className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                      Paid Weeks / Year
                    </span>
                  </Label>
                  <Input
                    id="weeks-year"
                    type="number"
                    min="1"
                    max="52"
                    step="1"
                    value={weeksPerYear}
                    onChange={(e) => setWeeksPerYear(parseFloat(e.target.value) || 0)}
                    aria-label="Paid weeks per year"
                  />
                  <p className="text-xs text-muted-foreground">
                    Use 50 if you take two unpaid weeks off
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Gross Results */}
        <div className="space-y-4 lg:col-span-2">
          <Card className="border-emerald-500/30 bg-card/80">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Your Gross Pay</CardTitle>
              <CardDescription>Before any taxes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-xl bg-emerald-600/10 p-4 text-center border border-emerald-500/20">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Annual Gross
                </p>
                <p className="mt-1 text-3xl font-bold text-emerald-700">
                  {formatCurrency(gross.annual)}
                </p>
                {gross.overtimePay > 0 && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    includes {formatCurrency(gross.overtimePay)} overtime
                  </p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg border border-border/40 bg-background/60 p-3">
                  <p className="text-xs text-muted-foreground">Monthly</p>
                  <p className="font-semibold text-foreground">{formatCurrency(gross.monthly)}</p>
                </div>
                <div className="rounded-lg border border-border/40 bg-background/60 p-3">
                  <p className="text-xs text-muted-foreground">Bi-weekly</p>
                  <p className="font-semibold text-foreground">{formatCurrency(gross.biweekly)}</p>
                </div>
                <div className="rounded-lg border border-border/40 bg-background/60 p-3">
                  <p className="text-xs text-muted-foreground">Weekly</p>
                  <p className="font-semibold text-foreground">{formatCurrency(gross.weekly)}</p>
                </div>
                <div className="rounded-lg border border-border/40 bg-background/60 p-3">
                  <p className="text-xs text-muted-foreground">Per Workday</p>
                  <p className="font-semibold text-foreground">{formatCurrency(gross.daily)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ─── Take-Home by State ─────────────────────────── */}
      <Card className="border-emerald-500/30 bg-card/80">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <MapPin className="h-5 w-5 text-emerald-600" />
            Take-Home Pay in Your State
          </CardTitle>
          <CardDescription>
            Your {formatCurrency(gross.annual)} salary after federal, FICA, and state tax — 2026
            rates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-sm font-medium">State</Label>
              <Select value={stateKey} onValueChange={setStateKey}>
                <SelectTrigger aria-label="Choose your state">
                  <SelectValue placeholder="Choose your state" />
                </SelectTrigger>
                <SelectContent className="max-h-72">
                  {STATE_KEYS.map((key) => (
                    <SelectItem key={key} value={key}>
                      {STATE_LABELS[key]?.name ?? key}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Filing Status</Label>
              <Select
                value={filingStatus}
                onValueChange={(v) => setFilingStatus(v as FilingStatus)}
              >
                <SelectTrigger aria-label="Filing status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(FILING_LABELS) as FilingStatus[]).map((k) => (
                    <SelectItem key={k} value={k}>
                      {FILING_LABELS[k]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-emerald-600/10 p-4 border border-emerald-500/20 text-center sm:col-span-1">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Net Annual
              </p>
              <p className="mt-1 text-2xl font-bold text-emerald-700">
                {formatCurrency(takeHome.netAnnual)}
              </p>
            </div>
            <div className="rounded-lg border border-border/40 bg-background/60 p-4 text-center">
              <p className="text-xs text-muted-foreground">Net Monthly</p>
              <p className="mt-1 text-xl font-semibold text-foreground">
                {formatCurrency(takeHome.netMonthly)}
              </p>
            </div>
            <div className="rounded-lg border border-border/40 bg-background/60 p-4 text-center">
              <p className="text-xs text-muted-foreground">Total Tax</p>
              <p className="mt-1 text-xl font-semibold text-foreground">
                {formatCurrency(takeHome.totalTax)}
              </p>
              <p className="text-xs text-muted-foreground">
                {(takeHome.effectiveRate * 100).toFixed(1)}% effective rate
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 rounded-xl border border-border/40 bg-background/60 p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Want the full {takeHome.stateName} breakdown — brackets, FICA, and paycheck math?
            </p>
            <Button asChild variant="outline" className="border-emerald-600/40 text-emerald-700 hover:bg-emerald-600/10 shrink-0">
              <a href={`/${stateSlugFor(stateKey)}`}>
                {takeHome.stateName} Calculator
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ─── Quick Reference Table ───────────────────────── */}
      <Card className="border-border/50 bg-card/80">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Hourly Rate Quick Reference (40 hrs/week)</CardTitle>
          <CardDescription>
            Annual gross at full-time — your state&apos;s take-home is one click away
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-lg border border-border/40">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/40 bg-muted/30">
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                    Hourly Rate
                  </th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">
                    Weekly
                  </th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">
                    Bi-weekly
                  </th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">
                    Monthly
                  </th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">
                    Annual
                  </th>
                </tr>
              </thead>
              <tbody>
                {QUICK_RATES.map((rate) => (
                  <tr
                    key={rate}
                    className="border-b border-border/20 transition-colors hover:bg-emerald-600/5"
                  >
                    <td className="px-4 py-2.5 font-semibold text-emerald-700">
                      ${rate.toLocaleString()}/hr
                    </td>
                    <td className="px-4 py-2.5 text-right text-foreground">
                      {formatCurrency(rate * 40)}
                    </td>
                    <td className="px-4 py-2.5 text-right text-foreground">
                      {formatCurrency(rate * 80)}
                    </td>
                    <td className="px-4 py-2.5 text-right text-foreground">
                      {formatCurrency((rate * 2080) / 12)}
                    </td>
                    <td className="px-4 py-2.5 text-right font-semibold text-foreground">
                      {formatCurrency(rate * 2080)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Curious what a specific salary nets after tax in your state? Browse{' '}
            <a href="/salary" className="font-medium text-emerald-700 underline underline-offset-2 hover:text-emerald-800">
              all salary levels ($30K–$500K)
            </a>{' '}
            or compare{' '}
            <a href="/paycheck-calculator" className="font-medium text-emerald-700 underline underline-offset-2 hover:text-emerald-800">
              full paychecks with deductions
            </a>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
