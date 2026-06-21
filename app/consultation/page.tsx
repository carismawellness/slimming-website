import type { Metadata } from 'next';
import BookConsultationButton from '@/components/BookConsultationButton';

export const metadata: Metadata = {
  title: "Free Slimming Consultation Malta | Carisma Slimming",
  description: "Book your free slimming consultation with our medically qualified doctors in Malta. Get a personalised weight loss plan and start your journey today.",
  alternates: { canonical: 'https://www.carismaslimming.com/consultation' },
};

// Accessible brand palette (locked):
//  --brand-green-text / --brand-green-fill = #4f7256 (5.42:1 on white / carries white text)
//  TAUPE body text = #6f6456 (5.78:1 on white)
const GREEN = '#4f7256';
const TAUPE = '#6f6456';

const COLLAGE = [
  '/wix/87fc13_170da1f718f64c8b8e1a1a86083e1a72~mv2.png',
  '/wix/87fc13_59d15b41b3c1462788d0a0843b859d0b~mv2.png',
  '/wix/87fc13_73555ee869874f3c8a90fd5bb62d19e8~mv2.png',
  '/wix/87fc13_074438e081814932aa4c2fe6dc450e57~mv2.png',
];

export default function ConsultationPage() {
  return (
    <main className="w-full" style={{ color: TAUPE }}>
      {/* CONTACT US banner */}
      <section
        className="flex items-center justify-center"
        style={{ backgroundColor: GREEN, minHeight: '112px' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            className="uppercase"
            style={{ fontFamily: "'Trajan Pro', serif", fontSize: '28px', fontWeight: 400, color: '#FFFFFF' }}
          >
            Free Slimming Consultation in Malta — Book Your Place Today
          </h1>
          <div style={{ width: '284px', height: '1px', backgroundColor: '#FFFFFF', margin: '7px auto 0' }} />
        </div>
      </section>

      {/* BOOK YOUR SLIMMING CONSULTATION heading bar */}
      <section className="py-12" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="mx-auto px-4 md:px-0" style={{ maxWidth: '980px' }}>
          <div
            className="flex items-center justify-center text-center px-6"
            style={{ backgroundColor: '#4f7256', minHeight: '120px' }}
          >
            <h2
              className="uppercase"
              style={{
                fontFamily: '"Novecento Wide", sans-serif',
                fontWeight: 500,
                color: '#FFFFFF',
                fontSize: 'clamp(24px, 4.5vw, 40px)',
              }}
            >
              Meet Our Doctor-Led Weight Loss Team — Your Personalised Plan Starts Here
            </h2>
          </div>
        </div>
      </section>

      {/* Collage + booking form */}
      <section className="relative pb-12 pt-9" style={{ backgroundColor: '#FFFFFF' }}>
        {/* Faint decorative wavy-lines graphic bleeding off the left edge */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/wix/87fc13_7502c14a8f8c4a5d8e75362f7366465a~mv2.png"
          alt=""
          aria-hidden="true"
          className="absolute pointer-events-none hidden md:block"
          style={{ left: '-50px', top: '128px', width: '1039px', height: '380px', zIndex: 0 }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" style={{ zIndex: 10 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            {/* Photo collage — tight 2x2 cluster of Wix petal shapes */}
            <div className="hidden md:grid grid-cols-2 gap-1 mx-auto w-full" style={{ maxWidth: '538px' }}>
              {COLLAGE.map((src, i) => (
                <div
                  key={i}
                  className="card overflow-hidden w-full aspect-[267/280]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Consultation CTA — form opens in a lightbox popup */}
            <div className="mx-auto w-full flex flex-col justify-center" style={{ maxWidth: '499px' }}>
              <p
                className="mb-4"
                style={{ fontFamily: "'Novecento Wide Book', sans-serif", fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase', color: TAUPE }}
              >
                Doctor-led &middot; Free &middot; No obligation
              </p>
              <h3
                className="mb-5"
                style={{ fontFamily: "'Trajan Pro', serif", fontWeight: 400, fontSize: '22px', color: GREEN, textTransform: 'uppercase', lineHeight: 1.4 }}
              >
                Meet our weight loss doctors — your personalised plan starts here
              </h3>
              <p className="mb-8" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', lineHeight: 1.7, color: TAUPE }}>
                Our medically qualified team reviews your goals, health history and current weight to build a programme that fits your body, your lifestyle and your timeline. Book your free consultation and get a clear picture of what&rsquo;s possible for you.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <BookConsultationButton variant="filled" style={{ fontSize: '13px', padding: '16px 40px' }}>
                  Book Your Free Consultation
                </BookConsultationButton>
              </div>
              <p className="mt-4" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '12px', color: TAUPE, opacity: 0.75 }}>
                ★ 4.9 from 200+ reviews &middot; Limited places each month
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Opening hours + contact icons */}
      <section className="pb-14" style={{ backgroundColor: '#FFFFFF', paddingTop: '88px' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p
            className="uppercase mb-2"
            style={{
              fontFamily: "'Trajan Pro', serif",
              fontSize: '25px',
              letterSpacing: '5px',
              color: GREEN,
            }}
          >
            Opening Hours
          </p>
          <div
            className="flex justify-center items-center gap-8 mb-2"
            style={{ fontSize: '15px', color: TAUPE, fontFamily: 'Roboto, sans-serif' }}
          >
            <p>Mon - Sun</p>
            <p>8:00 am – 8:00 pm</p>
          </div>
          <p className="mb-5">
            <a
              href="mailto:info@carismaslimming.com"
              className="uppercase underline transition hover:no-underline"
              style={{ color: '#6f6456', fontFamily: '"Novecento Wide", sans-serif', fontSize: '16px' }}
            >
              info@carismaslimming.com
            </a>
          </p>

          <div className="flex flex-col md:flex-row justify-center items-center md:items-end gap-8 md:gap-0">
            <div className="flex flex-col items-center gap-2 md:w-[209px]">
              <a
                href="mailto:info@carismaaesthetics.com?subject=Get%20in%20touch%20with%20us!"
                aria-label="Email"
                className="transition hover:opacity-80"
                style={{ color: GREEN }}
              >
                <svg width="51" height="37" viewBox="0 0 26 19" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="1" y="1" width="24" height="17" rx="2" />
                  <path d="m1.5 2.5 11.5 8.5 11.5-8.5" />
                  <path d="m2 17 8-6.8" />
                  <path d="m24 17-8-6.8" />
                </svg>
              </a>
              <a
                href="mailto:info@carismaslimming.com"
                className="underline transition hover:no-underline"
                style={{ color: GREEN, fontSize: '15px', fontFamily: 'Roboto, sans-serif' }}
              >
                info@carismaslimming.com
              </a>
            </div>
            <div className="flex flex-col items-center gap-2 md:w-[209px]">
              <a
                href="https://www.instagram.com/carismaaesthetics/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="transition hover:opacity-80"
                style={{ color: GREEN }}
              >
                <svg width="47" height="47" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <span style={{ color: GREEN, fontSize: '15px', fontFamily: 'Roboto, sans-serif' }}>
                carismaslimming
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 md:w-[209px]">
              <a
                href="https://www.facebook.com/carismaaesthetics/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="transition hover:opacity-80"
                style={{ color: GREEN }}
              >
                <svg width="47" height="47" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="12" fill="currentColor" />
                  <path
                    fill="#FFFFFF"
                    d="M13.5 23v-9h2.3l.4-2.8h-2.7V9.4c0-.8.2-1.4 1.4-1.4h1.4V5.6c-.3 0-1.1-.1-2.1-.1-2 0-3.4 1.2-3.4 3.5v2.2H8.4V14h2.4v9h2.7Z"
                  />
                </svg>
              </a>
              <span style={{ color: GREEN, fontSize: '15px', fontFamily: 'Roboto, sans-serif' }}>
                Carisma Slimming
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map */}
      <section className="pb-14" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '980px' }}>
          <div className="card overflow-hidden" style={{ lineHeight: 0 }}>
            <iframe
              src="https://maps.google.com/maps?q=Carisma%20Slimming%2C%20Malta&z=15&output=embed"
              style={{ width: '100%', height: '350px', border: 'none' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Carisma Slimming map"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
