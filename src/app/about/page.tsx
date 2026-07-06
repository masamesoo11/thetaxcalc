import { Metadata } from 'next';
import {
  Users,
  Target,
  Shield,
  Zap,
  Globe,
  Heart,
  BarChart3,
  CheckCircle2,
  Mail,
  DollarSign,
  Calculator,
  BookOpen,
  ClipboardCheck,
  ChevronDown,
} from 'lucide-react';
import Link from 'next/link';
import { Breadcrumb } from '@/components/finance/breadcrumb';
import { ProtectedEmail } from '@/components/finance/protected-email';
import { SITE_URL } from '@/lib/site-config';
import { getCalculatorAuthor, authorToJsonLd, AUTHORS } from '@/lib/authors';
import { AuthorBioCard } from '@/components/finance/author-bio-card';

export const metadata: Metadata = {
    title: 'About TheTaxCalc — Free 2026 Tax Calculators & CPA-Reviewed',
    description:
      'Learn about TheTaxCalc — our mission to provide free, accurate tax calculators. Understand your take-home pay after federal, FICA, and state taxes.',
    authors: [{ name: 'Rachel Mitchell, CPA' }],
    keywords: ['about thetaxcalc', 'tax calculator about', 'tax tool mission', 'free tax calculator', 'tax data accuracy', 'tax calculator team'],
    alternates: {
      canonical: `${SITE_URL}/about`,
    },
    openGraph: {
      title: 'About — Free 2026 Tax Calculators',
    description:
      'Learn about TheTaxCalc — our mission to provide free, accurate tax calculators for every American.',
    url: `${SITE_URL}/about`,
    siteName: 'TheTaxCalc',
    type: 'website',
    locale: 'en_US',
    images: [{ url: `${SITE_URL}/opengraph-image.png`, width: 1200, height: 630, alt: 'About TheTaxCalc — Free Tax Calculators' }],
  },
};

const ABOUT_FAQS = [
  { question: 'Is TheTaxCalc really free? What\'s the catch?', answer: 'No catch. Because all calculations run in your browser and we don\'t store any of your data, our server costs are minimal. No premium tiers, no paywalls, no "unlock full results for $9.99." Just free calculators.' },
  { question: 'How accurate are the calculations?', answer: 'We use the same data the IRS and state revenue departments publish — the 2026 brackets, standard deductions, FICA rates, the works. Every methodology is reviewed by tax professionals. Our tools give you solid estimates, not guarantees. For filing your actual return, talk to a CPA.' },
  { question: 'Does TheTaxCalc store my salary or financial data?', answer: 'Nope. When you type your salary into one of our calculators, that number stays in your browser. It never gets sent to our servers. We don\'t have accounts, we don\'t use tracking cookies on calculations, and we couldn\'t tie your data to you even if we wanted to.' },
  { question: 'Do you cover all 50 states?', answer: 'Yes. We cover all 50 states with dedicated income tax calculators and all 50 states for sales tax — from zero-income-tax states (TX, FL, WA, NV, WY, AK, SD, NH, TN) to the highest-tax states (CA, NY), plus flat-tax states (IL, CO, IN, PA, MI, MA) and progressive states across the country. Every state has its own calculator with local rates and rules.' },
  { question: 'When do you update tax brackets?', answer: 'As soon as the IRS and state revenue departments publish new figures — usually late Q4 or early Q1. Our 2026 data is current as of January 2026.' },
  { question: 'Can I use this to file my taxes?', answer: 'Please don\'t. Our calculators are for estimation and planning. When it\'s time to actually file, use real tax preparation software or work with a CPA who knows your situation. We\'re a starting point, not a substitute.' },
];

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@id': `${SITE_URL}/about#breadcrumb`,
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'About' },
      ],
    },
    {
      '@id': `${SITE_URL}/about#author`,
      ...authorToJsonLd(getCalculatorAuthor()),
    },
    // Add Person schema for all team members — strengthens E-E-A-T
    ...Object.values(AUTHORS).map((author) => ({
      '@id': `${SITE_URL}/about#${author.id}`,
      ...authorToJsonLd(author),
    })),
    {
      '@id': `${SITE_URL}/about#aboutpage`,
      '@type': 'WebPage',
      name: 'About TheTaxCalc',
      description: 'Learn about TheTaxCalc — our mission to provide free, accurate tax calculators for every American.',
      url: `${SITE_URL}/about`,
      inLanguage: 'en-US',
      dateModified: '2026-02-01',
      author: { '@id': `${SITE_URL}/about#author` },
      reviewedBy: { '@id': `${SITE_URL}/about#author` },
      publisher: { '@id': `${SITE_URL}/#organization` },
      mainEntity: { '@id': `${SITE_URL}/#organization` },
      breadcrumb: { '@id': `${SITE_URL}/about#breadcrumb` },
    },
    {
      '@id': `${SITE_URL}/about#faq`,
      '@type': 'FAQPage',
      mainEntity: ABOUT_FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ],
};

