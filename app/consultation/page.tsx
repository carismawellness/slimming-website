import type { Metadata } from 'next';
import Image from 'next/image';
import BookConsultationButton from '@/components/BookConsultationButton';
import GradientField from '@/components/layers/GradientField';
import HeroMotif from '@/components/HeroMotif';
import DoctorCards from './_components/DoctorCards';

export const metadata: Metadata = {
  title: "Free Body Composition Analysis Malta | Carisma Slimming",
  description: "Book your free body composition analysis with our medically qualified doctors in Malta. Get a personalised weight loss plan and start your journey today.",
  alternates: { canonical: 'https://www.carismaslimming.com/consultation' },
  openGraph: {
    title: "Free Body Composition Analysis Malta | Carisma Slimming",
    description: "Book your free body composition analysis with our medically qualified doctors in Malta. Get a personalised weight loss plan and start your journey today.",
    url: 'https://www.carismaslimming.com/consultation',
    images: [{ url: '/background.avif', width: 1200, height: 630, alt: 'Free Body Composition Analysis Malta — Carisma Slimming' }],
  },
};

// Accessible brand palette (locked):
//  deep sage  #4f7256 (5.42:1 on white) — headings / icons / CTA fills, white text
//  taupe      #6f6456 (5.78:1 on white) — body / eyebrow text
//  ink-taupe  #5a5043 — bold body emphasis
//  gold-text  #8c6d18 — small accent (stars)
//  bright sage #8EB093 — DECORATIVE ONLY (never as text on light)
const HEADING = 'Trajan Pro, serif';
const WIDE = '"Novecento Wide", "Novecento Wide Book", sans-serif';
const BODY = 'Roboto, sans-serif';
const SAGE = '#4f7256';
const TAUPE = '#6f6456';
const INK = '#5a5043';

const HERO_IMG = '/wix/87fc13_16e7dbed_consult_668x724.jpg';

