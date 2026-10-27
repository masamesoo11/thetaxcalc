'use client';

import { useMemo, useState } from 'react';
import {
  Layers,
  Calculator,
  DollarSign,
  Percent,
  Info,
  Zap,
  Clock,
  TrendingUp,
  CalendarClock,
  PiggyBank,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  buildAmortization,
  formatTerm,
  formatUsd,
  yearlySummary,
  type AmortizationSchedule,
  type YearlySummaryRow,
} from '@/lib/loan-math';

const TERM_YEARS = [10, 15, 20, 25, 30];
const MAX_TABLE_ROWS = 30;

/** Keep the yearly table small: evenly spaced rows, always ending on the final year. */
function capYearRows(rows: YearlySummaryRow[], cap: number): YearlySummaryRow[] {
  if (rows.length <= cap) return rows;
  const step = Math.ceil(rows.length / cap);
  const picked: YearlySummaryRow[] = [];
  for (let i = 0; i < rows.length; i += step) picked.push(rows[i]);
  const last = rows[rows.length - 1];
  if (picked[picked.length - 1] !== last) picked.push(last);
  return picked;
}

/**
 * Amortization calculator: full yearly schedule for any fixed-rate loan,
 * a cumulative-interest chart and a with/without extra-payment comparison.
 * The explanatory copy leans on live numbers to show how amortization
 * front-loads interest.
 */
