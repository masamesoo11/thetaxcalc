import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/lib/db';
import { BlogDetailClient } from './blog-detail-client';
import { SITE_URL } from '@/lib/site-config';

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
      canonical: `${SITE_URL}/blog/${slug}`,
      languages: {
        'en-US': `${SITE_URL}/blog/${slug}`,
        'x-default': `${SITE_URL}/blog/${slug}`,
      },
    },
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      url: `${SITE_URL}/blog/${slug}`,
      siteName: 'TaxYield.io',
      type: 'article',
      publishedTime: post.createdAt?.toISOString(),
      modifiedTime: post.updatedAt?.toISOString(),
      images: [
        {
          url: `${SITE_URL}/opengraph-image`,
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
      images: [`${SITE_URL}/opengraph-image`],
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
 * Convert Markdown to HTML for server-rendered content.
 * Handles: headings (##, ###), **bold**, *italic*, [links](url), `code`,
 * paragraphs, unordered lists (- items), ordered lists (1. items),
 * blockquotes (> text), horizontal rules (---), and code blocks (```).
 * The full ReactMarkdown rendering happens client-side for interactive experience.
 */
function simpleMarkdownToHtml(markdown: string): string {
  const lines = markdown.split('\n');
  const htmlParts: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code blocks: ```
    if (line.trimStart().startsWith('```')) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trimStart().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      htmlParts.push(`<pre><code>${codeLines.map(escapeHtml).join('\n')}</code></pre>`);
      continue;
    }

    // Horizontal rule: --- (or ***, ___)
    if (/^\s*([-*_])\s*\1\s*\1\s*(\1\s*)*$/.test(line)) {
      htmlParts.push('<hr/>');
      i++;
      continue;
    }

    // Headings: ## and ###
    const h3Match = line.match(/^###\s+(.+)$/);
    if (h3Match) {
      htmlParts.push(`<h3>${inlineMarkdown(h3Match[1])}</h3>`);
      i++;
      continue;
    }
    const h2Match = line.match(/^##\s+(.+)$/);
    if (h2Match) {
      const text = inlineMarkdown(h2Match[1]);
      const id = h2Match[1].replace(/[*_`]/g, '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      htmlParts.push(`<h2 id="${id}">${text}</h2>`);
      i++;
      continue;
    }
    const h1Match = line.match(/^#\s+(.+)$/);
    if (h1Match) {
      const text = inlineMarkdown(h1Match[1]);
      const id = h1Match[1].replace(/[*_`]/g, '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      htmlParts.push(`<h1 id="${id}">${text}</h1>`);
      i++;
      continue;
    }

    // Blockquote: > text
    if (/^>\s?/.test(line)) {
      const quoteLines: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        quoteLines.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      htmlParts.push(`<blockquote>${inlineMarkdown(quoteLines.join(' '))}</blockquote>`);
      continue;
    }

    // Unordered list: - or * items
    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, ''));
        i++;
      }
      htmlParts.push(`<ul>${items.map((item) => `<li>${inlineMarkdown(item)}</li>`).join('')}</ul>`);
      continue;
    }

    // Ordered list: 1. items
    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, ''));
        i++;
      }
      htmlParts.push(`<ol>${items.map((item) => `<li>${inlineMarkdown(item)}</li>`).join('')}</ol>`);
      continue;
    }

    // Empty lines
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Paragraph: collect consecutive non-empty, non-special lines
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !/^#{1,6}\s/.test(lines[i]) &&
      !/^>\s?/.test(lines[i]) &&
      !/^\s*[-*]\s+/.test(lines[i]) &&
      !/^\s*\d+\.\s+/.test(lines[i]) &&
      !/^\s*```/.test(lines[i]) &&
      !/^\s*([-*_])\s*\1\s*\1/.test(lines[i])
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length > 0) {
      htmlParts.push(`<p>${inlineMarkdown(paraLines.join(' '))}</p>`);
    }
  }

  return htmlParts.join('');
}

/** Escape HTML special characters */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Convert inline markdown (bold, italic, code, links) to HTML */
function inlineMarkdown(text: string): string {
  return text
    // Links: [text](url) — must come before other patterns
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" rel="noopener noreferrer">$1</a>')
    // Bold: **text**
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic: *text* (avoid matching inside **)
    .replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>')
    // Inline code: `text`
    .replace(/`(.+?)`/g, '<code>$1</code>');
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
    author: { '@type': 'Organization', name: 'TaxYield.io', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'TaxYield.io', url: SITE_URL },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${slug}` },
    keywords: post.tags || '',
    articleSection: CATEGORY_LABELS[post.category] || post.category,
  };

  const breadcrumbsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE_URL}/blog/${slug}` },
    ],
  };

  // Prepare server-rendered full content (for Google indexing and SEO)
  const contentFull = post.content || '';
  const contentFullHtml = contentFull
    ? simpleMarkdownToHtml(contentFull)
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

        {/* Full Article Content — Server-Rendered (for Google/SEO indexing) */}
        {contentFullHtml && (
          <div
            className="prose-container max-w-none text-muted-foreground leading-relaxed"
            dangerouslySetInnerHTML={{ __html: contentFullHtml }}
          />
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
