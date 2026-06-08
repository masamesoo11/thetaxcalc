import { Metadata } from 'next';
import Link from 'next/link';
import { getPublishedPostsMeta, type BlogPostMeta } from '@/lib/blog-index';
import { BlogFilterClient } from './blog-filter-client';
import { Breadcrumb } from '@/components/finance/breadcrumb';
import { SITE_URL } from '@/lib/site-config';
import { getCalculatorAuthor, authorToJsonLd } from '@/lib/authors';



// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Tax Blog — 2026 Guides, Tips & News',
  description: 'Expert tax guides, state comparisons, and financial tips updated for 2026. Clear explanations and free calculators to help you keep more of your money.',
  keywords: ['tax blog', 'tax tips', 'tax guide', 'tax news', 'state tax comparison', 'tax planning', 'financial tips'],
  authors: [{ name: 'Rachel Mitchell, CPA' }],
  alternates: {
    canonical: `${SITE_URL}/blog`,
    languages: { 'en-US': `${SITE_URL}/blog`, 'x-default': `${SITE_URL}/blog` },
  },
  openGraph: {
    title: 'TheTaxCalc Blog — Expert Tax Guides & Tips',
    description: 'Expert tax guides, state-by-state comparisons, and financial tips for 2026.',
    url: `${SITE_URL}/blog`,
    siteName: 'TheTaxCalc',
    type: 'website',
    images: [{ url: `${SITE_URL}/opengraph-image.png`, width: 1200, height: 630, alt: 'TheTaxCalc Blog — Expert Tax Guides & Tips' }],
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogPage() {
  let posts: BlogPostMeta[] = [];
  try {
    posts = getPublishedPostsMeta();
  } catch {
    // Fallback: if blog index fails, render empty state
    posts = [];
  }

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'Blog',
    name: 'TheTaxCalc Blog', description: 'Expert tax guides, state-by-state comparisons, and financial tips from TheTaxCalc.',
    url: `${SITE_URL}/blog`, publisher: { '@type': 'Organization', name: 'TheTaxCalc', url: SITE_URL },
    author: authorToJsonLd(getCalculatorAuthor()),
  };

  const itemListJsonLd = {
    '@context': 'https://schema.org', '@type': 'ItemList',
    name: 'TheTaxCalc Blog — Tax Guides, Tips & News',
    description: 'Expert tax guides, state-by-state comparisons, and financial tips from TheTaxCalc.',
    numberOfItems: posts.length,
    itemListElement: posts.slice(0, 10).map((post, i) => ({
      '@type': 'ListItem', position: i + 1, url: `${SITE_URL}/blog/${post.slug}`, name: post.title,
    })),
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />

      <Breadcrumb items={[{ label: 'Blog' }]} />

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Let&apos;s Talk <span className="text-emerald-400">Taxes</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Look, taxes are confusing. We&apos;ve stared at our own pay stubs and thought &ldquo;wait, they
          took <em>how</em> much?&rdquo; That&apos;s exactly why we write these articles — to make sense of the
          stuff the IRS makes complicated on purpose. Updated for 2026, because yeah, the rules keep changing.
        </p>
      </div>

      {/* Client-side filterable blog list using server-provided data (no API call) */}
      <BlogFilterClient posts={posts} />

      <section className="mx-auto mt-12 max-w-3xl border-t border-border/50 pt-10">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Why read this blog?</h2>
        <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>Because nobody wakes up excited to read about tax brackets. We know. But here&apos;s the thing — ignoring taxes doesn&apos;t make them go away. It just makes April a lot more stressful than it needs to be.</p>
          <p>We&apos;re not a faceless finance conglomerate. We&apos;re real people who got tired of tax articles that read like IRS instruction manuals. Our promise: plain English, honest opinions, and zero condescension.</p>
          <p>We cover the stuff that actually matters — how much you&apos;ll really take home in different states, whether that &ldquo;huge&rdquo; deduction is worth the paperwork, and which &ldquo;tips&rdquo; are just clickbait. We update everything for 2026 tax laws, because stale advice isn&apos;t advice at all.</p>
          <p className="font-medium text-foreground">Short version: we do the homework so you don&apos;t have to. Your wallet will thank you.</p>
        </div>
      </section>

      {/* Internal Links: Calculator CTA */}
      <section className="mt-12 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6">
        <h2 className="text-xl font-bold text-foreground mb-2">Use Our Free Tax Calculators</h2>
        <p className="text-sm text-muted-foreground mb-4">Our blog explains the rules. Our calculators show you the numbers.</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/paycheck-calculator" className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors">Paycheck Calculator</Link>
          <Link href="/illinois-tax-calculator" className="inline-flex items-center gap-1.5 rounded-lg border border-border/50 px-4 py-2 text-sm font-medium text-foreground hover:border-emerald-500/30 transition-colors">IL Calculator</Link>
          <Link href="/texas-tax-calculator" className="inline-flex items-center gap-1.5 rounded-lg border border-border/50 px-4 py-2 text-sm font-medium text-foreground hover:border-emerald-500/30 transition-colors">TX Calculator</Link>
          <Link href="/florida-tax-calculator" className="inline-flex items-center gap-1.5 rounded-lg border border-border/50 px-4 py-2 text-sm font-medium text-foreground hover:border-emerald-500/30 transition-colors">FL Calculator</Link>
          <Link href="/california-tax-calculator" className="inline-flex items-center gap-1.5 rounded-lg border border-border/50 px-4 py-2 text-sm font-medium text-foreground hover:border-emerald-500/30 transition-colors">CA Calculator</Link>
          <Link href="/self-employment-tax-calculator" className="inline-flex items-center gap-1.5 rounded-lg border border-border/50 px-4 py-2 text-sm font-medium text-foreground hover:border-emerald-500/30 transition-colors">Self-Employment</Link>
          <Link href="/relocation-calculator" className="inline-flex items-center gap-1.5 rounded-lg border border-border/50 px-4 py-2 text-sm font-medium text-foreground hover:border-emerald-500/30 transition-colors">Compare States</Link>
          <Link href="/salary" className="inline-flex items-center gap-1.5 rounded-lg border border-border/50 px-4 py-2 text-sm font-medium text-foreground hover:border-emerald-500/30 transition-colors">Salary After Tax</Link>
        </div>
      </section>

      {/* Related Tools & Resources */}
      <section className="mt-12 border-t border-border/20 pt-10">
        <h2 className="text-lg font-bold text-foreground mb-6">Tax Blog Resources</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Calculators */}
          <div className="rounded-xl border border-border/30 bg-card/50 p-5">
            <h3 className="text-base font-semibold text-foreground mb-3">Tax Calculators</h3>
            <div className="space-y-2">
              {[
                { href: '/paycheck-calculator', label: 'Paycheck Calculator' },
                { href: '/mortgage-calculator', label: 'Mortgage Calculator' },
                { href: '/401k-retirement-calculator', label: '401(k) Retirement Calculator' },
                { href: '/capital-gains-calculator', label: 'Capital Gains Calculator' },
                { href: '/self-employment-tax-calculator', label: 'Self-Employment Tax' },
                { href: '/relocation-calculator', label: 'Relocation Calculator' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-emerald-400 transition-colors"
                >
                  <span className="h-1 w-1 rounded-full bg-emerald-500/40 shrink-0 group-hover:bg-emerald-400 transition-colors" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* State Calculators */}
          <div className="rounded-xl border border-border/30 bg-card/50 p-5">
            <h3 className="text-base font-semibold text-foreground mb-3">State Tax Calculators</h3>
            <div className="space-y-2">
              {[
                { href: '/illinois-tax-calculator', label: 'Illinois (4.95% flat)' },
                { href: '/texas-tax-calculator', label: 'Texas (0% income tax)' },
                { href: '/florida-tax-calculator', label: 'Florida (0% income tax)' },
                { href: '/california-tax-calculator', label: 'California (1%–13.3%)' },
                { href: '/new-york-tax-calculator', label: 'New York (4%–10.9%)' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-emerald-400 transition-colors"
                >
                  <span className="h-1 w-1 rounded-full bg-emerald-500/40 shrink-0 group-hover:bg-emerald-400 transition-colors" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Salary & Guides */}
          <div className="rounded-xl border border-border/30 bg-card/50 p-5">
            <h3 className="text-base font-semibold text-foreground mb-3">Salary & Guides</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { href: '/salary/50000', label: '$50K' },
                { href: '/salary/75000', label: '$75K' },
                { href: '/salary/100000', label: '$100K' },
                { href: '/salary/150000', label: '$150K' },
              ].map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="inline-flex items-center rounded-lg border border-border/50 bg-muted/20 px-3 py-1.5 text-xs font-medium text-foreground hover:border-emerald-500/30 hover:text-emerald-400 transition-all"
                >
                  {s.label}
                </Link>
              ))}
            </div>
            <div className="mt-3 space-y-2">
              <Link href="/salary" className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-emerald-400 transition-colors">
                <span className="h-1 w-1 rounded-full bg-emerald-500/40 shrink-0 group-hover:bg-emerald-400 transition-colors" />
                All Salary Levels
              </Link>
              <Link href="/federal-tax-brackets" className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-emerald-400 transition-colors">
                <span className="h-1 w-1 rounded-full bg-emerald-500/40 shrink-0 group-hover:bg-emerald-400 transition-colors" />
                2026 Federal Tax Brackets
              </Link>
              <Link href="/compare" className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-emerald-400 transition-colors">
                <span className="h-1 w-1 rounded-full bg-emerald-500/40 shrink-0 group-hover:bg-emerald-400 transition-colors" />
                Compare State Taxes
              </Link>
              <Link href="/glossary" className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-emerald-400 transition-colors">
                <span className="h-1 w-1 rounded-full bg-emerald-500/40 shrink-0 group-hover:bg-emerald-400 transition-colors" />
                Tax Glossary
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
