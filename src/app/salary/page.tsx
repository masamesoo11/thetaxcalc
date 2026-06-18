import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/site-config';
import {
  SALARY_AMOUNTS,
  calculateSalaryTakeHome,
  getGroupedSalaries,
  formatSalary,
  formatSalaryCompact,
  salaryToSlug,
  fmt,
  STATE_LABELS,
  STATE_KEYS,
} from '@/lib/salary-calculations';
import {
  DollarSign,
  ArrowRight,
  TrendingUp,
  MapPin,
  Zap,
  BarChart3,
  ChevronRight,
  Calculator,
  BookOpen,
  ChevronDown,
} from 'lucide-react';
import { Breadcrumb } from '@/components/finance/breadcrumb';
import { getCalculatorAuthor, authorToJsonLd } from '@/lib/authors';
import { AuthorBioCard } from '@/components/finance/author-bio-card';

// ─── Page Metadata ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Salary After Tax 2026 — Take-Home Pay',
  description:
    'See your take-home pay for every salary from $30K to $500K. Compare after-tax income across Illinois, Texas, Florida, California, and New York for 2026.',
  keywords: [
    'salary after tax', 'take home pay by salary', 'net pay calculator',
    'salary after tax 2026', '$50000 after tax', '$75000 after tax',
    '$100000 after tax', '$150000 after tax', 'salary by state',
    'take home pay calculator', 'after tax income',
  ],
  authors: [{ name: 'Rachel Mitchell, CPA' }],
  alternates: {
    canonical: `${SITE_URL}/salary`,
    /salary`,    },
  },
  openGraph: {
    title: 'Salary After Tax 2026 — Take-Home Pay',
    description:
      'See your take-home pay for every salary from $30K to $500K. Compare after-tax income across IL, TX, FL, CA, NY.',
    url: `${SITE_URL}/salary`,
    siteName: 'TheTaxCalc',
    type: 'website',
    locale: 'en_US',
    images: [{ url: `${SITE_URL}/opengraph-image.png`, width: 1200, height: 630, alt: 'Salary After Tax Calculator 2026 — TheTaxCalc' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Salary After Tax 2026 — Take-Home Pay',
    description:
      'See your take-home pay for every salary from $30K to $500K. Compare after-tax income across IL, TX, FL, CA, NY.',
  },
};

// ─── JSON-LD ───────────────────────────────────────────────────────────────────

const SALARY_LANDING_FAQS = [
  {
    question: 'How much is my salary after taxes in 2026?',
    answer: 'Your take-home pay depends on your salary, filing status, and state. For example, a single filer earning $75,000 in Texas (0% state tax) takes home about $61,592 after federal tax and FICA. The same salary in California (up to 13.3% state tax) leaves you with about $54,849. That\'s a difference of over $6,700 per year just from your state. Our salary pages show you exact take-home numbers for 26 salary levels across 23 states.',
  },
  {
    question: 'Which state has the highest take-home pay?',
    answer: 'Among the states we cover, Texas and Florida consistently produce the highest take-home pay because they have 0% state income tax. Illinois is in the middle at 4.95% flat, while New York and California take the biggest bite — especially at higher income levels where their progressive rates kick in. However, if you live in New York City, you pay an additional 3.078%–3.876% city tax on top of the state rate, making NYC one of the most taxed jurisdictions in the country.',
  },
  {
    question: 'How are salary after-tax calculations done?',
    answer: 'We start with your gross salary and subtract: (1) Federal income tax using 2026 progressive brackets (10%–37%) after the $16,100 standard deduction for single filers, (2) FICA payroll tax at 6.2% for Social Security (up to $184,500 wage cap) plus 1.45% for Medicare on all wages, and (3) State income tax using each state\'s specific brackets or flat rate. The result is your net annual take-home pay, which we also break down into monthly, bi-weekly, and weekly amounts.',
  },
  {
    question: 'Does the salary calculator include 401(k) or HSA deductions?',
    answer: 'The salary pages show take-home pay with standard deduction only — no 401(k) or HSA. For a more detailed calculation that includes pre-tax deductions, different filing statuses, and additional options, use our full Paycheck Calculator. Pre-tax deductions like 401(k) contributions reduce your taxable income at both the federal and state level, which can lower your effective tax rate significantly.',
  },
  {
    question: 'Why do Texas and Florida have 0% state income tax?',
    answer: 'Texas and Florida generate revenue through other means instead of taxing wages. Texas relies heavily on property taxes (averaging ~1.71% of home value, among the highest in the nation) and sales tax (6.25% state + local). Florida uses sales tax (6% state + local) and has a relatively low property tax rate (~0.86%). Both states also collect revenue from tourism, oil (Texas), and various fees. The trade-off is that while your paycheck is bigger, other costs may be higher — especially property taxes in Texas.',
  },
];

const salaryPageJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@id': `${SITE_URL}/salary#breadcrumb`,
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Salary After Tax' },
      ],
    },
    {
      '@id': `${SITE_URL}/salary#webpage`,
      '@type': 'WebPage',
      name: 'Salary After Tax Calculator 2026 — Take-Home Pay by State',
      description: 'See your take-home pay for every salary from $30K to $500K. Compare after-tax income across IL, TX, FL, CA, NY.',
      url: `${SITE_URL}/salary`,
      inLanguage: 'en-US',
      dateModified: '2026-01-01',
      author: { '@id': `${SITE_URL}/salary#author` },
      reviewedBy: { '@id': `${SITE_URL}/salary#author` },
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@id': `${SITE_URL}/salary#author`,
      ...authorToJsonLd(getCalculatorAuthor()),
    },
    {
      '@id': `${SITE_URL}/salary#collection`,
      '@type': 'CollectionPage',
      name: 'Salary After Tax Pages',
      description: 'Programmatic salary pages showing after-tax take-home pay for salaries from $30,000 to $500,000 across 23 states.',
      url: `${SITE_URL}/salary`,
      publisher: { '@id': `${SITE_URL}/#organization` },
      hasPart: SALARY_AMOUNTS.map((amount) => ({
        '@type': 'WebPage',
        '@id': `${SITE_URL}/salary/${salaryToSlug(amount)}#webpage`,
        name: `$${amount.toLocaleString()} After Tax in 2026`,
        url: `${SITE_URL}/salary/${salaryToSlug(amount)}`,
        dateModified: '2026-01-01',
      })),
    },
    {
      '@id': `${SITE_URL}/salary#faq`,
      '@type': 'FAQPage',
      mainEntity: SALARY_LANDING_FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ],
};

