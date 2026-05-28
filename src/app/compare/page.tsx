import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRightLeft, ArrowRight, Zap, TrendingDown, Scale, BookOpen, ChevronDown, AlertTriangle, Home, Receipt, PiggyBank, DollarSign, Percent } from 'lucide-react';
import { getAllCompareConfigs } from '@/lib/compare-config';
import { SITE_URL } from '@/lib/site-config';

// ─── Metadata ────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'State vs State Tax Comparison — Illinois, Texas, Florida, California, New York',
  description:
    'Compare state taxes side by side: Illinois vs Texas, Florida vs California, and more. See income tax, property tax, sales tax, and take-home pay at $75K and $150K. Free 2026 state tax comparison tool.',
  keywords: [
    'state tax comparison', 'illinois vs texas taxes', 'florida vs california taxes',
    'texas vs florida taxes', 'compare state income tax', 'state tax rates comparison',
    'best state for taxes', 'lowest tax state', 'relocate for lower taxes',
  ],
  alternates: {
    canonical: `${SITE_URL}/compare`,
    languages: {
      'en-US': `${SITE_URL}/compare`,
      'x-default': `${SITE_URL}/compare`,
    },
  },
  openGraph: {
    title: 'State vs State Tax Comparison 2026 — IL, TX, FL, CA, NY',
    description:
      'Compare state taxes side by side. Income tax, property tax, sales tax, and take-home pay on $75K and $150K salaries. Free 2026 comparison tool.',
    url: `${SITE_URL}/compare`,
    siteName: 'TheTaxCalc',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'State vs State Tax Comparison 2026',
    description:
      'Compare taxes between IL, TX, FL, CA, NY. See income tax, property tax, and take-home pay side by side.',
  },
};

// ─── JSON-LD ─────────────────────────────────────────────────────────────────

const compareListingJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'State Tax Comparisons', item: `${SITE_URL}/compare` },
      ],
    },
    {
      '@type': 'CollectionPage',
      name: 'State vs State Tax Comparisons',
      description: 'Side-by-side tax comparisons for Illinois, Texas, Florida, California, and New York.',
      url: `${SITE_URL}/compare`,
      about: {
        '@type': 'Thing',
        name: 'State Income Tax Comparison',
      },
    },
  ],
};

// ─── Page Component ──────────────────────────────────────────────────────────

