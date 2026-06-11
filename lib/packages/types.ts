/* ============================================================
   Content schema for the data-driven slimming-package template
   (components/PackagePage.tsx). Each live treatment page at
   carismaslimming.com shares the same Wix layout, so one template
   renders all of them; only the content object differs per package.

   Sections that are boilerplate across every live package page
   (press strip, "we are not another diet clinic", the wellness-chain
   commitment / why-Malta columns) have shared defaults below and are
   only overridden when a specific page genuinely differs.
   ============================================================ */

export interface IconCopy {
  /** /wix/<id> path for the icon/image. */
  icon: string;
  title: string;
  body: string;
}

export interface EvidenceCard {
  img: string;
  tag: string;
  title: string;
  does: string;
  results: string[];
  foot: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface PackageContent {
  /** matches the service id / route slug, e.g. 'fat-freezing'. */
  id: string;
  /** live reference URL (documentation only). */
  liveUrl: string;

  /* ---- 1. hero ---- */
  heroEyebrow: string;
  heroTitle: string;
  heroSubheading: string;
  heroDescription: string;
  heroIncludes: string[];
  heroTotalValue: string; // e.g. "€550"
  heroTodayPrice: string; // e.g. "€199 ONLY"
  heroPriceNote?: string; // e.g. "€100 for individual sessions"
  heroFineprint: string[];
  heroImage: string; // poster / still
  heroVideo?: string; // looping hero video, when the live page has one
  heroImageRatio?: string; // CSS aspect-ratio, default '398 / 682'

  /* ---- 2. the secret to a more defined look ---- */
  secretHeading: string[]; // lines
  secretSubheading: string;
  secretImage: string;
  secretIntro: string;
  secretBullets: string[];
  secretClosing: string;

  /* ---- 4. four named benefits ---- */
  benefits: IconCopy[];

  /* ---- 5. eligibility / treatable areas ---- */
  eligEyebrow?: string;
  eligHeading: string;
  eligImage: string;
  eligIntro: string;
  areas: string[];

  /* ---- 7. package-treatments card ---- */
  ptEyebrow: string;
  ptHeading: string;
  ptCardEyebrow: string;
  ptCardTag: string;
  ptParas: string[];
  ptEfficacyTitle: string;
  ptEfficacyBullets: string[];
  ptImage: string; // before/after
  ptImage2?: string; // small decorative

  /* ---- 8. dual / starter pack ---- */
  dualHeading: string[];
  dualMini: IconCopy[];
  dualIncludes: string[];
  dualTotalValue: string;
  dualTodayPrice: string;
  dualFineprint: string[];

  /* ---- 9. wellness chain (with location map) ---- */
  mapQuery: string; // Google-Maps embed query, e.g. "Carisma Slimming, Malta"
  commitment?: string[]; // override shared default only if the live page differs
  whyMalta?: string[];

  /* ---- 10. FAQ ---- */
  faqs: Faq[];

  /* ---- 11. evidence based approach ---- */
  evidenceEyebrow: string;
  evidence: EvidenceCard[];

  /* ---- shared-section overrides (rarely needed) ---- */
  differenceBullets?: string[];

  /* ---- optional bespoke sections (used by pages whose live layout differs) ---- */
  /** "Created for those who value…" — bullets left, photo right. Renders after benefits. */
  valueProps?: { heading: string; bullets: string[]; image: string };
  /** A two-column commitment panel on the rose watermark (no map), e.g. "35+ years delivering results". */
  commitmentPanel?: {
    eyebrow: string;
    heading: string;
    leftHeading: string;
    left: string[];
    rightHeading: string;
    right: string[];
  };
  /** A bespoke offer section (intro block + pricing card) used in place of the dual/starter section. */
  offer?: {
    introHeading: string;
    introParas: string[];
    introImage: string;
    tagline: string;
    subline: string;
    includes: string[];
    totalValue: string;
    todayPrice: string;
    buttonLabel: string;
    cardImage: string;
  };

  /* ---- per-page section visibility ----
     Some live pages omit standard sections; set the matching key true to
     hide that section on this package only. (hero / secret+carousel / press
     / FAQ are always shown.) */
  hide?: {
    benefits?: boolean;
    eligibility?: boolean;
    difference?: boolean;
    packageCard?: boolean;
    dual?: boolean;
    wellness?: boolean;
    evidence?: boolean;
  };
}

/* ---------- shared boilerplate defaults ---------- */
export const SHARED_DIFFERENCE_BULLETS = [
  'Doctor led: full medical check and body scan',
  'One integrated program: medical, diet, movement and treatments together',
  'Real gym included: Technogym facility, semi-private classes and PT',
  'High touch support: weekly check ins, progress reports and WhatsApp follow up',
  'Evidence based devices: Emsculpt NEO, coolsculpting and RF skin tightening',
  'Selective entry and measurable weight loss results guaranteed',
];

export const SHARED_DIFFERENCE_INTRO =
  "We’re a doctor led transformation program that blends medical insight, sustainable nutrition, and modern body tech into one high touch system, so you don’t just lose weight, you step into your strongest form.";

export const SHARED_COMMITMENT = [
  'Visible inch loss and shape change, not vague promises',
  'Plans that work with your age, hormones and metabolism',
  'No crash diets, no banned foods, no endless hours of cardio',
  'Medical grade technology and treatments delivered by trained professionals',
];

export const SHARED_WHY_MALTA = [
  "Created by the team behind Malta’s leading spa and medical aesthetics centres",
  'Doctor led medical slimming, not a beauty salon “diet program”',
  'All in one approach: assessment, nutrition, movement and treatments',
  'High touch support with weekly check ins and WhatsApp coaching',
];
