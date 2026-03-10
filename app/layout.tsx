import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito-var",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover" as const,
  themeColor: "#075E54",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://heygamo.com"),
  title: {
    default: "GAMO — Your Personal Assistant on WhatsApp",
    template: "%s | GAMO",
  },
  description:
    "Text, send voice notes, or photos in your language. Get help back instantly. No app to download — just WhatsApp.",
  keywords: [
    "immigrant help",
    "WhatsApp assistant",
    "multilingual",
    "GAMO",
    "new to US",
    "immigrant resources",
    "bills help",
    "healthcare help",
  ],
  openGraph: {
    title: "GAMO — Your Personal Assistant on WhatsApp",
    description:
      "Real help in any language, right on WhatsApp. Bills, healthcare, rights — we explain it all.",
    type: "website",
    url: "https://heygamo.com",
    siteName: "GAMO",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "GAMO — Your Personal Assistant on WhatsApp",
    description:
      "Real help in any language, right on WhatsApp. Bills, healthcare, rights — we explain it all.",
  },
  alternates: {
    canonical: "https://heygamo.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={nunito.variable}>
      <head>
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        <a
          href="#main-content"
          className="fixed left-2 top-2 z-[100] -translate-y-20 rounded-md bg-gamo-accent px-4 py-2 text-sm font-bold text-white transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
