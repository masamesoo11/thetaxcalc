'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import {
  Plus,
  X,
  ArrowRightLeft,
  TrendingUp,
  TrendingDown,
  Crown,
  Copy,
  Check,
  Share2,
  ChevronDown,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  calculatePaycheck,
  formatCurrency,
  formatPercent,
  type PayFrequency,
  type PaycheckInput,
  type PaycheckResult,
} from '@/lib/finance-utils';
import { STATE_PROFILES } from '@/lib/tax-config';
import { trackScenarioOpen, trackScenarioAdd, trackScenarioShare, trackScenarioPreset } from '@/lib/analytics';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface TaxScenario {
  id: string;
  label: string;
  salary: number;
  payFrequency: PayFrequency;
  stateKey: string;
  filingStatus: 'single' | 'married' | 'head_of_household';
  retirement401k: number;
  hsaContribution: number;
  nycResident: boolean;
}

interface ScenarioWithResult {
  scenario: TaxScenario;
  result: PaycheckResult;
}

interface ScenarioComparisonProps {
  /** The current calculator's default state, used as baseline */
  defaultScenario: TaxScenario;
}

// ─── Preset Scenarios ───────────────────────────────────────────────────────

const PRESET_SCENARIOS: Omit<TaxScenario, 'id'>[] = [
  {
    label: 'With 10% 401(k)',
    salary: 75000,
    payFrequency: 'annual',
    stateKey: 'illinois',
    filingStatus: 'single',
    retirement401k: 7500,
    hsaContribution: 0,
    nycResident: false,
  },
  {
    label: 'Move to Texas',
    salary: 75000,
    payFrequency: 'annual',
    stateKey: 'texas',
    filingStatus: 'single',
    retirement401k: 0,
    hsaContribution: 0,
    nycResident: false,
  },
  {
    label: 'Move to California',
    salary: 75000,
    payFrequency: 'annual',
    stateKey: 'california',
    filingStatus: 'single',
    retirement401k: 0,
    hsaContribution: 0,
    nycResident: false,
  },
  {
    label: 'Married Filing Jointly',
    salary: 75000,
    payFrequency: 'annual',
    stateKey: 'illinois',
    filingStatus: 'married',
    retirement401k: 0,
    hsaContribution: 0,
    nycResident: false,
  },
  {
    label: 'Max 401(k) + HSA',
    salary: 100000,
    payFrequency: 'annual',
    stateKey: 'illinois',
    filingStatus: 'single',
    retirement401k: 24500,
    hsaContribution: 4150,
    nycResident: false,
  },
];

// ─── Comparison Row Data ────────────────────────────────────────────────────

interface ComparisonRow {
  label: string;
  getValue: (r: PaycheckResult) => number;
  format: 'currency' | 'percent';
  highlightBest?: 'highest' | 'lowest';
}

const COMPARISON_ROWS: ComparisonRow[] = [
  { label: 'Gross Annual', getValue: (r) => r.grossAnnual, format: 'currency' },
  { label: 'Federal Tax', getValue: (r) => r.federalTax, format: 'currency', highlightBest: 'lowest' },
  { label: 'FICA (SS + Medicare)', getValue: (r) => r.ficaTotal, format: 'currency', highlightBest: 'lowest' },
  { label: 'State Tax', getValue: (r) => r.stateTax + r.nycTax, format: 'currency', highlightBest: 'lowest' },
  { label: '401(k) Contribution', getValue: (r) => r.retirement401k, format: 'currency' },
  { label: 'HSA Contribution', getValue: (r) => r.hsaContribution, format: 'currency' },
  { label: 'Total Deductions', getValue: (r) => r.totalDeductions, format: 'currency', highlightBest: 'lowest' },
  { label: 'Net Take-Home', getValue: (r) => r.netAnnual, format: 'currency', highlightBest: 'highest' },
  { label: 'Effective Tax Rate', getValue: (r) => r.effectiveTaxRate, format: 'percent', highlightBest: 'lowest' },
  { label: 'Monthly Take-Home', getValue: (r) => r.netAnnual / 12, format: 'currency' },
  { label: 'Bi-Weekly Take-Home', getValue: (r) => r.netAnnual / 26, format: 'currency' },
];

