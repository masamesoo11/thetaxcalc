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
    return data.content || '';
  } catch {
    // Fallback: if JSON file doesn't exist, return empty string
    // This prevents build errors for posts without JSON files
    return '';
  }
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
