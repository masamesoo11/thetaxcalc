'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  TrendingUp,
  PiggyBank,
  Clock,
  Target,
  DollarSign,
  Percent,
  Info,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from '@/components/ui/chart';
import {
  calculateRetirementProjection,
  formatCurrency,
  formatNumber,
  type RetirementProjection,
} from '@/lib/finance-utils';
import { MORTGAGE_DEFAULTS } from '@/lib/tax-config';
import { useHashParams, updateHashState } from '@/hooks/use-hash-state';

// ─── Constants ────────────────────────────────────────────────────────────────

const CONTRIBUTION_LIMIT_2026 = 23500;
const PROJECTION_YEAR_OPTIONS = [10, 15, 20, 25, 30, 35, 40] as const;

const DEFAULT_SALARY = 85000;
const DEFAULT_401K = 10000;
const DEFAULT_EMPLOYER_MATCH = 3;
const DEFAULT_RETURN_RATE = 7;
const DEFAULT_YEARS = 30;

// ─── Chart Configuration ──────────────────────────────────────────────────────

const chartConfig: ChartConfig = {
  contributions: {
    label: 'Total Contributions',
    color: '#f59e0b',
  },
  growth: {
    label: 'Total Growth',
    color: '#10b981',
  },
};

// ─── Custom Tooltip Formatter ─────────────────────────────────────────────────

