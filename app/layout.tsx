import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./SmoothScroll";
import JsonLd from "./JsonLd";

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
  metadataBase: new URL("https://chessandfit.com"),
  title: {
    default: "Chess&Fit — Activité originale Sport & Échecs à Montpellier",
    template: "%s | Chess&Fit",
  },
  description:
    "Vivez une journée unique mêlant MMA, préparation physique et échecs dans une villa privée à Montpellier. Idéal entre amis, en solo ou en team building. Réservez votre expérience.",
  keywords: [
    "activité originale montpellier",
    "team building montpellier",
    "activité entre amis montpellier",
    "idée cadeau expérience montpellier",
    "activité insolite sud de la france",
    "expérience unique montpellier",
    "expérience sportive montpellier",
    "expérience immersive montpellier",
    "sortie originale montpellier",
    "week-end expérience sud france",
    "sport et échecs",
    "MMA montpellier",
    "journée sport montpellier",
    "Chess&Fit",
    "villa privée montpellier",
    "expérience premium montpellier",
  ],
  authors: [{ name: "Chess&Fit" }],
  creator: "Chess&Fit",
  openGraph: {
    title: "Chess&Fit — Sport, Échecs & Soleil à Montpellier",
    description: "Journée immersive MMA, échecs et convivialité dans une villa privée à Montpellier. Réservez votre expérience.",
    type: "website",
    url: "https://chessandfit.com",
    siteName: "Chess&Fit",
    locale: "fr_FR",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Chess&Fit — Journée sport et échecs à Montpellier",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chess&Fit — Activité Sport & Échecs à Montpellier",
    description: "Journée immersive MMA, échecs et convivialité dans une villa privée. Réservez.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://chessandfit.com",
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
        <JsonLd />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
