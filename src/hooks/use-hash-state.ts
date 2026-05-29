'use client';

import { useCallback, useMemo, useSyncExternalStore } from 'react';

/**
 * React 19-compliant URL hash state management.
 * Uses useSyncExternalStore to subscribe to hash changes
 * and derive state without calling setState in effects.
 */

// ─── Subscribe to hash changes ───────────────────────────────────────────────

function subscribeToHash(callback: () => void): () => void {
  window.addEventListener('hashchange', callback);
  return () => window.removeEventListener('hashchange', callback);
}

function getHashSnapshot(): string {
  return window.location.hash;
}

function getServerHashSnapshot(): string {
  return '';
}

// ─── Parse hash string into page + params ────────────────────────────────────

export function parseHashString(hash: string): { page: string; params: Record<string, string> } {
  const result: Record<string, string> = {};
  if (!hash || hash === '#' || hash === '#/') return { page: 'home', params: result };

  const cleaned = hash.startsWith('#') ? hash.substring(1) : hash;
  const [page, query] = cleaned.split('?');

  if (query) {
    const searchParams = new URLSearchParams(query);
    searchParams.forEach((value, key) => {
      result[key] = value;
    });
  }

  return { page: page || 'home', params: result };
}

// ─── Custom Hooks ────────────────────────────────────────────────────────────

export function useHashPage(): string {
  const hash = useSyncExternalStore(subscribeToHash, getHashSnapshot, getServerHashSnapshot);
  const { page } = useMemo(() => parseHashString(hash), [hash]);
  return page;
}

export function useHashParams(): Record<string, string> {
  const hash = useSyncExternalStore(subscribeToHash, getHashSnapshot, getServerHashSnapshot);
  const { params } = useMemo(() => parseHashString(hash), [hash]);
  return params;
}

// ─── Helper to get a single param with a default ─────────────────────────────

export function useHashParam(key: string, defaultValue: string = ''): string {
  const params = useHashParams();
  return params[key] || defaultValue;
}

// ─── Helper to get a numeric param ───────────────────────────────────────────

export function useHashNumber(key: string, defaultValue: number = 0): number {
  const params = useHashParams();
  const value = params[key];
  return value ? Number(value) || defaultValue : defaultValue;
}

// ─── Update hash without triggering full re-render cycles ────────────────────

export function updateHashState(page: string, params: Record<string, string | number | boolean>) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '' && value !== 0) {
      searchParams.set(key, String(value));
    }
  });
  const query = searchParams.toString();
  const newHash = query ? `#${page}?${query}` : `#${page}`;
  if (window.location.hash !== newHash) {
    window.history.replaceState(null, '', newHash);
  }
}
