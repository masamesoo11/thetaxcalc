'use client';

import { useMemo, useState } from 'react';
import {
  TrendingUp,
  Calculator,
  Info,
  DollarSign,
  PiggyBank,
  Percent,
  Clock,
  ScissorsLineDashed,
  Scale,
  Landmark,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { formatCurrency } from '@/lib/finance-utils';
import { feeDrag, inflationAdjust } from '@/lib/savings-math';

// ─── Component ────────────────────────────────────────────────────────────────

export function InvestmentCalculator() {
  const [initial, setInitial] = useState(10000);
  const [monthly, setMonthly] = useState(500);
  const [returnPct, setReturnPct] = useState(7);
  const [years, setYears] = useState(20);
  const [inflationPct, setInflationPct] = useState(3);
  const [feePct, setFeePct] = useState(0.05);

  // Main projection at the user's fee (net return = gross - fee).
  const plan = useMemo(
    () => feeDrag(initial, monthly, returnPct, feePct, years),
    [initial, monthly, returnPct, feePct, years]
  );

  // Today's-dollars value of the nominal balance.
  const realBalance = useMemo(
    () => inflationAdjust(plan.balanceWithFee, inflationPct, years),
    [plan.balanceWithFee, inflationPct, years]
  );

  // Fee comparison (the differentiator): typical index-fund fee vs typical
  // active-fund fee, using the user's other inputs.
  const feeCompare = useMemo(() => {
    const atIndexFee = feeDrag(initial, monthly, returnPct, 0.05, years).balanceWithFee;
    const atActiveFee = feeDrag(initial, monthly, returnPct, 1, years).balanceWithFee;
    return { atIndexFee, atActiveFee, lifetimeCost: atIndexFee - atActiveFee };
  }, [initial, monthly, returnPct, years]);

  const invested = plan.totalContributed;
  const growth = Math.max(0, plan.balanceWithFee - invested);
  const nominal = plan.balanceWithFee;
  const totalBase = Math.max(invested + growth, 1);
  const investedPct = Math.round((invested / totalBase) * 100);

  // Donut geometry
  const R = 70;
  const C = 2 * Math.PI * R;
  const growthArc = (growth / totalBase) * C;

  return (
    <div className="space-y-6">
      {/* ─── Page Title ─────────────────────────────────── */}
      <div className="text-center">
        <h2 className="flex items-center justify-center gap-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          <TrendingUp className="h-8 w-8 text-amber-600" />
          Investment Calculator
        </h2>
        <p className="mt-2 text-muted-foreground">
          Project your portfolio — then subtract what fees and inflation quietly take off the top
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <Badge className="border-amber-500/30 bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-700">
            <ScissorsLineDashed className="mr-1 h-3 w-3" />
            Fee Drag Included
          </Badge>
          <Badge className="border-emerald-500/30 bg-emerald-600/20 px-3 py-1 text-xs text-emerald-700">
            <Scale className="mr-1 h-3 w-3" />
            Shown in Today&apos;s Dollars
          </Badge>
        </div>
      </div>

      {/* ─── Framing explainer ───────────────────────────── */}
      <Card className="border-amber-500/20 bg-amber-500/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
            <div className="space-y-1 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">A Projection You Can Actually Spend</p>
              <p>
                Most investment calculators stop at the nominal number. This one keeps going: your
                expected return is first reduced by the expense ratio you pay (a 0.05% index fund
                and a 1% active fund are different products), and the final balance is then restated
                in today&apos;s purchasing power so a 2036 dollar stops masquerading as a 2026
                dollar. Taxes are the one drag left out on purpose — see the note below.
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
                Your Plan
              </CardTitle>
              <CardDescription>Everything updates instantly</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="inv-initial" className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <DollarSign className="h-3.5 w-3.5 text-amber-600" />
                      Initial Investment
                    </span>
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="inv-initial"
                      type="number"
                      min="0"
                      step="1000"
                      value={initial}
                      onChange={(e) => setInitial(parseFloat(e.target.value) || 0)}
                      className="pl-9"
                      aria-label="Initial investment"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inv-monthly" className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <PiggyBank className="h-3.5 w-3.5 text-amber-600" />
                      Monthly Contribution
                    </span>
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="inv-monthly"
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
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="inv-return" className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <Percent className="h-3.5 w-3.5 text-amber-600" />
                      Expected Return (%)
                    </span>
                  </Label>
                  <Input
                    id="inv-return"
                    type="number"
                    min="0"
                    max="25"
                    step="0.5"
                    value={returnPct}
                    onChange={(e) => setReturnPct(parseFloat(e.target.value) || 0)}
                    aria-label="Expected annual return percentage"
                  />
                  <p className="text-xs text-muted-foreground">S&amp;P 500 long run: ~10% nominal (historical)</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inv-years" className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-amber-600" />
                      Years
                    </span>
                  </Label>
                  <Input
                    id="inv-years"
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
                <Label htmlFor="inv-inflation" className="text-sm font-medium">
                  Inflation (%)
                </Label>
                <Input
                  id="inv-inflation"
                  type="number"
                  min="0"
                  max="15"
                  step="0.1"
                  value={inflationPct}
                  onChange={(e) => setInflationPct(parseFloat(e.target.value) || 0)}
                  aria-label="Expected annual inflation percentage"
                />
                <p className="text-xs text-muted-foreground">Long-run U.S. average: ~3% (historical)</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <ScissorsLineDashed className="h-3.5 w-3.5 text-rose-600" />
                      Expense Ratio / Fee (%)
                    </span>
                  </Label>
                  <Badge variant="secondary" className="bg-amber-600/10 text-amber-700">
                    {feePct.toFixed(2)}%
                  </Badge>
                </div>
                <Slider
                  value={[feePct]}
                  onValueChange={(v) => setFeePct(v[0])}
                  min={0}
                  max={2}
                  step={0.05}
                  className="py-2"
                  aria-label="Annual fee percentage"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0%</span>
                  <span>0.5%</span>
                  <span>1%</span>
                  <span>1.5%</span>
                  <span>2%</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Index funds typically ~0.03% to 0.20%; active funds often ~0.5% to 1%+ (typical).
                  Your money earns {returnPct}% - {feePct.toFixed(2)}% ={' '}
                  <strong className="text-foreground">{plan.netReturnPct.toFixed(2)}%</strong> net.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Results */}
        <div className="min-w-0 space-y-4 lg:col-span-3">
          <Card className="border-border/50 bg-card/80">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Where You Land in {years} Years</CardTitle>
              <CardDescription>
                Nominal dollars vs. what they buy at {inflationPct}% inflation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 text-center">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Nominal Balance
                  </p>
                  <p className="mt-1 text-2xl font-bold text-amber-700 sm:text-3xl">
                    {formatCurrency(nominal)}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Net {plan.netReturnPct.toFixed(2)}% after fees
                  </p>
                </div>
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-600/10 p-4 text-center">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    In Today&apos;s Dollars
                  </p>
                  <p className="mt-1 text-2xl font-bold text-emerald-700 sm:text-3xl">
                    {formatCurrency(realBalance)}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Nominal divided by (1 + {inflationPct}%)^{years}
                  </p>
                </div>
              </div>

              {/* Donut: invested vs growth */}
              <div className="flex flex-col items-center gap-4 rounded-xl border border-border/30 bg-card/30 p-4 sm:flex-row">
                <svg
                  viewBox="0 0 180 180"
                  className="h-40 w-40 shrink-0"
                  role="img"
                  aria-label="Donut chart splitting the final balance into money you invested versus investment growth"
                >
                  <circle
                    cx="90"
                    cy="90"
                    r={R}
                    fill="none"
                    stroke="#78716c"
                    strokeWidth="22"
                    opacity="0.55"
                  />
                  <circle
                    cx="90"
                    cy="90"
                    r={R}
                    fill="none"
                    stroke="#d97706"
                    strokeWidth="22"
                    strokeDasharray={`${growthArc} ${C}`}
                    transform="rotate(-90 90 90)"
                  />
                  <text
                    x="90"
                    y="86"
                    textAnchor="middle"
                    className="fill-foreground"
                    style={{ fontSize: '15px', fontWeight: '700' }}
                  >
                    {investedPct}% in
                  </text>
                  <text
                    x="90"
                    y="104"
                    textAnchor="middle"
                    className="fill-muted-foreground"
                    style={{ fontSize: '11px' }}
                  >
                    was deposited by you
                  </text>
                </svg>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-sm bg-stone-500" aria-hidden="true" />
                    <span className="text-muted-foreground">Total invested:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(invested)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-sm bg-amber-600" aria-hidden="true" />
                    <span className="text-muted-foreground">Growth (after fees):</span>
                    <span className="font-semibold text-amber-700">{formatCurrency(growth)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Growth is {invested > 0 ? Math.round((growth / invested) * 100) : 0}% of everything
                    you put in — compounding did the rest.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ─── Fee drag section (the differentiator) ─────────── */}
      <Card className="border-rose-500/20 bg-rose-500/5">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <ScissorsLineDashed className="h-5 w-5 text-rose-600" />
            The Fee Experiment: 0.05% vs. 1%
          </CardTitle>
          <CardDescription>
            Same deposits, same return, same years — the only difference is the expense ratio
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-border/40 bg-background/60 p-4 text-center">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                At 0.05% (Typical Index)
              </p>
              <p className="mt-1 text-xl font-bold text-foreground">
                {formatCurrency(feeCompare.atIndexFee)}
              </p>
            </div>
            <div className="rounded-xl border border-border/40 bg-background/60 p-4 text-center">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                At 1% (Typical Active)
              </p>
              <p className="mt-1 text-xl font-bold text-foreground">
                {formatCurrency(feeCompare.atActiveFee)}
              </p>
            </div>
            <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-center">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Lifetime Difference
              </p>
              <p className="mt-1 text-xl font-bold text-rose-600">
                {formatCurrency(feeCompare.lifetimeCost)}
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Fees compound against you exactly the way returns compound for you: every dollar skimmed
            in year one never grows again. Your current {feePct.toFixed(2)}% fee costs{' '}
            <strong className="text-rose-600">{formatCurrency(plan.feeCost)}</strong> versus the same
            plan fee-free over {years} years. If that stings, it should — the fix is usually as
            simple as switching to a lower-cost share class.
          </p>
        </CardContent>
      </Card>

      {/* ─── Tax note strip ─────────────────────────────── */}
      <Card className="border-border/50 bg-card/80">
        <CardContent className="flex flex-col items-start gap-3 p-5 sm:flex-row sm:items-center">
          <Landmark className="h-6 w-6 shrink-0 text-amber-600" />
          <div className="flex-1">
            <p className="font-medium text-foreground">Taxes are the third drag — and we have a tool for that</p>
            <p className="text-sm text-muted-foreground">
              This projection is pre-tax on the growth side. In a taxable brokerage account,
              long-term capital gains run 0%, 15%, or 20% federally (plus a 3.8% NIIT at higher
              incomes), which is another few percentage points off the final number.
            </p>
          </div>
          <a
            href="/capital-gains-calculator"
            className="shrink-0 rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-amber-700"
          >
            Open Capital Gains Calculator
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
