'use client';

import { useState, useSyncExternalStore } from 'react';
import { Shield, Lock, Eye, EyeOff, AlertTriangle, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// ─── Admin Auth — Server-side only ─────────────────────────────────────────
// No hardcoded password. Auth happens via POST /api/auth/login which:
//   1. Validates password against process.env.ADMIN_PASSWORD (server-side)
//   2. Returns HTTP-only signed JWT cookie
//   3. Cookie verified by middleware on every /admin/* request
//
// This component only collects the password and posts to the API.
// It NEVER sees or compares the actual password.

const SESSION_KEY = 'thetaxcalc_admin_auth';

// ─── Session Storage Helpers (useSyncExternalStore compatible) ────────────────

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

function getSnapshot(): string {
  try {
    return sessionStorage.getItem(SESSION_KEY) || '';
  } catch {
    return '';
  }
}

function getServerSnapshot(): string {
  return '';
}

export function AdminGate({ children }: { children: React.ReactNode }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  // Read session auth via useSyncExternalStore
  const sessionAuth = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isAuthenticated = unlocked || sessionAuth === 'authenticated';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // ─── Server-side auth via API ─────────────────────────────────────
      // The API sets an HTTP-only JWT cookie that middleware will verify
      // on subsequent /admin/* requests. We never see the actual password
      // comparison — that happens server-side.
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setUnlocked(true);
        try {
          sessionStorage.setItem(SESSION_KEY, 'authenticated');
        } catch {
          // sessionStorage not available — cookie will still auth via middleware
        }
      } else {
        const data = await response.json().catch(() => ({}));
        setError(data.error || 'Incorrect password. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
            <Shield className="h-8 w-8 text-emerald-500" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Access Required</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your password to access the admin panel
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium leading-none">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="pl-10 pr-10"
                required
                disabled={loading}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-md bg-red-500/10 p-3 text-sm text-red-500">
              <AlertTriangle className="h-4 w-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading || !password}>
            {loading ? 'Authenticating...' : 'Unlock Admin Panel'}
          </Button>
        </form>

        <div className="text-center text-xs text-muted-foreground">
          <DollarSign className="inline h-3 w-3" /> TheTaxCalc Admin · Secured by JWT + HTTP-only cookies
        </div>
      </div>
    </div>
  );
}
