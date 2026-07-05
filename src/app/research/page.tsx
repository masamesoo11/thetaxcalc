import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Research Hub — 2026 Tax Data & Original Studies | TheTaxCalc',
  description:
    'Browse TheTaxCalc original research: 2026 state tax burden rankings, best states for remote workers, child tax credit guide, property tax by state, salary needed to live comfortably, and tax refund statistics.',
  alternates: { canonical: `${SITE_URL}/research` },
  openGraph: {
    title: 'Research Hub — 2026 Tax Data & Original Studies | TheTaxCalc',
    description:
      'Original research and data studies from TheTaxCalc. State tax burden, remote work, child tax credit, property tax, salary needs, and refund statistics for 2026.',
    url: `${SITE_URL}/research`,
    siteName: 'TheTaxCalc',
    type: 'website',
  },
};

const STUDIES = [
  {
    slug: '2026-state-tax-burden',
    title: '2026 State Tax Burden: Total Tax Load by State',
    summary:
      'We combined state income tax, property tax, and sales tax into a single effective burden figure for all 50 states. See where your state ranks and how the One Big Beautiful Bill Act shifted the picture.',
    category: 'State Comparison',
    date: 'January 2026',
    readTime: '12 min',
  },
  {
    slug: 'best-states-for-remote-workers-2026',
    title: 'Best States for Remote Workers in 2026',
    summary:
      'A tax-adjusted ranking of the best states for full-time remote workers in 2026, factoring in income tax, cost of living, broadband coverage, and the new OBBBA tip and overtime deductions.',
    category: 'Lifestyle & Tax',
    date: 'January 2026',
    readTime: '10 min',
  },
  {
    slug: 'child-tax-credit-guide-2026',
    title: 'Child Tax Credit Guide 2026 — OBBBA Doubles CTC to $2,200',
    summary:
      'Everything you need to know about the 2026 Child Tax Credit under OBBBA: $2,200 per child, $1,700 refundable, phaseouts, and how it compares to prior law. With worked examples.',
    category: 'Tax Credits',
    date: 'January 2026',
    readTime: '8 min',
  },
  {
    slug: 'property-tax-by-state-2026',
    title: 'Property Tax by State 2026 — Effective Rates & Median Bills',
    summary:
      'Effective property tax rates and median annual property tax bills for all 50 states in 2026. From New Jersey (highest) to Hawaii (lowest), with county-level context.',
    category: 'Property Tax',
    date: 'January 2026',
    readTime: '9 min',
  },
  {
    slug: 'salary-needed-to-live-comfortably-2026',
    title: 'Salary Needed to Live Comfortably in 2026 — By State',
    summary:
      'How much do you need to earn in 2026 to live comfortably in each state? We used the 50/30/20 rule, regional cost of living, and after-tax paycheck data to estimate the magic number.',
    category: 'Salary & Cost of Living',
    date: 'January 2026',
    readTime: '11 min',
  },
  {
    slug: 'tax-refund-statistics-2026',
    title: 'Tax Refund Statistics 2026 — Average Refunds by State & Income',
    summary:
      'IRS statistics on average federal tax refunds by state, income bracket, and filing status for the 2026 filing season. Plus how OBBBA is expected to change refund sizes.',
    category: 'Tax Refunds',
    date: 'January 2026',
    readTime: '7 min',
  },
];

