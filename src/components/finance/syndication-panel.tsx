'use client';

/**
 * Syndication Panel — admin UI for the dev.to / Medium pipeline.
 *
 * Everything the admin needs in one place:
 * 1. Connect: paste dev.to API key (kept in localStorage, sent per-request —
 *    never persisted server-side), verify it, pick the content mode.
 * 2. Scan: diff the 14 static blog posts against the dev.to account
 *    (stateless — dev.to's own canonical_url fields are the source of truth).
 * 3. Publish: per-post or bulk, with a dry-run Preview that shows the EXACT
 *    markdown that would go out (canonical + credit footer included).
 * 4. Automate: a scheduled GitHub Actions workflow in the site repository
 *    POSTs /api/syndicate daily (max 5 newest per run — deliberate drip).
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import {
  Send,
  SearchCheck,
  Eye,
  RefreshCw,
  Loader2,
  CheckCircle2,
  XCircle,
  ExternalLink,
  KeyRound,
  Wand2,
  ServerCog,
  Info,
  Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import type { SyndicationItem, SyndicationMode, DevtoPayload } from '@/lib/syndication';

// ─── localStorage keys (same pattern as settings-store.ts) ───────────────────

const LS_DEVTO_KEY = 'thetaxcalc_devto_api_key';
const LS_MEDIUM_TOKEN = 'thetaxcalc_medium_token';
const LS_MODE = 'thetaxcalc_syndication_mode';
const LS_MEDIUM_RECORDS = 'thetaxcalc_medium_records';

interface MediumRecord {
  id: string;
  url: string;
}

interface PipelineStatus {
  totalPublishedPosts: number;
  envKeyConfigured: boolean;
  tokenConfigured: boolean;
  /** Server-side truth: slugs that actually have syndicatable content */
  contentSlugs?: string[];
}

/** Local (pre-scan) row — statuses unknown until a diff against dev.to runs */
interface LocalPostRow {
  slug: string;
  title: string;
  category: string;
  hasContent: boolean;
}

interface DiffResponse {
  ok: boolean;
  items: SyndicationItem[];
  newCount: number;
  staleCount: number;
  syndicatedCount: number;
  error?: string;
}

interface VerifyResponse {
  ok: boolean;
  username?: string;
  error?: string;
  medium?: { ok: boolean; name?: string; error?: string };
}

interface PublishResponse {
  ok: boolean;
  result?: { slug: string; ok: boolean; url?: string; error?: string };
  attempted?: number;
  succeeded?: number;
  failed?: number;
  error?: string;
}

// ─── Status badge helper ────────────────────────────────────────────────────

function StatusBadge({ item }: { item: { status: string; hasContent: boolean } }) {
  if (!item.hasContent) {
    return <Badge variant="outline" className="bg-muted text-muted-foreground">No content</Badge>;
  }
  if (item.status === 'unknown') {
    return <Badge variant="outline" className="bg-muted text-muted-foreground">Not scanned</Badge>;
  }
  if (item.status === 'new') {
    return <Badge variant="outline" className="bg-amber-500/15 text-amber-400 border-amber-500/30">New</Badge>;
  }
  if (item.status === 'stale') {
    return <Badge variant="outline" className="bg-rose-500/15 text-rose-400 border-rose-500/30">Updated on site</Badge>;
  }
  return (
    <Badge variant="outline" className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30">
      Syndicated ✓
    </Badge>
  );
}

// ─── localStorage helpers (SSR-safe, lazy-init compatible) ───────────────────

