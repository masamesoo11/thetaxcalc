import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, SITE_HOME_URL } from '@/lib/site-config';
import { SALARY_AMOUNTS, formatSalaryCompact } from '@/lib/salary-calculations';
import { getPublishedPostsMeta } from '@/lib/blog-index';
import { COMPARISON_SLUGS, COMPARE_STATES, parseComparisonSlug } from '@/lib/compare-config';
import { getCalculatorAuthor, authorToJsonLd } from '@/lib/authors';
import { AuthorBioCard } from '@/components/finance/author-bio-card';
import { TOTAL_CALCULATOR_COUNT, getAllCalculatorListItems } from '@/lib/calculator-routes';
import { STATE_SALES_TAX, ALL_STATE_KEYS, stateKeyToSlug } from '@/lib/state-sales-tax-data';
import { STATE_TAX_DATA } from '@/lib/state-tax-data';
import { HeroCalculator } from '@/components/home/hero-calculator';
import { CalculatorBrowser, type HomeCardData } from '@/components/home/calculator-browser';
import { StatesTaxTable, type StateTaxRow } from '@/components/home/states-tax-table';
import {
  DollarSign,
  MapPin,
  Home,
  PiggyBank,
  ArrowRightLeft,
  TrendingUp,
  Shield,
  Calculator,
  ArrowRight,
  CheckCircle2,
  Zap,
  Star,
  Users,
  Globe,
  Compass,
  BookOpen,
  Scale,
  FileText,
  Map,
  Receipt,
  Clock,
  Gift,
  Building,
  Ticket,
} from 'lucide-react';

// ─── Dynamic Counts (single source of truth) ─────────────────────────────────
// TOTAL_CALCULATOR_COUNT = 67 route-based calculators + 5 standalone pages.
// Never hardcode this number anywhere — import it (audit 2026-10: site quoted
// 67, 64, and 72 in different places).
const CALCULATOR_COUNT = TOTAL_CALCULATOR_COUNT;
const BLOG_COUNT = getPublishedPostsMeta().length;
const LATEST_POSTS = getPublishedPostsMeta().slice(0, 3);

// 50-state table rows (income tax + sales tax). Replaces the old 50-tile
// grid — same /sales-tax-calculator/{slug} links, denser presentation.
const STATE_TABLE_ROWS: StateTaxRow[] = ALL_STATE_KEYS.map((key) => {
  const sales = STATE_SALES_TAX[key];
  const tax = STATE_TAX_DATA[key];
  return {
    key,
    name: sales.name,
    slug: stateKeyToSlug(key),
    incomeTaxRate: tax?.incomeTaxRate ?? '—',
    salesTaxCombined: sales.noStateTax
      ? '0%'
      : `${(sales.combinedRate * 100).toFixed(2)}%`,
    isNoIncomeTax: Boolean(tax?.isNoIncomeTax),
  };
});

