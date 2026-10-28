'use client';

import { useMemo, useState } from 'react';
import {
  Calculator,
  Clock,
  DollarSign,
  History,
  Info,
  LineChart,
  Percent,
  TrendingUp,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  CPI_ANNUAL,
  CPI_MAX_YEAR,
  CPI_MIN_YEAR,
  inflateBetween,
  inflationCurve,
  projectForward,
} from '@/lib/payoff-math';
import { formatCurrency } from '@/lib/finance-utils';

// ─── Constants ───────────────────────────────────────────────────────────────

const YEARS: number[] = Array.from({ length: CPI_MAX_YEAR - CPI_MIN_YEAR + 1 }, (_, i) => CPI_MIN_YEAR + i);
const YEAR_OPTIONS = YEARS.slice().reverse(); // newest first in the picker

const LONG_RUN_AVG_HINT = '3.2%';

// ─── Component ───────────────────────────────────────────────────────────────

export function InflationCalculator() {
  // ─── State ────────────────────────────────────────────────────────────
  const [mode, setMode] = useState<'then' | 'future'>('then');
  const [amount, setAmount] = useState(100);
  const [startYear, setStartYear] = useState(2000);
  const [endYear, setEndYear] = useState(2025);
  const [rate, setRate] = useState(3);
  const [years, setYears] = useState(10);

  const safe = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);

  // ─── Live math ─────────────────────────────────────────────────────────
  const historical = useMemo(() => {
    const a = startYear <= endYear ? inflateBetween(safe(amount), startYear, endYear) : null;
    if (!a) return null;
    return { ...a, curve: inflationCurve(safe(amount), startYear, endYear) };
  }, [amount, startYear, endYear]);

  const projection = useMemo(
    () => projectForward(safe(amount) || 0, Number.isFinite(rate) ? rate : 0, Number.isFinite(years) ? Math.min(Math.max(years, 0), 50) : 0),
    [amount, rate, years],
  );

  const chart = mode === 'then' ? historical?.curve : projection.curve;
  const chartMax = chart?.length ? Math.max(...chart.map((p) => p.value)) : 1;

  const polyPoints = (pts: { value: number }[]) =>
    pts.map((p, i) => `${(i / Math.max(pts.length - 1, 1)) * 100},${100 - (p.value / chartMax) * 100}`).join(' ');

  return (
    <div className="space-y-6">
      {/* ─── Page Title ─────────────────────────────────── */}
      <div className="text-center">
        <h2 className="flex items-center justify-center gap-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          <TrendingUp className="h-8 w-8 text-emerald-600" />
          Inflation Calculator
        </h2>
        <p className="mt-2 text-muted-foreground">
          What did $1 really cost back then? Adjust any amount for US inflation using official BLS
          CPI-U data from 1913 to 2025 — or project today&apos;s money forward. Everything updates
          instantly.
        </p>
      </div>

      {/* ─── Mode toggle ────────────────────────────────── */}
      <div className="flex flex-wrap justify-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setMode('then')}
          aria-pressed={mode === 'then'}
          className={
            mode === 'then'
              ? 'border-emerald-500/60 bg-emerald-500/15 font-semibold text-emerald-700 hover:bg-emerald-500/25 dark:text-emerald-400'
              : 'text-muted-foreground'
          }
        >
          <History className="mr-1.5 h-4 w-4" />
          Then vs Now (1913&ndash;2025 CPI)
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setMode('future')}
          aria-pressed={mode === 'future'}
          className={
            mode === 'future'
              ? 'border-emerald-500/60 bg-emerald-500/15 font-semibold text-emerald-700 hover:bg-emerald-500/25 dark:text-emerald-400'
              : 'text-muted-foreground'
          }
        >
          <Clock className="mr-1.5 h-4 w-4" />
          Future Projection
        </Button>
      </div>

      {/* ─── Input + Results Grid ──────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Left: form */}
        <div className="min-w-0 space-y-4 lg:col-span-2">
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calculator className="h-5 w-5 text-emerald-600" />
                {mode === 'then' ? 'Then vs Now' : 'Project Forward'}
              </CardTitle>
              <CardDescription>
                {mode === 'then'
                  ? 'Official CPI-U annual averages from the BLS'
                  : 'Assume a fixed annual inflation rate'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Amount */}
              <div className="space-y-2">
                <Label htmlFor="inf-amount" className="text-sm font-medium">
                  <span className="flex items-center gap-1.5">
                    <DollarSign className="h-3.5 w-3.5 text-emerald-600" />
                    Amount
                  </span>
                </Label>
                <div className="relative max-w-xs">
                  <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="inf-amount"
                    type="number"
                    min="0"
                    step="10"
                    value={amount || ''}
                    onChange={(e) => setAmount(Number(e.target.value) || 0)}
                    className="pl-9"
                    placeholder="100"
                    aria-label="Amount to adjust"
                  />
                </div>
              </div>

              {mode === 'then' ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 min-w-0">
                    <Label htmlFor="inf-start" className="text-sm font-medium">
                      <span className="flex items-center gap-1.5">
                        <History className="h-3.5 w-3.5 text-emerald-600" />
                        From Year
                      </span>
                    </Label>
                    <select
                      id="inf-start"
                      value={startYear}
                      onChange={(e) => setStartYear(Number(e.target.value))}
                      className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
                      aria-label="Start year"
                    >
                      {YEAR_OPTIONS.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2 min-w-0">
                    <Label htmlFor="inf-end" className="text-sm font-medium">
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-emerald-600" />
                        To Year
                      </span>
                    </Label>
                    <select
                      id="inf-end"
                      value={endYear}
                      onChange={(e) => setEndYear(Number(e.target.value))}
                      className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
                      aria-label="End year"
                    >
                      {YEAR_OPTIONS.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="inf-rate" className="text-sm font-medium">
                      <span className="flex items-center gap-1.5">
                        <Percent className="h-3.5 w-3.5 text-emerald-600" />
                        Assumed Annual Inflation Rate (%)
                      </span>
                    </Label>
                    <div className="relative max-w-xs">
                      <Percent className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="inf-rate"
                        type="number"
                        min="0"
                        max="25"
                        step="0.1"
                        value={rate || ''}
                        onChange={(e) => setRate(Number(e.target.value) || 0)}
                        className="pl-9"
                        placeholder="3"
                        aria-label="Assumed annual inflation rate percent"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      The Fed targets 2%; the long-run US average is roughly 3.2%.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="inf-years" className="text-sm font-medium">
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-emerald-600" />
                        Years From Now
                      </span>
                    </Label>
                    <Input
                      id="inf-years"
                      type="number"
                      min="0"
                      max="50"
                      step="1"
                      value={years || ''}
                      onChange={(e) => setYears(Number(e.target.value) || 0)}
                      className="max-w-xs"
                      placeholder="10"
                      aria-label="Years from now"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/80">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">CPI-U Reference Points</CardTitle>
              <CardDescription>What $100 becomes, at official CPI-U values</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-lg border border-border/40">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/60 backdrop-blur">
                        <th scope="col" className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                          Period
                        </th>
                        <th scope="col" className="px-4 py-2.5 text-right font-medium text-muted-foreground">
                          $100 Equals
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border/20 hover:bg-emerald-500/5">
                        <td className="px-4 py-2.5 font-semibold text-foreground">1980 &rarr; 2025</td>
                        <td className="px-4 py-2.5 text-right text-emerald-700 dark:text-emerald-400">$390.78</td>
                      </tr>
                      <tr className="border-b border-border/20 hover:bg-emerald-500/5">
                        <td className="px-4 py-2.5 font-semibold text-foreground">2000 &rarr; 2025</td>
                        <td className="px-4 py-2.5 text-right text-emerald-700 dark:text-emerald-400">$186.99</td>
                      </tr>
                      <tr className="border-b border-border/20 hover:bg-emerald-500/5">
                        <td className="px-4 py-2.5 font-semibold text-foreground">2010 &rarr; 2025</td>
                        <td className="px-4 py-2.5 text-right text-emerald-700 dark:text-emerald-400">$147.67</td>
                      </tr>
                      <tr className="hover:bg-emerald-500/5">
                        <td className="px-4 py-2.5 font-semibold text-foreground">1920 &rarr; 1935</td>
                        <td className="px-4 py-2.5 text-right text-muted-foreground">$68.50 (deflation)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: results */}
        <div className="min-w-0 space-y-4 lg:col-span-3">
          {mode === 'then' ? (
            historical ? (
              <Card className="border-emerald-500/30 bg-card/80">
                <CardContent className="space-y-3 p-5">
                  <div className="rounded-xl bg-emerald-500/10 p-4 text-center border border-emerald-500/20">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {formatCurrency(safe(amount))} in {startYear} equals
                    </p>
                    <p className="mt-1 text-4xl font-bold text-emerald-700 dark:text-emerald-400">
                      {formatCurrency(historical.adjustedValue)}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">in {endYear} dollars</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-lg border border-border/40 bg-background/60 p-3 min-w-0">
                      <p className="text-xs text-muted-foreground">Cumulative Inflation</p>
                      <p className="font-semibold text-foreground">
                        +{historical.cumulativePct.toFixed(2)}%
                      </p>
                    </div>
                    <div className="rounded-lg border border-border/40 bg-background/60 p-3 min-w-0">
                      <p className="text-xs text-muted-foreground">Average Annual Rate</p>
                      <p className="font-semibold text-foreground">
                        {historical.avgAnnualPct.toFixed(2)}% / yr
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-amber-500/30 bg-card/80">
                <CardContent className="p-5 text-sm text-muted-foreground">
                  Pick a start year earlier than the end year — the CPI table runs from{' '}
                  {CPI_MIN_YEAR} to {CPI_MAX_YEAR}.
                </CardContent>
              </Card>
            )
          ) : (
            <Card className="border-emerald-500/30 bg-card/80">
              <CardContent className="space-y-3 p-5">
                <div className="rounded-xl bg-emerald-500/10 p-4 text-center border border-emerald-500/20">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Today&apos;s {formatCurrency(safe(amount))} basket costs
                  </p>
                  <p className="mt-1 text-4xl font-bold text-emerald-700 dark:text-emerald-400">
                    {formatCurrency(projection.futureCost)}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    in {years} {years === 1 ? 'year' : 'years'} at {rate}% inflation
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg border border-border/40 bg-background/60 p-3 min-w-0">
                    <p className="text-xs text-muted-foreground">Purchasing Power of $1</p>
                    <p className="font-semibold text-foreground">
                      {formatCurrency(projection.purchasingPower)}
                    </p>
                  </div>
                  <div className="rounded-lg border border-border/40 bg-background/60 p-3 min-w-0">
                    <p className="text-xs text-muted-foreground">Value Lost</p>
                    <p className="font-semibold text-rose-600 dark:text-rose-400">
                      {projection.lossPct.toFixed(2)}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Curve chart */}
          {chart && chart.length > 1 && (
            <Card className="border-border/50 bg-card/80">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <LineChart className="h-4 w-4 text-emerald-600" />
                  {mode === 'then' ? 'Value Curve Over the Years' : 'Projected Cost Curve'}
                </CardTitle>
                <CardDescription>
                  {mode === 'then'
                    ? `${startYear} → ${endYear}, official CPI-U path`
                    : `Compounding at ${rate}% per year`}
                </CardDescription>
              </CardHeader>
              <CardContent className="min-w-0">
                <div className="min-w-0 overflow-hidden rounded-lg border border-border/40 bg-background/60 p-3">
                  <svg
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className="h-48 w-full"
                    role="img"
                    aria-label="Chart showing the value rising over the selected period"
                  >
                    <polyline
                      fill="none"
                      stroke="#059669"
                      strokeWidth="2"
                      vectorEffect="non-scaling-stroke"
                      points={polyPoints(chart)}
                    />
                  </svg>
                  <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                    <span>
                      {mode === 'then' ? startYear : 'Today'}: {formatCurrency(chart[0]?.value ?? 0)}
                    </span>
                    <span>
                      {mode === 'then' ? endYear : `+${years} yr`}:{' '}
                      {formatCurrency(chart[chart.length - 1]?.value ?? 0)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Context */}
          <Card className="border-amber-500/20 bg-amber-500/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">Why inflation matters to your paycheck</p>
                  <p>
                    A 3% raise that matches 3% inflation leaves your purchasing power flat — that&apos;s
                    why &ldquo;cost of living&rdquo; adjustments exist. Since 2000, US prices have
                    risen about 87%, which is why $100 in 2000-feel dollars needs $186.99 today. To
                    see raises in real terms, pair this with your{' '}
                    <a href="/paycheck-calculator" className="font-medium text-amber-700 underline underline-offset-2 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300">
                      take-home pay calculator
                    </a>
                    , and for how your money can fight back, the{' '}
                    <a href="/compound-interest-calculator" className="font-medium text-amber-700 underline underline-offset-2 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300">
                      compound interest calculator
                    </a>
                    .
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
                  <p className="font-medium text-foreground">About the data</p>
                  <p>
                    Historical mode uses the U.S. Bureau of Labor Statistics CPI-U annual averages
                    ({CPI_MIN_YEAR}&ndash;{CPI_MAX_YEAR}, all items) — the same series used to
                    index tax brackets, which shift every year; see our{' '}
                    <a href="/federal-tax-brackets" className="font-medium text-emerald-700 underline underline-offset-2 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300">
                      federal tax brackets
                    </a>
                    {' '}page. The long-run average since 1913 runs near {LONG_RUN_AVG_HINT}/yr,
                    but decades vary wildly — prices fell in the 1930s and roughly tripled in the
                    1970s. Future mode is a simple fixed-rate projection, not a forecast.
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
