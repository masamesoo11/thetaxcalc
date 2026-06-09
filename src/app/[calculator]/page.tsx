import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  SLUG_TO_CONFIG,
  getCalculatorSlugs,
} from '@/lib/calculator-routes';
import { CalculatorClientPage } from './calculator-client-page';
import { getPublishedPostsMeta } from '@/lib/blog-index';
import { SITE_URL } from '@/lib/site-config';
import { ShareButtons } from '@/components/finance/share-buttons';
import { LinkToUs } from '@/components/finance/link-to-us';
import { getJsonLdForType } from './_jsonld';
import { getCalculatorContent } from './_content';

export const dynamic = 'force-static';
export const revalidate = false;

export function generateStaticParams() {
  return getCalculatorSlugs().map((slug) => ({ calculator: slug }));
}

// ─── Per-Page Metadata ────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ calculator: string }>;
}): Promise<Metadata> {
  const { calculator } = await params;
  const config = SLUG_TO_CONFIG[calculator];

  if (!config) {
    return { title: 'Calculator Not Found' };
  }

  const baseUrl = SITE_URL;

  return {
    title: { absolute: config.metaTitle },
    description: config.metaDesc,
    keywords: config.keywords,
    authors: [{ name: 'TheTaxCalc' }],
    alternates: {
      canonical: `${baseUrl}${config.canonicalPath}`,
    },
    openGraph: {
      title: config.ogTitle,
      description: config.ogDescription,
      url: `${baseUrl}${config.canonicalPath}`,
      siteName: 'TheTaxCalc',
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: `${baseUrl}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: config.ogTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: config.ogTitle,
      description: config.ogDescription,
      images: [`${baseUrl}/opengraph-image.png`],
    },
  };
}

// ─── Related Blog Posts by Calculator Type ────────────────────────────────────

const CALCULATOR_BLOG_SLUGS: Record<string, string[]> = {
  home: ['2026-federal-tax-brackets-explained', 'how-fica-taxes-work-2026'],
  illinois: ['illinois-income-tax-guide-2026', '2026-federal-tax-brackets-explained'],
  texas: ['why-texas-has-no-income-tax', 'florida-vs-texas-tax-comparison'],
  florida: ['florida-vs-texas-tax-comparison', 'why-texas-has-no-income-tax'],
  california: ['florida-vs-texas-tax-comparison', 'how-fica-taxes-work-2026'],
  newyork: ['how-fica-taxes-work-2026', '2026-federal-tax-brackets-explained'],
  mortgage: ['2026-federal-tax-brackets-explained'],
  retirement: ['how-fica-taxes-work-2026', '2026-federal-tax-brackets-explained'],
  relocation: ['florida-vs-texas-tax-comparison', 'why-texas-has-no-income-tax'],
  'capital-gains': ['how-fica-taxes-work-2026', '2026-federal-tax-brackets-explained'],
  'self-employment': ['how-fica-taxes-work-2026'],
  'sales-tax': ['sales-tax-by-state-guide-2026', 'florida-vs-texas-tax-comparison'],
  overtime: ['2026-federal-tax-brackets-explained', 'how-fica-taxes-work-2026'],
  georgia: ['2026-federal-tax-brackets-explained', 'florida-vs-texas-tax-comparison'],
  lottery: ['2026-federal-tax-brackets-explained', 'how-fica-taxes-work-2026'],
  'irs-withholding': ['2026-federal-tax-brackets-explained', 'how-fica-taxes-work-2026'],
  'property-tax': ['florida-vs-texas-tax-comparison', '2026-federal-tax-brackets-explained'],
  'bonus-tax': ['2026-federal-tax-brackets-explained', 'how-fica-taxes-work-2026'],
  virginia: ['2026-federal-tax-brackets-explained', 'florida-vs-texas-tax-comparison'],
};

// ─── Helper: Other States for Comparison ──────────────────────────────────────

function getOtherStates(currentState: string) {
  const states = [
    { slug: 'illinois-tax-calculator', name: 'Illinois', rate: '4.95%', key: 'illinois' },
    { slug: 'texas-tax-calculator', name: 'Texas', rate: '0%', key: 'texas' },
    { slug: 'florida-tax-calculator', name: 'Florida', rate: '0%', key: 'florida' },
    { slug: 'california-tax-calculator', name: 'California', rate: '1%–13.3%', key: 'california' },
    { slug: 'new-york-tax-calculator', name: 'New York', rate: '4%–10.9%', key: 'newyork' },
  ];
  return states.filter(s => s.key !== currentState);
}

// ─── Helper: FAQ Heading per Calculator Type ───────────────────────────────────

function getFaqHeading(type: string): string {
  switch (type) {
    case 'home': return 'Paycheck Calculator FAQ';
    case 'illinois': return 'Illinois Tax Calculator FAQ';
    case 'texas': return 'Texas Tax Calculator FAQ';
    case 'florida': return 'Florida Tax Calculator FAQ';
    case 'california': return 'California Tax Calculator FAQ';
    case 'newyork': return 'New York Tax Calculator FAQ';
    case 'mortgage': return 'Mortgage Calculator FAQ';
    case 'retirement': return '401(k) Retirement Calculator FAQ';
    case 'relocation': return 'Relocation Calculator FAQ';
    case 'capital-gains': return 'Capital Gains Tax FAQ';
    case 'self-employment': return 'Self-Employment Tax FAQ';
    case 'tax-refund': return 'Tax Refund Calculator FAQ';
    case 'sales-tax': return 'Sales Tax Calculator FAQ';
    case 'overtime': return 'Overtime Tax Calculator FAQ';
    case 'georgia': return 'Georgia Tax Calculator FAQ';
    case 'lottery': return 'Lottery Tax Calculator FAQ';
    case 'irs-withholding': return 'IRS Withholding Calculator FAQ';
    case 'property-tax': return 'Property Tax Calculator FAQ';
    case 'bonus-tax': return 'Bonus Tax Calculator FAQ';
    case 'virginia': return 'Virginia Tax Calculator FAQ';
    case 'income-tax': return 'Income Tax Calculator FAQ';
    case 'tax-calc': return 'Tax Calculator FAQ';
    default: return 'Frequently Asked Questions';
  }
}

// ─── Helper: Next Steps CTA Links ─────────────────────────────────────────────

function getNextSteps(type: string): { href: string; icon: string; title: string; description: string }[] {
  switch (type) {
    case 'home':
    case 'illinois':
    case 'texas':
    case 'florida':
    case 'california':
    case 'newyork':
      return [
        { href: '/401k-retirement-calculator', icon: '\u{1F3E6}', title: '401(k) Planner', description: 'Reduce taxable income with pre-tax contributions' },
        { href: '/compare', icon: '\u{1F4CA}', title: 'Compare States', description: 'See how your take-home compares across states' },
        { href: '/self-employment-tax-calculator', icon: '\u{1F4BC}', title: 'Self-Employment Tax', description: 'Freelancer? Calculate your SE tax' },
        { href: '/salary', icon: '\u{1F4B0}', title: 'Salary After Tax', description: 'Take-home pay for every salary level' },
      ];
    case 'mortgage':
      return [
        { href: '/paycheck-calculator', icon: '\u{1F4B5}', title: 'Paycheck Calculator', description: 'See if you can afford the monthly payment' },
        { href: '/401k-retirement-calculator', icon: '\u{1F3E6}', title: '401(k) Planner', description: 'Balance mortgage vs retirement savings' },
        { href: '/relocation-calculator', icon: '\u{1F3E0}', title: 'Relocation Calculator', description: 'Compare housing costs across states' },
        { href: '/capital-gains-calculator', icon: '\u{1F4C8}', title: 'Capital Gains Tax', description: 'Tax on selling your previous home' },
      ];
    case 'retirement':
      return [
        { href: '/paycheck-calculator', icon: '\u{1F4B5}', title: 'Paycheck Calculator', description: 'See how 401(k) contributions affect take-home' },
        { href: '/capital-gains-calculator', icon: '\u{1F4C8}', title: 'Capital Gains Tax', description: 'Tax implications of investment gains' },
        { href: '/mortgage-calculator', icon: '\u{1F3E0}', title: 'Mortgage Calculator', description: 'Will your home be paid off by retirement?' },
        { href: '/federal-tax-brackets', icon: '\u{1F4CB}', title: 'Tax Brackets 2026', description: 'Understand your marginal rate in retirement' },
      ];
    case 'capital-gains':
      return [
        { href: '/paycheck-calculator', icon: '\u{1F4B5}', title: 'Paycheck Calculator', description: 'Your ordinary income affects capital gains rates' },
        { href: '/401k-retirement-calculator', icon: '\u{1F3E6}', title: '401(k) Planner', description: 'Tax-deferred growth vs taxable gains' },
        { href: '/self-employment-tax-calculator', icon: '\u{1F4BC}', title: 'Self-Employment Tax', description: 'SE income + capital gains = higher rates?' },
        { href: '/glossary', icon: '\u{1F4D6}', title: 'Tax Glossary', description: 'Key terms: NIIT, cost basis, holding period' },
      ];
    case 'self-employment':
      return [
        { href: '/paycheck-calculator', icon: '\u{1F4B5}', title: 'Paycheck Calculator', description: 'Compare W-2 vs 1099 take-home pay' },
        { href: '/401k-retirement-calculator', icon: '\u{1F3E6}', title: 'Solo 401(k) Planner', description: 'Reduce SE tax with retirement contributions' },
        { href: '/capital-gains-calculator', icon: '\u{1F4C8}', title: 'Capital Gains Tax', description: 'Investment income on top of SE income' },
        { href: '/blog', icon: '\u{1F4DD}', title: 'Tax Guides', description: 'Deductions, quarterly payments, and more' },
      ];
    case 'tax-refund':
      return [
        { href: '/paycheck-calculator', icon: '\u{1F4B5}', title: 'Paycheck Calculator', description: 'See how withholding affects your take-home' },
        { href: '/401k-retirement-calculator', icon: '\u{1F3E6}', title: '401(k) Planner', description: 'Reduce your tax bill with pre-tax contributions' },
        { href: '/self-employment-tax-calculator', icon: '\u{1F4BC}', title: 'Self-Employment Tax', description: 'Estimate SE tax and quarterly payments' },
        { href: '/capital-gains-calculator', icon: '\u{1F4C8}', title: 'Capital Gains Tax', description: 'Investment gains can affect your refund' },
      ];
    case 'sales-tax':
      return [
        { href: '/paycheck-calculator', icon: '\u{1F4B5}', title: 'Paycheck Calculator', description: 'Income tax vs sales tax breakdown' },
        { href: '/compare', icon: '\u{1F4CA}', title: 'Compare States', description: 'Full tax comparison across states' },
        { href: '/relocation-calculator', icon: '\u{1F3E0}', title: 'Relocation Calculator', description: 'Sales tax factors into cost of living' },
        { href: '/glossary', icon: '\u{1F4D6}', title: 'Tax Glossary', description: 'Key sales tax terms explained' },
      ];
    case 'overtime':
      return [
        { href: '/paycheck-calculator', icon: '\u{1F4B5}', title: 'Paycheck Calculator', description: 'Full take-home pay breakdown' },
        { href: '/bonus-tax-calculator', icon: '\u{1F4B0}', title: 'Bonus Tax Calculator', description: 'Another type of supplemental pay' },
        { href: '/irs-withholding-calculator', icon: '\u{1F4CB}', title: 'IRS Withholding', description: 'Adjust W-4 for OT income' },
        { href: '/salary', icon: '\u{1F4C8}', title: 'Salary After Tax', description: 'Take-home pay at every level' },
      ];
    case 'georgia':
      return [
        { href: '/paycheck-calculator', icon: '\u{1F4B5}', title: 'Paycheck Calculator', description: 'Full take-home pay breakdown' },
        { href: '/virginia-tax-calculator', icon: '\u{1F3E0}', title: 'Virginia Calculator', description: 'Compare VA 2%–5.75% vs GA 5.49%' },
        { href: '/relocation-calculator', icon: '\u{1F4CA}', title: 'Relocation Calculator', description: 'Compare GA to other states' },
        { href: '/salary', icon: '\u{1F4B0}', title: 'Salary After Tax', description: 'Take-home pay at every level' },
      ];
    case 'lottery':
      return [
        { href: '/paycheck-calculator', icon: '\u{1F4B5}', title: 'Paycheck Calculator', description: 'Your regular income tax rate matters' },
        { href: '/capital-gains-calculator', icon: '\u{1F4C8}', title: 'Capital Gains Tax', description: 'Tax on investment income' },
        { href: '/tax-refund-calculator', icon: '\u{1F4CB}', title: 'Tax Refund Calculator', description: 'Will you owe or get a refund?' },
        { href: '/irs-withholding-calculator', icon: '\u{1F3E6}', title: 'IRS Withholding', description: 'Adjust withholding after big win' },
      ];
    case 'irs-withholding':
      return [
        { href: '/paycheck-calculator', icon: '\u{1F4B5}', title: 'Paycheck Calculator', description: 'See how withholding affects take-home' },
        { href: '/tax-refund-calculator', icon: '\u{1F4CB}', title: 'Tax Refund Calculator', description: 'Will you owe or get a refund?' },
        { href: '/overtime-tax-calculator', icon: '\u{1F4BC}', title: 'Overtime Tax', description: 'OT can change your withholding needs' },
        { href: '/bonus-tax-calculator', icon: '\u{1F4B0}', title: 'Bonus Tax', description: 'Bonus withholding is different' },
      ];
    case 'property-tax':
      return [
        { href: '/mortgage-calculator', icon: '\u{1F3E0}', title: 'Mortgage Calculator', description: 'Property tax is part of your payment' },
        { href: '/texas-tax-calculator', icon: '\u{1F4B5}', title: 'Texas Calculator', description: 'High property tax, no income tax' },
        { href: '/florida-tax-calculator', icon: '\u{1F3E0}', title: 'Florida Calculator', description: 'Low property tax, homestead exemption' },
        { href: '/relocation-calculator', icon: '\u{1F4CA}', title: 'Relocation Calculator', description: 'Property tax varies by state' },
      ];
    case 'bonus-tax':
      return [
        { href: '/paycheck-calculator', icon: '\u{1F4B5}', title: 'Paycheck Calculator', description: 'Full take-home pay breakdown' },
        { href: '/overtime-tax-calculator', icon: '\u{1F4BC}', title: 'Overtime Tax', description: 'Another supplemental income type' },
        { href: '/irs-withholding-calculator', icon: '\u{1F4CB}', title: 'IRS Withholding', description: 'Adjust W-4 for bonus income' },
        { href: '/tax-refund-calculator', icon: '\u{1F3E6}', title: 'Tax Refund Calculator', description: 'Will bonus affect your refund?' },
      ];
    case 'virginia':
      return [
        { href: '/paycheck-calculator', icon: '\u{1F4B5}', title: 'Paycheck Calculator', description: 'Full take-home pay breakdown' },
        { href: '/georgia-tax-calculator', icon: '\u{1F3E0}', title: 'Georgia Calculator', description: 'Compare GA 5.49% vs VA 2%–5.75%' },
        { href: '/relocation-calculator', icon: '\u{1F4CA}', title: 'Relocation Calculator', description: 'Compare VA to other states' },
        { href: '/salary', icon: '\u{1F4B0}', title: 'Salary After Tax', description: 'Take-home pay at every level' },
      ];
    case 'relocation':
      return [
        { href: '/paycheck-calculator', icon: '\u{1F4B5}', title: 'Paycheck Calculator', description: 'Full breakdown for any state' },
        { href: '/compare', icon: '\u{1F4CA}', title: 'State Comparison', description: 'Side-by-side tax comparison' },
        { href: '/mortgage-calculator', icon: '\u{1F3E0}', title: 'Mortgage Calculator', description: 'Housing costs in your new state' },
        { href: '/salary', icon: '\u{1F4B0}', title: 'Salary After Tax', description: 'Take-home for every salary level' },
      ];
    default:
      return [
        { href: '/compare', icon: '\u{1F4CA}', title: 'Compare States', description: 'Side-by-side tax comparison' },
        { href: '/salary', icon: '\u{1F4B0}', title: 'Salary After Tax', description: 'Take-home pay by salary level' },
        { href: '/glossary', icon: '\u{1F4D6}', title: 'Tax Glossary', description: 'Key tax terms explained' },
        { href: '/blog', icon: '\u{1F4DD}', title: 'Tax Guides', description: 'Expert tips and guides' },
      ];
  }
}

// ─── Server Component Page ────────────────────────────────────────────────────

export default async function CalculatorPage({
  params,
}: {
  params: Promise<{ calculator: string }>;
}) {
  const { calculator } = await params;
  const config = SLUG_TO_CONFIG[calculator];

  if (!config) {
    notFound();
  }

  const jsonLd = getJsonLdForType(config.jsonLdType);
  const content = getCalculatorContent(config.jsonLdType);

  // Fetch related blog posts from static data (no async DB call)
  const blogSlugs = CALCULATOR_BLOG_SLUGS[config.jsonLdType] ?? [];
  const relatedPosts = getPublishedPostsMeta()
    .filter((p) => blogSlugs.includes(p.slug))
    .map((p) => ({ slug: p.slug, title: p.title, excerpt: p.excerpt || null }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* JSON-LD Structured Data — Server Rendered */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb — Semantic HTML for SEO */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <span className="text-muted-foreground/50">/</span>
        <span className="text-foreground font-medium">{config.breadcrumbLabel}</span>
      </nav>

      {/* Share Buttons — Social signals for SEO */}
      <div className="mb-4 flex justify-center">
        <ShareButtons
          url={`${SITE_URL}${config.canonicalPath}`}
          title={config.title}
          description={config.metaDesc}
        />
      </div>

      {/* H1 — Semantic for SEO */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {config.h1}
        </h1>
        <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
          {config.description}
        </p>
        {/* E-E-A-T: Last reviewed date */}
        <p className="mt-2 text-xs text-muted-foreground/60">
          Last reviewed: January 2026 · Tax data verified against IRS Publication 15-T &amp; state revenue departments
        </p>
      </div>

      {/* Client-Side Calculator */}
      <CalculatorClientPage componentKey={config.componentKey} />

      {/* Next Steps */}
      <section className="mt-8 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6 sm:p-8">
        <h3 className="text-lg font-semibold text-foreground mb-3">
          More {config.h1} Tools &amp; Resources
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {getNextSteps(config.componentKey).map((step) => (
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

      {/* ─── Server-Rendered Content for SEO ───────────────────────────────── */}
      <div className="mt-12 space-y-10">
        {/* How This Calculator Works */}
        <section className="rounded-xl border border-border/30 bg-card/50 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            How the {config.h1} Works
          </h2>
          <div className="space-y-4">
            {content.howItWorks.map((paragraph, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: paragraph.replace(/\n/g, '<br/>') }} />
            ))}
          </div>
        </section>

        {/* Key Rates & Data */}
        {content.keyRates.length > 0 && (
          <section className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {config.h1} — Key Rates & Data for 2026
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {content.keyRates.map((rate) => (
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
        {content.faqs.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {getFaqHeading(config.componentKey)}
            </h2>
            <div className="space-y-3">
              {content.faqs.map((faq, i) => (
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
        {relatedPosts.length > 0 && (
          <section className="rounded-xl border border-border/30 bg-card/50 p-6 sm:p-8">
            <p className="text-lg font-semibold text-foreground mb-4">
              Related Articles
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((post) => (
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
        {content.relatedCalculators.length > 0 && (
          <section className="rounded-xl border border-border/30 bg-card/50 p-6 sm:p-8">
            <p className="text-lg font-semibold text-foreground mb-4">
              Related Calculators
            </p>
            <div className="flex flex-wrap gap-3">
              {content.relatedCalculators.map((calc) => (
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

        {/* Link to Us — Encourage backlinks for DA */}
        <div className="mt-8">
          <LinkToUs
            url={`${SITE_URL}${config.canonicalPath}`}
            title={config.title}
            slug={config.slug}
          />
        </div>

        {/* Compare with Other States */}
        {['illinois', 'texas', 'florida', 'california', 'newyork'].includes(config.componentKey) && (
          <section className="rounded-xl border border-border/30 bg-card/50 p-6 sm:p-8">
            <p className="text-lg font-semibold text-foreground mb-4">
              Compare with Other States
            </p>
            <div className="flex flex-wrap gap-2">
              {getOtherStates(config.componentKey).map((state) => (
                <Link
                  key={state.slug}
                  href={`/${state.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border/50 px-3 py-1.5 text-sm hover:bg-accent/50 transition-colors"
                >
                  {state.name}
                  <span className="text-xs text-muted-foreground">({state.rate})</span>
                </Link>
              ))}
              <Link
                href="/compare"
                className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/5 px-3 py-1.5 text-sm font-medium text-emerald-400 hover:bg-emerald-500/10 transition-colors"
              >
                All State Comparisons →
              </Link>
            </div>
          </section>
        )}

        {/* Next Steps — contextual CTAs linking to salary and other tools */}
        <section className="rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-600/5 to-teal-600/5 p-6 sm:p-8">
          <p className="text-lg font-semibold text-foreground mb-4">
            Next Steps
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/salary" className="group flex items-start gap-3 rounded-lg border border-border/50 p-4 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all">
              <span className="text-lg">💰</span>
              <div>
                <span className="text-sm font-medium text-foreground group-hover:text-emerald-400 transition-colors">Salary After Tax</span>
                <p className="text-xs text-muted-foreground mt-0.5">See take-home pay for $30K–$500K across all 5 states</p>
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

        {/* Link & Embed — Earns backlinks for Domain Authority */}
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
                {`<a href="${SITE_URL}${config.canonicalPath}" title="${config.h1}">${config.h1} — TheTaxCalc</a>`}
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
                href="/resources"
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
