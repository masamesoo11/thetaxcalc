/**
 * Robux additions for the calculator registry (Task 42).
 *
 * Interactive Roblox marketplace-fee calculator at /robux-tax-calculator,
 * built on proven demand: the existing guide article
 * (/blog/robux-tax-calculator-guide-2026) pulls ~37k impressions/quarter at
 * position 9.5, and the "robux tax calculator" query family (~2.1k
 * impressions/quarter) shows tool intent an article cannot fully serve.
 *
 * Every number in the copy below was verified with `bun /tmp/verify-robux-math.ts`
 * against src/lib/robux-math.ts and cross-checked against the guide article:
 *  - list 1,000 R$ -> fee 300 R$, net 700 R$
 *  - net target 1,000 R$ -> required list 1,428.57 R$
 *  - DevEx: 700 R$ -> $2.45 | 100,000 R$ -> $350 standard / $385 premium
 *  - effective USD per listed Robux: $0.00245 standard / $0.002695 premium
 */

import type { CalculatorRouteConfig } from '@/lib/calculator-routes';
import type { FAQItem } from '@/lib/faq-data';

// ─── Route configs ─────────────────────────────────────────────────────────

export const ROBUX_ROUTES: CalculatorRouteConfig[] = [
  {
    slug: 'robux-tax-calculator',
    title: 'Robux Tax Calculator 2026 — Roblox Marketplace Fee & DevEx Rates',
    description:
      'Free Robux tax calculator for 2026. See how much Roblox takes (30% marketplace fee), what you keep per sale, reverse your target price, and convert Robux to USD via DevEx. No sign-up.',
    h1: 'Robux Tax Calculator',
    metaTitle: 'Robux Tax Calculator 2026 — How Much Does Roblox Take?',
    metaDesc:
      'Roblox takes a 30% marketplace fee on every sale — you keep 70%. This free robux tax calculator reverses prices and converts Robux to USD via DevEx. No signup.',
    keywords: [
      'robux tax calculator', 'roblox tax calculator', 'robux marketplace fee',
      'how much does roblox take', 'robux calculator 2026', 'devex robux',
      'robux to usd', 'roblox fee calculator', 'robux after tax', 'roblox developer earnings',
    ],
    componentKey: 'robux',
    category: 'business',
    breadcrumbLabel: 'Robux Calculator',
    ogTitle: 'Robux Tax Calculator 2026 | Roblox Takes 30% — You Keep 70%',
    ogDescription:
      'See what you keep after the Roblox 30% marketplace fee, reverse a target price, and convert Robux to USD with DevEx rates. Free, no sign-up.',
    canonicalPath: '/robux-tax-calculator',
    jsonLdType: 'robux',
  },
];

// ─── Content shape (mirrors the [calculator] page content contract) ─────────

