'use client';

/* ============================================================
   Data-driven slimming-package template — a pixel-faithful
   recreation of the shared carismaslimming.com treatment-page
   layout. Renders the 11 body sections from a PackageContent
   object (lib/packages/*). Global Header + BrandBlock + Footer
   come from app/layout.tsx.

   Section order:
     1  Hero (with optional looping video)
     2  The secret to a more defined, confident look
     3  Malta's trusted clinic — press logos (shared)
     4  Four named benefits
     5  Eligibility — treatable areas
     6  The Carisma difference — we are not another diet clinic (shared)
     7  Package treatments — proven efficacy
     8  Dual / starter pack
     9  Malta's #1 leading wellness chain (+ location map)
     10 Frequently asked questions
     11 Evidence based approach (research cards)
   ============================================================ */

import { useState, useRef } from 'react';
import { BOOKING_URL } from '@/lib/services';
import {
  PackageContent,
  SHARED_DIFFERENCE_BULLETS,
  SHARED_DIFFERENCE_INTRO,
  SHARED_COMMITMENT,
  SHARED_WHY_MALTA,
} from '@/lib/packages/types';

/* ---------- palette / fonts (shared with the site) ---------- */
const GREEN = '#8EB093';
const BLUE = '#6391AB';
const TAUPE = '#9B8D83';
const TAUPE_DK = '#7C7268';
const TAUPE_LT = '#AFA39D';

const SERIF = 'Trajan Pro, "Trajan Pro Regular", Georgia, serif';
const WIDE = 'Novecento Wide Book, Novecento Wide, sans-serif';
const BODY = 'Roboto, sans-serif';

/* ---------- shared assets ---------- */
const W = '/wix/';
const HERO_BG = W + '87fc13_f0e92ac188af4582a4dcab0d17d5d2ed~mv2.png';
const BADGE = W + 'f940f0_c4008d16bc3245f7bc8663f5b60d7a82~mv2.png';
const GOOGLE = W + '87fc13_c507b5f7e86f4eed970b757bc84a8ec4~mv2.png';
const CHECK = W + '87fc13_59346c1121b34e759ebf20eba3054c8c~mv2.png';
const DIFF_BG = W + '87fc13_eed9276b67e74ae99994e6bab4bcd409~mv2.png';
const WELL_BG = W + 'f940f0_9f944ed58e3f4919bf87ef224beb4f94~mv2.png';
const PARKING = W + '87fc13_0426ba92e1fa4e9ebce44215146be031~mv2.png';
const PRESS = {
  maltaDaily: W + 'f940f0_8bd141199fea4275a1222b62f24f2d98~mv2.jpeg',
  maltaToday: W + 'f940f0_8c40f03f50684bf8adc6d9ca0cb2be9e~mv2.jpg',
  lovin: W + 'f940f0_e6f0bd96c9d04debaa8d8b609cbf68e6~mv2.jpeg',
  times: W + 'f940f0_2120887ab6ef4957b02ff004e804beaf~mv2.png',
  mtToday: W + 'f940f0_0db6f1508426404eacea3b33b0e9112d~mv2.png',
};

const CONTAINER: React.CSSProperties = { maxWidth: 1040, marginLeft: 'auto', marginRight: 'auto', paddingLeft: 24, paddingRight: 24 };

/* ---------- shared pieces ---------- */
function Eyebrow({ children, align = 'center' }: { children: React.ReactNode; align?: 'center' | 'left' }) {
  return (
    <p style={{ color: TAUPE, fontFamily: WIDE, fontSize: 13, fontWeight: 400, letterSpacing: 'normal', textTransform: 'uppercase', textAlign: align, margin: 0 }}>
      {children}
    </p>
  );
}

function SectionHeading({ children, align = 'center', size = 28 }: { children: React.ReactNode; align?: 'center' | 'left'; size?: number }) {
  return (
    <h2 style={{ color: GREEN, fontFamily: SERIF, fontWeight: 400, fontSize: size, lineHeight: 1.4, letterSpacing: 'normal', textTransform: 'uppercase', textAlign: align, margin: 0 }}>
      {children}
    </h2>
  );
}

