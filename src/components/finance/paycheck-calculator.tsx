'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Calculator,
  ChevronDown,
  ChevronUp,
  DollarSign,
  TrendingDown,
  TrendingUp,
  Shield,
  PiggyBank,
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
import { AdSlot } from './ad-slot';
import {
  calculatePaycheck,
  formatCurrency,
  formatPercent,
  type PayFrequency,
  type PaycheckInput,
} from '@/lib/finance-utils';
import { STATE_PROFILES } from '@/lib/tax-config';
import { useHashParams, updateHashState } from '@/hooks/use-hash-state';

interface PaycheckCalculatorProps {
  defaultState?: string;
  onStateChange?: (stateKey: string) => void;
}

export function PaycheckCalculator({ defaultState = 'illinois', onStateChange }: PaycheckCalculatorProps) {
  // Read initial values from URL hash using useSyncExternalStore-backed hooks
  const hashParams = useHashParams();
  const [salary, setSalary] = useState<number>(() => hashParams.salary ? Number(hashParams.salary) : 75000);
  const [payFrequency, setPayFrequency] = useState<PayFrequency>(() => (hashParams.frequency as PayFrequency) || 'annual');
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(() => hashParams.hours ? Number(hashParams.hours) : 40);
  const [stateKey, setStateKey] = useState<string>(() => hashParams.state || defaultState);
  const [filingStatus, setFilingStatus] = useState<'single' | 'married' | 'head_of_household'>(() => (hashParams.filing as 'single' | 'married' | 'head_of_household') || 'single');
  const [retirement401k, setRetirement401k] = useState<number>(() => hashParams.k401k ? Number(hashParams.k401k) : 0);
  const [hsaContribution, setHsaContribution] = useState<number>(() => hashParams.hsa ? Number(hashParams.hsa) : 0);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  // Sync state to URL hash whenever inputs change (side-effect only, no setState)
  useEffect(() => {
    updateHashState('home', {
      salary,
      frequency: payFrequency,
      hours: hoursPerWeek,
      state: stateKey,
      filing: filingStatus,
      k401k: retirement401k,
      hsa: hsaContribution,
    });
  }, [salary, payFrequency, hoursPerWeek, stateKey, filingStatus, retirement401k, hsaContribution]);

  const handleStateChange = (newState: string) => {
    setStateKey(newState);
    onStateChange?.(newState);
  };

  // Compute paycheck results
  const result = useMemo(() => {
    let annualSalary = salary;
    switch (payFrequency) {
      case 'monthly': annualSalary = salary * 12; break;
      case 'biweekly': annualSalary = salary * 26; break;
      case 'weekly': annualSalary = salary * 52; break;
      case 'hourly': annualSalary = salary * hoursPerWeek * 52; break;
      default: annualSalary = salary;
    }

    const input: PaycheckInput = {
      annualSalary,
      payFrequency,
      hoursPerWeek,
      retirement401k,
      hsaContribution,
      stateKey,
      filingStatus,
    };

    return calculatePaycheck(input);
  }, [salary, payFrequency, hoursPerWeek, retirement401k, hsaContribution, stateKey, filingStatus]);

  const periodLabel = payFrequency === 'hourly' ? 'Hourly' : payFrequency === 'annual' ? 'Annual' : `Per ${payFrequency === 'biweekly' ? 'Bi-Weekly' : payFrequency === 'weekly' ? 'Weekly' : 'Monthly'}`;

  return (
    <div className="space-y-6">
      {/* ─── Page Title ────────────────────────────────────── */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Paycheck Calculator
        </h1>
        <p className="mt-2 text-muted-foreground">
          Instantly compute your take-home pay with federal, FICA, and state tax deductions
        </p>
      </div>

      {/* ─── 3-Tier Progressive Disclosure Form ──────────── */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Left: Form */}
        <div className="space-y-4 lg:col-span-3">
          {/* Tier 1: Quick Start */}
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calculator className="h-5 w-5 text-emerald-400" />
                Quick Start
              </CardTitle>
              <CardDescription>Enter your salary details for an instant calculation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="salary" className="text-sm font-medium">
                    Salary / Hourly Rate
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="salary"
                      type="number"
                      min={0}
                      value={salary || ''}
                      onChange={(e) => setSalary(Number(e.target.value) || 0)}
                      className="pl-9"
                      placeholder="75000"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="frequency" className="text-sm font-medium">
                    Pay Frequency
                  </Label>
                  <Select value={payFrequency} onValueChange={(v) => setPayFrequency(v as PayFrequency)}>
                    <SelectTrigger id="frequency">
                      <SelectValue />
                    </SelectTrigger>
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

              <div className="grid gap-4 sm:grid-cols-3">
                {payFrequency === 'hourly' && (
                  <div className="space-y-2">
                    <Label htmlFor="hours" className="text-sm font-medium">
                      Hours / Week
                    </Label>
                    <Input
                      id="hours"
                      type="number"
                      min={1}
                      max={168}
                      value={hoursPerWeek}
                      onChange={(e) => setHoursPerWeek(Number(e.target.value) || 40)}
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="state" className="text-sm font-medium">
                    State
                  </Label>
                  <Select value={stateKey} onValueChange={handleStateChange}>
                    <SelectTrigger id="state">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(STATE_PROFILES).map(([key, profile]) => (
                        <SelectItem key={key} value={key}>
                          {profile.name} ({profile.incomeTaxType === 'none' ? '0%' : `${(profile.incomeTaxRate * 100).toFixed(2)}%`})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="filing" className="text-sm font-medium">
                    Filing Status
                  </Label>
                  <Select value={filingStatus} onValueChange={(v) => setFilingStatus(v as typeof filingStatus)}>
                    <SelectTrigger id="filing">
                      <SelectValue />
                    </SelectTrigger>
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

          {/* Tier 2: Advanced Options Accordion */}
          <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
            <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer pb-4 transition-colors hover:bg-muted/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-amber-400" />
                      <CardTitle className="text-lg">Advanced Options</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        401(k) &amp; HSA
                      </Badge>
                    </div>
                    {advancedOpen ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <CardDescription>
                    Pre-tax retirement and health savings contributions
                  </CardDescription>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="space-y-4 pt-0">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="401k" className="text-sm font-medium">
                        <span className="flex items-center gap-1.5">
                          <PiggyBank className="h-3.5 w-3.5 text-amber-400" />
                          401(k) Annual Contribution
                        </span>
                      </Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="401k"
                          type="number"
                          min={0}
                          max={23500}
                          value={retirement401k || ''}
                          onChange={(e) => setRetirement401k(Number(e.target.value) || 0)}
                          className="pl-9"
                          placeholder="0"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">2026 limit: $23,500</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hsa" className="text-sm font-medium">
                        <span className="flex items-center gap-1.5">
                          <Shield className="h-3.5 w-3.5 text-emerald-400" />
                          HSA Annual Contribution
                        </span>
                      </Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="hsa"
                          type="number"
                          min={0}
                          max={4150}
                          value={hsaContribution || ''}
                          onChange={(e) => setHsaContribution(Number(e.target.value) || 0)}
                          className="pl-9"
                          placeholder="0"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">2026 limit: $4,150 (individual)</p>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Ad Slot After Form */}
          <AdSlot position="after-form" />
        </div>

        {/* Right: Tier 3 — Instant Live Results */}
        <div className="lg:col-span-2">
          <Card className="sticky top-20 border-emerald-500/20 bg-card/90 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-emerald-400" />
                Live Results
              </CardTitle>
              <CardDescription>
                Calculations update instantly as you type
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Net Take-Home - Hero Number */}
              <div className="rounded-xl bg-emerald-500/10 p-4 text-center">
                <p className="text-xs font-medium uppercase tracking-wider text-emerald-400/80">
                  Net Take-Home ({periodLabel})
                </p>
                <p className="mt-1 text-3xl font-bold text-emerald-400">
                  {formatCurrency(result.netPerPeriod)}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Annual Net: {formatCurrency(result.netAnnual)}
                </p>
              </div>

              <Separator className="bg-border/40" />

              {/* Gross Pay */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Gross Annual</span>
                <span className="font-semibold text-foreground">{formatCurrency(result.grossAnnual)}</span>
              </div>

              {/* Deductions Breakdown */}
              <div className="space-y-2.5 rounded-lg bg-muted/30 p-3">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Deductions
                </p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <TrendingDown className="h-3.5 w-3.5 text-red-400" />
                    Federal Tax
                  </span>
                  <span className="text-sm font-medium text-red-400">
                    -{formatCurrency(result.federalTax)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <TrendingDown className="h-3.5 w-3.5 text-orange-400" />
                    FICA (SS + Medicare)
                  </span>
                  <span className="text-sm font-medium text-orange-400">
                    -{formatCurrency(result.ficaTotal)}
                  </span>
                </div>
                {result.stateTax > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <TrendingDown className="h-3.5 w-3.5 text-amber-400" />
                      State Tax ({result.stateProfile?.name})
                    </span>
                    <span className="text-sm font-medium text-amber-400">
                      -{formatCurrency(result.stateTax)}
                  </span>
                  </div>
                )}
                {result.retirement401k > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <PiggyBank className="h-3.5 w-3.5 text-amber-400" />
                      401(k)
                    </span>
                    <span className="text-sm font-medium text-amber-400">
                      -{formatCurrency(result.retirement401k)}
                    </span>
                  </div>
                )}
                {result.hsaContribution > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Shield className="h-3.5 w-3.5 text-emerald-400" />
                      HSA
                    </span>
                    <span className="text-sm font-medium text-emerald-400">
                      -{formatCurrency(result.hsaContribution)}
                    </span>
                  </div>
                )}
              </div>

              <Separator className="bg-border/40" />

              {/* Tax Rate Summary */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-muted/30 p-2.5 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Effective Rate
                  </p>
                  <p className="text-lg font-bold text-foreground">
                    {formatPercent(result.effectiveTaxRate)}
                  </p>
                </div>
                <div className="rounded-lg bg-muted/30 p-2.5 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Marginal Rate
                  </p>
                  <p className="text-lg font-bold text-foreground">
                    {formatPercent(result.marginalTaxRate)}
                  </p>
                </div>
              </div>

              {/* FICA Detail */}
              <div className="rounded-lg bg-muted/20 p-3">
                <p className="text-xs font-medium text-muted-foreground">FICA Breakdown</p>
                <div className="mt-1.5 space-y-1 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Social Security (6.2%)</span>
                    <span>{formatCurrency(result.ficaSocialSecurity)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Medicare (1.45%)</span>
                    <span>{formatCurrency(result.ficaMedicare)}</span>
                  </div>
                  {result.ficaAdditionalMedicare > 0 && (
                    <div className="flex justify-between text-red-400">
                      <span>Additional Medicare (0.9%)</span>
                      <span>{formatCurrency(result.ficaAdditionalMedicare)}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ad Slot After Results */}
          <div className="mt-6">
            <AdSlot position="after-results" />
          </div>
        </div>
      </div>

      {/* ─── Pre-Rendered Default Example for LLM/GEO Crawlers ──── */}
      <div className="mt-8 rounded-xl border border-border/30 bg-muted/10 p-6" aria-hidden="true">
        <h2 className="text-xl font-bold text-foreground">
          Example Paycheck Calculation: $75,000 Salary in Illinois (2026)
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          For a single filer earning $75,000 annually in Illinois with standard deduction of $15,000
          and Illinois personal exemption of $2,775:
        </p>
        <div className="mt-4 space-y-1 text-sm text-muted-foreground">
          <p>Gross Annual Salary: $75,000.00</p>
          <p>Federal Tax (after $15,000 standard deduction): $8,717.50</p>
          <p>FICA - Social Security (6.2%): $4,650.00</p>
          <p>FICA - Medicare (1.45%): $1,087.50</p>
          <p>Illinois State Tax (4.95% on $75,000 - $2,775): $3,576.38</p>
          <p>Total Deductions: $18,031.38</p>
          <p>Net Annual Take-Home Pay: $56,968.62</p>
          <p>Effective Tax Rate: 24.04%</p>
          <p>Monthly Take-Home: $4,747.39</p>
          <p>Bi-Weekly Take-Home: $2,191.10</p>
        </div>
      </div>
    </div>
  );
}
