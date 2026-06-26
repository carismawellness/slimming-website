import Image from 'next/image';
import type { Metadata } from 'next';
import Link from 'next/link';
import HeroMotif from '@/components/HeroMotif';

export const metadata: Metadata = {
  title: "Join the Team at Carisma Slimming | #1 Award Winning Chain",
  description: "Join the team at Carisma Slimming, Malta's #1 award-winning wellness chain. We offer top-quality slimming treatments and an exciting career in 5-star hotels.",
  alternates: { canonical: 'https://www.carismaslimming.com/careers' },
  openGraph: {
    title: "Join the Team at Carisma Slimming | #1 Award Winning Chain",
    description: "Join the team at Carisma Slimming, Malta's #1 award-winning wellness chain. We offer top-quality slimming treatments and an exciting career in 5-star hotels.",
    url: 'https://www.carismaslimming.com/careers',
    images: [{ url: '/background.avif', width: 1200, height: 630, alt: 'Careers at Carisma Slimming Malta' }],
  },
};

const HEADING = 'Trajan Pro, serif';
const WIDE = '"Novecento Wide", "Novecento Wide Book", sans-serif';
const BODY = 'Roboto, sans-serif';

// Locked accessible tokens (DESIGN_LANGUAGE §1)
const HEAD_SAGE = '#3c5a40'; // section headings (H2/H3)
const SAGE = '#4f7256';      // buttons, links, icons, eyebrows
const BODY_TEXT = '#333333';
const SECONDARY = '#595959';
const RULE = '#4f7256';

const REQUIREMENTS = [
  'Want to work in the best 5 star hotels',
  'Are hard working and motivated',
  'Ambitions of high earnings',
  'Fluent in multiple languages (English, German, French, Italian, Russian, etc.)',
];

