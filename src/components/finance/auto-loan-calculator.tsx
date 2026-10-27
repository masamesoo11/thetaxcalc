'use client';

import { useMemo, useState } from 'react';
import {
  Car,
  Calculator,
  DollarSign,
  Percent,
  Info,
  Zap,
  Clock,
  BadgeDollarSign,
  TrendingDown,
  ListOrdered,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  buildAmortization,
  formatTerm,
  formatUsd,
  yearlySummary,
  type AmortizationSchedule,
} from '@/lib/loan-math';

const TERM_OPTIONS = [36, 48, 60, 72, 84];
const CHIP_EXTRAS = [25, 50, 100];

/**
 * Auto loan calculator.
 *
 * Amount financed = price - down payment - trade-in + sales tax on
 * (price - trade-in) + dealer fees, then amortized with the standard
 * fixed-rate annuity from loan-math.
 */
export function AutoLoanCalculator() {
  const [vehiclePrice, setVehiclePrice] = useState(35000);
  const [downPayment, setDownPayment] = useState(3500);
  const [tradeIn, setTradeIn] = useState(0);
  const [salesTaxPct, setSalesTaxPct] = useState(0);
  const [dealerFees, setDealerFees] = useState(0);
  const [aprPct, setAprPct] = useState(6.5);
  const [termMonths, setTermMonths] = useState(60);
  const [appliedExtra, setAppliedExtra] = useState(0);

  const amountFinanced = useMemo(() => {
    const price = Math.max(0, vehiclePrice);
    const down = Math.max(0, downPayment);
    const trade = Math.max(0, tradeIn);
    const taxable = Math.max(0, price - trade);
    const tax = (Math.max(0, salesTaxPct) / 100) * taxable;
    const financed = price - down - trade + tax + Math.max(0, dealerFees);
    return Math.max(0, financed);
  }, [vehiclePrice, downPayment, tradeIn, salesTaxPct, dealerFees]);

  const salesTaxAmount = useMemo(() => {
    const price = Math.max(0, vehiclePrice);
    const trade = Math.max(0, tradeIn);
    return (Math.max(0, salesTaxPct) / 100) * Math.max(0, price - trade);
  }, [vehiclePrice, tradeIn, salesTaxPct]);

  const base: AmortizationSchedule = useMemo(
    () => buildAmortization(amountFinanced, aprPct, termMonths),
    [amountFinanced, aprPct, termMonths]
  );

  const withExtra: AmortizationSchedule = useMemo(
    () => buildAmortization(amountFinanced, aprPct, termMonths, appliedExtra),
    [amountFinanced, aprPct, termMonths, appliedExtra]
  );

  // Pay $X more per month: months and interest saved for each quick chip.
  const chipScenarios = useMemo(
    () =>
      CHIP_EXTRAS.map((extra) => {
        const schedule = buildAmortization(amountFinanced, aprPct, termMonths, extra);
        return {
          extra,
          monthsSaved: base.totals.months - schedule.totals.months,
          interestSaved: base.totals.totalInterest - schedule.totals.totalInterest,
        };
      }),
    [amountFinanced, aprPct, termMonths, base]
  );

  const yearly = useMemo(() => yearlySummary(base.rows), [base]);

  const totalCost = base.totals.totalPaid + Math.max(0, downPayment);

  return (
    <div className="space-y-6">
      {/* ─── Title ─────────────────────────────────────────── */}
      <div className="text-center">
        <h2 className="flex items-center justify-center gap-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          <Car className="h-8 w-8 text-emerald-600" />
          Auto Loan Calculator
        </h2>
        <p className="mt-2 text-muted-foreground">
          Car payment, total interest and payoff schedule — with sales tax, trade-in and dealer
          fees built in
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <Badge className="border-amber-500/30 bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-700">
            <BadgeDollarSign className="mr-1 h-3 w-3" />
            Trade-In Tax Savings
          </Badge>
          <Badge className="border-emerald-500/30 bg-emerald-600/20 px-3 py-1 text-xs font-semibold text-emerald-700">
            <Zap className="mr-1 h-3 w-3" />
            Extra-Payment Impact
          </Badge>
        </div>
      </div>

      {/* ─── How the math works ────────────────────────────── */}
      <Card className="border-emerald-500/20 bg-emerald-600/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
            <div className="space-y-1 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">How the Car Payment Is Calculated</p>
              <p>
                Amount financed = vehicle price minus your down payment and trade-in, plus sales
                tax on (price minus trade-in) and any dealer fees. The payment then follows the
                standard annuity formula{' '}
                <strong className="font-mono text-emerald-600">
                  M = P x [r(1+r)^n] / [(1+r)^n - 1]
                </strong>{' '}
                where r is APR / 12 and n is the number of payments. Most states charge sales tax
                only on the price left after your trade-in is subtracted, which this calculator
                applies automatically.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ─── Inputs + results ──────────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Inputs */}
        <div className="min-w-0 space-y-4 lg:col-span-2">
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calculator className="h-5 w-5 text-emerald-600" />
                Deal Details
              </CardTitle>
              <CardDescription>Adjust any value for instant results</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="al-price" className="text-sm font-medium">
                  Vehicle Price
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="al-price"
                    type="number"
                    min={0}
                    step={500}
                    value={vehiclePrice || ''}
                    onChange={(e) => setVehiclePrice(Number(e.target.value) || 0)}
                    className="pl-9"
                    aria-label="Vehicle price"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="al-down" className="text-sm font-medium">
                    Down Payment
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="al-down"
                      type="number"
                      min={0}
                      step={250}
                      value={downPayment || ''}
                      onChange={(e) => setDownPayment(Number(e.target.value) || 0)}
                      className="pl-9"
                      aria-label="Down payment"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="al-trade" className="text-sm font-medium">
                    Trade-In Value
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="al-trade"
                      type="number"
                      min={0}
                      step={250}
                      value={tradeIn || ''}
                      onChange={(e) => setTradeIn(Number(e.target.value) || 0)}
                      className="pl-9"
                      aria-label="Trade-in value"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="al-tax" className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <Percent className="h-3.5 w-3.5 text-emerald-600" />
                      Sales Tax %
                    </span>
                  </Label>
                  <Input
                    id="al-tax"
                    type="number"
                    min={0}
                    max={12}
                    step={0.25}
                    value={salesTaxPct || ''}
                    onChange={(e) => setSalesTaxPct(Number(e.target.value) || 0)}
                    aria-label="Sales tax percentage"
                  />
                  <p className="text-xs text-muted-foreground">
                    Most states tax price minus trade-in
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="al-fees" className="text-sm font-medium">
                    Dealer Fees
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="al-fees"
                      type="number"
                      min={0}
                      step={50}
                      value={dealerFees || ''}
                      onChange={(e) => setDealerFees(Number(e.target.value) || 0)}
                      className="pl-9"
                      aria-label="Dealer fees"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="al-apr" className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <Percent className="h-3.5 w-3.5 text-emerald-600" />
                      APR %
                    </span>
                  </Label>
                  <Input
                    id="al-apr"
                    type="number"
                    min={0}
                    max={30}
                    step={0.1}
                    value={aprPct || ''}
                    onChange={(e) => setAprPct(Number(e.target.value) || 0)}
                    aria-label="Annual percentage rate"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="al-term" className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-emerald-600" />
                      Term
                    </span>
                  </Label>
                  <Select
                    value={String(termMonths)}
                    onValueChange={(v) => setTermMonths(Number(v))}
                  >
                    <SelectTrigger id="al-term" aria-label="Loan term">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TERM_OPTIONS.map((m) => (
                        <SelectItem key={m} value={String(m)}>
                          {m} months ({m / 12} yrs)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Amount financed breakdown */}
          <Card className="border-border/50 bg-card/80">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <ListOrdered className="h-5 w-5 text-emerald-600" />
                Amount Financed Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Vehicle price</span>
                  <span className="font-medium text-foreground">
                    {formatUsd(Math.max(0, vehiclePrice))}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Down payment</span>
                  <span className="font-medium text-foreground">
                    &minus;{formatUsd(Math.max(0, downPayment))}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Trade-in value</span>
                  <span className="font-medium text-foreground">
                    &minus;{formatUsd(Math.max(0, tradeIn))}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Sales tax on (price &minus; trade-in)
                  </span>
                  <span className="font-medium text-foreground">+{formatUsd(salesTaxAmount)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Dealer fees</span>
                  <span className="font-medium text-foreground">
                    +{formatUsd(Math.max(0, dealerFees))}
                  </span>
                </div>
                <Separator className="bg-border/40" />
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">Amount financed</span>
                  <span className="text-base font-bold text-foreground">
                    {formatUsd(amountFinanced)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="min-w-0 lg:col-span-3">
          <Card className="sticky top-20 border-emerald-500/20 bg-card/90 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Car className="h-5 w-5 text-emerald-600" />
                Car Payment Summary
              </CardTitle>
              <CardDescription>
                {formatUsd(amountFinanced)} at {aprPct}% APR for {termMonths} months
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-xl bg-emerald-600/10 p-4 text-center">
                <p className="text-xs font-medium uppercase tracking-wider text-emerald-600/80">
                  Monthly Payment
                </p>
                <p className="mt-1 text-3xl font-bold text-emerald-600 sm:text-4xl">
                  {formatUsd(base.basePayment)}
                </p>
                {appliedExtra > 0 && (
                  <p className="mt-1 text-xs font-medium text-amber-700">
                    With +{formatUsd(appliedExtra, 0)}/mo extra: {formatUsd(base.basePayment + appliedExtra)} total
                  </p>
                )}
              </div>

              <div className="space-y-2.5 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total interest paid</span>
                  <span className="font-semibold text-red-600">
                    {formatUsd(base.totals.totalInterest)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total of {base.totals.months} payments</span>
                  <span className="font-semibold text-foreground">
                    {formatUsd(base.totals.totalPaid)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Total cost (down payment + all payments)
                  </span>
                  <span className="font-semibold text-foreground">{formatUsd(totalCost)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Principal vs Interest
                </p>
                <div className="flex h-3 overflow-hidden rounded-full bg-muted">
                  <div
                    className="bg-emerald-600 transition-all"
                    style={{
                      width: `${amountFinanced > 0 ? (amountFinanced / base.totals.totalPaid) * 100 : 0}%`,
                    }}
                  />
                  <div
                    className="bg-red-400 transition-all"
                    style={{
                      width: `${amountFinanced > 0 ? (base.totals.totalInterest / base.totals.totalPaid) * 100 : 0}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Principal {formatUsd(amountFinanced)}</span>
                  <span>Interest {formatUsd(base.totals.totalInterest)}</span>
                </div>
              </div>

              {appliedExtra > 0 && (
                <>
                  <Separator className="bg-border/40" />
                  <div className="space-y-2.5 rounded-lg bg-amber-500/5 p-3 text-sm">
                    <p className="text-xs font-medium uppercase tracking-wider text-amber-700">
                      With +{formatUsd(appliedExtra, 0)}/mo Extra Principal
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Payoff time</span>
                      <span className="font-semibold text-foreground">
                        {withExtra.totals.months} months (
                        {formatTerm(withExtra.totals.months)})
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Months saved</span>
                      <span className="font-semibold text-emerald-600">
                        {base.totals.months - withExtra.totals.months} months
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Interest saved</span>
                      <span className="font-semibold text-emerald-600">
                        {formatUsd(base.totals.totalInterest - withExtra.totals.totalInterest)}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ─── Pay-more quick chips ──────────────────────────── */}
      <Card className="border-amber-500/30 bg-amber-500/5">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Zap className="h-5 w-5 text-amber-700" />
            Pay a Little More Each Month
          </CardTitle>
          <CardDescription>
            Extra dollars go straight to principal — click a chip to apply it to the summary above
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            {chipScenarios.map((chip) => {
              const active = appliedExtra === chip.extra;
              return (
                <button
                  key={chip.extra}
                  type="button"
                  onClick={() => setAppliedExtra(active ? 0 : chip.extra)}
                  aria-pressed={active}
                  className={`rounded-xl border p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${
                    active
                      ? 'border-amber-500/60 bg-amber-500/15'
                      : 'border-border/50 bg-background/60'
                  }`}
                >
                  <p className="text-sm font-semibold text-foreground">
                    +{formatUsd(chip.extra, 0)}/mo
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">Months saved</p>
                  <p className="text-xl font-bold text-amber-700">
                    {chip.monthsSaved > 0 ? `${chip.monthsSaved} mo` : '0 mo'}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">Interest saved</p>
                  <p className="text-lg font-bold text-emerald-600">
                    {formatUsd(Math.max(0, chip.interestSaved))}
                  </p>
                  <p className="mt-2 text-xs font-medium text-muted-foreground">
                    {active ? 'Applied — click to remove' : 'Click to apply'}
                  </p>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* ─── First-year schedule + yearly bars ────────────── */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="min-w-0 border-border/50 bg-card/80">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">First-Year Payment Schedule</CardTitle>
            <CardDescription>Months 1-12, interest first then principal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-lg border border-border/40">
              <table className="w-full min-w-[520px] text-sm">
                <thead className="sticky top-0">
                  <tr className="bg-muted/60 backdrop-blur">
                    <th className="px-3 py-2.5 text-left font-medium text-muted-foreground">Mo</th>
                    <th className="px-3 py-2.5 text-right font-medium text-muted-foreground">
                      Payment
                    </th>
                    <th className="px-3 py-2.5 text-right font-medium text-muted-foreground">
                      Interest
                    </th>
                    <th className="px-3 py-2.5 text-right font-medium text-muted-foreground">
                      Principal
                    </th>
                    <th className="px-3 py-2.5 text-right font-medium text-muted-foreground">
                      Balance
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {base.rows.slice(0, 12).map((row) => (
                    <tr
                      key={row.month}
                      className="border-b border-border/20 transition-colors hover:bg-emerald-600/5"
                    >
                      <td className="px-3 py-2.5 font-semibold text-foreground">{row.month}</td>
                      <td className="px-3 py-2.5 text-right text-muted-foreground">
                        {formatUsd(row.payment)}
                      </td>
                      <td className="px-3 py-2.5 text-right text-red-600">
                        {formatUsd(row.interest)}
                      </td>
                      <td className="px-3 py-2.5 text-right text-emerald-700">
                        {formatUsd(row.principal)}
                      </td>
                      <td className="px-3 py-2.5 text-right font-semibold text-foreground">
                        {formatUsd(row.balance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              The interest column shrinks every month because interest is charged on the remaining
              balance, not the original loan amount.
            </p>
          </CardContent>
        </Card>

        <YearlyPrincipalInterestChart yearly={yearly} />
      </div>

      {/* ─── Explainer ────────────────────────────────────── */}
      <Card className="border-border/50 bg-card/80">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingDown className="h-5 w-5 text-emerald-600" />
            Shorter Terms Cost Less — Here Is Why
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground">Term length is the lever you control.</strong> On a{' '}
            {formatUsd(amountFinanced)} loan at {aprPct}% APR, stretching the term from 60 to 84
            months drops the payment but adds months of interest charges — over the life of the
            loan the longer term can cost thousands more. Every extra month is another month the
            lender charges interest on your remaining balance.
          </p>
          <p>
            <strong className="text-foreground">Trade-ins do more than reduce the price.</strong>{' '}
            In most states the taxable vehicle price is your purchase price minus the trade-in
            allowance, so a higher trade-in value also lowers the sales tax you finance. A{' '}
            {formatUsd(Math.max(0, vehiclePrice))} car with a {formatUsd(Math.max(0, tradeIn))}{' '}
            trade-in is taxed on {formatUsd(Math.max(0, vehiclePrice - Math.max(0, tradeIn)))}, not
            the full sticker.
          </p>
          <p>
            <strong className="text-foreground">Watch for negative equity.</strong> If your
            trade-in is worth less than the loan on it, dealers often roll the shortfall into the
            new amount financed — which is how a {formatUsd(Math.max(0, vehiclePrice))} car turns
            into a bigger loan. Keep the amount financed here honest and the numbers stay honest
            too. Compare a home purchase the same way with our{' '}
            <a
              href="/mortgage-calculator"
              className="font-medium text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
            >
              mortgage calculator
            </a>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * Pure-SVG stacked column chart: interest paid vs principal retired per loan
 * year. Follows the salary-chart visual language (crawlable SVG, dark-mode-safe
 * fill classes, horizontal scroll on narrow screens).
 */
function YearlyPrincipalInterestChart({
  yearly,
}: {
  yearly: { year: number; interestPaid: number; principalPaid: number }[];
}) {
  if (yearly.length === 0) {
    return (
      <Card className="min-w-0 border-border/50 bg-card/80">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Interest vs Principal by Year</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Enter a loan to see the yearly split.</p>
        </CardContent>
      </Card>
    );
  }

  const width = 720;
  const height = 300;
  const padLeft = 56;
  const padBottom = 40;
  const padTop = 30;
  const chartH = height - padTop - padBottom;
  const slot = (width - padLeft - 16) / yearly.length;
  const barW = Math.min(64, slot * 0.6);

  const totals = yearly.map((y) => y.interestPaid + y.principalPaid);
  const max = Math.max(...totals, 1);
  const yFor = (v: number) => padTop + chartH * (1 - v / max);
  const gridLines = [0, 0.25, 0.5, 0.75, 1].map((f) => f * max);

  return (
    <Card className="min-w-0 border-border/50 bg-card/80">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Interest vs Principal by Year</CardTitle>
        <CardDescription>
          Interest (top segment) shrinks each year as the balance falls
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto rounded-xl border border-border/30 bg-card/30 p-4">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="h-auto w-full"
            style={{ minWidth: '560px' }}
            role="img"
            aria-label={`Stacked bar chart of interest versus principal paid each year for ${yearly.length} loan years`}
          >
            {gridLines.map((v, i) => (
              <g key={i}>
                <line
                  x1={padLeft}
                  y1={yFor(v)}
                  x2={width - 8}
                  y2={yFor(v)}
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-border"
                  strokeDasharray="3,4"
                />
                <text
                  x={padLeft - 8}
                  y={yFor(v) + 4}
                  textAnchor="end"
                  className="fill-muted-foreground"
                  style={{ fontSize: '11px' }}
                >
                  {v >= 1000 ? `$${Math.round(v / 1000)}k` : `$${Math.round(v)}`}
                </text>
              </g>
            ))}
            {yearly.map((y, i) => {
              const cx = padLeft + slot * i + slot / 2;
              const principalH = chartH * (y.principalPaid / max);
              const interestH = chartH * (y.interestPaid / max);
              const principalY = padTop + chartH - principalH;
              const interestY = principalY - interestH;
              return (
                <g key={y.year}>
                  <rect
                    x={cx - barW / 2}
                    y={principalY}
                    width={barW}
                    height={Math.max(0, principalH)}
                    fill="#059669"
                    rx={3}
                  />
                  <rect
                    x={cx - barW / 2}
                    y={interestY}
                    width={barW}
                    height={Math.max(0, interestH)}
                    fill="#d97706"
                    rx={3}
                  />
                  <text
                    x={cx}
                    y={interestY - 6}
                    textAnchor="middle"
                    className="fill-muted-foreground"
                    style={{ fontSize: '10px' }}
                  >
                    {formatUsd(totals[i], 0)}
                  </text>
                  <text
                    x={cx}
                    y={height - 14}
                    textAnchor="middle"
                    className="fill-foreground"
                    style={{ fontSize: '12px', fontWeight: 600 }}
                  >
                    Y{y.year}
                  </text>
                </g>
              );
            })}
            <g transform={`translate(${padLeft}, ${height - 6})`}>
              <rect x={0} y={-12} width={12} height={12} fill="#d97706" rx={2} />
              <text x={18} y={-2} className="fill-muted-foreground" style={{ fontSize: '11px' }}>
                Interest
              </text>
              <rect x={80} y={-12} width={12} height={12} fill="#059669" rx={2} />
              <text x={98} y={-2} className="fill-muted-foreground" style={{ fontSize: '11px' }}>
                Principal
              </text>
            </g>
          </svg>
        </div>
      </CardContent>
    </Card>
  );
}
