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
  AlertTriangle,
  Info,
  ArrowRightLeft,
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
import { FEDERAL_TAX_2026, STATE_PROFILES } from '@/lib/tax-config';
import { formatCurrency, roundCurrency, calculateFederalTax, calculateStateTax } from '@/lib/finance-utils';

// ─── Types ──────────────────────────────────────────────────────────────────────

type FilingStatus = 'single' | 'married' | 'head_of_household';
type PayoutType = 'lump-sum' | 'annuity';

const FILING_LABELS: Record<FilingStatus, string> = {
  single: 'Single',
  married: 'Married Filing Jointly',
  head_of_household: 'Head of Household',
};

// IRS mandatory withholding rate on gambling winnings over $5,000
const MANDATORY_WITHHOLDING_RATE = 0.24;
const MANDATORY_WITHHOLDING_THRESHOLD = 5000;

// ─── Calculation ────────────────────────────────────────────────────────────────

interface LotteryTaxResult {
  // Lump Sum
  lumpSumAmount: number;
  lumpSumFederalTax: number;
  lumpSumStateTax: number;
  lumpSumTotalTax: number;
  lumpSumNet: number;
  lumpSumEffectiveRate: number;
  lumpSumWithholding: number;
  lumpSumWithholdingGap: number;

  // Annuity (per year for 30 years)
  annuityAnnualPayment: number;
  annuityFederalTax: number;
  annuityStateTax: number;
  annuityTotalTax: number;
  annuityNetAnnual: number;
  annuityTotalNet: number;
  annuityEffectiveRate: number;
  annuityWithholding: number;
  annuityWithholdingGap: number;

