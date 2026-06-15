import { Metadata } from 'next';
import Link from 'next/link';
import {
  Database,
  ChevronDown,
  BookOpen,
  ShieldCheck,
  Calendar,
  DollarSign,
  TrendingUp,
  Landmark,
  PiggyBank,
  ArrowRight,
  Calculator,
  ExternalLink,
  Info,
} from 'lucide-react';
import { Breadcrumb } from '@/components/finance/breadcrumb';
import { CiteButton } from '@/components/finance/cite-button';
import { SITE_URL } from '@/lib/site-config';
import { getCalculatorAuthor, authorToJsonLd } from '@/lib/authors';
import { AuthorBioCard } from '@/components/finance/author-bio-card';

// ─── Page Metadata ────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: { absolute: '2026 Tax Brackets & Rates — Free Tax Reference' },
  description:
    'Free 2026 federal tax brackets, FICA rates, state tax comparison, deductions & 401(k) limits. IRS-sourced. Cite freely.',
  keywords: [
    '2026 federal tax brackets',
    '2026 tax rates',
    'FICA tax rates 2026',
    'state income tax comparison',
    'standard deduction 2026',
    '401k contribution limits 2026',
    'HSA limits 2026',
    'IRA contribution limits 2026',
    'tax deadlines 2026',
    'Social Security wage base 2026',
    'Medicare tax rate',
    'self-employment tax rate',
    'tax reference data',
    'free tax data',
  ],
  authors: [{ name: 'Rachel Mitchell, CPA' }],
  alternates: {
    canonical: `${SITE_URL}/resources`,
    languages: {
      'en-US': `${SITE_URL}/resources`,
      'x-default': `${SITE_URL}/resources`,
    },
  },
  openGraph: {
    title: '2026 Tax Brackets & Rates | Free Reference',
    description:
      'Free 2026 federal tax brackets, FICA rates, state tax comparison, deductions & 401(k) limits. IRS-sourced. Cite freely.',
    url: `${SITE_URL}/resources`,
    siteName: 'TheTaxCalc',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: `${SITE_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: '2026 Tax Data & Rates — TheTaxCalc',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '2026 Tax Brackets & Rates | Free Reference',
    description:
      'Free 2026 federal tax brackets, FICA rates, state income tax comparison, standard deductions, and 401(k) limits. Sourced from IRS publications.',
  },
};

// ─── Data: Federal Tax Brackets 2026 ─────────────────────────────────────────

const FEDERAL_BRACKETS = {
  Single: [
    { range: '$0 – $11,925', rate: '10%' },
    { range: '$11,926 – $48,475', rate: '12%' },
    { range: '$48,476 – $103,350', rate: '22%' },
    { range: '$103,351 – $197,300', rate: '24%' },
    { range: '$197,301 – $250,525', rate: '32%' },
    { range: '$250,526 – $626,350', rate: '35%' },
    { range: '$626,351+', rate: '37%' },
  ],
  'Married Filing Jointly': [
    { range: '$0 – $23,850', rate: '10%' },
    { range: '$23,851 – $96,950', rate: '12%' },
    { range: '$96,951 – $206,700', rate: '22%' },
    { range: '$206,701 – $394,600', rate: '24%' },
    { range: '$394,601 – $501,050', rate: '32%' },
    { range: '$501,051 – $751,600', rate: '35%' },
    { range: '$751,601+', rate: '37%' },
  ],
  'Head of Household': [
    { range: '$0 – $17,000', rate: '10%' },
    { range: '$17,001 – $64,850', rate: '12%' },
    { range: '$64,851 – $137,700', rate: '22%' },
    { range: '$137,701 – $209,400', rate: '24%' },
    { range: '$209,401 – $275,450', rate: '32%' },
    { range: '$275,451 – $561,500', rate: '35%' },
    { range: '$561,501+', rate: '37%' },
  ],
};

// ─── Data: State Income Tax Rates ─────────────────────────────────────────────

const STATE_TAX_DATA = [
  {
    state: 'Illinois',
    abbr: 'IL',
    rate: '4.95%',
    type: 'Flat',
    deduction: '$2,775',
    calculator: '/illinois-tax-calculator',
  },
  {
    state: 'Texas',
    abbr: 'TX',
    rate: '0%',
    type: 'None',
    deduction: 'N/A',
    calculator: '/texas-tax-calculator',
  },
  {
    state: 'Florida',
    abbr: 'FL',
    rate: '0%',
    type: 'None',
    deduction: 'N/A',
    calculator: '/florida-tax-calculator',
  },
  {
    state: 'California',
    abbr: 'CA',
    rate: '1% – 13.3%',
    type: 'Progressive',
    deduction: '$5,971 (S) / $11,942 (MFJ)',
    calculator: '/california-tax-calculator',
  },
  {
    state: 'New York',
    abbr: 'NY',
    rate: '4% – 10.9%',
    type: 'Progressive',
    deduction: '$8,500 (S) / $17,150 (MFJ)',
    calculator: '/new-york-tax-calculator',
  },
  {
    state: 'Georgia',
    abbr: 'GA',
    rate: '5.49%',
    type: 'Flat',
    deduction: '$5,400 (S) / $7,100 (MFJ)',
    calculator: '/georgia-tax-calculator',
  },
  {
    state: 'Virginia',
    abbr: 'VA',
    rate: '5.75%',
    type: 'Flat',
    deduction: '$8,500 (S) / $17,000 (MFJ)',
    calculator: '/virginia-tax-calculator',
  },
];

// ─── Data: FICA Tax Rates ─────────────────────────────────────────────────────

const FICA_DATA = [
  { component: 'Social Security (OASDI)', rate: '6.2%', wageBase: '$184,500', notes: 'Employer matches 6.2%' },
  { component: 'Medicare (HI)', rate: '1.45%', wageBase: 'No cap', notes: 'Employer matches 1.45%' },
  { component: 'Additional Medicare', rate: '0.9%', wageBase: '>$200,000', notes: 'Employee only; no employer match' },
  { component: 'Self-Employment Tax', rate: '15.3%', wageBase: '92.35% of net SE income', notes: 'Social Security portion capped at $184,500' },
];

// ─── Data: Standard Deductions ────────────────────────────────────────────────

const STANDARD_DEDUCTIONS = [
  { filingStatus: 'Single', amount: '$16,100' },
  { filingStatus: 'Married Filing Jointly', amount: '$32,200' },
  { filingStatus: 'Head of Household', amount: '$24,150' },
  { filingStatus: 'Married Filing Separately', amount: '$16,100' },
  { filingStatus: 'Additional (Age 65+ or Blind)', amount: '$1,600 (S/MFS) / $1,300 (MFJ/QW)' },
];

// ─── Data: Retirement Contribution Limits ──────────────────────────────────────

const RETIREMENT_LIMITS = [
  { plan: '401(k) / 403(b) / 457', limit: '$23,500', catchUp: '$7,500 (age 50+)', notes: '' },
  { plan: 'Enhanced Catch-up', limit: '$23,500', catchUp: '$11,250 (age 60–63)', notes: 'New under SECURE 2.0' },
  { plan: 'Traditional & Roth IRA', limit: '$7,000', catchUp: '$1,000 (age 50+)', notes: '' },
  { plan: 'HSA — Individual', limit: '$4,300', catchUp: '$1,000 (age 55+)', notes: '' },
  { plan: 'HSA — Family', limit: '$8,550', catchUp: '$1,000 (age 55+)', notes: '' },
  { plan: 'Simple IRA', limit: '$16,500', catchUp: '$3,500 (age 50+)', notes: '' },
];

// ─── Data: Key Tax Deadlines 2026 ─────────────────────────────────────────────

const TAX_DEADLINES = [
  { date: 'January 15, 2026', event: 'Q4 2025 estimated tax payment due', icon: Calendar },
  { date: 'January 31, 2026', event: 'W-2 and 1099 forms due to recipients', icon: Calendar },
  { date: 'February 28, 2026', event: 'W-2 and 1099 forms due to IRS (paper)', icon: Calendar },
  { date: 'March 16, 2026', event: 'S-Corp and Partnership tax returns due', icon: Calendar },
  { date: 'March 31, 2026', event: 'W-2 and 1099 forms due to IRS (electronic)', icon: Calendar },
  { date: 'April 15, 2026', event: 'Individual tax return (Form 1040) due — or file extension', icon: Calendar },
  { date: 'April 15, 2026', event: 'Q1 2026 estimated tax payment due', icon: Calendar },
  { date: 'June 15, 2026', event: 'Q2 2026 estimated tax payment due', icon: Calendar },
  { date: 'June 15, 2026', event: 'Tax return due for U.S. citizens abroad', icon: Calendar },
  { date: 'September 15, 2026', event: 'Q3 2026 estimated tax payment due', icon: Calendar },
  { date: 'September 15, 2026', event: 'S-Corp and Partnership extended returns due', icon: Calendar },
  { date: 'October 15, 2026', event: 'Extended individual tax returns due', icon: Calendar },
];

// ─── Data: FAQ ────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    q: 'Are these 2026 tax brackets final?',
    a: 'The 2026 federal income tax brackets shown on this page are based on IRS Revenue Procedure 2025-XX, which adjusts brackets for inflation annually. The IRS typically publishes final figures in late October or November of the preceding year. We update this page within 48 hours of official IRS publication. The numbers shown are the most current available.',
  },
  {
    q: 'What is the Social Security wage base for 2026?',
    a: 'The Social Security (OASDI) wage base for 2026 is $184,500. This means the 6.2% Social Security tax applies only to the first $184,500 of earned income. Any wages above this amount are not subject to Social Security tax, though the 1.45% Medicare tax still applies with no cap.',
  },
  {
    q: 'What is the self-employment tax rate for 2026?',
    a: 'The self-employment tax rate for 2026 is 15.3%, applied to 92.35% of your net self-employment income. This breaks down to 12.4% for Social Security (capped at the $184,500 wage base) and 2.9% for Medicare (no cap). If your earned income exceeds $200,000 ($250,000 for married filing jointly), you also owe the 0.9% Additional Medicare Tax.',
  },
  {
    q: 'Which states have no income tax?',
    a: 'As of 2026, nine states have no state income tax: Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, and Wyoming. New Hampshire taxes dividends and interest but not wages. We cover Texas and Florida in detail on this site.',
  },
  {
    q: 'What is the standard deduction for 2026?',
    a: 'The 2026 standard deduction is $16,100 for Single and Married Filing Separately filers, $32,200 for Married Filing Jointly, and $24,150 for Head of Household. Taxpayers who are 65 or older or blind get an additional $1,600 (Single/MFS) or $1,300 (MFJ/QW).',
  },
  {
    q: 'How much can I contribute to my 401(k) in 2026?',
    a: 'The 2026 401(k) contribution limit is $23,500. If you are age 50 or older, you can make an additional catch-up contribution of $7,500, for a total of $31,000. Under SECURE 2.0, workers aged 60–63 have an enhanced catch-up limit of $11,250, for a total of $34,750.',
  },
  {
    q: 'Can I cite this data in my article or report?',
    a: 'Yes — that is exactly what this page is for. Click the "Cite this data" button on any section to copy an APA-formatted citation. You may also link directly to any section using the "Link" button. All data is free to use with attribution. Suggested citation format: TheTaxCalc. (2026). [Section Title]. Retrieved from https://thetaxcalc.com/resources',
  },
  {
    q: 'Where does the data on this page come from?',
    a: 'All federal tax data comes directly from IRS publications, including Revenue Procedures for annual inflation adjustments. State tax data is sourced from each state\'s Department of Revenue. FICA rates and wage bases are set by the Social Security Administration. We update this page within 48 hours of official government publications. See our Source & Methodology section for details.',
  },
];

// ─── JSON-LD Structured Data ──────────────────────────────────────────────────

function getJsonLd() {
  const faqEntries = FAQ_ITEMS.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a,
    },
  }));

  return {
    '@context': 'https://schema.org',
    '@graph': [

      {
        '@id': `${SITE_URL}/resources#webpage`,
        '@type': 'WebPage',
        name: '2026 Tax Data, Brackets & Rates — Free Reference',
        description:
          'Free 2026 federal tax brackets, FICA rates, state tax comparison, deductions & 401(k) limits. IRS-sourced. Cite freely.',
        url: `${SITE_URL}/resources`,
        inLanguage: 'en-US',
        dateModified: '2026-01-15',
        author: { '@id': `${SITE_URL}/resources#author` },
        reviewedBy: { '@id': `${SITE_URL}/resources#author` },
        publisher: { '@id': `${SITE_URL}/#organization` },
        breadcrumb: { '@id': `${SITE_URL}/resources#breadcrumb` },
      },
      {
        '@id': `${SITE_URL}/resources#breadcrumb`,
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Tax Data & Resources' },
        ],
      },
      {
        '@id': `${SITE_URL}/resources#author`,
        ...authorToJsonLd(getCalculatorAuthor()),
      },
      {
        '@id': `${SITE_URL}/resources#faq`,
        '@type': 'FAQPage',
        mainEntity: faqEntries,
      },
    ],
  };
}

