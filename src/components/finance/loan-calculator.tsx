'use client';

import { useMemo, useState } from 'react';
import {
  Landmark,
  Calculator,
  DollarSign,
  Percent,
  Info,
  Zap,
  Clock,
  TrendingDown,
  CalendarClock,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  buildAmortization,
  formatTerm,
  formatUsd,
  yearlySummary,
  type AmortizationSchedule,
} from '@/lib/loan-math';

/**
 * General loan calculator: any fixed-rate installment loan (signature,
 * home-improvement, debt consolidation) with an optional extra monthly
 * payment that is compared side by side against the base schedule.
 */
export function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(25000);
  const [aprPct, setAprPct] = useState(8);
  const [termYears, setTermYears] = useState(5);
  const [termExtraMonths, setTermExtraMonths] = useState(0);
  const [extraMonthly, setExtraMonthly] = useState(0);

  const termMonths = useMemo(
    () => Math.max(1, Math.max(0, termYears) * 12 + Math.max(0, termExtraMonths)),
    [termYears, termExtraMonths]
  );

  const base: AmortizationSchedule = useMemo(
    () => buildAmortization(loanAmount, aprPct, termMonths),
    [loanAmount, aprPct, termMonths]
  );

  const withExtra: AmortizationSchedule = useMemo(
    () => buildAmortization(loanAmount, aprPct, termMonths, extraMonthly),
    [loanAmount, aprPct, termMonths, extraMonthly]
  );

  const yearly = useMemo(() => yearlySummary(base.rows), [base]);
  const yearlyExtra = useMemo(() => yearlySummary(withExtra.rows), [withExtra]);

  const interestSaved = base.totals.totalInterest - withExtra.totals.totalInterest;
  const monthsSaved = base.totals.months - withExtra.totals.months;

  return (
    <div className="space-y-6">
      {/* ─── Title ─────────────────────────────────────────── */}
      <div className="text-center">
        <h2 className="flex items-center justify-center gap-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          <Landmark className="h-8 w-8 text-emerald-600" />
          Loan Calculator
        </h2>
        <p className="mt-2 text-muted-foreground">
          Monthly payment, total interest and full payoff schedule for any fixed-rate loan
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <Badge className="border-emerald-500/30 bg-emerald-600/20 px-3 py-1 text-xs font-semibold text-emerald-700">
            <Clock className="mr-1 h-3 w-3" />
            Years + Months Terms
          </Badge>
          <Badge className="border-amber-500/30 bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-700">
            <Zap className="mr-1 h-3 w-3" />
            Extra-Payment Comparison
          </Badge>
        </div>
      </div>

      {/* ─── How the math works ────────────────────────────── */}
      <Card className="border-emerald-500/20 bg-emerald-600/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
            <div className="space-y-1 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">One Formula Covers Every Installment Loan</p>
              <p>
                Any fixed-rate installment loan — signature, consolidation, home-improvement —
                uses the same annuity formula:{' '}
                <strong className="font-mono text-emerald-600">
                  M = P x [r(1+r)^n] / [(1+r)^n - 1]
                </strong>{' '}
                where P is the amount borrowed, r is APR divided by 12, and n is the total number
                of payments. Add an extra amount each month and the surplus skips interest
                entirely, going straight to the balance — which is why small extras cut the
                payoff date so sharply.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ─── Inputs + results ──────────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="min-w-0 space-y-4 lg:col-span-2">
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calculator className="h-5 w-5 text-emerald-600" />
                Loan Details
              </CardTitle>
              <CardDescription>Everything updates instantly</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="lc-amount" className="text-sm font-medium">
                  Loan Amount
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="lc-amount"
                    type="number"
                    min={0}
                    step={500}
                    value={loanAmount || ''}
                    onChange={(e) => setLoanAmount(Number(e.target.value) || 0)}
                    className="pl-9"
                    aria-label="Loan amount"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="lc-apr" className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <Percent className="h-3.5 w-3.5 text-emerald-600" />
                      APR %
                    </span>
                  </Label>
                  <Input
                    id="lc-apr"
                    type="number"
                    min={0}
                    max={40}
                    step={0.1}
                    value={aprPct || ''}
                    onChange={(e) => setAprPct(Number(e.target.value) || 0)}
                    aria-label="Annual percentage rate"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lc-years" className="text-sm font-medium">
                    Term (Years)
                  </Label>
                  <Input
                    id="lc-years"
                    type="number"
                    min={0}
                    max={40}
                    step={1}
                    value={termYears || ''}
                    onChange={(e) => setTermYears(Math.max(0, Number(e.target.value) || 0))}
                    aria-label="Loan term in years"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="lc-months" className="text-sm font-medium">
                    Extra Months
                  </Label>
                  <Input
                    id="lc-months"
                    type="number"
                    min={0}
                    max={11}
                    step={1}
                    value={termExtraMonths || ''}
                    onChange={(e) => setTermExtraMonths(Number(e.target.value) || 0)}
                    aria-label="Additional months on top of years"
                  />
                  <p className="text-xs text-muted-foreground">
                    Total: {termMonths} months ({formatTerm(termMonths)})
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lc-extra" className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <Zap className="h-3.5 w-3.5 text-amber-700" />
                      Extra Monthly Payment
                    </span>
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="lc-extra"
                      type="number"
                      min={0}
                      step={25}
                      value={extraMonthly || ''}
                      onChange={(e) => setExtraMonthly(Number(e.target.value) || 0)}
                      className="pl-9"
                      aria-label="Extra monthly payment"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Base vs extra comparison */}
          <Card className="border-amber-500/30 bg-amber-500/5">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Zap className="h-5 w-5 text-amber-700" />
                {extraMonthly > 0 ? 'With vs Without Extra Payment' : 'Add Extra to See the Impact'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {extraMonthly > 0 ? (
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="rounded-lg border border-border/40 bg-background/60 p-3">
                      <p className="text-xs text-muted-foreground">Base payment</p>
                      <p className="mt-1 font-bold text-foreground">
                        {formatUsd(base.basePayment)}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {base.totals.months} mo payoff
                      </p>
                    </div>
                    <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3">
                      <p className="text-xs text-muted-foreground">With extra</p>
                      <p className="mt-1 font-bold text-amber-700">
                        {formatUsd(base.basePayment + extraMonthly)}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {withExtra.totals.months} mo payoff
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="rounded-xl bg-emerald-600/10 p-3">
                      <p className="text-xs font-medium uppercase tracking-wider text-emerald-600/80">
                        Interest Saved
                      </p>
                      <p className="mt-1 text-2xl font-bold text-emerald-600">
                        {formatUsd(interestSaved)}
                      </p>
                    </div>
                    <div className="rounded-xl bg-emerald-600/10 p-3">
                      <p className="text-xs font-medium uppercase tracking-wider text-emerald-600/80">
                        Months Saved
                      </p>
                      <p className="mt-1 text-2xl font-bold text-emerald-600">{monthsSaved}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  On a {formatUsd(loanAmount)} loan at {aprPct}% for {termMonths} months, even{' '}
                  {formatUsd(50, 0)}/mo extra retires the balance sooner and lets you skip every
                  month of interest at the tail of the loan. Type an extra amount above to see
                  your exact savings.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Results + chart */}
        <div className="min-w-0 space-y-4 lg:col-span-3">
          <Card className="border-emerald-500/20 bg-card/90 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Landmark className="h-5 w-5 text-emerald-600" />
                Payment Summary
              </CardTitle>
              <CardDescription>
                {formatUsd(loanAmount)} at {aprPct}% APR for {formatTerm(termMonths)}
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
                  {extraMonthly > 0
                    ? `${formatUsd(base.basePayment + extraMonthly)} with your ${formatUsd(extraMonthly, 0)}/mo extra`
                    : `${base.totals.months} payments of ${formatUsd(base.basePayment)}`}
                </p>
              </div>

              <div className="space-y-2.5 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total interest</span>
                  <span className="font-semibold text-red-600">
                    {formatUsd(base.totals.totalInterest)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total repaid</span>
                  <span className="font-semibold text-foreground">
                    {formatUsd(base.totals.totalPaid)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Interest as share of principal</span>
                  <span className="font-semibold text-foreground">
                    {loanAmount > 0
                      ? `${((base.totals.totalInterest / loanAmount) * 100).toFixed(1)}%`
                      : '0%'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">First payment interest share</span>
                  <span className="font-semibold text-foreground">
                    {base.rows.length > 0 && base.basePayment > 0
                      ? `${((base.rows[0].interest / base.basePayment) * 100).toFixed(1)}%`
                      : '0%'}
                  </span>
                </div>
              </div>

              {extraMonthly > 0 && (
                <>
                  <Separator className="bg-border/40" />
                  <div className="grid grid-cols-2 gap-3 text-center text-sm">
                    <div className="rounded-lg border border-border/40 bg-background/60 p-3">
                      <p className="text-xs text-muted-foreground">Without extra</p>
                      <p className="mt-1 font-semibold text-foreground">
                        <CalendarClock className="mr-1 inline h-4 w-4 text-muted-foreground" />
                        {formatTerm(base.totals.months)}
                      </p>
                      <p className="mt-0.5 text-xs text-red-600">
                        {formatUsd(base.totals.totalInterest)} interest
                      </p>
                    </div>
                    <div className="rounded-lg border border-emerald-500/30 bg-emerald-600/10 p-3">
                      <p className="text-xs text-muted-foreground">With extra</p>
                      <p className="mt-1 font-semibold text-foreground">
                        <CalendarClock className="mr-1 inline h-4 w-4 text-muted-foreground" />
                        {formatTerm(withExtra.totals.months)}
                      </p>
                      <p className="mt-0.5 text-xs text-emerald-700">
                        {formatUsd(withExtra.totals.totalInterest)} interest
                      </p>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <BalanceDecayChart
            yearly={yearly}
            yearlyExtra={extraMonthly > 0 ? yearlyExtra : null}
            loanAmount={loanAmount}
          />
        </div>
      </div>

      {/* ─── Yearly amortization summary ───────────────────── */}
      <Card className="border-border/50 bg-card/80">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingDown className="h-5 w-5 text-emerald-600" />
            Year-by-Year Amortization Summary
          </CardTitle>
          <CardDescription>
            How much of each year&apos;s payments went to interest vs principal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-h-96 overflow-y-auto overflow-x-auto custom-scrollbar rounded-lg border border-border/40">
            <table className="w-full text-sm">
              <thead className="sticky top-0">
                <tr className="bg-muted/60 backdrop-blur">
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Year</th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">
                    Interest Paid
                  </th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">
                    Principal Paid
                  </th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">
                    Remaining Balance
                  </th>
                </tr>
              </thead>
              <tbody>
                {yearly.map((row) => (
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
                    <td className="px-4 py-2.5 text-right font-semibold text-foreground">
                      {formatUsd(row.endBalance)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Notice the pattern: the interest column falls and the principal column rises every
            single year. Shopping for a different kind of financing? See our{' '}
            <a
              href="/auto-loan-calculator"
              className="font-medium text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
            >
              auto loan calculator
            </a>
            ,{' '}
            <a
              href="/personal-loan-calculator"
              className="font-medium text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
            >
              personal loan calculator
            </a>{' '}
            or the full{' '}
            <a
              href="/amortization-calculator"
              className="font-medium text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
            >
              amortization schedule calculator
            </a>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * Pure-SVG line chart of the remaining balance by year, base schedule vs the
 * extra-payment schedule. Crawlable, no charting library, dark-mode-safe text.
 */
function BalanceDecayChart({
  yearly,
  yearlyExtra,
  loanAmount,
}: {
  yearly: { year: number; endBalance: number }[];
  yearlyExtra: { year: number; endBalance: number }[] | null;
  loanAmount: number;
}) {
  if (yearly.length === 0) {
    return (
      <Card className="border-border/50 bg-card/80">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Balance Decay</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Enter a loan to see the payoff curve.</p>
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

  const points: { year: number; endBalance: number }[] = [
    { year: 0, endBalance: Math.max(loanAmount, 0) },
    ...yearly,
  ];
  const extraPoints: { year: number; endBalance: number }[] | null = yearlyExtra
    ? [{ year: 0, endBalance: Math.max(loanAmount, 0) }, ...yearlyExtra]
    : null;

  const maxYear = Math.max(points[points.length - 1].year, extraPoints ? extraPoints[extraPoints.length - 1].year : 0, 1);
  const maxValue = Math.max(loanAmount, ...points.map((p) => p.endBalance), 1);

  const xFor = (year: number) => padLeft + chartW * (year / maxYear);
  const yFor = (v: number) => padTop + chartH * (1 - v / maxValue);
  const toPath = (pts: { year: number; endBalance: number }[]) =>
    pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${xFor(p.year).toFixed(1)} ${yFor(p.endBalance).toFixed(1)}`).join(' ');

  const xLabelCount = Math.min(maxYear, 6);
  const xLabels = Array.from({ length: xLabelCount }, (_, i) => {
    const step = maxYear / xLabelCount;
    return Math.round(i * step);
  });
  if (xLabels[xLabels.length - 1] !== maxYear) xLabels.push(maxYear);

  return (
    <Card className="border-border/50 bg-card/80">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Balance Decay</CardTitle>
        <CardDescription>
          Remaining balance by year{extraPoints ? ' — green line shows your extra-payment pace' : ''}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto rounded-xl border border-border/30 bg-card/30 p-4">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="h-auto w-full"
            style={{ minWidth: '560px' }}
            role="img"
            aria-label={`Line chart of remaining loan balance by year over ${maxYear} years`}
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
              d={toPath(points)}
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
