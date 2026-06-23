'use client';

// 3D coverflow option for the doctors section — kept for side-by-side comparison
// against the live flat card grid (components/doctors/DoctorShowcase.tsx).
// Self-contained; uses the existing DoctorCarousel3D scene.

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { DOCTORS } from '@/lib/doctors';
import BookConsultationButton from '@/components/BookConsultationButton';

const Carousel3D = dynamic(() => import('./DoctorCarousel3D'), { ssr: false });

const GREEN = '#4f7256';
const TAUPE = '#6f6456';

function hasWebGL(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')));
  } catch {
    return false;
  }
}

function ctrlStyle(disabled: boolean): React.CSSProperties {
  return { width: 44, height: 44, borderRadius: 999, border: `1px solid ${GREEN}`, background: '#fff', color: GREEN, fontSize: 22, lineHeight: 1, cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.35 : 1 };
}

export default function DoctorCarousel3DShowcase() {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [inView, setInView] = useState(false);
  const [use3D, setUse3D] = useState(false);
  const [reduced, setReduced] = useState(false);
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    setUse3D(hasWebGL());
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } }, { rootMargin: '200px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => { setExpanded(false); }, [active]);

  // Wrap around the ring so the carousel loops infinitely in both directions.
  const go = (i: number) => setActive(((i % DOCTORS.length) + DOCTORS.length) % DOCTORS.length);
  const d = DOCTORS[active];

  return (
    <section ref={rootRef} aria-label="Doctors — 3D coverflow" style={{ background: '#fff', padding: 'clamp(48px,8vw,88px) 0' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center" style={{ color: TAUPE, fontFamily: '"Novecento Wide Book", sans-serif', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase' }}>The team behind your results</p>
        <h2 className="text-center" style={{ color: GREEN, fontFamily: '"Trajan Pro", serif', fontWeight: 400, fontSize: 'clamp(26px,4vw,40px)', textTransform: 'uppercase', margin: '6px 0 36px' }}>Meet Your Doctors</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div style={{ position: 'relative', minHeight: 380 }}>
            {inView && use3D ? (
              <Carousel3D images={DOCTORS.map((x) => x.image)} activeIndex={active} onActiveChange={go} reducedMotion={reduced} />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={d.image} alt={d.name} style={{ width: '100%', maxWidth: 420, margin: '0 auto', display: 'block', borderRadius: 'var(--r-card,16px)' }} />
            )}
          </div>

          <div aria-live="polite">
            <h3 style={{ color: GREEN, fontFamily: '"Trajan Pro", serif', fontWeight: 400, fontSize: 'clamp(22px,3vw,30px)', textTransform: 'uppercase' }}>{d.name}</h3>
            <p style={{ color: TAUPE, fontFamily: '"Novecento Wide Book", sans-serif', fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', margin: '6px 0 14px' }}>{d.role} · {d.years}</p>
            <p style={{ color: TAUPE, fontFamily: 'Roboto, sans-serif', fontSize: 15, lineHeight: 1.6 }}>{expanded ? d.fullBio : d.highlight}</p>
            <button type="button" onClick={() => setExpanded((v) => !v)} style={{ background: 'none', border: 'none', color: GREEN, fontFamily: 'Roboto, sans-serif', fontSize: 13, textDecoration: 'underline', textUnderlineOffset: 2, cursor: 'pointer', marginTop: 8, padding: 0 }}>
              {expanded ? 'Read less' : 'Read more'}
            </button>
            <div style={{ marginTop: 22 }}>
              <BookConsultationButton variant="filled">Book Your Free Body Analysis</BookConsultationButton>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4" style={{ marginTop: 28 }}>
          <button type="button" aria-label="Previous doctor" onClick={() => go(active - 1)} style={ctrlStyle(false)}>‹</button>
          <div role="tablist" aria-label="Choose a doctor" className="flex items-center gap-2">
            {DOCTORS.map((doc, i) => (
              <button key={doc.name} role="tab" aria-selected={i === active} aria-label={doc.name} onClick={() => go(i)}
                style={{ width: i === active ? 26 : 10, height: 10, borderRadius: 999, border: 'none', cursor: 'pointer', background: i === active ? GREEN : 'rgba(79,114,86,0.3)', transition: 'all .3s ease' }} />
            ))}
          </div>
          <button type="button" aria-label="Next doctor" onClick={() => go(active + 1)} style={ctrlStyle(false)}>›</button>
        </div>

        <p className="text-center" style={{ color: TAUPE, fontFamily: 'Roboto, sans-serif', fontSize: 13, marginTop: 18, opacity: 0.7 }}>
          Drag / swipe the portraits, or use the arrows &amp; dots.
        </p>
      </div>
    </section>
  );
}
