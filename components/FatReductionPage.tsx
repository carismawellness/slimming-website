'use client';

/* ============================================================
   Fat Freezing (CoolSculpting) — pixel-faithful recreation of
   https://www.carismaslimming.com/fat-reduction
   Section order (body only; global Header + BrandBlock + Footer
   come from app/layout.tsx):
     1  Hero
     2  The secret to a more defined, confident look
     3  Malta's trusted clinic — press logos
     4  Four named benefits
     5  Eligibility — selective by intention (treatable areas)
     6  The Carisma difference — we are not another diet clinic
     7  Package treatments — CoolSculpting / proven efficacy
     8  Dual technology starter pack
     9  Malta's #1 leading wellness chain
     10 Frequently asked questions
     11 Evidence based approach (3 research cards)
   ============================================================ */

import { useState } from 'react';
import { BOOKING_URL } from '@/lib/services';

/* ---------- palette (sage / taupe family, shared with the site) ---------- */
const GREEN = '#8EB093';
const BLUE = '#6391AB'; // secondary CTA colour used on the live page
const TAUPE = '#9B8D83';
const TAUPE_DK = '#7C7268';
const TAUPE_LT = '#AFA39D';
const INK = '#5b5650';

/* ---------- fonts (same stack the rest of the site declares) ---------- */
const SERIF = 'Trajan Pro, "Trajan Pro Regular", Georgia, serif';
const WIDE = 'Novecento Wide Book, Novecento Wide, sans-serif';
const BODY = 'Roboto, sans-serif';

/* ---------- wix assets ---------- */
const W = '/wix/';
const IMG = {
  heroBg: W + '87fc13_f0e92ac188af4582a4dcab0d17d5d2ed~mv2.png',
  hero: W + '87fc13_0d95ebc4241644a88912c30f5f6fa882~mv2.jpg', // poster frame for the hero video
  heroVideo: W + '87fc13_d455089124694edb96940d4cd650622a_720p.mp4',
  badge: W + 'f940f0_c4008d16bc3245f7bc8663f5b60d7a82~mv2.png',
  google: W + '87fc13_c507b5f7e86f4eed970b757bc84a8ec4~mv2.png',
  sec2: W + '87fc13_af546d93467e47d790f061caff13348a~mv2.png',
  check: W + '87fc13_59346c1121b34e759ebf20eba3054c8c~mv2.png',
  diffBg: W + '87fc13_eed9276b67e74ae99994e6bab4bcd409~mv2.png',
  elig: W + '87fc13_bda5e64e4bcb4471b28a919528af71bc~mv2.png',
  ba: W + '87fc13_e873e3bf68584964b06a9f7bd9e5d335~mv2.png',
  orange: W + '87fc13_1105e5fcee694da4a6ed1edeb9fd2bd7~mv2.png',
  wellBg: W + 'f940f0_9f944ed58e3f4919bf87ef224beb4f94~mv2.png',
  parking: W + '87fc13_0426ba92e1fa4e9ebce44215146be031~mv2.png',
  ev1: W + '87fc13_e49f864318254f4b86704307b14ca6d8~mv2.png',
  ev2: W + '87fc13_8094f30674bc47208fac989787bf0557~mv2.png',
  ev3: W + '87fc13_3ffa5b43365244309f4c746206cc1ecc~mv2.png',
  press: {
    maltaDaily: W + 'f940f0_8bd141199fea4275a1222b62f24f2d98~mv2.jpeg',
    maltaToday: W + 'f940f0_8c40f03f50684bf8adc6d9ca0cb2be9e~mv2.jpg',
    lovin: W + 'f940f0_e6f0bd96c9d04debaa8d8b609cbf68e6~mv2.jpeg',
    times: W + 'f940f0_2120887ab6ef4957b02ff004e804beaf~mv2.png',
    mtToday: W + 'f940f0_0db6f1508426404eacea3b33b0e9112d~mv2.png',
  },
  benefitIcons: [
    W + '87fc13_31a3925719b446858712ee300fd07661~mv2.png',
    W + '87fc13_03c8382fd1434f919cf94b1d664d494c~mv2.png',
    W + '87fc13_b4783b8ab4ad480fa01394e449f91d34~mv2.png',
    W + '87fc13_729173bc08764a74bee017b037d95d5b~mv2.png',
  ],
  dualIcons: [
    W + '87fc13_387683ad0f4c499c8cab338b5f800aa0~mv2.png', // location
    W + '87fc13_9011dffd287245ed9d60f5663e21edba~mv2.png', // rise
    W + '87fc13_c4cf7001e0324fbd84551191d2a27bd1~mv2.png', // dollar
  ],
};

