import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SkyRoutesAI - Find Flights Within Your Budget",
  description: "Discover where you can fly from your departure city within your budget over the next 1-6 months. AI-powered flight finder.",
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
    title: "SkyRoutesAI - Find Flights Within Your Budget",
    description: "Discover where you can fly from your departure city within your budget over the next 1-6 months. AI-powered flight finder.",
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
    title: "SkyRoutesAI - Find Flights Within Your Budget",
    description: "Discover where you can fly from your departure city within your budget over the next 1-6 months.",
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
      "No account required",
    ],
  };

  return (
    <html lang="en">
      <head>
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3373780887120786"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

