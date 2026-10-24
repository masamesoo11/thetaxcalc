/**
 * Title consistency audit — every calculator route checked against its own identity.
 *
 * Catches the "page A shows page B's title" bug class deterministically:
 *  1. State-identity rule: for every *-tax-calculator route, the metaTitle / ogTitle /
 *     title / h1 must all name THAT route's state.
 *  2. Cross-contamination rule: no route's metaTitle may equal any other route's
 *     title / ogTitle (the exact failure mode of the 180e454 scripted transform).
 *  3. Length rule: <title> should stay in the ~40-65 char sweet spot.
 *  4. Sales-tax pages: same identity rule for getStateSEOMeta output.
 *
 * Run: bun scripts/audit-titles.ts   (exit 1 if any ERROR-level finding)
 */
import {
  CALCULATOR_ROUTES,
  type CalculatorRouteConfig,
} from '../src/lib/calculator-routes';
import {
  STATE_SALES_TAX,
  ALL_STATE_KEYS,
  getStateSEOMeta,
} from '../src/lib/state-sales-tax-data';

type Severity = 'ERROR' | 'WARN';
interface Finding {
  severity: Severity;
  route: string;
  field: string;
  problem: string;
  value: string;
}

const findings: Finding[] = [];
const err = (route: string, field: string, problem: string, value: string) =>
  findings.push({ severity: 'ERROR', route, field, problem, value });
const warn = (route: string, field: string, problem: string, value: string) =>
  findings.push({ severity: 'WARN', route, field, problem, value });

/** Acceptable display names per state-like slug (beyond Title-Cased slug itself). */
const STATE_ALIASES: Record<string, string[]> = {
  'new-york-city': ['NYC', 'New York City'],
  'district-of-columbia': ['DC', 'D.C.', 'District of Columbia'],
};

const titleCase = (kebab: string) =>
  kebab.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

function acceptedNames(stateKebab: string): string[] {
  const names = [titleCase(stateKebab), ...(STATE_ALIASES[stateKebab] ?? [])];
  return names;
}

/** Normalize for identity matching: strip non-alphanumerics, lowercase. */
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

function containsAnyName(haystack: string, names: string[]): string | null {
  const h = norm(haystack);
  for (const n of names) if (h.includes(norm(n))) return n;
  return null;
}

/* ── Build the ownership map for cross-contamination detection ───────────── */
const ownerByString = new Map<string, { slug: string; field: string }>();
for (const r of CALCULATOR_ROUTES) {
  for (const field of ['title', 'ogTitle'] as const) {
    const key = r[field].toLowerCase().trim();
    if (!key) continue;
    const prev = ownerByString.get(key);
    if (!prev) ownerByString.set(key, { slug: r.slug, field });
  }
}

/* ── 1+2+3: full audit of CALCULATOR_ROUTES ─────────────────────────────── */
for (const r of CALCULATOR_ROUTES) {
  const isStatePage = r.slug.endsWith('-tax-calculator');
  const stateKebab = isStatePage ? r.slug.replace(/-tax-calculator$/, '') : null;

  if (stateKebab) {
    const names = acceptedNames(stateKebab);
    for (const field of ['metaTitle', 'ogTitle', 'title', 'h1', 'metaDesc', 'description'] as const) {
      const val = r[field] as string;
      if (!containsAnyName(val, names)) {
        err(r.slug, field, `does not name its own state (expected one of: ${names.join(' / ')})`, val);
      }
    }
  }

  // Cross-contamination: my metaTitle == some other route's title/ogTitle?
  const mtKey = (r.metaTitle ?? '').toLowerCase().trim();
  if (mtKey) {
    const owner = ownerByString.get(mtKey);
    if (owner && owner.slug !== r.slug) {
      err(r.slug, 'metaTitle', `is the TITLE of a different route (${owner.slug} → ${owner.field})`, r.metaTitle ?? '');
    }
  }

  // Length
  const mtLen = (r.metaTitle ?? r.title).length;
  if (mtLen < 30 || mtLen > 65) {
    warn(r.slug, 'metaTitle length', `${mtLen} chars (target 40-65)`, r.metaTitle ?? r.title);
  }
}

/* ── 4: sales-tax state pages ───────────────────────────────────────────── */
for (const key of ALL_STATE_KEYS) {
  const st = STATE_SALES_TAX[key];
  const meta = getStateSEOMeta(key);
  const displayName = st.name; // e.g. "Texas"
  for (const field of ['metaTitle', 'ogTitle', 'h1', 'metaDesc', 'ogDescription'] as const) {
    const val = meta[field] as string;
    if (!val.includes(displayName)) {
      err(`sales-tax-calculator/${key}`, field, `does not name its own state (${displayName})`, val);
    }
  }
  const mtLen = meta.metaTitle.length;
  if (mtLen < 30 || mtLen > 65) {
    warn(`sales-tax-calculator/${key}`, 'metaTitle length', `${mtLen} chars`, meta.metaTitle);
  }
}

/* ── Uniqueness of metaTitles across the 67 routes (dup = confusion) ────── */
const seenMeta = new Map<string, string>();
for (const r of CALCULATOR_ROUTES) {
  const key = (r.metaTitle ?? r.title).toLowerCase().trim();
  if (seenMeta.has(key)) {
    err(r.slug, 'metaTitle', `duplicate of route ${seenMeta.get(key)}`, r.metaTitle ?? r.title);
  } else {
    seenMeta.set(key, r.slug);
  }
}

/* ── Report ─────────────────────────────────────────────────────────────── */
let errors = 0;
let warnings = 0;
for (const f of findings) {
  const icon = f.severity === 'ERROR' ? '✗' : '⚠';
  console.log(`${icon} [${f.severity}] ${f.route} — ${f.field}\n    ${f.problem}\n    → "${f.value}"`);
  if (f.severity === 'ERROR') errors++;
  else warnings++;
}

console.log(`\n=== ${CALCULATOR_ROUTES.length} calculator routes + ${ALL_STATE_KEYS.length} sales-tax pages audited ===`);
console.log(`ERRORS: ${errors}  WARNINGS: ${warnings}`);
process.exit(errors > 0 ? 1 : 0);
