import { Metadata } from 'next';
import {
  ArrowRightLeft,
  ChevronDown,
} from 'lucide-react';
import Link from 'next/link';
import { Breadcrumb } from '@/components/finance/breadcrumb';
import { ScenarioComparison, type TaxScenario } from '@/components/finance/scenario-comparison';
import { SITE_URL } from '@/lib/site-config';
import { getCalculatorAuthor, authorToJsonLd } from '@/lib/authors';
import { AuthorBioCard } from '@/components/finance/author-bio-card';

export const metadata: Metadata = {
  title: 'Free Job Offer Comparison Calculator 2026 | Compare After-Tax Pay',
  description:
    'Compare two or more job offers after federal, state, and FICA taxes. See which offer gives you more take-home pay based on salary, state, and benefits. Free 2026 calculator.',
  keywords: [
    'job offer comparison calculator',
    'compare job offers after tax',
    'which job pays more after tax',
    'job offer calculator by state',
    'compare two job offers',
    'job salary comparison tool',
    'after tax job offer comparison',
    'relocation salary calculator',
  ],
  authors: [{ name: 'Rachel Mitchell, CPA' }],
  alternates: {
    canonical: `${SITE_URL}/job-offer-comparison-calculator`,
    /job-offer-comparison-calculator`,
      'x-default': `${SITE_URL}/job-offer-comparison-calculator`,
    },
  },
  openGraph: {
    title: 'Free Job Offer Comparison Calculator 2026 | Compare After-Tax Pay',
    description:
      'Compare job offers after federal, state, and FICA taxes side by side. See which offer gives you more take-home pay. Free for all 50 states.',
    url: `${SITE_URL}/job-offer-comparison-calculator`,
    siteName: 'TheTaxCalc',
    type: 'website',
    locale: 'en_US',
    images: [{ url: `${SITE_URL}/opengraph-image.png`, width: 1200, height: 630, alt: 'Job Offer Comparison Calculator — TheTaxCalc' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Job Offer Comparison Calculator 2026 | Compare After-Tax Pay',
    description: 'Compare job offers after federal, state, and FICA taxes side by side. Free for all 50 states.',
    images: [`${SITE_URL}/opengraph-image.png`],
  },
};

const defaultScenario: TaxScenario = {
  id: 'default',
  label: 'Offer A',
  salary: 70000,
  payFrequency: 'annual',
  stateKey: 'texas',
  filingStatus: 'single',
  retirement401k: 0,
  hsaContribution: 0,
  nycResident: false,
};

const FAQ_ITEMS = [
  {
    q: 'How do I compare two job offers with different salaries and states?',
    a: 'Enter each job offer as a separate scenario — input the salary, state, and filing status. The calculator will compute after-tax take-home pay for each offer side by side. The difference column shows exactly how much more or less you would take home with each option, so you can make an informed decision based on real numbers, not gross salary alone.',
  },
  {
    q: 'Should I factor in cost of living when comparing job offers?',
    a: 'Absolutely. This calculator shows you the after-tax take-home pay, but cost of living can vary dramatically between cities. A $90,000 offer in New York City may give you less purchasing power than a $70,000 offer in Austin, Texas, even after taxes. Use our calculator to get the after-tax numbers, then compare those against local rent, groceries, and transportation costs for a complete picture.',
  },
  {
    q: 'How do 401(k) matches affect my job offer comparison?',
    a: 'If one employer offers a 401(k) match, enter your contribution amount in the 401(k) field for that scenario. Pre-tax 401(k) contributions reduce your taxable income, which means lower federal and state taxes — and the employer match is essentially free money on top. A $70,000 salary with a 5% match can outperform a $75,000 salary with no match after taxes.',
  },
  {
    q: 'Does state income tax really make that much difference?',
    a: 'Yes — it can mean thousands of dollars per year. California charges up to 13.3% state income tax, New York up to 10.9% (plus NYC tax), while Texas, Florida, and Washington charge 0%. For a $100,000 salary, moving from California to Texas saves you roughly $10,000+ in state taxes alone. Our calculator shows you the exact difference for any salary and state combination.',
  },
  {
    q: 'Can I compare offers in states with different local taxes?',
    a: 'Yes. If you are considering a job in New York City, enable the NYC Resident toggle to include the city income tax (3.078%–3.876%). This gives you a more accurate comparison against offers in states or cities without local income taxes.',
  },
  {
    q: 'Is this calculator updated for 2026 tax law?',
    a: 'Yes. All federal tax brackets, the $16,100 standard deduction for single filers, the $184,500 Social Security wage base, Medicare rates, and state income tax rates are current for the 2026 tax year. We update the calculator as soon as new figures are published by the IRS and state revenue departments.',
  },
];

const author = getCalculatorAuthor();

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@id': `${SITE_URL}/job-offer-comparison-calculator#software`,
      '@type': 'SoftwareApplication',
      name: 'Job Offer Comparison Calculator',
      url: `${SITE_URL}/job-offer-comparison-calculator`,
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
      description: 'Compare job offers after federal, state, and FICA taxes side by side for all 50 states. Free 2026 calculator.',
      provider: { '@id': `${SITE_URL}/#organization` },
      author: authorToJsonLd(author),
    },
    {
      '@id': `${SITE_URL}/job-offer-comparison-calculator#faq`,
      '@type': 'FAQPage',
      mainEntity: FAQ_ITEMS.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    },
    {
      '@id': `${SITE_URL}/job-offer-comparison-calculator#breadcrumb`,
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Job Offer Comparison Calculator' },
      ],
    },
  ],
};

