import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Analytics from "./components/Analytics";
import { Footer } from "./components/Footer";
import { CookieBanner } from "./components/CookieBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 🌍 SEO internacional + OpenGraph
export const metadata: Metadata = {
  title: "que-hora.com - La hora actual y el clima en tu ciudad",
  description:
    "Consulta la hora y el clima actual con Sunvalis, en tiempo real y con precisión.",
  metadataBase: new URL("https://que-hora.com"),
  alternates: {
    canonical: "https://que-hora.com/es",
    languages: {
      es: "https://que-hora.com/es",
      en: "https://que-hora.com/en",
    },
  },
  openGraph: {
    title: "que-hora.com - Hora actual y clima en tiempo real",
    description:
      "Consulta la hora y el clima actual en cualquier ciudad del mundo.",
    url: "https://que-hora.com/es",
    siteName: "que-hora.com",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "https://que-hora.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "que-hora.com - Hora y clima actual",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "que-hora.com - Hora actual y clima",
    description:
      "Consulta la hora y el clima actual en cualquier ciudad del mundo, en tiempo real.",
    images: ["https://que-hora.com/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        {/* Contenido principal */}
        <main className="flex-grow">{children}</main>

        {/* 🍪 Banner cookies + footer legal */}
        <CookieBanner />
        <Footer />

        {/* 📈 Google Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