function CTA({ variant = 'blue', children = 'Claim your spot now', full = false }: { variant?: 'green' | 'blue'; children?: React.ReactNode; full?: boolean }) {
  const isGreen = variant === 'green';
  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: full ? 'block' : 'inline-block', backgroundColor: isGreen ? GREEN : BLUE, color: '#fff', fontFamily: WIDE, fontWeight: 700, fontSize: 14, letterSpacing: '1.4px', textTransform: 'uppercase', textAlign: 'center', textDecoration: 'none', padding: '15px 38px', borderRadius: isGreen ? 5 : 10 }}
    >
      {children}
    </a>
  );
}

function Tick({ size = 18 }: { size?: number }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={CHECK} alt="" style={{ width: size, height: 'auto', flexShrink: 0, marginTop: 3 }} />;
}

function Stars({ size = 18, withGoogle = false }: { size?: number; withGoogle?: boolean }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      {withGoogle && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={GOOGLE} alt="Google" style={{ width: size + 4, height: size + 4 }} />
      )}
      <span style={{ color: GREEN, fontSize: size, letterSpacing: 2, lineHeight: 1 }}>{'★'.repeat(5)}</span>
      <span style={{ color: TAUPE, fontFamily: BODY, fontSize: 14 }}>Over 200+ Reviews</span>
    </span>
  );
}

