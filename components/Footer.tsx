'use client';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SiteSearch from './SiteSearch';
import GoogleReviews from './GoogleReviews';
import BookConsultationButton from './BookConsultationButton';
import DoctorShowcase from './doctors/DoctorShowcase';

// ─── Brand tokens ──────────────────────────────────────────────────────────────
const DEEP  = '#024C27';
const SAGE  = '#4f7256';
const TAUPE = '#6f6456';
const LIGHT = '#C9D8C1';
const SERIF = '"Trajan Pro", serif';
const WIDE  = '"Novecento Wide", sans-serif';
const BODY  = 'Roboto, sans-serif';

const FRESHA_AES = 'https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2843963&eid=4994308&oiid=sv%3A25969858&share=true&pId=2708191';
const IG_URL = 'https://www.instagram.com/carismaslimming';
const FB_URL = 'https://www.facebook.com/carismaaesthetics/';

// ─── Static data ───────────────────────────────────────────────────────────────
const BRANDS = [
  {
    title: 'Carisma Spa & Wellness',
    img: '/wix/87fc13_a62cc8038b274204a2fe70fd3d4879d0~mv2.png',
    logo: '/wix/87fc13_e2e5f077c0024cbc9a3d975e4a009b7e~mv2.png',
    cta: 'Discover Our Spas',
    href: 'https://www.carismaspa.com',
  },
  {
    title: 'Carisma Aesthetics',
    img: '/wix/87fc13_bdc2b69242844d529915c2f20b2584ac~mv2.png',
    logo: '/wix/87fc13_b5a7ec4b11f445b4879c36d7268ba6d1~mv2.png',
    cta: 'Discover Med-Aesthetics',
    href: FRESHA_AES,
  },
];

const IG_GRID = [
  { src: '/Thumbnail.png', alt: 'Carisma Slimming clinic treatment' },
  { src: '/wix/87fc13_16e7dbedc9e84343b51b1f3d4821c6ea~mv2.jpg', alt: 'Weight loss consultation at Carisma Slimming' },
  { src: '/wix/87fc13_6ac670fc080e4fe4a974d6701eed38a8~mv2_crop.jpg', alt: 'Body contouring treatment' },
  { src: '/wix/87fc13_56eec505c9f9433db5846a0aeae07c7f~mv2.jpg', alt: 'Carisma Slimming team' },
  { src: '/wix/87fc13_bdc2b69242844d529915c2f20b2584ac~mv2.png', alt: 'Carisma Aesthetics clinic' },
  { src: '/wix/87fc13_a62cc8038b274204a2fe70fd3d4879d0~mv2.png', alt: 'Carisma Spa & Wellness' },
];

const NAV_LINKS = [
  { label: 'Medical Weight Loss', href: '/weight-loss' },
  { label: 'GLP-1 Injections', href: '/glp1' },
  { label: 'Body Contouring Packages', href: '/packages' },
  { label: 'Free Slimming Guide', href: '/slimming-guide' },
  { label: 'Book a Consultation', href: '/consultation' },
];

// ─── Micro helpers ─────────────────────────────────────────────────────────────
function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p style={{ fontFamily: WIDE, fontSize: '11px', fontWeight: 700, letterSpacing: '3.5px', textTransform: 'uppercase', color: dark ? LIGHT : '#9B8D83', marginBottom: '10px' }}>
      {children}
    </p>
  );
}
function Rule({ dark = false }: { dark?: boolean }) {
  return <div style={{ width: '36px', height: '1px', backgroundColor: dark ? 'rgba(201,216,193,0.4)' : '#C9B8AE', marginBottom: '24px' }} />;
}

// ─── Section: Doctors — award-winning 3D coverflow showcase ───────────────────
function DoctorsSection() {
  return <DoctorShowcase />;
}

