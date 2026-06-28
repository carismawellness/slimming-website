'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import BrandSwitcher from '@/components/BrandSwitcher';

// Accessible brand tokens (see globals.css locked palette).
// GREEN_FILL: solid sage dark enough that #fff text clears 4.5:1 (used as
//   announcement-strip + CTA background). 5.42:1 AA.
// 2026 palette refresh — deep forest #024C27 is the new primary brand green
// (AAA white text / AAA on white). TAUPE stays the neutral nav-link ink.
const GREEN_FILL = '#024C27'; // CTA fill / deep brand green
const GREEN = '#024C27';      // brand green for small text/icons/announcement bar (AAA on white)
const TAUPE = '#6F6456';
const DROPDOWN_INK = '#6F6456'; // dropdown/sub-item link on white = 5.78:1 AA (was #9B8D83 -> 3.22:1)

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
  { label: 'GLP-1 Injections', href: '/glp1' },
  { label: 'Body Contouring', items: PACKAGE_LINKS },
  { label: 'Slimming Guide', href: '/slimming-guide' },
];

// Homepage split top-nav (desktop, at scroll-top): the menu labels become simple
// links flanking the centered vertical brand lockup. A dropdown's top-state
// destination is its first sub-item href (else '/').
type SimpleMenu = { label: string; href: string };
const SIMPLE_MENUS: SimpleMenu[] = MENUS.map((m) => ({
  label: m.label,
  href: m.href ?? m.items?.[0]?.href ?? '/',
}));
const NAV_LEFT: SimpleMenu[] = SIMPLE_MENUS.slice(0, Math.ceil(SIMPLE_MENUS.length / 2));
const NAV_RIGHT: SimpleMenu[] = SIMPLE_MENUS.slice(Math.ceil(SIMPLE_MENUS.length / 2));

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
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [pkgHover, setPkgHover] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Hover-intent: open immediately, close on a short delay so the cursor can
  // travel from the trigger into the panel without the wrapper's onMouseLeave
  // race-closing the menu (the old no-delay behaviour felt "stuck").
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelClose = () => { if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; } };
  const openPkg = () => { cancelClose(); setPkgHover(true); };
  const schedulePkgClose = () => { cancelClose(); closeTimer.current = setTimeout(() => setPkgHover(false), 160); };
  useEffect(() => cancelClose, []);

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
      {/* Announcement strip removed per request. Logo sizing rules retained. */}
      <style>{`@media (max-width:767px){.header-logo{height:20px !important}}
.header-logo--mobile{height:22px !important}

/* ── Homepage split top-nav (scroll-top) — full-width, flanks the vertical lockup ── */
.cms-topnav {
  display: none;
  position: absolute;
  inset: 0 0 auto 0;
  padding: 26px clamp(28px, 5vw, 72px) 0;
  transition: opacity .55s cubic-bezier(.22,1,.36,1), transform .55s cubic-bezier(.22,1,.36,1);
}
@media (min-width: 768px) {
  .cms-topnav--home { display: block; opacity: 1; transform: translateY(0); }
  .cms-topnav--hidden { opacity: 0; transform: translateY(-18px); pointer-events: none; }
}
.cms-topnav__row {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  /* Gap between the centered logo and the nearest link on each side —
     keep links hugging the logo, not pushed to the page margins. */
  gap: clamp(1.5rem, 3vw, 2.75rem);
  max-width: 1480px;
  margin: 0 auto;
}
.cms-topnav__group { display: flex; align-items: center; gap: clamp(1.25rem, 3.5vw, 3.5rem); }
/* Both groups hug the centered logo: left group right-aligned, right group left-aligned. */
.cms-topnav__group--left { justify-content: flex-end; }
.cms-topnav__group--right { justify-content: flex-start; }
.cms-topnav__link {
  color: #024C27;
  font-family: "Novecento Wide", sans-serif;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;
  opacity: 0.92;
  transition: opacity .25s ease, color .25s ease;
}
.cms-topnav__link:hover { opacity: 1; color: #8EB093; }
.cms-topnav__brand { display: inline-flex; align-items: center; justify-content: center; }

/* Mobile centered lockup band (scroll-top, homepage) sitting above the hamburger row */
.cms-mobilelockup {
  display: flex;
  justify-content: center;
  padding: 14px 0 4px;
  transition: opacity .45s cubic-bezier(.22,1,.36,1), transform .45s cubic-bezier(.22,1,.36,1);
}
@media (min-width: 768px) { .cms-mobilelockup { display: none; } }
.cms-mobilelockup--hidden { opacity: 0; transform: translateY(-10px); pointer-events: none; height: 0; padding: 0; overflow: hidden; }

/* ── Pill wrapper — the morph target ── */
.cms-pillwrap {
  transition: opacity .55s cubic-bezier(.22,1,.36,1), transform .55s cubic-bezier(.22,1,.36,1);
}
@media (min-width: 768px) {
  /* On the homepage at scroll-top the pill is hidden + tucked up; on scroll it "pops" in. */
  .cms-pillwrap--home { opacity: 0; transform: translateY(-14px) scale(0.96); pointer-events: none; }
  .cms-pillwrap--shown { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }
}
@media (prefers-reduced-motion: reduce) {
  .cms-topnav, .cms-pillwrap, .cms-mobilelockup { transition: none; }
}`}</style>

      {/* ── Homepage split top-nav (desktop, scroll-top) — flanks the centered vertical lockup ── */}
      {isHome && (
        <div className={`cms-topnav cms-topnav--home${scrolled ? ' cms-topnav--hidden' : ''}`} aria-hidden={scrolled}>
          <div className="cms-topnav__row">
            <nav className="cms-topnav__group cms-topnav__group--left" aria-label="Primary navigation">
              {NAV_LEFT.map((m) => (
                <Link key={m.label} href={m.href} className="cms-topnav__link">{m.label}</Link>
              ))}
            </nav>
            <Link href="/" className="cms-topnav__brand" aria-label="Carisma Slimming — home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logos/carisma-wordmark.svg" alt="Carisma Slimming" style={{ height: '104px', width: 'auto', display: 'block' }} />
            </Link>
            <nav className="cms-topnav__group cms-topnav__group--right" aria-label="Secondary navigation">
              {NAV_RIGHT.map((m) => (
                <Link key={m.label} href={m.href} className="cms-topnav__link">{m.label}</Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* ── Mobile centered vertical lockup (homepage, scroll-top) ── */}
      {isHome && (
        <div className={`cms-mobilelockup${scrolled ? ' cms-mobilelockup--hidden' : ''}`} aria-hidden={scrolled}>
          <Link href="/" aria-label="Carisma Slimming — home" style={{ textDecoration: 'none' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logos/carisma-wordmark.svg" alt="Carisma Slimming" style={{ height: '70px', width: 'auto', display: 'block' }} />
          </Link>
        </div>
      )}

      {/* Floating glass pill */}
      <div
        className={isHome ? `cms-pillwrap cms-pillwrap--home${scrolled ? ' cms-pillwrap--shown' : ''}` : undefined}
        style={{ padding: '12px clamp(12px,3vw,28px) 0', maxWidth: '1280px', margin: '0 auto' }}
      >
        <nav
          aria-label="Main navigation"
          className="flex items-center justify-between"
          style={{ ...pillStyle, minHeight: '52px', padding: '6px 10px 6px 20px' }}
        >
          {/* Logo + brand switcher */}
          <div className="flex items-center shrink-0">
            <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
              <Image src="/logo.png" alt="Carisma Slimming" width={510} height={96} className="header-logo" style={{ height: '26px', width: 'auto', display: 'block' }} priority />
            </Link>
            <BrandSwitcher />
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center" style={{ gap: '26px' }}>
            {MENUS.map((m) =>
              m.items ? (
                <div
                  key={m.label}
                  className="relative"
                  style={{ display: 'flex', alignItems: 'center' }}
                  onMouseEnter={openPkg}
                  onMouseLeave={schedulePkgClose}
                >
                  <button
                    style={{ ...navLink, background: 'none', border: 'none', cursor: 'pointer', padding: '20px 0', display: 'flex', alignItems: 'center', gap: '4px' }}
                    className="hover:underline transition"
                    aria-haspopup="true"
                    aria-expanded={pkgHover}
                    onClick={() => setPkgHover(p => !p)}
                  >
                    {m.label}
                    <svg
                      width="10" height="10" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                      style={{ transition: 'transform 0.25s cubic-bezier(0.22,1,0.36,1)', transform: pkgHover ? 'rotate(180deg)' : 'rotate(0deg)', opacity: 0.7 }}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {/* Panel is always mounted; open/close is driven by CSS so it
                      fades + slides in AND out smoothly (no abrupt pop), and a
                      hover bridge keeps it reachable from the trigger. */}
                  <div
                    onMouseEnter={cancelClose}
                    onMouseLeave={schedulePkgClose}
                    role="menu"
                    aria-hidden={!pkgHover}
                    style={{
                      position: 'absolute',
                      top: 'calc(100% - 4px)',
                      left: '50%',
                      transform: `translateX(-50%) translateY(${pkgHover ? '0' : '8px'})`,
                      opacity: pkgHover ? 1 : 0,
                      visibility: pkgHover ? 'visible' : 'hidden',
                      pointerEvents: pkgHover ? 'auto' : 'none',
                      transition: 'opacity 0.2s ease, transform 0.24s cubic-bezier(0.22,1,0.36,1), visibility 0.2s',
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
                      {/* Invisible hover bridge over the trigger→panel gap. */}
                      <span aria-hidden style={{ position: 'absolute', bottom: '100%', left: '-60px', right: '-60px', height: '32px', background: 'transparent' }} />
                      {m.items.map((it) => (
                        <Link key={it.href} href={it.href} tabIndex={pkgHover ? undefined : -1} onClick={() => setPkgHover(false)} className="block hover:bg-black/5 hover:underline"
                          style={{ padding: '9px 14px', borderRadius: '10px', color: DROPDOWN_INK, fontFamily: 'Roboto, sans-serif', fontSize: '13px', textDecoration: 'none', transition: 'background 0.3s ease' }}>
                          {it.label}
                        </Link>
                      ))}
                    </div>
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
            <button className="cta-glow" style={{ ...ctaStyle, border: 'none', cursor: 'pointer' }} onClick={() => window.dispatchEvent(new Event('openConsultationModal'))}>Free Body Analysis</button>
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

          {/* Top row: close only (no logo on mobile) */}
          <div className="flex items-center justify-end shrink-0" style={{ padding: '16px clamp(16px,5vw,28px)' }}>
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
            <button
              className="cta-glow block text-center w-full"
              style={{ ...ctaStyle, marginTop: '10px', padding: '14px', fontSize: '13px', border: 'none', cursor: 'pointer' }}
              onClick={() => { setOpen(false); window.dispatchEvent(new Event('openConsultationModal')); }}
            >
              Free Body Analysis
            </button>

            {/* Compact footer */}
            <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid rgba(142,176,147,0.28)' }}>
              <p style={{ fontFamily: '"Novecento Wide", sans-serif', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: GREEN, margin: '0 0 10px' }}>
                Carisma Slimming
              </p>
              <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: 13, lineHeight: 1.6, color: TAUPE, margin: '0 0 6px' }}>
                Grand Hotel Excelsior, Great Siege Road, Floriana FRN 1810, Malta
              </p>
              <a href="mailto:info@carismaslimming.com" style={{ fontFamily: 'Roboto, sans-serif', fontSize: 13, color: GREEN, textDecoration: 'none' }}>
                info@carismaslimming.com
              </a>
              <div className="flex items-center" style={{ gap: 18, marginTop: 16 }}>
                <a href="https://www.instagram.com/carismaslimming" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: GREEN }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a href="https://www.facebook.com/carismaaesthetics/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ color: GREEN }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" />
                  </svg>
                </a>
              </div>
              <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: 11.5, color: TAUPE, margin: '18px 0 0' }}>
                © {new Date().getFullYear()} Carisma Slimming. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
