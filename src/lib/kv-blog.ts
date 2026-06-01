/**
 * Cloudflare KV Blog Database
 *
 * Production: uses Cloudflare KV (Key-Value store)
 * Local dev: reads from JSON files in content/blog/
 */

import { getRequestContext } from '@cloudflare/next-on-pages';

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

const SLUGS_KEY = 'index:slugs';

/** Get the KV binding (only works in Cloudflare edge runtime) */
function getKV(): KVNamespace | null {
  try {
    const { env } = getRequestContext();
    return (env as unknown as { BLOG_KV: KVNamespace }).BLOG_KV || null;
  } catch {
    return null;
  }
}

/** Local dev fallback: read from JSON files */
function getPostsFromJson(): BlogPost[] {
  // Dynamic import only works in Node.js, not Edge
  // We use require() with try/catch for safety
  try {
    const fs = require('fs');
    const path = require('path');
    const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');
    const files = fs.readdirSync(BLOG_DIR).filter((f: string) => f.endsWith('.json'));
    const posts = files.map((file: string) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
      return JSON.parse(raw) as BlogPost;
    });
    return posts
      .filter((p) => p.published)
      .sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  } catch {
    return [];
  }
}

function getSlugFromJson(slug: string): BlogPost | null {
  try {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(process.cwd(), 'content', 'blog', `${slug}.json`);
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, 'utf-8');
    const post = JSON.parse(raw) as BlogPost;
    return post.published ? post : null;
  } catch {
    return null;
  }
}

function getSlugsFromJson(): string[] {
  try {
    const fs = require('fs');
    const path = require('path');
    const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');
    const files = fs.readdirSync(BLOG_DIR).filter((f: string) => f.endsWith('.json'));
    return files
      .map((file: string) => {
        const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
        const post = JSON.parse(raw) as BlogPost;
        return post.published ? post.slug : null;
      })
      .filter(Boolean) as string[];
  } catch {
    return [];
  }
}

/** Get all published blog posts */
export async function getAllPosts(): Promise<BlogPost[]> {
  const kv = getKV();

  if (!kv) {
    return getPostsFromJson();
  }

  try {
    const slugsRaw = await kv.get(SLUGS_KEY);
    if (!slugsRaw) return [];

    const slugs: string[] = JSON.parse(slugsRaw);
    const posts: BlogPost[] = [];

    for (const slug of slugs) {
      const raw = await kv.get(`post:${slug}`);
      if (raw) {
        const post = JSON.parse(raw) as BlogPost;
        if (post.published) posts.push(post);
      }
    }

    return posts.sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  } catch {
    return [];
  }
}

/** Get a single post by slug */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const kv = getKV();

  if (!kv) {
    return getSlugFromJson(slug);
  }

  try {
    const raw = await kv.get(`post:${slug}`);
    if (!raw) return null;
    const post = JSON.parse(raw) as BlogPost;
    return post.published ? post : null;
  } catch {
    return null;
  }
}

/** Get all slugs */
export async function getAllSlugs(): Promise<string[]> {
  const kv = getKV();

  if (!kv) {
    return getSlugsFromJson();
  }

  try {
    const slugsRaw = await kv.get(SLUGS_KEY);
    if (!slugsRaw) return [];
    return JSON.parse(slugsRaw) as string[];
  } catch {
    return [];
  }
}

/** Create or update a blog post */
export async function upsertPost(post: BlogPost): Promise<void> {
  const kv = getKV();
  if (!kv) throw new Error('KV not available — cannot write in local dev');

  await kv.put(`post:${post.slug}`, JSON.stringify(post));

  const slugsRaw = await kv.get(SLUGS_KEY);
  const slugs: string[] = slugsRaw ? JSON.parse(slugsRaw) : [];
  if (!slugs.includes(post.slug)) {
    slugs.push(post.slug);
    await kv.put(SLUGS_KEY, JSON.stringify(slugs));
  }
}

/** Delete a blog post */
export async function deletePost(slug: string): Promise<void> {
  const kv = getKV();
  if (!kv) throw new Error('KV not available — cannot delete in local dev');

  await kv.delete(`post:${slug}`);

  const slugsRaw = await kv.get(SLUGS_KEY);
  if (slugsRaw) {
    const slugs: string[] = JSON.parse(slugsRaw);
    const updated = slugs.filter((s) => s !== slug);
    await kv.put(SLUGS_KEY, JSON.stringify(updated));
  }
}
