'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  MapPin,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Shield,
  Info,
  Home,
  Sun,
  ShoppingCart,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { AdSlot } from './ad-slot';
import {
  calculatePaycheck,
  calculateFloridaCostOfLiving,
  formatCurrency,
  formatPercent,
  type PayFrequency,
} from '@/lib/finance-utils';
import { FLORIDA_COST_OF_LIVING } from '@/lib/tax-config';
import { useHashParams, updateHashState } from '@/hooks/use-hash-state';

export function FloridaCalculator() {
  const stateKey = 'florida';
  const hashParams = useHashParams();

  const [salary, setSalary] = useState<number>(() => hashParams.salary ? Number(hashParams.salary) : 75000);
  const [payFrequency, setPayFrequency] = useState<PayFrequency>(() => (hashParams.frequency as PayFrequency) || 'annual');
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(() => hashParams.hours ? Number(hashParams.hours) : 40);
  const [filingStatus, setFilingStatus] = useState<'single' | 'married' | 'head_of_household'>(() => (hashParams.filing as 'single' | 'married' | 'head_of_household') || 'single');
  const [retirement401k, setRetirement401k] = useState<number>(() => hashParams.k401k ? Number(hashParams.k401k) : 0);
  const [hsaContribution, setHsaContribution] = useState<number>(() => hashParams.hsa ? Number(hashParams.hsa) : 0);
  const [homeValue, setHomeValue] = useState<number>(() => hashParams.homeValue ? Number(hashParams.homeValue) : FLORIDA_COST_OF_LIVING.averageHomeValue);
  const [annualSpending, setAnnualSpending] = useState<number>(() => hashParams.spending ? Number(hashParams.spending) : 48000);

  useEffect(() => {
    updateHashState('florida', {
      salary,
      frequency: payFrequency,
      hours: hoursPerWeek,
      filing: filingStatus,
      k401k: retirement401k,
      hsa: hsaContribution,
      homeValue,
      spending: annualSpending,
    });
  }, [salary, payFrequency, hoursPerWeek, filingStatus, retirement401k, hsaContribution, homeValue, annualSpending]);

  const result = useMemo(() => {
    let annualSalary = salary;
    switch (payFrequency) {
      case 'monthly': annualSalary = salary * 12; break;
      case 'biweekly': annualSalary = salary * 26; break;
      case 'weekly': annualSalary = salary * 52; break;
      case 'hourly': annualSalary = salary * hoursPerWeek * 52; break;
    }
    return calculatePaycheck({
      annualSalary,
      payFrequency,
      hoursPerWeek,
      retirement401k,
      hsaContribution,
      stateKey,
      filingStatus,
    });
  }, [salary, payFrequency, hoursPerWeek, retirement401k, hsaContribution, filingStatus]);

  const colResult = useMemo(() => calculateFloridaCostOfLiving(homeValue, annualSpending), [homeValue, annualSpending]);

  const periodLabel = payFrequency === 'hourly' ? 'Hourly' : payFrequency === 'annual' ? 'Annual' : `Per ${payFrequency === 'biweekly' ? 'Bi-Weekly' : payFrequency === 'weekly' ? 'Weekly' : 'Monthly'}`;

  const netAfterCOL = useMemo(() => result.netAnnual - colResult.totalAnnualBurden, [result.netAnnual, colResult.totalAnnualBurden]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="flex items-center justify-center gap-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          <Sun className="h-8 w-8 text-emerald-400" />
          Florida Paycheck Calculator
        </h1>
        <p className="mt-2 text-muted-foreground">
          Zero state income tax — factor in Florida property &amp; sales tax for the complete picture
        </p>
      </div>

      <Card className="border-emerald-500/20 bg-emerald-500/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Florida: No State Income Tax</p>
              <p>
                Florida is one of nine U.S. states with <strong className="text-emerald-400">0% state income tax</strong>.
                Your paycheck is subject only to federal tax and FICA. Florida funds government through
                a <strong className="text-amber-400">6% state sales tax</strong> (plus local surtax up to 1.5%)
                and <strong className="text-amber-400">property taxes</strong> averaging 0.86% effective rate.
                Florida also has no tax on retirement income, making it popular for retirees.
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
                <DollarSign className="h-5 w-5 text-emerald-400" />Salary Input
              </CardTitle>
              <CardDescription>Enter your Florida salary — no state tax deducted!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fl-salary" className="text-sm font-medium">Salary / Hourly Rate</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="fl-salary" type="number" min={0} value={salary || ''} onChange={(e) => setSalary(Number(e.target.value) || 0)} className="pl-9" placeholder="75000" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fl-frequency" className="text-sm font-medium">Pay Frequency</Label>
                  <Select value={payFrequency} onValueChange={(v) => setPayFrequency(v as PayFrequency)}>
                    <SelectTrigger id="fl-frequency"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="annual">Annual</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="biweekly">Bi-Weekly</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {payFrequency === 'hourly' && (
                  <div className="space-y-2">
                    <Label htmlFor="fl-hours" className="text-sm font-medium">Hours / Week</Label>
                    <Input id="fl-hours" type="number" min={1} max={168} value={hoursPerWeek} onChange={(e) => setHoursPerWeek(Number(e.target.value) || 40)} />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="fl-filing" className="text-sm font-medium">Filing Status</Label>
                  <Select value={filingStatus} onValueChange={(v) => setFilingStatus(v as typeof filingStatus)}>
                    <SelectTrigger id="fl-filing"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="head_of_household">Head of Household</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <AdSlot position="after-form" />

          <Card className="border-amber-500/20 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Home className="h-5 w-5 text-amber-400" />
                Florida Cost of Living Impact
              </CardTitle>
              <CardDescription>Property &amp; sales taxes represent the real tax burden in Florida</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fl-home" className="text-sm font-medium">
                    <span className="flex items-center gap-1.5"><Home className="h-3.5 w-3.5 text-amber-400" />Home Value</span>
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="fl-home" type="number" min={0} value={homeValue || ''} onChange={(e) => setHomeValue(Number(e.target.value) || 0)} className="pl-9" placeholder="395000" />
                  </div>
                  <p className="text-xs text-muted-foreground">FL avg effective property tax rate: 0.86%</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fl-spending" className="text-sm font-medium">
                    <span className="flex items-center gap-1.5"><ShoppingCart className="h-3.5 w-3.5 text-amber-400" />Annual Consumer Spending</span>
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="fl-spending" type="number" min={0} value={annualSpending || ''} onChange={(e) => setAnnualSpending(Number(e.target.value) || 0)} className="pl-9" placeholder="48000" />
                  </div>
                  <p className="text-xs text-muted-foreground">FL avg combined sales tax rate: 7.0%</p>
                </div>
              </div>

              <div className="rounded-lg bg-amber-500/5 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Annual Property Tax</span>
                  <span className="text-sm font-medium text-amber-400">{formatCurrency(colResult.annualPropertyTax)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Estimated Sales Tax Burden</span>
                  <span className="text-sm font-medium text-amber-400">{formatCurrency(colResult.estimatedSalesTaxBurden)}</span>
                </div>
                <Separator className="bg-border/40" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Total Annual Burden</span>
                  <span className="text-sm font-bold text-amber-400">{formatCurrency(colResult.totalAnnualBurden)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Net After COL Burden</span>
                  <span className={`text-sm font-bold ${netAfterCOL > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {formatCurrency(netAfterCOL)}/yr
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="sticky top-20 border-emerald-500/20 bg-card/90 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-emerald-400" />Florida Take-Home
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-xl bg-emerald-500/10 p-4 text-center">
                <p className="text-xs font-medium uppercase tracking-wider text-emerald-400/80">Net Take-Home ({periodLabel})</p>
                <p className="mt-1 text-3xl font-bold text-emerald-400">{formatCurrency(result.netPerPeriod)}</p>
                <p className="mt-1 text-xs text-muted-foreground">Annual Net: {formatCurrency(result.netAnnual)}</p>
              </div>

              <div className="rounded-lg bg-emerald-500/5 p-3 text-center">
                <p className="text-xs text-muted-foreground">State Income Tax</p>
                <p className="text-xl font-bold text-emerald-400">$0.00</p>
                <p className="text-xs text-emerald-400/60">Florida has 0% income tax</p>
              </div>

              <Separator className="bg-border/40" />

              <div className="space-y-2.5 rounded-lg bg-muted/30 p-3">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Deductions (Federal Only)</p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground"><TrendingDown className="h-3.5 w-3.5 text-red-400" />Federal Tax</span>
                  <span className="text-sm font-medium text-red-400">-{formatCurrency(result.federalTax)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground"><TrendingDown className="h-3.5 w-3.5 text-orange-400" />FICA (7.65%)</span>
                  <span className="text-sm font-medium text-orange-400">-{formatCurrency(result.ficaTotal)}</span>
                </div>
                {result.retirement401k > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">401(k)</span>
                    <span className="text-sm font-medium text-amber-400">-{formatCurrency(result.retirement401k)}</span>
                  </div>
                )}
                {result.hsaContribution > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">HSA</span>
                    <span className="text-sm font-medium text-emerald-400">-{formatCurrency(result.hsaContribution)}</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-muted/30 p-2.5 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Effective Rate</p>
                  <p className="text-lg font-bold text-foreground">{formatPercent(result.effectiveTaxRate)}</p>
                </div>
                <div className="rounded-lg bg-muted/30 p-2.5 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Marginal Rate</p>
                  <p className="text-lg font-bold text-foreground">{formatPercent(result.marginalTaxRate)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="mt-6"><AdSlot position="after-results" /></div>
        </div>
      </div>

      <div className="rounded-xl border border-border/30 bg-muted/10 p-6" aria-hidden="true">
        <h2 className="text-xl font-bold text-foreground">Florida $75,000 Salary Example (2026)</h2>
        <div className="mt-3 space-y-1 text-sm text-muted-foreground">
          <p>Gross Annual Salary: $75,000.00</p>
          <p>Florida State Income Tax: $0.00 (0% — no state income tax)</p>
          <p>Federal Tax (after $15,000 standard deduction): $8,717.50</p>
          <p>FICA - Social Security (6.2%): $4,650.00</p>
          <p>FICA - Medicare (1.45%): $1,087.50</p>
          <p>Total Deductions: $14,455.00</p>
          <p>Net Annual Take-Home Pay: $60,545.00</p>
          <p>Monthly Take-Home: $5,045.42</p>
        </div>
      </div>
    </div>
  );
}
