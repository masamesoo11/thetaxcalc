import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, getCookieName } from '@/lib/auth';
import { getPublishedPostsMeta, type BlogPostMeta } from '@/lib/blog-index';
import { getSyndicationContent } from '@/lib/syndication-content';
import { getTelegraphPublished } from '@/lib/telegraph-published';
import {
  type SitePostInfo,
  type SyndicationItem,
  type SyndicationMode,
  toSitePostInfo,
  buildDevtoPayload,
  buildTeaserBody,
  devtoVerify,
  devtoListArticles,
  devtoCreate,
  devtoUpdate,
  diffSyndication,
  mediumVerify,
  mediumPublish,
  normalizeForemBase,
  foremVerify,
  foremListArticles,
  foremCreate,
  foremUpdate,
  telegraphPublish,
  maskKey,
} from '@/lib/syndication';

/**
 * Syndication API — the server-side proxy for the multi-channel pipeline:
 *   · dev.to          (full text + canonical)      — DEVTO_API_KEY
 *   · telegra.ph       (teaser + backlink, free)    — no credentials needed
 *   · any Forem site   (full text + canonical)      — FOREM_API_BASE + FOREM_API_KEY
 *   · Medium          (experimental, tokens frozen)
 *
 * AUTH (self-protected — NOT in middleware lists, by design):
 *   1. Admin session cookie (the Syndication panel in /admin), OR
 *   2. SYNDICATION_TOKEN via ?token= query or X-Syndication-token header —
 *      this is what the GitHub Actions workflow uses:
 *      POST https://thetaxcalc.com/api/syndicate?token=YOUR_SECRET
 *
 * API keys are resolved per request: from the request body (admin panel,
 * kept in the admin's localStorage) or from the matching env var
 * (automation). Keys are NEVER persisted server-side and are masked in all
 * responses.
 *
 * RATE GUARD: every token-authenticated (automation) publish-all run is
 * CAPPED at MAX_PUBLISH_PER_RUN newest posts per channel, so the pipeline
 * drips content onto young accounts instead of bursting 50+ articles at
 * once (spam-heuristic risk). Admin-triggered bulk runs are uncapped —
 * they are explicit human actions.
 */

// ─── Helpers ─────────────────────────────────────────────────────────────────

const MAX_HOOK_PUBLISH_PER_RUN = 5;

function getSitePosts(): SitePostInfo[] {
  const metas: BlogPostMeta[] = getPublishedPostsMeta();
  return metas.map((meta) => toSitePostInfo({ ...meta, content: getSyndicationContent(meta.slug) }));
}

type AuthKind = 'token' | 'admin' | null;

async function authorize(request: NextRequest): Promise<AuthKind> {
  // 1) Deploy-hook token
  const expected = process.env.SYNDICATION_TOKEN;
  if (expected) {
    const provided =
      request.nextUrl.searchParams.get('token') ??
      request.headers.get('x-syndication-token');
    if (provided === expected) return 'token';
  }
  // 2) Admin session cookie
  const cookie = request.cookies.get(getCookieName())?.value;
  if (cookie) {
    const session = await verifySessionToken(cookie);
    if (session) return 'admin';
  }
  return null;
}

interface SyndicateBody {
  action?:
    | 'verify' | 'diff' | 'publish' | 'publish-all' | 'publish-medium'
    | 'verify-forem' | 'diff-forem' | 'publish-forem' | 'publish-all-forem'
    | 'publish-telegraph';
  apiKey?: string;
  mediumToken?: string;
  foremBase?: string;
  foremKey?: string;
  slug?: string;
  slugs?: string[];
  dryRun?: boolean;
  mode?: SyndicationMode;
  mediumPublishStatus?: 'public' | 'draft';
  force?: boolean;
}

function resolveKey(body: SyndicateBody): { key: string; source: 'body' | 'env' } {
  if (body.apiKey?.trim()) return { key: body.apiKey.trim(), source: 'body' };
  const envKey = process.env.DEVTO_API_KEY;
  if (envKey?.trim()) return { key: envKey.trim(), source: 'env' };
  return { key: '', source: 'env' };
}

/** Resolve the optional Forem community channel: body (admin) or env (automation). */
function resolveForem(body: SyndicateBody): { base: string; key: string; source: 'body' | 'env' } {
  const base = body.foremBase?.trim()
    ? normalizeForemBase(body.foremBase)
    : normalizeForemBase(process.env.FOREM_API_BASE ?? '');
  const key = body.foremKey?.trim() || process.env.FOREM_API_KEY || '';
  return { base: base ?? '', key: key.trim(), source: body.foremKey?.trim() ? 'body' : 'env' };
}

