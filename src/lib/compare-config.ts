/**
 * State vs State Tax Comparison Configuration
 * Centralized mapping of comparison slugs to metadata, tax data, and SEO info.
 */

export interface CompareStateData {
  name: string;
  abbreviation: string;
  slug: string;
  taxConfigKey: string; // key in STATE_PROFILES (e.g., 'newyork' for 'new-york')
  incomeTaxLabel: string;
  incomeTaxRate: number; // decimal for calculations
  standardDeduction: number;
  propertyTaxRate: number; // decimal
  salesTaxRate: number; // decimal
  calculatorSlug: string;
  extraNotes?: string;
}

export interface CompareConfig {
  slug: string;
  state1: CompareStateData;
  state2: CompareStateData;
  metaTitle: string;
  metaDesc: string;
  h1: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  faqs: { question: string; answer: string }[];
}

// ─── State Data Map ──────────────────────────────────────────────────────────

export const COMPARE_STATES: Record<string, CompareStateData> = {
  illinois: {
    name: 'Illinois',
    abbreviation: 'IL',
    slug: 'illinois',
    taxConfigKey: 'illinois',
    incomeTaxLabel: '4.95% flat',
    incomeTaxRate: 0.0495,
    standardDeduction: 2775,
    propertyTaxRate: 0.0178,
    salesTaxRate: 0.0886,
    calculatorSlug: '/illinois-tax-calculator',
    extraNotes: 'Personal exemption of $2,775; no standard deduction',
  },
  texas: {
    name: 'Texas',
    abbreviation: 'TX',
    slug: 'texas',
    taxConfigKey: 'texas',
    incomeTaxLabel: '0% (no state income tax)',
    incomeTaxRate: 0,
    standardDeduction: 0,
    propertyTaxRate: 0.0171,
    salesTaxRate: 0.082,
    calculatorSlug: '/texas-tax-calculator',
    extraNotes: 'No state income tax; higher property taxes offset savings',
  },
  florida: {
    name: 'Florida',
    abbreviation: 'FL',
    slug: 'florida',
    taxConfigKey: 'florida',
    incomeTaxLabel: '0% (no state income tax)',
    incomeTaxRate: 0,
    standardDeduction: 0,
    propertyTaxRate: 0.0086,
    salesTaxRate: 0.07,
    calculatorSlug: '/florida-tax-calculator',
    extraNotes: 'No state income tax; low property taxes; homestead exemption',
  },
  california: {
    name: 'California',
    abbreviation: 'CA',
    slug: 'california',
    taxConfigKey: 'california',
    incomeTaxLabel: '1%–13.3% progressive',
    incomeTaxRate: 0.093, // approximate effective rate for mid-income
    standardDeduction: 6083,
    propertyTaxRate: 0.0071,
    salesTaxRate: 0.0882,
    calculatorSlug: '/california-tax-calculator',
    extraNotes: 'Highest top marginal rate in the U.S. at 13.3%; $6,083 standard deduction (single)',
  },
  'new-york': {
    name: 'New York',
    abbreviation: 'NY',
    slug: 'new-york',
    taxConfigKey: 'newyork',
    incomeTaxLabel: '4%–10.9% progressive',
    incomeTaxRate: 0.0685, // approximate effective rate for mid-income
    standardDeduction: 8100,
    propertyTaxRate: 0.0162,
    salesTaxRate: 0.0852,
    calculatorSlug: '/new-york-tax-calculator',
    extraNotes: 'NYC residents pay additional city tax of 3.078%–3.876%',
  },
};

// ─── The 10 Most Important Comparisons ───────────────────────────────────────

export const COMPARISON_SLUGS = [
  'illinois-vs-texas',
  'illinois-vs-florida',
  'illinois-vs-california',
  'illinois-vs-new-york',
  'texas-vs-florida',
  'texas-vs-california',
  'texas-vs-new-york',
  'florida-vs-california',
  'florida-vs-new-york',
  'california-vs-new-york',
] as const;

export type ComparisonSlug = (typeof COMPARISON_SLUGS)[number];

// ─── Parse slug into two state keys ──────────────────────────────────────────

