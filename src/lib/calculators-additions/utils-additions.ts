/**
 * Utils-group additions for the TheTaxCalc calculator fleet:
 *   - /tip-calculator                  (componentKey 'tip')
 *   - /percentage-increase-calculator  (componentKey 'percentage-change')
 *
 * This module is a self-contained drop-in: the orchestrator wires
 * UTILS_ROUTES into CALCULATOR_ROUTES, UTILS_CONTENT into the
 * [calculator] content switch, and UTILS_HUB_CARDS into the hub's
 * SPECIAL_CARDS — no other edits needed.
 *
 * Every number below was verified with bun scripts against the pure
 * helpers in src/lib/utils-math.ts (see worklog Task 39-e).
 */

import type { CalculatorRouteConfig } from '@/lib/calculator-routes';
import type { FAQItem } from '@/lib/faq-data';

// ─── Route registry entries ──────────────────────────────────────────────────

export const UTILS_ROUTES: CalculatorRouteConfig[] = [
  {
    slug: 'tip-calculator',
    title: 'Tip Calculator 2026 — Split Bills, Presets & Round-Up',
    description:
      'Free tip calculator for 2026: split the bill any way you like, tap 10-25% presets or drag the slider, tip on the pre-tax subtotal, and round up each share.',
    h1: 'Tip Calculator',
    metaTitle: 'Tip Calculator 2026 — Split Bills, Presets, Round-Up',
    metaDesc:
      'Tip calculator for 2026: split the bill, 10-25% presets, tip on the pre-tax subtotal, round-up per person. Free, instant, no sign-up.',
    keywords: [
      'tip calculator', 'tip calculator bill split', 'restaurant tip calculator',
      'how much to tip', 'tip percentage calculator', 'gratuity calculator',
      'tip on pre-tax subtotal', 'split bill calculator', 'tip chart 2026',
      'how to calculate tip', 'tip splitter', '20 percent tip calculator',
    ],
    componentKey: 'tip',
    category: 'paycheck',
    breadcrumbLabel: 'Tip Calculator',
    ogTitle: 'Tip Calculator 2026 — Split Bills & Presets',
    ogDescription:
      'Free tip calculator: split the bill, 10-25% presets, pre-tax tip option, round-up per person. Instant, no sign-up.',
    canonicalPath: '/tip-calculator',
    jsonLdType: 'tip',
  },
  {
    slug: 'percentage-increase-calculator',
    title: 'Percentage Increase Calculator — % Change & Difference',
    description:
      'Percentage increase calculator: percent change, percentage difference, X% of Y and pay-raise math — a $2/hr raise on 2,080 hours = $4,160 a year before taxes.',
    h1: 'Percentage Increase, Change & Difference Calculator',
    metaTitle: 'Percentage Increase Calculator 2026 — % Change & Difference',
    metaDesc:
      'Percentage increase calculator: percent change between two numbers, percentage difference, X% of Y, and pay-raise math. Free, instant, no sign-up.',
    keywords: [
      'percentage increase calculator', 'percentage change calculator',
      'percentage difference calculator', 'percent increase calculator',
      'percent change formula', 'percentage increase formula',
      'percent of a number calculator', 'x% of y calculator',
      'pay raise percentage calculator', 'how to calculate percentage increase',
      'percent decrease calculator', 'percentage calculator',
    ],
    componentKey: 'percentage-change',
    category: 'paycheck',
    breadcrumbLabel: 'Percentage Increase Calculator',
    ogTitle: 'Percentage Increase Calculator — % Change & Difference',
    ogDescription:
      'Increase any value by a percent, find percent change and percentage difference, or X% of Y. Free, instant, no sign-up.',
    canonicalPath: '/percentage-increase-calculator',
    jsonLdType: 'percentage-change',
  },
];

// ─── Content shape (mirrors the [calculator] CalculatorContent interface) ────

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

