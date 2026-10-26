/**
 * Telegraph Publish-State Resolver.
 *
 * The Telegraph (telegra.ph) API has no way to list a account's pages, so
 * dedup for that channel is STATEFUL — unlike dev.to/Forem, where the
 * platform's own canonical_url fields are the source of truth. The state map
 * is committed at src/generated/telegraph-published.ts and updated by the
 * daily GitHub Actions workflow, which is the only writer. The server treats
 * it as an advisory second line of defense (the workflow itself decides the
 * daily batch from the repo copy, which is always the freshest).
 */

import { TELEGRAPH_PUBLISHED } from '@/generated/telegraph-published';

export interface TelegraphRecord {
  url: string;
  publishedAt: string;
}

export function getTelegraphPublished(): Record<string, TelegraphRecord> {
  return TELEGRAPH_PUBLISHED ?? {};
}

export function isPublishedOnTelegraph(slug: string): TelegraphRecord | null {
  return getTelegraphPublished()[slug] ?? null;
}
