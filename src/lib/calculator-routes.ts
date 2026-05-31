/**
 * Calculator Route Configuration
 * Centralized mapping of calculator slugs to metadata, components, and SEO data.
 * This is the single source of truth for all calculator routes.
 */

export interface CalculatorRouteConfig {
  slug: string;
  title: string;
  description: string;
  h1: string;
  metaTitle: string;
  metaDesc: string;
  keywords: string[];
  componentKey: string;
  category: 'paycheck' | 'mortgage' | 'retirement' | 'investment' | 'business';
  breadcrumbLabel: string;
  ogTitle: string;
  ogDescription: string;
  canonicalPath: string;
  jsonLdType: string;
}

export const CALCULATOR_ROUTES: CalculatorRouteConfig[] = [
  {
    slug: 'paycheck-calculator',
    title: 'Free 2026 Paycheck Calculator — Federal, FICA & State Tax',
    description:
      'Free paycheck tax calculator for 2026. Calculate take-home pay after federal, FICA & state taxes. No sign-up required. Supports IL, TX, FL, CA, NY with 401(k) and HSA deductions.',
    h1: 'Free Paycheck Calculator',
    metaTitle: 'Free Paycheck Tax Calculator 2026 — Federal & State',
    metaDesc:
      'Free paycheck tax calculator for 2026. Calculate take-home pay after federal, FICA & state taxes. No sign-up. Covers IL, TX, FL, CA, NY.',
    keywords: [
      'free paycheck tax calculator', 'free tax calculator for paycheck',
      'free tax calculator federal and state', 'free tax calculator for 2026',
      'take home pay calculator', 'salary calculator',
      'after tax salary', 'net pay calculator', '2026 paycheck calculator',
      'FICA calculator', 'federal tax calculator',
      'free tax calculator no sign up', 'free tax calculator online',
    ],
    componentKey: 'home',
    category: 'paycheck',
    breadcrumbLabel: 'Paycheck Calculator',
    ogTitle: 'Free 2026 Paycheck Tax Calculator — Federal & State Take-Home Pay',
    ogDescription:
      'Free paycheck tax calculator for 2026. Take-home pay after federal, FICA & state taxes. No sign-up. IL, TX, FL, CA, NY.',
    canonicalPath: '/paycheck-calculator',
    jsonLdType: 'home',
  },
  {
    slug: 'illinois-tax-calculator',
    title: 'Free Illinois Tax Calculator 2026 — 4.95% Flat Tax',
    description:
      'Free Illinois tax calculator for 2026. Calculate take-home pay after 4.95% flat state tax, $2,775 personal exemption, federal tax & FICA. No sign-up.',
    h1: 'Free Illinois Tax Calculator',
    metaTitle: 'Free Illinois Tax Calculator 2026 | 4.95% Flat',
    metaDesc:
      'Free Illinois tax calculator 2026. Take-home pay after 4.95% flat tax and $2,775 exemption. No sign-up. 401(k) and HSA included.',
    keywords: [
      'free Illinois tax calculator', 'Illinois tax calculator', 'IL paycheck calculator',
      'Illinois income tax', 'Illinois 4.95% tax', 'Illinois take home pay',
      'Illinois personal exemption', 'Illinois salary calculator',
      'free tax calculator for 2026', 'IL state tax 2026',
    ],
    componentKey: 'illinois',
    category: 'paycheck',
    breadcrumbLabel: 'Illinois',
    ogTitle: 'Free Illinois Tax Calculator 2026 — 4.95% Flat Tax Rate',
    ogDescription:
      'Free Illinois tax calculator. Take-home pay after 4.95% flat tax and $2,775 exemption. No sign-up. 2026 data.',
    canonicalPath: '/illinois-tax-calculator',
    jsonLdType: 'illinois',
  },
  {
    slug: 'texas-tax-calculator',
    title: 'Free Texas Tax Calculator 2026 — 0% State Income Tax',
    description:
      'Free Texas tax calculator for 2026. Calculate take-home pay with 0% state income tax. Includes federal tax, FICA, property tax analysis & cost-of-living. No sign-up.',
    h1: 'Free Texas Tax Calculator',
    metaTitle: 'Free Texas Tax Calculator 2026 | 0% Income Tax',
    metaDesc:
      'Free Texas tax calculator 2026. Take-home pay with 0% state tax. Property tax & cost-of-living analysis. No sign-up required.',
    keywords: [
      'free Texas tax calculator', 'Texas tax calculator', 'TX paycheck calculator',
      'Texas no income tax', 'Texas take home pay', 'Texas salary calculator',
      'Texas property tax', 'Texas cost of living',
      'free tax calculator for 2026', 'TX state tax 2026',
    ],
    componentKey: 'texas',
    category: 'paycheck',
    breadcrumbLabel: 'Texas',
    ogTitle: 'Free Texas Tax Calculator 2026 — 0% State Income Tax',
    ogDescription:
      'Free Texas tax calculator. Take-home pay with 0% state tax. Property tax & cost-of-living. No sign-up.',
    canonicalPath: '/texas-tax-calculator',
    jsonLdType: 'texas',
  },
  {
    slug: 'florida-tax-calculator',
    title: 'Free Florida Tax Calculator 2026 — 0% State Income Tax',
    description:
      'Free Florida tax calculator for 2026. Calculate take-home pay with 0% state income tax. Includes homestead exemption, property tax & cost-of-living. No sign-up.',
    h1: 'Free Florida Tax Calculator',
    metaTitle: 'Free Florida Tax Calculator 2026 | 0% Income Tax',
    metaDesc:
      'Free Florida tax calculator 2026. Take-home pay with 0% state tax & homestead exemption. No sign-up. Property tax info included.',
    keywords: [
      'free Florida tax calculator', 'Florida tax calculator', 'FL paycheck calculator',
      'Florida no income tax', 'Florida take home pay', 'Florida salary calculator',
      'Florida homestead exemption', 'Florida property tax',
      'free tax calculator for 2026', 'FL state tax 2026',
    ],
    componentKey: 'florida',
    category: 'paycheck',
    breadcrumbLabel: 'Florida',
    ogTitle: 'Free Florida Tax Calculator 2026 — 0% State Income Tax',
    ogDescription:
      'Free Florida tax calculator. Take-home pay with 0% state tax & homestead exemption. No sign-up.',
    canonicalPath: '/florida-tax-calculator',
    jsonLdType: 'florida',
  },
  {
    slug: 'california-tax-calculator',
    title: 'Free California Tax Calculator 2026 — 1% to 13.3% Progressive',
    description:
      'Free California tax calculator for 2026. Calculate take-home pay after progressive state tax (1%–13.3%), federal tax & FICA. No sign-up. 401(k) and HSA deductions.',
    h1: 'Free California Tax Calculator',
    metaTitle: 'Free California Tax Calculator 2026 | 1-13.3%',
    metaDesc:
      'Free California tax calculator 2026. Take-home pay after progressive tax (1%–13.3%). No sign-up. 401(k) and HSA included.',
    keywords: [
      'free California tax calculator', 'California tax calculator', 'CA paycheck calculator',
      'California income tax', 'California 13.3% tax', 'California take home pay',
      'California salary calculator', 'CA progressive tax',
      'free tax calculator for 2026', 'California state tax 2026',
    ],
    componentKey: 'california',
    category: 'paycheck',
    breadcrumbLabel: 'California',
    ogTitle: 'Free California Tax Calculator 2026 — Progressive 1%–13.3%',
    ogDescription:
      'Free California tax calculator. Take-home pay after progressive tax (1%–13.3%). No sign-up. 2026 data.',
    canonicalPath: '/california-tax-calculator',
    jsonLdType: 'california',
  },
  {
    slug: 'new-york-tax-calculator',
    title: 'Free New York Tax Calculator 2026 — 4% to 10.9% + NYC Tax',
    description:
      'Free New York tax calculator for 2026. Calculate take-home pay after progressive state tax (4%–10.9%), NYC tax, federal tax & FICA. No sign-up.',
    h1: 'Free New York Tax Calculator',
    metaTitle: 'Free NY Tax Calculator 2026 | NYC Tax Included',
    metaDesc:
      'Free New York tax calculator 2026. Take-home pay after state tax (4%–10.9%) & NYC tax. No sign-up. 401(k) included.',
    keywords: [
      'free New York tax calculator', 'free tax calculator new york', 'free tax calculator nyc',
      'NY paycheck calculator', 'New York income tax', 'NYC tax calculator',
      'New York take home pay', 'New York salary calculator',
      'NY progressive tax', 'free tax calculator for 2026', 'New York state tax 2026',
    ],
    componentKey: 'newyork',
    category: 'paycheck',
    breadcrumbLabel: 'New York',
    ogTitle: 'Free New York Tax Calculator 2026 — State & NYC Tax',
    ogDescription:
      'Free New York tax calculator. Take-home pay after state tax (4%–10.9%) & NYC tax. No sign-up. 2026 data.',
    canonicalPath: '/new-york-tax-calculator',
    jsonLdType: 'newyork',
  },
  {
    slug: 'mortgage-calculator',
    title: 'Free Mortgage Calculator 2026 — Monthly Payment & Amortization',
    description:
      'Free mortgage calculator with extra payments, amortization schedule, and payoff comparison. Calculate monthly payment using M = P × [r(1+r)^n] / [(1+r)^n - 1]. No sign-up.',
    h1: 'Free Mortgage Calculator',
    metaTitle: 'Free Mortgage Calculator 2026 | Amortization',
    metaDesc:
      'Free mortgage calculator with extra payments, amortization & payoff comparison. No sign-up. Calculate monthly payment and interest.',
    keywords: [
      'free mortgage calculator', 'mortgage calculator', 'home loan calculator',
      'amortization calculator', 'mortgage payment calculator',
      'extra payment calculator', 'mortgage payoff',
      'monthly mortgage payment', 'mortgage interest calculator',
    ],
    componentKey: 'mortgage',
    category: 'mortgage',
    breadcrumbLabel: 'Mortgage',
    ogTitle: 'Free Mortgage Calculator 2026 — Amortization & Extra Payments',
    ogDescription:
      'Free mortgage calculator. Monthly payment, amortization & extra payment savings. No sign-up.',
    canonicalPath: '/mortgage-calculator',
    jsonLdType: 'mortgage',
  },
  {
    slug: '401k-retirement-calculator',
    title: 'Free 401(k) Retirement Calculator 2026 — Projection & Growth',
    description:
      'Free 401(k) retirement calculator for 2026. Project your balance with employer match, compound growth & annual contributions. No sign-up. Visual charts included.',
    h1: 'Free 401(k) Calculator',
    metaTitle: 'Free 401(k) Calculator 2026 | Projections',
    metaDesc:
      'Free 401(k) calculator 2026. Project balance with employer match & compound growth. No sign-up. Visual charts included.',
    keywords: [
      'free 401k calculator', '401k calculator', 'retirement calculator', '401k projection',
      'retirement savings calculator', '401k growth calculator', 'employer match calculator',
      'retirement planning', 'compound growth calculator', 'free tax calculator for 2026',
    ],
    componentKey: 'retirement',
    category: 'retirement',
    breadcrumbLabel: '401(k)',
    ogTitle: 'Free 401(k) Calculator 2026 — Projection & Compound Growth',
    ogDescription:
      'Free 401(k) calculator. Project balance with employer match & compound growth. No sign-up.',
    canonicalPath: '/401k-retirement-calculator',
    jsonLdType: 'retirement',
  },
  {
    slug: 'relocation-calculator',
    title: 'Free Relocation Calculator 2026 — Compare Take-Home Pay by State',
    description:
      'Free relocation salary calculator for 2026. Compare take-home pay in IL, TX, FL, CA, NY. Find the salary you need to maintain your lifestyle. No sign-up.',
    h1: 'Free Relocation Calculator',
    metaTitle: 'Free Relocation Calculator 2026 | Compare States',
    metaDesc:
      'Free relocation calculator 2026. Compare take-home pay in IL, TX, FL, CA, NY. No sign-up. Find equivalent salary by state.',
    keywords: [
      'free relocation calculator', 'relocation calculator', 'salary comparison by state',
      'cost of living calculator', 'move calculator', 'salary equivalent calculator',
      'state tax comparison', 'relocation salary calculator',
      'moving salary calculator', 'free tax calculator for 2026',
    ],
    componentKey: 'relocation',
    category: 'paycheck',
    breadcrumbLabel: 'Relocate',
    ogTitle: 'Free Relocation Calculator 2026 — Compare Take-Home Pay',
    ogDescription:
      'Free relocation calculator. Compare take-home pay in IL, TX, FL, CA, NY. No sign-up.',
    canonicalPath: '/relocation-calculator',
    jsonLdType: 'relocation',
  },
  {
    slug: 'capital-gains-calculator',
    title: 'Free Capital Gains Tax Calculator 2026 — Short & Long-Term Rates',
    description:
      'Free capital gains tax calculator for 2026. Calculate short-term (up to 37%) and long-term (0%, 15%, 20% + 3.8% NIIT) rates. No sign-up. Strategies included.',
    h1: 'Free Capital Gains Calculator',
    metaTitle: 'Free Capital Gains Calculator 2026 | Short & Long',
    metaDesc:
      'Free capital gains tax calculator 2026. Short-term (up to 37%) & long-term (0%/15%/20% + NIIT). No sign-up.',
    keywords: [
      'free capital gains calculator', 'capital gains calculator', 'capital gains tax',
      'long term capital gains', 'short term capital gains', 'NIIT calculator',
      'investment tax calculator', 'stock tax calculator', 'crypto tax calculator',
      'free tax calculator for 2026',
    ],
    componentKey: 'capital-gains',
    category: 'investment',
    breadcrumbLabel: 'Capital Gains',
    ogTitle: 'Free Capital Gains Calculator 2026 — Short & Long-Term',
    ogDescription:
      'Free capital gains calculator. Short-term up to 37%, long-term 0%/15%/20% + NIIT. No sign-up.',
    canonicalPath: '/capital-gains-calculator',
    jsonLdType: 'capital-gains',
  },
  {
    slug: 'self-employment-tax-calculator',
    title: 'Free Self-Employment Tax Calculator 2026 — 15.3% SE Tax + 1099',
    description:
      'Free self-employment tax calculator for 2026. Calculate SE tax (15.3% on 92.35% of net income), half deduction, quarterly estimates, 1099 & federal + state tax. No sign-up.',
    h1: 'Free Self-Employment Tax Calculator',
    metaTitle: 'Free SE Tax Calculator 2026 | 1099 & Self-Employed',
    metaDesc:
      'Free self-employment tax calculator 2026. 15.3% SE tax, 1099, quarterly estimates & half deduction. No sign-up required.',
    keywords: [
      'free self employment tax calculator', 'free tax calculator for self employed',
      'free tax calculator for 1099', 'SE tax calculator', 'self employed tax',
      '15.3% self employment tax', 'quarterly estimated tax', 'freelance tax calculator',
      '1099 tax calculator', 'self employment tax rate 2026',
      'free tax calculator for 2026',
    ],
    componentKey: 'self-employment',
    category: 'business',
    breadcrumbLabel: 'Self-Employment',
    ogTitle: 'Free SE Tax Calculator 2026 — 1099 & Self-Employed',
    ogDescription:
      'Free self-employment tax calculator. 15.3% SE tax, 1099, quarterly estimates & half deduction. No sign-up.',
    canonicalPath: '/self-employment-tax-calculator',
    jsonLdType: 'self-employment',
  },
  {
    slug: 'tax-refund-calculator',
    title: 'Free Tax Refund Calculator 2026 — Estimate Your Federal & State Refund',
    description:
      'Free tax refund calculator for 2026. Estimate your federal and state tax refund based on income, withholding, deductions, and credits. No sign-up required.',
    h1: 'Free Tax Refund Calculator',
    metaTitle: 'Free Tax Refund Calculator 2026 | Federal & State Estimate',
    metaDesc:
      'Free tax refund calculator 2026. Estimate your federal and state refund based on income, withholding, deductions & credits. No sign-up required.',
    keywords: [
      'free tax refund calculator', 'tax refund calculator', 'tax refund calculator 2026',
      'free tax calculator for 2026', 'free tax estimator with deductions',
      'tax return calculator', 'federal refund calculator', 'state tax refund calculator',
      'free tax calculator federal and state', 'tax refund estimator',
      'free tax calculator with dependents', 'irs refund calculator',
      'free tax refund calculator 2026', 'tax refund calculator with itemized deductions',
      'child tax credit calculator', 'earned income credit calculator',
    ],
    componentKey: 'tax-refund',
    category: 'paycheck',
    breadcrumbLabel: 'Tax Refund Calculator',
    ogTitle: 'Free Tax Refund Calculator 2026 — Estimate Your Refund',
    ogDescription:
      'Free tax refund calculator 2026. Estimate your federal and state refund. No sign-up required.',
    canonicalPath: '/tax-refund-calculator',
    jsonLdType: 'tax-refund',
  },
];

/** Map from componentKey (old hash key) to slug (new route) */
export const COMPONENT_KEY_TO_SLUG: Record<string, string> = Object.fromEntries(
  CALCULATOR_ROUTES.map((r) => [r.componentKey, r.slug])
);

/** Map from slug to config */
export const SLUG_TO_CONFIG: Record<string, CalculatorRouteConfig> = Object.fromEntries(
  CALCULATOR_ROUTES.map((r) => [r.slug, r])
);

/** Get all slugs for generateStaticParams */
export function getCalculatorSlugs(): string[] {
  return CALCULATOR_ROUTES.map((r) => r.slug);
}