// ─── Helper ─────────────────────────────────────────────────────────────────

function computeScenario(scenario: TaxScenario): ScenarioWithResult {
  const input: PaycheckInput = {
    annualSalary: scenario.salary,
    payFrequency: scenario.payFrequency,
    hoursPerWeek: 40,
    retirement401k: scenario.retirement401k,
    hsaContribution: scenario.hsaContribution,
    stateKey: scenario.stateKey,
    filingStatus: scenario.filingStatus,
    nycResident: scenario.stateKey === 'newyork' ? scenario.nycResident : false,
  };

  return {
    scenario,
    result: calculatePaycheck(input),
  };
}

function generateId(): string {
  return 'sc-' + Math.random().toString(36).substring(2, 8);
}

// ─── Scenario Input Editor ──────────────────────────────────────────────────

function ScenarioEditor({
  scenario,
  onChange,
  onRemove,
  canRemove,
  isBaseline,
  onSetBaseline,
}: {
  scenario: TaxScenario;
  onChange: (updated: TaxScenario) => void;
  onRemove: () => void;
  canRemove: boolean;
  isBaseline: boolean;
  onSetBaseline: () => void;
}) {
  return (
    <div className="space-y-3">
      {/* Label + Actions */}
      <div className="flex items-center gap-2">
        <Input
          value={scenario.label}
          onChange={(e) => onChange({ ...scenario, label: e.target.value })}
          className="h-8 text-sm font-semibold border-emerald-500/30 focus:border-emerald-500"
          placeholder="Scenario label"
        />
        {isBaseline && (
          <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30 shrink-0">
            <Crown className="h-3 w-3 mr-1" />
            Baseline
          </Badge>
        )}
        {!isBaseline && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onSetBaseline}
            className="h-8 text-xs text-muted-foreground hover:text-emerald-400 shrink-0"
          >
            Set as baseline
          </Button>
        )}
        {canRemove && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-red-400 shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Salary + State */}
      <div className="grid gap-2 grid-cols-2">
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Salary</Label>
          <div className="relative">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">$</span>
            <Input
              type="number"
              min={0}
              value={scenario.salary || ''}
              onChange={(e) => onChange({ ...scenario, salary: Number(e.target.value) || 0 })}
              className="h-8 text-sm pl-6"
              placeholder="75000"
            />
          </div>
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">State</Label>
          <Select
            value={scenario.stateKey}
            onValueChange={(v) => onChange({ ...scenario, stateKey: v })}
          >
            <SelectTrigger className="h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(STATE_PROFILES).map(([key, profile]) => (
                <SelectItem key={key} value={key}>
                  {profile.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Filing + 401k + HSA */}
      <div className="grid gap-2 grid-cols-3">
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Filing</Label>
          <Select
            value={scenario.filingStatus}
            onValueChange={(v) => onChange({ ...scenario, filingStatus: v as TaxScenario['filingStatus'] })}
          >
            <SelectTrigger className="h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Single</SelectItem>
              <SelectItem value="married">Married</SelectItem>
              <SelectItem value="head_of_household">Head of Household</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">401(k)</Label>
          <div className="relative">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">$</span>
            <Input
              type="number"
              min={0}
              max={24500}
              value={scenario.retirement401k || ''}
              onChange={(e) => onChange({ ...scenario, retirement401k: Number(e.target.value) || 0 })}
              className="h-8 text-sm pl-6"
              placeholder="0"
            />
          </div>
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">HSA</Label>
          <div className="relative">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">$</span>
            <Input
              type="number"
              min={0}
              max={4150}
              value={scenario.hsaContribution || ''}
              onChange={(e) => onChange({ ...scenario, hsaContribution: Number(e.target.value) || 0 })}
              className="h-8 text-sm pl-6"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {/* NYC toggle */}
      {scenario.stateKey === 'newyork' && (
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={scenario.nycResident}
            onChange={(e) => onChange({ ...scenario, nycResident: e.target.checked })}
            className="h-3.5 w-3.5 rounded border-border accent-red-500"
          />
          <Label className="text-xs text-muted-foreground cursor-pointer">NYC Resident (adds city tax)</Label>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────

export function ScenarioComparison({ defaultScenario }: ScenarioComparisonProps) {
  const [scenarios, setScenarios] = useState<TaxScenario[]>([
    { ...defaultScenario, id: generateId(), label: 'Current Situation' },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [presetOpen, setPresetOpen] = useState(false);

  // Compute results for all scenarios
  const computedResults = useMemo<ScenarioWithResult[]>(
    () => scenarios.map(computeScenario),
    [scenarios]
  );

  const baselineResult = computedResults[0];

  // Add a new scenario
  const addScenario = useCallback((preset?: Omit<TaxScenario, 'id'>) => {
    if (scenarios.length >= 4) return; // Max 4 scenarios
    const base = scenarios[0];
    const newScenario: TaxScenario = preset
      ? { ...preset, id: generateId() }
      : {
          id: generateId(),
          label: `Scenario ${scenarios.length + 1}`,
          salary: base.salary,
          payFrequency: base.payFrequency,
          stateKey: base.stateKey,
          filingStatus: base.filingStatus,
          retirement401k: base.retirement401k,
          hsaContribution: base.hsaContribution,
          nycResident: base.nycResident,
        };
    setScenarios((prev) => [...prev, newScenario]);
    trackScenarioAdd(scenarios.length + 1, preset?.label);
    if (preset) {
      trackScenarioPreset(preset.label, 'scenario_comparison');
    }
  }, [scenarios]);

  // Update a scenario
  const updateScenario = useCallback((id: string, updated: TaxScenario) => {
    setScenarios((prev) => prev.map((s) => (s.id === id ? updated : s)));
  }, []);

  // Remove a scenario
  const removeScenario = useCallback((id: string) => {
    setScenarios((prev) => prev.filter((s) => s.id !== id));
  }, []);

  // Set as baseline
  const setBaseline = useCallback((id: string) => {
    setScenarios((prev) => {
      const idx = prev.findIndex((s) => s.id === id);
      if (idx <= 0) return prev;
      const newScenarios = [...prev];
      const [item] = newScenarios.splice(idx, 1);
      newScenarios.unshift(item);
      return newScenarios;
    });
  }, []);

  // Share link (encode scenarios in base64)
  const shareLink = useMemo(() => {
    try {
      const data = scenarios.map(({ id, ...rest }) => rest);
      const encoded = btoa(JSON.stringify(data));
      return `${window.location.origin}${window.location.pathname}?scenarios=${encoded}`;
    } catch {
      return '';
    }
  }, [scenarios]);

  const copyShareLink = useCallback(() => {
    navigator.clipboard.writeText(shareLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
    trackScenarioShare();
  }, [shareLink]);

  // Determine best value for highlighting
  const getBestIndex = useCallback(
    (row: ComparisonRow): number | null => {
      if (!row.highlightBest || computedResults.length < 2) return null;
      const values = computedResults.map((cr) => row.getValue(cr.result));
      if (row.highlightBest === 'highest') {
        return values.indexOf(Math.max(...values));
      } else {
        return values.indexOf(Math.min(...values));
      }
    },
    [computedResults]
  );

  // Track scenario comparison open
  useEffect(() => {
    if (isOpen) {
      trackScenarioOpen(scenarios.length);
    }
  }, [isOpen, scenarios.length]);

  return (
    <div id="scenario-comparison" className="scroll-mt-24">
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="border-blue-500/20 bg-card/80 backdrop-blur-sm">
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer pb-4 transition-colors hover:bg-muted/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ArrowRightLeft className="h-5 w-5 text-blue-400" />
                <CardTitle className="text-lg">Compare Tax Scenarios</CardTitle>
                <Badge variant="outline" className="text-xs border-blue-500/30 text-blue-400">
                  New
                </Badge>
              </div>
              <ChevronDown
                className={`h-5 w-5 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </div>
            <CardDescription>
              Compare up to 4 scenarios side by side — different states, 401(k) contributions, or filing statuses
            </CardDescription>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="space-y-6 pt-0">
            {/* ─── Scenario Editors ──────────────────────────────────────── */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {scenarios.map((scenario, idx) => (
                <div
                  key={scenario.id}
                  className={`rounded-xl border p-4 ${
                    idx === 0
                      ? 'border-emerald-500/30 bg-emerald-500/5'
                      : 'border-border/30 bg-card/50'
                  }`}
                >
                  <ScenarioEditor
                    scenario={scenario}
                    onChange={(updated) => updateScenario(scenario.id, updated)}
                    onRemove={() => removeScenario(scenario.id)}
                    canRemove={idx !== 0}
                    isBaseline={idx === 0}
                    onSetBaseline={() => setBaseline(scenario.id)}
                  />
                </div>
              ))}

              {/* Add Scenario Button */}
              {scenarios.length < 4 && (
                <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border/40 p-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => addScenario()}
                    className="text-muted-foreground hover:text-blue-400"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Scenario
                  </Button>
                  <Collapsible open={presetOpen} onOpenChange={setPresetOpen}>
                    <CollapsibleTrigger asChild>
                      <Button variant="link" size="sm" className="text-xs text-muted-foreground">
                        Or use a preset
                        <ChevronDown className={`h-3 w-3 ml-1 transition-transform ${presetOpen ? 'rotate-180' : ''}`} />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="mt-2 space-y-1">
                        {PRESET_SCENARIOS.map((preset, i) => (
                          <Button
                            key={i}
                            variant="ghost"
                            size="sm"
                            onClick={() => addScenario(preset)}
                            className="w-full justify-start text-xs text-muted-foreground hover:text-blue-400 h-7"
                          >
                            {preset.label}
                          </Button>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              )}
            </div>

            {/* ─── Comparison Table ─────────────────────────────────────── */}
            {computedResults.length >= 2 && (
              <div className="overflow-x-auto rounded-xl border border-border/30">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/30 bg-muted/20">
                      <th className="p-3 text-left font-medium text-muted-foreground sticky left-0 bg-muted/20 min-w-[140px]">
                        Breakdown
                      </th>
                      {computedResults.map((cr, idx) => (
                        <th key={cr.scenario.id} className="p-3 text-center min-w-[130px]">
                          <span className={`font-semibold ${idx === 0 ? 'text-emerald-400' : 'text-foreground'}`}>
                            {cr.scenario.label}
                          </span>
                          {idx === 0 && (
                            <span className="block text-[10px] text-emerald-400/60">Baseline</span>
                          )}
                        </th>
                      ))}
                      {baselineResult && computedResults.length > 1 && (
                        <th className="p-3 text-center min-w-[130px] font-medium text-muted-foreground">
                          Difference
                          <span className="block text-[10px] text-muted-foreground/60">vs Baseline</span>
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_ROWS.map((row, rowIdx) => {
                      const bestIdx = getBestIndex(row);
                      return (
                        <tr
                          key={rowIdx}
                          className={`border-b border-border/10 ${
                            row.label === 'Net Take-Home' || row.label === 'Monthly Take-Home'
                              ? 'bg-emerald-500/5 font-semibold'
                              : 'hover:bg-muted/10'
                          }`}
                        >
                          <td className="p-3 text-muted-foreground sticky left-0 bg-inherit whitespace-nowrap">
                            {row.label}
                          </td>
                          {computedResults.map((cr, idx) => {
                            const value = row.getValue(cr.result);
                            const isBest = bestIdx === idx;
                            return (
                              <td
                                key={cr.scenario.id}
                                className={`p-3 text-center ${
                                  isBest ? 'text-emerald-400' : 'text-foreground'
                                }`}
                              >
                                {row.format === 'currency'
                                  ? formatCurrency(value)
                                  : formatPercent(value)}
                                {isBest && row.highlightBest && (
                                  <span className="ml-1">
                                    {row.highlightBest === 'highest' ? (
                                      <TrendingUp className="inline h-3 w-3" />
                                    ) : (
                                      <TrendingDown className="inline h-3 w-3" />
                                    )}
                                  </span>
                                )}
                              </td>
                            );
                          })}
                          {/* Difference column */}
                          {baselineResult && computedResults.length > 1 && (
                            <td className="p-3 text-center">
                              {(() => {
                                // Show difference of last scenario vs baseline
                                const lastResult = computedResults[computedResults.length - 1];
                                const baseVal = row.getValue(baselineResult.result);
                                const lastVal = row.getValue(lastResult.result);
                                const diff = lastVal - baseVal;
                                const pctDiff = baseVal !== 0 ? (diff / baseVal) * 100 : 0;
                                if (Math.abs(diff) < 0.01) return <span className="text-muted-foreground">—</span>;
                                return (
                                  <span className={diff > 0 ? 'text-emerald-400' : 'text-red-400'}>
                                    {diff > 0 ? '+' : ''}
                                    {row.format === 'currency'
                                      ? formatCurrency(diff)
                                      : formatPercent(diff)}
                                    <span className="block text-[10px]">
                                      ({diff > 0 ? '+' : ''}{pctDiff.toFixed(1)}%)
                                    </span>
                                  </span>
                                );
                              })()}
                            </td>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* ─── Insight Summary ──────────────────────────────────────── */}
            {computedResults.length >= 2 && (
              <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
                <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-blue-400" />
                  Quick Insight
                </h4>
                {(() => {
                  const bestNet = computedResults.reduce((best, cr) =>
                    cr.result.netAnnual > best.result.netAnnual ? cr : best
                  );
                  const worstNet = computedResults.reduce((worst, cr) =>
                    cr.result.netAnnual < worst.result.netAnnual ? cr : worst
                  );
                  const savings = bestNet.result.netAnnual - worstNet.result.netAnnual;
                  if (savings < 1) {
                    return (
                      <p className="text-sm text-muted-foreground">
                        All scenarios produce nearly identical take-home pay. Try changing the state or 401(k) contribution to see a bigger difference.
                      </p>
                    );
                  }
                  return (
                    <p className="text-sm text-muted-foreground">
                      <span className="text-emerald-400 font-medium">{bestNet.scenario.label}</span> gives you the highest take-home pay at{' '}
                      <span className="text-emerald-400 font-medium">{formatCurrency(bestNet.result.netAnnual)}/year</span>. That&apos;s{' '}
                      <span className="text-emerald-400 font-medium">{formatCurrency(savings)}</span> more than{' '}
                      <span className="text-red-400 font-medium">{worstNet.scenario.label}</span> ({formatCurrency(worstNet.result.netAnnual)}/year).
                    </p>
                  );
                })()}
              </div>
            )}

            {/* ─── Share Link ───────────────────────────────────────────── */}
            {computedResults.length >= 2 && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyShareLink}
                  className="text-xs text-muted-foreground"
                >
                  {copiedLink ? (
                    <>
                      <Check className="h-3 w-3 mr-1 text-emerald-400" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Share2 className="h-3 w-3 mr-1" />
                      Copy Share Link
                    </>
                  )}
                </Button>
                <span className="text-xs text-muted-foreground">
                  Share this comparison with anyone
                </span>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
    </div>
  );
}
