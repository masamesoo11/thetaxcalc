import { Metadata } from 'next';
import {
  Code2,
  Zap,
  Shield,
  Globe,
  ChevronDown,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  Users,
  Building2,
  Clock,
  Heart,
  Star,
} from 'lucide-react';
import Link from 'next/link';
import { Breadcrumb } from '@/components/finance/breadcrumb';
import { WidgetsGrid } from '@/components/finance/widgets-grid';
import { OutreachEmailTemplate } from '@/components/finance/outreach-email-template';
import { SITE_URL } from '@/lib/site-config';
import { getCalculatorAuthor, authorToJsonLd } from '@/lib/authors';
import { AuthorBioCard } from '@/components/finance/author-bio-card';

export const metadata: Metadata = {
  title: 'Free Tax Calculator Widgets — Embed on Your Site in 30 Seconds',
  description:
    'Add free tax calculator widgets to your website. Paycheck, mortgage, sales tax, and capital gains calculators. No signup, no cost — just copy & paste. Updated for 2026.',
  keywords: [
    'tax calculator widget',
    'embed tax calculator',
    'free widget',
    'paycheck calculator widget',
    'mortgage calculator widget',
    'sales tax widget',
    'capital gains widget',
    'self-employment tax widget',
    '401k calculator widget',
    'website widget',
    'embeddable calculator',
    'free tax widget for website',
    'tax calculator iframe',
    'embeddable tax tool',
    'accountant website widget',
    'HR payroll calculator widget',
    'job offer comparison widget',
    'salary comparison widget',
    'paycheck difference widget',
    'relocation calculator widget',
  ],
  authors: [{ name: 'Rachel Mitchell, CPA' }],
  alternates: {
    canonical: `${SITE_URL}/widgets`,
      'en-US': `${SITE_URL}/widgets`,
      'x-default': `${SITE_URL}/widgets`,
    },
  },
  openGraph: {
    title: 'Free Tax Calculator Widgets — Embed on Your Site in 30 Seconds',
    description:
      'Add free tax calculator widgets to your website. Paycheck, mortgage, sales tax, and capital gains calculators. No signup, no cost — just copy & paste.',
    url: `${SITE_URL}/widgets`,
    siteName: 'TheTaxCalc',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: `${SITE_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: 'Free Tax Calculator Widgets — TheTaxCalc',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Tax Calculator Widgets — Embed on Your Site in 30 Seconds',
    description:
      'Add free tax calculator widgets to your website. No signup, no cost — just copy & paste. Updated for 2026.',
    images: [`${SITE_URL}/opengraph-image.png`],
  },
};

const widgetsJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@id': `${SITE_URL}/widgets#software`,
      '@type': 'SoftwareApplication',
      name: 'TheTaxCalc Widgets',
      url: `${SITE_URL}/widgets`,
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: 0,
        priceCurrency: 'USD',
      },
      description:
        'Free embeddable tax calculator widgets for your website. Includes paycheck, mortgage, sales tax, capital gains, self-employment, and 401(k) calculators.',
      provider: { '@id': `${SITE_URL}/#organization` },
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@id': `${SITE_URL}/widgets#author`,
      ...authorToJsonLd(getCalculatorAuthor()),
    },
    {
      '@id': `${SITE_URL}/widgets#webpage`,
      '@type': 'WebPage',
      name: 'Tax Calculator Widgets',
      description:
        'Add free tax calculator widgets to your website. Embeddable paycheck, mortgage, sales tax, and capital gains calculators. No signup, no cost.',
      url: `${SITE_URL}/widgets`,
      dateModified: '2026-02-01',
      author: { '@id': `${SITE_URL}/widgets#author` },
      reviewedBy: { '@id': `${SITE_URL}/widgets#author` },
      publisher: { '@id': `${SITE_URL}/#organization` },
      breadcrumb: { '@id': `${SITE_URL}/widgets#breadcrumb` },
    },
    {
      '@id': `${SITE_URL}/widgets#breadcrumb`,
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Free Widgets' },
      ],
    },
    {
      '@id': `${SITE_URL}/widgets#faq`,
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Are the widgets really free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, 100% free. No signup, no premium tier, no hidden costs. You can embed any of our calculators on your website without paying anything.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do I need to sign up or create an account?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Just copy the embed code and paste it into your website. No registration, no API keys, no account required.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I embed a widget on my website?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Copy the iframe embed code from any widget card on this page and paste it into your website HTML. The calculator will appear inside the iframe with no additional setup.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I customize the widget size?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Each widget card has a "Customize size" option where you can adjust the width and height. Use 100% width for responsive layouts and set a height of at least 600px for best results.',
          },
        },
        {
          '@type': 'Question',
          name: 'Are the calculators always up to date?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. The embedded calculators pull from the same data as our main site, which is updated within 48 hours of IRS or state revenue department publications. 2026 tax brackets and rates are current.',
          },
        },
        {
          '@type': 'Question',
          name: 'Will the widget slow down my website?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The widgets load lazily and run entirely in the browser. No server calls are made from your page — the iframe loads our calculator, which does all math client-side. Impact on your page speed is minimal.',
          },
        },
      ],
    },
  ],
};

