"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { packageContent } from "@/lib/packages";
import { BOOKING_URL } from "@/lib/services";
import { trackEvent } from "@/lib/analytics";

/*
  Floating liquid-glass booking pill. Mounted once in root layout.
  Desktop: centered pill with price label + optional free-consultation link + CTA.
  Mobile: just the primary CTA pill, centered — avoids the live-chat icon
  that sits bottom-right.
  Only appears after scrolling past the hero (≈ one viewport height).
*/

type BarConfig = {
  href: string;
  priceLabel: string;
  ctaLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

// Fresha general-booking link used by /weight-loss and /glp1 (eid=5009163).
const WEIGHT_LOSS_FRESHA =
  "https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2843963&eid=5009163&oiid=sv%3A25969858&share=true&pId=2708191";

// Fresha booking link used as the primary CTA on /medical-weight-loss-lp (eid=4994308).
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

function shortNameFor(id: string, heroTitle: string): string {
  if (PACKAGE_SHORT_NAME[id]) return PACKAGE_SHORT_NAME[id];
  const lead = heroTitle.split(/\s+in\s+malta/i)[0].split(/\s*[—–]\s*/)[0].trim();
  return lead ? lead.replace(/\b\w/g, (c) => c.toUpperCase()) : id;
}

const CONFIG: Record<string, BarConfig> = {};

for (const [id, pkg] of Object.entries(packageContent)) {
  const price = priceFromTodayPrice(pkg.heroTodayPrice);
  const name = shortNameFor(id, pkg.heroTitle);
  CONFIG[`/packages/${id}`] = {
    href: BOOKING_URL,
    priceLabel: price ? `${name} · ${price}` : name,
    ctaLabel: "Claim your spot",
  };
}

CONFIG["/packages"] = {
  href: BOOKING_URL,
  priceLabel: "Body Contouring Packages",
  ctaLabel: "Claim your spot",
};

CONFIG["/weight-loss"] = {
  href: WEIGHT_LOSS_FRESHA,
  priceLabel: "Medical Weight Loss Malta",
  ctaLabel: "Book consultation",
  secondaryHref: "/consultation",
  secondaryLabel: "Free consultation",
};

CONFIG["/glp1"] = {
  href: WEIGHT_LOSS_FRESHA,
  priceLabel: "GLP-1 · Mounjaro & Ozempic",
  ctaLabel: "Book consultation",
  secondaryHref: "/consultation",
  secondaryLabel: "Free consultation",
};

CONFIG["/medical-weight-loss-lp"] = {
  href: MEDICAL_LP_FRESHA,
  priceLabel: "Medical Weight Loss Malta",
  ctaLabel: "Book consultation",
  secondaryHref: "/consultation",
  secondaryLabel: "Free consultation",
};

// Liquid-glass shell shared between desktop pill and mobile button
const GLASS: React.CSSProperties = {
  backdropFilter: "blur(24px) saturate(200%)",
  WebkitBackdropFilter: "blur(24px) saturate(200%)",
  border: "1px solid rgba(255,255,255,0.45)",
  boxShadow:
    "0 8px 32px rgba(0,0,0,0.10), 0 1px 0 rgba(255,255,255,0.75) inset, 0 -1px 0 rgba(0,0,0,0.04) inset",
};

// Slimming brand gradient — deep sage green palette
const SLIMMING_GRADIENT =
  "linear-gradient(135deg, #557b5b 0%, #4f7256 55%, #3e5c44 100%)";

export default function StickyBookingBar() {
  const pathname = usePathname();
  const cfg = pathname ? CONFIG[pathname] : undefined;

  // Only show after the user scrolls past the hero (≈ one viewport height).
  const [pastHero, setPastHero] = useState(false);
  useEffect(() => {
    const check = () => setPastHero(window.scrollY > window.innerHeight * 0.8);
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  if (!cfg || !pastHero) return null;

  const isExternal = cfg.href.startsWith("http");
  const linkProps = isExternal
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  const trackClick = (label: string, href: string) => {
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
        cta_label: label,
        section: "sticky_cta",
        destination_url: href,
      }
    );
  };

  const isSecondaryExternal = cfg.secondaryHref?.startsWith("http");

  return (
    <>
      {/* ── Desktop pill — full label + optional secondary + primary CTA ── */}
      <div
        className="hidden sm:flex"
        style={{
          position: "fixed",
          bottom: "24px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 49,
          alignItems: "center",
          gap: "10px",
          padding: "7px 8px 7px 18px",
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

        {cfg.secondaryHref && (
          <Link
            href={cfg.secondaryHref}
            {...(isSecondaryExternal
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            style={{
              borderRadius: "9999px",
              border: "1px solid rgba(79,114,86,0.35)",
              padding: "6px 14px",
              fontSize: "12.5px",
              fontWeight: 600,
              color: "#4f7256",
              transition: "background 0.15s",
            }}
            onMouseOver={(e) =>
              ((e.currentTarget as HTMLElement).style.background =
                "rgba(79,114,86,0.08)")
            }
            onMouseOut={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "transparent")
            }
          >
            {cfg.secondaryLabel}
          </Link>
        )}

        <a
          href={cfg.href}
          {...linkProps}
          onClick={() => trackClick(cfg.ctaLabel, cfg.href)}
          style={{
            borderRadius: "9999px",
            background: SLIMMING_GRADIENT,
            padding: "8px 18px",
            fontSize: "12.5px",
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            transition: "opacity 0.15s",
            boxShadow: "0 2px 8px rgba(79,114,86,0.30)",
          }}
          onMouseOver={(e) =>
            ((e.currentTarget as HTMLElement).style.opacity = "0.88")
          }
          onMouseOut={(e) =>
            ((e.currentTarget as HTMLElement).style.opacity = "1")
          }
        >
          {cfg.ctaLabel}
        </a>
      </div>

      {/* ── Mobile — single CTA pill, centered, clears live-chat icon ── */}
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
          href={cfg.href}
          {...linkProps}
          onClick={() => trackClick(cfg.ctaLabel, cfg.href)}
          style={{
            borderRadius: "9999px",
            background: SLIMMING_GRADIENT,
            padding: "13px 26px",
            fontSize: "13px",
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            boxShadow:
              "0 6px 24px rgba(79,114,86,0.38), 0 1px 0 rgba(255,255,255,0.15) inset",
            border: "1px solid rgba(255,255,255,0.18)",
          }}
        >
          {cfg.ctaLabel}
        </a>
      </div>
    </>
  );
}
