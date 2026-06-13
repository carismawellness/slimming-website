'use client';
import { useRef, useEffect, useState } from 'react';

const GREEN = '#8EB093';
const TAUPE = '#9B8D83';
const FRESHA = 'https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2843963&eid=4994308&oiid=sv%3A25969858&share=true&pId=2708191';

const DOCTORS = [
  {
    name: 'Dr. Zaid Teebi',
    photo: 'Dr. Zaid Teebi photo',
    img: '/wix/87fc13_523cfb315801437881171694d92d8d4f~mv2.png',
    bio: 'Dr Zaid Teebi is the medical consultant leading our weight loss and slimming programs, with over 30+ years of clinical experience. He holds credentials in general medicine, geriatrics, and specialised allergy training, allowing him to combine broad clinical insight with focused care. He also holds a certificate in Sports Medicine from the American College of Sports Medicine and completed training in Pain Management at Harvard Medical School (USA) and Allergy and allergy therapy at the Imperial College London (UK). Dr Teebi personally conducts detailed medical weight loss consultations and prescribes personalised meal plans: a comprehensive medical and allergy history, symptom chronology, family history, environmental and occupational factors, followed by a full clinical examination before recommending targeted diagnostic tests and therapy.',
  },
  {
    name: 'Dr. Giovanni Scornavacca',
    photo: 'Dr. Giovanni Scornavacca photo',
    img: '/wix/87fc13_e903680b4d124adda85e7ade5dfd676b~mv2.png',
    bio: 'Dr. Giovanni is an Italian aesthetic doctor at Carisma Aesthetics, trained and practised for 20+ years in Italy with continued advanced education across leading universities in Rome, Bologna and other centres. He specialises in aesthetic medicine with a particular interest in regenerative approaches such as PRP, stem cells, pairing medical rigour with a calm, human manner. His philosophy is restoration, not change: every consultation begins with listening to your story and how you want to feel in your skin, then shaping a conservative, precisely paced plan that prioritises safety, clarity and natural balance. From softening expression lines and refining contour to improving tone, texture and early laxity, his results are subtle and harmonious—refreshed, never overdone. At our St Julian\'s clinic, Dr. Giovanni offers evidence-based treatments including dermal fillers, collagen stimulators, skin boosters, microneedling with mesotherapy, PRP and medical-grade laser therapies, guiding you thoughtfully through each step so you can glow with confidence.',
  },
  {
    name: 'Dr. Francesca Chircop',
    photo: 'Dr. Francesca Chircop photo',
    img: '/wix/87fc13_26127e01d9fb4ec48fb0b2f7ccb73508~mv2.png',
    bio: 'Dr. Francesca is a London-trained aesthetic doctor with 8+ years in medical aesthetics and a foundation in orthopaedic surgery, bringing precise anatomical insight to subtle, balanced results. Her philosophy is restoration, not change: every consultation begins with listening to your story and how you want to feel in your skin before shaping a conservative, personalised plan that prioritises safety, clarity, and natural harmony. She leads our Lip Flip enhancements and oversees the majority of our medical-grade laser hair removal care, pairing meticulous technique with advanced protocols for smooth, long-term results. Across anti-wrinkle injections, dermal fillers, skin boosters, PRP/regenerative techniques, microneedling with mesotherapy, and medical-grade lasers, she guides you thoughtfully through each step so the outcome feels authentically you—refreshed, never overdone.',
  },
];

const BRANDS = [
  {
    title: 'Carisma Spa & Wellness',
    img: '/wix/87fc13_a62cc8038b274204a2fe70fd3d4879d0~mv2.png',
    logo: '/wix/87fc13_e2e5f077c0024cbc9a3d975e4a009b7e~mv2.png',
    cta: 'DISCOVER OUR SPAS',
    btnColor: '#B79E61',
    reviews: false,
  },
  {
    title: 'Carisma Aesthetics',
    img: '/wix/87fc13_bdc2b69242844d529915c2f20b2584ac~mv2.png',
    logo: '/wix/87fc13_b5a7ec4b11f445b4879c36d7268ba6d1~mv2.png',
    cta: 'DISCOVER MED-AESTHETICS',
    btnColor: '#96B2B2',
    reviews: true,
  },
];

