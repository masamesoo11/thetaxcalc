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
  title: 'Paycheck Difference Calculator 2026 — Compare Take-Home',
  description:
    'Calculate the difference in take-home pay between two states or salaries. See how much more or less you earn after taxes by moving or changing jobs. Free 2026 calculator.',
  keywords: [
    'paycheck difference calculator',
    'take home pay difference',
    'paycheck comparison by state',
    'compare paychecks after tax',
    'how much difference does state tax make',
    'paycheck calculator state comparison',
    'net pay difference calculator',
    'take home pay by state',
  ],
  authors: [{ name: 'Rachel Mitchell, CPA' }],
  alternates: {
    canonical: `${SITE_URL}/paycheck-difference-calculator`,
  },
  openGraph: {
    title: 'Paycheck Difference Calculator 2026 — Compare Take-Home',
    description:
      'Calculate the difference in take-home pay between two states or salaries. Free 2026 calculator for all 50 states.',
    url: `${SITE_URL}/paycheck-difference-calculator`,
    siteName: 'TheTaxCalc',
    type: 'website',
    locale: 'en_US',
    images: [{ url: `${SITE_URL}/opengraph-image.png`, width: 1200, height: 630, alt: 'Paycheck Difference Calculator — TheTaxCalc' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paycheck Difference Calculator 2026 — Compare Take-Home',
    description: 'Calculate the difference in take-home pay between two states. Free for all 50 states.',
    images: [`${SITE_URL}/opengraph-image.png`],
  },
};

const defaultScenario: TaxScenario = {
  id: 'default',
  label: 'Current Paycheck',
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
    q: 'How much difference does state tax make on my paycheck?',
    a: 'It can be dramatic. If you earn $75,000, living in Texas (0% state tax) instead of California (up to 9.3% at that bracket) saves you roughly $5,000–$7,000 per year in state taxes alone. Moving from Illinois (4.95%) to Texas saves about $3,500 per year at the same salary. Our calculator shows you the exact dollar difference for any salary and state pair.',
  },
  {
    q: 'Which states have no income tax?',
    a: 'Nine states levy no personal income tax: Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, and Wyoming. New Hampshire taxes dividend and interest income but not wages. If you live in any of these states, your paycheck only shrinks due to federal tax and FICA — no state tax is withheld.',
  },
  {
    q: 'How do I compare my paycheck if I move to a different state?',
    a: 'Enter your current salary and state as the first scenario, then add a second scenario with the same salary and your new state. The calculator will show your after-tax take-home pay for both, plus the exact difference. You can also adjust the salary if the move comes with a raise or pay cut.',
  },
  {
    q: 'Does this account for local or city taxes?',
    a: 'Yes, for New York City residents. If you select New York state and enable the NYC Resident toggle, the calculator includes the city income tax (3.078%–3.876%). Most other cities do not levy local income taxes, but if they do, you would need to factor those in separately.',
  },
  {
    q: 'What about FICA — does that change by state?',
    a: 'No. FICA taxes — 6.2% for Social Security (up to the $184,500 wage base in 2026) and 1.45% for Medicare — are federal and do not vary by state. Everyone pays the same FICA regardless of where they live. The only FICA variation is the 0.9% Additional Medicare Tax on income over $200,000.',
  },
  {
    q: 'Can I see the difference in bi-weekly or monthly take-home pay?',
    a: 'Yes. The comparison table shows net take-home pay annually, monthly, and bi-weekly for each scenario. The difference column applies to each time period, so you can see exactly how much more or less each paycheck would be.',
  },
];

const author = getCalculatorAuthor();

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@id': `${SITE_URL}/paycheck-difference-calculator#software`,
      '@type': 'WebApplication',
      name: 'Paycheck Difference Calculator',
      url: `${SITE_URL}/paycheck-difference-calculator`,
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: `${SITE_URL}/paycheck-difference-calculator` },
      description: 'Calculate the difference in take-home pay between two states or salaries. Free 2026 calculator for all 50 states.',
      provider: { '@id': `${SITE_URL}/#organization` },
      author: authorToJsonLd(author),
    },
    {
      '@id': `${SITE_URL}/paycheck-difference-calculator#faq`,
      '@type': 'FAQPage',
      mainEntity: FAQ_ITEMS.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    },
    {
      '@id': `${SITE_URL}/paycheck-difference-calculator#breadcrumb`,
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Paycheck Difference Calculator' },
      ],
    },
  ],
};

export default function PaycheckDifferencePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Breadcrumb items={[{ label: 'Paycheck Difference Calculator' }]} />

      {/* Hero */}
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 text-sm text-blue-400 mb-6">
          <ArrowRightLeft className="h-3.5 w-3.5" />
          State-by-State
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Paycheck Difference{' '}
          <span className="gradient-text">Calculator</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          See exactly how much your take-home pay changes when you move states, change jobs, or adjust deductions.
          Real numbers, no guesswork.
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
            <h3 className="text-sm font-semibold text-foreground mb-1">Enter Your Paycheck</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">Input your current salary, state, and filing status as the baseline.</p>
          </div>
          <div className="text-center">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-400 font-bold text-lg mb-3">2</div>
            <h3 className="text-sm font-semibold text-foreground mb-1">Add a Comparison</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">Add another scenario with a different state, salary, or deductions.</p>
          </div>
          <div className="text-center">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-400 font-bold text-lg mb-3">3</div>
            <h3 className="text-sm font-semibold text-foreground mb-1">See the Difference</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">The difference column shows exactly how much more or less you take home.</p>
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
          How State Taxes Affect Your <span className="gradient-text">Paycheck</span>
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Your paycheck is not just your salary minus federal taxes. State income tax can take another 0% to 13.3% off the top, depending on where you live. For someone earning $75,000, that means a difference of up to $10,000 in annual take-home pay between the highest-tax and lowest-tax states. Our paycheck difference calculator lets you see the exact dollar impact of state taxes, filing status changes, and pre-tax deductions side by side, so you know precisely what you gain or lose by moving or changing your withholding.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          The gap between states is widening. California charges up to 13.3% in state income tax, Hawaii up to 11%, and Oregon up to 9.9%. Meanwhile, nine states — Texas, Florida, Washington, Nevada, Wyoming, Alaska, South Dakota, Tennessee, and New Hampshire — charge zero personal income tax on wages. If you earn $100,000 and move from California to Texas, you keep roughly $10,000 more per year without changing your salary. That is the power of state tax policy on your paycheck, and it is exactly what this calculator is designed to reveal.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          But state tax is only part of the story. Pre-tax deductions like 401(k) contributions ($23,500 limit in 2026) and HSA contributions ($4,150 for individuals) reduce your taxable income at the federal and state level. By maximizing these deductions, you can lower your effective tax rate significantly. Our calculator lets you adjust 401(k) and HSA amounts independently for each scenario, so you can model the full impact of deductions on your take-home pay across different states and salary levels.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Every calculation uses the 2026 federal tax brackets, the $16,100 standard deduction for single filers, the $184,500 Social Security wage base, and the latest published state income tax rates from all 50 state revenue departments. Whether you are comparing a move from Illinois to Texas, evaluating a raise, or simply curious how much state tax costs you, this calculator gives you accurate, instant results.
        </p>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Paycheck Difference <span className="gradient-text">FAQ</span>
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
            { href: '/job-offer-comparison-calculator', label: 'Job Offer Comparison' },
            { href: '/compare', label: 'Compare States' },
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
