import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPublishedPostsMeta, getPostMeta, getPublishedSlugs } from '@/lib/blog-index';
import { BLOG_CONTENT } from '@/lib/blog-content';
import { SITE_URL } from '@/lib/site-config';
import { BlogTableOfContents, type TocEntry } from './blog-toc';
import { getCalculatorAuthor, authorToJsonLd, getAuthorForCalculator } from '@/lib/authors';
import { AuthorBioCard } from '@/components/finance/author-bio-card';

// ISR: Revalidate every 24 hours — enables Cloudflare CDN edge caching
export const revalidate = 86400;

export function generateStaticParams() {
  return getPublishedSlugs().map(slug => ({ slug }));
}

// ─── Static Data Helpers ────────────────────────────────────────────────────────

function getStaticPost(slug: string) {
  const meta = getPostMeta(slug);
  if (!meta) return null;
  return { ...meta, content: BLOG_CONTENT[meta.slug] || '' };
}

function getStaticPosts() {
  return getPublishedPostsMeta().map(meta => ({
    ...meta,
    content: BLOG_CONTENT[meta.slug] || '',
  }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const post = getStaticPost(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  const metaTitle = post.metaTitle || post.title;
  const metaDesc = post.metaDesc || post.excerpt || `Read ${post.title} on TheTaxCalc — expert tax guides and financial tips.`;

  return {
    title: { absolute: metaTitle },
    description: metaDesc,
    keywords: post.tags ? post.tags.split(',').map((t) => t.trim()) : [],
    alternates: {
      canonical: `${SITE_URL}/blog/${slug}`,
    },
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      url: `${SITE_URL}/blog/${slug}`,
      siteName: 'TheTaxCalc',
      type: 'article',
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      images: [
        {
          url: `${SITE_URL}/opengraph-image.png`,
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
      images: [`${SITE_URL}/opengraph-image.png`],
    },
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const CATEGORY_LABELS: Record<string, string> = {
  'tax-guide': 'Tax Guide',
  comparison: 'Comparison',
  'state-tax': 'State Tax',
  tips: 'Tips',
  news: 'News',
};

const CATEGORY_COLORS: Record<string, string> = {
  'tax-guide': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-300 dark:border-emerald-500/30',
  comparison: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-500/20 dark:text-cyan-400 border-cyan-300 dark:border-cyan-500/30',
  'state-tax': 'bg-violet-100 text-violet-800 dark:bg-violet-500/20 dark:text-violet-400 border-violet-300 dark:border-violet-500/30',
  tips: 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-400 border-amber-300 dark:border-amber-500/30',
  news: 'bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-400 border-rose-300 dark:border-rose-500/30',
};

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

/**
 * Check if a line is a markdown table row (starts and ends with |)
 */
function isTableRow(line: string): boolean {
  const trimmed = line.trim();
  return trimmed.startsWith('|') && trimmed.endsWith('|');
}

/**
 * Check if a line is a table separator (e.g., |---|---|)
 */
function isTableSeparator(line: string): boolean {
  return /^\|?\s*[-:]+[-|\s:]*$/.test(line.trim());
}

/**
 * Parse a table row into cells
 */
function parseTableRow(line: string): string[] {
  return line.trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map(cell => cell.trim());
}

/**
 * Generate a URL-safe heading ID from text
 */
function headingId(text: string): string {
  return text.replace(/[*_`]/g, '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

/**
 * Convert Markdown to HTML for server-rendered content.
 * Supports: headings (with IDs), tables, blockquotes, lists, code blocks, bold, italic, links, inline code, hr
 * Also returns a Table of Contents for sidebar navigation.
 */
function simpleMarkdownToHtml(markdown: string): { html: string; toc: TocEntry[] } {
  const lines = markdown.split('\n');
  const htmlParts: string[] = [];
  const toc: TocEntry[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code blocks
    if (line.trimStart().startsWith('```')) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trimStart().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++;
      htmlParts.push(`<pre><code>${codeLines.map(escapeHtml).join('\n')}</code></pre>`);
      continue;
    }

    // Horizontal rule
    if (/^\s*([-*_])\s*\1\s*\1\s*(\1\s*)*$/.test(line)) {
      htmlParts.push('<hr/>');
      i++;
      continue;
    }

    // Headings — process H3 before H2 before H1
    const h3Match = line.match(/^###\s+(.+)$/);
    if (h3Match) {
      const rawText = h3Match[1].replace(/[*_`]/g, '').trim();
      const id = headingId(h3Match[1]);
      const text = inlineMarkdown(h3Match[1]);
      toc.push({ id, text: rawText, level: 3 });
      htmlParts.push(`<h3 id="${id}">${text}</h3>`);
      i++; continue;
    }
    const h2Match = line.match(/^##\s+(.+)$/);
    if (h2Match) {
      const rawText = h2Match[1].replace(/[*_`]/g, '').trim();
      const id = headingId(h2Match[1]);
      const text = inlineMarkdown(h2Match[1]);
      toc.push({ id, text: rawText, level: 2 });
      htmlParts.push(`<h2 id="${id}">${text}</h2>`);
      i++; continue;
    }
    const h1Match = line.match(/^#\s+(.+)$/);
    if (h1Match) {
      // Skip H1 from markdown — the page template already renders the title as H1.
      // This prevents duplicate H1 headings on the page.
      i++; continue;
    }

    // Tables
    if (isTableRow(line)) {
      const tableRows: string[] = [];
      while (i < lines.length && isTableRow(lines[i])) {
        if (!isTableSeparator(lines[i])) {
          tableRows.push(lines[i]);
        }
        i++;
      }
      if (tableRows.length > 0) {
        const headerCells = parseTableRow(tableRows[0]);
        const headerHtml = headerCells.map(cell => `<th>${inlineMarkdown(cell)}</th>`).join('');
        let tableHtml = `<div class="table-wrapper"><table><thead><tr>${headerHtml}</tr></thead>`;
        if (tableRows.length > 1) {
          const bodyRows = tableRows.slice(1).map(row => {
            const cells = parseTableRow(row);
            return `<tr>${cells.map(cell => `<td>${inlineMarkdown(cell)}</td>`).join('')}</tr>`;
          }).join('');
          tableHtml += `<tbody>${bodyRows}</tbody>`;
        }
        tableHtml += '</table></div>';
        htmlParts.push(tableHtml);
      }
      continue;
    }

    // Blockquotes
    if (/^>\s?/.test(line)) {
      const quoteLines: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) { quoteLines.push(lines[i].replace(/^>\s?/, '')); i++; }
      htmlParts.push(`<blockquote>${inlineMarkdown(quoteLines.join(' '))}</blockquote>`);
      continue;
    }

    // Unordered lists
    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) { items.push(lines[i].replace(/^\s*[-*]\s+/, '')); i++; }
      htmlParts.push(`<ul>${items.map((item) => `<li>${inlineMarkdown(item)}</li>`).join('')}</ul>`);
      continue;
    }

    // Ordered lists
    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) { items.push(lines[i].replace(/^\s*\d+\.\s+/, '')); i++; }
      htmlParts.push(`<ol>${items.map((item) => `<li>${inlineMarkdown(item)}</li>`).join('')}</ol>`);
      continue;
    }

    // Blank lines
    if (line.trim() === '') { i++; continue; }

    // Paragraphs — collect consecutive non-special lines
    const paraLines: string[] = [];
    while (i < lines.length && lines[i].trim() !== '' && !/^#{1,6}\s/.test(lines[i]) && !/^>\s?/.test(lines[i]) && !/^\s*[-*]\s+/.test(lines[i]) && !/^\s*\d+\.\s+/.test(lines[i]) && !/^\s*```/.test(lines[i]) && !/^\s*([-*_])\s*\1\s*\1/.test(lines[i]) && !isTableRow(lines[i])) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length > 0) {
      htmlParts.push(`<p>${inlineMarkdown(paraLines.join(' '))}</p>`);
    }
  }

  return { html: htmlParts.join(''), toc };
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function inlineMarkdown(text: string): string {
  return text
    .replace(/\[(.+?)\]\((.+?)\)/g, (_match, linkText, url) => {
        const isExternal = url.startsWith('http');
        const rel = isExternal ? 'noopener noreferrer nofollow' : '';
        return `<a href="${url}"${rel ? ` rel="${rel}"` : ''}>${linkText}</a>`;
      })
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>');
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = getStaticPost(slug);
  if (!post) {
    notFound();
  }

  const author = getAuthorForCalculator(post.category || 'home');

  // Estimate word count for schema
  const wordCount = post.content ? post.content.split(/\s+/).filter(Boolean).length : 0;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@id': `${SITE_URL}/blog/${slug}#author`,
        ...authorToJsonLd(author),
      },
      {
        '@id': `${SITE_URL}/blog/${slug}#article`,
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt || post.metaDesc || '',
        image: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/opengraph-image.png`,
          width: 1200,
          height: 630,
        },
        datePublished: post.createdAt,
        dateModified: post.updatedAt,
        author: { '@id': `${SITE_URL}/blog/${slug}#author` },
        publisher: { '@id': `${SITE_URL}/#organization` },
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${slug}` },
        keywords: post.tags ? post.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : undefined,
        wordCount: wordCount,
        articleSection: CATEGORY_LABELS[post.category] || post.category,
      },
      {
        '@id': `${SITE_URL}/blog/${slug}#breadcrumb`,
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: post.title },
        ],
      },
    ],
  };

  const { html: contentFullHtml, toc } = post.content ? simpleMarkdownToHtml(post.content) : { html: '', toc: [] };
  const tagList = post.tags ? post.tags.split(',').map((t) => t.trim()).filter(Boolean) : [];

  // Estimate reading time (avg 200 words/min)
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  // All posts for related articles
  const allPosts = getStaticPosts();

  // Determine related posts: match by category or tags, then fallback to most recent
  const otherPosts = allPosts.filter((p) => p.slug !== slug);
  const currentTags = new Set(tagList);

  let relatedPosts = otherPosts
    .map((p) => {
      const postTags = p.tags ? p.tags.split(',').map((t) => t.trim()).filter(Boolean) : [];
      const tagOverlap = postTags.filter((t) => currentTags.has(t)).length;
      const categoryMatch = p.category === post.category ? 1 : 0;
      return { post: p, score: tagOverlap + categoryMatch };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((r) => r.post);

  if (relatedPosts.length === 0) {
    relatedPosts = otherPosts
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 3);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <span className="text-muted-foreground" aria-hidden="true">/</span>
        <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
        <span className="text-muted-foreground" aria-hidden="true">/</span>
        <span className="truncate text-foreground font-medium max-w-[200px] sm:max-w-none">{post.title}</span>
      </nav>

      <article className="mb-8">
        {/* Article Header */}
        <div className="mx-auto max-w-3xl space-y-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${CATEGORY_COLORS[post.category] || 'bg-muted text-muted-foreground border-border'}`}>
              {CATEGORY_LABELS[post.category] || post.category}
            </span>
            {post.featured && (
              <span className="inline-flex items-center rounded-full border border-amber-300 bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/20 dark:text-amber-400">Featured</span>
            )}
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl leading-tight">{post.title}</h1>
          <p className="mt-2 text-base text-muted-foreground">A CPA-reviewed guide by Rachel Mitchell, CPA — updated for 2026 tax year</p>

          {post.excerpt && <p className="text-lg text-muted-foreground leading-relaxed">{post.excerpt}</p>}

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-b border-border/30 pb-4">
            <span>By {author.name}, {author.credentials}</span>
            <span><time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time></span>
            {post.updatedAt && post.updatedAt !== post.createdAt && (
              <span>Updated <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time></span>
            )}
            <span>{readingTime} min read</span>
          </div>

          {tagList.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {tagList.map((tag) => (
                <span key={tag} className="inline-flex items-center rounded-full border border-border/50 px-2.5 py-0.5 text-[10px] text-muted-foreground">{tag}</span>
              ))}
            </div>
          )}
        </div>

        {/* Article Body — TOC sidebar on desktop, content centered */}
        {contentFullHtml && (
          <div className="mx-auto max-w-5xl lg:flex lg:gap-8">
            {/* Table of Contents — sticky sidebar on desktop */}
            {toc.length > 2 && (
              <aside className="hidden lg:block lg:w-64 lg:shrink-0">
                <div className="sticky top-24">
                  <BlogTableOfContents entries={toc} />
                </div>
              </aside>
            )}

            {/* Main content */}
            <div className="mx-auto max-w-3xl lg:mx-0 lg:flex-1">
              <div className="prose-container" dangerouslySetInnerHTML={{ __html: contentFullHtml }} />
            </div>
          </div>
        )}

        <div className="mx-auto max-w-3xl mt-8">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">← Back to Blog</Link>
        </div>
      </article>

      {/* Author Bio Card — E-E-A-T */}
      <AuthorBioCard authorId={author.id} />

      {/* Internal Links: Try Our Calculators */}
      <section className="mb-8 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6">
        <h2 className="text-lg font-bold text-foreground mb-3">Try Our Tax Calculators</h2>
        <p className="text-sm text-muted-foreground mb-4">See exactly how much you&apos;ll take home after all taxes and deductions.</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/paycheck-calculator" className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors">Paycheck Calculator</Link>
          <Link href="/illinois-tax-calculator" className="inline-flex items-center gap-1.5 rounded-lg border border-border/50 px-4 py-2 text-sm font-medium text-foreground hover:border-emerald-500/30 transition-colors">IL Calculator</Link>
          <Link href="/texas-tax-calculator" className="inline-flex items-center gap-1.5 rounded-lg border border-border/50 px-4 py-2 text-sm font-medium text-foreground hover:border-emerald-500/30 transition-colors">TX Calculator</Link>
          <Link href="/florida-tax-calculator" className="inline-flex items-center gap-1.5 rounded-lg border border-border/50 px-4 py-2 text-sm font-medium text-foreground hover:border-emerald-500/30 transition-colors">FL Calculator</Link>
          <Link href="/self-employment-tax-calculator" className="inline-flex items-center gap-1.5 rounded-lg border border-border/50 px-4 py-2 text-sm font-medium text-foreground hover:border-emerald-500/30 transition-colors">Self-Employment</Link>
          <Link href="/relocation-calculator" className="inline-flex items-center gap-1.5 rounded-lg border border-border/50 px-4 py-2 text-sm font-medium text-foreground hover:border-emerald-500/30 transition-colors">Compare States</Link>
          <Link href="/salary" className="inline-flex items-center gap-1.5 rounded-lg border border-border/50 px-4 py-2 text-sm font-medium text-foreground hover:border-emerald-500/30 transition-colors">Salary Calculator</Link>
          <Link href="/compare" className="inline-flex items-center gap-1.5 rounded-lg border border-border/50 px-4 py-2 text-sm font-medium text-foreground hover:border-emerald-500/30 transition-colors">Compare Salaries</Link>
          <Link href="/glossary" className="inline-flex items-center gap-1.5 rounded-lg border border-border/50 px-4 py-2 text-sm font-medium text-foreground hover:border-emerald-500/30 transition-colors">Tax Glossary</Link>
          <Link href="/federal-tax-brackets" className="inline-flex items-center gap-1.5 rounded-lg border border-border/50 px-4 py-2 text-sm font-medium text-foreground hover:border-emerald-500/30 transition-colors">Federal Tax Brackets</Link>
        </div>
      </section>

      {/* Popular Salary Calculations */}
      <section className="mb-8 rounded-xl border border-border/50 bg-muted/30 p-6">
        <h2 className="text-lg font-bold text-foreground mb-3">Popular Salary Calculations</h2>
        <p className="text-sm text-muted-foreground mb-4">Quick access to take-home pay estimates for common salary levels.</p>
        <div className="flex flex-wrap gap-3">
          {[
            { href: '/salary/50000', label: '$50,000' },
            { href: '/salary/75000', label: '$75,000' },
            { href: '/salary/100000', label: '$100,000' },
            { href: '/salary/150000', label: '$150,000' },
            { href: '/salary/200000', label: '$200,000' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 text-sm font-medium text-foreground hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold text-foreground mb-4">Related Articles</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((rp) => {
              const rpTagList = rp.tags ? rp.tags.split(',').map((t) => t.trim()).filter(Boolean) : [];
              return (
                <Link
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className="group rounded-xl border border-border/50 bg-card p-5 hover:border-emerald-500/30 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${CATEGORY_COLORS[rp.category] || 'bg-muted text-muted-foreground border-border'}`}>
                      {CATEGORY_LABELS[rp.category] || rp.category}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{formatDate(rp.createdAt)}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 mb-1.5">
                    {rp.title}
                  </h3>
                  {rp.excerpt && (
                    <p className="text-xs text-muted-foreground line-clamp-2">{rp.excerpt}</p>
                  )}
                  {rpTagList.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {rpTagList.slice(0, 3).map((tag) => (
                        <span key={tag} className="inline-flex items-center rounded-full border border-border/30 px-1.5 py-0.5 text-[9px] text-muted-foreground">{tag}</span>
                      ))}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </section>
      )}

    </div>
  );
}
