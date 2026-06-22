'use client';

import Image from 'next/image';
import MotifAccent from '@/components/layers/MotifAccent';

// Bespoke above-the-fold hero for the Carisma Slimming Guide page.
// Recreates the feel of the brand's original Wix hero: a deep-sage -> light-sage
// gradient backdrop with the guide book floating freely (no boxed container),
// a faint radial glow behind it, guide-relevant social-proof chips, and a subtle
// brand motif. Self-contained, no props. Client component only for the gentle
// float animation (disabled under prefers-reduced-motion).
//
// BRAND RULES honoured:
// - #024C27 is BANNED as a background. Dark side uses deep sage #3c5a40/#4f7256
//   fading to light sage #C9D8C1 / cream #F5F8F2.
// - White text only on the deep sage region (AA); switches to #3c5a40 / #5f5649
//   on the light region.
// - Trajan headings are ALWAYS uppercase. Eyebrow/labels/CTA are Novecento Wide.

const PRODUCT_URL =
  'https://www.carismaslimming.com/product-page/the-carisma-slimming-weight-loss-guide-malta';

const HEADING = "'Trajan Pro', serif";
const LABEL = "'Novecento Wide Book', 'Novecento Wide', sans-serif";
const BODY = "'Roboto', sans-serif";

const checklist: { lead: string; rest: string }[] = [
  { lead: 'What to eat', rest: '— and what to swap, using local Maltese ingredients' },
  { lead: 'When to eat', rest: '— simple meal timing that fits your schedule' },
  { lead: '30+ recipes', rest: '— built for the Mediterranean kitchen' },
  { lead: 'A structure', rest: '— that works around social dinners and busy days' },
];

type Chip = {
  label: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
};

const chips: Chip[] = [
  { label: '30+ RECIPES', top: '6%', left: '-4%' },
  { label: 'BUILT FOR MALTA', top: '40%', right: '-6%' },
  { label: 'FOR ONLY €30', bottom: '8%', left: '2%' },
];