function readLS(key: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function readLSJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

// ─── Main panel ─────────────────────────────────────────────────────────────

export function SyndicationPanel() {
  // Connection state — lazy-initialized from localStorage (this panel lives in
  // the client-only admin tree: lazily imported under the ssr:false dashboard)
  const [devtoKeyInput, setDevtoKeyInput] = useState<string>(() => readLS(LS_DEVTO_KEY) ?? '');
  const [devtoVerified, setDevtoVerified] = useState<{ ok: boolean; username?: string } | null>(null);
  const [mediumInput, setMediumInput] = useState<string>(() => readLS(LS_MEDIUM_TOKEN) ?? '');
  const [mediumVerified, setMediumVerified] = useState<{ ok: boolean; name?: string } | null>(null);
  const [mode, setMode] = useState<SyndicationMode>(() => {
    const saved = readLS(LS_MODE);
    return saved === 'teaser' ? 'teaser' : 'full';
  });
  const [pipeline, setPipeline] = useState<PipelineStatus | null>(null);

  // Scan state
  const [diff, setDiff] = useState<DiffResponse | null>(null);

  // Local posts list (pre-scan): DERIVED from rawPosts + pipeline status —
  // computed via useMemo, not mirrored into state
  // (raw rows themselves come from the public /api/blog, so Preview — dry-run —
  // works WITHOUT a dev.to key)
  // Raw rows from /api/blog — content truth arrives separately (contentSlugs)
  const [rawPosts, setRawPosts] = useState<{ slug: string; title: string; category: string }[]>([]);

  // Preview state
  const [preview, setPreview] = useState<{ title: string; payload: DevtoPayload } | null>(null);

  // Medium records (localStorage — Medium has no listing API)
  const [mediumRecords, setMediumRecords] = useState<Record<string, MediumRecord>>(() =>
    readLSJson<Record<string, MediumRecord>>(LS_MEDIUM_RECORDS, {})
  );

  // ── Pipeline status + local posts list (both read-only, mount-time) ──
  useEffect(() => {
    let cancelled = false;
    fetch('/api/syndicate')
      .then((r) => (r.ok ? r.json() : null))
      .then((data: PipelineStatus | null) => {
        if (!cancelled) setPipeline(data);
      })
      .catch(() => {
        if (!cancelled) setPipeline(null);
      });

    fetch('/api/blog')
      .then((r) => (r.ok ? r.json() : { posts: [] }))
      .then((data: { posts?: { slug: string; title: string; category: string }[] }) => {
        if (cancelled) return;
        setRawPosts(
          (data.posts ?? []).map((p) => ({ slug: p.slug, title: p.title, category: p.category }))
        );
      })
      .catch(() => {
        // local list is optional nicety — ignore failures
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Derive pre-scan rows whenever the raw list OR the server status lands
  // (the two fetches resolve in any order). hasContent truth = the syndication
  // route's contentSlugs — /api/blog serves empty content in production (SSG
  // architecture) and must never be trusted for this flag.
  const localPosts: LocalPostRow[] = useMemo(
    () =>
      rawPosts.map((p) => ({
        ...p,
        hasContent: pipeline?.contentSlugs ? pipeline.contentSlugs.includes(p.slug) : false,
      })),
    [rawPosts, pipeline]
  );

  const saveMediumRecord = useCallback((slug: string, record: MediumRecord) => {
    setMediumRecords((prev) => {
      const next = { ...prev, [slug]: record };
      try {
        localStorage.setItem(LS_MEDIUM_RECORDS, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  // ── Mutations ──

  const verifyMutation = useMutation({
    mutationFn: async (): Promise<VerifyResponse> => {
      const res = await fetch('/api/syndicate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'verify',
          apiKey: devtoKeyInput.trim() || undefined,
          mediumToken: mediumInput.trim() || undefined,
        }),
      });
      const data = (await res.json()) as VerifyResponse;
      if (!res.ok && !data.error) data.error = `Request failed (HTTP ${res.status})`;
      return data;
    },
    onSuccess: (data) => {
      try {
        if (devtoKeyInput.trim()) localStorage.setItem(LS_DEVTO_KEY, devtoKeyInput.trim());
        if (mediumInput.trim()) localStorage.setItem(LS_MEDIUM_TOKEN, mediumInput.trim());
      } catch {
        // ignore
      }
      setDevtoVerified({ ok: data.ok, username: data.username });
      if (data.medium?.ok) {
        setMediumVerified({ ok: true, name: data.medium.name });
        toast.success(`Medium connected${data.medium.name ? ` (${data.medium.name})` : ''}`);
      } else {
        setMediumVerified(null);
      }
      if (data.ok) {
        toast.success(`dev.to connected as @${data.username ?? 'unknown'} — key saved`);
      } else {
        toast.error(data.error ?? 'dev.to verification failed');
      }
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const scanMutation = useMutation({
    mutationFn: async (): Promise<DiffResponse> => {
      const res = await fetch('/api/syndicate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'diff', apiKey: devtoKeyInput.trim() || undefined }),
      });
      const data = (await res.json()) as DiffResponse;
      if (!res.ok && !data.error) data.error = `Request failed (HTTP ${res.status})`;
      return data;
    },
    onSuccess: (data) => {
      if (data.ok) {
        setDiff(data);
        toast.success(
          `Scan complete — ${data.newCount} new, ${data.syndicatedCount} syndicated, ${data.staleCount} updated on site`
        );
      } else {
        setDiff(null);
        toast.error(data.error ?? 'Scan failed');
      }
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const previewMutation = useMutation({
    mutationFn: async (slug: string): Promise<{ payload: DevtoPayload } | { error: string }> => {
      const res = await fetch('/api/syndicate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'publish', slug, dryRun: true, mode }),
      });
      return res.json();
    },
    onSuccess: (data) => {
      if ('payload' in data && data.payload) {
        setPreview({ title: data.payload.title, payload: data.payload });
      } else {
        toast.error('error' in data ? data.error : 'Preview failed');
      }
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const publishMutation = useMutation({
    mutationFn: async (slug: string): Promise<PublishResponse> => {
      const res = await fetch('/api/syndicate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'publish', slug, apiKey: devtoKeyInput.trim() || undefined, mode }),
      });
      return res.json();
    },
    onSuccess: (data) => {
      if (data.result?.ok && data.result.url) {
        toast.success(`Published to dev.to: ${data.result.url}`);
        scanMutation.mutate();
      } else {
        toast.error(data.result?.error ?? data.error ?? 'Publish failed');
      }
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const publishAllMutation = useMutation({
    mutationFn: async (): Promise<PublishResponse> => {
      const res = await fetch('/api/syndicate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'publish-all', apiKey: devtoKeyInput.trim() || undefined, mode }),
      });
      return res.json();
    },
    onSuccess: (data) => {
      if (data.ok) {
        toast.success(`Bulk publish done — ${data.succeeded ?? 0}/${data.attempted ?? 0} succeeded`);
        scanMutation.mutate();
      } else {
        toast.error(data.error ?? 'Bulk publish failed');
      }
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const mediumPublishMutation = useMutation({
    mutationFn: async (slug: string): Promise<PublishResponse> => {
      const res = await fetch('/api/syndicate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'publish-medium',
          slug,
          mediumToken: mediumInput.trim(),
          mode,
        }),
      });
      return res.json();
    },
    onSuccess: (data) => {
      if (data.result?.ok) {
        if (data.result.url) saveMediumRecord(data.result.slug, { id: data.result.id ?? '', url: data.result.url });
        toast.success(`Published to Medium${data.result.url ? `: ${data.result.url}` : ''}`);
      } else {
        toast.error(data.result?.error ?? data.error ?? 'Medium publish failed');
      }
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const handleModeChange = (value: string) => {
    const next = value === 'teaser' ? 'teaser' : 'full';
    setMode(next);
    try {
      localStorage.setItem(LS_MODE, next);
    } catch {
      // ignore
    }
  };

  const busy =
    verifyMutation.isPending ||
    scanMutation.isPending ||
    previewMutation.isPending ||
    publishAllMutation.isPending ||
    publishMutation.isPending ||
    mediumPublishMutation.isPending;

  return (
    <div className="space-y-6">
      {/* ── What this does ─────────────────────────────────────────────── */}
      <Alert className="border-emerald-500/30 bg-emerald-500/5">
        <Wand2 className="h-4 w-4 text-emerald-500" />
        <AlertTitle>What this does</AlertTitle>
        <AlertDescription className="text-xs leading-relaxed">
          Publishes blog posts to <strong>dev.to</strong> with a{' '}
          <code className="rounded bg-muted px-1">canonical_url</code> pointing back to thetaxcalc.com —
          the syndicated copy never competes with the original in Google, but earns referral traffic,
          brand mentions, and dofollow links from your dev.to profile. New posts are managed through
          code deploys, so the pipeline diff is <strong>stateless</strong>: dev.to&apos;s own canonical
          fields are the source of truth. No database involved.
        </AlertDescription>
      </Alert>

      {/* ── Connection ────────────────────────────────────────────────── */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <KeyRound className="h-4 w-4 text-emerald-500" />
            Connection
          </CardTitle>
          <CardDescription>
            Generate a dev.to API key at{' '}
            <a
              href="https://dev.to/settings/extensions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline inline-flex items-center gap-0.5"
            >
              dev.to/settings/extensions <ExternalLink className="h-3 w-3" />
            </a>
            . The key is stored in this browser only (localStorage) and sent per-request — never
            persisted on the server.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="devto-key">dev.to API key</Label>
              <div className="flex gap-2">
                <Input
                  id="devto-key"
                  type="password"
                  placeholder="Paste your dev.to API key (e.g. AbCdE...)…"
                  value={devtoKeyInput}
                  onChange={(e) => setDevtoKeyInput(e.target.value)}
                  autoComplete="off"
                  className="flex-1"
                />
                <Button
                  onClick={() => verifyMutation.mutate()}
                  disabled={busy || (!devtoKeyInput.trim() && !pipeline?.envKeyConfigured)}
                  size="sm"
                  className="shrink-0"
                >
                  {verifyMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4" />
                  )}
                  Save &amp; Verify
                </Button>
              </div>
              {devtoVerified?.ok && (
                <p className="text-xs text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Connected as @{devtoVerified.username}
                </p>
              )}
              {devtoVerified && !devtoVerified.ok && (
                <p className="text-xs text-rose-400 flex items-center gap-1">
                  <XCircle className="h-3 w-3" /> Not verified yet
                </p>
              )}
              {!devtoKeyInput.trim() && pipeline?.envKeyConfigured && (
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <ServerCog className="h-3 w-3" /> DEVTO_API_KEY is configured in the environment —
                  automation mode active even without a local key.
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="syndication-mode">Content mode</Label>
              <Select value={mode} onValueChange={handleModeChange}>
                <SelectTrigger id="syndication-mode" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Full text + canonical (recommended)</SelectItem>
                  <SelectItem value="teaser">Teaser + &quot;read more&quot; link</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Full text is standard practice — the canonical tag handles SEO.
              </p>
            </div>
          </div>

          <Separator className="bg-border/50" />

          <div className="space-y-1.5">
            <Label htmlFor="medium-token" className="flex items-center gap-2">
              Medium integration token
              <Badge variant="outline" className="text-[10px] bg-muted text-muted-foreground">
                Optional · experimental
              </Badge>
            </Label>
            <div className="flex gap-2">
              <Input
                id="medium-token"
                type="password"
                placeholder="Only if your Medium account still has integration tokens…"
                value={mediumInput}
                onChange={(e) => setMediumInput(e.target.value)}
                autoComplete="off"
                className="flex-1"
              />
              <Button
                onClick={() => verifyMutation.mutate()}
                disabled={busy || !mediumInput.trim()}
                variant="outline"
                size="sm"
                className="shrink-0"
              >
                {verifyMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Verify'}
              </Button>
            </div>
            {mediumVerified?.ok && (
              <p className="text-xs text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" /> Medium connected{mediumVerified.name ? ` (${mediumVerified.name})` : ''}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              Medium froze token generation for most accounts — dev.to is the primary channel. Keep this
              empty if you don&apos;t already have a working token.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* ── Automation setup (GitHub Actions daily drip) ──────────────── */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <Collapsible defaultOpen={false}>
            <CollapsibleTrigger asChild>
              <button className="flex items-center justify-between w-full text-left">
                <CardTitle className="flex items-center gap-2 text-base">
                  <ServerCog className="h-4 w-4 text-emerald-500" />
                  Automatic syndication — daily drip (GitHub Actions)
                </CardTitle>
                <span className="text-xs text-muted-foreground">Open setup guide ↓</span>
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3 space-y-3">
              <div className="text-xs text-muted-foreground leading-relaxed">
                A scheduled workflow in the site repository (already committed:
                <code className="rounded bg-muted px-1">.github/workflows/devto-syndicate.yml</code>)
                POSTs to this pipeline daily at 09:00 Tripoli time, and can also be run manually
                from the Actions tab on GitHub. One-time setup:
              </div>
              <ol className="list-decimal list-inside space-y-3 text-xs">
                <li className="leading-relaxed">
                  <strong>Environment variables</strong> — Cloudflare Pages → thetaxcalc → Settings →
                  Environment variables → add for <strong>Production</strong>:
                  <pre className="mt-1.5 p-2 rounded-md bg-muted/70 overflow-x-auto">
{`DEVTO_API_KEY      your dev.to API key (dev.to → Settings → Extensions)
SYNDICATION_TOKEN  long random string — same value as the SYNDICATION_TOKEN
                   secret in the site repository (Settings → Secrets → Actions)
ADMIN_PASSWORD    the admin password used to log into this panel
JWT_SECRET        long random string (session cookie signing)`}
                  </pre>
                </li>
                <li className="leading-relaxed">
                  <strong>Redeploy</strong> — env vars only apply to deployments made <em>after</em>
                  saving them: Deployments tab → latest deployment → <strong>⋯ → Retry deployment</strong>.
                </li>
                <li className="leading-relaxed">
                  Done — each daily run publishes up to <strong>5 newest</strong> new posts (a
                  deliberate drip for a young dev.to account), continuing on the following days.
                  Already-syndicated posts are never duplicated (stateless canonical diff).
                </li>
              </ol>
              {pipeline && (
                <Alert className={pipeline.envKeyConfigured ? 'border-emerald-500/30 bg-emerald-500/5' : ''}>
                  <Info className="h-4 w-4" />
                  <AlertDescription className="text-xs">
                    {pipeline.envKeyConfigured
                      ? `✓ DEVTO_API_KEY detected in the environment${pipeline.tokenConfigured ? ' — and SYNDICATION_TOKEN is set, the daily GitHub Actions drip is LIVE' : ' — set SYNDICATION_TOKEN (Cloudflare env var + the GitHub repo secret) to complete the automation'}.`
                      : 'DEVTO_API_KEY is not in the environment yet — paste a key above for manual publishing, or set the env vars to enable the daily automation.'}
                  </AlertDescription>
                </Alert>
              )}
            </CollapsibleContent>
          </Collapsible>
        </CardHeader>
      </Card>

      {/* ── Posts × status ────────────────────────────────────────────── */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <CardTitle className="flex items-center gap-2 text-base">
                <Globe className="h-4 w-4 text-emerald-500" />
                Blog posts × syndication status
              </CardTitle>
              <CardDescription className="mt-1">
                {diff?.ok
                  ? `${diff.items.length} published posts — ${diff.newCount} new, ${diff.syndicatedCount} syndicated, ${diff.staleCount} updated since syndication`
                  : 'Scan to compare the site blog against your dev.to account'}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => scanMutation.mutate()}
                disabled={busy || (!devtoKeyInput.trim() && !pipeline?.envKeyConfigured)}
              >
                {scanMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <SearchCheck className="h-4 w-4" />
                )}
                Scan
              </Button>
              {diff?.ok && diff.newCount > 0 && (
                <Button
                  size="sm"
                  onClick={() => publishAllMutation.mutate()}
                  disabled={busy}
                >
                  {publishAllMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  Publish all new ({diff.newCount})
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {!diff?.ok && localPosts.length === 0 ? (
            <div className="text-center py-10 text-sm text-muted-foreground">
              <SearchCheck className="h-8 w-8 mx-auto mb-3 opacity-30" />
              No blog posts found. Publish posts in the code, then come back — dry-run
              previews work without a dev.to key, publishing needs one.
            </div>
          ) : (
            <div className="max-h-96 overflow-y-auto custom-scrollbar">
              <div className="space-y-2 pr-2">
                {(diff?.ok
                  ? diff.items
                  : localPosts.map((p) => ({ ...p, status: 'unknown' as const }))
                ).map((item) => {
                  const item2 = item as { slug: string; title: string; category: string; status: string; hasContent: boolean; devto?: { url?: string } };
                  return (
                  <div
                    key={item2.slug}
                    className="flex flex-wrap items-center gap-3 rounded-lg border border-border/40 p-3 hover:bg-muted/30 transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium truncate" title={item2.title}>
                        {item2.title}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5 truncate">
                        /blog/{item2.slug} · {item2.category}
                        {item2.devto?.url && (
                          <a
                            href={item2.devto.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 text-emerald-400 hover:underline inline-flex items-center gap-0.5"
                          >
                            dev.to copy <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                        {mediumRecords[item2.slug]?.url && (
                          <a
                            href={mediumRecords[item2.slug].url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 text-muted-foreground hover:text-foreground hover:underline inline-flex items-center gap-0.5"
                          >
                            Medium copy <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </div>

                    <StatusBadge item={item2} />

                    <div className="flex items-center gap-1.5 shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2"
                        onClick={() => previewMutation.mutate(item2.slug)}
                        disabled={busy || !item2.hasContent}
                        aria-label={`Preview ${item2.title} payload`}
                        title="Preview the exact markdown that would be published"
                      >
                        {previewMutation.isPending && previewMutation.variables === item2.slug ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                      {item2.hasContent && (
                        <Button
                          size="sm"
                          className="h-8"
                          onClick={() => publishMutation.mutate(item2.slug)}
                          disabled={busy || (!devtoKeyInput.trim() && !pipeline?.envKeyConfigured)}
                          title={item2.status === 'new' ? 'Publish to dev.to' : 'Re-sync to dev.to'}
                        >
                          {publishMutation.isPending && publishMutation.variables === item2.slug ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : item2.status === 'new' ? (
                            <Send className="h-4 w-4" />
                          ) : (
                            <RefreshCw className="h-4 w-4" />
                          )}
                        </Button>
                      )}
                      {mediumVerified?.ok && item2.hasContent && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-2"
                          onClick={() => mediumPublishMutation.mutate(item2.slug)}
                          disabled={busy}
                          aria-label={`Publish ${item2.title} to Medium`}
                          title="Publish to Medium (experimental)"
                        >
                          {mediumPublishMutation.isPending && mediumPublishMutation.variables === item2.slug ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            'M'
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Preview dialog ────────────────────────────────────────────── */}
      <Dialog open={Boolean(preview)} onOpenChange={(open) => !open && setPreview(null)}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-base pr-6">{preview?.title}</DialogTitle>
            <DialogDescription className="text-xs">
              Dry run — this is the exact payload that would be published to dev.to. Nothing was sent.
            </DialogDescription>
          </DialogHeader>
          {preview && (
            <div className="space-y-3 min-h-0 flex flex-col">
              <div className="flex flex-wrap gap-2 text-xs">
                <Badge variant="outline" className="bg-muted">
                  canonical: {preview.payload.canonical_url}
                </Badge>
                {preview.payload.tags.map((t) => (
                  <Badge key={t} variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
                    #{t}
                  </Badge>
                ))}
              </div>
              <div className="flex-1 min-h-0 max-h-[45vh] overflow-y-auto custom-scrollbar border rounded-md">
                <pre className="text-[11px] leading-relaxed whitespace-pre-wrap p-4">
                  {preview.payload.body_markdown}
                </pre>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
