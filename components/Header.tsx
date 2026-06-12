'use client';

import Link from 'next/link';
import { useState } from 'react';

const BANNER_PHRASE = "#1 VOTED SLIMMING CLINIC IN MALTA        ▫️        MALTA'S MOST COMPREHENSIVE SLIMMING PROGRAM        ▫️        MEDICALLY QUALIFIED DOCTORS        ▫️        ";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white sticky top-0 z-50">
      {/* Scrolling Banner - continuous ticker (text duplicated so the strip is never empty) */}
      <div className="w-full overflow-hidden text-white flex items-center" style={{ backgroundColor: '#8EB093', height: '34px', fontSize: '12px' }}>
        <div
          style={{
            animation: 'scroll-banner 20s linear infinite',
            whiteSpace: 'nowrap',
            display: 'inline-block',
            fontFamily: '"Novecento Wide", sans-serif',
            fontWeight: 'bold',
            letterSpacing: '1.8px'
          }}
        >
          <span>{BANNER_PHRASE}</span>
          <span>{BANNER_PHRASE}</span>
        </div>
        <style>{`
          @keyframes scroll-banner {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </div>

      <nav className="max-w-[980px] mx-auto px-4 md:px-0 py-5">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Carisma Slimming"
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center" style={{ gap: '44px' }}>
            <Link href="/weight-loss" className="font-normal uppercase tracking-wide hover:text-gray-900" style={{ color: '#B0A68F', fontFamily: '"Novecento Wide", sans-serif', fontSize: '12px', fontWeight: 400 }}>
              WEIGHT LOSS
            </Link>
            <Link href="/glp1" className="font-normal uppercase tracking-wide hover:text-gray-900" style={{ color: '#B0A68F', fontFamily: '"Novecento Wide", sans-serif', fontSize: '12px', fontWeight: 400 }}>
              GLP-1s
            </Link>
            <div className="relative group">
              <button className="font-normal uppercase tracking-wide hover:text-gray-900" style={{ color: '#B0A68F', fontFamily: '"Novecento Wide", sans-serif', fontSize: '12px', fontWeight: 400 }}>
                PACKAGES
              </button>
              <div className="absolute hidden group-hover:block bg-white shadow-lg rounded py-2 w-56 z-50">
                <Link href="/packages/fat-freezing" className="block px-4 py-2 hover:bg-gray-50 text-sm" style={{ color: '#9B8D83' }}>
                  Fat Freezing
                </Link>
                <Link href="/packages/fat-dissolving" className="block px-4 py-2 hover:bg-gray-50 text-sm" style={{ color: '#9B8D83' }}>
                  Fat Dissolving
                </Link>
                <Link href="/packages/muscle-stimulation" className="block px-4 py-2 hover:bg-gray-50 text-sm" style={{ color: '#9B8D83' }}>
                  Muscle Stimulation
                </Link>
                <Link href="/packages/skin-tightening" className="block px-4 py-2 hover:bg-gray-50 text-sm" style={{ color: '#9B8D83' }}>
                  Skin Tightening
                </Link>
                <Link href="/packages/lipocavitation" className="block px-4 py-2 hover:bg-gray-50 text-sm" style={{ color: '#9B8D83' }}>
                  Lipocavitation
                </Link>
                <Link href="/packages/anti-cellulite" className="block px-4 py-2 hover:bg-gray-50 text-sm" style={{ color: '#9B8D83' }}>
                  Anti Cellulite
                </Link>
                <Link href="/packages/lymphatic-drainage" className="block px-4 py-2 hover:bg-gray-50 text-sm" style={{ color: '#9B8D83' }}>
                  Lymphatic drainage
                </Link>
              </div>
            </div>
            <Link href="/slimming-guide" className="font-normal uppercase tracking-wide hover:text-gray-900" style={{ color: '#B0A68F', fontFamily: '"Novecento Wide", sans-serif', fontSize: '12px', fontWeight: 400 }}>
              SLIMMING GUIDE
            </Link>
            <Link href="/blog" className="font-normal uppercase tracking-wide hover:text-gray-900" style={{ color: '#B0A68F', fontFamily: '"Novecento Wide", sans-serif', fontSize: '12px', fontWeight: 400 }}>
              BLOG
            </Link>
            <a href="tel:+35627802062" className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#B0A68F' }}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span style={{ color: '#8EB093', fontFamily: '"Novecento Wide", sans-serif', fontWeight: 700, fontSize: '12px', letterSpacing: '3px' }}>27802062</span>
            </a>
            <Link href="/consultation" className="text-white px-6 py-3 uppercase tracking-wide hover:opacity-90 transition" style={{ backgroundColor: '#8EB093', borderRadius: '10px', fontFamily: '"Novecento Wide", sans-serif', fontWeight: 700, fontSize: '12px' }}>
              FREE CONSULTATION
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <Link href="/weight-loss" className="block text-gray-700 hover:text-gray-900 py-2">
              Weight Loss
            </Link>
            <Link href="/glp1" className="block text-gray-700 hover:text-gray-900 py-2">
              GLP-1s
            </Link>
            <Link href="/packages" className="block text-gray-700 hover:text-gray-900 py-2">
              Packages
            </Link>
            <Link href="/packages/fat-freezing" className="block text-gray-600 hover:text-gray-900 py-1 pl-4 text-sm">
              Fat Freezing
            </Link>
            <Link href="/packages/fat-dissolving" className="block text-gray-600 hover:text-gray-900 py-1 pl-4 text-sm">
              Fat Dissolving
            </Link>
            <Link href="/packages/muscle-stimulation" className="block text-gray-600 hover:text-gray-900 py-1 pl-4 text-sm">
              Muscle Stimulation
            </Link>
            <Link href="/packages/skin-tightening" className="block text-gray-600 hover:text-gray-900 py-1 pl-4 text-sm">
              Skin Tightening
            </Link>
            <Link href="/packages/lipocavitation" className="block text-gray-600 hover:text-gray-900 py-1 pl-4 text-sm">
              Lipocavitation
            </Link>
            <Link href="/packages/anti-cellulite" className="block text-gray-600 hover:text-gray-900 py-1 pl-4 text-sm">
              Anti Cellulite
            </Link>
            <Link href="/packages/lymphatic-drainage" className="block text-gray-600 hover:text-gray-900 py-1 pl-4 text-sm">
              Lymphatic drainage
            </Link>
            <Link href="/slimming-guide" className="block text-gray-700 hover:text-gray-900 py-2">
              Slimming Guide
            </Link>
            <Link href="/blog" className="block text-gray-700 hover:text-gray-900 py-2">
              Blog
            </Link>
            <a href="tel:+35627802062" className="block text-gray-700 hover:text-gray-900 font-semibold py-2">
              27802062
            </a>
            <Link href="/consultation" className="block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 text-center font-bold">
              Free Consultation
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
