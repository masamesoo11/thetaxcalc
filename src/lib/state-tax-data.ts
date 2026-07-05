/**
 * State Tax Data — Used to generate unique content for states
 * that don't have hand-written content in _content.ts
 *
 * This fixes the "duplicate content" issue identified in the competitive analysis.
 * Each state gets unique: tax rates, examples, FAQs, and facts.
 */

export interface StateTaxData {
  name: string;
  slug: string;
  incomeTaxRate: string;
  incomeTaxDesc: string;
  salesTax: string;
  propertyTax: string;
  uniqueFact: string;
  exampleSalary: string;
  exampleTakeHome: string;
  isNoIncomeTax: boolean;
  isFlatTax: boolean;
  topRate: string;
}

export const STATE_TAX_DATA: Record<string, StateTaxData> = {
  alaska: {
    name: 'Alaska', slug: 'alaska-tax-calculator',
    incomeTaxRate: '0%', incomeTaxDesc: 'No state income tax. Alaska abolished its income tax in 1980.',
    salesTax: '0% state (localities up to 7.5%)', propertyTax: '1.18%',
    uniqueFact: 'Alaska pays residents an annual Permanent Fund Dividend (PFD) from oil revenue — about $1,300–$3,200 per person.',
    exampleSalary: '$75,000', exampleTakeHome: '$61,592',
    isNoIncomeTax: true, isFlatTax: false, topRate: '0%',
  },
  nevada: {
    name: 'Nevada', slug: 'nevada-tax-calculator',
    incomeTaxRate: '0%', incomeTaxDesc: 'No state income tax. Nevada\'s constitution prohibits it.',
    salesTax: '6.85% state (8.23% avg combined)', propertyTax: '0.69%',
    uniqueFact: 'Nevada relies on gaming and tourism taxes. The "live entertainment tax" and hotel room taxes fund the state budget.',
    exampleSalary: '$75,000', exampleTakeHome: '$61,592',
    isNoIncomeTax: true, isFlatTax: false, topRate: '0%',
  },
  southdakota: {
    name: 'South Dakota', slug: 'south-dakota-tax-calculator',
    incomeTaxRate: '0%', incomeTaxDesc: 'No state income tax on individuals or corporations.',
    salesTax: '4.5% state (6.4% avg combined)', propertyTax: '1.32%',
    uniqueFact: 'South Dakota is a major banking hub due to favorable banking laws. No corporate income tax either.',
    exampleSalary: '$75,000', exampleTakeHome: '$61,592',
    isNoIncomeTax: true, isFlatTax: false, topRate: '0%',
  },
  wyoming: {
    name: 'Wyoming', slug: 'wyoming-tax-calculator',
    incomeTaxRate: '0%', incomeTaxDesc: 'No state income tax on individuals or corporations.',
    salesTax: '4% state (5.36% avg combined)', propertyTax: '0.61%',
    uniqueFact: 'Wyoming has the lowest property tax rate in the nation (0.61%). Coal and natural gas extraction funds government.',
    exampleSalary: '$75,000', exampleTakeHome: '$61,592',
    isNoIncomeTax: true, isFlatTax: false, topRate: '0%',
  },
  newhampshire: {
    name: 'New Hampshire', slug: 'new-hampshire-tax-calculator',
    incomeTaxRate: '0% on wages', incomeTaxDesc: 'No tax on wages. Dividends/interest tax fully phased out by 2025.',
    salesTax: '0% state sales tax', propertyTax: '2.18%',
    uniqueFact: 'New Hampshire has no sales tax AND no income tax on wages — but the 3rd highest property taxes in the U.S.',
    exampleSalary: '$75,000', exampleTakeHome: '$61,592',
    isNoIncomeTax: true, isFlatTax: false, topRate: '0%',
  },
  connecticut: {
    name: 'Connecticut', slug: 'connecticut-tax-calculator',
    incomeTaxRate: '3%–6.99%', incomeTaxDesc: 'Progressive income tax with 7 brackets. Top rate 6.99% above $500,000.',
    salesTax: '6.35%', propertyTax: '2.14%',
    uniqueFact: 'Connecticut has the 2nd highest property tax rate (2.14%) and one of the highest combined tax burdens in the U.S.',
    exampleSalary: '$75,000', exampleTakeHome: '$57,900',
    isNoIncomeTax: false, isFlatTax: false, topRate: '6.99%',
  },
  alabama: {
    name: 'Alabama', slug: 'alabama-tax-calculator',
    incomeTaxRate: '2%–5%', incomeTaxDesc: 'Progressive income tax. 2% on first $500, 4% to $3,000, 5% above $3,000.',
    salesTax: '4% state (9.16% avg combined)', propertyTax: '0.41%',
    uniqueFact: 'Alabama has the LOWEST property tax rate in the nation (0.41%) but one of the highest combined sales taxes (9.16%).',
    exampleSalary: '$75,000', exampleTakeHome: '$60,100',
    isNoIncomeTax: false, isFlatTax: false, topRate: '5%',
  },
  arkansas: {
    name: 'Arkansas', slug: 'arkansas-tax-calculator',
    incomeTaxRate: '2%–4.4%', incomeTaxDesc: 'Progressive income tax. Top rate 4.4% above $25,000.',
    salesTax: '6.5% state (9.3% avg combined)', propertyTax: '0.68%',
    uniqueFact: 'Arkansas has very low income tax brackets — the top rate of 4.4% kicks in at just $25,000.',
    exampleSalary: '$75,000', exampleTakeHome: '$59,800',
    isNoIncomeTax: false, isFlatTax: false, topRate: '4.4%',
  },
  delaware: {
    name: 'Delaware', slug: 'delaware-tax-calculator',
    incomeTaxRate: '2.2%–6.6%', incomeTaxDesc: 'Progressive income tax. Top rate 6.6% above $60,000.',
    salesTax: '0% state sales tax', propertyTax: '0.69%',
    uniqueFact: 'Delaware has NO state sales tax. Over 60% of Fortune 500 companies are incorporated here.',
    exampleSalary: '$75,000', exampleTakeHome: '$58,950',
    isNoIncomeTax: false, isFlatTax: false, topRate: '6.6%',
  },
  hawaii: {
    name: 'Hawaii', slug: 'hawaii-tax-calculator',
    incomeTaxRate: '1.4%–11%', incomeTaxDesc: 'Most progressive income tax in the U.S. 1.4% on first $2,400 up to 11% above $200,000.',
    salesTax: '4% (General Excise Tax)', propertyTax: '0.31%',
    uniqueFact: 'Hawaii has the HIGHEST top income tax rate (11%) but the LOWEST property tax rate (0.31%) in the nation.',
    exampleSalary: '$75,000', exampleTakeHome: '$57,200',
    isNoIncomeTax: false, isFlatTax: false, topRate: '11%',
  },
  idaho: {
    name: 'Idaho', slug: 'idaho-tax-calculator',
    incomeTaxRate: '5.695% flat', incomeTaxDesc: 'Flat income tax rate of 5.695% for 2026.',
    salesTax: '6% state (8.2% avg combined)', propertyTax: '0.75%',
    uniqueFact: 'Idaho switched to a flat tax in 2023 and has been steadily reducing the rate each year.',
    exampleSalary: '$75,000', exampleTakeHome: '$58,750',
    isNoIncomeTax: false, isFlatTax: true, topRate: '5.695%',
  },
  iowa: {
    name: 'Iowa', slug: 'iowa-tax-calculator',
    incomeTaxRate: '4.4%–5.96%', incomeTaxDesc: 'Progressive income tax transitioning to a flat rate. Top rate 5.96% above $78,700.',
    salesTax: '6% state (6.94% avg combined)', propertyTax: '1.53%',
    uniqueFact: 'Iowa is transitioning to a 3.8% flat tax by 2026 — one of the lowest flat rates in the country.',
    exampleSalary: '$75,000', exampleTakeHome: '$58,600',
    isNoIncomeTax: false, isFlatTax: false, topRate: '5.96%',
  },
  kansas: {
    name: 'Kansas', slug: 'kansas-tax-calculator',
    incomeTaxRate: '3.1%–5.7%', incomeTaxDesc: 'Progressive income tax with 3 brackets. Top rate 5.7% above $30,000.',
    salesTax: '6.5% state (8.7% avg combined)', propertyTax: '1.41%',
    uniqueFact: 'Kansas has relatively high property taxes and the state sales tax is among the highest in the Midwest.',
    exampleSalary: '$75,000', exampleTakeHome: '$58,300',
    isNoIncomeTax: false, isFlatTax: false, topRate: '5.7%',
  },
  kentucky: {
    name: 'Kentucky', slug: 'kentucky-tax-calculator',
    incomeTaxRate: '4% flat', incomeTaxDesc: 'Flat income tax rate of 4% for 2026.',
    salesTax: '6% state', propertyTax: '0.86%',
    uniqueFact: 'Kentucky adopted a flat tax in 2018 and has been gradually reducing it (from 5% to 4%).',
    exampleSalary: '$75,000', exampleTakeHome: '$59,950',
    isNoIncomeTax: false, isFlatTax: true, topRate: '4%',
  },
  louisiana: {
    name: 'Louisiana', slug: 'louisiana-tax-calculator',
    incomeTaxRate: '1.85%–4.25%', incomeTaxDesc: 'Progressive income tax. Top rate 4.25% above $50,000.',
    salesTax: '4.45% state (9.55% avg combined)', propertyTax: '0.55%',
    uniqueFact: 'Louisiana has one of the highest combined sales tax rates (9.55%) but very low property taxes (0.55%).',
    exampleSalary: '$75,000', exampleTakeHome: '$59,950',
    isNoIncomeTax: false, isFlatTax: false, topRate: '4.25%',
  },
  maine: {
    name: 'Maine', slug: 'maine-tax-calculator',
    incomeTaxRate: '5.8%–7.15%', incomeTaxDesc: 'Progressive income tax. Top rate 7.15% above $54,450.',
    salesTax: '5.5% state', propertyTax: '1.27%',
    uniqueFact: 'Maine has no local sales taxes — just the state rate of 5.5%, making it one of the lowest sales tax states in New England.',
    exampleSalary: '$75,000', exampleTakeHome: '$58,200',
    isNoIncomeTax: false, isFlatTax: false, topRate: '7.15%',
  },
  mississippi: {
    name: 'Mississippi', slug: 'mississippi-tax-calculator',
    incomeTaxRate: '4.7% flat', incomeTaxDesc: 'Flat income tax rate of 4.7% for 2026.',
    salesTax: '7% state', propertyTax: '0.71%',
    uniqueFact: 'Mississippi has the highest state sales tax rate in the U.S. at 7% (no local add-ons).',
    exampleSalary: '$75,000', exampleTakeHome: '$59,400',
    isNoIncomeTax: false, isFlatTax: true, topRate: '4.7%',
  },
  montana: {
    name: 'Montana', slug: 'montana-tax-calculator',
    incomeTaxRate: '1%–5.9%', incomeTaxDesc: 'Progressive income tax with 7 brackets. Top rate 5.9% above $20,500.',
    salesTax: '0% state sales tax', propertyTax: '0.94%',
    uniqueFact: 'Montana has NO state sales tax — one of only 5 states with none. The state relies on income and property taxes.',
    exampleSalary: '$75,000', exampleTakeHome: '$58,800',
    isNoIncomeTax: false, isFlatTax: false, topRate: '5.9%',
  },
  nebraska: {
    name: 'Nebraska', slug: 'nebraska-tax-calculator',
    incomeTaxRate: '2.46%–5.84%', incomeTaxDesc: 'Progressive income tax with 4 brackets. Top rate 5.84% above $35,720.',
    salesTax: '5.5% state (6.94% avg combined)', propertyTax: '1.69%',
    uniqueFact: 'Nebraska has some of the highest property taxes in the Midwest (1.69%), particularly in agricultural areas.',
    exampleSalary: '$75,000', exampleTakeHome: '$58,450',
    isNoIncomeTax: false, isFlatTax: false, topRate: '5.84%',
  },
  newmexico: {
    name: 'New Mexico', slug: 'new-mexico-tax-calculator',
    incomeTaxRate: '1.7%–5.9%', incomeTaxDesc: 'Progressive income tax with 4 brackets. Top rate 5.9% above $210,000.',
    salesTax: '5.125% state (7.69% avg combined)', propertyTax: '0.79%',
    uniqueFact: 'New Mexico has low income tax brackets — just 1.7% on the first $5,500 of taxable income.',
    exampleSalary: '$75,000', exampleTakeHome: '$59,100',
    isNoIncomeTax: false, isFlatTax: false, topRate: '5.9%',
  },
  northdakota: {
    name: 'North Dakota', slug: 'north-dakota-tax-calculator',
    incomeTaxRate: '1.1%–2.5%', incomeTaxDesc: 'Progressive income tax. Top rate 2.5% above $5,000 — one of the lowest in the nation.',
    salesTax: '5% state (6.96% avg combined)', propertyTax: '1.07%',
    uniqueFact: 'North Dakota has the LOWEST top income tax rate in the nation at just 2.5%. Oil revenue from the Bakken formation funds the state.',
    exampleSalary: '$75,000', exampleTakeHome: '$60,900',
    isNoIncomeTax: false, isFlatTax: false, topRate: '2.5%',
  },
  oklahoma: {
    name: 'Oklahoma', slug: 'oklahoma-tax-calculator',
    incomeTaxRate: '0.25%–4.75%', incomeTaxDesc: 'Progressive income tax with 6 brackets. Top rate 4.75% above $7,200.',
    salesTax: '4.5% state (8.95% avg combined)', propertyTax: '0.95%',
    uniqueFact: 'Oklahoma has one of the lowest income tax bottom brackets — just 0.25% on the first $1,000.',
    exampleSalary: '$75,000', exampleTakeHome: '$59,600',
    isNoIncomeTax: false, isFlatTax: false, topRate: '4.75%',
  },
  rhodeisland: {
    name: 'Rhode Island', slug: 'rhode-island-tax-calculator',
    incomeTaxRate: '3.75%–5.99%', incomeTaxDesc: 'Progressive income tax with 3 brackets. Top rate 5.99% above $68,200.',
    salesTax: '7% state', propertyTax: '1.63%',
    uniqueFact: 'Rhode Island has no local sales taxes — just the state rate of 7%, one of the highest in New England.',
    exampleSalary: '$75,000', exampleTakeHome: '$58,600',
    isNoIncomeTax: false, isFlatTax: false, topRate: '5.99%',
  },
  southcarolina: {
    name: 'South Carolina', slug: 'south-carolina-tax-calculator',
    incomeTaxRate: '0%–6.4%', incomeTaxDesc: 'Progressive income tax. Top rate 6.4% above $17,640. First $3,200 of income is tax-free.',
    salesTax: '6% state (7.44% avg combined)', propertyTax: '0.56%',
    uniqueFact: 'South Carolina exempts the first $3,200 of income from taxation and caps property tax increases for primary residences.',
    exampleSalary: '$75,000', exampleTakeHome: '$59,200',
    isNoIncomeTax: false, isFlatTax: false, topRate: '6.4%',
  },
  utah: {
    name: 'Utah', slug: 'utah-tax-calculator',
    incomeTaxRate: '4.65% flat', incomeTaxDesc: 'Flat income tax rate of 4.65% for 2026.',
    salesTax: '5.95% state (7.19% avg combined)', propertyTax: '0.66%',
    uniqueFact: 'Utah has a flat income tax and relatively low property taxes, making it one of the more tax-friendly Mountain West states.',
    exampleSalary: '$75,000', exampleTakeHome: '$59,300',
    isNoIncomeTax: false, isFlatTax: true, topRate: '4.65%',
  },
  vermont: {
    name: 'Vermont', slug: 'vermont-tax-calculator',
    incomeTaxRate: '3.35%–8.75%', incomeTaxDesc: 'Progressive income tax with 8 brackets. Top rate 8.75% above $251,900.',
    salesTax: '6% state (6.96% avg combined)', propertyTax: '1.86%',
    uniqueFact: 'Vermont has one of the highest top income tax rates (8.75%) and the 4th highest property tax rate in the U.S.',
    exampleSalary: '$75,000', exampleTakeHome: '$57,800',
    isNoIncomeTax: false, isFlatTax: false, topRate: '8.75%',
  },
  westvirginia: {
    name: 'West Virginia', slug: 'west-virginia-tax-calculator',
    incomeTaxRate: '3%–5.12%', incomeTaxDesc: 'Progressive income tax with 5 brackets. Top rate 5.12% above $60,000.',
    salesTax: '6% state', propertyTax: '0.57%',
    uniqueFact: 'West Virginia has been gradually eliminating its income tax and has some of the lowest property taxes in the nation.',
    exampleSalary: '$75,000', exampleTakeHome: '$59,100',
    isNoIncomeTax: false, isFlatTax: false, topRate: '5.12%',
  },
};

