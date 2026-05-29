/**
 * Blog Database — STATIC MODE (no @libsql/client)
 *
 * All blog data is served from embedded static content:
 * - blog-index.ts: Lightweight metadata for listing pages
 * - blog-content.ts: Full article content embedded in the bundle
 *
 * WHY: @libsql/client bundles a 1.3 MB WASM SQLite engine that exceeds
 * Cloudflare Pages' 3 MiB Worker bundle limit. By removing it entirely,
 * all edge functions stay well under the limit.
 *
 * Write operations (create, update, delete) return errors since there is
 * no persistent database. This is acceptable for a public-facing tax
 * calculator site — blog content is managed through code deploys.
 *
 * NOTE: This module is EDGE-SAFE. No Node.js fs/path or WASM modules.
 */

import { getPublishedPostsMeta, getPostMeta, type BlogPostMeta, type BlogPost } from './blog-index';
import { BLOG_CONTENT } from './blog-content';

// ─── Types ────────────────────────────────────────────────────────────────────

export type { BlogPost, BlogPostMeta };

// ─── Static Data Access ──────────────────────────────────────────────────────

/** Convert BlogPostMeta to BlogPost with embedded content from blog-content.ts */
function metaToPostWithContent(meta: BlogPostMeta): BlogPost {
  const content = BLOG_CONTENT[meta.slug] || '';
  return { ...meta, content };
}

// ─── Public API (read-only) ──────────────────────────────────────────────────

/** Get all published blog posts */
export async function getAllPosts(): Promise<BlogPost[]> {
  return getPublishedPostsMeta().map(metaToPostWithContent);
}

/** Get ALL posts (including drafts) — for admin panel */
export async function getAllPostsIncludingDrafts(): Promise<BlogPost[]> {
  // Static mode: only published posts available (no drafts in static data)
  return getPublishedPostsMeta().map(metaToPostWithContent);
}

/** Get a single post by slug */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const meta = getPostMeta(slug);
  if (meta) return metaToPostWithContent(meta);
  return null;
}

/** Get a single post by slug (including drafts) — for admin panel */
export async function getPostBySlugIncludingDraft(slug: string): Promise<BlogPost | null> {
  // Static mode: same as getPostBySlug since no drafts exist
  const meta = getPostMeta(slug);
  if (meta) return metaToPostWithContent(meta);
  // Also check unpublished in BLOG_INDEX directly
  const { BLOG_INDEX } = await import('./blog-index');
  const unpublished = BLOG_INDEX.find(p => p.slug === slug);
  if (unpublished) return metaToPostWithContent(unpublished);
  return null;
}

/** Get all slugs (for generateStaticParams) */
export async function getAllSlugs(): Promise<string[]> {
  const { getPublishedSlugs } = await import('./blog-index');
  return getPublishedSlugs();
}

/** Get posts by category */
export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  return getPublishedPostsMeta()
    .filter(m => m.category === category)
    .map(metaToPostWithContent);
}

/** Get related posts by tags */
export async function getRelatedPosts(tags: string, currentSlug: string, limit = 3): Promise<BlogPost[]> {
  const tagList = tags.split(',').map(t => t.trim()).filter(Boolean);
  if (tagList.length === 0) return [];

  return getPublishedPostsMeta()
    .filter(m => m.slug !== currentSlug)
    .filter(m => {
      const postTags = m.tags.split(',').map(t => t.trim());
      return tagList.some(tag => postTags.includes(tag));
    })
    .slice(0, limit)
    .map(metaToPostWithContent);
}

/** Create a new blog post — NOT SUPPORTED in static mode */
export async function createPost(_post: BlogPost): Promise<BlogPost> {
  throw new Error('Cannot create post: running in static mode (no database)');
}

/** Update an existing blog post — NOT SUPPORTED in static mode */
export async function updatePost(_slug: string, _updates: Partial<BlogPost>): Promise<BlogPost | null> {
  throw new Error('Cannot update post: running in static mode (no database)');
}

/** Delete a blog post — NOT SUPPORTED in static mode */
export async function deletePost(_slug: string): Promise<boolean> {
  throw new Error('Cannot delete post: running in static mode (no database)');
}

/** Get blog statistics (for admin dashboard) */
export async function getBlogStats(): Promise<{
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  featuredPosts: number;
  recentPosts: BlogPost[];
}> {
  const metas = getPublishedPostsMeta();
  return {
    totalPosts: metas.length,
    publishedPosts: metas.length,
    draftPosts: 0,
    featuredPosts: metas.filter(m => m.featured).length,
    recentPosts: metas.slice(0, 5).map(metaToPostWithContent),
  };
}

/** Upsert a blog post — NOT SUPPORTED in static mode */
export async function upsertPost(_post: BlogPost): Promise<void> {
  throw new Error('Cannot upsert post: running in static mode (no database)');
}
