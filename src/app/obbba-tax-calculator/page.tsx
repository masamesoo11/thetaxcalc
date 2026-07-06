import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/site-config';
import { OBBBACalculatorClient } from './obbba-calculator-client';

export const metadata: Metadata = {
  title: 'OBBBA Tax Calculator 2026 — Compare New Tax Law vs Prior Law',
  description:
    'Free OBBBA tax calculator for 2026. Compare your federal income tax under the One Big Beautiful Bill Act vs prior law. See your SALT cap, Child Tax Credit, tip & overtime deduction savings instantly. No sign-up.',
  alternates: { canonical: `${SITE_URL}/obbba-tax-calculator` },
  openGraph: {
    title: 'OBBBA Tax Calculator 2026 | Compare New Tax Law vs Prior Law',
    description:
      'See exactly how much the One Big Beautiful Bill Act saves you in 2026. Compare OBBBA vs prior law with our free calculator.',
    url: `${SITE_URL}/obbba-tax-calculator`,
    siteName: 'TheTaxCalc',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: 'OBBBA Tax Calculator 2026 — Compare New Tax Law vs Prior Law',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OBBBA Tax Calculator 2026 | Compare New Tax Law vs Prior Law',
    description:
      'See exactly how much the One Big Beautiful Bill Act saves you in 2026. Compare OBBBA vs prior law.',
    images: [`${SITE_URL}/opengraph-image.png`],
  },
};

const FAQS = [
  {
    question: 'What is the OBBBA tax calculator?',
    answer:
      'The OBBBA tax calculator compares your 2026 federal income tax under the One Big Beautiful Bill Act (OBBBA, P.L. 119-1) against what you would have paid if the Tax Cuts and Jobs Act (TCJA) had sunset as scheduled on December 31, 2025. It applies every relevant OBBBA provision — permanent TCJA brackets, the $40,400 SALT cap, the doubled $2,200 Child Tax Credit, the new tip and overtime deductions, and the $2,000 senior deduction — and shows your tax savings (or cost) line by line.',
  },
  {
    question: 'How does OBBBA change my 2026 tax refund?',
    answer:
      'OBBBA generally increases refunds for most taxpayers by preventing the reversion to higher pre-TCJA brackets, doubling the Child Tax Credit to $2,200, raising the SALT cap from $10,000 to $40,400, and introducing new deductions for tips, overtime, and seniors. According to the Tax Foundation, OBBBA raises after-tax income by an average of 5.4% in 2026. Use the calculator above to see your specific refund impact, or try our free tax refund calculator for a complete picture including withholding.',
  },
  {
    question: 'Is the OBBBA tip income deduction permanent?',
    answer:
      'No. The tip income deduction for qualifying tipped occupations (restaurant servers, bartenders, hospitality staff, hair stylists, and other traditionally tipped workers) is a temporary provision under OBBBA and is scheduled to sunset in future years. The overtime pay deduction is similarly temporary. The TCJA bracket structure, the higher SALT cap, and the doubled Child Tax Credit are permanent under OBBBA.',
  },
  {
    question: 'Does the OBBBA SALT cap phaseout affect me?',
    answer:
      'The OBBBA SALT cap of $40,400 begins to phase out for single filers with MAGI above $500,000 and married filing jointly filers above $1,000,000. The phaseout reduces the cap linearly back down to $10,000 over a $200,000 range. If your MAGI is below those thresholds, you get the full $40,400 cap (subject to the actual amount of state and local taxes you paid). Most taxpayers — over 95% — fall below the phaseout and receive the full benefit.',
  },
  {
    question: 'How does OBBBA affect families with children?',
    answer:
      'OBBBA doubles the Child Tax Credit from $1,000 (pre-TCJA) to $2,200 per qualifying child under 17, with up to $1,700 refundable. The credit begins phasing out at $200,000 MAGI for single filers and $400,000 for married filing jointly. A family with three children can save up to $3,600 compared to pre-TCJA law. The credit is indexed to inflation going forward, so it will continue to rise in future tax years.',
  },
  {
    question: 'Who benefits most from OBBBA?',
    answer:
      'The biggest winners under OBBBA are families with children (thanks to the doubled Child Tax Credit), upper-middle-income itemizers in high-tax states (California, New York, New Jersey, Connecticut, Illinois — thanks to the SALT cap increase), tipped workers (new tip deduction), hourly employees with regular overtime (new overtime deduction), and seniors 65+ (new $2,000 senior deduction). Households without children in no-income-tax states who take the standard deduction benefit least, though they still gain from the permanent TCJA brackets.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}/obbba-tax-calculator#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'OBBBA Tax Calculator',
          item: `${SITE_URL}/obbba-tax-calculator`,
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/obbba-tax-calculator#faq`,
      mainEntity: FAQS.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    },
    {
      '@type': 'WebApplication',
      name: 'OBBBA Tax Calculator 2026',
      description:
        'Free OBBBA tax calculator for 2026. Compare your federal income tax under the One Big Beautiful Bill Act vs prior law.',
      url: `${SITE_URL}/obbba-tax-calculator`,
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      publisher: { '@type': 'Organization', name: 'TheTaxCalc' },
    },
  ],
};

