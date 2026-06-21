import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import HowItWorksTabs from './HowItWorksTabs';
import TestimonialsSlider from './TestimonialsSlider';
import BookConsultationButton from '@/components/BookConsultationButton';

export const metadata: Metadata = {
  title: "Medical Weight Loss Malta | Carisma Slimming",
  robots: { index: false, follow: true },
};

const FRESHA_BOOK =
  'https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2843963&eid=4994308&oiid=sv%3A25969858&share=true&pId=2708191';
const FRESHA_ANALYSIS =
  'https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2843963&eid=5009163&oiid=sv%3A25969858&share=true&pId=2708191';

const headingFont = 'Trajan Pro, serif';
const wideFont = 'Novecento Wide Book, sans-serif';
const bodyFont = 'Roboto, sans-serif';

// WCAG AA accessible brand palette (locked single source of truth).
// Bright brand sage #8EB093 (2.39:1 on white) is DECORATIVE ONLY; for any text/
// icon/accent/CTA we use the darkened sage variants that clear AA on white and
// on the page's tinted sage gradient panels.
const GREEN = '#456849'; // deep sage for serif HEADINGS (large >=24px). 6.31:1 white, >=3:1 on tinted panels
const TAUPE = '#5a5043'; // deep warm taupe for ALL body/secondary/bullet/footer text. 7.89:1 white, >=4.5:1 on #C9D8C1/#B7CBB2 panels
const CHECK = '#4f7256'; // brand-green-text: icons, accent eyebrows, checkmarks, ratings, CTA fill. 5.42:1 white
const BLUE = '#4f7256'; // CTA fill (was #6391AB — white text only 3.40:1, failed). Now 5.42:1 vs white text