// ─── Home Page Metadata ───────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: '2026 Tax Calculator — Paycheck & Take-Home Pay | 50 States',
  description:
    `Free 2026 tax calculator. Take-home pay after federal, FICA & state tax. ${CALCULATOR_COUNT}+ tools & 50-state sales tax data. No sign-up.`,
  authors: [{ name: 'Rachel Mitchell, CPA', url: `${SITE_URL}/about#rachel-mitchell` }],
  // canonical + og:url are emitted as literal tags in the JSX below: Next's
  // metadata resolver renders root URLs as origin-only
  // ("https://thetaxcalc.com" — no trailing slash, see
  // next/dist/lib/metadata/resolvers/resolve-url.js), which strict SEO
  // auditors string-compare against the audited URL "https://thetaxcalc.com/"
  // and report as "canonical points elsewhere → not indexable".
  alternates: {
    types: {
      'application/rss+xml': `${SITE_URL}/feed.xml`,
    },
  },
  keywords: ['tax calculator 2026', '2025 tax calculator', 'income tax calculator', 'tax calculator', 'paycheck calculator', 'take home pay calculator', 'tax liability', 'tax preparation', 'federal income tax', 'itemized deductions', 'gross income'],
  openGraph: {
    title: '2026 Tax Calculator — Paycheck & Take-Home Pay | 50 States',
    description:
      `Free 2026 tax calculator. Take-home pay after federal, FICA & state tax. ${CALCULATOR_COUNT}+ tools & 50-state sales tax data. No sign-up.`,
    siteName: 'TheTaxCalc',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: `${SITE_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: 'TheTaxCalc — Free 2026 Tax & Paycheck Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '2026 Tax Calculator — Paycheck & Take-Home Pay | 50 States',
    description:
      `Free 2026 tax calculator. Take-home pay after federal, FICA & state tax. ${CALCULATOR_COUNT}+ tools & 50-state sales tax data. No sign-up.`,
    images: [`${SITE_URL}/opengraph-image.png`],
  },
};

// ─── Calculator Cards (37 — every link from the previous grid is preserved) ───

const CALCULATOR_CARDS: HomeCardData[] = [
  { href: '/paycheck-calculator', title: 'Paycheck Calculator', desc: 'Federal, FICA & state take-home pay with 401(k) and HSA deductions', badge: 'Most Popular', category: 'paycheck', featured: true, icon: 'DollarSign' },
  { href: '/illinois-tax-calculator', title: 'Illinois Tax Calculator', desc: '4.95% flat tax with $2,775 personal exemption — IL take-home pay', badge: 'IL', category: 'state', featured: true, icon: 'MapPin' },
  { href: '/texas-tax-calculator', title: 'Texas Tax Calculator', desc: '0% state income tax — compute TX take-home pay with property tax analysis', badge: 'TX', category: 'state', featured: true, icon: 'MapPin' },
  { href: '/florida-tax-calculator', title: 'Florida Tax Calculator', desc: '0% income tax + homestead exemption — FL take-home pay & cost of living', badge: 'FL', category: 'state', featured: true, icon: 'MapPin' },
  { href: '/california-tax-calculator', title: 'California Tax Calculator', desc: '1%–13.3% progressive brackets — CA take-home pay with high tax burden', badge: 'CA', category: 'state', featured: true, icon: 'MapPin' },
  { href: '/new-york-tax-calculator', title: 'New York Tax Calculator', desc: '4%–10.9% progressive + NYC tax — NY take-home pay analysis', badge: 'NY', category: 'state', featured: true, icon: 'MapPin' },
  { href: '/mortgage-calculator', title: 'Mortgage Calculator', desc: 'Monthly payment, amortization schedule & extra payment savings', badge: 'Finance', category: 'finance', featured: true, icon: 'Home' },
  { href: '/401k-retirement-calculator', title: '401(k) Retirement Calculator', desc: 'Projected balance with employer match & compound annual growth', badge: 'Planning', category: 'finance', featured: true, icon: 'PiggyBank' },
  { href: '/relocation-calculator', title: 'Relocation Calculator', desc: 'Compare equivalent salary between states — IL, TX, FL, CA, NY', badge: 'Compare', category: 'business', featured: true, icon: 'ArrowRightLeft' },
  { href: '/capital-gains-calculator', title: 'Capital Gains Calculator', desc: 'Short-term & long-term rates: 0%/15%/20% + 3.8% NIIT', badge: 'Invest', category: 'finance', featured: true, icon: 'TrendingUp' },
  { href: '/self-employment-tax-calculator', title: 'Self-Employment Calculator', desc: '15.3% SE tax on 92.35% of net income + half deduction + quarterly estimates', badge: 'Business', category: 'business', featured: true, icon: 'Shield' },
  { href: '/sales-tax-calculator', title: 'Sales Tax Calculator', desc: 'Calculate sales tax for any US state with combined state + local rates. Reverse calculator included', badge: '50 States', category: 'finance', featured: true, icon: 'Receipt' },
  { href: '/tax-refund-calculator', title: 'Tax Refund Calculator', desc: 'Estimate your federal & state tax refund — income, withholding, deductions & credits', badge: 'Refund', category: 'paycheck', icon: 'DollarSign' },
  { href: '/irs-withholding-calculator', title: 'IRS Withholding Calculator', desc: 'Calculate recommended federal withholding per paycheck & optimize your W-4 for 2026', badge: 'W-4', category: 'paycheck', icon: 'FileText' },
  { href: '/overtime-tax-calculator', title: 'No Tax on Overtime Calculator', desc: 'Calculate your savings under the 2025–2028 OT tax exemption law. Time-sensitive!', badge: '2025 Law', category: 'paycheck', icon: 'Clock' },
  { href: '/bonus-tax-calculator', title: 'Bonus Tax Calculator', desc: 'How much tax on your bonus? Compare 22% flat rate vs aggregate method', badge: 'Bonus', category: 'paycheck', icon: 'Gift' },
  { href: '/property-tax-calculator', title: 'Property Tax Calculator', desc: 'Calculate property tax for any US state. Compare all 50 states\' effective rates', badge: 'Property', category: 'finance', icon: 'Building' },
  { href: '/employee-cost-calculator', title: 'Employee Cost Calculator', desc: 'True cost of hiring — salary + employer FICA, FUTA, SUTA, and benefits for small businesses', badge: 'Employer', category: 'business', icon: 'Building' },
  { href: '/lottery-tax-calculator', title: 'Lottery Tax Calculator', desc: 'How much tax on lottery winnings? Federal + state taxes. Lump sum vs annuity comparison', badge: 'Lottery', category: 'business', icon: 'Ticket' },
  { href: '/georgia-tax-calculator', title: 'Georgia Tax Calculator', desc: '4.99% flat state tax — GA take-home pay with standard deductions', badge: 'GA', category: 'state', icon: 'MapPin' },
  { href: '/virginia-tax-calculator', title: 'Virginia Tax Calculator', desc: '2%–5.75% progressive state tax — VA take-home pay with standard deductions', badge: 'VA', category: 'state', icon: 'MapPin' },
  { href: '/north-carolina-tax-calculator', title: 'North Carolina Tax Calculator', desc: '3.99% flat tax with $12,750 standard deduction — NC take-home pay', badge: 'NC', category: 'state', icon: 'MapPin' },
  { href: '/pennsylvania-tax-calculator', title: 'Pennsylvania Tax Calculator', desc: '3.07% flat tax — no state deductions — PA take-home pay', badge: 'PA', category: 'state', icon: 'MapPin' },
  { href: '/ohio-tax-calculator', title: 'Ohio Tax Calculator', desc: '0%–3.99% progressive — first $26,050 tax-free — OH take-home pay', badge: 'OH', category: 'state', icon: 'MapPin' },
  { href: '/michigan-tax-calculator', title: 'Michigan Tax Calculator', desc: '4.25% flat tax with $5,500 personal exemption — MI take-home pay', badge: 'MI', category: 'state', icon: 'MapPin' },
  { href: '/new-jersey-tax-calculator', title: 'New Jersey Tax Calculator', desc: '1.4%–10.75% progressive — highest property taxes — NJ take-home pay', badge: 'NJ', category: 'state', icon: 'MapPin' },
  { href: '/colorado-tax-calculator', title: 'Colorado Tax Calculator', desc: '4.4% flat tax using federal taxable income — CO take-home pay', badge: 'CO', category: 'state', icon: 'MapPin' },
  { href: '/arizona-tax-calculator', title: 'Arizona Tax Calculator', desc: '2.5% flat tax — one of the lowest state rates — AZ take-home pay', badge: 'AZ', category: 'state', icon: 'MapPin' },
  { href: '/washington-tax-calculator', title: 'Washington Tax Calculator', desc: '0% state income tax — WA take-home pay with property & sales tax analysis', badge: 'WA', category: 'state', icon: 'MapPin' },
  { href: '/massachusetts-tax-calculator', title: 'Massachusetts Tax Calculator', desc: '5% flat tax + 4% surtax over $1M — MA take-home pay', badge: 'MA', category: 'state', icon: 'MapPin' },
  { href: '/indiana-tax-calculator', title: 'Indiana Tax Calculator', desc: '2.95% flat tax + county taxes 1.5%–2% — IN take-home pay', badge: 'IN', category: 'state', icon: 'MapPin' },
  { href: '/tennessee-tax-calculator', title: 'Tennessee Tax Calculator', desc: '0% state income tax — high sales tax — TN take-home pay', badge: 'TN', category: 'state', icon: 'MapPin' },
  { href: '/missouri-tax-calculator', title: 'Missouri Tax Calculator', desc: '2%–4.8% progressive — uses federal taxable income — MO take-home pay', badge: 'MO', category: 'state', icon: 'MapPin' },
  { href: '/maryland-tax-calculator', title: 'Maryland Tax Calculator', desc: '2%–5.75% + county taxes up to 3.28% — MD take-home pay', badge: 'MD', category: 'state', icon: 'MapPin' },
  { href: '/wisconsin-tax-calculator', title: 'Wisconsin Tax Calculator', desc: '3.5%–7.65% progressive — WI take-home pay', badge: 'WI', category: 'state', icon: 'MapPin' },
  { href: '/minnesota-tax-calculator', title: 'Minnesota Tax Calculator', desc: '5.35%–9.85% progressive — high top rate — MN take-home pay', badge: 'MN', category: 'state', icon: 'MapPin' },
  { href: '/oregon-tax-calculator', title: 'Oregon Tax Calculator', desc: '4.75%–9.9% progressive — no sales tax — OR take-home pay', badge: 'OR', category: 'state', icon: 'MapPin' },
];

const TRUST_POINTS = [
  '2026 Federal Tax Brackets (up to 37%)',
  'FICA: Social Security (6.2%) + Medicare (1.45%)',
  'SS Wage Cap: $184,500 for 2026',
  'All 50 State Tax Profiles — including IL, TX, FL, CA, NY, GA, VA, NC, PA, OH, MI, NJ, CO, AZ, WA, MA, IN, TN, MO, MD, WI, MN, OR + 27 more (AK, NV, SD, WY, NH, CT, AL, AR, DE, HI, ID, IA, KS, KY, LA, ME, MS, MT, NE, NM, ND, OK, RI, SC, UT, VT, WV)',
  'Standard Deductions by Filing Status',
  '401(k) & HSA Pre-Tax Deductions',
];

// ─── JSON-LD Structured Data ───────────────────────────────────────────────────

const homeAuthor = getCalculatorAuthor();
const homeAuthorId = `${SITE_URL}#author`;

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@id': `${SITE_URL}/#webpage`,
      '@type': 'WebPage',
      name: '2026 Tax Calculator — Paycheck & Take-Home Pay | 50 States',
      description:
        `Free 2026 tax calculators — paycheck, mortgage, 401(k), capital gains, and self-employment. ${CALCULATOR_COUNT} tools & 50-state sales tax data.`,
      url: SITE_URL,
      inLanguage: 'en-US',
      dateModified: '2026-10-26',
      author: { '@id': homeAuthorId },
      publisher: { '@id': `${SITE_URL}/#organization` },
      isPartOf: { '@id': `${SITE_URL}/#website` },
      breadcrumb: { '@id': `${SITE_URL}/#breadcrumb` },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', '.speakable-summary'],
      },
    },
    {
      '@id': `${SITE_URL}/#breadcrumb`,
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      ],
    },
    {
      '@id': `${SITE_URL}/#software`,
      '@type': 'WebApplication',
      name: 'TheTaxCalc Paycheck Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: 0,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/paycheck-calculator`,
      },
    },
    {
      '@id': `${SITE_URL}/#howto`,
      '@type': 'HowTo',
      name: 'How to Calculate Your Take-Home Pay After Taxes',
      description:
        'Step-by-step guide to calculating your net take-home pay after federal tax, FICA, and state income tax deductions.',
      totalTime: 'PT2M',
      step: [
        {
          '@type': 'HowToStep',
          name: 'Enter Your Gross Salary',
          text: 'Input your annual, monthly, bi-weekly, weekly, or hourly salary into the calculator.',
        },
        {
          '@type': 'HowToStep',
          name: 'Select Your State',
          text: 'Choose your state — we cover all 50 states with dedicated income tax calculators, including IL (4.95%), TX (0%), FL (0%), CA (1%–13.3%), NY (4%–10.9%), and 46 more states.'
        },
        {
          '@type': 'HowToStep',
          name: 'Choose Filing Status',
          text: 'Select Single, Married Filing Jointly, or Head of Household for accurate bracket calculations.',
        },
        {
          '@type': 'HowToStep',
          name: 'Add Pre-Tax Deductions',
          text: 'Enter 401(k) contributions (up to $24,500) and HSA contributions to reduce your taxable income.',
        },
        {
          '@type': 'HowToStep',
          name: 'View Your Results',
          text: 'See your net take-home pay broken down by federal tax, FICA, state tax, and pre-tax deductions with effective tax rate.',
        },
      ],
    },
    {
      '@id': `${SITE_URL}/#itemlist`,
      '@type': 'ItemList',
      name: 'Free 2026 Tax Calculators',
      description: `${TOTAL_CALCULATOR_COUNT} free tax calculators for 2026 covering paycheck, state tax, mortgage, retirement, and more.`,
      numberOfItems: TOTAL_CALCULATOR_COUNT,
      itemListElement: getAllCalculatorListItems().map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        url: `${SITE_URL}${item.url}`,
      })),
    },

    { '@id': homeAuthorId, ...authorToJsonLd(homeAuthor) },
    {
      '@id': `${SITE_URL}/#faq`,
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I calculate my take-home pay from my salary?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Start with your gross salary, subtract federal income tax (using progressive brackets), FICA (7.65% for Social Security and Medicare), and state income tax. Pre-tax deductions like 401(k) and HSA lower your taxable income. Use TheTaxCalc paycheck calculator for instant results.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is FICA and how much does it take from my paycheck?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'FICA is the payroll tax funding Social Security (6.2%, capped at $184,500 for 2026) and Medicare (1.45%, no cap). That\'s 7.65% total from every paycheck. An extra 0.9% Medicare surcharge applies on earnings over $200,000.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which states have no income tax?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Nine states have no personal income tax: Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, and Wyoming. TheTaxCalc supports TX and FL paycheck calculators with property tax and cost-of-living analysis.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much is taken out of a $75,000 salary in taxes?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A single filer making $75K pays roughly $7,670 federal tax (after the $16,100 standard deduction), $5,738 FICA, plus state tax. In Texas or Florida (0% state tax), you keep around $61,600. In Illinois (4.95%), closer to $58,000.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does contributing to a 401(k) reduce my taxes?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Every dollar in a traditional 401(k) drops your taxable income for federal and state tax (but not FICA). Contributing $10,000 on a $75K salary saves over $2,200 in federal tax at the 22% bracket. The 2026 limit is $24,500.',
          },
        },
      ],
    },
  ],
};