function noForemResponse(): NextResponse {
  return NextResponse.json(
    {
      ok: false,
      error:
        'Forem community channel is not configured. Provide foremBase + foremKey in the request, or set FOREM_API_BASE + FOREM_API_KEY in Cloudflare Pages → Settings → Environment variables.',
    },
    { status: 400 }
  );
}

function noKeyResponse(): NextResponse {
  return NextResponse.json(
    {
      ok: false,
      error:
        'No dev.to API key provided. Paste one in the admin Syndication panel, or set DEVTO_API_KEY in Cloudflare Pages → Settings → Environment variables.',
    },
    { status: 400 }
  );
}

// ─── GET: pipeline status (lightweight health check for the panel) ──────────

export async function GET(request: NextRequest) {
  if ((await authorize(request)) === null) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  const posts = getSitePosts();
  return NextResponse.json({
    ok: true,
    totalPublishedPosts: posts.length,
    postsWithContent: posts.filter((p) => p.content.trim()).length,
    // Server-side truth about which posts can actually be syndicated —
    // /api/blog serves empty content in production (SSG architecture),
    // so the panel must NOT infer hasContent from it.
    contentSlugs: posts.filter((p) => p.content.trim()).map((p) => p.slug),
    // Everything the automation workflow needs to plan its batches:
    // updatedAt for newest-first ordering + telegraph dedup map.
    posts: posts.map((p) => ({
      slug: p.slug,
      updatedAt: p.updatedAt,
      hasContent: p.content.trim().length > 0,
    })),
    telegraphMap: getTelegraphPublished(),
    envKeyConfigured: Boolean(process.env.DEVTO_API_KEY),
    tokenConfigured: Boolean(process.env.SYNDICATION_TOKEN),
    foremConfigured: Boolean(process.env.FOREM_API_BASE && process.env.FOREM_API_KEY),
  });
}

// ─── POST: all pipeline actions ─────────────────────────────────────────────

