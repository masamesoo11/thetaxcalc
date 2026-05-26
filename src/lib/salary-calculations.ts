/**
 * Salary After Tax Calculation Utilities
 * Generates take-home pay data for programmatic SEO salary pages.
 * Uses the project's existing tax-config.ts brackets and finance-utils.ts functions.
 */

import {
  calculateFederalTax,
  calculateFICA,
  calculateStateTax,
  roundCurrency,
} from './finance-utils';

// ─── Salary Amounts for Static Generation ──────────────────────────────────────

export const SALARY_AMOUNTS = [
  30000, 35000, 40000, 45000, 50000, 55000, 60000, 65000, 70000, 75000,
  80000, 85000, 90000, 95000, 100000, 110000, 120000, 130000, 140000,
  150000, 175000, 200000, 250000, 300000, 400000, 500000,
] as const;

export type SalaryAmount = (typeof SALARY_AMOUNTS)[number];

// ─── State Keys ─────────────────────────────────────────────────────────────────

export const STATE_KEYS = ['illinois', 'texas', 'florida', 'california', 'newyork'] as const;
export type StateKey = (typeof STATE_KEYS)[number];

export const STATE_LABELS: Record<StateKey, { name: string; abbr: string }> = {
  illinois: { name: 'Illinois', abbr: 'IL' },
  texas: { name: 'Texas', abbr: 'TX' },
  florida: { name: 'Florida', abbr: 'FL' },
  california: { name: 'California', abbr: 'CA' },
  newyork: { name: 'New York', abbr: 'NY' },
};

// ─── Salary Calculation Result Per State ────────────────────────────────────────

export interface StateTakeHome {
  stateKey: StateKey;
  stateName: string;
  stateAbbr: string;
  grossAnnual: number;
  federalTax: number;
  ficaTotal: number;
  ficaSS: number;
  ficaMedicare: number;
  stateTax: number;
  totalDeductions: number;
  netAnnual: number;
  effectiveTaxRate: number;
  // Pay period breakdowns
  netMonthly: number;
  netBiweekly: number;
  netWeekly: number;
}

export interface SalaryCalculationResult {
  salary: number;
  salaryFormatted: string;
  salaryCompact: string;
  states: StateTakeHome[];
  lowestNet: StateTakeHome;
  highestNet: StateTakeHome;
}

// ─── Format Helpers ─────────────────────────────────────────────────────────────

export function formatSalary(amount: number): string {
  return `$${amount.toLocaleString('en-US')}`;
}

export function formatSalaryCompact(amount: number): string {
  if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `$${(amount / 1000)}K`;
  return `$${amount}`;
}

