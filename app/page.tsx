import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ModalitiesCarousel from '@/components/ModalitiesCarousel';
import PageHero from '@/components/PageHero';
import StepTimeline from '@/components/StepTimeline';
import GradientField from '@/components/layers/GradientField';
import ResultsGuarantee from '@/components/results/ResultsGuarantee';
import MedicalGuaranteeSection from '@/components/MedicalGuaranteeSection';

export const metadata: Metadata = {
  title: "Carisma Slimming | Malta's #1 Weight-Loss Clinic",
  description: "Lose up to 1kg/week with Malta's most comprehensive slimming program. Fat freezing, body contouring & personalised meal plans from €199. Book your free consultation.",
  alternates: { canonical: "https://www.carismaslimming.com" },
  openGraph: {
    title: "Carisma Slimming | Malta's #1 Weight-Loss Clinic",
    description: "Lose up to 1kg/week with Malta's most comprehensive slimming program. Fat freezing, body contouring & personalised meal plans from €199. Book your free consultation.",
    url: 'https://www.carismaslimming.com',
    images: [{ url: '/background.avif', width: 1200, height: 630, alt: 'Carisma Slimming Malta' }],
  },
};

export default function Home() {

  const pillars: { subheading: string; title: string; icon: string; iconAlt: string; items: ReactNode[] }[] = [
    {
      subheading: 'Know your body before starting any program',
      title: 'Medical weight loss assessment',
      icon: '/wix/87fc13_e4efa875484546fca9d640d39b9f0100~mv2.png',
      iconAlt: 'Medical weight loss assessment',
      items: [
        'Tanita body composition analysis',
        'Doctor consultation for weight loss goals',
        <><Link href="/glp1" className="underline decoration-dotted underline-offset-2">GLP-1 support</Link> if appropriate (Ozempic, Mounjaro)</>,
        <><Link href="/packages/fat-dissolving" className="underline decoration-dotted underline-offset-2">Fat dissolving injections</Link> for stubborn areas</>,
        'Blood tests and metabolic screening',
      ],
    },
    {
      subheading: 'Doctor-prescribed meal plan with a buddy',
      title: 'Personalised nutrition and accountability',
      icon: '/wix/87fc13_d751907d21e84894ae37b1b33136d812~mv2.png',
      iconAlt: 'Doctor-prescribed meal plan',
      items: [
        'Meal plan that fits your routine, culture and goals',
        'Weekly weigh-ins to track your slimming progress',
        'One-to-one accountability with a weight loss coach',
        'Supplement support for metabolism and energy',
        'WhatsApp coaching between sessions',
      ],
    },
    {
      subheading: 'Realistic movement that fits your life',
      title: 'Exercise and movement program',
      icon: '/wix/87fc13_1fdf47007d8a45c18e39603447edbb23~mv2.png',
      iconAlt: 'Exercise and movement program',
      items: [
        'Open gym access at our Grand Hotel Excelsior',
        'Group classes for fat loss, strength and maintenance',
        'Personal training for guidance and motivation',
        'Customised workout plan for your level',
        'Flexible scheduling to fit your routine',
      ],
    },
    {
      subheading: 'Clinic-grade treatments that speed up change',
      title: 'Targeted body contouring treatments',
      icon: '/wix/87fc13_da70307b66154a24b141dfb4fd26a1bb~mv2.png',
      iconAlt: 'Body contouring treatments',
      items: [
        <><Link href="/packages/muscle-stimulation" className="underline decoration-dotted underline-offset-2">EMSculpt NEO</Link> — build muscle and reduce fat</>,
        <><Link href="/packages/fat-freezing" className="underline decoration-dotted underline-offset-2">CoolSculpting fat freezing</Link> — permanent fat reduction</>,
        <><Link href="/packages/skin-tightening" className="underline decoration-dotted underline-offset-2">VelaShape III</Link> — smooth and firm loose skin</>,
        <><Link href="/packages/lymphatic-drainage" className="underline decoration-dotted underline-offset-2">Lymphatic drainage</Link> to reduce fluid retention</>,
        'Non-invasive with no downtime required',
      ],
    },
  ];

  const commitmentItems: ReactNode[] = [
    'Visible inch loss and shape change through a medically supervised slimming program',
    'Weight loss plans that work with your age, hormones and metabolism',
    'No crash diets, no banned foods, no endless hours of cardio, just medical guidance and personalised meal plans',
    <>Medical-grade slimming treatments and <Link href="/packages/fat-freezing" className="underline decoration-dotted underline-offset-2">fat freezing technology</Link> delivered by trained professionals</>,
  ];

  const differenceItems: ReactNode[] = [
    "Created by the team behind Malta's leading spa and medical aesthetics centres",
    'Doctor-led medical weight loss and slimming, not a beauty salon diet program',
    <>All-in-one approach: medical assessment, personalised meal plans, movement and <Link href="/packages" className="underline decoration-dotted underline-offset-2">body contouring treatments</Link></>,
    'High-touch support with weekly check-ins, WhatsApp coaching and dedicated accountability',
  ];

  return (
    <div className="w-full">
      {/* Skip to main content — WCAG 2.4.1 */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded focus:bg-[#024C27] focus:text-white focus:font-bold focus:outline-none"
      >
        Skip to main content
      </a>

      <main id="main-content">
      {/* Hero Section — fit-to-viewport, arch media + floating proof */}
      <PageHero
        headline={[
          { text: 'Doctor-Led Slimming' },
          { text: '& Weight Loss in Malta', em: true },
        ]}
        sub="Lose up to 1kg a week with Malta's most comprehensive slimming program, combining medical weight loss, body contouring & personalised meal plans in one doctor-led plan."
        bullets={[
          { text: 'Medical weight loss assessment with prescription GLP-1 support if appropriate' },
          { text: 'Personalised meal plan with weekly check-ins to keep you consistent' },
          { text: 'In-clinic slimming treatments to burn fat, tone muscles, and tighten skin' },
          { text: 'Habit-based strength training to lose weight and protect long-term health' },
        ]}
        primaryCta={{ text: 'Get Your Free Body Analysis', href: 'https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2843963&eid=5009163&oiid=sv%3A25969858&share=true&pId=2708191', external: true }}
        secondaryCta={{ text: 'Take the quiz', href: '#quiz' }}
        media={{ type: 'video', src: '/IVana.mp4', poster: '/Thumbnail.webp', alt: 'Carisma Slimming doctor-led weight loss in Malta' }}
        proof={{ rating: '4.9', reviews: '800+', awardSrc: '/Malta.png', awardText: '#1 voted clinic\nMalta 2025–26' }}
        compactHeadline
        motif
      />

      {/* (2) 4 Core Pillars of Our Weight Loss Methodology */}
      <section aria-labelledby="pillars-heading" style={{ backgroundColor: '#ffffff', paddingTop: 'clamp(40px, 8vw, 96px)', paddingBottom: 'clamp(12px, 3vw, 48px)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center mb-2" aria-hidden="true" style={{ color: '#6f6456', fontFamily: 'Novecento Wide Book, sans-serif', fontWeight: '400', fontSize: '16px', letterSpacing: '3.2px', textTransform: 'uppercase' }}>
            4 core pillars of our weight loss methodology
          </p>
          <div className="mx-auto mb-4" aria-hidden="true" style={{ width: '90px', height: '1px', backgroundColor: '#C9B8AE' }} />
          <h2 id="pillars-heading" className="text-center mb-12" style={{ color: '#4f7256', fontFamily: 'Trajan Pro, serif', fontWeight: '400', fontSize: '25px', lineHeight: '1.3', textTransform: 'uppercase' }}>
            malta&rsquo;s only multidisciplinary<br />slimming &amp; weight-loss approach
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: '28px' }} role="list">
            {pillars.map((pillar) => (
              <div key={pillar.title} role="listitem" style={{ padding: '28px 24px', background: 'linear-gradient(180deg, #F2F6EF 0%, #C9D8C1 100%)', borderTopLeftRadius: '18px', borderTopRightRadius: '90px', borderBottomLeftRadius: '90px', borderBottomRightRadius: '18px', boxShadow: '0 10px 30px rgba(0,0,0,0.06)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div className="mb-5 flex items-center" style={{ height: '52px', flexShrink: 0 }}>
                  <Image
                    src={pillar.icon}
                    alt={pillar.iconAlt}
                    width={48}
                    height={48}
                    style={{ maxHeight: '48px', width: 'auto', objectFit: 'contain' }}
                  />
                </div>
                <h3 className="mb-2" style={{ color: '#3c5a40', fontFamily: 'Novecento Wide Book, sans-serif', fontSize: '13px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', lineHeight: '1.5', wordBreak: 'break-word' }}>
                  {pillar.title}
                </h3>
                <p className="mb-4" style={{ color: '#5a4f43', fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400', lineHeight: '1.6', borderBottom: '1px solid rgba(60,90,64,0.12)', paddingBottom: '14px' }}>
                  {pillar.subheading}
                </p>
                <ul className="space-y-3" style={{ flex: 1 }}>
                  {pillar.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2" style={{ color: '#5a4f43', fontFamily: 'Roboto, sans-serif', fontSize: '13px', lineHeight: '1.55', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3c5a40" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* (3) Our Treatments — full-card carousel with arrows */}
      <section aria-labelledby="modalities-heading" style={{ backgroundColor: '#ffffff', paddingTop: 'clamp(12px, 3vw, 48px)', paddingBottom: 'clamp(12px, 3vw, 48px)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p aria-hidden="true" style={{ color: '#4f7256', fontFamily: 'Novecento Wide Book, sans-serif', fontSize: '12px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '14px' }}>
            Our Treatments
          </p>
          <div aria-hidden="true" style={{ width: '64px', height: '1px', background: '#4f7256', margin: '0 auto 18px' }} />
          <h2 id="modalities-heading" style={{ fontFamily: 'Trajan Pro, serif', color: '#3c5a40', fontWeight: 400, fontSize: 'clamp(24px,3.4vw,34px)', lineHeight: 1.25, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '14px' }}>
            Our Weight Loss &amp; Body Contouring Treatments in Malta
          </h2>
          <p style={{ fontFamily: 'Roboto, sans-serif', color: '#595959', fontSize: '16px', lineHeight: 1.6, maxWidth: '620px', margin: '0 auto' }}>
            Six evidence-led modalities, combined into one doctor-led plan — chosen for your body, never one-size-fits-all.
          </p>
        </div>
        <ModalitiesCarousel />
      </section>

      {/* (4) Our Results Guarantee — "The Carisma Pact" + ambient 3D silk */}
      <ResultsGuarantee />

      {/* (5) Medical Weight Loss in Malta (GLP-1) — fades in from white, deepens to sage
          at midpoint, then fades back to white — no hard edge on either boundary. */}
      <section aria-labelledby="glp1-heading" style={{ paddingTop: 'clamp(12px, 3vw, 48px)', paddingBottom: 'clamp(32px, 5vw, 64px)', background: 'linear-gradient(180deg, #ffffff 0%, #D7E2D8 48%, #ffffff 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Eyebrow + heading */}
          <div className="text-center mb-14">
            <p aria-hidden="true" style={{ color: '#4f7256', fontFamily: 'Novecento Wide Book, sans-serif', fontSize: '12px', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '14px' }}>
              Medical Weight Loss · GLP-1 Program
            </p>
            <div className="mx-auto mb-5" aria-hidden="true" style={{ width: '64px', height: '1px', backgroundColor: '#4f7256' }} />
            <h2 id="glp1-heading" style={{ color: '#024C27', fontFamily: 'Trajan Pro, serif', fontWeight: '400', fontSize: '38px', lineHeight: '1.25', letterSpacing: '2px', textTransform: 'uppercase' }}>
How GLP-1 Works<br />at Our Clinic
            </h2>
          </div>
          {/* Intro */}
          <p className="text-center mx-auto mb-4" style={{ maxWidth: '680px', color: '#6f6456', fontFamily: 'Roboto, sans-serif', fontSize: '15px', lineHeight: '1.7' }}>
            <Link href="/glp1" className="underline decoration-dotted underline-offset-2">GLP-1s like Ozempic and Mounjaro</Link> quiet your appetite and food noise, so eating less stops feeling like a daily fight. But the results only last inside a structured, doctor-led plan — here&rsquo;s how it works.
          </p>
          <p className="text-center mx-auto mb-12" style={{ maxWidth: '620px', color: '#4f7256', fontFamily: 'Novecento Wide Book, sans-serif', fontSize: '13px', lineHeight: '1.6', textTransform: 'uppercase', letterSpacing: '1px' }}>
            One tool inside your program — never a shortcut, only if it&rsquo;s right for you.
          </p>

          {/* Vertical step timeline */}
          <StepTimeline
            steps={[
              { title: 'Medical Assessment', desc: "A doctor consultation, body scan and bloods to pinpoint what's driving your weight — and whether GLP-1 is right for you." },
              { title: 'Your Personalised Plan', desc: 'If you qualify, your prescription is built into a full plan: nutrition, movement and weekly check-ins. Never medication alone.' },
              { title: 'Doctor-Led Support', desc: 'We track your progress, fine-tune your dose and manage any side effects — so results keep coming, safely.' },
              { title: 'Lasting Results', desc: "We plan for life after GLP-1 so the weight stays off. And if it's not right for you, we'll guide you to what is." },
            ]}
          />

          {/* Pull-quote */}
          <div className="mx-auto mt-16" style={{ maxWidth: '620px', paddingLeft: '24px' }}>
            <blockquote style={{ borderLeft: '3px solid #4f7256', paddingLeft: '20px' }}>
              <p style={{ color: '#4f7256', fontFamily: 'Trajan Pro, serif', fontSize: '15px', lineHeight: '1.65', fontStyle: 'italic', letterSpacing: '0.3px', margin: 0 }}>
                To protect quality of care, our guaranteed weight loss transformation programs are limited to a small number of clients each month. Check if you qualify.
              </p>
            </blockquote>
          </div>

          {/* CTA */}
          <div className="text-center mt-10">
            <a
              href="/consultation"
              className="cta-glow"
              style={{ fontFamily: 'Novecento Wide Book, sans-serif', fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase', padding: '15px 44px', display: 'inline-block', fontWeight: 700, color: '#ffffff', textDecoration: 'none' }}
              aria-label="Book your free body analysis"
            >
              Book Your Free Body Analysis
            </a>
          </div>
        </div>
      </section>

      {/* Our Promise — "Up to 1kg/week" medical guarantee (shared component, identical sitewide) */}
      <MedicalGuaranteeSection />

      {/* (6) The Carisma Difference */}
      <section className="py-24" aria-labelledby="difference-heading" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative" style={{ background: 'linear-gradient(192deg, #F8F6F2 44.74%, rgba(142, 176, 147, 0.4) 100%)', borderRadius: '16px', padding: '40px 40px 48px', overflow: 'hidden' }}>
            {/* Decorative background watermark (purely presentational) */}
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
              <h2 id="difference-heading" className="text-center mb-12" style={{ color: '#3c5a40', fontFamily: 'Trajan Pro, serif', fontWeight: '400', fontSize: '25px', lineHeight: '35px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                why malta chooses carisma slimming
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
                {/* Left - commitments */}
                <div className="space-y-12">
                  <div>
                    <h3 className="mb-6" style={{ color: '#000000', fontFamily: 'Novecento Wide Book, sans-serif', fontSize: '15px', fontWeight: '400', letterSpacing: '1px', textTransform: 'uppercase' }}>
                      Our Doctor-Led Slimming Commitment
                    </h3>
                    <ul className="space-y-4">
                      {commitmentItems.map((item, idx) => (
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
                      What Makes Our Weight Loss Clinic Different
                    </h3>
                    <ul className="space-y-4">
                      {differenceItems.map((item, idx) => (
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
                  {/* CTA */}
                  <div>
                    <a
                      href="/consultation"
                      className="cta-glow inline-flex items-center justify-center font-bold text-white transition-all duration-200 ease-in-out hover:opacity-90 active:scale-95"
                      style={{ fontFamily: 'Novecento Wide Book, sans-serif', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', minHeight: '48px', padding: '0 32px' }}
                      aria-label="Book your free body analysis"
                    >
                      Book Your Free Body Analysis
                    </a>
                  </div>
                </div>
                {/* Right - map + parking pill */}
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
                  {/* Parking pill */}
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


      </main>
    </div>
  );
}
