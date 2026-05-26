import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/lib/db';
import { BlogDetailClient } from './blog-detail-client';

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  let post;
  try {
    post = await db.post.findUnique({
      where: { slug },
      select: { title: true, excerpt: true, metaTitle: true, metaDesc: true, tags: true, createdAt: true, updatedAt: true },
    });
  } catch {
    return { title: 'Post Not Found | TaxYield.io' };
  }

  if (!post) {
    return { title: 'Post Not Found | TaxYield.io' };
  }

  const metaTitle = post.metaTitle || `${post.title} | TaxYield.io`;
  const metaDesc = post.metaDesc || post.excerpt || `Read ${post.title} on TaxYield.io — expert tax guides and financial tips.`;

  return {
    title: metaTitle,
    description: metaDesc,
    keywords: post.tags ? post.tags.split(',').map((t) => t.trim()) : [],
    alternates: {
      canonical: `https://taxyield.io/blog/${slug}`,
      languages: {
        'en-US': `https://taxyield.io/blog/${slug}`,
        'x-default': `https://taxyield.io/blog/${slug}`,
      },
    },
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      url: `https://taxyield.io/blog/${slug}`,
      siteName: 'TaxYield.io',
      type: 'article',
      publishedTime: post.createdAt?.toISOString(),
      modifiedTime: post.updatedAt?.toISOString(),
      images: [
        {
          url: 'https://taxyield.io/opengraph-image',
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDesc,
      images: ['https://taxyield.io/opengraph-image'],
    },
  };
}

// ─── Static Params ────────────────────────────────────────────────────────────

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const posts = await db.post.findMany({
      where: { published: true },
      select: { slug: true },
    });
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

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
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return String(date);
  }
}

/**
 * Convert basic Markdown to simple HTML for server-rendered content preview.
 * Handles: ## headings, **bold**, *italic*, [links](url), `code`, paragraphs.
 * This is intentionally simple — the full ReactMarkdown rendering happens client-side.
 */
function simpleMarkdownToHtml(markdown: string): string {
  return markdown
    // Headings: ## and ###
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    // Bold: **text**
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic: *text*
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Inline code: `text`
    .replace(/`(.+?)`/g, '<code>$1</code>')
    // Links: [text](url)
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" rel="noopener noreferrer">$1</a>')
    // Paragraphs: double newlines
    .replace(/\n\n+/g, '</p><p>')
    // Single newlines within paragraphs
    .replace(/\n/g, '<br/>');
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post;
  try {
    post = await db.post.findUnique({
      where: { slug },
    });
  } catch {
    notFound();
  }

  if (!post || !post.published) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || post.metaDesc || '',
    datePublished: post.createdAt?.toISOString(),
    dateModified: post.updatedAt?.toISOString(),
    author: { '@type': 'Organization', name: 'TaxYield.io', url: 'https://taxyield.io' },
    publisher: { '@type': 'Organization', name: 'TaxYield.io', url: 'https://taxyield.io' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://taxyield.io/blog/${slug}` },
    keywords: post.tags || '',
    articleSection: CATEGORY_LABELS[post.category] || post.category,
  };

  const breadcrumbsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://taxyield.io' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://taxyield.io/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://taxyield.io/blog/${slug}` },
    ],
  };

  // Prepare server-rendered content preview (first ~800 characters of content)
  const contentPreview = post.content
    ? post.content.slice(0, 800)
    : '';
  const contentPreviewHtml = contentPreview
    ? `<p>${simpleMarkdownToHtml(contentPreview)}</p>`
    : '';

  // Parse tags for server rendering
  const tagList = post.tags
    ? post.tags.split(',').map((t) => t.trim()).filter(Boolean)
    : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />

      {/* ─── Server-Rendered Breadcrumb Navigation ──────────── */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
        <a href="/" className="hover:text-foreground transition-colors">Home</a>
        <span className="text-muted-foreground/50">/</span>
        <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
        <span className="text-muted-foreground/50">/</span>
        <span className="truncate text-foreground font-medium max-w-[200px] sm:max-w-none">
          {post.title}
        </span>
      </nav>

      {/* ─── Server-Rendered Article Content (SEO-visible) ── */}
      <article className="mb-8 space-y-6">
        {/* Category & Featured badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${CATEGORY_COLORS[post.category] || 'bg-muted text-muted-foreground border-border'}`}>
            {CATEGORY_LABELS[post.category] || post.category}
          </span>
          {post.featured && (
            <span className="inline-flex items-center rounded-full border border-amber-300 bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/20 dark:text-amber-400">
              Featured
            </span>
          )}
        </div>

        {/* H1 — Server-Rendered */}
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl leading-tight">
          {post.title}
        </h1>

        {/* Excerpt — Server-Rendered */}
        {post.excerpt && (
          <p className="text-lg text-muted-foreground leading-relaxed">
            {post.excerpt}
          </p>
        )}

        {/* Meta info — Server-Rendered */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span>
            By TaxYield Team
          </span>
          <span>
            <time dateTime={post.createdAt?.toISOString()}>
              {post.createdAt ? formatDate(post.createdAt) : ''}
            </time>
          </span>
          {post.updatedAt && post.updatedAt.getTime() !== post.createdAt?.getTime() && (
            <span>
              Updated <time dateTime={post.updatedAt.toISOString()}>
                {formatDate(post.updatedAt)}
              </time>
            </span>
          )}
        </div>

        {/* Tags — Server-Rendered */}
        {tagList.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {tagList.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full border border-border/50 px-2.5 py-0.5 text-[10px] text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Content Preview — Server-Rendered (first ~800 chars) */}
        {contentPreviewHtml && (
          <div
            className="prose-container max-w-none text-muted-foreground leading-relaxed"
            dangerouslySetInnerHTML={{ __html: contentPreviewHtml }}
          />
        )}

        {/* Continue reading link — bridges to client component */}
        {post.content && post.content.length > 800 && (
          <p className="text-muted-foreground">
            <em>Continue reading the full article below…</em>
          </p>
        )}

        {/* Back to blog link — Server-Rendered */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to Blog
        </Link>
      </article>

      {/* ─── Client Component for Full Interactive Experience ── */}
      <BlogDetailClient slug={slug} />
    </div>
  );
}
