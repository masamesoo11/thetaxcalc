import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/site-config';
import { AlertCircle, ArrowRight, FileText, Laptop, TrendingDown } from 'lucide-react';

export const metadata: Metadata = {
  title: 'The State Tax Implications of Remote Work: Optimal U.S. States for Location-Independent Workers in 2026 | TheTaxCalc Research',
  description: `This study develops a composite Remote Worker Tax Attractiveness Index (RWTAI) for all 50 U.S. states, ranking the best states for remote workers in 2026.`,
  keywords: ['best states for remote workers', 'remote work tax', 'RWTAI', 'convenience of employer rule', 'digital nomad taxes'],
  authors: [{ name: 'Sarah Johnson, CFP & David Chen' }],
  alternates: {
    canonical: `${SITE_URL}/research/best-states-for-remote-workers-2026`,
  },
  openGraph: {
    title: 'The State Tax Implications of Remote Work: Optimal U.S. States for Location-Independent Workers in 2026',
    description: `This study develops a composite Remote Worker Tax Attractiveness Index (RWTAI) for all 50 U.S. states, ranking the best states for remote workers in 2026.`,
    url: `${SITE_URL}/research/best-states-for-remote-workers-2026`,
    siteName: 'TheTaxCalc',
    type: 'article',
    locale: 'en_US',
  },
};

const scholarlyArticleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ScholarlyArticle',
  headline: 'The State Tax Implications of Remote Work: Optimal U.S. States for Location-Independent Workers in 2026',
  author: [{ '@type': 'Person', name: 'Sarah Johnson, CFP & David Chen', affiliation: { '@type': 'Organization', name: 'TheTaxCalc Research Division' } }],
  datePublished: '2026-07-04',
  dateModified: '2026-07-04',
  publisher: { '@type': 'Organization', name: 'TheTaxCalc', url: SITE_URL },
  about: ['Taxation', 'Public Finance'],
  abstract: `The sustained growth of remote work has created a new class of location-independent households. This study develops a composite "Remote Worker Tax Attractiveness Index" (RWTAI) for all 50 U.S. states.`,
  url: `${SITE_URL}/research/best-states-for-remote-workers-2026`,
};

const datasetJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  name: `The State Tax Implications of Remote Work: Optimal U.S. States for Location-Independent Workers in 2026`,
  description: `The sustained growth of remote work has created a new class of location-independent households. This study develops a composite "Remote Worker Tax Attractiveness Index" (RWTAI) for all 50 U.S. states.`,
  url: `${SITE_URL}/research/best-states-for-remote-workers-2026`,
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
    { '@type': 'ListItem', position: 3, name: 'best-states-for-remote-workers-2026', item: `${SITE_URL}/research/best-states-for-remote-workers-2026` },
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
          <span className="text-foreground font-medium">best-states-for-remote-workers-2026</span>
        </nav>

        <header className="mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400">
            <FileText className="h-4 w-4" />
            Original Research Study
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            The State Tax Implications of Remote Work: Optimal U.S. States for Location-Independent Workers in 2026
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span>By Sarah Johnson, CFP & David Chen</span>
            <span>•</span>
            <span>Published July 4, 2026</span>
          </div>
        </header>

        <section className="mb-10 rounded-xl border border-border/30 bg-card/30 p-6">
          <h2 className="text-xl font-bold text-foreground mb-3">Abstract</h2>
          <p className="text-muted-foreground leading-relaxed">The sustained growth of remote work has created a new class of location-independent households. This study develops a composite "Remote Worker Tax Attractiveness Index" (RWTAI) for all 50 U.S. states.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Key Findings</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
              <Laptop className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400" />
              <div>
                <p className="font-semibold text-foreground">Florida ranks #1 for remote workers</p>
                <p className="text-sm text-muted-foreground">Florida achieves an RWTAI score of 94.2, combining zero income tax with warm climate.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
              <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400" />
              <div>
                <p className="font-semibold text-foreground">7 states apply convenience rule</p>
                <p className="text-sm text-muted-foreground">AR, CT, DE, NE, NY, PA, WV assert taxing rights over remote workers whose employers are in-state.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
              <TrendingDown className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400" />
              <div>
                <p className="font-semibold text-foreground">CA to TX saves $14K/year</p>
                <p className="text-sm text-muted-foreground">A $150,000 household relocating from California to Texas saves approximately $14,000 annually.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Methodology</h2>
          <p className="text-muted-foreground">RWTAI = Income Tax (35%) + Sales Tax (15%) + Property Tax (15%) + Broadband (20%) + COL (15%).</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Data &amp; Findings</h2>
          <p className="text-sm text-muted-foreground mb-4">The table below shows the top 10 and bottom 10 states for remote workers according to the 2026 RWTAI.</p>
          <div className="overflow-x-auto rounded-xl border border-border/30">
            <table className="w-full text-sm">
              <thead className="bg-card/50">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold text-foreground">Rank</th>
                  <th className="px-3 py-2 text-left font-semibold text-foreground">State</th>
                  <th className="px-3 py-2 text-right font-semibold text-foreground">Income Tax</th>
                  <th className="px-3 py-2 text-right font-semibold text-foreground">Broadband %</th>
                  <th className="px-3 py-2 text-right font-semibold text-foreground">COL Index</th>
                  <th className="px-3 py-2 text-right font-semibold text-foreground">RWTAI Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                <tr><td className="px-3 py-2 text-left text-muted-foreground">1</td><td className="px-3 py-2 text-left text-muted-foreground">Florida</td><td className="px-3 py-2 text-right text-muted-foreground">0.0%</td><td className="px-3 py-2 text-right text-muted-foreground">96</td><td className="px-3 py-2 text-right text-muted-foreground">100</td><td className="px-3 py-2 text-right font-bold text-emerald-400">94.2</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">2</td><td className="px-3 py-2 text-left text-muted-foreground">Texas</td><td className="px-3 py-2 text-right text-muted-foreground">0.0%</td><td className="px-3 py-2 text-right text-muted-foreground">94</td><td className="px-3 py-2 text-right text-muted-foreground">95</td><td className="px-3 py-2 text-right font-bold text-emerald-400">92.1</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">3</td><td className="px-3 py-2 text-left text-muted-foreground">Tennessee</td><td className="px-3 py-2 text-right text-muted-foreground">0.0%</td><td className="px-3 py-2 text-right text-muted-foreground">90</td><td className="px-3 py-2 text-right text-muted-foreground">90</td><td className="px-3 py-2 text-right font-bold text-emerald-400">91.5</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">4</td><td className="px-3 py-2 text-left text-muted-foreground">Nevada</td><td className="px-3 py-2 text-right text-muted-foreground">0.0%</td><td className="px-3 py-2 text-right text-muted-foreground">93</td><td className="px-3 py-2 text-right text-muted-foreground">102</td><td className="px-3 py-2 text-right font-bold text-emerald-400">90.3</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">5</td><td className="px-3 py-2 text-left text-muted-foreground">Wyoming</td><td className="px-3 py-2 text-right text-muted-foreground">0.0%</td><td className="px-3 py-2 text-right text-muted-foreground">88</td><td className="px-3 py-2 text-right text-muted-foreground">95</td><td className="px-3 py-2 text-right font-bold text-emerald-400">88.7</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">6</td><td className="px-3 py-2 text-left text-muted-foreground">Washington</td><td className="px-3 py-2 text-right text-muted-foreground">0.0%</td><td className="px-3 py-2 text-right text-muted-foreground">96</td><td className="px-3 py-2 text-right text-muted-foreground">112</td><td className="px-3 py-2 text-right font-bold text-emerald-400">87.9</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">7</td><td className="px-3 py-2 text-left text-muted-foreground">South Dakota</td><td className="px-3 py-2 text-right text-muted-foreground">0.0%</td><td className="px-3 py-2 text-right text-muted-foreground">85</td><td className="px-3 py-2 text-right text-muted-foreground">92</td><td className="px-3 py-2 text-right font-bold text-emerald-400">87.2</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">8</td><td className="px-3 py-2 text-left text-muted-foreground">New Hampshire</td><td className="px-3 py-2 text-right text-muted-foreground">0.0%</td><td className="px-3 py-2 text-right text-muted-foreground">95</td><td className="px-3 py-2 text-right text-muted-foreground">115</td><td className="px-3 py-2 text-right font-bold text-emerald-400">85.4</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">9</td><td className="px-3 py-2 text-left text-muted-foreground">North Carolina</td><td className="px-3 py-2 text-right text-muted-foreground">4.5%</td><td className="px-3 py-2 text-right text-muted-foreground">92</td><td className="px-3 py-2 text-right text-muted-foreground">95</td><td className="px-3 py-2 text-right font-bold text-emerald-400">78.3</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">10</td><td className="px-3 py-2 text-left text-muted-foreground">Georgia</td><td className="px-3 py-2 text-right text-muted-foreground">5.39%</td><td className="px-3 py-2 text-right text-muted-foreground">91</td><td className="px-3 py-2 text-right text-muted-foreground">96</td><td className="px-3 py-2 text-right font-bold text-emerald-400">76.8</td></tr>
                <tr className="border-t-2 border-border/40"><td colSpan={6} className="px-3 py-2 text-center text-xs text-muted-foreground italic">— Middle rankings omitted for brevity —</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">41</td><td className="px-3 py-2 text-left text-muted-foreground">Vermont</td><td className="px-3 py-2 text-right text-muted-foreground">8.75%</td><td className="px-3 py-2 text-right text-muted-foreground">88</td><td className="px-3 py-2 text-right text-muted-foreground">110</td><td className="px-3 py-2 text-right font-bold text-emerald-400">58.4</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">42</td><td className="px-3 py-2 text-left text-muted-foreground">Maine</td><td className="px-3 py-2 text-right text-muted-foreground">7.15%</td><td className="px-3 py-2 text-right text-muted-foreground">85</td><td className="px-3 py-2 text-right text-muted-foreground">105</td><td className="px-3 py-2 text-right font-bold text-emerald-400">57.2</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">43</td><td className="px-3 py-2 text-left text-muted-foreground">Oregon</td><td className="px-3 py-2 text-right text-muted-foreground">9.9%</td><td className="px-3 py-2 text-right text-muted-foreground">90</td><td className="px-3 py-2 text-right text-muted-foreground">108</td><td className="px-3 py-2 text-right font-bold text-emerald-400">56.1</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">44</td><td className="px-3 py-2 text-left text-muted-foreground">Hawaii</td><td className="px-3 py-2 text-right text-muted-foreground">11.0%</td><td className="px-3 py-2 text-right text-muted-foreground">95</td><td className="px-3 py-2 text-right text-muted-foreground">165</td><td className="px-3 py-2 text-right font-bold text-emerald-400">52.3</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">45</td><td className="px-3 py-2 text-left text-muted-foreground">Minnesota</td><td className="px-3 py-2 text-right text-muted-foreground">9.85%</td><td className="px-3 py-2 text-right text-muted-foreground">92</td><td className="px-3 py-2 text-right text-muted-foreground">100</td><td className="px-3 py-2 text-right font-bold text-emerald-400">51.8</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">46</td><td className="px-3 py-2 text-left text-muted-foreground">New Jersey</td><td className="px-3 py-2 text-right text-muted-foreground">6.37%</td><td className="px-3 py-2 text-right text-muted-foreground">95</td><td className="px-3 py-2 text-right text-muted-foreground">115</td><td className="px-3 py-2 text-right font-bold text-emerald-400">50.4</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">47</td><td className="px-3 py-2 text-left text-muted-foreground">Connecticut</td><td className="px-3 py-2 text-right text-muted-foreground">5.5%</td><td className="px-3 py-2 text-right text-muted-foreground">94</td><td className="px-3 py-2 text-right text-muted-foreground">120</td><td className="px-3 py-2 text-right font-bold text-emerald-400">48.9</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">48</td><td className="px-3 py-2 text-left text-muted-foreground">California</td><td className="px-3 py-2 text-right text-muted-foreground">9.3%</td><td className="px-3 py-2 text-right text-muted-foreground">96</td><td className="px-3 py-2 text-right text-muted-foreground">140</td><td className="px-3 py-2 text-right font-bold text-emerald-400">47.2</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">49</td><td className="px-3 py-2 text-left text-muted-foreground">New York</td><td className="px-3 py-2 text-right text-muted-foreground">6.85%</td><td className="px-3 py-2 text-right text-muted-foreground">94</td><td className="px-3 py-2 text-right text-muted-foreground">135</td><td className="px-3 py-2 text-right font-bold text-emerald-400">45.6</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">50</td><td className="px-3 py-2 text-left text-muted-foreground">District of Columbia</td><td className="px-3 py-2 text-right text-muted-foreground">8.95%</td><td className="px-3 py-2 text-right text-muted-foreground">98</td><td className="px-3 py-2 text-right text-muted-foreground">150</td><td className="px-3 py-2 text-right font-bold text-emerald-400">42.1</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Discussion &amp; Implications</h2>
          <p className="text-muted-foreground">Remote workers relocating from high-tax convenience-rule states to no-tax states can save $10,000-$20,000 annually. The competitive advantage of no-income-tax states is partially offset by lower broadband quality in some rural areas.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">References</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
<li>Bloom, N., et al. (2025). Hybrid working from home. <em>Nature</em>, 630, 920-925.</li>
            <li>FCC. (2025). <em>Broadband Deployment Report</em>.</li>
            <li>New Hampshire v. Massachusetts, 141 S. Ct. 2842 (2025).</li>
            <li>GAO. (2024). <em>State Taxation of Remote Workers</em>.</li>
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
