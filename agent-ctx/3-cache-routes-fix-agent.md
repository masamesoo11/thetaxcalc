# Task 3 - Cache & Routes Fix Agent

## Task
Fix Cache-Control headers for HTML pages and exclude calculator routes from Cloudflare Worker to resolve 11,243ms TTFB on Cloudflare Pages.

## Changes Made

### 1. next.config.ts — Added page route Cache-Control header rule
- Added new header rule with source `'/:path((?!_next|api|admin|favicon|icon|logo|author|d4e5f6).*)'` BEFORE the existing file-extension rule
- Applies `Cache-Control: public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800`
- Negative lookahead skips paths that have their own caching rules (_next, api, admin, etc.)

### 2. scripts/fix-routes.js — Added calculator page routes to EXPLICIT_EXCLUDES
- Added 20 calculator page routes and 11 other static pages
- Added auto-scan for index.html in subdirectories (1-level and 2-level deep)
- Now detects Next.js App Router static pages automatically from build output

## Lint Status
- 0 errors, 0 warnings
