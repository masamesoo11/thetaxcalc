'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import {
  TrendingUp,
  DollarSign,
  Percent,
  Info,
  BarChart3,
  ArrowRight,
} from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AdSlot } from './ad-slot';
import { FAQSection, CAPITAL_GAINS_FAQS } from './faq-sections';
import {
  formatCurrency,
  formatPercent,
  roundCurrency,
  calculateFederalTax,
} from '@/lib/finance-utils';
import { FEDERAL_TAX_2026 } from '@/lib/tax-config';
import { useHashParams, updateHashState } from '@/hooks/use-hash-state';

// ─── Types ──────────────────────────────────────────────────────────────────────

type FilingStatus = 'single' | 'married' | 'head_of_household';

const FILING_LABELS: Record<FilingStatus, string> = {
  single: 'Single',
  married: 'Married Filing Jointly',
  head_of_household: 'Head of Household',
};

// ─── Capital Gains Brackets (2026) ──────────────────────────────────────────────

const LONG_TERM_BRACKETS: Record<FilingStatus, { zeroMax: number; fifteenMax: number }> = {
  single: { zeroMax: 47025, fifteenMax: 518900 },
  married: { zeroMax: 94050, fifteenMax: 583750 },
  head_of_household: { zeroMax: 63000, fifteenMax: 551350 },
};

const NIIT_THRESHOLD: Record<FilingStatus, number> = {
  single: 200000,
  married: 250000,
  head_of_household: 200000,
};

const NIIT_RATE = 0.038;

// ─── Calculation ────────────────────────────────────────────────────────────────

interface CapitalGainsResult {
  totalGains: number;
  shortTermGains: number;
  longTermGains: number;
  otherIncome: number;
  shortTermTax: number;
  longTermTax: number;
  longTermBracket: string;
  niit: number;
  totalTax: number;
  effectiveRate: number;
  netProceeds: number;
  costBasis: number;
  salePrice: number;
}

function calculateCapitalGainsTax(
  shortTermGains: number,
  longTermGains: number,
  otherIncome: number,
  filingStatus: FilingStatus,
  costBasis: number,
  salePrice: number
): CapitalGainsResult {
  const totalGains = shortTermGains + longTermGains;
  const brackets = FEDERAL_TAX_2026.bracketsByFiling[filingStatus];
  const stdDeduction = FEDERAL_TAX_2026.standardDeductionsByFiling[filingStatus];
  const ltBrackets = LONG_TERM_BRACKETS[filingStatus];

  // Short-term gains: taxed as ordinary income
  // We calculate the federal tax on (otherIncome + shortTermGains) - standardDeduction
  // then subtract the federal tax on (otherIncome - standardDeduction) to isolate the short-term gains tax
  const ordinaryWithGains = otherIncome + shortTermGains;
  const taxWithGains = calculateFederalTax(ordinaryWithGains, filingStatus);
  const taxWithoutGains = calculateFederalTax(otherIncome, filingStatus);
  const shortTermTax = Math.max(0, taxWithGains - taxWithoutGains);

  // Long-term gains: preferential rates
  // Total taxable income = otherIncome + shortTermGains - stdDeduction + longTermGains
  // The long-term gains stack on top of ordinary income
  const ordinaryTaxableIncome = Math.max(0, otherIncome + shortTermGains - stdDeduction);
  const totalTaxableIncome = ordinaryTaxableIncome + longTermGains;

  let longTermTax = 0;
  let longTermBracket = '0%';

  if (totalTaxableIncome <= ltBrackets.zeroMax) {
    // All long-term gains taxed at 0%
    longTermTax = 0;
    longTermBracket = '0%';
  } else if (totalTaxableIncome <= ltBrackets.fifteenMax) {
    // Some gains at 0%, rest at 15%
    const gainsAtZero = Math.max(0, ltBrackets.zeroMax - ordinaryTaxableIncome);
    const gainsAtFifteen = longTermGains - gainsAtZero;
    longTermTax = Math.max(0, gainsAtFifteen) * 0.15;
    if (gainsAtZero > 0 && gainsAtFifteen > 0) {
      longTermBracket = '0% + 15%';
    } else {
      longTermBracket = '15%';
    }
  } else {
    // Some at 0%, some at 15%, rest at 20%
    const gainsAtZero = Math.max(0, Math.min(ltBrackets.zeroMax - ordinaryTaxableIncome, longTermGains));
    const gainsAtFifteen = Math.max(0, Math.min(ltBrackets.fifteenMax - ordinaryTaxableIncome - gainsAtZero, longTermGains - gainsAtZero));
    const gainsAtTwenty = Math.max(0, longTermGains - gainsAtZero - gainsAtFifteen);
    longTermTax = gainsAtFifteen * 0.15 + gainsAtTwenty * 0.20;

    const bracketParts: string[] = [];
    if (gainsAtZero > 0) bracketParts.push('0%');
    if (gainsAtFifteen > 0) bracketParts.push('15%');
    if (gainsAtTwenty > 0) bracketParts.push('20%');
    longTermBracket = bracketParts.join(' + ');
  }

  // Net Investment Income Tax (NIIT)
  const investmentIncome = shortTermGains + longTermGains;
  const modifiedAGI = otherIncome + totalGains;
  const niitThreshold = NIIT_THRESHOLD[filingStatus];
  const niit = modifiedAGI > niitThreshold
    ? Math.min(investmentIncome, modifiedAGI - niitThreshold) * NIIT_RATE
    : 0;

  const totalTax = shortTermTax + longTermTax + niit;
  const effectiveRate = totalGains > 0 ? totalTax / totalGains : 0;
  const netProceeds = salePrice - totalTax;

  return {
    totalGains,
    shortTermGains,
    longTermGains,
    otherIncome,
    shortTermTax: roundCurrency(shortTermTax),
    longTermTax: roundCurrency(longTermTax),
    longTermBracket,
    niit: roundCurrency(niit),
    totalTax: roundCurrency(totalTax),
    effectiveRate,
    netProceeds: roundCurrency(netProceeds),
    costBasis,
    salePrice,
  };
}

