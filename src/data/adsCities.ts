export interface LatencyRow {
  city: string;
  filone: number;
  scaleway: number;
  backblaze: number;
  wasabi: number;
}

export interface CityConfig {
  lang: string;
  city: string; // url slug
  // SEO
  seoTitle: string;
  seoDescription: string;
  canonical: string;
  // Navbar
  loginLabel: string;
  signupLabel: string;
  // Hero
  eyebrow: string;
  headline: string;
  subheadline: string;
  ctaLabel: string;
  ctaTagline: string;
  contactSalesLabel: string;
  // Comparison table (flows directly from hero, no separate heading)
  priceRowLabel: string;       // e.g. "PRECIO / TB / MES"
  rttRowLabel: string;         // e.g. "RTT DESDE BARCELONA"
  bestPriceLabel: string;     // e.g. "Best price" / "Mejor precio"
  filoneLocation: string;      // datacenter location shown under "Fil One"
  scalewayLocation: string;
  backblazeLocation: string;
  wasabiLocation: string;
  filonePrice: string;
  scalewayPrice: string;
  backblazePrice: string;
  wasabiPrice: string;
  featuredCity: string;        // city name that gets the "AQUÍ" badge
  hereLabel: string;           // "AQUÍ" / "ICI"
  latencyRows: LatencyRow[];
  speedClaim: string;          // shown inline under featured city latency
  tableCtaLabel: string;
  // Features (simple checklist)
  featuresSectionLabel: string;
  features: string[];
  // Footer
  privacyLabel: string;
  termsLabel: string;
}

