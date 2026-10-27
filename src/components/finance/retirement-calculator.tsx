'use client';

import { useMemo, useState } from 'react';
import {
  Target,
  CalendarClock,
  Percent,
  PiggyBank,
  TrendingUp,
  Info,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/finance-utils';
import {
  futureValueWithMonthlyContributions,
  inflationAdjust,
  fourRuleIncome,
  requiredContribution,
} from '@/lib/retirement-math';

// ─── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_CURRENT_AGE = 35;
const DEFAULT_RETIREMENT_AGE = 67;
const DEFAULT_SAVINGS = 25000;
const DEFAULT_MONTHLY = 500;
const DEFAULT_RETURN = 7;
const DEFAULT_INFLATION = 3;
const DEFAULT_DESIRED_INCOME = 60000;

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Compact dollar label for chart points: $948K / $1.21M. */
function compactDollars(value: number): string {
  const v = Math.max(0, value);
  if (v >= 1000000) {
    const m = v / 1000000;
    return `$${m >= 10 ? m.toFixed(0) : m.toFixed(2).replace(/\.?0+$/, '')}M`;
  }
  if (v >= 1000) return `$${Math.round(v / 1000)}K`;
  return `$${Math.round(v)}`;
}

/** Round a max value up to a "nice" chart ceiling (1/2/2.5/5 x power of ten). */
function niceCeil(value: number): number {
  if (value <= 0) return 1;
  const magnitude = Math.pow(10, Math.floor(Math.log10(value)));
  for (const mult of [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10]) {
    if (mult * magnitude >= value) return mult * magnitude;
  }
  return 10 * magnitude;
}

interface YearPoint {
  year: number;
  age: number;
  nominal: number;
  real: number;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState(DEFAULT_CURRENT_AGE);
  const [retirementAge, setRetirementAge] = useState(DEFAULT_RETIREMENT_AGE);
  const [savings, setSavings] = useState(DEFAULT_SAVINGS);
  const [monthly, setMonthly] = useState(DEFAULT_MONTHLY);
  const [returnPct, setReturnPct] = useState(DEFAULT_RETURN);
  const [inflationPct, setInflationPct] = useState(DEFAULT_INFLATION);
  const [desiredIncome, setDesiredIncome] = useState(DEFAULT_DESIRED_INCOME);

  const plan = useMemo(() => {
    const age = Math.min(85, Math.max(18, Number.isFinite(currentAge) ? currentAge : 18));
    const retire = Math.min(95, Math.max(age + 1, Number.isFinite(retirementAge) ? retirementAge : age + 1));
    const years = Math.max(0, retire - age);
    const principal = Math.max(0, Number.isFinite(savings) ? savings : 0);
    const contribution = Math.max(0, Number.isFinite(monthly) ? monthly : 0);
    const rate = Math.min(20, Math.max(0, Number.isFinite(returnPct) ? returnPct : 0));
    const inflation = Math.min(15, Math.max(0, Number.isFinite(inflationPct) ? inflationPct : 0));
    const goal = Math.max(0, Number.isFinite(desiredIncome) ? desiredIncome : 0);

    const nominal = futureValueWithMonthlyContributions(principal, contribution, rate, years);
    const real = inflationAdjust(nominal, inflation, years);
    const sustainableIncome = fourRuleIncome(real);
    const annualGap = sustainableIncome - goal;
    const coveragePct = goal > 0 ? (sustainableIncome / goal) * 100 : 100;
    const targetNestEgg = 25 * goal;
    const neededMonthly = goal > 0 ? requiredContribution(targetNestEgg, principal, rate, years) : 0;
    const totalDeposits = principal + contribution * years * 12;
    const totalGrowth = Math.max(0, nominal - totalDeposits);

    const points: YearPoint[] = [];
    for (let y = 0; y <= years; y++) {
      const nominalAt = futureValueWithMonthlyContributions(principal, contribution, rate, y);
      points.push({
        year: y,
        age: age + y,
        nominal: nominalAt,
        real: inflationAdjust(nominalAt, inflation, y),
      });
    }

    return {
      age,
      retire,
      years,
      nominal,
      real,
      sustainableIncome,
      annualGap,
      coveragePct,
      targetNestEgg,
      neededMonthly,
      totalDeposits,
      totalGrowth,
      points,
    };
  }, [currentAge, retirementAge, savings, monthly, returnPct, inflationPct, desiredIncome]);

  // ── SVG chart geometry ──
  const chart = useMemo(() => {
    const { points, years, nominal } = plan;
    const W = 820;
    const H = 400;
    const padL = 66;
    const padR = 18;
    const padT = 34;
    const padB = 48;
    const plotW = W - padL - padR;
    const plotH = H - padT - padB;
    const maxV = niceCeil(Math.max(nominal, 1));
    const x = (y: number) => (years <= 0 ? padL : padL + (y / years) * plotW);
    const yv = (v: number) => padT + plotH - (Math.max(0, v) / maxV) * plotH;

    const nominalPath = points.map((p) => `${x(p.year).toFixed(1)},${yv(p.nominal).toFixed(1)}`).join(' ');
    const realPath = points.map((p) => `${x(p.year).toFixed(1)},${yv(p.real).toFixed(1)}`).join(' ');
    const areaPoints = `${padL},${padT + plotH} ${nominalPath} ${padL + plotW},${padT + plotH}`;

    // Decade markers (ages divisible by 10) plus the retirement endpoint.
    const markerYears = new Set<number>();
    for (let y = 1; y < years; y++) {
      if ((plan.age + y) % 10 === 0) markerYears.add(y);
    }
    markerYears.add(years);
    const markers = [...markerYears]
      .sort((a, b) => a - b)
      .map((y) => {
        const p = points[y];
        return {
          year: y,
          age: p.age,
          nominal: p.nominal,
          real: p.real,
          cx: x(p.year),
          cy: yv(p.nominal),
        };
      });

    const gridLevels = [0.25, 0.5, 0.75, 1].map((f) => ({ f, v: maxV * f }));

    // X tick ages: decades from the current age plus the endpoint.
    const tickAges = new Set<number>();
    for (let y = 0; y <= years; y += Math.max(1, Math.ceil(years / 8))) tickAges.add(plan.age + y);
    for (let y = 1; y <= years; y++) {
      if ((plan.age + y) % 10 === 0) tickAges.add(plan.age + y);
    }
    tickAges.add(plan.retire);

    return { W, H, padL, padT, plotW, plotH, maxV, x, yv, nominalPath, realPath, areaPoints, markers, gridLevels, tickAges: [...tickAges].sort((a, b) => a - b) };
  }, [plan]);

  const onTrack = plan.annualGap >= 0;
  const extraMonthlyNeeded = Math.max(0, plan.neededMonthly - Math.max(0, Number.isFinite(monthly) ? monthly : 0));

  return (
    <div className="space-y-6">
      {/* ─── Title ─────────────────────────────────────── */}
      <div className="text-center">
        <h2 className="flex items-center justify-center gap-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          <Target className="h-8 w-8 text-amber-600" aria-hidden="true" />
          Retirement Calculator
        </h2>
        <p className="mt-2 text-muted-foreground">
          Will your savings plan actually support the retirement you want? Find out in today&apos;s dollars.
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <Badge className="border-amber-500/30 bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-700">
            <CheckCircle2 className="mr-1 h-3 w-3" aria-hidden="true" />
            4% Rule Sufficiency Check
          </Badge>
          <Badge className="border-border bg-muted/60 px-3 py-1 text-xs text-muted-foreground">
            Inflation-Adjusted Results
          </Badge>
        </div>
      </div>

      {/* ─── 25x rule explainer ────────────────────────── */}
      <Card className="border-amber-500/20 bg-amber-500/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
            <div className="space-y-1 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">The 25x Rule and the 4% Rule</p>
              <p>
                The classic planning guideline: multiply the annual income you want in retirement by
                25 — that&apos;s your target nest egg. The 4% rule is the same math in reverse:
                withdrawing 4% of a diversified portfolio in year one (then adjusting for inflation)
                has historically been sustainable for 30+ years. This calculator projects your
                balance, converts it to today&apos;s purchasing power, and tests it against your goal.
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
                <PiggyBank className="h-5 w-5 text-amber-600" aria-hidden="true" />
                Your Retirement Plan
              </CardTitle>
              <CardDescription>Everything updates instantly</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="rc-current-age" className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <CalendarClock className="h-3.5 w-3.5 text-amber-600" aria-hidden="true" />
                      Current Age
                    </span>
                  </Label>
                  <Input
                    id="rc-current-age"
                    type="number"
                    min="18"
                    max="85"
                    step="1"
                    value={currentAge}
                    onChange={(e) => setCurrentAge(parseFloat(e.target.value) || 0)}
                    aria-label="Current age"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rc-retirement-age" className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <CalendarClock className="h-3.5 w-3.5 text-amber-600" aria-hidden="true" />
                      Retirement Age
                    </span>
                  </Label>
                  <Input
                    id="rc-retirement-age"
                    type="number"
                    min="50"
                    max="95"
                    step="1"
                    value={retirementAge}
                    onChange={(e) => setRetirementAge(parseFloat(e.target.value) || 0)}
                    aria-label="Planned retirement age"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rc-savings" className="text-sm font-medium">
                  Current Retirement Savings
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="rc-savings"
                    type="number"
                    min="0"
                    step="1000"
                    value={savings}
                    onChange={(e) => setSavings(parseFloat(e.target.value) || 0)}
                    className="pl-9"
                    aria-label="Current retirement savings"
                  />
                </div>
                <p className="text-xs text-muted-foreground">401(k), IRA, and taxable accounts combined</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rc-monthly" className="text-sm font-medium">
                  Monthly Contribution
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="rc-monthly"
                    type="number"
                    min="0"
                    step="50"
                    value={monthly}
                    onChange={(e) => setMonthly(parseFloat(e.target.value) || 0)}
                    className="pl-9"
                    aria-label="Monthly contribution"
                  />
                </div>
                <Slider
                  value={[Math.max(0, Number.isFinite(monthly) ? monthly : 0)]}
                  onValueChange={(v) => setMonthly(v[0])}
                  min={0}
                  max={5000}
                  step={25}
                  className="py-2"
                  aria-label="Monthly contribution slider"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="rc-return" className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <Percent className="h-3.5 w-3.5 text-amber-600" aria-hidden="true" />
                      Annual Return %
                    </span>
                  </Label>
                  <Input
                    id="rc-return"
                    type="number"
                    min="0"
                    max="15"
                    step="0.5"
                    value={returnPct}
                    onChange={(e) => setReturnPct(parseFloat(e.target.value) || 0)}
                    aria-label="Expected annual return percentage"
                  />
                  <p className="text-xs text-muted-foreground">Hint: 5% conservative, 7% balanced, 10% stocks historically</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rc-inflation" className="text-sm font-medium">
                    Expected Inflation %
                  </Label>
                  <Input
                    id="rc-inflation"
                    type="number"
                    min="0"
                    max="10"
                    step="0.25"
                    value={inflationPct}
                    onChange={(e) => setInflationPct(parseFloat(e.target.value) || 0)}
                    aria-label="Expected annual inflation percentage"
                  />
                  <p className="text-xs text-muted-foreground">Long-run US inflation: about 2&ndash;3% a year</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rc-income" className="text-sm font-medium">
                  <span className="flex items-center gap-1.5">
                    <Target className="h-3.5 w-3.5 text-amber-600" aria-hidden="true" />
                    Desired Annual Retirement Income (today&apos;s $)
                  </span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="rc-income"
                    type="number"
                    min="0"
                    step="1000"
                    value={desiredIncome}
                    onChange={(e) => setDesiredIncome(parseFloat(e.target.value) || 0)}
                    className="pl-9"
                    aria-label="Desired annual retirement income in today's dollars"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  A common starting point: 70&ndash;80% of your pre-retirement income
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ─── Results ────────────────────────────────── */}
        <div className="min-w-0 space-y-4 lg:col-span-3">
          {/* Verdict */}
          <Card className={onTrack ? 'border-emerald-500/30 bg-card/80' : 'border-red-500/30 bg-card/80'}>
            <CardContent className="p-5">
              <div className="flex flex-col items-center gap-2 text-center">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${
                    onTrack ? 'bg-emerald-600/15' : 'bg-red-600/10'
                  }`}
                >
                  {onTrack ? (
                    <CheckCircle2 className="h-6 w-6 text-emerald-600" aria-hidden="true" />
                  ) : (
                    <AlertTriangle className="h-6 w-6 text-red-600" aria-hidden="true" />
                  )}
                </div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {onTrack ? 'On Track' : 'Behind Your Goal'}
                </p>
                <p className={`text-2xl font-bold ${onTrack ? 'text-emerald-700' : 'text-red-600'} sm:text-3xl`}>
                  {onTrack ? 'Surplus of ' : 'Shortfall of '}
                  {formatCurrency(Math.abs(plan.annualGap))}/yr
                </p>
                <p className="text-sm text-muted-foreground">
                  At {plan.retire}, your plan supports{' '}
                  <strong className="text-foreground">{formatCurrency(plan.sustainableIncome)}</strong> a year in
                  today&apos;s dollars vs. your{' '}
                  <strong className="text-foreground">{formatCurrency(Math.max(0, Number.isFinite(desiredIncome) ? desiredIncome : 0))}</strong>{' '}
                  goal — it covers{' '}
                  <strong className={onTrack ? 'text-emerald-700' : 'text-red-600'}>
                    {plan.coveragePct.toFixed(1)}%
                  </strong>{' '}
                  of it.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Stat grid */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4">
              <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <TrendingUp className="h-3.5 w-3.5 text-amber-600" aria-hidden="true" />
                Nest Egg at {plan.retire} (nominal)
              </p>
              <p className="mt-1 text-2xl font-bold text-amber-700">{formatCurrency(plan.nominal)}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                In today&apos;s dollars: <strong className="text-foreground">{formatCurrency(plan.real)}</strong>
              </p>
            </div>
            <div className="rounded-xl border border-border/40 bg-background/60 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                4% Sustainable Income (today&apos;s $)
              </p>
              <p className="mt-1 text-2xl font-bold text-foreground">{formatCurrency(plan.sustainableIncome)}</p>
              <p className="mt-1 text-xs text-muted-foreground">4% of your inflation-adjusted nest egg</p>
            </div>
            <div className="rounded-xl border border-border/40 bg-background/60 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">You Deposit vs. Growth</p>
              <p className="mt-1 text-2xl font-bold text-foreground">{formatCurrency(plan.totalDeposits)}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Growth adds <strong className="text-emerald-700">{formatCurrency(plan.totalGrowth)}</strong> of it
              </p>
            </div>
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4">
              <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <Target className="h-3.5 w-3.5 text-amber-600" aria-hidden="true" />
                Monthly Savings to Hit 25x Your Goal
              </p>
              <p className="mt-1 text-2xl font-bold text-amber-700">{formatCurrency(plan.neededMonthly)}/mo</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Target nest egg 25 x income ={' '}
                <strong className="text-foreground">{formatCurrency(plan.targetNestEgg)}</strong>
                {extraMonthlyNeeded > 0 && (
                  <>
                    {' '}({formatCurrency(extraMonthlyNeeded)}/mo more than you plan now)
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Chart */}
          <Card className="border-border/50 bg-card/80">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Balance Growth to Age {plan.retire}</CardTitle>
              <CardDescription>Nominal balance vs. today&apos;s dollars, with decade markers</CardDescription>
            </CardHeader>
            <CardContent>
              {plan.years < 1 ? (
                <p className="py-10 text-center text-sm text-muted-foreground">
                  Set a retirement age after your current age to see the growth curve.
                </p>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-border/30 bg-card/30 p-2">
                  <svg
                    viewBox={`0 0 ${chart.W} ${chart.H}`}
                    className="h-auto w-full"
                    style={{ minWidth: '320px' }}
                    role="img"
                    aria-label={`Projected retirement balance growth from age ${plan.age} to ${plan.retire}: nominal and inflation-adjusted`}
                  >
                    <defs>
                      <linearGradient id="rcNominalFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#b08d3e" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#b08d3e" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>

                    {/* Gridlines + Y labels */}
                    {chart.gridLevels.map((g) => (
                      <g key={g.f}>
                        <line
                          x1={chart.padL}
                          y1={chart.yv(g.v)}
                          x2={chart.padL + chart.plotW}
                          y2={chart.yv(g.v)}
                          stroke="currentColor"
                          strokeWidth="1"
                          strokeDasharray="3,4"
                          className="text-border"
                        />
                        <text
                          x={chart.padL - 8}
                          y={chart.yv(g.v) + 4}
                          textAnchor="end"
                          className="fill-muted-foreground"
                          style={{ fontSize: '11px' }}
                        >
                          {compactDollars(g.v)}
                        </text>
                      </g>
                    ))}
                    <line
                      x1={chart.padL}
                      y1={chart.padT + chart.plotH}
                      x2={chart.padL + chart.plotW}
                      y2={chart.padT + chart.plotH}
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-border"
                    />

                    {/* X labels */}
                    {chart.tickAges.map((a) => (
                      <text
                        key={a}
                        x={chart.x(a - plan.age)}
                        y={chart.padT + chart.plotH + 22}
                        textAnchor="middle"
                        className="fill-muted-foreground"
                        style={{ fontSize: '11px' }}
                      >
                        {a}
                      </text>
                    ))}

                    {/* Nominal area + line */}
                    <polygon points={chart.areaPoints} fill="url(#rcNominalFill)" />
                    <polyline
                      points={chart.nominalPath}
                      fill="none"
                      stroke="#b08d3e"
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                    />
                    {/* Today's dollars line */}
                    <polyline
                      points={chart.realPath}
                      fill="none"
                      stroke="#64748b"
                      strokeWidth="2"
                      strokeDasharray="6,5"
                      strokeLinejoin="round"
                    />

                    {/* Decade markers */}
                    {chart.markers.map((m) => (
                      <g key={m.year}>
                        <circle cx={m.cx} cy={m.cy} r="5" fill="#b08d3e" />
                        <circle cx={m.cx} cy={m.cy} r="2.5" fill="#fffafb" />
                        <text
                          x={m.cx}
                          y={m.cy - 10}
                          textAnchor={m.year === plan.years ? 'end' : 'middle'}
                          className="fill-foreground"
                          style={{ fontSize: '11px', fontWeight: '600' }}
                        >
                          {compactDollars(m.nominal)}
                        </text>
                        <text
                          x={m.cx}
                          y={m.cy - 24}
                          textAnchor={m.year === plan.years ? 'end' : 'middle'}
                          className="fill-muted-foreground"
                          style={{ fontSize: '10px' }}
                        >
                          age {m.age}
                        </text>
                      </g>
                    ))}

                    {/* Legend */}
                    <g transform={`translate(${chart.padL}, ${chart.H - 10})`}>
                      <line x1="0" y1="-4" x2="26" y2="-4" stroke="#b08d3e" strokeWidth="2.5" />
                      <text x="32" y="0" className="fill-muted-foreground" style={{ fontSize: '11px' }}>
                        Nominal balance
                      </text>
                      <line x1="170" y1="-4" x2="196" y2="-4" stroke="#64748b" strokeWidth="2" strokeDasharray="6,5" />
                      <text x="202" y="0" className="fill-muted-foreground" style={{ fontSize: '11px' }}>
                        In today&apos;s dollars
                      </text>
                    </g>
                  </svg>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Milestone table */}
          <Card className="border-border/50 bg-card/80">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Milestones Along the Way</CardTitle>
              <CardDescription>Balance and 4%-rule income at each checkpoint, in today&apos;s dollars</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-h-96 overflow-y-auto overflow-x-auto rounded-lg border border-border/40 custom-scrollbar">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-muted/60 backdrop-blur">
                    <tr>
                      <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Age</th>
                      <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">Nominal Balance</th>
                      <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">Today&apos;s Dollars</th>
                      <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">4% Income (Today&apos;s $)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plan.points
                      .filter((p) => p.year === 0 || p.year % 5 === 0 || p.year === plan.years)
                      .map((p) => (
                        <tr key={p.year} className="border-b border-border/20 transition-colors hover:bg-amber-500/5">
                          <td className="px-4 py-2.5 font-semibold text-foreground">
                            {p.age}
                            {p.year === plan.years && <span className="ml-1 text-xs text-amber-700">(retire)</span>}
                          </td>
                          <td className="px-4 py-2.5 text-right text-muted-foreground">{formatCurrency(p.nominal)}</td>
                          <td className="px-4 py-2.5 text-right text-foreground">{formatCurrency(p.real)}</td>
                          <td className="px-4 py-2.5 text-right font-medium text-amber-700">
                            {formatCurrency(fourRuleIncome(p.real))}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="text-xs leading-relaxed text-muted-foreground">
            Assumes a constant {Number.isFinite(returnPct) ? returnPct : 0}% average annual return compounded monthly
            (annual rate / 12), level contributions, and{' '}
            {Number.isFinite(inflationPct) ? inflationPct : 0}% annual inflation. Markets fluctuate and future
            returns are never guaranteed — treat these as planning estimates, not promises. Already have a 401(k)
            with employer match? Our{' '}
            <a
              href="/401k-retirement-calculator"
              className="font-medium text-amber-700 underline underline-offset-2 hover:text-amber-800"
            >
              401(k) calculator
            </a>{' '}
            projects the match; this tool measures overall readiness. Growing the balance is step one — see how it
            compounds with our{' '}
            <a
              href="/compound-interest-calculator"
              className="font-medium text-amber-700 underline underline-offset-2 hover:text-amber-800"
            >
              compound interest calculator
            </a>
            , and check the tax-free path with our{' '}
            <a
              href="/roth-ira-calculator"
              className="font-medium text-amber-700 underline underline-offset-2 hover:text-amber-800"
            >
              Roth IRA calculator
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
