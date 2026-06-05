import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const BASE_URL = "https://splendorous-daffodil-c9b791.netlify.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "KhasCouture | Exquisite Couture Infused In Tradition",
    template: "%s | KhasCouture",
  },
  description:
    "KhasCouture — Bridal & Party Wear. Exquisite Pakistani couture infused in tradition. Located in Rawalpindi, Pakistan.",
  keywords: ["bridal wear", "party wear", "Pakistani couture", "Rawalpindi", "KhasCouture", "luxury fashion Pakistan"],
  openGraph: {
    title: "KhasCouture",
    description: "Exquisite Couture Infused In Tradition",
    type: "website",
    url: BASE_URL,
    siteName: "KhasCouture",
  },
  twitter: {
    card: "summary_large_image",
    title: "KhasCouture",
    description: "Exquisite Couture Infused In Tradition",
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "KhasCouture",
  url: BASE_URL,
  logo: `${BASE_URL}/logo2.jpg`,
  description: "Luxury Pakistani couture house in Rawalpindi specialising in bridal, party wear, and pret.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Shop No. G 58,59 Uper Ground, R.B 2 Plaza Rehmanabad",
    addressLocality: "Rawalpindi",
    postalCode: "46000",
    addressCountry: "PK",
  },
  sameAs: [
    "https://www.instagram.com/khascoutures",
    "https://www.threads.com/@khascoutures",
    "https://www.facebook.com/khascouture",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col bg-ivory text-charcoal antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFAB />
      </body>
    </html>
  );
}
