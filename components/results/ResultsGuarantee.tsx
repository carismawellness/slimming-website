'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * ResultsGuarantee — a calm, premium "results guarantee" section.
 *
 * Deliberately minimal: a centred Trajan H2 (carrying the guarantee keyword), a
 * short reassuring eyebrow + subtitle, one confident pledge statement, and the
 * mutual pact presented as two airy, understated columns — "Our promise to you"
 * (the GUARANTEE array) and "Your commitment" (the COMMITMENT array). No WebGL,
 * no frosted panels, no per-item line icons: just whitespace, typography and a
 * single small sage check. One subtle fade/rise scroll-reveal, reduced-motion
 * safe. All copy stays in the server-rendered DOM (SEO / a11y).
 */

const INK = '#3c5a40'; // deep sage heading
const SAGE = '#4f7256'; // accent / check (5.42:1 on white)
const BODY = '#5a5043'; // taupe-brown body (AA on near-white)
const META = '#6f6456'; // eyebrow / meta (AA on near-white)
const SERIF = 'Trajan Pro, serif';
const WIDE = '"Novecento Wide Book","Novecento Wide",sans-serif';
const ROBOTO = 'Roboto, sans-serif';

// Our side of the pact.
const GUARANTEE = [
  'Doctor-led and medically supervised, every step',
  'Progress measured and verified — never guesswork',
  'Program extended free until you reach your goal',
];

// The client's side — kept verbatim (a real agreement).
const COMMITMENT = [
  'Attend all scheduled in-clinic sessions and weekly check-ins',
  'Follow your personalised food plan consistently and tell us when you struggle',
  'Complete your agreed physical activities & discuss any pain or obstacles',
  'Use only the treatments and medications recommended by our medical team',
  'Inform us of any major health (e.g., heart disease) or medication changes',
  'Avoid crash diets, extreme restriction or outside weight-loss treatments that could affect your results',
];

/* A single small sage check — the only decoration we allow. */
function Check() {
  return (
    <span
      aria-hidden="true"
      style={{
        flexShrink: 0,
        marginTop: 3,
        color: SAGE,
        lineHeight: 0,
      }}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
        <path d="M5 13l4 4L19 7" stroke={SAGE} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

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
        padding: 'clamp(72px,10vw,128px) 0',
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
        .rg-rise.rg-d2 { transition-delay: .16s; }
        .rg-rise.rg-d3 { transition-delay: .24s; }

        .rg-pact { display: grid; grid-template-columns: 1fr; gap: clamp(40px,6vw,72px); }
        @media (min-width: 820px) { .rg-pact { grid-template-columns: 1fr 1fr; } }

        @media (prefers-reduced-motion: reduce) {
          .rg-rise { transition: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>

      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* ── Heading ── */}
        <div className="rg-rise" style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
          <p style={{ color: META, fontFamily: WIDE, fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', margin: 0 }}>
            Our Results-Driven Promise
          </p>
          <span aria-hidden="true" style={{ display: 'block', width: 48, height: 1, background: SAGE, opacity: 0.55, margin: '16px auto 20px' }} />
          <h2
            id="results-heading"
            style={{ color: INK, fontFamily: SERIF, fontWeight: 400, fontSize: 'clamp(26px,3.6vw,40px)', lineHeight: 1.18, textTransform: 'uppercase', margin: 0 }}
          >
            The Carisma Results Guarantee
          </h2>
          <p style={{ color: BODY, fontFamily: ROBOTO, fontSize: 'clamp(15px,1.6vw,17px)', lineHeight: 1.7, margin: '20px auto 0', maxWidth: 560 }}>
            We only accept clients we genuinely believe we can help — and we stand behind the outcome. Up to{' '}
            <strong style={{ color: SAGE, fontWeight: 600 }}>1&nbsp;kg a week</strong>, medically supervised and verified. Complete your
            program and don&rsquo;t reach your target?{' '}
            <strong style={{ color: SAGE, fontWeight: 600 }}>We extend it, at no extra program fee, until you do.</strong>
          </p>
        </div>

        {/* ── The pact: two understated columns ── */}
        <div className="rg-pact rg-rise rg-d1" style={{ marginTop: 'clamp(48px,7vw,80px)' }}>
          {/* Our promise */}
          <div>
            <h3 style={{ color: INK, fontFamily: WIDE, fontSize: 12, fontWeight: 400, letterSpacing: '0.18em', textTransform: 'uppercase', margin: '0 0 22px' }}>
              Our promise to you
            </h3>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 18 }}>
              {GUARANTEE.map((g) => (
                <li key={g} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <Check />
                  <span style={{ color: BODY, fontFamily: ROBOTO, fontSize: 15, lineHeight: 1.65 }}>{g}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Your commitment */}
          <div>
            <h3 style={{ color: INK, fontFamily: WIDE, fontSize: 12, fontWeight: 400, letterSpacing: '0.18em', textTransform: 'uppercase', margin: '0 0 22px' }}>
              Your commitment
            </h3>
            <ul aria-label="Extended Care Commitment requirements" style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 18 }}>
              {COMMITMENT.map((c) => (
                <li key={c} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <Check />
                  <span style={{ color: BODY, fontFamily: ROBOTO, fontSize: 15, lineHeight: 1.65 }}>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