function BlueCta({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="cta-glow inline-block text-center font-bold text-white"
      style={{ backgroundColor: BLUE, borderRadius: '999px', fontFamily: wideFont, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase', padding: '15px 36px' }}
    >
      {children} &rsaquo;
    </a>
  );
}

function CtaPair({ href, primaryLabel }: { href: string; primaryLabel: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
      <BlueCta href={href}>{primaryLabel}</BlueCta>
      <BookConsultationButton variant="outline" style={{ fontSize: '13px', padding: '14px 28px' }} />
    </div>
  );
}

export default function MedicalWeightLossLpPage() {
  const helpsWith = [
    'Appetite regulation and feeling full sooner',
    'Craving reduction and less “food noise”',
    'Better control and adherence to your plan',
    'Better blood sugar control & metabolic support',
  ];

  const doesNotDo = [
    'Build muscle or protect your metabolism on its own',
    'Teach eating habits or create a repeatable routine',
    'Fix emotional drivers or stress eating',
    'Create long-term identity change and maintenance',
  ];

  const structureBullets = [
    'Appetite regulation to quiet cravings and reduce food noise',
    'A repeatable eating structure you can follow on busy weeks',
    'Muscle protection to support metabolism as you lose fat',
    'Accountability and progression with tracking, check-ins, and adjustments',
    'A long-term plan for maintenance after the initial fat loss',
  ];

  const pressLogos = [
    { label: 'Malta Daily', src: '/wix/f940f0_8c40f03f50684bf8adc6d9ca0cb2be9e~mv2.jpg' },
    { label: '89.7 Bay', src: '/wix/f940f0_e6f0bd96c9d04debaa8d8b609cbf68e6~mv2.jpeg' },
    { label: 'Lovin Malta', src: '/wix/f940f0_8bd141199fea4275a1222b62f24f2d98~mv2.jpeg' },
    { label: 'Times of Malta', src: '/wix/f940f0_2120887ab6ef4957b02ff004e804beaf~mv2.png' },
    { label: 'Malta Today', src: '/wix/f940f0_0db6f1508426404eacea3b33b0e9112d~mv2.png' },
  ];

  const differentiators = [
    {
      icon: '/wix/87fc13_729173bc08764a74bee017b037d95d5b~mv2.png',
      title: 'Doctor-first, not medical option-first',
      body: 'We start with clinical suitability, not amount. Your consultation reviews history, risks, and goals, then sets clear expectations and a safe plan with ongoing medical oversight.',
    },
    {
      icon: '/wix/87fc13_82ddf84b6c664402b6d02dfacfa0d14f~mv2.png',
      title: 'APPETITE & METABOLIC SUPPORT',
      body: 'Clinically supervised medical weight loss program can quiet hunger and reduce food noise, making consistency easier. If you qualify, we titrate carefully, support side effects, and pair it with a repeatable eating structure',
    },
    {
      icon: '/wix/87fc13_a3a9f733a463406abf5b5177ef3aaa51~mv2.png',
      title: 'Body composition, not weight',
      body: 'We track what actually matters: fat loss while protecting lean mass. You see progress through body composition trends, measurements, and strength progression, not just a number on the scale.',
    },
    {
      icon: '/wix/87fc13_b4783b8ab4ad480fa01394e449f91d34~mv2.png',
      title: 'Programme, not theory',
      body: 'Results come from phases, milestones, and a defined maintenance plan. We guide you through a structured start, progress targets, and an exit strategy so you do not rebound when the initial fat loss ends.',
    },
  ];

  const suitableFor = ['BMI ≥27', 'Hormone resistence', 'Emotional eating or Long dieting history', 'Menopause-related weight gain'];
  const unsuitableFor = ['Eating disorders', 'Very lean patients', 'Those unwilling to attend check-ins', 'Currently pregnant or trying to conceive'];

  const differenceChecklist = [
    'Doctor led: full medical check and body scan',
    'One integrated program: medical, diet, movement and treatments together',
    'Real gym included: Technogym facility, semi-private classes and PT',
    'High touch support: weekly check ins, progress reports and WhatsApp follow up',
    'Evidence based devices: Emsculpt NEO, coolsculpting and RF skin tightening',
    'Selective entry and measurable weight loss results',
  ];

  const assuranceMust = [
    'Attend all scheduled in clinic sessions and weekly check ins',
    'Follow your personalised food plan consistently and tell us when you struggle',
    'Complete your agreed physical activities & discuss any pain or obstacles',
    'Use only the treatments and treatment support recommended by our medical team',
    'Inform us of any major health (e.g., heart disease) or treatment support changes',
    'Avoid crash diets, extreme restriction or outside weight loss treatments that could affect your results',
  ];

  const sideEffects = [
    { label: 'Nausea', text: 'slow personalised amount adjustments, protein-first meals, hydration and electrolytes, Comprehensive protocol instructions' },
    { label: 'Constipation', text: 'tolerance-based fibre targets, fluids, daily movement, magnesium support when appropriate' },
    { label: 'Diarrhoea', text: 'simple meal sequencing, trigger-food control, temporary serving stabilisation' },
    { label: 'Fatigue', text: 'minimum calorie floors, protein and micronutrient monitoring, strength habits to protect energy' },
    { label: 'Reflux', text: 'smaller structured portions, meal timing rules, behavioural guidance' },
  ];

  const corePillars = [
    {
      icon: '/wix/87fc13_387683ad0f4c499c8cab338b5f800aa0~mv2.png',
      title: 'MEDICAL ELIGIBILITY & ASSESSMENT',
      body: 'Every Medical weight loss journey begins with a full medical consultation to assess suitability, health history, and individual goals before any treatment is considered.',
    },
    {
      icon: '/wix/87fc13_9011dffd287245ed9d60f5663e21edba~mv2.png',
      title: 'APPETITE & METABOLIC SUPPORT',
      body: 'medical weight management program is used to support natural fullness signals and reduce food noise, helping make portion control and consistency feel more manageable.',
    },
    {
      icon: '/wix/87fc13_c4cf7001e0324fbd84551191d2a27bd1~mv2.png',
      title: 'SAFE, LONG-TERM APPROACH',
      body: 'This is not a crash diet or quick fix. Medical weight loss is always used as part of a wider lifestyle plan designed for sustainable, steady weight loss.',
    },
  ];

  const integrationBullets = [
    'Initial Medical Consultation & Eligibility Review',
    'Personalised Medical weight loss Treatment Planning',
    'Ongoing Medical Monitoring & Reviews',
    'Nutrition & Lifestyle Support Integration',
  ];

  const commitment = [
    'Visible inch loss and shape change, not vague promises',
    'Plans that work with your age, hormones and metabolism',
    'No crash diets, no banned foods, no endless hours of cardio',
    'Medical grade technology and treatments delivered by trained professionals',
  ];

  const whyCarisma = [
    'Created by the team behind Malta’s leading spa and medical aesthetics centres',
    'Doctor led medical slimming, not a beauty salon “diet program”',
    'All in one approach: assessment, nutrition, movement and treatments',
    'High tech support with weekly check ins and WhatsApp coaching',
  ];

  const collageTiles = [
    '/wix/87fc13_170da1f718f64c8b8e1a1a86083e1a72~mv2.png',
    '/wix/87fc13_59d15b41b3c1462788d0a0843b859d0b~mv2.png',
    '/wix/87fc13_73555ee869874f3c8a90fd5bb62d19e8~mv2.png',
    '/wix/87fc13_074438e081814932aa4c2fe6dc450e57~mv2.png',
  ];

  return (
    <div className="w-full" style={{ backgroundColor: '#ffffff' }}>
      {/* LP minimal header (this landing page does not use the global site header) */}
      <header className="bg-white">
        <div className="max-w-[980px] mx-auto px-4 flex items-center justify-between" style={{ height: '64px' }}>
          <img src="/wix/87fc13_7685319028a14ef0ace54298d2e74acb~mv2.png" alt="Group 1707481377.png" className="h-8 w-auto" />
          <a href="tel:+35627802062" className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: CHECK }}>
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span style={{ color: CHECK, fontFamily: wideFont, fontWeight: 700, fontSize: '13px', letterSpacing: '3px' }}>27802062</span>
          </a>
          <a
            href={FRESHA_BOOK}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-glow text-white uppercase tracking-wide"
            style={{ backgroundColor: CHECK, borderRadius: '999px', fontFamily: wideFont, fontWeight: 700, fontSize: '12px', padding: '10px 24px' }}
          >
            Book Now
          </a>
        </div>
      </header>

      {/* Hero — doctor-led medical weight loss */}
      <PageHero
        eyebrow="Ultimate weight loss protocol in Malta"
        headline={[
          { text: 'Medical Weight Loss in Malta' },
          { text: 'Lose Fat and Keep It Off', em: true },
        ]}
        sub="Clinician-guided weight loss — assessment, eligibility review, nutrition and weekly tracking — to help you lose fat safely and keep it off."
        bullets={[
          { label: 'Calmer appetite:', text: 'mimics natural fullness signals so smaller portions satisfy.' },
          { label: 'Doctor monitored:', text: 'assessment, body scan, safety checks and regular reviews.' },
          { label: 'Part of a full plan:', text: 'fits your nutrition, movement and treatment protocol.' },
        ]}
        primaryCta={{ text: 'Book Your Consultation', href: FRESHA_BOOK, external: true }}
        media={{ type: 'video', src: '/wix/87fc13_7d0ed658e1dd4900a3d0623abbbd161b_720p.mp4', poster: '/wix/87fc13_210696e48bd0461ba822880bd7082b56~mv2.png', alt: 'Medical weight loss programme in Malta' }}
        proof={{ rating: '4.9', reviews: '200+', awardSrc: '/wix/f940f0_c4008d16bc3245f7bc8663f5b60d7a82~mv2.png', awardText: '#1 voted clinic\nMalta 2025–26' }}
        compactHeadline
      />

      {/* The secret to a more defined, confident look — testimonial carousel */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center uppercase" style={{ color: GREEN, fontFamily: headingFont, fontWeight: 400, fontSize: '28px', letterSpacing: '2px', lineHeight: 1.5 }}>
            real women, real weight loss results<br />in Malta
          </h2>
          <div className="mx-auto mt-4" style={{ width: '170px', height: '1px', backgroundColor: '#B9A99E' }} />
        </div>
        <div className="mt-4">
          <TestimonialsSlider />
        </div>
      </section>

      {/* Clarity before you start */}
      <section className="py-24">
        <div className="mx-auto px-4 sm:px-0" style={{ maxWidth: '740px' }}>
          <p className="text-center uppercase" style={{ color: TAUPE, fontFamily: wideFont, fontSize: '15px', letterSpacing: '2px' }}>
            What are medical weight management program?
          </p>
          <div className="mx-auto mt-2 mb-6" style={{ width: '150px', height: '1px', backgroundColor: '#B9A99E' }} />
          <h2 className="text-center mb-8 uppercase" style={{ color: GREEN, fontFamily: headingFont, fontWeight: 400, fontSize: '28px', letterSpacing: '2px' }}>
            what medical weight loss can and cannot do
          </h2>
          <p className="mb-10" style={{ color: TAUPE, fontFamily: bodyFont, fontSize: '15px', lineHeight: 1.8 }}>
            <strong style={{ color: '#5a5043' }}>medical weight management programs</strong> are treatments that support weight loss by improving appetite regulation and satiety. They can make consistency easier, but they work best inside a structured, medically supervised programme.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="mb-6 uppercase" style={{ color: '#5a5043', fontFamily: wideFont, fontWeight: 600, fontSize: '13px', letterSpacing: '1px' }}>
                What Treatment support helps with:
              </h3>
              <ul className="space-y-4">
                {helpsWith.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <img src="/wix/87fc13_59346c1121b34e759ebf20eba3054c8c~mv2.png" alt="Group 1707479766.png" style={{ width: '20px', height: '20px', objectFit: 'contain', flexShrink: 0, marginTop: '1px' }} />
                    <span style={{ color: TAUPE, fontFamily: bodyFont, fontSize: '14px', lineHeight: 1.5 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-6 uppercase" style={{ color: '#5a5043', fontFamily: wideFont, fontWeight: 600, fontSize: '13px', letterSpacing: '1px' }}>
                What Treatment support does not do:
              </h3>
              <ul className="space-y-4">
                {doesNotDo.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <img src="/wix/87fc13_50f34e909595497794177a54bdb32314~mv2.png" alt="Group 1707481598.png" style={{ width: '20px', height: '20px', objectFit: 'contain', flexShrink: 0, marginTop: '1px' }} />
                    <span style={{ color: TAUPE, fontFamily: bodyFont, fontSize: '14px', lineHeight: 1.5 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-12 text-center mx-auto" style={{ color: TAUPE, fontFamily: bodyFont, fontSize: '15px', lineHeight: 1.8, maxWidth: '720px' }}>
            That&rsquo;s why we combine Medical weight loss support (if clinically appropriate) with nutrition structure, strength training habits, tracking, and a maintenance plan.
          </p>
        </div>
      </section>

      {/* Philosophy — we build the conditions for it to last */}
      <section className="py-16">
        <div className="mx-auto px-4 sm:px-0" style={{ maxWidth: '980px' }}>
          <div className="p-8 sm:p-10" style={{ background: 'linear-gradient(180deg, #D8E3D9 0%, #F8F6F2 100%)', borderRadius: '16px' }}>
            <h2 className="text-center mb-12 uppercase" style={{ color: GREEN, fontFamily: headingFont, fontWeight: 400, fontSize: '28px', letterSpacing: '2px', lineHeight: 1.6 }}>
              sustainable weight loss in Malta:<br />structure, not willpower
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-[362px_1fr] gap-12 items-center">
              <div className="w-full overflow-hidden" style={{ borderRadius: '16px', aspectRatio: '362 / 424', maxWidth: '362px' }}>
                <img src="/wix/87fc13_bb5a3aed956d422ab510f702f736643b~mv2.jpg" alt="CarismaSlim_Batch2-003.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <p className="mb-5" style={{ color: TAUPE, fontFamily: bodyFont, fontSize: '14px', lineHeight: 1.8 }}>
                  Weight gain isn&rsquo;t a failure of discipline &mdash; it&rsquo;s a complex medical and behavioural challenge shaped by biology, stress, habits, and modern life. Hunger, cravings, relationships with food, mental health, and time pressure all play a role. That&rsquo;s why treatment support alone isn&rsquo;t enough.
                </p>
                <p className="mb-4" style={{ color: TAUPE, fontFamily: bodyFont, fontSize: '14px', lineHeight: 1.8 }}>
                  At Carisma Slimming, we approach weight loss as a medical, lifestyle, and emotional process that needs structure, not willpower:
                </p>
                <ul className="space-y-2 mb-5">
                  {structureBullets.map((item) => (
                    <li key={item} className="flex items-start gap-3" style={{ color: TAUPE, fontFamily: bodyFont, fontSize: '14px', lineHeight: 1.6 }}>
                      <span style={{ color: CHECK, fontWeight: 700 }}>&bull;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mb-8" style={{ color: TAUPE, fontFamily: bodyFont, fontSize: '14px', lineHeight: 1.8 }}>
                  Treatment support can help reduce appetite. Long-term results come from structure, monitoring, and habits that fit real life.
                </p>
                <CtaPair href={FRESHA_ANALYSIS} primaryLabel="Get Your Free Body Analysis" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Press logos + four differentiators */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center uppercase" style={{ color: GREEN, fontFamily: headingFont, fontWeight: 400, fontSize: '28px', letterSpacing: '2px', lineHeight: 1.5 }}>
            malta&rsquo;s trusted clinic for<br />doctor led, medical weight loss
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-6 mt-10 mb-16">
            {pressLogos.map((logo) => (
              <div key={logo.label} className="flex items-center justify-center" style={{ height: '64px' }}>
                <img src={logo.src} alt={logo.label} style={{ maxHeight: logo.label === 'Lovin Malta' ? '64px' : '54px', width: 'auto', objectFit: 'contain' }} />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentiators.map((card) => (
              <div
                key={card.title}
                className="card p-8"
                style={{ background: 'linear-gradient(180deg, #F2F6EF 0%, #C9D8C1 100%)', borderRadius: '16px' }}
              >
                <img src={card.icon} alt="" style={{ width: 'auto', height: '66px', objectFit: 'contain', marginBottom: '20px' }} />
                <h3 className="mb-3 uppercase" style={{ color: TAUPE, fontFamily: wideFont, fontWeight: 600, fontSize: '15px', letterSpacing: '0.5px' }}>
                  {card.title}
                </h3>
                <p style={{ color: TAUPE, fontFamily: bodyFont, fontSize: '13px', lineHeight: 1.7 }}>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility criteria */}
      <section className="py-24">
        <div className="mx-auto px-4 sm:px-0" style={{ maxWidth: '740px' }}>
          <p className="text-center uppercase" style={{ color: TAUPE, fontFamily: wideFont, fontSize: '15px', letterSpacing: '2px' }}>
            eligibility criteria
          </p>
          <div className="mx-auto mt-2 mb-6" style={{ width: '130px', height: '1px', backgroundColor: '#B9A99E' }} />
          <h2 className="text-center mb-8 uppercase" style={{ color: GREEN, fontFamily: headingFont, fontWeight: 400, fontSize: '28px', letterSpacing: '3px' }}>
            who medical weight loss is right for
          </h2>
          <p className="mb-10" style={{ color: TAUPE, fontFamily: bodyFont, fontSize: '15px', lineHeight: 1.8 }}>
            medical weight management program can be powerful, but only when it&rsquo;s part of a structured, medically supervised programme. Eligibility is determined through a proper medical assessment including blood tests and food intolerence, safety screening, and clear protocols, so the plan is appropriate, monitored, and adjusted responsibly.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="mb-6 uppercase" style={{ color: '#5a5043', fontFamily: wideFont, fontWeight: 600, fontSize: '13px', letterSpacing: '1px' }}>
                suitable for:
              </h3>
              <ul className="space-y-4">
                {suitableFor.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <img src="/wix/87fc13_59346c1121b34e759ebf20eba3054c8c~mv2.png" alt="Group 1707479766.png" style={{ width: '20px', height: '20px', objectFit: 'contain', flexShrink: 0, marginTop: '1px' }} />
                    <span style={{ color: TAUPE, fontFamily: bodyFont, fontSize: '14px', lineHeight: 1.5 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-6 uppercase" style={{ color: '#5a5043', fontFamily: wideFont, fontWeight: 600, fontSize: '13px', letterSpacing: '1px' }}>
                unsuitable for:
              </h3>
              <ul className="space-y-4">
                {unsuitableFor.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <img src="/wix/87fc13_50f34e909595497794177a54bdb32314~mv2.png" alt="Group 1707481598.png" style={{ width: '20px', height: '20px', objectFit: 'contain', flexShrink: 0, marginTop: '1px' }} />
                    <span style={{ color: TAUPE, fontFamily: bodyFont, fontSize: '14px', lineHeight: 1.5 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <a
              href={FRESHA_BOOK}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-glow inline-block text-center font-bold text-white"
              style={{ backgroundColor: BLUE, borderRadius: '999px', fontFamily: wideFont, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase', padding: '16px 48px' }}
            >
              find out if you qualify
            </a>
            <BookConsultationButton variant="outline" style={{ fontSize: '13px', padding: '15px 32px' }} />
          </div>
        </div>
      </section>

      {/* The carisma difference — not another diet clinic (checklist card) */}
      <section
        className="py-24"
        style={{
          backgroundImage: 'url(/wix/87fc13_eed9276b67e74ae99994e6bab4bcd409~mv2.png)',
          backgroundSize: '2068px 1063px',
          backgroundPosition: 'calc(50% - 71px) 248px',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center uppercase" style={{ color: TAUPE, fontFamily: wideFont, fontSize: '15px', letterSpacing: '2px' }}>
            the carisma difference
          </p>
          <div className="mx-auto mt-2 mb-6" style={{ width: '150px', height: '1px', backgroundColor: '#B9A99E' }} />
          <h2 className="text-center mb-6 uppercase" style={{ color: GREEN, fontFamily: headingFont, fontWeight: 400, fontSize: '28px', letterSpacing: '2px', lineHeight: 1.5 }}>
            doctor-led weight loss in Malta:<br />not another diet clinic
          </h2>
          <p className="text-center mx-auto mb-12" style={{ color: TAUPE, fontFamily: bodyFont, fontSize: '15px', lineHeight: 1.7, maxWidth: '760px' }}>
            We&rsquo;re a doctor led transformation program that blends medical insight, sustainable nutrition, and modern body tech into one high touch system, so you don&rsquo;t just lose weight, you step into your strongest form.
          </p>
          <div className="mx-auto p-9" style={{ maxWidth: '470px', background: 'linear-gradient(135deg, #FCFCFA 0%, #D8E7D2 100%)', borderTopLeftRadius: '16px', borderTopRightRadius: '16px', borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px', boxShadow: '0 12px 32px rgba(0,0,0,0.06)' }}>
            <ul className="space-y-5">
              {differenceChecklist.map((t) => (
                <li key={t} className="flex items-start gap-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={CHECK} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '1px' }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="uppercase" style={{ color: TAUPE, fontFamily: wideFont, fontSize: '12px', letterSpacing: '0.5px', lineHeight: 1.5 }}>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How it works — 5-step tabs */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center uppercase" style={{ color: TAUPE, fontFamily: wideFont, fontSize: '16px', fontWeight: 600, letterSpacing: '4px' }}>
            how our medical weight loss programme works
          </h2>
          <div className="mx-auto mt-3 mb-10" style={{ width: '190px', height: '1px', backgroundColor: '#B9A99E' }} />
          <HowItWorksTabs />
        </div>
      </section>

      {/* Expert care — Dr Zaid Teebi */}
      <section className="py-24">
        <div className="mx-auto px-4 sm:px-0" style={{ maxWidth: '970px' }}>
          <p className="text-center uppercase" style={{ color: GREEN, fontFamily: wideFont, fontSize: '20px', letterSpacing: '2px' }}>
            expert care
          </p>
          <div className="mx-auto mt-2 mb-6" style={{ width: '110px', height: '1px', backgroundColor: '#B9A99E' }} />
          <div className="relative" style={{ width: 'fit-content', margin: '0 auto' }}>
            <h2 className="relative text-center mb-12 uppercase" style={{ color: GREEN, fontFamily: headingFont, fontWeight: 400, fontSize: '28px', letterSpacing: '3px', lineHeight: 1.3, zIndex: 1 }}>
              your doctor-led care team<br />in Malta
            </h2>
            <img
              src="/wix/87fc13_d170f070d1d64560b77dd6ce085f4221~mv2.png"
              alt=""
              className="absolute hidden md:block"
              style={{ width: '69px', height: '87px', objectFit: 'contain', left: 'calc(50% + 14px)', top: '-12px', zIndex: 0, pointerEvents: 'none' }}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[448px_1fr] gap-12 items-center">
            <div className="w-full overflow-hidden mx-auto" style={{ maxWidth: '448px', aspectRatio: '448 / 479', borderRadius: '16px', boxShadow: '0 16px 36px rgba(0,0,0,0.12)' }}>
              <img src="/wix/87fc13_130b2a48c11a4658bad12952342d1eb4~mv2.jpeg" alt="C8DFC042-B799-481E-82AD-DF24558C5019.jpeg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <h3 className="mb-4 uppercase" style={{ color: GREEN, fontFamily: wideFont, fontSize: '15px', letterSpacing: '1px' }}>Dr Zaid Teebi</h3>
              <p className="mb-5" style={{ color: TAUPE, fontFamily: bodyFont, fontSize: '15px', lineHeight: 1.7 }}>
                Dr. Zaid Teebi is a medical doctor at Carisma Slimming with over 15 years of clinical experience and an evidence-based focus on medical weight loss and metabolic health. A graduate of Imperial College London, he combines medical rigour with a calm, human approach.
              </p>
              <p className="mb-8" style={{ color: TAUPE, fontFamily: bodyFont, fontSize: '15px', lineHeight: 1.7 }}>
                His consultations are structured and personalised, with safety screening, clear expectations, and ongoing monitoring. Where clinically appropriate, he recommends Medical weight loss support as part of a wider programme that includes nutrition structure, habit-based strength training to protect metabolism, and a long-term maintenance plan.
              </p>
              <p className="mb-8" style={{ color: '#5a5043', fontFamily: '"Brush Script MT", "Segoe Script", cursive', fontStyle: 'italic', fontSize: '23px', lineHeight: 1.6 }}>
                &ldquo;Medical weight loss should never be guesswork. Every body tells a story, and our job is to turn it into a plan that lasts&rdquo; &mdash; Dr. Teebi
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
                <a
                  href={FRESHA_ANALYSIS}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-glow inline-block text-center font-bold text-white"
                  style={{ backgroundColor: CHECK, borderRadius: '999px', fontFamily: wideFont, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase', padding: '15px 36px' }}
                >
                  Get Your Free Body Analysis &rsaquo;
                </a>
                <BookConsultationButton variant="outline" style={{ fontSize: '13px', padding: '14px 28px' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results-driven approach — performance assurance */}
      <section className="py-24">
        <div className="mx-auto px-4 sm:px-0" style={{ maxWidth: '970px' }}>
          <p className="text-center uppercase" style={{ color: GREEN, fontFamily: wideFont, fontSize: '20px', letterSpacing: '2px' }}>
            our results-driven approach
          </p>
          <div className="mx-auto mt-2 mb-6" style={{ width: '200px', height: '1px', backgroundColor: '#B9A99E' }} />
          <h2 className="text-center mb-12 uppercase" style={{ color: GREEN, fontFamily: headingFont, fontWeight: 400, fontSize: '27px', letterSpacing: '3px', lineHeight: 1.5 }}>
            medically verified fat loss:<br />weekly tracking, measurable results
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div
              className="p-12 flex flex-col justify-center"
              style={{ background: 'linear-gradient(135deg, #F2F6EF 0%, #DCE7D5 100%)', borderRadius: '16px', minHeight: '240px' }}
            >
              <p className="uppercase" style={{ color: CHECK, fontFamily: headingFont, fontWeight: 400, fontSize: '22px', letterSpacing: '2px', lineHeight: 1.6 }}>
                Only weight loss clinic in Malta to offer a complete performance assurance*
              </p>
              <p className="mt-6 uppercase" style={{ color: TAUPE, fontFamily: wideFont, fontSize: '12px', letterSpacing: '1px' }}>
                Note: Results May Vary
              </p>
            </div>
            <div>
              <p className="mb-5" style={{ color: TAUPE, fontFamily: bodyFont, fontSize: '15px', lineHeight: 1.7 }}>
                We are selective about who joins our transformation programs. We only accept those we genuinely believe we can help reach their healthy weight.
              </p>
              <p className="mb-5" style={{ color: TAUPE, fontFamily: bodyFont, fontSize: '15px', lineHeight: 1.7 }}>
                If you qualify and complete your program and do not hit your target weight, we will extend your weight management program at no extra program fee to support your progress toward your goals.
              </p>
              <p className="mb-3" style={{ color: TAUPE, fontFamily: bodyFont, fontSize: '15px', lineHeight: 1.7 }}>
                *To ensure results remain measurable and medically valid, patients must:
              </p>
              <ul className="space-y-2">
                {assuranceMust.map((t) => (
                  <li key={t} className="flex items-start gap-2" style={{ color: TAUPE, fontFamily: bodyFont, fontSize: '14px', lineHeight: 1.6 }}>
                    <span style={{ color: '#5a5043' }}>&bull;</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Safety, side effects, and our system */}
      <section className="py-16">
        <div className="mx-auto px-4 sm:px-0" style={{ maxWidth: '1104px' }}>
          <div className="p-8 sm:py-12 sm:px-20" style={{ background: 'linear-gradient(180deg, #B7CBB2 0%, #F4F2EC 38%, #FFFFFF 100%)', borderRadius: '16px' }}>
            <h2 className="text-center uppercase" style={{ color: TAUPE, fontFamily: headingFont, fontWeight: 400, fontSize: '28px', letterSpacing: '2px', lineHeight: 1.5 }}>
              safety, side effects,<br />and our system
            </h2>
            <p className="mt-6 mb-10" style={{ color: '#4a4339', fontFamily: bodyFont, fontSize: '15px', lineHeight: 1.7 }}>
              Treatment may be considered after assessment Medical weight loss with strict screening, clear education, and ongoing monitoring. Most side effects are manageable when amount and nutrition are structured, and follow-ups are consistent.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_477px] gap-12">
              <div>
                <p className="mb-3" style={{ color: TAUPE, fontFamily: bodyFont, fontSize: '15px' }}>Common side effects and how we reduce them:</p>
                <ul className="space-y-2 mb-7">
                  {sideEffects.map((s) => (
                    <li key={s.label} className="flex items-start gap-2" style={{ color: TAUPE, fontFamily: bodyFont, fontSize: '14px', lineHeight: 1.6 }}>
                      <span style={{ color: '#5a5043' }}>&bull;</span>
                      <span>
                        <strong style={{ color: '#5a5043' }}>{s.label}:</strong> {s.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mb-8" style={{ color: TAUPE, fontFamily: bodyFont, fontSize: '14px', lineHeight: 1.7 }}>
                  <strong style={{ color: '#5a5043' }}>The biggest clinical mistake:</strong> clinical oversight Medical weight loss without a system. Treatment support can quiet appetite, but it does not build muscle, teach eating, fix emotional drivers, or create long-term habits. That&rsquo;s why we pair it with strength training, protein-first structure, behavioural coaching, accountability, and a maintenance plan.
                </p>
                <CtaPair href={FRESHA_ANALYSIS} primaryLabel="Get Your Free Body Analysis" />
              </div>
              <div className="flex flex-col gap-7">
                <div className="w-full overflow-hidden" style={{ aspectRatio: '477 / 270', borderRadius: '16px' }}>
                  <img src="/wix/87fc13_82a500af21e740baa567d0184bab958f~mv2.jpg" alt="ozempic-_edited.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="flex gap-4">
                  <div className="overflow-hidden" style={{ width: '38%', aspectRatio: '176 / 168', borderRadius: '16px' }}>
                    <img src="/wix/87fc13_d0cbf25ddb0e465ab3edebcddd7cb3e3~mv2.jpg" alt="CarismaSlim_Batch2-016.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div className="overflow-hidden" style={{ width: '62%', aspectRatio: '281 / 168', borderRadius: '16px' }}>
                    <img src="/wix/87fc13_47c25306549d4b6e9322f160244d03b6~mv2.png" alt="CarismaSlim_Batch2-002 1.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 core pillars of our methodology */}
      <section className="py-24">
        <div className="mx-auto px-4 sm:px-0" style={{ maxWidth: '980px' }}>
          <p className="text-center uppercase" style={{ color: TAUPE, fontFamily: wideFont, fontSize: '13px', letterSpacing: '2px' }}>
            4 core plllars of our methodology
          </p>
          <div className="mx-auto mt-2 mb-6" style={{ width: '210px', height: '1px', backgroundColor: '#B9A99E' }} />
          <h2 className="text-center mb-12 uppercase" style={{ color: GREEN, fontFamily: headingFont, fontWeight: 400, fontSize: '25px', letterSpacing: '2px', lineHeight: 1.5 }}>
            a doctor-led Medical weight loss<br />programme built to last
          </h2>
          <div style={{ background: 'linear-gradient(180deg, #E7EFE4 0%, #F4F6F1 100%)', borderRadius: '16px', padding: '28px' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card bg-white p-8 space-y-7" style={{ borderRadius: '16px' }}>
                {corePillars.map((f) => (
                  <div key={f.title} className="flex items-start gap-4">
                    <div className="flex items-center justify-center flex-shrink-0" style={{ width: '46px', height: '46px', borderRadius: '50%', border: '1px solid #e3ded6' }}>
                      <img src={f.icon} alt="" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                    </div>
                    <div>
                      <h3 className="mb-2 uppercase" style={{ color: GREEN, fontFamily: wideFont, fontSize: '14px', fontWeight: 600, letterSpacing: '0.5px' }}>{f.title}</h3>
                      <p style={{ color: TAUPE, fontFamily: bodyFont, fontSize: '14px', lineHeight: 1.6 }}>{f.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="card bg-white p-8" style={{ borderRadius: '16px' }}>
                {/* Live crops the top of CarismaSlim_Batch2-008 2.png (crop y_236 h_602 of 1194x1592) */}
                <div className="w-full overflow-hidden mb-6" style={{ aspectRatio: '1194 / 602', borderRadius: '16px' }}>
                  <img src="/wix/87fc13_8cc64ffa7b4345f0a20daba3955f4954~mv2.png" alt="CarismaSlim_Batch2-008 2.png" style={{ width: '100%', height: 'auto', display: 'block', marginTop: '-19.77%' }} />
                </div>
                <ul className="space-y-2 mb-6">
                  {integrationBullets.map((t) => (
                    <li key={t} className="flex items-start gap-3">
                      <img src="/wix/87fc13_59346c1121b34e759ebf20eba3054c8c~mv2.png" alt="Group 1707479766.png" style={{ width: '18px', height: '18px', objectFit: 'contain', flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ color: TAUPE, fontFamily: bodyFont, fontSize: '14px', lineHeight: 1.6 }}>{t}</span>
                    </li>
                  ))}
                </ul>
                <div className="mb-5 flex flex-col sm:flex-row gap-3 items-center">
                  <a
                    href={FRESHA_ANALYSIS}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-glow inline-block text-center font-bold text-white"
                    style={{ backgroundColor: BLUE, borderRadius: '999px', fontFamily: wideFont, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase', padding: '13px 28px' }}
                  >
                    Get Your Free Body Analysis &rsaquo;
                  </a>
                  <BookConsultationButton variant="outline" style={{ fontSize: '12px', padding: '12px 20px' }} />
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="flex items-center gap-1">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <img key={i} src="/wix/f940f0_b971086dc1d3458fb2622a9d95340fab~mv2.png" alt="star.png" style={{ width: '18px', height: '18px', objectFit: 'contain' }} />
                    ))}
                  </span>
                  <img src="/wix/f940f0_9f944ed58e3f4919bf87ef224beb4f94~mv2.png" alt="" style={{ width: '30px', height: '28px', objectFit: 'contain' }} />
                  <span className="uppercase" style={{ color: CHECK, fontFamily: wideFont, fontSize: '12px', fontWeight: 600, letterSpacing: '1px' }}>#1 Voted Clinic in Malta</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Malta's #1 leading wellness chain */}
      <section className="py-16">
        <div className="mx-auto px-4 sm:px-0" style={{ maxWidth: '980px' }}>
          <div className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #F4F7F2 0%, #E9EFE6 100%)', borderRadius: '16px', padding: '40px 33px' }}>
            {/* soft rose watermark behind the card content (live: f940f0_9f944ed5, 678x579) */}
            <img
              src="/wix/f940f0_9f944ed58e3f4919bf87ef224beb4f94~mv2.png"
              alt=""
              className="absolute"
              style={{ width: '678px', height: '579px', left: '50%', top: '37px', transform: 'translateX(-50%)', objectFit: 'fill', pointerEvents: 'none', zIndex: 0 }}
            />
            <div className="relative" style={{ zIndex: 1 }}>
              <p className="text-center mb-2 uppercase" style={{ color: TAUPE, fontFamily: wideFont, fontSize: '15px', fontWeight: 600, letterSpacing: '2px' }}>
                the carisma difference
              </p>
              <div className="mx-auto mb-6" style={{ width: '140px', height: '1px', backgroundColor: '#B9A99E' }} />
              <h2 className="text-center mb-12 uppercase" style={{ color: CHECK, fontFamily: headingFont, fontWeight: 400, fontSize: '26px', letterSpacing: '2px' }}>
                why Malta chooses Carisma for medical weight loss
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-[1fr_428px] gap-12 items-start">
                <div className="space-y-10">
                  <div>
                    <h3 className="mb-5 uppercase" style={{ color: TAUPE, fontFamily: wideFont, fontSize: '15px', fontWeight: 600, letterSpacing: '1px' }}>our commitment</h3>
                    <ul className="space-y-3">
                      {commitment.map((item) => (
                        <li key={item} className="flex items-start gap-2" style={{ color: '#5a5043', fontFamily: bodyFont, fontSize: '14px', lineHeight: 1.6 }}>
                          <span style={{ color: CHECK }}>&bull;</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="mb-5 uppercase" style={{ color: TAUPE, fontFamily: wideFont, fontSize: '15px', fontWeight: 600, letterSpacing: '1px' }}>WHY MALTA CHOOSES Carisma</h3>
                    <ul className="space-y-3">
                      {whyCarisma.map((item) => (
                        <li key={item} className="flex items-start gap-2" style={{ color: '#5a5043', fontFamily: bodyFont, fontSize: '14px', lineHeight: 1.6 }}>
                          <span style={{ color: CHECK }}>&bull;</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="w-full overflow-hidden" style={{ borderRadius: '16px', height: '359px' }}>
                  <iframe
                    title="Carisma Slimming clinic location in Malta"
                    src={`https://www.google.com/maps?q=${encodeURIComponent('Carisma Slimming, Malta')}&output=embed`}
                    width="100%"
                    height="359"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    style={{ border: 0, display: 'block' }}
                  />
                </div>
              </div>
              <div className="mt-12 flex flex-wrap items-center justify-between gap-6">
                <CtaPair href={FRESHA_ANALYSIS} primaryLabel="Get Your Free Body Analysis" />
                <div className="flex items-center gap-3">
                  <img src="/wix/87fc13_0426ba92e1fa4e9ebce44215146be031~mv2.png" alt="parking-sign (1).png" style={{ width: '30px', height: 'auto', objectFit: 'contain' }} />
                  <span className="uppercase" style={{ color: TAUPE, fontFamily: wideFont, fontSize: '13px', fontWeight: 600, letterSpacing: '1px' }}>
                    Complimentary on-site parking
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing — photo collage + contact + LP footer */}
      <section
        className="py-24"
        style={{
          backgroundImage: 'url(/wix/87fc13_eed9276b67e74ae99994e6bab4bcd409~mv2.png)',
          backgroundSize: '2068px 1063px',
          backgroundPosition: 'calc(50% + 27px) 217px',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-6 uppercase" style={{ color: GREEN, fontFamily: headingFont, fontWeight: 400, fontSize: '25px', letterSpacing: '2px' }}>
            start your medical weight loss transformation in Malta
          </h2>
          <p className="text-center mx-auto mb-12" style={{ color: TAUPE, fontFamily: bodyFont, fontSize: '14px', lineHeight: 1.7, maxWidth: '720px' }}>
            We&rsquo;re a doctor led transformation program that blends medical insight, sustainable nutrition, and modern body tech into one high touch system, so you don&rsquo;t just lose weight, you step into your strongest form.
          </p>

          <div className="mx-auto grid grid-cols-2" style={{ maxWidth: '572px', gap: '4px' }}>
            {collageTiles.map((src, i) => (
              <img key={src} src={src} alt={`${i + 1}g.png`} style={{ width: '100%', height: 'auto', display: 'block' }} />
            ))}
          </div>

          {/* contact */}
          <div className="mt-20 text-center">
            <p className="uppercase mb-6" style={{ color: GREEN, fontFamily: wideFont, fontSize: '14px', fontWeight: 600, letterSpacing: '4px' }}>
              contact
            </p>
            <div className="space-y-4">
              <p>
                <a href="tel:+35627802062" className="uppercase underline" style={{ color: TAUPE, fontFamily: wideFont, fontSize: '15px', letterSpacing: '2px' }}>
                  Tel: +356 27802062
                </a>
              </p>
              <p>
                <a href="mailto:info@carismaslimming.com" className="uppercase underline" style={{ color: TAUPE, fontFamily: wideFont, fontSize: '15px', letterSpacing: '2px' }}>
                  Email: info@carismaslimming.com
                </a>
              </p>
              <p>
                <a href="/privacy-policy" className="uppercase underline" style={{ color: TAUPE, fontFamily: wideFont, fontSize: '15px', letterSpacing: '2px' }}>
                  Privicy Policy
                </a>
              </p>
            </div>
          </div>

          {/* bottom strip */}
          <div className="mt-12 mx-auto overflow-hidden" style={{ borderRadius: '16px', maxWidth: '980px' }}>
            <img src="/wix/87fc13_940a68fd38fc42b88f55048f0dc395fd~mv2.png" alt="Frame 1707483099.png" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
        </div>
      </section>
    </div>
  );
}