const CITIES: CityConfig[] = [
  {
    lang: "fr",
    city: "marseille",
    seoTitle: "Stockage S3 rapide près de Marseille — Fil One",
    seoDescription:
      "Datacenter dans le Sud de la France. Stockage objet S3 à 5 ms de Marseille, moins cher que Scaleway, Backblaze et Wasabi. Essayez 30 jours gratuitement.",
    canonical: "https://fil.one/fr/marseille",
    loginLabel: "Connexion",
    signupLabel: "S'inscrire",
    eyebrow: "EU-Southwest · Marseille",
    headline: "Le stockage S3 le plus rapide et le moins cher près de Marseille",
    subheadline: "Datacenter dans le Sud de la France — à seulement 5 ms de Marseille",
    ctaLabel: "Essayer gratuitement",
    ctaTagline: "Sans carte bancaire · Sans frais d'egress · Connexion en quelques minutes",
    contactSalesLabel: "Contacter l'equipe commerciale",
    priceRowLabel: "PRIX / TO / MOIS",
    rttRowLabel: "RTT DEPUIS MARSEILLE",
    bestPriceLabel: "Meilleur prix",
    filoneLocation: "Sud de la France",
    scalewayLocation: "Paris",
    backblazeLocation: "Amsterdam",
    wasabiLocation: "Paris",
    filonePrice: "4,25 €",
    scalewayPrice: "14,60 €",
    backblazePrice: "6,00 €",
    wasabiPrice: "6,99 €",
    featuredCity: "Marseille",
    hereLabel: "ICI",
    latencyRows: [
      { city: "Marseille",   filone: 5,  scaleway: 19, backblaze: 21, wasabi: 34 },
      { city: "Toulouse",    filone: 12, scaleway: 22, backblaze: 29, wasabi: 42 },
      { city: "Bordeaux",    filone: 18, scaleway: 24, backblaze: 35, wasabi: 48 },
      { city: "Montpellier", filone: 8,  scaleway: 21, backblaze: 24, wasabi: 37 },
      { city: "Barcelona",   filone: 12, scaleway: 29, backblaze: 32, wasabi: 45 },
      { city: "Bilbao",      filone: 22, scaleway: 32, backblaze: 38, wasabi: 53 },
      { city: "Zaragoza",    filone: 16, scaleway: 30, backblaze: 34, wasabi: 49 },
      { city: "Valencia",    filone: 18, scaleway: 33, backblaze: 37, wasabi: 52 },
    ],
    // ratio: Scaleway (19ms) / Fil One (5ms) = 3.8x
    speedClaim: "~3,8x plus vite",
    tableCtaLabel: "Démarrer gratuitement",
    featuresSectionLabel: "Pourquoi Fil One",
    features: [
      "Compatible S3 — fonctionne avec vos outils et SDKs existants",
      "11 nines de durabilité par conception",
      "Sans frais d'egress ni frais par requête API",
      "Intégrité des données vérifiable quotidiennement",
      "Portabilité multi-cloud dès le premier jour",
    ],
    privacyLabel: "Politique de confidentialité",
    termsLabel: "Conditions d'utilisation",
  },
  {
    lang: "es",
    city: "barcelona",
    seoTitle: "Almacenamiento S3 rápido cerca de Barcelona — Fil One",
    seoDescription:
      "Centro de datos en el sur de Francia. Almacenamiento objeto S3 a 6 ms de Barcelona, más barato que Scaleway, Backblaze y Wasabi. Prueba 30 días gratis.",
    canonical: "https://fil.one/es/barcelona",
    loginLabel: "Iniciar sesión",
    signupLabel: "Registrarse",
    eyebrow: "EU-Southwest · Barcelona",
    headline: "El almacenamiento S3 más rápido y económico cerca de Barcelona",
    subheadline: "Centro de datos en el sur de Francia — a solo 6 ms de Barcelona",
    ctaLabel: "Prueba gratis",
    ctaTagline: "Sin tarjeta de crédito · Sin costes de egress · Conecta en minutos",
    contactSalesLabel: "Contactar con ventas",
    priceRowLabel: "PRECIO / TB / MES",
    rttRowLabel: "RTT DESDE BARCELONA",
    bestPriceLabel: "Mejor precio",
    filoneLocation: "Sur de Francia",
    scalewayLocation: "París",
    backblazeLocation: "Ámsterdam",
    wasabiLocation: "París",
    filonePrice: "4,25 €",
    scalewayPrice: "14,60 €",
    backblazePrice: "5,10 €",
    wasabiPrice: "5,95 €",
    featuredCity: "Barcelona",
    hereLabel: "AQUÍ",
    latencyRows: [
      { city: "Barcelona", filone: 6,  scaleway: 19, backblaze: 27, wasabi: 21 },
      { city: "Toulouse",  filone: 4,  scaleway: 13, backblaze: 23, wasabi: 14 },
      { city: "Bordeaux",  filone: 5,  scaleway: 13, backblaze: 22, wasabi: 14 },
      { city: "Montpellier", filone: 5, scaleway: 14, backblaze: 24, wasabi: 15 },
      { city: "Marseille", filone: 5,  scaleway: 15, backblaze: 25, wasabi: 17 },
      { city: "Bilbao",    filone: 7,  scaleway: 17, backblaze: 25, wasabi: 18 },
      { city: "Zaragoza",  filone: 7,  scaleway: 20, backblaze: 29, wasabi: 21 },
      { city: "Valencia",  filone: 9,  scaleway: 24, backblaze: 32, wasabi: 25 },
    ],
    // ratio: Scaleway (19ms) / Fil One (6ms) ≈ 3.2x
    speedClaim: "~3,2x más rápido",
    tableCtaLabel: "Empezar gratis",
    featuresSectionLabel: "Por qué Fil One",
    features: [
      "Compatible con S3 — funciona con tus herramientas y SDKs actuales",
      "11 nueves de durabilidad por diseño",
      "Sin costes de egress ni cargos por solicitudes API",
      "Integridad de datos verificable a diario",
      "Portabilidad multi-cloud desde el primer día",
    ],
    privacyLabel: "Política de privacidad",
    termsLabel: "Condiciones de uso",
  },
];

/** Lookup: CITY_MAP[lang][city] → CityConfig */
export const CITY_MAP: Record<string, Record<string, CityConfig>> = {};
for (const c of CITIES) {
  if (!CITY_MAP[c.lang]) CITY_MAP[c.lang] = {};
  CITY_MAP[c.lang][c.city] = c;
}

export default CITIES;
