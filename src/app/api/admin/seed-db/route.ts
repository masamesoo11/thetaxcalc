import { NextResponse } from 'next/server';
import { seedFromJsonFiles } from '@/lib/blog-db';

export const runtime = 'edge';

/**
 * POST /api/admin/seed-db
 * Seeds the Turso database from JSON files in content/blog/.
 * Uses seedFromJsonFiles from @/lib/blog-db which fetches JSON via HTTP in edge runtime.
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

  // Use the seedFromJsonFiles function which handles both edge and node runtimes
  try {
    const seedResult = await seedFromJsonFiles();
    result.success = seedResult.success;
    result.seeded = seedResult.seeded;
    result.errors = seedResult.errors;
    result.totalInDb = seedResult.totalInDb;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : String(error);
    result.errors.push(`Seeding failed: ${message}`);
  }

  return NextResponse.json(result);
}
