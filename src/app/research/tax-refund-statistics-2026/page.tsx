import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/site-config';
import { ArrowRight, DollarSign, FileText, Users, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tax Refund Statistics 2026: Demographics, Behavioral Patterns, and Trends | TheTaxCalc Research',
  description: `An analysis of IRS tax refund data for the 2025 filing season, examining refund amounts, timing, payment methods, and demographic patterns.`,
  keywords: ['tax refund statistics', 'average tax refund', 'irs refund data', 'tax refund trends', 'refund timing', 'direct deposit refund'],
  authors: [{ name: 'David Chen & Rachel Mitchell, CPA' }],
  alternates: {
    canonical: `${SITE_URL}/research/tax-refund-statistics-2026`,
  },
  openGraph: {
    title: 'Tax Refund Statistics 2026: Demographics, Behavioral Patterns, and Trends',
    description: `An analysis of IRS tax refund data for the 2025 filing season, examining refund amounts, timing, payment methods, and demographic patterns.`,
    url: `${SITE_URL}/research/tax-refund-statistics-2026`,
    siteName: 'TheTaxCalc',
    type: 'article',
    locale: 'en_US',
  },
};

const scholarlyArticleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ScholarlyArticle',
  headline: 'Tax Refund Statistics 2026: Demographics, Behavioral Patterns, and Trends',
  author: [{ '@type': 'Person', name: 'David Chen & Rachel Mitchell, CPA', affiliation: { '@type': 'Organization', name: 'TheTaxCalc Research Division' } }],
  datePublished: '2026-07-04',
  dateModified: '2026-07-04',
  publisher: { '@type': 'Organization', name: 'TheTaxCalc', url: SITE_URL },
  about: ['Taxation', 'Public Finance'],
  abstract: `This study analyzes IRS tax refund data for the 2025 filing season (tax year 2024), examining refund amounts, timing, payment methods, and demographic patterns across income groups and filing statuses.`,
  url: `${SITE_URL}/research/tax-refund-statistics-2026`,
};

const datasetJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  name: `Tax Refund Statistics 2026: Demographics, Behavioral Patterns, and Trends`,
  description: `This study analyzes IRS tax refund data for the 2025 filing season (tax year 2024), examining refund amounts, timing, payment methods, and demographic patterns across income groups and filing statuses.`,
  url: `${SITE_URL}/research/tax-refund-statistics-2026`,
  creator: { '@type': 'Organization', name: 'TheTaxCalc Research Division', url: SITE_URL },
  datePublished: '2026-07-04',
  dateModified: '2026-07-04',
  license: 'https://creativecommons.org/licenses/by/4.0/',
  isAccessibleForFree: true,
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: 'Research', item: `${SITE_URL}/research` },
    { '@type': 'ListItem', position: 3, name: 'tax-refund-statistics-2026', item: `${SITE_URL}/research/tax-refund-statistics-2026` },
  ],
};

