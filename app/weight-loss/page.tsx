'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import CountUp from '@/components/CountUp';
import { weightLossFaqs, flattenWeightLossAnswer } from '@/lib/faq/weight-loss';
import { JsonLd } from '@/lib/seo/JsonLd';
import { SITE_URL, breadcrumbList, faqPage, serviceSchema } from '@/lib/seo/schema';

/* ============================================================
   Carisma — Medical Weight-Loss Program  (/weight-loss)
   A doctor-led, evidence-based slimming protocol for Malta.
   Copy angle: "Medicine, not motivation." Calm, clinical,
   authoritative — reframing weight loss as a supervised
   protocol for the post-35 metabolism, not another diet.
   ============================================================ */

/* ---------- Brand tokens ---------- */
const headingFont = 'Trajan Pro, serif';
const wideFont = 'Novecento Wide Book, sans-serif';
const bodyFont = 'Roboto, sans-serif';

/* Bright brand sage (#8EB093) is DECORATIVE ONLY and fails as text/border on white (2.39:1),
   so on this all-light page it only ever appears as a low-opacity gradient stop (inline below).
   Every text/icon/bullet/border token resolves to an accessible value: */
const green = '#4f7256'; // brand-green-text — sage TEXT, icons, links, bullets, headings on white (5.42:1 AA)
const greenDark = '#4f7256'; // deep sage for emphasised text (same family, AA)
const slate = '#2b5672'; // CTA / strong link (7.85:1 AAA on white)
const taupe = '#6f6456'; // taupe TEXT — body, lists, eyebrows on white/near-white (5.78:1 AA)
const taupeLight = '#6f6456'; // muted text darkened to the same accessible taupe (no separate weak grey)
const softBg = '#E8EEE6'; // lightened from #E4EBE2 so small green-text labels clear AA (4.60:1)
const panelGradient = 'linear-gradient(135deg, #FCFCFA, #E6EFE3)'; // end lightened from #D8E7D2 so small text on the panel clears AA

const freshaUrl =
  'https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2843963&eid=5009163&oiid=sv%3A25969858&share=true&pId=2708191';
const phoneNumber = '+356 27802062';

/* ---------- Shared text styles ---------- */
const bullet = { color: green, fontSize: '18px', lineHeight: '1' } as const;
const liStyle = { color: taupe, fontFamily: bodyFont, fontWeight: 400 as const, fontSize: '14px', lineHeight: 1.6 };
const pStyle = { color: taupe, fontFamily: bodyFont, fontWeight: 400 as const, fontSize: '14px', lineHeight: 1.6 };

/* ---------- Shared components ---------- */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-center mb-3"
      style={{ color: green, fontFamily: headingFont, fontWeight: 400, fontSize: '25px', textTransform: 'uppercase' }}
    >
      {children}
    </h2>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-center"
      style={{ color: taupe, fontFamily: wideFont, fontSize: '16px', letterSpacing: '3.2px', textTransform: 'uppercase' }}
    >
      {children}
    </p>
  );
}

function Placeholder({ label, height = '320px' }: { label: string; height?: string }) {
  return (
    <div
      className="w-full flex items-center justify-center text-center border-2 border-dashed"
      style={{ minHeight: height, borderRadius: '16px', borderColor: green, backgroundColor: softBg, color: taupe, fontFamily: bodyFont, fontSize: '14px', padding: '16px' }}
    >
      {label}
    </div>
  );
}

