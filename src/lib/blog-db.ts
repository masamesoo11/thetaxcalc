/**
 * Blog Database — Turso (libSQL) for production, static fallback for edge runtime.
 *
 * Data source priority:
 * 1. Turso/libSQL database (production) — HTTP-based SQLite-compatible DB
 * 2. Static embedded index (edge runtime fallback) — works without fs or DB
 *    - blog-index.ts: Lightweight metadata for listing pages
 *    - blog-content.ts: Full article content embedded in the bundle
 *
 * NOTE: This module is EDGE-SAFE. No Node.js fs/path modules are used.
 * The JSON file fallback has been moved to scripts/seed-blog-db.ts
 * for local development seeding only.
 *
 * Setup:
 * 1. Create a Turso database: https://turso.tech
 * 2. Add to .env:
 *    TURSO_DATABASE_URL=libsql://your-db-name-your-org.turso.io
 *    TURSO_AUTH_TOKEN=your-auth-token
 * 3. Run: bun run seed:blog
 */

import { createClient, type Client } from '@libsql/client';
import { getPublishedPostsMeta, getPostMeta, getPublishedSlugs, type BlogPostMeta } from './blog-index';
import { BLOG_CONTENT } from './blog-content';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string;
  coverImage: string;
  published: boolean;
  featured: boolean;
  metaTitle: string;
  metaDesc: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Database Client ──────────────────────────────────────────────────────────

let _db: Client | null = null;

function getDb(): Client | null {
  if (_db) return _db;

  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url) {
    return null;
  }

  try {
    _db = createClient({
      url,
      authToken: authToken || undefined,
    });
    return _db;
  } catch (error) {
    console.error('Failed to create Turso client:', error);
    return null;
  }
}

// ─── Table Initialization ─────────────────────────────────────────────────────

let _initialized = false;

