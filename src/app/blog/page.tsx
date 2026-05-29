import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/blog-db';
import { BlogListClient } from './blog-list-client';
import { Breadcrumb } from '@/components/finance/breadcrumb';
import { SITE_URL } from '@/lib/site-config';

// Edge runtime for Cloudflare Pages compatibility
export const runtime = 'edge';

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Tax Blog — Guides, Tips & News | TheTaxCalc',
  description: 'Expert tax guides, state-by-state comparisons, and financial tips to help you keep more of your money. Updated for 2026 tax laws.',
  keywords: ['tax blog', 'tax tips', 'tax guide', 'tax news', 'state tax comparison', 'tax planning', 'financial tips'],
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

// ─── Helpers ──────────────────────────────────────────────────────────────────

const CATEGORY_LABELS: Record<string, string> = { 'tax-guide': 'Tax Guide', comparison: 'Comparison', tips: 'Tips', news: 'News' };
const CATEGORY_COLORS: Record<string, string> = {
  'tax-guide': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-300 dark:border-emerald-500/30',
  comparison: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-500/20 dark:text-cyan-400 border-cyan-300 dark:border-cyan-500/30',
  tips: 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-400 border-amber-300 dark:border-amber-500/30',
  news: 'bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-400 border-rose-300 dark:border-rose-500/30',
};

function formatDate(dateStr: string): string {
  try { return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }); }
  catch { return dateStr; }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogPage() {
  let posts;
  try {
    posts = await getAllPosts();
  } catch (error) {
    console.error('Blog page: Failed to load posts:', error);
    posts = [];
  }

  const featuredPosts = posts.filter((p) => p.featured);
  const regularPosts = posts.filter((p) => !p.featured);

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'Blog',
    name: 'TheTaxCalc Blog', description: 'Expert tax guides, state-by-state comparisons, and financial tips from TheTaxCalc.',
    url: `${SITE_URL}/blog`, publisher: { '@type': 'Organization', name: 'TheTaxCalc', url: SITE_URL },
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

      {posts.length > 0 && (
        <div className="mb-8 space-y-8">
          {featuredPosts.length > 0 && (
            <section>
              <h2 className="mb-4 text-lg font-semibold text-foreground">Featured Articles</h2>
              <div className="grid gap-6 lg:grid-cols-2">
                {featuredPosts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="group block rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm transition-all hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5">
                    <article className="p-6 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${CATEGORY_COLORS[post.category] || 'bg-muted text-muted-foreground border-border'}`}>
                          {CATEGORY_LABELS[post.category] || post.category}
                        </span>
                        <span className="inline-flex items-center rounded-full border border-amber-300 bg-amber-100 px-2.5 py-0.5 text-[10px] font-medium text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/20 dark:text-amber-400">Featured</span>
                      </div>
                      <h3 className="text-xl font-bold leading-tight text-foreground group-hover:text-emerald-400 transition-colors">{post.title}</h3>
                      {post.excerpt && <p className="text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>}
                      <div className="flex items-center gap-3 pt-1 text-xs text-muted-foreground">
                        <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400 group-hover:gap-2 transition-all">Read more →</span>
                    </article>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section>
            {featuredPosts.length > 0 && <h2 className="mb-4 text-lg font-semibold text-foreground">Latest Articles</h2>}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {regularPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group block rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm transition-all hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5">
                  <article className="p-4 space-y-2">
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${CATEGORY_COLORS[post.category] || 'bg-muted text-muted-foreground border-border'}`}>
                      {CATEGORY_LABELS[post.category] || post.category}
                    </span>
                    <h3 className="text-base font-bold leading-tight text-foreground group-hover:text-emerald-400 transition-colors">{post.title}</h3>
                    {post.excerpt && <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">{post.excerpt}</p>}
                    <div className="flex items-center gap-3 pt-1 text-xs text-muted-foreground">
                      <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400 group-hover:gap-2 transition-all">Read more →</span>
                  </article>
                </Link>
              ))}
            </div>
          </section>

          <p className="text-center text-xs text-muted-foreground">{posts.length} article{posts.length !== 1 ? 's' : ''} published</p>
        </div>
      )}

      {posts.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">Loading articles...</p>
        </div>
      )}

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
        <h2 className="text-lg font-bold text-foreground mb-6">
          Related Tools & Resources
        </h2>
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

      <BlogListClient />
    </div>
  );
}
