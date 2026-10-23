/**
 * Syndication Pipeline — dev.to + Medium adapters
 *
 * Publishes new blog posts to dev.to (and optionally Medium) with a
 * canonical_url pointing back to https://thetaxcalc.com/blog/{slug}, so the
 * syndicated copy never competes with the original in search results while
 * earning referral traffic + brand mentions.
 *
 * ARCHITECTURE (built for Cloudflare Pages static-mode reality):
 * - Blog posts are static content, not database rows: production keeps
 *   article bodies in content/blog/*.json (read at build time by the SSG
 *   pipeline) and post metadata in blog-index.ts. New posts arrive via code
 *   deploys. For runtime access by /api/syndicate (Workers have no fs),
 *   scripts/generate-syndication-content.mjs compiles a committed map at
 *   src/generated/syndication-content.json — see lib/syndication-content.ts.
 * - Syndication state is STATELESS: the source of truth is dev.to itself.
 *   We list the account's dev.to articles (GET /api/articles/me/all) and diff
 *   their canonical_url fields against our static blog index. No database,
 *   no localStorage records needed for dedup.
 * - The automatic trigger is a Cloudflare Pages Deploy Hook that POSTs to
 *   /api/syndicate?token=... after every successful deploy.
 * - All external API calls run SERVER-SIDE (the site CSP allows
 *   connect-src 'self' only — the browser never talks to dev.to directly).
 *
 * This module is ISOMORPHIC + EDGE-SAFE: pure TypeScript + fetch only.
 */

import { SITE_URL } from './site-config';
import type { BlogPost } from './blog-index';

// ─── API Endpoints ──────────────────────────────────────────────────────────

const DEVTO_API = 'https://dev.to/api';
const MEDIUM_API = 'https://api.medium.com/v1';

/** dev.to reserved tags that require special account permissions */
const DEVTO_BLOCKED_TAGS = new Set(['help', 'meta', 'announce', 'challenge']);

// ─── Types ─────────────────────────────────────────────────────────────────

export interface DevtoArticleInfo {
  id: number;
  title: string;
  slug: string;
  canonicalUrl: string;
  published: boolean;
  publishedAt: string;
  editedAt: string;
  url: string;
}

export interface SitePostInfo {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string;
  coverImage: string;
  content: string;
  updatedAt: string;
}

export type SyndicationStatus =
  | 'new'            // not on dev.to yet
  | 'syndicated'     // on dev.to, matches
  | 'stale';         // on dev.to but site post updated after last syndication

export interface SyndicationItem {
  slug: string;
  title: string;
  category: string;
  status: SyndicationStatus;
  hasContent: boolean;
  devto?: DevtoArticleInfo;
}

export type SyndicationMode = 'full' | 'teaser';

export interface DevtoPayload {
  title: string;
  published: boolean;
  body_markdown: string;
  tags: string[];
  canonical_url: string;
  main_image?: string;
}

export interface PublishResult {
  slug: string;
  ok: boolean;
  url?: string;
  id?: string;
  error?: string;
}

// ─── Content Formatting ─────────────────────────────────────────────────────

/**
 * Make relative markdown links/images absolute so they survive on dev.to/Medium.
 * Handles: [text](/path), [text](/path "title"), ![alt](/img.png)
 */
export function absolutizeMarkdownLinks(markdown: string, baseUrl: string): string {
  const normalizedBase = baseUrl.replace(/\/$/, '');
  const linkRe = /(\[[^\]]*\]\()\/((?:[^()\s]|\([^()\s]*\))*[^()\s]*)?(\))/g;
  return markdown.replace(linkRe, (_m, open: string, path: string, close: string) => {
    return `${open}${normalizedBase}/${path ?? ''}${close}`;
  });
}

/**
 * dev.to and Medium render the article title themselves — a leading `# H1`
 * inside the body would show the title twice. Strip it if present.
 */
