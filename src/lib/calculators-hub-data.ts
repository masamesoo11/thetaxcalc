/**
 * Calculators Hub data — powers the /calculators directory page.
 *
 * Builds the full tool list from CALCULATOR_ROUTES (67 registry calculators)
 * plus the 6 dedicated routes that live outside the registry
 * (home-sale, salary/job-offer/paycheck comparisons, OBBBA, federal brackets),
 * mapped onto a hub-specific category system used for instant search & filter.
 *
 * Server-safe (pure data, no React) — consumed by /calculators page metadata,
 * its JSON-LD ItemList, and the client-side CalculatorsExplorer.
 */

import { CALCULATOR_ROUTES, UNLISTED_CALCULATOR_PATHS } from './calculator-routes';
import { STATE_TAX_DATA } from './state-tax-data';
import { LOANS_HUB_CARDS } from './calculators-additions/loans-additions';
import { RETIREMENT_HUB_CARDS } from './calculators-additions/retirement-additions';
import { SAVINGS_HUB_CARDS } from './calculators-additions/savings-additions';
import { WORK_HUB_CARDS } from './calculators-additions/work-additions';
import { UTILS_HUB_CARDS } from './calculators-additions/utils-additions';
import { FINANCE_HUB_CARDS } from './calculators-additions/finance-additions';

export type HubCategory =
  | 'income'
  | 'state'
  | 'city'
  | 'mortgage'
  | 'loans'
  | 'invest'
  | 'business'
  | 'compare'
  | 'sales'
  | 'law';

export interface HubCalculator {
  href: string;
  label: string;
  desc: string;
  category: HubCategory;
  /** Icon key resolved by the client explorer's ICONS map. */
  icon: string;
  /** Extra lowercase search terms (aliases, abbreviations). */
  keywords: string;
}

export const HUB_CATEGORY_LABELS: Record<HubCategory, string> = {
  income: 'Income & Paycheck',
  state: 'By State',
  city: 'Major Cities',
  mortgage: 'Mortgage & Property',
  loans: 'Loans & Debt',
  invest: 'Retirement & Investment',
  business: 'Business & Employers',
  compare: 'Compare',
  sales: 'Sales Tax',
  law: '2026 Tax Law',
};

/** Order of filter chips in the explorer UI. */
export const HUB_CATEGORY_ORDER: (HubCategory | 'all')[] = [
  'all',
  'income',
  'state',
  'city',
  'mortgage',
  'loans',
  'invest',
  'business',
  'compare',
  'sales',
  'law',
];

// ─── 50 state slugs → display name ─────────────────────────────────────────

