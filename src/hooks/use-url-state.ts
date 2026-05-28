'use client';

import { useMemo, useSyncExternalStore } from 'react';

/**
 * URL query parameter state management.
 * Uses useSyncExternalStore to subscribe to URL changes
 * and derive state without calling setState in effects.
 *
 * Replaces the older use-hash-state.ts which used hash fragments.
 * This approach uses standard query parameters (?key=value) for:
 * - Cleaner, shorter URLs
 * - Better SEO (search engines ignore hash fragments)
 * - Standard URL semantics
 */

// ─── Subscribe to popstate events (back/forward navigation) ─────────────────

function subscribeToUrl(callback: () => void): () => void {
  window.addEventListener('popstate', callback);
  return () => window.removeEventListener('popstate', callback);
}

// ─── Snapshots ──────────────────────────────────────────────────────────────

function getSearchSnapshot(): string {
  return window.location.search;
}

function getServerSearchSnapshot(): string {
  return '';
}

// ─── Parse search string into params ────────────────────────────────────────

export function parseSearchString(search: string): Record<string, string> {
  const result: Record<string, string> = {};
  if (!search || !search.startsWith('?')) return result;
  const searchParams = new URLSearchParams(search);
  searchParams.forEach((value, key) => {
    result[key] = value;
  });
  return result;
}

// ─── Hook to get all URL params ─────────────────────────────────────────────

export function useUrlParams(): Record<string, string> {
  const search = useSyncExternalStore(subscribeToUrl, getSearchSnapshot, getServerSearchSnapshot);
  const params = useMemo(() => parseSearchString(search), [search]);
  return params;
}

// ─── Hook to get a single param ─────────────────────────────────────────────

export function useUrlParam(key: string, defaultValue: string = ''): string {
  const params = useUrlParams();
  return params[key] || defaultValue;
}

// ─── Hook to get a numeric param ────────────────────────────────────────────

export function useUrlNumber(key: string, defaultValue: number = 0): number {
  const params = useUrlParams();
  const value = params[key];
  return value ? Number(value) || defaultValue : defaultValue;
}

// ─── Update URL params without page reload ──────────────────────────────────

export function updateUrlState(params: Record<string, string | number | boolean>) {
  const searchParams = new URLSearchParams(window.location.search);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '' && value !== 0) {
      searchParams.set(key, String(value));
    } else {
      searchParams.delete(key);
    }
  });
  const query = searchParams.toString();
  const newUrl = query ? `${window.location.pathname}?${query}` : window.location.pathname;
  window.history.replaceState(null, '', newUrl);
}

// ─── Backward Compatibility: Migrate old hash URLs ──────────────────────────
//
// Old-style URLs looked like: /paycheck-calculator#home?salary=75000&state=illinois
// New-style URLs look like: /paycheck-calculator?salary=75000&state=illinois
//
// This function detects old hash-based params and converts them to query params.

export function migrateHashUrl() {
  if (typeof window === 'undefined') return;

  const hash = window.location.hash;
  if (!hash || hash === '#' || hash === '#/' || hash === '#home' || hash === '#admin') return;

  // Skip admin routes — they use their own hash-based routing
  if (hash.startsWith('#admin')) return;

  // Parse old-style hash: #home?salary=75000&state=illinois
  const cleaned = hash.startsWith('#') ? hash.substring(1) : hash;
  const [page, query] = cleaned.split('?');

  if (query) {
    // Merge hash params into search params
    const searchParams = new URLSearchParams(window.location.search);
    const hashParams = new URLSearchParams(query);
    hashParams.forEach((value, key) => {
      searchParams.set(key, value);
    });
    const newSearch = searchParams.toString();
    const newUrl = newSearch ? `${window.location.pathname}?${newSearch}` : window.location.pathname;
    window.history.replaceState(null, '', newUrl);
  } else {
    // Just remove the hash (page name only, no params)
    window.history.replaceState(null, '', window.location.pathname);
  }
}