export function stripLeadingH1(markdown: string, title: string): string {
  const trimmed = markdown.replace(/^\s+/, '');
  const h1Match = trimmed.match(/^#\s+(.+)$/m);
  if (h1Match) {
    const h1 = h1Match[1].trim();
    const normalizedTitle = title.trim().toLowerCase();
    // Strip ANY leading H1 (it duplicates the title field) — safest behavior
    if (h1.toLowerCase() === normalizedTitle || trimmed.startsWith('# ')) {
      return trimmed.replace(/^#\s+.+\r?\n?/, '').replace(/^\s+/, '');
    }
  }
  return trimmed;
}

/**
 * Sanitize comma-separated site tags for dev.to: lowercase, a-z0-9,
 * single words (hyphens stripped — dev.to API rejects hyphenated tags), ≤ 30
 * chars each, max 4 tags, deduped, reserved tags dropped.
 * Falls back to category-derived tags when nothing valid remains.
 */
export function sanitizeTagsForDevto(tags: string, category: string): string[] {
  // dev.to's current API rejects hyphenated tags ("non-alphanumeric" error)
  // even though legacy hyphenated tags exist — join compound words instead
  // ("self-employment" -> "selfemployment", a real popular dev.to tag).
  const clean = (t: string) =>
    t
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .replace(/-/g, '');

  const seen = new Set<string>();
  const result: string[] = [];

  const candidates = [...tags.split(','), category, 'taxes', 'finance'];
  for (const raw of candidates) {
    if (result.length >= 4) break;
    const t = clean(raw);
    if (t.length < 2 || t.length > 30) continue;
    if (DEVTO_BLOCKED_TAGS.has(t)) continue;
    if (seen.has(t)) continue;
    seen.add(t);
    result.push(t);
  }
  return result;
}

/** The canonical URL of a site blog post — the dedup key everywhere */
export function canonicalForSlug(slug: string): string {
  return `${SITE_URL.replace(/\/$/, '')}/blog/${slug}`;
}

/** Credit + CTA footer appended to every syndicated copy */
export function buildCreditFooter(slug: string): string {
  const canonical = canonicalForSlug(slug);
  const home = SITE_URL.replace(/\/$/, '');
  return [
    '',
    '---',
    '',
    `*This guide was originally published on [TheTaxCalc](${canonical}).*`,
    '',
    `**Run your exact numbers for free — no signup, no email required:**`,
    '',
    `- [Paycheck Calculator — all 50 states](${home}/)`,
    `- [State Tax Comparison](${home}/compare)`,
    `- [Free Tax Data & Statistics](${home}/tax-data)`,
    '',
  ].join('\n');
}

/** Extract the first ~3 paragraphs for teaser mode */
function extractTeaser(markdown: string, maxWords = 120): string {
  const blocks = markdown.split(/\n\s*\n/);
  const out: string[] = [];
  let words = 0;
  for (const block of blocks) {
    const blockWords = block.split(/\s+/).length;
    out.push(block);
    words += blockWords;
    if (words >= maxWords) break;
  }
  return out.join('\n\n');
}

/**
 * Build the teaser body for a post: absolutized links, leading H1 stripped,
 * first ~150 words, a "read the complete guide" link and the credit footer.
 * Shared by the Telegraph channel (which must stay teaser-only because it
 * has no canonical_url support) and teaser-mode previews.
 */
export function buildTeaserBody(post: SitePostInfo, maxWords = 150): string {
  let body = absolutizeMarkdownLinks(post.content || '', SITE_URL);
  body = stripLeadingH1(body, post.title);
  body = extractTeaser(body, maxWords);
  body += `\n\n*This is a preview — [read the complete guide on TheTaxCalc](${canonicalForSlug(post.slug)}).*`;
  body += buildCreditFooter(post.slug);
  return body;
}

/**
 * Build the exact dev.to payload for a site post.
 * Full mode = entire article (canonical_url handles SEO);
 * Teaser mode = opening paragraphs + "read the full guide" link.
 */
export function buildDevtoPayload(
  post: SitePostInfo,
  opts: { mode?: SyndicationMode; published?: boolean } = {}
): DevtoPayload {
  const mode = opts.mode ?? 'full';
  const published = opts.published ?? true;

  let body = absolutizeMarkdownLinks(post.content || '', SITE_URL);
  body = stripLeadingH1(body, post.title);

  if (mode === 'teaser') {
    body = extractTeaser(body);
    body += `\n\n*This is a preview — [read the complete guide on TheTaxCalc](${canonicalForSlug(post.slug)}).*`;
  }

  body += buildCreditFooter(post.slug);

  const payload: DevtoPayload = {
    title: post.title.length > 128 ? `${post.title.slice(0, 125)}...` : post.title,
    published,
    body_markdown: body,
    tags: sanitizeTagsForDevto(post.tags, post.category),
    canonical_url: canonicalForSlug(post.slug),
  };

  if (post.coverImage) {
    payload.main_image = post.coverImage.startsWith('http')
      ? post.coverImage
      : `${SITE_URL.replace(/\/$/, '')}${post.coverImage}`;
  }

  return payload;
}

// ─── BlogPost → SitePostInfo ────────────────────────────────────────────────

export function toSitePostInfo(post: BlogPost): SitePostInfo {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    tags: post.tags,
    coverImage: post.coverImage,
    content: post.content,
    updatedAt: post.updatedAt,
  };
}

// ─── dev.to API Wrappers ────────────────────────────────────────────────────

interface DevtoResponse {
  ok: boolean;
  status: number;
  data?: unknown;
  error?: string;
}

async function devtoFetch(
  path: string,
  apiKey: string,
  init?: RequestInit
): Promise<DevtoResponse> {
  return foremRequest(`${DEVTO_API}${path}`, 'dev.to', apiKey, init);
}

/**
 * Shared request helper for every Forem platform (dev.to IS a Forem instance).
 * Parameterized by full API endpoint URL + human label for error messages.
 */
async function foremRequest(
  url: string,
  label: string,
  apiKey: string,
  init?: RequestInit
): Promise<DevtoResponse> {
  try {
    const res = await fetch(url, {
      ...init,
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        'User-Agent': 'TheTaxCalc-Syndication/1.0',
        ...(init?.headers ?? {}),
      },
    });

    const text = await res.text();
    let data: unknown;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = null;
    }

    if (!res.ok) {
      const error =
        (data && typeof data === 'object' && 'error' in data
          ? String((data as { error: unknown }).error)
          : null) ?? `${label} API error (HTTP ${res.status})`;
      return {
        ok: false,
        status: res.status,
        error:
          res.status === 401
            ? label === 'dev.to'
              ? 'Invalid dev.to API key (401 Unauthorized). Generate a fresh key at dev.to → Settings → Extensions.'
              : `${label} rejected the API key (401). Generate a fresh key in that community's Settings → Extensions.`
            : res.status === 429
              ? `${label} rate limit hit (429). Wait a minute and retry.`
              : error,
      };
    }
    return { ok: true, status: res.status, data };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      error: `Network error reaching ${label}: ${err instanceof Error ? err.message : 'unknown'}`,
    };
  }
}

