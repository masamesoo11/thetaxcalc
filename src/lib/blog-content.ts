/**
 * Blog Content — Empty placeholder.
 *
 * IMPORTANT: This file was previously 391KB (7,000 lines) containing ALL
 * blog article content embedded in the Worker bundle. This caused the
 * Cloudflare Worker 3 MiB size limit to be exceeded.
 *
 * Blog content has been migrated to individual JSON files in:
 *   content/blog/*.json
 *
 * These JSON files are read at BUILD TIME by blog-content-loader.ts
 * using fs.readFileSync(), and the content is baked into pre-rendered
 * HTML (SSG). This means:
 *
 * ✅ Worker size reduced from 3+ MiB to ~800 KB
 * ✅ SEO improved (content in initial HTML, no runtime fetch)
 * ✅ No 3 MiB limit (room for 100+ articles)
 * ✅ Free (no KV, no database needed)
 *
 * This empty export exists only for backward compatibility with API routes
 * that still import BLOG_CONTENT. API routes return empty content strings;
 * the actual blog content is served via SSG pre-rendered HTML.
 */

export const BLOG_CONTENT: Record<string, string> = {};
