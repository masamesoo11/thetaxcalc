/**
 * Shared State Sales Tax Data for all 50 US states.
 * Used by both Server and Client components.
 * NO 'use client' — this module is universal.
 *
 * ─── Anti-doorway content strategy ──────────────────────────────────────────
 * The 50 state pages must read as different articles that happen to share a
 * data source. Generated prose varies along five dimensions:
 *   1. Region     — 4 narrative frames (Northeast / Midwest / South / West)
 *   2. Tier       — combined-rate tier: high (top 10) / mid / low (bottom 13)
 *   3. Local tax  — bucket: zero / low / moderate / high average local layer
 *   4. Exemptions — each grocery/Rx/clothing combination gets distinct prose
 *   5. Variant    — deterministic per-state index rotates phrasings & order
 * Ranks, national averages, nearest-neighbor comparisons and superlatives are
 * computed at module load from STATE_SALES_TAX itself — no hand-typed numbers.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export interface StateSalesTax {
  name: string;
  abbreviation: string;
  stateRate: number;       // State base rate as decimal
  avgLocalRate: number;    // Average local/city rate as decimal
  combinedRate: number;    // Average combined state + local rate as decimal
  noStateTax: boolean;
  groceryExempt: boolean;
  prescriptionDrugExempt: boolean;
  clothingExempt: boolean;
}

export interface StateSEOMeta {
  metaTitle: string;
  metaDesc: string;
  h1: string;
  ogTitle: string;
  ogDescription: string;
  keywords: string[];
  canonicalPath: string;
  breadcrumbLabel: string;
}

export interface StateContent {
  howItWorks: string[];
  keyRates: { label: string; value: string }[];
  faqs: { question: string; answer: string }[];
  relatedStates: { slug: string; label: string }[];
  /** Optional per-state section headings (page.tsx falls back to defaults). */
  howHeading?: string;
  ratesHeading?: string;
  faqHeading?: string;
}

// ─── US State Sales Tax Data (2026) ──────────────────────────────────────────

