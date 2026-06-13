'use client';

import Link from 'next/link';
import { useState } from 'react';

const GREEN = '#8EB093';
const NAV_STYLE = {
  color: GREEN,
  fontFamily: '"Novecento Wide", sans-serif',
  fontSize: '12px',
  fontWeight: 400 as const,
  letterSpacing: '1px',
  textDecoration: 'none',
} as const;

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white sticky top-0 z-50" style={{ borderBottom: '1px solid #E8E3DE' }}>
      {/* Scrolling banner */}
      <div className="w-full overflow-hidden text-white flex items-center" style={{ backgroundColor: '#8EB093', height: '32px' }}>
        <div style={{ animation: 'scroll-banner 24s linear infinite', whiteSpace: 'nowrap', display: 'inline-block', fontFamily: '"Novecento Wide", sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '2px' }}>
          {[0, 1].map((k) => (
            <span key={k}>
              {'   '}#1 VOTED SLIMMING CLINIC IN MALTA{'   ▫   '}MALTA&apos;S MOST COMPREHENSIVE SLIMMING PROGRAM{'   ▫   '}MEDICALLY QUALIFIED DOCTORS{'   ▫   '}
            </span>
          ))}
        </div>
        <style>{`@keyframes scroll-banner { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
      </div>

      <nav className="max-w-[1200px] mx-auto px-6 md:px-10" style={{ height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <img src="/logo.png" alt="Carisma Slimming" style={{ height: '44px', width: 'auto' }} />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center" style={{ gap: '40px' }}>
          <Link href="/weight-loss" style={NAV_STYLE} className="hover:opacity-70 uppercase">
            Weight Loss
          </Link>
          <Link href="/glp1" style={NAV_STYLE} className="hover:opacity-70 uppercase">
            GLP-1s
          </Link>

          {/* Packages dropdown */}
          <div className="relative group">
            <button style={{ ...NAV_STYLE, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} className="hover:opacity-70 uppercase">
              Packages
            </button>
            <div className="absolute hidden group-hover:block bg-white shadow-lg py-2 z-50" style={{ top: '100%', left: '50%', transform: 'translateX(-50%)', width: '200px', borderRadius: '6px', border: '1px solid #E8E3DE', marginTop: '8px' }}>
              {[
                { label: 'Fat Freezing', href: '/packages/fat-freezing' },
                { label: 'Fat Dissolving', href: '/packages/fat-dissolving' },
                { label: 'Muscle Stimulation', href: '/packages/muscle-stimulation' },
                { label: 'Skin Tightening', href: '/packages/skin-tightening' },
                { label: 'Lipocavitation', href: '/packages/lipocavitation' },
                { label: 'Anti Cellulite', href: '/packages/anti-cellulite' },
                { label: 'Lymphatic Drainage', href: '/packages/lymphatic-drainage' },
              ].map((item) => (
                <Link key={item.href} href={item.href} className="block px-4 py-2 hover:bg-gray-50" style={{ color: '#9B8D83', fontFamily: 'Roboto, sans-serif', fontSize: '13px' }}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/slimming-guide" style={NAV_STYLE} className="hover:opacity-70 uppercase">
            Slimming Guide
          </Link>

          {/* Phone */}
          <a href="tel:+35627802062" className="flex items-center hover:opacity-70" style={{ gap: '6px', textDecoration: 'none' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.21 12.8a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span style={{ color: GREEN, fontFamily: '"Novecento Wide", sans-serif', fontSize: '13px', fontWeight: 600, letterSpacing: '1.5px' }}>
              27802062
            </span>
          </a>

          {/* CTA */}
          <Link
            href="/consultation"
            className="hover:opacity-90 transition-opacity"
            style={{
              backgroundColor: GREEN,
              color: '#ffffff',
              fontFamily: '"Novecento Wide", sans-serif',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              padding: '12px 22px',
              borderRadius: '8px',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            Free Consultation
          </Link>
        </div>

        {/* Mobile burger */}
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
          <svg className="w-6 h-6" fill="none" stroke={GREEN} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t" style={{ borderColor: '#E8E3DE', padding: '16px 24px 24px' }}>
          {[
            { label: 'Weight Loss', href: '/weight-loss' },
            { label: 'GLP-1s', href: '/glp1' },
            { label: 'Slimming Guide', href: '/slimming-guide' },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="block py-3 hover:opacity-70" style={{ color: GREEN, fontFamily: '"Novecento Wide", sans-serif', fontSize: '13px', letterSpacing: '1px', borderBottom: '1px solid #F0EBE6' }}>
              {item.label}
            </Link>
          ))}
          <div style={{ borderBottom: '1px solid #F0EBE6' }}>
            <p className="py-3" style={{ color: GREEN, fontFamily: '"Novecento Wide", sans-serif', fontSize: '13px', letterSpacing: '1px' }}>Packages</p>
            {[
              { label: 'Fat Freezing', href: '/packages/fat-freezing' },
              { label: 'Fat Dissolving', href: '/packages/fat-dissolving' },
              { label: 'Muscle Stimulation', href: '/packages/muscle-stimulation' },
              { label: 'Skin Tightening', href: '/packages/skin-tightening' },
              { label: 'Lipocavitation', href: '/packages/lipocavitation' },
              { label: 'Anti Cellulite', href: '/packages/anti-cellulite' },
              { label: 'Lymphatic Drainage', href: '/packages/lymphatic-drainage' },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="block py-2 pl-4 hover:opacity-70" style={{ color: '#9B8D83', fontFamily: 'Roboto, sans-serif', fontSize: '13px' }}>
                {item.label}
              </Link>
            ))}
          </div>
          <a href="tel:+35627802062" className="flex items-center py-3 hover:opacity-70" style={{ gap: '8px', textDecoration: 'none', borderBottom: '1px solid #F0EBE6' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.21 12.8a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span style={{ color: GREEN, fontFamily: '"Novecento Wide", sans-serif', fontSize: '13px', fontWeight: 600 }}>27802062</span>
          </a>
          <Link
            href="/consultation"
            className="block text-center mt-4 hover:opacity-90"
            style={{ backgroundColor: GREEN, color: '#ffffff', fontFamily: '"Novecento Wide", sans-serif', fontSize: '13px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', padding: '14px', borderRadius: '8px', textDecoration: 'none' }}
          >
            Free Consultation
          </Link>
        </div>
      )}
    </header>
  );
}
