# auth.md — TheTaxCalc Agent Authentication

## Overview

TheTaxCalc provides free, no-sign-up tax calculators for US taxpayers. Most tools are publicly accessible without authentication. Protected APIs require agent registration via OAuth 2.0.

## Agent Authentication Metadata

This service publishes `agent_auth` metadata in its OAuth Authorization Server configuration:

**Discovery URL**: `https://thetaxcalc.com/.well-known/oauth-authorization-server`

The `agent_auth` block contains:

```json
{
  "agent_auth": {
    "skill": "agent-registration",
    "register_uri": "https://thetaxcalc.com/admin",
    "methods": [
      {
        "type": "oauth2-client-credentials",
        "documentation": "https://thetaxcalc.com/auth.md#oauth2-client-credentials"
      },
      {
        "type": "api-key",
        "documentation": "https://thetaxcalc.com/auth.md#api-key"
      }
    ]
  }
}
```

## Public APIs (No Auth Required)

- `GET /api/blog` — List all published blog posts
- `POST /api/track` — Track calculator usage (body: `{"calculator": "string"}`)

## Protected APIs (Agent Auth Required)

- `GET/POST/PUT/DELETE /api/admin/*` — Admin panel operations
- `POST /api/blog` — Create blog post
- `POST /api/ads` — Manage ad slots
- `POST /api/settings` — Update site settings

## OAuth2 Client Credentials

AI agents can authenticate using OAuth 2.0 Client Credentials flow:

1. **Discover**: Fetch `https://thetaxcalc.com/.well-known/oauth-authorization-server`
2. **Register**: Visit `register_uri` (`https://thetaxcalc.com/admin`) to obtain client credentials
3. **Token**: POST to `token_endpoint` (`/api/auth/login`) with client credentials
4. **Use**: Include `Authorization: Bearer <token>` header in subsequent requests
5. **Verify**: GET `/api/auth/verify` to check token validity
6. **Revoke**: POST `/api/auth/logout` to revoke the session

## API Key

Agents may also use API key-based authentication:

1. Obtain API key from `https://thetaxcalc.com/admin`
2. Include `X-API-Key: <key>` header in requests
3. Keys are scoped to specific capabilities

## Supported Identity Types

- `api_key`: API key-based authentication
- `password`: Password-based authentication (admin only)

## Supported Credential Types

- `jwt`: JSON Web Token (HS256 signed)
- `cookie`: HTTP-only secure cookie
- `bearer`: Bearer token in Authorization header

## Token Claims

- `sub`: Subject (always "admin")
- `role`: User role (always "admin")
- `iat`: Issued at timestamp
- `exp`: Expiration timestamp (24 hours from issuance)

## Rate Limiting

- `/api/auth/login`: 5 attempts per minute per IP
- `/api/track`: 30 requests per minute per IP
- Other endpoints: Standard rate limits apply

## OAuth/OIDC Discovery Endpoints

- Authorization Server: `/.well-known/oauth-authorization-server`
- OpenID Configuration: `/.well-known/openid-configuration`
- Protected Resource: `/.well-known/oauth-protected-resource`
- JWKS: `/.well-known/jwks.json`
- Agent Card: `/.well-known/agent-card.json`
- MCP Server Card: `/.well-known/mcp/server-card.json`
- Agent Skills: `/.well-known/agent-skills/index.json`

## Contact

- Website: https://thetaxcalc.com
- About: https://thetaxcalc.com/about
- Author: Rachel Mitchell, CPA
- Last updated: 2026-06-20
