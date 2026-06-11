'use client';

import { useState, useMemo } from 'react';
import {
  Calculator,
  DollarSign,
  ArrowLeftRight,
  Car,
  MapPin,
  Shield,
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
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  STATE_SALES_TAX,
  ALL_STATE_KEYS,
} from '@/lib/state-sales-tax-data';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatPercent(value: number): string {
  return (value * 100).toFixed(2) + '%';
}

function formatCurrency(value: number): string {
  return (Math.round(value * 100) / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function roundCurrency(value: number): number {
  return Math.round(value * 100) / 100;
}

function fmtCurrency(value: number): string {
  return '$' + roundCurrency(value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function SalesTaxHubClient() {
  // ─── Forward Calculator State ──────────────────────────────────────────
  const [price, setPrice] = useState<number>(1000);
  const [stateKey, setStateKey] = useState<string>('california');
  const [localOverride, setLocalOverride] = useState<number>(0);
  const [useLocalOverride, setUseLocalOverride] = useState(false);
  const [isExempt, setIsExempt] = useState(false);
  const [exemptCategory, setExemptCategory] = useState<string>('groceries');
  const [forwardResult, setForwardResult] = useState<{
    stateTax: number;
    localTax: number;
    totalTax: number;
    totalPrice: number;
    combinedRate: number;
    stateRate: number;
    localRate: number;
  } | null>(null);

  // ─── Reverse Calculator State ──────────────────────────────────────────
  const [totalPaid, setTotalPaid] = useState<number>(1100);
  const [reverseStateKey, setReverseStateKey] = useState<string>('california');
  const [reverseResult, setReverseResult] = useState<{
    originalPrice: number;
    taxAmount: number;
    combinedRate: number;
  } | null>(null);

  // ─── Car Calculator State ──────────────────────────────────────────────
  const [vehiclePrice, setVehiclePrice] = useState<number>(35000);
  const [carStateKey, setCarStateKey] = useState<string>('california');
  const [tradeInValue, setTradeInValue] = useState<number>(0);
  const [carResult, setCarResult] = useState<{
    taxableAmount: number;
    salesTax: number;
    combinedRate: number;
    totalWithTax: number;
  } | null>(null);

  // ─── Derived State ─────────────────────────────────────────────────────
  const currentState = STATE_SALES_TAX[stateKey];
  const effectiveLocalRate = useLocalOverride ? localOverride / 100 : (currentState?.avgLocalRate ?? 0);
  const effectiveCombinedRate = isExempt ? 0 : (currentState?.stateRate ?? 0) + effectiveLocalRate;

  const exemptInfo = useMemo(() => {
    if (!currentState) return { groceries: false, drugs: false, clothing: false };
    return {
      groceries: currentState.groceryExempt,
      drugs: currentState.prescriptionDrugExempt,
      clothing: currentState.clothingExempt,
    };
  }, [currentState]);

  const isCategoryExempt = useMemo(() => {
    if (!isExempt) return false;
    if (exemptCategory === 'groceries') return exemptInfo.groceries;
    if (exemptCategory === 'prescription') return exemptInfo.drugs;
    if (exemptCategory === 'clothing') return exemptInfo.clothing;
    return false;
  }, [isExempt, exemptCategory, exemptInfo]);

  // ─── Handlers ──────────────────────────────────────────────────────────

  const handleForwardCalculate = () => {
    if (price <= 0) return;
    const s = STATE_SALES_TAX[stateKey];
    if (!s) return;
    const localRate = useLocalOverride ? localOverride / 100 : s.avgLocalRate;
    const combinedRate = isExempt && isCategoryExempt ? 0 : s.stateRate + localRate;
    const stateTax = isExempt && isCategoryExempt ? 0 : price * s.stateRate;
    const localTax = isExempt && isCategoryExempt ? 0 : price * localRate;
    setForwardResult({
      stateTax: roundCurrency(stateTax),
      localTax: roundCurrency(localTax),
      totalTax: roundCurrency(stateTax + localTax),
      totalPrice: roundCurrency(price + stateTax + localTax),
      combinedRate,
      stateRate: s.stateRate,
      localRate,
    });
  };

  const handleReverseCalculate = () => {
    if (totalPaid <= 0) return;
    const s = STATE_SALES_TAX[reverseStateKey];
    if (!s) return;
    const combinedRate = s.combinedRate;
    const originalPrice = totalPaid / (1 + combinedRate);
    const taxAmount = totalPaid - originalPrice;
    setReverseResult({
      originalPrice: roundCurrency(originalPrice),
      taxAmount: roundCurrency(taxAmount),
      combinedRate,
    });
  };

  const handleCarCalculate = () => {
    if (vehiclePrice <= 0) return;
    const s = STATE_SALES_TAX[carStateKey];
    if (!s) return;
    // Most states tax the price minus trade-in (some states like CA don't allow trade-in deduction for sales tax)
    const taxableAmount = Math.max(0, vehiclePrice - tradeInValue);
    const salesTax = taxableAmount * s.combinedRate;
    setCarResult({
      taxableAmount: roundCurrency(taxableAmount),
      salesTax: roundCurrency(salesTax),
      combinedRate: s.combinedRate,
      totalWithTax: roundCurrency(vehiclePrice + salesTax),
    });
  };

  // ─── Render ────────────────────────────────────────────────────────────

  return (
    <div className="space-y-8">
      {/* ─── Forward Sales Tax Calculator ─────────────────────── */}
      <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calculator className="h-5 w-5 text-emerald-400" />
            Sales Tax Calculator
          </CardTitle>
          <CardDescription>
            Enter the purchase amount and select a state to calculate sales tax with breakdown
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Purchase Amount */}
          <div className="space-y-2">
            <Label htmlFor="hub-price" className="text-sm font-medium">
              <span className="flex items-center gap-1.5">
                <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
                Purchase Amount
              </span>
            </Label>
            <div className="relative max-w-xs">
              <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="hub-price"
                type="number"
                min={0}
                step="0.01"
                value={price || ''}
                onChange={(e) => setPrice(Number(e.target.value) || 0)}
                className="pl-9"
                placeholder="1000"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* State Selector */}
            <div className="space-y-2">
              <Label htmlFor="hub-state" className="text-sm font-medium">
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
                  setLocalOverride(0);
                  setForwardResult(null);
                }}
              >
                <SelectTrigger id="hub-state" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-64">
                  {ALL_STATE_KEYS.map((key) => {
                    const s = STATE_SALES_TAX[key];
                    return (
                      <SelectItem key={key} value={key}>
                        {s.name} ({s.noStateTax ? '0%' : `${(s.combinedRate * 100).toFixed(2)}%`})
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            {/* Local Rate Override */}
            <div className="space-y-2">
              <Label htmlFor="hub-local" className="text-sm font-medium">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-amber-400" />
                  City/Local Tax Rate (%)
                </span>
              </Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    id="hub-local"
                    type="number"
                    min={0}
                    max={15}
                    step="0.01"
                    value={
                      useLocalOverride
                        ? localOverride || ''
                        : ((currentState?.avgLocalRate ?? 0) * 100).toFixed(2)
                    }
                    onChange={(e) => {
                      if (useLocalOverride) {
                        setLocalOverride(Number(e.target.value) || 0);
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
                  Average local rate for {currentState?.name}. Click &quot;Custom&quot; to override with your city rate.
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
                variant={isExempt ? 'default' : 'outline'}
                size="sm"
                className={`text-xs ${isExempt ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : ''}`}
                onClick={() => setIsExempt(true)}
              >
                Yes, exempt
              </Button>
              <Button
                variant={!isExempt ? 'default' : 'outline'}
                size="sm"
                className={`text-xs ${!isExempt ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : ''}`}
                onClick={() => setIsExempt(false)}
              >
                No, taxable
              </Button>
            </div>

            {isExempt && (
              <div className="space-y-2">
                <Label htmlFor="hub-exempt-cat" className="text-xs text-muted-foreground">
                  Exempt Category
                </Label>
                <Select value={exemptCategory} onValueChange={setExemptCategory}>
                  <SelectTrigger id="hub-exempt-cat" className="w-full max-w-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="groceries">
                      Groceries {exemptInfo.groceries ? '(exempt)' : '(taxable)'} in {currentState?.abbreviation}
                    </SelectItem>
                    <SelectItem value="prescription">
                      Prescription Drugs {exemptInfo.drugs ? '(exempt)' : '(taxable)'} in {currentState?.abbreviation}
                    </SelectItem>
                    <SelectItem value="clothing">
                      Clothing {exemptInfo.clothing ? '(exempt)' : '(taxable)'} in {currentState?.abbreviation}
                    </SelectItem>
                  </SelectContent>
                </Select>
                {isCategoryExempt ? (
                  <Badge className="bg-emerald-500/20 text-emerald-400 text-[10px]">
                    {exemptCategory === 'groceries' ? 'Groceries' : exemptCategory === 'prescription' ? 'Prescription drugs' : 'Clothing'} are tax-exempt in {currentState?.name}
                  </Badge>
                ) : (
                  <Badge className="bg-red-500/20 text-red-400 text-[10px]">
                    {exemptCategory === 'groceries' ? 'Groceries' : exemptCategory === 'prescription' ? 'Prescription drugs' : 'Clothing'} are NOT exempt in {currentState?.name} -- tax will apply
                  </Badge>
                )}
              </div>
            )}
          </div>

          <Separator className="bg-border/40" />

          {/* Rate Preview */}
          <div className="rounded-lg bg-muted/20 p-3 space-y-2">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Rate Preview for {currentState?.name}</p>
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
                <p className="text-sm font-bold text-emerald-400">{isExempt && isCategoryExempt ? '0% (exempt)' : formatPercent(effectiveCombinedRate)}</p>
              </div>
            </div>
          </div>

          {/* Calculate Button */}
          <Button
            onClick={handleForwardCalculate}
            disabled={price <= 0}
            className="w-full bg-emerald-600 text-white hover:bg-emerald-700"
            size="lg"
          >
            <Calculator className="mr-2 h-5 w-5" />
            Calculate Sales Tax
          </Button>

          {/* Forward Result */}
          {forwardResult && (
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
              <div className="grid gap-3 sm:grid-cols-4">
                <div className="text-center">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Purchase Price
                  </p>
                  <p className="mt-1 text-xl font-bold text-foreground">{fmtCurrency(price)}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    State Tax
                  </p>
                  <p className="mt-1 text-xl font-bold text-amber-400">{fmtCurrency(forwardResult.stateTax)}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Local Tax
                  </p>
                  <p className="mt-1 text-xl font-bold text-orange-400">{fmtCurrency(forwardResult.localTax)}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Total with Tax
                  </p>
                  <p className="mt-1 text-xl font-bold text-emerald-400">{fmtCurrency(forwardResult.totalPrice)}</p>
                </div>
              </div>
              <div className="mt-3 text-center">
                <p className="text-xs text-muted-foreground">
                  Total Tax: {fmtCurrency(forwardResult.totalTax)} ({formatPercent(forwardResult.combinedRate)} combined rate)
                  {' '}| Breakdown: {formatPercent(forwardResult.stateRate)} state + {formatPercent(forwardResult.localRate)} local
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ─── Reverse Sales Tax Calculator ────────────────────── */}
      <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <ArrowLeftRight className="h-5 w-5 text-amber-400" />
            Reverse Sales Tax Calculator
          </CardTitle>
          <CardDescription>
            Have a total receipt amount? Find the original price before tax and the tax amount.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="hub-reverse-total" className="text-sm font-medium">
                <span className="flex items-center gap-1.5">
                  <DollarSign className="h-3.5 w-3.5 text-amber-400" />
                  Total Amount Paid
                </span>
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="hub-reverse-total"
                  type="number"
                  min={0}
                  step="0.01"
                  value={totalPaid || ''}
                  onChange={(e) => setTotalPaid(Number(e.target.value) || 0)}
                  className="pl-9"
                  placeholder="1100"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hub-reverse-state" className="text-sm font-medium">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-amber-400" />
                  State
                </span>
              </Label>
              <Select
                value={reverseStateKey}
                onValueChange={(v) => {
                  setReverseStateKey(v);
                  setReverseResult(null);
                }}
              >
                <SelectTrigger id="hub-reverse-state" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-64">
                  {ALL_STATE_KEYS.map((key) => {
                    const s = STATE_SALES_TAX[key];
                    return (
                      <SelectItem key={key} value={key}>
                        {s.name} ({s.noStateTax ? '0%' : `${(s.combinedRate * 100).toFixed(2)}%`})
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleReverseCalculate}
            disabled={totalPaid <= 0}
            variant="outline"
            size="sm"
            className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
          >
            <ArrowLeftRight className="mr-2 h-4 w-4" />
            Calculate Original Price
          </Button>

          {/* Reverse Result */}
          {reverseResult && (
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="text-center">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Original Price
                  </p>
                  <p className="mt-1 text-xl font-bold text-emerald-400">
                    {fmtCurrency(reverseResult.originalPrice)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Sales Tax
                  </p>
                  <p className="mt-1 text-xl font-bold text-amber-400">
                    {fmtCurrency(reverseResult.taxAmount)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Total Paid
                  </p>
                  <p className="mt-1 text-xl font-bold text-foreground">
                    {fmtCurrency(totalPaid)}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Formula: {fmtCurrency(totalPaid)} / (1 + {formatPercent(reverseResult.combinedRate)}) = {fmtCurrency(reverseResult.originalPrice)}
              </p>
            </div>
          )}

          {/* Formula Explanation */}
          <div className="rounded-lg border border-border/30 bg-muted/10 p-4">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
              <div className="text-xs text-muted-foreground space-y-1">
                <p><strong className="text-foreground">Reverse Sales Tax Formula:</strong> Original Price = Total Paid / (1 + Tax Rate)</p>
                <p>Example: If you paid $1,088.20 in California (8.82% combined rate), the original price was $1,088.20 / 1.0882 = $1,000.00, and the tax was $88.20.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ─── Car / Vehicle Sales Tax Calculator ───────────────── */}
      <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Car className="h-5 w-5 text-blue-400" />
            Car / Vehicle Sales Tax Calculator
          </CardTitle>
          <CardDescription>
            Calculate sales tax on a vehicle purchase, including trade-in deductions where applicable.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="hub-car-price" className="text-sm font-medium">
                <span className="flex items-center gap-1.5">
                  <DollarSign className="h-3.5 w-3.5 text-blue-400" />
                  Vehicle Price
                </span>
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="hub-car-price"
                  type="number"
                  min={0}
                  step="0.01"
                  value={vehiclePrice || ''}
                  onChange={(e) => setVehiclePrice(Number(e.target.value) || 0)}
                  className="pl-9"
                  placeholder="35000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hub-car-state" className="text-sm font-medium">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-blue-400" />
                  State
                </span>
              </Label>
              <Select
                value={carStateKey}
                onValueChange={(v) => {
                  setCarStateKey(v);
                  setCarResult(null);
                }}
              >
                <SelectTrigger id="hub-car-state" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-64">
                  {ALL_STATE_KEYS.map((key) => {
                    const s = STATE_SALES_TAX[key];
                    return (
                      <SelectItem key={key} value={key}>
                        {s.name} ({s.noStateTax ? '0%' : `${(s.combinedRate * 100).toFixed(2)}%`})
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hub-tradein" className="text-sm font-medium">
                <span className="flex items-center gap-1.5">
                  <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                  Trade-In Value (optional)
                </span>
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="hub-tradein"
                  type="number"
                  min={0}
                  step="0.01"
                  value={tradeInValue || ''}
                  onChange={(e) => setTradeInValue(Number(e.target.value) || 0)}
                  className="pl-9"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          <Button
            onClick={handleCarCalculate}
            disabled={vehiclePrice <= 0}
            variant="outline"
            size="sm"
            className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
          >
            <Car className="mr-2 h-4 w-4" />
            Calculate Vehicle Sales Tax
          </Button>

          {/* Car Result */}
          {carResult && (
            <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
              <div className="grid gap-3 sm:grid-cols-4">
                <div className="text-center">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Taxable Amount
                  </p>
                  <p className="mt-1 text-xl font-bold text-foreground">{fmtCurrency(carResult.taxableAmount)}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Sales Tax
                  </p>
                  <p className="mt-1 text-xl font-bold text-amber-400">{fmtCurrency(carResult.salesTax)}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Combined Rate
                  </p>
                  <p className="mt-1 text-xl font-bold text-orange-400">{formatPercent(carResult.combinedRate)}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Total with Tax
                  </p>
                  <p className="mt-1 text-xl font-bold text-emerald-400">{fmtCurrency(carResult.totalWithTax)}</p>
                </div>
              </div>
              {tradeInValue > 0 && (
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  Trade-in credit of {fmtCurrency(tradeInValue)} applied. Taxable amount = {fmtCurrency(vehiclePrice)} - {fmtCurrency(tradeInValue)} = {fmtCurrency(carResult.taxableAmount)}.
                  Note: Some states (e.g., CA) do not allow trade-in deductions for sales tax.
                </p>
              )}
            </div>
          )}

          {/* Car Tax Note */}
          <div className="rounded-lg border border-border/30 bg-muted/10 p-4">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
              <div className="text-xs text-muted-foreground space-y-1">
                <p><strong className="text-foreground">Car Sales Tax Varies by State:</strong> Most states allow a trade-in credit that reduces the taxable amount. However, California, and a few other states, charge sales tax on the full vehicle price regardless of trade-in value.</p>
                <p>Some states also charge additional vehicle registration fees, title fees, and documentation fees that are not included in this sales tax calculation.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
