import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import AuthProviderWrapper from "@/components/AuthProviderWrapper";

export const metadata: Metadata = {
  title: "SkyRoutesAI - Coming Soon",
  description: "Something new is on the way.",
  keywords: [
    "AI flight finder",
    "cheap flights",
    "budget flights",
    "flight search",
    "where can I fly",
    "flight deals",
    "affordable flights",
  ],
  authors: [{ name: "SkyRoutesAI" }],
  openGraph: {
    title: "SkyRoutesAI - Coming Soon",
    description: "Something new is on the way.",
    url: "https://skyroutesai.com",
    siteName: "SkyRoutesAI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://skyroutesai.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SkyRoutesAI - AI Flight Finder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SkyRoutesAI - Coming Soon",
    description: "Something new is on the way.",
    images: ["https://skyroutesai.com/og-image.jpg"],
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
  verification: {
    // Add verification codes when available
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "SkyRoutesAI",
    description: "AI-powered flight finder that helps you discover where you can fly from your departure city within your budget over the next 1-6 months.",
    url: "https://skyroutesai.com",
    applicationCategory: "TravelApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Budget-based flight search",
      "1-6 month search window",
      "Basic economy filtering",
      "Saved searches",
      "Free account for real-time data",
    ],
  };

  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {/* JSON-LD structured data - added via client component to avoid hydration issues */}
        <JsonLd data={jsonLd} />
        {/* Google AdSense - Disabled for coming soon page */}
        {/* <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3373780887120786"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        /> */}
        <AuthProviderWrapper>
          {children}
        </AuthProviderWrapper>
        <Footer />
      </body>
    </html>
  );
}

