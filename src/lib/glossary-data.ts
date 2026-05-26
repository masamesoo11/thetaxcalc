/**
 * Tax Glossary Data
 * Centralized glossary terms with definitions, examples, and calculator links.
 * Used by both the server page (for JSON-LD) and client component (for rendering).
 */

export interface GlossaryTerm {
  term: string;
  slug: string;
  letter: string;
  definition: string;
  example?: string;
  figure2026?: string;
  calculatorLink?: string;
  calculatorLabel?: string;
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  // ─── A ──────────────────────────────────────────────────────────────────────
  {
    term: 'Adjusted Gross Income (AGI)',
    slug: 'adjusted-gross-income',
    letter: 'A',
    definition:
      'Your Adjusted Gross Income (AGI) is your gross income minus specific adjustments (also called "above-the-line" deductions), such as contributions to a traditional IRA, student loan interest, and HSA contributions. AGI is a critical figure because it determines eligibility for many tax credits and deductions.',
    example:
      'If your gross income is $85,000 and you contribute $4,000 to a traditional IRA and pay $2,500 in student loan interest, your AGI is $78,500.',
    calculatorLink: '/paycheck-calculator',
    calculatorLabel: 'Paycheck Calculator',
  },
  {
    term: 'Additional Medicare Tax',
    slug: 'additional-medicare-tax',
    letter: 'A',
    definition:
      'The Additional Medicare Tax is a 0.9% surtax on earned income that exceeds certain thresholds — $200,000 for single filers and $250,000 for married filing jointly. Employers are required to withhold this tax on wages exceeding $200,000 regardless of filing status.',
    figure2026: '0.9% on earned income above $200,000 (single) or $250,000 (MFJ)',
    calculatorLink: '/paycheck-calculator',
    calculatorLabel: 'Paycheck Calculator',
  },

  // ─── C ──────────────────────────────────────────────────────────────────────
  {
    term: 'Capital Gains',
    slug: 'capital-gains',
    letter: 'C',
    definition:
      'Capital gains are the profit you earn from selling a capital asset (stocks, real estate, crypto) for more than you paid. Short-term capital gains (held ≤ 1 year) are taxed as ordinary income up to 37%. Long-term capital gains (held > 1 year) benefit from preferential rates of 0%, 15%, or 20%.',
    example:
      'You buy stock for $10,000 and sell it 18 months later for $15,000. Your $5,000 long-term capital gain is taxed at 0%, 15%, or 20% depending on your taxable income.',
    calculatorLink: '/capital-gains-calculator',
    calculatorLabel: 'Capital Gains Calculator',
  },
  {
    term: 'Capital Gains Tax Brackets',
    slug: 'capital-gains-tax-brackets',
    letter: 'C',
    definition:
      'Long-term capital gains tax brackets for 2026 are 0%, 15%, and 20%, based on your taxable income and filing status. Single filers pay 0% on gains up to ~$48,350, 15% up to ~$533,400, and 20% above that. The 3.8% Net Investment Income Tax (NIIT) may also apply for high earners.',
    figure2026: '0% up to ~$48,350 (single), 15% up to ~$533,400, 20% above that',
    calculatorLink: '/capital-gains-calculator',
    calculatorLabel: 'Capital Gains Calculator',
  },
  {
    term: 'Cost of Living Adjustment (COLA)',
    slug: 'cost-of-living-adjustment',
    letter: 'C',
    definition:
      'A Cost of Living Adjustment (COLA) is an annual increase applied to Social Security benefits and other federal programs to offset inflation. The Social Security Administration announces the COLA each October based on the Consumer Price Index for Urban Wage Earners (CPI-W).',
    figure2026: '2.5% COLA for 2026 Social Security benefits',
  },

  // ─── D ──────────────────────────────────────────────────────────────────────
  {
    term: 'Deductions (Standard vs Itemized)',
    slug: 'deductions-standard-vs-itemized',
    letter: 'D',
    definition:
      'Tax deductions reduce your taxable income. You can choose the standard deduction (a flat amount) or itemize deductions (mortgage interest, state/local taxes up to $10,000, charitable contributions). You should pick whichever gives you the larger deduction.',
    figure2026: 'Standard deduction: $15,000 (single), $30,000 (MFJ), $22,500 (HoH)',
    calculatorLink: '/paycheck-calculator',
    calculatorLabel: 'Paycheck Calculator',
  },

