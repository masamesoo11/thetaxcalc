/**
 * Contact message store — module-level in-memory store.
 *
 * WHY IN-MEMORY: production runs in a Cloudflare Pages Worker where the
 * persistent DB stack (@libsql WASM, ~1.3 MB) was stripped to stay under the
 * 3 MiB bundle limit (see src/lib/db.ts for the full rationale). Messages
 * therefore live only while the worker is warm.
 *
 * PERSISTENT CHANNEL: the contact API route additionally forwards every
 * message to CONTACT_WEBHOOK_URL (env) when configured — set it to any
 * webhook receiver (Make/Zapier hook, Slack/Discord webhook, Telegram bot,
 * or a simple email-webhook service) for guaranteed delivery.
 *
 * Kept separate from src/lib/db.ts on purpose: this store is trivial,
 * self-contained, and doesn't touch the worker's typed db machinery.
 */

export interface ContactMessageRecord {
  id: string;
  name: string;
  email: string;
  topic: string;
  message: string;
  createdAt: string;
}

/** Cap the store so a public form can never grow worker memory unbounded. */
const MAX_MESSAGES = 200;

const store: ContactMessageRecord[] = [];

export function addContactMessage(record: ContactMessageRecord): void {
  store.unshift(record);
  if (store.length > MAX_MESSAGES) {
    store.length = MAX_MESSAGES;
  }
}

export function listContactMessages(limit = 100): ContactMessageRecord[] {
  return store.slice(0, Math.min(limit, MAX_MESSAGES));
}

export function contactMessageCount(): number {
  return store.length;
}