/** Verify a dev.to API key — returns the account username on success */
export async function devtoVerify(apiKey: string): Promise<{ ok: boolean; username?: string; error?: string }> {
  if (!apiKey?.trim()) return { ok: false, error: 'No dev.to API key provided' };
  const res = await devtoFetch('/users/me', apiKey);
  if (!res.ok) return { ok: false, error: res.error };
  const user = res.data as { username?: string; name?: string } | null;
  return { ok: true, username: user?.username || user?.name || 'unknown' };
}

/** List ALL articles of the authenticated account (published + drafts) */
export async function devtoListArticles(apiKey: string): Promise<{ ok: boolean; articles?: DevtoArticleInfo[]; error?: string }> {
  const res = await devtoFetch('/articles/me/all?per_page=100&page=1', apiKey);
  if (!res.ok) return { ok: false, error: res.error };
  const raw = Array.isArray(res.data) ? (res.data as Record<string, unknown>[]) : [];

  const articles: DevtoArticleInfo[] = raw.map((a) => ({
    id: Number(a.id) || 0,
    title: String(a.title ?? ''),
    slug: String(a.slug ?? ''),
    canonicalUrl: String(a.canonical_url ?? ''),
    published: Boolean(a.published),
    publishedAt: String(a.published_at ?? ''),
    editedAt: String(a.edited_at ?? a.published_at ?? ''),
    url: a.url ? String(a.url) : `https://dev.to/${String(a.slug ?? '')}`,
  }));

  return { ok: true, articles };
}

