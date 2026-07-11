import { SignJWT, jwtVerify } from 'jose';

// ─── Configuration ──────────────────────────────────────────────────────────

// Use fallback during build time to prevent build errors
// Real values must be set in production environment
const JWT_SECRET_KEY = process.env.JWT_SECRET || 'build-time-fallback-secret-not-for-production-use';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'build-time-fallback-password';
const COOKIE_NAME = 'thetaxcalc_admin_session';
const SESSION_DURATION = '24h';

// Warn if using fallback in production
if (process.env.NODE_ENV === 'production' && !process.env.JWT_SECRET) {
  console.warn('⚠️  JWT_SECRET not set — using insecure fallback. Set JWT_SECRET in production!');
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
  return password === ADMIN_PASSWORD;
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
