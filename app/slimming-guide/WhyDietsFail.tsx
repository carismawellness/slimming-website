'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// ─────────────────────────────────────────────────────────────────────────────
// WhyDietsFail — an editorial redesign of the "Why diets fail in Malta" narrative
// for the Carisma Slimming Guide page. Replaces the old flat card + 13px wall of
// text with a premium, paced, emotionally-resonant layout.
//
// Design intent (brand persona Katya — compassionate truth-telling):
//   • A cream editorial ground (#F5F8F2) with a single arched portrait, framed
//     like a magazine spread rather than a boxed rectangle.
//   • The "Monday → Wednesday → again. Then again." loop rendered as a visible
//     cadence/ledger so the reader *feels* the repeating cycle.
//   • A large pull-line — "You didn't." — carries the emotional turn.
//   • Generous whitespace, a quiet scroll-reveal (IntersectionObserver), fully
//     reduced-motion safe.
//
// BRAND RULES honoured:
//   • #024C27 is NEVER a background. Grounds are white / cream #F5F8F2 / light
//     sage #C9D8C1. Deep sage #4f7256 / #3c5a40 for headings & accents.
//   • Body copy is taupe #5f5649 (clears WCAG AA on every ground used here).
//   • Trajan headings ALWAYS uppercase. Eyebrow/labels Novecento Wide, uppercase,
//     tracked. Body Roboto.
//   • ALL original copy is preserved verbatim.
// ─────────────────────────────────────────────────────────────────────────────

const HEADING = "'Trajan Pro', serif";
const LABEL = "'Novecento Wide Book', 'Novecento Wide', sans-serif";
const BODY = "'Roboto', sans-serif";

const GREEN = '#3c5a40'; // deep sage — headings / strong accents
const GREEN_SOFT = '#4f7256'; // deep sage — links / icons (AA on cream)
const TAUPE = '#5f5649'; // body text — AA on white / cream / light sage
const CREAM = '#F5F8F2';
const SAGE_LIGHT = '#C9D8C1';

// The repeating-Monday cadence, rendered as a visual ledger of failed restarts.
const cadence: { week: string; note: string }[] = [
  { week: 'Monday', note: 'You started. You were ready.' },
  { week: 'Wednesday', note: 'Life happened. The willpower wasn’t there.' },
  { week: 'Next Monday', note: 'So you started again.' },
  { week: 'Again', note: 'Then again. Then again.' },
];

function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Respect reduced-motion: show immediately, never animate.
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.16 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, shown };
}