/**
 * Generate unique content for a state from its tax data.
 * This replaces the generic default content with state-specific text.
 */
export function generateStateContent(stateKey: string) {
  const data = STATE_TAX_DATA[stateKey];
  if (!data) return null;

  const taxType = data.isNoIncomeTax
    ? 'no state income tax'
    : data.isFlatTax
    ? `a flat ${data.incomeTaxRate} income tax`
    : `a progressive income tax ranging from ${data.incomeTaxRate}`;

  const comparisonText = data.isNoIncomeTax
    ? `Living in ${data.name} means ${data.uniqueFact.toLowerCase()} On a ${data.exampleSalary} salary, your take-home pay is approximately ${data.exampleTakeHome} per year — the same as other no-income-tax states like Texas and Florida.`
    : `${data.name} has ${taxType}. ${data.uniqueFact} On a ${data.exampleSalary} salary (single filer), your take-home pay is approximately ${data.exampleTakeHome} per year after federal tax, FICA, and state income tax.`;

  return {
    howItWorks: [
      `${data.name} ${data.isNoIncomeTax ? 'has no state income tax' : `income tax rate: ${data.incomeTaxRate}`}. ${data.incomeTaxDesc} This means your paycheck in ${data.name} is only reduced by federal income tax and FICA — ${data.isNoIncomeTax ? 'no state tax line item at all' : `plus state tax at ${data.topRate} top rate`}.`,
      `The 2026 federal tax brackets apply the same way in ${data.name} as everywhere else: 10%–37% progressive rates after the $16,100 standard deduction (single) or $32,200 (married). FICA adds 6.2% Social Security (up to $184,500) + 1.45% Medicare.`,
      comparisonText,
      `${data.name} also has a ${data.salesTax} sales tax and ${data.propertyTax} average effective property tax rate. ${data.uniqueFact}`,
      `Use the calculator above to see your exact take-home pay in ${data.name}. Enter your salary, filing status, and any pre-tax deductions to get an instant, accurate result — no sign-up required.`,
    ],
    calculationMethod: {
      formula: data.isNoIncomeTax
        ? `Net Pay = Gross Income − (Federal Tax + FICA) — ${data.name} has no state income tax`
        : `Net Pay = Gross Income − (Federal Tax + State Tax + FICA)`,
      steps: [
        data.isNoIncomeTax
          ? `${data.name} has 0% state income tax — skip state tax entirely`
          : `Apply ${data.name} ${data.isFlatTax ? 'flat' : 'progressive'} income tax (${data.incomeTaxRate})`,
        'Subtract pre-tax deductions (401(k), HSA) from gross pay',
        'Apply federal standard deduction ($16,100 single / $32,200 married)',
        'Calculate federal tax using progressive brackets (10%–37%)',
        'Calculate FICA: 6.2% Social Security (up to $184,500) + 1.45% Medicare',
        'Subtract all taxes from gross pay to get net take-home pay',
      ],
      example: `$${data.exampleSalary.replace(/[^0-9]/g, '')} salary, single in ${data.name}: Federal tax ≈ $7,670. FICA = $5,738. ${data.isNoIncomeTax ? 'State tax = $0.' : `State tax varies.`} Net ≈ ${data.exampleTakeHome}/year.`,
    },
    keyRates: [
      { label: `${data.name} Income Tax`, value: data.incomeTaxRate },
      { label: `${data.name} Sales Tax`, value: data.salesTax },
      { label: `${data.name} Property Tax`, value: data.propertyTax },
      { label: 'Federal Standard Deduction', value: '$16,100 (single)' },
      { label: 'FICA Social Security', value: '6.2% (up to $184,500)' },
    ],
    faqs: [
      {
        question: `Does ${data.name} have a state income tax?`,
        answer: data.isNoIncomeTax
          ? `No. ${data.name} has no state income tax on wages. ${data.incomeTaxDesc}`
          : `Yes. ${data.name} has ${taxType}. ${data.incomeTaxDesc}`,
      },
      {
        question: `What is the tax rate in ${data.name}?`,
        answer: `${data.name} has a ${data.incomeTaxRate} income tax rate, ${data.salesTax} sales tax, and ${data.propertyTax} average property tax rate. ${data.uniqueFact}`,
      },
      {
        question: `How much is $75,000 after taxes in ${data.name}?`,
        answer: `On a $75,000 salary in ${data.name} (single filer), your take-home pay is approximately ${data.exampleTakeHome} per year. This includes federal tax (~$7,670), FICA (~$5,738), and ${data.isNoIncomeTax ? '$0 state tax' : 'state income tax'}. Your monthly take-home would be about $${Math.round(parseInt(data.exampleTakeHome.replace(/[^0-9]/g, '')) / 12).toLocaleString()}.`,
      },
      {
        question: `Is ${data.name} a tax-friendly state?`,
        answer: data.isNoIncomeTax
          ? `Yes, ${data.name} is very tax-friendly for income — zero state income tax means you keep more of your paycheck. However, ${data.name} compensates with ${data.salesTax} sales tax and ${data.propertyTax} property tax. The overall burden depends on your spending and homeownership situation.`
          : `${data.name} has a ${data.topRate} top income tax rate, which is ${parseFloat(data.topRate) < 5 ? 'among the lowest' : parseFloat(data.topRate) < 7 ? 'moderate' : 'among the highest'} in the nation. Combined with ${data.salesTax} sales tax and ${data.propertyTax} property tax, the overall tax burden is ${parseFloat(data.topRate) < 5 ? 'relatively low' : 'moderate to high'} compared to other states.`,
      },
      {
        question: `Does ${data.name} tax retirement income?`,
        answer: data.isNoIncomeTax
          ? `No. ${data.name} has no state income tax, so Social Security, 401(k) withdrawals, IRAs, and pensions are all tax-free at the state level.`
          : `${data.name} taxes retirement income as part of your regular income at the ${data.incomeTaxRate} rate. Some states exempt Social Security or pension income — check with a tax professional for your specific situation.`,
      },
    ],
    relatedCalculators: [
      { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
      { slug: 'texas-tax-calculator', label: 'Texas Calculator (0% tax)' },
      { slug: 'florida-tax-calculator', label: 'Florida Calculator (0% tax)' },
      { slug: 'california-tax-calculator', label: 'California Calculator' },
      { slug: 'illinois-tax-calculator', label: 'Illinois Calculator' },
      { slug: 'relocation-calculator', label: 'Relocation Calculator' },
    ],
  };
}
