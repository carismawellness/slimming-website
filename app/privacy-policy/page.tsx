import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Privacy Policy | Carisma Slimming",
  description: "How Carisma Slimming collects, uses and protects your personal data. GDPR-compliant privacy policy for our Malta medical slimming clinic.",
  alternates: { canonical: 'https://www.carismaslimming.com/privacy-policy' },
  robots: { index: true, follow: true },
};

/* ── Section data ─────────────────────────────────────────────────────────── */
const TOC_SECTIONS = [
  { id: 'introduction',         label: '1. Introduction' },
  { id: 'data-controller',      label: '2. Data Controller' },
  { id: 'data-collected',       label: '3. Personal Data We Collect' },
  { id: 'legal-bases',          label: '4. Legal Bases for Processing' },
  { id: 'how-we-use',           label: '5. How We Use Your Data' },
  { id: 'cookies',              label: '6. Cookies & Website Tracking' },
  { id: 'data-sharing',         label: '7. Data Sharing' },
  { id: 'international',        label: '8. International Transfers' },
  { id: 'retention',            label: '9. Data Retention' },
  { id: 'security',             label: '10. Security' },
  { id: 'your-rights',          label: '11. Your Rights Under GDPR' },
  { id: 'marketing',            label: '12. Marketing Communications' },
  { id: 'children',             label: '13. Children\'s Data' },
  { id: 'breach',               label: '14. Data Breach' },
  { id: 'policy-changes',       label: '15. Changes to This Policy' },
  { id: 'contact-complaints',   label: '16. Contact & Complaints' },
];

/* ── Reusable style helpers ───────────────────────────────────────────────── */
const HEADING_STYLE: React.CSSProperties = {
  fontFamily: 'Trajan Pro, serif',
  fontWeight: 400,
  color: '#024C27',
  fontSize: '22px',
  lineHeight: '32px',
  marginBottom: '16px',
  marginTop: '0',
};

const BODY_STYLE: React.CSSProperties = {
  fontFamily: 'Roboto, sans-serif',
  fontSize: '15px',
  lineHeight: '1.7',
  color: '#6f6456',
  marginBottom: '14px',
};

const LABEL_STYLE: React.CSSProperties = {
  fontFamily: '"Novecento Wide", sans-serif',
  fontSize: '11px',
  letterSpacing: '3px',
  textTransform: 'uppercase' as const,
  color: '#4f7256',
  fontWeight: 500,
};

/* ── Sub-components ───────────────────────────────────────────────────────── */
function SectionBlock({
  id,
  number,
  title,
  alt,
  children,
}: {
  id: string;
  number: string;
  title: string;
  alt?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      style={{ backgroundColor: alt ? '#F2F6EF' : '#ffffff' }}
    >
      <div
        className="mx-auto px-6 lg:px-0"
        style={{ maxWidth: '860px', paddingTop: '56px', paddingBottom: '56px' }}
      >
        <div style={{ position: 'relative', marginBottom: '24px' }}>
          {/* Watermark number */}
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '-12px',
              left: '-8px',
              fontSize: '72px',
              fontFamily: 'Trajan Pro, serif',
              fontWeight: 400,
              color: 'rgba(79,114,86,0.07)',
              lineHeight: 1,
              userSelect: 'none',
            }}
          >
            {number}
          </span>
          {/* Section label */}
          <p style={{ ...LABEL_STYLE, marginBottom: '8px', position: 'relative' }}>
            Section {number}
          </p>
          <h2 style={{ ...HEADING_STYLE, position: 'relative' }}>{title}</h2>
          {/* Divider */}
          <div
            style={{
              width: '48px',
              height: '2px',
              backgroundColor: '#C9D8C1',
              borderRadius: '1px',
            }}
          />
        </div>
        {children}
      </div>
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p style={BODY_STYLE}>{children}</p>;
}

