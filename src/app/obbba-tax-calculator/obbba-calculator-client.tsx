'use client';

import { useState, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Calculator,
  DollarSign,
  RotateCcw,
  Users,
  Baby,
  TrendingUp,
  TrendingDown,
  Info,
} from 'lucide-react';
import {
  compareOBBBA,
  formatUSD,
  formatPct,
  type OBBBAScenario,
  type FilingStatus,
  type ComparisonResult,
} from '@/lib/obbba-calculator';

function parseNum(value: string): number {
  const n = parseInt(value.replace(/[^0-9]/g, ''), 10);
  return Number.isFinite(n) ? n : 0;
}

const inputClass =
  'w-full rounded-lg border border-border/50 bg-background/50 pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/20';
const inputNoPrefix =
  'w-full rounded-lg border border-border/50 bg-background/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/20';

export function OBBBACalculatorClient() {
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const [grossIncome, setGrossIncome] = useState<string>('75000');
  const [qualifyingChildren, setQualifyingChildren] = useState<string>('1');
  const [saltPaid, setSaltPaid] = useState<string>('12000');
  const [otherItemized, setOtherItemized] = useState<string>('0');
  const [tipIncome, setTipIncome] = useState<string>('0');
  const [overtimePay, setOvertimePay] = useState<string>('0');
  const [isSenior, setIsSenior] = useState<string>('0');
  const [federalWithholding, setFederalWithholding] = useState<string>('8500');
  const [result, setResult] = useState<ComparisonResult | null>(null);

  const compute = useCallback(() => {
    const scenario: OBBBAScenario = {
      grossIncome: parseNum(grossIncome),
      filingStatus,
      qualifyingChildren: parseNum(qualifyingChildren),
      saltPaid: parseNum(saltPaid),
      otherItemized: parseNum(otherItemized),
      tipIncome: parseNum(tipIncome),
      overtimePay: parseNum(overtimePay),
      isSenior: Number(isSenior) || 0,
      federalWithholding: parseNum(federalWithholding),
    };
    setResult(compareOBBBA(scenario));
  }, [
    grossIncome,
    filingStatus,
    qualifyingChildren,
    saltPaid,
    otherItemized,
    tipIncome,
    overtimePay,
    isSenior,
    federalWithholding,
  ]);

  // Auto-compute on first render so the user sees something
  const firstResult = useMemo(() => {
    const scenario: OBBBAScenario = {
      grossIncome: parseNum(grossIncome) || 75000,
      filingStatus,
      qualifyingChildren: parseNum(qualifyingChildren) || 1,
      saltPaid: parseNum(saltPaid) || 12000,
      otherItemized: parseNum(otherItemized),
      tipIncome: parseNum(tipIncome),
      overtimePay: parseNum(overtimePay),
      isSenior: Number(isSenior) || 0,
      federalWithholding: parseNum(federalWithholding) || 8500,
    };
    return compareOBBBA(scenario);
  }, []);

  const display = result ?? firstResult;

  const reset = () => {
    setFilingStatus('single');
    setGrossIncome('75000');
    setQualifyingChildren('1');
    setSaltPaid('12000');
    setOtherItemized('0');
    setTipIncome('0');
    setOvertimePay('0');
    setIsSenior('0');
    setFederalWithholding('8500');
    setResult(null);
  };

  const obbbaSaves = display.federalTaxDelta < 0;
  const deltaColor = obbbaSaves ? 'text-emerald-400' : 'text-amber-400';
  const DeltaIcon = obbbaSaves ? TrendingDown : TrendingUp;

  return (
    <Card className="border-emerald-500/20 bg-card/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calculator className="h-5 w-5 text-emerald-400" />
          OBBBA vs. Prior Law — 2026 Tax Comparison
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Enter your 2026 tax situation. The calculator instantly compares your tax under the
          One Big Beautiful Bill Act (OBBBA) against what you would have paid if the TCJA had
          sunset as scheduled.
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
              onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}
              className={inputNoPrefix}
            >
              <option value="single">Single</option>
              <option value="mfj">Married Filing Jointly</option>
              <option value="hoh">Head of Household</option>
            </select>
          </div>

          {/* Gross Income */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Gross Annual Wages (W-2 Box 1)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                inputMode="numeric"
                placeholder="e.g. 75000"
                value={grossIncome}
                onChange={(e) => setGrossIncome(e.target.value.replace(/[^0-9]/g, ''))}
                className={inputClass}
              />
            </div>
          </div>

          {/* Qualifying Children */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Qualifying Children Under 17
            </label>
            <div className="relative">
              <Baby className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                inputMode="numeric"
                placeholder="e.g. 1"
                value={qualifyingChildren}
                onChange={(e) => setQualifyingChildren(e.target.value.replace(/[^0-9]/g, ''))}
                className={inputClass}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              OBBBA Child Tax Credit: $2,200 per child (vs $1,000 pre-TCJA).
            </p>
          </div>

          {/* SALT Paid */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              State &amp; Local Taxes Paid (Income + Property + Sales)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                inputMode="numeric"
                placeholder="e.g. 12000"
                value={saltPaid}
                onChange={(e) => setSaltPaid(e.target.value.replace(/[^0-9]/g, ''))}
                className={inputClass}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              OBBBA SALT cap: $40,400 (vs $10,000 under old TCJA cap; unlimited pre-TCJA).
            </p>
          </div>

          {/* Other Itemized */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Other Itemized Deductions (Mortgage Interest, Charity, Medical)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                inputMode="numeric"
                placeholder="e.g. 15000"
                value={otherItemized}
                onChange={(e) => setOtherItemized(e.target.value.replace(/[^0-9]/g, ''))}
                className={inputClass}
              />
            </div>
          </div>

          {/* Tip Income */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Qualifying Tip Income (OBBBA deduction)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                inputMode="numeric"
                placeholder="e.g. 0"
                value={tipIncome}
                onChange={(e) => setTipIncome(e.target.value.replace(/[^0-9]/g, ''))}
                className={inputClass}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              New OBBBA deduction for traditionally tipped occupations.
            </p>
          </div>

          {/* Overtime Pay */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Qualifying Overtime Pay (OBBBA deduction)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                inputMode="numeric"
                placeholder="e.g. 0"
                value={overtimePay}
                onChange={(e) => setOvertimePay(e.target.value.replace(/[^0-9]/g, ''))}
                className={inputClass}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Time-and-a-half pay for hours beyond 40/week. New OBBBA deduction.
            </p>
          </div>

          {/* Senior Status */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Taxpayer(s) Age 65+ (0, 1, or 2)
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                inputMode="numeric"
                placeholder="0"
                value={isSenior}
                onChange={(e) => setIsSenior(e.target.value.replace(/[^0-9]/g, ''))}
                className={inputClass}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              OBBBA adds a $2,000 senior deduction per spouse 65+.
            </p>
          </div>

          {/* Federal Withholding */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Federal Income Tax Withheld (YTD)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                inputMode="numeric"
                placeholder="e.g. 8500"
                value={federalWithholding}
                onChange={(e) => setFederalWithholding(e.target.value.replace(/[^0-9]/g, ''))}
                className={inputClass}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              From your last pay stub or W-2 Box 2. Used to compute refund or balance due.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              onClick={compute}
              className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white hover:from-emerald-500 hover:to-emerald-400"
            >
              <Calculator className="h-4 w-4 mr-1.5" />
              Compare OBBBA vs Prior Law
            </Button>
            <Button variant="outline" onClick={reset} className="border-border/50">
              <RotateCcw className="h-4 w-4 mr-1.5" />
              Reset
            </Button>
          </div>

          {/* Results */}
          <div className="mt-6 space-y-4">
            {/* Headline Delta */}
            <div className="rounded-xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 p-6 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Your OBBBA Tax Savings (2026)
              </p>
              <div className="flex items-center justify-center gap-2">
                <DeltaIcon className={`h-7 w-7 ${deltaColor}`} />
                <p className={`text-4xl font-bold ${deltaColor}`}>
                  {formatUSD(Math.abs(display.federalTaxDelta))}
                </p>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {obbbaSaves
                  ? `OBBBA lowers your federal income tax by ${formatUSD(Math.abs(display.federalTaxDelta))} compared to letting the TCJA expire.`
                  : `OBBBA raises your federal income tax by ${formatUSD(display.federalTaxDelta)} vs prior law.`}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Refund difference:{' '}
                <span className={display.refundDelta >= 0 ? 'text-emerald-400 font-medium' : 'text-amber-400 font-medium'}>
                  {display.refundDelta >= 0 ? '+' : '−'}
                  {formatUSD(Math.abs(display.refundDelta))}
                </span>
              </p>
            </div>

            {/* Side-by-Side Comparison */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
                <h2 className="text-base font-semibold text-emerald-400 mb-3">
                  Under OBBBA (2026)
                </h2>
                <div className="space-y-2 text-sm">
                  <Row label="AGI" value={formatUSD(display.obbba.agi)} />
                  <Row label="Taxable Income" value={formatUSD(display.obbba.taxableIncome)} />
                  <Row label="Pre-Credit Tax" value={formatUSD(display.obbba.preCreditTax)} />
                  <Row label="Child Tax Credit" value={`-${formatUSD(display.obbba.childTaxCredit)}`} />
                  <Row label="Federal Income Tax" value={formatUSD(display.obbba.federalTax)} bold />
                  <Row label="FICA (SS + Medicare)" value={formatUSD(display.obbba.fica)} />
                  <Row label="Effective Rate" value={formatPct(display.obbba.effectiveRate)} />
                  <Row label="Marginal Rate" value={formatPct(display.obbba.marginalRate, 0)} />
                  <div className="border-t border-border/30 pt-2 flex justify-between text-sm">
                    <span className="font-semibold text-foreground">Refund / (Owed)</span>
                    <span className={`font-bold ${display.obbba.refundOrDue >= 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {formatUSD(display.obbba.refundOrDue)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border/30 bg-muted/10 p-5">
                <h2 className="text-base font-semibold text-muted-foreground mb-3">
                  Under Prior Law (Pre-TCJA Sunset)
                </h2>
                <div className="space-y-2 text-sm">
                  <Row label="AGI" value={formatUSD(display.prior.agi)} />
                  <Row label="Taxable Income" value={formatUSD(display.prior.taxableIncome)} />
                  <Row label="Pre-Credit Tax" value={formatUSD(display.prior.preCreditTax)} />
                  <Row label="Child Tax Credit" value={`-${formatUSD(display.prior.childTaxCredit)}`} />
                  <Row label="Federal Income Tax" value={formatUSD(display.prior.federalTax)} bold />
                  <Row label="FICA (SS + Medicare)" value={formatUSD(display.prior.fica)} />
                  <Row label="Effective Rate" value={formatPct(display.prior.effectiveRate)} />
                  <Row label="Marginal Rate" value={formatPct(display.prior.marginalRate, 0)} />
                  <div className="border-t border-border/30 pt-2 flex justify-between text-sm">
                    <span className="font-semibold text-foreground">Refund / (Owed)</span>
                    <span className={`font-bold ${display.prior.refundOrDue >= 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {formatUSD(display.prior.refundOrDue)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* OBBBA Provisions Applied */}
            <div className="rounded-xl border border-border/30 bg-card/50 p-5">
              <h2 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                <Info className="h-4 w-4 text-emerald-400" />
                OBBBA Provisions Applied
              </h2>
              <div className="grid gap-2 sm:grid-cols-2 text-sm">
                <Row label="Standard Deduction" value={formatUSD(display.obbba.standardDeductionUsed)} />
                <Row label="SALT Deduction Allowed" value={formatUSD(display.obbba.saltDeductionAllowed)} />
                <Row label="Tip Income Deduction" value={formatUSD(display.obbba.tipDeduction)} />
                <Row label="Overtime Pay Deduction" value={formatUSD(display.obbba.overtimeDeduction)} />
                <Row label="Senior Additional Deduction" value={formatUSD(display.obbba.seniorDeduction)} />
                <Row label="Itemized vs Standard" value={display.obbba.usedItemized ? 'Itemized' : 'Standard'} />
              </div>
            </div>

            <p className="text-[11px] text-muted-foreground leading-relaxed">
              This calculator provides estimates based on 2026 federal tax rules under OBBBA
              (P.L. 119-1) and the pre-TCJA law that would have applied if TCJA had sunset.
              State taxes, AMT, and special circumstances are not included. The tip and
              overtime deductions are temporary provisions under OBBBA. Consult a tax
              professional for advice specific to your situation.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Row({ label, value, bold = false }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className={bold ? 'font-bold text-foreground' : 'font-medium text-foreground'}>
        {value}
      </span>
    </div>
  );
}
