'use client';

import { useMemo, useState, useCallback } from 'react';
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
import {
  Calculator,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Zap,
  CheckCircle2,
  ArrowRightLeft,
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
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { AdSlot } from './ad-slot';
import { FEDERAL_TAX_2026, FICA_2026, STATE_PROFILES } from '@/lib/tax-config';
import { formatCurrency, roundCurrency, calculateFederalTax, calculateStateTax } from '@/lib/finance-utils';

// ─── Types ──────────────────────────────────────────────────────────────────────

type FilingStatus = 'single' | 'married' | 'head_of_household';
type BonusMethod = 'percentage' | 'aggregate';

const FILING_LABELS: Record<FilingStatus, string> = {
  single: 'Single',
  married: 'Married Filing Jointly',
  head_of_household: 'Head of Household',
};

const METHOD_LABELS: Record<BonusMethod, string> = {
  percentage: 'Percentage Method (Flat 22%)',
  aggregate: 'Aggregate Method',
};

// IRS supplemental wage rates
const SUPPLEMENTAL_RATE = 0.22; // 22% flat rate for bonuses under $1M
const HIGH_SUPPLEMENTAL_RATE = 0.37; // 37% on amount above $1M
const HIGH_SUPPLEMENTAL_THRESHOLD = 1000000;

// ─── Calculation ────────────────────────────────────────────────────────────────

interface BonusTaxResult {
  // Method: Percentage (Flat 22%)
  fedTaxPercentage: number;
  ficaOnBonus: number;
  stateTaxOnBonus: number;
  totalTaxPercentage: number;
  netBonusPercentage: number;
  effectiveRatePercentage: number;

  // Method: Aggregate
  fedTaxAggregate: number;
  ficaOnBonusAggregate: number;
  stateTaxOnBonusAggregate: number;
  totalTaxAggregate: number;
  netBonusAggregate: number;
  effectiveRateAggregate: number;

  // Comparison
  betterMethod: BonusMethod;
  savingsByBetterMethod: number;
  marginalRate: number;
}

function getMarginalFederalRate(
  annualGross: number,
  filingStatus: FilingStatus
): number {
  const brackets = FEDERAL_TAX_2026.bracketsByFiling[filingStatus];
  const stdDeduction = FEDERAL_TAX_2026.standardDeductionsByFiling[filingStatus];
  const taxableIncome = Math.max(0, annualGross - stdDeduction);

  for (let i = brackets.length - 1; i >= 0; i--) {
    if (taxableIncome >= brackets[i].min) {
      return brackets[i].rate;
    }
  }
  return 0;
}

function calculateFICAOnAmount(amount: number, annualGross: number): number {
  const ssWages = Math.min(amount, FICA_2026.socialSecurityWageCap);
  const ss = Math.max(0, Math.min(annualGross, FICA_2026.socialSecurityWageCap) - Math.max(0, annualGross - amount - FICA_2026.socialSecurityWageCap)) * FICA_2026.socialSecurityRate;
  // Simplified: FICA on bonus = bonus * 6.2% SS (if under cap) + bonus * 1.45% Medicare
  const ssOnBonus = Math.min(amount, Math.max(0, FICA_2026.socialSecurityWageCap - annualGross + amount)) * FICA_2026.socialSecurityRate;
  const medicareOnBonus = amount * FICA_2026.medicareRate;
  const additionalMedicareOnBonus = annualGross > FICA_2026.additionalMedicareThreshold
    ? amount * FICA_2026.additionalMedicareRate
    : Math.max(0, annualGross + amount - FICA_2026.additionalMedicareThreshold) * FICA_2026.additionalMedicareRate;

  return ssOnBonus + medicareOnBonus + additionalMedicareOnBonus;
}

function calculateBonusTax(
  bonusAmount: number,
  annualSalary: number,
  filingStatus: FilingStatus,
  stateKey: string
): BonusTaxResult {
  const totalAnnual = annualSalary + bonusAmount;

  // ─── Percentage Method ──────────────────────────────────────────────────
  // Federal: flat 22% on bonus (37% on amount above $1M)
  let fedTaxPercentage: number;
  if (bonusAmount <= HIGH_SUPPLEMENTAL_THRESHOLD) {
    fedTaxPercentage = bonusAmount * SUPPLEMENTAL_RATE;
  } else {
    fedTaxPercentage = HIGH_SUPPLEMENTAL_THRESHOLD * SUPPLEMENTAL_RATE +
      (bonusAmount - HIGH_SUPPLEMENTAL_THRESHOLD) * HIGH_SUPPLEMENTAL_RATE;
  }

  // FICA on bonus
  const ficaOnBonus = calculateFICAOnAmount(bonusAmount, annualSalary);

  // State tax on bonus (at marginal rate)
  const stateTaxWithBonus = calculateStateTax(totalAnnual, stateKey, filingStatus);
  const stateTaxWithoutBonus = calculateStateTax(annualSalary, stateKey, filingStatus);
  const stateTaxOnBonus = Math.max(0, stateTaxWithBonus - stateTaxWithoutBonus);

  const totalTaxPercentage = fedTaxPercentage + ficaOnBonus + stateTaxOnBonus;
  const netBonusPercentage = bonusAmount - totalTaxPercentage;
  const effectiveRatePercentage = bonusAmount > 0 ? totalTaxPercentage / bonusAmount : 0;

  // ─── Aggregate Method ───────────────────────────────────────────────────
  // Add bonus to regular wages, calculate total tax, subtract tax on regular wages alone
  const fedTaxWithBonus = calculateFederalTax(totalAnnual, filingStatus);
  const fedTaxWithoutBonus = calculateFederalTax(annualSalary, filingStatus);
  const fedTaxAggregate = Math.max(0, fedTaxWithBonus - fedTaxWithoutBonus);

  // FICA same either way
  const ficaOnBonusAggregate = ficaOnBonus;

  // State tax on bonus (same calculation as above, but conceptually consistent)
  const stateTaxOnBonusAggregate = stateTaxOnBonus;

  const totalTaxAggregate = fedTaxAggregate + ficaOnBonusAggregate + stateTaxOnBonusAggregate;
  const netBonusAggregate = bonusAmount - totalTaxAggregate;
  const effectiveRateAggregate = bonusAmount > 0 ? totalTaxAggregate / bonusAmount : 0;

  // Comparison
  const betterMethod: BonusMethod = netBonusPercentage >= netBonusAggregate ? 'percentage' : 'aggregate';
  const savingsByBetterMethod = Math.abs(netBonusPercentage - netBonusAggregate);

  const marginalRate = getMarginalFederalRate(totalAnnual, filingStatus);

  return {
    fedTaxPercentage: roundCurrency(fedTaxPercentage),
    ficaOnBonus: roundCurrency(ficaOnBonus),
    stateTaxOnBonus: roundCurrency(stateTaxOnBonus),
    totalTaxPercentage: roundCurrency(totalTaxPercentage),
    netBonusPercentage: roundCurrency(netBonusPercentage),
    effectiveRatePercentage,
    fedTaxAggregate: roundCurrency(fedTaxAggregate),
    ficaOnBonusAggregate: roundCurrency(ficaOnBonusAggregate),
    stateTaxOnBonusAggregate: roundCurrency(stateTaxOnBonusAggregate),
    totalTaxAggregate: roundCurrency(totalTaxAggregate),
    netBonusAggregate: roundCurrency(netBonusAggregate),
    effectiveRateAggregate,
    betterMethod,
    savingsByBetterMethod: roundCurrency(savingsByBetterMethod),
    marginalRate,
  };
}

// ─── Chart Colors ───────────────────────────────────────────────────────────────

const CHART_COLORS = {
  federalTax: '#ef4444',    // red-500
  fica: '#f59e0b',          // amber-500
  stateTax: '#f97316',      // orange-500
  takeHome: '#10b981',      // emerald-500
};

// ─── Custom Tooltip ─────────────────────────────────────────────────────────────

interface TooltipPayload {
  name: string;
  value: number;
  payload: { name: string; value: number; fill: string };
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayload[] }) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="rounded-lg border border-border/50 bg-background px-3 py-2 shadow-xl">
      <p className="text-sm font-medium text-foreground">{item.payload.name}</p>
      <p className="text-sm text-muted-foreground">{formatCurrency(item.value)}</p>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────────