// ─── Page Component (Server Component) ────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* Exact-form self-canonical + og:url (hoisted into <head> by React 19).
          Byte-identical to the audited URL "https://thetaxcalc.com/" — see the
          note at the `alternates` block above. */}
      <link rel="canonical" href={SITE_HOME_URL} />
      <meta property="og:url" content={SITE_HOME_URL} />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />

      {/* A+ redesign (Task 32): light warm-white base, stone-ink text,
          champagne-gold accents. Fixed light styling — independent of the
          site-wide dark tokens so this page stays light until Phase 2
          unifies the theme. */}
      <div className="bg-[#fafaf9] text-[#1c1917]">

        {/* ─── Hero: copy + embedded live calculator ─────────────── */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_80%_10%,rgba(176,141,62,0.07),transparent)]"
          />
          <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
              {/* Copy */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#b08d3e]/30 bg-[#faf5e9] px-4 py-1.5 text-sm font-semibold text-[#8a6a24]">
                  <Zap className="h-3.5 w-3.5" />
                  Updated for 2026 Tax Year
                </div>

                <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-[#1c1917] sm:text-5xl lg:text-[3.4rem]">
                  Free <span className="text-[#8a6a24]">Tax Calculators</span> for 2026
                </h1>

                <p className="speakable-summary max-w-xl text-lg leading-relaxed text-[#57534e]">
                  Ever look at your pay stub and think &ldquo;wait, they took <em>how</em> much?&rdquo; Yeah, us too.
                  We built these calculators so you can see exactly where your money goes —
                  <strong className="text-[#1c1917]"> federal tax</strong>, FICA, and
                  <strong className="text-[#1c1917]"> state taxes</strong> all broken down line by line.
                  No guesswork, no surprises.
                </p>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Link
                    prefetch={false}
                    href="/paycheck-calculator"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#9a7b2e] to-[#b08d3e] px-8 py-3.5 text-base font-semibold text-white shadow-[0_8px_24px_-8px_rgba(138,106,36,0.5)] transition-all hover:from-[#8a6a24] hover:to-[#9a7b2e] hover:shadow-[0_10px_28px_-8px_rgba(138,106,36,0.6)]"
                  >
                    <Calculator className="h-5 w-5" />
                    Calculate Your Paycheck
                  </Link>
                  <Link
                    prefetch={false}
                    href="/relocation-calculator"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#e7e0d0] bg-white px-8 py-3.5 text-base font-semibold text-[#1c1917] transition-all hover:border-[#b08d3e]/50 hover:text-[#8a6a24]"
                  >
                    <ArrowRightLeft className="h-5 w-5" />
                    Compare States
                  </Link>
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-[#57534e]">
                  <span className="flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-[#8a6a24]" />
                    100% Free
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Shield className="h-4 w-4 text-[#8a6a24]" />
                    No Sign-Up Required
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 text-[#8a6a24]" />
                    2026 Tax Data
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Globe className="h-4 w-4 text-[#8a6a24]" />
                    50 State Profiles
                  </span>
                </div>
              </div>

              {/* Live calculator — the site's real engine, embedded */}
              <HeroCalculator />
            </div>
          </div>
        </section>

        {/* ─── Trust stats band ───────────────────────────────────── */}
        <section className="border-y border-[#e7e0d0] bg-white">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
            {[
              { value: `${CALCULATOR_COUNT}`, label: 'Free calculators & tools' },
              { value: '50', label: 'State tax profiles' },
              { value: `${BLOG_COUNT}`, label: 'Guides & articles' },
              { value: '$0', label: 'Cost — no sign-up, ever' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold tracking-tight text-[#8a6a24] sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-[#57534e]">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Calculator browser (filterable cards) ──────────────── */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-[#1c1917] sm:text-4xl">
                {CALCULATOR_COUNT} Free <span className="text-[#8a6a24]">Tax Calculators</span>
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-[#57534e]">
                Pick the one you need. They&apos;re all free, they all use 2026 data, and none of them will
                ask for your email.
              </p>
            </div>
            <CalculatorBrowser cards={CALCULATOR_CARDS} />
          </div>
        </section>

        {/* ─── State comparison preview ────────────────────────────── */}
        <section className="border-t border-[#e7e0d0] bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-[#1c1917] sm:text-4xl">
                Which State Has the <span className="text-[#8a6a24]">Lowest Tax</span>?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-[#57534e]">
                Same $75,000 salary, wildly different take-home pay. Here&apos;s what you actually keep
                after taxes in each state.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {[
                { state: 'Washington', net: '$61,593', rate: '0%', label: 'No Income Tax', tone: 'gold', href: '/washington-tax-calculator' },
                { state: 'Florida', net: '$60,545', rate: '0%', label: 'Lowest Burden', tone: 'gold', href: '/florida-tax-calculator' },
                { state: 'Arizona', net: '$60,083', rate: '2.5%', label: 'Lowest Rate', tone: 'gold', href: '/arizona-tax-calculator' },
                { state: 'California', net: '$57,950', rate: '1%–13.3%', label: 'Highest Rate', tone: 'red', href: '/california-tax-calculator' },
                { state: 'New York', net: '$57,686', rate: '4%–10.9%', label: '+ NYC Tax', tone: 'red', href: '/new-york-tax-calculator' },
              ].map((item) => (
                <Link
                  prefetch={false}
                  key={item.state}
                  href={item.href}
                  className={`group rounded-2xl border bg-[#fafaf9] p-5 text-center transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-8px_rgba(138,106,36,0.18)] ${
                    item.tone === 'gold' ? 'border-[#b08d3e]/30' : 'border-red-200/60'
                  }`}
                >
                  <p
                    className={`text-xs font-semibold uppercase tracking-wider ${
                      item.tone === 'gold' ? 'text-[#8a6a24]' : 'text-red-600'
                    }`}
                  >
                    {item.label}
                  </p>
                  <p className="mt-2 text-xl font-bold text-[#1c1917]">{item.state}</p>
                  <p className="mt-1 text-sm text-[#57534e]">Tax: {item.rate}</p>
                  <p className="mt-2 text-lg font-semibold text-[#1c1917]">Net: {item.net}</p>
                  <p className={`mt-1 text-[11px] group-hover:underline ${item.tone === 'gold' ? 'text-[#8a6a24]' : 'text-red-600'}`}>
                    View Calculator →
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Salary after tax ─────────────────────────────────────── */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-[#1c1917] sm:text-4xl">
                What&apos;s Your <span className="text-[#8a6a24]">Take-Home Pay</span> After Taxes?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-[#57534e]">
                Select your salary to see exact take-home pay across all 50 states — including Illinois, Texas, Florida, California, and New York.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {[
                { amount: 50000, label: '$50K' },
                { amount: 60000, label: '$60K' },
                { amount: 75000, label: '$75K' },
                { amount: 80000, label: '$80K' },
                { amount: 100000, label: '$100K' },
                { amount: 120000, label: '$120K' },
                { amount: 150000, label: '$150K' },
                { amount: 200000, label: '$200K' },
                { amount: 250000, label: '$250K' },
                { amount: 300000, label: '$300K' },
              ].map((item) => (
                <Link
                  prefetch={false}
                  key={item.amount}
                  href={`/salary/${item.amount}`}
                  className="group inline-flex items-center gap-1.5 rounded-xl border border-[#e7e0d0] bg-white px-5 py-3 text-sm font-semibold text-[#1c1917] transition-all hover:border-[#b08d3e]/50 hover:bg-[#faf5e9] hover:text-[#8a6a24]"
                >
                  {item.label}
                  <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                prefetch={false}
                href="/salary"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#8a6a24] transition-colors hover:text-[#6f551d]"
              >
                View all 26 salary levels
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ─── Sales tax by state (searchable table) ────────────────── */}
        <section className="border-t border-[#e7e0d0] bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-[#1c1917] sm:text-4xl">
                Sales Tax <span className="text-[#8a6a24]">Rates by State</span> (2026)
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-[#57534e]">
                Income tax and combined state + average local sales tax for all 50 states.
                Pick your state for the full breakdown, exemptions, and a dedicated calculator.
              </p>
            </div>

            <StatesTaxTable rows={STATE_TABLE_ROWS} />

            <p className="mt-6 text-center text-sm text-[#57534e]">
              Rates are the average combined state + local rate —{' '}
              <Link prefetch={false} href="/sales-tax-calculator" className="font-semibold text-[#8a6a24] hover:underline">
                open the full sales tax calculator
              </Link>{' '}
              to override the local rate for your exact city.
            </p>
          </div>
        </section>

        {/* ─── For business owners ──────────────────────────────────── */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#e7e0d0] bg-white px-4 py-1.5 text-sm font-semibold text-[#57534e]">
                <Building className="h-3.5 w-3.5" />
                For Business Owners
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-[#1c1917] sm:text-4xl">
                How Much Does an <span className="text-[#8a6a24]">Employee Really Cost</span>?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-[#57534e]">
                Salary is just the beginning. Employer taxes, benefits, and insurance add 25–30% on top.
                See the true cost of hiring in your state.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="rounded-2xl border border-[#e7e0d0] bg-white p-6 lg:col-span-2">
                <p className="mb-4 text-lg font-semibold text-[#1c1917]">Example: 5 Employees at $75,000 in Illinois</p>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#57534e]">Base Salaries (5 × $75,000)</span>
                    <span className="font-semibold text-[#1c1917]">$375,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#57534e]">Employer FICA (7.65%)</span>
                    <span className="font-medium text-orange-700">+$28,688</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#57534e]">FUTA + SUTA</span>
                    <span className="font-medium text-amber-700">+$2,401</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#57534e]">Benefits (20% of salary)</span>
                    <span className="font-medium text-sky-700">+$75,000</span>
                  </div>
                  <div className="border-t border-dashed border-[#e7e0d0] pt-3" />
                  <div className="flex justify-between text-base">
                    <span className="font-semibold text-[#1c1917]">Total Annual Payroll Cost</span>
                    <span className="font-bold text-[#8a6a24]">$481,089</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#57534e]">Cost Per Employee</span>
                    <span className="font-medium text-[#1c1917]">$96,218 <span className="text-amber-700">(28.3% over salary)</span></span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-1 flex-col justify-center rounded-2xl border border-[#b08d3e]/30 bg-[#faf5e9] p-6">
                  <p className="text-lg font-semibold text-[#1c1917]">Employee Cost Calculator</p>
                  <p className="mt-2 text-sm text-[#57534e]">
                    Estimate your true payroll cost — salary + employer FICA, FUTA, SUTA, and benefits. All 50 states.
                  </p>
                  <Link
                    prefetch={false}
                    href="/employee-cost-calculator"
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#9a7b2e] to-[#b08d3e] px-6 py-3 text-sm font-semibold text-white transition-all hover:from-[#8a6a24] hover:to-[#9a7b2e]"
                  >
                    <Building className="h-4 w-4" />
                    Calculate Employee Cost
                  </Link>
                </div>
                <div className="rounded-2xl border border-[#e7e0d0] bg-white p-4">
                  <p className="text-xs text-[#57534e]">
                    <span className="font-medium text-[#1c1917]">Employer FICA alone</span> adds $5,738 per employee
                    at $75K. That&apos;s $28,688 for 5 employees — before benefits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Why we built this ────────────────────────────────────── */}
        <section className="border-t border-[#e7e0d0] bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-[#1c1917] sm:text-4xl">
                  Why We Built <span className="text-[#8a6a24]">TheTaxCalc</span>
                </h2>
                <div className="mt-4 space-y-4 leading-relaxed text-[#57534e]">
                  <p>
                    Honestly? We got tired of tax calculators that felt like they were designed by the IRS.
                    You know the ones — confusing interfaces, outdated brackets, and somehow always trying
                    to sell you something at the end. Whether you need a 2025 tax calculator for last year&apos;s
                    return or a tax calculator 2026 for this year, we&apos;ve got you covered.
                  </p>
                  <p>
                    Every paycheck has OASDI tax (Social Security), Medicare, federal income tax, and state tax
                    taken out. We show you exactly where each dollar goes — from the 6.2% OASDI tax up to the
                    $184,500 wage cap, to the 1.45% Medicare with no cap, to your state&apos;s specific brackets.
                  </p>
                  <p>
                    One of our team members moved from California to Texas a few years back. Same salary,
                    same company — but his take-home jumped by over $8,700 a year. He had no idea the
                    difference would be that big until the first paycheck hit. That&apos;s when we thought:
                    <em> everyone should be able to see this before they make big decisions.</em>
                  </p>
                  <p>
                    So we built the tools we wished existed. All our calculations use the latest 2026
                    federal brackets, FICA rates, and state-specific tax laws — pulled straight from{' '}
                    <a href="https://www.irs.gov/filing/federal-income-tax-rates-and-brackets" target="_blank" rel="noopener noreferrer" className="font-medium text-[#8a6a24] underline underline-offset-2 hover:text-[#6f551d]">IRS publications</a> and{' '}
                    <a href="https://taxfoundation.org/" target="_blank" rel="noopener noreferrer" className="font-medium text-[#8a6a24] underline underline-offset-2 hover:text-[#6f551d]">state revenue departments</a>, not some third-party blog post.
                  </p>
                  <p>
                    Whether you&apos;re searching for a 2025 tax calculator to estimate last year&apos;s refund
                    or planning ahead with our tax calculator 2026, our income tax calculator handles federal
                    income tax, FICA, and state tax for all 50 states. Calculate your tax liability, factor
                    in itemized deductions vs. the standard deduction, and see your true take-home pay based
                    on your gross income. No tax preparation software required — just enter your salary and
                    get instant, accurate numbers. We even earn income estimates for self-employed workers,
                    freelancers, and W-2 employees alike. Not tax advice, just honest math.
                  </p>
                </div>
                <ul className="mt-6 space-y-3">
                  {TRUST_POINTS.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm text-[#57534e]">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#8a6a24]" />
                      {point}
                    </li>
                  ))}
                </ul>
                <Link
                  prefetch={false}
                  href="/paycheck-calculator"
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#9a7b2e] to-[#b08d3e] px-6 py-3 text-sm font-semibold text-white transition-all hover:from-[#8a6a24] hover:to-[#9a7b2e]"
                >
                  <Calculator className="h-4 w-4" />
                  Start Calculating
                </Link>
              </div>
              <div className="rounded-2xl border border-[#e7e0d0] bg-[#fafaf9] p-8">
                <p className="mb-4 text-lg font-semibold text-[#1c1917]">Example: $75,000 in Illinois</p>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#57534e]">Gross Annual Salary</span>
                    <span className="font-semibold text-[#1c1917]">$75,000.00</span>
                  </div>
                  <div className="border-t border-dashed border-[#e7e0d0]" />
                  <div className="flex justify-between">
                    <span className="text-[#57534e]">Federal Tax (after $16,100 std ded)</span>
                    <span className="font-medium text-red-700">-$7,670.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#57534e]">FICA (SS + Medicare)</span>
                    <span className="font-medium text-orange-700">-$5,737.50</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#57534e]">IL State Tax (4.95% on $72,225)</span>
                    <span className="font-medium text-amber-700">-$3,575.14</span>
                  </div>
                  <div className="border-t border-dashed border-[#e7e0d0]" />
                  <div className="flex justify-between text-base">
                    <span className="font-semibold text-[#1c1917]">Net Annual Take-Home</span>
                    <span className="font-bold text-[#8a6a24]">$58,017.36</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#57534e]">Effective Tax Rate</span>
                    <span className="font-medium text-[#1c1917]">22.64%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Explore all tools & resources (directory) ───────────── */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#b08d3e]/30 bg-[#faf5e9] px-4 py-1.5 text-sm font-semibold text-[#8a6a24]">
                <Compass className="h-3.5 w-3.5" />
                Complete Site Directory
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-[#1c1917] sm:text-4xl">
                Explore All <span className="text-[#8a6a24]">Tools & Resources</span>
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-[#57534e]">
                Every calculator, salary breakdown, blog article, and state comparison — all in one place.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Salary after tax */}
              <div className="rounded-2xl border border-[#e7e0d0] bg-white p-5">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#faf5e9]">
                    <DollarSign className="h-4 w-4 text-[#8a6a24]" />
                  </div>
                  <h3 className="text-base font-semibold text-[#1c1917]">Salary After Tax</h3>
                  <span className="ml-auto rounded-full bg-[#faf5e9] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#8a6a24]">26 Levels</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {SALARY_AMOUNTS.map((amount) => (
                    <Link
                      prefetch={false}
                      key={amount}
                      href={`/salary/${amount}`}
                      className="rounded-md border border-[#e7e0d0] bg-[#fafaf9] px-2.5 py-1 text-xs font-medium text-[#57534e] transition-all hover:border-[#b08d3e]/50 hover:bg-[#faf5e9] hover:text-[#8a6a24]"
                    >
                      {formatSalaryCompact(amount)}
                    </Link>
                  ))}
                </div>
                <div className="mt-3 border-t border-[#f0ece3] pt-3">
                  <Link
                    prefetch={false}
                    href="/salary"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8a6a24] transition-colors hover:text-[#6f551d]"
                  >
                    View all salary pages
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>

              {/* Blog & guides */}
              <div className="rounded-2xl border border-[#e7e0d0] bg-white p-5">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#faf5e9]">
                    <BookOpen className="h-4 w-4 text-[#8a6a24]" />
                  </div>
                  <h3 className="text-base font-semibold text-[#1c1917]">Blog & Guides</h3>
                  <span className="ml-auto rounded-full bg-[#faf5e9] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#8a6a24]">{BLOG_COUNT} Articles</span>
                </div>
                <ul className="max-h-96 space-y-2 overflow-y-auto pr-2 [scrollbar-width:thin] [scrollbar-color:#d6c9a5_transparent]">
                  <li>
                    <Link
                      prefetch={false}
                      href="/blog"
                      className="group flex items-center gap-2 py-0.5 text-sm font-semibold text-[#8a6a24] transition-colors hover:text-[#6f551d]"
                    >
                      <span className="h-1 w-1 shrink-0 rounded-full bg-[#b08d3e]" />
                      All Blog Articles
                    </Link>
                  </li>
                  {getPublishedPostsMeta().map((post) => (
                    <li key={post.slug}>
                      <Link
                        prefetch={false}
                        href={`/blog/${post.slug}`}
                        className="group flex items-center gap-2 py-0.5 text-sm text-[#57534e] transition-colors hover:text-[#8a6a24]"
                      >
                        <span className="h-1 w-1 shrink-0 rounded-full bg-[#d6c9a5] transition-colors group-hover:bg-[#b08d3e]" />
                        <span className="line-clamp-1">{post.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              {/* Resources */}
              <div className="rounded-2xl border border-[#e7e0d0] bg-white p-5">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#faf5e9]">
                    <FileText className="h-4 w-4 text-[#8a6a24]" />
                  </div>
                  <h3 className="text-base font-semibold text-[#1c1917]">Resources</h3>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { href: '/federal-tax-brackets', label: 'Federal Tax Brackets', desc: '2026 brackets & rates', icon: Scale },
                    { href: '/glossary', label: 'Tax Glossary', desc: 'Key terms explained', icon: BookOpen },
                    { href: '/compare', label: 'State Comparisons', desc: 'Side-by-side analysis', icon: Map },
                    { href: '/obbba-tax-calculator', label: 'OBBBA Tax Calculator', desc: '2026 law vs prior law', icon: Scale },
                    { href: '/research', label: 'Research Hub', desc: 'Original 2026 tax studies', icon: FileText },
                    { href: '/tax-professionals', label: 'For Tax Professionals', desc: 'CPA tools & resources', icon: Shield },
                    { href: '/smartasset-alternative', label: 'SmartAsset Alternative', desc: 'Compare features & privacy', icon: Calculator },
                    { href: '/scholarship', label: 'Tax Literacy Scholarship', desc: '$2,500 student award', icon: Gift },
                    { href: '/methodology', label: 'Methodology', desc: 'How we calculate taxes', icon: BookOpen },
                  ].map((res) => {
                    const ResIcon = res.icon;
                    return (
                      <Link
                        prefetch={false}
                        key={res.href}
                        href={res.href}
                        className="group flex items-start gap-3 rounded-lg border border-[#f0ece3] bg-[#fafaf9] p-3 transition-all hover:border-[#b08d3e]/40 hover:bg-[#faf5e9]"
                      >
                        <ResIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#8a6a24]" />
                        <div>
                          <p className="text-sm font-medium text-[#1c1917] transition-colors group-hover:text-[#8a6a24]">{res.label}</p>
                          <p className="text-[11px] text-[#78716c]">{res.desc}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* State comparisons */}
              <div className="rounded-2xl border border-[#e7e0d0] bg-white p-5">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#faf5e9]">
                    <ArrowRightLeft className="h-4 w-4 text-[#8a6a24]" />
                  </div>
                  <h3 className="text-base font-semibold text-[#1c1917]">State Tax Comparisons</h3>
                  <span className="ml-auto rounded-full bg-[#faf5e9] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#8a6a24]">10 Matchups</span>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {COMPARISON_SLUGS.map((slug) => {
                    const parsed = parseComparisonSlug(slug);
                    if (!parsed) return null;
                    const [key1, key2] = parsed;
                    const s1 = COMPARE_STATES[key1];
                    const s2 = COMPARE_STATES[key2];
                    return (
                      <Link
                        prefetch={false}
                        key={slug}
                        href={`/compare/${slug}`}
                        className="group flex items-center gap-2 rounded-md border border-[#f0ece3] bg-[#fafaf9] px-3 py-2 text-sm text-[#57534e] transition-all hover:border-[#b08d3e]/40 hover:bg-[#faf5e9] hover:text-[#8a6a24]"
                      >
                        <span className="text-xs font-semibold text-[#78716c] transition-colors group-hover:text-[#8a6a24]">{s1.abbreviation}</span>
                        <span className="text-[10px] text-[#b08d3e]">vs</span>
                        <span className="text-xs font-semibold text-[#78716c] transition-colors group-hover:text-[#8a6a24]">{s2.abbreviation}</span>
                        <span className="ml-auto hidden text-[11px] text-[#78716c] transition-colors group-hover:text-[#8a6a24]/70 sm:inline">{s1.name} vs {s2.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Blog preview ─────────────────────────────────────────── */}
        <section className="border-t border-[#e7e0d0] bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-[#1c1917]">
                  Latest from the <span className="text-[#8a6a24]">Blog</span>
                </h2>
                <p className="mt-1 text-sm text-[#57534e]">We do the homework so you don&apos;t have to</p>
              </div>
              <Link
                prefetch={false}
                href="/blog"
                className="hidden items-center gap-1.5 text-sm font-semibold text-[#8a6a24] transition-colors hover:text-[#6f551d] sm:flex"
              >
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {LATEST_POSTS.map((post) => (
                <Link
                  prefetch={false}
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group rounded-2xl border border-[#e7e0d0] bg-[#fafaf9] p-5 transition-all hover:-translate-y-0.5 hover:border-[#b08d3e]/50 hover:shadow-[0_8px_24px_-8px_rgba(138,106,36,0.18)]"
                >
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8a6a24]">{post.category}</span>
                  <p className="mt-2 text-base font-semibold leading-tight text-[#1c1917] transition-colors group-hover:text-[#8a6a24]">
                    {post.title}
                  </p>
                  <p className="mt-3 text-xs font-semibold text-[#8a6a24] group-hover:underline">Read Article →</p>
                </Link>
              ))}
            </div>
            <div className="mt-6 text-center sm:hidden">
              <Link
                prefetch={false}
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#8a6a24]"
              >
                View All Articles
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ─── Closing CTA + author (dark ink band, gold accents) ──── */}
        <section className="bg-[#0c0a09] py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9a961]">
                Free · No sign-up · 50 states
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Run your numbers in <span className="text-[#c9a961]">30 seconds</span>
              </h2>
              <p className="mt-4 text-[#a8a29e]">
                Enter your salary, pick your state, and see your exact take-home pay —
                federal, FICA, and state taxes broken down line by line with 2026 data.
              </p>
              <Link
                prefetch={false}
                href="/paycheck-calculator"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#c9a961] to-[#b08d3e] px-8 py-4 text-base font-semibold text-[#0c0a09] transition-all hover:from-[#d4b673] hover:to-[#c9a961]"
              >
                <Calculator className="h-5 w-5" />
                Open the Paycheck Calculator
              </Link>
            </div>

            <div className="mx-auto mt-12 max-w-4xl border-t border-white/10 pt-10">
              <AuthorBioCard authorId="rachel-mitchell" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