async function ensureTable(): Promise<boolean> {
  const db = getDb();
  if (!db) return false;

  if (_initialized) return true;

  try {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        excerpt TEXT DEFAULT '',
        content TEXT NOT NULL DEFAULT '',
        category TEXT DEFAULT 'tax-guide',
        tags TEXT DEFAULT '',
        cover_image TEXT DEFAULT '',
        published INTEGER DEFAULT 0,
        featured INTEGER DEFAULT 0,
        meta_title TEXT DEFAULT '',
        meta_desc TEXT DEFAULT '',
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      )
    `);

    await db.execute(`CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug)`);
    await db.execute(`CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published)`);
    await db.execute(`CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category)`);

    _initialized = true;
    return true;
  } catch (error) {
    console.error('Failed to initialize blog_posts table:', error);
    return false;
  }
}

// ─── Row Mapping ──────────────────────────────────────────────────────────────

function rowToPost(row: Record<string, unknown>): BlogPost {
  return {
    id: row.id as string,
    title: row.title as string,
    slug: row.slug as string,
    excerpt: (row.excerpt as string) || '',
    content: (row.content as string) || '',
    category: (row.category as string) || 'tax-guide',
    tags: (row.tags as string) || '',
    coverImage: (row.cover_image as string) || '',
    published: Boolean(row.published),
    featured: Boolean(row.featured),
    metaTitle: (row.meta_title as string) || '',
    metaDesc: (row.meta_desc as string) || '',
    createdAt: (row.created_at as string) || '',
    updatedAt: (row.updated_at as string) || '',
  };
}

function postToRow(post: Partial<BlogPost>): Record<string, unknown> {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt || '',
    content: post.content || '',
    category: post.category || 'tax-guide',
    tags: post.tags || '',
    cover_image: post.coverImage || '',
    published: post.published ? 1 : 0,
    featured: post.featured ? 1 : 0,
    meta_title: post.metaTitle || '',
    meta_desc: post.metaDesc || '',
    created_at: post.createdAt || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

// ─── Static Fallback (works in edge runtime without fs or DB) ────────────────
// Uses lightweight blog-index.ts (metadata) + blog-content.ts (full content)
// This is the ULTIMATE fallback — always works, even without Turso or fs

/** Convert BlogPostMeta to BlogPost with embedded content from blog-content.ts */
function metaToPostWithContent(meta: BlogPostMeta): BlogPost {
  const content = BLOG_CONTENT[meta.slug] || '';
  return { ...meta, content };
}

// ─── Public API ───────────────────────────────────────────────────────────────

/** Get all published blog posts */
export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    // Try Turso first
    const hasDb = await ensureTable();
    const db = getDb();

    if (hasDb && db) {
      try {
        const result = await db.execute(
          'SELECT * FROM blog_posts WHERE published = 1 ORDER BY featured DESC, created_at DESC'
        );
        const posts = result.rows.map((row) => rowToPost(row as Record<string, unknown>));
        if (posts.length > 0) return posts;
      } catch (error) {
        console.error('Failed to fetch posts from database:', error);
      }
    }

    // Fallback: Embedded content (always works — edge-safe, no fs/DB needed)
    return getPublishedPostsMeta().map(metaToPostWithContent);
  } catch (error) {
    console.error('Blog: Unexpected error in getAllPosts:', error);
    return getPublishedPostsMeta().map(metaToPostWithContent);
  }
}

/** Get ALL posts (including drafts) — for admin panel */
export async function getAllPostsIncludingDrafts(): Promise<BlogPost[]> {
  const hasDb = await ensureTable();
  const db = getDb();

  if (hasDb && db) {
    try {
      const result = await db.execute(
        'SELECT * FROM blog_posts ORDER BY featured DESC, created_at DESC'
      );
      return result.rows.map((row) => rowToPost(row as Record<string, unknown>));
    } catch (error) {
      console.error('Failed to fetch posts from database:', error);
    }
  }

  // Static fallback (only published posts available)
  return getPublishedPostsMeta().map(metaToPostWithContent);
}

/** Get a single post by slug */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    // Try Turso first
    const hasDb = await ensureTable();
    const db = getDb();

    if (hasDb && db) {
      try {
        const result = await db.execute({
          sql: 'SELECT * FROM blog_posts WHERE slug = ? AND published = 1',
          args: [slug],
        });
        if (result.rows.length > 0) {
          const post = rowToPost(result.rows[0] as Record<string, unknown>);
          // Verify content exists — if content is empty, fall through
          if (post.content && post.content.length > 0) return post;
        }
      } catch (error) {
        console.error('Failed to fetch post from database:', error);
      }
    }

    // Fallback: Embedded content (always works — edge-safe, no fs/DB needed)
    const meta = getPostMeta(slug);
    if (meta) return metaToPostWithContent(meta);

    return null;
  } catch (error) {
    console.error('Blog: Unexpected error in getPostBySlug:', error);
    const meta = getPostMeta(slug);
    if (meta) return metaToPostWithContent(meta);
    return null;
  }
}

/** Get a single post by slug (including drafts) — for admin panel */
export async function getPostBySlugIncludingDraft(slug: string): Promise<BlogPost | null> {
  const hasDb = await ensureTable();
  const db = getDb();

  if (hasDb && db) {
    try {
      const result = await db.execute({
        sql: 'SELECT * FROM blog_posts WHERE slug = ?',
        args: [slug],
      });
      if (result.rows.length > 0) {
        const post = rowToPost(result.rows[0] as Record<string, unknown>);
        if (post.content && post.content.length > 0) return post;
      }
    } catch (error) {
      console.error('Failed to fetch post from database:', error);
    }
  }

  // Static fallback with embedded content
  const meta = getPostMeta(slug);
  if (meta) return metaToPostWithContent(meta);
  return null;
}

/** Get all slugs (for generateStaticParams) */
export async function getAllSlugs(): Promise<string[]> {
  const hasDb = await ensureTable();
  const db = getDb();

  if (hasDb && db) {
    try {
      const result = await db.execute(
        'SELECT slug FROM blog_posts WHERE published = 1 ORDER BY created_at DESC'
      );
      const slugs = result.rows.map((row) => (row as Record<string, unknown>).slug as string);
      if (slugs.length > 0) return slugs;
    } catch (error) {
      console.error('Failed to fetch slugs from database:', error);
    }
  }

  return getPublishedSlugs();
}

/** Get posts by category */
export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const hasDb = await ensureTable();
  const db = getDb();

  if (hasDb && db) {
    try {
      const result = await db.execute({
        sql: 'SELECT * FROM blog_posts WHERE published = 1 AND category = ? ORDER BY featured DESC, created_at DESC',
        args: [category],
      });
      return result.rows.map((row) => rowToPost(row as Record<string, unknown>));
    } catch (error) {
      console.error('Failed to fetch posts by category:', error);
    }
  }

  return getPublishedPostsMeta().filter((m) => m.category === category).map(metaToPostWithContent);
}

/** Get related posts by tags */
export async function getRelatedPosts(tags: string, currentSlug: string, limit = 3): Promise<BlogPost[]> {
  const tagList = tags.split(',').map((t) => t.trim()).filter(Boolean);
  if (tagList.length === 0) return [];

  const hasDb = await ensureTable();
  const db = getDb();

  if (hasDb && db) {
    try {
      const conditions = tagList.map(() => `(tags LIKE ? OR tags LIKE ? OR tags LIKE ? OR tags = ?)`).join(' OR ');
      const args: string[] = [];
      for (const tag of tagList) {
        args.push(`%,${tag},%`, `${tag},%`, `%,${tag}`, tag);
      }
      args.push(currentSlug);

      const result = await db.execute({
        sql: `SELECT * FROM blog_posts WHERE published = 1 AND slug != ? AND (${conditions}) ORDER BY featured DESC, created_at DESC LIMIT ?`,
        args: [...args, String(limit)],
      });
      return result.rows.map((row) => rowToPost(row as Record<string, unknown>));
    } catch (error) {
      console.error('Failed to fetch related posts:', error);
    }
  }

  return getPublishedPostsMeta()
    .filter((m) => m.slug !== currentSlug)
    .filter((m) => {
      const postTags = m.tags.split(',').map((t) => t.trim());
      return tagList.some((tag) => postTags.includes(tag));
    })
    .slice(0, limit)
    .map(metaToPostWithContent);
}

/** Create a new blog post */
export async function createPost(post: BlogPost): Promise<BlogPost> {
  const hasDb = await ensureTable();
  const db = getDb();

  if (!hasDb || !db) {
    throw new Error('Database not available — cannot create post without Turso configured');
  }

  const row = postToRow(post);
  const columns = Object.keys(row).join(', ');
  const placeholders = Object.keys(row).map(() => '?').join(', ');
  const values = Object.values(row) as import('@libsql/client').InValue[];

  try {
    await db.execute({
      sql: `INSERT INTO blog_posts (${columns}) VALUES (${placeholders})`,
      args: values,
    });
    return post;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes('UNIQUE constraint failed')) {
      throw new Error(`A post with slug "${post.slug}" already exists`);
    }
    throw new Error(`Failed to create post: ${message}`);
  }
}

/** Update an existing blog post */
export async function updatePost(slug: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
  const hasDb = await ensureTable();
  const db = getDb();

  if (!hasDb || !db) {
    throw new Error('Database not available — cannot update post without Turso configured');
  }

  const existing = await getPostBySlugIncludingDraft(slug);
  if (!existing) return null;

  const merged = {
    ...existing,
    ...updates,
    id: existing.id,
    slug: existing.slug,
    updatedAt: new Date().toISOString(),
  };

  const row = postToRow(merged);
  delete row.id;

  const setClause = Object.keys(row).map((key) => `${key} = ?`).join(', ');
  const values = [...Object.values(row) as import('@libsql/client').InValue[], slug];

  try {
    await db.execute({
      sql: `UPDATE blog_posts SET ${setClause} WHERE slug = ?`,
      args: values,
    });
    return merged;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to update post: ${message}`);
  }
}

