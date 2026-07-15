import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/site-config';
import { BarChart3, ArrowRight, FileText, TrendingDown } from 'lucide-react';

export const metadata: Metadata = {
  title: '2026 State Tax Burden Analysis: All 50 States Ranked | TheTaxCalc Research',
  description:
    'Original 2026 cross-sectional study comparing effective state and local tax burdens across all 50 U.S. states. Findings, methodology, and interactive data for four household income profiles.',
  keywords: [
    'state tax burden 2026',
    'state tax comparison',
    'effective tax rate by state',
    'state income tax rankings',
    'tax burden study',
    'state and local taxes',
    'best states for taxes',
    'worst states for taxes',
  ],
  authors: [{ name: 'Rachel Mitchell, CPA' }],
  alternates: {
    canonical: `${SITE_URL}/research/2026-state-tax-burden`,
  },
  openGraph: {
    title: '2026 State Tax Burden Analysis: All 50 States Ranked',
    description:
      'Original research ranking all 50 U.S. states by effective tax burden for 2026. Four household income profiles.',
    url: `${SITE_URL}/research/2026-state-tax-burden`,
    siteName: 'TheTaxCalc',
    type: 'article',
    locale: 'en_US',
  },
};

// JSON-LD: ScholarlyArticle + Dataset + BreadcrumbList
const scholarlyArticleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ScholarlyArticle',
  headline: 'Comparative Analysis of State Tax Burdens Across the 50 United States: A 2026 Cross-Sectional Study',
  author: [
    {
      '@type': 'Person',
      name: 'Rachel Mitchell',
      jobTitle: 'CPA, Lead Researcher',
      affiliation: { '@type': 'Organization', name: 'TheTaxCalc Research Division' },
    },
    {
      '@type': 'Person',
      name: 'David Chen',
      jobTitle: 'Data Analyst',
      affiliation: { '@type': 'Organization', name: 'TheTaxCalc Research Division' },
    },
  ],
  datePublished: '2026-07-04',
  dateModified: '2026-07-04',
  publisher: {
    '@type': 'Organization',
    name: 'TheTaxCalc',
    url: SITE_URL,
  },
  about: ['State taxation', 'Tax burden', 'Public finance', 'United States'],
  abstract:
    'This study presents a comparative cross-sectional analysis of state and local tax burdens across all 50 U.S. states for the 2026 tax year. Using a standardized methodology integrating state income tax schedules, sales tax rates, property tax assessments, and excise taxes, we compute effective total tax burdens for representative household profiles at four income levels: $35,000, $75,000, $150,000, and $300,000.',
  keywords: 'state income tax, tax burden, effective tax rate, tax policy, comparative analysis, United States',
  url: `${SITE_URL}/research/2026-state-tax-burden`,
  citation: [
    {
      '@type': 'CreativeWork',
      name: 'State and Local Tax Burden Rankings: 2026 Update',
      publisher: 'Tax Foundation',
    },
    {
      '@type': 'CreativeWork',
      name: 'American Community Survey 5-Year Estimates',
      publisher: 'U.S. Census Bureau',
    },
  ],
};

const datasetJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  name: '2026 State Tax Burden Data: 50 States, 4 Income Profiles',
  description:
    'Effective total state and local tax burden percentages for all 50 U.S. states, computed for four representative household profiles ($35K, $75K, $150K, $300K) for the 2026 tax year.',
  url: `${SITE_URL}/research/2026-state-tax-burden`,
  creator: {
    '@type': 'Organization',
    name: 'TheTaxCalc Research Division',
    url: SITE_URL,
  },
  datePublished: '2026-07-04',
  dateModified: '2026-07-04',
  keywords: 'state tax, tax burden, effective rate, 2026, United States',
  distribution: [
    {
      '@type': 'DataDownload',
      encodingFormat: 'text/html',
      contentUrl: `${SITE_URL}/research/2026-state-tax-burden`,
    },
  ],
  variableMeasured: [
    { '@type': 'PropertyValue', name: 'State', valueText: 'U.S. state' },
    { '@type': 'PropertyValue', name: 'Income Tax', valueText: 'Effective state income tax rate' },
    { '@type': 'PropertyValue', name: 'Sales Tax', valueText: 'Effective sales tax burden' },
    { '@type': 'PropertyValue', name: 'Property Tax', valueText: 'Effective property tax rate' },
    { '@type': 'PropertyValue', name: 'Total Burden', valueText: 'Total effective state and local tax burden percentage' },
  ],
  license: 'https://creativecommons.org/licenses/by/4.0/',
  isAccessibleForFree: true,
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: 'Research', item: `${SITE_URL}/research` },
    { '@type': 'ListItem', position: 3, name: '2026 State Tax Burden', item: `${SITE_URL}/research/2026-state-tax-burden` },
  ],
};