/** Create a new dev.to article. Returns id + url. */
export async function devtoCreate(
  apiKey: string,
  payload: DevtoPayload
): Promise<{ ok: boolean; id?: string; url?: string; error?: string }> {
  const res = await devtoFetch('/articles', apiKey, {
    method: 'POST',
    body: JSON.stringify({ article: payload }),
  });
  if (!res.ok) return { ok: false, error: res.error };
  const article = res.data as Record<string, unknown>;
  return {
    ok: true,
    id: String(article.id ?? ''),
    url: article.url ? String(article.url) : undefined,
  };
}

/** Update an existing dev.to article in place (keeps a single copy per post) */
export async function devtoUpdate(
  apiKey: string,
  articleId: number,
  payload: DevtoPayload
): Promise<{ ok: boolean; id?: string; url?: string; error?: string }> {
  const res = await devtoFetch(`/articles/${articleId}`, apiKey, {
    method: 'PUT',
    body: JSON.stringify({ article: payload }),
  });
  if (!res.ok) return { ok: false, error: res.error };
  const article = res.data as Record<string, unknown>;
  return {
    ok: true,
    id: String(article.id ?? articleId),
    url: article.url ? String(article.url) : undefined,
  };
}

// ─── Diff Engine (stateless dedup via canonical_url) ─────────────────────────

/**
 * Compare site posts against the account's dev.to articles.
 * Matching key = canonical_url (or URL containing /blog/{slug}).
 */
