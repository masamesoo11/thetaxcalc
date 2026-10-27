'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Landmark,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Info,
  Percent,
  TrendingUp,
  ArrowRight,
  CalendarClock,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formatCurrency } from '@/lib/finance-utils';
import {
  futureValueWithMonthlyContributions,
  rothPhaseOut,
  IRA_CATCH_UP_2026,
  IRA_CONTRIBUTION_LIMIT_2026,
  type RothFilingStatus,
} from '@/lib/retirement-math';

// ─── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_AGE = 30;
const DEFAULT_FILING: RothFilingStatus = 'single';
const DEFAULT_MAGI = 120000;
const DEFAULT_CONTRIBUTION = 7500;
const DEFAULT_RETURN = 7;
const DEFAULT_WITHDRAWAL_AGE = 60;

const FILING_LABELS: Record<RothFilingStatus, string> = {
  single: 'Single',
  mfj: 'Married Filing Jointly',
  mfs: 'Married Filing Separately',
};

/** Simple taxable-account model: 15% capital-gains tax applied once to total growth at withdrawal. */
const TAXABLE_GAINS_RATE = 0.15;

// ─── Component ────────────────────────────────────────────────────────────────

export function RothIraCalculator() {
  const [age, setAge] = useState(DEFAULT_AGE);
  const [filing, setFiling] = useState<RothFilingStatus>(DEFAULT_FILING);
  const [magi, setMagi] = useState(DEFAULT_MAGI);
  const [contribution, setContribution] = useState(DEFAULT_CONTRIBUTION);
  const [returnPct, setReturnPct] = useState(DEFAULT_RETURN);
  const [withdrawalAge, setWithdrawalAge] = useState(DEFAULT_WITHDRAWAL_AGE);

  const result = useMemo(() => {
    const currentAge = Math.min(75, Math.max(18, Number.isFinite(age) ? age : 18));
    const retireAge = Math.min(90, Math.max(currentAge + 1, Number.isFinite(withdrawalAge) ? withdrawalAge : currentAge + 1));
    const years = Math.max(0, retireAge - currentAge);
    const income = Math.max(0, Number.isFinite(magi) ? magi : 0);
    const rate = Math.min(20, Math.max(0, Number.isFinite(returnPct) ? returnPct : 0));
    const entered = Math.max(0, Number.isFinite(contribution) ? contribution : 0);

    const catchUpEligible = currentAge >= 50;
    const applicableLimit = catchUpEligible
      ? IRA_CONTRIBUTION_LIMIT_2026 + IRA_CATCH_UP_2026
      : IRA_CONTRIBUTION_LIMIT_2026;

    const phase = rothPhaseOut(income, filing);
    const cappedByLimit = Math.min(entered, applicableLimit);
    const effectiveAnnual = cappedByLimit * phase.allowedMultiplier;

    const monthly = effectiveAnnual / 12;
    const balance = futureValueWithMonthlyContributions(0, monthly, rate, years);
    const totalContributions = effectiveAnnual * years;
    const totalGrowth = Math.max(0, balance - totalContributions);
    const taxableBalance = totalContributions + totalGrowth * (1 - TAXABLE_GAINS_RATE);
    const rothAdvantage = Math.max(0, balance - taxableBalance);
    const qualified = retireAge >= 60;

    return {
      currentAge,
      retireAge,
      years,
      catchUpEligible,
      applicableLimit,
      phase,
      cappedByLimit,
      effectiveAnnual,
      balance,
      totalContributions,
      totalGrowth,
      taxableBalance,
      rothAdvantage,
      qualified,
      limitCapped: entered > applicableLimit,
    };
  }, [age, withdrawalAge, magi, returnPct, contribution, filing]);

  const band = result.phase.blocked ? 'blocked' : result.phase.inPhaseOut ? 'partial' : 'full';

  return (
    <div className="space-y-6">
      {/* ─── Title ─────────────────────────────────────── */}
      <div className="text-center">
        <h2 className="flex items-center justify-center gap-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          <Landmark className="h-8 w-8 text-amber-600" aria-hidden="true" />
          Roth IRA Calculator
        </h2>
        <p className="mt-2 text-muted-foreground">
          Project tax-free growth, check your 2026 MAGI phase-out, and see what a Roth saves vs. a taxable account
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <Badge className="border-amber-500/30 bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-700">
            <ShieldCheck className="mr-1 h-3 w-3" aria-hidden="true" />
            Tax-Free Growth
          </Badge>
          <Badge className="border-border bg-muted/60 px-3 py-1 text-xs text-muted-foreground">
            2026 Limits &amp; Phase-Out Bands
          </Badge>
        </div>
      </div>

      {/* ─── 2026 limit reference card ─────────────────── */}
      <Card className="border-amber-500/20 bg-amber-500/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
            <div className="space-y-1 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">2026 IRA Contribution Limits</p>
              <p>
                Base limit: <strong className="text-foreground">{formatCurrency(IRA_CONTRIBUTION_LIMIT_2026)}</strong>{' '}
                (+<strong className="text-foreground">{formatCurrency(IRA_CATCH_UP_2026)}</strong> if age 50+). Your
                applicable limit at age {result.currentAge} is{' '}
                <strong className="text-foreground">{formatCurrency(result.applicableLimit)}</strong>. Contributions
                are after-tax — qualified withdrawals, including all growth, are federal-income-tax-free.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* ─── Inputs ─────────────────────────────────── */}
        <div className="min-w-0 space-y-4 lg:col-span-2">
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Landmark className="h-5 w-5 text-amber-600" aria-hidden="true" />
                Your Roth Plan
              </CardTitle>
              <CardDescription>Everything updates instantly</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="roth-age" className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <CalendarClock className="h-3.5 w-3.5 text-amber-600" aria-hidden="true" />
                      Current Age
                    </span>
                  </Label>
                  <Input
                    id="roth-age"
                    type="number"
                    min="18"
                    max="75"
                    step="1"
                    value={age}
                    onChange={(e) => setAge(parseFloat(e.target.value) || 0)}
                    aria-label="Current age"
                  />
                  {result.catchUpEligible && (
                    <p className="text-xs font-medium text-amber-700">Age 50+ catch-up applies</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="roth-withdraw-age" className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <CalendarClock className="h-3.5 w-3.5 text-amber-600" aria-hidden="true" />
                      Withdrawal Age
                    </span>
                  </Label>
                  <Input
                    id="roth-withdraw-age"
                    type="number"
                    min="50"
                    max="90"
                    step="1"
                    value={withdrawalAge}
                    onChange={(e) => setWithdrawalAge(parseFloat(e.target.value) || 0)}
                    aria-label="Planned withdrawal age"
                  />
                  {!result.qualified && (
                    <p className="text-xs font-medium text-red-600">Before 59&frac12; — see penalty note below</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="roth-filing" className="text-sm font-medium">
                  Filing Status
                </Label>
                <Select value={filing} onValueChange={(v) => setFiling(v as RothFilingStatus)}>
                  <SelectTrigger id="roth-filing" aria-label="Filing status">
                    <SelectValue placeholder="Choose your filing status" />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.keys(FILING_LABELS) as RothFilingStatus[]).map((key) => (
                      <SelectItem key={key} value={key}>
                        {FILING_LABELS[key]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="roth-magi" className="text-sm font-medium">
                  Modified AGI (MAGI)
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="roth-magi"
                    type="number"
                    min="0"
                    step="1000"
                    value={magi}
                    onChange={(e) => setMagi(parseFloat(e.target.value) || 0)}
                    className="pl-9"
                    aria-label="Modified adjusted gross income"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Roughly your AGI plus any tax-exempt interest for the year
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="roth-contribution" className="text-sm font-medium">
                  Annual Contribution
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="roth-contribution"
                    type="number"
                    min="0"
                    max={result.applicableLimit}
                    step="100"
                    value={contribution}
                    onChange={(e) => setContribution(parseFloat(e.target.value) || 0)}
                    className="pl-9"
                    aria-label="Annual Roth IRA contribution"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  2026 limit: {formatCurrency(IRA_CONTRIBUTION_LIMIT_2026)} (+{formatCurrency(IRA_CATCH_UP_2026)} if
                  50+); projection uses{' '}
                  <strong className="text-foreground">{formatCurrency(result.effectiveAnnual)}</strong> after limit
                  and phase-out checks
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="roth-return" className="text-sm font-medium">
                  <span className="flex items-center gap-1.5">
                    <Percent className="h-3.5 w-3.5 text-amber-600" aria-hidden="true" />
                    Expected Annual Return %
                  </span>
                </Label>
                <Input
                  id="roth-return"
                  type="number"
                  min="0"
                  max="15"
                  step="0.5"
                  value={returnPct}
                  onChange={(e) => setReturnPct(parseFloat(e.target.value) || 0)}
                  aria-label="Expected annual return percentage"
                />
                <Slider
                  value={[Math.min(15, Math.max(0, Number.isFinite(returnPct) ? returnPct : 0))]}
                  onValueChange={(v) => setReturnPct(v[0])}
                  min={2}
                  max={12}
                  step={0.5}
                  className="py-2"
                  aria-label="Expected annual return slider"
                />
                <p className="text-xs text-muted-foreground">Hint: 5% conservative, 7% balanced, 10% stocks historically</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ─── Results ────────────────────────────────── */}
        <div className="min-w-0 space-y-4 lg:col-span-3">
          {/* Hero balance */}
          <Card className="border-amber-500/30 bg-card/80">
            <CardContent className="p-5">
              <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 text-center">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Projected Roth Balance at Age {result.retireAge}
                </p>
                <p className="mt-1 text-3xl font-bold text-amber-700 sm:text-4xl">
                  {formatCurrency(result.balance)}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Assuming {Number.isFinite(returnPct) ? returnPct : 0}% average annual return for{' '}
                  {result.years} year{result.years === 1 ? '' : 's'}, tax-free forever
                </p>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg border border-border/40 bg-background/60 p-3">
                  <p className="text-xs text-muted-foreground">Total Contributions</p>
                  <p className="font-semibold text-foreground">{formatCurrency(result.totalContributions)}</p>
                </div>
                <div className="rounded-lg border border-border/40 bg-background/60 p-3">
                  <p className="text-xs text-muted-foreground">Total Growth (tax-free)</p>
                  <p className="font-semibold text-emerald-700">{formatCurrency(result.totalGrowth)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Phase-out card */}
          <Card
            className={
              band === 'full'
                ? 'border-emerald-500/30 bg-card/80'
                : band === 'partial'
                  ? 'border-amber-500/40 bg-card/80'
                  : 'border-red-500/30 bg-card/80'
            }
          >
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                {band === 'full' ? (
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                ) : (
                  <AlertTriangle
                    className={`mt-0.5 h-5 w-5 shrink-0 ${band === 'partial' ? 'text-amber-600' : 'text-red-600'}`}
                    aria-hidden="true"
                  />
                )}
                <div className="space-y-1 text-sm">
                  <p className="font-medium text-foreground">
                    {band === 'full'
                      ? 'Full Contribution Allowed'
                      : band === 'partial'
                        ? 'Reduced Contribution — You Are Inside the Phase-Out Band'
                        : 'Direct Roth Contribution Not Allowed'}
                  </p>
                  <p className="text-muted-foreground">{result.phase.phaseOutLabel}</p>
                  {band !== 'full' && (
                    <p className="text-foreground">
                      Allowed this year:{' '}
                      <strong>{formatCurrency(result.cappedByLimit * result.phase.allowedMultiplier)}</strong> of the{' '}
                      {formatCurrency(result.applicableLimit)} limit (
                      {(result.phase.allowedMultiplier * 100).toFixed(1)}%).
                    </p>
                  )}
                  {band === 'full' && (
                    <p className="text-muted-foreground">
                      Every dollar of the {formatCurrency(result.applicableLimit)} limit is available to you.
                    </p>
                  )}
                  {result.phase.blocked && (
                    <p className="text-muted-foreground">
                      Many higher earners still fund a Roth via the &ldquo;backdoor&rdquo; route — a nondeductible
                      traditional IRA contribution converted to Roth. Talk to a tax pro about the pro-rata rule first.
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Qualification + 5-year rule */}
          <Card className="border-border/50 bg-card/80">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Qualified Withdrawals: Age 59&frac12; + the 5-Year Rule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>
                Roth earnings come out completely tax- and penalty-free only when the withdrawal is{' '}
                <strong className="text-foreground">qualified</strong>: the account has been open at least 5 years
                (January 1 of the year of your first contribution starts the clock) <em>and</em> you are 59&frac12; or
                older. Growth that comes out before both boxes are ticked is taxed as ordinary income and usually owes
                an extra 10% early-distribution penalty.
              </p>
              <p>
                Your contributions are different — you can pull every dollar you put in, any time, tax- and
                penalty-free. The ordering rules treat withdrawals as coming from contributions first, then
                conversions, then earnings.
              </p>
              {!result.qualified && (
                <p className="font-medium text-red-600">
                  Your withdrawal age ({result.retireAge}) is before 59&frac12;: the balance shown includes earnings
                  that would generally owe income tax plus the 10% penalty if taken as shown.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Taxable comparison strip */}
          <Card className="border-border/50 bg-card/80">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="h-4 w-4 text-amber-600" aria-hidden="true" />
                Roth vs. Taxable Brokerage
              </CardTitle>
              <CardDescription>Same deposits, same growth — the tax treatment is the only difference</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-xl border border-border/30 bg-card/30 p-3">
                <svg
                  viewBox="0 0 560 150"
                  className="h-auto w-full"
                  style={{ minWidth: '320px' }}
                  role="img"
                  aria-label={`Comparison bar chart: Roth IRA balance ${formatCurrency(result.balance)} versus taxable brokerage balance ${formatCurrency(result.taxableBalance)}`}
                >
                  {[
                    {
                      label: 'Roth IRA (tax-free)',
                      value: result.balance,
                      color: '#b08d3e',
                      y: 30,
                    },
                    {
                      label: 'Taxable brokerage',
                      value: result.taxableBalance,
                      color: '#94a3b8',
                      y: 90,
                    },
                  ].map((row) => {
                    const barMax = 360;
                    const width = result.balance > 0 ? Math.max(2, (row.value / result.balance) * barMax) : 2;
                    return (
                      <g key={row.label}>
                        <text x="0" y={row.y + 4} className="fill-muted-foreground" style={{ fontSize: '12px' }}>
                          {row.label}
                        </text>
                        <rect x="150" y={row.y - 14} width={barMax} height="28" rx="4" className="fill-muted/20" />
                        <rect x="150" y={row.y - 14} width={width} height="28" rx="4" fill={row.color} />
                        <text
                          x={150 + width + 8}
                          y={row.y + 4}
                          className="fill-foreground"
                          style={{ fontSize: '12px', fontWeight: '600' }}
                        >
                          {formatCurrency(row.value)}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Roth&apos;s edge at age {result.retireAge}:{' '}
                <strong className="text-amber-700">{formatCurrency(result.rothAdvantage)}</strong> more in your pocket
                — money that stays invested in the taxable account is lost to taxes instead.
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Simple model footnote: the taxable balance charges 15% capital-gains tax once against total growth at
                withdrawal, while Roth gains are never taxed. Real brokerage accounts also leak value along the way
                (taxed dividends, fund distributions), so this comparison is conservative — the Roth&apos;s true edge is
                typically larger. Investment returns are never guaranteed; these are planning estimates.
              </p>
            </CardContent>
          </Card>

          {/* CTAs */}
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/compound-interest-calculator"
              className="group rounded-xl border border-amber-500/25 bg-amber-500/10 p-4 transition-colors hover:bg-amber-500/20"
            >
              <p className="flex items-center gap-1.5 text-sm font-semibold text-amber-700">
                Compound Interest Calculator
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                See the year-by-year snowball behind any savings plan
              </p>
            </Link>
            <Link
              href="/retirement-calculator"
              className="group rounded-xl border border-border/50 bg-muted/40 p-4 transition-colors hover:bg-muted/70"
            >
              <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                Retirement Calculator
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Test whether your total savings support the income you want
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
