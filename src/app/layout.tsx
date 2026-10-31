import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { QueryProvider } from "@/components/providers/query-provider";
import { DynamicProviders } from "@/components/providers/dynamic-providers";
import { ClientAnalytics } from "@/components/finance/client-analytics";
import { ConsentBanner } from "@/components/finance/consent-banner";
import { SiteShell } from "@/components/finance/site-shell";
import { WebMCPProvider } from "@/components/finance/webmcp-provider";
import { PwaClient } from "@/components/pwa/pwa-client";
import { SITE_URL, SITE_HOME_URL } from '@/lib/site-config';
import { TOTAL_CALCULATOR_COUNT } from '@/lib/calculator-routes';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Resolves relative OG/canonical URLs (file-based opengraph-image etc.)
  // against the production origin — without it Next falls back to
  // http://localhost:3000 on non-Vercel hosts (opennextjs-cloudflare).
  metadataBase: new URL(SITE_URL),
  title: {
    default: "TheTaxCalc — Free 2026 Tax & Paycheck Calculator",
    template: "%s | TheTaxCalc",
  },
  description:
    "Free 2026 tax calculator — paycheck, take-home pay, federal & state taxes. Plus mortgage, 401(k), self-employment & capital gains tools. No sign-up.",
  authors: [{ name: "TheTaxCalc Editorial Team", url: `${SITE_URL}/about#editorial-team` }],
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
    {
      "@id": `${SITE_URL}/#webpage-home`,
      "@type": "WebPage",
      name: "2026 Tax Calculator — Paycheck & Take-Home Pay | 50 States",
      description: `Free 2026 tax calculator. Take-home pay after federal, FICA & state tax. ${TOTAL_CALCULATOR_COUNT} tools & 50-state sales tax data. No sign-up.`,
      url: SITE_URL,
      inLanguage: "en-US",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: {
        "@type": "Thing",
        name: "Tax Calculator",
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
  // A+ theme: light warm-white site-wide (Task 33). The legacy .dark class was
  // removed — inner pages, header and footer now render the A+ light +
  // champagne-gold token set from :root in globals.css.
  return (
    <html lang="en-US" suppressHydrationWarning>
      <head>
        {/* Resource hints — preconnect to critical third-party origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://analytics.ahrefs.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://analytics.ahrefs.com" />
        <link rel="dns-prefetch" href="https://www.irs.gov" />
        <link rel="dns-prefetch" href="https://taxfoundation.org" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#fafaf9" />

        {/* Google AdSense — site verification meta stays static so crawlers
            see it in the raw HTML. The loader script is injected by
            ClientAnalytics AFTER hydration: the async loader appends its own
            <script> to <head> mid-hydration, which desynchronized React's
            node alignment and flagged the sitewide JSON-LD script as a
            hydration mismatch ("1 Issue" dev badge + console errors). */}
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <meta name="google-adsense-account" content="ca-pub-5542276525674040" />

        {/* Google Consent Mode v2 defaults — MUST run before any gtag/GTM/AdSense
            script. Reads the ttx_consent cookie + EEA/UK timezone heuristic and
            sets denied defaults for EEA/UK visitors without an explicit "accept".
            The consent banner (bottom of body) and ClientAnalytics (AdSense gate)
            both build on the window.__ttx* flags set here. See src/lib/consent.ts. */}
        <script
          data-cfasync="false"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{
var TZ={ 'Europe/Amsterdam':1,'Europe/Athens':1,'Europe/Berlin':1,'Europe/Bratislava':1,'Europe/Brussels':1,'Europe/Bucharest':1,'Europe/Budapest':1,'Europe/Busingen':1,'Europe/Copenhagen':1,'Europe/Dublin':1,'Europe/Helsinki':1,'Europe/Lisbon':1,'Europe/Ljubljana':1,'Europe/Luxembourg':1,'Europe/Madrid':1,'Europe/Malta':1,'Europe/Mariehamn':1,'Europe/Oslo':1,'Europe/Paris':1,'Europe/Prague':1,'Europe/Riga':1,'Europe/Rome':1,'Europe/Stockholm':1,'Europe/Sofia':1,'Europe/Tallinn':1,'Europe/Vaduz':1,'Europe/Vienna':1,'Europe/Vilnius':1,'Europe/Warsaw':1,'Europe/Zagreb':1,'Asia/Nicosia':1,'Asia/Famagusta':1,'Atlantic/Reykjavik':1,'Atlantic/Faeroe':1,'Atlantic/Canary':1,'Atlantic/Madeira':1,'Atlantic/Azores':1,'Europe/London':1,'Europe/Belfast':1,'Europe/Guernsey':1,'Europe/Isle_of_Man':1,'Europe/Jersey':1,'Europe/Gibraltar':1 };
var tz=Intl.DateTimeFormat().resolvedOptions().timeZone||'';
var eea=!!TZ[tz];window.__ttxEEAUK=eea;
var m=document.cookie.match(/(?:^|;\\s*)ttx_consent=([^;]*)/);
var c=m?decodeURIComponent(m[1]):'';
window.__ttxConsent=(c==='all'||c==='essential')?c:null;
var g=(!eea)||(c==='all');
window.dataLayer=window.dataLayer||[];
window.dataLayer.push(['consent','default',{ad_storage:g?'granted':'denied',ad_user_data:g?'granted':'denied',ad_personalization:g?'granted':'denied',analytics_storage:g?'granted':'denied'}]);
}catch(e){}})();`,
          }}
        />

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
        {/* Skip to content link — handled by SiteShell component to avoid duplicates */}

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
        <WebMCPProvider />{children}<PwaClient /></SiteShell>
          <DynamicProviders />
          {/* EEA/UK consent banner (GDPR / UK GDPR) — renders only for EEA/UK
              visitors without a stored choice; gates the AdSense loader. */}
          <ConsentBanner />
        </QueryProvider>
      </body>
    </html>
  );
}
