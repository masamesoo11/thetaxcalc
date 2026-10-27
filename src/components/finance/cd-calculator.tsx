'use client';

import { useMemo, useState } from 'react';
import {
  Landmark,
  Calculator,
  Info,
  ShieldCheck,
  AlertTriangle,
  Coins,
  Lock,
  Unlock,
  BarChart3,
  Percent,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formatCurrency } from '@/lib/finance-utils';
import { cdBalanceAtMonth, cdMaturity } from '@/lib/savings-math';

// ─── Term options ─────────────────────────────────────────────────────────────

const TERM_OPTIONS = [3, 6, 12, 18, 24, 36, 48, 60];

const TERM_LABELS: Record<number, string> = {
  3: '3 months',
  6: '6 months',
  12: '1 year (12 months)',
  18: '18 months',
  24: '2 years (24 months)',
  36: '3 years (36 months)',
  48: '4 years (48 months)',
  60: '5 years (60 months)',
};

function termShortLabel(months: number): string {
  if (months < 12) return `${months} mo`;
  const years = months / 12;
  return years === 1 ? '1 yr' : `${years} yrs`;
}

/** Milestone months to chart: fixed candidates filtered by term + the term itself. */
function milestoneMonths(term: number): number[] {
  const candidates = [3, 6, 12, 18, 24, 36, 48, 60];
  const set = new Set(candidates.filter((m) => m <= term));
  set.add(term);
  return [...set].sort((a, b) => a - b);
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CdCalculator() {
  const [deposit, setDeposit] = useState(10000);
  const [apyPct, setApyPct] = useState(4.25);
  const [termMonths, setTermMonths] = useState(12);

  const result = useMemo(
    () => cdMaturity(deposit, apyPct, termMonths),
    [deposit, apyPct, termMonths]
  );

  // Milestone bars: interest earned at each checkpoint of the term.
  const milestones = useMemo(() => {
    const months = milestoneMonths(termMonths);
    return months.map((m) => ({
      month: m,
      interest: cdBalanceAtMonth(deposit, apyPct, m) - Math.max(0, deposit),
    }));
  }, [deposit, apyPct, termMonths]);

  // CD ladder comparison: five 1-year tranches rolled annually vs one 5-year CD,
  // both at the user's APY. At equal APYs the ending values match — the ladder's
  // advantage is annual liquidity, not extra dollars.
  const ladder = useMemo(() => {
    const safeDeposit = Math.max(0, deposit);
    const perTranche = safeDeposit / 5;
    const ladderTotal = 5 * cdMaturity(perTranche, apyPct, 60).maturityValue;
    const singleTotal = cdMaturity(safeDeposit, apyPct, 60).maturityValue;
    const freedEachYear = cdMaturity(perTranche, apyPct, 12).maturityValue;
    return { perTranche, ladderTotal, singleTotal, freedEachYear };
  }, [deposit, apyPct]);

  const maxInterest = Math.max(...milestones.map((m) => m.interest), 1);

  return (
    <div className="space-y-6">
      {/* ─── Page Title ─────────────────────────────────── */}
      <div className="text-center">
        <h2 className="flex items-center justify-center gap-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          <Landmark className="h-8 w-8 text-amber-600" />
          CD Calculator
        </h2>
        <p className="mt-2 text-muted-foreground">
          Fixed-term, FDIC-insured growth: see exactly what a certificate of deposit pays at maturity
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <Badge className="border-amber-500/30 bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-700">
            <ShieldCheck className="mr-1 h-3 w-3" />
            FDIC-Insured Growth
          </Badge>
          <Badge className="border-emerald-500/30 bg-emerald-600/20 px-3 py-1 text-xs text-emerald-700">
            <Lock className="mr-1 h-3 w-3" />
            Rate Locked for the Term
          </Badge>
        </div>
      </div>

      {/* ─── APY explainer ──────────────────────────────── */}
      <Card className="border-amber-500/20 bg-amber-500/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
            <div className="space-y-1 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">APY Already Includes Compounding</p>
              <p>
                Banks quote CDs in APY — annual percentage yield — which bakes in the effect of
                monthly or daily compounding. That is why this calculator grows your deposit by a
                factor of (1 + APY) per year instead of applying a separate compounding frequency:
                adding one would double-count. A 6-month CD at 4.25% APY grows by 1.0425 to the
                power of 0.5, not by half of 4.25%.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ─── Input + Results Grid ──────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Left: Input Form */}
        <div className="min-w-0 space-y-4 lg:col-span-2">
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calculator className="h-5 w-5 text-amber-600" />
                Your CD
              </CardTitle>
              <CardDescription>Everything updates instantly</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="cd-deposit" className="text-sm font-medium">
                  <span className="flex items-center gap-1.5">
                    <Coins className="h-3.5 w-3.5 text-amber-600" />
                    Deposit Amount
                  </span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="cd-deposit"
                    type="number"
                    min="0"
                    step="500"
                    value={deposit}
                    onChange={(e) => setDeposit(parseFloat(e.target.value) || 0)}
                    className="pl-9"
                    aria-label="Deposit amount"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Stay under the $250,000 FDIC limit per depositor, per bank
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="cd-apy" className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <Percent className="h-3.5 w-3.5 text-amber-600" />
                      APY (%)
                    </span>
                  </Label>
                  <Input
                    id="cd-apy"
                    type="number"
                    min="0"
                    max="15"
                    step="0.05"
                    value={apyPct}
                    onChange={(e) => setApyPct(parseFloat(e.target.value) || 0)}
                    aria-label="Annual percentage yield"
                  />
                  <p className="text-xs text-muted-foreground">Typical 2026 CDs: ~3% to ~5%</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cd-term" className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <Lock className="h-3.5 w-3.5 text-amber-600" />
                      Term Length
                    </span>
                  </Label>
                  <Select value={String(termMonths)} onValueChange={(v) => setTermMonths(Number(v))}>
                    <SelectTrigger id="cd-term" aria-label="CD term length">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TERM_OPTIONS.map((m) => (
                        <SelectItem key={m} value={String(m)}>
                          {TERM_LABELS[m]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Result summary */}
          <Card className="border-amber-500/30 bg-card/80">
            <CardContent className="space-y-3 p-5">
              <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 text-center">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Maturity Value in {termShortLabel(termMonths)}
                </p>
                <p className="mt-1 text-3xl font-bold text-amber-700">
                  {formatCurrency(result.maturityValue)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg border border-border/40 bg-background/60 p-3">
                  <p className="text-xs text-muted-foreground">Total Interest</p>
                  <p className="font-semibold text-foreground">
                    {formatCurrency(result.totalInterest)}
                  </p>
                </div>
                <div className="rounded-lg border border-border/40 bg-background/60 p-3">
                  <p className="text-xs text-muted-foreground">Avg. Interest / Month</p>
                  <p className="font-semibold text-foreground">
                    {formatCurrency(result.averageMonthlyInterest)}
                  </p>
                </div>
              </div>
              <p className="text-center text-xs text-muted-foreground">
                {formatCurrency(deposit)} locked at {apyPct}% APY for {termShortLabel(termMonths)} —
                the rate is fixed even if the Fed cuts
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right: milestone growth bars */}
        <div className="min-w-0 space-y-4 lg:col-span-3">
          <Card className="border-border/50 bg-card/80">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <BarChart3 className="h-5 w-5 text-amber-600" />
                Interest Earned Along the Way
              </CardTitle>
              <CardDescription>
                Interest credited at each checkpoint — compounding makes later checkpoints grow faster
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-xl border border-border/30 bg-card/30 p-4">
                <svg
                  viewBox="0 0 640 300"
                  className="h-auto w-full"
                  style={{ minWidth: '520px' }}
                  role="img"
                  aria-label="Bar chart of CD interest earned at each milestone of the term"
                >
                  {/* Y axis gridlines */}
                  {[0, 0.25, 0.5, 0.75, 1].map((f) => {
                    const y = 240 - f * 180;
                    return (
                      <line
                        key={f}
                        x1={54}
                        y1={y}
                        x2={630}
                        y2={y}
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeDasharray="3,4"
                        className="text-border"
                      />
                    );
                  })}
                  {[1, 0.5].map((f) => (
                    <text
                      key={f}
                      x={48}
                      y={240 - f * 180 + 4}
                      textAnchor="end"
                      className="fill-muted-foreground"
                      style={{ fontSize: '11px' }}
                    >
                      {formatCurrency(maxInterest * f)}
                    </text>
                  ))}
                  {/* Bars */}
                  {milestones.map((m, i) => {
                    const slot = milestones.length;
                    const chartWidth = 640 - 54 - 10;
                    const band = chartWidth / Math.max(slot, 1);
                    const barW = Math.min(64, band * 0.55);
                    const x = 54 + band * i + (band - barW) / 2;
                    const h = Math.max(2, (m.interest / maxInterest) * 180);
                    const y = 240 - h;
                    const isFinal = i === milestones.length - 1;
                    return (
                      <g key={m.month}>
                        <rect
                          x={x}
                          y={y}
                          width={barW}
                          height={h}
                          rx={4}
                          fill={isFinal ? '#b45309' : '#d97706'}
                          opacity={isFinal ? 1 : 0.85}
                        />
                        <text
                          x={x + barW / 2}
                          y={y - 8}
                          textAnchor="middle"
                          className="fill-foreground"
                          style={{ fontSize: '11.5px', fontWeight: '600' }}
                        >
                          {formatCurrency(m.interest)}
                        </text>
                        <text
                          x={x + barW / 2}
                          y={262}
                          textAnchor="middle"
                          className="fill-muted-foreground"
                          style={{ fontSize: '12px' }}
                        >
                          {termShortLabel(m.month)}
                        </text>
                      </g>
                    );
                  })}
                  {/* Baseline */}
                  <line
                    x1={54}
                    y1={240}
                    x2={630}
                    y2={240}
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-border"
                  />
                  <text
                    x={54}
                    y={286}
                    className="fill-muted-foreground"
                    style={{ fontSize: '11px' }}
                  >
                    Deposit stays {formatCurrency(deposit)} — bars show interest layered on top, unmoved by market swings
                  </text>
                </svg>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ─── Reference cards ────────────────────────────── */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border/50 bg-card/80">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Percent className="h-5 w-5 text-amber-600" />
              How CD Rates Work
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            APY is what you actually earn after compounding; APR is the raw rate before it. A 4.15%
            APR compounded monthly equals 4.23% APY — banks quote APY so you can compare CDs
            directly without doing that conversion yourself.
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/80">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              Early-Withdrawal Penalty
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Break a CD early and the bank typically takes 3 to 12 months of interest depending on
            term (typical schedule: 3 months on 1-year CDs, up to 12 months on 5-year CDs). If the
            penalty exceeds interest already credited, it comes out of principal. Terms vary by bank
            — check the disclosure before you lock.
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/80">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <ShieldCheck className="h-5 w-5 text-amber-600" />
              FDIC Insurance
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Bank CDs are FDIC insured up to $250,000 per depositor, per bank, per ownership category
            (credit unions offer the same limit through the NCUA). Held to maturity, there is no
            market risk — the only way to lose principal is withdrawing early.
          </CardContent>
        </Card>
      </div>

      {/* ─── CD ladder strip ────────────────────────────── */}
      <Card className="border-emerald-500/20 bg-emerald-600/5">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Unlock className="h-5 w-5 text-emerald-600" />
            CD Ladder vs. One 5-Year CD
          </CardTitle>
          <CardDescription>
            Same deposit, same APY — five 1-year tranches rolled annually vs. a single 5-year lock
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-border/40 bg-background/60 p-4 text-center">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Ladder (5 x 1-Year)
              </p>
              <p className="mt-1 text-xl font-bold text-foreground">
                {formatCurrency(ladder.ladderTotal)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                5 tranches of {formatCurrency(ladder.perTranche)}, each renewed every 12 months
              </p>
            </div>
            <div className="rounded-xl border border-border/40 bg-background/60 p-4 text-center">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Single 5-Year CD
              </p>
              <p className="mt-1 text-xl font-bold text-foreground">
                {formatCurrency(ladder.singleTotal)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Entire {formatCurrency(deposit)} locked for 60 months
              </p>
            </div>
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-600/10 p-4 text-center">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Cash Freed Every Year
              </p>
              <p className="mt-1 text-xl font-bold text-emerald-700">
                {formatCurrency(ladder.freedEachYear)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                One tranche matures each anniversary — take it or roll it
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            At the same APY the two strategies finish with identical dollars — which is exactly the
            ladder&apos;s pitch: you give up nothing to keep annual access. In practice, longer CDs
            usually pay a higher APY than 1-year CDs, and that extra yield is what the bank pays you
            for surrendering the yearly escape hatch. Prefer maximum flexibility? Ladder. Confident
            rates will fall? Lock the 5-year. For open-ended growth without term limits, see our{' '}
            <a
              href="/compound-interest-calculator"
              className="font-medium text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
            >
              compound interest calculator
            </a>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
