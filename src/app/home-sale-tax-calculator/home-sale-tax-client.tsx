'use client';

import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, DollarSign, Home, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';

interface CalculationResult {
  adjustedBasis: number;
  capitalGain: number;
  exclusionAmount: number;
  taxableGain: number;
  cgRate: number;
  capitalGainsTax: number;
  depreciationRecapture: number;
  niitAmount: number;
  totalTax: number;
  effectiveRate: number;
  isLongTerm: boolean;
  exclusionType: string;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function parseNumericInput(value: string): number {
  return parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
}

export function HomeSaleTaxClient() {
  const [filingStatus, setFilingStatus] = useState<'single' | 'mfj'>('single');
  const [salePrice, setSalePrice] = useState<string>('');
  const [purchasePrice, setPurchasePrice] = useState<string>('');
  const [improvements, setImprovements] = useState<string>('');
  const [depreciation, setDepreciation] = useState<string>('');
  const [sellingCosts, setSellingCosts] = useState<string>('');
  const [monthsLived, setMonthsLived] = useState<string>('60');
  const [isRental, setIsRental] = useState(false);
  const [taxableIncome, setTaxableIncome] = useState<string>('');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const calculate = useCallback(() => {
    const sale = parseNumericInput(salePrice);
    const purchase = parseNumericInput(purchasePrice);
    const improv = parseNumericInput(improvements);
    const deprec = parseNumericInput(depreciation);
    const sellCosts = parseNumericInput(sellingCosts);
    const months = parseInt(monthsLived, 10) || 0;
    const income = parseNumericInput(taxableIncome);

    // Step 1: Adjusted Cost Basis
    const adjustedBasis = purchase + improv - deprec;

    // Step 2: Capital Gain
    const capitalGain = sale - adjustedBasis - sellCosts;

    // Step 3: Exclusion Amount
    let exclusionAmount = 0;
    let exclusionType = 'None';

    if (!isRental && capitalGain > 0) {
      const fullExclusion = filingStatus === 'mfj' ? 500000 : 250000;

      if (months >= 24) {
        // Full exclusion
        exclusionAmount = Math.min(fullExclusion, capitalGain);
        exclusionType = filingStatus === 'mfj'
          ? '$500,000 (MFJ)'
          : '$250,000 (Single)';
      } else if (months > 0) {
        // Partial exclusion - prorated
        const proration = months / 24;
        exclusionAmount = Math.min(Math.round(fullExclusion * proration), capitalGain);
        exclusionType = `Partial (${months}/24 months)`;
      }
    }

    // Step 4: Taxable Gain
    const taxableGain = Math.max(0, capitalGain - exclusionAmount);

    // Step 5: Determine capital gains rate
    // Using 2026 approximate thresholds
    const isLongTerm = true; // Most home sales are long-term
    let cgRate = 0.15;

    if (filingStatus === 'single') {
      if (income <= 47025) cgRate = 0;
      else if (income <= 518900) cgRate = 0.15;
      else cgRate = 0.20;
    } else {
      if (income <= 94050) cgRate = 0;
      else if (income <= 583750) cgRate = 0.15;
      else cgRate = 0.20;
    }

    // Step 6: Capital gains tax
    const capitalGainsTax = taxableGain * cgRate;

    // Step 7: NIIT
    const niitThreshold = filingStatus === 'mfj' ? 250000 : 200000;
    let niitAmount = 0;
    const magi = income + taxableGain; // Simplified MAGI estimate
    if (magi > niitThreshold) {
      const niitBase = Math.min(taxableGain, magi - niitThreshold);
      niitAmount = Math.max(0, niitBase * 0.038);
    }

    // Step 8: Depreciation recapture
    const depreciationRecapture = deprec * 0.25;

    // Total tax
    const totalTax = capitalGainsTax + niitAmount + depreciationRecapture;

    // Effective rate
    const effectiveRate = capitalGain > 0 ? (totalTax / capitalGain) * 100 : 0;

    setResult({
      adjustedBasis,
      capitalGain,
      exclusionAmount,
      taxableGain,
      cgRate,
      capitalGainsTax,
      depreciationRecapture,
      niitAmount,
      totalTax,
      effectiveRate,
      isLongTerm,
      exclusionType,
    });
  }, [salePrice, purchasePrice, improvements, depreciation, sellingCosts, monthsLived, isRental, taxableIncome, filingStatus]);

  const resetForm = () => {
    setFilingStatus('single');
    setSalePrice('');
    setPurchasePrice('');
    setImprovements('');
    setDepreciation('');
    setSellingCosts('');
    setMonthsLived('60');
    setIsRental(false);
    setTaxableIncome('');
    setResult(null);
    setShowAdvanced(false);
  };

  const inputClass = 'w-full rounded-lg border border-border/50 bg-background/50 pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/20';
  const inputClassNoPrefix = 'w-full rounded-lg border border-border/50 bg-background/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/20';

  return (
    <Card className="border-emerald-500/20 bg-card/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calculator className="h-5 w-5 text-emerald-400" />
          Home Sale Capital Gains Tax Calculator
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Enter your home sale details to estimate your capital gains tax. All calculations follow IRS rules for 2026.
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Filing Status */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Filing Status
            </label>
            <select
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value as 'single' | 'mfj')}
              className={inputClassNoPrefix}
            >
              <option value="single">Single</option>
              <option value="mfj">Married Filing Jointly</option>
            </select>
          </div>

