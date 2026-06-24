import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import PageHero from '@/components/PageHero';
import CountUp from '@/components/CountUp';

// Lazy-load below-fold components to reduce initial JS bundle
const ResultsCarousel = dynamic(() => import('@/components/ResultsCarousel'));
const HowItWorks     = dynamic(() => import('@/components/HowItWorks'));
const FAQAccordion   = dynamic(() => import('@/components/FAQAccordion'));
const EvidenceCards  = dynamic(() => import('@/components/EvidenceCards'));
import { JsonLd } from '@/lib/seo/JsonLd';
import {
  SITE_URL,
  breadcrumbList,
  faqPage,
  medicalWebPage,
} from '@/lib/seo/schema';
import { glp1Faqs } from '@/lib/faq/glp1';
import GradientField from '@/components/layers/GradientField';
import StepTimeline from '@/components/StepTimeline';
import Glp1PageTracker from '@/components/Glp1PageTracker';

export const metadata: Metadata = {
  title: "GLP-1 Weight Loss Malta | Ozempic & Mounjaro | Carisma",
  description: "Malta's #1 doctor-led GLP-1 clinic. Personalised weight loss with Ozempic & Mounjaro support, nutrition, body-comp tracking and medical supervision. Book free.",
  alternates: { canonical: 'https://www.carismaslimming.com/glp1' },
  openGraph: {
    title: "GLP-1 Weight Loss Malta | Ozempic & Mounjaro | Carisma Slimming",
    description: "Malta's #1 doctor-led GLP-1 clinic. Personalised weight loss with Ozempic & Mounjaro support, nutrition, body-comp tracking and medical supervision. Book free.",
    url: 'https://www.carismaslimming.com/glp1',
    images: [{ url: '/background.avif', width: 1200, height: 630, alt: 'GLP-1 Weight Loss Malta — Carisma Slimming' }],
  },
};

const jsonLd = [
  breadcrumbList([
    { name: 'Home', url: `${SITE_URL}/` },
    { name: 'GLP-1 Weight Loss Injections', url: `${SITE_URL}/glp1` },
  ]),
  medicalWebPage({
    name: 'GLP-1 Weight Loss Injections Malta — Ozempic & Mounjaro',
    description:
      'Medically prescribed GLP-1 injections in Malta including Ozempic and Mounjaro, supervised by qualified doctors as part of a structured weight loss programme.',
    url: `${SITE_URL}/glp1`,
  }),
  faqPage(glp1Faqs),
];

