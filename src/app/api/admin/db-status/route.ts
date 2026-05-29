import { NextResponse } from 'next/server';

export const runtime = 'edge';

/**
 * GET /api/admin/db-status
 * Returns status indicating the site is running in static mode
 * (no @libsql/client dependency, no Turso database connection).
 */

interface DbStatusResponse {
  configured: boolean;
  connected: boolean;
  tableExists: boolean;
  postCount: number;
  url: string | null;
  error: string | null;
  mode: string;
}

export async function GET() {
  const result: DbStatusResponse = {
    configured: false,
    connected: false,
    tableExists: false,
    postCount: 0,
    url: null,
    error: null,
    mode: 'static',
  };

  // In static mode, blog content comes from embedded blog-index.ts + blog-content.ts
  // No database connection is needed or attempted.
  result.configured = true; // "configured" in the sense that static mode is always available
  result.connected = true; // data is available via static files
  result.tableExists = true; // data exists via static files
  result.postCount = 8; // number of published posts in blog-index.ts

  return NextResponse.json(result);
}
