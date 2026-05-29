import { NextResponse } from 'next/server';
import { createClient } from '@libsql/client';

export const runtime = 'edge';

/**
 * GET /api/admin/db-status
 * Checks the Turso database connection status and returns diagnostic info.
 * Uses @libsql/client directly (same pattern as @/lib/blog-db).
 */

interface DbStatusResponse {
  configured: boolean;
  connected: boolean;
  tableExists: boolean;
  postCount: number;
  url: string | null;
  error: string | null;
}

export async function GET() {
  const result: DbStatusResponse = {
    configured: false,
    connected: false,
    tableExists: false,
    postCount: 0,
    url: null,
    error: null,
  };

  const tursoUrl = process.env.TURSO_DATABASE_URL;
  const tursoAuthToken = process.env.TURSO_AUTH_TOKEN;

  // Check if env vars are configured
  result.configured = !!(tursoUrl && tursoAuthToken);

  // Mask the URL for security — show first 20 chars + "..."
  if (tursoUrl) {
    result.url = tursoUrl.length > 20 ? tursoUrl.substring(0, 20) + '...' : tursoUrl;
  }

  // If not configured, return early with what we have
  if (!result.configured) {
    result.error = !tursoUrl
      ? 'TURSO_DATABASE_URL is not set'
      : 'TURSO_AUTH_TOKEN is not set';
    return NextResponse.json(result);
  }

  // Try to connect and query
  let db: ReturnType<typeof createClient> | null = null;

  try {
    db = createClient({
      url: tursoUrl!,
      authToken: tursoAuthToken!,
    });

    // Attempt a simple query to verify connectivity
    await db.execute('SELECT 1');

    result.connected = true;

    // Check if blog_posts table exists and get count
    try {
      const countResult = await db.execute(
        'SELECT COUNT(*) as count FROM blog_posts'
      );

      result.tableExists = true;
      result.postCount =
        Number((countResult.rows[0] as Record<string, unknown>)?.count) || 0;
    } catch (tableError: unknown) {
      // Table doesn't exist yet — this is not a connection error
      const message =
        tableError instanceof Error ? tableError.message : String(tableError);

      if (
        message.includes('no such table') ||
        message.includes('does not exist')
      ) {
        result.tableExists = false;
        result.postCount = 0;
      } else {
        // Unexpected error while querying the table
        result.tableExists = false;
        result.error = `Error querying blog_posts: ${message}`;
      }
    }
  } catch (connectionError: unknown) {
    const message =
      connectionError instanceof Error
        ? connectionError.message
        : String(connectionError);
    result.connected = false;
    result.error = `Connection failed: ${message}`;
  } finally {
    if (db) {
      try {
        db.close();
      } catch {
        // Ignore close errors
      }
    }
  }

  return NextResponse.json(result);
}
