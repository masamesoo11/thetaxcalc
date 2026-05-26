'use client';

import { useMemo, useState } from 'react';
import {
  ArrowRightLeft,
  TrendingUp,
  TrendingDown,
  DollarSign,
  MapPin,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  calculateRelocation,
  formatCurrency,
  formatPercent,
  type RelocationResult,
} from '@/lib/finance-utils';
import { STATE_PROFILES } from '@/lib/tax-config';

// ─── Constants ────────────────────────────────────────────────────────────────

const STATE_KEYS = ['illinois', 'texas', 'florida', 'california', 'newyork'] as const;

type StateKey = (typeof STATE_KEYS)[number];

type FilingStatus = 'single' | 'married' | 'head_of_household';

const FILING_LABELS: Record<FilingStatus, string> = {
  single: 'Single',
  married: 'Married Filing Jointly',
  head_of_household: 'Head of Household',
};

// ─── Component ────────────────────────────────────────────────────────────────

export function RelocationCalculator() {
  const [salary, setSalary] = useState<number>(75000);
  const [sourceState, setSourceState] = useState<StateKey>('illinois');
  const [targetState, setTargetState] = useState<StateKey>('texas');
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const [result, setResult] = useState<RelocationResult | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const sourceProfile = STATE_PROFILES[sourceState];
  const targetProfile = STATE_PROFILES[targetState];

  const isSameState = sourceState === targetState;

  const handleCalculate = () => {
    if (salary <= 0 || isSameState) return;
    const res = calculateRelocation(salary, sourceState, targetState, filingStatus);
    setResult(res);
    setHasCalculated(true);
  };

  const handleSwapStates = () => {
    setSourceState(targetState);
    setTargetState(sourceState);
    setResult(null);
    setHasCalculated(false);
  };

  return (
    <div className="space-y-6">
      {/* ─── Page Title ────────────────────────────────────── */}
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Salary Relocation Calculator
        </h2>
        <p className="mt-2 text-muted-foreground">
          How much do you need to earn in another state to match your current take-home pay?
        </p>
      </div>

      {/* ─── Pre-rendered SEO Example ──────────────────────── */}
      <div
        className="rounded-xl border border-border/30 bg-muted/10 p-6"
        aria-hidden="true"
      >
        <h3 className="text-lg font-bold text-foreground">
          Example: Illinois to Texas Salary Comparison (2026)
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          To match $75,000 in Illinois, you need $71,429 in Texas. Because Texas has no
          state income tax, your take-home pay stays the same even with a lower salary.
          A single filer earning $75,000 in Illinois pays approximately $3,576 in state
          income tax — money that stays in your pocket when you relocate to Texas.
        </p>
      </div>

      {/* ─── Input Section ─────────────────────────────────── */}
      <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <MapPin className="h-5 w-5 text-emerald-400" />
            Compare Your Salary Across States
          </CardTitle>
          <CardDescription>
            Enter your current salary and select the states you are comparing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Salary Input */}
          <div className="space-y-2">
            <Label htmlFor="relocation-salary" className="text-sm font-medium">
              Current Annual Salary
            </Label>
            <div className="relative max-w-xs">
              <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="relocation-salary"
                type="number"
                min={0}
                value={salary || ''}
                onChange={(e) => {
                  setSalary(Number(e.target.value) || 0);
                  setHasCalculated(false);
                }}
                className="pl-9"
                placeholder="75000"
              />
            </div>
          </div>

          {/* State Selectors + Swap */}
          <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr]">
            {/* Source State */}
            <div className="space-y-2">
              <Label htmlFor="source-state" className="text-sm font-medium">
                Source State (Current)
              </Label>
              <Select
                value={sourceState}
                onValueChange={(v) => {
                  setSourceState(v as StateKey);
                  setHasCalculated(false);
                }}
              >
                <SelectTrigger id="source-state" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATE_KEYS.map((key) => {
                    const profile = STATE_PROFILES[key];
                    return (
                      <SelectItem key={key} value={key}>
                        {profile.name}{' '}
                        {profile.incomeTaxType === 'none'
                          ? '(0%)'
                          : `(${(profile.incomeTaxRate * 100).toFixed(2)}%)`}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              {sourceProfile && (
                <p className="text-xs text-muted-foreground">
                  {sourceProfile.incomeTaxType === 'none'
                    ? 'No state income tax'
                    : `${sourceProfile.incomeTaxType === 'flat' ? 'Flat' : 'Progressive'} rate: ${sourceProfile.incomeTaxType === 'flat' ? `${(sourceProfile.incomeTaxRate * 100).toFixed(2)}%` : '1%–13.3%'}`}
                </p>
              )}
            </div>

            {/* Swap Button */}
            <div className="flex items-end justify-center pb-1">
              <Button
                variant="outline"
                size="icon"
                onClick={handleSwapStates}
                className="rounded-full border-border/50 hover:border-emerald-500/50 hover:bg-emerald-500/10"
                aria-label="Swap source and target states"
              >
                <ArrowRightLeft className="h-4 w-4" />
              </Button>
            </div>

            {/* Target State */}
            <div className="space-y-2">
              <Label htmlFor="target-state" className="text-sm font-medium">
                Target State (New)
              </Label>
              <Select
                value={targetState}
                onValueChange={(v) => {
                  setTargetState(v as StateKey);
                  setHasCalculated(false);
                }}
              >
                <SelectTrigger id="target-state" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATE_KEYS.map((key) => {
                    const profile = STATE_PROFILES[key];
                    return (
                      <SelectItem key={key} value={key}>
                        {profile.name}{' '}
                        {profile.incomeTaxType === 'none'
                          ? '(0%)'
                          : `(${(profile.incomeTaxRate * 100).toFixed(2)}%)`}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              {targetProfile && (
                <p className="text-xs text-muted-foreground">
                  {targetProfile.incomeTaxType === 'none'
                    ? 'No state income tax'
                    : `${targetProfile.incomeTaxType === 'flat' ? 'Flat' : 'Progressive'} rate: ${targetProfile.incomeTaxType === 'flat' ? `${(targetProfile.incomeTaxRate * 100).toFixed(2)}%` : '1%–13.3%'}`}
                </p>
              )}
            </div>
          </div>

          {/* Filing Status */}
          <div className="space-y-2">
            <Label htmlFor="relocation-filing" className="text-sm font-medium">
              Filing Status
            </Label>
            <Select
              value={filingStatus}
              onValueChange={(v) => {
                setFilingStatus(v as FilingStatus);
                setHasCalculated(false);
              }}
            >
              <SelectTrigger id="relocation-filing" className="w-full max-w-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(FILING_LABELS).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Same State Warning */}
          {isSameState && (
            <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-400">
              Source and target states are the same. Please select different states to compare.
            </div>
          )}

          {/* Calculate Button */}
          <Button
            onClick={handleCalculate}
            disabled={salary <= 0 || isSameState}
            className="w-full bg-emerald-600 text-white hover:bg-emerald-700 sm:w-auto"
            size="lg"
          >
            <ArrowRightLeft className="mr-2 h-4 w-4" />
            Calculate Equivalent Salary
          </Button>
        </CardContent>
      </Card>

      {/* ─── Results Section ───────────────────────────────── */}
      {result && hasCalculated && (
        <div className="space-y-6">
          {/* Hero Result */}
          <Card className="border-emerald-500/30 bg-card/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                  Equivalent Salary in {result.targetState}
                </p>
                <p className="mt-2 text-4xl font-bold text-emerald-400 sm:text-5xl">
                  {formatCurrency(result.equivalentSalary)}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  To match your take-home pay of{' '}
                  <span className="font-medium text-foreground">
                    {formatCurrency(result.sourceNet)}
                  </span>{' '}
                  from {result.sourceState}
                </p>
              </div>

              <Separator className="my-6 bg-border/40" />

              {/* Key Metrics */}
              <div className="grid gap-4 sm:grid-cols-3">
                {/* Salary Difference */}
                <div className="rounded-lg bg-muted/30 p-4 text-center">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Salary Difference
                  </p>
                  <p
                    className={`mt-1 text-2xl font-bold ${
                      result.salaryDifference <= 0
                        ? 'text-emerald-400'
                        : 'text-red-400'
                    }`}
                  >
                    {result.salaryDifference < 0 ? '' : result.salaryDifference > 0 ? '+' : ''}
                    {formatCurrency(result.salaryDifference)}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    ({result.percentDifference > 0 ? '+' : ''}
                    {formatPercent(result.percentDifference)})
                  </p>
                  <div className="mt-2">
                    {result.salaryDifference <= 0 ? (
                      <Badge className="bg-emerald-500/20 text-emerald-400 text-xs">
                        <TrendingDown className="mr-1 h-3 w-3" />
                        Need Less
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="text-xs">
                        <TrendingUp className="mr-1 h-3 w-3" />
                        Need More
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Tax Savings */}
                <div className="rounded-lg bg-muted/30 p-4 text-center">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Tax Savings
                  </p>
                  <p
                    className={`mt-1 text-2xl font-bold ${
                      result.taxSavings >= 0 ? 'text-emerald-400' : 'text-red-400'
                    }`}
                  >
                    {result.taxSavings >= 0 ? '+' : ''}
                    {formatCurrency(result.taxSavings)}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    State tax difference
                  </p>
                  <div className="mt-2">
                    {result.taxSavings > 0 ? (
                      <Badge className="bg-emerald-500/20 text-emerald-400 text-xs">
                        <TrendingUp className="mr-1 h-3 w-3" />
                        Save in {result.targetState}
                      </Badge>
                    ) : result.taxSavings < 0 ? (
                      <Badge variant="destructive" className="text-xs">
                        <TrendingDown className="mr-1 h-3 w-3" />
                        Pay More in {result.targetState}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs">
                        No Difference
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Source Net */}
                <div className="rounded-lg bg-muted/30 p-4 text-center">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Net Take-Home
                  </p>
                  <p className="mt-1 text-2xl font-bold text-foreground">
                    {formatCurrency(result.sourceNet)}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Same in both states
                  </p>
                  <div className="mt-2">
                    <Badge variant="outline" className="text-xs">
                      <DollarSign className="mr-1 h-3 w-3" />
                      Equivalent Net
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Side-by-Side Comparison Card */}
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <ArrowRightLeft className="h-5 w-5 text-emerald-400" />
                Side-by-Side Comparison
              </CardTitle>
              <CardDescription>
                Detailed breakdown of taxes and take-home pay in each state
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Source State Card */}
                <div className="rounded-xl border border-border/50 bg-muted/20 p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-semibold text-foreground">
                      {result.sourceState}
                    </span>
                    <Badge variant="outline" className="text-[10px]">
                      Source
                    </Badge>
                  </div>
                  <Separator className="bg-border/30" />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Gross Salary</span>
                      <span className="font-medium text-foreground">
                        {formatCurrency(result.sourceSalary)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">State Income Tax</span>
                      <span className="font-medium text-red-400">
                        -{formatCurrency(result.sourceStateTax)}
                      </span>
                    </div>
                    <Separator className="bg-border/20" />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Net Take-Home</span>
                      <span className="font-bold text-foreground">
                        {formatCurrency(result.sourceNet)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Effective State Rate</span>
                      <span className="font-medium text-foreground">
                        {result.sourceSalary > 0
                          ? formatPercent(result.sourceStateTax / result.sourceSalary)
                          : '0.00%'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Target State Card */}
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-emerald-400" />
                    <span className="text-sm font-semibold text-foreground">
                      {result.targetState}
                    </span>
                    <Badge className="bg-emerald-500/20 text-emerald-400 text-[10px]">
                      Target
                    </Badge>
                  </div>
                  <Separator className="bg-border/30" />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Equivalent Salary</span>
                      <span className="font-bold text-emerald-400">
                        {formatCurrency(result.equivalentSalary)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">State Income Tax</span>
                      <span className="font-medium text-red-400">
                        -{formatCurrency(result.targetStateTax)}
                      </span>
                    </div>
                    <Separator className="bg-border/20" />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Net Take-Home</span>
                      <span className="font-bold text-foreground">
                        {formatCurrency(result.equivalentNet)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Effective State Rate</span>
                      <span className="font-medium text-foreground">
                        {result.equivalentSalary > 0
                          ? formatPercent(result.targetStateTax / result.equivalentSalary)
                          : '0.00%'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary Bar */}
              <div className="mt-4 rounded-lg border border-border/30 bg-muted/30 p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-sm text-muted-foreground">
                    {result.salaryDifference <= 0 ? (
                      <span>
                        You need{' '}
                        <strong className="text-emerald-400">
                          {formatCurrency(Math.abs(result.salaryDifference))} less
                        </strong>{' '}
                        in {result.targetState} to maintain the same lifestyle
                      </span>
                    ) : (
                      <span>
                        You need{' '}
                        <strong className="text-red-400">
                          {formatCurrency(result.salaryDifference)} more
                        </strong>{' '}
                        in {result.targetState} to maintain the same lifestyle
                      </span>
                    )}
                  </div>
                  <div className="text-sm">
                    {result.taxSavings > 0 ? (
                      <span className="text-emerald-400">
                        Save {formatCurrency(result.taxSavings)}/yr in state taxes
                      </span>
                    ) : result.taxSavings < 0 ? (
                      <span className="text-red-400">
                        Pay {formatCurrency(Math.abs(result.taxSavings))}/yr more in state taxes
                      </span>
                    ) : (
                      <span className="text-muted-foreground">
                        No state tax difference
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Insight Card */}
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-emerald-400" />
                Relocation Insight
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              {result.taxSavings > 0 ? (
                <>
                  <p>
                    Moving from <strong className="text-foreground">{result.sourceState}</strong> to{' '}
                    <strong className="text-foreground">{result.targetState}</strong> saves you{' '}
                    <strong className="text-emerald-400">{formatCurrency(result.taxSavings)}</strong>{' '}
                    per year in state income taxes alone. This means you can accept a salary that is{' '}
                    <strong className="text-emerald-400">
                      {formatPercent(Math.abs(result.percentDifference))} lower
                    </strong>{' '}
                    and still take home the same pay.
                  </p>
                  <p>
                    Over a 10-year period, those state tax savings compound to approximately{' '}
                    <strong className="text-emerald-400">
                      {formatCurrency(result.taxSavings * 10)}
                    </strong>{' '}
                    — not accounting for salary increases, investment returns, or cost-of-living
                    differences.
                  </p>
                </>
              ) : result.taxSavings < 0 ? (
                <>
                  <p>
                    Moving from <strong className="text-foreground">{result.sourceState}</strong> to{' '}
                    <strong className="text-foreground">{result.targetState}</strong> would cost you an
                    additional{' '}
                    <strong className="text-red-400">
                      {formatCurrency(Math.abs(result.taxSavings))}
                    </strong>{' '}
                    per year in state income taxes. To maintain the same take-home pay, you would need
                    a salary that is{' '}
                    <strong className="text-red-400">
                      {formatPercent(result.percentDifference)} higher
                    </strong>
                    .
                  </p>
                  <p>
                    Over a 10-year period, the additional state tax burden amounts to approximately{' '}
                    <strong className="text-red-400">
                      {formatCurrency(Math.abs(result.taxSavings) * 10)}
                    </strong>
                    . Consider negotiating a higher salary or evaluating non-tax benefits of the
                    relocation.
                  </p>
                </>
              ) : (
                <p>
                  Both <strong className="text-foreground">{result.sourceState}</strong> and{' '}
                  <strong className="text-foreground">{result.targetState}</strong> have the same
                  state income tax burden. Your equivalent salary is the same as your current
                  salary. Consider other factors such as cost of living, property taxes, and sales
                  taxes when evaluating the relocation.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
