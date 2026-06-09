'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative mx-auto" style={{ minHeight: '700px', paddingTop: '40px', paddingBottom: '40px', backgroundImage: 'url(/background.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'scroll', borderRadius: '48px', overflow: 'hidden', maxWidth: '1280px', marginLeft: 'auto', marginRight: 'auto', marginTop: '20px', marginBottom: '20px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
            {/* Left Content */}
            <div>
              <h1 className="mb-6 leading-tight pb-6 border-b" style={{ color: '#7ba587', fontFamily: 'Trajan Pro, serif', fontWeight: '400', fontSize: '28px', borderColor: '#e0e0e0' }}>
                DOCTOR-LED SLIMMING & WEIGHT LOSS IN MALTA
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

              {/* Form Section */}
              <h2 className="text-xl mb-6" style={{ color: '#8EB093', fontSize: '16px', fontWeight: '500', letterSpacing: '0.5px' }}>
                BOOK YOUR FREE CONSULTATION
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4" style={{ backgroundColor: '#EEF3F0', padding: '24px', borderRadius: '8px' }}>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#8B8B8B', fontSize: '14px' }}>
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter your first name"
                    className="w-full px-4 py-2 border border-gray-300 rounded bg-white focus:outline-none text-sm"
                    style={{ borderColor: '#ddd' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#8B8B8B', fontSize: '14px' }}>
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter your last name"
                    className="w-full px-4 py-2 border border-gray-300 rounded bg-white focus:outline-none text-sm"
                    style={{ borderColor: '#ddd' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#8B8B8B', fontSize: '14px' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded bg-white focus:outline-none text-sm"
                    style={{ borderColor: '#ddd' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#8B8B8B', fontSize: '14px' }}>
                    Phone *
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 bg-white border border-gray-300 border-r-0 rounded-l" style={{ color: '#666' }}>
                      🇲🇹 +356
                    </span>
                    <input
                      type="tel"
                      placeholder="phone number"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-r bg-white focus:outline-none text-sm"
                      style={{ borderColor: '#ddd' }}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#8B8B8B', fontSize: '14px' }}>
                    Interested Treatment
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded bg-white focus:outline-none text-sm" style={{ borderColor: '#ddd', color: '#999' }}>
                    <option>Select an option</option>
                    <option>Weight Loss Program</option>
                    <option>GLP-1 Medications</option>
                    <option>Fat Freezing</option>
                    <option>Muscle Stimulation</option>
                  </select>
                </div>
                <div className="flex items-start gap-2">
                  <input type="checkbox" id="consent" className="mt-1" />
                  <label htmlFor="consent" className="text-xs" style={{ color: '#999' }}>
                    By checking this box, I commit to attending my scheduled free Tanita body composition analysis and acknowledge that a no-show may disqualify me from future sessions.
                  </label>
                </div>
                <button type="submit" className="w-full py-3 rounded font-bold text-white text-sm" style={{ backgroundColor: '#9B8D83' }}>
                  Submit
                </button>
              </form>
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

                {/* Google Review - No Stars */}
                <div className="flex items-center justify-center gap-2">
                  <img src="/Google review.png" alt="Google Review" style={{ height: '32px', width: 'auto', flexShrink: 0 }} />
                  <span style={{ color: '#8EB093', fontSize: '13px', fontWeight: '500' }}>Over 200+ Reviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* (1) Media / Press Strip */}
      <section className="py-10" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center mb-6" style={{ color: '#8EB093', fontFamily: 'Novecento Wide Book, sans-serif', fontSize: '14px', fontWeight: '600', letterSpacing: '1px' }}>
            As seen on
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center">
            {[
              { label: 'Malta Today logo', src: '/wix/f940f0_8c40f03f50684bf8adc6d9ca0cb2be9e~mv2.jpg' },
              { label: 'Bay Radio Malta logo', src: '/wix/f940f0_e6f0bd96c9d04debaa8d8b609cbf68e6~mv2.jpeg' },
              { label: 'Lovin Malta logo', src: '/wix/f940f0_8bd141199fea4275a1222b62f24f2d98~mv2.jpeg' },
              { label: 'Times of Malta logo', src: '/wix/f940f0_2120887ab6ef4957b02ff004e804beaf~mv2.png' },
              { label: 'MT Today logo', src: '/wix/f940f0_0db6f1508426404eacea3b33b0e9112d~mv2.png' },
            ].map((logo) => (
              <div
                key={logo.label}
                className="flex items-center justify-center"
                style={{ height: '70px', borderRadius: '8px' }}
              >
                <img
                  src={logo.src}
                  alt={`${logo.label} — Carisma Slimming featured`}
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* (2) 4 Core Pillars of Our Weight Loss Methodology */}
      <section className="py-16" style={{ backgroundColor: '#F7F5F3' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-2" style={{ color: '#8EB093', fontFamily: 'Trajan Pro, serif', fontWeight: '400', fontSize: '28px' }}>
            4 core pillars of our weight loss methodology
          </h2>
          <p className="text-center mb-12" style={{ color: '#9B8D83', fontFamily: 'Novecento Wide Book, sans-serif', fontSize: '15px' }}>
            Malta's only multidisciplinary approach to slimming & weight-loss
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                subheading: 'Know your body before starting any program',
                title: 'Medical weight loss assessment',
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
              <div key={pillar.title} className="p-6" style={{ backgroundColor: '#EFEAE4', borderTopLeftRadius: '40px', borderTopRightRadius: '8px', borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' }}>
                <div className="mb-3 flex items-center" style={{ height: '42px' }}>
                  <img src={pillar.icon} alt={pillar.iconAlt} style={{ maxHeight: '42px', width: 'auto', objectFit: 'contain' }} />
                </div>
                <h3 className="mb-2" style={{ color: '#8EB093', fontFamily: 'Trajan Pro, serif', fontSize: '17px', fontWeight: '400', lineHeight: '1.3' }}>
                  {pillar.subheading}
                </h3>
                <h4 className="mb-4" style={{ color: '#9B8D83', fontFamily: 'Novecento Wide Book, sans-serif', fontSize: '15px', fontWeight: '600', lineHeight: '1.3' }}>
                  {pillar.title}
                </h4>
                <ul className="space-y-2">
                  {pillar.items.map((item) => (
                    <li key={item} className="flex items-start gap-2" style={{ color: '#AFA39D', fontFamily: 'Roboto, sans-serif', fontSize: '14px', lineHeight: '1.5' }}>
                      <span style={{ color: '#8EB093', lineHeight: '1.5' }}>•</span>
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
              className="inline-block py-3 px-8 rounded font-bold text-white"
              style={{ backgroundColor: '#9B8D83', fontFamily: 'Novecento Wide Book, sans-serif', fontSize: '13px', letterSpacing: '0.5px' }}
            >
              Get Your Free Body Analysis
            </a>
          </div>
        </div>
      </section>

      {/* (3) Explore Our Modalities */}
      <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-12" style={{ color: '#8EB093', fontFamily: 'Trajan Pro, serif', fontWeight: '400', fontSize: '28px' }}>
            EXPLORE OUR MODALITIES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Weight Loss',
                desc: "A doctor-led, all-in-one weight loss program that combines nutrition, movement, body contouring treatments and accountability to change your body and habits for good. Malta's most comprehensive slimming system.",
                href: '/packages',
                placeholder: 'Weight Loss modality image',
                src: '/wix/87fc13_08e868147da2475ba4b9638849be145e~mv2.jpg',
              },
              {
                title: 'GLP-1 (Mounjaro & Ozempic)',
                desc: 'Prescription-only medical weight loss medication, used when medically appropriate, to calm appetite and support steady fat reduction alongside your personalised slimming plan.',
                href: '/medical-weight-loss',
                placeholder: 'GLP-1 modality image',
                src: '/wix/87fc13_6495820e70764a1fa3caddfb20d80fe0~mv2.webp',
              },
              {
                title: 'Fat Reduction',
                desc: 'Targeted non surgical fat removal using CoolSculpting fat freezing (cryolipolysis) Medical guidance and a tailored caloric deficit for those last stubborn areas. FDA-cleared and performed at our Malta clinic.',
                href: '/fat-reduction',
                placeholder: 'Fat Reduction modality image',
                src: '/wix/87fc13_6d89e9c129304617a960aa46bb07eed4~mv2.jpg',
              },
              {
                title: 'Muscle Stimulation',
                desc: 'High-intensity electromagnetic body sculpting sessions with EMSculpt NEO that contract your muscles thousands of times to build strength, reduce fat and help shape your silhouette, without surgery or downtime.',
                href: '/muscle-stimulation',
                placeholder: 'Muscle Stimulation modality image',
                src: '/wix/87fc13_d79664fae1184e8e8c947c3d350af498~mv2.jpg',
              },
            ].map((card) => (
              <div key={card.title} className="overflow-hidden flex flex-col" style={{ backgroundColor: '#8AA98C', borderTopLeftRadius: '40px', borderTopRightRadius: '8px', borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' }}>
                <div className="flex items-center justify-center overflow-hidden" style={{ width: '100%', aspectRatio: '343 / 456' }}>
                  <img
                    src={card.src}
                    alt={card.placeholder}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="mb-3" style={{ color: '#ffffff', fontFamily: 'Novecento Wide Book, sans-serif', fontSize: '16px', fontWeight: '600' }}>
                    {card.title}
                  </h3>
                  <p className="mb-6 flex-1" style={{ color: '#F2F4F1', fontFamily: 'Roboto, sans-serif', fontSize: '14px', lineHeight: '1.6' }}>
                    {card.desc}
                  </p>
                  <Link href={card.href} style={{ color: '#ffffff', fontFamily: 'Novecento Wide Book, sans-serif', fontSize: '14px', fontWeight: '600', letterSpacing: '0.5px' }}>
                    EXPLORE
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* (4) Our Results-Driven Approach / Extended Care Commitment */}
      <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ backgroundColor: '#C9DBC7', borderRadius: '32px', padding: '48px' }}>
            <h2 className="text-center mb-2" style={{ color: '#5E7E63', fontFamily: 'Trajan Pro, serif', fontWeight: '400', fontSize: '28px' }}>
              our results-driven approach
            </h2>
            <p className="text-center mb-10" style={{ color: '#5E7E63', fontFamily: 'Novecento Wide Book, sans-serif', fontSize: '15px', lineHeight: '1.4' }}>
              UP TO 1KG A WEEK. MEASURED. VERIFIED. COMMITTED TO YOUR WEIGHT LOSS
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              {/* Left - Image */}
              <div className="flex justify-center">
                <img
                  src="/wix/87fc13_aea394ce5ab4485e8613221fa3617b8f~mv2.png"
                  alt="Doctor consultation for medical weight loss at Carisma Slimming Malta"
                  className="rounded-lg"
                  style={{ width: '100%', maxWidth: '412px', aspectRatio: '412 / 487', height: 'auto', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
                />
              </div>
              {/* Right - Text + Commitment */}
              <div>
                <p className="mb-6" style={{ color: '#55624F', fontFamily: 'Roboto, sans-serif', fontSize: '15px', lineHeight: '1.7' }}>
                  We are selective about who joins our weight loss transformation programs. We only accept clients we genuinely believe we can help reach their healthy weight through our slimming program. If you qualify and complete your program and do not hit your target weight, we will extend your weight management program at no extra program fee until we achieve your desired result.
                </p>
                <p className="mb-5" style={{ color: '#3F5742', fontFamily: 'Novecento Wide Book, sans-serif', fontSize: '15px', fontWeight: '600', letterSpacing: '0.5px' }}>
                  This is our Extended Care Commitment
                </p>
                <p className="mb-5" style={{ color: '#55624F', fontFamily: 'Roboto, sans-serif', fontSize: '14px', lineHeight: '1.6' }}>
                  To keep your slimming results medically valid and fair, you agree to
                </p>
                <ul className="grid grid-cols-1 gap-y-3">
              {[
                'Attend all scheduled in clinic sessions and weekly check ins',
                'Follow your personalised food plan consistently and tell us when you struggle',
                'Complete your agreed physical activities & discuss any pain or obstacles',
                'Use only the treatments and medications recommended by our medical team',
                'Inform us of any major health (e.g., heart disease) or medication changes',
                'Avoid crash diets, extreme restriction or outside weight loss treatments that could affect your results',
              ].map((req) => (
                  <li key={req} className="flex items-start gap-2" style={{ color: '#55624F', fontFamily: 'Roboto, sans-serif', fontSize: '14px', lineHeight: '1.6' }}>
                    <span style={{ color: '#3F5742' }}>•</span>
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
          <h2 className="text-center mb-8" style={{ color: '#8EB093', fontFamily: 'Trajan Pro, serif', fontWeight: '400', fontSize: '28px' }}>
            MEDICAL WEIGHT LOSS IN MALTA (GLP-1)
          </h2>
          <p className="text-center mb-8 mx-auto" style={{ color: '#AFA39D', fontFamily: 'Roboto, sans-serif', fontSize: '15px', lineHeight: '1.7', maxWidth: '880px' }}>
            GLP-1s are naturally occurring hormones that help regulate appetite and blood sugar. GLP-1 prescription medications — such as Ozempic and Mounjaro, mimic or boost these signals so you feel full sooner, think about food less, and can lose weight more effectively when combined with a structured slimming plan and personalised meal plan.
          </p>
          <p className="text-center mb-12 mx-auto" style={{ color: '#9B8D83', fontFamily: 'Roboto, sans-serif', fontSize: '15px', lineHeight: '1.7', maxWidth: '880px', fontWeight: '600' }}>
            At our slimming clinic, GLP-1 is an optional tool within your weight loss program, not a shortcut for everyone:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left - Steps */}
            <div className="space-y-5 md:order-1 order-2">
              {[
                'You first have a full medical weight loss assessment, body scan and review of your history and bloods. If you medically qualify, the doctor explains your options, expected results and side effects so you can decide with confidence',
                'Any prescription is paired with a personalised meal plan, movement and accountability, never used on its own',
                'We monitor your progress and symptoms, adjust or stop treatment when needed and plan for life after the medication',
                'If GLP-1 is not right for you, we will tell you clearly and focus on non-medication weight loss routes that match your health and goals',
              ].map((step, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span style={{ color: '#8EB093', fontSize: '18px', lineHeight: '1.5' }}>•</span>
                  <p style={{ color: '#AFA39D', fontFamily: 'Roboto, sans-serif', fontSize: '14px', lineHeight: '1.7' }}>
                    {step}
                  </p>
                </div>
              ))}
            </div>
            {/* Right - Image */}
            <div className="flex justify-center md:order-2 order-1">
              <img
                src="/wix/87fc13_3028fef86af2454fa2fbdbb5dcd55d87~mv2.png"
                alt="medical weight loss consultation Malta"
                className="rounded-lg"
                style={{ width: '100%', maxWidth: '460px', aspectRatio: '410 / 264', height: 'auto', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
              />
            </div>
          </div>
          <p className="text-center mt-12 mx-auto" style={{ color: '#AFA39D', fontFamily: 'Roboto, sans-serif', fontSize: '15px', lineHeight: '1.7', maxWidth: '880px' }}>
            To protect quality of care, our guaranteed weight loss transformation programs are limited to a small number of clients each month. Check if you qualify.
          </p>
          <div className="text-center mt-8">
            <a
              href="https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2843963&eid=5009163&oiid=sv%3A25969858&share=true&pId=2708191"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block py-3 px-8 rounded font-bold text-white"
              style={{ backgroundColor: '#9B8D83', fontFamily: 'Novecento Wide Book, sans-serif', fontSize: '13px', letterSpacing: '0.5px' }}
            >
              Get Your Free Body Analysis
            </a>
          </div>
        </div>
      </section>

      {/* (6) The Carisma Difference */}
      <section className="py-16" style={{ backgroundColor: '#F7F5F3' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-2" style={{ color: '#8EB093', fontFamily: 'Trajan Pro, serif', fontWeight: '400', fontSize: '28px' }}>
            the carisma difference
          </h2>
          <p className="text-center mb-12" style={{ color: '#9B8D83', fontFamily: 'Novecento Wide Book, sans-serif', fontSize: '15px' }}>
            malta's #1 leading wellness chain
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="mb-5" style={{ color: '#9B8D83', fontFamily: 'Novecento Wide Book, sans-serif', fontSize: '18px', fontWeight: '600' }}>
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
              <h3 className="mb-5" style={{ color: '#9B8D83', fontFamily: 'Novecento Wide Book, sans-serif', fontSize: '18px', fontWeight: '600' }}>
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
          <p className="text-center mt-10" style={{ color: '#8EB093', fontFamily: 'Novecento Wide Book, sans-serif', fontSize: '14px', fontWeight: '600', letterSpacing: '0.5px' }}>
            Complimentary on-site parking
          </p>
          <div className="text-center mt-8">
            <a
              href="https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2843963&eid=5009163&oiid=sv%3A25969858&share=true&pId=2708191"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block py-3 px-8 rounded font-bold text-white"
              style={{ backgroundColor: '#9B8D83', fontFamily: 'Novecento Wide Book, sans-serif', fontSize: '13px', letterSpacing: '0.5px' }}
            >
              Get Your Free Body Analysis
            </a>
          </div>
        </div>
      </section>

      {/* (7) Real People, Real Reviews */}
      <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-8" style={{ color: '#8EB093', fontFamily: 'Trajan Pro, serif', fontWeight: '400', fontSize: '28px' }}>
            real people, real reviews
          </h2>
          <div className="inline-flex flex-col items-center gap-3 rounded-lg" style={{ backgroundColor: '#F7F5F3', border: '1px solid #E6E1DC', padding: '32px 48px' }}>
            <div className="flex items-center gap-3">
              <span style={{ color: '#8EB093', fontFamily: 'Roboto, sans-serif', fontSize: '40px', fontWeight: 700 }}>4.7</span>
              <span style={{ color: '#8EB093', fontSize: '24px', letterSpacing: '2px' }}>★★★★★</span>
            </div>
            <p style={{ color: '#9B8D83', fontFamily: 'Roboto, sans-serif', fontSize: '15px', letterSpacing: '0.5px' }}>
              Over 200+ Reviews on Google
            </p>
            <a
              href="https://www.google.com/search?q=carisma+slimming+malta+reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block py-2 px-6 rounded font-bold text-white"
              style={{ backgroundColor: '#8EB093', fontFamily: 'Novecento Wide Book, sans-serif', fontSize: '12px', letterSpacing: '0.5px' }}
            >
              REVIEW US ON GOOGLE
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