  // ─── E ──────────────────────────────────────────────────────────────────────
  {
    term: 'Effective Tax Rate',
    slug: 'effective-tax-rate',
    letter: 'E',
    definition:
      'Your effective tax rate is the actual percentage of your total income that goes to federal income tax. It is calculated by dividing your total federal income tax by your gross income. Because of progressive brackets and deductions, your effective rate is always lower than your marginal rate.',
    example:
      'If your gross income is $80,000 and your total federal tax is $9,800, your effective tax rate is 12.25% — even though your marginal bracket is 22%.',
    calculatorLink: '/paycheck-calculator',
    calculatorLabel: 'Paycheck Calculator',
  },
  {
    term: 'Estate Tax',
    slug: 'estate-tax',
    letter: 'E',
    definition:
      'The federal estate tax (sometimes called the "death tax") applies to the transfer of a deceased person\'s estate when its value exceeds the federal exemption. Only estates valued above the exemption threshold are subject to the tax, which has a top rate of 40%.',
    figure2026: 'Federal estate tax exemption: ~$13.99 million per individual for 2026',
  },

  // ─── F ──────────────────────────────────────────────────────────────────────
  {
    term: 'FICA',
    slug: 'fica',
    letter: 'F',
    definition:
      'FICA stands for Federal Insurance Contributions Act. It is the mandatory payroll tax that funds Social Security and Medicare. Employees pay 7.65% (6.2% for Social Security + 1.45% for Medicare), and employers match that for a total of 15.3%. Self-employed individuals pay the full 15.3% as self-employment tax.',
    figure2026: 'Social Security: 6.2% up to $176,100 wage cap; Medicare: 1.45% (no cap)',
    calculatorLink: '/paycheck-calculator',
    calculatorLabel: 'Paycheck Calculator',
  },
  {
    term: 'Filing Status',
    slug: 'filing-status',
    letter: 'F',
    definition:
      'Your filing status determines your tax rates, standard deduction, and eligibility for certain credits. The five filing statuses are: Single, Married Filing Jointly (MFJ), Married Filing Separately (MFS), Head of Household (HoH), and Qualifying Surviving Spouse (QSS). Choosing the correct status can significantly affect your tax bill.',
    example:
      'A single filer gets a $15,000 standard deduction in 2026, while Head of Household gets $22,500 — a $7,500 difference in taxable income.',
    calculatorLink: '/paycheck-calculator',
    calculatorLabel: 'Paycheck Calculator',
  },
  {
    term: 'Flexible Spending Account (FSA)',
    slug: 'flexible-spending-account',
    letter: 'F',
    definition:
      'A Flexible Spending Account (FSA) is a pre-tax benefit account used to pay for eligible healthcare or dependent care expenses. Contributions reduce your taxable income, but FSA funds are "use-it-or-lose-it" — any unused balance at year-end is forfeited unless your employer offers a grace period or carryover.',
    figure2026: 'Healthcare FSA contribution limit: ~$3,300 for 2026',
  },

  // ─── G ──────────────────────────────────────────────────────────────────────
  {
    term: 'Gross Income',
    slug: 'gross-income',
    letter: 'G',
    definition:
      'Gross income is the total of all income you receive before any deductions or taxes. This includes wages, salaries, tips, interest, dividends, rental income, and business income. Gross income is the starting point for calculating your AGI and taxable income.',
    example:
      'If you earn a $75,000 salary, $2,000 in dividends, and $5,000 in rental income, your gross income is $82,000.',
    calculatorLink: '/paycheck-calculator',
    calculatorLabel: 'Paycheck Calculator',
  },

