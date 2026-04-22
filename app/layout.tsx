import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import { LanguageProvider } from "@/context/language-context";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kallipas.com"),
  title: {
    default: "Kallipas | Global Real Estate Marketplace",
    template: "%s | Kallipas Global"
  },
  description: "The first global real estate platform with zero language barriers, verified private sellers, and instant virtual tours.",
  keywords: ["global real estate", "property marketplace", "virtual property tours", "international real estate", "verified sellers", "Kallipas"],
  authors: [{ name: "Kallipas Global" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kallipas.com",
    siteName: "Kallipas Global",
    title: "Kallipas | Global Real Estate Marketplace",
    description: "Own property anywhere. The global standard for real estate excellence with AI translation and verified members.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kallipas Global Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kallipas | Global Real Estate Marketplace",
    description: "The first global real estate platform with zero language barriers and verified members.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.png",
  },
};

import CookieConsent from "@/components/legal/cookie-consent";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jar = await cookies()
  const initialLang = jar.get('kallipas_lang')?.value ?? 'EN'

  return (
    <html
      lang={initialLang.toLowerCase()}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider initialLang={initialLang}>
          {children}
          <CookieConsent />
        </LanguageProvider>
      </body>
    </html>
  );
}
