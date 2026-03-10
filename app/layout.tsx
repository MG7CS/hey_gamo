import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito-var",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GAMO — Your Personal Assistant on WhatsApp",
  description:
    "Text, send voice notes, or photos in your language. Get help back instantly. No app to download — just WhatsApp.",
  keywords: ["immigrant help", "WhatsApp assistant", "multilingual", "GAMO"],
  openGraph: {
    title: "GAMO — Your Personal Assistant on WhatsApp",
    description:
      "Ask anything in your language. Get help instantly on WhatsApp.",
    type: "website",
    url: "https://heygamo.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={nunito.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
