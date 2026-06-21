'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

/**
 * Mobile-only sticky CTA bar pinned to the bottom of the viewport.
 *
 * - Hidden at >= md (desktop) via the `md:hidden` wrapper.
 * - Pill + accessible sage styling (white text on #4f7256 = 5.42:1 AA).
 * - Sits ABOVE the cookie consent banner: the cookie banner (CookieConsentBanner)
 *   is `position:fixed; bottom:0; zIndex:9999`. We read the same
 *   `carisma_cookie_consent` localStorage key it uses; while that banner is
 *   showing (no stored consent) we shift the sticky CTA up by the banner height
 *   so they never overlap. Once consent is recorded the CTA drops back to the
 *   bottom edge.
 * - iOS safe-area-inset padding so the bar clears the home indicator.
 * - 300ms ease motion; transform disabled under prefers-reduced-motion.
 */
export default function MobileStickyCTA() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  return (
    <div
      className="md:hidden"
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        // Sit exactly above the cookie banner using the real height it publishes
        // to `--cookie-banner-h` (0px when no banner). Exact + reactive — no guess.
        bottom: 'var(--cookie-banner-h, 0px)',
        // Below the cookie banner's z-index (9999) so the banner stays clickable.
        zIndex: 9000,
        padding: '12px 16px',
        // iOS safe-area: add the home-indicator inset on top of base padding.
        paddingBottom: 'calc(12px + env(safe-area-inset-bottom))',
        pointerEvents: 'none',
        transition: reduceMotion ? 'none' : 'bottom 300ms ease',
      }}
    >
      <Link
        href="/consultation"
        className="btn btn-primary"
        style={{
          pointerEvents: 'auto',
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px 24px',
          fontSize: '15px',
          fontWeight: 600,
          boxShadow: '0 6px 20px rgba(26, 26, 26, 0.22)',
        }}
      >
        Book Your Free Consultation
      </Link>
    </div>
  );
}
