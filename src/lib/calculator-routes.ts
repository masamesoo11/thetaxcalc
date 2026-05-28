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
      'Instantly calculate your take-home pay after federal tax, FICA (Social Security + Medicare), and state income tax. Supports IL, TX, FL, CA, NY with 401(k) and HSA deductions.',
    h1: 'Paycheck Calculator',
    metaTitle: 'Free 2026 Paycheck Calculator | Federal, FICA & State Tax',
    metaDesc:
      'Calculate your take-home pay after federal tax, FICA, and state taxes. Free 2026 paycheck calculator supports IL, TX, FL, CA, NY. Includes 401(k) and HSA deductions.',
    keywords: [
      'paycheck calculator', 'take home pay calculator', 'salary calculator',
      'after tax salary', 'net pay calculator', '2026 paycheck calculator',
      'FICA calculator', 'federal tax calculator',
    ],
    componentKey: 'home',
    category: 'paycheck',
    breadcrumbLabel: 'Paycheck Calculator',
    ogTitle: 'Free 2026 Paycheck Calculator — Take-Home Pay After All Taxes',
    ogDescription:
      'Compute your take-home pay after federal, FICA, and state taxes for IL, TX, FL, CA, NY. Mortgage, 401(k), capital gains calculators included.',
    canonicalPath: '/paycheck-calculator',
    jsonLdType: 'home',
  },
  {
    slug: 'illinois-tax-calculator',
    title: 'Illinois Paycheck Calculator 2026 — 4.95% Flat Tax',
    description:
      'Calculate your Illinois take-home pay after 4.95% flat state income tax, $2,775 personal exemption, federal tax, and FICA. Free IL paycheck calculator for 2026.',
    h1: 'Illinois Paycheck Calculator',
    metaTitle: 'Illinois Paycheck Calculator 2026 | 4.95% Flat Tax',
    metaDesc:
      'Calculate Illinois take-home pay after 4.95% flat tax, $2,775 personal exemption, federal tax, and FICA. Free 2026 IL paycheck calculator with 401(k) and HSA.',
    keywords: [
      'Illinois tax calculator', 'IL paycheck calculator', 'Illinois income tax',
      'Illinois 4.95% tax', 'Illinois take home pay', 'Illinois personal exemption',
      'Illinois salary calculator', 'IL state tax 2026',
    ],
    componentKey: 'illinois',
    category: 'paycheck',
    breadcrumbLabel: 'Illinois',
    ogTitle: 'Illinois Paycheck Calculator 2026 — 4.95% Flat Tax Rate',
    ogDescription:
      'Calculate your Illinois take-home pay after 4.95% flat state tax and $2,775 personal exemption. Free 2026 IL paycheck calculator.',
    canonicalPath: '/illinois-tax-calculator',
    jsonLdType: 'illinois',
  },
  {
    slug: 'texas-tax-calculator',
    title: 'Texas Paycheck Calculator 2026 — 0% State Income Tax',
    description:
      'Calculate your Texas take-home pay with 0% state income tax. Includes federal tax, FICA, property tax burden analysis, and cost-of-living comparison. Free TX calculator for 2026.',
    h1: 'Texas Paycheck Calculator',
    metaTitle: 'Texas Paycheck Calculator 2026 | 0% Income Tax',
    metaDesc:
      'Calculate Texas take-home pay with 0% state income tax. Free 2026 TX paycheck calculator includes property tax analysis and cost-of-living comparison.',
    keywords: [
      'Texas tax calculator', 'TX paycheck calculator', 'Texas no income tax',
      'Texas take home pay', 'Texas salary calculator', 'Texas property tax',
      'Texas cost of living', 'TX state tax 2026',
    ],
    componentKey: 'texas',
    category: 'paycheck',
    breadcrumbLabel: 'Texas',
    ogTitle: 'Texas Paycheck Calculator 2026 — 0% State Income Tax',
    ogDescription:
      'Calculate your Texas take-home pay with 0% state income tax. Free 2026 TX calculator includes property tax and cost-of-living analysis.',
    canonicalPath: '/texas-tax-calculator',
    jsonLdType: 'texas',
  },
  {
    slug: 'florida-tax-calculator',
    title: 'Florida Paycheck Calculator 2026 — 0% State Income Tax',
    description:
      'Calculate your Florida take-home pay with 0% state income tax. Includes federal tax, FICA, homestead exemption, and cost-of-living analysis. Free FL calculator for 2026.',
    h1: 'Florida Paycheck Calculator',
    metaTitle: 'Florida Paycheck Calculator 2026 | 0% Income Tax',
    metaDesc:
      'Calculate Florida take-home pay with 0% state income tax and homestead exemption. Free 2026 FL paycheck calculator includes cost-of-living analysis.',
    keywords: [
      'Florida tax calculator', 'FL paycheck calculator', 'Florida no income tax',
      'Florida take home pay', 'Florida salary calculator', 'Florida homestead exemption',
      'Florida property tax', 'FL state tax 2026',
    ],
    componentKey: 'florida',
    category: 'paycheck',
    breadcrumbLabel: 'Florida',
    ogTitle: 'Florida Paycheck Calculator 2026 — 0% State Income Tax',
    ogDescription:
      'Calculate your Florida take-home pay with 0% state income tax. Free 2026 FL calculator includes homestead exemption and cost-of-living analysis.',
    canonicalPath: '/florida-tax-calculator',
    jsonLdType: 'florida',
  },
  {
    slug: 'california-tax-calculator',
    title: 'California Paycheck Calculator 2026 — 1% to 13.3% Progressive Tax',
    description:
      'Calculate your California take-home pay after progressive state income tax (1%–13.3%), federal tax, and FICA. Free CA paycheck calculator for 2026 with 401(k) and HSA.',
    h1: 'California Paycheck Calculator',
    metaTitle: 'California Paycheck Calculator 2026 | 1%-13.3% Tax',
    metaDesc:
      'Calculate California take-home pay after progressive state tax (1%–13.3%). Free 2026 CA paycheck calculator with federal tax, FICA, 401(k), and HSA deductions.',
    keywords: [
      'California tax calculator', 'CA paycheck calculator', 'California income tax',
      'California 13.3% tax', 'California take home pay', 'California salary calculator',
      'CA progressive tax', 'California state tax 2026',
    ],
    componentKey: 'california',
    category: 'paycheck',
    breadcrumbLabel: 'California',
    ogTitle: 'California Paycheck Calculator 2026 — Progressive Tax 1% to 13.3%',
    ogDescription:
      'Calculate your California take-home pay after progressive state tax (1%–13.3%). Free 2026 CA paycheck calculator.',
    canonicalPath: '/california-tax-calculator',
    jsonLdType: 'california',
  },
  {
    slug: 'new-york-tax-calculator',
    title: 'New York Paycheck Calculator 2026 — 4% to 10.9% + NYC Tax',
    description:
      'Calculate your New York take-home pay after progressive state tax (4%–10.9%), potential NYC tax, federal tax, and FICA. Free NY paycheck calculator for 2026.',
    h1: 'New York Paycheck Calculator',
    metaTitle: 'New York Paycheck Calculator 2026 | 4%-10.9% + NYC Tax',
    metaDesc:
      'Calculate New York take-home pay after progressive state tax (4%–10.9%) and NYC tax. Free 2026 NY paycheck calculator with federal tax, FICA, and 401(k).',
    keywords: [
      'New York tax calculator', 'NY paycheck calculator', 'New York income tax',
      'NYC tax calculator', 'New York take home pay', 'New York salary calculator',
      'NY progressive tax', 'New York state tax 2026',
    ],
    componentKey: 'newyork',
    category: 'paycheck',
    breadcrumbLabel: 'New York',
    ogTitle: 'New York Paycheck Calculator 2026 — State Tax 4% to 10.9% + NYC Tax',
    ogDescription:
      'Calculate your New York take-home pay after progressive state tax (4%–10.9%) and potential NYC tax. Free 2026 NY calculator.',
    canonicalPath: '/new-york-tax-calculator',
    jsonLdType: 'newyork',
  },
  {
    slug: 'mortgage-calculator',
    title: 'Mortgage Calculator 2026 — Monthly Payment & Amortization',
    description:
      'Free mortgage calculator with extra payments, amortization schedule, and payoff comparison. Calculate monthly payment using M = P × [r(1+r)^n] / [(1+r)^n - 1].',
    h1: 'Mortgage Calculator',
    metaTitle: 'Free Mortgage Calculator 2026 | Amortization & Extra Payments',
    metaDesc:
      'Free mortgage calculator with extra payments, full amortization schedule, and payoff comparison. Calculate monthly payment, total interest, and years saved.',
    keywords: [
      'mortgage calculator', 'home loan calculator', 'amortization calculator',
      'mortgage payment calculator', 'extra payment calculator', 'mortgage payoff',
      'monthly mortgage payment', 'mortgage interest calculator',
    ],
    componentKey: 'mortgage',
    category: 'mortgage',
    breadcrumbLabel: 'Mortgage',
    ogTitle: 'Free Mortgage Calculator 2026 — Amortization & Extra Payments',
    ogDescription:
      'Calculate your monthly mortgage payment, total interest, and payoff timeline. Free calculator with extra payment savings analysis.',
    canonicalPath: '/mortgage-calculator',
    jsonLdType: 'mortgage',
  },
  {
    slug: '401k-retirement-calculator',
    title: '401(k) Retirement Calculator 2026 — Projection & Growth',
    description:
      'Project your 401(k) balance at retirement with employer match, compound growth, and annual contributions. Free retirement calculator for 2026 with visual charts.',
    h1: '401(k) Retirement Calculator',
    metaTitle: '401(k) Retirement Calculator 2026 | Projection & Growth',
    metaDesc:
      'Project your 401(k) balance at retirement with employer match and compound growth. Free 2026 retirement calculator with visual projection charts.',
    keywords: [
      '401k calculator', 'retirement calculator', '401k projection',
      'retirement savings calculator', '401k growth calculator', 'employer match calculator',
      'retirement planning', 'compound growth calculator',
    ],
    componentKey: 'retirement',
    category: 'retirement',
    breadcrumbLabel: '401(k)',
    ogTitle: '401(k) Retirement Calculator 2026 — Projection & Compound Growth',
    ogDescription:
      'Project your 401(k) balance with employer match and compound growth. Free retirement calculator with visual charts.',
    canonicalPath: '/401k-retirement-calculator',
    jsonLdType: 'retirement',
  },
  {
    slug: 'relocation-calculator',
    title: 'Salary Relocation Calculator 2026 — Compare Take-Home Pay by State',
    description:
      'Calculate equivalent salary between states. Compare take-home pay in IL, TX, FL, CA, NY to find the salary you need to maintain your lifestyle after relocation.',
    h1: 'Salary Relocation Calculator',
    metaTitle: 'Salary Relocation Calculator 2026 | Compare Pay by State',
    metaDesc:
      'Calculate equivalent salary between states. Compare take-home pay in IL, TX, FL, CA, NY. Free relocation calculator to find your needed salary after moving.',
    keywords: [
      'relocation calculator', 'salary comparison by state', 'cost of living calculator',
      'move calculator', 'salary equivalent calculator', 'state tax comparison',
      'relocation salary calculator', 'moving salary calculator',
    ],
    componentKey: 'relocation',
    category: 'paycheck',
    breadcrumbLabel: 'Relocate',
    ogTitle: 'Salary Relocation Calculator 2026 — Compare Take-Home Pay by State',
    ogDescription:
      'Calculate equivalent salary between states. Free relocation calculator compares IL, TX, FL, CA, NY take-home pay.',
    canonicalPath: '/relocation-calculator',
    jsonLdType: 'relocation',
  },
  {
    slug: 'capital-gains-calculator',
    title: 'Capital Gains Tax Calculator 2026 — Short & Long-Term Rates',
    description:
      'Calculate capital gains tax: short-term (ordinary income rates up to 37%) and long-term (0%, 15%, 20% + 3.8% NIIT). Free 2026 capital gains calculator with FAQ.',
    h1: 'Capital Gains Tax Calculator',
    metaTitle: 'Capital Gains Tax Calculator 2026 | Short & Long-Term',
    metaDesc:
      'Calculate capital gains tax for 2026. Short-term (up to 37%) and long-term (0%/15%/20% + NIIT). Free calculator with tax-saving strategies and FAQ.',
    keywords: [
      'capital gains calculator', 'capital gains tax', 'long term capital gains',
      'short term capital gains', 'NIIT calculator', 'investment tax calculator',
      'stock tax calculator', 'crypto tax calculator',
    ],
    componentKey: 'capital-gains',
    category: 'investment',
    breadcrumbLabel: 'Capital Gains',
    ogTitle: 'Capital Gains Tax Calculator 2026 — Short & Long-Term Rates',
    ogDescription:
      'Calculate your capital gains tax: short-term up to 37%, long-term 0%/15%/20% + NIIT. Free 2026 calculator with strategies.',
    canonicalPath: '/capital-gains-calculator',
    jsonLdType: 'capital-gains',
  },
  {
    slug: 'self-employment-tax-calculator',
    title: 'Self-Employment Tax Calculator 2026 — 15.3% SE Tax + Deductions',
    description:
      'Calculate self-employment tax (15.3% on 92.35% of net income), deductible half, quarterly estimates, and federal + state income tax. Free 2026 SE calculator.',
    h1: 'Self-Employment Tax Calculator',
    metaTitle: 'Self-Employment Tax Calculator 2026 | 15.3% SE Tax',
    metaDesc:
      'Calculate self-employment tax at 15.3% on 92.35% of net income. Free 2026 SE calculator includes half deduction, quarterly estimates, and state tax.',
    keywords: [
      'self employment tax calculator', 'SE tax calculator', 'self employed tax',
      '15.3% self employment tax', 'quarterly estimated tax', 'freelance tax calculator',
      '1099 tax calculator', 'self employment tax rate 2026',
    ],
    componentKey: 'self-employment',
    category: 'business',
    breadcrumbLabel: 'Self-Employment',
    ogTitle: 'Self-Employment Tax Calculator 2026 — 15.3% SE Tax Rate',
    ogDescription:
      'Calculate self-employment tax at 15.3%. Free 2026 SE calculator includes half deduction, quarterly estimates, and state tax.',
    canonicalPath: '/self-employment-tax-calculator',
    jsonLdType: 'self-employment',
  },
  {
    slug: 'sales-tax-calculator',
    title: 'Sales Tax Calculator 2026 — Calculate Sales Tax by State',
    description:
      'Free sales tax calculator. Calculate sales tax for any US state with local rates. Includes reverse sales tax calculator to find original price from total.',
    h1: 'Sales Tax Calculator',
    metaTitle: 'Free Sales Tax Calculator 2026 | All 50 States + Reverse',
    metaDesc:
      'Calculate sales tax for any US state. Free 2026 sales tax calculator with all 50 states, local rates, and reverse tax calculator. Find original price from total.',
    keywords: [
      'sales tax calculator', 'calculate sales tax', 'sales tax by state',
      'reverse sales tax calculator', 'sales tax rate', 'state sales tax',
      'tax on purchase calculator',
    ],
    componentKey: 'sales-tax',
    category: 'paycheck' as const,
    breadcrumbLabel: 'Sales Tax',
    ogTitle: 'Free Sales Tax Calculator 2026 — All 50 States + Reverse',
    ogDescription:
      'Calculate sales tax for any US state with local rates. Free calculator includes reverse tax lookup.',
    canonicalPath: '/sales-tax-calculator',
    jsonLdType: 'sales-tax',
  },
  {
    slug: 'income-tax-calculator',
    title: 'Free Income Tax Calculator 2026 — Federal & State Income Tax',
    description:
      'Calculate your income tax for 2026. Free income tax calculator with federal brackets, state taxes for IL, TX, FL, CA, NY, FICA, and standard deductions. Estimate your tax liability.',
    h1: 'Income Tax Calculator',
    metaTitle: 'Free Income Tax Calculator 2026 | Federal & State Tax',
    metaDesc:
      'Calculate your 2026 income tax with federal brackets, FICA, and state taxes for IL, TX, FL, CA, NY. Free income tax calculator with standard deductions and 401(k).',
    keywords: [
      'income tax calculator', 'federal income tax calculator', 'state income tax calculator',
      'income tax estimator', 'tax liability calculator', '2026 income tax', 'income tax brackets',
    ],
    componentKey: 'home',
    category: 'paycheck' as const,
    breadcrumbLabel: 'Income Tax',
    ogTitle: 'Free Income Tax Calculator 2026 — Federal & State Tax',
    ogDescription:
      'Calculate your 2026 income tax with federal brackets and state taxes. Free calculator for IL, TX, FL, CA, NY.',
    canonicalPath: '/income-tax-calculator',
    jsonLdType: 'income-tax',
  },
  {
    slug: 'tax-calculator',
    title: 'Free Tax Calculator 2026 — Federal, State & FICA Tax Estimator',
    description:
      'Free tax calculator for 2026. Estimate your federal tax, state tax, FICA, and take-home pay. Supports all filing statuses and 5 state tax profiles. Accurate 2026 brackets.',
    h1: 'Tax Calculator',
    metaTitle: 'Free Tax Calculator 2026 | Federal, State & FICA Tax',
    metaDesc:
      'Free 2026 tax calculator. Estimate federal tax, FICA, and state taxes for IL, TX, FL, CA, NY. Includes 401(k) and HSA deductions. Accurate 2026 tax brackets.',
    keywords: [
      'tax calculator', 'federal tax calculator', 'tax estimator',
      '2026 tax calculator', 'tax bracket calculator', 'tax withholding calculator', 'free tax calculator',
    ],
    componentKey: 'home',
    category: 'paycheck' as const,
    breadcrumbLabel: 'Tax Calculator',
    ogTitle: 'Free Tax Calculator 2026 — Federal, State & FICA',
    ogDescription:
      'Estimate your 2026 tax with federal brackets, FICA, and state taxes. Free calculator for IL, TX, FL, CA, NY.',
    canonicalPath: '/tax-calculator',
    jsonLdType: 'tax-calc',
  },
  {
    slug: 'tax-refund-calculator',
    title: 'Tax Refund Calculator 2026 — Estimate Your Federal & State Refund',
    description: 'Free tax refund calculator for 2026. Estimate your federal and state tax refund or amount owed. Includes standard/itemized deductions, child tax credit, and EIC.',
    h1: 'Tax Refund Calculator',
    metaTitle: 'Free Tax Refund Calculator 2026 | Federal & State Refund',
    metaDesc: 'Estimate your 2026 tax refund or amount owed. Free calculator with federal and state refund estimates, standard/itemized deductions, and child tax credit.',
    keywords: ['tax refund calculator', 'tax refund estimator', 'tax return calculator', 'federal refund calculator', 'state refund calculator', '2026 tax refund', 'tax refund estimate'],
    componentKey: 'tax-refund',
    category: 'paycheck' as const,
    breadcrumbLabel: 'Tax Refund',
    ogTitle: 'Free Tax Refund Calculator 2026 — Federal & State Refund',
    ogDescription: 'Estimate your 2026 federal and state tax refund. Free calculator with deductions and credits.',
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
