'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  Calculator,
  Clock,
  DollarSign,
  MapPin,
  ChevronRight,
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
import {
  calculateSalaryTakeHome,
  STATE_KEYS,
  STATE_LABELS,
  type FilingStatus,
} from '@/lib/salary-calculations';
import { formatCurrency } from '@/lib/finance-utils';
import { formatRate } from '@/lib/hourly-calculations';

// ─── State to calculator slug mapping (mirrors hourly-to-salary-calculator) ───

/** Multi-word states use hyphenated calculator slugs. */
const STATE_SLUG_OVERRIDES: Record<string, string> = {
  newhampshire: 'new-hampshire-tax-calculator',
  newyork: 'new-york-tax-calculator',
  newjersey: 'new-jersey-tax-calculator',
  newmexico: 'new-mexico-tax-calculator',
  northcarolina: 'north-carolina-tax-calculator',
  northdakota: 'north-dakota-tax-calculator',
  southcarolina: 'south-carolina-tax-calculator',
  southdakota: 'south-dakota-tax-calculator',
  westvirginia: 'west-virginia-tax-calculator',
};

function stateSlugFor(stateKey: string): string {
  return STATE_SLUG_OVERRIDES[stateKey] ?? `${stateKey}-tax-calculator`;
}

const FILING_LABELS: Record<FilingStatus, string> = {
  single: 'Single',
  married: 'Married Filing Jointly',
  head_of_household: 'Head of Household',
};

// ─── Client Widget ───────────────────────────────────────────────────────────

interface HourlyClientPageProps {
  rate: number;
}

export function HourlyClientPage({ rate }: HourlyClientPageProps) {
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const [stateKey, setStateKey] = useState<string>('texas');

  const rateLabel = formatRate(rate);

  // ─── Conversion math — gross from the rate + hours, net from the engine ──
  const result = useMemo(() => {
    const hours = Math.max(1, Math.min(80, hoursPerWeek || 0));
    const annualGross = rate * hours * 52;
    const calc = calculateSalaryTakeHome(Math.round(annualGross), filingStatus);
    const chosen = calc.states.find((s) => s.stateKey === stateKey) ?? calc.states[0];
    return {
      hours,
      annualGross,
      grossMonthly: annualGross / 12,
      netAnnual: chosen.netAnnual,
      netMonthly: chosen.netAnnual / 12,
      netBiweekly: chosen.netAnnual / 26,
      netWeekly: chosen.netAnnual / 52,
      effectiveRate: chosen.effectiveTaxRate,
      stateTax: chosen.stateTax,
      federalTax: chosen.federalTax,
      ficaTotal: chosen.ficaTotal,
      stateName: chosen.stateName,
      stateAbbr: chosen.stateAbbr,
      stateSlug: chosen.stateKey,
    };
  }, [rate, hoursPerWeek, filingStatus, stateKey]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/hourly-to-salary-calculator" className="hover:text-foreground transition-colors">
          Hourly to Salary
        </Link>
        <span aria-hidden="true">/</span>
        <span className="font-medium text-foreground">{rateLabel} an Hour</span>
      </nav>

      <Card className="border-emerald-500/30 bg-card/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calculator className="h-5 w-5 text-emerald-600" />
            Customize {rateLabel} an Hour — Your Hours, Your State
          </CardTitle>
          <CardDescription>
            The tables below assume 40 hours a week. Change the schedule, filing status, or state to see
            your exact numbers — results update instantly.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* ─── Inputs ─────────────────────────────────────── */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="hours-week" className="text-sm font-medium">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-emerald-600" />
                  Hours per Week
                </span>
              </Label>
              <Input
                id="hours-week"
                type="number"
                min="1"
                max="80"
                step="1"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(parseFloat(e.target.value) || 0)}
                aria-label="Hours worked per week"
              />
              <p className="text-xs text-muted-foreground">Standard full-time is 40; part-time is 20</p>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Filing Status</Label>
              <Select value={filingStatus} onValueChange={(v) => setFilingStatus(v as FilingStatus)}>
                <SelectTrigger aria-label="Filing status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(FILING_LABELS) as FilingStatus[]).map((k) => (
                    <SelectItem key={k} value={k}>
                      {FILING_LABELS[k]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">State</Label>
              <Select value={stateKey} onValueChange={setStateKey}>
                <SelectTrigger aria-label="Choose your state">
                  <SelectValue placeholder="Choose your state" />
                </SelectTrigger>
                <SelectContent className="max-h-72">
                  {STATE_KEYS.map((key) => (
                    <SelectItem key={key} value={key}>
                      {STATE_LABELS[key]?.name ?? key}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* ─── Gross + Net Results ─────────────────────────── */}
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Gross side */}
            <div className="rounded-xl border border-border/40 bg-background/60 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Annual Gross ({result.hours} h/wk × 52 weeks)
              </p>
              <p className="mt-1 text-3xl font-bold text-foreground">
                {formatCurrency(result.annualGross)}
              </p>
              <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg border border-border/40 bg-card/50 p-3">
                  <p className="text-xs text-muted-foreground">Monthly gross</p>
                  <p className="font-semibold text-foreground">{formatCurrency(result.grossMonthly)}</p>
                </div>
                <div className="rounded-lg border border-border/40 bg-card/50 p-3">
                  <p className="text-xs text-muted-foreground">Weekly gross</p>
                  <p className="font-semibold text-foreground">
                    {formatCurrency(rate * result.hours)}
                  </p>
                </div>
              </div>
            </div>

            {/* Net side */}
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-600/10 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Annual Take-Home — {result.stateName}
              </p>
              <p className="mt-1 text-3xl font-bold text-emerald-700">
                {formatCurrency(result.netAnnual)}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {(result.effectiveRate * 100).toFixed(1)}% effective tax rate ·{' '}
                {result.stateTax > 0
                  ? `${formatCurrency(result.stateTax)} state tax`
                  : 'no state income tax'}
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center text-sm">
                <div className="rounded-lg border border-border/40 bg-card/50 p-2.5">
                  <p className="text-[11px] text-muted-foreground">Monthly</p>
                  <p className="font-semibold text-foreground">{formatCurrency(result.netMonthly)}</p>
                </div>
                <div className="rounded-lg border border-border/40 bg-card/50 p-2.5">
                  <p className="text-[11px] text-muted-foreground">Bi-weekly</p>
                  <p className="font-semibold text-foreground">{formatCurrency(result.netBiweekly)}</p>
                </div>
                <div className="rounded-lg border border-border/40 bg-card/50 p-2.5">
                  <p className="text-[11px] text-muted-foreground">Weekly</p>
                  <p className="font-semibold text-foreground">{formatCurrency(result.netWeekly)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* ─── Deduction line + state CTA ─────────────────── */}
          <div className="flex flex-col items-start gap-3 rounded-xl border border-border/40 bg-background/60 p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              <DollarSign className="mr-1 inline h-4 w-4 text-emerald-600" aria-hidden />
              On {formatCurrency(result.annualGross)} of gross: {formatCurrency(result.federalTax)}{' '}
              federal + {formatCurrency(result.ficaTotal)} FICA
              {result.stateTax > 0 ? ` + ${formatCurrency(result.stateTax)} state tax` : ''} —{' '}
              {FILING_LABELS[filingStatus].toLowerCase()}, standard deduction, no pre-tax deferrals.
            </p>
            <Link
              href={`/${stateSlugFor(result.stateSlug)}`}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-emerald-600/40 px-3 py-2 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-600/10"
            >
              <MapPin className="h-4 w-4" aria-hidden />
              {result.stateName} Calculator
              <ChevronRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
