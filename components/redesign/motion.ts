'use client';

import { useEffect, useRef, useState } from 'react';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Adds `.is-in` to the element when it scrolls into view (one-shot).
 * Used by .cx-reveal / .cx-stagger CSS classes. Reduced-motion safe: the
 * element is revealed immediately and the observer is skipped.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  opts: { threshold?: number; rootMargin?: string } = {}
) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.classList.add('is-in');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.classList.add('is-in');
            io.unobserve(el);
          }
        }
      },
      { threshold: opts.threshold ?? 0.18, rootMargin: opts.rootMargin ?? '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [opts.threshold, opts.rootMargin]);
  return ref;
}

/** Count-up that triggers once when the element enters view. */
export function useCountUp(target: number, decimals = 0, duration = 1600) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      setVal(target);
      return;
    }
    let raf = 0;
    let start = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          io.unobserve(el);
          const step = (t: number) => {
            if (!start) start = t;
            const p = Math.min((t - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(target * eased);
            if (p < 1) raf = requestAnimationFrame(step);
            else setVal(target);
          };
          raf = requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration]);
  return { ref, display: val.toFixed(decimals) };
}

/**
 * Tracks which section id is currently in view (for nav active-state).
 * Pass the list of section ids (without `#`). Returns the active id.
 * Reduced-motion safe: still works (it's just an IntersectionObserver), and
 * degrades gracefully when no section is intersecting.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string>('');
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!els.length) return;

    // Track visibility ratios so the most-visible section wins.
    const ratios = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) ratios.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
        let best = '';
        let bestRatio = 0;
        ratios.forEach((r, id) => {
          if (r > bestRatio) {
            bestRatio = r;
            best = id;
          }
        });
        if (best && bestRatio > 0) setActive(best);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

/** Returns 0→1 scroll progress of an element through the viewport. */
export function useScrollProgress<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = r.height + vh * 0.6;
        const seen = Math.min(Math.max(vh - r.top, 0), total);
        setP(Math.min(seen / total, 1));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return { ref, p };
}
