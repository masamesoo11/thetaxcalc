'use client';

import { useMemo, useState } from 'react';
import {
  Wallet,
  Calculator,
  DollarSign,
  Percent,
  Info,
  Clock,
  Scale,
  Sparkles,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  buildAmortization,
  formatUsd,
  monthlyPayment,
  type AmortizationSchedule,
} from '@/lib/loan-math';

const TERM_OPTIONS = [24, 36, 48, 60, 72, 84];
const COMPARE_TERMS = [36, 48, 60];

/** Typical (not guaranteed) 2026 personal-loan APR ranges by credit tier. */
const CREDIT_BANDS: { band: string; range: string; score: string; tone: string }[] = [
  { band: 'Excellent', range: '~8% - 12%', score: '720+', tone: 'border-emerald-500/40 bg-emerald-600/10 text-emerald-700' },
  { band: 'Good', range: '~13% - 18%', score: '690-719', tone: 'border-emerald-500/25 bg-emerald-600/5 text-emerald-700' },
  { band: 'Fair', range: '~19% - 25%', score: '630-689', tone: 'border-amber-500/40 bg-amber-500/10 text-amber-700' },
  { band: 'Poor / rebuilding', range: '~26% - 36%', score: 'below 630', tone: 'border-red-400/40 bg-red-400/10 text-red-700' },
];

/**
 * Personal loan calculator with credit-band APR context and a 36/48/60
 * month side-by-side comparison of the same loan.
 */
