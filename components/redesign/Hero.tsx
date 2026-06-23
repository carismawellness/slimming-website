'use client';

import { useEffect, useRef } from 'react';
import { HERO, REVIEWS } from '@/lib/redesign/content';
import HeroCanvas from './HeroCanvas';
import Cta from './Cta';
import { prefersReducedMotion } from './motion';
import CountUp from '@/components/CountUp';

function Check() {
  return (
    <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: '50%', background: 'rgba(142,176,147,0.18)', display: 'grid', placeItems: 'center', marginTop: 1 }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M5 13l4 4L19 7" stroke="#5f7e66" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function Stars({ size = 15 }: { size?: number }) {
  return (
    <span className="cx-stars" aria-label={`${REVIEWS.rating} out of 5 stars`} role="img">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
      ))}
    </span>
  );
}

// One headline line inside a clipping mask. The inner span is hidden from first
// paint (inline style, SSR-consistent → no flash) and lifts out of the mask.
function Line({ children, em }: { children: React.ReactNode; em?: boolean }) {
  return (
    <span className="cx-line">
      <span
        className="cx-line-in"
        data-hero-line
        style={{
          display: 'inline-block',
          transform: 'translateY(112%)',
          willChange: 'transform',
          ...(em ? { fontStyle: 'normal', color: 'var(--sage)' } : {}),
        }}
      >
        {children}
      </span>
    </span>
  );
}

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  // "Atelier" cinematic reveal — slow, choreographed, expo-eased, no bounce.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const lines = Array.from(root.querySelectorAll<HTMLElement>('[data-hero-line]'));
    const veil = root.querySelector<HTMLElement>('[data-hero-veil]');

    // Force the hand-hidden bits to their natural, visible state.
    const reveal = () => {
      lines.forEach((l) => { l.style.transform = 'translateY(0)'; });
      if (veil) { veil.style.transform = 'scaleY(0)'; }
    };

    if (prefersReducedMotion()) { reveal(); return; }

    let cleanupScroll = () => {};
    let cancelled = false;
    // Guarantee the headline can never stay hidden if a tween is interrupted.
    const failsafe = window.setTimeout(reveal, 3000);

    (async () => {
      const { gsap } = await import('gsap');
      if (cancelled || !root) { reveal(); return; }

      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      // 1 · media unveils behind a soft curtain wipe + slow Ken-Burns push
      if (veil) tl.to(veil, { scaleY: 0, duration: 1.5, ease: 'expo.inOut' }, 0);
      tl.from('[data-hero="img"]', { scale: 1.16, duration: 2.0, ease: 'expo.out' }, 0);

      // 2 · eyebrow + pill settle in (tracking eases shut)
      tl.from('[data-hero="pill"]', { y: 14, opacity: 0, duration: 1.0 }, 0.15);
      tl.fromTo('[data-hero="eyebrow"]',
        { opacity: 0, letterSpacing: '0.6em' },
        { opacity: 1, letterSpacing: '0.32em', duration: 1.1 }, 0.25);

      // 3 · serif headline rises line-by-line out of the clip mask
      tl.fromTo(lines, { yPercent: 112 }, { yPercent: 0, duration: 1.25, stagger: 0.16, ease: 'expo.out' }, 0.4);

      // 4 · hairline draws beneath the headline
      tl.from('[data-hero="rule"]', { scaleX: 0, duration: 1.1, ease: 'expo.inOut' }, 0.95);

      // 5 · supporting copy settles in a slow sequence
      tl.from('[data-hero="sub"]', { y: 14, opacity: 0, duration: 1.0 }, 1.0);
      tl.from('[data-hero="bullets"] > li', { y: 12, opacity: 0, duration: 0.9, stagger: 0.1 }, 1.15);
      tl.from('[data-hero="actions"]', { y: 12, opacity: 0, duration: 1.0 }, 1.35);
      tl.from('[data-hero="proof"]', { opacity: 0, duration: 1.0 }, 1.5);
      tl.from('[data-hero="chip"]', { y: 14, opacity: 0, duration: 1.0, stagger: 0.14 }, 1.4);

      window.clearTimeout(failsafe);
      tl.eventCallback('onComplete', reveal);

      // barely-there scroll drift on the media column
      if (!window.matchMedia('(pointer: coarse)').matches && mediaRef.current) {
        const media = mediaRef.current;
        let raf = 0;
        const qMedia = gsap.quickTo(media, 'y', { duration: 0.9, ease: 'power2.out' });
        const onScroll = () => {
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(() => {
            const r = root.getBoundingClientRect();
            const prog = Math.min(Math.max(-r.top / Math.max(r.height, 1), 0), 1);
            qMedia(prog * 20);
          });
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        cleanupScroll = () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
      }
    })();

    return () => {
      cancelled = true;
      window.clearTimeout(failsafe);
      cleanupScroll();
      reveal();
    };
  }, []);

  return (
    <header
      ref={rootRef}
      id="top"
      className="cx-grain"
      style={{ position: 'relative', overflow: 'hidden', paddingTop: 'clamp(104px, 13vh, 150px)', paddingBottom: 'clamp(48px, 7vw, 88px)' }}
    >
      {/* CSS gradient bed + a quietened ambient canvas (reads as faint mist) */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'linear-gradient(150deg, #f6f2ea 0%, #eef3ea 44%, #dde7d6 100%)' }} />
      <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.5 }}><HeroCanvas /></div>
      <div aria-hidden className="cx-glow" style={{ width: 460, height: 460, background: 'rgba(142,176,147,0.4)', top: -120, right: -80 }} />

      <div className="cx-wrap" style={{ position: 'relative', zIndex: 2 }}>
        <div className="cx-hero-grid" style={{ display: 'grid', gap: 'clamp(32px, 5vw, 64px)', alignItems: 'center' }}>
          {/* Left: message */}
          <div>
            <span data-hero="pill" className="cx-pill" style={{ marginBottom: 22 }}>
              <img src={HERO.award} alt="" aria-hidden style={{ height: 22, width: 'auto' }} />
              <span className="cx-kicker" style={{ fontSize: 11, color: 'var(--sage-deep)' }}>#1 voted clinic in Malta · 2025–2026</span>
            </span>

            <p data-hero="eyebrow" className="cx-eyebrow" style={{ marginBottom: 16 }}>{HERO.eyebrow}</p>

            <h1 className="cx-display cx-hero-h1" style={{ fontSize: 'clamp(34px, 6vw, 68px)', marginBottom: 18 }}>
              <Line>Medical Weight Loss in Malta,</Line>
              <Line em>with doctors by your side.</Line>
            </h1>

            <span data-hero="rule" aria-hidden style={{ display: 'block', height: 1, width: 96, background: 'linear-gradient(90deg, var(--sage), transparent)', transformOrigin: 'left', marginBottom: 22 }} />

            <p data-hero="sub" className="cx-lead" style={{ maxWidth: 540, marginBottom: 26 }}>{HERO.sub}</p>

            <ul data-hero="bullets" aria-label="Key benefits" style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'grid', gap: 12, maxWidth: 540 }}>
              {HERO.bullets.map((b) => (
                <li key={b} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontFamily: 'var(--body)', fontSize: 14.5, color: 'var(--taupe-ink)', lineHeight: 1.625 }}>
                  <Check /><span>{b}</span>
                </li>
              ))}
            </ul>

            <div data-hero="actions" style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center', marginBottom: 28 }}>
              <Cta variant="primary">{HERO.primaryCta}</Cta>
              <a href="#journey" className="cx-btn cx-btn-ghost"><span className="cx-btn-label">{HERO.secondaryCta}</span></a>
            </div>

            <div data-hero="proof" style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
              <Stars />
              <span style={{ fontFamily: 'var(--body)', fontSize: 13.5, color: 'var(--taupe)' }}>
                <strong style={{ color: 'var(--sage-ink)' }}><CountUp value={REVIEWS.rating.toFixed(1)} /></strong> from <CountUp value={REVIEWS.total} />+ Google reviews
              </span>
              <span aria-hidden style={{ width: 1, height: 16, background: 'var(--line)' }} />
              <span style={{ fontFamily: 'var(--body)', fontSize: 13.5, color: 'var(--taupe)' }}>Doctor-led · Free body analysis</span>
            </div>
          </div>

          {/* Right: video + proof chips */}
          <div
            ref={mediaRef}
            className="cx-hero-media"
            style={{ position: 'relative', justifySelf: 'center', width: '100%', maxWidth: 380 }}
          >
            <div className="cx-organic-img" style={{ aspectRatio: '3 / 4', position: 'relative', background: '#0c0c0c', overflow: 'hidden' }}>
              <video
                data-hero="img"
                playsInline
                controls
                poster={HERO.videoPoster}
                preload="metadata"
                aria-label="Carisma Slimming — doctor-led weight loss introduction video"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', willChange: 'transform' }}
              >
                <source src={HERO.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {/* curtain veil — covers the media at first paint, wipes upward */}
              <span
                data-hero-veil
                aria-hidden
                style={{ position: 'absolute', inset: 0, zIndex: 3, background: 'linear-gradient(160deg, #eef3ea 0%, #cfe0c8 100%)', transformOrigin: 'top', willChange: 'transform' }}
              />
            </div>

            {/* rating chip — lifted clear of the native video controls */}
            <div data-hero="chip" className="cx-glass" style={{ position: 'absolute', left: -16, bottom: 92, borderRadius: 16, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <CountUp value={REVIEWS.rating.toFixed(1)} className="cx-display" style={{ fontSize: 30, color: 'var(--sage-ink)' }} />
              <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
                <Stars size={12} />
                <span style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--taupe)' }}><CountUp value={REVIEWS.total} />+ reviews</span>
              </span>
            </div>

            {/* award chip */}
            <div data-hero="chip" className="cx-glass" style={{ position: 'absolute', right: -10, top: 26, borderRadius: 16, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 9, maxWidth: 190 }}>
              <img src={HERO.award} alt="" aria-hidden style={{ height: 30, width: 'auto' }} />
              <span style={{ fontFamily: 'var(--wide)', fontSize: 9.5, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--sage-deep)', lineHeight: 1.4 }}>#1 voted clinic<br />Malta 2025–26</span>
            </div>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div aria-hidden style={{ position: 'absolute', left: '50%', bottom: 18, transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: 0.55 }}>
        <span style={{ fontFamily: 'var(--wide)', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--sage-deep)' }}>Scroll</span>
        <span style={{ width: 1, height: 30, background: 'linear-gradient(var(--sage), transparent)' }} />
      </div>

      <style>{`
        .cx-hero-h1 { line-height: 1.04; }
        .cx-line { display: block; overflow: hidden; padding-bottom: 0.06em; }
        @media (min-width: 880px) {
          .cx-hero-grid { grid-template-columns: 1.15fr 0.85fr; }
          .cx-hero-media { justify-self: end !important; }
        }
      `}</style>
    </header>
  );
}
