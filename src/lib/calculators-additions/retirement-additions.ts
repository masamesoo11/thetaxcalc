/**
 * Retirement group additions — Task 39-b.
 *
 * New-calculator registry entries + SSR content + hub cards for:
 *   - /retirement-calculator  (componentKey 'retirement-planning')
 *   - /roth-ira-calculator    (componentKey 'roth-ira')
 *
 * Kept in a standalone module so the orchestrator can splice these into
 * CALCULATOR_ROUTES, getCalculatorContent, and the hub without touching
 * existing files during parallel builds.
 *
 * 2026 figure sources:
 *   - Social Security wage cap $184,500 and standard deduction $16,100
 *     (single) / $32,200 (MFJ) come from src/lib/tax-config.ts
 *     (FICA_2026 / FEDERAL_TAX_2026, per Rev. Proc. 2025-32).
 *   - IRA/Roth limits and MAGI phase-out bands are 2026 IRS COLA values
 *     (not present in tax-config.ts): contribution limit $7,500, catch-up
 *     $1,150 for age 50+; Roth MAGI phase-out Single/HoH $150,000-$165,000,
 *     MFJ $236,000-$246,000, MFS simplified $10,000-$12,000.
 *   - 401(k) employee limit $24,500, catch-up $8,000 (50+), super catch-up
 *     $11,250 (ages 60-63, OBBBA) — same values the existing 401(k) tool uses.
 *
 * Every dollar figure in the copy below was computed and verified with the
 * exact engine in src/lib/retirement-math.ts (bun verification, Task 39-b).
 */

import type { CalculatorRouteConfig } from '@/lib/calculator-routes';
import type { FAQItem } from '@/lib/faq-data';

// ─── Registry entries ────────────────────────────────────────────────────────

export const RETIREMENT_ROUTES: CalculatorRouteConfig[] = [
  {
    slug: 'retirement-calculator',
    title: 'Retirement Calculator 2026 — How Much Do You Need?',
    description:
      'Free retirement calculator for 2026: project your nest egg, test it with the 4% rule, and see the monthly savings that closes the gap. No sign-up required.',
    h1: 'Free Retirement Calculator',
    metaTitle: 'Free Retirement Calculator 2026 — Will You Have Enough?',
    metaDesc:
      'Will you have enough to retire? Project your nest egg, test it with the 4% rule, and see the monthly savings needed to close the gap. Free, no sign-up.',
    keywords: [
      'retirement calculator',
      'how much do i need to retire',
      'will i have enough to retire',
      'retirement savings calculator',
      '4 percent rule calculator',
      'retirement income calculator',
      'nest egg calculator',
      'retirement planning calculator',
      'how much to retire',
      'free tax calculator for 2026',
    ],
    componentKey: 'retirement-planning',
    category: 'retirement',
    breadcrumbLabel: 'Retirement Calculator',
    ogTitle: 'Retirement Calculator 2026 — Will You Have Enough?',
    ogDescription:
      'Project your nest egg, test it against the 4% rule in today\'s dollars, and find the monthly savings that gets you there. Free, no sign-up.',
    canonicalPath: '/retirement-calculator',
    jsonLdType: 'retirement-planning',
  },
  {
    slug: 'roth-ira-calculator',
    title: 'Roth IRA Calculator 2026 — Tax-Free Growth & Limits',
    description:
      'Free Roth IRA calculator for 2026: project tax-free growth, check the $7,500 limit and MAGI phase-outs, and see the edge over a taxable account. No sign-up.',
    h1: 'Free Roth IRA Calculator',
    metaTitle: 'Free Roth IRA Calculator 2026 — Limits & Tax-Free Growth',
    metaDesc:
      'Project your Roth IRA balance to any age, check 2026 limits and MAGI phase-out bands, and see the tax-free edge vs a taxable brokerage. Free, no sign-up.',
    keywords: [
      'roth ira calculator',
      'roth ira growth calculator',
      'roth ira contribution limit 2026',
      'roth ira income limits 2026',
      'roth ira phase out calculator',
      'backdoor roth calculator',
      'roth ira vs taxable account',
      'roth ira projection',
      'how fast does a roth ira grow',
      'free tax calculator for 2026',
    ],
    componentKey: 'roth-ira',
    category: 'retirement',
    breadcrumbLabel: 'Roth IRA Calculator',
    ogTitle: 'Roth IRA Calculator 2026 — Tax-Free Growth Projection',
    ogDescription:
      'Project your Roth IRA balance, check 2026 limits and MAGI phase-outs, and compare tax-free vs taxable growth. Free, no sign-up.',
    canonicalPath: '/roth-ira-calculator',
    jsonLdType: 'roth-ira',
  },
];

