import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

import Analytics from "./components/Analytics";
import { Footer } from "./components/Footer";
import { CookieBanner } from "./components/CookieBanner";
import { siteName, siteUrl } from "./seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "que-hora.com - Hora actual y clima",
    template: "%s",
  },
  description:
    "Consulta la hora actual, la fecha y el clima local en tiempo real.",
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [
      { url: "/qh-filled-favicon.ico" },
      { url: "/qh-navy-favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/qh-navy-favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: ["/qh-filled-favicon.ico"],
    apple: [
      { url: "/qh-navy-favicon-180.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "que-hora.com - Hora actual y clima en tiempo real",
    description:
      "Consulta la hora y el clima actual en cualquier ciudad del mundo.",
    url: siteUrl,
    siteName,
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "que-hora.com - Hora actual y clima",
    description:
      "Consulta la hora y el clima actual en cualquier ciudad del mundo, en tiempo real.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const lang = headersList.get("x-site-locale") || "es";

  return (
    <html lang={lang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <main className="flex-grow">{children}</main>
        <CookieBanner />
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
