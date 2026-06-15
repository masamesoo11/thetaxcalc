import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/site-config';
import { getAuthorForCalculator } from '@/lib/authors';
import { ShareButtons } from '@/components/finance/share-buttons';
import { LinkToUs } from '@/components/finance/link-to-us';
import { MortgageCalculatorClient } from './mortgage-calculator-client';

// ─── Static generation ──────────────────────────────────────────────────────
export const dynamic = 'force-static';
// ISR: Revalidate every 24 hours — enables Cloudflare CDN edge caching
export const revalidate = 86400;

// ─── Mortgage-only config (avoids importing the entire calculator-routes.ts) ──
const CONFIG = {
  slug: 'mortgage-calculator',
  title: 'Mortgage Calculator 2026 | Payment & Amortization',
  description: 'Free mortgage calculator with extra payments, amortization schedule, and payoff comparison. Calculate monthly payment using M = P × [r(1+r)^n] / [(1+r)^n - 1]. No sign-up.',
  h1: 'Free Mortgage Calculator',
  metaTitle: 'Mortgage Calculator 2026 | Amortization',
  metaDesc: 'Free mortgage calculator with extra payments, amortization & payoff comparison. No sign-up. Calculate monthly payment and interest.',
  keywords: [
    'free mortgage calculator', 'mortgage calculator', 'home loan calculator',
    'amortization calculator', 'mortgage payment calculator',
    'extra payment calculator', 'mortgage payoff',
    'monthly mortgage payment', 'mortgage interest calculator',
  ] as string[],
  breadcrumbLabel: 'Mortgage',
  ogTitle: 'Mortgage Calculator 2026 — Amortization & Extra Payments',
  ogDescription: 'Free mortgage calculator. Monthly payment, amortization & extra payment savings. No sign-up.',
  canonicalPath: '/mortgage-calculator',
} as const;

