---
Task ID: 1
Agent: Main Agent
Task: Deploy TheTaxCalc to Cloudflare Pages

Work Log:
- Replaced Prisma ORM with lightweight @libsql/client/web (HTTP-only, no WASM) in src/lib/db.ts
- Removed 17 unused dependencies from package.json (Prisma, sharp, next-auth, framer-motion, date-fns, react-syntax-highlighter, @mdxeditor/editor, etc.)
- Converted calculator, compare, salary pages to static with generateStaticParams (no edge runtime needed)
- Converted blog listing page to static
- Converted robots.ts to static
- Removed dynamic image generators (icon.tsx, apple-icon.tsx, opengraph-image.tsx)
- Blog detail page uses API fetch instead of direct DB import for SEO metadata
- Sitemap and feed.xml remain edge runtime for dynamic blog data
- Bundle size reduced from 22.7 MiB to 6.2 MiB
- Successfully deployed to Cloudflare Pages via wrangler CLI
- Set environment variables: TURSO_DATABASE_URL, TURSO_AUTH_TOKEN, DATABASE_URL, NEXT_PUBLIC_SITE_URL
- Added custom domains: thetaxcalc.com and www.thetaxcalc.com (pending CNAME setup)
- Pushed all changes to GitHub (masamesoo11/thetaxcalc)

Stage Summary:
- TheTaxCalc is live at https://thetaxcalc.pages.dev
- Custom domain thetaxcalc.com needs CNAME DNS records to be added manually
- CNAME: thetaxcalc.com → thetaxcalc.pages.dev
- CNAME: www.thetaxcalc.com → thetaxcalc.pages.dev
- API Token needs Zone:DNS:Edit permission to add records automatically

---
Task ID: 2
Agent: Main Agent
Task: Fix Google Search Console "Not indexable" issue

Work Log:
- Identified root cause: public/robots.txt had WRONG sitemap URL (taxyield.io instead of thetaxcalc.com)
- The static public/robots.txt was overriding the dynamic src/app/robots.ts route handler
- Deleted public/robots.txt so src/app/robots.ts is the single source of truth
- Fixed src/app/robots.ts to use SITE_URL for correct sitemap and host URLs
- Fixed src/app/sitemap.ts - removed edge runtime export, kept db.post.findMany with dynamic import
- Updated src/lib/site-config.ts default to https://thetaxcalc.com (custom domain is now working)
- Fixed layout.tsx: removed placeholder Google verification code, made it dynamic via NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION env var
- Removed broken OpenGraph image references from layout.tsx and page.tsx (image generation routes were removed earlier)
- Fixed Organization JSON-LD logo URL from /icon to /favicon.svg
- Fixed about/page.tsx logo reference from opengraph-image to favicon.svg
- Fixed public/manifest.json: changed name from "TaxYield.io" to "TheTaxCalc", fixed icon paths
- Updated Cloudflare Pages secret NEXT_PUBLIC_SITE_URL=https://thetaxcalc.com
- Rebuilt and redeployed with correct NEXT_PUBLIC_SITE_URL embedded at build time
- Verified custom domain thetaxcalc.com and www.thetaxcalc.com are both resolving and serving the site
- Confirmed robots.txt, sitemap.xml, canonical URLs, and meta tags are all correct

Stage Summary:
- ROOT CAUSE: public/robots.txt with old domain (taxyield.io) was overriding dynamic robots.ts
- Site now has correct robots.txt with Sitemap: https://thetaxcalc.com/sitemap.xml
- All canonical URLs point to https://thetaxcalc.com
- Custom domain thetaxcalc.com is fully working (DNS was already set up)
- Google Search Console verification is ready via NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION env var
- Remaining: User needs to add thetaxcalc.com property in Google Search Console and set verification code

---
Task ID: 3
Agent: Main Agent
Task: Fix persistent "Not indexable" issue - add X-Robots-Tag header

Work Log:
- Investigated HTTP response headers on both thetaxcalc.com and thetaxcalc.pages.dev
- No x-robots-tag: noindex found in headers, but no positive signal either
- Searched web for Cloudflare Pages indexing issues - found known issue with .pages.dev domains
- Created public/_headers file with explicit X-Robots-Tag: all for all pages
- Added X-Robots-Tag: noindex, nofollow for /api/* and /admin routes
- Attempted Cloudflare Transform Rule for .pages.dev noindex (API token lacks permission)
- Rebuilt and redeployed with _headers file
- Verified X-Robots-Tag: all is now in response headers for thetaxcalc.com
- All SEO signals are now correct: HTTP header + meta tag + canonical + robots.txt + sitemap.xml

Stage Summary:
- X-Robots-Tag: all now explicitly set in HTTP response headers
- Site is fully SEO-compliant for Google indexing
- Google Search Console may take days to re-crawl and update status
- User needs to request re-indexing in Google Search Console or wait for natural re-crawl
- Recommendation: Add thetaxcalc.com as a new property in GSC (not just thetaxcalc.pages.dev)
