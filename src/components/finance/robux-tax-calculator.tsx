'use client';

import { useMemo, useState } from 'react';
import {
  Calculator,
  Coins,
  Info,
  Percent,
  Sparkles,
  Target,
  Wallet,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  CREATOR_KEEP_RATE,
  DEVEX_PREMIUM_RATE,
  DEVEX_STANDARD_RATE,
  MARKETPLACE_FEE_RATE,
  SE_TAX_FILING_THRESHOLD,
  devexUsd,
  effectiveUsdPerListedRobux,
  marketplaceFee,
  requiredListPrice,
  type DevexTier,
} from '@/lib/robux-math';

// ─── Display helpers ──────────────────────────────────────────────────────

const fmtRobux = (n: number) =>
  `R$${Math.round(n).toLocaleString('en-US')}`;
const fmtRobux2 = (n: number) =>
  `R$${n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
const fmtUsd = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

const QUICK_AMOUNTS = [100, 500, 1000, 5000, 10000];

// ─── Component ────────────────────────────────────────────────────────────

type Mode = 'sale' | 'target' | 'devex';

export function RobuxTaxCalculator() {
  const [mode, setMode] = useState<Mode>('sale');
  const [listPrice, setListPrice] = useState(1000);
  const [target, setTarget] = useState(1000);
  const [balance, setBalance] = useState(100000);
  const [tier, setTier] = useState<DevexTier>('standard');

  // ─── Live math ────────────────────────────────────────────────────────
  const sale = useMemo(() => marketplaceFee(listPrice), [listPrice]);
  const needed = useMemo(() => requiredListPrice(target), [target]);
  const cashOut = useMemo(() => devexUsd(balance, tier), [balance, tier]);
  const perListed = useMemo(() => effectiveUsdPerListedRobux(tier), [tier]);

  const inputValue =
    mode === 'sale' ? listPrice : mode === 'target' ? target : balance;
  const setInput = (v: number) => {
    if (mode === 'sale') setListPrice(v);
    else if (mode === 'target') setTarget(v);
    else setBalance(v);
  };

  return (
    <div className="space-y-6">
      {/* ─── Page Title ─────────────────────────────────── */}
      <div className="text-center">
        <h2 className="flex items-center justify-center gap-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          <Sparkles className="h-8 w-8 text-emerald-600" />
          Robux Tax Calculator
        </h2>
        <p className="mt-2 text-muted-foreground">
          Roblox takes a 30% marketplace fee on every sale. See exactly what you keep, reverse
          your target price, or convert Robux to real money through DevEx — instantly.
        </p>
      </div>

      {/* ─── Mode Tabs ──────────────────────────────────── */}
      <div className="flex flex-wrap justify-center gap-2">
        <Button
          variant={mode === 'sale' ? 'default' : 'outline'}
          onClick={() => setMode('sale')}
          className="gap-2"
        >
          <Coins className="h-4 w-4" />
          After a sale
        </Button>
        <Button
          variant={mode === 'target' ? 'default' : 'outline'}
          onClick={() => setMode('target')}
          className="gap-2"
        >
          <Target className="h-4 w-4" />
          Hit a target
        </Button>
        <Button
          variant={mode === 'devex' ? 'default' : 'outline'}
          onClick={() => setMode('devex')}
          className="gap-2"
        >
          <Wallet className="h-4 w-4" />
          Cash out (DevEx)
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
                {mode === 'sale' && 'Your item\u2019s list price'}
                {mode === 'target' && 'Robux you want to take home'}
                {mode === 'devex' && 'Your Robux balance'}
              </CardTitle>
              <CardDescription>
                {mode === 'sale' && 'Game pass, developer product or catalog item'}
                {mode === 'target' && 'The fee is already baked into the answer'}
                {mode === 'devex' && 'DevEx converts earned Robux to USD'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="robux-input">
                  {mode === 'devex' ? 'Robux to cash out' : 'Amount in Robux'}
                </Label>
                <Input
                  id="robux-input"
                  type="number"
                  min={0}
                  value={inputValue || ''}
                  onChange={(e) => setInput(Number(e.target.value))}
                  className="text-lg font-semibold"
                  aria-label="Amount in Robux"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {QUICK_AMOUNTS.map((a) => (
                  <Button
                    key={a}
                    variant="outline"
                    size="sm"
                    onClick={() => setInput(a)}
                    className="h-8 px-3"
                  >
                    {fmtRobux(a)}
                  </Button>
                ))}
              </div>
              {mode === 'devex' && (
                <div className="space-y-2">
                  <Label>DevEx tier</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={tier === 'standard' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setTier('standard')}
                    >
                      Standard ($0.0035/R$)
                    </Button>
                    <Button
                      variant={tier === 'premium' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setTier('premium')}
                    >
                      Premium ($0.00385/R$)
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Percent className="h-4 w-4 text-emerald-600" />
                The numbers Roblox uses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between gap-2">
                  <dt className="text-muted-foreground">Marketplace fee</dt>
                  <dd className="font-semibold">30%</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-muted-foreground">You keep per sale</dt>
                  <dd className="font-semibold">70%</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-muted-foreground">DevEx standard</dt>
                  <dd className="font-semibold">$0.0035 per R$</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-muted-foreground">DevEx premium</dt>
                  <dd className="font-semibold">$0.00385 per R$</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-muted-foreground">Effective per listed R$</dt>
                  <dd className="font-semibold">${perListed.toFixed(5)}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>

        {/* Right: results */}
        <div className="min-w-0 space-y-4 lg:col-span-3">
          {mode === 'sale' && (
            <Card className="border-emerald-500/30 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/40 dark:to-card">
              <CardContent className="pt-6">
                <p className="text-center text-sm font-medium uppercase tracking-wide text-muted-foreground">
                  You take home
                </p>
                <p className="mt-2 text-center text-5xl font-bold tabular-nums text-emerald-700 dark:text-emerald-400">
                  {fmtRobux(sale.netRobux)}
                </p>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  out of your {fmtRobux(sale.listRobux)} list price
                </p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-border/60 bg-card p-4 text-center min-w-0">
                    <p className="text-xs text-muted-foreground">Roblox takes (30%)</p>
                    <p className="mt-1 text-2xl font-bold tabular-nums text-red-600 dark:text-red-400">
                      {fmtRobux(sale.feeRobux)}
                    </p>
                  </div>
                  <div className="rounded-lg border border-border/60 bg-card p-4 text-center min-w-0">
                    <p className="text-xs text-muted-foreground">You keep (70%)</p>
                    <p className="mt-1 text-2xl font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
                      {fmtRobux(sale.netRobux)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {mode === 'target' && (
            <Card className="border-emerald-500/30 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/40 dark:to-card">
              <CardContent className="pt-6">
                <p className="text-center text-sm font-medium uppercase tracking-wide text-muted-foreground">
                  List your item at
                </p>
                <p className="mt-2 text-center text-5xl font-bold tabular-nums text-emerald-700 dark:text-emerald-400">
                  {fmtRobux2(needed)}
                </p>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  to take home {fmtRobux(target)} after the 30% fee
                </p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-border/60 bg-card p-4 text-center min-w-0">
                    <p className="text-xs text-muted-foreground">Buyer pays</p>
                    <p className="mt-1 text-2xl font-bold tabular-nums">{fmtRobux2(needed)}</p>
                  </div>
                  <div className="rounded-lg border border-border/60 bg-card p-4 text-center min-w-0">
                    <p className="text-xs text-muted-foreground">Fee built in</p>
                    <p className="mt-1 text-2xl font-bold tabular-nums text-red-600 dark:text-red-400">
                      {fmtRobux2(needed - target)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {mode === 'devex' && (
            <Card className="border-emerald-500/30 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/40 dark:to-card">
              <CardContent className="pt-6">
                <p className="text-center text-sm font-medium uppercase tracking-wide text-muted-foreground">
                  Your cash-out value
                </p>
                <p className="mt-2 text-center text-5xl font-bold tabular-nums text-emerald-700 dark:text-emerald-400">
                  {fmtUsd(cashOut)}
                </p>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  {fmtRobux(balance)} at {tier === 'premium' ? '$0.00385' : '$0.0035'} per Robux
                  ({tier} DevEx)
                </p>
                <div className="mt-6 overflow-x-auto rounded-lg border border-border/60">
                  <table className="w-full min-w-[320px] text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="px-3 py-2 text-left font-medium">Balance</th>
                        <th className="px-3 py-2 text-right font-medium">Standard</th>
                        <th className="px-3 py-2 text-right font-medium">Premium</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1000, 10000, 100000].map((amount) => (
                        <tr key={amount} className="border-b border-border/40 last:border-0">
                          <td className="px-3 py-2 font-medium">{fmtRobux(amount)}</td>
                          <td className="px-3 py-2 text-right tabular-nums">
                            {fmtUsd(devexUsd(amount, 'standard'))}
                          </td>
                          <td className="px-3 py-2 text-right tabular-nums">
                            {fmtUsd(devexUsd(amount, 'premium'))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Info className="h-4 w-4 text-emerald-600" />
                Is the Robux fee really a tax?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                The 30% deduction is Roblox&apos;s marketplace fee, not a government tax. It
                applies to game passes, developer products and catalog sales alike —
                {` Premium subscribers still pay it on sales, though engagement-based Premium Payouts skip it.`}
              </p>
              <p>
                Real taxes only enter when you cash out: DevEx payouts count as self-employment
                income, and once you clear{' '}
                <strong className="text-foreground">
                  {fmtUsd(SE_TAX_FILING_THRESHOLD)} net
                </strong>{' '}
                of freelance earnings the 15.3% self-employment tax applies. Estimate that side
                with our{' '}
                <a href="/self-employment-tax-calculator" className="font-medium text-emerald-600 underline-offset-4 hover:underline">
                  self-employment tax calculator
                </a>
                , or read the full{' '}
                <a href="/blog/robux-tax-calculator-guide-2026" className="font-medium text-emerald-600 underline-offset-4 hover:underline">
                  Robux fee guide
                </a>
                .
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
