/**
 * TEMP local sweep: fetch every calculator page from the dev server and verify
 * <title> names the same state as the H1. Catches any rendering-level mismatch
 * the registry audit could miss (middleware, layout title templates, etc.).
 */
import { CALCULATOR_ROUTES, STANDALONE_CALCULATOR_ROUTES } from '../src/lib/calculator-routes';
import { ALL_STATE_KEYS } from '../src/lib/state-sales-tax-data';

const BASE = 'http://localhost:3000';
const ALIASES: Record<string, string[]> = {
  'new-york-city': ['NYC'],
};

function extract(html: string, re: RegExp): string | null {
  const m = html.match(re);
  return m ? m[1].trim() : null;
}

async function check(url: string, names: string[]): Promise<string | null> {
  const res = await fetch(url);
  const html = await res.text();
  const title = extract(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const h1 = extract(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (!res.ok) return `${url} → HTTP ${res.status}`;
  if (!title) return `${url} → NO <title>`;
  const hay = title.toLowerCase().replace(/[^a-z0-9]/g, '');
  for (const n of names) {
    if (hay.includes(n.toLowerCase().replace(/[^a-z0-9]/g, ''))) return null; // OK
  }
  return `${url}\n  title="${title}"\n  h1="${(h1 ?? '').slice(0, 60)}" (expected: ${names.join('/')})`;
}

async function main() {
  const problems: string[] = [];
  const checked: string[] = [];

  // 1. State income-tax calculator routes from the registry
  for (const r of CALCULATOR_ROUTES) {
    if (!r.slug.endsWith('-tax-calculator')) continue;
    const st = r.slug.replace(/-tax-calculator$/, '');
    const tc = st.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' ');
    const names = [tc, ...(ALIASES[st] ?? [])];
    const p = await check(`${BASE}/${r.slug}`, names);
    checked.push(r.slug);
    if (p) problems.push(p);
  }

  // 2. Non-state calculator routes (identity = state-name-from-h1 not applicable; print for eyeball)
  const nonState: string[] = [];
  for (const r of CALCULATOR_ROUTES) {
    if (r.slug.endsWith('-tax-calculator')) continue;
    const res = await fetch(`${BASE}/${r.slug}`);
    const html = await res.text();
    const title = extract(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
    nonState.push(`${r.slug.padEnd(38)} | ${title}`);
    checked.push(r.slug);
  }

  // 3. Sales-tax state pages
  for (const key of ALL_STATE_KEYS) {
    const res = await fetch(`${BASE}/sales-tax-calculator/${key}`);
    const html = await res.text();
    const title = extract(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
    const h1 = extract(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i);
    checked.push(`sales-tax/${key}`);
    const stName = key.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' ');
    const hay = (title ?? '').toLowerCase().replace(/[^a-z0-9]/g, '');
    if (!hay.includes(stName.toLowerCase().replace(/[^a-z0-9]/g, ''))) {
      problems.push(`/sales-tax-calculator/${key}\n  title="${title}"\n  h1="${(h1 ?? '').slice(0, 60)}"`);
    }
  }

  // 4. Standalone calculator pages
  for (const s of STANDALONE_CALCULATOR_ROUTES) {
    const res = await fetch(`${BASE}${s.path}`);
    const html = await res.text();
    const title = extract(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
    nonState.push(`${s.path.padEnd(38)} | ${title}`);
    checked.push(s.path);
    if (!res.ok || !title) problems.push(`${s.path} → HTTP ${res.status} title="${title}"`);
  }

  console.log('════ NON-STATE ROUTES (eyeball) ════');
  for (const n of nonState) console.log(n);
  console.log(`\n════ PROBLEMS ════ (${problems.length})`);
  for (const p of problems) console.log('✗ ' + p);
  console.log(`\nChecked ${checked.length} pages, ${problems.length} problems.`);
}

main().catch((e) => { console.error('SWEEP FAILED:', e); process.exit(1); });
