# Auth.md — TheTaxCalc Agent Authentication

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

## Agent Registration

AI agents can register for access to protected APIs by following these steps:

1. **Discover authentication metadata**: Fetch `/.well-known/oauth-authorization-server` to find the `agent_auth` block
2. **Register**: Visit the `register_uri` URL (`/admin`) to obtain admin credentials
3. **Authenticate**: POST to `/api/auth/login` with the obtained credentials
4. **Receive token**: The server returns a JWT in an HTTP-only cookie
5. **Access protected resources**: Include the cookie in subsequent API requests
6. **Verify token**: GET `/api/auth/verify` to check token validity
7. **Revoke token**: POST `/api/auth/logout` to revoke the session

### Supported Identity Types

- `api_key`: API key-based authentication
- `password`: Password-based authentication

### Supported Credential Types

- `jwt`: JSON Web Token (HS256 signed)
- `cookie`: HTTP-only secure cookie

### Token Claims

- `sub`: Subject (always "admin")
- `role`: User role (always "admin")
- `iat`: Issued at timestamp
- `exp`: Expiration timestamp (24 hours from issuance)

## Rate Limiting

- `/api/auth/login`: 5 attempts per minute per IP
- `/api/track`: 30 requests per minute per IP
- Other endpoints: Standard rate limits apply

## OAuth/OIDC Discovery

- Authorization Server: `/.well-known/oauth-authorization-server`
- OpenID Configuration: `/.well-known/openid-configuration`
- Protected Resource: `/.well-known/oauth-protected-resource`
- JWKS: `/.well-known/jwks.json`

## Contact

- Website: https://thetaxcalc.com
- About: https://thetaxcalc.com/about
- Author: Rachel Mitchell, CPA
- Last updated: 2026-06-19
