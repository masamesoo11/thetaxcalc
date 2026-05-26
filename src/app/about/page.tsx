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

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about TaxYield.io — our mission to provide free, accurate tax calculators for every American. We help you understand your take-home pay after federal, FICA, and state taxes.',
  alternates: {
    canonical: 'https://taxyield.io/about',
  },
};

const VALUES = [
  {
    icon: Shield,
    title: 'Accuracy First',
    desc: 'Every calculation uses the latest IRS and state tax data. We update our brackets and rates as soon as they are published.',
  },
  {
    icon: Zap,
    title: '100% Free',
    desc: 'No sign-up, no paywall, no hidden fees. Every calculator is completely free to use, now and always.',
  },
  {
    icon: Globe,
    title: 'Privacy by Design',
    desc: 'All calculations happen in your browser. Your financial data never leaves your device — we never see it, store it, or sell it.',
  },
  {
    icon: Heart,
    title: 'Built for Everyone',
    desc: 'Whether you are a W-2 employee, self-employed freelancer, or planning a move — our tools work for you.',
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
          TaxYield.io was created with a simple mission: make it easy for every American to understand
          their taxes and take-home pay — without paying a dime or giving up their privacy.
        </p>
      </div>

      {/* Mission */}
      <section className="mb-12 rounded-xl border border-border/30 bg-card/50 p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
            <Target className="h-5 w-5 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
        </div>
        <div className="text-muted-foreground leading-relaxed space-y-4">
          <p>
            Understanding your paycheck shouldn&apos;t require a degree in accounting. Yet millions of
            Americans are unsure how much they actually take home after federal taxes, FICA contributions,
            and state income taxes.
          </p>
          <p>
            We built TaxYield.io to change that. Our 11 free calculators cover everything from
            basic paycheck estimation to mortgage amortization, capital gains, self-employment taxes,
            and state-by-state relocation comparisons. All updated for the 2026 tax year.
          </p>
          <p>
            What makes us different? <strong className="text-foreground">Your data stays on your device.</strong>{' '}
            Unlike many financial tools that store your salary and tax information on their servers,
            all TaxYield.io calculations run entirely in your browser. We never see, store, or sell
            your financial data.
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
            We currently cover federal taxes plus five state tax profiles:
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
            Our 11 calculators also include paycheck estimation, mortgage amortization, 401(k) retirement
            projection, capital gains tax, self-employment tax, and relocation comparisons.
          </p>
        </div>
      </section>

      {/* Tax Data Accuracy */}
      <section className="mb-12 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-8">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle2 className="h-6 w-6 text-emerald-400" />
          <h2 className="text-2xl font-bold text-foreground">Tax Data Accuracy</h2>
        </div>
        <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
          <p>
            All TaxYield.io calculators use the latest published tax data for the 2026 tax year, including:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>2026 Federal income tax brackets (10% through 37%)</li>
            <li>2026 Standard deductions by filing status</li>
            <li>FICA rates: Social Security (6.2%) + Medicare (1.45%)</li>
            <li>2026 Social Security wage cap: $176,100</li>
            <li>Additional Medicare Tax: 0.9% above $200,000</li>
            <li>State-specific tax rates and exemptions for IL, TX, FL, CA, NY</li>
            <li>2026 401(k) contribution limits</li>
          </ul>
          <p className="text-xs mt-2">
            Note: TaxYield.io provides estimates for informational purposes only. Always consult a
            qualified tax professional for advice specific to your situation.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="mb-12 rounded-xl border border-border/30 bg-card/50 p-8 text-center">
        <Mail className="h-8 w-8 text-emerald-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-3">Get in Touch</h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Have questions, suggestions, or found an error in our calculations? We would love to hear from you.
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
          <h2 className="text-2xl font-bold text-foreground">How We Verify Our Tax Data</h2>
        </div>
        <div className="text-muted-foreground leading-relaxed space-y-4">
          <p>
            Accuracy is the cornerstone of every calculator on TaxYield.io. We follow a rigorous
            multi-step verification process to ensure the numbers you see reflect the most current
            tax regulations available.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-muted/20 p-4">
              <h3 className="text-sm font-semibold text-foreground mb-2">IRS Publications</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our federal tax brackets, standard deductions, and FICA rates are sourced directly
                from IRS Publication 15 (Employer&apos;s Tax Guide) and Publication 15-T (Federal
                Income Tax Withholding Methods). These are the official documents the IRS publishes
                each year to govern employer withholding.
              </p>
            </div>
            <div className="rounded-lg bg-muted/20 p-4">
              <h3 className="text-sm font-semibold text-foreground mb-2">State Revenue Departments</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                State income tax rates, brackets, and exemptions are pulled from each state&apos;s
                Department of Revenue or equivalent agency. For example, Illinois rates come from
                the Illinois Department of Revenue, California rates from the FTB, and New York
                rates from the NYS Department of Taxation and Finance.
              </p>
            </div>
            <div className="rounded-lg bg-muted/20 p-4">
              <h3 className="text-sm font-semibold text-foreground mb-2">Annual Update Cycle</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We update our tax data annually as soon as new brackets and rates are published —
                typically in late Q4 or early Q1. When the IRS or a state revenue department publishes
                revised figures, we incorporate them before the new tax year begins so you always
                calculate with current numbers.
              </p>
            </div>
            <div className="rounded-lg bg-muted/20 p-4">
              <h3 className="text-sm font-semibold text-foreground mb-2">Cross-Verification</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Every data point is cross-verified against at least two independent sources.
                Federal brackets are checked against both IRS publications and Congressional
                records. State rates are validated against official state publications and
                reputable tax reference services before being published on our site.
              </p>
            </div>
          </div>
          <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4 mt-2">
            <p className="text-sm text-amber-200/90 leading-relaxed">
              <strong className="text-amber-300">Disclaimer:</strong> TaxYield.io provides estimates
              for informational and educational purposes only. Our calculations do not account for
              every possible deduction, credit, or special circumstance. Always consult a qualified
              tax professional or CPA for advice specific to your financial situation.
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
          <h2 className="text-2xl font-bold text-foreground">Our Team & Expertise</h2>
        </div>
        <div className="text-muted-foreground leading-relaxed space-y-4">
          <p>
            TaxYield.io is maintained by a team of financial professionals and software engineers who
            share a common goal: making tax calculations accessible, accurate, and transparent for
            everyone. Our team brings together expertise from both the financial world and modern
            software development to build tools that are reliable and easy to use.
          </p>
          <p>
            Every calculation methodology on TaxYield.io is reviewed by tax professionals before
            being published. Our reviewers verify that bracket logic, deduction rules, FICA
            calculations, and state-specific provisions are implemented correctly according to
            current tax law. This professional review process helps ensure that the estimates we
            provide are as accurate as possible.
          </p>
          <p>
            We also believe in transparency. When our data changes or when we discover an error,
            we update the site promptly and document what changed. Our commitment to accuracy is
            ongoing — not just a one-time effort at the start of each tax year.
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
          <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-3">
          {[
            {
              q: 'Is TaxYield.io really free?',
              a: 'Yes — completely free. There are no sign-ups, no paywalls, no premium tiers, and no hidden fees. Every calculator, comparison tool, and resource on TaxYield.io is available at no cost. We believe understanding your taxes should never come with a price tag.',
            },
            {
              q: 'How accurate are the calculations?',
              a: 'Our calculations use the latest published IRS and state tax data, and every methodology is reviewed by tax professionals. However, our tools produce estimates — they do not account for every possible deduction, credit, or special circumstance. For tax filing advice tailored to your situation, we recommend consulting a qualified CPA or tax professional.',
            },
            {
              q: 'Does TaxYield.io store my financial data?',
              a: 'No. All calculations happen entirely in your browser. Your salary, filing status, and other inputs never leave your device. We do not collect, store, or sell any personal financial data. There are no accounts to create and no cookies tracking your calculations.',
            },
            {
              q: 'Which states do you cover?',
              a: 'We currently cover five states in depth: Illinois, Texas, Florida, California, and New York. Each state has its own dedicated tax calculator with state-specific brackets, deductions, and exemptions. We also offer side-by-side comparisons for all ten possible state pairs.',
            },
            {
              q: 'When are tax brackets updated?',
              a: 'We update our tax brackets and rates annually, typically in late Q4 or early Q1, as soon as the IRS and state revenue departments publish new figures. Our 2026 data reflects the most current published brackets, standard deductions, and FICA rates available.',
            },
            {
              q: 'Can I use this for tax filing?',
              a: 'TaxYield.io is designed for estimation and planning purposes — not for filing your taxes. While our calculations are based on official IRS and state data, they do not replace professional tax preparation software or the advice of a qualified CPA. Use our tools to estimate your take-home pay and plan ahead, then consult a professional when it is time to file.',
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
