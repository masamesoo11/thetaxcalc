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

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about TaxYield.io — our mission to provide free, accurate tax calculators for every American. We help you understand your take-home pay after federal, FICA, and state taxes.',
  keywords: ['about taxyield', 'tax calculator about', 'tax tool mission', 'free tax calculator', 'tax data accuracy', 'tax calculator team'],
  alternates: {
    canonical: 'https://taxyield.io/about',
    languages: {
      'en-US': 'https://taxyield.io/about',
      'x-default': 'https://taxyield.io/about',
    },
  },
  openGraph: {
    title: 'About TaxYield.io',
    description:
      'Learn about TaxYield.io — our mission to provide free, accurate tax calculators for every American.',
    url: 'https://taxyield.io/about',
    siteName: 'TaxYield.io',
    type: 'website',
    locale: 'en_US',
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'TaxYield.io',
      url: 'https://taxyield.io',
      logo: 'https://taxyield.io/opengraph-image',
      description: 'Free tax calculators and guides to help you understand your paycheck, state taxes, and financial planning.',
      foundingDate: '2022',
      sameAs: [],
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'contact@taxyield.io',
        contactType: 'customer support',
      },
    },
    {
      '@type': 'AboutPage',
      name: 'About TaxYield.io',
      description: 'Learn about TaxYield.io — our mission to provide free, accurate tax calculators for every American.',
      url: 'https://taxyield.io/about',
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
    desc: "No sign-up wall. No 'premium tier.' No sneaky upsell after three calculations. We built TaxYield.io because we believe understanding your own paycheck shouldn't cost you a dime. A friend of ours actually paid $15 to a tax calculator site before realizing it was just going to show him the same math he could've done himself. That's the kind of thing that made us want to build this. That's not changing.",
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
  { value: '11', label: 'Free Calculators', icon: Calculator },
  { value: '5', label: 'State Profiles', icon: Globe },
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
          About TaxYield.io
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Free <span className="gradient-text">Tax Calculators</span>
          <br />
          Built for You
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          We built TaxYield.io because we were tired of tax calculators that felt like they were
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
            TaxYield.io started as a weekend project — a single paycheck calculator that actually
            used current tax data and didn&apos;t try to sell you anything. It turns out a lot of people
            wanted exactly that. Today we have 11 calculators covering paycheck estimation, mortgage
            amortization, 401(k) projections, capital gains, self-employment taxes, and side-by-side
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
            Let&apos;s be honest — we don&apos;t cover all 50 states yet. We&apos;d love to, but we&apos;d
            rather do five states really well than fifty states poorly. Each state profile
            includes not just the income tax rate, but property tax context, sales tax data,
            and retirement-friendliness notes. We currently cover:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { state: 'Illinois', rate: '4.95% flat tax', href: '/illinois-tax-calculator' },
              { state: 'Texas', rate: '0% state income tax', href: '/texas-tax-calculator' },
              { state: 'Florida', rate: '0% state income tax', href: '/florida-tax-calculator' },
              { state: 'California', rate: '1%–13.3% progressive', href: '/california-tax-calculator' },
              { state: 'New York', rate: '4%–10.9% + NYC tax', href: '/new-york-tax-calculator' },
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
            We picked these five for a reason — they represent the full spectrum of state tax
            situations, from zero-income-tax states (TX, FL) to the highest-tax states in the
            country (CA, NY), with a flat-tax state (IL) in between. If your state isn&apos;t here
            yet, <Link href="mailto:contact@taxyield.io" className="text-emerald-400 hover:text-emerald-300 underline">drop us a line</Link> and
            we&apos;ll prioritize it.
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
            <li>2026 Social Security wage cap: $176,100</li>
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
      <section className="mb-12 rounded-xl border border-border/30 bg-card/50 p-8 text-center">
        <Mail className="h-8 w-8 text-emerald-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-3">Get in Touch</h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Found a bug? Think our Illinois math is off? Want your state added? We actually
          read every email. Seriously.
        </p>
        <div className="rounded-lg bg-muted/30 p-4 inline-block">
          <p className="text-sm text-muted-foreground">
            Email: <span className="text-emerald-400">contact@taxyield.io</span>
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
                <a href="https://www.irs.gov/publications/p15" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 underline">IRS Publication 15</a>{' '}
                (Employer&apos;s Tax Guide) and{' '}
                <a href="https://www.irs.gov/publications/p15t" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 underline">Publication 15-T</a>.
                Not a blog post summarizing them — the actual IRS documents.
                State rates come from each state&apos;s Department of Revenue directly. Illinois?{' '}
                <a href="https://www2.illinois.gov/rev/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 underline">IDOR</a>.
                California?{' '}
                <a href="https://www.ftb.ca.gov/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 underline">FTB</a>.
                New York?{' '}
                <a href="https://www.tax.ny.gov/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 underline">NYS Department of Taxation and Finance</a>.
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
              <strong className="text-amber-300">One more thing:</strong> TaxYield.io gives you
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
            TaxYield.io is a small team of financial professionals and software engineers who got
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
              q: 'Is TaxYield.io really free? What\'s the catch?',
              a: 'No catch. We know that sounds suspicious — "free" usually means "you\'re the product." But because all calculations run in your browser and we don\'t store any of your data, our server costs are minimal. No premium tiers, no paywalls, no "unlock full results for $9.99." Just free calculators.',
            },
            {
              q: 'How accurate are the calculations?',
              a: 'We use the same data the IRS and state revenue departments publish — the 2026 brackets, standard deductions, FICA rates, the works. Every methodology is reviewed by tax professionals. But here\'s the honest answer: our tools give you solid estimates, not guarantees. Your actual tax depends on things we can\'t know — itemized deductions, credits, multiple income sources, life changes mid-year. For planning purposes, we\'re great. For filing your actual return? Talk to a CPA.',
            },
            {
              q: 'Does TaxYield.io store my salary or financial data?',
              a: 'Nope. When you type your salary into one of our calculators, that number stays in your browser. It never gets sent to our servers. We don\'t have accounts, we don\'t use tracking cookies on calculations, and we couldn\'t tie your data to you even if we wanted to — because we never see it.',
            },
            {
              q: 'Why only five states?',
              a: 'We picked five states that represent the full range of tax situations in the US — from zero-income-tax states (TX, FL) to the highest-tax states (CA, NY), plus a flat-tax state (IL). Doing five states well means building each one with dedicated brackets, exemptions, property tax data, and retirement considerations. We\'d rather give you depth than a superficial calculator for all 50. More states are coming — if yours isn\'t here, tell us and we\'ll bump it up the list.',
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
