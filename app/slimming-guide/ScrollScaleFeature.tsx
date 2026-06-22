'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

// "Built for real Maltese life" lifestyle moment — the image scales up + rises as
// the section scrolls into view (the "grows as you scroll" effect). Performance:
// we mutate the node's transform directly on scroll (no React re-renders).
//
// IMAGE IS A PLACEHOLDER — swap `IMG` for a real Maltese-family lifestyle photo
// (family at the table / Sunday lunch) when one is available.
const IMG = '/wix/11062b_926c2ba259264b22bed8a16f8021e64b~mv2.jpg';

const SAGE = '#4f7256';
const DEEP = '#3c5a40';
const TAUPE = '#5f5649';
const HEAD = 'Trajan Pro, serif';
const WIDE = '"Novecento Wide Book","Novecento Wide",sans-serif';
const BODY = 'Roboto, sans-serif';

export default function ScrollScaleFeature() {
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.transform = 'none';
      el.style.opacity = '1';
      return;
    }

    let raf = 0;
    const apply = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      // 0 as the frame enters from the bottom, 1 once it has risen ~90% of a screen.
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.9)));
      const scale = 0.86 + 0.14 * p;
      const ty = (1 - p) * 40;
      const radius = 28 - 18 * p;
      el.style.transform = `translateY(${ty}px) scale(${scale})`;
      el.style.opacity = String(0.45 + 0.55 * p);
      el.style.borderRadius = `${radius}px`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section aria-labelledby="sg-life-h" style={{ background: '#ffffff', padding: 'clamp(48px,8vw,104px) 0', overflow: 'hidden' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" style={{ textAlign: 'center' }}>
        <p style={{ color: TAUPE, fontFamily: WIDE, fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', margin: 0 }}>Made for here</p>
        <div style={{ width: 54, height: 1, background: '#C9B8AE', margin: '14px auto 18px' }} aria-hidden="true" />
        <h2 id="sg-life-h" style={{ color: DEEP, fontFamily: HEAD, fontWeight: 400, fontSize: 'clamp(26px,4vw,40px)', lineHeight: 1.15, textTransform: 'uppercase', margin: 0 }}>
          Built for Real Maltese Life
        </h2>
        <p style={{ color: TAUPE, fontFamily: BODY, fontSize: 16, lineHeight: 1.7, maxWidth: 620, margin: '16px auto 0' }}>
          Festa tables, Sunday lunches and busy weeks — the guide is built around the life you actually live, not a perfect one.
        </p>
      </div>

      <div className="mx-auto" style={{ maxWidth: 1040, padding: '0 16px', marginTop: 'clamp(28px,5vw,56px)' }}>
        <div
          ref={frameRef}
          style={{
            position: 'relative',
            aspectRatio: '16 / 9',
            overflow: 'hidden',
            borderRadius: 28,
            transform: 'translateY(40px) scale(0.86)',
            opacity: 0.45,
            willChange: 'transform, opacity',
            boxShadow: '0 44px 100px -46px rgba(60,90,64,0.55)',
          }}
        >
          {/* PLACEHOLDER image — swap for a Maltese-family lifestyle photo */}
          <Image src={IMG} alt="Everyday Maltese life — real meals, real weeks" fill sizes="(max-width: 1040px) 100vw, 1040px" style={{ objectFit: 'cover' }} />
          <span aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(60,90,64,0) 55%, rgba(60,90,64,0.28) 100%)' }} />
        </div>
      </div>
    </section>
  );
}
