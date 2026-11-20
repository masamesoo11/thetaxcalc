'use client';

/**
 * HeroCalculator — the live take-home-pay calculator embedded in the homepage
 * hero (A+ redesign, Task 32). Reuses the site's REAL calculation engine
 * (calculateSalaryTakeHome) so the math is identical to /paycheck-calculator —
 * no drifted mockup math. Client-side only; zero API calls.
 */

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  calculateSalaryTakeHome,
  STATE_KEYS,
  STATE_LABELS,
  type FilingStatus,
} from '@/lib/salary-calculations';
import { ArrowRight, Calculator, Check, ChevronDown, Copy } from 'lucide-react';

const PERIODS = [
  { key: 'annual', label: 'Per year', divisor: 1 },
  { key: 'monthly', label: 'Per month', divisor: 12 },
  { key: 'biweekly', label: 'Per 2 weeks', divisor: 26 },
  { key: 'weekly', label: 'Per week', divisor: 52 },
] as const;

type PeriodKey = (typeof PERIODS)[number]['key'];

const FILING_STATUSES: { key: FilingStatus; label: string }[] = [
  { key: 'single', label: 'Single' },
  { key: 'married', label: 'Married' },
  { key: 'head_of_household', label: 'Head of Household' },
];

function usd(amount: number): string {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
}

