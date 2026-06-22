import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import WhyDietsFail from './WhyDietsFail';
import OutcomesShowcase from './OutcomesShowcase';
import MethodPillars from './MethodPillars';
import InsideTheGuide from './InsideTheGuide';
import { JsonLd } from '@/lib/seo/JsonLd';
import { SITE_URL, breadcrumbList, medicalWebPage } from '@/lib/seo/schema';
import BookConsultationButton from '@/components/BookConsultationButton';
import MotifAccent from '@/components/layers/MotifAccent';

export const metadata: Metadata = {
  title: "Carisma Slimming Guide | Malta's #1 Weight-Loss Clinic",
  description: "The Carisma Slimming Guide — a doctor-backed behaviour system with Maltese recipes, meal timing, and portion guidance. No calorie counting. Only €30.",
  alternates: { canonical: 'https://www.carismaslimming.com/slimming-guide' },
  openGraph: {
    title: "Carisma Slimming Guide | Malta's #1 Weight-Loss Clinic",
    description: "The Carisma Slimming Guide — a doctor-backed behaviour system with Maltese recipes, meal timing, and portion guidance. No calorie counting. Only €30.",
    url: 'https://www.carismaslimming.com/slimming-guide',
    images: [{ url: '/background.avif', width: 1200, height: 630, alt: 'Carisma Slimming Guide Malta' }],
  },
};

const jsonLd = [
  breadcrumbList([
    { name: 'Home', url: `${SITE_URL}/` },
    { name: 'Slimming Guide', url: `${SITE_URL}/slimming-guide` },
  ]),
  medicalWebPage({
    name: 'Free Slimming Guide Malta — Your Weight Loss Bible',
    description:
      "The definitive weight loss resource for Malta. Doctor-led advice on diet, exercise, GLP-1 medication and body contouring from Carisma Slimming.",
    url: `${SITE_URL}/slimming-guide`,
  }),
];

const PRODUCT_URL =
  'https://www.carismaslimming.com/product-page/the-carisma-slimming-weight-loss-guide-malta';

const forYou = [
  "You've tried dieting before, and it didn't stick",
  "You don't want to count calories or track macros",
  'You want a method that fits around a real life, not a perfect one',
  "You're tired of starting over every Monday",
  'You want to understand food, not just follow rules',
  "You're ready for something that lasts, not just something that starts well",
];

const notForYou = [
  'You want a quick fix or a 7-day crash diet',
  "You're looking for a calorie-counting app or macro tracker",
  'You want someone to tell you exactly what to eat every single day',
  "You're not willing to change how you think about food",
  'You expect results without adjusting any habits',
  "You're looking for a meal plan, not a method",
  'You believe willpower should be enough',
];

const carismaCommitments: ReactNode[] = [
  'Visible inch loss and shape change, not vague promises',
  'Plans that work with your age, hormones and metabolism',
  'No crash diets, no banned foods, no endless hours of cardio',
  <>Medical grade technology and <Link href="/packages" style={{ color: '#406042', textDecoration: 'underline' }}>treatments</Link> delivered by trained professionals</>,
];

const whyCarisma: ReactNode[] = [
  "Created by the team behind Malta's leading spa and medical aesthetics centres",
  <>Doctor led <Link href="/weight-loss" style={{ color: '#406042', textDecoration: 'underline' }}>medical slimming</Link>, not a beauty salon &quot;diet program&quot;</>,
  <>All in one approach: assessment, nutrition, movement and <Link href="/packages" style={{ color: '#406042', textDecoration: 'underline' }}>treatments</Link></>,
  'High touch support with weekly check ins and WhatsApp coaching',
];