const STATE_SLUG_TO_NAME: Record<string, string> = {
  'illinois-tax-calculator': 'Illinois',
  'texas-tax-calculator': 'Texas',
  'florida-tax-calculator': 'Florida',
  'california-tax-calculator': 'California',
  'new-york-tax-calculator': 'New York',
  'georgia-tax-calculator': 'Georgia',
  'north-carolina-tax-calculator': 'North Carolina',
  'pennsylvania-tax-calculator': 'Pennsylvania',
  'ohio-tax-calculator': 'Ohio',
  'michigan-tax-calculator': 'Michigan',
  'new-jersey-tax-calculator': 'New Jersey',
  'colorado-tax-calculator': 'Colorado',
  'arizona-tax-calculator': 'Arizona',
  'washington-tax-calculator': 'Washington',
  'massachusetts-tax-calculator': 'Massachusetts',
  'indiana-tax-calculator': 'Indiana',
  'tennessee-tax-calculator': 'Tennessee',
  'missouri-tax-calculator': 'Missouri',
  'maryland-tax-calculator': 'Maryland',
  'wisconsin-tax-calculator': 'Wisconsin',
  'minnesota-tax-calculator': 'Minnesota',
  'oregon-tax-calculator': 'Oregon',
  'virginia-tax-calculator': 'Virginia',
  'alaska-tax-calculator': 'Alaska',
  'nevada-tax-calculator': 'Nevada',
  'south-dakota-tax-calculator': 'South Dakota',
  'wyoming-tax-calculator': 'Wyoming',
  'new-hampshire-tax-calculator': 'New Hampshire',
  'idaho-tax-calculator': 'Idaho',
  'kentucky-tax-calculator': 'Kentucky',
  'mississippi-tax-calculator': 'Mississippi',
  'utah-tax-calculator': 'Utah',
  'alabama-tax-calculator': 'Alabama',
  'arkansas-tax-calculator': 'Arkansas',
  'connecticut-tax-calculator': 'Connecticut',
  'delaware-tax-calculator': 'Delaware',
  'hawaii-tax-calculator': 'Hawaii',
  'iowa-tax-calculator': 'Iowa',
  'kansas-tax-calculator': 'Kansas',
  'louisiana-tax-calculator': 'Louisiana',
  'maine-tax-calculator': 'Maine',
  'montana-tax-calculator': 'Montana',
  'nebraska-tax-calculator': 'Nebraska',
  'new-mexico-tax-calculator': 'New Mexico',
  'north-dakota-tax-calculator': 'North Dakota',
  'oklahoma-tax-calculator': 'Oklahoma',
  'rhode-island-tax-calculator': 'Rhode Island',
  'south-carolina-tax-calculator': 'South Carolina',
  'vermont-tax-calculator': 'Vermont',
  'west-virginia-tax-calculator': 'West Virginia',
};

/** 2026 income-tax rate blurbs for the 22 popular states not in STATE_TAX_DATA.
 *  Also used by the homepage 50-state table (Task 48) — single source of truth. */
export const POPULAR_STATE_RATES: Record<string, string> = {
  'illinois-tax-calculator': '4.95% flat income tax',
  'texas-tax-calculator': '0% income tax',
  'florida-tax-calculator': '0% income tax',
  'california-tax-calculator': '1%–13.3% income tax',
  'new-york-tax-calculator': '4%–10.9% income tax',
  'georgia-tax-calculator': '4.99% flat income tax',
  'virginia-tax-calculator': '2%–5.75% income tax',
  'north-carolina-tax-calculator': '3.99% flat income tax',
  'pennsylvania-tax-calculator': '3.07% flat income tax',
  'ohio-tax-calculator': '0%–3.99% income tax',
  'michigan-tax-calculator': '4.25% flat income tax',
  'new-jersey-tax-calculator': '1.4%–10.75% income tax',
  'colorado-tax-calculator': '4.4% flat income tax',
  'arizona-tax-calculator': '2.5% flat income tax',
  'washington-tax-calculator': '0% income tax',
  'massachusetts-tax-calculator': '5% income tax (9% over $1M)',
  'indiana-tax-calculator': '2.95% flat income tax',
  'tennessee-tax-calculator': '0% income tax',
  'missouri-tax-calculator': '2%–4.8% income tax',
  'maryland-tax-calculator': '2%–5.75% + county income tax',
  'wisconsin-tax-calculator': '3.5%–7.65% income tax',
  'minnesota-tax-calculator': '5.35%–9.85% income tax',
  'oregon-tax-calculator': '4.75%–9.9% income tax',
};

/** Common state abbreviations for search matching. */
const STATE_ABBRS: Record<string, string> = {
  'illinois-tax-calculator': 'il',
  'texas-tax-calculator': 'tx',
  'florida-tax-calculator': 'fl',
  'california-tax-calculator': 'ca',
  'new-york-tax-calculator': 'ny',
  'georgia-tax-calculator': 'ga',
  'virginia-tax-calculator': 'va',
  'north-carolina-tax-calculator': 'nc',
  'pennsylvania-tax-calculator': 'pa',
  'ohio-tax-calculator': 'oh',
  'michigan-tax-calculator': 'mi',
  'new-jersey-tax-calculator': 'nj',
  'colorado-tax-calculator': 'co',
  'arizona-tax-calculator': 'az',
  'washington-tax-calculator': 'wa',
  'massachusetts-tax-calculator': 'ma',
  'indiana-tax-calculator': 'in',
  'tennessee-tax-calculator': 'tn',
  'missouri-tax-calculator': 'mo',
  'maryland-tax-calculator': 'md',
  'wisconsin-tax-calculator': 'wi',
  'minnesota-tax-calculator': 'mn',
  'oregon-tax-calculator': 'or',
};

