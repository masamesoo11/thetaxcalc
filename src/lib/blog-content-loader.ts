/**
 * Blog Content Loader — reads article content from JSON files at build time.
 *
 * This replaces the old blog-content.ts approach (which bundled ALL article
 * content into the Worker, causing the 3 MiB size limit issue).
 *
 * How it works:
 * - At BUILD TIME (SSG), this function reads content/blog/*.json using fs
 * - The content is baked into the pre-rendered HTML
 * - At RUNTIME, only static HTML is served (no fs needed)
 * - The Worker stays small (~800KB instead of 3+ MiB)
 *
 * This is the BEST approach for SEO because:
 * ✅ Content is in the initial HTML (Googlebot sees it immediately)
 * ✅ No runtime fetch needed (no KV delay, no API call)
 * ✅ Worker size stays small (room for 100+ articles)
 * ✅ Free (no KV, no database)
 */

import fs from 'fs';
import path from 'path';
import { SYNDICATION_CONTENT } from '@/generated/syndication-content';

interface BlogJsonData {
  id?: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  content: string;
  category?: string;
  tags?: string;
  coverImage?: string;
  published?: boolean;
  featured?: boolean;
  metaTitle?: string;
  metaDesc?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Get blog post content from a JSON file.
 * Runs at BUILD TIME only (SSG) — not at runtime.
 */
export function getBlogContentFromFile(slug: string): string {
  try {
    const filePath = path.join(process.cwd(), 'content', 'blog', `${slug}.json`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data: BlogJsonData = JSON.parse(fileContent);
    if (data.content && data.content.trim()) return data.content;
  } catch {
    // fs unavailable (Cloudflare Worker runtime) or file missing — fall through.
  }
  // Worker-safe fallback: generated map compiled from the SAME content/blog/*.json
  // (bundled into the worker; already powers /api/syndicate). Fixes on-demand-rendered
  // blog pages serving empty bodies in production, where fs silently fails.
  return SYNDICATION_CONTENT[slug] || '';
}

/**
 * Get full blog post data (content + metadata) from a JSON file.
 * Runs at BUILD TIME only (SSG).
 */
export function getBlogPostFromFile(slug: string): BlogJsonData | null {
  try {
    const filePath = path.join(process.cwd(), 'content', 'blog', `${slug}.json`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent) as BlogJsonData;
  } catch {
    return null;
  }
}