export default function GLP1Page() {
  const sustainability = [
    'Appetite regulation through Ozempic or Mounjaro to quiet cravings and reduce food noise',
    'A repeatable eating structure you can follow on busy weeks, not just perfect ones',
    'Muscle protection through guided movement to support metabolism as you lose fat',
    'Accountability and progression with weekly tracking, check-ins, and doctor-led adjustments',
    'A long-term maintenance plan for after the initial weight loss phase',
  ];

  const pillars = [
    {
      title: 'Doctor-first, not drug-first',
      body: 'We start with clinical suitability, not dosage. Your consultation reviews your full health history, risk factors, and goals, then your weight loss doctor sets clear expectations and a safe, personalised plan with ongoing medical oversight.',
    },
    {
      title: 'Appetite & metabolic support',
      body: 'Where clinically appropriate, Ozempic or Mounjaro prescription support can quiet hunger and reduce food noise, making consistency easier. As part of your program, we titrate carefully, monitor side effects, and pair medication with a repeatable eating structure, never in isolation.',
    },
    {
      title: 'Body composition, not weight',
      body: 'At our weight loss clinic in Malta, we track what actually matters: fat loss while protecting lean mass. You see progress through body composition trends, measurements, and strength progression, not just a number on the scale.',
    },
    {
      title: 'Programme, not prescription',
      body: 'Results come from phases, milestones, and a defined maintenance plan. Your journey is guided through a structured start, progress targets, and an exit strategy, so you do not rebound when the initial fat loss phase ends.',
    },
  ];

  const pillarIcons = [
    '/wix/87fc13_729173bc08764a74bee017b037d95d5b~mv2.png',
    '/wix/87fc13_82ddf84b6c664402b6d02dfacfa0d14f~mv2.png',
    '/wix/87fc13_a3a9f733a463406abf5b5177ef3aaa51~mv2.png',
    '/wix/87fc13_b4783b8ab4ad480fa01394e449f91d34~mv2.png',
  ];

  const headingFont = 'Trajan Pro, serif';
  const wideFont = 'Novecento Wide Book, sans-serif';
  const bodyFont = 'Roboto, sans-serif';

  // Tokens used by the "Our Promise" section (copied from weight-loss page)
  const green = '#4f7256';
  const taupe = '#6f6456';
  const freshaUrl =
    'https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2843963&eid=5009163&oiid=sv%3A25969858&share=true&pId=2708191';
  const promiseConditions = [
    { label: 'Show up', text: 'Attend all scheduled in-clinic sessions and weekly check-ins' },
    { label: 'Follow your plan', text: 'Stick to your personalised food plan — tell us if you struggle' },
    { label: 'Stay active', text: 'Complete your agreed movement plan or discuss any obstacles' },
    { label: 'Medical only', text: 'Use only the treatments and medications our team recommends' },
    { label: 'Keep us informed', text: 'Tell us about any health changes, medication or new diagnosis' },
    { label: 'No shortcuts', text: 'Avoid crash diets or outside weight loss treatments' },
  ];

  return (
    <main className="w-full" style={{ backgroundColor: '#ffffff' }}>
      <Glp1PageTracker />
      <JsonLd data={jsonLd} />
      {/* Hero Section */}
      <PageHero
        eyebrow="Ultimate weight loss protocol in Malta"
        headline={[
          { text: 'GLP-1 Weight Loss Injections in Malta' },
          { text: 'Ozempic & Mounjaro Support', em: true },
        ]}
        sub="Full medical assessment, personalised nutrition, body-composition tracking and ongoing doctor supervision — with Ozempic and Mounjaro support where clinically appropriate — to lose fat safely and keep it off."
        bullets={[
          { label: 'Calmer appetite:', text: 'GLP-1 support mimics natural fullness signals so you feel satisfied with smaller portions.' },
          { label: 'Doctor monitored:', text: 'Full assessment, body scan, blood tests and regular reviews to adjust your plan.' },
          { label: 'Part of a full plan:', text: 'Never medication alone — nutrition, movement and accountability included.' },
        ]}
        primaryCta={{ text: 'Book Your Consultation', href: 'https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2843963&eid=5009163&oiid=sv%3A25969858&share=true&pId=2708191', external: true }}
        secondaryCta={{ text: 'Speak to a Doctor', href: 'https://www.fresha.com/a/carisma-slimming-floriana-great-siege-road-wxxyuj9p/booking?pId=2708191&modal=employee-profile&employeeId=5084222&back=%2Fa%2Fcarisma-slimming-floriana-great-siege-road-wxxyuj9p&cartId=e54b0560-88a7-4e30-835b-5d10548e729b', external: true }}
        media={{ type: 'video', src: '/video/hero-720p.mp4', poster: '/glp1-hero.webp', alt: 'Doctor-led GLP-1 weight loss in Malta' }}
        proof={{ rating: '4.9', reviews: '800+', awardSrc: '/wix/f940f0_c4008d16bc3245f7bc8663f5b60d7a82~mv2.png', awardText: '#1 voted clinic\nMalta 2025–26' }}
        compactHeadline
        motif
        chips={['Ozempic®', 'Mounjaro®']}
      />

      {/* Medical Weight Loss Results */}
      <ResultsCarousel />

      {/* What is Medical Weight Loss */}
      <section style={{ background: 'linear-gradient(180deg, #ffffff 0%, #ffffff 100%)', paddingTop: 'clamp(12px, 3vw, 96px)', paddingBottom: 'clamp(12px, 3vw, 48px)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center" style={{ color: '#4f7256', fontFamily: wideFont, fontSize: '13px', letterSpacing: '3px', textTransform: 'uppercase' }}>
            What is medical weight loss?
          </p>
          <div className="mx-auto mt-[18px] mb-[18px]" style={{ width: '64px', height: '1px', backgroundColor: '#4f7256' }} />
          <h2 className="text-center uppercase" style={{ color: '#3c5a40', fontFamily: headingFont, fontWeight: 400, fontSize: 'clamp(24px,3.4vw,34px)', lineHeight: 1.25 }}>
            How GLP-1 treatment<br />works in practice
          </h2>
          <p className="mt-8 mb-12 text-center mx-auto" style={{ color: '#6f6456', fontFamily: bodyFont, fontSize: '15px', lineHeight: 1.8, maxWidth: '680px' }}>
            GLP-1 medication like Ozempic and Mounjaro is one piece &mdash; not the whole plan. Here&rsquo;s how it works inside our doctor-led{' '}
            <Link href="/weight-loss" style={{ color: '#4f7256', textDecoration: 'underline' }}>
              Medical Weight Loss Programme
            </Link>{' '}
            in Malta.
          </p>

          <StepTimeline
            steps={[
              { title: 'Full Medical Assessment', desc: 'A doctor reviews your health history, body composition and goals to confirm whether GLP-1 (Ozempic or Mounjaro) is clinically right for you.' },
              { title: 'GLP-1, Prescribed Properly', desc: 'Where appropriate, it’s prescribed inside a structured plan to regulate appetite and quiet food noise — never as a standalone shortcut.' },
              { title: 'Built Into a Full Plan', desc: 'Medication is paired with personalised nutrition, movement and weekly tracking — the habits and muscle protection medication alone can’t deliver.' },
              { title: 'Lasting Maintenance', desc: 'We protect your metabolism and plan for life after GLP-1, so the weight stays off and your results hold.' },
            ]}
          />
        </div>
      </section>


      {/* Sustainability */}
      <section style={{ background: 'linear-gradient(180deg, #ffffff 0%, #eef3ea 50%, #ffffff 100%)', paddingTop: 'clamp(12px, 3vw, 48px)', paddingBottom: 'clamp(12px, 3vw, 48px)' }}>
        <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '1100px' }}>
          <h2
            className="text-center mb-12 uppercase"
            style={{ color: '#3c5a40', fontFamily: headingFont, fontWeight: 400, fontSize: 'clamp(24px,3.4vw,34px)', lineHeight: 1.25 }}
          >
            Ozempic &amp; Mounjaro alone are not enough.<br />We build sustainable weight loss.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div
              className="w-full overflow-hidden"
              style={{ aspectRatio: '383 / 526', maxWidth: '420px', borderTopLeftRadius: '120px', borderBottomRightRadius: '120px', borderTopRightRadius: '16px', borderBottomLeftRadius: '16px' }}
            >
              <img src="/wix/87fc13_3028fef86af2454fa2fbdbb5dcd55d87~mv2.webp" alt="Patient consultation during medical weight loss program" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <p className="mb-6" style={{ color: '#6f6456', fontFamily: bodyFont, fontSize: '15px', lineHeight: '1.8' }}>
                Weight gain is not a failure of discipline; it is a complex medical and behavioural challenge
                shaped by biology, stress, hormones, and modern life. Hunger, cravings, your relationship with
                food, mental health, and time pressure all play a role. That is why a medical weight loss
                approach works where diets fail. At Carisma Slimming, Malta&apos;s doctor-led weight loss clinic,
                we approach weight management as a medical, lifestyle, and emotional process that needs
                structure, not willpower:
              </p>
              <ul className="space-y-3 mb-6">
                {sustainability.map((item, i) => (
                  <li key={i} className="flex items-start gap-3" style={{ color: '#6f6456', fontFamily: bodyFont, fontSize: '14px', lineHeight: '1.6' }}>
                    <span style={{ color: '#4f7256', fontWeight: 700 }}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mb-8" style={{ color: '#6f6456', fontFamily: bodyFont, fontSize: '15px', lineHeight: '1.8' }}>
                Ozempic and Mounjaro can help regulate appetite. Long-term results come from structure,
                monitoring, and habits that fit real life, and that is what our program delivers.
              </p>
              <a
                href="https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2843963&eid=5009163&oiid=sv%3A25969858&share=true&pId=2708191"
                className="cta-glow inline-block uppercase tracking-wide text-white font-bold text-center"
                style={{ padding: '14px 20px', fontFamily: wideFont, fontSize: '13px', letterSpacing: '1px', width: '474px', maxWidth: '100%' }}
              >
                book your medical consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Malta's trusted clinic — press logos + program pillars */}
      <section style={{ background: 'linear-gradient(180deg, #ffffff 0%, #eef3ea 50%, #ffffff 100%)', paddingTop: 'clamp(12px, 3vw, 48px)', paddingBottom: '0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-center"
            style={{ color: '#3c5a40', fontFamily: headingFont, fontWeight: 400, fontSize: 'clamp(24px,3.4vw,34px)', textTransform: 'uppercase', lineHeight: 1.35 }}
          >
            malta&apos;s trusted clinic for<br />doctor-led, medical weight loss
          </h2>

          {/* Press logos */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px 12px', marginTop: '40px', marginBottom: '40px' }}>
            {[
              { label: 'Malta Today', src: '/wix/f940f0_8c40f03f50684bf8adc6d9ca0cb2be9e~mv2.jpg', w: 134, h: 42 },
              { label: '89.7 Bay', src: '/wix/f940f0_e6f0bd96c9d04debaa8d8b609cbf68e6~mv2.jpeg', w: 47, h: 42 },
              { label: 'Lovin Malta', src: '/wix/f940f0_8bd141199fea4275a1222b62f24f2d98~mv2.jpeg', w: 158, h: 50 },
              { label: 'Times of Malta', src: '/wix/f940f0_2120887ab6ef4957b02ff004e804beaf~mv2.png', w: 47, h: 42 },
              { label: 'Malta Daily', src: '/wix/f940f0_0db6f1508426404eacea3b33b0e9112d~mv2.png', w: 66, h: 42 },
            ].map((logo) => (
              <div key={logo.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 'calc(33.33% - 8px)', minWidth: '100px' }}>
                <img
                  src={logo.src}
                  alt={logo.label}
                  style={{
                    maxWidth: '100%',
                    width: `${logo.w}px`,
                    height: `${logo.h}px`,
                    objectFit: 'contain',
                    mixBlendMode: 'multiply',
                    opacity: 1,
                  }}
                />
              </div>
            ))}
          </div>

          {/* Program pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, i) => (
              <div
                key={i}
                className="card lg-raised lg-raised--hover p-8"
                style={{ backgroundColor: '#ffffff', border: '1px solid #EAE4DB', boxShadow: '0 10px 30px rgba(60,90,64,0.08)' }}
              >
                <img src={pillarIcons[i]} alt="" style={{ width: '74px', height: '74px', objectFit: 'contain', marginBottom: '20px' }} />
                {/* Clean white card resting on the sage gradient section: taupe #5c5346 title
                    + body clear AA comfortably on solid white. */}
                <h3 className="mb-3" style={{ color: '#5c5346', fontFamily: wideFont, fontWeight: 600, fontSize: '15px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                  {pillar.title}
                </h3>
                <p style={{ color: '#5c5346', fontFamily: bodyFont, fontSize: '13px', lineHeight: 1.7 }}>
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Medical weight loss eligibility */}
      <section style={{ backgroundColor: '#ffffff', paddingTop: 'clamp(12px, 3vw, 80px)', paddingBottom: 'clamp(12px, 3vw, 96px)' }}>
        <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '760px' }}>
          <p className="text-center" style={{ color: '#4f7256', fontFamily: wideFont, fontSize: '13px', letterSpacing: '3px', textTransform: 'uppercase' }}>
            medical weight loss eligibility
          </p>
          <div className="mx-auto mt-[18px] mb-[18px]" style={{ width: '64px', height: '1px', backgroundColor: '#4f7256' }} />
          <h2 className="text-center mb-6" style={{ color: '#3c5a40', fontFamily: headingFont, fontWeight: 400, fontSize: 'clamp(24px,3.4vw,34px)', letterSpacing: '1px', textTransform: 'uppercase', lineHeight: 1.4 }}>
            Who is GLP-1 weight loss right for?
          </h2>
          <p className="mb-10" style={{ color: '#6f6456', fontFamily: bodyFont, fontSize: '14px', lineHeight: 1.6 }}>
            Ozempic and Mounjaro can be powerful, but only when prescribed as part of a structured, doctor-supervised approach. Eligibility is determined through a thorough medical assessment, including blood tests, food-intolerance screening, safety checks, and clear protocols, to ensure your program is appropriate, monitored, and adjusted responsibly.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="mb-5" style={{ color: '#4f7256', fontFamily: wideFont, fontWeight: 600, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                Suitable for:
              </h3>
              <ul className="space-y-5">
                {['BMI ≥27', 'Insulin resistence', 'Emotional eating or Long dieting history', 'Menopause-related weight gain'].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <img src="/wix/87fc13_59346c1121b34e759ebf20eba3054c8c~mv2.png" alt="Eligible" style={{ width: '26px', height: '28px', objectFit: 'contain', flexShrink: 0, marginTop: '-2px' }} />
                    <span style={{ color: '#6f6456', fontFamily: bodyFont, fontSize: '14px', lineHeight: 1.6 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-5" style={{ color: '#4f7256', fontFamily: wideFont, fontWeight: 600, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                Unsuitable for:
              </h3>
              <ul className="space-y-5">
                {['Eating disorders', 'Very lean patients', 'Those unwilling to attend check-ins', 'Currently pregnant or trying to conceive'].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <img src="/wix/87fc13_50f34e909595497794177a54bdb32314~mv2.png" alt="Not eligible" style={{ width: '19px', height: '19px', objectFit: 'contain', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ color: '#6f6456', fontFamily: bodyFont, fontSize: '14px', lineHeight: 1.6 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 justify-center mt-14">
            <a
              href="https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2843963&eid=5009163&oiid=sv%3A25969858&share=true&pId=2708191"
              className="cta-glow inline-block text-center font-bold text-white"
              style={{ fontFamily: wideFont, fontSize: '14px', letterSpacing: '1.4px', textTransform: 'uppercase', padding: '13px 24px' }}
            >
              book your medical consultation
            </a>
          </div>
        </div>
      </section>

      {/* We are not another diet clinic */}
      <section style={{ backgroundColor: '#ffffff', backgroundImage: 'url(/wix/87fc13_eed9276b67e74ae99994e6bab4bcd409~mv2.webp)', backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', paddingTop: 'clamp(12px, 3vw, 96px)', paddingBottom: 'clamp(12px, 3vw, 96px)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center" style={{ color: '#4f7256', fontFamily: wideFont, fontSize: '13px', letterSpacing: '3px', textTransform: 'uppercase' }}>
            The Carisma Difference
          </p>
          <div className="mx-auto mt-[18px] mb-[18px]" style={{ width: '64px', height: '1px', backgroundColor: '#4f7256' }} />
          <h2 className="text-center mb-6" style={{ color: '#3c5a40', fontFamily: headingFont, fontWeight: 400, fontSize: 'clamp(24px,3.4vw,34px)', textTransform: 'uppercase', lineHeight: 1.3 }}>
            Malta&apos;s doctor-led GLP-1 clinic —<br />not another diet programme.
          </h2>
          {/* Centered over a faint sage backgroundImage tint (worst case ~rgb(215,228,216));
              deeper taupe #5c5346 guarantees >=5.5:1 there where #6f6456 would be 4.40:1. */}
          <p className="text-center mx-auto mb-12" style={{ color: '#5c5346', fontFamily: bodyFont, fontSize: '16px', lineHeight: 1.7, maxWidth: '760px' }}>
            We are a doctor-led medical weight loss clinic in Malta that blends medical insight, sustainable nutrition, and modern body technology into one high-touch system. So you do not just lose weight, you build a stronger, healthier version of yourself.
          </p>
          {/* Clean two-column checklist — no container box, modern & airy */}
          <ul className="mx-auto grid sm:grid-cols-2" style={{ maxWidth: '900px', columnGap: '56px' }}>
            {([
              'Doctor-led medical weight loss: full check, body scan, and blood work',
              'One integrated program: medical support, nutrition, movement, and treatments together',
              'Real gym included: Technogym facility, semi-private classes, and personal training',
              'High-touch support: weekly check-ins, progress reports, and WhatsApp follow-up',
              <span key="devices">Evidence-based devices: <Link href="/packages/muscle-stimulation" style={{ color: '#4f7256', textDecoration: 'underline' }}>Emsculpt NEO</Link>, <Link href="/packages/fat-freezing" style={{ color: '#4f7256', textDecoration: 'underline' }}>CoolSculpting</Link>, and <Link href="/packages/skin-tightening" style={{ color: '#4f7256', textDecoration: 'underline' }}>RF skin tightening</Link></span>,
              'Selective entry and measurable results when you follow the program',
            ]).map((t, i) => (
              <li key={i} className="flex items-start gap-4" style={{ padding: '20px 2px', borderBottom: i < 4 ? '1px solid rgba(79,114,86,0.12)' : 'none' }}>
                <span aria-hidden style={{ flexShrink: 0, marginTop: '1px', width: '26px', height: '26px', borderRadius: '50%', background: 'rgba(79,114,86,0.1)', display: 'grid', placeItems: 'center' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4f7256" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </span>
                <span style={{ color: '#5c5346', fontFamily: wideFont, fontSize: '14px', letterSpacing: '0.5px', textTransform: 'uppercase', lineHeight: 1.55 }}>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works */}
      <HowItWorks />

      {/* Led by expertise — Dr Zaid Teebi */}
      <section style={{ paddingTop: 'clamp(12px, 3vw, 96px)', paddingBottom: 'clamp(12px, 3vw, 96px)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center" style={{ color: '#4f7256', fontFamily: wideFont, fontSize: '13px', letterSpacing: '3px', textTransform: 'uppercase' }}>
            Expert medical weight loss care
          </p>
          <div className="mx-auto mt-[18px] mb-[18px]" style={{ width: '64px', height: '1px', backgroundColor: '#4f7256' }} />
          <h2 className="text-center mb-12" style={{ color: '#3c5a40', fontFamily: headingFont, fontWeight: 400, fontSize: 'clamp(24px,3.4vw,34px)', letterSpacing: '1px', lineHeight: 1.4 }}>
            Doctor-supervised weight loss —<br />led by 30 years of clinical expertise.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div
              className="w-full overflow-hidden mx-auto"
              style={{ maxWidth: '448px', aspectRatio: '448 / 479', borderTopLeftRadius: '90px', borderTopRightRadius: '16px', borderBottomLeftRadius: '16px', borderBottomRightRadius: '90px', boxShadow: '0 16px 36px rgba(0,0,0,0.12)' }}
            >
              <img src="/wix/87fc13_130b2a48c11a4658bad12952342d1eb4~mv2.jpeg" alt="Dr Zaid Teebi, lead medical weight loss doctor at Carisma Slimming" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <h3 className="mb-4" style={{ color: '#4f7256', fontFamily: wideFont, fontSize: '20px', letterSpacing: '1px', textTransform: 'uppercase' }}>Dr Zaid Teebi</h3>
              <p className="mb-5" style={{ color: '#6f6456', fontFamily: bodyFont, fontSize: '15px', lineHeight: 1.7 }}>
                Dr. Zaid Teebi is the lead medical weight loss doctor at Carisma Slimming with over 30 years of clinical experience and an evidence-based focus on medical weight management and metabolic health. A graduate of Imperial College London, he combines medical rigour with a calm, human approach.
              </p>
              <p className="mb-8" style={{ color: '#6f6456', fontFamily: bodyFont, fontSize: '15px', lineHeight: 1.7 }}>
                His consultations are structured and personalised, with safety screening, clear expectations, and ongoing monitoring. Where clinically appropriate, he prescribes Ozempic or Mounjaro as part of a wider programme that includes nutrition structure, habit-based strength training to protect metabolism, and a long-term weight maintenance plan.
              </p>
              <p className="mb-8" style={{ color: '#6f6456', fontFamily: '"Brush Script MT", "Segoe Script", cursive', fontStyle: 'italic', fontSize: '23px', lineHeight: 1.6 }}>
                Medical weight loss should never be guesswork. Every body tells a story, and our job is to turn it into a plan that lasts&rdquo; &ndash; Dr. Teebi
              </p>
              <div className="flex flex-wrap gap-3 items-center">
                <a
                  href="https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2843963&eid=5009163&oiid=sv%3A25969858&share=true&pId=2708191"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-glow inline-block text-center font-bold text-white"
                  style={{ fontFamily: wideFont, fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase', padding: '14px 20px' }}
                >
                  Book your medical consultation
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our promise — extended care commitment (verbatim from weight-loss page) */}
      {/* ── Guarantee band — light on-brand panel (no dark-green background) ── */}
      <section style={{ background: 'linear-gradient(180deg, #ffffff 0%, #eef3ea 50%, #ffffff 100%)', paddingTop: 'clamp(12px, 3vw, 88px)', paddingBottom: '0', overflow: 'hidden', position: 'relative' }}>
        {/* Decorative large watermark number */}
        <span aria-hidden style={{
          position: 'absolute', right: '-2%', top: '4%',
          fontFamily: headingFont, fontSize: 'clamp(180px,26vw,340px)', fontWeight: 400,
          color: 'rgba(79,114,86,0.06)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
        }}>PLAN</span>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" style={{ textAlign: 'center', position: 'relative' }}>
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', border: `1px solid rgba(79,114,86,0.35)`, borderRadius: '999px', padding: '8px 20px', marginBottom: '36px', background: 'rgba(255,255,255,0.6)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={green} strokeWidth="1.8" aria-hidden>
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span style={{ fontFamily: wideFont, fontSize: '10px', fontWeight: 700, letterSpacing: '3px', color: green, textTransform: 'uppercase' }}>
              Medically Supported
            </span>
          </div>

          {/* Headline */}
          <h2 style={{ fontFamily: headingFont, fontSize: 'clamp(48px,8vw,88px)', fontWeight: 400, color: '#024C27', lineHeight: 0.95, textTransform: 'uppercase', marginBottom: '32px', letterSpacing: '-0.5px' }}>
            Measured<br />
            <em style={{ fontStyle: 'normal', color: green }}>Weekly Progress.</em>
          </h2>

          <p style={{ fontFamily: bodyFont, fontSize: '17px', lineHeight: 1.7, color: taupe, maxWidth: '520px', margin: '0 auto 16px' }}>
            If you qualify and follow your programme, your progress is reviewed regularly and extended support may apply at <strong style={{ color: '#024C27', fontWeight: 600 }}>no extra programme fee</strong>.
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
            { num: '3', stat: 'Extended Support', sub: 'If eligible, your plan is reviewed and extended support may apply at no extra programme fee' },
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
      <section style={{ background: 'linear-gradient(180deg, #ffffff 0%, #F2F6EF 50%, #ffffff 100%)', paddingTop: 'clamp(12px, 3vw, 72px)', paddingBottom: 'clamp(12px, 3vw, 80px)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '56px', alignItems: 'stretch' }}>

            {/* Photo + caption — image stretches to the full height of the list */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', flex: 1, minHeight: '460px', borderTopLeftRadius: '16px', borderTopRightRadius: '72px', borderBottomLeftRadius: '72px', borderBottomRightRadius: '16px', overflow: 'hidden', boxShadow: '12px -12px 0 #C9D8C1' }}>
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
                If you qualify and complete the programme as agreed, your doctor reviews your progress and may extend structured weight-management support at no extra programme fee.
              </p>

              <p style={{ fontFamily: wideFont, fontSize: '10px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#9B8D83', marginBottom: '16px' }}>
                For extended support, you agree to:
              </p>

              {/* Conditions — full-width stacked list */}
              <div>
                {promiseConditions.map((c, i) => (
                  <div
                    key={c.label}
                    style={{
                      display: 'flex',
                      gap: '16px',
                      alignItems: 'flex-start',
                      padding: '14px 0',
                      borderBottom: i < promiseConditions.length - 1 ? '1px solid rgba(79,114,86,0.1)' : 'none',
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

      {/* Safety, side effects & our system */}
      <section style={{ backgroundColor: '#ffffff', paddingTop: 'clamp(12px, 3vw, 96px)', paddingBottom: 'clamp(12px, 3vw, 96px)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <p className="text-center" style={{ color: '#4f7256', fontFamily: wideFont, fontSize: '13px', letterSpacing: '3px', textTransform: 'uppercase' }}>
            Safety &amp; monitoring
          </p>
          <div className="mx-auto mt-[18px] mb-[18px]" style={{ width: '64px', height: '1px', backgroundColor: '#4f7256' }} />
          <h2 className="text-center" style={{ color: '#3c5a40', fontFamily: headingFont, fontWeight: 400, fontSize: 'clamp(24px,3.4vw,34px)', lineHeight: 1.4, textTransform: 'uppercase' }}>
            Safety, side effects,<br />and our system
          </h2>
          <p className="mt-6 mb-14 text-center mx-auto" style={{ color: '#6f6456', fontFamily: bodyFont, fontSize: '15px', lineHeight: 1.8, maxWidth: '720px' }}>
            As part of our program, we prescribe Ozempic and Mounjaro with strict screening, clear education, and ongoing monitoring. Most side effects are manageable when dosing and nutrition are structured, and follow-ups are consistent.
          </p>

          {/* Two-column: side-effects management + supporting imagery */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left — common side effects, refined cards */}
            <div>
              <h3 className="mb-6" style={{ color: '#4f7256', fontFamily: wideFont, fontWeight: 600, fontSize: '13px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                Common side effects — and how we manage them
              </h3>
              <div className="flex flex-col gap-4">
                {[
                  { label: 'Nausea', text: 'slow titration, protein-first meals, hydration and electrolytes, injection timing guidance' },
                  { label: 'Constipation', text: 'tolerance-based fibre targets, fluids, daily movement, magnesium support when appropriate' },
                  { label: 'Diarrhoea', text: 'simple meal sequencing, trigger-food control, temporary dose stabilisation' },
                  { label: 'Fatigue', text: 'minimum calorie floors, protein and micronutrient monitoring, strength habits to protect energy' },
                  { label: 'Reflux', text: 'smaller structured portions, meal timing rules, behavioural guidance' },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="flex items-start gap-4"
                    style={{ backgroundColor: '#ffffff', border: '1px solid #EAE4DB', borderRadius: '14px', padding: '16px 20px', boxShadow: '0 6px 18px rgba(60,90,64,0.05)' }}
                  >
                    <span
                      className="flex items-center justify-center flex-shrink-0"
                      style={{ width: '34px', height: '34px', borderRadius: '9999px', backgroundColor: '#EAF1E6', marginTop: '1px' }}
                    >
                      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 9.5L7.5 13L14 5.5" stroke="#4f7256" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <div>
                      <span style={{ color: '#4f7256', fontFamily: wideFont, fontWeight: 600, fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>{s.label}</span>
                      <p style={{ color: '#6f6456', fontFamily: bodyFont, fontSize: '13.5px', lineHeight: 1.6, margin: 0 }}>{s.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — supporting imagery */}
            <div className="flex flex-col gap-5">
              <div className="w-full overflow-hidden" style={{ aspectRatio: '477 / 270', borderRadius: '16px', boxShadow: '0 10px 30px rgba(60,90,64,0.08)' }}>
                <img src="/wix/87fc13_82a500af21e740baa567d0184bab958f~mv2.jpg" alt="Ozempic pen for medical weight loss" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="grid gap-5" style={{ gridTemplateColumns: '176fr 281fr' }}>
                <div className="w-full overflow-hidden" style={{ aspectRatio: '176 / 168', borderRadius: '16px', boxShadow: '0 10px 30px rgba(60,90,64,0.08)' }}>
                  <img src="/wix/87fc13_de24c77f8dcf436699a6eeac3645088c~mv2.jpg" alt="Consultation at Carisma Slimming" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="w-full overflow-hidden" style={{ aspectRatio: '281 / 168', borderRadius: '16px', boxShadow: '0 10px 30px rgba(60,90,64,0.08)' }}>
                  <img src="/wix/87fc13_59abc443a8274e1c90646831cbc819c5~mv2.jpg" alt="Movement assessment with a Carisma practitioner" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            </div>
          </div>

          {/* The biggest clinical mistake — elegant pull-quote */}
          <div
            className="mt-14 mx-auto"
            style={{ maxWidth: '880px', backgroundColor: '#F6F8F4', borderLeft: '4px solid #4f7256', borderRadius: '0 16px 16px 0', padding: '32px 36px' }}
          >
            <p style={{ color: '#4f7256', fontFamily: wideFont, fontWeight: 600, fontSize: '12px', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '12px' }}>
              The biggest clinical mistake
            </p>
            <p style={{ color: '#5c5346', fontFamily: bodyFont, fontSize: '15px', lineHeight: 1.8, margin: 0 }}>
              Prescribing Ozempic or Mounjaro without a structured clinical system. Medication can quiet appetite, but it does not build muscle, teach eating habits, address emotional drivers, or create long-term maintenance. That is why our program pairs Ozempic or Mounjaro with strength training, protein-first nutrition structure, behavioural coaching, accountability, and a defined maintenance plan.
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-3 justify-center mt-12">
            <a
              href="https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2843963&eid=5009163&oiid=sv%3A25969858&share=true&pId=2708191"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-glow inline-block text-center font-bold text-white"
              style={{ fontFamily: wideFont, fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase', padding: '13px 24px' }}
            >
              Book your medical consultation
            </a>
          </div>
        </div>
      </section>

      {/* The science behind GLP-1 — video */}
      <section style={{ paddingTop: 'clamp(12px, 3vw, 96px)', paddingBottom: 'clamp(12px, 3vw, 96px)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center" style={{ color: '#4f7256', fontFamily: wideFont, fontSize: '13px', letterSpacing: '3px', textTransform: 'uppercase', lineHeight: 1.6 }}>
            Why weight loss is biological,<br />not just behavioural
          </p>
          <div className="mx-auto mt-[18px] mb-[18px]" style={{ width: '64px', height: '1px', backgroundColor: '#4f7256' }} />
          <h2 className="text-center mb-8" style={{ color: '#3c5a40', fontFamily: headingFont, fontWeight: 400, fontSize: 'clamp(24px,3.4vw,34px)', letterSpacing: '1px', textTransform: 'uppercase' }}>
            The science behind GLP-1
          </h2>
          <p className="mb-5" style={{ color: '#6f6456', fontFamily: bodyFont, fontSize: '15px', lineHeight: 1.7 }}>
            Obesity is influenced by hormones, environment, and evolutionary biology, not willpower alone.
          </p>
          <p className="mb-10" style={{ color: '#6f6456', fontFamily: bodyFont, fontSize: '15px', lineHeight: 1.7 }}>
            In this video, you will understand how GLP-1 regulates appetite, blood sugar, and metabolic signals, and why modern therapies like Ozempic and Mounjaro are reshaping long-term weight management. When used with medical guidance and structured lifestyle support, Ozempic or Mounjaro becomes a tool within a structured program, not a shortcut.
          </p>
          <div className="mx-auto" style={{ border: '6px solid #4f7256', maxWidth: '744px', overflow: 'hidden', borderRadius: '16px' }}>
            <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
              <iframe
                src="https://www.youtube.com/embed/9t5m33ccUYA?controls=1&playsinline=1&rel=0"
                title="The Uncomfortable Truth About Ozempic — Kurzgesagt"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4 core pillars — programme built to last */}
      <section style={{ paddingTop: 'clamp(12px, 3vw, 96px)', paddingBottom: 'clamp(12px, 3vw, 96px)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center" style={{ color: '#4f7256', fontFamily: wideFont, fontSize: '13px', letterSpacing: '3px', textTransform: 'uppercase' }}>
            4 core pillars of our methodology
          </p>
          <div className="mx-auto mt-[18px] mb-[18px]" style={{ width: '64px', height: '1px', backgroundColor: '#4f7256' }} />
          <h2 className="text-center mb-12" style={{ color: '#3c5a40', fontFamily: headingFont, fontWeight: 400, fontSize: 'clamp(24px,3.4vw,34px)', letterSpacing: '1px', lineHeight: 1.4, textTransform: 'uppercase' }}>
            A doctor-led medical weight loss<br />programme built to last
          </h2>
          <div className="card" style={{ background: 'linear-gradient(180deg, #E7EFE4 0%, #F4F6F1 100%)', padding: '28px' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card bg-white p-8 space-y-7">
                {[
                  { icon: '/wix/87fc13_387683ad0f4c499c8cab338b5f800aa0~mv2.png', title: 'Medical eligibility & assessment', body: 'Every journey begins with a full medical consultation to assess Ozempic or Mounjaro suitability, health history, and individual goals before any treatment is considered.' },
                  { icon: '/wix/87fc13_9011dffd287245ed9d60f5663e21edba~mv2.png', title: 'Appetite & metabolic support', body: 'GLP-1 medication is used to support natural fullness signals and reduce food noise, helping make portion control and consistency feel more manageable.' },
                  { icon: '/wix/87fc13_c4cf7001e0324fbd84551191d2a27bd1~mv2.png', title: 'Safe, long-term approach', body: 'This is not a crash diet or quick fix. Our approach always uses Ozempic or Mounjaro as part of a wider lifestyle plan designed for sustainable, steady fat reduction.' },
                ].map((f) => (
                  <div key={f.title} className="flex items-start gap-4">
                    <div className="flex items-center justify-center flex-shrink-0" style={{ width: '46px', height: '46px', borderRadius: '9999px', border: '1px solid #e3ded6' }}>
                      <img src={f.icon} alt="" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                    </div>
                    <div>
                      <h3 className="mb-2" style={{ color: '#4f7256', fontFamily: wideFont, fontSize: '14px', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{f.title}</h3>
                      <p style={{ color: '#6f6456', fontFamily: bodyFont, fontSize: '14px', lineHeight: 1.6 }}>{f.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="card bg-white p-8">
                <div className="w-full overflow-hidden mb-6" style={{ aspectRatio: '382 / 183', borderRadius: '16px' }}>
                  <img src="/wix/87fc13_56eec505c9f9433db5846a0aeae07c7f~mv2.jpg" alt="Medical consultation at Carisma Slimming" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <ul className="space-y-2 mb-6">
                  {['Initial Medical Consultation & Eligibility Review', 'Personalised GLP-1 Treatment Planning', 'Ongoing Medical Monitoring & Reviews', 'Nutrition & Lifestyle Support Integration'].map((t) => (
                    <li key={t} className="flex items-start gap-2" style={{ color: '#6f6456', fontFamily: bodyFont, fontSize: '14px', lineHeight: 1.6 }}>
                      <span style={{ color: '#6f6456' }}>&bull;</span><span>{t}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3 items-center mb-5">
                  <a
                    href="https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2843963&eid=5009163&oiid=sv%3A25969858&share=true&pId=2708191"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-glow inline-block text-center font-bold text-white"
                    style={{ fontFamily: wideFont, fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase', padding: '12px 24px' }}
                  >
                    Book your medical consultation
                  </a>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <img src="/wix/87fc13_c507b5f7e86f4eed970b757bc84a8ec4~mv2.png" alt="Google" style={{ width: '23px', height: '23px', objectFit: 'contain', marginRight: '4px' }} />
                  {[0, 1, 2, 3, 4].map((i) => (
                    <img key={i} src="/wix/87fc13_2de846da7d374b24984ad15221cae0bd~mv2.png" alt="" role="presentation" style={{ width: '23px', height: '20px', objectFit: 'contain' }} />
                  ))}
                  <span className="ml-2" style={{ color: '#6f6456', fontFamily: bodyFont, fontSize: '14px' }}>Over <CountUp value="800+" /> Reviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Carisma difference — wellness chain + map */}
      <section aria-labelledby="difference-heading-glp1" style={{ backgroundColor: '#ffffff', paddingTop: 'clamp(12px, 3vw, 96px)', paddingBottom: 'clamp(12px, 3vw, 96px)' }}>
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
              <h2 id="difference-heading-glp1" className="text-center mb-12" style={{ color: '#3c5a40', fontFamily: headingFont, fontWeight: '400', fontSize: '25px', lineHeight: '35px', textTransform: 'uppercase', letterSpacing: '1px' }}>
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
                      {[
                        'Visible inch loss and shape change through medical weight loss, not vague promises',
                        'Plans that work with your age, hormones and metabolism',
                        'No crash diets, no banned foods, no endless hours of cardio',
                        'Medical-grade technology and treatments delivered by qualified doctors',
                      ].map((item, idx) => (
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
                      What Makes Our GLP-1 Clinic Different
                    </h3>
                    <ul className="space-y-4">
                      {[
                        <>Created by the team behind Malta&apos;s leading spa and medical aesthetics centres</>,
                        <>Doctor-led Ozempic and Mounjaro programs, not a beauty salon &ldquo;diet program&rdquo;</>,
                        <>All-in-one approach: medical assessment, nutrition, movement, and{' '}<Link href="/packages" style={{ color: '#4f7256', textDecoration: 'underline' }}>all treatments</Link></>,
                        'High-touch support with weekly check-ins and WhatsApp coaching',
                      ].map((item, idx) => (
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

      {/* FAQ */}
      <FAQAccordion />

      {/* Evidence based approach */}
      <EvidenceCards />

    </main>
  );
}
