---
Task ID: 1
Agent: Main Agent
Task: Implement server-side authentication for admin panel

Work Log:
- Installed `jose` package for JWT (edge runtime compatible)
- Created `src/lib/auth.ts` - JWT session token helpers (create, verify, validate password)
- Created `src/app/api/auth/login/route.ts` - POST login with HTTP-only cookie
- Created `src/app/api/auth/logout/route.ts` - POST logout, clears cookie
- Created `src/app/api/auth/verify/route.ts` - GET check session validity
- Created `src/proxy.ts` (Next.js 16 proxy convention) - protects admin routes and API mutations
- Rewrote `src/components/finance/admin-gate.tsx` - uses server-side auth API instead of client-side password
- Updated `.env` with `ADMIN_PASSWORD` and `JWT_SECRET` (server-side only, no NEXT_PUBLIC_)
- Removed hardcoded password from client code
- Removed client-side session storage auth (replaced with HTTP-only cookie JWT)

Stage Summary:
- Full server-side auth system implemented with JWT + HTTP-only cookies
- Middleware (proxy.ts) protects: /admin, /api/admin/*, and all mutation API routes (POST/PUT/DELETE on /api/blog, /api/ads, /api/settings, /api/links)
- Public GET endpoints remain open for site functionality
- Password is no longer exposed in client-side JavaScript
- Sessions expire after 24 hours
- All tests pass: login, verify, protected routes, public routes
