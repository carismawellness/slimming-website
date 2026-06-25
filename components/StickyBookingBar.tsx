"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { packageContent } from "@/lib/packages";
import { BOOKING_URL } from "@/lib/services";
import { trackEvent } from "@/lib/analytics";

/*
  Floating liquid-glass booking pill. Mounted once in root layout.
  Desktop: glass pill — label on left, single "Free Body Analysis" CTA on right.
  Mobile: single centered gradient pill only (no label).
  Appears only after scrolling past the hero (≈ one viewport height).
*/

type BarConfig = {
  href: string;
  priceLabel: string;
};

const WEIGHT_LOSS_FRESHA =
  "https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2843963&eid=5009163&oiid=sv%3A25969858&share=true&pId=2708191";

const MEDICAL_LP_FRESHA =
  "https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2843963&eid=4994308&oiid=sv%3A25969858&share=true&pId=2708191";

const PACKAGE_SHORT_NAME: Record<string, string> = {
  "fat-freezing": "Fat Freezing",
  "fat-dissolving": "Fat Dissolving",
  "muscle-stimulation": "Muscle Stimulation",
  "skin-tightening": "Skin Tightening",
  "lipocavitation": "Lipocavitation",
  "anti-cellulite": "Anti-Cellulite",
  "lymphatic-drainage": "Lymphatic Drainage",
};

function priceFromTodayPrice(today?: string): string | null {
  const m = today?.match(/€\s*([\d.,]+)/);
  return m ? `€${m[1]}` : null;
}

const CONFIG: Record<string, BarConfig> = {};

for (const [id, pkg] of Object.entries(packageContent)) {
  const price = priceFromTodayPrice(pkg.heroTodayPrice);
  const name = PACKAGE_SHORT_NAME[id] ?? id;
  CONFIG[`/packages/${id}`] = {
    href: BOOKING_URL,
    priceLabel: price ? `${name} · ${price}` : name,
  };
}

CONFIG["/packages"] = { href: BOOKING_URL, priceLabel: "Body Contouring Packages" };
CONFIG["/weight-loss"] = { href: WEIGHT_LOSS_FRESHA, priceLabel: "Medical Weight Loss" };
CONFIG["/glp1"] = { href: WEIGHT_LOSS_FRESHA, priceLabel: "GLP-1 Injections" };
CONFIG["/medical-weight-loss-lp"] = { href: MEDICAL_LP_FRESHA, priceLabel: "Medical Weight Loss" };

// Default for every other page so the sticky CTA is persistent site-wide.
// The default CTA opens the consultation modal (same as the header CTA).
const MODAL_HREF = "__consult-modal__";
const DEFAULT_CFG: BarConfig = { href: MODAL_HREF, priceLabel: "Free consultation & body analysis" };

const GLASS: React.CSSProperties = {
  backdropFilter: "blur(24px) saturate(200%)",
  WebkitBackdropFilter: "blur(24px) saturate(200%)",
  border: "1px solid rgba(255,255,255,0.45)",
  boxShadow:
    "0 8px 32px rgba(0,0,0,0.10), 0 1px 0 rgba(255,255,255,0.75) inset, 0 -1px 0 rgba(0,0,0,0.04) inset",
};

const SLIMMING_GRADIENT =
  "linear-gradient(135deg, #557b5b 0%, #4f7256 55%, #3e5c44 100%)";

export default function StickyBookingBar() {
  const pathname = usePathname();
  const cfg = (pathname ? CONFIG[pathname] : undefined) ?? DEFAULT_CFG;

  const [pastHero, setPastHero] = useState(false);
  useEffect(() => {
    const check = () => setPastHero(window.scrollY > window.innerHeight * 0.8);
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  if (!pastHero) return null;

  const isModal = cfg.href === MODAL_HREF;
  const isExternal = !isModal && cfg.href.startsWith("http");
  const linkProps = isExternal
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};
  const onCtaClick = (e: React.MouseEvent) => {
    if (isModal) {
      e.preventDefault();
      window.dispatchEvent(new Event("openConsultationModal"));
    }
    trackClick();
  };

  const trackClick = () => {
    const isPackage = pathname?.startsWith("/packages/") ?? false;
    trackEvent(
      isPackage || pathname === "/packages"
        ? "package_cta_click"
        : "book_consultation_click",
      {
        page_type: isPackage
          ? "package"
          : pathname === "/glp1"
          ? "glp1"
          : pathname === "/weight-loss"
          ? "weight_loss"
          : "page",
        service_slug: isPackage ? pathname?.split("/").pop() : undefined,
        cta_label: "Free Body Analysis",
        section: "sticky_cta",
        destination_url: cfg.href,
      }
    );
  };

  return (
    <>
      {/* ── Desktop: liquid-glass pill — label + single CTA ── */}
      <div
        className="hidden sm:flex"
        style={{
          position: "fixed",
          bottom: "24px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 49,
          alignItems: "center",
          gap: "20px",
          padding: "8px 10px 8px 28px",
          borderRadius: "9999px",
          background: "rgba(255,255,255,0.70)",
          whiteSpace: "nowrap",
          ...GLASS,
        }}
      >
        <span
          style={{
            fontSize: "13.5px",
            fontWeight: 500,
            color: "#6f6456",
            letterSpacing: "0.01em",
          }}
        >
          {cfg.priceLabel}
        </span>

        <a
          href={isModal ? "#" : cfg.href}
          {...linkProps}
          onClick={onCtaClick}
          style={{
            borderRadius: "9999px",
            background: SLIMMING_GRADIENT,
            padding: "10px 24px",
            fontSize: "12.5px",
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            textDecoration: "none",
            transition: "opacity 0.15s",
            boxShadow: "0 2px 8px rgba(79,114,86,0.30)",
            whiteSpace: "nowrap",
          }}
          onMouseOver={(e) =>
            ((e.currentTarget as HTMLElement).style.opacity = "0.88")
          }
          onMouseOut={(e) =>
            ((e.currentTarget as HTMLElement).style.opacity = "1")
          }
        >
          Free Body Analysis
        </a>
      </div>

      {/* ── Mobile: single centered gradient pill ── */}
      <div
        className="flex sm:hidden"
        style={{
          position: "fixed",
          bottom: "24px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 49,
        }}
      >
        <a
          href={isModal ? "#" : cfg.href}
          {...linkProps}
          onClick={onCtaClick}
          style={{
            display: "block",
            borderRadius: "9999px",
            background: SLIMMING_GRADIENT,
            padding: "13px 28px",
            fontSize: "13px",
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            textDecoration: "none",
            boxShadow:
              "0 6px 24px rgba(79,114,86,0.38), 0 1px 0 rgba(255,255,255,0.15) inset",
            border: "1px solid rgba(255,255,255,0.18)",
          }}
        >
          Free Body Analysis
        </a>
      </div>
    </>
  );
}