  // ─── H ──────────────────────────────────────────────────────────────────────
  {
    term: 'Head of Household',
    slug: 'head-of-household',
    letter: 'H',
    definition:
      'Head of Household is a filing status for unmarried individuals who pay more than half the cost of maintaining a home for themselves and a qualifying dependent. It offers a larger standard deduction ($22,500 in 2026) and wider tax brackets compared to Single filing status.',
    figure2026: 'Standard deduction: $22,500; wider 12% bracket up to ~$64,100',
    calculatorLink: '/paycheck-calculator',
    calculatorLabel: 'Paycheck Calculator',
  },
  {
    term: 'HSA (Health Savings Account)',
    slug: 'hsa-health-savings-account',
    letter: 'H',
    definition:
      'An HSA is a tax-advantaged savings account for individuals with a High Deductible Health Plan (HDHP). Contributions are pre-tax (or tax-deductible), growth is tax-free, and withdrawals for qualified medical expenses are tax-free. Unlike an FSA, HSA funds roll over year to year and are portable.',
    figure2026: 'Contribution limits: $4,300 (self-only), $8,550 (family) for 2026',
    calculatorLink: '/paycheck-calculator',
    calculatorLabel: 'Paycheck Calculator',
  },

  // ─── I ──────────────────────────────────────────────────────────────────────
  {
    term: 'Income Tax',
    slug: 'income-tax',
    letter: 'I',
    definition:
      'Income tax is a tax levied by the federal government and most states on an individual\'s or business\'s earnings. The U.S. uses a progressive income tax system where higher income is taxed at higher marginal rates. Federal rates for 2026 range from 10% to 37%.',
    figure2026: 'Federal brackets: 10%, 12%, 22%, 24%, 32%, 35%, 37%',
    calculatorLink: '/paycheck-calculator',
    calculatorLabel: 'Paycheck Calculator',
  },
  {
    term: 'IRS',
    slug: 'irs',
    letter: 'I',
    definition:
      'The Internal Revenue Service (IRS) is the federal agency responsible for collecting taxes and enforcing tax laws in the United States. The IRS processes tax returns, issues refunds, conducts audits, and administers the tax code. The IRS also publishes annual inflation adjustments for brackets, deductions, and credits.',
    example:
      'The IRS sets the annual standard deduction amounts, tax bracket thresholds, and FICA wage caps that affect every taxpayer\'s return.',
  },

  // ─── M ──────────────────────────────────────────────────────────────────────
  {
    term: 'Marginal Tax Rate',
    slug: 'marginal-tax-rate',
    letter: 'M',
    definition:
      'Your marginal tax rate is the rate applied to your last (highest) dollar of taxable income. Because the U.S. uses progressive brackets, not all income is taxed at this rate — only the portion that falls within the top bracket. Understanding marginal vs. effective rates is key to tax planning.',
    example:
      'If you are single with $70,000 taxable income, your marginal rate is 22%. However, only the dollars between ~$48,350 and $70,000 are taxed at 22% — the rest is taxed at 10% and 12%.',
    calculatorLink: '/paycheck-calculator',
    calculatorLabel: 'Paycheck Calculator',
  },
  {
    term: 'Medicare Tax',
    slug: 'medicare-tax',
    letter: 'M',
    definition:
      'Medicare tax is the 1.45% payroll tax (employee portion) that funds the Medicare health insurance program. Unlike Social Security tax, there is no wage cap — all earned income is subject to Medicare tax. High earners also pay the Additional Medicare Tax of 0.9% on income above threshold amounts.',
    figure2026: '1.45% on all earned income (no wage cap); Additional 0.9% above $200K/$250K',
    calculatorLink: '/paycheck-calculator',
    calculatorLabel: 'Paycheck Calculator',
  },

  // ─── N ──────────────────────────────────────────────────────────────────────
  {
    term: 'Net Investment Income Tax (NIIT)',
    slug: 'net-investment-income-tax',
    letter: 'N',
    definition:
      'The Net Investment Income Tax (NIIT) is an additional 3.8% tax on investment income for individuals with modified adjusted gross income (MAGI) above certain thresholds. It applies to interest, dividends, capital gains, rental income, and royalties. The thresholds are $200,000 (single) and $250,000 (MFJ).',
    figure2026: '3.8% on net investment income when MAGI exceeds $200K (single) / $250K (MFJ)',
    calculatorLink: '/capital-gains-calculator',
    calculatorLabel: 'Capital Gains Calculator',
  },

