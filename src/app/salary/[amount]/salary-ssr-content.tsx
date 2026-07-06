/**
 * Server-rendered SEO content for salary pages.
 * Adds 800-1200 words of meaningful content so Google can index the page properly
 * (the interactive calculator widget is client-rendered via ssr:false).
 */

import Link from 'next/link';
import {
  calculateSalaryTakeHome,
  formatSalary,
  fmt,
  STATE_KEYS,
  STATE_LABELS,
  type StateTakeHome,
} from '@/lib/salary-calculations';

interface Props {
  salary: number;
}

export function SalarySSRContent({ salary }: Props) {
  const formatted = formatSalary(salary);
  const calc = calculateSalaryTakeHome(salary);

  // Top 10 states by take-home (highest net first)
  const sortedStates = [...calc.states].sort((a, b) => b.netAnnual - a.netAnnual);
  const top10 = sortedStates.slice(0, 10);
  const bottom5 = sortedStates.slice(-5);

  // Key states for narrative
  const tx = calc.states.find((s) => s.stateKey === 'texas')!;
  const ca = calc.states.find((s) => s.stateKey === 'california')!;
  const ny = calc.states.find((s) => s.stateKey === 'newyork')!;
  const fl = calc.states.find((s) => s.stateKey === 'florida')!;
  const il = calc.states.find((s) => s.stateKey === 'illinois')!;

  const txDiff = tx.netAnnual - ca.netAnnual;
  const txMonthly = tx.netMonthly;
  const ilMonthly = il.netMonthly;
  const caMonthly = ca.netMonthly;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-12">
      {/* ─── Overview Section ─────────────────────────────── */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          {formatted} After Tax in 2026 — Overview
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          On a {formatted} annual salary in 2026, your federal income tax is approximately{' '}
          <strong className="text-foreground">{fmt(tx.federalTax)}</strong> for a single filer
          claiming the standard deduction of $16,100. FICA payroll taxes (Social Security + Medicare)
          add another <strong className="text-foreground">{fmt(tx.ficaTotal)}</strong>. The big
          variable is state income tax — your take-home pay swings by more than{' '}
          <strong className="text-foreground">{fmt(Math.abs(txDiff))}</strong> per year depending on
          where you live.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          In Texas and Florida (no state income tax), you keep the most of your {formatted} paycheck
          at around <strong className="text-foreground">{fmt(tx.netAnnual)}</strong> per year — that's
          about <strong className="text-foreground">{fmt(txMonthly)}</strong> per month. In
          California, your net pay drops to roughly <strong className="text-foreground">{fmt(ca.netAnnual)}</strong>{' '}
          ({fmt(caMonthly)}/month) after state income tax of up to 13.3% kicks in. Illinois sits in
          the middle with its flat 4.95% rate, leaving you with about{' '}
          <strong className="text-foreground">{fmt(il.netAnnual)}</strong> annually.
        </p>
      </section>

      {/* ─── Top 10 States Table ─────────────────────────── */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Top 10 States by Take-Home Pay on {formatted}
        </h2>
        <p className="text-muted-foreground mb-4">
          These ten states give you the highest net pay on a {formatted} salary. Notice that the
          top of the list is dominated by states with no income tax — Texas, Florida, Washington,
          Nevada, and others. Even within no-tax states, take-home pay is identical because the only
          deductions are federal tax and FICA.
        </p>
        <div className="overflow-x-auto rounded-xl border border-border/30">
          <table className="w-full text-sm">
            <thead className="bg-muted/30">
              <tr>
                <th className="text-left p-3 font-semibold text-foreground">Rank</th>
                <th className="text-left p-3 font-semibold text-foreground">State</th>
                <th className="text-right p-3 font-semibold text-foreground">Net Annual</th>
                <th className="text-right p-3 font-semibold text-foreground">Monthly</th>
                <th className="text-right p-3 font-semibold text-foreground">Bi-Weekly</th>
                <th className="text-right p-3 font-semibold text-foreground">Eff. Tax Rate</th>
              </tr>
            </thead>
            <tbody>
              {top10.map((s, i) => (
                <tr key={s.stateKey} className="border-t border-border/20">
                  <td className="p-3 text-muted-foreground">{i + 1}</td>
                  <td className="p-3 font-medium text-foreground">{s.stateName}</td>
                  <td className="p-3 text-right text-foreground">{fmt(s.netAnnual)}</td>
                  <td className="p-3 text-right text-muted-foreground">{fmt(s.netMonthly)}</td>
                  <td className="p-3 text-right text-muted-foreground">{fmt(s.netBiweekly)}</td>
                  <td className="p-3 text-right text-muted-foreground">{s.effectiveTaxRate.toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ─── State-by-State Comparison ───────────────────── */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          {formatted} Take-Home Pay in Key States
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <StateCard
            state={tx}
            title={`${formatted} After Tax in Texas`}
            description={`Texas has no state income tax. On ${formatted}, you take home ${fmt(tx.netAnnual)} per year (${fmt(txMonthly)}/month). Texas relies on property and sales taxes instead — average property tax is 1.71% of home value.`}
            calculatorHref="/texas-tax-calculator"
          />
          <StateCard
            state={ca}
            title={`${formatted} After Tax in California`}
            description={`California's progressive tax (1%–13.3%) takes a big bite. On ${formatted}, your net pay is ${fmt(ca.netAnnual)} (${fmt(caMonthly)}/month). California's standard deduction for single filers is $6,083.`}
            calculatorHref="/california-tax-calculator"
          />
          <StateCard
            state={ny}
            title={`${formatted} After Tax in New York`}
            description={`New York state tax ranges 4%–10.9%. On ${formatted}, take-home is ${fmt(ny.netAnnual)} (${fmt(ny.netMonthly)}/month). NYC residents pay an additional 3.078%–3.876% city tax on top.`}
            calculatorHref="/new-york-tax-calculator"
          />
          <StateCard
            state={fl}
            title={`${formatted} After Tax in Florida`}
            description={`Florida has no state income tax. On ${formatted}, you take home ${fmt(fl.netAnnual)} per year. Florida's average property tax is just 0.86%, and there's a homestead exemption for primary residences.`}
            calculatorHref="/florida-tax-calculator"
          />
          <StateCard
            state={il}
            title={`${formatted} After Tax in Illinois`}
            description={`Illinois has a flat 4.95% income tax. On ${formatted}, take-home is ${fmt(il.netAnnual)} (${fmt(ilMonthly)}/month). Illinois has high property taxes averaging 1.78%, which can offset income-tax savings.`}
            calculatorHref="/illinois-tax-calculator"
          />
          <StateCard
            state={sortedStates.find((s) => s.stateKey === 'washington')!}
            title={`${formatted} After Tax in Washington`}
            description={`Washington has no state income tax. On ${formatted}, you take home roughly ${fmt(sortedStates.find((s) => s.stateKey === 'washington')!.netAnnual)} per year — same as Texas and Florida. WA does have a 7% capital gains tax on long-term gains over ~$262,000.`}
            calculatorHref="/washington-tax-calculator"
          />
        </div>
      </section>

      {/* ─── How We Calculate ─────────────────────────────── */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          How We Calculate {formatted} After Taxes
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Our {formatted} after-tax calculation follows three steps:
        </p>
        <ol className="space-y-3 text-muted-foreground">
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-400">1</span>
            <span>
              <strong className="text-foreground">Federal income tax</strong> — We apply the 2026
              progressive brackets (10%, 12%, 22%, 24%, 32%, 35%, 37%) after subtracting the $16,100
              standard deduction for single filers. On {formatted}, your federal tax is{' '}
              <strong className="text-foreground">{fmt(tx.federalTax)}</strong>.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-400">2</span>
            <span>
              <strong className="text-foreground">FICA payroll tax</strong> — Social Security is 6.2%
              on the first $184,500 of wages, plus 1.45% Medicare on all wages. Above $200,000, an
              additional 0.9% Medicare surtax applies. On {formatted}, FICA totals{' '}
              <strong className="text-foreground">{fmt(tx.ficaTotal)}</strong>.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-400">3</span>
            <span>
              <strong className="text-foreground">State income tax</strong> — We apply each state's
              specific brackets. For {formatted}, this ranges from $0 (Texas, Florida, Washington,
              Nevada, etc.) up to {fmt(ca.stateTax)} (California).
            </span>
          </li>
        </ol>
        <p className="text-muted-foreground leading-relaxed mt-4">
          The result is your <strong className="text-foreground">net annual take-home pay</strong>,
          which we also break down into monthly, bi-weekly, and weekly amounts. These figures assume
          single filing status with the standard deduction and no pre-tax contributions (401(k), HSA,
          etc.). Use our full{' '}
          <Link href="/paycheck-calculator" className="text-emerald-400 hover:underline">
            Paycheck Calculator
          </Link>{' '}
          for a more detailed calculation.
        </p>
      </section>

      {/* ─── Bottom 5 States Warning ─────────────────────── */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          States Where {formatted} Goes the Furthest — and Least
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The difference between the highest and lowest take-home pay on a {formatted} salary is{' '}
          <strong className="text-foreground">{fmt(sortedStates[0].netAnnual - sortedStates[sortedStates.length - 1].netAnnual)} per year</strong> —
          that's a swing of more than{' '}
          {(((sortedStates[0].netAnnual - sortedStates[sortedStates.length - 1].netAnnual) / salary) * 100).toFixed(1)}%
          of your gross salary. The five states below take the biggest bite:
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {bottom5.map((s) => (
            <div key={s.stateKey} className="rounded-lg border border-border/30 bg-card/50 p-3 text-center">
              <p className="font-semibold text-foreground">{s.stateName}</p>
              <p className="text-sm text-emerald-400 mt-1">{fmt(s.netAnnual)}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.effectiveTaxRate.toFixed(1)}% effective</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Internal Links ──────────────────────────────── */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Related Salary & Tax Resources</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-border/30 bg-card/50 p-5">
            <h3 className="font-semibold text-foreground mb-3">Other Salary Pages</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { amount: 50000, label: '$50K' },
                { amount: 75000, label: '$75K' },
                { amount: 100000, label: '$100K' },
                { amount: 150000, label: '$150K' },
                { amount: 200000, label: '$200K' },
              ]
                .filter((x) => x.amount !== salary)
                .slice(0, 5)
                .map((x) => (
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
            <h3 className="font-semibold text-foreground mb-3">State Calculators</h3>
            <div className="space-y-1.5">
              <Link href="/texas-tax-calculator" className="block text-sm text-muted-foreground hover:text-emerald-400">Texas Tax Calculator</Link>
              <Link href="/california-tax-calculator" className="block text-sm text-muted-foreground hover:text-emerald-400">California Tax Calculator</Link>
              <Link href="/new-york-tax-calculator" className="block text-sm text-muted-foreground hover:text-emerald-400">New York Tax Calculator</Link>
              <Link href="/florida-tax-calculator" className="block text-sm text-muted-foreground hover:text-emerald-400">Florida Tax Calculator</Link>
              <Link href="/illinois-tax-calculator" className="block text-sm text-muted-foreground hover:text-emerald-400">Illinois Tax Calculator</Link>
            </div>
          </div>
          <div className="rounded-xl border border-border/30 bg-card/50 p-5">
            <h3 className="font-semibold text-foreground mb-3">Useful Tools</h3>
            <div className="space-y-1.5">
              <Link href="/paycheck-calculator" className="block text-sm text-muted-foreground hover:text-emerald-400">Paycheck Calculator</Link>
              <Link href="/compare" className="block text-sm text-muted-foreground hover:text-emerald-400">Compare State Taxes</Link>
              <Link href="/federal-tax-brackets" className="block text-sm text-muted-foreground hover:text-emerald-400">2026 Federal Tax Brackets</Link>
              <Link href="/401k-retirement-calculator" className="block text-sm text-muted-foreground hover:text-emerald-400">401(k) Retirement Calculator</Link>
              <Link href="/relocation-calculator" className="block text-sm text-muted-foreground hover:text-emerald-400">Relocation Calculator</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ Section ──────────────────────────────────── */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          {formatted} After Taxes — Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {generateSalaryFaqs(salary, calc).map((faq, i) => (
            <details key={i} className="group rounded-xl border border-border/30 bg-card/50 overflow-hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-3 p-4 text-left font-medium text-foreground hover:bg-muted/10 transition-colors">
                <span className="text-sm sm:text-base">{faq.question}</span>
                <span className="text-muted-foreground text-xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">{faq.answer}</div>
            </details>
          ))}
        </div>
      </section>

      {/* ─── Quick State Lookup (SSR version — reduces bounce rate) ─── */}
      <section className="mt-12 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-foreground mb-3">
          Find Your {formatted} Take-Home Pay by State
        </h2>
        <p className="text-muted-foreground mb-5 leading-relaxed">
          Skip the scrolling — jump straight to your state&apos;s calculator to see your exact
          take-home pay, monthly breakdown, and effective tax rate. All 50 states covered with
          2026 federal and state tax brackets.
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {sortedStates.map((s) => {
            const stateSlug = s.stateName.toLowerCase().replace(/\s/g, '-');
            return (
              <Link
                key={s.stateKey}
                href={`/${stateSlug}-tax-calculator`}
                className="group rounded-lg border border-border/30 bg-background/40 px-3 py-2 text-sm hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all"
              >
                <div className="font-medium text-foreground group-hover:text-emerald-400 transition-colors">
                  {s.stateName}
                </div>
                <div className="text-xs text-muted-foreground">
                  {fmt(s.netAnnual)}/yr
                </div>
              </Link>
            );
          })}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Click your state to open its dedicated {formatted} tax calculator with full breakdown.
        </p>
      </section>
    </div>
  );
}

// ─── State Card Component ─────────────────────────────────────────────────────

function StateCard({
  state,
  title,
  description,
  calculatorHref,
}: {
  state: StateTakeHome;
  title: string;
  description: string;
  calculatorHref: string;
}) {
  return (
    <div className="rounded-xl border border-border/30 bg-card/50 p-5 hover:border-emerald-500/30 transition-colors">
      <h3 className="font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{description}</p>
      <div className="flex items-center justify-between text-xs">
        <span className="text-emerald-400 font-medium">{fmt(state.netAnnual)}/yr</span>
        <Link href={calculatorHref} className="text-muted-foreground hover:text-emerald-400">
          Open Calculator →
        </Link>
      </div>
    </div>
  );
}

// ─── FAQ Generator (server-side, no external deps) ────────────────────────────

function generateSalaryFaqs(salary: number, calc: ReturnType<typeof calculateSalaryTakeHome>) {
  const formatted = formatSalary(salary);
  const tx = calc.states.find((s) => s.stateKey === 'texas')!;
  const ca = calc.states.find((s) => s.stateKey === 'california')!;
  const ny = calc.states.find((s) => s.stateKey === 'newyork')!;
  const fl = calc.states.find((s) => s.stateKey === 'florida')!;

  return [
    {
      question: `How much is ${formatted} after taxes in Texas?`,
      answer: `On a ${formatted} salary in Texas, your take-home pay is approximately ${fmt(tx.netAnnual)} per year after federal tax (${fmt(tx.federalTax)}) and FICA (${fmt(tx.ficaTotal)}). Texas has no state income tax, so you keep the maximum amount. Your monthly paycheck would be about ${fmt(tx.netMonthly)}, and bi-weekly about ${fmt(tx.netBiweekly)}.`,
    },
    {
      question: `How much is ${formatted} after taxes in California?`,
      answer: `On a ${formatted} salary in California, your take-home pay is approximately ${fmt(ca.netAnnual)} per year. California's progressive state income tax (1%–13.3%) takes about ${fmt(ca.stateTax)} from your paycheck. Combined with federal tax (${fmt(ca.federalTax)}) and FICA (${fmt(ca.ficaTotal)}), your effective tax rate in California is ${ca.effectiveTaxRate.toFixed(1)}%.`,
    },
    {
      question: `How much is ${formatted} after taxes in Florida?`,
      answer: `On a ${formatted} salary in Florida, your take-home pay is approximately ${fmt(fl.netAnnual)} per year — the same as in Texas because Florida also has no state income tax. Your monthly take-home would be about ${fmt(fl.netMonthly)}. Florida relies on sales tax (6% state + local) and has low property taxes averaging 0.86%.`,
    },
    {
      question: `How much is ${formatted} after taxes in New York?`,
      answer: `On a ${formatted} salary in New York State (outside NYC), your take-home pay is approximately ${fmt(ny.netAnnual)} per year. New York's state income tax ranges from 4% to 10.9% — on ${formatted}, your state tax is about ${fmt(ny.stateTax)}. If you live in New York City, expect an additional 3.078%–3.876% city tax, reducing your take-home by another ${fmt(ny.grossAnnual * 0.035)} or so.`,
    },
    {
      question: `How much is ${formatted} monthly after taxes?`,
      answer: `Your monthly take-home on a ${formatted} salary varies by state. In no-tax states like Texas and Florida, you take home about ${fmt(tx.netMonthly)} per month. In California, that drops to about ${fmt(ca.netMonthly)} per month. In New York, expect around ${fmt(ny.netMonthly)} per month (outside NYC). These figures assume single filing status with the standard deduction.`,
    },
    {
      question: `What is the hourly rate for ${formatted} a year?`,
      answer: `A ${formatted} annual salary equals approximately $${(salary / 2080).toFixed(2)} per hour based on 2,080 working hours (52 weeks × 40 hours). Your after-tax hourly take-home ranges from about $${(calc.highestNet.netAnnual / 2080).toFixed(2)} (in ${calc.highestNet.stateName}) to $${(calc.lowestNet.netAnnual / 2080).toFixed(2)} (in ${calc.lowestNet.stateName}).`,
    },
    {
      question: `How much federal tax do I pay on ${formatted}?`,
      answer: `On a ${formatted} salary with single filing status and the $16,100 standard deduction, your federal income tax is approximately ${fmt(tx.federalTax)}. This is calculated using the 2026 progressive brackets — your marginal rate (top bracket) is higher than your effective rate. FICA payroll tax adds another ${fmt(tx.ficaTotal)} (6.2% Social Security + 1.45% Medicare).`,
    },
    {
      question: `Is ${formatted} a good salary?`,
      answer: salary <= 50000
        ? `A ${formatted} salary is below the U.S. median individual income (~$60K). It's manageable for a single person in a low-cost area like Texas or Florida, but tight in California or New York. Focus on keeping rent under 30% of your take-home pay (about ${fmt(tx.netAnnual * 0.3)}/year in Texas).`
        : salary <= 100000
        ? `A ${formatted} salary is above the U.S. median and is considered a strong income in most markets. You can live comfortably as a single person and save meaningfully, especially in no-tax states like Texas or Florida where you keep about ${fmt(tx.netAnnual)} per year.`
        : salary <= 200000
        ? `A ${formatted} salary puts you in the top 10-15% of U.S. earners. This is an excellent income that allows for comfortable living and significant savings. In high-tax states like California or New York, you'll feel the impact of progressive brackets — consider maximizing 401(k) contributions to lower your taxable income.`
        : `A ${formatted} salary places you among the top earners in the U.S. At this income level, state choice matters enormously — living in a no-tax state (TX/FL/WA) vs. a high-tax state (CA/NY) can mean tens of thousands of dollars annually in savings. Consider working with a tax advisor.`,
    },
  ];
}
