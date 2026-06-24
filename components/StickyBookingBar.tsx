"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { packageContent } from "@/lib/packages";
import { BOOKING_URL } from "@/lib/services";
import { trackEvent } from "@/lib/analytics";

/*
  Single floating CTA pill. Mounted once in root layout.
  No label text, no secondary button — just the primary action, centered.
  Appears only after scrolling past the hero (≈ one viewport height).
*/

type BarConfig = {
  href: string;
  ctaLabel: string;
};

const WEIGHT_LOSS_FRESHA =
  "https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2843963&eid=5009163&oiid=sv%3A25969858&share=true&pId=2708191";

const MEDICAL_LP_FRESHA =
  "https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2843963&eid=4994308&oiid=sv%3A25969858&share=true&pId=2708191";

const CONFIG: Record<string, BarConfig> = {};

for (const [id] of Object.entries(packageContent)) {
  CONFIG[`/packages/${id}`] = {
    href: BOOKING_URL,
    ctaLabel: "Claim your spot",
  };
}

CONFIG["/packages"] = { href: BOOKING_URL, ctaLabel: "Claim your spot" };
CONFIG["/weight-loss"] = { href: WEIGHT_LOSS_FRESHA, ctaLabel: "Free Body Analysis" };
CONFIG["/glp1"] = { href: WEIGHT_LOSS_FRESHA, ctaLabel: "Free Body Analysis" };
CONFIG["/medical-weight-loss-lp"] = { href: MEDICAL_LP_FRESHA, ctaLabel: "Free Body Analysis" };

// Slimming brand gradient — deep sage green palette
const SLIMMING_GRADIENT =
  "linear-gradient(135deg, #557b5b 0%, #4f7256 55%, #3e5c44 100%)";

export default function StickyBookingBar() {
  const pathname = usePathname();
  const cfg = pathname ? CONFIG[pathname] : undefined;

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
        cta_label: cfg.ctaLabel,
        section: "sticky_cta",
        destination_url: cfg.href,
      }
    );
  };

  return (
    <div
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
        onClick={trackClick}
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
        {cfg.ctaLabel}
      </a>
    </div>
  );
}
