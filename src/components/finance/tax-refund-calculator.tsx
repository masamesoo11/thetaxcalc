'use client';

import { useState, useMemo } from 'react';
import {
  Calculator,
  ChevronDown,
  ChevronUp,
  DollarSign,
  TrendingDown,
  TrendingUp,
  Shield,
  Users,
  Receipt,
  ArrowRight,
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
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { AdSlot } from './ad-slot';
import {
  FEDERAL_TAX_2026,
  FICA_2026,
  STATE_PROFILES,
} from '@/lib/tax-config';
import { formatCurrency, roundCurrency } from '@/lib/finance-utils';

// ─── Types ──────────────────────────────────────────────────────────────────

type FilingStatus = 'single' | 'married' | 'head_of_household';
type DeductionType = 'standard' | 'itemized';

interface TaxRefundResult {
  grossIncome: number;
  totalDeduction: number;
  taxableIncome: number;
  federalTaxOwed: number;
  ficaTotal: number;
  ficaSocialSecurity: number;
  ficaMedicare: number;
  ficaAdditionalMedicare: number;
  childTaxCredit: number;
  earnedIncomeCredit: number;
  totalCredits: number;
  federalTaxAfterCredits: number;
  federalTaxWithheld: number;
  federalRefund: number;
  stateTaxOwed: number;
  stateTaxWithheld: number;
  stateRefund: number;
  totalRefund: number;
  effectiveFederalRate: number;
  marginalFederalRate: number;
}

// ─── EIC Table (simplified 2026) ────────────────────────────────────────────

function calculateEIC(earnedIncome: number, filingStatus: FilingStatus, dependents: number): number {
  if (dependents <= 0) return 0;

  const maxCredits: Record<number, number> = { 1: 632, 2: 4212, 3: 7430 };
  const phaseOutStart: Record<string, Record<number, number>> = {
    single: { 1: 12360, 2: 22720, 3: 22720 },
    married: { 1: 13380, 2: 23740, 3: 23740 },
    head_of_household: { 1: 13380, 2: 23740, 3: 23740 },
  };
  const phaseOutEnd: Record<string, Record<number, number>> = {
    single: { 1: 19160, 2: 49320, 3: 55770 },
    married: { 1: 21340, 2: 54980, 3: 61430 },
    head_of_household: { 1: 21340, 2: 54980, 3: 61430 },
  };

  const numChildren = Math.min(dependents, 3);
  const maxCredit = maxCredits[numChildren] ?? 0;
  const start = phaseOutStart[filingStatus]?.[numChildren] ?? 0;
  const end = phaseOutEnd[filingStatus]?.[numChildren] ?? 0;

  if (earnedIncome <= 0) return 0;
  if (earnedIncome > end) return 0;

  // Build-up phase
  const buildUpEnd = start;
  let credit = 0;
  if (earnedIncome <= buildUpEnd) {
    const buildUpRate = maxCredit / buildUpEnd;
    credit = earnedIncome * buildUpRate;
  } else {
    credit = maxCredit;
    // Phase-out
    const phaseOutRange = end - start;
    const phaseOutRate = maxCredit / phaseOutRange;
    const excessIncome = earnedIncome - start;
    credit = maxCredit - excessIncome * phaseOutRate;
  }

  return Math.max(0, roundCurrency(credit));
}

// ─── Federal Tax Calculation ────────────────────────────────────────────────

function calculateFederalTaxOwed(
  grossIncome: number,
  filingStatus: FilingStatus,
  deductionType: DeductionType,
  itemizedDeduction: number,
  dependents: number
): { taxOwed: number; taxableIncome: number; totalDeduction: number; childTaxCredit: number; eic: number; ficaTotal: number; ficaSS: number; ficaMedicare: number; ficaAdditional: number; marginalRate: number } {
  const standardDeduction = FEDERAL_TAX_2026.standardDeductionsByFiling[filingStatus] ?? FEDERAL_TAX_2026.standardDeduction;
  const totalDeduction = deductionType === 'standard' ? standardDeduction : itemizedDeduction;
  const taxableIncome = Math.max(0, grossIncome - totalDeduction);

  // Progressive brackets
  const brackets = FEDERAL_TAX_2026.bracketsByFiling[filingStatus] ?? FEDERAL_TAX_2026.brackets;
  let tax = 0;
  let remaining = taxableIncome;
  let marginalRate = 0;

  for (const bracket of brackets) {
    if (remaining <= 0) break;
    const bracketWidth = bracket.max === null ? remaining : bracket.max - bracket.min;
    const taxableInBracket = Math.min(remaining, bracketWidth);
    tax += taxableInBracket * bracket.rate;
    remaining -= taxableInBracket;
    marginalRate = bracket.rate;
  }

  // FICA
  const ssWages = Math.min(grossIncome, FICA_2026.socialSecurityWageCap);
  const ficaSS = ssWages * FICA_2026.socialSecurityRate;
  const ficaMedicare = grossIncome * FICA_2026.medicareRate;
  const ficaAdditional = grossIncome > FICA_2026.additionalMedicareThreshold
    ? (grossIncome - FICA_2026.additionalMedicareThreshold) * FICA_2026.additionalMedicareRate
    : 0;
  const ficaTotal = ficaSS + ficaMedicare + ficaAdditional;

  // Child Tax Credit
  let childTaxCredit = 0;
  if (dependents > 0) {
    childTaxCredit = dependents * 2000;
    // Phase-out
    const phaseOutStart = filingStatus === 'married' ? 400000 : 200000;
    if (grossIncome > phaseOutStart) {
      const reduction = Math.floor((grossIncome - phaseOutStart) / 1000) * 50;
      childTaxCredit = Math.max(0, childTaxCredit - reduction);
    }
  }

  // Earned Income Credit
  const eic = calculateEIC(grossIncome, filingStatus, dependents);

  // Apply credits (non-refundable portion first)
  const nonRefundableCredits = childTaxCredit; // Simplified: treat full CTC as non-refundable cap
  const taxAfterNonRefundable = Math.max(0, tax - nonRefundableCredits);
  // Refundable portion of CTC (up to $1,700 per child)
  const refundableCTC = dependents > 0 ? Math.min(dependents * 1700, childTaxCredit) : 0;
  const refundableCreditsUsed = Math.min(refundableCTC, tax); // refundable applies against remaining tax
  const taxOwed = Math.max(0, taxAfterNonRefundable - refundableCreditsUsed);

  // Total credits applied
  const totalCreditsApplied = tax - taxOwed;

  return {
    taxOwed: roundCurrency(taxOwed),
    taxableIncome: roundCurrency(taxableIncome),
    totalDeduction: roundCurrency(totalDeduction),
    childTaxCredit: roundCurrency(totalCreditsApplied + eic),
    eic: roundCurrency(eic),
    ficaTotal: roundCurrency(ficaTotal),
    ficaSS: roundCurrency(ficaSS),
    ficaMedicare: roundCurrency(ficaMedicare),
    ficaAdditional: roundCurrency(ficaAdditional),
    marginalRate,
  };
}

// ─── State Tax Calculation ──────────────────────────────────────────────────

function calculateStateTaxOwed(
  grossIncome: number,
  stateKey: string,
  filingStatus: FilingStatus
): number {
  const state = STATE_PROFILES[stateKey];
  if (!state || !state.hasIncomeTax) return 0;

  if (state.incomeTaxType === 'flat') {
    const exemption = state.personalExemptionsByFiling?.[filingStatus] ?? state.personalExemption;
    const taxableIncome = Math.max(0, grossIncome - exemption);
    return roundCurrency(taxableIncome * state.incomeTaxRate);
  }

  if (state.incomeTaxType === 'progressive' && state.brackets) {
    const stdDeduction = state.standardDeductionsByFiling?.[filingStatus] ?? state.standardDeduction;
    const taxableIncome = Math.max(0, grossIncome - stdDeduction);
    if (taxableIncome <= 0) return 0;

    let tax = 0;
    let remaining = taxableIncome;
    for (const bracket of state.brackets) {
      if (remaining <= 0) break;
      const bracketWidth = bracket.max === null ? remaining : bracket.max - bracket.min;
      const taxableInBracket = Math.min(remaining, bracketWidth);
      tax += taxableInBracket * bracket.rate;
      remaining -= taxableInBracket;
    }
    return roundCurrency(tax);
  }

  return 0;
}

// ─── Custom Tooltip ────────────────────────────────────────────────────────

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: {
      name: string;
      value: number;
      fill: string;
      percent?: number;
    };
  }>;
}

function PieCustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="rounded-lg border border-border/50 bg-background px-3 py-2 shadow-xl">
      <p className="text-sm font-medium text-foreground">{item.payload.name}</p>
      <p className="text-sm text-muted-foreground">
        {formatCurrency(Math.abs(item.value))}
      </p>
      {item.payload.percent !== undefined && (
        <p className="text-xs text-muted-foreground">
          {item.payload.percent.toFixed(1)}% of gross
        </p>
      )}
    </div>
  );
}

function BarCustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="rounded-lg border border-border/50 bg-background px-3 py-2 shadow-xl">
      <p className="text-sm font-medium text-foreground">{item.payload.name}</p>
      <p className="text-sm text-muted-foreground">
        {formatCurrency(Math.abs(item.value))}
      </p>
    </div>
  );
}

interface LegendPayloadEntry {
  value: string;
  color: string;
}

function CustomLegend({ payload }: { payload?: LegendPayloadEntry[] }) {
  if (!payload?.length) return null;
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 pt-2">
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-1.5">
          <div
            className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-xs text-muted-foreground">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────

export function TaxRefundCalculator() {
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const [grossIncome, setGrossIncome] = useState<number>(75000);
  const [federalWithheld, setFederalWithheld] = useState<number>(12000);
  const [stateWithheld, setStateWithheld] = useState<number>(4000);
  const [deductionType, setDeductionType] = useState<DeductionType>('standard');
  const [mortgageInterest, setMortgageInterest] = useState<number>(0);
  const [charitableContributions, setCharitableContributions] = useState<number>(0);
  const [saltTax, setSaltTax] = useState<number>(0);
  const [otherItemized, setOtherItemized] = useState<number>(0);
  const [dependents, setDependents] = useState<number>(0);
  const [stateKey, setStateKey] = useState<string>('illinois');
  const [itemizedOpen, setItemizedOpen] = useState(false);
  const [calculated, setCalculated] = useState(false);

  const itemizedTotal = mortgageInterest + charitableContributions + Math.min(saltTax, 10000) + otherItemized;

  const result = useMemo(() => {
    if (!calculated) return null;

    const fedResult = calculateFederalTaxOwed(
      grossIncome,
      filingStatus,
      deductionType,
      itemizedTotal,
      dependents
    );

    const stateTaxOwed = calculateStateTaxOwed(grossIncome, stateKey, filingStatus);
    const federalRefund = federalWithheld - fedResult.taxOwed;
    const stateRefund = stateWithheld - stateTaxOwed;
    const totalRefund = federalRefund + stateRefund;

    const effectiveFederalRate = grossIncome > 0
      ? (fedResult.taxOwed + fedResult.ficaTotal) / grossIncome
      : 0;

    return {
      grossIncome,
      totalDeduction: fedResult.totalDeduction,
      taxableIncome: fedResult.taxableIncome,
      federalTaxOwed: fedResult.taxOwed,
      ficaTotal: fedResult.ficaTotal,
      ficaSocialSecurity: fedResult.ficaSS,
      ficaMedicare: fedResult.ficaMedicare,
      ficaAdditionalMedicare: fedResult.ficaAdditional,
      childTaxCredit: fedResult.childTaxCredit,
      earnedIncomeCredit: fedResult.eic,
      totalCredits: fedResult.childTaxCredit,
      federalTaxAfterCredits: fedResult.taxOwed,
      federalTaxWithheld: federalWithheld,
      federalRefund: roundCurrency(federalRefund),
      stateTaxOwed,
      stateTaxWithheld: stateWithheld,
      stateRefund: roundCurrency(stateRefund),
      totalRefund: roundCurrency(totalRefund),
      effectiveFederalRate,
      marginalFederalRate: fedResult.marginalRate,
    };
  }, [calculated, grossIncome, filingStatus, deductionType, itemizedTotal, dependents, federalWithheld, stateWithheld, stateKey]);

  const handleCalculate = () => {
    setCalculated(true);
  };

  const stateProfile = STATE_PROFILES[stateKey];
  const isNoTaxState = !stateProfile || stateProfile.incomeTaxType === 'none';

  // Chart data
  const pieData = useMemo(() => {
    if (!result) return [];
    const entries: { name: string; value: number; fill: string; percent: number }[] = [];

    if (result.federalTaxOwed > 0) {
      entries.push({
        name: 'Federal Income Tax',
        value: result.federalTaxOwed,
        fill: '#ef4444',
        percent: result.grossIncome > 0 ? result.federalTaxOwed / result.grossIncome : 0,
      });
    }
    if (result.ficaTotal > 0) {
      entries.push({
        name: 'FICA (SS + Medicare)',
        value: result.ficaTotal,
        fill: '#f59e0b',
        percent: result.grossIncome > 0 ? result.ficaTotal / result.grossIncome : 0,
      });
    }
    if (result.stateTaxOwed > 0) {
      entries.push({
        name: `State Tax (${stateProfile?.abbreviation ?? 'Other'})`,
        value: result.stateTaxOwed,
        fill: '#f97316',
        percent: result.grossIncome > 0 ? result.stateTaxOwed / result.grossIncome : 0,
      });
    }
    if (result.totalCredits > 0) {
      entries.push({
        name: 'Tax Credits',
        value: result.totalCredits,
        fill: '#8b5cf6',
        percent: result.grossIncome > 0 ? result.totalCredits / result.grossIncome : 0,
      });
    }
    const netKeep = result.grossIncome - result.federalTaxOwed - result.ficaTotal - result.stateTaxOwed;
    if (netKeep > 0) {
      entries.push({
        name: 'Net Take-Home',
        value: netKeep,
        fill: '#10b981',
        percent: result.grossIncome > 0 ? netKeep / result.grossIncome : 0,
      });
    }

    return entries;
  }, [result, stateProfile, stateKey]);

  const refundBarData = useMemo(() => {
    if (!result) return [];
    const entries: { name: string; value: number; fill: string }[] = [];

    entries.push({
      name: 'Federal Refund',
      value: result.federalRefund,
      fill: result.federalRefund >= 0 ? '#10b981' : '#ef4444',
    });
    if (!isNoTaxState) {
      entries.push({
        name: 'State Refund',
        value: result.stateRefund,
        fill: result.stateRefund >= 0 ? '#06b6d4' : '#f97316',
      });
    }
    entries.push({
      name: 'Total',
      value: result.totalRefund,
      fill: result.totalRefund >= 0 ? '#10b981' : '#ef4444',
    });

    return entries;
  }, [result, isNoTaxState]);

  return (
    <div className="space-y-6">
      {/* ─── Page Title ────────────────────────────────────── */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Tax Refund Calculator
        </h1>
        <p className="mt-2 text-muted-foreground">
          Estimate your 2026 federal and state tax refund or amount owed
        </p>
      </div>

      {/* ─── Form + Results Grid ─────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Left: Form */}
        <div className="space-y-4 lg:col-span-3">
          {/* Income & Withholding */}
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <DollarSign className="h-5 w-5 text-emerald-400" />
                Income &amp; Withholding
              </CardTitle>
              <CardDescription>Enter your total income and taxes already withheld</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="gross-income" className="text-sm font-medium">
                    Total Gross Income
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="gross-income"
                      type="number"
                      min={0}
                      value={grossIncome || ''}
                      onChange={(e) => { setGrossIncome(Number(e.target.value) || 0); setCalculated(false); }}
                      className="pl-9"
                      placeholder="75000"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="filing-status" className="text-sm font-medium">
                    Filing Status
                  </Label>
                  <Select value={filingStatus} onValueChange={(v) => { setFilingStatus(v as FilingStatus); setCalculated(false); }}>
                    <SelectTrigger id="filing-status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married Filing Jointly</SelectItem>
                      <SelectItem value="head_of_household">Head of Household</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="fed-withheld" className="text-sm font-medium">
                    Federal Tax Withheld
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="fed-withheld"
                      type="number"
                      min={0}
                      value={federalWithheld || ''}
                      onChange={(e) => { setFederalWithheld(Number(e.target.value) || 0); setCalculated(false); }}
                      className="pl-9"
                      placeholder="12000"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state-withheld" className="text-sm font-medium">
                    State Tax Withheld
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="state-withheld"
                      type="number"
                      min={0}
                      value={stateWithheld || ''}
                      onChange={(e) => { setStateWithheld(Number(e.target.value) || 0); setCalculated(false); }}
                      className="pl-9"
                      placeholder="4000"
                      disabled={isNoTaxState}
                    />
                  </div>
                  {isNoTaxState && (
                    <p className="text-xs text-muted-foreground">
                      {stateProfile ? `${stateProfile.name} has no state income tax` : 'No state income tax for selected state'}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state" className="text-sm font-medium">
                    State
                  </Label>
                  <Select value={stateKey} onValueChange={(v) => { setStateKey(v); setCalculated(false); }}>
                    <SelectTrigger id="state">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(STATE_PROFILES).map(([key, profile]) => (
                        <SelectItem key={key} value={key}>
                          {profile.name} ({profile.incomeTaxType === 'none' ? '0%' : `${(profile.incomeTaxRate * 100).toFixed(2)}%`})
                        </SelectItem>
                      ))}
                      <SelectItem value="none">None / Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Deductions */}
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Receipt className="h-5 w-5 text-amber-400" />
                Deductions
              </CardTitle>
              <CardDescription>
                Standard deduction for 2026:{' '}
                {formatCurrency(FEDERAL_TAX_2026.standardDeductionsByFiling[filingStatus] ?? 15000)} ({filingStatus === 'single' ? 'Single' : filingStatus === 'married' ? 'Married' : 'Head of Household'})
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="deduction-type" className="text-sm font-medium">
                    Deduction Type
                  </Label>
                  <Select value={deductionType} onValueChange={(v) => { setDeductionType(v as DeductionType); setCalculated(false); }}>
                    <SelectTrigger id="deduction-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard Deduction</SelectItem>
                      <SelectItem value="itemized">Itemized Deductions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dependents" className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-emerald-400" />
                      Dependents (under 17)
                    </span>
                  </Label>
                  <Input
                    id="dependents"
                    type="number"
                    min={0}
                    max={20}
                    value={dependents}
                    onChange={(e) => { setDependents(Number(e.target.value) || 0); setCalculated(false); }}
                    placeholder="0"
                  />
                  {dependents > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Child Tax Credit: {formatCurrency(dependents * 2000)} ($2,000 per child)
                    </p>
                  )}
                </div>
              </div>

              {/* Itemized Deductions Accordion */}
              {deductionType === 'itemized' && (
                <Collapsible open={itemizedOpen} onOpenChange={setItemizedOpen}>
                  <CollapsibleTrigger asChild>
                    <button className="flex w-full items-center justify-between rounded-lg bg-muted/30 p-3 text-sm transition-colors hover:bg-muted/50">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">Itemized Deduction Details</span>
                        <Badge variant="outline" className="text-xs">
                          Total: {formatCurrency(itemizedTotal)}
                        </Badge>
                      </div>
                      {itemizedOpen ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="mt-3 space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="mortgage" className="text-sm font-medium">
                            Mortgage Interest
                          </Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="mortgage"
                              type="number"
                              min={0}
                              value={mortgageInterest || ''}
                              onChange={(e) => { setMortgageInterest(Number(e.target.value) || 0); setCalculated(false); }}
                              className="pl-9"
                              placeholder="0"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="charity" className="text-sm font-medium">
                            Charitable Contributions
                          </Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="charity"
                              type="number"
                              min={0}
                              value={charitableContributions || ''}
                              onChange={(e) => { setCharitableContributions(Number(e.target.value) || 0); setCalculated(false); }}
                              className="pl-9"
                              placeholder="0"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="salt" className="text-sm font-medium">
                            State &amp; Local Taxes (SALT)
                          </Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="salt"
                              type="number"
                              min={0}
                              value={saltTax || ''}
                              onChange={(e) => { setSaltTax(Number(e.target.value) || 0); setCalculated(false); }}
                              className="pl-9"
                              placeholder="0"
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">Capped at $10,000</p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="other-itemized" className="text-sm font-medium">
                            Other Deductions
                          </Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="other-itemized"
                              type="number"
                              min={0}
                              value={otherItemized || ''}
                              onChange={(e) => { setOtherItemized(Number(e.target.value) || 0); setCalculated(false); }}
                              className="pl-9"
                              placeholder="0"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )}
            </CardContent>
          </Card>

          {/* Calculate Button */}
          <Button
            onClick={handleCalculate}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 text-base"
            size="lg"
          >
            <Calculator className="mr-2 h-5 w-5" />
            Calculate My Refund
          </Button>

          <AdSlot position="after-form" />
        </div>

        {/* Right: Results */}
        <div className="lg:col-span-2">
          <Card className="sticky top-20 border-emerald-500/20 bg-card/90 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                {result ? (
                  result.totalRefund >= 0 ? (
                    <TrendingUp className="h-5 w-5 text-emerald-400" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-400" />
                  )
                ) : (
                  <Shield className="h-5 w-5 text-muted-foreground" />
                )}
                Refund Estimate
              </CardTitle>
              <CardDescription>
                {result ? 'Based on 2026 tax brackets and rates' : 'Fill in your details and click Calculate'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {result ? (
                <>
                  {/* Total Refund/Owed - Hero Number */}
                  <div className={`rounded-xl p-4 text-center ${result.totalRefund >= 0 ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
                    <p className={`text-xs font-medium uppercase tracking-wider ${result.totalRefund >= 0 ? 'text-emerald-400/80' : 'text-red-400/80'}`}>
                      {result.totalRefund >= 0 ? 'Estimated Tax Refund' : 'Estimated Tax Owed'}
                    </p>
                    <p className={`mt-1 text-3xl font-bold ${result.totalRefund >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {formatCurrency(Math.abs(result.totalRefund))}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Federal + State Combined
                    </p>
                  </div>

                  <Separator className="bg-border/40" />

                  {/* Federal Refund Breakdown */}
                  <div className="space-y-2.5 rounded-lg bg-muted/30 p-3">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Federal
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Tax Withheld</span>
                      <span className="text-sm font-medium text-foreground">{formatCurrency(result.federalTaxWithheld)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Tax Owed (after credits)</span>
                      <span className="text-sm font-medium text-red-400">-{formatCurrency(result.federalTaxOwed)}</span>
                    </div>
                    <div className="flex items-center justify-between border-t border-border/30 pt-2">
                      <span className="text-sm font-medium text-foreground">Federal Refund</span>
                      <span className={`text-sm font-bold ${result.federalRefund >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {result.federalRefund >= 0 ? '+' : ''}{formatCurrency(result.federalRefund)}
                      </span>
                    </div>
                  </div>

                  {/* State Refund Breakdown */}
                  {!isNoTaxState && (
                    <div className="space-y-2.5 rounded-lg bg-muted/30 p-3">
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        State ({stateProfile?.abbreviation})
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Tax Withheld</span>
                        <span className="text-sm font-medium text-foreground">{formatCurrency(result.stateTaxWithheld)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Tax Owed</span>
                        <span className="text-sm font-medium text-red-400">-{formatCurrency(result.stateTaxOwed)}</span>
                      </div>
                      <div className="flex items-center justify-between border-t border-border/30 pt-2">
                        <span className="text-sm font-medium text-foreground">State Refund</span>
                        <span className={`text-sm font-bold ${result.stateRefund >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {result.stateRefund >= 0 ? '+' : ''}{formatCurrency(result.stateRefund)}
                        </span>
                      </div>
                    </div>
                  )}

                  <Separator className="bg-border/40" />

                  {/* Tax Summary */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Gross Income</span>
                      <span className="font-semibold text-foreground">{formatCurrency(result.grossIncome)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Deduction ({deductionType === 'standard' ? 'Standard' : 'Itemized'})</span>
                      <span className="text-sm text-foreground">-{formatCurrency(result.totalDeduction)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Taxable Income</span>
                      <span className="text-sm font-medium text-foreground">{formatCurrency(result.taxableIncome)}</span>
                    </div>
                    {result.childTaxCredit > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Users className="h-3.5 w-3.5 text-emerald-400" />
                          Tax Credits
                        </span>
                        <span className="text-sm font-medium text-emerald-400">-{formatCurrency(result.childTaxCredit)}</span>
                      </div>
                    )}
                  </div>

                  {/* FICA Detail */}
                  <div className="rounded-lg bg-muted/20 p-3">
                    <p className="text-xs font-medium text-muted-foreground">FICA Breakdown (not refundable)</p>
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

                  {/* Tax Rate Summary */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-muted/30 p-2.5 text-center">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        Effective Rate
                      </p>
                      <p className="text-lg font-bold text-foreground">
                        {(result.effectiveFederalRate * 100).toFixed(1)}%
                      </p>
                    </div>
                    <div className="rounded-lg bg-muted/30 p-2.5 text-center">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        Marginal Rate
                      </p>
                      <p className="text-lg font-bold text-foreground">
                        {(result.marginalFederalRate * 100).toFixed(0)}%
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="py-8 text-center">
                  <Calculator className="mx-auto h-12 w-12 text-muted-foreground/30" />
                  <p className="mt-3 text-sm text-muted-foreground">
                    Enter your income and withholding details, then click Calculate
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="mt-6">
            <AdSlot position="after-results" />
          </div>
        </div>
      </div>

      {/* ─── Refund Breakdown Chart ──────────────────────────── */}
      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground text-lg">
              Tax Refund Breakdown
            </CardTitle>
            <CardDescription>
              Visual breakdown of your tax liability and refund estimate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Pie Chart */}
              <div className="flex flex-col items-center">
                <h3 className="mb-3 text-sm font-medium text-muted-foreground">
                  Where Your Income Goes
                </h3>
                <div className="w-full" style={{ minHeight: 300 }}>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={110}
                        paddingAngle={2}
                        dataKey="value"
                        nameKey="name"
                        stroke="none"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip content={<PieCustomTooltip />} />
                      <Legend content={<CustomLegend />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Bar Chart */}
              <div className="flex flex-col items-center">
                <h3 className="mb-3 text-sm font-medium text-muted-foreground">
                  Refund / Owed Comparison
                </h3>
                <div className="w-full" style={{ minHeight: 300 }}>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={refundBarData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 90, bottom: 5 }}
                    >
                      <XAxis
                        type="number"
                        tickFormatter={(value: number) => formatCurrency(value)}
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={11}
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      />
                      <YAxis
                        type="category"
                        dataKey="name"
                        width={85}
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      />
                      <Tooltip content={<BarCustomTooltip />} />
                      <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={24}>
                        {refundBarData.map((entry, index) => (
                          <Cell key={`bar-cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Summary below bar chart */}
                <div className="mt-2 text-center">
                  <p className={`text-2xl font-bold ${result.totalRefund >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {result.totalRefund >= 0 ? '+' : ''}{formatCurrency(result.totalRefund)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Combined {result.totalRefund >= 0 ? 'Refund' : 'Amount Owed'}
                  </p>
                </div>
              </div>
            </div>

            {/* Rate Footer */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 border-t pt-4">
              <div className="text-center">
                <p className="text-lg font-semibold text-foreground">
                  {formatCurrency(result.federalTaxOwed)}
                </p>
                <p className="text-xs text-muted-foreground">Federal Tax Owed</p>
              </div>
              <div className="text-center">
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-foreground">
                  {formatCurrency(result.federalTaxWithheld)}
                </p>
                <p className="text-xs text-muted-foreground">Federal Withheld</p>
              </div>
              <div className="text-center">
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-center">
                <p className={`text-lg font-semibold ${result.totalRefund >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {result.totalRefund >= 0 ? '+' : ''}{formatCurrency(result.totalRefund)}
                </p>
                <p className="text-xs text-muted-foreground">Total Refund</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ─── Pre-Rendered Default Example for LLM/GEO Crawlers ──── */}
      <div className="mt-8 rounded-xl border border-border/30 bg-muted/10 p-6" aria-hidden="true">
        <h2 className="text-xl font-bold text-foreground">
          Example Tax Refund Calculation: $75,000 Income (2026)
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          For a single filer earning $75,000 in Illinois with $12,000 federal withholding and $4,000 state withholding:
        </p>
        <div className="mt-4 space-y-1 text-sm text-muted-foreground">
          <p>Gross Income: $75,000.00</p>
          <p>Standard Deduction (Single): $15,000.00</p>
          <p>Taxable Income: $60,000.00</p>
          <p>Federal Tax Owed: $8,717.50</p>
          <p>FICA (Social Security + Medicare): $5,737.50</p>
          <p>Illinois State Tax Owed (4.95%): $3,576.38</p>
          <p>Federal Refund: $12,000 - $8,717.50 = $3,282.50</p>
          <p>State Refund: $4,000 - $3,576.38 = $423.62</p>
          <p>Total Estimated Refund: $3,706.12</p>
        </div>
      </div>

      <AdSlot position="mid-content" />
    </div>
  );
}
