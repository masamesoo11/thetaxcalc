import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TaxYield.io — Free 2026 Paycheck & Mortgage Calculator | Illinois, Texas, Florida",
  description:
    "Instantly calculate your take-home pay after federal tax, FICA, and state income tax. Supports Illinois (4.95% flat), Texas (0%), and Florida (0%). Includes advanced mortgage calculator with extra payment simulation.",
  keywords: [
    "paycheck calculator",
    "take home pay calculator",
    "salary calculator",
    "Illinois tax calculator",
    "Texas tax calculator",
    "Florida tax calculator",
    "mortgage calculator",
    "FICA calculator",
    "2026 tax brackets",
    "federal tax calculator",
    "state income tax",
    "after tax salary",
    "net pay calculator",
    "401k calculator",
    "HSA calculator",
    "amortization calculator",
    "extra mortgage payment",
  ],
  authors: [{ name: "TaxYield.io" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "TaxYield.io — Free 2026 Paycheck & Mortgage Calculator",
    description:
      "Precision paycheck calculator for 2026. Compute take-home pay after federal, FICA, and state taxes for Illinois, Texas, and Florida. Includes mortgage amortization with extra payments.",
    url: "https://taxyield.io",
    siteName: "TaxYield.io",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TaxYield.io — Free 2026 Paycheck & Mortgage Calculator",
    description:
      "Compute your take-home pay after federal, FICA, and state taxes. Supports IL, TX, FL. Mortgage calculator included.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
