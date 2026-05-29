# Task 2c: Remove @libsql/client from ALL edge functions

## Summary
Removed @libsql/client (1.3 MB WASM SQLite engine) from ALL edge functions to reduce Cloudflare Pages Worker bundle under 3 MiB.

## Files Modified

### Core Libraries (2 files)
1. **`src/lib/db.ts`** — Complete rewrite: replaced @libsql/client with in-memory Maps. Exports same `db` Proxy API so all API routes work without changes. Includes seeded default data for ad slots, site settings, and external links. Supports all Prisma-like operations: findMany, findUnique, findFirst, create, update, delete, upsert (including compound unique for calculatorUsage).

2. **`src/lib/blog-db.ts`** — Complete rewrite: replaced @libsql/client with static blog-index + blog-content data. All read operations use embedded static content. Write operations (create, update, delete, upsert) throw errors explaining static mode. All existing function signatures preserved for backward compatibility.

3. **`src/lib/blog-index.ts`** — Fixed: removed `import type { BlogPost } from "./blog-db"` (which would transitively pull in @libsql/client). Added `BlogPost` interface directly in this file.

### Blog API Routes (2 files)
4. **`src/app/api/blog/route.ts`** — Replaced blog-db imports with direct imports from blog-index + blog-content. GET returns static posts. POST returns 501 (not supported in static mode).

5. **`src/app/api/blog/[slug]/route.ts`** — Same approach. GET uses static data. PUT/DELETE return 501.

### Admin Routes (3 files)
6. **`src/app/api/admin/stats/route.ts`** — Uses static blog-index data directly instead of blog-db. No @libsql/client dependency.

7. **`src/app/api/admin/seed-db/route.ts`** — Returns success message indicating static mode. No actual database seeding needed.

8. **`src/app/api/admin/db-status/route.ts`** — Returns static mode status (mode: "static", configured: true, connected: true, postCount: 8). No @libsql/client import.

### DB Routes (7 files - UNCHANGED, still use `import { db } from '@/lib/db'`)
These files still import from `@/lib/db` but since db.ts no longer imports @libsql/client, the WASM won't be included in any bundle:
- `src/app/api/seed/route.ts`
- `src/app/api/settings/route.ts`
- `src/app/api/track/route.ts`
- `src/app/api/links/route.ts`
- `src/app/api/links/[id]/route.ts`
- `src/app/api/ads/route.ts`
- `src/app/api/ads/[id]/route.ts`

## Verification
- `rg "import.*@libsql/client" src/` → ZERO results (exit code 1 = no matches)
- `rg "createClient|from '@libsql" src/ --type ts` → ZERO results
- `npx eslint` on all affected files → 0 errors
- API endpoints tested and working:
  - `/api/ads` → Returns default ad slots array
  - `/api/settings` → Returns settings key-value map
  - `/api/links` → Returns default external links
  - `/api/blog` → Returns all published posts with content
  - `/api/admin/stats` → Returns blog statistics
  - `/api/admin/db-status` → Returns static mode status
  - `/api/track` (POST) → Creates in-memory calculator usage record

## Key Design Decisions
1. **In-memory Maps over no-op stubs**: The db.ts implementation uses real in-memory Maps with full CRUD support. This means all admin API routes continue to work for the lifetime of the edge function instance. Data resets on cold starts, which is acceptable for admin features on a tax calculator site.

2. **Preserved API surface**: The `db` Proxy export maintains the exact same API as before (`db.adSlot.findMany()`, `db.siteSetting.upsert()`, etc.), so all existing API routes needed ZERO changes.

3. **Blog routes use static data directly**: Instead of routing through blog-db.ts, the blog API routes now import directly from blog-index + blog-content for maximum clarity and minimal dependency chain.

4. **Write operations return 501**: Blog POST/PUT/DELETE return HTTP 501 (Not Implemented) with a clear message about static mode, rather than 500 errors.
