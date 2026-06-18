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
  title: 'Free Salary Comparison Calculator 2026 | Compare After-Tax Pay by State',
  description:
    'Compare salaries after federal, state, and FICA taxes side by side. See which salary or job offer gives you more take-home pay. Free 2026 calculator for all 50 states.',
  keywords: [
    'salary comparison calculator',
    'compare salary after tax',
    'salary difference calculator',
    'after tax salary comparison',
    'compare take home pay',
    'salary comparison by state',
    'which salary is better after tax',
    'net pay comparison',
  ],
  authors: [{ name: 'Rachel Mitchell, CPA' }],
  alternates: {
    canonical: `${SITE_URL}/salary-comparison-calculator`,
  },
  openGraph: {
    title: 'Free Salary Comparison Calculator 2026 | Compare After-Tax Pay',
    description:
      'Compare salaries after federal, state, and FICA taxes side by side. See which salary gives you more take-home pay. Free for all 50 states.',
    url: `${SITE_URL}/salary-comparison-calculator`,
    siteName: 'TheTaxCalc',
    type: 'website',
    locale: 'en_US',
    images: [{ url: `${SITE_URL}/opengraph-image.png`, width: 1200, height: 630, alt: 'Salary Comparison Calculator — TheTaxCalc' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Salary Comparison Calculator 2026 | Compare After-Tax Pay',
    description: 'Compare salaries after federal, state, and FICA taxes side by side. Free for all 50 states.',
    images: [`${SITE_URL}/opengraph-image.png`],
  },
};

const defaultScenario: TaxScenario = {
  id: 'default',
  label: 'Current Salary',
  salary: 75000,
  payFrequency: 'annual',
  stateKey: 'illinois',
  filingStatus: 'single',
  retirement401k: 0,
  hsaContribution: 0,
  nycResident: false,
};

const FAQ_ITEMS = [
  {
    q: 'How do I compare salaries in different states?',
    a: 'Enter each salary and select the corresponding state. The calculator will show you the after-tax take-home pay for each scenario side by side, including federal tax, FICA (Social Security and Medicare), and state income tax. The difference column highlights exactly how much more or less you would take home.',
  },
  {
    q: 'Why is the after-tax difference bigger than the salary difference?',
    a: 'State income tax rates vary dramatically — from 0% in Texas, Florida, and Washington to over 13% in California. A $10,000 salary increase in California might result in only $6,000 more after taxes, while the same $10,000 increase in Texas gives you nearly $7,700 more. This calculator shows you the real, after-tax value of any salary difference.',
  },
  {
    q: 'Does this include FICA taxes (Social Security and Medicare)?',
    a: 'Yes. Every scenario includes the full 6.2% Social Security tax (up to the 2026 wage base of $184,500) and 1.45% Medicare tax, plus the 0.9% Additional Medicare Tax for incomes over $200,000. These are the same regardless of state, but they reduce your take-home pay significantly.',
  },
  {
    q: 'Can I compare job offers with different benefits?',
    a: 'Yes. You can adjust 401(k) contributions and HSA contributions for each scenario. If one job offers a 5% 401(k) match and another does not, enter the contribution amounts to see how pre-tax deductions affect your net take-home pay.',
  },
  {
    q: 'Is this calculator accurate for 2026?',
    a: 'Yes. All federal tax brackets, standard deductions, FICA rates, and state tax rates are updated for the 2026 tax year. The 2026 Social Security wage base is $184,500, the standard deduction is $16,100 for single filers, and state rates reflect the latest published figures from each state revenue department.',
  },
];

const author = getCalculatorAuthor();

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@id': `${SITE_URL}/salary-comparison-calculator#software`,
      '@type': 'SoftwareApplication',
      name: 'Salary Comparison Calculator',
      url: `${SITE_URL}/salary-comparison-calculator`,
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
      description: 'Compare salaries after federal, state, and FICA taxes side by side for all 50 states. Free 2026 calculator.',
      provider: { '@id': `${SITE_URL}/#organization` },
      author: authorToJsonLd(author),
    },
    {
      '@id': `${SITE_URL}/salary-comparison-calculator#faq`,
      '@type': 'FAQPage',
      mainEntity: FAQ_ITEMS.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    },
    {
      '@id': `${SITE_URL}/salary-comparison-calculator#breadcrumb`,
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Salary Comparison Calculator' },
      ],
    },
  ],
};

export default function SalaryComparisonPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Breadcrumb items={[{ label: 'Salary Comparison Calculator' }]} />

      {/* Hero */}
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 text-sm text-blue-400 mb-6">
          <ArrowRightLeft className="h-3.5 w-3.5" />
          Side-by-Side Comparison
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Salary Comparison{' '}
          <span className="gradient-text">Calculator</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          Compare after-tax salaries across different states, filing statuses, and deduction levels.
          See which salary actually puts more money in your pocket.
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
            <h3 className="text-sm font-semibold text-foreground mb-1">Enter Each Salary</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">Input up to 4 salaries with their states and filing statuses.</p>
          </div>
          <div className="text-center">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-400 font-bold text-lg mb-3">2</div>
            <h3 className="text-sm font-semibold text-foreground mb-1">See After-Tax Results</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">The calculator shows net take-home pay for each scenario side by side.</p>
          </div>
          <div className="text-center">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-400 font-bold text-lg mb-3">3</div>
            <h3 className="text-sm font-semibold text-foreground mb-1">Compare & Decide</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">The difference column reveals which salary gives you more after-tax income.</p>
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
          Why After-Tax Salary <span className="gradient-text">Comparison Matters</span>
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          A $100,000 salary in California is not the same as a $100,000 salary in Texas — not even close. After federal taxes, FICA deductions, and state income tax, the Texas earner takes home roughly $7,000 to $10,000 more per year. When you are evaluating job offers, negotiating a raise, or considering relocation, the gross salary number alone is misleading. You need to see the after-tax, take-home pay to make an informed decision. Our salary comparison calculator shows you exactly what each salary means in real dollars, accounting for the 2026 federal tax brackets, the Social Security wage base of $184,500, Medicare taxes, and state-specific income tax rates for all 50 states.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          State income taxes are the biggest variable in any salary comparison. Nine states levy zero personal income tax — Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, and Wyoming — which means every dollar you earn above the federal threshold stays in your pocket. On the other end, California charges up to 13.3%, Hawaii up to 11%, and New York up to 10.9% (plus New York City tax if you live in the five boroughs). For someone earning $120,000, moving from California to Texas can mean an extra $12,000+ in annual take-home pay, even with the same salary. This is the kind of insight that a salary comparison calculator provides instantly — no spreadsheets, no guesswork.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Beyond state taxes, the calculator also accounts for pre-tax deductions like 401(k) contributions and HSA contributions. A $90,000 salary with a 10% 401(k) match might outperform a $95,000 salary with no retirement benefits after you factor in the tax savings. Each scenario in our side-by-side comparison can have its own 401(k) and HSA amounts, so you can compare total compensation packages, not just base salary. The difference column highlights exactly how much more or less each scenario yields, making it easy to see which offer is truly better for your financial situation.
        </p>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Salary Comparison <span className="gradient-text">FAQ</span>
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
            { href: '/job-offer-comparison-calculator', label: 'Job Offer Comparison' },
            { href: '/paycheck-difference-calculator', label: 'Paycheck Difference' },
            { href: '/compare', label: 'Compare State Taxes' },
            { href: '/salary', label: 'Salary After Tax' },
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
