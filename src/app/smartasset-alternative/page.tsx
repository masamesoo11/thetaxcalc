import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'SmartAsset Alternative 2026 — Free Paycheck & Tax Calculators',
  description:
    'Free SmartAsset alternative 2026. Paycheck, mortgage, retirement, and tax calculators for all 50 states. No sign-up, no paywall, no data collection.',
  alternates: { canonical: `${SITE_URL}/smartasset-alternative` },
  openGraph: {
    title: 'SmartAsset Alternative 2026 | Free Paycheck & Tax Calculators',
    description:
      'A free, no-sign-up SmartAsset alternative. Paycheck, mortgage, retirement, and tax calculators for all 50 states.',
    url: `${SITE_URL}/smartasset-alternative`,
    siteName: 'TheTaxCalc',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: 'TheTaxCalc — Free SmartAsset Alternative for 2026 Tax Calculators',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SmartAsset Alternative 2026 | Free Tax Calculators',
    description: 'A free, no-sign-up SmartAsset alternative. Calculators for all 50 states.',
    images: [`${SITE_URL}/opengraph-image.png`],
  },
};

const FAQS = [
  {
    question: 'Is TheTaxCalc really a free SmartAsset alternative?',
    answer:
      'Yes. TheTaxCalc provides the same core calculators that SmartAsset offers — paycheck calculator, mortgage calculator, retirement calculator, tax refund estimator, and state-by-state comparisons — but every one of our tools is 100% free with no sign-up, no email requirement, and no paywall. We do not require you to create an account, and we never sell your data to financial advisors or third-party lead aggregators.',
  },
  {
    question: 'Does TheTaxCalc match leads to financial advisors like SmartAsset does?',
    answer:
      'No. TheTaxCalc does not operate a lead-generation business. When you use a SmartAsset calculator, the company typically asks for your contact information and matches you with up to three financial advisors who pay SmartAsset for those introductions. TheTaxCalc does not collect your income, savings, or contact details, and we never share any user information with third-party financial advisors or brokers.',
  },
  {
    question: 'Which calculators does TheTaxCalc offer that compare to SmartAsset?',
    answer:
      'TheTaxCalc offers a paycheck calculator for all 50 states, a mortgage calculator with amortization and extra payment support, a 401(k) and retirement projection calculator, a capital gains tax calculator, a self-employment tax calculator, a tax refund estimator, a home sale tax calculator, a bonus tax calculator, an overtime tax calculator, a lottery tax calculator, a sales tax calculator for all 50 states, a property tax calculator, an IRS withholding (W-4) calculator, and a state-by-state comparison tool. All are free, updated for 2026, and run entirely in your browser.',
  },
  {
    question: 'How accurate are TheTaxCalc calculators compared to SmartAsset?',
    answer:
      'Both TheTaxCalc and SmartAsset use the same primary data sources — IRS Publication 15-T for federal tax withholding, the Social Security Administration for the FICA wage base, and each state\'s Department of Revenue for state income tax. TheTaxCalc publishes a full methodology page documenting every source, every formula, and every assumption we use, and we update our data within 48 hours of any official IRS or state revenue department change. Our 2026 data is current as of January 2026.',
  },
  {
    question: 'Does TheTaxCalc store my salary or financial information?',
    answer:
      'No. All calculations on TheTaxCalc run entirely in your browser using JavaScript. Your income, deductions, savings, and tax figures are never transmitted to our servers or stored in any database. We do not require accounts, we do not use tracking cookies on calculator pages, and we cannot tie your calculation results back to you. SmartAsset and many similar lead-generation sites do collect user input — we do not.',
  },
  {
    question: 'Can I use TheTaxCalc for actual tax filing?',
    answer:
      'Our calculators are designed for estimation, planning, and education — not for filing your actual tax return. They give you a solid starting point for understanding your take-home pay, refund expectations, and tax planning opportunities. When it\'s time to actually file, use IRS Free File, commercial tax preparation software, or work with a qualified CPA or Enrolled Agent who understands your full situation. We recommend our paycheck calculator and tax refund calculator as planning tools throughout the year.',
  },
];