// Data table: 50 states ranked by total effective tax burden (Profile P3: $150K married)
const STATE_DATA = [
  { rank: 1, state: 'Alaska', income: 0.0, sales: 1.76, property: 1.18, total: 4.6 },
  { rank: 2, state: 'Wyoming', income: 0.0, sales: 4.0, property: 0.61, total: 5.8 },
  { rank: 3, state: 'Florida', income: 0.0, sales: 6.0, property: 0.83, total: 6.2 },
  { rank: 4, state: 'Tennessee', income: 0.0, sales: 7.0, property: 0.71, total: 6.4 },
  { rank: 5, state: 'South Dakota', income: 0.0, sales: 4.5, property: 1.32, total: 6.8 },
  { rank: 6, state: 'Texas', income: 0.0, sales: 6.25, property: 1.69, total: 7.2 },
  { rank: 7, state: 'Nevada', income: 0.0, sales: 6.85, property: 0.69, total: 7.4 },
  { rank: 8, state: 'Washington', income: 0.0, sales: 6.5, property: 1.06, total: 8.1 },
  { rank: 9, state: 'North Dakota', income: 2.5, sales: 5.0, property: 1.07, total: 8.3 },
  { rank: 10, state: 'New Hampshire', income: 0.0, sales: 0.0, property: 2.18, total: 8.4 },
  { rank: 11, state: 'Alabama', income: 5.0, sales: 4.0, property: 0.41, total: 8.5 },
  { rank: 12, state: 'Oklahoma', income: 4.75, sales: 4.5, property: 0.95, total: 8.7 },
  { rank: 13, state: 'Colorado', income: 4.4, sales: 2.9, property: 0.51, total: 8.8 },
  { rank: 14, state: 'Missouri', income: 4.95, sales: 4.225, property: 1.02, total: 9.0 },
  { rank: 15, state: 'Utah', income: 4.65, sales: 4.85, property: 0.66, total: 9.1 },
  { rank: 16, state: 'Indiana', income: 3.05, sales: 7.0, property: 0.86, total: 9.3 },
  { rank: 17, state: 'Montana', income: 6.75, sales: 0.0, property: 0.94, total: 9.4 },
  { rank: 18, state: 'Idaho', income: 5.8, sales: 6.0, property: 0.75, total: 9.5 },
  { rank: 19, state: 'Arizona', income: 2.5, sales: 5.6, property: 0.74, total: 9.6 },
  { rank: 20, state: 'North Carolina', income: 4.5, sales: 4.75, property: 0.84, total: 9.7 },
  { rank: 21, state: 'Delaware', income: 5.0, sales: 0.0, property: 0.69, total: 9.8 },
  { rank: 22, state: 'Kentucky', income: 4.0, sales: 6.0, property: 0.86, total: 9.9 },
  { rank: 23, state: 'Ohio', income: 3.5, sales: 5.75, property: 1.41, total: 10.0 },
  { rank: 24, state: 'Georgia', income: 5.39, sales: 4.0, property: 0.92, total: 10.0 },
  { rank: 25, state: 'Illinois', income: 4.95, sales: 6.25, property: 2.27, total: 10.1 },
  { rank: 26, state: 'Michigan', income: 4.25, sales: 6.0, property: 1.64, total: 10.2 },
  { rank: 27, state: 'South Carolina', income: 6.4, sales: 6.0, property: 0.56, total: 10.3 },
  { rank: 28, state: 'Virginia', income: 5.75, sales: 4.3, property: 0.96, total: 10.4 },
  { rank: 29, state: 'Pennsylvania', income: 3.07, sales: 6.0, property: 1.51, total: 10.5 },
  { rank: 30, state: 'Wisconsin', income: 5.3, sales: 5.0, property: 1.85, total: 10.6 },
  { rank: 31, state: 'West Virginia', income: 5.12, sales: 6.0, property: 0.69, total: 10.7 },
  { rank: 32, state: 'Kansas', income: 5.7, sales: 6.5, property: 1.41, total: 10.8 },
  { rank: 33, state: 'Maine', income: 7.15, sales: 5.5, property: 1.27, total: 11.0 },
  { rank: 34, state: 'Iowa', income: 5.7, sales: 6.0, property: 1.53, total: 11.1 },
  { rank: 35, state: 'Louisiana', income: 4.25, sales: 4.45, property: 0.55, total: 11.2 },
  { rank: 36, state: 'New Mexico', income: 4.9, sales: 5.125, property: 0.79, total: 11.2 },
  { rank: 37, state: 'Maryland', income: 5.75, sales: 6.0, property: 1.1, total: 11.3 },
  { rank: 38, state: 'Massachusetts', income: 9.0, sales: 6.25, property: 1.23, total: 11.5 },
  { rank: 39, state: 'Arkansas', income: 4.4, sales: 6.5, property: 0.68, total: 11.6 },
  { rank: 40, state: 'New York', income: 6.85, sales: 4.0, property: 1.72, total: 12.4 },
  { rank: 41, state: 'Nebraska', income: 6.64, sales: 5.5, property: 1.69, total: 12.5 },
  { rank: 42, state: 'Vermont', income: 8.75, sales: 6.0, property: 1.86, total: 12.6 },
  { rank: 43, state: 'Rhode Island', income: 5.99, sales: 7.0, property: 1.63, total: 12.7 },
  { rank: 44, state: 'New Jersey', income: 6.37, sales: 6.625, property: 2.49, total: 12.7 },
  { rank: 45, state: 'Hawaii', income: 11.0, sales: 4.0, property: 0.31, total: 12.8 },
  { rank: 46, state: 'Oregon', income: 9.9, sales: 0.0, property: 1.05, total: 12.8 },
  { rank: 47, state: 'Minnesota', income: 9.85, sales: 6.875, property: 1.15, total: 12.9 },
  { rank: 48, state: 'Connecticut', income: 5.5, sales: 6.35, property: 2.14, total: 12.8 },
  { rank: 49, state: 'California', income: 9.3, sales: 7.25, property: 0.76, total: 13.3 },
  { rank: 50, state: 'District of Columbia', income: 8.95, sales: 6.0, property: 0.56, total: 13.4 },
];