// ─── Salary Card Component ─────────────────────────────────────────────────────

function SalaryCard({ amount }: { amount: number }) {
  const calc = calculateSalaryTakeHome(amount);
  // Texas (0% state tax) = highest net
  const txNet = calc.states.find((s) => s.stateKey === 'texas')!.netAnnual;

  return (
    <Link
      href={`/salary/${salaryToSlug(amount)}`}
      className="group premium-card hover-lift p-5 flex flex-col gap-3"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-foreground group-hover:text-emerald-400 transition-colors">
          {formatSalary(amount)}
        </h3>
        <span className="text-[10px] font-semibold uppercase tracking-wider rounded-full px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          {formatSalaryCompact(amount)}
        </span>
      </div>

      {/* Texas take-home (highest net) */}
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-emerald-400 shrink-0" />
        <span className="text-sm text-muted-foreground">
          TX Take-Home: <strong className="text-emerald-400">{fmt(txNet)}</strong>/yr
        </span>
      </div>

      {/* Mini state comparison */}
      <div className="grid grid-cols-5 gap-1 mt-1">
        {calc.states.map((state) => {
          const pct = state.netAnnual / txNet;
          return (
            <div key={state.stateKey} className="text-center">
              <div className="h-1.5 rounded-full bg-muted/30 overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-500/60"
                  style={{ width: `${pct * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">{state.stateAbbr}</p>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="mt-auto flex items-center gap-1.5 text-sm font-medium text-emerald-400 group-hover:gap-3 transition-all">
        View Details
        <ArrowRight className="h-4 w-4" />
      </div>
    </Link>
  );
}

// ─── Server Component Page ─────────────────────────────────────────────────────

export default function SalaryLandingPage() {
  const groups = getGroupedSalaries();

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(salaryPageJsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Salary After Tax' }]} />

        {/* ─── Hero Section ──────────────────────────────────────────── */}
        <section className="mb-16 relative overflow-hidden">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600/20 to-teal-600/10">
              <DollarSign className="h-6 w-6 text-emerald-400" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1">
              <Zap className="h-3 w-3 inline mr-1" />
              26 Salary Pages
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Salary After Tax <span className="gradient-text">2026</span>
          </h1>

          <p className="mt-4 text-lg text-muted-foreground max-w-3xl leading-relaxed">
            Want to know what you actually take home after taxes? Same. Pick your salary below
            and we\'ll show you the real numbers across <strong className="text-foreground">Illinois</strong>, <strong className="text-foreground">Texas</strong>,
            <strong className="text-foreground"> Florida</strong>, <strong className="text-foreground">California</strong>, and
            <strong className="text-foreground"> New York</strong>. Spoiler: where you live makes a bigger difference than you think.
          </p>

          <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calculator className="h-4 w-4 text-emerald-400" />
              Single Filer + Standard Deduction
            </span>
            <span className="flex items-center gap-1.5">
              <BarChart3 className="h-4 w-4 text-emerald-400" />
              Federal + FICA + State Tax
            </span>
            <span className="flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              $30K – $500K
            </span>
          </div>
        </section>

        {/* ─── Salary Groups ──────────────────────────────────────────── */}
        {groups.map((group) => (
          <section key={group.label} className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <h3 className="text-2xl font-bold text-foreground">
                {group.label}
              </h3>
              <span className="text-xs font-medium text-muted-foreground bg-muted/20 rounded-full px-3 py-1">
                {group.range}
              </span>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {group.amounts.map((amount) => (
                <SalaryCard key={amount} amount={amount} />
              ))}
            </div>
          </section>
        ))}

        {/* ─── How It Works ──────────────────────────────────────────── */}
        <section className="py-12 border-t border-border/20">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-foreground">
              How We <span className="gradient-text">Calculate</span> Your Take-Home Pay
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              We crunch the numbers so you don\'t have to. Federal tax, FICA, state tax — all broken down.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: '1',
                title: 'Federal Income Tax',
                desc: 'Progressive brackets from 10% to 37% applied after the $16,100 standard deduction for Single filers.',
              },
              {
                step: '2',
                title: 'FICA Payroll Tax',
                desc: '6.2% Social Security (up to $184,500 cap) + 1.45% Medicare on all wages. Additional 0.9% above $200,000.',
              },
              {
                step: '3',
                title: 'State Income Tax',
                desc: 'IL: 4.95% flat · TX & FL: 0% · CA: 1%–13.3% progressive · NY: 4%–10.9% progressive.',
              },
              {
                step: '4',
                title: 'Net Take-Home Pay',
                desc: 'Gross salary minus all taxes. We show annual, monthly, bi-weekly, and weekly amounts for each state.',
              },
            ].map((item) => (
              <div key={item.step} className="rounded-xl border border-border/30 bg-card/50 p-5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 font-bold text-sm mb-3">
                  {item.step}
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Popular States ─────────────────────────────────────────── */}
        <section className="py-12 border-t border-border/20">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-foreground">
              Compare by <span className="gradient-text">State</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Go deeper with our dedicated state calculators. They add 401(k), HSA, and filing status options.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { name: 'Illinois', abbr: 'IL', rate: '4.95% flat', href: '/illinois-tax-calculator', color: 'from-blue-600/20 to-indigo-600/10' },
              { name: 'Texas', abbr: 'TX', rate: '0% income tax', href: '/texas-tax-calculator', color: 'from-red-600/20 to-orange-600/10' },
              { name: 'Florida', abbr: 'FL', rate: '0% income tax', href: '/florida-tax-calculator', color: 'from-amber-600/20 to-yellow-600/10' },
              { name: 'California', abbr: 'CA', rate: '1%–13.3%', href: '/california-tax-calculator', color: 'from-violet-600/20 to-purple-600/10' },
              { name: 'New York', abbr: 'NY', rate: '4%–10.9%', href: '/new-york-tax-calculator', color: 'from-cyan-600/20 to-sky-600/10' },
            ].map((state) => (
              <Link
                key={state.abbr}
                href={state.href}
                className="group rounded-xl border border-border/30 bg-card/50 p-5 text-center transition-all hover:border-emerald-500/30 hover-lift"
              >
                <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${state.color}`}>
                  <MapPin className="h-6 w-6 text-emerald-400" />
                </div>
                <h3 className="mt-3 text-base font-semibold text-foreground group-hover:text-emerald-400 transition-colors">
                  {state.name}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">{state.rate}</p>
                <p className="mt-3 text-xs text-emerald-400 group-hover:underline">
                  Open Calculator <ChevronRight className="h-3 w-3 inline" />
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* ─── CTA ────────────────────────────────────────────────────── */}
        <section className="py-12 border-t border-border/20">
          <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-600/10 to-teal-600/5 p-8 sm:p-12 text-center">
            <Calculator className="h-10 w-10 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-3">
              Need a More Precise Calculation?
            </h3>
            <p className="text-muted-foreground max-w-lg mx-auto mb-6">
              Our paycheck calculator supports 401(k), HSA, different filing statuses,
              and all 23 states with detailed breakdowns.
            </p>
            <Link
              href="/paycheck-calculator"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all hover:scale-[1.02]"
            >
              <BarChart3 className="h-5 w-5" />
              Open Paycheck Calculator
            </Link>
          </div>
        </section>

        {/* ─── Related Tools & Resources ──────────────────────────────── */}
        <section className="py-12 border-t border-border/20">
          <p className="text-lg font-bold text-foreground mb-6">
            Salary & Tax Resources
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Tax Calculators */}
            <div className="rounded-xl border border-border/30 bg-card/50 p-5">
              <h3 className="text-base font-semibold text-foreground mb-3">Tax Calculators</h3>
              <div className="space-y-2">
                {[
                  { href: '/paycheck-calculator', label: 'Paycheck Calculator' },
                  { href: '/mortgage-calculator', label: 'Mortgage Calculator' },
                  { href: '/401k-retirement-calculator', label: '401(k) Retirement Calculator' },
                  { href: '/capital-gains-calculator', label: 'Capital Gains Calculator' },
                  { href: '/self-employment-tax-calculator', label: 'Self-Employment Tax' },
                  { href: '/relocation-calculator', label: 'Relocation Calculator' },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-emerald-400 transition-colors"
                  >
                    <span className="h-1 w-1 rounded-full bg-emerald-500/40 shrink-0 group-hover:bg-emerald-400 transition-colors" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* State Calculators */}
            <div className="rounded-xl border border-border/30 bg-card/50 p-5">
              <h3 className="text-base font-semibold text-foreground mb-3">State Tax Calculators</h3>
              <div className="space-y-2">
                {[
                  { href: '/illinois-tax-calculator', label: 'Illinois (4.95% flat)' },
                  { href: '/texas-tax-calculator', label: 'Texas (0% income tax)' },
                  { href: '/florida-tax-calculator', label: 'Florida (0% income tax)' },
                  { href: '/california-tax-calculator', label: 'California (1%–13.3%)' },
                  { href: '/new-york-tax-calculator', label: 'New York (4%–10.9%)' },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-emerald-400 transition-colors"
                  >
                    <span className="h-1 w-1 rounded-full bg-emerald-500/40 shrink-0 group-hover:bg-emerald-400 transition-colors" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Salary Quick Links & Guides */}
            <div className="rounded-xl border border-border/30 bg-card/50 p-5">
              <h3 className="text-base font-semibold text-foreground mb-3">Salary & Guides</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { href: `/salary/${salaryToSlug(50000)}`, label: '$50K' },
                  { href: `/salary/${salaryToSlug(75000)}`, label: '$75K' },
                  { href: `/salary/${salaryToSlug(100000)}`, label: '$100K' },
                  { href: `/salary/${salaryToSlug(150000)}`, label: '$150K' },
                ].map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="inline-flex items-center rounded-lg border border-border/50 bg-muted/20 px-3 py-1.5 text-xs font-medium text-foreground hover:border-emerald-500/30 hover:text-emerald-400 transition-all"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
              <div className="mt-3 space-y-2">
                <Link href="/compare" className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-emerald-400 transition-colors">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/40 shrink-0 group-hover:bg-emerald-400 transition-colors" />
                  Compare State Taxes
                </Link>
                <Link href="/federal-tax-brackets" className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-emerald-400 transition-colors">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/40 shrink-0 group-hover:bg-emerald-400 transition-colors" />
                  2026 Federal Tax Brackets
                </Link>
                <Link href="/glossary" className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-emerald-400 transition-colors">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/40 shrink-0 group-hover:bg-emerald-400 transition-colors" />
                  Tax Glossary
                </Link>
                <Link href="/blog" className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-emerald-400 transition-colors">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/40 shrink-0 group-hover:bg-emerald-400 transition-colors" />
                  Blog
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQ Section ─────────────────────────────────────────── */}
        <section className="py-12 border-t border-border/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
              <BookOpen className="h-5 w-5 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Salary After Tax FAQ</h2>
          </div>
          <div className="space-y-3">
            {SALARY_LANDING_FAQS.map((faq, i) => (
              <details
                key={i}
                className="group rounded-xl border border-border/30 bg-card/50 overflow-hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-3 p-5 text-left font-medium text-foreground hover:bg-muted/10 transition-colors">
                  <h3 className="text-sm sm:text-base">{faq.question}</h3>
                  <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ─── Author Attribution (E-E-A-T) ──────────────────────── */}
        <section className="py-12 border-t border-border/20">
          <AuthorBioCard authorId="rachel-mitchell" />
        </section>
      </div>
    </>
  );
}
