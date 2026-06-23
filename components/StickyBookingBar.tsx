"use client";

import { usePathname } from "next/navigation";
import StickyCta, { type StickyCtaProps } from "@/components/StickyCta";
import { packageContent } from "@/lib/packages";
import { BOOKING_URL } from "@/lib/services";

/*
  Site-wide sticky booking bar. Mounted once in the root layout (app/layout.tsx);
  it renders the exact <StickyCta> on the slimming / weight-loss / body-contouring
  pages, matched by EXACT pathname. One mount covers every body-contouring package
  page + the packages listing + the medical weight-loss pages, plus any future
  package added to the lib/packages registry. Pages not in CONFIG render nothing
  (home, blog, quiz, guide, preview, thank-you, utility routes).

  Booking targets (determined by reading each page + how the site books):
   - Body-contouring PACKAGE pages and /packages → the Fresha BOOKING_URL from
     lib/services. This is the SAME mechanism their on-page "Claim your spot" CTA
     uses (components/PackagePage.tsx's <CTA> links to BOOKING_URL). The bar's
     "Claim your spot" therefore matches the page's primary action exactly.
   - /weight-loss, /glp1 → the page's real Fresha general-booking URL
     (the `eid=5009163` "Book Your Consultation" / "Claim Your Spot" link used in
     app/weight-loss/page.tsx and app/glp1/page.tsx).
   - /medical-weight-loss-lp → that page's primary hero/section booking link
     (`eid=4994308`, used as FRESHA_BOOK in app/medical-weight-loss-lp/page.tsx).
   The medical pages also expose a secondary "Free consultation" → /consultation
   (the site-wide ConsultationModal mounted in layout intercepts it in-tab).
*/

// Fresha general-booking link used by /weight-loss and /glp1 (eid=5009163).
const WEIGHT_LOSS_FRESHA =
  "https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2843963&eid=5009163&oiid=sv%3A25969858&share=true&pId=2708191";

// Fresha booking link used as the primary CTA on /medical-weight-loss-lp (eid=4994308).
const MEDICAL_LP_FRESHA =
  "https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2843963&eid=4994308&oiid=sv%3A25969858&share=true&pId=2708191";

// Clean, short package names for the price label (the raw heroTitle is a long,
// SEO-keyworded headline). Keyed by package id.
const PACKAGE_SHORT_NAME: Record<string, string> = {
  "fat-freezing": "Fat Freezing",
  "fat-dissolving": "Fat Dissolving",
  "muscle-stimulation": "Muscle Stimulation",
  "skin-tightening": "Skin Tightening",
  "lipocavitation": "Lipocavitation",
  "anti-cellulite": "Anti-Cellulite",
  "lymphatic-drainage": "Lymphatic Drainage",
};

// Extract a clean "€N" from a heroTodayPrice like "€199 for 3 sessions".
function priceFromTodayPrice(today?: string): string | null {
  const m = today?.match(/€\s*([\d.,]+)/);
  return m ? `€${m[1]}` : null;
}

// Fall back to deriving a short name from the heroTitle (text before "in malta").
function shortNameFor(id: string, heroTitle: string): string {
  if (PACKAGE_SHORT_NAME[id]) return PACKAGE_SHORT_NAME[id];
  const lead = heroTitle.split(/\s+in\s+malta/i)[0].split(/\s*[—–]\s*/)[0].trim();
  return lead ? lead.replace(/\b\w/g, (c) => c.toUpperCase()) : id;
}

const CONFIG: Record<string, StickyCtaProps> = {};

// 1. Body-contouring PACKAGE pages — looped over the registry so they stay in
//    sync with lib/packages. Same Fresha BOOKING_URL as the on-page "Claim your
//    spot" CTA.
for (const [id, pkg] of Object.entries(packageContent)) {
  const price = priceFromTodayPrice(pkg.heroTodayPrice);
  const name = shortNameFor(id, pkg.heroTitle);
  CONFIG[`/packages/${id}`] = {
    bookHref: BOOKING_URL,
    priceLabel: price ? `${name} · ${price}` : name,
    ctaLabel: "Claim your spot",
  };
}

// 2. Packages listing page.
CONFIG["/packages"] = {
  bookHref: BOOKING_URL,
  priceLabel: "Body Contouring Packages",
  ctaLabel: "Claim your spot",
};

// 3. Medical weight loss.
CONFIG["/weight-loss"] = {
  bookHref: WEIGHT_LOSS_FRESHA,
  priceLabel: "Medical Weight Loss Malta",
  ctaLabel: "Book consultation",
  secondaryHref: "/consultation",
  secondaryLabel: "Free consultation",
};

// 4. GLP-1 (Mounjaro & Ozempic).
CONFIG["/glp1"] = {
  bookHref: WEIGHT_LOSS_FRESHA,
  priceLabel: "GLP-1 · Mounjaro & Ozempic",
  ctaLabel: "Book consultation",
  secondaryHref: "/consultation",
  secondaryLabel: "Free consultation",
};

// 5. Medical weight-loss landing page.
CONFIG["/medical-weight-loss-lp"] = {
  bookHref: MEDICAL_LP_FRESHA,
  priceLabel: "Medical Weight Loss Malta",
  ctaLabel: "Book consultation",
  secondaryHref: "/consultation",
  secondaryLabel: "Free consultation",
};

export default function StickyBookingBar() {
  const pathname = usePathname();
  const cfg = pathname ? CONFIG[pathname] : undefined;
  if (!cfg) return null;
  return <StickyCta {...cfg} />;
}
