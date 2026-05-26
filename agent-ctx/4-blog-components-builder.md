# Task 4 - Blog Components Builder

## Summary
Built 3 blog components (blog-list, blog-detail, blog-editor) for TaxYield.io, integrated them into the hash-based SPA routing, and added Blog navigation to the header.

## Files Created
- `/src/components/finance/blog-list.tsx` — Blog listing page with grid, search/filter, featured posts
- `/src/components/finance/blog-detail.tsx` — Blog post detail with markdown rendering, TOC, sharing
- `/src/components/finance/blog-editor.tsx` — Admin blog post editor with preview mode

## Files Modified
- `/src/app/page.tsx` — Added blog route handling (#blog, #blog/slug, #admin/blog/edit/slug, #admin/blog/new)
- `/src/components/finance/header.tsx` — Added Blog nav item with BookOpen icon
- `/src/components/finance/admin-settings.tsx` — Fixed pre-existing lint error (useEffect+setState → useMemo derived state)

## Key Decisions
- Used @tanstack/react-query for all data fetching
- Used react-markdown with custom component overrides for styled content rendering
- Blog components receive `onNavigate` callback for hash-based navigation
- Header highlights "Blog" for all blog sub-routes using derived `headerPage`
- Auto-slug generation in editor with manual override toggle
- SEO: JSON-LD schemas for ItemList, Article, and BreadcrumbList

## Lint Status
All files pass ESLint cleanly. Pre-existing error in admin-settings.tsx also fixed.