export const UTILS_CONTENT: Record<string, AdditionContentShape> = {
  // ── Tip Calculator ───────────────────────────────────────────────────────
  tip: {
    howItWorks: [
      "The math is one line: Tip = Bill × rate. Enter the check total, tap a preset (10, 15, 18, 20, or 25 percent) or drag the slider anywhere from 0 to 40, and the tip, the all-in total, and each person's share update as you type. The quick-scan table underneath shows the same bill at all five common rates, so you can settle the '18 or 20?' debate in one glance. On a $50.00 check, 18% is a $9.00 tip for a $59.00 total; 20% is $10.00 and $60.00.",
      'Tipping norms in the US are custom, not law. For full table service the customary range runs about 15% to 20% of the bill, with 18% as the everyday default most payment screens now suggest. Counter service and takeout are typically less — often 10% to 15% or nothing at all. Large parties should read the check first: many restaurants print an automatic gratuity (commonly 18% to 20%) directly onto the bill, and tipping on top of a service charge is paying twice.',
      "The pre-tax toggle answers the classic 'do I tip on tax?' question. Combined sales-tax rates run from zero in a few states to past 10% in the highest cities, and the customary method tips on the food subtotal only. Enter the tax rate printed on your check — say 8.25% — and the calculator backs it out: a $50.00 total becomes a $46.19 tip base, so an 18% tip is $8.31 instead of $9.00. Small per meal, real money over a year.",
      'Splitting is built in. Set the number of people — anywhere from 1 to 20 — and every output is divided for you. A $120 dinner at 20% is a $144 total, which is $36 a head for four people, $6 of it tip. Flip on round-up and awkward shares like $29.50 become a clean $30, with the extra $2 added to the tip automatically. Use it when the group is paying in cash and nobody wants the coin math.',
      'Why does this live on a tax site? Because tips are after-tax money. Your take-home pay funds the tip, so if you are budgeting for dining out, first check what actually lands in your bank each month with the <a href="/paycheck-calculator">paycheck calculator</a>, then set your restaurant budget from that number. And if you are on the other side of the table: tips are taxable income, and the IRS expects them reported.',
    ],
    calculationMethod: {
      formula: 'Tip = Bill × r   where r = tip% ÷ 100   (pre-tax mode: Tip Base = Bill ÷ (1 + tax%))',
      steps: [
        'Enter the bill total from the check (e.g., $50.00)',
        'Pick a tip rate — a preset chip, the 0-40% slider, or type one (18%)',
        'Tip = Bill × 18% = $50.00 × 0.18 = $9.00',
        'Total = Bill + Tip = $50.00 + $9.00 = $59.00',
        'Per person: divide the total by N people ($144 ÷ 4 = $36 each on a $120 bill at 20%)',
        'Pre-tax option: subtotal = $50.00 ÷ 1.0825 = $46.19, so 18% = $8.31',
      ],
      example:
        'A $120.00 dinner with a 20% tip split 4 ways: Tip = $24.00, Total = $144.00, each person pays $36.00 (of which $6.00 is tip). Pre-tax variant: a $50.00 check that already includes 8.25% sales tax has a $46.19 subtotal, so an 18% tip is $8.31 instead of $9.00.',
    },
    keyRates: [
      { label: 'Customary table-service tip', value: '15%–20% of the pre-tax bill' },
      { label: 'Counter service / takeout', value: 'Often 10%–15% or none' },
      { label: 'Large-party auto-gratuity', value: 'Commonly 18%–20% — read the check' },
      { label: 'Typical combined sales tax', value: '~0%–10% depending on state + city' },
      { label: 'Mental 15% shortcut', value: '10% of the bill + half of that' },
    ],
    faqs: [
      {
        question: 'How much should I tip at a restaurant in the US?',
        answer:
          "There is no law about it, but the customary range for full table service runs about 15% to 20% of the bill, and 18% has become the everyday default on payment screens. Counter service, coffee shops, and takeout are typically less: 10% to 15% or simply rounding up is a normal gesture, not an obligation. For large groups, many restaurants add an automatic gratuity — commonly 18% to 20% — straight onto the check, so read the bill before tipping again on top. Bartenders are usually left a dollar or two per drink rather than a percentage. Start from what the service deserved and what your budget allows; the presets above make the arithmetic instant.",
      },
      {
        question: 'How do I calculate a tip without a calculator?',
        answer:
          'Move the decimal one place to the left and you have 10% of the bill — on $50.00 that is $5.00. Half of that ($2.50) is 5%, so 15% is just $5.00 + $2.50 = $7.50. Double the 10% figure for 20% ($10.00), or shave off 1% twice to get 18% ($10.00 − $1.00 = $9.00). For 25%, think 10% + 10% + 5%: $5.00 + $5.00 + $2.50 = $12.50. Splitting the check? Divide the total by the number of people — $144 split four ways is $36 each, of which $6 is the tip share at 20% on a $120 bill. Or skip the arithmetic and use the presets above.',
      },
      {
        question: 'How do I split a bill and tip evenly between friends?',
        answer:
          'Add the tip first, then divide. A $120 dinner at 20% is $144 all-in; split four ways that is $36 per person, of which $6 covers the tip. When the numbers land awkwardly — $118 split four ways is $29.50 each — flip on the round-up option and everyone pays a clean $30, with the extra $2 added to the tip. That keeps the group from fighting over coins and keeps the server whole. One etiquette note: if one person ordered the lobster and another had a salad, an even split quietly subsidizes the big spender, so either split by item or accept the trade-off for the sake of simplicity.',
      },
      {
        question: 'Should I tip on the pre-tax or after-tax amount?',
        answer:
          "The customary method is to tip on the pre-tax subtotal, because sales tax is the state's money, not the restaurant's or the server's. On a $100.00 check that already includes 8.25% sales tax, the food-and-drink subtotal is $92.38 — a 20% tip on that is $18.48, versus $20.00 if you tip on the full check. Both approaches show up in the real world and nobody will chase you down either way, but the pre-tax habit saves a little every meal and adds up over a year of dining out. The calculator has a toggle that backs the tax out for you: enter the bill total and the tax rate, and it applies your tip percentage to the subtotal only.",
      },
      {
        question: 'What does the round-up option actually do?',
        answer:
          "It rounds each person's share up to the next whole dollar and lets the collected difference flow into the tip. Take a $100 bill with an 18% tip: the fair split for four people is $29.50 each, but with round-up on, everyone pays $30 instead. The group's total becomes $120, so the tip quietly grows from $18.00 to $20.00. People like it for two reasons: whole-dollar amounts are faster to Venmo or drop in cash, and the server gets a slightly better outcome. The calculator always shows exactly how much rounding added, so there are no surprises — if the extra is more than you want to give, dial the tip percentage back a notch.",
      },
      {
        question: 'Is tipping legally required in the US?',
        answer:
          'No — tips are voluntary everywhere in the US. What can feel required is different: in most states the federal tipped minimum cash wage is just $2.13 an hour (employers claim a tip credit toward the $7.25 federal minimum), so tips genuinely are the wage. Separately, an automatic gratuity is a service charge, not a tip: the business sets it, prints it on your check — commonly 18% to 20% for large parties — and may distribute it according to its own policy. Because it is already on the bill, you do not owe another tip on top, though many people still add a little for standout service. None of that makes tipping law; it makes it custom with economic weight behind it.',
      },
      {
        question: 'How do I tip when using a coupon, gift card, or comped item?',
        answer:
          'Tip on the value of what you actually consumed, not on what you ended up paying after discounts. A $60 dinner reduced to $40 by a coupon still represents $60 of service — a 20% tip is $12, not the $8 you would get by tipping on the discounted check. The same logic applies to gift cards: pay the tip separately, in cash or on a card, so the server is not waiting on the gift-card balance. When the kitchen comps an item — a mistake, a birthday dessert — the courteous move is to tip as though you had paid for it, because the server still carried the plate. The pre-tax toggle pairs well here: tip on the subtotal the menu promised.',
      },
    ],
    relatedCalculators: [
      { slug: 'sales-tax-calculator', label: 'Sales Tax Calculator' },
      { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
      { slug: 'hourly-to-salary-calculator', label: 'Hourly to Salary Calculator' },
      { slug: 'salary', label: 'Salary After Tax' },
      { slug: 'bonus-tax-calculator', label: 'Bonus Tax Calculator' },
      { slug: 'percentage-increase-calculator', label: 'Percentage Increase Calculator' },
    ],
  },

  // ── Percentage Increase / Change / Difference ───────────────────────────
  'percentage-change': {
    howItWorks: [
      'A percentage increase is the shorthand every raise, price hike, and interest rate hides behind. The engine is one line: New Value = Old Value × (1 + r ÷ 100). Increase 25 by 5% and you get 26.25, because 25 × 1.05 = 26.25. Flip the direction toggle and the same math runs in reverse — 25 decreased by 5% is 23.75. The tool shows the worked line under the result, so you can always check the arithmetic by hand.',
      'Percent change is the before-and-after question. Going from $50,000 to $52,000 is (52,000 − 50,000) ÷ 50,000 × 100 = +4%, a $2,000 difference. Direction matters more than people expect: traveling back down from $52,000 to $50,000 is only a −3.85% change, because the base changed. That asymmetry is why a 20% raise followed by a 20% pay cut leaves you worse off — 100 goes to 120, then 120 × 0.80 lands at 96, not back at 100.',
      "Percentage difference is the symmetric cousin, used when neither number is 'first'. It divides the gap by the average of the two values: for 60 and 50 that is 10 ÷ 55 × 100 = 18.18%. Compare that with percent change — 50 up to 60 is +20%, while 60 down to 50 is −16.67% — and you can see why picking the right formula matters. Use difference for 'how far apart are these two?' and change for 'what happened between then and now?'",
      'The fourth tab is the everyday workhorse: X% of Y. 15% of 2,000 is 0.15 × 2,000 = 300. The mental version: 10% of 2,000 is 200, half of that is 100, so 15% is 300. It also runs discounts in reverse — 15% off 2,000 leaves 1,700 — which is exactly the math every sale tag is quietly doing to you.',
      'The money framing: a $1 an hour raise is $2,080 a year before taxes (2,080 hours in the standard work year), and $2 an hour is $4,160. A $25-an-hour worker bumped to $27 sees an 8% increase — $52,000 to $56,160. To know what any raise is worth after federal, state, and FICA taxes, run the new salary through the <a href="/paycheck-calculator">paycheck calculator</a>; that is the number your budget actually feels.',
    ],
    calculationMethod: {
      formula:
        '% change = (New − Old) ÷ Old × 100   |   % difference = |a − b| ÷ ((a + b) ÷ 2) × 100',
      steps: [
        'Increase/decrease: New = Old × (1 + r ÷ 100) — so 25 × 1.05 = 26.25',
        'Percent change: subtract old from new (52,000 − 50,000 = 2,000)',
        'Divide by the original value: 2,000 ÷ 50,000 = 0.04',
        'Multiply by 100 and keep the sign: +4% (going back down gives −3.85%)',
        'Difference: |60 − 50| ÷ 55 × 100 = 18.18% — symmetric, direction-free',
      ],
      example:
        'A salary moves from $50,000 to $52,000: change = (52,000 − 50,000) ÷ 50,000 × 100 = +4%, a $2,000 raise. As an hourly rate, $52,000 is $25/hr — a $2/hr bump to $27 would be +8%, turning the year into $56,160 before taxes.',
    },
    keyRates: [
      { label: 'Percentage increase', value: 'New = Old × (1 + r ÷ 100)' },
      { label: 'Percent change', value: '(New − Old) ÷ Old × 100' },
      { label: 'Percentage difference', value: '|a − b| ÷ average × 100' },
      { label: 'Standard work year', value: '2,080 hours (40 hrs × 52 wks)' },
      { label: '$1/hour raise', value: '$2,080 a year before taxes' },
      { label: 'Raise as a percentage', value: 'raise ÷ current pay × 100' },
    ],
    faqs: [
      {
        question: 'How do I calculate a percentage increase?',
        answer:
          'Multiply the starting value by 1 plus the rate written as a decimal. A 5% increase on 25 is 25 × 1.05 = 26.25; a 4% raise on a $52,000 salary is $52,000 × 1.04 = $54,080 a year. For a decrease, multiply by 1 minus the rate instead: 25 decreased by 5% is 25 × 0.95 = 23.75. The quick mental version is to compute the dollar amount first — 5% of 25 is 1.25 — then add or subtract it. Watch the direction on discounts: 15% off $2,000 is $2,000 × 0.85 = $1,700, not $2,000 with something added back.',
      },
      {
        question: 'What is the percent change formula?',
        answer:
          'Subtract the old value from the new value, divide by the old value, and multiply by 100. Going from $50,000 to $52,000: (52,000 − 50,000) ÷ 50,000 × 100 = +4%, an absolute difference of $2,000. The direction is part of the answer — reverse the trip and $52,000 down to $50,000 is (50,000 − 52,000) ÷ 52,000 × 100 = −3.85%. That is why a percent change always needs a "from" number: the same $2,000 gap is 4% of one salary but only 3.85% of the other. The sign carries real meaning — +4% on a paycheck is a raise, −3.85% is a pay cut.',
      },
      {
        question: 'What is the difference between percent change and percentage difference?',
        answer:
          'Percent change is directional — one number is "before" and the other is "after", so you divide by the original. Percentage difference is symmetric: you divide the gap by the average of the two numbers, so the answer is identical no matter which one you list first. For 60 and 50: the percentage difference is 10 ÷ 55 × 100 = 18.18%, while the percent change is +20% going up from 50, or −16.67% coming down from 60. Use change when a sequence exists (last year to this year); use difference when you are just comparing two things (two job offers, two quotes) and neither owns the baseline.',
      },
      {
        question: 'How do I calculate X% of Y?',
        answer:
          'Convert the percent to a decimal and multiply: 15% of 2,000 is 0.15 × 2,000 = 300. The mental shortcut is to find 10% first by moving the decimal (200), then half of that is 5% (100), and 200 + 100 = 300. This is the same engine behind tips, sales tax, discounts, and interest: a 7.65% FICA withholding on a $1,000 paycheck is $76.50, and an 18% tip on a $50 bill is $9.00. Working backward is division — if you know 300 is 15% of some number, that number is 300 ÷ 0.15 = 2,000.',
      },
      {
        question: 'How much is my hourly raise worth per year?',
        answer:
          'Multiply the raise by 2,080 — the standard full-time year of 40 hours a week across 52 weeks. A $1 an hour raise is $2,080 a year before taxes; $2 an hour is $4,160; $3 an hour is $6,240. Percentagewise, divide the raise by your current rate: a $2 bump on $25 an hour is 2 ÷ 25 = 8%, which turns a $52,000 salary into $56,160. Just remember the figure is gross — federal tax, FICA, and state income tax all take their share before it reaches your bank, so run the new annual number through a paycheck calculator to see the real after-tax difference.',
      },
      {
        question: 'How do I turn a raise into a percentage?',
        answer:
          'Divide the raise by the pay it is measured against, then multiply by 100. A $3,000 raise on a $52,000 salary is 3,000 ÷ 52,000 × 100 = 5.77%. On an hourly rate, a $1 raise on $25 is 1 ÷ 25 = 4%. Why bother? Because percentages are how raises are negotiated and compared — "we can do 4%" and "we can add $2,080 a year" are the same sentence at $52,000. The percentage view also lets you compare offers with different base pays on one scale. Keep the denominators consistent: annual raise against annual pay, hourly against hourly, or the math will quietly mislead you.',
      },
      {
        question: "Why don't a 20% increase and a 20% decrease cancel out?",
        answer:
          'Because each percentage is computed against a different base. Start at 100: a 20% increase lands you at 100 × 1.20 = 120. Now take 20% off 120 and you get 120 × 0.80 = 96 — not back at 100. The increase was computed against 100, the decrease against the bigger 120, so the decrease moves more dollars than the increase added. The reverse trips people up too: climbing from 96 back to 100 is a +4.17% change, not +20%. This is exactly why the percent-change tab always shows the direction, and why giving back a raise costs more in percentage terms than the raise paid you.',
      },
    ],
    relatedCalculators: [
      { slug: 'hourly-to-salary-calculator', label: 'Hourly to Salary Calculator' },
      { slug: 'salary-comparison-calculator', label: 'Salary Comparison Calculator' },
      { slug: 'job-offer-comparison-calculator', label: 'Job Offer Comparison' },
      { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
      { slug: 'salary', label: 'Salary After Tax' },
      { slug: 'tip-calculator', label: 'Tip Calculator' },
    ],
  },
};

// ─── Hub cards (keyed by registry slug, merged into SPECIAL_CARDS) ───────────

export const UTILS_HUB_CARDS: Record<
  string,
  { label: string; desc: string; category: string; icon: string; keywords?: string }
> = {
  'tip-calculator': {
    label: 'Tip Calculator',
    desc: 'Split bills, 15-20% presets, pre-tax tips',
    category: 'income',
    icon: 'receipt',
    keywords: 'tip gratuity split bill restaurant how much to tip tip chart server',
  },
  'percentage-increase-calculator': {
    label: 'Percentage Calculator',
    desc: 'Increase, change, difference & X% of Y',
    category: 'income',
    icon: 'percent',
    keywords:
      'percentage increase percent change percentage difference percent of a number pay raise x of y',
  },
};
