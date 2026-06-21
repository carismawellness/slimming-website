'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const SilkBackdrop = dynamic(() => import('./SilkBackdrop'), { ssr: false });

const INK = '#3c5a40'; // deep sage heading
const SAGE = '#4f7256'; // accent / icons
const BODY = '#5a4f43'; // taupe-brown body (AA on near-white)
const META = '#7a6f66';
const SERIF = 'Trajan Pro, serif';
const WIDE = '"Novecento Wide Book","Novecento Wide",sans-serif';
const ROBOTO = 'Roboto, sans-serif';

function hasWebGL(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')));
  } catch {
    return false;
  }
}

// Our side of the pact.
const GUARANTEE = [
  'Doctor-led and medically supervised, every step',
  'Progress measured and verified — never guesswork',
  'Program extended free until you reach your goal',
];

// The client's side — kept verbatim (a real agreement) + a subtle line icon each.
const COMMITMENT: { text: string; icon: React.ReactNode }[] = [
  { text: 'Attend all scheduled in-clinic sessions and weekly check-ins', icon: <path d="M8 2v4M16 2v4M3 10h18M5 6h14a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" /> },
  { text: 'Follow your personalised food plan consistently and tell us when you struggle', icon: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></> },
  { text: 'Complete your agreed physical activities & discuss any pain or obstacles', icon: <path d="m6 19 3-9 4 5 3-7 2 4" /> },
  { text: 'Use only the treatments and medications recommended by our medical team', icon: <path d="M12 3 4 6v6c0 5 3.4 7.7 8 9 4.6-1.3 8-4 8-9V6l-8-3Z" /> },
  { text: 'Inform us of any major health (e.g., heart disease) or medication changes', icon: <path d="M3 12h4l2 5 4-12 2 7h6" /> },
  { text: 'Avoid crash diets, extreme restriction or outside weight-loss treatments that could affect your results', icon: <><circle cx="12" cy="12" r="9" /><path d="m6 6 12 12" /></> },
];

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={SAGE} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }}>
      {children}
    </svg>
  );
}

export default function ResultsGuarantee() {
  const rootRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [silk, setSilk] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    setSilk(hasWebGL());
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: '200px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={rootRef} aria-labelledby="results-heading" style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(64px,9vw,112px) 0', background: 'linear-gradient(180deg,#ffffff 0%,#f3f7f0 100%)' }}>
      <style>{`
        .rg-grid { display:grid; grid-template-columns:1fr; gap:clamp(28px,4vw,52px); align-items:center; }
        @media (min-width:880px){ .rg-grid { grid-template-columns:300px minmax(0,1fr); } }
        .rg-pact { display:grid; grid-template-columns:1fr; gap:clamp(24px,3vw,40px); }
        @media (min-width:880px){ .rg-pact { grid-template-columns:1fr 1fr; } }
        .rg-row { transition: transform .35s cubic-bezier(.2,.7,.2,1); }
        @media (hover:hover){ .rg-row:hover { transform: translateX(4px); } }
        @media (prefers-reduced-motion: reduce){ .rg-row { transition:none; } }
      `}</style>

      {inView && silk && <SilkBackdrop reducedMotion={reduced} />}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" style={{ position: 'relative', zIndex: 1 }}>
        {/* Frosted panel keeps text crisp over the silk */}
        <div
          className="lg-glass"
          style={{
            background: 'rgba(255,255,255,0.82)',
            borderRadius: 24,
            padding: 'clamp(28px,4vw,56px)',
            border: '1px solid rgba(255,255,255,0.7)',
          }}
        >
          {/* Heading */}
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto' }}>
            <p style={{ color: META, fontFamily: WIDE, fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', margin: 0 }}>
              Our Results-Driven Approach
            </p>
            <div style={{ width: 64, height: 1, background: '#C9B8AE', margin: '14px auto 18px' }} />
            <h2 id="results-heading" style={{ color: INK, fontFamily: SERIF, fontWeight: 400, fontSize: 'clamp(24px,3.6vw,38px)', lineHeight: 1.2, textTransform: 'uppercase', margin: 0 }}>
              The Carisma Results Guarantee
            </h2>
          </div>

          {/* Hero: photo + headline stat + pledge */}
          <div className="rg-grid" style={{ marginTop: 'clamp(32px,5vw,52px)' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Image
                src="/wix/87fc13_aea394ce5ab4485e8613221fa3617b8f~mv2.webp"
                alt="Doctor-led body composition analysis at Carisma Slimming Malta"
                width={300}
                height={384}
                style={{ width: '100%', maxWidth: 300, height: 'auto', objectFit: 'cover', borderRadius: '120px 12px 120px 12px', boxShadow: '0 24px 50px -24px rgba(60,90,64,0.5)' }}
              />
            </div>
            <div>
              <p style={{ color: BODY, fontFamily: ROBOTO, fontSize: 15, lineHeight: 1.7, margin: '0 0 22px' }}>
                We are selective about who joins our transformation programs — we only accept clients we genuinely believe we can help. And we put our outcome where our mouth is:
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, flexWrap: 'wrap' }}>
                <span className="grad-text" style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(40px,7vw,68px)', lineHeight: 1 }}>
                  1&nbsp;kg
                </span>
                <span style={{ color: INK, fontFamily: WIDE, fontSize: 14, letterSpacing: 2, textTransform: 'uppercase' }}>
                  a week, up to —<br />medically supervised &amp; verified
                </span>
              </div>
              <p style={{ color: BODY, fontFamily: WIDE, fontSize: 'clamp(15px,1.8vw,18px)', lineHeight: 1.5, margin: '22px 0 0' }}>
                Complete your program and don&rsquo;t reach your target? We <strong style={{ color: SAGE }}>extend it — at no extra program fee</strong> — until you do.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: 'clamp(40px,6vw,64px) 0 clamp(28px,4vw,40px)' }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(95,126,102,0.18)' }} />
            <span style={{ color: SAGE, fontFamily: WIDE, fontSize: 12, letterSpacing: 3, textTransform: 'uppercase' }}>The Carisma Pact</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(95,126,102,0.18)' }} />
          </div>

          {/* Two-column pact */}
          <div className="rg-pact">
            {/* Our guarantee */}
            <div>
              <h3 style={{ color: INK, fontFamily: WIDE, fontSize: 13, fontWeight: 700, letterSpacing: 1.6, textTransform: 'uppercase', margin: '0 0 18px' }}>
                Our guarantee to you
              </h3>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
                {GUARANTEE.map((g) => (
                  <li key={g} className="rg-row" style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span aria-hidden="true" style={{ flexShrink: 0, marginTop: 1, width: 22, height: 22, borderRadius: 999, background: 'rgba(79,114,86,0.12)', display: 'grid', placeItems: 'center' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={SAGE} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                    </span>
                    <span style={{ color: BODY, fontFamily: ROBOTO, fontSize: 15, lineHeight: 1.6 }}>{g}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Your commitment */}
            <div>
              <h3 style={{ color: INK, fontFamily: WIDE, fontSize: 13, fontWeight: 700, letterSpacing: 1.6, textTransform: 'uppercase', margin: '0 0 18px' }}>
                Your commitment
              </h3>
              <ul aria-label="Extended Care Commitment requirements" style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {COMMITMENT.map((c) => (
                  <li key={c.text} className="rg-row" style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <Icon>{c.icon}</Icon>
                    <span style={{ color: BODY, fontFamily: ROBOTO, fontSize: 14, lineHeight: 1.6 }}>{c.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
