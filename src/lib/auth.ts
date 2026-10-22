import { SignJWT, jwtVerify } from 'jose';

// ─── Configuration ──────────────────────────────────────────────────────────

// FAIL-CLOSED credentials: with no env var set there is NO valid admin
// password and NO valid signing key — login refuses and session cookies never
// verify. (These previously fell back to hardcoded values, which are public
// knowledge in the public repo — anyone could log into the admin panel.)
// Set ADMIN_PASSWORD + JWT_SECRET in Cloudflare Pages → Settings →
// Environment variables (Production), then make a new deployment.
const JWT_SECRET_KEY = process.env.JWT_SECRET || '';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';
const COOKIE_NAME = 'thetaxcalc_admin_session';
const SESSION_DURATION = '24h';

if (process.env.NODE_ENV === 'production') {
  if (!JWT_SECRET_KEY) {
    console.warn(
      '⚠️  JWT_SECRET not set — admin sessions are DISABLED. Set JWT_SECRET in Cloudflare Pages env vars and redeploy.'
    );
  }
  if (!ADMIN_PASSWORD) {
    console.warn(
      '⚠️  ADMIN_PASSWORD not set — admin login is DISABLED. Set ADMIN_PASSWORD in Cloudflare Pages env vars and redeploy.'
    );
  }
}

// Derive a secret key from the environment variable
function getSecretKey(): Uint8Array {
  return new TextEncoder().encode(JWT_SECRET_KEY);
}

// ─── JWT Token Helpers ──────────────────────────────────────────────────────

export interface AdminSession {
  role: 'admin';
  iat: number;
  exp: number;
}

/**
 * Create a signed JWT session token for admin access.
 */
export async function createSessionToken(): Promise<string> {
  if (!JWT_SECRET_KEY) {
    throw new Error('JWT_SECRET is not configured — set it in Cloudflare Pages environment variables and redeploy.');
  }
  const secret = getSecretKey();
  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(SESSION_DURATION)
    .sign(secret);
  return token;
}

/**
 * Verify a JWT session token. Returns the payload if valid, null if invalid/expired.
 */
export async function verifySessionToken(token: string): Promise<AdminSession | null> {
  if (!JWT_SECRET_KEY) return null; // fail-closed: no secret configured → no valid sessions
  try {
    const secret = getSecretKey();
    const { payload } = await jwtVerify(token, secret);
    if (payload.role === 'admin') {
      return payload as unknown as AdminSession;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Validate admin password against the server-side configured password.
 */
export function validatePassword(password: string): boolean {
  // Length guard: an unset ADMIN_PASSWORD ('') must never match empty input.
  return ADMIN_PASSWORD.length > 0 && password === ADMIN_PASSWORD;
}

/**
 * Get the cookie name used for admin sessions.
 */
export function getCookieName(): string {
  return COOKIE_NAME;
}

/**
 * Cookie options for the session token.
 */
export function getCookieOptions(): {
  httpOnly: boolean;
  secure: boolean;
  sameSite: 'lax' | 'strict' | 'none';
  path: string;
  maxAge: number;
} {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24, // 24 hours in seconds
  };
}
