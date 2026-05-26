import { Metadata } from 'next';
import { Shield, Lock, Eye, Server, UserCheck, Bell, FileText, Mail } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'TaxYield.io Privacy Policy — learn how we collect, use, and protect your personal information when using our free tax calculators.',
  keywords: ['privacy policy', 'taxyield privacy', 'tax calculator privacy', 'data protection', 'calculator data security', 'browser calculations'],
  alternates: {
    canonical: 'https://taxyield.io/privacy',
    languages: {
      'en-US': 'https://taxyield.io/privacy',
      'x-default': 'https://taxyield.io/privacy',
    },
  },
  openGraph: {
    title: 'Privacy Policy — TaxYield.io',
    description: 'Learn how TaxYield.io collects, uses, and protects your personal information when using our free tax calculators.',
    url: 'https://taxyield.io/privacy',
    siteName: 'TaxYield.io',
    type: 'website',
    locale: 'en_US',
  },
};

const privacyJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Privacy Policy — TaxYield.io',
  description: 'Learn how TaxYield.io collects, uses, and protects your personal information when using our free tax calculators.',
  url: 'https://taxyield.io/privacy',
  isPartOf: {
    '@type': 'WebSite',
    name: 'TaxYield.io',
    url: 'https://taxyield.io',
  },
};

