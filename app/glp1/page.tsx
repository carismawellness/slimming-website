import { Metadata } from 'next';
import Link from 'next/link';
import HeroVideo from '@/components/HeroVideo';
import ResultsCarousel from '@/components/ResultsCarousel';
import HowItWorks from '@/components/HowItWorks';
import FAQAccordion from '@/components/FAQAccordion';
import EvidenceCards from '@/components/EvidenceCards';

export const metadata: Metadata = {
  title: 'Medical Weight Loss Malta | Ozempic & Mounjaro | Carisma Slimming',
  description: "Malta's #1 doctor-led medical weight loss clinic. Personalised weight loss programs with GLP-1 support, nutrition, body composition tracking, and ongoing medical supervision. Book your free consultation.",
  alternates: {
    canonical: 'https://www.carismaslimming.com/medical-weight-loss',
  },
  openGraph: {
    title: 'Medical Weight Loss Malta | Ozempic & Mounjaro | Carisma Slimming',
    description: "Malta's #1 doctor-led medical weight loss clinic. Personalised weight loss programs with GLP-1 support, nutrition, body composition tracking, and ongoing medical supervision. Book your free consultation.",
    images: [
      'https://static.wixstatic.com/media/f940f0_91c17052f86d48088597ba76c4ac8057~mv2.png/v1/fill/w_2500,h_2523,al_c/f940f0_91c17052f86d48088597ba76c4ac8057~mv2.png',
    ],
  },
};