export async function POST(request: NextRequest) {
  const authKind = await authorize(request);
  if (authKind === null) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  // Deploy hooks POST with an empty body → default action = publish-all
  let body: SyndicateBody = {};
  try {
    const text = await request.text();
    if (text?.trim()) body = JSON.parse(text) as SyndicateBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const action = body.action ?? 'publish-all';
  const { key, source } = resolveKey(body);
  const keyMasked = maskKey(key || process.env.DEVTO_API_KEY);

  try {
    // ── VERIFY: validate the dev.to key (+ optional Medium token) ──────────
    if (action === 'verify') {
      if (!key) return noKeyResponse();
      const devto = await devtoVerify(key);

      let medium: { ok: boolean; name?: string; error?: string } = { ok: false };
      if (body.mediumToken?.trim()) {
        const m = await mediumVerify(body.mediumToken);
        medium = { ok: m.ok, name: m.name, error: m.error };
      }

      return NextResponse.json({
        ok: devto.ok,
        username: devto.username,
        error: devto.error,
        keyMasked,
        keySource: source,
        medium,
      });
    }

    // ── DIFF: list site posts × dev.to state ──────────────────────────────
    if (action === 'diff') {
      if (!key) return noKeyResponse();
      const posts = getSitePosts();
      const devto = await devtoListArticles(key);
      if (!devto.ok) {
        return NextResponse.json({ ok: false, error: devto.error, keyMasked }, { status: 502 });
      }
      const items: SyndicationItem[] = diffSyndication(posts, devto.articles ?? []);
      return NextResponse.json({
        ok: true,
        keyMasked,
        keySource: source,
        items,
        newCount: items.filter((i) => i.status === 'new').length,
        staleCount: items.filter((i) => i.status === 'stale').length,
        syndicatedCount: items.filter((i) => i.status === 'syndicated').length,
      });
    }

    // ── PUBLISH: one slug (dryRun returns the exact payload, no network) ───
    if (action === 'publish') {
      if (!body.slug) {
        return NextResponse.json({ error: 'slug is required for action=publish' }, { status: 400 });
      }
      const post = getSitePosts().find((p) => p.slug === body.slug);
      if (!post) {
        return NextResponse.json({ error: `Unknown or unpublished slug: ${body.slug}` }, { status: 404 });
      }
      if (!post.content.trim()) {
        return NextResponse.json(
          { error: `Post "${post.slug}" has no content in content/blog/ (or the generated syndication map) — nothing to syndicate.` },
          { status: 400 }
        );
      }

      const payload = buildDevtoPayload(post, { mode: body.mode ?? 'full' });

      if (body.dryRun) {
        return NextResponse.json({ ok: true, dryRun: true, payload, keyMasked });
      }

      if (!key) return noKeyResponse();

      // If it already exists on dev.to (matched by canonical), update in place
      const devto = await devtoListArticles(key);
      if (!devto.ok) {
        return NextResponse.json({ ok: false, error: devto.error, keyMasked }, { status: 502 });
      }
      const items = diffSyndication([post], devto.articles ?? []);
      const existing = items[0]?.status !== 'new' ? items[0]?.devto : undefined;

      const result = existing
        ? await devtoUpdate(key, existing.id, payload)
        : await devtoCreate(key, payload);

      return NextResponse.json({ ok: result.ok, result: { slug: post.slug, ...result }, keyMasked });
    }

    // ── PUBLISH-ALL: syndicate every 'new' post (deploy-hook default) ─────
    if (action === 'publish-all') {
      if (!key) return noKeyResponse();
      const posts = getSitePosts();

      const devto = await devtoListArticles(key);
      if (!devto.ok) {
        return NextResponse.json({ ok: false, error: devto.error, keyMasked }, { status: 502 });
      }

      const items = diffSyndication(posts, devto.articles ?? []);
      // Newest posts first (updatedAt DESC) — the freshest content is what
      // we want landing on dev.to when a cap trims the batch.
      const rank = (slug: string) => posts.find((p) => p.slug === slug)?.updatedAt ?? '';
      const targets = items
        .filter((i) => i.status === 'new' && i.hasContent)
        .sort((a, b) => (rank(a.slug) < rank(b.slug) ? 1 : -1));

      // RATE GUARD: automatic deploy-hook runs publish at most
      // MAX_HOOK_PUBLISH_PER_RUN newest posts — subsequent deploys drip the
      // rest. Admin-triggered publish-all is an explicit human action: uncapped.
      const capped = authKind === 'token' && targets.length > MAX_HOOK_PUBLISH_PER_RUN;
      const batch = capped ? targets.slice(0, MAX_HOOK_PUBLISH_PER_RUN) : targets;

      if (body.dryRun) {
        return NextResponse.json({
          ok: true,
          dryRun: true,
          keyMasked,
          keySource: source,
          wouldPublish: batch.map((t) => t.slug),
          counts: {
            new: targets.length,
            syndicated: items.filter((i) => i.status === 'syndicated').length,
            stale: items.filter((i) => i.status === 'stale').length,
          },
          ...(capped && {
            rateGuard: {
              applied: true,
              limit: MAX_HOOK_PUBLISH_PER_RUN,
              remainingAfterRun: targets.length - batch.length,
              note: 'Deploy-hook runs publish at most 5 newest per deploy; the rest drip on subsequent deploys.',
            },
          }),
        });
      }

      const results: { slug: string; ok: boolean; url?: string; error?: string }[] = [];
      for (const target of batch) {
        const post = posts.find((p) => p.slug === target.slug);
        if (!post) continue;
        const payload = buildDevtoPayload(post, { mode: body.mode ?? 'full' });
        const result = await devtoCreate(key, payload);
        results.push({ slug: target.slug, ok: result.ok, url: result.url, error: result.error });
        // Be polite to the dev.to API when bulk-publishing
        if (targets.length > 1) await new Promise((r) => setTimeout(r, 400));
      }

      return NextResponse.json({
        ok: true,
        keyMasked,
        keySource: source,
        attempted: results.length,
        succeeded: results.filter((r) => r.ok).length,
        failed: results.filter((r) => !r.ok).length,
        results,
        ...(capped && {
          rateGuard: {
            applied: true,
            limit: MAX_HOOK_PUBLISH_PER_RUN,
            remainingAfterRun: targets.length - batch.length,
          },
        }),
      });
    }

    // ── PUBLISH-MEDIUM: one slug to Medium (experimental channel) ────────
    if (action === 'publish-medium') {
      if (!body.slug) {
        return NextResponse.json({ error: 'slug is required for action=publish-medium' }, { status: 400 });
      }
      if (!body.mediumToken?.trim()) {
        return NextResponse.json({ error: 'mediumToken is required for action=publish-medium' }, { status: 400 });
      }
      const post = getSitePosts().find((p) => p.slug === body.slug);
      if (!post) {
        return NextResponse.json({ error: `Unknown or unpublished slug: ${body.slug}` }, { status: 404 });
      }
      if (!post.content.trim()) {
        return NextResponse.json({ error: `Post "${post.slug}" has no content — nothing to syndicate.` }, { status: 400 });
      }

      const me = await mediumVerify(body.mediumToken);
      if (!me.ok || !me.userId) {
        return NextResponse.json({ ok: false, error: me.error ?? 'Medium token invalid' }, { status: 502 });
      }

      const result = await mediumPublish(body.mediumToken, me.userId, post, {
        mode: body.mode ?? 'full',
        publishStatus: body.mediumPublishStatus ?? 'public',
      });
      return NextResponse.json({ ok: result.ok, result: { slug: post.slug, ...result } });
    }

    // ── VERIFY-FOREM: validate a Forem community base + API key ────────────
    if (action === 'verify-forem') {
      const { base, key } = resolveForem(body);
      if (!base) {
        return NextResponse.json({ ok: false, error: 'A valid community URL is required (e.g. https://community.codenewbie.org)' }, { status: 400 });
      }
      if (!key) return noForemResponse();
      const v = await foremVerify(base, key);
      return NextResponse.json({
        ok: v.ok,
        username: v.username,
        error: v.error,
        foremBase: base,
        keyMasked: maskKey(key),
      });
    }

    // ── DIFF-FOREM: list site posts × the Forem account's state ───────────
    if (action === 'diff-forem') {
      const { base, key } = resolveForem(body);
      if (!base || !key) return noForemResponse();
      const posts = getSitePosts();
      const forem = await foremListArticles(base, key);
      if (!forem.ok) {
        return NextResponse.json({ ok: false, error: forem.error, keyMasked: maskKey(key) }, { status: 502 });
      }
      const items: SyndicationItem[] = diffSyndication(posts, forem.articles ?? []);
      return NextResponse.json({
        ok: true,
        foremBase: base,
        items,
        newCount: items.filter((i) => i.status === 'new').length,
        staleCount: items.filter((i) => i.status === 'stale').length,
        syndicatedCount: items.filter((i) => i.status === 'syndicated').length,
      });
    }

    // ── PUBLISH-FOREM: one slug to the Forem community (dryRun supported) ─
    if (action === 'publish-forem') {
      if (!body.slug) {
        return NextResponse.json({ error: 'slug is required for action=publish-forem' }, { status: 400 });
      }
      const { base, key } = resolveForem(body);
      if (!base || !key) return noForemResponse();
      const post = getSitePosts().find((p) => p.slug === body.slug);
      if (!post) {
        return NextResponse.json({ error: `Unknown or unpublished slug: ${body.slug}` }, { status: 404 });
      }
      if (!post.content.trim()) {
        return NextResponse.json({ error: `Post "${post.slug}" has no content — nothing to syndicate.` }, { status: 400 });
      }

      const payload = buildDevtoPayload(post, { mode: body.mode ?? 'full' });
      if (body.dryRun) {
        return NextResponse.json({ ok: true, dryRun: true, payload, foremBase: base });
      }

      const forem = await foremListArticles(base, key);
      if (!forem.ok) {
        return NextResponse.json({ ok: false, error: forem.error, keyMasked: maskKey(key) }, { status: 502 });
      }
      const items = diffSyndication([post], forem.articles ?? []);
      const existing = items[0]?.status !== 'new' ? items[0]?.devto : undefined;

      const result = existing
        ? await foremUpdate(base, key, existing.id, payload)
        : await foremCreate(base, key, payload);
      return NextResponse.json({ ok: result.ok, result: { slug: post.slug, ...result }, foremBase: base });
    }

    // ── PUBLISH-ALL-FOREM: drip every 'new' post to the community ────────
    if (action === 'publish-all-forem') {
      const { base, key } = resolveForem(body);
      if (!base || !key) {
        // Not an error: the channel is optional. The workflow treats this
        // as a clean skip so the whole run stays green.
        return NextResponse.json({ ok: true, skipped: true, notConfigured: true });
      }
      const posts = getSitePosts();

      const forem = await foremListArticles(base, key);
      if (!forem.ok) {
        return NextResponse.json({ ok: false, error: forem.error, keyMasked: maskKey(key) }, { status: 502 });
      }

      const items = diffSyndication(posts, forem.articles ?? []);
      const rank = (slug: string) => posts.find((p) => p.slug === slug)?.updatedAt ?? '';
      const targets = items
        .filter((i) => i.status === 'new' && i.hasContent)
        .sort((a, b) => (rank(a.slug) < rank(b.slug) ? 1 : -1));

      const capped = authKind === 'token' && targets.length > MAX_HOOK_PUBLISH_PER_RUN;
      const batch = capped ? targets.slice(0, MAX_HOOK_PUBLISH_PER_RUN) : targets;

      if (body.dryRun) {
        return NextResponse.json({
          ok: true,
          dryRun: true,
          foremBase: base,
          wouldPublish: batch.map((t) => t.slug),
          counts: {
            new: targets.length,
            syndicated: items.filter((i) => i.status === 'syndicated').length,
            stale: items.filter((i) => i.status === 'stale').length,
          },
          ...(capped && {
            rateGuard: {
              applied: true,
              limit: MAX_HOOK_PUBLISH_PER_RUN,
              remainingAfterRun: targets.length - batch.length,
            },
          }),
        });
      }

      const results: { slug: string; ok: boolean; url?: string; error?: string }[] = [];
      for (const target of batch) {
        const post = posts.find((p) => p.slug === target.slug);
        if (!post) continue;
        const payload = buildDevtoPayload(post, { mode: body.mode ?? 'full' });
        const result = await foremCreate(base, key, payload);
        results.push({ slug: target.slug, ok: result.ok, url: result.url, error: result.error });
        if (batch.length > 1) await new Promise((r) => setTimeout(r, 400));
      }

      return NextResponse.json({
        ok: true,
        foremBase: base,
        attempted: results.length,
        succeeded: results.filter((r) => r.ok).length,
        failed: results.filter((r) => !r.ok).length,
        results,
        ...(capped && {
          rateGuard: {
            applied: true,
            limit: MAX_HOOK_PUBLISH_PER_RUN,
            remainingAfterRun: targets.length - batch.length,
          },
        }),
      });
    }

    // ── PUBLISH-TELEGRAPH: teaser pages to telegra.ph (free channel) ─────
    // Telegraph has no canonical support → ALWAYS teaser mode (opening
    // paragraphs + read-more link) to avoid duplicate content. Dedup state
    // = the committed telegraph-published map (advisory here; the daily
    // workflow holds the freshest copy and commits updates after each run).
    if (action === 'publish-telegraph') {
      const all = getSitePosts();
      const state = getTelegraphPublished();

      // Explicit slugs (workflow batch / panel), a single slug, or auto-pick
      // the 5 newest unpublished content posts.
      let targets: SitePostInfo[];
      if (body.slugs?.length) {
        targets = body.slugs
          .map((s) => all.find((p) => p.slug === s))
          .filter((p): p is SitePostInfo => Boolean(p && p.content.trim()));
      } else if (body.slug) {
        targets = [all.find((p) => p.slug === body.slug)]
          .filter((p): p is SitePostInfo => Boolean(p && p.content.trim()));
      } else {
        targets = all
          .filter((p) => p.content.trim() && (!state[p.slug] || body.force))
          .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
          .slice(0, MAX_HOOK_PUBLISH_PER_RUN);
      }

      if (targets.length === 0) {
        return NextResponse.json({ ok: true, attempted: 0, succeeded: 0, failed: 0, results: [] });
      }

      if (body.dryRun) {
        return NextResponse.json({
          ok: true,
          dryRun: true,
          slugs: targets.map((t) => t.slug),
          teaserPreview: buildTeaserBody(targets[0]),
        });
      }

      const results: { slug: string; ok: boolean; url?: string; error?: string; skipped?: string }[] = [];
      for (const post of targets) {
        const existing = state[post.slug];
        if (existing && !body.force) {
          results.push({ slug: post.slug, ok: true, url: existing.url, skipped: 'already published (state map)' });
          continue;
        }
        const result = await telegraphPublish(post);
        if (result.ok && result.url) {
          state[post.slug] = { url: result.url, publishedAt: new Date().toISOString() };
        }
        results.push({ slug: post.slug, ...result });
        if (targets.length > 1) await new Promise((r) => setTimeout(r, 400));
      }

      return NextResponse.json({
        ok: true,
        attempted: results.filter((r) => !r.skipped).length,
        succeeded: results.filter((r) => r.ok && !r.skipped).length,
        failed: results.filter((r) => !r.ok).length,
        results,
        // Merged map incl. this run — the daily workflow commits it to the
        // repo; manual (panel) publishes sync into the map on the next
        // automated run.
        telegraphMap: state,
        note: 'Telegraph has no listing API — publish state persists via the daily workflow (src/generated/telegraph-published.ts).',
      });
    }

    return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
  } catch (error) {
    // Never leak stack traces or key material
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Syndication failed' },
      { status: 500 }
    );
  }
}
