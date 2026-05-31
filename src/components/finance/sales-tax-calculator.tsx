'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import {
  Calculator,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Shield,
  Receipt,
  MapPin,
  ShoppingCart,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
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
import { FAQSection } from './faq-sections';
import { SALES_TAX_FAQS } from '@/lib/faq-data';
import {
  FEDERAL_TAX_2026,
  FICA_2026,
  STATE_PROFILES,
} from '@/lib/tax-config';
import { formatCurrency, roundCurrency } from '@/lib/finance-utils';
import { useUrlParams, updateUrlState, migrateHashUrl } from '@/hooks/use-url-state';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatPercent(value: number): string {
  return (value * 100).toFixed(2) + '%';
}

// ─── US State Sales Tax Data (2026) ──────────────────────────────────────────

interface StateSalesTax {
  name: string;
  abbreviation: string;
  stateRate: number;       // State base rate as decimal
  avgLocalRate: number;    // Average local/city rate as decimal
  combinedRate: number;    // Average combined state + local rate as decimal
  noStateTax: boolean;
  // Tax-exempt categories (true = exempt from state sales tax)
  groceryExempt: boolean;
  prescriptionDrugExempt: boolean;
  clothingExempt: boolean;
}

const STATE_SALES_TAX: Record<string, StateSalesTax> = {
  alabama:      { name: 'Alabama',      abbreviation: 'AL', stateRate: 0.04,   avgLocalRate: 0.0524, combinedRate: 0.0924, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  alaska:       { name: 'Alaska',       abbreviation: 'AK', stateRate: 0,      avgLocalRate: 0.0182, combinedRate: 0.0182, noStateTax: true,  groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: true },
  arizona:      { name: 'Arizona',      abbreviation: 'AZ', stateRate: 0.056,  avgLocalRate: 0.028,  combinedRate: 0.0840, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  arkansas:     { name: 'Arkansas',     abbreviation: 'AR', stateRate: 0.065,  avgLocalRate: 0.0297, combinedRate: 0.0947, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  california:   { name: 'California',   abbreviation: 'CA', stateRate: 0.0725, avgLocalRate: 0.0157, combinedRate: 0.0882, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  colorado:     { name: 'Colorado',     abbreviation: 'CO', stateRate: 0.029,  avgLocalRate: 0.0488, combinedRate: 0.0778, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  connecticut:  { name: 'Connecticut',  abbreviation: 'CT', stateRate: 0.0635, avgLocalRate: 0,      combinedRate: 0.0635, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: true },
  delaware:     { name: 'Delaware',     abbreviation: 'DE', stateRate: 0,      avgLocalRate: 0,      combinedRate: 0,      noStateTax: true,  groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: true },
  florida:      { name: 'Florida',      abbreviation: 'FL', stateRate: 0.06,   avgLocalRate: 0.0102, combinedRate: 0.0702, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  georgia:      { name: 'Georgia',      abbreviation: 'GA', stateRate: 0.04,   avgLocalRate: 0.034,  combinedRate: 0.0740, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  hawaii:       { name: 'Hawaii',       abbreviation: 'HI', stateRate: 0.04,   avgLocalRate: 0.0044, combinedRate: 0.0444, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  idaho:        { name: 'Idaho',        abbreviation: 'ID', stateRate: 0.06,   avgLocalRate: 0.0003, combinedRate: 0.0603, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  illinois:     { name: 'Illinois',     abbreviation: 'IL', stateRate: 0.0625, avgLocalRate: 0.0261, combinedRate: 0.0886, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  indiana:      { name: 'Indiana',      abbreviation: 'IN', stateRate: 0.07,   avgLocalRate: 0,      combinedRate: 0.0700, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  iowa:         { name: 'Iowa',         abbreviation: 'IA', stateRate: 0.06,   avgLocalRate: 0.0094, combinedRate: 0.0694, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  kansas:       { name: 'Kansas',       abbreviation: 'KS', stateRate: 0.065,  avgLocalRate: 0.022,  combinedRate: 0.0870, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  kentucky:     { name: 'Kentucky',     abbreviation: 'KY', stateRate: 0.06,   avgLocalRate: 0,      combinedRate: 0.0600, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  louisiana:    { name: 'Louisiana',    abbreviation: 'LA', stateRate: 0.05,   avgLocalRate: 0.0456, combinedRate: 0.0956, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  maine:        { name: 'Maine',        abbreviation: 'ME', stateRate: 0.055,  avgLocalRate: 0,      combinedRate: 0.0550, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  maryland:     { name: 'Maryland',     abbreviation: 'MD', stateRate: 0.06,   avgLocalRate: 0,      combinedRate: 0.0600, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  massachusetts:{ name: 'Massachusetts',abbreviation: 'MA', stateRate: 0.0625, avgLocalRate: 0,      combinedRate: 0.0625, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: true },
  michigan:     { name: 'Michigan',     abbreviation: 'MI', stateRate: 0.06,   avgLocalRate: 0,      combinedRate: 0.0600, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  minnesota:    { name: 'Minnesota',    abbreviation: 'MN', stateRate: 0.06875,avgLocalRate: 0.00615,combinedRate: 0.0749, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: true },
  mississippi:  { name: 'Mississippi',  abbreviation: 'MS', stateRate: 0.07,   avgLocalRate: 0.0007, combinedRate: 0.0707, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  missouri:     { name: 'Missouri',     abbreviation: 'MO', stateRate: 0.04225,avgLocalRate: 0.04065,combinedRate: 0.0829, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  montana:      { name: 'Montana',      abbreviation: 'MT', stateRate: 0,      avgLocalRate: 0,      combinedRate: 0,      noStateTax: true,  groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: true },
  nebraska:     { name: 'Nebraska',     abbreviation: 'NE', stateRate: 0.055,  avgLocalRate: 0.0145, combinedRate: 0.0695, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  nevada:       { name: 'Nevada',       abbreviation: 'NV', stateRate: 0.0685, avgLocalRate: 0.0138, combinedRate: 0.0823, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  newhampshire: { name: 'New Hampshire',abbreviation: 'NH', stateRate: 0,      avgLocalRate: 0,      combinedRate: 0,      noStateTax: true,  groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: true },
  newjersey:    { name: 'New Jersey',   abbreviation: 'NJ', stateRate: 0.06625,avgLocalRate: -0.00025,combinedRate: 0.066, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: true },
  newmexico:    { name: 'New Mexico',   abbreviation: 'NM', stateRate: 0.05125,avgLocalRate: 0.02715,combinedRate: 0.0784, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  newyork:      { name: 'New York',     abbreviation: 'NY', stateRate: 0.04,   avgLocalRate: 0.0452, combinedRate: 0.0852, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: true },
  northcarolina:{ name: 'North Carolina',abbreviation:'NC', stateRate: 0.0475, avgLocalRate: 0.0223, combinedRate: 0.0698, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  northdakota:  { name: 'North Dakota', abbreviation: 'ND', stateRate: 0.05,   avgLocalRate: 0.0185, combinedRate: 0.0685, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  ohio:         { name: 'Ohio',         abbreviation: 'OH', stateRate: 0.0575, avgLocalRate: 0.0148, combinedRate: 0.0723, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  oklahoma:     { name: 'Oklahoma',     abbreviation: 'OK', stateRate: 0.045,  avgLocalRate: 0.0437, combinedRate: 0.0887, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  oregon:       { name: 'Oregon',       abbreviation: 'OR', stateRate: 0,      avgLocalRate: 0,      combinedRate: 0,      noStateTax: true,  groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: true },
  pennsylvania: { name: 'Pennsylvania', abbreviation: 'PA', stateRate: 0.06,   avgLocalRate: 0.0034, combinedRate: 0.0634, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: true },
  rhodeisland:  { name: 'Rhode Island', abbreviation: 'RI', stateRate: 0.07,   avgLocalRate: 0,      combinedRate: 0.0700, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  southcarolina:{ name: 'South Carolina',abbreviation:'SC', stateRate: 0.06,   avgLocalRate: 0.0144, combinedRate: 0.0744, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  southdakota:  { name: 'South Dakota', abbreviation: 'SD', stateRate: 0.045,  avgLocalRate: 0.019,  combinedRate: 0.0640, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  tennessee:    { name: 'Tennessee',    abbreviation: 'TN', stateRate: 0.07,   avgLocalRate: 0.0256, combinedRate: 0.0956, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  texas:        { name: 'Texas',        abbreviation: 'TX', stateRate: 0.0625, avgLocalRate: 0.0195, combinedRate: 0.0820, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  utah:         { name: 'Utah',         abbreviation: 'UT', stateRate: 0.061,  avgLocalRate: 0.0109, combinedRate: 0.0719, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  vermont:      { name: 'Vermont',      abbreviation: 'VT', stateRate: 0.06,   avgLocalRate: 0.0036, combinedRate: 0.0636, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  virginia:     { name: 'Virginia',     abbreviation: 'VA', stateRate: 0.043,  avgLocalRate: 0.0145, combinedRate: 0.0575, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  washington:   { name: 'Washington',   abbreviation: 'WA', stateRate: 0.065,  avgLocalRate: 0.0291, combinedRate: 0.0941, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  westvirginia: { name: 'West Virginia',abbreviation: 'WV', stateRate: 0.06,   avgLocalRate: 0.0055, combinedRate: 0.0655, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  wisconsin:    { name: 'Wisconsin',    abbreviation: 'WI', stateRate: 0.05,   avgLocalRate: 0.0046, combinedRate: 0.0546, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  wyoming:      { name: 'Wyoming',      abbreviation: 'WY', stateRate: 0.04,   avgLocalRate: 0.0136, combinedRate: 0.0536, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
};

const STATE_KEYS = Object.keys(STATE_SALES_TAX) as (keyof typeof STATE_SALES_TAX)[];

// ─── Types ───────────────────────────────────────────────────────────────────

interface SalesTaxResult {
  purchasePrice: number;
  stateRate: number;
  localRate: number;
  combinedRate: number;
  stateTax: number;
  localTax: number;
  totalTax: number;
  totalPrice: number;
  stateName: string;
  isExempt: boolean;
  exemptCategory: string;
}

interface ReverseTaxResult {
  budget: number;
  combinedRate: number;
  maxPurchase: number;
  taxAmount: number;
  stateName: string;
}

// ─── Chart Colors ────────────────────────────────────────────────────────────

const CHART_COLORS = {
  purchasePrice: '#10b981', // emerald-500
  stateTax: '#f59e0b',     // amber-500
  localTax: '#f97316',     // orange-500
  totalTax: '#ef4444',     // red-500
};

const BAR_COLORS = {
  highest: '#ef4444',
  lowest: '#10b981',
};

// ─── Custom Tooltips ─────────────────────────────────────────────────────────

interface TooltipPayload {
  name: string;
  value: number;
  payload: { name: string; value: number; fill: string; percent?: number };
}

function PieCustomTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayload[] }) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="rounded-lg border border-border/50 bg-background px-3 py-2 shadow-xl">
      <p className="text-sm font-medium text-foreground">{item.payload.name}</p>
      <p className="text-sm text-muted-foreground">{formatCurrency(item.value)}</p>
      {item.payload.percent !== undefined && (
        <p className="text-xs text-muted-foreground">
          {item.payload.percent.toFixed(1)}% of total
        </p>
      )}
    </div>
  );
}

function BarCustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number; payload: { name: string; rate: number; fill: string } }> }) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="rounded-lg border border-border/50 bg-background px-3 py-2 shadow-xl">
      <p className="text-sm font-medium text-foreground">{item.payload.name}</p>
      <p className="text-sm text-muted-foreground">
        Combined Rate: {item.payload.rate.toFixed(2)}%
      </p>
      <p className="text-sm text-muted-foreground">
        Tax on $1,000: {formatCurrency(1000 * item.payload.rate / 100)}
      </p>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function SalesTaxCalculator() {
  migrateHashUrl();
  const hashParams = useUrlParams();

  // ─── State ───────────────────────────────────────────────────────────────
  const [purchasePrice, setPurchasePrice] = useState<number>(
    () => hashParams.price ? Number(hashParams.price) : 1000
  );
  const [stateKey, setStateKey] = useState<string>(
    () => hashParams.state || 'california'
  );
  const [localRateOverride, setLocalRateOverride] = useState<number>(
    () => hashParams.local ? Number(hashParams.local) : 0
  );
  const [useLocalOverride, setUseLocalOverride] = useState<boolean>(false);
  const [isTaxExempt, setIsTaxExempt] = useState<boolean>(false);
  const [exemptCategory, setExemptCategory] = useState<string>('groceries');

  // Reverse calculator state
  const [budgetAmount, setBudgetAmount] = useState<number>(1100);
  const [reverseStateKey, setReverseStateKey] = useState<string>('california');
  const [reverseResult, setReverseResult] = useState<ReverseTaxResult | null>(null);

  const [hasCalculated, setHasCalculated] = useState(false);
  const [result, setResult] = useState<SalesTaxResult | null>(null);

  const currentState = STATE_SALES_TAX[stateKey];

  // Get effective local rate
  const effectiveLocalRate = useMemo(() => {
    if (useLocalOverride) return localRateOverride / 100;
    return currentState?.avgLocalRate ?? 0;
  }, [useLocalOverride, localRateOverride, currentState]);

  // Get effective combined rate
  const effectiveCombinedRate = useMemo(() => {
    if (isTaxExempt) return 0;
    return (currentState?.stateRate ?? 0) + effectiveLocalRate;
  }, [isTaxExempt, currentState, effectiveLocalRate]);

  // Persist to URL
  useEffect(() => {
    updateUrlState({
      price: purchasePrice,
      state: stateKey,
      local: localRateOverride,
    });
  }, [purchasePrice, stateKey, localRateOverride]);

  // Track usage
  const trackUsage = useCallback(() => {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ calculator: 'sales-tax' }),
    }).catch(() => {});
  }, []);

  // ─── Calculate ──────────────────────────────────────────────────────────

  const handleCalculate = () => {
    if (purchasePrice <= 0) return;

    const stateRate = currentState?.stateRate ?? 0;
    const localRate = effectiveLocalRate;
    const combinedRate = isTaxExempt ? 0 : stateRate + localRate;
    const stateTax = isTaxExempt ? 0 : purchasePrice * stateRate;
    const localTax = isTaxExempt ? 0 : purchasePrice * localRate;
    const totalTax = stateTax + localTax;
    const totalPrice = purchasePrice + totalTax;

    setResult({
      purchasePrice,
      stateRate,
      localRate,
      combinedRate,
      stateTax: roundCurrency(stateTax),
      localTax: roundCurrency(localTax),
      totalTax: roundCurrency(totalTax),
      totalPrice: roundCurrency(totalPrice),
      stateName: currentState?.name ?? stateKey,
      isExempt: isTaxExempt,
      exemptCategory,
    });
    setHasCalculated(true);
    trackUsage();
  };

  const handleReverseCalculate = () => {
    if (budgetAmount <= 0) return;
    const state = STATE_SALES_TAX[reverseStateKey];
    const combinedRate = state?.combinedRate ?? 0;
    const maxPurchase = budgetAmount / (1 + combinedRate);
    const taxAmount = budgetAmount - maxPurchase;
    setReverseResult({
      budget: budgetAmount,
      combinedRate,
      maxPurchase: roundCurrency(maxPurchase),
      taxAmount: roundCurrency(taxAmount),
      stateName: state?.name ?? reverseStateKey,
    });
  };

  // ─── Chart Data ─────────────────────────────────────────────────────────

  const pieData = useMemo(() => {
    if (!result) return [];
    const entries: { name: string; value: number; fill: string; percent: number }[] = [];
    entries.push({
      name: 'Purchase Price',
      value: result.purchasePrice,
      fill: CHART_COLORS.purchasePrice,
      percent: result.totalPrice > 0 ? (result.purchasePrice / result.totalPrice) * 100 : 0,
    });
    if (result.stateTax > 0) {
      entries.push({
        name: 'State Tax',
        value: result.stateTax,
        fill: CHART_COLORS.stateTax,
        percent: result.totalPrice > 0 ? (result.stateTax / result.totalPrice) * 100 : 0,
      });
    }
    if (result.localTax > 0) {
      entries.push({
        name: 'Local Tax',
        value: result.localTax,
        fill: CHART_COLORS.localTax,
        percent: result.totalPrice > 0 ? (result.localTax / result.totalPrice) * 100 : 0,
      });
    }
    return entries;
  }, [result]);

  const top10Highest = useMemo(() => {
    return STATE_KEYS
      .map((key) => ({ key, ...STATE_SALES_TAX[key] }))
      .filter((s) => !s.noStateTax)
      .sort((a, b) => b.combinedRate - a.combinedRate)
      .slice(0, 10)
      .map((s) => ({
        name: s.abbreviation,
        fullName: s.name,
        rate: roundCurrency(s.combinedRate * 100),
        fill: BAR_COLORS.highest,
      }));
  }, []);

  const top10Lowest = useMemo(() => {
    return STATE_KEYS
      .map((key) => ({ key, ...STATE_SALES_TAX[key] }))
      .filter((s) => !s.noStateTax)
      .sort((a, b) => a.combinedRate - b.combinedRate)
      .slice(0, 10)
      .map((s) => ({
        name: s.abbreviation,
        fullName: s.name,
        rate: roundCurrency(s.combinedRate * 100),
        fill: BAR_COLORS.lowest,
      }));
  }, []);

  // ─── Exempt categories for selected state ─────────────────────────────

  const exemptInfo = useMemo(() => {
    if (!currentState) return { groceries: false, drugs: false, clothing: false };
    return {
      groceries: currentState.groceryExempt,
      drugs: currentState.prescriptionDrugExempt,
      clothing: currentState.clothingExempt,
    };
  }, [currentState]);

  const isCategoryExempt = useMemo(() => {
    if (!isTaxExempt) return false;
    if (exemptCategory === 'groceries') return exemptInfo.groceries;
    if (exemptCategory === 'prescription') return exemptInfo.drugs;
    if (exemptCategory === 'clothing') return exemptInfo.clothing;
    return false;
  }, [isTaxExempt, exemptCategory, exemptInfo]);

  // ─── Render ─────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* ─── Page Title ─────────────────────────────────── */}
      <div className="text-center">
        <h2 className="flex items-center justify-center gap-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          <Receipt className="h-8 w-8 text-emerald-400" />
          Sales Tax Calculator
        </h2>
        <p className="mt-2 text-muted-foreground">
          Calculate sales tax for any US state with state + local rate breakdowns. Includes reverse sales tax calculator and tax-exempt item support.
        </p>
      </div>

      {/* ─── Pre-rendered SEO Example ───────────────────── */}
      <div className="rounded-xl border border-border/30 bg-muted/10 p-6" aria-hidden="true">
        <h2 className="text-xl font-bold text-foreground">Sales Tax Example: $1,000 Purchase in California (2026)</h2>
        <div className="mt-3 space-y-1 text-sm text-muted-foreground">
          <p>Purchase Price: $1,000.00</p>
          <p>California State Sales Tax Rate: 7.25%</p>
          <p>Average Local Surtax: 1.57%</p>
          <p>Combined Sales Tax Rate: 8.82%</p>
          <p>State Tax: $72.50 | Local Tax: $15.70 | Total Tax: $88.20</p>
          <p>Total Price (Price + Tax): $1,088.20</p>
          <p>Reverse Calculation: $1,088.20 ÷ 1.0882 = $1,000.00 original price</p>
        </div>
      </div>

      {/* ─── Main Calculator Grid ───────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Left: Form */}
        <div className="space-y-4 lg:col-span-3">
          {/* Purchase & State Selection */}
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calculator className="h-5 w-5 text-emerald-400" />
                Sales Tax Calculator
              </CardTitle>
              <CardDescription>Enter the purchase amount and select a state to calculate sales tax</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Purchase Amount */}
              <div className="space-y-2">
                <Label htmlFor="st-price" className="text-sm font-medium">
                  <span className="flex items-center gap-1.5">
                    <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
                    Purchase Amount
                  </span>
                </Label>
                <div className="relative max-w-xs">
                  <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="st-price"
                    type="number"
                    min={0}
                    step="0.01"
                    value={purchasePrice || ''}
                    onChange={(e) => setPurchasePrice(Number(e.target.value) || 0)}
                    className="pl-9"
                    placeholder="1000"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* State Selector */}
                <div className="space-y-2">
                  <Label htmlFor="st-state" className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                      State
                    </span>
                  </Label>
                  <Select
                    value={stateKey}
                    onValueChange={(v) => {
                      setStateKey(v);
                      setUseLocalOverride(false);
                      setLocalRateOverride(0);
                    }}
                  >
                    <SelectTrigger id="st-state" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-64">
                      {STATE_KEYS.map((key) => {
                        const state = STATE_SALES_TAX[key];
                        return (
                          <SelectItem key={key} value={key}>
                            {state.name} ({state.noStateTax ? '0%' : `${(state.combinedRate * 100).toFixed(2)}%`})
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>

                {/* Local Rate Override */}
                <div className="space-y-2">
                  <Label htmlFor="st-local" className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-amber-400" />
                      City/Local Tax Rate (%)
                    </span>
                  </Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        id="st-local"
                        type="number"
                        min={0}
                        max={15}
                        step="0.01"
                        value={useLocalOverride ? localRateOverride || '' : ((currentState?.avgLocalRate ?? 0) * 100).toFixed(2)}
                        onChange={(e) => {
                          if (useLocalOverride) {
                            setLocalRateOverride(Number(e.target.value) || 0);
                          }
                        }}
                        className="pr-9"
                        placeholder="1.57"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">%</span>
                    </div>
                    <Button
                      variant={useLocalOverride ? 'default' : 'outline'}
                      size="sm"
                      className="shrink-0 text-xs"
                      onClick={() => setUseLocalOverride(!useLocalOverride)}
                    >
                      {useLocalOverride ? 'Avg' : 'Custom'}
                    </Button>
                  </div>
                  {!useLocalOverride && (currentState?.avgLocalRate ?? 0) > 0 && (
                    <p className="text-[11px] text-muted-foreground">
                      Average local rate for {currentState?.name}. Click &quot;Custom&quot; to override.
                    </p>
                  )}
                </div>
              </div>

              <Separator className="bg-border/40" />

              {/* Tax-Exempt Toggle */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  <span className="flex items-center gap-1.5">
                    <Shield className="h-3.5 w-3.5 text-emerald-400" />
                    Tax-Exempt Item?
                  </span>
                </Label>
                <div className="flex items-center gap-3">
                  <Button
                    variant={isTaxExempt ? 'default' : 'outline'}
                    size="sm"
                    className={`text-xs ${isTaxExempt ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : ''}`}
                    onClick={() => setIsTaxExempt(true)}
                  >
                    Yes, exempt
                  </Button>
                  <Button
                    variant={!isTaxExempt ? 'default' : 'outline'}
                    size="sm"
                    className={`text-xs ${!isTaxExempt ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : ''}`}
                    onClick={() => setIsTaxExempt(false)}
                  >
                    No, taxable
                  </Button>
                </div>

                {isTaxExempt && (
                  <div className="space-y-2">
                    <Label htmlFor="st-exempt-cat" className="text-xs text-muted-foreground">
                      Exempt Category
                    </Label>
                    <Select value={exemptCategory} onValueChange={setExemptCategory}>
                      <SelectTrigger id="st-exempt-cat" className="w-full max-w-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="groceries">
                          Groceries {exemptInfo.groceries ? '✓' : '✗'} (in {currentState?.abbreviation})
                        </SelectItem>
                        <SelectItem value="prescription">
                          Prescription Drugs {exemptInfo.drugs ? '✓' : '✗'} (in {currentState?.abbreviation})
                        </SelectItem>
                        <SelectItem value="clothing">
                          Clothing {exemptInfo.clothing ? '✓' : '✗'} (in {currentState?.abbreviation})
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {isCategoryExempt ? (
                      <Badge className="bg-emerald-500/20 text-emerald-400 text-[10px]">
                        {exemptCategory === 'groceries' ? 'Groceries' : exemptCategory === 'prescription' ? 'Prescription drugs' : 'Clothing'} are tax-exempt in {currentState?.name}
                      </Badge>
                    ) : (
                      <Badge className="bg-red-500/20 text-red-400 text-[10px]">
                        {exemptCategory === 'groceries' ? 'Groceries' : exemptCategory === 'prescription' ? 'Prescription drugs' : 'Clothing'} are NOT exempt in {currentState?.name} — tax will apply
                      </Badge>
                    )}
                  </div>
                )}
              </div>

              <Separator className="bg-border/40" />

              {/* Rate Preview */}
              <div className="rounded-lg bg-muted/20 p-3 space-y-2">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Rate Preview</p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">State</p>
                    <p className="text-sm font-bold text-amber-400">{(currentState?.stateRate ?? 0) > 0 ? formatPercent(currentState?.stateRate ?? 0) : '0%'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Local</p>
                    <p className="text-sm font-bold text-orange-400">{formatPercent(effectiveLocalRate)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Combined</p>
                    <p className="text-sm font-bold text-emerald-400">{isTaxExempt && isCategoryExempt ? '0% (exempt)' : formatPercent(effectiveCombinedRate)}</p>
                  </div>
                </div>
              </div>

              {/* Calculate Button */}
              <Button
                onClick={handleCalculate}
                disabled={purchasePrice <= 0}
                className="w-full bg-emerald-600 text-white hover:bg-emerald-700"
                size="lg"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Calculate Sales Tax
              </Button>
            </CardContent>
          </Card>

          {/* ─── Reverse Calculator ──────────────────────── */}
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <ShoppingCart className="h-5 w-5 text-amber-400" />
                Reverse Sales Tax Calculator
              </CardTitle>
              <CardDescription>I have a budget — how much can I spend before tax?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="st-reverse-budget" className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <DollarSign className="h-3.5 w-3.5 text-amber-400" />
                      My Total Budget
                    </span>
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="st-reverse-budget"
                      type="number"
                      min={0}
                      step="0.01"
                      value={budgetAmount || ''}
                      onChange={(e) => setBudgetAmount(Number(e.target.value) || 0)}
                      className="pl-9"
                      placeholder="1100"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="st-reverse-state" className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-amber-400" />
                      State
                    </span>
                  </Label>
                  <Select
                    value={reverseStateKey}
                    onValueChange={setReverseStateKey}
                  >
                    <SelectTrigger id="st-reverse-state" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-64">
                      {STATE_KEYS.map((key) => {
                        const state = STATE_SALES_TAX[key];
                        return (
                          <SelectItem key={key} value={key}>
                            {state.name} ({state.noStateTax ? '0%' : `${(state.combinedRate * 100).toFixed(2)}%`})
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                onClick={handleReverseCalculate}
                disabled={budgetAmount <= 0}
                variant="outline"
                size="sm"
                className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Calculate Max Purchase
              </Button>

              {/* Reverse Result */}
              {reverseResult && (
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="text-center">
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Max Purchase Price
                      </p>
                      <p className="mt-1 text-xl font-bold text-emerald-400">
                        {formatCurrency(reverseResult.maxPurchase)}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Sales Tax
                      </p>
                      <p className="mt-1 text-xl font-bold text-amber-400">
                        {formatCurrency(reverseResult.taxAmount)}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Total Budget
                      </p>
                      <p className="mt-1 text-xl font-bold text-foreground">
                        {formatCurrency(reverseResult.budget)}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    Formula: {formatCurrency(reverseResult.budget)} ÷ (1 + {formatPercent(reverseResult.combinedRate)}) = {formatCurrency(reverseResult.maxPurchase)}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <AdSlot position="after-form" />
        </div>

        {/* Right: State Reference + Tax-Exempt Reference */}
        <div className="lg:col-span-2">
          <Card className="sticky top-20 border-emerald-500/20 bg-card/90 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPin className="h-5 w-5 text-emerald-400" />
                State Sales Tax Rates
              </CardTitle>
              <CardDescription>2026 state + average local combined rates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* No Tax States */}
              <div className="rounded-lg bg-emerald-500/10 p-3">
                <p className="text-xs font-medium uppercase tracking-wider text-emerald-400/80 mb-2">
                  No Sales Tax States
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {STATE_KEYS
                    .filter((key) => STATE_SALES_TAX[key].noStateTax)
                    .map((key) => (
                      <Badge key={key} className="bg-emerald-500/20 text-emerald-400 text-[10px]">
                        {STATE_SALES_TAX[key].abbreviation}
                      </Badge>
                    ))}
                </div>
              </div>

              <Separator className="bg-border/40" />

              {/* Highest Tax States */}
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                  Highest Combined Rates
                </p>
                <div className="space-y-1.5">
                  {top10Highest.slice(0, 5).map((state, idx) => (
                    <div key={state.name} className="flex items-center justify-between text-xs">
                      <span className="text-foreground">
                        <span className="text-red-400 font-medium mr-1">{idx + 1}.</span>
                        {state.fullName}
                      </span>
                      <span className="font-medium text-red-400">{state.rate}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="bg-border/40" />

              {/* Lowest Tax States */}
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                  Lowest Combined Rates (excl. 0%)
                </p>
                <div className="space-y-1.5">
                  {top10Lowest.slice(0, 5).map((state, idx) => (
                    <div key={state.name} className="flex items-center justify-between text-xs">
                      <span className="text-foreground">
                        <span className="text-emerald-400 font-medium mr-1">{idx + 1}.</span>
                        {state.fullName}
                      </span>
                      <span className="font-medium text-emerald-400">{state.rate}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="bg-border/40" />

              {/* Tax-Exempt Reference */}
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                  Clothing Tax-Exempt States
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {STATE_KEYS
                    .filter((key) => STATE_SALES_TAX[key].clothingExempt && !STATE_SALES_TAX[key].noStateTax)
                    .map((key) => (
                      <Badge key={key} className="bg-cyan-500/20 text-cyan-400 text-[10px]">
                        {STATE_SALES_TAX[key].abbreviation}
                      </Badge>
                    ))}
                </div>
                <p className="mt-2 text-[11px] text-muted-foreground">
                  CT, MA, MN, NJ, NY, PA exempt clothing from sales tax
                </p>
              </div>

              <Separator className="bg-border/40" />

              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  Average US combined rate: <strong className="text-foreground">~6.6%</strong>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ─── Results Section ────────────────────────────── */}
      {result && hasCalculated && (
        <div className="space-y-6">
          {/* Hero Results Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-emerald-500/20 bg-emerald-500/5">
              <CardContent className="p-4 text-center">
                <p className="text-xs font-medium uppercase tracking-wider text-emerald-400/80">Purchase Amount</p>
                <p className="mt-1 text-2xl font-bold text-emerald-400">{formatCurrency(result.purchasePrice)}</p>
                <p className="text-xs text-muted-foreground">Before tax</p>
              </CardContent>
            </Card>
            <Card className="border-amber-500/20 bg-amber-500/5">
              <CardContent className="p-4 text-center">
                <p className="text-xs font-medium uppercase tracking-wider text-amber-400/80">Total Sales Tax</p>
                <p className="mt-1 text-2xl font-bold text-amber-400">{formatCurrency(result.totalTax)}</p>
                <p className="text-xs text-muted-foreground">
                  {result.isExempt ? 'Tax-exempt item' : formatPercent(result.combinedRate) + ' rate'}
                </p>
              </CardContent>
            </Card>
            <Card className="border-foreground/20 bg-card/80">
              <CardContent className="p-4 text-center">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Total Cost</p>
                <p className="mt-1 text-2xl font-bold text-foreground">{formatCurrency(result.totalPrice)}</p>
                <p className="text-xs text-muted-foreground">Price + Tax</p>
              </CardContent>
            </Card>
            <Card className="border-emerald-500/20 bg-emerald-500/5">
              <CardContent className="p-4 text-center">
                <p className="text-xs font-medium uppercase tracking-wider text-emerald-400/80">Effective Rate</p>
                <p className="mt-1 text-2xl font-bold text-emerald-400">
                  {result.isExempt ? '0%' : formatPercent(result.combinedRate)}
                </p>
                <p className="text-xs text-muted-foreground">{result.stateName}</p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Breakdown + Pie Chart */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Breakdown */}
            <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Receipt className="h-5 w-5 text-emerald-400" />
                  Tax Breakdown
                </CardTitle>
                <CardDescription>
                  Detailed sales tax calculation for {result.stateName}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted-foreground">Purchase Amount</span>
                    <span className="text-sm font-medium text-foreground">{formatCurrency(result.purchasePrice)}</span>
                  </div>

                  {!result.isExempt && (
                    <>
                      <div className="flex items-center justify-between py-2">
                        <span className="text-sm text-muted-foreground pl-4">
                          State Tax Rate ({result.stateName})
                        </span>
                        <span className="text-sm font-semibold text-amber-400">{formatPercent(result.stateRate)}</span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <span className="text-sm text-muted-foreground pl-4">
                          State Tax Amount
                        </span>
                        <span className="text-sm font-semibold text-amber-400">{formatCurrency(result.stateTax)}</span>
                      </div>

                      {result.localRate > 0 && (
                        <>
                          <div className="flex items-center justify-between py-2">
                            <span className="text-sm text-muted-foreground pl-4">
                              Local/City Tax Rate
                            </span>
                            <span className="text-sm font-semibold text-orange-400">{formatPercent(result.localRate)}</span>
                          </div>
                          <div className="flex items-center justify-between py-2">
                            <span className="text-sm text-muted-foreground pl-4">
                              Local Tax Amount
                            </span>
                            <span className="text-sm font-semibold text-orange-400">{formatCurrency(result.localTax)}</span>
                          </div>
                        </>
                      )}
                    </>
                  )}

                  {result.isExempt && (
                    <div className="rounded-lg bg-emerald-500/10 p-3">
                      <p className="text-sm font-medium text-emerald-400">
                        Tax-Exempt: {result.exemptCategory === 'groceries' ? 'Groceries' : result.exemptCategory === 'prescription' ? 'Prescription Drugs' : 'Clothing'}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        This item category is exempt from sales tax in {result.stateName}
                      </p>
                    </div>
                  )}

                  <Separator className="bg-border/30" />

                  {!result.isExempt && (
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm font-medium text-muted-foreground">Total Sales Tax</span>
                      <span className="text-sm font-bold text-red-400">{formatCurrency(result.totalTax)}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm font-bold text-emerald-400">Total Cost</span>
                    <span className="text-lg font-bold text-emerald-400">{formatCurrency(result.totalPrice)}</span>
                  </div>
                </div>

                <Separator className="my-4 bg-emerald-500/30" />

                {/* Formula */}
                <div className="rounded-lg bg-muted/20 p-3 space-y-2">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Calculation Formula</p>
                  {!result.isExempt ? (
                    <>
                      <p className="text-xs text-muted-foreground">
                        <strong className="text-foreground">State Tax:</strong> {formatCurrency(result.purchasePrice)} × {formatPercent(result.stateRate)} = {formatCurrency(result.stateTax)}
                      </p>
                      {result.localRate > 0 && (
                        <p className="text-xs text-muted-foreground">
                          <strong className="text-foreground">Local Tax:</strong> {formatCurrency(result.purchasePrice)} × {formatPercent(result.localRate)} = {formatCurrency(result.localTax)}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        <strong className="text-foreground">Total Tax:</strong> {formatCurrency(result.stateTax)} + {formatCurrency(result.localTax)} = {formatCurrency(result.totalTax)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        <strong className="text-foreground">Total Cost:</strong> {formatCurrency(result.purchasePrice)} + {formatCurrency(result.totalTax)} = {formatCurrency(result.totalPrice)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        <strong className="text-foreground">Reverse:</strong> {formatCurrency(result.totalPrice)} ÷ (1 + {formatPercent(result.combinedRate)}) = {formatCurrency(result.purchasePrice)}
                      </p>
                    </>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      <strong className="text-foreground">Tax-Exempt:</strong> {formatCurrency(result.purchasePrice)} + $0.00 = {formatCurrency(result.totalPrice)}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Pie Chart */}
            <Card className="border-border/50 bg-card/80">
              <CardHeader>
                <CardTitle className="text-lg">Price Breakdown</CardTitle>
                <CardDescription>Visual breakdown of purchase price vs sales tax</CardDescription>
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
                      <RechartsTooltip content={<PieCustomTooltip />} />
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
          </div>

          {/* ─── State-by-State Comparison Bar Charts ──── */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Top 10 Highest */}
            <Card className="border-border/50 bg-card/80">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-red-400" />
                  Top 10 Highest Sales Tax States
                </CardTitle>
                <CardDescription>Combined state + average local rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full" style={{ minHeight: 320 }}>
                  <ResponsiveContainer width="100%" height={320}>
                    <BarChart data={top10Highest} layout="vertical" margin={{ left: 40, right: 20 }}>
                      <XAxis
                        type="number"
                        tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                        tickFormatter={(v) => `${v}%`}
                      />
                      <YAxis
                        type="category"
                        dataKey="name"
                        tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                        width={35}
                      />
                      <RechartsTooltip content={<BarCustomTooltip />} />
                      <Bar dataKey="rate" radius={[0, 4, 4, 0]} fill="#ef4444">
                        {top10Highest.map((entry, index) => (
                          <Cell key={`bar-high-${index}`} fill={entry.fill} fillOpacity={0.8} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Top 10 Lowest */}
            <Card className="border-border/50 bg-card/80">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingDown className="h-5 w-5 text-emerald-400" />
                  Top 10 Lowest Sales Tax States
                </CardTitle>
                <CardDescription>Combined state + average local rates (excl. 0%)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full" style={{ minHeight: 320 }}>
                  <ResponsiveContainer width="100%" height={320}>
                    <BarChart data={top10Lowest} layout="vertical" margin={{ left: 40, right: 20 }}>
                      <XAxis
                        type="number"
                        tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                        tickFormatter={(v) => `${v}%`}
                      />
                      <YAxis
                        type="category"
                        dataKey="name"
                        tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                        width={35}
                      />
                      <RechartsTooltip content={<BarCustomTooltip />} />
                      <Bar dataKey="rate" radius={[0, 4, 4, 0]} fill="#10b981">
                        {top10Lowest.map((entry, index) => (
                          <Cell key={`bar-low-${index}`} fill={entry.fill} fillOpacity={0.8} />
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
          <CardTitle className="text-lg">Understanding Sales Tax in 2026</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground">What is sales tax?</strong> Sales tax is a consumption tax
            imposed by state and local governments on the sale of goods and certain services. The tax is
            calculated as a percentage of the purchase price and is typically collected by the retailer
            at the point of sale. The rate you pay is the combined rate of the state base rate plus any
            local (county, city, special district) taxes.
          </p>
          <p>
            <strong className="text-foreground">State vs local sales tax:</strong> State sales tax is set
            by the state government and applies uniformly across the state. Local sales tax is added on top
            by counties, cities, and special districts — which is why the same purchase can cost different
            amounts depending on where you are within a state. For example, Texas has a 6.25% state rate
            but the average combined rate is 8.20% due to local add-ons. The &quot;combined rate&quot; is what you
            actually pay at the register.
          </p>
          <p>
            <strong className="text-foreground">Tax-exempt items:</strong> Many states exempt certain
            necessities from sales tax. Groceries are exempt in most states, though some (like Mississippi)
            tax them at the full rate. Prescription drugs are exempt nearly everywhere. A few states —
            <strong> Connecticut, Massachusetts, Minnesota, New Jersey, New York, and Pennsylvania</strong> —
            also exempt clothing purchases from sales tax, up to certain price thresholds.
          </p>
          <p>
            <strong className="text-foreground">Reverse sales tax calculation:</strong> If you know the total
            price including tax and need to find the original price before tax, divide the total by
            (1 + tax rate). For example, a $1,088.20 total with 8.82% tax = $1,088.20 ÷ 1.0882 = $1,000.00
            original price. This is useful for expense reporting and budgeting.
          </p>
          <p>
            <strong className="text-foreground">No sales tax states:</strong> Delaware, Montana, New Hampshire,
            and Oregon charge 0% state sales tax. However, some local jurisdictions in these states may have
            niche taxes on specific items like lodging or prepared food. Alaska has no state sales tax but
            allows local taxes, resulting in a low average combined rate of 1.82%.
          </p>
          <p>
            <strong className="text-foreground">Online purchases and sales tax:</strong> Following the 2018
            Supreme Court decision in South Dakota v. Wayfair, states can require online retailers to collect
            sales tax even if they don&apos;t have a physical presence in the state. This means most online
            purchases now include sales tax based on the buyer&apos;s location.
          </p>
        </CardContent>
      </Card>

      <FAQSection title="Sales Tax FAQ — 2026 Rates, Rules & Calculations" faqs={SALES_TAX_FAQS} />

      {/* ─── Internal Links ─────────────────────────────── */}
      <Card className="border-border/50 bg-card/80">
        <CardHeader>
          <CardTitle className="text-lg">Related Tax Calculators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: 'Paycheck Calculator', href: '/paycheck-calculator' },
              { label: 'Tax Refund Calculator', href: '/tax-refund-calculator' },
              { label: 'Capital Gains Calculator', href: '/capital-gains-calculator' },
              { label: 'Self-Employment Calculator', href: '/self-employment-calculator' },
              { label: 'Mortgage Calculator', href: '/mortgage-calculator' },
              { label: 'State Comparison', href: '/compare' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 rounded-lg border border-border/30 bg-muted/20 p-3 text-sm text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground"
              >
                <Receipt className="h-4 w-4 text-emerald-400" />
                {link.label}
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
