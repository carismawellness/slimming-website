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
import CountUp from '@/components/CountUp';

export const metadata: Metadata = {
  title: "Weight Loss Guide Malta | Behaviour System + 50+ Recipes | Carisma Slimming",
  description: "The Carisma Slimming Guide — a doctor-backed behaviour system with 50+ Maltese recipes, meal timing, and portion guidance. No calorie counting. Only €30. Designed for sustainable weight loss in Malta.",
  alternates: { canonical: 'https://www.carismaslimming.com/slimming-guide' },
  openGraph: {
    title: "Weight Loss Guide Malta | Behaviour System + 50+ Recipes | Carisma Slimming",
    description: "The Carisma Slimming Guide — a doctor-backed behaviour system with 50+ Maltese recipes, meal timing, and portion guidance. No calorie counting. Only €30.",
    url: 'https://www.carismaslimming.com/slimming-guide',
    images: [{ url: '/background.avif', width: 1200, height: 630, alt: 'The Carisma Slimming Guide — Weight Loss System for Malta' }],
  },
};

const PRODUCT_URL =
  'https://www.carismaslimming.com/product-page/the-carisma-slimming-weight-loss-guide-malta';

const jsonLd = [
  breadcrumbList([
    { name: 'Home', url: `${SITE_URL}/` },
    { name: 'Slimming Guide', url: `${SITE_URL}/slimming-guide` },
  ]),
  medicalWebPage({
    name: 'Weight Loss Guide Malta — Behaviour System + 50+ Recipes',
    description:
      "The definitive weight loss guide for Malta. Doctor-backed behaviour system with 50+ Maltese recipes, meal timing guidance, and portion structure. No calorie counting required.",
    url: `${SITE_URL}/slimming-guide`,
  }),
  {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Carisma Slimming Guide',
    description: 'A doctor-backed behaviour-based weight loss guide with 50+ Maltese recipes, meal timing, and portion guidance. Designed for sustainable weight loss without calorie counting.',
    url: PRODUCT_URL,
    image: `${SITE_URL}/wix/f940f0_a2ae67089c094ea4a1ed8c7a81f3c315~mv2.webp`,
    brand: {
      '@type': 'Brand',
      name: 'Carisma Slimming',
    },
    offers: {
      '@type': 'Offer',
      url: PRODUCT_URL,
      priceCurrency: 'EUR',
      price: '30',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Carisma Slimming',
        url: SITE_URL,
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '800',
      bestRating: '5',
      worstRating: '1',
    },
  },
];

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
        style={{ color: TAUPE, fontFamily: wideFont, fontSize: '12px', letterSpacing: '3px' }}
      >
        {children}
      </p>
      {rule && <div className="mb-2" style={{ width: '90px', height: '1px', backgroundColor: '#C9B8AE' }} />}
    </div>
  );
}