  // ─── P ──────────────────────────────────────────────────────────────────────
  {
    term: 'Payroll Tax',
    slug: 'payroll-tax',
    letter: 'P',
    definition:
      'Payroll tax refers to the taxes withheld from an employee\'s paycheck by their employer, including federal income tax, Social Security tax (6.2%), and Medicare tax (1.45%). Employers also pay a matching share of FICA taxes. Self-employed individuals pay both halves via self-employment tax.',
    example:
      'On a $75,000 salary, the employee\'s FICA payroll tax is $5,737.50 ($4,650 Social Security + $1,087.50 Medicare). The employer matches this amount.',
    calculatorLink: '/paycheck-calculator',
    calculatorLabel: 'Paycheck Calculator',
  },
  {
    term: 'Progressive Tax',
    slug: 'progressive-tax',
    letter: 'P',
    definition:
      'A progressive tax system imposes higher tax rates on higher levels of income. The U.S. federal income tax is progressive — your first dollars are taxed at 10%, and only income above certain thresholds reaches the 37% bracket. This is different from a flat tax (like Illinois\'s 4.95%) or regressive tax.',
    example:
      'A single filer with $50,000 taxable income pays 10% on the first ~$11,600, 12% on income up to ~$48,350, and 22% on only the remaining ~$1,650.',
    calculatorLink: '/paycheck-calculator',
    calculatorLabel: 'Paycheck Calculator',
  },
  {
    term: 'Property Tax',
    slug: 'property-tax',
    letter: 'P',
    definition:
      'Property tax is a tax on real estate and other property, levied by local governments (counties, cities, school districts). Property taxes vary widely by state and locality. They are deductible on your federal return if you itemize, subject to the $10,000 SALT cap.',
    example:
      'Texas has no state income tax but the average effective property tax rate is 1.71% — one of the highest in the nation. Florida\'s rate averages 0.86%.',
    calculatorLink: '/mortgage-calculator',
    calculatorLabel: 'Mortgage Calculator',
  },

  // ─── Q ──────────────────────────────────────────────────────────────────────
  {
    term: 'Qualified Business Income (QBI) Deduction',
    slug: 'qualified-business-income-deduction',
    letter: 'Q',
    definition:
      'The QBI deduction (Section 199A) allows eligible self-employed and small business owners to deduct up to 20% of their qualified business income from their taxes. The deduction has income thresholds and limitations based on W-2 wages paid and the unadjusted basis of qualified property.',
    figure2026: 'Up to 20% of QBI; phase-out begins at ~$191,950 (single) / ~$383,900 (MFJ)',
    calculatorLink: '/self-employment-tax-calculator',
    calculatorLabel: 'Self-Employment Calculator',
  },

  // ─── S ──────────────────────────────────────────────────────────────────────
  {
    term: 'Self-Employment Tax',
    slug: 'self-employment-tax',
    letter: 'S',
    definition:
      'Self-employment tax is the 15.3% tax that self-employed individuals pay to cover both the employee and employer portions of Social Security (12.4%) and Medicare (2.9%). It applies to 92.35% of your net business income. You can deduct half of your SE tax on your federal return.',
    figure2026: '15.3% on 92.35% of net self-employment income; Social Security cap at $176,100',
    calculatorLink: '/self-employment-tax-calculator',
    calculatorLabel: 'Self-Employment Calculator',
  },
  {
    term: 'Social Security Tax',
    slug: 'social-security-tax',
    letter: 'S',
    definition:
      'Social Security tax (OASDI) is the 6.2% payroll tax (employee portion) that funds retirement, disability, and survivor benefits. It applies only to wages up to the annual wage base cap. Income above the cap is not subject to Social Security tax.',
    figure2026: '6.2% on wages up to $176,100 wage cap for 2026',
    calculatorLink: '/paycheck-calculator',
    calculatorLabel: 'Paycheck Calculator',
  },
  {
    term: 'Standard Deduction',
    slug: 'standard-deduction',
    letter: 'S',
    definition:
      'The standard deduction is a flat amount that reduces your taxable income. You can claim it instead of itemizing deductions. The amount varies by filing status and is adjusted annually for inflation. Most taxpayers take the standard deduction because it exceeds their potential itemized deductions.',
    figure2026: '$15,000 (single), $30,000 (MFJ), $22,500 (HoH); additional $2,000 for age 65+ or blind',
    calculatorLink: '/paycheck-calculator',
    calculatorLabel: 'Paycheck Calculator',
  },
  {
    term: 'State Income Tax',
    slug: 'state-income-tax',
    letter: 'S',
    definition:
      'State income tax is a tax levied by individual states on resident income. Rates and structures vary widely: some states have progressive brackets (CA: 1%–13.3%, NY: 4%–10.9%), some have flat rates (IL: 4.95%), and nine states have no income tax at all (including TX and FL).',
    example:
      'A $75,000 earner pays $0 state tax in Texas or Florida, ~$3,575 in Illinois (4.95%), and potentially over $5,000 in California or New York.',
    calculatorLink: '/relocation-calculator',
    calculatorLabel: 'Relocation Calculator',
  },