export default function PrivacyPage() {
  const lastUpdated = 'March 4, 2026';

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacyJsonLd) }}
      />

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <Shield className="h-6 w-6 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Privacy Policy</h1>
            <p className="text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
          </div>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          At TaxYield.io, we are committed to protecting your privacy. This Privacy Policy explains how we
          collect, use, disclose, and safeguard your information when you visit our website and use our
          tax calculators. Please read this policy carefully. By using TaxYield.io, you agree to the
          practices described in this Privacy Policy.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-8">
        {/* 1. Information We Collect */}
        <section className="rounded-xl border border-border/30 bg-card/50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Eye className="h-5 w-5 text-emerald-400" />
            <h2 className="text-xl font-semibold text-foreground">1. Information We Collect</h2>
          </div>
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <div>
              <h3 className="font-semibold text-foreground mb-1">Information You Provide</h3>
              <p>
                When you use our tax calculators, you may voluntarily enter financial information such as
                salary figures, filing status, state of residence, 401(k) contributions, and other
                tax-related data. <strong className="text-foreground">All calculations are performed entirely in your browser</strong> —
                we do not transmit, store, or have access to the numbers you enter into our calculators.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Automatically Collected Information</h3>
              <p>
                When you visit our website, we may automatically collect certain information, including:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
                <li>IP address and approximate geographic location</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages visited and time spent on each page</li>
                <li>Referring website or source</li>
                <li>Device type (desktop, mobile, tablet)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Newsletter Subscription</h3>
              <p>
                If you subscribe to our newsletter, we collect your email address. You may unsubscribe
                at any time using the link in our emails.
              </p>
            </div>
          </div>
        </section>

        {/* 2. How We Use Your Information */}
        <section className="rounded-xl border border-border/30 bg-card/50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <UserCheck className="h-5 w-5 text-emerald-400" />
            <h2 className="text-xl font-semibold text-foreground">2. How We Use Your Information</h2>
          </div>
          <div className="text-sm text-muted-foreground leading-relaxed">
            <p>We use the information we collect for the following purposes:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>To provide and maintain our free tax calculator tools</li>
              <li>To improve our website and user experience</li>
              <li>To send you newsletters and tax updates (if subscribed)</li>
              <li>To analyze website usage and trends</li>
              <li>To detect and prevent technical issues or abuse</li>
              <li>To comply with legal obligations</li>
            </ul>
          </div>
        </section>

        {/* 3. Data Storage & Security */}
        <section className="rounded-xl border border-border/30 bg-card/50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Server className="h-5 w-5 text-emerald-400" />
            <h2 className="text-xl font-semibold text-foreground">3. Data Storage & Security</h2>
          </div>
          <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
            <p>
              <strong className="text-foreground">Calculator data stays in your browser.</strong> All tax
              calculations are performed client-side using JavaScript. The salary, tax, and deduction
              figures you enter never leave your device. We do not store or transmit your financial data
              to our servers.
            </p>
            <p>
              We implement industry-standard security measures to protect any information we do collect
              (such as analytics data and email addresses). However, no method of electronic
              transmission or storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </div>
        </section>

        {/* 4. Third-Party Services */}
        <section className="rounded-xl border border-border/30 bg-card/50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Lock className="h-5 w-5 text-emerald-400" />
            <h2 className="text-xl font-semibold text-foreground">4. Third-Party Services</h2>
          </div>
          <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
            <p>We use the following third-party services:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>
                <strong className="text-foreground">Google Analytics:</strong> We use Google Analytics to
                understand how visitors interact with our website. Google may collect and process data
                about your use of our site. For more information, see{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  Google&apos;s Privacy Policy
                </a>.
              </li>
              <li>
                <strong className="text-foreground">Advertising Partners:</strong> We may display
                advertisements from third-party networks. These partners may use cookies and similar
                technologies to serve relevant ads based on your browsing activity.
              </li>
            </ul>
          </div>
        </section>

        {/* 5. Cookies */}
        <section className="rounded-xl border border-border/30 bg-card/50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="h-5 w-5 text-emerald-400" />
            <h2 className="text-xl font-semibold text-foreground">5. Cookies & Tracking</h2>
          </div>
          <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
            <p>
              We use cookies and similar tracking technologies to enhance your experience. These include:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong className="text-foreground">Essential cookies:</strong> Required for the website to function properly</li>
              <li><strong className="text-foreground">Analytics cookies:</strong> Help us understand how you use our site</li>
              <li><strong className="text-foreground">Advertising cookies:</strong> Used by our ad partners to display relevant ads</li>
            </ul>
            <p>
              You can manage your cookie preferences through your browser settings. Disabling cookies may
              affect the functionality of our website.
            </p>
          </div>
        </section>

        {/* 6. Your Rights */}
        <section className="rounded-xl border border-border/30 bg-card/50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5 text-emerald-400" />
            <h2 className="text-xl font-semibold text-foreground">6. Your Rights</h2>
          </div>
          <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
            <p>You have the following rights regarding your personal data:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong className="text-foreground">Access:</strong> Request a copy of the personal data we hold about you</li>
              <li><strong className="text-foreground">Correction:</strong> Request correction of inaccurate data</li>
              <li><strong className="text-foreground">Deletion:</strong> Request deletion of your personal data</li>
              <li><strong className="text-foreground">Opt-out:</strong> Unsubscribe from newsletters at any time</li>
              <li><strong className="text-foreground">Cookie control:</strong> Manage cookie preferences in your browser</li>
            </ul>
          </div>
        </section>

        {/* 7. Children's Privacy */}
        <section className="rounded-xl border border-border/30 bg-card/50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-emerald-400" />
            <h2 className="text-xl font-semibold text-foreground">7. Children&apos;s Privacy</h2>
          </div>
          <div className="text-sm text-muted-foreground leading-relaxed">
            <p>
              TaxYield.io is not directed at children under 13. We do not knowingly collect personal
              information from children under 13. If we become aware that we have collected such
              information, we will take steps to delete it promptly.
            </p>
          </div>
        </section>

        {/* 8. Changes to This Policy */}
        <section className="rounded-xl border border-border/30 bg-card/50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5 text-emerald-400" />
            <h2 className="text-xl font-semibold text-foreground">8. Changes to This Policy</h2>
          </div>
          <div className="text-sm text-muted-foreground leading-relaxed">
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by
              posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
              Your continued use of TaxYield.io after any changes constitutes your acceptance of the
              updated policy.
            </p>
          </div>
        </section>

        {/* 9. Contact Us */}
        <section className="rounded-xl border border-border/30 bg-card/50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="h-5 w-5 text-emerald-400" />
            <h2 className="text-xl font-semibold text-foreground">9. Contact Us</h2>
          </div>
          <div className="text-sm text-muted-foreground leading-relaxed">
            <p>
              If you have questions or concerns about this Privacy Policy, please contact us at:
            </p>
            <div className="mt-3 rounded-lg bg-muted/30 p-4">
              <p className="font-semibold text-foreground">TaxYield.io</p>
              <p>Email: privacy@taxyield.io</p>
              <p>Website: https://taxyield.io</p>
            </div>
          </div>
        </section>
      </div>

      {/* Back Link */}
      <div className="mt-10 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all hover:scale-[1.02]"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
