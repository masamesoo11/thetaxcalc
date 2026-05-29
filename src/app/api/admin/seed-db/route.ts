import { NextResponse } from 'next/server';
import { upsertPost } from '@/lib/blog-db';
import { getPublishedPostsMeta, type BlogPostMeta } from '@/lib/blog-index';
import { BLOG_CONTENT } from '@/lib/blog-content';

export const runtime = 'edge';

/**
 * POST /api/admin/seed-db
 * Seeds the Turso database from embedded static content.
 * Uses blog-index.ts + blog-content.ts which are edge-safe (no fs/path).
 */

interface SeedDbResponse {
  success: boolean;
  seeded: number;
  errors: string[];
  totalInDb: number;
}

export async function POST() {
  const result: SeedDbResponse = {
    success: false,
    seeded: 0,
    errors: [],
    totalInDb: 0,
  };

  // Check if Turso is configured
  const tursoUrl = process.env.TURSO_DATABASE_URL;
  if (!tursoUrl) {
    return NextResponse.json(
      {
        ...result,
        errors: ['TURSO_DATABASE_URL is not configured. Cannot seed database.'],
      },
      { status: 400 }
    );
  }

  // Seed from embedded static content
  const metas = getPublishedPostsMeta();
  let seededCount = 0;

  for (const meta of metas) {
    try {
      const content = BLOG_CONTENT[meta.slug] || '';
      const post = { ...meta, content };
      await upsertPost(post);
      seededCount++;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      result.errors.push(`${meta.slug}: ${message}`);
    }
  }

  result.seeded = seededCount;
  result.success = seededCount > 0;

  return NextResponse.json(result);
}