const headingFont = 'Trajan Pro, serif';
// Page-local font mapping: the woff2 named "normal" is the heavy face and the one
// named "medium" is the light Book face, so map 400 -> medium file, 700 -> normal file
// to match the live site (regular text light, <strong> heavy).
const wideFont = 'Novecento Wide Guide, Novecento Wide Book, Novecento Wide, sans-serif';
const localFontCss = `
@font-face{font-family:'Novecento Wide Guide';src:url('/fonts/novecento-wide-medium.woff2') format('woff2');font-weight:400;font-style:normal;font-display:swap;}
@font-face{font-family:'Novecento Wide Guide';src:url('/fonts/novecento-wide-normal.woff2') format('woff2');font-weight:500 700;font-style:normal;font-display:swap;}
/* Visible focus indicator for CTA links — works on both light sections and dark/sage
   button fills: white outline (>=3:1 vs the sage/blue fill) + deep-sage halo (>=3:1 vs white). */
.cta-glow:focus-visible{outline:3px solid #ffffff;outline-offset:2px;box-shadow:0 0 0 6px #4f7256;border-radius:999px;}
`;
const bodyFont = 'Roboto, sans-serif';
// --- WCAG AA-corrected palette (single source of truth for this page) ---
// Bright brand colors (#8EB093 sage, #9B8D83 taupe, #6391AB blue) failed AA as text
// on white/light-sage backgrounds. Replaced with darker same-family hexes that clear AA/AAA.
const GREEN = '#406042'; // deep brand sage for TEXT/headings on white & light-sage (>=4.5:1)
const GREEN_FILL = '#4f7256'; // CTA/button solid fill — white text clears 5.42:1 (AA)
const GREEN_SAGE_LIGHT = '#C9E0CC'; // light sage for text over the scrimmed hero (>=4.5:1)
const TAUPE = '#5f5649'; // darkened taupe for body/muted text — clears AA (>=4.92:1) on white & EVERY light-sage card on this page

function Kicker({ children, centered = false, rule = false }: { children: ReactNode; centered?: boolean; rule?: boolean }) {
  return (
    <div className={centered ? 'flex flex-col items-center' : ''}>
      <p
        className="uppercase mb-2"
        style={{ color: TAUPE, fontFamily: wideFont, fontSize: '16px', letterSpacing: '3.2px' }}
      >
        {children}
      </p>
      {rule && <div className="mb-2" style={{ width: '160px', height: '1px', backgroundColor: '#C9C0B8' }} />}
    </div>
  );
}

function GoogleReviewsRow({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      <img
        src="/wix/87fc13_c507b5f7e86f4eed970b757bc84a8ec4~mv2.png"
        alt="Google"
        style={{ width: '23px', height: '23px', objectFit: 'contain' }}
      />
      {[0, 1, 2, 3, 4].map((i) => (
        <img
          key={i}
          src="/wix/87fc13_2de846da7d374b24984ad15221cae0bd~mv2.png"
          alt=""
          style={{ width: '23px', height: '20px', objectFit: 'contain' }}
        />
      ))}
      <span
        className="ml-2"
        style={{ color: light ? GREEN_SAGE_LIGHT : GREEN, fontFamily: bodyFont, fontSize: '16px' }}
      >
        Over 800+ Reviews
      </span>
    </div>
  );
}

