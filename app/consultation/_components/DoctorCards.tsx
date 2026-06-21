import Image from 'next/image';
import { DOCTORS } from '@/lib/redesign/content';

// Page-local premium doctor cards. Replicates the site's gloss `.card-lift`
// language (we don't edit the shared DoctorProfiles, which uses emoji
// placeholders + navy tokens that don't fit this page). Real photos + verbatim
// credentials come from lib/redesign/content.ts (single source).

const HEADING = 'Trajan Pro, serif';
const WIDE = '"Novecento Wide", "Novecento Wide Book", sans-serif';
const BODY = 'Roboto, sans-serif';
const SAGE = '#4f7256';
const TAUPE = '#6f6456';

export default function DoctorCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
      {DOCTORS.map((d) => (
        <article key={d.name} className="card-lift overflow-hidden flex flex-col">
          <div className="relative w-full aspect-[4/5]" style={{ background: '#eef3ea' }}>
            <Image
              src={d.img}
              alt={`${d.name}, ${d.role} at Carisma Slimming Malta`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            {/* experience chip */}
            <span
              className="absolute left-3 top-3 hero-glass"
              style={{
                borderRadius: 999,
                padding: '5px 12px',
                fontFamily: WIDE,
                fontSize: 10.5,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: SAGE,
              }}
            >
              {d.exp} experience
            </span>
          </div>
          <div className="p-6 flex flex-col gap-1.5">
            <h3 style={{ fontFamily: HEADING, fontWeight: 400, fontSize: 19, color: SAGE, lineHeight: 1.2 }}>
              {d.name}
            </h3>
            <p style={{ fontFamily: WIDE, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: TAUPE }}>
              {d.role}
            </p>
            <p style={{ fontFamily: BODY, fontSize: 13.5, lineHeight: 1.6, color: TAUPE, marginTop: 6 }}>
              {d.bio}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
