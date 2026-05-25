'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Home,
  DollarSign,
  Percent,
  Clock,
  TrendingDown,
  Zap,
  BarChart3,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { AdSlot } from './ad-slot';
import {
  calculateMortgage,
  formatCurrency,
  formatNumber,
} from '@/lib/finance-utils';
import { MORTGAGE_DEFAULTS } from '@/lib/tax-config';
import { useHashParams, updateHashState } from '@/hooks/use-hash-state';

export function MortgageCalculator() {
  const hashParams = useHashParams();

  const [homePrice, setHomePrice] = useState<number>(() => hashParams.price ? Number(hashParams.price) : MORTGAGE_DEFAULTS.homePrice);
  const [downPayment, setDownPayment] = useState<number>(() => hashParams.down ? Number(hashParams.down) : MORTGAGE_DEFAULTS.downPayment);
  const [interestRate, setInterestRate] = useState<number>(() => hashParams.rate ? Number(hashParams.rate) : MORTGAGE_DEFAULTS.interestRate);
  const [loanTerm, setLoanTerm] = useState<number>(() => hashParams.term ? Number(hashParams.term) : MORTGAGE_DEFAULTS.loanTerm);
  const [extraPayment, setExtraPayment] = useState<number>(() => hashParams.extra ? Number(hashParams.extra) : 0);

  useEffect(() => {
    updateHashState('mortgage', {
      price: homePrice,
      down: downPayment,
      rate: interestRate,
      term: loanTerm,
      extra: extraPayment,
    });
  }, [homePrice, downPayment, interestRate, loanTerm, extraPayment]);

  const result = useMemo(() => {
    return calculateMortgage({
      homePrice,
      downPayment,
      interestRate,
      loanTerm,
      extraMonthlyPayment: extraPayment,
    });
  }, [homePrice, downPayment, interestRate, loanTerm, extraPayment]);

  const downPaymentPercent = homePrice > 0 ? (downPayment / homePrice) * 100 : 0;
  const principalVsInterest = result.totalCost > 0 ? (result.loanAmount / result.totalCost) * 100 : 0;

  const yearlySummary = useMemo(() => {
    const years: { year: number; principal: number; interest: number; balance: number; cumulativeInterest: number }[] = [];
    let yearPrincipal = 0;
    let yearInterest = 0;

    for (const entry of result.amortizationSchedule) {
      yearPrincipal += entry.principal;
      yearInterest += entry.interest;

      if (entry.month % 12 === 0 || entry.balance <= 0) {
        years.push({
          year: Math.ceil(entry.month / 12),
          principal: yearPrincipal,
          interest: yearInterest,
          balance: entry.balance,
          cumulativeInterest: entry.cumulativeInterest,
        });
        yearPrincipal = 0;
        yearInterest = 0;
      }
    }
    return years;
  }, [result.amortizationSchedule]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="flex items-center justify-center gap-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          <Home className="h-8 w-8 text-emerald-400" />
          Mortgage Calculator
        </h1>
        <p className="mt-2 text-muted-foreground">
          Fixed-rate amortization with extra payment simulation — see exactly how much you save
        </p>
      </div>

      <Card className="border-emerald-500/20 bg-emerald-500/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">How the Mortgage Formula Works</p>
              <p>
                The standard fixed-rate monthly payment is calculated as:{' '}
                <strong className="text-emerald-400 font-mono">M = P × [r(1+r)<sup>n</sup>] / [(1+r)<sup>n</sup> - 1]</strong>
              </p>
              <p>
                Where <strong>P</strong> = loan principal, <strong>r</strong> = monthly interest rate (annual ÷ 12),
                and <strong>n</strong> = total number of payments (years × 12). Extra monthly payments go directly
                toward reducing principal, which dramatically cuts total interest and shortens the loan term.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-3">
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <DollarSign className="h-5 w-5 text-emerald-400" />Loan Parameters
              </CardTitle>
              <CardDescription>Adjust any value to see instant results</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="mort-price" className="text-sm font-medium">Home Price</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="mort-price" type="number" min={0} step={1000} value={homePrice || ''} onChange={(e) => setHomePrice(Number(e.target.value) || 0)} className="pl-9" placeholder="350000" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mort-down" className="text-sm font-medium">Down Payment</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="mort-down" type="number" min={0} step={1000} value={downPayment || ''} onChange={(e) => setDownPayment(Number(e.target.value) || 0)} className="pl-9" placeholder="70000" />
                  </div>
                  <p className="text-xs text-muted-foreground">{downPaymentPercent.toFixed(1)}% down{downPaymentPercent < 20 ? ' — PMI may apply' : ''}</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="mort-rate" className="text-sm font-medium">
                    <span className="flex items-center gap-1.5"><Percent className="h-3.5 w-3.5 text-emerald-400" />Interest Rate (Annual)</span>
                  </Label>
                  <Input id="mort-rate" type="number" min={0} max={30} step={0.125} value={interestRate || ''} onChange={(e) => setInterestRate(Number(e.target.value) || 0)} placeholder="6.5" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mort-term" className="text-sm font-medium">
                    <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-emerald-400" />Loan Term</span>
                  </Label>
                  <Select value={String(loanTerm)} onValueChange={(v) => setLoanTerm(Number(v))}>
                    <SelectTrigger id="mort-term"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 Years</SelectItem>
                      <SelectItem value="20">20 Years</SelectItem>
                      <SelectItem value="25">25 Years</SelectItem>
                      <SelectItem value="30">30 Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator className="bg-border/40" />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <Zap className="h-3.5 w-3.5 text-amber-400" />
                      Extra Monthly Payment
                    </span>
                  </Label>
                  <Badge variant="secondary" className="text-emerald-400 bg-emerald-500/10">
                    {formatCurrency(extraPayment)}/mo
                  </Badge>
                </div>
                <Slider
                  value={[extraPayment]}
                  onValueChange={(v) => setExtraPayment(v[0])}
                  min={0}
                  max={2000}
                  step={25}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>$0</span>
                  <span>$500</span>
                  <span>$1,000</span>
                  <span>$1,500</span>
                  <span>$2,000</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <AdSlot position="after-form" />

          {extraPayment > 0 && (
            <Card className="border-amber-500/30 bg-amber-500/5">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Zap className="h-5 w-5 text-amber-400" />
                  Extra Payment Impact
                </CardTitle>
                <CardDescription>See exactly how extra payments transform your mortgage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-amber-500/10 p-4 text-center">
                    <p className="text-xs font-medium uppercase tracking-wider text-amber-400/80">Years Saved</p>
                    <p className="mt-1 text-4xl font-bold text-amber-400">
                      {result.yearsSaved > 0 ? formatNumber(result.yearsSaved, 1) : '0'}
                    </p>
                    <p className="text-xs text-muted-foreground">years early payoff</p>
                  </div>
                  <div className="rounded-xl bg-emerald-500/10 p-4 text-center">
                    <p className="text-xs font-medium uppercase tracking-wider text-emerald-400/80">Interest Saved</p>
                    <p className="mt-1 text-4xl font-bold text-emerald-400">
                      {formatCurrency(result.interestSaved)}
                    </p>
                    <p className="text-xs text-muted-foreground">in total interest</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Original Payoff</span>
                    <span className="font-medium text-foreground">{loanTerm} years ({loanTerm * 12} payments)</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">New Payoff</span>
                    <span className="font-medium text-emerald-400">{formatNumber(result.payoffYears, 1)} years ({result.payoffMonths} payments)</span>
                  </div>
                  <Progress
                    value={result.payoffMonths > 0 ? (result.payoffMonths / (loanTerm * 12)) * 100 : 0}
                    className="h-2 mt-1"
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="lg:col-span-2">
          <Card className="sticky top-20 border-emerald-500/20 bg-card/90 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart3 className="h-5 w-5 text-emerald-400" />Mortgage Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-xl bg-emerald-500/10 p-4 text-center">
                <p className="text-xs font-medium uppercase tracking-wider text-emerald-400/80">Monthly Payment</p>
                <p className="mt-1 text-3xl font-bold text-emerald-400">{formatCurrency(result.monthlyPayment)}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Loan: {formatCurrency(result.loanAmount)} at {interestRate}% for {loanTerm}yrs
                </p>
              </div>

              <Separator className="bg-border/40" />

              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Loan Amount</span>
                  <span className="text-sm font-semibold text-foreground">{formatCurrency(result.loanAmount)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Interest Paid</span>
                  <span className="text-sm font-semibold text-red-400">{formatCurrency(result.totalInterestPaid)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Cost of Loan</span>
                  <span className="text-sm font-semibold text-foreground">{formatCurrency(result.totalCost)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Principal vs Interest</p>
                <div className="flex h-3 overflow-hidden rounded-full bg-muted">
                  <div className="bg-emerald-500 transition-all" style={{ width: `${principalVsInterest}%` }} />
                  <div className="bg-red-400 transition-all" style={{ width: `${100 - principalVsInterest}%` }} />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Principal {formatCurrency(result.loanAmount)}</span>
                  <span>Interest {formatCurrency(result.totalInterestPaid)}</span>
                </div>
              </div>

              {extraPayment > 0 && (
                <>
                  <Separator className="bg-border/40" />
                  <div className="space-y-2.5 rounded-lg bg-amber-500/5 p-3">
                    <p className="text-xs font-medium uppercase tracking-wider text-amber-400">With Extra {formatCurrency(extraPayment)}/mo</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">New Monthly Total</span>
                      <span className="text-sm font-semibold text-foreground">{formatCurrency(result.monthlyPaymentWithExtra)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">New Total Interest</span>
                      <span className="text-sm font-semibold text-emerald-400">{formatCurrency(result.totalInterestWithExtra)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">New Total Cost</span>
                      <span className="text-sm font-semibold text-foreground">{formatCurrency(result.totalCostWithExtra)}</span>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
          <div className="mt-6"><AdSlot position="after-results" /></div>
        </div>
      </div>

      <Card className="border-border/50 bg-card/80">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <BarChart3 className="h-5 w-5 text-emerald-400" />
            Amortization Schedule
          </CardTitle>
          <CardDescription>Yearly breakdown of principal vs interest payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-h-96 overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin' }}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Year</TableHead>
                  <TableHead className="text-right">Principal</TableHead>
                  <TableHead className="text-right">Interest</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                  <TableHead className="text-right">Cum. Interest</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {yearlySummary.map((yr) => (
                  <TableRow key={yr.year}>
                    <TableCell className="font-medium">{yr.year}</TableCell>
                    <TableCell className="text-right text-emerald-400">{formatCurrency(yr.principal)}</TableCell>
                    <TableCell className="text-right text-red-400">{formatCurrency(yr.interest)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(yr.balance)}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{formatCurrency(yr.cumulativeInterest)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/80">
        <CardHeader>
          <CardTitle className="text-lg">Understanding Mortgage Amortization &amp; Interest</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground">What is amortization?</strong> Amortization is the process of spreading
            a loan into a series of fixed payments over time. In the early years of a mortgage, the majority of each
            monthly payment goes toward interest. As the principal balance decreases, a larger share of each payment
            goes toward principal — this is known as the amortization curve.
          </p>
          <p>
            <strong className="text-foreground">The power of extra payments:</strong> Making extra monthly payments
            directly reduces the principal balance, which means less interest accrues in subsequent months. Even
            modest additional payments of $100–$300/month on a 30-year mortgage can save tens of thousands of dollars
            in interest and shave years off the loan term.
          </p>
          <p>
            <strong className="text-foreground">Historical context:</strong> The average 30-year fixed mortgage rate
            has ranged from a record low of 2.65% in January 2021 to highs above 7% in 2023. At 6.5% on a $280,000
            loan, total interest paid over 30 years exceeds $356,000 — more than the original loan amount. This
            demonstrates why even small rate reductions or extra payments have an outsized impact on total cost.
          </p>
          <p>
            <strong className="text-foreground">15-year vs 30-year:</strong> A 15-year mortgage typically offers a
            lower interest rate (often 0.5–1% less) but requires higher monthly payments. The trade-off is
            significantly less total interest paid. For a $280,000 loan at 5.5% over 15 years, total interest is
            approximately $130,000 versus $356,000+ at 6.5% over 30 years.
          </p>
        </CardContent>
      </Card>

      <div className="rounded-xl border border-border/30 bg-muted/10 p-6" aria-hidden="true">
        <h2 className="text-xl font-bold text-foreground">Mortgage Example: $350,000 Home at 6.5% (2026)</h2>
        <div className="mt-3 space-y-1 text-sm text-muted-foreground">
          <p>Home Price: $350,000.00</p>
          <p>Down Payment: $70,000.00 (20%)</p>
          <p>Loan Amount: $280,000.00</p>
          <p>Interest Rate: 6.5% APR</p>
          <p>Loan Term: 30 years (360 payments)</p>
          <p>Monthly Payment: $1,769.35</p>
          <p>Total Interest Paid: $356,966.77</p>
          <p>Total Cost of Loan: $636,966.77</p>
          <p>With $200/mo Extra: Pay off in 24.8 years, save $76,856.29 in interest</p>
        </div>
      </div>
    </div>
  );
}