const COMPARISON = [
  { feature: 'Paycheck calculator (50 states)', thetaxcalc: true, smartasset: true },
  { feature: 'Mortgage calculator with amortization', thetaxcalc: true, smartasset: true },
  { feature: 'Retirement / 401(k) calculator', thetaxcalc: true, smartasset: true },
  { feature: 'Capital gains tax calculator', thetaxcalc: true, smartasset: false },
  { feature: 'Self-employment tax calculator', thetaxcalc: true, smartasset: false },
  { feature: 'Bonus, overtime, lottery tax calculators', thetaxcalc: true, smartasset: false },
  { feature: 'State-by-state comparison tool', thetaxcalc: true, smartasset: true },
  { feature: 'Free with no sign-up', thetaxcalc: true, smartasset: false },
  { feature: 'No email required to see results', thetaxcalc: true, smartasset: false },
  { feature: 'No financial advisor lead-matching', thetaxcalc: true, smartasset: false },
  { feature: 'Data never leaves your browser', thetaxcalc: true, smartasset: false },
  { feature: 'Full published methodology', thetaxcalc: true, smartasset: true },
  { feature: 'Updated for 2026 tax year', thetaxcalc: true, smartasset: true },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}/smartasset-alternative#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'SmartAsset Alternative',
          item: `${SITE_URL}/smartasset-alternative`,
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/smartasset-alternative#faq`,
      mainEntity: FAQS.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    },
    {
      '@type': 'WebPage',
      name: 'SmartAsset Alternative 2026 — Free Paycheck & Tax Calculators',
      description:
        'A free, no-sign-up SmartAsset alternative with paycheck, mortgage, retirement, and tax calculators for all 50 states.',
      url: `${SITE_URL}/smartasset-alternative`,
      inLanguage: 'en-US',
      isPartOf: { '@type': 'WebSite', name: 'TheTaxCalc', url: SITE_URL },
    },
  ],
};

