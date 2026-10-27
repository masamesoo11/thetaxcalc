'use client';

import { useMemo, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import {
  Calculator,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  Info,
  Zap,
  Landmark,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/finance-utils';

// ─── Types & helpers ─────────────────────────────────────────────────────────────

interface YearRow {
  year: number;
  value: number;
  contributions: number;
  interest: number;
}

function projectGrowth(
  principal: number,
  monthly: number,
  annualRatePct: number,
  years: number
): YearRow[] {
  const r = annualRatePct / 100 / 12;
  const rows: YearRow[] = [];
  let balance = Math.max(0, principal);
  let contributed = Math.max(0, principal);

  for (let y = 1; y <= Math.min(years, 60); y++) {
    for (let m = 0; m < 12; m++) {
      balance = balance * (1 + r) + monthly;
      contributed += monthly;
    }
    rows.push({
      year: y,
      value: Math.max(0, balance),
      contributions: Math.max(0, contributed),
      interest: Math.max(0, balance - contributed),
    });
  }
  return rows;
}

// ─── Component ───────────────────────────────────────────────────────────────────

export function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState(10000);
  const [monthly, setMonthly] = useState(500);
  const [ratePct, setRatePct] = useState(7);
  const [years, setYears] = useState(30);

  const rows = useMemo(
    () => projectGrowth(principal, monthly, ratePct, years),
    [principal, monthly, ratePct, years]
  );

  const finalRow = rows.length > 0 ? rows[rows.length - 1] : { value: 0, contributions: 0, interest: 0, year: 0 };

  const doublingYears = ratePct > 0 ? 72 / ratePct : 0;

  // Chart data (every year, capped)
  const chartData = useMemo(
    () =>
      rows.map((row) => ({
        year: `Y${row.year}`,
        Total: Math.round(row.value),
        Contributions: Math.round(row.contributions),
      })),
    [rows]
  );

  // Display table rows: show up to 15 milestone rows for long horizons
  const tableRows = useMemo(() => {
    if (rows.length <= 12) return rows;
    const step = Math.ceil(rows.length / 12);
    const picked: YearRow[] = [];
    for (let i = step - 1; i < rows.length; i += step) picked.push(rows[i]);
    if (picked[picked.length - 1]?.year !== rows[rows.length - 1].year) {
      picked.push(rows[rows.length - 1]);
    }
    return picked;
  }, [rows]);

  return (
    <div className="space-y-6">
      {/* ─── Page Title ─────────────────────────────────── */}
      <div className="text-center">
        <h2 className="flex items-center justify-center gap-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          <TrendingUp className="h-8 w-8 text-emerald-600" />
          Compound Interest Calculator
        </h2>
        <p className="mt-2 text-muted-foreground">
          See how a starting balance and steady monthly savings snowball year after year
        </p>
        <div className="mt-3 flex items-center justify-center gap-2">
          <Badge className="bg-emerald-600/20 text-emerald-600 border-emerald-500/30 text-xs font-semibold px-3 py-1">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Monthly Compounding
          </Badge>
          <Badge className="bg-amber-500/20 text-amber-700 border-amber-500/30 text-xs px-3 py-1">
            <Zap className="mr-1 h-3 w-3" />
            Rule of 72 Doubling
          </Badge>
        </div>
      </div>

      {/* ─── How compounding works ───────────────────────── */}
      <Card className="border-emerald-500/20 bg-emerald-600/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
            <div className="space-y-1 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Interest That Earns Interest</p>
              <p>
                Compound growth means each month&apos;s gains are added to your balance — and next
                month you earn on that bigger balance too. The math is exponential: at a 7% average
                return, money doubles roughly every {doublingYears > 0 ? doublingYears.toFixed(1) : '—'}{' '}
                years (72 ÷ 7). Over decades, the interest you earn ends up dwarfing the deposits
                themselves.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ─── Input + Results Grid ──────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Left: Input Form */}
        <div className="space-y-4 lg:col-span-2">
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calculator className="h-5 w-5 text-emerald-600" />
                Your Savings Plan
              </CardTitle>
              <CardDescription>Everything updates instantly</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="ci-principal" className="text-sm font-medium">
                  <span className="flex items-center gap-1.5">
                    <DollarSign className="h-3.5 w-3.5 text-emerald-600" />
                    Starting Balance
                  </span>
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="ci-principal"
                    type="number"
                    min="0"
                    step="500"
                    value={principal}
                    onChange={(e) => setPrincipal(parseFloat(e.target.value) || 0)}
                    className="pl-9"
                    aria-label="Starting balance"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ci-monthly" className="text-sm font-medium">
                  <span className="flex items-center gap-1.5">
                    <Landmark className="h-3.5 w-3.5 text-emerald-600" />
                    Monthly Contribution
                  </span>
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="ci-monthly"
                    type="number"
                    min="0"
                    step="50"
                    value={monthly}
                    onChange={(e) => setMonthly(parseFloat(e.target.value) || 0)}
                    className="pl-9"
                    aria-label="Monthly contribution"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="ci-rate" className="text-sm font-medium">
                    Annual Return %
                  </Label>
                  <Input
                    id="ci-rate"
                    type="number"
                    min="0"
                    max="25"
                    step="0.5"
                    value={ratePct}
                    onChange={(e) => setRatePct(parseFloat(e.target.value) || 0)}
                    aria-label="Annual return percentage"
                  />
                  <p className="text-xs text-muted-foreground">HYSA ~4%, stocks ~7–10% historically</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ci-years" className="text-sm font-medium">
                    Years to Grow
                  </Label>
                  <Input
                    id="ci-years"
                    type="number"
                    min="1"
                    max="60"
                    step="1"
                    value={years}
                    onChange={(e) => setYears(Math.round(parseFloat(e.target.value) || 1))}
                    aria-label="Number of years"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Result summary */}
          <Card className="border-emerald-500/30 bg-card/80">
            <CardContent className="space-y-3 p-5">
              <div className="rounded-xl bg-emerald-600/10 p-4 text-center border border-emerald-500/20">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Future Value in {finalRow.year || years} Years
                </p>
                <p className="mt-1 text-3xl font-bold text-emerald-700">
                  {formatCurrency(finalRow.value)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg border border-border/40 bg-background/60 p-3">
                  <p className="text-xs text-muted-foreground">You Deposit</p>
                  <p className="font-semibold text-foreground">
                    {formatCurrency(finalRow.contributions)}
                  </p>
                </div>
                <div className="rounded-lg border border-border/40 bg-background/60 p-3">
                  <p className="text-xs text-muted-foreground">Interest Earned</p>
                  <p className="font-semibold text-emerald-700">
                    {formatCurrency(finalRow.interest)}
                  </p>
                </div>
              </div>
              {finalRow.contributions > 0 && (
                <p className="text-center text-xs text-muted-foreground">
                  Interest is{' '}
                  <strong className="text-emerald-700">
                    {((finalRow.interest / finalRow.contributions) * 100).toFixed(0)}%
                  </strong>{' '}
                  of everything you put in
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right: Chart */}
        <div className="space-y-4 lg:col-span-3">
          <Card className="border-border/50 bg-card/80">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Growth Over Time</CardTitle>
              <CardDescription>Contributions vs. total balance, compounded monthly</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="ciTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#059669" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#059669" stopOpacity={0.02} />
                      </linearGradient>
                      <linearGradient id="ciContrib" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#d97706" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#d97706" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(120,113,108,0.15)" />
                    <XAxis
                      dataKey="year"
                      tick={{ fontSize: 11 }}
                      interval="preserveStartEnd"
                      stroke="#78716c"
                    />
                    <YAxis
                      tick={{ fontSize: 11 }}
                      stroke="#78716c"
                      tickFormatter={(v: number) => (v >= 1000 ? `$${Math.round(v / 1000)}k` : `$${v}`)}
                    />
                    <Tooltip
                      formatter={(value: number | string) => formatCurrency(Number(value))}
                      labelFormatter={(l) => `End of ${String(l).replace('Y', 'Year ')}`}
                      contentStyle={{
                        borderRadius: '10px',
                        border: '1px solid rgba(120,113,108,0.25)',
                        fontSize: '12px',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="Total"
                      stroke="#059669"
                      strokeWidth={2}
                      fill="url(#ciTotal)"
                      name="Total value"
                    />
                    <Area
                      type="monotone"
                      dataKey="Contributions"
                      stroke="#d97706"
                      strokeWidth={2}
                      fill="url(#ciContrib)"
                      name="You deposited"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ─── Year-by-Year Table ─────────────────────────── */}
      <Card className="border-border/50 bg-card/80">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Year-by-Year Milestones</CardTitle>
          <CardDescription>
            Balance at the end of each period — interest snowballs even when deposits stay flat
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-h-96 overflow-y-auto custom-scrollbar overflow-hidden rounded-lg border border-border/40">
            <table className="w-full text-sm">
              <thead className="sticky top-0">
                <tr className="bg-muted/60 backdrop-blur">
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Year</th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">
                    Total Deposits
                  </th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">
                    Interest Earned
                  </th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">
                    Balance
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row) => (
                  <tr
                    key={row.year}
                    className="border-b border-border/20 transition-colors hover:bg-emerald-600/5"
                  >
                    <td className="px-4 py-2.5 font-semibold text-foreground">{row.year}</td>
                    <td className="px-4 py-2.5 text-right text-muted-foreground">
                      {formatCurrency(row.contributions)}
                    </td>
                    <td className="px-4 py-2.5 text-right font-medium text-emerald-700">
                      +{formatCurrency(row.interest)}
                    </td>
                    <td className="px-4 py-2.5 text-right font-semibold text-foreground">
                      {formatCurrency(row.value)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Want your growth tax-free? See how employer matching supercharges it with our{' '}
            <a href="/401k-calculator" className="font-medium text-emerald-700 underline underline-offset-2 hover:text-emerald-800">
              401(k) calculator
            </a>
            , or find extra money to invest by checking your{' '}
            <a href="/paycheck-calculator" className="font-medium text-emerald-700 underline underline-offset-2 hover:text-emerald-800">
              full take-home pay
            </a>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