export default function SlimmingGuidePage() {
  return (
    <main className="w-full" style={{ fontFamily: bodyFont, color: TAUPE }}>
      <JsonLd data={jsonLd} />
      <style dangerouslySetInnerHTML={{ __html: localFontCss }} />
      {/* Hero — homepage PageHero design (light sage gradient, fits 100svh, no scroll) */}
      <PageHero
        eyebrow="Recipes, meal timing & a structured plan"
        headline={[
          { text: 'The Weight-Loss Guide' },
          { text: 'Built for Maltese Life', em: true },
        ]}
        sub="A doctor-backed system you can actually follow — no crash diets, no calorie counting. For only €30."
        bullets={[
          { label: 'What to eat —', text: 'and what to swap, using local Maltese ingredients.' },
          { label: 'When to eat —', text: 'simple meal timing that fits your schedule.' },
          { text: '30+ recipes built for the Mediterranean kitchen.' },
          { text: 'A structure that works around social dinners and busy days.' },
        ]}
        primaryCta={{ text: 'Get the Slimming Guide', href: PRODUCT_URL, external: true }}
        media={{ type: 'image', src: '/wix/f940f0_a2ae67089c094ea4a1ed8c7a81f3c315~mv2.webp', alt: 'The Carisma Slimming Guide book', fit: 'contain', bg: 'linear-gradient(160deg, #eef3ea 0%, #dde7d6 100%)', aspect: '4 / 5' }}
        proof={{ rating: '4.9', reviews: '800+', awardSrc: '/wix/87fc13_228c6751ef5a4644bdb0b46e7719692f~mv2.png', awardText: '#1 voted clinic\nMalta', statValue: '30+', statLabel: 'recipes inside' }}
        compactHeadline
        motif
      />

      {/* Why Diets Fail — editorial redesign */}
      <WhyDietsFail />

      {/* What This Is — two-column: calm statement + a 3D page render */}
      <section className="bg-white" style={{ padding: 'clamp(64px, 10vw, 110px) 0' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center" style={{ gap: 'clamp(32px, 6vw, 72px)' }}>
            {/* Left — statement */}
            <div>
              <Kicker rule>WHAT THIS IS</Kicker>
              <h2
                className="uppercase"
                style={{ color: GREEN, fontFamily: headingFont, fontWeight: 400, fontSize: 'clamp(24px, 3.2vw, 31px)', lineHeight: 1.3, margin: '0 0 12px' }}
              >
                A behaviour-based weight loss system, not another diet.
              </h2>
              <p
                className="uppercase"
                style={{ color: TAUPE, fontFamily: wideFont, fontSize: '13px', letterSpacing: '2.5px', margin: '0 0 28px' }}
              >
                Built to hold — not a quick fix.
              </p>
              <p style={{ color: TAUPE, fontSize: '15px', lineHeight: 1.8, margin: '0 0 18px' }}>
                Not a challenge. Not a 30-day reset. Not a system that requires you to be a different person to use it.
                The Carisma Slimming Guide is a behaviour system — built from real clinic practice, designed for the
                life you actually have. It complements our{' '}
                <Link href="/weight-loss" style={{ color: GREEN, textDecoration: 'underline' }}>medical weight loss programme</Link>{' '}
                and{' '}
                <Link href="/glp1" style={{ color: GREEN, textDecoration: 'underline' }}>GLP-1 injections</Link>{' '}
                for those who want clinical support alongside the habit system.
              </p>
              <p style={{ color: TAUPE, fontSize: '15px', lineHeight: 1.8, margin: 0 }}>
                The principle it runs on: what you can repeat consistently will always outperform what you can do once
                brilliantly. Not the perfect week — a structure stable enough to survive the imperfect one.
              </p>
            </div>
            {/* Right — myth/truth page render */}
            <div className="flex justify-center">
              <Image
                src="/wix/f940f0_04682b1e57084d5bb6306b1bb52d3534~mv2.webp"
                alt="A page from the Carisma Slimming Guide — myth vs truth"
                width={480}
                height={360}
                sizes="(max-width: 768px) 80vw, 420px"
                style={{ width: '100%', maxWidth: '420px', height: 'auto', transform: 'rotate(3deg)', filter: 'drop-shadow(0 28px 50px rgba(40,60,44,0.18))' }}
              />
            </div>
          </div>

          {/* statement + CTA, centered below */}
          <div className="text-center" style={{ marginTop: 'clamp(44px, 7vw, 72px)' }}>
            <div className="mx-auto" style={{ maxWidth: '560px', marginBottom: '40px' }}>
              <div className="mx-auto mb-7" style={{ width: '40px', height: '1px', background: GREEN }} />
              <p
                className="uppercase"
                style={{ color: GREEN, fontFamily: headingFont, fontWeight: 400, fontSize: 'clamp(16px, 2vw, 20px)', lineHeight: 1.5, letterSpacing: '0.04em' }}
              >
                Adherence over perfection. Structure over willpower.
              </p>
              <div className="mx-auto mt-7" style={{ width: '40px', height: '1px', background: GREEN }} />
            </div>
            <p style={{ color: TAUPE, fontSize: '15px', lineHeight: 1.8, margin: '0 0 32px', maxWidth: '620px', marginLeft: 'auto', marginRight: 'auto' }}>
              That is what this guide builds. When the structure holds, weight loss stops being something you fight
              for. It becomes a result that follows.
            </p>
            <a
              href={PRODUCT_URL}
              className="cta-glow inline-block text-center uppercase text-white"
              style={{ borderRadius: '999px', padding: '14px 40px', fontFamily: wideFont, fontSize: '15px', fontWeight: 700, letterSpacing: '1.5px', textDecoration: 'none' }}
            >
              Get the Slimming Guide &nbsp;›
            </a>
          </div>
        </div>
      </section>

      {/* Method Section — homepage pillars design + scroll-in stagger */}
      <MethodPillars />

      {/* Inside the Guide — 3D page renders showcase (recipes / method / myth-truth) */}
      <InsideTheGuide />

      {/* Success Outcomes — redesigned card showcase */}
      <OutcomesShowcase />

      {/* Stabilise Band — light on-brand statement band (no dark-green bg). Starts on
          the sage wash above and resolves to white so the section below flows. */}
      <section
        style={{ background: '#ffffff', padding: '64px 0' }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p
            className="uppercase"
            style={{ color: GREEN, fontFamily: wideFont, fontSize: '30px', lineHeight: 1.4 }}
          >
            WHEN THESE FOUR FOUNDATIONS <strong>STABILISE</strong>
            <br />
            WEIGHT LOSS BECOMES <strong>A NATURAL OUTCOME</strong>.
          </p>
        </div>
      </section>

      {/* Designed for Malta Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <Kicker centered rule>DESIGNED FOR MALTA</Kicker>
            <h2
              className="uppercase"
              style={{ color: GREEN, fontFamily: headingFont, fontWeight: 400, fontSize: '28px', lineHeight: 1.5 }}
            >
              a slimming guide designed for maltese culture — festas, family tables, and all.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-10 items-start mb-10">
            {/* Left text column */}
            <div>
              <p style={{ color: TAUPE, fontSize: '14px' }}>
                Maltese life is specific. You know what it looks like.
              </p>
              <p className="mb-4" style={{ color: TAUPE, fontSize: '14px' }}>
                Sunday lunch that runs until four. Dinners that start late and finish later. Tables where plates are
                shared and seconds are expected. Restaurants where the bread arrives before you have time to decide.
                Weeks that collapse in on themselves before Thursday.
              </p>
              <p style={{ color: TAUPE, fontSize: '14px' }}>
                This method was not built to fight that. It was built to design around it. The guide does not ask you
                to decline the dinner. It does not ask you to order a side salad while everyone else eats. It does
                not ask you to bring your own food, track the restaurant&apos;s macros, or explain yourself to the
                table.
              </p>
            </div>
            {/* Right petal card */}
            <div
              className="card px-8 pt-7 pb-9"
              style={{
                background: 'linear-gradient(135deg, #F8F6F0 0%, #E9EEE5 40%, #CBDCC9 100%)',
                borderRadius: '16px 70px 16px 90px',
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/wix/87fc13_59346c1121b34e759ebf20eba3054c8c~mv2.png"
                  alt=""
                  role="presentation"
                  style={{ width: '23px', height: '23px', objectFit: 'contain' }}
                />
                <p className="uppercase" style={{ color: TAUPE, fontSize: '18px', fontWeight: 700 }}>
                  FRIDAY EVENING, MALTA
                </p>
              </div>
              <p style={{ color: TAUPE, fontSize: '14px', lineHeight: 1.45, paddingLeft: '36px' }}>
                You sit down. You eat protein first when you can. You enjoy the pasta. You enjoy the conversation.
                You come home. Saturday morning you return at your next meal. No guilt. No compensation. No extra
                restriction. No mental negotiation about what you earned or owe. You simply return.
              </p>
            </div>
          </div>
          <p style={{ color: TAUPE, fontSize: '15px' }}>
            That is the system. Rhythm, interrupted and resumed. Not perfection. Just the structure, picked back
            up.
          </p>
          {/* Recipe page render — the actual recipes inside the guide */}
          <div className="flex justify-center my-10 lg:my-14">
            <Image
              src="/wix/f940f0_ba288e10728a451e8acef9cbbaeaf46a~mv2.webp"
              alt="A recipe page from the Carisma Slimming Guide — Cottage Cheese, Tomato & Egg Plate"
              width={750}
              height={500}
              sizes="(max-width: 768px) 90vw, 560px"
              style={{ width: '100%', maxWidth: '560px', height: 'auto', transform: 'rotate(-2deg)', filter: 'drop-shadow(0 30px 55px rgba(40,60,44,0.18))' }}
            />
          </div>
          <p className="mb-10 lg:mb-[88px]" style={{ color: TAUPE, fontSize: '15px' }}>
            The guide includes recipes built for real Maltese kitchens. Practical, familiar dishes built within
            the method so they work without adaptation. Nothing aspirational. Nothing that requires ingredients
            you would not already have. When you are ready to accelerate results in the clinic, explore our{' '}
            <Link href="/packages/fat-freezing" style={{ color: GREEN, textDecoration: 'underline' }}>
              fat freezing
            </Link>
            ,{' '}
            <Link href="/packages/anti-cellulite" style={{ color: GREEN, textDecoration: 'underline' }}>
              anti-cellulite
            </Link>
            , and{' '}
            <Link href="/packages/lymphatic-drainage" style={{ color: GREEN, textDecoration: 'underline' }}>
              lymphatic drainage
            </Link>{' '}
            treatments.
          </p>
          <div className="flex justify-center mb-12 lg:mb-[185px]">
            <p
              className="uppercase"
              style={{
                color: TAUPE,
                fontFamily: wideFont,
                fontSize: '15px',
                borderLeft: `3px solid ${GREEN}`,
                paddingLeft: '16px',
              }}
            >
              We do not fight culture here. We design around it.
            </p>
          </div>
          {/* 'Most people who come to us...' — aspirational pull-quote, no container */}
          <div className="mt-16 lg:mt-24 text-center mx-auto" style={{ maxWidth: '760px' }}>
            <div className="mx-auto mb-8" style={{ width: '44px', height: '2px', background: GREEN }} />
            <p style={{ color: TAUPE, fontFamily: bodyFont, fontSize: 'clamp(17px, 2vw, 22px)', lineHeight: 1.65, fontWeight: 300 }}>
              Most people who come to us have already tried something. A diet that worked for a while. An app they stopped opening. A plan that felt right until life got in the way.
            </p>
            <p className="uppercase" style={{ color: GREEN, fontFamily: headingFont, fontWeight: 400, fontSize: 'clamp(22px, 2.9vw, 32px)', lineHeight: 1.3, marginTop: '26px' }}>
              This guide was written for what comes after that.
            </p>
          </div>
        </div>
      </section>

      {/* Is This For You Section — flows white → soft sage into the final CTA band. */}
      <section className="py-24" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F5F8F2 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Kicker centered rule>before you start</Kicker>
            <h2
              className="uppercase"
              style={{ color: GREEN, fontFamily: headingFont, fontWeight: 400, fontSize: '28px' }}
            >
              is this weight loss guide right for you?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div
              className="card p-9"
              style={{
                background: 'linear-gradient(180deg, #F7F5F0 0%, #E3EADF 45%, #C9DAC8 100%)',
                borderRadius: '90px 30px 90px 30px',
                boxShadow: '0 6px 16px rgba(0,0,0,0.07)',
              }}
            >
              <div className="flex items-center gap-7 mb-5">
                <h3 className="uppercase" style={{ color: TAUPE, fontSize: '17px', fontWeight: 700 }}>
                  this weight loss guide is for you if
                </h3>
                <img
                  src="/wix/87fc13_59346c1121b34e759ebf20eba3054c8c~mv2.png"
                  alt=""
                  role="presentation"
                  style={{ width: '34px', height: '34px', objectFit: 'contain' }}
                />
              </div>
              <ul className="list-disc pl-5" style={{ maxWidth: '400px' }}>
                {forYou.map((item) => (
                  <li
                    key={item}
                    className="uppercase"
                    style={{ color: GREEN, fontSize: '16px', lineHeight: '30px' }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="card p-9"
              style={{
                background: 'linear-gradient(180deg, #F7F5F0 0%, #E3EADF 45%, #C9DAC8 100%)',
                borderRadius: '90px 30px 90px 30px',
                boxShadow: '0 6px 16px rgba(0,0,0,0.07)',
              }}
            >
              <div className="flex items-center gap-7 mb-5">
                <h3 className="uppercase" style={{ color: TAUPE, fontSize: '17px', fontWeight: 700 }}>
                  this slimming guide is not for you if
                </h3>
                <img
                  src="/wix/87fc13_50f34e909595497794177a54bdb32314~mv2.png"
                  alt=""
                  role="presentation"
                  style={{ width: '34px', height: '34px', objectFit: 'contain' }}
                />
              </div>
              <ul className="list-disc pl-5" style={{ maxWidth: '400px' }}>
                {notForYou.map((item) => (
                  <li
                    key={item}
                    className="uppercase"
                    style={{ color: GREEN, fontSize: '16px', lineHeight: '30px' }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex justify-center mt-14 lg:mt-[88px]">
            <p
              className="uppercase"
              style={{
                color: TAUPE,
                fontFamily: wideFont,
                fontSize: '13px',
                lineHeight: 1.6,
                maxWidth: '640px',
                borderLeft: `3px solid ${GREEN}`,
                paddingLeft: '16px',
              }}
            >
              By the end, you will not have a list of rules to follow. You will have a way of thinking about food
              that holds, even on the weeks that don&apos;t. Want personalised guidance?{' '}
              <Link href="/consultation" style={{ color: GREEN, textDecoration: 'underline', textTransform: 'none' }}>
                Book a free consultation
              </Link>{' '}
              and we will build a plan around you.
            </p>
          </div>
        </div>
      </section>


      {/* Final Call-to-Action Section — light on-brand band (no dark-green bg). Starts on
          the sage wash above and resolves to white so the section below flows. */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: '#ffffff' }}
      >
        {/* Single Layers watermark — decorative motif behind CTA content (no blob
            here because this band has a .cta-glow button). */}
        <MotifAccent
          mode="watermark"
          className="hidden md:block"
          style={{ position: 'absolute', left: '-3%', bottom: '-10%', zIndex: 0 }}
        />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative" style={{ zIndex: 1 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left — heading, copy, CTA, reviews */}
            <div>
              <h2
                className="uppercase"
                style={{ color: GREEN, fontFamily: headingFont, fontWeight: 400, fontSize: '30px', lineHeight: 1.3 }}
              >
                GET THE CARISMA
                <br />
                SLIMMING GUIDE — €30
              </h2>
              <div className="mt-3 mb-6" style={{ width: '180px', height: '1px', backgroundColor: GREEN_FILL }} />
              <p className="mb-4" style={{ color: TAUPE, fontSize: '14px', maxWidth: '340px' }}>
                If you have read this far, you already know something is different here. This is not another plan
                asking you to be perfect. It is a structure asking you to return.
              </p>
              <p className="mb-7" style={{ color: TAUPE, fontSize: '14px', maxWidth: '340px' }}>
                Choosing this for yourself is not indulgent. It is practical. The structure you have been missing
                does not appear on its own. This is where it starts. Pair it with our{' '}
                <Link href="/packages/fat-dissolving" style={{ color: GREEN, textDecoration: 'underline' }}>
                  fat dissolving injections
                </Link>
                ,{' '}
                <Link href="/packages/muscle-stimulation" style={{ color: GREEN, textDecoration: 'underline' }}>
                  muscle stimulation
                </Link>
                , or{' '}
                <Link href="/packages/skin-tightening" style={{ color: GREEN, textDecoration: 'underline' }}>
                  skin tightening
                </Link>{' '}
                treatments for accelerated results.
              </p>
              <a
                href={PRODUCT_URL}
                className="cta-glow block text-center uppercase text-white mb-7"
                style={{
                  borderRadius: '999px',
                  maxWidth: '370px',
                  padding: '11px 24px',
                  fontFamily: wideFont,
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '1.5px',
                }}
              >
                Get Slimming Guide &nbsp;›
              </a>
              <GoogleReviewsRow />
            </div>
            {/* Right — guide mockup (in-flow below lg; large absolute version on desktop) */}
            <div className="flex justify-center lg:hidden">
              <img
                src="/wix/f940f0_05727f0f2b8049c69b8b60ee2cf16360~mv2.webp"
                alt="Preview pages from the Carisma Slimming Guide"
                style={{ width: '100%', maxWidth: '560px', aspectRatio: '964 / 752', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
        {/* Large scattered-pages mockup pinned to the right half (desktop) */}
        <img
          src="/wix/f940f0_05727f0f2b8049c69b8b60ee2cf16360~mv2.webp"
          alt=""
          className="hidden lg:block absolute pointer-events-none"
          style={{ left: '433px', top: '-64px', width: '964px', height: '752px', objectFit: 'contain' }}
        />
      </section>

    </main>
  );
}
