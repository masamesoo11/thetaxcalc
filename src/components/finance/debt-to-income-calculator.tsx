'use client';

import { useMemo, useState } from 'react';
import {
  BadgeCheck,
  Calculator,
  Car,
  CreditCard,
  DollarSign,
  GraduationCap,
  Home,
  Info,
  MoreHorizontal,
  ShieldCheck,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { debtToIncome, DTI_QM_LIMIT_PCT, DTI_HARD_CAP_PCT } from '@/lib/payoff-math';
import { formatCurrency } from '@/lib/finance-utils';

// ─── Classification visuals ───────────────────────────────────────────────────

const CLASS_META = {
  excellent: {
    label: 'Excellent',
    note: 'Lenders see a comfortably low debt load. You qualify for the best mortgage tiers.',
    badge: 'border-emerald-500/40 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
    bar: 'bg-emerald-600',
  },
  good: {
    label: 'Good',
    note: 'Workable, but close to the 43% qualified-mortgage line. Paying down one balance buys headroom.',
    badge: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
    bar: 'bg-emerald-500',
  },
  caution: {
    label: 'Caution',
    note: 'Above the 43% QM limit most conventional loans enforce. Approval is possible but terms tighten fast.',
    badge: 'border-amber-500/40 bg-amber-500/15 text-amber-700 dark:text-amber-400',
    bar: 'bg-amber-500',
  },
  high: {
    label: 'High',
    note: 'Above 50%, approvals are rare and every extra dollar of debt hurts. Attack the balances before borrowing more.',
    badge: 'border-rose-500/40 bg-rose-500/15 text-rose-700 dark:text-rose-400',
    bar: 'bg-rose-500',
  },
} as const;

// ─── Component ───────────────────────────────────────────────────────────────

export function DebtToIncomeCalculator() {
  // ─── State ────────────────────────────────────────────────────────────
  const [income, setIncome] = useState(6000);
  const [housing, setHousing] = useState(1500);
  const [carLoans, setCarLoans] = useState(400);
  const [creditCardMinimums, setCreditCardMinimums] = useState(150);
  const [studentLoans, setStudentLoans] = useState(250);
  const [other, setOther] = useState(0);

  const safe = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);

  // ─── Live math ─────────────────────────────────────────────────────────
  const dti = useMemo(
    () =>
      debtToIncome(safe(income), {
        housing: safe(housing),
        carLoans: safe(carLoans),
        creditCardMinimums: safe(creditCardMinimums),
        studentLoans: safe(studentLoans),
        other: safe(other),
      }),
    [income, housing, carLoans, creditCardMinimums, studentLoans, other],
  );

  const meta = CLASS_META[dti.classification];
  const backBarPct = Math.min(dti.backEndPct, 100);
  const frontBarPct = Math.min(dti.frontEndPct, 100);

  const debtRows = [
    { key: 'housing', label: 'Housing (mortgage/rent + taxes + insurance)', value: housing, Icon: Home },
    { key: 'car', label: 'Auto loans / leases', value: carLoans, Icon: Car },
    { key: 'cards', label: 'Credit card minimums', value: creditCardMinimums, Icon: CreditCard },
    { key: 'student', label: 'Student loans', value: studentLoans, Icon: GraduationCap },
    { key: 'other', label: 'Other (child support, alimony, other loans)', value: other, Icon: MoreHorizontal },
  ];

  const numberField = (
    id: string,
    label: React.ReactNode,
    value: number,
    setter: (n: number) => void,
    ariaLabel: string,
  ) => (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      <div className="relative max-w-xs">
        <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id={id}
          type="number"
          min="0"
          step="50"
          value={value || ''}
          onChange={(e) => setter(Number(e.target.value) || 0)}
          className="pl-9"
          aria-label={ariaLabel}
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* ─── Page Title ─────────────────────────────────── */}
      <div className="text-center">
        <h2 className="flex items-center justify-center gap-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          <Calculator className="h-8 w-8 text-emerald-600" />
          Debt-to-Income Ratio Calculator
        </h2>
        <p className="mt-2 text-muted-foreground">
          The one number lenders check before every mortgage: your back-end DTI. See where you stand
          against the 28/36 rule and the 43% qualified-mortgage limit. Everything updates instantly.
        </p>
      </div>

      {/* ─── Input + Results Grid ──────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Left: form */}
        <div className="min-w-0 space-y-4 lg:col-span-2">
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Monthly Numbers</CardTitle>
              <CardDescription>
                Use required monthly payments, not what you actually pay extra
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {numberField(
                'dti-income',
                <span className="flex items-center gap-1.5">
                  <DollarSign className="h-3.5 w-3.5 text-emerald-600" />
                  Gross Monthly Income (before tax)
                </span>,
                income,
                setIncome,
                'Gross monthly income before tax',
              )}

              <div className="space-y-4 rounded-lg border border-border/50 bg-background/60 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Monthly debt payments
                </p>
                {debtRows.map((row) =>
                  numberField(
                    `dti-${row.key}`,
                    <span className="flex items-center gap-1.5">
                      <row.Icon className="h-3.5 w-3.5 text-emerald-600" />
                      {row.label}
                    </span>,
                    row.value,
                    row.key === 'housing'
                      ? setHousing
                      : row.key === 'car'
                        ? setCarLoans
                        : row.key === 'cards'
                          ? setCreditCardMinimums
                          : row.key === 'student'
                            ? setStudentLoans
                            : setOther,
                    row.label,
                  ),
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                For credit cards, lenders use the minimums on your statement — not the full balance
                and not the amount you choose to pay.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right: results */}
        <div className="min-w-0 space-y-4 lg:col-span-3">
          <Card className="border-emerald-500/30 bg-card/80">
            <CardContent className="space-y-4 p-5">
              {/* Back-end headline */}
              <div className="rounded-xl bg-emerald-500/10 p-4 text-center border border-emerald-500/20">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Back-End DTI (all debts)
                </p>
                <p className="mt-1 text-4xl font-bold text-emerald-700 dark:text-emerald-400">
                  {dti.backEndPct.toFixed(2)}%
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {formatCurrency(dti.totalDebtPayments)} of debt payments on{' '}
                  {formatCurrency(safe(income))} gross monthly income
                </p>
                <span
                  className={`mt-3 inline-block rounded-full border px-3 py-1 text-xs font-semibold ${meta.badge}`}
                >
                  {meta.label}
                </span>
              </div>

              <p className="text-center text-sm text-muted-foreground">{meta.note}</p>

              {/* Ratio bars */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-foreground">Back-end DTI</span>
                    <span className="text-muted-foreground">
                      {dti.backEndPct.toFixed(2)}% &mdash; limit {DTI_HARD_CAP_PCT}%
                    </span>
                  </div>
                  <div className="relative h-4 overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full ${meta.bar} transition-all duration-500`}
                      style={{ width: `${backBarPct}%` }}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-foreground">Front-end DTI (housing only)</span>
                    <span className="text-muted-foreground">
                      {dti.frontEndPct.toFixed(2)}% &mdash; guideline 28%
                    </span>
                  </div>
                  <div className="relative h-4 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-emerald-600/70 transition-all duration-500"
                      style={{ width: `${frontBarPct}%` }}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap justify-center gap-2 text-[11px] text-muted-foreground">
                  <span className="rounded-md border border-border/50 px-2 py-0.5">28% housing rule</span>
                  <span className="rounded-md border border-border/50 px-2 py-0.5">36% classic cap</span>
                  <span className="rounded-md border border-border/50 px-2 py-0.5">43% QM limit</span>
                  <span className="rounded-md border border-border/50 px-2 py-0.5">50% hard cap</span>
                </div>
              </div>

              {/* Payment breakdown */}
              <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
                <div className="rounded-lg border border-border/40 bg-background/60 p-3 min-w-0">
                  <p className="text-xs text-muted-foreground">Total Monthly Debts</p>
                  <p className="font-semibold text-foreground">
                    {formatCurrency(dti.totalDebtPayments)}
                  </p>
                </div>
                <div className="rounded-lg border border-border/40 bg-background/60 p-3 min-w-0">
                  <p className="text-xs text-muted-foreground">Housing Share</p>
                  <p className="font-semibold text-foreground">{formatCurrency(safe(housing))}</p>
                </div>
                <div className="rounded-lg border border-border/40 bg-background/60 p-3 min-w-0">
                  <p className="text-xs text-muted-foreground">Left After Debts</p>
                  <p className="font-semibold text-foreground">
                    {formatCurrency(safe(income) - dti.totalDebtPayments)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What lenders look for */}
          <Card className="border-border/50 bg-card/80">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                What Lenders Look For
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">Front-end (housing) ratio:</strong> your housing
                payment divided by gross income. The classic guideline says stay under{' '}
                <strong className="text-foreground">28%</strong>.
              </p>
              <p>
                <strong className="text-foreground">Back-end DTI:</strong> all monthly debt payments
                divided by gross income — the number that makes or breaks approvals. Under{' '}
                <strong className="text-foreground">36%</strong> is comfortable;{' '}
                <strong className="text-foreground">43%</strong> is the qualified-mortgage line most
                conventional loans enforce; above{' '}
                <strong className="text-foreground">50%</strong> approvals are rare even with
                compensating factors.
              </p>
              <p>
                Income is gross (before taxes) — the same pre-tax figure your pay stub shows. To see
                what actually lands in your account after those taxes, use our{' '}
                <a href="/paycheck-calculator" className="font-medium text-emerald-700 underline underline-offset-2 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300">
                  paycheck calculator
                </a>
                , and for the housing side see the{' '}
                <a href="/mortgage-calculator" className="font-medium text-emerald-700 underline underline-offset-2 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300">
                  mortgage calculator
                </a>
                .
              </p>
            </CardContent>
          </Card>

          {/* Improve your ratio */}
          <Card className="border-emerald-500/20 bg-emerald-500/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">The fastest ways to move this number</p>
                  <p>
                    Paying off a small installment loan removes its whole payment from the ratio —
                    the classic DTI lever. Snowball extra dollars at one balance with our{' '}
                    <a href="/debt-payoff-calculator" className="font-medium text-emerald-700 underline underline-offset-2 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300">
                      debt payoff calculator
                    </a>
                    , or raise the gross-income side honestly (overtime, bonuses, a side gig) —
                    lenders count a two-year history for variable income.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/80">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">Worked example (the defaults above)</p>
                  <p>
                    $6,000 gross income with $1,500 housing, $400 auto, $150 card minimums and $250
                    student loans totals $2,300 of payments &mdash; a back-end DTI of 38.33% and a
                    front-end of 25.00%. That reads &ldquo;good&rdquo;: under the 43% QM line but
                    close enough that one more car payment would push it over.
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
