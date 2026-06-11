import Link from 'next/link';
import HeroVideo from '@/components/HeroVideo';
import ResultsCarousel from '@/components/ResultsCarousel';

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

  const suitable = [
    'BMI ≥27',
    'Insulin resistence',
    'Emotional eating or Long dieting history',
    'Menopause-related weight gain',
  ];

  const unsuitable = [
    'Eating disorders',
    'Very lean patients',
    'Those unwilling to attend check-ins',
    'Currently pregnant or trying to conceive',
  ];

  const headingFont = 'Trajan Pro, serif';
  const wideFont = 'Novecento Wide Book, sans-serif';
  const bodyFont = 'Roboto, sans-serif';

  return (
    <main className="w-full" style={{ backgroundColor: '#ffffff' }}>
      {/* Hero Section */}
      <section className="py-16 mx-auto" style={{ backgroundImage: 'url(/background.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', borderRadius: '48px', overflow: 'hidden', maxWidth: '1280px', marginTop: '20px', marginBottom: '20px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1
                className="mb-3 uppercase leading-tight"
                style={{ color: '#7ba587', fontFamily: headingFont, fontWeight: 400, fontSize: '30px' }}
              >
                ultimate weight loss protocol in malta
              </h1>
              <p
                className="mb-6 uppercase tracking-wide"
                style={{ color: '#8EB093', fontFamily: wideFont, fontSize: '14px', fontWeight: 500 }}
              >
                doctor-led medical weight loss in malta
              </p>
              <p className="mb-8" style={{ color: '#9B8D83', fontFamily: bodyFont, fontSize: '15px', lineHeight: '1.7' }}>
                Struggling with constant hunger, stalled progress, and weight that keeps coming back?
                Our programs combine full medical assessment, personalised nutrition, body composition
                tracking, and ongoing doctor supervision with Ozempic and Mounjaro prescription support
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

              <Link
                href="/consultation"
                className="inline-block uppercase tracking-wide text-white font-bold rounded"
                style={{ backgroundColor: '#9B8D83', padding: '14px 28px', fontFamily: wideFont, fontSize: '13px' }}
              >
                book your medical weight loss consultation
              </Link>

              {/* Social proof */}
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center justify-center text-center text-xs overflow-hidden"
                    style={{ width: '76px', height: '48px' }}
                  >
                    <img src="/wix/f940f0_c4008d16bc3245f7bc8663f5b60d7a82~mv2.png" alt="Malta award badge" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                  <p style={{ color: '#8EB093', fontSize: '13px', fontWeight: 600, lineHeight: 1.3 }}>
                    #1 Voted Clinic in Malta
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="flex items-center justify-center text-center text-xs overflow-hidden"
                    style={{ width: '90px', height: '32px' }}
                  >
                    <img src="/wix/87fc13_7c506cd7a9324e74a89aab69b22cc67d~mv2.png" alt="Google logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                  <div
                    className="flex items-center justify-center text-center text-xs overflow-hidden"
                    style={{ width: '100px', height: '24px' }}
                  >
                    <img src="/wix/87fc13_c507b5f7e86f4eed970b757bc84a8ec4~mv2.png" alt="5-star rating graphic" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                  <span style={{ color: '#8EB093', fontSize: '13px', fontWeight: 500 }}>Over 200+ Reviews</span>
                </div>
              </div>
            </div>

            {/* Hero media placeholder */}
            <div
              className="flex items-center justify-center text-center w-full overflow-hidden"
              style={{ aspectRatio: '383 / 526', maxWidth: '420px', marginLeft: 'auto', marginRight: 'auto', borderTopLeftRadius: '120px', borderBottomRightRadius: '120px', borderTopRightRadius: '16px', borderBottomLeftRadius: '16px' }}
            >
              <HeroVideo src="/video/hero-720p.mp4" poster="/wix/87fc13_3028fef86af2454fa2fbdbb5dcd55d87~mv2.png" />
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
          <h2 className="text-center" style={{ color: '#7ba587', fontFamily: headingFont, fontWeight: 400, fontSize: '30px', lineHeight: 1.3 }}>
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
      <section className="py-16" style={{ backgroundColor: '#EEF3F0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-center mb-12 uppercase"
            style={{ color: '#7ba587', fontFamily: headingFont, fontWeight: 400, fontSize: '26px' }}
          >
            we don&apos;t sell weight loss. we build sustainability.
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
                className="inline-block uppercase tracking-wide text-white font-bold rounded"
                style={{ backgroundColor: '#9B8D83', padding: '14px 28px', fontFamily: wideFont, fontSize: '13px' }}
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
            style={{ color: '#7ba587', fontFamily: headingFont, fontWeight: 400, fontSize: '26px', textTransform: 'uppercase', lineHeight: 1.35 }}
          >
            malta&apos;s trusted clinic for<br />doctor-led, medical weight loss
          </h2>

          {/* Press logos */}
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 mt-10 mb-16">
            {[
              { label: 'Malta Daily', src: '/wix/f940f0_c4008d16bc3245f7bc8663f5b60d7a82~mv2.png' },
              { label: '89.7 Bay', src: '/wix/f940f0_e6f0bd96c9d04debaa8d8b609cbf68e6~mv2.jpeg' },
              { label: 'Lovin Malta', src: '/wix/f940f0_8bd141199fea4275a1222b62f24f2d98~mv2.jpeg' },
              { label: 'Times of Malta', src: '/wix/f940f0_2120887ab6ef4957b02ff004e804beaf~mv2.png' },
              { label: 'Malta Today', src: '/wix/f940f0_8c40f03f50684bf8adc6d9ca0cb2be9e~mv2.jpg' },
            ].map((logo) => (
              <div key={logo.label} className="flex items-center justify-center" style={{ height: '54px' }}>
                <img src={logo.src} alt={logo.label} style={{ maxHeight: '54px', width: 'auto', objectFit: 'contain' }} />
              </div>
            ))}
          </div>

          {/* Program pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, i) => (
              <div
                key={i}
                className="p-8"
                style={{ background: 'linear-gradient(180deg, #F5F8F3 0%, #DEE8DA 100%)', borderTopLeftRadius: '16px', borderTopRightRadius: '16px', borderBottomLeftRadius: '80px', borderBottomRightRadius: '16px' }}
              >
                <img src={pillarIcons[i]} alt="" style={{ width: '54px', height: '54px', objectFit: 'contain', marginBottom: '20px' }} />
                <h3 className="mb-3" style={{ color: '#9B8D83', fontFamily: wideFont, fontWeight: 600, fontSize: '13px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
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

      {/* We are not another diet clinic */}
      <section className="py-16" style={{ backgroundColor: '#ffffff', backgroundImage: 'url(/wix/87fc13_eed9276b67e74ae99994e6bab4bcd409~mv2.png)', backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center" style={{ color: '#9B8D83', fontFamily: wideFont, fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase' }}>
            The Carisma Difference
          </p>
          <div className="mx-auto mt-2 mb-6" style={{ width: '150px', height: '1px', backgroundColor: '#8EB093' }} />
          <h2 className="text-center mb-6" style={{ color: '#7ba587', fontFamily: headingFont, fontWeight: 400, fontSize: '30px', textTransform: 'uppercase', lineHeight: 1.3 }}>
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
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8EB093" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}><polyline points="20 6 9 17 4 12" /></svg>
                  <span style={{ color: '#9B8D83', fontFamily: wideFont, fontSize: '15px', letterSpacing: '0.5px', textTransform: 'uppercase', lineHeight: 1.5 }}>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-center mb-3 uppercase"
            style={{ color: '#7ba587', fontFamily: headingFont, fontWeight: 400, fontSize: '28px' }}
          >
            medical weight loss eligibility
          </h2>
          <p
            className="text-center mb-10 uppercase"
            style={{ color: '#AFA39D', fontFamily: wideFont, fontSize: '13px' }}
          >
            selective by intention successful by design
          </p>
          <p className="mb-10" style={{ color: '#9B8D83', fontFamily: bodyFont, fontSize: '15px', lineHeight: '1.8' }}>
            Ozempic and Mounjaro can be powerful, but only when prescribed as part of a structured,
            doctor-supervised approach. Eligibility is determined through a thorough medical assessment,
            including blood tests, food-intolerance screening, safety checks, and clear protocols, to ensure
            your program is appropriate, monitored, and adjusted responsibly.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="px-2">
              <h3 className="mb-6 uppercase tracking-wide" style={{ color: '#7ba587', fontFamily: wideFont, fontWeight: 500, fontSize: '13px' }}>
                Suitable for
              </h3>
              <ul className="space-y-4">
                {suitable.map((item, i) => (
                  <li key={i} className="flex items-start gap-3" style={{ color: '#9B8D83', fontFamily: bodyFont, fontSize: '14px' }}>
                    <span style={{ color: '#8EB093', fontWeight: 700 }}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-2">
              <h3 className="mb-6 uppercase tracking-wide" style={{ color: '#9B8D83', fontFamily: wideFont, fontWeight: 500, fontSize: '13px' }}>
                Unsuitable for
              </h3>
              <ul className="space-y-4">
                {unsuitable.map((item, i) => (
                  <li key={i} className="flex items-start gap-3" style={{ color: '#9B8D83', fontFamily: bodyFont, fontSize: '14px' }}>
                    <span style={{ color: '#b06b6b', fontWeight: 700 }}>✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-10" style={{ color: '#AFA39D', fontFamily: bodyFont, fontSize: '12px', lineHeight: '1.7', fontStyle: 'italic' }}>
            * Eligibility and exact costs depend on your health, lab results, and the support you need. You
            will always receive a clear plan and pricing in your medical weight loss consultation before
            starting. Important: GLP-1 medications are prescription-only and not suitable for everyone. This
            program is offered only after a full medical assessment by our doctor.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ backgroundColor: '#8EB093' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-6 uppercase text-white" style={{ fontFamily: headingFont, fontWeight: 400, fontSize: '26px' }}>
            book your medical weight loss consultation
          </h2>
          <Link
            href="/consultation"
            className="inline-block uppercase tracking-wide font-bold rounded"
            style={{ backgroundColor: '#ffffff', color: '#7ba587', padding: '14px 32px', fontFamily: wideFont, fontSize: '13px' }}
          >
            book your medical consultation
          </Link>
        </div>
      </section>
    </main>
  );
}
