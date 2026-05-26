import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  SALARY_AMOUNTS,
  calculateSalaryTakeHome,
  generateFAQs,
  isValidSalaryAmount,
  slugToSalary,
  formatSalary,
  fmt,
  fmtFull,
  STATE_LABELS,
} from '@/lib/salary-calculations';
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

// ─── State to calculator slug mapping ──────────────────────────────────────────

const STATE_KEY_TO_SLUG: Record<string, string> = {
  illinois: '/illinois-tax-calculator',
  texas: '/texas-tax-calculator',
  florida: '/florida-tax-calculator',
  california: '/california-tax-calculator',
  newyork: '/new-york-tax-calculator',
};

// ─── Static Params for Build ─────────────────────────────────────────────────

export function generateStaticParams(): { amount: string }[] {
  return SALARY_AMOUNTS.map((amount) => ({ amount: String(amount) }));
}

// ─── Per-Page Metadata ────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ amount: string }>;
}): Promise<Metadata> {
  const { amount: amountStr } = await params;
  const salary = slugToSalary(amountStr);
  if (!salary) return { title: 'Salary Not Found | TaxYield.io' };

  const formatted = formatSalary(salary);
  const baseUrl = 'https://taxyield.io';
  const path = `/salary/${amountStr}`;

  const title = `${formatted} After Tax in 2026 — Take-Home Pay by State`;
  const description = `See your take-home pay on a ${formatted} salary in 2026. Compare net pay across Illinois, Texas, Florida, California, and New York after federal tax, FICA, and state income tax.`;

  return {
    title,
    description,
    keywords: [
      `${formatted} after tax`,
      `${formatted} take home pay`,
      `${formatted} salary after tax`,
      `${formatted} net pay`,
      `${formatted} paycheck`,
      `${formatted} after tax california`,
      `${formatted} after tax texas`,
      `${formatted} after tax new york`,
      `${formatted} after tax illinois`,
      `${formatted} after tax florida`,
      'salary calculator 2026',
      'take home pay calculator',
    ],
    authors: [{ name: 'TaxYield.io' }],
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        'en-US': `${baseUrl}${path}`,
        'x-default': `${baseUrl}${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}${path}`,
      siteName: 'TaxYield.io',
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

// ─── JSON-LD Schema ───────────────────────────────────────────────────────────

function generateJsonLd(salary: number) {
  const calc = calculateSalaryTakeHome(salary);
  const formatted = formatSalary(salary);
  const faqs = generateFAQs(salary);
  const path = `/salary/${salary}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://taxyield.io' },
          { '@type': 'ListItem', position: 2, name: 'Salary After Tax', item: 'https://taxyield.io/salary' },
          { '@type': 'ListItem', position: 3, name: `${formatted} After Tax`, item: `https://taxyield.io${path}` },
        ],
      },
      {
        '@type': 'WebPage',
        name: `${formatted} After Tax in 2026 — Take-Home Pay by State`,
        description: `Calculate your take-home pay on a ${formatted} salary in 2026. Compare net pay across IL, TX, FL, CA, and NY.`,
        url: `https://taxyield.io${path}`,
        inLanguage: 'en-US',
        dateModified: '2026-01-01',
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
      {
        '@type': 'Dataset',
        name: `${formatted} Take-Home Pay by State (2026)`,
        description: `Net annual pay after federal tax, FICA, and state income tax on a ${formatted} salary for Single filer with standard deduction.`,
        variableMeasured: calc.states.map((s) => ({
          name: `Net Pay in ${s.stateName}`,
          value: fmt(s.netAnnual),
        })),
      },
    ],
  };
}

// ─── Server Component Page ────────────────────────────────────────────────────

