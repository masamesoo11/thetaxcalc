import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Scholarship 2026 — $2,500 Tax & Finance Student Award',
  description:
    'Apply for the 2026 TheTaxCalc Scholarship — $2,500 for finance, accounting, economics, or tax students. Free to apply. Deadline May 31, 2026.',
  alternates: { canonical: `${SITE_URL}/scholarship` },
  openGraph: {
    title: 'TheTaxCalc Scholarship 2026 | $2,500 Finance & Tax Student Award',
    description:
      'A $2,500 scholarship for students studying finance, accounting, economics, or tax. Free to apply. Deadline May 31, 2026.',
    url: `${SITE_URL}/scholarship`,
    siteName: 'TheTaxCalc',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: 'TheTaxCalc Scholarship 2026 — $2,500 Tax & Finance Student Award',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TheTaxCalc Scholarship 2026 | $2,500 Student Award',
    description: 'A $2,500 scholarship for finance, accounting, economics, or tax students. Free to apply.',
    images: [`${SITE_URL}/opengraph-image.png`],
  },
};

const FAQS = [
  {
    question: 'Who is eligible to apply for the TheTaxCalc Scholarship?',
    answer:
      'The TheTaxCalc Scholarship is open to U.S. citizens, permanent residents, and visa holders who are currently enrolled at an accredited U.S. college or university (undergraduate or graduate) with at least a 3.0 cumulative GPA. Eligible majors include finance, accounting, economics, taxation, business administration, mathematics, and related fields. High school seniors with proof of enrollment for the upcoming fall semester are also welcome to apply.',
  },
  {
    question: 'How much is the scholarship award and when is the deadline?',
    answer:
      'The 2026 TheTaxCalc Scholarship is a one-time $2,500 award. Applications open January 1, 2026 and the final deadline is May 31, 2026 at 11:59 PM Pacific Time. The winner is announced on or before July 15, 2026. Funds are paid directly to the winner\'s college or university to be applied toward tuition, fees, or required course materials.',
  },
  {
    question: 'What materials do I need to submit with my application?',
    answer:
      'You\'ll need three items: (1) a 500–800 word original essay on how understanding personal taxation improves financial literacy and long-term wealth building, (2) a current resume or CV highlighting your academic and extracurricular activities, and (3) proof of current enrollment (an unofficial transcript or registration confirmation). All materials must be submitted through our online application form by the deadline — emailed or mailed submissions are not accepted.',
  },
  {
    question: 'How is the winner selected and when will I be notified?',
    answer:
      'Applications are reviewed by a committee of TheTaxCalc editors and a Certified Public Accountant (CPA). Essays are scored on clarity (30%), originality (30%), relevance to modern tax issues (25%), and writing mechanics (15%). Finalists may be contacted for a brief phone interview. The winner is notified by email no later than July 15, 2026 and announced on our blog shortly after. All applicants receive a confirmation email upon submission.',
  },
  {
    question: 'Can I apply more than once or reapply in future years?',
    answer:
      'You may submit only one application per cycle. Previous applicants who did not win are welcome to reapply in subsequent years, provided they still meet the eligibility requirements. Previous winners are not eligible to apply again. The TheTaxCalc Scholarship runs annually, so even if you miss this year\'s deadline you can apply for next year\'s award.',
  },
  {
    question: 'Is there any cost to apply or any obligation if I win?',
    answer:
      'No. The TheTaxCalc Scholarship is 100% free to apply — there is no application fee and no purchase required. If you win, the only obligation is to provide a brief headshot and short quote that we may use in our winner announcement. You retain all rights to your essay. We will never sell your personal information or use your contact details for marketing without explicit opt-in consent.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}/scholarship#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Scholarship',
          item: `${SITE_URL}/scholarship`,
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/scholarship#faq`,
      mainEntity: FAQS.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    },
    {
      '@type': 'EducationalOccupationalProgram',
      name: 'TheTaxCalc Scholarship 2026',
      description:
        'A $2,500 scholarship for undergraduate and graduate students studying finance, accounting, economics, or tax.',
      url: `${SITE_URL}/scholarship`,
      provider: { '@type': 'Organization', name: 'TheTaxCalc', url: SITE_URL },
      offers: {
        '@type': 'Offer',
        price: '2500',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
      applicationDeadline: '2026-05-31',
      startDate: '2026-01-01',
    },
  ],
};

