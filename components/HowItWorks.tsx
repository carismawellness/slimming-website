'use client';

import { useState } from 'react';

const headingFont = 'Trajan Pro, serif';
const wideFont = 'Novecento Wide Book, sans-serif';
const bodyFont = 'Roboto, sans-serif';
const greenText = '#4f7256'; // --brand-green-text: accessible sage for text/icons/borders on white (5.42:1)
const greenDark = '#4f7256'; // accessible deep sage for step numbers / active tab text (5.42:1)
const taupe = '#595959'; // --text-light: accessible neutral for body/secondary text (7.00:1 on white)
const taupeLight = '#595959'; // --text-light: accessible inactive tab text (7.00:1)
const panelGradient = 'linear-gradient(135deg, #FCFCFA, #D8E7D2)';
const pStyle = { color: taupe, fontFamily: bodyFont, fontSize: '15px', lineHeight: 1.7 };
const liStyle = { color: taupe, fontFamily: bodyFont, fontSize: '15px', lineHeight: 1.6 };
const bullet = { color: greenText, fontWeight: 700 as const, flexShrink: 0 as const };

export default function HowItWorks() {
  const consultationSteps = [
    'Go through your goals, your reasons for wanting to lose weight, and your timeline',
    'Review your health history, medications, blood tests, and past diets',
    'Assess your current capacity for nutrition changes, movement, and clinic visits',
    'Share real before-and-after cases that match your age, body type, and situation',
    'Explain exactly how our weight loss guarantee works and what support you receive',
    'Tell you honestly whether you are a good candidate for medical weight loss',
  ];

  const suitableFor = [
    'You are 28–60 with 5–20 kg to lose',
    'Your body has changed with age, hormones or menopause',
    'You want a doctor-supervised approach with Ozempic or Mounjaro, not another fad diet',
    'You want to lose weight while still eating real food',
    'You are willing to follow a clear plan with weekly check-ins',
    'You are ready to invest time, energy and budget into your health',
    'Committed to attend all scheduled appointments and sessions',
  ];

  const notSuitableFor = [
    'You are pregnant, or breastfeeding',
    'You want a rapid, extreme "crash diet" style solution',
    'You are not willing to follow a structured weight loss plan',
    'You cannot commit to weekly check-ins or scheduled appointments',
    'You want results without changing routines, eating habits, or lifestyle',
    'You are currently managing an unmanaged medical condition or on medication requiring clearance (we screen this in your consultation)',
  ];

  const [active, setActive] = useState(0);
  const tabs = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'];
  const colHead = { fontFamily: wideFont, fontSize: '15px', fontWeight: 600 as const, letterSpacing: '1px', textTransform: 'uppercase' as const };

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center mb-2" style={{ color: taupe, fontFamily: wideFont, fontSize: '13px', letterSpacing: '3px', textTransform: 'uppercase' }}>
          How our GLP-1 medical weight loss programme works — step by step
        </h2>
        <div className="mx-auto mb-10" style={{ width: '110px', height: '1px', backgroundColor: '#cdd8c8' }} />

        {/* Step tabs */}
        <div className="flex" style={{ borderBottom: '1px solid #e3ded6' }}>
          {tabs.map((t, i) => (
            <button
              key={t}
              onClick={() => setActive(i)}
              className="flex-1 pb-4 text-center transition-colors"
              aria-pressed={active === i}
              style={{ color: active === i ? greenDark : taupeLight, fontWeight: active === i ? 700 : 400, fontFamily: wideFont, fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase', borderBottom: active === i ? `2px solid ${greenText}` : '2px solid transparent', marginBottom: '-1px', background: 'transparent', cursor: 'pointer' }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div style={{ background: panelGradient, borderBottomLeftRadius: '24px', borderBottomRightRadius: '24px', padding: '32px' }}>
          {active === 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Consultation */}
              <div className="bg-white rounded-xl p-7">
                <div className="flex items-center gap-3 mb-5">
                  <img src="/wix/87fc13_d2a17b8db6de4c8c8c41219e3a2c99cb~mv2.png" alt="" style={{ height: '44px', width: 'auto', objectFit: 'contain' }} />
                  <h3 style={{ ...colHead, color: greenText }}>Your medical weight loss consultation</h3>
                </div>
                <p className="mb-5" style={pStyle}>
                  Every program starts with a full in-clinic consultation. This is where we decide together if our doctor-led weight loss protocol is the right fit for you. Because we stand behind your results, we are selective about who we accept.
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
                  If we do not believe we can deliver real, measurable change, we will not enrol you. If we do accept you, it is because we are prepared to stand behind your results.
                </p>
              </div>
              {/* Suitable / Not suitable */}
              <div className="bg-white rounded-xl p-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-5">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={greenText} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label="Suitable"><polyline points="20 6 9 17 4 12" /></svg>
                    <h3 style={{ ...colHead, fontSize: '14px', color: taupe }}>Suitable for</h3>
                  </div>
                  <ul className="space-y-3">
                    {suitableFor.map((t) => (
                      <li key={t} className="flex items-start gap-2" style={{ ...liStyle, fontSize: '14px' }}>
                        <span style={bullet}>&bull;</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="sm:pl-6" style={{ borderLeft: '1px solid #e3ded6' }}>
                  <div className="flex items-center gap-2 mb-5">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#595959" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label="Not suitable"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    <h3 style={{ ...colHead, fontSize: '14px', color: taupe }}>Not suitable for</h3>
                  </div>
                  <ul className="space-y-3">
                    {notSuitableFor.map((t) => (
                      <li key={t} className="flex items-start gap-2" style={{ ...liStyle, fontSize: '14px' }}>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white rounded-xl p-7">
              <div>
                <h3 className="mb-4" style={{ ...colHead, color: greenText }}>Body analysis &amp; medical consultation</h3>
                <p className="mb-4" style={pStyle}>
                  Before we touch your food or training, we understand your body. Where appropriate you meet a doctor to review your health, hormones, history and medications, then sit with a consultant for clinical measurements and a body-composition scan — fat, muscle, visceral fat and water, not just a number on the scale.
                </p>
                <ul className="space-y-2">
                  {['Bloodwork for thyroid, blood sugar and cholesterol', 'Food-intolerance screening where symptoms point to it', 'Blood pressure and other checks to keep your plan safe'].map((t) => (
                    <li key={t} className="flex items-start gap-2" style={liStyle}><span style={bullet}>&bull;</span><span>{t}</span></li>
                  ))}
                </ul>
                <p className="mt-4" style={pStyle}>This also establishes whether a GLP-1 medication (Ozempic or Mounjaro) is clinically appropriate.</p>
              </div>
              <div className="w-full overflow-hidden rounded-xl" style={{ aspectRatio: '375 / 350' }}>
                <img src="/wix/87fc13_aea394ce5ab4485e8613221fa3617b8f~mv2.png" alt="Body composition analysis at Carisma" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          )}

          {active === 2 && (
            <div className="bg-white rounded-xl p-7">
              <h3 className="mb-4" style={{ ...colHead, color: greenText }}>Diet &amp; accountability</h3>
              <p style={pStyle}>
                A personalised meal plan built around your routine and Maltese food — not a template. You get weekly weigh-ins and measurements, one-to-one coaching with a dedicated consultant, supplement guidance and WhatsApp support between sessions, so the plan survives a real, busy week.
              </p>
            </div>
          )}

          {active === 3 && (
            <div className="bg-white rounded-xl p-7">
              <h3 className="mb-4" style={{ ...colHead, color: greenText }}>Movement that fits your life</h3>
              <p style={pStyle}>
                Realistic training, never punishment. Open gym access for independent sessions, small-group classes for fat loss and strength, and personal training for guidance and momentum — all designed to protect muscle while you lose fat.
              </p>
            </div>
          )}

          {active === 4 && (
            <div className="bg-white rounded-xl p-7">
              <h3 className="mb-4" style={{ ...colHead, color: greenText }}>Targeted treatments</h3>
              <p style={pStyle}>
                Medical-grade body contouring used to accelerate and refine your results: muscle stimulation (Emsculpt NEO), fat freezing (CoolSculpting), radiofrequency skin tightening (VelaShape) and lymphatic drainage — non-invasive, with no downtime.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
