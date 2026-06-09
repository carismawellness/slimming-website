const headingFont = 'Trajan Pro, serif';
const wideFont = 'Novecento Wide Book, sans-serif';
const bodyFont = 'Roboto, sans-serif';

const freshaUrl =
  'https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2843963&eid=5009163&oiid=sv%3A25969858&share=true&pId=2708191';
const phoneNumber = '+356 27802062';

const green = '#8EB093';
const greenDark = '#7ba587';
const taupe = '#9B8D83';
const taupeLight = '#AFA39D';
const softBg = '#E4EBE2';
const heroBg = '#D7DFD4';

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-center mb-3"
      style={{ color: greenDark, fontFamily: headingFont, fontWeight: 400, fontSize: '30px', textTransform: 'uppercase' }}
    >
      {children}
    </h2>
  );
}

function Placeholder({ label, height = '320px' }: { label: string; height?: string }) {
  return (
    <div
      className="w-full flex items-center justify-center text-center rounded-lg border-2 border-dashed"
      style={{ minHeight: height, borderColor: green, backgroundColor: softBg, color: taupe, fontFamily: bodyFont, fontSize: '14px', padding: '16px' }}
    >
      {label}
    </div>
  );
}

function CTAButton() {
  return (
    <a
      href={freshaUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block rounded-full font-bold text-white text-center"
      style={{ backgroundColor: green, padding: '14px 32px', fontFamily: wideFont, fontSize: '14px', letterSpacing: '0.5px' }}
    >
      GET YOUR FREE BODY ANALYSIS
    </a>
  );
}

function PhoneButton() {
  return (
    <a
      href={`tel:${phoneNumber.replace(/\s/g, '')}`}
      className="inline-block rounded font-bold text-center"
      style={{ backgroundColor: 'transparent', border: `2px solid ${green}`, color: greenDark, padding: '12px 32px', fontFamily: wideFont, fontSize: '14px', letterSpacing: '0.5px', textTransform: 'uppercase' }}
    >
      free consultation
    </a>
  );
}

export default function WeightLossPage() {
  const guarantees = [
    { loss: '5kgs', weeks: 'in 6 weeks' },
    { loss: '10kgs', weeks: 'in 12 weeks' },
    { loss: '20kgs', weeks: 'in 20 weeks' },
  ];

  const pillars = [
    {
      title: 'Medical grade assessment',
      subtitle: 'Understand your body composition',
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
      items: [
        'Open gym access for independent training',
        'Group classes focused on fat loss and strength',
        'Personal training sessions for extra guidance and motivation',
      ],
    },
    {
      title: 'Targeted body treatments',
      subtitle: 'Clinic treatments that speed up change',
      items: [
        'Muscle stimulation treatments (Emsculpt NEO)',
        'Fat freezing treatments (CoolSculpting)',
        'Radiofrequency skin tightening (VelaShape)',
        'Lymphatic drainage',
      ],
    },
  ];

  const whatIgnored = [
    'Your metabolism naturally slows as muscle drops with age',
    'Menopause and peri menopause shift fat to the waist and stomach and change hunger signals.',
    'Years of yo yo dieting have taught your body to protect fat when it senses restriction.',
    'Templatised meal plans with little regard to your medical history, food intolerances and blood work',
  ];

  const whatWrong = [
    'Extreme calorie cuts and carb bans make your body feel under threat, so it holds on to fat and burns muscle.',
    'Focus on burning calories, not protecting muscle or joint health as you age',
    'Endless cardio drains energy without protecting metabolism.',
    'One size fits all meal plans never account for Maltese food, family life or social events.',
  ];

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
    "You want a rapid, extreme 'crash diet' style solution",
    'You are not willing to follow a structured plan',
    'You cannot commit to weekly check-ins or scheduled appointments',
    'You want results without changing routines, eating habits, or lifestyle basics',
    "You are currently dealing with an unmanaged medical condition, or you're on medication that requires medical clearance (we'll screen this in the consultation)",
  ];

  const dietRules = [
    {
      title: 'Mediterranean style, not misery style',
      body: 'Plenty of protein, olive oil, veg, beans and whole grains, with room for bread, pasta and social meals in the right portions.',
    },
    {
      title: 'Higher protein to protect muscle and keep you full',
      body: 'Enough protein to keep you satisfied, support metabolism and avoid losing muscle while you lose fat.',
    },
    {
      title: 'Flexible structure, not food fear',
      body: "No 'good vs bad' foods. We teach portions and timing so you can enjoy hobz biz zejt, pasta, wine or dessert without losing control.",
    },
  ];

  const shapeAroundLife = [
    'Busy mums – Fast family meals, smart leftovers and simple plate formulas',
    'Menopause – Blood sugar balance, protein timing and fat loss strategies that support hormones',
    'Bride / event prep – A clear 6–12 week plan that tightens your silhouette without banning social events',
  ];

  const accountabilityMethods = [
    'Weekly check-ins with weight and measurements so we see what is really happening',
    'Short written progress updates every week or two with clear next steps',
    'WhatsApp check-ins so you can message when you are stuck, tempted or confused',
    'If you go quiet, we follow up first — without judgement — to help you get back on track',
  ];

  const mayCheck = [
    'Blood tests for thyroid, blood sugar and cholesterol',
    'Food intolerance testing if symptoms suggest it',
    'Blood pressure and other basic checks to ensure your plan is safe',
  ];

  const trainingStyles = [
    {
      title: 'Open Gym Access (Independent Training):',
      body: 'Train on your own time with a clear plan to follow. Perfect if you like flexibility and want structure without fixed class times.',
    },
    {
      title: 'Group Classes (Fat Loss + Strength):',
      body: 'High-energy sessions designed to burn fat, build lean muscle, and keep you accountable. Ideal if you thrive with community and coaching in the room.',
    },
    {
      title: 'Personal Training (Extra Guidance + Motivation):',
      body: 'One-to-one sessions for maximum support, form coaching, and personalised progression. Best if you want faster confidence, tighter technique, and strong accountability.',
    },
  ];

  const treatments = [
    {
      title: 'Muscle Stimulation — Emsculpt NEO',
      placeholder: 'Emsculpt NEO muscle stimulation treatment photo',
      image: '/wix/87fc13_a965179046514c2a8ad7bec0b7f44127~mv2.jpg',
      desc: 'Emsculpt NEO uses high-intensity electromagnetic pulses to contract your muscles thousands of times in a session, stimulating the effect of 20,000 sit-ups in one 30 minute session',
      useLabel: 'We use it to:',
      uses: [
        'Build and tone muscle in areas like abdomen and glutes',
        'Support posture and core strength as you lose weight',
        'Refine shape after you start dropping kilos',
      ],
      note: 'You stay dressed, lie down, and feel strong, deep contractions while our team monitors you.',
    },
    {
      title: 'Lymphatic Drainage',
      placeholder: 'Lymphatic drainage treatment photo',
      image: '',
      desc: 'We offer lymphatic drainage using compressive microvibration technology and specialised massage.',
      useLabel: 'We use it to:',
      uses: [
        'Support circulation and fluid drainage',
        "Help with that 'puffy, heavy' feeling some women experience in the legs or abdomen",
        'Complement fat loss and skin tightening treatments',
      ],
      note: '',
    },
    {
      title: 'Fat Freezing — CoolSculpting',
      placeholder: 'CoolSculpting fat freezing treatment photo',
      image: '',
      desc: 'CoolSculpting is the market leading fat freezing technology that targets stubborn pockets of fat that do not respond to diet and exercise. It cools fat cells in a controlled way so your body can gradually clear them over time.',
      useLabel: 'We use it to:',
      uses: [
        'Target areas like lower belly, flanks, bra fat or thighs',
        'Help contour the body after your weight starts to come down',
        'Support results without surgery or downtime',
      ],
      note: "Every treatment plan is based on your medical assessment and body goals, not a 'one area fits all' offer.",
    },
    {
      title: 'Skin Tightening — VelaShape',
      placeholder: 'VelaShape skin tightening treatment photo',
      image: '',
      desc: 'VelaShape combines radiofrequency, infrared light, gentle vacuum and massage to heat the deeper layers of the skin and stimulate collagen.',
      useLabel: 'We use it to:',
      uses: [
        'Improve skin texture and mild laxity as the body changes',
        "Smooth the look of areas that feel softer or 'looser' after weight loss",
        'Support circulation and the appearance of cellulite-prone zones',
      ],
      note: 'It feels like a warm, deep massage rather than a harsh, painful treatment.',
    },
  ];

  const carismaDifference = [
    'Doctor led: full medical check and body scan',
    'One integrated program: medical, diet, movement and treatments together',
    'Real gym included: Technogym facility, semi-private classes and PT',
    'High touch support: weekly check ins, progress reports and WhatsApp follow up',
    'Evidence based devices: Emsculpt NEO, coolsculpting and RF skin tightening',
    'Selective entry and measurable weight loss results guaranteed',
  ];

  const promiseAgreements = [
    'Attend all scheduled in clinic sessions and weekly check ins',
    'Follow your personalised food plan consistently and tell us when you struggle',
    'Complete your agreed movement plan or discuss any pain or obstacles with your coach',
    'Use only the treatments and medications recommended by our medical team for this program',
    'Inform us of any major health or medication changes, pregnancy or new diagnosis during the program',
    'Avoid crash diets, extreme restriction or outside weight loss treatments that could affect your results',
  ];

  const commitments = [
    'Visible inch loss and shape change, not vague promises',
    'Plans that work with your age, hormones and metabolism',
    'No crash diets, no banned foods, no endless hours of cardio',
    'Medical grade technology and treatments delivered by trained professionals',
  ];

  const whyMalta = [
    "Created by the team behind Malta's leading spa and medical aesthetics centres",
    "Doctor led medical slimming, not a beauty salon 'diet program'",
    'All in one approach: assessment, nutrition, movement and treatments',
    'High touch support with weekly check ins and WhatsApp coaching',
  ];

  const bullet = { color: green, fontSize: '18px', lineHeight: '1' };
  const liStyle = { color: taupe, fontFamily: bodyFont, fontWeight: 400 as const, fontSize: '15px' };
  const pStyle = { color: taupe, fontFamily: bodyFont, fontWeight: 400 as const, fontSize: '15px', lineHeight: 1.7 };

  return (
    <main className="w-full" style={{ backgroundColor: '#fff' }}>
      {/* Hero Section */}
      <section className="py-16" style={{ backgroundColor: '#fff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="mb-3" style={{ color: green, fontFamily: wideFont, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                #1 voted slimming clinic in malta &middot; Medically qualified doctors
              </p>
              <h1 className="mb-4" style={{ color: greenDark, fontFamily: headingFont, fontWeight: 400, fontSize: '40px', lineHeight: 1.2, textTransform: 'uppercase' }}>
                lose up to 1kg a week.
              </h1>
              <p className="mb-6" style={{ color: taupe, fontFamily: wideFont, fontSize: '16px' }}>
                with Malta&apos;s most comprehensive, medically guided slimming program
              </p>
              <p className="mb-8" style={pStyle}>
                Personalised programs that combine medical-grade analysis and prescription stack, nutrition plan, internationally renowned body sculpting modalities and weekly check-ins to help you achieve your target weight and stick to it.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <CTAButton />
                <PhoneButton />
              </div>
              <p className="mt-6" style={{ color: taupeLight, fontFamily: bodyFont, fontSize: '13px' }}>
                Over 200+ Reviews &middot; &#9733;&#9733;&#9733;&#9733;&#9733;
              </p>
            </div>
            <div>
              <div className="w-full rounded-lg overflow-hidden" style={{ aspectRatio: '381 / 182' }}>
                <img src="/wix/87fc13_440425b61c66444abe7e3062dbfcd290~mv2.jpg" alt="Hero image: female client in consultation, with '#1 Voted Clinic in Malta' badge" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          </div>

          {/* Guarantee */}
          <div className="mt-12">
            <p className="mb-6 text-center" style={pStyle}>
              We are so confident in our programs that we offer an extended care commitment results:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {guarantees.map((g) => (
                <div key={g.loss} className="rounded-lg p-8 text-center" style={{ border: `1px solid #dfe6dc`, backgroundColor: softBg }}>
                  <p style={{ color: greenDark, fontFamily: headingFont, fontSize: '36px', fontWeight: 400 }}>{g.loss}</p>
                  <p style={{ color: taupe, fontFamily: bodyFont, fontSize: '15px' }}>{g.weeks}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center italic" style={pStyle}>
              If you do not hit your agreed target, we keep treating you for free.
            </p>
          </div>

          {/* Footnotes */}
          <div className="mt-10 max-w-4xl mx-auto space-y-1" style={{ color: taupeLight, fontFamily: bodyFont, fontSize: '12px' }}>
            <p>*Includes 3 appointments of fat freezing sessions, scheduled based on your clinical plan; additional areas or appointments charged at extra.</p>
            <p>** Sessions may be spaced over multiple weeks depending on area and suitability</p>
            <p>***Due to high demand, packages are offered based on availability and may not always be guaranteed. Please inquire for current options.</p>
          </div>
        </div>
      </section>

      {/* As seen on */}
      <section className="py-10 border-b" style={{ borderColor: '#e0e0e0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="mb-6" style={{ color: taupe, fontFamily: wideFont, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' }}>
            As seen on
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
            <div className="w-full flex items-center justify-center" style={{ height: '70px' }}>
              <img src="/wix/f940f0_c4008d16bc3245f7bc8663f5b60d7a82~mv2.png" alt="One News logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div className="w-full flex items-center justify-center" style={{ height: '70px' }}>
              <img src="/wix/f940f0_8c40f03f50684bf8adc6d9ca0cb2be9e~mv2.jpg" alt="Malta Today logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div className="w-full flex items-center justify-center" style={{ height: '70px' }}>
              <img src="/wix/f940f0_2120887ab6ef4957b02ff004e804beaf~mv2.png" alt="Times Malta logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div className="w-full flex items-center justify-center" style={{ height: '70px' }}>
              <img src="/wix/f940f0_0db6f1508426404eacea3b33b0e9112d~mv2.png" alt="MT Today logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Lose inches narrative */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center" style={{ color: greenDark, fontFamily: headingFont, fontWeight: 400, fontSize: '30px', textTransform: 'uppercase' }}>
            lose inches, gain energy / pasta and wine still on the menu
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="w-full rounded-lg overflow-hidden mx-auto" style={{ aspectRatio: '334 / 362', maxWidth: '420px' }}>
              <img src="/wix/87fc13_16e7dbedc9e84343b51b1f3d4821c6ea~mv2.jpg" alt="Slimming consultation photo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <p className="mb-6" style={pStyle}>
                You are eating better than you did in your twenties, yet the weight around your stomach and hips does not budge. You walk more, you try to be good, but every year your clothes feel tighter and your energy feels lower.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  'Since your late thirties or early forties your body feels like it quietly changed the rules. The same food now sits on your waist instead of burning off.',
                  'Around menopause the scale crept up even though you were counting steps and cutting snacks. You feel betrayed by your own hormones.',
                  'Every new diet tells you to cut bread, pasta and wine. You can do it for a week or two, then life happens and you rebound even heavier.',
                  'You are tired of plans that treat you like a number on a scale instead of a human with work, family, stress and a changing body.',
                ].map((t) => (
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
      </section>

      {/* Why so hard to lose weight after 30 */}
      <section className="py-16" style={{ backgroundColor: softBg }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading>why is it so hard to lose weight after 30?</SectionHeading>
          <p className="mt-6 mb-8 text-center" style={pStyle}>
            Most of what you have tried was built on one idea: eat less, move more. That might work for a 25 year old with no stress. It is not enough for a 40 plus body with real hormones, real history and real responsibilities.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-lg p-7 bg-white shadow-sm" style={{ border: `1px solid #dfe6dc` }}>
              <h3 className="mb-4" style={{ color: taupe, fontFamily: wideFont, fontSize: '16px', fontWeight: 600 }}>What those plans ignored</h3>
              <ul className="space-y-3">
                {whatIgnored.map((t) => (
                  <li key={t} className="flex items-start gap-2" style={liStyle}>
                    <span style={bullet}>&bull;</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg p-7 bg-white shadow-sm" style={{ border: `1px solid #dfe6dc` }}>
              <h3 className="mb-4" style={{ color: taupe, fontFamily: wideFont, fontSize: '16px', fontWeight: 600 }}>What those plans got wrong</h3>
              <ul className="space-y-3">
                {whatWrong.map((t) => (
                  <li key={t} className="flex items-start gap-2" style={liStyle}>
                    <span style={bullet}>&bull;</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-8" style={pStyle}>
            So you end up hungrier, more tired and more frustrated, often with less muscle and a slower metabolism than when you started.
          </p>
          <p className="mt-4 mb-8" style={pStyle}>
            Our program is built to reverse exactly that: we reset your metabolism for your age, protect muscle, work with your hormones and show you how to lose weight while still eating food you enjoy.
          </p>
          <div className="text-center">
            <CTAButton />
          </div>
        </div>
      </section>

      {/* 4 core pillars */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading>4 core pillars of our methodology</SectionHeading>
          <p className="text-center mb-12" style={{ color: taupe, fontFamily: wideFont, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            malta&apos;s only multidisciplinary approach to weight-loss
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p) => (
              <div key={p.title} className="rounded-lg p-6" style={{ borderLeft: `4px solid ${green}`, backgroundColor: softBg }}>
                <h3 className="mb-1" style={{ color: greenDark, fontFamily: headingFont, fontSize: '18px', fontWeight: 400 }}>{p.title}</h3>
                <p className="mb-4" style={{ color: taupeLight, fontFamily: bodyFont, fontSize: '13px', fontStyle: 'italic' }}>{p.subtitle}</p>
                <ul className="space-y-2">
                  {p.items.map((it) => (
                    <li key={it} className="flex items-start gap-2" style={{ ...liStyle, fontSize: '14px' }}>
                      <span style={bullet}>&bull;</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works - Step 1 */}
      <section className="py-16" style={{ backgroundColor: softBg }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading>how it works</SectionHeading>
          <h3 className="mt-10 mb-4" style={{ color: greenDark, fontFamily: headingFont, fontSize: '22px', fontWeight: 400 }}>
            COMPLIMENTARY CONSULTATION
          </h3>
          <p className="mb-6" style={pStyle}>
            Every program starts with a full in clinic consultation. This is where we decide together if our guided transformation protocol is the right fit for you. Because we stand behind your results, we are selective about who we can work with.
          </p>
          <ol className="space-y-3 mb-8">
            {consultationSteps.map((s, i) => (
              <li key={s} className="flex items-start gap-3" style={liStyle}>
                <span style={{ color: green, fontFamily: headingFont, fontWeight: 600 }}>{i + 1}.</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
          <p style={pStyle}>
            If we do not believe we can deliver real, measurable change, we will not enrol you into the program. If we do accept you, it is because we are prepared to stand behind your results.
          </p>
        </div>
      </section>

      {/* Suitability */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="mb-6" style={{ color: greenDark, fontFamily: headingFont, fontSize: '20px', fontWeight: 400 }}>SUITABLE FOR:</h3>
              <ul className="space-y-3">
                {suitableFor.map((t) => (
                  <li key={t} className="flex items-start gap-3" style={liStyle}>
                    <span style={{ color: green, fontWeight: 700 }}>&#10003;</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-6" style={{ color: taupe, fontFamily: headingFont, fontSize: '20px', fontWeight: 400 }}>NOT SUITABLE FOR:</h3>
              <ul className="space-y-3">
                {notSuitableFor.map((t) => (
                  <li key={t} className="flex items-start gap-3" style={liStyle}>
                    <span style={{ color: taupeLight, fontWeight: 700 }}>&#10007;</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Step 2: Diet and accountability */}
      <section className="py-16" style={{ backgroundColor: softBg }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading>Diet and accountability</SectionHeading>
          <p className="mt-8 mb-6" style={pStyle}>
            Together we build a personalised food plan that fits school runs, meetings, weekends and Maltese food. We do not hand you a random PDF and wish you luck. Your plan is built on three simple rules:
          </p>
          <div className="space-y-5 mb-8">
            {dietRules.map((r, i) => (
              <div key={r.title}>
                <h4 style={{ color: greenDark, fontFamily: wideFont, fontSize: '15px', fontWeight: 600 }}>{i + 1}. {r.title}</h4>
                <p style={pStyle}>{r.body}</p>
              </div>
            ))}
          </div>
          <p className="mb-4" style={{ ...pStyle, fontWeight: 600, color: taupe }}>Then we shape it around your life:</p>
          <ul className="space-y-3 mb-6">
            {shapeAroundLife.map((t) => (
              <li key={t} className="flex items-start gap-2" style={liStyle}>
                <span style={bullet}>&bull;</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <p className="mb-10" style={pStyle}>
            No shakes only, no keto only, no 1,000 calorie days. Your plan has to work on bad weeks, or it does not work at all.
          </p>

          <h3 className="mb-3" style={{ color: greenDark, fontFamily: headingFont, fontSize: '20px', fontWeight: 400 }}>
            Accountability: how we keep you moving
          </h3>
          <p className="mb-6" style={pStyle}>You are not doing this alone or guessing between visits.</p>
          <ul className="space-y-3">
            {accountabilityMethods.map((t) => (
              <li key={t} className="flex items-start gap-2" style={liStyle}>
                <span style={bullet}>&bull;</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Step 3: Body analysis & medical consultation */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6" style={{ color: greenDark, fontFamily: headingFont, fontSize: '26px', fontWeight: 400, textTransform: 'uppercase' }}>
                Body analysis &amp; medical grade consultation
              </h2>
              <p className="mb-5" style={pStyle}>
                Before we change your food or your body, we take time to understand you. If eligibile set up an appointment with medical doctor to review your health, hormones, medical history, medications, pregnancies, and menopause. You also meet your slimming consultant for clinical measurements and a body composition scan, looking at fat, muscle, visceral fat, and water — not just the number on the scale.
              </p>
              <p className="mb-5" style={pStyle}>
                We talk through how you feel day to day: energy, cravings, sleep, mood, digestion, and joint pain. Together, we set a clear baseline for your transformation.
              </p>
              <p className="mb-4" style={{ ...pStyle, fontWeight: 600, color: taupe }}>What we may check, if it makes sense for you:</p>
              <ul className="space-y-3 mb-5">
                {mayCheck.map((t) => (
                  <li key={t} className="flex items-start gap-2" style={liStyle}>
                    <span style={bullet}>&bull;</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <p className="mb-4" style={pStyle}>
                These assesments determine your GLP-1 (e.g., Ozempic, Mounjaro) eligibility.
              </p>
              <p style={pStyle}>
                Based on your results, we we enroll you on your prescription protocol, tailor a program length and treatment mix that is realistic for your starting point and schedule your follow ups to check-in with our doctor and slimming consultant. This is where &lsquo;nothing works for my body&rsquo; starts to become a clear picture and a safe, personalised plan.
              </p>
            </div>
            <div className="w-full rounded-lg overflow-hidden" style={{ aspectRatio: '375 / 350' }}>
              <img src="/wix/87fc13_aea394ce5ab4485e8613221fa3617b8f~mv2.png" alt="Body composition analysis / Tanita scan photo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Step 4: Movement */}
      <section className="py-16" style={{ backgroundColor: softBg }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading>Movement That Fits Your Life</SectionHeading>
          <p className="mt-8 mb-4" style={pStyle}>
            Weight loss sticks when movement feels realistic, not punishing. In Step 4, we design a movement plan that meets you exactly where you are today and fits seamlessly into your schedule, fitness level, and preferences.
          </p>
          <p className="mb-8" style={pStyle}>
            The goal is simple: build consistency, improve strength, increase basal metabolic rate, and keep you progressing week after week.
          </p>
          <p className="mb-6" style={{ ...pStyle, fontWeight: 600, color: taupe }}>Choose the training style that suits you:</p>
          <div className="space-y-6">
            {trainingStyles.map((s, i) => (
              <div key={s.title}>
                <h4 style={{ color: greenDark, fontFamily: wideFont, fontSize: '15px', fontWeight: 600 }}>{i + 1}. {s.title}</h4>
                <p style={pStyle}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatments */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading>treatments</SectionHeading>
          <p className="mt-8 mb-12 max-w-4xl mx-auto text-center" style={pStyle}>
            We use internationally renowned technologies to shape, tighten and refine your results — never cheap gadgets or outdated machines. Our treatments are not the whole plan, but they are powerful tools when used on top of a solid medical, diet and movement strategy. Every device we use is leading in its category, chosen for safety, research and real-world results.
          </p>
          <div className="space-y-12">
            {treatments.map((t, i) => (
              <div key={t.title} className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div className={i === treatments.length - 1 ? 'md:order-2' : ''}>
                  {t.image ? (
                    <div className="w-full rounded-lg overflow-hidden" style={{ aspectRatio: '381 / 182' }}>
                      <img src={t.image} alt={t.placeholder} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ) : (
                    <Placeholder label={t.placeholder} height="300px" />
                  )}
                </div>
                <div className={i === treatments.length - 1 ? 'md:order-1' : ''}>
                  <h3 className="mb-4" style={{ color: greenDark, fontFamily: headingFont, fontSize: '22px', fontWeight: 400 }}>{t.title}</h3>
                  {t.desc && <p className="mb-4" style={pStyle}>{t.desc}</p>}
                  <p className="mb-3" style={{ ...pStyle, fontWeight: 600, color: taupe }}>{t.useLabel}</p>
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
            ))}
          </div>
        </div>
      </section>

      {/* The Carisma Difference */}
      <section className="py-16" style={{ backgroundColor: softBg }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading>the carisma difference</SectionHeading>
          <p className="mt-6 mb-4 text-center" style={{ color: greenDark, fontFamily: headingFont, fontSize: '24px', fontWeight: 400 }}>
            we are not another diet clinic.
          </p>
          <p className="mb-10 text-center max-w-3xl mx-auto" style={pStyle}>
            We&apos;re a doctor led transformation program that blends medical insight, sustainable nutrition, and modern body tech into one high touch system, so you don&apos;t just lose weight, you step into your strongest form.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {carismaDifference.map((t) => (
              <li key={t} className="flex items-start gap-3" style={liStyle}>
                <span style={{ color: green, fontWeight: 700 }}>&#10003;</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Our Promise */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading>our promise</SectionHeading>
          <p className="mt-6 mb-10 text-center" style={{ color: greenDark, fontFamily: headingFont, fontSize: '24px', fontWeight: 400 }}>
            up to 1kg a week. measured. verified. commited
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="w-full rounded-lg overflow-hidden" style={{ aspectRatio: '375 / 350' }}>
              <img src="/wix/87fc13_aea394ce5ab4485e8613221fa3617b8f~mv2.png" alt="Body analysis measurement display photo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <p className="mb-6" style={pStyle}>
                We are selective about who joins our transformation programs. We only accept women we genuinely believe we can help. If you qualify and complete your program as agreed, and and do not hit your target weight, we will extend your program at no extra program fee until we achieve our desired result.
              </p>
              <p className="mb-6" style={{ ...pStyle, fontWeight: 600, color: greenDark }}>This is our Extended Care Commitment</p>
              <p className="mb-4" style={{ ...pStyle, fontWeight: 600, color: taupe }}>To keep your results medically valid and fair, you agree to*</p>
              <ul className="space-y-3">
                {promiseAgreements.map((t) => (
                  <li key={t} className="flex items-start gap-2" style={liStyle}>
                    <span style={bullet}>&bull;</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-16" style={{ backgroundColor: softBg }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading>the carisma difference</SectionHeading>
          <p className="mt-4 mb-12 text-center" style={{ color: taupe, fontFamily: wideFont, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            malta&apos;s #1 leading wellness chain
          </p>

          <h3 className="mb-6 text-center" style={{ color: greenDark, fontFamily: headingFont, fontSize: '22px', fontWeight: 400, textTransform: 'uppercase' }}>
            our commitment
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {commitments.map((t) => (
              <li key={t} className="flex items-start gap-3" style={liStyle}>
                <span style={{ color: green, fontWeight: 700 }}>&#10003;</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why Malta Chooses Carisma */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading>WHY MALTA CHOOSES Carisma</SectionHeading>
          <ul className="mt-10 mb-10 space-y-3 inline-block text-left">
            {whyMalta.map((t) => (
              <li key={t} className="flex items-start gap-3" style={liStyle}>
                <span style={{ color: green, fontWeight: 700 }}>&#10003;</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <div>
            <CTAButton />
          </div>
          <p className="mt-8" style={{ color: taupe, fontFamily: bodyFont, fontSize: '14px' }}>
            Complimentary on-site parking
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16" style={{ backgroundColor: softBg }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading>Common questions we hear</SectionHeading>
          <div className="mt-10">
            <h3 className="mb-2" style={{ color: greenDark, fontFamily: wideFont, fontSize: '15px', fontWeight: 600 }}>
              1. How is this transformation program different from a normal diet or gym plan?
            </h3>
            <p style={pStyle}>
              Unlike a standard diet or gym membership, our program is doctor led and combines medical assessment, personalised nutrition, movement and clinic treatments into one integrated plan built around your age, hormones and metabolism — with weekly check-ins and an Extended Care Commitment.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
