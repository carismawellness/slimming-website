'use client';

import { useRef } from 'react';
import { prefersReducedMotion } from './motion';

type Pillar = {
  n: string;
  title: string;
  tagline: string;
  icon: string;
  items: readonly string[];
};

/**
 * One premium pillar card with pointer-reactive 3D tilt (fine pointers only),
 * a soft glow border that tracks the cursor, an animated number reveal and a
 * refined icon treatment. Reduced-motion / coarse pointers fall back to the
 * static hover-lift defined in Method.tsx's <style> block.
 */
export default function MethodCard({ p }: { p: Pillar }) {
  const ref = useRef<HTMLElement>(null);
  const raf = useRef(0);

  const tiltAllowed = () =>
    !prefersReducedMotion() && window.matchMedia('(pointer: fine)').matches;

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || !tiltAllowed()) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; // 0..1
    const py = (e.clientY - r.top) / r.height; // 0..1
    const rotY = (px - 0.5) * 3; // deg — subtle
    const rotX = (0.5 - py) * 3; // deg — subtle
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.setProperty('--mx', `${px * 100}%`);
      el.style.setProperty('--my', `${py * 100}%`);
      el.style.setProperty('--rx', `${rotX}deg`);
      el.style.setProperty('--ry', `${rotY}deg`);
      el.style.setProperty('--glow', '1');
    });
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(raf.current);
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
    el.style.setProperty('--glow', '0');
  };

  return (
    <li style={{ listStyle: 'none' }}>
      <article
        ref={ref}
        className="cx-card cx-pillar"
        aria-label={`Pillar ${p.n}: ${p.title}`}
        onMouseMove={onMove}
        onMouseLeave={reset}
      >
        <span aria-hidden className="cx-pillar-glow" />
        <span aria-hidden className="cx-pillar-num">{p.n}</span>
        <div className="cx-pillar-inner">
          <div className="cx-pillar-icon" aria-hidden>
            <img src={p.icon} alt="" aria-hidden />
          </div>
          <h3 className="cx-pillar-title">{p.title}</h3>
          <p className="cx-pillar-tag">{p.tagline}</p>
          <ul className="cx-pillar-list" aria-label={`${p.title} features`}>
            {p.items.map((it) => (
              <li key={it}>
                <span aria-hidden className="cx-pillar-dot" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </li>
  );
}
