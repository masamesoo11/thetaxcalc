import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRightLeft,
  BarChart3,
  BookOpen,
  Code2,
  Globe,
  Search,
  ShieldCheck,
  TrendingUp,
  RefreshCw,
} from 'lucide-react';
import { Breadcrumb } from '@/components/finance/breadcrumb';
import { CalculatorsExplorer } from '@/components/finance/calculators-explorer';
import { SITE_URL } from '@/lib/site-config';
import {
  HUB_CALCULATORS,
  HUB_CALCULATOR_COUNT,
  HUB_CATEGORY_LABELS,
  HUB_CATEGORY_ORDER,
  hubCategoryCount,
} from '@/lib/calculators-hub-data';

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: `All ${HUB_CALCULATOR_COUNT} Tax Calculators 2026 — Free & Instant`,
  description: `Browse every free TheTaxCalc tool in one directory: paycheck, 50 state, mortgage, capital gains, 401(k), self-employment, sales tax & 2026 law calculators. Instant search — no sign-up.`,
  keywords: [
    'tax calculators',
    'all tax calculators',
    'free tax calculator directory',
    'list of tax calculators',
    'paycheck calculator',
    'state tax calculator',
    'mortgage calculator',
    'take home pay calculator',
    '2026 tax calculator',
    'free tax tools',
    'income tax calculator online',
  ],
  alternates: {
    canonical: `${SITE_URL}/calculators`,
  },
  openGraph: {
    title: `All ${HUB_CALCULATOR_COUNT} Free Tax Calculators 2026 | TheTaxCalc`,
    description: `Every free 2026 tax calculator in one place — paycheck, 50 states, mortgage, capital gains, 401(k) & more. Instant search, no sign-up.`,
    url: `${SITE_URL}/calculators`,
    siteName: 'TheTaxCalc',
    type: 'website',
  },
};

// ─── Structured Data — CollectionPage + ItemList + BreadcrumbList ────────────

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}/calculators#collection`,
      name: `All ${HUB_CALCULATOR_COUNT} Tax Calculators 2026 — Free & Instant`,
      description:
        'Directory of every free TheTaxCalc tax calculator: paycheck, 50 state, mortgage, capital gains, 401(k), self-employment, sales tax and 2026 tax law tools.',
      url: `${SITE_URL}/calculators`,
      inLanguage: 'en-US',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: HUB_CALCULATOR_COUNT,
        itemListElement: HUB_CALCULATORS.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: `${item.label} — ${item.desc}`,
          url: `${SITE_URL}${item.href}`,
        })),
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}/calculators#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${SITE_URL}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'All Calculators',
          item: `${SITE_URL}/calculators`,
        },
      ],
    },
  ],
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const RESOURCE_LINKS = [
  {
    href: '/salary',
    label: 'Salary After Tax',
    desc: 'Take-home pay for 100+ salary levels',
    icon: TrendingUp,
  },
  {
    href: '/compare',
    label: 'Compare States',
    desc: 'Side-by-side state tax comparisons',
    icon: ArrowRightLeft,
  },
  {
    href: '/tax-data',
    label: 'Tax Data Hub',
    desc: 'Rates for all 50 states — cite & embed',
    icon: BarChart3,
  },
  {
    href: '/glossary',
    label: 'Tax Glossary',
    desc: '25+ tax terms explained in plain English',
    icon: BookOpen,
  },
  {
    href: '/widgets',
    label: 'Free Widgets',
    desc: 'Embed any calculator on your site',
    icon: Code2,
  },
  {
    href: '/smartasset-alternative',
    label: 'SmartAsset Alternative',
    desc: 'Why people switch to TheTaxCalc',
    icon: Globe,
  },
];