          {/* Home Sale Price */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Home Sale Price
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                inputMode="numeric"
                placeholder="e.g. 600000"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value.replace(/[^0-9]/g, ''))}
                className={inputClass}
              />
            </div>
          </div>

          {/* Original Purchase Price */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Original Purchase Price
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                inputMode="numeric"
                placeholder="e.g. 300000"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value.replace(/[^0-9]/g, ''))}
                className={inputClass}
              />
            </div>
          </div>

          {/* Cost of Improvements */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Cost of Capital Improvements
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                inputMode="numeric"
                placeholder="e.g. 50000"
                value={improvements}
                onChange={(e) => setImprovements(e.target.value.replace(/[^0-9]/g, ''))}
                className={inputClass}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Additions, renovations, new roof, etc. (not repairs)</p>
          </div>

          {/* Selling Costs */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Selling Costs
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                inputMode="numeric"
                placeholder="e.g. 36000"
                value={sellingCosts}
                onChange={(e) => setSellingCosts(e.target.value.replace(/[^0-9]/g, ''))}
                className={inputClass}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Real estate commissions, closing costs, transfer taxes</p>
          </div>

          {/* Months Lived in Home */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Months Lived in Home (out of last 60)
            </label>
            <div className="relative">
              <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                inputMode="numeric"
                placeholder="e.g. 60"
                value={monthsLived}
                onChange={(e) => setMonthsLived(e.target.value.replace(/[^0-9]/g, ''))}
                className={inputClass}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Need 24+ months for full exclusion. 0–60 range.</p>
          </div>

          {/* Rental / Second Home Checkbox */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isRental}
              onChange={(e) => setIsRental(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-border/50 text-emerald-500 focus:ring-emerald-500/20"
            />
            <div>
              <span className="text-sm font-medium text-foreground">This is a rental or second home</span>
              <p className="text-xs text-muted-foreground">Primary residence exclusion does not apply</p>
            </div>
          </label>

          {/* Advanced Section Toggle */}
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-1.5 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            {showAdvanced ? 'Hide' : 'Show'} advanced inputs (depreciation &amp; taxable income)
          </button>

          {showAdvanced && (
            <div className="space-y-4 rounded-lg border border-border/30 bg-muted/20 p-4">
              {/* Accumulated Depreciation */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Accumulated Depreciation
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="e.g. 50000 (for rental properties)"
                    value={depreciation}
                    onChange={(e) => setDepreciation(e.target.value.replace(/[^0-9]/g, ''))}
                    className={inputClass}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Total depreciation claimed or claimable. Taxed at 25% recapture rate.</p>
              </div>

              {/* Taxable Income */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Your Taxable Income (for rate determination)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="e.g. 120000"
                    value={taxableIncome}
                    onChange={(e) => setTaxableIncome(e.target.value.replace(/[^0-9]/g, ''))}
                    className={inputClass}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Your ordinary taxable income excluding this sale. Determines your capital gains rate.</p>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              onClick={calculate}
              disabled={!salePrice || !purchasePrice}
              className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white hover:from-emerald-500 hover:to-emerald-400"
            >
              <Calculator className="h-4 w-4 mr-1.5" />
              Calculate Tax
            </Button>
            <Button
              variant="outline"
              onClick={resetForm}
              className="border-border/50"
            >
              <RotateCcw className="h-4 w-4 mr-1.5" />
              Reset
            </Button>
          </div>

          {/* Results */}
          {result && (
            <div className="mt-6 space-y-4">
              {/* Breakdown */}
              <div className="rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 p-5">
                <h3 className="text-base font-semibold text-foreground mb-3">
                  Sale Breakdown
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Home Sale Price</span>
                    <span className="font-medium text-foreground">{formatCurrency(parseNumericInput(salePrice))}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Adjusted Cost Basis</span>
                    <span className="font-medium text-foreground">{formatCurrency(result.adjustedBasis)}</span>
                  </div>
                  <div className="flex justify-between text-sm pl-4">
                    <span className="text-xs text-muted-foreground">Purchase Price</span>
                    <span className="text-xs text-muted-foreground">{formatCurrency(parseNumericInput(purchasePrice))}</span>
                  </div>
                  <div className="flex justify-between text-sm pl-4">
                    <span className="text-xs text-muted-foreground">+ Improvements</span>
                    <span className="text-xs text-muted-foreground">{formatCurrency(parseNumericInput(improvements))}</span>
                  </div>
                  <div className="flex justify-between text-sm pl-4">
                    <span className="text-xs text-muted-foreground">- Depreciation</span>
                    <span className="text-xs text-muted-foreground">{formatCurrency(parseNumericInput(depreciation))}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">- Selling Costs</span>
                    <span className="font-medium text-foreground">{formatCurrency(parseNumericInput(sellingCosts))}</span>
                  </div>
                  <div className="border-t border-border/30 pt-2 flex justify-between text-sm">
                    <span className="font-medium text-foreground">Capital Gain</span>
                    <span className={`font-bold ${result.capitalGain >= 0 ? 'text-foreground' : 'text-emerald-400'}`}>
                      {formatCurrency(result.capitalGain)}
                    </span>
                  </div>
                  {result.exclusionAmount > 0 && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Section 121 Exclusion ({result.exclusionType})</span>
                        <span className="font-medium text-emerald-400">-{formatCurrency(result.exclusionAmount)}</span>
                      </div>
                      <div className="border-t border-border/30 pt-2 flex justify-between text-sm">
                        <span className="font-medium text-foreground">Taxable Gain</span>
                        <span className="font-bold text-foreground">{formatCurrency(result.taxableGain)}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Tax Calculation */}
              <div className="rounded-xl border border-sky-500/20 bg-gradient-to-br from-sky-500/5 to-blue-500/5 p-5">
                <h3 className="text-base font-semibold text-foreground mb-3">
                  Tax Calculation
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Long-Term Capital Gains Rate
                    </span>
                    <span className="font-medium text-foreground">{(result.cgRate * 100).toFixed(0)}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Capital Gains Tax ({(result.cgRate * 100).toFixed(0)}% &times; {formatCurrency(result.taxableGain)})</span>
                    <span className="font-medium text-foreground">{formatCurrency(result.capitalGainsTax)}</span>
                  </div>
                  {result.niitAmount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">NIIT (3.8%)</span>
                      <span className="font-medium text-amber-400">{formatCurrency(result.niitAmount)}</span>
                    </div>
                  )}
                  {result.depreciationRecapture > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Depreciation Recapture (25%)</span>
                      <span className="font-medium text-amber-400">{formatCurrency(result.depreciationRecapture)}</span>
                    </div>
                  )}
                  <div className="border-t border-border/30 pt-2 flex justify-between text-sm">
                    <span className="font-semibold text-foreground">Total Tax on Sale</span>
                    <span className="text-lg font-bold text-foreground">{formatCurrency(result.totalTax)}</span>
                  </div>
                  {result.capitalGain > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Effective Tax Rate on Gain</span>
                      <span className="font-medium text-sky-400">{result.effectiveRate.toFixed(1)}%</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-border/30 bg-card/60 p-4 text-center">
                  <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">Net Proceeds</p>
                  <p className="text-lg font-bold text-foreground">
                    {formatCurrency(parseNumericInput(salePrice) - parseNumericInput(sellingCosts) - result.totalTax)}
                  </p>
                </div>
                <div className="rounded-lg border border-border/30 bg-card/60 p-4 text-center">
                  <p className="text-xs font-semibold uppercase tracking-wider text-sky-400 mb-1">Total Tax</p>
                  <p className="text-lg font-bold text-foreground">{formatCurrency(result.totalTax)}</p>
                </div>
                <div className="rounded-lg border border-border/30 bg-card/60 p-4 text-center">
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">Eff. Rate</p>
                  <p className="text-lg font-bold text-foreground">{result.capitalGain > 0 ? `${result.effectiveRate.toFixed(1)}%` : 'N/A'}</p>
                </div>
              </div>

              {/* Disclaimer */}
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                This calculator provides estimates based on 2026 federal tax rules. It does not account for state taxes, alternative minimum tax, or special circumstances. Consult a tax professional for advice specific to your situation. Calculations assume long-term capital gains (held &gt; 1 year).
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
