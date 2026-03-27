export default function JsonLd() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Chess&Fit",
    description:
      "Journées immersives mêlant MMA, préparation physique et échecs dans une villa privée à Montpellier.",
    url: "https://chessandfit.com",
    telephone: "",
    email: "contact@chessandfit.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Montpellier",
      addressRegion: "Occitanie",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.6108,
      longitude: 3.8767,
    },
    priceRange: "€€",
    image: "https://chessandfit.com/og-image.jpg",
    sameAs: [],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "09:00",
      closes: "19:00",
    },
    aggregateRating: undefined,
  };

  const event = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Chess&Fit — Journée Sport & Échecs",
    description:
      "Journée immersive mêlant MMA, préparation physique avec coach, session d'échecs et repas convivial dans une villa privée à Montpellier.",
    url: "https://chessandfit.com",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: "Villa privée",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Montpellier",
        addressRegion: "Occitanie",
        addressCountry: "FR",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "Chess&Fit",
      url: "https://chessandfit.com",
    },
    offers: [
      {
        "@type": "Offer",
        name: "Formule Solo",
        price: "120",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        url: "https://chessandfit.com/#tarifs",
      },
      {
        "@type": "Offer",
        name: "Formule Groupe (4+ personnes)",
        price: "100",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        url: "https://chessandfit.com/#tarifs",
      },
    ],
    image: "https://chessandfit.com/og-image.jpg",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(event) }}
      />
    </>
  );
}
