'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeftRight,
  ArrowRight,
  Calculator,
  DollarSign,
  Equal,
  Info,
  Percent,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { pctChange, pctDifference, pctOf, applyPct } from '@/lib/utils-math';

// ─── Formatting helpers (round only at the display node) ─────────────────────

const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(v);

const fmtPct = (v: number) => `${v.toFixed(2)}%`;

const fmtPctSigned = (v: number) => `${v >= 0 ? '+' : ''}${v.toFixed(2)}%`;

// ─── Pay-raise cross-link strip (shared by tabs 1 and 2) ─────────────────────

function PayRaiseStrip() {
  return (
    <Card className="border-amber-500/20 bg-amber-500/5">
      <CardContent className="p-4">
        <div className="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-2">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
            <span>
              Thinking about a raise? A <strong className="text-foreground">$2/hr raise</strong> on
              2,080 hours ={' '}
              <strong className="text-amber-700 dark:text-amber-400">$4,160 a year</strong> before
              taxes.
            </span>
          </p>
          <div className="flex shrink-0 flex-wrap gap-2">
            <Button
              asChild
              size="sm"
              variant="outline"
              className="border-amber-500/40 text-amber-700 hover:bg-amber-500/10 dark:text-amber-400"
            >
              <Link href="/hourly-to-salary-calculator">
                Hourly to Salary
                <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant="outline"
              className="border-amber-500/40 text-amber-700 hover:bg-amber-500/10 dark:text-amber-400"
            >
              <Link href="/salary">
                Salary After Tax
                <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export function PercentageChangeCalculator() {
  // ─── State ─────────────────────────────────────────────────────────────
  const [increaseStart, setIncreaseStart] = useState(25);
  const [increasePct, setIncreasePct] = useState(5);
  const [direction, setDirection] = useState<'increase' | 'decrease'>('increase');
  const [changeFrom, setChangeFrom] = useState(50000);
  const [changeTo, setChangeTo] = useState(52000);
  const [diffA, setDiffA] = useState(60);
  const [diffB, setDiffB] = useState(50);
  const [ofX, setOfX] = useState(15);
  const [ofY, setOfY] = useState(2000);

  // ─── Tab 1: increase / decrease a value ────────────────────────────────
  const increaseResult = useMemo(
    () => applyPct(increaseStart, increasePct, direction),
    [increaseStart, increasePct, direction]
  );

  // ─── Tab 2: percent change between two numbers ─────────────────────────
  const changeResult = useMemo(() => {
    const pct = pctChange(changeFrom, changeTo);
    const absDiff = Math.abs(changeTo - changeFrom);
    const label = !Number.isFinite(pct)
      ? 'undefined'
      : pct > 0
        ? 'Increase'
        : pct < 0
          ? 'Decrease'
          : 'No change';
    return { pct, absDiff, label };
  }, [changeFrom, changeTo]);

  // ─── Tab 3: percentage difference (symmetric) ───────────────────────────
  const diffResult = useMemo(() => {
    const pct = pctDifference(diffA, diffB);
    const forward = pctChange(diffB, diffA); // B -> A
    const backward = pctChange(diffA, diffB); // A -> B
    return { pct, forward, backward };
  }, [diffA, diffB]);

  // ─── Tab 4: X% of Y ────────────────────────────────────────────────────
  const ofResult = useMemo(() => {
    const amount = pctOf(ofX, ofY);
    const afterDiscount = applyPct(ofY, ofX, 'decrease');
    return { amount, afterDiscount };
  }, [ofX, ofY]);

  // ─── Render ────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* ─── Page Title ─────────────────────────── */}
      <div className="text-center">
        <h2 className="flex items-center justify-center gap-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          <Percent className="h-8 w-8 text-amber-600" />
          Percentage Increase Calculator
        </h2>
        <p className="mt-2 text-muted-foreground">
          Increase or decrease a value by a percent, find the percent change between two numbers,
          the percentage difference, or X% of Y.
        </p>
      </div>

      <Tabs defaultValue="increase" className="space-y-4">
        <TabsList className="h-auto w-full flex-wrap justify-center gap-1 sm:justify-start">
          <TabsTrigger value="increase" className="min-w-0 flex-1 px-3 py-2 text-xs sm:flex-none sm:text-sm">
            Percentage Increase
          </TabsTrigger>
          <TabsTrigger value="change" className="min-w-0 flex-1 px-3 py-2 text-xs sm:flex-none sm:text-sm">
            Percent Change
          </TabsTrigger>
          <TabsTrigger value="difference" className="min-w-0 flex-1 px-3 py-2 text-xs sm:flex-none sm:text-sm">
            Percentage Difference
          </TabsTrigger>
          <TabsTrigger value="of" className="min-w-0 flex-1 px-3 py-2 text-xs sm:flex-none sm:text-sm">
            X% of Y
          </TabsTrigger>
        </TabsList>

        {/* ─── Tab 1: Percentage Increase ─────────── */}
        <TabsContent value="increase" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-5">
            <Card className="border-border/50 bg-card/80 backdrop-blur-sm lg:col-span-2">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calculator className="h-5 w-5 text-amber-600" />
                  Increase (or Decrease) a Value
                </CardTitle>
                <CardDescription>Everything updates instantly</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="pc-start" className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <DollarSign className="h-3.5 w-3.5 text-amber-600" />
                      Starting Value
                    </span>
                  </Label>
                  <Input
                    id="pc-start"
                    type="number"
                    step="0.01"
                    value={increaseStart || ''}
                    onChange={(e) => setIncreaseStart(Number(e.target.value) || 0)}
                    placeholder="25"
                    aria-label="Starting value"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pc-pct" className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <Percent className="h-3.5 w-3.5 text-amber-600" />
                      Percent Change
                    </span>
                  </Label>
                  <Input
                    id="pc-pct"
                    type="number"
                    step="0.01"
                    value={increasePct || ''}
                    onChange={(e) => setIncreasePct(Number(e.target.value) || 0)}
                    placeholder="5"
                    aria-label="Percent change"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Direction</Label>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => setDirection('increase')}
                      aria-pressed={direction === 'increase'}
                      className={
                        direction === 'increase'
                          ? 'border-amber-500/60 bg-amber-500/15 font-semibold text-amber-700 dark:text-amber-400'
                          : 'text-muted-foreground'
                      }
                    >
                      <TrendingUp className="mr-1 h-3.5 w-3.5" />
                      Increase
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => setDirection('decrease')}
                      aria-pressed={direction === 'decrease'}
                      className={
                        direction === 'decrease'
                          ? 'border-amber-500/60 bg-amber-500/15 font-semibold text-amber-700 dark:text-amber-400'
                          : 'text-muted-foreground'
                      }
                    >
                      <TrendingDown className="mr-1 h-3.5 w-3.5" />
                      Decrease
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-amber-500/30 bg-card/80 lg:col-span-3">
              <CardContent className="space-y-3 p-5">
                <div className="rounded-xl bg-amber-500/10 p-4 text-center border border-amber-500/20">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    New Value
                  </p>
                  <p className="mt-1 text-3xl font-bold text-amber-700 dark:text-amber-400">
                    {fmt(increaseResult)}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {fmt(increaseStart)}{' '}
                    {direction === 'increase' ? 'increased' : 'decreased'} by{' '}
                    {fmt(increasePct)}% = {fmt(increaseResult)}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg border border-border/40 bg-background/60 p-3">
                    <p className="text-xs text-muted-foreground">Starting Value</p>
                    <p className="font-semibold text-foreground">{fmt(increaseStart)}</p>
                  </div>
                  <div className="rounded-lg border border-border/40 bg-background/60 p-3">
                    <p className="text-xs text-muted-foreground">Amount Added (or Removed)</p>
                    <p className="font-semibold text-foreground">
                      {fmt(Math.abs(increaseResult - increaseStart))}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <PayRaiseStrip />
        </TabsContent>

        {/* ─── Tab 2: Percent Change ─────────────── */}
        <TabsContent value="change" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-5">
            <Card className="border-border/50 bg-card/80 backdrop-blur-sm lg:col-span-2">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ArrowLeftRight className="h-5 w-5 text-amber-600" />
                  From One Number to Another
                </CardTitle>
                <CardDescription>Old value vs. new value</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="pc-from" className="text-sm font-medium">
                    From (original value)
                  </Label>
                  <Input
                    id="pc-from"
                    type="number"
                    step="1"
                    value={changeFrom || ''}
                    onChange={(e) => setChangeFrom(Number(e.target.value) || 0)}
                    placeholder="50000"
                    aria-label="Original value"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pc-to" className="text-sm font-medium">
                    To (new value)
                  </Label>
                  <Input
                    id="pc-to"
                    type="number"
                    step="1"
                    value={changeTo || ''}
                    onChange={(e) => setChangeTo(Number(e.target.value) || 0)}
                    placeholder="52000"
                    aria-label="New value"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-amber-500/30 bg-card/80 lg:col-span-3">
              <CardContent className="space-y-3 p-5">
                <div className="rounded-xl bg-amber-500/10 p-4 text-center border border-amber-500/20">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Percent Change
                  </p>
                  {Number.isFinite(changeResult.pct) ? (
                    <>
                      <p
                        className={`mt-1 text-3xl font-bold ${
                          changeResult.pct >= 0
                            ? 'text-emerald-700 dark:text-emerald-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}
                      >
                        {fmtPctSigned(changeResult.pct)}
                      </p>
                      <p className="mt-2 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
                        {changeResult.pct >= 0 ? (
                          <TrendingUp className="h-4 w-4 text-emerald-600" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500" />
                        )}
                        {changeResult.label} &mdash; {fmt(changeFrom)} to {fmt(changeTo)}
                      </p>
                    </>
                  ) : (
                    <p className="mt-2 text-sm text-muted-foreground">
                      A percent change from zero is undefined &mdash; enter a non-zero original
                      value.
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg border border-border/40 bg-background/60 p-3">
                    <p className="text-xs text-muted-foreground">Absolute Difference</p>
                    <p className="font-semibold text-foreground">{fmt(changeResult.absDiff)}</p>
                  </div>
                  <div className="rounded-lg border border-border/40 bg-background/60 p-3">
                    <p className="text-xs text-muted-foreground">Direction</p>
                    <p className="font-semibold text-foreground">{changeResult.label}</p>
                  </div>
                </div>
                <p className="text-center text-xs text-muted-foreground">
                  Going the other way is a different percent: {fmt(changeFrom)} back down to{' '}
                  {fmt(changeTo)} would be {fmtPctSigned(pctChange(changeTo, changeFrom))}.
                </p>
              </CardContent>
            </Card>
          </div>
          <PayRaiseStrip />
        </TabsContent>

        {/* ─── Tab 3: Percentage Difference ───────── */}
        <TabsContent value="difference" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-5">
            <Card className="border-border/50 bg-card/80 backdrop-blur-sm lg:col-span-2">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Equal className="h-5 w-5 text-amber-600" />
                  Two Values, No Direction
                </CardTitle>
                <CardDescription>Relative to the average of the two</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="pc-diff-a" className="text-sm font-medium">
                    First Value
                  </Label>
                  <Input
                    id="pc-diff-a"
                    type="number"
                    step="0.01"
                    value={diffA || ''}
                    onChange={(e) => setDiffA(Number(e.target.value) || 0)}
                    placeholder="60"
                    aria-label="First value"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pc-diff-b" className="text-sm font-medium">
                    Second Value
                  </Label>
                  <Input
                    id="pc-diff-b"
                    type="number"
                    step="0.01"
                    value={diffB || ''}
                    onChange={(e) => setDiffB(Number(e.target.value) || 0)}
                    placeholder="50"
                    aria-label="Second value"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-amber-500/30 bg-card/80 lg:col-span-3">
              <CardContent className="space-y-3 p-5">
                <div className="rounded-xl bg-amber-500/10 p-4 text-center border border-amber-500/20">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Percentage Difference
                  </p>
                  <p className="mt-1 text-3xl font-bold text-amber-700 dark:text-amber-400">
                    {fmtPct(diffResult.pct)}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    |{fmt(diffA)} &minus; {fmt(diffB)}| &divide; average of the two
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg border border-border/40 bg-background/60 p-3">
                    <p className="text-xs text-muted-foreground">Gap (absolute)</p>
                    <p className="font-semibold text-foreground">
                      {fmt(Math.abs(diffA - diffB))}
                    </p>
                  </div>
                  <div className="rounded-lg border border-border/40 bg-background/60 p-3">
                    <p className="text-xs text-muted-foreground">Average of the Two</p>
                    <p className="font-semibold text-foreground">
                      {fmt((diffA + diffB) / 2)}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  This is NOT the same as percent change, which depends on direction: going{' '}
                  {fmt(diffB)} to {fmt(diffA)} is {fmtPctSigned(diffResult.forward)}, while{' '}
                  {fmt(diffA)} to {fmt(diffB)} is {fmtPctSigned(diffResult.backward)}. The
                  difference formula is symmetric &mdash; use it when neither value is clearly the
                  &ldquo;before&rdquo; number.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ─── Tab 4: X% of Y ─────────────────────── */}
        <TabsContent value="of" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-5">
            <Card className="border-border/50 bg-card/80 backdrop-blur-sm lg:col-span-2">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Percent className="h-5 w-5 text-amber-600" />
                  What Is X% of Y?
                </CardTitle>
                <CardDescription>The everyday workhorse</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="pc-of-x" className="text-sm font-medium">
                    X (percent)
                  </Label>
                  <Input
                    id="pc-of-x"
                    type="number"
                    step="0.01"
                    value={ofX || ''}
                    onChange={(e) => setOfX(Number(e.target.value) || 0)}
                    placeholder="15"
                    aria-label="Percent"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pc-of-y" className="text-sm font-medium">
                    Y (the value)
                  </Label>
                  <Input
                    id="pc-of-y"
                    type="number"
                    step="0.01"
                    value={ofY || ''}
                    onChange={(e) => setOfY(Number(e.target.value) || 0)}
                    placeholder="2000"
                    aria-label="Value"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-amber-500/30 bg-card/80 lg:col-span-3">
              <CardContent className="space-y-3 p-5">
                <div className="rounded-xl bg-amber-500/10 p-4 text-center border border-amber-500/20">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Result
                  </p>
                  <p className="mt-1 text-3xl font-bold text-amber-700 dark:text-amber-400">
                    {fmt(ofResult.amount)}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {fmt(ofX)}% of {fmt(ofY)} = {fmt(ofResult.amount)}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg border border-border/40 bg-background/60 p-3">
                    <p className="text-xs text-muted-foreground">Mental Math (10% First)</p>
                    <p className="font-semibold text-foreground">{fmt(pctOf(10, ofY))}</p>
                  </div>
                  <div className="rounded-lg border border-border/40 bg-background/60 p-3">
                    <p className="text-xs text-muted-foreground">
                      Y minus this {fmt(ofX)}%
                    </p>
                    <p className="font-semibold text-foreground">{fmt(ofResult.afterDiscount)}</p>
                  </div>
                </div>
                <p className="text-center text-xs text-muted-foreground">
                  Handy for discounts: taking {fmt(ofX)}% off {fmt(ofY)} leaves{' '}
                  {fmt(ofResult.afterDiscount)}.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
