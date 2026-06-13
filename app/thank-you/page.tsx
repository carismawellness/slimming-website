import type { Metadata } from 'next';

const wideFont     = "'Novecento Wide', sans-serif";
const wideBookFont = "'Novecento Wide Book', sans-serif";
const bodyFont     = 'Roboto, sans-serif';
const taupe        = '#9B8D83';
const taupeLight   = '#AFA39D';

const HERO_IMG = '/wix/3dbfd5_5efd9c160e224eb4974f9d7f6e145e70~mv2.png';

export const metadata: Metadata = {
  title: 'Thank you | Carisma Slimming',
  description: 'Your enquiry has been received. A member of our team will be in touch shortly.',
};

const paragraphs = [
  'Thank you for taking the first step towards a healthier, slimmer and more confident you.',
  'We're looking forward to learning more about your goals and recommending a personalised plan that works for your lifestyle.',
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
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
        />

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
          <div style={{ maxWidth: '430px' }}>
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
              THANK YOU
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
          <h1
            style={{
              fontFamily: wideFont,
              fontWeight: 400,
              fontSize: '32px',
              lineHeight: '1.2em',
              color: taupe,
              marginBottom: '14px',
            }}
          >
            THANK YOU
          </h1>
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
        </div>
      </section>

    </main>
  );
}
