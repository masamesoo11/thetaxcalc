'use client';

import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  CalendarClock,
  Calculator,
  CreditCard,
  DollarSign,
  Info,
  Landmark,
  Percent,
  PiggyBank,
  TrendingDown,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { payoffSchedule, PAYOFF_NEVER, type PayoffRow } from '@/lib/payoff-math';
import { formatCurrency } from '@/lib/finance-utils';

// ─── Constants ───────────────────────────────────────────────────────────────

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

// ─── Component ───────────────────────────────────────────────────────────────

export function DebtPayoffCalculator() {
  // ─── State ────────────────────────────────────────────────────────────
  const [balance, setBalance] = useState(5000);
  const [apr, setApr] = useState(22);
  const [payment, setPayment] = useState(200);
  const [extra, setExtra] = useState(0);

  const safe = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);

  // ─── Live math ─────────────────────────────────────────────────────────
  const base = useMemo(
    () => payoffSchedule(safe(balance), safe(apr), safe(payment)),
    [balance, apr, payment],
  );

  const withExtra = useMemo(
    () =>
      safe(extra) > 0
        ? payoffSchedule(safe(balance), safe(apr), safe(payment), safe(extra))
        : null,
    [balance, apr, payment, extra],
  );

  const neverPaysOff = base.months === PAYOFF_NEVER;
  const monthsSaved = withExtra ? base.months - withExtra.months : 0;
  const interestSaved = withExtra ? base.totalInterest - withExtra.totalInterest : 0;
  const result = withExtra ?? base;

  // Balance-decline series (chart): every month as an (x, y) point.
  const series = useMemo(() => {
    const mk = (months: number, rows: PayoffRow[]): [number, number][] => {
      if (months <= 0 || !rows.length) return [];
      return rows.map((r) => [r.month, r.balance] as [number, number]);
    };
    return {
      base: mk(base.months, base.rows),
      extra: withExtra ? mk(withExtra.months, withExtra.rows) : null,
    };
  }, [base, withExtra]);

  // Yearly rollup table from the active schedule rows.
  const yearly = useMemo(() => {
    const rows = result.rows;
    if (!rows.length) return [];
    const out: { year: number; endBalance: number; interest: number; principal: number }[] = [];
    let y = 1;
    while ((y - 1) * 12 < rows.length) {
      const slice = rows.slice((y - 1) * 12, y * 12);
      if (!slice.length) break;
      out.push({
        year: y,
        endBalance: slice[slice.length - 1].balance,
        interest: slice.reduce((s, r) => s + r.interest, 0),
        principal: slice.reduce((s, r) => s + r.principal, 0),
      });
      y += 1;
    }
    return out.slice(0, 10);
  }, [result]);

  const nPts = (pts: [number, number][]) =>
    pts.map((p) => p.join(',')).join(' ');

  return (
    <div className="space-y-6">
      {/* ─── Page Title ─────────────────────────────────── */}
      <div className="text-center">
        <h2 className="flex items-center justify-center gap-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          <CreditCard className="h-8 w-8 text-emerald-600" />
          Debt Payoff Calculator
        </h2>
        <p className="mt-2 text-muted-foreground">
          See exactly when you&apos;ll be debt-free: months to payoff, total interest, payoff date —
          and what one extra payment per month really saves. Everything updates instantly.
        </p>
      </div>

      {/* ─── Input + Results Grid ──────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Left: form */}
        <div className="min-w-0 space-y-4 lg:col-span-2">
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calculator className="h-5 w-5 text-emerald-600" />
                Your Debt
              </CardTitle>
              <CardDescription>Any fixed-payment debt: card, personal loan, line of credit</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Balance */}
              <div className="space-y-2">
                <Label htmlFor="dp-balance" className="text-sm font-medium">
                  <span className="flex items-center gap-1.5">
                    <DollarSign className="h-3.5 w-3.5 text-emerald-600" />
                    Current Balance
                  </span>
                </Label>
                <div className="relative max-w-xs">
                  <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="dp-balance"
                    type="number"
                    min="0"
                    step="50"
                    value={balance || ''}
                    onChange={(e) => setBalance(Number(e.target.value) || 0)}
                    className="pl-9"
                    placeholder="5000"
                    aria-label="Current balance"
                  />
                </div>
              </div>

              {/* APR */}
              <div className="space-y-2">
                <Label htmlFor="dp-apr" className="text-sm font-medium">
                  <span className="flex items-center gap-1.5">
                    <Percent className="h-3.5 w-3.5 text-emerald-600" />
                    APR (annual interest rate)
                  </span>
                </Label>
                <div className="relative max-w-xs">
                  <Percent className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="dp-apr"
                    type="number"
                    min="0"
                    max="60"
                    step="0.25"
                    value={apr || ''}
                    onChange={(e) => setApr(Number(e.target.value) || 0)}
                    className="pl-9"
                    placeholder="22"
                    aria-label="APR annual percentage rate"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Typical 2026 credit-card APRs run about 20&ndash;24%; personal loans 8&ndash;36%.
                </p>
              </div>

              {/* Monthly payment */}
              <div className="space-y-2">
                <Label htmlFor="dp-payment" className="text-sm font-medium">
                  <span className="flex items-center gap-1.5">
                    <CalendarClock className="h-3.5 w-3.5 text-emerald-600" />
                    Monthly Payment
                  </span>
                </Label>
                <div className="relative max-w-xs">
                  <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="dp-payment"
                    type="number"
                    min="0"
                    step="10"
                    value={payment || ''}
                    onChange={(e) => setPayment(Number(e.target.value) || 0)}
                    className="pl-9"
                    placeholder="200"
                    aria-label="Monthly payment"
                  />
                </div>
              </div>

              {/* Extra payment */}
              <div className="space-y-2">
                <Label htmlFor="dp-extra" className="text-sm font-medium">
                  <span className="flex items-center gap-1.5">
                    <PiggyBank className="h-3.5 w-3.5 text-emerald-600" />
                    Extra Payment Each Month
                  </span>
                </Label>
                <div className="flex flex-wrap gap-2">
                  {[0, 25, 50, 100, 200].map((v) => (
                    <Button
                      key={v}
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => setExtra(v)}
                      aria-pressed={extra === v}
                      className={
                        extra === v
                          ? 'min-w-16 border-emerald-500/60 bg-emerald-500/15 font-semibold text-emerald-700 hover:bg-emerald-500/25 dark:text-emerald-400'
                          : 'min-w-16 text-muted-foreground'
                      }
                    >
                      {v === 0 ? 'None' : `+$${v}`}
                    </Button>
                  ))}
                </div>
                <div className="relative max-w-xs">
                  <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="dp-extra"
                    type="number"
                    min="0"
                    step="10"
                    value={extra || ''}
                    onChange={(e) => setExtra(Number(e.target.value) || 0)}
                    className="pl-9"
                    placeholder="0"
                    aria-label="Extra payment each month"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Avalanche vs snowball explainer */}
          <Card className="border-border/50 bg-card/80">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Avalanche vs Snowball</CardTitle>
              <CardDescription>Two proven orders of attack for multiple debts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">Avalanche:</strong> pay the minimum on
                everything, throw every spare dollar at the highest-APR debt first. Mathematically
                cheapest — it kills the most expensive interest first.
              </p>
              <p>
                <strong className="text-foreground">Snowball:</strong> attack the smallest balance
                first for the quick win, then roll that freed-up payment into the next debt. Slightly
                pricier in interest, but the early wins keep people going.
              </p>
              <p>
                Studies on real payoff behavior find the psychological edge matters; the best plan
                is the one you finish. This calculator handles one debt at a time — model each
                balance, then use{' '}
                <a href="/loan-calculator" className="font-medium text-emerald-700 underline underline-offset-2 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300">
                  the loan calculator
                </a>{' '}
                for installment loans with full amortization.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right: results */}
        <div className="min-w-0 space-y-4 lg:col-span-3">
          {neverPaysOff ? (
            <Card className="border-rose-500/30 bg-card/80">
              <CardContent className="space-y-3 p-5">
                <div className="flex items-start gap-3 rounded-xl border border-rose-500/20 bg-rose-500/10 p-4">
                  <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-rose-600" />
                  <div className="space-y-1 text-sm">
                    <p className="font-semibold text-foreground">
                      This payment never pays off the debt
                    </p>
                    <p className="text-muted-foreground">
                      Your payment of {formatCurrency(safe(payment))} doesn&apos;t cover the first
                      month&apos;s interest charge of{' '}
                      <strong className="text-foreground">
                        {formatCurrency(base.firstMonthInterest)}
                      </strong>{' '}
                      at {safe(apr)}% APR — the balance would grow forever. To pay the debt off at
                      all, the payment must exceed{' '}
                      <strong className="text-foreground">
                        {formatCurrency(base.firstMonthInterest)}
                      </strong>
                      . And beware small increments: paying just barely over the line drags a
                      $5,000 balance at 22% APR out for decades with brutal interest.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              <Card className="border-emerald-500/30 bg-card/80">
                <CardContent className="space-y-3 p-5">
                  <div className="rounded-xl bg-emerald-500/10 p-4 text-center border border-emerald-500/20">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Debt-Free Date
                    </p>
                    <p className="mt-1 text-3xl font-bold text-emerald-700 dark:text-emerald-400">
                      {MONTH_NAMES[result.payoffMonthIdx]} {result.payoffYear}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {result.months} monthly {result.months === 1 ? 'payment' : 'payments'} from today
                      {withExtra ? ' (with your extra payments)' : ''}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                    <div className="rounded-lg border border-border/40 bg-background/60 p-3 min-w-0">
                      <p className="text-xs text-muted-foreground">Months to Payoff</p>
                      <p className="font-semibold text-foreground">{result.months}</p>
                    </div>
                    <div className="rounded-lg border border-border/40 bg-background/60 p-3 min-w-0">
                      <p className="text-xs text-muted-foreground">Total Interest</p>
                      <p className="font-semibold text-rose-600 dark:text-rose-400">
                        {formatCurrency(result.totalInterest)}
                      </p>
                    </div>
                    <div className="rounded-lg border border-border/40 bg-background/60 p-3 min-w-0">
                      <p className="text-xs text-muted-foreground">Total Paid</p>
                      <p className="font-semibold text-foreground">
                        {formatCurrency(result.totalPaid)}
                      </p>
                    </div>
                    <div className="rounded-lg border border-border/40 bg-background/60 p-3 min-w-0">
                      <p className="text-xs text-muted-foreground">Monthly Payment</p>
                      <p className="font-semibold text-foreground">
                        {formatCurrency(safe(payment) + safe(extra))}
                      </p>
                    </div>
                  </div>

                  {withExtra && (
                    <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm">
                      <p className="font-medium text-emerald-700 dark:text-emerald-400">
                        Your extra {formatCurrency(safe(extra))}/mo saves{' '}
                        {monthsSaved} {monthsSaved === 1 ? 'month' : 'months'} and{' '}
                        {formatCurrency(interestSaved)} in interest
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Base payment only: {base.months} months,{' '}
                        {formatCurrency(base.totalInterest)} interest &rarr; debt-free{' '}
                        {MONTH_NAMES[base.payoffMonthIdx]} {base.payoffYear}. With extra:{' '}
                        {withExtra.months} months, {formatCurrency(withExtra.totalInterest)}.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Balance decline chart */}
              <Card className="border-border/50 bg-card/80">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <TrendingDown className="h-4 w-4 text-emerald-600" />
                    Balance Decline
                  </CardTitle>
                  <CardDescription>
                    Remaining balance month by month{series.extra ? ' — base vs with extra' : ''}
                  </CardDescription>
                </CardHeader>
                <CardContent className="min-w-0">
                  <div className="min-w-0 overflow-hidden rounded-lg border border-border/40 bg-background/60 p-3">
                    <svg
                      viewBox={`0 0 ${Math.max(base.months, withExtra?.months ?? 0) || 1} ${safe(balance)}`}
                      preserveAspectRatio="none"
                      className="h-48 w-full"
                      role="img"
                      aria-label="Chart of the remaining balance falling to zero over the payoff months"
                    >
                      {/* base line */}
                      <polyline
                        fill="none"
                        stroke="#78716c"
                        strokeWidth={Math.max(safe(balance) * 0.004, 1.5)}
                        points={`0,${safe(balance)} ${nPts(series.base)} ${base.months},0`}
                        vectorEffect="non-scaling-stroke"
                      />
                      {/* extra line */}
                      {series.extra && withExtra && (
                        <polyline
                          fill="none"
                          stroke="#059669"
                          strokeWidth={Math.max(safe(balance) * 0.005, 2)}
                          points={`0,${safe(balance)} ${nPts(series.extra)} ${withExtra.months},0`}
                          vectorEffect="non-scaling-stroke"
                        />
                      )}
                    </svg>
                    <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <span className="inline-block h-0.5 w-4 bg-stone-500" />
                        Base payment ({base.months} mo)
                      </span>
                      {series.extra && withExtra && (
                        <span className="flex items-center gap-1.5">
                          <span className="inline-block h-0.5 w-4 bg-emerald-600" />
                          With +{formatCurrency(safe(extra))}/mo ({withExtra.months} mo)
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Yearly schedule */}
              <Card className="border-border/50 bg-card/80">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Year-by-Year Progress</CardTitle>
                  <CardDescription>Interest vs principal paid each year (first 10 years)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-hidden rounded-lg border border-border/40">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-muted/60 backdrop-blur">
                            <th scope="col" className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                              Year
                            </th>
                            <th scope="col" className="px-4 py-2.5 text-right font-medium text-muted-foreground">
                              Interest Paid
                            </th>
                            <th scope="col" className="px-4 py-2.5 text-right font-medium text-muted-foreground">
                              Principal Paid
                            </th>
                            <th scope="col" className="px-4 py-2.5 text-right font-medium text-muted-foreground">
                              Balance at Year End
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {yearly.map((row) => (
                            <tr
                              key={row.year}
                              className="border-b border-border/20 transition-colors hover:bg-emerald-500/5 last:border-b-0"
                            >
                              <td className="px-4 py-2.5 font-semibold text-foreground">{row.year}</td>
                              <td className="px-4 py-2.5 text-right text-rose-600 dark:text-rose-400">
                                {formatCurrency(row.interest)}
                              </td>
                              <td className="px-4 py-2.5 text-right text-muted-foreground">
                                {formatCurrency(row.principal)}
                              </td>
                              <td className="px-4 py-2.5 text-right font-semibold text-foreground">
                                {formatCurrency(row.endBalance)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Minimum-payment warning */}
          <Card className="border-amber-500/20 bg-amber-500/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">Why the payment amount matters so much</p>
                  <p>
                    Card issuers set minimums near interest + 1% of the balance — profitable for
                    them, punishing for you. On $5,000 at 22% APR, paying $200 a month finishes the
                    job in 34 months with $1,749.88 of interest; drop to $92 and the same debt takes{' '}
                    <strong className="text-foreground">310 months</strong> — nearly 26 years — and
                    costs <strong className="text-foreground">$23,462.14</strong> in interest. Every
                    dollar above the interest line attacks principal directly. To see how much room
                    your budget has for that extra dollar, check your{' '}
                    <a href="/paycheck-calculator" className="font-medium text-amber-700 underline underline-offset-2 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300">
                      take-home pay
                    </a>
                    , and whether a{' '}
                    <a href="/debt-to-income-calculator" className="font-medium text-amber-700 underline underline-offset-2 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300">
                      debt-to-income ratio
                    </a>
                    {' '}is holding you back from refinancing.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Consolidation hint */}
          <Card className="border-border/50 bg-card/80">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Landmark className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">Consolidation shortcut</p>
                  <p>
                    Personal-loan rates are often half a card&apos;s APR — folding a high-rate
                    balance into a fixed installment can cut the interest bill dramatically without
                    changing the payment size. Model that trade with our{' '}
                    <a href="/personal-loan-calculator" className="font-medium text-emerald-700 underline underline-offset-2 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300">
                      personal loan calculator
                    </a>
                    .
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
