/**
 * Generates public/llms.txt from the site's live data modules so the advertised
 * calculator count and every listed rate always match reality.
 *
 * Run: bun scripts/generate-llms.ts
 * (Re-run whenever calculators are added or state rates change, then commit.)
 */
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  CALCULATOR_ROUTES,
  STANDALONE_CALCULATOR_ROUTES,
  TOTAL_CALCULATOR_COUNT,
  UNLISTED_CALCULATOR_PATHS,
} from '../src/lib/calculator-routes';
import { STATE_SALES_TAX, ALL_STATE_KEYS, stateKeyToSlug } from '../src/lib/state-sales-tax-data';
import { STATE_PROFILES } from '../src/lib/tax-config';
import { SALARY_AMOUNTS } from '../src/lib/salary-calculations';
import { COMPARISON_SLUGS } from '../src/lib/compare-config';
import { getPublishedPostsMeta } from '../src/lib/blog-index';

const SITE = 'https://thetaxcalc.com';
const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'public', 'llms.txt');

const pct = (n: number) => `${parseFloat((n * 100).toFixed(2))}%`;

// ─── General calculators (everything except the 50 state income tax pages) ───
const GENERAL_KEYS = new Set([
  'paycheck-calculator', 'mortgage-calculator', '401k-retirement-calculator',
  'relocation-calculator', 'capital-gains-calculator', 'self-employment-tax-calculator',
  'sales-tax-calculator', 'tax-refund-calculator', 'overtime-tax-calculator',
  'lottery-tax-calculator', 'irs-withholding-calculator', 'property-tax-calculator',
  'bonus-tax-calculator', 'employee-cost-calculator',
  'new-york-city-tax-calculator', 'los-angeles-tax-calculator', 'chicago-tax-calculator',
]);

const general = CALCULATOR_ROUTES.filter((r) => GENERAL_KEYS.has(r.slug));
// Task 48: unlisted tools (robux) are excluded from llms.txt alongside the
// counts — the page is noindexed and unreachable from any public list.
const stateCalcs = CALCULATOR_ROUTES.filter(
  (r) => !GENERAL_KEYS.has(r.slug) && !UNLISTED_CALCULATOR_PATHS.includes(r.canonicalPath)
);

const GENERAL_DESC: Record<string, string> = {
  'paycheck-calculator': 'Take-home pay after federal, FICA, and state taxes. All 50 states, 401(k)/HSA deductions.',
  'sales-tax-calculator': 'Combined state + local sales tax for any US state, with reverse calculator and car sales tax. Includes a dedicated page for each of the 50 states.',
  'lottery-tax-calculator': 'How much tax on lottery winnings? Federal + state, lump sum vs annuity.',
  'self-employment-tax-calculator': '15.3% SE tax on 92.35% of net income, half deduction, quarterly estimates.',
  'property-tax-calculator': 'Compare property taxes across all 50 states by home value.',
  'bonus-tax-calculator': 'How much tax on your bonus? 22% flat rate vs aggregate method.',
  'capital-gains-calculator': 'Short-term and long-term capital gains rates (0%/15%/20% + 3.8% NIIT).',
  '401k-retirement-calculator': 'Projected balance with employer match and compound growth.',
  'irs-withholding-calculator': 'W-4 optimization. Recommended federal withholding per paycheck.',
  'mortgage-calculator': 'Monthly payment, amortization schedule, and extra payment savings.',
  'employee-cost-calculator': 'True cost of hiring — salary + employer FICA, FUTA, SUTA, benefits.',
  'overtime-tax-calculator': 'Savings under the 2025–2028 overtime tax exemption law.',
  'tax-refund-calculator': 'Estimate your federal and state tax refund.',
  'relocation-calculator': 'Compare equivalent salary between states.',
  'new-york-city-tax-calculator': 'NYC resident income tax (3.078%–3.876%) on top of NY state tax.',
  'los-angeles-tax-calculator': 'California take-home pay for LA residents, including SDI.',
  'chicago-tax-calculator': 'Illinois flat tax take-home pay for Chicago residents.',
};

const STANDALONE_DESC: Record<string, string> = {
  '/home-sale-tax-calculator': 'Capital gains on home sales with the $250K/$500K exclusion.',
  '/salary-comparison-calculator': 'Compare after-tax pay by state.',
  '/job-offer-comparison-calculator': 'Compare two or more job offers after taxes.',
  '/paycheck-difference-calculator': 'Compare take-home pay between two states.',
  '/obbba-tax-calculator': 'One Big Beautiful Bill Act 2025: $6,000 senior deduction, new brackets, SALT cap.',
};

// ─── State income tax calculator descriptions from live tax data ─────────────
function toSlug(s: string): string {
  return s.toLowerCase().replace(/\s+/g, '-');
}

function stateIncomeDesc(stateSlug: string): string {
  // stateSlug like 'illinois-tax-calculator' or 'north-carolina-tax-calculator'
  const base = stateSlug.replace(/-tax-calculator$/, '');
  const key = Object.keys(STATE_PROFILES).find((k) => k.replace(/[^a-z]/g, '') === base.replace(/[^a-z]/g, ''));
  if (!key) return '';
  const p = STATE_PROFILES[key];
  if (!p.hasIncomeTax) return `${pct(0)} state income tax`;
  if (p.incomeTaxType === 'flat') return `${pct(p.incomeTaxRate)} flat income tax`;
  if (p.brackets && p.brackets.length > 0) {
    const lo = Math.min(...p.brackets.map((b) => b.rate));
    const hi = Math.max(...p.brackets.map((b) => b.rate));
    return lo === hi ? `${pct(hi)} flat income tax` : `${pct(lo)}–${pct(hi)} progressive income tax`;
  }
  return `${pct(p.incomeTaxRate)} income tax`;
}

