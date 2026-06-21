'use client';

import { useEffect, useState } from 'react';
import { prefersReducedMotion } from './motion';

/**
 * Premium page-load reveal: a cream curtain carrying the Carisma logo and a
 * thin sage progress line that fills, then the whole curtain wipes upward to
 * reveal the hero. Scroll is locked for the ~1.1s the intro is on screen.
 *
 * Rendered nothing at all under prefers-reduced-motion. Fixed-overlay only —
 * it never participates in document flow, so it cannot cause layout shift.
 */
export default function PageIntro() {
  // `mounted` gates the very first paint so SSR/markup stays identical and we
  // can decide (client-side) whether reduced-motion users get nothing.
  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [progress, setProgress] = useState(0);
  const [wipe, setWipe] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setReduced(true);
      setMounted(true);
      return;
    }
    setMounted(true);

    // Lock scroll during the intro.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    let rafId = 0;
    const start = performance.now();
    const FILL = 820; // progress line fill duration

    const tick = (now: number) => {
      const p = Math.min((now - start) / FILL, 1);
      // ease-out for a refined deceleration
      setProgress(1 - Math.pow(1 - p, 2.2));
      if (p < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const wipeT = setTimeout(() => setWipe(true), 980);
    const doneT = setTimeout(() => {
      setDone(true);
      document.body.style.overflow = prevOverflow;
    }, 1700);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(wipeT);
      clearTimeout(doneT);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  if (!mounted || reduced || done) return null;

  return (
    <div
      aria-hidden
      className={`cx-intro ${wipe ? 'cx-intro-wipe' : ''}`}
    >
      <div className="cx-intro-inner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="" className="cx-intro-logo" />
        <div className="cx-intro-bar">
          <span
            className="cx-intro-fill"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
      </div>
    </div>
  );
}