const VALUES = [
  {
    icon: Shield,
    title: 'We Get the Numbers Right',
    desc: "We've seen calculators that round your bracket up or just slap last year's rates on the page and hope nobody notices. We found one last month that was still showing 2024 federal brackets — in 2026. Every rate, bracket, and exemption on this site comes straight from IRS Publication 15-T or the state revenue department's own website. When they update, we update. Usually within 48 hours."
  },
  {
    icon: Zap,
    title: 'Free. Period.',
    desc: "No sign-up wall. No 'premium tier.' No sneaky upsell after three calculations. We built TheTaxCalc because we believe understanding your own paycheck shouldn't cost you a dime. A friend of ours actually paid $15 to a tax calculator site before realizing it was just going to show him the same math he could've done himself. That's the kind of thing that made us want to build this. That's not changing.",
  },
  {
    icon: Globe,
    title: 'Your Data Stays Yours',
    desc: "This one's personal. A few years back, one of those 'free' tax prep sites got caught selling user income data to data brokers. Like, your actual salary. So yeah — all the math runs right in your browser. Your numbers never touch our servers. We couldn't see them even if we wanted to. No accounts, no cookies on calculations, no way to tie results back to you.",
  },
  {
    icon: Heart,
    title: 'Built for Real People',
    desc: "We're not just building for accountants. We're building for the teacher in Chicago who just got a job offer in Houston and wants to know if the $10K raise actually means more take-home. Or the freelancer in Brooklyn drowning in quarterly estimates. Or honestly, anyone who's looked at their pay stub and thought 'wait, that much?' Yeah — these tools are for you.",
  },
];

