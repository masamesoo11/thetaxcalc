# Static Export Migration — Work Record

## Task
Switch from Cloudflare Pages Functions to static HTML export (`output: 'export'`) because the edge runtime bundle with Prisma (14.9 MiB) exceeds Cloudflare's free plan 3 MiB limit.

## Changes Made

### 1. `next.config.ts`
- Added `output: 'export'` to enable static HTML generation
- `images: { unoptimized: true }` was already present

### 2. `src/app/blog/[slug]/page.tsx`
- Replaced `export const runtime = 'edge'` with `generateStaticParams()` that fetches blog slugs from the database at build time
- The page component still uses `db.post.findUnique()` to render full article content at build time
- All SEO content (JSON-LD, breadcrumbs, meta tags, full article HTML) is pre-rendered

### 3. ImageResponse files → Static images
- Removed `export const runtime = 'edge'` from all ImageResponse files
- Replaced `icon.tsx`, `apple-icon.tsx`, `opengraph-image.tsx`, `[calculator]/opengraph-image.tsx` with static PNG files in `public/`:
  - `public/favicon.ico` (32x32)
  - `public/icon.png` (32x32)
  - `public/apple-touch-icon.png` (180x180)
  - `public/opengraph-image.png` (1200x630)
- Moved original TSX files to `src/_api_backup/`

### 4. `sitemap.ts` and `robots.ts`
- Added `export const dynamic = 'force-static'` to both files
- This tells Next.js to generate them at build time rather than treating them as dynamic routes
- Both still use `db` at build time to include blog posts in the sitemap

### 5. API routes and feed.xml
- Moved all files under `src/app/api/` to `src/_api_backup/api/`
- Moved `src/app/feed.xml/` to `src/_api_backup/feed.xml/`
- Created static `public/feed.xml` as a placeholder RSS feed
- API routes are incompatible with `output: 'export'` and would cause build errors

### 6. OpenGraph image references
- Updated all `opengraph-image` URL references across the codebase from `/opengraph-image` to `/opengraph-image.png`:
  - `src/app/layout.tsx`
  - `src/app/page.tsx`
  - `src/app/about/page.tsx`
  - `src/app/blog/page.tsx`
  - `src/app/blog/[slug]/page.tsx`
  - `src/app/[calculator]/page.tsx`
- Updated logo reference from `/icon` to `/icon.png` in layout.tsx and about.tsx

### 7. `package.json`
- Simplified `build` script: `next build` (no standalone server steps needed)
- Changed `start` script: `npx serve out` (serve static files)
- Replaced `pages:build` and `pages:deploy` with single `pages:deploy`: `npx wrangler pages deploy out`

## Build Result
✅ **Build succeeded** — 66 static pages generated:
- Calculator pages (11, via `generateStaticParams`)
- Salary pages (26, via `generateStaticParams`)
- Comparison pages (10, via `generateStaticParams`)
- Blog detail pages (5, via `generateStaticParams`)
- Static pages: /, /about, /admin, /blog, /compare, /glossary, /privacy, /terms, /federal-tax-brackets
- Generated files: robots.txt, sitemap.xml, feed.xml

Output size: ~22MB in `out/` directory

## What's Preserved
- ✅ All calculator, salary, and compare page content unchanged
- ✅ All SEO content (JSON-LD, FAQ, canonical URLs) intact
- ✅ Blog articles fully pre-rendered with server-side HTML
- ✅ Sitemap includes blog posts fetched from DB at build time
- ✅ robots.txt generated at build time
- ✅ Prisma dependency and database setup retained

## Limitations
- ⚠️ API routes are unavailable (moved to backup) — admin panel, blog CRUD, usage tracking won't work
- ⚠️ Client-side blog detail component will show loading/error state for interactive features (but server-rendered content is visible)
- ⚠️ Calculator usage tracking (`/api/track`) won't work
- ⚠️ Ad slot management (`/api/ads`) won't work
- ⚠️ The feed.xml is a static placeholder without blog post items

## Files Backed Up (in `src/_api_backup/`)
- `api/` (all API route files)
- `feed.xml/` (RSS feed route)
- `icon.tsx`, `apple-icon.tsx`, `opengraph-image.tsx`, `calculator-opengraph-image.tsx`