export function PersonalLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(15000);
  const [aprPct, setAprPct] = useState(12);
  const [termMonths, setTermMonths] = useState(48);

  const schedule: AmortizationSchedule = useMemo(
    () => buildAmortization(loanAmount, aprPct, termMonths),
    [loanAmount, aprPct, termMonths]
  );

  const comparisons = useMemo(
    () =>
      COMPARE_TERMS.map((months) => {
        const s = buildAmortization(loanAmount, aprPct, months);
        return {
          months,
          payment: monthlyPayment(loanAmount, aprPct, months),
          totalInterest: s.totals.totalInterest,
          totalRepaid: s.totals.totalPaid,
        };
      }),
    [loanAmount, aprPct]
  );

  const firstInterestShare =
    schedule.rows.length > 0 && schedule.rows[0].payment > 0
      ? (schedule.rows[0].interest / schedule.rows[0].payment) * 100
      : 0;

  return (
    <div className="space-y-6">
      {/* ─── Title ─────────────────────────────────────────── */}
      <div className="text-center">
        <h2 className="flex items-center justify-center gap-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          <Wallet className="h-8 w-8 text-emerald-600" />
          Personal Loan Calculator
        </h2>
        <p className="mt-2 text-muted-foreground">
          Monthly payment, interest cost and term trade-offs for an unsecured personal loan
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <Badge className="border-emerald-500/30 bg-emerald-600/20 px-3 py-1 text-xs font-semibold text-emerald-700">
            <Scale className="mr-1 h-3 w-3" />
            36 vs 48 vs 60 Months
          </Badge>
          <Badge className="border-amber-500/30 bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-700">
            <Sparkles className="mr-1 h-3 w-3" />
            APR by Credit Band
          </Badge>
        </div>
      </div>

      {/* ─── How the math works ────────────────────────────── */}
      <Card className="border-emerald-500/20 bg-emerald-600/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
            <div className="space-y-1 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Unsecured Means the Rate Does the Work</p>
              <p>
                A personal loan has no collateral, so the lender prices it entirely off your
                credit profile — that is why the same {formatUsd(loanAmount)} can cost anywhere
                from single-digit to 30%+ APR. The payment itself is the standard annuity{' '}
                <strong className="font-mono text-emerald-600">
                  M = P x [r(1+r)^n] / [(1+r)^n - 1]
                </strong>
                . Shorter terms raise the payment but slash total interest; the comparison cards
                below show both sides of that trade on your exact inputs.
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
                Loan Terms
              </CardTitle>
              <CardDescription>Adjust any value for instant results</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pl-amount" className="text-sm font-medium">
                  Loan Amount
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="pl-amount"
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

              <div className="space-y-2">
                <Label htmlFor="pl-apr" className="text-sm font-medium">
                  <span className="flex items-center gap-1.5">
                    <Percent className="h-3.5 w-3.5 text-emerald-600" />
                    APR %
                  </span>
                </Label>
                <Input
                  id="pl-apr"
                  type="number"
                  min={0}
                  max={40}
                  step={0.5}
                  value={aprPct || ''}
                  onChange={(e) => setAprPct(Number(e.target.value) || 0)}
                  aria-label="Annual percentage rate"
                />
                <p className="text-xs text-muted-foreground">
                  Use the rate from your loan offer — not the &ldquo;starting at&rdquo; teaser
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pl-term" className="text-sm font-medium">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-emerald-600" />
                    Term
                  </span>
                </Label>
                <Select value={String(termMonths)} onValueChange={(v) => setTermMonths(Number(v))}>
                  <SelectTrigger id="pl-term" aria-label="Loan term">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TERM_OPTIONS.map((m) => (
                      <SelectItem key={m} value={String(m)}>
                        {m} months ({formatUsd(monthlyPayment(loanAmount, aprPct, m), 0)}/mo)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Credit-band reference cards */}
          <Card className="border-border/50 bg-card/80">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Sparkles className="h-5 w-5 text-amber-700" />
                Typical APR by Credit Band
              </CardTitle>
              <CardDescription>
                Typical 2026 personal-loan ranges — not guarantees. Your offer depends on income,
                debt-to-income ratio and the lender.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {CREDIT_BANDS.map((band) => (
                  <div key={band.band} className={`rounded-xl border p-3 ${band.tone}`}>
                    <p className="text-xs font-medium uppercase tracking-wider opacity-80">
                      {band.band}
                    </p>
                    <p className="mt-1 text-lg font-bold">{band.range}</p>
                    <p className="text-xs opacity-80">Score {band.score}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="min-w-0 space-y-4 lg:col-span-3">
          <Card className="border-emerald-500/20 bg-card/90 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Wallet className="h-5 w-5 text-emerald-600" />
                Payment Summary
              </CardTitle>
              <CardDescription>
                {formatUsd(loanAmount)} at {aprPct}% APR for {termMonths} months
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-xl bg-emerald-600/10 p-4 text-center">
                <p className="text-xs font-medium uppercase tracking-wider text-emerald-600/80">
                  Monthly Payment
                </p>
                <p className="mt-1 text-3xl font-bold text-emerald-600 sm:text-4xl">
                  {formatUsd(schedule.basePayment)}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 text-sm">
                <div className="rounded-lg border border-border/40 bg-background/60 p-3">
                  <p className="text-xs text-muted-foreground">Total interest</p>
                  <p className="mt-1 font-semibold text-red-600">
                    {formatUsd(schedule.totals.totalInterest)}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    First payment: {firstInterestShare.toFixed(0)}% interest
                  </p>
                </div>
                <div className="rounded-lg border border-border/40 bg-background/60 p-3">
                  <p className="text-xs text-muted-foreground">Total repaid</p>
                  <p className="mt-1 font-semibold text-foreground">
                    {formatUsd(schedule.totals.totalPaid)}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {schedule.totals.months} payments, then done
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Where the Money Goes
                </p>
                <div className="flex h-3 overflow-hidden rounded-full bg-muted">
                  <div
                    className="bg-emerald-600 transition-all"
                    style={{
                      width: `${loanAmount > 0 && schedule.totals.totalPaid > 0 ? (loanAmount / schedule.totals.totalPaid) * 100 : 0}%`,
                    }}
                  />
                  <div
                    className="bg-red-400 transition-all"
                    style={{
                      width: `${schedule.totals.totalPaid > 0 ? (schedule.totals.totalInterest / schedule.totals.totalPaid) * 100 : 0}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>You borrow {formatUsd(loanAmount)}</span>
                  <span>Interest {formatUsd(schedule.totals.totalInterest)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 36 vs 48 vs 60 comparison */}
          <Card className="border-amber-500/30 bg-amber-500/5">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Scale className="h-5 w-5 text-amber-700" />
                Same Loan, Three Terms
              </CardTitle>
              <CardDescription>
                Your {formatUsd(loanAmount)} at {aprPct}% APR, compared side by side
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="grid min-w-[420px] gap-3 sm:grid-cols-3">
                  {comparisons.map((c) => {
                    const selected = c.months === termMonths;
                    return (
                      <div
                        key={c.months}
                        className={`rounded-xl border p-4 text-center transition-all ${
                          selected
                            ? 'border-emerald-500/50 bg-emerald-600/10 shadow-sm'
                            : 'border-border/40 bg-background/60'
                        }`}
                      >
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          {c.months} months
                        </p>
                        <p className="mt-2 text-2xl font-bold text-foreground">
                          {formatUsd(c.payment)}
                          <span className="text-xs font-normal text-muted-foreground">/mo</span>
                        </p>
                        <Separator className="my-3 bg-border/40" />
                        <p className="text-xs text-muted-foreground">Total interest</p>
                        <p className="font-semibold text-red-600">{formatUsd(c.totalInterest)}</p>
                        <p className="mt-1 text-xs text-muted-foreground">Total repaid</p>
                        <p className="font-semibold text-foreground">{formatUsd(c.totalRepaid)}</p>
                        {selected && (
                          <Badge className="mt-3 bg-emerald-600/20 text-xs font-semibold text-emerald-700">
                            Your term
                          </Badge>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                The pattern never changes: every step shorter raises the payment a little but cuts
                the interest a lot. At 12% APR, going from 60 down to 36 months typically raises
                the payment by roughly half while cutting the interest bill by over 40% — run your
                own numbers above and watch the trade-off move.
              </p>
            </CardContent>
          </Card>

          {/* Explainer */}
          <Card className="border-border/50 bg-card/80">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Read a Personal Loan Offer Like a Pro</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">APR is the real price.</strong> It bundles the
                interest rate plus most fees into one comparable number. A{' '}
                {formatUsd(loanAmount)} loan at 12% APR for {termMonths} months costs{' '}
                {formatUsd(schedule.totals.totalInterest)} in interest — but a 5% origination fee
                ({formatUsd(loanAmount * 0.05)} on this loan) is cash you also never see, so weigh
                it against the APR when comparing offers.
              </p>
              <p>
                <strong className="text-foreground">Longer terms are a trap when the rate is
                high.</strong> Stretch this loan from 48 to 84 months and the payment drops, but
                you pay interest for three and a half extra years — on a 36% APR card-style rate
                that difference can exceed a third of what you borrowed. Prefer the shortest
                payment you can comfortably afford, and see what a different amount does with our{' '}
                <a
                  href="/loan-calculator"
                  className="font-medium text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
                >
                  general loan calculator
                </a>
                .
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