export function parseComparisonSlug(slug: string): [string, string] | null {
  const parts = slug.split('-vs-');
  if (parts.length !== 2) return null;
  const state1 = parts[0];
  const state2 = parts[1];
  if (!COMPARE_STATES[state1] || !COMPARE_STATES[state2]) return null;
  return [state1, state2];
}

// ─── CTR-Optimized Custom Meta for High-Impression Comparisons ──────────────────

const CUSTOM_COMPARE_META: Record<string, { metaTitle: string; metaDesc: string; ogTitle: string; ogDescription: string }> = {
  'california-vs-new-york': {
    metaTitle: 'California vs New York Taxes 2026: Side-by-Side Breakdown',
    metaDesc: 'CA tops out at 13.3% vs NY 10.9% — but NYC adds 3.876% city tax. See exact take-home pay at $75K & $150K for both states. Free 2026 calculator.',
    ogTitle: 'California vs New York Taxes 2026 — Who Pays More?',
    ogDescription: 'CA 13.3% vs NY 10.9% + NYC 3.876%. See your take-home pay difference at $75K & $150K. Free 2026 comparison calculator.',
  },
  'texas-vs-florida': {
    metaTitle: 'Texas vs Florida Taxes 2026: No-Income-Tax States Compared',
    metaDesc: 'Both have 0% income tax — but TX property tax is 1.71% vs FL 0.86%. See which state actually saves you more at $75K & $150K. Free 2026 calculator.',
    ogTitle: 'Texas vs Florida Taxes 2026 — Which Saves You More?',
    ogDescription: 'Both 0% income tax, but TX property tax is 2x FL. See real take-home pay difference at $75K & $150K. Free 2026 calculator.',
  },
  'illinois-vs-texas': {
    metaTitle: 'Illinois vs Texas Taxes 2026: Save $4,200+/Year in TX',
    metaDesc: 'IL 4.95% flat vs TX 0% income tax. On $85K, keep $4,200+ more in Texas. Full breakdown: income, property & sales tax. Free 2026 calculator.',
    ogTitle: 'Illinois vs Texas — Save $4,200+/Year in TX (2026)',
    ogDescription: 'IL 4.95% vs TX 0% income tax. Keep $4,200+ more in Texas on $85K. Full side-by-side 2026 comparison.',
  },
  'illinois-vs-florida': {
    metaTitle: 'Illinois vs Florida Taxes 2026: Save $4,000+/Year in FL',
    metaDesc: 'IL 4.95% flat vs FL 0% income tax. On $85K, Florida saves $4,000+/year. Compare income, property & sales tax. Free 2026 calculator.',
    ogTitle: 'Illinois vs Florida — Save $4,000+/Year in FL (2026)',
    ogDescription: 'IL 4.95% vs FL 0% income tax. Keep $4,000+ more in Florida on $85K. Full side-by-side 2026 comparison.',
  },
  'illinois-vs-california': {
    metaTitle: 'Illinois vs California Taxes 2026: Flat 4.95% vs 13.3%',
    metaDesc: 'IL 4.95% flat vs CA up to 13.3%. On $100K, IL saves ~$5,500/year. Full income, property & sales tax breakdown. Free 2026 calculator.',
    ogTitle: 'Illinois vs California — Flat 4.95% vs 13.3% (2026)',
    ogDescription: 'IL 4.95% vs CA up to 13.3%. Save ~$5,500/year in IL on $100K. Full 2026 tax comparison.',
  },
  'illinois-vs-new-york': {
    metaTitle: 'Illinois vs New York Taxes 2026: 4.95% Flat vs 10.9% Progressive',
    metaDesc: 'IL 4.95% flat vs NY up to 10.9% + NYC tax. On $100K, IL saves ~$3,800/year. Full tax comparison. Free 2026 calculator.',
    ogTitle: 'Illinois vs New York — 4.95% vs 10.9% (2026)',
    ogDescription: 'IL 4.95% vs NY up to 10.9%. Save ~$3,800/year in IL on $100K. Full 2026 comparison.',
  },
  'texas-vs-california': {
    metaTitle: 'Texas vs California Taxes 2026: 0% vs 13.3% Income Tax',
    metaDesc: 'TX 0% income tax vs CA up to 13.3%. On $100K salary, Texas saves you ~$8,400/year. See full breakdown including property & sales tax. Free 2026 calculator.',
    ogTitle: 'Texas vs California — 0% vs 13.3% Income Tax (2026)',
    ogDescription: 'TX 0% vs CA 13.3%. Save ~$8,400/year in Texas on $100K. Full 2026 comparison.',
  },
  'texas-vs-new-york': {
    metaTitle: 'Texas vs New York Taxes 2026: 0% vs 10.9% Income Tax',
    metaDesc: 'TX 0% income tax vs NY up to 10.9% + NYC 3.876%. On $100K, Texas saves ~$6,800/year. Full income, property & sales tax side-by-side. Free 2026 calculator.',
    ogTitle: 'Texas vs New York — 0% vs 10.9% Income Tax (2026)',
    ogDescription: 'TX 0% vs NY 10.9% + NYC tax. Save ~$6,800/year in Texas on $100K. Full 2026 comparison.',
  },
  'florida-vs-california': {
    metaTitle: 'Florida vs California Taxes 2026: 0% vs 13.3% Income Tax',
    metaDesc: 'FL 0% income tax vs CA up to 13.3%. On $100K salary, Florida saves ~$8,400/year. Compare income, property & sales tax. Free 2026 calculator.',
    ogTitle: 'Florida vs California — 0% vs 13.3% Income Tax (2026)',
    ogDescription: 'FL 0% vs CA 13.3%. Save ~$8,400/year in Florida on $100K. Full 2026 comparison.',
  },
  'florida-vs-new-york': {
    metaTitle: 'Florida vs New York Taxes 2026: 0% vs 10.9% Income Tax',
    metaDesc: 'FL 0% income tax vs NY up to 10.9% + NYC 3.876%. On $100K, Florida saves ~$6,800/year. Full income, property & sales tax breakdown. Free 2026 calculator.',
    ogTitle: 'Florida vs New York — 0% vs 10.9% Income Tax (2026)',
    ogDescription: 'FL 0% vs NY 10.9% + NYC tax. Save ~$6,800/year in Florida on $100K. Full 2026 comparison.',
  },
};

