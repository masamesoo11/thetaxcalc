/**
 * Post-build script: updates .vercel/output/static/_routes.json
 * to exclude static assets from the Next.js worker on Cloudflare Pages.
 *
 * By default, @cloudflare/next-on-pages routes ALL requests (/*)
 * to the worker, which causes slow edge function cold starts.
 *
 * This script adds paths to the "exclude" list so Cloudflare
 * serves them directly as static files from CDN.
 *
 * IMPORTANT: Use wildcard patterns (/salary/*, /sales-tax-calculator/*)
 * for dynamic routes to stay within Cloudflare's 100-rule limit.
 */

const fs = require('fs');
const path = require('path');

const ROUTES_PATH = path.join(
  __dirname,
  '..',
  '.vercel',
  'output',
  'static',
  '_routes.json'
);

// Wildcard patterns for dynamic route groups (1 rule each instead of 50+)
const WILDCARD_EXCLUDES = [
  '/_next/static/*',
  '/salary/*',                    // 26 salary pages
  '/sales-tax-calculator/*',      // 50 state pages
  '/blog/*',                      // blog post pages
  '/compare/*',                   // state comparison pages
];

// Static asset paths that should bypass the worker.
// NOTE: Cloudflare Pages _routes.json does NOT support wildcards
// within path segments (e.g. "/author-*.png" won't work).
// We must list each file explicitly.
const EXPLICIT_EXCLUDES = [
  // Author profile images (E-E-A-T)
  '/author-rachel-mitchell.png',
  '/author-david-chen.png',
  '/author-sarah-johnson.png',

  // Brand / PWA assets
  '/favicon.ico',
  '/favicon.svg',
  '/icon.png',
  '/apple-touch-icon.png',
  '/logo-512.png',
  '/logo-512.webp',
  '/logo.svg',
  '/manifest.json',
  '/opengraph-image.png',

  // SEO files
  '/robots.txt',
  '/sitemap.xml',
  '/feed.xml',

  // IndexNow verification key
  '/d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9.txt',

  // Google Disavow file (toxic backlink protection)
  '/disavow.txt',

  // ── Static HTML pages (force-static with generateStaticParams) ──
  // These should be served from CDN, not through the worker.
  // Without these excludes, every page request hits the Cloudflare Worker,
  // causing slow edge function cold starts (11+ second TTFB observed).

  // Calculator pages
  '/paycheck-calculator',
  '/illinois-tax-calculator',
  '/texas-tax-calculator',
  '/florida-tax-calculator',
  '/california-tax-calculator',
  '/new-york-tax-calculator',
  '/mortgage-calculator',
  '/401k-retirement-calculator',
  '/relocation-calculator',
  '/capital-gains-calculator',
  '/self-employment-tax-calculator',
  '/sales-tax-calculator',
  '/tax-refund-calculator',
  '/overtime-tax-calculator',
  '/georgia-tax-calculator',
  '/lottery-tax-calculator',
  '/irs-withholding-calculator',
  '/property-tax-calculator',
  '/bonus-tax-calculator',
  '/virginia-tax-calculator',
  '/income-tax-calculator',
  '/tax-calculator',
  '/freefile-irs',

  // Other static pages
  '/federal-tax-brackets',
  '/resources',
  '/about',
  '/privacy',
  '/terms',
  '/widgets',
  '/glossary',
  '/compare',
  '/blog',
  '/salary',
  '/tax-data',
];

function main() {
  if (!fs.existsSync(ROUTES_PATH)) {
    console.error('❌ _routes.json not found at:', ROUTES_PATH);
    console.error('   Make sure to run this after the build completes.');
    process.exit(1);
  }

  const routes = JSON.parse(fs.readFileSync(ROUTES_PATH, 'utf8'));

  // Merge existing excludes with our static patterns (deduplicate)
  const existingExcludes = new Set(routes.exclude || []);

  // Add wildcard patterns first (most efficient for dynamic routes)
  for (const pattern of WILDCARD_EXCLUDES) {
    existingExcludes.add(pattern);
  }

  // Add explicit excludes
  for (const pattern of EXPLICIT_EXCLUDES) {
    existingExcludes.add(pattern);
  }

  // Auto-scan build output for any additional static image/font files
  const staticDir = path.dirname(ROUTES_PATH);
  const SCAN_EXTENSIONS = ['.png', '.webp', '.svg', '.ico', '.txt', '.xml', '.json'];
  try {
    const files = fs.readdirSync(staticDir);
    for (const file of files) {
      const ext = path.extname(file);
      if (SCAN_EXTENSIONS.includes(ext) && file !== '_routes.json') {
        existingExcludes.add('/' + file);
      }
    }

    // Auto-scan subdirectories for index.html (Next.js App Router static pages)
    // Next.js outputs static pages as <route>/index.html in the build output.
    for (const file of files) {
      const filePath = path.join(staticDir, file);
      try {
        const stat = fs.statSync(filePath);
        if (stat.isDirectory() && file !== '_next') {
          const indexPath = path.join(filePath, 'index.html');
          if (fs.existsSync(indexPath)) {
            existingExcludes.add('/' + file);
          }
          // Skip scanning nested subdirectories — wildcard patterns handle them
          // (e.g. /salary/*, /sales-tax-calculator/*, /blog/*)
        }
      } catch (_) { /* skip inaccessible entries */ }
    }
  } catch (e) {
    console.warn('⚠️  Could not scan build output dir:', e.message);
  }

  routes.exclude = Array.from(existingExcludes);

  fs.writeFileSync(ROUTES_PATH, JSON.stringify(routes, null, 2) + '\n');

  console.log('✅ Updated _routes.json with static asset excludes:');
  console.log(`   ${routes.exclude.length} exclude rules (wildcards used for dynamic routes)`);
  console.log('   Wildcard patterns:', WILDCARD_EXCLUDES.join(', '));
}

main();
