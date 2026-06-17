/**
 * Simple in-memory rate limiter for Edge runtime.
 *
 * NOTE: This is per-Worker-instance rate limiting. For production-grade
 * rate limiting across multiple Workers, use Cloudflare's Rate Limiting
 * Rules (https://developers.cloudflare.com/waf/rate-limiting-rules/).
 *
 * For now, this provides basic protection against brute-force attacks
 * and accidental DDoS from individual IPs.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

// Clean up expired entries every 5 minutes
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;
  for (const [key, entry] of store.entries()) {
    if (entry.resetAt < now) {
      store.delete(key);
    }
  }
}

export interface RateLimitOptions {
  /** Maximum requests allowed in the window */
  limit: number;
  /** Time window in milliseconds */
  windowMs: number;
}

export interface RateLimitResult {
  /** Whether the request is allowed */
  allowed: boolean;
  /** Remaining requests in current window */
  remaining: number;
  /** Unix timestamp when the limit resets */
  resetAt: number;
}

/**
 * Check rate limit for a given key (usually IP address).
 *
 * @example
 * const result = await checkRateLimit(ip, { limit: 5, windowMs: 60_000 });
 * if (!result.allowed) {
 *   return NextResponse.json(
 *     { error: 'Too many requests' },
 *     { status: 429, headers: { 'Retry-After': String(Math.ceil((result.resetAt - Date.now()) / 1000)) } }
 *   );
 * }
 */
export function checkRateLimit(key: string, options: RateLimitOptions): RateLimitResult {
  cleanup();

  const now = Date.now();
  const entry = store.get(key);

  if (!entry || entry.resetAt < now) {
    // New window
    const newEntry: RateLimitEntry = {
      count: 1,
      resetAt: now + options.windowMs,
    };
    store.set(key, newEntry);
    return {
      allowed: true,
      remaining: options.limit - 1,
      resetAt: newEntry.resetAt,
    };
  }

  // Existing window
  entry.count++;
  const allowed = entry.count <= options.limit;
  return {
    allowed,
    remaining: Math.max(0, options.limit - entry.count),
    resetAt: entry.resetAt,
  };
}

/**
 * Get client IP from NextRequest.
 * Handles Cloudflare's CF-Connecting-IP header.
 */
export function getClientIP(request: Request): string {
  const headers = new Headers(request.headers);
  return (
    headers.get('cf-connecting-ip') ||
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headers.get('x-real-ip') ||
    'unknown'
  );
}