export default function ScholarshipPage() {
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
        <span className="text-foreground font-medium">Scholarship</span>
      </nav>

      {/* Hero */}
      <div className="mb-10 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 p-8 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 text-sm text-emerald-400 mb-4">
          2026 Application Now Open
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
          TheTaxCalc Scholarship — $2,500 Award
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Supporting the next generation of tax professionals, financial planners, and
          economists. Open to U.S. undergraduate and graduate students studying finance,
          accounting, economics, or taxation.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm">
          <span className="rounded-full bg-background/50 px-3 py-1.5 text-muted-foreground">
            Award: <span className="font-semibold text-foreground">$2,500</span>
          </span>
          <span className="rounded-full bg-background/50 px-3 py-1.5 text-muted-foreground">
            Deadline: <span className="font-semibold text-foreground">May 31, 2026</span>
          </span>
          <span className="rounded-full bg-background/50 px-3 py-1.5 text-muted-foreground">
            Cost: <span className="font-semibold text-emerald-400">Free to Apply</span>
          </span>
        </div>
      </div>

      {/* Overview */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">About the Scholarship</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          At TheTaxCalc, we believe that understanding taxation is the foundation of financial
          literacy. Our free tax calculators — covering paycheck estimation, capital gains,
          self-employment, retirement, and more — have helped millions of Americans better
          understand where their money goes. The TheTaxCalc Scholarship extends that mission
          by supporting students who are pursuing careers in finance, accounting, economics,
          and tax policy.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The 2026 TheTaxCalc Scholarship is a one-time $2,500 award given to one outstanding
          student who demonstrates academic excellence, an interest in taxation or personal
          finance, and a commitment to helping others make better financial decisions. Funds
          are paid directly to the winner&rsquo;s accredited U.S. college or university and can
          be applied toward tuition, fees, or required course materials for the 2026-2027
          academic year.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          We launched this scholarship in 2024 as a way to give back to the community that
          has supported TheTaxCalc since our founding. Past winners have gone on to careers at
          Big Four accounting firms, regional CPA practices, financial planning firms, and
          public policy organizations. If you are passionate about helping people understand
          their taxes and build long-term wealth, we want to hear from you.
        </p>
      </section>

      {/* Eligibility */}
      <section className="mb-10 rounded-xl border border-border/30 bg-card/50 p-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">Eligibility Requirements</h2>
        <ul className="space-y-2 text-muted-foreground">
          {[
            'U.S. citizen, permanent resident, or valid visa holder',
            'Currently enrolled at an accredited U.S. college or university (undergraduate or graduate)',
            'Cumulative GPA of 3.0 or higher',
            'Majoring in finance, accounting, economics, taxation, business administration, mathematics, or a closely related field',
            'High school seniors with proof of enrollment for the upcoming fall semester are also eligible',
            'At least 17 years old at the time of application',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-emerald-400 mt-0.5">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* How to Apply */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">How to Apply</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Applications are accepted online only. To apply for the 2026 TheTaxCalc Scholarship,
          submit the following three items through our online application form by 11:59 PM
          Pacific Time on May 31, 2026:
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-border/30 bg-card/50 p-5">
            <div className="text-2xl font-bold text-emerald-400 mb-2">1</div>
            <h3 className="font-semibold text-foreground mb-1">Original Essay</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A 500–800 word essay on how understanding personal taxation improves financial
              literacy and long-term wealth building. Must be original and unpublished.
            </p>
          </div>
          <div className="rounded-lg border border-border/30 bg-card/50 p-5">
            <div className="text-2xl font-bold text-emerald-400 mb-2">2</div>
            <h3 className="font-semibold text-foreground mb-1">Resume / CV</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A current resume highlighting your academic achievements, extracurricular
              activities, work experience, and any community involvement.
            </p>
          </div>
          <div className="rounded-lg border border-border/30 bg-card/50 p-5">
            <div className="text-2xl font-bold text-emerald-400 mb-2">3</div>
            <h3 className="font-semibold text-foreground mb-1">Proof of Enrollment</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              An unofficial transcript or registration confirmation showing current enrollment
              at an accredited U.S. institution.
            </p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          Email submissions are not accepted. To request an application form, contact{' '}
          <a
            href="mailto:scholarship@thetaxcalc.com"
            className="text-emerald-400 hover:text-emerald-300 underline"
          >
            scholarship@thetaxcalc.com
          </a>{' '}
          with the subject line &ldquo;2026 Scholarship Application Request.&rdquo;
        </p>
      </section>

      {/* Selection Process */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">Selection Process</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Applications are reviewed by a committee composed of TheTaxCalc editors and an
          external Certified Public Accountant (CPA) who volunteers as a reader. Each essay is
          scored on four criteria, weighted as follows:
        </p>
        <div className="space-y-3">
          {[
            { label: 'Clarity of argument and thesis', weight: '30%' },
            { label: 'Originality of perspective', weight: '30%' },
            { label: 'Relevance to modern tax issues', weight: '25%' },
            { label: 'Writing mechanics (grammar, structure, style)', weight: '15%' },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between rounded-lg border border-border/30 bg-card/50 p-4"
            >
              <span className="text-sm text-foreground">{item.label}</span>
              <span className="font-semibold text-emerald-400">{item.weight}</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
          Finalists may be contacted for a brief 15-minute phone interview. The winner is
          notified by email no later than July 15, 2026 and announced on our blog shortly
          after. All applicants receive a confirmation email upon submission, and finalists
          who are not selected are notified by August 31, 2026.
        </p>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-6">Scholarship FAQ</h2>
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

      {/* Related Resources */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">Related Resources</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            {
              href: '/paycheck-calculator',
              title: 'Paycheck Calculator',
              desc: 'See how tax brackets work in practice with our free paycheck calculator.',
            },
            {
              href: '/methodology',
              title: 'Tax Calculation Methodology',
              desc: 'Understand exactly how we compute federal, state, and FICA taxes.',
            },
            {
              href: '/about',
              title: 'About TheTaxCalc',
              desc: 'Learn about our mission to make tax knowledge accessible to everyone.',
            },
            {
              href: '/tax-professionals',
              title: 'For Tax Professionals',
              desc: 'Resources and tools for CPAs, EAs, and tax preparers.',
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

      {/* Terms */}
      <section>
        <div className="rounded-xl border border-border/30 bg-muted/10 p-6">
          <h3 className="font-semibold text-foreground mb-2">Official Rules &amp; Terms</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The TheTaxCalc Scholarship is administered by TheTaxCalc. Employees of TheTaxCalc
            and their immediate family members are not eligible. The winner consents to the
            use of their name, headshot, and essay excerpt for promotional purposes. The
            decision of the selection committee is final. By applying, you agree to the full
            official rules available at{' '}
            <Link href="/terms" className="text-emerald-400 hover:text-emerald-300 underline">
              /terms
            </Link>
            . For questions, email{' '}
            <a
              href="mailto:scholarship@thetaxcalc.com"
              className="text-emerald-400 hover:text-emerald-300 underline"
            >
              scholarship@thetaxcalc.com
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
