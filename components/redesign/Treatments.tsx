'use client';

import { TREATMENTS } from '@/lib/redesign/content';
import Reveal from './Reveal';

export default function Treatments() {
  return (
    <section id="treatments" className="cx-section" style={{ background: 'linear-gradient(180deg, #fff 0%, var(--cream) 100%)' }}>
      <div className="cx-wrap">
        <Reveal style={{ textAlign: 'center', maxWidth: 680, marginInline: 'auto', marginBottom: 'clamp(36px,5vw,56px)' }}>
          <p className="cx-eyebrow" style={{ marginBottom: 14 }}>Body contouring treatments</p>
          <div className="cx-rule center" style={{ marginBottom: 22 }} />
          <h2 className="cx-h2" style={{ marginBottom: 16 }}>Body contouring &amp; slimming treatments, <em>integrated into your plan</em></h2>
          <p className="cx-lead">Medical-grade treatments that speed up change — recommended only when they will help your specific goals. Non-invasive, with no downtime required.</p>
        </Reveal>

        <Reveal stagger className="cx-treat-grid">
          {TREATMENTS.map((t, i) => (
            <a
              key={t.name}
              href={t.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`cx-card cx-treat${i === 0 ? ' cx-treat--feature' : ''}`}
            >
              <div className="cx-treat-media">
                <img
                  src={t.img}
                  alt={`${t.name} at Carisma Slimming Malta`}
                  className="cx-treat-img"
                  loading="lazy"
                />
                <span aria-hidden className="cx-treat-shade" />
                <span aria-hidden className="cx-treat-index">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="cx-treat-name">{t.name}</h3>
              </div>
              <div className="cx-treat-body">
                <p className="cx-treat-blurb">{t.blurb}</p>
                <span className="cx-link-underline cx-treat-cta">Explore →</span>
              </div>
            </a>
          ))}
        </Reveal>
      </div>

      <style>{`
        .cx-treat-grid { display: grid; gap: 18px; }

        .cx-treat {
          border-radius: 22px;
          overflow: hidden;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          transition: transform 0.55s var(--ease), box-shadow 0.55s var(--ease);
        }
        .cx-treat:hover { transform: translateY(-8px); box-shadow: var(--shadow-float); }

        .cx-treat-media {
          position: relative;
          aspect-ratio: 4 / 3;
          overflow: hidden;
        }
        .cx-treat-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.02);
          transition: transform 1s var(--ease), filter 0.8s var(--ease);
          filter: saturate(0.98);
        }
        .cx-treat:hover .cx-treat-img { transform: scale(1.05); filter: saturate(1.02); }

        .cx-treat-shade {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 30%, rgba(56,80,63,0.18) 55%, rgba(56,80,63,0.72) 100%);
          transition: opacity 0.6s var(--ease);
        }
        .cx-treat:hover .cx-treat-shade { opacity: 0.92; }

        .cx-treat-index {
          position: absolute;
          top: 14px; left: 16px;
          font-family: var(--wide);
          font-size: 11px;
          letter-spacing: 0.18em;
          color: rgba(255,255,255,0.85);
          background: rgba(56,80,63,0.32);
          backdrop-filter: blur(6px);
          padding: 5px 9px;
          border-radius: 999px;
          line-height: 1;
        }

        .cx-treat-name {
          position: absolute;
          left: 18px; right: 18px; bottom: 14px;
          color: #fff;
          font-family: var(--serif);
          font-size: 18px;
          line-height: 1.2;
          transform: translateY(0);
          transition: transform 0.55s var(--ease);
          text-shadow: 0 2px 14px rgba(43,43,40,0.45);
        }
        .cx-treat:hover .cx-treat-name { transform: translateY(-3px); }

        .cx-treat-body {
          padding: 18px 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
          background: var(--white);
        }
        .cx-treat-blurb {
          font-family: var(--body);
          font-size: 13.5px;
          color: var(--taupe);
          line-height: 1.55;
          margin-bottom: 14px;
        }
        .cx-treat-cta {
          margin-top: auto;
          align-self: flex-start;
          font-family: var(--wide);
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--sage-deep);
        }

        @media (min-width: 620px){
          .cx-treat-grid{ grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 1040px){
          /* editorial rhythm on a 6-col grid: feature(4)+card(2) on the top
             row, then two equal cards(3+3) below — tiles cleanly to 6+6. */
          .cx-treat-grid{ grid-template-columns: repeat(6, 1fr); }
          .cx-treat:nth-child(1) { grid-column: span 4; }
          .cx-treat:nth-child(2) { grid-column: span 2; }
          .cx-treat:nth-child(3),
          .cx-treat:nth-child(4) { grid-column: span 3; }
          .cx-treat--feature .cx-treat-media { aspect-ratio: 16 / 9; }
          .cx-treat--feature .cx-treat-name { font-size: 22px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .cx-treat, .cx-treat-img, .cx-treat-name, .cx-treat-sheen { transition: none !important; }
          .cx-treat:hover { transform: none; }
          .cx-treat:hover .cx-treat-img { transform: scale(1.04); }
          .cx-treat-img { transform: scale(1); }
        }
      `}</style>
    </section>
  );
}
