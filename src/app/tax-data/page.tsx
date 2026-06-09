import { Metadata } from 'next';
import Link from 'next/link';
import {
  Database,
  ChevronDown,
  BookOpen,
  ShieldCheck,
  DollarSign,
  TrendingUp,
  Landmark,
  PiggyBank,
  BarChart3,
  Receipt,
  MapPin,
  Info,
  Code2,
} from 'lucide-react';
import { Breadcrumb } from '@/components/finance/breadcrumb';
import {
  SalesTaxTable,
  SalesTaxChart,
  FederalBracketsChart,
  NoIncomeTaxTable,
  DataEmbedSnippets,
} from '@/components/finance/tax-data-client';
import { SITE_URL } from '@/lib/site-config';
import { getCalculatorAuthor, authorToJsonLd } from '@/lib/authors';

// ─── Page Metadata ────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: { absolute: '2026 Tax Data & Statistics — All 50 States' },
  description:
    'Free 2026 tax data for all 50 states. Sales tax rates, federal brackets, FICA & no-tax states. Download CSV, embed charts, cite freely.',
  keywords: [
    '2026 tax data',
    'sales tax rates by state 2026',
    'federal tax brackets 2026',
    'state tax comparison',
    'no income tax states',
    'FICA rates 2026',
    'tax statistics',
    'tax data API',
    'embeddable tax charts',
    'free tax data download',
    'sales tax CSV',
    'tax data for journalists',
    'citable tax data',
  ],
  authors: [{ name: 'Rachel Mitchell, CPA' }],
  alternates: {
    canonical: `${SITE_URL}/tax-data`,
    languages: {
      'en-US': `${SITE_URL}/tax-data`,
      'x-default': `${SITE_URL}/tax-data`,
    },
  },
  openGraph: {
    title: '2026 Tax Data & Statistics — All 50 States',
    description:
      'Free 2026 tax data for 50 states. Sales tax, brackets, FICA & no-tax states. CSV & charts.',
    url: `${SITE_URL}/tax-data`,
    siteName: 'TheTaxCalc',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: `${SITE_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: '2026 Tax Data & Statistics — TheTaxCalc',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '2026 Tax Data & Statistics — All 50 States',
    description:
      'Free 2026 tax data for 50 states. Sales tax, brackets, FICA & no-tax states. CSV & charts.',
  },
};

// ─── Data: Federal Tax Brackets 2026 ─────────────────────────────────────────

const FEDERAL_BRACKETS = {
  Single: [
    { range: '$0 – $11,925', rate: '10%', tax: '$0 – $1,192.50' },
    { range: '$11,926 – $48,475', rate: '12%', tax: '$1,192.50 – $5,458.50' },
    { range: '$48,476 – $103,350', rate: '22%', tax: '$5,458.50 – $17,531.00' },
    { range: '$103,351 – $197,300', rate: '24%', tax: '$17,531.00 – $40,079.00' },
    { range: '$197,301 – $250,525', rate: '32%', tax: '$40,079.00 – $57,111.00' },
    { range: '$250,526 – $626,350', rate: '35%', tax: '$57,111.00 – $188,499.50' },
    { range: '$626,351+', rate: '37%', tax: '$188,499.50 +' },
  ],
  'Married Filing Jointly': [
    { range: '$0 – $23,850', rate: '10%', tax: '$0 – $2,385.00' },
    { range: '$23,851 – $96,950', rate: '12%', tax: '$2,385.00 – $11,157.00' },
    { range: '$96,951 – $206,700', rate: '22%', tax: '$11,157.00 – $35,302.00' },
    { range: '$206,701 – $394,600', rate: '24%', tax: '$35,302.00 – $80,398.00' },
    { range: '$394,601 – $501,050', rate: '32%', tax: '$80,398.00 – $114,442.00' },
    { range: '$501,051 – $751,600', rate: '35%', tax: '$114,442.00 – $202,154.50' },
    { range: '$751,601+', rate: '37%', tax: '$202,154.50 +' },
  ],
  'Head of Household': [
    { range: '$0 – $17,000', rate: '10%', tax: '$0 – $1,700.00' },
    { range: '$17,001 – $64,850', rate: '12%', tax: '$1,700.00 – $7,442.00' },
    { range: '$64,851 – $137,700', rate: '22%', tax: '$7,442.00 – $23,479.00' },
    { range: '$137,701 – $209,400', rate: '24%', tax: '$23,479.00 – $40,687.00' },
    { range: '$209,401 – $275,450', rate: '32%', tax: '$40,687.00 – $61,823.00' },
    { range: '$275,451 – $561,500', rate: '35%', tax: '$61,823.00 – $161,920.50' },
    { range: '$561,501+', rate: '37%', tax: '$161,920.50 +' },
  ],
};

// ─── Data: FICA Tax Rates ─────────────────────────────────────────────────────

const FICA_DATA = [
  { component: 'Social Security (OASDI)', rate: '6.2%', wageBase: '$184,500', maxTax: '$11,439.00', notes: 'Employer matches 6.2%' },
  { component: 'Medicare (HI)', rate: '1.45%', wageBase: 'No cap', maxTax: 'No limit', notes: 'Employer matches 1.45%' },
  { component: 'Additional Medicare', rate: '0.9%', wageBase: '>$200,000', maxTax: 'Varies', notes: 'Employee only; no employer match' },
  { component: 'Self-Employment Tax', rate: '15.3%', wageBase: '92.35% of net SE income', maxTax: '$22,878.00 (SS portion)', notes: 'Social Security portion capped at $184,500' },
];

// ─── Data: Standard Deductions ────────────────────────────────────────────────

const STANDARD_DEDUCTIONS = [
  { filingStatus: 'Single', amount: '$16,100' },
  { filingStatus: 'Married Filing Jointly', amount: '$32,200' },
  { filingStatus: 'Head of Household', amount: '$24,150' },
  { filingStatus: 'Married Filing Separately', amount: '$16,100' },
  { filingStatus: 'Additional (Age 65+ or Blind)', amount: '$2,000 (S/MFS/HOH) / $1,600 (MFJ/QW)' },
];

// ─── Data: Retirement Contribution Limits ──────────────────────────────────────

const RETIREMENT_LIMITS = [
  { plan: '401(k) / 403(b) / 457', limit: '$23,500', catchUp: '$7,500 (age 50+)', total50: '$31,000' },
  { plan: 'Enhanced Catch-up (60–63)', limit: '—', catchUp: '$11,250 (age 60–63)', total50: '$34,750' },
  { plan: 'Traditional & Roth IRA', limit: '$7,000', catchUp: '$1,000 (age 50+)', total50: '$8,000' },
  { plan: 'HSA — Individual', limit: '$4,300', catchUp: '$1,000 (age 55+)', total50: '$5,300' },
  { plan: 'HSA — Family', limit: '$8,550', catchUp: '$1,000 (age 55+)', total50: '$9,550' },
  { plan: 'Simple IRA', limit: '$16,500', catchUp: '$3,500 (age 50+)', total50: '$20,000' },
];

// ─── Data: Key Tax Deadlines 2026 ─────────────────────────────────────────────

const TAX_DEADLINES = [
  { date: 'Jan 15, 2026', event: 'Q4 2025 estimated tax payment due' },
  { date: 'Jan 31, 2026', event: 'W-2 and 1099 forms due to recipients' },
  { date: 'Mar 16, 2026', event: 'S-Corp and Partnership tax returns due' },
  { date: 'Apr 15, 2026', event: 'Individual tax return (Form 1040) due — or file extension' },
  { date: 'Apr 15, 2026', event: 'Q1 2026 estimated tax payment due' },
  { date: 'Jun 15, 2026', event: 'Q2 2026 estimated tax payment due' },
  { date: 'Sep 15, 2026', event: 'Q3 2026 estimated tax payment due' },
  { date: 'Oct 15, 2026', event: 'Extended individual tax returns due' },
];

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    q: 'Can I use this data in my article, report, or website?',
    a: 'Yes — that is the purpose of this page. All data is free to cite, link to, and embed. Click the "Cite" button on any section for an APA-formatted citation, or use the "Embed" button to get iframe code for your website. Attribution with a link to thetaxcalc.com is appreciated.',
  },
  {
    q: 'Where does this data come from?',
    a: 'Federal tax data comes from IRS Revenue Procedures and SSA publications. State sales tax data is sourced from each state\'s Department of Revenue and the Tax Foundation. FICA rates are set by the Social Security Administration. We update within 48 hours of official government publications.',
  },
  {
    q: 'How often is the data updated?',
    a: 'We update this page within 48 hours of any official government publication. Federal brackets are typically updated in October/November of each year. State rates may change throughout the year as legislatures pass new tax laws.',
  },
  {
    q: 'Can I download the data as CSV or spreadsheet?',
    a: 'Yes. Use the "CSV" button in the sales tax table to download all 50 states\' rates as a CSV file. This can be opened in Excel, Google Sheets, or any spreadsheet application.',
  },
  {
    q: 'Which states have no sales tax?',
    a: 'Five states have no state or local sales tax: Delaware, Montana, New Hampshire, and Oregon. Alaska has no state sales tax but allows local taxes (avg 1.82%). These states are highlighted in the sales tax table above.',
  },
  {
    q: 'Which states have no income tax?',
    a: 'Nine states have no state income tax on wages: Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, and Wyoming. New Hampshire taxes dividends and interest but not wages. See the detailed comparison table above.',
  },
  {
    q: 'What is the Social Security wage base for 2026?',
    a: 'The 2026 Social Security (OASDI) wage base is $184,500. The 6.2% Social Security tax applies only to the first $184,500 of earned income, for a maximum employee contribution of $11,439.00.',
  },
  {
    q: 'How much can I contribute to my 401(k) in 2026?',
    a: 'The 2026 401(k) contribution limit is $23,500. If you are 50+, you can add $7,500 in catch-up contributions ($31,000 total). Under SECURE 2.0, workers aged 60–63 have an enhanced catch-up of $11,250 ($34,750 total).',
  },
];

// ─── JSON-LD ─────────────────────────────────────────────────────────────────

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [

    {
      '@id': `${SITE_URL}/tax-data#breadcrumb`,
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Tax Data & Statistics' },
      ],
    },
    {
      '@id': `${SITE_URL}/tax-data#webpage`,
      '@type': 'WebPage',
      name: '2026 Tax Data & Statistics — All 50 States',
      description:
        'Free, citable 2026 tax data for all 50 US states. Sales tax rates, federal brackets, FICA rates, and more.',
      url: `${SITE_URL}/tax-data`,
      inLanguage: 'en-US',
      dateModified: '2026-01-15',
      author: { '@id': `${SITE_URL}/tax-data#author` },
      reviewedBy: { '@id': `${SITE_URL}/tax-data#author` },
      publisher: { '@id': `${SITE_URL}/#organization` },
      breadcrumb: { '@id': `${SITE_URL}/tax-data#breadcrumb` },
    },
    {
      '@id': `${SITE_URL}/tax-data#author`,
      ...authorToJsonLd(getCalculatorAuthor()),
    },
    {
      '@id': `${SITE_URL}/tax-data#faq`,
      '@type': 'FAQPage',
      mainEntity: FAQ_ITEMS.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    },
  ],
};

