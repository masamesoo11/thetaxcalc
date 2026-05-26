import { Metadata } from 'next';
import { Scale, AlertTriangle, Shield, FileText, Gavel, Mail, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'TaxYield.io Terms of Use — understand the terms and conditions for using our free tax calculators and website.',
  keywords: ['terms of use', 'taxyield terms', 'tax calculator terms', 'usage agreement', 'legal terms', 'disclaimer'],
  alternates: {
    canonical: 'https://taxyield.io/terms',
    languages: {
      'en-US': 'https://taxyield.io/terms',
      'x-default': 'https://taxyield.io/terms',
    },
  },
  openGraph: {
    title: 'Terms of Use — TaxYield.io',
    description: 'Understand the terms and conditions for using TaxYield.io free tax calculators and website.',
    url: 'https://taxyield.io/terms',
    siteName: 'TaxYield.io',
    type: 'website',
    locale: 'en_US',
  },
};

const termsJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Terms of Use — TaxYield.io',
  description: 'Understand the terms and conditions for using TaxYield.io free tax calculators and website.',
  url: 'https://taxyield.io/terms',
  isPartOf: {
    '@type': 'WebSite',
    name: 'TaxYield.io',
    url: 'https://taxyield.io',
  },
};

export default function TermsPage() {
  const lastUpdated = 'March 4, 2026';

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(termsJsonLd) }}
      />

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <Scale className="h-6 w-6 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Terms of Use</h1>
            <p className="text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
          </div>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          These Terms of Use (&quot;Terms&quot;) govern your access to and use of the TaxYield.io website
          and all related services. By accessing or using TaxYield.io, you agree to be bound by these
          Terms. If you do not agree, please do not use our website.
        </p>
      </div>

      {/* Important Disclaimer Banner */}
      <div className="mb-8 rounded-xl border border-amber-500/20 bg-amber-500/5 p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-6 w-6 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Important Disclaimer</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              TaxYield.io provides <strong className="text-foreground">estimates for informational purposes only</strong>.
              Our calculators are not a substitute for professional tax, accounting, or financial advice.
              Tax laws are complex and subject to change. Always consult a qualified tax professional
              or CPA for advice specific to your financial situation. We make no guarantees about the
              accuracy, completeness, or timeliness of any calculation results.
            </p>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-8">
        {/* 1. Acceptance of Terms */}
        <section className="rounded-xl border border-border/30 bg-card/50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5 text-emerald-400" />
            <h2 className="text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
          </div>
          <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
            <p>
              By accessing and using TaxYield.io, you acknowledge that you have read, understood, and
              agree to be bound by these Terms of Use and our{' '}
              <Link href="/privacy" className="text-emerald-400 hover:text-emerald-300 underline">
                Privacy Policy
              </Link>.
              If you do not agree to these Terms, you must not use our website.
            </p>
            <p>
              We reserve the right to modify these Terms at any time. Changes become effective immediately
              upon posting. Your continued use of the website after changes are posted constitutes your
              acceptance of the modified Terms.
            </p>
          </div>
        </section>

        {/* 2. Use of Our Services */}
        <section className="rounded-xl border border-border/30 bg-card/50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Gavel className="h-5 w-5 text-emerald-400" />
            <h2 className="text-xl font-semibold text-foreground">2. Use of Our Services</h2>
          </div>
          <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
            <p>TaxYield.io provides free, web-based tax calculators for informational purposes. You agree to:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Use our calculators only for personal, non-commercial informational purposes</li>
              <li>Not attempt to reverse engineer, decompile, or otherwise access the source code</li>
              <li>Not use automated tools (bots, scrapers) to access our website</li>
              <li>Not attempt to overwhelm our servers with excessive requests</li>
              <li>Not use our website for any unlawful purpose</li>
              <li>Not misrepresent the source of information obtained from our website</li>
            </ul>
          </div>
        </section>

        {/* 3. Accuracy of Calculations */}
        <section className="rounded-xl border border-border/30 bg-card/50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-amber-400" />
            <h2 className="text-xl font-semibold text-foreground">3. Accuracy of Calculations</h2>
          </div>
          <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
            <p>
              While we strive for accuracy, TaxYield.io provides <strong className="text-foreground">estimates only</strong>.
              Our calculations are based on:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Published federal and state tax rates and brackets for the 2026 tax year</li>
              <li>Standard deductions and common exemptions</li>
              <li>General assumptions that may not apply to your specific situation</li>
            </ul>
            <p>
              Actual tax liability depends on many factors beyond what our calculators consider, including
              but not limited to: itemized deductions, tax credits, multiple income sources,
              investment income, rental income, foreign income, and life changes during the tax year.
            </p>
            <p className="font-medium text-foreground">
              You should not rely solely on our calculators for tax filing or financial decisions.
              Always verify results with a qualified tax professional.
            </p>
          </div>
        </section>

        {/* 4. No Professional Advice */}
        <section className="rounded-xl border border-border/30 bg-card/50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-emerald-400" />
            <h2 className="text-xl font-semibold text-foreground">4. No Professional Advice</h2>
          </div>
          <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
            <p>
              The content on TaxYield.io, including calculator results, blog articles, and guides, is
              provided for general informational purposes only. Nothing on this website constitutes:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Tax advice or tax preparation services</li>
              <li>Financial planning or investment advice</li>
              <li>Legal advice of any kind</li>
              <li>An offer or solicitation for any financial product or service</li>
            </ul>
            <p>
              You should always consult with qualified professionals — such as a CPA, tax attorney,
              or certified financial planner — for advice tailored to your specific circumstances.
            </p>
          </div>
        </section>

        {/* 5. Intellectual Property */}
        <section className="rounded-xl border border-border/30 bg-card/50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5 text-emerald-400" />
            <h2 className="text-xl font-semibold text-foreground">5. Intellectual Property</h2>
          </div>
          <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
            <p>
              All content on TaxYield.io, including but not limited to text, graphics, logos, icons,
              images, code, and the overall design of the website, is the property of TaxYield.io
              and is protected by applicable intellectual property laws.
            </p>
            <p>
              You may share links to our calculators and articles. However, you may not reproduce,
              distribute, modify, or create derivative works from our content without our express
              written permission.
            </p>
            <p>
              Tax rates, brackets, and other government-published data are in the public domain.
              Our presentation and implementation of this data is proprietary.
            </p>
          </div>
        </section>

        {/* 6. Third-Party Links & Advertising */}
        <section className="rounded-xl border border-border/30 bg-card/50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <ExternalLink className="h-5 w-5 text-emerald-400" />
            <h2 className="text-xl font-semibold text-foreground">6. Third-Party Links & Advertising</h2>
          </div>
          <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
            <p>
              TaxYield.io may contain links to third-party websites and display advertisements from
              third-party networks. We are not responsible for the content, accuracy, or practices
              of any third-party websites. Your interactions with third-party sites are governed by
              their own terms and privacy policies.
            </p>
            <p>
              The inclusion of any link or advertisement does not imply our endorsement. We do not
              control and are not responsible for the quality, safety, or legality of advertised
              products or services.
            </p>
          </div>
        </section>

        {/* 7. Limitation of Liability */}
        <section className="rounded-xl border border-border/30 bg-card/50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-emerald-400" />
            <h2 className="text-xl font-semibold text-foreground">7. Limitation of Liability</h2>
          </div>
          <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
            <p>To the fullest extent permitted by law:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>
                TaxYield.io is provided &quot;as is&quot; and &quot;as available&quot; without warranties
                of any kind, either express or implied
              </li>
              <li>
                We do not warrant that our website will be uninterrupted, error-free, or free of
                viruses or other harmful components
              </li>
              <li>
                We shall not be liable for any direct, indirect, incidental, special, consequential,
                or punitive damages arising from your use of or inability to use our website
              </li>
              <li>
                We are not liable for any errors or omissions in calculator results or tax information
              </li>
              <li>
                We are not liable for any decisions you make based on information provided by
                TaxYield.io
              </li>
            </ul>
          </div>
        </section>

        {/* 8. Indemnification */}
        <section className="rounded-xl border border-border/30 bg-card/50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Gavel className="h-5 w-5 text-emerald-400" />
            <h2 className="text-xl font-semibold text-foreground">8. Indemnification</h2>
          </div>
          <div className="text-sm text-muted-foreground leading-relaxed">
            <p>
              You agree to indemnify and hold harmless TaxYield.io, its owners, operators, and
              contributors from any claims, damages, losses, or expenses (including reasonable
              attorney fees) arising from your use of our website or violation of these Terms.
            </p>
          </div>
        </section>

        {/* 9. Termination */}
        <section className="rounded-xl border border-border/30 bg-card/50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5 text-emerald-400" />
            <h2 className="text-xl font-semibold text-foreground">9. Termination</h2>
          </div>
          <div className="text-sm text-muted-foreground leading-relaxed">
            <p>
              We reserve the right to terminate or suspend access to our website, without prior
              notice, for conduct that we believe violates these Terms or is harmful to other users,
              us, or third parties, or for any other reason at our sole discretion.
            </p>
          </div>
        </section>

        {/* 10. Governing Law */}
        <section className="rounded-xl border border-border/30 bg-card/50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Scale className="h-5 w-5 text-emerald-400" />
            <h2 className="text-xl font-semibold text-foreground">10. Governing Law</h2>
          </div>
          <div className="text-sm text-muted-foreground leading-relaxed">
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the
              United States. Any disputes arising from these Terms or your use of TaxYield.io
              shall be resolved in the appropriate courts.
            </p>
          </div>
        </section>

        {/* 11. Contact */}
        <section className="rounded-xl border border-border/30 bg-card/50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="h-5 w-5 text-emerald-400" />
            <h2 className="text-xl font-semibold text-foreground">11. Contact</h2>
          </div>
          <div className="text-sm text-muted-foreground leading-relaxed">
            <p>
              If you have questions about these Terms of Use, please contact us at:
            </p>
            <div className="mt-3 rounded-lg bg-muted/30 p-4">
              <p className="font-semibold text-foreground">TaxYield.io</p>
              <p>Email: legal@taxyield.io</p>
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
