/**
 * Savings & investment calculator group additions:
 * cd-calculator, investment-calculator, interest-calculator.
 *
 * This module is data-only and tree-shakeable. It carries:
 *  - SAVINGS_ROUTES: registry entries (CalculatorRouteConfig shape)
 *  - SAVINGS_CONTENT: SSR content blocks (CalculatorContent shape)
 *  - SAVINGS_HUB_CARDS: /calculators hub cards keyed by registry slug
 *
 * Every numeric figure in this file was verified against
 * src/lib/savings-math.ts with bun scratch scripts (see worklog 39-c).
 * Rates labeled "typical" or "historical" are context, never guarantees.
 */

import type { CalculatorRouteConfig } from '@/lib/calculator-routes';
import type { FAQItem } from '@/lib/faq-data';

// ─── Routes ──────────────────────────────────────────────────────────────────

export const SAVINGS_ROUTES: CalculatorRouteConfig[] = [
  {
    slug: 'cd-calculator',
    title: 'CD Calculator 2026 — Maturity Value & Interest Growth',
    description:
      'Free CD calculator for 2026. Enter deposit, APY and term to see maturity value, total interest and early-withdrawal penalty costs. FDIC insured. No sign-up.',
    h1: 'CD Calculator (Certificate of Deposit)',
    metaTitle: 'CD Calculator 2026 — CD Maturity Value & Interest Earned',
    metaDesc:
      'Free 2026 CD calculator: deposit + APY + term = maturity value, total interest and early-withdrawal penalty impact. FDIC-insured growth, no sign-up required.',
    keywords: [
      'cd calculator', 'certificate of deposit calculator', 'cd interest calculator',
      'cd maturity calculator', 'cd rate calculator', 'cd apy calculator',
      'cd ladder calculator', 'cd early withdrawal penalty calculator',
      'fdic cd calculator', 'best cd rates calculator', 'free cd calculator 2026',
    ],
    componentKey: 'cd',
    category: 'investment',
    breadcrumbLabel: 'CD Calculator',
    ogTitle: 'CD Calculator 2026 — CD Maturity Value & Interest',
    ogDescription:
      'Free CD calculator: deposit + APY + term = maturity value and total interest. Early-withdrawal penalties and FDIC limits explained. No sign-up.',
    canonicalPath: '/cd-calculator',
    jsonLdType: 'cd',
  },
  {
    slug: 'investment-calculator',
    title: 'Investment Calculator 2026 — Growth Net of Fees & Inflation',
    description:
      'Free investment calculator for 2026. Project growth from an initial sum plus monthly contributions, then see what fees and inflation cost you. No sign-up.',
    h1: 'Investment Calculator (Growth, Fees & Inflation)',
    metaTitle: 'Investment Calculator 2026 — Growth, Fees & Inflation',
    metaDesc:
      "Free 2026 investment calculator: initial sum + monthly contributions, growth, fee drag and inflation-adjusted value in today's dollars. No sign-up required.",
    keywords: [
      'investment calculator', 'investment growth calculator', 'investment return calculator',
      'portfolio calculator', 'investment projection calculator',
      'future value investment calculator', 'fee impact calculator',
      'expense ratio calculator', 'inflation adjusted investment calculator',
      'roi calculator', 'free investment calculator 2026',
    ],
    componentKey: 'investments',
    category: 'investment',
    breadcrumbLabel: 'Investment Calculator',
    ogTitle: 'Investment Calculator 2026 — Growth, Fees & Inflation',
    ogDescription:
      'Free investment calculator: project growth from an initial sum + monthly contributions, net of fees and inflation. See the lifetime cost of 1% fees. No sign-up.',
    canonicalPath: '/investment-calculator',
    jsonLdType: 'investments',
  },
  {
    slug: 'interest-calculator',
    title: 'Interest Calculator 2026 — Simple vs Compound, Cumulative',
    description:
      'Free interest calculator for 2026: simple vs compound interest side by side plus cumulative interest by year. See how much compounding pays you. No sign-up.',
    h1: 'Interest Calculator (Simple vs Compound)',
    metaTitle: 'Interest Calculator 2026 — Simple vs Compound Interest',
    metaDesc:
      'Free 2026 interest calculator: simple vs compound interest side by side, cumulative interest by year, daily or monthly compounding. No sign-up required.',
    keywords: [
      'interest calculator', 'simple interest calculator', 'cumulative interest calculator',
      'simple vs compound interest calculator', 'monthly interest calculator',
      'daily interest calculator', 'annual interest calculator',
      'simple interest formula calculator', 'interest rate calculator',
      'how to calculate interest', 'free interest calculator 2026',
    ],
    componentKey: 'interest',
    category: 'investment',
    breadcrumbLabel: 'Interest Calculator',
    ogTitle: 'Interest Calculator 2026 — Simple vs Compound Interest',
    ogDescription:
      'Free interest calculator: simple vs compound side by side with cumulative interest by year. Daily, monthly, quarterly compounding compared. No sign-up.',
    canonicalPath: '/interest-calculator',
    jsonLdType: 'interest',
  },
];