/** Delete a blog post */
export async function deletePost(slug: string): Promise<boolean> {
  const hasDb = await ensureTable();
  const db = getDb();

  if (!hasDb || !db) {
    throw new Error('Database not available — cannot delete post without Turso configured');
  }

  try {
    const result = await db.execute({
      sql: 'DELETE FROM blog_posts WHERE slug = ?',
      args: [slug],
    });
    return result.rowsAffected > 0;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to delete post: ${message}`);
  }
}

/** Get blog statistics (for admin dashboard) */
export async function getBlogStats(): Promise<{
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  featuredPosts: number;
  recentPosts: BlogPost[];
}> {
  const hasDb = await ensureTable();
  const db = getDb();

  if (hasDb && db) {
    try {
      const [totalResult, publishedResult, featuredResult, recentResult] = await Promise.all([
        db.execute('SELECT COUNT(*) as count FROM blog_posts'),
        db.execute('SELECT COUNT(*) as count FROM blog_posts WHERE published = 1'),
        db.execute('SELECT COUNT(*) as count FROM blog_posts WHERE featured = 1'),
        db.execute('SELECT * FROM blog_posts ORDER BY created_at DESC LIMIT 5'),
      ]);

      const totalPosts = (totalResult.rows[0] as Record<string, unknown>)?.count as number || 0;
      const publishedPosts = (publishedResult.rows[0] as Record<string, unknown>)?.count as number || 0;
      const featuredPosts = (featuredResult.rows[0] as Record<string, unknown>)?.count as number || 0;
      const recentPosts = recentResult.rows.map((row) => rowToPost(row as Record<string, unknown>));

      return { totalPosts, publishedPosts, draftPosts: totalPosts - publishedPosts, featuredPosts, recentPosts };
    } catch (error) {
      console.error('Failed to fetch blog stats:', error);
    }
  }

  const metas = getPublishedPostsMeta();
  return {
    totalPosts: metas.length,
    publishedPosts: metas.length,
    draftPosts: 0,
    featuredPosts: metas.filter((m) => m.featured).length,
    recentPosts: metas.slice(0, 5).map(metaToPostWithContent),
  };
}

/** Upsert a blog post (create or update) — used by seed script and admin */
export async function upsertPost(post: BlogPost): Promise<void> {
  const hasDb = await ensureTable();
  const db = getDb();

  if (!hasDb || !db) {
    throw new Error('Database not available — cannot upsert post without Turso configured');
  }

  const row = postToRow(post);

  try {
    await db.execute({
      sql: `INSERT INTO blog_posts (id, title, slug, excerpt, content, category, tags, cover_image, published, featured, meta_title, meta_desc, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(slug) DO UPDATE SET
              title = excluded.title,
              excerpt = excluded.excerpt,
              content = excluded.content,
              category = excluded.category,
              tags = excluded.tags,
              cover_image = excluded.cover_image,
              published = excluded.published,
              featured = excluded.featured,
              meta_title = excluded.meta_title,
              meta_desc = excluded.meta_desc,
              updated_at = excluded.updated_at`,
      args: [
        row.id, row.title, row.slug, row.excerpt, row.content,
        row.category, row.tags, row.cover_image, row.published,
        row.featured, row.meta_title, row.meta_desc,
        row.created_at, row.updated_at,
      ] as import('@libsql/client').InValue[],
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to upsert post: ${message}`);
  }
}
