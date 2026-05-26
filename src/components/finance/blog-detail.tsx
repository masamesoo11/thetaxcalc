'use client';

import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import ReactMarkdown from 'react-markdown';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Copy,
  Twitter,
  Linkedin,
  ChevronRight,
  BookOpen,
  List,
  User,
  Tag,
  ArrowRight,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { AdSlot } from '@/components/finance/ad-slot';

// ─── Types ────────────────────────────────────────────────────────────────────

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string;
  tags: string;
  coverImage: string | null;
  published: boolean;
  featured: boolean;
  authorId: string | null;
  metaTitle: string | null;
  metaDesc: string | null;
  createdAt: string;
  updatedAt: string;
}

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORY_COLORS: Record<string, string> = {
  'tax-guide': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  comparison: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  tips: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  news: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
};

const CATEGORY_LABELS: Record<string, string> = {
  'tax-guide': 'Tax Guide',
  comparison: 'Comparison',
  tips: 'Tips',
  news: 'News',
};

const GRADIENTS = [
  'from-emerald-600 to-teal-500',
  'from-cyan-600 to-blue-500',
  'from-violet-600 to-purple-500',
  'from-amber-600 to-orange-500',
  'from-rose-600 to-pink-500',
];

const RELATED_CALCULATORS: Record<string, Array<{ hash: string; label: string }>> = {
  'tax-guide': [
    { hash: 'home', label: 'Paycheck Calculator' },
    { hash: 'illinois', label: 'IL Calculator' },
    { hash: 'texas', label: 'TX Calculator' },
  ],
  comparison: [
    { hash: 'relocation', label: 'Relocation Calculator' },
    { hash: 'home', label: 'Paycheck Calculator' },
  ],
  tips: [
    { hash: 'retirement', label: '401(k) Projection' },
    { hash: 'mortgage', label: 'Mortgage Calculator' },
  ],
  news: [
    { hash: 'home', label: 'Paycheck Calculator' },
    { hash: 'california', label: 'CA Calculator' },
  ],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function estimateReadTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.max(2, Math.ceil(words / 200));
}

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

function extractHeadings(content: string): HeadingItem[] {
  const headings: HeadingItem[] = [];
  const lines = content.split('\n');

  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)/);
    if (match) {
      const level = match[1].length;
      const text = match[2].replace(/[*_`]/g, '').trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      headings.push({ id, text, level });
    }
  }

  return headings;
}

function getGradientForSlug(slug: string): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = slug.charCodeAt(i) + ((hash << 5) - hash);
  }
  return GRADIENTS[Math.abs(hash) % GRADIENTS.length];
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function BlogDetailSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-10 w-3/4" />
      <div className="flex gap-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-16" />
      </div>
      <Skeleton className="h-64 w-full" />
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
}

// ─── Share Buttons ────────────────────────────────────────────────────────────

function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const url = `https://taxyield.io/#blog/${slug}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Fallback
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopyLink}
        className="border-border/50 text-muted-foreground hover:text-foreground hover:border-emerald-500/30"
      >
        <Copy className="mr-1.5 h-3.5 w-3.5" />
        Copy Link
      </Button>
      <Button
        variant="outline"
        size="sm"
        asChild
        className="border-border/50 text-muted-foreground hover:text-foreground hover:border-emerald-500/30"
      >
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Twitter className="mr-1.5 h-3.5 w-3.5" />
          Twitter
        </a>
      </Button>
      <Button
        variant="outline"
        size="sm"
        asChild
        className="border-border/50 text-muted-foreground hover:text-foreground hover:border-emerald-500/30"
      >
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Linkedin className="mr-1.5 h-3.5 w-3.5" />
          LinkedIn
        </a>
      </Button>
    </div>
  );
}

// ─── Table of Contents ────────────────────────────────────────────────────────

