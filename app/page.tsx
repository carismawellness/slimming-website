import Link from 'next/link';
import GoogleReviews from '@/components/GoogleReviews';
import ModalitiesCarousel from '@/components/ModalitiesCarousel';

export default function Home() {

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative mx-auto" style={{ minHeight: '700px', paddingTop: '40px', paddingBottom: '40px', backgroundImage: 'url(/background.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'scroll', borderRadius: '30px', overflow: 'hidden', maxWidth: '1340px', marginLeft: 'auto', marginRight: 'auto', marginTop: '0px', marginBottom: '36px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" style={{ maxWidth: '1052px' }}>
          <div className="grid grid-cols-1 md:grid-cols-[523px_minmax(0,1fr)] gap-12 items-stretch">
            {/* Left Content */}
            <div>
              <h1 className="mb-6 leading-tight pb-6 border-b" style={{ color: '#8EB093', fontFamily: 'Trajan Pro, serif', fontWeight: '400', fontSize: '28px', borderColor: '#e0e0e0', lineHeight: '1.4' }}>
                DOCTOR-LED SLIMMING<br />& WEIGHT LOSS IN MALTA
              </h1>

              <p className="mb-6" style={{ color: '#AFA39D', fontFamily: 'Novecento Wide Book, sans-serif', fontSize: '15px' }}>
                <span style={{ fontWeight: '600', color: '#9B8D83' }}>LOSE UP TO 1KG A WEEK</span>
                <span style={{ fontWeight: '250' }}> WITH MALTA'S MOST COMPREHENSIVE SLIMMING PROGRAM, COMBINING </span>
                <span style={{ fontWeight: '600', color: '#9B8D83' }}>MEDICAL WEIGHT LOSS, BODY CONTOURING & PERSONALISED MEAL PLANS</span>
                <span style={{ fontWeight: '250' }}> IN ONE DOCTOR-LED PLAN</span>
              </p>

              <ul className="space-y-2 mb-8">
                <li className="flex items-center gap-1" style={{ color: '#9B8D83', fontFamily: 'Roboto, sans-serif', fontWeight: '400', fontSize: '14px' }}>
                  <span style={{ color: '#9B8D83', fontSize: '18px', lineHeight: '1' }}>•</span>
                  <span>Medical weight loss assessment with prescription GLP-1 support if appropriate</span>
                </li>
                <li className="flex items-center gap-1" style={{ color: '#9B8D83', fontFamily: 'Roboto, sans-serif', fontWeight: '400', fontSize: '14px' }}>
                  <span style={{ color: '#9B8D83', fontSize: '18px', lineHeight: '1' }}>•</span>
                  <span>Personalised meal plan with weekly check-ins to keep you consistent</span>
                </li>
                <li className="flex items-center gap-1" style={{ color: '#9B8D83', fontFamily: 'Roboto, sans-serif', fontWeight: '400', fontSize: '14px' }}>
                  <span style={{ color: '#9B8D83', fontSize: '18px', lineHeight: '1' }}>•</span>
                  <span>In-clinic slimming treatments to burn fat, tone muscles, and tighten skin</span>
                </li>
                <li className="flex items-center gap-1" style={{ color: '#9B8D83', fontFamily: 'Roboto, sans-serif', fontWeight: '400', fontSize: '14px' }}>
                  <span style={{ color: '#9B8D83', fontSize: '18px', lineHeight: '1' }}>•</span>
                  <span>Habit-based strength training to lose weight and protect long-term health</span>
                </li>
              </ul>

              <h2 className="text-xl mb-6" style={{ color: '#8EB093', fontSize: '15px', fontWeight: '500', letterSpacing: '0.5px' }}>
                FIND YOUR PERFECT SLIMMING PLAN
              </h2>
              <div style={{ borderRadius: '8px', overflow: 'hidden' }}>
                <iframe
                  src="https://quiz-slimming.vercel.app"
                  style={{ width: '100%', height: '620px', border: 'none', borderRadius: '8px' }}
                  title="Slimming Quiz"
                />
              </div>
            </div>

            {/* Right Side - Image and Badge */}
            <div className="flex flex-col gap-2 relative">
              {/* Video Container */}
              <div className="relative z-10 mx-auto" style={{ width: '350px' }}>
                <div
                  className="shadow-xl overflow-hidden relative"
                  style={{
                    borderTopLeftRadius: '72px',
                    borderTopRightRadius: '12px',
                    borderBottomLeftRadius: '12px',
                    borderBottomRightRadius: '72px',
                    aspectRatio: '3 / 4'
                  }}
                >
                  <video
                    className="w-full h-full"
                    style={{ objectFit: 'cover', objectPosition: 'center', display: 'block', backgroundColor: '#000' }}
                    controls
                    poster="/Thumbnail.png"
                  >
                    <source src="/IVana.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>

              {/* Review Section */}
              <div className="flex flex-col gap-3 z-10">
                {/* Malta Award */}
                <div className="flex items-center justify-center gap-4">
                  <img src="/Malta.png" alt="Malta Award" style={{ height: '70px', width: 'auto', flexShrink: 0 }} />
                  <div>
                    <p style={{ color: '#8EB093', fontSize: '13px', fontWeight: '600', lineHeight: '1.3' }}>
                      #1 VOTED CLINIC<br />IN MALTA 2025-2026
                    </p>
                  </div>
                </div>

                {/* Google Review — image already contains G + stars + "Over 200+ Reviews" */}
                <div className="flex items-center justify-center gap-2">
                  <img src="/Google review.png" alt="Google Review — Over 200+ Reviews" style={{ height: '32px', width: 'auto', flexShrink: 0 }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* (1) Media / Press Strip */}
      <section className="py-10" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center mb-2" style={{ color: '#9B8D83', fontFamily: 'Novecento Wide Book, sans-serif', fontSize: '15px', fontWeight: '400', textTransform: 'uppercase' }}>
            As seen on
          </p>
          <div className="mx-auto mb-6" style={{ width: '90px', height: '1px', backgroundColor: '#C9B8AE' }} />
          <div className="flex flex-wrap items-center justify-center" style={{ gap: '20px' }}>
            {[
              { label: 'Malta Today logo', src: '/wix/f940f0_8c40f03f50684bf8adc6d9ca0cb2be9e~mv2.jpg', height: '31px' },
              { label: 'Bay Radio Malta logo', src: '/wix/f940f0_e6f0bd96c9d04debaa8d8b609cbf68e6~mv2.jpeg', height: '31px' },
              { label: 'Lovin Malta logo', src: '/wix/f940f0_8bd141199fea4275a1222b62f24f2d98~mv2.jpeg', height: '37px' },
              { label: 'Times of Malta logo', src: '/wix/f940f0_2120887ab6ef4957b02ff004e804beaf~mv2.png', height: '31px' },
              { label: 'MT Today logo', src: '/wix/f940f0_0db6f1508426404eacea3b33b0e9112d~mv2.png', height: '31px' },
            ].map((logo) => (
              <img
                key={logo.label}
                src={logo.src}
                alt={`${logo.label} — Carisma Slimming featured`}
                style={{ height: logo.height, width: 'auto', objectFit: 'contain' }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* (2) 4 Core Pillars of Our Weight Loss Methodology */}
      <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '1007px' }}>
          <h4 className="text-center mb-2" style={{ color: '#9B8D83', fontFamily: 'Novecento Wide Book, sans-serif', fontWeight: '400', fontSize: '16px', letterSpacing: '3.2px', textTransform: 'uppercase' }}>
            4 core pillars of our weight loss methodology
          </h4>
          <div className="mx-auto mb-4" style={{ width: '90px', height: '1px', backgroundColor: '#C9B8AE' }} />
          <h2 className="text-center mb-12" style={{ color: '#8EB093', fontFamily: 'Trajan Pro, serif', fontWeight: '400', fontSize: '25px', lineHeight: '1.3', textTransform: 'uppercase' }}>
            malta&rsquo;s only multidisciplinary<br />approach to slimming &amp; weight-loss
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: '21px' }}>
            {[
              {
                subheading: 'Know your body before starting any program',
                // [sic] live site renders "assessmen" without the final "t" — kept for pixel fidelity
                title: 'Medical weight loss assessmen',
                icon: '/wix/87fc13_e4efa875484546fca9d640d39b9f0100~mv2.png',
                iconAlt: 'Medical weight loss assessment icon',
                items: [
                  'Tanita body composition analysis',
                  'Doctor consultation for weight loss goals',
                  'GLP-1 support if appropriate (Ozempic, Mounjaro)',
                  'Fat dissolving injections for stubborn areas',
                  'Blood tests and metabolic screening',
                ],
              },
              {
                subheading: 'Doctor-prescribed meal plan with a buddy',
                title: 'Personalised nutrition and accountability',
                icon: '/wix/87fc13_d751907d21e84894ae37b1b33136d812~mv2.png',
                iconAlt: 'Doctor-prescribed meal plan icon',
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
                iconAlt: 'Exercise and movement program icon',
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
                iconAlt: 'Slimming treatments icon',
                items: [
                  'EMSculpt NEO — build muscle and reduce fat',
                  'CoolSculpting fat freezing — permanent fat reduction',
                  'VelaShape III — smooth and firm loose skin',
                  'Lymphatic drainage to reduce fluid retention',
                  'Non-invasive with no downtime required',
                ],
              },
            ].map((pillar) => (
              <div key={pillar.title} style={{ padding: '22px 14px', background: 'linear-gradient(180deg, #F2F6EF 0%, #C9D8C1 100%)', borderTopLeftRadius: '18px', borderTopRightRadius: '90px', borderBottomLeftRadius: '90px', borderBottomRightRadius: '18px', boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}>
                <div className="mb-5 flex items-center" style={{ height: '48px' }}>
                  <img src={pillar.icon} alt={pillar.iconAlt} style={{ maxHeight: '44px', width: 'auto', objectFit: 'contain' }} />
                </div>
                <p className="mb-2" style={{ color: '#8EB093', fontFamily: 'Novecento Wide Book, sans-serif', fontSize: '12px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', lineHeight: '1.4' }}>
                  {pillar.title}
                </p>
                <h3 className="mb-5" style={{ color: '#9B8D83', fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400', lineHeight: '1.4' }}>
                  {pillar.subheading}
                </h3>
                <ul className="space-y-2">
                  {pillar.items.map((item) => (
                    <li key={item} className="flex items-start gap-2" style={{ color: '#9B8D83', fontFamily: 'Roboto, sans-serif', fontSize: '13px', lineHeight: '1.4' }}>
                      <span style={{ color: '#8EB093', lineHeight: '1.4' }}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a
              href="https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2843963&eid=5009163&oiid=sv%3A25969858&share=true&pId=2708191"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-bold text-white"
              style={{ backgroundColor: '#6391AB', borderRadius: '10px', width: '444px', maxWidth: '100%', height: '40px', fontFamily: 'Novecento Wide Book, sans-serif', fontSize: '10px', letterSpacing: '0.5px', textTransform: 'uppercase' }}
            >
              Get Your Free Body Analysis ›
            </a>
          </div>
        </div>
      </section>

      {/* (3) Explore Our Modalities */}
      <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
        <div className="text-center mb-12">
          <h2 className="mb-3" style={{ color: '#9B8D83', fontFamily: 'Novecento Wide Book, sans-serif', fontWeight: '400', fontSize: '16px', letterSpacing: '3.2px', textTransform: 'uppercase' }}>
            Explore our modalities
          </h2>
          <div className="mx-auto" style={{ width: '120px', height: '1px', backgroundColor: '#C9B8AE' }} />
        </div>
        <ModalitiesCarousel />
      </section>

      {/* (4) Our Results-Driven Approach / Extended Care Commitment */}
      <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Live page renders this section on a rounded gradient panel (980px wide) */}
          <div style={{ maxWidth: '980px', marginLeft: 'auto', marginRight: 'auto', borderRadius: '17px', background: 'linear-gradient(148deg, #FFFFFF 0%, #C9D8C1 100%)', padding: '28px 46px 48px' }}>
            <h4 className="text-center mb-2" style={{ color: '#9B8D83', fontFamily: 'Novecento Wide Book, sans-serif', fontWeight: '400', fontSize: '16px', letterSpacing: '3.2px', textTransform: 'uppercase' }}>
              our results-driven approach
            </h4>
            <div className="mx-auto mb-4" style={{ width: '90px', height: '1px', backgroundColor: '#C9B8AE' }} />
            <h2 className="text-center mb-4" style={{ color: '#8EB093', fontFamily: 'Trajan Pro, serif', fontWeight: '400', fontSize: '25px', lineHeight: '1.4', textTransform: 'uppercase' }}>
              up to 1kg a week. measured. verified.<br />committed to your weight loss
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-[326px_minmax(0,1fr)] gap-10 items-start">
              {/* Left - Image */}
              <div className="flex justify-center">
                <img
                  src="/wix/87fc13_aea394ce5ab4485e8613221fa3617b8f~mv2.png"
                  alt="Doctor consultation for medical weight loss at Carisma Slimming Malta"
                  style={{ width: '100%', maxWidth: '326px', aspectRatio: '326 / 418', height: 'auto', objectFit: 'cover', objectPosition: 'center', display: 'block', borderRadius: '100px 10px' }}
                />
              </div>
              {/* Right - Text + Commitment */}
              <div>
                <p className="mb-6" style={{ color: '#9B8D83', fontFamily: 'Roboto, sans-serif', fontSize: '14px', lineHeight: '1.4' }}>
                  We are selective about who joins our weight loss transformation programs. We only accept clients we genuinely believe we can help reach their healthy weight through our slimming program. If you qualify and complete your program and do not hit your target weight, we will extend your weight management program at no extra program fee until we achieve your desired result.
                </p>
                <p className="mb-5" style={{ color: '#9B8D83', fontFamily: 'Novecento Wide Book, sans-serif', fontSize: '15px', fontWeight: '400', letterSpacing: '0.5px' }}>
                  This is our <span style={{ fontWeight: '700' }}>Extended Care Commitment</span>
                </p>
                <p className="mb-5" style={{ color: '#9B8D83', fontFamily: 'Novecento Wide Book, sans-serif', fontSize: '15px', lineHeight: '1.4', textTransform: 'uppercase' }}>
                  To keep your slimming results medically valid and fair, you agree to
                </p>
                <ul className="grid grid-cols-1">
              {[
                'Attend all scheduled in clinic sessions and weekly check ins',
                'Follow your personalised food plan consistently and tell us when you struggle',
                'Complete your agreed physical activities & discuss any pain or obstacles',
                'Use only the treatments and medications recommended by our medical team',
                'Inform us of any major health (e.g., heart disease) or medication changes',
                'Avoid crash diets, extreme restriction or outside weight loss treatments that could affect your results',
              ].map((req) => (
                  <li key={req} className="flex items-start gap-2" style={{ color: '#9B8D83', fontFamily: 'Roboto, sans-serif', fontSize: '14px', lineHeight: '1.9' }}>
                    <span style={{ color: '#8EB093' }}>•</span>
                    <span>{req}</span>
                  </li>
                ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* (5) Medical Weight Loss in Malta (GLP-1) */}
      <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-3" style={{ color: '#8EB093', fontFamily: 'Trajan Pro, serif', fontWeight: '400', fontSize: '25px', lineHeight: '35px' }}>
            MEDICAL WEIGHT LOSS IN MALTA (GLP-1)
          </h2>
          <div className="mx-auto mb-12" style={{ width: '120px', height: '1px', backgroundColor: '#C9B8AE' }} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Left - text */}
            <div className="order-2 md:order-1">
              <p className="mb-6" style={{ color: '#9B8D83', fontFamily: 'Roboto, sans-serif', fontSize: '14px', lineHeight: '1.4' }}>
                GLP-1s are naturally occurring hormones that help regulate appetite and blood sugar. GLP-1 prescription medications — such as Ozempic and Mounjaro, mimic or boost these signals so you feel full sooner, think about food less, and can lose weight more effectively when combined with a structured slimming plan and personalised meal plan.
              </p>
              <p className="mb-3" style={{ color: '#9B8D83', fontFamily: 'Roboto, sans-serif', fontSize: '14px', lineHeight: '1.6', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                At our slimming clinic, GLP-1 is an optional tool within your weight loss program, not a shortcut for everyone:
              </p>
              <div className="mb-6" style={{ width: '100%', maxWidth: '540px', height: '1px', backgroundColor: '#E6E1DC' }} />
              <div className="space-y-5">
                {[
                  'You first have a full medical weight loss assessment, body scan and review of your history and bloods',
                  'If you medically qualify, the doctor explains your options, expected results and side effects so you can decide with confidence',
                  'Any prescription is paired with a personalised meal plan, movement and accountability, never used on its own',
                  'We monitor your progress and symptoms, adjust or stop treatment when needed and plan for life after the medication',
                  'If GLP-1 is not right for you, we will tell you clearly and focus on non-medication weight loss routes that match your health and goals',
                ].map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span style={{ color: '#8EB093', fontSize: '18px', lineHeight: '1.4' }}>•</span>
                    <p style={{ color: '#9B8D83', fontFamily: 'Roboto, sans-serif', fontSize: '14px', lineHeight: '1.4' }}>
                      {step}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-8" style={{ borderLeft: '3px solid #8EB093', paddingLeft: '18px' }}>
                <p style={{ color: '#9B8D83', fontFamily: 'Roboto, sans-serif', fontSize: '14px', lineHeight: '1.4', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  To protect quality of care, our guaranteed weight loss transformation programs are limited to a small number of clients each month. Check if you qualify.
                </p>
              </div>
            </div>
            {/* Right - image + CTA */}
            <div className="flex flex-col gap-6 order-1 md:order-2">
              <img
                src="/wix/87fc13_3028fef86af2454fa2fbdbb5dcd55d87~mv2.png"
                alt="medical weight loss consultation Malta"
                style={{ width: '100%', maxWidth: '326px', marginLeft: 'auto', marginRight: 'auto', aspectRatio: '326 / 443', objectFit: 'cover', objectPosition: 'center', display: 'block', borderRadius: '100px 10px' }}
              />
              <a
                href="https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2843963&eid=5009163&oiid=sv%3A25969858&share=true&pId=2708191"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-bold text-white"
                style={{ backgroundColor: '#6391AB', borderRadius: '10px', fontFamily: 'Novecento Wide Book, sans-serif', fontSize: '10px', letterSpacing: '0.5px', textTransform: 'uppercase', width: '100%', maxWidth: '326px', height: '40px', marginLeft: 'auto', marginRight: 'auto' }}
              >
                Get Your Free Body Analysis ›
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* (6) The Carisma Difference */}
      <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative" style={{ maxWidth: '980px', marginLeft: 'auto', marginRight: 'auto', background: 'linear-gradient(192deg, #F8F6F2 44.74%, rgba(142, 176, 147, 0.4) 100%)', borderRadius: '20px', padding: '30px 33px 40px', overflow: 'hidden' }}>
            {/* Decorative background watermark (live Wix asset, alt="") */}
            <img
              src="/wix/f940f0_9f944ed58e3f4919bf87ef224beb4f94~mv2.png"
              alt=""
              aria-hidden="true"
              style={{ position: 'absolute', left: '50%', top: '12px', transform: 'translateX(-50%)', width: '678px', height: '630px', objectFit: 'contain', pointerEvents: 'none', zIndex: 0 }}
            />
            <div className="relative" style={{ zIndex: 1 }}>
            <p className="text-center mb-2" style={{ color: '#9B8D83', fontFamily: 'Novecento Wide Book, sans-serif', fontSize: '14px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase' }}>
              the carisma difference
            </p>
            <div className="mx-auto mb-4" style={{ width: '110px', height: '1px', backgroundColor: '#B9A99E' }} />
            <h2 className="text-center mb-12" style={{ color: '#8EB093', fontFamily: 'Trajan Pro, serif', fontWeight: '400', fontSize: '25px', lineHeight: '35px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              malta&rsquo;s #1 leading wellness chain
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              {/* Left - commitments */}
              <div className="space-y-10">
                <div>
                  <h3 className="mb-5" style={{ color: '#000000', fontFamily: 'Novecento Wide Book, sans-serif', fontSize: '15px', fontWeight: '400', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    Our Commitment
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'Visible inch loss and shape change through a medically supervised slimming program',
                      'Weight loss plans that work with your age, hormones and metabolism',
                      'No crash diets, no banned foods, no endless hours of cardio, just medical guidance and personalised meal plans',
                      'Medical-grade slimming treatments and fat freezing technology delivered by trained professionals',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2" style={{ color: '#AFA39D', fontFamily: 'Roboto, sans-serif', fontSize: '14px', lineHeight: '1.6' }}>
                        <span style={{ color: '#8EB093' }}>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-5" style={{ color: '#000000', fontFamily: 'Novecento Wide Book, sans-serif', fontSize: '15px', fontWeight: '400', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    Why Malta Chooses Carisma
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Created by the team behind Malta's leading spa and medical aesthetics centres",
                      'Doctor-led medical weight loss and slimming, not a beauty salon diet program',
                      'All-in-one approach: medical assessment, personalised meal plans, movement and body contouring treatments',
                      'High-touch support with weekly check-ins, WhatsApp coaching and dedicated accountability',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2" style={{ color: '#AFA39D', fontFamily: 'Roboto, sans-serif', fontSize: '14px', lineHeight: '1.6' }}>
                        <span style={{ color: '#8EB093' }}>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* Right - map */}
              <div>
                <iframe
                  title="Carisma Slimming location"
                  src="https://maps.google.com/maps?q=Grand%20Hotel%20Excelsior%2C%20Great%20Siege%20Road%2C%20Floriana%20FRN%201810%2C%20Malta&z=15&output=embed"
                  width="100%"
                  height="484"
                  style={{ border: 0, borderRadius: '12px', display: 'block' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
            {/* Bottom row - CTA + parking */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-12">
              <a
                href="https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2843963&eid=5009163&oiid=sv%3A25969858&share=true&pId=2708191"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-bold text-white"
                style={{ backgroundColor: '#6391AB', borderRadius: '10px', fontFamily: 'Novecento Wide Book, sans-serif', fontSize: '10px', letterSpacing: '0.5px', textTransform: 'uppercase', width: '464px', maxWidth: '100%', height: '40px' }}
              >
                Get Your Free Body Analysis ›
              </a>
              <div className="flex items-center gap-3">
                <img src="/wix/87fc13_2b8e2795b62445a5a99d90d5490491eb~mv2.png" alt="Complimentary on-site parking" style={{ width: '34px', height: 'auto', objectFit: 'contain' }} />
                <span style={{ color: '#9B8D83', fontFamily: 'Novecento Wide Book, sans-serif', fontSize: '14px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Complimentary on-site parking
                </span>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* (7) Real People, Real Reviews — heading precedes doctor profiles (rendered by BrandBlock) */}
      <section className="pt-16 pb-4" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 style={{ color: '#8EB093', fontFamily: 'Trajan Pro, serif', fontWeight: '400', fontSize: '35px', letterSpacing: '1px' }}>
            real people, real reviews
          </h2>
        </div>
      </section>

      {/* (8) Google reviews — live homepage shows the reviews widget between the
          "real people, real reviews" heading and the doctor profiles (homepage only) */}
      <GoogleReviews />

    </div>
  );
}