// ─── Section: Book / Slimming Guide ───────────────────────────────────────────
function BookSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) { setVisible(true); return; }
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  return (
    <section aria-labelledby="footer-guide-h" style={{ background: DEEP, padding: '80px 0', overflow: 'hidden' }}>
      <style>{`@keyframes bookRise{from{opacity:0;transform:translateY(48px) rotate(-4deg)}to{opacity:1;transform:translateY(0) rotate(-4deg)}}.book-r{animation:bookRise 1s cubic-bezier(.16,1,.3,1) forwards}.book-h{opacity:0;transform:translateY(48px) rotate(-4deg)}`}</style>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '56px', alignItems: 'center', justifyContent: 'center' }}>
          <div ref={ref} className={visible ? 'book-r' : 'book-h'} style={{ flexShrink: 0 }}>
            <Image src="/wix/87fc13_fae77cba7c5843e1ae57040ac00c3cce~mv2.png" alt="Carisma Slimming Guide" width={220} height={282} style={{ maxWidth: '220px', filter: 'drop-shadow(0 40px 60px rgba(0,0,0,0.5))' }} loading="lazy" />
          </div>
          <div style={{ flex: '1 1 300px', maxWidth: '460px' }}>
            <Eyebrow dark>Free download</Eyebrow>
            <Rule dark />
            <h2 id="footer-guide-h" style={{ fontFamily: SERIF, fontSize: 'clamp(20px,2.8vw,28px)', fontWeight: 400, color: '#fff', letterSpacing: '1px', textTransform: 'uppercase', lineHeight: 1.4, marginBottom: '18px' }}>
              Your Bible to Sustainable Weight Loss
            </h2>
            <p style={{ fontFamily: BODY, fontSize: '14px', lineHeight: 1.8, color: 'rgba(255,255,255,0.65)', marginBottom: '28px' }}>
              Built from clinical experience — when to eat, what to eat, how much, and in which order. A practical framework you can return to on busy or low-energy days, without perfection.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <Link href="/slimming-guide" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: WIDE, fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', textDecoration: 'none', background: '#ffffff', color: DEEP, padding: '14px 28px', borderRadius: '999px', minHeight: '44px', whiteSpace: 'nowrap' }}>
                Download the Guide
              </Link>
              <BookConsultationButton variant="outline" style={{ border: '1px solid rgba(255,255,255,0.45)', color: '#ffffff', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', padding: '14px 24px' }}>
                Book Free Consultation
              </BookConsultationButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Sister Brands ───────────────────────────────────────────────────
function BrandsSection() {
  return (
    <section aria-labelledby="footer-brands-h" style={{ background: '#FAF7F4', padding: '80px 0' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Eyebrow>The Carisma Wellness Group</Eyebrow>
          <Rule />
          <h2 id="footer-brands-h" style={{ fontFamily: SERIF, fontSize: 'clamp(20px,3vw,28px)', fontWeight: 400, color: DEEP, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '20px' }}>
            Malta&rsquo;s Leading Wellness Group
          </h2>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Image src="/wix/f940f0_2376c935184343478e49eeec5ca6fc51~mv2.png" alt="Malta awards winner" width={100} height={64} style={{ width: '100px', height: '64px', objectFit: 'contain' }} />
            <p style={{ fontFamily: BODY, fontSize: '14px', lineHeight: 1.7, color: TAUPE, maxWidth: '380px', textAlign: 'left' }}>
              <strong style={{ color: SAGE }}>35+ years</strong> of expertise across wellness, aesthetics and slimming — guided by medical excellence and a passion for confidence.
            </p>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: '20px' }}>
          {BRANDS.map((brand) => (
            <div key={brand.title} style={{ position: 'relative', height: '272px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
              <Image src={brand.img} alt={brand.title} fill style={{ objectFit: 'cover' }} sizes="(max-width:768px) 100vw, 50vw" loading="lazy" />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(100deg,rgba(2,20,10,0.75) 0%,rgba(2,20,10,0.25) 60%,transparent 100%)' }} />
              <div style={{ position: 'absolute', inset: 0, padding: '28px 28px 28px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <Image src={brand.logo} alt={`${brand.title} logo`} width={150} height={84} style={{ width: '150px', height: '84px', objectFit: 'contain', objectPosition: 'left', marginBottom: '14px' }} />
                <a href={brand.href} target="_blank" rel="noopener noreferrer" aria-label={`${brand.cta} — opens in new tab`}
                  style={{ display: 'inline-flex', alignItems: 'center', fontFamily: WIDE, fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', textDecoration: 'none', color: '#fff', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.4)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', padding: '11px 20px', borderRadius: '999px', minHeight: '42px', width: 'fit-content', transition: 'background .2s' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.28)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.15)')}>
                  {brand.cta} →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: Search ─────────────────────────────────────────────────────────
function SearchSection() {
  return (
    <div style={{ background: '#ffffff', padding: '44px 0', borderTop: '1px solid #EEE8E2' }}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <p style={{ fontFamily: WIDE, fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#9B8D83', textAlign: 'center', marginBottom: '14px' }}>
          What are you looking for?
        </p>
        <SiteSearch />
      </div>
    </div>
  );
}

// ─── Section: Dark base ──────────────────────────────────────────────────────
function FooterBase() {
  return (
    <div style={{ background: DEEP }}>
      {/* Instagram grid */}
      <div style={{ padding: '52px 0 44px', borderBottom: '1px solid rgba(201,216,193,0.14)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ textAlign: 'center', marginBottom: '22px' }}>
            <Eyebrow dark>Follow us on Instagram</Eyebrow>
            <a href={IG_URL} target="_blank" rel="noopener noreferrer" style={{ fontFamily: WIDE, fontSize: '18px', fontWeight: 700, letterSpacing: '1px', color: '#ffffff', textDecoration: 'none' }}>
              @carismaslimming
            </a>
          </div>
          <style>{`.igt:hover .igo{background:rgba(2,76,39,.55)!important}.igt:hover .igicon{opacity:1!important}.igt:hover img{transform:scale(1.06)}`}</style>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: '3px', borderRadius: '10px', overflow: 'hidden' }}>
            {IG_GRID.map((img, i) => (
              <a key={i} href={IG_URL} target="_blank" rel="noopener noreferrer" aria-label={`${img.alt} — Instagram`} className="igt" style={{ display: 'block', aspectRatio: '1/1', position: 'relative', overflow: 'hidden' }}>
                <Image src={img.src} alt={img.alt} fill style={{ objectFit: 'cover', transition: 'transform .4s ease' }} sizes="120px" loading="lazy" />
                <div className="igo" style={{ position: 'absolute', inset: 0, background: 'rgba(2,76,39,0)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background .3s' }}>
                  <svg className="igicon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" style={{ opacity: 0, transition: 'opacity .3s' }}><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="#fff" stroke="none" /></svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Info grid */}
      <div style={{ padding: '52px 0 44px', borderBottom: '1px solid rgba(201,216,193,0.14)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: '44px' }}>

            {/* Brand */}
            <div>
              <p style={{ fontFamily: SERIF, fontSize: '18px', fontWeight: 400, color: '#fff', letterSpacing: '1px', marginBottom: '12px' }}>Carisma Slimming</p>
              <p style={{ fontFamily: BODY, fontSize: '13px', lineHeight: 1.75, color: 'rgba(255,255,255,0.55)', maxWidth: '210px', marginBottom: '20px' }}>
                Malta&rsquo;s most comprehensive slimming programme — medical weight loss, body contouring and personalised meal plans.
              </p>
              <div style={{ display: 'flex', gap: '14px' }}>
                {[
                  { href: IG_URL, label: 'Instagram', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg> },
                  { href: FB_URL, label: 'Facebook', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.45 9-4.7 9-9.95z" /></svg> },
                ].map(({ href, label, icon }) => (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    style={{ color: 'rgba(255,255,255,0.55)', transition: 'color .2s' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#fff')}
                    onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.55)')}>
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Nav */}
            <div>
              <h4 style={{ fontFamily: WIDE, fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: LIGHT, marginBottom: '18px' }}>Explore</h4>
              <nav aria-label="Footer navigation">
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '11px' }}>
                  {NAV_LINKS.map(({ label, href }) => (
                    <li key={href}>
                      <Link href={href} style={{ fontFamily: BODY, fontSize: '13px', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', transition: 'color .2s' }}
                        onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#fff')}
                        onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.6)')}>
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Contact */}
            <div>
              <h4 style={{ fontFamily: WIDE, fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: LIGHT, marginBottom: '18px' }}>Get in touch</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '13px' }}>
                {[
                  { href: 'tel:+35627802062', label: '+356 27802062', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.21 12.8a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.11 2h3a2 2 0 0 1 2 1.72c.128.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.572 2.81.7A2 2 0 0 1 22 16.92z" /></svg> },
                  { href: 'mailto:info@carismaslimming.com', label: 'info@carismaslimming.com', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg> },
                ].map(({ href, label, icon }) => (
                  <li key={href}>
                    <a href={href} style={{ display: 'flex', alignItems: 'center', gap: '9px', color: 'rgba(255,255,255,0.6)', fontFamily: BODY, fontSize: '13px', textDecoration: 'none', transition: 'color .2s' }}
                      onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#fff')}
                      onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.6)')}>
                      <span style={{ color: LIGHT, flexShrink: 0 }}>{icon}</span>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Copyright */}
      <div style={{ padding: '18px 0' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
          <p style={{ fontFamily: BODY, fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
            © {new Date().getFullYear()} Carisma Slimming. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '22px' }}>
            {[{ label: 'Privacy Policy', href: '/privacy-policy' }, { label: 'Terms & Conditions', href: '/terms-conditions' }].map(({ label, href }) => (
              <Link key={href} href={href} style={{ fontFamily: BODY, fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', textDecoration: 'none', transition: 'color .2s' }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.65)')}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.3)')}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer>
      <GoogleReviews />
      <DoctorsSection />
      <BookSection />
      <BrandsSection />
      <SearchSection />
      <FooterBase />
    </footer>
  );
}
