'use client';

import dynamic from 'next/dynamic';
import { PILLARS } from '@/lib/redesign/content';
import Reveal from './Reveal';
import Cta from './Cta';
import MethodCard from './MethodCard';

// Three.js backdrop is client-only and lazy — never blocks first paint.
const MethodCanvas = dynamic(() => import('./MethodCanvas'), { ssr: false });

export default function Method() {
  return (
    <section id="method" className="cx-section cx-method" aria-labelledby="method-heading" style={{ background: 'var(--white)', position: 'relative', overflow: 'hidden' }}>
      <MethodCanvas />

      <div className="cx-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <Reveal style={{ textAlign: 'center', maxWidth: 720, marginInline: 'auto', marginBottom: 'clamp(40px,5vw,64px)' }}>
          <p className="cx-eyebrow" style={{ marginBottom: 14 }}>The Carisma Method</p>
          <div className="cx-rule center" style={{ marginBottom: 22 }} />
          <h2 id="method-heading" className="cx-h2" style={{ marginBottom: 18 }}>
            Malta&rsquo;s only <em>multidisciplinary</em> approach to slimming
          </h2>
          <p className="cx-lead" style={{ lineHeight: 1.625 }}>Four pillars working together — assessment, nutrition, movement and body contouring — in one doctor-led plan. Not another diet. A system built around your body.</p>
        </Reveal>

        <Reveal stagger className="cx-pillars" as="ol">
          {PILLARS.map((p) => (
            <MethodCard key={p.n} p={p} />
          ))}
        </Reveal>

        <div style={{ textAlign: 'center', marginTop: 'clamp(36px,5vw,52px)' }}>
          <Cta variant="blue">Get your free body analysis</Cta>
        </div>
      </div>

      <style>{`
        .cx-method { isolation: isolate; }

        .cx-pillars {
          display: grid;
          gap: 18px;
          perspective: 1200px;
        }

        .cx-pillar {
          position: relative;
          padding: 26px 22px;
          border-radius: 22px;
          overflow: hidden;
          transform-style: preserve-3d;
          transform: perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg)) translateY(0);
          transition: transform 0.5s var(--ease), box-shadow 0.5s var(--ease);
          will-change: transform;
        }

        /* cursor-tracking soft glow border + inner sheen */
        .cx-pillar-glow {
          position: absolute;
          inset: 0;
          border-radius: 22px;
          padding: 1px;
          opacity: var(--glow, 0);
          transition: opacity 0.45s var(--ease);
          background: radial-gradient(
            260px circle at var(--mx,50%) var(--my,0%),
            rgba(142,176,147,0.55), rgba(99,145,171,0.18) 45%, transparent 70%
          );
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          mask-composite: exclude;
          pointer-events: none;
          z-index: 3;
        }
        .cx-pillar::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 22px;
          opacity: var(--glow, 0);
          transition: opacity 0.45s var(--ease);
          background: radial-gradient(
            340px circle at var(--mx,50%) var(--my,0%),
            rgba(242,246,239,0.9), transparent 60%
          );
          pointer-events: none;
          z-index: 0;
        }

        .cx-pillar-num {
          position: absolute;
          top: 14px;
          right: 18px;
          font-family: var(--serif);
          font-size: 46px;
          line-height: 1;
          color: rgba(142,176,147,0.16);
          z-index: 1;
          transform: translateY(8px);
          opacity: 0;
          transition: transform 0.7s var(--ease), opacity 0.7s var(--ease), color 0.45s var(--ease);
        }
        .cx-stagger.is-in .cx-pillar-num { transform: translateY(0); opacity: 1; }
        .cx-stagger.is-in .cx-pillar:nth-child(2) .cx-pillar-num { transition-delay: 0.10s; }
        .cx-stagger.is-in .cx-pillar:nth-child(3) .cx-pillar-num { transition-delay: 0.18s; }
        .cx-stagger.is-in .cx-pillar:nth-child(4) .cx-pillar-num { transition-delay: 0.26s; }
        .cx-pillar:hover .cx-pillar-num { color: rgba(142,176,147,0.30); }

        .cx-pillar-inner { position: relative; z-index: 2; transform: translateZ(28px); }

        .cx-pillar-icon {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          background: linear-gradient(155deg, var(--sage-mist), var(--sage-soft));
          display: grid;
          place-items: center;
          margin-bottom: 18px;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.6), 0 10px 24px -16px rgba(56,80,63,0.5);
          transition: transform 0.55s var(--ease), box-shadow 0.55s var(--ease);
        }
        .cx-pillar-icon img { max-height: 30px; width: auto; object-fit: contain; transition: transform 0.55s var(--ease); }
        .cx-pillar:hover .cx-pillar-icon { transform: translateY(-2px) scale(1.04); box-shadow: inset 0 1px 0 rgba(255,255,255,0.7), 0 16px 30px -16px rgba(56,80,63,0.6); }
        .cx-pillar:hover .cx-pillar-icon img { transform: scale(1.06); }

        .cx-pillar-title { font-family: var(--serif); font-size: 19px; color: var(--sage-ink); line-height: 1.2; margin-bottom: 8px; }
        .cx-pillar-tag { font-family: var(--body); font-size: 13px; color: var(--sage-deep); font-weight: 500; margin-bottom: 16px; }
        .cx-pillar-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 9px; }
        .cx-pillar-list li { display: flex; gap: 9px; align-items: flex-start; font-family: var(--body); font-size: 13px; color: var(--taupe); line-height: 1.45; }
        .cx-pillar-dot { flex-shrink: 0; margin-top: 6px; width: 5px; height: 5px; border-radius: 50%; background: var(--sage); transition: transform 0.4s var(--ease), box-shadow 0.4s var(--ease); }
        .cx-pillar:hover .cx-pillar-dot { transform: scale(1.4); box-shadow: 0 0 0 3px rgba(142,176,147,0.15); }

        .cx-pillar:hover { box-shadow: var(--shadow-float); }

        @media (min-width: 620px){ .cx-pillars{ grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1040px){ .cx-pillars{ grid-template-columns: repeat(4, 1fr); } }

        @media (prefers-reduced-motion: reduce) {
          .cx-pillar { transform: none !important; }
          .cx-pillar-num { transform: none !important; opacity: 1 !important; transition: none !important; }
        }
      `}</style>
    </section>
  );
}
