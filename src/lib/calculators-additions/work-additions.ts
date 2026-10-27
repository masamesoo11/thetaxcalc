/**
 * Work group additions - Task 39-d.
 *
 * Definitions for two NEW calculators:
 *   - time-card-calculator (componentKey 'time-card'): a weekly TIMESHEET tool -
 *     clock in/out per day, decimal hours, FLSA overtime over 40 h, gross pay.
 *     Distinct from /paycheck-calculator (take-home) and
 *     /hourly-to-salary-calculator (rate conversions): this is work-hours math,
 *     not tax math.
 *   - payroll-calculator (componentKey 'payroll'): a per-PAYCHECK payroll run
 *     from the employer's seat - gross, employee deductions, employer
 *     contributions, true cost per period. Complements /employee-cost-calculator
 *     (annual/strategic) with the pay-period stub view.
 *
 * Every tax figure quoted in this copy comes from the site's own config
 * (FICA_2026 / FEDERAL_TAX_2026 in src/lib/tax-config) and every arithmetic
 * claim was verified with bun against src/lib/time-math.ts:
 *   - Mon-Fri 9:00-17:00 with a 30-min break = 7.5 h/day = 37.5 h/week = $750.00 at $20/hr
 *   - 37.5 h regular + 2.5 h overtime at $20/hr = $750.00 + $75.00 = $825.00
 *   - 40 h regular + 2.5 h overtime at $20/hr = $800.00 + $75.00 = $875.00
 *   - FICA on $60,000: $3,720.00 SS + $870.00 Medicare = $4,590.00 per side
 *   - Federal income tax est. on $60,000 (single, $16,100 std ded): $5,020.00
 *   - FUTA $42.00/yr; SUTA 3.0% on $9,500 = $285.00/yr; workers comp 1% = $600.00/yr
 *   - $60,000 monthly run: gross $5,000.00, employee FICA $382.50, fed tax $418.33,
 *     net $4,199.17, employer total $5,459.75/period = $65,517.00/yr = +9.2%
 */

import type { CalculatorRouteConfig } from '@/lib/calculator-routes';
import type { FAQItem } from '@/lib/faq-data';

// ─── Route definitions ────────────────────────────────────────────────────────

export const WORK_ROUTES: CalculatorRouteConfig[] = [
  {
    slug: 'time-card-calculator',
    title: 'Time Card Calculator - Weekly Timesheet Hours & Gross Pay',
    description:
      'Free time card calculator: enter daily clock-in and clock-out times, get weekly work hours in decimal, overtime past 40 hours at 1.5x pay, and gross wages.',
    h1: 'Time Card Calculator',
    metaTitle: 'Time Card Calculator 2026 - Weekly Hours & Gross Pay',
    metaDesc:
      'Enter clock in and clock out times for each day of the week. Get decimal work hours, overtime over 40 at 1.5x, and weekly gross pay. Free, no sign-up.',
    keywords: [
      'time card calculator',
      'time clock calculator',
      'work hours calculator',
      'hours calculator',
      'weekly timesheet calculator',
      'timesheet calculator with overtime',
      'clock in clock out calculator',
      'time card hours to decimal',
      'punch clock calculator',
      'workweek hours calculator',
      'time card overtime calculator',
      'free time card calculator',
    ],
    componentKey: 'time-card',
    category: 'paycheck',
    breadcrumbLabel: 'Time Card Calculator',
    ogTitle: 'Time Card Calculator 2026 - Weekly Hours & Gross Pay',
    ogDescription:
      'Clock in, clock out, unpaid breaks - get decimal hours, overtime past 40 at 1.5x, and weekly gross pay. Free work hours and time clock calculator.',
    canonicalPath: '/time-card-calculator',
    jsonLdType: 'time-card',
  },
  {
    slug: 'payroll-calculator',
    title: 'Payroll Calculator 2026 - Employer Cost Per Pay Period',
    description:
      'Free payroll calculator from the employer seat: per-period gross wages, employee deductions, employer FICA match, FUTA, SUTA, and your true cost per period.',
    h1: 'Payroll Calculator',
    metaTitle: 'Payroll Calculator 2026 - True Employer Cost Per Period',
    metaDesc:
      'Run payroll in seconds: per-period gross, employee deductions, employer FICA match, FUTA, SUTA, benefits and your true cost per paycheck. Free 2026 tool.',
    keywords: [
      'payroll calculator',
      'payroll cost calculator',
      'employer payroll tax calculator',
      'payroll calculator per paycheck',
      'employer FICA match calculator',
      'FUTA SUTA calculator',
      'cost per employee per pay period',
      'payroll run calculator',
      'free payroll calculator',
      'pay period cost calculator',
      'true cost of payroll',
      'payroll calculator 2026',
    ],
    componentKey: 'payroll',
    category: 'business',
    breadcrumbLabel: 'Payroll Calculator',
    ogTitle: 'Payroll Calculator 2026 - True Cost Per Pay Period',
    ogDescription:
      'See the full cost of every paycheck: employee deductions, the employer FICA match, FUTA, SUTA, workers comp and benefits. Free payroll run calculator.',
    canonicalPath: '/payroll-calculator',
    jsonLdType: 'payroll',
  },
];

