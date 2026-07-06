import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'For Tax Professionals — CPAs, EAs & Tax Preparers | TheTaxCalc',
  description:
    'Free tools, data, and resources for tax professionals. Embed our calculators on your firm website, access 2026 federal and state tax data, and share our methodology with clients. No cost, no sign-up.',
  alternates: { canonical: `${SITE_URL}/tax-professionals` },
  openGraph: {
    title: 'For Tax Professionals — CPAs, EAs & Tax Preparers | TheTaxCalc',
    description:
      'Free calculators, tax data, and embeddable widgets for CPAs, Enrolled Agents, and tax preparers. Updated for 2026.',
    url: `${SITE_URL}/tax-professionals`,
    siteName: 'TheTaxCalc',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Is TheTaxCalc free for tax professionals to use?',
    answer:
      'Yes. Every calculator, data page, and resource on TheTaxCalc is free for tax professionals, including CPAs, Enrolled Agents, tax attorneys, and non-credentialed preparers. There are no premium tiers, no per-client fees, and no usage caps. You can use our tools during client meetings, link to our calculators in client emails, or embed them on your firm website at no cost. We do not collect your clients\' financial information — every calculation runs in the browser.',
  },
  {
    question: 'Can I embed TheTaxCalc calculators on my firm website?',
    answer:
      'Yes. We provide embeddable calculator widgets for paycheck estimation, tax refund estimation, mortgage amortization, capital gains, and more. The widgets are free, white-labeled (no TheTaxCalc branding required if you prefer), and run entirely client-side so no data ever passes through your servers. Visit our widgets page to grab the embed code, or contact us if you need a custom integration. Embedding is a great way to add value to your firm website without building calculators yourself.',
  },
  {
    question: 'How do you source your 2026 tax data?',
    answer:
      'We source every figure from the official IRS publications (Rev. Proc. 2025-25 for inflation-adjusted brackets, Publication 15-T for withholding tables, Publication 972 for the Child Tax Credit), the Social Security Administration for the FICA wage base ($184,500 for 2026), and each state\'s Department of Revenue for state income tax brackets, standard deductions, and personal exemptions. Our full methodology is published at /methodology and is updated within 48 hours of any official change. We also cite the One Big Beautiful Bill Act (P.L. 119-1) for OBBBA provisions.',
  },
  {
    question: 'Can I use TheTaxCalc calculators during client meetings?',
    answer:
      'Absolutely. Many tax professionals project our paycheck calculator or state comparison tool on a screen during client meetings to illustrate the impact of a salary increase, a relocation, or a filing-status change. Because calculations run client-side, the page loads instantly and works without an internet connection once cached. You can also share links to specific calculator scenarios with clients before or after meetings. There are no per-meeting or per-client fees — use it as often as you like.',
  },
  {
    question: 'Do you offer an API for tax calculation data?',
    answer:
      'Not currently. All of our calculators run client-side in JavaScript, and the underlying tax data is published openly on our tax data page and methodology page. If you need bulk access to our federal or state tax bracket data for an internal tool, you can scrape the data tables directly or contact us at hello@thetaxcalc.com to discuss a data export. We do not currently offer a paid or free API endpoint, but we are evaluating demand for one.',
  },
  {
    question: 'How can tax professionals contribute to TheTaxCalc?',
    answer:
      'We welcome contributions from credentialed tax professionals. You can submit corrections or updates via email, write guest articles for our blog (we attribute every piece to a credentialed author), or volunteer to review new calculators before they go live. CPAs and EAs who contribute regularly are listed on our authors page with their credentials and a link to their firm. If you would like to contribute, email hello@thetaxcalc.com with your credentials and the topic you would like to cover.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}/tax-professionals#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'For Tax Professionals',
          item: `${SITE_URL}/tax-professionals`,
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/tax-professionals#faq`,
      mainEntity: FAQS.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    },
    {
      '@type': 'WebPage',
      name: 'For Tax Professionals — CPAs, EAs & Tax Preparers',
      description:
        'Free tools, data, and resources for tax professionals. Embed our calculators on your firm website, access 2026 federal and state tax data.',
      url: `${SITE_URL}/tax-professionals`,
      inLanguage: 'en-US',
      isPartOf: { '@type': 'WebSite', name: 'TheTaxCalc', url: SITE_URL },
      audience: {
        '@type': 'BusinessAudience',
        audienceType: 'Tax Professionals',
      },
    },
  ],
};

