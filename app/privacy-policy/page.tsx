import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Privacy Policy | Carisma Slimming",
  description: "Check Privacy Policy of Carisma Slimming that outlines how we collect, use, and protect personal data that patients provide us in relation to med-aesthetic services.",
  alternates: { canonical: 'https://www.carismaslimming.com/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="w-full">
      {/* Title + Content */}
      <section style={{ paddingTop: '41px', paddingBottom: '95px' }}>
        <div className="mx-auto px-4 sm:px-6 lg:px-0" style={{ maxWidth: '980px' }}>
          <h1
            className="text-center text-[40px] leading-[56px] md:text-[50px] md:leading-[70px]"
            style={{ color: '#6f6456', fontFamily: 'Trajan Pro, serif', fontWeight: '400', marginBottom: '0px' }}
          >
            Privacy Policy
          </h1>
          <div
            aria-hidden="true"
            style={{ width: '399px', maxWidth: '100%', borderTop: '1px solid #6f6456', margin: '0 auto 53px' }}
          />

          <p
            style={{ color: '#6f6456', fontFamily: 'Roboto, sans-serif', fontSize: '15px', lineHeight: '21px', marginBottom: '21px' }}
          >
            This privacy policy outlines how we collect, use, and protect personal data that patients provide us in relation to med-aesthetic services.
          </p>

          {/* Information Collection and Use */}
          <h2
            style={{ color: '#6f6456', fontFamily: 'Trajan Pro, serif', fontWeight: '400', fontSize: '20px', lineHeight: '28px', marginBottom: '21px' }}
          >
            How We Collect and Use Your Personal Data
          </h2>
          <p
            style={{ color: '#6f6456', fontFamily: 'Roboto, sans-serif', fontSize: '15px', lineHeight: '21px', marginBottom: '21px' }}
          >
            We may collect personal data such as name, contact information, and medical history from patients for the purpose of providing med-aesthetic services. We may also collect data such as photographs and video footage for treatment monitoring and documentation.
          </p>

          {/* Third-Party Disclosure */}
          <h2
            style={{ color: '#6f6456', fontFamily: 'Trajan Pro, serif', fontWeight: '400', fontSize: '20px', lineHeight: '28px', marginBottom: '21px' }}
          >
            Third-Party Data Sharing & Disclosure
          </h2>
          <p
            style={{ color: '#6f6456', fontFamily: 'Roboto, sans-serif', fontSize: '15px', lineHeight: '21px', marginBottom: '21px' }}
          >
            We do not share personal data with third-party vendors or partners, except as required by law or with the patient&apos;s explicit consent.
          </p>

          {/* User Choices */}
          <h2
            style={{ color: '#6f6456', fontFamily: 'Trajan Pro, serif', fontWeight: '400', fontSize: '20px', lineHeight: '28px', marginBottom: '21px' }}
          >
            Your Rights & Data Choices Under GDPR
          </h2>
          <p
            style={{ color: '#6f6456', fontFamily: 'Roboto, sans-serif', fontSize: '15px', lineHeight: '21px' }}
          >
            Patients have the option to opt-out of marketing communications or delete their personal data at any time by contacting us through our website.
          </p>
        </div>
      </section>
    </main>
  );
}