const TEAM_STATS = [
  { value: '64', label: 'Free Calculators', icon: Calculator },
  { value: '50', label: 'State Profiles', icon: Globe },
  { value: '2026', label: 'Tax Year Data', icon: BarChart3 },
  { value: '0', label: 'Data Stored', icon: Shield },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />

      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'About' }]} />

      {/* Header */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 text-sm text-emerald-400 mb-6">
          <Users className="h-3.5 w-3.5" />
          About TheTaxCalc
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Free <span className="gradient-text">Tax Calculators</span>
          {' '}
          <br />
          Built for You
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          We built TheTaxCalc because we were tired of tax calculators that felt like they were
          designed by the IRS itself — confusing, ugly, and somehow always trying to upsell you.
        </p>
      </div>

      {/* The Story */}
      <section className="mb-12 rounded-xl border border-border/30 bg-card/50 p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
            <Target className="h-5 w-5 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Why We Built This</h2>
        </div>
        <div className="text-muted-foreground leading-relaxed space-y-4">
          <p>
            In 2022, one of our team members moved from Sacramento to Austin. Same salary ($115,000),
            same company — but suddenly his take-home pay jumped by over $8,700 a year. He knew
            Texas didn't have a state income tax, but actually seeing the number on a paycheck?
            That hit different. He'd been leaving nearly $725 a month on the table and didn't even
            realize it.
          </p>
          <p>
            He went looking for a calculator that could have shown him this beforehand. What he
            found was frustrating: tools that required his email before showing results, calculators
            using outdated tax brackets, sites that looked like they hadn&apos;t been updated since 2015,
            and — worst of all — calculators that asked for his salary and then tried to sell him
            financial planning services.
          </p>
          <p className="text-foreground font-medium">
            So we built the tool we wished existed.
          </p>
          <p>
            TheTaxCalc started as a weekend project — a single paycheck calculator that actually
            used current tax data and didn&apos;t try to sell you anything. It turns out a lot of people
            wanted exactly that. Today we have 64 calculators covering paycheck estimation, mortgage
            amortization, 401(k) projections, capital gains, self-employment taxes, sales tax,
            overtime, lottery, bonus, property tax, IRS withholding, and side-by-side
            state comparisons — all updated for the 2026 tax year.
          </p>
          <p>
            Here&apos;s the thing that still drives us crazy: most Americans don&apos;t know their
            effective tax rate. They see deductions on their pay stub and just accept it. We want
            to change that. Not with jargon or lectures, but with a simple, honest tool that
            shows you exactly where your money goes.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="mb-12">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {TEAM_STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="rounded-xl border border-border/30 bg-card/50 p-5 text-center"
              >
                <Icon className="h-5 w-5 text-emerald-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Values */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground text-center mb-8">
          What We <span className="gradient-text">Stand For</span>
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {VALUES.map((value) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className="rounded-xl border border-border/30 bg-card/50 p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                    <Icon className="h-5 w-5 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* What We Cover */}
      <section className="mb-12 rounded-xl border border-border/30 bg-card/50 p-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          States & <span className="gradient-text">Calculators</span>
        </h2>
        <div className="text-sm text-muted-foreground leading-relaxed space-y-4">
          <p>
            We cover all 50 states with dedicated income tax calculators, plus
            sales tax data for all 50 states. Each state profile includes not just the income
            tax rate, but property tax context, sales tax data, and retirement-friendliness notes.
            Here are some of our most popular states:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { state: 'Illinois', rate: '4.95% flat tax', href: '/illinois-tax-calculator' },
              { state: 'Texas', rate: '0% state income tax', href: '/texas-tax-calculator' },
              { state: 'Florida', rate: '0% state income tax', href: '/florida-tax-calculator' },
              { state: 'California', rate: '1%–13.3% progressive', href: '/california-tax-calculator' },
              { state: 'New York', rate: '4%–10.9% + NYC tax', href: '/new-york-tax-calculator' },
              { state: 'Georgia', rate: '5.49% flat tax', href: '/georgia-tax-calculator' },
              { state: 'Virginia', rate: '2%–5.75% progressive', href: '/virginia-tax-calculator' },
              { state: 'Colorado', rate: '4.4% flat tax', href: '/colorado-tax-calculator' },
              { state: 'Washington', rate: '0% state income tax', href: '/washington-tax-calculator' },
              { state: 'Pennsylvania', rate: '3.07% flat tax', href: '/pennsylvania-tax-calculator' },
              { state: 'Ohio', rate: '0%–3.5% progressive', href: '/ohio-tax-calculator' },
              { state: 'New Jersey', rate: '1.4%–10.75% progressive', href: '/new-jersey-tax-calculator' },
            ].map((item) => (
              <Link
                key={item.state}
                href={item.href}
                className="flex items-center justify-between rounded-lg bg-muted/20 p-3 hover:bg-muted/30 transition-colors group"
              >
                <span className="font-medium text-foreground group-hover:text-emerald-400 transition-colors">
                  {item.state}
                </span>
                <span className="text-xs text-muted-foreground">{item.rate}</span>
              </Link>
            ))}
          </div>
          <p className="mt-2">
            We now cover all 50 states with dedicated income tax calculators — from zero-income-tax states
            (TX, FL, WA, NV, WY, AK, SD, NH, TN) to the highest-tax states in the
            country (CA, NY), with flat-tax states (IL, CO, IN, PA) and progressive states across the country.
            Plus, our <Link href="/sales-tax-calculator" className="text-emerald-400 hover:text-emerald-300 underline">Sales Tax Calculator</Link> covers
            all 50 states with combined state + local rates.
          </p>
          <p>
            Beyond state calculators, we also built tools for{' '}
            <Link href="/mortgage-calculator" className="text-emerald-400 hover:text-emerald-300 underline">mortgage amortization</Link>{' '}
            (with an extra payments feature that shows exactly how much interest you can save),{' '}
            <Link href="/401k-retirement-calculator" className="text-emerald-400 hover:text-emerald-300 underline">401(k) retirement projections</Link>,{' '}
            <Link href="/capital-gains-calculator" className="text-emerald-400 hover:text-emerald-300 underline">capital gains tax estimation</Link>,{' '}
            <Link href="/self-employment-tax-calculator" className="text-emerald-400 hover:text-emerald-300 underline">self-employment tax calculations</Link>, and a{' '}
            <Link href="/relocation-calculator" className="text-emerald-400 hover:text-emerald-300 underline">relocation calculator</Link>{' '}
            that answers the question: &ldquo;How much would I need to earn in State B to match my
            take-home pay in State A?&rdquo;
          </p>
        </div>
      </section>

      {/* Tax Data Accuracy */}
      <section className="mb-12 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-8">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle2 className="h-6 w-6 text-emerald-400" />
          <h2 className="text-2xl font-bold text-foreground">Our Tax Data</h2>
        </div>
        <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
          <p>
            We take accuracy seriously — not because we&apos;re perfectionists (okay, maybe a little),
            but because people make real financial decisions based on these numbers. Here&apos;s what
            our calculators use for the 2026 tax year:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>2026 Federal income tax brackets (10% through 37%)</li>
            <li>2026 Standard deductions by filing status</li>
            <li>FICA rates: Social Security (6.2%) + Medicare (1.45%)</li>
            <li>2026 Social Security wage cap: $184,500</li>
            <li>Additional Medicare Tax: 0.9% above $200,000</li>
            <li>State-specific tax rates and exemptions for IL, TX, FL, CA, NY</li>
            <li>2026 401(k) contribution limits ($23,500 + catch-up)</li>
          </ul>
          <p className="text-xs mt-2">
            That said, our tools produce estimates. We can&apos;t account for every possible deduction,
            credit, or special circumstance in your life. If you&apos;re making a major financial
            decision, talk to a CPA — our calculators are a starting point, not the final word.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mb-12 rounded-xl border border-border/30 bg-card/50 p-8 text-center">
        <Mail className="h-8 w-8 text-emerald-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-3">Get in Touch</h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Found a bug? Think our Illinois math is off? Want your state added? We actually
          read every email. Seriously.
        </p>
        <div className="rounded-lg bg-muted/30 p-4 inline-block">
          <p className="text-sm text-muted-foreground">
            Email: <ProtectedEmail code="contact|thetaxcalc.com" />
          </p>
        </div>
      </section>

      {/* How We Verify Our Tax Data */}
      <section className="mb-12 rounded-xl border border-border/30 bg-card/50 p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
            <ClipboardCheck className="h-5 w-5 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">How We Verify Our Numbers</h2>
        </div>
        <div className="text-muted-foreground leading-relaxed space-y-4">
          <p>
            We&apos;ve caught mistakes on other tax calculator sites — brackets that were a year out
            of date, standard deductions that didn&apos;t reflect the latest IRS updates, state rates
            pulled from Wikipedia instead of the actual revenue department. We didn&apos;t want to be
            that site. So here&apos;s our process:
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-muted/20 p-4">
              <h3 className="text-sm font-semibold text-foreground mb-2">Go Straight to the Source</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Federal brackets come from{' '}
                <a href="https://www.irs.gov/publications/p15" target="_blank" rel="noopener noreferrer nofollow" className="text-emerald-400 hover:text-emerald-300 underline">IRS Publication 15</a>{' '}
                (Employer&apos;s Tax Guide) and{' '}
                <a href="https://www.irs.gov/publications/p15t" target="_blank" rel="noopener noreferrer nofollow" className="text-emerald-400 hover:text-emerald-300 underline">Publication 15-T</a>.
                Not a blog post summarizing them — the actual IRS documents.
                State rates come from each state&apos;s Department of Revenue directly. Illinois?{' '}
                <a href="https://revenue.illinois.gov/" target="_blank" rel="noopener noreferrer nofollow" className="text-emerald-400 hover:text-emerald-300 underline">IDOR</a>.
                California?{' '}
                <a href="https://www.ftb.ca.gov/forms" target="_blank" rel="noopener noreferrer nofollow" className="text-emerald-400 hover:text-emerald-300 underline">FTB</a>.
                New York?{' '}
                <a href="https://www.tax.ny.gov/" target="_blank" rel="noopener noreferrer nofollow" className="text-emerald-400 hover:text-emerald-300 underline">NYS Department of Taxation and Finance</a>.
              </p>
            </div>
            <div className="rounded-lg bg-muted/20 p-4">
              <h3 className="text-sm font-semibold text-foreground mb-2">Cross-Check Everything</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We don&apos;t trust a single source. Every data point is verified against at least
                two independent references. Federal brackets get checked against both IRS
                publications and Congressional records. State rates are validated against official
                publications and reputable tax reference services. If there&apos;s a discrepancy,
                we dig until we find the authoritative answer.
              </p>
            </div>
            <div className="rounded-lg bg-muted/20 p-4">
              <h3 className="text-sm font-semibold text-foreground mb-2">Update Early, Not Late</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                As soon as the IRS or a state revenue department publishes new figures (usually
                late Q4 or early Q1), we incorporate them. We&apos;d rather be early with the right
                numbers than wait and serve you last year&apos;s brackets. If you ever spot something
                that looks off, let us know — we&apos;ll investigate immediately.
              </p>
            </div>
            <div className="rounded-lg bg-muted/20 p-4">
              <h3 className="text-sm font-semibold text-foreground mb-2">Professional Review</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Every calculation methodology gets reviewed by tax professionals before it goes
                live. They check that our bracket logic, deduction rules, and FICA calculations
                follow current tax law. And when we find an error — it happens, we&apos;re human —
                we fix it and document what changed. No quiet corrections.
              </p>
            </div>
          </div>
          <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4 mt-2">
            <p className="text-sm text-amber-200/90 leading-relaxed">
              <strong className="text-amber-300">One more thing:</strong> TheTaxCalc gives you
              estimates, not tax advice. Our tools don&apos;t replace a CPA who knows your specific
              situation inside and out. Use us to plan and estimate — then talk to a professional
              when it&apos;s time to actually file.
            </p>
          </div>
        </div>
      </section>

      {/* Our Team & Expertise */}
      <section className="mb-12 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
            <Users className="h-5 w-5 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Who&apos;s Behind This</h2>
        </div>
        <div className="text-muted-foreground leading-relaxed space-y-4">
          <p>
            TheTaxCalc is a small team of financial professionals and software engineers who got
            together because we shared one frustration: tax tools shouldn&apos;t be this hard to use.
            Some of us have backgrounds in accounting and financial planning. Others are engineers
            who&apos;ve spent years building user-facing products. The combination works — we argue
            about tax brackets and UX in equal measure.
          </p>
          <p>
            What we don&apos;t do is cut corners on the math. Every calculator goes through a review
            process where someone who actually understands the tax code checks the logic. Not just
            &ldquo;does it compile?&rdquo; — but &ldquo;does this correctly apply the Illinois
            personal exemption?&rdquo; and &ldquo;are we handling the NYC tax threshold right?&rdquo;
          </p>
          <p>
            And when we mess up? We fix it fast and tell you about it. We&apos;d rather earn your
            trust with honesty than pretend we&apos;re infallible.
          </p>
          <div className="flex items-center gap-2 text-sm text-emerald-400 mt-2">
            <CheckCircle2 className="h-4 w-4" />
            <span>Last reviewed: January 2026</span>
          </div>
        </div>
      </section>

      {/* ─── Our Tax Experts (E-E-A-T) ──────────────────────────── */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
            <ClipboardCheck className="h-5 w-5 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Our Tax Experts</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Every calculator and article on TheTaxCalc is written and reviewed by credentialed
          tax professionals. Their expertise covers the full range of topics our calculators
          address — from federal income tax and FICA to self-employment, retirement planning,
          and capital gains.
        </p>
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
          {Object.values(AUTHORS).map((author) => (
            <div
              key={author.id}
              id={author.id}
              className="scroll-mt-24 rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-card/80 p-6"
            >
              {/* Avatar */}
              {author.image ? (
                <img
                  src={author.image}
                  alt={`${author.name}, ${author.credentials} — ${author.title}`}
                  width={56}
                  height={56}
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-emerald-500/30 mb-4"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-base font-bold text-emerald-400 ring-2 ring-emerald-500/30 mb-4">
                  {author.name.split(' ').map((n) => n[0]).join('')}
                </div>
              )}
              {/* Name & Credentials */}
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 className="text-lg font-semibold text-foreground">{author.name}</h3>
                <span className="inline-flex items-center rounded-md bg-emerald-500/15 px-2 py-0.5 text-xs font-semibold text-emerald-400 ring-1 ring-emerald-500/25">
                  {author.credentials}
                </span>
              </div>
              {/* Title */}
              <p className="text-sm text-muted-foreground mb-3">
                {author.title}, TheTaxCalc
              </p>
              {/* Bio */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {author.bio}
              </p>
              {/* Specialties */}
              <div className="flex flex-wrap gap-1.5">
                {author.knowsAbout.slice(0, 4).map((topic) => (
                  <span
                    key={topic}
                    className="inline-flex items-center rounded-md bg-muted/30 px-2 py-0.5 text-[11px] text-muted-foreground"
                  >
                    {topic}
                  </span>
                ))}
              </div>
              {/* LinkedIn */}
              {author.sameAs[0] && (
                <a
                  href={author.sameAs[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn Profile
                </a>
              )}
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          All tax data and calculation methodologies on TheTaxCalc are reviewed by our expert team
          and verified against official IRS publications and state revenue department sources.
        </p>
      </section>

      {/* ─── Editorial Policy & E-E-A-T ───────────────────────────── */}
      <section className="mb-12 rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-card/80 p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
            <Shield className="h-5 w-5 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Editorial Policy &amp; Trust</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-6">
          TheTaxCalc follows strict editorial standards because tax information directly impacts your
          financial decisions. Our content is created and reviewed under a formal editorial process
          that meets Google&apos;s E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)
          guidelines for Your-Money-Or-Your-Life (YMYL) content.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Author Credentials */}
          <div className="rounded-lg border border-border/30 bg-card/50 p-5">
            <div className="flex items-center gap-2 mb-3">
              <ClipboardCheck className="h-5 w-5 text-emerald-400" />
              <h3 className="text-base font-semibold text-foreground">Credentialed Experts Only</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Every calculator, guide, and FAQ is authored or reviewed by a credentialed tax
              professional — a CPA (Certified Public Accountant), EA (IRS Enrolled Agent), or
              CFP® (Certified Financial Planner). We do not publish anonymous content under
              generic bylines like &ldquo;TheTaxCalc Team.&rdquo; Every page links to a named
              author with a verifiable LinkedIn profile, professional credentials, and a
              transparent bio on this page.
            </p>
          </div>

          {/* Review Process */}
          <div className="rounded-lg border border-border/30 bg-card/50 p-5">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              <h3 className="text-base font-semibold text-foreground">Two-Person Review Process</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Every page goes through a two-person review: the author writes and tests the
              calculator logic, then a second credentialed reviewer independently verifies the
              math, the tax bracket application, and the methodology. Disagreements are resolved
              by consulting primary sources (IRS publications, state revenue department websites)
              before publication.
            </p>
          </div>

          {/* Source Verification */}
          <div className="rounded-lg border border-border/30 bg-card/50 p-5">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="h-5 w-5 text-emerald-400" />
              <h3 className="text-base font-semibold text-foreground">Primary Source Verification</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We cite official sources for every tax figure: IRS Publication 15-T for federal
              withholding, IRS Rev. Proc. 2025-25 for 2026 inflation adjustments, state revenue
              department publications for state-specific rules, and the Social Security
              Administration for the annual wage base. Outdated or broken links are reviewed
              quarterly.
            </p>
          </div>

          {/* Update Frequency */}
          <div className="rounded-lg border border-border/30 bg-card/50 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="h-5 w-5 text-emerald-400" />
              <h3 className="text-base font-semibold text-foreground">Annual Update Cycle</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Tax brackets, standard deductions, FICA rates, and state tax rules are updated
              annually as soon as the IRS and state revenue departments publish new figures —
              usually in October–December for the upcoming tax year. Each page displays a
              &ldquo;Last reviewed&rdquo; date so you know exactly when the content was last
              verified. Mid-year legislative changes (like the 2025 overtime tax exemption) are
              published within 30 days of IRS guidance.
            </p>
          </div>

          {/* Corrections Policy */}
          <div className="rounded-lg border border-border/30 bg-card/50 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="h-5 w-5 text-emerald-400" />
              <h3 className="text-base font-semibold text-foreground">Corrections Policy</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              If we make a mistake, we fix it — fast and visibly. Reported errors in calculation
              logic are investigated within 48 hours. Confirmed errors are corrected, the page
              is republished with an updated review date, and a note explaining the change is
              added to our methodology page. We do not silently edit content after publication
              without disclosure.
            </p>
          </div>

          {/* Conflict of Interest */}
          <div className="rounded-lg border border-border/30 bg-card/50 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-5 w-5 text-emerald-400" />
              <h3 className="text-base font-semibold text-foreground">Conflict of Interest Policy</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              TheTaxCalc does not accept paid placements, sponsored calculator recommendations,
              or affiliate commissions from tax-preparation software companies. Our recommendations
              are based solely on what we believe serves the user. We display ads (Google AdSense)
              clearly labeled as advertising, separate from editorial content.
            </p>
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="h-3 w-3" /> CPA-Reviewed
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="h-3 w-3" /> E-E-A-T Compliant
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="h-3 w-3" /> IRS Source-Verified
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="h-3 w-3" /> Updated for Tax Year 2026
          </span>
        </div>
      </section>

      {/* ─── Authorship & Review Statement ──────────────────────────── */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
            <ClipboardCheck className="h-5 w-5 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Authorship &amp; Review Statement</h2>
        </div>
        <div className="rounded-xl border border-border/30 bg-card/50 p-6 space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>
            <strong className="text-foreground">Tax Calculator Pages:</strong> Authored by Rachel
            Mitchell, CPA (Lead Tax Analyst &amp; Editorial Director). Calculation logic independently
            reviewed by David Chen, EA (Tax Research Director). Last comprehensive review: January 2026.
          </p>
          <p>
            <strong className="text-foreground">Self-Employment &amp; 1099 Content:</strong> Authored
            by David Chen, EA. Reviewed by Rachel Mitchell, CPA. This content covers SE tax calculations,
            quarterly estimated payments, and independent contractor tax rules — areas where David&apos;s
            15+ years of IRS representation experience directly applies.
          </p>
          <p>
            <strong className="text-foreground">Retirement &amp; Investment Content:</strong> Authored
            by Sarah Johnson, CFP®. Reviewed by Rachel Mitchell, CPA. This includes 401(k) calculators,
            capital gains tax guides, and retirement planning articles.
          </p>
          <p>
            <strong className="text-foreground">State Tax Pages:</strong> Authored by Rachel Mitchell,
            CPA, with state-specific review by our editorial team. Each state&apos;s brackets, deductions,
            and credits are verified against that state&apos;s revenue department publication.
          </p>
          <p>
            <strong className="text-foreground">Blog Articles &amp; Guides:</strong> Authored by the
            credentialed expert most relevant to the topic. Every article displays the author&apos;s
            name, credentials, and review date at the top of the page.
          </p>
          <p className="text-xs italic text-muted-foreground/80 pt-2 border-t border-border/20">
            TheTaxCalc content is for informational and planning purposes only. It is not tax, legal,
            or financial advice. For advice specific to your situation, consult a qualified CPA, EA,
            or financial advisor.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
            <BookOpen className="h-5 w-5 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Questions People Actually Ask Us</h2>
        </div>
        <div className="space-y-3">
          {[
            {
              q: 'Is TheTaxCalc really free? What\'s the catch?',
              a: 'No catch. We know that sounds suspicious — "free" usually means "you\'re the product." But because all calculations run in your browser and we don\'t store any of your data, our server costs are minimal. No premium tiers, no paywalls, no "unlock full results for $9.99." Just free calculators.',
            },
            {
              q: 'How accurate are the calculations?',
              a: 'We use the same data the IRS and state revenue departments publish — the 2026 brackets, standard deductions, FICA rates, the works. Every methodology is reviewed by tax professionals. But here\'s the honest answer: our tools give you solid estimates, not guarantees. Your actual tax depends on things we can\'t know — itemized deductions, credits, multiple income sources, life changes mid-year. For planning purposes, we\'re great. For filing your actual return? Talk to a CPA.',
            },
            {
              q: 'Does TheTaxCalc store my salary or financial data?',
              a: 'Nope. When you type your salary into one of our calculators, that number stays in your browser. It never gets sent to our servers. We don\'t have accounts, we don\'t use tracking cookies on calculations, and we couldn\'t tie your data to you even if we wanted to — because we never see it.',
            },
            {
              q: 'Do you cover all 50 states?',
              a: 'Yes. We cover all 50 states with dedicated income tax calculators — from zero-income-tax states (TX, FL, WA, NV, WY, AK, SD, NH, TN) to the highest-tax states (CA, NY), plus flat-tax states (IL, CO, IN, PA, MI, MA) and progressive states across the country. Each state has its own calculator with dedicated brackets, exemptions, property tax data, and retirement considerations. We also cover all 50 states for sales tax calculations.',
            },
            {
              q: 'When do you update tax brackets?',
              a: 'As soon as the IRS and state revenue departments publish new figures — usually late Q4 or early Q1. We don\'t wait for tax season to start. If the IRS releases updated brackets in November, our calculators reflect them in November. Our 2026 data is current as of January 2026.',
            },
            {
              q: 'Can I use this to file my taxes?',
              a: 'Please don\'t. Our calculators are for estimation and planning — figuring out if that job offer in Florida really means more take-home pay, or how much you\'d save with extra mortgage payments. When it\'s time to actually file, use real tax preparation software or work with a CPA who knows your situation. We\'re a starting point, not a substitute.',
            },
          ].map((faq, i) => (
            <details
              key={i}
              className="group rounded-xl border border-border/30 bg-card/50 overflow-hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-3 p-5 text-left font-medium text-foreground hover:bg-muted/10 transition-colors">
                <h3 className="text-sm sm:text-base">{faq.q}</h3>
                <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Related Tools & Resources */}
      <section className="mb-12 border-t border-border/20 pt-10">
        <h2 className="text-lg font-bold text-foreground mb-6">About TheTaxCalc — Resources</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Calculators */}
          <div className="rounded-xl border border-border/30 bg-card/50 p-5">
            <h3 className="text-base font-semibold text-foreground mb-3">Tax Calculators</h3>
            <div className="space-y-2">
              {[
                { href: '/paycheck-calculator', label: 'Paycheck Calculator' },
                { href: '/illinois-tax-calculator', label: 'Illinois (4.95% flat)' },
                { href: '/texas-tax-calculator', label: 'Texas (0% income tax)' },
                { href: '/florida-tax-calculator', label: 'Florida (0% income tax)' },
                { href: '/california-tax-calculator', label: 'California (1%–13.3%)' },
                { href: '/new-york-tax-calculator', label: 'New York (4%–10.9%)' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-emerald-400 transition-colors"
                >
                  <span className="h-1 w-1 rounded-full bg-emerald-500/40 shrink-0 group-hover:bg-emerald-400 transition-colors" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Salary & Resources */}
          <div className="rounded-xl border border-border/30 bg-card/50 p-5">
            <h3 className="text-base font-semibold text-foreground mb-3">Salary After Tax</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { href: '/salary/50000', label: '$50K' },
                { href: '/salary/75000', label: '$75K' },
                { href: '/salary/100000', label: '$100K' },
                { href: '/salary/150000', label: '$150K' },
              ].map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="inline-flex items-center rounded-lg border border-border/50 bg-muted/20 px-3 py-1.5 text-xs font-medium text-foreground hover:border-emerald-500/30 hover:text-emerald-400 transition-all"
                >
                  {s.label}
                </Link>
              ))}
            </div>
            <div className="mt-3 space-y-2">
              <Link href="/salary" className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-emerald-400 transition-colors">
                <span className="h-1 w-1 rounded-full bg-emerald-500/40 shrink-0 group-hover:bg-emerald-400 transition-colors" />
                All Salary Levels
              </Link>
              <Link href="/compare" className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-emerald-400 transition-colors">
                <span className="h-1 w-1 rounded-full bg-emerald-500/40 shrink-0 group-hover:bg-emerald-400 transition-colors" />
                Compare State Taxes
              </Link>
            </div>
          </div>

          {/* Guides & More */}
          <div className="rounded-xl border border-border/30 bg-card/50 p-5">
            <h3 className="text-base font-semibold text-foreground mb-3">Guides & More</h3>
            <div className="space-y-2">
              {[
                { href: '/federal-tax-brackets', label: '2026 Federal Tax Brackets' },
                { href: '/mortgage-calculator', label: 'Mortgage Calculator' },
                { href: '/401k-retirement-calculator', label: '401(k) Retirement Calculator' },
                { href: '/capital-gains-calculator', label: 'Capital Gains Calculator' },
                { href: '/self-employment-tax-calculator', label: 'Self-Employment Tax' },
                { href: '/glossary', label: 'Tax Glossary' },
                { href: '/blog', label: 'Blog' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-emerald-400 transition-colors"
                >
                  <span className="h-1 w-1 rounded-full bg-emerald-500/40 shrink-0 group-hover:bg-emerald-400 transition-colors" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="text-center">
        <Link
          href="/paycheck-calculator"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all hover:scale-[1.02]"
        >
          <DollarSign className="h-5 w-5" />
          Try Our Paycheck Calculator
        </Link>
      </div>
    </div>
  );
}