export default function CompareLandingPage() {
  const comparisons = getAllCompareConfigs();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(compareListingJsonLd) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
        <a href="/" className="hover:text-foreground transition-colors">Home</a>
        <span className="text-muted-foreground/50">/</span>
        <span className="text-foreground font-medium">State Tax Comparisons</span>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl bg-mesh-hero p-8 sm:p-12 mb-12 border border-border/20">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 text-sm text-emerald-400 mb-6">
            <ArrowRightLeft className="h-3.5 w-3.5" />
            10 Side-by-Side Comparisons
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            State vs State <span className="gradient-text">Tax Comparison</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            We crunched the numbers so you don&apos;t have to. Income tax, property tax, sales tax, and
            actual take-home pay — side by side for every state pair we cover. See which one keeps
            more money in your pocket at $75K and $150K salaries.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <TrendingDown className="h-4 w-4 text-emerald-400" />
              Income Tax Rates
            </span>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Scale className="h-4 w-4 text-emerald-400" />
              Property & Sales Tax
            </span>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Zap className="h-4 w-4 text-emerald-400" />
              Take-Home Pay at $75K & $150K
            </span>
          </div>
        </div>
      </section>

      {/* Comparison Cards Grid */}
      <section>
        <div className="grid gap-5 sm:grid-cols-2">
          {comparisons.map((comp) => (
            <Link
              key={comp.slug}
              href={`/compare/${comp.slug}`}
              className="group premium-card hover-lift p-6 flex flex-col gap-4"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600/20 to-teal-600/10">
                    <ArrowRightLeft className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-foreground group-hover:text-emerald-400 transition-colors">
                      {comp.state1.name} vs {comp.state2.name}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      {comp.state1.abbreviation} vs {comp.state2.abbreviation} Taxes
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
              </div>

              {/* Tax Preview */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-muted/30 p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Income Tax</p>
                  <p className="mt-1 text-sm font-medium text-foreground">{comp.state1.name}: <span className={comp.state1.incomeTaxRate === 0 ? 'text-emerald-400' : 'text-amber-400'}>{comp.state1.incomeTaxLabel}</span></p>
                  <p className="text-sm font-medium text-foreground">{comp.state2.name}: <span className={comp.state2.incomeTaxRate === 0 ? 'text-emerald-400' : 'text-amber-400'}>{comp.state2.incomeTaxLabel}</span></p>
                </div>
                <div className="rounded-lg bg-muted/30 p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Property Tax</p>
                  <p className="mt-1 text-sm font-medium text-foreground">{comp.state1.name}: <span className="text-foreground">{(comp.state1.propertyTaxRate * 100).toFixed(2)}%</span></p>
                  <p className="text-sm font-medium text-foreground">{comp.state2.name}: <span className="text-foreground">{(comp.state2.propertyTaxRate * 100).toFixed(2)}%</span></p>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-auto flex items-center gap-1.5 text-sm font-medium text-emerald-400 group-hover:gap-3 transition-all">
                View Full Comparison
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* What to Consider When Comparing State Taxes */}
      <section className="mt-12 rounded-xl border border-border/30 bg-card/50 p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
            <Scale className="h-5 w-5 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">What to Consider When Comparing State Taxes</h2>
        </div>
        <div className="text-muted-foreground leading-relaxed space-y-4">
          <p>
            Look, we get it. When someone says &ldquo;Texas has no income tax,&rdquo; your ears perk up.
            But &ldquo;no income tax&rdquo; doesn&apos;t mean &ldquo;no taxes.&rdquo; The full picture is messier
            — and more interesting — than a single rate. Here&apos;s what actually matters when you
            compare states.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-muted/20 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Percent className="h-4 w-4 text-emerald-400" />
                <h3 className="text-sm font-semibold text-foreground">Income Tax Rates</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This is the sexy number everyone talks about. And sure, 0% income tax in Texas or Florida
                can save you thousands versus California&apos;s 13.3% top rate. But it&apos;s just one piece
                of the puzzle — and sometimes a misleading one.
              </p>
            </div>
            <div className="rounded-lg bg-muted/20 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Home className="h-4 w-4 text-emerald-400" />
                <h3 className="text-sm font-semibold text-foreground">Property Tax Burden</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                States with no income tax don&apos;t just magically have lower taxes — they get their money
                somewhere else. Texas, for example, hits you with some of the highest property tax rates
                in the country (averaging ~1.71%). California&apos;s Proposition 13 caps rates much lower (~0.71%),
                but the homes cost three times as much. It&apos;s a trade-off, and whether you win or lose
                depends heavily on whether you rent or own.
              </p>
            </div>
            <div className="rounded-lg bg-muted/20 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Receipt className="h-4 w-4 text-emerald-400" />
                <h3 className="text-sm font-semibold text-foreground">Sales Tax Impact</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                You pay sales tax every day — at the grocery store, the gas pump, online. Combined
                rates vary wildly: Louisiana and Tennessee can exceed 9%, while Oregon and Montana
                have zero state sales tax. Among the states we cover, combined rates range from 7% (Florida)
                to 8.86% (Illinois). It adds up quietly.
              </p>
            </div>
            <div className="rounded-lg bg-muted/20 p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-emerald-400" />
                <h3 className="text-sm font-semibold text-foreground">Cost of Living Differences</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Here&apos;s the trap: a lower tax rate doesn&apos;t guarantee more money in your pocket if
                everything costs more. A $100,000 salary goes a lot further in Houston than in San Francisco,
                even before taxes. Housing is the big one — it can easily eat 30–50% of your take-home pay
                in high-cost cities. Always compare after-tax income against actual living costs.
              </p>
            </div>
            <div className="rounded-lg bg-muted/20 p-4">
              <div className="flex items-center gap-2 mb-2">
                <PiggyBank className="h-4 w-4 text-emerald-400" />
                <h3 className="text-sm font-semibold text-foreground">Tax Credits & Exemptions</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Don&apos;t overlook credits and exemptions. Some states are generous — child dependent
                credits, earned income credits, property tax relief, senior exemptions. A state with
                a higher headline rate but robust credits can actually leave you with a lower effective
                tax bill than a flat-rate state with barely any deductions. The devil is in the details.
              </p>
            </div>
            <div className="rounded-lg bg-muted/20 p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="h-4 w-4 text-emerald-400" />
                <h3 className="text-sm font-semibold text-foreground">Overall Tax Burden vs Take-Home</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                At the end of the day, one number matters most: your actual take-home pay after all
                taxes. Not the rate, not the bracket — the real dollars in your checking account.
                That&apos;s why our comparison pages show take-home pay at $75K and $150K. It cuts through
                the noise and gives you the bottom line.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
            <BookOpen className="h-5 w-5 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-3">
          {[
            {
              q: 'Which state has the lowest taxes?',
              a: 'Among the states we cover, Texas and Florida have no state income tax, so they win on that front. But here\'s the thing: Texas has much higher property taxes than Florida. When you factor in all taxes — income, property, and sales — Florida generally comes out ahead for most income levels. That said, Wyoming, Alaska, and Nevada (which we don\'t cover yet) rank among the lowest-tax states nationally. For the five states we do cover, Florida is usually the winner.',
            },
            {
              q: 'Should I move to a state with no income tax?',
              a: 'It depends on your full financial picture — and we mean full. States with no income tax make up the revenue elsewhere: higher property taxes, sales taxes, or fees. Texas has no income tax but hits you with some of the highest property taxes in the US. If you\'re a renter with a good salary, Texas or Florida is very attractive. If you own an expensive home, the property tax bill might offset your income tax savings. Run the numbers for your specific situation before making any decisions.',
            },
            {
              q: 'How do property taxes compare across states?',
              a: 'They vary enormously. Among our five states, Texas has the highest effective rate at roughly 1.71% of home value. Illinois isn\'t far behind at around 2.08%. California has a lower effective rate (~0.75%) thanks to Proposition 13 caps, but when homes cost $800,000+, the dollar amount is still huge. Florida and New York fall in between. Pro tip: a lower rate on a more expensive home can still cost you more in actual dollars than a higher rate on a cheaper home.',
            },
            {
              q: 'What is the total tax burden by state?',
              a: 'Total tax burden = income tax + property tax + sales tax combined. Among our five states, California and New York carry the highest total burden (often 10–13% of income for mid-to-high earners), while Texas and Florida have the lowest (roughly 6–8% depending on whether you own a home). Illinois sits in the middle — its flat income tax isn\'t terrible, but those property taxes really add up. Our comparison pages show take-home pay at $75K and $150K so you can see the real dollar impact, not just percentages.',
            },
            {
              q: 'Does a 0% income tax mean I pay no state taxes?',
              a: 'Absolutely not. Even in Texas and Florida, you\'re still paying state and local taxes — just not on your wages. Property taxes, sales taxes, fuel taxes, hotel taxes, various fees... they all add up. In fact, Texas has among the highest property tax rates in the nation, which can cost homeowners $5,000–$10,000+ per year. The 0% income tax is real and valuable, but it\'s not the whole story. That\'s why we show you the full picture on our comparison pages.',
            },
          ].map((faq, i) => (
            <details
              key={i}
              className="group rounded-xl border border-border/30 bg-card/50 overflow-hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-3 p-5 text-left font-medium text-foreground hover:bg-muted/10 transition-colors">
                <h3 className="text-sm sm:text-base">{faq.q}</h3>
                <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mt-16 rounded-2xl border border-border/30 bg-card/50 p-8 text-center">
        <h2 className="text-2xl font-bold text-foreground">
          Need a Personalized <span className="gradient-text">Salary Comparison</span>?
        </h2>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
          Our Relocation Calculator computes equivalent salaries between states, factoring in all taxes and deductions.
        </p>
        <Link
          href="/relocation-calculator"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all hover:scale-[1.02]"
        >
          <ArrowRightLeft className="h-4 w-4" />
          Try Relocation Calculator
        </Link>
      </section>
    </div>
  );
}
