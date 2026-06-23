'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CountUp from '@/components/CountUp';

/**
 * ResultsGuarantee — "The Carisma Results Commitment" section.
 *
 * A calm, premium, centred "About Us / stats" layout: a small pill eyebrow, a
 * Trajan H2 (uppercase) with a Roboto subline, a fanned cluster of three image
 * cards (a prominent upright centre card with two rotated cards behind it), a
 * row of three percentage stats divided by thin rules, and an on-brand sage
 * CTA pill that links to /consultation.
 *
 * All copy stays in the server-rendered DOM (SEO / a11y). One subtle,
 * reduced-motion-safe fade/rise reveal cascades heading → images → stats → CTA.
 * No WebGL, no frosted panels — just whitespace, typography and three photos.
 *
 * NOTE: the three stat percentages below (93% / 89% / 96%) are PLACEHOLDER
 * figures chosen to fit the design. Verify and replace with real client data
 * before relying on them publicly.
 */

const FOREST = '#024C27'; // deepest brand forest — big numbers / CTA fill
const INK = '#3c5a40'; // deep sage heading
const SAGE = '#4f7256'; // accent / divider / eyebrow text (5.42:1 on white)
const BODY = '#5a5043'; // taupe-brown body (AA on near-white)
const META = '#6f6456'; // eyebrow / subline / descriptions (AA on near-white)
const SERIF = 'Trajan Pro, serif';
const WIDE = '"Novecento Wide Book","Novecento Wide",sans-serif';
const ROBOTO = 'Roboto, sans-serif';

/* The three fanned photos. Centre card sits upright and larger; the two
   flanking cards are rotated and tucked behind it like a hand of cards. */
const CARDS = [
  {
    src: '/wix/87fc13_6495820e70764a1fa3caddfb20d80fe0~mv2.webp',
    alt: 'GLP-1 medical weight-loss consultation at Carisma Slimming Malta',
    role: 'left' as const,
  },
  {
    src: '/wix/87fc13_08e868147da2475ba4b9638849be145e~mv2.jpg',
    alt: 'Doctor-led weight-loss program and body-composition review at Carisma Slimming Malta',
    role: 'center' as const,
  },
  {
    src: '/wix/87fc13_d79664fae1184e8e8c947c3d350af498~mv2.jpg',
    alt: 'Body-sculpting and transformation results at Carisma Slimming Malta',
    role: 'right' as const,
  },
];

/* PLACEHOLDER stats — client-sentiment framing, not clinical efficacy claims.
   Verify the three percentages against real data before publishing. */
const STATS = [
  {
    value: '93%',
    title: 'Reach Their Goal',
    desc: 'Clients who hit their target on our doctor-led plan — extended free until you do.',
  },
  {
    value: '89%',
    title: 'Keep It Off',
    desc: 'Maintain their results long-term with gentle structure and weekly check-ins.',
  },
  {
    value: '96%',
    title: 'Would Recommend',
    desc: 'Clients who would recommend Carisma to a friend or family member.',
  },
];

