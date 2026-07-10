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
import { FAQSection, NEWJERSEY_FAQS } from './faq-sections';
import {
  calculatePaycheck,
  formatCurrency,
  formatPercent,
  type PaycheckInput,
} from '@/lib/finance-utils';
import { FICA_2026, STATE_PROFILES, type PayFrequency } from '@/lib/tax-config';
import { useHashParams, updateHashState } from '@/hooks/use-hash-state';

export function NewJerseyCalculator() {
  const stateKey = 'newjersey';
  const stateProfile = STATE_PROFILES.newjersey;

  const hashParams = useHashParams();
  const [salary, setSalary] = useState<number>(() => hashParams.salary ? Number(hashParams.salary) : 75000);
  const [payFrequency, setPayFrequency] = useState<PayFrequency>(() => (hashParams.frequency as PayFrequency) || 'annual');
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(() => hashParams.hours ? Number(hashParams.hours) : 40);
  const [filingStatus, setFilingStatus] = useState<'single' | 'married' | 'head_of_household'>(() => (hashParams.filing as 'single' | 'married' | 'head_of_household') || 'single');
  const [retirement401k, setRetirement401k] = useState<number>(() => hashParams.k401k ? Number(hashParams.k401k) : 0);
  const [hsaContribution, setHsaContribution] = useState<number>(() => hashParams.hsa ? Number(hashParams.hsa) : 0);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  useEffect(() => {
    updateHashState('newjersey', {
      salary,
      frequency: payFrequency,
      hours: hoursPerWeek,
      filing: filingStatus,
      k401k: retirement401k,
      hsa: hsaContribution,
    });
  }, [salary, payFrequency, hoursPerWeek, filingStatus, retirement401k, hsaContribution]);

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

  const periodLabel = payFrequency === 'hourly' ? 'Hourly' : payFrequency === 'annual' ? 'Annual' : `Per ${payFrequency === 'biweekly' ? 'Bi-Weekly' : payFrequency === 'weekly' ? 'Weekly' : 'Monthly'}`;

  const njBreakdown = useMemo(() => {
    const gross = result.grossAnnual;
    const pretax = retirement401k + hsaContribution;
    const personalExemption = stateProfile.personalExemptionsByFiling?.[filingStatus] ?? stateProfile.personalExemption;
    const standardDeduction = stateProfile.standardDeductionsByFiling?.[filingStatus] ?? stateProfile.standardDeduction;
    const njTaxableIncome = Math.max(0, gross - pretax - standardDeduction - personalExemption);

    // Progressive bracket calculation
    const brackets = stateProfile.brackets ?? [];
    let njTax = 0;
    let remaining = njTaxableIncome;
    const bracketDetails: { rate: number; taxable: number; tax: number }[] = [];

    for (const bracket of brackets) {
      if (remaining <= 0) break;
      const bracketWidth = bracket.max === null ? remaining : bracket.max - bracket.min;
      const taxableInBracket = Math.min(remaining, bracketWidth);
      const taxInBracket = taxableInBracket * bracket.rate;
      njTax += taxInBracket;
      bracketDetails.push({ rate: bracket.rate, taxable: taxableInBracket, tax: taxInBracket });
      remaining -= taxableInBracket;
    }

    return { njTaxableIncome, njTax, personalExemption, standardDeduction, bracketDetails };
  }, [result.grossAnnual, retirement401k, hsaContribution, filingStatus, stateProfile]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="flex items-center justify-center gap-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          <MapPin className="h-8 w-8 text-emerald-400" />
          New Jersey Paycheck Calculator
        </h2>
        <p className="mt-2 text-muted-foreground">
          New Jersey progressive income tax (1.4%–10.75%) with personal exemption — complete take-home breakdown
        </p>
      </div>

      <Card className="border-emerald-500/20 bg-emerald-500/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">How New Jersey Income Tax Works</p>
              <p>
                New Jersey uses a <strong className="text-emerald-400">progressive income tax</strong> with
                seven brackets: <strong className="text-emerald-400">1.4%</strong> on the first $20,000,{' '}
                <strong className="text-emerald-400">1.75%</strong> on $20,001–$35,000,{' '}
                <strong className="text-emerald-400">2.45%</strong> on $35,001–$40,000,{' '}
                <strong className="text-emerald-400">3.5%</strong> on $40,001–$75,000,{' '}
                <strong className="text-emerald-400">5.525%</strong> on $75,001–$500,000,{' '}
                <strong className="text-emerald-400">6.37%</strong> on $500,001–$5,000,000, and{' '}
                <strong className="text-emerald-400">10.75%</strong> on income over $5,000,000.
                New Jersey has <strong className="text-emerald-400">no standard deduction</strong> but offers a{' '}
                <strong className="text-emerald-400">personal exemption</strong> ($1,000 single / $2,000 married / $1,000 head of household).
                NJ also has the <strong className="text-emerald-400">highest property taxes in the nation</strong> (avg ~2.49%).
              </p>
              <p>
                For a $75,000 salary (single): Taxable income = $75,000 - $1,000 = $74,000. State tax = ($20,000 × 1.4%) + ($15,000 × 1.75%) + ($5,000 × 2.45%) + ($34,000 × 3.5%) = $280 + $262.50 + $122.50 + $1,190 = $1,855.
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
              <CardDescription>Enter your New Jersey salary for an instant calculation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nj-salary" className="text-sm font-medium">Salary / Hourly Rate</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="nj-salary" type="number" min={0} value={salary || ''} onChange={(e) => setSalary(Number(e.target.value) || 0)} className="pl-9" placeholder="75000" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nj-frequency" className="text-sm font-medium">Pay Frequency</Label>
                  <Select value={payFrequency} onValueChange={(v) => setPayFrequency(v as PayFrequency)}>
                    <SelectTrigger id="nj-frequency"><SelectValue /></SelectTrigger>
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
                    <Label htmlFor="nj-hours" className="text-sm font-medium">Hours / Week</Label>
                    <Input id="nj-hours" type="number" min={1} max={168} value={hoursPerWeek} onChange={(e) => setHoursPerWeek(Number(e.target.value) || 40)} />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="nj-filing" className="text-sm font-medium">Filing Status</Label>
                  <Select value={filingStatus} onValueChange={(v) => setFilingStatus(v as typeof filingStatus)}>
                    <SelectTrigger id="nj-filing"><SelectValue /></SelectTrigger>
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
                      <Label htmlFor="nj-401k" className="text-sm font-medium">
                        <span className="flex items-center gap-1.5"><PiggyBank className="h-3.5 w-3.5 text-amber-400" />401(k) Annual</span>
                      </Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input id="nj-401k" type="number" min={0} max={24500} value={retirement401k || ''} onChange={(e) => setRetirement401k(Number(e.target.value) || 0)} className="pl-9" placeholder="0" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nj-hsa" className="text-sm font-medium">
                        <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5 text-emerald-400" />HSA Annual</span>
                      </Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input id="nj-hsa" type="number" min={0} max={4150} value={hsaContribution || ''} onChange={(e) => setHsaContribution(Number(e.target.value) || 0)} className="pl-9" placeholder="0" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          <AdSlot position="after-form" />
        </div>

        <div className="lg:col-span-2">
          <Card className="sticky top-20 border-emerald-500/20 bg-card/90 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-emerald-400" />New Jersey Take-Home
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
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground"><TrendingDown className="h-3.5 w-3.5 text-amber-400" />NJ State Tax (1.4%–10.75%)</span>
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
                <p className="text-xs font-medium text-amber-400">New Jersey Tax Breakdown</p>
                <div className="mt-1.5 space-y-1 text-xs text-muted-foreground">
                  <div className="flex justify-between"><span>Gross Income</span><span>{formatCurrency(result.grossAnnual)}</span></div>
                  {njBreakdown.standardDeduction > 0 && (
                    <div className="flex justify-between"><span>Less: Standard Deduction</span><span>-{formatCurrency(njBreakdown.standardDeduction)}</span></div>
                  )}
                  <div className="flex justify-between"><span>Less: Personal Exemption</span><span>-{formatCurrency(njBreakdown.personalExemption)}</span></div>
                  <div className="flex justify-between"><span>NJ Taxable Income</span><span>{formatCurrency(njBreakdown.njTaxableIncome)}</span></div>
                  {njBreakdown.bracketDetails.map((bd, i) => (
                    <div key={i} className="flex justify-between">
                      <span>Bracket {i + 1} ({parseFloat((bd.rate * 100).toFixed(2))}%)</span>
                      <span>{formatCurrency(bd.tax)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-medium text-amber-400"><span>NJ State Tax</span><span>{formatCurrency(njBreakdown.njTax)}</span></div>
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
          <CardTitle className="text-lg">2026 New Jersey Tax Rates &amp; Constants</CardTitle>
          <CardDescription>Key tax parameters for New Jersey paycheck calculations</CardDescription>
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
                <TableCell>NJ Tax Brackets</TableCell>
                <TableCell className="font-medium text-emerald-400">1.4% – 10.75% (7 brackets)</TableCell>
                <TableCell>Progressive rate structure from low to high income</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Bracket 1</TableCell>
                <TableCell className="font-medium text-emerald-400">1.4% ($0–$20,000)</TableCell>
                <TableCell>Lowest progressive bracket applies to first $20,000 of taxable income</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Bracket 2</TableCell>
                <TableCell className="font-medium text-emerald-400">1.75% ($20,001–$35,000)</TableCell>
                <TableCell>Applies to income between $20,001 and $35,000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Bracket 3</TableCell>
                <TableCell className="font-medium text-emerald-400">2.45% ($35,001–$40,000)</TableCell>
                <TableCell>Applies to income between $35,001 and $40,000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Bracket 4</TableCell>
                <TableCell className="font-medium text-emerald-400">3.5% ($40,001–$75,000)</TableCell>
                <TableCell>Applies to income between $40,001 and $75,000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Bracket 5</TableCell>
                <TableCell className="font-medium text-emerald-400">5.525% ($75,001–$500,000)</TableCell>
                <TableCell>Applies to income between $75,001 and $500,000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Bracket 6</TableCell>
                <TableCell className="font-medium text-emerald-400">6.37% ($500,001–$5,000,000)</TableCell>
                <TableCell>Applies to income between $500,001 and $5,000,000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Top Bracket</TableCell>
                <TableCell className="font-medium text-emerald-400">10.75% (Above $5,000,000)</TableCell>
                <TableCell>Highest bracket applies to all income above $5,000,000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Personal Exemption (Single)</TableCell>
                <TableCell className="font-medium">$1,000</TableCell>
                <TableCell>Subtracted from gross before tax computation</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Personal Exemption (Married)</TableCell>
                <TableCell className="font-medium">$2,000</TableCell>
                <TableCell>$1,000 per person for married filing jointly</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Standard Deduction</TableCell>
                <TableCell className="font-medium">$0</TableCell>
                <TableCell>New Jersey does not offer a standard deduction</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NJ Avg Property Tax Rate</TableCell>
                <TableCell className="font-medium text-red-400">~2.49%</TableCell>
                <TableCell>Highest in the nation — often exceeds income tax for homeowners</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Federal Standard Deduction</TableCell>
                <TableCell className="font-medium">$16,100</TableCell>
                <TableCell>Applied to federal tax calculation only</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Social Security Wage Cap</TableCell>
                <TableCell className="font-medium">{formatCurrency(FICA_2026.socialSecurityWageCap)}</TableCell>
                <TableCell>6.2% SS tax applies only up to this amount</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>FICA Total Rate</TableCell>
                <TableCell className="font-medium text-orange-400">7.65%</TableCell>
                <TableCell>6.2% SS + 1.45% Medicare (employee share)</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="rounded-xl border border-border/30 bg-muted/10 p-6" aria-hidden="true">
        <h2 className="text-xl font-bold text-foreground">New Jersey $75,000 Salary Example (2026)</h2>
        <div className="mt-3 space-y-1 text-sm text-muted-foreground">
          <p>Gross Annual Salary: $75,000.00</p>
          <p>NJ Personal Exemption: -$1,000.00</p>
          <p>NJ Taxable Income: $74,000.00</p>
          <p>1.4% bracket: $280.00</p>
          <p>1.75% bracket: $262.50</p>
          <p>2.45% bracket: $122.50</p>
          <p>3.5% bracket: $1,225.00</p>
          <p>NJ State Tax: $1,890.00</p>
          <p>Federal Tax (after $16,100 std deduction): $7,670.00</p>
          <p>FICA Total (7.65%): $5,737.50</p>
          <p>Total Deductions: $15,297.50</p>
          <p>Net Annual Take-Home: $59,702.50</p>
          <p>Monthly Take-Home: $4,975.21</p>
        </div>
      </div>

      <FAQSection title="New Jersey Tax FAQ — Common Questions Answered" faqs={NEWJERSEY_FAQS} />

      <AdSlot position="mid-content" />
    </div>
  );
}
