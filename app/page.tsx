"use client";

import { Fragment, useEffect, useState } from "react";
import Image from "next/image";

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal--visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Merci ! Nous reviendrons vers vous très vite.");
  };

  return (
    <>
      {/* ======================== NAVIGATION ======================== */}
      <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <a href="#" className="nav__logo">
          Chess<span>&amp;</span>Perf
        </a>

        <ul className="nav__links">
          <li>
            <a className="nav__link" onClick={() => scrollToSection("experience")}>
              L&apos;expérience
            </a>
          </li>
          <li>
            <a className="nav__link" onClick={() => scrollToSection("journee")}>
              La journée
            </a>
          </li>
          <li>
            <a className="nav__link" onClick={() => scrollToSection("cadre")}>
              Le cadre
            </a>
          </li>
          <li>
            <a className="nav__link" onClick={() => scrollToSection("equipe")}>
              L&apos;équipe
            </a>
          </li>
          <li>
            <a className="nav__cta" onClick={() => scrollToSection("reserver")}>
              Réserver
            </a>
          </li>
        </ul>

        <button
          className={`nav__hamburger ${mobileMenuOpen ? "nav__hamburger--open" : ""}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`nav__mobile-menu ${mobileMenuOpen ? "nav__mobile-menu--open" : ""}`}>
        <a className="nav__link" onClick={() => scrollToSection("experience")}>
          L&apos;expérience
        </a>
        <a className="nav__link" onClick={() => scrollToSection("journee")}>
          La journée
        </a>
        <a className="nav__link" onClick={() => scrollToSection("cadre")}>
          Le cadre
        </a>
        <a className="nav__link" onClick={() => scrollToSection("equipe")}>
          L&apos;équipe
        </a>
        <a className="nav__cta" onClick={() => scrollToSection("reserver")}>
          Réserver ma journée
        </a>
      </div>

      {/* ======================== HERO ======================== */}
      <section className="hero" id="hero">
        <div className="hero__bg">
          <Image
            src="/images/69aa487a.jpg"
            alt="Villa méditerranéenne de rêve à Montpellier"
            fill
            priority
            style={{ objectFit: "cover" }}
            sizes="100vw"
          />
          <div className="hero__overlay" />
        </div>

        <div className="hero__content">
          <p className="hero__label">Montpellier · Sud de France</p>
          <h1 className="hero__title">
            Sport, échecs <span className="hero__title-accent">&amp;</span>
            <br />
            soleil
          </h1>
          <p className="hero__subtitle">
            Une journée d&apos;exception où le corps s&apos;éveille et
            l&apos;esprit s&apos;affûte. Fitness, gastronomie et échecs dans
            une villa de rêve.
          </p>
          <div className="hero__actions">
            <button
              className="btn btn--primary btn--large"
              onClick={() => scrollToSection("reserver")}
            >
              Réserver ma journée
            </button>
            <button
              className="btn btn--white btn--large"
              onClick={() => scrollToSection("experience")}
            >
              Découvrir l&apos;expérience
            </button>
          </div>
        </div>

        <div className="hero__scroll-indicator">
          <span>Scroll</span>
          <div className="hero__scroll-line" />
        </div>
      </section>

      {/* ======================== EXPERIENCE ======================== */}
      <section className="section section--cream" id="experience">
        <div className="container">
          <div className="section__header reveal">
            <span className="label">Le concept</span>
            <h2>
              Trois piliers,<br />
              une seule journée
            </h2>
            <p>
              Chess&amp;Perf, c&apos;est bien plus qu&apos;une simple activité.
              C&apos;est une parenthèse complète pour le corps et l&apos;esprit,
              dans un cadre qui fait le reste.
            </p>
          </div>
        </div>

        <div className="experience__rows">
          {/* Row 1: Sport */}
          <div className="experience__row reveal">
            <div className="experience__visual">
              <Image
                src="/images/sport-deck.png"
                alt="Séance fitness sur la terrasse bois"
                fill
                style={{ objectFit: "cover" }}
                sizes="50vw"
              />
            </div>
            <div className="experience__text">
              <span className="experience__number">01</span>
              <div className="experience__accent-line" />
              <span className="label">Sport</span>
              <h3>Le corps en mouvement</h3>
              <p>
                Fitness fonctionnel et initiation MMA encadrés par un coach
                agréé. Peu importe votre niveau, on s&apos;adapte. L&apos;idée ?
                Transpirer, se dépasser et sourire.
              </p>
            </div>
          </div>

          {/* Row 2: Gastronomie */}
          <div className="experience__row reveal">
            <div className="experience__visual">
              <Image
                src="/images/lunch-patio.png"
                alt="Déjeuner sain sur la grande terrasse"
                fill
                style={{ objectFit: "cover" }}
                sizes="50vw"
              />
            </div>
            <div className="experience__text">
              <span className="experience__number">02</span>
              <div className="experience__accent-line" />
              <span className="label label--gold">Gastronomie</span>
              <h3>La pause qui fait du bien</h3>
              <p>
                Un déjeuner convivial préparé avec soin, servi en plein air.
                Le moment parfait pour reprendre son souffle et échanger
                avant de passer aux échecs.
              </p>
            </div>
          </div>

          {/* Row 3: Échecs */}
          <div className="experience__row reveal">
            <div className="experience__visual">
              <Image
                src="/images/chess-patio.png"
                alt="Partie d'échecs sur la terrasse de la villa"
                fill
                style={{ objectFit: "cover" }}
                sizes="50vw"
              />
            </div>
            <div className="experience__text">
              <span className="experience__number">03</span>
              <div className="experience__accent-line" />
              <span className="label" style={{ color: "var(--terracotta)" }}>Échecs</span>
              <h3>L&apos;esprit en jeu</h3>
              <p>
                Cours et parties accompagnées par un professeur d&apos;échecs
                passionné. Débutants bienvenus. Stratégie, concentration et
                plaisir du jeu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================== LA JOURNÉE ======================== */}
      <section className="section section--white" id="journee">
        <div className="container">
          <div className="section__header reveal">
            <span className="label label--gold">Votre journée type</span>
            <h2>
              Du lever au fou rire,<br />
              <span style={{ color: "var(--terracotta)" }}>minute par minute</span>
            </h2>
          </div>

          <div className="journey__timeline">
            {/* Step 1: Accueil */}
            <div className="journey__step reveal">
              <div className="journey__dot" />
              <div className="journey__image">
                <Image
                  src="/images/69aa487a.jpg"
                  alt="Accueil à la villa"
                  width={600}
                  height={450}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </div>
              <div className="journey__info">
                <span className="journey__time">9h00</span>
                <h3>Accueil &amp; café</h3>
                <p>
                  Arrivée à la villa. On pose ses affaires, on prend un café,
                  on fait connaissance. Le cadre fait le reste — jardin, piscine,
                  soleil.
                </p>
              </div>
            </div>

            {/* Step 2: Sport */}
            <div className="journey__step reveal">
              <div className="journey__dot" />
              <div className="journey__image">
                <Image
                  src="/images/sport-deck.png"
                  alt="Séance de sport en plein air"
                  width={600}
                  height={450}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </div>
              <div className="journey__info">
                <span className="journey__time">10h00 – 12h00</span>
                <h3>Fitness &amp; MMA</h3>
                <p>
                  Deux heures encadrées par un coach agréé. Renforcement
                  musculaire, cardio, et initiation aux techniques de MMA.
                  Tous niveaux, bonne humeur garantie.
                </p>
              </div>
            </div>

            {/* Step 3: Repas */}
            <div className="journey__step reveal">
              <div className="journey__dot" />
              <div className="journey__image">
                <Image
                  src="/images/lunch-patio.png"
                  alt="Déjeuner en plein air"
                  width={600}
                  height={450}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </div>
              <div className="journey__info">
                <span className="journey__time">12h30</span>
                <h3>Déjeuner au soleil</h3>
                <p>
                  Repas frais et convivial servi en terrasse. Le moment de
                  reprendre des forces, discuter stratégie, et profiter du
                  cadre exceptionnel.
                </p>
              </div>
            </div>

            {/* Step 4: Échecs */}
            <div className="journey__step reveal">
              <div className="journey__dot" />
              <div className="journey__image">
                <Image
                  src="/images/chess-patio.png"
                  alt="Cours d'échecs en terrasse"
                  width={600}
                  height={450}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </div>
              <div className="journey__info">
                <span className="journey__time">14h00 – 17h00</span>
                <h3>Échecs &amp; stratégie</h3>
                <p>
                  Cours, parties et analyse de jeu avec un professeur
                  d&apos;échecs. Que vous soyez débutant ou joueur confirmé,
                  chaque partie est un plaisir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================== LE CADRE ======================== */}
      <section className="section section--cream" id="cadre">
        <div className="container">
          <div className="section__header reveal">
            <span className="label">Le cadre</span>
            <h2>
              Une villa d&apos;exception<br />
              <span style={{ color: "var(--terracotta)" }}>au cœur de Montpellier</span>
            </h2>
          </div>

          <div className="cadre__image-wrapper reveal">
            <Image
              src="/images/69aa487a.jpg"
              alt="Villa méditerranéenne avec piscine et jardin"
              fill
              style={{ objectFit: "cover" }}
              sizes="100vw"
            />
            <div className="cadre__overlay-content">
              <span className="label">Montpellier · Hérault</span>
              <h2>Votre écrin pour la journée</h2>
              <p>
                Une villa méditerranéenne baignée de soleil, avec jardin
                privatif et piscine. Le cadre idéal pour une journée hors
                du temps.
              </p>
            </div>
          </div>
        </div>

        {/* Marquee Ticker */}
        <div className="cadre__marquee">
          <div className="cadre__marquee-track">
            {[...Array(2)].map((_, setIdx) => (
              <Fragment key={setIdx}>
                <div className="cadre__marquee-item">
                  <span>Piscine privée</span>
                </div>
                <div className="cadre__marquee-dot" />
                <div className="cadre__marquee-item">
                  <span>Jardin méditerranéen</span>
                </div>
                <div className="cadre__marquee-dot" />
                <div className="cadre__marquee-item">
                  <span>Terrasse panoramique</span>
                </div>
                <div className="cadre__marquee-dot" />
                <div className="cadre__marquee-item">
                  <span>Espace repas extérieur</span>
                </div>
                <div className="cadre__marquee-dot" />
                <div className="cadre__marquee-item">
                  <span>300 jours de soleil</span>
                </div>
                <div className="cadre__marquee-dot" />
                <div className="cadre__marquee-item">
                  <span>Parking privatif</span>
                </div>
                <div className="cadre__marquee-dot" />
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== L'ÉQUIPE ======================== */}
      <section className="section section--white" id="equipe">
        <div className="container">
          <div className="section__header reveal">
            <span className="label">L&apos;équipe</span>
            <h2>
              Des passionnés<br />
              <span style={{ color: "var(--terracotta)" }}>à votre service</span>
            </h2>
            <p>
              Deux experts, deux univers, une même passion : vous faire
              vivre une journée inoubliable.
            </p>
          </div>
        </div>

        <div className="team__grid">
          {/* Panel 1: Coach Sport */}
          <div className="team__panel reveal">
            <div className="team__visual">
              <Image
                src="/images/coach-portrait.png"
                alt="Portrait du coach sportif"
                fill
                style={{ objectFit: "cover" }}
              />
              <div className="team__visual-bg" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)" }} />
              <div className="team__visual-content">
                <div className="team__visual-discipline">Sport</div>
              </div>
            </div>
            <div className="team__info">
              <span className="label">Sport</span>
              <h3>Le Coach Sportif</h3>
              <p className="team__role">Fitness &amp; MMA · Coach agréé</p>
              <p>
                Spécialiste du renforcement et des sports de combat, notre
                coach adapte chaque séance à votre niveau. Son objectif :
                que vous repartiez avec le sourire et les bras un peu lourds.
              </p>
              <div className="team__credentials">
                <span className="team__credential">Coach agréé</span>
                <span className="team__credential">Fitness</span>
                <span className="team__credential">MMA</span>
              </div>
            </div>
          </div>

          {/* Panel 2: Prof Échecs */}
          <div className="team__panel reveal">
            <div className="team__visual">
              <Image
                src="/images/chess-portrait.png"
                alt="Portrait du professeur d'échecs"
                fill
                style={{ objectFit: "cover" }}
              />
              <div className="team__visual-bg" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)" }} />
              <div className="team__visual-content">
                <div className="team__visual-discipline">Échecs</div>
              </div>
            </div>
            <div className="team__info">
              <span className="label">Échecs</span>
              <h3>Le Professeur d&apos;Échecs</h3>
              <p className="team__role">Enseignant &amp; joueur passionné</p>
              <p>
                Pédagogue avant tout, notre professeur d&apos;échecs rend
                le jeu accessible et captivant. Débutants comme joueurs
                confirmés trouvent leur compte.
              </p>
              <div className="team__credentials">
                <span className="team__credential">Professeur certifié</span>
                <span className="team__credential">Pédagogue</span>
                <span className="team__credential">Compétiteur</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================== RÉSERVER ======================== */}
      <section className="section section--sand" id="reserver">
        <div className="container">
          <div className="booking__grid reveal">
            <div className="booking__intro">
              <span className="label">On y est presque</span>
              <h2>
                Votre parenthèse<br />
                <span className="booking__intro-accent">commence ici</span>
              </h2>
              <p>
                Remplissez vos informations, nous vous recontacterons sous 24h
                pour personnaliser votre journée (niveau d&apos;échecs actuel, détails physiques).
              </p>

              <div className="booking__includes">
                <div className="booking__include">
                  <span className="booking__include-icon">✓</span>
                  Sport &amp; sur-mesure (2h)
                </div>
                <div className="booking__include">
                  <span className="booking__include-icon">✓</span>
                  Déjeuner sain du chef
                </div>
                <div className="booking__include">
                  <span className="booking__include-icon">✓</span>
                  Masterclass d&apos;échecs (3h)
                </div>
                <div className="booking__include">
                  <span className="booking__include-icon">✓</span>
                  Privatisation complète
                </div>
              </div>
            </div>

            <form className="booking__form" onSubmit={handleSubmit}>
              <div className="booking__row">
                <div className="booking__field">
                  <input type="text" className="booking__input" placeholder=" " required id="booking-firstName" />
                  <label htmlFor="booking-firstName" className="booking__label">Prénom</label>
                </div>
                <div className="booking__field">
                  <input type="text" className="booking__input" placeholder=" " required id="booking-lastName" />
                  <label htmlFor="booking-lastName" className="booking__label">Nom</label>
                </div>
              </div>
              <div className="booking__field">
                <input type="email" className="booking__input" placeholder=" " required id="booking-email" />
                <label htmlFor="booking-email" className="booking__label">Adresse email</label>
              </div>
              <div className="booking__field">
                <input type="date" className="booking__input" placeholder=" " id="booking-date" />
                <label htmlFor="booking-date" className="booking__label">Date souhaitée</label>
              </div>
              <div className="booking__field">
                <textarea className="booking__input booking__textarea" placeholder=" " id="booking-message"></textarea>
                <label htmlFor="booking-message" className="booking__label">Un message particulier ?</label>
              </div>
              <button type="submit" className="booking__submit">
                <span>Envoyer ma demande</span>
                <div className="booking__submit-line" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ======================== FOOTER ======================== */}
      <footer className="footer">
        <div className="container">
          <div className="footer__content">
            <div>
              <div className="footer__logo">
                Chess<span>&amp;</span>Perf
              </div>
              <p className="footer__tagline">
                Sport, échecs &amp; soleil à Montpellier
              </p>
            </div>

            <div className="footer__links">
              <div className="footer__column">
                <h4>Navigation</h4>
                <a onClick={() => scrollToSection("experience")}>
                  L&apos;expérience
                </a>
                <a onClick={() => scrollToSection("journee")}>La journée</a>
                <a onClick={() => scrollToSection("cadre")}>Le cadre</a>
                <a onClick={() => scrollToSection("equipe")}>L&apos;équipe</a>
              </div>
              <div className="footer__column">
                <h4>Contact</h4>
                <p>Montpellier, France</p>
                <a href="mailto:contact@chessandperf.com">
                  contact@chessandperf.com
                </a>
              </div>
            </div>
          </div>

          <div className="footer__bottom">
            <p className="footer__copyright">
              © 2025 Chess&amp;Perf. Tous droits réservés.
            </p>
            <div className="footer__social">
              <a href="#" aria-label="Instagram">IG</a>
              <a href="#" aria-label="LinkedIn">LI</a>
              <a href="#" aria-label="TikTok">TK</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