export default function TaxProfessionalsPage() {
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
        <span className="text-foreground font-medium">For Tax Professionals</span>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
        For Tax Professionals — Free Tools for CPAs, EAs &amp; Preparers
      </h1>
      <p className="text-lg text-muted-foreground leading-relaxed mb-8">
        TheTaxCalc is used by Certified Public Accountants, Enrolled Agents, tax attorneys,
        and non-credentialed preparers across the country. Every calculator on our site is
        free for professional use — during client meetings, in research, embedded on firm
        websites, and in continuing education materials. No sign-up, no per-client fees, no
        data collection.
      </p>

      {/* What We Offer */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">What We Offer Professionals</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border/30 bg-card/50 p-6">
            <h3 className="font-semibold text-foreground mb-2">Embeddable Calculator Widgets</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Add a free paycheck, mortgage, or tax refund calculator to your firm website.
              White-labeled, mobile-responsive, and entirely client-side — your clients&rsquo;
              data never touches your servers or ours.
            </p>
          </div>
          <div className="rounded-xl border border-border/30 bg-card/50 p-6">
            <h3 className="font-semibold text-foreground mb-2">All 50 State Tax Profiles</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Each state has its own calculator with current 2026 brackets, standard deductions,
              and personal exemptions — sourced from each state&rsquo;s Department of Revenue.
              Perfect for multi-state return preparation and client relocations.
            </p>
          </div>
          <div className="rounded-xl border border-border/30 bg-card/50 p-6">
            <h3 className="font-semibold text-foreground mb-2">2026 OBBBA Comparison Tool</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The OBBBA tax calculator compares your clients&rsquo; 2026 federal income tax
              under the new One Big Beautiful Bill Act against what they would have paid if
              the TCJA had sunset. Includes the $40,400 SALT cap, $2,200 CTC, and tip/overtime
              deductions.
            </p>
          </div>
          <div className="rounded-xl border border-border/30 bg-card/50 p-6">
            <h3 className="font-semibold text-foreground mb-2">Full Published Methodology</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Every formula, source, and assumption is documented on our methodology page. Cite
              us in client memos, share the link with skeptical clients, or use our data tables
              in your own research. All sources are official IRS, SSA, and state revenue
              department publications.
            </p>
          </div>
        </div>
      </section>

      {/* Why Professionals Use TheTaxCalc */}
      <section className="mb-10 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Why Tax Professionals Use TheTaxCalc
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Professional preparers tell us they use TheTaxCalc for three reasons. First, our
          calculators load instantly and work without an account — perfect for showing a
          client the impact of a salary increase or a relocation mid-meeting. Second, our data
          is current and fully sourced. We update federal figures within 48 hours of any IRS
          publication, and our state data is sourced directly from each state&rsquo;s revenue
          department. Third, because all calculations run client-side, there are no data
          privacy concerns about client income passing through a third-party server.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Many firms also use our free embeddable widgets to add interactive calculators to
          their own websites without paying for a vendor solution. The widgets can be styled
          to match your firm&rsquo;s brand, and there is no per-visitor fee or usage cap. If
          you need a calculator type we don&rsquo;t currently offer, we accept requests and
          often build requested tools within a few weeks.
        </p>
      </section>

      {/* Calculators for Professionals */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Most-Used Calculators for Professionals
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            {
              href: '/paycheck-calculator',
              title: 'Paycheck Calculator (50 States)',
              desc: 'Show clients their take-home pay in any state — useful for relocations and offer evaluation.',
            },
            {
              href: '/obbba-tax-calculator',
              title: 'OBBBA Tax Calculator',
              desc: 'Compare 2026 federal tax under OBBBA vs prior law. Includes SALT cap, CTC, tip & overtime.',
            },
            {
              href: '/tax-refund-calculator',
              title: 'Tax Refund Calculator',
              desc: 'Quick refund estimate based on withholding, credits, and filing status.',
            },
            {
              href: '/self-employment-tax-calculator',
              title: 'Self-Employment Tax Calculator',
              desc: 'SE tax, deduction for employer portion, and quarterly estimate planning for Schedule C clients.',
            },
            {
              href: '/capital-gains-calculator',
              title: 'Capital Gains Calculator',
              desc: 'Short-term and long-term CG rates with NIIT — for investment and home sale scenarios.',
            },
            {
              href: '/home-sale-tax-calculator',
              title: 'Home Sale Tax Calculator',
              desc: 'Section 121 exclusion, depreciation recapture, and basis adjustment in one tool.',
            },
            {
              href: '/irs-withholding-calculator',
              title: 'IRS Withholding (W-4) Calculator',
              desc: 'Help clients avoid surprises at year-end by tuning their W-4 withholding.',
            },
            {
              href: '/compare',
              title: 'State Comparison Tool',
              desc: 'Compare any two states side-by-side on income tax, property tax, and sales tax.',
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

      {/* Credentialed Authors */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Credentialed Authors &amp; Reviewers
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Every blog article and calculator methodology on TheTaxCalc is written or reviewed by
          a credentialed tax professional. Our author team includes CPAs, Enrolled Agents, and
          a former IRS revenue agent. Every page is dated and timestamped so you can verify
          that the information is current. We also publish a full author bio page for each
          contributor, with their credentials and a link to their firm or LinkedIn profile.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          If you are a CPA, EA, or tax attorney interested in writing for TheTaxCalc — whether
          a single guest article or a recurring column — we would love to hear from you. Guest
          authors retain full byline credit, can include a link to their firm, and help shape
          the conversation around tax literacy. Email{' '}
          <a
            href="mailto:hello@thetaxcalc.com"
            className="text-emerald-400 hover:text-emerald-300 underline"
          >
            hello@thetaxcalc.com
          </a>{' '}
          to discuss.
        </p>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          FAQ for Tax Professionals
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

      {/* Contact */}
      <section>
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-3">
            Have a Question or Request?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4 max-w-2xl mx-auto">
            Whether you need a calculator type we don&rsquo;t offer, want to embed a widget on
            your firm site, or want to write for us — we want to hear from you.
          </p>
          <a
            href="mailto:hello@thetaxcalc.com"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-3 text-sm font-medium text-white hover:from-emerald-500 hover:to-emerald-400 transition-colors"
          >
            Contact Our Team
          </a>
          <p className="mt-4 text-sm text-muted-foreground">
            Or explore our{' '}
            <Link
              href="/methodology"
              className="text-emerald-400 hover:text-emerald-300 underline"
            >
              methodology page
            </Link>{' '}
            and{' '}
            <Link href="/about" className="text-emerald-400 hover:text-emerald-300 underline">
              about page
            </Link>{' '}
            to learn more.
          </p>
        </div>
      </section>
    </div>
  );
}
