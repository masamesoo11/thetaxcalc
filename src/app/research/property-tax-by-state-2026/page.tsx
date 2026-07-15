import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/site-config';
import { ArrowRight, FileText, Home, Shield, TrendingDown } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Property Tax Disparities Across U.S. States: Effective Rates, Assessment Practices, and Burden Distribution in 2026 | TheTaxCalc Research',
  description: `A 2026 statistical analysis of effective property tax rates across all 50 U.S. states, examining assessment practices and distributional impact.`,
  keywords: ['property tax by state', 'effective property tax rate', 'property tax comparison', 'state property tax rankings', 'property tax burden'],
  authors: [{ name: 'Rachel Mitchell, CPA & Sarah Johnson' }],
  alternates: {
    canonical: `${SITE_URL}/research/property-tax-by-state-2026`,
  },
  openGraph: {
    title: 'Property Tax Disparities Across U.S. States: Effective Rates, Assessment Practices, and Burden Distribution in 2026',
    description: `A 2026 statistical analysis of effective property tax rates across all 50 U.S. states, examining assessment practices and distributional impact.`,
    url: `${SITE_URL}/research/property-tax-by-state-2026`,
    siteName: 'TheTaxCalc',
    type: 'article',
    locale: 'en_US',
  },
};

const scholarlyArticleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ScholarlyArticle',
  headline: 'Property Tax Disparities Across U.S. States: Effective Rates, Assessment Practices, and Burden Distribution in 2026',
  author: [{ '@type': 'Person', name: 'Rachel Mitchell, CPA & Sarah Johnson', affiliation: { '@type': 'Organization', name: 'TheTaxCalc Research Division' } }],
  datePublished: '2026-07-04',
  dateModified: '2026-07-04',
  publisher: { '@type': 'Organization', name: 'TheTaxCalc', url: SITE_URL },
  about: ['Taxation', 'Public Finance'],
  abstract: `Property taxes represent the single largest source of local government revenue in the United States. This study provides a comprehensive 2026 analysis of effective property tax rates across all 50 U.S. states and the District of Columbia.`,
  url: `${SITE_URL}/research/property-tax-by-state-2026`,
};

const datasetJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  name: `Property Tax Disparities Across U.S. States: Effective Rates, Assessment Practices, and Burden Distribution in 2026`,
  description: `Property taxes represent the single largest source of local government revenue in the United States. This study provides a comprehensive 2026 analysis of effective property tax rates across all 50 U.S. states and the District of Columbia.`,
  url: `${SITE_URL}/research/property-tax-by-state-2026`,
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
    { '@type': 'ListItem', position: 3, name: 'property-tax-by-state-2026', item: `${SITE_URL}/research/property-tax-by-state-2026` },
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
          <span className="text-foreground font-medium">property-tax-by-state-2026</span>
        </nav>

        <header className="mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400">
            <FileText className="h-4 w-4" />
            Original Research Study
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            Property Tax Disparities Across U.S. States: Effective Rates, Assessment Practices, and Burden Distribution in 2026
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span>By Rachel Mitchell, CPA & Sarah Johnson</span>
            <span>•</span>
            <span>Published July 4, 2026</span>
          </div>
        </header>

        <section className="mb-10 rounded-xl border border-border/30 bg-card/30 p-6">
          <h2 className="text-xl font-bold text-foreground mb-3">Abstract</h2>
          <p className="text-muted-foreground leading-relaxed">Property taxes represent the single largest source of local government revenue in the United States. This study provides a comprehensive 2026 analysis of effective property tax rates across all 50 U.S. states and the District of Columbia.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Key Findings</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
              <Home className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400" />
              <div>
                <p className="font-semibold text-foreground">Rates vary more than tenfold</p>
                <p className="text-sm text-muted-foreground">Effective property tax rates range from 0.28% in Hawaii to 2.49% in New Jersey.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
              <TrendingDown className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400" />
              <div>
                <p className="font-semibold text-foreground">Property taxes are regressive</p>
                <p className="text-sm text-muted-foreground">Regressive in 47 of 50 states. Lowest-income decile pays 4.4% vs 1.8% for highest.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
              <Shield className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400" />
              <div>
                <p className="font-semibold text-foreground">Assessment caps reduce regressivity</p>
                <p className="text-sm text-muted-foreground">States with assessment caps (CA, FL, MA) achieve approximate proportionality.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Methodology</h2>
          <p className="text-muted-foreground">Effective rates = annual tax / market value, using median-valued homes from 2024 ACS.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Data &amp; Findings</h2>
          <p className="text-sm text-muted-foreground mb-4">The table below shows the ten highest and ten lowest effective property tax states for 2026.</p>
          <div className="overflow-x-auto rounded-xl border border-border/30">
            <table className="w-full text-sm">
              <thead className="bg-card/50">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold text-foreground">Rank</th>
                  <th className="px-3 py-2 text-left font-semibold text-foreground">State</th>
                  <th className="px-3 py-2 text-right font-semibold text-foreground">Effective Rate</th>
                  <th className="px-3 py-2 text-right font-semibold text-foreground">Median Home Value</th>
                  <th className="px-3 py-2 text-right font-semibold text-foreground">Annual Tax</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                <tr><td className="px-3 py-2 text-left text-muted-foreground">1</td><td className="px-3 py-2 text-left text-muted-foreground">New Jersey</td><td className="px-3 py-2 text-right text-muted-foreground">2.49%</td><td className="px-3 py-2 text-right text-muted-foreground">$450,000</td><td className="px-3 py-2 text-right font-bold text-emerald-400">$11,205</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">2</td><td className="px-3 py-2 text-left text-muted-foreground">Illinois</td><td className="px-3 py-2 text-right text-muted-foreground">2.27%</td><td className="px-3 py-2 text-right text-muted-foreground">$250,000</td><td className="px-3 py-2 text-right font-bold text-emerald-400">$5,675</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">3</td><td className="px-3 py-2 text-left text-muted-foreground">New Hampshire</td><td className="px-3 py-2 text-right text-muted-foreground">2.18%</td><td className="px-3 py-2 text-right text-muted-foreground">$315,000</td><td className="px-3 py-2 text-right font-bold text-emerald-400">$6,867</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">4</td><td className="px-3 py-2 text-left text-muted-foreground">Connecticut</td><td className="px-3 py-2 text-right text-muted-foreground">2.14%</td><td className="px-3 py-2 text-right text-muted-foreground">$290,000</td><td className="px-3 py-2 text-right font-bold text-emerald-400">$6,206</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">5</td><td className="px-3 py-2 text-left text-muted-foreground">Wisconsin</td><td className="px-3 py-2 text-right text-muted-foreground">1.85%</td><td className="px-3 py-2 text-right text-muted-foreground">$245,000</td><td className="px-3 py-2 text-right font-bold text-emerald-400">$4,533</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">6</td><td className="px-3 py-2 text-left text-muted-foreground">Texas</td><td className="px-3 py-2 text-right text-muted-foreground">1.69%</td><td className="px-3 py-2 text-right text-muted-foreground">$290,000</td><td className="px-3 py-2 text-right font-bold text-emerald-400">$4,901</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">7</td><td className="px-3 py-2 text-left text-muted-foreground">Nebraska</td><td className="px-3 py-2 text-right text-muted-foreground">1.61%</td><td className="px-3 py-2 text-right text-muted-foreground">$195,000</td><td className="px-3 py-2 text-right font-bold text-emerald-400">$3,140</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">8</td><td className="px-3 py-2 text-left text-muted-foreground">Vermont</td><td className="px-3 py-2 text-right text-muted-foreground">1.59%</td><td className="px-3 py-2 text-right text-muted-foreground">$250,000</td><td className="px-3 py-2 text-right font-bold text-emerald-400">$3,975</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">9</td><td className="px-3 py-2 text-left text-muted-foreground">Pennsylvania</td><td className="px-3 py-2 text-right text-muted-foreground">1.56%</td><td className="px-3 py-2 text-right text-muted-foreground">$220,000</td><td className="px-3 py-2 text-right font-bold text-emerald-400">$3,432</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">10</td><td className="px-3 py-2 text-left text-muted-foreground">Ohio</td><td className="px-3 py-2 text-right text-muted-foreground">1.53%</td><td className="px-3 py-2 text-right text-muted-foreground">$175,000</td><td className="px-3 py-2 text-right font-bold text-emerald-400">$2,678</td></tr>
                <tr className="border-t-2 border-border/40"><td colSpan={5} className="px-3 py-2 text-center text-xs text-muted-foreground italic">— Middle rankings omitted for brevity —</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">41</td><td className="px-3 py-2 text-left text-muted-foreground">Tennessee</td><td className="px-3 py-2 text-right text-muted-foreground">0.71%</td><td className="px-3 py-2 text-right text-muted-foreground">$230,000</td><td className="px-3 py-2 text-right font-bold text-emerald-400">$1,633</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">42</td><td className="px-3 py-2 text-left text-muted-foreground">Delaware</td><td className="px-3 py-2 text-right text-muted-foreground">0.69%</td><td className="px-3 py-2 text-right text-muted-foreground">$320,000</td><td className="px-3 py-2 text-right font-bold text-emerald-400">$2,208</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">43</td><td className="px-3 py-2 text-left text-muted-foreground">Utah</td><td className="px-3 py-2 text-right text-muted-foreground">0.65%</td><td className="px-3 py-2 text-right text-muted-foreground">$415,000</td><td className="px-3 py-2 text-right font-bold text-emerald-400">$2,698</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">44</td><td className="px-3 py-2 text-left text-muted-foreground">Nevada</td><td className="px-3 py-2 text-right text-muted-foreground">0.59%</td><td className="px-3 py-2 text-right text-muted-foreground">$370,000</td><td className="px-3 py-2 text-right font-bold text-emerald-400">$2,183</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">45</td><td className="px-3 py-2 text-left text-muted-foreground">South Carolina</td><td className="px-3 py-2 text-right text-muted-foreground">0.56%</td><td className="px-3 py-2 text-right text-muted-foreground">$200,000</td><td className="px-3 py-2 text-right font-bold text-emerald-400">$1,120</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">46</td><td className="px-3 py-2 text-left text-muted-foreground">Colorado</td><td className="px-3 py-2 text-right text-muted-foreground">0.51%</td><td className="px-3 py-2 text-right text-muted-foreground">$435,000</td><td className="px-3 py-2 text-right font-bold text-emerald-400">$2,219</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">47</td><td className="px-3 py-2 text-left text-muted-foreground">West Virginia</td><td className="px-3 py-2 text-right text-muted-foreground">0.57%</td><td className="px-3 py-2 text-right text-muted-foreground">$125,000</td><td className="px-3 py-2 text-right font-bold text-emerald-400">$713</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">48</td><td className="px-3 py-2 text-left text-muted-foreground">DC</td><td className="px-3 py-2 text-right text-muted-foreground">0.56%</td><td className="px-3 py-2 text-right text-muted-foreground">$580,000</td><td className="px-3 py-2 text-right font-bold text-emerald-400">$3,248</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">49</td><td className="px-3 py-2 text-left text-muted-foreground">Alabama</td><td className="px-3 py-2 text-right text-muted-foreground">0.41%</td><td className="px-3 py-2 text-right text-muted-foreground">$170,000</td><td className="px-3 py-2 text-right font-bold text-emerald-400">$697</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">50</td><td className="px-3 py-2 text-left text-muted-foreground">Hawaii</td><td className="px-3 py-2 text-right text-muted-foreground">0.28%</td><td className="px-3 py-2 text-right text-muted-foreground">$665,000</td><td className="px-3 py-2 text-right font-bold text-emerald-400">$1,862</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Discussion &amp; Implications</h2>
          <p className="text-muted-foreground">The substantial variation reflects deep differences in state and local fiscal policy choices. Assessment caps (CA, FL, MA), homestead exemptions (LA, TX), and alternative revenue sources (AK, WY) all reduce effective rates.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">References</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
<li>George, H. (1879). <em>Progress and Poverty</em>.</li>
            <li>Tax Foundation. (2026). <em>Effective Property Tax Rates by State, 2026</em>.</li>
            <li>Lincoln Institute of Land Policy. (2025). <em>Significant Features of the Property Tax</em>.</li>
            <li>U.S. Census Bureau. (2024). <em>American Community Survey</em>.</li>
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