// ─── Section Header ──────────────────────────────────────────────────────────

function SectionHeader({
  id,
  icon: Icon,
  title,
  highlight,
}: {
  id: string;
  icon: React.ElementType;
  title: string;
  highlight: string;
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
        <a
          href={`#${id}`}
          className="inline-flex items-center gap-1 rounded-lg border border-border/40 bg-muted/20 px-2.5 py-1 text-xs font-medium text-muted-foreground hover:border-emerald-500/30 hover:text-emerald-400 transition-all"
        >
          <Code2 className="h-3 w-3" />
          Link here
        </a>
      </div>
    </div>
  );
}

// ─── Table Styles ─────────────────────────────────────────────────────────────

const thClass =
  'px-4 py-3 text-left text-xs font-semibold text-emerald-400 uppercase tracking-wider bg-emerald-500/5';
const tdClass = 'px-4 py-3 text-sm text-foreground';
const tdAltClass = 'px-4 py-3 text-sm text-muted-foreground';

// ─── Main Page Component ──────────────────────────────────────────────────────

export default function TaxDataPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Tax Data & Statistics' }]} />

      {/* ─── Hero Section ─────────────────────────────────────────────────── */}
      <section className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 text-sm text-emerald-400 mb-6">
          <Database className="h-3.5 w-3.5" />
          Free Reference Data — All 50 States — Cite &amp; Embed Freely
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          2026 Tax Data{' '}
          <span className="gradient-text">&amp; Statistics</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          The most comprehensive free 2026 tax data reference — sales tax for all 50 states,
          federal brackets, FICA rates, and more. Download CSV, embed charts on your site,
          and cite freely in your articles.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          <Link
            href="#sales-tax-all-states"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all hover:scale-[1.02]"
          >
            <Receipt className="h-4 w-4" />
            Sales Tax — 50 States
          </Link>
          <Link
            href="#federal-brackets"
            className="inline-flex items-center gap-2 rounded-xl border border-border/50 bg-card/50 px-6 py-3 text-sm font-medium text-foreground hover:border-emerald-500/30 hover:text-emerald-400 transition-all"
          >
            <TrendingUp className="h-4 w-4" />
            Federal Brackets
          </Link>
          <Link
            href="#no-income-tax"
            className="inline-flex items-center gap-2 rounded-xl border border-border/50 bg-card/50 px-6 py-3 text-sm font-medium text-foreground hover:border-emerald-500/30 hover:text-emerald-400 transition-all"
          >
            <MapPin className="h-4 w-4" />
            No-Tax States
          </Link>
          <Link
            href="/widgets"
            className="inline-flex items-center gap-2 rounded-xl border border-border/50 bg-card/50 px-6 py-3 text-sm font-medium text-foreground hover:border-emerald-500/30 hover:text-emerald-400 transition-all"
          >
            <Code2 className="h-4 w-4" />
            Embed Widgets
          </Link>
        </div>
      </section>

      {/* ─── Quick Stats ──────────────────────────────────────────────────── */}
      <section className="mb-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { label: 'States Covered', value: '50', detail: 'Sales tax data' },
            { label: 'Federal Brackets', value: '7 rates', detail: '3 filing statuses' },
            { label: 'No-Tax States', value: '9', detail: 'No income tax on wages' },
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

      {/* ─── Section 1: All 50 States Sales Tax ──────────────────────────── */}
      <section className="mb-12">
        <SectionHeader
          id="sales-tax-all-states"
          icon={Receipt}
          title="Sales Tax Rates"
          highlight="— All 50 States"
        />
        <SalesTaxTable />
      </section>

      {/* ─── Section 2: Sales Tax Charts ─────────────────────────────────── */}
      <section className="mb-12">
        <SectionHeader
          id="sales-tax-charts"
          icon={BarChart3}
          title="Sales Tax"
          highlight="Charts"
        />
        <SalesTaxChart />
      </section>

      {/* ─── Section 3: Federal Tax Brackets ─────────────────────────────── */}
      <section className="mb-12">
        <SectionHeader
          id="federal-brackets"
          icon={TrendingUp}
          title="2026 Federal"
          highlight="Tax Brackets"
        />

        {/* Visual chart */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-foreground mb-3">Single Filer — Bracket Upper Limits</h3>
          <FederalBracketsChart />
        </div>

        {/* Tables */}
        <div className="space-y-4">
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
                      <th className={thClass}>Bracket Range</th>
                      <th className={thClass}>Tax Rate</th>
                      <th className={`${thClass} hidden sm:table-cell`}>Tax on Bracket</th>
                    </tr>
                  </thead>
                  <tbody>
                    {brackets.map((bracket, i) => (
                      <tr key={i} className="border-b border-border/10 last:border-0 hover:bg-muted/5 transition-colors">
                        <td className={tdClass}>{bracket.range}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2.5 py-0.5 text-sm font-semibold text-emerald-400">
                            {bracket.rate}
                          </span>
                        </td>
                        <td className={`${tdAltClass} hidden sm:table-cell text-xs`}>
                          {bracket.tax}
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
          Use our{' '}
          <Link href="/paycheck-calculator" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2">
            paycheck calculator
          </Link>{' '}
          to compute your actual tax liability.
        </p>
      </section>

      {/* ─── Section 4: No-Income-Tax States ─────────────────────────────── */}
      <section className="mb-12">
        <SectionHeader
          id="no-income-tax"
          icon={MapPin}
          title="No Income Tax"
          highlight="States"
        />
        <NoIncomeTaxTable />
        <div className="mt-4 flex items-start gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4 text-xs text-muted-foreground leading-relaxed">
          <Info className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
          <p>
            States with no income tax often compensate with higher sales or property taxes.
            Texas, for example, has <strong>no income tax</strong> but property taxes averaging 1.69% — among the
            highest in the nation. Compare total tax burden using our{' '}
            <Link href="/compare" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2">
              state comparison tool
            </Link>.
          </p>
        </div>
      </section>

      {/* ─── Section 5: FICA Tax Rates ───────────────────────────────────── */}
      <section className="mb-12">
        <SectionHeader
          id="fica-rates"
          icon={DollarSign}
          title="FICA Tax"
          highlight="Rates 2026"
        />
        <div className="rounded-xl border border-border/30 bg-card/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/20">
                  <th className={thClass}>Component</th>
                  <th className={thClass}>Rate</th>
                  <th className={`${thClass} hidden sm:table-cell`}>Wage Base</th>
                  <th className={`${thClass} hidden md:table-cell`}>Max Tax</th>
                  <th className={`${thClass} hidden lg:table-cell`}>Notes</th>
                </tr>
              </thead>
              <tbody>
                {FICA_DATA.map((row, i) => (
                  <tr key={i} className={`border-b border-border/10 last:border-0 hover:bg-muted/5 transition-colors ${i % 2 === 1 ? 'bg-muted/[0.02]' : ''}`}>
                    <td className={tdClass}>
                      <span className="font-semibold">{row.component}</span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2.5 py-0.5 text-sm font-semibold text-emerald-400">
                        {row.rate}
                      </span>
                    </td>
                    <td className={`${tdAltClass} hidden sm:table-cell`}>{row.wageBase}</td>
                    <td className={`${tdAltClass} hidden md:table-cell`}>{row.maxTax}</td>
                    <td className={`${tdAltClass} hidden lg:table-cell text-xs`}>{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
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
          <div className="rounded-lg border border-border/30 bg-card/50 p-4">
            <p className="text-xs font-semibold text-foreground mb-1">Max SS Tax (Employee)</p>
            <p className="text-lg font-bold text-emerald-400">$11,439</p>
            <p className="text-xs text-muted-foreground">6.2% × $184,500</p>
          </div>
        </div>
      </section>

      {/* ─── Section 6: Standard Deductions ──────────────────────────────── */}
      <section className="mb-12">
        <SectionHeader
          id="standard-deductions"
          icon={BookOpen}
          title="Standard"
          highlight="Deductions 2026"
        />
        <div className="rounded-xl border border-border/30 bg-card/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/20">
                  <th className={thClass}>Filing Status</th>
                  <th className={thClass}>Deduction Amount</th>
                </tr>
              </thead>
              <tbody>
                {STANDARD_DEDUCTIONS.map((row, i) => (
                  <tr key={i} className={`border-b border-border/10 last:border-0 hover:bg-muted/5 transition-colors ${i % 2 === 1 ? 'bg-muted/[0.02]' : ''}`}>
                    <td className={tdClass}>
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
      </section>

      {/* ─── Section 7: Retirement Limits ────────────────────────────────── */}
      <section className="mb-12">
        <SectionHeader
          id="retirement-limits"
          icon={PiggyBank}
          title="401(k) &amp; Retirement"
          highlight="Limits 2026"
        />
        <div className="rounded-xl border border-border/30 bg-card/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/20">
                  <th className={thClass}>Plan</th>
                  <th className={thClass}>Limit</th>
                  <th className={`${thClass} hidden sm:table-cell`}>Catch-Up (50+)</th>
                  <th className={`${thClass} hidden md:table-cell`}>Total (50+)</th>
                </tr>
              </thead>
              <tbody>
                {RETIREMENT_LIMITS.map((row, i) => (
                  <tr key={i} className={`border-b border-border/10 last:border-0 hover:bg-muted/5 transition-colors ${i % 2 === 1 ? 'bg-muted/[0.02]' : ''}`}>
                    <td className={tdClass}>
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
                    <td className={`${tdAltClass} hidden sm:table-cell text-xs`}>{row.catchUp}</td>
                    <td className="px-4 py-3 text-sm hidden md:table-cell">
                      <span className="font-semibold text-emerald-400">{row.total50}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
          Use our{' '}
          <Link href="/401k-retirement-calculator" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2">
            401(k) calculator
          </Link>{' '}
          to project your retirement savings with these limits.
        </p>
      </section>

      {/* ─── Section 8: Key Tax Deadlines ─────────────────────────────────── */}
      <section className="mb-12">
        <SectionHeader
          id="tax-deadlines"
          icon={Landmark}
          title="Key Tax"
          highlight="Deadlines 2026"
        />
        <div className="rounded-xl border border-border/30 bg-card/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/20">
                  <th className={thClass}>Date</th>
                  <th className={thClass}>Event</th>
                </tr>
              </thead>
              <tbody>
                {TAX_DEADLINES.map((row, i) => (
                  <tr key={i} className="border-b border-border/10 last:border-0 hover:bg-muted/5 transition-colors">
                    <td className="px-4 py-3 text-sm whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
                        {row.date}
                      </span>
                    </td>
                    <td className={tdAltClass}>{row.event}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── Embed This Data Section ─────────────────────────────────────── */}
      <section className="mb-12">
        <DataEmbedSnippets />
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
              estimate, round, or derive figures from secondary sources.
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/60 shrink-0 mt-2" />
                <span><strong className="text-foreground">Federal tax brackets</strong> — IRS Revenue Procedure for annual inflation adjustments</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/60 shrink-0 mt-2" />
                <span><strong className="text-foreground">State sales tax rates</strong> — Each state&apos;s Department of Revenue + Tax Foundation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/60 shrink-0 mt-2" />
                <span><strong className="text-foreground">FICA rates &amp; wage base</strong> — Social Security Administration and CMS</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/60 shrink-0 mt-2" />
                <span><strong className="text-foreground">Retirement limits</strong> — IRS cost-of-living adjustments + SECURE 2.0</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/60 shrink-0 mt-2" />
                <span><strong className="text-foreground">Property tax rates</strong> — Tax Foundation and state assessor data</span>
              </li>
            </ul>
            <p>
              We update this page within <strong className="text-foreground">48 hours</strong> of
              official government publication. If you spot an error, please contact us.
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

      {/* ─── Related Resources ────────────────────────────────────────────── */}
      <section className="border-t border-border/20 pt-10">
        <h2 className="text-lg font-bold text-foreground mb-6">Related Resources</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Widgets */}
          <div className="rounded-xl border border-border/30 bg-card/50 p-5">
            <h3 className="text-base font-semibold text-foreground mb-3">Embed Widgets</h3>
            <div className="space-y-2">
              {[
                { href: '/widgets', label: 'Free Calculator Widgets' },
                { href: '/widgets#link-to-us', label: 'Link to Us' },
                { href: '/widgets#widgets', label: 'Browse All 20 Widgets' },
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

          {/* Calculators */}
          <div className="rounded-xl border border-border/30 bg-card/50 p-5">
            <h3 className="text-base font-semibold text-foreground mb-3">Calculators</h3>
            <div className="space-y-2">
              {[
                { href: '/paycheck-calculator', label: 'Paycheck Calculator' },
                { href: '/sales-tax-calculator', label: 'Sales Tax Calculator' },
                { href: '/mortgage-calculator', label: 'Mortgage Calculator' },
                { href: '/capital-gains-calculator', label: 'Capital Gains Calculator' },
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

          {/* State Data */}
          <div className="rounded-xl border border-border/30 bg-card/50 p-5">
            <h3 className="text-base font-semibold text-foreground mb-3">State Data</h3>
            <div className="space-y-2">
              {[
                { href: '/compare', label: 'Compare State Taxes' },
                { href: '/salary', label: 'Salary After Tax' },
                { href: '/federal-tax-brackets', label: '2026 Tax Brackets' },
                { href: '/resources', label: 'Tax Data & Resources' },
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

          {/* More */}
          <div className="rounded-xl border border-border/30 bg-card/50 p-5">
            <h3 className="text-base font-semibold text-foreground mb-3">More</h3>
            <div className="space-y-2">
              {[
                { href: '/glossary', label: 'Tax Glossary' },
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
    </div>
  );
}