export function diffSyndication(
  sitePosts: SitePostInfo[],
  devtoArticles: DevtoArticleInfo[]
): SyndicationItem[] {
  const byCanonical = new Map<string, DevtoArticleInfo>();
  const bySlug = new Map<string, DevtoArticleInfo>();

  for (const a of devtoArticles) {
    if (a.canonicalUrl) byCanonical.set(a.canonicalUrl.replace(/\/$/, ''), a);
    const m = a.canonicalUrl.match(/\/blog\/([^/?#]+)/);
    if (m) bySlug.set(m[1], a);
  }

  return sitePosts.map((post) => {
    const canonical = canonicalForSlug(post.slug).replace(/\/$/, '');
    const match = byCanonical.get(canonical) ?? bySlug.get(post.slug);
    const hasContent = Boolean(post.content?.trim());

    if (!match) {
      return { slug: post.slug, title: post.title, category: post.category, status: 'new' as const, hasContent };
    }

    const siteUpdated = new Date(post.updatedAt).getTime() || 0;
    const devtoEdited = new Date(match.editedAt).getTime() || 0;
    const stale = siteUpdated > 0 && devtoEdited > 0 && siteUpdated > devtoEdited;

    return {
      slug: post.slug,
      title: post.title,
      category: post.category,
      status: stale ? ('stale' as const) : ('syndicated' as const),
      hasContent,
      devto: match,
    };
  });
}

// ─── Medium Adapter (optional / experimental) ────────────────────────────────

/**
 * NOTE: Medium froze integration-token generation for most accounts — the API
 * is de facto deprecated. We keep the adapter so accounts that already hold a
 * working token can use it, but dev.to is the primary channel.
 */
export async function mediumVerify(token: string): Promise<{ ok: boolean; userId?: string; name?: string; error?: string }> {
  if (!token?.trim()) return { ok: false, error: 'No Medium token provided' };
  try {
    const res = await fetch(`${MEDIUM_API}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      return {
        ok: false,
        error:
          res.status === 401
            ? 'Invalid Medium integration token (401). Note: Medium no longer issues new tokens for most accounts.'
            : `Medium API error (HTTP ${res.status})`,
      };
    }
    const body = (await res.json()) as { data?: { id?: string; name?: string } };
    return { ok: true, userId: body.data?.id, name: body.data?.name };
  } catch (err) {
    return { ok: false, error: `Network error reaching Medium: ${err instanceof Error ? err.message : 'unknown'}` };
  }
}

export async function mediumPublish(
  token: string,
  userId: string,
  post: SitePostInfo,
  opts: { mode?: SyndicationMode; publishStatus?: 'public' | 'draft' } = {}
): Promise<{ ok: boolean; id?: string; url?: string; error?: string }> {
  const payload = buildDevtoPayload(post, { mode: opts.mode ?? 'full' });
  try {
    const res = await fetch(`${MEDIUM_API}/users/${userId}/posts`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: payload.title,
        contentFormat: 'markdown',
        content: payload.body_markdown,
        canonicalUrl: payload.canonical_url,
        tags: payload.tags.slice(0, 5),
        publishStatus: opts.publishStatus ?? 'public',
      }),
    });
    if (!res.ok) {
      return { ok: false, error: `Medium API error (HTTP ${res.status})` };
    }
    const body = (await res.json()) as { data?: { id?: string; url?: string } };
    return { ok: true, id: body.data?.id, url: body.data?.url };
  } catch (err) {
    return { ok: false, error: `Network error reaching Medium: ${err instanceof Error ? err.message : 'unknown'}` };
  }
}

// ─── Key Masking (for API responses — never echo keys back) ──────────────────

export function maskKey(key: string | undefined): string {
  if (!key) return '';
  const k = key.trim();
  if (k.length <= 8) return '••••••••';
  return `${k.slice(0, 4)}••••${k.slice(-4)}`;
}

// ─── Generic Forem adapter (any dev.to-compatible community) ─────────────────

/**
 * The dev.to public API IS the Forem platform API — every Forem community
 * (dev.to, community.codenewbie.org, forem.dev, …) exposes the same
 * /api/articles contract and issues its own API keys under
 * Settings → Extensions. These wrappers parameterize the base URL so posts
 * can be syndicated to ANY Forem community the admin holds an API key for.
 */

/** Normalize user/env input into a canonical https://host/api base (or null). */
export function normalizeForemBase(input: string): string | null {
  let s = (input ?? '').trim();
  if (!s) return null;
  if (!/^https?:\/\//i.test(s)) s = `https://${s}`;
  s = s.replace(/\/+$/, '');
  if (!/\/api$/i.test(s)) s = `${s}/api`;
  try {
    const u = new URL(s);
    if (u.protocol !== 'https:') return null;
    if (!u.hostname.includes('.')) return null; // reject "localhost"-style input
    return s;
  } catch {
    return null;
  }
}

export async function foremVerify(
  foremBase: string,
  apiKey: string
): Promise<{ ok: boolean; username?: string; error?: string }> {
  if (!apiKey?.trim()) return { ok: false, error: 'No API key provided for this Forem community' };
  const res = await foremRequest(`${foremBase}/users/me`, 'Forem', apiKey);
  if (!res.ok) return { ok: false, error: res.error };
  const user = res.data as { username?: string; name?: string } | null;
  return { ok: true, username: user?.username || user?.name || 'unknown' };
}

export async function foremListArticles(
  foremBase: string,
  apiKey: string
): Promise<{ ok: boolean; articles?: DevtoArticleInfo[]; error?: string }> {
  const res = await foremRequest(`${foremBase}/articles/me/all?per_page=100&page=1`, 'Forem', apiKey);
  if (!res.ok) return { ok: false, error: res.error };
  const raw = Array.isArray(res.data) ? (res.data as Record<string, unknown>[]) : [];
  const articles: DevtoArticleInfo[] = raw.map((a) => ({
    id: Number(a.id) || 0,
    title: String(a.title ?? ''),
    slug: String(a.slug ?? ''),
    canonicalUrl: String(a.canonical_url ?? ''),
    published: Boolean(a.published),
    publishedAt: String(a.published_at ?? ''),
    editedAt: String(a.edited_at ?? a.published_at ?? ''),
    url: a.url ? String(a.url) : foremBase,
  }));
  return { ok: true, articles };
}

export async function foremCreate(
  foremBase: string,
  apiKey: string,
  payload: DevtoPayload
): Promise<{ ok: boolean; id?: string; url?: string; error?: string }> {
  const res = await foremRequest(`${foremBase}/articles`, 'Forem', apiKey, {
    method: 'POST',
    body: JSON.stringify({ article: payload }),
  });
  if (!res.ok) return { ok: false, error: res.error };
  const article = res.data as Record<string, unknown>;
  return {
    ok: true,
    id: String(article.id ?? ''),
    url: article.url ? String(article.url) : undefined,
  };
}

export async function foremUpdate(
  foremBase: string,
  apiKey: string,
  articleId: number,
  payload: DevtoPayload
): Promise<{ ok: boolean; id?: string; url?: string; error?: string }> {
  const res = await foremRequest(`${foremBase}/articles/${articleId}`, 'Forem', apiKey, {
    method: 'PUT',
    body: JSON.stringify({ article: payload }),
  });
  if (!res.ok) return { ok: false, error: res.error };
  const article = res.data as Record<string, unknown>;
  return {
    ok: true,
    id: String(article.id ?? articleId),
    url: article.url ? String(article.url) : undefined,
  };
}

// ─── Telegraph adapter (telegra.ph — free, zero-account, teaser-only) ────────

const TELEGRAPH_API = 'https://api.telegra.ph';
const TELEGRAPH_AUTHOR_NAME = 'TheTaxCalc';

/** Telegraph's allowed-node subset: string | {tag, attrs, children}. */
export type TelegraphNode =
  | string
  | {
      tag:
        | 'a' | 'aside' | 'b' | 'blockquote' | 'br' | 'code' | 'em'
        | 'figcaption' | 'figure' | 'h3' | 'h4' | 'hr' | 'i' | 'img'
        | 'li' | 'ol' | 'p' | 'pre' | 's' | 'strong' | 'u' | 'ul';
      attrs?: Record<string, string>;
      children?: TelegraphNode[];
    };

async function telegraphCall(
  method: string,
  params: Record<string, unknown>
): Promise<{ ok: boolean; result?: Record<string, unknown>; error?: string }> {
  try {
    const res = await fetch(`${TELEGRAPH_API}/${method}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    const body = (await res.json()) as { ok?: boolean; result?: Record<string, unknown>; error?: string };
    if (!body.ok) {
      return { ok: false, error: body.error ? `Telegraph: ${body.error}` : `Telegraph API error (HTTP ${res.status})` };
    }
    return { ok: true, result: body.result };
  } catch (err) {
    return { ok: false, error: `Network error reaching telegra.ph: ${err instanceof Error ? err.message : 'unknown'}` };
  }
}

/** Parse inline markdown (links, bold, italics, code, images) into Telegraph nodes. */
function inlineToTelegraph(text: string, depth = 0): TelegraphNode[] {
  if (!text) return [''];
  if (depth > 2) return [text.replace(/\*\*|\*|`/g, '')];

  const out: TelegraphNode[] = [];
  const re =
    /!\[[^\]]*\]\(\s*([^)\s]+)[^)]*\)|\[([^\]]+)\]\(\s*([^)\s]+)[^)]*\)|\*\*([\s\S]+?)\*\*|`([^`]+)`|\*([^*\n]+)\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] !== undefined) {
      out.push({ tag: 'img', attrs: { src: m[1] } });
    } else if (m[2] !== undefined) {
      out.push({ tag: 'a', attrs: { href: m[3] ?? '' }, children: inlineToTelegraph(m[2], depth + 1) });
    } else if (m[4] !== undefined) {
      out.push({ tag: 'strong', children: inlineToTelegraph(m[4], depth + 1) });
    } else if (m[5] !== undefined) {
      out.push({ tag: 'code', children: [m[5]] });
    } else if (m[6] !== undefined) {
      out.push({ tag: 'em', children: inlineToTelegraph(m[6], depth + 1) });
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out.length ? out : [text];
}

/**
 * Convert (teaser) markdown into Telegraph's node tree. Covers the block
 * grammar our teasers actually contain: paragraphs, headings (→ h3/h4 —
 * Telegraph has no h1/h2), bullet/ordered lists, blockquotes, hr, code
 * fences; table rows and anything exotic fall back to plain paragraphs.
 */
export function markdownToTelegraphNodes(markdown: string): TelegraphNode[] {
  const nodes: TelegraphNode[] = [];
  const lines = markdown.split(/\r?\n/);
  let para: string[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;
  let codeBuf: string[] | null = null;

  const flushPara = () => {
    if (para.length) {
      nodes.push({ tag: 'p', children: inlineToTelegraph(para.join(' ').replace(/\|/g, ' ')) });
      para = [];
    }
  };
  const flushList = () => {
    if (list) {
      nodes.push({
        tag: list.ordered ? 'ol' : 'ul',
        children: list.items.map((i) => ({ tag: 'li', children: inlineToTelegraph(i) })),
      });
      list = null;
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();

    if (codeBuf !== null) {
      if (line.trim().startsWith('```')) {
        nodes.push({ tag: 'pre', children: [codeBuf.join('\n')] });
        codeBuf = null;
      } else {
        codeBuf.push(raw);
      }
      continue;
    }
    if (line.trim().startsWith('```')) {
      flushPara();
      flushList();
      codeBuf = [];
      continue;
    }

    if (!line.trim()) {
      flushPara();
      flushList();
      continue;
    }

    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      flushPara();
      flushList();
      nodes.push({ tag: h[1].length <= 2 ? 'h3' : 'h4', children: inlineToTelegraph(h[2]) });
      continue;
    }

    if (/^\s*([-*_])\s*\1\s*\1[\s\-*_]*$/.test(line)) {
      flushPara();
      flushList();
      nodes.push({ tag: 'hr' });
      continue;
    }

    const ul = line.match(/^\s*[-*+]\s+(.*)$/);
    if (ul) {
      flushPara();
      if (!list || list.ordered) {
        flushList();
        list = { ordered: false, items: [] };
      }
      list.items.push(ul[1]);
      continue;
    }

    const ol = line.match(/^\s*\d+[.)]\s+(.*)$/);
    if (ol) {
      flushPara();
      if (!list || !list.ordered) {
        flushList();
        list = { ordered: true, items: [] };
      }
      list.items.push(ol[1]);
      continue;
    }

    const bq = line.match(/^\s*>\s?(.*)$/);
    if (bq) {
      flushPara();
      flushList();
      nodes.push({ tag: 'blockquote', children: inlineToTelegraph(bq[1]) });
      continue;
    }

    para.push(line.trim());
  }
  if (codeBuf !== null && codeBuf.length) nodes.push({ tag: 'pre', children: [codeBuf.join('\n')] });
  flushPara();
  flushList();
  return nodes;
}