/* ---------- small shared pieces ---------- */
function Eyebrow({ children, align = 'center' }: { children: React.ReactNode; align?: 'center' | 'left' }) {
  return (
    <p
      style={{
        color: TAUPE_LT,
        fontFamily: WIDE,
        fontSize: '13px',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        textAlign: align,
        margin: 0,
      }}
    >
      {children}
    </p>
  );
}

function SectionHeading({
  children,
  align = 'center',
  size = 28,
}: {
  children: React.ReactNode;
  align?: 'center' | 'left';
  size?: number;
}) {
  return (
    <h2
      style={{
        color: GREEN,
        fontFamily: SERIF,
        fontWeight: 400,
        fontSize: `${size}px`,
        lineHeight: 1.4,
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        textAlign: align,
        margin: 0,
      }}
    >
      {children}
    </h2>
  );
}

function CTA({
  variant = 'blue',
  children = 'Claim your spot now',
  full = false,
}: {
  variant?: 'green' | 'blue';
  children?: React.ReactNode;
  full?: boolean;
}) {
  const isGreen = variant === 'green';
  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: full ? 'block' : 'inline-block',
        backgroundColor: isGreen ? GREEN : BLUE,
        color: '#ffffff',
        fontFamily: WIDE,
        fontWeight: 700,
        fontSize: '14px',
        letterSpacing: '1.4px',
        textTransform: 'uppercase',
        textAlign: 'center',
        textDecoration: 'none',
        padding: '15px 38px',
        borderRadius: isGreen ? '5px' : '10px',
      }}
    >
      {children}
    </a>
  );
}

function Tick({ size = 18 }: { size?: number }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={IMG.check} alt="" style={{ width: size, height: 'auto', flexShrink: 0, marginTop: 3 }} />;
}

function Stars({ count = 5, size = 18, withGoogle = false }: { count?: number; size?: number; withGoogle?: boolean }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      {withGoogle && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={IMG.google} alt="Google" style={{ width: size + 4, height: size + 4 }} />
      )}
      <span style={{ color: GREEN, fontSize: size, letterSpacing: 2, lineHeight: 1 }}>
        {'★'.repeat(count)}
      </span>
      <span style={{ color: TAUPE, fontFamily: BODY, fontSize: 14 }}>Over 200+ Reviews</span>
    </span>
  );
}

const CONTAINER: React.CSSProperties = { maxWidth: 1040, marginLeft: 'auto', marginRight: 'auto', paddingLeft: 24, paddingRight: 24 };

/* ---------- content ---------- */
const HERO_INCLUDES = [
  '3x Fat Freezing sessions with CoolSculpting (€300)',
  '4x access to spa & fitness facilities (€140)',
  'Tanita Body Composition Analysis (€60)',
  '€25 Carisma Aesthetics credit (€25)',
  'Complimentary Parking Validation',
];

const HERO_FINEPRINT = [
  '* Includes 3 appointments of fat freezing sessions, scheduled based on your clinical plan; additional areas or appointments charged at extra.',
  '** Sessions may be spaced over multiple weeks depending on area and suitability',
  '** Due to high demand, packages are offered based on availability and may not always be guaranteed. Please inquire for current options.',
];

const SECRET_BULLETS = [
  'You lose a few kilos, yet your love handles and lower belly look the same in photos.',
  'You feel you must hide behind loose tops, high waists or shapewear to feel comfortable.',
  'Friends tell you to “just lose more weight” even though one or two pockets of fat are the real issue.',
  'You are tired of plans that treat you like a number on the scale instead of someone who wants specific areas fixed.',
];

const BENEFITS = [
  { icon: IMG.benefitIcons[0], title: 'TARGETED CONTOURING', body: 'Focus on your biggest trouble spot first so love handles, lower belly or double chin start to look smoother in clothes and photos.' },
  { icon: IMG.benefitIcons[1], title: 'DUAL ACTION FAT REDUCTION', body: "Combine Malta's first CoolSculpting technology with targeted fat dissolving injections for a more complete result than using either alone." },
  { icon: IMG.benefitIcons[2], title: 'EXPERT DESIGNED PLAN', body: 'Your in person consultation maps out which area to treat, how to combine both methods and what to expect from your results.' },
  { icon: IMG.benefitIcons[3], title: 'SAFE AND CLINICALLY CERTIFIED', body: 'Treatments are performed by medical professionals using EU approved, clinically proven body contouring technology with minimal downtime.' },
];

const AREAS = [
  'STOMACH – BELLY FAT',
  'LOVE HANDLES',
  'UPPER ARMS',
  'THIGHS',
  'BANANA ROLL',
  'BACK FAT, BRA FAT',
  'DOUBLE CHIN / THE JAWLINE',
];

const DIFF_BULLETS = [
  'Doctor led: full medical check and body scan',
  'One integrated program: medical, diet, movement and treatments together',
  'Real gym included: Technogym facility, semi-private classes and PT',
  'High touch support: weekly check ins, progress reports and WhatsApp follow up',
  'Evidence based devices: Emsculpt NEO, coolsculpting and RF skin tightening',
  'Selective entry and measurable weight loss results guaranteed',
];

