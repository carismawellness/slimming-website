'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

// Accessible brand tokens (see globals.css locked palette).
// GREEN_FILL: solid sage dark enough that #fff text clears 4.5:1 (used as
//   announcement-strip + CTA background). 5.42:1 AA.
// 2026 palette refresh — deep forest #024C27 is the new primary brand green
// (AAA white text / AAA on white). TAUPE stays the neutral nav-link ink.
const GREEN_FILL = '#024C27'; // CTA fill / deep brand green
const GREEN = '#024C27';      // brand green for small text/icons/announcement bar (AAA on white)
const TAUPE = '#6F6456';
const DROPDOWN_INK = '#6F6456'; // dropdown/sub-item link on white = 5.78:1 AA (was #9B8D83 -> 3.22:1)

const BANNER = "#1 VOTED SLIMMING CLINIC IN MALTA          ·          DOCTOR-LED WEIGHT LOSS          ·          800+ VERIFIED REVIEWS          ·          FREE BODY ANALYSIS          ·          ";

type NavItem = { label: string; href: string };

const PACKAGE_LINKS: NavItem[] = [
  { label: 'Fat Freezing', href: '/packages/fat-freezing' },
  { label: 'Fat Dissolving', href: '/packages/fat-dissolving' },
  { label: 'Muscle Stimulation', href: '/packages/muscle-stimulation' },
  { label: 'Skin Tightening', href: '/packages/skin-tightening' },
  { label: 'Lipocavitation', href: '/packages/lipocavitation' },
  { label: 'Anti Cellulite', href: '/packages/anti-cellulite' },
  { label: 'Lymphatic Drainage', href: '/packages/lymphatic-drainage' },
];

type Menu = { label: string; href?: string; items?: NavItem[] };

const MENUS: Menu[] = [
  { label: 'Weight Loss', href: '/weight-loss' },
  { label: 'GLP-1s', href: '/glp1' },
  { label: 'Packages', items: PACKAGE_LINKS },
  { label: 'Slimming Guide', href: '/slimming-guide' },
];

const navLink: React.CSSProperties = {
  color: TAUPE,
  fontFamily: '"Novecento Wide", sans-serif',
  fontSize: '12px',
  fontWeight: 400,
  letterSpacing: '0.5px',
  textDecoration: 'none',
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
};

function PhoneIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.21 12.8a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.11 2h3a2 2 0 0 1 2 1.72c.128.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.572 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [pkgHover, setPkgHover] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); setPkgHover(false); setExpanded(null); } };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // Close desktop dropdown on Escape when mobile menu is closed.
  useEffect(() => {
    if (!pkgHover && !expanded) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setPkgHover(false); setExpanded(null); } };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [pkgHover, expanded]);

  const pillStyle: React.CSSProperties = {
    background: scrolled ? 'rgba(255,255,255,0.74)' : 'rgba(255,255,255,0.56)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(255,255,255,0.65)',
    borderRadius: '999px',
    boxShadow: scrolled
      ? '0 10px 34px rgba(40,55,44,0.16), inset 0 1px 0 rgba(255,255,255,0.85)'
      : '0 8px 30px rgba(40,55,44,0.12), inset 0 1px 0 rgba(255,255,255,0.8)',
    transition: 'background 0.35s ease, box-shadow 0.35s ease',
  };

  const ctaStyle: React.CSSProperties = {
    backgroundColor: GREEN_FILL,
    color: '#ffffff',
    fontFamily: '"Novecento Wide", sans-serif',
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    padding: '9px 20px',
    borderRadius: '999px',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* Announcement strip — slides away on scroll */}
      <div
        className="overflow-hidden flex items-center"
        style={{
          backgroundColor: '#C9D8C1',
          height: scrolled ? 0 : 36,
          opacity: scrolled ? 0 : 1,
          transition: 'height 0.35s ease, opacity 0.25s ease',
        }}
      >
        <div style={{
          display: 'inline-block',
          whiteSpace: 'nowrap',
          animation: 'marquee 38s linear infinite',
          fontFamily: '"Novecento Wide", sans-serif',
          fontWeight: 700,
          fontSize: '10px',
          letterSpacing: '3.5px',
          color: '#024C27',
        }}>
          <span>{BANNER}</span><span>{BANNER}</span>
        </div>
        <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@media (max-width:767px){.header-logo{height:20px !important}}
