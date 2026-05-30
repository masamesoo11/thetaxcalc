import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";
import { DynamicProviders } from "@/components/providers/dynamic-providers";
import { Header } from "@/components/finance/header";
import { Footer } from "@/components/finance/footer";
import { ClientAnalytics } from "@/components/finance/client-analytics";
import { SITE_URL, SITE_HOME_URL } from '@/lib/site-config';

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
    default: "TheTaxCalc — Free 2026 Tax & Paycheck Calculator",
    template: "%s | TheTaxCalc",
  },
  description:
    "Free 2026 tax calculator — paycheck, take-home pay, federal & state taxes. Plus mortgage, 401(k), self-employment & capital gains tools. No sign-up.",
  authors: [{ name: "TheTaxCalc" }],
  creator: "TheTaxCalc",
  publisher: "TheTaxCalc",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "TheTaxCalc — Free 2026 Tax, Paycheck & Mortgage Calculator",
    description:
      "Free 2026 tax calculator. Compute take-home pay after federal, FICA & state taxes for IL, TX, FL, CA, NY. No sign-up.",
    url: SITE_HOME_URL,
    siteName: "TheTaxCalc",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${SITE_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "TheTaxCalc — Free 2026 Paycheck & Mortgage Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TheTaxCalc — Free 2026 Paycheck & Mortgage Calculator",
    description:
      "Compute your take-home pay after federal, FICA, and state taxes. Supports IL, TX, FL, CA, NY.",
    images: [`${SITE_URL}/opengraph-image.png`],
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
    canonical: SITE_HOME_URL,
    types: {
      "application/rss+xml": `${SITE_URL}/feed.xml`,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
  category: "finance",
  classification: "Tax Calculator",
};

// ─── Google Analytics & AdSense — loaded dynamically via ClientAnalytics ─────
// The ClientAnalytics component reads GA and AdSense IDs from /api/settings
// (admin panel) and injects the scripts client-side.

// ─── Structured Data for Organization ──────────────────────────────────────────

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TheTaxCalc",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  description: "Free 2026 tax calculators — paycheck, mortgage, 401(k), capital gains, and self-employment.",
  sameAs: [],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "TheTaxCalc",
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

        {/* Google Analytics & AdSense — loaded from DB settings */}
        <ClientAnalytics />

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
            <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-emerald-600 focus:px-4 focus:py-2 focus:text-white focus:shadow-lg">
              Skip to main content
            </a>
            <Header />
            <main id="main-content" className="flex-1">{children}</main>
            <Footer />
          </div>
          <DynamicProviders />
        </QueryProvider>
      </body>
    </html>
  );
}
