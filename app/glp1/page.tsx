import Link from 'next/link';

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
      <section className="py-16" style={{ backgroundColor: '#EEF3F0' }}>
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
              <img src="/wix/87fc13_3028fef86af2454fa2fbdbb5dcd55d87~mv2.png" alt="Hero image / patient photo (medical weight loss with Ozempic & Mounjaro)" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Medical Weight Loss Results */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-center mb-10 uppercase"
            style={{ color: '#7ba587', fontFamily: headingFont, fontWeight: 400, fontSize: '28px' }}
          >
            medical weight loss results
          </h2>
          <div
            className="flex items-center justify-center text-center w-full mx-auto overflow-hidden"
            style={{ aspectRatio: '176 / 168', maxWidth: '352px', borderRadius: '24px' }}
          >
            <img src="/wix/87fc13_de24c77f8dcf436699a6eeac3645088c~mv2.jpg" alt="Medical weight loss before/after results image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* What is Medical Weight Loss */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-center mb-3 uppercase"
            style={{ color: '#7ba587', fontFamily: headingFont, fontWeight: 400, fontSize: '28px' }}
          >
            what is medical weight loss?
          </h2>
          <p
            className="text-center mb-8"
            style={{ color: '#AFA39D', fontFamily: wideFont, fontSize: '14px' }}
          >
            clarity before you start. What does medical weight loss really mean?
          </p>
          <p className="mb-10" style={{ color: '#9B8D83', fontFamily: bodyFont, fontSize: '15px', lineHeight: '1.8' }}>
            Medical weight loss is a doctor-supervised approach to losing weight that goes beyond diets and
            willpower. At our weight loss clinic in Malta, it means a full medical assessment, personalised
            nutrition planning, body composition monitoring, and, where clinically appropriate, GLP-1
            prescription support to regulate appetite and reduce cravings. Our doctors prescribe Ozempic
            (semaglutide) and Mounjaro (tirzepatide) for weight loss as part of a structured programme, not
            as a standalone prescription. This approach works because it treats the biological, behavioural,
            and lifestyle factors that make losing weight difficult.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="px-2">
              <h3 className="mb-6 uppercase tracking-wide" style={{ color: '#7ba587', fontFamily: wideFont, fontWeight: 500, fontSize: '13px' }}>
                What a medical weight loss program addresses
              </h3>
              <ul className="space-y-4">
                {addresses.map((item, i) => (
                  <li key={i} className="flex items-start gap-3" style={{ color: '#9B8D83', fontFamily: bodyFont, fontSize: '14px' }}>
                    <span style={{ color: '#8EB093', fontWeight: 700 }}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-2">
              <h3 className="mb-6 uppercase tracking-wide" style={{ color: '#9B8D83', fontFamily: wideFont, fontWeight: 500, fontSize: '13px' }}>
                What medication alone cannot do
              </h3>
              <ul className="space-y-4">
                {cannotDo.map((item, i) => (
                  <li key={i} className="flex items-start gap-3" style={{ color: '#9B8D83', fontFamily: bodyFont, fontSize: '14px' }}>
                    <span style={{ color: '#b06b6b', fontWeight: 700 }}>✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-10" style={{ color: '#9B8D83', fontFamily: bodyFont, fontSize: '15px', lineHeight: '1.8' }}>
            That is why our program in Malta combines Ozempic or Mounjaro support (if clinically appropriate)
            with nutrition structure, strength training guidance, weekly tracking, and a defined maintenance
            plan.
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

      {/* Trust */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-center mb-10 uppercase"
            style={{ color: '#7ba587', fontFamily: headingFont, fontWeight: 400, fontSize: '24px' }}
          >
            malta&apos;s trusted clinic for doctor-led, medical weight loss
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { label: 'Malta Today logo', src: '/wix/f940f0_8c40f03f50684bf8adc6d9ca0cb2be9e~mv2.jpg' },
              { label: 'Press publication logo', src: '/wix/f940f0_e6f0bd96c9d04debaa8d8b609cbf68e6~mv2.jpeg' },
              { label: 'Press publication logo', src: '/wix/f940f0_8bd141199fea4275a1222b62f24f2d98~mv2.jpeg' },
              { label: 'Times of Malta logo', src: '/wix/f940f0_2120887ab6ef4957b02ff004e804beaf~mv2.png' },
              { label: 'MaltaToday logo', src: '/wix/f940f0_0db6f1508426404eacea3b33b0e9112d~mv2.png' },
              { label: 'Certification badge', src: '/wix/f940f0_c4008d16bc3245f7bc8663f5b60d7a82~mv2.png' },
            ].map((logo, i) => (
              <div
                key={i}
                className="flex items-center justify-center text-center text-xs overflow-hidden"
                style={{ height: '70px' }}
              >
                <img src={logo.src} alt={logo.label} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Pillars */}
      <section className="py-20" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, i) => (
              <div key={i} className="rounded-2xl p-8" style={{ backgroundColor: '#EEF3F0' }}>
                <div className="mb-5 flex items-center justify-center" style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#ffffff' }}>
                  <span style={{ color: '#8EB093', fontWeight: 700, fontSize: '20px' }}>✦</span>
                </div>
                <h3 className="mb-3 uppercase tracking-wide" style={{ color: '#7ba587', fontFamily: wideFont, fontWeight: 600, fontSize: '13px' }}>
                  {pillar.title}
                </h3>
                <p style={{ color: '#9B8D83', fontFamily: bodyFont, fontSize: '13px', lineHeight: '1.7' }}>
                  {pillar.body}
                </p>
              </div>
            ))}
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
