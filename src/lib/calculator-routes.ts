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
    metaTitle: 'Paycheck Tax Calculator 2026 — Federal & State',
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
    metaTitle: 'Florida Tax Calculator 2026 | 0% Income Tax',
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
    metaTitle: 'Relocation Calculator 2026 | Compare States',
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
    metaTitle: 'Capital Gains Calculator 2026 | Short & Long',
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
    metaTitle: 'SE Tax Calculator 2026 | 1099 & Self-Employed',
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
    slug: 'sales-tax-calculator',
    title: 'Free Sales Tax Calculator 2026 — All 50 States & Reverse Tax',
    description:
      'Free sales tax calculator for 2026. Calculate sales tax for any US state with combined rates. Includes reverse sales tax calculator. No sign-up required.',
    h1: 'Free Sales Tax Calculator',
    metaTitle: 'Sales Tax Calculator 2026 | 50 States & Reverse',
    metaDesc:
      'Free sales tax calculator 2026. Calculate sales tax for any US state with combined rates. Includes reverse calculator. No sign-up required.',
    keywords: [
      'free sales tax calculator', 'sales tax calculator', 'reverse sales tax calculator',
      'sales tax by state', 'calculate sales tax', 'sales tax rate',
      'state sales tax rates 2026', 'sales tax percentage', 'combined sales tax rate',
      'free tax calculator for 2026', 'online sales tax calculator',
    ],
    componentKey: 'sales-tax',
    category: 'paycheck',
    breadcrumbLabel: 'Sales Tax Calculator',
    ogTitle: 'Free Sales Tax Calculator 2026 — All 50 States & Reverse',
    ogDescription:
      'Free sales tax calculator 2026. Calculate sales tax for any US state with combined rates. Includes reverse calculator. No sign-up.',
    canonicalPath: '/sales-tax-calculator',
    jsonLdType: 'sales-tax',
  },
  {
    slug: 'tax-refund-calculator',
    title: 'Free Tax Refund Calculator 2026 — Estimate Your Federal & State Refund',
    description:
      'Free tax refund calculator for 2026. Estimate your federal and state tax refund based on income, withholding, deductions, and credits. No sign-up required.',
    h1: 'Free Tax Refund Calculator',
    metaTitle: 'Tax Refund Calculator 2026 | Federal & State',
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
  {
    slug: 'overtime-tax-calculator',
    title: 'Free Overtime Tax Calculator 2026 — After-Tax OT Pay',
    description:
      'Free overtime tax calculator for 2026. Calculate your after-tax overtime pay at 1.5x rate. See how much OT you actually keep after federal, FICA & state taxes. No sign-up.',
    h1: 'Free Overtime Tax Calculator',
    metaTitle: 'Overtime Tax Calculator 2026 | After-Tax OT',
    metaDesc:
      'Free overtime tax calculator 2026. Calculate after-tax overtime pay at 1.5x rate. Federal, FICA & state taxes included. No sign-up required.',
    keywords: [
      'free overtime tax calculator', 'overtime tax calculator', 'overtime pay calculator',
      'overtime calculator 2026', 'after tax overtime pay', 'overtime tax rate',
      '1.5x overtime calculator', 'time and a half calculator', 'overtime take home pay',
      'how much overtime is taxed', 'no tax on overtime calculator', 'free tax calculator for 2026',
    ],
    componentKey: 'overtime',
    category: 'paycheck',
    breadcrumbLabel: 'Overtime Tax',
    ogTitle: 'Free Overtime Tax Calculator 2026 — After-Tax OT Pay',
    ogDescription:
      'Free overtime tax calculator 2026. Calculate after-tax overtime pay. Federal, FICA & state taxes. No sign-up.',
    canonicalPath: '/overtime-tax-calculator',
    jsonLdType: 'overtime',
  },
  {
    slug: 'georgia-tax-calculator',
    title: 'Georgia Paycheck Calculator 2026 — See Your Take-Home After 5.49% Tax',
    description:
      'How much do you keep after Georgia 5.49% flat tax? Calculate your 2026 take-home pay after state, federal & FICA taxes. Instant results, no sign-up.',
    h1: 'Free Georgia Tax Calculator',
    metaTitle: 'Georgia Paycheck Calculator 2026 | After 5.49%',
    metaDesc:
      'How much do you keep after Georgia 5.49% tax? Calculate 2026 take-home pay after state, federal & FICA. Instant results, no sign-up.',
    keywords: [
      'free Georgia tax calculator', 'Georgia tax calculator', 'GA paycheck calculator',
      'Georgia income tax', 'Georgia 5.49% tax', 'Georgia take home pay',
      'Georgia salary calculator', 'Georgia flat tax rate',
      'free tax calculator for 2026', 'GA state tax 2026',
    ],
    componentKey: 'georgia',
    category: 'paycheck',
    breadcrumbLabel: 'Georgia',
    ogTitle: 'Free Georgia Tax Calculator 2026 — 5.49% Flat Tax',
    ogDescription:
      'Free Georgia tax calculator. Take-home pay after 5.49% flat state tax and federal tax. No sign-up. 2026 data.',
    canonicalPath: '/georgia-tax-calculator',
    jsonLdType: 'georgia',
  },
  {
    slug: 'lottery-tax-calculator',
    title: 'Lottery Tax Calculator 2026 — What You REALLY Keep After Taxes',
    description:
      'Surprised how much tax on lottery winnings? 24% federal + state taxes can take 40%+. See your actual payout after all taxes. Free calculator, no sign-up.',
    h1: 'Free Lottery Tax Calculator',
    metaTitle: 'Lottery Tax Calculator 2026 | After-Tax Payout',
    metaDesc:
      'How much tax on lottery winnings? 24% federal + state can take 40%+. See your actual payout after all taxes. Free, no sign-up.',
    keywords: [
      'free lottery tax calculator', 'lottery tax calculator', 'lottery winnings tax',
      'lottery tax rate', 'after tax lottery winnings', 'powerball tax calculator',
      'mega millions tax calculator', 'lottery withholding rate',
      'free tax calculator for 2026', 'lottery payout calculator',
    ],
    componentKey: 'lottery',
    category: 'investment',
    breadcrumbLabel: 'Lottery Tax',
    ogTitle: 'Free Lottery Tax Calculator 2026 — After-Tax Winnings',
    ogDescription:
      'Free lottery tax calculator. After-tax winnings with 24% federal withholding and state taxes. No sign-up.',
    canonicalPath: '/lottery-tax-calculator',
    jsonLdType: 'lottery',
  },
  {
    slug: 'irs-withholding-calculator',
    title: 'Free IRS Withholding Calculator 2026 — W-4 Optimization',
    description:
      'Free IRS withholding calculator for 2026. Optimize your W-4 to avoid owing taxes or overpaying. Based on IRS Publication 15-T. No sign-up.',
    h1: 'Free IRS Withholding Calculator',
    metaTitle: 'IRS Withholding Calculator 2026 | W-4 Help',
    metaDesc:
      'Free IRS withholding calculator 2026. Optimize your W-4 to avoid penalties and overpayment. No sign-up required.',
    keywords: [
      'free IRS withholding calculator', 'IRS withholding calculator', 'W-4 calculator',
      'withholding calculator 2026', 'tax withholding estimator', 'W-4 optimization',
      'paycheck withholding calculator', 'IRS tax withholding',
      'free tax calculator for 2026', 'federal withholding calculator',
      'adjust W-4 allowances', 'IRS Publication 15-T',
    ],
    componentKey: 'irs-withholding',
    category: 'paycheck',
    breadcrumbLabel: 'IRS Withholding',
    ogTitle: 'Free IRS Withholding Calculator 2026 — W-4 Optimization',
    ogDescription:
      'Free IRS withholding calculator. Optimize your W-4 to avoid penalties. No sign-up. 2026 data.',
    canonicalPath: '/irs-withholding-calculator',
    jsonLdType: 'irs-withholding',
  },
  {
    slug: 'property-tax-calculator',
    title: 'Free Property Tax Calculator 2026 — All 50 States',
    description:
      'Free property tax calculator for 2026. Calculate annual property tax for any US state with average effective rates. Includes homestead exemptions. No sign-up.',
    h1: 'Free Property Tax Calculator',
    metaTitle: 'Property Tax Calculator 2026 | 50 States',
    metaDesc:
      'Free property tax calculator 2026. Calculate annual property tax for any US state with effective rates. No sign-up required.',
    keywords: [
      'free property tax calculator', 'property tax calculator', 'property tax by state',
      'home property tax calculator', 'property tax rate', 'property tax estimator',
      'real estate tax calculator', 'annual property tax',
      'free tax calculator for 2026', 'property tax comparison by state',
    ],
    componentKey: 'property-tax',
    category: 'mortgage',
    breadcrumbLabel: 'Property Tax',
    ogTitle: 'Free Property Tax Calculator 2026 — All 50 States',
    ogDescription:
      'Free property tax calculator. Calculate annual property tax for any US state. No sign-up.',
    canonicalPath: '/property-tax-calculator',
    jsonLdType: 'property-tax',
  },
  {
    slug: 'bonus-tax-calculator',
    title: 'Bonus Tax Calculator 2026 — How Much of Your Bonus Do You Keep?',
    description:
      'Your $5K bonus may only be $3,400 after taxes. Compare 22% flat vs aggregate method and see your real take-home. Free, instant, no sign-up.',
    h1: 'Free Bonus Tax Calculator',
    metaTitle: 'Bonus Tax Calculator 2026 | After-Tax Amount',
    metaDesc:
      '$5K bonus → only $3,400 take-home? Compare 22% flat vs aggregate and see your real after-tax bonus. Free, instant.',
    keywords: [
      'free bonus tax calculator', 'bonus tax calculator', 'bonus tax rate',
      'supplemental wage calculator', '22% bonus tax', 'aggregate method bonus',
      'after tax bonus calculator', 'year end bonus tax',
      'free tax calculator for 2026', 'bonus withholding calculator',
    ],
    componentKey: 'bonus-tax',
    category: 'business',
    breadcrumbLabel: 'Bonus Tax',
    ogTitle: 'Free Bonus Tax Calculator 2026 — 22% Flat vs Aggregate',
    ogDescription:
      'Free bonus tax calculator. Compare 22% flat vs aggregate method. No sign-up. 2026 data.',
    canonicalPath: '/bonus-tax-calculator',
    jsonLdType: 'bonus-tax',
  },
  {
    slug: 'virginia-tax-calculator',
    title: 'Virginia Paycheck Calculator 2026 — Take-Home After 2-5.75% Tax',
    description:
      'Calculate your 2026 Virginia take-home pay after progressive state tax (2%–5.75%), federal tax & FICA. See real numbers instantly. No sign-up.',
    h1: 'Free Virginia Tax Calculator',
    metaTitle: 'Virginia Paycheck Calculator 2026 | After 2-5.75%',
    metaDesc:
      'Calculate 2026 Virginia take-home after 2%-5.75% state tax, federal & FICA. See real numbers instantly. No sign-up.',
    keywords: [
      'free Virginia tax calculator', 'Virginia tax calculator', 'VA paycheck calculator',
      'Virginia income tax', 'Virginia 5.75% tax', 'Virginia take home pay',
      'Virginia salary calculator', 'VA progressive tax',
      'free tax calculator for 2026', 'VA state tax 2026',
    ],
    componentKey: 'virginia',
    category: 'paycheck',
    breadcrumbLabel: 'Virginia',
    ogTitle: 'Free Virginia Tax Calculator 2026 — 2%–5.75% Progressive',
    ogDescription:
      'Free Virginia tax calculator. Take-home pay after progressive tax (2%–5.75%). No sign-up. 2026 data.',
    canonicalPath: '/virginia-tax-calculator',
    jsonLdType: 'virginia',
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
