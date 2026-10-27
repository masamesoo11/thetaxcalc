'use client';

import { useMemo, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import {
  Calculator,
  DollarSign,
  Heart,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Info,
  ArrowRight,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FEDERAL_TAX_2026, FICA_2026 } from '@/lib/tax-config';
import { formatCurrency } from '@/lib/finance-utils';

// ─── Types ──────────────────────────────────────────────────────────────────────

interface MarriageResult {
  // Two singles
  yourTaxSingle: number;
  spouseTaxSingle: number;
  singlesTotal: number;
  singlesMedicareSurtax: number;
  // Married filing jointly
  jointTax: number;
  jointMedicareSurtax: number;
  jointTotal: number;
  // Difference (positive = penalty, negative = bonus)
  difference: number;
  isPenalty: boolean;
  // Context
  jointMarginalRate: number;
  yourMarginalRateSingle: number;
  spouseMarginalRateSingle: number;
}

// ─── Marginal rate helper ────────────────────────────────────────────────────────

function marginalRate(taxableIncome: number, filingStatus: 'single' | 'married'): number {
  const brackets = FEDERAL_TAX_2026.bracketsByFiling[filingStatus];
  for (let i = brackets.length - 1; i >= 0; i--) {
    if (taxableIncome >= brackets[i].min) return brackets[i].rate;
  }
  return 0;
}

// ─── Core comparison ─────────────────────────────────────────────────────────────

function compareMarriage(income1: number, income2: number): MarriageResult {
  // Federal income tax — the engine applies each filing status's brackets + standard deduction
  const yourTaxSingle = federalTaxFor(income1, 'single');
  const spouseTaxSingle = federalTaxFor(income2, 'single');
  const jointTax = federalTaxFor(income1 + income2, 'married');

  // Additional Medicare surtax (Form 8959) — 0.9% above thresholds:
  // single $200K each vs joint $250K on combined wages. SS/Medicare base
  // rates (7.65%) are identical per-person regardless of filing status.
  const surtaxSingle =
    Math.max(0, income1 - FICA_2026.additionalMedicareThreshold) +
    Math.max(0, income2 - FICA_2026.additionalMedicareThreshold);
  const surtaxJoint = Math.max(0, income1 + income2 - FICA_2026.additionalMedicareThresholdMFJ);
  const singlesMedicareSurtax = surtaxSingle * FICA_2026.additionalMedicareRate;
  const jointMedicareSurtax = surtaxJoint * FICA_2026.additionalMedicareRate;

  const singlesTotal = yourTaxSingle + spouseTaxSingle + singlesMedicareSurtax;
  const jointTotal = jointTax + jointMedicareSurtax;
  const difference = jointTotal - singlesTotal;

  return {
    yourTaxSingle,
    spouseTaxSingle,
    singlesTotal,
    singlesMedicareSurtax,
    jointTax,
    jointMedicareSurtax,
    jointTotal,
    difference,
    isPenalty: difference > 0.5,
    jointMarginalRate: marginalRate(income1 + income2 - FEDERAL_TAX_2026.standardDeductionsByFiling.married, 'married'),
    yourMarginalRateSingle: marginalRate(income1 - FEDERAL_TAX_2026.standardDeductionsByFiling.single, 'single'),
    spouseMarginalRateSingle: marginalRate(income2 - FEDERAL_TAX_2026.standardDeductionsByFiling.single, 'single'),
  };
}

function federalTaxFor(income: number, filingStatus: 'single' | 'married'): number {
  const brackets = FEDERAL_TAX_2026.bracketsByFiling[filingStatus];
  const deduction = FEDERAL_TAX_2026.standardDeductionsByFiling[filingStatus];
  const taxable = Math.max(0, income - deduction);
  let tax = 0;
  let remaining = taxable;
  for (const bracket of brackets) {
    if (remaining <= 0) break;
    const width = bracket.max === null ? remaining : bracket.max - bracket.min;
    const inBracket = Math.min(remaining, width);
    tax += inBracket * bracket.rate;
    remaining -= inBracket;
  }
  return tax;
}

// ─── Example couples ─────────────────────────────────────────────────────────────

const EXAMPLES = [
  { label: 'Equal mid earners', you: 85000, spouse: 85000 },
  { label: 'Primary + part-time', you: 95000, spouse: 30000 },
  { label: 'Equal high earners', you: 200000, spouse: 200000 },
];

// ─── Component ───────────────────────────────────────────────────────────────────

export function MarriageTaxCalculator() {
  const [yourIncome, setYourIncome] = useState(95000);
  const [spouseIncome, setSpouseIncome] = useState(30000);

  const result = useMemo(() => compareMarriage(yourIncome, spouseIncome), [yourIncome, spouseIncome]);

  const chartData = useMemo(
    () => [
      {
        name: 'Two Singles',
        'Federal income tax': Math.round(result.yourTaxSingle + result.spouseTaxSingle),
        'Medicare surtax': Math.round(result.singlesMedicareSurtax),
      },
      {
        name: 'Married Joint',
        'Federal income tax': Math.round(result.jointTax),
        'Medicare surtax': Math.round(result.jointMedicareSurtax),
      },
    ],
    [result]
  );

  return (
    <div className="space-y-6">
      {/* ─── Page Title ─────────────────────────────────── */}
      <div className="text-center">
        <h2 className="flex items-center justify-center gap-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          <Heart className="h-8 w-8 text-emerald-600" />
          Marriage Tax Calculator
        </h2>
        <p className="mt-2 text-muted-foreground">
          2026 federal comparison: would you pay more or less as a married couple than as two
          singles?
        </p>
        <div className="mt-3 flex items-center justify-center gap-2">
          <Badge className="bg-emerald-600/20 text-emerald-600 border-emerald-500/30 text-xs font-semibold px-3 py-1">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Exact 2026 Brackets
          </Badge>
          <Badge className="bg-amber-500/20 text-amber-700 border-amber-500/30 text-xs px-3 py-1">
            Penalty or Bonus
          </Badge>
        </div>
      </div>

      {/* ─── Explanation card ────────────────────────────── */}
      <Card className="border-emerald-500/20 bg-emerald-600/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
            <div className="space-y-1 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Why Marriage Changes Federal Tax</p>
              <p>
                The 2026 standard deduction doubles exactly ($16,100 → $32,200), but the top
                brackets don&apos;t: single brackets compress above $250K of taxable income while
                joint brackets stretch to $752,900. So equal high earners can pay MORE married
                (the penalty), while couples with one main earner usually pay LESS (the bonus).
                The 0.9% additional Medicare tax adds its own twist: $200K per single vs $250K on
                joint wages.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ─── Inputs ──────────────────────────────────────── */}
      <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calculator className="h-5 w-5 text-emerald-600" />
            Both Incomes (Annual Wages)
          </CardTitle>
          <CardDescription>
            Try your real numbers — or tap an example below the inputs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="marriage-you" className="text-sm font-medium">
                <span className="flex items-center gap-1.5">
                  <DollarSign className="h-3.5 w-3.5 text-emerald-600" />
                  Your Income
                </span>
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="marriage-you"
                  type="number"
                  min="0"
                  step="1000"
                  value={yourIncome}
                  onChange={(e) => setYourIncome(parseFloat(e.target.value) || 0)}
                  className="pl-9"
                  aria-label="Your annual income"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Marginal rate as single: {(result.yourMarginalRateSingle * 100).toFixed(0)}%
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="marriage-spouse" className="text-sm font-medium">
                <span className="flex items-center gap-1.5">
                  <DollarSign className="h-3.5 w-3.5 text-emerald-600" />
                  Spouse&apos;s Income
                </span>
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="marriage-spouse"
                  type="number"
                  min="0"
                  step="1000"
                  value={spouseIncome}
                  onChange={(e) => setSpouseIncome(parseFloat(e.target.value) || 0)}
                  className="pl-9"
                  aria-label="Spouse annual income"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Marginal rate as single: {(result.spouseMarginalRateSingle * 100).toFixed(0)}%
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">Examples:</span>
            {EXAMPLES.map((ex) => (
              <button
                key={ex.label}
                type="button"
                onClick={() => {
                  setYourIncome(ex.you);
                  setSpouseIncome(ex.spouse);
                }}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  yourIncome === ex.you && spouseIncome === ex.spouse
                    ? 'border-emerald-600 bg-emerald-600/10 text-emerald-700'
                    : 'border-border/40 bg-background text-muted-foreground hover:border-emerald-600/40 hover:text-foreground'
                }`}
              >
                {ex.label} (${(ex.you / 1000)}K + ${(ex.spouse / 1000)}K)
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ─── Verdict ─────────────────────────────────────── */}
      <Card
        className={
          result.isPenalty
            ? 'border-red-500/30 bg-red-500/5'
            : result.difference < -0.5
              ? 'border-emerald-500/40 bg-emerald-600/10'
              : 'border-border/50 bg-card/80'
        }
      >
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              The Bottom Line
            </p>
            <div className="mt-2 flex items-center justify-center gap-3">
              {result.isPenalty ? (
                <TrendingDown className="h-8 w-8 text-red-600" />
              ) : (
                <TrendingUp className="h-8 w-8 text-emerald-600" />
              )}
              <p className="text-3xl font-bold sm:text-4xl">
                {result.isPenalty ? (
                  <span className="text-red-600">
                    Marriage Penalty of {formatCurrency(result.difference)}
                  </span>
                ) : result.difference < -0.5 ? (
                  <span className="text-emerald-700">
                    Marriage Bonus of {formatCurrency(Math.abs(result.difference))}
                  </span>
                ) : (
                  <span className="text-foreground">Nearly Identical</span>
                )}
              </p>
            </div>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
              {result.isPenalty
                ? `Filing jointly costs you ${formatCurrency(result.difference)} more per year in federal tax than filing as two singles. The joint brackets fill faster than your two single bracket sets did.`
                : result.difference < -0.5
                  ? `Filing jointly saves you ${formatCurrency(Math.abs(result.difference))} per year versus two single returns. The wider joint brackets ${yourIncome > spouseIncome * 2 || spouseIncome > yourIncome * 2 ? 'let the higher earner borrow the lower earner\'s unused bracket space' : 'more than offset the combined income'}.`
                  : 'Your combined incomes land almost exactly at the break-even point — the joint brackets and deductions offset each other.'}{' '}
              Joint marginal rate: {(result.jointMarginalRate * 100).toFixed(0)}%.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* ─── Side-by-side comparison + chart ──────────────── */}
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Card className="h-full border-border/50 bg-card/80">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Line-by-Line Comparison</CardTitle>
              <CardDescription>2026 federal income tax + Medicare surtax</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="space-y-2 rounded-lg border border-border/40 bg-background/60 p-4">
                <p className="font-medium text-foreground">As Two Single Filers</p>
                <div className="flex justify-between text-muted-foreground">
                  <span>Your federal tax</span>
                  <span className="font-medium text-foreground">
                    {formatCurrency(result.yourTaxSingle)}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Spouse&apos;s federal tax</span>
                  <span className="font-medium text-foreground">
                    {formatCurrency(result.spouseTaxSingle)}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Combined Medicare surtax (0.9%)</span>
                  <span className="font-medium text-foreground">
                    {formatCurrency(result.singlesMedicareSurtax)}
                  </span>
                </div>
                <div className="mt-2 flex justify-between border-t border-border/40 pt-2 font-semibold">
                  <span className="text-foreground">Total</span>
                  <span className="text-foreground">{formatCurrency(result.singlesTotal)}</span>
                </div>
              </div>

              <div className="space-y-2 rounded-lg border border-emerald-500/30 bg-emerald-600/5 p-4">
                <p className="font-medium text-foreground">Married Filing Jointly</p>
                <div className="flex justify-between text-muted-foreground">
                  <span>Joint federal tax</span>
                  <span className="font-medium text-foreground">
                    {formatCurrency(result.jointTax)}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Medicare surtax (0.9% over $250K joint)</span>
                  <span className="font-medium text-foreground">
                    {formatCurrency(result.jointMedicareSurtax)}
                  </span>
                </div>
                <div className="mt-2 flex justify-between border-t border-emerald-500/20 pt-2 font-semibold">
                  <span className="text-foreground">Total</span>
                  <span className="text-foreground">{formatCurrency(result.jointTotal)}</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                Social Security (6.2%) and base Medicare (1.45%) are withheld per person at the
                same rates either way, so they don&apos;t affect this comparison. Investment income
                has its own marriage wrinkle: the 3.8% NIIT thresholds are also $200K single vs
                $250K joint.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card className="h-full border-border/50 bg-card/80">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Total Federal Tax: Singles vs Joint</CardTitle>
              <CardDescription>Lower bar = cheaper filing status for the couple</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(120,113,108,0.15)" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#78716c" />
                    <YAxis
                      tick={{ fontSize: 11 }}
                      stroke="#78716c"
                      tickFormatter={(v: number) =>
                        v >= 1000 ? `$${Math.round(v / 1000)}k` : `$${v}`
                      }
                    />
                    <Tooltip
                      formatter={(value: number | string) => formatCurrency(Number(value))}
                      contentStyle={{
                        borderRadius: '10px',
                        border: '1px solid rgba(120,113,108,0.25)',
                        fontSize: '12px',
                      }}
                    />
                    <Bar dataKey="Federal income tax" fill="#059669" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="Medicare surtax" fill="#d97706" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ─── Next steps ──────────────────────────────────── */}
      <Card className="border-border/50 bg-card/80">
        <CardContent className="flex flex-col items-start justify-between gap-3 p-5 sm:flex-row sm:items-center">
          <p className="text-sm text-muted-foreground">
            Planning the combined budget? See your joint take-home in any state, or study the exact
            2026 brackets this comparison uses.
          </p>
          <div className="flex shrink-0 gap-2">
            <Button asChild variant="outline" className="border-emerald-600/40 text-emerald-700 hover:bg-emerald-600/10">
              <a href="/federal-tax-brackets">
                2026 Brackets
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" className="border-emerald-600/40 text-emerald-700 hover:bg-emerald-600/10">
              <a href="/salary-comparison-calculator">
                Compare States
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
