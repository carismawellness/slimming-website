'use client';

import { useState } from 'react';

const wideFont = 'Novecento Wide Book, sans-serif';
const bodyFont = 'Roboto, sans-serif';

const GREEN = '#7ba587';
const TAUPE = '#9B8D83';
const CHECK = '#8EB093';
const XGREY = '#AEC1A6';

const TABS = ['STEP 1', 'STEP 2', 'STEP 3', 'STEP 4', 'STEP 5'];

function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={CHECK} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function Cross() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={XGREY} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function PanelTitle({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <img src={icon} alt="" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
      <h3 style={{ color: TAUPE, fontFamily: wideFont, fontWeight: 600, fontSize: '18px', letterSpacing: '1px', textTransform: 'uppercase' }}>{children}</h3>
    </div>
  );
}

const body14: React.CSSProperties = { color: TAUPE, fontFamily: bodyFont, fontSize: '14px', lineHeight: 1.7 };

export default function HowItWorksTabs() {
  const [active, setActive] = useState(0);

  const suitableStep1 = [
    'You are 28–60 with 5–20 kg to lose',
    'Your body has changed with age, hormones or menopause',
    'You want a medical approach, not another fad diet',
    'You want to lose weight while still eating real food',
    'You are willing to follow a clear plan with weekly check-ins',
    'You are ready to invest time, energy and budget into your health',
    'Committed to attend all scheduled appointments and sessions',
  ];

  const notSuitableStep1 = [
    'You are pregnant, or breastfeeding',
    'You want a rapid, extreme “crash diet” style solution',
    'You are not willing to follow a structured plan',
    'You cannot commit to weekly check-ins or scheduled appointments',
    'You want results without changing routines, eating habits, or lifestyle basics',
    'You are currently dealing with an unmanaged medical condition, or you’re on treatment supports that requires medical clearance (we’ll screen this in the consultation)',
  ];

  const consultationList = [
    'Go through your goals, your reasons for changing and your timeline',
    'Review your health history, treatment supports and past diets',
    'Look at your current capacity for food changes, movement and clinic visits',
    'Share real before and after cases that match your age, body type and situation',
    'Explain exactly how our procidures are designed and what support you receive',
    'Tell you honestly if you are a good candidate for this transformation',
  ];

  const foodRules = [
    { title: 'Mediterranean style, not misery style', body: 'Plenty of protein, olive oil, veg, beans and whole grains, with room for bread, pasta and social meals in the right portions.' },
    { title: 'Higher protein to protect muscle and keep you full', body: 'Enough protein to keep you satisfied, support metabolism and avoid losing muscle while you lose fat.' },
    { title: 'Flexible structure, not food fear', body: 'No “good vs bad” foods. We teach portions and timing so you can enjoy hobz biz zejt, pasta, wine or dessert without losing control.' },
  ];

  const lifestyles = [
    { title: 'Busy mums', body: 'Fast family meals, smart leftovers and simple plate formulas' },
    { title: 'Menopause', body: 'Blood sugar balance, protein timing and fat loss strategies that support hormones' },
    { title: 'Bride / event prep', body: 'A clear 6–12 week plan that tightens your silhouette without banning social events' },
  ];

  const accountability = [
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
    { title: 'Open Gym Access (Independent Training):', body: 'Train on your own time with a clear plan to follow. Perfect if you like flexibility and want structure without fixed class times.' },
    { title: 'Group Classes (Fat Loss + Strength):', body: 'High-energy sessions designed to burn fat, build lean muscle, and keep you accountable. Ideal if you thrive with community and coaching in the room.' },
    { title: 'Personal Training (Extra Guidance + Motivation):', body: 'One-to-one sessions for maximum support, form coaching, and personalised progression. Best if you want faster confidence, tighter technique, and strong accountability.' },
  ];

  const treatments = [
    {
      icon: '/wix/87fc13_3d8f7ee53e874397bc85784823b4aaeb~mv2.png',
      title: 'Muscle stimulation- emsculpt neo',
      intro: 'Emsculpt NEO uses high-intensity electromagnetic pulses to contract your muscles thousands of times in a session, stimulating the effect of 20,000 sit-ups in one 30 minute session',
      uses: [
        'Build and tone muscle in areas like abdomen and glutes',
        'Support posture and core strength as you lose weight',
        'Refine shape after you start dropping kilos',
      ],
      outro: 'You stay dressed, lie down, and feel strong, deep contractions while our team monitors you.',
    },
    {
      icon: '/wix/87fc13_3933ed261bfe433cbd96167c588de803~mv2.png',
      title: 'Lymphatic drainage',
      intro: 'We offer lymphatic drainage using compressive microvibration technology and specialised massage.',
      uses: [
        'Support circulation and fluid drainage',
        'Help with that “puffy, heavy” feeling some women experience in the legs or abdomen',
        'Complement fat loss and skin tightening treatments',
      ],
      outro: '',
    },
    {
      icon: '/wix/87fc13_d170f070d1d64560b77dd6ce085f4221~mv2.png',
      title: 'Fat freezing — CoolSculpting',
      intro: 'CoolSculpting is the market leading fat freezing technology that targets stubborn pockets of fat that do not respond to diet and exercise. It cools fat cells in a controlled way so your body can gradually clear them over time.',
      uses: [
        'Target areas like lower belly, flanks, bra fat or thighs',
        'Help contour the body after your weight starts to come down',
        'Support results without surgery or downtime',
      ],
      outro: 'Every treatment plan is based on your medical assessment and body goals, not a “one area fits all” offer.',
    },
    {
      icon: '/wix/87fc13_64873b0f01a348d6ac5b28470e897b18~mv2.png',
      title: 'Skin tightening — VelaShape',
      intro: 'VelaShape combines radiofrequency, infrared light, gentle vacuum and massage to heat the deeper layers of the skin and stimulate collagen.',
      uses: [
        'Improve skin texture and mild laxity as the body changes',
        'Smooth the look of areas that feel softer or “looser” after weight loss',
        'Support circulation and the appearance of cellulite-prone zones',
      ],
      outro: 'It feels like a warm, deep massage rather than a harsh, painful treatment.',
    },
  ];

  return (
    <div>
      {/* Tab bar */}
      <div className="flex" style={{ borderBottom: '1px solid #E3E1DA' }}>
        {TABS.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActive(i)}
            className="flex-1 text-left"
            style={{
              fontFamily: bodyFont,
              fontSize: '15px',
              color: active === i ? '#4d4a45' : '#7d7a73',
              padding: '14px 4px',
              borderBottom: active === i ? '3px solid #7ba587' : '3px solid transparent',
              marginBottom: '-1px',
              cursor: 'pointer',
              background: 'none',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Panel */}
      <div
        className="mt-0 p-6 sm:p-8"
        style={{ background: 'linear-gradient(180deg, #FCFCFA 0%, #DCE6D6 100%)', borderBottomLeftRadius: '24px', borderBottomRightRadius: '24px', borderTopRightRadius: '24px' }}
      >
        {active === 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr_1fr] gap-6">
            <div className="bg-white rounded-2xl p-7" style={{ boxShadow: '0 6px 18px rgba(0,0,0,0.04)' }}>
              <PanelTitle icon="/wix/87fc13_d2a17b8db6de4c8c8c41219e3a2c99cb~mv2.png">Complimentary Consultation</PanelTitle>
              <p className="mb-5" style={body14}>
                Every program starts with a full in clinic consultation. This is where we decide together if our guided transformation protocol is the right fit for you. Because we stand behind your results, we are selective about who we can work with.
              </p>
              <ol className="space-y-2 mb-5" style={{ listStyle: 'decimal', paddingLeft: '20px' }}>
                {consultationList.map((t) => (
                  <li key={t} style={body14}>{t}</li>
                ))}
              </ol>
              <p style={body14}>
                If we do not believe we can deliver real, measurable change, we will not enrol you into the program. If we do accept you, it is because we are prepared to stand behind your results.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-7" style={{ boxShadow: '0 6px 18px rgba(0,0,0,0.04)' }}>
              <div className="flex items-center gap-2 mb-5">
                <Check />
                <h3 style={{ color: TAUPE, fontFamily: wideFont, fontWeight: 600, fontSize: '16px', letterSpacing: '1px', textTransform: 'uppercase' }}>Suitable For</h3>
              </div>
              <ul className="space-y-3">
                {suitableStep1.map((t) => (
                  <li key={t} className="flex items-start gap-2" style={body14}>
                    <span style={{ color: CHECK, fontSize: '18px', lineHeight: 1 }}>&bull;</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-7" style={{ boxShadow: '0 6px 18px rgba(0,0,0,0.04)' }}>
              <div className="flex items-center gap-2 mb-5">
                <Cross />
                <h3 style={{ color: TAUPE, fontFamily: wideFont, fontWeight: 600, fontSize: '16px', letterSpacing: '1px', textTransform: 'uppercase' }}>Not Suitable For</h3>
              </div>
              <ul className="space-y-3">
                {notSuitableStep1.map((t) => (
                  <li key={t} className="flex items-start gap-2" style={body14}>
                    <span style={{ color: '#AFA39D', fontSize: '18px', lineHeight: 1 }}>&bull;</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {active === 1 && (
          <div className="bg-white rounded-2xl p-7" style={{ boxShadow: '0 6px 18px rgba(0,0,0,0.04)' }}>
            <PanelTitle icon="/wix/87fc13_b0aad949fa9d47b58f1512dcf2522e3d~mv2.png">Diet and accountability</PanelTitle>
            <p className="mb-5" style={body14}>
              Together we build a personalised food plan that fits school runs, meetings, weekends and Maltese food. We do not hand you a random PDF and wish you luck. Your plan is built on three simple rules:
            </p>
            <ul className="space-y-4 mb-6">
              {foodRules.map((r) => (
                <li key={r.title} style={body14}>
                  <strong style={{ color: '#7d7066' }}>{r.title}</strong>
                  <br />
                  {r.body}
                </li>
              ))}
            </ul>
            <p className="mb-3" style={body14}>Then we shape it around your life:</p>
            <ul className="space-y-2 mb-6">
              {lifestyles.map((l) => (
                <li key={l.title} style={body14}>
                  <strong style={{ color: '#7d7066' }}>{l.title}</strong> &ndash; {l.body}
                </li>
              ))}
            </ul>
            <p className="mb-6" style={body14}>
              No shakes only, no keto only, no 1,000 calorie days. Your plan has to work on bad weeks, or it does not work at all.
            </p>
            <h4 className="mb-3" style={{ color: GREEN, fontFamily: wideFont, fontWeight: 600, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' }}>
              Accountability: how we keep you moving
            </h4>
            <p className="mb-3" style={body14}>You are not doing this alone or guessing between visits.</p>
            <ul className="space-y-2">
              {accountability.map((t) => (
                <li key={t} className="flex items-start gap-2" style={body14}>
                  <Check />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {active === 2 && (
          <div className="bg-white rounded-2xl p-7" style={{ boxShadow: '0 6px 18px rgba(0,0,0,0.04)' }}>
            <PanelTitle icon="/wix/87fc13_9a4ac5ded2b94bbbb6e11e641f46f5d5~mv2.png">Body analysis &amp; medical grade consultation</PanelTitle>
            <p className="mb-5" style={body14}>
              Before we change your food or your body, we take time to understand you. If eligibile set up an appointment with medical doctor to review your health, hormones, medical history, treatment support, pregnancies, and menopause. You also meet your slimming consultant for clinical measurements and a body composition scan, looking at fat, muscle, visceral fat, and water &mdash; not just the number on the scale.
            </p>
            <p className="mb-5" style={body14}>
              We talk through how you feel day to day: energy, cravings, sleep, mood, digestion, and joint pain. Together, we set a clear baseline for your transformation.
            </p>
            <p className="mb-3" style={body14}>What we may check, if it makes sense for you:</p>
            <ul className="space-y-2 mb-5">
              {mayCheck.map((t) => (
                <li key={t} className="flex items-start gap-2" style={body14}>
                  <Check />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <p className="mb-5" style={body14}>These assesments determine your Medical weight loss eligibility.</p>
            <p style={body14}>
              Based on your results, we we enroll you on your &ldquo;clinician-guided care protocol, tailor a program length and treatment mix that is realistic for your starting point and schedule your follow ups to check-in with our doctor and slimming consultant. This is where &ldquo;nothing works for my body&rdquo; starts to become a clear picture and a safe, personalised plan.
            </p>
          </div>
        )}

        {active === 3 && (
          <div className="bg-white rounded-2xl p-7" style={{ boxShadow: '0 6px 18px rgba(0,0,0,0.04)' }}>
            <PanelTitle icon="/wix/87fc13_05acf8a406274fbd9b5586bead0d2df5~mv2.png">Movement That Fits Your Life</PanelTitle>
            <p className="mb-5" style={body14}>
              Weight loss sticks when movement feels realistic, not punishing. In Step 4, we design a movement plan that meets you exactly where you are today and fits seamlessly into your schedule, fitness level, and preferences.
            </p>
            <p className="mb-5" style={body14}>
              The goal is simple: build consistency, improve strength, increase basal metabolic rate, and keep you progressing week after week.
            </p>
            <h4 className="mb-4" style={{ color: GREEN, fontFamily: wideFont, fontWeight: 600, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' }}>
              Choose the training style that suits you
            </h4>
            <ul className="space-y-4">
              {trainingStyles.map((s) => (
                <li key={s.title} style={body14}>
                  <strong style={{ color: '#7d7066' }}>{s.title}</strong>
                  <br />
                  {s.body}
                </li>
              ))}
            </ul>
          </div>
        )}

        {active === 4 && (
          <div className="bg-white rounded-2xl p-7" style={{ boxShadow: '0 6px 18px rgba(0,0,0,0.04)' }}>
            <PanelTitle icon="/wix/87fc13_83de975f116646a795c9db7ebdc3b4be~mv2.png">treatments</PanelTitle>
            <p className="mb-7" style={body14}>
              We use internationally renowned technologies to shape, tighten and refine your results &mdash; never cheap gadgets or outdated machines. Our treatments are not the whole plan, but they are powerful tools when used on top of a solid medical, diet and movement strategy. Every device we use is leading in its category, chosen for safety, research and real-world results.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {treatments.map((t) => (
                <div key={t.title}>
                  <div className="flex items-center gap-3 mb-3">
                    <img src={t.icon} alt="" style={{ width: '34px', height: '34px', objectFit: 'contain' }} />
                    <h4 style={{ color: GREEN, fontFamily: wideFont, fontWeight: 600, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' }}>{t.title}</h4>
                  </div>
                  <p className="mb-3" style={body14}>{t.intro}</p>
                  <p className="mb-2" style={body14}>We use it to:</p>
                  <ul className="space-y-1 mb-3">
                    {t.uses.map((u) => (
                      <li key={u} className="flex items-start gap-2" style={body14}>
                        <span style={{ color: '#AFA39D' }}>&bull;</span>
                        <span>{u}</span>
                      </li>
                    ))}
                  </ul>
                  {t.outro && <p style={body14}>{t.outro}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
