export const runtime = 'edge';

import { NextRequest, NextResponse } from 'next/server';
import { validatePassword, createSessionToken, getCookieName, getCookieOptions } from '@/lib/auth';
import { checkRateLimit, getClientIP } from '@/lib/rate-limit';

/**
 * POST /api/auth/login
 * Validates admin password and sets an HTTP-only session cookie.
 */
export async function POST(request: NextRequest) {
  try {
    // ─── Rate limiting: 5 attempts per minute per IP ───────────────
    const ip = getClientIP(request);
    const rateLimit = checkRateLimit(`login:${ip}`, { limit: 5, windowMs: 60_000 });
    if (!rateLimit.allowed) {
      const retryAfter = Math.ceil((rateLimit.resetAt - Date.now()) / 1000);
      return NextResponse.json(
        { error: 'Too many login attempts. Try again later.' },
        {
          status: 429,
          headers: { 'Retry-After': String(retryAfter) }
        }
      );
    }

    const body = await request.json();
    const { password } = body;

    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      );
    }

    if (!validatePassword(password)) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    // Create signed JWT token
    const token = await createSessionToken();
    const cookieOptions = getCookieOptions();

    // Set HTTP-only cookie and return success
    const response = NextResponse.json(
      { success: true, message: 'Authenticated successfully' },
      { status: 200 }
    );

    response.cookies.set(getCookieName(), token, cookieOptions);

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