const BENEFITS = [
  {
    icon: Zap,
    title: 'Zero Setup',
    desc: 'Copy one line of code. That\'s it. No API keys, no registration, no configuration files.',
  },
  {
    icon: Shield,
    title: 'No Data Risk',
    desc: 'All calculations run in your visitors\' browsers. No data flows through your servers or ours.',
  },
  {
    icon: Globe,
    title: 'Always Current',
    desc: 'Calculators auto-update with the latest 2026 tax brackets. No maintenance on your end.',
  },
  {
    icon: Code2,
    title: 'Fully Responsive',
    desc: 'Widgets adapt to any screen size. Set width to 100% and they\'ll work on mobile, tablet, and desktop.',
  },
];

const FAQ_ITEMS = [
  {
    q: 'Are the widgets really free?',
    a: 'Yes, 100% free. No signup, no premium tier, no hidden costs. We built these calculators to help people understand their taxes, and letting other websites embed them helps more people find them. Everyone wins.',
  },
  {
    q: 'Do I need to sign up or create an account?',
    a: 'Nope. Just copy the embed code and paste it into your website. No registration, no API keys, no "verify your email" loop. The embed works immediately.',
  },
  {
    q: 'How do I embed a widget on my website?',
    a: 'Each widget card on this page has an embed code section. Click "Copy Code" to copy the iframe snippet, then paste it into your website\'s HTML where you want the calculator to appear. That\'s the entire process.',
  },
  {
    q: 'Can I customize the widget size and appearance?',
    a: 'Each widget card has a "Customize size" option where you can adjust the width and height. For responsive layouts, use width="100%" and set a minimum height of 600px. The widget inherits a dark theme that matches our site — the border-radius gives it a modern, rounded look.',
  },
  {
    q: 'Are the calculators always up to date with current tax law?',
    a: 'Yes. The embedded calculators pull from the same codebase as our main site. When we update the 2026 brackets (usually within 48 hours of IRS or state revenue department publications), your embedded widget automatically reflects those changes. No action needed on your part.',
  },
  {
    q: 'Will the widget slow down my website?',
    a: 'Minimal impact. The widgets load inside an iframe and run all calculations client-side in the visitor\'s browser. No server calls happen from your page. The iframe loads lazily by default, so it won\'t block your page from rendering.',
  },
  {
    q: 'Can I use multiple widgets on the same page?',
    a: 'Absolutely. Each widget is an independent iframe, so you can embed as many as you want on a single page without conflicts. Just make sure your page has enough vertical space for each widget.',
  },
  {
    q: 'Do I need to attribute or link back to TheTaxCalc?',
    a: 'Attribution is not required but always appreciated. If you find our widgets useful, a link back to thetaxcalc.com helps others discover these free tools. We\'ve provided ready-made link HTML in the "Link to Us" section below the widgets.',
  },
];

