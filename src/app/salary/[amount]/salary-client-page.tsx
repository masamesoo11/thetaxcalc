'use client';

import Link from 'next/link';
import {
  DollarSign,
  ArrowRight,
  ChevronRight,
  TrendingUp,
  MapPin,
  Calculator,
  HelpCircle,
  CheckCircle2,
  BarChart3,
} from 'lucide-react';
import { useState } from 'react';
import {
  SALARY_AMOUNTS,
  calculateSalaryTakeHome,
  generateFAQs,
  isValidSalaryAmount,
  slugToSalary,
  salaryToSlug,
  formatSalary,
  fmt,
  fmtFull,
  STATE_LABELS,
  type FilingStatus,
} from '@/lib/salary-calculations';
import { SITE_URL } from '@/lib/site-config';

// ─── State to calculator slug mapping ──────────────────────────────────────────

const STATE_KEY_TO_SLUG: Record<string, string> = {
  illinois: '/illinois-tax-calculator',
  texas: '/texas-tax-calculator',
  florida: '/florida-tax-calculator',
  california: '/california-tax-calculator',
  newyork: '/new-york-tax-calculator',
  georgia: '/georgia-tax-calculator',
  virginia: '/virginia-tax-calculator',
  alaska: '/paycheck-calculator',
  nevada: '/paycheck-calculator',
  southdakota: '/paycheck-calculator',
  wyoming: '/paycheck-calculator',
  washington: '/paycheck-calculator',
  tennessee: '/paycheck-calculator',
  newhampshire: '/paycheck-calculator',
  arizona: '/paycheck-calculator',
  colorado: '/paycheck-calculator',
  idaho: '/paycheck-calculator',
  indiana: '/paycheck-calculator',
  kentucky: '/paycheck-calculator',
  michigan: '/paycheck-calculator',
  mississippi: '/paycheck-calculator',
  northcarolina: '/paycheck-calculator',
  pennsylvania: '/paycheck-calculator',
  utah: '/paycheck-calculator',
  alabama: '/paycheck-calculator',
  arkansas: '/paycheck-calculator',
  connecticut: '/paycheck-calculator',
  delaware: '/paycheck-calculator',
  hawaii: '/paycheck-calculator',
  iowa: '/paycheck-calculator',
  kansas: '/paycheck-calculator',
  louisiana: '/paycheck-calculator',
  maine: '/paycheck-calculator',
  maryland: '/paycheck-calculator',
  massachusetts: '/paycheck-calculator',
  minnesota: '/paycheck-calculator',
  missouri: '/paycheck-calculator',
  montana: '/paycheck-calculator',
  nebraska: '/paycheck-calculator',
  newjersey: '/paycheck-calculator',
  newmexico: '/paycheck-calculator',
  northdakota: '/paycheck-calculator',
  ohio: '/paycheck-calculator',
  oklahoma: '/paycheck-calculator',
  oregon: '/paycheck-calculator',
  rhodeisland: '/paycheck-calculator',
  southcarolina: '/paycheck-calculator',
  vermont: '/paycheck-calculator',
  westvirginia: '/paycheck-calculator',
  wisconsin: '/paycheck-calculator',
};

// ─── JSON-LD Schema ───────────────────────────────────────────────────────────
// NOTE: JSON-LD is now generated server-side in page.tsx to avoid duplicate
// structured data. This client component handles UI only.

// ─── Client Component ──────────────────────────────────────────────────────

interface SalaryClientPageProps {
  amountStr: string;
}