// ─── Chart Colors ───────────────────────────────────────────────────────────────

const CHART_COLORS = {
  shortTermTax: '#ef4444', // red-500
  longTermTax: '#f59e0b', // amber-500
  niit: '#f97316', // orange-500
  netProceeds: '#10b981', // emerald-500
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

export function CapitalGainsCalculator() {
  const hashParams = useHashParams();

  const [filingStatus, setFilingStatus] = useState<FilingStatus>(
    () => (hashParams.filing as FilingStatus) || 'single'
  );
  const [shortTermGains, setShortTermGains] = useState<number>(
    () => hashParams.st ? Number(hashParams.st) : 0
  );
  const [longTermGains, setLongTermGains] = useState<number>(
    () => hashParams.lt ? Number(hashParams.lt) : 50000
  );
  const [otherIncome, setOtherIncome] = useState<number>(
    () => hashParams.income ? Number(hashParams.income) : 75000
  );
  const [costBasis, setCostBasis] = useState<number>(
    () => hashParams.basis ? Number(hashParams.basis) : 50000
  );
  const [salePrice, setSalePrice] = useState<number>(
    () => hashParams.sale ? Number(hashParams.sale) : 100000
  );
  const [hasCalculated, setHasCalculated] = useState(false);
  const [result, setResult] = useState<CapitalGainsResult | null>(null);

  // Persist to hash
  useEffect(() => {
    updateHashState('capital-gains', {
      filing: filingStatus,
      st: shortTermGains,
      lt: longTermGains,
      income: otherIncome,
      basis: costBasis,
      sale: salePrice,
    });
  }, [filingStatus, shortTermGains, longTermGains, otherIncome, costBasis, salePrice]);

  // Track usage
  const trackUsage = useCallback(() => {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ calculator: 'capital-gains' }),
    }).catch(() => {});
  }, []);

  const handleCalculate = () => {
    const res = calculateCapitalGainsTax(
      shortTermGains,
      longTermGains,
      otherIncome,
      filingStatus,
      costBasis,
      salePrice
    );
    setResult(res);
    setHasCalculated(true);
    trackUsage();
  };

  // Pie chart data
  const pieData = useMemo(() => {
    if (!result) return [];
    const entries = [
      { name: 'Short-Term Tax', value: result.shortTermTax, fill: CHART_COLORS.shortTermTax },
      { name: 'Long-Term Tax', value: result.longTermTax, fill: CHART_COLORS.longTermTax },
    ];
    if (result.niit > 0) {
      entries.push({ name: 'NIIT (3.8%)', value: result.niit, fill: CHART_COLORS.niit });
    }
    entries.push({ name: 'Net Proceeds', value: Math.max(0, result.netProceeds), fill: CHART_COLORS.netProceeds });
    return entries.filter((e) => e.value > 0);
  }, [result]);

  // Bar chart data
  const barData = useMemo(() => {
    if (!result) return [];
    return [
      { name: 'Short-Term Gains Tax', value: result.shortTermTax, fill: CHART_COLORS.shortTermTax },
      { name: 'Long-Term Gains Tax', value: result.longTermTax, fill: CHART_COLORS.longTermTax },
      { name: 'NIIT (3.8%)', value: result.niit, fill: CHART_COLORS.niit },
    ].filter((e) => e.value > 0);
  }, [result]);

  return (
    <div className="space-y-6">
      {/* ─── Page Title ─────────────────────────────────── */}
      <div className="text-center">
        <h1 className="flex items-center justify-center gap-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          <TrendingUp className="h-8 w-8 text-emerald-400" />
          Capital Gains Tax Calculator
        </h1>
        <p className="mt-2 text-muted-foreground">
          Calculate your capital gains tax liability — short-term, long-term, and NIIT for 2026
        </p>
      </div>

      {/* ─── Info Card ──────────────────────────────────── */}
      <Card className="border-emerald-500/20 bg-emerald-500/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">How Capital Gains Tax Works</p>
              <p>
                <strong>Short-term gains</strong> (held ≤ 1 year) are taxed as ordinary income using federal brackets.
                <strong> Long-term gains</strong> (held &gt; 1 year) receive preferential rates: 0%, 15%, or 20%
                depending on your total taxable income. The <strong>Net Investment Income Tax (NIIT)</strong> adds
                an extra 3.8% on investment income when your modified AGI exceeds $200K (single) or $250K (married).
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ─── Pre-rendered SEO Example ───────────────────── */}
      <div className="rounded-xl border border-border/30 bg-muted/10 p-6" aria-hidden="true">
        <h2 className="text-xl font-bold text-foreground">Capital Gains Tax Example: $50,000 Long-Term Gain (2026)</h2>
        <div className="mt-3 space-y-1 text-sm text-muted-foreground">
          <p>Filing Status: Single</p>
          <p>Other Income: $75,000</p>
          <p>Long-Term Gains: $50,000</p>
          <p>Total Taxable Income: $110,000 (after $15,000 standard deduction on ordinary income)</p>
          <p>Long-Term Capital Gains Bracket: 15%</p>
          <p>Estimated Long-Term Capital Gains Tax: ~$7,500</p>
          <p>No NIIT applies (MAGI below $200,000 threshold)</p>
          <p>Effective Tax Rate on Gains: ~15.0%</p>
        </div>
      </div>

      {/* ─── Input Section ──────────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-3">
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <DollarSign className="h-5 w-5 text-emerald-400" />
                Investment Details
              </CardTitle>
              <CardDescription>Enter your gains and income to calculate your tax liability</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Filing Status */}
              <div className="space-y-2">
                <Label htmlFor="cg-filing" className="text-sm font-medium">Filing Status</Label>
                <Select value={filingStatus} onValueChange={(v) => setFilingStatus(v as FilingStatus)}>
                  <SelectTrigger id="cg-filing" className="w-full max-w-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(FILING_LABELS).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Short-Term Gains */}
                <div className="space-y-2">
                  <Label htmlFor="cg-short" className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <TrendingUp className="h-3.5 w-3.5 text-red-400" />
                      Short-Term Gains (≤ 1 yr)
                    </span>
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="cg-short"
                      type="number"
                      min={0}
                      value={shortTermGains || ''}
                      onChange={(e) => setShortTermGains(Number(e.target.value) || 0)}
                      className="pl-9"
                      placeholder="0"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Taxed as ordinary income</p>
                </div>

                {/* Long-Term Gains */}
                <div className="space-y-2">
                  <Label htmlFor="cg-long" className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                      Long-Term Gains (&gt; 1 yr)
                    </span>
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="cg-long"
                      type="number"
                      min={0}
                      value={longTermGains || ''}
                      onChange={(e) => setLongTermGains(Number(e.target.value) || 0)}
                      className="pl-9"
                      placeholder="50000"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Taxed at 0%, 15%, or 20%</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Other Income */}
                <div className="space-y-2">
                  <Label htmlFor="cg-income" className="text-sm font-medium">Other Taxable Income</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="cg-income"
                      type="number"
                      min={0}
                      value={otherIncome || ''}
                      onChange={(e) => setOtherIncome(Number(e.target.value) || 0)}
                      className="pl-9"
                      placeholder="75000"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Wages, salary, etc. (determines your bracket)</p>
                </div>

                {/* Cost Basis */}
                <div className="space-y-2">
                  <Label htmlFor="cg-basis" className="text-sm font-medium">Cost Basis</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="cg-basis"
                      type="number"
                      min={0}
                      value={costBasis || ''}
                      onChange={(e) => setCostBasis(Number(e.target.value) || 0)}
                      className="pl-9"
                      placeholder="50000"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Original purchase price of investment</p>
                </div>
              </div>

              {/* Sale Price */}
              <div className="space-y-2">
                <Label htmlFor="cg-sale" className="text-sm font-medium">Sale Price</Label>
                <div className="relative max-w-xs">
                  <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="cg-sale"
                    type="number"
                    min={0}
                    value={salePrice || ''}
                    onChange={(e) => setSalePrice(Number(e.target.value) || 0)}
                    className="pl-9"
                    placeholder="100000"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Total proceeds from sale (Gain = Sale Price - Cost Basis = {formatCurrency(Math.max(0, salePrice - costBasis))})
                </p>
              </div>

              <Separator className="bg-border/40" />

              {/* Calculate Button */}
              <Button
                onClick={handleCalculate}
                disabled={shortTermGains + longTermGains <= 0}
                className="w-full bg-emerald-600 text-white hover:bg-emerald-700 sm:w-auto"
                size="lg"
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Calculate Capital Gains Tax
              </Button>
            </CardContent>
          </Card>

          <AdSlot position="after-form" />
        </div>

        {/* ─── Right Side: Quick Reference ─────────────────── */}
        <div className="lg:col-span-2">
          <Card className="sticky top-20 border-emerald-500/20 bg-card/90 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Percent className="h-5 w-5 text-emerald-400" />
                2026 Long-Term Rates
              </CardTitle>
              <CardDescription>Long-term capital gains brackets by filing status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {(['single', 'married', 'head_of_household'] as const).map((status) => {
                  const b = LONG_TERM_BRACKETS[status];
                  return (
                    <div key={status} className="rounded-lg bg-muted/30 p-3 space-y-1.5">
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {FILING_LABELS[status]}
                      </p>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-emerald-400 font-medium">0% rate</span>
                          <span className="text-foreground">≤ {formatCurrency(b.zeroMax)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-amber-400 font-medium">15% rate</span>
                          <span className="text-foreground">≤ {formatCurrency(b.fifteenMax)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-red-400 font-medium">20% rate</span>
                          <span className="text-foreground">&gt; {formatCurrency(b.fifteenMax)}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Separator className="bg-border/40" />

              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Net Investment Income Tax
                </p>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-orange-400 font-medium">3.8% NIIT</span>
                    <span className="text-foreground">MAGI &gt; {formatCurrency(NIIT_THRESHOLD.single)} (Single)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-orange-400 font-medium">3.8% NIIT</span>
                    <span className="text-foreground">MAGI &gt; {formatCurrency(NIIT_THRESHOLD.married)} (Married)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ─── Results Section ────────────────────────────── */}
      {result && hasCalculated && (
        <div className="space-y-6">
          {/* Hero Result */}
          <Card className="border-emerald-500/30 bg-card/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                  Total Capital Gains Tax
                </p>
                <p className="mt-2 text-4xl font-bold text-red-400 sm:text-5xl">
                  {formatCurrency(result.totalTax)}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  On {formatCurrency(result.totalGains)} in total gains ({formatPercent(result.effectiveRate)} effective rate)
                </p>
              </div>

              <Separator className="my-6 bg-border/40" />

              {/* Key Metrics */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg bg-muted/30 p-4 text-center">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Short-Term Tax
                  </p>
                  <p className="mt-1 text-2xl font-bold text-red-400">
                    {formatCurrency(result.shortTermTax)}
                  </p>
                  <p className="text-xs text-muted-foreground">Ordinary income rates</p>
                </div>
                <div className="rounded-lg bg-muted/30 p-4 text-center">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Long-Term Tax
                  </p>
                  <p className="mt-1 text-2xl font-bold text-amber-400">
                    {formatCurrency(result.longTermTax)}
                  </p>
                  <div className="mt-1">
                    <Badge className="bg-amber-500/20 text-amber-400 text-xs">
                      {result.longTermBracket} bracket
                    </Badge>
                  </div>
                </div>
                <div className="rounded-lg bg-muted/30 p-4 text-center">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    NIIT (3.8%)
                  </p>
                  <p className="mt-1 text-2xl font-bold text-orange-400">
                    {formatCurrency(result.niit)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {result.niit > 0 ? 'Above threshold' : 'Below threshold'}
                  </p>
                </div>
                <div className="rounded-lg bg-emerald-500/10 p-4 text-center">
                  <p className="text-xs font-medium uppercase tracking-wider text-emerald-400/80">
                    Net Proceeds
                  </p>
                  <p className="mt-1 text-2xl font-bold text-emerald-400">
                    {formatCurrency(result.netProceeds)}
                  </p>
                  <p className="text-xs text-muted-foreground">After all taxes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Breakdown */}
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart3 className="h-5 w-5 text-emerald-400" />
                Tax Breakdown
              </CardTitle>
              <CardDescription>Complete analysis of your capital gains tax liability</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">Short-Term Capital Gains</span>
                  <span className="text-sm font-medium text-foreground">{formatCurrency(result.shortTermGains)}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground pl-4">Tax at ordinary rates</span>
                  <span className="text-sm font-semibold text-red-400">{formatCurrency(result.shortTermTax)}</span>
                </div>
                <Separator className="bg-border/30" />
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">Long-Term Capital Gains</span>
                  <span className="text-sm font-medium text-foreground">{formatCurrency(result.longTermGains)}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground pl-4">Tax at {result.longTermBracket}</span>
                  <span className="text-sm font-semibold text-amber-400">{formatCurrency(result.longTermTax)}</span>
                </div>
                {result.niit > 0 && (
                  <>
                    <Separator className="bg-border/30" />
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-muted-foreground">Net Investment Income Tax (3.8%)</span>
                      <span className="text-sm font-semibold text-orange-400">{formatCurrency(result.niit)}</span>
                    </div>
                  </>
                )}
                <Separator className="bg-border/30" />
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-semibold text-foreground">Total Capital Gains Tax</span>
                  <span className="text-lg font-bold text-red-400">{formatCurrency(result.totalTax)}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-semibold text-foreground">Effective Tax Rate on Gains</span>
                  <span className="text-lg font-bold text-foreground">{formatPercent(result.effectiveRate)}</span>
                </div>
                <Separator className="bg-border/30" />
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">Sale Price</span>
                  <span className="text-sm font-medium text-foreground">{formatCurrency(result.salePrice)}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">Cost Basis</span>
                  <span className="text-sm font-medium text-foreground">{formatCurrency(result.costBasis)}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">Total Gains</span>
                  <span className="text-sm font-medium text-foreground">{formatCurrency(result.totalGains)}</span>
                </div>
                <Separator className="bg-emerald-500/30" />
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-bold text-emerald-400">Net Proceeds After Tax</span>
                  <span className="text-lg font-bold text-emerald-400">{formatCurrency(result.netProceeds)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Charts */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Pie Chart */}
            <Card className="border-border/50 bg-card/80">
              <CardHeader>
                <CardTitle className="text-lg">Tax Breakdown</CardTitle>
                <CardDescription>How your capital gains tax is distributed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full" style={{ minHeight: 300 }}>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={105}
                        paddingAngle={2}
                        dataKey="value"
                        nameKey="name"
                        stroke="none"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`pie-cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend
                        content={({ payload }) => {
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
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Bar Chart */}
            <Card className="border-border/50 bg-card/80">
              <CardHeader>
                <CardTitle className="text-lg">Short-Term vs Long-Term Tax</CardTitle>
                <CardDescription>Comparing tax liability by gain type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full" style={{ minHeight: 300 }}>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={barData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
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
                        width={95}
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={11}
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={28}>
                        {barData.map((entry, index) => (
                          <Cell key={`bar-cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <AdSlot position="after-results" />
        </div>
      )}

      {/* ─── SEO Content Section ────────────────────────── */}
      <Card className="border-border/50 bg-card/80">
        <CardHeader>
          <CardTitle className="text-lg">Understanding Capital Gains Tax in 2026</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground">What are capital gains?</strong> Capital gains are the profits you
            earn from selling an asset — such as stocks, bonds, real estate, or cryptocurrency — for more than
            you paid for it. The IRS taxes these gains differently depending on how long you held the asset
            before selling.
          </p>
          <p>
            <strong className="text-foreground">Short-term vs long-term:</strong> Assets held for one year or less
            generate short-term capital gains, which are taxed at your ordinary income tax rate (up to 37%).
            Assets held for more than one year generate long-term capital gains, which benefit from lower
            preferential rates of 0%, 15%, or 20% depending on your total taxable income.
          </p>
          <p>
            <strong className="text-foreground">The holding period advantage:</strong> The difference between
            short-term and long-term rates can be dramatic. A single filer with $100,000 in other income who
            realizes a $50,000 gain would pay approximately $11,000 in tax if it&apos;s short-term (22% bracket)
            but only $7,500 if it&apos;s long-term (15% bracket) — a savings of $3,500 simply by holding the
            asset for an additional day beyond one year.
          </p>
          <p>
            <strong className="text-foreground">Net Investment Income Tax (NIIT):</strong> High-income taxpayers
            face an additional 3.8% tax on net investment income (including capital gains) when their modified
            adjusted gross income exceeds $200,000 (single) or $250,000 (married filing jointly). This tax
            applies on top of the regular capital gains rates, effectively making the top rate 23.8% on
            long-term gains.
          </p>
          <p>
            <strong className="text-foreground">Tax-loss harvesting:</strong> You can offset capital gains by
            selling losing investments. Short-term losses offset short-term gains first, and long-term losses
            offset long-term gains first. If total losses exceed gains, you can deduct up to $3,000 per year
            against ordinary income and carry forward any remaining losses indefinitely.
          </p>
          <p>
            <strong className="text-foreground">Crypto gains:</strong> Cryptocurrency is treated as property by
            the IRS, meaning crypto gains are subject to the same capital gains rules as stocks. Each
            disposal (sale, trade for another crypto, or purchase of goods/services) is a taxable event.
            Keeping detailed records of purchase dates and cost basis is essential for accurate tax reporting.
          </p>
        </CardContent>
      </Card>

      <FAQSection title="Capital Gains Tax FAQ — 2026 Rates, Rules & Strategies" faqs={CAPITAL_GAINS_FAQS} />

      {/* ─── Internal Links ─────────────────────────────── */}
      <Card className="border-border/50 bg-card/80">
        <CardHeader>
          <CardTitle className="text-lg">Related Tax Calculators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { page: 'home', label: 'Paycheck Calculator', desc: 'Calculate your take-home pay after all taxes' },
              { page: 'self-employment', label: 'Self-Employment Tax Calculator', desc: 'Estimate your SE tax and quarterly payments' },
              { page: 'relocation', label: 'Salary Relocation Calculator', desc: 'Compare take-home pay across states' },
              { page: 'retirement', label: '401(k) Retirement Projection', desc: 'Project your retirement savings growth' },
              { page: 'mortgage', label: 'Mortgage Calculator', desc: 'Calculate monthly payments and amortization' },
            ].map((link) => (
              <button
                key={link.page}
                onClick={() => { window.location.hash = link.page; window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="flex items-start gap-2 rounded-lg border border-border/50 bg-muted/20 p-3 text-left transition-colors hover:border-emerald-500/30 hover:bg-emerald-500/5"
              >
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <div>
                  <p className="text-sm font-medium text-foreground">{link.label}</p>
                  <p className="text-xs text-muted-foreground">{link.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <AdSlot position="mid-content" />
    </div>
  );
}