function TableOfContents({ headings }: { headings: HeadingItem[] }) {
  if (headings.length === 0) return null;

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Card className="border-border/50 bg-card/80 backdrop-blur-sm sticky top-20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <List className="h-4 w-4 text-emerald-400" />
          Table of Contents
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <nav className="space-y-1 max-h-72 overflow-y-auto" aria-label="Table of contents">
          {headings.map((heading) => (
            <button
              key={heading.id}
              onClick={() => handleClick(heading.id)}
              className={`block w-full text-left text-xs text-muted-foreground hover:text-emerald-400 transition-colors rounded px-2 py-1 hover:bg-emerald-500/5 ${
                heading.level === 3 ? 'pl-6' : ''
              }`}
            >
              {heading.text}
            </button>
          ))}
        </nav>
      </CardContent>
    </Card>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function BlogDetail({
  slug,
  onNavigate,
}: {
  slug: string;
  onNavigate: (hash: string) => void;
}) {
  // Fetch post by slug
  const {
    data: post,
    isLoading,
    error,
  } = useQuery<BlogPost>({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      const res = await fetch(`/api/blog/${slug}`);
      if (!res.ok) throw new Error('Post not found');
      return res.json();
    },
    enabled: !!slug,
  });

  // Fetch related posts (same category)
  const { data: relatedPosts = [] } = useQuery<BlogPost[]>({
    queryKey: ['blog-posts', 'related', post?.category],
    queryFn: async () => {
      const res = await fetch(`/api/blog?published=true&category=${post!.category}`);
      if (!res.ok) return [];
      const data: BlogPost[] = await res.json();
      return data.filter((p) => p.slug !== slug).slice(0, 3);
    },
    enabled: !!post?.category,
  });

  // Extract headings for TOC
  const headings = useMemo(() => (post ? extractHeadings(post.content) : []), [post]);

  // Related calculators for this category
  const calculators = post
    ? RELATED_CALCULATORS[post.category] || RELATED_CALCULATORS['tax-guide']
    : [];

  // JSON-LD for Article
  const jsonLd = useMemo(
    () =>
      post
        ? {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.excerpt || post.metaDesc || '',
            datePublished: post.createdAt,
            dateModified: post.updatedAt,
            author: {
              '@type': 'Organization',
              name: 'TaxYield.io',
              url: 'https://taxyield.io',
            },
            publisher: {
              '@type': 'Organization',
              name: 'TaxYield.io',
              url: 'https://taxyield.io',
              logo: {
                '@type': 'ImageObject',
                url: 'https://taxyield.io/logo.png',
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://taxyield.io/#blog/${post.slug}`,
            },
            keywords: post.tags || post.category,
            articleSection: CATEGORY_LABELS[post.category] || post.category,
          }
        : null,
    [post]
  );

  // Breadcrumbs JSON-LD
  const breadcrumbsJsonLd = useMemo(
    () =>
      post
        ? {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://taxyield.io' },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://taxyield.io/#blog' },
              {
                '@type': 'ListItem',
                position: 3,
                name: post.title,
                item: `https://taxyield.io/#blog/${post.slug}`,
              },
            ],
          }
        : null,
    [post]
  );

  const categoryColor = post
    ? CATEGORY_COLORS[post.category] || 'bg-muted text-muted-foreground border-border'
    : '';
  const gradient = post ? getGradientForSlug(post.slug) : GRADIENTS[0];
  const readTime = post ? estimateReadTime(post.content) : 0;

  if (isLoading) return <BlogDetailSkeleton />;

  if (error || !post) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
          <BookOpen className="h-8 w-8 text-red-400" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Post Not Found</h3>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          The blog post you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Button
          onClick={() => onNavigate('blog')}
          className="mt-4 bg-emerald-600 text-white hover:bg-emerald-700"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* JSON-LD */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {breadcrumbsJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
        />
      )}

      {/* ─── Breadcrumbs ──────────────────────────────────── */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <button
          onClick={() => onNavigate('home')}
          className="hover:text-foreground transition-colors"
        >
          Home
        </button>
        <ChevronRight className="h-3.5 w-3.5" />
        <button
          onClick={() => onNavigate('blog')}
          className="hover:text-foreground transition-colors"
        >
          Blog
        </button>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="truncate text-foreground font-medium max-w-[200px] sm:max-w-none">
          {post.title}
        </span>
      </nav>

      {/* ─── Back Button ──────────────────────────────────── */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onNavigate('blog')}
        className="text-muted-foreground hover:text-foreground -ml-2"
      >
        <ArrowLeft className="mr-1.5 h-4 w-4" />
        Back to Blog
      </Button>

      {/* ─── Article Layout ───────────────────────────────── */}
      <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
        {/* Main Content */}
        <article className="space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className={`text-xs ${categoryColor}`}>
                {CATEGORY_LABELS[post.category] || post.category}
              </Badge>
              {post.featured && (
                <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs">
                  Featured
                </Badge>
              )}
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl leading-tight">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-lg text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
            )}

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                TaxYield Team
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatDate(post.createdAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {readTime} min read
              </span>
            </div>

            {/* Tags */}
            {post.tags && (
              <div className="flex flex-wrap items-center gap-2">
                <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                {post.tags.split(',').map((tag) => (
                  <Badge key={tag.trim()} variant="outline" className="text-[10px] border-border/50 text-muted-foreground">
                    {tag.trim()}
                  </Badge>
                ))}
              </div>
            )}

            {/* Share */}
            <div className="flex items-center gap-2">
              <Share2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Share:</span>
              <ShareButtons title={post.title} slug={post.slug} />
            </div>
          </div>

          {/* Cover Image */}
          <div className={`relative h-52 overflow-hidden rounded-xl bg-gradient-to-br ${gradient} sm:h-72`}>
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <BookOpen className="h-20 w-20 text-white/20" />
            </div>
          </div>

          {/* Ad Slot */}
          <AdSlot position="after-form" />

          {/* Markdown Content */}
          <div className="prose-container max-w-none">
            <ReactMarkdown
              components={{
                h2: ({ children, ...props }) => {
                  const text = String(children);
                  const id = text
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/^-|-$/g, '');
                  return (
                    <h2
                      id={id}
                      className="mt-8 mb-4 text-2xl font-bold text-foreground border-b border-border/30 pb-2"
                      {...props}
                    >
                      {children}
                    </h2>
                  );
                },
                h3: ({ children, ...props }) => {
                  const text = String(children);
                  const id = text
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/^-|-$/g, '');
                  return (
                    <h3
                      id={id}
                      className="mt-6 mb-3 text-xl font-semibold text-foreground"
                      {...props}
                    >
                      {children}
                    </h3>
                  );
                },
                p: ({ children, ...props }) => (
                  <p className="mb-4 leading-relaxed text-muted-foreground" {...props}>
                    {children}
                  </p>
                ),
                ul: ({ children, ...props }) => (
                  <ul className="mb-4 ml-6 list-disc space-y-1 text-muted-foreground" {...props}>
                    {children}
                  </ul>
                ),
                ol: ({ children, ...props }) => (
                  <ol className="mb-4 ml-6 list-decimal space-y-1 text-muted-foreground" {...props}>
                    {children}
                  </ol>
                ),
                li: ({ children, ...props }) => (
                  <li className="leading-relaxed" {...props}>
                    {children}
                  </li>
                ),
                strong: ({ children, ...props }) => (
                  <strong className="font-semibold text-foreground" {...props}>
                    {children}
                  </strong>
                ),
                a: ({ children, href, ...props }) => (
                  <a
                    href={href}
                    className="text-emerald-400 underline hover:text-emerald-300 transition-colors"
                    target={href?.startsWith('http') ? '_blank' : undefined}
                    rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    {...props}
                  >
                    {children}
                  </a>
                ),
                blockquote: ({ children, ...props }) => (
                  <blockquote
                    className="my-4 border-l-4 border-emerald-500/50 bg-emerald-500/5 py-3 pl-4 pr-3 italic text-muted-foreground"
                    {...props}
                  >
                    {children}
                  </blockquote>
                ),
                code: ({ children, className, ...props }) => {
                  const isInline = !className;
                  if (isInline) {
                    return (
                      <code
                        className="rounded bg-muted/50 px-1.5 py-0.5 text-sm font-mono text-emerald-400"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  }
                  return (
                    <code className={`${className || ''} block text-sm`} {...props}>
                      {children}
                    </code>
                  );
                },
                pre: ({ children, ...props }) => (
                  <pre
                    className="my-4 overflow-x-auto rounded-lg bg-muted/30 border border-border/30 p-4 text-sm"
                    {...props}
                  >
                    {children}
                  </pre>
                ),
                table: ({ children, ...props }) => (
                  <div className="my-4 overflow-x-auto rounded-lg border border-border/30">
                    <table className="w-full text-sm" {...props}>
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children, ...props }) => (
                  <thead className="bg-muted/20" {...props}>
                    {children}
                  </thead>
                ),
                th: ({ children, ...props }) => (
                  <th
                    className="px-4 py-2 text-left font-semibold text-foreground border-b border-border/30"
                    {...props}
                  >
                    {children}
                  </th>
                ),
                td: ({ children, ...props }) => (
                  <td className="px-4 py-2 text-muted-foreground border-b border-border/20" {...props}>
                    {children}
                  </td>
                ),
                hr: () => <Separator className="my-6 bg-border/30" />,
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Ad Slot */}
          <AdSlot position="after-results" />

          {/* Share Again */}
          <Separator className="bg-border/30" />
          <div className="flex items-center gap-3 py-2">
            <Share2 className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Found this helpful? Share it:</span>
            <ShareButtons title={post.title} slug={post.slug} />
          </div>

          {/* Related Calculators */}
          {calculators.length > 0 && (
            <Card className="border-border/30 bg-emerald-500/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-foreground">
                  Try These Calculators
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2">
                  {calculators.map((calc) => (
                    <Button
                      key={calc.hash}
                      variant="outline"
                      size="sm"
                      onClick={() => onNavigate(calc.hash)}
                      className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300"
                    >
                      <ArrowRight className="mr-1.5 h-3.5 w-3.5" />
                      {calc.label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Related Articles</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((rp) => (
                  <Card
                    key={rp.id}
                    className="group cursor-pointer border-border/50 bg-card/80 transition-all hover:border-emerald-500/30"
                    onClick={() => {
                      onNavigate(`blog/${rp.slug}`);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    <div
                      className={`h-28 bg-gradient-to-br ${getGradientForSlug(rp.slug)} relative`}
                    >
                      <div className="absolute inset-0 bg-black/20" />
                      <BookOpen className="absolute inset-0 m-auto h-8 w-8 text-white/20" />
                    </div>
                    <CardContent className="p-4 space-y-1.5">
                      <Badge
                        variant="outline"
                        className={`text-[10px] ${CATEGORY_COLORS[rp.category] || 'bg-muted text-muted-foreground'}`}
                      >
                        {CATEGORY_LABELS[rp.category] || rp.category}
                      </Badge>
                      <h4 className="text-sm font-semibold leading-tight text-foreground group-hover:text-emerald-400 transition-colors line-clamp-2">
                        {rp.title}
                      </h4>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {estimateReadTime(rp.excerpt)} min
                      </span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </article>

        {/* Sidebar - TOC */}
        <aside className="hidden lg:block">
          <div className="sticky top-20 space-y-4">
            <TableOfContents headings={headings} />

            {/* Quick Calculators */}
            {calculators.length > 0 && (
              <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-foreground">
                    Quick Calculators
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-1.5">
                  {calculators.map((calc) => (
                    <button
                      key={calc.hash}
                      onClick={() => onNavigate(calc.hash)}
                      className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-emerald-500/5 hover:text-emerald-400 transition-colors"
                    >
                      <ArrowRight className="h-3 w-3" />
                      {calc.label}
                    </button>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
