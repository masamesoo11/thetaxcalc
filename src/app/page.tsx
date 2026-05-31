import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, SITE_HOME_URL } from '@/lib/site-config';
import { SALARY_AMOUNTS, formatSalaryCompact } from '@/lib/salary-calculations';
import { getPublishedPostsMeta } from '@/lib/blog-index';
import { COMPARISON_SLUGS, COMPARE_STATES, parseComparisonSlug } from '@/lib/compare-config';
import {
  DollarSign,
  MapPin,
  Home,
  PiggyBank,
  ArrowRightLeft,
  TrendingUp,
  Shield,
  Calculator,
  ArrowRight,
  CheckCircle2,
  Zap,
  BarChart3,
  Star,
  Users,
  Globe,
  Compass,
  BookOpen,
  Scale,
  FileText,
  Map,
} from 'lucide-react';

// ─── Home Page Metadata ───────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Free 2026 Tax Calculator — Paycheck, Take-Home Pay & More',
  description:
    'Free 2026 tax calculator — paycheck, take-home pay after federal, FICA & state taxes. Also mortgage, 401(k), self-employment & capital gains. No sign-up.',
  alternates: {
    canonical: SITE_HOME_URL,
    languages: {
      'en-US': SITE_HOME_URL,
      'x-default': SITE_HOME_URL,
    },
    types: {
      'application/rss+xml': `${SITE_URL}/feed.xml`,
    },
  },
  openGraph: {
    title: 'TheTaxCalc — Free 2026 Tax & Paycheck Calculator',
    description:
      'Free 2026 tax calculator. Compute take-home pay after federal, FICA & state taxes for IL, TX, FL, CA, NY. No sign-up.',
    url: SITE_HOME_URL,
    siteName: 'TheTaxCalc',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: `${SITE_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: 'TheTaxCalc — Free 2026 Tax & Paycheck Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TheTaxCalc — Free 2026 Tax & Paycheck Calculator',
    description:
      'Free 2026 tax calculator. Compute take-home pay after federal, FICA & state taxes for IL, TX, FL, CA, NY. No sign-up.',
    images: [`${SITE_URL}/opengraph-image.png`],
  },
};

// ─── Calculator Data ──────────────────────────────────────────────────────────

const CALCULATOR_CARDS = [
  {
    href: '/paycheck-calculator',
    title: 'Paycheck Calculator',
    desc: 'Federal, FICA & state take-home pay with 401(k) and HSA deductions',
    icon: DollarSign,
    badge: 'Most Popular',
    badgeColor: 'bg-emerald-500/20 text-emerald-400',
    gradient: 'from-emerald-600/20 to-teal-600/10',
  },
  {
    href: '/illinois-tax-calculator',
    title: 'Illinois Tax Calculator',
    desc: '4.95% flat tax with $2,775 personal exemption — IL take-home pay',
    icon: MapPin,
    badge: 'IL',
    badgeColor: 'bg-blue-500/20 text-blue-400',
    gradient: 'from-blue-600/20 to-indigo-600/10',
  },
  {
    href: '/texas-tax-calculator',
    title: 'Texas Tax Calculator',
    desc: '0% state income tax — compute TX take-home pay with property tax analysis',
    icon: MapPin,
    badge: 'TX',
    badgeColor: 'bg-red-500/20 text-red-400',
    gradient: 'from-red-600/20 to-orange-600/10',
  },
  {
    href: '/florida-tax-calculator',
    title: 'Florida Tax Calculator',
    desc: '0% income tax + homestead exemption — FL take-home pay & cost of living',
    icon: MapPin,
    badge: 'FL',
    badgeColor: 'bg-amber-500/20 text-amber-400',
    gradient: 'from-amber-600/20 to-yellow-600/10',
  },
  {
    href: '/california-tax-calculator',
    title: 'California Tax Calculator',
    desc: '1%–13.3% progressive brackets — CA take-home pay with high tax burden',
    icon: MapPin,
    badge: 'CA',
    badgeColor: 'bg-violet-500/20 text-violet-400',
    gradient: 'from-violet-600/20 to-purple-600/10',
  },
  {
    href: '/new-york-tax-calculator',
    title: 'New York Tax Calculator',
    desc: '4%–10.9% progressive + NYC tax — NY take-home pay analysis',
    icon: MapPin,
    badge: 'NY',
    badgeColor: 'bg-cyan-500/20 text-cyan-400',
    gradient: 'from-cyan-600/20 to-sky-600/10',
  },
  {
    href: '/mortgage-calculator',
    title: 'Mortgage Calculator',
    desc: 'Monthly payment, amortization schedule & extra payment savings',
    icon: Home,
    badge: 'Finance',
    badgeColor: 'bg-rose-500/20 text-rose-400',
    gradient: 'from-rose-600/20 to-pink-600/10',
  },
  {
    href: '/401k-retirement-calculator',
    title: '401(k) Retirement Calculator',
    desc: 'Projected balance with employer match & compound annual growth',
    icon: PiggyBank,
    badge: 'Planning',
    badgeColor: 'bg-teal-500/20 text-teal-400',
    gradient: 'from-teal-600/20 to-emerald-600/10',
  },
  {
    href: '/relocation-calculator',
    title: 'Relocation Calculator',
    desc: 'Compare equivalent salary between states — IL, TX, FL, CA, NY',
    icon: ArrowRightLeft,
    badge: 'Compare',
    badgeColor: 'bg-sky-500/20 text-sky-400',
    gradient: 'from-sky-600/20 to-blue-600/10',
  },
  {
    href: '/capital-gains-calculator',
    title: 'Capital Gains Calculator',
    desc: 'Short-term & long-term rates: 0%/15%/20% + 3.8% NIIT',
    icon: TrendingUp,
    badge: 'Invest',
    badgeColor: 'bg-orange-500/20 text-orange-400',
    gradient: 'from-orange-600/20 to-amber-600/10',
  },
  {
    href: '/self-employment-tax-calculator',
    title: 'Self-Employment Calculator',
    desc: '15.3% SE tax on 92.35% of net income + half deduction + quarterly estimates',
    icon: Shield,
    badge: 'Business',
    badgeColor: 'bg-lime-500/20 text-lime-400',
    gradient: 'from-lime-600/20 to-green-600/10',
  },
  {
    href: '/tax-refund-calculator',
    title: 'Tax Refund Calculator',
    desc: 'Estimate your federal & state tax refund — income, withholding, deductions & credits',
    icon: DollarSign,
    badge: 'Refund',
    badgeColor: 'bg-emerald-500/20 text-emerald-400',
    gradient: 'from-emerald-600/20 to-green-600/10',
  },
];

const TRUST_POINTS = [
  '2026 Federal Tax Brackets (up to 37%)',
  'FICA: Social Security (6.2%) + Medicare (1.45%)',
  'SS Wage Cap: $176,100 for 2026',
  '5 State Tax Profiles: IL, TX, FL, CA, NY',
  'Standard Deductions by Filing Status',
  '401(k) & HSA Pre-Tax Deductions',
];

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: 'TheTaxCalc',
      url: SITE_URL,
      description: 'Free 2026 tax calculators — paycheck, mortgage, 401(k), capital gains, and self-employment.',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/paycheck-calculator?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Organization',
      name: 'TheTaxCalc',
      url: SITE_URL,
    },
    {
      '@type': 'WebPage',
      name: 'TheTaxCalc — Free 2026 Paycheck & Mortgage Calculator',
      description: 'Free 2026 paycheck, mortgage, and tax calculators for IL, TX, FL, CA, NY.',
      url: SITE_URL,
    },
  ],
};

// ─── Page Component (Server Component) ────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />

      {/* ─── Hero Section ──────────────────────────────────────── */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-mesh-hero">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 text-sm text-emerald-400">
              <Zap className="h-3.5 w-3.5" />
              Updated for 2026 Tax Year
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Free <span className="gradient-text">Tax Calculators</span>
              <br />
              for 2026
            </h1>

            {/* Subtitle */}
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Ever look at your pay stub and think &ldquo;wait, they took <em>how</em> much?&rdquo; Yeah, us too.
              We built these calculators so you can see exactly where your money goes —
              <strong className="text-foreground"> federal tax</strong>, FICA, and
              <strong className="text-foreground"> state taxes</strong> all broken down line by line.
              No guesswork, no surprises.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/paycheck-calculator"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all hover:scale-[1.02]"
              >
                <BarChart3 className="h-5 w-5" />
                Calculate Your Paycheck
              </Link>
              <Link
                href="/relocation-calculator"
                className="inline-flex items-center gap-2 rounded-xl border border-border/50 bg-card/50 px-8 py-3.5 text-base font-semibold text-foreground hover:bg-muted/30 transition-all"
              >
                <ArrowRightLeft className="h-5 w-5" />
                Compare States
              </Link>
            </div>

            {/* Trust Stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-emerald-400" />
                100% Free
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-emerald-400" />
                No Sign-Up Required
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4 text-emerald-400" />
                2026 Tax Data
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="h-4 w-4 text-emerald-400" />
                5 State Profiles
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Calculator Grid ────────────────────────────────────── */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-foreground">
              11 Free <span className="gradient-text">Tax Calculators</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Pick the one you need. They&apos;re all free, they all use 2026 data, and none of them will
              ask for your email.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CALCULATOR_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group premium-card hover-lift p-6 flex flex-col gap-4"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${card.gradient}`}>
                      <Icon className="h-6 w-6 text-emerald-400" />
                    </div>
                    <span className={`text-[10px] font-semibold uppercase tracking-wider rounded-full px-2.5 py-1 ${card.badgeColor}`}>
                      {card.badge}
                    </span>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-emerald-400 transition-colors">
                      {card.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                      {card.desc}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="mt-auto flex items-center gap-1.5 text-sm font-medium text-emerald-400 group-hover:gap-3 transition-all">
                    Try Calculator
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── State Comparison Preview ───────────────────────────── */}
      <section className="py-16 border-t border-border/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground">
              Which State Has the <span className="gradient-text">Lowest Tax</span>?
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Same $75,000 salary, wildly different take-home pay. Here&apos;s what you actually keep
              after taxes in each state.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { state: 'Florida', net: '$60,545', rate: '0%', label: 'Lowest Burden', color: 'emerald', href: '/florida-tax-calculator' },
              { state: 'Texas', net: '$60,545', rate: '0%', label: 'No Income Tax', color: 'emerald', href: '/texas-tax-calculator' },
              { state: 'Illinois', net: '$56,969', rate: '4.95%', label: 'Flat Rate', color: 'amber', href: '/illinois-tax-calculator' },
              { state: 'California', net: '$57,950', rate: '1%–13.3%', label: 'Highest Rate', color: 'red', href: '/california-tax-calculator' },
              { state: 'New York', net: '$57,686', rate: '4%–10.9%', label: '+ NYC Tax', color: 'red', href: '/new-york-tax-calculator' },
            ].map((item) => (
              <Link
                key={item.state}
                href={item.href}
                className={`group rounded-xl border border-border/30 bg-card/50 p-5 text-center transition-all hover-lift ${
                  item.color === 'emerald' ? 'hover:border-emerald-500/30' : item.color === 'amber' ? 'hover:border-amber-500/30' : 'hover:border-red-500/30'
                }`}
              >
                <p className={`text-xs uppercase tracking-wider ${
                  item.color === 'emerald' ? 'text-emerald-400' : item.color === 'amber' ? 'text-amber-400' : 'text-red-400'
                }`}>
                  {item.label}
                </p>
                <p className="mt-2 text-xl font-bold text-foreground">{item.state}</p>
                <p className="mt-1 text-sm text-muted-foreground">Tax: {item.rate}</p>
                <p className="mt-2 text-lg font-semibold text-foreground">Net: {item.net}</p>
                <p className="mt-1 text-[11px] text-emerald-400 group-hover:underline">View Calculator →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Salary After Tax Guide ──────────────────────────────── */}
      <section className="py-16 border-t border-border/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground">
              What&apos;s Your <span className="gradient-text">Take-Home Pay</span> After Taxes?
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Select your salary to see exact take-home pay across all 5 states — Illinois, Texas, Florida, California, and New York.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {[
              { amount: 50000, label: '$50K' },
              { amount: 60000, label: '$60K' },
              { amount: 75000, label: '$75K' },
              { amount: 80000, label: '$80K' },
              { amount: 100000, label: '$100K' },
              { amount: 120000, label: '$120K' },
              { amount: 150000, label: '$150K' },
              { amount: 200000, label: '$200K' },
              { amount: 250000, label: '$250K' },
              { amount: 300000, label: '$300K' },
            ].map((item) => (
              <Link
                key={item.amount}
                href={`/salary/${item.amount}`}
                className="group inline-flex items-center gap-1.5 rounded-xl border border-border/30 bg-card/50 px-5 py-3 text-sm font-semibold text-foreground transition-all hover:border-emerald-500/30 hover:bg-emerald-500/5 hover:text-emerald-400"
              >
                {item.label}
                <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/salary"
              className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              View all 26 salary levels
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Why We Built This ───────────────────────────────────── */}
      <section className="py-16 border-t border-border/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground">
                Why We Built <span className="gradient-text">TheTaxCalc</span>
              </h2>
              <div className="mt-4 text-muted-foreground leading-relaxed space-y-4">
                <p>
                  Honestly? We got tired of tax calculators that felt like they were designed by the IRS.
                  You know the ones — confusing interfaces, outdated brackets, and somehow always trying
                  to sell you something at the end.
                </p>
                <p>
                  One of our team members moved from California to Texas a few years back. Same salary,
                  same company — but his take-home jumped by over $8,700 a year. He had no idea the
                  difference would be that big until the first paycheck hit. That&apos;s when we thought:
                  <em> everyone should be able to see this before they make big decisions.</em>
                </p>
                <p>
                  So we built the tools we wished existed. All our calculations use the latest 2026
                  federal brackets, FICA rates, and state-specific tax laws — pulled straight from
                  IRS publications and state revenue departments, not some third-party blog post.
                </p>
              </div>
              <ul className="mt-6 space-y-3">
                {TRUST_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
              <Link
                href="/paycheck-calculator"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all"
              >
                <Calculator className="h-4 w-4" />
                Start Calculating
              </Link>
            </div>
            <div className="rounded-2xl border border-border/30 bg-card/50 p-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Example: $75,000 in Illinois</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Gross Annual Salary</span>
                  <span className="font-semibold text-foreground">$75,000.00</span>
                </div>
                <div className="divider-glow" />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Federal Tax (after $15,000 std ded)</span>
                  <span className="text-red-400">-$8,717.50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">FICA (SS + Medicare)</span>
                  <span className="text-orange-400">-$5,737.50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">IL State Tax (4.95% on $72,225)</span>
                  <span className="text-amber-400">-$3,575.14</span>
                </div>
                <div className="divider-glow" />
                <div className="flex justify-between text-base">
                  <span className="font-semibold text-foreground">Net Annual Take-Home</span>
                  <span className="font-bold text-emerald-400">$56,969.86</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Effective Tax Rate</span>
                  <span className="font-medium text-foreground">24.04%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Explore All Tools & Resources ─────────────────────── */}
      <section className="py-16 border-t border-border/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 text-sm text-emerald-400 mb-4">
              <Compass className="h-3.5 w-3.5" />
              Complete Site Directory
            </div>
            <h2 className="text-3xl font-bold text-foreground">
              Explore All <span className="gradient-text">Tools & Resources</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Every calculator, salary breakdown, blog article, and state comparison — all in one place.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* ── Column 1: Calculators ── */}
            <div className="rounded-xl border border-border/30 bg-card/50 p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
                  <Calculator className="h-4 w-4 text-emerald-400" />
                </div>
                <h3 className="text-base font-semibold text-foreground">Tax Calculators</h3>
                <span className="ml-auto text-[10px] font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 rounded-full px-2 py-0.5">11 Tools</span>
              </div>
              <ul className="space-y-2">
                {CALCULATOR_CARDS.map((card) => (
                  <li key={card.href}>
                    <Link
                      href={card.href}
                      className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-emerald-400 transition-colors py-0.5"
                    >
                      <span className="h-1 w-1 rounded-full bg-emerald-500/40 shrink-0 group-hover:bg-emerald-400 transition-colors" />
                      {card.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Column 2: Salary After Tax ── */}
            <div className="rounded-xl border border-border/30 bg-card/50 p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
                  <DollarSign className="h-4 w-4 text-emerald-400" />
                </div>
                <h3 className="text-base font-semibold text-foreground">Salary After Tax</h3>
                <span className="ml-auto text-[10px] font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 rounded-full px-2 py-0.5">26 Levels</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {SALARY_AMOUNTS.map((amount) => (
                  <Link
                    key={amount}
                    href={`/salary/${amount}`}
                    className="inline-flex items-center rounded-md border border-border/30 bg-background/50 px-2.5 py-1 text-xs font-medium text-muted-foreground hover:border-emerald-500/30 hover:text-emerald-400 hover:bg-emerald-500/5 transition-all"
                  >
                    {formatSalaryCompact(amount)}
                  </Link>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-border/20">
                <Link
                  href="/salary"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  View all salary pages
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* ── Column 3: Blog & Guides ── */}
            <div className="rounded-xl border border-border/30 bg-card/50 p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
                  <BookOpen className="h-4 w-4 text-emerald-400" />
                </div>
                <h3 className="text-base font-semibold text-foreground">Blog & Guides</h3>
                <span className="ml-auto text-[10px] font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 rounded-full px-2 py-0.5">8 Articles</span>
              </div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/blog"
                    className="group flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors py-0.5"
                  >
                    <span className="h-1 w-1 rounded-full bg-emerald-400 shrink-0" />
                    All Blog Articles
                  </Link>
                </li>
                {getPublishedPostsMeta().map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-emerald-400 transition-colors py-0.5"
                    >
                      <span className="h-1 w-1 rounded-full bg-emerald-500/40 shrink-0 group-hover:bg-emerald-400 transition-colors" />
                      <span className="line-clamp-1">{post.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Second Row: Resources & State Comparisons ── */}
          <div className="grid gap-6 lg:grid-cols-2 mt-6">
            {/* ── Resources ── */}
            <div className="rounded-xl border border-border/30 bg-card/50 p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
                  <FileText className="h-4 w-4 text-emerald-400" />
                </div>
                <h3 className="text-base font-semibold text-foreground">Resources</h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { href: '/federal-tax-brackets', label: 'Federal Tax Brackets', desc: '2026 brackets & rates', icon: Scale },
                  { href: '/glossary', label: 'Tax Glossary', desc: 'Key terms explained', icon: BookOpen },
                  { href: '/compare', label: 'State Comparisons', desc: 'Side-by-side analysis', icon: Map },
                ].map((res) => {
                  const ResIcon = res.icon;
                  return (
                    <Link
                      key={res.href}
                      href={res.href}
                      className="group flex items-start gap-3 rounded-lg border border-border/20 bg-background/30 p-3 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all"
                    >
                      <ResIcon className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-foreground group-hover:text-emerald-400 transition-colors">{res.label}</p>
                        <p className="text-[11px] text-muted-foreground">{res.desc}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* ── State Comparisons ── */}
            <div className="rounded-xl border border-border/30 bg-card/50 p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
                  <ArrowRightLeft className="h-4 w-4 text-emerald-400" />
                </div>
                <h3 className="text-base font-semibold text-foreground">State Tax Comparisons</h3>
                <span className="ml-auto text-[10px] font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 rounded-full px-2 py-0.5">10 Matchups</span>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {COMPARISON_SLUGS.map((slug) => {
                  const parsed = parseComparisonSlug(slug);
                  if (!parsed) return null;
                  const [key1, key2] = parsed;
                  const s1 = COMPARE_STATES[key1];
                  const s2 = COMPARE_STATES[key2];
                  return (
                    <Link
                      key={slug}
                      href={`/compare/${slug}`}
                      className="group flex items-center gap-2 rounded-md border border-border/20 bg-background/30 px-3 py-2 text-sm text-muted-foreground hover:border-emerald-500/30 hover:text-emerald-400 hover:bg-emerald-500/5 transition-all"
                    >
                      <span className="text-xs font-semibold text-foreground/70 group-hover:text-emerald-400 transition-colors">{s1.abbreviation}</span>
                      <span className="text-[10px] text-emerald-500/60">vs</span>
                      <span className="text-xs font-semibold text-foreground/70 group-hover:text-emerald-400 transition-colors">{s2.abbreviation}</span>
                      <span className="ml-auto text-[11px] text-muted-foreground/50 group-hover:text-emerald-400/70 transition-colors hidden sm:inline">{s1.name} vs {s2.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Blog Preview ──────────────────────────────────────── */}
      <section className="py-16 border-t border-border/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Latest from the <span className="text-emerald-400">Blog</span>
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">We do the homework so you don&apos;t have to</p>
            </div>
            <Link
              href="/blog"
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { title: '2026 Federal Tax Brackets Explained', href: '/blog/2026-federal-tax-brackets-explained', category: 'Tax Guide' },
              { title: 'Illinois Income Tax Guide 2026', href: '/blog/illinois-income-tax-guide-2026', category: 'State Tax' },
              { title: 'Florida vs Texas Tax Comparison', href: '/blog/florida-vs-texas-tax-comparison', category: 'Comparison' },
            ].map((post) => (
              <Link
                key={post.href}
                href={post.href}
                className="group rounded-xl border border-border/30 bg-card/50 p-5 transition-all hover:border-emerald-500/30 hover-lift"
              >
                <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400">{post.category}</span>
                <h3 className="mt-2 text-base font-semibold text-foreground group-hover:text-emerald-400 transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="mt-3 text-xs text-emerald-400 group-hover:underline">Read Article →</p>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center sm:hidden">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400"
            >
              View All Articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
