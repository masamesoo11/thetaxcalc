import { NextResponse } from 'next/server';
import { getPublishedPostsMeta } from '@/lib/blog-index';
export const runtime = 'edge';
import { BLOG_CONTENT } from '@/lib/blog-content';



/**
 * POST /api/admin/seed-db
 * In static mode, this returns a success message indicating
 * that the site uses embedded static content — no database seeding needed.
 * Blog content is managed through code deploys.
 */

interface SeedDbResponse {
  success: boolean;
  seeded: number;
  errors: string[];
  totalInDb: number;
  message: string;
}

export async function POST() {
  const metas = getPublishedPostsMeta();

  const result: SeedDbResponse = {
    success: true,
    seeded: metas.length,
    errors: [],
    totalInDb: metas.length,
    message: 'Running in static mode — blog content is embedded in the application bundle. No database seeding required. Content updates are deployed via code.',
  };

  return NextResponse.json(result);
}
