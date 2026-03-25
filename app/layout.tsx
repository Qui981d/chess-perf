import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: 'swap',
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chessandperf.com"),
  title: "Chess&Perf — Sport, Échecs & Soleil à Montpellier",
  description:
    "Une journée d'exception mêlant fitness, MMA, gastronomie et échecs dans une villa de rêve à Montpellier. Réservez votre expérience ultra-premium.",
  keywords: [
    "chess", "échecs", "sport", "fitness", "MMA", "Montpellier", "expérience", "team building", "villa", "premium"
  ],
  openGraph: {
    title: "Chess&Perf — Sport, Échecs & Soleil",
    description: "Une journée d'exception mêlant fitness, MMA, gastronomie et échecs à Montpellier.",
    type: "website",
    url: "https://chessandperf.com",
    siteName: "Chess&Perf",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-body text-charcoal bg-cream overflow-x-hidden antialiased selection:bg-terracotta selection:text-white">
        {children}
      </body>
    </html>
  );
}