// ─── Generate SEO metadata for each comparison ───────────────────────────────

function buildCompareConfig(slug: string): CompareConfig | null {
  const parsed = parseComparisonSlug(slug);
  if (!parsed) return null;

  const [key1, key2] = parsed;
  const s1 = COMPARE_STATES[key1];
  const s2 = COMPARE_STATES[key2];

  // Use CTR-optimized custom meta if available, otherwise fall back to generic
  const customMeta = CUSTOM_COMPARE_META[slug];

  return {
    slug,
    state1: s1,
    state2: s2,
    metaTitle: customMeta?.metaTitle ?? `${s1.name} vs ${s2.name} Taxes 2026 | Compare`,
    metaDesc: customMeta?.metaDesc ?? `${s1.name} vs ${s2.name} taxes compared: see your take-home pay difference at $75K & $150K. Income tax, property tax, sales tax — all 2026 numbers.`,
    h1: `${s1.name} vs ${s2.name} Tax Comparison`,
    keywords: [
      `${s1.name.toLowerCase()} vs ${s2.name.toLowerCase()} taxes`,
      `${s1.abbreviation} vs ${s2.abbreviation} income tax`,
      `${s1.name.toLowerCase()} ${s2.name.toLowerCase()} tax comparison`,
      `compare ${s1.name.toLowerCase()} ${s2.name.toLowerCase()} taxes`,
      `${s1.name.toLowerCase()} ${s2.name.toLowerCase()} take home pay`,
      `${s1.name.toLowerCase()} ${s2.name.toLowerCase()} cost of living`,
      `move from ${s1.name} to ${s2.name} taxes`,
      `relocate ${s1.name} to ${s2.name} salary`,
    ],
    ogTitle: customMeta?.ogTitle ?? `${s1.name} vs ${s2.name} — Which State Saves You More in 2026?`,
    ogDescription: customMeta?.ogDescription ?? `${s1.name} vs ${s2.name} take-home pay comparison. See real dollar differences at $75K & $150K salaries for 2026.`,
    faqs: buildFaqs(s1, s2),
  };
}

