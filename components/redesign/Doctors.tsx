'use client';

import { useState } from 'react';
import { DOCTORS } from '@/lib/redesign/content';
import Reveal from './Reveal';
import Cta from './Cta';
import CountUp from '@/components/CountUp';

function DoctorCard({ d }: { d: (typeof DOCTORS)[number] }) {
  const [open, setOpen] = useState(false);
  const bioId = `bio-${d.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;
  return (
    <article className="cx-card cx-doc" style={{ borderRadius: 22, overflow: 'hidden' }}>
      <div
        className="cx-doc-media"
        style={{ position: 'relative', aspectRatio: '343 / 360', overflow: 'hidden', background: 'var(--sage-mist)' }}
      >
        <img
          src={d.img}
          alt={`${d.name}, ${d.role} at Carisma Slimming Malta`}
          className="cx-doc-img"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
        />
        {/* warm tint that lifts on hover, revealing full colour */}
        <span aria-hidden className="cx-doc-tint" />
        {/* experience badge */}
        <span className="cx-pill cx-doc-badge" style={{ position: 'absolute', top: 12, left: 12 }}>
          <CountUp value={d.exp} /> experience
        </span>
      </div>
      <div style={{ padding: '20px 22px 24px' }}>
        <h3 style={{ fontFamily: 'var(--serif)', fontSize: 21, color: 'var(--sage-ink)', marginBottom: 4 }}>
          {d.name}
        </h3>
        <p
          style={{
            fontFamily: 'var(--wide)',
            fontSize: 11,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#4f7256',
            marginBottom: 14,
          }}
        >
          {d.role}
        </p>
        <p
          id={bioId}
          className="cx-doc-bio"
          style={{
            fontFamily: 'var(--body)',
            fontSize: 13.5,
            color: 'var(--taupe)',
            lineHeight: 1.625,
            ...(open
              ? {}
              : {
                  display: '-webkit-box',
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: 'vertical' as const,
                  overflow: 'hidden',
                }),
          }}
        >
          {d.bio}
        </p>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="cx-link-underline"
          aria-expanded={open}
          aria-controls={bioId}
          style={{
            marginTop: 10,
            minHeight: 44,
            background: 'none',
            border: 'none',
            padding: '0 0 8px',
            cursor: 'pointer',
            fontFamily: 'var(--wide)',
            fontSize: 10.5,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#4f7256',
          }}
        >
          {open ? 'Show less' : 'Read full bio'}
        </button>
      </div>
    </article>
  );
}

export default function Doctors() {
  return (
    <section
      id="doctors"
      className="cx-section"
      aria-labelledby="doctors-heading"
      style={{ background: 'linear-gradient(180deg, var(--cream) 0%, #fff 100%)' }}
    >
      <div className="cx-wrap">
        <Reveal
          style={{
            textAlign: 'center',
            maxWidth: 680,
            marginInline: 'auto',
            marginBottom: 'clamp(36px,5vw,56px)',
          }}
        >
          <p className="cx-eyebrow" style={{ marginBottom: 14 }}>Doctor-led care</p>
          <div className="cx-rule center" style={{ marginBottom: 22 }} />
          <h2 id="doctors-heading" className="cx-h2" style={{ marginBottom: 16 }}>
            Real doctors, <em>genuinely in your corner</em>
          </h2>
          <p className="cx-lead">
            Your plan is designed and supervised by qualified medical professionals — not a
            beauty-salon diet program.
          </p>
        </Reveal>

        <Reveal stagger className="cx-doc-grid" style={{ display: 'grid', gap: 20 }}>
          {DOCTORS.map((d) => (
            <DoctorCard key={d.name} d={d} />
          ))}
        </Reveal>

        <div style={{ textAlign: 'center', marginTop: 'clamp(34px,5vw,52px)' }}>
          <Cta variant="primary">Meet the team — book your free analysis</Cta>
        </div>
      </div>
      <style>{`
        .cx-doc { position: relative; transition: transform 0.55s var(--ease), box-shadow 0.55s var(--ease); }
        .cx-doc:hover { transform: translateY(-6px); box-shadow: var(--shadow-float); }
        .cx-doc .cx-link-underline:focus-visible {
          outline: 2px solid #4f7256;
          outline-offset: 2px;
          border-radius: 2px;
        }

        .cx-doc-img {
          transition: transform .9s var(--ease), filter .8s var(--ease);
          filter: saturate(0.78) contrast(1.02) sepia(0.06);
        }
        .cx-doc:hover .cx-doc-img,
        .cx-doc:focus-within .cx-doc-img {
          transform: scale(1.05);
          filter: saturate(1.05) contrast(1) sepia(0);
        }

        /* duotone-style warm tint over the image, lifts on hover */
        .cx-doc-tint {
          position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(180deg, rgba(95,126,102,0.18) 0%, rgba(56,80,63,0.34) 100%);
          mix-blend-mode: multiply;
          opacity: 1; transition: opacity .8s var(--ease);
        }
        .cx-doc:hover .cx-doc-tint,
        .cx-doc:focus-within .cx-doc-tint { opacity: 0.15; }

        /* badge polish */
        .cx-doc-badge {
          backdrop-filter: blur(8px);
          box-shadow: var(--shadow-soft);
          transition: transform .5s var(--ease), background .5s var(--ease);
        }
        .cx-doc:hover .cx-doc-badge { transform: translateY(-2px); }

        @media (min-width: 760px){ .cx-doc-grid{ grid-template-columns: repeat(3, 1fr); } }

        @media (prefers-reduced-motion: reduce) {
          .cx-doc-img { filter: none !important; transition: none !important; }
          .cx-doc-tint { opacity: 0.15 !important; }
          .cx-doc:hover { transform: none; }
        }
      `}</style>
    </section>
  );
}