  // Comparison
  betterOption: PayoutType;
  betterOptionSavings: number;
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

function calculateLotteryTax(
  prizeAmount: number,
  payoutType: PayoutType,
  lumpSumPercentage: number,
  filingStatus: FilingStatus,
  stateKey: string
): LotteryTaxResult {
  // ─── Lump Sum ──────────────────────────────────────────────────────────
  const lumpSumAmount = prizeAmount * (lumpSumPercentage / 100);
  const lumpSumFederalTax = calculateFederalTax(lumpSumAmount, filingStatus);
  const lumpSumStateTax = calculateStateTax(lumpSumAmount, stateKey, filingStatus);
  const lumpSumTotalTax = lumpSumFederalTax + lumpSumStateTax;
  const lumpSumNet = lumpSumAmount - lumpSumTotalTax;
  const lumpSumEffectiveRate = lumpSumAmount > 0 ? lumpSumTotalTax / lumpSumAmount : 0;
  const lumpSumWithholding = lumpSumAmount > MANDATORY_WITHHOLDING_THRESHOLD
    ? lumpSumAmount * MANDATORY_WITHHOLDING_RATE
    : 0;
  const lumpSumWithholdingGap = Math.max(0, lumpSumFederalTax - lumpSumWithholding);

  // ─── Annuity ───────────────────────────────────────────────────────────
  // Annuity pays full prize over 30 years
  const annuityYears = 30;
  const annuityAnnualPayment = prizeAmount / annuityYears;
  const annuityFederalTax = calculateFederalTax(annuityAnnualPayment, filingStatus);
  const annuityStateTax = calculateStateTax(annuityAnnualPayment, stateKey, filingStatus);
  const annuityTotalTax = annuityFederalTax + annuityStateTax;
  const annuityNetAnnual = annuityAnnualPayment - annuityTotalTax;
  const annuityTotalNet = annuityNetAnnual * annuityYears;
  const annuityEffectiveRate = annuityAnnualPayment > 0 ? annuityTotalTax / annuityAnnualPayment : 0;
  const annuityWithholding = annuityAnnualPayment > MANDATORY_WITHHOLDING_THRESHOLD
    ? annuityAnnualPayment * MANDATORY_WITHHOLDING_RATE
    : 0;
  const annuityWithholdingGap = Math.max(0, annuityFederalTax - annuityWithholding);

  // ─── Comparison ────────────────────────────────────────────────────────
  // Compare total net: lump sum now vs sum of all annuity payments after tax
  const betterOption: PayoutType = lumpSumNet >= annuityTotalNet ? 'lump-sum' : 'annuity';
  const betterOptionSavings = Math.abs(lumpSumNet - annuityTotalNet);
  const marginalRate = getMarginalFederalRate(
    payoutType === 'lump-sum' ? lumpSumAmount : annuityAnnualPayment,
    filingStatus
  );

  return {
    lumpSumAmount: roundCurrency(lumpSumAmount),
    lumpSumFederalTax: roundCurrency(lumpSumFederalTax),
    lumpSumStateTax: roundCurrency(lumpSumStateTax),
    lumpSumTotalTax: roundCurrency(lumpSumTotalTax),
    lumpSumNet: roundCurrency(lumpSumNet),
    lumpSumEffectiveRate,
    lumpSumWithholding: roundCurrency(lumpSumWithholding),
    lumpSumWithholdingGap: roundCurrency(lumpSumWithholdingGap),
    annuityAnnualPayment: roundCurrency(annuityAnnualPayment),
    annuityFederalTax: roundCurrency(annuityFederalTax),
    annuityStateTax: roundCurrency(annuityStateTax),
    annuityTotalTax: roundCurrency(annuityTotalTax),
    annuityNetAnnual: roundCurrency(annuityNetAnnual),
    annuityTotalNet: roundCurrency(annuityTotalNet),
    annuityEffectiveRate,
    annuityWithholding: roundCurrency(annuityWithholding),
    annuityWithholdingGap: roundCurrency(annuityWithholdingGap),
    betterOption,
    betterOptionSavings: roundCurrency(betterOptionSavings),
    marginalRate,
  };
}

// ─── Chart Colors ───────────────────────────────────────────────────────────────

const CHART_COLORS = {
  federalTax: '#ef4444',    // red-500
  stateTax: '#f97316',      // orange-500
  takeHome: '#10b981',      // emerald-500
  withholding: '#6b7280',   // gray-500
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

export function LotteryTaxCalculator() {
  const [prizeAmount, setPrizeAmount] = useState<number>(1000000);
  const [payoutType, setPayoutType] = useState<PayoutType>('lump-sum');
  const [lumpSumPercentage, setLumpSumPercentage] = useState<number>(50);
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const [stateKey, setStateKey] = useState<string>('illinois');
  const [hasCalculated, setHasCalculated] = useState(false);

  const result = useMemo(() => {
    if (prizeAmount <= 0) return null;
    return calculateLotteryTax(prizeAmount, payoutType, lumpSumPercentage, filingStatus, stateKey);
  }, [prizeAmount, payoutType, lumpSumPercentage, filingStatus, stateKey]);

  const trackUsage = useCallback(() => {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ calculator: 'lottery-tax' }),
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

  // Pie chart data based on selected payout type
  const pieData = useMemo(() => {
    if (!result) return [];
    if (payoutType === 'lump-sum') {
      return [
        { name: 'Federal Tax', value: result.lumpSumFederalTax, fill: CHART_COLORS.federalTax },
        ...(result.lumpSumStateTax > 0 ? [{ name: 'State Tax', value: result.lumpSumStateTax, fill: CHART_COLORS.stateTax }] : []),
        { name: 'Take-Home', value: Math.max(0, result.lumpSumNet), fill: CHART_COLORS.takeHome },
      ].filter((e) => e.value > 0);
    } else {
      return [
        { name: 'Federal Tax', value: result.annuityFederalTax, fill: CHART_COLORS.federalTax },
        ...(result.annuityStateTax > 0 ? [{ name: 'State Tax', value: result.annuityStateTax, fill: CHART_COLORS.stateTax }] : []),
        { name: 'Take-Home', value: Math.max(0, result.annuityNetAnnual), fill: CHART_COLORS.takeHome },
      ].filter((e) => e.value > 0);
    }
  }, [result, payoutType]);

  // Bar chart data: lump sum vs annuity comparison
  const barData = useMemo(() => {
    if (!result) return [];
    return [
      {
        name: 'Total Net',
        'Lump Sum': result.lumpSumNet,
        'Annuity (30yr)': result.annuityTotalNet,
      },
      {
        name: 'Federal Tax',
        'Lump Sum': result.lumpSumFederalTax,
        'Annuity (30yr)': result.annuityFederalTax * 30,
      },
      {
        name: 'State Tax',
        'Lump Sum': result.lumpSumStateTax,
        'Annuity (30yr)': result.annuityStateTax * 30,
      },
    ];
  }, [result]);

  const currentState = STATE_PROFILES[stateKey];

  return (
    <div className="space-y-6">
      {/* ─── Page Title ─────────────────────────────────── */}
      <div className="text-center">
        <h2 className="flex items-center justify-center gap-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          <DollarSign className="h-8 w-8 text-emerald-400" />
          Lottery Tax Calculator
        </h2>
        <p className="mt-2 text-muted-foreground">
          Calculate how much tax you pay on lottery, gambling &amp; prize winnings — federal + state
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs font-semibold px-3 py-1">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            2026 Tax Rates
          </Badge>
          <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-xs px-3 py-1">
            <ArrowRightLeft className="mr-1 h-3 w-3" />
            Lump Sum vs Annuity
          </Badge>
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs px-3 py-1">
            <AlertTriangle className="mr-1 h-3 w-3" />
            No FICA on Winnings
          </Badge>
        </div>
      </div>

      {/* ─── Key Info Banner ───────────────────────────── */}
      <Card className="border-amber-500/20 bg-amber-500/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Key Facts About Lottery Taxes</p>
              <p>
                <strong className="text-amber-400">No FICA:</strong> Lottery winnings are NOT subject to Social Security or Medicare taxes. Unlike regular wages, you don&apos;t pay the 7.65% FICA on gambling income. This is a major difference from salary income.
              </p>
              <p>
                <strong className="text-red-400">Mandatory Withholding:</strong> The IRS requires 24% federal withholding on winnings over $5,000, but your actual tax bill depends on your bracket. If you&apos;re in the 37% bracket, the 24% withholding won&apos;t cover it — you&apos;ll owe the rest at tax time.
              </p>
              <p>
                <strong className="text-emerald-400">State Variations:</strong> Some states (TX, FL, WA, etc.) don&apos;t tax lottery winnings at all. Others have their own progressive rates. This calculator shows the exact state tax for your situation.
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
                Lottery Winnings Details
              </CardTitle>
              <CardDescription>Enter your prize amount and tax situation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Prize Amount */}
                <div className="space-y-2">
                  <Label htmlFor="prize-amount" className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
                      Advertised Prize Amount
                    </span>
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="prize-amount"
                      type="number"
                      min={0}
                      step={10000}
                      value={prizeAmount || ''}
                      onChange={(e) => handleInputChange(setPrizeAmount)(Number(e.target.value) || 0)}
                      className="pl-9"
                      placeholder="1000000"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">The advertised jackpot or prize amount</p>
                </div>

                {/* Payout Type */}
                <div className="space-y-2">
                  <Label htmlFor="payout-type" className="text-sm font-medium">Payout Type</Label>
                  <Select value={payoutType} onValueChange={(v) => setPayoutType(v as PayoutType)}>
                    <SelectTrigger id="payout-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lump-sum">Lump Sum (Cash Option)</SelectItem>
                      <SelectItem value="annuity">Annuity (30-Year Payout)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    {payoutType === 'lump-sum'
                      ? 'Cash value is typically 50-60% of advertised jackpot'
                      : 'Full amount paid over 30 annual installments'}
                  </p>
                </div>
              </div>

              {/* Lump Sum Percentage (only shown for lump sum) */}
              {payoutType === 'lump-sum' && (
                <div className="space-y-2">
                  <Label htmlFor="lump-sum-pct" className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <TrendingDown className="h-3.5 w-3.5 text-cyan-400" />
                      Lump Sum Cash Percentage
                    </span>
                  </Label>
                  <div className="flex items-center gap-3">
                    <Input
                      id="lump-sum-pct"
                      type="number"
                      min={1}
                      max={100}
                      step={1}
                      value={lumpSumPercentage || ''}
                      onChange={(e) => handleInputChange(setLumpSumPercentage)(Number(e.target.value) || 50)}
                      className="w-24"
                      placeholder="50"
                    />
                    <span className="text-sm text-muted-foreground">%</span>
                    <div className="flex gap-1">
                      {[50, 55, 60].map((pct) => (
                        <Button
                          key={pct}
                          variant={lumpSumPercentage === pct ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setLumpSumPercentage(pct)}
                          className="h-7 px-2 text-xs"
                        >
                          {pct}%
                        </Button>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Cash value = {formatCurrency(prizeAmount * lumpSumPercentage / 100)} ({lumpSumPercentage}% of {formatCurrency(prizeAmount)})
                  </p>
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Filing Status */}
                <div className="space-y-2">
                  <Label htmlFor="lottery-filing" className="text-sm font-medium">Filing Status</Label>
                  <Select value={filingStatus} onValueChange={(v) => setFilingStatus(v as FilingStatus)}>
                    <SelectTrigger id="lottery-filing">
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
                  <Label htmlFor="lottery-state" className="text-sm font-medium">State</Label>
                  <Select value={stateKey} onValueChange={setStateKey}>
                    <SelectTrigger id="lottery-state">
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
              </div>

              {/* No FICA Notice */}
              <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <p className="text-xs font-medium text-emerald-400">
                    Lottery winnings are NOT subject to FICA (Social Security &amp; Medicare taxes)
                  </p>
                </div>
              </div>

              <Separator className="bg-border/40" />

              {/* Calculate Button */}
              <Button
                onClick={handleCalculate}
                disabled={prizeAmount <= 0}
                className="w-full bg-emerald-600 text-white hover:bg-emerald-700 sm:w-auto"
                size="lg"
              >
                <Zap className="mr-2 h-4 w-4" />
                Calculate Lottery Tax
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
                {payoutType === 'lump-sum' ? 'Lump Sum (Cash Option)' : 'Annuity (30-Year)'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Net Take-Home */}
              <div className="rounded-xl bg-emerald-500/10 p-4 text-center">
                <p className="text-xs font-medium uppercase tracking-wider text-emerald-400/80">
                  Your Take-Home
                </p>
                <p className="mt-1 text-3xl font-bold text-emerald-400">
                  {result ? formatCurrency(payoutType === 'lump-sum' ? result.lumpSumNet : result.annuityNetAnnual) : formatCurrency(0)}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {payoutType === 'lump-sum'
                    ? `From a ${formatCurrency(prizeAmount)} jackpot`
                    : 'Per year for 30 years'}
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
                    -{result ? formatCurrency(payoutType === 'lump-sum' ? result.lumpSumFederalTax : result.annuityFederalTax) : formatCurrency(0)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">FICA (SS + Medicare)</span>
                  <span className="text-sm font-semibold text-emerald-400">
                    $0.00
                  </span>
                </div>
                {result && (payoutType === 'lump-sum' ? result.lumpSumStateTax > 0 : result.annuityStateTax > 0) && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">State Tax ({currentState?.abbreviation})</span>
                    <span className="text-sm font-semibold text-amber-400">
                      -{formatCurrency(payoutType === 'lump-sum' ? result.lumpSumStateTax : result.annuityStateTax)}
                    </span>
                  </div>
                )}
                {result && (payoutType === 'lump-sum' ? result.lumpSumStateTax === 0 : result.annuityStateTax === 0) && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">State Tax ({currentState?.abbreviation})</span>
                    <span className="text-sm font-semibold text-emerald-400">
                      $0.00 (No state tax)
                    </span>
                  </div>
                )}
                <Separator className="bg-border/20" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Total Tax</span>
                  <span className="text-sm font-bold text-red-400">
                    -{result ? formatCurrency(payoutType === 'lump-sum' ? result.lumpSumTotalTax : result.annuityTotalTax) : formatCurrency(0)}
                  </span>
                </div>
              </div>

              <Separator className="bg-border/40" />

              {/* Effective Rate & Withholding */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-muted/30 p-2.5 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Effective Rate
                  </p>
                  <p className="text-lg font-bold text-foreground">
                    {result ? `${((payoutType === 'lump-sum' ? result.lumpSumEffectiveRate : result.annuityEffectiveRate) * 100).toFixed(1)}%` : '—'}
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

              {/* Withholding Warning */}
              {result && prizeAmount > MANDATORY_WITHHOLDING_THRESHOLD && (
                <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                    <div className="text-xs text-muted-foreground">
                      <p>
                        <strong className="text-amber-400">Withholding Gap:</strong> The IRS withholds 24% ({formatCurrency(payoutType === 'lump-sum' ? result.lumpSumWithholding : result.annuityWithholding)}), but your actual federal tax is {formatCurrency(payoutType === 'lump-sum' ? result.lumpSumFederalTax : result.annuityFederalTax)}.
                      </p>
                      {payoutType === 'lump-sum' && result.lumpSumWithholdingGap > 0 && (
                        <p className="mt-1">
                          You may owe an additional <strong className="text-red-400">{formatCurrency(result.lumpSumWithholdingGap)}</strong> at tax time.
                        </p>
                      )}
                      {payoutType === 'annuity' && result.annuityWithholdingGap > 0 && (
                        <p className="mt-1">
                          You may owe an additional <strong className="text-red-400">{formatCurrency(result.annuityWithholdingGap)}</strong> per year at tax time.
                        </p>
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
          {/* Side-by-side Lump Sum vs Annuity */}
          <Card className="border-emerald-500/30 bg-card/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-xs font-semibold">
                  <ArrowRightLeft className="mr-1 h-3 w-3" />
                  Lump Sum vs Annuity Comparison
                </Badge>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {/* Lump Sum */}
                <div className={`rounded-xl p-5 text-center ${result.betterOption === 'lump-sum' ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-muted/30 border border-border/30'}`}>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
                    {result.betterOption === 'lump-sum' && <CheckCircle2 className="mr-1 inline h-3.5 w-3.5 text-emerald-400" />}
                    Lump Sum (Cash)
                  </p>
                  <p className={`text-4xl font-bold ${result.betterOption === 'lump-sum' ? 'text-emerald-400' : 'text-muted-foreground'}`}>
                    {formatCurrency(result.lumpSumNet)}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">Take-Home (one-time)</p>
                  <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Cash Value ({lumpSumPercentage}%)</span>
                      <span>{formatCurrency(result.lumpSumAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Federal Tax</span>
                      <span className="text-red-400">-{formatCurrency(result.lumpSumFederalTax)}</span>
                    </div>
                    {result.lumpSumStateTax > 0 && (
                      <div className="flex justify-between">
                        <span>State Tax</span>
                        <span className="text-amber-400">-{formatCurrency(result.lumpSumStateTax)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>FICA</span>
                      <span className="text-emerald-400">$0 (Not applied)</span>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Effective rate: {(result.lumpSumEffectiveRate * 100).toFixed(1)}%
                  </p>
                </div>

                {/* Annuity */}
                <div className={`rounded-xl p-5 text-center ${result.betterOption === 'annuity' ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-muted/30 border border-border/30'}`}>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
                    {result.betterOption === 'annuity' && <CheckCircle2 className="mr-1 inline h-3.5 w-3.5 text-emerald-400" />}
                    Annuity (30 Years)
                  </p>
                  <p className={`text-4xl font-bold ${result.betterOption === 'annuity' ? 'text-emerald-400' : 'text-muted-foreground'}`}>
                    {formatCurrency(result.annuityNetAnnual)}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">Take-Home per year (×30)</p>
                  <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Annual Payment</span>
                      <span>{formatCurrency(result.annuityAnnualPayment)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Federal Tax/yr</span>
                      <span className="text-red-400">-{formatCurrency(result.annuityFederalTax)}</span>
                    </div>
                    {result.annuityStateTax > 0 && (
                      <div className="flex justify-between">
                        <span>State Tax/yr</span>
                        <span className="text-amber-400">-{formatCurrency(result.annuityStateTax)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>FICA</span>
                      <span className="text-emerald-400">$0 (Not applied)</span>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Effective rate: {(result.annuityEffectiveRate * 100).toFixed(1)}% | Total: {formatCurrency(result.annuityTotalNet)}
                  </p>
                </div>
              </div>

              <Separator className="my-6 bg-border/40" />

              {/* Key Metrics */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-4 text-center">
                  <p className="text-xs font-medium uppercase tracking-wider text-emerald-400/80">
                    Better Option
                  </p>
                  <p className="mt-1 text-lg font-bold text-emerald-400">
                    {result.betterOption === 'lump-sum' ? 'Lump Sum' : 'Annuity'}
                  </p>
                  <p className="text-xs text-muted-foreground">Higher total take-home</p>
                </div>
                <div className="rounded-lg bg-cyan-500/10 border border-cyan-500/20 p-4 text-center">
                  <p className="text-xs font-medium uppercase tracking-wider text-cyan-400/80">
                    Difference
                  </p>
                  <p className="mt-1 text-2xl font-bold text-cyan-400">
                    {formatCurrency(result.betterOptionSavings)}
                  </p>
                  <p className="text-xs text-muted-foreground">Between options (nominal)</p>
                </div>
                <div className="rounded-lg bg-muted/30 p-4 text-center">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Advertised Prize
                  </p>
                  <p className="mt-1 text-2xl font-bold text-foreground">
                    {formatCurrency(prizeAmount)}
                  </p>
                  <p className="text-xs text-muted-foreground">Before any taxes</p>
                </div>
                <div className="rounded-lg bg-muted/30 p-4 text-center">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    FICA Savings
                  </p>
                  <p className="mt-1 text-2xl font-bold text-emerald-400">
                    {payoutType === 'lump-sum'
                      ? formatCurrency(result.lumpSumAmount * 0.0765)
                      : formatCurrency(result.annuityAnnualPayment * 0.0765)}
                  </p>
                  <p className="text-xs text-muted-foreground">Saved vs wage income</p>
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
              <CardDescription>Complete breakdown of taxes on your lottery winnings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-medium text-foreground">Advertised Prize</span>
                  <span className="text-sm font-medium text-foreground">{formatCurrency(prizeAmount)}</span>
                </div>

                <Separator className="bg-emerald-500/20" />

                {/* Lump Sum Section */}
                <p className="text-xs font-medium uppercase tracking-wider text-emerald-400 mt-2">
                  Lump Sum (Cash Option)
                </p>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">Cash Value ({lumpSumPercentage}%)</span>
                  <span className="text-sm text-muted-foreground">{formatCurrency(result.lumpSumAmount)}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">Federal Tax (progressive brackets)</span>
                  <span className="text-sm font-semibold text-red-400">-{formatCurrency(result.lumpSumFederalTax)}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">FICA (Social Security + Medicare)</span>
                  <span className="text-sm font-semibold text-emerald-400">$0.00 — Not applied</span>
                </div>
                {result.lumpSumStateTax > 0 ? (
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted-foreground">State Tax ({currentState?.name})</span>
                    <span className="text-sm font-semibold text-amber-400">-{formatCurrency(result.lumpSumStateTax)}</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted-foreground">State Tax ({currentState?.name})</span>
                    <span className="text-sm font-semibold text-emerald-400">$0.00 — No state income tax</span>
                  </div>
                )}
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-bold text-emerald-400">Take-Home (Lump Sum)</span>
                  <span className="text-lg font-bold text-emerald-400">{formatCurrency(result.lumpSumNet)}</span>
                </div>

                <Separator className="bg-border/30" />

                {/* Annuity Section */}
                <p className="text-xs font-medium uppercase tracking-wider text-cyan-400 mt-2">
                  Annuity (30-Year Payout)
                </p>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">Annual Payment ({formatCurrency(prizeAmount)} ÷ 30)</span>
                  <span className="text-sm text-muted-foreground">{formatCurrency(result.annuityAnnualPayment)}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">Federal Tax/yr (progressive brackets)</span>
                  <span className="text-sm font-semibold text-red-400">-{formatCurrency(result.annuityFederalTax)}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">FICA (Social Security + Medicare)</span>
                  <span className="text-sm font-semibold text-emerald-400">$0.00 — Not applied</span>
                </div>
                {result.annuityStateTax > 0 ? (
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted-foreground">State Tax/yr ({currentState?.name})</span>
                    <span className="text-sm font-semibold text-amber-400">-{formatCurrency(result.annuityStateTax)}</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted-foreground">State Tax/yr ({currentState?.name})</span>
                    <span className="text-sm font-semibold text-emerald-400">$0.00 — No state income tax</span>
                  </div>
                )}
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-bold text-cyan-400">Take-Home/yr (Annuity)</span>
                  <span className="text-lg font-bold text-cyan-400">{formatCurrency(result.annuityNetAnnual)}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">Total Over 30 Years</span>
                  <span className="text-sm font-medium text-cyan-400">{formatCurrency(result.annuityTotalNet)}</span>
                </div>

                <Separator className="bg-emerald-500/30" />

                {/* Withholding Warning */}
                <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                    <div className="text-xs text-muted-foreground">
                      <p className="font-medium text-amber-400 mb-1">Mandatory Withholding Warning</p>
                      <p>
                        The IRS requires 24% federal withholding on lottery winnings over $5,000. For your {payoutType === 'lump-sum' ? 'lump sum' : 'annual annuity payment'} of {formatCurrency(payoutType === 'lump-sum' ? result.lumpSumAmount : result.annuityAnnualPayment)}, that&apos;s {formatCurrency(payoutType === 'lump-sum' ? result.lumpSumWithholding : result.annuityWithholding)} withheld.
                      </p>
                      {payoutType === 'lump-sum' && result.lumpSumWithholdingGap > 0 && (
                        <p className="mt-1">
                          But your actual federal tax is <strong>{formatCurrency(result.lumpSumFederalTax)}</strong>, so you&apos;ll likely owe an additional <strong className="text-red-400">{formatCurrency(result.lumpSumWithholdingGap)}</strong> when you file your tax return. Plan for this.
                        </p>
                      )}
                      {payoutType === 'annuity' && result.annuityWithholdingGap > 0 && (
                        <p className="mt-1">
                          But your actual federal tax per year is <strong>{formatCurrency(result.annuityFederalTax)}</strong>, so you&apos;ll likely owe an additional <strong className="text-red-400">{formatCurrency(result.annuityWithholdingGap)}</strong> each year when you file.
                        </p>
                      )}
                      {(payoutType === 'lump-sum' ? result.lumpSumWithholdingGap <= 0 : result.annuityWithholdingGap <= 0) && (
                        <p className="mt-1">
                          The 24% withholding covers your actual federal tax liability. You may even get a small refund.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Charts */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Pie Chart */}
            <Card className="border-border/50 bg-card/80">
              <CardHeader>
                <CardTitle className="text-lg">
                  Tax Breakdown ({payoutType === 'lump-sum' ? 'Lump Sum' : 'Annuity/yr'})
                </CardTitle>
                <CardDescription>Where your winnings go</CardDescription>
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
                <CardTitle className="text-lg">Lump Sum vs Annuity (30yr Total)</CardTitle>
                <CardDescription>Comparing total take-home and taxes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData} barGap={4} barCategoryGap="20%">
                      <XAxis dataKey="name" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                      <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v: number) => `$${(v / 1000000).toFixed(1)}M`} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend
                        formatter={(value: string) => <span className="text-xs text-muted-foreground">{value}</span>}
                      />
                      <Bar dataKey="Lump Sum" fill="#10b981" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Annuity (30yr)" fill="#22d3ee" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* No FICA Highlight Card */}
          <Card className="border-emerald-500/20 bg-emerald-500/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-emerald-500/20 p-3">
                  <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground mb-2">
                    No FICA on Lottery Winnings — A Major Tax Advantage
                  </p>
                  <p className="text-sm text-muted-foreground mb-3">
                    Unlike regular wages, lottery and gambling winnings are <strong>not subject to FICA</strong> (Social Security 6.2% + Medicare 1.45% = 7.65%). This means significant savings compared to earning the same amount as salary.
                  </p>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-lg bg-background/50 p-3 text-center">
                      <p className="text-xs text-muted-foreground">FICA on {formatCurrency(payoutType === 'lump-sum' ? result.lumpSumAmount : result.annuityAnnualPayment)} as wages</p>
                      <p className="text-lg font-bold text-red-400">
                        {formatCurrency((payoutType === 'lump-sum' ? result.lumpSumAmount : result.annuityAnnualPayment) * 0.0765)}
                      </p>
                    </div>
                    <div className="rounded-lg bg-background/50 p-3 text-center">
                      <p className="text-xs text-muted-foreground">FICA on lottery winnings</p>
                      <p className="text-lg font-bold text-emerald-400">$0.00</p>
                    </div>
                    <div className="rounded-lg bg-background/50 p-3 text-center">
                      <p className="text-xs text-muted-foreground">You save</p>
                      <p className="text-lg font-bold text-emerald-400">
                        {formatCurrency((payoutType === 'lump-sum' ? result.lumpSumAmount : result.annuityAnnualPayment) * 0.0765)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <AdSlot position="after-results" />
        </div>
      )}
    </div>
  );
}