export const STATE_SALES_TAX: Record<string, StateSalesTax> = {
  alabama:      { name: 'Alabama',      abbreviation: 'AL', stateRate: 0.04,   avgLocalRate: 0.0524, combinedRate: 0.0924, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  alaska:       { name: 'Alaska',       abbreviation: 'AK', stateRate: 0,      avgLocalRate: 0.0182, combinedRate: 0.0182, noStateTax: true,  groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: true },
  arizona:      { name: 'Arizona',      abbreviation: 'AZ', stateRate: 0.056,  avgLocalRate: 0.028,  combinedRate: 0.0840, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  arkansas:     { name: 'Arkansas',     abbreviation: 'AR', stateRate: 0.065,  avgLocalRate: 0.0297, combinedRate: 0.0947, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  california:   { name: 'California',   abbreviation: 'CA', stateRate: 0.0725, avgLocalRate: 0.0157, combinedRate: 0.0882, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  colorado:     { name: 'Colorado',     abbreviation: 'CO', stateRate: 0.029,  avgLocalRate: 0.0488, combinedRate: 0.0778, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  connecticut:  { name: 'Connecticut',  abbreviation: 'CT', stateRate: 0.0635, avgLocalRate: 0,      combinedRate: 0.0635, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: true },
  delaware:     { name: 'Delaware',     abbreviation: 'DE', stateRate: 0,      avgLocalRate: 0,      combinedRate: 0,      noStateTax: true,  groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: true },
  florida:      { name: 'Florida',      abbreviation: 'FL', stateRate: 0.06,   avgLocalRate: 0.0102, combinedRate: 0.0702, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  georgia:      { name: 'Georgia',      abbreviation: 'GA', stateRate: 0.04,   avgLocalRate: 0.034,  combinedRate: 0.0740, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  hawaii:       { name: 'Hawaii',       abbreviation: 'HI', stateRate: 0.04,   avgLocalRate: 0.0044, combinedRate: 0.0444, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  idaho:        { name: 'Idaho',        abbreviation: 'ID', stateRate: 0.06,   avgLocalRate: 0.0003, combinedRate: 0.0603, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  illinois:     { name: 'Illinois',     abbreviation: 'IL', stateRate: 0.0625, avgLocalRate: 0.0261, combinedRate: 0.0886, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  indiana:      { name: 'Indiana',      abbreviation: 'IN', stateRate: 0.07,   avgLocalRate: 0,      combinedRate: 0.0700, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  iowa:         { name: 'Iowa',         abbreviation: 'IA', stateRate: 0.06,   avgLocalRate: 0.0094, combinedRate: 0.0694, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  kansas:       { name: 'Kansas',       abbreviation: 'KS', stateRate: 0.065,  avgLocalRate: 0.022,  combinedRate: 0.0870, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  kentucky:     { name: 'Kentucky',     abbreviation: 'KY', stateRate: 0.06,   avgLocalRate: 0,      combinedRate: 0.0600, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  louisiana:    { name: 'Louisiana',    abbreviation: 'LA', stateRate: 0.05,   avgLocalRate: 0.0456, combinedRate: 0.0956, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  maine:        { name: 'Maine',        abbreviation: 'ME', stateRate: 0.055,  avgLocalRate: 0,      combinedRate: 0.0550, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  maryland:     { name: 'Maryland',     abbreviation: 'MD', stateRate: 0.06,   avgLocalRate: 0,      combinedRate: 0.0600, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  massachusetts:{ name: 'Massachusetts',abbreviation: 'MA', stateRate: 0.0625, avgLocalRate: 0,      combinedRate: 0.0625, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: true },
  michigan:     { name: 'Michigan',     abbreviation: 'MI', stateRate: 0.06,   avgLocalRate: 0,      combinedRate: 0.0600, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  minnesota:    { name: 'Minnesota',    abbreviation: 'MN', stateRate: 0.06875,avgLocalRate: 0.00615,combinedRate: 0.0749, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: true },
  mississippi:  { name: 'Mississippi',  abbreviation: 'MS', stateRate: 0.07,   avgLocalRate: 0.0007, combinedRate: 0.0707, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  missouri:     { name: 'Missouri',     abbreviation: 'MO', stateRate: 0.04225,avgLocalRate: 0.04065,combinedRate: 0.0829, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  montana:      { name: 'Montana',      abbreviation: 'MT', stateRate: 0,      avgLocalRate: 0,      combinedRate: 0,      noStateTax: true,  groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: true },
  nebraska:     { name: 'Nebraska',     abbreviation: 'NE', stateRate: 0.055,  avgLocalRate: 0.0145, combinedRate: 0.0695, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  nevada:       { name: 'Nevada',       abbreviation: 'NV', stateRate: 0.0685, avgLocalRate: 0.0138, combinedRate: 0.0823, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  newhampshire: { name: 'New Hampshire',abbreviation: 'NH', stateRate: 0,      avgLocalRate: 0,      combinedRate: 0,      noStateTax: true,  groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: true },
  newjersey:    { name: 'New Jersey',   abbreviation: 'NJ', stateRate: 0.06625,avgLocalRate: -0.00025,combinedRate: 0.066, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: true },
  newmexico:    { name: 'New Mexico',   abbreviation: 'NM', stateRate: 0.05125,avgLocalRate: 0.02715,combinedRate: 0.0784, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  newyork:      { name: 'New York',     abbreviation: 'NY', stateRate: 0.04,   avgLocalRate: 0.0452, combinedRate: 0.0852, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: true },
  northcarolina:{ name: 'North Carolina',abbreviation:'NC', stateRate: 0.0475, avgLocalRate: 0.0223, combinedRate: 0.0698, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  northdakota:  { name: 'North Dakota', abbreviation: 'ND', stateRate: 0.05,   avgLocalRate: 0.0185, combinedRate: 0.0685, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  ohio:         { name: 'Ohio',         abbreviation: 'OH', stateRate: 0.0575, avgLocalRate: 0.0148, combinedRate: 0.0723, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  oklahoma:     { name: 'Oklahoma',     abbreviation: 'OK', stateRate: 0.045,  avgLocalRate: 0.0437, combinedRate: 0.0887, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  oregon:       { name: 'Oregon',       abbreviation: 'OR', stateRate: 0,      avgLocalRate: 0,      combinedRate: 0,      noStateTax: true,  groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: true },
  pennsylvania: { name: 'Pennsylvania', abbreviation: 'PA', stateRate: 0.06,   avgLocalRate: 0.0034, combinedRate: 0.0634, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: true },
  rhodeisland:  { name: 'Rhode Island', abbreviation: 'RI', stateRate: 0.07,   avgLocalRate: 0,      combinedRate: 0.0700, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  southcarolina:{ name: 'South Carolina',abbreviation:'SC', stateRate: 0.06,   avgLocalRate: 0.0144, combinedRate: 0.0744, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  southdakota:  { name: 'South Dakota', abbreviation: 'SD', stateRate: 0.045,  avgLocalRate: 0.019,  combinedRate: 0.0640, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  tennessee:    { name: 'Tennessee',    abbreviation: 'TN', stateRate: 0.07,   avgLocalRate: 0.0256, combinedRate: 0.0956, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  texas:        { name: 'Texas',        abbreviation: 'TX', stateRate: 0.0625, avgLocalRate: 0.0195, combinedRate: 0.0820, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  utah:         { name: 'Utah',         abbreviation: 'UT', stateRate: 0.061,  avgLocalRate: 0.0109, combinedRate: 0.0719, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  vermont:      { name: 'Vermont',      abbreviation: 'VT', stateRate: 0.06,   avgLocalRate: 0.0036, combinedRate: 0.0636, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  virginia:     { name: 'Virginia',     abbreviation: 'VA', stateRate: 0.043,  avgLocalRate: 0.0145, combinedRate: 0.0575, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  washington:   { name: 'Washington',   abbreviation: 'WA', stateRate: 0.065,  avgLocalRate: 0.0291, combinedRate: 0.0941, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  westvirginia: { name: 'West Virginia',abbreviation: 'WV', stateRate: 0.06,   avgLocalRate: 0.0055, combinedRate: 0.0655, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  wisconsin:    { name: 'Wisconsin',    abbreviation: 'WI', stateRate: 0.05,   avgLocalRate: 0.0046, combinedRate: 0.0546, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
  wyoming:      { name: 'Wyoming',      abbreviation: 'WY', stateRate: 0.04,   avgLocalRate: 0.0136, combinedRate: 0.0536, noStateTax: false, groceryExempt: true,  prescriptionDrugExempt: true,  clothingExempt: false },
};

export const ALL_STATE_KEYS = Object.keys(STATE_SALES_TAX) as string[];

// ─── Helper ──────────────────────────────────────────────────────────────────

function pct(rate: number): string {
  return (rate * 100).toFixed(2);
}

function formatRate(rate: number): string {
  return (rate * 100).toFixed(rate * 100 % 1 === 0 ? 0 : 2);
}

/** $1,234.56-style money formatting for generated examples. */
function money(amount: number, decimals = 2): string {
  return amount.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

// ─── Neighboring States Map ──────────────────────────────────────────────────

const NEIGHBOR_MAP: Record<string, string[]> = {
  alabama: ['mississippi', 'tennessee', 'georgia', 'florida'],
  alaska: ['washington', 'hawaii', 'oregon', 'montana'],
  arizona: ['california', 'nevada', 'utah', 'newmexico'],
  arkansas: ['missouri', 'tennessee', 'mississippi', 'louisiana', 'texas', 'oklahoma'],
  california: ['oregon', 'nevada', 'arizona'],
  colorado: ['wyoming', 'nebraska', 'kansas', 'oklahoma', 'newmexico', 'arizona', 'utah'],
  connecticut: ['newyork', 'massachusetts', 'rhodeisland'],
  delaware: ['maryland', 'pennsylvania', 'newjersey'],
  florida: ['georgia', 'alabama'],
  georgia: ['florida', 'alabama', 'tennessee', 'northcarolina', 'southcarolina'],
  hawaii: ['california', 'alaska', 'washington'],
  idaho: ['montana', 'wyoming', 'utah', 'nevada', 'oregon', 'washington'],
  illinois: ['wisconsin', 'indiana', 'kentucky', 'missouri', 'iowa'],
  indiana: ['michigan', 'ohio', 'kentucky', 'illinois'],
  iowa: ['minnesota', 'wisconsin', 'illinois', 'missouri', 'nebraska', 'southdakota'],
  kansas: ['nebraska', 'missouri', 'oklahoma', 'colorado'],
  kentucky: ['illinois', 'indiana', 'ohio', 'westvirginia', 'virginia', 'tennessee', 'missouri'],
  louisiana: ['texas', 'arkansas', 'mississippi'],
  maine: ['newhampshire', 'massachusetts'],
  maryland: ['pennsylvania', 'delaware', 'virginia', 'westvirginia'],
  massachusetts: ['rhodeisland', 'connecticut', 'newyork', 'newhampshire', 'vermont'],
  michigan: ['wisconsin', 'indiana', 'ohio'],
  minnesota: ['northdakota', 'southdakota', 'iowa', 'wisconsin'],
  mississippi: ['tennessee', 'alabama', 'louisiana', 'arkansas'],
  missouri: ['iowa', 'illinois', 'kentucky', 'tennessee', 'arkansas', 'oklahoma', 'kansas', 'nebraska'],
  montana: ['northdakota', 'southdakota', 'wyoming', 'idaho'],
  nebraska: ['southdakota', 'iowa', 'missouri', 'kansas', 'colorado', 'wyoming'],
  nevada: ['oregon', 'idaho', 'utah', 'arizona', 'california'],
  newhampshire: ['maine', 'massachusetts', 'vermont'],
  newjersey: ['newyork', 'pennsylvania', 'delaware'],
  newmexico: ['colorado', 'oklahoma', 'texas', 'arizona'],
  newyork: ['pennsylvania', 'newjersey', 'connecticut', 'massachusetts', 'vermont'],
  northcarolina: ['virginia', 'tennessee', 'georgia', 'southcarolina'],
  northdakota: ['minnesota', 'southdakota', 'montana'],
  ohio: ['michigan', 'pennsylvania', 'westvirginia', 'kentucky', 'indiana'],
  oklahoma: ['kansas', 'missouri', 'arkansas', 'texas', 'newmexico', 'colorado'],
  oregon: ['washington', 'idaho', 'nevada', 'california'],
  pennsylvania: ['newyork', 'newjersey', 'delaware', 'maryland', 'westvirginia', 'ohio'],
  rhodeisland: ['connecticut', 'massachusetts'],
  southcarolina: ['northcarolina', 'georgia'],
  southdakota: ['northdakota', 'minnesota', 'iowa', 'nebraska', 'wyoming', 'montana'],
  tennessee: ['kentucky', 'virginia', 'northcarolina', 'georgia', 'alabama', 'mississippi', 'arkansas', 'missouri'],
  texas: ['newmexico', 'oklahoma', 'arkansas', 'louisiana'],
  utah: ['idaho', 'wyoming', 'colorado', 'newmexico', 'arizona', 'nevada'],
  vermont: ['newyork', 'massachusetts', 'newhampshire'],
  virginia: ['maryland', 'westvirginia', 'kentucky', 'tennessee', 'northcarolina'],
  washington: ['idaho', 'oregon'],
  westvirginia: ['pennsylvania', 'ohio', 'kentucky', 'virginia', 'maryland'],
  wisconsin: ['minnesota', 'iowa', 'illinois', 'michigan'],
  wyoming: ['montana', 'southdakota', 'nebraska', 'colorado', 'utah', 'idaho'],
};

function getRelatedStates(stateKey: string): { slug: string; label: string }[] {
  const neighbors = NEIGHBOR_MAP[stateKey] || [];
  const result = neighbors.slice(0, 5).map((key) => {
    const st = STATE_SALES_TAX[key];
    return {
      slug: key,
      label: st ? `${st.name} (${st.noStateTax ? '0%' : pct(st.combinedRate) + '%'})` : key,
    };
  });
  // Always include the main sales tax page
  return result;
}

// ─── Region, Rank & Tier Analytics (all computed from the dataset) ───────────

type Region = 'Northeast' | 'Midwest' | 'South' | 'West';
type Tier = 'high' | 'mid' | 'low';
type LocalBucket = 'zero' | 'low' | 'moderate' | 'high';
type Variant = 0 | 1 | 2;

const REGION_OF: Record<string, Region> = {
  connecticut: 'Northeast', maine: 'Northeast', massachusetts: 'Northeast', newhampshire: 'Northeast',
  newjersey: 'Northeast', newyork: 'Northeast', pennsylvania: 'Northeast', rhodeisland: 'Northeast',
  vermont: 'Northeast',
  illinois: 'Midwest', indiana: 'Midwest', iowa: 'Midwest', kansas: 'Midwest', michigan: 'Midwest',
  minnesota: 'Midwest', missouri: 'Midwest', nebraska: 'Midwest', northdakota: 'Midwest', ohio: 'Midwest',
  southdakota: 'Midwest', wisconsin: 'Midwest',
  alabama: 'South', arkansas: 'South', delaware: 'South', florida: 'South', georgia: 'South',
  kentucky: 'South', louisiana: 'South', maryland: 'South', mississippi: 'South', northcarolina: 'South',
  oklahoma: 'South', southcarolina: 'South', tennessee: 'South', texas: 'South', virginia: 'South',
  westvirginia: 'South',
  alaska: 'West', arizona: 'West', california: 'West', colorado: 'West', hawaii: 'West', idaho: 'West',
  montana: 'West', nevada: 'West', newmexico: 'West', oregon: 'West', utah: 'West', washington: 'West',
  wyoming: 'West',
};

function ordinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

/** Competition ranking (ties share a rank); rank 1 = highest value. */
function rankBy(field: 'combinedRate' | 'avgLocalRate' | 'stateRate'): Record<string, number> {
  const keys = [...ALL_STATE_KEYS].sort((a, b) => STATE_SALES_TAX[b][field] - STATE_SALES_TAX[a][field]);
  const ranks: Record<string, number> = {};
  let lastVal: number | null = null;
  let lastRank = 0;
  keys.forEach((k, i) => {
    const val = STATE_SALES_TAX[k][field];
    const rank = lastVal !== null && val === lastVal ? lastRank : i + 1;
    ranks[k] = rank;
    lastVal = val;
    lastRank = rank;
  });
  return ranks;
}

const COMBINED_RANK = rankBy('combinedRate');
const LOCAL_RANK = rankBy('avgLocalRate');
const STATE_RATE_RANK = rankBy('stateRate');

const TAXING_STATE_KEYS = ALL_STATE_KEYS.filter((k) => !STATE_SALES_TAX[k].noStateTax);
const NATIONAL_AVG_COMBINED = ALL_STATE_KEYS.reduce((sum, k) => sum + STATE_SALES_TAX[k].combinedRate, 0) / ALL_STATE_KEYS.length;
const MAX_COMBINED = Math.max(...ALL_STATE_KEYS.map((k) => STATE_SALES_TAX[k].combinedRate));
const MAX_COMBINED_HOLDERS = ALL_STATE_KEYS.filter((k) => STATE_SALES_TAX[k].combinedRate === MAX_COMBINED);
const MIN_COMBINED_TAXED = Math.min(...TAXING_STATE_KEYS.map((k) => STATE_SALES_TAX[k].combinedRate));
const MIN_COMBINED_TAXED_HOLDERS = TAXING_STATE_KEYS.filter((k) => STATE_SALES_TAX[k].combinedRate === MIN_COMBINED_TAXED);
const MAX_STATE_RATE = Math.max(...ALL_STATE_KEYS.map((k) => STATE_SALES_TAX[k].stateRate));
const MAX_STATE_RATE_HOLDERS = ALL_STATE_KEYS.filter((k) => STATE_SALES_TAX[k].stateRate === MAX_STATE_RATE);
const MIN_STATE_RATE_TAXED = Math.min(...TAXING_STATE_KEYS.map((k) => STATE_SALES_TAX[k].stateRate));
const MIN_STATE_RATE_TAXED_HOLDERS = TAXING_STATE_KEYS.filter((k) => STATE_SALES_TAX[k].stateRate === MIN_STATE_RATE_TAXED);
const MAX_LOCAL = Math.max(...ALL_STATE_KEYS.map((k) => STATE_SALES_TAX[k].avgLocalRate));
const MAX_LOCAL_HOLDERS = ALL_STATE_KEYS.filter((k) => STATE_SALES_TAX[k].avgLocalRate === MAX_LOCAL);
const CLOTHING_EXEMPT_COUNT = ALL_STATE_KEYS.filter((k) => STATE_SALES_TAX[k].clothingExempt).length;

function tierOf(stateKey: string): Tier {
  const rank = COMBINED_RANK[stateKey];
  if (rank <= 10) return 'high';
  if (rank >= 38) return 'low';
  return 'mid';
}

function localBucketOf(state: StateSalesTax): LocalBucket {
  if (state.avgLocalRate <= 0.0005) return 'zero';
  if (state.avgLocalRate <= 0.015) return 'low';
  if (state.avgLocalRate <= 0.03) return 'moderate';
  return 'high';
}

/** Stable string hash used to decorrelate the variant rotation below. */
function hashKey(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h * 33) ^ s.charCodeAt(i)) >>> 0;
  return h;
}

/**
 * Second, independent hash. Two states whose primary hashes share a residue
 * (mod 3 or mod 4) would otherwise land on the same template variant for
 * EVERY salt — mixing this in makes the effective salt state-dependent.
 */
function hashKey2(s: string): number {
  let h = 97;
  for (let i = 0; i < s.length; i++) h = ((h * 31) + s.charCodeAt(i)) >>> 0;
  return h;
}

/**
 * Deterministic per-state rotation index. Different paragraph builders salt
 * the hash differently (combined rank, local rank, state-rate rank…) so two
 * states that share a region frame rarely share the exemption, local-tax or
 * FAQ phrasing as well — same-group pages never collapse into one template.
 */
function idx(stateKey: string, salt: number): Variant {
  return ((hashKey(stateKey) + salt * (1 + (hashKey2(stateKey) % 7))) % 3) as Variant;
}

/** Wider 4-slot rotation for the most-shared templates. */
function idx4(stateKey: string, salt: number): 0 | 1 | 2 | 3 {
  return ((hashKey(stateKey) + salt * (1 + (hashKey2(stateKey) % 7))) % 4) as 0 | 1 | 2 | 3;
}

function variantOf(stateKey: string): Variant {
  return idx(stateKey, COMBINED_RANK[stateKey]);
}

/** The n states whose combined rate is numerically closest to this state's. */
function nearestByRate(stateKey: string, n = 2, taxingOnly = false): string[] {
  const target = STATE_SALES_TAX[stateKey].combinedRate;
  return ALL_STATE_KEYS
    .filter((k) => k !== stateKey && (!taxingOnly || !STATE_SALES_TAX[k].noStateTax))
    .sort((a, b) =>
      Math.abs(STATE_SALES_TAX[a].combinedRate - target) -
      Math.abs(STATE_SALES_TAX[b].combinedRate - target))
    .slice(0, n);
}

function nearestLink(stateKey: string): string {
  return `<a href="/sales-tax-calculator/${stateKey}">${STATE_SALES_TAX[stateKey].name}</a>`;
}

// ─── Curated Structural Quirks (facts, no numbers beyond dataset values) ─────

const STRUCTURAL_QUIRKS: Record<string, string> = {
  colorado:
    'Colorado is a "home rule" sales tax state: many cities set, collect, and audit their own sales tax separately from the state. A receipt inside city limits can carry a different rate — and a different collector — than one from an unincorporated area a mile away.',
  newyork:
    'New York exempts most clothing and footwear purchases under $110 per item — a rare per-item price cap on a clothing exemption. Back-to-school trips to the mall are noticeably cheaper than the sticker math suggests.',
  pennsylvania:
    'Pennsylvania exempts most everyday clothing outright, with no per-item price cap — unlike neighboring New York, which cuts the exemption off above a threshold. Wardrobe basics ring up tax-free on both sides of the state line, big-ticket formalwear only in Pennsylvania.',
  illinois:
    'Illinois is a recent convert to grocery relief: after decades of taxing food at a special reduced rate, the state eliminated its grocery tax entirely. Groceries now ring up exempt, right alongside prescription drugs.',
  missouri:
    'Missouri puts local sales taxes on the ballot. Cities, counties, and special districts generally need voter approval before adding their slice, which is a big reason rates swing so much from town to town within the state.',
  minnesota:
    'Minnesota never taxes everyday clothing — no price cap, no seasonal holidays, just exempt. Combined with untaxed groceries and prescriptions, the sales tax in Minnesota lands almost entirely on non-essential spending.',
  massachusetts:
    'Massachusetts leaves everyday clothing untaxed, which takes some of the sting out of its statewide rate for wardrobe-heavy households. Groceries and prescriptions are exempt too.',
  louisiana:
    'Louisiana calls its counties parishes, and parishes, cities, and special districts all stack their own rates on top of the state base. The local layer does most of the work in the final combined rate.',
  newjersey:
    'New Jersey keeps the register simple: no city or county adds sales tax on top of the state rate, so the percentage on a receipt in Camden is identical to one in Hoboken.',
};

// ─── SEO Metadata Generator ──────────────────────────────────────────────────

export function getStateSEOMeta(stateKey: string): StateSEOMeta {
  const state = STATE_SALES_TAX[stateKey];
  if (!state) {
    return {
      metaTitle: 'State Sales Tax Calculator Not Found',
      metaDesc: 'State sales tax calculator not found.',
      h1: 'State Not Found',
      ogTitle: 'State Not Found',
      ogDescription: 'State not found.',
      keywords: [],
      canonicalPath: '/sales-tax-calculator',
      breadcrumbLabel: 'Not Found',
    };
  }

  const name = state.name;
  const abbr = state.abbreviation;
  // Use abbreviation for metaTitle if full name would exceed 47 chars (47 + " | TheTaxCalc" = 60)
  const titleName = name.length > 14 ? abbr : name;

  if (state.noStateTax) {
    return {
      metaTitle: `Free ${titleName} Sales Tax Calculator 2026 | 0% Rate`,
      metaDesc: `Free ${name} sales tax calculator 2026. 0% state sales tax${state.abbreviation === 'AK' ? ', local avg 1.82%' : ''}. No sign-up.`,
      h1: `${name} Sales Tax Calculator`,
      ogTitle: `${name} Sales Tax 2026 | 0% State`,
      ogDescription: `Free ${name} sales tax calculator. ${name} has no state sales tax. See details and exemptions. No sign-up required.`,
      keywords: [
        `${name} sales tax calculator`, `${name} sales tax rate`, `${abbr} sales tax`,
        `${name} no sales tax`, `${name} 0% sales tax`, `sales tax in ${name}`,
        `${name} tax exempt`, `${name} shopping tax`, `${name} sales tax 2026`,
        `${name.toLowerCase()} sales tax calculator`,
      ],
      canonicalPath: `/sales-tax-calculator/${stateKey}`,
      breadcrumbLabel: `${name} Sales Tax`,
    };
  }

  const statePct = formatRate(state.stateRate);
  const localPct = formatRate(Math.max(0, state.avgLocalRate));
  const combinedPct = pct(state.combinedRate);
  const tier = tierOf(stateKey);
  const noLocal = localBucketOf(state) === 'zero';

  // Tail phrase varies by tier/local profile so even meta descriptions differ.
  let tail: string;
  if (noLocal) {
    tail = `Same rate in every city. No sign-up.`;
  } else if (tier === 'high') {
    tail = `Top-10 rate nationally. No sign-up.`;
  } else if (tier === 'low') {
    tail = `Below the ${pct(NATIONAL_AVG_COMBINED)}% US average. No sign-up.`;
  } else {
    tail = `Reverse calc & exemptions. No sign-up.`;
  }

  const core = noLocal
    ? `Free ${name} sales tax calculator 2026. ${statePct}% statewide rate — ${combinedPct}% is the whole number.`
    : `Free ${name} sales tax calculator 2026. ${statePct}% state + ${localPct}% local = ${combinedPct}% combined.`;

  return {
    metaTitle: `Free ${titleName} Sales Tax Calculator 2026 | ${combinedPct}% Combined`,
    metaDesc: `${core} ${tail}`,
    h1: `${name} Sales Tax Calculator`,
    ogTitle: `${name} Sales Tax 2026 | ${statePct}%${noLocal ? ' Statewide' : ' + Local'}`,
    ogDescription: `Free ${name} sales tax calculator. ${core.replace(`Free ${name} sales tax calculator 2026. `, '')} ${tail}`,
    keywords: [
      `${name} sales tax calculator`, `${name} sales tax rate`, `${abbr} sales tax`,
      `${name} state sales tax`, `${name} local sales tax`, `${name} combined sales tax`,
      `${name} sales tax percentage`, `sales tax in ${name}`, `${name} tax rate 2026`,
      `${name.toLowerCase()} sales tax calculator`,
      `how much is sales tax in ${name}`, `${name} city tax rate`,
    ],
    canonicalPath: `/sales-tax-calculator/${stateKey}`,
    breadcrumbLabel: `${name} Sales Tax`,
  };
}

// ─── Paragraph Builders ──────────────────────────────────────────────────────

function buildOpeningFrame(stateKey: string, state: StateSalesTax): string {
  const name = state.name;
  const region = REGION_OF[stateKey] ?? 'South';
  const tier = tierOf(stateKey);
  const v = variantOf(stateKey);
  const statePct = formatRate(state.stateRate);
  const localPct = formatRate(Math.max(0, state.avgLocalRate));
  const combinedPct = pct(state.combinedRate);
  const rank = COMBINED_RANK[stateKey];
  const taxOn1000 = (1000 * state.combinedRate).toFixed(2);
  const noLocal = localBucketOf(state) === 'zero';

  if (region === 'Northeast') {
    if (v === 0) {
      return `The Northeast squeezes a dozen different sales tax systems into a region you can drive across in a single day, and ${name} sits right in the middle of that patchwork. Its base rate is ${statePct}%${noLocal
        ? ` — and, unlike some of its neighbors, nothing gets layered on top: no county rate, no city rate, no special district. The percentage printed on a ${name} receipt is the same from one end of the state to the other`
        : `, with local taxes averaging another ${localPct}% on top of it`}. All in, shoppers in ${name} pay about ${combinedPct}% — call it $${taxOn1000} in tax on a $1,000 purchase.`;
    }
    if (v === 1) {
      return `State lines matter enormously in the Northeast: cross one and the tax on the very same shopping cart can shift by several percentage points. ${name}'s combined rate lands at ${combinedPct}% — ${noLocal
        ? `a flat ${statePct}% statewide, with no local add-ons at all`
        : `${statePct}% statewide plus an average of ${localPct}% in local taxes`} — which ranks #${rank} of the 50 states. A $1,000 basket of goods picks up about $${taxOn1000} at the register.`;
    }
    return `In the Northeast, rate differences between states dwarf the differences within them, and ${name} keeps its internal picture simple: ${statePct}% statewide${noLocal ? ' and no local add-ons on top' : ` plus ${localPct}% average local tax`}, a combined ${combinedPct}%, #${rank} of 50. The $1,000 math works out to about $${taxOn1000} — and since groceries are exempt, the weekly food run isn't part of it.`;
  }

  if (region === 'Midwest') {
    if (v === 0) {
      return `Midwest sales tax tends to run on rails: a clear statewide rate, predictable county add-ons, few surprises. ${name} fits that mold with a ${statePct}% state rate${noLocal
        ? ` — and, in classic Plains fashion, nothing stacked on top of it. Every register in the state shows the same ${combinedPct}%`
        : ` plus about ${localPct}% in average local taxes, which is how the typical combined rate gets to ${combinedPct}%`}. Either way, $1,000 at the counter means roughly $${taxOn1000} in sales tax.`;
    }
    if (v === 1) {
      return `${name} carries the #${rank}-highest sales tax burden in the country at ${combinedPct}% combined — ${state.combinedRate >= NATIONAL_AVG_COMBINED ? 'above' : 'below'} the 50-state average of ${pct(NATIONAL_AVG_COMBINED)}%. In typical Midwestern fashion, the number is built from transparent parts: a ${statePct}% statewide base${noLocal ? ' and nothing added locally' : ` and about ${localPct}% in local add-ons`}. The $1,000 checkout example works out to $${taxOn1000} in tax.`;
    }
    return `County-level option is the story across much of the Midwest, and ${name} is part of it: the state sets a ${statePct}% base${noLocal
      ? ' and local governments here haven\'t added anything — the base is the whole rate'
      : `, and counties and cities layer an average of ${localPct}% on top, arriving at the usual ${combinedPct}% combined figure`}. Ranked against all 50 states, ${name} sits at #${rank}. A $1,000 purchase at that rate carries $${taxOn1000} in tax.`;
  }

  if (region === 'South') {
    if (v === 0) {
      return `Southern states lean on the sales tax harder than most, and ${name} is part of that pattern: its combined rate averages ${combinedPct}% (${noLocal ? `${statePct}% state rate, nothing added locally` : `${statePct}% state + ${localPct}% local`}), good for #${rank} nationally. The regional silver lining is relief on essentials — groceries are exempt in ${name}, so the ${combinedPct}% applies to what you buy, not what you eat. On a $1,000 purchase, expect about $${taxOn1000} in tax.`;
    }
    if (v === 1) {
      return `Ring up $1,000 of goods in ${name} and the register adds roughly $${taxOn1000} — a ${combinedPct}% combined rate that puts ${name} at #${rank} among the 50 states. The building blocks are a ${statePct}% statewide rate${noLocal ? ' with no local layer at all' : ` plus an average of ${localPct}% in county and city taxes`}. Grocery budgets catch a break, though: like the rest of the South's big grocery-relief states, ${name} doesn't tax food.`;
    }
    return `Ranked #${rank} of 50 states, ${name}'s ${combinedPct}% combined rate sits ${state.combinedRate >= NATIONAL_AVG_COMBINED ? 'on the heavy end, even for the South' : 'comparatively gentle for the South'} — the national average is ${pct(NATIONAL_AVG_COMBINED)}%. The number breaks down as ${statePct}% state${noLocal ? ' with nothing added locally' : ` plus ${localPct}% average local tax`}. Groceries stay exempt, as across the South's grocery-relief states, so the rate hits the retail cart, not the kitchen.`;
  }

  // West
  if (v === 0) {
    return `Sales tax in the West runs the full spectrum — neighboring states range from zero-tax to top-ten-heavy — and ${name} lands at ${combinedPct}% combined, #${rank} nationally. That figure stacks a ${statePct}% state rate${noLocal ? ' with no local layer on top' : ` on top of an average ${localPct}% layer of county and city taxes`}. At that rate, a $1,000 purchase picks up about $${taxOn1000} in tax.`;
  }
  if (v === 1) {
    return `${name} runs a ${statePct}% statewide sales tax; with local taxes averaging ${localPct}%, what shoppers actually pay works out to about ${combinedPct}% — the #${rank} combined rate in the country. West of the Rockies that number reads ${tier === 'high' ? 'among the heaviest' : 'on the moderate-to-light end of the spectrum'}, and the essentials stay protected either way: groceries and prescriptions are exempt no matter where in ${name} you shop.`;
  }
  return `The West holds both the lightest and heaviest sales tax states in the country, and ${name} lands in between at ${combinedPct}% combined — #${rank} of 50. The state base is ${statePct}%${noLocal ? ' with no local layer' : `; local jurisdictions add an average of ${localPct}% on top`}. Either way, the $1,000 example lands at about $${taxOn1000}, and exempt groceries keep the weekly food run out of the math.`;
}

function buildRankParagraph(stateKey: string, state: StateSalesTax): string {
  const name = state.name;
  const v = idx(stateKey, STATE_RATE_RANK[stateKey] + LOCAL_RANK[stateKey]);
  const rank = COMBINED_RANK[stateKey];
  const ord = ordinal(rank);
  const combinedPct = pct(state.combinedRate);
  const avgPct = pct(NATIONAL_AVG_COMBINED);
  const above = state.combinedRate >= NATIONAL_AVG_COMBINED;
  const diffPct = pct(Math.abs(state.combinedRate - NATIONAL_AVG_COMBINED));
  const nearest = nearestByRate(stateKey, 2);
  const n1 = nearest[0];
  const n2 = nearest[1];
  const link1 = nearestLink(n1);
  const link2 = n2 ? nearestLink(n2) : '';

  let core: string;
  if (v === 0) {
    core = `Where does that put ${name} nationally? Its ${combinedPct}% average combined rate ranks ${ord} of the 50 states — ${above ? 'above' : 'below'} the 50-state average of ${avgPct}% by ${diffPct} points. For context, the two states whose combined rates sit closest to ${name}'s are ${link1} (${pct(STATE_SALES_TAX[n1].combinedRate)}%)${n2 ? ` and ${link2} (${pct(STATE_SALES_TAX[n2].combinedRate)}%)` : ''}.`;
  } else if (v === 1) {
    core = `Nationally, ${name}'s ${combinedPct}% combined rate checks in at ${ord} place. That's ${above ? `${diffPct} points above` : `${diffPct} points below`} the 50-state average of ${avgPct}%. If you're comparing relocation or shopping options, ${link1} (${pct(STATE_SALES_TAX[n1].combinedRate)}%)${n2 ? ` and ${link2} (${pct(STATE_SALES_TAX[n2].combinedRate)}%)` : ''} are the closest states by combined rate.`;
  } else {
    core = `Among all 50 states, ${name} ranks ${ord} by average combined rate at ${combinedPct}%. The national average is ${avgPct}%, which leaves ${name} ${above ? `${diffPct} points on the expensive side` : `${diffPct} points on the cheap side`} of the midpoint. Shoppers benchmarking nearby states will find ${link1} (${pct(STATE_SALES_TAX[n1].combinedRate)}%)${n2 ? ` and ${link2} (${pct(STATE_SALES_TAX[n2].combinedRate)}%)` : ''} within a hair of the same number.`;
  }

  // Computed superlatives (all derived from the dataset, ties handled).
  const extras: string[] = [];
  if (state.combinedRate === MAX_COMBINED && MAX_COMBINED_HOLDERS.length > 1) {
    const others = MAX_COMBINED_HOLDERS.filter((k) => k !== stateKey);
    extras.push(`No state averages more — ${name} shares the top combined rate with ${others.map((k) => STATE_SALES_TAX[k].name).join(' and ')}.`);
  } else if (state.combinedRate === MAX_COMBINED) {
    extras.push(`That's the single highest average combined rate in the country.`);
  }
  if (state.combinedRate === MIN_COMBINED_TAXED) {
    if (MIN_COMBINED_TAXED_HOLDERS.length === 1) {
      extras.push(`Among states that still levy a sales tax, ${name}'s ${combinedPct}% is the lightest combined rate there is.`);
    }
  }
  if (state.stateRate === MAX_STATE_RATE && MAX_STATE_RATE_HOLDERS.length === 1) {
    extras.push(`No state charges a higher base rate than ${name}'s ${formatRate(state.stateRate)}%.`);
  }
  if (state.stateRate === MIN_STATE_RATE_TAXED && MIN_STATE_RATE_TAXED_HOLDERS.length === 1) {
    extras.push(`The ${formatRate(state.stateRate)}% statewide base is the smallest of any state that taxes sales at all.`);
  }
  if (state.avgLocalRate === MAX_LOCAL && MAX_LOCAL_HOLDERS.length === 1) {
    extras.push(`And at ${pct(state.avgLocalRate)}%, the average local add-on is the largest in the nation.`);
  }

  return extras.length > 0 ? `${core} ${extras.join(' ')}` : core;
}

function buildExemptionParagraph(stateKey: string, state: StateSalesTax): string {
  const name = state.name;
  const v = idx4(stateKey, LOCAL_RANK[stateKey]);
  const combinedPct = pct(state.combinedRate);
  const g = state.groceryExempt;
  const rx = state.prescriptionDrugExempt;
  const c = state.clothingExempt;
  const combo = `${g ? '1' : '0'}${rx ? '1' : '0'}${c ? '1' : '0'}`;
  const yearlyGroceryTax = (52 * 150 * state.combinedRate).toFixed(0);

  // All 8 exemption combinations get their own prose; the two that occur in
  // the 2026 dataset (111 and 110) carry four rotating phrasings each.
  switch (combo) {
    case '111':
      if (v === 0) {
        return `${name} is in the minority on clothing: groceries, prescription drugs, and everyday apparel are all exempt from sales tax. Only ${CLOTHING_EXEMPT_COUNT} states skip the tax on clothing, and ${name} is one of them — a wardrobe-heavy household here pays noticeably less at the register than the same household one state over.`;
      }
      if (v === 1) {
        return `Three big categories go untaxed in ${name}: groceries, prescription drugs, and clothing. That's a broader package than most states offer — the grocery and prescription exemptions are common nationwide, but adding clothing to the list puts ${name} among just ${CLOTHING_EXEMPT_COUNT} states.`;
      }
      if (v === 2) {
        return `The exemption list runs long in ${name}: food, medicine, and clothes all skip sales tax. Pair that with a ${combinedPct}% combined rate and the burden lands almost entirely on non-essential spending — the receipts that feel it are electronics, furniture, and dining out, not the weekly essentials.`;
      }
      return `Food, medicine, and clothing all skip sales tax in ${name} — one of the broadest everyday-exemption packages in the country. Only ${CLOTHING_EXEMPT_COUNT} states extend the exemption to clothing, so ${name}'s ${combinedPct}% combined rate applies mainly to discretionary purchases.`;

    case '110':
      if (v === 0) {
        return `${name} keeps the taxman away from two household staples: groceries and prescription drugs ring up exempt everywhere in the state. Clothing gets no such break — a $200 jacket picks up the full ${combinedPct}% like any other good. The grocery exemption matters more than it sounds: a family spending $150 a week on food avoids roughly $${yearlyGroceryTax} a year in tax it would otherwise pay at that combined rate.`;
      }
      if (v === 1) {
        return `What you wear gets taxed in ${name}; what you eat doesn't. Groceries and prescription drugs are exempt, but clothing sells at the full ${combinedPct}% combined rate — worth remembering during back-to-school season, when the cart of binders and jeans is taxed while the cart of lunch groceries isn't.`;
      }
      if (v === 2) {
        return `Two recurring budget lines never carry sales tax in ${name}: groceries and prescription drugs. Clothing does — every shirt and shoe purchase rings up at the full ${combinedPct}% — but between exempt food and exempt medicine, a big share of a typical household's annual spending never touches the ${combinedPct}% rate at all.`;
      }
      return `${name}'s exemption list covers the fridge and the pharmacy: groceries and prescription drugs both ring up tax-free. The closet doesn't get the same deal — apparel sells at the full ${combinedPct}% — so the recurring essentials stay exempt while the occasional wardrobe refresh pays full freight.`;

    case '100':
      return `${name} exempts groceries but not prescription drugs: food skips sales tax, while medicine and clothing both sell at the full ${combinedPct}% combined rate.`;
    case '101':
      return `${name} exempts groceries and clothing, but prescription drugs are still taxed at the combined rate of ${combinedPct}% — an unusual setup, since most states protect medicine first.`;
    case '010':
      return `${name} exempts prescription drugs but taxes groceries and clothing. Medicine skips the ${combinedPct}% rate; food and apparel don't.`;
    case '011':
      return `${name} exempts prescription drugs and clothing, while groceries are still taxed. Two of three everyday categories skip the ${combinedPct}% rate, but the weekly food bill doesn't.`;
    case '000':
      return `${name} applies its full ${combinedPct}% combined rate to groceries, prescription drugs, and clothing alike — no carve-outs on the essentials. Every state line around ${name} is worth comparing before a big purchase.`;
    default:
      return `${name} taxes most retail goods at a ${combinedPct}% combined rate; check the state revenue department for the current exemption list.`;
  }
}

function buildLocalParagraph(stateKey: string, state: StateSalesTax): string {
  const name = state.name;
  const v = idx4(stateKey, STATE_RATE_RANK[stateKey]);
  const statePct = formatRate(state.stateRate);
  const localPct = formatRate(Math.max(0, state.avgLocalRate));
  const combinedPct = pct(state.combinedRate);
  const bucket = localBucketOf(state);
  const localRank = LOCAL_RANK[stateKey];

  if (bucket === 'zero') {
    if (v === 0) {
      return `One thing you never have to think about in ${name}: rate shopping between towns. There are no county or city sales taxes anywhere in the state, so the ${statePct}% state rate is the whole number — identical whether you check out in the biggest city or a village general store.`;
    }
    if (v === 1) {
      return `Local governments in ${name} don't levy their own sales taxes. Whatever the ${statePct}% state base adds up to is the entire charge — no county surcharges, no special-district add-ons, no need to check the address before estimating a purchase.`;
    }
    if (v === 2) {
      return `Plenty of states publish long tables of county and municipal rates; ${name} doesn't need one. With no local sales taxes on the books, the ${statePct}% state rate is the combined rate — the same figure at every register, in every jurisdiction, every day of the year.`;
    }
    return `Rate-checking by ZIP code is a habit ${name} shoppers can skip. No city, county, or district adds a sales tax of its own, so the ${statePct}% state rate is the combined rate everywhere — same number at every register in the state.`;
  }

  if (bucket === 'low') {
    if (v === 0) {
      return `Local add-ons exist in ${name}, but they're modest: the average county and city layer adds ${localPct}% on top of the ${statePct}% state rate. Shop a few towns over and the total rate might move by a fraction of a point — rarely enough to change where you buy.`;
    }
    if (v === 1) {
      return `The ${statePct}% state rate does most of the work in ${name}. Local jurisdictions add an average of just ${localPct}%, so the combined rate you actually pay — about ${combinedPct}% — stays inside a narrow band wherever you shop in the state.`;
    }
    if (v === 2) {
      return `${name} lets counties and cities add their own layer, but the average add-on is only ${localPct}%. That keeps the combined rate near ${combinedPct}% statewide, with minor variation from one jurisdiction to the next rather than the wild swings seen in high-local states.`;
    }
    return `Local taxes in ${name} average ${localPct}% — real, but small relative to the ${statePct}% state base. The combined rate hovers near ${combinedPct}% from town to town, so shopping across jurisdiction lines rarely changes the price by much.`;
  }

  if (bucket === 'moderate') {
    if (v === 0) {
      return `Where in ${name} you shop changes the math. Counties and cities layer an average of ${localPct}% onto the ${statePct}% state base, and individual jurisdictions run above or below that average. The ${combinedPct}% figure is the statewide mean — your actual register rate depends on the address.`;
    }
    if (v === 1) {
      return `Local jurisdictions carry real weight in ${name}, adding ${localPct}% on average to the state's ${statePct}% base. That produces a combined rate around ${combinedPct}%, with visible differences between jurisdictions — worth checking if a large purchase sits near a city or county line.`;
    }
    if (v === 2) {
      return `The gap between the ${statePct}% state rate and the ${combinedPct}% you actually pay? That's ${localPct}% of local taxes, on average, spread across county and municipal rates that differ town by town. In ${name}, the exact jurisdiction on a big-ticket receipt can move the total by real money.`;
    }
    return `Where you shop inside ${name} matters. The average local layer is ${localPct}% on top of a ${statePct}% state rate, and the combined figure of ${combinedPct}% is just the statewide mean — actual registers run above or below it depending on the county and city.`;
  }

  // high
  if (v === 0) {
    return `Budget extra for the local layer in ${name}: county and city taxes average ${localPct}% on top of the ${statePct}% state rate — #${localRank} of 50 states by average local add-on. Many jurisdictions sit above that average, so a combined rate north of ${combinedPct}% is common at city registers.`;
  }
  if (v === 1) {
    return `The state rate is only part of the story in ${name}. Local governments add an average of ${localPct}% — one of the heavier local layers in the country (#${localRank} nationally) — which pushes the typical combined rate up to ${combinedPct}%. Location matters here more than almost anywhere else: the same purchase can ring up differently across a single city limit.`;
  }
  if (v === 2) {
    return `${name}'s combined rate leans unusually hard on local taxes. The state base is ${statePct}%, but cities and counties stack an average of ${localPct}% on top — the #${localRank}-highest local average in the US — landing the typical shopper at ${combinedPct}% all-in. On a major purchase, crossing a jurisdiction line can genuinely change the price.`;
  }
  return `In ${name}, the local layer is the story. County and city taxes average ${localPct}% above the ${statePct}% state base (#${localRank} nationally), which is how the combined rate gets to ${combinedPct}%. Individual jurisdictions vary widely around that average — big purchases deserve a rate check by address.`;
}

function buildMechanicsParagraph(stateKey: string, state: StateSalesTax): string {
  const name = state.name;
  const abbr = state.abbreviation;
  const v = idx(stateKey, LOCAL_RANK[stateKey] + COMBINED_RANK[stateKey]);
  const combinedPct = pct(state.combinedRate);
  const rate = state.combinedRate;

  if (v === 0) {
    // Worked example with a tier-appropriate amount.
    const amount = tierOf(stateKey) === 'high' ? 2500 : tierOf(stateKey) === 'low' ? 100 : 500;
    const tax = (amount * rate).toFixed(2);
    const total = (amount * (1 + rate)).toFixed(2);
    const what = amount >= 2500 ? 'furniture set' : amount >= 500 ? 'laptop' : 'pair of headphones';
    return `Running the numbers is plain multiplication: price × ${rate.toFixed(4)} = tax. Take a $${amount} ${what} in ${name} — $${amount} × ${rate.toFixed(4)} comes to $${tax} in sales tax, bringing the register total to $${total}. The calculator above does this for any amount and any rate override in one step.`;
  }

  if (v === 1) {
    // Reverse calculation.
    const base = 1000;
    const total = (base * (1 + rate)).toFixed(2);
    const divisor = (1 + rate).toFixed(4);
    return `Working backwards from a tax-inclusive total is its own trick, and bookkeepers use it constantly. Divide the receipt total by ${divisor} to recover the pre-tax price: a $${money(base * (1 + rate))} bill under ${name}'s ${combinedPct}% average rate divides by ${divisor} back to $${money(base)} even. That's the reverse mode built into the calculator above — useful for expense reports and receipts that only show the grand total.`;
  }

  // Online / Wayfair.
  return `Online orders follow the same rules. Since the Supreme Court's 2018 <a href="https://www.oyez.org/cases/2017/17-494" target="_blank" rel="noopener noreferrer">South Dakota v. Wayfair</a> decision, retailers with significant sales into ${name} must collect ${name} sales tax on shipments to ${abbr} residents — including the local portion where one applies. If the estimated tax at online checkout seemed to appear out of nowhere a few years back, that ruling is why.`;
}

// ─── Key Rates Builder ───────────────────────────────────────────────────────

function buildKeyRates(stateKey: string, state: StateSalesTax, tier: Tier): { label: string; value: string }[] {
  const name = state.name;
  const abbr = state.abbreviation;
  const v = idx(stateKey, 5);
  const statePct = formatRate(state.stateRate);
  const localPct = formatRate(Math.max(0, state.avgLocalRate));
  const combinedPct = pct(state.combinedRate);
  const taxOn1000 = (1000 * state.combinedRate).toFixed(2);
  const totalOn1000 = (1000 * (1 + state.combinedRate)).toFixed(2);
  const rank = COMBINED_RANK[stateKey];
  const noLocal = localBucketOf(state) === 'zero';

  const stateCard = {
    label: v === 0 ? `${name} State Rate` : v === 1 ? `Statewide Base Rate` : `${abbr} Base Rate`,
    value: `${statePct}%`,
  };
  const localCard = noLocal
    ? { label: 'Local Add-Ons', value: 'None — same statewide' }
    : { label: v === 0 ? `${name} Avg Local Rate` : 'Avg County + City Rate', value: `${localPct}%` };
  const combinedCard = {
    label: v === 2 ? 'What You Typically Pay' : `${name} Combined Rate`,
    value: `${combinedPct}%`,
  };
  const rankCard = { label: 'US Rank (Combined)', value: `#${rank} of 50` };
  const taxCard = { label: 'Tax on $1,000', value: `$${taxOn1000}` };
  const totalCard = { label: 'Total on $1,000', value: `$${totalOn1000}` };
  const clothingCard = {
    label: `${abbr} Clothing`,
    value: state.clothingExempt ? 'Exempt' : 'Taxed',
  };

  // Order and card selection rotate by tier so the stat grid isn't a fixed template.
  if (tier === 'high') {
    return [combinedCard, stateCard, localCard, taxCard, rankCard, clothingCard];
  }
  if (tier === 'low') {
    return [combinedCard, rankCard, stateCard, localCard, taxCard, clothingCard];
  }
  return [stateCard, localCard, combinedCard, taxCard, v === 1 ? totalCard : rankCard, clothingCard];
}

// ─── FAQ Builder ─────────────────────────────────────────────────────────────

function buildFaqs(stateKey: string, state: StateSalesTax, tier: Tier): { question: string; answer: string }[] {
  const name = state.name;
  const abbr = state.abbreviation;

  const wildcardV = idx(stateKey, 13);
  const statePct = formatRate(state.stateRate);
  const localPct = formatRate(Math.max(0, state.avgLocalRate));
  const combinedPct = pct(state.combinedRate);
  const rank = COMBINED_RANK[stateKey];
  const ord = ordinal(rank);
  const avgPct = pct(NATIONAL_AVG_COMBINED);
  const noLocal = localBucketOf(state) === 'zero';
  const belowCount = ALL_STATE_KEYS.filter((k) => STATE_SALES_TAX[k].combinedRate < state.combinedRate).length;
  const aboveCount = ALL_STATE_KEYS.filter((k) => STATE_SALES_TAX[k].combinedRate > state.combinedRate).length;
  const rateFaqV = idx4(stateKey, 23);
  const tierFaqV = idx4(stateKey, 29);
  const faqs: { question: string; answer: string }[] = [];

  // 1) Rate question — phrased by tier, four phrasings per tier.
  if (tier === 'high') {
    const rateHigh = [
      {
        question: `What is the total sales tax rate in ${name}?`,
        answer: `${name}'s average combined sales tax rate is ${combinedPct}% — ${statePct}% state plus ${localPct}% average local tax. That's the #${rank}-highest combined rate of the 50 states, ${pct(state.combinedRate - NATIONAL_AVG_COMBINED)} points above the national average of ${avgPct}%.`,
      },
      {
        question: `How high is sales tax in ${name}?`,
        answer: `${name} combines a ${statePct}% state rate with ${localPct}% average local tax for an all-in rate of ${combinedPct}% — #${rank} of 50 states, ${pct(state.combinedRate - NATIONAL_AVG_COMBINED)} points above the ${avgPct}% national average.`,
      },
      {
        question: `What's ${name}'s combined sales tax rate?`,
        answer: `${combinedPct}% on average — ${statePct}% from the state and ${localPct}% from local jurisdictions. ${aboveCount === 0 ? 'No state averages more.' : `Only ${aboveCount} states run higher.`}`,
      },
      {
        question: `How much is sales tax in ${name} in total?`,
        answer: `Expect about ${combinedPct}% at the register in ${name}: a ${statePct}% state rate plus ${localPct}% in average local taxes. That's #${rank} of 50 — ${pct(state.combinedRate - NATIONAL_AVG_COMBINED)} points over the ${avgPct}% national average.`,
      },
    ];
    faqs.push(rateHigh[rateFaqV]);
  } else if (tier === 'low') {
    const rateLow = [
      {
        question: `What is the sales tax rate in ${name}?`,
        answer: `${name} has a ${statePct}% state rate${noLocal ? ' with no local add-ons' : ` plus about ${localPct}% average local tax`}, for a combined rate of ${combinedPct}%. That's ${ord} of 50 states — on the light end nationally, ${pct(NATIONAL_AVG_COMBINED - state.combinedRate)} points below the ${avgPct}% average.`,
      },
      {
        question: `What's the sales tax rate in ${name}?`,
        answer: `Statewide, ${name} charges ${statePct}%${noLocal ? ' with no local add-ons' : `; locals average another ${localPct}%, so the combined rate works out to about ${combinedPct}%`}. Only ${belowCount} states rank lower, and ${name} sits ${pct(NATIONAL_AVG_COMBINED - state.combinedRate)} points under the national average of ${avgPct}%.`,
      },
      {
        question: `How much is sales tax in ${name}?`,
        answer: `${combinedPct}% combined on average — the ${statePct}% state rate${noLocal ? '' : ` plus ${localPct}% typical local tax`}. ${name} ranks ${ord} of 50 states, ${pct(NATIONAL_AVG_COMBINED - state.combinedRate)} points under the national average of ${avgPct}%.`,
      },
      {
        question: `What's ${name}'s combined sales tax rate?`,
        answer: `About ${combinedPct}% — ${statePct}% statewide${noLocal ? '' : ` and an average ${localPct}% local layer`}. Only ${belowCount} states average a lower combined rate than ${name}.`,
      },
    ];
    faqs.push(rateLow[rateFaqV]);
  } else {
    const rateMid = [
      {
        question: `What is the sales tax rate in ${name}?`,
        answer: `The state rate in ${name} is ${statePct}%${noLocal ? ', and there are no local add-ons — that figure is the whole rate' : `; average local taxes add ${localPct}%, bringing the combined rate to about ${combinedPct}%`}. ${name} ranks ${ord} of the 50 states by combined rate.`,
      },
      {
        question: `What sales tax will I pay in ${name}?`,
        answer: `Most purchases in ${name} carry ${combinedPct}% on average — a ${statePct}% state rate${noLocal ? ' and no local layer on top' : ` plus about ${localPct}% in local taxes`}. That places ${name} ${ord} of 50 states, ${state.combinedRate >= NATIONAL_AVG_COMBINED ? 'above' : 'below'} the ${avgPct}% national average.`,
      },
      {
        question: `How much is sales tax in ${name}?`,
        answer: `${name} charges ${statePct}% at the state level${noLocal ? ', and no local taxes exist on top' : ` and about ${localPct}% more on average locally`}, so most shoppers pay around ${combinedPct}%. Ranked ${ord} of 50 states, that's ${state.combinedRate >= NATIONAL_AVG_COMBINED ? 'above' : 'below'} the ${avgPct}% US average.`,
      },
      {
        question: `What's the combined sales tax rate in ${name}?`,
        answer: `${combinedPct}% is the average all-in figure — ${statePct}% state${noLocal ? ' with no local add-ons' : ` plus ${localPct}% average local tax`}. ${name} lands ${ord} among the 50 states by combined rate.`,
      },
    ];
    faqs.push(rateMid[rateFaqV]);
  }

  // 2) Calculation mechanics — example amount and phrasing rotate independently.
  const amounts = [100, 250, 500];
  const amt = amounts[idx(stateKey, 19)];
  const taxAmt = (amt * state.combinedRate).toFixed(2);
  const totalAmt = (amt * (1 + state.combinedRate)).toFixed(2);
  const calcAnswers = [
    `Multiply the price by the combined rate. On a $${amt} purchase at ${name}'s ${combinedPct}% average combined rate: $${amt} × ${state.combinedRate.toFixed(4)} = $${taxAmt} in tax, for a $${totalAmt} total. The calculator above handles any amount plus reverse (tax-inclusive) math.`,
    `Take the price and multiply by the rate as a decimal. With ${name}'s average combined rate at ${combinedPct}%, a $${amt} purchase carries $${taxAmt} of tax — $${totalAmt} at the register. For tax-inclusive totals, switch the calculator above into reverse mode.`,
    `Price times rate, that's the whole formula. At ${name}'s ${combinedPct}% average combined rate, a $${amt} purchase adds $${taxAmt} in tax and $${totalAmt} at checkout. The calculator above runs the math forward and backward for any amount.`,
    `The math is one multiplication: price × ${state.combinedRate.toFixed(4)} in ${name}. A $${amt} purchase means $${taxAmt} of tax and a $${totalAmt} total — run any amount through the calculator above, forward or reverse.`,
  ];
  faqs.push({
    question: `How do I calculate sales tax in ${name}?`,
    answer: calcAnswers[idx4(stateKey, 37)],
  });

  // 3) Exemption question — phrasing varies by profile and rotation index.
  if (state.clothingExempt) {
    const clothingAnswers = [
      `Yes. ${name} is one of only ${CLOTHING_EXEMPT_COUNT} states that exempts clothing, and it exempts groceries and prescription drugs as well. The ${combinedPct}% combined rate applies to other retail goods, but the everyday essentials skip it.`,
      `Groceries, prescription drugs, and clothing — all three are exempt in ${name}. Only ${CLOTHING_EXEMPT_COUNT} states put clothing on the exemption list, so the ${combinedPct}% combined rate mostly lands on non-essential purchases.`,
      `No — everyday clothing is exempt in ${name}, alongside groceries and prescriptions. That puts ${name} among just ${CLOTHING_EXEMPT_COUNT} clothing-exempt states nationwide, leaving the ${combinedPct}% rate to apply mainly to everything else.`,
      `Clothing, groceries, and prescriptions all ring up tax-free in ${name} — a trio only ${CLOTHING_EXEMPT_COUNT} states offer. The ${combinedPct}% combined rate applies to the rest of the store.`,
    ];
    faqs.push({
      question: idx4(stateKey, 41) === 1 ? `What does ${name} exempt from sales tax?` : `Is clothing tax-free in ${name}?`,
      answer: clothingAnswers[idx4(stateKey, 41)],
    });
  } else {
    const groceryAnswers = [
      `No — groceries and prescription drugs are exempt from sales tax in ${name}. Clothing doesn't get the same treatment and sells at the full ${combinedPct}% combined rate. Exemption rules can vary slightly at the local level, so check the revenue department for edge cases.`,
      `Food and medicine, no. Groceries and prescription drugs are exempt statewide in ${name}, while clothing and most other retail goods sell at the full ${combinedPct}% combined rate. Local jurisdictions occasionally add their own twists to exemption rules.`,
      `${name} does not tax groceries or prescription drugs. Clothing is the everyday category that doesn't escape — it rings up at the full ${combinedPct}% combined rate, along with everything else that isn't food or medicine.`,
      `Two exemptions anchor ${name}'s sales tax: food and prescription medicine. Everything else — clothing included — sells at the full ${combinedPct}% combined rate. It's a carve-out aimed squarely at recurring household essentials.`,
    ];
    faqs.push({
      question: idx4(stateKey, 41) === 1 ? `What's tax-free in ${name}?` : `Are groceries taxed in ${name}?`,
      answer: groceryAnswers[idx4(stateKey, 41)],
    });
  }

  // 4) Tier-specific question (four phrasings per tier).
  if (tier === 'high') {
    const driver = state.avgLocalRate > 0.03
      ? `The driver is the local layer: county and city taxes average ${localPct}% on top of the ${statePct}% state base — the #${LOCAL_RANK[stateKey]}-largest local average in the country.`
      : `The state's own base rate of ${statePct}% does most of the work; local taxes add another ${localPct}% on average.`;
    const tierHigh = [
      {
        question: `Why is sales tax so high in ${name}?`,
        answer: `${name} ranks #${rank} of 50 states at ${combinedPct}% combined, ${pct(state.combinedRate - NATIONAL_AVG_COMBINED)} points above the ${avgPct}% national average. ${driver} Sales-tax-heavy states often keep other taxes lower, so the total burden picture depends on income and property tax too.`,
      },
      {
        question: `What makes ${name}'s combined rate so heavy?`,
        answer: `${name} sits #${rank} of 50 states at ${combinedPct}% combined — ${pct(state.combinedRate - NATIONAL_AVG_COMBINED)} points above the ${avgPct}% national average. ${driver} For contrast, the lightest taxing states in the country collect as little as ${pct(MIN_COMBINED_TAXED)}% combined.`,
      },
      {
        question: `Is ${name} one of the highest sales tax states?`,
        answer: `Yes — #${rank} of 50 at ${combinedPct}% combined. ${driver} The national average is ${avgPct}%, so ${name} runs ${pct(state.combinedRate - NATIONAL_AVG_COMBINED)} points hot.`,
      },
      {
        question: `Where does ${name}'s sales tax rank nationally?`,
        answer: `#${rank} of 50 states, at ${combinedPct}% combined. ${driver} ${aboveCount === 0 ? 'No state averages more.' : `Only ${aboveCount} states average more.`}`,
      },
    ];
    faqs.push(tierHigh[tierFaqV]);
  } else if (tier === 'low') {
    const tierLow = [
      {
        question: `Is ${name} a low-sales-tax state?`,
        answer: `Yes. At ${combinedPct}% combined, ${name} ranks ${ord} of 50 — only ${belowCount} state${belowCount === 1 ? '' : 's'} average${belowCount === 1 ? 's' : ''} a lower rate. For scale, the 50-state average is ${avgPct}%, and the highest combined rates in the country run above ${pct(MAX_COMBINED)}%.`,
      },
      {
        question: `Is ${name} cheaper than most states for sales tax?`,
        answer: `Yes — ${combinedPct}% combined ranks ${ord} of 50, and only ${belowCount} states average less. The typical state charges ${avgPct}%, so ${name} comes in ${pct(NATIONAL_AVG_COMBINED - state.combinedRate)} points lighter. Only the no-tax states and a couple of near-misses do better.`,
      },
      {
        question: `Where does ${name} rank on sales tax?`,
        answer: `${ord} of 50 — comfortably in the bottom third. ${name}'s ${combinedPct}% combined rate is ${pct(NATIONAL_AVG_COMBINED - state.combinedRate)} points below the ${avgPct}% national average, with only ${belowCount} states lighter.`,
      },
      {
        question: `Does ${name} have one of the lower sales tax rates?`,
        answer: `It does. At ${combinedPct}% combined (${statePct}% state${noLocal ? '' : ` + ${localPct}% local`}), ${name} ranks ${ord} nationally — ${pct(NATIONAL_AVG_COMBINED - state.combinedRate)} points lighter than the average state's ${avgPct}%.`,
      },
    ];
    faqs.push(tierLow[tierFaqV]);
  } else {
    const nearest = nearestByRate(stateKey, 1)[0];
    const nearestName = STATE_SALES_TAX[nearest].name;
    const nearestPct = pct(STATE_SALES_TAX[nearest].combinedRate);
    const tierMid = [
      {
        question: `How does ${name} compare to other states' sales tax?`,
        answer: `${name}'s ${combinedPct}% combined rate ranks ${ord} of the 50 states, ${state.combinedRate >= NATIONAL_AVG_COMBINED ? 'above' : 'below'} the ${avgPct}% national average by ${pct(Math.abs(state.combinedRate - NATIONAL_AVG_COMBINED))} points. The closest state by combined rate is ${nearestName} at ${nearestPct}%.`,
      },
      {
        question: `Is ${name} above or below average on sales tax?`,
        answer: `${state.combinedRate >= NATIONAL_AVG_COMBINED ? 'Above' : 'Below'}. ${name}'s ${combinedPct}% combined rate ranks ${ord} of 50 states against the ${avgPct}% national average — a gap of ${pct(Math.abs(state.combinedRate - NATIONAL_AVG_COMBINED))} points. ${nearestName} (${nearestPct}%) is the closest state by combined rate.`,
      },
      {
        question: `Is ${name}'s sales tax higher or lower than average?`,
        answer: `${state.combinedRate >= NATIONAL_AVG_COMBINED ? 'Higher' : 'Lower'} — ${combinedPct}% combined versus the ${avgPct}% national average, a ${pct(Math.abs(state.combinedRate - NATIONAL_AVG_COMBINED))}-point gap. ${name} ranks ${ord} of 50 states.`,
      },
      {
        question: `What rank is ${name} in sales tax?`,
        answer: `${ord} of 50 states by combined rate, at ${combinedPct}%. The 50-state average sits at ${avgPct}%, and the closest comparable state is ${nearestName} at ${nearestPct}%.`,
      },
    ];
    faqs.push(tierMid[tierFaqV]);
  }

  // 5) Local-bucket-specific question (four phrasings per bucket).
  const bucket = localBucketOf(state);
  const localFaqV = idx4(stateKey, 43);
  const localRank = LOCAL_RANK[stateKey];
  if (bucket === 'zero') {
    const zeroFaqs = [
      {
        question: `Is the sales tax rate the same everywhere in ${name}?`,
        answer: `Yes. ${name} has no county, city, or special-district sales taxes — the ${statePct}% state rate is identical in every jurisdiction. You never need to look up a local rate when estimating a purchase anywhere in ${name}.`,
      },
      {
        question: `Do I need to know the city rate in ${name}?`,
        answer: `No. ${name} has no local sales taxes — the ${statePct}% state rate applies in every city and county, so one number covers the entire state. Estimates here need no address lookup.`,
      },
      {
        question: `Why is the rate identical everywhere in ${name}?`,
        answer: `Because local sales taxes don't exist in ${name}. The state's ${statePct}% rate is the only sales tax on the books, so every city and county charges exactly the same.`,
      },
      {
        question: `Do rates change between cities in ${name}?`,
        answer: `Never. With no county or municipal sales taxes, the ${statePct}% state rate follows you everywhere in ${name} — the same percentage in every checkout line.`,
      },
    ];
    faqs.push(zeroFaqs[localFaqV]);
  } else if (bucket === 'high') {
    const highFaqs = [
      {
        question: `Which parts of ${name} have the highest sales tax?`,
        answer: `Local layers drive the differences. On average, ${name} jurisdictions add ${localPct}% to the ${statePct}% state rate (the #${localRank}-largest local average in the US), but individual cities and counties run above or below that mean. For an exact figure on a large purchase, look up the rate for the specific address — the calculator above accepts a custom rate override.`,
      },
      {
        question: `How different are city rates in ${name}?`,
        answer: `Dramatically different in places. The average local add-on is ${localPct}% — #${localRank} of 50 states — and individual jurisdictions run above and below that mean. On large purchases, look up the specific address rate before you buy.`,
      },
      {
        question: `Where are the highest rates in ${name}?`,
        answer: `In the jurisdictions that stack the biggest local layers. The statewide average local add-on is ${localPct}% (the #${localRank}-largest in the US), and some cities and counties go beyond it — check the specific address before a major purchase.`,
      },
      {
        question: `Can the sales tax rate change within a few blocks in ${name}?`,
        answer: `Yes. City and county layers in ${name} average ${localPct}% on top of the ${statePct}% state rate, and jurisdiction boundaries don't follow neat lines — crossing one can move the combined rate off the ${combinedPct}% average.`,
      },
    ];
    faqs.push(highFaqs[localFaqV]);
  } else {
    const varying = bucket === 'moderate';
    const someFaqs = varying
      ? [
          {
            question: `Do city and county rates differ within ${name}?`,
            answer: `They do. Local jurisdictions in ${name} add an average of ${localPct}% on top of the ${statePct}% state rate, and individual cities and counties sit above or below that average. The ${combinedPct}% figure is the statewide mean, so your actual register rate depends on where you shop.`,
          },
          {
            question: `How much do local taxes add in ${name}?`,
            answer: `An average of ${localPct}% on top of the ${statePct}% state rate, though it varies by jurisdiction. The ${combinedPct}% combined figure is the statewide mean — your exact register rate depends on the town you're shopping in.`,
          },
          {
            question: `Do I need my exact city's rate in ${name}?`,
            answer: `For precision, yes. Local taxes average ${localPct}% over the ${statePct}% state base, but jurisdictions sit on both sides of that mean — the calculator above lets you override the rate with your exact local figure.`,
          },
          {
            question: `How much can the rate change between towns in ${name}?`,
            answer: `By a noticeable margin. The ${localPct}% average local layer varies by jurisdiction on top of the ${statePct}% state rate, which is why the statewide mean of ${combinedPct}% isn't always the number on your receipt.`,
          },
        ]
      : [
          {
            question: `Do city and county rates differ within ${name}?`,
            answer: `They do, but modestly. Local jurisdictions in ${name} add an average of ${localPct}% on top of the ${statePct}% state rate, and the spread between jurisdictions is small — most of the state clusters near the ${combinedPct}% combined figure.`,
          },
          {
            question: `How much do local taxes add in ${name}?`,
            answer: `An average of ${localPct}% on top of the ${statePct}% state rate. The ${combinedPct}% combined figure is the statewide mean — most registers land close to it.`,
          },
          {
            question: `How much do local rates vary in ${name}?`,
            answer: `Within a narrow band. The average local layer is ${localPct}% over the ${statePct}% state rate, and most jurisdictions cluster near that figure, so the combined rate rarely strays far from ${combinedPct}%.`,
          },
          {
            question: `Are small-town rates different in ${name}?`,
            answer: `Slightly. Local add-ons average just ${localPct}% statewide, and jurisdictions move up or down from there in small increments — the combined rate stays in the neighborhood of ${combinedPct}% wherever you shop.`,
          },
        ];
    faqs.push(someFaqs[localFaqV]);
  }

  // 6) Wildcard question — rotates by tier + hash so same-tier pages diverge.
  if (tier === 'high') {
    if (wildcardV === 0) {
      const diff1000 = (1000 * (state.combinedRate - NATIONAL_AVG_COMBINED)).toFixed(2);
      faqs.push({
        question: `How much extra does ${name}'s rate cost versus an average state?`,
        answer: `On a $1,000 purchase, ${name}'s ${combinedPct}% combined rate adds $${(1000 * state.combinedRate).toFixed(2)} in tax, versus $${(1000 * NATIONAL_AVG_COMBINED).toFixed(2)} at the ${avgPct}% national average — a difference of $${diff1000}. Scale that across a year of spending and the gap becomes real money.`,
      });
    } else if (wildcardV === 2) {
      faqs.push({
        question: `What's the sales tax on a large purchase in ${name}?`,
        answer: `At ${combinedPct}%, a $5,000 purchase carries $${(5000 * state.combinedRate).toFixed(2)} in sales tax in ${name} — $${(5000 * (1 + state.combinedRate)).toFixed(2)} all-in. The calculator above prices any amount instantly.`,
      });
    } else {
      const neighbors = NEIGHBOR_MAP[stateKey] || [];
      const cheapest = neighbors
        .map((k) => STATE_SALES_TAX[k])
        .filter((s) => s)
        .sort((a, b) => a.combinedRate - b.combinedRate)[0];
      if (cheapest) {
        const savings = (1000 * (state.combinedRate - cheapest.combinedRate)).toFixed(2);
        faqs.push({
          question: `Is it worth shopping across the ${name} border?`,
          answer: `On big-ticket items, possibly. Among ${name}'s neighbors, ${cheapest.name} has the lightest combined rate at ${pct(cheapest.combinedRate)}% versus ${name}'s ${combinedPct}% — a gap of $${savings} per $1,000 spent. Remember that your home state may require use tax on out-of-state purchases, which can claw back the savings.`,
        });
      } else {
        faqs.push({
          question: `Does ${name} charge sales tax on online purchases?`,
          answer: `Yes. After the 2018 South Dakota v. Wayfair Supreme Court ruling, online retailers must collect ${name} sales tax on purchases shipped to ${abbr} residents, based on the buyer's location.`,
        });
      }
    }
  } else if (tier === 'low') {
    if (wildcardV === 0) {
      const below = ALL_STATE_KEYS.filter((k) => STATE_SALES_TAX[k].combinedRate < state.combinedRate);
      const belowNames = below.map((k) => `${STATE_SALES_TAX[k].name} (${STATE_SALES_TAX[k].noStateTax ? '0%' : pct(STATE_SALES_TAX[k].combinedRate) + '%'})`);
      faqs.push({
        question: `Which states have a lower sales tax than ${name}?`,
        answer: below.length > 0
          ? `Only ${below.length}: ${belowNames.join(', ')}. Every other state averages a higher combined rate than ${name}'s ${combinedPct}%.`
          : `None — ${name} has the lowest combined rate of any state that collects sales tax.`,
      });
    } else if (wildcardV === 2) {
      const nbRates = (NEIGHBOR_MAP[stateKey] || []).map((k) => STATE_SALES_TAX[k]?.combinedRate).filter((r): r is number => r !== undefined);
      const nbMin = nbRates.length ? Math.min(...nbRates) : state.combinedRate;
      const nbMax = nbRates.length ? Math.max(...nbRates) : state.combinedRate;
      const position = state.combinedRate < nbMin ? 'below them all' : state.combinedRate > nbMax ? 'above them all' : 'inside that range';
      faqs.push({
        question: `Is ${name}'s rate lower than its neighbors'?`,
        answer: nbRates.length
          ? `Neighbor rates around ${name} span ${pct(nbMin)}% to ${pct(nbMax)}% combined, so ${name}'s ${combinedPct}% sits ${position}. Cross-border shopping can pay off — or not — depending on which direction the border is.`
          : `${name}'s ${combinedPct}% combined rate ranks ${ord} of 50 states.`,
      });
    } else {
      faqs.push({
        question: `How much would I save in ${name} versus a high-tax state?`,
        answer: `The spread between ${name}'s ${combinedPct}% and the highest combined rates in the country (${pct(MAX_COMBINED)}%) is ${pct(MAX_COMBINED - state.combinedRate)} points — about $${(1000 * (MAX_COMBINED - state.combinedRate)).toFixed(0)} per $1,000 spent. Against the ${avgPct}% national average, ${name} saves roughly $${(1000 * (NATIONAL_AVG_COMBINED - state.combinedRate)).toFixed(2)} per $1,000.`,
      });
    }
  } else {
    // Avoid a reverse-calc FAQ when the reverse-calc paragraph already ran
    // in the body (same page shouldn't explain the same trick twice).
    const mechV = idx(stateKey, LOCAL_RANK[stateKey] + COMBINED_RANK[stateKey]);
    const wild = wildcardV === 1 && mechV === 1 ? 2 : wildcardV;
    if (wild === 0) {
      faqs.push({
        question: `Does ${name} charge sales tax on online purchases?`,
        answer: `Yes. Following the 2018 South Dakota v. Wayfair Supreme Court ruling, online retailers must collect ${name} sales tax on purchases shipped to ${name} residents. The rate is based on the buyer's location within ${name}, including any applicable local portion.`,
      });
    } else if (wild === 1) {
      faqs.push({
        question: `How do I back sales tax out of a total price in ${name}?`,
        answer: `Divide the tax-inclusive total by (1 + rate). Using ${name}'s ${combinedPct}% average combined rate: a $${(1000 * (1 + state.combinedRate)).toFixed(2)} total ÷ ${(1 + state.combinedRate).toFixed(4)} = $1,000.00 pre-tax. The calculator above has a reverse mode that does this automatically.`,
      });
    } else {
      const nearest = nearestByRate(stateKey, 2);
      faqs.push({
        question: `Which states have sales tax rates closest to ${name}'s?`,
        answer: `${STATE_SALES_TAX[nearest[0]].name} (${pct(STATE_SALES_TAX[nearest[0]].combinedRate)}%)${nearest[1] ? ` and ${STATE_SALES_TAX[nearest[1]].name} (${pct(STATE_SALES_TAX[nearest[1]].combinedRate)}%)` : ''} sit nearest to ${name}'s ${combinedPct}% combined rate. Cross-border shoppers will barely notice a difference at the register in those states.`,
      });
    }
  }

  // FAQ order rotates by state so the question sequence isn't a fixed template.
  const orderV = idx(stateKey, 31);
  if (orderV === 1) {
    [faqs[0], faqs[1]] = [faqs[1], faqs[0]];
    [faqs[2], faqs[4]] = [faqs[4], faqs[2]];
  } else if (orderV === 2) {
    [faqs[1], faqs[2]] = [faqs[2], faqs[1]];
    [faqs[3], faqs[4]] = [faqs[4], faqs[3]];
  }

  return faqs;
}

// ─── Section Headings ────────────────────────────────────────────────────────

function buildHeadings(name: string, stateKey: string, tier: Tier): { howHeading: string; ratesHeading: string; faqHeading: string } {
  const region = REGION_OF[stateKey] ?? 'South';
  const rot = (idx(stateKey, 17) + region.length + tier.length) % 3;
  const howOptions = [
    `How ${name} Sales Tax Works`,
    `${name} Sales Tax, Explained`,
    `How Sales Tax Works in ${name}`,
  ];
  const ratesOptions = [
    `${name} Sales Tax Key Rates (2026)`,
    `${name} Sales Tax by the Numbers`,
    `Key Numbers: ${name} Sales Tax (2026)`,
  ];
  const faqOptions = [
    `${name} Sales Tax FAQ`,
    `${name} Sales Tax: Questions & Answers`,
    `Common Questions About Sales Tax in ${name}`,
  ];
  return {
    howHeading: howOptions[rot],
    ratesHeading: ratesOptions[rot],
    faqHeading: faqOptions[rot],
  };
}

// ─── State Content Generator ─────────────────────────────────────────────────

export function getStateContent(stateKey: string): StateContent {
  const state = STATE_SALES_TAX[stateKey];
  if (!state) {
    return { howItWorks: [], keyRates: [], faqs: [], relatedStates: [] };
  }

  const relatedStates = getRelatedStates(stateKey);

  if (state.noStateTax) {
    return getNoTaxStateContent(stateKey, state, relatedStates);
  }

  const tier = tierOf(stateKey);
  const v = idx(stateKey, 11);

  const frame = buildOpeningFrame(stateKey, state);
  const rankPara = buildRankParagraph(stateKey, state);
  const exemptionPara = buildExemptionParagraph(stateKey, state);
  const localPara = buildLocalParagraph(stateKey, state);
  const mechanicsPara = buildMechanicsParagraph(stateKey, state);
  const quirk = STRUCTURAL_QUIRKS[stateKey];

  // Paragraph ORDER varies by tier and variant — different article shapes.
  let paragraphs: string[];
  if (tier === 'high') {
    paragraphs = v === 1
      ? [frame, localPara, rankPara, exemptionPara, mechanicsPara]
      : [frame, rankPara, localPara, exemptionPara, mechanicsPara];
  } else if (tier === 'mid') {
    paragraphs = v === 2
      ? [frame, mechanicsPara, rankPara, exemptionPara, localPara]
      : v === 1
        ? [frame, exemptionPara, mechanicsPara, localPara, rankPara]
        : [frame, exemptionPara, rankPara, localPara, mechanicsPara];
  } else {
    paragraphs = v === 0
      ? [frame, localPara, rankPara, exemptionPara, mechanicsPara]
      : v === 1
        ? [frame, rankPara, localPara, mechanicsPara, exemptionPara]
        : [frame, exemptionPara, localPara, rankPara, mechanicsPara];
  }

  if (quirk) {
    // Curated structural facts sit right after the opening frame.
    paragraphs.splice(1, 0, quirk);
  }

  const keyRates = buildKeyRates(stateKey, state, tier);
  const faqs = buildFaqs(stateKey, state, tier);
  const headings = buildHeadings(state.name, stateKey, tier);

  return {
    howItWorks: paragraphs,
    keyRates,
    faqs,
    relatedStates,
    ...headings,
  };
}

// ─── No-Tax State Content ────────────────────────────────────────────────────

function getNoTaxStateContent(stateKey: string, state: StateSalesTax, relatedStates: { slug: string; label: string }[]): StateContent {
  const name = state.name;
  const abbr = state.abbreviation;
  const rank = COMBINED_RANK[stateKey];
  const avgPct = pct(NATIONAL_AVG_COMBINED);
  const savingsVsAvg = (1000 * (NATIONAL_AVG_COMBINED - state.combinedRate)).toFixed(2);

  const noTaxDetails: Record<string, { reason: string; reasonShort: string; alternatives: string }> = {
    delaware: {
      reason: 'Delaware has never had a sales tax. The state relies on its franchise tax on corporations (thanks to being the incorporation capital of the US) and its gross receipts tax on businesses instead.',
      reasonShort: 'Delaware has never had a sales tax — it funds government through its franchise tax on corporations (it\'s the incorporation capital of the US) and a gross receipts tax on businesses.',
      alternatives: 'Delaware charges a gross receipts tax on businesses (0.0945% to 1.9913%) which is technically paid by the seller, though some costs may be passed to consumers through higher prices.',
    },
    montana: {
      reason: 'Montana has no state sales tax and no local sales taxes. The state relies on income tax and property tax to fund government services. Montana voters have rejected sales tax proposals multiple times.',
      reasonShort: 'Montana relies on income tax and property tax instead, and voters have rejected sales tax proposals multiple times — there\'s no state sales tax and no local sales taxes.',
      alternatives: 'Montana charges a state income tax (1% to 5.9%) and property taxes. Some tourist-heavy areas near national parks have considered resort taxes, but statewide sales tax remains at 0%.',
    },
    newhampshire: {
      reason: 'New Hampshire has no state sales tax and no local sales tax. The state prides itself on this and funds government through property taxes, business taxes, and meals/rooms taxes instead.',
      reasonShort: 'New Hampshire funds government through property taxes, business taxes, and meals/rooms taxes instead — "Live Free or Die" applies to the cash register too.',
      alternatives: 'While there\'s no general sales tax, New Hampshire does charge a 9% tax on restaurant meals, 9% on hotel rooms, and 9% on motor vehicle rentals. These are targeted taxes, not a general sales tax.',
    },
    oregon: {
      reason: 'Oregon has no state sales tax. The state relies on its progressive income tax (4.75% to 9.9%) and property taxes. Oregon voters have rejected sales tax proposals multiple times — most recently in the 1990s.',
      reasonShort: 'Oregon leans on one of the higher income taxes in the country (up to 9.9%) and property taxes instead, and voters have rejected sales tax proposals multiple times.',
      alternatives: 'Oregon has one of the highest state income tax rates in the country (up to 9.9%), plus property taxes. Some cities charge a small local tax on prepared food and beverages, but there is no general sales tax.',
    },
    alaska: {
      reason: 'Alaska has no state sales tax. Instead, the state relies heavily on oil revenue and the Alaska Permanent Fund to fund government services. In fact, Alaska pays residents a dividend each year from the Permanent Fund.',
      reasonShort: 'Alaska funds government largely through oil revenue and the Alaska Permanent Fund — which pays residents a dividend each year — rather than a sales tax.',
      alternatives: 'While there\'s no state sales tax, many Alaska municipalities do charge local sales taxes. The average local rate is about 1.82%, and some cities charge up to 7.5%. These local taxes fund city and borough services.',
    },
  };

  const details = noTaxDetails[stateKey] || {
    reason: `${name} has no state sales tax.`,
    reasonShort: `${name} funds government through other tax mechanisms.`,
    alternatives: `${name} funds government through other tax mechanisms.`,
  };

  const isAlaska = stateKey === 'alaska';
  const v = variantOf(stateKey);
  const otherZeroTaxStates = ALL_STATE_KEYS
    .filter((k) => k !== stateKey && STATE_SALES_TAX[k].noStateTax && STATE_SALES_TAX[k].combinedRate === 0)
    .map((k) => STATE_SALES_TAX[k].name);

  // Opening paragraph — varies by state variant.
  const openers = [
    `${name} has <strong>0% state sales tax</strong>. ${details.reason} This means when you buy most goods and services in ${name}, no sales tax is added to the purchase price. A $100 item costs $100 — not $107 or $108 like in most other states.`,
    `${name} is one of the handful of states with <strong>no state sales tax — 0%</strong>. ${details.reason} The shelf price in ${name} is the register price: a $100 item rings up at exactly $100.`,
    `There is no state sales tax in ${name} — <strong>0%</strong>, full stop. ${details.reason} For shoppers, that means the number on the price tag is the number on the receipt.`,
  ];

  // Rank & scale paragraph (all computed).
  const rankParagraph = isAlaska
    ? `Alaska's 1.82% average — entirely local tax — still ranks #${rank} of 50 states, above only the four states that collect nothing at all. Against the ${avgPct}% 50-state average, shopping in Alaska saves about $${savingsVsAvg} per $1,000 spent.`
    : `${name} shares the bottom of the national rankings with ${otherZeroTaxStates.slice(0, 3).join(', ')}, and Alaska's 1.82% local-only average: nothing collects on retail purchases in ${name}, so it ranks #${rank} of 50 by combined rate. The gap matters — versus the ${avgPct}% average state, each $1,000 of shopping in ${name} keeps $${savingsVsAvg} in your pocket.`;

  const localParagraph = isAlaska
    ? `Even though Alaska has no state sales tax, many local municipalities add their own. The average local sales tax across Alaska is about 1.82%. Some cities like Juneau charge up to 5%, while others like Anchorage charge 0%. This calculator can handle the local rate — just enter your city's rate if you know it.`
    : `${details.alternatives}`;

  const contextParagraph = isAlaska
    ? `Alaska's setup is unique: no statewide rate, but dozens of boroughs and cities levy their own local taxes to fund services. The 1.82% figure is an average across those jurisdictions — actual rates depend entirely on where in Alaska you're shopping.`
    : `${name} is one of only four US states with zero sales tax at both the state and local level (${otherZeroTaxStates.slice(0, 4).join(', ')}). Alaska has no state sales tax but allows local taxes. For shoppers, ${name} is about as good as it gets — no surprise taxes at the register.`;

  const onlineParagraph = `Online shopping from ${name} works the same way. Since ${name} has no sales tax to collect${isAlaska ? ' at the state level' : ''}, most online orders ship tax-free${isAlaska ? ' unless the delivery address sits in a borough or city with a local tax' : ''}. If a retailer has a physical presence in a tax-collecting state, the rules can get complicated — but for most everyday online purchases, ${abbr} residents don't pay sales tax.`;

  const neighborNames = relatedStates.length > 0
    ? relatedStates.slice(0, 3).map((r) => STATE_SALES_TAX[r.slug]?.name || r.slug).join(', ')
    : '';
  const neighborParagraph = neighborNames
    ? `Curious how ${name} compares to neighboring states? Nearby states like ${neighborNames} do charge sales tax, so cross-border shopping trips from those states into ${name} are common. Use our <a href="/sales-tax-calculator">general sales tax calculator</a> to see rates for any state.`
    : `Compare rates for any state with our <a href="/sales-tax-calculator">general sales tax calculator</a>.`;

  const paragraphs = [
    openers[v],
    rankParagraph,
    localParagraph,
    contextParagraph,
    onlineParagraph,
    neighborParagraph,
  ];

  const keyRates = [
    { label: `${name} State Rate`, value: '0%' },
    { label: `${name} Local Rate`, value: isAlaska ? 'Avg 1.82% (varies by city)' : '0%' },
    { label: `${name} Combined Rate`, value: isAlaska ? '~1.82% (local only)' : '0%' },
    { label: 'Tax on $1,000', value: isAlaska ? '~$18.20 (local only)' : '$0.00' },
    { label: 'No-Tax States', value: 'DE, MT, NH, OR (AK: local only)' },
  ];

  const faqs = [
    {
      question: `Does ${name} have sales tax?`,
      answer: `No. ${name} has no state sales tax${isAlaska ? ', though some local municipalities may charge their own sales taxes' : ' and no local sales taxes either'}. Most purchases in ${name} are tax-free at the point of sale.`,
    },
    {
      question: `How does ${name} fund government without sales tax?`,
      answer: details.reasonShort,
    },
    {
      question: isAlaska ? 'Do any cities in Alaska charge sales tax?' : `Are there any taxes on purchases in ${name}?`,
      answer: isAlaska
        ? 'Yes. While Alaska has no state sales tax, many municipalities charge local sales taxes. Juneau charges up to 5%, Ketchikan 3.5%, and Wasilla 2.5%. Anchorage and Fairbanks do not charge local sales tax.'
        : stateKey === 'newhampshire'
          ? 'While there\'s no general sales tax, New Hampshire charges 9% tax on restaurant meals, hotel rooms, and car rentals. These are specific excise taxes, not a general sales tax. Most retail purchases are tax-free.'
          : `No. Most retail purchases in ${name} are completely tax-free. There is no state or local sales tax on goods and services at the point of sale.`,
    },
    {
      question: `Do I pay sales tax on online purchases in ${name}?`,
      answer: `Generally no. Since ${name} has no state sales tax, online retailers don't collect ${name} sales tax. However, if the retailer has a physical presence in another state that charges sales tax, the rules can vary. For most online shopping, ${name} residents don't pay sales tax.`,
    },
    {
      question: `Is it worth driving to ${name} to avoid sales tax?`,
      answer: `It depends on what you're buying. Against the ${avgPct}% 50-state average, a $1,000 purchase in ${name} saves about $${savingsVsAvg}. On a $10,000 purchase, that scales to roughly $${(10000 * (NATIONAL_AVG_COMBINED - state.combinedRate)).toFixed(0)}. For big-ticket items the savings can justify a trip, especially near the border — just remember your home state may require use tax on out-of-state purchases.`,
    },
    {
      question: `Where does ${name} rank nationally on sales tax?`,
      answer: isAlaska
        ? `#46 of 50. Only the four zero-tax states (Delaware, Montana, New Hampshire, Oregon) have a lower average than Alaska's 1.82% local-only figure. Every other state collects more.`
        : `At the very bottom — #${rank} of 50, tied with ${otherZeroTaxStates.slice(0, 3).join(', ')} as the only states that collect no sales tax at all. No shopper anywhere in the US pays less at the register than ${name} residents do.`,
    },
  ];

  const headings = buildHeadings(name, stateKey, 'low');

  return { howItWorks: paragraphs, keyRates, faqs, relatedStates, ...headings };
}

// ─── JSON-LD Generator for State Pages ───────────────────────────────────────

export function getStateJsonLd(stateKey: string, siteUrl: string) {
  const state = STATE_SALES_TAX[stateKey];
  const seo = getStateSEOMeta(stateKey);
  const content = getStateContent(stateKey);

  if (!state) return null;

  const statePct = state.noStateTax ? '0' : formatRate(state.stateRate);
  const localPct = pct(state.avgLocalRate);
  const combinedPct = pct(state.combinedRate);
  const url = `${siteUrl}/sales-tax-calculator/${stateKey}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@id': `${url}#breadcrumb`,
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Sales Tax Calculator', item: `${siteUrl}/sales-tax-calculator` },
          { '@type': 'ListItem', position: 3, name: `${state.name} Sales Tax` },
        ],
      },
      {
        '@id': `${url}#webpage`,
        '@type': 'WebPage',
        name: `${state.name} Sales Tax Calculator 2026`,
        description: `Calculate sales tax for ${state.name}. ${state.noStateTax ? 'No state sales tax.' : `Combined rate: ${combinedPct}%.`} Free, no sign-up required.`,
        url,
        inLanguage: 'en-US',
        dateModified: '2026-10-24',
        author: { '@id': `${url}#author` },
        reviewedBy: { '@id': `${url}#author` },
        publisher: { '@id': `${siteUrl}/#organization` },
        breadcrumb: { '@id': `${url}#breadcrumb` },
      },
      {
        '@id': `${url}#webapp`,
        '@type': 'WebApplication',
        name: `${state.name} Sales Tax Calculator 2026`,
        url,
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' },
        author: { '@id': `${url}#author` },
        publisher: { '@id': `${siteUrl}/#organization` },
      },
      // Dataset removed — Google flags "Invalid value in field itemtype" for Dataset on calculator pages
      {
        '@id': `${url}#faq`,
        '@type': 'FAQPage',
        mainEntity: content.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };
}
