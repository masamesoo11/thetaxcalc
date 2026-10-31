import { Metadata } from 'next';
import Link from 'next/link';
import {
  Mail,
  Clock,
  ShieldCheck,
  Megaphone,
  AlertTriangle,
  Lightbulb,
  Lock,
} from 'lucide-react';
import { Breadcrumb } from '@/components/finance/breadcrumb';
import { ProtectedEmail } from '@/components/finance/protected-email';
import { ContactForm } from '@/components/finance/contact-form';
import { Card, CardContent } from '@/components/ui/card';
import { SITE_URL } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Contact TheTaxCalc — Support, Corrections & Feedback',
  description:
    'Contact TheTaxCalc: report a calculation error, ask a tax calculator question, or send feedback. We reply to every message within 1-2 business days.',
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: 'Contact TheTaxCalc — Support & Feedback',
    description:
      'Report a calculation error, ask a question, or send feedback. We reply within 1-2 business days.',
    url: `${SITE_URL}/contact`,
    siteName: 'TheTaxCalc',
    type: 'website',
    locale: 'en_US',
    images: [{ url: `${SITE_URL}/opengraph-image.png`, width: 1200, height: 630, alt: 'Contact TheTaxCalc' }],
  },
};

const contactJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@id': `${SITE_URL}/contact#breadcrumb`,
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Contact' },
      ],
    },
    {
      '@id': `${SITE_URL}/contact#webpage`,
      '@type': 'ContactPage',
      name: 'Contact TheTaxCalc',
      description:
        'Contact TheTaxCalc: report a calculation error, ask a tax calculator question, or send feedback.',
      url: `${SITE_URL}/contact`,
      isPartOf: { '@type': 'WebSite', '@id': `${SITE_URL}#website` },
    },
  ],
};

const CONTACT_REASONS = [
  {
    icon: AlertTriangle,
    title: 'Report a calculation or data error',
    text: 'Found a number that looks wrong — a tax bracket, a state rate, a take-home pay figure? Tell us the calculator, your inputs, and what you expected. Accuracy is our top priority.',
  },
  {
    icon: Megaphone,
    title: 'Advertising & media',
    text: 'Interested in partnering with TheTaxCalc or covering our tax research? We work with advertisers and journalists — just mark your message "advertising".',
  },
  {
    icon: Lock,
    title: 'Privacy requests',
    text: 'Questions about our privacy policy or how we handle data? Good news: all calculations run in your browser and we never store your financial data. For formal requests, use the contact form or email us.',
  },
  {
    icon: Lightbulb,
    title: 'Feedback & calculator ideas',
    text: 'Want a calculator we don\'t have yet? A feature that would make tax planning easier for you? We build what our users ask for — send us your ideas.',
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />

      <Breadcrumb items={[{ label: 'Contact' }]} />

      {/* Header */}
      <div className="mb-10 mt-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Contact TheTaxCalc
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Questions, corrections, feedback, or partnership ideas — we read every message and
          typically reply within 1-2 business days.
        </p>
      </div>

      {/* Form + side info */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="min-w-0 lg:col-span-2">
          <ContactForm />
        </div>

        <aside className="min-w-0 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                <h2 className="text-lg font-semibold text-foreground">Email us directly</h2>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Prefer email over the form? Reach us at:
              </p>
              <p className="mt-2">
                <ProtectedEmail code="contact|thetaxcalc.com" />
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                <h2 className="text-lg font-semibold text-foreground">Response time</h2>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                We reply to most messages within <strong className="text-foreground">1-2
                business days</strong>. Data accuracy reports get priority — if a calculation
                is wrong, we want to fix it fast.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                <h2 className="text-lg font-semibold text-foreground">Before you write</h2>
              </div>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>
                  • Wondering how we compute a number? See our{' '}
                  <Link href="/methodology" className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2">
                    methodology page
                  </Link>
                  .
                </li>
                <li>
                  • Looking for a definition? Try the{' '}
                  <Link href="/glossary" className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2">
                    tax glossary
                  </Link>
                  .
                </li>
                <li>
                  • Privacy questions? Read the{' '}
                  <Link href="/privacy" className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2">
                    privacy policy
                  </Link>
                  — the short version: your calculations never leave your browser.
                </li>
              </ul>
            </CardContent>
          </Card>
        </aside>
      </div>

      {/* What can you contact us about */}
      <section className="mt-14" aria-labelledby="contact-reasons-heading">
        <h2 id="contact-reasons-heading" className="text-2xl font-bold text-foreground">
          What can you contact us about?
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {CONTACT_REASONS.map((reason) => (
            <Card key={reason.title} className="min-w-0">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950">
                    <reason.icon className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground">{reason.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {reason.text}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