// ─── Compose ─────────────────────────────────────────────────────────────────
const lines: string[] = [];
lines.push('# TheTaxCalc');
lines.push('');
lines.push(`> Free 2026 tax calculators for US taxpayers. ${TOTAL_CALCULATOR_COUNT} calculators covering all 50 states. No sign-up required.`);
lines.push('');
lines.push(`TheTaxCalc provides free, accurate tax calculators for federal, state, and local taxes. All calculations are based on 2026 IRS tax brackets and state tax rates. Maintained by the TheTaxCalc Editorial Team — every rate verified against IRS publications and state revenue departments.`);
lines.push('');

const GENERAL_TITLE: Record<string, string> = {
  'paycheck-calculator': 'Paycheck Calculator',
  'sales-tax-calculator': 'Sales Tax Calculator',
  'tax-refund-calculator': 'Tax Refund Calculator',
  'employee-cost-calculator': 'Employee Cost Calculator',
  'relocation-calculator': 'Relocation Calculator',
  'self-employment-tax-calculator': 'Self-Employment Tax Calculator',
  'new-york-city-tax-calculator': 'New York City Tax Calculator',
  'los-angeles-tax-calculator': 'Los Angeles Tax Calculator',
  'chicago-tax-calculator': 'Chicago Tax Calculator',
};

lines.push('## Calculators');
lines.push('');
for (const r of general) {
  const title = GENERAL_TITLE[r.slug] ?? `${r.breadcrumbLabel} Calculator`;
  lines.push(`- [${title}](${SITE}${r.canonicalPath}): ${GENERAL_DESC[r.slug] ?? r.description}`);
}
for (const r of STANDALONE_CALCULATOR_ROUTES) {
  lines.push(`- [${r.label}](${SITE}${r.path}): ${STANDALONE_DESC[r.path] ?? ''}`);
}
lines.push('');

lines.push('## State Income Tax Calculators (50 states)');
lines.push('');
for (const r of stateCalcs) {
  const label = r.breadcrumbLabel;
  const desc = stateIncomeDesc(r.slug) || '2026 state income tax calculator';
  lines.push(`- [${label} Income Tax Calculator](${SITE}${r.canonicalPath}): ${desc}`);
}
lines.push('');

lines.push('## State Sales Tax (50 states)');
lines.push('');
lines.push(`- [Sales Tax Calculator](${SITE}/sales-tax-calculator): All 50 states with combined state + local rates.`);
const notable = ['california', 'texas', 'newyork', 'florida', 'illinois', 'washington', 'tennessee', 'louisiana'];
for (const k of notable) {
  const s = STATE_SALES_TAX[k];
  lines.push(`- [${s.name} Sales Tax](${SITE}/sales-tax-calculator/${stateKeyToSlug(k)}): ${s.noStateTax ? 'No state sales tax' : `${pct(s.stateRate)} state + ${pct(Math.max(0, s.avgLocalRate))} avg local = ${pct(s.combinedRate)} combined`}`);
}
lines.push(`- Every state has a dedicated page: ${SITE}/sales-tax-calculator/<state>`);
lines.push('');

lines.push('## State Comparisons');
lines.push('');
for (const slug of COMPARISON_SLUGS.slice(0, 8)) {
  const [a, b] = slug.split('-vs-').map((s) => s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()));
  lines.push(`- [${a} vs ${b}](${SITE}/compare/${slug}): Side-by-side tax comparison`);
}
lines.push('');

lines.push('## Salary After Taxes');
lines.push('');
for (const amount of SALARY_AMOUNTS.filter((a) => [50000, 75000, 100000, 150000, 200000].includes(a))) {
  lines.push(`- [$${amount.toLocaleString('en-US')} After Taxes](${SITE}/salary/${amount}-after-taxes): Take-home pay by state`);
}
lines.push('');

lines.push('## Resources');
lines.push('');
lines.push(`- [Federal Tax Brackets 2026](${SITE}/federal-tax-brackets): Complete 2026 bracket tables`);
lines.push(`- [Tax Blog](${SITE}/blog): Expert tax guides and tips`);
lines.push(`- [Research](${SITE}/research): Original tax data studies`);
lines.push(`- [About](${SITE}/about): Author credentials and data sources`);
lines.push(`- [Methodology](${SITE}/methodology): How calculations work`);
lines.push(`- [Tax Glossary](${SITE}/glossary): Tax term definitions`);
lines.push(`- [Tax Data](${SITE}/tax-data): 2026 tax rates and brackets`);
lines.push(`- [Free Widgets](${SITE}/widgets): Embed tax calculators on your site`);
lines.push('');

lines.push('## Blog Posts');
lines.push('');
for (const post of getPublishedPostsMeta().slice(0, 5)) {
  lines.push(`- [${post.title}](${SITE}/blog/${post.slug}): ${post.excerpt?.slice(0, 100) ?? ''}`);
}
lines.push('');

lines.push('## Optional');
lines.push('');
lines.push('- Author: TheTaxCalc Editorial Team');
lines.push('- Data sources: IRS Rev. Proc. 2025-32, IRS publications, state revenue departments, Tax Foundation');
lines.push(`- Last updated: ${new Date().toISOString().slice(0, 10)}`);
lines.push(`- Contact: ${SITE}/contact`);
lines.push('');

writeFileSync(OUT, lines.join('\n'), 'utf-8');
console.log(`Wrote ${OUT}: ${TOTAL_CALCULATOR_COUNT} calculators (${general.length} general + ${stateCalcs.length} state income + ${STANDALONE_CALCULATOR_ROUTES.length} standalone), ${ALL_STATE_KEYS.length} sales-tax states.`);