/* Shared little star row (gold, decorative). */
function Stars({ size = 14 }: { size?: number }) {
  return (
    <span style={{ display: 'inline-flex', gap: 1, color: '#caa44a' }} aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

function Check() {
  return (
    <span
      aria-hidden
      style={{
        flexShrink: 0,
        width: 20,
        height: 20,
        borderRadius: '50%',
        background: 'rgba(142,176,147,0.20)',
        display: 'grid',
        placeItems: 'center',
        marginTop: 1,
      }}
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
        <path d="M5 13l4 4L19 7" stroke={SAGE} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/* Section-header rule — 64px sage hairline, centered (design-language §4). */
function Rule() {
  return <span aria-hidden style={{ display: 'block', width: 64, height: 1, background: SAGE, margin: '18px auto' }} />;
}

const TRUST = [
  { t: 'Medically qualified doctors', d: 'Doctor-led, not a salon diet' },
  { t: 'Free Tanita body analysis', d: 'See your full body composition' },
  { t: 'No obligation', d: 'An honest plan, zero pressure' },
  { t: 'Limited places monthly', d: 'We only take who we can help' },
];

const STEPS = [
  {
    n: '01',
    t: 'Book your free body composition analysis',
    d: 'Pick a time that suits you. It takes under a minute and there is no obligation — just bring your goals and any questions.',
  },
  {
    n: '02',
    t: 'Meet your doctor + Tanita body analysis',
    d: 'A medically qualified doctor reviews your history and goals, and a Tanita scan reveals your body composition — fat, muscle, water and metabolic age.',
  },
  {
    n: '03',
    t: 'Your personalised plan',
    d: 'You leave with a clear, realistic plan built around your body and lifestyle — including whether medical weight loss support is right for you.',
  },
];

const PROOF_QUOTES = [
  {
    name: 'Alison Zammit',
    initial: 'A',
    text: 'Dr. Francesca is simply amazing — a professional doctor who put me completely at ease and explained every step.',
  },
  {
    name: 'Melanie Vella',
    initial: 'M',
    text: 'The staff were welcoming and the doctor was attentive and explained everything clearly. They clearly care about their clients.',
  },
  {
    name: 'Ronnalie Parungao',
    initial: 'R',
    text: 'Your honesty in suggesting the right option made me feel secure. I left far more informed and confident moving forward.',
  },
];

export default function ConsultationPage() {
  return (
    <main className="w-full" style={{ color: TAUPE }}>
      {/* Skip-to-main-content link — WCAG 2.4.1 */}
      <a
        href="#consultation-main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold focus:text-white focus:outline-none"
        style={{ background: SAGE }}
      >
        Skip to main content
      </a>

      <div id="consultation-main">
        {/* ════════════════ 1 · HERO (form-first, modal CTA) ════════════════ */}
        <section
          className="page-hero"
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            minHeight: '92svh',
            paddingTop: 'clamp(104px, 13vh, 132px)',
            paddingBottom: 'clamp(28px, 5vh, 56px)',
            paddingLeft: 'clamp(16px, 4vw, 40px)',
            paddingRight: 'clamp(16px, 4vw, 40px)',
            overflow: 'hidden',
            background: 'radial-gradient(120% 90% at 85% 10%, #eef3ea 0%, #f6f4ef 45%, #ffffff 100%)',
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

          {/* animated sage constellation motif (brand signature, reduced-motion-safe) */}
          <HeroMotif />

          <div
            className="consult-hero-grid"
            style={{
              position: 'relative',
              zIndex: 1,
              width: '100%',
              maxWidth: 1180,
              margin: '0 auto',
              display: 'grid',
              gap: 'clamp(28px, 4vw, 56px)',
              alignItems: 'center',
            }}
          >
            {/* LEFT — message + modal CTA */}
            <div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 18 }}>
                <span className="hero-pill">
                  <Stars size={13} />
                  <span style={{ fontFamily: WIDE, fontSize: 10.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: SAGE }}>
                    4.9 · 800+ reviews
                  </span>
                </span>
                <span className="hero-pill">
                  <span style={{ fontFamily: WIDE, fontSize: 10.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: TAUPE }}>
                    #1 voted slimming clinic Malta
                  </span>
                </span>
              </div>

              <p style={{ fontFamily: WIDE, fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', color: TAUPE, margin: '0 0 14px' }}>
                Free · Doctor-led · No obligation
              </p>

              <h1
                style={{
                  fontFamily: HEADING,
                  fontWeight: 400,
                  fontSize: 'clamp(26px, 3vw, 38px)',
                  lineHeight: 1.12,
                  textTransform: 'uppercase',
                  color: SAGE,
                  margin: '0 0 18px',
                  maxWidth: 640,
                }}
              >
                <span style={{ display: 'block' }}>Free Doctor-Led Weight Loss</span>
                <span style={{ display: 'block', color: '#7ba587' }}>Consultation in Malta</span>
              </h1>

              <p style={{ fontFamily: BODY, fontSize: 'clamp(14px, 1.1vw, 15.5px)', lineHeight: 1.6, color: TAUPE, maxWidth: 520, margin: '0 0 22px' }}>
                Meet a medically qualified doctor, get a free Tanita body composition analysis, and leave with a
                personalised slimming plan built around your body, your health history and your lifestyle.
              </p>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 26px', display: 'grid', gap: 9, maxWidth: 540 }}>
                {[
                  'Doctor-led medical weight loss assessment — not a salon diet',
                  'Free Tanita body composition scan: fat, muscle, metabolic age',
                  'A clear, realistic plan — and zero obligation to continue',
                ].map((b) => (
                  <li key={b} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <Check />
                    <span style={{ fontFamily: BODY, fontSize: 13.5, color: TAUPE, lineHeight: 1.5 }}>{b}</span>
                  </li>
                ))}
              </ul>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', marginBottom: 18 }}>
                <BookConsultationButton variant="filled" style={{ padding: '16px 34px' }}>
                  Book Your Free Body Analysis
                </BookConsultationButton>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <Stars size={14} />
                <span style={{ fontFamily: BODY, fontSize: 13, color: TAUPE }}>
                  <strong style={{ color: SAGE }}>4.9</strong> · 800+ verified reviews
                </span>
                <span aria-hidden style={{ width: 1, height: 14, background: '#d9d2ca' }} />
                <span style={{ fontFamily: BODY, fontSize: 13, color: TAUPE }}>Limited places each month</span>
              </div>
            </div>

            {/* RIGHT — arch media + floating proof cards */}
            <div className="consult-hero-media" style={{ position: 'relative', justifySelf: 'center', width: '100%', display: 'flex', justifyContent: 'center' }}>
              <div
                className="hero-arch"
                style={{
                  position: 'relative',
                  height: 'min(58vh, 520px)',
                  aspectRatio: '4 / 5',
                  maxWidth: '100%',
                  overflow: 'hidden',
                  borderRadius: '210px 210px 22px 22px',
                  boxShadow: '0 30px 70px -28px rgba(40,55,44,0.45)',
                }}
              >
                <Image
                  src={HERO_IMG}
                  alt="A Carisma Slimming doctor consulting a client during a free body analysis in Malta"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 900px) 90vw, 420px"
                />
                {/* light sage wash (on-brand, replaces dark photo overlay) */}
                <span
                  aria-hidden
                  style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    background: 'linear-gradient(to top, rgba(79,114,86,0.18) 0%, rgba(79,114,86,0.04) 34%, transparent 60%)',
                  }}
                />
              </div>

              {/* floating: rating card */}
              <div
                className="hero-glass hero-float"
                style={{ position: 'absolute', left: 'clamp(-8px, -1vw, 0px)', bottom: '14%', borderRadius: 16, padding: '11px 15px', display: 'flex', alignItems: 'center', gap: 10, zIndex: 3 }}
              >
                <span style={{ fontFamily: HEADING, fontSize: 28, color: SAGE, lineHeight: 1 }}>4.9</span>
                <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Stars size={11} />
                  <span style={{ fontFamily: BODY, fontSize: 10.5, color: TAUPE }}>800+ reviews</span>
                </span>
              </div>

              {/* floating: award card */}
              <div
                className="hero-glass hero-float-2"
                style={{ position: 'absolute', right: 'clamp(-6px, -0.5vw, 4px)', top: '8%', borderRadius: 16, padding: '10px 13px', display: 'flex', alignItems: 'center', gap: 9, maxWidth: 190, zIndex: 3 }}
              >
                <Image src="/Malta.png" alt="" aria-hidden width={34} height={34} style={{ height: 34, width: 'auto' }} />
                <span style={{ fontFamily: WIDE, fontSize: 9.5, letterSpacing: '0.06em', textTransform: 'uppercase', color: SAGE, lineHeight: 1.35, whiteSpace: 'pre-line' }}>
                  {'#1 voted clinic\nMalta 2025–26'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════ 2 · TRUST STRIP ════════════════ */}
        <section aria-label="Why book with Carisma Slimming" style={{ backgroundColor: '#ffffff', paddingTop: 8 }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg-raised" style={{ padding: 'clamp(18px, 3vw, 26px)' }}>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ listStyle: 'none', margin: 0, padding: 0, gap: 'clamp(16px, 2.5vw, 28px)' }}>
                {TRUST.map((c) => (
                  <li key={c.t} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <Check />
                    <span>
                      <span style={{ display: 'block', fontFamily: WIDE, fontSize: 12, letterSpacing: '0.05em', textTransform: 'uppercase', color: SAGE }}>
                        {c.t}
                      </span>
                      <span style={{ display: 'block', fontFamily: BODY, fontSize: 13, color: TAUPE, marginTop: 3 }}>{c.d}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ════════════════ 3 · WHAT HAPPENS NEXT (3-step) ════════════════ */}
        <GradientField
          dots
          className="relative"
          style={{
            backgroundImage: 'linear-gradient(180deg, #FFFFFF 0%, rgba(201, 216, 193, 0.18) 100%)',
            backgroundColor: '#FFFFFF',
            paddingTop: 'clamp(64px, 9vw, 96px)',
            paddingBottom: 'clamp(64px, 9vw, 96px)',
          }}
        >
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" style={{ zIndex: 1 }}>
            <header className="text-center" style={{ marginBottom: 'clamp(36px, 5vw, 56px)' }}>
              <p style={{ fontFamily: WIDE, fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', color: TAUPE, marginBottom: 12 }}>
                Simple &amp; reassuring
              </p>
              <Rule />
              <h2 style={{ fontFamily: HEADING, fontWeight: 400, fontSize: 'clamp(24px, 3.2vw, 34px)', textTransform: 'uppercase', color: '#3c5a40', lineHeight: 1.15 }}>
                What Happens at Your Consultation
              </h2>
            </header>

            <ol className="grid grid-cols-1 md:grid-cols-3" style={{ listStyle: 'none', margin: 0, padding: 0, gap: 'clamp(20px, 2.5vw, 28px)' }}>
              {STEPS.map((s) => (
                <li key={s.n} className="card" style={{ padding: 'clamp(24px, 3vw, 32px)', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <span
                    aria-hidden
                    style={{
                      fontFamily: HEADING,
                      fontSize: 30,
                      color: '#fff',
                      lineHeight: 1,
                      width: 56,
                      height: 56,
                      borderRadius: 999,
                      display: 'grid',
                      placeItems: 'center',
                      background: SAGE,
                      boxShadow: '0 8px 20px -8px rgba(40,55,44,0.5)',
                    }}
                  >
                    {s.n}
                  </span>
                  <h3 style={{ fontFamily: HEADING, fontWeight: 400, fontSize: 18, color: SAGE, lineHeight: 1.25 }}>{s.t}</h3>
                  <p style={{ fontFamily: BODY, fontSize: 14, lineHeight: 1.65, color: TAUPE }}>{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </GradientField>

        {/* ════════════════ 4 · MEET YOUR DOCTORS ════════════════ */}
        {/* starts at section 3's end tint, settles to white → continuous flow */}
        <section aria-labelledby="doctors-heading" style={{ backgroundImage: 'linear-gradient(180deg, rgba(201, 216, 193, 0.18) 0%, #FFFFFF 28%)', backgroundColor: '#ffffff', paddingTop: 'clamp(64px, 9vw, 96px)', paddingBottom: 'clamp(48px, 7vw, 80px)' }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="text-center" style={{ marginBottom: 'clamp(36px, 5vw, 56px)' }}>
              <p style={{ fontFamily: WIDE, fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', color: TAUPE, marginBottom: 12 }}>
                Your medical team
              </p>
              <Rule />
              <h2 id="doctors-heading" style={{ fontFamily: HEADING, fontWeight: 400, fontSize: 'clamp(24px, 3.2vw, 34px)', textTransform: 'uppercase', color: '#3c5a40', lineHeight: 1.15 }}>
                Meet the Doctors Behind Your Plan
              </h2>
              <p style={{ fontFamily: BODY, fontSize: 15, lineHeight: 1.6, color: TAUPE, maxWidth: 600, margin: '14px auto 0' }}>
                Your free body composition analysis is led by medically qualified doctors who listen first and build a conservative,
                evidence-led plan around you.
              </p>
            </header>
            <DoctorCards />
          </div>
        </section>

        {/* ════════════════ 5 · PROOF BAND ════════════════ */}
        {/* settles from white toward section 6's sage-tinted top → continuous flow */}
        <section aria-labelledby="proof-heading" style={{ backgroundImage: 'linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 60%, rgba(201, 216, 193, 0.22) 100%)', backgroundColor: '#ffffff', paddingBottom: 'clamp(64px, 9vw, 96px)' }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg-glass lg-glass--panel" style={{ padding: 'clamp(28px, 4vw, 48px)' }}>
              <header className="text-center" style={{ marginBottom: 'clamp(28px, 4vw, 40px)' }}>
                <div className="flex items-center justify-center" style={{ gap: 10, marginBottom: 10 }}>
                  <Stars size={20} />
                  <span style={{ fontFamily: HEADING, fontSize: 26, color: SAGE, lineHeight: 1 }}>4.9</span>
                </div>
                <h2 id="proof-heading" style={{ fontFamily: WIDE, fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase', color: TAUPE }}>
                  Loved by 800+ clients across Malta
                </h2>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 'clamp(18px, 2.5vw, 26px)' }}>
                {PROOF_QUOTES.map((q) => (
                  <figure key={q.name} className="card" style={{ padding: 'clamp(20px, 2.5vw, 26px)', margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <Stars size={13} />
                    <blockquote style={{ margin: 0, fontFamily: BODY, fontSize: 14, lineHeight: 1.65, color: INK }}>
                      &ldquo;{q.text}&rdquo;
                    </blockquote>
                    <figcaption className="flex items-center" style={{ gap: 10, marginTop: 'auto' }}>
                      <span
                        aria-hidden
                        style={{ width: 36, height: 36, borderRadius: 999, background: 'rgba(142,176,147,0.20)', color: SAGE, display: 'grid', placeItems: 'center', fontFamily: HEADING, fontSize: 16 }}
                      >
                        {q.initial}
                      </span>
                      <span style={{ fontFamily: WIDE, fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: TAUPE }}>
                        {q.name}
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════ 6 · FINAL CTA BAND ════════════════ */}
        <GradientField
          blob={{ top: '8%', right: '-6%' }}
          dots
          className="relative"
          style={{
            backgroundImage: 'linear-gradient(180deg, rgba(201, 216, 193, 0.22) 0%, #FFFFFF 100%)',
            backgroundColor: '#FFFFFF',
            paddingTop: 'clamp(72px, 10vw, 110px)',
            paddingBottom: 'clamp(72px, 10vw, 110px)',
          }}
        >
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center" style={{ zIndex: 1 }}>
            <p style={{ fontFamily: WIDE, fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', color: TAUPE, marginBottom: 14 }}>
              Free · Doctor-led · No obligation
            </p>
            <Rule />
            <h2 style={{ fontFamily: HEADING, fontWeight: 400, fontSize: 'clamp(26px, 3.6vw, 40px)', textTransform: 'uppercase', color: '#3c5a40', lineHeight: 1.12, marginBottom: 18 }}>
              Your Healthier Weight Starts With One Conversation
            </h2>
            <p style={{ fontFamily: BODY, fontSize: 16, lineHeight: 1.6, color: TAUPE, maxWidth: 560, margin: '0 auto 30px' }}>
              Book your free body composition analysis today, meet your doctor, and get the honest, personalised plan you deserve.
            </p>
            <div className="flex justify-center">
              <BookConsultationButton variant="filled" style={{ padding: '17px 40px' }}>
                Book Your Free Body Analysis
              </BookConsultationButton>
            </div>
            <p style={{ fontFamily: BODY, fontSize: 13, color: TAUPE, opacity: 0.85, marginTop: 16 }}>
              ★ 4.9 from 800+ reviews · Limited places each month
            </p>
          </div>
        </GradientField>

        {/* ════════════════ 7 · PRACTICAL (compact, secondary) ════════════════ */}
        <section aria-labelledby="visit-heading" style={{ backgroundColor: '#ffffff', paddingTop: 'clamp(56px, 8vw, 88px)', paddingBottom: 'clamp(56px, 8vw, 88px)' }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="visit-heading" className="text-center" style={{ fontFamily: HEADING, fontWeight: 400, fontSize: 'clamp(20px, 2.6vw, 28px)', letterSpacing: '0.04em', textTransform: 'uppercase', color: SAGE, marginBottom: 'clamp(28px, 4vw, 40px)' }}>
              Visit &amp; Contact
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 'clamp(20px, 3vw, 32px)', alignItems: 'stretch' }}>
              {/* details card */}
              <div className="card" style={{ padding: 'clamp(24px, 3vw, 34px)', display: 'flex', flexDirection: 'column', gap: 22 }}>
                <div>
                  <p style={{ fontFamily: WIDE, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: TAUPE, marginBottom: 6 }}>
                    Opening hours
                  </p>
                  <p style={{ fontFamily: BODY, fontSize: 15, color: INK }}>
                    Monday – Sunday · <strong style={{ color: SAGE }}>8:00 – 20:00</strong>
                  </p>
                </div>

                <div>
                  <p style={{ fontFamily: WIDE, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: TAUPE, marginBottom: 6 }}>
                    Email
                  </p>
                  <a
                    href="mailto:info@carismaslimming.com"
                    className="link-underline transition duration-300 ease-in-out hover:no-underline"
                    style={{ fontFamily: BODY, fontSize: 15, color: SAGE }}
                  >
                    info@carismaslimming.com
                  </a>
                </div>

                <div>
                  <p style={{ fontFamily: WIDE, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: TAUPE, marginBottom: 10 }}>
                    Follow us
                  </p>
                  <div className="flex items-center" style={{ gap: 16 }}>
                    <a
                      href="https://www.instagram.com/carismaaesthetics/?hl=en"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Carisma Slimming on Instagram"
                      className="inline-flex items-center transition duration-300 ease-in-out hover:opacity-80"
                      style={{ color: SAGE, gap: 8, fontFamily: BODY, fontSize: 14 }}
                    >
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                        <rect x="2" y="2" width="20" height="20" rx="5" />
                        <circle cx="12" cy="12" r="4" />
                        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                      </svg>
                      carismaslimming
                    </a>
                    <a
                      href="https://www.facebook.com/carismaaesthetics/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Carisma Slimming on Facebook"
                      className="inline-flex items-center transition duration-300 ease-in-out hover:opacity-80"
                      style={{ color: SAGE, gap: 8, fontFamily: BODY, fontSize: 14 }}
                    >
                      <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden>
                        <circle cx="12" cy="12" r="12" fill="currentColor" />
                        <path fill="#FFFFFF" d="M13.5 23v-9h2.3l.4-2.8h-2.7V9.4c0-.8.2-1.4 1.4-1.4h1.4V5.6c-.3 0-1.1-.1-2.1-.1-2 0-3.4 1.2-3.4 3.5v2.2H8.4V14h2.4v9h2.7Z" />
                      </svg>
                      Carisma Slimming
                    </a>
                  </div>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: 6 }}>
                  <BookConsultationButton variant="outline">Book Free Body Analysis</BookConsultationButton>
                </div>
              </div>

              {/* map card */}
              <div className="card overflow-hidden" style={{ lineHeight: 0, minHeight: 320 }}>
                <iframe
                  src="https://maps.google.com/maps?q=Carisma%20Slimming%2C%20Malta&z=15&output=embed"
                  style={{ width: '100%', height: '100%', minHeight: 320, border: 'none', display: 'block' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Carisma Slimming location on Google Maps, Malta"
                />
              </div>
            </div>
          </div>
        </section>
      </div>{/* /consultation-main */}

      <style>{`
        .consult-hero-grid { grid-template-columns: 1fr; }
        .hero-pill {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(255,255,255,0.7);
          border: 1px solid rgba(95,126,102,0.18);
          border-radius: 999px; padding: 7px 14px;
          backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
        }
        @media (min-width: 900px) {
          .consult-hero-grid { grid-template-columns: 56fr 44fr; }
          .consult-hero-media { justify-self: end; }
        }
      `}</style>
    </main>
  );
}
