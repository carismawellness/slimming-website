import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <main className="w-full">
      {/* Hero / Title */}
      <section className="py-16" style={{ backgroundColor: '#EEF3F0' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            className="leading-tight"
            style={{ color: '#7ba587', fontFamily: 'Trajan Pro, serif', fontWeight: '400', fontSize: '40px', letterSpacing: '1px' }}
          >
            privacy policy
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p
            className="mb-10"
            style={{ color: '#9B8D83', fontFamily: 'Roboto, sans-serif', fontSize: '16px', lineHeight: '1.8' }}
          >
            This privacy policy outlines how we collect, use, and protect personal data that patients provide us in relation to med-aesthetic services.
          </p>

          {/* Information Collection and Use */}
          <h2
            className="mt-10 mb-4"
            style={{ color: '#8EB093', fontFamily: 'Trajan Pro, serif', fontWeight: '400', fontSize: '22px', letterSpacing: '0.5px' }}
          >
            Information Collection and Use
          </h2>
          <p
            className="mb-8"
            style={{ color: '#9B8D83', fontFamily: 'Roboto, sans-serif', fontSize: '16px', lineHeight: '1.8' }}
          >
            We may collect personal data such as name, contact information, and medical history from patients for the purpose of providing med-aesthetic services. We may also collect data such as photographs and video footage for treatment monitoring and documentation.
          </p>

          {/* Third-Party Disclosure */}
          <h2
            className="mt-10 mb-4"
            style={{ color: '#8EB093', fontFamily: 'Trajan Pro, serif', fontWeight: '400', fontSize: '22px', letterSpacing: '0.5px' }}
          >
            Third-Party Disclosure
          </h2>
          <p
            className="mb-8"
            style={{ color: '#9B8D83', fontFamily: 'Roboto, sans-serif', fontSize: '16px', lineHeight: '1.8' }}
          >
            We do not share personal data with third-party vendors or partners, except as required by law or with the patient&apos;s explicit consent.
          </p>

          {/* User Choices */}
          <h2
            className="mt-10 mb-4"
            style={{ color: '#8EB093', fontFamily: 'Trajan Pro, serif', fontWeight: '400', fontSize: '22px', letterSpacing: '0.5px' }}
          >
            User Choices
          </h2>
          <p
            className="mb-8"
            style={{ color: '#9B8D83', fontFamily: 'Roboto, sans-serif', fontSize: '16px', lineHeight: '1.8' }}
          >
            Patients have the option to opt-out of marketing communications or delete their personal data at any time by contacting us through our website.
          </p>

          {/* Related link */}
          <div className="mt-12 pt-8" style={{ borderTop: '1px solid #e0e0e0' }}>
            <Link
              href="/terms-conditions"
              style={{ color: '#8EB093', fontFamily: 'Novecento Wide Book, sans-serif', fontSize: '14px', fontWeight: '600', letterSpacing: '0.5px' }}
            >
              TERMS &amp; CONDITION
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