export default function CareersPage() {
  return (
    <main className="w-full overflow-x-hidden">
      {/* ── HERO — bespoke, with animated HeroMotif behind the copy ───────── */}
      <section
        className="relative"
        style={{
          position: 'relative',
          overflow: 'hidden',
          paddingTop: 'clamp(120px, 16vh, 168px)',
          paddingBottom: 'clamp(48px, 8vh, 96px)',
          // Hero radial sage wash → flows into the white section below
          background:
            'radial-gradient(120% 90% at 85% 10%, #eef3ea 0%, #f6f4ef 45%, #ffffff 100%)',
        }}
      >
        {/* soft brand glow bed (decorative) */}
        <span
          aria-hidden
          style={{
            position: 'absolute',
            top: '-12%',
            right: '-8%',
            width: 460,
            height: 460,
            borderRadius: '50%',
            background: 'rgba(142,176,147,0.28)',
            filter: 'blur(90px)',
            zIndex: 0,
          }}
        />

        {/* animated constellation motif (reduced-motion-safe, aria-hidden) */}
        <HeroMotif />

        <div className="relative" style={{ zIndex: 1 }}>
          {/* eyebrow */}
          <p
            className="text-center"
            style={{
              fontFamily: WIDE,
              fontSize: 12,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: SAGE,
              margin: '0 0 18px',
            }}
          >
            Careers at Carisma Slimming
          </p>

          <div className="px-4">
            <h1
              className="text-center mx-auto"
              style={{
                color: SAGE,
                fontFamily: HEADING,
                fontWeight: 400,
                fontSize: 'clamp(26px, 3vw, 35px)',
                lineHeight: 1.25,
                textTransform: 'uppercase',
                maxWidth: '760px',
              }}
            >
              CAREERS IN MALTA — JOIN CARISMA SLIMMING&apos;S #1 WEIGHT LOSS CLINIC TEAM
            </h1>
          </div>

          {/* 64px centered rule */}
          <div
            className="mx-auto"
            style={{ width: '64px', height: '1px', backgroundColor: RULE, margin: '24px auto' }}
          />

          {/* Photo in a soft, rounded card with subtle shadow */}
          <div className="relative px-4" style={{ marginTop: '40px' }}>
            <Image
              src="/wix/eac6309c7e924921acd0cd838be3c271.jpg"
              alt="Beautician"
              width={1500}
              height={1000}
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 735px"
              className="relative mx-auto w-full object-cover"
              style={{
                maxWidth: '735px',
                aspectRatio: '3 / 2',
                borderRadius: '20px',
                boxShadow: '0 30px 70px -28px rgba(40,55,44,.45)',
                height: 'auto',
              }}
            />
          </div>

          {/* Caption / intro line */}
          <div className="px-4">
            <p
              className="mx-auto text-center"
              style={{
                color: SECONDARY,
                fontFamily: BODY,
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: 1.6,
                maxWidth: '620px',
                marginTop: '32px',
              }}
            >
              Our company is growing fast, and we are always on the look out for ambitious and talented people.
            </p>
          </div>
        </div>
      </section>

      {/* ── ROLES + APPLY — white, flowing on from the hero's white end ───── */}
      <section
        style={{
          paddingTop: 'clamp(40px, 6vh, 72px)',
          paddingBottom: 'clamp(56px, 9vh, 104px)',
          background: '#ffffff',
        }}
      >
        <div className="mx-auto px-4" style={{ maxWidth: '1080px' }}>
          {/* Section header pattern */}
          <div className="text-center mx-auto" style={{ maxWidth: '720px', marginBottom: '48px' }}>
            <p
              style={{
                fontFamily: WIDE,
                fontSize: 12,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: SAGE,
                margin: 0,
              }}
            >
              Who we&apos;re hiring
            </p>
            <div
              className="mx-auto"
              style={{ width: '64px', height: '1px', backgroundColor: RULE, margin: '18px auto' }}
            />
            <h2
              style={{
                color: HEAD_SAGE,
                fontFamily: HEADING,
                fontWeight: 400,
                fontSize: 'clamp(24px, 3.4vw, 34px)',
                lineHeight: 1.25,
                textTransform: 'uppercase',
              }}
            >
              Wellness &amp; Healthcare Professionals We&apos;re Hiring For
            </h2>
          </div>

          {/* Two-column: photo + light requirements card */}
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            {/* Handshake photo — soft rounded with shadow */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/wix/f940f0_b93ac2a5ad5a4d148afac21f35018a88~mv2.webp"
              alt="Handshake"
              loading="lazy"
              className="w-full object-cover"
              style={{
                borderRadius: '20px',
                aspectRatio: '3 / 2',
                boxShadow: '0 10px 30px rgba(60,90,64,.10)',
              }}
            />

            {/* Light on-brand requirements card */}
            <div
              style={{
                background: 'linear-gradient(180deg,#F2F6EF,#ffffff)',
                border: '1px solid #EAE4DB',
                borderRadius: '20px',
                padding: 'clamp(28px, 4vw, 40px)',
                boxShadow: '0 10px 30px rgba(60,90,64,.10)',
              }}
            >
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '20px' }}>
                {REQUIREMENTS.map((line, i) => (
                  <li key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <span
                      aria-hidden
                      style={{
                        flexShrink: 0,
                        width: 26,
                        height: 26,
                        borderRadius: '50%',
                        background: 'rgba(142,176,147,0.20)',
                        display: 'grid',
                        placeItems: 'center',
                        marginTop: 2,
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M5 13l4 4L19 7" stroke={SAGE} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span
                      style={{
                        fontFamily: BODY,
                        fontSize: '16px',
                        lineHeight: 1.6,
                        color: BODY_TEXT,
                      }}
                    >
                      {line}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* APPLY NOW — .cta-glow primary CTA (links to /consultation) */}
          <div className="flex justify-center" style={{ marginTop: 'clamp(48px, 7vh, 72px)' }}>
            <Link href="/consultation" className="cta-glow">
              <span
                style={{
                  display: 'inline-block',
                  padding: '16px 40px',
                  fontFamily: WIDE,
                  fontWeight: 700,
                  fontSize: '13px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#fff',
                }}
              >
                Apply Now
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