export function SalaryClientPage({ amountStr }: SalaryClientPageProps) {
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const [nycResident, setNycResident] = useState(false);
  const [selectedState, setSelectedState] = useState<string>('');
  const salary = slugToSalary(amountStr);
  if (!salary || !isValidSalaryAmount(salary)) return null;

  const calc = calculateSalaryTakeHome(salary, filingStatus, nycResident);
  const faqs = generateFAQs(salary, filingStatus);
  const sortedStates = [...calc.states].sort((a, b) => b.netAnnual - a.netAnnual);
  const currentIndex = SALARY_AMOUNTS.indexOf(salary as (typeof SALARY_AMOUNTS)[number]);
  const prevSalary = currentIndex > 0 ? SALARY_AMOUNTS[currentIndex - 1] : null;
  const nextSalary = currentIndex < SALARY_AMOUNTS.length - 1 ? SALARY_AMOUNTS[currentIndex + 1] : null;

  // Selected state result
  const selectedStateData = selectedState
    ? calc.states.find((s) => s.stateKey === selectedState)
    : null;

  const filingStatusLabel: Record<FilingStatus, string> = {
    single: 'Single',
    married: 'Married Filing Jointly',
    head_of_household: 'Head of Household',
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span className="text-muted-foreground" aria-hidden="true">/</span>
          <Link href="/salary" className="hover:text-foreground transition-colors">Salary</Link>
          <span className="text-muted-foreground" aria-hidden="true">/</span>
          <span className="text-foreground font-medium">{calc.salaryFormatted} After Tax</span>
        </nav>

        {/* Hero Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600/20 to-teal-600/10">
              <DollarSign className="h-6 w-6 text-emerald-400" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1">
              2026 Tax Year
            </span>
          </div>
          {/* H1 is now server-rendered in page.tsx to ensure it's in the initial HTML for SEO */}
          {/* Explicit take-home number for CTR — the #1 thing users search for */}
          <p className="mt-4 text-2xl font-semibold">
            <span className="text-foreground">{calc.salaryFormatted}/year in Texas = </span>
            <span className="text-emerald-400">{fmt(calc.highestNet.netAnnual)} take-home</span>
            <span className="text-muted-foreground text-base font-normal ml-2">(no state tax)</span>
          </p>
          <p className="mt-3 text-lg text-muted-foreground max-w-3xl leading-relaxed">
            Where you live makes a huge difference. Your take-home ranges from{' '}
            <strong className="text-red-400">{fmt(calc.lowestNet.netAnnual)}</strong> in {calc.lowestNet.stateName} to{' '}
            <strong className="text-emerald-400">{fmt(calc.highestNet.netAnnual)}</strong> in {calc.highestNet.stateName}{' '}
            ({filingStatusLabel[filingStatus]}, standard deduction). That&apos;s a{' '}
            <strong className="text-amber-400">{fmt(calc.highestNet.netAnnual - calc.lowestNet.netAnnual)}</strong> gap
            per year — just from choosing a different state.
          </p>
          {/* Filing Status Selector */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">Filing Status:</span>
            {(['single', 'married', 'head_of_household'] as FilingStatus[]).map((status) => (
              <button
                key={status}
                onClick={() => setFilingStatus(status)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  filingStatus === status
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'
                    : 'bg-muted/30 text-muted-foreground hover:bg-muted/50 border border-border/30'
                }`}
              >
                {filingStatusLabel[status]}
              </button>
            ))}
          </div>
          {/* NYC Resident Toggle */}
          <label className="mt-3 flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={nycResident}
              onChange={(e) => setNycResident(e.target.checked)}
              className="h-4 w-4 rounded border-border/50 text-emerald-600 focus:ring-emerald-500/30 accent-emerald-600"
            />
            <span className="text-sm text-muted-foreground">
              NYC Resident <span className="text-xs text-muted-foreground">(adds 3.078%–3.876% city income tax for New York)</span>
            </span>
          </label>

          {/* ─── Quick State Lookup (reduces bounce rate) ─── */}
          <div className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 sm:p-6">
            <h2 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-emerald-400" />
              Find Your Take-Home Pay Instantly
            </h2>
            <p className="text-sm text-muted-foreground mb-3">
              Select your state to see your exact {calc.salaryFormatted} take-home pay — no scrolling through a long table.
            </p>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full max-w-md rounded-lg border border-border/40 bg-background/60 px-4 py-2.5 text-foreground focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value="">— Select Your State —</option>
              {sortedStates.map((s) => (
                <option key={s.stateKey} value={s.stateKey}>
                  {s.stateName} — {fmt(s.netAnnual)}/year
                </option>
              ))}
            </select>
            {selectedStateData && (
              <div className="mt-4 rounded-lg bg-card/80 border border-border/30 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Your take-home in {selectedStateData.stateName}</p>
                    <p className="text-3xl font-bold text-emerald-400">{fmt(selectedStateData.netAnnual)}<span className="text-base font-normal text-muted-foreground">/year</span></p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm text-muted-foreground">Monthly: <strong className="text-foreground">{fmt(selectedStateData.netMonthly)}</strong></p>
                    <p className="text-sm text-muted-foreground">Biweekly: <strong className="text-foreground">${(selectedStateData.netAnnual / 26).toFixed(0)}</strong></p>
                    <p className="text-sm text-muted-foreground">Effective rate: <strong className="text-foreground">{selectedStateData.effectiveTaxRate.toFixed(1)}%</strong></p>
                  </div>
                </div>
                {selectedStateData.stateTax > 0 ? (
                  <p className="mt-3 text-xs text-muted-foreground">
                    State income tax: {fmt(selectedStateData.stateTax)} | Federal: {fmt(selectedStateData.federalTax)} | FICA: {fmt(selectedStateData.ficaTotal)}
                  </p>
                ) : (
                  <p className="mt-3 text-xs text-emerald-400 font-medium">
                    ✅ {selectedStateData.stateName} has NO state income tax — you keep more of your paycheck!
                  </p>
                )}
                <Link
                  href={STATE_KEY_TO_SLUG[selectedStateData.stateKey] || '/paycheck-calculator'}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-400 hover:text-emerald-300"
                >
                  Open {selectedStateData.stateName} Tax Calculator
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Quick Summary Cards — Top States */}
        <section className="mb-12">
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {calc.states.slice(0, 10).map((state) => (
              <Link
                key={state.stateKey}
                href={STATE_KEY_TO_SLUG[state.stateKey]}
                className="group rounded-xl border border-border/30 bg-card/50 p-4 text-center transition-all hover:border-emerald-500/30 hover-lift"
              >
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{state.stateName}</p>
                <p className="mt-2 text-2xl font-bold text-emerald-400">{fmt(state.netAnnual)}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {state.stateTax > 0 ? `${state.stateAbbr} tax: ${fmt(state.stateTax)}` : 'No state tax'}
                </p>
                <p className="mt-2 text-[11px] text-emerald-400 group-hover:underline">View Calculator →</p>
              </Link>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground text-center">
            Showing top 10 states by take-home pay. See full 50-state comparison table below.
          </p>
        </section>

        {/* Comparison Table */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600/20 to-teal-600/10">
              <BarChart3 className="h-5 w-5 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              {calc.salaryFormatted} Take-Home Pay by State
            </h2>
          </div>
          <div className="overflow-x-auto rounded-xl border border-border/30 bg-card/50">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/30 bg-muted/20">
                  <th className="px-4 py-3 text-left font-semibold text-foreground">State</th>
                  <th className="px-4 py-3 text-right font-semibold text-foreground">Federal Tax</th>
                  <th className="px-4 py-3 text-right font-semibold text-foreground">FICA</th>
                  <th className="px-4 py-3 text-right font-semibold text-foreground">State Tax</th>
                  <th className="px-4 py-3 text-right font-semibold text-foreground">Net Pay</th>
                  <th className="px-4 py-3 text-right font-semibold text-foreground">Eff. Rate</th>
                </tr>
              </thead>
              <tbody>
                {sortedStates.map((state, i) => (
                  <tr
                    key={state.stateKey}
                    className={`border-b border-border/10 transition-colors hover:bg-muted/10 ${
                      i === 0 ? 'bg-emerald-500/5' : ''
                    }`}
                  >
                    <td className="px-4 py-3 font-medium text-foreground">
                      <div className="flex items-center gap-2">
                        {i === 0 && <span className="text-emerald-400 text-xs font-bold">★ BEST</span>}
                        {state.stateName}
                        <span className="text-muted-foreground text-xs">({state.stateAbbr})</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right text-red-400">{fmt(state.federalTax)}</td>
                    <td className="px-4 py-3 text-right text-orange-400">{fmt(state.ficaTotal)}</td>
                    <td className="px-4 py-3 text-right text-amber-400">
                      {state.stateTax > 0 ? fmt(state.stateTax) : '$0'}
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-emerald-400">{fmt(state.netAnnual)}</td>
                    <td className="px-4 py-3 text-right text-muted-foreground">{state.effectiveTaxRate.toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* State Breakdown Cards — Top 5 + Worst State */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600/20 to-teal-600/10">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              {calc.salaryFormatted} — Top States Breakdown
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sortedStates.slice(0, 6).map((state, i) => {
              const stateColor: Record<string, string> = {
                illinois: 'from-blue-600/20 to-indigo-600/10',
                texas: 'from-red-600/20 to-orange-600/10',
                florida: 'from-amber-600/20 to-yellow-600/10',
                california: 'from-violet-600/20 to-purple-600/10',
                newyork: 'from-cyan-600/20 to-sky-600/10',
              };
              return (
                <div key={state.stateKey} className="rounded-xl border border-border/30 bg-card/50 p-5 hover:border-emerald-500/20 transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${stateColor[state.stateKey] || ''}`}>
                      <MapPin className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {i === 0 && <span className="text-emerald-400 text-xs font-bold mr-1">★ BEST</span>}
                        {state.stateName}
                      </h3>
                      <p className="text-xs text-muted-foreground">{state.stateAbbr} resident · {filingStatusLabel[filingStatus]}</p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-lg font-bold text-emerald-400">{fmt(state.netAnnual)}</p>
                      <p className="text-[11px] text-muted-foreground">annual take-home</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Gross Salary</span>
                      <span className="font-medium text-foreground">{fmt(state.grossAnnual)}</span>
                    </div>
                    <div className="divider-glow" />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Federal Tax</span>
                      <span className="text-red-400">−{fmtFull(state.federalTax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">FICA (SS + Medicare)</span>
                      <span className="text-orange-400">−{fmtFull(state.ficaTotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">State Tax</span>
                      <span className={state.stateTax > 0 ? 'text-amber-400' : 'text-emerald-400'}>
                        {state.stateTax > 0 ? `−${fmtFull(state.stateTax)}` : '$0 (no state tax)'}
                      </span>
                    </div>
                    <div className="divider-glow" />
                    <div className="flex justify-between text-base font-semibold">
                      <span className="text-foreground">Net Annual Pay</span>
                      <span className="text-emerald-400">{fmtFull(state.netAnnual)}</span>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-3 rounded-lg bg-muted/20 p-3 text-center">
                    <div>
                      <p className="text-[11px] text-muted-foreground">Monthly</p>
                      <p className="text-sm font-semibold text-foreground">{fmt(state.netMonthly)}</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-muted-foreground">Bi-weekly</p>
                      <p className="text-sm font-semibold text-foreground">{fmt(state.netBiweekly)}</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-muted-foreground">Weekly</p>
                      <p className="text-sm font-semibold text-foreground">{fmt(state.netWeekly)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Showing top 6 states by take-home pay. All calculations assume {filingStatusLabel[filingStatus]} filing status with standard deduction ($16,100 single / $32,200 married / $24,150 HOH), and no pre-tax deductions (401(k), HSA).
            FICA includes Social Security (6.2% up to $184,500) and Medicare (1.45% + 0.9% additional above $200,000 single / $250,000 married).
            Full 50-state comparison available in the table above.
          </p>
        </section>

        {/* Is This a Good Salary? */}
        <section className="mb-12 py-10 rounded-2xl border border-border/30 bg-card/30 px-6 sm:px-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600/20 to-teal-600/10">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              Is {calc.salaryFormatted} a Good Salary?
            </h2>
          </div>
          <div className="text-muted-foreground leading-relaxed space-y-4 max-w-4xl">
            <p>{faqs.find((f) => f.question.includes('good salary'))?.answer}</p>
            <div className="grid gap-3 sm:grid-cols-3 mt-6">
              <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-4 text-center">
                <p className="text-xs text-emerald-400 font-medium">Best State</p>
                <p className="mt-1 text-lg font-bold text-foreground">{calc.highestNet.stateName}</p>
                <p className="text-sm text-emerald-400">{fmt(calc.highestNet.netAnnual)}/yr</p>
              </div>
              <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-4 text-center">
                <p className="text-xs text-amber-400 font-medium">Avg State</p>
                <p className="mt-1 text-lg font-bold text-foreground">Illinois</p>
                <p className="text-sm text-amber-400">
                  {fmt(calc.states.find((s) => s.stateKey === 'illinois')?.netAnnual || 0)}/yr
                </p>
              </div>
              <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-4 text-center">
                <p className="text-xs text-red-400 font-medium">Highest Tax</p>
                <p className="mt-1 text-lg font-bold text-foreground">{calc.lowestNet.stateName}</p>
                <p className="text-sm text-red-400">{fmt(calc.lowestNet.netAnnual)}/yr</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 border-t border-border/20">
          <div className="mx-auto max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600/20 to-teal-600/10">
                <HelpCircle className="h-5 w-5 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                {calc.salaryFormatted} Salary Tax FAQ
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-border/30 bg-card/50 overflow-hidden"
                >
                  <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-base font-medium text-foreground hover:bg-muted/10 transition-colors list-none">
                    {faq.question}
                    <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-90" />
                  </summary>
                  <div className="px-6 pb-4 text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 border-t border-border/20">
          <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-600/10 to-teal-600/5 p-8 sm:p-12 text-center">
            <Calculator className="h-10 w-10 text-emerald-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Calculate Your {calc.salaryFormatted} Take-Home Pay
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-6">
              Our paycheck calculator lets you add 401(k), HSA, and other pre-tax deductions
              to get a precise number for your situation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/paycheck-calculator"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all hover:scale-[1.02]"
              >
                <BarChart3 className="h-5 w-5" />
                Open Paycheck Calculator
              </Link>
              <Link
                href="/relocation-calculator"
                className="inline-flex items-center gap-2 rounded-xl border border-border/50 bg-card/50 px-8 py-3.5 text-base font-semibold text-foreground hover:bg-muted/30 transition-all"
              >
                <ArrowRight className="h-5 w-5" />
                Compare States
              </Link>
            </div>
          </div>
        </section>

        {/* Salary Navigation */}
        <section className="py-8 border-t border-border/20">
          <div className="flex items-center justify-between">
            {prevSalary ? (
              <Link
                href={`/salary/${salaryToSlug(prevSalary)}`}
                className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronRight className="h-4 w-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                {formatSalary(prevSalary)} After Tax
              </Link>
            ) : <span />}
            <Link
              href="/salary"
              className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              View All Salaries
            </Link>
            {nextSalary ? (
              <Link
                href={`/salary/${salaryToSlug(nextSalary)}`}
                className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {formatSalary(nextSalary)} After Tax
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : <span />}
          </div>
        </section>
    </div>
  );
}