/* Primary slate-blue CTA — the conversion button, repeated strategically */
function CTAButton({ label = 'BOOK YOUR FREE BODY ANALYSIS' }: { label?: string }) {
  return (
    <a
      href={freshaUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="cta-glow inline-block font-bold text-white text-center"
      style={{ padding: '15px 36px', fontFamily: wideFont, fontSize: '14px', letterSpacing: '0.5px' }}
    >
      {label}
    </a>
  );
}

const medicalConsultUrl = 'https://www.fresha.com/a/carisma-slimming-floriana-great-siege-road-wxxyuj9p/booking?pId=2708191&modal=employee-profile&employeeId=5084222&back=%2Fa%2Fcarisma-slimming-floriana-great-siege-road-wxxyuj9p&cartId=e54b0560-88a7-4e30-835b-5d10548e729b';

function PhoneButton() {
  return (
    <a
      href={medicalConsultUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-secondary font-bold text-center"
      style={{ padding: '13px 34px', fontFamily: wideFont, fontSize: '14px', letterSpacing: '0.5px', textTransform: 'uppercase' }}
    >
      Speak to a doctor
    </a>
  );
}

function Check() {
  return <span style={{ color: green, fontWeight: 700 }}>&#10003;</span>;
}

/* Small reassurance line shown directly beneath primary CTAs to lower friction */
function CTAReassurance({ className = '' }: { className?: string }) {
  return (
    <p className={className} style={{ color: taupeLight, fontFamily: bodyFont, fontSize: '13px' }}>
      Free, no-obligation consultation &middot; Doctor-led &middot; Limited places each month
    </p>
  );
}


/* ============================================================
   1. HERO
   ============================================================ */
function HeroSection() {
  return (
      <PageHero
        eyebrow="With Malta's most comprehensive, medically guided slimming program"
        headline={[
          { text: 'Lose Up To 1KG A Week' },
          { text: 'Doctor-Led & Guaranteed', em: true },
        ]}
        sub="Medical weight loss in Malta — personalised programs combining medical-grade analysis, prescription support, nutrition and body sculpting with weekly check-ins — to help you hit your target weight and keep it off."
        bullets={[
          { text: '5kg in 6 weeks' },
          { text: '10kg in 12 weeks' },
          { text: '20kg in 20 weeks — or we keep treating you free' },
        ]}
        primaryCta={{ text: 'Get Your Free Body Analysis', href: 'https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2843963&eid=5009163&oiid=sv%3A25969858&share=true&pId=2708191', external: true }}
        secondaryCta={{ text: 'Speak to a doctor', href: 'tel:+35627802062' }}
        media={{ type: 'video', src: '/video/hero-720p.mp4', poster: '/wix/87fc13_523cfb315801437881171694d92d8d4f~mv2.webp', alt: 'Carisma medical weight loss in Malta' }}
        proof={{ rating: '4.9', reviews: '800+', awardSrc: '/wix/f940f0_c4008d16bc3245f7bc8663f5b60d7a82~mv2.png', awardText: '#1 voted clinic\nMalta 2025–26' }}
        compactHeadline
        motif
      />
  );
}

/* ============================================================
   2. PROBLEM / AGITATION  — editorial redesign
   ============================================================ */
function ProblemAgitationSection() {
  const empathy = [
    'Since your late thirties or early forties your body feels like it quietly changed the rules. The same food now sits on your waist instead of burning off.',
    'Around menopause the scale crept up even though you were counting steps and cutting snacks. You feel betrayed by your own hormones.',
    'Every new diet tells you to cut bread, pasta and wine. You can do it for a week or two, then life happens and you rebound even heavier.',
    'You are tired of plans that treat you like a number on a scale instead of a human with work, family, stress and a changing body.',
  ];

  const ignored = [
    'Your metabolism naturally slows as muscle drops with age.',
    'Menopause and peri menopause shift fat to the waist and stomach and change hunger signals.',
    'Years of yo yo dieting have taught your body to protect fat when it senses restriction.',
    'Templatised meal plans with little regard to your medical history, food intolerances and blood work.',
  ];

  const wrong = [
    'Extreme calorie cuts and carb bans make your body feel under threat, so it holds on to fat and burns muscle.',
    'Focus on burning calories, not protecting muscle or joint health as you age.',
    'Endless cardio drains energy without protecting metabolism.',
    'One size fits all meal plans never account for Maltese food, family life or social events.',
  ];

  return (
    <section aria-labelledby="problem-heading">

      {/* ── PART 1: EMPATHY NARRATIVE ───────────────────────────── */}
      <div style={{ background: 'linear-gradient(180deg, #ffffff 0%, #EEF3EA 50%, #ffffff 100%)', padding: 'clamp(24px, 6vw, 88px) 0 0', overflow: 'hidden' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center" style={{ color: taupe, fontFamily: wideFont, fontSize: '12px', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '14px' }}>
            does this sound familiar?
          </p>
          <h2
            id="problem-heading"
            className="text-center"
            style={{ color: green, fontFamily: headingFont, fontWeight: 400, fontSize: 'clamp(22px, 4vw, 32px)', textTransform: 'uppercase', lineHeight: 1.25, marginBottom: '20px' }}
          >
            Weight Loss After 30 in Malta<br />Without Giving Up the Foods You Love
          </h2>
          <div className="mx-auto" style={{ width: '48px', height: '1px', backgroundColor: green, marginBottom: '64px' }} />

          {/* Two-column: image | intro + numbered confessions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 items-start" style={{ gap: 'clamp(24px, 5vw, 64px)' }}>
            {/* Image with sage shadow-offset */}
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  top: '16px', left: '16px', right: '-8px', bottom: '-8px',
                  background: '#C9D8C1',
                  borderTopLeftRadius: '16px', borderTopRightRadius: '80px',
                  borderBottomLeftRadius: '80px', borderBottomRightRadius: '16px',
                }}
              />
              <div
                style={{
                  position: 'relative',
                  width: '100%', maxWidth: '380px',
                  aspectRatio: '334/400',
                  borderTopLeftRadius: '16px', borderTopRightRadius: '80px',
                  borderBottomLeftRadius: '80px', borderBottomRightRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 24px 60px rgba(40,55,44,0.18)',
                }}
              >
                <img
                  src="/wix/87fc13_3028fef86af2454fa2fbdbb5dcd55d87~mv2.webp"
                  alt="Slimming consultation at the Carisma clinic in Malta"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>

            {/* Intro + numbered empathy confessions */}
            <div>
              <p style={{ ...pStyle, fontSize: '16px', lineHeight: 1.85, marginBottom: '40px' }}>
                You are eating better than you did in your twenties, yet the weight around your stomach and hips does not budge. You walk more, you try to be good, but every year your clothes feel tighter and your energy feels lower.
              </p>
              <div>
                {empathy.map((t, i) => (
                  <div
                    key={t}
                    style={{
                      display: 'flex',
                      gap: '20px',
                      alignItems: 'flex-start',
                      padding: '18px 0',
                      borderBottom: i < empathy.length - 1 ? '1px solid rgba(79,114,86,0.1)' : 'none',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: headingFont,
                        fontSize: '20px',
                        fontWeight: 400,
                        color: 'rgba(79,114,86,0.22)',
                        lineHeight: 1,
                        flexShrink: 0,
                        minWidth: '30px',
                        textAlign: 'right',
                        paddingTop: '2px',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p style={{ ...pStyle, margin: 0, lineHeight: 1.75 }}>{t}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ── PART 2: DIAGNOSTIC — WHY PLANS FAILED ──────────────── */}
      <div style={{ backgroundColor: '#ffffff', paddingTop: '0', paddingBottom: 'clamp(12px, 3vw, 48px)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center" style={{ marginBottom: 'clamp(28px, 5vw, 64px)' }}>
            <p style={{ color: taupe, fontFamily: wideFont, fontSize: '12px', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '14px' }}>
              Why everything else failed
            </p>
            <div className="mx-auto" style={{ width: '64px', height: '1px', backgroundColor: '#cdd8c8', marginBottom: '20px' }} />
            <h2 style={{ color: green, fontFamily: headingFont, fontWeight: 400, fontSize: '25px', textTransform: 'uppercase', lineHeight: 1.4, marginBottom: '16px' }}>
              Why Is It So Much Harder<br />To Lose Weight After 30?
            </h2>
            <p style={{ ...pStyle, maxWidth: '480px', margin: '0 auto', lineHeight: 1.75 }}>
              Most of what you have tried was built on one idea: eat less, move more. That might work for a 25 year old with no stress. It is not enough for a 40 plus body with real hormones, real history and real responsibilities.
            </p>
          </div>

          {/* Editorial two-column diagnostic */}
          <div
            className="grid grid-cols-1 md:grid-cols-2"
            style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 12px 40px rgba(40,55,44,0.08)', gap: '2px', background: 'rgba(79,114,86,0.06)' }}
          >
            <div style={{ background: 'linear-gradient(160deg, #F2F6EF 0%, #E2EDD9 100%)', padding: '40px 36px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
                <span style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'rgba(79,114,86,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: green, flexShrink: 0 }}>✕</span>
                <h3 style={{ color: green, fontFamily: wideFont, fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', margin: 0 }}>What those plans ignored</h3>
              </div>
              {ignored.map((t, i) => (
                <div key={t} style={{ display: 'flex', gap: '14px', padding: '16px 0', borderBottom: i < ignored.length - 1 ? '1px solid rgba(79,114,86,0.1)' : 'none' }}>
                  <span style={{ fontFamily: headingFont, fontSize: '12px', color: 'rgba(79,114,86,0.35)', flexShrink: 0, paddingTop: '2px' }}>{String(i + 1).padStart(2, '0')}</span>
                  <p style={{ ...liStyle, margin: 0, lineHeight: 1.65 }}>{t}</p>
                </div>
              ))}
            </div>
            <div style={{ background: 'linear-gradient(160deg, #FDFAF6 0%, #EDE8DF 100%)', padding: '40px 36px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
                <span style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'rgba(111,100,86,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: taupe, flexShrink: 0 }}>✕</span>
                <h3 style={{ color: taupe, fontFamily: wideFont, fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', margin: 0 }}>What those plans got wrong</h3>
              </div>
              {wrong.map((t, i) => (
                <div key={t} style={{ display: 'flex', gap: '14px', padding: '16px 0', borderBottom: i < wrong.length - 1 ? '1px solid rgba(111,100,86,0.1)' : 'none' }}>
                  <span style={{ fontFamily: headingFont, fontSize: '12px', color: 'rgba(111,100,86,0.3)', flexShrink: 0, paddingTop: '2px' }}>{String(i + 1).padStart(2, '0')}</span>
                  <p style={{ ...liStyle, margin: 0, lineHeight: 1.65 }}>{t}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ============================================================
   3. PROGRAM OVERVIEW — split photo + stacked steps (mirrors GLP-1 conditions layout)
   ============================================================ */
function ProgramOverviewSection() {
  const steps = [
    {
      num: '01',
      title: 'Initial Screening',
      text: 'We review your goals, health history and past diets — we only enrol you if we are confident we can stand behind your results.',
    },
    {
      num: '02',
      title: 'Body Analysis',
      text: 'Full body composition scan covering fat, muscle and visceral fat — plus a doctor consultation on hormones, blood sugar and GLP-1 eligibility.',
    },
    {
      num: '03',
      title: 'Diet & Accountability',
      text: 'Mediterranean-style plan built around Maltese food. Weekly check-ins with a dedicated coach and WhatsApp support between visits.',
    },
    {
      num: '04',
      title: 'Movement Plan',
      text: 'Gym access, group classes or personal training — matched to your current fitness and schedule, progressing week by week.',
    },
    {
      num: '05',
      title: 'Body Contouring',
      text: 'Emsculpt NEO, CoolSculpting and VelaShape to tone, target stubborn fat and firm skin as the weight comes off.',
    },
  ];

  return (
    <section aria-labelledby="program-heading" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #F2F6EF 50%, #ffffff 100%)', paddingTop: 'clamp(12px, 3vw, 48px)', paddingBottom: 'clamp(40px, 8vw, 96px)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '56px', alignItems: 'stretch' }}>

          {/* Photo — fills the full height of the right content column */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative', flex: 1, minHeight: '520px', borderTopLeftRadius: '16px', borderTopRightRadius: '72px', borderBottomLeftRadius: '72px', borderBottomRightRadius: '16px', overflow: 'hidden', boxShadow: '12px -12px 0 #C9D8C1' }}>
              <Image
                src="/wix/87fc13_16e7dbed_consult_668x724.jpg"
                alt="Initial consultation at Carisma Slimming — your doctor-led programme starts here"
                fill
                style={{ objectFit: 'cover' }}
                loading="lazy"
              />
            </div>
            <p style={{ fontFamily: bodyFont, fontSize: '12px', color: '#9B8D83', textAlign: 'center', marginTop: '16px', fontStyle: 'italic', letterSpacing: '0.5px' }}>
              Your programme is built around you — not a generic plan
            </p>
          </div>

          {/* Right: heading + all 5 steps stacked */}
          <div>
            <p style={{ fontFamily: wideFont, fontSize: '10px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#9B8D83', marginBottom: '10px' }}>
              How our doctor-led programme works
            </p>
            <div style={{ width: '32px', height: '1px', background: '#C9B8AE', marginBottom: '20px' }} />
            <h2
              id="program-heading"
              style={{ fontFamily: headingFont, fontSize: 'clamp(20px,2.8vw,26px)', fontWeight: 400, color: '#024C27', textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: 1.3, marginBottom: '32px' }}
            >
              Five Steps to Your Transformation
            </h2>

            <div>
              {steps.map((s, i) => (
                <div
                  key={s.num}
                  style={{
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'flex-start',
                    padding: '14px 0',
                    borderBottom: i < steps.length - 1 ? '1px solid rgba(79,114,86,0.1)' : 'none',
                  }}
                >
                  <span style={{ fontFamily: headingFont, fontSize: '14px', color: 'rgba(79,114,86,0.25)', flexShrink: 0, minWidth: '24px', paddingTop: '2px' }}>
                    {s.num}
                  </span>
                  <div>
                    <span style={{ fontFamily: wideFont, fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: green, display: 'block', marginBottom: '3px' }}>
                      {s.title}
                    </span>
                    <p style={{ fontFamily: bodyFont, fontSize: '13px', lineHeight: 1.6, color: taupe, margin: 0 }}>
                      {s.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '32px' }}>
              <CTAButton label="Get Your Free Body Analysis" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   4. CORE PILLARS
   ============================================================ */
function CorePillarsSection() {
  const pillars = [
    {
      title: 'Medical grade assessment',
      subtitle: 'Understand your body composition',
      icon: '/wix/87fc13_e4efa875484546fca9d640d39b9f0100~mv2.png',
      items: [
        'Full body composition analysis',
        'Doctor consultation',
        'GLP-1 as appropriate (e.g., Ozempic)',
        'Fat dissolving injections',
        'Blood tests, metabolic screening & intolerance screen',
      ],
    },
    {
      title: 'Diet and accountability',
      subtitle: 'Personalised food plan with a buddy',
      icon: '/wix/87fc13_d751907d21e84894ae37b1b33136d812~mv2.png',
      items: [
        'Personalised diet plan that fits your routine and culture',
        'Weekly weigh ins and measurements',
        'One to one accountability with a dedicated coach',
        'Supplement recommendations to support metabolism, energy and cravings',
      ],
    },
    {
      title: 'Exercise and movement',
      subtitle: 'Realistic movement that fits your life',
      icon: '/wix/87fc13_1fdf47007d8a45c18e39603447edbb23~mv2.png',
      items: [
        'Open gym access for independent training',
        'Group classes focused on fat loss and strength',
        'Personal training sessions for extra guidance and motivation',
      ],
    },
    {
      title: 'Targeted body treatments',
      subtitle: 'Clinic treatments that speed up change',
      icon: '/wix/87fc13_da70307b66154a24b141dfb4fd26a1bb~mv2.png',
      items: [
        'Muscle stimulation treatments (Emsculpt NEO)',
        'Fat freezing treatments (CoolSculpting)',
        'Radiofrequency skin tightening (VelaShape)',
        'Lymphatic drainage',
      ],
    },
  ];

  return (
    <section aria-labelledby="pillars-heading" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #F2F6EF 50%, #ffffff 100%)', paddingTop: 'clamp(12px, 3vw, 48px)', paddingBottom: 'clamp(12px, 3vw, 48px)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center mb-2" style={{ color: taupe, fontFamily: wideFont, fontSize: '16px', letterSpacing: '3.2px', textTransform: 'uppercase' }}>
          4 core pillars of our methodology
        </p>
        <div className="mx-auto mb-5" style={{ width: '150px', height: '1px', backgroundColor: '#cdd8c8' }} />
        <h2 id="pillars-heading" className="text-center mb-12" style={{ color: green, fontFamily: headingFont, fontWeight: 400, fontSize: '25px', textTransform: 'uppercase', lineHeight: 1.3 }}>
          Malta&apos;s only multidisciplinary<br />approach to weight-loss
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((p) => (
            <article key={p.title} className="lg-raised lg-raised--hover p-6" style={{ background: 'linear-gradient(180deg, #F2F6EF 0%, #E6EFE3 100%)', borderTopLeftRadius: '18px', borderTopRightRadius: '90px', borderBottomLeftRadius: '90px', borderBottomRightRadius: '18px', boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}>
              <div className="mb-5 flex items-center" style={{ height: '48px' }}>
                <Image src={p.icon} alt="" role="presentation" width={44} height={44} style={{ maxHeight: '44px', width: 'auto', objectFit: 'contain' }} loading="lazy" />
              </div>
              <p className="mb-2" style={{ color: green, fontFamily: wideFont, fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', lineHeight: 1.4 }}>{p.title}</p>
              <h3 className="mb-5" style={{ color: taupe, fontFamily: bodyFont, fontSize: '14px', fontWeight: 400, lineHeight: 1.4 }}>{p.subtitle}</h3>
              <ul className="space-y-2">
                {p.items.map((it) => (
                  <li key={it} className="flex items-start gap-2" style={{ color: taupe, fontFamily: bodyFont, fontSize: '13px', lineHeight: 1.4 }}>
                    <span style={{ color: green, lineHeight: 1.4 }}>&bull;</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   5. TREATMENTS
   ============================================================ */
function TreatmentsSection() {
  const treatments = [
    {
      title: 'Emsculpt NEO — muscle stimulation',
      href: '/packages/muscle-stimulation',
      image: '/wix/87fc13_a965179046514c2a8ad7bec0b7f44127~mv2.jpg',
      placeholder: 'Emsculpt NEO treatment photo',
      desc: 'High-intensity electromagnetic energy contracts the muscle thousands of times in a single 30-minute session — the equivalent effort of around 20,000 contractions while you simply lie still.',
      uses: [
        'Build and define muscle through the abdomen and glutes',
        'Support posture and core strength as you lose weight',
        'Refine your shape as the kilos start to come down',
      ],
      note: 'You stay fully dressed and supervised throughout, feeling deep, controlled contractions.',
    },
    {
      title: 'CoolSculpting — fat freezing',
      href: '/packages/fat-freezing',
      image: '',
      placeholder: 'CoolSculpting fat-freezing treatment photo',
      desc: 'The market-leading cryolipolysis system targets stubborn pockets that resist diet and exercise, cooling fat cells in a controlled way so the body gradually clears them.',
      uses: [
        'Treat areas such as the lower abdomen, flanks, bra line or thighs',
        'Contour the body as your overall weight reduces',
        'Achieve definition without surgery or downtime',
      ],
      note: 'Every plan is set by your medical assessment and goals — never a one-area-fits-all offer.',
    },
    {
      title: 'VelaShape — radiofrequency tightening',
      href: '/packages/skin-tightening',
      image: '',
      placeholder: 'VelaShape skin-tightening treatment photo',
      desc: 'Radiofrequency, infrared light, gentle vacuum and massage warm the deeper layers of skin to stimulate collagen and refine texture.',
      uses: [
        'Improve mild laxity as the body changes shape',
        'Smooth areas that feel softer after weight loss',
        'Support circulation in cellulite-prone zones',
      ],
      note: 'It feels like a warm, deep massage rather than anything harsh.',
    },
    {
      title: 'Lymphatic drainage — recovery support',
      href: '/packages/lymphatic-drainage',
      image: '',
      placeholder: 'Lymphatic drainage treatment photo',
      desc: 'Compressive micro-vibration and specialised massage support circulation and the clearance of fluid as an adjunct to your core plan.',
      uses: [
        'Encourage circulation and fluid drainage',
        'Ease the heavy, puffy feeling in legs or midsection',
        'Complement fat-loss and skin-tightening treatments',
      ],
      note: '',
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Eyebrow>Medical-grade, evidence-backed devices</Eyebrow>
        <SectionHeading>Clinical technology that accelerates your results</SectionHeading>
        <p className="mt-4 mb-12 max-w-3xl mx-auto text-center" style={pStyle}>
          We use category-leading devices — chosen for their safety record, published evidence and real-world results, never cheap gadgets. Treatments are not the whole plan; they are powerful tools layered on top of a sound medical, nutritional and movement strategy.
        </p>
        <div className="space-y-12">
          {treatments.map((t, i) => {
            const flip = i % 2 === 1;
            return (
              <div key={t.title} className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div className={flip ? 'md:order-2' : ''}>
                  {t.image ? (
                    <div className="w-full overflow-hidden shadow-md" style={{ position: 'relative', borderRadius: '16px', aspectRatio: '381 / 250' }}>
                      <Image src={t.image} alt={t.placeholder} fill style={{ objectFit: 'cover' }} loading="lazy" />
                    </div>
                  ) : (
                    <Placeholder label={t.placeholder} height="280px" />
                  )}
                </div>
                <div className={flip ? 'md:order-1' : ''}>
                  <h3 className="mb-4" style={{ color: greenDark, fontFamily: headingFont, fontSize: '22px', fontWeight: 400 }}>
                    <Link href={t.href} style={{ color: greenDark, textDecoration: 'none' }} className="hover:underline">{t.title}</Link>
                  </h3>
                  <p className="mb-4" style={pStyle}>{t.desc}</p>
                  <ul className="space-y-2 mb-4">
                    {t.uses.map((u) => (
                      <li key={u} className="flex items-start gap-2" style={liStyle}>
                        <span style={bullet}>&bull;</span>
                        <span>{u}</span>
                      </li>
                    ))}
                  </ul>
                  {t.note && <p className="italic" style={pStyle}>{t.note}</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   5b. THE CARISMA DIFFERENCE — "we are not another diet clinic"
   ============================================================ */
function CarismaDifferenceSection() {
  const commitmentItems = [
    'Doctor led: full medical check and body scan',
    'One integrated program: medical, diet, movement and treatments together',
    'Real gym included: Technogym facility, semi-private classes and PT',
    'High touch support: weekly check ins, progress reports and WhatsApp follow up',
  ];
  const differenceItems = [
    'Evidence based devices: Emsculpt NEO, coolsculpting and RF skin tightening',
    'Selective entry and measurable weight loss results guaranteed',
  ];
  return (
    <section className="py-24" aria-labelledby="difference-heading-wl" style={{ backgroundColor: '#ffffff' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative" style={{ background: 'linear-gradient(192deg, #F8F6F2 44.74%, rgba(142, 176, 147, 0.4) 100%)', borderRadius: '16px', padding: '40px 40px 48px', overflow: 'hidden' }}>
          {/* Decorative background watermark */}
          <Image
            src="/wix/f940f0_9f944ed58e3f4919bf87ef224beb4f94~mv2.webp"
            alt=""
            role="presentation"
            width={678}
            height={630}
            aria-hidden={true}
            style={{ position: 'absolute', left: '50%', top: '12px', transform: 'translateX(-50%)', width: '678px', height: '630px', objectFit: 'contain', pointerEvents: 'none', zIndex: 0 }}
          />
          <div className="relative" style={{ zIndex: 1 }}>
            <p className="text-center mb-2" aria-hidden="true" style={{ color: '#5a4f43', fontFamily: 'Novecento Wide Book, sans-serif', fontSize: '14px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase' }}>
              the carisma difference
            </p>
            <div className="mx-auto mb-4" aria-hidden="true" style={{ width: '110px', height: '1px', backgroundColor: '#B9A99E' }} />
            <h2 id="difference-heading-wl" className="text-center mb-12" style={{ color: '#3c5a40', fontFamily: headingFont, fontWeight: '400', fontSize: '25px', lineHeight: '35px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              why malta chooses carisma slimming
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
              {/* Left - commitments + difference list + CTA */}
              <div className="space-y-12">
                <div>
                  <h3 className="mb-6" style={{ color: '#000000', fontFamily: 'Novecento Wide Book, sans-serif', fontSize: '15px', fontWeight: '400', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    Our Doctor-Led Slimming Commitment
                  </h3>
                  <ul className="space-y-4">
                    {commitmentItems.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3" style={{ color: '#5a4f43', fontFamily: 'Roboto, sans-serif', fontSize: '14px', lineHeight: '1.6' }}>
                        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, marginTop: '2px' }}>
                          <circle cx="9" cy="9" r="9" fill="#C9D8C1" />
                          <path d="M5 9.5L7.5 12L13 6.5" stroke="#4f7256" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-6" style={{ color: '#000000', fontFamily: 'Novecento Wide Book, sans-serif', fontSize: '15px', fontWeight: '400', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    What Makes Our Weight Loss Clinic Different
                  </h3>
                  <ul className="space-y-4">
                    {differenceItems.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3" style={{ color: '#5a4f43', fontFamily: 'Roboto, sans-serif', fontSize: '14px', lineHeight: '1.6' }}>
                        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, marginTop: '2px' }}>
                          <circle cx="9" cy="9" r="9" fill="#C9D8C1" />
                          <path d="M5 9.5L7.5 12L13 6.5" stroke="#4f7256" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <a
                    href="https://www.fresha.com/a/carisma-slimming-floriana-great-siege-road-wxxyuj9p/booking?pId=2708191&modal=employee-profile&employeeId=5084222&back=%2Fa%2Fcarisma-slimming-floriana-great-siege-road-wxxyuj9p&cartId=e54b0560-88a7-4e30-835b-5d10548e729b"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-glow inline-flex items-center justify-center font-bold text-white transition-all duration-200 ease-in-out hover:opacity-90 active:scale-95"
                    style={{ fontFamily: 'Novecento Wide Book, sans-serif', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', minHeight: '48px', padding: '0 32px' }}
                    aria-label="Book your free body analysis"
                  >
                    Book Your Free Body Analysis
                  </a>
                </div>
              </div>
              {/* Right - Google Maps embed */}
              <div className="flex flex-col">
                <iframe
                  title="Carisma Slimming clinic location — Grand Hotel Excelsior, Floriana, Malta"
                  aria-label="Google Maps showing Carisma Slimming at Grand Hotel Excelsior, Floriana, Malta"
                  src="https://maps.google.com/maps?q=Grand%20Hotel%20Excelsior%2C%20Great%20Siege%20Road%2C%20Floriana%20FRN%201810%2C%20Malta&z=15&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: '20px', display: 'block', flex: 1, minHeight: '480px' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#E9F0E9', borderRadius: '999px', padding: '8px 16px', marginTop: '16px', alignSelf: 'flex-start' }}>
                  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1" y="1" width="16" height="16" rx="4" fill="#C9D8C1" />
                    <text x="9" y="13" textAnchor="middle" fill="#4f7256" fontSize="10" fontWeight="700" fontFamily="sans-serif">P</text>
                  </svg>
                  <span style={{ color: '#4f7256', fontFamily: 'Novecento Wide Book, sans-serif', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>
                    Complimentary on-site parking
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   5c. OUR PROMISE — guarantee hero + extended care commitment
   ============================================================ */
function OurPromiseSection() {
  const conditions = [
    { label: 'Show up', text: 'Attend all scheduled in-clinic sessions and weekly check-ins' },
    { label: 'Follow your plan', text: 'Stick to your personalised food plan — tell us if you struggle' },
    { label: 'Stay active', text: 'Complete your agreed movement plan or discuss any obstacles' },
    { label: 'Medical only', text: 'Use only the treatments and medications our team recommends' },
    { label: 'Keep us informed', text: 'Tell us about any health changes, medication or new diagnosis' },
    { label: 'No shortcuts', text: 'Avoid crash diets or outside weight loss treatments' },
  ];

  return (
    <>
      {/* ── Guarantee band — light on-brand panel (no dark-green background) ── */}
      <section style={{ background: 'linear-gradient(180deg, #ffffff 0%, #eef3ea 50%, #ffffff 100%)', padding: '88px 0 0', overflow: 'hidden', position: 'relative' }}>
        {/* Decorative large watermark number */}
        <span aria-hidden style={{
          position: 'absolute', right: '-2%', top: '4%',
          fontFamily: headingFont, fontSize: 'clamp(180px,26vw,340px)', fontWeight: 400,
          color: 'rgba(79,114,86,0.06)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
        }}>1KG</span>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" style={{ textAlign: 'center', position: 'relative' }}>
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', border: `1px solid rgba(79,114,86,0.35)`, borderRadius: '999px', padding: '8px 20px', marginBottom: '36px', background: 'rgba(255,255,255,0.6)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={green} strokeWidth="1.8" aria-hidden>
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span style={{ fontFamily: wideFont, fontSize: '10px', fontWeight: 700, letterSpacing: '3px', color: green, textTransform: 'uppercase' }}>
              Medically Guaranteed
            </span>
          </div>

          {/* Headline */}
          <h2 style={{ fontFamily: headingFont, fontSize: 'clamp(48px,8vw,88px)', fontWeight: 400, color: '#024C27', lineHeight: 0.95, textTransform: 'uppercase', marginBottom: '32px', letterSpacing: '-0.5px' }}>
            Up to 1KG<br />
            <em style={{ fontStyle: 'normal', color: green }}>Per Week.</em>
          </h2>

          <p style={{ fontFamily: bodyFont, fontSize: '17px', lineHeight: 1.7, color: taupe, maxWidth: '520px', margin: '0 auto 16px' }}>
            If you qualify, follow the programme, and don&rsquo;t reach your target weight — we extend your care at <strong style={{ color: '#024C27', fontWeight: 600 }}>no extra cost</strong>, until you do.
          </p>
          <p style={{ fontFamily: headingFont, fontSize: '16px', color: green, fontStyle: 'italic', marginBottom: '64px' }}>
            This is our Extended Care Commitment.
          </p>
        </div>

        {/* 3 proof pillars */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '2px', borderTop: '1px solid rgba(79,114,86,0.18)' }}>
          {[
            { num: '1', stat: 'Doctor-Led', sub: 'Every programme is supervised by a qualified medical doctor from day one' },
            { num: '2', stat: 'Clinically Tracked', sub: 'Tanita body composition scans at every visit — real numbers, not guesses' },
            { num: '3', stat: 'Extended Until Done', sub: 'We keep going at no extra cost until you hit your agreed target weight' },
          ].map((item) => (
            <div key={item.num} style={{ padding: '32px 24px', borderRight: '1px solid rgba(79,114,86,0.14)', textAlign: 'center' }}>
              <span style={{ display: 'block', fontFamily: wideFont, fontSize: '10px', fontWeight: 700, letterSpacing: '2px', color: green, textTransform: 'uppercase', marginBottom: '10px' }}>0{item.num}</span>
              <p style={{ fontFamily: headingFont, fontSize: '20px', color: '#024C27', marginBottom: '10px', textTransform: 'uppercase' }}>{item.stat}</p>
              <p style={{ fontFamily: bodyFont, fontSize: '13px', lineHeight: 1.65, color: taupe }}>{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Conditions section ────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(180deg, #ffffff 0%, #F2F6EF 50%, #ffffff 100%)', padding: '72px 0 80px' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '56px', alignItems: 'start' }}>

            {/* Photo + caption */}
            <div>
              <div style={{ position: 'relative', height: '460px', borderTopLeftRadius: '16px', borderTopRightRadius: '72px', borderBottomLeftRadius: '72px', borderBottomRightRadius: '16px', overflow: 'hidden', boxShadow: '12px -12px 0 #C9D8C1' }}>
                <Image
                  src="/wix/87fc13_aea394ce5ab4485e8613221fa3617b8f~mv2.webp"
                  alt="Tanita body composition analysis at Carisma Slimming — your measurable baseline"
                  fill
                  style={{ objectFit: 'cover' }}
                  loading="lazy"
                />
              </div>
              <p style={{ fontFamily: bodyFont, fontSize: '12px', color: '#9B8D83', textAlign: 'center', marginTop: '16px', fontStyle: 'italic', letterSpacing: '0.5px' }}>
                Tanita body composition scan — your measurable baseline at every visit
              </p>
            </div>

            {/* Right: promise + conditions */}
            <div>
              <p style={{ fontFamily: wideFont, fontSize: '10px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#9B8D83', marginBottom: '10px' }}>
                How it works
              </p>
              <div style={{ width: '32px', height: '1px', background: '#C9B8AE', marginBottom: '20px' }} />
              <h3 style={{ fontFamily: headingFont, fontSize: '22px', fontWeight: 400, color: '#024C27', textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: 1.3, marginBottom: '18px' }}>
                We Only Accept Clients We Genuinely Believe We Can Help
              </h3>
              <p style={{ fontFamily: bodyFont, fontSize: '14.5px', lineHeight: 1.8, color: taupe, marginBottom: '32px', borderLeft: '2px solid #C9D8C1', paddingLeft: '16px' }}>
                If you qualify and complete the programme as agreed — and don&rsquo;t reach your target weight — we extend your weight management programme at no extra fee until we get there together.
              </p>

              <p style={{ fontFamily: wideFont, fontSize: '10px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#9B8D83', marginBottom: '16px' }}>
                To receive this guarantee, you agree to:
              </p>

              {/* Conditions — full-width stacked list */}
              <div>
                {conditions.map((c, i) => (
                  <div
                    key={c.label}
                    style={{
                      display: 'flex',
                      gap: '16px',
                      alignItems: 'flex-start',
                      padding: '14px 0',
                      borderBottom: i < conditions.length - 1 ? '1px solid rgba(79,114,86,0.1)' : 'none',
                    }}
                  >
                    <span style={{ fontFamily: headingFont, fontSize: '14px', color: 'rgba(79,114,86,0.25)', flexShrink: 0, minWidth: '24px', paddingTop: '1px' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <span style={{ fontFamily: wideFont, fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: green, display: 'block', marginBottom: '3px' }}>{c.label}</span>
                      <p style={{ fontFamily: bodyFont, fontSize: '13px', lineHeight: 1.6, color: taupe, margin: 0 }}>{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '32px' }}>
                <a
                  href={freshaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-glow"
                  style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', fontFamily: wideFont, fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', textDecoration: 'none', color: '#fff', padding: '16px 24px', borderRadius: '999px', minHeight: '52px' }}
                >
                  Get Your Free Body Composition Analysis
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ============================================================
   6. RESULTS — clinical evidence + doctors + promise
   ============================================================ */
function ResultsSection() {
  const evidence = [
    {
      modality: 'Energy-restricted Mediterranean nutrition',
      strength: 'HIGH',
      mechanism: 'A 500–1000 kcal daily deficit drives steady loss of roughly 0.5–1 kg per week.',
      result: 'In the PREDIMED-Plus trial, participants lost 3.2 kg versus 0.7 kg at 12 months, with 33.7% losing 5% or more of body weight.',
    },
    {
      modality: 'Higher-protein, muscle-protective diet',
      strength: 'HIGH',
      mechanism: 'Protein at roughly 1.2–1.5 g per kg of ideal body weight preserves lean mass during a deficit.',
      result: 'A meta-analysis of 47 trials (n = 3,218) found a standardised mean difference of 0.75 favouring muscle preservation.',
    },
    {
      modality: 'Diet combined with exercise',
      strength: 'HIGH',
      mechanism: 'Resistance, cardio and mobility work alongside nutrition, not in place of it.',
      result: 'Adding structured exercise keeps roughly 1.1 kg more weight off over the long term than diet alone.',
    },
    {
      modality: 'Cryolipolysis (CoolSculpting)',
      strength: 'MODERATE–HIGH',
      mechanism: 'Controlled cooling reduces a localised fat layer over 1–3 cycles.',
      result: 'Published studies report a 10–26% reduction in the treated fat layer, visible at 8–12 weeks.',
    },
    {
      modality: 'HIFEM + RF (Emsculpt NEO)',
      strength: 'EMERGING',
      mechanism: 'Combined electromagnetic and radiofrequency energy across about 4 sessions, roughly a week apart.',
      result: 'Trials show around 25–30% muscle gain alongside a 25–30% reduction in fat in the treated area.',
    },
    {
      modality: 'RF / IR / vacuum (VelaShape)',
      strength: 'MODERATE',
      mechanism: 'Deep heating and massage across 3–6 sessions refine contour and texture.',
      result: 'Studies report around a 0.8-inch reduction in thigh circumference by 8 weeks.',
    },
  ];

  const doctors = [
    {
      name: 'Dr. Zaid Teebi',
      role: 'Lead Medical Consultant',
      placeholder: 'Dr. Zaid Teebi portrait',
      bio: 'More than 30 years in general medicine, geriatrics and allergy, with ACSM Sports Medicine certification, pain-management training at Harvard and allergy training at Imperial College London. Dr. Teebi leads every medical weight-loss consultation and prescribes each clinical plan.',
    },
    {
      name: 'Dr. Giovanni Scornavacca',
      role: 'Aesthetic Doctor',
      placeholder: 'Dr. Giovanni Scornavacca portrait',
      bio: 'An Italian aesthetic physician with over 20 years of experience and a focus on regenerative medicine, including PRP and stem-cell approaches — restoration rather than alteration.',
    },
    {
      name: 'Dr. Francesca Chircop',
      role: 'Aesthetic Doctor',
      placeholder: 'Dr. Francesca Chircop portrait',
      bio: 'London-trained with over 8 years of practice and a foundation in orthopaedic surgery, leading our Lip Flip and laser hair-removal treatments.',
    },
  ];

  return (
    <section>
      {/* Clinical research evidence grid */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading>The evidence behind the method</SectionHeading>
          <p className="mt-4 mb-12 text-center max-w-3xl mx-auto" style={pStyle}>
            Each part of the protocol is grounded in peer-reviewed research. We combine modalities deliberately — a multi-component approach consistently outperforms any single tool, and pairing nutrition with exercise keeps roughly 1.1 kg more weight off long term.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {evidence.map((e) => (
              <div key={e.modality} className="card p-6" style={{ borderLeftWidth: '4px', borderLeftColor: green }}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 style={{ color: greenDark, fontFamily: headingFont, fontSize: '17px', fontWeight: 400 }}>{e.modality}</h3>
                  <span
                    className="whitespace-nowrap rounded-full"
                    style={{ backgroundColor: softBg, color: greenDark, fontFamily: wideFont, fontSize: '10px', letterSpacing: '0.5px', padding: '4px 10px' }}
                  >
                    EVIDENCE: {e.strength}
                  </span>
                </div>
                <p className="mb-3" style={{ ...pStyle, fontSize: '14px' }}>{e.mechanism}</p>
                <p style={{ ...pStyle, fontSize: '14px', color: taupe, fontWeight: 600 }}>{e.result}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center max-w-2xl mx-auto" style={{ ...pStyle, fontSize: '13px', color: taupeLight, fontStyle: 'italic' }}>
            Lymphatic drainage is included as a recovery and comfort adjunct rather than a standalone fat-loss treatment.
          </p>
        </div>
      </div>

      {/* Medical team */}
      <div className="py-16" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #E8EEE6 50%, #ffffff 100%)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading>The doctors behind your plan</SectionHeading>
          <p className="mt-4 mb-12 text-center max-w-3xl mx-auto" style={pStyle}>
            &lsquo;Doctor-led&rsquo; is not a slogan here — your program is designed and supervised by qualified physicians.
          </p>

          {/* Lead doctor — prominent */}
          <article className="card grid grid-cols-1 md:grid-cols-3 gap-8 items-center p-8 mb-8" aria-label={`${doctors[0].name}, ${doctors[0].role}`}>
            <div className="md:col-span-1">
              <Placeholder label={doctors[0].placeholder} height="300px" />
            </div>
            <div className="md:col-span-2">
              <h3 style={{ color: greenDark, fontFamily: headingFont, fontSize: '24px', fontWeight: 400 }}>{doctors[0].name}</h3>
              <p className="mb-4" style={{ color: green, fontFamily: wideFont, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' }}>{doctors[0].role}</p>
              <p style={pStyle}>{doctors[0].bio}</p>
            </div>
          </article>

          {/* Supporting doctors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {doctors.slice(1).map((d) => (
              <article key={d.name} className="card p-7" aria-label={`${d.name}, ${d.role}`}>
                <h3 style={{ color: greenDark, fontFamily: headingFont, fontSize: '20px', fontWeight: 400 }}>{d.name}</h3>
                <p className="mb-3" style={{ color: green, fontFamily: wideFont, fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase' }}>{d.role}</p>
                <p style={{ ...pStyle, fontSize: '14px' }}>{d.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Slimming guide promo */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center p-8 md:p-12" style={{ borderRadius: '16px', background: panelGradient }}>
            <div className="w-full mx-auto" style={{ maxWidth: '360px' }}>
              <Placeholder label="Carisma Slimming Guide — e-book cover" height="340px" />
            </div>
            <div>
              <p style={{ color: green, fontFamily: wideFont, fontSize: '13px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Free resource</p>
              <h3 className="mt-2 mb-4" style={{ color: greenDark, fontFamily: headingFont, fontSize: '26px', fontWeight: 400 }}>
                The Carisma Slimming Guide
              </h3>
              <p className="mb-4" style={pStyle}>
                Discipline tends to fail under stress — so we built a structured system instead. Grounded in the physiology of appetite and behaviour, the guide is a practical reference for sustainable weight management.
              </p>
              <p className="mb-6" style={pStyle}>
                It covers when to eat, what to eat, how much, and even the order in which to eat it — drawn from years of clinical experience here in Malta.
              </p>
              <Link
                href="/slimming-guide"
                className="cta-glow inline-flex items-center justify-center font-bold text-white text-center min-h-[44px] transition-opacity duration-200 hover:opacity-90 active:opacity-80"
                style={{ padding: '14px 34px', fontFamily: wideFont, fontSize: '14px', letterSpacing: '0.5px' }}
              >
                READ THE GUIDE
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   6b. SOCIAL PROOF — client testimonials
   ============================================================ */
function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        'After menopause nothing I tried touched the weight around my middle. Six months in I have lost 14 kg, my bloods have improved and I still eat with my family on Sundays. The weekly check-ins kept me honest.',
      name: 'Marthese',
      detail: 'Lost 14 kg &middot; Attard',
    },
    {
      quote:
        'What sold me was the medical side — actual bloodwork and a doctor, not a one-size meal plan. The body scan showed I was losing fat and keeping muscle. I have never felt this in control of it.',
      name: 'Joseph',
      detail: 'Lost 9 kg in 12 weeks &middot; Sliema',
    },
    {
      quote:
        'I had failed every diet for ten years and assumed I would fail this too. The difference was the support — when I slipped, they reached out first. Down 11 kg and, for once, it is staying off.',
      name: 'Daniela',
      detail: 'Lost 11 kg &middot; Mosta',
    },
  ];

  return (
    <section className="py-16" aria-labelledby="testimonials-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Eyebrow>Real results from real clients</Eyebrow>
        <SectionHeading><span id="testimonials-heading">The change our clients feel first</span></SectionHeading>
        <p className="mt-4 mb-12 text-center max-w-2xl mx-auto" style={pStyle}>
          A small sample of the hundreds of people across Malta who came to us after everything else had stopped working.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <blockquote key={t.name} className="card-lift p-7 flex flex-col">
              <p aria-hidden="true" style={{ color: green, fontFamily: headingFont, fontSize: '13px', letterSpacing: '1px' }}>&#9733;&#9733;&#9733;&#9733;&#9733;</p>
              <span className="sr-only">5 stars</span>
              <p className="mt-3 mb-5 flex-1" style={{ ...pStyle, fontStyle: 'italic' }}>&ldquo;{t.quote}&rdquo;</p>
              <footer>
                <cite style={{ fontStyle: 'normal', color: greenDark, fontFamily: headingFont, fontSize: '16px', fontWeight: 400 }}>{t.name}</cite>
                <p style={{ color: taupeLight, fontFamily: wideFont, fontSize: '11px', letterSpacing: '0.5px', textTransform: 'uppercase' }} dangerouslySetInnerHTML={{ __html: t.detail }} />
              </footer>
            </blockquote>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <CTAButton label="START YOUR OWN RESULT" />
        </div>
        <div className="text-center mt-4">
          <CTAReassurance />
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   7. FAQ — accordion (interactive)
   ============================================================ */
function FAQSection() {
  // Shared single source of truth — also feeds the FAQPage JSON-LD in
  // app/weight-loss/layout.tsx so structured data matches visible content.
  const faqs = weightLossFaqs;

  const [open, setOpen] = useState<number | null>(0);
  const [query, setQuery] = useState('');

  // live FAQ answers render at 13px / 1.5
  const pStyle = { color: taupe, fontFamily: bodyFont, fontWeight: 400 as const, fontSize: '13px', lineHeight: 1.5 };
  const liStyle = { color: taupe, fontFamily: bodyFont, fontWeight: 400 as const, fontSize: '13px', lineHeight: 1.5 };

  const visible = faqs
    .map((f, i) => ({ f, i }))
    .filter(({ f }) => f.q.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <section className="py-24" style={{ backgroundColor: '#ffffff' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading + search */}
        <div className="mb-10">
          <h2 className="text-center" style={{ color: green, fontFamily: headingFont, fontWeight: 400, fontSize: '24px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Frequently Asked Questions About Medical Weight Loss in Malta
          </h2>
          <div className="mt-6 mx-auto" style={{ width: '256px', maxWidth: '100%' }}>
            <div className="flex items-center gap-2" style={{ borderBottom: `1px solid ${taupeLight}`, paddingBottom: '6px' }}>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Looking for something?"
                aria-label="Search frequently asked questions"
                className="w-full bg-transparent placeholder:text-[#6f6456]"
                style={{ color: taupe, fontFamily: bodyFont, fontSize: '15px' }}
              />
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={taupeLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          </div>
        </div>

        {/* Accordion */}
        <div role="list">
          {visible.map(({ f, i }) => {
            const isOpen = open === i;
            const panelId = `faq-panel-${i}`;
            const btnId = `faq-btn-${i}`;
            return (
              <div key={f.q} role="listitem" style={{ borderBottom: '1px solid #e6e6e1' }}>
                <button
                  type="button"
                  id={btnId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{ padding: '22px 4px', cursor: 'pointer', background: 'transparent' }}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span style={{ color: green, fontFamily: wideFont, fontSize: '15px', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', lineHeight: 1.4 }}>
                    {i + 1}. {f.q}
                  </span>
                  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={taupe} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  hidden={!isOpen}
                  style={{ padding: isOpen ? '0 4px 24px' : undefined }}
                >
                  {isOpen && (
                    <>
                      {f.intro && <p className="mb-4" style={pStyle}>{f.intro}</p>}
                      {f.bullets && (
                        <ul className="mb-4 space-y-2">
                          {f.bullets.map((b) => (
                            <li key={b} className="flex items-start gap-2" style={liStyle}>
                              <span style={bullet}>&bull;</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {f.paras && f.paras.map((p) => (
                        <p key={p} className="mb-4 last:mb-0" style={pStyle}>{p}</p>
                      ))}
                      {f.outro && <p style={pStyle}>{f.outro}</p>}
                    </>
                  )}
                </div>
              </div>
            );
          })}
          {visible.length === 0 && (
            <p className="text-center py-8" style={pStyle}>No questions match &ldquo;{query}&rdquo;.</p>
          )}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   7b. EVIDENCE BASED APPROACH — clinical research cards
   ============================================================ */
function EvidenceCard({ item }: { item: { title: string; strength: string; image: string; what: string; results: string[] } }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div style={{ position: 'relative', paddingTop: '16px', display: 'flex', flexDirection: 'column' }}>
      {/* Photo with floating badge */}
      <div style={{ position: 'relative', width: '92%', margin: '0 auto', zIndex: 2 }}>
        <div style={{ border: `2px solid ${green}`, borderRadius: '20px 80px', overflow: 'hidden', backgroundColor: '#eef3ea', position: 'relative', height: '186px' }}>
          <Image src={item.image} alt={item.title} fill style={{ objectFit: 'cover' }} loading="lazy" />
        </div>
        <span style={{ position: 'absolute', top: '-14px', left: '18px', backgroundColor: '#fff', color: green, fontFamily: wideFont, fontWeight: 600, fontSize: '12px', letterSpacing: '0.5px', textTransform: 'uppercase', padding: '7px 18px', borderRadius: '9999px', border: `2px solid ${green}`, whiteSpace: 'nowrap' }}>
          {item.strength}
        </span>
      </div>
      {/* Card body */}
      <div style={{ background: 'linear-gradient(180deg, #ffffff 0%, #F2F6EF 100%)', border: '1px solid #e8e2da', borderRadius: '16px', marginTop: '-70px', padding: '92px 30px 30px', position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ color: green, fontFamily: headingFont, fontWeight: 400, fontSize: '20px', lineHeight: 1.3, textTransform: 'uppercase', textAlign: 'center', margin: 0 }}>
          {item.title}
        </h3>
        <div style={{ width: '90px', height: '1px', backgroundColor: '#cfc8bf', margin: '16px auto 20px' }} />
        <p style={{ color: taupe, fontFamily: wideFont, fontWeight: 700, fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 8px' }}>What it does</p>
        <p style={{ color: taupe, fontFamily: bodyFont, fontSize: '14px', lineHeight: 1.6, margin: '0 0 6px', ...(expanded ? {} : { display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }) }}>
          {item.what}
        </p>
        {expanded && (
          <div>
            <p style={{ color: taupe, fontFamily: wideFont, fontWeight: 700, fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', margin: '14px 0 8px' }}>Key results</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {item.results.map((r) => (
                <li key={r} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <span style={{ color: green, flexShrink: 0, marginTop: '4px' }}>•</span>
                  <span style={{ color: taupe, fontFamily: bodyFont, fontSize: '13.5px', lineHeight: 1.7 }}>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          style={{ marginTop: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: taupe, fontFamily: bodyFont, fontSize: '15px', fontStyle: 'italic', textDecoration: 'underline', padding: '8px 0', display: 'block', minHeight: '44px' }}
        >
          {expanded ? 'Read less' : 'Read more'}
        </button>
      </div>
    </div>
  );
}

function EvidenceApproachSection() {
  const items = [
    {
      title: 'Energy-Restricted Mediterranean Nutrition',
      strength: 'High Evidence',
      image: '/Clams.png',
      what: 'A daily energy reduction of 500–750 kcal structured around a Mediterranean eating pattern — the most evidence-backed approach to sustainable fat loss.',
      results: [
        'PREDIMED-Plus trial: Mediterranean-style energy-restricted diet produced 3.2 kg loss at 12 months vs 0.7 kg in the control group.',
        'Major obesity guidelines recommend targeting 0.5–1 kg per week of weight loss as a safe, sustainable rate.',
        '33.7% of participants achieved at least 5% body weight loss versus 11.9% in the control group.',
      ],
    },
    {
      title: 'Higher-Protein, Muscle-Protective Diet',
      strength: 'High Evidence',
      image: '/Cooking.png',
      what: 'Raising protein intake within a calorie deficit preserves lean muscle mass and improves satiety — so the weight you lose stays off.',
      results: [
        'Meta-analysis of 47 trials (n=3218) found higher protein significantly reduced muscle mass loss during weight loss programs (SMD 0.75).',
        'Without structured protein support, people typically lose 1–2.5 kg of muscle for every 10 kg of weight lost.',
        'Higher protein diets consistently improve fullness and reduce total calorie intake without calorie counting.',
      ],
    },
    {
      title: 'Diet Plus Structured Exercise',
      strength: 'High Evidence',
      image: '/Diet.png',
      what: 'Combining structured movement with a food plan delivers significantly better long-term results than diet alone — including up to 2 years later.',
      results: [
        'Diet-plus-exercise programs produced an additional 1.1 kg of weight loss on average compared with diet alone at long-term follow-up.',
        'Obesity guidelines from major societies recommend multi-component programs combining calorie deficit with structured activity.',
        'Exercise protects metabolic rate during weight loss, reducing the risk of weight regain.',
      ],
    },
    {
      title: 'Cryolipolysis (CoolSculpting)',
      strength: 'Moderate–High Evidence',
      image: '/wix/87fc13_6d89e9c129304617a960aa46bb07eed4~mv2.jpg',
      what: 'Applies controlled cooling to selectively injure subcutaneous fat cells, which are then cleared naturally, reducing local fat thickness in targeted areas.',
      results: [
        'Systematic review reports average ultrasound-measured fat layer reductions of 10–26% after a treatment series.',
        'Caliper reductions up to 28.5% with mild, transient side effects only.',
        'Prospective data confirm cryolipolysis as safe and effective for local abdominal fat reduction with high satisfaction rates.',
      ],
    },
    {
      title: 'HIFEM + RF Body Sculpting (Emsculpt NEO)',
      strength: 'Emerging High-Quality Evidence',
      image: '/wix/87fc13_d79664fae1184e8e8c947c3d350af498~mv2.jpg',
      what: 'Combines high-intensity focused electromagnetic pulses with radiofrequency heating to build muscle and reduce fat simultaneously in a single session.',
      results: [
        'Clinical data reports average 25–30% increases in muscle mass and 25–30% reductions in subcutaneous fat in treated regions.',
        'MRI and ultrasound studies confirm significant improvements in abdominal muscle thickness and fat layer reduction.',
        'Works best alongside a calorie deficit and lifestyle change for compounded results.',
      ],
    },
    {
      title: 'Why We Combine All Approaches',
      strength: 'Synergy',
      image: '/wix/87fc13_440425b61c66444abe7e3062dbfcd290~mv2.jpg',
      what: 'Targeting weight, hormones, muscle, fat and skin together instead of relying on any single tool consistently outperforms one-dimensional approaches.',
      results: [
        'Long-term meta-analysis shows combined diet-plus-exercise programs maintain 1.1 kg more weight loss than diet alone at extended follow-up.',
        'Multi-component interventions recommended by all major obesity guidelines for both fat loss and long-term weight maintenance.',
        'Pairing treatments with nutrition and exercise creates compounding effects that no single intervention achieves alone.',
      ],
    },
  ];

  return (
    <section className="py-24" aria-labelledby="evidence-approach-heading" style={{ backgroundColor: '#ffffff' }}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '1100px' }}>
        <p className="text-center mb-2" style={{ color: taupe, fontFamily: wideFont, fontSize: '16px', fontWeight: 600, letterSpacing: '3.2px', textTransform: 'uppercase' }}>
          Clinical research: basis of our methodology
        </p>
        <div className="mx-auto mb-4" style={{ width: '110px', height: '1px', backgroundColor: '#B9A99E' }} />
        <h2 id="evidence-approach-heading" className="text-center mb-14" style={{ color: green, fontFamily: headingFont, fontWeight: 400, fontSize: '25px', textTransform: 'uppercase', letterSpacing: '1px' }}>
          The Evidence-Based Approach Behind Our Weight Loss Programme
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {items.map((item) => (
            <EvidenceCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   8. FINAL CTA + brand band
   ============================================================ */
function FinalCTASection() {
  const whyCarisma = [
    'Created by the team behind Malta&rsquo;s leading spa and medical-aesthetics centres.',
    'Doctor-led medical slimming — not a salon-style diet program.',
    'One approach covering assessment, nutrition, movement and treatments.',
    'High-touch support with weekly check-ins and coaching between visits.',
  ];

  return (
    <section>
      {/* Why Malta chooses Carisma + final CTA */}
      <div className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Eyebrow>Your next step</Eyebrow>
          <SectionHeading>Book Your Free Body Analysis — Malta&apos;s Doctor-Led Weight Loss Programme</SectionHeading>
          <p className="mt-4 mb-2 max-w-2xl mx-auto" style={pStyle}>
            We take on a limited number of new clients each month so every plan stays genuinely doctor-led.{' '}
            <Link href="/consultation" style={{ color: green, textDecoration: 'underline' }}>Book your free, no-obligation assessment</Link> and we&apos;ll tell you honestly whether the program is right for you.
          </p>
          <ul className="mt-10 mb-10 space-y-3 inline-block text-left">
            {whyCarisma.map((t) => (
              <li key={t} className="flex items-start gap-3" style={liStyle}>
                <Check />
                <span dangerouslySetInnerHTML={{ __html: t }} />
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <CTAButton />
            <PhoneButton />
          </div>
          <CTAReassurance className="mt-5" />
          <p className="mt-3" style={{ color: taupeLight, fontFamily: bodyFont, fontSize: '14px' }}>
            Complimentary on-site parking.
          </p>
        </div>
      </div>

      {/* Brand heritage band */}
      <div className="py-14" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #E6EFE3 50%, #ffffff 100%)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p style={{ color: green, fontFamily: wideFont, fontSize: '13px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
            Carisma Wellness Group
          </p>
          <h3 className="mt-2 mb-6" style={{ color: greenDark, fontFamily: headingFont, fontSize: '24px', fontWeight: 400 }}>
            <CountUp value="35+" /> years in wellness, aesthetics &amp; slimming
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://www.carismaspa.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discover our spas — Carisma Spa (opens in new tab)"
              className="btn btn-secondary font-bold text-center inline-flex items-center justify-center min-h-[44px] transition-opacity duration-200 hover:opacity-90 active:opacity-80"
              style={{ padding: '12px 28px', fontFamily: wideFont, fontSize: '13px', letterSpacing: '0.5px', textTransform: 'uppercase' }}
            >
              Discover our spas
            </a>
            <a
              href="https://www.carismaspa.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discover Carisma medical aesthetics (opens in new tab)"
              className="btn btn-secondary font-bold text-center inline-flex items-center justify-center min-h-[44px] transition-opacity duration-200 hover:opacity-90 active:opacity-80"
              style={{ padding: '12px 28px', fontFamily: wideFont, fontSize: '13px', letterSpacing: '0.5px', textTransform: 'uppercase' }}
            >
              Discover med-aesthetics
            </a>
          </div>
        </div>
      </div>

      {/* Contact info — using div to avoid nesting footer inside section which conflicts with outer layout footer */}
      <div className="py-12" style={{ backgroundColor: '#fff', borderTop: `1px solid #e0e0e0` }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center" style={{ color: taupe, fontFamily: bodyFont, fontSize: '14px' }}>
          <p className="mb-2">
            <a href={`tel:${phoneNumber.replace(/\s/g, '')}`} aria-label={`Call us at ${phoneNumber}`} style={{ color: slate, fontWeight: 600, textDecoration: 'underline' }}>{phoneNumber}</a>
            <span className="mx-2" aria-hidden="true">&middot;</span>
            <a href="mailto:info@carismaslimming.com" style={{ color: slate, fontWeight: 600, textDecoration: 'underline' }}>info@carismaslimming.com</a>
          </p>
          <p className="mb-4">
            <a href="https://www.instagram.com/carismaslimming" target="_blank" rel="noopener noreferrer" aria-label="Follow Carisma Slimming on Instagram (opens in new tab)" style={{ color: slate, textDecoration: 'underline' }}>@carismaslimming</a>
            <span className="mx-2" aria-hidden="true">&middot;</span>
            <a href="https://www.facebook.com/carismaslimming" target="_blank" rel="noopener noreferrer" aria-label="Carisma Slimming on Facebook (opens in new tab)" style={{ color: slate, textDecoration: 'underline' }}>Facebook</a>
          </p>
          <p style={{ color: taupe, fontSize: '13px' }}>
            <a href="/privacy-policy" style={{ color: slate, textDecoration: 'underline' }}>Privacy Policy</a>
            <span className="mx-2" aria-hidden="true">&middot;</span>
            <a href="/terms-conditions" style={{ color: slate, textDecoration: 'underline' }}>Terms &amp; Conditions</a>
          </p>
        </div>
      </div>
    </section>
  );
}

/* Persistent action bar — keeps the primary conversion one tap away on long scroll */
/* ============================================================
   PAGE
   ============================================================ */
const jsonLd = [
  breadcrumbList([
    { name: 'Home', url: `${SITE_URL}/` },
    { name: 'Medical Weight Loss', url: `${SITE_URL}/weight-loss` },
  ]),
  serviceSchema({
    name: 'Medical Weight Loss Programme',
    description:
      'Doctor-led medical weight loss programme in Malta combining GLP-1 medication support, personalised nutrition, body composition tracking and ongoing medical supervision.',
    url: `${SITE_URL}/weight-loss`,
    serviceType: 'Medical weight loss',
  }),
  faqPage(weightLossFaqs.map((f) => ({ q: f.q, a: flattenWeightLossAnswer(f) }))),
];

export default function WeightLossProgramPage() {
  return (
    <main className="w-full" style={{ backgroundColor: '#fff' }}>
      <JsonLd data={jsonLd} />
      <HeroSection />
      <ProblemAgitationSection />
      <CorePillarsSection />
      <ProgramOverviewSection />
      <CarismaDifferenceSection />
      <OurPromiseSection />
      <FAQSection />
      <EvidenceApproachSection />
    </main>
  );
}