/* ============================================================ */
export default function PackagePage({ content: c }: { content: PackageContent }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [openEv, setOpenEv] = useState<number | null>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [heroMuted, setHeroMuted] = useState(true);

  const toggleHeroSound = () => {
    const v = heroVideoRef.current;
    if (!v) return;
    const next = !v.muted;
    v.muted = next;
    if (!next) {
      // unmuting: make sure it is audible and playing
      v.volume = 1;
      void v.play().catch(() => {});
    }
    setHeroMuted(next);
  };

  const body: React.CSSProperties = { color: TAUPE, fontFamily: BODY, fontSize: 15, lineHeight: 1.7, margin: 0 };
  const differenceBullets = c.differenceBullets ?? SHARED_DIFFERENCE_BULLETS;
  const commitment = c.commitment ?? SHARED_COMMITMENT;
  const whyMalta = c.whyMalta ?? SHARED_WHY_MALTA;

  return (
    <div style={{ backgroundColor: '#ffffff', fontFamily: BODY }}>
      {/* ===================== 1. HERO ===================== */}
      <section style={{ ...CONTAINER, maxWidth: 1180, paddingTop: 24, paddingBottom: 24 }}>
        <div style={{ backgroundImage: `url(${HERO_BG})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#f1f0eb', borderRadius: 28, padding: '48px 52px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 48, alignItems: 'center' }} className="fr-hero-grid">
            <div>
              <Eyebrow align="left">{c.heroEyebrow}</Eyebrow>
              <h1 style={{ color: GREEN, fontFamily: SERIF, fontWeight: 400, fontSize: 28, lineHeight: 1.4, letterSpacing: 'normal', textTransform: 'uppercase', margin: '12px 0 0' }}>
                {c.heroTitle}
              </h1>
              <div style={{ width: 300, maxWidth: '70%', height: 1, backgroundColor: '#d9d2ca', margin: '12px 0 18px' }} />
              <p style={{ color: TAUPE, fontFamily: WIDE, fontWeight: 400, fontSize: 15, letterSpacing: 'normal', margin: '0 0 16px' }}>{c.heroSubheading}</p>
              <p style={{ color: TAUPE, fontFamily: BODY, fontWeight: 400, fontSize: 14, lineHeight: 1.55, margin: '0 0 22px' }}>{c.heroDescription}</p>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {c.heroIncludes.map((it) => (
                  <li key={it} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ color: TAUPE_LT, fontSize: 18, lineHeight: 1.1, flexShrink: 0 }}>&bull;</span>
                    <span style={{ color: TAUPE, fontFamily: BODY, fontWeight: 400, fontSize: 14 }}>{it}</span>
                  </li>
                ))}
              </ul>

              <p style={{ color: TAUPE, fontFamily: WIDE, fontSize: 15, letterSpacing: 'normal', margin: '0 0 2px' }}>
                <span style={{ fontWeight: 700 }}>TOTAL VALUE:</span> {c.heroTotalValue} <span style={{ fontWeight: 700 }}>TODAY:</span> {c.heroTodayPrice}
              </p>
              {c.heroPriceNote && <p style={{ color: TAUPE, fontFamily: WIDE, fontSize: 12, letterSpacing: 'normal', textTransform: 'uppercase', margin: '0 0 20px' }}>{c.heroPriceNote}</p>}

              <div style={{ marginBottom: 16, marginTop: c.heroPriceNote ? 0 : 16 }}>
                <CTA variant="green">Claim your spot now</CTA>
              </div>
              <div style={{ marginBottom: 18 }}><Stars /></div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {c.heroFineprint.map((f) => (
                  <p key={f} style={{ color: TAUPE_LT, fontFamily: BODY, fontSize: 11, lineHeight: 1.5, margin: 0, maxWidth: 460 }}>{f}</p>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              {c.heroVideo ? (
                <div style={{ position: 'relative', width: '100%', maxWidth: 360 }}>
                  <video ref={heroVideoRef} src={c.heroVideo} poster={c.heroImage} autoPlay muted loop playsInline aria-label={c.heroSubheading}
                    style={{ width: '100%', aspectRatio: c.heroImageRatio ?? '398 / 682', objectFit: 'cover', borderRadius: 18, display: 'block', backgroundColor: '#dce6dc' }} />
                  <button
                    type="button"
                    onClick={toggleHeroSound}
                    aria-label={heroMuted ? 'Unmute video' : 'Mute video'}
                    title={heroMuted ? 'Tap to hear the doctor' : 'Mute'}
                    style={{ position: 'absolute', bottom: 12, right: 12, width: 42, height: 42, borderRadius: '50%', border: 'none', cursor: 'pointer', backgroundColor: 'rgba(40,44,40,0.55)', backdropFilter: 'blur(2px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', padding: 0 }}
                  >
                    {heroMuted ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M11 5 6 9H2v6h4l5 4z" fill="currentColor" stroke="none" />
                        <line x1="23" y1="9" x2="17" y2="15" />
                        <line x1="17" y1="9" x2="23" y2="15" />
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M11 5 6 9H2v6h4l5 4z" fill="currentColor" stroke="none" />
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                      </svg>
                    )}
                  </button>
                </div>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={c.heroImage} alt={c.heroSubheading} style={{ width: '100%', maxWidth: 360, aspectRatio: c.heroImageRatio ?? '398 / 560', objectFit: 'cover', borderRadius: 18, display: 'block' }} />
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={BADGE} alt="#1 Voted Clinic in Malta" style={{ width: 64, height: 'auto' }} />
                <span style={{ color: TAUPE, fontFamily: WIDE, fontSize: 12, letterSpacing: '1px', lineHeight: 1.3, textTransform: 'uppercase' }}>#1 Voted Clinic<br />in Malta</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== 2. SECRET ===================== */}
      <section style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div style={CONTAINER}>
          <SectionHeading>{c.secretHeading.map((l, i) => (<span key={i}>{l}{i < c.secretHeading.length - 1 && <br />}</span>))}</SectionHeading>
          <p style={{ color: TAUPE, fontFamily: WIDE, fontSize: 16, letterSpacing: '0.5px', textTransform: 'uppercase', textAlign: 'center', margin: '16px 0 0' }}>{c.secretSubheading}</p>

          <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 48, alignItems: 'center', marginTop: 40 }} className="fr-2col">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.secretImage} alt={c.secretSubheading} style={{ width: '100%', borderRadius: 16, display: 'block' }} />
            <div>
              <p style={{ ...body, marginBottom: 18 }}>{c.secretIntro}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {c.secretBullets.map((b) => (
                  <li key={b} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <Tick size={16} /><span style={{ ...body }}>{b}</span>
                  </li>
                ))}
              </ul>
              <p style={{ ...body, marginBottom: 24 }}>{c.secretClosing}</p>
              <CTA variant="blue" />
            </div>
          </div>
        </div>
      </section>

      {/* ===================== 3. PRESS ===================== */}
      <section style={{ paddingTop: 24, paddingBottom: 48 }}>
        <div style={CONTAINER}>
          <SectionHeading size={24}>malta&rsquo;s trusted clinic for<br />non surgical fat reduction</SectionHeading>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 40, marginTop: 28 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PRESS.maltaDaily} alt="Malta Daily" style={{ height: 38, width: 'auto' }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PRESS.maltaToday} alt="Malta Today" style={{ height: 34, width: 'auto' }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PRESS.lovin} alt="Lovin Malta" style={{ height: 40, width: 'auto' }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PRESS.times} alt="Times of Malta" style={{ height: 38, width: 'auto' }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PRESS.mtToday} alt="MT Today" style={{ height: 38, width: 'auto' }} />
          </div>
        </div>
      </section>

      {/* ===================== 4. BENEFITS ===================== */}
      <section style={{ paddingTop: 32, paddingBottom: 56 }}>
        <div style={{ ...CONTAINER, maxWidth: 1180 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 22 }} className="fr-benefits">
            {c.benefits.map((b) => (
              <div key={b.title} style={{ background: 'linear-gradient(150deg, #eef2ea 0%, #dfe7da 100%)', borderRadius: '22px 22px 0 22px', padding: '28px 24px 34px' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.icon} alt="" style={{ width: 52, height: 52, objectFit: 'contain', marginBottom: 18 }} />
                <h3 style={{ color: TAUPE_DK, fontFamily: WIDE, fontWeight: 700, fontSize: 15, letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 12px', lineHeight: 1.3 }}>{b.title}</h3>
                <p style={{ color: TAUPE, fontFamily: BODY, fontSize: 14, lineHeight: 1.6, margin: 0 }}>{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== 5. ELIGIBILITY ===================== */}
      <section style={{ paddingTop: 32, paddingBottom: 56 }}>
        <div style={CONTAINER}>
          <Eyebrow>{c.eligEyebrow ?? 'eligibility criteria'}</Eyebrow>
          <div style={{ width: 90, height: 1, backgroundColor: '#d9d2ca', margin: '10px auto 14px' }} />
          <SectionHeading>{c.eligHeading}</SectionHeading>

          <div style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 44, alignItems: 'center', marginTop: 36 }} className="fr-2col">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.eligImage} alt={c.eligHeading} style={{ width: '100%', borderRadius: 16, display: 'block' }} />
            <div>
              <p style={{ color: TAUPE_DK, fontFamily: WIDE, fontWeight: 700, fontSize: 15, letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 20px', lineHeight: 1.4 }}>{c.eligIntro}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {c.areas.map((a, i) => (
                  <div key={a} style={{ gridColumn: i === c.areas.length - 1 && c.areas.length % 2 === 1 ? '1 / -1' : 'auto', backgroundColor: '#eef1ec', borderRadius: 8, padding: '14px 16px', textAlign: 'center', color: TAUPE, fontFamily: WIDE, fontSize: 12.5, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{a}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== 6. DIFFERENCE ===================== */}
      <section style={{ position: 'relative', paddingTop: 48, paddingBottom: 64, overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={DIFF_BG} alt="" aria-hidden style={{ position: 'absolute', left: 0, top: '40%', width: '100%', opacity: 0.5, pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ ...CONTAINER, position: 'relative', zIndex: 1 }}>
          <Eyebrow>the carisma difference</Eyebrow>
          <div style={{ marginTop: 10 }}><SectionHeading>we are not<br />another diet clinic.</SectionHeading></div>
          <p style={{ ...body, textAlign: 'center', maxWidth: 720, margin: '18px auto 0' }}>{SHARED_DIFFERENCE_INTRO}</p>

          <div style={{ marginTop: 36, marginLeft: 'auto', marginRight: 'auto', maxWidth: 560, background: 'linear-gradient(150deg, #eef2ec 0%, #e0e8df 100%)', borderRadius: 18, padding: '34px 36px' }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {differenceBullets.map((d) => (
                <li key={d} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <Tick size={18} /><span style={{ color: TAUPE, fontFamily: WIDE, fontSize: 12.5, letterSpacing: '0.4px', textTransform: 'uppercase', lineHeight: 1.5 }}>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===================== 7. PACKAGE TREATMENTS ===================== */}
      <section style={{ paddingTop: 32, paddingBottom: 56 }}>
        <div style={CONTAINER}>
          <Eyebrow>{c.ptEyebrow}</Eyebrow>
          <div style={{ marginTop: 8 }}><SectionHeading>{c.ptHeading}</SectionHeading></div>

          <div style={{ marginTop: 36, background: 'linear-gradient(150deg, #f1f3ee 0%, #e2e9df 100%)', borderRadius: 20, padding: 36, display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 40, alignItems: 'center' }} className="fr-2col">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.ptImage} alt="Before and after" style={{ width: '100%', borderRadius: 12, display: 'block' }} />
              {c.ptImage2 && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={c.ptImage2} alt="" style={{ width: 150, height: 'auto', borderRadius: 12 }} />
              )}
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 14 }}>
                <p style={{ color: TAUPE_DK, fontFamily: WIDE, fontWeight: 700, fontSize: 15, letterSpacing: '0.5px', textTransform: 'uppercase', margin: 0 }}>{c.ptCardEyebrow}</p>
                <span style={{ color: GREEN, fontFamily: WIDE, fontSize: 11, letterSpacing: '1px', textTransform: 'uppercase', border: `1px solid ${GREEN}`, borderRadius: 20, padding: '5px 14px', whiteSpace: 'nowrap' }}>{c.ptCardTag}</span>
              </div>
              {c.ptParas.map((p) => (<p key={p} style={{ ...body, marginBottom: 14 }}>{p}</p>))}
              <p style={{ color: GREEN, fontFamily: WIDE, fontWeight: 700, fontSize: 14, letterSpacing: '0.5px', textTransform: 'uppercase', margin: '4px 0 14px' }}>{c.ptEfficacyTitle}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {c.ptEfficacyBullets.map((b) => (
                  <li key={b} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <Tick size={16} /><span style={{ ...body, fontSize: 14 }}>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== 8. DUAL / STARTER PACK ===================== */}
      <section style={{ paddingTop: 32, paddingBottom: 56 }}>
        <div style={CONTAINER}>
          <SectionHeading>{c.dualHeading.map((l, i) => (<span key={i}>{l}{i < c.dualHeading.length - 1 && <br />}</span>))}</SectionHeading>

          <div style={{ marginTop: 36, background: 'linear-gradient(150deg, #eef1ea 0%, #e7ece2 100%)', borderRadius: 22, padding: 22, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }} className="fr-2col">
            <div style={{ backgroundColor: '#fff', borderRadius: 16, padding: '34px 30px', display: 'flex', flexDirection: 'column', gap: 26, justifyContent: 'center' }}>
              {c.dualMini.map((m) => (
                <div key={m.title} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <span style={{ flexShrink: 0, width: 54, height: 54, border: '1px solid #d7dcd4', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={m.icon} alt="" style={{ width: 24, height: 24, objectFit: 'contain' }} />
                  </span>
                  <div>
                    <p style={{ color: GREEN, fontFamily: WIDE, fontWeight: 700, fontSize: 13, letterSpacing: '0.5px', textTransform: 'uppercase', margin: '4px 0 6px' }}>{m.title}</p>
                    <p style={{ color: TAUPE, fontFamily: BODY, fontSize: 14, lineHeight: 1.55, margin: 0 }}>{m.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ backgroundColor: '#fff', borderRadius: 16, padding: '30px 30px' }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 22px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {c.dualIncludes.map((it) => (
                  <li key={it} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: TAUPE, fontFamily: BODY, fontSize: 14.5 }}>
                    <span style={{ color: TAUPE_LT, lineHeight: 1.2 }}>&bull;</span><span>{it}</span>
                  </li>
                ))}
              </ul>
              <div style={{ background: 'linear-gradient(150deg, #eef2ea 0%, #dfe8db 100%)', borderRadius: 12, padding: '18px 20px' }}>
                <p style={{ color: TAUPE_DK, fontFamily: WIDE, fontWeight: 700, fontSize: 15, letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 12px' }}>
                  TOTAL VALUE: {c.dualTotalValue} TODAY: <span style={{ color: GREEN }}>{c.dualTodayPrice}</span>
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 16 }}>
                  {c.dualFineprint.map((f) => (<p key={f} style={{ color: TAUPE_LT, fontFamily: BODY, fontSize: 11, lineHeight: 1.5, margin: 0 }}>{f}</p>))}
                </div>
                <div style={{ marginBottom: 14 }}><CTA variant="blue" full>Claim your spot now</CTA></div>
                <Stars withGoogle />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== 9. WELLNESS CHAIN + MAP ===================== */}
      <section style={{ ...CONTAINER, maxWidth: 1120, paddingTop: 40, paddingBottom: 56 }}>
        <div style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(160deg, #f5f2ec 0%, #e7ece2 100%)', borderRadius: 24, padding: '48px 48px 44px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={WELL_BG} alt="" aria-hidden style={{ position: 'absolute', left: '50%', top: '46%', transform: 'translate(-50%, -50%)', width: 560, opacity: 0.28, pointerEvents: 'none', zIndex: 0 }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>the carisma difference</Eyebrow>
            <div style={{ width: 90, height: 1, backgroundColor: '#d9d2ca', margin: '10px auto 16px' }} />
            <SectionHeading>malta&rsquo;s #1 leading wellness chain</SectionHeading>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginTop: 40, alignItems: 'start' }} className="fr-2col">
              <div>
                <h3 style={{ color: TAUPE_DK, fontFamily: WIDE, fontWeight: 700, fontSize: 15, letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 18px' }}>our commitment</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 30px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {commitment.map((x) => (<li key={x} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: TAUPE, fontFamily: BODY, fontSize: 14.5, lineHeight: 1.55 }}><span style={{ color: TAUPE_LT }}>&bull;</span><span>{x}</span></li>))}
                </ul>
                <h3 style={{ color: TAUPE_DK, fontFamily: WIDE, fontWeight: 700, fontSize: 15, letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 18px' }}>why malta chooses carisma</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {whyMalta.map((x) => (<li key={x} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: TAUPE, fontFamily: BODY, fontSize: 14.5, lineHeight: 1.55 }}><span style={{ color: TAUPE_LT }}>&bull;</span><span>{x}</span></li>))}
                </ul>
              </div>
              <div style={{ borderRadius: 14, overflow: 'hidden', boxShadow: '0 8px 26px rgba(120,114,104,0.18)' }}>
                <iframe title={`${c.id} clinic location in Malta`} src={`https://www.google.com/maps?q=${encodeURIComponent(c.mapQuery)}&output=embed`} width="100%" height="360" loading="lazy" referrerPolicy="no-referrer-when-downgrade" style={{ border: 0, display: 'block' }} />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, marginTop: 40, flexWrap: 'wrap' }}>
              <CTA variant="blue" />
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: TAUPE, fontFamily: WIDE, fontSize: 13, letterSpacing: '1px', textTransform: 'uppercase' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={PARKING} alt="" style={{ width: 22, height: 'auto' }} />
                Complimentary on-site parking
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== 10. FAQ ===================== */}
      <section style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div style={{ ...CONTAINER, maxWidth: 900 }}>
          <SectionHeading size={24}>Frequently asked questions</SectionHeading>
          <div style={{ marginTop: 36 }}>
            {c.faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} style={{ borderBottom: '1px solid #e6e1da' }}>
                  <button onClick={() => setOpenFaq(open ? null : i)} style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '20px 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, textAlign: 'left' }}>
                    <span style={{ color: open ? GREEN : TAUPE_DK, fontFamily: WIDE, fontSize: 14, letterSpacing: '0.5px', textTransform: 'uppercase', lineHeight: 1.4 }}>{f.q}</span>
                    <span style={{ color: TAUPE_LT, fontSize: 18, flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>&#8964;</span>
                  </button>
                  {open && <p style={{ ...body, padding: '0 4px 22px', maxWidth: 760 }}>{f.a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== 11. EVIDENCE ===================== */}
      <section style={{ paddingTop: 32, paddingBottom: 64 }}>
        <div style={{ ...CONTAINER, maxWidth: 1100 }}>
          <Eyebrow>{c.evidenceEyebrow}</Eyebrow>
          <div style={{ marginTop: 8 }}><SectionHeading size={25}>evidence based approach</SectionHeading></div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, marginTop: 40 }} className="fr-evgrid">
            {c.evidence.map((e, i) => {
              const open = openEv === i;
              const centerLast = i === c.evidence.length - 1 && c.evidence.length % 2 === 1;
              return (
                <div key={e.title} style={{ backgroundColor: '#f7f5f1', borderRadius: 16, overflow: 'hidden', gridColumn: centerLast ? '1 / -1' : 'auto', maxWidth: centerLast ? 540 : undefined, justifySelf: centerLast ? 'center' : 'stretch', width: centerLast ? '100%' : undefined }}>
                  <div style={{ position: 'relative' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={e.img} alt="" style={{ width: '100%', height: 168, objectFit: 'cover', display: 'block' }} />
                    <span style={{ position: 'absolute', top: 12, left: 12, backgroundColor: 'rgba(255,255,255,0.92)', color: TAUPE_DK, fontFamily: WIDE, fontSize: 10.5, letterSpacing: '0.5px', textTransform: 'uppercase', padding: '5px 12px', borderRadius: 20 }}>{e.tag}</span>
                  </div>
                  <div style={{ padding: '24px 26px 28px' }}>
                    <h3 style={{ color: GREEN, fontFamily: SERIF, fontWeight: 400, fontSize: 17, lineHeight: 1.35, letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 16px' }}>{e.title}</h3>
                    <p style={{ color: TAUPE_DK, fontFamily: WIDE, fontWeight: 700, fontSize: 12, letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 8px' }}>What it does</p>
                    <p style={{ ...body, fontSize: 14, marginBottom: 16 }}>{e.does}</p>
                    {open && (
                      <>
                        <p style={{ color: TAUPE_DK, fontFamily: WIDE, fontWeight: 700, fontSize: 12, letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 8px' }}>Key results</p>
                        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                          {e.results.map((r) => (<li key={r} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}><span style={{ color: TAUPE_LT }}>&bull;</span><span style={{ ...body, fontSize: 13.5 }}>{r}</span></li>))}
                        </ul>
                        <p style={{ color: TAUPE_LT, fontFamily: BODY, fontSize: 12.5, lineHeight: 1.6, margin: 0 }}>{e.foot}</p>
                      </>
                    )}
                    <button onClick={() => setOpenEv(open ? null : i)} style={{ marginTop: 14, background: 'none', border: 'none', cursor: 'pointer', color: GREEN, fontFamily: WIDE, fontSize: 12.5, letterSpacing: '0.5px', textTransform: 'uppercase', padding: 0 }}>{open ? 'Read less' : 'Read more'}</button>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 44 }}><CTA variant="blue">Claim my spot now</CTA></div>
        </div>
      </section>

      <style>{`
        @media (max-width: 860px) {
          .fr-hero-grid, .fr-2col, .fr-benefits, .fr-evgrid { grid-template-columns: 1fr !important; }
          .fr-evgrid > div { grid-column: auto !important; }
        }
        @media (max-width: 560px) { .fr-benefits { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
