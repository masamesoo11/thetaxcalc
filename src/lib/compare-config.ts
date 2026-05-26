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

// ─── Generate SEO metadata for each comparison ───────────────────────────────

function buildCompareConfig(slug: string): CompareConfig | null {
  const parsed = parseComparisonSlug(slug);
  if (!parsed) return null;

  const [key1, key2] = parsed;
  const s1 = COMPARE_STATES[key1];
  const s2 = COMPARE_STATES[key2];

  return {
    slug,
    state1: s1,
    state2: s2,
    metaTitle: `${s1.name} vs ${s2.name} Taxes — Income, Property & Take-Home Pay Comparison`,
    metaDesc: `Compare ${s1.name} vs ${s2.name} taxes side by side. See income tax rates, property tax, sales tax, and take-home pay on $75K and $150K salaries. Free 2026 state tax comparison.`,
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
    ogTitle: `${s1.name} vs ${s2.name} Tax Comparison 2026`,
    ogDescription: `Side-by-side comparison of ${s1.name} and ${s2.name} taxes. Income tax, property tax, sales tax, and take-home pay on $75K and $150K.`,
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