export default function CalculatorsHubPage() {
  const categories = HUB_CATEGORY_ORDER.map((id) => ({
    id,
    label: id === 'all' ? 'All' : HUB_CATEGORY_LABELS[id],
    count: id === 'all' ? HUB_CALCULATOR_COUNT : hubCategoryCount(id),
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      {/* JSON-LD Structured Data — Server Rendered */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ─── Breadcrumb ─────────────────────────────────────────────────── */}
      <Breadcrumb items={[{ label: 'All Calculators' }]} />

      {/* ─── Hero ───────────────────────────────────────────────────────── */}
      <section className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          All <span className="gradient-text">Tax Calculators</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Every free TheTaxCalc tool in one place — {HUB_CALCULATOR_COUNT} calculators
          covering paychecks, all 50 states, mortgages, investments and the 2026 tax law.
          Search instantly, jump straight in, no sign-up.
        </p>

        {/* Stat chips */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
          {[
            { icon: Search, text: `${HUB_CALCULATOR_COUNT} free tools` },
            { icon: RefreshCw, text: 'Updated for 2026' },
            { icon: ShieldCheck, text: 'No sign-up, ever' },
            { icon: Globe, text: '50 states covered' },
          ].map(({ icon: Icon, text }) => (
            <span
              key={text}
              className="inline-flex items-center gap-1.5 rounded-full border border-border/40 bg-card/60 px-3.5 py-1.5 text-xs font-medium text-muted-foreground"
            >
              <Icon className="h-3.5 w-3.5 text-emerald-600" />
              {text}
            </span>
          ))}
        </div>
      </section>

      {/* ─── Instant-search directory ───────────────────────────────────── */}
      <CalculatorsExplorer items={HUB_CALCULATORS} categories={categories} />

      {/* ─── Beyond calculators — key data & resource pages ─────────────── */}
      <section className="mt-16">
        <h2 className="text-xl font-bold text-foreground sm:text-2xl">
          Beyond calculators — tax data & guides
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Reference pages that pair with the tools above.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {RESOURCE_LINKS.map(({ href, label, desc, icon: Icon }) => (
            <Link
              key={href}
              prefetch={false}
              href={href}
              className="group flex items-start gap-4 rounded-xl border border-border/30 bg-card/60 p-5 transition-all hover:-translate-y-0.5 hover:border-emerald-600/40 hover:shadow-lg hover:shadow-emerald-500/10 hover:bg-card"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-600/10 text-emerald-700">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground group-hover:text-emerald-700 transition-colors">
                  {label}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── About this directory (crawlable context) ──────────────────── */}
      <section className="mt-16 rounded-2xl border border-border/30 bg-card/50 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-foreground">
          About TheTaxCalc calculator directory
        </h2>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            TheTaxCalc offers {HUB_CALCULATOR_COUNT} free tax calculators for 2026 — every one
            runs entirely in your browser, updates results as you type, and never asks for an
            email or account. The directory above groups them by task: income and paycheck
            tools for take-home pay, overtime, bonuses and withholding; individual income tax
            calculators for all 50 states plus New York City, Los Angeles and Chicago;
            mortgage, property and home-sale tools; retirement and investment tools such as
            the 401(k) and capital gains calculators; business tools for self-employment and
            employer costs; side-by-side comparison calculators; and the 2026 tax-law pages
            covering the One Big Beautiful Bill Act (OBBBA) and federal brackets.
          </p>
          <p>
            All federal figures follow the 2026 IRS brackets and deduction amounts, and every
            state rate matches the state revenue department&rsquo;s published 2026 tables. Prefer
            to browse by salary instead? Try{' '}
            <Link
              href="/salary"
              prefetch={false}
              className="font-medium text-emerald-700 underline underline-offset-2 decoration-emerald-600/40 hover:decoration-emerald-600"
            >
              salary after tax
            </Link>
            , or embed any tool on your own site with the{' '}
            <Link
              href="/widgets"
              prefetch={false}
              className="font-medium text-emerald-700 underline underline-offset-2 decoration-emerald-600/40 hover:decoration-emerald-600"
            >
              free calculator widgets
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
