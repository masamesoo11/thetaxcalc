/**
 * Loans group additions for the calculator registry (Task 39-a).
 *
 * Four calculators: auto-loan, general loan, personal-loan, amortization.
 * This module is consumed by the orchestrator when merging new routes into
 * calculator-routes.ts, content into the [calculator] page content store,
 * and cards into the calculators hub (new "loans" category).
 *
 * Every number in the copy below was verified with bun scripts against
 * src/lib/loan-math.ts (standard annuity math, cents-level rounding at
 * display time). APR ranges are labeled "typical" and are approximations
 * for 2026, not guarantees.
 */

import type { CalculatorRouteConfig } from '@/lib/calculator-routes';
import type { FAQItem } from '@/lib/faq-data';

// ─── Route configs ─────────────────────────────────────────────────────────────

export const LOANS_ROUTES: CalculatorRouteConfig[] = [
  {
    slug: 'auto-loan-calculator',
    title: 'Auto Loan Calculator 2026 — Car Payment, Interest & Trade-In',
    description:
      'Free auto loan calculator: car payment with sales tax, trade-in and dealer fees. See monthly payment, total interest and a full payoff schedule. No sign-up.',
    h1: 'Auto Loan Calculator',
    metaTitle: 'Auto Loan Calculator 2026 — Car Payment & Total Cost',
    metaDesc:
      'Free auto loan calculator for 2026. Estimate your monthly car payment with sales tax, trade-in and dealer fees, plus total interest and payoff schedule.',
    keywords: [
      'auto loan calculator', 'car loan calculator', 'car payment calculator',
      'monthly car payment calculator', 'auto finance calculator', 'vehicle loan calculator',
      'car loan payment estimator', 'auto loan amortization', 'car affordability calculator',
      'how much car can i afford', 'auto loan with trade in', '2026 auto loan rates',
    ],
    componentKey: 'auto-loan',
    category: 'mortgage',
    breadcrumbLabel: 'Auto Loan Calculator',
    ogTitle: 'Auto Loan Calculator 2026 | Monthly Car Payment',
    ogDescription:
      'Calculate your monthly car payment with sales tax, trade-in and dealer fees built in. Total interest and payoff schedule included. Free, no sign-up.',
    canonicalPath: '/auto-loan-calculator',
    jsonLdType: 'auto-loan',
  },
  {
    slug: 'loan-calculator',
    title: 'Loan Calculator 2026 — Monthly Payment, Interest & Payoff Date',
    description:
      'Free loan calculator for any fixed-rate loan: monthly payment, total interest, payoff date and a year-by-year amortization schedule with extra-payment savings.',
    h1: 'Loan Calculator',
    metaTitle: 'Loan Calculator 2026 — Monthly Payment & Total Interest',
    metaDesc:
      'Free loan calculator for 2026. Compute any fixed-rate loan payment, total interest and payoff schedule, and see how extra payments cut months and interest.',
    keywords: [
      'loan calculator', 'payment calculator', 'loan payment calculator',
      'monthly payment calculator', 'loan interest calculator', 'loan payoff calculator',
      'loan amortization calculator', 'loan repayment calculator', 'extra payment calculator',
      'loan term comparison', 'installment loan calculator', '2026 loan calculator',
    ],
    componentKey: 'loan',
    category: 'mortgage',
    breadcrumbLabel: 'Loan Calculator',
    ogTitle: 'Loan Calculator 2026 | Payment, Interest + Payoff',
    ogDescription:
      'Free loan payment calculator with amortization schedule and extra-payment savings. Instant results, no sign-up required.',
    canonicalPath: '/loan-calculator',
    jsonLdType: 'loan',
  },
  {
    slug: 'personal-loan-calculator',
    title: 'Personal Loan Calculator 2026 — Payment, Interest & APR Bands',
    description:
      'Free personal loan calculator: monthly payment, total interest and 36 vs 48 vs 60 month comparisons, plus typical 2026 APR ranges by credit band. No sign-up.',
    h1: 'Personal Loan Calculator',
    metaTitle: 'Personal Loan Calculator 2026 — Monthly Payment & APR',
    metaDesc:
      'Free personal loan calculator for 2026. See your monthly payment, total interest cost and 36 vs 48 vs 60 month trade-offs, plus typical APR by credit band.',
    keywords: [
      'personal loan calculator', 'personal loan payment calculator', 'loan payment estimator',
      'personal loan interest calculator', 'unsecured loan calculator', 'personal loan APR',
      'personal loan rates 2026', 'monthly payment personal loan', 'personal loan payoff',
      'debt consolidation loan calculator', 'personal loan term comparison',
      'personal loan interest cost',
    ],
    componentKey: 'personal-loan',
    category: 'mortgage',
    breadcrumbLabel: 'Personal Loan Calculator',
    ogTitle: 'Personal Loan Calculator 2026 | Payment + Interest',
    ogDescription:
      'Estimate personal loan monthly payments, total interest and 36 vs 48 vs 60 month trade-offs. Typical APR by credit band included. Free, no sign-up.',
    canonicalPath: '/personal-loan-calculator',
    jsonLdType: 'personal-loan',
  },
  {
    slug: 'amortization-calculator',
    title: 'Amortization Calculator 2026 — Yearly Schedule & Interest Savings',
    description:
      'Free amortization calculator: full yearly schedule, cumulative interest chart and how extra payments change your payoff date. See why interest is front-loaded.',
    h1: 'Amortization Calculator',
    metaTitle: 'Amortization Calculator 2026 — Schedule & Extra Payments',
    metaDesc:
      'Free amortization calculator for 2026. Build a full yearly amortization schedule with a cumulative interest chart and extra-payment payoff comparison.',
    keywords: [
      'amortization calculator', 'amortization schedule', 'loan amortization calculator',
      'amortization table', 'mortgage amortization calculator', 'amortization with extra payments',
      'principal vs interest calculator', 'amortization chart', 'loan payoff schedule',
      'front loaded interest', 'cumulative interest calculator', 'amortization schedule 2026',
    ],
    componentKey: 'amortization',
    category: 'mortgage',
    breadcrumbLabel: 'Amortization Calculator',
    ogTitle: 'Amortization Calculator 2026 | Yearly Schedule + Chart',
    ogDescription:
      'Build a full yearly amortization schedule with a cumulative interest chart and extra-payment savings. Free, instant, no sign-up.',
    canonicalPath: '/amortization-calculator',
    jsonLdType: 'amortization',
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

export const LOANS_CONTENT: Record<string, AdditionContentShape> = {
  'auto-loan': {
    howItWorks: [
      'A car loan has more moving parts than most people realize: the sticker price is only the starting point. This calculator builds your amount financed from five pieces — vehicle price, down payment, trade-in value, sales tax and dealer fees — because in most states the taxable price is what remains after your trade-in allowance is subtracted, and any fee you do not pay in cash gets rolled into the balance. Change any input and every number on the page updates instantly.',
      'The payment itself comes from the standard fixed-rate annuity formula M = P x [r(1+r)^n] / [(1+r)^n - 1], where r is the APR divided by 12 and n is the number of monthly payments. On the default $35,000 car with $3,500 down, that is $31,500 financed at 6.5% APR for 60 months — a payment of $616.33, of which the first month sends $170.63 to interest and $445.71 to principal.',
      'Term length is the lever most buyers get wrong. Keeping our $31,500 example at 6.5% APR: 60 months costs $616.33 per month and $5,480.02 in total interest; 72 months drops the payment to $529.51 but raises interest to $6,624.92; 84 months gets the payment to $467.76 and the interest bill to $7,791.61. Going from 60 to 84 months saves $148.58 per month but costs $2,311.59 more over the life of the loan — and stretches the period where you owe more than the car is worth.',
      'Extra principal payments fight back hard. Adding just $50 per month to the default loan pays it off in 55 months instead of 60 and saves $492.99 in interest; $100 per month finishes in 51 months and saves $903.20. Because interest is charged on the remaining balance every single month, each skipped month at the end of the loan is interest you never pay. Check your contract for prepayment penalties first — most mainstream auto loans have none.',
      'Watch for 0% APR offers, and do the arithmetic before signing. On $31,500 for 60 months, 0% financing means a $525.00 payment and zero interest, versus $616.33 and $5,480.02 at 6.5%. A cash rebate competes better than it looks, though, because it also shrinks the balance you pay interest on — on this deal the break-even rebate is about $4,675, not the full $5,480. Dealers fund those promotions by holding the price; negotiate price first, then choose the financing. For other loan shapes, see our <a href="/loan-calculator">loan calculator</a> and <a href="/amortization-calculator">amortization calculator</a>.',
    ],
    calculationMethod: {
      formula: 'M = P x [r(1+r)^n] / [(1+r)^n - 1]   (r = APR / 12, n = term months)',
      steps: [
        'Compute the amount financed: P = price - down payment - trade-in + sales tax on (price - trade-in) + dealer fees.',
        'Convert the APR to a monthly rate: r = APR / 12 (6.5% APR gives r = 0.0054167).',
        'Count the payments: n = term in months (60 for a five-year loan).',
        'Apply the annuity formula M = P x [r(1+r)^n] / [(1+r)^n - 1] to get the level monthly payment.',
        'Month by month, interest = remaining balance x r and principal = payment - interest; repeat until the balance reaches zero.',
      ],
      example:
        '$35,000 car, $3,500 down, no trade-in, 0% sales tax, no fees, 6.5% APR, 60 months: P = $31,500, r = 0.0054167, n = 60. M = $616.33 per month. Total paid over the term is $36,980.02, of which $5,480.02 is interest — the car costs $40,480.02 including the down payment. Adding $100 per month finishes the loan in 51 months and saves $903.20 of interest.',
    },
    keyRates: [
      { label: 'New-car APR, strong credit (typical 2026)', value: '~5% - 9%' },
      { label: 'Used-car APR, strong credit (typical 2026)', value: '~6% - 12%' },
      { label: 'Deep-subprime auto APR (typical 2026)', value: '~13% - 20%+' },
      { label: 'Payment per $1,000 financed @ 6.5% / 60 mo', value: '$19.57' },
      { label: 'Payment per $1,000 financed @ 9% / 60 mo', value: '$20.76' },
      { label: 'Sales-tax base in most states', value: 'Price minus trade-in' },
    ],
    faqs: [
      {
        question: 'What is the monthly payment on a $35,000 car?',
        answer:
          "Financed the typical way — $3,500 down, no trade-in, 6.5% APR for 60 months — a $35,000 car means borrowing $31,500, which works out to $616.33 per month. Total interest over five years is $5,480.02, so once the down payment is counted the car effectively costs $40,480.02. Stretch the same loan to 72 months and the payment falls to $529.51, but interest climbs to $6,624.92; at 84 months you pay $467.76 per month and $7,791.61 total interest. Longer terms are easier on the monthly budget but consistently cost more overall, and they extend the stretch where you owe more than the depreciating car is worth.",
      },
      {
        question: 'How does a trade-in affect sales tax on a car?',
        answer:
          "In most states, sales tax is charged only on the difference between the new car's price and your trade-in allowance. On a $35,000 car with a $5,000 trade-in at an 8% tax rate, you pay tax on $30,000 — $2,400 instead of $2,800, keeping $400. That saving lowers your amount financed twice over: smaller taxable base and smaller balance to amortize. It is also why dealerships in high-tax states push trade-ins so hard. A handful of states handle vehicle taxes differently (annual property taxes, or no trade-in credit), so confirm your state's rule — our <a href=\"/sales-tax-calculator\">sales tax calculator</a> shows state-level rates.",
      },
      {
        question: 'Is a 60-month or an 84-month auto loan better?',
        answer:
          "Mathematically, shorter always wins: on $31,500 at 6.5% APR, 60 months costs $5,480.02 in interest while 84 months costs $7,791.61 — a $2,311.59 difference for a $148.58 lower monthly payment. The real question is how long you will keep the car. Cars depreciate fastest in the first two to three years, so an 84-month loan leaves you 'underwater' (owing more than the car is worth) for years, which hurts if the car is totaled or stolen — gap insurance helps, but it costs extra too. A good rule: match the loan term to your expected ownership period, and pick the shortest payment you can genuinely afford.",
      },
      {
        question: 'Is 0% APR financing actually a good deal?',
        answer:
          "It can be — if you would otherwise borrow at a high rate. On $31,500 for 60 months, 0% APR gives a $525.00 payment and $0 interest, versus $616.33 and $5,480.02 at 6.5% APR. The catch: 0% offers usually replace a cash rebate, and they are typically reserved for strong credit at captive finance companies. Do the comparison honestly — if the alternative is a $3,000 rebate plus financing the remaining $28,500 at your bank's 6.5%, that loan costs $4,958.11 in interest, for a total out-of-pocket of $36,958.11 versus $35,000 with the 0% deal — so the 0% financing wins by about $1,958. The rebate only wins when it is big: on this deal the break-even rebate is roughly $4,675. If the rebate is small and your outside rate is high, 0% wins outright. Run both scenarios in the calculator before you sign.",
      },
      {
        question: 'How much should I put down on a car?',
        answer:
          "The classic guidance is 20% on a new car: $7,000 on a $35,000 purchase. That leaves $28,000 financed, which at 6.5% APR for 60 months is a $547.85 payment and $4,871.13 in total interest — versus $616.33 and $5,480.02 with only $3,500 down. The bigger down payment saves about $609 in interest, but the larger benefits are structural: you start the loan closer to the car's actual value, shrink the negative-equity window, and lower the chance of needing gap coverage. If cash is tight, prioritize at least 10% plus taxes and fees, so the financed balance never exceeds the car's first-day value.",
      },
      {
        question: 'How do extra payments change an auto loan?',
        answer:
          "Extra dollars skip interest entirely and retire principal. On the default $31,500 loan at 6.5% for 60 months: an extra $25 per month pays off in 58 months and saves $258.21; an extra $50 finishes in 55 months and saves $492.99; an extra $100 finishes in 51 months and saves $903.20. The earlier you start, the bigger the effect, because those extra dollars stop interest from compounding on every future balance. Two cautions: confirm the lender has no prepayment penalty, and make sure extra amounts are applied to principal rather than counted as an early next payment — that detail changes everything.",
      },
      {
        question: 'What APR should I expect on a car loan in 2026?',
        answer:
          "Typical 2026 ranges: roughly 5% - 9% for strong credit on a new car, 6% - 12% for strong credit on a used car, and 13% to 20%+ in deep-subprime tiers — your actual offer depends on the lender, loan-to-value and term. The spread matters enormously: on $31,500 for 60 months, 5% APR costs $594.44 per month and $4,166.63 in interest, while 9% costs $653.89 and $7,733.29 — about $3,566.66 more. Get pre-approved at a bank or credit union before visiting the dealer, then let the finance office try to beat that number; competition is the only reliable rate discount.",
      },
    ],
    relatedCalculators: [
      { slug: 'personal-loan-calculator', label: 'Personal Loan Calculator' },
      { slug: 'loan-calculator', label: 'Loan Calculator' },
      { slug: 'amortization-calculator', label: 'Amortization Calculator' },
      { slug: 'mortgage-calculator', label: 'Mortgage Calculator' },
      { slug: 'sales-tax-calculator', label: 'Sales Tax Calculator' },
      { slug: 'compound-interest-calculator', label: 'Compound Interest Calculator' },
    ],
  },

  loan: {
    howItWorks: [
      'Every fixed-rate installment loan — personal, signature, home-improvement, even a standard student-loan plan — runs on the same payment formula. Type the amount, the APR and the term into this calculator and it computes the level monthly payment, the total interest and the full year-by-year payoff path, with an optional extra monthly payment layered on top.',
      'The payment is the standard annuity M = P x [r(1+r)^n] / [(1+r)^n - 1]. What the formula does not show is the split inside each payment: interest is charged on the remaining balance, so the first payment is the most interest-heavy. On the default $25,000 loan at 8% APR for 60 months, the $506.91 payment starts as $166.67 of interest (32.9%) — while the final payment carries only $3.36 of interest. That steady shift is amortization, and it is why early extra payments are disproportionately powerful.',
      'Terms are where money quietly leaks. On $25,000 at 8% APR: 36 months costs $783.41 per month and $3,202.73 in interest; 60 months costs $506.91 and $5,414.59; 84 months costs $389.66 and $7,731.05. Each step longer lowers the payment by less and less while adding more and more interest — the exact shape of the trade you should always price out before signing.',
      'Extra payments are the opposite lever: pure gain. Adding $50 per month to the default loan retires it in 54 months instead of 60 and saves $606.86 in interest; adding $100 finishes in 49 months and saves $1,089.30. Because every skipped month at the tail of the loan is interest you never pay, the payoff from a small extra is surprisingly linear — roughly $1,089 of interest saved per $100 of monthly extra on the default five-year loan.',
      'Two fine-print items change the real cost. First, APR is not the interest rate: it folds fees in, so a 5% origination fee on a $25,000 loan is $1,250 you never see but still repay. Second, payoff freedom: most mainstream loans today have no prepayment penalty, but verify it in your note. To compare a car-specific deal (taxes, trade-ins), use the <a href="/auto-loan-calculator">auto loan calculator</a>; for unsecured personal-loan pricing bands, the <a href="/personal-loan-calculator">personal loan calculator</a>.',
    ],
    calculationMethod: {
      formula: 'M = P x [r(1+r)^n] / [(1+r)^n - 1]   (r = APR / 12, n = total payments)',
      steps: [
        'Start with the amount borrowed P (include any fees you finance; exclude fees paid in cash).',
        'Convert the annual rate to a monthly rate: r = APR / 12 (8% APR gives r = 0.0066667).',
        'Set the total number of payments n (years x 12, plus any extra months).',
        'Compute the level payment M = P x [r(1+r)^n] / [(1+r)^n - 1]; if the APR is 0, M is simply P / n.',
        'Each month, interest = balance x r and principal = M - interest; add any extra amount to principal.',
        'Repeat until the balance reaches zero; sum the interest column for the total cost of the loan.',
      ],
      example:
        '$25,000 at 8% APR for 5 years (60 payments): r = 0.0066667, n = 60, so M = $506.91 per month. Total repaid is $30,414.59, of which $5,414.59 is interest. Adding $100 per month retires the loan in 49 payments and cuts total interest to $4,325.29 — a saving of $1,089.30 and 11 months.',
    },
    keyRates: [
      { label: 'Unsecured loan APR, excellent credit (typical 2026)', value: '~8% - 12%' },
      { label: 'Unsecured loan APR, good credit (typical 2026)', value: '~13% - 18%' },
      { label: 'Credit-card APR for comparison (typical 2026)', value: '~20%+' },
      { label: 'Payment per $1,000 @ 8% / 60 mo', value: '$20.28' },
      { label: 'Payment per $1,000 @ 12% / 60 mo', value: '$22.24' },
      { label: 'Common installment terms', value: '12 - 84 months' },
    ],
    faqs: [
      {
        question: 'How do you calculate a monthly loan payment?',
        answer:
          "Use the fixed-rate annuity formula M = P x [r(1+r)^n] / [(1+r)^n - 1], where P is the principal, r is the APR divided by 12, and n is the number of payments. Example: $25,000 at 8% APR for 60 months gives r = 0.0066667 and M = $506.91. A quick field estimate: every $1,000 borrowed at 8% for five years costs about $20.28 per month, so $25,000 is roughly 25 x $20.28 = $507 — within pennies of the exact answer. The formula assumes a level payment on a fixed rate; variable-rate loans and revolving credit cards do not amortize this way.",
      },
      {
        question: "What is the difference between APR and interest rate?",
        answer:
          "The interest rate is the pure cost of borrowing; the APR bundles that cost with most fees, expressed as a yearly rate so offers are comparable. On a $25,000 loan, a 5% origination fee is $1,250 deducted upfront — you might receive $23,750 but repay based on $25,000. If the note rate is 8%, the APR on that structure is meaningfully higher than 8% because you are paying interest on money that never reached your account. That is why regulators require APR disclosure, and why you should compare loan offers by APR, not by the advertised rate. Our calculator uses APR directly: enter the APR from your loan offer, not the teaser 'rates as low as' figure.",
      },
      {
        question: 'How much does an extra $100 a month save on a loan?',
        answer:
          "On the default $25,000 loan at 8% APR for 60 months: adding $100 per month finishes the loan in 49 payments instead of 60 and cuts total interest from $5,414.59 to $4,325.29 — a $1,089.30 saving. Adding just $50 per month saves $606.86 and finishes in 54 payments. The savings scale with both the rate and the remaining term: extra dollars at a 12% APR work about 50% harder than at 8%, and dollars added in year one of a long loan do more than dollars added near the end. The mechanics are simple — every extra dollar goes to principal, so every later balance is smaller and accrues less interest.",
      },
      {
        question: 'Why does my first payment barely reduce the balance?',
        answer:
          "Because interest is charged on the entire remaining balance, and the balance is at its maximum in month one. On $25,000 at 8% APR, the first month's interest alone is $166.67 — 32.9% of the $506.91 payment — so only $340.24 retires principal. By the final payment, interest has shrunk to $3.36 and nearly the whole payment is principal. This front-loading is not a fee or a trick; it is the only way a level payment can amortize a declining balance. It does mean that extra principal in the early months is the most valuable money you can spend on the loan — see the with/without comparison this calculator computes as you type.",
      },
      {
        question: 'Should I choose a shorter or longer loan term?',
        answer:
          "On $25,000 at 8% APR, the menu looks like this: 24 months, $1,130.68 per month, $2,136.37 interest; 36 months, $783.41, $3,202.73; 48 months, $610.32, $4,295.51; 60 months, $506.91, $5,414.59; 84 months, $389.66, $7,731.05. The rule: choose the shortest term whose payment you can absorb without straining your emergency fund. A useful hybrid is to sign the longer term for flexibility, then voluntarily pay the shorter term's payment — you get the interest savings of the short term with the option to drop back if money gets tight. That strategy is exactly what the extra-payment input models here.",
      },
      {
        question: 'Are there penalties for paying off a loan early?',
        answer:
          "Most modern personal, auto and mortgage loans carry no prepayment penalty — federal rules have banned them on most residential mortgages since 2014, and mainstream personal-loan lenders advertise 'no prepayment penalty' as a feature. But it is not universal: some subprime auto notes and small-dollar loans still include them, and some lenders apply extra payments as 'paid ahead' amounts rather than principal reductions, which quietly destroys the interest-saving benefit. Before paying extra, confirm two things in your note: no prepayment penalty, and instructions for applying extra amounts to principal. The savings numbers in this calculator assume extra dollars retire principal immediately.",
      },
      {
        question: 'Can I use this calculator for any type of loan?',
        answer:
          "Yes, for any fixed-rate loan with a level payment: personal loans, auto loans, home-improvement loans, standard student-loan repayment plans and mortgages. It does not fit revolving balances (credit cards, HELOC draws), variable-rate loans (ARMs), or income-driven student plans, because those do not amortize on a fixed annuity. For car loans with sales tax, trade-ins and dealer fees, the <a href=\"/auto-loan-calculator\">auto loan calculator</a> is more precise; for mortgage specifics like escrow and PMI, use the <a href=\"/mortgage-calculator\">mortgage calculator</a>; and for a full year-by-year principal/interest table of any amount, the <a href=\"/amortization-calculator\">amortization calculator</a>.",
      },
    ],
    relatedCalculators: [
      { slug: 'auto-loan-calculator', label: 'Auto Loan Calculator' },
      { slug: 'personal-loan-calculator', label: 'Personal Loan Calculator' },
      { slug: 'amortization-calculator', label: 'Amortization Calculator' },
      { slug: 'mortgage-calculator', label: 'Mortgage Calculator' },
      { slug: 'compound-interest-calculator', label: 'Compound Interest Calculator' },
      { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
    ],
  },

  'personal-loan': {
    howItWorks: [
      'A personal loan is unsecured: no collateral, no house or car for the bank to repossess. The lender is pricing pure credit risk, so the APR you are offered is a direct read of your credit profile. That is why the same $15,000 loan can cost anywhere from single digits to 30%+ APR. This calculator takes your amount, APR and term and returns the level monthly payment, total interest and total repaid — everything updates live.',
      'The payment uses the standard annuity M = P x [r(1+r)^n] / [(1+r)^n - 1]. On the default $15,000 at 12% APR for 48 months, that is $395.01 per month, $3,960.36 of total interest and $18,960.36 total repaid. Notice the first payment sends $150.00 to interest — 38% of the payment — because the balance (and therefore the interest) starts at its maximum.',
      'Term choice is where personal loans are won or lost. Comparing the same $15,000 at 12%: 36 months costs $498.21 per month and $2,935.73 in interest; 48 months costs $395.01 and $3,960.36; 60 months costs $333.67 and $5,020.00. Dropping from 48 to 36 months raises the payment $103.21 but saves $1,024.63; stretching to 60 saves $61.34 per month but adds $1,059.64. The comparison cards below run this exact math on whatever you type.',
      'Fees distort the sticker rate. A typical origination fee of 1% - 10% comes off the top: 5% on $15,000 is $750, so you receive $14,250 but repay interest on the full $15,000. When comparing offers, judge them by APR (which folds the fee in) and by total repaid — never by the monthly payment alone. Long terms at high APRs are the classic trap: the payment looks harmless while the interest quietly compounds toward a third of what you borrowed.',
      'Used well, a personal loan is a refinancing tool: consolidating $15,000 of typical 20%+ credit-card debt into a 12% APR, 48-month loan cuts the interest bill from $6,909.86 to $3,960.36 — a $2,949.50 saving — and gives you a fixed end date. Check the savings on your own numbers above, then compare structured payoff scenarios with the <a href="/loan-calculator">loan calculator</a> and <a href="/amortization-calculator">amortization calculator</a>.',
    ],
    calculationMethod: {
      formula: 'M = P x [r(1+r)^n] / [(1+r)^n - 1]   (r = APR / 12, n = term months)',
      steps: [
        'Enter the loan amount P as the figure you will actually repay interest on (after any origination fee, lenders fund less but charge on the full principal).',
        'Convert APR to the monthly rate r = APR / 12 (12% APR gives r = 0.01).',
        'Set n to the term in months (48 for a four-year loan).',
        'Compute the level payment M = P x [r(1+r)^n] / [(1+r)^n - 1]; if APR is 0%, M = P / n.',
        'Multiply M by n for total repaid; subtract P for total interest.',
        'Compare terms by re-running the formula at 36, 48 and 60 months — the cards below do this automatically.',
      ],
      example:
        '$15,000 personal loan at 12% APR for 48 months: r = 0.01, n = 48, so M = $395.01 per month. Total repaid is $18,960.36, of which $3,960.36 is interest. Choosing 36 months instead raises the payment to $498.21 but cuts interest to $2,935.73 — $1,024.63 less for 12 fewer months of payments.',
    },
    keyRates: [
      { label: 'Excellent credit (720+), typical 2026', value: '~8% - 12%' },
      { label: 'Good credit (690-719), typical 2026', value: '~13% - 18%' },
      { label: 'Fair credit (630-689), typical 2026', value: '~19% - 25%' },
      { label: 'Poor credit (below 630), typical 2026', value: '~26% - 36%' },
      { label: 'Payment per $1,000 @ 12% / 48 mo', value: '$26.33' },
      { label: 'Typical origination fee', value: '1% - 10% of the loan' },
    ],
    faqs: [
      {
        question: 'What would a $15,000 personal loan cost per month?',
        answer:
          "It depends almost entirely on APR and term. At 12% APR — roughly a good-credit rate — a $15,000 loan runs $706.10 per month over 24 months ($1,946.45 interest), $498.21 over 36 months ($2,935.73), $395.01 over 48 months ($3,960.36) and $333.67 over 60 months ($5,020.00). Total repaid at 48 months is $18,960.36. If your credit lands you 10% instead of 12%, the 48-month payment drops to $380.44 and interest to $3,261.06; at 20% it jumps to $456.46 and $6,909.86. A useful benchmark: every $1,000 at 12% for four years costs $26.33 per month.",
      },
      {
        question: 'What credit score gets the best personal loan rates?',
        answer:
          "Lenders generally reserve their best pricing for scores above 720: typical 2026 personal-loan APRs run about 8% - 12% in that tier, 13% - 18% for good credit (690-719), 19% - 25% for fair credit (630-689) and 26% - 36% below that. These are typical ranges, not guarantees — your offer also depends on income, debt-to-income ratio, employment history and the lender. Two practical moves: check whether your bank or credit union offers relationship pricing, and pre-qualify with several lenders within a short window; soft-pull pre-qualifications let you compare real APRs without dinging your score. Then enter the winning offer above to see the true monthly cost.",
      },
      {
        question: 'Is a 60-month personal loan ever a good idea?',
        answer:
          "Rarely, and only for cash-flow reasons with an exit plan. On $15,000 at 12% APR, going from 48 to 60 months lowers the payment by $61.34 but adds $1,059.64 in interest — you are paying 27% more interest to lower the payment 16%. The real risk shows up at high APRs: at 30%+, a 60-month term can push lifetime interest above a third of the amount borrowed. If 60 months is the only payment you can manage, take it, but set a reminder to throw raises, refunds and bonuses at the principal — an extra $50 per month on the default loan finishes it 6 months early and saves $574.74.",
      },
      {
        question: 'Personal loan or credit card: which is cheaper for $15,000?',
        answer:
          "For a one-time balance, the personal loan almost always wins at the same credit tier. A 48-month, $15,000 personal loan at a typical good-credit 12% APR costs $3,960.36 in interest; carrying $15,000 on a card at a typical 20%+ APR while paying it down on the same 48-month schedule would cost roughly $6,909.86 — about $2,949.50 more, and card rates are variable, so they can rise. The loan also converts a revolving trap into a fixed payment with a guaranteed end date. Cards win only for amounts you can clear within an intro-0% window. Run your actual card rate through the calculator to see the exact gap.",
      },
      {
        question: 'What is an origination fee on a personal loan?',
        answer:
          "It is an upfront charge, typically 1% - 10% of the loan, deducted from the funds you receive. A 5% fee on a $15,000 loan is $750: you get $14,250 deposited but repay interest on the full $15,000. On our default 12%/48-month example, that effectively raises the cost of the money you actually received by several percentage points — which is why comparing APRs matters more than comparing note rates, since APR folds the fee into a single yearly figure. Credit unions and some banks offer no-fee personal loans; a slightly higher rate with no fee can still be the cheaper deal. Always compare total repaid, which this calculator shows instantly.",
      },
      {
        question: 'Can I pay off a personal loan early?',
        answer:
          "Usually yes, and it is often smart. Extra payments retire principal, which shrinks every future interest charge: adding $50 per month to the default $15,000 loan at 12% for 48 months finishes it in 42 months and saves $574.74. Check two things first: that your note has no prepayment penalty (most mainstream lenders do not), and that extra amounts are applied to principal rather than treated as an early next installment. One caveat — if draining cash to prepay leaves you without an emergency fund, you are trading a 12%-ish certainty for a credit-card-rate possibility. Keep a cushion, then prepay with what is left.",
      },
      {
        question: 'Why are personal loan rates higher than mortgage rates?',
        answer:
          "Collateral. A mortgage is backed by a house the lender can foreclose; an auto loan by a car it can repossess. A personal loan is backed only by your promise, so lenders price in higher default losses and higher collection costs — typical 2026 30-year mortgage rates run around 6% - 7% while personal-loan APRs start near 8% even for excellent credit and climb into the 30s for bruised files. The flip side: personal loans close in days with no appraisal or title work, and there is no asset at risk if life goes sideways. Model both side by side with our <a href=\"/mortgage-calculator\">mortgage calculator</a>.",
      },
    ],
    relatedCalculators: [
      { slug: 'loan-calculator', label: 'Loan Calculator' },
      { slug: 'auto-loan-calculator', label: 'Auto Loan Calculator' },
      { slug: 'amortization-calculator', label: 'Amortization Calculator' },
      { slug: 'mortgage-calculator', label: 'Mortgage Calculator' },
      { slug: 'compound-interest-calculator', label: 'Compound Interest Calculator' },
      { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
    ],
  },

  amortization: {
    howItWorks: [
      'Amortization is the system that turns a lump of debt into a schedule of identical payments. Your payment M = P x [r(1+r)^n] / [(1+r)^n - 1] stays level, but the split inside it moves every month: interest is charged on whatever balance remains, so early payments are mostly interest and late payments are mostly principal. This calculator prints the entire year-by-year schedule and draws the cumulative-interest curve so you can watch the machine work.',
      'The default example makes the front-loading vivid: $300,000 at 6.5% for 30 years has a $1,896.20 payment, and payment 1 splits into $1,625.00 of interest (85.7%) and just $271.20 of principal. Across year one you pay $19,401.27 of interest against only $3,353.18 of principal. The principal share does not overtake the interest share until month 233 — year 19.4 of 30.',
      "Here is the statistic that surprises everyone: on that same loan you cross the halfway point of ALL interest paid around month 127, barely past year 10, while still owing about $250,600. And after ten years of paying $227,544.49, you have retired only $45,671.62 of principal. Amortization front-loads the lender's compensation and back-loads yours — which is precisely why early extra principal is the strongest lever in personal finance.",
      'Extra payments bend the curve in a way no other move can. Adding $100 per month to the default loan retires it in 312 months — 4 years early — and saves $60,994.79 in interest. Adding $200 finishes in 277 months (6 years 11 months early) and saves $103,448.79. Even one extra payment per year, applied monthly as $158.02, cuts the term to 290 months and saves $87,257.51. The comparison panel above converts your extra amount into months saved, interest saved and a payoff date.',
      'Term choice is the other big dial. A 15-year loan at 6.5% on $300,000 costs $2,613.32 per month with $170,397.98 total interest; the 30-year costs $1,896.20 with $382,633.47 — a $212,235.49 difference. The honest compromise many borrowers choose: take the 30-year for the lower required payment, then pay the 15-year-sized payment voluntarily. You keep the safety valve and capture most of the savings. For loan-specific versions, see the <a href="/mortgage-calculator">mortgage calculator</a> and <a href="/auto-loan-calculator">auto loan calculator</a>.',
    ],
    calculationMethod: {
      formula: 'M = P x [r(1+r)^n] / [(1+r)^n - 1]; each month: Interest = Balance x r, Principal = M - Interest',
      steps: [
        'Set the principal P, the annual rate (APR) and the term in months n = years x 12.',
        'Compute the monthly rate r = APR / 12 (6.5% APR gives r = 0.0054167).',
        'Compute the level payment M = P x [r(1+r)^n] / [(1+r)^n - 1] (or P / n when the APR is 0).',
        'For each month: Interest = Balance x r; Principal = M - Interest; add any extra payment to Principal.',
        'Subtract Principal from the Balance and repeat monthly until the Balance reaches zero.',
        'Group the monthly rows into loan years for the yearly table; cumulative interest is the running sum of the interest column.',
      ],
      example:
        '$300,000 at 6.5% APR for 30 years (360 payments): r = 0.0054167 and M = $1,896.20. Payment 1 is $1,625.00 interest + $271.20 principal. Total interest over the full term is $382,633.47 and total paid is $682,633.47. Adding $200 per month extra retires the loan in 277 months — 6 years 11 months early — and saves $103,448.79 in interest.',
    },
    keyRates: [
      { label: '30-year fixed mortgage (typical 2026 range)', value: '~6% - 7%' },
      { label: '15-year fixed mortgage (typical 2026 range)', value: '~5.5% - 6.5%' },
      { label: 'Payment per $1,000 @ 6.5% / 30 yr', value: '$6.32' },
      { label: 'Payment per $1,000 @ 7% / 30 yr', value: '$6.65' },
      { label: 'Year-1 interest share @ 6.5% / 30 yr', value: '~85%' },
      { label: 'One extra payment per year ($300K @ 6.5%)', value: '~5 yr 10 mo faster' },
    ],
    faqs: [
      {
        question: 'What does amortization actually mean?',
        answer:
          "Amortization is paying off a loan in scheduled, level installments, with each payment split between interest and principal. The payment is fixed — $1,896.20 on a $300,000 loan at 6.5% for 30 years — but the split moves: interest is computed each month on the remaining balance, so as the balance falls, the interest share falls and the principal share rises by exactly the same amount. 'Amortized' is the opposite of 'interest-only' or 'revolving': there is a first payment, a last payment, and a mathematically guaranteed zero balance at the end. Every fixed-rate mortgage, auto loan and standard personal loan amortizes on this exact pattern.",
      },
      {
        question: 'Why is so much of my early payment just interest?',
        answer:
          "Because in month one you owe the entire principal, and interest is simply rate times balance. On $300,000 at 6.5%, one month of interest is $300,000 x 0.065 / 12 = $1,625.00 — which is 85.7% of the $1,896.20 payment, leaving only $271.20 for principal. In year one the totals are $19,401.27 interest versus $3,353.18 principal. This is not a penalty or a billing trick; it is the only split that keeps the payment level while the balance declines. The practical consequence: extra principal in the early years removes the most future interest per dollar, because it shrinks the balance that all later interest is computed on.",
      },
      {
        question: 'When does principal overtake interest on a 30-year loan?',
        answer:
          "On the classic $300,000 at 6.5% for 30 years, the principal share of the payment exceeds the interest share at month 233 — about 19.4 years in. Higher rates push the crossover later; lower rates pull it dramatically earlier (at 3%, it happens around year 7). A related milestone: you cross the halfway point of TOTAL interest around month 127, barely past year 10, while still owing roughly $250,600. Run your own rate in the calculator and watch the interest-share column in the yearly table — the month it drops below 50% is your loan's crossover.",
      },
      {
        question: 'How much do extra payments really save on a 30-year loan?',
        answer:
          "On $300,000 at 6.5% for 30 years: an extra $100 per month pays off in 312 months — 4 years early — and saves $60,994.79 in interest. An extra $200 per month finishes in 277 months, 6 years 11 months early, saving $103,448.79. An extra $300 saves $135,115.17 and about 9 years 2 months. The savings are so large because of compounding in reverse: every dollar of extra principal eliminates interest on that dollar for the entire remaining term. The payoff panel above turns your extra amount into exact months saved, interest saved and payoff dates — try $25 increments to see how even small amounts matter.",
      },
      {
        question: 'What happens if I make one extra mortgage payment per year?',
        answer:
          "The popular 'pay an extra payment annually' tactic works, but most people overestimate it. On $300,000 at 6.5% for 30 years, splitting one extra $1,896.20 payment into $158.02 per month retires the loan in 290 months instead of 360 — 5 years 10 months early — and saves $87,257.51 in interest. That is a real win, but notice that a single extra payment per year is worth less than $200 per month every month ($103,448.79 saved). If a lump-sum discipline is easier for you, schedule one extra payment each January and confirm the servicer applies it to principal, not to next month's installment.",
      },
      {
        question: 'How do I read an amortization schedule?',
        answer:
          "Each row is one payment period; the columns you care about are interest, principal and remaining balance. Follow any single row: interest + principal = your payment, and the new balance = old balance - principal. In the yearly view this calculator adds an interest-share column, so you can see the amortization curve at a glance — 85.3% interest in year one on the default $300,000 loan, sliding toward zero by the final year. Lenders print the monthly version of this table at closing; ours aggregates it by year so the front-loading pattern is visible. A useful audit: sum the interest column and confirm it matches the total-interest figure you were quoted.",
      },
      {
        question: 'Should I choose a 15-year or a 30-year amortization term?',
        answer:
          "On $300,000 at 6.5%: the 15-year payment is $2,613.32 with $170,397.98 total interest; the 30-year is $1,896.20 with $382,633.47 — a $212,235.49 difference, and 15-year rates typically run a bit lower too. The pure-math answer is 15 years. The practical answer for most households: take the 30-year and voluntarily pay extra, which reproduces most of the interest savings while preserving the right to drop back to the lower payment if income hiccups. What you should almost never do is take the 30-year and pay only the minimum while carrying higher-rate debt elsewhere — retire expensive debt first, then throw the surplus at the mortgage.",
      },
    ],
    relatedCalculators: [
      { slug: 'mortgage-calculator', label: 'Mortgage Calculator' },
      { slug: 'loan-calculator', label: 'Loan Calculator' },
      { slug: 'auto-loan-calculator', label: 'Auto Loan Calculator' },
      { slug: 'personal-loan-calculator', label: 'Personal Loan Calculator' },
      { slug: 'compound-interest-calculator', label: 'Compound Interest Calculator' },
      { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
    ],
  },
};

// ─── Hub cards (new "loans" category — Loans & Debt) ──────────────────────────

export const LOANS_HUB_CARDS: Record<
  string,
  { label: string; desc: string; category: string; icon: string; keywords?: string }
> = {
  'auto-loan-calculator': {
    label: 'Auto Loan Calculator',
    desc: 'Car payment, sales tax & trade-in',
    category: 'loans',
    icon: 'key',
    keywords: 'auto loan car loan car payment vehicle payment trade in sales tax dealer fees monthly payment',
  },
  'loan-calculator': {
    label: 'Loan Calculator',
    desc: 'Monthly payment & interest for any loan',
    category: 'loans',
    icon: 'dollar',
    keywords: 'loan payment calculator monthly payment loan interest payoff extra payments amortization installment',
  },
  'personal-loan-calculator': {
    label: 'Personal Loan Calculator',
    desc: 'Payment, interest & APR by credit band',
    category: 'loans',
    icon: 'receipt',
    keywords: 'personal loan payment unsecured loan apr credit score debt consolidation term comparison',
  },
  'amortization-calculator': {
    label: 'Amortization Calculator',
    desc: 'Yearly schedule, interest & extra payments',
    category: 'loans',
    icon: 'layers',
    keywords: 'amortization schedule principal interest front loaded interest extra payments payoff mortgage table',
  },
};
