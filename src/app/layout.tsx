import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { QueryProvider } from "@/components/providers/query-provider";
import { Header } from "@/components/finance/header";
import { Footer } from "@/components/finance/footer";
import { CookieConsent } from '@/components/finance/cookie-consent';
import { SITE_URL } from '@/lib/site-config';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "TaxYield.io — Free 2026 Paycheck & Mortgage Calculator | IL, TX, FL, CA, NY",
    template: "%s | TaxYield.io",
  },
  description:
    "Instantly calculate your take-home pay after federal tax, FICA, and state income tax. Supports Illinois (4.95%), Texas (0%), Florida (0%), California (1%-13.3%), New York (4%-10.9%). Includes mortgage, 401(k), capital gains, and self-employment calculators.",
  keywords: [
    "paycheck calculator", "take home pay calculator", "salary calculator",
    "Illinois tax calculator", "Texas tax calculator", "Florida tax calculator",
    "California tax calculator", "New York tax calculator", "mortgage calculator",
    "FICA calculator", "2026 tax brackets", "federal tax calculator",
    "state income tax", "after tax salary", "net pay calculator",
  ],
  authors: [{ name: "TaxYield.io" }],
  creator: "TaxYield.io",
  publisher: "TaxYield.io",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "TaxYield.io — Free 2026 Paycheck & Mortgage Calculator",
    description:
      "Precision paycheck calculator for 2026. Compute take-home pay after federal, FICA, and state taxes for IL, TX, FL, CA, NY.",
    url: SITE_URL,
    siteName: "TaxYield.io",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "TaxYield.io — Free 2026 Paycheck & Mortgage Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TaxYield.io — Free 2026 Paycheck & Mortgage Calculator",
    description:
      "Compute your take-home pay after federal, FICA, and state taxes. Supports IL, TX, FL, CA, NY.",
    images: [`${SITE_URL}/opengraph-image`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en-US": SITE_URL,
      "x-default": SITE_URL,
    },
    types: {
      "application/rss+xml": `${SITE_URL}/feed.xml`,
    },
  },
  // NOTE: Replace "your-verification-code" with your actual Google Search Console verification code
  // Or set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION env variable and use generateMetadata() instead
  verification: {
    google: "your-verification-code",
  },
  category: "finance",
  classification: "Tax Calculator",
};

// ─── Google Analytics Component ────────────────────────────────────────────────

function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!gaId) return null;

  return (
    <>
      {/* Google Analytics — Global Site Tag */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}

// ─── Structured Data for Organization ──────────────────────────────────────────

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TaxYield.io",
  url: SITE_URL,
  logo: `${SITE_URL}/icon`,
  description: "Free 2026 tax calculators — paycheck, mortgage, 401(k), capital gains, and self-employment.",
  sameAs: [],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "TaxYield.io",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/paycheck-calculator?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

// ─── Root Layout ───────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0a0f1e" />

        {/* Google Analytics */}
        <GoogleAnalytics />

        {/* Structured Data — Organization & WebSite (sitewide) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <QueryProvider>
          <div className="min-h-screen flex flex-col bg-background bg-mesh">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </QueryProvider>
        <CookieConsent />
      </body>
    </html>
  );
}
