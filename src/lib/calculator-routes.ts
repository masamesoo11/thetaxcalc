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
  snippetAnswer: string;
}

export const CALCULATOR_ROUTES: CalculatorRouteConfig[] = [
  {
    slug: 'paycheck-calculator',
    title: 'Free 2026 Paycheck Calculator — Federal, FICA & State Tax',
    description:
      'Free paycheck tax calculator for 2026. Calculate take-home pay after federal, FICA & state taxes. No sign-up required. Supports IL, TX, FL, CA, NY with 401(k) and HSA deductions.',
    h1: 'Free Paycheck Calculator',
    metaTitle: 'Free Paycheck Calculator 2026 — Estimate Take-Home Pay',
    metaDesc:
      'Free paycheck calculator 2026. Estimate take-home pay after federal, FICA & state taxes. No sign-up. Covers all 50 states. 401(k) & HSA included.',
    keywords: [
      'free paycheck tax calculator', 'free tax calculator for paycheck',
      'free tax calculator federal and state', 'free tax calculator for 2026',
      'take home pay calculator', 'salary calculator',
      'after tax salary', 'net pay calculator', '2026 paycheck calculator',
      'FICA calculator', 'federal tax calculator',
      'free tax calculator no sign up', 'free tax calculator online',
      'free paycheck calculator', 'free tax estimator', 'free wage calculator',
      'free hourly paycheck calculator', 'free payroll calculator hourly',
      'free hourly payroll calculator', 'free online paycheck calculator',
      'free paycheck tax calculator', 'free paycheck estimator',
      'free calculator for paycheck',
    ],
    componentKey: 'home',
    category: 'paycheck',
    breadcrumbLabel: 'Paycheck Calculator',
    ogTitle: 'Paycheck Tax Calculator 2026 — Federal & State Take-Home',
    ogDescription:
      'Free paycheck tax calculator for 2026. Take-home pay after federal, FICA & state taxes. No sign-up. IL, TX, FL, CA, NY.',
    canonicalPath: '/paycheck-calculator',
    jsonLdType: 'home',
    snippetAnswer:
      'Your take-home pay equals gross salary minus federal income tax (10%–37%), FICA (7.65%), and state income tax. Pre-tax deductions like 401(k) and HSA reduce your taxable income. A $75,000 single filer takes home approximately $61,600 in Texas but only $58,000 in Illinois.',
  },
  {
    slug: 'illinois-tax-calculator',
    title: 'Free Illinois Tax Calculator 2026 — 4.95% Flat Tax',
    description:
      'Free Illinois tax calculator for 2026. Calculate take-home pay after 4.95% flat state tax, $2,775 personal exemption, federal tax & FICA. No sign-up.',
    h1: 'Free Illinois Tax Calculator',
    metaTitle: 'Free Illinois Tax Calculator 2026 — 4.95% Flat Rate',
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
    ogTitle: 'Illinois Tax Calculator 2026 — 4.95% Flat Rate',
    ogDescription:
      'Free Illinois tax calculator. Take-home pay after 4.95% flat tax and $2,775 exemption. No sign-up. 2026 data.',
    canonicalPath: '/illinois-tax-calculator',
    jsonLdType: 'illinois',
    snippetAnswer:
      "In Illinois, your take-home pay equals gross salary minus federal tax, FICA (7.65%), and a flat 4.95% state income tax after a $2,775 personal exemption. A $75,000 single filer pays about $3,575 in Illinois state tax. Illinois does not tax Social Security, 401(k), or pension income.",
  },
  {
    slug: 'texas-tax-calculator',
    title: '0% Income Tax — Texas Tax Calculator 2026',
    description:
      'Free Texas tax calculator for 2026. Calculate take-home pay with 0% state income tax. Includes federal tax, FICA, property tax analysis & cost-of-living. No sign-up.',
    h1: 'Free Texas Tax Calculator',
    metaTitle: 'Free Texas Paycheck Calculator 2026 — No State Tax',
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
    ogTitle: '0% Income Tax — Texas Tax Calculator 2026',
    ogDescription:
      'Free Texas tax calculator. Take-home pay with 0% state tax. Property tax & cost-of-living. No sign-up.',
    canonicalPath: '/texas-tax-calculator',
    jsonLdType: 'texas',
    snippetAnswer:
      "In Texas, your take-home pay equals gross salary minus federal income tax and FICA (7.65%) only — Texas has 0% state income tax, guaranteed by the state constitution. A $75,000 single filer takes home approximately $61,600. Property taxes average 1.71%, among the highest in the US.",
  },
  {
    slug: 'florida-tax-calculator',
    title: '0% Income Tax — Florida Tax Calculator 2026',
    description:
      'Free Florida tax calculator for 2026. Calculate take-home pay with 0% state income tax. Includes homestead exemption, property tax & cost-of-living. No sign-up.',
    h1: 'Free Florida Tax Calculator',
    metaTitle: 'Free Florida Paycheck Calculator 2026 — No State Tax',
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
    ogTitle: '0% Income Tax — Florida Tax Calculator 2026',
    ogDescription:
      'Free Florida tax calculator. Take-home pay with 0% state tax & homestead exemption. No sign-up.',
    canonicalPath: '/florida-tax-calculator',
    jsonLdType: 'florida',
    snippetAnswer:
      "In Florida, your take-home pay equals gross salary minus federal income tax and FICA (7.65%) only — Florida has 0% state income tax. A $75,000 single filer takes home approximately $61,600. Florida property taxes average just 0.86% with a Homestead Exemption up to $50,000.",
  },
  {
    slug: 'california-tax-calculator',
    title: 'California Tax Calculator 2026 | 1-13.3% Progressive',
    description:
      'Free California tax calculator for 2026. Calculate take-home pay after progressive state tax (1%–13.3%), federal tax & FICA. No sign-up. 401(k) and HSA deductions.',
    h1: 'Free California Tax Calculator',
    metaTitle: 'Free California Tax Calculator 2026 — 1% to 13.3%',
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
    ogTitle: 'California Tax Calculator 2026 — Progressive 1-13.3%',
    ogDescription:
      'Free California tax calculator. Take-home pay after progressive tax (1%–13.3%). No sign-up. 2026 data.',
    canonicalPath: '/california-tax-calculator',
    jsonLdType: 'california',
    snippetAnswer:
      "In California, your take-home pay equals gross salary minus federal tax, FICA (7.65%), and progressive state income tax ranging from 1% to 13.3%. A $75,000 single filer pays about $4,050 in California state tax. California taxes most retirement income but not Social Security benefits.",
  },
  {
    slug: 'new-york-tax-calculator',
    title: 'Free New York Tax Calculator 2026 — 4% to 10.9% + NYC Tax',
    description:
      'Free New York tax calculator for 2026. Calculate take-home pay after progressive state tax (4%–10.9%), NYC tax, federal tax & FICA. No sign-up.',
    h1: 'Free New York Tax Calculator',
    metaTitle: 'Free New York Tax Calculator 2026 — State & NYC Tax',
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
    ogTitle: 'New York Tax Calculator 2026 — State & NYC Tax',
    ogDescription:
      'Free New York tax calculator. Take-home pay after state tax (4%–10.9%) & NYC tax. No sign-up. 2026 data.',
    canonicalPath: '/new-york-tax-calculator',
    jsonLdType: 'newyork',
    snippetAnswer:
      "In New York, your take-home pay equals gross salary minus federal tax, FICA (7.65%), and progressive state income tax (4%–10.9%) plus NYC tax (3.1%–3.9%) if applicable. A $75,000 NYC resident pays roughly $6,500 in state and city taxes combined — the highest in the US.",
  },
  {
    slug: 'mortgage-calculator',
    title: 'Mortgage Calculator 2026 | Payment & Amortization',
    description:
      'Free mortgage calculator with extra payments, amortization schedule, and payoff comparison. Calculate monthly payment using M = P × [r(1+r)^n] / [(1+r)^n - 1]. No sign-up.',
    h1: 'Free Mortgage Calculator',
    metaTitle: 'Free Mortgage Calculator 2026 — Amortization & Extra',
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
    ogTitle: 'Mortgage Calculator 2026 — Amortization & Extra Payments',
    ogDescription:
      'Free mortgage calculator. Monthly payment, amortization & extra payment savings. No sign-up.',
    canonicalPath: '/mortgage-calculator',
    jsonLdType: 'mortgage',
    snippetAnswer:
      "Your monthly mortgage payment is calculated using M = P × [r(1+r)^n] / [(1+r)^n - 1], where P is the loan amount, r is the monthly rate, and n is total payments. On a $280,000 loan at 6.5% for 30 years, your monthly payment is approximately $1,769.",
  },
  {
    slug: '401k-retirement-calculator',
    title: 'Free 401(k) Retirement Calculator 2026 — Projection & Growth',
    description:
      'Free 401(k) retirement calculator for 2026. Project your balance with employer match, compound growth & annual contributions. No sign-up. Visual charts included.',
    h1: 'Free 401(k) Calculator',
    metaTitle: 'Free 401(k) Calculator 2026 — Projections & Growth',
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
    ogTitle: '401(k) Calculator 2026 — Projection & Compound Growth',
    ogDescription:
      'Free 401(k) calculator. Project balance with employer match & compound growth. No sign-up.',
    canonicalPath: '/401k-retirement-calculator',
    jsonLdType: 'retirement',
    snippetAnswer:
      "A 401(k) grows through compound interest: contributions plus employer match earn annual returns, and those returns compound over time. The 2026 contribution limit is $23,500. Starting at 25 with $500/month at 7% returns yields roughly $1.2 million by age 65; starting at 35 yields only $567,000.",
  },
  {
    slug: 'relocation-calculator',
    title: 'Relocation Calculator 2026 | Compare Take-Home',
    description:
      'Free relocation salary calculator for 2026. Compare take-home pay in IL, TX, FL, CA, NY. Find the salary you need to maintain your lifestyle. No sign-up.',
    h1: 'Free Relocation Calculator',
    metaTitle: 'Free Relocation Calculator 2026 — Compare Take-Home',
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
    ogTitle: 'Relocation Calculator 2026 — Compare Take-Home Pay',
    ogDescription:
      'Free relocation calculator. Compare take-home pay in IL, TX, FL, CA, NY. No sign-up.',
    canonicalPath: '/relocation-calculator',
    jsonLdType: 'relocation',
    snippetAnswer:
      "To calculate equivalent salary between states, compare take-home pay after federal tax, FICA, and each state's income tax. A $100,000 salary in Texas (0% state tax) yields ~$79,000 take-home; you'd need ~$120,000–$125,000 in California to match that due to the 1%–13.3% state income tax.",
  },
  {
    slug: 'capital-gains-calculator',
    title: 'Capital Gains Calculator 2026 | Short & Long',
    description:
      'Free capital gains tax calculator for 2026. Calculate short-term (up to 37%) and long-term (0%, 15%, 20% + 3.8% NIIT) rates. No sign-up. Strategies included.',
    h1: 'Free Capital Gains Calculator',
    metaTitle: 'Free Capital Gains Calculator 2026 — Short & Long',
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
    ogTitle: 'Capital Gains Calculator 2026 — Short & Long-Term',
    ogDescription:
      'Free capital gains calculator. Short-term up to 37%, long-term 0%/15%/20% + NIIT. No sign-up.',
    canonicalPath: '/capital-gains-calculator',
    jsonLdType: 'capital-gains',
    snippetAnswer:
      'Short-term capital gains (held ≤1 year) are taxed as ordinary income up to 37%. Long-term gains (held >1 year) qualify for 0%, 15%, or 20% rates. The Net Investment Income Tax adds 3.8% above $200,000/$250,000 MAGI, making the top effective long-term rate 23.8%.',
  },
  {
    slug: 'self-employment-tax-calculator',
    title: 'Self-Employment Calculator 2026 | 15.3% SE Tax',
    description:
      'Free self-employment tax calculator for 2026. Calculate SE tax (15.3% on 92.35% of net income), half deduction, quarterly estimates, 1099 & federal + state tax. No sign-up.',
    h1: 'Free Self-Employment Tax Calculator',
    metaTitle: 'Free Self-Employment Tax Calculator 2026 — 15.3%',
    metaDesc:
      'Free self-employment tax calculator 2026. 15.3% SE tax, 1099, quarterly estimates & half deduction. No sign-up. LLC & freelance.',
    keywords: [
      'free self employment tax calculator', 'free tax calculator for self employed',
      'free tax calculator for 1099', 'SE tax calculator', 'self employed tax',
      '15.3% self employment tax', 'quarterly estimated tax', 'freelance tax calculator',
      '1099 tax calculator', 'self employment tax rate 2026',
      'free tax calculator for 2026',
      'free 1099 tax calculator', 'free tax calculator for self employed',
      'free employee tax calculator', 'llc tax calculator free',
      'free payroll tax calculator', 'free employee payroll tax calculator',
      'freelance tax calculator free',
    ],
    componentKey: 'self-employment',
    category: 'business',
    breadcrumbLabel: 'Self-Employment',
    ogTitle: 'SE Tax Calculator 2026 — 1099 & Self-Employed',
    ogDescription:
      'Free self-employment tax calculator. 15.3% SE tax, 1099, quarterly estimates & half deduction. No sign-up.',
    canonicalPath: '/self-employment-tax-calculator',
    jsonLdType: 'self-employment',
    snippetAnswer:
      'Self-employment tax is 15.3% on 92.35% of net business income, covering both employer and employee portions of Social Security (12.4%) and Medicare (2.9%). On $100,000 net SE income, you owe approximately $14,130 in SE tax. Half is deductible as an above-the-line adjustment.',
  },
  {
    slug: 'sales-tax-calculator',
    title: 'Free Sales Tax Calculator 2026 — All 50 States & Reverse Tax',
    description:
      'Free sales tax calculator for 2026. Calculate sales tax for any US state with combined rates. Includes reverse sales tax calculator. No sign-up required.',
    h1: 'Free Sales Tax Calculator',
    metaTitle: 'Free Sales Tax Calculator 2026 — All 50 States',
    metaDesc:
      'Free sales tax calculator 2026. Calculate sales tax for any US state with combined rates. Includes reverse calculator. No sign-up required.',
    keywords: [
      'free sales tax calculator', 'sales tax calculator', 'reverse sales tax calculator',
      'sales tax by state', 'calculate sales tax', 'sales tax rate',
      'state sales tax rates 2026', 'sales tax percentage', 'combined sales tax rate',
      'free tax calculator for 2026', 'online sales tax calculator',
      'free ifta calculator', 'free ifta tax calculator',
      'free ifta fuel tax calculator', 'calculadora de taxes gratis',
    ],
    componentKey: 'sales-tax',
    category: 'paycheck',
    breadcrumbLabel: 'Sales Tax Calculator',
    ogTitle: 'Sales Tax Calculator 2026 — All 50 States & Reverse',
    ogDescription:
      'Free sales tax calculator 2026. Calculate sales tax for any US state with combined rates. Includes reverse calculator. No sign-up.',
    canonicalPath: '/sales-tax-calculator',
    jsonLdType: 'sales-tax',
    snippetAnswer:
      'Sales tax is calculated by multiplying the purchase price by the combined state and local tax rate. A $100 purchase at 8.25% combined rate adds $8.25 in tax. For reverse calculation, divide the total by (1 + tax rate): $108.25 ÷ 1.0825 = $100.00.',
  },
  {
    slug: 'tax-refund-calculator',
    title: 'Tax Refund Calculator 2026 | Federal & State',
    description:
      'Free tax refund calculator for 2026. Estimate your federal and state tax refund based on income, withholding, deductions, and credits. No sign-up required.',
    h1: 'Free Tax Refund Calculator',
    metaTitle: 'Free Tax Refund Calculator 2026 — Estimate Refund',
    metaDesc:
      'Free tax refund calculator 2026. Estimate your refund based on income, withholding, deductions & credits. No sign-up. Covers all 50 states.',
    keywords: [
      'free tax refund calculator', 'tax refund calculator', 'tax refund calculator 2026',
      'free tax calculator for 2026', 'free tax estimator with deductions',
      'tax return calculator', 'federal refund calculator', 'state tax refund calculator',
      'free tax calculator federal and state', 'tax refund estimator',
      'free tax calculator with dependents', 'irs refund calculator',
      'free tax refund calculator 2026', 'tax refund calculator with itemized deductions',
      'child tax credit calculator', 'earned income credit calculator',
      'free tax refund estimate calculator', 'free estimate tax refund',
      'estimate my tax return free', 'free income tax refund calculator',
      'free income tax refund estimator', 'free tax return estimate',
      'free tax back calculator', 'free tax rebate calculator',
      'tax refund free estimate', 'free tax return estimate calculator',
      'turbotax income tax refund calculator',
    ],
    componentKey: 'tax-refund',
    category: 'paycheck',
    breadcrumbLabel: 'Tax Refund Calculator',
    ogTitle: 'Tax Refund Calculator 2026 — Estimate Your Refund',
    ogDescription:
      'Free tax refund calculator 2026. Estimate your federal and state refund. No sign-up required.',
    canonicalPath: '/tax-refund-calculator',
    jsonLdType: 'tax-refund',
    snippetAnswer:
      'Your tax refund equals total withholding minus actual tax owed. For 2026, the standard deduction is $16,100 (single) or $32,200 (married). The Child Tax Credit provides $2,000 per qualifying child. The average federal refund is approximately $2,800–$3,200.',
  },
  {
    slug: 'overtime-tax-calculator',
    title: 'Free Overtime Tax Calculator 2026 — After-Tax OT Pay',
    description:
      'Free overtime tax calculator for 2026. Calculate your after-tax overtime pay at 1.5x rate. See how much OT you actually keep after federal, FICA & state taxes. No sign-up.',
    h1: 'Free Overtime Tax Calculator',
    metaTitle: 'Free Overtime Tax Calculator 2026 — After-Tax OT',
    metaDesc:
      'Free overtime tax calculator 2026. Calculate after-tax overtime pay at 1.5x rate. Federal, FICA & state taxes included. No sign-up required.',
    keywords: [
      'free overtime tax calculator', 'overtime tax calculator', 'overtime pay calculator',
      'overtime calculator 2026', 'after tax overtime pay', 'overtime tax rate',
      '1.5x overtime calculator', 'time and a half calculator', 'overtime take home pay',
      'how much overtime is taxed', 'no tax on overtime calculator', 'free tax calculator for 2026',
      'free hourly paycheck calculator', 'free hourly payroll calculator',
      'free payroll calculator hourly',
    ],
    componentKey: 'overtime',
    category: 'paycheck',
    breadcrumbLabel: 'Overtime Tax',
    ogTitle: 'Overtime Tax Calculator 2026 — After-Tax OT Pay',
    ogDescription:
      'Free overtime tax calculator 2026. Calculate after-tax overtime pay. Federal, FICA & state taxes. No sign-up.',
    canonicalPath: '/overtime-tax-calculator',
    jsonLdType: 'overtime',
    snippetAnswer:
      "Overtime pay is taxed at your marginal federal rate (10%–37%), plus FICA (7.65%), plus state income tax. At 1.5x your regular rate, a $30/hour worker earns $45/hour OT — but in the 22% bracket with state tax, take-home drops to about $29/hour.",
  },
  {
    slug: 'georgia-tax-calculator',
    title: 'Georgia Tax Calculator 2026 | After 5.49%',
    description:
      'How much do you keep after Georgia 5.49% flat tax? Calculate your 2026 take-home pay after state, federal & FICA taxes. Instant results, no sign-up.',
    h1: 'Free Georgia Tax Calculator',
    metaTitle: 'Free Georgia Tax Calculator 2026 — 5.49% Flat Rate',
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
    ogTitle: 'Georgia Tax Calculator 2026 — 5.49% Flat Tax',
    ogDescription:
      'Free Georgia tax calculator. Take-home pay after 5.49% flat state tax and federal tax. No sign-up. 2026 data.',
    canonicalPath: '/georgia-tax-calculator',
    jsonLdType: 'georgia',
    snippetAnswer:
      "In Georgia, your take-home pay equals gross salary minus federal tax, FICA (7.65%), and a flat 5.49% state income tax. Georgia offers a standard deduction of $5,400 (single). A $75,000 single filer pays approximately $3,815 in Georgia state tax.",
  },
  {
    slug: 'lottery-tax-calculator',
    title: 'Lottery Tax Calculator 2026 | After-Tax Winnings',
    description:
      'Surprised how much tax on lottery winnings? 24% federal + state taxes can take 40%+. See your actual payout after all taxes. Free calculator, no sign-up.',
    h1: 'Free Lottery Tax Calculator',
    metaTitle: 'Free Lottery Tax Calculator 2026 — After-Tax Winnings',
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
    ogTitle: 'Lottery Tax Calculator 2026 — After-Tax Winnings',
    ogDescription:
      'Free lottery tax calculator. After-tax winnings with 24% federal withholding and state taxes. No sign-up.',
    canonicalPath: '/lottery-tax-calculator',
    jsonLdType: 'lottery',
    snippetAnswer:
      "Lottery winnings are taxed as ordinary income. Federal withholding is 24% for winnings over $5,000, but your actual tax rate may be higher (up to 37%). State taxes vary: 0% in TX/FL, up to 13.3% in CA. A $1M jackpot can yield just $550K–$630K after all taxes.",
  },
  {
    slug: 'irs-withholding-calculator',
    title: 'Free IRS Withholding Calculator 2026 — W-4 Optimization',
    description:
      'Free IRS withholding calculator for 2026. Optimize your W-4 to avoid owing taxes or overpaying. Based on IRS Publication 15-T. No sign-up.',
    h1: 'Free IRS Withholding Calculator',
    metaTitle: 'Free IRS Withholding Calculator 2026 — W-4 & FreeFile',
    metaDesc:
      'Free IRS withholding calculator 2026. Optimize W-4, avoid penalties & estimate refund. IRS FreeFile compatible. No sign-up.',
    keywords: [
      'free IRS withholding calculator', 'IRS withholding calculator', 'W-4 calculator',
      'withholding calculator 2026', 'tax withholding estimator', 'W-4 optimization',
      'paycheck withholding calculator', 'IRS tax withholding',
      'free tax calculator for 2026', 'federal withholding calculator',
      'adjust W-4 allowances', 'IRS Publication 15-T',
      'free federal withholding calculator', 'free federal tax withholding calculator',
      'irs free tax calculator', 'irs free tax estimator', 'freefile irs',
      'free irs penalty and interest calculator', 'federal withholding calculator',
      'irs tax withholding estimator',
    ],
    componentKey: 'irs-withholding',
    category: 'paycheck',
    breadcrumbLabel: 'IRS Withholding',
    ogTitle: 'IRS Withholding Calculator 2026 — W-4 Optimization',
    ogDescription:
      'Free IRS withholding calculator. Optimize your W-4 to avoid penalties. No sign-up. 2026 data.',
    canonicalPath: '/irs-withholding-calculator',
    jsonLdType: 'irs-withholding',
    snippetAnswer:
      'Federal withholding is calculated by estimating your annual tax liability (using progressive brackets and the standard deduction), then dividing by pay periods. For 2026, the standard deduction is $16,100 (single). Adjust your W-4 to avoid underpayment penalties or over-withholding.',
  },
  {
    slug: 'property-tax-calculator',
    title: 'Free Property Tax Calculator 2026 — All 50 States',
    description:
      'Free property tax calculator for 2026. Calculate annual property tax for any US state with average effective rates. Includes homestead exemptions. No sign-up.',
    h1: 'Free Property Tax Calculator',
    metaTitle: 'Free Property Tax Calculator 2026 — 50 States',
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
    ogTitle: 'Property Tax Calculator 2026 — All 50 States',
    ogDescription:
      'Free property tax calculator. Calculate annual property tax for any US state. No sign-up.',
    canonicalPath: '/property-tax-calculator',
    jsonLdType: 'property-tax',
    snippetAnswer:
      'Property tax is calculated by multiplying the assessed home value by the local effective tax rate. Average rates range from 0.28% in Hawaii to 2.23% in New Jersey. On a $300,000 home at 1.0% rate, annual property tax is $3,000. Homestead exemptions can reduce the taxable value.',
  },
  {
    slug: 'bonus-tax-calculator',
    title: 'Bonus Tax Calculator 2026 | After-Tax Amount',
    description:
      'Your $5K bonus may only be $3,400 after taxes. Compare 22% flat vs aggregate method and see your real take-home. Free, instant, no sign-up.',
    h1: 'Free Bonus Tax Calculator',
    metaTitle: 'Free Bonus Tax Calculator 2026 — After-Tax Amount',
    metaDesc:
      '$5K bonus → only $3,400 take-home? Compare 22% flat vs aggregate and see your real after-tax bonus. Free, instant.',
    keywords: [
      'free bonus tax calculator', 'bonus tax calculator', 'bonus tax rate',
      'supplemental wage calculator', '22% bonus tax', 'aggregate method bonus',
      'after tax bonus calculator', 'year end bonus tax',
      'free tax calculator for 2026', 'bonus withholding calculator',
      'free payroll calculator', 'free paycheck stub calculator',
      'calculate payroll check free', 'paystub calculator free',
    ],
    componentKey: 'bonus-tax',
    category: 'business',
    breadcrumbLabel: 'Bonus Tax',
    ogTitle: 'Bonus Tax Calculator 2026 — 22% Flat vs Aggregate',
    ogDescription:
      'Free bonus tax calculator. Compare 22% flat vs aggregate method. No sign-up. 2026 data.',
    canonicalPath: '/bonus-tax-calculator',
    jsonLdType: 'bonus-tax',
    snippetAnswer:
      "Bonus tax uses either the 22% flat supplemental rate or the aggregate method (combining bonus with regular wages). A $5,000 bonus at 22% flat withholding yields about $3,400 take-home after FICA and state tax. The aggregate method may result in higher withholding if it pushes you into a higher bracket.",
  },
  {
    slug: 'virginia-tax-calculator',
    title: 'Virginia Tax Calculator 2026 | 2-5.75% Rate',
    description:
      'Calculate your 2026 Virginia take-home pay after progressive state tax (2%–5.75%), federal tax & FICA. See real numbers instantly. No sign-up.',
    h1: 'Free Virginia Tax Calculator',
    metaTitle: 'Free Virginia Tax Calculator 2026 — 2% to 5.75%',
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
    ogTitle: 'Virginia Tax Calculator 2026 — 2%-5.75% Progressive',
    ogDescription:
      'Free Virginia tax calculator. Take-home pay after progressive tax (2%–5.75%). No sign-up. 2026 data.',
    canonicalPath: '/virginia-tax-calculator',
    jsonLdType: 'virginia',
    snippetAnswer:
      "In Virginia, your take-home pay equals gross salary minus federal tax, FICA (7.65%), and progressive state income tax (2%–5.75%). Virginia's standard deduction is $8,500 for single filers. A $75,000 single filer pays approximately $3,460 in Virginia state tax.",
  },
  {
    slug: 'income-tax-calculator',
    title: 'Free Income Tax Calculator 2026 — Federal Brackets & Take-Home',
    description:
      'Free income tax calculator for 2026. Calculate your federal income tax using progressive brackets (10%–37%), standard deductions, FICA, and state tax. No sign-up required.',
    h1: 'Free Income Tax Calculator',
    metaTitle: 'Free Income Tax Calculator 2026 — Federal & State',
    metaDesc:
      'Free income tax calculator 2026. Estimate federal tax with brackets (10%–37%), standard deductions & FICA. No sign-up. All 50 states.',
    keywords: [
      'free income tax calculator', 'free income tax estimator', 'income tax calculator',
      'free federal income tax calculator', 'free income tax estimate calculator',
      'free calculator for income tax', 'free income tax return calculator',
      'free salary tax calculator', 'income tax estimator', 'federal income tax calculator',
      'free tax calculator 2026', 'free income tax refund calculator',
      'free online tax calculator', 'free estimates income tax', 'irs income tax calculator',
    ],
    componentKey: 'income-tax',
    category: 'paycheck',
    breadcrumbLabel: 'Income Tax Calculator',
    ogTitle: 'Free Income Tax Calculator 2026 — Federal & State',
    ogDescription:
      'Free income tax calculator 2026. Estimate federal tax with brackets, deductions & FICA. No sign-up.',
    canonicalPath: '/income-tax-calculator',
    jsonLdType: 'income-tax',
    snippetAnswer:
      'Your federal income tax is calculated using progressive brackets: 10% on the first $11,600 (single), 12% up to $47,150, 22% up to $100,525, and up to 37% on income above $609,350. After the $16,100 standard deduction, a $75,000 single filer owes about $7,670 in federal tax plus $5,738 in FICA.',
  },
  {
    slug: 'tax-calculator',
    title: 'Free Tax Calculator 2026 — Estimate Your Tax & Take-Home Pay',
    description:
      'Free tax calculator for 2026. Estimate your total federal and state tax burden with progressive brackets, FICA, standard deductions, and pre-tax contributions. No sign-up.',
    h1: 'Free Tax Calculator',
    metaTitle: 'Free Tax Calculator 2026 — Estimate Your Tax Refund',
    metaDesc:
      'Free tax calculator 2026. Estimate federal & state tax, FICA, deductions & refund. No sign-up. Covers all 50 states with 2026 brackets.',
    keywords: [
      'free tax estimator', 'free tax calculator', 'free tax calculate', 'free tax cal',
      'free tax calculators', 'tax calculator 2026', 'free online tax estimator',
      'free estimate tax refund', 'free tax return calculator', 'estimate my tax return free',
      'free tax filing calculator', 'free tax estimate calculator', 'free tax refund estimate',
      'free tax return estimate', 'tax estimator', 'free tax calculator online',
    ],
    componentKey: 'tax-calc',
    category: 'paycheck',
    breadcrumbLabel: 'Tax Calculator',
    ogTitle: 'Free Tax Calculator 2026 — Estimate Your Tax & Refund',
    ogDescription:
      'Free tax calculator 2026. Estimate federal & state tax, FICA & refund. No sign-up. All 50 states.',
    canonicalPath: '/tax-calculator',
    jsonLdType: 'tax-calc',
    snippetAnswer:
      'Your total tax burden includes federal income tax (10%–37% progressive brackets), FICA (7.65% for Social Security and Medicare), and state income tax (0%–13.3% depending on state). A $75,000 single filer takes home approximately $61,600 in Texas (0% state tax) versus $58,000 in Illinois (4.95% flat tax).',
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
