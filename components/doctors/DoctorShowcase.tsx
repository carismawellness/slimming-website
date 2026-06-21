'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { DOCTORS } from '@/lib/doctors';

/* ── Shared design tokens (light gradient footer) ──────────────────────── */
const INK = '#1a1a1a'; // headings
const BODY = '#333333'; // body text
const MUTED = '#595959'; // meta
const SAGE = '#4f7256'; // links / CTA fill (AA on white text)
const SAGE_SOFT = '#8EB093'; // decorative only
const HAIRLINE = '#E5DED7';

const SERIF = 'Trajan Pro, "Trajan Pro Regular", Georgia, serif';
const WIDE = '"Novecento Wide Book","Novecento Wide",sans-serif';
const BODY_FONT = 'Roboto, sans-serif';

function DoctorCard({ doctor, index }: { doctor: (typeof DOCTORS)[number]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  // Cards always render fully visible by default (SSR / no-JS / reduced-motion).
  // We only opt INTO the hidden→revealed animation once JS confirms the
  // IntersectionObserver is wired and the user hasn't asked for reduced motion.
  const [revealed, setRevealed] = useState(true);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return; // keep cards visible immediately, no transforms

    const node = ref.current;
    if (!node) return;

    // Opt into the animation: start hidden, then reveal on scroll-in.
    setRevealed(false);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className="doctor-card"
      data-revealed={revealed ? 'true' : 'false'}
      style={{
        // Staggered, sequential reveal — each card eases in ~150ms after the prior.
        '--reveal-delay': `${index * 150}ms`,
        display: 'flex',
        flexDirection: 'column',
        background: '#ffffff',
        borderRadius: 22,
        overflow: 'hidden',
        border: `1px solid ${HAIRLINE}`,
        boxShadow: '0 18px 44px rgba(26,26,26,0.08)',
        height: '100%',
      } as React.CSSProperties}
    >
      {/* Portrait — large, 3:4, fills card top */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '3 / 4',
          background: 'linear-gradient(180deg,#f6f4ef 0%,#eef3ea 100%)',
        }}
      >
        <Image
          src={doctor.image}
          alt={doctor.name}
          fill
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 33vw"
          priority={index === 0}
          style={{ objectFit: 'cover', objectPosition: 'top center' }}
        />
      </div>

      {/* Text block */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          padding: 'clamp(20px,2.4vw,28px)',
        }}
      >
        <h3
          style={{
            color: INK,
            fontFamily: SERIF,
            fontWeight: 400,
            fontSize: 'clamp(19px,2vw,23px)',
            lineHeight: 1.2,
            textTransform: 'uppercase',
            letterSpacing: 0.3,
            margin: 0,
          }}
        >
          {doctor.name}
        </h3>

        {/* thin sage rule under name */}
        <span
          aria-hidden
          style={{
            display: 'block',
            width: 44,
            height: 2,
            background: SAGE_SOFT,
            borderRadius: 2,
            margin: '12px 0',
          }}
        />

        <p
          style={{
            color: MUTED,
            fontFamily: WIDE,
            fontSize: 11.5,
            letterSpacing: 1.4,
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          {doctor.role} · {doctor.years}
        </p>

        <p
          style={{
            color: BODY,
            fontFamily: BODY_FONT,
            fontSize: 15,
            lineHeight: 1.65,
            margin: '14px 0 0',
          }}
        >
          {expanded ? doctor.fullBio : doctor.highlight}
        </p>

        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          style={{
            alignSelf: 'flex-start',
            background: 'none',
            border: 'none',
            color: SAGE,
            fontFamily: BODY_FONT,
            fontSize: 13,
            fontWeight: 600,
            textDecoration: 'underline',
            textUnderlineOffset: 3,
            cursor: 'pointer',
            padding: 0,
            marginTop: 10,
          }}
        >
          {expanded ? 'Read less' : 'Read more'}
        </button>
      </div>
    </article>
  );
}

export default function DoctorShowcase() {
  return (
    <section
      aria-labelledby="doctors-heading"
      style={{ background: 'transparent', padding: 'clamp(56px,9vw,104px) 0' }}
    >
      <style>{`
        .doctor-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(24px, 3vw, 40px);
        }
        @media (min-width: 768px) {
          .doctor-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .doctor-grid { grid-template-columns: repeat(3, 1fr); }
        }
        .doctor-card {
          transition: transform .4s cubic-bezier(.2,.7,.2,1), box-shadow .4s cubic-bezier(.2,.7,.2,1);
          will-change: transform;
        }
        /* ── Scroll-driven "one-by-one" reveal ─────────────────────────────
           Hidden state translates the card down + fades it out; revealing
           eases it into place. The per-card --reveal-delay (set inline) makes
           the cards appear sequentially as the section scrolls into view.
           Only opacity/transform animate — content is always in the DOM. */
        .doctor-card[data-revealed='false'] {
          opacity: 0;
          transform: translateY(34px) scale(.98);
          transition:
            opacity .62s cubic-bezier(.22,.61,.36,1) var(--reveal-delay, 0ms),
            transform .62s cubic-bezier(.22,.61,.36,1) var(--reveal-delay, 0ms);
        }
        .doctor-card[data-revealed='true'] {
          opacity: 1;
          transform: translateY(0) scale(1);
          transition:
            opacity .62s cubic-bezier(.22,.61,.36,1) var(--reveal-delay, 0ms),
            transform .62s cubic-bezier(.22,.61,.36,1) var(--reveal-delay, 0ms);
        }
        @media (hover: hover) {
          /* Hover lift only applies once the card has finished revealing. */
          .doctor-card[data-revealed='true']:hover {
            transform: translateY(-6px);
            box-shadow: 0 28px 60px rgba(26,26,26,0.14);
            transition: transform .4s cubic-bezier(.2,.7,.2,1), box-shadow .4s cubic-bezier(.2,.7,.2,1);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          /* No transforms/animation: cards are fully visible immediately. */
          .doctor-card,
          .doctor-card[data-revealed='false'],
          .doctor-card[data-revealed='true'] {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
          .doctor-card:hover { transform: none !important; }
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading block */}
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto clamp(36px,5vw,56px)' }}>
          <p
            style={{
              color: MUTED,
              fontFamily: WIDE,
              fontSize: 12,
              letterSpacing: 2.2,
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            Our Medical Team
          </p>
          <h2
            id="doctors-heading"
            style={{
              color: INK,
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: 'clamp(28px,4.4vw,44px)',
              lineHeight: 1.12,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              margin: '10px 0 0',
            }}
          >
            Meet Your Doctors
          </h2>
          <p
            style={{
              color: BODY,
              fontFamily: BODY_FONT,
              fontSize: 16,
              lineHeight: 1.65,
              margin: '16px auto 0',
            }}
          >
            The qualified medical team behind your results — combining decades of clinical
            experience with a calm, considered approach to your care.
          </p>
        </div>

        {/* Photo-forward grid */}
        <div className="doctor-grid">
          {DOCTORS.map((doctor, i) => (
            <DoctorCard key={doctor.name} doctor={doctor} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