export default function WidgetsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(widgetsJsonLd) }}
      />

      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Free Widgets' }]} />

      {/* Hero Section */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 text-sm text-emerald-400 mb-6">
          <Code2 className="h-3.5 w-3.5" />
          Free Embeddable Widgets
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Free Tax Calculator{' '}
          <span className="gradient-text">Widgets</span>
          <br />
          for Your Website
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          Add professional tax calculators to your website in <strong className="text-foreground">30 seconds</strong> with a single line of code.
          No signup, no cost, no data risk. Updated for the 2026 tax year.
        </p>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            21+ free calculators
          </span>
          <span className="flex items-center gap-1.5">
            <Shield className="h-4 w-4 text-emerald-400" />
            No data collected
          </span>
          <span className="flex items-center gap-1.5">
            <Globe className="h-4 w-4 text-emerald-400" />
            All 50 states
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-emerald-400" />
            30-second setup
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          <Link
            href="#widgets"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all hover:scale-[1.02]"
          >
            <Code2 className="h-4 w-4" />
            Browse Widgets
          </Link>
          <Link
            href="#for-accountants"
            className="inline-flex items-center gap-2 rounded-xl border border-border/50 bg-card/50 px-6 py-3 text-sm font-medium text-foreground hover:border-emerald-500/30 hover:text-emerald-400 transition-all"
          >
            <Users className="h-4 w-4" />
            For Accountants
          </Link>
          <Link
            href="#link-to-us"
            className="inline-flex items-center gap-2 rounded-xl border border-border/50 bg-card/50 px-6 py-3 text-sm font-medium text-foreground hover:border-emerald-500/30 hover:text-emerald-400 transition-all"
          >
            <ExternalLink className="h-4 w-4" />
            Link to Us
          </Link>
        </div>
      </div>

      {/* Benefits */}
      <section className="mb-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="rounded-xl border border-border/30 bg-card/50 p-5 text-center"
              >
                <Icon className="h-5 w-5 text-emerald-400 mx-auto mb-2" />
                <h3 className="text-sm font-semibold text-foreground mb-1">{benefit.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{benefit.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works */}
      <section className="mb-12 rounded-xl border border-border/30 bg-card/50 p-8">
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
          How It <span className="gradient-text">Works</span>
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="text-center">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 font-bold text-lg mb-3">
              1
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1">Copy the Code</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Click &ldquo;Copy Code&rdquo; on any widget card below to copy the iframe embed snippet.
            </p>
          </div>
          <div className="text-center">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 font-bold text-lg mb-3">
              2
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1">Paste into Your Site</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Drop the iframe code into your HTML, CMS, or page builder where you want the calculator.
            </p>
          </div>
          <div className="text-center">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 font-bold text-lg mb-3">
              3
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1">Done!</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The calculator appears on your site, auto-updating with the latest 2026 tax data.
            </p>
          </div>
        </div>
      </section>

      {/* Widget Grid */}
      <div id="widgets" className="scroll-mt-24">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
            <Code2 className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Available <span className="gradient-text">Widgets</span>
            </h2>
            <p className="text-sm text-muted-foreground">
              21+ free calculators ready to embed on your website.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive client component */}
      <div id="link-to-us" className="scroll-mt-24">
        <WidgetsGrid />
      </div>

      {/* FAQ Section */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
            <BookOpen className="h-5 w-5 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">
            Widget <span className="gradient-text">FAQ</span>
          </h2>
        </div>
        <div className="space-y-3">
          {FAQ_ITEMS.map((faq, i) => (
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

      {/* ─── For Accountants & Financial Coaches ──────────────────────── */}
      <section id="for-accountants" className="mb-12 scroll-mt-24">
        <div className="rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-500/5 via-blue-500/10 to-blue-500/5 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
              <Users className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                For Accountants &amp; <span className="gradient-text">Financial Coaches</span>
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                Add value to your website and keep visitors engaged longer
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-3 mb-8">
            <div className="rounded-lg bg-card/50 border border-border/20 p-5">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-500/10 mb-3">
                <Star className="h-4 w-4 text-blue-400" />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1">Build Client Trust</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Visitors who interact with a calculator on your site are 3x more likely to book a consultation. Give them a reason to stay and explore.
              </p>
            </div>
            <div className="rounded-lg bg-card/50 border border-border/20 p-5">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-500/10 mb-3">
                <Clock className="h-4 w-4 text-blue-400" />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1">Save Hours per Week</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Instead of manually estimating taxes for every prospect, let the widget handle it. You only get involved when they are ready for personalized advice.
              </p>
            </div>
            <div className="rounded-lg bg-card/50 border border-border/20 p-5">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-500/10 mb-3">
                <Heart className="h-4 w-4 text-blue-400" />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1">Zero Maintenance</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Tax brackets and rates are updated automatically. No software to install, no updates to apply, no API keys to manage. Just copy and forget.
              </p>
            </div>
          </div>

          <div className="rounded-lg bg-card/30 border border-border/20 p-5">
            <h3 className="text-sm font-semibold text-foreground mb-3">Recommended Widgets for Accountants</h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {[
                { href: '#widgets', label: 'Paycheck Calculator', reason: 'Most requested — every employee asks about take-home pay' },
                { href: '#widgets', label: 'Self-Employment Tax', reason: 'Essential for freelancers and independent contractors' },
                { href: '#widgets', label: 'Capital Gains Calculator', reason: 'Investment clients need after-tax projections' },
                { href: '#widgets', label: '401(k) Calculator', reason: 'Retirement planning conversations start here' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group flex items-start gap-2 rounded-md p-2 text-left hover:bg-blue-500/5 transition-colors"
                >
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-400/60 shrink-0" />
                  <div>
                    <span className="text-sm font-medium text-foreground group-hover:text-blue-400 transition-colors">{item.label}</span>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.reason}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── For HR & Payroll Sites ──────────────────────── */}
      <section id="for-hr" className="mb-12 scroll-mt-24">
        <div className="rounded-xl border border-amber-500/20 bg-gradient-to-br from-amber-500/5 via-amber-500/10 to-amber-500/5 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
              <Building2 className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                For HR &amp; <span className="gradient-text">Payroll Sites</span>
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                Help employees understand their paychecks — and reduce HR inquiries
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-3 mb-8">
            <div className="rounded-lg bg-card/50 border border-border/20 p-5">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-amber-500/10 mb-3">
                <Shield className="h-4 w-4 text-amber-400" />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1">Reduce Support Tickets</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                When employees can calculate their own take-home pay, they submit fewer &quot;why is my paycheck different&quot; tickets to HR.
              </p>
            </div>
            <div className="rounded-lg bg-card/50 border border-border/20 p-5">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-amber-500/10 mb-3">
                <Globe className="h-4 w-4 text-amber-400" />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1">Multi-State Coverage</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Remote teams span multiple states. The paycheck calculator covers all 50 states, so every employee gets accurate numbers regardless of location.
              </p>
            </div>
            <div className="rounded-lg bg-card/50 border border-border/20 p-5">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-amber-500/10 mb-3">
                <Zap className="h-4 w-4 text-amber-400" />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1">Onboarding Essential</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                New hires always want to know their take-home pay. Embed the calculator on your onboarding portal so they can estimate it instantly.
              </p>
            </div>
          </div>

          <div className="rounded-lg bg-card/30 border border-border/20 p-5">
            <h3 className="text-sm font-semibold text-foreground mb-3">Recommended Widgets for HR &amp; Payroll</h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {[
                { href: '#widgets', label: 'Paycheck Calculator', reason: 'The #1 tool employees search for on company intranets' },
                { href: '#widgets', label: 'IRS Withholding Calculator', reason: 'Help employees optimize W-4 during open enrollment' },
                { href: '#widgets', label: 'Bonus Tax Calculator', reason: 'Bonus season means questions — let them calculate it themselves' },
                { href: '#widgets', label: '401(k) Calculator', reason: 'Support benefits enrollment with retirement projections' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group flex items-start gap-2 rounded-md p-2 text-left hover:bg-amber-500/5 transition-colors"
                >
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-400/60 shrink-0" />
                  <div>
                    <span className="text-sm font-medium text-foreground group-hover:text-amber-400 transition-colors">{item.label}</span>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.reason}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Outreach Email Template ──────────────────────── */}
      <OutreachEmailTemplate />

      {/* Bottom CTA */}
      <section className="mb-12 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center">
        <CheckCircle2 className="h-8 w-8 text-emerald-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-3">
          Ready to Add a Widget?
        </h2>
        <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
          Copy any embed code above and paste it into your website. It takes less than 30 seconds
          — no registration, no API keys, no configuration needed.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="#widgets"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all hover:scale-[1.02]"
          >
            <Code2 className="h-4 w-4" />
            Browse Widgets
          </Link>
          <Link
            href="/paycheck-calculator"
            className="inline-flex items-center gap-2 rounded-xl border border-border/50 bg-card/50 px-6 py-3 text-sm font-medium text-foreground hover:border-emerald-500/30 hover:text-emerald-400 transition-all"
          >
            Try Paycheck Calculator
          </Link>
        </div>
      </section>

      {/* Related Resources */}
      <section className="border-t border-border/20 pt-10">
        <h2 className="text-lg font-bold text-foreground mb-6">Widgets & Resources</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Featured Calculators */}
          <div className="rounded-xl border border-border/30 bg-card/50 p-5">
            <h3 className="text-base font-semibold text-foreground mb-3">Featured Calculators</h3>
            <div className="space-y-2">
              {[
                { href: '/paycheck-calculator', label: 'Paycheck Calculator' },
                { href: '/mortgage-calculator', label: 'Mortgage Calculator' },
                { href: '/sales-tax-calculator', label: 'Sales Tax Calculator' },
                { href: '/capital-gains-calculator', label: 'Capital Gains Calculator' },
                { href: '/self-employment-tax-calculator', label: 'Self-Employment Tax' },
                { href: '/401k-retirement-calculator', label: '401(k) Calculator' },
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

          {/* State Calculators */}
          <div className="rounded-xl border border-border/30 bg-card/50 p-5">
            <h3 className="text-base font-semibold text-foreground mb-3">State Calculators</h3>
            <div className="space-y-2">
              {[
                { href: '/illinois-tax-calculator', label: 'Illinois (4.95%)' },
                { href: '/texas-tax-calculator', label: 'Texas (0%)' },
                { href: '/florida-tax-calculator', label: 'Florida (0%)' },
                { href: '/california-tax-calculator', label: 'California (1%–13.3%)' },
                { href: '/new-york-tax-calculator', label: 'New York (4%–10.9%)' },
                { href: '/georgia-tax-calculator', label: 'Georgia (5.49%)' },
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

          {/* More Tools */}
          <div className="rounded-xl border border-border/30 bg-card/50 p-5">
            <h3 className="text-base font-semibold text-foreground mb-3">More Tools</h3>
            <div className="space-y-2">
              {[
                { href: '/about', label: 'About TheTaxCalc' },
                { href: '/federal-tax-brackets', label: '2026 Tax Brackets' },
                { href: '/glossary', label: 'Tax Glossary' },
                { href: '/compare', label: 'Compare State Taxes' },
                { href: '/blog', label: 'Blog' },
                { href: '/salary', label: 'Salary After Tax' },
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

      {/* ─── Author Attribution (E-E-A-T) ──────────────────────── */}
      <section className="py-12 border-t border-border/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AuthorBioCard authorId="rachel-mitchell" />
        </div>
      </section>
    </div>
  );
}