.header-logo--mobile{height:22px !important}`}</style>
      </div>

      {/* Floating glass pill */}
      <div style={{ padding: '12px clamp(12px,3vw,28px) 0', maxWidth: '1280px', margin: '0 auto' }}>
        <nav
          aria-label="Main navigation"
          className="flex items-center justify-between"
          style={{ ...pillStyle, minHeight: '52px', padding: '6px 10px 6px 20px' }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0" onClick={() => setOpen(false)}>
            <Image src="/logo.png" alt="Carisma Slimming" width={510} height={96} className="header-logo" style={{ height: '26px', width: 'auto', display: 'block' }} priority />
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center" style={{ gap: '26px' }}>
            {MENUS.map((m) =>
              m.items ? (
                <div
                  key={m.label}
                  className="relative"
                  style={{ display: 'flex', alignItems: 'center' }}
                  onMouseEnter={() => setPkgHover(true)}
                  onMouseLeave={() => setPkgHover(false)}
                >
                  <button
                    style={{ ...navLink, background: 'none', border: 'none', cursor: 'pointer', padding: '20px 0' }}
                    className="hover:underline transition"
                    aria-haspopup="true"
                    aria-expanded={pkgHover}
                    onClick={() => setPkgHover(p => !p)}
                  >
                    {m.label}
                  </button>
                  {pkgHover && (
                    <div style={{
                      position: 'absolute',
                      top: 'calc(100% - 4px)',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'rgba(255,255,255,0.82)',
                      backdropFilter: 'blur(22px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(22px) saturate(180%)',
                      border: '1px solid rgba(255,255,255,0.7)',
                      borderRadius: '16px',
                      boxShadow: '0 16px 40px rgba(40,55,44,0.16), inset 0 1px 0 rgba(255,255,255,0.85)',
                      width: '360px',
                      padding: '10px',
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      columnGap: '6px',
                      zIndex: 100,
                    }}>
                      {m.items.map((it) => (
                        <Link key={it.href} href={it.href} className="block hover:bg-black/5 hover:underline"
                          style={{ padding: '9px 14px', borderRadius: '10px', color: DROPDOWN_INK, fontFamily: 'Roboto, sans-serif', fontSize: '13px', textDecoration: 'none', transition: 'background 0.3s ease' }}>
                          {it.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={m.label} href={m.href!} style={navLink} className="hover:underline transition">{m.label}</Link>
              )
            )}
          </div>

          {/* Right — phone + CTA */}
          <div className="hidden md:flex items-center" style={{ gap: '18px' }}>
            <a href="tel:+35627802062" className="flex items-center hover:underline transition" style={{ gap: '6px', textDecoration: 'none' }}>
              <PhoneIcon />
              <span style={{ color: GREEN, fontFamily: '"Novecento Wide", sans-serif', fontSize: '13px', fontWeight: 600, letterSpacing: '0.5px' }}>27802062</span>
            </a>
            <Link href="/consultation" className="cta-glow" style={ctaStyle}>Free Body Composition Analysis</Link>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden flex items-center justify-center" style={{ width: 44, height: 44 }} onClick={() => setOpen(true)} aria-label="Open menu">
            <svg width="22" height="22" fill="none" stroke={GREEN} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      </div>

      {/* Full-page liquid-glass mobile menu */}
      {open && (
        <div
          className="md:hidden fixed inset-0"
          style={{
            zIndex: 60,
            background: 'linear-gradient(160deg, rgba(232,240,233,0.9) 0%, rgba(255,255,255,0.82) 55%, rgba(245,242,236,0.88) 100%)',
            backdropFilter: 'blur(30px) saturate(180%)',
            WebkitBackdropFilter: 'blur(30px) saturate(180%)',
            animation: 'glassIn 0.32s cubic-bezier(0.22,1,0.36,1)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <style>{`@keyframes glassIn{from{opacity:0;transform:scale(1.03)}to{opacity:1;transform:scale(1)}}`}</style>

          {/* Top row: logo + close */}
          <div className="flex items-center justify-between shrink-0" style={{ padding: '16px clamp(16px,5vw,28px)' }}>
            <Link href="/" onClick={() => setOpen(false)} className="flex items-center">
              <Image src="/logo.png" alt="Carisma Slimming" width={510} height={96} className="header-logo header-logo--mobile" style={{ height: '22px', width: 'auto', display: 'block' }} />
            </Link>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex items-center justify-center"
              style={{
                width: 46,
                height: 46,
                borderRadius: '999px',
                background: 'rgba(255,255,255,0.6)',
                border: '1px solid rgba(255,255,255,0.7)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)',
              }}
            >
              <svg width="22" height="22" fill="none" stroke={GREEN} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Scrollable link area */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '8px clamp(16px,5vw,28px) 28px' }}>
            {MENUS.map((m) =>
              m.items ? (
                <div key={m.label} style={{ borderBottom: '1px solid rgba(142,176,147,0.22)' }}>
                  <button
                    className="w-full flex items-center justify-between"
                    style={{ padding: '18px 4px', fontFamily: '"Novecento Wide", sans-serif', fontSize: '17px', letterSpacing: '0.06em', textTransform: 'uppercase', color: GREEN }}
                    onClick={() => setExpanded(expanded === m.label ? null : m.label)}
                  >
                    {m.label}
                    <span style={{ fontSize: '22px', color: GREEN, lineHeight: 1 }}>{expanded === m.label ? '−' : '+'}</span>
                  </button>
                  {expanded === m.label && (
                    <div style={{ paddingBottom: '10px' }}>
                      {m.items.map((it) => (
                        <Link
                          key={it.href}
                          href={it.href}
                          onClick={() => setOpen(false)}
                          className="block"
                          style={{ padding: '9px 12px', fontFamily: 'Roboto, sans-serif', fontSize: '14px', color: DROPDOWN_INK, textDecoration: 'none' }}
                        >
                          {it.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={m.label}
                  href={m.href!}
                  onClick={() => setOpen(false)}
                  className="block"
                  style={{ padding: '18px 4px', fontFamily: '"Novecento Wide", sans-serif', fontSize: '17px', letterSpacing: '0.06em', textTransform: 'uppercase', color: GREEN, borderBottom: '1px solid rgba(142,176,147,0.22)', textDecoration: 'none' }}
                >
                  {m.label}
                </Link>
              )
            )}

            {/* Phone + CTA */}
            <a href="tel:+35627802062" className="flex items-center" style={{ gap: '8px', padding: '22px 4px 8px', textDecoration: 'none' }}>
              <PhoneIcon />
              <span style={{ color: GREEN, fontFamily: '"Novecento Wide", sans-serif', fontSize: '16px', fontWeight: 600, letterSpacing: '0.5px' }}>27802062</span>
            </a>
            <Link
              href="/consultation"
              onClick={() => setOpen(false)}
              className="cta-glow block text-center"
              style={{ ...ctaStyle, marginTop: '10px', padding: '14px', fontSize: '13px' }}
            >
              Free Body Composition Analysis
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
