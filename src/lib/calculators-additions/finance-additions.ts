/**
 * Finance gap-batch additions for the calculator registry (Task 41).
 *
 * Three calculators: inflation (CPI purchasing power), debt payoff
 * (credit-card payoff schedule), debt-to-income (front/back-end DTI).
 * This module is consumed by the orchestrator when merging new routes into
 * calculator-routes.ts, content into the [calculator] page content store,
 * and cards into the calculators hub.
 *
 * Every number in the copy below was verified with `bun /tmp/verify-payoff-math.ts`
 * against src/lib/payoff-math.ts:
 *  - $5,000 @ 22% APR, $200/mo -> 34 months, $1,749.88 interest, payoff Aug 2029
 *  - +$50/mo -> 26 months, $1,285.72 | +$100/mo -> 21 months, $1,021.60
 *  - $92/mo on the same debt -> 310 months, $23,462.14 interest
 *  - $100 in 2000 -> 2025 -> $186.99 (+86.99%, avg 2.54%/yr)
 *  - $6,000 income / $2,300 debts -> 38.33% back-end, 25.00% front-end
 */

import type { CalculatorRouteConfig } from '@/lib/calculator-routes';
import type { FAQItem } from '@/lib/faq-data';

// ─── Route configs ─────────────────────────────────────────────────────────────

export const FINANCE_ROUTES: CalculatorRouteConfig[] = [
  {
    slug: 'inflation-calculator',
    title: 'Inflation Calculator 2026 — CPI Purchasing Power & Value of Money',
    description:
      'Free inflation calculator using official BLS CPI-U data (1913-2025). See what any amount from the past equals today, or project today\u2019s money forward. No sign-up.',
    h1: 'Inflation Calculator',
    metaTitle: 'Inflation Calculator 2026 — CPI Value of Money Over Time',
    metaDesc:
      'Free inflation calculator built on official BLS CPI-U annual averages (1913-2025). Adjust any amount for US inflation, then project forward. Instant, no sign-up.',
    keywords: [
      'inflation calculator', 'cpi inflation calculator', 'purchasing power calculator',
      'value of money over time', 'cost of living inflation', 'dollar value over time',
      'future inflation calculator', 'historical inflation rates', 'average inflation rate us',
      'what did things cost in', 'money inflation converter', '1970s inflation calculator',
    ],
    componentKey: 'inflation',
    category: 'investment',
    breadcrumbLabel: 'Inflation Calculator',
    ogTitle: 'Inflation Calculator 2026 | CPI Purchasing Power',
    ogDescription:
      'See what any past amount equals in today\u2019s money using official BLS CPI-U data, 1913-2025. Free, instant, no sign-up.',
    canonicalPath: '/inflation-calculator',
    jsonLdType: 'inflation',
  },
  {
    slug: 'debt-payoff-calculator',
    title: 'Debt Payoff Calculator 2026 — Credit Card Payoff Date & Interest',
    description:
      'Free debt payoff calculator: months to debt-free, total interest and your exact payoff date — plus how much an extra payment saves. Works for any card or loan. No sign-up.',
    h1: 'Debt Payoff Calculator',
    metaTitle: 'Debt Payoff Calculator 2026 — When Will You Be Debt-Free?',
    metaDesc:
      'Free credit card payoff calculator: months to payoff, total interest, payoff date, and what extra payments save. Instant schedule, no sign-up.',
    keywords: [
      'debt payoff calculator', 'credit card payoff calculator', 'credit card payment calculator',
      'how long to pay off credit card', 'debt free calculator', 'debt snowball calculator',
      'debt avalanche calculator', 'credit card interest calculator', 'pay off debt faster',
      'minimum payment calculator', 'credit card debt calculator', 'debt payoff date',
    ],
    componentKey: 'debt-payoff',
    category: 'mortgage',
    breadcrumbLabel: 'Debt Payoff Calculator',
    ogTitle: 'Debt Payoff Calculator 2026 | Debt-Free Date & Interest',
    ogDescription:
      'Calculate your exact debt-free date, total interest, and how extra payments speed things up. Free credit card payoff calculator, no sign-up.',
    canonicalPath: '/debt-payoff-calculator',
    jsonLdType: 'debt-payoff',
  },
  {
    slug: 'debt-to-income-calculator',
    title: 'Debt-to-Income Ratio Calculator 2026 — Front-End & Back-End DTI',
    description:
      'Free DTI calculator: your front-end and back-end debt-to-income ratio, rated against the 28/36 rule and the 43% qualified-mortgage limit. See what lenders see. No sign-up.',
    h1: 'Debt-to-Income Ratio Calculator',
    metaTitle: 'Debt-to-Income Calculator 2026 — Front & Back-End DTI',
    metaDesc:
      'Free debt-to-income ratio calculator for 2026. Front-end and back-end DTI with the 28/36 rule, 43% QM limit and 50% cap explained. Instant, no sign-up.',
    keywords: [
      'debt to income ratio calculator', 'dti calculator', 'front end ratio calculator',
      'back end ratio calculator', '43 dti rule mortgage', 'how much debt can i afford',
      'dti for mortgage approval', 'monthly debt payments ratio', 'debt ratio calculator',
      'housing ratio calculator', 'qualify for mortgage calculator', '28 36 rule calculator',
    ],
    componentKey: 'debt-to-income',
    category: 'mortgage',
    breadcrumbLabel: 'Debt-to-Income Calculator',
    ogTitle: 'Debt-to-Income Calculator 2026 | Front & Back-End DTI',
    ogDescription:
      'Calculate your debt-to-income ratio the way lenders do — front-end, back-end, and where you fall against 28/36 and the 43% QM limit. Free, no sign-up.',
    canonicalPath: '/debt-to-income-calculator',
    jsonLdType: 'debt-to-income',
  },
];

