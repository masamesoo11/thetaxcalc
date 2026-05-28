'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import {
  Calculator,
  DollarSign,
  Percent,
  Info,
  BarChart3,
  ArrowRight,
  ArrowLeftRight,
  Receipt,
  MapPin,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
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
import { FAQSection, SALES_TAX_FAQS } from './faq-sections';
import {
  formatCurrency,
  formatPercent,
  roundCurrency,
} from '@/lib/finance-utils';
import { useUrlParams, updateUrlState, migrateHashUrl } from '@/hooks/use-url-state';

// ─── US State Sales Tax Data (Average Combined Rates) ────────────────────────

interface StateSalesTax {
  name: string;
  abbreviation: string;
  combinedRate: number; // Average combined state + local rate as decimal
  noStateTax: boolean;
}

const STATE_SALES_TAX: Record<string, StateSalesTax> = {
  alabama: { name: 'Alabama', abbreviation: 'AL', combinedRate: 0.0924, noStateTax: false },
  alaska: { name: 'Alaska', abbreviation: 'AK', combinedRate: 0.0182, noStateTax: false },
  arizona: { name: 'Arizona', abbreviation: 'AZ', combinedRate: 0.0840, noStateTax: false },
  arkansas: { name: 'Arkansas', abbreviation: 'AR', combinedRate: 0.0947, noStateTax: false },
  california: { name: 'California', abbreviation: 'CA', combinedRate: 0.0882, noStateTax: false },
  colorado: { name: 'Colorado', abbreviation: 'CO', combinedRate: 0.0778, noStateTax: false },
  connecticut: { name: 'Connecticut', abbreviation: 'CT', combinedRate: 0.0635, noStateTax: false },
  delaware: { name: 'Delaware', abbreviation: 'DE', combinedRate: 0, noStateTax: true },
  florida: { name: 'Florida', abbreviation: 'FL', combinedRate: 0.0702, noStateTax: false },
  georgia: { name: 'Georgia', abbreviation: 'GA', combinedRate: 0.0740, noStateTax: false },
  hawaii: { name: 'Hawaii', abbreviation: 'HI', combinedRate: 0.0444, noStateTax: false },
  idaho: { name: 'Idaho', abbreviation: 'ID', combinedRate: 0.0603, noStateTax: false },
  illinois: { name: 'Illinois', abbreviation: 'IL', combinedRate: 0.0886, noStateTax: false },
  indiana: { name: 'Indiana', abbreviation: 'IN', combinedRate: 0.0700, noStateTax: false },
  iowa: { name: 'Iowa', abbreviation: 'IA', combinedRate: 0.0694, noStateTax: false },
  kansas: { name: 'Kansas', abbreviation: 'KS', combinedRate: 0.0870, noStateTax: false },
  kentucky: { name: 'Kentucky', abbreviation: 'KY', combinedRate: 0.0600, noStateTax: false },
  louisiana: { name: 'Louisiana', abbreviation: 'LA', combinedRate: 0.0956, noStateTax: false },
  maine: { name: 'Maine', abbreviation: 'ME', combinedRate: 0.0550, noStateTax: false },
  maryland: { name: 'Maryland', abbreviation: 'MD', combinedRate: 0.0600, noStateTax: false },
  massachusetts: { name: 'Massachusetts', abbreviation: 'MA', combinedRate: 0.0625, noStateTax: false },
  michigan: { name: 'Michigan', abbreviation: 'MI', combinedRate: 0.0600, noStateTax: false },
  minnesota: { name: 'Minnesota', abbreviation: 'MN', combinedRate: 0.0749, noStateTax: false },
  mississippi: { name: 'Mississippi', abbreviation: 'MS', combinedRate: 0.0707, noStateTax: false },
  missouri: { name: 'Missouri', abbreviation: 'MO', combinedRate: 0.0829, noStateTax: false },
  montana: { name: 'Montana', abbreviation: 'MT', combinedRate: 0, noStateTax: true },
  nebraska: { name: 'Nebraska', abbreviation: 'NE', combinedRate: 0.0695, noStateTax: false },
  nevada: { name: 'Nevada', abbreviation: 'NV', combinedRate: 0.0823, noStateTax: false },
  newhampshire: { name: 'New Hampshire', abbreviation: 'NH', combinedRate: 0, noStateTax: true },
  newjersey: { name: 'New Jersey', abbreviation: 'NJ', combinedRate: 0.0660, noStateTax: false },
  newmexico: { name: 'New Mexico', abbreviation: 'NM', combinedRate: 0.0784, noStateTax: false },
  newyork: { name: 'New York', abbreviation: 'NY', combinedRate: 0.0852, noStateTax: false },
  northcarolina: { name: 'North Carolina', abbreviation: 'NC', combinedRate: 0.0698, noStateTax: false },
  northdakota: { name: 'North Dakota', abbreviation: 'ND', combinedRate: 0.0685, noStateTax: false },
  ohio: { name: 'Ohio', abbreviation: 'OH', combinedRate: 0.0723, noStateTax: false },
  oklahoma: { name: 'Oklahoma', abbreviation: 'OK', combinedRate: 0.0887, noStateTax: false },
  oregon: { name: 'Oregon', abbreviation: 'OR', combinedRate: 0, noStateTax: true },
  pennsylvania: { name: 'Pennsylvania', abbreviation: 'PA', combinedRate: 0.0634, noStateTax: false },
  rhodeisland: { name: 'Rhode Island', abbreviation: 'RI', combinedRate: 0.0700, noStateTax: false },
  southcarolina: { name: 'South Carolina', abbreviation: 'SC', combinedRate: 0.0744, noStateTax: false },
  southdakota: { name: 'South Dakota', abbreviation: 'SD', combinedRate: 0.0640, noStateTax: false },
  tennessee: { name: 'Tennessee', abbreviation: 'TN', combinedRate: 0.0956, noStateTax: false },
  texas: { name: 'Texas', abbreviation: 'TX', combinedRate: 0.0820, noStateTax: false },
  utah: { name: 'Utah', abbreviation: 'UT', combinedRate: 0.0719, noStateTax: false },
  vermont: { name: 'Vermont', abbreviation: 'VT', combinedRate: 0.0636, noStateTax: false },
  virginia: { name: 'Virginia', abbreviation: 'VA', combinedRate: 0.0575, noStateTax: false },
  washington: { name: 'Washington', abbreviation: 'WA', combinedRate: 0.0941, noStateTax: false },
  westvirginia: { name: 'West Virginia', abbreviation: 'WV', combinedRate: 0.0655, noStateTax: false },
  wisconsin: { name: 'Wisconsin', abbreviation: 'WI', combinedRate: 0.0546, noStateTax: false },
  wyoming: { name: 'Wyoming', abbreviation: 'WY', combinedRate: 0.0536, noStateTax: false },
};

