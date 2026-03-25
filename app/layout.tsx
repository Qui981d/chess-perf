import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chess&Perf — Sport, Échecs & Soleil à Montpellier",
  description:
    "Une journée d'exception mêlant fitness, MMA, gastronomie et échecs dans une villa de rêve à Montpellier. Réservez votre expérience Chess&Perf.",
  keywords: [
    "chess",
    "échecs",
    "sport",
    "fitness",
    "MMA",
    "Montpellier",
    "expérience",
    "team building",
    "villa",
  ],
  openGraph: {
    title: "Chess&Perf — Sport, Échecs & Soleil à Montpellier",
    description:
      "Une journée d'exception mêlant fitness, MMA, gastronomie et échecs dans une villa de rêve à Montpellier.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
