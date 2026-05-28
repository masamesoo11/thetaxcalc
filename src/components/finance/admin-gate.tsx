'use client';

import { useState, useEffect, useCallback } from 'react';
import { Shield, Lock, Eye, EyeOff, AlertTriangle, DollarSign, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// ─── Server-Side Auth via API ────────────────────────────────────────────────
// Authentication is now handled server-side via /api/auth/login
// Password is NEVER exposed to the client

export function AdminGate({ children }: { children: React.ReactNode }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  // Check existing session on mount
  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch('/api/auth/verify');
        if (res.ok) {
          const data = await res.json();
          setIsAuthenticated(data.authenticated === true);
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      } finally {
        setIsChecking(false);
      }
    }
    checkSession();
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setPassword('');
      } else {
        setError(data.error || 'Invalid password. Please try again.');
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [password]);

  const handleLogout = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // Ignore errors on logout
    }
    setIsAuthenticated(false);
    setPassword('');
  }, []);

  // Loading state — checking existing session
  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  // Authenticated — show admin dashboard
  if (isAuthenticated) {
    return (
      <div className="relative">
        {/* Logout button */}
        <div className="absolute -top-2 right-0 z-10">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-xs text-muted-foreground hover:text-red-400 gap-1.5"
          >
            <Lock className="h-3 w-3" />
            Logout
          </Button>
        </div>
        {children}
      </div>
    );
  }

  // Not authenticated — show login form
  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="rounded-2xl border border-border/30 bg-card/50 backdrop-blur-sm p-8 shadow-2xl shadow-black/20">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/20 mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Admin Access</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter the admin password to access the dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Lock className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Admin password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="pl-10 pr-10 bg-background/50 border-border/30"
                autoFocus
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {/* Error message */}
            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2 text-sm text-red-400">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white hover:from-emerald-500 hover:to-emerald-400"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Authenticating...
                </>
              ) : (
                'Unlock Dashboard'
              )}
            </Button>
          </form>

          {/* Security notice */}
          <div className="mt-6 rounded-lg bg-muted/30 p-3 text-xs text-muted-foreground text-center">
            <p>Secured with server-side authentication</p>
            <p className="mt-1">Sessions expire after 24 hours</p>
          </div>
        </div>

        {/* Brand footer */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-gradient-to-br from-emerald-500 to-emerald-600">
              <DollarSign className="h-3 w-3 text-white" />
            </div>
            TheTaxCalc
          </div>
        </div>
      </div>
    </div>
  );
}
