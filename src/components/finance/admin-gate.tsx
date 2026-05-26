'use client';

import { useState, useSyncExternalStore } from 'react';
import { Shield, Lock, Eye, EyeOff, AlertTriangle, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// ─── Admin Password ──────────────────────────────────────────────────────────
// Change this to your desired admin password.
// For production, use an environment variable: process.env.NEXT_PUBLIC_ADMIN_PASSWORD
const ADMIN_PASSWORD = 'taxyield2026';

const SESSION_KEY = 'taxyield_admin_auth';

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
  const [unlocked, setUnlocked] = useState(false);

  // Read session auth via useSyncExternalStore
  const sessionAuth = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isAuthenticated = unlocked || sessionAuth === 'authenticated';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const adminPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || ADMIN_PASSWORD;

    if (password === adminPass) {
      setUnlocked(true);
      try {
        sessionStorage.setItem(SESSION_KEY, 'authenticated');
      } catch {
        // sessionStorage not available
      }
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  const handleLogout = () => {
    setUnlocked(false);
    setPassword('');
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // sessionStorage not available
    }
  };

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
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
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
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white hover:from-emerald-500 hover:to-emerald-400"
            >
              Unlock Dashboard
            </Button>
          </form>

          {/* Hint */}
          <div className="mt-6 rounded-lg bg-muted/30 p-3 text-xs text-muted-foreground text-center">
            <p>Default password: <code className="text-emerald-400 font-mono">taxyield2026</code></p>
            <p className="mt-1">Change it in <code className="text-muted-foreground/80">src/components/finance/admin-gate.tsx</code></p>
          </div>
        </div>

        {/* Brand footer */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-gradient-to-br from-emerald-500 to-emerald-600">
              <DollarSign className="h-3 w-3 text-white" />
            </div>
            TaxYield.io
          </div>
        </div>
      </div>
    </div>
  );
}
