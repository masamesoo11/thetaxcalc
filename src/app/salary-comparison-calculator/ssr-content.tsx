/**
 * SSR SEO Content section for Salary Comparison Calculator.
 * Adds 600+ words of content beyond what's already on the page.
 */

import Link from 'next/link';
import { calculateSalaryTakeHome, formatSalary, fmt } from '@/lib/salary-calculations';

const SCENARIOS = [
  { salary: 75000, state1: 'texas', state2: 'california' },
  { salary: 100000, state1: 'florida', state2: 'newyork' },
  { salary: 150000, state1: 'washington', state2: 'california' },
];

export function SalaryComparisonSSRContent() {
  // Generate comparison data for table
  const comparisonData = SCENARIOS.map(({ salary, state1, state2 }) => {
    const calc = calculateSalaryTakeHome(salary);
    const s1 = calc.states.find((s) => s.stateKey === state1)!;
    const s2 = calc.states.find((s) => s.stateKey === state2)!;
    return {
      salary,
      formatted: formatSalary(salary),
      state1: s1,
      state2: s2,
      diff: s1.netAnnual - s2.netAnnual,
    };
  });

  return (
    <>
      {/* ─── When to Use Section ─────────────────────────── */}
      <section className="mb-10 space-y-6">
        <h2 className="text-2xl font-bold text-foreground">
          When to Use a <span className="gradient-text">Salary Comparison Calculator</span>
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          There are five common situations where comparing after-tax salaries is essential for making
          a smart financial decision. First, when you receive a job offer in a different state — a
          $120,000 offer in California may actually pay less than a $110,000 offer in Texas after state
          income tax. Second, when your employer offers remote work — you may be able to relocate to a
          no-income-tax state without changing jobs. Third, when comparing two job offers with different
          base salaries, bonus structures, or benefit packages. Fourth, when planning a relocation for
          personal reasons (family, lifestyle) and you need to know if your salary will stretch far
          enough. Fifth, when negotiating a raise — knowing your effective tax rate helps you calculate
          the after-tax value of any salary increase.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          A common mistake is comparing gross salaries without accounting for state taxes. A $100,000
          offer in Texas yields about $79,180 in take-home pay, while the same $100,000 in California
          yields about $73,799 — a difference of $5,381 per year, or about $448 per month. Over a
          five-year period, that's nearly $27,000 in lost take-home pay. Our salary comparison
          calculator makes these differences immediately visible, so you can negotiate or decide with
          full information.
        </p>
      </section>

      {/* ─── Real-World Comparison Table ─────────────────── */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Real-World <span className="gradient-text">Salary Comparisons</span>
        </h2>
        <p className="text-muted-foreground mb-4">
          Here's how the same salary translates to different take-home pay depending on which state you
          live in. These are real numbers from our 2026 tax calculations:
        </p>
        <div className="overflow-x-auto rounded-xl border border-border/30 mb-4">
          <table className="w-full text-sm">
            <thead className="bg-muted/30">
              <tr>
                <th className="text-left p-3 font-semibold text-foreground">Salary</th>
                <th className="text-right p-3 font-semibold text-foreground">No-Tax State</th>
                <th className="text-right p-3 font-semibold text-foreground">Take-Home</th>
                <th className="text-right p-3 font-semibold text-foreground">High-Tax State</th>
                <th className="text-right p-3 font-semibold text-foreground">Take-Home</th>
                <th className="text-right p-3 font-semibold text-foreground">Difference</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row) => (
                <tr key={row.salary} className="border-t border-border/20">
                  <td className="p-3 font-medium text-foreground">{row.formatted}</td>
                  <td className="p-3 text-right text-muted-foreground">
                    {row.state1.stateName} ({row.state1.stateAbbr})
                  </td>
                  <td className="p-3 text-right text-emerald-400 font-medium">{fmt(row.state1.netAnnual)}</td>
                  <td className="p-3 text-right text-muted-foreground">
                    {row.state2.stateName} ({row.state2.stateAbbr})
                  </td>
                  <td className="p-3 text-right text-foreground">{fmt(row.state2.netAnnual)}</td>
                  <td className="p-3 text-right text-emerald-400 font-bold">
                    +{fmt(row.diff)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground">
          * Calculations assume single filing status, 2026 standard deduction of $16,100, and no pre-tax
          contributions. NYC residents would pay additional city tax not shown here.
        </p>
      </section>

      {/* ─── Factors That Affect Comparison ──────────────── */}
      <section className="mb-10 space-y-4">
        <h2 className="text-2xl font-bold text-foreground">
          Factors That <span className="gradient-text">Affect Salary Comparison</span>
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Beyond state income tax, several other factors influence the real take-home pay difference
          between two salaries:
        </p>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-400">1</span>
            <span>
              <strong className="text-foreground">Filing status</strong> — Married filing jointly
              doubles the standard deduction to $32,200 and uses wider tax brackets, reducing federal
              tax significantly compared to single filing status.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-400">2</span>
            <span>
              <strong className="text-foreground">401(k) contributions</strong> — Pre-tax contributions
              reduce your federal and state taxable income. A $10,000 401(k) contribution at the 22%
              marginal rate saves you $2,200 in federal tax plus state tax savings.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-400">3</span>
            <span>
              <strong className="text-foreground">HSA contributions</strong> — Triple-tax-advantaged.
              Reduces FICA, federal, and state taxable income. The 2026 limit is $4,400 (self) or $8,300 (family).
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-400">4</span>
            <span>
              <strong className="text-foreground">NYC residency</strong> — If you live in NYC, add
              3.078%–3.876% city tax on top of New York state tax. This can reduce a $100K salary's
              take-home by another $3,500+ per year.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-400">5</span>
            <span>
              <strong className="text-foreground">Additional Medicare Tax</strong> — Above $200,000
              (single), add 0.9% Medicare surtax. This affects high earners and isn't matched by
              employers.
            </span>
          </li>
        </ul>
      </section>

      {/* ─── Common Mistakes Section ─────────────────────── */}
      <section className="mb-10 space-y-4">
        <h2 className="text-2xl font-bold text-foreground">
          Common <span className="gradient-text">Mistakes</span> When Comparing Salaries
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          When evaluating job offers or planning a relocation, watch out for these common pitfalls:
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-rose-500/20 bg-rose-500/5 p-4">
            <h3 className="font-semibold text-foreground mb-2 text-sm">❌ Comparing Gross Salaries Only</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              A $120K offer in CA vs $110K in TX — the TX offer may actually pay more after taxes. Always compare take-home, not gross.
            </p>
          </div>
          <div className="rounded-lg border border-rose-500/20 bg-rose-500/5 p-4">
            <h3 className="font-semibold text-foreground mb-2 text-sm">❌ Forgetting Property Tax</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Texas has 1.71% property tax vs California's 0.71%. On a $500K home, that's $5,000/year extra in TX.
            </p>
          </div>
          <div className="rounded-lg border border-rose-500/20 bg-rose-500/5 p-4">
            <h3 className="font-semibold text-foreground mb-2 text-sm">❌ Ignoring 401(k) Match</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              A 5% match on $100K is $5,000 of "free" pre-tax money. Include this in your total compensation comparison.
            </p>
          </div>
          <div className="rounded-lg border border-rose-500/20 bg-rose-500/5 p-4">
            <h3 className="font-semibold text-foreground mb-2 text-sm">❌ Overlooking Cost of Living</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              $100K in San Francisco is barely middle class; $100K in Houston is comfortable. Adjust for local costs.
            </p>
          </div>
        </div>
      </section>

      {/* ─── How to Use Results ──────────────────────────── */}
      <section className="mb-10 space-y-4">
        <h2 className="text-2xl font-bold text-foreground">
          How to <span className="gradient-text">Use Your Results</span>
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Once you've compared after-tax salaries, the next step is to factor in cost-of-living
          differences. A $5,000/year take-home advantage in Texas could be erased if housing costs $500
          more per month. Use our <Link href="/relocation-calculator" className="text-emerald-400 hover:underline">Relocation Calculator</Link>{' '}
          to factor in housing, utilities, transportation, and groceries for a complete picture.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          For job offer comparisons, don't forget to include equity, bonuses, and benefits. A lower base
          salary with a 20% bonus target and stock options may outperform a higher base salary with no
          upside. Our <Link href="/job-offer-comparison-calculator" className="text-emerald-400 hover:underline">Job Offer Comparison Calculator</Link>{' '}
          handles these more complex scenarios.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Finally, remember that tax brackets and rates change annually. The 2026 numbers in this
          calculator reflect the latest IRS and state revenue department figures, but always verify
          with a tax professional before making major financial decisions.
        </p>
      </section>
    </>
  );
}