export function HeroCalculator() {
  const [salaryInput, setSalaryInput] = useState('75000');
  const [stateKey, setStateKey] = useState<string>('illinois');
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const [period, setPeriod] = useState<PeriodKey>('monthly');
  const [copied, setCopied] = useState(false);

  const salary = useMemo(() => {
    const n = Number(salaryInput.replace(/[^0-9.]/g, ''));
    return Number.isFinite(n) ? Math.min(Math.max(n, 0), 100_000_000) : 0;
  }, [salaryInput]);

  const result = useMemo(
    () => calculateSalaryTakeHome(salary, filingStatus),
    [salary, filingStatus]
  );

  const state = useMemo(
    () => result.states.find((s) => s.stateKey === stateKey) ?? result.states[0],
    [result, stateKey]
  );

  const periodDef = PERIODS.find((p) => p.key === period) ?? PERIODS[1];
  const div = periodDef.divisor;

  const breakdown = useMemo(() => {
    if (!state || salary <= 0) return null;
    return [
      { label: 'Federal income tax', value: state.federalTax / div },
      { label: 'Social Security (6.2%)', value: state.ficaSS / div },
      { label: 'Medicare (1.45%)', value: state.ficaMedicare / div },
      {
        label: `${state.stateName} state income tax`,
        value: state.stateTax / div,
        zeroNote: state.stateTax === 0 ? 'No state income tax' : undefined,
      },
      { label: 'Total deductions', value: state.totalDeductions / div, strong: true },
    ];
  }, [state, div, salary]);

  const net = state ? state.netAnnual / div : 0;
  const effective = state ? state.effectiveTaxRate : 0;
  const gross = salary / div;

  const shares = useMemo(() => {
    if (!state || salary <= 0) return null;
    const netPct = Math.max(0, Math.min(100, (state.netAnnual / salary) * 100));
    const fedPct = Math.max(0, (state.federalTax / salary) * 100);
    const ficaPct = Math.max(0, ((state.ficaSS + state.ficaMedicare) / salary) * 100);
    const statePct = Math.max(0, (state.stateTax / salary) * 100);
    return { netPct, fedPct, ficaPct, statePct };
  }, [state, salary]);

  const paycheckHref = useMemo(() => {
    const params = new URLSearchParams();
    if (salary > 0) params.set('salary', String(Math.round(salary)));
    if (stateKey) params.set('state', stateKey);
    if (filingStatus) params.set('filing', filingStatus);
    params.set('frequency', 'annual');
    return `/paycheck-calculator#home?${params.toString()}`;
  }, [salary, stateKey, filingStatus]);

  const handleCopy = async () => {
    if (!state || salary <= 0) return;
    const periodWord = periodDef.label.toLowerCase();
    const summary = `${usd(Math.round(salary))}/yr in ${state.stateName} (${filingStatus.replaceAll('_', ' ')}): ${usd(Math.round(net))} ${periodWord} take-home (${(effective * 100).toFixed(1)}% effective tax) — https://thetaxcalc.com${paycheckHref}`;
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (non-secure context or denied)
    }
  };

  return (
    <div
      className="relative rounded-2xl border border-[#e7e0d0] bg-white p-5 sm:p-6 shadow-[0_1px_2px_rgba(28,25,23,0.04),0_8px_32px_-8px_rgba(138,106,36,0.12)]"
      aria-label="Live paycheck calculator"
    >
      {/* Inputs */}
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#78716c]">
            Annual salary
          </span>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#a8a29e]">
              $
            </span>
            <input
              type="text"
              inputMode="decimal"
              value={salaryInput}
              onChange={(e) => setSalaryInput(e.target.value)}
              className="w-full rounded-lg border border-[#e7e0d0] bg-[#fafaf9] py-2.5 pl-7 pr-3 text-sm font-semibold text-[#1c1917] outline-none transition focus:border-[#b08d3e] focus:ring-2 focus:ring-[#b08d3e]/20"
              placeholder="75,000"
              aria-label="Annual salary in dollars"
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#78716c]">
            State
          </span>
          <div className="relative">
            <select
              value={stateKey}
              onChange={(e) => setStateKey(e.target.value)}
              className="w-full appearance-none rounded-lg border border-[#e7e0d0] bg-[#fafaf9] py-2.5 pl-3 pr-9 text-sm font-semibold text-[#1c1917] outline-none transition focus:border-[#b08d3e] focus:ring-2 focus:ring-[#b08d3e]/20 cursor-pointer"
              aria-label="Your state"
            >
              {STATE_KEYS.map((key) => (
                <option key={key} value={key}>
                  {STATE_LABELS[key]?.name ?? key}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#78716c]"
            />
          </div>
        </label>

        <div className="sm:col-span-2">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#78716c]">
            Filing status
          </span>
          <div
            className="flex overflow-hidden rounded-lg border border-[#e7e0d0] bg-[#fafaf9] p-0.5"
            role="radiogroup"
            aria-label="Filing status"
          >
            {FILING_STATUSES.map((f) => (
              <button
                key={f.key}
                type="button"
                role="radio"
                aria-checked={filingStatus === f.key}
                onClick={() => setFilingStatus(f.key)}
                className={`flex-1 rounded-md px-2 py-2 text-xs font-semibold transition ${
                  filingStatus === f.key
                    ? 'bg-[#1c1917] text-white shadow-sm'
                    : 'text-[#78716c] hover:text-[#1c1917]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <label className="block sm:col-span-2">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#78716c]">
            Pay period
          </span>
          <div className="relative">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value as PeriodKey)}
              className="w-full appearance-none rounded-lg border border-[#e7e0d0] bg-[#fafaf9] py-2.5 pl-3 pr-9 text-sm font-semibold text-[#1c1917] outline-none transition focus:border-[#b08d3e] focus:ring-2 focus:ring-[#b08d3e]/20 cursor-pointer"
              aria-label="Pay period"
            >
              {PERIODS.map((p) => (
                <option key={p.key} value={p.key}>
                  {p.label}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#78716c]"
            />
          </div>
        </label>
      </div>

      {/* Result */}
      <div
        className="mt-5 rounded-xl border border-[#b08d3e]/25 bg-gradient-to-b from-[#faf5e9] to-white p-4 sm:p-5"
        aria-live="polite"
      >
        <div className="flex items-start justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#8a6a24]">
            You take home{' '}
            <span className="font-normal normal-case tracking-normal text-[#78716c]">
              ({periodDef.label.toLowerCase().replace('per ', '')}, after tax)
            </span>
          </p>
          {salary > 0 && (
            <button
              type="button"
              onClick={handleCopy}
              aria-label="Copy calculation summary"
              className="inline-flex shrink-0 items-center gap-1 rounded-md border border-[#e7e0d0] bg-white px-2 py-1 text-[11px] font-semibold text-[#57534e] transition hover:border-[#b08d3e]/50 hover:text-[#8a6a24]"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-[#8a6a24]" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  Copy
                </>
              )}
            </button>
          )}
        </div>
        <p className="mt-1 text-4xl font-bold tracking-tight text-[#1c1917]">
          {salary > 0 ? usd(Math.round(net)) : usd(0)}
          <span className="ml-2 align-middle text-sm font-semibold text-[#8a6a24]">
            from {usd(Math.round(gross))} gross
          </span>
        </p>

        {/* Visual Paycheck Split Bar */}
        {shares && (
          <div className="mt-3">
            <div
              className="flex h-2.5 w-full overflow-hidden rounded-full bg-[#f0ece3]"
              role="img"
              aria-label={`Take-home ${shares.netPct.toFixed(0)}%, Federal tax ${shares.fedPct.toFixed(0)}%, FICA ${shares.ficaPct.toFixed(0)}%, State tax ${shares.statePct.toFixed(0)}%`}
            >
              <div
                style={{ width: `${shares.netPct}%` }}
                className="bg-[#8a6a24] transition-all duration-300"
              />
              <div
                style={{ width: `${shares.fedPct}%` }}
                className="bg-[#dc2626]/80 transition-all duration-300"
              />
              <div
                style={{ width: `${shares.ficaPct}%` }}
                className="bg-[#d97706]/80 transition-all duration-300"
              />
              {shares.statePct > 0 && (
                <div
                  style={{ width: `${shares.statePct}%` }}
                  className="bg-[#57534e]/75 transition-all duration-300"
                />
              )}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[#57534e]">
              <span className="inline-flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-[#8a6a24]" />
                Keep {shares.netPct.toFixed(0)}%
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-[#dc2626]/80" />
                Fed {shares.fedPct.toFixed(0)}%
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-[#d97706]/80" />
                FICA {shares.ficaPct.toFixed(0)}%
              </span>
              {shares.statePct > 0 && (
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-[#57534e]/75" />
                  State {shares.statePct.toFixed(0)}%
                </span>
              )}
            </div>
          </div>
        )}

        {breakdown && salary > 0 && (
          <div className="mt-4 space-y-2 border-t border-[#b08d3e]/20 pt-3 text-sm">
            {breakdown.map((row) => (
              <div
                key={row.label}
                className={`flex items-baseline justify-between gap-3 ${
                  row.strong ? 'pt-2 border-t border-dashed border-[#e7e0d0] mt-2' : ''
                }`}
              >
                <span
                  className={
                    row.strong
                      ? 'text-sm font-semibold text-[#1c1917]'
                      : 'text-[#78716c]'
                  }
                >
                  {row.label}
                  {row.zeroNote && (
                    <span className="ml-1.5 rounded-full bg-[#b08d3e]/10 px-2 py-0.5 text-[10px] font-semibold text-[#8a6a24]">
                      {row.zeroNote}
                    </span>
                  )}
                </span>
                <span
                  className={`shrink-0 tabular-nums ${
                    row.strong
                      ? 'font-bold text-[#1c1917]'
                      : 'font-medium text-[#57534e]'
                  }`}
                >
                  −{usd(Math.round(row.value))}
                </span>
              </div>
            ))}
            <div className="flex items-baseline justify-between gap-3 pt-1">
              <span className="text-[#78716c]">Effective tax rate</span>
              <span className="shrink-0 font-semibold tabular-nums text-[#8a6a24]">
                {(effective * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        )}
      </div>

      {/* CTA to the full calculator (carries salary, state, filing & pay period) */}
      <Link
        prefetch={false}
        href={paycheckHref}
        className="group mt-4 flex items-center justify-between gap-2 rounded-xl bg-[#1c1917] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#8a6a24]"
      >
        <span className="inline-flex items-center gap-2">
          <Calculator className="h-4 w-4" />
          Open full breakdown (401(k), HSA &amp; scenarios)
        </span>
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