const EFFICACY_BULLETS = [
  'Backed by clinical research with over 17 million treatments performed worldwide.',
  'Results start to appear from 1–3 months, with full contour change often seen by 3–6 months as the body clears the damaged fat cells.',
  'The fat cells that are removed do not return, so results in that area are long lasting if your weight is stable.',
  'Non surgical and non invasive treatment with little to no downtime in most people',
];

const DUAL_MINI = [
  { icon: IMG.dualIcons[0], title: 'TARGETED CONTOURING', body: 'CoolSculpting plus Lemon Bottle injections in one visit for your number one trouble spot.' },
  { icon: IMG.dualIcons[1], title: 'VISIBLE, TRACKABLE CHANGE', body: 'Local fat reduction where you actually see it in clothes and photos, not just on the scale.' },
  { icon: IMG.dualIcons[2], title: 'HIGH-VALUE STARTER ACCESS', body: '€550 worth of treatments and clinic credit for €199, with the option to upgrade later.' },
];

const DUAL_INCLUDES = [
  '3x Fat Freezing sessions with CoolSculpting (€360)',
  '4x access to spa & fitness facilities (€140)',
  'Tanita Body Composition Analysis (€60)',
  '€25 Carisma Aesthetics credit (€25)',
  'Complimentary Parking Validation',
];

const DUAL_FINEPRINT = [
  '* Includes 3 fat freezing sessions, scheduled based on your clinical plan; additional areas charged at extra',
  '** Sessions may be spaced over multiple weeks depending on area and suitability',
  '** Due to high demand, packages are offered based on availability and may not always be guaranteed. Please inquire for current options.',
];

const COMMITMENT = [
  'Visible inch loss and shape change, not vague promises',
  'Plans that work with your age, hormones and metabolism',
  'No crash diets, no banned foods, no endless hours of cardio',
  'Medical grade technology and treatments delivered by trained professionals',
];

const WHY_MALTA = [
  "Created by the team behind Malta's leading spa and medical aesthetics centres",
  'Doctor led medical slimming, not a beauty salon “diet program”',
  'All in one approach: assessment, nutrition, movement and treatments',
  'High touch support with weekly check ins and WhatsApp coaching',
];

const FAQS = [
  { q: '1. What is included in the Stubborn Fat Eraser Starter Pack?', a: 'One in person consultation with our doctor, one CoolSculpting fat freezing session, access to spa & fitness facilities, Tanita Body Composition Analysis, €25 Carisma Aesthetics credit for future treatments.' },
  { q: '2. Am I a good candidate for this package?', a: 'It is ideal if you are close to your goal weight but have localised fat on areas like the lower belly, love handles or double chin. Suitability is always confirmed in your medical consultation.' },
  { q: '3. How does CoolSculpting fat freezing actually work?', a: 'CoolSculpting uses controlled cooling to target and kill fat cells under the skin. Over the following weeks your body naturally clears these cells, which can reduce the thickness of the fat layer in the treated area.' },
  { q: '4. What is the difference between fat freezing and fat dissolving injections?', a: 'Fat freezing uses cold to destroy fat cells from outside the body, while fat dissolving injections use a solution that breaks down fat cells from within a small, targeted pocket. In this pack you get both, planned together for one key area.' },
  { q: '5. How many areas can I treat with this starter pack?', a: 'This offer is built to focus on one main problem area so you can see a clear change. During the consultation the doctor will advise how best to use the CoolSculpting and injections for that area.' },
  { q: '6. Does the treatment hurt and is there downtime?', a: 'CoolSculpting usually feels very cold and tight at first, then the area goes numb. Most people go back to normal activities the same day.' },
  { q: '7. When will I see results?', a: 'As the body removes treated fat cells. Your clinic will schedule follow up photos so you can compare.' },
  { q: '8. Are the results permanent?', a: 'The fat cells that are destroyed and removed do not come back. However remaining fat cells can still grow if you gain weight, so a healthy lifestyle will help you maintain your results.' },
  { q: '9. Are there any risks or side effects?', a: 'As with all medical procedures there are possible risks, such as temporary swelling, bruising, numbness, tenderness or small lumps in the treated area. Your doctor will discuss all potential side effects and safety information before you decide.' },
  { q: '10. How does the €25 Carisma Aesthetics credit work?', a: 'Your €25 credit is applied to a future treatment at Carisma Aesthetics, such as body contouring or injectables, within a set time frame that will be clearly written on your booking and confirmation.' },
];

