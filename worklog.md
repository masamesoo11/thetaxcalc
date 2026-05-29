---
Task ID: 1-8
Agent: Main Agent
Task: Fix all Screaming Frog SEO audit issues for TheTaxCalc

Work Log:
- Fixed page titles over 60 chars: federal-tax-brackets, compare pages
- Fixed page titles under 30 chars: 3 blog posts (FICA, Illinois, Texas)
- Fixed meta descriptions over 155 chars: 7 pages (paycheck, IL, CA, NY calculators + 4 blog posts)
- Fixed H2 duplicate issues: Made unique H2s on about, privacy, terms, salary pages
- Fixed H2 non-sequential: Changed comparison cards from H2 to H3, added section H2
- Added metadata to 404 page (title, description, robots noindex)
- Verified all external links have rel="noopener noreferrer nofollow"
- Added CSP header to public/_headers for Cloudflare Pages
- Reverted problematic ssr:false dynamic imports that broke Next.js 16 server components
- Created DynamicProviders client component wrapper for layout.tsx
- Fixed layout.tsx to use client component wrapper for Toaster, SeoNavigation, CookieConsent

Stage Summary:
- All page titles now 30-60 chars (with template)
- All meta descriptions under 155 chars
- H2 headings are unique and sequential on each page
- 404 page has proper noindex metadata
- Security headers complete in _headers and middleware.ts
- Site compiles and serves HTTP 200 on all pages