// ─── Content shape (mirrors the app's CalculatorContent interface) ───────────

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

// ─── Content ─────────────────────────────────────────────────────────────────

export const SAVINGS_CONTENT: Record<string, AdditionContentShape> = {
  // ── CD Calculator ──────────────────────────────────────────────────────
  cd: {
    howItWorks: [
      'A certificate of deposit is a simple bargain with a bank: you hand over a deposit, the bank hands back a fixed APY for a fixed term, and neither side can renegotiate. The rate is locked even if the Fed slashes rates the month after you sign - which is the entire appeal versus a savings account whose APY drifts down with the market. The price of that lock is access: pull the money early and a penalty takes a bite of your interest. This calculator shows the full arc - maturity value, total interest, and how the balance grows at checkpoints along the term.',
      'The math is unusually honest because of how CDs are quoted. Banks advertise APY - annual percentage yield - which by law already includes the effect of monthly or daily compounding. So the calculator grows your deposit by a factor of (1 + APY) per year and nothing else: a 12-month CD at 4.25% turns $10,000 into $10,425.00, and the same APY held for 60 months compounds to $12,313.47 - $2,313.47 of interest on a deposit that never once surprised you.',
      'Early withdrawal is where CDs bite. Break one open and the bank typically forfeits a set amount of interest - often around 3 months on a 1-year CD and up to 12 months on a 5-year CD (typical; each bank sets its own schedule). If the penalty exceeds the interest already credited, the difference comes out of principal. No-penalty CDs exist but pay a lower APY for the courtesy. Before locking a term, match it to when you will actually need the money.',
      'Safety is the other half of the pitch. Bank CDs are FDIC insured up to $250,000 per depositor, per bank, per ownership category - credit unions offer the identical limit through the NCUA. Held to maturity, there is no market risk, no volatility, no scenario where the number comes out lower. The one enemy a CD cannot escape is inflation: a 4.25% APY in a 3% inflation world is roughly a 1.2% real return, which is fine for near-term money and a poor long-term engine.',
      'Two follow-ups worth doing after you get your number. First, taxes: CD interest is ordinary income in the year it is credited - our <a href="/federal-tax-brackets">federal tax brackets</a> page converts the APY into an after-tax yield. Second, structure: the ladder comparison above shows that splitting the same deposit into 1-year tranches costs nothing at equal APYs - and for open-ended growth with contributions, the <a href="/investment-calculator">investment calculator</a> picks up where a fixed term ends.',
    ],
    calculationMethod: {
      formula: 'Maturity Value = Deposit x (1 + APY)^(months / 12)',
      steps: [
        'Confirm the quoted rate is an APY (it embeds compounding; never add a compounding frequency on top)',
        'Convert the term to years: months divided by 12',
        'Raise (1 + APY) to that power - fractional exponents handle partial years exactly',
        'Multiply by the deposit to get the maturity value',
        'Subtract the deposit to get total interest',
        'Divide total interest by the term in months for the monthly average',
      ],
      example:
        '$10,000 at 4.25% APY for 12 months: A = 10000 x (1.0425)^(12/12) = 10000 x 1.0425 = $10,425.00, so total interest is $425.00 - about $35.42 per month. Held for 60 months instead: A = 10000 x (1.0425)^5 = $12,313.47, earning $2,313.47 without a single rate change.',
    },
    keyRates: [
      { label: 'Typical 1-year CD APY (2026)', value: '~3% to ~5% (typical)' },
      { label: 'Typical 5-year CD APY (2026)', value: '~3.5% to ~5% (typical)' },
      { label: 'FDIC insurance limit', value: '$250,000 per depositor, per bank' },
      { label: 'Typical early-withdrawal penalty', value: '3-12 months of interest (varies by bank)' },
      { label: 'APY vs APR', value: 'APY includes compounding; APR does not' },
      { label: 'Real yield at 4.25% APY, 3% inflation', value: '~1.2% per year' },
    ],
    faqs: [
      {
        question: 'What happens when my CD matures?',
        answer:
          "A CD has a hard end date, and what you do in the days around it matters more than people expect. Most banks give you a short grace window after maturity - commonly around 7 to 10 days, though it varies (typical) - during which you can withdraw the cash, renew at the then-current rate for the same term, or move it to a different term. If you do nothing, the bank usually auto-renews the CD at its current rate, which can be much lower than the rate you originally locked. That is why expiring CDs deserve a calendar reminder: a silent auto-renewal at a worse APY quietly costs you money every month you leave it there. Decide before the window closes.",
      },
      {
        question: 'Are CD earnings taxable?',
        answer:
          "Yes. CD interest is taxed as ordinary income in the year the bank credits it - not the year the CD matures - even if you leave the interest inside the CD. If a 12-month CD pays interest only at maturity, that lands in that year's income; if it pays monthly, each month's credit counts that year. Banks report interest on Form 1099-INT, and starting with interest paid in 2026 the reporting threshold rose from $10 to $600 under the new tax law - but the tax itself is owed on every dollar whether or not a form arrives. The bite depends on your marginal rate, so check our <a href=\"/federal-tax-brackets\">federal tax brackets</a> page before assuming the APY is your net yield.",
      },
      {
        question: 'How do early-withdrawal penalties work?',
        answer:
          "Breaking a CD early usually costs a set amount of interest, and the typical schedule scales with the term: often around 3 months of interest on a 1-year CD, 6 months on 2- to 3-year terms, and 12 months on 5-year CDs (typical - every bank sets its own). Two fine points trip people up. First, if you exit before much interest has accrued, the penalty can exceed what the CD has earned, and the bank takes the difference out of your principal. Second, there is no pro-rating: the penalty is the same whether you withdraw in month 2 or month 11. No-penalty CDs exist but pay a lower APY. If access matters, a CD ladder keeps most of your money within 12 months of freedom.",
      },
      {
        question: 'Is FDIC insurance really $250,000?',
        answer:
          "For bank CDs, yes: the FDIC insures up to $250,000 per depositor, per bank, per ownership category - so a single person with an individual account is covered up to $250,000 at that bank, while a joint account generally doubles the coverage to $500,000 because each co-owner counts. The limit applies across ALL accounts at that bank combined, not per CD, so spreading $600,000 across three CDs at the same bank does not triple your protection. Credit unions offer the equivalent coverage through the NCUA. One caveat: brokered CDs bought through a brokerage still count toward FDIC limits at the issuing bank, so confirm the issuer is an FDIC member before large purchases. Above the limits, use multiple banks or Treasuries.",
      },
      {
        question: "What's the difference between APY and APR on a CD?",
        answer:
          "APR is the raw annual rate before compounding; APY is what you actually earn after the bank compounds it. If a CD pays a 4.15% nominal rate compounded monthly, the monthly slices of interest start earning interest too, and the true yearly growth works out to 4.23% - that effective figure is the APY. U.S. banks must quote APY on deposit products under the Truth in Savings Act precisely so you can compare offers without doing the conversion yourself. Practical rule: for CDs, compare APY to APY and ignore APR entirely; for loans, the reverse holds. And if a rate looks unusually high, confirm whether it is promotional or a stepped rate - only the APY tells you the real, full-term yield.",
      },
      {
        question: 'Should I build a CD ladder or buy one long CD?',
        answer:
          "A ladder splits your deposit across staggered terms - classically five equal chunks in 1-, 2-, 3-, 4-, and 5-year CDs - so a piece matures every year. You get recurring access to cash without giving up longer-term rates entirely, and each rung reinvests at whatever rates are current. The trade is liquidity for yield: in a normal market, 5-year CDs pay more than 1-year CDs, so a laddered blend usually earns a bit less than a single long CD. The calculator above shows the purest version: with identical APYs, five rolled 1-year tranches finish with exactly the same dollars as one 5-year CD - proof the ladder's value is flexibility, not extra yield. Prefer access over the last quarter-point? Ladder.",
      },
      {
        question: 'Can I actually lose money in a CD?',
        answer:
          "Held to maturity at an FDIC-insured bank and under the insurance limits, a CD cannot lose nominal principal. The two ways people do lose: breaking it early (a penalty above accrued interest eats principal) and inflation. Inflation is the sneaky one - a 4.25% APY with 3% inflation is only about a 1.2% real return, so in years when inflation runs hotter than the APY, your purchasing power shrinks even as the dollar balance grows. That is the real argument for matching CD terms to goals: short terms for money you will spend soon, longer terms to lock yields, and equities - not CDs - for decades-long growth. The calculator's numbers are nominal on purpose; the quiet tax on 'safe' is always inflation.",
      },
    ],
    relatedCalculators: [
      { slug: 'compound-interest-calculator', label: 'Compound Interest Calculator' },
      { slug: 'interest-calculator', label: 'Interest Calculator' },
      { slug: 'investment-calculator', label: 'Investment Calculator' },
      { slug: 'federal-tax-brackets', label: 'Federal Tax Brackets' },
      { slug: 'roth-ira-calculator', label: 'Roth IRA Calculator' },
      { slug: 'retirement-calculator', label: 'Retirement Calculator' },
    ],
  },

  // ── Investment Calculator ─────────────────────────────────────────────
  investments: {
    howItWorks: [
      'This calculator answers a portfolio question, not a savings-account question: given an initial sum and a monthly habit, what do you actually end up with - after the expense ratio you pay, and restated in money you can spend? Most growth calculators stop at the nominal number, which flatters the plan twice: once by ignoring the 0.05%-to-1% fee silently skimmed every year, and once by letting a 2046 dollar masquerade as a 2026 dollar. Here both drags are on the label.',
      'The engine is the standard monthly-compounded annuity: the initial investment grows at the net return (expected return minus fee), each monthly contribution lands at month-end and compounds from there, and the future value is the sum. On the defaults - $10,000 initial, $500 a month, 7% expected return, 0.05% fee, 20 years - the plan reaches $298,875.65 nominal on $130,000 of deposits: $168,875.65 of growth did the heavy lifting.',
      "Then comes the translation most people skip. At 3% inflation, prices multiply by about 1.806 over 20 years, so dividing the nominal pile by that factor gives its real value: $165,480.20 in today's dollars. Both numbers are true - they describe the same cash measured against different price levels. Planning on the nominal figure alone is how a target that looked like $300,000 arrives feeling like $165,000 did.",
      'The fee experiment below is the differentiator worth staring at. The identical plan at a typical 1% active-fund fee ends at $264,122.49 instead of $298,875.65 - a $34,753.16 lifetime difference for the same deposits, same market, same patience. Fees compound against you exactly the way returns compound for you: every dollar skimmed in year one never gets to grow for the remaining nineteen.',
      'What this projection deliberately leaves out is taxes on the growth, because the account wrapper decides that part. In a taxable brokerage account, long-term gains run 0%, 15%, or 20% federally (plus a 3.8% NIIT at higher incomes) - our <a href="/capital-gains-calculator">capital gains calculator</a> prices that drag. Inside a 401(k) or Roth, the wrapper changes everything: a match is free money (see the <a href="/401k-retirement-calculator">401(k) calculator</a>) and Roth compounding is tax-free (see the <a href="/roth-ira-calculator">Roth IRA calculator</a>).',
    ],
    calculationMethod: {
      formula:
        'FV = P x (1+i)^m + PMT x [((1+i)^m - 1) / i]   where i = (return% - fee%) / 12, m = 12 x years   |   Real FV = FV / (1 + inflation%)^years',
      steps: [
        'Compute the net return: expected return minus expense ratio (7% - 0.05% = 6.95%)',
        'Convert to a monthly rate: i = 6.95% / 12 = 0.5792% per month',
        'Grow the initial investment by (1+i)^m where m = months',
        'Add the monthly contribution stream as an ordinary annuity: PMT x [((1+i)^m - 1) / i]',
        'Divide the nominal result by (1 + inflation)^years to restate it in today dollars',
        'Re-run with a different fee to quantify fee drag - the shortfall is the lifetime fee cost',
      ],
      example:
        '$10,000 initial + $500/month at 7% with a 0.05% fee for 20 years: i = 0.0695/12. FV = 10000 x (1+i)^240 + 500 x [((1+i)^240 - 1)/i] = $298,875.65 nominal. Inflation-adjusted at 3%: 298,875.65 / 1.03^20 = 298,875.65 / 1.806111 = $165,480.20 in today dollars. Total invested: $130,000.00; growth: $168,875.65. At a 1% fee the same plan ends at $264,122.49 - the fee difference alone is $34,753.16.',
    },
    keyRates: [
      { label: 'S&P 500 long-run average', value: '~10% nominal / ~7% real (historical)' },
      { label: 'Typical planning return (diversified)', value: '5% to 7% per year (typical)' },
      { label: 'Typical index fund expense ratio', value: '0.03% to 0.20% (typical)' },
      { label: 'Typical active fund expense ratio', value: '0.5% to 1%+ (typical)' },
      { label: 'Long-run U.S. inflation', value: '~3% per year (historical average)' },
      { label: '2026 long-term capital gains', value: '0% / 15% / 20% + 3.8% NIIT' },
    ],
    faqs: [
      {
        question: 'What return should I assume for my investments?',
        answer:
          "Start from what the money is invested in, then subtract costs. U.S. large-cap stocks have averaged roughly 10% a year nominal over the long run - about 7% after inflation (historical, not a promise) - while a diversified 60/40-style portfolio has historically landed nearer 7-8%, and bonds less. For planning, most practitioners dial down to 5-7% nominal so one bad decade cannot wreck the plan. Two adjustments matter more than decimal-point precision: subtract your expense ratio (this calculator does it for you), and remember that your final working years carry sequence-of-returns risk - the average is not the experience. If your plan only works at 10%, the plan is fragile.",
      },
      {
        question: 'Do investment fees really matter that much?',
        answer:
          "More than almost anything else you control. Run the same $10,000 initial plus $500 a month at 7% for 20 years: at a 0.05% index-fund fee the plan reaches $298,875.65; at a typical 1% active-fund fee it reaches $264,122.49. The fee difference is 0.95 percentage points a year; the lifetime difference is $34,753.16 - more than a quarter of everything you deposited. Fees compound against you: every dollar the fund skims in year one never compounds for the remaining nineteen. Low-cost index funds typically charge 0.03-0.20%; many active funds charge 0.5-1%+ without reliably beating their benchmark after costs. If you change one thing after this calculator, check your expense ratio.",
      },
      {
        question: "What does inflation-adjusted or 'today's dollars' mean?",
        answer:
          "It restates future money in today's purchasing power. At 3% average inflation, prices multiply by about 1.806 over 20 years, so a dollar in 2046 buys roughly 55 cents of today's goods. Dividing the nominal balance by 1.806 gives the real balance: the default plan ends at $298,875.65 nominal but $165,480.20 in 2026 dollars - the same pile of cash measured against different price levels. Planning only on the nominal figure is how people discover at 65 that their 'million' buys what $554,000 buys today. A useful shortcut: subtract inflation from your return (7% - 3% = 4% real) and project with that; this calculator shows both views side by side instead.",
      },
      {
        question: 'How are my investment gains taxed?',
        answer:
          "In a regular taxable brokerage account, the growth shown here is not what you keep. Long-term capital gains on assets held over a year are taxed at 0%, 15%, or 20% depending on income, plus a 3.8% net investment income tax above $200,000 single / $250,000 joint. Qualified dividends get the same treatment; ordinary dividends and interest are taxed as regular income. Mutual funds can also distribute taxable gains annually even if you never sell. The wrappers change the math completely: a 401(k) compounds tax-deferred, a Roth compounds tax-free, and an HSA is deductible going in and tax-free out for medical costs. Price the taxable bite with our <a href=\"/capital-gains-calculator\">capital gains calculator</a>, or model the wrapper with the 401(k) and Roth IRA calculators.",
      },
      {
        question: 'Is a lump sum better than monthly contributions?',
        answer:
          "Both work; they do different jobs. A lump sum gets the longest possible time in the market, and historically money invested earlier has tended to outperform waiting - but most people do not have a lump sum, and monthly contributions are how real portfolios get built: automatic, boring, and immune to market-timing temptation. A fair way to hold it: the lump sum wins on expected value, dollar-cost averaging wins on behavior and sleep. This calculator supports both at once - enter existing savings as the initial amount and the automatic transfer as the monthly figure. Deciding whether to invest a bonus all at once or over twelve months? Run both scenarios here and see how small the difference is at your horizon.",
      },
      {
        question: 'How is this different from the compound interest calculator?',
        answer:
          "The <a href=\"/compound-interest-calculator\">compound interest calculator</a> answers 'how does a starting balance plus monthly savings snowball?' - pure growth, Rule of 72, milestones, zero subtractions. This one answers 'what does my portfolio actually deliver after the drags?' - it subtracts your expense ratio before projecting and restates the ending balance in today's dollars, so the number you see is spendable, not just large. They share the same underlying annuity math; the difference is what each one removes. Use the compound tool for motivation and savings goals, this one for fee comparison and inflation reality, and the <a href=\"/401k-retirement-calculator\">401(k) calculator</a> when an employer match and contribution limits are in play.",
      },
      {
        question: 'What about investing inside a 401(k) or Roth IRA?',
        answer:
          "The account wrapper matters almost as much as the return. A 401(k) with a match is the single best first dollar most people can invest: the match is an instant 50-100% return no market offers, up to the 2026 elective deferral limit of $24,500. Roth contributions compound completely tax-free, and qualified withdrawals in retirement cost nothing on decades of gains - which changes which of this calculator's numbers you care about, because for a Roth the nominal figure is much closer to what you keep. This projection is pre-tax by design, so treat it as the account-level view: for match modeling use the <a href=\"/401k-retirement-calculator\">401(k) calculator</a>, and for the contribute-now-vs-withdraw-later tradeoff see the <a href=\"/roth-ira-calculator\">Roth IRA calculator</a>.",
      },
    ],
    relatedCalculators: [
      { slug: 'compound-interest-calculator', label: 'Compound Interest Calculator' },
      { slug: '401k-retirement-calculator', label: '401(k) Calculator' },
      { slug: 'capital-gains-calculator', label: 'Capital Gains Calculator' },
      { slug: 'retirement-calculator', label: 'Retirement Calculator' },
      { slug: 'roth-ira-calculator', label: 'Roth IRA Calculator' },
      { slug: 'cd-calculator', label: 'CD Calculator' },
    ],
  },

  // ── Interest Calculator ────────────────────────────────────────────────
  interest: {
    howItWorks: [
      'Simple interest is the flat-rate world: every year pays the same amount, computed only on the original principal. The formula is I = P x r x t - principal times rate times time - so $10,000 at 5% earns exactly $500 a year, every year: $5,000 over a decade, $15,000 total. No memory, no momentum. That predictability is why lenders love it for auto loans and installment personal loans, and why extra principal payments reduce total interest so predictably.',
      'Compound interest is the accelerating world: each period, interest is added to the balance, and the next period charges interest on that bigger balance. The formula is A = P(1 + r/n)^(n x t), where n is the number of compounding periods per year. The same $10,000 at 5% compounded monthly ends year one at $10,511.62 - close to simple - and year ten at $16,470.09, which is not close at all.',
      'The comparison is the whole point of this tool. Same principal, same rate, same years: simple finishes at $15,000.00 while monthly compounding finishes at $16,470.09 - a $1,470.09 advantage that did not exist in year one (the gap was $11.62) and compounds along with the balance. The cumulative-by-year table lets you watch it open: $114.72 by year three, $490.18 by year six, $1,470.09 at year ten. By year nine, the compound side has already out-earned what simple collects in its entire ten years.',
      'Frequency matters less than people hope: at 5% for 10 years, annual compounding reaches $16,288.95, quarterly $16,436.19, monthly $16,470.09, daily $16,486.65. Each step up buys less than the last. That is why U.S. banks quote deposit rates as APY - one effective number that already accounts for whatever compounding frequency they use - and why our <a href="/cd-calculator">CD calculator</a> only ever asks for the APY.',
      'One caveat this calculator shows but does not subtract: interest income is generally taxable as ordinary income in the year it is credited (see the <a href="/federal-tax-brackets">federal tax brackets</a> page for the after-tax view), and this tool covers a single lump sum by design - for monthly deposits, doubling times, and the Rule of 72, graduate to the <a href="/compound-interest-calculator">compound interest calculator</a>.',
    ],
    calculationMethod: {
      formula: 'Simple: I = P x r x t   |   Compound: A = P x (1 + r/n)^(n x t)',
      steps: [
        'Simple interest: multiply principal by the decimal rate by the years (P x r x t)',
        'Simple total: add the principal back to get the final balance',
        'Compound: convert the annual rate to a per-period rate (r/n)',
        'Raise (1 + r/n) to the power of total periods (n x years)',
        'Multiply by the principal to get the compound balance',
        'Read the gap: compound interest minus simple interest is the compounding advantage',
      ],
      example:
        "$10,000 at 5% for 10 years. Simple: I = 10000 x 0.05 x 10 = $5,000.00, total balance $15,000.00. Compounded monthly: A = 10000 x (1 + 0.05/12)^(12 x 10) = $16,470.09, interest $6,470.09. Compounding advantage: $1,470.09 - and by year 9 the compound side ($5,668.47 cumulative) has already beaten simple interest's entire 10-year total of $5,000.00.",
    },
    keyRates: [
      { label: 'Simple interest formula', value: 'I = P x r x t' },
      { label: 'Compound interest formula', value: 'A = P x (1 + r/n)^(n x t)' },
      { label: '$10,000 at 5% for 10 years', value: 'Simple $5,000.00 vs monthly $6,470.09' },
      { label: 'Frequency spread at 5% / 10 yrs', value: 'Annual $6,288.95 to daily $6,486.65' },
      { label: 'Where simple is used', value: 'Auto loans, T-bills, many personal loans' },
      { label: 'Where compound is used', value: 'Savings, CDs, credit cards (against you)' },
    ],
    faqs: [
      {
        question: 'What is the difference between simple and compound interest?',
        answer:
          "Simple interest is a straight line: the same flat payment every year, computed only on the original principal. Compound interest curves: each period's interest is added to the balance, and the next period charges interest on that bigger balance - interest earning interest. On $10,000 at 5% for 10 years, simple pays exactly $500 a year for $5,000 total. Compounded monthly, the same rate pays $6,470.09 - a $1,470.09 bonus for doing nothing differently. After year one the two differ by only $11.62; in year ten alone the compound side pays $801.63 while simple still pays its flat $500. The longer the horizon and the higher the rate, the wider the gap opens.",
      },
      {
        question: 'Which is better, simple or compound interest?',
        answer:
          "Depends which side of the interest you are on. Earning: compound, always - at the same rate it strictly dominates simple, which is why savings accounts, CDs, and brokerage accounts all compound. Borrowing: you generally want the loan to charge simple interest, because it can never snowball on you - auto loans and most installment personal loans work this way, which is why extra principal payments save interest so predictably. Credit cards compound daily on an unpaid balance, which is the bad kind - and why paying a card off beats almost any investment return you could earn. The honest rule: when you are the depositor, insist on compound; when you are the borrower, insist on simple.",
      },
      {
        question: 'Where is simple interest actually used?',
        answer:
          "In more places than you would guess given how much everyone talks about compounding. Auto loans: almost always simple interest, computed on the remaining principal, so every extra dollar of principal you pay saves interest down the line. Most personal and fixed-installment loans: the same structure. U.S. Treasury bills: sold at a discount, so the yield works out to simple interest. Many private promissory notes and some older products use it too. And the everyday mental math of loans - '5% on $10,000 is $500 a year' - is the simple-interest formula I = P x r x t doing its thing. The takeaway: the money you borrow usually costs you a straight line, which is the kind of debt you can actually out-plan.",
      },
      {
        question: 'Where do I run into compound interest in real life?',
        answer:
          "Anywhere interest lands on a balance that already includes prior interest. Savings, money-market, and most checking accounts: compounding is daily or monthly, which is why banks quote APY rather than the raw rate. CDs: the APY bakes compounding in - which is why our <a href=\"/cd-calculator\">CD calculator</a> grows a deposit by (1 + APY) per year without ever asking about frequency. Credit cards: daily compounding on an unpaid balance, which is exactly why the number grows faster than the statement suggests. Mortgages run an amortization schedule that is compounding working in reverse - early payments are nearly all interest because it accrues on the largest balance. Brokerage and retirement accounts: compounding with a growth engine attached.",
      },
      {
        question: 'What is cumulative interest and how do I use the table?',
        answer:
          "Cumulative interest is the running total of everything earned from day one through the end of each year - this year's interest plus all prior years'. The table shows simple and compound cumulative totals side by side with the gap, so you can watch compounding pull away: on the defaults, the compound side is only $11.62 ahead after year one, $114.72 by year three, $490.18 by year six, and $1,470.09 by year ten. The single most useful line to find: by year nine, compounded monthly interest ($5,668.47) has already out-earned what simple interest collects in its full ten years ($5,000.00). That is the entire case for compounding in one row of the table.",
      },
      {
        question: 'Does daily compounding really beat monthly?',
        answer:
          "By a little, not a lot - and that surprises people in both directions. On $10,000 at 5% for 10 years: annually $16,288.95, quarterly $16,436.19, monthly $16,470.09, daily $16,486.65. Daily beats monthly by only about $16.55 over a decade. More frequent compounding helps because interest starts earning interest sooner, but each step up in frequency buys less than the last one did. What actually moves the number is the rate and the time - not the fifth decimal place of frequency. The industry's solution is APY: by law, deposit rates are quoted as an effective annual yield, so a 4.25% APY means 4.25% growth in a year no matter how the bank slices it. Compare APYs, not frequencies.",
      },
      {
        question: 'Is the interest I earn taxable?',
        answer:
          "Yes - interest from savings accounts, CDs, money-market funds, and most bonds is taxed as ordinary federal income in the year it is credited, at the same rates as your wages. That can take a real bite: in the 22% bracket, a 4.25% APY is about a 3.3% after-tax yield, and state income taxes stack on top where they exist. One 2026 change worth knowing: the reporting threshold for Form 1099-INT rose from $10 to $600 under the new tax law, so small interest amounts may no longer trigger a form - but the tax is still owed on every dollar whether or not the paperwork arrives. Municipal bond interest is the common exception, usually federally tax-exempt. Check our <a href=\"/federal-tax-brackets\">federal tax brackets</a> page to convert any rate into an after-tax one.",
      },
    ],
    relatedCalculators: [
      { slug: 'compound-interest-calculator', label: 'Compound Interest Calculator' },
      { slug: 'cd-calculator', label: 'CD Calculator' },
      { slug: 'investment-calculator', label: 'Investment Calculator' },
      { slug: 'mortgage-calculator', label: 'Mortgage Calculator' },
      { slug: 'auto-loan-calculator', label: 'Auto Loan Calculator' },
      { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
    ],
  },
};

// ─── Hub cards (keyed by registry slug) ──────────────────────────────────────

export interface AdditionHubCardShape {
  label: string;
  desc: string;
  category: string;
  icon: string;
  keywords?: string;
}

export const SAVINGS_HUB_CARDS: Record<string, AdditionHubCardShape> = {
  'cd-calculator': {
    label: 'CD Calculator',
    desc: 'Fixed-term APY growth, penalties & FDIC safety',
    category: 'invest',
    icon: 'shield',
    keywords: 'cd certificate of deposit apy maturity ladder fdic penalty',
  },
  'investment-calculator': {
    label: 'Investment Calculator',
    desc: 'Portfolio value net of fees & inflation',
    category: 'invest',
    icon: 'trending',
    keywords: 'invest portfolio growth fees expense ratio inflation projection',
  },
  'interest-calculator': {
    label: 'Interest Calculator',
    desc: 'Simple vs compound, cumulative by year',
    category: 'invest',
    icon: 'percent',
    keywords: 'interest simple compound cumulative daily monthly annually rate',
  },
};