const EVIDENCE = [
  {
    img: IMG.ev1,
    tag: 'Moderate–high evidence',
    title: 'cryolipolysis (coolsculpting fat freezing)',
    does: 'Applies controlled cooling to selectively injure fat cells under the skin. The damaged cells are cleared over weeks, which reduces the local fat layer without surgery.',
    results: [
      'A systematic review of 19 clinical studies found average fat layer reductions of 10.3–25.5 percent on ultrasound and 14.7–28.5 percent on skinfold calipers, with no meaningful change in blood lipids or liver tests and mostly mild, temporary side effects.',
      'An abdominal study in women reported a 46.6 percent average reduction in fat thickness at 6 months after a single session, with no change in body weight or BMI, showing a true contour effect rather than general weight loss.',
    ],
    foot: 'Single cycle to debulk one key pocket · Results usually develop from 8–12 weeks · Best for stubborn bulges rather than overall slimming',
  },
  {
    img: IMG.ev2,
    tag: 'Targeted effect',
    title: 'localised body contouring, not general weight loss',
    does: 'These technologies reshape specific areas that do not change much with diet or gym, such as lower belly, flanks or double chin, while overall weight often stays similar.',
    results: [
      'In abdominal cryolipolysis follow up, fat thickness fell by almost half and circumferences dropped by about 1 cm while body weight, total fat mass and lean mass stayed stable, confirming a local contour effect rather than general slimming.',
      'Clinical notes on submental fat reduction with deoxycholic acid highlight that this type of fat often persists even in people who are not overweight and can be resistant to standard weight reduction measures, which is exactly the scenario this package targets.',
    ],
    foot: 'Best for people already working on lifestyle · Used to smooth specific problem spots that remain after diet and exercise · Not a substitute for full weight loss programs',
  },
  {
    img: IMG.ev3,
    tag: 'Synergy',
    title: 'why we combine fat freezing and fat dissolving in one plan',
    does: 'Cryolipolysis gently debulks and smooths a wider pad of fat, while injection lipolysis lets the doctor fine tune edges and smaller bulges inside the same zone. Together they allow more tailored shaping than either tool alone.',
    results: [
      'Reviews of cryolipolysis confirm it as a safe, modestly to moderately effective method for focal adiposity reduction with high satisfaction and rare serious complications.',
      'Separate reviews of intralipotherapy conclude that modern adipocytolytic injectables have proven effectiveness for nonsurgical reduction of unaesthetic pockets of fat when used by trained clinicians.',
      'Combining two evidence based local fat reduction tools within a doctor led plan is consistent with current body contouring practice, which increasingly uses multimodal approaches to match the shape change to the patient’s specific anatomy.',
    ],
    foot: 'Starter Pack uses 1 CoolSculpting cycle plus 1 fat dissolving session on a single key area · Final protocol set after in person medical consultation and photos · Additional cycles or sessions available later based on response',
  },
];