export interface RobuxAdditionContentShape {
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

export const ROBUX_CONTENT: Record<string, RobuxAdditionContentShape> = {
  robux: {
    howItWorks: [
      'Sell anything on the Roblox marketplace — a game pass, a developer product, a catalog item — and the payout is always 30% short of the sticker price. Roblox keeps that 30% as its marketplace fee, and you receive the remaining 70%. List a game pass at 1,000 Robux and 700 lands in your account; the other 300 never does. That gap is what players call the "Robux tax", though it is a platform fee rather than anything a government collects.',
      'Pricing backwards is where most creators slip. If you need 1,000 Robux net, you cannot list at 1,300 — the fee takes 30% of the list price, not of your target. The correct list price is your target divided by 0.70, which is 1,428.57 Robux. That is why so many marketplace prices end in odd-looking numbers: sellers are reverse-engineering the fee to land on a round take-home amount.',
      'Turning Robux into real money runs through the Developer Exchange (DevEx), which pays $0.0035 per Robux at the standard rate and $0.00385 at the premium rate — 100,000 Robux cashes out to $350 or $385. Stack the two steps and each Robux you list is worth only $0.00245 in your pocket after the fee and conversion. Our <a href="/blog/robux-tax-calculator-guide-2026">Robux fee guide</a> walks through every exception, including engagement-based Premium Payouts that skip the 30% fee entirely.',
      'The IRS does arrive eventually. DevEx payouts are self-employment income: once your net freelance earnings cross $400 for the year, the 15.3% self-employment tax applies, and the payout is taxed as ordinary income on top. Roblox issues a 1099-K once gross payments pass the reporting threshold. Development costs — software, equipment, even Robux purchases for testing — are deductible against that income. Run your payout through our <a href="/self-employment-tax-calculator">self-employment tax calculator</a> to see the real after-tax value.',
      'One historical footnote confuses a lot of searchers: the 10% figure people remember was the old affiliate/ referral program commission, which Roblox discontinued. The marketplace fee itself has been 30% across game passes, developer products and catalog resales alike — and Premium subscribers pay it too. Use the three modes above to check a sale, hit a target, or price a cash-out before you list.',
    ],
    calculationMethod: {
      formula: 'Your Robux = List price x 0.70 | Required list = Target / 0.70 | USD = Robux x DevEx rate ($0.0035 standard, $0.00385 premium)',
      steps: [
        'Take the item\u2019s list price in Robux (example: 1,000).',
        'Multiply by 0.30 to get the fee Roblox keeps (300 Robux).',
        'Multiply by 0.70 to get what you receive (700 Robux).',
        'To net a target instead, divide the target by 0.70 — 1,000 target means listing at 1,428.57 Robux.',
        'To convert to USD, multiply the Robux you hold by the DevEx rate: 700 Robux x $0.0035 = $2.45.',
      ],
      example:
        'A game pass listed at 1,000 Robux nets 700 after the 30% fee. Cashing out 700 Robux through standard DevEx pays $2.45. To take home a clean 1,000 Robux, list at 1,428.57 — the fee keeps 428.57 and you keep 1,000.',
    },
    keyRates: [
      { label: 'Roblox Marketplace Fee', value: '30% of every sale' },
      { label: 'Creator Keeps Per Sale', value: '70%' },
      { label: 'DevEx Standard Rate', value: '$0.0035 per Robux' },
      { label: 'DevEx Premium Rate', value: '$0.00385 per Robux' },
      { label: 'Effective USD per Listed R$', value: '$0.00245 (standard)' },
      { label: 'SE-Tax Filing Threshold', value: '$400 net freelance earnings/yr' },
    ],
    faqs: [
      {
        question: 'How much tax does Roblox take on a sale?',
        answer:
          'Roblox takes 30% of the list price as its marketplace fee on every marketplace sale — game passes, developer products and catalog items alike. You receive the remaining 70%. An item listed at 1,000 Robux pays out 700; one listed at 100 pays out 70. The fee is the same for everyone, including Roblox Premium subscribers.',
      },
      {
        question: 'Is the Robux fee 30% or 10%?',
        answer:
          'The marketplace fee is 30%. The 10% figure people remember came from the old affiliate program, which paid creators a 10% commission on referred Robux purchases — Roblox discontinued it. Every current marketplace transaction deducts 30%, with no buyer-side fee: purchasing Robux directly is not taxed, only selling is.',
      },
      {
        question: 'How much should I list an item for to earn 1,000 Robux?',
        answer:
          'Divide your target by 0.70, because Roblox takes 30% of the list price rather than of your target. For a 1,000-Robux take-home you need to list at 1,428.57 Robux. For 500 net, list at 714.29. The reverse calculator above does this instantly — handy for pricing bundles and passes at clean payout numbers.',
      },
      {
        question: 'How much is my Robux worth in real money?',
        answer:
          'Through the Developer Exchange, 100,000 Robux cashes out to $350 at the standard rate ($0.0035 per Robux) or $385 at the premium rate ($0.00385). In practice, 700 Robux — the payout from a 1,000-Robux sale — converts to $2.45. DevEx requires meeting the program\u2019s minimum earned-Robux threshold and a verified developer account before you can withdraw.',
      },
      {
        question: 'Do I owe real taxes on Roblox earnings?',
        answer:
          'Yes, once you cash out. DevEx payouts are self-employment income: after $400 of net freelance earnings in a year the 15.3% self-employment tax applies, and payouts are also taxed as ordinary income. Roblox issues a 1099-K once gross payments cross the reporting threshold. Game-development costs — software, equipment, test purchases — are deductible. Estimate the hit with our self-employment tax calculator.',
      },
      {
        question: 'Do Roblox Premium members pay a lower fee?',
        answer:
          'No — the 30% marketplace fee applies to every seller, Premium or not. What Premium members get is a monthly Robux stipend and access to engagement-based Premium Payouts, which pay creators for time spent in their experiences and are not subject to the marketplace fee. Selling an item as a Premium member still loses 30% of the sticker price.',
      },
    ],
    relatedCalculators: [
      { slug: 'self-employment-tax-calculator', label: 'Self-Employment Tax Calculator' },
      { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
      { slug: 'tax-refund-calculator', label: 'Tax Refund Calculator' },
    ],
  },
};

// ─── Hub cards (calculators explorer) ──────────────────────────────────────

export const ROBUX_HUB_CARDS: Record<
  string,
  { label: string; desc: string; category: 'business'; icon: string; keywords?: string }
> = {
  'robux-tax-calculator': {
    label: 'Robux Tax Calculator',
    desc: 'Roblox 30% marketplace fee — what you keep & DevEx USD value',
    category: 'business',
    icon: 'sparkles',
    keywords:
      'robux tax calculator roblox fee calculator robux marketplace fee how much does roblox take devex robux to usd',
  },
};
