'use client';

import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Search,
  BookOpen,
  Clock,
  Calendar,
  TrendingUp,
  ArrowRight,
  Star,
  FileText,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { AdSlot } from '@/components/finance/ad-slot';

// ─── Types ────────────────────────────────────────────────────────────────────

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
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

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { key: 'all', label: 'All Posts' },
  { key: 'tax-guide', label: 'Tax Guides' },
  { key: 'comparison', label: 'Comparisons' },
  { key: 'tips', label: 'Tips & Tricks' },
  { key: 'news', label: 'Tax News' },
] as const;

const GRADIENTS = [
  'from-emerald-600 to-teal-500',
  'from-cyan-600 to-blue-500',
  'from-violet-600 to-purple-500',
  'from-amber-600 to-orange-500',
  'from-rose-600 to-pink-500',
  'from-indigo-600 to-sky-500',
];

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

const RELATED_CALCULATORS = [
  { hash: 'home', label: 'Paycheck Calculator', desc: 'Federal & state take-home pay' },
  { hash: 'illinois', label: 'Illinois Calculator', desc: 'IL 4.95% flat tax' },
  { hash: 'texas', label: 'Texas Calculator', desc: '0% state income tax' },
  { hash: 'florida', label: 'Florida Calculator', desc: '0% state income tax' },
  { hash: 'california', label: 'California Calculator', desc: 'CA progressive 1%–13.3%' },
  { hash: 'newyork', label: 'New York Calculator', desc: 'NY progressive 4%–10.9%' },
  { hash: 'mortgage', label: 'Mortgage Calculator', desc: 'Monthly payment & amortization' },
  { hash: 'retirement', label: '401(k) Projection', desc: 'Retirement savings growth' },
  { hash: 'relocation', label: 'Relocation Calculator', desc: 'Salary equivalent by state' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function estimateReadTime(text: string | null): number {
  if (!text) return 3;
  const words = text.split(/\s+/).length;
  return Math.max(2, Math.ceil(words / 200));
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

function getGradientForSlug(slug: string): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = slug.charCodeAt(i) + ((hash << 5) - hash);
  }
  return GRADIENTS[Math.abs(hash) % GRADIENTS.length];
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function BlogListSkeleton() {
  return (
    <div className="space-y-8">
      {/* Featured skeleton */}
      <div className="grid gap-6 lg:grid-cols-2">
        {[1, 2].map((i) => (
          <Card key={i} className="overflow-hidden border-border/50 bg-card/80">
            <Skeleton className="h-48 w-full" />
            <CardContent className="p-6 space-y-3">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex gap-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Grid skeleton */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[3, 4, 5, 6].map((i) => (
          <Card key={i} className="overflow-hidden border-border/50 bg-card/80">
            <Skeleton className="h-40 w-full" />
            <CardContent className="p-4 space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-5 w-4/5" />
              <Skeleton className="h-3 w-full" />
              <div className="flex gap-3">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-12" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState({ category, search }: { category: string; search: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted/30">
        <FileText className="h-8 w-8 text-muted-foreground/60" />
      </div>
      <h3 className="text-lg font-semibold text-foreground">No posts found</h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        {search
          ? `No posts match "${search}". Try a different search term.`
          : category !== 'all'
            ? `No posts in the "${CATEGORY_LABELS[category] || category}" category yet.`
            : 'No blog posts have been published yet. Check back soon!'}
      </p>
    </div>
  );
}

// ─── Post Card ────────────────────────────────────────────────────────────────

function PostCard({
  post,
  featured = false,
  onNavigate,
}: {
  post: BlogPost;
  featured?: boolean;
  onNavigate: (hash: string) => void;
}) {
  const gradient = getGradientForSlug(post.slug);
  const categoryColor = CATEGORY_COLORS[post.category] || 'bg-muted text-muted-foreground border-border';
  const readTime = estimateReadTime(post.excerpt);

  return (
    <Card
      className={`group cursor-pointer overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm transition-all hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5 ${
        featured ? 'lg:col-span-1' : ''
      }`}
      onClick={() => onNavigate(`blog/${post.slug}`)}
      role="article"
    >
      {/* Cover Image */}
      <div className={`relative h-40 overflow-hidden bg-gradient-to-br ${gradient} ${featured ? 'sm:h-52' : ''}`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <BookOpen className={`h-12 w-12 text-white/30 ${featured ? 'h-16 w-16' : ''}`} />
        </div>
        {post.featured && (
          <div className="absolute right-3 top-3">
            <Badge className="bg-amber-500/90 text-white border-0 text-xs">
              <Star className="mr-1 h-3 w-3" />
              Featured
            </Badge>
          </div>
        )}
      </div>

      <CardContent className={`${featured ? 'p-6' : 'p-4'} space-y-2`}>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={`text-[10px] ${categoryColor}`}>
            {CATEGORY_LABELS[post.category] || post.category}
          </Badge>
        </div>

        <h3
          className={`font-bold leading-tight text-foreground group-hover:text-emerald-400 transition-colors ${
            featured ? 'text-xl' : 'text-base'
          }`}
        >
          {post.title}
        </h3>

        {post.excerpt && (
          <p className={`text-muted-foreground leading-relaxed ${featured ? 'text-sm' : 'text-xs line-clamp-2'}`}>
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center gap-3 pt-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formatDate(post.createdAt)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {readTime} min read
          </span>
        </div>

        <div className="pt-1">
          <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400 group-hover:gap-2 transition-all">
            Read more
            <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function BlogList({ onNavigate }: { onNavigate: (hash: string) => void }) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Fetch published blog posts
  const { data: posts = [], isLoading, error } = useQuery<BlogPost[]>({
    queryKey: ['blog-posts', 'published'],
    queryFn: async () => {
      const res = await fetch('/api/blog?published=true');
      if (!res.ok) throw new Error('Failed to fetch blog posts');
      return res.json();
    },
  });

  // Filter posts
  const filteredPosts = useMemo(() => {
    let filtered = posts;

    // Category filter
    if (activeCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === activeCategory);
    }

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.excerpt && p.excerpt.toLowerCase().includes(q)) ||
          p.tags.toLowerCase().includes(q)
      );
    }

    return filtered;
  }, [posts, activeCategory, search]);

  const featuredPosts = useMemo(() => filteredPosts.filter((p) => p.featured), [filteredPosts]);
  const regularPosts = useMemo(() => filteredPosts.filter((p) => !p.featured), [filteredPosts]);

  // JSON-LD for ArticleList
  const jsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'TaxYield Blog — Tax Guides, Tips & News',
      description:
        'Expert tax guides, state-by-state comparisons, and financial tips from TaxYield.io.',
      numberOfItems: posts.length,
      itemListElement: posts.slice(0, 10).map((post, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `https://taxyield.io/#blog/${post.slug}`,
        name: post.title,
      })),
    }),
    [posts]
  );

  return (
    <div className="space-y-8">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ─── Page Header ──────────────────────────────────── */}
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          TaxYield <span className="text-emerald-400">Blog</span>
        </h2>
        <p className="mt-2 text-muted-foreground">
          Expert tax guides, state-by-state comparisons, and financial tips to help you keep more of your money.
        </p>
      </div>

      {/* ─── Search & Filter Bar ──────────────────────────── */}
      <div className="space-y-4">
        {/* Search */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-card/80 border-border/50"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <Button
              key={cat.key}
              variant={activeCategory === cat.key ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(cat.key)}
              className={
                activeCategory === cat.key
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'border-border/50 text-muted-foreground hover:text-foreground hover:border-emerald-500/30'
              }
            >
              {cat.label}
            </Button>
          ))}
        </div>
      </div>

      {/* ─── Content ──────────────────────────────────────── */}
      {isLoading ? (
        <BlogListSkeleton />
      ) : error ? (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-6 text-center text-sm text-red-400">
          Failed to load blog posts. Please try again later.
        </div>
      ) : filteredPosts.length === 0 ? (
        <EmptyState category={activeCategory} search={search} />
      ) : (
        <div className="space-y-8">
          {/* Featured Posts */}
          {featuredPosts.length > 0 && activeCategory === 'all' && search.trim() === '' && (
            <section>
              <div className="mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-400" />
                <h3 className="text-lg font-semibold text-foreground">Featured Articles</h3>
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                {featuredPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    featured
                    onNavigate={onNavigate}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Ad Slot */}
          <AdSlot position="mid-content" />

          {/* Regular Posts Grid */}
          <section>
            {featuredPosts.length > 0 && activeCategory === 'all' && search.trim() === '' && (
              <div className="mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-emerald-400" />
                <h3 className="text-lg font-semibold text-foreground">Latest Articles</h3>
              </div>
            )}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(featuredPosts.length > 0 && activeCategory === 'all' && search.trim() === ''
                ? regularPosts
                : filteredPosts
              ).map((post) => (
                <PostCard key={post.id} post={post} onNavigate={onNavigate} />
              ))}
            </div>
          </section>

          {/* Post count */}
          <p className="text-center text-xs text-muted-foreground">
            Showing {filteredPosts.length} of {posts.length} article{posts.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}

      {/* ─── Related Calculators ───────────────────────────── */}
      <section className="rounded-xl border border-border/30 bg-muted/10 p-6">
        <h3 className="mb-4 text-lg font-semibold text-foreground">
          Try Our Tax Calculators
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {RELATED_CALCULATORS.map((calc) => (
            <button
              key={calc.hash}
              onClick={() => onNavigate(calc.hash)}
              className="group flex items-start gap-3 rounded-lg border border-border/40 bg-card/60 p-3 text-left transition-all hover:border-emerald-500/30 hover:bg-emerald-500/5"
            >
              <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400 transition-transform group-hover:translate-x-1" />
              <div>
                <p className="text-sm font-medium text-foreground group-hover:text-emerald-400 transition-colors">
                  {calc.label}
                </p>
                <p className="text-xs text-muted-foreground">{calc.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