/* ============================================================ */
export default function FatReductionPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [openEv, setOpenEv] = useState<number | null>(null);

  const body: React.CSSProperties = { color: TAUPE, fontFamily: BODY, fontSize: 15, lineHeight: 1.7, margin: 0 };

  return (
    <div style={{ backgroundColor: '#ffffff', fontFamily: BODY }}>
      {/* ===================== 1. HERO ===================== */}
      <section style={{ ...CONTAINER, maxWidth: 1180, paddingTop: 24, paddingBottom: 24 }}>
        <div
          style={{
            backgroundImage: `url(${IMG.heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#f1f0eb',
            borderRadius: 28,
            padding: '48px 52px',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 48, alignItems: 'center' }} className="fr-hero-grid">
            {/* left copy */}
            <div>
              <Eyebrow align="left">COOLSCULPTING IN MALTA</Eyebrow>
              <h1 style={{ color: GREEN, fontFamily: SERIF, fontWeight: 400, fontSize: 32, lineHeight: 1.25, letterSpacing: '1.5px', textTransform: 'uppercase', margin: '10px 0 14px' }}>
                fat eraser protocol
              </h1>
              <p style={{ color: INK, fontFamily: WIDE, fontWeight: 700, fontSize: 18, letterSpacing: '0.5px', margin: '0 0 14px' }}>
                BURN STUBBORN FAT, NO SURGERY.
              </p>
              <p style={{ ...body, marginBottom: 20 }}>
                For those who have tried dieting, eating healthier and moving more, but the love handles, stubborn belly fat and double chin still will not budge.
              </p>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {HERO_INCLUDES.map((it) => (
                  <li key={it} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <Tick size={17} />
                    <span style={{ color: TAUPE, fontFamily: BODY, fontSize: 14.5 }}>{it}</span>
                  </li>
                ))}
              </ul>

              <p style={{ color: TAUPE_DK, fontFamily: WIDE, fontWeight: 700, fontSize: 15, letterSpacing: '0.5px', margin: '0 0 4px' }}>
                TOTAL VALUE: €550&nbsp;&nbsp;&nbsp;TODAY: <span style={{ color: GREEN }}>€199 ONLY</span>
              </p>
              <p style={{ color: TAUPE_LT, fontFamily: BODY, fontSize: 13, margin: '0 0 20px' }}>€100 for individual sessions</p>

              <div style={{ marginBottom: 16 }}>
                <CTA variant="green">Claim your spot now</CTA>
              </div>
              <div style={{ marginBottom: 18 }}>
                <Stars />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {HERO_FINEPRINT.map((f) => (
                  <p key={f} style={{ color: TAUPE_LT, fontFamily: BODY, fontSize: 11, lineHeight: 1.5, margin: 0, maxWidth: 460 }}>{f}</p>
                ))}
              </div>
            </div>

            {/* right image + badge */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              {/* Hero is a looping video on the live page; the jpg is its poster frame. */}
              <video
                src={IMG.heroVideo}
                poster={IMG.hero}
                autoPlay
                muted
                loop
                playsInline
                aria-label="CoolSculpting fat freezing treatment at Carisma, Malta"
                style={{ width: '100%', maxWidth: 360, aspectRatio: '398 / 682', objectFit: 'cover', borderRadius: 18, display: 'block', backgroundColor: '#dce6dc' }}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMG.badge} alt="#1 Voted Clinic in Malta" style={{ width: 64, height: 'auto' }} />
                <span style={{ color: TAUPE, fontFamily: WIDE, fontSize: 12, letterSpacing: '1px', lineHeight: 1.3, textTransform: 'uppercase' }}>
                  #1 Voted Clinic<br />in Malta
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== 2. SECRET TO A MORE DEFINED LOOK ===================== */}
      <section style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div style={CONTAINER}>
          <SectionHeading>the secret to a more defined,<br />confident look</SectionHeading>
          <p style={{ color: TAUPE, fontFamily: WIDE, fontSize: 16, letterSpacing: '0.5px', textTransform: 'uppercase', textAlign: 'center', margin: '16px 0 0' }}>
            shrink love handles &amp; target stubborn fat pockets with precision
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 48, alignItems: 'center', marginTop: 40 }} className="fr-2col">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMG.sec2} alt="CoolSculpting applicator targeting stubborn fat" style={{ width: '100%', borderRadius: 16, display: 'block' }} />
            <div>
              <p style={{ ...body, marginBottom: 18 }}>
                You are eating better and moving more, yet the same bulge shows up in every outfit. Your jeans still cut into your hips, your bra digs into your back, or every selfie seems to highlight your double chin. The scale might move a little, but your shape does not.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {SECRET_BULLETS.map((b) => (
                  <li key={b} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <Tick size={16} />
                    <span style={{ ...body }}>{b}</span>
                  </li>
                ))}
              </ul>
              <p style={{ ...body, marginBottom: 24 }}>
                If you read this and think &ldquo;This is me&rdquo;, your willpower is not the problem. Localised fat is. You need a targeted contouring plan that freezes and dissolves those fat cells directly so your body finally reflects the effort you are already making.
              </p>
              <CTA variant="blue" />
            </div>
          </div>
        </div>
      </section>

      {/* ===================== 3. MALTA'S TRUSTED CLINIC — PRESS ===================== */}
      <section style={{ paddingTop: 24, paddingBottom: 48 }}>
        <div style={CONTAINER}>
          <SectionHeading size={24}>malta&rsquo;s trusted clinic for<br />non surgical fat reduction</SectionHeading>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 40, marginTop: 28 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMG.press.maltaDaily} alt="Malta Daily" style={{ height: 38, width: 'auto' }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMG.press.maltaToday} alt="Malta Today" style={{ height: 34, width: 'auto' }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMG.press.lovin} alt="Lovin Malta" style={{ height: 40, width: 'auto' }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMG.press.times} alt="Times of Malta" style={{ height: 38, width: 'auto' }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMG.press.mtToday} alt="MT Today" style={{ height: 38, width: 'auto' }} />
          </div>
        </div>
      </section>

      {/* ===================== 4. FOUR NAMED BENEFITS ===================== */}
      <section style={{ paddingTop: 32, paddingBottom: 56 }}>
        <div style={{ ...CONTAINER, maxWidth: 1180 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 22 }} className="fr-benefits">
            {BENEFITS.map((b) => (
              <div
                key={b.title}
                style={{
                  background: 'linear-gradient(150deg, #eef2ea 0%, #dfe7da 100%)',
                  borderRadius: '22px 22px 0 22px',
                  padding: '28px 24px 34px',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.icon} alt="" style={{ width: 52, height: 52, objectFit: 'contain', marginBottom: 18 }} />
                <h3 style={{ color: TAUPE_DK, fontFamily: WIDE, fontWeight: 700, fontSize: 15, letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 12px', lineHeight: 1.3 }}>
                  {b.title}
                </h3>
                <p style={{ color: TAUPE, fontFamily: BODY, fontSize: 14, lineHeight: 1.6, margin: 0 }}>{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== 5. ELIGIBILITY — TREATABLE AREAS ===================== */}
      <section style={{ paddingTop: 32, paddingBottom: 56 }}>
        <div style={CONTAINER}>
          <Eyebrow>eligibility criteria</Eyebrow>
          <div style={{ width: 90, height: 1, backgroundColor: '#d9d2ca', margin: '10px auto 14px' }} />
          <SectionHeading>selective by intention successful by design</SectionHeading>

          <div style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 44, alignItems: 'center', marginTop: 36 }} className="fr-2col">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMG.elig} alt="Double chin and jawline fat freezing treatment" style={{ width: '100%', borderRadius: 16, display: 'block' }} />
            <div>
              <p style={{ color: TAUPE_DK, fontFamily: WIDE, fontWeight: 700, fontSize: 15, letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 20px', lineHeight: 1.4 }}>
                Treat visible fat bulges in 7 areas of the body
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {AREAS.map((a, i) => (
                  <div
                    key={a}
                    style={{
                      gridColumn: i === AREAS.length - 1 ? '1 / -1' : 'auto',
                      backgroundColor: '#eef1ec',
                      borderRadius: 8,
                      padding: '14px 16px',
                      textAlign: 'center',
                      color: TAUPE,
                      fontFamily: WIDE,
                      fontSize: 12.5,
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {a}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== 6. CARISMA DIFFERENCE ===================== */}
      <section style={{ position: 'relative', paddingTop: 48, paddingBottom: 64, overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMG.diffBg}
          alt=""
          aria-hidden
          style={{ position: 'absolute', left: 0, top: '40%', width: '100%', opacity: 0.5, pointerEvents: 'none', zIndex: 0 }}
        />
        <div style={{ ...CONTAINER, position: 'relative', zIndex: 1 }}>
          <Eyebrow>the carisma difference</Eyebrow>
          <div style={{ marginTop: 10 }}>
            <SectionHeading>we are not<br />another diet clinic.</SectionHeading>
          </div>
          <p style={{ ...body, textAlign: 'center', maxWidth: 720, margin: '18px auto 0' }}>
            We&rsquo;re a doctor led transformation program that blends medical insight, sustainable nutrition, and modern body tech into one high touch system, so you don&rsquo;t just lose weight, you step into your strongest form.
          </p>

          <div
            style={{
              marginTop: 36,
              marginLeft: 'auto',
              marginRight: 'auto',
              maxWidth: 560,
              background: 'linear-gradient(150deg, #eef2ec 0%, #e0e8df 100%)',
              borderRadius: 18,
              padding: '34px 36px',
            }}
          >
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {DIFF_BULLETS.map((d) => (
                <li key={d} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <Tick size={18} />
                  <span style={{ color: TAUPE, fontFamily: WIDE, fontSize: 12.5, letterSpacing: '0.4px', textTransform: 'uppercase', lineHeight: 1.5 }}>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===================== 7. PACKAGE TREATMENTS — COOLSCULPTING ===================== */}
      <section style={{ paddingTop: 32, paddingBottom: 56 }}>
        <div style={CONTAINER}>
          <Eyebrow>package treatments</Eyebrow>
          <div style={{ marginTop: 8 }}>
            <SectionHeading>malta&rsquo;s only multidisciplinary approach to weightloss</SectionHeading>
          </div>

          <div
            style={{
              marginTop: 36,
              background: 'linear-gradient(150deg, #f1f3ee 0%, #e2e9df 100%)',
              borderRadius: 20,
              padding: 36,
              display: 'grid',
              gridTemplateColumns: '0.85fr 1.15fr',
              gap: 40,
              alignItems: 'center',
            }}
            className="fr-2col"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMG.ba} alt="CoolSculpting before and after" style={{ width: '100%', borderRadius: 12, display: 'block' }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMG.orange} alt="" style={{ width: 150, height: 'auto', borderRadius: 12 }} />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 14 }}>
                <p style={{ color: TAUPE_DK, fontFamily: WIDE, fontWeight: 700, fontSize: 15, letterSpacing: '0.5px', textTransform: 'uppercase', margin: 0 }}>coolsculpting</p>
                <span style={{ color: GREEN, fontFamily: WIDE, fontSize: 11, letterSpacing: '1px', textTransform: 'uppercase', border: `1px solid ${GREEN}`, borderRadius: 20, padding: '5px 14px', whiteSpace: 'nowrap' }}>
                  targeted-fat reduction
                </span>
              </div>
              <p style={{ ...body, marginBottom: 14 }}>
                Freezes away up to 20%&mdash;25% of treated fat permanently via a process called cryolipolysis and naturally eliminates it from the body.
              </p>
              <p style={{ ...body, marginBottom: 18 }}>
                CoolSculpting is an FDA cleared cryolipolysis technology that uses controlled cooling to target only the fat cells under the skin without surgery or needles. The treated fat cells crystallise, die off, and are gradually cleared by your body over the following weeks
              </p>
              <p style={{ color: GREEN, fontFamily: WIDE, fontWeight: 700, fontSize: 14, letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 14px' }}>Proven efficacy</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {EFFICACY_BULLETS.map((b) => (
                  <li key={b} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <Tick size={16} />
                    <span style={{ ...body, fontSize: 14 }}>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== 8. DUAL TECHNOLOGY STARTER PACK ===================== */}
      <section style={{ paddingTop: 32, paddingBottom: 56 }}>
        <div style={CONTAINER}>
          <SectionHeading>malta&rsquo;s only dual technology<br />starter pack for stubborn fat</SectionHeading>

          <div
            style={{
              marginTop: 36,
              background: 'linear-gradient(150deg, #eef1ea 0%, #e7ece2 100%)',
              borderRadius: 22,
              padding: 22,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 22,
            }}
            className="fr-2col"
          >
            {/* left white card: 3 mini benefits */}
            <div style={{ backgroundColor: '#ffffff', borderRadius: 16, padding: '34px 30px', display: 'flex', flexDirection: 'column', gap: 26, justifyContent: 'center' }}>
              {DUAL_MINI.map((m) => (
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

            {/* right white card: includes + price + cta */}
            <div style={{ backgroundColor: '#ffffff', borderRadius: 16, padding: '30px 30px' }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 22px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {DUAL_INCLUDES.map((it) => (
                  <li key={it} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: TAUPE, fontFamily: BODY, fontSize: 14.5 }}>
                    <span style={{ color: TAUPE_LT, lineHeight: 1.2 }}>&bull;</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>

              <div style={{ background: 'linear-gradient(150deg, #eef2ea 0%, #dfe8db 100%)', borderRadius: 12, padding: '18px 20px' }}>
                <p style={{ color: TAUPE_DK, fontFamily: WIDE, fontWeight: 700, fontSize: 15, letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 12px' }}>
                  TOTAL VALUE: €550 TODAY: <span style={{ color: GREEN }}>€199 ONLY</span>
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 16 }}>
                  {DUAL_FINEPRINT.map((f) => (
                    <p key={f} style={{ color: TAUPE_LT, fontFamily: BODY, fontSize: 11, lineHeight: 1.5, margin: 0 }}>{f}</p>
                  ))}
                </div>
                <div style={{ marginBottom: 14 }}>
                  <CTA variant="blue" full>Claim your spot now</CTA>
                </div>
                <Stars withGoogle />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== 9. LEADING WELLNESS CHAIN (with location map) ===================== */}
      <section style={{ ...CONTAINER, maxWidth: 1120, paddingTop: 40, paddingBottom: 56 }}>
        <div style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(160deg, #f5f2ec 0%, #e7ece2 100%)', borderRadius: 24, padding: '48px 48px 44px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMG.wellBg} alt="" aria-hidden style={{ position: 'absolute', left: '50%', top: '46%', transform: 'translate(-50%, -50%)', width: 560, opacity: 0.28, pointerEvents: 'none', zIndex: 0 }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>the carisma difference</Eyebrow>
            <div style={{ width: 90, height: 1, backgroundColor: '#d9d2ca', margin: '10px auto 16px' }} />
            <SectionHeading>malta&rsquo;s #1 leading wellness chain</SectionHeading>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginTop: 40, alignItems: 'start' }} className="fr-2col">
              {/* left: commitment + why malta (stacked) */}
              <div>
                <h3 style={{ color: TAUPE_DK, fontFamily: WIDE, fontWeight: 700, fontSize: 15, letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 18px' }}>our commitment</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 30px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {COMMITMENT.map((c) => (
                    <li key={c} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: TAUPE, fontFamily: BODY, fontSize: 14.5, lineHeight: 1.55 }}>
                      <span style={{ color: TAUPE_LT }}>&bull;</span><span>{c}</span>
                    </li>
                  ))}
                </ul>
                <h3 style={{ color: TAUPE_DK, fontFamily: WIDE, fontWeight: 700, fontSize: 15, letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 18px' }}>why malta chooses carisma</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {WHY_MALTA.map((c) => (
                    <li key={c} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: TAUPE, fontFamily: BODY, fontSize: 14.5, lineHeight: 1.55 }}>
                      <span style={{ color: TAUPE_LT }}>&bull;</span><span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* right: location map */}
              <div style={{ borderRadius: 14, overflow: 'hidden', boxShadow: '0 8px 26px rgba(120,114,104,0.18)' }}>
                <iframe
                  title="Carisma Slimming clinic location in Malta"
                  src="https://www.google.com/maps?q=Carisma%20Slimming%2C%20Malta&output=embed"
                  width="100%"
                  height="360"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ border: 0, display: 'block' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, marginTop: 40, flexWrap: 'wrap' }}>
              <CTA variant="blue" />
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: TAUPE, fontFamily: WIDE, fontSize: 13, letterSpacing: '1px', textTransform: 'uppercase' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMG.parking} alt="" style={{ width: 22, height: 'auto' }} />
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
            {FAQS.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} style={{ borderBottom: '1px solid #e6e1da' }}>
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    style={{
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '20px 4px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 16,
                      textAlign: 'left',
                    }}
                  >
                    <span style={{ color: open ? GREEN : TAUPE_DK, fontFamily: WIDE, fontSize: 14, letterSpacing: '0.5px', textTransform: 'uppercase', lineHeight: 1.4 }}>{f.q}</span>
                    <span style={{ color: TAUPE_LT, fontSize: 18, flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>&#8964;</span>
                  </button>
                  {open && (
                    <p style={{ ...body, padding: '0 4px 22px', maxWidth: 760 }}>{f.a}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== 11. EVIDENCE BASED APPROACH ===================== */}
      <section style={{ paddingTop: 32, paddingBottom: 64 }}>
        <div style={{ ...CONTAINER, maxWidth: 1100 }}>
          <Eyebrow>clinical research: basis of our methodology</Eyebrow>
          <div style={{ marginTop: 8 }}>
            <SectionHeading size={25}>evidence based approach</SectionHeading>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, marginTop: 40 }} className="fr-evgrid">
            {EVIDENCE.map((e, i) => {
              const open = openEv === i;
              const centerLast = i === EVIDENCE.length - 1;
              return (
                <div
                  key={e.title}
                  style={{
                    backgroundColor: '#f7f5f1',
                    borderRadius: 16,
                    overflow: 'hidden',
                    gridColumn: centerLast ? '1 / -1' : 'auto',
                    maxWidth: centerLast ? 540 : undefined,
                    justifySelf: centerLast ? 'center' : 'stretch',
                    width: centerLast ? '100%' : undefined,
                  }}
                >
                  <div style={{ position: 'relative' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={e.img} alt="" style={{ width: '100%', height: 168, objectFit: 'cover', display: 'block' }} />
                    <span style={{ position: 'absolute', top: 12, left: 12, backgroundColor: 'rgba(255,255,255,0.92)', color: TAUPE_DK, fontFamily: WIDE, fontSize: 10.5, letterSpacing: '0.5px', textTransform: 'uppercase', padding: '5px 12px', borderRadius: 20 }}>
                      {e.tag}
                    </span>
                  </div>
                  <div style={{ padding: '24px 26px 28px' }}>
                    <h3 style={{ color: GREEN, fontFamily: SERIF, fontWeight: 400, fontSize: 17, lineHeight: 1.35, letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 16px' }}>{e.title}</h3>
                    <p style={{ color: TAUPE_DK, fontFamily: WIDE, fontWeight: 700, fontSize: 12, letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 8px' }}>What it does</p>
                    <p style={{ ...body, fontSize: 14, marginBottom: 16 }}>{e.does}</p>
                    {open && (
                      <>
                        <p style={{ color: TAUPE_DK, fontFamily: WIDE, fontWeight: 700, fontSize: 12, letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 8px' }}>Key results</p>
                        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                          {e.results.map((r) => (
                            <li key={r} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                              <span style={{ color: TAUPE_LT }}>&bull;</span>
                              <span style={{ ...body, fontSize: 13.5 }}>{r}</span>
                            </li>
                          ))}
                        </ul>
                        <p style={{ color: TAUPE_LT, fontFamily: BODY, fontSize: 12.5, lineHeight: 1.6, margin: 0 }}>{e.foot}</p>
                      </>
                    )}
                    <button
                      onClick={() => setOpenEv(open ? null : i)}
                      style={{ marginTop: 14, background: 'none', border: 'none', cursor: 'pointer', color: GREEN, fontFamily: WIDE, fontSize: 12.5, letterSpacing: '0.5px', textTransform: 'uppercase', padding: 0 }}
                    >
                      {open ? 'Read less' : 'Read more'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 44 }}>
            <CTA variant="blue">Claim my spot now</CTA>
          </div>
        </div>
      </section>

      {/* responsive: collapse two-column grids on narrow screens */}
      <style>{`
        @media (max-width: 860px) {
          .fr-hero-grid, .fr-2col, .fr-benefits, .fr-evgrid { grid-template-columns: 1fr !important; }
          .fr-evgrid > div { grid-column: auto !important; }
        }
        @media (max-width: 560px) {
          .fr-benefits { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
