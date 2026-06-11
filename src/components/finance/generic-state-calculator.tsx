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
import { FAQSection, GENERIC_STATE_FAQS } from './faq-sections';
import {
  calculatePaycheck,
  formatCurrency,
  formatPercent,
} from '@/lib/finance-utils';
import { FICA_2026, STATE_PROFILES, type PayFrequency } from '@/lib/tax-config';
import { useHashParams, updateHashState } from '@/hooks/use-hash-state';

interface GenericStateCalculatorProps {
  stateKey: string;
}

export function GenericStateCalculator({ stateKey }: GenericStateCalculatorProps) {
  const stateProfile = STATE_PROFILES[stateKey];
  if (!stateProfile) {
    throw new Error(`State profile not found for key: ${stateKey}`);
  }

  const abbr = stateProfile.abbreviation.toLowerCase();
  const isNoTax = stateProfile.incomeTaxType === 'none';
  const isFlat = stateProfile.incomeTaxType === 'flat';
  const isProgressive = stateProfile.incomeTaxType === 'progressive';

  const hashParams = useHashParams();
  const [salary, setSalary] = useState<number>(() => hashParams.salary ? Number(hashParams.salary) : 75000);
  const [payFrequency, setPayFrequency] = useState<PayFrequency>(() => (hashParams.frequency as PayFrequency) || 'annual');
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(() => hashParams.hours ? Number(hashParams.hours) : 40);
  const [filingStatus, setFilingStatus] = useState<'single' | 'married' | 'head_of_household'>(() => (hashParams.filing as 'single' | 'married' | 'head_of_household') || 'single');
  const [retirement401k, setRetirement401k] = useState<number>(() => hashParams.k401k ? Number(hashParams.k401k) : 0);
  const [hsaContribution, setHsaContribution] = useState<number>(() => hashParams.hsa ? Number(hashParams.hsa) : 0);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  useEffect(() => {
    updateHashState(stateKey, {
      salary,
      frequency: payFrequency,
      hours: hoursPerWeek,
      filing: filingStatus,
      k401k: retirement401k,
      hsa: hsaContribution,
    });
  }, [salary, payFrequency, hoursPerWeek, filingStatus, retirement401k, hsaContribution, stateKey]);

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
  }, [salary, payFrequency, hoursPerWeek, retirement401k, hsaContribution, filingStatus, stateKey]);

  const periodLabel = payFrequency === 'hourly' ? 'Hourly' : payFrequency === 'annual' ? 'Annual' : `Per ${payFrequency === 'biweekly' ? 'Bi-Weekly' : payFrequency === 'weekly' ? 'Weekly' : 'Monthly'}`;

  // State tax breakdown for flat tax states
  const flatBreakdown = useMemo(() => {
    if (!isFlat) return null;
    const gross = result.grossAnnual;
    const pretax = retirement401k + hsaContribution;
    const personalExemption = stateProfile.personalExemptionsByFiling?.[filingStatus] ?? stateProfile.personalExemption;
    const standardDeduction = stateProfile.standardDeductionsByFiling?.[filingStatus] ?? stateProfile.standardDeduction;
    const stateTaxableIncome = Math.max(0, gross - pretax - personalExemption - standardDeduction);
    const stateTax = stateTaxableIncome * stateProfile.incomeTaxRate;
    return { stateTaxableIncome, stateTax, personalExemption, standardDeduction };
  }, [result.grossAnnual, retirement401k, hsaContribution, filingStatus, stateProfile, isFlat]);

  // Tax rate label
  const taxRateLabel = useMemo(() => {
    if (isNoTax) return '0%';
    if (isFlat) return `${(stateProfile.incomeTaxRate * 100).toFixed(2)}%`;
    if (stateProfile.brackets && stateProfile.brackets.length > 0) {
      const minRate = (stateProfile.brackets[0].rate * 100).toFixed(2);
      const maxRate = (stateProfile.brackets[stateProfile.brackets.length - 1].rate * 100).toFixed(1);
      return `${minRate}%–${maxRate}%`;
    }
    return '';
  }, [isNoTax, isFlat, stateProfile]);

  // Example calculation for $75k
  const exampleCalc = useMemo(() => {
    const gross = 75000;
    const fedTax = 7670;
    const fica = 5737.5;
    const stdDeduction = stateProfile.standardDeductionsByFiling?.single ?? stateProfile.standardDeduction;
    const exemption = stateProfile.personalExemptionsByFiling?.single ?? stateProfile.personalExemption;
    const taxableIncome = Math.max(0, gross - stdDeduction - exemption);

    let stateTax = 0;
    if (isNoTax) {
      stateTax = 0;
    } else if (isFlat) {
      stateTax = taxableIncome * stateProfile.incomeTaxRate;
    } else if (stateProfile.brackets) {
      let remaining = taxableIncome;
      for (const bracket of stateProfile.brackets) {
        const bracketWidth = bracket.max ? Math.min(bracket.max, taxableIncome) - bracket.min : remaining;
        const taxableInBracket = Math.max(0, Math.min(remaining, bracketWidth > 0 ? bracketWidth : remaining));
        stateTax += taxableInBracket * bracket.rate;
        remaining -= taxableInBracket;
        if (remaining <= 0) break;
      }
    }

    const totalDeductions = fedTax + fica + stateTax;
    const netAnnual = gross - totalDeductions;
    return { gross, fedTax, fica, stateTax, stdDeduction, exemption, taxableIncome, totalDeductions, netAnnual, monthly: netAnnual / 12 };
  }, [stateProfile, isNoTax, isFlat]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="flex items-center justify-center gap-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          <MapPin className="h-8 w-8 text-emerald-400" />
          {stateProfile.name} Paycheck Calculator
        </h2>
        <p className="mt-2 text-muted-foreground">
          {isNoTax
            ? 'Zero state income tax — see your full take-home with only federal & FICA deductions'
            : isFlat
              ? `${stateProfile.name} flat ${taxRateLabel} income tax — complete take-home breakdown`
              : `${stateProfile.name} progressive income tax (${taxRateLabel}) — complete take-home breakdown`
          }
        </p>
      </div>

      {/* Info Card */}
      <Card className="border-emerald-500/20 bg-emerald-500/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">
                {isNoTax
                  ? `${stateProfile.name}: No State Income Tax`
                  : `How ${stateProfile.name} Income Tax Works`
                }
              </p>
              {isNoTax ? (
                <p>
                  {stateProfile.name} is one of nine U.S. states with <strong className="text-emerald-400">0% state income tax</strong>.
                  Your paycheck is only subject to federal tax and FICA. {stateProfile.description.split('.')[0]}.
                </p>
              ) : isFlat ? (
                <>
                  <p>
                    {stateProfile.name} uses a <strong className="text-emerald-400">flat tax rate of {taxRateLabel}</strong> on
                    all taxable income.{' '}
                    {stateProfile.standardDeduction > 0 && (
                      <>The state offers a <strong className="text-emerald-400">standard deduction</strong>{' '}
                        (${stateProfile.standardDeductionsByFiling?.single?.toLocaleString() ?? stateProfile.standardDeduction.toLocaleString()} single / ${stateProfile.standardDeductionsByFiling?.married?.toLocaleString() ?? stateProfile.standardDeduction.toLocaleString()} married).{' '}
                      </>
                    )}
                    {stateProfile.personalExemption > 0 && (
                      <>A <strong className="text-emerald-400">personal exemption</strong>{' '}
                        of ${stateProfile.personalExemptionsByFiling?.single?.toLocaleString() ?? stateProfile.personalExemption.toLocaleString()} per person is also subtracted from gross income.
                      </>
                    )}
                  </p>
                  <p>
                    For a $75,000 salary (single): Taxable income = $75,000
                    {stateProfile.standardDeductionsByFiling?.single ? ` - $${stateProfile.standardDeductionsByFiling.single.toLocaleString()}` : stateProfile.standardDeduction > 0 ? ` - $${stateProfile.standardDeduction.toLocaleString()}` : ''}
                    {stateProfile.personalExemptionsByFiling?.single ? ` - $${stateProfile.personalExemptionsByFiling.single.toLocaleString()}` : stateProfile.personalExemption > 0 ? ` - $${stateProfile.personalExemption.toLocaleString()}` : ''}
                    {' '}= ${exampleCalc.taxableIncome.toLocaleString()}. State tax = ${exampleCalc.taxableIncome.toLocaleString()} × {taxRateLabel} = {formatCurrency(exampleCalc.stateTax)}.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    {stateProfile.name} uses a <strong className="text-emerald-400">progressive tax system with brackets from {taxRateLabel}</strong>.
                    {stateProfile.standardDeduction > 0 && (
                      <> The state offers a <strong className="text-emerald-400">standard deduction</strong>{' '}
                        (${stateProfile.standardDeductionsByFiling?.single?.toLocaleString() ?? stateProfile.standardDeduction.toLocaleString()} single / ${stateProfile.standardDeductionsByFiling?.married?.toLocaleString() ?? stateProfile.standardDeduction.toLocaleString()} married).</>
                    )}
                    {stateProfile.personalExemption > 0 && (
                      <> A <strong className="text-emerald-400">personal exemption</strong> of ${stateProfile.personalExemptionsByFiling?.single?.toLocaleString() ?? stateProfile.personalExemption.toLocaleString()} per person also reduces taxable income.</>
                    )}
                  </p>
                  <p>
                    For a $75,000 salary (single):{' '}
                    {stateProfile.standardDeductionsByFiling?.single ? `${stateProfile.name} standard deduction = $${stateProfile.standardDeductionsByFiling.single.toLocaleString()}. ` : stateProfile.standardDeduction > 0 ? `${stateProfile.name} standard deduction = $${stateProfile.standardDeduction.toLocaleString()}. ` : ''}
                    Taxable income = ${exampleCalc.taxableIncome.toLocaleString()}. State tax is calculated using progressive brackets.
                  </p>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Layout */}
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-3">
          {/* Salary Input Card */}
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <DollarSign className="h-5 w-5 text-emerald-400" />Salary Input
              </CardTitle>
              <CardDescription>Enter your {stateProfile.name} salary for an instant calculation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`${abbr}-salary`} className="text-sm font-medium">Salary / Hourly Rate</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id={`${abbr}-salary`} type="number" min={0} value={salary || ''} onChange={(e) => setSalary(Number(e.target.value) || 0)} className="pl-9" placeholder="75000" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${abbr}-frequency`} className="text-sm font-medium">Pay Frequency</Label>
                  <Select value={payFrequency} onValueChange={(v) => setPayFrequency(v as PayFrequency)}>
                    <SelectTrigger id={`${abbr}-frequency`}><SelectValue /></SelectTrigger>
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
                    <Label htmlFor={`${abbr}-hours`} className="text-sm font-medium">Hours / Week</Label>
                    <Input id={`${abbr}-hours`} type="number" min={1} max={168} value={hoursPerWeek} onChange={(e) => setHoursPerWeek(Number(e.target.value) || 40)} />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor={`${abbr}-filing`} className="text-sm font-medium">Filing Status</Label>
                  <Select value={filingStatus} onValueChange={(v) => setFilingStatus(v as typeof filingStatus)}>
                    <SelectTrigger id={`${abbr}-filing`}><SelectValue /></SelectTrigger>
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

          {/* Advanced Options */}
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
                      <Label htmlFor={`${abbr}-401k`} className="text-sm font-medium">
                        <span className="flex items-center gap-1.5"><PiggyBank className="h-3.5 w-3.5 text-amber-400" />401(k) Annual</span>
                      </Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input id={`${abbr}-401k`} type="number" min={0} max={23500} value={retirement401k || ''} onChange={(e) => setRetirement401k(Number(e.target.value) || 0)} className="pl-9" placeholder="0" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`${abbr}-hsa`} className="text-sm font-medium">
                        <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5 text-emerald-400" />HSA Annual</span>
                      </Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input id={`${abbr}-hsa`} type="number" min={0} max={4150} value={hsaContribution || ''} onChange={(e) => setHsaContribution(Number(e.target.value) || 0)} className="pl-9" placeholder="0" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          <AdSlot position="after-form" />
        </div>

        {/* Results Column */}
        <div className="lg:col-span-2">
          <Card className="sticky top-20 border-emerald-500/20 bg-card/90 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-emerald-400" />{stateProfile.name} Take-Home
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-xl bg-emerald-500/10 p-4 text-center">
                <p className="text-xs font-medium uppercase tracking-wider text-emerald-400/80">Net Take-Home ({periodLabel})</p>
                <p className="mt-1 text-3xl font-bold text-emerald-400">{formatCurrency(result.netPerPeriod)}</p>
                <p className="mt-1 text-xs text-muted-foreground">Annual Net: {formatCurrency(result.netAnnual)}</p>
              </div>

              {isNoTax && (
                <div className="rounded-lg bg-emerald-500/5 p-3 text-center">
                  <p className="text-xs text-muted-foreground">State Income Tax</p>
                  <p className="text-xl font-bold text-emerald-400">$0.00</p>
                  <p className="text-xs text-emerald-400/60">{stateProfile.name} has 0% income tax</p>
                </div>
              )}

              <Separator className="bg-border/40" />

              <div className="space-y-2.5 rounded-lg bg-muted/30 p-3">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {isNoTax ? 'Deductions (Federal Only)' : 'Deductions'}
                </p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground"><TrendingDown className="h-3.5 w-3.5 text-red-400" />Federal Tax</span>
                  <span className="text-sm font-medium text-red-400">-{formatCurrency(result.federalTax)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground"><TrendingDown className="h-3.5 w-3.5 text-orange-400" />FICA</span>
                  <span className="text-sm font-medium text-orange-400">-{formatCurrency(result.ficaTotal)}</span>
                </div>
                {!isNoTax && (
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground"><TrendingDown className="h-3.5 w-3.5 text-amber-400" />{stateProfile.abbreviation} State Tax ({taxRateLabel})</span>
                    <span className="text-sm font-medium text-amber-400">-{formatCurrency(result.stateTax)}</span>
                  </div>
                )}
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

              {/* State Tax Breakdown Detail - for flat tax states */}
              {isFlat && flatBreakdown && (
                <div className="rounded-lg bg-amber-500/5 p-3">
                  <p className="text-xs font-medium text-amber-400">{stateProfile.name} Tax Breakdown</p>
                  <div className="mt-1.5 space-y-1 text-xs text-muted-foreground">
                    <div className="flex justify-between"><span>Gross Income</span><span>{formatCurrency(result.grossAnnual)}</span></div>
                    {flatBreakdown.personalExemption > 0 && (
                      <div className="flex justify-between"><span>Less: Personal Exemption</span><span>-{formatCurrency(flatBreakdown.personalExemption)}</span></div>
                    )}
                    {flatBreakdown.standardDeduction > 0 && (
                      <div className="flex justify-between"><span>Less: Standard Deduction</span><span>-{formatCurrency(flatBreakdown.standardDeduction)}</span></div>
                    )}
                    <div className="flex justify-between"><span>{stateProfile.abbreviation} Taxable Income</span><span>{formatCurrency(flatBreakdown.stateTaxableIncome)}</span></div>
                    <div className="flex justify-between"><span>{stateProfile.abbreviation} Tax Rate</span><span>{taxRateLabel}</span></div>
                    <div className="flex justify-between font-medium text-amber-400"><span>{stateProfile.abbreviation} State Tax</span><span>{formatCurrency(flatBreakdown.stateTax)}</span></div>
                  </div>
                </div>
              )}

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

      {/* Tax Rates Table */}
      <Card className="border-border/50 bg-card/80">
        <CardHeader>
          <CardTitle className="text-lg">2026 {stateProfile.name} Tax Rates &amp; Constants</CardTitle>
          <CardDescription>Key tax parameters for {stateProfile.name} paycheck calculations</CardDescription>
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
                <TableCell className="font-medium text-emerald-400">
                  {isNoTax ? '0% (No State Tax)' : isFlat ? `${taxRateLabel} (Flat)` : `${taxRateLabel} (Progressive)`}
                </TableCell>
                <TableCell>
                  {isNoTax ? 'No state income tax on wages' : isFlat ? 'Applies uniformly to all taxable income' : `${stateProfile.brackets?.length ?? 0} brackets`}
                </TableCell>
              </TableRow>
              {stateProfile.standardDeductionsByFiling?.single ? (
                <>
                  <TableRow>
                    <TableCell>Standard Deduction (Single)</TableCell>
                    <TableCell className="font-medium">${stateProfile.standardDeductionsByFiling.single.toLocaleString()}</TableCell>
                    <TableCell>Subtracted from gross before tax computation</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Standard Deduction (Married)</TableCell>
                    <TableCell className="font-medium">${stateProfile.standardDeductionsByFiling.married.toLocaleString()}</TableCell>
                    <TableCell>Married filing jointly</TableCell>
                  </TableRow>
                </>
              ) : stateProfile.standardDeduction > 0 ? (
                <TableRow>
                  <TableCell>Standard Deduction</TableCell>
                  <TableCell className="font-medium">${stateProfile.standardDeduction.toLocaleString()}</TableCell>
                  <TableCell>Subtracted from gross before tax computation</TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell>Standard Deduction</TableCell>
                  <TableCell className="font-medium">N/A</TableCell>
                  <TableCell>{stateProfile.name} does not offer a state standard deduction</TableCell>
                </TableRow>
              )}
              {stateProfile.personalExemptionsByFiling?.single ? (
                <>
                  <TableRow>
                    <TableCell>Personal Exemption (Single)</TableCell>
                    <TableCell className="font-medium">${stateProfile.personalExemptionsByFiling.single.toLocaleString()}</TableCell>
                    <TableCell>Per person exemption subtracted from gross income</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Personal Exemption (Married)</TableCell>
                    <TableCell className="font-medium">${stateProfile.personalExemptionsByFiling.married.toLocaleString()}</TableCell>
                    <TableCell>Married filing jointly</TableCell>
                  </TableRow>
                </>
              ) : stateProfile.personalExemption > 0 ? (
                <TableRow>
                  <TableCell>Personal Exemption</TableCell>
                  <TableCell className="font-medium">${stateProfile.personalExemption.toLocaleString()}</TableCell>
                  <TableCell>Subtracted from gross before tax computation</TableCell>
                </TableRow>
              ) : null}
              <TableRow>
                <TableCell>Federal Standard Deduction</TableCell>
                <TableCell className="font-medium">${FICA_2026.socialSecurityWageCap ? '16,100' : '16,100'}</TableCell>
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

      {/* $75,000 Salary Example */}
      <div className="rounded-xl border border-border/30 bg-muted/10 p-6" aria-hidden="true">
        <h2 className="text-xl font-bold text-foreground">{stateProfile.name} $75,000 Salary Example (2026)</h2>
        <div className="mt-3 space-y-1 text-sm text-muted-foreground">
          <p>Gross Annual Salary: $75,000.00</p>
          {isNoTax ? (
            <p>{stateProfile.name} State Income Tax: $0.00 (0% — no state income tax)</p>
          ) : (
            <>
              {exampleCalc.stdDeduction > 0 && <p>{stateProfile.abbreviation} Standard Deduction: -${exampleCalc.stdDeduction.toLocaleString()}</p>}
              {exampleCalc.exemption > 0 && <p>{stateProfile.abbreviation} Personal Exemption: -${exampleCalc.exemption.toLocaleString()}</p>}
              <p>{stateProfile.abbreviation} Taxable Income: ${exampleCalc.taxableIncome.toLocaleString()}</p>
              <p>{stateProfile.abbreviation} State Tax ({taxRateLabel}): {isProgressive ? `~${formatCurrency(exampleCalc.stateTax)}` : formatCurrency(exampleCalc.stateTax)}</p>
            </>
          )}
          <p>Federal Tax (after $16,100 std deduction): ${exampleCalc.fedTax.toLocaleString()}</p>
          <p>FICA Total (7.65%): ${exampleCalc.fica.toLocaleString()}</p>
          <p>Total Deductions: {isProgressive ? `~${formatCurrency(exampleCalc.totalDeductions)}` : formatCurrency(exampleCalc.totalDeductions)}</p>
          <p>Net Annual Take-Home: {isProgressive ? `~${formatCurrency(exampleCalc.netAnnual)}` : formatCurrency(exampleCalc.netAnnual)}</p>
          <p>Monthly Take-Home: {isProgressive ? `~${formatCurrency(exampleCalc.monthly)}` : formatCurrency(exampleCalc.monthly)}</p>
        </div>
      </div>

      <FAQSection title={`${stateProfile.name} Tax FAQ — Common Questions Answered`} faqs={GENERIC_STATE_FAQS} />

      <AdSlot position="mid-content" />
    </div>
  );
}