export function AmortizationCalculator() {
  const [principal, setPrincipal] = useState(300000);
  const [aprPct, setAprPct] = useState(6.5);
  const [termYears, setTermYears] = useState(30);
  const [extraMonthly, setExtraMonthly] = useState(0);

  // Calendar dates are client-only: this component is dynamically imported
  // with ssr:false, so lazy initialization is hydration-safe and avoids a
  // setState-in-effect cascading render.
  const [today] = useState<Date | null>(() =>
    typeof window === 'undefined' ? null : new Date()
  );

  const termMonths = useMemo(() => Math.max(1, termYears) * 12, [termYears]);

  const base: AmortizationSchedule = useMemo(
    () => buildAmortization(principal, aprPct, termMonths),
    [principal, aprPct, termMonths]
  );

  const withExtra: AmortizationSchedule = useMemo(
    () => buildAmortization(principal, aprPct, termMonths, extraMonthly),
    [principal, aprPct, termMonths, extraMonthly]
  );

  const yearly = useMemo(() => yearlySummary(base.rows), [base]);
  const yearlyExtra = useMemo(() => yearlySummary(withExtra.rows), [withExtra]);
  const tableRows = useMemo(() => capYearRows(yearly, MAX_TABLE_ROWS), [yearly]);

  const monthsSaved = base.totals.months - withExtra.totals.months;
  const interestSaved = base.totals.totalInterest - withExtra.totals.totalInterest;

  const firstInterestShare =
    base.rows.length > 0 && base.basePayment > 0
      ? (base.rows[0].interest / base.basePayment) * 100
      : 0;
  const year1 = yearly[0];
  const year1InterestShare =
    year1 && year1.interestPaid + year1.principalPaid > 0
      ? (year1.interestPaid / (year1.interestPaid + year1.principalPaid)) * 100
      : 0;
  const crossoverMonth = useMemo(() => {
    const row = base.rows.find((r) => r.principal > r.interest);
    return row ? row.month : 0;
  }, [base]);
  const halfwayInterestMonth = useMemo(() => {
    let cum = 0;
    const half = base.totals.totalInterest / 2;
    for (const row of base.rows) {
      cum += row.interest;
      if (cum >= half) return row.month;
    }
    return 0;
  }, [base]);

  const payoffLabel = (months: number) => {
    if (!today) return formatTerm(months);
    const d = new Date(today);
    d.setMonth(d.getMonth() + months);
    return `${formatTerm(months)} (${d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })})`;
  };

  return (
    <div className="space-y-6">
      {/* ─── Title ─────────────────────────────────────────── */}
      <div className="text-center">
        <h2 className="flex items-center justify-center gap-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          <Layers className="h-8 w-8 text-emerald-600" />
          Amortization Calculator
        </h2>
        <p className="mt-2 text-muted-foreground">
          Full yearly schedule, cumulative interest and the extra-payment payoff comparison
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <Badge className="border-emerald-500/30 bg-emerald-600/20 px-3 py-1 text-xs font-semibold text-emerald-700">
            <CalendarClock className="mr-1 h-3 w-3" />
            Payoff Dates
          </Badge>
          <Badge className="border-amber-500/30 bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-700">
            <Zap className="mr-1 h-3 w-3" />
            Extra-Payment Savings
          </Badge>
        </div>
      </div>

      {/* ─── Front-loading explainer ───────────────────────── */}
      <Card className="border-emerald-500/20 bg-emerald-600/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
            <div className="space-y-1 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">
                Amortization Front-Loads Interest — Watch It Happen
              </p>
              <p>
                Your level payment is{' '}
                <strong className="font-mono text-emerald-600">
                  M = P x [r(1+r)^n] / [(1+r)^n - 1]
                </strong>
                , but the split inside that payment changes every month: interest is charged on
                the remaining balance, so payment 1 is almost all interest while the final
                payments are almost all principal. On your current inputs,{' '}
                {firstInterestShare.toFixed(1)}% of payment 1 is interest
                {year1 ? ` and ${year1InterestShare.toFixed(1)}% of year 1 goes to the lender` : ''}
                {crossoverMonth > 0
                  ? ` — the principal share does not overtake interest until month ${crossoverMonth} (year ${(crossoverMonth / 12).toFixed(1)})`
                  : ''}
                {halfwayInterestMonth > 0
                  ? `. Half of the entire interest bill is paid by month ${halfwayInterestMonth}.`
                  : '.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ─── Inputs + results ──────────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Inputs */}
        <div className="min-w-0 space-y-4 lg:col-span-2">
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calculator className="h-5 w-5 text-emerald-600" />
                Loan Parameters
              </CardTitle>
              <CardDescription>Adjust any value for instant results</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="am-principal" className="text-sm font-medium">
                  Loan Principal
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="am-principal"
                    type="number"
                    min={0}
                    step={5000}
                    value={principal || ''}
                    onChange={(e) => setPrincipal(Number(e.target.value) || 0)}
                    className="pl-9"
                    aria-label="Loan principal"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="am-apr" className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <Percent className="h-3.5 w-3.5 text-emerald-600" />
                      APR %
                    </span>
                  </Label>
                  <Input
                    id="am-apr"
                    type="number"
                    min={0}
                    max={30}
                    step={0.125}
                    value={aprPct || ''}
                    onChange={(e) => setAprPct(Number(e.target.value) || 0)}
                    aria-label="Annual percentage rate"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="am-term" className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-emerald-600" />
                      Term
                    </span>
                  </Label>
                  <Select
                    value={String(termYears)}
                    onValueChange={(v) => setTermYears(Number(v))}
                  >
                    <SelectTrigger id="am-term" aria-label="Loan term">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TERM_YEARS.map((y) => (
                        <SelectItem key={y} value={String(y)}>
                          {y} years
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator className="bg-border/40" />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="am-extra" className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <Zap className="h-3.5 w-3.5 text-amber-700" />
                      Extra Monthly Payment
                    </span>
                  </Label>
                  <Badge variant="secondary" className="bg-emerald-600/10 text-emerald-600">
                    {formatUsd(extraMonthly, 0)}/mo
                  </Badge>
                </div>
                <Slider
                  id="am-extra"
                  value={[extraMonthly]}
                  onValueChange={(v) => setExtraMonthly(v[0])}
                  min={0}
                  max={1000}
                  step={25}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>$0</span>
                  <span>$500</span>
                  <span>$1,000</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* With vs without comparison */}
          <Card className="border-amber-500/30 bg-amber-500/5">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <PiggyBank className="h-5 w-5 text-amber-700" />
                With vs Without the Extra {formatUsd(extraMonthly, 0)}/mo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Monthly payment (scheduled)</span>
                <span className="font-semibold text-foreground">
                  {formatUsd(base.basePayment)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Monthly payment (with extra)</span>
                <span className="font-semibold text-amber-700">
                  {formatUsd(base.basePayment + extraMonthly)}
                </span>
              </div>
              <Separator className="bg-border/40" />
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Payoff without extra</span>
                <span className="font-semibold text-foreground">
                  {payoffLabel(base.totals.months)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Payoff with extra</span>
                <span className="font-semibold text-amber-700">
                  {payoffLabel(withExtra.totals.months)}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-1 text-center">
                <div className="rounded-xl bg-emerald-600/10 p-3">
                  <p className="text-xs font-medium uppercase tracking-wider text-emerald-600/80">
                    Interest Saved
                  </p>
                  <p className="mt-1 text-2xl font-bold text-emerald-600">
                    {formatUsd(Math.max(0, interestSaved))}
                  </p>
                </div>
                <div className="rounded-xl bg-emerald-600/10 p-3">
                  <p className="text-xs font-medium uppercase tracking-wider text-emerald-600/80">
                    Time Saved
                  </p>
                  <p className="mt-1 text-2xl font-bold text-emerald-600">
                    {monthsSaved > 0 ? formatTerm(monthsSaved) : '0 mo'}
                  </p>
                </div>
              </div>
              <Progress
                value={base.totals.months > 0 ? (withExtra.totals.months / base.totals.months) * 100 : 0}
                className="h-2"
                aria-label="Share of the original term used when paying extra"
              />
              <p className="text-xs text-muted-foreground">
                With the extra payment the loan uses{' '}
                {base.totals.months > 0
                  ? Math.round((withExtra.totals.months / base.totals.months) * 100)
                  : 100}
                % of its scheduled life.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Results + chart */}
        <div className="min-w-0 space-y-4 lg:col-span-3">
          <Card className="border-emerald-500/20 bg-card/90 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Layers className="h-5 w-5 text-emerald-600" />
                Loan Summary
              </CardTitle>
              <CardDescription>
                {formatUsd(principal)} at {aprPct}% APR for {termYears} years
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-xl bg-emerald-600/10 p-4 text-center">
                <p className="text-xs font-medium uppercase tracking-wider text-emerald-600/80">
                  Monthly Payment
                </p>
                <p className="mt-1 text-3xl font-bold text-emerald-600 sm:text-4xl">
                  {formatUsd(base.basePayment)}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {base.totals.months} payments ({formatTerm(base.totals.months)})
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 text-sm">
                <div className="rounded-lg border border-border/40 bg-background/60 p-3 text-center">
                  <p className="text-xs text-muted-foreground">Total interest</p>
                  <p className="mt-1 font-semibold text-red-600">
                    {formatUsd(base.totals.totalInterest)}
                  </p>
                </div>
                <div className="rounded-lg border border-border/40 bg-background/60 p-3 text-center">
                  <p className="text-xs text-muted-foreground">Total paid</p>
                  <p className="mt-1 font-semibold text-foreground">
                    {formatUsd(base.totals.totalPaid)}
                  </p>
                </div>
                <div className="rounded-lg border border-border/40 bg-background/60 p-3 text-center">
                  <p className="text-xs text-muted-foreground">Interest vs principal</p>
                  <p className="mt-1 font-semibold text-foreground">
                    {principal > 0
                      ? `${(base.totals.totalInterest / principal).toFixed(2)}x`
                      : '0x'}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Principal vs Interest Over the Full Term
                </p>
                <div className="flex h-3 overflow-hidden rounded-full bg-muted">
                  <div
                    className="bg-emerald-600 transition-all"
                    style={{
                      width: `${base.totals.totalPaid > 0 ? (principal / base.totals.totalPaid) * 100 : 0}%`,
                    }}
                  />
                  <div
                    className="bg-red-400 transition-all"
                    style={{
                      width: `${base.totals.totalPaid > 0 ? (base.totals.totalInterest / base.totals.totalPaid) * 100 : 0}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Principal {formatUsd(principal)}</span>
                  <span>Interest {formatUsd(base.totals.totalInterest)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <CumulativeInterestChart
            yearly={yearly}
            yearlyExtra={extraMonthly > 0 ? yearlyExtra : null}
            totalInterest={base.totals.totalInterest}
          />
        </div>
      </div>

      {/* ─── Full yearly amortization table ────────────────── */}
      <Card className="border-border/50 bg-card/80">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="h-5 w-5 text-emerald-600" />
            Full Amortization Schedule by Year
          </CardTitle>
          <CardDescription>
            Every loan year: interest paid, principal paid and the balance still owed
            {tableRows.length < yearly.length ? ` (showing ${tableRows.length} of ${yearly.length} years)` : ''}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-h-96 overflow-y-auto overflow-x-auto custom-scrollbar rounded-lg border border-border/40">
            <table className="w-full text-sm">
              <thead className="sticky top-0">
                <tr className="bg-muted/60 backdrop-blur">
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                    Year
                  </th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">
                    Interest Paid
                  </th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">
                    Principal Paid
                  </th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">
                    Interest Share
                  </th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">
                    Remaining Balance
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row) => {
                  const paid = row.interestPaid + row.principalPaid;
                  return (
                    <tr
                      key={row.year}
                      className="border-b border-border/20 transition-colors hover:bg-emerald-600/5"
                    >
                      <td className="px-4 py-2.5 font-semibold text-foreground">{row.year}</td>
                      <td className="px-4 py-2.5 text-right text-red-600">
                        {formatUsd(row.interestPaid)}
                      </td>
                      <td className="px-4 py-2.5 text-right text-emerald-700">
                        {formatUsd(row.principalPaid)}
                      </td>
                      <td className="px-4 py-2.5 text-right text-muted-foreground">
                        {paid > 0 ? `${((row.interestPaid / paid) * 100).toFixed(1)}%` : '0%'}
                      </td>
                      <td className="px-4 py-2.5 text-right font-semibold text-foreground">
                        {formatUsd(row.endBalance)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            The interest-share column is the amortization curve in miniature: it starts near{' '}
            {year1InterestShare > 0 ? year1InterestShare.toFixed(0) : '90'}% and slides toward
            zero. Because of that front-loading, extra principal in the early years removes the
            most interest per dollar. Model a specific home purchase with our{' '}
            <a
              href="/mortgage-calculator"
              className="font-medium text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
            >
              mortgage calculator
            </a>
            , or see every year of a car note with the{' '}
            <a
              href="/auto-loan-calculator"
              className="font-medium text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
            >
              auto loan calculator
            </a>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * Pure-SVG cumulative-interest line chart: interest stacked up year by year,
 * scheduled pace vs the extra-payment pace when one is active.
 */
function CumulativeInterestChart({
  yearly,
  yearlyExtra,
  totalInterest,
}: {
  yearly: YearlySummaryRow[];
  yearlyExtra: YearlySummaryRow[] | null;
  totalInterest: number;
}) {
  if (yearly.length === 0) {
    return (
      <Card className="border-border/50 bg-card/80">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Cumulative Interest</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Enter a loan to see interest accrue.</p>
        </CardContent>
      </Card>
    );
  }

  const width = 720;
  const height = 280;
  const padLeft = 60;
  const padBottom = 36;
  const padTop = 24;
  const chartW = width - padLeft - 16;
  const chartH = height - padTop - padBottom;

  const cumulative = (rows: YearlySummaryRow[]) => {
    let cum = 0;
    return rows.map((r) => {
      cum += r.interestPaid;
      return { year: r.year, value: cum };
    });
  };

  const basePoints = [{ year: 0, value: 0 }, ...cumulative(yearly)];
  const extraPoints = yearlyExtra
    ? [{ year: 0, value: 0 }, ...cumulative(yearlyExtra)]
    : null;

  const maxYear = Math.max(
    basePoints[basePoints.length - 1].year,
    extraPoints ? extraPoints[extraPoints.length - 1].year : 0,
    1
  );
  const maxValue = Math.max(totalInterest, ...basePoints.map((p) => p.value), 1);

  const xFor = (year: number) => padLeft + chartW * (year / maxYear);
  const yFor = (v: number) => padTop + chartH * (1 - v / maxValue);
  const toPath = (pts: { year: number; value: number }[]) =>
    pts
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${xFor(p.year).toFixed(1)} ${yFor(p.value).toFixed(1)}`)
      .join(' ');

  const xLabelCount = Math.min(maxYear, 6);
  const xLabels = Array.from({ length: xLabelCount }, (_, i) => {
    const step = maxYear / xLabelCount;
    return Math.round(i * step);
  });

  return (
    <Card className="border-border/50 bg-card/80">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Cumulative Interest</CardTitle>
        <CardDescription>
          Total interest paid by year{extraPoints ? ' — green line is the extra-payment pace' : ''}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto rounded-xl border border-border/30 bg-card/30 p-4">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="h-auto w-full"
            style={{ minWidth: '560px' }}
            role="img"
            aria-label={`Line chart of cumulative interest over ${maxYear} years, totaling ${formatUsd(totalInterest, 0)}`}
          >
            {[0, 0.25, 0.5, 0.75, 1].map((f, i) => (
              <g key={i}>
                <line
                  x1={padLeft}
                  y1={yFor(f * maxValue)}
                  x2={width - 8}
                  y2={yFor(f * maxValue)}
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-border"
                  strokeDasharray="3,4"
                />
                <text
                  x={padLeft - 8}
                  y={yFor(f * maxValue) + 4}
                  textAnchor="end"
                  className="fill-muted-foreground"
                  style={{ fontSize: '11px' }}
                >
                  {f * maxValue >= 1000
                    ? `$${Math.round((f * maxValue) / 1000)}k`
                    : `$${Math.round(f * maxValue)}`}
                </text>
              </g>
            ))}
            {xLabels.map((y) => (
              <text
                key={y}
                x={xFor(y)}
                y={height - 10}
                textAnchor="middle"
                className="fill-muted-foreground"
                style={{ fontSize: '11px' }}
              >
                {y === 0 ? 'Start' : `Y${y}`}
              </text>
            ))}
            <path
              d={toPath(basePoints)}
              fill="none"
              stroke="#b08d3e"
              strokeWidth={2.5}
              strokeLinecap="round"
            />
            {extraPoints && (
              <path
                d={toPath(extraPoints)}
                fill="none"
                stroke="#059669"
                strokeWidth={2.5}
                strokeLinecap="round"
              />
            )}
            <text
              x={xFor(maxYear) - 6}
              y={yFor(totalInterest) - 8}
              textAnchor="end"
              className="fill-muted-foreground"
              style={{ fontSize: '11px' }}
            >
              {formatUsd(totalInterest, 0)}
            </text>
            <g transform={`translate(${padLeft}, ${padTop - 6})`}>
              <line x1={0} y1={-4} x2={18} y2={-4} stroke="#b08d3e" strokeWidth={2.5} />
              <text x={24} y={0} className="fill-muted-foreground" style={{ fontSize: '11px' }}>
                Scheduled
              </text>
              {extraPoints && (
                <>
                  <line x1={100} y1={-4} x2={118} y2={-4} stroke="#059669" strokeWidth={2.5} />
                  <text x={124} y={0} className="fill-muted-foreground" style={{ fontSize: '11px' }}>
                    With extra
                  </text>
                </>
              )}
            </g>
          </svg>
        </div>
      </CardContent>
    </Card>
  );
}