/** Registry slugs rendered as "Major Cities" cards. */
const CITY_CARDS: Record<string, { label: string; desc: string }> = {
  'new-york-city-tax-calculator': {
    label: 'New York City',
    desc: 'NY state + 3.078%–3.876% city tax',
  },
  'los-angeles-tax-calculator': {
    label: 'Los Angeles',
    desc: 'California rates + LA take-home pay',
  },
  'chicago-tax-calculator': {
    label: 'Chicago',
    desc: 'Illinois 4.95% — Chicago take-home pay',
  },
};

/** Explicit cards for non-state registry calculators. */
type SpecialCard = { label: string; desc: string; category: HubCategory; icon: string; keywords?: string };
const SPECIAL_CARDS: Record<string, SpecialCard> = {
  'paycheck-calculator': {
    label: 'Paycheck Calculator',
    desc: 'Take-home pay — federal, FICA & 50 states',
    category: 'income',
    icon: 'dollar',
    keywords: 'salary take home pay after tax net pay',
  },
  'overtime-tax-calculator': {
    label: 'Overtime Tax Calculator',
    desc: 'No-tax OT savings under the 2026 OBBBA',
    category: 'income',
    icon: 'clock',
    keywords: 'overtime ot hours no tax',
  },
  'bonus-tax-calculator': {
    label: 'Bonus Tax Calculator',
    desc: '22% flat vs. aggregate method',
    category: 'income',
    icon: 'percent',
    keywords: 'bonus supplemental withholding',
  },
  'hourly-to-salary-calculator': {
    label: 'Hourly to Salary Calculator',
    desc: '$X/hr → yearly, monthly & take-home',
    category: 'income',
    icon: 'swap',
    keywords: 'hourly to salary hourly to yearly annual wage rate 25 an hour 20 an hour 30 an hour 2080 hours wage converter overtime',
  },
  'compound-interest-calculator': {
    label: 'Compound Interest Calculator',
    desc: 'Savings snowball + Rule of 72',
    category: 'invest',
    icon: 'trending',
    keywords: 'compound interest investment growth savings future value rule of 72 monthly contributions snowball investing projection',
  },
  'marriage-tax-calculator': {
    label: 'Marriage Tax Calculator',
    desc: 'Marriage penalty or bonus for 2026?',
    category: 'compare',
    icon: 'scale',
    keywords: 'marriage tax penalty bonus married filing jointly vs single wedding tax jointly separately brackets',
  },
  'irs-withholding-calculator': {
    label: 'IRS Withholding Calculator',
    desc: 'W-4 optimization for accurate withholding',
    category: 'income',
    icon: 'file',
    keywords: 'w4 w-4 withholding allowance',
  },
  'tax-refund-calculator': {
    label: 'Tax Refund Calculator',
    desc: 'Estimate your 2026 refund or balance due',
    category: 'income',
    icon: 'receipt',
    keywords: 'refund owed irs',
  },
  'lottery-tax-calculator': {
    label: 'Lottery Tax Calculator',
    desc: 'After-tax winnings — lump sum vs. annuity',
    category: 'income',
    icon: 'sparkles',
    keywords: 'lottery winnings prize powerball megamillions',
  },
  'relocation-calculator': {
    label: 'Relocation Calculator',
    desc: 'Salary you need state-to-state',
    category: 'income',
    icon: 'swap',
    keywords: 'relocation move moving cost of living',
  },
  'mortgage-calculator': {
    label: 'Mortgage Calculator',
    desc: 'Payment + amortization schedule',
    category: 'mortgage',
    icon: 'home',
    keywords: 'mortgage home loan payment pmi',
  },
  'property-tax-calculator': {
    label: 'Property Tax Calculator',
    desc: 'All 50 states + county estimates',
    category: 'mortgage',
    icon: 'landmark',
    keywords: 'property tax house assessment',
  },
  '401k-retirement-calculator': {
    label: '401(k) Retirement Calculator',
    desc: '401(k) impact on today’s take-home pay',
    category: 'invest',
    icon: 'piggy',
    keywords: '401k retirement ira hsa deduction',
  },
  'capital-gains-calculator': {
    label: 'Capital Gains Calculator',
    desc: '0% / 15% / 20% brackets + NIIT',
    category: 'invest',
    icon: 'trending',
    keywords: 'capital gains stocks investment niit',
  },
  'self-employment-tax-calculator': {
    label: 'Self-Employment Tax Calculator',
    desc: '15.3% SE tax — W-2 vs. 1099',
    category: 'business',
    icon: 'shield',
    keywords: 'self employment se tax 1099 freelancer gig',
  },
  'employee-cost-calculator': {
    label: 'Employee Cost Calculator',
    desc: 'True cost of hiring — payroll taxes',
    category: 'business',
    icon: 'briefcase',
    keywords: 'employer cost hiring payroll benefits',
  },
  'sales-tax-calculator': {
    label: 'Sales Tax Calculator',
    desc: '50 states + reverse sales tax',
    category: 'sales',
    icon: 'receipt',
    keywords: 'sales tax reverse before tax checkout',
  },
  // ─── Task 39 additions: 13 new money calculators ────────────────────────
  ...(LOANS_HUB_CARDS as Record<string, SpecialCard>),
  ...(RETIREMENT_HUB_CARDS as Record<string, SpecialCard>),
  ...(SAVINGS_HUB_CARDS as Record<string, SpecialCard>),
  ...(WORK_HUB_CARDS as Record<string, SpecialCard>),
  ...(UTILS_HUB_CARDS as Record<string, SpecialCard>),
  // ─── Task 41 gap batch: inflation, debt payoff, DTI ────────────────────────
  ...(FINANCE_HUB_CARDS as Record<string, SpecialCard>),
  // Task 48: ROBUX_HUB_CARDS intentionally NOT spread here — the robux tool
  // is noindexed (see sitemap-entries.ts NOINDEX_PATHS) and delisted from the
  // hub so AdSense reviewers & crawlers never reach it by following links;
  // the page stays live for direct URL visits until the re-index decision.
};