export default function WhyDietsFail() {
  const { ref, shown } = useReveal();

  return (
    <section
      aria-labelledby="why-diets-fail-heading"
      style={{
        position: 'relative',
        overflow: 'hidden',
        // Flows from white into the cream wash, then eases back to white at the
        // very bottom so it fades smoothly into the white section below (no seam).
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F5F8F2 50%, #F5F8F2 80%, #FFFFFF 100%)',
        padding: 'clamp(72px, 11vh, 128px) 0',
      }}
    >
      <style>{`
        @keyframes wdfRise {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .wdf-reveal > * { opacity: 0; }
        .wdf-reveal.is-shown > * {
          animation: wdfRise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .wdf-reveal.is-shown > *:nth-child(1) { animation-delay: 0.00s; }
        .wdf-reveal.is-shown > *:nth-child(2) { animation-delay: 0.08s; }
        .wdf-reveal.is-shown > *:nth-child(3) { animation-delay: 0.16s; }
        .wdf-reveal.is-shown > *:nth-child(4) { animation-delay: 0.24s; }
        .wdf-reveal.is-shown > *:nth-child(5) { animation-delay: 0.32s; }
        .wdf-reveal.is-shown > *:nth-child(6) { animation-delay: 0.40s; }
        @media (prefers-reduced-motion: reduce) {
          .wdf-reveal > *,
          .wdf-reveal.is-shown > * { opacity: 1 !important; animation: none !important; }
        }
        .wdf-link { color: ${GREEN_SOFT}; text-decoration: underline; text-underline-offset: 3px; }
        .wdf-link:hover { color: ${GREEN}; }
        @media (max-width: 900px) {
          .wdf-grid { grid-template-columns: 1fr !important; }
          .wdf-arch { margin: 0 auto 8px !important; }
        }
      `}</style>


      <div
        ref={ref}
        className={`wdf-reveal ${shown ? 'is-shown' : ''}`}
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 1140,
          margin: '0 auto',
          padding: '0 clamp(20px, 6vw, 72px)',
        }}
      >
        {/* ── Eyebrow + heading ─────────────────────────────────────────── */}
        <div style={{ maxWidth: 760 }}>
          <p
            style={{
              fontFamily: LABEL,
              textTransform: 'uppercase',
              letterSpacing: '0.22em',
              fontSize: 'clamp(11px, 1.05vw, 13px)',
              color: TAUPE,
              margin: '0 0 18px',
            }}
          >
            The honest part
          </p>
          <h2
            id="why-diets-fail-heading"
            style={{
              fontFamily: HEADING,
              textTransform: 'uppercase',
              fontWeight: 400,
              letterSpacing: '0.015em',
              lineHeight: 1.18,
              fontSize: 'clamp(24px, 3vw, 28px)',
              color: GREEN,
              margin: 0,
            }}
          >
            Why diets fail in Malta — and what actually works instead.
          </h2>
          <div
            aria-hidden
            style={{
              width: 92,
              height: 1,
              marginTop: 24,
              background: '#C9B8AE',
            }}
          />
        </div>

        {/* ── Editorial split: arched portrait + opening confession ──────── */}
        <div
          className="wdf-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 0.82fr) minmax(0, 1.18fr)',
            gap: 'clamp(32px, 5vw, 72px)',
            alignItems: 'center',
            marginTop: 'clamp(40px, 6vw, 64px)',
          }}
        >
          {/* Arched / petal-radius portrait — framed, not a flat rectangle. */}
          <figure
            className="wdf-arch"
            style={{
              position: 'relative',
              margin: 0,
              width: '100%',
              maxWidth: 360,
            }}
          >
            <div
              aria-hidden
              style={{
                position: 'absolute',
                inset: '-8px -8px 14px -8px',
                borderRadius: '180px 180px 24px 24px',
                background: `linear-gradient(160deg, ${SAGE_LIGHT} 0%, ${CREAM} 100%)`,
                zIndex: 0,
              }}
            />
            <div
              style={{
                position: 'relative',
                zIndex: 1,
                borderRadius: '170px 170px 18px 18px',
                overflow: 'hidden',
                boxShadow: '0 14px 32px rgba(34, 56, 38, 0.12)',
                aspectRatio: '338 / 420',
              }}
            >
              <Image
                src="/wix/11062b_926c2ba259264b22bed8a16f8021e64b~mv2.jpg"
                alt="Woman eating pizza"
                fill
                sizes="(max-width: 900px) 80vw, 360px"
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
              />
            </div>
          </figure>

          {/* Opening confession — set larger and lighter, like a magazine intro. */}
          <div style={{ maxWidth: 560 }}>
            <p
              style={{
                fontFamily: BODY,
                fontSize: 'clamp(18px, 2vw, 22px)',
                lineHeight: 1.4,
                fontWeight: 300,
                color: GREEN,
                margin: '0 0 22px',
              }}
            >
              You started on a Monday. You were ready.
            </p>
            <p
              style={{
                fontFamily: BODY,
                fontSize: '15px',
                lineHeight: 1.65,
                color: TAUPE,
                margin: '0 0 18px',
              }}
            >
              The rules were clear. The commitment felt real.
            </p>
            <p
              style={{
                fontFamily: BODY,
                fontSize: '15px',
                lineHeight: 1.65,
                color: TAUPE,
                margin: 0,
              }}
            >
              By Wednesday, life happened. A dinner you didn&apos;t plan for. A week that
              ran away from you. A moment where you were tired and hungry and the
              willpower just wasn&apos;t there.
            </p>
          </div>
        </div>

        {/* ── The repeating cadence — the loop made visible ──────────────── */}
        <div
          style={{
            marginTop: 'clamp(48px, 7vw, 80px)',
          }}
        >
          <p
            style={{
              fontFamily: LABEL,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              fontSize: 'clamp(10px, 1vw, 12px)',
              color: TAUPE,
              margin: '0 0 22px',
            }}
          >
            The loop you know too well
          </p>
          <ol
            style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
              gap: 'clamp(14px, 2vw, 22px)',
            }}
          >
            {cadence.map((step, i) => (
              <li
                key={step.week}
                style={{
                  position: 'relative',
                  background: '#ffffff',
                  border: `1px solid ${SAGE_LIGHT}`,
                  borderRadius: 16,
                  padding: '22px 22px 24px',
                  boxShadow: 'none',
                }}
              >
                <span
                  aria-hidden
                  style={{
                    fontFamily: HEADING,
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    color: SAGE_LIGHT,
                    lineHeight: 1,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p
                  style={{
                    fontFamily: LABEL,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    fontSize: 'clamp(12px, 1.2vw, 14px)',
                    fontWeight: 700,
                    color: GREEN,
                    margin: '10px 0 8px',
                  }}
                >
                  {step.week}
                </p>
                <p
                  style={{
                    fontFamily: BODY,
                    fontSize: 'clamp(0.92rem, 1.3vw, 1rem)',
                    lineHeight: 1.5,
                    color: TAUPE,
                    margin: 0,
                  }}
                >
                  {step.note}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* ── The reframe — what the pattern actually means ──────────────── */}
        <div
          style={{
            marginTop: 'clamp(48px, 7vw, 84px)',
            maxWidth: 820,
          }}
        >
          <p
            style={{
              fontFamily: BODY,
              fontSize: '15px',
              lineHeight: 1.7,
              color: TAUPE,
              margin: '0 0 22px',
            }}
          >
            Here is what that pattern actually tells you: not that you lack discipline,
            but that the system you were following required too much of it. Every single
            day. Perfect decisions. Perfect portions. Perfect meals.{' '}
            <em style={{ fontStyle: 'italic', color: GREEN }}>
              On days that are never perfect.
            </em>
          </p>
          <p
            style={{
              fontFamily: BODY,
              fontSize: '15px',
              lineHeight: 1.7,
              color: TAUPE,
              margin: 0,
            }}
          >
            You know what happens when a difficult week meets a fragile plan. The plan
            breaks. And somehow, the story you end up telling yourself is that you broke
            it.
          </p>
        </div>

        {/* ── The emotional turn — large pull-line on a sage band ────────── */}
        <div
          style={{
            marginTop: 'clamp(40px, 6vw, 72px)',
            background: '#F5F8F2',
            border: '1px solid #C9D8C1',
            borderRadius: '16px',
            padding: 'clamp(40px, 6vw, 72px) clamp(28px, 6vw, 80px)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <span
            aria-hidden
            style={{
              position: 'absolute',
              left: 'clamp(16px, 3vw, 40px)',
              top: 'clamp(-6px, 0vw, 4px)',
              fontFamily: HEADING,
              fontSize: 'clamp(80px, 12vw, 150px)',
              lineHeight: 1,
              color: '#ffffff',
              opacity: 0.55,
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            &ldquo;
          </span>
          <p
            style={{
              position: 'relative',
              fontFamily: HEADING,
              textTransform: 'uppercase',
              fontWeight: 400,
              letterSpacing: '0.02em',
              lineHeight: 1.05,
              fontSize: 'clamp(28px, 4vw, 40px)',
              color: GREEN,
              margin: 0,
            }}
          >
            You didn&apos;t.
          </p>
          <p
            style={{
              position: 'relative',
              fontFamily: BODY,
              fontSize: 'clamp(15px, 1.6vw, 17px)',
              lineHeight: 1.55,
              color: TAUPE,
              margin: '20px 0 0',
              maxWidth: 560,
            }}
          >
            Not your effort. Not your intention. Not your character.
          </p>
        </div>

        {/* ── Where this starts — the resolution + clinical links ────────── */}
        <div
          style={{
            marginTop: 'clamp(40px, 6vw, 72px)',
            maxWidth: 820,
          }}
        >
          <p
            style={{
              fontFamily: HEADING,
              textTransform: 'uppercase',
              fontWeight: 400,
              letterSpacing: '0.015em',
              lineHeight: 1.25,
              fontSize: 'clamp(20px, 2.2vw, 25px)',
              color: GREEN,
              margin: '0 0 20px',
            }}
          >
            The plan was fragile. That is where this starts.
          </p>
          <p
            style={{
              fontFamily: BODY,
              fontSize: '15px',
              lineHeight: 1.7,
              color: TAUPE,
              margin: 0,
            }}
          >
            If you want clinical support alongside the habit system, explore our{' '}
            <Link href="/weight-loss" className="wdf-link">
              medical weight loss programme
            </Link>{' '}
            or{' '}
            <Link href="/glp1" className="wdf-link">
              GLP-1 weight loss injections
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
