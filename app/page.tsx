"use client";

import { Fragment, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Toaster, toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { ChevronDown } from "lucide-react";

// --- Form Schema ---
const bookingSchema = z.object({
  firstName: z.string().min(2, "Prénom requis"),
  lastName: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  date: z.string().optional(),
  message: z.string().optional(),
});
type BookingFormValues = z.infer<typeof bookingSchema>;

// --- Reveal Component ---
const Reveal = ({ children, className = "", delay = 0, style }: { children: React.ReactNode, className?: string, delay?: number, style?: React.CSSProperties }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
    className={className}
    style={style}
  >
    {children}
  </motion.div>
);

// --- FAQ Data ---
const faqs = [
  { q: "Dois-je amener mon propre jeu d'échecs ?", a: "Non, nous fournissons des jeux en bois Staunton haut de gamme pour toutes les parties et cours." },
  { q: "Quel niveau physique est requis pour le MMA ?", a: "Aucun ! Notre coach adapte la séance à 100%. Que vous soyez sédentaire ou athlète, vous progresserez en toute sécurité." },
  { q: "Et si la météo n'est pas clémente ?", a: "La villa dispose d'un vaste espace vitré très lumineux. Le programme se déroule tout aussi bien en intérieur qu'en extérieur." },
  { q: "Le repas est-il adapté aux régimes spéciaux ?", a: "Absolument. Lors de la confirmation, nous vous demanderons vos préférences ou intolérances (végétarien, sans gluten, etc.)." }
];

export default function HomePage() {
  // Navigation State
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  const { scrollY } = useScroll();
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 60);
    // Hide nav on scroll down, show on scroll up (if past hero)
    if (latest > 150 && latest > previous && !mobileMenuOpen) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  // Form State
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema)
  });

  const onSubmit = async (data: BookingFormValues) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        toast.success(`Merci ${data.firstName} !`, {
          description: "Votre demande de réservation a bien été envoyée. Nous revenons vers vous d'ici 24h.",
          duration: 5000,
        });
        reset();
        resolve(true);
      }, 1500);
    });
  };

  // Chess Easter Egg State — Pool de puzzles Mat en 1
  const puzzles = [
    { fen: "r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4", hint: "Un classique des ouvertures..." },
    { fen: "rnbqkbnr/ppppp2p/8/5ppQ/4P3/8/PPPP1PPP/RNB1KBNR w KQkq g6 0 3", hint: "Les pions ont trop bougé..." },
    { fen: "rnbqkbnr/pppp1ppp/4p3/8/6P1/5P2/PPPPP2P/RNBQKBNR b KQkq - 0 2", hint: "Le Roi blanc est très exposé..." },
    { fen: "r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5Q2/PPPP1PPP/RNB1K1NR w KQkq - 4 4", hint: "Cherchez la case faible..." },
  ];

  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const currentPuzzle = puzzles[puzzleIndex];
  const [game, setGame] = useState(new Chess(puzzles[0].fen));
  const [solved, setSolved] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const randomIdx = Math.floor(Math.random() * puzzles.length);
    setPuzzleIndex(randomIdx);
    setGame(new Chess(puzzles[randomIdx].fen));
    setIsMounted(true);
  }, []);

  const makeMove = ({ sourceSquare, targetSquare }: { sourceSquare: string, targetSquare: string | null }) => {
    if (!targetSquare) return false;
    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q',
      });

      if (move === null) return false;
      
      const newGame = new Chess(game.fen());
      setGame(newGame);

      if (newGame.isCheckmate()) {
        setTimeout(() => {
          setSolved(true);
          toast.success("Brillant !", { description: "Mat en 1 trouvé. Mentionnez-le dans votre réservation pour un accueil spécial !" });
        }, 300);
      } else {
        // Mauvais coup — reset après un court délai
        setTimeout(() => {
          toast.error("Raté !", { description: "Ce n'est pas le mat. Réessayez !" });
          setGame(new Chess(currentPuzzle.fen));
        }, 800);
      }
      return true;
    } catch (e) {
      return false;
    }
  };

  // FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Toaster position="bottom-right" richColors theme="light" />

      {/* ======================== NAVIGATION ======================== */}
      <motion.nav 
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" }
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`nav ${scrolled || mobileMenuOpen ? "nav--scrolled" : ""}`}
      >
        <a href="#" className="nav__logo">
          Chess<span>&amp;</span>Fit
        </a>

        <ul className="nav__links">
          <li><a className="nav__link" onClick={() => scrollToSection("experience")}>L&apos;expérience</a></li>
          <li><a className="nav__link" onClick={() => scrollToSection("journee")}>La journée</a></li>
          <li><a className="nav__link" onClick={() => scrollToSection("cadre")}>Le cadre</a></li>
          <li><a className="nav__link" onClick={() => scrollToSection("equipe")}>L&apos;équipe</a></li>
          <li><a className="nav__link" href="/blog">Blog</a></li>
          <li><a className="nav__cta" onClick={() => scrollToSection("reserver")}>Réserver</a></li>
        </ul>

        <button
          className={`nav__hamburger ${mobileMenuOpen ? "nav__hamburger--open" : ""}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          <span></span><span></span><span></span>
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <div className={`nav__mobile-menu ${mobileMenuOpen ? "nav__mobile-menu--open" : ""}`}>
        <a className="nav__link" onClick={() => scrollToSection("experience")}>L&apos;expérience</a>
        <a className="nav__link" onClick={() => scrollToSection("journee")}>La journée</a>
        <a className="nav__link" onClick={() => scrollToSection("cadre")}>Le cadre</a>
        <a className="nav__link" onClick={() => scrollToSection("equipe")}>L&apos;équipe</a>
        <a className="nav__link" href="/blog">Blog</a>
        <a className="nav__cta" onClick={() => scrollToSection("reserver")}>Réserver ma journée</a>
      </div>

      {/* ======================== HERO ======================== */}
      <section className="hero" id="hero">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="hero__bg"
        >
          {/* Video hero — place ton fichier dans /public/videos/hero.mp4 */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="hero__video"
          >
            <source src="/Video/Vid%C3%A9o_G%C3%A9n%C3%A9r%C3%A9e_%C3%A0_Partir_d_Images.mp4" type="video/mp4" />
          </video>
          <div className="hero__overlay" />
        </motion.div>

        <div className="hero__content">
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
            className="hero__label"
          >
            Montpellier · Sud de France
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1 }}
            className="hero__title"
          >
            Sport, échecs <span className="hero__title-accent">&amp;</span><br />soleil
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }}
            className="hero__subtitle"
          >
            Une journée d&apos;exception où le corps s&apos;éveille et l&apos;esprit s&apos;affûte. Fitness, gastronomie et échecs dans une villa de rêve.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8 }}
            className="hero__actions"
          >
            <button className="btn btn--primary btn--large" onClick={() => scrollToSection("reserver")}>Réserver ma journée</button>
            <button className="btn btn--white btn--large" onClick={() => scrollToSection("experience")}>Découvrir l&apos;expérience</button>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
          className="hero__scroll-indicator"
        >
          <span>Scroll</span>
          <div className="hero__scroll-line" />
        </motion.div>
      </section>

      {/* ======================== EXPERIENCE ======================== */}
      <section className="section section--cream" id="experience">
        <div className="container">
          <Reveal className="section__header">
            <span className="label">Le concept</span>
            <h2>Trois piliers,<br />une seule journée</h2>
            <p>Chess&amp;Fit, c&apos;est bien plus qu&apos;une simple activité. C&apos;est une parenthèse complète pour le corps et l&apos;esprit, dans un cadre qui fait le reste.</p>
          </Reveal>
        </div>

        <div className="experience__rows">
          {/* Row 1: Sport */}
          <div className="experience__row">
            <Reveal className="experience__visual" delay={0.2}>
              <Image src="/images/sport-deck.png" alt="Séance fitness sur la terrasse bois" fill style={{ objectFit: "cover" }} sizes="50vw" />
            </Reveal>
            <div className="experience__text">
              <span className="experience__number">01</span>
              <Reveal>
                <div className="experience__accent-line" />
                <span className="label">Sport</span>
                <h3>Le corps en mouvement</h3>
                <p>Fitness fonctionnel et initiation MMA encadrés par un coach agréé. Peu importe votre niveau, on s&apos;adapte. L&apos;idée ? Transpirer, se dépasser et sourire.</p>
              </Reveal>
            </div>
          </div>

          {/* Row 2: Gastronomie */}
          <div className="experience__row">
            <Reveal className="experience__visual" delay={0.2}>
              <Image src="/images/lunch-patio.png" alt="Déjeuner sain sur la grande terrasse" fill style={{ objectFit: "cover" }} sizes="50vw" />
            </Reveal>
            <div className="experience__text">
              <span className="experience__number">02</span>
              <Reveal>
                <div className="experience__accent-line" />
                <span className="label label--gold">Gastronomie</span>
                <h3>La pause qui fait du bien</h3>
                <p>Un déjeuner convivial préparé avec soin, servi en plein air. Le moment parfait pour reprendre son souffle et échanger avant de passer aux échecs.</p>
              </Reveal>
            </div>
          </div>

          {/* Row 3: Échecs */}
          <div className="experience__row">
            <Reveal className="experience__visual" delay={0.2}>
              <Image src="/images/chess-patio.png" alt="Partie d'échecs sur la terrasse de la villa" fill style={{ objectFit: "cover" }} sizes="50vw" />
            </Reveal>
            <div className="experience__text">
              <span className="experience__number">03</span>
              <Reveal>
                <div className="experience__accent-line" />
                <span className="label" style={{ color: "var(--terracotta)" }}>Échecs</span>
                <h3>L&apos;esprit en jeu</h3>
                <p>Cours et parties accompagnées par un professeur d&apos;échecs passionné. Débutants bienvenus. Stratégie, concentration et plaisir du jeu.</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ======================== LA JOURNÉE ======================== */}
      <section className="section section--white" id="journee">
        <div className="container">
          <Reveal className="section__header">
            <span className="label label--gold">Votre journée type</span>
            <h2>Du lever au fou rire,<br /><span style={{ color: "var(--terracotta)" }}>minute par minute</span></h2>
          </Reveal>

          <div className="journey__timeline">
            {[
              { time: "9h00", title: "Accueil & café", desc: "Arrivée à la villa. On pose ses affaires, on prend un café, on fait connaissance. Le cadre fait le reste — jardin, piscine, soleil.", img: "/images/69aa487a.jpg" },
              { time: "10h00 – 12h00", title: "Fitness & MMA", desc: "Deux heures encadrées par un coach agréé. Renforcement musculaire, cardio, et initiation aux techniques de MMA. Tous niveaux, bonne humeur garantie.", img: "/images/sport-deck.png" },
              { time: "12h30", title: "Déjeuner au soleil", desc: "Repas frais et convivial servi en terrasse. Le moment de reprendre des forces, discuter stratégie, et profiter du cadre exceptionnel.", img: "/images/lunch-patio.png" },
              { time: "14h00 – 17h00", title: "Échecs & stratégie", desc: "Cours, parties et analyse de jeu avec un professeur d'échecs. Que vous soyez débutant ou joueur confirmé, chaque partie est un plaisir.", img: "/images/chess-patio.png" }
            ].map((step, idx) => (
              <Reveal key={idx} className="journey__step" delay={idx * 0.1}>
                <div className="journey__dot" />
                <div className="journey__image">
                  <Image src={step.img} alt={step.title} width={600} height={450} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                </div>
                <div className="journey__info">
                  <span className="journey__time">{step.time}</span>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== CADRE ======================== */}
      <section className="section section--cream" id="cadre">
        <div className="container">
          <Reveal className="section__header">
            <span className="label">Le cadre</span>
            <h2>Une villa d&apos;exception<br /><span style={{ color: "var(--terracotta)" }}>au cœur de Montpellier</span></h2>
          </Reveal>

          <Reveal className="cadre__image-wrapper">
            <Image src="/images/69aa487a.jpg" alt="Villa méditerranéenne" fill style={{ objectFit: "cover" }} sizes="100vw" />
            <div className="cadre__overlay-content">
              <span className="label">Montpellier · Hérault</span>
              <h2>Votre écrin pour la journée</h2>
              <p>Une villa méditerranéenne baignée de soleil, avec jardin privatif et piscine. Le cadre idéal pour une journée hors du temps.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ======================== L'ÉQUIPE — COACHES ======================== */}
      <section className="section section--cream coaches-section" id="equipe">
        <div className="container">
          <Reveal className="coaches__header">
            <span className="label label--gold">L&apos;équipe</span>
            <h2>Ceux qui encadrent<br /><span style={{ color: "var(--terracotta)" }}>votre journée</span></h2>
            <p>Deux spécialistes triés sur le volet pour que chaque heure soit maîtrisée, chaleureuse et inoubliable.</p>
          </Reveal>
        </div>

        <div className="coaches-diptych">
          {/* Coach Sport */}
          <Reveal className="coaches-diptych__pane">
            <div className="coaches-diptych__photo">
              <Image src="/images/coach-sport-hero.png" alt="Coach sportif encadrant une séance fitness" fill style={{ objectFit: "cover" }} sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
            <div className="coaches-diptych__overlay coaches-diptych__overlay--sport" />
            <div className="coaches-diptych__content">
              <div className="coaches-diptych__tag">
                <span className="coaches-diptych__tag-line" />
                <span className="coaches-diptych__tag-text">Sport &amp; MMA</span>
              </div>
              <h3 className="coaches-diptych__name">Le Coach Sportif</h3>
              <p className="coaches-diptych__role">Préparateur physique · MMA · Fitness fonctionnel</p>
              <blockquote className="coaches-diptych__quote">
                &ldquo;Le sport n&apos;est pas une question de performance, c&apos;est une question de dépassement de soi.&rdquo;
              </blockquote>
              <div className="coaches-diptych__stats">
                <div className="coaches-diptych__stat">
                  <span className="coaches-diptych__stat-val">10+</span>
                  <span className="coaches-diptych__stat-lbl">Ans d&apos;expérience</span>
                </div>
                <div className="coaches-diptych__stat">
                  <span className="coaches-diptych__stat-val">500+</span>
                  <span className="coaches-diptych__stat-lbl">Élèves coachés</span>
                </div>
                <div className="coaches-diptych__stat">
                  <span className="coaches-diptych__stat-val">BPJEPS</span>
                  <span className="coaches-diptych__stat-lbl">Diplôme d&apos;État</span>
                </div>
              </div>
              <div className="coaches-diptych__credentials">
                {["MMA", "Cross-Training", "Prépa physique", "Self-défense"].map((cred, i) => (
                  <span key={i} className="coaches-diptych__credential">{cred}</span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Coach Échecs */}
          <Reveal className="coaches-diptych__pane" delay={0.15}>
            <div className="coaches-diptych__photo">
              <Image src="/images/coach-chess-hero.png" alt="Maître d'échecs enseignant la stratégie" fill style={{ objectFit: "cover" }} sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
            <div className="coaches-diptych__overlay coaches-diptych__overlay--chess" />
            <div className="coaches-diptych__content">
              <div className="coaches-diptych__tag">
                <span className="coaches-diptych__tag-line" />
                <span className="coaches-diptych__tag-text">Échecs &amp; Stratégie</span>
              </div>
              <h3 className="coaches-diptych__name">Le Maître d&apos;Échecs</h3>
              <p className="coaches-diptych__role">Professeur d&apos;échecs · Formateur · Compétiteur</p>
              <blockquote className="coaches-diptych__quote">
                &ldquo;Aux échecs comme dans la vie, c&apos;est celui qui voit le plus loin qui gagne la partie.&rdquo;
              </blockquote>
              <div className="coaches-diptych__stats">
                <div className="coaches-diptych__stat">
                  <span className="coaches-diptych__stat-val">15+</span>
                  <span className="coaches-diptych__stat-lbl">Ans de pratique</span>
                </div>
                <div className="coaches-diptych__stat">
                  <span className="coaches-diptych__stat-val">2000+</span>
                  <span className="coaches-diptych__stat-lbl">Classement ELO</span>
                </div>
                <div className="coaches-diptych__stat">
                  <span className="coaches-diptych__stat-val">FFE</span>
                  <span className="coaches-diptych__stat-lbl">Compétiteur</span>
                </div>
              </div>
              <div className="coaches-diptych__credentials">
                {["Pédagogie", "Stratégie", "Ouvertures", "Analyse de parties"].map((cred, i) => (
                  <span key={i} className="coaches-diptych__credential">{cred}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ======================== QUI SOMMES-NOUS ======================== */}
      <section className="section section--white founders" id="histoire">
        <div className="container container--narrow">
          <Reveal className="section__header">
            <span className="label">Notre histoire</span>
            <h2>Deux frères,<br /><span style={{ color: "var(--terracotta)" }}>une idée folle</span></h2>
          </Reveal>

          <div className="founders__duo">
            <Reveal className="founders__half" delay={0}>
              <div className="founders__symbol founders__symbol--chess">♟</div>
              <blockquote className="founders__pull">
                &ldquo;Aux échecs, j&apos;ai appris à ralentir.&rdquo;
              </blockquote>
              <p className="founders__text">
                Joueur depuis l&apos;adolescence, les échecs m&apos;ont transformé — pas seulement en stratège, mais en quelqu&apos;un capable de voir les choses autrement. Depuis, j&apos;ai voulu faire découvrir cette magie à ceux qui n&apos;ont jamais osé s&apos;y mettre.
              </p>
            </Reveal>

            <div className="founders__divider" aria-hidden="true">
              <span className="founders__divider-amp">&amp;</span>
            </div>

            <Reveal className="founders__half" delay={0.15}>
              <div className="founders__symbol founders__symbol--sport">⚔</div>
              <blockquote className="founders__pull">
                &ldquo;Le sport m&apos;a appris à me dépasser.&rdquo;
              </blockquote>
              <p className="founders__text">
                Arts martiaux, fitness, préparation physique — le sport est mon langage depuis toujours. Pas pour la compétition, mais pour le plaisir de se sentir vivant dans son corps. Et pour partager ça avec les autres.
              </p>
            </Reveal>
          </div>

          <Reveal className="founders__vision">
            <p className="founders__vision-text">
              Un jour, on a eu une idée simple : <em>et si ces deux univers qu&apos;on chérit pouvaient se rejoindre le temps d&apos;une journée ?</em> Dans un cadre d&apos;exception, avec les bonnes personnes, pour vivre quelque chose de rare. Chess&amp;Fit est née comme ça — d&apos;une conversation entre frères, d&apos;une conviction que le corps et l&apos;esprit méritent d&apos;être chouchoutés le même jour.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ======================== CHESS WIDGET ======================== */}
      <section className="section section--white" style={{ paddingBottom: 0 }}>
        <div className="container">
          <Reveal className="section__header" style={{ marginBottom: 0 }}>
            <span className="label" style={{ color: "var(--terracotta)" }}>L&apos;Instant Stratégie</span>
            <h2>Trouvez le Mat en 1</h2>
            <p>{game.turn() === 'w' ? 'Les blancs' : 'Les noirs'} jouent et gagnent. Un nouveau puzzle à chaque visite !</p>
          </Reveal>
          
          <Reveal className="chess-widget">
             <div className="chess-widget__container">
               {isMounted && (
                 <p style={{ fontSize: "0.85rem", color: "var(--charcoal-light)", fontStyle: "italic", textAlign: "center", marginBottom: "var(--space-md)" }}>
                   💡 {currentPuzzle.hint}
                 </p>
               )}
               {isMounted ? (
                 <div style={{ width: "100%", aspectRatio: "1/1" }}>
                   <Chessboard 
                     options={{
                       position: game.fen(),
                       boardOrientation: "white",
                       onPieceDrop: makeMove,
                       darkSquareStyle: { backgroundColor: "#D4956F" },
                       lightSquareStyle: { backgroundColor: "#F0E9DF" },
                       dropSquareStyle: { boxShadow: "inset 0 0 1px 4px #D4B05A" },
                       allowDragging: !solved
                     }}
                   />
                 </div>
               ) : (
                 <div style={{ aspectRatio: "1/1", width: "100%", background: "var(--cream)" }} />
               )}
               
               <AnimatePresence>
                {solved && (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="chess-widget__success"
                  >
                    <div className="chess-widget__success-icon">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                    </div>
                    <h3 style={{ fontSize: "1.5rem", fontFamily: "var(--font-display)", marginBottom: "var(--space-sm)" }}>Excellent !</h3>
                    <p style={{ fontSize: "0.85rem", color: "var(--charcoal-light)" }}>Précisez &quot;Mat trouvé&quot; dans le message de réservation.</p>
                  </motion.div>
                )}
               </AnimatePresence>
             </div>
          </Reveal>
        </div>
      </section>

      {/* ======================== FAQ ======================== */}
      <section className="section section--white">
        <div className="container container--narrow">
          <Reveal className="section__header">
            <span className="label">Questions Fréquentes</span>
            <h2>Tout ce qu'il faut savoir</h2>
          </Reveal>

          <div className="faq-list">
            {faqs.map((faq, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div 
                  className={`faq-item ${openFaq === i ? 'faq-item--open' : ''}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <div className="faq-item__header">
                    <h4 className="faq-item__question">{faq.q}</h4>
                    <motion.div
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="faq-item__icon"
                    >
                      <ChevronDown size={24} />
                    </motion.div>
                  </div>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="faq-item__content"
                      >
                        <p className="faq-item__answer">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== RÉSERVER ======================== */}
      <section className="section section--sand" id="reserver">
        <div className="container">
          <Reveal className="booking__grid">
            <div className="booking__intro">
              <span className="label">On y est presque</span>
              <h2>Votre parenthèse<br /><span className="booking__intro-accent">commence ici</span></h2>
              <p>Remplissez vos informations, nous vous recontacterons sous 24h pour personnaliser votre journée (niveau d'échecs actuel, détails physiques).</p>

              <div className="booking__includes">
                {["Sport & sur-mesure (2h)", "Déjeuner sain du chef", "Masterclass d'échecs (3h)", "Privatisation complète"].map((inc, i) => (
                  <div key={i} className="booking__include"><span className="booking__include-icon">✓</span>{inc}</div>
                ))}
              </div>
            </div>

            <form className="booking__form" onSubmit={handleSubmit(onSubmit)}>
              <div className="booking__row">
                <div className="booking__field">
                  <input {...register("firstName")} type="text" className="booking__input" placeholder=" " id="bf" />
                  <label htmlFor="bf" className="booking__label">Prénom</label>
                  {errors.firstName && <span className="booking__error">{errors.firstName.message}</span>}
                </div>
                <div className="booking__field">
                  <input {...register("lastName")} type="text" className="booking__input" placeholder=" " id="bl" />
                  <label htmlFor="bl" className="booking__label">Nom</label>
                  {errors.lastName && <span className="booking__error">{errors.lastName.message}</span>}
                </div>
              </div>
              <div className="booking__field" style={{ marginTop: "1.5rem" }}>
                <input {...register("email")} type="email" className="booking__input" placeholder=" " id="be" />
                <label htmlFor="be" className="booking__label">Adresse email</label>
                {errors.email && <span className="booking__error">{errors.email.message}</span>}
              </div>
              <div className="booking__field" style={{ marginTop: "1.5rem" }}>
                <input {...register("date")} type="date" className="booking__input" placeholder=" " id="bd" />
                <label htmlFor="bd" className="booking__label">Date souhaitée</label>
              </div>
              <div className="booking__field" style={{ marginTop: "1.5rem" }}>
                <textarea {...register("message")} className="booking__input booking__textarea" placeholder=" " id="bm"></textarea>
                <label htmlFor="bm" className="booking__label">Un message particulier ?</label>
              </div>
              <button disabled={isSubmitting} type="submit" className="booking__submit" style={{ marginTop: "2rem", opacity: isSubmitting ? 0.7 : 1 }}>
                <span>{isSubmitting ? "Envoi..." : "Envoyer ma demande"}</span>
                <div className="booking__submit-line" />
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* ======================== FOOTER ======================== */}
      <footer className="footer">
        <div className="container">
          <div className="footer__content">
            <div>
              <div className="footer__logo">Chess<span>&amp;</span>Fit</div>
              <p className="footer__tagline">Sport, échecs &amp; soleil à Montpellier</p>
            </div>
            <div className="footer__links">
              <div className="footer__column">
                <h4>Navigation</h4>
                <a onClick={() => scrollToSection("experience")}>L&apos;expérience</a>
                <a onClick={() => scrollToSection("journee")}>La journée</a>
                <a onClick={() => scrollToSection("cadre")}>Le cadre</a>
                <a href="/blog">Blog</a>
              </div>
              <div className="footer__column">
                <h4>Contact</h4>
                <p>Montpellier, France</p>
                <a href="mailto:contact@chessandfit.com">contact@chessandfit.com</a>
              </div>
            </div>
          </div>
          <div className="footer__bottom">
            <p className="footer__copyright">© 2026 Chess&amp;Fit. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
