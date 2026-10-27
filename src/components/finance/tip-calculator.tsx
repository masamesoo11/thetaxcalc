'use client';

import { useMemo, useState } from 'react';
import {
  Calculator,
  DollarSign,
  Info,
  Minus,
  Percent,
  Plus,
  Receipt,
  Users,
  Utensils,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { tipSplit, pretaxTipBase } from '@/lib/utils-math';
import { formatCurrency } from '@/lib/finance-utils';

// ─── Constants ───────────────────────────────────────────────────────────────

const TIP_PRESETS = [10, 15, 18, 20, 25];

// ─── Component ───────────────────────────────────────────────────────────────

export function TipCalculator() {
  // ─── State ─────────────────────────────────────────────────────────────
  const [bill, setBill] = useState(50);
  const [tipPct, setTipPct] = useState(18);
  const [people, setPeople] = useState(1);
  const [tipOnPretax, setTipOnPretax] = useState(false);
  const [taxPct, setTaxPct] = useState(8.25);
  const [roundUp, setRoundUp] = useState(false);

  // ─── Live math (useMemo, no submit button) ─────────────────────────────
  const { safeBill, tipBase, taxPortion } = useMemo(() => {
    const safe = Number.isFinite(bill) ? Math.max(0, bill) : 0;
    const base = tipOnPretax ? pretaxTipBase(safe, taxPct) : safe;
    return { safeBill: safe, tipBase: base, taxPortion: safe - base };
  }, [bill, tipOnPretax, taxPct]);

  const exact = useMemo(
    () => tipSplit(safeBill, tipPct, people, false, { tipBase }),
    [safeBill, tipPct, people, tipBase]
  );

  const result = useMemo(
    () => tipSplit(safeBill, tipPct, people, roundUp, { tipBase }),
    [safeBill, tipPct, people, roundUp, tipBase]
  );

  // Quick-scan grid: the same split at the common preset rates (always
  // unrounded so the comparison stays apples-to-apples).
  const quickGrid = useMemo(
    () =>
      TIP_PRESETS.map((p) => ({
        pct: p,
        ...tipSplit(safeBill, p, people, false, { tipBase }),
      })),
    [safeBill, people, tipBase]
  );

  const roundUpExtraTip = result.tip - exact.tip;
  const roundUpExtraEach = result.perPerson - exact.perPerson;

  const clampPeople = (raw: string) => {
    const parsed = Math.floor(Number(raw));
    if (!Number.isFinite(parsed)) return 1;
    return Math.min(20, Math.max(1, parsed));
  };

  // ─── Render ────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* ─── Page Title ─────────────────────────── */}
      <div className="text-center">
        <h2 className="flex items-center justify-center gap-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          <Receipt className="h-8 w-8 text-amber-600" />
          Tip Calculator
        </h2>
        <p className="mt-2 text-muted-foreground">
          Split any bill with a tip — presets, a custom slider, pre-tax tip option, and round-up
          per person. Everything updates instantly.
        </p>
      </div>

      {/* ─── US etiquette quick take ────────────── */}
      <Card className="border-amber-500/20 bg-amber-500/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Utensils className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
            <div className="space-y-1 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Typical US tipping in 2026</p>
              <p>
                For full table service, a tip in the <strong>15&ndash;20%</strong> range of the
                pre-tax subtotal is the customary norm. Counter service and takeout are typically
                less &mdash; often 10&ndash;15% or nothing at all. Many restaurants add an{' '}
                <strong>18&ndash;20% automatic gratuity</strong> for large parties, so check the
                check before you double-tip.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ─── Input + Results Grid ──────────────── */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Left: form */}
        <div className="space-y-4 lg:col-span-2">
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calculator className="h-5 w-5 text-amber-600" />
                Your Bill
              </CardTitle>
              <CardDescription>Everything updates instantly</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Bill amount */}
              <div className="space-y-2">
                <Label htmlFor="tc-bill" className="text-sm font-medium">
                  <span className="flex items-center gap-1.5">
                    <DollarSign className="h-3.5 w-3.5 text-amber-600" />
                    Bill Amount
                  </span>
                </Label>
                <div className="relative max-w-xs">
                  <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="tc-bill"
                    type="number"
                    min="0"
                    step="0.01"
                    value={bill || ''}
                    onChange={(e) => setBill(Number(e.target.value) || 0)}
                    className="pl-9"
                    placeholder="50.00"
                    aria-label="Bill amount"
                  />
                </div>
              </div>

              {/* Tip percentage presets */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  <span className="flex items-center gap-1.5">
                    <Percent className="h-3.5 w-3.5 text-amber-600" />
                    Tip Percentage
                  </span>
                </Label>
                <div className="flex flex-wrap gap-2">
                  {TIP_PRESETS.map((p) => (
                    <Button
                      key={p}
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => setTipPct(p)}
                      aria-pressed={tipPct === p}
                      className={
                        tipPct === p
                          ? 'min-w-14 border-amber-500/60 bg-amber-500/15 font-semibold text-amber-700 hover:bg-amber-500/25 dark:text-amber-400'
                          : 'min-w-14 text-muted-foreground'
                      }
                    >
                      {p}%
                    </Button>
                  ))}
                </div>
              </div>

              {/* Custom tip slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="tc-tip-slider" className="text-sm font-medium">
                    Custom Tip (0&ndash;40%)
                  </Label>
                  <span className="rounded-md bg-amber-500/10 px-2 py-0.5 text-sm font-semibold text-amber-700 dark:text-amber-400">
                    {tipPct}%
                  </span>
                </div>
                <Slider
                  id="tc-tip-slider"
                  min={0}
                  max={40}
                  step={1}
                  value={[tipPct]}
                  onValueChange={(v) => setTipPct(v[0] ?? 0)}
                  aria-label="Custom tip percentage"
                />
                <p className="text-xs text-muted-foreground">
                  Drag for a custom rate &mdash; 15&ndash;20% is the customary table-service range.
                </p>
              </div>

              {/* Split between N people */}
              <div className="space-y-2">
                <Label htmlFor="tc-people" className="text-sm font-medium">
                  <span className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-amber-600" />
                    Split Between (people)
                  </span>
                </Label>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setPeople((p) => Math.max(1, p - 1))}
                    aria-label="One fewer person"
                    className="h-10 w-10"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    id="tc-people"
                    type="number"
                    min="1"
                    max="20"
                    step="1"
                    value={people}
                    onChange={(e) => setPeople(clampPeople(e.target.value))}
                    className="h-10 w-20 text-center"
                    aria-label="Number of people splitting the bill"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setPeople((p) => Math.min(20, p + 1))}
                    aria-label="One more person"
                    className="h-10 w-10"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <span className="text-xs text-muted-foreground">1&ndash;20</span>
                </div>
              </div>

              {/* Tip on pre-tax toggle */}
              <div className="space-y-3 rounded-lg border border-border/50 bg-background/60 p-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <Label htmlFor="tc-pretax" className="text-sm font-medium">
                      Tip on the pre-tax subtotal
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Back the sales tax out of the bill first &mdash; the customary method.
                    </p>
                  </div>
                  <Switch
                    id="tc-pretax"
                    checked={tipOnPretax}
                    onCheckedChange={setTipOnPretax}
                    aria-label="Tip on the pre-tax subtotal"
                  />
                </div>
                {tipOnPretax && (
                  <div className="space-y-2">
                    <Label htmlFor="tc-tax" className="text-xs font-medium">
                      Sales tax already included in the bill (%)
                    </Label>
                    <div className="relative max-w-[160px]">
                      <Percent className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="tc-tax"
                        type="number"
                        min="0"
                        max="15"
                        step="0.01"
                        value={taxPct}
                        onChange={(e) => setTaxPct(Number(e.target.value) || 0)}
                        className="h-9 pl-9 text-sm"
                        aria-label="Sales tax rate included in the bill"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Example: a $50.00 check at 8.25% has a {formatCurrency(taxPortion)} tax
                      portion, so the tip applies to {formatCurrency(tipBase)}.
                    </p>
                  </div>
                )}
              </div>

              {/* Round-up toggle */}
              <div className="flex items-center justify-between gap-3 rounded-lg border border-border/50 bg-background/60 p-3">
                <div className="space-y-0.5">
                  <Label htmlFor="tc-roundup" className="text-sm font-medium">
                    Round up each person&rsquo;s share
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Each share rounds up to the next whole dollar &mdash; the extra becomes tip.
                  </p>
                </div>
                <Switch
                  id="tc-roundup"
                  checked={roundUp}
                  onCheckedChange={setRoundUp}
                  aria-label="Round up each person's share"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: results */}
        <div className="space-y-4 lg:col-span-3">
          <Card className="border-amber-500/30 bg-card/80">
            <CardContent className="space-y-3 p-5">
              <div className="rounded-xl bg-amber-500/10 p-4 text-center border border-amber-500/20">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {people === 1 ? 'You Pay (Bill + Tip)' : 'Each Person Pays'}
                </p>
                <p className="mt-1 text-3xl font-bold text-amber-700 dark:text-amber-400">
                  {formatCurrency(result.perPerson)}
                </p>
                {people > 1 && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {formatCurrency(result.perPersonTip)} of that is the tip share
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                <div className="rounded-lg border border-border/40 bg-background/60 p-3">
                  <p className="text-xs text-muted-foreground">Tip Amount</p>
                  <p className="font-semibold text-amber-700 dark:text-amber-400">
                    {formatCurrency(result.tip)}
                  </p>
                </div>
                <div className="rounded-lg border border-border/40 bg-background/60 p-3">
                  <p className="text-xs text-muted-foreground">Total (Bill + Tip)</p>
                  <p className="font-semibold text-foreground">{formatCurrency(result.total)}</p>
                </div>
                <div className="rounded-lg border border-border/40 bg-background/60 p-3">
                  <p className="text-xs text-muted-foreground">Per-Person Tip</p>
                  <p className="font-semibold text-foreground">
                    {formatCurrency(result.perPersonTip)}
                  </p>
                </div>
                <div className="rounded-lg border border-border/40 bg-background/60 p-3">
                  <p className="text-xs text-muted-foreground">Bill Share</p>
                  <p className="font-semibold text-foreground">
                    {formatCurrency(safeBill / Math.max(1, people))}
                  </p>
                </div>
              </div>

              {tipOnPretax && (
                <div className="rounded-lg border border-border/40 bg-background/60 p-3 text-xs text-muted-foreground">
                  <p>
                    Tip base (pre-tax subtotal):{' '}
                    <strong className="text-foreground">{formatCurrency(tipBase)}</strong> &mdash;
                    the {tipPct}% applies here, not to the tax ({formatCurrency(taxPortion)} backed
                    out at {taxPct}%).
                  </p>
                </div>
              )}

              {roundUp && roundUpExtraTip > 0 && (
                <p className="text-center text-xs text-muted-foreground">
                  Rounding up adds{' '}
                  <strong className="text-amber-700 dark:text-amber-400">
                    {formatCurrency(roundUpExtraTip)}
                  </strong>{' '}
                  to the tip ({formatCurrency(roundUpExtraEach)} more per person).
                </p>
              )}
            </CardContent>
          </Card>

          {/* Quick-scan grid at the common preset rates */}
          <Card className="border-border/50 bg-card/80">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Quick Scan: This Bill at Common Tips</CardTitle>
              <CardDescription>
                Same bill, same split, at 10/15/18/20/25% (before any round-up)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-lg border border-border/40">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/60 backdrop-blur">
                        <th scope="col" className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                          Tip %
                        </th>
                        <th scope="col" className="px-4 py-2.5 text-right font-medium text-muted-foreground">
                          Tip
                        </th>
                        <th scope="col" className="px-4 py-2.5 text-right font-medium text-muted-foreground">
                          Total
                        </th>
                        <th scope="col" className="px-4 py-2.5 text-right font-medium text-muted-foreground">
                          {people === 1 ? 'You Pay' : 'Each Pays'}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {quickGrid.map((row) => (
                        <tr
                          key={row.pct}
                          className={
                            row.pct === tipPct
                              ? 'border-b border-border/20 bg-amber-500/10 last:border-b-0'
                              : 'border-b border-border/20 transition-colors hover:bg-amber-500/5 last:border-b-0'
                          }
                        >
                          <td className="px-4 py-2.5 font-semibold text-foreground">{row.pct}%</td>
                          <td className="px-4 py-2.5 text-right text-amber-700 dark:text-amber-400">
                            {formatCurrency(row.tip)}
                          </td>
                          <td className="px-4 py-2.5 text-right text-muted-foreground">
                            {formatCurrency(row.total)}
                          </td>
                          <td className="px-4 py-2.5 text-right font-semibold text-foreground">
                            {formatCurrency(row.perPerson)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Mental math shortcut: 10% of the bill is just the decimal moved one spot
                ($50.00 &rarr; $5.00); half of that is 5% ($2.50), so 15% = $7.50. For 20%, double
                the 10% figure.
              </p>
            </CardContent>
          </Card>

          {/* Etiquette context */}
          <Card className="border-border/50 bg-card/80">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">Good to know</p>
                  <p>
                    Tipping is voluntary in the US &mdash; these are customary norms, not legal
                    requirements. An automatic gratuity for large parties is a service charge, and
                    it already belongs to the bill, so read the check before adding a second tip.
                    Want to know how much tip you can comfortably afford? Check your{' '}
                    <a
                      href="/paycheck-calculator"
                      className="font-medium text-amber-700 underline underline-offset-2 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300"
                    >
                      full take-home pay
                    </a>
                    .
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