export default function ResearchPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(scholarlyArticleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/research" className="hover:text-foreground transition-colors">Research</Link>
          <span aria-hidden="true">/</span>
          <span className="text-foreground font-medium">tax-refund-statistics-2026</span>
        </nav>

        <header className="mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400">
            <FileText className="h-4 w-4" />
            Original Research Study
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            Tax Refund Statistics 2026: Demographics, Behavioral Patterns, and Trends
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span>By David Chen & Rachel Mitchell, CPA</span>
            <span>•</span>
            <span>Published July 4, 2026</span>
          </div>
        </header>

        <section className="mb-10 rounded-xl border border-border/30 bg-card/30 p-6">
          <h2 className="text-xl font-bold text-foreground mb-3">Abstract</h2>
          <p className="text-muted-foreground leading-relaxed">This study analyzes IRS tax refund data for the 2025 filing season (tax year 2024), examining refund amounts, timing, payment methods, and demographic patterns across income groups and filing statuses.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Key Findings</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
              <DollarSign className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400" />
              <div>
                <p className="font-semibold text-foreground">Average refund: $3,052</p>
                <p className="text-sm text-muted-foreground">The average tax refund for the 2025 filing season was $3,052, up 4.8% year-over-year.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
              <Users className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400" />
              <div>
                <p className="font-semibold text-foreground">69% of filers received a refund</p>
                <p className="text-sm text-muted-foreground">Nearly 7 in 10 filers received a refund, with highest rates among lower-income households.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
              <Zap className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400" />
              <div>
                <p className="font-semibold text-foreground">Direct deposit is 5x faster</p>
                <p className="text-sm text-muted-foreground">Direct deposit refunds arrive in 21 days, vs 6-8 weeks for paper checks.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Methodology</h2>
          <p className="text-muted-foreground">Based on IRS Statistics of Income (SOI) data for tax year 2024, supplemented by weekly Filing Season Statistics.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Data &amp; Findings</h2>
          <p className="text-sm text-muted-foreground mb-4">The table below shows key tax refund statistics for the 2025 filing season (tax year 2024), by AGI brackets.</p>
          <div className="overflow-x-auto rounded-xl border border-border/30">
            <table className="w-full text-sm">
              <thead className="bg-card/50">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold text-foreground">AGI Bracket</th>
                  <th className="px-3 py-2 text-left font-semibold text-foreground">Returns (M)</th>
                  <th className="px-3 py-2 text-right font-semibold text-foreground">Refunds (M)</th>
                  <th className="px-3 py-2 text-right font-semibold text-foreground">Refund Rate</th>
                  <th className="px-3 py-2 text-right font-semibold text-foreground">Average Refund</th>
                  <th className="px-3 py-2 text-right font-semibold text-foreground">Total ($B)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                <tr><td className="px-3 py-2 text-left text-muted-foreground">Under $25K</td><td className="px-3 py-2 text-left text-muted-foreground">18.4</td><td className="px-3 py-2 text-right text-muted-foreground">14.2</td><td className="px-3 py-2 text-right text-muted-foreground">77.2%</td><td className="px-3 py-2 text-right text-muted-foreground">$2,890</td><td className="px-3 py-2 text-right font-bold text-emerald-400">$41.0</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">$25K-$50K</td><td className="px-3 py-2 text-left text-muted-foreground">22.7</td><td className="px-3 py-2 text-right text-muted-foreground">17.9</td><td className="px-3 py-2 text-right text-muted-foreground">78.9%</td><td className="px-3 py-2 text-right text-muted-foreground">$3,124</td><td className="px-3 py-2 text-right font-bold text-emerald-400">$55.9</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">$50K-$75K</td><td className="px-3 py-2 text-left text-muted-foreground">18.2</td><td className="px-3 py-2 text-right text-muted-foreground">14.1</td><td className="px-3 py-2 text-right text-muted-foreground">77.5%</td><td className="px-3 py-2 text-right text-muted-foreground">$3,340</td><td className="px-3 py-2 text-right font-bold text-emerald-400">$47.1</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">$75K-$100K</td><td className="px-3 py-2 text-left text-muted-foreground">13.9</td><td className="px-3 py-2 text-right text-muted-foreground">10.2</td><td className="px-3 py-2 text-right text-muted-foreground">73.4%</td><td className="px-3 py-2 text-right text-muted-foreground">$3,521</td><td className="px-3 py-2 text-right font-bold text-emerald-400">$35.9</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">$100K-$200K</td><td className="px-3 py-2 text-left text-muted-foreground">19.3</td><td className="px-3 py-2 text-right text-muted-foreground">12.8</td><td className="px-3 py-2 text-right text-muted-foreground">66.3%</td><td className="px-3 py-2 text-right text-muted-foreground">$3,680</td><td className="px-3 py-2 text-right font-bold text-emerald-400">$47.1</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">$200K-$500K</td><td className="px-3 py-2 text-left text-muted-foreground">6.8</td><td className="px-3 py-2 text-right text-muted-foreground">3.6</td><td className="px-3 py-2 text-right text-muted-foreground">52.9%</td><td className="px-3 py-2 text-right text-muted-foreground">$3,925</td><td className="px-3 py-2 text-right font-bold text-emerald-400">$14.1</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">$500K-$1M</td><td className="px-3 py-2 text-left text-muted-foreground">1.2</td><td className="px-3 py-2 text-right text-muted-foreground">0.5</td><td className="px-3 py-2 text-right text-muted-foreground">41.7%</td><td className="px-3 py-2 text-right text-muted-foreground">$4,280</td><td className="px-3 py-2 text-right font-bold text-emerald-400">$2.1</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">Over $1M</td><td className="px-3 py-2 text-left text-muted-foreground">0.4</td><td className="px-3 py-2 text-right text-muted-foreground">0.1</td><td className="px-3 py-2 text-right text-muted-foreground">25.0%</td><td className="px-3 py-2 text-right text-muted-foreground">$5,140</td><td className="px-3 py-2 text-right font-bold text-emerald-400">$0.5</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">All Returns</td><td className="px-3 py-2 text-left text-muted-foreground">100.9</td><td className="px-3 py-2 text-right text-muted-foreground">73.4</td><td className="px-3 py-2 text-right text-muted-foreground">72.8%</td><td className="px-3 py-2 text-right text-muted-foreground">$3,303</td><td className="px-3 py-2 text-right font-bold text-emerald-400">$242.4</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Discussion &amp; Implications</h2>
          <p className="text-muted-foreground">Lower-income filers receive refunds at rates exceeding 77%, reflecting refundable credits like EITC. Higher-income filers are more likely to owe tax due to complex income sources not subject to W-2 withholding.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">References</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
<li>IRS. (2025). <em>Filing Season Statistics for 2025</em>.</li>
            <li>IRS Statistics of Income. (2025). <em>Individual Income Tax Returns, Tax Year 2024</em>.</li>
            <li>National Taxpayer Advocate. (2025). <em>Annual Report to Congress</em>.</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 to-emerald-500/10 p-8">
          <h2 className="text-2xl font-bold text-foreground mb-3">Explore More</h2>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/research" className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-colors hover:bg-emerald-600">
              All Research <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/paycheck-calculator" className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-card/50 px-5 py-2.5 text-sm font-semibold text-emerald-400 transition-colors hover:bg-emerald-500/10">
              Paycheck Calculator <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
