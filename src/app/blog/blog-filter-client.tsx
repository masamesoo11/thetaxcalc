'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { BlogPostMeta } from '@/lib/blog-index';

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { key: 'all', label: 'All Posts' },
  { key: 'tax-guide', label: 'Tax Guides' },
  { key: 'comparison', label: 'Comparisons' },
  { key: 'state-tax', label: 'State Tax' },
  { key: 'tips', label: 'Tips & Tricks' },
  { key: 'news', label: 'Tax News' },
] as const;

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
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export function BlogFilterClient({ posts }: { posts: BlogPostMeta[] }) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredPosts = useMemo(() => {
    let filtered = posts;

    if (activeCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === activeCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          (p.title || '').toLowerCase().includes(q) ||
          (p.excerpt && p.excerpt.toLowerCase().includes(q)) ||
          (p.tags || '').toLowerCase().includes(q)
      );
    }

    return filtered;
  }, [posts, activeCategory, search]);

  const featuredPosts = filteredPosts.filter((p) => p.featured);
  const regularPosts = filteredPosts.filter((p) => !p.featured);

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <div className="space-y-4">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            aria-label="Search articles"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-card/80 border-border/50"
          />
        </div>

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

      {/* Results */}
      {filteredPosts.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">
            {search
              ? `No posts match "${search}". Try a different search term.`
              : activeCategory !== 'all'
                ? `No posts in the "${CATEGORY_LABELS[activeCategory] || activeCategory}" category yet.`
                : 'No blog posts have been published yet.'}
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Featured Posts */}
          {featuredPosts.length > 0 && activeCategory === 'all' && search.trim() === '' && (
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

          {/* Regular / All Posts Grid */}
          <section>
            {featuredPosts.length > 0 && activeCategory === 'all' && search.trim() === '' && (
              <h2 className="mb-4 text-lg font-semibold text-foreground">Latest Articles</h2>
            )}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(featuredPosts.length > 0 && activeCategory === 'all' && search.trim() === ''
                ? regularPosts
                : filteredPosts
              ).map((post) => (
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

          <p className="text-center text-xs text-muted-foreground">
            Showing {filteredPosts.length} of {posts.length} article{posts.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  );
}
