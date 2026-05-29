/**
 * Blog Data — reads from static JSON files instead of database.
 *
 * Why JSON files?
 * - Cloudflare Pages has no persistent database
 * - Content is part of the codebase → always available at build time
 * - SEO: all blog content gets pre-rendered into static HTML
 * - Simple: add a JSON file, rebuild, done
 */

import fs from 'fs';
import path from 'path';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

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

/** Get all published blog posts */
export function getAllPosts(): BlogPost[] {
  try {
    const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.json'));
    const posts = files.map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
      return JSON.parse(raw) as BlogPost;
    });

    // Sort: featured first, then by date (newest first)
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

/** Get a single post by slug */
export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const filePath = path.join(BLOG_DIR, `${slug}.json`);
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, 'utf-8');
    const post = JSON.parse(raw) as BlogPost;
    if (!post.published) return null;
    return post;
  } catch {
    return null;
  }
}

/** Get all slugs (for generateStaticParams) */
export function getAllSlugs(): string[] {
  try {
    const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.json'));
    return files
      .map((file) => {
        const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
        const post = JSON.parse(raw) as BlogPost;
        return post.published ? post.slug : null;
      })
      .filter(Boolean) as string[];
  } catch {
    return [];
  }
}
