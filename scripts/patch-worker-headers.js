#!/usr/bin/env node
/**
 * Post-build script: patches the @cloudflare/next-on-pages Worker
 * to inject security and indexing HTTP headers into all responses.
 *
 * The @cloudflare/next-on-pages adapter does NOT preserve custom
 * headers set by Next.js middleware (X-Robots-Tag, CSP, etc.).
 * This script wraps the Worker's fetch handler to add them back.
 *
 * Usage: node scripts/patch-worker-headers.js
 *   (run after `npx @cloudflare/next-on-pages` completes)
 */

const fs = require('fs');
const path = require('path');

const WORKER_PATH = path.join(
  __dirname,
  '..',
  '.vercel',
  'output',
  'static',
  '_worker.js',
  'index.js'
);

if (!fs.existsSync(WORKER_PATH)) {
  console.error('❌ Worker file not found at:', WORKER_PATH);
  console.error('   Run `npx @cloudflare/next-on-pages` first.');
  process.exit(1);
}

// ─── Headers to inject ────────────────────────────────────────────────────────

const HEADER_RULES = [
  // Indexing rules
  {
    pattern: /^\/(api\/|admin)/,
    headers: { 'X-Robots-Tag': 'noindex, nofollow' },
  },
  {
    pattern: /.*/,  // default: all other paths
    headers: {
      'X-Robots-Tag': 'index, follow',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
      'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    },
  },
];

// ─── Patch the Worker ─────────────────────────────────────────────────────────

let workerCode = fs.readFileSync(WORKER_PATH, 'utf8');

// Check if already patched
if (workerCode.includes('__HEADERS_PATCHED__')) {
  console.log('⚠️  Worker already patched. Skipping.');
  process.exit(0);
}

// The patch: wrap the fetch handler to add headers to the response.
// We find the `async fetch(e,t,a)` method and wrap it.
const PATCH = `
// ─── BEGIN __HEADERS_PATCHED__ ────────────────────────────────────────────────
const __SECURITY_HEADERS__ = ${JSON.stringify(HEADER_RULES, null, 0)};
const __PRIVATE_PATH_PATTERN__ = /^\\/((?:api|admin)(?:\\/|$))/;

function __addHeadersToResponse__(response, pathname) {
  try {
    const isPrivate = __PRIVATE_PATH_PATTERN__.test(pathname);
    const is404 = response.status === 404;
    const newHeaders = new Headers(response.headers);

    // Ensure CORS exposes security headers so SEO tools (AIOSEO, etc.) can read them
    const exposeHeaders = [
      'X-Robots-Tag', 'X-Content-Type-Options', 'X-Frame-Options',
      'Referrer-Policy', 'Permissions-Policy', 'Strict-Transport-Security',
      'Content-Security-Policy',
    ].join(', ');
    newHeaders.set('Access-Control-Expose-Headers', exposeHeaders);

    if (isPrivate) {
      newHeaders.set('X-Robots-Tag', 'noindex, nofollow');
    } else if (is404) {
      newHeaders.set('X-Robots-Tag', 'noindex, follow');
    } else {
      newHeaders.set('X-Robots-Tag', 'index, follow');
      newHeaders.set('X-Content-Type-Options', 'nosniff');
      newHeaders.set('X-Frame-Options', 'SAMEORIGIN');
      newHeaders.set('Referrer-Policy', 'strict-origin-when-cross-origin');
      newHeaders.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
      newHeaders.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  } catch (err) {
    // If patching fails, return original response
    console.error('Header patch error:', err);
    return response;
  }
}
// ─── END __HEADERS_PATCHED__ ──────────────────────────────────────────────────
`;

// Insert the patch at the beginning of the file (after the initial imports)
workerCode = PATCH + workerCode;

// Now wrap the fetch handler to add headers.
// Find the pattern: async fetch(e,t,a){ ... }
// We need to wrap the return value of the inner async function.
// The key return is: return ee({request:c, ctx:a, assetsFetcher:t.ASSETS}, y, h, d)
// We wrap it to add headers.

const TARGET_PATTERN = 'return ee({request:c,ctx:a,assetsFetcher:t.ASSETS},y,h,d)';
const REPLACEMENT = `{
    const __res__ = await ee({request:c,ctx:a,assetsFetcher:t.ASSETS},y,h,d);
    const __url__ = new URL(e.url);
    return __addHeadersToResponse__(__res__, __url__.pathname);
  }`;

if (workerCode.includes(TARGET_PATTERN)) {
  workerCode = workerCode.replace(TARGET_PATTERN, REPLACEMENT);
  console.log('✅ Successfully patched Worker fetch handler.');
} else {
  // Try alternative pattern (with spaces)
  const ALT_PATTERN = 'return ee({request: c, ctx: a, assetsFetcher: t.ASSETS}, y, h, d)';
  if (workerCode.includes(ALT_PATTERN)) {
    workerCode = workerCode.replace(ALT_PATTERN, REPLACEMENT);
    console.log('✅ Successfully patched Worker fetch handler (alt pattern).');
  } else {
    console.error('❌ Could not find the target pattern to patch.');
    console.error('   The @cloudflare/next-on-pages adapter may have changed.');
    console.error('   Expected pattern:', TARGET_PATTERN);
    // Search for similar patterns
    const searchPatterns = ['return ee(', 'ee({request:', 'assetsFetcher'];
    for (const sp of searchPatterns) {
      const idx = workerCode.indexOf(sp);
      if (idx > -1) {
        console.error(`   Found "${sp}" at index ${idx}: ...${workerCode.substring(idx, idx+120)}...`);
      }
    }
    process.exit(1);
  }
}

fs.writeFileSync(WORKER_PATH, workerCode, 'utf8');
console.log('✅ Worker patched and saved.');
