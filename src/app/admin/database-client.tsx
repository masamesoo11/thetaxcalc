'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Database,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Upload,
  RefreshCw,
  ExternalLink,
  Shield,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from 'sonner';

// ─── Types ────────────────────────────────────────────────────────────────────

interface DbStatus {
  status: 'connected' | 'configured' | 'not_configured';
  maskedUrl: string | null;
  postCount: number;
  publishedCount: number;
  draftCount: number;
  error?: string;
}

interface SeedResult {
  success: boolean;
  seeded: number;
  skipped: number;
  total: number;
  errors?: string[];
}

// ─── Local Storage Key ────────────────────────────────────────────────────────

const LAST_SEEDED_KEY = 'thetaxcalc-last-seeded-time';

// ─── Main Component ──────────────────────────────────────────────────────────

export function DatabaseClient() {
  const queryClient = useQueryClient();

  // Fetch database status
  const {
    data: status,
    isLoading,
    error: fetchError,
    refetch,
  } = useQuery<DbStatus>({
    queryKey: ['admin-db-status'],
    queryFn: async () => {
      const res = await fetch('/api/admin/db-status');
      if (!res.ok) throw new Error('Failed to fetch database status');
      return res.json();
    },
  });

  // Seed mutation
  const seedMutation = useMutation<SeedResult, Error>({
    mutationFn: async () => {
      const res = await fetch('/api/admin/seed-db', { method: 'POST' });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to seed database');
      }
      return res.json();
    },
    onSuccess: (data) => {
      // Save last seeded time
      localStorage.setItem(LAST_SEEDED_KEY, new Date().toISOString());

      // Invalidate and refetch status
      queryClient.invalidateQueries({ queryKey: ['admin-db-status'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });

      toast.success(`Successfully seeded ${data.seeded} article${data.seeded !== 1 ? 's' : ''}`);

      if (data.errors && data.errors.length > 0) {
        data.errors.forEach((err) => toast.error(`Seed error: ${err}`));
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const isConnected = status?.status === 'connected';
  const isConfigured = status?.status === 'configured';
  const isNotConfigured = status?.status === 'not_configured';

  // Get last seeded time from localStorage
  const lastSeededTime = typeof window !== 'undefined'
    ? localStorage.getItem(LAST_SEEDED_KEY)
    : null;

  return (
    <div className="space-y-6">
      {/* Connection Status Card */}
      <ConnectionStatusCard
        status={status}
        isLoading={isLoading}
        fetchError={fetchError}
        onRefresh={() => refetch()}
      />

      {/* Setup Instructions — shown when not configured */}
      {isNotConfigured && <SetupInstructionsCard />}

      {/* Seed Database — shown when connected */}
      {isConnected && (
        <SeedDatabaseCard
          onSeed={() => seedMutation.mutate()}
          isSeeding={seedMutation.isPending}
          seedResult={seedMutation.data ?? null}
        />
      )}

      {/* Database Info — shown when connected */}
      {isConnected && status && (
        <DatabaseInfoCard
          postCount={status.postCount}
          publishedCount={status.publishedCount}
          draftCount={status.draftCount}
          lastSeededTime={lastSeededTime}
        />
      )}

      {/* Configured but not connected — show troubleshooting */}
      {isConfigured && <TroubleshootingCard error={status?.error} />}
    </div>
  );
}

// ─── Connection Status Card ──────────────────────────────────────────────────

function ConnectionStatusCard({
  status,
  isLoading,
  fetchError,
  onRefresh,
}: {
  status?: DbStatus;
  isLoading: boolean;
  fetchError: Error | null;
  onRefresh: () => void;
}) {
  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Database className="h-4 w-4 text-emerald-400" />
            Database Connection
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRefresh}
            disabled={isLoading}
            className="h-8 w-8 p-0"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="flex items-center gap-3 py-4">
            <Loader2 className="h-5 w-5 animate-spin text-emerald-400" />
            <span className="text-sm text-muted-foreground">Checking connection...</span>
          </div>
        )}

        {fetchError && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Connection Error</AlertTitle>
            <AlertDescription>
              Failed to check database status. Please try again.
            </AlertDescription>
          </Alert>
        )}

        {status && !isLoading && !fetchError && (
          <div className="space-y-4">
            {/* Status Indicator */}
            <div className="flex items-center gap-3">
              {status.status === 'connected' && (
                <>
                  <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  <span className="font-semibold text-emerald-400">Connected</span>
                </>
              )}
              {status.status === 'configured' && (
                <>
                  <div className="h-3 w-3 rounded-full bg-yellow-500 animate-pulse" />
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  <span className="font-semibold text-yellow-400">Configured but not connected</span>
                </>
              )}
              {status.status === 'not_configured' && (
                <>
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <XCircle className="h-5 w-5 text-red-400" />
                  <span className="font-semibold text-red-400">Not configured</span>
                </>
              )}
            </div>

            {/* Database URL */}
            {status.maskedUrl && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">URL:</span>
                <code className="rounded bg-muted px-2 py-0.5 text-xs font-mono">
                  {status.maskedUrl}
                </code>
              </div>
            )}

            {/* Post count for connected */}
            {status.status === 'connected' && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Posts in database:</span>
                <Badge variant="outline" className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30">
                  {status.postCount}
                </Badge>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Setup Instructions Card ─────────────────────────────────────────────────

function SetupInstructionsCard() {
  const steps = [
    {
      num: 1,
      text: 'Go to',
      link: { href: 'https://turso.tech/app', label: 'turso.tech/app' },
      suffix: 'and sign in or create an account',
    },
    {
      num: 2,
      text: 'Create a new database (e.g., "thetaxcalc-blog")',
    },
    {
      num: 3,
      text: 'Copy the database URL (looks like libsql://your-db-name-your-org.turso.io)',
    },
    {
      num: 4,
      text: 'Create an auth token for the database',
    },
    {
      num: 5,
      text: 'Add the following to your .env file or Cloudflare environment variables:',
    },
    {
      num: 6,
      text: 'Restart the dev server or redeploy your application',
    },
  ];

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Shield className="h-4 w-4 text-emerald-400" />
          Setup Instructions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            To connect your Turso database, follow these steps:
          </p>

          <ol className="space-y-3">
            {steps.map((step) => (
              <li key={step.num} className="flex gap-3 text-sm">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-xs font-bold text-emerald-400">
                  {step.num}
                </span>
                <span className="text-muted-foreground pt-0.5">
                  {step.text}
                  {step.link && (
                    <>
                      {' '}
                      <a
                        href={step.link.href}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                      >
                        {step.link.label}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                      {step.suffix}
                    </>
                  )}
                </span>
              </li>
            ))}
          </ol>

          {/* Env variable example */}
          <div className="rounded-lg bg-muted/50 border border-border/50 p-4 mt-3">
            <p className="text-xs font-mono text-muted-foreground mb-2"># .env</p>
            <pre className="text-xs font-mono space-y-1">
              <code className="text-emerald-400">TURSO_DATABASE_URL</code>
              <code className="text-muted-foreground">=libsql://your-db-name-your-org.turso.io</code>
              {'\n'}
              <code className="text-emerald-400">TURSO_AUTH_TOKEN</code>
              <code className="text-muted-foreground">=your-auth-token</code>
            </pre>
          </div>

          {/* Free tier note */}
          <Alert className="border-emerald-500/20 bg-emerald-500/5">
            <Shield className="h-4 w-4 text-emerald-400" />
            <AlertTitle className="text-emerald-400">Free Tier Available</AlertTitle>
            <AlertDescription className="text-muted-foreground">
              Turso offers a generous free tier: 9GB storage, 1 billion reads/month.
              Perfect for a blog database.
            </AlertDescription>
          </Alert>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Seed Database Card ──────────────────────────────────────────────────────

function SeedDatabaseCard({
  onSeed,
  isSeeding,
  seedResult,
}: {
  onSeed: () => void;
  isSeeding: boolean;
  seedResult: SeedResult | null;
}) {
  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Upload className="h-4 w-4 text-emerald-400" />
          Seed Database
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Import blog articles from the <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">content/blog/</code> JSON files
            into your Turso database. Existing articles with matching slugs will be updated.
          </p>

          <Button
            onClick={onSeed}
            disabled={isSeeding}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            {isSeeding ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Seeding...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Seed Database from JSON Files
              </>
            )}
          </Button>

          {/* Seed result */}
          {seedResult && !isSeeding && (
            <Alert className="border-emerald-500/20 bg-emerald-500/5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <AlertTitle className="text-emerald-400">Seeding Complete</AlertTitle>
              <AlertDescription className="text-muted-foreground">
                Successfully seeded {seedResult.seeded} of {seedResult.total} article{seedResult.total !== 1 ? 's' : ''}.
                {seedResult.skipped > 0 && ` (${seedResult.skipped} skipped)`}
              </AlertDescription>
            </Alert>
          )}

          {/* Seed errors */}
          {seedResult?.errors && seedResult.errors.length > 0 && (
            <div className="space-y-1">
              {seedResult.errors.map((err, i) => (
                <p key={i} className="text-xs text-red-400">{err}</p>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Database Info Card ──────────────────────────────────────────────────────

function DatabaseInfoCard({
  postCount,
  publishedCount,
  draftCount,
  lastSeededTime,
}: {
  postCount: number;
  publishedCount: number;
  draftCount: number;
  lastSeededTime: string | null;
}) {
  const infoItems = [
    {
      label: 'Total Posts',
      value: postCount,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/15',
    },
    {
      label: 'Published',
      value: publishedCount,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/15',
    },
    {
      label: 'Drafts',
      value: draftCount,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/15',
    },
  ];

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Database className="h-4 w-4 text-emerald-400" />
          Database Info
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Stats grid */}
          <div className="grid gap-3 sm:grid-cols-3">
            {infoItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-lg border border-border/50 p-3"
              >
                <div className={`h-9 w-9 rounded-lg ${item.bgColor} flex items-center justify-center shrink-0`}>
                  <span className={`text-lg font-bold ${item.color}`}>
                    {item.value}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Last seeded time */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground pt-1">
            <span>Last seeded:</span>
            {lastSeededTime ? (
              <span className="text-foreground">
                {new Date(lastSeededTime).toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                })}
              </span>
            ) : (
              <span className="text-muted-foreground italic">Never</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Troubleshooting Card ────────────────────────────────────────────────────

function TroubleshootingCard({ error }: { error?: string }) {
  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-yellow-400" />
          Connection Troubleshooting
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Cannot Connect</AlertTitle>
            <AlertDescription>
              The database URL and auth token are set, but the connection failed.
              {error && (
                <span className="block mt-1 text-xs font-mono opacity-80">
                  Error: {error}
                </span>
              )}
            </AlertDescription>
          </Alert>

          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Common causes:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Invalid or expired auth token</li>
              <li>Incorrect database URL</li>
              <li>Database has been deleted or paused</li>
              <li>Network connectivity issues</li>
            </ul>
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Steps to resolve:</p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>
                Verify your credentials at{' '}
                <a
                  href="https://turso.tech/app"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2 inline-flex items-center gap-1"
                >
                  turso.tech/app
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>Regenerate the auth token if it may have expired</li>
              <li>Confirm the database URL matches your Turso dashboard</li>
              <li>Update your .env file with the correct values</li>
              <li>Restart the dev server after changing environment variables</li>
            </ol>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
