'use client';

import { useEffect, useMemo, useState } from 'react';
import { NAV, CONTACT } from '@/lib/redesign/content';
import { useActiveSection } from './motion';
import Cta from './Cta';

export default function PreviewNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  // Derive the section ids from NAV (#method → method, …) and track active one.
  const sectionIds = useMemo(() => NAV.map((n) => n.href.replace('#', '')), []);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <nav className={`cx-nav ${scrolled ? 'scrolled' : ''}`} aria-label="Main navigation">
      {/* scroll progress */}
      <div aria-hidden style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'transparent' }}>
        <div style={{ height: '100%', width: `${progress * 100}%`, background: 'linear-gradient(90deg, var(--sage), var(--blue))', transformOrigin: 'left', transition: 'width .1s linear' }} />
      </div>
      <div className="cx-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: scrolled ? 64 : 78, transition: 'height .4s var(--ease)' }}>
        <a href="#top" aria-label="Carisma Slimming home page" style={{ display: 'flex', alignItems: 'center', minHeight: 44 }}>
          <img src="/logo.png" alt="Carisma Slimming" style={{ height: 34, width: 'auto', display: 'block' }} />
        </a>

        <div className="cx-nav-desktop" style={{ display: 'none', alignItems: 'center', gap: 26 }}>
          {NAV.map((n) => {
            const isActive = active === n.href.replace('#', '');
            return (
              <a
                key={n.href}
                href={n.href}
                className={`cx-navlink ${isActive ? 'is-active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {n.label}
              </a>
            );
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <a
            href={CONTACT.phoneHref}
            className="cx-navlink cx-phone"
            aria-label={`Call us at ${CONTACT.phone}`}
            style={{ display: 'none' }}
          >
            {CONTACT.phone}
          </a>
          <span className="cx-nav-cta" style={{ display: 'none' }}>
            <Cta variant="blue" arrow={false}>Free consultation</Cta>
          </span>
          <button
            className="cx-burger"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={open}
            aria-controls="cx-mobile-menu"
            onClick={() => setOpen((v) => !v)}
            style={{ display: 'inline-flex', flexDirection: 'column', gap: 5, background: 'none', border: 'none', cursor: 'pointer', padding: 8, minHeight: 44, minWidth: 44, alignItems: 'center', justifyContent: 'center' }}
          >
            <span aria-hidden style={{ width: 22, height: 2, background: 'var(--sage-ink)', borderRadius: 2, transition: 'transform .35s var(--ease)', transform: open ? 'translateY(7px) rotate(45deg)' : 'none' }} />
            <span aria-hidden style={{ width: 22, height: 2, background: 'var(--sage-ink)', borderRadius: 2, opacity: open ? 0 : 1, transition: 'opacity .25s' }} />
            <span aria-hidden style={{ width: 22, height: 2, background: 'var(--sage-ink)', borderRadius: 2, transition: 'transform .35s var(--ease)', transform: open ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </div>

      {/* Mobile / overlay menu */}
      <div
        id="cx-mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        style={{
          position: 'fixed', inset: 0, top: 0, zIndex: 60,
          background: 'rgba(246,242,234,0.97)', backdropFilter: 'blur(12px)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 6, padding: '0 32px',
          opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
          transform: open ? 'none' : 'translateY(-12px)', transition: 'opacity .4s var(--ease), transform .4s var(--ease)',
        }}
      >
        {NAV.map((n, i) => {
          const isActive = active === n.href.replace('#', '');
          return (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="cx-display"
              aria-current={isActive ? 'page' : undefined}
              style={{ fontSize: 'clamp(28px,7vw,46px)', color: isActive ? 'var(--sage)' : 'var(--sage-ink)', textDecoration: 'none', padding: '6px 0', transitionDelay: `${i * 30}ms` }}
            >
              {n.label}
            </a>
          );
        })}
        <div style={{ marginTop: 26, display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start' }}>
          <Cta variant="primary">Get your free body analysis</Cta>
          <a
            href={CONTACT.phoneHref}
            className="cx-link-underline"
            aria-label={`Call us at ${CONTACT.phone}`}
            style={{ fontFamily: 'var(--body)', color: 'var(--taupe)', fontSize: 16 }}
          >
            Call {CONTACT.phone}
          </a>
        </div>
      </div>

      <style>{`
        @media (min-width: 920px) {
          .cx-nav-desktop { display: flex !important; }
          .cx-nav-cta { display: inline-flex !important; }
          .cx-phone { display: inline-flex !important; }
          .cx-burger { display: none !important; }
        }
        .cx-navlink:focus-visible,
        .cx-burger:focus-visible {
          outline: 2px solid #4f7256;
          outline-offset: 2px;
          border-radius: 4px;
        }
        @media (prefers-reduced-motion: reduce) {
          .cx-nav { transition: none !important; }
          #cx-mobile-menu { transition: none !important; }
        }
      `}</style>
    </nav>
  );
}