  // ─── T ──────────────────────────────────────────────────────────────────────
  {
    term: 'Tax Bracket',
    slug: 'tax-bracket',
    letter: 'T',
    definition:
      'A tax bracket is a range of income that is taxed at a specific rate. The U.S. has seven federal brackets for 2026: 10%, 12%, 22%, 24%, 32%, 35%, and 37%. Because the system is progressive, only the income within each bracket range is taxed at that bracket\'s rate — not your entire income.',
    figure2026: '7 brackets: 10%, 12%, 22%, 24%, 32%, 35%, 37%',
    calculatorLink: '/paycheck-calculator',
    calculatorLabel: 'Paycheck Calculator',
  },
  {
    term: 'Taxable Income',
    slug: 'taxable-income',
    letter: 'T',
    definition:
      'Taxable income is the portion of your income that is subject to federal income tax after subtracting deductions (standard or itemized) from your AGI. It is the amount to which the tax brackets are applied to calculate your federal tax liability.',
    example:
      'If your AGI is $80,000 and you take the $15,000 standard deduction (single), your taxable income is $65,000. Only this amount is subject to the bracket rates.',
    calculatorLink: '/paycheck-calculator',
    calculatorLabel: 'Paycheck Calculator',
  },
  {
    term: 'Tax Credit vs Tax Deduction',
    slug: 'tax-credit-vs-tax-deduction',
    letter: 'T',
    definition:
      'A tax deduction reduces your taxable income, while a tax credit directly reduces the tax you owe, dollar for dollar. Credits are generally more valuable than deductions of the same amount because they provide a full offset against tax rather than just reducing the income that is taxed.',
    example:
      'A $1,000 deduction saves you $220 if you are in the 22% bracket. A $1,000 credit saves you the full $1,000. Refundable credits (like the Earned Income Credit) can even result in a refund exceeding your tax liability.',
    calculatorLink: '/paycheck-calculator',
    calculatorLabel: 'Paycheck Calculator',
  },

  // ─── W ──────────────────────────────────────────────────────────────────────
  {
    term: 'Withholding',
    slug: 'withholding',
    letter: 'W',
    definition:
      'Withholding is the amount of income tax that your employer deducts from each paycheck and sends to the IRS on your behalf. It is based on your income, filing status, and the information you provide on Form W-4. Proper withholding helps you avoid a large tax bill or penalty at tax time.',
    example:
      'If too little is withheld, you may owe taxes (and possibly penalties) when you file. If too much is withheld, you get a refund — but you\'ve given the government an interest-free loan.',
    calculatorLink: '/paycheck-calculator',
    calculatorLabel: 'Paycheck Calculator',
  },
];

/** Get unique letters that have terms */
export function getGlossaryLetters(): string[] {
  return [...new Set(GLOSSARY_TERMS.map((t) => t.letter))].sort();
}

/** Top 10 terms for FAQPage JSON-LD (targeting long-tail keywords) */
export const FAQ_TERMS = [
  { term: 'FICA', question: 'What is FICA?' },
  { term: 'Standard Deduction', question: 'What is the standard deduction for 2026?' },
  { term: 'Marginal Tax Rate', question: 'What is marginal tax rate?' },
  { term: 'Adjusted Gross Income (AGI)', question: 'What is AGI (Adjusted Gross Income)?' },
  { term: 'Tax Credit vs Tax Deduction', question: 'What is the difference between a tax credit and a tax deduction?' },
  { term: 'Self-Employment Tax', question: 'What is self-employment tax?' },
  { term: 'Effective Tax Rate', question: 'What is effective tax rate?' },
  { term: 'Capital Gains Tax Brackets', question: 'What are the capital gains tax brackets?' },
  { term: 'Additional Medicare Tax', question: 'What is the Additional Medicare Tax?' },
  { term: 'Withholding', question: 'What is tax withholding?' },
];
