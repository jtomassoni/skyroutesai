import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SkyRoutesAI - Find Flights Within Your Budget",
  description: "Discover where you can fly from your departure city within your budget over the next 1-6 months. AI-powered flight finder.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

