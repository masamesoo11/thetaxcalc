/**
 * Shared State Sales Tax Data for all 50 US states.
 * Used by both Server and Client components.
 * NO 'use client' — this module is universal.
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

  if (state.noStateTax) {
    return {
      metaTitle: `${name} Sales Tax Calculator 2026 | 0% Tax`,
      metaDesc: `Free ${name} sales tax calculator for 2026. ${name} has 0% state sales tax${state.abbreviation === 'AK' ? ', but local taxes may apply (avg 1.82%)' : ' — no sales tax at all'}. See what taxes apply and what doesn't. No sign-up required.`,
      h1: `${name} Sales Tax Calculator`,
      ogTitle: `${name} Sales Tax Calculator 2026 — 0% State Sales Tax`,
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
  const localPct = pct(state.avgLocalRate);
  const combinedPct = pct(state.combinedRate);

  return {
    metaTitle: `${name} Sales Tax 2026 | ${combinedPct}% Combined`,
    metaDesc: `Free ${name} sales tax calculator for 2026. Calculate sales tax at ${statePct}% state + ${localPct}% average local = ${combinedPct}% combined rate. Includes reverse calculator and tax-exempt items. No sign-up required.`,
    h1: `${name} Sales Tax Calculator`,
    ogTitle: `${name} Sales Tax Calculator 2026 — ${statePct}% State + Local Rates`,
    ogDescription: `Free ${name} sales tax calculator. ${statePct}% state + ${localPct}% local = ${combinedPct}% combined rate. Reverse calculator & exemptions included. No sign-up.`,
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

// ─── State Content Generator ─────────────────────────────────────────────────

export function getStateContent(stateKey: string): StateContent {
  const state = STATE_SALES_TAX[stateKey];
  if (!state) {
    return { howItWorks: [], keyRates: [], faqs: [], relatedStates: [] };
  }

  const name = state.name;
  const abbr = state.abbreviation;
  const relatedStates = getRelatedStates(stateKey);

  if (state.noStateTax) {
    return getNoTaxStateContent(stateKey, state, relatedStates);
  }

  const statePct = formatRate(state.stateRate);
  const localPct = pct(state.avgLocalRate);
  const combinedPct = pct(state.combinedRate);

  // Tax on $1,000 example
  const taxOn1000 = (1000 * state.combinedRate).toFixed(2);
  const totalOn1000 = (1000 * (1 + state.combinedRate)).toFixed(2);

  const exemptList: string[] = [];
  if (state.groceryExempt) exemptList.push('groceries');
  if (state.prescriptionDrugExempt) exemptList.push('prescription drugs');
  if (state.clothingExempt) exemptList.push('clothing');
  const taxableList: string[] = [];
  if (!state.groceryExempt) taxableList.push('groceries');
  if (!state.prescriptionDrugExempt) taxableList.push('prescription drugs');
  if (!state.clothingExempt) taxableList.push('clothing');

  const howItWorks = [
    `${name} charges a ${statePct}% state sales tax rate. On top of that, local jurisdictions (counties, cities, special districts) add their own taxes, bringing the average combined rate to ${combinedPct}%. That means on a $1,000 purchase, you'd pay approximately $${taxOn1000} in sales tax for a total of $${totalOn1000}.`,

    `The ${name} state rate of ${statePct}% applies uniformly across the state${state.avgLocalRate > 0 ? `, but local surtaxes vary significantly by location. The average local rate across ${abbr} is ${localPct}%, but some cities and counties charge more or less than this average` : ', and there are no local sales tax additions'}. ${state.avgLocalRate > 0 ? 'This calculator uses the average local rate, but you can override it with your specific city rate for a more accurate calculation.' : 'This makes the calculation straightforward — the state rate is what you pay everywhere.'}`,

    `${exemptList.length > 0 ? `Good news: ${name} exempts ${exemptList.join(', ')} from state sales tax. ` : ''}${taxableList.length > 0 ? `However, ${taxableList.join(', ')} are still subject to sales tax in ${name}. ` : ''}These exemptions can make a real difference in your annual spending, especially on groceries which are a recurring expense for every household.`,

    `Need to work backwards? If you have a total receipt and need to find the original price before tax, use the reverse sales tax formula: divide the total by (1 + tax rate). For example, a $${totalOn1000} total with ${combinedPct}% tax means the original price was $1,000 ($${totalOn1000} ÷ 1.${combinedPct.replace('.', '')}). This is useful for expense reports and bookkeeping.`,

    `Since the 2018 <a href="https://www.oyez.org/cases/2017/17-494" target="_blank" rel="noopener noreferrer nofollow">South Dakota v. Wayfair</a> Supreme Court decision, online retailers must collect ${name} sales tax on purchases shipped to ${abbr} residents. Most online purchases now include ${name} sales tax based on the buyer's location, including any applicable local taxes.`,
  ];

  const keyRates = [
    { label: `${name} State Rate`, value: `${statePct}%` },
    { label: `${name} Avg Local Rate`, value: `${localPct}%` },
    { label: `${name} Combined Rate`, value: `${combinedPct}%` },
    { label: 'Tax on $1,000', value: `$${taxOn1000}` },
    { label: 'Total on $1,000', value: `$${totalOn1000}` },
  ];

  const faqs = [
    {
      question: `What is the sales tax rate in ${name}?`,
      answer: `The state sales tax rate in ${name} is ${statePct}%. With average local taxes, the combined rate is approximately ${combinedPct}%. Actual rates may vary by city and county within ${name}.`,
    },
    {
      question: `${state.avgLocalRate > 0 ? `Why does the sales tax rate vary within ${name}?` : `Does ${name} have local sales tax?`}`,
      answer: state.avgLocalRate > 0
        ? `${name} allows local jurisdictions (counties, cities, and special districts) to add their own sales taxes on top of the ${statePct}% state rate. These local rates vary by location, which is why you might pay a different total rate in different cities within ${name}.`
        : `${name} does not allow local jurisdictions to add their own sales taxes. The ${statePct}% state rate applies uniformly across the entire state.`,
    },
    {
      question: `What items are exempt from sales tax in ${name}?`,
      answer: `In ${name}, ${exemptList.length > 0 ? exemptList.join(', ') + ' are exempt from state sales tax' : 'there are no major exemptions from state sales tax'}.${taxableList.length > 0 ? ` However, ${taxableList.join(', ')} are still subject to sales tax.` : ''} Exemptions may vary at the local level.`,
    },
    {
      question: `How do I calculate sales tax in ${name}?`,
      answer: `Multiply the purchase price by the combined tax rate. For example, on a $100 purchase at the ${combinedPct}% combined rate in ${name}: $100 × 0.${combinedPct.replace('.', '')} = $${(100 * state.combinedRate).toFixed(2)} in tax. Total price: $${(100 * (1 + state.combinedRate)).toFixed(2)}.`,
    },
    {
      question: `Does ${name} charge sales tax on online purchases?`,
      answer: `Yes. Following the 2018 South Dakota v. Wayfair Supreme Court ruling, online retailers must collect ${name} sales tax on purchases shipped to ${name} residents. The rate is based on the buyer's location within ${name}.`,
    },
  ];

  return { howItWorks, keyRates, faqs, relatedStates };
}

// ─── No-Tax State Content ────────────────────────────────────────────────────

function getNoTaxStateContent(stateKey: string, state: StateSalesTax, relatedStates: { slug: string; label: string }[]): StateContent {
  const name = state.name;
  const abbr = state.abbreviation;

  const noTaxDetails: Record<string, { reason: string; alternatives: string }> = {
    delaware: {
      reason: 'Delaware has never had a sales tax. The state relies on its franchise tax on corporations (thanks to being the incorporation capital of the US) and its gross receipts tax on businesses instead.',
      alternatives: 'Delaware charges a gross receipts tax on businesses (0.0945% to 1.9913%) which is technically paid by the seller, though some costs may be passed to consumers through higher prices.',
    },
    montana: {
      reason: 'Montana has no state sales tax and no local sales taxes. The state relies on income tax and property tax to fund government services. Montana voters have rejected sales tax proposals multiple times.',
      alternatives: 'Montana charges a state income tax (1% to 5.9%) and property taxes. Some tourist-heavy areas near national parks have considered resort taxes, but statewide sales tax remains at 0%.',
    },
    newhampshire: {
      reason: 'New Hampshire has no state sales tax and no local sales tax. The state prides itself on this and funds government through property taxes, business taxes, and meals/rooms taxes instead.',
      alternatives: 'While there\'s no general sales tax, New Hampshire does charge a 9% tax on restaurant meals, 9% on hotel rooms, and 9% on motor vehicle rentals. These are targeted taxes, not a general sales tax.',
    },
    oregon: {
      reason: 'Oregon has no state sales tax. The state relies on its progressive income tax (4.75% to 9.9%) and property taxes. Oregon voters have rejected sales tax proposals multiple times — most recently in the 1990s.',
      alternatives: 'Oregon has one of the highest state income tax rates in the country (up to 9.9%), plus property taxes. Some cities charge a small local tax on prepared food and beverages, but there is no general sales tax.',
    },
    alaska: {
      reason: 'Alaska has no state sales tax. Instead, the state relies heavily on oil revenue and the Alaska Permanent Fund to fund government services. In fact, Alaska pays residents a dividend each year from the Permanent Fund.',
      alternatives: 'While there\'s no state sales tax, many Alaska municipalities do charge local sales taxes. The average local rate is about 1.82%, and some cities charge up to 7.5%. These local taxes fund city and borough services.',
    },
  };

  const details = noTaxDetails[stateKey] || {
    reason: `${name} has no state sales tax.`,
    alternatives: `${name} funds government through other tax mechanisms.`,
  };

  const howItWorks = [
    `${name} has <strong>0% state sales tax</strong>. ${details.reason} This means when you buy most goods and services in ${name}, no sales tax is added to the purchase price. A $100 item costs $100 — not $107 or $108 like in most other states.`,

    `${details.alternatives}`,

    stateKey === 'alaska'
      ? `Even though Alaska has no state sales tax, many local municipalities add their own. The average local sales tax across Alaska is about 1.82%. Some cities like Juneau charge up to 5%, while others like Anchorage charge 0%. This calculator can handle the local rate — just enter your city's rate if you know it.`
      : `${name} is one of only four US states with zero sales tax at both the state and local level (Delaware, Montana, New Hampshire, Oregon). Alaska has no state sales tax but allows local taxes. For shoppers, ${name} is about as good as it gets — no surprise taxes at the register.`,

    `If you're shopping online from ${name}, you generally won't pay sales tax on most purchases since there's no ${name} sales tax to collect. However, if an out-of-state retailer has a physical presence in a tax-collecting state, the rules can get complicated. For most everyday online shopping, ${name} residents enjoy tax-free purchases.`,

    `Curious how ${name} compares to neighboring states? ${relatedStates.length > 0 ? `Nearby states like ${relatedStates.slice(0, 3).map(r => STATE_SALES_TAX[r.slug]?.name || r.slug).join(', ')} do charge sales tax, so cross-border shopping trips from those states into ${name} are common.` : 'Check out our other state calculators to compare.'} Use our <a href="/sales-tax-calculator">general sales tax calculator</a> to see rates for any state.`,
  ];

  const keyRates = [
    { label: `${name} State Rate`, value: '0%' },
    { label: `${name} Local Rate`, value: stateKey === 'alaska' ? 'Avg 1.82% (varies by city)' : '0%' },
    { label: `${name} Combined Rate`, value: stateKey === 'alaska' ? '~1.82% (local only)' : '0%' },
    { label: 'Tax on $1,000', value: stateKey === 'alaska' ? '~$18.20 (local only)' : '$0.00' },
    { label: 'No-Tax States', value: 'DE, MT, NH, OR (AK: local only)' },
  ];

  const faqs = [
    {
      question: `Does ${name} have sales tax?`,
      answer: `No. ${name} has no state sales tax${stateKey === 'alaska' ? ', though some local municipalities may charge their own sales taxes' : ' and no local sales taxes either'}. Most purchases in ${name} are tax-free at the point of sale.`,
    },
    {
      question: `How does ${name} fund government without sales tax?`,
      answer: details.reason.replace(`${name} has never had a sales tax. `, '').replace(`${name} has no state sales tax. `, '').replace(`${name} has no state sales tax and no local sales tax. The state prides itself on this and `, '').replace(`${name} has no state sales tax. Instead, the state `, 'The state '),
    },
    {
      question: stateKey === 'alaska' ? 'Do any cities in Alaska charge sales tax?' : `Are there any taxes on purchases in ${name}?`,
      answer: stateKey === 'alaska'
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
      answer: `It depends on what you're buying. On a $1,000 purchase in a state with 8% sales tax, you'd save $80. On a $10,000 purchase, that's $800. For big-ticket items, the savings can justify a trip, especially if you live near the ${name} border. Just remember that your home state may require you to report and pay use tax on out-of-state purchases.`,
    },
  ];

  return { howItWorks, keyRates, faqs, relatedStates };
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

  const variableMeasured = state.noStateTax
    ? [
        { '@type': 'PropertyValue', name: `${state.name} State Sales Tax Rate`, value: '0%' },
        ...(stateKey === 'alaska'
          ? [{ '@type': 'PropertyValue', name: 'Alaska Average Local Rate', value: `${localPct}%` }]
          : []),
        { '@type': 'PropertyValue', name: 'No Sales Tax States', value: 'DE, MT, NH, OR (AK: local only)' },
      ]
    : [
        { '@type': 'PropertyValue', name: `${state.name} State Rate`, value: `${statePct}%` },
        { '@type': 'PropertyValue', name: `${state.name} Average Local Rate`, value: `${localPct}%` },
        { '@type': 'PropertyValue', name: `${state.name} Combined Rate`, value: `${combinedPct}%` },
        ...(state.groceryExempt ? [{ '@type': 'PropertyValue', name: `${state.name} Grocery Exemption`, value: 'Yes — groceries are exempt' }] : []),
        ...(state.clothingExempt ? [{ '@type': 'PropertyValue', name: `${state.name} Clothing Exemption`, value: 'Yes — clothing is exempt' }] : []),
      ];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Sales Tax Calculator', item: `${siteUrl}/sales-tax-calculator` },
          { '@type': 'ListItem', position: 3, name: `${state.name} Sales Tax`, item: url },
        ],
      },
      {
        '@type': 'WebPage',
        name: `${state.name} Sales Tax Calculator 2026`,
        description: `Calculate sales tax for ${state.name}. ${state.noStateTax ? 'No state sales tax.' : `Combined rate: ${combinedPct}%.`} Free, no sign-up required.`,
        url,
        inLanguage: 'en-US',
        dateModified: '2026-01-01',
      },
      {
        '@type': 'WebApplication',
        name: `${state.name} Sales Tax Calculator 2026`,
        url,
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      },
      {
        '@type': 'Dataset',
        name: `2026 ${state.name} Sales Tax Rates`,
        description: `Combined state and local sales tax rates for ${state.name} in 2026.`,
        creator: { '@type': 'Organization', name: 'TheTaxCalc', url: siteUrl },
        license: `${siteUrl}/terms`,
        variableMeasured,
      },
      {
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
