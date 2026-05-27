import { Metadata } from 'next';
import Link from 'next/link';
import { db } from '@/lib/db';
import { BlogListClient } from './blog-list-client';
import { Breadcrumb } from '@/components/finance/breadcrumb';
import { SITE_URL } from '@/lib/site-config';

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Tax Blog — Guides, Tips & News | TaxYield.io',
  description:
    'Expert tax guides, state-by-state comparisons, and financial tips to help you keep more of your money. Updated for 2026 tax laws.',
  keywords: [
    'tax blog', 'tax tips', 'tax guide', 'tax news',
    'state tax comparison', 'tax planning', 'financial tips',
  ],
  alternates: {
    canonical: `${SITE_URL}/blog`,
    languages: {
      'en-US': `${SITE_URL}/blog`,
      'x-default': `${SITE_URL}/blog`,
    },
  },
  openGraph: {
    title: 'TaxYield Blog — Expert Tax Guides & Tips',
    description: 'Expert tax guides, state-by-state comparisons, and financial tips for 2026.',
    url: `${SITE_URL}/blog`,
    siteName: 'TaxYield.io',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'TaxYield Blog — Expert Tax Guides & Tips',
      },
    ],
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const CATEGORY_LABELS: Record<string, string> = {
  'tax-guide': 'Tax Guide',
  comparison: 'Comparison',
  tips: 'Tips',
  news: 'News',
};

const CATEGORY_COLORS: Record<string, string> = {
  'tax-guide': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-300 dark:border-emerald-500/30',
  comparison: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-500/20 dark:text-cyan-400 border-cyan-300 dark:border-cyan-500/30',
  tips: 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-400 border-amber-300 dark:border-amber-500/30',
  news: 'bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-400 border-rose-300 dark:border-rose-500/30',
};

function formatDate(date: Date): string {
  try {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return String(date);
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogPage() {
  // Fetch published posts server-side for SEO
  let posts: Array<{
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    category: string;
    createdAt: Date;
    featured: boolean;
  }> = [];

  try {
    posts = await db.post.findMany({
      where: { published: true },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        category: true,
        createdAt: true,
        featured: true,
      },
      orderBy: [
        { featured: 'desc' },
        { createdAt: 'desc' },
      ],
    });
  } catch {
    // DB not available — posts will be empty
  }

  const featuredPosts = posts.filter((p) => p.featured);
  const regularPosts = posts.filter((p) => !p.featured);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'TaxYield Blog',
    description: 'Expert tax guides, state-by-state comparisons, and financial tips from TaxYield.io.',
    url: `${SITE_URL}/blog`,
    publisher: {
      '@type': 'Organization',
      name: 'TaxYield.io',
      url: SITE_URL,
    },
  };

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'TaxYield Blog — Tax Guides, Tips & News',
    description: 'Expert tax guides, state-by-state comparisons, and financial tips from TaxYield.io.',
    numberOfItems: posts.length,
    itemListElement: posts.slice(0, 10).map((post, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/blog/${post.slug}`,
      name: post.title,
    })),
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <Breadcrumb items={[{ label: 'Blog' }]} />

      {/* ─── Server-Rendered H1 & Intro ────────────────────── */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Let&apos;s Talk <span className="text-emerald-400">Taxes</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Look, taxes are confusing. We&apos;ve stared at our own pay stubs and thought &ldquo;wait, they
          took <em>how</em> much?&rdquo; That&apos;s exactly why we write these articles — to make sense of the
          stuff the IRS makes complicated on purpose. State income tax got you down? Wondering if
          you&apos;d save a fortune by moving to Florida or Texas? We break it all down without the
          jargon. Updated for 2026, because yeah, the rules keep changing.
        </p>
      </div>

      {/* ─── Server-Rendered Blog Post Cards (SEO-visible) ── */}
      {posts.length > 0 && (
        <div className="mb-8 space-y-8">
          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <section>
              <h2 className="mb-4 text-lg font-semibold text-foreground">Featured Articles</h2>
              <div className="grid gap-6 lg:grid-cols-2">
                {featuredPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group block rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm transition-all hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5"
                  >
                    <article className="p-6 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${CATEGORY_COLORS[post.category] || 'bg-muted text-muted-foreground border-border'}`}>
                          {CATEGORY_LABELS[post.category] || post.category}
                        </span>
                        <span className="inline-flex items-center rounded-full border border-amber-300 bg-amber-100 px-2.5 py-0.5 text-[10px] font-medium text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/20 dark:text-amber-400">
                          Featured
                        </span>
                      </div>
                      <h3 className="text-xl font-bold leading-tight text-foreground group-hover:text-emerald-400 transition-colors">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="flex items-center gap-3 pt-1 text-xs text-muted-foreground">
                        <time dateTime={post.createdAt.toISOString()}>
                          {formatDate(post.createdAt)}
                        </time>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400 group-hover:gap-2 transition-all">
                        Read more →
                      </span>
                    </article>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Regular Posts Grid */}
          <section>
            {featuredPosts.length > 0 && (
              <h2 className="mb-4 text-lg font-semibold text-foreground">Latest Articles</h2>
            )}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {regularPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group block rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm transition-all hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5"
                >
                  <article className="p-4 space-y-2">
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${CATEGORY_COLORS[post.category] || 'bg-muted text-muted-foreground border-border'}`}>
                      {CATEGORY_LABELS[post.category] || post.category}
                    </span>
                    <h3 className="text-base font-bold leading-tight text-foreground group-hover:text-emerald-400 transition-colors">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-3 pt-1 text-xs text-muted-foreground">
                      <time dateTime={post.createdAt.toISOString()}>
                        {formatDate(post.createdAt)}
                      </time>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400 group-hover:gap-2 transition-all">
                      Read more →
                    </span>
                  </article>
                </Link>
              ))}
            </div>
          </section>

          {/* Post count */}
          <p className="text-center text-xs text-muted-foreground">
            {posts.length} article{posts.length !== 1 ? 's' : ''} published
          </p>
        </div>
      )}

      {/* ─── Editorial: Why Read Our Blog ──────────────────── */}
      <section className="mx-auto mt-12 max-w-3xl border-t border-border/50 pt-10">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Why read this blog?
        </h2>
        <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            Because nobody wakes up excited to read about tax brackets. We know. But here&apos;s the
            thing — ignoring taxes doesn&apos;t make them go away. It just makes April a lot more
            stressful than it needs to be.
          </p>
          <p>
            We&apos;re not a faceless finance conglomerate. We&apos;re real people who got tired of tax
            articles that read like IRS instruction manuals. Our promise: plain English, honest
            opinions, and zero condescension. If a deduction is overhyped, we&apos;ll say so. If a
            &ldquo;tax-friendly&rdquo; state isn&apos;t all it&apos;s cracked up to be, we&apos;ll tell you that too.
          </p>
          <p>
            We cover the stuff that actually matters — how much you&apos;ll really take home in
            different states, whether that &ldquo;huge&rdquo; deduction is worth the paperwork, and which
            &ldquo;tips&rdquo; are just clickbait. We update everything for 2026 tax laws, because
            stale advice isn&apos;t advice at all.
          </p>
          <p className="font-medium text-foreground">
            Short version: we do the homework so you don&apos;t have to. Your wallet will thank you.
          </p>
        </div>
      </section>

      {/* ─── Client Component for Interactive Search/Filter ── */}
      <BlogListClient />
    </div>
  );
}
