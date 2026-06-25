/**
 * Server-rendered SEO content for state-vs-state compare pages.
 * Adds 700-1000 words of meaningful content so Google can index the page properly
 * (the interactive comparison widget is client-rendered via ssr:false).
 */

import Link from 'next/link';
import { calculateSalaryTakeHome, fmt, formatSalary } from '@/lib/salary-calculations';
import type { CompareStateData, CompareConfig } from '@/lib/compare-config';

interface Props {
  config: CompareConfig;
}

export function CompareSSRContent({ config }: Props) {
  const { state1: s1, state2: s2, faqs } = config;

  // Calculate take-home at $75K and $150K for both states
  const SALARY_POINTS = [50000, 75000, 100000, 150000, 200000];
  const calc1 = SALARY_POINTS.map((sal) => ({
    salary: sal,
    data: calculateSalaryTakeHome(sal).states.find((s) => s.stateKey === s1.taxConfigKey)!,
  }));
  const calc2 = SALARY_POINTS.map((sal) => ({
    salary: sal,
    data: calculateSalaryTakeHome(sal).states.find((s) => s.stateKey === s2.taxConfigKey)!,
  }));

  // Differences
  const savings75k = calc2[1].data.netAnnual - calc1[1].data.netAnnual; // s2 - s1
  const savings150k = calc2[4].data.netAnnual - calc1[4].data.netAnnual;
  const savings100k = calc2[2].data.netAnnual - calc1[2].data.netAnnual;

  // Which state is cheaper (higher take-home)?
  const cheaperState = savings75k >= 0 ? s2 : s1;
  const expensiveState = savings75k >= 0 ? s1 : s2;
  const savingsLabel = Math.abs(savings75k);

  // Property tax on $400K home
  const homeValue = 400000;
  const prop1Annual = homeValue * s1.propertyTaxRate;
  const prop2Annual = homeValue * s2.propertyTaxRate;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-12">
      {/* ─── Quick Verdict ──────────────────────────────────── */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          {s1.name} vs {s2.name} Taxes — Quick Verdict
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Comparing {s1.name} ({s1.incomeTaxLabel} income tax) vs {s2.name} ({s2.incomeTaxLabel} income tax)
          for the 2026 tax year, <strong className="text-foreground">{cheaperState.name} saves you about{' '}
          {fmt(savingsLabel)} per year</strong> on a $75,000 single-filer salary. The gap widens at
          higher incomes — on $150,000, {cheaperState.name} saves you approximately{' '}
          <strong className="text-foreground">{fmt(Math.abs(savings150k))}</strong> annually.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          The biggest tax difference comes from state income tax. {s1.name}'s rate is{' '}
          <strong className="text-foreground">{s1.incomeTaxLabel}</strong>, while {s2.name}'s rate is{' '}
          <strong className="text-foreground">{s2.incomeTaxLabel}</strong>. However, also consider
          property taxes — on a ${homeValue.toLocaleString()} home, {s1.name} charges about{' '}
          {fmt(prop1Annual)}/year ({(s1.propertyTaxRate * 100).toFixed(2)}%) vs {s2.name}'s{' '}
          {fmt(prop2Annual)}/year ({(s2.propertyTaxRate * 100).toFixed(2)}%).
        </p>
      </section>

      {/* ─── Take-Home Comparison Table ────────────────────── */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Take-Home Pay Comparison: {s1.name} vs {s2.name}
        </h2>
        <p className="text-muted-foreground mb-4">
          This table shows your annual take-home pay (after federal tax, FICA, and state tax) at
          different salary levels for single filers claiming the standard deduction. The "Difference"
          column shows how much more (or less) you'd take home living in {s2.name} vs {s1.name}.
        </p>
        <div className="overflow-x-auto rounded-xl border border-border/30">
          <table className="w-full text-sm">
            <thead className="bg-muted/30">
              <tr>
                <th className="text-left p-3 font-semibold text-foreground">Salary</th>
                <th className="text-right p-3 font-semibold text-foreground">{s1.name} ({s1.abbreviation})</th>
                <th className="text-right p-3 font-semibold text-foreground">{s2.name} ({s2.abbreviation})</th>
                <th className="text-right p-3 font-semibold text-foreground">Difference</th>
                <th className="text-right p-3 font-semibold text-foreground">Winner</th>
              </tr>
            </thead>
            <tbody>
              {SALARY_POINTS.map((sal, i) => {
                const net1 = calc1[i].data.netAnnual;
                const net2 = calc2[i].data.netAnnual;
                const diff = net2 - net1;
                return (
                  <tr key={sal} className="border-t border-border/20">
                    <td className="p-3 font-medium text-foreground">{formatSalary(sal)}</td>
                    <td className="p-3 text-right text-foreground">{fmt(net1)}</td>
                    <td className="p-3 text-right text-foreground">{fmt(net2)}</td>
                    <td className={`p-3 text-right font-medium ${diff >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {diff >= 0 ? '+' : ''}{fmt(diff)}
                    </td>
                    <td className="p-3 text-right text-muted-foreground">
                      {diff > 0 ? s2.abbreviation : diff < 0 ? s1.abbreviation : 'Tie'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          * Calculations assume single filing status, 2026 standard deduction, and no pre-tax
          contributions (401(k), HSA). NYC residents pay additional city tax not shown in this table.
        </p>
      </section>

      {/* ─── Tax Breakdown Detail ──────────────────────────── */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Tax Breakdown on $100,000 Salary
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <TaxBreakdownCard
            state={s1}
            salary={100000}
            takeHome={calc1[2].data}
          />
          <TaxBreakdownCard
            state={s2}
            salary={100000}
            takeHome={calc2[2].data}
          />
        </div>
        <p className="text-muted-foreground leading-relaxed mt-4">
          On a $100,000 salary, your take-home in {s1.name} is{' '}
          <strong className="text-foreground">{fmt(calc1[2].data.netAnnual)}</strong> vs{' '}
          <strong className="text-foreground">{fmt(calc2[2].data.netAnnual)}</strong> in {s2.name}.
          The difference of <strong className="text-foreground">{fmt(Math.abs(savings100k))}</strong>{' '}
          per year ({cheaperState.name} wins) compounds significantly over a career — over 10 years,
          that's approximately <strong className="text-foreground">{fmt(Math.abs(savings100k) * 10)}</strong>{' '}
          in additional take-home pay (before investment returns).
        </p>
      </section>

      {/* ─── Property & Sales Tax ──────────────────────────── */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Beyond Income Tax: Property &amp; Sales Tax
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Income tax isn't the whole story. Both {s1.name} and {s2.name} collect revenue from other
          sources, and these can offset (or worsen) income tax differences.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-border/30 bg-card/50 p-5">
            <h3 className="font-semibold text-foreground mb-3">Property Tax (on $400K Home)</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{s1.name}</span>
                <span className="text-foreground font-medium">{fmt(prop1Annual)}/yr ({(s1.propertyTaxRate * 100).toFixed(2)}%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{s2.name}</span>
                <span className="text-foreground font-medium">{fmt(prop2Annual)}/yr ({(s2.propertyTaxRate * 100).toFixed(2)}%)</span>
              </div>
              <div className="flex justify-between border-t border-border/20 pt-2 mt-2">
                <span className="text-muted-foreground">Annual Difference</span>
                <span className={`font-medium ${prop2Annual < prop1Annual ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {fmt(prop2Annual - prop1Annual)}
                </span>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border/30 bg-card/50 p-5">
            <h3 className="font-semibold text-foreground mb-3">Sales Tax (Combined Avg.)</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{s1.name}</span>
                <span className="text-foreground font-medium">{(s1.salesTaxRate * 100).toFixed(2)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{s2.name}</span>
                <span className="text-foreground font-medium">{(s2.salesTaxRate * 100).toFixed(2)}%</span>
              </div>
              <div className="flex justify-between border-t border-border/20 pt-2 mt-2">
                <span className="text-muted-foreground">On $40K Spending</span>
                <span className="text-foreground font-medium">
                  {fmt(40000 * (s2.salesTaxRate - s1.salesTaxRate))} diff
                </span>
              </div>
            </div>
          </div>
        </div>
        <p className="text-muted-foreground leading-relaxed mt-4">
          {s1.extraNotes && <span>{s1.name}: {s1.extraNotes}. </span>}
          {s2.extraNotes && <span>{s2.name}: {s2.extraNotes}. </span>}
          Use our <Link href="/relocation-calculator" className="text-emerald-400 hover:underline">Relocation Calculator</Link>{' '}
          for a personalized salary comparison factoring in cost-of-living differences.
        </p>
      </section>

      {/* ─── Methodology ───────────────────────────────────── */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Methodology</h2>
        <p className="text-muted-foreground leading-relaxed mb-3">
          Our {s1.name} vs {s2.name} tax comparison uses the official 2026 tax brackets published by
          the IRS and each state's Department of Revenue. For single filers, we apply:
        </p>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex gap-2">
            <span className="text-emerald-400">•</span>
            <span>Federal standard deduction of $16,100 with progressive brackets from 10% to 37%</span>
          </li>
          <li className="flex gap-2">
            <span className="text-emerald-400">•</span>
            <span>FICA: 6.2% Social Security (cap at $184,500) + 1.45% Medicare on all wages</span>
          </li>
          <li className="flex gap-2">
            <span className="text-emerald-400">•</span>
            <span>{s1.name} state tax: {s1.incomeTaxLabel} ({(s1.incomeTaxRate * 100).toFixed(2)}% effective)</span>
          </li>
          <li className="flex gap-2">
            <span className="text-emerald-400">•</span>
            <span>{s2.name} state tax: {s2.incomeTaxLabel} ({(s2.incomeTaxRate * 100).toFixed(2)}% effective)</span>
          </li>
          <li className="flex gap-2">
            <span className="text-emerald-400">•</span>
            <span>No pre-tax deductions (401(k), HSA, FSA) — for those, use our <Link href="/paycheck-calculator" className="text-emerald-400 hover:underline">Paycheck Calculator</Link></span>
          </li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mt-3">
          All figures are for single filers. Married filing jointly and head of household will have
          different results — see our <Link href="/federal-tax-brackets" className="text-emerald-400 hover:underline">2026 Federal Tax Brackets</Link>{' '}
          guide for full bracket details.
        </p>
      </section>

      {/* ─── Internal Links ────────────────────────────────── */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Related State Tax Resources</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-border/30 bg-card/50 p-5">
            <h3 className="font-semibold text-foreground mb-3">State Calculators</h3>
            <div className="space-y-1.5">
              <Link href={s1.calculatorSlug} className="block text-sm text-muted-foreground hover:text-emerald-400">
                {s1.name} Tax Calculator
              </Link>
              <Link href={s2.calculatorSlug} className="block text-sm text-muted-foreground hover:text-emerald-400">
                {s2.name} Tax Calculator
              </Link>
              <Link href="/compare" className="block text-sm text-muted-foreground hover:text-emerald-400">
                All State Comparisons
              </Link>
            </div>
          </div>
          <div className="rounded-xl border border-border/30 bg-card/50 p-5">
            <h3 className="font-semibold text-foreground mb-3">Salary Pages</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { amount: 50000, label: '$50K' },
                { amount: 75000, label: '$75K' },
                { amount: 100000, label: '$100K' },
                { amount: 150000, label: '$150K' },
              ].map((x) => (
                <Link
                  key={x.amount}
                  href={`/salary/${x.amount}-after-taxes`}
                  className="inline-flex items-center rounded-lg border border-border/50 bg-muted/20 px-3 py-1.5 text-xs font-medium text-foreground hover:border-emerald-500/30 hover:text-emerald-400 transition-all"
                >
                  {x.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-border/30 bg-card/50 p-5">
            <h3 className="font-semibold text-foreground mb-3">Useful Tools</h3>
            <div className="space-y-1.5">
              <Link href="/paycheck-calculator" className="block text-sm text-muted-foreground hover:text-emerald-400">Paycheck Calculator</Link>
              <Link href="/relocation-calculator" className="block text-sm text-muted-foreground hover:text-emerald-400">Relocation Calculator</Link>
              <Link href="/401k-retirement-calculator" className="block text-sm text-muted-foreground hover:text-emerald-400">401(k) Calculator</Link>
              <Link href="/property-tax-calculator" className="block text-sm text-muted-foreground hover:text-emerald-400">Property Tax Calculator</Link>
              <Link href="/sales-tax-calculator" className="block text-sm text-muted-foreground hover:text-emerald-400">Sales Tax Calculator</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ Section ───────────────────────────────────── */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          {s1.name} vs {s2.name} Taxes — Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <details key={i} className="group rounded-xl border border-border/30 bg-card/50 overflow-hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-3 p-4 text-left font-medium text-foreground hover:bg-muted/10 transition-colors">
                <span className="text-sm sm:text-base">{faq.question}</span>
                <span className="text-muted-foreground text-xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">{faq.answer}</div>
            </details>
          ))}
          {/* Add a couple of dynamic FAQs */}
          <details className="group rounded-xl border border-border/30 bg-card/50 overflow-hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-3 p-4 text-left font-medium text-foreground hover:bg-muted/10 transition-colors">
              <span className="text-sm sm:text-base">How much would I save moving from {s1.name} to {s2.name} on a $75K salary?</span>
              <span className="text-muted-foreground text-xl group-open:rotate-45 transition-transform">+</span>
            </summary>
            <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">
              On a $75,000 single-filer salary, moving from {s1.name} to {s2.name} would change your
              annual take-home pay by {savings75k >= 0 ? '+' : ''}{fmt(savings75k)}.{' '}
              {savings75k > 0
                ? `${s2.name} is the better choice financially.`
                : savings75k < 0
                ? `${s1.name} is the better choice financially.`
                : `Both states give you similar take-home pay.`}{' '}
              This calculation uses 2026 federal brackets, FICA, and each state's standard deduction.
              Factor in cost-of-living differences, housing prices, and personal lifestyle before deciding.
            </div>
          </details>
          <details className="group rounded-xl border border-border/30 bg-card/50 overflow-hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-3 p-4 text-left font-medium text-foreground hover:bg-muted/10 transition-colors">
              <span className="text-sm sm:text-base">Does {s1.name} or {s2.name} have higher property taxes?</span>
              <span className="text-muted-foreground text-xl group-open:rotate-45 transition-transform">+</span>
            </summary>
            <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">
              {s1.name}'s average effective property tax rate is {(s1.propertyTaxRate * 100).toFixed(2)}%, while
              {' '}{s2.name}'s is {(s2.propertyTaxRate * 100).toFixed(2)}%. On a $400,000 home, that's
              {' '}{fmt(prop1Annual)}/year in {s1.name} vs {fmt(prop2Annual)}/year in {s2.name} —
              a difference of {fmt(Math.abs(prop2Annual - prop1Annual))}/year.{' '}
              {prop2Annual > prop1Annual
                ? `${s1.name} has the lower property tax.`
                : prop2Annual < prop1Annual
                ? `${s2.name} has the lower property tax.`
                : `Property taxes are similar in both states.`}{' '}
              Property taxes can offset income tax savings significantly, especially for homeowners.
            </div>
          </details>
        </div>
      </section>
    </div>
  );
}

// ─── Tax Breakdown Card ───────────────────────────────────────────────────────

import type { StateTakeHome } from '@/lib/salary-calculations';

function TaxBreakdownCard({
  state,
  salary,
  takeHome,
}: {
  state: CompareStateData;
  salary: number;
  takeHome: StateTakeHome;
}) {
  return (
    <div className="rounded-xl border border-border/30 bg-card/50 p-5">
      <h3 className="font-semibold text-foreground mb-3">{state.name} — Tax Breakdown</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Gross Salary</span>
          <span className="text-foreground font-medium">{fmt(salary)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">− Federal Tax</span>
          <span className="text-rose-400">{fmt(takeHome.federalTax)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">− FICA (SS + Medicare)</span>
          <span className="text-rose-400">{fmt(takeHome.ficaTotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">− State Tax</span>
          <span className="text-rose-400">{fmt(takeHome.stateTax)}</span>
        </div>
        <div className="flex justify-between border-t border-border/20 pt-2 mt-2">
          <span className="font-semibold text-foreground">= Take-Home</span>
          <span className="font-bold text-emerald-400">{fmt(takeHome.netAnnual)}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Effective Tax Rate</span>
          <span className="text-muted-foreground">{takeHome.effectiveTaxRate.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
}
