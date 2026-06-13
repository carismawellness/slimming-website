'use client';

import Link from 'next/link';
import { useState } from 'react';

const GREEN = '#8EB093';

const navLink = {
  color: GREEN,
  fontFamily: '"Novecento Wide", sans-serif',
  fontSize: '13px',
  fontWeight: 400 as const,
  letterSpacing: '1.2px',
  textDecoration: 'none',
  textTransform: 'uppercase' as const,
  whiteSpace: 'nowrap' as const,
};

const BANNER = "#1 VOTED SLIMMING CLINIC IN MALTA   ▫   MALTA’S MOST COMPREHENSIVE SLIMMING PROGRAM   ▫   MEDICALLY QUALIFIED DOCTORS   ▫   ";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white sticky top-0 z-50" style={{ borderBottom: '1px solid #E8E3DE' }}>

      {/* Scrolling banner */}
      <div className="overflow-hidden flex items-center" style={{ backgroundColor: GREEN, height: '30px' }}>
        <div style={{
          display: 'inline-block',
          whiteSpace: 'nowrap',
          animation: 'marquee 26s linear infinite',
          fontFamily: '"Novecento Wide", sans-serif',
          fontWeight: 700,
          fontSize: '10px',
          letterSpacing: '2px',
          color: '#ffffff',
        }}>
          <span>{BANNER}</span><span>{BANNER}</span>
        </div>
        <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
      </div>

      {/* Main nav — 3-column: logo | links | phone+cta */}
      <div className="hidden md:grid" style={{
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 40px',
        height: '68px',
      }}>

        {/* LEFT — Logo */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link href="/">
            <img src="/logo.png" alt="Carisma Slimming" style={{ height: '40px', width: 'auto', display: 'block' }} />
          </Link>
        </div>

        {/* CENTER — Nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
          <Link href="/weight-loss" style={navLink} className="hover:opacity-60 transition-opacity">Weight Loss</Link>
          <Link href="/glp1" style={navLink} className="hover:opacity-60 transition-opacity">GLP-1s</Link>

          {/* Packages dropdown */}
          <div className="relative group" style={{ display: 'flex', alignItems: 'center' }}>
            <button style={{ ...navLink, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} className="hover:opacity-60 transition-opacity">
              Packages
            </button>
            <div className="absolute hidden group-hover:block" style={{
              top: 'calc(100% + 10px)',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: '#ffffff',
              border: '1px solid #E8E3DE',
              borderRadius: '6px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
              width: '200px',
              padding: '6px 0',
              zIndex: 100,
            }}>
              {[
                ['Fat Freezing', '/packages/fat-freezing'],
                ['Fat Dissolving', '/packages/fat-dissolving'],
                ['Muscle Stimulation', '/packages/muscle-stimulation'],
                ['Skin Tightening', '/packages/skin-tightening'],
                ['Lipocavitation', '/packages/lipocavitation'],
                ['Anti Cellulite', '/packages/anti-cellulite'],
                ['Lymphatic Drainage', '/packages/lymphatic-drainage'],
              ].map(([label, href]) => (
                <Link key={href} href={href} className="block hover:bg-gray-50"
                  style={{ padding: '8px 16px', color: '#9B8D83', fontFamily: 'Roboto, sans-serif', fontSize: '13px', textDecoration: 'none' }}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/slimming-guide" style={navLink} className="hover:opacity-60 transition-opacity">Slimming Guide</Link>
        </div>

        {/* RIGHT — Phone + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '20px' }}>
          <a href="tel:+35627802062" className="flex items-center hover:opacity-60 transition-opacity" style={{ gap: '6px', textDecoration: 'none' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.21 12.8a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.11 2h3a2 2 0 0 1 2 1.72c.128.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.572 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <span style={{ color: GREEN, fontFamily: '"Novecento Wide", sans-serif', fontSize: '13px', fontWeight: 600, letterSpacing: '1px' }}>
              27802062
            </span>
          </a>
          <Link href="/consultation" className="hover:opacity-85 transition-opacity" style={{
            backgroundColor: GREEN,
            color: '#ffffff',
            fontFamily: '"Novecento Wide", sans-serif',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            padding: '11px 20px',
            borderRadius: '8px',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}>
            Free Consultation
          </Link>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden flex items-center justify-between" style={{ padding: '0 20px', height: '60px' }}>
        <Link href="/"><img src="/logo.png" alt="Carisma Slimming" style={{ height: '36px', width: 'auto' }} /></Link>
        <button onClick={() => setOpen(!open)} aria-label="Menu">
          <svg width="22" height="22" fill="none" stroke={GREEN} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-white" style={{ borderTop: '1px solid #E8E3DE', padding: '12px 20px 20px' }}>
          {[['Weight Loss','/weight-loss'],['GLP-1s','/glp1'],['Slimming Guide','/slimming-guide']].map(([l,h])=>(
            <Link key={h} href={h} className="block py-3" style={{ color: GREEN, fontFamily:'"Novecento Wide",sans-serif', fontSize:'13px', borderBottom:'1px solid #F0EBE6', textDecoration:'none' }}>{l}</Link>
          ))}
          <p className="py-3" style={{ color: GREEN, fontFamily:'"Novecento Wide",sans-serif', fontSize:'13px', borderBottom:'1px solid #F0EBE6' }}>Packages</p>
          {[['Fat Freezing','/packages/fat-freezing'],['Fat Dissolving','/packages/fat-dissolving'],['Muscle Stimulation','/packages/muscle-stimulation'],['Skin Tightening','/packages/skin-tightening'],['Lipocavitation','/packages/lipocavitation'],['Anti Cellulite','/packages/anti-cellulite'],['Lymphatic Drainage','/packages/lymphatic-drainage']].map(([l,h])=>(
            <Link key={h} href={h} className="block py-2 pl-4" style={{ color:'#9B8D83', fontFamily:'Roboto,sans-serif', fontSize:'13px', textDecoration:'none' }}>{l}</Link>
          ))}
          <a href="tel:+35627802062" className="flex items-center py-3" style={{ gap:'8px', borderBottom:'1px solid #F0EBE6', textDecoration:'none' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.21 12.8a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.11 2h3a2 2 0 0 1 2 1.72c.128.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.572 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span style={{ color:GREEN, fontFamily:'"Novecento Wide",sans-serif', fontSize:'13px', fontWeight:600 }}>27802062</span>
          </a>
          <Link href="/consultation" className="block text-center mt-4" style={{ backgroundColor:GREEN, color:'#fff', fontFamily:'"Novecento Wide",sans-serif', fontSize:'13px', fontWeight:700, letterSpacing:'1px', textTransform:'uppercase', padding:'13px', borderRadius:'8px', textDecoration:'none' }}>
            Free Consultation
          </Link>
        </div>
      )}
    </header>
  );
}
