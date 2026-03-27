import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — Sport, échecs & expériences à Montpellier | Chess&Fit",
  description: "Conseils, guides et inspirations sur les échecs, le MMA, le fitness fonctionnel et les meilleures expériences à vivre à Montpellier. Le blog Chess&Fit.",
};

const articles = [
  {
    slug: "activites-originales-montpellier",
    title: "7 activités originales à faire à Montpellier ce week-end",
    excerpt: "Vous cherchez une sortie vraiment différente à Montpellier ? Escape games, sport en villa privée, montgolfière, gorges de l'Hérault… Notre sélection des expériences les plus insolites du sud de la France.",
    date: "20 mars 2026",
    readTime: "9 min",
    tag: "Lifestyle",
    tagSlug: "lifestyle",
    num: "01",
  },
  {
    slug: "team-building-montpellier-guide",
    title: "Team building à Montpellier : le guide complet 2026",
    excerpt: "Organisez un team building qui marque vraiment les esprits. Sport, stratégie, convivialité, cadre méditerranéen — le guide complet pour sortir du classique bowling et karting.",
    date: "10 mars 2026",
    readTime: "10 min",
    tag: "Entreprise",
    tagSlug: "entreprise",
    num: "02",
  },
  {
    slug: "echecs-ameliorent-performances-sportives",
    title: "Pourquoi les échecs améliorent vos performances sportives",
    excerpt: "La science le confirme : concentration, gestion du stress, prise de décision sous pression. La pratique des échecs transforme les athlètes. Voici pourquoi.",
    date: "15 mars 2026",
    readTime: "8 min",
    tag: "Corps & Esprit",
    tagSlug: "corps-esprit",
    num: "03",
  },
  {
    slug: "apprendre-echecs-adulte-debutant",
    title: "Apprendre les échecs adulte : le guide complet pour débutants",
    excerpt: "Vous pensez que les échecs c'est réservé aux surdoués ou aux enfants prodiges ? Ce guide démystifie tout et vous donne une vraie méthode pour progresser rapidement.",
    date: "10 avril 2026",
    readTime: "10 min",
    tag: "Échecs",
    tagSlug: "echecs",
    num: "04",
  },
  {
    slug: "initiation-mma-debutant-guide",
    title: "Initiation au MMA : tout ce qu'il faut savoir avant de commencer",
    excerpt: "Oubliez les clichés. Une initiation MMA c'est fun, bienveillant, et accessible à tous. Ce guide vous prépare à votre première séance — peu importe votre niveau.",
    date: "20 avril 2026",
    readTime: "9 min",
    tag: "Sport",
    tagSlug: "sport",
    num: "05",
  },
  {
    slug: "bienfaits-echecs-cerveau-concentration",
    title: "Les bienfaits des échecs sur le cerveau : ce que dit la science",
    excerpt: "Mémoire, concentration, prévention du déclin cognitif, intelligence émotionnelle… Les neurosciences ont beaucoup à dire sur les effets des échecs sur le cerveau.",
    date: "15 avril 2026",
    readTime: "8 min",
    tag: "Corps & Esprit",
    tagSlug: "corps-esprit",
    num: "06",
  },
  {
    slug: "idee-cadeau-experience-original",
    title: "Idée cadeau expérience original : 12 idées inoubliables",
    excerpt: "Offrir un objet, c'est bien. Offrir un souvenir, c'est pour la vie. Notre sélection des 12 meilleures expériences à offrir, pour tous les profils et tous les budgets.",
    date: "5 avril 2026",
    readTime: "9 min",
    tag: "Lifestyle",
    tagSlug: "lifestyle",
    num: "07",
  },
  {
    slug: "sortie-groupe-montpellier",
    title: "Sortie en groupe à Montpellier : les 10 meilleures idées",
    excerpt: "Entre amis, en famille, entre collègues — Montpellier regorge d'activités taillées pour les groupes. Du sport en villa privée aux randonnées dans les gorges, voici nos 10 coups de cœur.",
    date: "1er avril 2026",
    readTime: "8 min",
    tag: "Lifestyle",
    tagSlug: "lifestyle",
    num: "08",
  },
  {
    slug: "fitness-fonctionnel-bienfaits",
    title: "Fitness fonctionnel : bienfaits, exercices et conseils pour débuter",
    excerpt: "Le fitness fonctionnel, c'est bouger comme la vie le demande. Moins de machines, plus de résultats. Ce guide vous explique tout pour commencer sur de bonnes bases.",
    date: "25 avril 2026",
    readTime: "8 min",
    tag: "Sport",
    tagSlug: "sport",
    num: "09",
  },
  {
    slug: "combiner-sport-strategie-performance",
    title: "Combiner sport et stratégie : la méthode des champions",
    excerpt: "Federer, Djokovic, les meilleurs combattants MMA — tous ont compris que le corps seul ne suffit pas. Découvrez comment entraîner votre cerveau autant que vos muscles.",
    date: "1er mai 2026",
    readTime: "9 min",
    tag: "Corps & Esprit",
    tagSlug: "corps-esprit",
    num: "10",
  },
  {
    slug: "journee-bien-etre-originale",
    title: "Journée bien-être originale : idées pour une vraie pause",
    excerpt: "Le spa c'est bien, mais le vrai ressourcement va plus loin. Corps, esprit, convivialité, nature — comment construire une journée qui vous recharge vraiment.",
    date: "5 mai 2026",
    readTime: "8 min",
    tag: "Lifestyle",
    tagSlug: "lifestyle",
    num: "11",
  },
];

export default function BlogPage() {
  return (
    <main className="blog">
      <section className="blog__hero">
        <div className="container">
          <Link href="/" className="blog__back">← Retour au site</Link>
          <span className="blog__hero-label">Le blog</span>
          <h1>Inspirations<br />&amp; conseils</h1>
          <p className="blog__hero-sub">Sport, stratégie, expériences — on partage ce qu&apos;on sait.</p>
        </div>
      </section>

      <section className="blog__grid">
        <div className="container">
          <div className="blog__articles">
            {articles.map((article) => (
              <Link
                href={`/blog/${article.slug}`}
                key={article.slug}
                className="blog__card"
              >
                <div>
                  <div className="blog__card-meta">
                    <span className={`blog__tag blog__tag--${article.tagSlug}`}>{article.tag}</span>
                    <span className="blog__card-num">{article.num}</span>
                  </div>
                  <h2>{article.title}</h2>
                  <p>{article.excerpt}</p>
                </div>
                <div className="blog__card-footer">
                  <div className="blog__card-info">
                    <span className="blog__date">{article.date}</span>
                    <span className="blog__read-more">· {article.readTime}</span>
                  </div>
                  <span className="blog__card-arrow">↗</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
