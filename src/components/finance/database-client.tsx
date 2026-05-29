'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Database,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Upload,
  RefreshCw,
  Loader2,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface DbStatus {
  configured: boolean;
  connected: boolean;
  tableExists: boolean;
  postCount: number;
  url: string | null;
  error: string | null;
}

export function DatabaseClient() {
  const [status, setStatus] = useState<DbStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);

  const fetchStatus = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/db-status');
      if (res.ok) {
        const data = await res.json();
        setStatus(data);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  const handleSeed = async () => {
    setSeeding(true);
    try {
      const res = await fetch('/api/admin/seed-db', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        toast.success(`Seeded ${data.seeded} articles! Total: ${data.totalInDb}`);
        fetchStatus();
      } else {
        toast.error(data.errors?.[0] || 'Failed to seed');
      }
    } catch {
      toast.error('Failed to seed database');
    } finally {
      setSeeding(false);
    }
  };

  const isConnected = status?.configured && status?.connected;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-emerald-400" />
        <span className="ml-2 text-sm text-muted-foreground">Checking database...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <Card className="border-border/50 bg-card/80">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base">
              <Database className="h-4 w-4 text-emerald-400" />
              Database Connection
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={fetchStatus} className="gap-1.5 text-xs text-muted-foreground">
              <RefreshCw className="h-3.5 w-3.5" /> Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          <div className="flex items-center gap-3">
            {isConnected ? (
              <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30 px-3 py-1">
                <CheckCircle2 className="h-4 w-4 mr-1.5" /> Connected
              </Badge>
            ) : status?.configured ? (
              <Badge className="bg-amber-500/15 text-amber-400 border-amber-500/30 px-3 py-1">
                <AlertTriangle className="h-4 w-4 mr-1.5" /> Connection Failed
              </Badge>
            ) : (
              <Badge className="bg-red-500/15 text-red-400 border-red-500/30 px-3 py-1">
                <XCircle className="h-4 w-4 mr-1.5" /> Not Configured
              </Badge>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg bg-muted/20 p-3">
              <p className="text-xs text-muted-foreground">Database URL</p>
              <p className="text-sm font-mono truncate">{status?.url || 'Not set'}</p>
            </div>
            <div className="rounded-lg bg-muted/20 p-3">
              <p className="text-xs text-muted-foreground">Auth Token</p>
              <p className="text-sm font-mono">{status?.configured ? '••••••••' : 'Not set'}</p>
            </div>
            <div className="rounded-lg bg-muted/20 p-3">
              <p className="text-xs text-muted-foreground">Table</p>
              <p className="text-sm">{status?.tableExists ? <span className="text-emerald-400">blog_posts exists</span> : <span className="text-muted-foreground">N/A</span>}</p>
            </div>
            <div className="rounded-lg bg-muted/20 p-3">
              <p className="text-xs text-muted-foreground">Posts</p>
              <p className="text-sm font-semibold">{status?.postCount ?? 0}</p>
            </div>
          </div>

          {status?.error && (
            <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400">
              <AlertTriangle className="h-4 w-4 inline mr-2" />{status.error}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      {isConnected && (
        <Card className="border-border/50 bg-card/80">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Database Actions</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3 text-center">
                <p className="text-2xl font-bold text-emerald-400">{status?.postCount ?? 0}</p>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
              <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3 text-center">
                <p className="text-2xl font-bold text-emerald-400">{status?.postCount ?? 0}</p>
                <p className="text-xs text-muted-foreground">Published</p>
              </div>
              <div className="rounded-lg bg-muted/20 border border-border/50 p-3 text-center">
                <p className="text-2xl font-bold text-muted-foreground">0</p>
                <p className="text-xs text-muted-foreground">Drafts</p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium">Seed from JSON Files</p>
                <p className="text-xs text-muted-foreground">Import articles from content/blog/*.json</p>
              </div>
              <Button onClick={handleSeed} disabled={seeding} className="gap-2 bg-emerald-600 hover:bg-emerald-700 shrink-0">
                {seeding ? <><Loader2 className="h-4 w-4 animate-spin" /> Seeding...</> : <><Upload className="h-4 w-4" /> Seed</>}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Setup Instructions */}
      {!status?.configured && (
        <Card className="border-border/50 bg-card/80">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Setup Instructions</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ol className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-2"><span className="text-emerald-400 font-bold">1.</span> Create a Turso account at turso.tech</li>
              <li className="flex gap-2"><span className="text-emerald-400 font-bold">2.</span> Create a database (e.g., &quot;thetaxcalc-blog&quot;)</li>
              <li className="flex gap-2"><span className="text-emerald-400 font-bold">3.</span> Copy the database URL</li>
              <li className="flex gap-2"><span className="text-emerald-400 font-bold">4.</span> Create an auth token</li>
              <li className="flex gap-2"><span className="text-emerald-400 font-bold">5.</span> Add TURSO_DATABASE_URL and TURSO_AUTH_TOKEN to .env</li>
              <li className="flex gap-2"><span className="text-emerald-400 font-bold">6.</span> Restart the dev server and seed the database</li>
            </ol>
            <div className="mt-4 rounded-lg bg-muted/30 p-4">
              <pre className="text-xs text-emerald-400 font-mono">
{`TURSO_DATABASE_URL=libsql://your-db.turso.io
TURSO_AUTH_TOKEN=your-token-here`}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