const FAQS = [
  {
    question: 'What is TheTaxCalc Research?',
    answer:
      'TheTaxCalc Research is our collection of original data studies and reference guides on U.S. taxation. Each study combines official government data — IRS, SSA, Census Bureau, and state revenue departments — with our own analysis to produce practical, accurate, and fully-sourced tax insights. Every study is reviewed by a credentialed tax professional before publication.',
  },
  {
    question: 'How often is the research updated?',
    answer:
      'We update each study on its natural refresh cycle. State tax burden and property tax data refresh annually after new Census and Tax Foundation releases. Child Tax Credit and OBBBA-related research updates whenever Congress or the IRS issues new guidance. Tax refund statistics update quarterly during the filing season (January through April) and once after the season ends.',
  },
  {
    question: 'Can I cite TheTaxCalc research in my own work?',
    answer:
      'Yes. We encourage journalists, researchers, financial advisors, and educators to cite our research. Each study includes a permanent URL, publication date, and last-updated date so your readers can verify the source. Please link to the original study rather than copying the data tables wholesale. If you need a higher-resolution chart or raw data export, contact us at hello@thetaxcalc.com.',
  },
  {
    question: 'Where does your data come from?',
    answer:
      'Every figure in our research comes from an official government source. Federal tax data is sourced from IRS publications (Rev. Proc. 2025-25, Pub. 15-T, Pub. 972) and the Social Security Administration. State tax data comes from each state\'s Department of Revenue. Demographic and income data comes from the U.S. Census Bureau. Cost of living data comes from the Bureau of Economic Analysis and the Council for Community and Economic Research. We publish the full methodology and source list at the bottom of every study.',
  },
  {
    question: 'Is TheTaxCalc research free to access?',
    answer:
      'Yes. Every study, data table, and chart in our research hub is free to read, with no paywall, no sign-up, and no email requirement. We do not collect your contact information when you read our research. We believe tax data should be freely accessible to every American. If you find the research useful, we encourage you to share it with colleagues or link to it from your own writing.',
  },
  {
    question: 'How is this research different from your blog?',
    answer:
      'Our blog covers timely tax news, how-to guides, and current-year updates. Our research hub, by contrast, contains original data-driven studies with a longer shelf life. Research pieces are typically longer (7-12 minutes of reading), include multiple data tables and charts, and undergo a more rigorous editorial review process. Both are written by credentialed tax professionals and sourced from official government data.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}/research#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Research',
          item: `${SITE_URL}/research`,
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/research#faq`,
      mainEntity: FAQS.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    },
    {
      '@type': 'CollectionPage',
      name: 'TheTaxCalc Research Hub',
      description:
        'Original tax research and data studies from TheTaxCalc, covering state tax burden, property tax, the Child Tax Credit, remote work, and tax refund statistics.',
      url: `${SITE_URL}/research`,
      inLanguage: 'en-US',
      isPartOf: { '@type': 'WebSite', name: 'TheTaxCalc', url: SITE_URL },
      hasPart: STUDIES.map((s) => ({
        '@type': 'ScholarlyArticle',
        headline: s.title,
        url: `${SITE_URL}/research/${s.slug}`,
        datePublished: '2026-01-15',
        author: { '@type': 'Organization', name: 'TheTaxCalc' },
        publisher: { '@type': 'Organization', name: 'TheTaxCalc' },
      })),
    },
  ],
};

export default function ResearchHubPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground"
      >
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-foreground font-medium">Research</span>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
        TheTaxCalc Research Hub — 2026 Tax Data &amp; Original Studies
      </h1>
      <p className="text-lg text-muted-foreground leading-relaxed mb-10">
        Original research, data studies, and reference guides from TheTaxCalc. Every study is
        sourced from official government data — IRS, SSA, Census Bureau, and state revenue
        departments — and reviewed by a credentialed tax professional. Free to read, free to
        cite, no sign-up required.
      </p>

      {/* Studies Grid */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-6">Latest Studies</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {STUDIES.map((study) => (
            <Link
              key={study.slug}
              href={`/research/${study.slug}`}
              className="block rounded-xl border border-border/30 bg-card/50 p-6 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-colors"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-xs text-emerald-400">
                  {study.category}
                </span>
                <span className="text-xs text-muted-foreground">{study.readTime} read</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{study.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {study.summary}
              </p>
              <p className="text-xs text-muted-foreground">Published {study.date}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Methodology */}
      <section className="mb-10 rounded-xl border border-border/30 bg-card/50 p-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">Our Research Methodology</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Every study in our research hub follows the same methodology. We start with official
          government data — never third-party aggregators. For federal tax figures we use IRS
          publications and the Social Security Administration. For state data we use each
          state&rsquo;s Department of Revenue. For demographic and economic data we use the
          U.S. Census Bureau and the Bureau of Economic Analysis.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          After collecting raw data, we apply our calculation logic — the same logic that
          powers our{' '}
          <Link
            href="/paycheck-calculator"
            className="text-emerald-400 hover:text-emerald-300 underline"
          >
            paycheck calculator
          </Link>{' '}
          and other tools — to produce derived metrics. Each step is documented in a
          methodology section at the bottom of the study. Every study is then reviewed by a
          credentialed tax professional (CPA or EA) before publication.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          For a full description of how we compute every tax figure on the site, see our{' '}
          <Link
            href="/methodology"
            className="text-emerald-400 hover:text-emerald-300 underline"
          >
            methodology page
          </Link>
          .
        </p>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-6">Research FAQ</h2>
        <div className="space-y-4">
          {FAQS.map((faq) => (
            <div
              key={faq.question}
              className="rounded-lg border border-border/30 bg-card/50 p-5"
            >
              <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Tools */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Related Calculators</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            {
              href: '/paycheck-calculator',
              title: 'Paycheck Calculator',
              desc: 'Take-home pay for all 50 states.',
            },
            {
              href: '/obbba-tax-calculator',
              title: 'OBBBA Tax Calculator',
              desc: 'Compare 2026 taxes under the new tax law.',
            },
            {
              href: '/compare',
              title: 'State Comparison Tool',
              desc: 'Compare any two states side-by-side.',
            },
            {
              href: '/tax-data',
              title: 'Tax Data Reference',
              desc: 'All federal and state tax rates in one place.',
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg border border-border/30 bg-card/50 p-4 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-colors"
            >
              <p className="font-medium text-foreground">{item.title}</p>
              <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