/** Dedicated calculator routes that live outside CALCULATOR_ROUTES. */
const EXTRA_CALCULATORS: HubCalculator[] = [
  {
    href: '/home-sale-tax-calculator',
    label: 'Home Sale Tax Calculator',
    desc: 'Capital gains + $250k/$500k exclusion',
    category: 'mortgage',
    icon: 'key',
    keywords: 'home sale selling house capital gains exclusion fsbo',
  },
  {
    href: '/salary-comparison-calculator',
    label: 'Salary Comparison Calculator',
    desc: 'After-tax salary state vs. state',
    category: 'compare',
    icon: 'swap',
    keywords: 'salary comparison compare states relocation offer',
  },
  {
    href: '/job-offer-comparison-calculator',
    label: 'Job Offer Comparison Calculator',
    desc: 'Which job offer pays more after tax?',
    category: 'compare',
    icon: 'scale',
    keywords: 'job offer comparison negotiate two offers new job',
  },
  {
    href: '/paycheck-difference-calculator',
    label: 'Paycheck Difference Calculator',
    desc: 'Exact paycheck gap between two states',
    category: 'compare',
    icon: 'split',
    keywords: 'paycheck difference state vs state gap',
  },
  {
    href: '/obbba-tax-calculator',
    label: 'OBBBA Tax Calculator',
    desc: 'One Big Beautiful Bill Act — 2026 changes',
    category: 'law',
    icon: 'landmark',
    keywords: 'obbba one big beautiful bill act 2026 law no tax overtime',
  },
  {
    href: '/federal-tax-brackets',
    label: 'Federal Tax Brackets 2026',
    desc: '10%–37% brackets, deductions & credits',
    category: 'law',
    icon: 'layers',
    keywords: 'federal brackets irs marginal effective rate standard deduction',
  },
  {
    href: '/tax-brackets-2027',
    label: '2027 Tax Brackets (Projected)',
    desc: 'Estimated 2027 brackets ahead of the IRS',
    category: 'law',
    icon: 'trending',
    keywords: '2027 tax brackets projected 2027 standard deduction 2027 rates estimate next year inflation adjustment',
  },
];

