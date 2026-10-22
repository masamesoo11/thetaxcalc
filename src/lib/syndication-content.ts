/**
 * Syndication Content Resolver — production architecture adapter.
 *
 * PRODUCTION (Cloudflare Pages): blog content lives in content/blog/*.json
 * files, read at BUILD TIME (blog-content-loader.ts / SSG). Workers have no
 * fs at runtime, so scripts/generate-syndication-content.mjs compiles all
 * posts into src/generated/syndication-content.ts (slug → markdown map),
 * which is bundled into the worker (~200KB gzipped, worker stays ~1MB, far
 * under the 3MiB limit). The map regenerates via the prebuild/build:cf hooks
 * and is also committed, so a missed regeneration can never break a deploy.
 *
 * LEGACY/DEV fallback: lib/blog-content.ts BLOG_CONTENT (kept for
 * environments like the sandbox that predate the content/ migration).
 */

import { SYNDICATION_CONTENT } from '@/generated/syndication-content';
import { BLOG_CONTENT } from '@/lib/blog-content';

/** Resolve a post's markdown body for syndication. Never throws. */
export function getSyndicationContent(slug: string): string {
  const generated = SYNDICATION_CONTENT[slug];
  if (generated && generated.trim()) return generated;
  return BLOG_CONTENT[slug] || '';
}