export default function ResultsGuarantee() {
  const rootRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    // Respect reduced motion: reveal immediately, skip the observer & hidden state.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRevealed(true);
      return;
    }

    setArmed(true);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={rootRef}
      aria-labelledby="results-heading"
      data-armed={armed && !revealed ? '' : undefined}
      className={`rg${revealed ? ' rg--in' : ''}`}
      style={{
        padding: 'clamp(46px,10vw,128px) 0',
        background: 'linear-gradient(180deg,#ffffff 0%,#f5f8f2 100%)',
      }}
    >
      <style>{`
        /* Subtle, reduced-motion-safe fade/rise. The hidden start state only
           applies once JS has armed the section (data-armed), so SSR / no-JS
           renders stay fully visible. */
        .rg[data-armed] .rg-rise { opacity: 0; transform: translateY(14px); }
        .rg-rise { transition: opacity .7s ease, transform .7s cubic-bezier(.2,.7,.2,1); }
        .rg--in .rg-rise { opacity: 1; transform: none; }
        .rg-rise.rg-d1 { transition-delay: .08s; }
        .rg-rise.rg-d2 { transition-delay: .18s; }
        .rg-rise.rg-d3 { transition-delay: .28s; }
        .rg-rise.rg-d4 { transition-delay: .38s; }

        /* ── Fanned image cluster ── */
        .rg-fan {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          height: clamp(300px, 40vw, 440px);
        }
        .rg-card {
          position: absolute;
          border-radius: 20px;
          overflow: hidden;
          background: #fff;
          box-shadow: 0 24px 60px -20px rgba(2,76,39,0.28), 0 6px 18px -8px rgba(2,76,39,0.18);
        }
        .rg-card img { object-fit: cover; }
        .rg-card--center {
          width: clamp(220px, 26vw, 300px);
          height: clamp(280px, 33vw, 380px);
          z-index: 3;
        }
        .rg-card--left {
          width: clamp(180px, 22vw, 250px);
          height: clamp(240px, 28vw, 320px);
          transform: translateX(clamp(-118px, -16vw, -176px)) rotate(-8deg);
          z-index: 1;
        }
        .rg-card--right {
          width: clamp(180px, 22vw, 250px);
          height: clamp(240px, 28vw, 320px);
          transform: translateX(clamp(118px, 16vw, 176px)) rotate(8deg);
          z-index: 1;
        }
        /* On very small screens, tighten the fan to a gentle overlap. */
        @media (max-width: 460px) {
          .rg-fan { height: clamp(280px, 78vw, 340px); }
          .rg-card--center { width: 60vw; height: 74vw; max-height: 320px; }
          .rg-card--left  { transform: translateX(-32vw) rotate(-7deg); }
          .rg-card--right { transform: translateX(32vw) rotate(7deg); }
        }

        /* ── Stats row ── */
        .rg-stats {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
        }
        .rg-stat { padding: 24px clamp(16px,3vw,40px); text-align: center; }
        .rg-stat + .rg-stat { border-top: 1px solid rgba(79,114,86,0.18); }
        @media (min-width: 760px) {
          .rg-stats { grid-template-columns: repeat(3, 1fr); }
          .rg-stat + .rg-stat { border-top: none; border-left: 1px solid rgba(79,114,86,0.22); }
        }

        /* ── CTA ── */
        .rg-cta { transition: transform .25s ease, box-shadow .25s ease, background-color .25s ease; }
        .rg-cta:hover { background-color: #036334 !important; transform: translateY(-2px); }
        .rg-cta:focus-visible { outline: 3px solid #024C27; outline-offset: 3px; }

        @media (prefers-reduced-motion: reduce) {
          .rg-rise { transition: none !important; opacity: 1 !important; transform: none !important; }
          .rg-cta { transition: none !important; }
          .rg-cta:hover { transform: none; }
        }
      `}</style>

      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        {/* ── Heading ── */}
        <div className="rg-rise" style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto' }}>
          <span
            style={{
              display: 'inline-block',
              padding: '7px 16px',
              borderRadius: 999,
              border: `1px solid ${SAGE}`,
              background: 'rgba(79,114,86,0.06)',
              color: SAGE,
              fontFamily: WIDE,
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
            }}
          >
            Our Commitment
          </span>
          <h2
            id="results-heading"
            style={{
              color: INK,
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: 'clamp(27px,3.8vw,42px)',
              lineHeight: 1.16,
              textTransform: 'uppercase',
              margin: '22px 0 0',
            }}
          >
            The Carisma Results Commitment
          </h2>
          <p style={{ color: META, fontFamily: ROBOTO, fontSize: 'clamp(16px,1.7vw,19px)', lineHeight: 1.6, margin: '14px auto 0', maxWidth: 520 }}>
            Up to 1kg a week. Measured. Verified. Committed to your weight loss.
          </p>
        </div>

        {/* ── Fanned image cluster ── */}
        <div className="rg-fan rg-rise rg-d1" style={{ marginTop: 'clamp(40px,6vw,64px)' }}>
          {CARDS.map((c) => (
            <div key={c.src} className={`rg-card rg-card--${c.role}`}>
              <Image
                src={c.src}
                alt={c.alt}
                fill
                sizes="(max-width: 460px) 60vw, (max-width: 760px) 30vw, 300px"
                style={{ objectPosition: '50% 30%' }}
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* ── Stats row ── */}
        <div className="rg-stats rg-rise rg-d2" style={{ marginTop: 'clamp(48px,7vw,80px)' }}>
          {STATS.map((s) => (
            <div key={s.title} className="rg-stat">
              <div
                style={{
                  color: FOREST,
                  fontFamily: SERIF,
                  fontWeight: 400,
                  fontSize: 'clamp(40px,5.5vw,60px)',
                  lineHeight: 1,
                  textTransform: 'uppercase',
                }}
              >
                <CountUp value={s.value} />
              </div>
              <h3
                style={{
                  color: INK,
                  fontFamily: WIDE,
                  fontSize: 12.5,
                  fontWeight: 400,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  margin: '14px 0 8px',
                }}
              >
                {s.title}
              </h3>
              <p style={{ color: META, fontFamily: ROBOTO, fontSize: 14.5, lineHeight: 1.6, margin: 0, maxWidth: 300, marginInline: 'auto' }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        {/* ── CTA pill ── */}
        <div className="rg-rise rg-d3" style={{ textAlign: 'center', marginTop: 'clamp(40px,6vw,64px)' }}>
          <Link
            href="/consultation"
            className="cta-glow"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '15px 36px',
              color: '#fff',
              fontFamily: WIDE,
              fontSize: 13,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            Book Your Free Consultation
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