function GoogleReviewsRow({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      <img
        src="/wix/87fc13_c507b5f7e86f4eed970b757bc84a8ec4~mv2.png"
        alt="Google Reviews"
        style={{ width: '23px', height: '23px', objectFit: 'contain' }}
      />
      {[0, 1, 2, 3, 4].map((i) => (
        <img
          key={i}
          src="/wix/87fc13_2de846da7d374b24984ad15221cae0bd~mv2.png"
          alt="5 star rating"
          style={{ width: '23px', height: '20px', objectFit: 'contain' }}
        />
      ))}
      <span
        className="ml-2"
        style={{ color: light ? GREEN_SAGE_LIGHT : GREEN, fontFamily: bodyFont, fontSize: '13px' }}
      >
        Over <CountUp value="800+" /> Reviews
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
          { text: 'Weight Loss Guide for Malta' },
          { text: 'Behaviour System + 50+ Recipes', em: true },
        ]}
        sub="A doctor-backed system you can actually follow — no crash diets, no calorie counting. For only €30."
        bullets={[
          { label: 'What to eat —', text: 'and what to swap, using local Maltese ingredients.' },
          { label: 'When to eat —', text: 'simple meal timing that fits your schedule.' },
          { text: '50+ recipes built for the Mediterranean kitchen.' },
          { text: 'A structure that works around social dinners and busy days.' },
        ]}
        primaryCta={{ text: 'Get the Slimming Guide', href: PRODUCT_URL, external: true }}
        media={{ type: 'image', src: '/wix/f940f0_a2ae67089c094ea4a1ed8c7a81f3c315~mv2.webp', alt: 'The Carisma Slimming Guide book', fit: 'contain', bg: 'linear-gradient(160deg, #eef3ea 0%, #dde7d6 100%)', aspect: '4 / 5' }}
        proof={{ rating: '4.9', reviews: '800+', awardSrc: '/wix/87fc13_228c6751ef5a4644bdb0b46e7719692f~mv2.png', awardText: '#1 voted clinic\nMalta', statValue: '50+', statLabel: 'recipes inside' }}
        compactHeadline
        motif
      />

      {/* Why Diets Fail — editorial redesign */}
      <WhyDietsFail />

      {/* What This Is — two-column: calm statement + a 3D page render */}
      <section className="bg-white" style={{ paddingTop: 'clamp(12px, 3vw, 88px)', paddingBottom: 'clamp(12px, 3vw, 60px)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center" style={{ gap: 'clamp(32px, 6vw, 72px)' }}>
            {/* Left — statement */}
            <div>
              <Kicker rule>WHAT THIS IS</Kicker>
              <h2
                className="uppercase"
                style={{ color: GREEN, fontFamily: headingFont, fontWeight: 400, fontSize: '25px', lineHeight: 1.3, margin: '0 0 12px' }}
              >
                A behaviour-based weight loss system, not another diet.
              </h2>
              <p
                className="uppercase"
                style={{ color: TAUPE, fontFamily: wideFont, fontSize: '12px', letterSpacing: '3px', margin: '0 0 28px' }}
              >
                Built to hold — not a quick fix.
              </p>
              <p style={{ color: TAUPE, fontSize: '15px', lineHeight: 1.7, margin: '0 0 18px' }}>
                Not a challenge. Not a 30-day reset. Not a system that requires you to be a different person to use it.
                The Carisma Slimming Guide is a behaviour system — built from real clinic practice, designed for the
                life you actually have. It complements our{' '}
                <Link href="/weight-loss" style={{ color: GREEN, textDecoration: 'underline' }}>medical weight loss programme</Link>{' '}
                and{' '}
                <Link href="/glp1" style={{ color: GREEN, textDecoration: 'underline' }}>GLP-1 injections</Link>{' '}
                for those who want clinical support alongside the habit system.
              </p>
              <p style={{ color: TAUPE, fontSize: '15px', lineHeight: 1.7, margin: 0 }}>
                The principle it runs on: what you can repeat consistently will always outperform what you can do once
                brilliantly. Not the perfect week — a structure stable enough to survive the imperfect one.
              </p>
            </div>
            {/* Right — the guide, richly visualised (book + soft glow) */}
            <div className="flex justify-center">
              <div style={{ position: 'relative', width: '100%', maxWidth: '380px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span aria-hidden style={{ position: 'absolute', width: '112%', aspectRatio: '1 / 1', borderRadius: '50%', background: 'radial-gradient(circle, rgba(142,176,147,0.30) 0%, rgba(201,216,193,0.16) 46%, rgba(255,255,255,0) 72%)', filter: 'blur(8px)', zIndex: 0 }} />
                <Image
                  src="/wix/f940f0_a2ae67089c094ea4a1ed8c7a81f3c315~mv2.webp"
                  alt="The Carisma Slimming Guide book"
                  width={460}
                  height={575}
                  sizes="(max-width: 768px) 70vw, 340px"
                  style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '340px', height: 'auto', filter: 'drop-shadow(0 26px 44px rgba(34,56,38,0.30))' }}
                />
              </div>
            </div>
          </div>

          {/* statement + CTA, centered below — tightened */}
          <div className="text-center" style={{ marginTop: 'clamp(28px, 4vw, 48px)' }}>
            <div className="mx-auto" style={{ maxWidth: '560px', marginBottom: '26px' }}>
              <div className="mx-auto mb-5" style={{ width: '40px', height: '1px', background: GREEN }} />
              <p className="uppercase" style={{ color: GREEN, fontFamily: headingFont, fontWeight: 400, fontSize: 'clamp(16px, 2vw, 20px)', lineHeight: 1.5, letterSpacing: '0.04em' }}>
                Adherence over perfection. Structure over willpower.
              </p>
              <div className="mx-auto mt-5" style={{ width: '40px', height: '1px', background: GREEN }} />
            </div>
            <p style={{ color: TAUPE, fontSize: '15px', lineHeight: 1.7, margin: '0 0 24px', maxWidth: '620px', marginLeft: 'auto', marginRight: 'auto' }}>
              That is what this guide builds. When the structure holds, weight loss stops being something you fight for. It becomes a result that follows.
            </p>
            <a
              href={PRODUCT_URL}
              className="cta-glow inline-block text-center uppercase text-white"
              style={{ borderRadius: '999px', padding: '14px 40px', fontFamily: wideFont, fontSize: '13px', fontWeight: 700, letterSpacing: '1px', textDecoration: 'none' }}
              data-section="what-this-is"
              data-cta-text="get-the-slimming-guide"
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
        style={{ background: '#ffffff', padding: 'clamp(32px, 6vw, 64px) 0' }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p
            className="uppercase"
            style={{ color: GREEN, fontFamily: headingFont, fontSize: 'clamp(22px, 2.6vw, 28px)', lineHeight: 1.4, letterSpacing: '0.04em' }}
          >
            WHEN THESE FOUR FOUNDATIONS <strong>STABILISE</strong>
            <br />
            WEIGHT LOSS BECOMES <strong>A NATURAL OUTCOME</strong>.
          </p>
        </div>
      </section>

      {/* Designed for Malta — compact, cohesive redesign */}
      <section className="bg-white" style={{ padding: 'clamp(32px, 6vw, 80px) 0' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <Kicker centered rule>DESIGNED FOR MALTA</Kicker>
            <h2 className="uppercase" style={{ color: GREEN, fontFamily: headingFont, fontWeight: 400, fontSize: '25px', lineHeight: 1.3 }}>
              a slimming guide designed for maltese culture — festas, family tables, and all.
            </h2>
          </div>

          {/* Narrative + recipe render */}
          <div className="grid grid-cols-1 md:grid-cols-2 items-center" style={{ gap: 'clamp(28px, 5vw, 56px)' }}>
            <div>
              <p className="mb-4" style={{ color: TAUPE, fontSize: '15px', lineHeight: 1.7 }}>
                Maltese life is specific. You know what it looks like. Sunday lunch that runs until four. Dinners that start late and finish later. Tables where plates are shared and seconds are expected. Weeks that collapse in on themselves before Thursday.
              </p>
              <p style={{ color: TAUPE, fontSize: '15px', lineHeight: 1.7 }}>
                This method was not built to fight that — it was built to design around it. It does not ask you to decline the dinner, order a side salad while everyone else eats, or explain yourself to the table. That is the system: rhythm, interrupted and resumed. Not perfection — just the structure, picked back up.
              </p>
            </div>
            <div className="flex justify-center">
              <Image
                src="/wix/f940f0_ba288e10728a451e8acef9cbbaeaf46a~mv2.webp"
                alt="A recipe page from the Carisma Slimming Guide — Cottage Cheese, Tomato & Egg Plate"
                width={750}
                height={500}
                sizes="(max-width: 768px) 90vw, 460px"
                style={{ width: '100%', maxWidth: '460px', height: 'auto', transform: 'rotate(-2deg)', filter: 'drop-shadow(0 24px 44px rgba(40,60,44,0.16))' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Is This For You — clean editorial two-column comparison (no cards/gradients/shadows) */}
      <section style={{ background: 'linear-gradient(180deg, #ffffff 0%, #F5F8F2 50%, #ffffff 100%)', padding: 'clamp(32px, 6vw, 96px) 0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <Kicker centered rule>before you start</Kicker>
            <h2 className="uppercase" style={{ color: GREEN, fontFamily: headingFont, fontWeight: 400, fontSize: '25px', lineHeight: 1.3 }}>
              is this weight loss guide right for you?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto">
            {/* FOR YOU */}
            <div className="md:pr-14">
              <p className="uppercase" style={{ color: TAUPE, fontFamily: wideFont, fontSize: '12px', fontWeight: 400, letterSpacing: '2.4px', margin: '0 0 22px' }}>
                This guide is for you if
              </p>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {forYou.map((item) => (
                  <li key={item} className="flex" style={{ gap: '14px', marginBottom: '16px', alignItems: 'flex-start' }}>
                    <svg aria-hidden="true" focusable="false" width="20" height="20" viewBox="0 0 20 20" style={{ flex: '0 0 auto', marginTop: '3px' }}>
                      <circle cx="10" cy="10" r="9" fill="none" stroke={GREEN} strokeWidth="1" opacity="0.5" />
                      <path d="M5.8 10.2l2.6 2.6 5.4-5.6" fill="none" stroke={GREEN} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ color: TAUPE, fontFamily: bodyFont, fontSize: '15px', lineHeight: 1.7, fontWeight: 400 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* NOT FOR YOU — hairline divider (left on desktop, top on mobile) */}
            <div className="md:pl-14 mt-12 pt-12 md:mt-0 md:pt-0 border-t md:border-t-0 md:border-l" style={{ borderColor: '#E3DFD8' }}>
              <p className="uppercase" style={{ color: TAUPE, fontFamily: wideFont, fontSize: '12px', fontWeight: 400, letterSpacing: '2.4px', margin: '0 0 22px' }}>
                This guide is not for you if
              </p>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {notForYou.map((item) => (
                  <li key={item} className="flex" style={{ gap: '14px', marginBottom: '16px', alignItems: 'flex-start' }}>
                    <svg aria-hidden="true" focusable="false" width="20" height="20" viewBox="0 0 20 20" style={{ flex: '0 0 auto', marginTop: '3px' }}>
                      <circle cx="10" cy="10" r="9" fill="none" stroke={GREEN} strokeWidth="1" opacity="0.45" />
                      <path d="M6.8 6.8l6.4 6.4M13.2 6.8l-6.4 6.4" fill="none" stroke={GREEN} strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                    <span style={{ color: TAUPE, fontFamily: bodyFont, fontSize: '15px', lineHeight: 1.7, fontWeight: 400 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex justify-center mt-16 lg:mt-24">
            <p style={{ color: TAUPE, fontFamily: bodyFont, fontSize: '15px', lineHeight: 1.7, maxWidth: '640px', borderLeft: `2px solid ${GREEN}`, paddingLeft: '20px' }}>
              By the end, you will not have a list of rules to follow. You will have a way of thinking about food that holds, even on the weeks that don&apos;t. Want personalised guidance?{' '}
              <Link href="/consultation" style={{ color: GREEN, textDecoration: 'underline' }}>Book a free consultation</Link>{' '}and we will build a plan around you.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Cluster Links — editorial band linking to relevant weight loss articles */}
      <section className="bg-white" style={{ padding: 'clamp(40px, 8vw, 80px) 0' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Kicker centered>GO DEEPER</Kicker>
            <h2 className="uppercase" style={{ color: GREEN, fontFamily: headingFont, fontWeight: 400, fontSize: '25px', lineHeight: 1.3 }}>
              Learn the science behind sustainable weight loss
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Blog Link 1 */}
            <Link href="/blog" className="group block text-decoration-none hover:opacity-80 transition-opacity">
              <div style={{ background: '#F5F8F2', padding: '24px', borderRadius: '12px', marginBottom: '16px', minHeight: '160px', display: 'flex', alignItems: 'flex-end' }}>
                <p style={{ color: TAUPE, fontFamily: bodyFont, fontSize: '15px', lineHeight: 1.6, fontWeight: 500 }}>
                  Explore evidence-led articles on GLP-1, fat freezing, muscle stimulation and medical weight loss
                </p>
              </div>
              <p style={{ color: GREEN, fontFamily: wideFont, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 700, margin: '0' }}>
                Read the blog &nbsp;›
              </p>
            </Link>

            {/* Blog Link 2 */}
            <Link href="/weight-loss" className="group block text-decoration-none hover:opacity-80 transition-opacity">
              <div style={{ background: '#F5F8F2', padding: '24px', borderRadius: '12px', marginBottom: '16px', minHeight: '160px', display: 'flex', alignItems: 'flex-end' }}>
                <p style={{ color: TAUPE, fontFamily: bodyFont, fontSize: '15px', lineHeight: 1.6, fontWeight: 500 }}>
                  Discover our medical weight loss programme — behaviour coaching plus clinical support
                </p>
              </div>
              <p style={{ color: GREEN, fontFamily: wideFont, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 700, margin: '0' }}>
                Medical Weight Loss &nbsp;›
              </p>
            </Link>

            {/* Blog Link 3 */}
            <Link href="/consultation" className="group block text-decoration-none hover:opacity-80 transition-opacity">
              <div style={{ background: '#F5F8F2', padding: '24px', borderRadius: '12px', marginBottom: '16px', minHeight: '160px', display: 'flex', alignItems: 'flex-end' }}>
                <p style={{ color: TAUPE, fontFamily: bodyFont, fontSize: '15px', lineHeight: 1.6, fontWeight: 500 }}>
                  Book a free body composition analysis with one of our doctors to personalise your approach
                </p>
              </div>
              <p style={{ color: GREEN, fontFamily: wideFont, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 700, margin: '0' }}>
                Free Consultation &nbsp;›
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Final Call-to-Action Section — light on-brand band (no dark-green bg). Starts on
          the sage wash above and resolves to white so the section below flows. */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #ffffff 0%, #F5F8F2 50%, #ffffff 100%)', paddingTop: 'clamp(12px, 3vw, 96px)', paddingBottom: 'clamp(12px, 3vw, 160px)' }}
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
                data-section="final-cta"
                data-cta-text="get-slimming-guide"
              >
                Get Slimming Guide &nbsp;›
              </a>
              <GoogleReviewsRow />
            </div>
            {/* Right — guide mockup (in-flow, never collides at any zoom) */}
            <div className="flex justify-center">
              <img
                src="/wix/f940f0_05727f0f2b8049c69b8b60ee2cf16360~mv2.webp"
                alt="Preview pages from the Carisma Slimming Guide"
                style={{ width: '100%', maxWidth: '560px', aspectRatio: '964 / 752', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