export default function SmartAssetAlternativePage() {
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
        <span className="text-foreground font-medium">SmartAsset Alternative</span>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
        The Free SmartAsset Alternative — Paycheck, Mortgage &amp; Tax Calculators
      </h1>
      <p className="text-lg text-muted-foreground leading-relaxed mb-8">
        SmartAsset built a popular suite of financial calculators — but they also collect your
        contact information, match you with up to three paying financial advisors, and require
        an email address before showing you full results. TheTaxCalc is a free, no-strings
        alternative: every calculator runs in your browser, no sign-up required, and your
        numbers never touch our servers. Here&rsquo;s how we compare.
      </p>

      {/* Why Look for an Alternative */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Why Look for a SmartAsset Alternative?
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          SmartAsset is a well-known personal finance site that publishes a paycheck
          calculator, a mortgage calculator, a retirement calculator, and several other tools.
          The site is owned by a company whose business model is lead generation: when you
          enter your information to use a calculator, SmartAsset typically asks for your name,
          email, and phone number, then matches you with up to three financial advisors who
          pay SmartAsset for those introductions.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          That&rsquo;s not necessarily a bad thing — many users want advisor introductions.
          But if you just want to know how much you&rsquo;ll take home after taxes, or whether
          you can afford a $400,000 mortgage, you probably don&rsquo;t want your inbox flooded
          with advisor solicitations. TheTaxCalc was built to be the no-strings alternative:
          you type in your numbers, you get your answer, you leave. No accounts, no emails, no
          advisor matches.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          The other big reason users seek an alternative is privacy. When you enter your
          salary, savings rate, or mortgage details into a lead-generation calculator, that
          data is collected, stored, and in some cases shared with third parties. On TheTaxCalc,
          every calculation runs entirely in your browser using JavaScript — your numbers
          never reach our servers. We couldn&rsquo;t see them even if we wanted to.
        </p>
      </section>

      {/* Comparison Table */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">Feature Comparison</h2>
        <div className="overflow-x-auto rounded-xl border border-border/30">
          <table className="w-full text-sm">
            <thead className="bg-muted/30">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Feature</th>
                <th className="px-4 py-3 text-center font-semibold text-emerald-400">TheTaxCalc</th>
                <th className="px-4 py-3 text-center font-semibold text-muted-foreground">SmartAsset</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {COMPARISON.map((row) => (
                <tr key={row.feature} className="bg-card/30">
                  <td className="px-4 py-3 text-foreground">{row.feature}</td>
                  <td className="px-4 py-3 text-center">
                    {row.thetaxcalc ? (
                      <span className="text-emerald-400 font-bold">✓</span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {row.smartasset ? (
                      <span className="text-muted-foreground">✓</span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Privacy */}
      <section className="mb-10 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">Privacy Is the Difference</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The single biggest difference between TheTaxCalc and SmartAsset is what happens to
          your data. On SmartAsset, when you use the paycheck calculator, you&rsquo;re prompted
          to enter your email address to &ldquo;see your full results.&rdquo; That email — along
          with your income, zip code, and filing status — is collected and used to match you
          with paying financial advisors. The information may also be retained for marketing.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          On TheTaxCalc, the moment you type your salary into the calculator, that number
          stays in your browser. We don&rsquo;t have accounts. We don&rsquo;t collect your
          email. We don&rsquo;t have a database of user calculations, because we never receive
          your calculations in the first place. If you want to share your results, you can
          copy the URL or screenshot it yourself — but by default, what you calculate on
          TheTaxCalc is between you and your browser.
        </p>
      </section>

      {/* Calculators */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Calculators You Can Use Right Now
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            {
              href: '/paycheck-calculator',
              title: 'Paycheck Calculator',
              desc: 'Take-home pay for all 50 states with federal, FICA, and state income tax.',
            },
            {
              href: '/mortgage-calculator',
              title: 'Mortgage Calculator',
              desc: 'Monthly payment, amortization schedule, and extra payment scenarios.',
            },
            {
              href: '/401k-retirement-calculator',
              title: '401(k) Retirement Calculator',
              desc: 'Project your retirement balance with employer match and compound growth.',
            },
            {
              href: '/capital-gains-calculator',
              title: 'Capital Gains Calculator',
              desc: 'Short-term and long-term capital gains tax with NIIT included.',
            },
            {
              href: '/self-employment-tax-calculator',
              title: 'Self-Employment Tax Calculator',
              desc: 'SE tax, deduction for employer portion, and quarterly estimates.',
            },
            {
              href: '/tax-refund-calculator',
              title: 'Tax Refund Calculator',
              desc: 'Estimate your federal refund based on withholding and credits.',
            },
            {
              href: '/home-sale-tax-calculator',
              title: 'Home Sale Tax Calculator',
              desc: 'Capital gains on property with $250K/$500K exclusion and depreciation.',
            },
            {
              href: '/obbba-tax-calculator',
              title: 'OBBBA Tax Calculator',
              desc: 'Compare your 2026 taxes under the new One Big Beautiful Bill Act.',
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg border border-border/30 bg-card/50 p-4 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-colors"
            >
              <p className="font-medium text-foreground">{item.title}</p>
              <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* State Coverage */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">All 50 States Covered</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          TheTaxCalc offers dedicated paycheck calculators for all 50 states. That includes
          no-income-tax states (Texas, Florida, Washington, Nevada, Wyoming, South Dakota,
          Alaska, New Hampshire, Tennessee), flat-tax states (Illinois at 4.95%, Pennsylvania
          at 3.07%, Colorado at 4.4%, Indiana at 3.05%, Michigan at 4.25%, Massachusetts at
          5.0%, Georgia at 5.49%, North Carolina at 4.5%), and the most progressive states
          (California at 1%–13.3%, New York at 4%–10.9% plus NYC tax). Use our{' '}
          <Link
            href="/paycheck-calculator"
            className="text-emerald-400 hover:text-emerald-300 underline"
          >
            paycheck calculator
          </Link>{' '}
          or compare any two states side-by-side on our{' '}
          <Link
            href="/compare"
            className="text-emerald-400 hover:text-emerald-300 underline"
          >
            state comparison page
          </Link>
          .
        </p>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          SmartAsset Alternative FAQ
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
        <div className="rounded-xl border border-border/30 bg-muted/10 p-6">
          <p className="text-sm text-muted-foreground leading-relaxed">
            TheTaxCalc is an independent personal finance website and is not affiliated with,
            endorsed by, or sponsored by SmartAsset. SmartAsset is a trademark of its
            respective owner. All product names, logos, and brands are property of their
            respective owners. Comparisons on this page are based on publicly available
            information as of January 2026.
          </p>
        </div>
      </section>
    </div>
  );
}