export default function OBBBATaxCalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground"
      >
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-foreground font-medium">OBBBA Tax Calculator</span>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
        OBBBA Tax Calculator 2026 — Compare the New Tax Law vs Prior Law
      </h1>
      <p className="text-lg text-muted-foreground leading-relaxed mb-8">
        The One Big Beautiful Bill Act (OBBBA) is the most significant change to the individual
        tax code since the TCJA. Use our free OBBBA tax calculator to instantly compare your 2026
        federal income tax under OBBBA against what you would have paid if the TCJA had sunset as
        scheduled. All calculations run in your browser — no sign-up, no data stored.
      </p>

      {/* Calculator */}
      <div className="mb-12">
        <OBBBACalculatorClient />
      </div>

      {/* What Is OBBBA */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">What Is OBBBA?</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The One Big Beautiful Bill Act (OBBBA, P.L. 119-1), signed in 2025, made the
          individual tax cuts from the Tax Cuts and Jobs Act (TCJA) of 2017 permanent.
          Without OBBBA, the TCJA provisions would have sunset on December 31, 2025, and
          62% of taxpayers would have faced higher taxes in 2026 — the largest federal tax
          increase in a generation. OBBBA didn&rsquo;t just extend TCJA, though; it also
          introduced several brand-new deductions that affect how much you owe.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          The five OBBBA changes that matter most for your 2026 tax return are: (1) TCJA
          brackets made permanent, preventing reversion to higher rates; (2) the SALT
          deduction cap raised from $10,000 to $40,400; (3) the Child Tax Credit doubled
          from $1,000 to $2,200 per child; (4) new above-the-line deductions for qualifying
          tip income and overtime pay; and (5) a new $2,000 additional deduction for
          taxpayers aged 65 and older. The calculator above applies each of these provisions
          to your situation.
        </p>
      </section>

      {/* SALT Cap */}
      <section className="mb-10 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          SALT Cap Increased to $40,400
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The single most impactful OBBBA change for upper-middle-income filers in high-tax
          states is the increase in the state and local tax (SALT) deduction cap from $10,000
          to $40,400. If you itemize deductions, you can now deduct up to $40,400 in combined
          state income tax, property tax, and sales tax — a $30,400 increase from the old TCJA
          cap that had been in place since 2018.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          A California family with $200,000 income paying $15,000 in state income tax and
          $8,000 in property tax can now deduct the full $23,000 (vs only $10,000 under the
          old cap). At a 22% marginal rate, that&rsquo;s approximately $2,860 in federal tax
          savings — a meaningful win for itemizers in California, New York, New Jersey,
          Connecticut, and Illinois. Single filers with MAGI above $500,000 and married
          filers above $1,000,000 face a phaseout that reduces the cap back to $10,000.
        </p>
      </section>

      {/* Child Tax Credit */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Child Tax Credit Doubled to $2,200
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          OBBBA raises the Child Tax Credit (CTC) to $2,200 per qualifying child under 17 for
          2026, doubled from the $1,000 pre-TCJA level and indexed to inflation going forward.
          The refundable portion (Additional Child Tax Credit) increases to $1,700, meaning
          even families with little or no federal income tax liability can receive a partial
          refund. The credit begins phasing out at $200,000 MAGI for single filers and
          $400,000 for married filing jointly.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          A family with three qualifying children saves up to $3,600 compared to pre-TCJA law
          ($1,200 increase per child × 3 children). Use the calculator above to see exactly
          how much your CTC will be under OBBBA. You can also pair this with our{' '}
          <Link
            href="/paycheck-calculator"
            className="text-emerald-400 hover:text-emerald-300 underline"
          >
            paycheck calculator
          </Link>{' '}
          to see how the CTC affects your take-home pay throughout the year.
        </p>
      </section>

      {/* Tip & Overtime */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          New Tip &amp; Overtime Deductions
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          OBBBA introduces two brand-new above-the-line deductions: a tip income deduction
          for qualifying tipped occupations (restaurant servers, bartenders, hospitality
          staff, hair stylists, and similar roles), and an overtime pay deduction for
          qualifying time-and-a-half overtime pay. Both are temporary provisions scheduled to
          sunset in future years, but they provide meaningful after-tax income increases for
          service industry and hourly workers during their effective period.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          For a restaurant server earning $25,000 in tips on top of a $30,000 base wage,
          the tip deduction could reduce taxable income by up to $25,000 — potentially
          saving thousands in federal tax. Similarly, a manufacturing worker earning $15,000
          in qualifying overtime pay could see a comparable deduction. Documentation
          requirements apply (Form 4137 or Form 4070 for tips; employer overtime reporting
          for the overtime deduction), and the IRS is expected to scrutinize these new
          deductions closely.
        </p>
      </section>

      {/* Senior Deduction */}
      <section className="mb-10 rounded-xl border border-border/30 bg-card/50 p-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          New $2,000 Senior Deduction
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Taxpayers aged 65 and older can claim an additional $2,000 deduction on top of the
          standard deduction under OBBBA. Combined with the existing additional standard
          deduction for seniors (approximately $1,950 for single filers in 2026), a single
          senior taking the standard deduction can subtract roughly $20,050 from gross income
          before calculating federal tax. For married couples where both spouses are 65+, the
          combined deduction is even larger. This is particularly valuable for retirees with
          pension, Social Security, or IRA distribution income.
        </p>
      </section>

      {/* Who Benefits */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Who Benefits Most (and Who Doesn&rsquo;t)
        </h2>
        <div className="space-y-3 text-muted-foreground leading-relaxed">
          <p>
            <span className="font-medium text-foreground">Biggest winners:</span> Families
            with children (doubled CTC), upper-middle-income itemizers in high-tax states
            (raised SALT cap), tipped workers (new tip deduction), hourly employees with
            regular overtime (new overtime deduction), and seniors 65+ (new senior deduction).
            The middle and upper-middle income quintiles see the largest percentage gains —
            roughly 5-6% increases in after-tax income according to Tax Foundation analysis.
          </p>
          <p>
            <span className="font-medium text-foreground">Limited benefit:</span> Very high
            earners (SALT phaseout), non-itemizers in no-income-tax states like Texas and
            Florida (no SALT to deduct), and households without children (no CTC). These
            taxpayers still benefit from the permanent TCJA brackets but miss out on the
            targeted OBBBA deductions.
          </p>
        </div>
      </section>

      {/* Related Tools */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">Related Tax Calculators</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            {
              href: '/paycheck-calculator',
              title: 'Paycheck Calculator',
              desc: 'Take-home pay for all 50 states including federal, FICA, and state taxes.',
            },
            {
              href: '/tax-refund-calculator',
              title: 'Tax Refund Calculator',
              desc: 'Estimate your 2026 federal tax refund based on withholding and credits.',
            },
            {
              href: '/federal-tax-brackets',
              title: '2026 Federal Tax Brackets',
              desc: 'Complete reference for all 2026 federal income tax brackets and rates.',
            },
            {
              href: '/methodology',
              title: 'Methodology & Data Sources',
              desc: 'How we compute every number on TheTaxCalc — IRS, SSA, and state sources.',
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg border border-border/30 bg-card/50 p-4 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-colors"
            >
              <p className="font-medium text-foreground group-hover:text-emerald-400">
                {item.title}
              </p>
              <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          OBBBA Tax Calculator FAQ
        </h2>
        <div className="space-y-4">
          {FAQS.map((faq) => (
            <div
              key={faq.question}
              className="rounded-lg border border-border/30 bg-card/50 p-5"
            >
              <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section>
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-6">
          <p className="text-sm text-muted-foreground leading-relaxed">
            This OBBBA tax calculator provides estimates for informational and educational
            purposes only. It does not constitute tax advice. The calculator uses 2026
            federal tax figures from IRS Revenue Procedure 2025-25 and the JCT description of
            OBBBA (P.L. 119-1). State taxes, AMT, and special circumstances are not included.
            Tax law changes frequently — consult a qualified tax professional (CPA, EA, or tax
            attorney) for advice specific to your situation.
          </p>
        </div>
      </section>
    </div>
  );
}
