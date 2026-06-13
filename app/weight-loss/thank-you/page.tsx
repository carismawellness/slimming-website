import type { Metadata } from 'next';

const wideFont = "'Novecento Wide', sans-serif";
const wideBookFont = "'Novecento Wide Book', sans-serif";
const bodyFont = 'Roboto, sans-serif';
const taupe = '#9B8D83';

const HERO_IMG = '/wix/3dbfd5_5efd9c160e224eb4974f9d7f6e145e70~mv2.png';

export const metadata: Metadata = {
  title: 'Thank you | Carisma Slimming',
  description:
    'Medical weight loss in Malta. Your enquiry has been received and our team will be in touch shortly.',
};

const paragraphs = [
  'Thank you for taking the first step towards a healthier, slimmer and more confident you.',
  'We're looking forward to learning more about your goals and recommending a personalised plan that works for your lifestyle.',
  'A member of our team will be in touch shortly to answer your questions and guide you through the next steps.',
];

export default function WeightLossThankYouPage() {
  return (
    <main className="w-full" style={{ backgroundColor: '#FFFFFF' }}>
      {/* Desktop */}
      <section className="hidden md:block">
        <div className="relative mx-auto" style={{ width: '980px', height: '500px' }}>
          <div
            className="absolute overflow-hidden"
            style={{ left: 0, top: 0, width: '975px', height: '500px' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={HERO_IMG}
              alt="image.png"
              className="absolute"
              style={{ width: '100%', height: 'auto', maxWidth: 'none', left: 0, top: '-4.4416%' }}
            />
          </div>
          <h2
            className="absolute"
            style={{
              left: '24px',
              top: '41px',
              width: '450px',
              fontFamily: wideFont,
              fontWeight: 400,
              fontSize: '48px',
              lineHeight: '1.4em',
              color: taupe,
            }}
          >
            THANK YOU
          </h2>
          <h3
            className="absolute"
            style={{
              left: '23px',
              top: '126px',
              width: '450px',
              fontFamily: wideBookFont,
              fontWeight: 400,
              fontSize: '15px',
              lineHeight: '1.4em',
              color: taupe,
            }}
          >
            YOUR ENQUIRY HAS BEEN RECEIVED.
          </h3>
          <div
            className="absolute"
            style={{
              left: '24px',
              top: '171px',
              width: '394px',
              fontFamily: bodyFont,
              fontWeight: 400,
              fontSize: '18px',
              lineHeight: '1.4em',
              color: taupe,
            }}
          >
            {paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile */}
      <section className="md:hidden" style={{ padding: '12px 12px 32px' }}>
        <div className="relative mx-auto" style={{ maxWidth: '420px' }}>
          <div className="relative overflow-hidden" style={{ aspectRatio: '564 / 845' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={HERO_IMG}
              alt="image.png"
              className="absolute"
              style={{ width: '272.34%', height: 'auto', maxWidth: 'none', left: '-91.134%', top: '-9.408%' }}
            />
          </div>
          <h3
            className="absolute"
            style={{
              left: '9.4%',
              top: '9.7%',
              width: '56.6%',
              fontFamily: wideBookFont,
              fontWeight: 400,
              fontSize: '15px',
              lineHeight: '1.4em',
              color: taupe,
            }}
          >
            YOUR ENQUIRY HAS BEEN RECEIVED.
          </h3>
          <div
            className="absolute"
            style={{
              left: '9.4%',
              top: '22.2%',
              width: '56.6%',
              fontFamily: bodyFont,
              fontWeight: 400,
              fontSize: '13px',
              lineHeight: '1.4em',
              color: taupe,
            }}
          >
            {paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
          <h2
            className="absolute"
            style={{
              left: '9.4%',
              top: '77.8%',
              fontFamily: wideFont,
              fontWeight: 400,
              fontSize: '13px',
              lineHeight: '1.4em',
              color: taupe,
            }}
          >
            THANK YOU
          </h2>
        </div>
      </section>
    </main>
  );
}
