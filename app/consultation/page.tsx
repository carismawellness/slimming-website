const GREEN = '#8EB093';
const GREEN_DARK = '#7CA081';
const TAUPE = '#9B8D83';
const TAUPE_LIGHT = '#AFA39D';
const FIELD_BG = '#F0EEEA';

const FRESHA_BOOKING_URL =
  'https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2843963&eid=5009163&oiid=sv%3A25969858&share=true&pId=2708191';

const COLLAGE = [
  '/wix/87fc13_08e868147da2475ba4b9638849be145e~mv2.jpg',
  '/wix/87fc13_6d89e9c129304617a960aa46bb07eed4~mv2.jpg',
  '/wix/87fc13_d79664fae1184e8e8c947c3d350af498~mv2.jpg',
  '/wix/11062b_926c2ba259264b22bed8a16f8021e64b~mv2.jpg',
];

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function ConsultationPage() {
  return (
    <main className="w-full" style={{ color: TAUPE }}>
      {/* CONTACT US banner */}
      <section style={{ backgroundColor: GREEN }} className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            className="uppercase tracking-[0.3em] text-2xl md:text-3xl text-white"
            style={{ fontFamily: "'Trajan Pro', serif" }}
          >
            Contact Us
          </h1>
        </div>
      </section>

      {/* BOOK YOUR SLIMMING CONSULTATION heading bar */}
      <section className="py-12" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="text-center py-7 px-6"
            style={{ backgroundColor: GREEN }}
          >
            <h2
              className="uppercase tracking-[0.18em] text-xl md:text-3xl text-white"
              style={{ fontFamily: "'Trajan Pro', serif" }}
            >
              Book Your Slimming Consultation
            </h2>
          </div>
        </div>
      </section>

      {/* Collage + booking form */}
      <section className="pb-12" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            {/* Photo collage */}
            <div className="grid grid-cols-2 gap-5">
              {COLLAGE.map((src, i) => (
                <div
                  key={i}
                  className="rounded-full overflow-hidden aspect-square w-full"
                  style={{ marginTop: i % 2 === 1 ? '2.5rem' : 0 }}
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

            {/* Booking form */}
            <form
              action={FRESHA_BOOKING_URL}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    className="block text-sm mb-2"
                    style={{ color: TAUPE }}
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full border-0 px-4 py-3 text-sm outline-none"
                    style={{ backgroundColor: FIELD_BG, color: TAUPE }}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm mb-2"
                    style={{ color: TAUPE }}
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full border-0 px-4 py-3 text-sm outline-none"
                    style={{ backgroundColor: FIELD_BG, color: TAUPE }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ color: TAUPE }}>
                  Email
                </label>
                <input
                  type="email"
                  className="w-full border-0 px-4 py-3 text-sm outline-none"
                  style={{ backgroundColor: FIELD_BG, color: TAUPE }}
                />
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ color: TAUPE }}>
                  Phone
                </label>
                <input
                  type="tel"
                  className="w-full border-0 px-4 py-3 text-sm outline-none"
                  style={{ backgroundColor: FIELD_BG, color: TAUPE }}
                />
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ color: TAUPE }}>
                  Preferred Treatment
                </label>
                <select
                  className="w-full border-0 px-4 py-3 text-sm outline-none"
                  style={{ backgroundColor: FIELD_BG, color: TAUPE }}
                  defaultValue=""
                >
                  <option value="">Select your weight loss / aesthetic interest</option>
                  <option>Medical Weight Loss</option>
                  <option>GLP-1 Programme</option>
                  <option>Body Contouring</option>
                  <option>Other</option>
                </select>
              </div>

              <button
                type="submit"
                className="uppercase tracking-[0.2em] text-sm text-white px-10 py-3 transition hover:opacity-90"
                style={{ backgroundColor: GREEN }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Opening hours + contact icons */}
      <section className="py-14" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p
            className="uppercase tracking-[0.3em] text-sm mb-6"
            style={{ color: TAUPE_LIGHT }}
          >
            Opening Hours
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-3">
            {DAYS.map((d) => (
              <span
                key={d}
                className="uppercase tracking-[0.15em] text-xs px-4 py-2"
                style={{ border: `1px solid ${GREEN}`, color: GREEN }}
              >
                {d}
              </span>
            ))}
          </div>
          <p className="text-sm mb-10" style={{ color: TAUPE }}>
            8:00 am – 8:00 pm
          </p>

          <div className="flex justify-center items-center gap-8">
            <a
              href="mailto:info@carismaslimming.com"
              aria-label="Email"
              className="transition hover:opacity-80"
              style={{ color: GREEN }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m2 6 10 7L22 6" />
              </svg>
            </a>
            <a
              href="tel:+35627802062"
              aria-label="Phone"
              className="transition hover:opacity-80"
              style={{ color: GREEN }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="transition hover:opacity-80"
              style={{ color: GREEN }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="transition hover:opacity-80"
              style={{ color: GREEN }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.5 21v-7h2.3l.4-2.8h-2.7V9.4c0-.8.2-1.4 1.4-1.4h1.4V5.6c-.3 0-1.1-.1-2.1-.1-2 0-3.4 1.2-3.4 3.5v2.2H8.4V14h2.4v7h2.7Z" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
