import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, getCookieName } from '@/lib/auth';
import { getPublishedPostsMeta, type BlogPostMeta } from '@/lib/blog-index';
import { getSyndicationContent } from '@/lib/syndication-content';
import {
  type SitePostInfo,
  type SyndicationItem,
  type SyndicationMode,
  toSitePostInfo,
  buildDevtoPayload,
  devtoVerify,
  devtoListArticles,
  devtoCreate,
  devtoUpdate,
  diffSyndication,
  mediumVerify,
  mediumPublish,
  maskKey,
} from '@/lib/syndication';

/**
 * Syndication API — the server-side proxy for the dev.to / Medium pipeline.
 *
 * AUTH (self-protected — NOT in middleware lists, by design):
 *   1. Admin session cookie (the Syndication panel in /admin), OR
 *   2. SYNDICATION_TOKEN via ?token= query or X-Syndication-token header —
 *      this is what the Cloudflare Pages Deploy Hook calls after each deploy:
 *      POST https://thetaxcalc.com/api/syndicate?token=YOUR_SECRET
 *
 * The dev.to API key is resolved per request: from the request body (admin
 * panel, kept in the admin's localStorage) or from the DEVTO_API_KEY env var
 * (deploy hooks). Keys are NEVER persisted server-side and are masked in all
 * responses.
 *
 * RATE GUARD: automatic deploy-hook publish-all runs are CAPPED at
 * MAX_PUBLISH_PER_RUN newest posts, so the first hook after enabling the
 * pipeline drips content onto a young dev.to account instead of bursting
 * 50+ articles at once (spam-heuristic risk). Admin-triggered publish-all
 * from the panel is uncapped — it is an explicit human action.
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
  action?: 'verify' | 'diff' | 'publish' | 'publish-all' | 'publish-medium';
  apiKey?: string;
  mediumToken?: string;
  slug?: string;
  dryRun?: boolean;
  mode?: SyndicationMode;
  mediumPublishStatus?: 'public' | 'draft';
}

function resolveKey(body: SyndicateBody): { key: string; source: 'body' | 'env' } {
  if (body.apiKey?.trim()) return { key: body.apiKey.trim(), source: 'body' };
  const envKey = process.env.DEVTO_API_KEY;
  if (envKey?.trim()) return { key: envKey.trim(), source: 'env' };
  return { key: '', source: 'env' };
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
    envKeyConfigured: Boolean(process.env.DEVTO_API_KEY),
    tokenConfigured: Boolean(process.env.SYNDICATION_TOKEN),
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

    return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
  } catch (error) {
    // Never leak stack traces or key material
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Syndication failed' },
      { status: 500 }
    );
  }
}
