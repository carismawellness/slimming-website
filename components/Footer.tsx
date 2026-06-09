import Link from 'next/link';

const GREEN = '#8EB093';
const TAUPE = '#9B8D83';
const BORDER = '#E0DAD3';

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
      <span className="flex flex-col leading-tight">
        <span style={{ color: '#7A6F66', fontFamily: 'Roboto, sans-serif', fontSize: '12px', letterSpacing: '2px', fontWeight: 600 }}>
          {label}
        </span>
        <span className="transition group-hover:opacity-70" style={{ color: TAUPE, fontFamily: 'Roboto, sans-serif', fontSize: '14px', letterSpacing: '1px' }}>
          {value}
        </span>
      </span>
    </a>
  );
}

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#FBFAF8' }}>
      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="relative">
          <input
            type="text"
            placeholder="WHAT ARE YOU LOOKING FOR?"
            aria-label="Search"
            className="w-full bg-white outline-none"
            style={{ border: `1px solid ${BORDER}`, borderRadius: '8px', padding: '16px 52px 16px 20px', color: TAUPE, fontFamily: 'Roboto, sans-serif', fontSize: '13px', letterSpacing: '2px' }}
          />
          <span className="absolute top-1/2 -translate-y-1/2" style={{ right: '18px', pointerEvents: 'none' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B8AEA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
        </div>
      </div>

      {/* STAY IN TOUCH */}
      <h4 className="text-center" style={{ color: TAUPE, fontFamily: '"Trajan Pro", serif', fontSize: '15px', letterSpacing: '4px', marginTop: '48px', marginBottom: '40px' }}>
        STAY IN TOUCH
      </h4>

      {/* Contact Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
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
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              }
            />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div
          className="flex flex-col sm:flex-row justify-between items-center gap-3"
          style={{ backgroundColor: GREEN, borderTopLeftRadius: '10px', borderTopRightRadius: '10px', padding: '18px 28px' }}
        >
          <p style={{ color: '#FFFFFF', fontFamily: 'Roboto, sans-serif', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase' }}>
            © - Carisma slimming All Rights reserved.
          </p>
          <div className="flex gap-8">
            <Link href="/privacy-policy" className="transition hover:opacity-80" style={{ color: '#FFFFFF', fontFamily: 'Roboto, sans-serif', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Privacy Policy
            </Link>
            <Link href="/terms-conditions" className="transition hover:opacity-80" style={{ color: '#FFFFFF', fontFamily: 'Roboto, sans-serif', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Terms &amp; Condition
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
