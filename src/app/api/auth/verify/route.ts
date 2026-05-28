export const runtime = 'edge';

import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, getCookieName } from '@/lib/auth';

/**
 * GET /api/auth/verify
 * Checks if the current session cookie is valid.
 * Used by the client to determine auth state on page load.
 */
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get(getCookieName())?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const session = await verifySessionToken(token);

    if (!session) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({ authenticated: true, role: session.role }, { status: 200 });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