// ─── Section Header Component ─────────────────────────────────────────────────

function SectionHeader({
  id,
  icon: Icon,
  title,
  highlight,
  citeTitle,
}: {
  id: string;
  icon: React.ElementType;
  title: string;
  highlight: string;
  citeTitle: string;
}) {
  return (
    <div id={id} className="scroll-mt-24 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
            <Icon className="h-5 w-5 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">
            {title} <span className="gradient-text">{highlight}</span>
          </h2>
        </div>
        <CiteButton title={citeTitle} sectionId={id} />
      </div>
    </div>
  );
}

// ─── Table Styles ─────────────────────────────────────────────────────────────

const tableHeaderClass =
  'px-4 py-3 text-left text-xs font-semibold text-emerald-400 uppercase tracking-wider bg-emerald-500/5';
const tableCellClass = 'px-4 py-3 text-sm text-foreground';
const tableAltCellClass = 'px-4 py-3 text-sm text-muted-foreground';

// ─── Main Page Component ──────────────────────────────────────────────────────

export default function ResourcesPage() {
  const jsonLd = getJsonLd();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Tax Data & Resources' }]} />

      {/* ─── Hero Section ─────────────────────────────────────────────────── */}
      <section className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 text-sm text-emerald-400 mb-6">
          <Database className="h-3.5 w-3.5" />
          Free Reference Data — Cite & Link Freely
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          2026 Tax Data, Brackets{' '}
          <span className="gradient-text">&amp; Rates</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          The complete 2026 tax reference — federal brackets, FICA rates, state comparisons,
          standard deductions, retirement limits, and key deadlines. All sourced from IRS
          publications and state revenue departments. Free to cite and link.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          <Link
            href="#federal-tax-brackets"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all hover:scale-[1.02]"
          >
            <TrendingUp className="h-4 w-4" />
            Tax Brackets
          </Link>
          <Link
            href="#state-tax-rates"
            className="inline-flex items-center gap-2 rounded-xl border border-border/50 bg-card/50 px-6 py-3 text-sm font-medium text-foreground hover:border-emerald-500/30 hover:text-emerald-400 transition-all"
          >
            <Landmark className="h-4 w-4" />
            State Rates
          </Link>
          <Link
            href="#fica-rates"
            className="inline-flex items-center gap-2 rounded-xl border border-border/50 bg-card/50 px-6 py-3 text-sm font-medium text-foreground hover:border-emerald-500/30 hover:text-emerald-400 transition-all"
          >
            <DollarSign className="h-4 w-4" />
            FICA Rates
          </Link>
        </div>
      </section>

      {/* ─── Quick Stats ──────────────────────────────────────────────────── */}
      <section className="mb-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Federal Brackets', value: '7 rates', detail: '3 filing statuses' },
            { label: 'States Covered', value: '7', detail: 'IL, TX, FL, CA, NY, GA, VA' },
            { label: 'SS Wage Base', value: '$184,500', detail: '6.2% OASDI' },
            { label: '401(k) Limit', value: '$23,500', detail: '+$7,500 catch-up' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border/30 bg-card/50 p-5 text-center"
            >
              <p className="text-2xl font-bold text-emerald-400">{stat.value}</p>
              <p className="text-sm font-semibold text-foreground mt-1">{stat.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Section 1: Federal Tax Brackets ──────────────────────────────── */}
      <section className="mb-12">
        <SectionHeader
          id="federal-tax-brackets"
          icon={TrendingUp}
          title="2026 Federal"
          highlight="Tax Brackets"
          citeTitle="2026 Federal Tax Brackets"
        />
        <div className="space-y-6">
          {Object.entries(FEDERAL_BRACKETS).map(([filingStatus, brackets]) => (
            <div
              key={filingStatus}
              className="rounded-xl border border-border/30 bg-card/50 overflow-hidden"
            >
              <div className="px-5 py-3 border-b border-border/20 bg-emerald-500/5">
                <h3 className="text-base font-semibold text-foreground">{filingStatus}</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/20">
                      <th className={tableHeaderClass}>Bracket Range</th>
                      <th className={tableHeaderClass}>Tax Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {brackets.map((bracket, i) => (
                      <tr key={i} className="border-b border-border/10 last:border-0 hover:bg-muted/5 transition-colors">
                        <td className={tableCellClass}>{bracket.range}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2.5 py-0.5 text-sm font-semibold text-emerald-400">
                            {bracket.rate}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
          Tax brackets are marginal — only the income within each bracket is taxed at that rate.
          For example, a single filer earning $50,000 pays 10% on the first $11,925, 12% on the
          next $36,550, and so on. Use our{' '}
          <Link href="/paycheck-calculator" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2">
            paycheck calculator
          </Link>{' '}
          to compute your actual tax.
        </p>
      </section>

      {/* ─── Section 2: State Income Tax Rates ───────────────────────────── */}
      <section className="mb-12">
        <SectionHeader
          id="state-tax-rates"
          icon={Landmark}
          title="State Income"
          highlight="Tax Rates"
          citeTitle="2026 State Income Tax Rates Comparison"
        />
        <div className="rounded-xl border border-border/30 bg-card/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/20">
                  <th className={tableHeaderClass}>State</th>
                  <th className={tableHeaderClass}>Income Tax Rate</th>
                  <th className={tableHeaderClass}>Type</th>
                  <th className={`${tableHeaderClass} hidden sm:table-cell`}>Standard Deduction</th>
                  <th className={tableHeaderClass}>Calculator</th>
                </tr>
              </thead>
              <tbody>
                {STATE_TAX_DATA.map((state, i) => (
                  <tr key={state.abbr} className={`border-b border-border/10 last:border-0 hover:bg-muted/5 transition-colors ${i % 2 === 1 ? 'bg-muted/[0.02]' : ''}`}>
                    <td className={tableCellClass}>
                      <span className="font-semibold">{state.state}</span>{' '}
                      <span className="text-xs text-muted-foreground">({state.abbr})</span>
                    </td>
                    <td className={tableCellClass}>
                      <span className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-sm font-semibold ${
                        state.rate === '0%'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        {state.rate}
                      </span>
                    </td>
                    <td className={tableAltCellClass}>
                      <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${
                        state.type === 'None'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : state.type === 'Flat'
                          ? 'bg-blue-500/10 text-blue-400'
                          : 'bg-purple-500/10 text-purple-400'
                      }`}>
                        {state.type}
                      </span>
                    </td>
                    <td className={`${tableAltCellClass} hidden sm:table-cell text-xs`}>
                      {state.deduction}
                    </td>
                    <td className={tableCellClass}>
                      <Link
                        href={state.calculator}
                        className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                      >
                        <Calculator className="h-3 w-3" />
                        Open
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-4 flex items-start gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4 text-xs text-muted-foreground leading-relaxed">
          <Info className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
          <p>
            We cover all 50 states in detail with full paycheck calculators. For sales tax rates
            across all 50 states, visit our{' '}
            <Link href="/sales-tax-calculator" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2">
              sales tax calculator
            </Link>{' '}
            or individual state pages (e.g.,{' '}
            <Link href="/sales-tax-calculator/california" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2">
              California sales tax
            </Link>).
          </p>
        </div>
      </section>

      {/* ─── Section 3: FICA Tax Rates ───────────────────────────────────── */}
      <section className="mb-12">
        <SectionHeader
          id="fica-rates"
          icon={DollarSign}
          title="FICA Tax"
          highlight="Rates 2026"
          citeTitle="2026 FICA Tax Rates"
        />
        <div className="rounded-xl border border-border/30 bg-card/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/20">
                  <th className={tableHeaderClass}>Component</th>
                  <th className={tableHeaderClass}>Rate</th>
                  <th className={`${tableHeaderClass} hidden sm:table-cell`}>Wage Base</th>
                  <th className={`${tableHeaderClass} hidden md:table-cell`}>Notes</th>
                </tr>
              </thead>
              <tbody>
                {FICA_DATA.map((row, i) => (
                  <tr key={i} className={`border-b border-border/10 last:border-0 hover:bg-muted/5 transition-colors ${i % 2 === 1 ? 'bg-muted/[0.02]' : ''}`}>
                    <td className={tableCellClass}>
                      <span className="font-semibold">{row.component}</span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2.5 py-0.5 text-sm font-semibold text-emerald-400">
                        {row.rate}
                      </span>
                    </td>
                    <td className={`${tableAltCellClass} hidden sm:table-cell`}>
                      {row.wageBase}
                    </td>
                    <td className={`${tableAltCellClass} hidden md:table-cell text-xs`}>
                      {row.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-border/30 bg-card/50 p-4">
            <p className="text-xs font-semibold text-foreground mb-1">Combined Employee FICA</p>
            <p className="text-lg font-bold text-emerald-400">7.65%</p>
            <p className="text-xs text-muted-foreground">6.2% SS + 1.45% Medicare</p>
          </div>
          <div className="rounded-lg border border-border/30 bg-card/50 p-4">
            <p className="text-xs font-semibold text-foreground mb-1">Self-Employment Tax</p>
            <p className="text-lg font-bold text-emerald-400">15.3%</p>
            <p className="text-xs text-muted-foreground">On 92.35% of net SE income</p>
          </div>
        </div>
      </section>

      {/* ─── Section 4: Standard Deductions ──────────────────────────────── */}
      <section className="mb-12">
        <SectionHeader
          id="standard-deductions"
          icon={BookOpen}
          title="Standard"
          highlight="Deductions 2026"
          citeTitle="2026 Standard Deductions"
        />
        <div className="rounded-xl border border-border/30 bg-card/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/20">
                  <th className={tableHeaderClass}>Filing Status</th>
                  <th className={tableHeaderClass}>Deduction Amount</th>
                </tr>
              </thead>
              <tbody>
                {STANDARD_DEDUCTIONS.map((row, i) => (
                  <tr key={i} className={`border-b border-border/10 last:border-0 hover:bg-muted/5 transition-colors ${i % 2 === 1 ? 'bg-muted/[0.02]' : ''}`}>
                    <td className={tableCellClass}>
                      <span className={i === 4 ? 'text-muted-foreground' : 'font-semibold'}>{row.filingStatus}</span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2.5 py-0.5 text-sm font-semibold text-emerald-400">
                        {row.amount}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
          Taxpayers who are 65 or older OR blind receive an additional standard deduction amount.
          Those who are both 65+ AND blind receive double the additional amount. Itemizing
          deductions may be more beneficial if your qualifying expenses exceed these amounts.
        </p>
      </section>

      {/* ─── Section 5: Retirement Contribution Limits ───────────────────── */}
      <section className="mb-12">
        <SectionHeader
          id="retirement-limits"
          icon={PiggyBank}
          title="401(k) &amp; Retirement"
          highlight="Limits 2026"
          citeTitle="2026 401(k) and Retirement Contribution Limits"
        />
        <div className="rounded-xl border border-border/30 bg-card/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/20">
                  <th className={tableHeaderClass}>Plan</th>
                  <th className={tableHeaderClass}>Limit</th>
                  <th className={`${tableHeaderClass} hidden sm:table-cell`}>Catch-Up (50+)</th>
                  <th className={`${tableHeaderClass} hidden md:table-cell`}>Notes</th>
                </tr>
              </thead>
              <tbody>
                {RETIREMENT_LIMITS.map((row, i) => (
                  <tr key={i} className={`border-b border-border/10 last:border-0 hover:bg-muted/5 transition-colors ${i % 2 === 1 ? 'bg-muted/[0.02]' : ''}`}>
                    <td className={tableCellClass}>
                      <span className="font-semibold">{row.plan}</span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {row.limit === '—' ? (
                        <span className="text-muted-foreground">—</span>
                      ) : (
                        <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2.5 py-0.5 text-sm font-semibold text-emerald-400">
                          {row.limit}
                        </span>
                      )}
                    </td>
                    <td className={`${tableAltCellClass} hidden sm:table-cell text-xs`}>
                      {row.catchUp}
                    </td>
                    <td className={`${tableAltCellClass} hidden md:table-cell text-xs`}>
                      {row.notes || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
          Contribution limits are per-person. Employer matches do not count toward the employee
          limit but are subject to the total annual addition limit ($69,000 for 2026). Use our{' '}
          <Link href="/401k-retirement-calculator" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2">
            401(k) calculator
          </Link>{' '}
          to project your retirement savings.
        </p>
      </section>

      {/* ─── Section 6: Key Tax Deadlines ─────────────────────────────────── */}
      <section className="mb-12">
        <SectionHeader
          id="tax-deadlines"
          icon={Calendar}
          title="Key Tax"
          highlight="Deadlines 2026"
          citeTitle="2026 Key Tax Deadlines"
        />
        <div className="rounded-xl border border-border/30 bg-card/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/20">
                  <th className={tableHeaderClass}>Date</th>
                  <th className={tableHeaderClass}>Event</th>
                </tr>
              </thead>
              <tbody>
                {TAX_DEADLINES.map((row, i) => (
                  <tr key={i} className={`border-b border-border/10 last:border-0 hover:bg-muted/5 transition-colors ${i % 2 === 1 ? 'bg-muted/[0.02]' : ''}`}>
                    <td className="px-4 py-3 text-sm whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
                        <Calendar className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                        {row.date}
                      </span>
                    </td>
                    <td className={tableAltCellClass}>
                      {row.event}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
          Deadlines that fall on a weekend or holiday are extended to the next business day.
          File Form 4868 by April 15 to get a 6-month extension (to October 15) — but an extension
          to file is not an extension to pay. Estimated taxes are still due quarterly.
        </p>
      </section>

      {/* ─── Source & Methodology ─────────────────────────────────────────── */}
      <section className="mb-12">
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              Source &amp; <span className="gradient-text">Methodology</span>
            </h2>
          </div>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              All data on this page comes directly from official government sources. We do not
              estimate, round, or derive figures from secondary sources. Our methodology is
              straightforward:
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/60 shrink-0 mt-2" />
                <span>
                  <strong className="text-foreground">Federal tax brackets</strong> — IRS Revenue
                  Procedure for annual inflation adjustments (Rev. Proc. 2025-32)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/60 shrink-0 mt-2" />
                <span>
                  <strong className="text-foreground">FICA rates &amp; wage base</strong> — Social
                  Security Administration and CMS publications
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/60 shrink-0 mt-2" />
                <span>
                  <strong className="text-foreground">State income tax rates</strong> — Each
                  state&apos;s Department of Revenue official publications
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/60 shrink-0 mt-2" />
                <span>
                  <strong className="text-foreground">Standard deductions</strong> — IRS annual
                  inflation adjustments
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/60 shrink-0 mt-2" />
                <span>
                  <strong className="text-foreground">Retirement contribution limits</strong> — IRS
                  cost-of-living adjustments and SECURE 2.0 provisions
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/60 shrink-0 mt-2" />
                <span>
                  <strong className="text-foreground">Tax deadlines</strong> — IRS published tax
                  calendar
                </span>
              </li>
            </ul>
            <p>
              We update this page within <strong className="text-foreground">48 hours</strong> of
              official government publication. If you spot an error or outdated figure, please
              contact us so we can correct it immediately.
            </p>
          </div>
        </div>
      </section>

      {/* ─── FAQ Section ──────────────────────────────────────────────────── */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
            <BookOpen className="h-5 w-5 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">
            Tax Data <span className="gradient-text">FAQ</span>
          </h2>
        </div>
        <div className="space-y-3">
          {FAQ_ITEMS.map((faq, i) => (
            <details
              key={i}
              className="group rounded-xl border border-border/30 bg-card/50 overflow-hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-3 p-5 text-left font-medium text-foreground hover:bg-muted/10 transition-colors">
                <h3 className="text-sm sm:text-base">{faq.q}</h3>
                <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ─── Section 7: No-Income-Tax States ─────────────────────────────── */}
      <section className="mb-12">
        <SectionHeader
          id="no-income-tax-states"
          icon={Landmark}
          title="No Income Tax"
          highlight="States 2026"
          citeTitle="States With No Income Tax in 2026"
        />
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6">
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            As of 2026, <strong className="text-foreground">nine U.S. states</strong> levy no state
            income tax on wages. Two of these states (New Hampshire) tax dividends and interest but
            not earned income. Living in a no-income-tax state can save thousands per year,
            especially for high earners.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { state: 'Alaska', abbr: 'AK', note: 'No income tax, no state sales tax', calculator: null },
              { state: 'Florida', abbr: 'FL', note: 'No income tax', calculator: '/florida-tax-calculator' },
              { state: 'Nevada', abbr: 'NV', note: 'No income tax', calculator: null },
              { state: 'New Hampshire', abbr: 'NH', note: 'Tax on dividends/interest only', calculator: null },
              { state: 'South Dakota', abbr: 'SD', note: 'No income tax', calculator: null },
              { state: 'Tennessee', abbr: 'TN', note: 'No income tax (Hall tax repealed 2021)', calculator: null },
              { state: 'Texas', abbr: 'TX', note: 'No income tax', calculator: '/texas-tax-calculator' },
              { state: 'Washington', abbr: 'WA', note: 'No income tax (capital gains tax added 2022)', calculator: null },
              { state: 'Wyoming', abbr: 'WY', note: 'No income tax', calculator: null },
            ].map((item) => (
              <div
                key={item.abbr}
                className="flex items-start gap-3 rounded-lg border border-emerald-500/15 bg-background/40 p-3"
              >
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-emerald-500/10 text-xs font-bold text-emerald-400">
                  {item.abbr}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">{item.state}</p>
                  <p className="text-xs text-muted-foreground">{item.note}</p>
                  {item.calculator && (
                    <Link
                      href={item.calculator}
                      className="text-xs text-emerald-400 hover:text-emerald-300 underline underline-offset-2 mt-0.5 inline-block"
                    >
                      Calculator →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed mt-4">
            Note: Even in states with no income tax, you still pay federal income tax and FICA (7.65% employee).
            Some states compensate with higher sales or property taxes. Use our{' '}
            <Link href="/compare" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2">
              state comparison tool
            </Link>{' '}
            to see the full picture.
          </p>
        </div>
      </section>

      {/* ─── Bottom CTA ───────────────────────────────────────────────────── */}
      <section className="mb-12 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center">
        <Database className="h-8 w-8 text-emerald-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-3">
          Use This Data Freely
        </h2>
        <p className="text-muted-foreground mb-6 max-w-lg mx-auto text-sm leading-relaxed">
          This reference data is free to cite, link to, and share. Click &ldquo;Cite this
          data&rdquo; on any section to get an APA-formatted citation. Link directly to any
          section using the &ldquo;Link&rdquo; button. You can also embed data tables on your website.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/widgets"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all hover:scale-[1.02]"
          >
            <Calculator className="h-4 w-4" />
            Embed Calculators & Data
          </Link>
          <Link
            href="/federal-tax-brackets"
            className="inline-flex items-center gap-2 rounded-xl border border-border/50 bg-card/50 px-6 py-3 text-sm font-medium text-foreground hover:border-emerald-500/30 hover:text-emerald-400 transition-all"
          >
            <ExternalLink className="h-4 w-4" />
            Full Bracket Details
          </Link>
        </div>
      </section>

      {/* ─── Related Tools ────────────────────────────────────────────────── */}
      <section className="border-t border-border/20 pt-10">
        <h2 className="text-lg font-bold text-foreground mb-6">
          Related <span className="text-emerald-400">Tools &amp; Resources</span>
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Featured Calculators */}
          <div className="rounded-xl border border-border/30 bg-card/50 p-5">
            <h3 className="text-base font-semibold text-foreground mb-3">Featured Calculators</h3>
            <div className="space-y-2">
              {[
                { href: '/paycheck-calculator', label: 'Paycheck Calculator' },
                { href: '/mortgage-calculator', label: 'Mortgage Calculator' },
                { href: '/sales-tax-calculator', label: 'Sales Tax Calculator' },
                { href: '/capital-gains-calculator', label: 'Capital Gains Calculator' },
                { href: '/self-employment-tax-calculator', label: 'Self-Employment Tax' },
                { href: '/401k-retirement-calculator', label: '401(k) Calculator' },
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
            <h3 className="text-base font-semibold text-foreground mb-3">State Calculators</h3>
            <div className="space-y-2">
              {[
                { href: '/illinois-tax-calculator', label: 'Illinois (4.95%)' },
                { href: '/texas-tax-calculator', label: 'Texas (0%)' },
                { href: '/florida-tax-calculator', label: 'Florida (0%)' },
                { href: '/california-tax-calculator', label: 'California (1%–13.3%)' },
                { href: '/new-york-tax-calculator', label: 'New York (4%–10.9%)' },
                { href: '/georgia-tax-calculator', label: 'Georgia (5.49%)' },
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

          {/* More Resources */}
          <div className="rounded-xl border border-border/30 bg-card/50 p-5">
            <h3 className="text-base font-semibold text-foreground mb-3">More Resources</h3>
            <div className="space-y-2">
              {[
                { href: '/federal-tax-brackets', label: '2026 Tax Brackets (Detail)' },
                { href: '/glossary', label: 'Tax Glossary' },
                { href: '/widgets', label: 'Free Embeddable Widgets' },
                { href: '/compare', label: 'Compare State Taxes' },
                { href: '/blog', label: 'Blog & Guides' },
                { href: '/about', label: 'About TheTaxCalc' },
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
        </div>
      </section>

      {/* ─── Author Attribution (E-E-A-T) ──────────────────────── */}
      <section className="py-12 border-t border-border/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AuthorBioCard authorId="rachel-mitchell" />
        </div>
      </section>
    </div>
  );
}
