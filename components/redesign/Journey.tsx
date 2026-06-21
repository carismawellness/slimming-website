'use client';

import { JOURNEY } from '@/lib/redesign/content';
import { useScrollProgress, prefersReducedMotion } from './motion';
import Reveal from './Reveal';
import Cta from './Cta';

export default function Journey() {
  const { ref, p } = useScrollProgress<HTMLDivElement>();
  const reduced = typeof window !== 'undefined' && prefersReducedMotion();
  const N = JOURNEY.length;
  // Under reduced motion show the finished state (rail full, all steps active).
  const fill = reduced ? 1 : p;

  return (
    <section
      id="journey"
      className="cx-section"
      aria-labelledby="journey-heading"
      style={{ background: 'linear-gradient(180deg, var(--cream) 0%, #fff 100%)' }}
    >
      <div className="cx-wrap cx-wrap-tight">
        <Reveal
          style={{
            textAlign: 'center',
            maxWidth: 640,
            marginInline: 'auto',
            marginBottom: 'clamp(36px,5vw,56px)',
          }}
        >
          <p className="cx-eyebrow" style={{ marginBottom: 14 }}>How it works</p>
          <div className="cx-rule center" style={{ marginBottom: 22 }} />
          <h2 id="journey-heading" className="cx-h2" style={{ marginBottom: 16 }}>
            How your weight loss journey <em>actually begins</em>
          </h2>
          <p className="cx-lead">
            Low-friction, no pressure. It starts with a free body analysis and a
            conversation — not a sales pitch.
          </p>
        </Reveal>

        <div
          ref={ref}
          className="cx-journey"
          style={{ position: 'relative', maxWidth: 720, marginInline: 'auto' }}
        >
          {/* progress rail (a calm fill — no travelling spark) */}
          <div className="cx-timeline-line" aria-hidden>
            <div
              className="cx-timeline-fill"
              style={{ transform: `scaleY(${fill})` }}
            />
          </div>

          <ol
            aria-label={`Your journey — ${N} steps`}
            style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'grid',
              gap: 'clamp(20px,3vw,34px)',
            }}
          >
            {JOURNEY.map((s, i) => {
              // Continuous activation: a step lights up as the rail reaches it.
              const enter = (i + 0.35) / N;
              const active = reduced || fill >= enter;
              // local 0→1 for the just-activating step (smooth illumination)
              const local = reduced
                ? 1
                : Math.min(Math.max((fill - enter) / (0.6 / N), 0), 1);
              return (
                <li
                  key={s.n}
                  className={`cx-jstep${active ? ' is-active' : ''}`}
                  aria-label={`Step ${i + 1} of ${N}: ${s.t}`}
                  style={{ position: 'relative', paddingLeft: 76 }}
                >
                  <span
                    aria-hidden
                    className="cx-jnode"
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      display: 'grid',
                      placeItems: 'center',
                      fontFamily: 'var(--serif)',
                      fontSize: 22,
                      background: active ? 'var(--sage)' : '#fff',
                      color: active ? '#fff' : 'var(--sage)',
                      border: `1.5px solid ${active ? 'var(--sage)' : 'var(--line)'}`,
                      boxShadow: active
                        ? `0 0 0 ${6 * local}px rgba(142,176,147,0.16), var(--shadow-soft)`
                        : 'none',
                      transform: `scale(${1 + 0.1 * local})`,
                      transition:
                        'background .55s var(--ease), color .55s var(--ease), border-color .55s var(--ease), box-shadow .55s var(--ease), transform .55s var(--ease)',
                    }}
                  >
                    {s.n}
                  </span>
                  <div
                    className="cx-card cx-jcard"
                    style={{
                      padding: '18px 22px',
                      borderRadius: 18,
                      opacity: reduced ? 1 : 0.4 + 0.6 * local,
                      transform: reduced
                        ? 'none'
                        : `translateX(${-(1 - local) * 22}px)`,
                      borderColor: active
                        ? 'rgba(142,176,147,0.5)'
                        : 'var(--line)',
                      transition:
                        'opacity .6s var(--ease), transform .6s var(--ease), border-color .6s var(--ease), box-shadow .55s var(--ease)',
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: 'var(--serif)',
                        fontSize: 18,
                        color: 'var(--sage-ink)',
                        marginBottom: 6,
                      }}
                    >
                      {s.t}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--body)',
                        fontSize: 14,
                        color: 'var(--taupe)',
                        lineHeight: 1.55,
                      }}
                    >
                      {s.d}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div style={{ textAlign: 'center', marginTop: 'clamp(34px,5vw,48px)' }}>
          <Cta variant="primary">Book your free body analysis</Cta>
        </div>
      </div>

      <style>{`
        .cx-timeline-spark {
          position: absolute; left: 50%; transform: translateX(-50%);
          width: 18px; height: 18px; border-radius: 50%;
          background: radial-gradient(circle, rgba(99,145,171,0.9) 0%, rgba(142,176,147,0) 70%);
          transition: opacity .4s var(--ease);
          pointer-events: none;
        }
        .cx-jstep.is-active .cx-jcard { box-shadow: var(--shadow-card); }
        @media (prefers-reduced-motion: reduce) {
          .cx-jcard { opacity: 1 !important; transform: none !important; }
          .cx-jnode { transform: none !important; }
          .cx-timeline-spark { display: none !important; }
        }
      `}</style>
    </section>
  );
}