// ─── Content shape (mirrors CalculatorContent in app/[calculator]/_content.ts) ─

export interface AdditionContentShape {
  howItWorks: string[];
  calculationMethod: {
    formula: string;
    steps: string[];
    example: string;
  };
  keyRates: { label: string; value: string }[];
  faqs: FAQItem[];
  relatedCalculators: { slug: string; label: string }[];
}

// ─── Content (keyed by componentKey) ──────────────────────────────────────────

export const WORK_CONTENT: Record<string, AdditionContentShape> = {
  'time-card': {
    howItWorks: [
      'This calculator turns a week of punch-clock times into payroll-ready numbers. Type when you clocked in and out for each day, set the unpaid break, and the tool converts raw times into decimal hours - the format every payroll system multiplies by your rate. Monday through Friday, 9:00 to 5:00 with a 30-minute lunch, becomes 7.50 hours a day and a 37.50-hour week.',
      'The decimal conversion is plain division: minutes worked divided by 60. Forty-five minutes is 0.75 of an hour, so 7 hours 45 minutes counts as 7.75 hours. Payroll pays decimal hours, which is why a hand-written "7.45" on a paper time card quietly costs you money - that is 6 minutes per day, half an hour per week, 26 hours a year.',
      'Overtime follows the federal FLSA standard: any minute past 40 hours in a single workweek is paid at 1.5x your regular rate. The switch is on by default; turn it off if you are salaried-exempt or just want straight-time totals. A workweek is a fixed, recurring 168-hour window your employer chooses - overtime is never averaged across two weeks, no matter how you are paid.',
      'California is the big exception: it requires daily overtime (1.5x over 8 hours in a day, 2x over 12) on top of the weekly rule. This card follows the federal weekly standard used by the other 49 states and most payroll systems. If you work in California, double-check your daily totals against the daily thresholds.',
      'Overnight shifts are handled automatically: a 22:00 to 06:00 shift crosses midnight and counts 8.00 hours, never a negative number. This is a work-hours tool, so it stops at gross pay - for taxes and take-home, run your weekly result through the <a href="/paycheck-calculator">paycheck calculator</a>.',
    ],
    calculationMethod: {
      formula: 'Gross = (Regular hours x rate) + (OT hours x rate x 1.5)',
      steps: [
        'For each day: worked span = clock out minus clock in (add 24 h if the shift crosses midnight), then subtract unpaid break minutes',
        'Convert each day to decimal hours: minutes / 60 (7 h 45 m = 7.75)',
        'Total the week: minutes over 40 hours become overtime at 1.5x, everything else stays regular',
        'Regular pay = regular hours x hourly rate',
        'Overtime pay = overtime hours x hourly rate x 1.5',
        'Gross pay = regular pay + overtime pay',
      ],
      example:
        'A standard week - Monday to Friday, 9:00 AM to 5:00 PM with a 30-minute unpaid lunch - is 7.50 h per day, 37.50 h total. At $20.00/hour that is $750.00 gross. Add a Saturday shift, 9:00 AM to 2:00 PM with no break (5.00 h): the week reaches 42.50 h, so 40 regular hours pay $800.00 and 2.50 overtime hours pay 2.50 x $20.00 x 1.5 = $75.00. Gross pay = $875.00.',
    },
    keyRates: [
      { label: 'Federal OT Threshold', value: 'Over 40 hours per workweek' },
      { label: 'FLSA Overtime Multiplier', value: '1.5x the regular rate' },
      { label: 'Full-Time Standard Year', value: '2,080 hours (40 h x 52 wk)' },
      { label: 'Decimal Hour Rule', value: '7 h 45 m = 7.75 hours' },
      { label: 'Default Unpaid Break', value: '30 minutes (set 0 if paid)' },
    ],
    faqs: [
      {
        question: 'How do I calculate hours worked from a time card?',
        answer:
          'Subtract your clock-in from your clock-out time, then subtract any unpaid break. A 9:00 AM to 5:30 PM shift is 8 hours 30 minutes of span; with a 30-minute lunch that is 8.00 hours worked. To get the decimal format payroll uses, divide the minutes by 60 - 30 minutes is 0.50 and 45 minutes is 0.75 - so 7 hours 45 minutes becomes 7.75 hours. This calculator does that conversion for every day of the week automatically, including shifts that cross midnight.',
      },
      {
        question: 'How does weekly overtime work on a time card?',
        answer:
          'Under the federal FLSA, every hour past 40 in a single workweek is overtime at 1.5x your regular rate. A workweek is a fixed, recurring 168-hour period defined by your employer - it is not the same as a pay period. If you work 42.5 hours in one week and 37.5 in the next, you are owed 2.5 overtime hours for the first week; your employer cannot average the two weeks to zero them out. Only police, firefighters, hospitals, and a few other narrow categories may use special alternative work periods.',
      },
      {
        question: 'Does California count overtime differently?',
        answer:
          'Yes. California is the main exception to the federal weekly rule: hours over 8 in a single day are paid at 1.5x, hours over 12 in a day at 2x, and the seventh consecutive workday carries its own premiums. So in California you can earn overtime in a week under 40 total hours. This calculator applies the federal weekly threshold (over 40 at 1.5x) that every other state and most payroll systems follow; if you are in California, also check each day against the 8-hour and 12-hour marks.',
      },
      {
        question: 'Should unpaid breaks be deducted from my hours?',
        answer:
          'Bona fide meal periods - typically 30 minutes or more where you are fully relieved of duty - can be unpaid, and that is what the break field subtracts. But under federal law, short rest breaks of about 5 to 20 minutes must be paid; they count as hours worked and even count toward overtime. This card defaults to a 30-minute unpaid break per day. If your employer pays your lunch or your breaks are short, set the break to 0 so nothing is deducted.',
      },
      {
        question: 'How do overnight or graveyard shifts work?',
        answer:
          'When clock-out is earlier than clock-in, the calculator treats the shift as crossing midnight and adds 24 hours to the end time. A 22:00 to 06:00 shift is 8.00 hours; an 18:00 to 02:00 shift with a 30-minute break is 7.50 hours. Overnight work follows the same weekly overtime bucket as day shifts - it all lands in the same workweek, and hours past 40 are overtime regardless of what time of day they were worked. Some industries pay a shift differential on top, which you would add separately.',
      },
      {
        question: 'How do I turn my weekly hours into gross pay?',
        answer:
          'Take the decimal hours, split them at the 40-hour line, and multiply: regular hours at your rate, overtime hours at 1.5 times your rate. At $20.00/hour, a 37.50-hour week is 37.50 x $20.00 = $750.00. A 42.50-hour week is 40 x $20.00 = $800.00 regular plus 2.50 x $30.00 = $75.00 overtime, so $875.00. That is exactly what the weekly gross figure shows. For what actually lands in your bank account after taxes and withholding, take the gross result to a paycheck calculator.',
      },
      {
        question: 'Is overtime calculated per week or per paycheck?',
        answer:
          'Per workweek - always. The FLSA requires overtime for hours over 40 in a single workweek, and a workweek never spans two weeks. If you are paid biweekly, each paycheck contains two separate workweeks, and each week stands on its own for overtime purposes. A 45-hour week followed by a 35-hour week means 5 overtime hours owed, not zero - averaging across weeks is one of the most common (and expensive) wage-law mistakes small employers make. This calculator totals one Monday-to-Sunday week at a time, so each run maps cleanly onto a single workweek.',
      },
    ],
    relatedCalculators: [
      { slug: 'hourly-to-salary-calculator', label: 'Hourly to Salary' },
      { slug: 'overtime-tax-calculator', label: 'Overtime Tax' },
      { slug: 'payroll-calculator', label: 'Payroll' },
      { slug: 'paycheck-calculator', label: 'Paycheck' },
      { slug: 'employee-cost-calculator', label: 'Employee Cost' },
    ],
  },

  payroll: {
    howItWorks: [
      'Every paycheck costs the employer more than the wage number printed on it. This calculator runs a single payroll period from the employer\'s seat: choose how you pay (salary or hourly) and how often, and it produces a pay-stub-style breakdown of what the employee nets and what the run truly costs you.',
      'The employee side mirrors a real stub. Gross wages for the period come first, then Social Security at 6.2% of wages up to the $184,500 cap for 2026, Medicare at 1.45% with no cap, and an estimated federal income-tax withholding computed with the 2026 single-filer brackets and the $16,100 standard deduction. What is left is the estimated net deposit.',
      'The employer side is where payroll gets expensive. You match the employee\'s Social Security and Medicare dollar for dollar - 7.65% combined, and your Social Security match also stops at $184,500. You pay FUTA at an effective 0.6% on the first $7,000 of each employee\'s wages (a maximum of $42 per employee per year), plus SUTA, the state unemployment tax, which you set here because real rates run from about 1% to 5% on a wage base - typically near $9,500, though bases vary by state.',
      'Workers\' compensation insurance and benefits ride on top. Workers\' comp is quoted as a percentage of payroll - roughly 0.5% to 2% for office work and far higher for construction and other risky trades. Benefits is whatever you pay per month for health coverage, a retirement match, or stipends. Both are converted into per-period costs so the stub shows the complete picture.',
      'The result is your true cost per pay period and the markup over gross wages - 9.2% on the default $60,000 salary before benefits, and closer to 25-30% once a typical benefits package is added. State income taxes are not part of this estimate: they are withheld from the employee, not paid by you. For state-accurate net pay use the <a href="/paycheck-calculator">paycheck calculator</a>, and for annual headcount budgeting see the <a href="/employee-cost-calculator">employee cost calculator</a>.',
    ],
    calculationMethod: {
      formula:
        'Employer cost per period = Gross + FICA match (6.2% + 1.45%) + FUTA + SUTA + Workers comp + Benefits',
      steps: [
        'Annualize wages: salary as entered, or hourly rate x hours per week x paid weeks',
        'Period gross = annual gross / pay periods per year (52 weekly, 26 biweekly, 24 semimonthly, 12 monthly)',
        'Employee FICA per period = (Social Security 6.2% capped at $184,500 + Medicare 1.45%) / periods',
        'Federal withholding estimate = 2026 single-filer tax on (annual gross minus the $16,100 standard deduction), divided by periods',
        'Employer match = the same Social Security + Medicare figures (never the 0.9% additional Medicare tax - that is employee-only)',
        'FUTA = 0.6% x the first $7,000 of wages; SUTA = your rate x your state wage base; each divided by periods',
        'Add workers comp (% of wages) and benefits (per month x 12 / periods) to get total employer cost per period',
      ],
      example:
        'A $60,000 salary paid monthly (12 periods): period gross = $5,000.00. Employee FICA = $382.50 ($4,590.00 per year - $3,720.00 Social Security plus $870.00 Medicare). Estimated federal withholding = $418.33 ($5,020.00 per year), so estimated net = $4,199.17. The employer adds a $382.50 FICA match, $3.50 FUTA ($42.00 per year), $23.75 SUTA (3.0% on the first $9,500), and $50.00 workers comp (1.0%) for a true cost of $5,459.75 per period - 9.2% over gross, $65,517.00 per year.',
    },
    keyRates: [
      { label: 'Employee FICA', value: '6.2% + 1.45% = 7.65%' },
      { label: 'Social Security Wage Cap (2026)', value: '$184,500' },
      { label: 'Additional Medicare Tax', value: '0.9% over $200K (employee only)' },
      { label: 'FUTA (effective)', value: '0.6% on the first $7,000' },
      { label: 'Typical SUTA', value: '1-5% on the first ~$9,500' },
      { label: 'Standard Deduction (single, 2026)', value: '$16,100' },
    ],
    faqs: [
      {
        question: 'What does an employer pay on top of each paycheck?',
        answer:
          'Four statutory items plus whatever you offer in benefits: the employer FICA match (6.2% Social Security up to the 2026 cap of $184,500, plus 1.45% Medicare with no cap), FUTA at an effective 0.6% on the first $7,000 of wages, SUTA - state unemployment, typically 1-5% on a wage base near $9,500 - and workers\' compensation insurance. On a $60,000 salary, those statutory add-ons alone come to about $5,517 a year (roughly 9.2%): $4,590 FICA match, $42 FUTA, $285 SUTA at 3%, and $600 workers comp at 1% - before a dollar of health insurance or retirement match.',
      },
      {
        question: 'How is the employee net pay on this stub estimated?',
        answer:
          'Gross for the period minus employee FICA minus an estimated federal income-tax withholding. The withholding estimate applies the 2026 single-filer brackets to annual wages after the $16,100 standard deduction, then divides by the number of pay periods. It is a simplified annualized estimate - real withholding follows IRS Publication 15-T tables that account for filing status, the W-4 steps, and paycheck timing. State income tax is not included because rates vary from zero to 13%; for a state-accurate figure use the paycheck calculator.',
      },
      {
        question: 'Does the employer match the 0.9% additional Medicare tax?',
        answer:
          'No. The additional Medicare tax of 0.9% applies to wages above $200,000 and is withheld from the employee only - the employer never matches it, which is why this calculator adds only 6.2% plus 1.45% to the employer side. The regular Medicare match of 1.45% does continue on every dollar of wages with no cap. Note that the Social Security match also stops at the 2026 wage base of $184,500, so very high earners become relatively cheaper to employ on a percentage basis.',
      },
      {
        question: 'Why is FUTA only $42 per year?',
        answer:
          'FUTA has a headline rate of 6.0%, but employers who pay their state unemployment tax on time receive a 5.4% federal credit, leaving an effective rate of 0.6%. That 0.6% applies only to the first $7,000 of each employee\'s wages each year, so the maximum is 0.6% x $7,000 = $42 per employee. Once an employee\'s year-to-date wages pass $7,000, FUTA stops for that employee entirely. This calculator spreads the annual $42 evenly across pay periods as an allocation, which is how payroll providers display it on run reports.',
      },
      {
        question: 'How does pay frequency affect the employer cost?',
        answer:
          'It does not change the annual total - weekly, biweekly, semimonthly, and monthly runs all cost the same over a year. Frequency only changes the slice: annual costs are divided by 52, 26, 24, or 12 to allocate each period\'s share, which is exactly what this calculator does with FICA, FUTA, SUTA, workers comp, and benefits. Two practical notes: FICA and unemployment caps are tracked on year-to-date wages, so actual per-check amounts can differ slightly from the even allocation, and biweekly calendars produce 27-check years roughly once a decade.',
      },
      {
        question: 'What SUTA rate should I enter?',
        answer:
          'Use the rate on your state\'s unemployment insurance notice. New employers are typically assigned a standard rate around 2.7% to 4%, and after two to three years of paying in without layoffs your experience rating can drop the rate to 1% or lower - or climb past 5% with frequent claims. Wage bases vary widely too: most states tax roughly the first $9,000 to $15,000 of wages, while a few like Washington and New Jersey go much higher. The default here - 3.0% on the first $9,500 - is a reasonable new-employer placeholder, not legal advice.',
      },
      {
        question: 'How is this different from the employee cost calculator?',
        answer:
          'The employee cost calculator is the annual, strategic view: it answers "what does this headcount really cost per year" and is built for budgeting and hiring decisions, often across a whole team. This payroll calculator is the per-period, operational view: it answers "what does this specific paycheck run cost" in a stub-style layout - gross, deductions, employer contributions, and the true cost of the period. Set the same wage, tax, and benefit assumptions in both and the annual figures agree: the markup over gross is identical, roughly 9.2% on statutory costs alone.',
      },
    ],
    relatedCalculators: [
      { slug: 'employee-cost-calculator', label: 'Employee Cost' },
      { slug: 'paycheck-calculator', label: 'Paycheck' },
      { slug: 'time-card-calculator', label: 'Time Card' },
      { slug: 'irs-withholding-calculator', label: 'IRS Withholding' },
      { slug: 'bonus-tax-calculator', label: 'Bonus Tax' },
    ],
  },
};

// ─── Hub cards (keyed by registry slug) ───────────────────────────────────────

export const WORK_HUB_CARDS: Record<
  string,
  {
    label: string;
    desc: string;
    category: 'income' | 'business';
    icon: string;
    keywords?: string;
  }
> = {
  'time-card-calculator': {
    label: 'Time Card Calculator',
    desc: 'Clock in/out to weekly hours and gross pay',
    category: 'income',
    icon: 'clock',
    keywords:
      'time card time clock work hours timesheet decimal hours punch clock clock in clock out overtime weekly hours',
  },
  'payroll-calculator': {
    label: 'Payroll Calculator',
    desc: 'Per-paycheck employer cost and employee net',
    category: 'business',
    icon: 'briefcase',
    keywords:
      'payroll employer taxes fica match futa suta pay period cost per employee paycheck stub',
  },
};
