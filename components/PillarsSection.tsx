// PillarsSection — brand-compliant 4-pillar summary (Carisma Slimming)
// Persona: Katya | Tone: compassionate, shame-free, evidence-led
// Palette: deep-forest #024C27, accessible sage text #4f7256, taupe body #6f6456
// WCAG AA: all text tokens meet ≥4.5:1 contrast on their backgrounds

const wideFont = 'Novecento Wide Book, sans-serif';
const bodyFont = 'Roboto, sans-serif';
const greenText = '#4f7256';  // 5.42:1 on white — AA pass
const taupe = '#6f6456';      // 5.78:1 on white — AA pass

const pillars = [
  {
    title: 'Medical Assessment',
    description: 'A full body composition scan and doctor consultation before anything else — because real results start with understanding your unique body.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true" focusable="false">
        <rect x="6" y="4" width="28" height="32" rx="4" stroke={greenText} strokeWidth="2" />
        <path d="M13 14h14M13 20h10M13 26h7" stroke={greenText} strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Nutrition & Coaching',
    description: 'A personalised meal plan built around your life — with weekly check-ins and WhatsApp support so you never have to figure it out alone.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true" focusable="false">
        <circle cx="20" cy="20" r="14" stroke={greenText} strokeWidth="2" />
        <path d="M14 20c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke={greenText} strokeWidth="2" strokeLinecap="round" />
        <path d="M20 26v-6" stroke={greenText} strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Exercise & Movement',
    description: 'Realistic movement that fits your schedule — open gym access, group classes, and personal training designed to protect muscle while you lose fat.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true" focusable="false">
        <path d="M8 20h4M28 20h4M12 20v-6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6M12 20v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6" stroke={greenText} strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Body Contouring',
    description: 'Clinic-grade non-invasive treatments — EMSculpt NEO, CoolSculpting, and VelaShape — to accelerate fat loss, build muscle, and tighten skin.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true" focusable="false">
        <ellipse cx="20" cy="22" rx="10" ry="12" stroke={greenText} strokeWidth="2" />
        <path d="M20 10 v-4M14 12l-3-3M26 12l3-3" stroke={greenText} strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function PillarsSection() {
  return (
    <section className="py-16" aria-labelledby="pillars-summary-heading" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #F8F6F2 50%, #ffffff 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="pillars-summary-heading"
          className="text-center mb-12"
          style={{ color: greenText, fontFamily: 'Trajan Pro, serif', fontWeight: 400, fontSize: '25px', lineHeight: 1.3, textTransform: 'uppercase', letterSpacing: '1px' }}
        >
          Our Comprehensive Approach
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" role="list">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              role="listitem"
              className="flex flex-col items-center text-center"
              style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F0F5EE 100%)', borderRadius: '16px', padding: '32px 24px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}
            >
              <div className="mb-4" style={{ width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(79,114,86,0.08)', borderRadius: '12px' }}>
                {pillar.icon}
              </div>
              <h3 className="mb-3" style={{ color: greenText, fontFamily: wideFont, fontSize: '14px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', lineHeight: 1.4 }}>
                {pillar.title}
              </h3>
              <p style={{ color: taupe, fontFamily: bodyFont, fontSize: '14px', lineHeight: 1.6 }}>
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