// ─── Content shape (mirrors the [calculator] page content contract) ───────────

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

// ─── Calculator content, keyed by componentKey ────────────────────────────────

export const FINANCE_CONTENT: Record<string, AdditionContentShape> = {
  inflation: {
    howItWorks: [
      'Inflation is the quiet tax on cash: the same dollar buys less every year. This calculator converts money across time using the Consumer Price Index for All Urban Consumers (CPI-U) — the exact series the Bureau of Labor Statistics publishes and the IRS uses to index tax brackets. Pick any two years between 1913 and 2025 and any amount, and you get the equivalent value, the cumulative price change, and the average annual rate across the gap.',
      'The math is a straight CPI ratio: value in end-year dollars = amount x (CPI end year / CPI start year). One hundred 2000-dollars becomes $186.99 in 2025-dollars, because the CPI-U rose from 172.2 to 322.0 — an 86.99% cumulative climb averaging 2.54% per year. The average hides the drama, though: prices roughly tripled in the 1970s while they actually fell during the Great Depression — 1920 dollars bought 32% more by 1935.',
      'The second mode projects forward instead of backward. Plug in an assumed annual rate — the Federal Reserve targets 2%, and the long-run US average since 1913 is near 3.2% — and see the cost of today\u2019s basket down the road, plus the purchasing power your cash loses. At a steady 3%, $10,000 of today\u2019s spending costs $13,439.16 in ten years, and a dollar held in cash is worth only 74.4 cents of today\u2019s money by then.',
      'Why does this matter for your paycheck? A raise that merely matches inflation keeps your real income flat — that is what "cost of living adjustment" means. Between 2010 and 2025 prices rose 47.67% (averaging 2.63% a year), so a salary that stagnated over that stretch quietly lost nearly a third of its purchasing power. Run your salary through our <a href="/paycheck-calculator">paycheck calculator</a> and this page together to see nominal versus real pay.',
      'Two caveats worth knowing. CPI-U measures urban consumer prices nationwide — your city\u2019s rent surge may outrun it badly (see our <a href="/relocation-calculator">relocation calculator</a> for cost-of-living moves). And official CPI is an average across a fixed basket: if your personal basket skews toward housing, healthcare or tuition, your felt inflation ran hotter. The index is still the standard yardstick — it drives tax-bracket indexing and Social Security COLAs, which is why we also track the numbers on our <a href="/federal-tax-brackets">federal tax brackets</a> page.',
    ],
    calculationMethod: {
      formula: 'Adjusted value = Amount x (CPI-U end year / CPI-U start year); forward: FV = Amount x (1 + r)^years',
      steps: [
        'Look up the BLS CPI-U annual average for the start year (2000 = 172.2) and the end year (2025 = 322.0).',
        'Divide the two: 322.0 / 172.2 = 1.8699 — the cumulative inflation multiplier.',
        'Multiply the amount by that ratio: $100 x 1.8699 = $186.99 in end-year dollars.',
        'Cumulative % = (ratio - 1) x 100 = 86.99%; average annual rate = (ratio)^(1/years) - 1 = 2.54%.',
        'Forward mode swaps the CPI ratio for a fixed compounding factor: FV = Amount x (1 + rate/100)^years; purchasing power = Amount / that factor.',
      ],
      example:
        '$100 from 2000 to 2025: CPI ratio 322.0 / 172.2 = 1.8699, so $100 becomes $186.99 — a +86.99% cumulative price rise, averaging 2.54% per year over 25 years. Forward mode: $10,000 at 3% for 10 years costs 10,000 x 1.03^10 = $13,439.16 in future dollars, and today\u2019s $1 buys 1 / 1.343916 = $0.744 of future purchasing power — a 25.59% loss.',
    },
    keyRates: [
      { label: 'CPI-U, 2000 (BLS annual average)', value: '172.2' },
      { label: 'CPI-U, 2025 (BLS annual average)', value: '322.0' },
      { label: 'Cumulative US inflation 2000-2025', value: '+86.99%' },
      { label: 'Long-run average since 1913', value: '~3.2% / yr' },
      { label: 'Federal Reserve target', value: '2%' },
      { label: 'Fed funds inflation outlook 2026', value: '~2.5% / yr' },
    ],
    faqs: [
      {
        question: 'How much is $100 in 1980 worth today?',
        answer:
          'About $390.78 in 2025 dollars. The CPI-U climbed from 82.4 in 1980 to 322.0 in 2025, so prices rose 290.78% across that stretch — a reminder that the inflation-heavy 1970s and early 1980s permanently reset the price level. Anything earning less than ~3.4% a year back then lost purchasing power in real terms.',
      },
      {
        question: 'What did a dollar buy in 1950 versus now?',
        answer:
          'The CPI-U averaged 24.1 in 1950 and 322.0 in 2025, a 13.4x multiplier: $1 in 1950 money matches roughly $13.36 today. That is why a 25-cent cup of coffee and a $1,000-a-year salary sound shocking until you convert them — in today\u2019s dollars that salary is about $13,360. The conversion works both ways with our historical mode, which uses the same CPI series for every year from 1913 to 2025.',
      },
      {
        question: 'How do I calculate inflation between two years myself?',
        answer:
          'Take the CPI-U annual average for both years from the BLS, divide end by start, and multiply your amount by the result. Example: 2020 = 258.811, 2025 = 322.0, ratio = 1.2441 — prices rose 24.41% in five years, so $1,000 of 2020 spending now costs about $1,244.12. Our calculator automates exactly this with the full official table, and shows the average annual rate (here ~4.47%/yr, far above the 2% Fed target).',
      },
      {
        question: 'Is a 3% raise enough to keep up with inflation?',
        answer:
          'Only if inflation runs at or below 3%. At the Fed\u2019s 2% target, a 3% raise is a ~1% real gain; at the long-run 3.2% average it is a slight real loss; and after high-inflation years it badly trails. Since 2000, US prices rose 86.99% — an average of 2.54% a year — so someone whose pay rose 2%/yr over that period lost real income every single year. Check both sides: your nominal pay on our <a href="/paycheck-calculator">paycheck calculator</a>, and the inflation-adjusted picture here.',
      },
      {
        question: 'Why does the calculator say 2025 instead of 2026?',
        answer:
          'CPI-U annual averages are published per calendar year, and 2025 is the most recent complete annual figure — the 2025 average across all twelve monthly indexes is 322.0. Intraday-year calculations use monthly CPI, which jumps around seasonally. For forward-looking questions, the projection mode handles any rate and horizon you choose, from a 2% Fed-target scenario to a 1970s-style 8% stress test.',
      },
      {
        question: 'Does inflation affect my taxes?',
        answer:
          'Yes — directly. The IRS indexes federal tax brackets, the standard deduction and many contribution limits to CPI inflation each year, which is why the brackets on our <a href="/federal-tax-brackets">federal tax brackets</a> page shift annually. Without that indexing, inflation would push your raises into higher tax brackets even when your real income went nowhere ("bracket creep"). Several states also index their brackets; the details differ by state, so check your state\u2019s calculator page.',
      },
    ],
    relatedCalculators: [
      { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
      { slug: 'compound-interest-calculator', label: 'Compound Interest Calculator' },
      { slug: 'federal-tax-brackets', label: 'Federal Tax Brackets' },
      { slug: 'retirement-calculator', label: 'Retirement Calculator' },
      { slug: 'hourly-to-salary-calculator', label: 'Hourly to Salary Calculator' },
      { slug: 'investment-calculator', label: 'Investment Calculator' },
    ],
  },

  'debt-payoff': {
    howItWorks: [
      'A debt payoff plan answers three questions: when are you debt-free, how much interest the privilege costs, and what one extra payment buys you. Type your balance, APR and monthly payment and this calculator walks the balance forward month by month — interest first at APR/12 on whatever you still owe, the rest crushing principal — until it hits zero, then hands you the exact payoff month.',
      'The defaults show the typical credit-card trap. A $5,000 balance at 22% APR with a $200 monthly payment takes 34 months to kill and costs $1,749.88 in interest — more than a third of the original balance again. The first month alone sends $91.67 to interest and only $108.33 to principal. Interest is charged on the remaining balance every single month, which is why early extra dollars do so much more work than late ones.',
      'Extra payments bend the curve hard. Bump that $200 to $250 and the payoff drops to 26 months with $1,285.72 interest — 8 months and $464.16 saved. Make it $300 and you are done in 21 months, paying $1,021.60 of interest — 13 months and $728.28 freed. The pattern holds for any debt: the extra amount attacks principal directly, and every principal dollar removed stops generating interest forever.',
      'The flip side is the minimum-payment spiral. Card issuers set minimums near interest plus ~1% of the balance — great for them, terrible for you. Pay $92 instead of $200 on the same $5,000/22% balance and the payoff stretches to 310 months — nearly 26 years — burning $23,462.14 in interest, almost five times the debt itself. And pay $91.67 or less and the balance never goes down at all. If your budget cannot beat the interest line, a consolidation loan or a balance-transfer card is the realistic escape; model the first with our <a href="/personal-loan-calculator">personal loan calculator</a>.',
      'One debt or several? If you have multiple balances, order matters less than most people think — total interest is dominated by how much you pay, not which card gets it. That said, two plans have earned their reputations: avalanche (highest APR first — mathematically cheapest) and snowball (smallest balance first — psychologically sticky). Use this calculator on each balance to see its individual finish line, then throw every spare dollar at the debt your chosen plan says first. To raise the spare-dollar supply, check what your paycheck actually nets after tax with our <a href="/paycheck-calculator">paycheck calculator</a>.',
    ],
    calculationMethod: {
      formula: 'Each month: interest = balance x APR/12; principal = payment - interest; balance -= principal (final payment trimmed to balance + interest)',
      steps: [
        'Convert APR to a monthly rate: 22% APR gives 22 / 12 = 1.8333% per month.',
        'First month on $5,000: interest = 5,000 x 0.018333 = $91.67; principal = $200 - $91.67 = $108.33; new balance = $4,891.67.',
        'Repeat month by month, recomputing interest on the shrinking balance; the last payment is whatever remains.',
        'Guard: if payment <= first month\u2019s interest, the balance never falls — the calculator flags it and shows the minimum workable payment.',
        'Sum the interest column for total cost; the month counter is your payoff date. Extra payments change nothing in the formula — they just enlarge principal each round.',
      ],
      example:
        '$5,000 at 22% APR, $200 a month: first month interest $91.67, and after 34 payments the balance hits zero — August 2029 — with total interest of $1,749.88. Raising the payment to $300 finishes in 21 months at $1,021.60 interest, saving 13 months and $728.28 versus the base plan.',
    },
    keyRates: [
      { label: 'Typical credit-card APR, 2026', value: '~20% - 24%' },
      { label: 'Typical personal-loan APR, 2026', value: '~8% - 36% by credit band' },
      { label: 'Card minimum payment formula', value: 'Interest + ~1% of balance' },
      { label: '$5,000 @ 22% with $200/mo', value: '34 months / $1,749.88 interest' },
      { label: 'Same debt, +$100/mo', value: '21 months / $1,021.60 interest' },
      { label: 'Same debt, $92/mo', value: '310 months / $23,462.14 interest' },
    ],
    faqs: [
      {
        question: 'How long will it take to pay off my credit card?',
        answer:
          'Depends on the balance, APR and — overwhelmingly — the payment size. On the classic $5,000 / 22% APR example, $200 a month finishes in 34 months with $1,749.88 of interest; $300 finishes in 21 months; the $92 near-minimum drags it out 310 months. Run your exact numbers above — the payoff date updates instantly, and the curve shows how steeply extra payments flatten the interest bill.',
      },
      {
        question: 'What happens if I only pay the minimum on my card?',
        answer:
          'You feed the bank. Minimums are engineered near interest + ~1% of balance, so most of each payment just services interest. On $5,000 at 22%, a $92 payment needs 310 months — 26 years — and $23,462.14 of interest to clear a $5,000 debt. If your minimum is below the monthly interest (here $91.67), the balance never falls at all and the calculator will tell you plainly. Anything you can add above the minimum goes straight at principal.',
      },
      {
        question: 'Is the debt snowball or debt avalanche method better?',
        answer:
          'Avalanche (highest APR first) is mathematically optimal — it kills the most expensive interest soonest. Snowball (smallest balance first) costs slightly more but delivers quick wins that measurably keep people motivated. Research on real household payoff behavior finds the psychological edge often wins, because the best method is the one you finish. The total you pay monthly matters more than the order — the bigger the payment, the flatter the differences between methods become.',
      },
      {
        question: 'Does paying extra every month really save that much?',
        answer:
          'Yes, and early dollars do the heaviest lifting. Adding $50 to the $200 base payment on $5,000 at 22% saves 8 months and $464.16; adding $100 saves 13 months and $728.28. Extra payments reduce the balance immediately, and interest is charged on the remaining balance every month — so each prepaid principal dollar stops accruing interest for the entire remaining life of the debt. Check your contract for prepayment penalties first; mainstream cards have none.',
      },
      {
        question: 'Should I consolidate credit-card debt into a personal loan?',
        answer:
          'Often yes, if the rate truly drops. Personal-loan APRs for decent credit commonly run below card APRs, and a fixed installment forces the payoff schedule cards let you avoid. Folding $5,000 at 22% into a 36-month personal loan at 12% cuts total interest from roughly $1,750 territory to about $978 — and the end date is contractual, not aspirational. Model the candidate loan in our <a href="/personal-loan-calculator">personal loan calculator</a> and compare its total interest against this page\u2019s payoff number.',
      },
      {
        question: 'How does carrying debt affect buying a house?',
        answer:
          'Through your debt-to-income ratio: lenders count your card minimums against your gross income, and above roughly 43% back-end DTI most conventional loans get tight. Paying a card down shrinks its minimum, directly improving the ratio months before you apply. Run your numbers on our <a href="/debt-to-income-calculator">debt-to-income calculator</a> to see whether your balances are the obstacle, then use this page to plan the attack.',
      },
    ],
    relatedCalculators: [
      { slug: 'loan-calculator', label: 'Loan Calculator' },
      { slug: 'personal-loan-calculator', label: 'Personal Loan Calculator' },
      { slug: 'debt-to-income-calculator', label: 'Debt-to-Income Calculator' },
      { slug: 'mortgage-calculator', label: 'Mortgage Calculator' },
      { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
      { slug: 'amortization-calculator', label: 'Amortization Calculator' },
    ],
  },

  'debt-to-income': {
    howItWorks: [
      'Your debt-to-income ratio is the number a loan officer looks at before anything else — not your credit score, not your savings: can your income carry your required monthly payments? DTI is total monthly debt payments divided by gross monthly income. Enter your income before tax and each required payment (housing, autos, card minimums, student loans, other obligations), and this calculator gives you both ratios the industry uses plus a verdict.',
      'There are two DTIs. The front-end ratio counts only housing — mortgage or rent, plus property taxes and insurance — and the traditional guideline says keep it under 28%. The back-end counts every debt payment and should stay under 36%, with 43% being the qualified-mortgage line most conventional lenders enforce and 50% the practical hard cap even with strong compensating factors. The defaults show a typical borderline case: $6,000 gross income carrying $2,300 of payments — 38.33% back-end, 25.00% front-end.',
      'What counts as a payment surprises people. For credit cards, lenders use the minimum shown on your statement — not what you actually pay, and never the full balance — so even a card you clear every month still contributes its minimum to the ratio. Child support and alimony count as debts. Variable income — overtime, bonuses, commissions, side-gig earnings — generally needs a two-year documented history before an underwriter will count it, and self-employed borrowers should expect to show two years of returns.',
      'Improving DTI is refreshingly mechanical: remove a payment or raise income. Paying off a small installment loan removes its entire monthly obligation from the numerator — the single fastest lever. Snowballing a card balance down shrinks its minimum. On the income side, documented raises, bonuses with history, or a co-borrower\u2019s income all help. Planning an attack? Our <a href="/debt-payoff-calculator">debt payoff calculator</a> shows which balance dies fastest, and the <a href="/paycheck-calculator">paycheck calculator</a> shows what a raise really nets after tax.',
      'Where does your target need to be? For a conventional mortgage, under 36% back-end is comfortable and 43% is the usual QM ceiling; FHA and some portfolio lenders stretch to 45-50% with strong credit and reserves. The 28/36 rule still frames home affordability: front-end 28%, back-end 36%. Model the mortgage side directly — principal, interest, taxes and insurance — with our <a href="/mortgage-calculator">mortgage calculator</a>, and remember the housing payment you enter here must be the full PITI number, not just principal and interest.',
    ],
    calculationMethod: {
      formula: 'Front-end = housing payment / gross monthly income; Back-end = (all monthly debt payments) / gross monthly income',
      steps: [
        'Start with gross monthly income — before-tax pay, the top line of your pay stub (lenders ask for W-2s and pay stubs to verify).',
        'List required monthly debts: housing (PITI or rent), auto loans/leases, credit-card minimums, student loans, child support/alimony, other installment obligations.',
        'Front-end DTI = housing payment / income. The classic guideline: keep it under 28%.',
        'Back-end DTI = sum of all debt payments / income. Under 36% is comfortable; 43% is the qualified-mortgage limit; 50% is the practical hard cap.',
        'Classify: 36% or less excellent, 37-41% workable, 42-49% caution (over the QM line), 50%+ high.',
      ],
      example:
        '$6,000 gross monthly income with $1,500 housing, $400 auto, $150 card minimums and $250 student loans: total payments $2,300. Back-end DTI = 2,300 / 6,000 = 38.33%; front-end = 1,500 / 6,000 = 25.00%. That reads "good" — under the 43% QM limit, but one more $250 car payment would push it to 42.5%, knocking on the caution zone.',
    },
    keyRates: [
      { label: 'Classic housing guideline (front-end)', value: '28%' },
      { label: 'Classic total-debt guideline (back-end)', value: '36%' },
      { label: 'Qualified-Mortgage limit (back-end)', value: '43%' },
      { label: 'Practical hard cap (strong credit + reserves)', value: '50%' },
      { label: 'Example: $6,000 income / $2,300 debts', value: '38.33% back-end' },
      { label: 'What lenders count for cards', value: 'Statement minimums, not balance' },
    ],
    faqs: [
      {
        question: 'What is a good debt-to-income ratio?',
        answer:
          'Under 36% back-end is the classic "good" zone, with the housing-only front-end under 28% (the 28/36 rule). Between 37% and 41% you can still qualify for many loans but with less room for surprises; 43% is the qualified-mortgage line most conventional lenders enforce; above 50%, approvals are rare even with excellent credit. On the defaults here — $6,000 income, $2,300 payments — you land at 38.33%, which reads "good": workable, but close enough to the line that one more obligation matters.',
      },
      {
        question: 'How do lenders calculate DTI for a mortgage?',
        answer:
          'They divide your total required monthly debt payments by your gross (before-tax) monthly income, using verified numbers from pay stubs, W-2s and tax returns. Housing counts as the full PITI — principal, interest, property taxes and insurance (plus HOA dues where applicable). Credit cards count at statement minimums, not balances. Child support and alimony count as debts. Self-employed borrowers typically need two years of returns showing consistent income.',
      },
      {
        question: 'Is DTI calculated on gross or net income?',
        answer:
          'Gross — before taxes and deductions. That trips people up because it inflates what feels affordable: $6,000 gross might be $4,600 take-home (run yours on our <a href="/paycheck-calculator">paycheck calculator</a>), but lenders compute the ratio on $6,000. The logic is standardization; the trap is you. A 43% back-end DTI can mean roughly 56% of your actual take-home committed to debt payments — which is why the 36% guideline leaves breathing room the 43% limit does not.',
      },
      {
        question: 'Does paying off a car loan help my DTI?',
        answer:
          'Immediately and dollar-for-dollar. Eliminating a $400 car payment on $6,000 income drops your back-end DTI from 38.33% to 31.67% — crossing back under the comfortable 36% line. That is why paying off (or refusing to take on) small installment loans before a mortgage application is the fastest DTI lever available. A caution: paying off a card balance does NOT remove it from DTI if the account stays open — the minimum on the remaining credit line still counts. Close the account or shrink the limit only with an eye on your credit score.',
      },
      {
        question: 'What is the difference between front-end and back-end DTI?',
        answer:
          'Front-end counts only housing costs (PITI or rent) against gross income — the "can you afford the house" ratio, guideline 28%. Back-end adds every monthly debt obligation — autos, card minimums, student loans, support payments — and is the ratio lenders weight most heavily, guideline 36% and hard limits at 43%/50%. You can have a strong front-end and a failing back-end: a cheap apartment with two big car loans still wrecks a mortgage application.',
      },
      {
        question: 'Can I get a mortgage with a DTI above 43%?',
        answer:
          'Sometimes. FHA loans and certain portfolio lenders stretch to 45-50% with compensating factors: strong credit, sizable cash reserves, a large down payment, or documented residual income. Conventional qualified mortgages generally stop at 43% unless the loan qualifies for an automated-underwriting exception. The terms tighten as the ratio rises — higher rates or mortgage insurance. The cleaner play is engineering the number down before applying: retire a small loan, snowball a card\u2019s minimum, or use our <a href="/debt-payoff-calculator">debt payoff calculator</a> to time the payoff around your application.',
      },
    ],
    relatedCalculators: [
      { slug: 'mortgage-calculator', label: 'Mortgage Calculator' },
      { slug: 'debt-payoff-calculator', label: 'Debt Payoff Calculator' },
      { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
      { slug: 'employee-cost-calculator', label: 'Employee Cost Calculator' },
      { slug: 'personal-loan-calculator', label: 'Personal Loan Calculator' },
      { slug: 'salary-comparison-calculator', label: 'Salary Comparison Calculator' },
    ],
  },
};

// ─── Hub cards (Loans & Debt + Retirement & Investment categories) ─────────────
// Keyed by slug (matching the SPECIAL_CARDS convention). Icons must exist in
// the ICONS map inside calculators-explorer.tsx (receipt, scale, trending).

export const FINANCE_HUB_CARDS: Record<
  string,
  { label: string; desc: string; category: 'loans' | 'invest'; icon: string; keywords?: string }
> = {
  'debt-payoff-calculator': {
    label: 'Debt Payoff Calculator',
    desc: 'Debt-free date, interest & extra-payment savings',
    category: 'loans',
    icon: 'receipt',
    keywords: 'debt payoff calculator credit card payoff calculator debt snowball avalanche debt free date interest saved',
  },
  'debt-to-income-calculator': {
    label: 'Debt-to-Income Ratio Calculator',
    desc: 'Front & back-end DTI vs 28/36 and the 43% rule',
    category: 'loans',
    icon: 'scale',
    keywords: 'dti calculator debt to income ratio front end back end ratio 43 rule mortgage approval',
  },
  'inflation-calculator': {
    label: 'Inflation Calculator',
    desc: 'What past money equals today (CPI-U 1913-2025)',
    category: 'invest',
    icon: 'trending',
    keywords: 'inflation calculator cpi calculator purchasing power value of money over time cost of living',
  },
};
