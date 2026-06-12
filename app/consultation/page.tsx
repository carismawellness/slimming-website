import Script from 'next/script';

const GREEN = '#8EB093';
const TAUPE = '#9B8D83';

const COLLAGE = [
  '/wix/87fc13_170da1f718f64c8b8e1a1a86083e1a72~mv2.png',
  '/wix/87fc13_59d15b41b3c1462788d0a0843b859d0b~mv2.png',
  '/wix/87fc13_73555ee869874f3c8a90fd5bb62d19e8~mv2.png',
  '/wix/87fc13_074438e081814932aa4c2fe6dc450e57~mv2.png',
];

// Wix "petal" shapes: alternating corner radii per collage slot
const COLLAGE_RADII = [
  '15px 140px',
  '140px 15px',
  '140px 15px',
  '15px 140px',
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
            Contact Us
          </h1>
          <div style={{ width: '284px', height: '1px', backgroundColor: '#FFFFFF', margin: '7px auto 0' }} />
        </div>
      </section>

      {/* BOOK YOUR SLIMMING CONSULTATION heading bar */}
      <section className="py-12" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="mx-auto px-4 md:px-0" style={{ maxWidth: '980px' }}>
          <div
            className="flex items-center justify-center text-center px-6"
            style={{ backgroundColor: '#95AF95', minHeight: '120px' }}
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
              Book Your Slimming Consultation
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
                  className="overflow-hidden w-full aspect-[267/280]"
                  style={{ borderRadius: COLLAGE_RADII[i] }}
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

            {/* Booking form — GoHighLevel (LeadConnector) embedded web form,
                same widget the live page embeds (499x627). */}
            <div className="mx-auto w-full" style={{ maxWidth: '499px' }}>
              <iframe
                src="https://api.leadconnectorhq.com/widget/form/Z3VHJCJwj5mBGmqcdmpE"
                style={{ width: '100%', height: '627px', border: 'none' }}
                id="inline-contact-Z3VHJCJwj5mBGmqcdmpE"
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="WEB FORM"
                data-height="627"
                data-layout-iframe-id="inline-contact-Z3VHJCJwj5mBGmqcdmpE"
                data-form-id="Z3VHJCJwj5mBGmqcdmpE"
                title="WEB FORM"
              />
              <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
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
              className="uppercase transition hover:opacity-80"
              style={{ color: '#B0A68F', fontFamily: '"Novecento Wide", sans-serif', fontSize: '16px' }}
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
                className="transition hover:opacity-80"
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
          <iframe
            src="https://maps.google.com/maps?q=Carisma%20Slimming%2C%20Malta&z=15&output=embed"
            style={{ width: '100%', height: '350px', border: 'none' }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Carisma Slimming map"
          />
        </div>
      </section>
    </main>
  );
}