export default function GLP1Page() {
  const addresses = [
    'Appetite regulation and feeling full sooner',
    'Craving reduction and less "food noise"',
    'Better adherence to your nutrition and movement plan',
    'Improved blood sugar control and metabolic support',
  ];

  const cannotDo = [
    'Build muscle or protect your metabolism on its own',
    'Teach eating habits or create a repeatable routine',
    'Address emotional eating triggers or stress-driven cravings',
    'Create long-term identity change and weight maintenance',
  ];

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

  return (
    <main className="w-full" style={{ backgroundColor: '#ffffff' }}>
      {/* Hero Section */}
      <section className="py-12 mx-auto" style={{ backgroundImage: 'url(/wix/87fc13_f0e92ac188af4582a4dcab0d17d5d2ed~mv2.png)', backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', borderRadius: '40px', overflow: 'hidden', maxWidth: '1340px', marginTop: '12px', marginBottom: '20px' }}>
        <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '1240px' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div style={{ maxWidth: '510px' }}>
              <p
                className="mb-3 uppercase tracking-wide"
                style={{ color: '#9B8D83', fontFamily: wideFont, fontSize: '14px', fontWeight: 500 }}
              >
                ultimate weight loss protocol in malta
              </p>
              <h1
                className="mb-6 uppercase leading-tight"
                style={{ color: '#8EB093', fontFamily: headingFont, fontWeight: 400, fontSize: '28px', maxWidth: '400px' }}
              >
                doctor-led medical weight loss in malta
              </h1>
              <p className="mb-4" style={{ color: '#9B8D83', fontFamily: bodyFont, fontSize: '15px', lineHeight: '1.7' }}>
                Struggling with constant hunger, stalled progress, and weight that keeps coming back?
              </p>
              <p className="mb-8" style={{ color: '#9B8D83', fontFamily: bodyFont, fontSize: '15px', lineHeight: '1.7' }}>
                Our programs combine full medical assessment, personalised nutrition, body composition
                tracking, and ongoing doctor supervision with <strong style={{ fontWeight: 700 }}>Ozempic</strong> and <strong style={{ fontWeight: 700 }}>Mounjaro</strong> prescription support
                where clinically appropriate, to help you lose fat safely and keep it off.
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3" style={{ color: '#9B8D83', fontFamily: bodyFont, fontSize: '14px', lineHeight: '1.6' }}>
                  <span style={{ color: '#8EB093', fontWeight: 700 }}>✓</span>
                  <span>
                    <strong style={{ color: '#9B8D83' }}>Calmer appetite:</strong> GLP-1 support mimics natural
                    fullness signals so you feel satisfied with smaller portions and less food noise
                  </span>
                </li>
                <li className="flex items-start gap-3" style={{ color: '#9B8D83', fontFamily: bodyFont, fontSize: '14px', lineHeight: '1.6' }}>
                  <span style={{ color: '#8EB093', fontWeight: 700 }}>✓</span>
                  <span>
                    <strong style={{ color: '#9B8D83' }}>Doctor monitored:</strong> Full medical assessment, body
                    scan, blood tests, safety screening, and regular reviews to adjust your plan
                  </span>
                </li>
                <li className="flex items-start gap-3" style={{ color: '#9B8D83', fontFamily: bodyFont, fontSize: '14px', lineHeight: '1.6' }}>
                  <span style={{ color: '#8EB093', fontWeight: 700 }}>✓</span>
                  <span>
                    <strong style={{ color: '#9B8D83' }}>Part of a full plan:</strong> Never Ozempic or Mounjaro
                    alone, your plan includes nutrition structure, movement guidance, accountability, and a
                    maintenance strategy
                  </span>
                </li>
              </ul>

              {/* Medication brand logos */}
              <div className="flex items-center mb-5">
                <img src="/wix/87fc13_9b5f8cba779d4117a4f59ffdb0f0772a~mv2.png" alt="Ozempic semaglutide injection" style={{ width: '176px', height: '51px', objectFit: 'contain' }} />
                <img src="/wix/87fc13_7c506cd7a9324e74a89aab69b22cc67d~mv2.png" alt="Mounjaro tirzepatide" style={{ width: '152px', height: '51px', objectFit: 'contain' }} />
              </div>

              <Link
                href="/consultation"
                className="block uppercase tracking-wide text-white font-bold text-center"
                style={{ backgroundColor: '#8EB093', borderRadius: '5px', padding: '14px 20px', fontFamily: wideFont, fontSize: '13px', letterSpacing: '1px', width: '507px', maxWidth: '100%' }}
              >
                book your medical weight loss consultation
              </Link>

              {/* Google reviews */}
              <div className="mt-7 flex items-center gap-1" style={{ paddingLeft: '40px' }}>
                <img src="/wix/87fc13_c507b5f7e86f4eed970b757bc84a8ec4~mv2.png" alt="Google" style={{ width: '23px', height: '23px', objectFit: 'contain', marginRight: '4px' }} />
                {[0, 1, 2, 3, 4].map((i) => (
                  <img key={i} src="/wix/87fc13_2de846da7d374b24984ad15221cae0bd~mv2.png" alt="" style={{ width: '23px', height: '20px', objectFit: 'contain' }} />
                ))}
                <span className="ml-2" style={{ color: '#9B8D83', fontFamily: bodyFont, fontSize: '14px' }}>Over 200+ Reviews</span>
              </div>

              {/* Disclaimer */}
              <p className="mt-8" style={{ color: '#9B8D83', fontFamily: bodyFont, fontSize: '12px', lineHeight: 1.6, maxWidth: '507px' }}>
                * Eligibility and exact costs depend on your health, lab results, and the support you need. You will always receive a clear plan and pricing in your medical weight loss consultation before starting. <strong style={{ fontWeight: 700 }}>Important:</strong> GLP-1 medications are prescription-only and not suitable for everyone. This program is offered only after a full medical assessment by our doctor.
              </p>
            </div>

            {/* Hero media */}
            <div className="w-full" style={{ maxWidth: '405px', marginLeft: 'auto' }}>
              <div
                className="flex items-center justify-center text-center w-full overflow-hidden"
                style={{ aspectRatio: '405 / 560', borderRadius: '30px' }}
              >
                <HeroVideo src="/video/hero-720p.mp4" poster="/wix/87fc13_210696e48bd0461ba822880bd7082b56~mv2.png" hideButton />
              </div>
              <img src="/wix/f940f0_c4008d16bc3245f7bc8663f5b60d7a82~mv2.png" alt="Voted number one clinic award" style={{ width: '114px', height: '72px', objectFit: 'contain', marginTop: '15px', marginLeft: '21px' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Medical Weight Loss Results */}
      <ResultsCarousel />

      {/* What is Medical Weight Loss */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center" style={{ color: '#AFA39D', fontFamily: wideFont, fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase' }}>
            What is medical weight loss?
          </p>
          <div className="mx-auto mt-2 mb-6" style={{ width: '150px', height: '1px', backgroundColor: '#B9A99E' }} />
          <h2 className="text-center" style={{ color: '#8EB093', fontFamily: headingFont, fontWeight: 400, fontSize: '28px', lineHeight: 1.3 }}>
            Clarity before you start.<br />What does medical weight loss really mean?
          </h2>
          <p className="mt-8 mb-6" style={{ color: '#9B8D83', fontFamily: bodyFont, fontSize: '15px', lineHeight: 1.8 }}>
            Medical weight loss is a doctor-supervised approach to losing weight that goes beyond diets and willpower. At our weight loss clinic in Malta, it means a full medical assessment, personalised nutrition planning, body composition monitoring, and, where clinically appropriate, GLP-1 prescription support to regulate appetite and reduce cravings.
          </p>
          <p className="mb-12" style={{ color: '#9B8D83', fontFamily: bodyFont, fontSize: '15px', lineHeight: 1.8 }}>
            Our doctors prescribe Ozempic (semaglutide) and Mounjaro (tirzepatide) for weight loss as part of a structured programme, not as a standalone prescription. This approach works because it treats the biological, behavioural, and lifestyle factors that make losing weight difficult.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="px-2">
              <h3 className="mb-6" style={{ color: '#7ba587', fontFamily: wideFont, fontWeight: 600, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                What a medical weight loss program addresses
              </h3>
              <ul className="space-y-4">
                {addresses.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8EB093" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '1px' }}><polyline points="20 6 9 17 4 12" /></svg>
                    <span style={{ color: '#9B8D83', fontFamily: bodyFont, fontSize: '14px', lineHeight: 1.5 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-2">
              <h3 className="mb-6" style={{ color: '#9B8D83', fontFamily: wideFont, fontWeight: 600, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                What medication alone cannot do:
              </h3>
              <ul className="space-y-4">
                {cannotDo.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#AEC1A6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '1px' }}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    <span style={{ color: '#9B8D83', fontFamily: bodyFont, fontSize: '14px', lineHeight: 1.5 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-12 text-center mx-auto" style={{ color: '#9B8D83', fontFamily: bodyFont, fontSize: '15px', lineHeight: 1.8, maxWidth: '720px' }}>
            That is why our program in Malta combines Ozempic or Mounjaro support (if clinically appropriate) with nutrition structure, strength training guidance, weekly tracking, and a defined maintenance plan.
          </p>
        </div>
      </section>


      {/* Sustainability */}
      <section className="py-10" style={{ backgroundColor: '#ffffff' }}>
        <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8" style={{ maxWidth: '1100px', background: 'linear-gradient(180deg, #D7E2D8 0%, #FBFBF9 38%, #FFFFFF 50%)', borderTopLeftRadius: '24px', borderTopRightRadius: '24px' }}>
          <h2
            className="text-center mb-12 uppercase"
            style={{ color: '#8EB093', fontFamily: headingFont, fontWeight: 400, fontSize: '28px' }}
          >
            we don&apos;t sell weight loss.<br />we build sustainability.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div
              className="w-full overflow-hidden"
              style={{ aspectRatio: '383 / 526', maxWidth: '420px', borderTopLeftRadius: '120px', borderBottomRightRadius: '120px', borderTopRightRadius: '16px', borderBottomLeftRadius: '16px' }}
            >
              <img src="/wix/87fc13_3028fef86af2454fa2fbdbb5dcd55d87~mv2.png" alt="Patient consultation during medical weight loss program" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <p className="mb-6" style={{ color: '#9B8D83', fontFamily: bodyFont, fontSize: '15px', lineHeight: '1.8' }}>
                Weight gain is not a failure of discipline; it is a complex medical and behavioural challenge
                shaped by biology, stress, hormones, and modern life. Hunger, cravings, your relationship with
                food, mental health, and time pressure all play a role. That is why a medical weight loss
                approach works where diets fail. At Carisma Slimming, Malta&apos;s doctor-led weight loss clinic,
                we approach weight management as a medical, lifestyle, and emotional process that needs
                structure, not willpower:
              </p>
              <ul className="space-y-3 mb-6">
                {sustainability.map((item, i) => (
                  <li key={i} className="flex items-start gap-3" style={{ color: '#9B8D83', fontFamily: bodyFont, fontSize: '14px', lineHeight: '1.6' }}>
                    <span style={{ color: '#8EB093', fontWeight: 700 }}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mb-8" style={{ color: '#9B8D83', fontFamily: bodyFont, fontSize: '15px', lineHeight: '1.8' }}>
                Ozempic and Mounjaro can help regulate appetite. Long-term results come from structure,
                monitoring, and habits that fit real life, and that is what our program delivers.
              </p>
              <Link
                href="/consultation"
                className="inline-block uppercase tracking-wide text-white font-bold text-center"
                style={{ backgroundColor: '#6391AB', borderRadius: '10px', padding: '14px 20px', fontFamily: wideFont, fontSize: '13px', letterSpacing: '1px', width: '474px', maxWidth: '100%' }}
              >
                book your medical consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Malta's trusted clinic — press logos + program pillars */}
      <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-center"
            style={{ color: '#8EB093', fontFamily: headingFont, fontWeight: 400, fontSize: '28px', textTransform: 'uppercase', lineHeight: 1.35 }}
          >
            malta&apos;s trusted clinic for<br />doctor-led, medical weight loss
          </h2>

          {/* Press logos */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-6 mt-10 mb-16">
            {[
              { label: 'Malta Today', src: '/wix/f940f0_8c40f03f50684bf8adc6d9ca0cb2be9e~mv2.jpg', w: 134, h: 42 },
              { label: '89.7 Bay', src: '/wix/f940f0_e6f0bd96c9d04debaa8d8b609cbf68e6~mv2.jpeg', w: 47, h: 42 },
              { label: 'Lovin Malta', src: '/wix/f940f0_8bd141199fea4275a1222b62f24f2d98~mv2.jpeg', w: 158, h: 50 },
              { label: 'Times of Malta', src: '/wix/f940f0_2120887ab6ef4957b02ff004e804beaf~mv2.png', w: 47, h: 42 },
              { label: 'Malta Daily', src: '/wix/f940f0_0db6f1508426404eacea3b33b0e9112d~mv2.png', w: 66, h: 42 },
            ].map((logo) => (
              <div key={logo.label} className="flex items-center justify-center">
                <img src={logo.src} alt={logo.label} style={{ width: `${logo.w}px`, height: `${logo.h}px`, objectFit: 'contain' }} />
              </div>
            ))}
          </div>

          {/* Program pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, i) => (
              <div
                key={i}
                className="p-8"
                style={{ background: 'linear-gradient(180deg, #F2F6EF 0%, #C9D8C1 100%)', borderTopLeftRadius: '18px', borderTopRightRadius: '90px', borderBottomLeftRadius: '90px', borderBottomRightRadius: '18px', boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}
              >
                <img src={pillarIcons[i]} alt="" style={{ width: '74px', height: '74px', objectFit: 'contain', marginBottom: '20px' }} />
                <h3 className="mb-3" style={{ color: '#9B8D83', fontFamily: wideFont, fontWeight: 600, fontSize: '15px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                  {pillar.title}
                </h3>
                <p style={{ color: '#9B8D83', fontFamily: bodyFont, fontSize: '13px', lineHeight: 1.7 }}>
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Medical weight loss eligibility */}
      <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
        <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '760px' }}>
          <p className="text-center" style={{ color: '#9B8D83', fontFamily: wideFont, fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase' }}>
            medical weight loss eligibility
          </p>
          <div className="mx-auto mt-2 mb-6" style={{ width: '124px', height: '1px', backgroundColor: '#9B8D83' }} />
          <h2 className="text-center mb-6" style={{ color: '#8EB093', fontFamily: headingFont, fontWeight: 400, fontSize: '28px', letterSpacing: '1px', textTransform: 'uppercase', lineHeight: 1.4 }}>
            selective by intention successful by design
          </h2>
          <p className="mb-10" style={{ color: '#9B8D83', fontFamily: bodyFont, fontSize: '14px', lineHeight: 1.6 }}>
            Ozempic and Mounjaro can be powerful, but only when prescribed as part of a structured, doctor-supervised approach. Eligibility is determined through a thorough medical assessment, including blood tests, food-intolerance screening, safety checks, and clear protocols, to ensure your program is appropriate, monitored, and adjusted responsibly.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="mb-5" style={{ color: '#9B8D83', fontFamily: wideFont, fontWeight: 600, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                Suitable for:
              </h3>
              <ul className="space-y-5">
                {['BMI ≥27', 'Insulin resistence', 'Emotional eating or Long dieting history', 'Menopause-related weight gain'].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <img src="/wix/87fc13_59346c1121b34e759ebf20eba3054c8c~mv2.png" alt="" style={{ width: '26px', height: '28px', objectFit: 'contain', flexShrink: 0, marginTop: '-2px' }} />
                    <span style={{ color: '#9B8D83', fontFamily: bodyFont, fontSize: '14px', lineHeight: 1.6 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-5" style={{ color: '#9B8D83', fontFamily: wideFont, fontWeight: 600, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                Unsuitable for:
              </h3>
              <ul className="space-y-5">
                {['Eating disorders', 'Very lean patients', 'Those unwilling to attend check-ins', 'Currently pregnant or trying to conceive'].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <img src="/wix/87fc13_50f34e909595497794177a54bdb32314~mv2.png" alt="" style={{ width: '19px', height: '19px', objectFit: 'contain', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ color: '#9B8D83', fontFamily: bodyFont, fontSize: '14px', lineHeight: 1.6 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="text-center mt-14">
            <a
              href="https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2843963&eid=5084222&oiid=sv%3A26105577&share=true&pId=2708191"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-center font-bold text-white"
              style={{ backgroundColor: '#6391AB', borderRadius: '10px', fontFamily: wideFont, fontSize: '14px', letterSpacing: '1.4px', textTransform: 'uppercase', padding: '13px 24px', width: '474px', maxWidth: '100%' }}
            >
              book your medical consultation
            </a>
          </div>
        </div>
      </section>

      {/* We are not another diet clinic */}
      <section className="py-16" style={{ backgroundColor: '#ffffff', backgroundImage: 'url(/wix/87fc13_eed9276b67e74ae99994e6bab4bcd409~mv2.png)', backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center" style={{ color: '#9B8D83', fontFamily: wideFont, fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase' }}>
            The Carisma Difference
          </p>
          <div className="mx-auto mt-2 mb-6" style={{ width: '150px', height: '1px', backgroundColor: '#8EB093' }} />
          <h2 className="text-center mb-6" style={{ color: '#8EB093', fontFamily: headingFont, fontWeight: 400, fontSize: '28px', textTransform: 'uppercase', lineHeight: 1.3 }}>
            We are not<br />another diet clinic.
          </h2>
          <p className="text-center mx-auto mb-12" style={{ color: '#9B8D83', fontFamily: bodyFont, fontSize: '16px', lineHeight: 1.7, maxWidth: '760px' }}>
            We are a doctor-led medical weight loss clinic in Malta that blends medical insight, sustainable nutrition, and modern body technology into one high-touch system. So you do not just lose weight, you build a stronger, healthier version of yourself.
          </p>
          <div className="mx-auto max-w-2xl p-10" style={{ background: 'linear-gradient(135deg, #FCFCFA 0%, #D8E7D2 100%)', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', borderBottomLeftRadius: '24px', borderBottomRightRadius: '90px', boxShadow: '0 12px 32px rgba(0,0,0,0.06)' }}>
            <ul className="space-y-6">
              {[
                'Doctor-led medical weight loss: full check, body scan, and blood work',
                'One integrated program: medical support, nutrition, movement, and treatments together',
                'Real gym included: Technogym facility, semi-private classes, and personal training',
                'High-touch support: weekly check-ins, progress reports, and WhatsApp follow-up',
                'Evidence-based devices: Emsculpt NEO, CoolSculpting, and RF skin tightening',
                'Selective entry and measurable weight loss results guaranteed',
              ].map((t) => (
                <li key={t} className="flex items-start gap-4">
                  <img src="/wix/87fc13_59346c1121b34e759ebf20eba3054c8c~mv2.png" alt="" style={{ width: '29px', height: '28px', objectFit: 'contain', flexShrink: 0 }} />
                  <span style={{ color: '#9B8D83', fontFamily: wideFont, fontSize: '15px', letterSpacing: '0.5px', textTransform: 'uppercase', lineHeight: 1.5 }}>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How it works */}
      <HowItWorks />

      {/* Led by expertise — Dr Zaid Teebi */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center" style={{ color: '#9B8D83', fontFamily: wideFont, fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Expert <span style={{ color: '#C4B8AE' }}>medical weight loss</span> care
          </p>
          <div className="mx-auto mt-2 mb-6" style={{ width: '170px', height: '1px', backgroundColor: '#B9A99E' }} />
          <h2 className="text-center mb-12" style={{ color: '#8EB093', fontFamily: headingFont, fontWeight: 400, fontSize: '28px', letterSpacing: '1px', lineHeight: 1.4 }}>
            Led by expertise.<br />Driven by results.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div
              className="w-full overflow-hidden mx-auto"
              style={{ maxWidth: '448px', aspectRatio: '448 / 479', borderTopLeftRadius: '90px', borderTopRightRadius: '18px', borderBottomLeftRadius: '18px', borderBottomRightRadius: '90px', boxShadow: '0 16px 36px rgba(0,0,0,0.12)' }}
            >
              <img src="/wix/87fc13_130b2a48c11a4658bad12952342d1eb4~mv2.jpeg" alt="Dr Zaid Teebi, lead medical weight loss doctor at Carisma Slimming" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <h3 className="mb-4" style={{ color: '#8EB093', fontFamily: wideFont, fontSize: '20px', letterSpacing: '1px', textTransform: 'uppercase' }}>Dr Zaid Teebi</h3>
              <p className="mb-5" style={{ color: '#9B8D83', fontFamily: bodyFont, fontSize: '15px', lineHeight: 1.7 }}>
                Dr. Zaid Teebi is the lead medical weight loss doctor at Carisma Slimming with over 30 years of clinical experience and an evidence-based focus on medical weight management and metabolic health. A graduate of Imperial College London, he combines medical rigour with a calm, human approach.
              </p>
              <p className="mb-8" style={{ color: '#9B8D83', fontFamily: bodyFont, fontSize: '15px', lineHeight: 1.7 }}>
                His consultations are structured and personalised, with safety screening, clear expectations, and ongoing monitoring. Where clinically appropriate, he prescribes Ozempic or Mounjaro as part of a wider programme that includes nutrition structure, habit-based strength training to protect metabolism, and a long-term weight maintenance plan.
              </p>
              <p className="mb-8" style={{ color: '#AFA39D', fontFamily: '"Brush Script MT", "Segoe Script", cursive', fontStyle: 'italic', fontSize: '23px', lineHeight: 1.6 }}>
                Medical weight loss should never be guesswork. Every body tells a story, and our job is to turn it into a plan that lasts&rdquo; &ndash; Dr. Teebi
              </p>
              <a
                href="https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2843963&eid=5009163&oiid=sv%3A25969858&share=true&pId=2708191"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-center font-bold text-white"
                style={{ backgroundColor: '#8EB093', borderRadius: '5px', fontFamily: wideFont, fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase', padding: '14px 20px', width: '468px', maxWidth: '100%' }}
              >
                Book your medical consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Our promise — extended care commitment */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center" style={{ color: '#AFA39D', fontFamily: wideFont, fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Our Promise
          </p>
          <div className="mx-auto mt-2 mb-6" style={{ width: '150px', height: '1px', backgroundColor: '#B9A99E' }} />
          <h2 className="text-center mb-12" style={{ color: '#8EB093', fontFamily: headingFont, fontWeight: 400, fontSize: '25px', letterSpacing: '2px', lineHeight: 1.35, textTransform: 'uppercase' }}>
            Up to 1kg per week<br />Measured. Verified. Comitted.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div
              className="p-12 flex items-center"
              style={{ background: 'linear-gradient(135deg, #F2F6EF 0%, #DCE7D5 100%)', borderTopLeftRadius: '18px', borderTopRightRadius: '90px', borderBottomLeftRadius: '90px', borderBottomRightRadius: '18px', minHeight: '240px' }}
            >
              <p style={{ color: '#A9BFA6', fontFamily: wideFont, fontWeight: 400, fontSize: '16px', letterSpacing: '3.2px', textTransform: 'uppercase', lineHeight: 1.9, maxWidth: '260px' }}>
                Only weight loss clinic <strong style={{ color: '#8EB093', fontWeight: 700 }}>in Malta</strong> to offer an extended <strong style={{ color: '#8EB093', fontWeight: 700 }}>care commitment</strong>
              </p>
            </div>
            <div>
              <p className="mb-5" style={{ color: '#9B8D83', fontFamily: bodyFont, fontSize: '15px', lineHeight: 1.7 }}>
                We are selective about who joins our programs. We only accept those we genuinely believe we can help reach their healthy weight with Ozempic, Mounjaro, or non-medication pathways.
              </p>
              <p className="mb-5" style={{ color: '#9B8D83', fontFamily: bodyFont, fontSize: '15px', lineHeight: 1.7 }}>
                If you qualify and complete your program and do not hit your target weight, we will extend your weight management program at no extra program fee until we achieve your desired result.
              </p>
              <p className="mb-3" style={{ color: '#9B8D83', fontFamily: bodyFont, fontSize: '15px', lineHeight: 1.7 }}>
                *To ensure results remain measurable and medically valid, patients must:
              </p>
              <ul className="space-y-2">
                {[
                  'Attend all scheduled in clinic sessions and weekly check ins',
                  'Follow your personalised food plan consistently and tell us when you struggle',
                  'Complete your agreed physical activities & discuss any pain or obstacles',
                  'Use only the treatments and medications recommended by our medical team',
                  'Inform us of any major health (e.g., heart disease) or medication changes',
                  'Avoid crash diets, extreme restriction or outside weight loss treatments that could affect your results',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2" style={{ color: '#9B8D83', fontFamily: bodyFont, fontSize: '14px', lineHeight: 1.6 }}>
                    <span style={{ color: '#AFA39D' }}>&bull;</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Safety, side effects & our system */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ background: 'linear-gradient(180deg, #E7EFE4 0%, #F8F7F3 35%)', borderRadius: '28px', padding: '48px' }}>
            <h2 className="text-center" style={{ color: '#8EB093', fontFamily: headingFont, fontWeight: 400, fontSize: '28px', lineHeight: 1.4 }}>
              Safety, side effects,<br />and our system
            </h2>
            <p className="mt-6 mb-10" style={{ color: '#9B8D83', fontFamily: bodyFont, fontSize: '15px', lineHeight: 1.7 }}>
              As part of our program, we prescribe Ozempic and Mounjaro with strict screening, clear education, and ongoing monitoring. Most side effects are manageable when dosing and nutrition are structured, and follow-ups are consistent.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <p className="mb-3" style={{ color: '#9B8D83', fontFamily: bodyFont, fontSize: '15px' }}>Common side effects and how we reduce them:</p>
                <ul className="space-y-2 mb-7">
                  {[
                    { label: 'Nausea', text: 'slow titration, protein-first meals, hydration and electrolytes, injection timing guidance' },
                    { label: 'Constipation', text: 'tolerance-based fibre targets, fluids, daily movement, magnesium support when appropriate' },
                    { label: 'Diarrhoea', text: 'simple meal sequencing, trigger-food control, temporary dose stabilisation' },
                    { label: 'Fatigue', text: 'minimum calorie floors, protein and micronutrient monitoring, strength habits to protect energy' },
                    { label: 'Reflux', text: 'smaller structured portions, meal timing rules, behavioural guidance' },
                  ].map((s) => (
                    <li key={s.label} className="flex items-start gap-2" style={{ color: '#9B8D83', fontFamily: bodyFont, fontSize: '14px', lineHeight: 1.6 }}>
                      <span style={{ color: '#AFA39D' }}>&bull;</span>
                      <span><strong style={{ color: '#7d7066' }}>{s.label}:</strong> {s.text}</span>
                    </li>
                  ))}
                </ul>
                <p className="mb-8" style={{ color: '#9B8D83', fontFamily: bodyFont, fontSize: '14px', lineHeight: 1.7 }}>
                  <strong style={{ color: '#7d7066' }}>The biggest clinical mistake:</strong> prescribing Ozempic or Mounjaro without a structured clinical system. Medication can quiet appetite, but it does not build muscle, teach eating habits, address emotional drivers, or create long-term maintenance. That is why our program pairs Ozempic or Mounjaro with strength training, protein-first nutrition structure, behavioural coaching, accountability, and a defined maintenance plan.
                </p>
                <a
                  href="https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2843963&eid=5009163&oiid=sv%3A25969858&share=true&pId=2708191"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-center font-bold text-white"
                  style={{ backgroundColor: '#6391AB', borderRadius: '10px', fontFamily: wideFont, fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase', padding: '13px 24px', width: '382px', maxWidth: '100%' }}
                >
                  Book your medical consultation
                </a>
              </div>
              <div className="flex flex-col gap-5">
                <div className="w-full overflow-hidden rounded-2xl" style={{ aspectRatio: '477 / 270' }}>
                  <img src="/wix/87fc13_82a500af21e740baa567d0184bab958f~mv2.jpg" alt="Ozempic pen for medical weight loss" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="grid gap-5" style={{ gridTemplateColumns: '176fr 281fr' }}>
                  <div className="w-full overflow-hidden rounded-2xl" style={{ aspectRatio: '176 / 168' }}>
                    <img src="/wix/87fc13_de24c77f8dcf436699a6eeac3645088c~mv2.jpg" alt="Consultation at Carisma Slimming" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div className="w-full overflow-hidden rounded-2xl" style={{ aspectRatio: '281 / 168' }}>
                    <img src="/wix/87fc13_59abc443a8274e1c90646831cbc819c5~mv2.jpg" alt="Movement assessment with a Carisma practitioner" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The science behind GLP-1 — video */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center" style={{ color: '#AFA39D', fontFamily: wideFont, fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', lineHeight: 1.6 }}>
            Why weight loss is biological,<br />not just behavioural
          </p>
          <div className="mx-auto mt-4 mb-6" style={{ width: '120px', height: '1px', backgroundColor: '#B9A99E' }} />
          <h2 className="text-center mb-8" style={{ color: '#8EB093', fontFamily: headingFont, fontWeight: 400, fontSize: '28px', letterSpacing: '1px', textTransform: 'uppercase' }}>
            The science behind GLP-1
          </h2>
          <p className="mb-5" style={{ color: '#9B8D83', fontFamily: bodyFont, fontSize: '15px', lineHeight: 1.7 }}>
            Obesity is influenced by hormones, environment, and evolutionary biology, not willpower alone.
          </p>
          <p className="mb-10" style={{ color: '#9B8D83', fontFamily: bodyFont, fontSize: '15px', lineHeight: 1.7 }}>
            In this video, you will understand how GLP-1 regulates appetite, blood sugar, and metabolic signals, and why modern therapies like Ozempic and Mounjaro are reshaping long-term weight management. When used with medical guidance and structured lifestyle support, Ozempic or Mounjaro becomes a tool within a structured program, not a shortcut.
          </p>
          <div className="mx-auto" style={{ border: '6px solid #8EB093', maxWidth: '744px', overflow: 'hidden' }}>
            <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
              <iframe
                src="https://www.youtube.com/embed/9t5m33ccUYA?autoplay=1&mute=1&controls=1&loop=1&playsinline=1&playlist=9t5m33ccUYA"
                title="The Uncomfortable Truth About Ozempic — Kurzgesagt"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4 core pillars — programme built to last */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center" style={{ color: '#AFA39D', fontFamily: wideFont, fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase' }}>
            4 core pillars of our methodology
          </p>
          <div className="mx-auto mt-2 mb-6" style={{ width: '210px', height: '1px', backgroundColor: '#B9A99E' }} />
          <h2 className="text-center mb-12" style={{ color: '#8EB093', fontFamily: headingFont, fontWeight: 400, fontSize: '28px', letterSpacing: '1px', lineHeight: 1.4, textTransform: 'uppercase' }}>
            A doctor-led medical weight loss<br />programme built to last
          </h2>
          <div style={{ background: 'linear-gradient(180deg, #E7EFE4 0%, #F4F6F1 100%)', borderRadius: '28px', padding: '28px' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-8 space-y-7">
                {[
                  { icon: '/wix/87fc13_387683ad0f4c499c8cab338b5f800aa0~mv2.png', title: 'Medical eligibility & assessment', body: 'Every journey begins with a full medical consultation to assess Ozempic or Mounjaro suitability, health history, and individual goals before any treatment is considered.' },
                  { icon: '/wix/87fc13_9011dffd287245ed9d60f5663e21edba~mv2.png', title: 'Appetite & metabolic support', body: 'GLP-1 medication is used to support natural fullness signals and reduce food noise, helping make portion control and consistency feel more manageable.' },
                  { icon: '/wix/87fc13_c4cf7001e0324fbd84551191d2a27bd1~mv2.png', title: 'Safe, long-term approach', body: 'This is not a crash diet or quick fix. Our approach always uses Ozempic or Mounjaro as part of a wider lifestyle plan designed for sustainable, steady fat reduction.' },
                ].map((f) => (
                  <div key={f.title} className="flex items-start gap-4">
                    <div className="flex items-center justify-center flex-shrink-0" style={{ width: '46px', height: '46px', borderRadius: '12px', border: '1px solid #e3ded6' }}>
                      <img src={f.icon} alt="" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                    </div>
                    <div>
                      <h3 className="mb-2" style={{ color: '#8EB093', fontFamily: wideFont, fontSize: '14px', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{f.title}</h3>
                      <p style={{ color: '#9B8D83', fontFamily: bodyFont, fontSize: '14px', lineHeight: 1.6 }}>{f.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-2xl p-8">
                <div className="w-full overflow-hidden rounded-xl mb-6" style={{ aspectRatio: '382 / 183' }}>
                  <img src="/wix/87fc13_56eec505c9f9433db5846a0aeae07c7f~mv2.jpg" alt="Medical consultation at Carisma Slimming" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <ul className="space-y-2 mb-6">
                  {['Initial Medical Consultation & Eligibility Review', 'Personalised GLP-1 Treatment Planning', 'Ongoing Medical Monitoring & Reviews', 'Nutrition & Lifestyle Support Integration'].map((t) => (
                    <li key={t} className="flex items-start gap-2" style={{ color: '#9B8D83', fontFamily: bodyFont, fontSize: '14px', lineHeight: 1.6 }}>
                      <span style={{ color: '#AFA39D' }}>&bull;</span><span>{t}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2843963&eid=5009163&oiid=sv%3A25969858&share=true&pId=2708191"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center font-bold text-white mb-5"
                  style={{ backgroundColor: '#6391AB', borderRadius: '10px', fontFamily: wideFont, fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase', padding: '12px' }}
                >
                  Book your medical consultation
                </a>
                <div className="flex items-center justify-center gap-1">
                  <img src="/wix/87fc13_c507b5f7e86f4eed970b757bc84a8ec4~mv2.png" alt="Google" style={{ width: '23px', height: '23px', objectFit: 'contain', marginRight: '4px' }} />
                  {[0, 1, 2, 3, 4].map((i) => (
                    <img key={i} src="/wix/87fc13_2de846da7d374b24984ad15221cae0bd~mv2.png" alt="" style={{ width: '23px', height: '20px', objectFit: 'contain' }} />
                  ))}
                  <span className="ml-2" style={{ color: '#9B8D83', fontFamily: bodyFont, fontSize: '14px' }}>Over 200+ Reviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Carisma difference — wellness chain + map */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ background: 'linear-gradient(135deg, #FBFBF7 0%, #DDE8D6 100%)', borderRadius: '32px', padding: '48px' }}>
            <p className="text-center mb-2" style={{ color: '#9B8D83', fontFamily: wideFont, fontSize: '14px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase' }}>
              the carisma difference
            </p>
            <div className="mx-auto mb-4" style={{ width: '110px', height: '1px', backgroundColor: '#B9A99E' }} />
            <h2 className="text-center mb-12" style={{ color: '#8EB093', fontFamily: headingFont, fontWeight: 400, fontSize: '28px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Malta&rsquo;s #1 leading wellness chain
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div className="space-y-10">
                <div>
                  <h3 className="mb-5" style={{ color: '#9B8D83', fontFamily: wideFont, fontSize: '16px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Our Commitment</h3>
                  <ul className="space-y-3">
                    {[
                      'Visible inch loss and shape change through medical weight loss, not vague promises',
                      'Plans that work with your age, hormones and metabolism',
                      'No crash diets, no banned foods, no endless hours of cardio',
                      'Medical-grade technology and treatments delivered by qualified doctors',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2" style={{ color: '#AFA39D', fontFamily: bodyFont, fontSize: '14px', lineHeight: 1.6 }}>
                        <span style={{ color: '#8EB093' }}>&bull;</span><span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-5" style={{ color: '#9B8D83', fontFamily: wideFont, fontSize: '16px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Why Malta Chooses Carisma</h3>
                  <ul className="space-y-3">
                    {[
                      "Created by the team behind Malta's leading spa and medical aesthetics centres",
                      'Doctor-led Ozempic and Mounjaro programs, not a beauty salon "diet program"',
                      'All-in-one approach: medical assessment, nutrition, movement, and treatments',
                      'High-touch support with weekly check-ins and WhatsApp coaching',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2" style={{ color: '#AFA39D', fontFamily: bodyFont, fontSize: '14px', lineHeight: 1.6 }}>
                        <span style={{ color: '#8EB093' }}>&bull;</span><span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <iframe
                  title="Carisma Slimming location"
                  src="https://maps.google.com/maps?q=Grand%20Hotel%20Excelsior%2C%20Great%20Siege%20Road%2C%20Floriana%20FRN%201810%2C%20Malta&z=15&output=embed"
                  width="100%"
                  height="380"
                  style={{ border: 0, borderRadius: '12px', display: 'block' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <div className="flex items-center justify-center gap-3 mt-8">
                  <img src="/wix/87fc13_0426ba92e1fa4e9ebce44215146be031~mv2.png" alt="Complimentary on-site parking" style={{ width: '31px', height: '35px', objectFit: 'contain' }} />
                  <span style={{ color: '#9B8D83', fontFamily: wideFont, fontSize: '14px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>
                    Complimentary on-site parking
                  </span>
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