export default function JobOfferComparisonPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Breadcrumb items={[{ label: 'Job Offer Comparison Calculator' }]} />

      {/* Hero */}
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 text-sm text-blue-400 mb-6">
          <ArrowRightLeft className="h-3.5 w-3.5" />
          Offer vs. Offer
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Job Offer Comparison{' '}
          <span className="gradient-text">Calculator</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          Compare job offers after taxes, benefits, and deductions. Know which offer truly pays more before you decide.
        </p>
      </div>

      {/* How It Works */}
      <section className="mb-10 rounded-xl border border-border/30 bg-card/50 p-8">
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
          How It <span className="gradient-text">Works</span>
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="text-center">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-400 font-bold text-lg mb-3">1</div>
            <h3 className="text-sm font-semibold text-foreground mb-1">Enter Each Offer</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">Input salary, state, and benefits for up to 4 job offers.</p>
          </div>
          <div className="text-center">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-400 font-bold text-lg mb-3">2</div>
            <h3 className="text-sm font-semibold text-foreground mb-1">See After-Tax Pay</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">Each offer is calculated with federal, FICA, and state taxes applied.</p>
          </div>
          <div className="text-center">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-400 font-bold text-lg mb-3">3</div>
            <h3 className="text-sm font-semibold text-foreground mb-1">Choose Wisely</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">The difference column reveals which offer gives you more real take-home pay.</p>
          </div>
        </div>
      </section>

      {/* Interactive Comparison */}
      <section className="mb-10">
        <ScenarioComparison defaultScenario={defaultScenario} />
      </section>

      {/* SEO Content */}
      <section className="mb-10 space-y-6">
        <h2 className="text-2xl font-bold text-foreground">
          Comparing Job Offers After <span className="gradient-text">Taxes</span>
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Choosing between job offers is one of the most consequential financial decisions you will make — and most people make it based on the wrong number. A $90,000 offer in New York City sounds better than a $70,000 offer in Dallas, but after federal taxes, FICA, New York state income tax (up to 10.9%), and the NYC resident tax (3.078%–3.876%), the Dallas offer could leave you with more money in your pocket. Our job offer comparison calculator gives you the real, after-tax numbers for up to four offers simultaneously, so you never have to guess which job pays more.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Relocation decisions compound the problem. Moving from a no-income-tax state like Texas or Florida to a high-tax state like California or New York can cost you $8,000–$15,000 per year in state taxes alone, depending on your salary. But the reverse move can be equally transformative — a $10,000 raise in California might net you only $6,000 after taxes, while a lateral move to Texas with the same salary puts thousands more in your bank account. This calculator breaks down every tax — federal, FICA, state, and even city — so you can see the true financial impact of each offer before you sign.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Total compensation is more than just base salary. One offer might include a 401(k) match worth 5% of your salary, an HSA-eligible health plan, or a signing bonus. Our calculator lets you enter 401(k) and HSA contributions for each scenario independently, so you can model the tax savings of pre-tax deductions. A $75,000 salary with a 5% 401(k) match effectively gives you $3,750 in tax-advantaged retirement savings that a $78,000 salary with no match cannot replicate. When you compare offers holistically — salary, state taxes, benefits — the right choice becomes clear.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Our calculator uses 2026 federal tax brackets (7%, 10%, 12%, 22%, 24%, 32%, 35%, 37%), the $16,100 standard deduction for single filers, the $184,500 Social Security wage base, and current state income tax rates from all 50 state revenue departments. Whether you are comparing offers across the street or across the country, you get accurate, up-to-date after-tax figures instantly.
        </p>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Job Offer Comparison <span className="gradient-text">FAQ</span>
        </h2>
        <div className="space-y-3">
          {FAQ_ITEMS.map((faq, i) => (
            <details key={i} className="group rounded-xl border border-border/30 bg-card/50 overflow-hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-3 p-5 text-left font-medium text-foreground hover:bg-muted/10 transition-colors">
                <h3 className="text-sm sm:text-base">{faq.q}</h3>
                <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{faq.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* Related Calculators */}
      <section className="mb-10 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center">
        <h2 className="text-xl font-bold text-foreground mb-4">Related Calculators</h2>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {[
            { href: '/paycheck-calculator', label: 'Paycheck Calculator' },
            { href: '/salary-comparison-calculator', label: 'Salary Comparison' },
            { href: '/paycheck-difference-calculator', label: 'Paycheck Difference' },
            { href: '/relocation-calculator', label: 'Relocation Calculator' },
            { href: '/compare', label: 'Compare States' },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="inline-flex items-center gap-1.5 rounded-lg border border-border/50 bg-card/50 px-4 py-2 text-sm text-muted-foreground hover:border-emerald-500/30 hover:text-emerald-400 transition-all">
              {link.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Author */}
      <section className="py-12 border-t border-border/20">
        <AuthorBioCard authorId="rachel-mitchell" />
      </section>
    </div>
  );
}