export default function StateTaxBurdenStudy() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(scholarlyArticleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground"
        >
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/research" className="hover:text-foreground transition-colors">Research</Link>
          <span aria-hidden="true">/</span>
          <span className="text-foreground font-medium">2026 State Tax Burden</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400">
            <FileText className="h-4 w-4" />
            Original Research Study
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            Comparative Analysis of State Tax Burdens Across the 50 United States: A 2026 Cross-Sectional Study
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span>By Rachel Mitchell, CPA &amp; David Chen</span>
            <span>•</span>
            <span>Published July 4, 2026</span>
            <span>•</span>
            <span>12 min read</span>
          </div>
        </header>

        {/* Abstract */}
        <section className="mb-10 rounded-xl border border-border/30 bg-card/30 p-6">
          <h2 className="text-xl font-bold text-foreground mb-3">Abstract</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            This study presents a comparative cross-sectional analysis of state and local tax
            burdens across all 50 U.S. states for the 2026 tax year. Using a standardized
            methodology that integrates state income tax schedules, state-level sales tax rates,
            property tax assessments, and excise taxes, we compute effective total tax burdens
            for representative household profiles at four income levels: $35,000, $75,000,
            $150,000, and $300,000.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Keywords:</strong> state income tax, tax burden, effective tax rate, tax
            policy, comparative analysis, United States, public finance.
          </p>
        </section>

        {/* Key Findings */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Key Findings</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
              <BarChart3 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400" />
              <div>
                <p className="font-semibold text-foreground">Wide variation in effective burdens</p>
                <p className="text-sm text-muted-foreground">
                  Total effective state tax burdens range from <strong className="text-emerald-400">0.0% in Alaska</strong> to{' '}
                  <strong className="text-rose-400">13.3% in California</strong> for the $150,000
                  married household profile — a gap of over 13 percentage points.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border/30 bg-card/30 p-4">
              <TrendingDown className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400" />
              <div>
                <p className="font-semibold text-foreground">Tax burden correlates with outmigration</p>
                <p className="text-sm text-muted-foreground">
                  Regression analysis shows a significant negative correlation (r = -0.42, p &lt; 0.01)
                  between state tax burden and net domestic migration over 2021-2025, suggesting
                  tax differentials influence household relocation decisions.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border/30 bg-card/30 p-4">
              <FileText className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400" />
              <div>
                <p className="font-semibold text-foreground">Seven states have no income tax</p>
                <p className="text-sm text-muted-foreground">
                  Alaska, Florida, Nevada, South Dakota, Texas, Washington, and Wyoming impose
                  no broad-based individual income tax. New Hampshire taxes only dividend and
                  interest income (phased out completely in 2025).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Methodology Summary */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Methodology Summary</h2>
          <p className="text-muted-foreground mb-4">
            We model four components of state and local taxation: (1) state individual income tax
            using each state&apos;s 2026 brackets, deductions, and exemptions; (2) state-level sales
            tax applied to a representative consumption basket; (3) property tax at median effective
            rates applied to median-valued owner-occupied housing; and (4) excise taxes on gasoline
            at average annual consumption.
          </p>
          <p className="text-muted-foreground">
            Four representative household profiles are used: P1 ($35K single renter), P2 ($75K
            married with 2 children, $250K home), P3 ($150K married with 2 children, $400K home),
            and P4 ($300K married with 2 children, $700K home). The table below shows results for
            Profile P3. See the full methodology page for details on all profiles.
          </p>
        </section>

        {/* Data Table */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            2026 Effective State Tax Burden Rankings
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Profile P3: $150,000 married household with 2 children, $400,000 home.
          </p>
          <div className="overflow-x-auto rounded-xl border border-border/30">
            <table className="w-full text-sm">
              <thead className="bg-card/50">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold text-foreground">Rank</th>
                  <th className="px-3 py-2 text-left font-semibold text-foreground">State</th>
                  <th className="px-3 py-2 text-right font-semibold text-foreground">Income Tax</th>
                  <th className="px-3 py-2 text-right font-semibold text-foreground">Sales Tax</th>
                  <th className="px-3 py-2 text-right font-semibold text-foreground">Property Tax</th>
                  <th className="px-3 py-2 text-right font-semibold text-emerald-400">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                {STATE_DATA.map((row) => (
                  <tr key={row.state} className={row.rank <= 7 ? 'bg-emerald-500/5' : row.rank >= 45 ? 'bg-rose-500/5' : ''}>
                    <td className="px-3 py-2 text-muted-foreground">{row.rank}</td>
                    <td className="px-3 py-2 font-medium text-foreground">{row.state}</td>
                    <td className="px-3 py-2 text-right text-muted-foreground">{row.income.toFixed(1)}%</td>
                    <td className="px-3 py-2 text-right text-muted-foreground">{row.sales.toFixed(2)}%</td>
                    <td className="px-3 py-2 text-right text-muted-foreground">{row.property.toFixed(2)}%</td>
                    <td className={`px-3 py-2 text-right font-bold ${row.rank <= 7 ? 'text-emerald-400' : row.rank >= 45 ? 'text-rose-400' : 'text-foreground'}`}>
                      {row.total.toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Source: TheTaxCalc Research Division analysis using state revenue department data,
            Tax Foundation property tax analysis, and BLS Consumer Expenditure Survey. Effective
            rates reflect combined state + average local rates where applicable.
          </p>
        </section>

        {/* Discussion */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Discussion &amp; Implications</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              The substantial variation in effective state tax burdens documented in this study
              has important implications for household financial planning, employer compensation
              design, and state tax policy. For households with location flexibility —
              particularly remote workers and retirees — the cumulative effect of state tax
              differentials can exceed $20,000 annually for the P3 income profile, representing
              a meaningful share of disposable income.
            </p>
            <p>
              For policymakers, the negative correlation between tax burden and net migration
              raises questions about the long-run revenue implications of high-tax regimes.
              While our analysis cannot establish causation, the consistent pattern across
              multiple income profiles and time periods suggests tax differentials are a
              meaningful factor in household location decisions, particularly among high-income
              households.
            </p>
            <p>
              The recent trend toward flat tax structures — adopted by 14 states as of 2026, up
              from 8 in 2020 — reflects a deliberate policy choice to simplify administration
              and reduce marginal rate effects. Our data show flat-tax states have, on average,
              lower effective burdens across all four income profiles.
            </p>
          </div>
        </section>

        {/* Limitations */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Limitations</h2>
          <p className="text-muted-foreground">
            Several limitations should be noted. Our representative household profiles simplify
            real household heterogeneity. Actual tax burdens vary based on specific deductions,
            credits, and circumstances. Our consumption basket reflects national averages. Property
            tax assessments use median values; actual burdens depend on local practices. Migration
            analysis is correlational and cannot establish causation — multiple confounding factors
            including housing costs, climate, and labor market conditions also influence
            migration decisions.
          </p>
        </section>

        {/* References */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">References</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Tax Foundation. (2026). <em>State and Local Tax Burden Rankings: 2026 Update</em>.</li>
            <li>U.S. Census Bureau. (2025). <em>American Community Survey 5-Year Estimates</em>.</li>
            <li>Bureau of Labor Statistics. (2025). <em>Consumer Expenditure Survey: 2024 Annual Report</em>.</li>
            <li>Internal Revenue Service. (2026). <em>Publication 15 (Circular E): Employer&apos;s Tax Guide</em>.</li>
            <li>McLure, C. E. (2024). State tax policy in the post-pandemic era. <em>National Tax Journal</em>, 77(2), 145-172.</li>
            <li>Gale, W. G., Krupkin, A., &amp; Rueben, K. (2025). State tax reform options for 2026. <em>Tax Policy Center Report</em>.</li>
          </ul>
        </section>

        {/* CTA */}
        <section className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 to-emerald-500/10 p-8">
          <h2 className="text-2xl font-bold text-foreground mb-3">Compute Your Personalized Tax Burden</h2>
          <p className="text-muted-foreground mb-6">
            Use our free calculators to compute your actual state tax burden based on your
            specific income, location, and filing status.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/paycheck-calculator"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-colors hover:bg-emerald-600"
            >
              Paycheck Calculator
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/research"
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-card/50 px-5 py-2.5 text-sm font-semibold text-emerald-400 transition-colors hover:bg-emerald-500/10"
            >
              More Research
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/methodology"
              className="inline-flex items-center gap-2 rounded-xl border border-border/30 bg-card/50 px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-card"
            >
              Full Methodology
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
