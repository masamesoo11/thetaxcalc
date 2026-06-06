'use client';

import { useEffect, useMemo, useState, useRef } from 'react';
import {
  Calculator,
  DollarSign,
  Home,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
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
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
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
import { PROPERTY_TAX_FAQS } from '@/lib/faq-data';
import { formatCurrency, roundCurrency } from '@/lib/finance-utils';
import { useUrlParams, updateUrlState, migrateHashUrl } from '@/hooks/use-url-state';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatPercent(value: number): string {
  return (value * 100).toFixed(2) + '%';
}

// ─── US State Property Tax Rates (2026) ──────────────────────────────────────

const STATE_PROPERTY_TAX_RATES: Record<string, { rate: number; name: string; notes: string }> = {
  alabama: { rate: 0.0041, name: 'Alabama', notes: 'Low property tax' },
  alaska: { rate: 0.0113, name: 'Alaska', notes: '' },
  arizona: { rate: 0.0063, name: 'Arizona', notes: '' },
  arkansas: { rate: 0.0062, name: 'Arkansas', notes: '' },
  california: { rate: 0.0071, name: 'California', notes: 'Prop 13 caps assessment increases at 2%/year' },
  colorado: { rate: 0.0055, name: 'Colorado', notes: '' },
  connecticut: { rate: 0.0198, name: 'Connecticut', notes: 'Among highest' },
  delaware: { rate: 0.0057, name: 'Delaware', notes: '' },
  florida: { rate: 0.0086, name: 'Florida', notes: 'Homestead Exemption up to $50,000' },
  georgia: { rate: 0.0092, name: 'Georgia', notes: '' },
  hawaii: { rate: 0.0031, name: 'Hawaii', notes: 'Lowest in US' },
  idaho: { rate: 0.0069, name: 'Idaho', notes: '' },
  illinois: { rate: 0.0178, name: 'Illinois', notes: '2nd highest in US' },
  indiana: { rate: 0.0082, name: 'Indiana', notes: '' },
  iowa: { rate: 0.0157, name: 'Iowa', notes: '' },
  kansas: { rate: 0.0141, name: 'Kansas', notes: '' },
  kentucky: { rate: 0.0083, name: 'Kentucky', notes: '' },
  louisiana: { rate: 0.0055, name: 'Louisiana', notes: '' },
  maine: { rate: 0.0127, name: 'Maine', notes: '' },
  maryland: { rate: 0.0101, name: 'Maryland', notes: '' },
  massachusetts: { rate: 0.0124, name: 'Massachusetts', notes: '' },
  michigan: { rate: 0.0138, name: 'Michigan', notes: '' },
  minnesota: { rate: 0.0108, name: 'Minnesota', notes: '' },
  mississippi: { rate: 0.0080, name: 'Mississippi', notes: '' },
  missouri: { rate: 0.0101, name: 'Missouri', notes: '' },
  montana: { rate: 0.0085, name: 'Montana', notes: '' },
  nebraska: { rate: 0.0176, name: 'Nebraska', notes: '' },
  nevada: { rate: 0.0060, name: 'Nevada', notes: '' },
  'new-hampshire': { rate: 0.0206, name: 'New Hampshire', notes: '3rd highest in US' },
  'new-jersey': { rate: 0.0249, name: 'New Jersey', notes: 'Highest in US' },
  'new-mexico': { rate: 0.0080, name: 'New Mexico', notes: '' },
  'new-york': { rate: 0.0162, name: 'New York', notes: '' },
  'north-carolina': { rate: 0.0084, name: 'North Carolina', notes: '' },
  'north-dakota': { rate: 0.0103, name: 'North Dakota', notes: '' },
  ohio: { rate: 0.0136, name: 'Ohio', notes: '' },
  oklahoma: { rate: 0.0090, name: 'Oklahoma', notes: '' },
  oregon: { rate: 0.0097, name: 'Oregon', notes: '' },
  pennsylvania: { rate: 0.0158, name: 'Pennsylvania', notes: '' },
  'rhode-island': { rate: 0.0167, name: 'Rhode Island', notes: '' },
  'south-carolina': { rate: 0.0057, name: 'South Carolina', notes: '' },
  'south-dakota': { rate: 0.0131, name: 'South Dakota', notes: '' },
  tennessee: { rate: 0.0064, name: 'Tennessee', notes: '' },
  texas: { rate: 0.0171, name: 'Texas', notes: '6th highest in US despite no income tax' },
  utah: { rate: 0.0065, name: 'Utah', notes: '' },
  vermont: { rate: 0.0186, name: 'Vermont', notes: '' },
  virginia: { rate: 0.0082, name: 'Virginia', notes: '' },
  washington: { rate: 0.0098, name: 'Washington', notes: '' },
  'west-virginia': { rate: 0.0058, name: 'West Virginia', notes: '' },
  wisconsin: { rate: 0.0173, name: 'Wisconsin', notes: '' },
  wyoming: { rate: 0.0058, name: 'Wyoming', notes: '' },
  dc: { rate: 0.0056, name: 'Washington DC', notes: '' },
};

const STATE_KEYS = Object.keys(STATE_PROPERTY_TAX_RATES) as (keyof typeof STATE_PROPERTY_TAX_RATES)[];

// ─── States with Homestead Exemption ────────────────────────────────────────

interface HomesteadExemption {
  amount: number;
  description: string;
}

const HOMESTEAD_EXEMPTIONS: Record<string, HomesteadExemption> = {
  florida: { amount: 50000, description: 'Up to $50,000 off assessed value ($25K all taxes + $25K non-school taxes)' },
  'south-carolina': { amount: 50000, description: 'Exempts first $50,000 of home value from property tax' },
  colorado: { amount: 55000, description: 'Exempts $55,000 of actual value for seniors 65+' },
  alabama: { amount: 0, description: 'Homestead exemption of $2,000 of assessed value (approx $40K market)' },
  georgia: { amount: 0, description: 'Varies by county — typically $2,000–$15,000 off assessed value' },
  mississippi: { amount: 0, description: 'First $7,500 of assessed value exempt from state tax' },
};

// ─── Types ───────────────────────────────────────────────────────────────────

interface PropertyTaxResult {
  homeValue: number;
  effectiveRate: number;
  annualTax: number;
  monthlyTax: number;
  biweeklyTax: number;
  stateName: string;
  exemptionAmount: number;
  taxableValue: number;
  notes: string;
}

// ─── Chart Colors ────────────────────────────────────────────────────────────

const CHART_COLORS = {
  homeValue: '#10b981', // emerald-500
  propertyTax: '#ef4444', // red-500
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
          {item.payload.percent.toFixed(1)}% of home value
        </p>
      )}
    </div>
  );
}

function BarCustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number; payload: { name: string; fullName: string; rate: number; fill: string } }> }) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="rounded-lg border border-border/50 bg-background px-3 py-2 shadow-xl">
      <p className="text-sm font-medium text-foreground">{item.payload.fullName}</p>
      <p className="text-sm text-muted-foreground">
        Effective Rate: {item.payload.rate.toFixed(2)}%
      </p>
      <p className="text-sm text-muted-foreground">
        Annual Tax on ${formatNumberNoDecimal(350000)} home: {formatCurrency(350000 * item.payload.rate / 100)}
      </p>
    </div>
  );
}

function formatNumberNoDecimal(value: number): string {
  return value.toLocaleString('en-US', { maximumFractionDigits: 0 });
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function PropertyTaxCalculator() {
  migrateHashUrl();
  const hashParams = useUrlParams();

  // ─── State ───────────────────────────────────────────────────────────────
  const [homeValue, setHomeValue] = useState<number>(
    () => hashParams.value ? Number(hashParams.value) : 350000
  );
  const [stateKey, setStateKey] = useState<string>(
    () => hashParams.state || 'illinois'
  );
  const [useHomestead, setUseHomestead] = useState<boolean>(false);
  const [customExemption, setCustomExemption] = useState<number>(0);
  const [useCustomExemption, setUseCustomExemption] = useState<boolean>(false);

  const currentState = STATE_PROPERTY_TAX_RATES[stateKey];
  const homesteadInfo = HOMESTEAD_EXEMPTIONS[stateKey];
  const hasHomestead = !!homesteadInfo;

  // Effective exemption amount
  const effectiveExemption = useMemo(() => {
    if (useCustomExemption && customExemption > 0) return customExemption;
    if (useHomestead && homesteadInfo) return homesteadInfo.amount;
    return 0;
  }, [useHomestead, homesteadInfo, useCustomExemption, customExemption]);

  // Persist to URL
  useEffect(() => {
    updateUrlState({
      value: homeValue,
      state: stateKey,
    });
  }, [homeValue, stateKey]);

  // Track usage (fire once via ref)
  const hasTrackedRef = useRef(false);
  useEffect(() => {
    if (!hasTrackedRef.current) {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ calculator: 'property-tax' }),
      }).catch(() => {});
      hasTrackedRef.current = true;
    }
  }, []);

  // ─── Calculate (reactive) ──────────────────────────────────────────────

  const result = useMemo(() => {
    if (homeValue <= 0 || !currentState) return null;

    const taxableValue = Math.max(0, homeValue - effectiveExemption);
    const annualTax = taxableValue * currentState.rate;
    const monthlyTax = annualTax / 12;
    const biweeklyTax = annualTax / 26;

    return {
      homeValue,
      effectiveRate: currentState.rate,
      annualTax: roundCurrency(annualTax),
      monthlyTax: roundCurrency(monthlyTax),
      biweeklyTax: roundCurrency(biweeklyTax),
      stateName: currentState.name,
      exemptionAmount: effectiveExemption,
      taxableValue: roundCurrency(taxableValue),
      notes: currentState.notes,
    };
  }, [homeValue, currentState, effectiveExemption]);

  const hasCalculated = result !== null;

  const handleCalculate = () => {
    // Calculation is now reactive via useMemo; this is kept for manual recalculate button
  };

  // ─── Chart Data ─────────────────────────────────────────────────────────

  const pieData = useMemo(() => {
    if (!result) return [];
    const entries: { name: string; value: number; fill: string; percent: number }[] = [];
    entries.push({
      name: 'Home Value (after exemptions)',
      value: result.taxableValue,
      fill: CHART_COLORS.homeValue,
      percent: result.homeValue > 0 ? (result.taxableValue / result.homeValue) * 100 : 0,
    });
    if (result.annualTax > 0) {
      entries.push({
        name: 'Annual Property Tax',
        value: result.annualTax,
        fill: CHART_COLORS.propertyTax,
        percent: result.homeValue > 0 ? (result.annualTax / result.homeValue) * 100 : 0,
      });
    }
    return entries;
  }, [result]);

  const top10Highest = useMemo(() => {
    return STATE_KEYS
      .map((key) => ({ key, ...STATE_PROPERTY_TAX_RATES[key] }))
      .sort((a, b) => b.rate - a.rate)
      .slice(0, 10)
      .map((s) => ({
        name: s.name.length > 10 ? s.name.substring(0, 10) + '…' : s.name,
        fullName: s.name,
        rate: roundCurrency(s.rate * 100),
        fill: BAR_COLORS.highest,
      }));
  }, []);

  const top10Lowest = useMemo(() => {
    return STATE_KEYS
      .map((key) => ({ key, ...STATE_PROPERTY_TAX_RATES[key] }))
      .sort((a, b) => a.rate - b.rate)
      .slice(0, 10)
      .map((s) => ({
        name: s.name.length > 10 ? s.name.substring(0, 10) + '…' : s.name,
        fullName: s.name,
        rate: roundCurrency(s.rate * 100),
        fill: BAR_COLORS.lowest,
      }));
  }, []);

  // Comparison data for the same home value across states
  const comparisonData = useMemo(() => {
    if (!result) return null;
    const lowest = STATE_KEYS.reduce((min, key) =>
      STATE_PROPERTY_TAX_RATES[key].rate < STATE_PROPERTY_TAX_RATES[min].rate ? key : min
    , STATE_KEYS[0]);
    const highest = STATE_KEYS.reduce((max, key) =>
      STATE_PROPERTY_TAX_RATES[key].rate > STATE_PROPERTY_TAX_RATES[max].rate ? key : max
    , STATE_KEYS[0]);

    const lowestTax = homeValue * STATE_PROPERTY_TAX_RATES[lowest].rate;
    const highestTax = homeValue * STATE_PROPERTY_TAX_RATES[highest].rate;

    return {
      lowestState: STATE_PROPERTY_TAX_RATES[lowest].name,
      lowestTax: roundCurrency(lowestTax),
      lowestRate: STATE_PROPERTY_TAX_RATES[lowest].rate,
      highestState: STATE_PROPERTY_TAX_RATES[highest].name,
      highestTax: roundCurrency(highestTax),
      highestRate: STATE_PROPERTY_TAX_RATES[highest].rate,
      difference: roundCurrency(highestTax - lowestTax),
    };
  }, [result, homeValue]);

  // ─── Render ─────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* ─── Page Title ─────────────────────────────────── */}
      <div className="text-center">
        <h2 className="flex items-center justify-center gap-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          <Home className="h-8 w-8 text-emerald-400" />
          Property Tax Calculator
        </h2>
        <p className="mt-2 text-muted-foreground">
          Calculate annual and monthly property tax for any US state. Compare rates across all 50 states with average effective property tax rates for 2026.
        </p>
      </div>

      {/* ─── Pre-rendered SEO Example ───────────────────── */}
      <div className="rounded-xl border border-border/30 bg-muted/10 p-6" aria-hidden="true">
        <h2 className="text-xl font-bold text-foreground">Property Tax Example: $350,000 Home in Illinois (2026)</h2>
        <div className="mt-3 space-y-1 text-sm text-muted-foreground">
          <p>Home Value: $350,000.00</p>
          <p>Illinois Average Effective Property Tax Rate: 1.78%</p>
          <p>Annual Property Tax: $6,230.00</p>
          <p>Monthly Property Tax: $519.17</p>
          <p>Bi-weekly Property Tax: $239.62</p>
          <p>Same home in Hawaii (0.31%): $1,085.00/year — saves $5,145.00</p>
          <p>Same home in New Jersey (2.49%): $8,715.00/year — costs $2,485.00 more</p>
        </div>
      </div>

      {/* ─── Main Calculator Grid ───────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Left: Form */}
        <div className="space-y-4 lg:col-span-3">
          {/* Home Value & State Selection */}
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calculator className="h-5 w-5 text-emerald-400" />
                Property Tax Calculator
              </CardTitle>
              <CardDescription>Enter your home value and select a state to calculate property tax</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Home Value */}
              <div className="space-y-2">
                <Label htmlFor="pt-home-value" className="text-sm font-medium">
                  <span className="flex items-center gap-1.5">
                    <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
                    Home Value
                  </span>
                </Label>
                <div className="relative max-w-xs">
                  <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="pt-home-value"
                    type="number"
                    min={0}
                    step={1000}
                    value={homeValue || ''}
                    onChange={(e) => setHomeValue(Number(e.target.value) || 0)}
                    className="pl-9"
                    placeholder="350000"
                  />
                </div>
              </div>

              {/* State Selector */}
              <div className="space-y-2">
                <Label htmlFor="pt-state" className="text-sm font-medium">
                  <span className="flex items-center gap-1.5">
                    <Home className="h-3.5 w-3.5 text-emerald-400" />
                    State
                  </span>
                </Label>
                <Select
                  value={stateKey}
                  onValueChange={(v) => {
                    setStateKey(v);
                    setUseHomestead(false);
                    setUseCustomExemption(false);
                    setCustomExemption(0);
                  }}
                >
                  <SelectTrigger id="pt-state" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-64">
                    {STATE_KEYS.map((key) => {
                      const state = STATE_PROPERTY_TAX_RATES[key];
                      return (
                        <SelectItem key={key} value={key}>
                          {state.name} ({(state.rate * 100).toFixed(2)}%)
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <Separator className="bg-border/40" />

              {/* Homestead Exemption */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    Homestead / Exemptions
                  </span>
                </Label>

                {hasHomestead ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Button
                        variant={useHomestead ? 'default' : 'outline'}
                        size="sm"
                        className={`text-xs ${useHomestead ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : ''}`}
                        onClick={() => {
                          setUseHomestead(true);
                          setUseCustomExemption(false);
                        }}
                      >
                        Apply Homestead
                      </Button>
                      <Button
                        variant={!useHomestead && !useCustomExemption ? 'default' : 'outline'}
                        size="sm"
                        className={`text-xs ${!useHomestead && !useCustomExemption ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : ''}`}
                        onClick={() => {
                          setUseHomestead(false);
                          setUseCustomExemption(false);
                        }}
                      >
                        No Exemption
                      </Button>
                    </div>
                    {useHomestead && (
                      <div className="rounded-lg bg-emerald-500/10 p-3">
                        <p className="text-xs text-emerald-400 font-medium">
                          {currentState?.name} Homestead Exemption
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {homesteadInfo.description}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    {currentState?.name} does not have a standard homestead exemption in our database. You can add a custom exemption below.
                  </p>
                )}

                {/* Custom Exemption */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Button
                      variant={useCustomExemption ? 'default' : 'outline'}
                      size="sm"
                      className={`text-xs ${useCustomExemption ? 'bg-amber-600 hover:bg-amber-700 text-white' : ''}`}
                      onClick={() => {
                        setUseCustomExemption(true);
                        setUseHomestead(false);
                      }}
                    >
                      Custom Exemption
                    </Button>
                  </div>
                  {useCustomExemption && (
                    <div className="flex items-center gap-2">
                      <div className="relative max-w-xs">
                        <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type="number"
                          min={0}
                          step={1000}
                          value={customExemption || ''}
                          onChange={(e) => setCustomExemption(Number(e.target.value) || 0)}
                          className="pl-9"
                          placeholder="25000"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Amount deducted from assessed value
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <Separator className="bg-border/40" />

              {/* Rate Preview */}
              <div className="rounded-lg bg-muted/20 p-3 space-y-2">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Rate Preview</p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Effective Rate</p>
                    <p className="text-sm font-bold text-emerald-400">{currentState ? formatPercent(currentState.rate) : '0%'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Exemption</p>
                    <p className="text-sm font-bold text-amber-400">{effectiveExemption > 0 ? formatCurrency(effectiveExemption) : 'None'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Taxable Value</p>
                    <p className="text-sm font-bold text-foreground">{formatCurrency(Math.max(0, homeValue - effectiveExemption))}</p>
                  </div>
                </div>
              </div>

              {/* Calculate Button */}
              <Button
                onClick={handleCalculate}
                disabled={homeValue <= 0}
                className="w-full bg-emerald-600 text-white hover:bg-emerald-700"
                size="lg"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Calculate Property Tax
              </Button>
            </CardContent>
          </Card>

          {/* ─── Results ──────────────────────────────────── */}
          {result && (
            <Card className="border-emerald-500/20 bg-card/90 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <DollarSign className="h-5 w-5 text-emerald-400" />
                  Property Tax Breakdown — {result.stateName}
                </CardTitle>
                {result.notes && (
                  <Badge className="bg-amber-500/20 text-amber-400 text-[10px] w-fit">
                    {result.notes}
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Main Results */}
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-center">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Annual Tax
                    </p>
                    <p className="mt-1 text-2xl font-bold text-emerald-400">
                      {formatCurrency(result.annualTax)}
                    </p>
                  </div>
                  <div className="rounded-xl border border-border/30 bg-muted/10 p-4 text-center">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Monthly Tax
                    </p>
                    <p className="mt-1 text-2xl font-bold text-foreground">
                      {formatCurrency(result.monthlyTax)}
                    </p>
                  </div>
                  <div className="rounded-xl border border-border/30 bg-muted/10 p-4 text-center">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Bi-weekly Tax
                    </p>
                    <p className="mt-1 text-2xl font-bold text-foreground">
                      {formatCurrency(result.biweeklyTax)}
                    </p>
                  </div>
                </div>

                <Separator className="bg-border/40" />

                {/* Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Home Value</span>
                    <span className="font-medium">{formatCurrency(result.homeValue)}</span>
                  </div>
                  {result.exemptionAmount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Exemption</span>
                      <span className="font-medium text-emerald-400">−{formatCurrency(result.exemptionAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxable Value</span>
                    <span className="font-medium">{formatCurrency(result.taxableValue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Effective Rate</span>
                    <span className="font-medium">{formatPercent(result.effectiveRate)}</span>
                  </div>
                </div>

                {/* Comparison */}
                {comparisonData && (
                  <>
                    <Separator className="bg-border/40" />
                    <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                      <p className="text-xs font-medium uppercase tracking-wider text-amber-400/80 mb-2">
                        State Comparison for {formatCurrency(result.homeValue)} Home
                      </p>
                      <div className="grid gap-2 sm:grid-cols-3">
                        <div className="text-center">
                          <p className="text-[10px] uppercase tracking-wider text-emerald-400">Lowest</p>
                          <p className="text-sm font-bold text-emerald-400">{comparisonData.lowestState}</p>
                          <p className="text-sm text-muted-foreground">{formatCurrency(comparisonData.lowestTax)}/yr</p>
                          <p className="text-[10px] text-muted-foreground">({formatPercent(comparisonData.lowestRate)})</p>
                        </div>
                        <div className="flex items-center justify-center">
                          <div className="text-center">
                            <p className="text-[10px] uppercase tracking-wider text-amber-400">Your State</p>
                            <p className="text-sm font-bold text-foreground">{result.stateName}</p>
                            <p className="text-sm text-muted-foreground">{formatCurrency(result.annualTax)}/yr</p>
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-[10px] uppercase tracking-wider text-red-400">Highest</p>
                          <p className="text-sm font-bold text-red-400">{comparisonData.highestState}</p>
                          <p className="text-sm text-muted-foreground">{formatCurrency(comparisonData.highestTax)}/yr</p>
                          <p className="text-[10px] text-muted-foreground">({formatPercent(comparisonData.highestRate)})</p>
                        </div>
                      </div>
                      <p className="mt-2 text-center text-xs text-muted-foreground">
                        <span className="text-emerald-400">{comparisonData.lowestState}</span> saves you <span className="font-medium">{formatCurrency(roundCurrency(result.annualTax - comparisonData.lowestTax))}</span> vs <span className="text-red-400">{comparisonData.highestState}</span> costs <span className="font-medium">{formatCurrency(roundCurrency(comparisonData.highestTax - result.annualTax))}</span> more
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          )}

          <AdSlot position="after-form" />
        </div>

        {/* Right: Charts + State Reference */}
        <div className="lg:col-span-2">
          <Card className="sticky top-20 border-emerald-500/20 bg-card/90 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-emerald-400" />
                Property Tax Rates by State
              </CardTitle>
              <CardDescription>2026 average effective property tax rates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Pie Chart */}
              {result && (
                <div className="space-y-2">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Tax as % of Home Value
                  </p>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <RechartsTooltip content={<PieCustomTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center gap-4 text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                      <span className="text-muted-foreground">Home Value</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
                      <span className="text-muted-foreground">Property Tax</span>
                    </div>
                  </div>
                </div>
              )}

              <Separator className="bg-border/40" />

              {/* Top 10 Highest */}
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-red-400" />
                  Top 10 Highest Rates
                </p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={top10Highest} layout="vertical" margin={{ left: 0, right: 10, top: 5, bottom: 5 }}>
                      <XAxis type="number" tickFormatter={(v) => `${v}%`} tick={{ fontSize: 10 }} />
                      <YAxis type="category" dataKey="name" width={90} tick={{ fontSize: 10 }} />
                      <RechartsTooltip content={<BarCustomTooltip />} />
                      <Bar dataKey="rate" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <Separator className="bg-border/40" />

              {/* Top 10 Lowest */}
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1">
                  <TrendingDown className="h-3 w-3 text-emerald-400" />
                  Top 10 Lowest Rates
                </p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={top10Lowest} layout="vertical" margin={{ left: 0, right: 10, top: 5, bottom: 5 }}>
                      <XAxis type="number" tickFormatter={(v) => `${v}%`} tick={{ fontSize: 10 }} />
                      <YAxis type="category" dataKey="name" width={90} tick={{ fontSize: 10 }} />
                      <RechartsTooltip content={<BarCustomTooltip />} />
                      <Bar dataKey="rate" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <Separator className="bg-border/40" />

              {/* Quick Reference */}
              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Quick Reference
                </p>
                <div className="max-h-48 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                  {STATE_KEYS
                    .map((key) => ({ key, ...STATE_PROPERTY_TAX_RATES[key] }))
                    .sort((a, b) => b.rate - a.rate)
                    .map((s) => (
                      <button
                        key={s.key}
                        className="flex w-full items-center justify-between rounded-md px-2 py-1 text-xs hover:bg-muted/50 transition-colors"
                        onClick={() => {
                          setStateKey(s.key);
                          setUseHomestead(false);
                          setUseCustomExemption(false);
                        }}
                      >
                        <span className="text-foreground">{s.name}</span>
                        <span className={`font-mono font-medium ${s.rate >= 0.015 ? 'text-red-400' : s.rate <= 0.006 ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {(s.rate * 100).toFixed(2)}%
                        </span>
                      </button>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ─── FAQ Section ──────────────────────────────────── */}
      <FAQSection faqs={PROPERTY_TAX_FAQS} title="Property Tax Calculator FAQ" />

      <AdSlot position="after-results" />
    </div>
  );
}
