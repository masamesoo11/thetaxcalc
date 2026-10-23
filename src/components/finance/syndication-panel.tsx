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
  Layers,
  Newspaper,
  Users,
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
const LS_FOREM_BASE = 'thetaxcalc_forem_base';
const LS_FOREM_KEY = 'thetaxcalc_forem_key';
const LS_TELEGRAPH_RECORDS = 'thetaxcalc_telegraph_records';

interface MediumRecord {
  id: string;
  url: string;
}

interface PipelineStatus {
  totalPublishedPosts: number;
  envKeyConfigured: boolean;
  tokenConfigured: boolean;
  foremConfigured?: boolean;
  /** Server-side truth: slugs that actually have syndicatable content */
  contentSlugs?: string[];
  /** Committed telegraph publish-state map (slugs already on telegra.ph) */
  telegraphMap?: Record<string, TelegraphRecord>;
}

interface TelegraphRecord {
  url: string;
  publishedAt?: string;
}

interface ForemVerifyResponse {
  ok: boolean;
  username?: string;
  error?: string;
  foremBase?: string;
}

interface TelegraphPublishResponse {
  ok: boolean;
  attempted?: number;
  succeeded?: number;
  failed?: number;
  results?: { slug: string; ok: boolean; url?: string; error?: string; skipped?: string }[];
  error?: string;
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
  const [foremBaseInput, setForemBaseInput] = useState<string>(() => readLS(LS_FOREM_BASE) ?? '');
  const [foremKeyInput, setForemKeyInput] = useState<string>(() => readLS(LS_FOREM_KEY) ?? '');
  const [foremVerified, setForemVerified] = useState<{
    ok: boolean;
    username?: string;
    base?: string;
    error?: string;
  } | null>(null);
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

  // Telegraph records (localStorage mirror of the committed state map —
  // covers manual publishes until the next automated run syncs them into
  // src/generated/telegraph-published.ts)
  const [telegraphRecords, setTelegraphRecords] = useState<Record<string, TelegraphRecord>>(() =>
    readLSJson<Record<string, TelegraphRecord>>(LS_TELEGRAPH_RECORDS, {})
  );

  // Forem scan state
  const [foremDiff, setForemDiff] = useState<DiffResponse | null>(null);

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