/**
 * Publish a post to telegra.ph as a TEASER (no canonical support on Telegraph —
 * full copies would create duplicate content, so only the opening paragraphs
 * + a "read the full guide" link go out). Telegraph requires an access_token
 * but has no listing API and accounts are free/anonymous: mint a throwaway
 * account per page and carry author attribution on the page itself.
 */
export async function telegraphPublish(
  post: SitePostInfo
): Promise<{ ok: boolean; url?: string; error?: string }> {
  const home = SITE_URL.replace(/\/$/, '');
  const teaser = buildTeaserBody(post);
  const content = markdownToTelegraphNodes(teaser);
  const title = post.title.length > 250 ? `${post.title.slice(0, 247)}...` : post.title;

  const acct = await telegraphCall('createAccount', {
    short_name: TELEGRAPH_AUTHOR_NAME,
    author_name: TELEGRAPH_AUTHOR_NAME,
    author_url: home,
  });
  if (!acct.ok) return { ok: false, error: acct.error };
  const accessToken = (acct.result as { access_token?: string } | undefined)?.access_token;
  if (!accessToken) return { ok: false, error: 'Telegraph did not return an access token' };

  const page = await telegraphCall('createPage', {
    access_token: accessToken,
    title,
    content,
    author_name: TELEGRAPH_AUTHOR_NAME,
    author_url: home,
    return_content: false,
  });
  if (!page.ok) return { ok: false, error: page.error };
  const url = (page.result as { url?: string } | undefined)?.url;
  return { ok: Boolean(url), url, error: url ? undefined : 'Telegraph returned no URL' };
}
