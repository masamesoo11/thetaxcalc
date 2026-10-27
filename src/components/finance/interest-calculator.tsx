'use client';

import { useMemo, useState } from 'react';
import {
  Percent,
  Calculator,
  Info,
  Coins,
  Clock,
  GitCompareArrows,
  LineChart as LineChartIcon,
  Sigma,
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
import {
  INTEREST_MODE_OPTIONS,
  cumulativeInterestByYear,
  type InterestMode,
} from '@/lib/savings-math';

const MODE_LABEL: Record<InterestMode, string> = {
  simple: 'Simple',
  annually: 'Compounded annually',
  quarterly: 'Compounded quarterly',
  monthly: 'Compounded monthly',
  daily: 'Compounded daily',
};

// ─── Component ────────────────────────────────────────────────────────────────

export function InterestCalculator() {
  const [principal, setPrincipal] = useState(10000);
  const [ratePct, setRatePct] = useState(5);
  const [years, setYears] = useState(10);
  const [mode, setMode] = useState<InterestMode>('monthly');

  // Both schedules: simple is always the baseline; the compound side follows
  // the selected compounding mode (or simple itself, for reference).
  const { simpleRows, compoundRows } = useMemo(() => {
    const cappedYears = Math.max(1, Math.min(50, Math.round(years)));
    return {
      simpleRows: cumulativeInterestByYear(principal, ratePct, cappedYears, 'simple'),
      compoundRows: cumulativeInterestByYear(principal, ratePct, cappedYears, mode),
    };
  }, [principal, ratePct, years, mode]);

  const lastSimple = simpleRows[simpleRows.length - 1];
  const lastCompound = compoundRows[compoundRows.length - 1];

  const simpleTotal = lastSimple.balance;
  const simpleInterest = lastSimple.cumulativeInterest;
  const compoundTotal = lastCompound.balance;
  const compoundInterest = lastCompound.cumulativeInterest;
  const advantage = compoundInterest - simpleInterest;

  // ─── Chart geometry ─────────────────────────────────────
  const chartW = 640;
  const chartH = 300;
  const padL = 58;
  const padR = 8;
  const padT = 18;
  const padB = 34;
  const nPoints = simpleRows.length + 1; // includes year 0
  const maxY = Math.max(compoundTotal, simpleTotal, 1);

  const xAt = (i: number) =>
    padL + (i / Math.max(nPoints - 1, 1)) * (chartW - padL - padR - 88);
  const yAt = (v: number) => padT + (1 - v / maxY) * (chartH - padT - padB);

  const pointsFor = (rows: { balance: number }[]) =>
    [principal, ...rows.map((r) => r.balance)].map((b, i) => `${xAt(i)},${yAt(b)}`).join(' ');

  const xTickIdx = [0, Math.floor((nPoints - 1) / 2), nPoints - 1];

  return (
    <div className="space-y-6">
      {/* ─── Page Title ─────────────────────────────────── */}
      <div className="text-center">
        <h2 className="flex items-center justify-center gap-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          <Percent className="h-8 w-8 text-amber-600" />
          Interest Calculator
        </h2>
        <p className="mt-2 text-muted-foreground">
          Simple vs. compound, side by side — watch the same rate pay two very different totals
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <Badge className="border-amber-500/30 bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-700">
            <GitCompareArrows className="mr-1 h-3 w-3" />
            Simple vs Compound
          </Badge>
          <Badge className="border-emerald-500/30 bg-emerald-600/20 px-3 py-1 text-xs text-emerald-700">
            <Sigma className="mr-1 h-3 w-3" />
            Cumulative by Year
          </Badge>
        </div>
      </div>

      {/* ─── Formula explainer ────────────────────────────── */}
      <Card className="border-amber-500/20 bg-amber-500/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
            <div className="space-y-1 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Two Formulas, One Winner Over Time</p>
              <p>
                Simple interest pays the same flat amount every year: I = P x r x t — $10,000 at 5%
                earns $500 a year, every year, forever. Compound interest pays interest on interest:
                A = P(1 + r/n)^(n x t), where n is compounding periods per year. Year one looks
                nearly identical; year ten does not. Pick a mode and watch the gap open below.
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
                Your Money
              </CardTitle>
              <CardDescription>Everything updates instantly</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="int-principal" className="text-sm font-medium">
                  <span className="flex items-center gap-1.5">
                    <Coins className="h-3.5 w-3.5 text-amber-600" />
                    Principal
                  </span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="int-principal"
                    type="number"
                    min="0"
                    step="500"
                    value={principal}
                    onChange={(e) => setPrincipal(parseFloat(e.target.value) || 0)}
                    className="pl-9"
                    aria-label="Principal amount"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="int-rate" className="text-sm font-medium">
                    Annual Rate (%)
                  </Label>
                  <Input
                    id="int-rate"
                    type="number"
                    min="0"
                    max="25"
                    step="0.25"
                    value={ratePct}
                    onChange={(e) => setRatePct(parseFloat(e.target.value) || 0)}
                    aria-label="Annual interest rate percentage"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="int-years" className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-amber-600" />
                      Years
                    </span>
                  </Label>
                  <Input
                    id="int-years"
                    type="number"
                    min="1"
                    max="50"
                    step="1"
                    value={years}
                    onChange={(e) => setYears(Math.max(1, Math.round(parseFloat(e.target.value) || 1)))}
                    aria-label="Number of years"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="int-mode" className="text-sm font-medium">
                  Compounding Method
                </Label>
                <Select value={mode} onValueChange={(v) => setMode(v as InterestMode)}>
                  <SelectTrigger id="int-mode" aria-label="Compounding method">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {INTEREST_MODE_OPTIONS.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  The compound side of every comparison below uses this mode
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Side-by-side comparison cards */}
          <Card className="border-border/50 bg-card/80">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Side by Side After {Math.max(1, Math.min(50, Math.round(years)))} Years</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-border/40 bg-background/60 p-4 text-center">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Simple Interest
                </p>
                <p className="mt-1 text-2xl font-bold text-foreground">
                  {formatCurrency(simpleTotal)}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {formatCurrency(simpleInterest)} interest — flat {formatCurrency(principal > 0 ? (principal * ratePct) / 100 : 0)} per year
                </p>
              </div>
              <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 text-center">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {MODE_LABEL[mode]}
                </p>
                <p className="mt-1 text-2xl font-bold text-amber-700">
                  {formatCurrency(compoundTotal)}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {formatCurrency(compoundInterest)} interest — and accelerating
                </p>
              </div>
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-600/10 p-4 text-center sm:col-span-2">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Compounding Advantage
                </p>
                <p className="mt-1 text-2xl font-bold text-emerald-700">
                  {advantage >= 0 ? '+' : ''}
                  {formatCurrency(advantage)}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {mode === 'simple'
                    ? 'You picked Simple for both sides - choose a compounding method above to compare'
                    : 'Extra interest earned by compounding instead of paying simple'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: comparison line chart */}
        <div className="min-w-0 space-y-4 lg:col-span-3">
          <Card className="border-border/50 bg-card/80">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <LineChartIcon className="h-5 w-5 text-amber-600" />
                Balance Growth Compared
              </CardTitle>
              <CardDescription>
                Straight line = simple; curve = compound — the bend IS interest on interest
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-xl border border-border/30 bg-card/30 p-4">
                <svg
                  viewBox={`0 0 ${chartW} ${chartH}`}
                  className="h-auto w-full"
                  style={{ minWidth: '520px' }}
                  role="img"
                  aria-label="Line chart comparing simple versus compound interest balance growth by year"
                >
                  {/* Gridlines + y labels */}
                  {[0, 0.5, 1].map((f) => (
                    <g key={f}>
                      <line
                        x1={padL}
                        y1={yAt(maxY * f)}
                        x2={chartW - padR - 88}
                        y2={yAt(maxY * f)}
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeDasharray="3,4"
                        className="text-border"
                      />
                      <text
                        x={padL - 6}
                        y={yAt(maxY * f) + 4}
                        textAnchor="end"
                        className="fill-muted-foreground"
                        style={{ fontSize: '11px' }}
                      >
                        {formatCurrency(maxY * f)}
                      </text>
                    </g>
                  ))}
                  {/* X ticks */}
                  {xTickIdx.map((i) => (
                    <text
                      key={i}
                      x={xAt(i)}
                      y={chartH - 12}
                      textAnchor="middle"
                      className="fill-muted-foreground"
                      style={{ fontSize: '11px' }}
                    >
                      {i === 0 ? 'Now' : `Yr ${i}`}
                    </text>
                  ))}
                  {/* Compound line */}
                  <polyline
                    points={pointsFor(compoundRows)}
                    fill="none"
                    stroke="#d97706"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Simple line */}
                  <polyline
                    points={pointsFor(simpleRows)}
                    fill="none"
                    stroke="#78716c"
                    strokeWidth="2.5"
                    strokeDasharray="6,4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* End dots + labels */}
                  <circle
                    cx={xAt(nPoints - 1)}
                    cy={yAt(compoundTotal)}
                    r="4"
                    fill="#d97706"
                  />
                  <circle
                    cx={xAt(nPoints - 1)}
                    cy={yAt(simpleTotal)}
                    r="4"
                    fill="#78716c"
                  />
                  <text
                    x={xAt(nPoints - 1) - 4}
                    y={yAt(compoundTotal) - 8}
                    textAnchor="end"
                    style={{ fontSize: '12px', fontWeight: '700' }}
                    className="fill-amber-600"
                  >
                    {formatCurrency(compoundTotal)}
                  </text>
                  <text
                    x={xAt(nPoints - 1) - 4}
                    y={Math.min(yAt(simpleTotal) + 16, chartH - padB + 20)}
                    textAnchor="end"
                    style={{ fontSize: '12px', fontWeight: '600' }}
                    className="fill-stone-500"
                  >
                    {formatCurrency(simpleTotal)}
                  </text>
                  {/* Legend */}
                  <g transform={`translate(${padL}, ${padT - 4})`}>
                    <line x1="0" y1="-5" x2="26" y2="-5" stroke="#d97706" strokeWidth="2.5" />
                    <text x="32" y="-1" className="fill-muted-foreground" style={{ fontSize: '11px' }}>
                      {MODE_LABEL[mode]}
                    </text>
                    <line x1="150" y1="-5" x2="176" y2="-5" stroke="#78716c" strokeWidth="2.5" strokeDasharray="6,4" />
                    <text x="182" y="-1" className="fill-muted-foreground" style={{ fontSize: '11px' }}>
                      Simple
                    </text>
                  </g>
                </svg>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ─── Cumulative interest table ──────────────────── */}
      <Card className="border-border/50 bg-card/80">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Sigma className="h-5 w-5 text-amber-600" />
            Cumulative Interest by Year
          </CardTitle>
          <CardDescription>
            Total interest from day one through each year-end — and the gap the two methods open
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-h-96 overflow-y-auto custom-scrollbar overflow-hidden rounded-lg border border-border/40">
            <table className="w-full text-sm">
              <thead className="sticky top-0">
                <tr className="bg-muted/60 backdrop-blur">
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Year</th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">
                    Simple Cumulative
                  </th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">
                    {MODE_LABEL[mode]} Cumulative
                  </th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">Gap</th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">
                    Compound Balance
                  </th>
                </tr>
              </thead>
              <tbody>
                {simpleRows.map((s, i) => {
                  const c = compoundRows[i];
                  const gap = c.cumulativeInterest - s.cumulativeInterest;
                  return (
                    <tr
                      key={s.year}
                      className="border-b border-border/20 transition-colors hover:bg-amber-500/5"
                    >
                      <td className="px-4 py-2.5 font-semibold text-foreground">{s.year}</td>
                      <td className="px-4 py-2.5 text-right text-muted-foreground">
                        {formatCurrency(s.cumulativeInterest)}
                      </td>
                      <td className="px-4 py-2.5 text-right font-medium text-amber-700">
                        {formatCurrency(c.cumulativeInterest)}
                      </td>
                      <td className="px-4 py-2.5 text-right font-medium text-emerald-700">
                        +{formatCurrency(gap)}
                      </td>
                      <td className="px-4 py-2.5 text-right font-semibold text-foreground">
                        {formatCurrency(c.balance)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Notice the pattern: the gap starts near zero and widens every single year — compounding
            pays interest on the gap itself. Want to add monthly deposits to the picture, or see
            doubling times with the Rule of 72? Try our{' '}
            <a
              href="/compound-interest-calculator"
              className="font-medium text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
            >
              compound interest calculator
            </a>
            . Parking the money in a fixed-term CD instead? See our{' '}
            <a
              href="/cd-calculator"
              className="font-medium text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
            >
              CD calculator
            </a>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
