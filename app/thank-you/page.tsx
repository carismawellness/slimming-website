import Image from 'next/image';
import type { Metadata } from 'next';

const wideFont     = "'Novecento Wide', sans-serif";
const wideBookFont = "'Novecento Wide Book', sans-serif";
const bodyFont     = 'Roboto, sans-serif';
// Darkened taupe (from #9B8D83) so it clears WCAG AA on the #F5EDE8 cream panel
// and over the hero image (guaranteed by the cream scrim behind the text column).
// #6f6456 = 5.00:1 on cream; >= 4.58:1 worst-case over the 0.96-opacity scrim.
const taupe        = '#6f6456';
// Muted subline kept in the same taupe family; hierarchy preserved via size/letter-spacing/uppercase.
const taupeLight   = '#6f6456';

const HERO_IMG = '/wix/3dbfd5_5efd9c160e224eb4974f9d7f6e145e70~mv2.webp';

// Fresha "free body composition analysis" booking flow — the second step of the
// lead funnel, moved here from the consultation modal so leads land on a real
// /thank-you page (fires the GTM conversion) and can still book their slot.
// target="_blank" + data-direct-booking → bypasses the site-wide modal interceptor.
const FRESHA_URL =
  'https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2843963&eid=5084222&oiid=sv%3A26105577&share=true&pId=2708191';

function ChooseTimeCta() {
  return (
    <div style={{ marginTop: '26px' }}>
      <a
        href={FRESHA_URL}
        target="_blank"
        rel="noopener noreferrer"
        data-direct-booking
        className="cta-glow inline-flex items-center justify-center font-bold text-white"
        style={{
          fontFamily: wideBookFont,
          fontSize: '13px',
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
          padding: '16px 40px',
          borderRadius: '999px',
          border: 'none',
          textDecoration: 'none',
          backgroundColor: '#4f7256',
          minHeight: '44px',
        }}
      >
        Choose Your Time &rsaquo;
      </a>
      <p
        style={{
          fontFamily: bodyFont,
          fontSize: '13px',
          color: taupe,
          opacity: 0.8,
          margin: '12px 0 0',
        }}
      >
        Book your free body composition analysis — limited places each month.
      </p>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Thank You | Carisma Slimming",
  robots: { index: false, follow: true },
};

const paragraphs = [
  'Thank you for taking the first step towards a healthier, slimmer and more confident you.',
  "We're looking forward to learning more about your goals and recommending a personalised plan that works for your lifestyle.",
  'A member of our team will be in touch shortly to answer your questions and guide you through the next steps.',
];

export default function ThankYouPage() {
  return (
    <main className="w-full" style={{ backgroundColor: '#F5EDE8' }}>

      {/* ── Desktop ── */}
      <section
        className="hidden md:block"
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '520px',
          overflow: 'hidden',
          backgroundColor: '#F5EDE8',
        }}
      >
        <Image
          src={HERO_IMG}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-4%',
            left: 0,
            width: '100%',
            height: '115%',
            objectFit: 'cover',
            objectPosition: 'top center',
            pointerEvents: 'none',
          }}
         width={1200} height={900} sizes="(max-width: 768px) 100vw, 640px" />

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '70px 60px',
            minHeight: '520px',
          }}
        >
          {/* Cream scrim behind the text column guarantees AA contrast over the hero image:
              rgba(245,237,232,0.96) yields worst-case 4.58:1 (black image) / 5.03:1 (white) for #6f6456 text. */}
          <div
            style={{
              maxWidth: '430px',
              backgroundColor: 'rgba(245, 237, 232, 0.96)',
              padding: '28px 30px',
              borderRadius: '16px',
            }}
          >
            <h1
              style={{
                fontFamily: wideFont,
                fontWeight: 400,
                fontSize: '52px',
                lineHeight: '1.2em',
                color: taupe,
                marginBottom: '22px',
              }}
            >
              THANK YOU — WE&rsquo;LL BE IN TOUCH SHORTLY
            </h1>

            <p
              style={{
                fontFamily: wideBookFont,
                fontWeight: 400,
                fontSize: '14px',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: taupeLight,
                marginBottom: '28px',
              }}
            >
              YOUR ENQUIRY HAS BEEN RECEIVED.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {paragraphs.map((text) => (
                <p
                  key={text}
                  style={{
                    fontFamily: bodyFont,
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '1.55em',
                    color: taupe,
                    margin: 0,
                  }}
                >
                  {text}
                </p>
              ))}
            </div>
            <ChooseTimeCta />
          </div>
        </div>
      </section>

      {/* ── Mobile ── */}
      <section className="md:hidden">
        <div style={{ position: 'relative', width: '100%', aspectRatio: '9 / 11', overflow: 'hidden' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_IMG}
            alt=""
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '-4%',
              left: '-33%',
              width: '170%',
              height: 'auto',
              pointerEvents: 'none',
            }}
          />
        </div>

        <div style={{ padding: '32px 24px 40px', backgroundColor: '#F5EDE8' }}>
          {/* Mobile heading rendered as styled <p> (not <h1>) so the page keeps exactly one <h1> in the DOM */}
          <p
            style={{
              fontFamily: wideFont,
              fontWeight: 400,
              fontSize: '32px',
              lineHeight: '1.2em',
              color: taupe,
              marginBottom: '14px',
            }}
          >
            THANK YOU — WE&rsquo;LL BE IN TOUCH SHORTLY
          </p>
          <p
            style={{
              fontFamily: wideBookFont,
              fontWeight: 400,
              fontSize: '12px',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color: taupeLight,
              marginBottom: '20px',
            }}
          >
            YOUR ENQUIRY HAS BEEN RECEIVED.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {paragraphs.map((text) => (
              <p
                key={text}
                style={{
                  fontFamily: bodyFont,
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '1.55em',
                  color: taupe,
                  margin: 0,
                }}
              >
                {text}
              </p>
            ))}
          </div>
          <ChooseTimeCta />
        </div>
      </section>

    </main>
  );
}
