"use client";

import { useEffect, useRef, useState } from "react";

/*
  Sticky bottom-of-viewport conversion bar for Carisma Slimming.

  Behavior (ported 1:1 from the Carisma Aesthetics StickyCta, restyled to the
  Slimming brand):
  - Hidden until the user scrolls ~600px past the top (past the hero), then it
    fades + slides up into view. A passive, rAF-throttled scroll listener drives
    a single `shown` boolean — no sentinel element required, so the bar is fully
    self-contained and drops into any page. State is evaluated once on mount too
    (for restored / already-scrolled positions).
  - Frosted translucent white pill (rgba white + backdrop blur/saturate, hairline
    border, soft shadow + inset top gloss) so it reads as a premium floating bar.
  - A11y / quality: 44px+ tap target on the links, white text on deep sage
    #4f7256 (>=4.5:1 AA), `env(safe-area-inset-bottom)` padding for notched
    phones, z-index 60, reduced-motion disables the enter transition, the fixed
    bar is `pointer-events:none` while hidden so it never blocks taps and causes
    no layout shift, and nothing overflows horizontally.
  - Trajan Pro / Novecento Wide are titling faces → all label/button text is
    rendered uppercase per the brand typography rule.
*/

export interface StickyCtaProps {
  bookHref: string;
  priceLabel: string;
  ctaLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

/* Brand fonts (shared with the rest of the site). */
const WIDE = 'Novecento Wide Book, Novecento Wide, sans-serif';
/* Locked accessible deep sage for body/taupe text + the secondary outline. */
const SAGE = '#4f7256';
const TAUPE = '#6f6456';

export default function StickyCta({ bookHref, priceLabel, ctaLabel, secondaryHref, secondaryLabel }: StickyCtaProps) {
  const hasSecondary = Boolean(secondaryHref && secondaryLabel);
  const [shown, setShown] = useState(false);
  // Respect reduced-motion for the enter animation only (visibility still works).
  const [animate, setAnimate] = useState(true);
  const tickingRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyMotion = () => setAnimate(!mq.matches);
    applyMotion();
    mq.addEventListener("change", applyMotion);

    const REVEAL_AT = 600;
    const evaluate = () => {
      tickingRef.current = false;
      setShown(window.scrollY > REVEAL_AT);
    };
    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      window.requestAnimationFrame(evaluate);
    };

    // Set initial state (e.g. when the page loads already scrolled / restored).
    evaluate();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      mq.removeEventListener("change", applyMotion);
    };
  }, []);

  return (
    <div
      role="region"
      aria-label="Quick booking"
      aria-hidden={!shown}
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 60,
        display: "flex",
        justifyContent: "center",
        // Safe-area inset for notched phones; small base gap above the edge.
        padding: "0 12px calc(12px + env(safe-area-inset-bottom, 0px))",
        // Hidden -> never intercepts taps -> no accidental blocking, no layout shift.
        pointerEvents: shown ? "auto" : "none",
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(120%)",
        transition: animate ? "opacity 280ms ease, transform 320ms cubic-bezier(0.22,1,0.36,1)" : "none",
      }}
    >
      <style>{`
        @media (max-width: 600px) {
          .sticky-cta-has-2 .sticky-cta-label { display: none; }
        }
        @media (max-width: 480px) {
          .sticky-cta-secondary { padding: 10px 10px !important; font-size: 10px !important; letter-spacing: 0.05em !important; }
          .sticky-cta-primary   { padding: 10px 12px !important; font-size: 10px !important; letter-spacing: 0.08em !important; }
        }
        /* Primary CTA hover/active — sage glow bloom (mirrors the site .cta-glow). */
        @media (prefers-reduced-motion: no-preference) {
          .sticky-cta-primary:hover { transform: scale(1.04); }
          .sticky-cta-primary:active { transform: scale(1.0); }
        }
        .sticky-cta-primary:hover {
          box-shadow: 0 0 30px rgba(79,114,86,0.55), 0 12px 30px rgba(79,114,86,0.62);
        }
        /* Secondary outline — invert to filled sage on hover. */
        .sticky-cta-secondary:hover {
          background: ${SAGE};
          color: #fff;
        }
      `}</style>
      <div
        className={`sticky-cta-pill${hasSecondary ? " sticky-cta-has-2" : ""}`}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          width: "100%",
          maxWidth: hasSecondary ? "620px" : "560px", // a touch wider to fit two CTAs
          padding: "8px 8px 8px 18px",
          minHeight: 60,
          borderRadius: "999px",
          // Frosted translucent white surface — premium floating-bar look.
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(18px) saturate(180%)",
          WebkitBackdropFilter: "blur(18px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.7)",
          boxShadow: "0 14px 36px rgba(40, 55, 44, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.85)",
        }}
      >
        <span
          className="sticky-cta-label"
          style={{
            flex: "1 1 auto",
            minWidth: 0, // allow text to shrink/ellipsis instead of forcing overflow
            fontFamily: WIDE,
            fontWeight: 700,
            fontSize: "12px",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: TAUPE,
            lineHeight: 1.3,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {priceLabel}
        </span>
        {/* Secondary CTA — outline sage pill. Internal "/consultation" stays in-tab
            so the site-wide consultation popup intercepts it. */}
        {hasSecondary && (
          <a
            href={secondaryHref}
            {...(/^https?:\/\//.test(secondaryHref as string) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            aria-label={secondaryLabel}
            className="sticky-cta-secondary"
            style={{
              flex: "0 0 auto",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 44,
              padding: "12px 16px",
              borderRadius: "999px",
              background: "transparent",
              color: SAGE,
              border: `1px solid ${SAGE}`,
              fontFamily: WIDE,
              fontWeight: 700,
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
              whiteSpace: "nowrap",
              transition: "background 0.3s ease, color 0.3s ease",
            }}
          >
            {secondaryLabel}
          </a>
        )}
        {/* Primary book CTA: white-on-deep-sage (>=4.5:1 AA), 44px+ target.
            External (Fresha) links open in a new tab and bypass the popup;
            internal links stay in-tab for the consultation modal. */}
        <a
          href={bookHref}
          {...(/^https?:\/\//.test(bookHref) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          aria-label={ctaLabel}
          className="sticky-cta-primary"
          style={{
            flex: "0 0 auto",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 44,
            padding: "12px 20px",
            borderRadius: "999px",
            background: "linear-gradient(135deg, #557b5b 0%, #4f7256 55%, #3e5c44 100%)",
            color: "#fff",
            fontFamily: WIDE,
            fontWeight: 700,
            fontSize: "12px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            textDecoration: "none",
            whiteSpace: "nowrap",
            boxShadow: "0 0 22px rgba(79,114,86,0.45), 0 8px 24px rgba(79,114,86,0.5)",
            transition: animate ? "transform 0.3s ease, box-shadow 0.3s ease" : "box-shadow 0.3s ease",
          }}
        >
          {ctaLabel}
        </a>
      </div>
    </div>
  );
}
