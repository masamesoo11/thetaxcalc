import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { QueryProvider } from "@/components/providers/query-provider";
import { DynamicProviders } from "@/components/providers/dynamic-providers";
import { ClientAnalytics } from "@/components/finance/client-analytics";
import { SiteShell } from "@/components/finance/site-shell";
import { WebMCPProvider } from "@/components/finance/webmcp-provider";
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
  authors: [{ name: "Rachel Mitchell, CPA", url: `${SITE_URL}/about#rachel-mitchell` }],
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
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "7bdac16b5ecbdd40",
  },
  category: "finance",
  classification: "Tax Calculator",
};

// ─── Google Analytics & AdSense — loaded dynamically via ClientAnalytics ─────
// The ClientAnalytics component reads GA and AdSense IDs from /api/settings
// (admin panel) and injects the scripts client-side.

// ─── Structured Data — Organization & WebSite (sitewide @graph) ────────────────

const sitewideJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@id": `${SITE_URL}/#organization`,
      "@type": "Organization",
      name: "TheTaxCalc",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon.png`,
      },
      description: "Free 2026 tax calculators — paycheck, mortgage, 401(k), capital gains, and self-employment. Trusted by thousands of users for accurate, up-to-date tax estimates.",
      foundingDate: "2022",
      sameAs: [
        `${SITE_URL}/about`,
        `${SITE_URL}/blog`,
        `${SITE_URL}/research`,
        `${SITE_URL}/methodology`,
      ] as string[],
      contactPoint: [
        {
          "@type": "ContactPoint",
          url: `${SITE_URL}/about#contact`,
          contactType: "customer support",
          availableLanguage: ["English"],
        },
      ],
    },
    {
      "@id": `${SITE_URL}/#website`,
      "@type": "WebSite",
      name: "TheTaxCalc",
      url: SITE_URL,
      description: "Free 2026 tax calculators — paycheck, mortgage, 401(k), capital gains, and self-employment.",
      inLanguage: "en-US",
      publisher: { "@id": `${SITE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

// ─── Root Layout ───────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0a0f1e" />

        {/* Google Tag Manager */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <script
            data-cfasync="false"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');`,
            }}
          />
        )}

        {/* Google Analytics 4 (gtag.js) — direct integration */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <script
              async
              data-cfasync="false"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            />
            <script
              data-cfasync="false"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
                `,
              }}
            />
          </>
        )}

        {/* Ahrefs Web Analytics — privacy-friendly analytics alternative */}
        {process.env.NEXT_PUBLIC_AHREFS_SITE_ID && (
          <script
            async
            data-cfasync="false"
            src="https://analytics.ahrefs.com/analytics.js"
            data-ahrefs-site-id={process.env.NEXT_PUBLIC_AHREFS_SITE_ID}
          />
        )}

        {/* Google Analytics & AdSense — loaded from DB settings */}
        <ClientAnalytics />

        {/* Structured Data — Organization & WebSite (sitewide @graph) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(sitewideJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {/* Google Tag Manager (noscript) */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <QueryProvider>
          <SiteShell>
        <WebMCPProvider />{children}</SiteShell>
          <DynamicProviders />
        </QueryProvider>
      </body>
    </html>
  );
}
