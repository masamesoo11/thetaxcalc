import { Metadata } from 'next';
import Link from 'next/link';
import {
  SALARY_AMOUNTS,
  calculateSalaryTakeHome,
  getGroupedSalaries,
  formatSalary,
  formatSalaryCompact,
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
} from 'lucide-react';

// ─── Page Metadata ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Salary After Tax Calculator 2026 — Take-Home Pay by State | TaxYield.io',
  description:
    'See your take-home pay for every salary from $30K to $500K. Compare after-tax income across Illinois, Texas, Florida, California, and New York for 2026.',
  keywords: [
    'salary after tax', 'take home pay by salary', 'net pay calculator',
    'salary after tax 2026', '$50000 after tax', '$75000 after tax',
    '$100000 after tax', '$150000 after tax', 'salary by state',
    'take home pay calculator', 'after tax income',
  ],
  alternates: {
    canonical: 'https://taxyield.io/salary',
    languages: {
      'en-US': 'https://taxyield.io/salary',
      'x-default': 'https://taxyield.io/salary',
    },
  },
  openGraph: {
    title: 'Salary After Tax Calculator 2026 — Take-Home Pay by State',
    description:
      'See your take-home pay for every salary from $30K to $500K. Compare after-tax income across IL, TX, FL, CA, NY.',
    url: 'https://taxyield.io/salary',
    siteName: 'TaxYield.io',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Salary After Tax Calculator 2026 — Take-Home Pay by State',
    description:
      'See your take-home pay for every salary from $30K to $500K. Compare after-tax income across IL, TX, FL, CA, NY.',
  },
};

// ─── JSON-LD ───────────────────────────────────────────────────────────────────

const salaryPageJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://taxyield.io' },
        { '@type': 'ListItem', position: 2, name: 'Salary After Tax', item: 'https://taxyield.io/salary' },
      ],
    },
    {
      '@type': 'WebPage',
      name: 'Salary After Tax Calculator 2026 — Take-Home Pay by State',
      description: 'See your take-home pay for every salary from $30K to $500K. Compare after-tax income across IL, TX, FL, CA, NY.',
      url: 'https://taxyield.io/salary',
      inLanguage: 'en-US',
      dateModified: '2026-01-01',
    },
    {
      '@type': 'CollectionPage',
      name: 'Salary After Tax Pages',
      description: 'Programmatic salary pages showing after-tax take-home pay for salaries from $30,000 to $500,000 across 5 states.',
      url: 'https://taxyield.io/salary',
      hasPart: SALARY_AMOUNTS.map((amount) => ({
        '@type': 'WebPage',
        name: `$${amount.toLocaleString()} After Tax in 2026`,
        url: `https://taxyield.io/salary/${amount}`,
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
      href={`/salary/${amount}`}
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
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
          <a href="/" className="hover:text-foreground transition-colors">Home</a>
          <span className="text-muted-foreground/50">/</span>
          <span className="text-foreground font-medium">Salary After Tax</span>
        </nav>

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
              <h2 className="text-2xl font-bold text-foreground">
                {group.label}
              </h2>
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
                desc: 'Progressive brackets from 10% to 37% applied after the $15,000 standard deduction for Single filers.',
              },
              {
                step: '2',
                title: 'FICA Payroll Tax',
                desc: '6.2% Social Security (up to $176,100 cap) + 1.45% Medicare on all wages. Additional 0.9% above $200,000.',
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
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Need a More Precise Calculation?
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-6">
              Our paycheck calculator supports 401(k), HSA, different filing statuses,
              and all 5 states with detailed breakdowns.
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
      </div>
    </>
  );
}
