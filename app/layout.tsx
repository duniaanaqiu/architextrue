import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { OrganizationSchema } from "@/components/shared/OrganizationSchema";

// Font configuration from DESIGN.md
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

// Base URL for the domain
const BASE_URL = "https://architextrue.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "ARCHITEXTRUE - Jasa Bangun Rumah Mewah di Yogyakarta",
    template: "%s | ARCHITEXTRUE",
  },
  description: "Kontraktor spesialis rumah mewah dengan kualitas pengerjaan terbaik dan transparan di Yogyakarta. Jasa bangun rumah dan renovasi rumah premium.",
  keywords: ["jasa bangun rumah", "jasa renovasi rumah", "kontraktor Yogyakarta", "rumah mewah", "konstruksi hunian", "architextrue"],
  authors: [{ name: "ARCHITEXTRUE" }],
  creator: "ARCHITEXTRUE",
  publisher: "ARCHITEXTRUE",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: BASE_URL,
    title: "ARCHITEXTRUE - Jasa Bangun Rumah Mewah di Yogyakarta",
    description: "Kontraktor spesialis rumah mewah dengan kualitas pengerjaan terbaik dan transparan di Yogyakarta.",
    siteName: "ARCHITEXTRUE",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "ARCHITEXTRUE - Jasa Bangun Rumah Mewah di Yogyakarta",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ARCHITEXTRUE - Jasa Bangun Rumah Mewah di Yogyakarta",
    description: "Kontraktor spesialis rumah mewah dengan kualitas pengerjaan terbaik dan transparan di Yogyakarta.",
    images: [`${BASE_URL}/twitter-image.png`],
    creator: "@architextrue",
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
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-icon.png" },
    ],
  },
  manifest: `${BASE_URL}/manifest.json`,
  verification: {
    // Add Google Search Console verification here
    // google: "verification_token",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${playfairDisplay.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        {/* Font preloads */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        
        {/* Material Symbols for icons */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=block"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-on-background font-body-md">
        <OrganizationSchema />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}