// ─── Mortgage-only content (avoids importing _content.ts with all 20 calculators) ──
const MORTGAGE_CONTENT = {
  howItWorks: [
    'Your monthly mortgage payment comes from a formula: M = P × [r(1+r)^n] / [(1+r)^n - 1]. P is the loan amount, r is the monthly rate (annual rate ÷ 12), and n is total payments (years × 12). It spits out a fixed payment that pays off every penny by the end of the term. Simple enough. What surprises people is how that payment breaks down. On a 30-year, $280,000 loan at 6.5%, your first payment is roughly 86% interest and only 14% principal. You feel like you\'re treading water. By year 15 it\'s about 50/50, and in the final years nearly everything goes to principal. My brother bought his first house in 2019 and called me panicked after seeing his first amortization statement — "I\'m basically just paying interest!" Yeah. That\'s how it works at first. Stick with it.',
    'Extra payments go 100% toward principal. Every dollar you add saves you interest for the remaining life of the loan. Adding $200/month extra on that $280K loan at 6.5% saves roughly $76,856 in interest and pays it off more than 5 years early. Compound interest working for you instead of against you, for once.',
    'We generate a full amortization schedule — month by month, principal vs interest, remaining balance. For a detailed walkthrough, check the <a href="https://www.consumerfinance.gov/consumer-tools/mortgages" target="_blank" rel="noopener noreferrer nofollow">CFPB mortgage resources</a>. Key things to keep in mind:\n- Recommended housing cost ratio: no more than 28% of gross income\n- 20% down payment avoids PMI entirely\n- Common loan terms are 15, 20, or 30 years\n- Even small extra payments make a big difference over 30 years',
  ],
  keyRates: [
    { label: 'Formula', value: 'M = P × [r(1+r)^n] / [(1+r)^n - 1]' },
    { label: 'Common Loan Terms', value: '15, 20, or 30 years' },
    { label: 'Current Avg 30-Year Rate', value: '~6.5% (varies)' },
    { label: 'Recommended Housing Ratio', value: '≤28% of gross income' },
    { label: 'Typical Down Payment', value: '20% (avoids PMI)' },
  ],
  faqs: [
    {
      question: 'How is a monthly mortgage payment calculated?',
      answer: "It's based on your loan amount, interest rate, and term length. The math formula is kinda ugly, but the concept is simple: the bank calculates a fixed monthly payment that pays off both interest and principal over the full term. Your rate divided by 12 gives the monthly rate, and the total number of payments is years times 12. Just use a mortgage calculator — nobody's doing this by hand.",
    },
    {
      question: 'How much can extra mortgage payments save?',
      answer: "It's kind of absurd how much difference a little extra makes. On a $280K loan at 6.5% over 30 years, adding $200/month extra saves you roughly $77K in interest and pays off the loan about 5 years early. Bump it to $500/month and you're saving over $140K and cutting more than a decade off the term. Every extra dollar goes straight to principal, which means less interest accruing going forward.",
    },
    {
      question: 'Should I choose a 15-year or 30-year mortgage?',
      answer: "15-year saves you a ton in interest and usually comes with a lower rate (often 0.5–1% less), but the monthly payment is significantly higher. On a $280K loan: 15-year at 5.5% is about $2,287/month with ~$132K total interest, while 30-year at 6.5% is $1,769/month with ~$357K in interest. If you can comfortably swing the higher payment, 15-year is the financial winner. But a lot of people go 30-year and just make extra payments when they can — gives you flexibility if money gets tight.",
    },
    {
      question: 'What percentage of my mortgage payment goes to interest?',
      answer: "Early on, most of it. On a 30-year $280K loan at 6.5%, your very first payment is about 86% interest and only 14% principal. It slowly flips — around year 15 you're at roughly 50/50, and by year 25 almost everything goes to principal. That's amortization for you. It's also why making extra payments in the early years has the biggest impact on your total interest costs.",
    },
    {
      question: 'How much house can I afford?',
      answer: "The old rule of thumb is the 28/36 rule: no more than 28% of gross monthly income on housing costs (mortgage + taxes + insurance), and no more than 36% on total debt. For a $75K salary, that caps your monthly housing payment around $1,750. With 20% down at 6.5%, you're looking at a home in the $250K–$280K range depending on local property taxes and insurance. But honestly, just because you can qualify for that much doesn't mean you should max it out — leave yourself some breathing room.",
    },
  ],
  relatedCalculators: [
    { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
    { slug: '401k-retirement-calculator', label: '401(k) Calculator' },
    { slug: 'relocation-calculator', label: 'Relocation Calculator' },
    { slug: 'capital-gains-calculator', label: 'Capital Gains Calculator' },
    { slug: 'self-employment-tax-calculator', label: 'Self-Employment Calculator' },
    { slug: 'salary', label: 'Salary After Tax' },
  ],
} as const;

// ─── Mortgage-only JSON-LD (avoids importing _jsonld.ts with all 20 schemas) ──
const MORTGAGE_JSONLD = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@id': `${SITE_URL}/mortgage-calculator#breadcrumb`, '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Mortgage Calculator' },
    ]},
    { '@id': `${SITE_URL}/mortgage-calculator#webpage`, '@type': 'WebPage', name: 'Mortgage Calculator with Extra Payments', description: 'Free mortgage calculator with extra payments, amortization schedule, and payoff comparison for 2026.', url: `${SITE_URL}/mortgage-calculator`, inLanguage: 'en-US', dateModified: '2026-01-15', author: { '@id': `${SITE_URL}/mortgage-calculator#author` }, reviewedBy: { '@id': `${SITE_URL}/mortgage-calculator#author` }, publisher: { '@id': `${SITE_URL}/#organization` }, breadcrumb: { '@id': `${SITE_URL}/mortgage-calculator#breadcrumb` } },
    { '@id': `${SITE_URL}/mortgage-calculator#webapp`, '@type': 'SoftwareApplication', name: 'Mortgage Calculator with Extra Payments', url: `${SITE_URL}/mortgage-calculator`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' }, author: { '@id': `${SITE_URL}/mortgage-calculator#author` }, publisher: { '@id': `${SITE_URL}/#organization` } },
    {
      '@id': `${SITE_URL}/mortgage-calculator#faq`,
      '@type': 'FAQPage',
      mainEntity: MORTGAGE_CONTENT.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ],
};

// ─── Related blog posts (hardcoded to avoid importing blog-index.ts) ────────
const RELATED_POSTS = [
  {
    slug: '2026-federal-tax-brackets-explained',
    title: '2026 Federal Tax Brackets Explained',
    excerpt: 'Complete guide to the 2026 federal income tax brackets, standard deductions, and how to calculate your effective tax rate.',
  },
];