/** Featured tools shown first in the default (unfiltered) view. */
const FEATURED_HREFS = [
  '/paycheck-calculator',
  '/salary-comparison-calculator',
  '/job-offer-comparison-calculator',
  '/mortgage-calculator',
  '/sales-tax-calculator',
  '/capital-gains-calculator',
  '/self-employment-tax-calculator',
  '/401k-retirement-calculator',
];

/** Rate blurb for a state slug from STATE_TAX_DATA (28 states) or popular map. */
function stateRateDesc(slug: string, name: string): string {
  const popular = POPULAR_STATE_RATES[slug];
  if (popular) return popular;
  for (const data of Object.values(STATE_TAX_DATA)) {
    if (data.slug === slug) {
      return `${data.incomeTaxRate} income tax`;
    }
  }
  return `${name} income tax calculator`;
}

function titleCaseFromSlug(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function buildHubCalculators(): HubCalculator[] {
  const items: HubCalculator[] = [];

  for (const route of CALCULATOR_ROUTES) {
    // Task 48: unlisted tools (robux) are served at their URL but never
    // appear in the hub directory, its counts, or its ItemList schema.
    if (UNLISTED_CALCULATOR_PATHS.includes(route.canonicalPath)) continue;
    const slug = route.slug;
    const href = route.canonicalPath;

    const city = CITY_CARDS[slug];
    if (city) {
      items.push({
        href,
        label: city.label,
        desc: city.desc,
        category: 'city',
        icon: 'building',
        keywords: `${slug.replace(/-/g, ' ')} nyc local city`,
      });
      continue;
    }

    const stateName = STATE_SLUG_TO_NAME[slug];
    if (stateName) {
      const abbr = STATE_ABBRS[slug] ?? '';
      items.push({
        href,
        label: stateName,
        desc: stateRateDesc(slug, stateName),
        category: 'state',
        icon: 'pin',
        keywords: `${stateName.toLowerCase()} ${abbr} state income tax take home`,
      });
      continue;
    }

    const special = SPECIAL_CARDS[slug];
    if (special) {
      items.push({
        href,
        label: special.label,
        desc: special.desc,
        category: special.category,
        icon: special.icon,
        keywords: special.keywords ?? slug.replace(/-/g, ' '),
      });
      continue;
    }

    // Fallback — should not trigger for the current registry.
    items.push({
      href,
      label: titleCaseFromSlug(slug.replace(/-calculator$/, '')),
      desc: 'Free 2026 tax calculator — no sign-up.',
      category: 'income',
      icon: 'calculator',
      keywords: slug.replace(/-/g, ' '),
    });
  }

  items.push(...EXTRA_CALCULATORS);

  // Featured first, then everything else in build order.
  const rank = new Map(FEATURED_HREFS.map((href, i) => [href, i]));
  return items.sort((a, b) => {
    const ra = rank.has(a.href) ? (rank.get(a.href) as number) : 99;
    const rb = rank.has(b.href) ? (rank.get(b.href) as number) : 99;
    return ra - rb;
  });
}

/** The complete hub tool list (73 calculators as of 2026). */
export const HUB_CALCULATORS: HubCalculator[] = buildHubCalculators();

export const HUB_CALCULATOR_COUNT = HUB_CALCULATORS.length;

export function hubCategoryCount(category: HubCategory): number {
  return HUB_CALCULATORS.filter((c) => c.category === category).length;
}
