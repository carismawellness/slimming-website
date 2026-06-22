'use client';

import { useEffect, useRef } from 'react';

/**
 * Decorative Carisma rose motif anchored to the footer's bottom-right, bleeding
 * half off the edge. Rendered as a CSS mask filled with a washed creamy beige so
 * it blends subtly into the footer gradient. Drifts gently with the cursor
 * (parallax). Purely presentational; disabled under prefers-reduced-motion.
 */
export default function FooterRose() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const dx = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2); // -1..1
        const dy = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
        el.style.transform = `translate3d(${dx * 26}px, ${dy * 20}px, 0)`;
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        position: 'absolute',
        right: '-7%',
        bottom: '-28px',
        width: 'min(50vw, 680px)',
        aspectRatio: '96 / 90',
        zIndex: 0,
        pointerEvents: 'none',
        background: '#AECBB4',
        opacity: 0.5,
        WebkitMaskImage: 'url(/rose-motif.svg)',
        maskImage: 'url(/rose-motif.svg)',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskPosition: 'bottom right',
        maskPosition: 'bottom right',
        transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
        willChange: 'transform',
      }}
    />
  );
}