// ─── SSR content shape (mirrors app/[calculator]/_content.ts CalculatorContent) ──

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

// ─── SSR content ──────────────────────────────────────────────────────────────

export const RETIREMENT_CONTENT: Record<string, AdditionContentShape> = {
  'retirement-planning': {
    howItWorks: [
      'This tool answers the two questions every saver eventually loses sleep over: how much do I actually need to retire, and will my current plan get me there? You enter your age, what you have saved, what you add each month, and the annual income you want in retirement. The engine projects your nest egg at your retirement age two ways — raw future dollars, and the same balance restated in today\'s purchasing power — then stress-tests it against your goal.',
      'The inflation step is the one most people skip, and it changes everything. At 3% a year, prices multiply by about 2.575 over 32 years (1.03 to the 32nd power). A $947,515 balance waiting for you at 67 is really only worth about $367,955 in today\'s dollars. Every result on this page — sustainable income, surplus, shortfall — is shown in today\'s money so you can compare it directly against your current budget.',
      'The pass/fail test is the 4% rule: withdraw 4% of a diversified portfolio in your first year of retirement, then adjust that dollar amount for inflation each year. Based on historical US returns, that pace survived every 30-year stretch since the 1920s, including the Depression and stagflation eras. Flip it around and you get the 25x rule: your target nest egg is 25 times the annual income you want. Want $60,000 a year? You need $1,500,000.',
      'If the verdict says you\'re behind, the calculator shows the fastest fix: the exact monthly contribution that closes the gap to your 25x target. The other levers are baked into the 2026 rules — IRA contributions run $7,500 with a $1,150 catch-up at 50+, 401(k) contributions run $24,500 with an $8,000 catch-up at 50+ and an $11,250 super catch-up at ages 60-63, and delaying Social Security past your full retirement age raises that check about 8% a year up to age 70.',
      'This page deliberately complements rather than duplicates our <a href="/401k-retirement-calculator">401(k) calculator</a> — that tool projects a workplace plan\'s balance with employer matching; this one measures total readiness across every account you own and tells you whether the number is big enough. The raw snowball math behind both lives in our <a href="/compound-interest-calculator">compound interest calculator</a>.',
      'One honest caveat: the projection assumes a constant average return every year. Real markets deliver +25% years and −20% years in random order, and unlucky sequences early in retirement hurt more than the average suggests. Treat the output as a planning estimate — a compass, not a guarantee — and re-run it every year as your balances and the rules change.',
    ],
    calculationMethod: {
      formula: 'FV = P × (1+i)^n + C × [((1+i)^n − 1) / i]   where i = annual return ÷ 12, n = years × 12',
      steps: [
        'Years to retirement = retirement age − current age; months n = years × 12',
        'Monthly rate i = annual return ÷ 100 ÷ 12 (7% becomes 0.583% per month)',
        'Project the nominal nest egg with the future-value formula: principal compounded plus the monthly-contribution annuity',
        'Restate it in today\'s dollars: real balance = nominal ÷ (1 + inflation)^years',
        '4% rule income = real balance × 4%; the 25x target = desired annual income × 25',
        'Required monthly savings = (25x target − FV of principal alone) × i ÷ ((1+i)^n − 1)',
      ],
      example:
        'Age 35 retiring at 67 (32 years), $25,000 saved, $500/month, 7% return, 3% inflation, $60,000 income goal: nominal balance at 67 = $947,515; in today\'s dollars = $367,955; 4% of that = $14,718/year — a $45,282 annual shortfall against the goal. Hitting the full 25x target ($1,500,000) would take $886.78 a month.',
    },
    keyRates: [
      { label: '2026 IRA Contribution Limit', value: '$7,500 (+$1,150 catch-up 50+)' },
      { label: '2026 401(k) Employee Limit', value: '$24,500 (+$8,000 50+; +$11,250 ages 60-63)' },
      { label: 'Safe Withdrawal Rate (4% rule)', value: '4% in year one, then adjust for inflation' },
      { label: 'Retirement Target (25x rule)', value: '25 × desired annual income' },
      { label: 'Social Security Wage Cap (2026)', value: '$184,500' },
      { label: 'Long-Run US Inflation', value: 'about 2-3% a year' },
    ],
    faqs: [
      {
        question: 'How much money do I need to retire?',
        answer:
          'Start with the income you want, then multiply by 25 — that\'s the 25x rule, the flip side of the 4% rule. If you want $60,000 a year from your portfolio, you need about $1,500,000; a $100,000 lifestyle needs $2.5 million. Social Security shrinks the target: if it pays you $24,000 a year, your $60,000 goal becomes $36,000 a year from savings, or a $900,000 nest egg. Run the numbers with your own age, balance, and monthly savings above — the calculator converts everything to today\'s dollars so the target stays comparable to your current budget.',
      },
      {
        question: 'Will I have enough to retire? How does this calculator decide?',
        answer:
          'It projects your balance at your retirement age from your current savings plus monthly contributions, discounts it to today\'s dollars at your inflation assumption, and takes 4% of the result as the annual income that portfolio could sustain. Then it compares that income against your goal and shows the surplus or shortfall, plus the coverage percentage. With the default inputs ($25,000 saved, $500 a month, 7% return, 3% inflation), the plan supports $14,718 a year against a $60,000 goal — about 24.5% coverage — and closing the full gap means contributing $886.78 a month instead of $500.',
      },
      {
        question: 'What is the 4% rule, and does it still work?',
        answer:
          'The 4% rule comes from financial planner William Bengen\'s 1994 research and the famous Trinity study: retire with a diversified stock/bond portfolio, withdraw 4% of it the first year, raise that dollar amount with inflation each year, and historically the money lasted 30 years in every stretch since the 1920s. It is a planning guideline, not a law — the next 30 years could be worse than the worst historical case, sequence risk hits retirees who start withdrawals in a crash, and many advisors now suggest 3.5% for early retirement or 30+ year horizons. Use it to size the goal, then revisit it as you approach the finish line.',
      },
      {
        question: 'How does inflation change my retirement number?',
        answer:
          'Dramatically. Inflation compounds the same way returns do, just against you. At 3% a year, prices rise about 2.575× over 32 years, so $60,000 of spending power at 67 requires about $154,500 of income in future dollars. This calculator does the conversion both ways: your projected balance is shown in nominal dollars and in today\'s dollars, and the 4%-rule income is computed on the inflation-adjusted balance so it means the same thing as your paycheck does now. That\'s why the default plan shows a $947,515 nominal balance but only $367,955 of today\'s purchasing power.',
      },
      {
        question: 'I am behind on retirement savings — what is the fastest way to catch up?',
        answer:
          'Three levers, in order of punch. First, contribution catch-ups: 2026 lets you put $7,500 in an IRA plus $1,150 more at 50+, and $24,500 in a 401(k) plus an $8,000 catch-up at 50+ and an $11,250 super catch-up at ages 60-63. Second, small bumps compound: adding just $100 a month to the default 32-year plan adds about $142,841 to the final balance. Third, time: starting the same plan at 45 instead of 35 cuts the age-67 balance from $947,515 to $428,417 — and delaying Social Security to 70 adds roughly 8% a year to that check.',
      },
      {
        question: 'Does Social Security change how much I need to save?',
        answer:
          'Yes — and it is the most commonly forgotten line in retirement math. Social Security replaces about 40% of the average worker\'s pre-retirement earnings, and every dollar it pays is a dollar your portfolio does not have to generate. Say you expect $2,000 a month ($24,000 a year): subtract it from your $60,000 goal, and your savings only need to produce $36,000 a year — a $900,000 target at 25x instead of $1,500,000. Keep in mind benefits depend on your top 35 earning years (the 2026 wage cap is $184,500) and claiming age: waiting from 62 to 70 can raise your check by more than 75%.',
      },
      {
        question: 'How will my retirement withdrawals actually be taxed?',
        answer:
          'It depends on the account. Traditional 401(k) and IRA withdrawals are taxed as ordinary income at the 2026 brackets (10% to 37%), though the standard deduction — $16,100 single, $32,200 married filing jointly — shelters your first withdrawals, which is why many retirees pay a lower effective rate than their working years. Qualified Roth withdrawals, including all growth, are federal-tax-free. Up to 85% of Social Security can be taxable at higher incomes, and 12 states still tax some retirement income. Estimate the after-tax income you need first, then run this calculator with that number as your goal.',
      },
    ],
    relatedCalculators: [
      { slug: '401k-retirement-calculator', label: '401(k) Calculator' },
      { slug: 'roth-ira-calculator', label: 'Roth IRA Calculator' },
      { slug: 'compound-interest-calculator', label: 'Compound Interest Calculator' },
      { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
      { slug: 'capital-gains-calculator', label: 'Capital Gains Calculator' },
      { slug: 'federal-tax-brackets', label: '2026 Federal Tax Brackets' },
    ],
  },

  'roth-ira': {
    howItWorks: [
      'A Roth IRA inverts the usual tax deal: you contribute after-tax money today, and in exchange the IRS never taxes the account again — not the dividends, not the growth, not qualified withdrawals decades later. There are no required minimum distributions during your lifetime either, which makes a Roth both a retirement income tool and an estate-planning tool. This calculator projects what steady contributions become by your chosen withdrawal age, using the 2026 limits as guardrails.',
      'The 2026 contribution limit is $7,500 across all your IRAs combined (traditional plus Roth share one limit), with a $1,150 catch-up at age 50+ — so $8,650 total for older savers. The engine spreads your annual contribution across 12 monthly installments and compounds monthly at the annual/12 convention, the same math as our compound interest calculator. At the defaults ($7,500 a year from 30 to 60 at 7%), $225,000 of contributions grows to $762,482 — and every dollar of the $537,482 of growth is tax-free forever.',
      'Eligibility is where people trip: high earners face the MAGI phase-out. For 2026, the ability to contribute directly starts shrinking at $150,000 of modified AGI for single filers ($165,000 ceiling), $236,000-$246,000 for married filing jointly, and married-filing-separately filers hit the wall almost immediately ($10,000-$12,000 zone). Inside the band your limit is prorated — at $155,000 single, two-thirds of the band remains, so $5,000 of the $7,500 is allowed. The calculator applies that haircut automatically and shows you the exact allowed amount.',
      'Two clocks govern tax-free withdrawals. Qualified distributions need the account open at least 5 years (the clock starts January 1 of the year of your first contribution) AND you being age 59½ or older. Your own contributions can come out any time, tax- and penalty-free, because you already paid tax on them; withdrawals are deemed to come from contributions first. Earnings pulled out early generally owe ordinary income tax plus a 10% penalty, with a few exceptions like $10,000 of first-home-buyer earnings after the 5-year mark.',
      'The comparison strip at the bottom answers the "why bother" question with dollars: the same savings plan in a taxable brokerage account, paying a one-time 15% capital-gains bill on the growth at withdrawal, ends at $681,860 versus the Roth\'s $762,482 — an $80,622 edge from tax treatment alone, and that is the conservative version (real brokerage accounts leak money every year to taxed dividends and fund distributions). Pair this page with our <a href="/retirement-calculator">retirement calculator</a> to check total readiness, or the <a href="/401k-retirement-calculator">401(k) calculator</a> if a match is on the table.',
    ],
    calculationMethod: {
      formula: 'FV = (C ÷ 12) × [((1+i)^n − 1) / i]   where i = annual return ÷ 12, n = years × 12',
      steps: [
        'Allowed contribution = min(your entry, $7,500 or $8,650 with the 50+ catch-up) × phase-out multiplier from your MAGI and filing status',
        'Monthly deposit = allowed annual contribution ÷ 12',
        'Months to grow n = (withdrawal age − current age) × 12; monthly rate i = annual return ÷ 100 ÷ 12',
        'Balance = monthly deposit × [((1+i)^n − 1) / i] (no starting principal)',
        'Total growth = balance − total contributions',
        'Taxable comparison = contributions + growth × (1 − 15% capital-gains rate at withdrawal)',
      ],
      example:
        '$7,500 a year from age 30 to 60 (30 years) at 7%: $625 a month for 360 months compounds to $762,482 — $225,000 contributed, $537,482 of tax-free growth. The same plan in a taxable account with a one-time 15% bill on the growth keeps $681,860, so the Roth edge is $80,622.',
    },
    keyRates: [
      { label: '2026 Roth IRA Contribution Limit', value: '$7,500 (+$1,150 if 50+)' },
      { label: 'MAGI Phase-Out (Single/HoH)', value: '$150,000 - $165,000' },
      { label: 'MAGI Phase-Out (Married Joint)', value: '$236,000 - $246,000' },
      { label: 'MAGI Phase-Out (Married Separate)', value: '$10,000 - $12,000 (simplified)' },
      { label: 'Qualified Withdrawals', value: 'Age 59½ + account open 5 years' },
      { label: 'Roth RMDs', value: 'None during the owner\'s lifetime' },
    ],
    faqs: [
      {
        question: 'How much can I contribute to a Roth IRA in 2026?',
        answer:
          'The 2026 limit is $7,500 of earned income across all your IRAs combined — traditional plus Roth share one limit, not one each. Savers 50 and older can add a $1,150 catch-up for an $8,650 total, the largest IRA limit ever set. Spouses with no earnings can still fund a spousal Roth from the other spouse\'s income as long as you file jointly and your combined MAGI clears the phase-out. You can make 2026 contributions any time from January 1, 2026 until the tax deadline in April 2027.',
      },
      {
        question: 'What are the 2026 Roth IRA income limits?',
        answer:
          'Direct contributions phase out by modified AGI. Single and head-of-household filers lose the limit between $150,000 and $165,000 of MAGI in 2026; married filing jointly between $236,000 and $246,000; married filing separately in roughly the $10,000-$12,000 zone. Inside a band the limit is prorated, not a cliff: at $155,000 single you keep two-thirds of the band, so $5,000 of the $7,500 is allowed; at $240,000 joint it is $4,500. The calculator above applies the proration automatically. MAGI is roughly your AGI plus a few add-backs like tax-exempt interest, so if you are near a band, model a bonus or a Roth conversion before assuming you qualify.',
      },
      {
        question: 'What if my income is too high for a Roth IRA?',
        answer:
          'The standard workaround is the "backdoor Roth": contribute $7,500 to a nondeductible traditional IRA (which has no income limit) and convert it to Roth shortly after. Since nondeductible basis is not taxed on conversion, the move costs almost nothing for people with no other IRA money. The catch is the pro-rata rule: if you hold pre-tax money in ANY traditional or rollover IRA, part of every conversion is taxed proportionally. High earners with old 401(k)s sometimes roll those into a current plan first to clean the slate. A tax pro is worth the hour here.',
      },
      {
        question: 'When can I withdraw from a Roth IRA without taxes or penalties?',
        answer:
          'A withdrawal is qualified — completely tax- and penalty-free, including all earnings — when the account has been open at least 5 years AND you are 59½ or older. The 5-year clock starts January 1 of the year of your first contribution, not each deposit. Before that, ordering rules protect you: withdrawals count as coming from contributions first, and your own contributions always come out tax- and penalty-free at any age. Early earnings generally owe ordinary income tax plus a 10% penalty, with exceptions including $10,000 of first-home-buyer earnings after the 5-year mark, qualified education costs, and disability.',
      },
      {
        question: 'How is a Roth IRA different from a Roth 401(k)?',
        answer:
          'Same tax treatment, different plumbing. The Roth 401(k) lives inside your workplace plan with a $24,500 employee limit for 2026 (plus $8,000 catch-up at 50+, $11,250 at ages 60-63), payroll deductions, possible employer match, and automatic coverage at any income. The Roth IRA is individual with the much smaller $7,500 limit, income limits that block high earners, total investment freedom, and no RMDs ever. The two work together: roll your Roth 401(k) into a Roth IRA when you leave a job to escape RMDs and expand your investment choices.',
      },
      {
        question: 'Is a Roth IRA really better than a taxable brokerage account?',
        answer:
          'For retirement money, the arithmetic is rarely close. Take the calculator\'s default plan — $7,500 a year for 30 years at 7% grows to $762,482 tax-free. In a taxable brokerage, even our conservative model (a single 15% capital-gains bill on the $537,482 of growth at withdrawal) leaves $681,860, an $80,622 difference. Reality is harsher for the taxable account: dividends and mutual-fund distributions are taxed along the way, which drags compounding every single year, plus NIIT can push the rate to 18.8% or 23.8%. Taxable accounts still win for pre-59½ money you might need — no age gates, no 5-year clocks.',
      },
      {
        question: 'Should I choose a Roth or a traditional IRA?',
        answer:
          'It is a bet on your tax rate: contribute to a Roth when your current bracket is low (career starters, students, sabbaticals) and pay today\'s cheap rates forever; take the traditional deduction when you are in the 22%-32% brackets and expect a lower rate in retirement. Two twists: high earners often cannot deduct traditional contributions anyway (the Roth/backdoor path is the only tax break left), and unlike a Roth, a traditional IRA forces RMDs at 73. Many savers split contributions between both to hedge — the calculator shows what the Roth half becomes.',
      },
    ],
    relatedCalculators: [
      { slug: 'retirement-calculator', label: 'Retirement Calculator' },
      { slug: '401k-retirement-calculator', label: '401(k) Calculator' },
      { slug: 'compound-interest-calculator', label: 'Compound Interest Calculator' },
      { slug: 'capital-gains-calculator', label: 'Capital Gains Calculator' },
      { slug: 'marriage-tax-calculator', label: 'Marriage Tax Calculator' },
      { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
    ],
  },
};

// ─── Hub cards (SPECIAL_CARDS shape, keyed by registry slug) ──────────────────

export const RETIREMENT_HUB_CARDS: Record<
  string,
  { label: string; desc: string; category: string; icon: string; keywords?: string }
> = {
  'retirement-calculator': {
    label: 'Retirement Calculator',
    desc: 'Will you have enough? 4% rule check',
    category: 'invest',
    icon: 'piggy',
    keywords:
      'retirement calculator how much do i need to retire will i have enough nest egg 4 rule 25x rule retirement income goal',
  },
  'roth-ira-calculator': {
    label: 'Roth IRA Calculator',
    desc: 'Tax-free growth, 2026 limits & phase-outs',
    category: 'invest',
    icon: 'landmark',
    keywords:
      'roth ira roth contribution limit magi phase out backdoor roth tax free growth roth vs taxable',
  },
};
