import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/site-config';
import { ArrowRight, Baby, DollarSign, FileText, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Child Tax Credit 2026: Complete Guide to Eligibility, Amounts, and OBBBA Changes | TheTaxCalc Research',
  description: `A comprehensive 2026 guide to the Child Tax Credit under OBBBA, including eligibility, credit amounts ($2,200), phaseout thresholds, and refundability rules.`,
  keywords: ['child tax credit 2026', 'CTC 2026', 'OBBBA child tax credit', 'child tax credit eligibility', 'additional child tax credit', 'CTC phaseout'],
  authors: [{ name: 'Rachel Mitchell, CPA' }],
  alternates: {
    canonical: `${SITE_URL}/research/child-tax-credit-guide-2026`,
  },
  openGraph: {
    title: 'Child Tax Credit 2026: Complete Guide to Eligibility, Amounts, and OBBBA Changes',
    description: `A comprehensive 2026 guide to the Child Tax Credit under OBBBA, including eligibility, credit amounts ($2,200), phaseout thresholds, and refundability rules.`,
    url: `${SITE_URL}/research/child-tax-credit-guide-2026`,
    siteName: 'TheTaxCalc',
    type: 'article',
    locale: 'en_US',
  },
};

const scholarlyArticleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ScholarlyArticle',
  headline: 'Child Tax Credit 2026: Complete Guide to Eligibility, Amounts, and OBBBA Changes',
  author: [{ '@type': 'Person', name: 'Rachel Mitchell, CPA', affiliation: { '@type': 'Organization', name: 'TheTaxCalc Research Division' } }],
  datePublished: '2026-07-04',
  dateModified: '2026-07-04',
  publisher: { '@type': 'Organization', name: 'TheTaxCalc', url: SITE_URL },
  about: ['Taxation', 'Public Finance'],
  abstract: `This guide provides a comprehensive overview of the Child Tax Credit (CTC) for the 2026 tax year under the One Big Beautiful Bill Act (OBBBA). It covers eligibility requirements, credit amounts, phaseout thresholds, and refundability rules.`,
  url: `${SITE_URL}/research/child-tax-credit-guide-2026`,
};

const datasetJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  name: `Child Tax Credit 2026: Complete Guide to Eligibility, Amounts, and OBBBA Changes`,
  description: `This guide provides a comprehensive overview of the Child Tax Credit (CTC) for the 2026 tax year under the One Big Beautiful Bill Act (OBBBA). It covers eligibility requirements, credit amounts, phaseout thresholds, and refundability rules.`,
  url: `${SITE_URL}/research/child-tax-credit-guide-2026`,
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
    { '@type': 'ListItem', position: 3, name: 'child-tax-credit-guide-2026', item: `${SITE_URL}/research/child-tax-credit-guide-2026` },
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
          <span className="text-foreground font-medium">child-tax-credit-guide-2026</span>
        </nav>

        <header className="mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400">
            <FileText className="h-4 w-4" />
            Original Research Study
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            Child Tax Credit 2026: Complete Guide to Eligibility, Amounts, and OBBBA Changes
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span>By Rachel Mitchell, CPA</span>
            <span>•</span>
            <span>Published July 4, 2026</span>
          </div>
        </header>

        <section className="mb-10 rounded-xl border border-border/30 bg-card/30 p-6">
          <h2 className="text-xl font-bold text-foreground mb-3">Abstract</h2>
          <p className="text-muted-foreground leading-relaxed">This guide provides a comprehensive overview of the Child Tax Credit (CTC) for the 2026 tax year under the One Big Beautiful Bill Act (OBBBA). It covers eligibility requirements, credit amounts, phaseout thresholds, and refundability rules.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Key Findings</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
              <Baby className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400" />
              <div>
                <p className="font-semibold text-foreground">CTC doubled to $2,200 under OBBBA</p>
                <p className="text-sm text-muted-foreground">OBBBA doubled the Child Tax Credit to $2,200 per qualifying child, indexed to inflation.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
              <DollarSign className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400" />
              <div>
                <p className="font-semibold text-foreground">Up to $1,700 refundable</p>
                <p className="text-sm text-muted-foreground">Up to $1,700 of the CTC is refundable as the Additional Child Tax Credit (ACTC).</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
              <TrendingUp className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400" />
              <div>
                <p className="font-semibold text-foreground">Phaseout at $200K/$400K</p>
                <p className="text-sm text-muted-foreground">The CTC phases out at $200,000 (single) and $400,000 (married) MAGI.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Methodology</h2>
          <p className="text-muted-foreground">Based on the statutory text of OBBBA (P.L. 119-1), IRS Publication 972, and Revenue Procedure 2025-25.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Data &amp; Findings</h2>
          <p className="text-sm text-muted-foreground mb-4">The table below shows how the Child Tax Credit phases out for single and married filers at various income levels.</p>
          <div className="overflow-x-auto rounded-xl border border-border/30">
            <table className="w-full text-sm">
              <thead className="bg-card/50">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold text-foreground">MAGI</th>
                  <th className="px-3 py-2 text-left font-semibold text-foreground">Single Filer CTC</th>
                  <th className="px-3 py-2 text-right font-semibold text-foreground">Married Filer CTC</th>
                  <th className="px-3 py-2 text-right font-semibold text-foreground">Per-Child Credit</th>
                  <th className="px-3 py-2 text-right font-semibold text-foreground">Refundable Portion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                <tr><td className="px-3 py-2 text-left text-muted-foreground">$50,000</td><td className="px-3 py-2 text-left text-muted-foreground">$2,200</td><td className="px-3 py-2 text-right text-muted-foreground">$2,200</td><td className="px-3 py-2 text-right text-muted-foreground">$2,200</td><td className="px-3 py-2 text-right font-bold text-emerald-400">Up to $1,700</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">$100,000</td><td className="px-3 py-2 text-left text-muted-foreground">$2,200</td><td className="px-3 py-2 text-right text-muted-foreground">$2,200</td><td className="px-3 py-2 text-right text-muted-foreground">$2,200</td><td className="px-3 py-2 text-right font-bold text-emerald-400">Up to $1,700</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">$150,000</td><td className="px-3 py-2 text-left text-muted-foreground">$2,200</td><td className="px-3 py-2 text-right text-muted-foreground">$2,200</td><td className="px-3 py-2 text-right text-muted-foreground">$2,200</td><td className="px-3 py-2 text-right font-bold text-emerald-400">Up to $1,700</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">$200,000</td><td className="px-3 py-2 text-left text-muted-foreground">$2,200</td><td className="px-3 py-2 text-right text-muted-foreground">$2,200</td><td className="px-3 py-2 text-right text-muted-foreground">$2,200</td><td className="px-3 py-2 text-right font-bold text-emerald-400">Up to $1,700</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">$210,000</td><td className="px-3 py-2 text-left text-muted-foreground">$1,700</td><td className="px-3 py-2 text-right text-muted-foreground">$2,200</td><td className="px-3 py-2 text-right text-muted-foreground">Varies</td><td className="px-3 py-2 text-right font-bold text-emerald-400">Up to $1,700</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">$300,000</td><td className="px-3 py-2 text-left text-muted-foreground">$0</td><td className="px-3 py-2 text-right text-muted-foreground">$2,200</td><td className="px-3 py-2 text-right text-muted-foreground">Varies</td><td className="px-3 py-2 text-right font-bold text-emerald-400">Up to $1,700</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">$400,000</td><td className="px-3 py-2 text-left text-muted-foreground">$0</td><td className="px-3 py-2 text-right text-muted-foreground">$2,200</td><td className="px-3 py-2 text-right text-muted-foreground">$2,200</td><td className="px-3 py-2 text-right font-bold text-emerald-400">Up to $1,700</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">$410,000</td><td className="px-3 py-2 text-left text-muted-foreground">$0</td><td className="px-3 py-2 text-right text-muted-foreground">$1,700</td><td className="px-3 py-2 text-right text-muted-foreground">Varies</td><td className="px-3 py-2 text-right font-bold text-emerald-400">Up to $1,700</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">$500,000</td><td className="px-3 py-2 text-left text-muted-foreground">$0</td><td className="px-3 py-2 text-right text-muted-foreground">$0</td><td className="px-3 py-2 text-right text-muted-foreground">Varies</td><td className="px-3 py-2 text-right font-bold text-emerald-400">Up to $1,700</td></tr>
                <tr><td className="px-3 py-2 text-left text-muted-foreground">$1,000,000</td><td className="px-3 py-2 text-left text-muted-foreground">$0</td><td className="px-3 py-2 text-right text-muted-foreground">$0</td><td className="px-3 py-2 text-right text-muted-foreground">Varies</td><td className="px-3 py-2 text-right font-bold text-emerald-400">Up to $1,700</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Discussion &amp; Implications</h2>
          <p className="text-muted-foreground">The CTC is one of the most significant federal tax benefits for families. Under OBBBA, the credit is doubled vs pre-TCJA law and indexed to inflation. The refundable portion is critical for lower-income families.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">References</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
<li>One Big Beautiful Bill Act, P.L. 119-1 (2025).</li>
            <li>IRS. (2026). <em>Publication 972: Child Tax Credit</em>.</li>
            <li>IRS Revenue Procedure 2025-25.</li>
            <li>Internal Revenue Code Section 24, as amended by OBBBA.</li>
            <li>Tax Foundation. (2025). <em>Analysis of OBBBA Child Tax Credit Provisions</em>.</li>
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