function CustomTooltipContent({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string; color: string }>;
  label?: string | number;
}) {
  if (!active || !payload?.length) return null;

  const contributions = payload.find((p) => p.dataKey === 'contributions')?.value ?? 0;
  const growth = payload.find((p) => p.dataKey === 'growth')?.value ?? 0;
  const total = contributions + growth;

  return (
    <div className="rounded-lg border border-border/50 bg-background/95 px-3 py-2.5 shadow-xl backdrop-blur-sm">
      <p className="mb-1.5 text-xs font-semibold text-foreground">
        Year {label}
      </p>
      <div className="space-y-1 text-xs">
        <div className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <span className="inline-block h-2 w-2 rounded-sm bg-amber-500" />
            Contributions
          </span>
          <span className="font-mono font-medium text-amber-400">
            {formatCurrency(contributions)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <span className="inline-block h-2 w-2 rounded-sm bg-emerald-500" />
            Growth
          </span>
          <span className="font-mono font-medium text-emerald-400">
            {formatCurrency(growth)}
          </span>
        </div>
        <Separator className="my-1 bg-border/40" />
        <div className="flex items-center justify-between gap-4 font-medium">
          <span className="text-foreground">Total Balance</span>
          <span className="font-mono text-foreground">{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function RetirementProjection() {
  const hashParams = useHashParams();

  const [annualSalary, setAnnualSalary] = useState<number>(() =>
    hashParams.salary ? Number(hashParams.salary) : DEFAULT_SALARY
  );
  const [annual401k, setAnnual401k] = useState<number>(() =>
    hashParams.k401 ? Number(hashParams.k401) : DEFAULT_401K
  );
  const [employerMatchPct, setEmployerMatchPct] = useState<number>(() =>
    hashParams.match ? Number(hashParams.match) : DEFAULT_EMPLOYER_MATCH
  );
  const [returnRate, setReturnRate] = useState<number>(() =>
    hashParams.rate ? Number(hashParams.rate) : DEFAULT_RETURN_RATE
  );
  const [projectionYears, setProjectionYears] = useState<number>(() =>
    hashParams.years ? Number(hashParams.years) : DEFAULT_YEARS
  );

  // Persist state to URL hash
  useEffect(() => {
    updateHashState('retirement', {
      salary: annualSalary,
      k401: annual401k,
      match: employerMatchPct,
      rate: returnRate,
      years: projectionYears,
    });
  }, [annualSalary, annual401k, employerMatchPct, returnRate, projectionYears]);

  // ─── Calculation ───────────────────────────────────────────────────────────

  const projection: RetirementProjection = useMemo(() => {
    return calculateRetirementProjection(
      annualSalary,
      annual401k,
      employerMatchPct / 100,
      returnRate / 100,
      projectionYears
    );
  }, [annualSalary, annual401k, employerMatchPct, returnRate, projectionYears]);

  // ─── Chart Data ────────────────────────────────────────────────────────────

  const chartData = useMemo(() => {
    return projection.years.map((year, i) => ({
      year,
      contributions: projection.totalContributions[i],
      growth: projection.totalGrowth[i],
    }));
  }, [projection]);

  // ─── Derived Stats ─────────────────────────────────────────────────────────

  const growthMultiplier =
    projection.totalContributed > 0
      ? projection.finalBalance / projection.totalContributed
      : 0;

  const employerMatchAmount = Math.min(
    annualSalary * (employerMatchPct / 100),
    annual401k * 0.5
  );

  const effectiveContribution = annual401k + employerMatchAmount;

  // ─── Y-Axis Tick Formatter ─────────────────────────────────────────────────

  const formatYAxis = (value: number): string => {
    if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
    return `$${value}`;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="flex items-center justify-center gap-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          <PiggyBank className="h-8 w-8 text-emerald-400" />
          401(k) Retirement Projection
        </h1>
        <p className="mt-2 text-muted-foreground">
          See how your 401(k) contributions compound over time with employer matching
        </p>
      </div>

      {/* Info Card */}
      <Card className="border-emerald-500/20 bg-emerald-500/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">How 401(k) Compound Growth Works</p>
              <p>
                Each year, your balance grows by the expected return rate on the entire
                portfolio, while you continue adding new contributions. Employer matching
                (typically 50¢ per $1 up to 6% of salary) further accelerates growth.
                This compounding effect means the majority of your final balance comes
                from investment returns, not contributions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Layout: Inputs + Results */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Input Section */}
        <div className="space-y-4 lg:col-span-3">
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <DollarSign className="h-5 w-5 text-emerald-400" />
                Contribution Parameters
              </CardTitle>
              <CardDescription>
                Adjust any value to see instant projection results
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Row 1: Salary + 401(k) */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="ret-salary" className="text-sm font-medium">
                    Annual Salary
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="ret-salary"
                      type="number"
                      min={0}
                      step={1000}
                      value={annualSalary || ''}
                      onChange={(e) => setAnnualSalary(Number(e.target.value) || 0)}
                      className="pl-9"
                      placeholder="85000"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ret-401k" className="text-sm font-medium">
                    <span className="flex items-center justify-between">
                      <span>Annual 401(k) Contribution</span>
                      <Badge
                        variant="secondary"
                        className={`text-xs ${
                          annual401k > CONTRIBUTION_LIMIT_2026
                            ? 'bg-red-500/10 text-red-400'
                            : 'bg-emerald-500/10 text-emerald-400'
                        }`}
                      >
                        Max ${formatNumber(CONTRIBUTION_LIMIT_2026)}
                      </Badge>
                    </span>
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="ret-401k"
                      type="number"
                      min={0}
                      max={CONTRIBUTION_LIMIT_2026}
                      step={500}
                      value={annual401k || ''}
                      onChange={(e) =>
                        setAnnual401k(
                          Math.min(Number(e.target.value) || 0, CONTRIBUTION_LIMIT_2026)
                        )
                      }
                      className="pl-9"
                      placeholder="10000"
                    />
                  </div>
                  {annual401k > CONTRIBUTION_LIMIT_2026 && (
                    <p className="text-xs text-red-400">
                      Exceeds 2026 limit of ${formatNumber(CONTRIBUTION_LIMIT_2026)}
                    </p>
                  )}
                </div>
              </div>

              <Separator className="bg-border/40" />

              {/* Row 2: Employer Match Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <Percent className="h-3.5 w-3.5 text-emerald-400" />
                      Employer Match %
                    </span>
                  </Label>
                  <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400">
                    {employerMatchPct}% of salary
                  </Badge>
                </div>
                <Slider
                  value={[employerMatchPct]}
                  onValueChange={(v) => setEmployerMatchPct(v[0])}
                  min={0}
                  max={6}
                  step={0.5}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0%</span>
                  <span>3%</span>
                  <span>6%</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Employer contributes {employerMatchPct}% of salary (${formatCurrency(employerMatchAmount)}/yr),
                  matching 50¢ per $1 you contribute up to {employerMatchPct}% of salary.
                </p>
              </div>

              <Separator className="bg-border/40" />

              {/* Row 3: Return Rate Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                      Expected Annual Return
                    </span>
                  </Label>
                  <Badge variant="secondary" className="bg-amber-500/10 text-amber-400">
                    {returnRate}%
                  </Badge>
                </div>
                <Slider
                  value={[returnRate]}
                  onValueChange={(v) => setReturnRate(v[0])}
                  min={4}
                  max={12}
                  step={0.5}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>4% (Conservative)</span>
                  <span>8% (Moderate)</span>
                  <span>12% (Aggressive)</span>
                </div>
              </div>

              <Separator className="bg-border/40" />

              {/* Row 4: Projection Years */}
              <div className="space-y-2">
                <Label htmlFor="ret-years" className="text-sm font-medium">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-emerald-400" />
                    Projection Period
                  </span>
                </Label>
                <Select
                  value={String(projectionYears)}
                  onValueChange={(v) => setProjectionYears(Number(v))}
                >
                  <SelectTrigger id="ret-years">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PROJECTION_YEAR_OPTIONS.map((yr) => (
                      <SelectItem key={yr} value={String(yr)}>
                        {yr} Years
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Chart Card */}
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-emerald-400" />
                Growth Projection Over Time
              </CardTitle>
              <CardDescription>
                Stacked view of contributions vs. investment growth
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[320px] w-full">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="gradContributions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="gradGrowth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="oklch(1 0 0 / 8%)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="year"
                    tick={{ fontSize: 11, fill: 'oklch(0.708 0 0)' }}
                    tickLine={false}
                    axisLine={{ stroke: 'oklch(1 0 0 / 10%)' }}
                    label={{
                      value: 'Year',
                      position: 'insideBottomRight',
                      offset: -5,
                      fontSize: 11,
                      fill: 'oklch(0.556 0 0)',
                    }}
                  />
                  <YAxis
                    tickFormatter={formatYAxis}
                    tick={{ fontSize: 11, fill: 'oklch(0.708 0 0)' }}
                    tickLine={false}
                    axisLine={false}
                    width={65}
                  />
                  <Tooltip
                    content={<CustomTooltipContent />}
                    cursor={{
                      stroke: 'oklch(1 0 0 / 20%)',
                      strokeDasharray: '4 4',
                    }}
                  />
                  <Legend
                    content={<ChartLegendContent />}
                    verticalAlign="top"
                  />
                  <Area
                    type="monotone"
                    dataKey="contributions"
                    stackId="1"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    fill="url(#gradContributions)"
                    name="contributions"
                  />
                  <Area
                    type="monotone"
                    dataKey="growth"
                    stackId="1"
                    stroke="#10b981"
                    strokeWidth={2}
                    fill="url(#gradGrowth)"
                    name="growth"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Results Sidebar */}
        <div className="lg:col-span-2">
          <Card className="sticky top-20 border-emerald-500/20 bg-card/90 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="h-5 w-5 text-emerald-400" />
                Projection Summary
              </CardTitle>
              <CardDescription>
                {projectionYears}-year outlook at {returnRate}% annual return
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Hero Number */}
              <div className="rounded-xl bg-emerald-500/10 p-5 text-center">
                <p className="text-xs font-medium uppercase tracking-wider text-emerald-400/80">
                  Final Projected Balance
                </p>
                <p className="mt-1 text-3xl font-bold text-emerald-400 sm:text-4xl">
                  {formatCurrency(projection.finalBalance)}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {growthMultiplier.toFixed(1)}× your total contributions
                </p>
              </div>

              <Separator className="bg-border/40" />

              {/* Three Stat Cards */}
              <div className="grid gap-3">
                <div className="flex items-center justify-between rounded-lg bg-amber-500/5 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <PiggyBank className="h-4 w-4 text-amber-400" />
                    <span className="text-sm text-muted-foreground">Total Contributed</span>
                  </div>
                  <span className="text-sm font-semibold text-amber-400">
                    {formatCurrency(projection.totalContributed)}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-emerald-500/5 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-emerald-400" />
                    <span className="text-sm text-muted-foreground">Total Growth</span>
                  </div>
                  <span className="text-sm font-semibold text-emerald-400">
                    {formatCurrency(projection.totalGrowthAmount)}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-emerald-500/10 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-emerald-400" />
                    <span className="text-sm text-muted-foreground">Final Balance</span>
                  </div>
                  <span className="text-sm font-bold text-emerald-400">
                    {formatCurrency(projection.finalBalance)}
                  </span>
                </div>
              </div>

              <Separator className="bg-border/40" />

              {/* Breakdown Details */}
              <div className="space-y-2.5 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Your Annual Contribution</span>
                  <span className="font-medium text-foreground">
                    {formatCurrency(annual401k)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Employer Match/Year</span>
                  <span className="font-medium text-emerald-400">
                    +{formatCurrency(employerMatchAmount)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Effective Annual Total</span>
                  <span className="font-semibold text-foreground">
                    {formatCurrency(effectiveContribution)}
                  </span>
                </div>
              </div>

              <Separator className="bg-border/40" />

              {/* Growth vs Contributions bar */}
              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Growth vs Contributions
                </p>
                <div className="flex h-3 overflow-hidden rounded-full bg-muted">
                  <div
                    className="bg-amber-500 transition-all duration-500"
                    style={{
                      width: `${
                        projection.finalBalance > 0
                          ? (projection.totalContributed / projection.finalBalance) * 100
                          : 0
                      }%`,
                    }}
                  />
                  <div
                    className="bg-emerald-500 transition-all duration-500"
                    style={{
                      width: `${
                        projection.finalBalance > 0
                          ? (projection.totalGrowthAmount / projection.finalBalance) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <span className="inline-block h-2 w-2 rounded-sm bg-amber-500" />
                    Contributions{' '}
                    {projection.finalBalance > 0
                      ? ((projection.totalContributed / projection.finalBalance) * 100).toFixed(0)
                      : 0}
                    %
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="inline-block h-2 w-2 rounded-sm bg-emerald-500" />
                    Growth{' '}
                    {projection.finalBalance > 0
                      ? ((projection.totalGrowthAmount / projection.finalBalance) * 100).toFixed(0)
                      : 0}
                    %
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Summary Text */}
      <Card className="border-emerald-500/20 bg-emerald-500/5">
        <CardContent className="p-4">
          <p className="text-center text-sm text-muted-foreground sm:text-base">
            Your{' '}
            <span className="font-semibold text-amber-400">
              {formatCurrency(annual401k)}/year
            </span>{' '}
            401(k) contribution with {returnRate}% annual return grows to{' '}
            <span className="font-bold text-emerald-400">
              {formatCurrency(projection.finalBalance)}
            </span>{' '}
            over {projectionYears} years — that&apos;s{' '}
            <span className="font-semibold text-emerald-400">
              {formatCurrency(projection.totalGrowthAmount)}
            </span>{' '}
            in compound growth alone.
          </p>
        </CardContent>
      </Card>

      {/* Educational Content */}
      <Card className="border-border/50 bg-card/80">
        <CardHeader>
          <CardTitle className="text-lg">
            Understanding 401(k) Compound Growth &amp; Employer Matching
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground">The power of compound interest:</strong> When you
            invest in a 401(k), your returns generate their own returns each year. Over 30 years at
            a 7% average annual return, approximately 70% of your final balance comes from
            investment growth, not your original contributions. Starting early maximizes this
            compounding effect dramatically.
          </p>
          <p>
            <strong className="text-foreground">Employer matching is free money:</strong> Most
            employers match 50¢ per dollar you contribute, up to 3–6% of your salary. For an
            $85,000 salary with a 3% match, that&apos;s an additional $1,275/year in free contributions.
            Over 30 years at 7%, that match alone grows to over $120,000. Always contribute at least
            enough to capture the full employer match.
          </p>
          <p>
            <strong className="text-foreground">2026 contribution limits:</strong> The 401(k)
            elective deferral limit is $23,500 for 2026 (with an additional $7,500 catch-up for
            those age 50+). Contributions are made pre-tax, reducing your current taxable income.
            For someone in the 22% marginal bracket, a $10,000 contribution saves $2,200 in federal
            taxes in the current year.
          </p>
          <p>
            <strong className="text-foreground">Expected return rates:</strong> A 7% average annual
            return reflects a diversified portfolio of roughly 70–80% stocks and 20–30% bonds,
            based on historical S&amp;P 500 data. Conservative investors may use 4–5% (more bonds),
            while aggressive investors may project 8–10% (more equities). Actual returns will vary
            year to year.
          </p>
        </CardContent>
      </Card>

      {/* Pre-rendered SEO Example */}
      <div className="rounded-xl border border-border/30 bg-muted/10 p-6" aria-hidden="true">
        <h2 className="text-xl font-bold text-foreground">
          401(k) Example: $10,000/Year Contribution at 7% Return (2026)
        </h2>
        <div className="mt-3 space-y-1 text-sm text-muted-foreground">
          <p>Annual Salary: $85,000.00</p>
          <p>Annual 401(k) Contribution: $10,000.00</p>
          <p>Employer Match: 3% of salary ($1,275.00/yr)</p>
          <p>Effective Annual Contribution: $11,275.00</p>
          <p>Expected Annual Return: 7%</p>
          <p>Projection Period: 30 years</p>
          <p>Total Contributed: $338,250.00</p>
          <p>Total Growth: $744,248.24</p>
          <p>Final Balance: $1,082,498.24</p>
          <p>A $10,000/year 401(k) contribution with 7% return grows to $1,082,498.24 over 30 years</p>
        </div>
      </div>
    </div>
  );
}