export default async function SalaryAmountPage({
  params,
}: {
  params: Promise<{ amount: string }>;
}) {
  const { amount: amountStr } = await params;
  const salary = slugToSalary(amountStr);

  if (!salary || !isValidSalaryAmount(salary)) {
    notFound();
  }

  const calc = calculateSalaryTakeHome(salary);
  const faqs = generateFAQs(salary);
  const jsonLd = generateJsonLd(salary);

  // Sort states by net pay (highest first) for the comparison table
  const sortedStates = [...calc.states].sort((a, b) => b.netAnnual - a.netAnnual);

  // Determine neighboring salaries for internal linking
  const currentIndex = SALARY_AMOUNTS.indexOf(salary as (typeof SALARY_AMOUNTS)[number]);
  const prevSalary = currentIndex > 0 ? SALARY_AMOUNTS[currentIndex - 1] : null;
  const nextSalary = currentIndex < SALARY_AMOUNTS.length - 1 ? SALARY_AMOUNTS[currentIndex + 1] : null;

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
          <a href="/" className="hover:text-foreground transition-colors">Home</a>
          <span className="text-muted-foreground/50">/</span>
          <a href="/salary" className="hover:text-foreground transition-colors">Salary</a>
          <span className="text-muted-foreground/50">/</span>
          <span className="text-foreground font-medium">{calc.salaryFormatted} After Tax</span>
        </nav>

        {/* ─── Hero Section ──────────────────────────────────────────── */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600/20 to-teal-600/10">
              <DollarSign className="h-6 w-6 text-emerald-400" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1">
              2026 Tax Year
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {calc.salaryFormatted} After Tax in 2026
          </h1>

          <p className="mt-4 text-lg text-muted-foreground max-w-3xl leading-relaxed">
            On a {calc.salaryFormatted} salary, your take-home pay ranges from{' '}
            <strong className="text-red-400">{fmt(calc.lowestNet.netAnnual)}</strong> ({calc.lowestNet.stateName}) to{' '}
            <strong className="text-emerald-400">{fmt(calc.highestNet.netAnnual)}</strong> ({calc.highestNet.stateName}){' '}
            for a Single filer with the standard deduction. That&apos;s a difference of{' '}
            <strong className="text-amber-400">{fmt(calc.highestNet.netAnnual - calc.lowestNet.netAnnual)}</strong> per year
            depending on where you live.
          </p>
        </section>

        {/* ─── Quick Summary Cards ────────────────────────────────────── */}
        <section className="mb-12">
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {calc.states.map((state) => (
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
        </section>

        {/* ─── Comparison Table ───────────────────────────────────────── */}
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

        {/* ─── State Breakdown Cards ──────────────────────────────────── */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600/20 to-teal-600/10">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              Detailed Breakdown by State
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {calc.states.map((state) => {
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
                      <h3 className="text-lg font-semibold text-foreground">{state.stateName}</h3>
                      <p className="text-xs text-muted-foreground">{state.stateAbbr} resident · Single filer</p>
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

                  {/* Pay period breakdown */}
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
            All calculations assume Single filing status, standard deduction ($15,000 federal), and no pre-tax deductions (401(k), HSA).
            FICA includes Social Security (6.2% up to $176,100) and Medicare (1.45% + 0.9% additional above $200,000).
          </p>
        </section>

        {/* ─── Is This a Good Salary? ─────────────────────────────────── */}
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

        {/* ─── FAQ Section ────────────────────────────────────────────── */}
        <section className="py-12 border-t border-border/20">
          <div className="mx-auto max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600/20 to-teal-600/10">
                <HelpCircle className="h-5 w-5 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                Frequently Asked Questions
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

        {/* ─── CTA ────────────────────────────────────────────────────── */}
        <section className="py-12 border-t border-border/20">
          <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-600/10 to-teal-600/5 p-8 sm:p-12 text-center">
            <Calculator className="h-10 w-10 text-emerald-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Calculate Your Exact Take-Home Pay
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

        {/* ─── Salary Navigation ──────────────────────────────────────── */}
        <section className="py-8 border-t border-border/20">
          <div className="flex items-center justify-between">
            {prevSalary ? (
              <Link
                href={`/salary/${prevSalary}`}
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
                href={`/salary/${nextSalary}`}
                className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {formatSalary(nextSalary)} After Tax
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : <span />}
          </div>
        </section>
      </div>
    </>
  );
}
