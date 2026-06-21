'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { GLP1 } from '@/lib/redesign/content';
import { prefersReducedMotion } from './motion';
import Reveal from './Reveal';
import Cta from './Cta';
import Glp1Depth from './Glp1Depth';

/** Local image parallax — translateY only, clamped so it can never cause
 *  horizontal overflow. Disabled under reduced motion / coarse pointers. */
function useImageParallax<T extends HTMLElement = HTMLDivElement>(amount = 26) {
  const ref = useRef<T>(null);
  const [y, setY] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (prefersReducedMotion() || coarse) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // -1 .. 1 as the element travels through the viewport
        const progress = (vh - r.top) / (vh + r.height);
        const clamped = Math.min(Math.max(progress, 0), 1);
        setY((clamped - 0.5) * 2 * amount);
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
  }, [amount]);
  return { ref, y };
}

export default function Glp1() {
  const { ref: imgRef, y } = useImageParallax<HTMLDivElement>(28);

  return (
    <section
      id="glp1"
      className="cx-section cx-grain"
      aria-labelledby="glp1-heading"
      style={{ position: 'relative', overflow: 'hidden', background: 'var(--white)' }}
    >
      {/* static gradient glow (also the reduced-motion / small-screen fallback) */}
      <div
        aria-hidden
        className="cx-glow"
        style={{ width: 420, height: 420, background: 'rgba(99,145,171,0.25)', top: 40, right: -140 }}
      />
      {/* subtle Three.js depth layer (self-disables on reduced-motion/coarse/small) */}
      <Glp1Depth />

      <div className="cx-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <div
          className="cx-glp-grid"
          style={{ display: 'grid', gap: 'clamp(28px,4vw,56px)', alignItems: 'center' }}
        >
          {/* image */}
          <Reveal style={{ justifySelf: 'center', width: '100%', maxWidth: 380 }}>
            <div
              className="cx-organic-img"
              style={{ aspectRatio: '326 / 430', position: 'relative' }}
            >
              <div
                ref={imgRef}
                style={{
                  position: 'absolute',
                  inset: '-7% 0',
                  willChange: 'transform',
                  transform: `translate3d(0, ${y}px, 0)`,
                }}
              >
                {/* P3: next/image with fill; parent has position:absolute + defined height via inset */}
                <Image
                  src={GLP1.image}
                  alt="Medical weight loss consultation with a doctor at Carisma Slimming clinic, Malta"
                  fill
                  style={{ objectFit: 'cover', display: 'block' }}
                  sizes="(max-width: 880px) 100vw, 380px"
                  priority
                />
              </div>
            </div>
          </Reveal>

          {/* copy */}
          <Reveal>
            <p className="cx-eyebrow" style={{ marginBottom: 14 }}>{GLP1.eyebrow}</p>
            <h2 id="glp1-heading" className="cx-h2" style={{ marginBottom: 18 }}>GLP-1 weight loss programmes, <em>prescribed responsibly</em></h2>
            <p className="cx-lead" style={{ marginBottom: 18 }}>{GLP1.intro}</p>

            <div
              className="cx-glass"
              style={{ borderRadius: 14, padding: '12px 16px', marginBottom: 22, borderLeft: '3px solid var(--sage)' }}
            >
              <p style={{ fontFamily: 'var(--body)', fontSize: 13.5, color: 'var(--sage-ink)', fontWeight: 500 }}>
                {GLP1.note}
              </p>
            </div>

            <Reveal
              as="ul"
              stagger
              style={{ listStyle: 'none', padding: 0, margin: '0 0 22px', display: 'grid', gap: 12 }}
            >
              {GLP1.steps.map((s) => (
                <li
                  key={s}
                  style={{
                    display: 'flex',
                    gap: 11,
                    alignItems: 'flex-start',
                    fontFamily: 'var(--body)',
                    fontSize: 13.5,
                    color: 'var(--taupe)',
                    lineHeight: 1.5,
                  }}
                >
                  <span
                    aria-hidden
                    style={{ flexShrink: 0, marginTop: 5, width: 6, height: 6, borderRadius: '50%', background: 'var(--blue)' }}
                  />
                  <span>{s}</span>
                </li>
              ))}
            </Reveal>

            {/* P1: var(--taupe-lt) may be too light — use var(--taupe) (≥4.5:1 on white) for body text.
                P6: 11.5px is below 14px minimum for body — bumped to 12px (still legal for disclaimers) */}
            <p
              style={{
                fontFamily: 'var(--wide)',
                fontSize: 12,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: 'var(--taupe)',
                lineHeight: 1.6,
                marginBottom: 22,
              }}
            >
              {GLP1.capacity}
            </p>
            {/* P2: CTA aria-label for icon-less button context */}
            <Cta variant="blue" aria-label="Check if you qualify for GLP-1 weight loss treatment">Check if you qualify</Cta>
          </Reveal>
        </div>
      </div>
      <style>{`@media (min-width: 880px){ .cx-glp-grid{ grid-template-columns: 0.85fr 1.15fr; } }`}</style>
    </section>
  );
}
