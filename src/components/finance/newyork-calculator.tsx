'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  MapPin,
  ChevronDown,
  ChevronUp,
  DollarSign,
  TrendingDown,
  TrendingUp,
  Shield,
  PiggyBank,
  Info,
  Home,
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
import { Badge } from '@/components/ui/badge';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AdSlot } from './ad-slot';
import { FAQSection, NEWYORK_FAQS } from './faq-sections';
import {
  calculatePaycheck,
  calculateNewYorkCostOfLiving,
  formatCurrency,
  formatPercent,
  type PayFrequency,
  type PaycheckInput,
} from '@/lib/finance-utils';
import { FICA_2026, STATE_PROFILES, NEWYORK_COST_OF_LIVING } from '@/lib/tax-config';
import { useHashParams, updateHashState } from '@/hooks/use-hash-state';

export function NewYorkCalculator() {
  const stateKey = 'newyork';
  const stateProfile = STATE_PROFILES.newyork;

  const hashParams = useHashParams();
  const [salary, setSalary] = useState<number>(() => hashParams.salary ? Number(hashParams.salary) : 100000);
  const [payFrequency, setPayFrequency] = useState<PayFrequency>(() => (hashParams.frequency as PayFrequency) || 'annual');
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(() => hashParams.hours ? Number(hashParams.hours) : 40);
  const [filingStatus, setFilingStatus] = useState<'single' | 'married' | 'head_of_household'>(() => (hashParams.filing as 'single' | 'married' | 'head_of_household') || 'single');
  const [retirement401k, setRetirement401k] = useState<number>(() => hashParams.k401k ? Number(hashParams.k401k) : 0);
  const [hsaContribution, setHsaContribution] = useState<number>(() => hashParams.hsa ? Number(hashParams.hsa) : 0);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [homeValue, setHomeValue] = useState<number>(() => hashParams.homeValue ? Number(hashParams.homeValue) : NEWYORK_COST_OF_LIVING.averageHomeValue);
  const [annualSpending, setAnnualSpending] = useState<number>(() => hashParams.spending ? Number(hashParams.spending) : 52000);

  useEffect(() => {
    updateHashState('newyork', {
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

  const colResult = useMemo(() => calculateNewYorkCostOfLiving(homeValue, annualSpending), [homeValue, annualSpending]);

  const periodLabel = payFrequency === 'hourly' ? 'Hourly' : payFrequency === 'annual' ? 'Annual' : `Per ${payFrequency === 'biweekly' ? 'Bi-Weekly' : payFrequency === 'weekly' ? 'Weekly' : 'Monthly'}`;

  const nyBreakdown = useMemo(() => {
    const gross = result.grossAnnual;
    const pretax = retirement401k + hsaContribution;
    const stdDeduction = stateProfile.standardDeductionsByFiling?.[filingStatus] ?? stateProfile.standardDeduction;
    const nyTaxableIncome = Math.max(0, gross - pretax - stdDeduction);

    // Compute bracket-by-bracket breakdown
    const brackets = stateProfile.brackets ?? [];
    let tax = 0;
    let remaining = nyTaxableIncome;
    const bracketDetails: { range: string; rate: string; tax: number }[] = [];

    for (const bracket of brackets) {
      if (remaining <= 0) break;
      const bracketWidth = bracket.max === null ? remaining : bracket.max - bracket.min;
      const taxableInBracket = Math.min(remaining, bracketWidth);
      const bracketTax = taxableInBracket * bracket.rate;
      tax += bracketTax;
      remaining -= taxableInBracket;

      const rangeLabel = bracket.max === null
        ? `$${bracket.min.toLocaleString()}+`
        : `$${bracket.min.toLocaleString()} – $${bracket.max.toLocaleString()}`;
      bracketDetails.push({
        range: rangeLabel,
        rate: `${(bracket.rate * 100).toFixed(2)}%`,
        tax: bracketTax,
      });
    }

    return { nyTaxableIncome, nyTax: tax, stdDeduction, bracketDetails };
  }, [result.grossAnnual, retirement401k, hsaContribution, filingStatus, stateProfile]);

  const netAfterCOL = useMemo(() => result.netAnnual - colResult.totalAnnualBurden, [result.netAnnual, colResult.totalAnnualBurden]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="flex items-center justify-center gap-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          <MapPin className="h-8 w-8 text-emerald-400" />
          New York Paycheck Calculator
        </h1>
        <p className="mt-2 text-muted-foreground">
          Progressive 4%–10.9% state tax + potential NYC tax — complete take-home &amp; cost of living breakdown
        </p>
      </div>

      <Card className="border-emerald-500/20 bg-emerald-500/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">How New York Progressive Income Tax Works</p>
              <p>
                New York uses a <strong className="text-emerald-400">progressive tax system</strong> with
                9 brackets ranging from <strong className="text-emerald-400">4% to 10.9%</strong>.
                Your income is taxed in layers — the first dollars are taxed at 4%, with higher rates applied
                as income increases. A <strong className="text-emerald-400">standard deduction</strong> of
                $8,100 (single), $16,200 (married), or $11,200 (head of household) is subtracted first.
              </p>
              <p>
                For a $100,000 salary (single): Taxable income = $100,000 − $8,100 = $91,900.
                NY state tax ≈ $4,941 across 5 brackets — effective rate ~4.9%.
                <strong className="text-red-400"> NYC residents</strong> pay an additional city tax of
                3.078%–3.876%, making the combined state + city rate up to 14.8% for high earners.
                Combined with <strong className="text-amber-400">8.52% avg sales tax</strong> and
                <strong className="text-amber-400"> 1.62% property tax</strong>, NY has one of the
                highest total tax burdens in the US.
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
              <CardDescription>Enter your New York salary for an instant calculation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="ny-salary" className="text-sm font-medium">Salary / Hourly Rate</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="ny-salary" type="number" min={0} value={salary || ''} onChange={(e) => setSalary(Number(e.target.value) || 0)} className="pl-9" placeholder="100000" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ny-frequency" className="text-sm font-medium">Pay Frequency</Label>
                  <Select value={payFrequency} onValueChange={(v) => setPayFrequency(v as PayFrequency)}>
                    <SelectTrigger id="ny-frequency"><SelectValue /></SelectTrigger>
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
                    <Label htmlFor="ny-hours" className="text-sm font-medium">Hours / Week</Label>
                    <Input id="ny-hours" type="number" min={1} max={168} value={hoursPerWeek} onChange={(e) => setHoursPerWeek(Number(e.target.value) || 40)} />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="ny-filing" className="text-sm font-medium">Filing Status</Label>
                  <Select value={filingStatus} onValueChange={(v) => setFilingStatus(v as typeof filingStatus)}>
                    <SelectTrigger id="ny-filing"><SelectValue /></SelectTrigger>
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

          <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
            <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer pb-4 transition-colors hover:bg-muted/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-amber-400" />
                      <CardTitle className="text-lg">Advanced Options</CardTitle>
                      <Badge variant="outline" className="text-xs">401(k) &amp; HSA</Badge>
                    </div>
                    {advancedOpen ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="space-y-4 pt-0">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="ny-401k" className="text-sm font-medium">
                        <span className="flex items-center gap-1.5"><PiggyBank className="h-3.5 w-3.5 text-amber-400" />401(k) Annual</span>
                      </Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input id="ny-401k" type="number" min={0} max={23500} value={retirement401k || ''} onChange={(e) => setRetirement401k(Number(e.target.value) || 0)} className="pl-9" placeholder="0" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ny-hsa" className="text-sm font-medium">
                        <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5 text-emerald-400" />HSA Annual</span>
                      </Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input id="ny-hsa" type="number" min={0} max={4150} value={hsaContribution || ''} onChange={(e) => setHsaContribution(Number(e.target.value) || 0)} className="pl-9" placeholder="0" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          <AdSlot position="after-form" />

          <Card className="border-amber-500/20 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Home className="h-5 w-5 text-amber-400" />
                New York Cost of Living Impact
              </CardTitle>
              <CardDescription>High property taxes &amp; sales tax add to the total NY burden beyond income tax</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="ny-home" className="text-sm font-medium">
                    <span className="flex items-center gap-1.5"><Home className="h-3.5 w-3.5 text-amber-400" />Home Value</span>
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="ny-home" type="number" min={0} value={homeValue || ''} onChange={(e) => setHomeValue(Number(e.target.value) || 0)} className="pl-9" placeholder="425000" />
                  </div>
                  <p className="text-xs text-muted-foreground">NY avg effective property tax rate: 1.62%</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ny-spending" className="text-sm font-medium">
                    <span className="flex items-center gap-1.5"><ShoppingCart className="h-3.5 w-3.5 text-amber-400" />Annual Consumer Spending</span>
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="ny-spending" type="number" min={0} value={annualSpending || ''} onChange={(e) => setAnnualSpending(Number(e.target.value) || 0)} className="pl-9" placeholder="52000" />
                  </div>
                  <p className="text-xs text-muted-foreground">NY avg combined sales tax rate: 8.52%</p>
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
                  <span className="text-sm font-medium text-foreground">Total Annual COL Burden</span>
                  <span className="text-sm font-bold text-amber-400">{formatCurrency(colResult.totalAnnualBurden)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Total Monthly COL Burden</span>
                  <span className="text-sm font-bold text-amber-400">{formatCurrency(colResult.totalMonthlyBurden)}</span>
                </div>
                <Separator className="bg-border/40" />
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
                <TrendingUp className="h-5 w-5 text-emerald-400" />New York Take-Home
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-xl bg-emerald-500/10 p-4 text-center">
                <p className="text-xs font-medium uppercase tracking-wider text-emerald-400/80">Net Take-Home ({periodLabel})</p>
                <p className="mt-1 text-3xl font-bold text-emerald-400">{formatCurrency(result.netPerPeriod)}</p>
                <p className="mt-1 text-xs text-muted-foreground">Annual Net: {formatCurrency(result.netAnnual)}</p>
              </div>

              <Separator className="bg-border/40" />

              <div className="space-y-2.5 rounded-lg bg-muted/30 p-3">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Deductions</p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground"><TrendingDown className="h-3.5 w-3.5 text-red-400" />Federal Tax</span>
                  <span className="text-sm font-medium text-red-400">-{formatCurrency(result.federalTax)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground"><TrendingDown className="h-3.5 w-3.5 text-orange-400" />FICA</span>
                  <span className="text-sm font-medium text-orange-400">-{formatCurrency(result.ficaTotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground"><TrendingDown className="h-3.5 w-3.5 text-amber-400" />NY State Tax (4%–10.9%)</span>
                  <span className="text-sm font-medium text-amber-400">-{formatCurrency(result.stateTax)}</span>
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

              <div className="rounded-lg bg-amber-500/5 p-3">
                <p className="text-xs font-medium text-amber-400">New York Tax Breakdown</p>
                <div className="mt-1.5 space-y-1 text-xs text-muted-foreground">
                  <div className="flex justify-between"><span>Gross Income</span><span>{formatCurrency(result.grossAnnual)}</span></div>
                  <div className="flex justify-between"><span>Less: Pre-Tax Deductions</span><span>-{formatCurrency(retirement401k + hsaContribution)}</span></div>
                  <div className="flex justify-between"><span>Less: Standard Deduction ({filingStatus === 'married' ? 'Married' : filingStatus === 'head_of_household' ? 'HoH' : 'Single'})</span><span>-{formatCurrency(nyBreakdown.stdDeduction)}</span></div>
                  <div className="flex justify-between"><span>NY Taxable Income</span><span>{formatCurrency(nyBreakdown.nyTaxableIncome)}</span></div>
                  <Separator className="my-1.5 bg-border/30" />
                  {nyBreakdown.bracketDetails.slice(0, 6).map((b, i) => (
                    <div key={i} className="flex justify-between">
                      <span>{b.range} @ {b.rate}</span>
                      <span>{formatCurrency(b.tax)}</span>
                    </div>
                  ))}
                  {nyBreakdown.bracketDetails.length > 6 && (
                    <div className="flex justify-between text-muted-foreground/60">
                      <span>+{nyBreakdown.bracketDetails.length - 6} more brackets</span>
                      <span></span>
                    </div>
                  )}
                  <Separator className="my-1.5 bg-border/30" />
                  <div className="flex justify-between font-medium text-amber-400"><span>NY State Tax</span><span>{formatCurrency(nyBreakdown.nyTax)}</span></div>
                </div>
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

      <Card className="border-border/50 bg-card/80">
        <CardHeader>
          <CardTitle className="text-lg">2026 New York Tax Rates &amp; Constants</CardTitle>
          <CardDescription>Key tax parameters for New York paycheck calculations</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Parameter</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>State Income Tax Rate</TableCell>
                <TableCell className="font-medium text-emerald-400">4% – 10.9% (Progressive)</TableCell>
                <TableCell>9 brackets; highest rate applies above $25M</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Standard Deduction (Single)</TableCell>
                <TableCell className="font-medium">$8,100</TableCell>
                <TableCell>Subtracted from gross before bracket computation</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Standard Deduction (Married)</TableCell>
                <TableCell className="font-medium">$16,200</TableCell>
                <TableCell>Double the single deduction for joint filers</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Standard Deduction (Head of Household)</TableCell>
                <TableCell className="font-medium">$11,200</TableCell>
                <TableCell>Between single and married for HoH filers</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NYC Income Tax (if applicable)</TableCell>
                <TableCell className="font-medium text-red-400">3.078% – 3.876%</TableCell>
                <TableCell>Additional city tax for NYC residents only</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Average Combined Sales Tax</TableCell>
                <TableCell className="font-medium text-amber-400">8.52%</TableCell>
                <TableCell>4% state + avg local surtaxes</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Avg Effective Property Tax</TableCell>
                <TableCell className="font-medium">1.62%</TableCell>
                <TableCell>Among the highest property tax rates nationally</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Federal Standard Deduction</TableCell>
                <TableCell className="font-medium">$15,000</TableCell>
                <TableCell>Applied to federal tax calculation only</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>FICA Total Rate</TableCell>
                <TableCell className="font-medium text-orange-400">7.65%</TableCell>
                <TableCell>6.2% SS (up to $176,100) + 1.45% Medicare</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="rounded-xl border border-border/30 bg-muted/10 p-6" aria-hidden="true">
        <h2 className="text-xl font-bold text-foreground">New York $100,000 Salary Example (2026)</h2>
        <div className="mt-3 space-y-1 text-sm text-muted-foreground">
          <p>Gross Annual Salary: $100,000.00</p>
          <p>New York Standard Deduction (Single): -$8,100.00</p>
          <p>New York Taxable Income: $91,900.00</p>
          <p>New York State Tax (4%–6.85% brackets): $4,941.38</p>
          <p>Federal Tax (after $15,000 std deduction): $13,753.00</p>
          <p>FICA Total (7.65%): $7,650.00</p>
          <p>Total Deductions: $26,344.38</p>
          <p>Net Annual Take-Home: $73,655.62</p>
          <p>Monthly Take-Home: $6,137.97</p>
          <p>Estimated COL Burden (Property + Sales Tax): $11,310.40/yr</p>
          <p>Note: NYC residents pay additional city income tax of 3.078%–3.876%</p>
        </div>
      </div>

      <FAQSection title="New York Tax FAQ — Progressive Brackets, NYC Tax & Cost of Living" faqs={NEWYORK_FAQS} />

      <AdSlot position="mid-content" />
    </div>
  );
}