function buildFaqs(s1: CompareStateData, s2: CompareStateData): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = [];

  // FAQ 1: Income tax comparison
  faqs.push({
    question: `Does ${s1.name} or ${s2.name} have higher income tax?`,
    answer: `${s1.name} has an income tax rate of ${s1.incomeTaxLabel}, while ${s2.name} has ${s2.incomeTaxLabel}. ${
      s1.incomeTaxRate > s2.incomeTaxRate
        ? `${s1.name} has the higher income tax burden.`
        : s1.incomeTaxRate < s2.incomeTaxRate
        ? `${s2.name} has the higher income tax burden.`
        : 'Both states have similar income tax burdens.'
    }`,
  });

  // FAQ 2: Property tax comparison
  faqs.push({
    question: `Which state has higher property taxes: ${s1.name} or ${s2.name}?`,
    answer: `${s1.name} has an average effective property tax rate of ${(s1.propertyTaxRate * 100).toFixed(2)}%, compared to ${s2.name}'s ${(s2.propertyTaxRate * 100).toFixed(2)}%. ${
      s1.propertyTaxRate > s2.propertyTaxRate
        ? `${s1.name} has higher property taxes, which is important to consider even if income tax is lower.`
        : s1.propertyTaxRate < s2.propertyTaxRate
        ? `${s2.name} has higher property taxes.`
        : 'Both states have similar property tax rates.'
    }`,
  });

  // FAQ 3: Overall tax burden
  faqs.push({
    question: `Is it cheaper to live in ${s1.name} or ${s2.name} overall?`,
    answer: `The answer depends on your income level and spending habits. ${s1.name} charges ${s1.incomeTaxLabel} income tax and ${(s1.propertyTaxRate * 100).toFixed(2)}% property tax, while ${s2.name} charges ${s2.incomeTaxLabel} income tax and ${(s2.propertyTaxRate * 100).toFixed(2)}% property tax. Use our side-by-side comparison table above to see take-home pay at $75K and $150K salary levels.`,
  });

  // FAQ 4: Moving consideration
  faqs.push({
    question: `Should I move from ${s1.name} to ${s2.name} for tax savings?`,
    answer: `Moving from ${s1.name} to ${s2.name} could ${
      s1.incomeTaxRate > s2.incomeTaxRate ? 'save' : 'cost'
    } you money on income taxes, but consider the full picture: property taxes, cost of living, housing prices, and quality of life. Use our relocation calculator for a personalized salary comparison.${
      s2.extraNotes ? ' ' + s2.extraNotes + '.' : ''
    }`,
  });

  // FAQ 5: Sales tax comparison (if notably different)
  if (Math.abs(s1.salesTaxRate - s2.salesTaxRate) > 0.005) {
    faqs.push({
      question: `How do sales taxes compare between ${s1.name} and ${s2.name}?`,
      answer: `${s1.name} has an average combined sales tax rate of ${(s1.salesTaxRate * 100).toFixed(1)}%, while ${s2.name} has ${(s2.salesTaxRate * 100).toFixed(1)}%. Over a year of typical spending, this difference can add up to hundreds of dollars.`,
    });
  } else {
    faqs.push({
      question: `What is the biggest tax difference between ${s1.name} and ${s2.name}?`,
      answer: `The largest tax difference between ${s1.name} and ${s2.name} is in income tax: ${s1.incomeTaxLabel} vs ${s2.incomeTaxLabel}. This difference can mean thousands of dollars per year in take-home pay depending on your salary level.`,
    });
  }

  return faqs;
}

// ─── Cached Config Map ──────────────────────────────────────────────────────

const _configCache = new Map<string, CompareConfig | null>();

export function getCompareConfig(slug: string): CompareConfig | null {
  if (!_configCache.has(slug)) {
    _configCache.set(slug, buildCompareConfig(slug));
  }
  return _configCache.get(slug)!;
}

// ─── All configs for the landing page ────────────────────────────────────────

export function getAllCompareConfigs(): CompareConfig[] {
  return COMPARISON_SLUGS
    .map((slug) => getCompareConfig(slug))
    .filter((c): c is CompareConfig => c !== null);
}