// ─── Next Steps ─────────────────────────────────────────────────────────────
const NEXT_STEPS = [
  { href: '/paycheck-calculator', icon: '\u{1F4B5}', title: 'Paycheck Calculator', description: 'See if you can afford the monthly payment' },
  { href: '/401k-retirement-calculator', icon: '\u{1F3E6}', title: '401(k) Planner', description: 'Balance mortgage vs retirement savings' },
  { href: '/relocation-calculator', icon: '\u{1F3E0}', title: 'Relocation Calculator', description: 'Compare housing costs across states' },
  { href: '/capital-gains-calculator', icon: '\u{1F4C8}', title: 'Capital Gains Tax', description: 'Tax on selling your previous home' },
];

// ─── Metadata ───────────────────────────────────────────────────────────────
export async function generateMetadata(): Promise<Metadata> {
  const author = getAuthorForCalculator('mortgage');
  return {
    title: { absolute: CONFIG.metaTitle },
    description: CONFIG.metaDesc,
    keywords: CONFIG.keywords,
    authors: [{ name: author.name, url: `${SITE_URL}/about#${author.id}` }],
    alternates: {
      canonical: `${SITE_URL}${CONFIG.canonicalPath}`,
    },
    openGraph: {
      title: CONFIG.ogTitle,
      description: CONFIG.ogDescription,
      url: `${SITE_URL}${CONFIG.canonicalPath}`,
      siteName: 'TheTaxCalc',
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: `${SITE_URL}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: CONFIG.ogTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: CONFIG.ogTitle,
      description: CONFIG.ogDescription,
      images: [`${SITE_URL}/opengraph-image.png`],
    },
  };
}

// ─── Page Component ─────────────────────────────────────────────────────────
export default async function MortgageCalculatorPage() {
  const author = getAuthorForCalculator('mortgage');

  // Add author Person schema to JSON-LD with @id for proper deduplication
  const jsonLdWithAuthor = {
    ...MORTGAGE_JSONLD,
    '@graph': [
      ...MORTGAGE_JSONLD['@graph'],
      {
        '@id': `${SITE_URL}/mortgage-calculator#author`,
        '@type': 'Person',
        name: author.name,
        jobTitle: `${author.title}, ${author.credentials}`,
        url: `${SITE_URL}/about#${author.id}`,
        description: author.bio,
        knowsAbout: author.knowsAbout,
        sameAs: author.sameAs,
        worksFor: { '@type': 'Organization', name: 'TheTaxCalc', url: SITE_URL },
        ...(author.image ? { image: author.image } : {}),
      },
    ],
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWithAuthor) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <span className="text-muted-foreground" aria-hidden="true">/</span>
        <span className="text-foreground font-medium">{CONFIG.breadcrumbLabel}</span>
      </nav>

      {/* Share Buttons */}
      <div className="mb-4 flex justify-center">
        <ShareButtons
          url={`${SITE_URL}${CONFIG.canonicalPath}`}
          title={CONFIG.title}
          description={CONFIG.metaDesc}
        />
      </div>

      {/* H1 */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {CONFIG.h1}
        </h1>
        <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
          {CONFIG.description}
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Last reviewed: January 2026 · By {author.name}, {author.credentials} · Tax data verified against IRS Publication 15-T &amp; state revenue departments
        </p>
      </div>

      {/* Client-Side Calculator — Direct import (no 20-calculator switch) */}
      <MortgageCalculatorClient />

      {/* Next Steps */}
      <section className="mt-8 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6 sm:p-8">
        <h3 className="text-lg font-semibold text-foreground mb-3">
          More {CONFIG.h1} Tools &amp; Resources
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {NEXT_STEPS.map((step) => (
            <Link
              key={step.href}
              href={step.href}
              className="flex items-start gap-2 rounded-lg p-2 hover:bg-emerald-500/10 transition-colors"
            >
              <span>{step.icon}</span>
              <div>
                <span className="text-sm font-medium text-foreground">{step.title}</span>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Server-Rendered Content for SEO */}
      <div className="mt-12 space-y-10">
        {/* How This Calculator Works */}
        <section className="rounded-xl border border-border/30 bg-card/50 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            How the {CONFIG.h1} Works
          </h2>
          <div className="space-y-4">
            {MORTGAGE_CONTENT.howItWorks.map((paragraph, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: paragraph.replace(/\n/g, '<br/>') }} />
            ))}
          </div>
        </section>

        {/* Key Rates & Data */}
        {MORTGAGE_CONTENT.keyRates.length > 0 && (
          <section className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {CONFIG.h1} — Key Rates & Data for 2026
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {MORTGAGE_CONTENT.keyRates.map((rate) => (
                <div
                  key={rate.label}
                  className="rounded-lg border border-border/30 bg-card/60 p-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    {rate.label}
                  </p>
                  <p className="text-base font-bold text-foreground">
                    {rate.value}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Frequently Asked Questions */}
        {MORTGAGE_CONTENT.faqs.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Mortgage Calculator FAQ
            </h2>
            <div className="space-y-3">
              {MORTGAGE_CONTENT.faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-border/30 bg-card/50 overflow-hidden"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-3 p-5 text-left font-medium text-foreground hover:bg-muted/10 transition-colors">
                    <h3 className="text-sm sm:text-base">{faq.question}</h3>
                    <svg
                      className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Related Articles */}
        {RELATED_POSTS.length > 0 && (
          <section className="rounded-xl border border-border/30 bg-card/50 p-6 sm:p-8">
            <p className="text-lg font-semibold text-foreground mb-4">
              Related Articles
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {RELATED_POSTS.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group rounded-lg border border-border/30 bg-card/60 p-4 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all"
                >
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-emerald-400 transition-colors mb-1">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related Calculators */}
        {MORTGAGE_CONTENT.relatedCalculators.length > 0 && (
          <section className="rounded-xl border border-border/30 bg-card/50 p-6 sm:p-8">
            <p className="text-lg font-semibold text-foreground mb-4">
              Related Calculators
            </p>
            <div className="flex flex-wrap gap-3">
              {MORTGAGE_CONTENT.relatedCalculators.map((calc) => (
                <Link
                  key={calc.slug}
                  href={`/${calc.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/5 px-4 py-2 text-sm font-medium text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/50 transition-all"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  {calc.label}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Link to Us */}
        <div className="mt-8">
          <LinkToUs
            url={`${SITE_URL}${CONFIG.canonicalPath}`}
            title={CONFIG.title}
            slug={CONFIG.slug}
          />
        </div>

        {/* Next Steps */}
        <section className="rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-600/5 to-teal-600/5 p-6 sm:p-8">
          <p className="text-lg font-semibold text-foreground mb-4">
            Next Steps
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/salary" className="group flex items-start gap-3 rounded-lg border border-border/50 p-4 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all">
              <span className="text-lg">💰</span>
              <div>
                <span className="text-sm font-medium text-foreground group-hover:text-emerald-400 transition-colors">Salary After Tax</span>
                <p className="text-xs text-muted-foreground mt-0.5">See take-home pay for $30K–$500K across all 50 states</p>
              </div>
            </Link>
            <Link href="/compare" className="group flex items-start gap-3 rounded-lg border border-border/50 p-4 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all">
              <span className="text-lg">📊</span>
              <div>
                <span className="text-sm font-medium text-foreground group-hover:text-emerald-400 transition-colors">Compare States</span>
                <p className="text-xs text-muted-foreground mt-0.5">Side-by-side tax comparison for any two states</p>
              </div>
            </Link>
            <Link href="/relocation-calculator" className="group flex items-start gap-3 rounded-lg border border-border/50 p-4 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all">
              <span className="text-lg">🏠</span>
              <div>
                <span className="text-sm font-medium text-foreground group-hover:text-emerald-400 transition-colors">Relocation Calculator</span>
                <p className="text-xs text-muted-foreground mt-0.5">Salary you&apos;d need if you move to another state</p>
              </div>
            </Link>
            <Link href="/401k-retirement-calculator" className="group flex items-start gap-3 rounded-lg border border-border/50 p-4 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all">
              <span className="text-lg">📈</span>
              <div>
                <span className="text-sm font-medium text-foreground group-hover:text-emerald-400 transition-colors">401(k) Calculator</span>
                <p className="text-xs text-muted-foreground mt-0.5">Project your retirement savings with compound growth</p>
              </div>
            </Link>
            <Link href="/glossary" className="group flex items-start gap-3 rounded-lg border border-border/50 p-4 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all">
              <span className="text-lg">📖</span>
              <div>
                <span className="text-sm font-medium text-foreground group-hover:text-emerald-400 transition-colors">Tax Glossary</span>
                <p className="text-xs text-muted-foreground mt-0.5">Key tax terms explained in plain English</p>
              </div>
            </Link>
            <Link href="/federal-tax-brackets" className="group flex items-start gap-3 rounded-lg border border-border/50 p-4 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all">
              <span className="text-lg">📋</span>
              <div>
                <span className="text-sm font-medium text-foreground group-hover:text-emerald-400 transition-colors">Tax Brackets 2026</span>
                <p className="text-xs text-muted-foreground mt-0.5">Full federal bracket breakdown with examples</p>
              </div>
            </Link>
          </div>
        </section>

        {/* Link & Embed */}
        <section className="rounded-xl border border-border/30 bg-card/50 p-6 sm:p-8">
          <p className="text-lg font-semibold text-foreground mb-4">
            Link to This Calculator
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Want to reference this tool on your website or blog? Copy the HTML below — no attribution required, but appreciated.
          </p>
          <div className="space-y-3">
            <div className="rounded-lg bg-muted/30 p-3">
              <p className="text-xs font-mono text-muted-foreground break-all">
                {`<a href="${SITE_URL}${CONFIG.canonicalPath}" title="${CONFIG.h1}">${CONFIG.h1} — TheTaxCalc</a>`}
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              Want to <Link href="/widgets" className="text-emerald-400 hover:text-emerald-300 underline">embed this calculator on your site</Link>? We offer free embeddable widgets for all our tools.
            </p>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/widgets"
                className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/5 px-3 py-1.5 text-sm font-medium text-emerald-400 hover:bg-emerald-500/10 transition-all"
              >
                📎 Free Embed Widgets
              </Link>
              <Link
                href="/tax-data"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border/50 px-3 py-1.5 text-sm text-muted-foreground hover:text-emerald-400 hover:border-emerald-500/30 transition-all"
              >
                📊 Tax Data & Rates
              </Link>
            </div>
          </div>
        </section>

        {/* Explore More Tools */}
        <section className="rounded-xl border border-border/30 bg-card/50 p-6 sm:p-8">
          <p className="text-lg font-semibold text-foreground mb-4">
            Explore More Tools
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <Link href="/compare" className="flex items-center gap-2 rounded-lg border border-border/50 p-3 hover:bg-accent/50 transition-colors">
              <span className="text-sm font-medium">📊 Compare States</span>
              <span className="text-xs text-muted-foreground">Side-by-side tax comparison</span>
            </Link>
            <Link href="/salary" className="flex items-center gap-2 rounded-lg border border-border/50 p-3 hover:bg-accent/50 transition-colors">
              <span className="text-sm font-medium">💰 Salary After Tax</span>
              <span className="text-xs text-muted-foreground">Take-home for $30K–$500K</span>
            </Link>
            <Link href="/federal-tax-brackets" className="flex items-center gap-2 rounded-lg border border-border/50 p-3 hover:bg-accent/50 transition-colors">
              <span className="text-sm font-medium">📋 Tax Brackets 2026</span>
              <span className="text-xs text-muted-foreground">Federal brackets & rates</span>
            </Link>
            <Link href="/glossary" className="flex items-center gap-2 rounded-lg border border-border/50 p-3 hover:bg-accent/50 transition-colors">
              <span className="text-sm font-medium">📖 Tax Glossary</span>
              <span className="text-xs text-muted-foreground">Key terms explained</span>
            </Link>
            <Link href="/blog" className="flex items-center gap-2 rounded-lg border border-border/50 p-3 hover:bg-accent/50 transition-colors">
              <span className="text-sm font-medium">📝 Tax Guides & Blog</span>
              <span className="text-xs text-muted-foreground">Expert tax tips & guides</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
