/* ──────────────────────────────────────────────────────────────────────────
   StepTimeline — vertical numbered step timeline (mirrors the Carisma
   Aesthetics "Your Treatment Experience" layout, in slimming sage).
   Desktop: dashed vertical line · dot · big "STEP N" · petal card.
   Mobile: stacked dot + STEP label, then the card. Server component, no JS.
   ────────────────────────────────────────────────────────────────────────── */

const SERIF = 'Trajan Pro, serif';
const WIDE = 'Novecento Wide Book, sans-serif';
const BODY = 'Roboto, sans-serif';
const SAGE_DEEP = '#024C27'; // step number
const SAGE = '#4f7256'; // STEP label + card heading
const TAUPE = '#6f6456'; // body

export type TimelineStep = { title: string; desc: string };

const cardStyle: React.CSSProperties = {
  borderRadius: '18px 44px 18px 44px',
  background: 'linear-gradient(180deg, #ffffff 0%, #eef3ea 100%)',
  boxShadow: '0 16px 38px rgba(2,76,39,0.07)',
};

function Card({ s }: { s: TimelineStep }) {
  return (
    <div style={{ ...cardStyle, padding: '20px 24px' }}>
      <h3 style={{ fontFamily: WIDE, fontSize: 14, color: SAGE, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 8px' }}>
        {s.title}
      </h3>
      <p style={{ fontFamily: BODY, fontSize: 14.5, color: TAUPE, lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
    </div>
  );
}

export default function StepTimeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <>
      {/* Desktop */}
      <div className="relative mx-auto hidden md:block" style={{ maxWidth: 760 }}>
        <span
          aria-hidden
          style={{ position: 'absolute', left: 22, top: 46, bottom: 46, borderLeft: '1px dashed #9bb89f', zIndex: 0 }}
        />
        {steps.map((s, i) => (
          <div
            key={i}
            className="relative grid items-center"
            style={{ gridTemplateColumns: '44px 84px minmax(0, 460px)', columnGap: 22, marginBottom: i === steps.length - 1 ? 0 : 36 }}
          >
            <div className="flex justify-center" style={{ position: 'relative', zIndex: 1 }}>
              <span aria-hidden style={{ width: 18, height: 18, borderRadius: '50%', background: '#8eb093', boxShadow: '0 0 0 5px #dde8da' }} />
            </div>
            <div className="text-center">
              <div style={{ fontFamily: SERIF, fontSize: 15, color: SAGE, letterSpacing: '0.14em' }}>STEP</div>
              <div style={{ fontFamily: SERIF, fontSize: 'clamp(30px, 4vw, 44px)', color: SAGE_DEEP, lineHeight: 1.1 }}>{i + 1}</div>
            </div>
            <Card s={s} />
          </div>
        ))}
      </div>

      {/* Mobile */}
      <div className="md:hidden mx-auto" style={{ maxWidth: 480 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ marginBottom: i === steps.length - 1 ? 0 : 24 }}>
            <div className="flex items-center gap-3" style={{ marginBottom: 12 }}>
              <span aria-hidden style={{ width: 16, height: 16, borderRadius: '50%', background: '#8eb093', boxShadow: '0 0 0 4px #dde8da', flexShrink: 0 }} />
              <span style={{ fontFamily: SERIF, color: SAGE, letterSpacing: '0.14em', fontSize: 14 }}>
                STEP <span style={{ fontSize: 24, color: SAGE_DEEP }}>{i + 1}</span>
              </span>
            </div>
            <Card s={s} />
          </div>
        ))}
      </div>
    </>
  );
}
