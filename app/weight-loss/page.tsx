'use client';

import { useState } from 'react';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
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

function PhoneButton() {
  return (
    <a
      href={`tel:${phoneNumber.replace(/\s/g, '')}`}
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

/* Press / media authority strip — reuses the real logos from the main site */
function AsSeenOn() {
  const logos = [
    { src: '/wix/f940f0_8bd141199fea4275a1222b62f24f2d98~mv2.jpeg', alt: 'Lovin Malta', w: 149, h: 44 },
    { src: '/wix/f940f0_8c40f03f50684bf8adc6d9ca0cb2be9e~mv2.jpg', alt: 'Malta Daily', w: 113, h: 33 },
    { src: '/wix/f940f0_e6f0bd96c9d04debaa8d8b609cbf68e6~mv2.jpeg', alt: '89.7 Bay', w: 52, h: 44 },
    { src: '/wix/f940f0_2120887ab6ef4957b02ff004e804beaf~mv2.png', alt: 'Times of Malta', w: 52, h: 44 },
    { src: '/wix/f940f0_0db6f1508426404eacea3b33b0e9112d~mv2.png', alt: 'maltatoday', w: 75, h: 44 },
  ];
  return (
    <section className="pt-10 pb-5" style={{ backgroundColor: '#fff' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="mb-2" style={{ color: taupeLight, fontFamily: wideFont, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase' }}>
          As seen on
        </p>
        <div className="mx-auto mb-8" style={{ width: '90px', height: '1px', backgroundColor: '#d9cfc6' }} />
        <div className="flex flex-wrap items-center justify-center" style={{ gap: '12px' }}>
          {logos.map((l) => (
            <Image
              key={l.src}
              src={l.src}
              alt={l.alt}
              width={l.w}
              height={l.h}
              style={{ objectFit: 'contain', width: `${l.w}px`, height: `${l.h}px` }}
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   1. HERO
   ============================================================ */
function HeroSection() {
  return (
      <PageHero
        eyebrow="Malta's most comprehensive slimming program"
        headline={[
          { text: 'Medical Weight Loss in Malta' },
          { text: 'Doctor-Led & Guaranteed', em: true },
        ]}
        sub="Personalised programs combining medical-grade analysis, prescription support, nutrition and body sculpting with weekly check-ins — to help you hit your target weight and keep it off."
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
   2. PROBLEM / AGITATION
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
      {/* Narrative */}
      <div className="pt-14 pb-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto" style={{ background: 'linear-gradient(180deg, #F8F6F2 0%, #DCE7D9 100%)', border: '1px solid #E5E5E3', borderRadius: '16px', padding: '40px', maxWidth: '976px' }}>
            <h2 id="problem-heading" className="mb-7 text-center" style={{ color: green, fontFamily: headingFont, fontWeight: 400, fontSize: '25px', textTransform: 'uppercase', lineHeight: 1.4 }}>
              Weight Loss After 30 in Malta<br />Without Giving Up the Foods You Love
            </h2>
            <div className="mx-auto mb-7" style={{ width: '64px', height: '1px', backgroundColor: green }} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="overflow-hidden mx-auto shadow-md" style={{ width: '334px', maxWidth: '100%', height: '362px', borderTopLeftRadius: '18px', borderTopRightRadius: '90px', borderBottomLeftRadius: '90px', borderBottomRightRadius: '18px' }}>
                <img
                  src="/wix/87fc13_16e7dbed_consult_668x724.jpg"
                  alt="Slimming consultation at the Carisma clinic in Malta"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div>
                <p className="mb-6" style={pStyle}>
                  You are eating better than you did in your twenties, yet the weight around your stomach and hips does not budge. You walk more, you try to be good, but every year your clothes feel tighter and your energy feels lower.
                </p>
                <ul className="space-y-3 mb-6">
                  {empathy.map((t) => (
                    <li key={t} className="flex items-start gap-2" style={liStyle}>
                      <span style={bullet}>&bull;</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
                <p style={pStyle}>
                  If you read this and think &lsquo;This is me&rsquo;, your willpower is not the problem. Your biology has changed. You need a medically guided plan that works with your age, hormones and metabolism while still letting you eat the foods you love.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why it's harder after 30 */}
      <div className="py-24" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center mb-2" style={{ color: taupe, fontFamily: wideFont, fontSize: '16px', letterSpacing: '3.2px', textTransform: 'uppercase' }}>
            Why everything else failed?
          </p>
          <div className="mx-auto mb-6" style={{ width: '110px', height: '1px', backgroundColor: '#cdd8c8' }} />
          <h2 className="text-center mb-6" style={{ color: green, fontFamily: headingFont, fontWeight: 400, fontSize: '25px', textTransform: 'uppercase', lineHeight: 1.4 }}>
            Why Is It So Much Harder<br />To Lose Weight After 30?
          </h2>
          <p className="mb-12 text-center mx-auto" style={{ ...pStyle, maxWidth: '520px' }}>
            Most of what you have tried was built on one idea: eat less, move more. That might work for a 25 year old with no stress. It is not enough for a 40 plus body with real hormones, real history and real responsibilities.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8" style={{ background: panelGradient, borderTopLeftRadius: '48px', borderTopRightRadius: '12px', borderBottomLeftRadius: '12px', borderBottomRightRadius: '48px' }}>
              <h3 className="mb-5 text-center" style={{ color: taupe, fontFamily: wideFont, fontSize: '15px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>What those plans ignored</h3>
              <ul className="space-y-3">
                {ignored.map((t) => (
                  <li key={t} className="flex items-start gap-2" style={liStyle}>
                    <span style={bullet}>&bull;</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8" style={{ background: panelGradient, borderTopLeftRadius: '12px', borderTopRightRadius: '48px', borderBottomLeftRadius: '48px', borderBottomRightRadius: '12px' }}>
              <h3 className="mb-5 text-center" style={{ color: taupe, fontFamily: wideFont, fontSize: '15px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>What those plans got wrong</h3>
              <ul className="space-y-3">
                {wrong.map((t) => (
                  <li key={t} className="flex items-start gap-2" style={liStyle}>
                    <span style={bullet}>&bull;</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-10 mx-auto text-center" style={{ maxWidth: '600px' }}>
            <p style={{ color: taupe, fontFamily: wideFont, fontSize: '15px', lineHeight: 1.4, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              So you end up <strong style={{ color: greenDark }}>hungrier</strong>, more <strong style={{ color: greenDark }}>tired</strong> and more <strong style={{ color: greenDark }}>frustrated</strong>, often with <strong style={{ color: greenDark }}>less muscle</strong> and a <strong style={{ color: greenDark }}>slower metabolism</strong> than when you started.
            </p>
          </div>
          <div className="mt-10 mx-auto max-w-3xl text-center p-8" style={{ background: panelGradient, borderRadius: '16px' }}>
            <p style={{ ...pStyle, fontSize: '15px', lineHeight: 1.4 }}>
              <strong style={{ color: greenDark }}>Our program is built to reverse exactly that:</strong> we reset your metabolism for your age, protect muscle, work with your hormones and show you how to lose weight while still eating food you enjoy.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <CTAButton label="GET YOUR FREE BODY ANALYSIS" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   3. PROGRAM OVERVIEW — how it works (steps) + suitability
   ============================================================ */
function ProgramOverviewSection() {
  const consultationSteps = [
    'Go through your goals, your reasons for changing and your timeline',
    'Review your health history, medications and past diets',
    'Look at your current capacity for food changes, movement and clinic visits',
    'Share real before and after cases that match your age, body type and situation',
    'Explain exactly how our guarantee works and what support you receive',
    'Tell you honestly if you are a good candidate for this transformation',
  ];

  const suitableFor = [
    'You are 28–60 with 5–20 kg to lose',
    'Your body has changed with age, hormones or menopause',
    'You want a medical approach, not another fad diet',
    'You want to lose weight while still eating real food',
    'You are willing to follow a clear plan with weekly check-ins',
    'You are ready to invest time, energy and budget into your health',
    'Committed to attend all scheduled appointments and sessions',
  ];

  const notSuitableFor = [
    'You are pregnant, or breastfeeding',
    'You want a rapid, extreme "crash diet" style solution',
    'You are not willing to follow a structured plan',
    'You cannot commit to weekly check-ins or scheduled appointments',
    'You want results without changing routines, eating habits, or lifestyle basics',
    "You are currently dealing with an unmanaged medical condition, or you're on medication that requires medical clearance (we'll screen this in the consultation)",
  ];

  const [active, setActive] = useState(0);
  const tabs = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'];
  const colHead = { color: taupe, fontFamily: wideFont, fontSize: '16px', fontWeight: 700 as const, letterSpacing: '1px', textTransform: 'uppercase' as const };
  const stepTitle = { ...colHead, fontWeight: 400 as const };
  // live page renders step-panel copy smaller and tighter than the rest of the page
  const pStyle = { color: taupe, fontFamily: bodyFont, fontWeight: 400 as const, fontSize: '13px', lineHeight: 1.4 };
  const liStyle = { color: taupe, fontFamily: bodyFont, fontWeight: 400 as const, fontSize: '13px', lineHeight: 1.4 };

  return (
    <section className="py-24" aria-labelledby="program-heading">
      <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '992px' }}>
        <h2 id="program-heading" className="text-center mb-2" style={{ color: taupe, fontFamily: wideFont, fontSize: '16px', letterSpacing: '3.2px', textTransform: 'uppercase' }}>
          How Our Doctor-Led Weight Loss Programme Works
        </h2>
        <div className="mx-auto mb-10" style={{ width: '110px', height: '1px', backgroundColor: '#cdd8c8' }} />

        {/* Step tabs */}
        <div role="tablist" aria-label="Program steps" className="flex" style={{ borderBottom: '1px solid #e3ded6' }}>
          {tabs.map((t, i) => (
            <button
              key={t}
              role="tab"
              aria-selected={active === i}
              aria-controls={`step-panel-${i}`}
              id={`step-tab-${i}`}
              onClick={() => setActive(i)}
              className="flex-1 pb-4 text-center transition-colors min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ color: active === i ? greenDark : taupeLight, fontFamily: wideFont, fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase', borderBottom: active === i ? `2px solid ${green}` : '2px solid transparent', marginBottom: '-1px' }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div style={{ background: panelGradient, borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px', padding: '32px' }}>
          {active === 0 && (
            <div role="tabpanel" id="step-panel-0" aria-labelledby="step-tab-0" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Complimentary consultation */}
              <div className="card p-7">
                <div className="flex items-center gap-3 mb-5">
                  <Image src="/wix/87fc13_d2a17b8db6de4c8c8c41219e3a2c99cb~mv2.png" alt="" role="presentation" width={50} height={50} style={{ height: '50px', width: 'auto', objectFit: 'contain' }} loading="lazy" />
                  <h3 style={colHead}>Complimentary Consultation</h3>
                </div>
                <p className="mb-5" style={pStyle}>
                  Every program starts with a full in-clinic consultation. This is where we decide together if our guided transformation protocol is the right fit for you. Because we stand behind your results, we are selective about who we can work with.
                </p>
                <ol className="space-y-2 mb-5">
                  {consultationSteps.map((s, i) => (
                    <li key={s} className="flex items-start gap-3" style={liStyle}>
                      <span style={{ color: greenDark, fontWeight: 600 }}>{i + 1}.</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
                <p style={pStyle}>
                  If we do not believe we can deliver real, measurable change, we will not enrol you into the program. If we do accept you, it is because we are prepared to stand behind your results.
                </p>
              </div>
              {/* Suitable / Not suitable */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="card p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <Image src="/wix/87fc13_59346c1121b34e759ebf20eba3054c8c~mv2.png" alt="" role="presentation" width={30} height={30} style={{ objectFit: 'contain' }} loading="lazy" />
                    <h3 style={colHead}>Suitable for</h3>
                  </div>
                  <ul className="space-y-3">
                    {suitableFor.map((t) => (
                      <li key={t} className="flex items-start gap-2" style={liStyle}>
                        <span style={bullet}>&bull;</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <Image src="/wix/87fc13_50f34e909595497794177a54bdb32314~mv2.png" alt="" role="presentation" width={27} height={27} style={{ objectFit: 'contain' }} loading="lazy" />
                    <h3 style={colHead}>Not suitable for</h3>
                  </div>
                  <ul className="space-y-3">
                    {notSuitableFor.map((t) => (
                      <li key={t} className="flex items-start gap-2" style={liStyle}>
                        <span style={bullet}>&bull;</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {active === 1 && (
            <div role="tabpanel" id="step-panel-1" aria-labelledby="step-tab-1" className="card p-7">
              <div className="flex items-center gap-3 mb-5">
                <Image src="/wix/87fc13_05acf8a406274fbd9b5586bead0d2df5~mv2.png" alt="" role="presentation" width={63} height={63} style={{ height: '63px', width: 'auto', objectFit: 'contain' }} loading="lazy" />
                <h3 style={stepTitle}>Body analysis &amp; medical grade consultation</h3>
              </div>
              <p className="mb-4" style={pStyle}>
                Before we change your food or your body, we take time to understand you. If eligibile set up an appointment with medical doctor to review your health, hormones, medical history, medications, pregnancies, and menopause. You also meet your slimming consultant for clinical measurements and a body composition scan, looking at fat, muscle, visceral fat, and water &mdash; not just the number on the scale.
              </p>
              <p className="mb-4" style={pStyle}>
                We talk through how you feel day to day: energy, cravings, sleep, mood, digestion, and joint pain. Together, we set a clear baseline for your transformation.
              </p>
              <p className="mb-2" style={pStyle}>What we may check, if it makes sense for you:</p>
              <ul className="space-y-2 mb-4">
                {['Blood tests for thyroid, blood sugar and cholesterol', 'Food intolerance testing if symptoms suggest it', 'Blood pressure and other basic checks to ensure your plan is safe'].map((t) => (
                  <li key={t} className="flex items-start gap-2" style={liStyle}><span style={bullet}>&bull;</span><span>{t}</span></li>
                ))}
              </ul>
              <p className="mb-4" style={pStyle}>These assesments determine your GLP-1 (e.g., Ozempic, Mounjaro) eligibility.</p>
              <p style={pStyle}>
                Based on your results, we we enroll you on your prescription protocol, tailor a program length and treatment mix that is realistic for your starting point and schedule your follow ups to check-in with our doctor and slimming consultant. This is where &ldquo;nothing works for my body&rdquo; starts to become a clear picture and a safe, personalised plan.
              </p>
            </div>
          )}

          {active === 2 && (
            <div role="tabpanel" id="step-panel-2" aria-labelledby="step-tab-2" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card p-7">
                <div className="flex items-center gap-3 mb-5">
                  <Image src="/wix/87fc13_b0aad949fa9d47b58f1512dcf2522e3d~mv2.png" alt="" role="presentation" width={63} height={63} style={{ height: '63px', width: 'auto', objectFit: 'contain' }} loading="lazy" />
                  <h3 style={stepTitle}>Diet and accountability</h3>
                </div>
                <p className="mb-5" style={pStyle}>
                  Together we build a personalised food plan that fits school runs, meetings, weekends and Maltese food. We do not hand you a random PDF and wish you luck. Your plan is built on three simple rules:
                </p>
                {[
                  ['Mediterranean style, not misery style', 'Plenty of protein, olive oil, veg, beans and whole grains, with room for bread, pasta and social meals in the right portions.'],
                  ['Higher protein to protect muscle and keep you full', 'Enough protein to keep you satisfied, support metabolism and avoid losing muscle while you lose fat.'],
                  ['Flexible structure, not food fear', 'No “good vs bad” foods. We teach portions and timing so you can enjoy hobz biz zejt, pasta, wine or dessert without losing control.'],
                ].map(([title, desc]) => (
                  <div key={title} className="mb-4">
                    <p style={{ ...pStyle, fontWeight: 700 }}>{title}</p>
                    <p style={pStyle}>{desc}</p>
                  </div>
                ))}
              </div>
              <div className="card p-7">
                <div className="flex items-center gap-3 mb-5">
                  <Image src="/wix/87fc13_9a4ac5ded2b94bbbb6e11e641f46f5d5~mv2.png" alt="" role="presentation" width={63} height={63} style={{ height: '63px', width: 'auto', objectFit: 'contain' }} loading="lazy" />
                  <h3 style={stepTitle}>Then we shape it around your life:</h3>
                </div>
                <ul className="space-y-3 mb-5">
                  {[
                    ['Busy mums', 'Fast family meals, smart leftovers and simple plate formulas'],
                    ['Menopause', 'Blood sugar balance, protein timing and fat loss strategies that support hormones'],
                    ['Bride / event prep', 'A clear 6–12 week plan that tightens your silhouette without banning social events'],
                  ].map(([lead, rest]) => (
                    <li key={lead} className="flex items-start gap-2" style={liStyle}>
                      <span style={bullet}>&bull;</span>
                      <span><strong>{lead}</strong> &ndash; {rest}</span>
                    </li>
                  ))}
                </ul>
                <p className="mb-5" style={pStyle}>
                  No shakes only, no keto only, no 1,000 calorie days. Your plan has to work on bad weeks, or it does not work at all.
                </p>
                <p className="mb-3" style={{ ...pStyle, fontWeight: 700 }}>Accountability: how we keep you moving</p>
                <p className="mb-3" style={pStyle}>You are not doing this alone or guessing between visits.</p>
                <ul className="space-y-2">
                  {[
                    'Weekly check-ins with weight and measurements so we see what is really happening',
                    'Short written progress updates every week or two with clear next steps',
                    'WhatsApp check-ins so you can message when you are stuck, tempted or confused',
                    'If you go quiet, we follow up first — without judgement — to help you get back on track',
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2" style={liStyle}><span style={bullet}>&bull;</span><span>{t}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {active === 3 && (
            <div role="tabpanel" id="step-panel-3" aria-labelledby="step-tab-3" className="card p-7">
              <div className="flex items-center gap-3 mb-5">
                <Image src="/wix/87fc13_83de975f116646a795c9db7ebdc3b4be~mv2.png" alt="" role="presentation" width={50} height={50} style={{ height: '50px', width: 'auto', objectFit: 'contain' }} loading="lazy" />
                <h3 style={stepTitle}>Movement That Fits Your Life</h3>
              </div>
              <p className="mb-4" style={pStyle}>
                Weight loss sticks when movement feels realistic, not punishing. In Step 4, we design a movement plan that meets you exactly where you are today and fits seamlessly into your schedule, fitness level, and preferences.
              </p>
              <p className="mb-4" style={pStyle}>
                The goal is simple: build consistency, improve strength, increase basal metabolic rate, and keep you progressing week after week.
              </p>
              <p className="mb-3" style={{ ...pStyle, fontWeight: 700 }}>Choose the training style that suits you</p>
              <ul className="space-y-3">
                {[
                  ['Open Gym Access (Independent Training):', 'Train on your own time with a clear plan to follow. Perfect if you like flexibility and want structure without fixed class times.'],
                  ['Group Classes (Fat Loss + Strength):', 'High-energy sessions designed to burn fat, build lean muscle, and keep you accountable. Ideal if you thrive with community and coaching in the room.'],
                  ['Personal Training (Extra Guidance + Motivation):', 'One-to-one sessions for maximum support, form coaching, and personalised progression. Best if you want faster confidence, tighter technique, and strong accountability.'],
                ].map(([lead, rest]) => (
                  <li key={lead} className="flex items-start gap-2" style={liStyle}>
                    <span style={bullet}>&bull;</span>
                    <span><strong>{lead}</strong> {rest}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {active === 4 && (
            <div role="tabpanel" id="step-panel-4" aria-labelledby="step-tab-4" className="space-y-6">
              <div className="card p-7">
                <h3 className="mb-4" style={stepTitle}>Body Contouring Treatments Included in Your Programme</h3>
                <p style={pStyle}>
                  We use internationally renowned technologies to shape, tighten and refine your results &mdash; never cheap gadgets or outdated machines. Our treatments are not the whole plan, but they are powerful tools when used on top of a solid medical, diet and movement strategy. Every device we use is leading in its category, chosen for safety, research and real-world results.
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Muscle stimulation- emsculpt neo',
                    icon: '/wix/87fc13_3d8f7ee53e874397bc85784823b4aaeb~mv2.png',
                    desc: 'Emsculpt NEO uses high-intensity electromagnetic pulses to contract your muscles thousands of times in a session, stimulating the effect of 20,000 sit-ups in one 30 minute session',
                    uses: [
                      'Build and tone muscle in areas like abdomen and glutes',
                      'Support posture and core strength as you lose weight',
                      'Refine shape after you start dropping kilos',
                    ],
                    note: 'You stay dressed, lie down, and feel strong, deep contractions while our team monitors you.',
                  },
                  {
                    title: 'Fat freezing — CoolSculpting',
                    icon: '/wix/87fc13_d170f070d1d64560b77dd6ce085f4221~mv2.png',
                    desc: 'CoolSculpting is the market leading fat freezing technology that targets stubborn pockets of fat that do not respond to diet and exercise. It cools fat cells in a controlled way so your body can gradually clear them over time.',
                    uses: [
                      'Target areas like lower belly, flanks, bra fat or thighs',
                      'Help contour the body after your weight starts to come down',
                      'Support results without surgery or downtime',
                    ],
                    note: 'Every treatment plan is based on your medical assessment and body goals, not a “one area fits all” offer.',
                  },
                  {
                    title: 'Lymphatic drainage',
                    icon: '/wix/87fc13_3933ed261bfe433cbd96167c588de803~mv2.png',
                    desc: 'We offer lymphatic drainage using compressive microvibration technology and specialised massage.',
                    uses: [
                      'Support circulation and fluid drainage',
                      'Help with that “puffy, heavy” feeling some women experience in the legs or abdomen',
                      'Complement fat loss and skin tightening treatments',
                    ],
                    note: '',
                  },
                  {
                    title: 'Skin tightening — VelaShape',
                    icon: '/wix/87fc13_64873b0f01a348d6ac5b28470e897b18~mv2.png',
                    desc: 'VelaShape combines radiofrequency, infrared light, gentle vacuum and massage to heat the deeper layers of the skin and stimulate collagen.',
                    uses: [
                      'Improve skin texture and mild laxity as the body changes',
                      'Smooth the look of areas that feel softer or “looser” after weight loss',
                      'Support circulation and the appearance of cellulite-prone zones',
                    ],
                    note: 'It feels like a warm, deep massage rather than a harsh, painful treatment.',
                  },
                ].map((t) => (
                  <div key={t.title} className="card p-7">
                    <div className="flex items-center gap-3 mb-5">
                      <Image src={t.icon} alt="" role="presentation" width={65} height={65} style={{ height: '65px', width: 'auto', objectFit: 'contain' }} loading="lazy" />
                      <h3 style={stepTitle}>{t.title}</h3>
                    </div>
                    <p className="mb-4" style={pStyle}>{t.desc}</p>
                    <p className="mb-2" style={{ ...pStyle, fontWeight: 700 }}>We use it to:</p>
                    <ul className="space-y-2 mb-4">
                      {t.uses.map((u) => (
                        <li key={u} className="flex items-start gap-2" style={liStyle}><span style={bullet}>&bull;</span><span>{u}</span></li>
                      ))}
                    </ul>
                    {t.note && <p style={pStyle}>{t.note}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
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
    <section className="py-24" aria-labelledby="pillars-heading" style={{ backgroundColor: '#ffffff' }}>
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
                  <h3 className="mb-4" style={{ color: greenDark, fontFamily: headingFont, fontSize: '22px', fontWeight: 400 }}>{t.title}</h3>
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
  const items = [
    'Doctor led: full medical check and body scan',
    'One integrated program: medical, diet, movement and treatments together',
    'Real gym included: Technogym facility, semi-private classes and PT',
    'High touch support: weekly check ins, progress reports and WhatsApp follow up',
    'Evidence based devices: Emsculpt NEO, coolsculpting and RF skin tightening',
    'Selective entry and measurable weight loss results guaranteed',
  ];
  return (
    <section className="relative py-20" aria-labelledby="difference-heading" style={{ backgroundColor: '#ffffff', backgroundImage: 'url(/wix/87fc13_eed9276b67e74ae99994e6bab4bcd409~mv2.webp)', backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      {/* Accessibility scrim — the centred sage watermark has darkest pixel #A8C0AD; a 0.7 white veil
          lifts the effective background to ~#e5ece6 so taupe body clears 4.81:1 and green text 4.51:1 (AA). */}
      <div aria-hidden="true" className="absolute inset-0" style={{ backgroundColor: 'rgba(255,255,255,0.7)', pointerEvents: 'none' }} />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center mb-2" style={{ color: taupe, fontFamily: wideFont, fontSize: '15px', letterSpacing: '3px', textTransform: 'uppercase' }}>
          the carisma difference
        </p>
        <div className="mx-auto mb-6" style={{ width: '110px', height: '1px', backgroundColor: '#d9cfc6' }} />
        <h2 id="difference-heading" className="text-center mb-6" style={{ color: green, fontFamily: headingFont, fontWeight: 400, fontSize: '25px', textTransform: 'uppercase', lineHeight: 1.3 }}>
          Why Carisma Slimming Is Different<br />From Every Other Weight Loss Clinic in Malta
        </h2>
        <p className="text-center mx-auto mb-12 max-w-2xl" style={pStyle}>
          We&apos;re a doctor led transformation program that blends medical insight, sustainable nutrition, and modern body tech into one high touch system, so you don&apos;t just lose weight, you step into your strongest form.
        </p>
        <div className="mx-auto max-w-xl">
          <ul className="space-y-6">
            {items.map((t) => (
              <li key={t} className="flex items-start gap-4">
                <Image src="/wix/87fc13_59346c1121b34e759ebf20eba3054c8c~mv2.png" alt="" role="presentation" width={23} height={23} style={{ objectFit: 'contain', flexShrink: 0, marginTop: '2px' }} loading="lazy" />
                <span style={{ color: taupe, fontFamily: wideFont, fontSize: '15px', letterSpacing: '0.5px', textTransform: 'uppercase', lineHeight: 1.5 }}>{t}</span>
              </li>
            ))}
          </ul>
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
      <section style={{ background: 'linear-gradient(180deg, #ffffff 0%, #eef3ea 40%, #F2F6EF 100%)', padding: '88px 0 0', overflow: 'hidden', position: 'relative' }}>
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
      <section style={{ background: 'linear-gradient(180deg, #F2F6EF 0%, #f6f9f3 70%, #ffffff 100%)', padding: '72px 0 80px' }}>
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

              {/* Conditions grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {conditions.map((c, i) => (
                  <div key={c.label} style={{ background: '#ffffff', borderRadius: '12px', padding: '16px', boxShadow: '0 2px 12px rgba(2,76,39,0.06)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontFamily: wideFont, fontSize: '10px', fontWeight: 700, color: '#C9D8C1', letterSpacing: '1px' }}>0{i + 1}</span>
                      <span style={{ fontFamily: wideFont, fontSize: '10px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: green }}>{c.label}</span>
                    </div>
                    <p style={{ fontFamily: bodyFont, fontSize: '12.5px', lineHeight: 1.6, color: taupe, margin: 0 }}>{c.text}</p>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '28px' }}>
                <a
                  href={freshaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-glow"
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: wideFont, fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', textDecoration: 'none', color: '#fff', padding: '14px 28px', borderRadius: '999px', minHeight: '44px' }}
                >
                  Apply for the Guarantee
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
   5d. THE CARISMA DIFFERENCE — wellness chain + map
   ============================================================ */
function CarismaWellnessSection() {
  const commitment = [
    'Visible inch loss and shape change, not vague promises',
    'Plans that work with your age, hormones and metabolism',
    'No crash diets, no banned foods, no endless hours of cardio',
    'Medical grade technology and treatments delivered by trained professionals',
  ];
  const whyMalta = [
    "Created by the team behind Malta's leading spa and medical aesthetics centres",
    'Doctor led medical slimming, not a beauty salon "diet program"',
    'All in one approach: assessment, nutrition, movement and treatments',
    'High touch support with weekly check ins and WhatsApp coaching',
  ];
  return (
    <section className="py-20" style={{ backgroundColor: '#ffffff' }}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '1090px' }}>
        <div style={{ background: 'linear-gradient(135deg, #FCFCFA 0%, #E6EFE3 100%)', borderRadius: '16px', padding: '48px', boxShadow: '0 18px 40px rgba(0,0,0,0.06)' }}>
          <p className="text-center mb-2" style={{ color: taupe, fontFamily: wideFont, fontSize: '14px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase' }}>
            the carisma difference
          </p>
          <div className="mx-auto mb-4" style={{ width: '110px', height: '1px', backgroundColor: '#B9A99E' }} />
          <h2 className="text-center mb-12" style={{ color: green, fontFamily: headingFont, fontWeight: 400, fontSize: '25px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Malta&rsquo;s #1 Voted Slimming Clinic<br />35+ Years of Wellness Results
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="space-y-10">
              <div>
                <h3 className="mb-5" style={{ color: taupe, fontFamily: wideFont, fontSize: '15px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Our Commitment
                </h3>
                <ul className="space-y-3">
                  {commitment.map((item) => (
                    <li key={item} className="flex items-start gap-2" style={{ color: taupe, fontFamily: bodyFont, fontSize: '14px', lineHeight: 1.8 }}>
                      <span style={{ color: green }}>&bull;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-5" style={{ color: taupe, fontFamily: wideFont, fontSize: '15px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Why Malta Chooses Carisma
                </h3>
                <ul className="space-y-3">
                  {whyMalta.map((item) => (
                    <li key={item} className="flex items-start gap-2" style={{ color: taupe, fontFamily: bodyFont, fontSize: '14px', lineHeight: 1.8 }}>
                      <span style={{ color: green }}>&bull;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <iframe
                title="Carisma Slimming location"
                src="https://maps.google.com/maps?q=Grand%20Hotel%20Excelsior%2C%20Great%20Siege%20Road%2C%20Floriana%20FRN%201810%2C%20Malta&z=15&output=embed"
                width="428"
                height="359"
                style={{ border: 0, borderRadius: '16px', display: 'block', maxWidth: '100%' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-12">
            <div className="flex flex-wrap gap-3 items-center">
              <a
                href="https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2843963&eid=5009163&oiid=sv%3A25969858&share=true&pId=2708191"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get your free body analysis (opens in new tab)"
                className="cta-glow text-center font-bold text-white inline-flex items-center justify-center min-h-[44px] transition-opacity duration-200 hover:opacity-90 active:opacity-80"
                style={{ fontFamily: wideFont, fontSize: '13px', letterSpacing: '0.5px', textTransform: 'uppercase', padding: '14px 40px' }}
              >
                Get Your Free Body Analysis &rsaquo;
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Image src="/wix/87fc13_2b8e2795b62445a5a99d90d5490491eb~mv2.png" alt="" role="presentation" width={34} height={34} style={{ width: '34px', height: 'auto', objectFit: 'contain' }} loading="lazy" />
              <span style={{ color: taupe, fontFamily: wideFont, fontSize: '15px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
                Complimentary on-site parking
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
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
      <div className="py-16" style={{ backgroundColor: softBg }}>
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
              <a
                href="/slimming-guide"
                className="cta-glow inline-flex items-center justify-center font-bold text-white text-center min-h-[44px] transition-opacity duration-200 hover:opacity-90 active:opacity-80"
                style={{ padding: '14px 34px', fontFamily: wideFont, fontSize: '14px', letterSpacing: '0.5px' }}
              >
                READ THE GUIDE
              </a>
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
        <div className="relative mb-10">
          <h2 className="text-center" style={{ color: green, fontFamily: headingFont, fontWeight: 400, fontSize: '24px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Frequently Asked Questions About Medical Weight Loss in Malta
          </h2>
          <div className="mt-6 md:mt-0 md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 mx-auto" style={{ width: '256px', maxWidth: '100%' }}>
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
const leafCorners = {
  borderTopLeftRadius: '18px',
  borderTopRightRadius: '90px',
  borderBottomLeftRadius: '90px',
  borderBottomRightRadius: '18px',
};

function EvidenceCard({ item }: { item: { title: string; strength: string; image: string; what?: string; results: string[]; chips: string[] } }) {
  const [expanded, setExpanded] = useState(false);
  const labelStyle = { color: taupe, fontFamily: wideFont, fontSize: '12px', fontWeight: 600 as const, letterSpacing: '1px', textTransform: 'uppercase' as const };
  const clamp = expanded ? {} : { display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' };
  return (
    <div className="flex flex-col items-center">
      {/* Image with badge — overlaps the card below */}
      <div className="relative z-10 overflow-hidden" style={{ ...leafCorners, width: '381px', maxWidth: '92%', height: '182px', boxShadow: '0 14px 30px rgba(0,0,0,0.12)' }}>
        <Image src={item.image} alt={item.title} fill style={{ objectFit: 'cover' }} loading="lazy" />
        <span
          className="absolute"
          style={{ top: '14px', left: '14px', backgroundColor: '#ffffff', color: green, fontFamily: wideFont, fontSize: '13px', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase', padding: '5px 12px', borderRadius: '9999px', boxShadow: '0 4px 12px rgba(0,0,0,0.12)' }}
        >
          {item.strength}
        </span>
      </div>
      {/* Body card */}
      <div className="w-full -mt-14 px-7 pb-9" style={{ paddingTop: '70px', background: 'linear-gradient(180deg, #FCFCFA 0%, #FCFCFA 58%, #DCE7D9 100%)', borderTopLeftRadius: '18px', borderTopRightRadius: '18px', borderBottomLeftRadius: '18px', borderBottomRightRadius: '60px' }}>
        <h3 className="text-center" style={{ color: green, fontFamily: headingFont, fontWeight: 400, fontSize: '25px', textTransform: 'uppercase', lineHeight: 1.4 }}>
          {item.title}
        </h3>
        <div className="mx-auto mt-3 mb-6" style={{ width: '90px', height: '1px', backgroundColor: taupeLight }} />
        {item.what && (
          <>
            <p className="mb-2" style={labelStyle}>WHAT IT DOES</p>
            <p style={{ ...pStyle, fontSize: '14px', ...clamp }}>{item.what}</p>
          </>
        )}
        {(expanded || !item.what) && (
          <>
            <p className={item.what ? 'mt-4 mb-2' : 'mb-2'} style={labelStyle}>KEY RESULTS</p>
            {expanded ? (
              <ul className="space-y-2">
                {item.results.map((r) => (
                  <li key={r} className="flex items-start gap-2" style={{ ...liStyle, fontSize: '14px' }}>
                    <span style={bullet}>&bull;</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ ...pStyle, fontSize: '14px', ...clamp }}>{item.results[0]}</p>
            )}
          </>
        )}
        {expanded && item.chips.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-5">
            {item.chips.map((c) => (
              <span key={c} style={{ backgroundColor: '#ffffff', color: taupe, fontFamily: bodyFont, fontSize: '12px', padding: '5px 12px', borderRadius: '9999px', border: '1px solid #dfe6dc' }}>{c}</span>
            ))}
          </div>
        )}
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="mt-3 min-h-[44px] px-2 focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ color: taupe, fontFamily: bodyFont, fontSize: '13px', fontStyle: 'italic', textDecoration: 'underline', cursor: 'pointer', background: 'transparent' }}
        >
          {expanded ? 'See Less' : 'See More'}
        </button>
      </div>
    </div>
  );
}

function EvidenceApproachSection() {
  const items = [
    {
      title: 'energy-restricted mediterranean nutrition',
      strength: 'HIGH-evidence',
      image: '/Clams.png',
      results: [
        'Major obesity guidelines recommend a daily energy reduction of 500–1000 kcal, targeting 0.5–1 kg per week of weight loss as a safe, sustainable rate PM',
        'In the PREDIMED-Plus lifestyle trial, older adults with overweight/obesity on an energy-restricted Mediterranean diet lost 3.2 kg at 12 months, versus 0.7 kg in the control group, and 33.7% achieved at least 5% weight loss (vs 11.9% in control). ScienceDirect',
      ],
      chips: ['Daily 500–750 kcal deficit', 'Mediterranean pattern', 'Target 5–10% body-weight loss over first 3–6 months'],
    },
    {
      title: 'higher-protein, muscle-protective diet',
      strength: 'HIGH-evidence',
      image: '/Cooking.png',
      what: 'Raises protein within a calorie deficit to preserve lean mass and improve fullness while fat is lost.',
      results: [
        'SMD 0.75 preservation of muscle mass vs standard protein in meta-analysis. ratePMC+2MDPI+2',
        'Meta-analysis of 47 trials (n = 3218) found that higher protein intake significantly reduced muscle mass loss during weight-loss programs in adults with overweight/obesity (standardized mean difference 0.75, 95% CI 0.41–1.10).Diabetes Journals+1',
        'Without structured exercise, people with obesity typically lose around 1–2.5 kg of muscle for every 10 kg of weight lost, highlighting the need for protein support.',
      ],
      chips: ['Protein quietly increased toward ≥1.2–1.5 g/kg ideal body weight', 'Focus on lean meats, fish, dairy, legumes', 'Built into all plans'],
    },
    {
      title: 'diet plus exercise (not diet alone)',
      strength: 'HIGH-evidence',
      image: '/Diet.png',
      what: 'Combining structured exercise with diet delivers better long-term weight loss and body-composition change than diet alone.',
      results: [
        '+1.1 kg extra loss with diet plus exercise vs diet only at long-term follow-up.',
        'Meta-analysis of long-term trials showed diet-plus-exercise programs produced an additional 1.1 kg of weight loss on average compared with diet alone, including in studies lasting 2 years or more. PMC+1',
        'Obesity guidelines recommend structured physical activity alongside dietary energy deficit for optimal weight and cardiometabolic outcomes. Gastrojournal+1',
      ],
      chips: ['Technogym gym access', 'Mix of resistance, cardio and mobility', 'Individual or semi-private formats'],
    },
    {
      title: 'cryolipolysis (coolSculpting-type fat freezing)',
      strength: 'Moderate–high evidence',
      image: '/wix/87fc13_6d89e9c129304617a960aa46bb07eed4~mv2.jpg',
      what: 'Applies controlled cooling to selectively injure subcutaneous fat cells, which are then cleared naturally, reducing local fat thickness.',
      results: [
        '10–26% reduction in fat layer thickness on ultrasound after treatment series.',
        'Systematic review of cryolipolysis studies reports average ultrasound-measured fat layer reductions between 10.3% and 25.5%, with caliper reductions up to 28.5%, and only mild, transient side effects in most patients.Superdrug Online Doctor',
        'Recent prospective data confirm cryolipolysis as a safe and effective method for local abdominal fat reduction, with significant decreases in fat thickness and high satisfaction. Dr.Oracle+1',
      ],
      chips: ['1–3 cycles per area', 'Results typically visible from 8–12 weeks', 'Used for stubborn pockets, not overall weight loss'],
    },
    {
      title: 'hifem + rf body sculpting (emsculpt neo)',
      strength: 'Emerging high-quality evidence',
      image: '/wix/87fc13_d79664fae1184e8e8c947c3d350af498~mv2.jpg',
      what: 'Combines high-intensity focused electromagnetic pulses with radiofrequency heating to contract muscle and heat fat at the same time.',
      results: [
        'About 25–30% muscle gain and 25–30% fat reduction in treated areas after a standard course',
        'Clinical data on HIFEM+RF procedures report average 25–30% increases in muscle mass and 25–30% reductions in subcutaneous fat in treated regions after a series of sessions.Bloomberg School of Public Health+2Pentagon Hospitals+2',
        'MRI and ultrasound studies show significant improvements in abdominal muscle thickness and fat layer reduction with good safety profiles. PMC+1',
      ],
      chips: ['Typical course 4 sessions, about 1 week apart', 'Visible changes from 4–12 weeks after final session', 'Works best alongside calorie deficit'],
    },
    {
      title: 'rf, infrared and vacuum massage (velashape-type)',
      strength: 'Moderate evidence',
      image: '/wix/87fc13_8e6b2be93835401caee6402885a0fb6c~mv2.jpg',
      what: 'Uses radiofrequency, infrared light and mechanical massage to improve skin firmness, local circulation and the appearance of cellulite while modestly reducing circumference.',
      results: [
        'Mean 0.8 inch (about 2 cm) thigh circumference reduction after 8 weeks in early studies.',
        'Clinical studies of VelaSmooth/VelaShape systems show that 100% of patients had some cellulite improvement and a mean thigh circumference reduction of about 0.8 inch, with some patients losing more than 2 inches after a treatment seriesWikipedia',
        'Later VelaShape III trials report statistically significant circumference reductions when combined with other non-invasive body-contouring tools. Diabetes Journals+2felixhospital.com+2',
      ],
      chips: ['3–6 sessions per area', 'Best for skin texture and mild contouring', 'Often paired with fat reduction and lifestyle change'],
    },
    {
      title: 'lymphatic drainage and recovery massage',
      strength: 'Adjunct • Supportive',
      image: '/ly.png',
      what: 'Gentle manual techniques support lymph flow and venous return, helping manage swelling, heaviness and recovery after some procedures.',
      results: [
        'Improves edema and comfort when combined with compression and exercise in lymphedema care.',
        'Systematic reviews describe manual lymphatic drainage as a widely used conservative therapy that can improve edema, symptoms and quality of life in people with lymphedema when combined with compression and exercise.PMC+2Gastrojournal+2',
      ],
      chips: ['Scheduled around treatment blocks', 'Focus on comfort and fluid balance', 'Not a fat-loss method by itself'],
    },
    {
      title: 'why we combine approaches',
      strength: 'Synergy',
      image: '/wix/87fc13_440425b61c66444abe7e3062dbfcd290~mv2.jpg',
      what: 'Targets weight, hormones, muscle, fat and skin together instead of relying on a single tool.',
      results: [
        'Diet plus exercise plus structured support delivers better long-term weight loss than diet alone in trials lasting up to 2 years and beyond.',
        'Long-term meta-analysis shows combined diet-plus-exercise programs maintain about 1.1 kg more weight loss than diet alone at extended follow-up. PMC+1',
        'Obesity guidelines from major societies recommend multi-component interventions that combine calorie deficitPMC+1',
      ],
      chips: [],
    },
  ];
  return (
    <section className="py-24" aria-labelledby="evidence-approach-heading" style={{ backgroundColor: '#ffffff' }}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '970px' }}>
        <p className="text-center mb-2" style={{ color: taupe, fontFamily: wideFont, fontSize: '16px', fontWeight: 600, letterSpacing: '3.2px', textTransform: 'uppercase' }}>
          Clinical research: basis of our methodology
        </p>
        <div className="mx-auto mb-4" style={{ width: '110px', height: '1px', backgroundColor: '#B9A99E' }} />
        <h2 id="evidence-approach-heading" className="text-center mb-14" style={{ color: green, fontFamily: headingFont, fontWeight: 400, fontSize: '25px', textTransform: 'uppercase', letterSpacing: '1px' }}>
          The Evidence-Based Approach Behind Our Weight Loss Programme
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-9 gap-y-12">
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
            We take on a limited number of new clients each month so every plan stays genuinely doctor-led. Book your free, no-obligation assessment and we&apos;ll tell you honestly whether the program is right for you.
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
      <div className="py-14" style={{ background: panelGradient }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p style={{ color: green, fontFamily: wideFont, fontSize: '13px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
            Carisma Wellness Group
          </p>
          <h3 className="mt-2 mb-6" style={{ color: greenDark, fontFamily: headingFont, fontSize: '24px', fontWeight: 400 }}>
            35+ years in wellness, aesthetics &amp; slimming
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
      <AsSeenOn />
      <ProblemAgitationSection />
      <CorePillarsSection />
      <ProgramOverviewSection />
      <CarismaDifferenceSection />
      <OurPromiseSection />
      <CarismaWellnessSection />
      <FAQSection />
      <EvidenceApproachSection />
    </main>
  );
}