export function BonusTaxCalculator() {
  const [bonusAmount, setBonusAmount] = useState<number>(5000);
  const [annualSalary, setAnnualSalary] = useState<number>(75000);
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const [stateKey, setStateKey] = useState<string>('illinois');
  const [selectedMethod, setSelectedMethod] = useState<BonusMethod>('percentage');
  const [hasCalculated, setHasCalculated] = useState(false);

  const result = useMemo(() => {
    if (bonusAmount <= 0 || annualSalary < 0) return null;
    return calculateBonusTax(bonusAmount, annualSalary, filingStatus, stateKey);
  }, [bonusAmount, annualSalary, filingStatus, stateKey]);

  const trackUsage = useCallback(() => {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ calculator: 'bonus-tax' }),
    }).catch(() => {});
  }, []);

  const handleCalculate = () => {
    setHasCalculated(true);
    trackUsage();
  };

  const handleInputChange = (setter: (v: number) => void) => (value: number) => {
    setter(value);
    if (hasCalculated) setHasCalculated(true);
  };

  // Pie chart data
  const pieData = useMemo(() => {
    if (!result) return [];
    const isPercentage = selectedMethod === 'percentage';
    return [
      { name: 'Federal Tax', value: isPercentage ? result.fedTaxPercentage : result.fedTaxAggregate, fill: CHART_COLORS.federalTax },
      { name: 'FICA', value: isPercentage ? result.ficaOnBonus : result.ficaOnBonusAggregate, fill: CHART_COLORS.fica },
      ...(isPercentage ? (result.stateTaxOnBonus > 0 ? [{ name: 'State Tax', value: result.stateTaxOnBonus, fill: CHART_COLORS.stateTax }] : []) : (result.stateTaxOnBonusAggregate > 0 ? [{ name: 'State Tax', value: result.stateTaxOnBonusAggregate, fill: CHART_COLORS.stateTax }] : [])),
      { name: 'Take-Home', value: Math.max(0, isPercentage ? result.netBonusPercentage : result.netBonusAggregate), fill: CHART_COLORS.takeHome },
    ].filter((e) => e.value > 0);
  }, [result, selectedMethod]);

  // Bar chart data: comparison
  const barData = useMemo(() => {
    if (!result) return [];
    return [
      {
        name: 'Take-Home',
        percentage: result.netBonusPercentage,
        aggregate: result.netBonusAggregate,
      },
      {
        name: 'Federal Tax',
        percentage: result.fedTaxPercentage,
        aggregate: result.fedTaxAggregate,
      },
      {
        name: 'FICA',
        percentage: result.ficaOnBonus,
        aggregate: result.ficaOnBonusAggregate,
      },
      {
        name: 'State Tax',
        percentage: result.stateTaxOnBonus,
        aggregate: result.stateTaxOnBonusAggregate,
      },
    ];
  }, [result]);

  const currentNetBonus = selectedMethod === 'percentage' ? result?.netBonusPercentage : result?.netBonusAggregate;
  const currentTotalTax = selectedMethod === 'percentage' ? result?.totalTaxPercentage : result?.totalTaxAggregate;
  const currentFedTax = selectedMethod === 'percentage' ? result?.fedTaxPercentage : result?.fedTaxAggregate;

  return (
    <div className="space-y-6">
      {/* ─── Page Title ─────────────────────────────────── */}
      <div className="text-center">
        <h2 className="flex items-center justify-center gap-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          <DollarSign className="h-8 w-8 text-emerald-400" />
          Bonus Tax Calculator
        </h2>
        <p className="mt-2 text-muted-foreground">
          Calculate how much tax is taken from your bonus — compare the flat 22% method vs aggregate method
        </p>
        <div className="mt-3 flex items-center justify-center gap-2">
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs font-semibold px-3 py-1">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            2026 Tax Rates
          </Badge>
          <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-xs px-3 py-1">
            <ArrowRightLeft className="mr-1 h-3 w-3" />
            Two Methods Compared
          </Badge>
        </div>
      </div>

      {/* ─── Method Explanation ──────────────────────────── */}
      <Card className="border-emerald-500/20 bg-emerald-500/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">How Bonuses Are Taxed: Two Methods</p>
              <p>
                <strong className="text-emerald-400">Percentage Method (Flat 22%):</strong> Your employer separates the bonus and withholds federal tax at a flat 22% rate (37% on amounts above $1M). This is the most common method.
              </p>
              <p>
                <strong className="text-cyan-400">Aggregate Method:</strong> Your employer adds the bonus to your regular paycheck and calculates withholding as if it&apos;s all regular wages. This can push you into a higher bracket, resulting in more tax withheld — but you may get the excess back as a refund.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ─── Input + Results Grid ──────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Left: Input Form */}
        <div className="space-y-4 lg:col-span-3">
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calculator className="h-5 w-5 text-emerald-400" />
                Bonus Details
              </CardTitle>
              <CardDescription>Enter your bonus and salary information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Bonus Amount */}
                <div className="space-y-2">
                  <Label htmlFor="bonus-amount" className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
                      Bonus Amount
                    </span>
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="bonus-amount"
                      type="number"
                      min={0}
                      step={100}
                      value={bonusAmount || ''}
                      onChange={(e) => handleInputChange(setBonusAmount)(Number(e.target.value) || 0)}
                      className="pl-9"
                      placeholder="5000"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Your bonus before taxes</p>
                </div>

                {/* Annual Salary */}
                <div className="space-y-2">
                  <Label htmlFor="annual-salary" className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <DollarSign className="h-3.5 w-3.5 text-cyan-400" />
                      Annual Salary
                    </span>
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="annual-salary"
                      type="number"
                      min={0}
                      step={1000}
                      value={annualSalary || ''}
                      onChange={(e) => handleInputChange(setAnnualSalary)(Number(e.target.value) || 0)}
                      className="pl-9"
                      placeholder="75000"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Your regular annual salary (excluding bonus)</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {/* Filing Status */}
                <div className="space-y-2">
                  <Label htmlFor="bonus-filing" className="text-sm font-medium">Filing Status</Label>
                  <Select value={filingStatus} onValueChange={(v) => setFilingStatus(v as FilingStatus)}>
                    <SelectTrigger id="bonus-filing">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(FILING_LABELS).map(([key, label]) => (
                        <SelectItem key={key} value={key}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* State */}
                <div className="space-y-2">
                  <Label htmlFor="bonus-state" className="text-sm font-medium">State</Label>
                  <Select value={stateKey} onValueChange={setStateKey}>
                    <SelectTrigger id="bonus-state">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(STATE_PROFILES).map(([key, profile]) => (
                        <SelectItem key={key} value={key}>
                          {profile.name} ({profile.incomeTaxType === 'none' ? 'No tax' : `${(profile.incomeTaxRate * 100).toFixed(2)}%`})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Method Selection */}
                <div className="space-y-2">
                  <Label htmlFor="bonus-method" className="text-sm font-medium">Tax Method</Label>
                  <Select value={selectedMethod} onValueChange={(v) => setSelectedMethod(v as BonusMethod)}>
                    <SelectTrigger id="bonus-method">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Flat 22% Method</SelectItem>
                      <SelectItem value="aggregate">Aggregate Method</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator className="bg-border/40" />

              {/* Calculate Button */}
              <Button
                onClick={handleCalculate}
                disabled={bonusAmount <= 0}
                className="w-full bg-emerald-600 text-white hover:bg-emerald-700 sm:w-auto"
                size="lg"
              >
                <Zap className="mr-2 h-4 w-4" />
                Calculate Bonus Tax
              </Button>
            </CardContent>
          </Card>

          <AdSlot position="after-form" />
        </div>

        {/* Right: Quick Summary */}
        <div className="lg:col-span-2">
          <Card className="sticky top-20 border-emerald-500/20 bg-card/90 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-emerald-400" />
                Quick Summary
              </CardTitle>
              <CardDescription>
                Your bonus at a glance ({selectedMethod === 'percentage' ? 'Flat 22%' : 'Aggregate'} method)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Net Bonus */}
              <div className="rounded-xl bg-emerald-500/10 p-4 text-center">
                <p className="text-xs font-medium uppercase tracking-wider text-emerald-400/80">
                  Your Take-Home Bonus
                </p>
                <p className="mt-1 text-3xl font-bold text-emerald-400">
                  {result ? formatCurrency(currentNetBonus ?? 0) : formatCurrency(0)}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  From a {formatCurrency(bonusAmount)} bonus
                </p>
              </div>

              <Separator className="bg-border/40" />

              {/* Tax Breakdown */}
              <div className="space-y-2.5">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Tax Breakdown
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Federal Tax</span>
                  <span className="text-sm font-semibold text-red-400">
                    -{result ? formatCurrency(currentFedTax ?? 0) : formatCurrency(0)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">FICA (SS + Medicare)</span>
                  <span className="text-sm font-semibold text-orange-400">
                    -{result ? formatCurrency(result.ficaOnBonus) : formatCurrency(0)}
                  </span>
                </div>
                {result && result.stateTaxOnBonus > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">State Tax</span>
                    <span className="text-sm font-semibold text-amber-400">
                      -{formatCurrency(result.stateTaxOnBonus)}
                    </span>
                  </div>
                )}
                <Separator className="bg-border/20" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Total Tax</span>
                  <span className="text-sm font-bold text-red-400">
                    -{result ? formatCurrency(currentTotalTax ?? 0) : formatCurrency(0)}
                  </span>
                </div>
              </div>

              <Separator className="bg-border/40" />

              {/* Effective Rate */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-muted/30 p-2.5 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Effective Rate
                  </p>
                  <p className="text-lg font-bold text-foreground">
                    {result ? `${((selectedMethod === 'percentage' ? result.effectiveRatePercentage : result.effectiveRateAggregate) * 100).toFixed(1)}%` : '—'}
                  </p>
                </div>
                <div className="rounded-lg bg-muted/30 p-2.5 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Marginal Rate
                  </p>
                  <p className="text-lg font-bold text-foreground">
                    {result ? `${(result.marginalRate * 100).toFixed(0)}%` : '—'}
                  </p>
                </div>
              </div>

              {/* Best Method Indicator */}
              {result && (
                <div className={`rounded-lg p-3 ${result.betterMethod === selectedMethod ? 'bg-emerald-500/10' : 'bg-amber-500/10'}`}>
                  <div className="flex items-start gap-2">
                    {result.betterMethod === selectedMethod ? (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    ) : (
                      <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                    )}
                    <div className="text-xs text-muted-foreground">
                      {result.betterMethod === selectedMethod ? (
                        <p><strong className="text-emerald-400">{selectedMethod === 'percentage' ? 'Flat 22%' : 'Aggregate'}</strong> is the better method for you. You keep {formatCurrency(result.savingsByBetterMethod)} more.</p>
                      ) : (
                        <p><strong className="text-amber-400">Tip:</strong> The {result.betterMethod === 'percentage' ? 'flat 22%' : 'aggregate'} method gives you {formatCurrency(result.savingsByBetterMethod)} more take-home.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ─── Results Section ────────────────────────────── */}
      {result && hasCalculated && (
        <div className="space-y-6">
          {/* Side-by-side Comparison */}
          <Card className="border-emerald-500/30 bg-card/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-xs font-semibold">
                  <ArrowRightLeft className="mr-1 h-3 w-3" />
                  Method Comparison
                </Badge>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {/* Percentage Method */}
                <div className={`rounded-xl p-5 text-center ${result.betterMethod === 'percentage' ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-muted/30 border border-border/30'}`}>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
                    {result.betterMethod === 'percentage' && <CheckCircle2 className="mr-1 inline h-3.5 w-3.5 text-emerald-400" />}
                    Flat 22% Method
                  </p>
                  <p className={`text-4xl font-bold ${result.betterMethod === 'percentage' ? 'text-emerald-400' : 'text-muted-foreground'}`}>
                    {formatCurrency(result.netBonusPercentage)}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">Take-Home from Bonus</p>
                  <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Federal (22%)</span>
                      <span className="text-red-400">-{formatCurrency(result.fedTaxPercentage)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>FICA</span>
                      <span className="text-orange-400">-{formatCurrency(result.ficaOnBonus)}</span>
                    </div>
                    {result.stateTaxOnBonus > 0 && (
                      <div className="flex justify-between">
                        <span>State Tax</span>
                        <span className="text-amber-400">-{formatCurrency(result.stateTaxOnBonus)}</span>
                      </div>
                    )}
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Effective rate: {(result.effectiveRatePercentage * 100).toFixed(1)}%
                  </p>
                </div>

                {/* Aggregate Method */}
                <div className={`rounded-xl p-5 text-center ${result.betterMethod === 'aggregate' ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-muted/30 border border-border/30'}`}>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
                    {result.betterMethod === 'aggregate' && <CheckCircle2 className="mr-1 inline h-3.5 w-3.5 text-emerald-400" />}
                    Aggregate Method
                  </p>
                  <p className={`text-4xl font-bold ${result.betterMethod === 'aggregate' ? 'text-emerald-400' : 'text-muted-foreground'}`}>
                    {formatCurrency(result.netBonusAggregate)}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">Take-Home from Bonus</p>
                  <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Federal (marginal)</span>
                      <span className="text-red-400">-{formatCurrency(result.fedTaxAggregate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>FICA</span>
                      <span className="text-orange-400">-{formatCurrency(result.ficaOnBonusAggregate)}</span>
                    </div>
                    {result.stateTaxOnBonusAggregate > 0 && (
                      <div className="flex justify-between">
                        <span>State Tax</span>
                        <span className="text-amber-400">-{formatCurrency(result.stateTaxOnBonusAggregate)}</span>
                      </div>
                    )}
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Effective rate: {(result.effectiveRateAggregate * 100).toFixed(1)}%
                  </p>
                </div>
              </div>

              <Separator className="my-6 bg-border/40" />

              {/* Key Savings Metrics */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-4 text-center">
                  <p className="text-xs font-medium uppercase tracking-wider text-emerald-400/80">
                    Best Method
                  </p>
                  <p className="mt-1 text-lg font-bold text-emerald-400">
                    {result.betterMethod === 'percentage' ? 'Flat 22%' : 'Aggregate'}
                  </p>
                  <p className="text-xs text-muted-foreground">Keeps more in your pocket</p>
                </div>
                <div className="rounded-lg bg-cyan-500/10 border border-cyan-500/20 p-4 text-center">
                  <p className="text-xs font-medium uppercase tracking-wider text-cyan-400/80">
                    Difference
                  </p>
                  <p className="mt-1 text-2xl font-bold text-cyan-400">
                    {formatCurrency(result.savingsByBetterMethod)}
                  </p>
                  <p className="text-xs text-muted-foreground">Between the two methods</p>
                </div>
                <div className="rounded-lg bg-muted/30 p-4 text-center">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Your Bonus
                  </p>
                  <p className="mt-1 text-2xl font-bold text-foreground">
                    {formatCurrency(bonusAmount)}
                  </p>
                  <p className="text-xs text-muted-foreground">Before any taxes</p>
                </div>
                <div className="rounded-lg bg-muted/30 p-4 text-center">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Marginal Bracket
                  </p>
                  <p className="mt-1 text-2xl font-bold text-foreground">
                    {(result.marginalRate * 100).toFixed(0)}%
                  </p>
                  <p className="text-xs text-muted-foreground">With bonus included</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Breakdown */}
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calculator className="h-5 w-5 text-emerald-400" />
                Detailed Tax Breakdown
              </CardTitle>
              <CardDescription>Complete comparison of both bonus taxation methods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-medium text-foreground">Gross Bonus</span>
                  <span className="text-sm font-medium text-foreground">{formatCurrency(bonusAmount)}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">Annual Salary (excluding bonus)</span>
                  <span className="text-sm text-muted-foreground">{formatCurrency(annualSalary)}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-bold text-foreground">Total Annual Income</span>
                  <span className="text-sm font-bold text-foreground">{formatCurrency(annualSalary + bonusAmount)}</span>
                </div>

                <Separator className="bg-emerald-500/20" />

                {/* Percentage Method */}
                <p className="text-xs font-medium uppercase tracking-wider text-emerald-400 mt-2">
                  Percentage Method (Flat 22%)
                </p>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">Federal Tax (bonus × 22%)</span>
                  <span className="text-sm font-semibold text-red-400">-{formatCurrency(result.fedTaxPercentage)}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">FICA on Bonus</span>
                  <span className="text-sm font-semibold text-orange-400">-{formatCurrency(result.ficaOnBonus)}</span>
                </div>
                {result.stateTaxOnBonus > 0 && (
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted-foreground">State Tax on Bonus</span>
                    <span className="text-sm font-semibold text-amber-400">-{formatCurrency(result.stateTaxOnBonus)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-bold text-emerald-400">Take-Home (Percentage)</span>
                  <span className="text-lg font-bold text-emerald-400">{formatCurrency(result.netBonusPercentage)}</span>
                </div>

                <Separator className="bg-border/30" />

                {/* Aggregate Method */}
                <p className="text-xs font-medium uppercase tracking-wider text-cyan-400 mt-2">
                  Aggregate Method (Combined with Wages)
                </p>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">Federal Tax (marginal bracket)</span>
                  <span className="text-sm font-semibold text-red-400">-{formatCurrency(result.fedTaxAggregate)}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">FICA on Bonus (same)</span>
                  <span className="text-sm font-semibold text-orange-400">-{formatCurrency(result.ficaOnBonusAggregate)}</span>
                </div>
                {result.stateTaxOnBonusAggregate > 0 && (
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted-foreground">State Tax on Bonus (same)</span>
                    <span className="text-sm font-semibold text-amber-400">-{formatCurrency(result.stateTaxOnBonusAggregate)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-bold text-cyan-400">Take-Home (Aggregate)</span>
                  <span className="text-lg font-bold text-cyan-400">{formatCurrency(result.netBonusAggregate)}</span>
                </div>

                <Separator className="bg-emerald-500/30" />

                {/* Winner */}
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-bold text-emerald-400">
                    <Zap className="mr-1 inline h-4 w-4" />
                    Best Method Saves You
                  </span>
                  <span className="text-xl font-bold text-emerald-400">{formatCurrency(result.savingsByBetterMethod)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Charts */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Pie Chart */}
            <Card className="border-border/50 bg-card/80">
              <CardHeader>
                <CardTitle className="text-lg">Tax Breakdown ({selectedMethod === 'percentage' ? '22% Flat' : 'Aggregate'})</CardTitle>
                <CardDescription>Where your bonus money goes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend
                        formatter={(value: string) => <span className="text-xs text-muted-foreground">{value}</span>}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Bar Chart - Comparison */}
            <Card className="border-border/50 bg-card/80">
              <CardHeader>
                <CardTitle className="text-lg">Method Comparison</CardTitle>
                <CardDescription>Percentage vs Aggregate side by side</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData} barGap={4} barCategoryGap="20%">
                      <XAxis dataKey="name" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                      <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}K`} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend
                        formatter={(value: string) => <span className="text-xs text-muted-foreground">{value === 'percentage' ? 'Flat 22%' : 'Aggregate'}</span>}
                      />
                      <Bar dataKey="percentage" fill="#10b981" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="aggregate" fill="#22d3ee" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <AdSlot position="after-results" />
        </div>
      )}
    </div>
  );
}
