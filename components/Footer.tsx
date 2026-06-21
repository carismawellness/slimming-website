import Link from 'next/link';
import MotifAccent from './layers/MotifAccent';
import SiteSearch from './SiteSearch';
import GoogleReviews from './GoogleReviews';

// Accessible brand tokens (see globals.css locked palette).
// GREEN: sage text/icon/heading on near-white footer = 5.42:1 AA (was #8EB093 -> 2.33:1).
// GREEN_FILL: solid sage for the bottom bar so #fff text clears 4.5:1 = 5.42:1 AA.
// GREEN_DECO: bright brand sage kept ONLY for the decorative gradient wash + the
//   1px divider rule (a graphical object, not text).
// TAUPE: contact value text on near-white = 5.78:1 AA (was #9B8D83 -> 3.13:1).
const GREEN = '#4F7256';
const GREEN_FILL = '#4F7256';
const GREEN_DECO = '#8EB093';
const TAUPE = '#6F6456';

function ContactRow({
  href,
  external,
  label,
  value,
  icon,
}: {
  href: string;
  external?: boolean;
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="flex items-center gap-3 group"
    >
      <span className="flex-shrink-0">{icon}</span>
      <span className="flex items-baseline gap-2 leading-tight">
        <span style={{ color: '#7A6F66', fontFamily: 'Roboto, sans-serif', fontSize: '16px', letterSpacing: '1px' }}>
          {label}
        </span>
        <span className="transition group-hover:underline" style={{ color: TAUPE, fontFamily: 'Roboto, sans-serif', fontSize: '16px', letterSpacing: '1px' }}>
          {value}
        </span>
      </span>
    </a>
  );
}

export default function Footer() {
  return (
    <footer style={{ background: `linear-gradient(180deg, #FCFCFA 0%, #FCFCFA 58%, ${GREEN_DECO} 100%)` }}>
      {/* Reviews marquee — shown on every page via the global footer */}
      <GoogleReviews />

      {/* Search Bar — live client-side site search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <SiteSearch />
      </div>

      {/* Liquid Gloss contact panel — floats over the sage gradient */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" style={{ marginTop: '48px' }}>
        <div className="lg-glass lg-glass--panel" style={{ padding: '34px clamp(20px,5vw,56px) 40px' }}>
          {/* faint brand-motif divider */}
          <MotifAccent mode="divider" style={{ maxWidth: '290px', height: 22, margin: '0 auto 16px' }} />
          {/* STAY IN TOUCH */}
          <h4 className="text-center" style={{ color: GREEN, fontFamily: '"Trajan Pro", serif', fontSize: '15px', letterSpacing: '4px', marginBottom: '14px' }}>
            STAY IN TOUCH
          </h4>
          <div className="mx-auto" style={{ width: '290px', height: '1px', backgroundColor: GREEN, marginBottom: '32px' }} />

          {/* Contact Grid */}
          <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-7">
            <ContactRow
              href="tel:+35627802062"
              label="PHONE"
              value="+356 27802062"
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              }
            />
            <ContactRow
              href="https://www.instagram.com/carismaslimming"
              external
              label="INSTAGRAM"
              value="@CARISMASLIMMING"
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              }
            />
            <ContactRow
              href="mailto:info@carismaslimming.com"
              label="EMAIL"
              value="INFO@CARISMASLIMMING.COM"
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              }
            />
            <ContactRow
              href="https://www.facebook.com/carismaaesthetics/"
              external
              label="FACEBOOK"
              value="CARISMA SLIMMING"
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill={GREEN}>
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.45 9-4.7 9-9.95z"></path>
                </svg>
              }
            />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div
          className="flex flex-col sm:flex-row justify-between items-center gap-3"
          style={{ backgroundColor: GREEN_FILL, borderTopLeftRadius: '10px', borderTopRightRadius: '10px', padding: '18px 28px' }}
        >
          <p style={{ color: '#FFFFFF', fontFamily: 'Roboto, sans-serif', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase' }}>
            © - Carisma slimming All Rights reserved.
          </p>
          <div className="flex gap-8">
            <Link href="/privacy-policy" className="transition hover:underline focus-on-dark" style={{ color: '#FFFFFF', fontFamily: 'Roboto, sans-serif', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Privacy Policy
            </Link>
            <Link href="/terms-conditions" className="transition hover:underline focus-on-dark" style={{ color: '#FFFFFF', fontFamily: 'Roboto, sans-serif', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Terms &amp; Condition
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