  const saveTelegraphRecord = useCallback((slug: string, record: TelegraphRecord) => {
    setTelegraphRecords((prev) => {
      const next = { ...prev, [slug]: record };
      try {
        localStorage.setItem(LS_TELEGRAPH_RECORDS, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  /** Merged telegraph view: committed state map + local manual-publish records */
  const telegraphMap = useMemo<Record<string, TelegraphRecord>>(
    () => ({ ...(pipeline?.telegraphMap ?? {}), ...telegraphRecords }),
    [pipeline, telegraphRecords]
  );

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

  const foremVerifyMutation = useMutation({
    mutationFn: async (): Promise<ForemVerifyResponse> => {
      const res = await fetch('/api/syndicate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'verify-forem',
          foremBase: foremBaseInput.trim() || undefined,
          foremKey: foremKeyInput.trim() || undefined,
        }),
      });
      const data = (await res.json()) as ForemVerifyResponse;
      if (!res.ok && !data.error) data.error = `Request failed (HTTP ${res.status})`;
      return data;
    },
    onSuccess: (data) => {
      try {
        if (foremBaseInput.trim()) localStorage.setItem(LS_FOREM_BASE, foremBaseInput.trim());
        if (foremKeyInput.trim()) localStorage.setItem(LS_FOREM_KEY, foremKeyInput.trim());
      } catch {
        // ignore
      }
      setForemVerified({
        ok: data.ok,
        username: data.username,
        base: data.foremBase ?? foremBaseInput.trim(),
        error: data.error,
      });
      setForemDiff(null);
      if (data.ok) {
        toast.success(`Community connected as @${data.username ?? 'unknown'}`);
      } else {
        toast.error(data.error ?? 'Verification failed');
      }
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const foremScanMutation = useMutation({
    mutationFn: async (): Promise<DiffResponse> => {
      const res = await fetch('/api/syndicate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'diff-forem',
          foremBase: foremBaseInput.trim() || undefined,
          foremKey: foremKeyInput.trim() || undefined,
        }),
      });
      const data = (await res.json()) as DiffResponse;
      if (!res.ok && !data.error) data.error = `Request failed (HTTP ${res.status})`;
      return data;
    },
    onSuccess: (data) => {
      if (data.ok) {
        setForemDiff(data);
        toast.success(
          `Scan complete — ${data.newCount} new, ${data.syndicatedCount} syndicated, ${data.staleCount} updated on site`
        );
      } else {
        setForemDiff(null);
        toast.error(data.error ?? 'Scan failed');
      }
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const foremPublishAllMutation = useMutation({
    mutationFn: async (): Promise<PublishResponse> => {
      const res = await fetch('/api/syndicate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'publish-all-forem',
          foremBase: foremBaseInput.trim() || undefined,
          foremKey: foremKeyInput.trim() || undefined,
          mode,
        }),
      });
      return res.json();
    },
    onSuccess: (data) => {
      if (data.ok) {
        toast.success(`Community bulk publish done — ${data.succeeded ?? 0}/${data.attempted ?? 0} succeeded`);
        foremScanMutation.mutate();
      } else {
        toast.error(data.error ?? 'Community bulk publish failed');
      }
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const foremPublishOneMutation = useMutation({
    mutationFn: async (slug: string): Promise<PublishResponse> => {
      const res = await fetch('/api/syndicate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'publish-forem',
          slug,
          foremBase: foremBaseInput.trim() || undefined,
          foremKey: foremKeyInput.trim() || undefined,
          mode,
        }),
      });
      return res.json();
    },
    onSuccess: (data) => {
      if (data.result?.ok) {
        toast.success(`Published to the community${data.result.url ? `: ${data.result.url}` : ''}`);
        foremScanMutation.mutate();
      } else {
        toast.error(data.result?.error ?? data.error ?? 'Community publish failed');
      }
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const telegraphPublishOneMutation = useMutation({
    mutationFn: async (slug: string): Promise<TelegraphPublishResponse> => {
      const res = await fetch('/api/syndicate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'publish-telegraph', slug }),
      });
      return res.json();
    },
    onSuccess: (data) => {
      const r = data.results?.[0];
      if (r?.ok && r.url) {
        if (r.url) saveTelegraphRecord(r.slug, { url: r.url, publishedAt: new Date().toISOString() });
        toast.success(`Teaser live on telegra.ph: ${r.url}`);
      } else {
        toast.error(r?.error ?? data.error ?? 'Telegraph publish failed');
      }
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const telegraphAutoMutation = useMutation({
    mutationFn: async (): Promise<TelegraphPublishResponse> => {
      const res = await fetch('/api/syndicate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'publish-telegraph' }),
      });
      return res.json();
    },
    onSuccess: (data) => {
      if (!data.ok) {
        toast.error(data.error ?? 'Telegraph batch failed');
        return;
      }
      let published = 0;
      for (const r of data.results ?? []) {
        if (r.ok && r.url) {
          saveTelegraphRecord(r.slug, { url: r.url, publishedAt: new Date().toISOString() });
          published++;
        }
      }
      const skipped = (data.results ?? []).filter((r) => r.skipped).length;
      toast.success(
        `Telegraph batch done — ${data.succeeded ?? published} teaser(s) live${skipped ? `, ${skipped} already published` : ''}`
      );
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
    mediumPublishMutation.isPending ||
    foremVerifyMutation.isPending ||
    foremScanMutation.isPending ||
    foremPublishAllMutation.isPending ||
    foremPublishOneMutation.isPending ||
    telegraphPublishOneMutation.isPending ||
    telegraphAutoMutation.isPending;

  return (
    <div className="space-y-6">
      {/* ── What this does ─────────────────────────────────────────────── */}
      <Alert className="border-emerald-500/30 bg-emerald-500/5">
        <Wand2 className="h-4 w-4 text-emerald-500" />
        <AlertTitle>What this does</AlertTitle>
        <AlertDescription className="text-xs leading-relaxed">
          Publishes blog posts to multiple channels with{' '}
          <code className="rounded bg-muted px-1">canonical_url</code> attribution back to thetaxcalc.com:{' '}
          <strong>dev.to</strong> and any <strong>Forem community</strong> carry the full text (the canonical tag keeps
          the copies from ever competing with the original in Google), <strong>Telegraph</strong> gets a short teaser
          + read-more link, and <strong>Medium</strong> is wired for legacy tokens. New posts are managed through code
          deploys, so diffs are <strong>stateless</strong> — each platform&apos;s own canonical fields are the source of
          truth (Telegraph uses a committed state map, since its API has no listing). No database involved.
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
JWT_SECRET        long random string (session cookie signing)
FOREM_API_BASE    optional — https://<community-host>/api of another Forem site
FOREM_API_KEY     optional — that community's API key (its Settings → Extensions)`}
                  </pre>
                </li>
                <li className="leading-relaxed">
                  <strong>Redeploy</strong> — env vars only apply to deployments made <em>after</em>
                  saving them: Deployments tab → latest deployment → <strong>⋯ → Retry deployment</strong>.
                </li>
                <li className="leading-relaxed">
                  Done — each daily run publishes up to <strong>5 newest</strong> new posts <em>per channel</em>{' '}
                  (dev.to, Telegraph teasers, and the Forem community once configured), continuing on the
                  following days. Already-syndicated posts are never duplicated.
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
                        {telegraphMap[item2.slug]?.url && (
                          <a
                            href={telegraphMap[item2.slug].url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 text-muted-foreground hover:text-foreground hover:underline inline-flex items-center gap-0.5"
                          >
                            Telegraph teaser <ExternalLink className="h-3 w-3" />
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
                      {item2.hasContent && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-2"
                          onClick={() => telegraphPublishOneMutation.mutate(item2.slug)}
                          disabled={busy}
                          aria-label={`Publish ${item2.title} teaser to Telegraph`}
                          title="Publish a teaser to telegra.ph (free, no account)"
                        >
                          {telegraphPublishOneMutation.isPending && telegraphPublishOneMutation.variables === item2.slug ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            'T'
                          )}
                        </Button>
                      )}
                      {foremVerified?.ok && item2.hasContent && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-2"
                          onClick={() => foremPublishOneMutation.mutate(item2.slug)}
                          disabled={busy}
                          aria-label={`Publish ${item2.title} to the Forem community`}
                          title="Publish to the connected Forem community"
                        >
                          {foremPublishOneMutation.isPending && foremPublishOneMutation.variables === item2.slug ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            'F'
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

      {/* ── More channels: Telegraph + any Forem community ────────────── */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Layers className="h-4 w-4 text-emerald-500" />
            More channels
          </CardTitle>
          <CardDescription>
            Additional syndication targets alongside dev.to — everything carries attribution back to
            thetaxcalc.com (Telegraph is teaser-only; see notes).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Telegraph */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Label className="flex items-center gap-2 text-sm font-medium">
                <Newspaper className="h-4 w-4 text-emerald-500" /> Telegraph (telegra.ph)
                <Badge variant="outline" className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30">
                  Live · free · zero setup
                </Badge>
              </Label>
              <Button size="sm" variant="outline" onClick={() => telegraphAutoMutation.mutate()} disabled={busy}>
                {telegraphAutoMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                Publish 5 newest teasers now
              </Button>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {Object.keys(telegraphMap).length} teaser page(s) live. Each post gets a short preview + a
              &quot;read the full guide&quot; link on telegra.ph (a high-authority publishing platform) — full text is
              deliberately <em>not</em> published there because Telegraph has no canonical support
              (duplicate-content safety). Telegraph article links are nofollow, so treat this as a
              discovery/brand-mentions channel; the daily workflow also drips up to 5 new teasers automatically.
            </p>
          </div>

          <Separator className="bg-border/50" />

          {/* Forem community */}
          <div className="space-y-2">
            <Label htmlFor="forem-base" className="flex items-center gap-2 text-sm font-medium">
              <Users className="h-4 w-4 text-emerald-500" /> Any Forem community (dev.to-compatible)
              <Badge variant="outline" className="text-[10px] bg-muted text-muted-foreground">
                Optional · bring your own community
              </Badge>
            </Label>
            <div className="grid gap-2 md:grid-cols-[1fr_1fr_auto]">
              <Input
                id="forem-base"
                type="text"
                placeholder="Community URL (e.g. https://community.codenewbie.org)"
                value={foremBaseInput}
                onChange={(e) => setForemBaseInput(e.target.value)}
                autoComplete="off"
              />
              <Input
                id="forem-key"
                type="password"
                placeholder="That community's API key (its Settings → Extensions)"
                value={foremKeyInput}
                onChange={(e) => setForemKeyInput(e.target.value)}
                autoComplete="off"
              />
              <Button
                onClick={() => foremVerifyMutation.mutate()}
                disabled={busy || (!foremBaseInput.trim() && !pipeline?.foremConfigured)}
                size="sm"
                className="shrink-0"
              >
                {foremVerifyMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Verify'}
              </Button>
            </div>
            {foremVerified?.ok && (
              <p className="text-xs text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" /> Connected as @{foremVerified.username} on {foremVerified.base}
              </p>
            )}
            {foremVerified && !foremVerified.ok && foremVerified.error && (
              <p className="text-xs text-rose-400 flex items-center gap-1">
                <XCircle className="h-3 w-3" /> {foremVerified.error}
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => foremScanMutation.mutate()}
                disabled={busy || !foremVerified?.ok}
              >
                {foremScanMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <SearchCheck className="h-4 w-4" />
                )}
                Scan community
              </Button>
              {foremDiff?.ok && foremDiff.newCount > 0 && (
                <Button size="sm" onClick={() => foremPublishAllMutation.mutate()} disabled={busy}>
                  {foremPublishAllMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  Publish all new ({foremDiff.newCount})
                </Button>
              )}
            </div>
            {foremDiff?.ok && (
              <p className="text-xs text-muted-foreground">
                Community scan: {foremDiff.newCount} new · {foremDiff.syndicatedCount} syndicated ·{' '}
                {foremDiff.staleCount} updated on site
              </p>
            )}
            <p className="text-xs text-muted-foreground leading-relaxed">
              Works with any site running{' '}
              <a
                href="https://github.com/forem/forem"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:underline inline-flex items-center gap-0.5"
              >
                Forem <ExternalLink className="h-3 w-3" />
              </a>
              , the same platform dev.to runs on — create an account on the community, generate an API key under
              its Settings → Extensions, then paste both here. For the daily automation, set the same values as
              FOREM_API_BASE + FOREM_API_KEY in Cloudflare (automation status:{' '}
              {pipeline?.foremConfigured ? 'configured ✓' : 'not configured yet'}).
            </p>
          </div>

          <Separator className="bg-border/50" />

          {/* Platform notes */}
          <div className="text-xs text-muted-foreground space-y-1.5">
            <p>
              <strong className="text-foreground">Medium:</strong> token generation is frozen for most accounts —
              the free manual path (medium.com → Write → Import story → paste a thetaxcalc.com/blog/… URL) is
              still open and Medium adds the canonical automatically. That import flow is the strongest DR link
              you can get with zero API.
            </p>
            <p>
              <strong className="text-foreground">Hashnode:</strong> retired free API access in May 2026 —
              publishing via API now requires a paid Hashnode Pro plan, so it is not wired up.
            </p>
          </div>
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
