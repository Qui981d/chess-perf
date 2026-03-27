import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://chessandfit.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://chessandfit.com/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // Cluster : Activités & expériences Montpellier
    {
      url: "https://chessandfit.com/blog/activites-originales-montpellier",
      lastModified: new Date("2026-03-20"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://chessandfit.com/blog/team-building-montpellier-guide",
      lastModified: new Date("2026-03-10"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://chessandfit.com/blog/sortie-groupe-montpellier",
      lastModified: new Date("2026-04-01"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://chessandfit.com/blog/idee-cadeau-experience-original",
      lastModified: new Date("2026-04-05"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Cluster : Échecs
    {
      url: "https://chessandfit.com/blog/echecs-ameliorent-performances-sportives",
      lastModified: new Date("2026-03-15"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://chessandfit.com/blog/apprendre-echecs-adulte-debutant",
      lastModified: new Date("2026-04-10"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://chessandfit.com/blog/bienfaits-echecs-cerveau-concentration",
      lastModified: new Date("2026-04-15"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Cluster : Sport & MMA
    {
      url: "https://chessandfit.com/blog/initiation-mma-debutant-guide",
      lastModified: new Date("2026-04-20"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://chessandfit.com/blog/fitness-fonctionnel-bienfaits",
      lastModified: new Date("2026-04-25"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Cluster : Corps & esprit / Lifestyle
    {
      url: "https://chessandfit.com/blog/combiner-sport-strategie-performance",
      lastModified: new Date("2026-05-01"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://chessandfit.com/blog/journee-bien-etre-originale",
      lastModified: new Date("2026-05-05"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
