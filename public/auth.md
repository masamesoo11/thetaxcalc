# TheTaxCalc — Agent Authentication

## Overview

TheTaxCalc provides free, no-sign-up tax calculators for US taxpayers. Most tools are publicly accessible without authentication.

## Public APIs (No Auth Required)

- `GET /api/blog` — List all published blog posts
- `POST /api/track` — Track calculator usage (body: `{"calculator": "string"}`)

## Protected APIs (Admin Auth Required)

- `GET/POST/PUT/DELETE /api/admin/*` — Admin panel operations
- `POST /api/blog` — Create blog post
- `POST /api/ads` — Manage ad slots
- `POST /api/settings` — Update site settings

## Authentication Method

Admin authentication uses JWT tokens via HTTP-only cookies:

1. POST to `/api/auth/login` with body: `{"password": "your-password"}`
2. Server returns `Set-Cookie: thetaxcalc_admin_session=<jwt>; HttpOnly; Secure; SameSite=Lax`
3. Include this cookie in subsequent requests to protected endpoints
4. POST to `/api/auth/logout` to clear the session

## Rate Limiting

- `/api/auth/login`: 5 attempts per minute per IP
- `/api/track`: 30 requests per minute per IP
- Other endpoints: Standard rate limits apply

## Contact

- Website: https://thetaxcalc.com
- About: https://thetaxcalc.com/about
- Author: Rachel Mitchell, CPA

Last updated: 2026-06-19