const STATE_KEYS = Object.keys(STATE_SALES_TAX) as (keyof typeof STATE_SALES_TAX)[];

// ─── Calculation Types ───────────────────────────────────────────────────────

interface SalesTaxResult {
  purchasePrice: number;
  taxRate: number;
  taxAmount: number;
  totalPrice: number;
  stateName: string;
}

interface ReverseTaxResult {
  totalPrice: number;
  taxRate: number;
  originalPrice: number;
  taxAmount: number;
  stateName: string;
}

// ─── Chart Colors ────────────────────────────────────────────────────────────

const CHART_COLORS = {
  purchasePrice: '#10b981', // emerald-500
  taxAmount: '#f59e0b',     // amber-500
};

// ─── Custom Tooltip ──────────────────────────────────────────────────────────

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

// ─── Main Component ──────────────────────────────────────────────────────────

export function SalesTaxCalculator() {
  migrateHashUrl();
  const hashParams = useUrlParams();

  const [purchasePrice, setPurchasePrice] = useState<number>(
    () => hashParams.price ? Number(hashParams.price) : 100
  );
  const [stateKey, setStateKey] = useState<string>(
    () => hashParams.state || 'california'
  );
  const [customRate, setCustomRate] = useState<number>(
    () => hashParams.rate ? Number(hashParams.rate) : 0
  );
  const [useCustomRate, setUseCustomRate] = useState<boolean>(
    () => hashParams.custom === '1' ? true : false
  );

  // Reverse calculator state
  const [totalPriceInput, setTotalPriceInput] = useState<number>(0);
  const [reverseStateKey, setReverseStateKey] = useState<string>('california');
  const [reverseCustomRate, setReverseCustomRate] = useState<number>(0);
  const [useReverseCustomRate, setUseReverseCustomRate] = useState<boolean>(false);
  const [reverseResult, setReverseResult] = useState<ReverseTaxResult | null>(null);

  const [hasCalculated, setHasCalculated] = useState(false);
  const [result, setResult] = useState<SalesTaxResult | null>(null);

  // Get effective rate
  const effectiveRate = useMemo(() => {
    if (useCustomRate) return customRate / 100;
    return STATE_SALES_TAX[stateKey]?.combinedRate ?? 0;
  }, [useCustomRate, customRate, stateKey]);

  const currentState = STATE_SALES_TAX[stateKey];

  // Persist to hash
  useEffect(() => {
    updateUrlState({
      price: purchasePrice,
      state: stateKey,
      rate: customRate,
      custom: useCustomRate ? '1' : '',
    });
  }, [purchasePrice, stateKey, customRate, useCustomRate]);

  // Track usage
  const trackUsage = useCallback(() => {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ calculator: 'sales-tax' }),
    }).catch(() => {});
  }, []);

  const handleCalculate = () => {
    if (purchasePrice <= 0) return;
    const rate = useCustomRate ? customRate / 100 : (STATE_SALES_TAX[stateKey]?.combinedRate ?? 0);
    const taxAmount = purchasePrice * rate;
    const totalPrice = purchasePrice + taxAmount;
    setResult({
      purchasePrice,
      taxRate: rate,
      taxAmount: roundCurrency(taxAmount),
      totalPrice: roundCurrency(totalPrice),
      stateName: useCustomRate ? 'Custom Rate' : (STATE_SALES_TAX[stateKey]?.name ?? stateKey),
    });
    setHasCalculated(true);
    trackUsage();
  };

  const handleReverseCalculate = () => {
    if (totalPriceInput <= 0) return;
    const rate = useReverseCustomRate ? reverseCustomRate / 100 : (STATE_SALES_TAX[reverseStateKey]?.combinedRate ?? 0);
    const originalPrice = totalPriceInput / (1 + rate);
    const taxAmount = totalPriceInput - originalPrice;
    setReverseResult({
      totalPrice: totalPriceInput,
      taxRate: rate,
      originalPrice: roundCurrency(originalPrice),
      taxAmount: roundCurrency(taxAmount),
      stateName: useReverseCustomRate ? 'Custom Rate' : (STATE_SALES_TAX[reverseStateKey]?.name ?? reverseStateKey),
    });
  };

  // Pie chart data
  const pieData = useMemo(() => {
    if (!result) return [];
    const entries = [
      { name: 'Purchase Price', value: result.purchasePrice, fill: CHART_COLORS.purchasePrice },
      { name: 'Sales Tax', value: result.taxAmount, fill: CHART_COLORS.taxAmount },
    ];
    return entries.filter((e) => e.value > 0);
  }, [result]);

  // Sorted states for comparison display
  const highestTaxStates = useMemo(() => {
    return STATE_KEYS
      .map((key) => ({ key, ...STATE_SALES_TAX[key] }))
      .filter((s) => !s.noStateTax)
      .sort((a, b) => b.combinedRate - a.combinedRate)
      .slice(0, 5);
  }, []);

  const lowestTaxStates = useMemo(() => {
    return STATE_KEYS
      .map((key) => ({ key, ...STATE_SALES_TAX[key] }))
      .filter((s) => !s.noStateTax)
      .sort((a, b) => a.combinedRate - b.combinedRate)
      .slice(0, 5);
  }, []);

  return (
    <div className="space-y-6">
      {/* ─── Page Title ─────────────────────────────────── */}
      <div className="text-center">
        <h1 className="flex items-center justify-center gap-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          <Receipt className="h-8 w-8 text-emerald-400" />
          Sales Tax Calculator
        </h1>
        <p className="mt-2 text-muted-foreground">
          Calculate sales tax for any US state with combined rates. Includes reverse sales tax calculator.
        </p>
      </div>

      {/* ─── Info Card ──────────────────────────────────── */}
      <Card className="border-emerald-500/20 bg-emerald-500/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">How Sales Tax Works</p>
              <p>
                Sales tax is calculated by multiplying the purchase price by the combined tax rate
                (state + local). Four states — <strong>Delaware, Montana, New Hampshire, and Oregon</strong> —
                charge 0% state sales tax. The combined rate includes both the state base rate and average
                local rates, giving you the rate you&apos;ll actually pay at the register.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ─── Pre-rendered SEO Example ───────────────────── */}
      <div className="rounded-xl border border-border/30 bg-muted/10 p-6" aria-hidden="true">
        <h2 className="text-xl font-bold text-foreground">Sales Tax Example: $100 Purchase in California (2026)</h2>
        <div className="mt-3 space-y-1 text-sm text-muted-foreground">
          <p>Purchase Price: $100.00</p>
          <p>California Combined Sales Tax Rate: 8.82%</p>
          <p>Sales Tax Amount: $8.82</p>
          <p>Total Price (Price + Tax): $108.82</p>
          <p>Reverse Calculation: $108.82 ÷ 1.0882 = $100.00 original price</p>
        </div>
      </div>

      {/* ─── Main Calculator ────────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-3">
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calculator className="h-5 w-5 text-emerald-400" />
                Sales Tax Calculator
              </CardTitle>
              <CardDescription>Enter the purchase price and select a state to calculate sales tax</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Purchase Price */}
              <div className="space-y-2">
                <Label htmlFor="st-price" className="text-sm font-medium">
                  <span className="flex items-center gap-1.5">
                    <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
                    Purchase Price
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
                    placeholder="100"
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
                      setUseCustomRate(false);
                    }}
                    disabled={useCustomRate}
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

                {/* Custom Rate Toggle + Input */}
                <div className="space-y-2">
                  <Label htmlFor="st-rate" className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <Percent className="h-3.5 w-3.5 text-emerald-400" />
                      Sales Tax Rate
                    </span>
                  </Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        id="st-rate"
                        type="number"
                        min={0}
                        max={100}
                        step="0.01"
                        value={useCustomRate ? customRate || '' : ((effectiveRate * 100).toFixed(2))}
                        onChange={(e) => {
                          if (useCustomRate) {
                            setCustomRate(Number(e.target.value) || 0);
                          }
                        }}
                        className="pr-9"
                        placeholder="8.25"
                      />
                      <Percent className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    </div>
                    <Button
                      variant={useCustomRate ? 'default' : 'outline'}
                      size="sm"
                      className="shrink-0 text-xs"
                      onClick={() => setUseCustomRate(!useCustomRate)}
                    >
                      {useCustomRate ? 'Use State' : 'Custom'}
                    </Button>
                  </div>
                  {currentState?.noStateTax && !useCustomRate && (
                    <Badge className="bg-emerald-500/20 text-emerald-400 text-[10px]">
                      No sales tax state
                    </Badge>
                  )}
                </div>
              </div>

              <Separator className="bg-border/40" />

              {/* Calculate Button */}
              <Button
                onClick={handleCalculate}
                disabled={purchasePrice <= 0}
                className="w-full bg-emerald-600 text-white hover:bg-emerald-700 sm:w-auto"
                size="lg"
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Calculate Sales Tax
              </Button>
            </CardContent>
          </Card>

          {/* ─── Reverse Calculator ──────────────────────── */}
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <ArrowLeftRight className="h-5 w-5 text-amber-400" />
                Reverse Sales Tax Calculator
              </CardTitle>
              <CardDescription>Enter the total price to find the original price before tax</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="st-reverse-total" className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <DollarSign className="h-3.5 w-3.5 text-amber-400" />
                      Total Price (with tax)
                    </span>
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="st-reverse-total"
                      type="number"
                      min={0}
                      step="0.01"
                      value={totalPriceInput || ''}
                      onChange={(e) => setTotalPriceInput(Number(e.target.value) || 0)}
                      className="pl-9"
                      placeholder="108.82"
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
                  <div className="flex gap-2">
                    <Select
                      value={reverseStateKey}
                      onValueChange={(v) => {
                        setReverseStateKey(v);
                        setUseReverseCustomRate(false);
                      }}
                      disabled={useReverseCustomRate}
                    >
                      <SelectTrigger id="st-reverse-state" className="flex-1">
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
              </div>

              {useReverseCustomRate && (
                <div className="space-y-2">
                  <Label htmlFor="st-reverse-rate" className="text-sm font-medium">Custom Tax Rate (%)</Label>
                  <div className="relative max-w-xs">
                    <Input
                      id="st-reverse-rate"
                      type="number"
                      min={0}
                      max={100}
                      step="0.01"
                      value={reverseCustomRate || ''}
                      onChange={(e) => setReverseCustomRate(Number(e.target.value) || 0)}
                      placeholder="8.25"
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  onClick={handleReverseCalculate}
                  disabled={totalPriceInput <= 0}
                  variant="outline"
                  size="sm"
                  className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
                >
                  <ArrowLeftRight className="mr-2 h-4 w-4" />
                  Calculate Original Price
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-muted-foreground"
                  onClick={() => setUseReverseCustomRate(!useReverseCustomRate)}
                >
                  {useReverseCustomRate ? 'Use State Rate' : 'Custom Rate'}
                </Button>
              </div>

              {/* Reverse Result */}
              {reverseResult && (
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="text-center">
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Original Price
                      </p>
                      <p className="mt-1 text-xl font-bold text-emerald-400">
                        {formatCurrency(reverseResult.originalPrice)}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Tax Amount
                      </p>
                      <p className="mt-1 text-xl font-bold text-amber-400">
                        {formatCurrency(reverseResult.taxAmount)}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Total Price
                      </p>
                      <p className="mt-1 text-xl font-bold text-foreground">
                        {formatCurrency(reverseResult.totalPrice)}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    Formula: {formatCurrency(reverseResult.totalPrice)} ÷ (1 + {formatPercent(reverseResult.taxRate)}) = {formatCurrency(reverseResult.originalPrice)}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <AdSlot position="after-form" />
        </div>

        {/* ─── Right Side: State Reference ─────────────────── */}
        <div className="lg:col-span-2">
          <Card className="sticky top-20 border-emerald-500/20 bg-card/90 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPin className="h-5 w-5 text-emerald-400" />
                State Sales Tax Rates
              </CardTitle>
              <CardDescription>Average combined (state + local) rates for 2026</CardDescription>
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
                  {highestTaxStates.map((state, idx) => (
                    <div key={state.key} className="flex items-center justify-between text-xs">
                      <span className="text-foreground">
                        <span className="text-red-400 font-medium mr-1">{idx + 1}.</span>
                        {state.name}
                      </span>
                      <span className="font-medium text-red-400">{(state.combinedRate * 100).toFixed(2)}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="bg-border/40" />

              {/* Lowest Tax States */}
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                  Lowest Combined Rates (excluding 0%)
                </p>
                <div className="space-y-1.5">
                  {lowestTaxStates.map((state, idx) => (
                    <div key={state.key} className="flex items-center justify-between text-xs">
                      <span className="text-foreground">
                        <span className="text-emerald-400 font-medium mr-1">{idx + 1}.</span>
                        {state.name}
                      </span>
                      <span className="font-medium text-emerald-400">{(state.combinedRate * 100).toFixed(2)}%</span>
                    </div>
                  ))}
                </div>
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
                <p className="text-xs font-medium uppercase tracking-wider text-emerald-400/80">Purchase Price</p>
                <p className="mt-1 text-2xl font-bold text-emerald-400">{formatCurrency(result.purchasePrice)}</p>
                <p className="text-xs text-muted-foreground">Before tax</p>
              </CardContent>
            </Card>
            <Card className="border-amber-500/20 bg-amber-500/5">
              <CardContent className="p-4 text-center">
                <p className="text-xs font-medium uppercase tracking-wider text-amber-400/80">Sales Tax</p>
                <p className="mt-1 text-2xl font-bold text-amber-400">{formatCurrency(result.taxAmount)}</p>
                <p className="text-xs text-muted-foreground">{formatPercent(result.taxRate)} rate</p>
              </CardContent>
            </Card>
            <Card className="border-foreground/20 bg-card/80">
              <CardContent className="p-4 text-center">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Total Price</p>
                <p className="mt-1 text-2xl font-bold text-foreground">{formatCurrency(result.totalPrice)}</p>
                <p className="text-xs text-muted-foreground">Price + Tax</p>
              </CardContent>
            </Card>
            <Card className="border-emerald-500/20 bg-emerald-500/5">
              <CardContent className="p-4 text-center">
                <p className="text-xs font-medium uppercase tracking-wider text-emerald-400/80">Effective Rate</p>
                <p className="mt-1 text-2xl font-bold text-emerald-400">{formatPercent(result.taxRate)}</p>
                <p className="text-xs text-muted-foreground">{result.stateName}</p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Breakdown + Chart */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Breakdown */}
            <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BarChart3 className="h-5 w-5 text-emerald-400" />
                  Tax Breakdown
                </CardTitle>
                <CardDescription>
                  Detailed sales tax calculation for {result.stateName}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted-foreground">Purchase Price</span>
                    <span className="text-sm font-medium text-foreground">{formatCurrency(result.purchasePrice)}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted-foreground pl-4">
                      Sales Tax Rate ({result.stateName})
                    </span>
                    <span className="text-sm font-semibold text-amber-400">{formatPercent(result.taxRate)}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted-foreground pl-4">Tax Amount</span>
                    <span className="text-sm font-semibold text-amber-400">{formatCurrency(result.taxAmount)}</span>
                  </div>
                  <Separator className="bg-border/30" />
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm font-bold text-emerald-400">Total Price</span>
                    <span className="text-lg font-bold text-emerald-400">{formatCurrency(result.totalPrice)}</span>
                  </div>
                </div>

                <Separator className="my-4 bg-emerald-500/30" />

                {/* Formula */}
                <div className="rounded-lg bg-muted/20 p-3 space-y-2">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Calculation Formula</p>
                  <p className="text-xs text-muted-foreground">
                    <strong className="text-foreground">Tax:</strong> {formatCurrency(result.purchasePrice)} × {formatPercent(result.taxRate)} = {formatCurrency(result.taxAmount)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    <strong className="text-foreground">Total:</strong> {formatCurrency(result.purchasePrice)} + {formatCurrency(result.taxAmount)} = {formatCurrency(result.totalPrice)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    <strong className="text-foreground">Reverse:</strong> {formatCurrency(result.totalPrice)} ÷ (1 + {formatPercent(result.taxRate)}) = {formatCurrency(result.purchasePrice)}
                  </p>
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
            amounts depending on where you are within a state. The &quot;combined rate&quot; is what you actually
            pay at the register.
          </p>
          <p>
            <strong className="text-foreground">Reverse sales tax calculation:</strong> If you know the total
            price including tax and need to find the original price before tax, divide the total by
            (1 + tax rate). For example, a $108.25 total with 8.25% tax = $108.25 ÷ 1.0825 = $100.00
            original price. This is useful for expense reporting and accounting.
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
              { href: '/paycheck-calculator', label: 'Paycheck Calculator', desc: 'Calculate your take-home pay after all taxes' },
              { href: '/self-employment-tax-calculator', label: 'Self-Employment Tax', desc: 'Estimate your SE tax and quarterly payments' },
              { href: '/capital-gains-calculator', label: 'Capital Gains Tax', desc: 'Calculate tax on investment gains' },
              { href: '/relocation-calculator', label: 'Salary Relocation Calculator', desc: 'Compare take-home pay across states' },
              { href: '/mortgage-calculator', label: 'Mortgage Calculator', desc: 'Calculate monthly payments and amortization' },
              { href: '/401k-retirement-calculator', label: '401(k) Retirement Projection', desc: 'Project your retirement savings growth' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex items-start gap-2 rounded-lg border border-border/50 bg-muted/20 p-3 text-left transition-colors hover:border-emerald-500/30 hover:bg-emerald-500/5"
              >
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <div>
                  <p className="text-sm font-medium text-foreground">{link.label}</p>
                  <p className="text-xs text-muted-foreground">{link.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>

      <AdSlot position="mid-content" />
    </div>
  );
}