export default function GuideHero() {
  return (
    <section
      aria-labelledby="guide-hero-heading"
      style={{
        position: 'relative',
        overflow: 'hidden',
        // Deep sage at the top fading to light sage / cream at the bottom.
        backgroundImage:
          'linear-gradient(165deg, #3c5a40 0%, #4f7256 26%, #7d9c80 52%, #C9D8C1 78%, #F5F8F2 100%)',
        paddingTop: 'clamp(120px, 16vh, 160px)',
        paddingBottom: 'clamp(72px, 10vh, 120px)',
      }}
    >
      <style>{`
        @keyframes guideHeroFloat {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-14px); }
        }
        @keyframes guideHeroChip {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
        .guide-hero-book { animation: guideHeroFloat 6.5s ease-in-out infinite; }
        .guide-hero-chip { animation: guideHeroChip 5s ease-in-out infinite; }
        .guide-hero-chip--b { animation-delay: 1.1s; }
        .guide-hero-chip--c { animation-delay: 2.3s; }
        @media (prefers-reduced-motion: reduce) {
          .guide-hero-book,
          .guide-hero-chip { animation: none; }
        }
      `}</style>

      {/* Faint brand motif behind the eyebrow / top edge — decorative only. */}
      <MotifAccent
        mode="divider"
        style={{
          position: 'absolute',
          top: 'clamp(96px, 13vh, 132px)',
          left: 'clamp(20px, 6vw, 80px)',
          width: 'min(44vw, 360px)',
          opacity: 0.18,
          color: '#F5F8F2',
        }}
      />

      <div
        style={{
          position: 'relative',
          maxWidth: 1180,
          margin: '0 auto',
          padding: '0 clamp(20px, 6vw, 80px)',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 0.95fr)',
          gap: 'clamp(40px, 6vw, 88px)',
          alignItems: 'center',
        }}
        className="guide-hero-grid"
      >
        {/* ---------- LEFT: copy (sits on the deep-sage region → white text) ---------- */}
        <div style={{ position: 'relative', zIndex: 2, color: '#ffffff' }}>
          <p
            style={{
              fontFamily: LABEL,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              fontSize: 'clamp(11px, 1.1vw, 13px)',
              margin: '0 0 18px',
              color: '#e7efe4',
            }}
          >
            Recipes, meal timing &amp; a structured plan
          </p>

          <h1
            id="guide-hero-heading"
            style={{
              fontFamily: HEADING,
              textTransform: 'uppercase',
              lineHeight: 1.08,
              letterSpacing: '0.01em',
              fontSize: 'clamp(2.1rem, 4.6vw, 3.4rem)',
              margin: '0 0 20px',
              color: '#ffffff',
            }}
          >
            The Weight-Loss Guide
            <span style={{ display: 'block', color: '#dbe7d6', marginTop: 6 }}>
              Built for Maltese Lifestyle
            </span>
          </h1>

          <p
            style={{
              fontFamily: BODY,
              fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
              lineHeight: 1.55,
              maxWidth: 520,
              margin: '0 0 28px',
              color: '#f0f5ee',
            }}
          >
            A doctor-backed system you can actually follow — no crash diets, no calorie
            counting.
          </p>

          <ul
            style={{
              listStyle: 'none',
              margin: '0 0 30px',
              padding: 0,
              display: 'grid',
              gap: 12,
              maxWidth: 540,
            }}
          >
            {checklist.map((item) => (
              <li
                key={item.lead}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                  fontFamily: BODY,
                  fontSize: 'clamp(0.95rem, 1.35vw, 1.08rem)',
                  lineHeight: 1.45,
                  color: '#f0f5ee',
                }}
              >
                <span
                  aria-hidden
                  style={{
                    flex: '0 0 auto',
                    width: 22,
                    height: 22,
                    marginTop: 2,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.16)',
                    border: '1px solid rgba(255,255,255,0.5)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontSize: 13,
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  ✓
                </span>
                <span>
                  <strong style={{ fontWeight: 700, color: '#ffffff' }}>{item.lead}</strong>{' '}
                  {item.rest}
                </span>
              </li>
            ))}
          </ul>

          <p
            style={{
              fontFamily: LABEL,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontSize: 'clamp(1.05rem, 1.7vw, 1.35rem)',
              fontWeight: 700,
              margin: '0 0 22px',
              color: '#ffffff',
            }}
          >
            For only €30
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '18px 24px',
            }}
          >
            <a
              href={PRODUCT_URL}
              className="cta-glow"
              style={{
                display: 'inline-block',
                fontFamily: LABEL,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontSize: 'clamp(0.85rem, 1.2vw, 0.98rem)',
                fontWeight: 700,
                padding: '16px 34px',
                textDecoration: 'none',
              }}
            >
              Get the Slimming Guide
            </a>

            <span
              style={{
                fontFamily: BODY,
                fontSize: 'clamp(0.85rem, 1.1vw, 0.95rem)',
                color: '#f0f5ee',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ color: '#ffe6a3' }}>★</span> 4.9 · 800+ verified reviews
            </span>
          </div>
        </div>

        {/* ---------- RIGHT: floating book + glow + chips (no boxed container) ---------- */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 'clamp(360px, 46vw, 520px)',
            zIndex: 1,
          }}
        >
          {/* Soft radial glow behind the book — purely decorative. */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              width: 'min(78%, 460px)',
              aspectRatio: '1 / 1',
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(255,255,255,0.55) 0%, rgba(245,248,242,0.28) 42%, rgba(245,248,242,0) 70%)',
              filter: 'blur(6px)',
            }}
          />

          {/* The guide book, floating with a soft drop shadow — NO rectangular box. */}
          <div
            className="guide-hero-book"
            style={{
              position: 'relative',
              width: 'min(86%, 420px)',
              filter: 'drop-shadow(0 26px 44px rgba(34, 56, 38, 0.42))',
            }}
          >
            <Image
              src="/wix/f940f0_a2ae67089c094ea4a1ed8c7a81f3c315~mv2.webp"
              alt="The Carisma Slimming Guide book — Maltese recipes, meal timing and a structured weight-loss plan"
              width={460}
              height={575}
              priority
              sizes="(max-width: 768px) 70vw, 420px"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>

          {/* Guide-relevant frosted social-proof chips, subtly offset around the book. */}
          {chips.map((chip, i) => (
            <span
              key={chip.label}
              className={`guide-hero-chip ${
                i === 1 ? 'guide-hero-chip--b' : i === 2 ? 'guide-hero-chip--c' : ''
              }`}
              style={{
                position: 'absolute',
                top: chip.top,
                left: chip.left,
                right: chip.right,
                bottom: chip.bottom,
                zIndex: 3,
                fontFamily: LABEL,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontSize: 'clamp(10px, 1vw, 12px)',
                fontWeight: 700,
                color: '#3c5a40',
                background: 'rgba(255, 255, 255, 0.78)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.9)',
                borderRadius: 999,
                padding: '9px 16px',
                boxShadow: '0 8px 22px rgba(34, 56, 38, 0.18)',
                whiteSpace: 'nowrap',
              }}
            >
              {chip.label}
            </span>
          ))}
        </div>
      </div>

      {/* Single-column stack on mobile. */}
      <style>{`
        @media (max-width: 860px) {
          .guide-hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