export default function BrandBlock() {
  const bookRef = useRef<HTMLDivElement>(null);
  const [bookVisible, setBookVisible] = useState(false);

  useEffect(() => {
    const el = bookRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBookVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {/* Doctor Profiles — stacked 2-column rows, alternating photo side */}
      <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-16">
          {DOCTORS.map((doc, i) => {
            const photoFirst = i % 2 === 0;
            const photo = (
              <div key="photo" className="md:w-1/2 flex justify-center">
                <div style={{ borderTopLeftRadius: '18px', borderTopRightRadius: '90px', borderBottomLeftRadius: '90px', borderBottomRightRadius: '18px', overflow: 'hidden', width: '100%', maxWidth: '343px', aspectRatio: '343 / 456', boxShadow: '16px -16px 0 #CBDEC5' }}>
                  <img src={doc.img} alt={doc.photo} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
                </div>
              </div>
            );
            const text = (
              <div key="text" className="md:w-1/2 flex flex-col justify-center">
                <h3 className="mb-4 pb-3" style={{ color: '#7ba587', fontFamily: 'Trajan Pro, serif', fontSize: '28px', fontWeight: 400, letterSpacing: '1px', textTransform: 'uppercase', borderBottom: '1px solid #A9C6A2' }}>{doc.name}</h3>
                <p style={{ color: '#9B8D83', fontFamily: 'Roboto, sans-serif', fontSize: '14px', lineHeight: 1.75 }}>{doc.bio}</p>
              </div>
            );
            return (
              <div key={doc.name} className="flex flex-col md:flex-row gap-12 items-center" style={{ background: 'linear-gradient(148deg, #FFFFFF 0%, #C9D8C1 100%)', borderRadius: '28px', padding: '40px' }}>
                {photoFirst ? [photo, text] : [text, photo]}
              </div>
            );
          })}
        </div>
      </section>

      {/* Your Bible to Sustainable Weight Loss Management */}
      <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <style>{`
              @keyframes bookFloatUp {
                from { opacity: 0; transform: translateY(70px); }
                to   { opacity: 1; transform: translateY(0px); }
              }
              .book-hidden { opacity: 0; }
              .book-visible { animation: bookFloatUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
            `}</style>
            <div
              ref={bookRef}
              className={`flex items-center justify-end ${bookVisible ? 'book-visible' : 'book-hidden'}`}
              style={{ height: '487px' }}
            >
              <img src="/wix/87fc13_fae77cba7c5843e1ae57040ac00c3cce~mv2.png" alt="Carisma Slimming Guide cover image" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            </div>
            <div>
              <h2 className="mb-6 pb-3" style={{ color: GREEN, fontFamily: 'Trajan Pro, serif', fontWeight: 400, fontSize: '26px', lineHeight: 1.4, letterSpacing: '1px', borderBottom: '1px solid #E6E1DC' }}>
                YOUR BIBLE TO SUSTAINABLE WEIGHT LOSS MANAGEMENT
              </h2>
              <div style={{ border: '1px solid #E6E1DC', borderRadius: '4px', padding: '20px 24px' }}>
                <p style={{ color: '#AFA39D', fontFamily: 'Roboto, sans-serif', fontSize: '12px', lineHeight: 1.7 }}>
                  Weight loss is often treated as a test of discipline, but discipline rarely holds under stress, busy schedules, or decision fatigue. The Carisma Slimming Guide was created to address what happens after people try, when rigid rules stop working. It presents weight loss management as a structured meal plan system shaped by appetite physiology, behaviour, and real life. The guide covers when to eat, what to eat, how much to eat, and in which order: a practical framework you can return to on busy or low-energy days. Built from clinical experience at our slimming clinic in Malta, it helps you lose weight with consistency, not perfection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* #1 Voted Clinic in Malta + Sister Brands */}
      <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Awards badge + heading/paragraph — two-column row matching the live layout */}
          <div className="flex flex-col md:flex-row items-center justify-center mb-12" style={{ gap: '40px' }}>
            <img
              src="/wix/f940f0_2376c935184343478e49eeec5ca6fc51~mv2.png"
              alt="Malta Healthcare, Wellness, Beauty & Best Spa Awards"
              style={{ width: '205px', height: '132px', objectFit: 'cover', flexShrink: 0 }}
            />
            <div className="hidden md:block self-stretch" style={{ width: '1px', backgroundColor: '#E0DAD3' }} />
            <div style={{ maxWidth: '470px' }}>
              <h2 style={{ color: GREEN, fontFamily: 'Roboto, sans-serif', fontSize: '19px', lineHeight: '1.8em', letterSpacing: '0.05em' }}>
                <span style={{ fontWeight: 700 }}>#1 VOTED CLINIC </span>IN MALTA
              </h2>
              <p style={{ color: TAUPE, fontFamily: 'Roboto, sans-serif', fontSize: '14px', lineHeight: '1.8em' }}>
                Carisma Wellness Group brings <span style={{ fontWeight: 700 }}>over 35+ years</span> of expertise in <span style={{ fontWeight: 700 }}>wellness, aesthetics and slimming</span>. Guided by medical excellence and a passion for confidence, our treatments are designed to help you <span style={{ fontWeight: 700 }}>look</span> and <span style={{ fontWeight: 700 }}>feel your best</span>.
              </p>
            </div>
          </div>
          <div className="flex flex-col" style={{ gap: '44px' }}>
            {BRANDS.map((card) => (
              <div key={card.title} className="relative" style={{ height: '287px' }}>
                {/* Full-width card background (gradient panel is part of the image) */}
                <img src={card.img} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: '10px' }} />
                {/* Overlaid white logo (+ Google reviews line on the Aesthetics card) */}
                <div className="absolute flex flex-col justify-center" style={{ left: '64px', top: 0, bottom: 0 }}>
                  <img src={card.logo} alt={card.title} style={{ width: '218px', height: '122px', objectFit: 'contain' }} />
                  {card.reviews && (
                    <img
                      src="/wix/87fc13_6e75c766df9749f48a8a564a1a88f57b~mv2.png"
                      alt="Google five-star rating — over 3500+ reviews"
                      style={{ width: '213px', height: '25px', marginTop: '2px' }}
                    />
                  )}
                </div>
                {/* CTA button hanging off the card's bottom-right edge */}
                <a
                  href={FRESHA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute flex items-center justify-center text-white"
                  style={{ right: 0, bottom: '-20px', width: '278px', height: '40px', backgroundColor: card.btnColor, fontFamily: '"Novecento Wide", sans-serif', fontSize: '12px', fontWeight: 700, letterSpacing: '0.5px', borderRadius: '5px' }}
                >
                  {card.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
