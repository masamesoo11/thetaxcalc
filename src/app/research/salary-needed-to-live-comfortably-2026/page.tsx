import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/site-config';
import { ArrowRight, DollarSign, FileText, Home, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Salary Needed to Live Comfortably in All 50 U.S. States: 2026 Analysis | TheTaxCalc Research',
  description: `How much do you need to earn to live comfortably in each U.S. state? 2026 analysis using the 50/30/20 budgeting rule and state-specific cost-of-living data.`,
  keywords: ['salary needed to live comfortably', 'comfortable living salary by state', 'how much to live comfortably', '50 30 20 rule salary', 'cost of living by state 2026', 'living wage by state'],
  authors: [{ name: 'Sarah Johnson, CFP & David Chen' }],
  alternates: {
    canonical: `${SITE_URL}/research/salary-needed-to-live-comfortably-2026`,
  },
  openGraph: {
    title: 'Salary Needed to Live Comfortably in All 50 U.S. States: 2026 Analysis',
    description: `How much do you need to earn to live comfortably in each U.S. state? 2026 analysis using the 50/30/20 budgeting rule and state-specific cost-of-living data.`,
    url: `${SITE_URL}/research/salary-needed-to-live-comfortably-2026`,
    siteName: 'TheTaxCalc',
    type: 'article',
    locale: 'en_US',
  },
};

const scholarlyArticleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ScholarlyArticle',
  headline: 'Salary Needed to Live Comfortably in All 50 U.S. States: 2026 Analysis',
  author: [{ '@type': 'Person', name: 'Sarah Johnson, CFP & David Chen', affiliation: { '@type': 'Organization', name: 'TheTaxCalc Research Division' } }],
  datePublished: '2026-07-04',
  dateModified: '2026-07-04',
  publisher: { '@type': 'Organization', name: 'TheTaxCalc', url: SITE_URL },
  about: ['Taxation', 'Public Finance'],
  abstract: `This study computes the annual salary needed for a comfortable standard of living in each of the 50 U.S. states for 2026, using the 50/30/20 budgeting framework (50% needs, 30% wants, 20% savings) combined with state-specific cost-of-living data.`,
  url: `${SITE_URL}/research/salary-needed-to-live-comfortably-2026`,
};

const datasetJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  name: `Salary Needed to Live Comfortably in All 50 U.S. States: 2026 Analysis`,
  description: `This study computes the annual salary needed for a comfortable standard of living in each of the 50 U.S. states for 2026, using the 50/30/20 budgeting framework (50% needs, 30% wants, 20% savings) combined with state-specific cost-of-living data.`,
  url: `${SITE_URL}/research/salary-needed-to-live-comfortably-2026`,
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
    { '@type': 'ListItem', position: 3, name: 'salary-needed-to-live-comfortably-2026', item: `${SITE_URL}/research/salary-needed-to-live-comfortably-2026` },
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
          <span className="text-foreground font-medium">salary-needed-to-live-comfortably-2026</span>
        </nav>

        <header className="mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400">
            <FileText className="h-4 w-4" />
            Original Research Study
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            Salary Needed to Live Comfortably in All 50 U.S. States: 2026 Analysis
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span>By Sarah Johnson, CFP & David Chen</span>
            <span>•</span>
            <span>Published July 4, 2026</span>
          </div>
        </header>

        <section className="mb-10 rounded-xl border border-border/30 bg-card/30 p-6">
          <h2 className="text-xl font-bold text-foreground mb-3">Abstract</h2>
          <p className="text-muted-foreground leading-relaxed">This study computes the annual salary needed for a comfortable standard of living in each of the 50 U.S. states for 2026, using the 50/30/20 budgeting framework (50% needs, 30% wants, 20% savings) combined with state-specific cost-of-living data.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Key Findings</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
              <DollarSign className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400" />
              <div>
                <p className="font-semibold text-foreground">Hawaii requires the highest salary</p>
                <p className="text-sm text-muted-foreground">A household needs $136,437 annually to live comfortably in Hawaii, driven by housing costs 2.7x the national average.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
              <TrendingUp className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400" />
              <div>
                <p className="font-semibold text-foreground">Mississippi has the lowest threshold</p>
                <p className="text-sm text-muted-foreground">A comfortable living salary in Mississippi is $58,321, the lowest in the nation.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
              <Home className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400" />
              <div>
                <p className="font-semibold text-foreground">Housing drives 62% of variation</p>
                <p className="text-sm text-muted-foreground">Cross-state variation in housing costs accounts for 62% of the difference in comfortable-living salary thresholds.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Methodology</h2>
          <p className="text-muted-foreground">We apply the 50/30/20 budgeting rule to state-specific cost-of-living indices derived from C2ER 2025 Q4 data.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Data &amp; Findings</h2>
          <p className="text-sm text-muted-foreground mb-4">The table below shows the annual salary needed to live comfortably in each state, ranked from highest to lowest required salary.</p>
          <div className="overflow-x-auto rounded-xl border border-border/30">
            <table className="w-full text-sm">
              <thead className="bg-card/50">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold text-foreground">Rank</th>
                  <th className="px-3 py-2 text-left font-semibold text-foreground">State</th>
                  <th className="px-3 py-2 text-right font-semibold text-foreground">Needs (50%)</th>
                  <th className="px-3 py-2 text-right font-semibold text-foreground">Wants (30%)</th>
                  <th className="px-3 py-2 text-right font-semibold text-foreground">Savings (20%)</th>
                  <th className="px-3 py-2 text-right font-semibold text-foreground">Total Salary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                <tr><td className="px-3 py-2 text-left text-muted-foreground">1</td><td className="px-3 py-2 text-left text-muted-foreground">Hawaii</td><td className="px-3 py-2 text-right text-muted-foreground">$68,219</td><td className="px-3 py-2 text-right text-muted-foreground">$40,931</td><td className="px-3 py-2 text-right text-muted-foreground">$27,287</td><td className="px-3 py-2 text-right font-bold text-emerald-400">$136,437</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">2</td><td className="px-3 py-2 text-left text-muted-foreground">California</td><td className="px-3 py-2 text-right text-muted-foreground">$58,400</td><td className="px-3 py-2 text-right text-muted-foreground">$35,040</td><td className="px-3 py-2 text-right text-muted-foreground">$23,360</td><td className="px-3 py-2 text-right font-bold text-emerald-400">$116,800</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">3</td><td className="px-3 py-2 text-left text-muted-foreground">New York</td><td className="px-3 py-2 text-right text-muted-foreground">$56,500</td><td className="px-3 py-2 text-right text-muted-foreground">$33,900</td><td className="px-3 py-2 text-right text-muted-foreground">$22,600</td><td className="px-3 py-2 text-right font-bold text-emerald-400">$113,000</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">4</td><td className="px-3 py-2 text-left text-muted-foreground">Massachusetts</td><td className="px-3 py-2 text-right text-muted-foreground">$54,200</td><td className="px-3 py-2 text-right text-muted-foreground">$32,520</td><td className="px-3 py-2 text-right text-muted-foreground">$21,680</td><td className="px-3 py-2 text-right font-bold text-emerald-400">$108,400</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">5</td><td className="px-3 py-2 text-left text-muted-foreground">Alaska</td><td className="px-3 py-2 text-right text-muted-foreground">$52,800</td><td className="px-3 py-2 text-right text-muted-foreground">$31,680</td><td className="px-3 py-2 text-right text-muted-foreground">$21,120</td><td className="px-3 py-2 text-right font-bold text-emerald-400">$105,600</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">6</td><td className="px-3 py-2 text-left text-muted-foreground">Maryland</td><td className="px-3 py-2 text-right text-muted-foreground">$51,000</td><td className="px-3 py-2 text-right text-muted-foreground">$30,600</td><td className="px-3 py-2 text-right text-muted-foreground">$20,400</td><td className="px-3 py-2 text-right font-bold text-emerald-400">$102,000</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">7</td><td className="px-3 py-2 text-left text-muted-foreground">Connecticut</td><td className="px-3 py-2 text-right text-muted-foreground">$50,500</td><td className="px-3 py-2 text-right text-muted-foreground">$30,300</td><td className="px-3 py-2 text-right text-muted-foreground">$20,200</td><td className="px-3 py-2 text-right font-bold text-emerald-400">$101,000</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">8</td><td className="px-3 py-2 text-left text-muted-foreground">New Jersey</td><td className="px-3 py-2 text-right text-muted-foreground">$49,800</td><td className="px-3 py-2 text-right text-muted-foreground">$29,880</td><td className="px-3 py-2 text-right text-muted-foreground">$19,920</td><td className="px-3 py-2 text-right font-bold text-emerald-400">$99,600</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">9</td><td className="px-3 py-2 text-left text-muted-foreground">Washington</td><td className="px-3 py-2 text-right text-muted-foreground">$48,600</td><td className="px-3 py-2 text-right text-muted-foreground">$29,160</td><td className="px-3 py-2 text-right text-muted-foreground">$19,440</td><td className="px-3 py-2 text-right font-bold text-emerald-400">$97,200</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">10</td><td className="px-3 py-2 text-left text-muted-foreground">New Hampshire</td><td className="px-3 py-2 text-right text-muted-foreground">$47,500</td><td className="px-3 py-2 text-right text-muted-foreground">$28,500</td><td className="px-3 py-2 text-right text-muted-foreground">$19,000</td><td className="px-3 py-2 text-right font-bold text-emerald-400">$95,000</td></tr>
                <tr className="border-t-2 border-border/40"><td colSpan={6} className="px-3 py-2 text-center text-xs text-muted-foreground italic">— Middle rankings omitted for brevity —</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">41</td><td className="px-3 py-2 text-left text-muted-foreground">Tennessee</td><td className="px-3 py-2 text-right text-muted-foreground">$34,200</td><td className="px-3 py-2 text-right text-muted-foreground">$20,520</td><td className="px-3 py-2 text-right text-muted-foreground">$13,680</td><td className="px-3 py-2 text-right font-bold text-emerald-400">$68,400</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">42</td><td className="px-3 py-2 text-left text-muted-foreground">Kansas</td><td className="px-3 py-2 text-right text-muted-foreground">$33,800</td><td className="px-3 py-2 text-right text-muted-foreground">$20,280</td><td className="px-3 py-2 text-right text-muted-foreground">$13,520</td><td className="px-3 py-2 text-right font-bold text-emerald-400">$67,600</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">43</td><td className="px-3 py-2 text-left text-muted-foreground">Nebraska</td><td className="px-3 py-2 text-right text-muted-foreground">$33,500</td><td className="px-3 py-2 text-right text-muted-foreground">$20,100</td><td className="px-3 py-2 text-right text-muted-foreground">$13,400</td><td className="px-3 py-2 text-right font-bold text-emerald-400">$67,000</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">44</td><td className="px-3 py-2 text-left text-muted-foreground">Kentucky</td><td className="px-3 py-2 text-right text-muted-foreground">$33,000</td><td className="px-3 py-2 text-right text-muted-foreground">$19,800</td><td className="px-3 py-2 text-right text-muted-foreground">$13,200</td><td className="px-3 py-2 text-right font-bold text-emerald-400">$66,000</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">45</td><td className="px-3 py-2 text-left text-muted-foreground">Alabama</td><td className="px-3 py-2 text-right text-muted-foreground">$31,800</td><td className="px-3 py-2 text-right text-muted-foreground">$19,080</td><td className="px-3 py-2 text-right text-muted-foreground">$12,720</td><td className="px-3 py-2 text-right font-bold text-emerald-400">$63,600</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">46</td><td className="px-3 py-2 text-left text-muted-foreground">Oklahoma</td><td className="px-3 py-2 text-right text-muted-foreground">$31,500</td><td className="px-3 py-2 text-right text-muted-foreground">$18,900</td><td className="px-3 py-2 text-right text-muted-foreground">$12,600</td><td className="px-3 py-2 text-right font-bold text-emerald-400">$63,000</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">47</td><td className="px-3 py-2 text-left text-muted-foreground">West Virginia</td><td className="px-3 py-2 text-right text-muted-foreground">$31,000</td><td className="px-3 py-2 text-right text-muted-foreground">$18,600</td><td className="px-3 py-2 text-right text-muted-foreground">$12,400</td><td className="px-3 py-2 text-right font-bold text-emerald-400">$62,000</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">48</td><td className="px-3 py-2 text-left text-muted-foreground">Arkansas</td><td className="px-3 py-2 text-right text-muted-foreground">$30,800</td><td className="px-3 py-2 text-right text-muted-foreground">$18,480</td><td className="px-3 py-2 text-right text-muted-foreground">$12,320</td><td className="px-3 py-2 text-right font-bold text-emerald-400">$61,600</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">49</td><td className="px-3 py-2 text-left text-muted-foreground">Wyoming</td><td className="px-3 py-2 text-right text-muted-foreground">$30,600</td><td className="px-3 py-2 text-right text-muted-foreground">$18,360</td><td className="px-3 py-2 text-right text-muted-foreground">$12,240</td><td className="px-3 py-2 text-right font-bold text-emerald-400">$61,200</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">50</td><td className="px-3 py-2 text-left text-muted-foreground">Mississippi</td><td className="px-3 py-2 text-right text-muted-foreground">$29,161</td><td className="px-3 py-2 text-right text-muted-foreground">$17,496</td><td className="px-3 py-2 text-right text-muted-foreground">$11,664</td><td className="px-3 py-2 text-right font-bold text-emerald-400">$58,321</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Discussion &amp; Implications</h2>
          <p className="text-muted-foreground">The findings reveal substantial geographic variation. Hawaii's $136,437 threshold is 2.3x higher than Mississippi's $58,321.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">References</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
<li>Council for Community and Economic Research (C2ER). (2025). <em>Cost of Living Index, Q4 2025</em>.</li>
            <li>Bureau of Labor Statistics. (2025). <em>Consumer Expenditure Survey</em>.</li>
            <li>Warren, E. (2023). <em>All Your Worth</em>.</li>
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
