import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import OutcomeStepper from './OutcomeStepper';
import { JsonLd } from '@/lib/seo/JsonLd';
import { SITE_URL, breadcrumbList, medicalWebPage } from '@/lib/seo/schema';
import BookConsultationButton from '@/components/BookConsultationButton';

export const metadata: Metadata = {
  title: "Free Slimming Guide Malta | Carisma Slimming",
  description: "Download our free Slimming Guide — the definitive weight loss resource for Malta. Expert advice from our doctors on diet, exercise, GLP-1s, and body contouring.",
  alternates: { canonical: 'https://www.carismaslimming.com/slimming-guide' },
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

const methodPillars = [
  {
    lead: 'Meal Timing:',
    rest: 'When to Eat for Steady Energy',
    paragraphs: [
      'Timing builds rhythm. Rhythm reduces the number of decisions you have to make each day. The guide walks you through a simple default for your first meal, how to structure eating across the day, and two tracks to choose from based on your morning routine. Safety and practicality, both covered.',
    ],
  },
  {
    lead: 'Protein First:',
    rest: 'What to Eat to Build Satiety',
    paragraphs: [
      'Protein comes first. Not because carbs are the enemy, but because protein builds satiety from the start of every meal. The guide uses a simple points system, one calorie equals one point, with non-starchy vegetables sitting outside it entirely. No forbidden foods. No obsessive counting.',
    ],
  },
  {
    lead: 'Portion Guide:',
    rest: 'How Much to Eat Without Counting',
    paragraphs: [
      'Your daily points budget is built around you.',
      'The guide includes a visual rule that works without scales, without apps, and without measuring anything. One palm. Two palms. Straightforward.',
    ],
  },
  {
    lead: 'Eating Sequence:',
    rest: 'The Order That Changes How You Feel',
    paragraphs: [
      'Protein first. Then vegetables. Then carbs. That sequence changes how hungry you feel, how steady your energy runs, and how you arrive at your next meal. It works at home. It works at restaurants. It works at family tables where the pasta arrives before anything else.',
    ],
  },
];

const outcomes = [
  {
    title: 'Weight Stability',
    icon: '/wix/87fc13_423d81e5360e4d79b62846fe22c58655~mv2.png',
    text: 'You stop dreading Monday mornings. You stop stepping on the scale after a difficult weekend and writing off the week. You learn to read the trend, not the moment. One number on one day stops having power over you. You begin to trust the direction, not obsess over the distance.',
  },
  {
    title: 'Appetite Stability',
    icon: '/wix/f940f0_e7472796f93447e68c2b1d2210b09224~mv2.png',
    text: 'You stop arriving at meals desperate. Hunger becomes something predictable, something you can read, something that arrives on schedule rather than ambushing you. You stop making decisions when you are already too hungry to make good ones. That alone changes everything.',
  },
  {
    title: 'Energy Stability',
    icon: '/wix/f940f0_fffe93587a1d4b73b4ff7af603ebd67a~mv2.png',
    text: 'The 3pm crash becomes unfamiliar. You stop needing caffeine to get through the afternoon. Sleep improves without doing anything specific about sleep. Your body regulates. You notice it first in the small things: concentration, mood, the way evenings feel lighter.',
  },
  {
    title: 'Emotional Calm Around Food',
    icon: '/wix/f940f0_ba9d9802e5184f72ae39ac796ad06084~mv2.png',
    text: 'You go to dinner and enjoy it. You come home and do not spiral. You stop the all-or-nothing arithmetic, the mental ledger of what you ate and what it cost you. Food becomes simpler. Less loaded. You leave the table satisfied, not negotiating with yourself.',
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

const carismaCommitments = [
  'Visible inch loss and shape change, not vague promises',
  'Plans that work with your age, hormones and metabolism',
  'No crash diets, no banned foods, no endless hours of cardio',
  'Medical grade technology and treatments delivered by trained professionals',
];

const whyCarisma = [
  "Created by the team behind Malta's leading spa and medical aesthetics centres",
  'Doctor led medical slimming, not a beauty salon "diet program"',
  'All in one approach: assessment, nutrition, movement and treatments',
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
const BLUE = '#356a87'; // darkened brand blue — white CTA text clears 5.89:1 (AA)
const BAND_END = '#567059'; // darkened lightest stop of dark-green bands so white body text clears AA

function Kicker({ children, centered = false, rule = false }: { children: React.ReactNode; centered?: boolean; rule?: boolean }) {
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
        alt="google.png"
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
        Over 200+ Reviews
      </span>
    </div>
  );
}

export default function SlimmingGuidePage() {
  return (
    <main className="w-full" style={{ fontFamily: bodyFont, color: TAUPE }}>
      <JsonLd data={jsonLd} />
      <style dangerouslySetInnerHTML={{ __html: localFontCss }} />
      <PageHero
        eyebrow="Recipes, meal timing & a structured plan"
        headline={[
          { text: 'Weight Loss Guide Malta' },
          { text: 'Built for Real Maltese Life', em: true },
        ]}
        sub="A doctor-backed system you can actually follow — no crash diets, no calorie counting. For only €30."
        bullets={[
          { label: 'What to eat —', text: 'and what to swap, using local Maltese ingredients.' },
          { label: 'When to eat —', text: 'simple meal timing that fits your schedule.' },
          { text: '30+ recipes built for the Mediterranean kitchen.' },
        ]}
        primaryCta={{ text: 'Get the Slimming Guide', href: 'https://www.carismaslimming.com/product-page/the-carisma-slimming-weight-loss-guide-malta', external: true }}
        media={{ type: 'image', src: '/wix/f940f0_a2ae67089c094ea4a1ed8c7a81f3c315~mv2.png', alt: 'The Carisma Slimming Guide', fit: 'contain', bg: 'linear-gradient(160deg, #eef3ea 0%, #dde7d6 100%)' }}
        proof={{ rating: '4.9', reviews: '200+', awardSrc: '/wix/87fc13_228c6751ef5a4644bdb0b46e7719692f~mv2.png', awardText: '#1 voted clinic\nMalta' }}
        compactHeadline
      />

      {/* Main Narrative / Pain Point Section */}
      <section className="py-24" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="mx-auto px-4" style={{ maxWidth: '1032px' }}>
          <div
            className="card px-6 py-10 sm:px-12 sm:py-12"
            style={{
              background: 'linear-gradient(170deg, #F7F4ED 0%, #F0EFE5 55%, #D8E4D6 100%)',
              borderRadius: '16px',
            }}
          >
            <h2
              className="text-center mb-10 lowercase"
              style={{ color: GREEN, fontFamily: headingFont, fontWeight: 400, fontSize: '30px' }}
            >
              why diets fail in malta — and what actually works instead.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-[338px_1fr] gap-8 items-start">
              <div className="flex flex-col gap-6">
                <img
                  src="/wix/11062b_926c2ba259264b22bed8a16f8021e64b~mv2.jpg"
                  alt="Woman Eating Pizza"
                  style={{ width: '338px', maxWidth: '100%', aspectRatio: '338 / 386', objectFit: 'cover', objectPosition: 'center top', borderRadius: '16px' }}
                />
              </div>
              <div style={{ maxWidth: '540px' }}>
              <p style={{ color: TAUPE, fontSize: '13px' }}>
                You started on a Monday. You were ready.
              </p>
              <p className="mb-4" style={{ color: TAUPE, fontSize: '13px' }}>
                The rules were clear. The commitment felt real.
              </p>
              <p className="mb-4" style={{ color: TAUPE, fontSize: '13px' }}>
                By Wednesday, life happened. A dinner you didn&apos;t plan for. A week that ran away from you. A
                moment where you were tired and hungry and the willpower just wasn&apos;t there.
              </p>
              <p className="mb-4" style={{ color: TAUPE, fontSize: '13px' }}>
                So you started again the following Monday.
              </p>
              <p className="mb-4" style={{ color: TAUPE, fontSize: '13px' }}>
                Then again. Then again.
              </p>
              <p className="mb-4" style={{ color: TAUPE, fontSize: '13px' }}>
                Here is what that pattern actually tells you: not that you lack discipline, but that the system
                you were following required too much of it. Every single day. Perfect decisions. Perfect
                portions. Perfect meals. On days that are never perfect.
              </p>
              <p className="mb-4" style={{ color: TAUPE, fontSize: '13px' }}>
                You know what happens when a difficult week meets a fragile plan. The plan breaks. And somehow,
                the story you end up telling yourself is that you broke it.
              </p>
              <p style={{ color: TAUPE, fontSize: '13px' }}>
                You didn&apos;t.
              </p>
              <p className="mb-4" style={{ color: TAUPE, fontSize: '13px' }}>
                Not your effort. Not your intention. Not your character.
              </p>
              <p className="mb-2" style={{ color: TAUPE, fontSize: '13px' }}>
                The plan was fragile. That is where this starts.
              </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Built To Hold band + What This Is + Method share a wrapper so the tilted
          paper mockups can overlap section boundaries like on the live site */}
      <div className="relative overflow-hidden">
      {/* Built To Hold Band */}
      <section
        style={{ background: `linear-gradient(90deg, #3E483E 0%, #4E6B55 55%, ${BAND_END} 100%)`, padding: '57px 0' }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p
            className="uppercase"
            style={{ color: '#FFFFFF', fontFamily: wideFont, fontSize: '30px', lineHeight: 1.4 }}
          >
            THIS IS A SYSTEM <strong>BUILT TO HOLD.</strong>
            <br />
            <strong>NOT</strong> A QUICK FIX.
          </p>
        </div>
      </section>

      {/* What This Is Section */}
      <section className="py-24 relative bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <Kicker centered rule>WHAT THIS IS</Kicker>
          <h2
            className="mb-8 lowercase"
            style={{ color: GREEN, fontFamily: headingFont, fontWeight: 400, fontSize: '30px' }}
          >
            this is a behaviour-based weight loss system, not another diet.
          </h2>
          <p className="mb-6 text-left" style={{ color: TAUPE, fontSize: '14px' }}>
            Not a challenge. Not a 30-day reset. Not a system that requires you to be a different person to use
            it. The Carisma Slimming Guide is a behaviour system. Built from real clinic practice. Designed for
            the life you actually have.
          </p>
          <p className="mb-8 text-left" style={{ color: TAUPE, fontSize: '14px' }}>
            The principle it runs on is this: what you can repeat consistently will always outperform what you
            can do once brilliantly. Not the perfect week. A structure stable enough to survive the imperfect
            one.
          </p>
          <p
            className="inline-block uppercase mb-8"
            style={{
              color: TAUPE,
              fontFamily: wideFont,
              fontSize: '13px',
              border: '1px solid #8a8073',
              padding: '12px 20px',
            }}
          >
            Adherence over perfection. Structure over willpower. That is the whole system
          </p>
          <p className="mb-8" style={{ color: TAUPE, fontSize: '14px' }}>
            That is what this guide builds. And when that structure holds, weight loss stops being something you
            fight for. It becomes a result that follows.
          </p>
          <a
            href={PRODUCT_URL}
            className="cta-glow block mx-auto text-center uppercase text-white"
            style={{
              backgroundColor: BLUE,
              borderRadius: '999px',
              maxWidth: '550px',
              padding: '12px 24px',
              fontFamily: wideFont,
              fontSize: '15px',
              fontWeight: 700,
              letterSpacing: '1.5px',
            }}
          >
            Get Slimming Guide &nbsp;›
          </a>
        </div>
      </section>

      {/* Method Section */}
      <section className="py-24 relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <Kicker centered rule>THE METHOD</Kicker>
            <h2
              className="mb-6 lowercase mx-auto"
              style={{ color: GREEN, fontFamily: headingFont, fontWeight: 400, fontSize: '30px', maxWidth: '500px' }}
            >
              the four-pillar method: what to eat, when to eat, how much, and in what order.
            </h2>
            <p style={{ color: TAUPE, fontSize: '14px' }}>
              Every plan that has ever failed you asked for too many decisions made under pressure. This method
              does the opposite. It reduces decisions. Four questions. One clear answer to each. That is the
              entire structure.
            </p>
          </div>
          <div
            className="grid grid-cols-1 md:grid-cols-2 mx-auto"
            style={{ maxWidth: '802px', columnGap: '90px', rowGap: '40px' }}
          >
            {methodPillars.map((p) => (
              <div
                key={p.lead}
                className="card px-7 pt-8 pb-7"
                style={{
                  background: 'linear-gradient(180deg, #CBDCC9 0%, #FBFBF8 55%)',
                  borderRadius: '16px',
                }}
              >
                <h3
                  className="mb-4 uppercase text-center"
                  style={{ color: GREEN, fontFamily: wideFont, fontSize: '25px' }}
                >
                  <span style={{ fontWeight: 700 }}>{p.lead}</span>{' '}
                  {/* was #FFFFFF (1.04:1 — invisible on light gradient); taupe at 25px large = 4.49:1 */}
                  <span style={{ fontWeight: 400, color: TAUPE }}>{p.rest}</span>
                </h3>
                {p.paragraphs.map((t, i) => (
                  <p key={i} className={i < p.paragraphs.length - 1 ? 'mb-4' : ''} style={{ color: TAUPE, fontSize: '13px' }}>
                    {t}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tilted A4 mockup overlapping the band + What This Is (right edge) */}
      <img
        src="/wix/f940f0_04682b1e57084d5bb6306b1bb52d3534~mv2.png"
        alt="A4 paper mockup of the guide (A4 Papdfgfder Mockup V1.0.png)"
        className="hidden lg:block absolute pointer-events-none"
        style={{ width: '771px', aspectRatio: '771 / 618', objectFit: 'contain', top: '0px', right: '-305px' }}
      />
      {/* Recipe page + guide cover stack overlapping What This Is + Method (left edge) */}
      <img
        src="/wix/f940f0_ba288e10728a451e8acef9cbbaeaf46a~mv2.png"
        alt="The Method flyer image (Freedfvvdfv Flyer 02.png)"
        className="hidden lg:block absolute pointer-events-none"
        style={{ width: '771px', aspectRatio: '771 / 708', objectFit: 'contain', top: '330px', left: '-305px' }}
      />
      </div>{/* end decorative wrapper */}

      {/* Success Outcomes Section — STEP 1-4 stepper */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-10">
            <h2
              className="uppercase pb-2"
              style={{
                color: TAUPE,
                fontFamily: wideFont,
                fontSize: '16px',
                fontWeight: 400,
                letterSpacing: '3.2px',
                borderBottom: '1px solid #C9C0B8',
              }}
            >
              What sustainable weight loss actually looks like — four outcomes the guide builds.
            </h2>
          </div>
          <OutcomeStepper outcomes={outcomes} />
        </div>
      </section>

      {/* Stabilise Band */}
      <section
        style={{ background: `linear-gradient(90deg, #3E483E 0%, #4E6B55 55%, ${BAND_END} 100%)`, padding: '57px 0' }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p
            className="uppercase"
            style={{ color: '#FFFFFF', fontFamily: wideFont, fontSize: '30px', lineHeight: 1.4 }}
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
              className="lowercase"
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
                  alt="Designed for Malta image (Group 1707479766.png)"
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
          <p className="mb-10 lg:mb-[88px]" style={{ color: TAUPE, fontSize: '15px' }}>
            The guide includes recipes built for real Maltese kitchens. Practical, familiar dishes built within
            the method so they work without adaptation. Nothing aspirational. Nothing that requires ingredients
            you would not already have.
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
          {/* 'Most people who come to us...' highlight card */}
          <div
            className="card px-8 py-11 lg:-mx-10"
            style={{
              background: 'linear-gradient(180deg, #CDDCCA 0%, #F7F7F3 85%)',
              borderRadius: '16px',
            }}
          >
            <p
              className="uppercase mb-6"
              style={{ color: TAUPE, fontFamily: wideFont, fontSize: '18px', lineHeight: 1.5 }}
            >
              Most people who come to us have <strong>already tried something</strong>. A diet that worked{' '}
              <strong>for a while</strong>. An app they <strong>stopped opening</strong>. A plan that felt right
              until <strong>life got in the way</strong>.
            </p>
            <p
              className="uppercase"
              style={{ color: TAUPE, fontFamily: wideFont, fontSize: '18px', lineHeight: 1.5 }}
            >
              This guide was written for <strong>what comes after that.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Is This For You Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Kicker centered rule>before you start</Kicker>
            <h2
              className="lowercase"
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
                  alt="Group 1707479766.png"
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
                  alt="Group 1707481598.png"
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
              that holds, even on the weeks that don&apos;t.
            </p>
          </div>
        </div>
      </section>

      {/* Final Call-to-Action Section — full-width dark green band */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: `linear-gradient(90deg, #3E483E 0%, #57695A 50%, ${BAND_END} 100%)` }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left — heading, copy, CTA, reviews */}
            <div>
              <h2
                className="uppercase"
                style={{ color: '#F4F1E9', fontFamily: headingFont, fontWeight: 400, fontSize: '30px', lineHeight: 1.3 }}
              >
                GET THE CARISMA
                <br />
                SLIMMING GUIDE — €30
              </h2>
              <div className="mt-3 mb-6" style={{ width: '180px', height: '1px', backgroundColor: 'rgba(255,255,255,0.6)' }} />
              <p className="mb-4" style={{ color: '#FFFFFF', fontSize: '14px', maxWidth: '340px' }}>
                If you have read this far, you already know something is different here. This is not another plan
                asking you to be perfect. It is a structure asking you to return.
              </p>
              <p className="mb-7" style={{ color: '#FFFFFF', fontSize: '14px', maxWidth: '340px' }}>
                Choosing this for yourself is not indulgent. It is practical. The structure you have been missing
                does not appear on its own. This is where it starts.
              </p>
              <a
                href={PRODUCT_URL}
                className="cta-glow block text-center uppercase text-white mb-7"
                style={{
                  backgroundColor: GREEN_FILL,
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
              <GoogleReviewsRow light />
            </div>
            {/* Right — guide mockup (in-flow below lg; large absolute version on desktop) */}
            <div className="flex justify-center lg:hidden">
              <img
                src="/wix/f940f0_05727f0f2b8049c69b8b60ee2cf16360~mv2.png"
                alt="Guide preview image (Guide 3fD 01.jpg.png)"
                style={{ width: '100%', maxWidth: '560px', aspectRatio: '964 / 752', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
        {/* Large scattered-pages mockup pinned to the right half (desktop) */}
        <img
          src="/wix/f940f0_05727f0f2b8049c69b8b60ee2cf16360~mv2.png"
          alt=""
          className="hidden lg:block absolute pointer-events-none"
          style={{ left: '433px', top: '-64px', width: '964px', height: '752px', objectFit: 'contain' }}
        />
      </section>

      {/* Carisma Difference Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="card max-w-5xl mx-auto px-8 py-10 sm:px-14"
            style={{
              background: 'linear-gradient(160deg, #F8F6F2 0%, #EFF1EA 55%, #CFDECC 100%)',
              borderRadius: '16px',
              boxShadow: '0 6px 16px rgba(0,0,0,0.06)',
            }}
          >
            <div className="text-center mb-3">
              <p
                className="uppercase"
                style={{ color: TAUPE, fontFamily: wideFont, fontSize: '12px', letterSpacing: '2.4px' }}
              >
                the carisma difference
              </p>
            </div>
            <h2
              className="text-center mb-8 lowercase"
              style={{ color: GREEN, fontFamily: headingFont, fontWeight: 400, fontSize: '24px' }}
            >
              why malta chooses carisma slimming — doctor-led, evidence-based, shame-free
            </h2>
            <h3 className="uppercase mb-4" style={{ color: TAUPE, fontSize: '15px', fontWeight: 700 }}>
              our commitment to medically-led slimming in Malta
            </h3>
            <ul className="space-y-2 list-disc pl-5 mb-8" style={{ maxWidth: '430px' }}>
              {carismaCommitments.map((item) => (
                <li key={item} style={{ color: TAUPE, fontSize: '14px', lineHeight: 1.5 }}>
                  {item}
                </li>
              ))}
            </ul>
            <h3 className="uppercase mb-4" style={{ color: TAUPE, fontSize: '15px', fontWeight: 700 }}>
              WHY MALTA CHOOSES CARISMA SLIMMING OVER A GENERIC DIET PLAN
            </h3>
            <ul className="space-y-2 list-disc pl-5 mb-10" style={{ maxWidth: '430px' }}>
              {whyCarisma.map((item) => (
                <li key={item} style={{ color: TAUPE, fontSize: '14px', lineHeight: 1.5 }}>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex flex-col gap-3">
                <a
                  href={PRODUCT_URL}
                  className="cta-glow block text-center uppercase text-white w-full"
                  style={{
                    backgroundColor: BLUE,
                    borderRadius: '999px',
                    maxWidth: '460px',
                    padding: '11px 24px',
                    fontFamily: wideFont,
                    fontSize: '13px',
                    fontWeight: 700,
                    letterSpacing: '1.5px',
                  }}
                >
                  Get Slimming Guide &nbsp;›
                </a>
                <BookConsultationButton variant="filled" style={{ fontSize: '13px', padding: '11px 24px', borderRadius: '999px' }}>
                  Book Free Consultation
                </BookConsultationButton>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="/wix/87fc13_0426ba92e1fa4e9ebce44215146be031~mv2.png"
                  alt="Parking sign icon (parking-sign (1).png)"
                  style={{ width: '20px', height: '23px', objectFit: 'contain' }}
                />
                <p
                  className="uppercase whitespace-nowrap"
                  style={{ color: TAUPE, fontFamily: wideFont, fontSize: '13px', fontWeight: 700 }}
                >
                  Complimentary on-site parking
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