function BulletList({ items }: { items: (string | React.ReactNode)[] }) {
  return (
    <ul
      style={{
        paddingLeft: '20px',
        marginBottom: '16px',
        listStyleType: 'none',
      }}
    >
      {items.map((item, i) => (
        <li
          key={i}
          style={{
            ...BODY_STYLE,
            marginBottom: '8px',
            paddingLeft: '16px',
            position: 'relative',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: 0,
              top: '7px',
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              backgroundColor: '#4f7256',
              display: 'inline-block',
            }}
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        fontFamily: 'Trajan Pro, serif',
        fontWeight: 400,
        fontSize: '15px',
        color: '#024C27',
        letterSpacing: '0.3px',
        marginBottom: '10px',
        marginTop: '24px',
      }}
    >
      {children}
    </h3>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────────── */
export default function PrivacyPolicyPage() {
  return (
    <main className="w-full">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: '#024C27', paddingTop: '80px', paddingBottom: '72px' }}>
        <div className="mx-auto px-6 lg:px-0 text-center" style={{ maxWidth: '860px' }}>
          {/* Eyebrow */}
          <p style={{ ...LABEL_STYLE, color: '#C9D8C1', marginBottom: '20px' }}>
            Privacy Policy
          </p>

          {/* H1 */}
          <h1
            style={{
              fontFamily: 'Trajan Pro, serif',
              fontWeight: 400,
              fontSize: 'clamp(36px, 5vw, 52px)',
              lineHeight: 1.18,
              color: '#ffffff',
              marginBottom: '20px',
            }}
          >
            Your Privacy Matters
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: '17px',
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.78)',
              maxWidth: '560px',
              margin: '0 auto 32px',
            }}
          >
            We are committed to protecting your personal data and being fully
            transparent about how we collect, use, and safeguard it.
          </p>

          {/* Last Updated badge */}
          <span
            style={{
              display: 'inline-block',
              backgroundColor: 'rgba(201,216,193,0.18)',
              border: '1px solid rgba(201,216,193,0.40)',
              borderRadius: '999px',
              padding: '6px 20px',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '13px',
              color: '#C9D8C1',
              letterSpacing: '0.4px',
            }}
          >
            Last Updated: 22 June 2026
          </span>

          {/* Thin divider */}
          <div
            style={{
              width: '48px',
              height: '1px',
              backgroundColor: 'rgba(201,216,193,0.35)',
              margin: '40px auto 0',
            }}
          />
        </div>
      </section>

      {/* ── QUICK COMMITMENTS STRIP ───────────────────────────────────────── */}
      <section style={{ backgroundColor: '#FAF7F4', borderBottom: '1px solid #C9D8C1' }}>
        <div
          className="mx-auto px-6 lg:px-0"
          style={{
            maxWidth: '860px',
            paddingTop: '36px',
            paddingBottom: '36px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '28px',
          }}
        >
          {/* Commitment 1 */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
            <span style={{ flexShrink: 0, marginTop: '2px' }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <rect width="28" height="28" rx="8" fill="#024C27" fillOpacity="0.08"/>
                <path d="M14 6C11.24 6 9 8.24 9 11v1H8a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-1v-1c0-2.76-2.24-5-5-5Zm0 2c1.66 0 3 1.34 3 3v1h-6v-1c0-1.66 1.34-3 3-3Zm0 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z" fill="#024C27"/>
              </svg>
            </span>
            <div>
              <p style={{ ...LABEL_STYLE, color: '#024C27', marginBottom: '4px' }}>Data Safety</p>
              <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', color: '#6f6456', lineHeight: 1.5, margin: 0 }}>
                Your data is never sold to third parties.
              </p>
            </div>
          </div>

          {/* Commitment 2 */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
            <span style={{ flexShrink: 0, marginTop: '2px' }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <rect width="28" height="28" rx="8" fill="#024C27" fillOpacity="0.08"/>
                <path d="M14 7c-3.86 0-7 3.14-7 7s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7Zm0 2a5 5 0 1 1 0 10A5 5 0 0 1 14 9Zm-.5 2v4.25l3.5 2.08.5-.87-3-1.79V11h-1Z" fill="#024C27"/>
              </svg>
            </span>
            <div>
              <p style={{ ...LABEL_STYLE, color: '#024C27', marginBottom: '4px' }}>Medical Data</p>
              <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', color: '#6f6456', lineHeight: 1.5, margin: 0 }}>
                Health records receive enhanced GDPR protection.
              </p>
            </div>
          </div>

          {/* Commitment 3 */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
            <span style={{ flexShrink: 0, marginTop: '2px' }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <rect width="28" height="28" rx="8" fill="#024C27" fillOpacity="0.08"/>
                <path d="M7 9a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1H7Zm0 2h14v.5l-7 4.5-7-4.5V11Zm0 2.74 6.45 4.14a1 1 0 0 0 1.1 0L21 13.74V18H7v-4.26Z" fill="#024C27"/>
              </svg>
            </span>
            <div>
              <p style={{ ...LABEL_STYLE, color: '#024C27', marginBottom: '4px' }}>Marketing</p>
              <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', color: '#6f6456', lineHeight: 1.5, margin: 0 }}>
                Unsubscribe from marketing at any time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TABLE OF CONTENTS ─────────────────────────────────────────────── */}
      <section style={{ backgroundColor: '#FAF7F4' }}>
        <div
          className="mx-auto px-6 lg:px-0"
          style={{ maxWidth: '860px', paddingTop: '48px', paddingBottom: '48px' }}
        >
          <p style={{ ...LABEL_STYLE, color: '#4f7256', marginBottom: '20px' }}>
            Contents
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '6px 32px',
            }}
          >
            {TOC_SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '13.5px',
                  color: '#4f7256',
                  textDecoration: 'none',
                  padding: '5px 0',
                  borderBottom: '1px solid #E8EFE5',
                  display: 'block',
                }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 1 — INTRODUCTION ──────────────────────────────────────── */}
      <SectionBlock id="introduction" number="01" title="Introduction" alt={false}>
        <P>
          Carisma Aesthetics Ltd., trading as Carisma Slimming (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;,
          or the &ldquo;Clinic&rdquo;), is a Malta-based medical slimming clinic registered under company
          number C&nbsp;106006. We provide a range of weight management, body contouring, and
          lifestyle services to patients in Malta and beyond.
        </P>
        <P>
          This Privacy Policy explains how we collect, use, store, and protect the personal
          information you provide to us — whether as a patient, website visitor, or marketing
          subscriber. It applies to all services offered through&nbsp;
          <a href="https://www.carismaslimming.com" style={{ color: '#4f7256' }}>
            www.carismaslimming.com
          </a>{' '}
          and at our clinic premises.
        </P>
        <P>
          We are committed to handling your personal data with care, in full compliance with
          the EU General Data Protection Regulation (GDPR), the Data Protection Act (Chapter
          586, Laws of Malta), and all other applicable data protection legislation.
        </P>
        <P>
          Please read this policy carefully. If you have any questions about how we process
          your data, contact us at&nbsp;
          <a href="mailto:info@carismaslimming.com" style={{ color: '#4f7256' }}>
            info@carismaslimming.com
          </a>.
        </P>
        <p
          style={{
            ...BODY_STYLE,
            borderLeft: '3px solid #C9D8C1',
            paddingLeft: '16px',
            fontStyle: 'italic',
            color: '#6f6456',
          }}
        >
          <strong style={{ fontStyle: 'normal', color: '#024C27' }}>Last Updated:</strong>{' '}
          22 June 2026. We may update this policy from time to time — see Section&nbsp;15 for
          how we notify you of changes.
        </p>
      </SectionBlock>

      {/* ── SECTION 2 — DATA CONTROLLER ───────────────────────────────────── */}
      <SectionBlock id="data-controller" number="02" title="Data Controller" alt>
        <P>
          The data controller responsible for your personal information is:
        </P>
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #C9D8C1',
            borderRadius: '8px',
            padding: '24px 28px',
            marginBottom: '20px',
          }}
        >
          <p style={{ ...BODY_STYLE, fontWeight: 600, color: '#024C27', marginBottom: '6px' }}>
            Carisma Aesthetics Ltd.
          </p>
          <p style={{ ...BODY_STYLE, marginBottom: '4px' }}>Trading as: <strong>Carisma Slimming</strong></p>
          <p style={{ ...BODY_STYLE, marginBottom: '4px' }}>Company Number: <strong>C 106006</strong></p>
          <p style={{ ...BODY_STYLE, marginBottom: '4px' }}>
            Registered Address: 35/16B Hever Court, Triq Moletta, Swieqi, SWQ 3532, Malta
          </p>
          <p style={{ ...BODY_STYLE, marginBottom: '0' }}>
            Email:{' '}
            <a href="mailto:info@carismaslimming.com" style={{ color: '#4f7256' }}>
              info@carismaslimming.com
            </a>
          </p>
        </div>
        <P>
          For all data protection queries — including access requests, erasure requests, or
          complaints — please contact us at the email address above. We aim to respond to all
          data-related requests within 30 calendar days.
        </P>
      </SectionBlock>

      {/* ── SECTION 3 — DATA COLLECTED ────────────────────────────────────── */}
      <SectionBlock id="data-collected" number="03" title="What Personal Data We Collect" alt={false}>
        <P>
          Depending on your relationship with us (patient, website visitor, or marketing
          subscriber), we may collect the following categories of personal data:
        </P>

        <SubHeading>a) Identity &amp; Contact Information</SubHeading>
        <BulletList items={[
          'Full name, date of birth, and gender',
          'Postal address, email address, and phone number',
          'Identity document number (where required for patient registration)',
          'Emergency contact details',
        ]} />

        <SubHeading>b) Health &amp; Medical Data (Special Category — GDPR Art. 9)</SubHeading>
        <P>
          Health data is a <em>special category</em> of personal data under GDPR and is
          afforded the highest level of protection. We collect:
        </P>
        <BulletList items={[
          'Medical history, pre-existing conditions, and past surgeries',
          'Current medications, allergies, and contraindications',
          'Mental health history relevant to safe treatment delivery',
          'Blood test results and diagnostic data (where required)',
          'Pregnancy and reproductive health information (relevant to treatment safety)',
        ]} />

        <SubHeading>c) Treatment &amp; Appointment Records</SubHeading>
        <BulletList items={[
          'Consultation notes and clinical assessments',
          'Treatment plans, progress notes, and session records',
          'Slimming Card check-in data and attendance logs',
          'Dosage records for prescribed medications (e.g. GLP-1 agonists)',
        ]} />

        <SubHeading>d) Photographs &amp; Body Measurements</SubHeading>
        <BulletList items={[
          'Before/after photographs taken for clinical monitoring and progress tracking',
          'Body measurements (weight, circumference, body composition)',
          'Photos used for marketing purposes only with your separate, explicit written consent',
        ]} />

        <SubHeading>e) Payment Data</SubHeading>
        <BulletList items={[
          'Billing name, address, and payment reference',
          'Transaction records for services rendered',
          'We do not store full card numbers — payments are processed by compliant third-party providers',
        ]} />

        <SubHeading>f) Website &amp; Marketing Data</SubHeading>
        <BulletList items={[
          'Cookie data and IP address (see Section 6 for full details)',
          'Email open and click data (for subscribers)',
          'Form submissions (consultation requests, free guide downloads, contact enquiries)',
          'Device type and browser information for website analytics',
        ]} />
      </SectionBlock>

      {/* ── SECTION 4 — LEGAL BASES ───────────────────────────────────────── */}
      <SectionBlock id="legal-bases" number="04" title="Legal Bases for Processing" alt>
        <P>
          We only process your personal data when we have a lawful basis to do so. The
          relevant legal bases under GDPR are as follows:
        </P>
        <BulletList items={[
          <><strong style={{ color: '#024C27' }}>Article 6(1)(b) — Performance of a contract:</strong> Processing your identity, contact, and appointment data is necessary to deliver the services you have contracted with us (e.g. booking consultations, administering your treatment programme).</>,
          <><strong style={{ color: '#024C27' }}>Article 9(2)(h) — Healthcare provision:</strong> Processing your health and medical data is necessary for the purposes of preventive medicine, medical diagnosis, provision of healthcare or treatment, subject to professional confidentiality obligations.</>,
          <><strong style={{ color: '#024C27' }}>Article 6(1)(c) — Legal obligation:</strong> We process certain data (e.g. clinical records, financial records) because we are legally required to do so under Maltese law, including medical record-keeping regulations and tax/accounting legislation.</>,
          <><strong style={{ color: '#024C27' }}>Article 6(1)(a) — Consent:</strong> For marketing communications, use of optional analytics cookies, and use of your photographs in promotional materials, we rely on your explicit consent. You may withdraw consent at any time without affecting the lawfulness of processing carried out before withdrawal.</>,
        ]} />
        <P>
          Where we rely on consent as a legal basis, withdrawal of that consent will not
          affect your access to clinical care. We will never make treatment conditional on
          consent to marketing.
        </P>
      </SectionBlock>

      {/* ── SECTION 5 — HOW WE USE YOUR DATA ─────────────────────────────── */}
      <SectionBlock id="how-we-use" number="05" title="How We Use Your Data" alt={false}>
        <P>We use the personal data we collect for the following purposes:</P>
        <BulletList items={[
          <><strong style={{ color: '#024C27' }}>Treatment delivery:</strong> Planning and administering your personalised slimming programme, including prescribing medication, conducting body contouring sessions, and delivering lifestyle interventions.</>,
          <><strong style={{ color: '#024C27' }}>Appointment management:</strong> Booking, confirming, reminding, and rescheduling your consultations and treatment sessions.</>,
          <><strong style={{ color: '#024C27' }}>Progress tracking:</strong> Monitoring your weight, measurements, and clinical outcomes over the course of your programme.</>,
          <><strong style={{ color: '#024C27' }}>Billing &amp; payment:</strong> Processing fees, issuing invoices, managing prepaid packages, and maintaining financial records.</>,
          <><strong style={{ color: '#024C27' }}>Legal &amp; regulatory compliance:</strong> Meeting our obligations under Maltese medical record-keeping law, tax legislation, and GDPR.</>,
          <><strong style={{ color: '#024C27' }}>Service improvement:</strong> Analysing anonymised, aggregated outcomes data to improve our programmes. Individual-level data is never used for this purpose.</>,
          <><strong style={{ color: '#024C27' }}>Marketing communications:</strong> Sending newsletters, offers, and health content — only where you have given explicit consent and only for as long as you remain subscribed.</>,
        ]} />
        <P>
          We do not use your personal data for automated decision-making or profiling in a
          way that produces legal or similarly significant effects on you.
        </P>
      </SectionBlock>

      {/* ── SECTION 6 — COOKIES ───────────────────────────────────────────── */}
      <SectionBlock id="cookies" number="06" title="Cookies &amp; Website Tracking" alt>
        <P>
          Our website uses cookies — small text files stored on your device — to ensure the
          site functions correctly and to understand how visitors use it.
        </P>

        <SubHeading>Essential Cookies (always active)</SubHeading>
        <P>
          These are necessary for the website to work. They include session management,
          security tokens, and CSRF protection. You cannot opt out of essential cookies
          without disabling core website functionality.
        </P>

        <SubHeading>Analytics Cookies (optional, consent required)</SubHeading>
        <P>
          With your consent, we use analytics tools (such as Google Analytics) to collect
          aggregated, anonymised data about how visitors use our website. This helps us
          improve content and user experience. No personally identifiable information is
          shared with analytics providers without your consent.
        </P>

        <SubHeading>Marketing / Advertising Cookies</SubHeading>
        <P>
          We do not place third-party advertising cookies on your device without your
          explicit prior consent. Where consent is granted for remarketing (e.g. Meta Pixel),
          you may withdraw it at any time via our cookie preferences.
        </P>

        <SubHeading>Managing Cookie Preferences</SubHeading>
        <P>
          You can manage or withdraw cookie consent at any time through your browser settings
          or by contacting us. Please note that disabling certain cookies may affect website
          functionality.
        </P>
      </SectionBlock>

      {/* ── SECTION 7 — DATA SHARING ──────────────────────────────────────── */}
      <SectionBlock id="data-sharing" number="07" title="Data Sharing" alt={false}>
        <P>
          We respect your privacy. We do not sell, rent, or trade your personal data to
          any third party — ever. We share your data only in the following limited
          circumstances:
        </P>
        <BulletList items={[
          <><strong style={{ color: '#024C27' }}>Clinical partners:</strong> Laboratories and pharmacies that we work with to fulfil your treatment (e.g. blood testing labs, dispensing pharmacies). These parties receive only the minimum data necessary and are bound by professional confidentiality obligations.</>,
          <><strong style={{ color: '#024C27' }}>Cloud &amp; IT service providers:</strong> Software platforms used to manage patient records, appointments, and communications (e.g. practice management software, cloud storage). All such providers operate under data processing agreements and GDPR-compliant safeguards.</>,
          <><strong style={{ color: '#024C27' }}>Legal &amp; regulatory authorities:</strong> Where we are legally required to disclose data to Maltese courts, regulatory bodies, or law enforcement agencies. We will notify you of such disclosure wherever lawfully permitted to do so.</>,
          <><strong style={{ color: '#024C27' }}>Marketing platforms:</strong> Email and SMS marketing providers — only where you have given explicit marketing consent. You may opt out at any time.</>,
        ]} />
        <P>
          All third-party data processors are subject to written data processing agreements
          that require them to implement appropriate technical and organisational security
          measures and to process your data only on our documented instructions.
        </P>
      </SectionBlock>

      {/* ── SECTION 8 — INTERNATIONAL TRANSFERS ──────────────────────────── */}
      <SectionBlock id="international" number="08" title="International Data Transfers" alt>
        <P>
          We are based in Malta (within the European Economic Area). Some of the cloud
          services and software platforms we use may store or process data on servers
          located outside the EEA — for example in the United States or United Kingdom.
        </P>
        <P>
          Whenever your personal data is transferred outside the EEA, we ensure appropriate
          safeguards are in place as required by GDPR Article 46, including:
        </P>
        <BulletList items={[
          <><strong style={{ color: '#024C27' }}>Standard Contractual Clauses (SCCs):</strong> EU Commission-approved contractual terms that bind the recipient to GDPR-equivalent protections.</>,
          <><strong style={{ color: '#024C27' }}>Adequacy decisions:</strong> Where the European Commission has determined that a third country provides an adequate level of data protection (e.g. United Kingdom).</>,
          <><strong style={{ color: '#024C27' }}>Binding Corporate Rules:</strong> Where applicable for transfers within multinational corporate groups.</>,
        ]} />
        <P>
          You may request details of the specific safeguards we have in place for any
          particular transfer by contacting us at{' '}
          <a href="mailto:info@carismaslimming.com" style={{ color: '#4f7256' }}>
            info@carismaslimming.com
          </a>.
        </P>
      </SectionBlock>

      {/* ── SECTION 9 — DATA RETENTION ────────────────────────────────────── */}
      <SectionBlock id="retention" number="09" title="Data Retention" alt={false}>
        <P>
          We keep your personal data only for as long as necessary to fulfil the purposes
          for which it was collected, or as required by law. Our retention periods are:
        </P>
        <div
          style={{
            overflowX: 'auto',
            marginBottom: '20px',
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '14px',
              color: '#6f6456',
            }}
          >
            <thead>
              <tr style={{ backgroundColor: '#024C27' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', color: '#C9D8C1', fontWeight: 500, width: '45%' }}>
                  Data Category
                </th>
                <th style={{ padding: '12px 16px', textAlign: 'left', color: '#C9D8C1', fontWeight: 500 }}>
                  Retention Period
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Clinical &amp; medical records', 'Minimum 10 years per Maltese medical record-keeping law'],
                ['Financial &amp; payment records', '7 years per Maltese accounting / tax legislation'],
                ['Marketing data (email/SMS lists)', 'Until consent withdrawn, plus 30-day grace period'],
                ['Website analytics data (cookies)', '12 months from collection'],
                ['Consent records', 'Duration of relationship + 6 years (evidence of compliance)'],
                ['CCTV footage (if applicable)', 'Maximum 30 days unless required for an investigation'],
              ].map(([category, period], i) => (
                <tr
                  key={i}
                  style={{ backgroundColor: i % 2 === 0 ? '#ffffff' : '#F2F6EF' }}
                >
                  <td
                    style={{ padding: '11px 16px', borderBottom: '1px solid #E8EFE5' }}
                    dangerouslySetInnerHTML={{ __html: category }}
                  />
                  <td style={{ padding: '11px 16px', borderBottom: '1px solid #E8EFE5' }}>
                    {period}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <P>
          When the applicable retention period expires, data is securely deleted, anonymised,
          or irreversibly destroyed in accordance with our data disposal policy.
        </P>
      </SectionBlock>

      {/* ── SECTION 10 — SECURITY ─────────────────────────────────────────── */}
      <SectionBlock id="security" number="10" title="Security" alt>
        <P>
          We take the security of your personal data seriously and implement appropriate
          technical and organisational measures to protect it against unauthorised access,
          accidental loss, destruction, or disclosure. Our security measures include:
        </P>
        <BulletList items={[
          <><strong style={{ color: '#024C27' }}>Encryption in transit:</strong> All data transmitted between your browser and our website is encrypted using TLS (HTTPS). Communications with cloud services also use encrypted connections.</>,
          <><strong style={{ color: '#024C27' }}>Encryption at rest:</strong> Personal data stored in our systems is encrypted at rest using industry-standard encryption protocols.</>,
          <><strong style={{ color: '#024C27' }}>Access controls:</strong> Access to patient records is restricted to authorised clinical and administrative staff on a strict need-to-know basis. All access is logged.</>,
          <><strong style={{ color: '#024C27' }}>Staff training:</strong> All team members who handle personal data receive data protection training as part of their onboarding and on an ongoing basis.</>,
          <><strong style={{ color: '#024C27' }}>Regular security reviews:</strong> We periodically review and test our data security arrangements and update them in response to new threats or regulatory guidance.</>,
          <><strong style={{ color: '#024C27' }}>Vendor security:</strong> Third-party data processors are assessed for security compliance before we engage them, and their obligations are enshrined in data processing agreements.</>,
        ]} />
        <P>
          While we take every reasonable precaution, no system is entirely risk-free. If
          you suspect any unauthorised access to your personal data, please notify us
          immediately at{' '}
          <a href="mailto:info@carismaslimming.com" style={{ color: '#4f7256' }}>
            info@carismaslimming.com
          </a>.
        </P>
      </SectionBlock>

      {/* ── SECTION 11 — YOUR RIGHTS ──────────────────────────────────────── */}
      <SectionBlock id="your-rights" number="11" title="Your Rights Under GDPR" alt={false}>
        <P>
          As a data subject, you have the following rights under the GDPR. You can exercise
          any of these rights at any time by contacting us at{' '}
          <a href="mailto:info@carismaslimming.com" style={{ color: '#4f7256' }}>
            info@carismaslimming.com
          </a>. We will respond within <strong>30 calendar days</strong>.
        </P>
        <BulletList items={[
          <><strong style={{ color: '#024C27' }}>Right of Access (Art. 15):</strong> You have the right to obtain confirmation of whether we hold personal data about you and to receive a copy of that data, along with information about how it is processed.</>,
          <><strong style={{ color: '#024C27' }}>Right to Rectification (Art. 16):</strong> You have the right to request correction of inaccurate or incomplete personal data we hold about you.</>,
          <><strong style={{ color: '#024C27' }}>Right to Erasure (Art. 17):</strong> In certain circumstances — such as when data is no longer necessary, consent is withdrawn, or data has been unlawfully processed — you may request that we delete your personal data.</>,
          <><strong style={{ color: '#024C27' }}>Right to Restrict Processing (Art. 18):</strong> You may request that we limit how we use your data in certain circumstances (e.g. while a dispute about accuracy is being resolved).</>,
          <><strong style={{ color: '#024C27' }}>Right to Data Portability (Art. 20):</strong> Where processing is based on consent or contract, you have the right to receive your personal data in a structured, machine-readable format and to transmit it to another controller.</>,
          <><strong style={{ color: '#024C27' }}>Right to Object (Art. 21):</strong> You have the right to object to processing based on legitimate interests or for direct marketing purposes. We will cease processing unless we can demonstrate compelling legitimate grounds.</>,
          <><strong style={{ color: '#024C27' }}>Right to Withdraw Consent (Art. 7):</strong> Where processing is based on your consent, you may withdraw that consent at any time without affecting the lawfulness of prior processing.</>,
        ]} />
        <P>
          Please note that some rights are subject to exemptions — for example, we may be
          required to retain certain clinical records under Maltese medical law even if you
          request erasure. We will always explain the applicable exemption clearly.
        </P>
        <P>
          If you are not satisfied with our response, you have the right to lodge a complaint
          with the Office of the Information and Data Protection Commissioner (IDPC) —
          see Section&nbsp;16.
        </P>
      </SectionBlock>

      {/* ── SECTION 12 — MARKETING ────────────────────────────────────────── */}
      <SectionBlock id="marketing" number="12" title="Marketing Communications" alt>
        <P>
          We only send marketing communications — including newsletters, promotions, and
          health tips — to people who have explicitly opted in to receive them. We never
          add you to marketing lists without your active consent.
        </P>
        <P>
          You can unsubscribe from all marketing communications at any time by:
        </P>
        <BulletList items={[
          'Clicking the "Unsubscribe" link at the bottom of any marketing email',
          'Replying to any SMS with "STOP"',
          'Emailing us at info@carismaslimming.com with "Unsubscribe" in the subject line',
        ]} />
        <P>
          Unsubscribe requests are processed within 5 business days. Please note that even
          after opting out of marketing, we may still send you essential service
          communications (e.g. appointment reminders, clinical safety notices) as these are
          necessary to deliver your treatment and are not marketing.
        </P>
        <P>
          We do not share your contact details with any third-party marketing partners
          without your separate, explicit consent.
        </P>
      </SectionBlock>

      {/* ── SECTION 13 — CHILDREN ─────────────────────────────────────────── */}
      <SectionBlock id="children" number="13" title="Children's Data" alt={false}>
        <P>
          Our clinical services are primarily designed for adults aged 18 and over.
          We do not knowingly collect personal data from individuals under the age of
          16 without verifiable parental or guardian consent.
        </P>
        <P>
          Where we agree to provide services to a patient under the age of 18, the
          following requirements apply:
        </P>
        <BulletList items={[
          'Written consent from a parent or legal guardian is required before treatment commences',
          'The parent or guardian must be present during the initial consultation and consent process',
          'Age-specific risk disclosures will be provided where a medication is used outside its approved paediatric indications',
          'We reserve the right to decline treatment of a minor where it is not clinically appropriate',
        ]} />
        <P>
          If you believe we have inadvertently collected personal data about a child under
          16 without appropriate consent, please contact us immediately at{' '}
          <a href="mailto:info@carismaslimming.com" style={{ color: '#4f7256' }}>
            info@carismaslimming.com
          </a>{' '}
          and we will promptly delete such data.
        </P>
      </SectionBlock>

      {/* ── SECTION 14 — DATA BREACH ──────────────────────────────────────── */}
      <SectionBlock id="breach" number="14" title="Data Breach" alt>
        <P>
          In the event of a personal data breach — an incident involving the accidental or
          unlawful destruction, loss, alteration, unauthorised disclosure of, or access to,
          your personal data — we will take immediate steps to contain and investigate the
          incident.
        </P>
        <P>Our breach response obligations under GDPR are as follows:</P>
        <BulletList items={[
          <><strong style={{ color: '#024C27' }}>Supervisory authority notification:</strong> Where a breach is likely to result in a risk to individuals&apos; rights and freedoms, we will notify the Office of the Information and Data Protection Commissioner (IDPC) within <strong>72 hours</strong> of becoming aware of the breach.</>,
          <><strong style={{ color: '#024C27' }}>Individual notification:</strong> Where a breach is likely to result in a <em>high risk</em> to your rights and freedoms (e.g. risk of identity theft, discrimination, or physical harm), we will notify you directly without undue delay, explaining the nature of the breach, likely consequences, and the steps we have taken or propose to take.</>,
          <><strong style={{ color: '#024C27' }}>Remediation:</strong> We will take prompt steps to mitigate the effects of the breach, review the root cause, and implement measures to prevent recurrence.</>,
        ]} />
        <P>
          We maintain an internal breach register as required by GDPR Article 33(5).
        </P>
      </SectionBlock>

      {/* ── SECTION 15 — POLICY CHANGES ───────────────────────────────────── */}
      <SectionBlock id="policy-changes" number="15" title="Changes to This Policy" alt={false}>
        <P>
          We may update this Privacy Policy from time to time to reflect changes in our
          practices, services, or legal requirements.
        </P>
        <BulletList items={[
          'The most current version of this policy is always available at carismaslimming.com/privacy-policy',
          'For material changes — those that significantly affect how we process your data or your rights — we will notify active patients and marketing subscribers by email at least 14 days before the changes take effect',
          'The "Last Updated" date at the top of this policy reflects when it was last revised',
          'Your continued use of our services after a policy update constitutes acceptance of the revised terms',
        ]} />
        <P>
          If you have any questions about a change we have made, please contact us at{' '}
          <a href="mailto:info@carismaslimming.com" style={{ color: '#4f7256' }}>
            info@carismaslimming.com
          </a>.
        </P>
      </SectionBlock>

      {/* ── SECTION 16 — CONTACT & COMPLAINTS ────────────────────────────── */}
      <SectionBlock id="contact-complaints" number="16" title="Contact &amp; Complaints" alt>
        <P>
          If you have any questions about this Privacy Policy, want to exercise your GDPR
          rights, or wish to raise a concern about how we handle your personal data, please
          contact us:
        </P>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #C9D8C1',
              borderRadius: '8px',
              padding: '20px 22px',
            }}
          >
            <p style={{ ...LABEL_STYLE, color: '#024C27', marginBottom: '8px' }}>Data Protection Contact</p>
            <p style={{ ...BODY_STYLE, marginBottom: '4px' }}>Carisma Aesthetics Ltd.</p>
            <p style={{ ...BODY_STYLE, marginBottom: '4px' }}>
              35/16B Hever Court, Triq Moletta,<br />Swieqi, SWQ 3532, Malta
            </p>
            <p style={{ ...BODY_STYLE, marginBottom: '0' }}>
              <a href="mailto:info@carismaslimming.com" style={{ color: '#4f7256' }}>
                info@carismaslimming.com
              </a>
            </p>
          </div>
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #C9D8C1',
              borderRadius: '8px',
              padding: '20px 22px',
            }}
          >
            <p style={{ ...LABEL_STYLE, color: '#024C27', marginBottom: '8px' }}>Supervisory Authority</p>
            <p style={{ ...BODY_STYLE, marginBottom: '4px' }}>
              Office of the Information and Data<br />Protection Commissioner (IDPC)
            </p>
            <p style={{ ...BODY_STYLE, marginBottom: '0' }}>
              <a href="https://idpc.org.mt" target="_blank" rel="noopener noreferrer" style={{ color: '#4f7256' }}>
                idpc.org.mt
              </a>
            </p>
          </div>
        </div>
        <P>
          We take all privacy concerns seriously and aim to resolve queries promptly and
          fairly. If you are not satisfied with our response, you have the right to lodge a
          complaint directly with the IDPC at any time.
        </P>
      </SectionBlock>

      {/* ── BOTTOM CTA CARD ───────────────────────────────────────────────── */}
      <section style={{ backgroundColor: '#F2F6EF', paddingTop: '64px', paddingBottom: '80px' }}>
        <div className="mx-auto px-6 lg:px-0" style={{ maxWidth: '680px', textAlign: 'center' }}>
          <div
            style={{
              backgroundColor: '#024C27',
              borderRadius: '16px',
              padding: '52px 48px',
            }}
          >
            <p style={{ ...LABEL_STYLE, color: '#C9D8C1', marginBottom: '16px' }}>
              Data Subject Rights
            </p>
            <h2
              style={{
                fontFamily: 'Trajan Pro, serif',
                fontWeight: 400,
                fontSize: 'clamp(24px, 4vw, 34px)',
                color: '#ffffff',
                marginBottom: '16px',
              }}
            >
              Exercise Your Rights
            </h2>
            <p
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontSize: '15px',
                lineHeight: 1.65,
                color: 'rgba(255,255,255,0.75)',
                marginBottom: '32px',
              }}
            >
              To access, correct, or delete your personal data — or for any data
              protection query — email us and we will respond within 30 days.
            </p>
            <a
              href="mailto:info@carismaslimming.com"
              style={{
                display: 'inline-block',
                backgroundColor: '#C9D8C1',
                color: '#024C27',
                fontFamily: '"Novecento Wide", sans-serif',
                fontSize: '12px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                fontWeight: 600,
                padding: '14px 32px',
                borderRadius: '4px',
                textDecoration: 'none',
                marginBottom: '20px',
              }}
            >
              info@carismaslimming.com
            </a>
            <p
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontSize: '13px',
                color: 'rgba(255,255,255,0.5)',
                margin: 0,
              }}
            >
              Or lodge a complaint with the IDPC at{' '}
              <a
                href="https://idpc.org.mt"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#C9D8C1', textDecoration: 'underline' }}
              >
                idpc.org.mt
              </a>
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