export function fmt(amount: number): string {
  return roundCurrency(amount).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function fmtFull(amount: number): string {
  return roundCurrency(amount).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// ─── Core Calculation ───────────────────────────────────────────────────────────

export function calculateSalaryTakeHome(salary: number): SalaryCalculationResult {
  const federalTax = calculateFederalTax(salary, 'single');
  const fica = calculateFICA(salary);

  const states: StateTakeHome[] = STATE_KEYS.map((stateKey) => {
    const stateTax = calculateStateTax(salary, stateKey, 'single');
    const totalDeductions = federalTax + fica.total + stateTax;
    const netAnnual = salary - totalDeductions;
    const effectiveTaxRate = salary > 0 ? totalDeductions / salary : 0;

    return {
      stateKey,
      stateName: STATE_LABELS[stateKey].name,
      stateAbbr: STATE_LABELS[stateKey].abbr,
      grossAnnual: salary,
      federalTax: roundCurrency(federalTax),
      ficaTotal: roundCurrency(fica.total),
      ficaSS: roundCurrency(fica.socialSecurity),
      ficaMedicare: roundCurrency(fica.medicare + fica.additionalMedicare),
      stateTax: roundCurrency(stateTax),
      totalDeductions: roundCurrency(totalDeductions),
      netAnnual: roundCurrency(netAnnual),
      effectiveTaxRate: roundCurrency(effectiveTaxRate * 100) / 100,
      netMonthly: roundCurrency(netAnnual / 12),
      netBiweekly: roundCurrency(netAnnual / 26),
      netWeekly: roundCurrency(netAnnual / 52),
    };
  });

  // Sort by net annual (highest first)
  const sorted = [...states].sort((a, b) => b.netAnnual - a.netAnnual);

  return {
    salary,
    salaryFormatted: formatSalary(salary),
    salaryCompact: formatSalaryCompact(salary),
    states,
    highestNet: sorted[0],
    lowestNet: sorted[sorted.length - 1],
  };
}

// ─── Salary Groupings for Landing Page ──────────────────────────────────────────

export interface SalaryGroup {
  label: string;
  range: string;
  min: number;
  max: number;
  amounts: number[];
}

export const SALARY_GROUPS: SalaryGroup[] = [
  { label: '$30K – $50K', range: 'Entry Level', min: 30000, max: 50000, amounts: [] },
  { label: '$50K – $75K', range: 'Mid Level', min: 50000, max: 75000, amounts: [] },
  { label: '$75K – $100K', range: 'Upper Mid', min: 75000, max: 100000, amounts: [] },
  { label: '$100K – $150K', range: 'Senior Level', min: 100000, max: 150000, amounts: [] },
  { label: '$150K – $200K', range: 'Executive', min: 150000, max: 200000, amounts: [] },
  { label: '$200K+', range: 'Top Earners', min: 200000, max: Infinity, amounts: [] },
];

export function getGroupedSalaries(): SalaryGroup[] {
  return SALARY_GROUPS.map((group) => ({
    ...group,
    amounts: SALARY_AMOUNTS.filter(
      (s) => s >= group.min && s <= group.max
    ),
  })).filter((group) => group.amounts.length > 0);
}

// ─── FAQ Generation ─────────────────────────────────────────────────────────────

export interface FAQItem {
  question: string;
  answer: string;
}

export function generateFAQs(salary: number): FAQItem[] {
  const formatted = formatSalary(salary);
  const calc = calculateSalaryTakeHome(salary);
  const txNet = calc.states.find((s) => s.stateKey === 'texas')!.netAnnual;
  const caNet = calc.states.find((s) => s.stateKey === 'california')!.netAnnual;

  const faqs: FAQItem[] = [
    {
      question: `How much is ${formatted} after tax in Texas?`,
      answer: `On a ${formatted} salary in Texas, your take-home pay is approximately ${fmt(txNet)} per year after federal tax and FICA deductions. Texas has no state income tax, so you keep more of your earnings compared to most states.`,
    },
    {
      question: `How much is ${formatted} after tax in California?`,
      answer: `On a ${formatted} salary in California, your take-home pay is approximately ${fmt(caNet)} per year after federal tax, FICA, and California state income tax. California has progressive tax brackets from 1% to 13.3%.`,
    },
    {
      question: `Is ${formatted} a good salary?`,
      answer: getGoodSalaryAnswer(salary),
    },
  ];

  // Add a fourth FAQ that varies by salary level
  if (salary <= 50000) {
    faqs.push({
      question: `Can I live comfortably on ${formatted} a year?`,
      answer: `Living comfortably on ${formatted} depends on your location and lifestyle. In low-cost states like Texas or Florida, ${formatted} can provide a modest but manageable lifestyle. In high-cost areas like California or New York, it may be tight. Consider housing costs, which are typically your biggest expense — aim to keep rent under 30% of your take-home pay of about ${fmt(txNet)}/year.`,
    });
  } else if (salary <= 100000) {
    faqs.push({
      question: `What is the hourly rate for ${formatted} a year?`,
      answer: `A ${formatted} annual salary equals approximately $${(salary / 2080).toFixed(2)} per hour (based on 2,080 working hours per year). Your effective hourly take-home pay after taxes ranges from about $${(calc.lowestNet.netAnnual / 2080).toFixed(2)} (in ${calc.lowestNet.stateName}) to $${(calc.highestNet.netAnnual / 2080).toFixed(2)} (in ${calc.highestNet.stateName}).`,
    });
  } else if (salary <= 200000) {
    faqs.push({
      question: `What tax bracket is ${formatted} in?`,
      answer: `A ${formatted} salary for a single filer falls in the ${getFederalBracketLabel(salary)} federal tax bracket. However, your effective (average) tax rate is lower because of progressive brackets — only income above each threshold is taxed at the higher rate. Your effective federal tax rate on ${formatted} is approximately ${((calc.states[0].federalTax / salary) * 100).toFixed(1)}%.`,
    });
  } else {
    faqs.push({
      question: `How much additional Medicare tax do you pay on ${formatted}?`,
      answer: `On a ${formatted} salary, you pay the standard 1.45% Medicare tax on all wages, plus an additional 0.9% Medicare tax on earnings above $200,000. This means your additional Medicare surtax is approximately ${fmt(Math.max(0, salary - 200000) * 0.009)}. High earners should also be aware of the Net Investment Income Tax (NIIT) of 3.8% on investment income.`,
    });
  }

  return faqs;
}

function getGoodSalaryAnswer(salary: number): string {
  if (salary <= 40000) {
    return `A ${formatSalary(salary)} salary is below the U.S. median household income. It may be sufficient for a single person in a low-cost area, but could be challenging in major metropolitan regions. Focus on keeping housing costs low and building an emergency fund.`;
  }
  if (salary <= 60000) {
    return `A ${formatSalary(salary)} salary is close to the U.S. median individual income. It's a solid salary for a single person in most areas, though it may feel tight in high-cost cities like San Francisco or New York. You can live comfortably in states with no income tax like Texas or Florida.`;
  }
  if (salary <= 80000) {
    return `A ${formatSalary(salary)} salary is above the U.S. median individual income and considered good in most areas. You can live comfortably as a single person and support a modest family lifestyle in lower-cost regions. In Texas or Florida, your take-home pay would be significantly higher due to zero state income tax.`;
  }
  if (salary <= 120000) {
    return `A ${formatSalary(salary)} salary is well above the U.S. median and is considered a strong income in most markets. You can afford a comfortable lifestyle in most cities, though high-cost areas like the SF Bay Area or Manhattan may still feel expensive. Consider maximizing your 401(k) contributions to lower your taxable income.`;
  }
  if (salary <= 200000) {
    return `A ${formatSalary(salary)} salary puts you in the top 10-15% of U.S. earners. This is an excellent income that allows for comfortable living, homeownership, and significant savings in most markets. In high-tax states like California or New York, you'll feel the impact of progressive tax brackets — consider tax-advantaged accounts to optimize your take-home pay.`;
  }
  return `A ${formatSalary(salary)} salary places you among the top earners in the U.S. At this income level, tax optimization becomes crucial — the difference between living in a no-tax state (TX/FL) vs. a high-tax state (CA/NY) can mean tens of thousands of dollars annually. Consider working with a tax advisor to maximize deductions and plan for alternative minimum tax implications.`;
}

function getFederalBracketLabel(salary: number): string {
  const taxableIncome = salary - 15000; // Single standard deduction
  if (taxableIncome <= 11600) return '10%';
  if (taxableIncome <= 47150) return '12%';
  if (taxableIncome <= 100525) return '22%';
  if (taxableIncome <= 191950) return '24%';
  if (taxableIncome <= 243725) return '32%';
  if (taxableIncome <= 609350) return '35%';
  return '37%';
}

// ─── URL Slug Helper ────────────────────────────────────────────────────────────

export function salaryToSlug(amount: number): string {
  return String(amount);
}

export function slugToSalary(slug: string): number | null {
  const num = parseInt(slug, 10);
  if (isNaN(num) || num <= 0) return null;
  return num;
}

export function isValidSalaryAmount(amount: number): boolean {
  return SALARY_AMOUNTS.includes(amount as SalaryAmount);
}
