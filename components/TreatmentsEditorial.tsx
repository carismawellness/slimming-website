import type { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/treatments/Reveal';
import './treatments/treatments-editorial.css';

/**
 * TreatmentsEditorial — an airy, editorial composition of the 6 Carisma Slimming
 * treatments. A large centred heading sits in the middle of the layout with the
 * six rounded portrait image-cards arranged asymmetrically around it (a refined
 * grid-template-areas composition on desktop; a clean single column on mobile).
 *
 * - The section's single <h2> (keyword + "Malta") lives here, centred, as required.
 * - Each card is a real <Link> carrying the treatment title (H3, thin sage underline)
 *   + a short subtitle, so every href/title/subtitle is in the server-rendered DOM.
 * - Server-rendered markup; the only client island is <Reveal> (IntersectionObserver
 *   scroll-reveal) which is fully prefers-reduced-motion safe.
 *
 * Desktop composition (grid-template-areas, "h" = heading):
 *     c1   .    c2
 *     c1   h    c2
 *     c3   h    c4
 *     c3   c5   c6
 *   → cards flank and sit above/below a central heading column. Per-card vertical
 *     nudges add the airy editorial "scatter".
 * Mobile: heading first, then all six cards in a single clean column.
 */

type Treatment = {
  title: string;
  subtitle: string;
  href: string;
  alt: string;
  src: string;
  focal: string;
  area: string; // desktop grid-area name
  offset: number; // desktop-only vertical nudge (px)
  delay: number; // scroll-reveal stagger (ms)
};

// Order = mobile stacking order. Mirrors components/ModalitiesCarousel.tsx CARDS.
const TREATMENTS: Treatment[] = [
  {
    title: 'Weight Loss',
    subtitle: "Malta's most comprehensive doctor-led slimming system.",
    href: '/weight-loss',
    alt: 'Doctor-led weight loss program at Carisma Slimming Malta',
    src: '/wix/87fc13_08e868147da2475ba4b9638849be145e~mv2.jpg',
    focal: '51% 22%',
    area: 'c1',
    offset: 0,
    delay: 0,
  },
  {
    title: 'Fat Reduction',
    subtitle: 'Targeted, non-surgical CoolSculpting fat freezing for stubborn areas.',
    href: '/packages/fat-freezing',
    alt: 'CoolSculpting fat freezing fat reduction treatment in Malta',
    src: '/wix/87fc13_6d89e9c129304617a960aa46bb07eed4~mv2.jpg',
    focal: '50% 35%',
    area: 'c2',
    offset: 64,
    delay: 90,
  },
  {
    title: 'Muscle Stimulation',
    subtitle: 'EMSculpt NEO to build strength and shape your silhouette without surgery.',
    href: '/packages/muscle-stimulation',
    alt: 'EMSculpt NEO muscle stimulation body sculpting in Malta',
    src: '/wix/87fc13_d79664fae1184e8e8c947c3d350af498~mv2.jpg',
    focal: '50% 35%',
    area: 'c3',
    offset: 36,
    delay: 60,
  },
  {
    title: 'GLP-1 (Mounjaro & Ozempic)',
    subtitle: 'Prescription medication to calm appetite, used only when right for you.',
    href: '/glp1',
    alt: 'GLP-1 medical weight loss with Mounjaro and Ozempic in Malta',
    src: '/wix/87fc13_6495820e70764a1fa3caddfb20d80fe0~mv2.webp',
    focal: '50% 35%',
    area: 'c4',
    offset: 96,
    delay: 150,
  },
  {
    title: 'Skin Tightening',
    subtitle: 'VelaShape III to firm loose skin and smooth cellulite, no downtime.',
    href: '/packages/skin-tightening',
    alt: 'VelaShape III skin tightening treatment in Malta',
    src: '/wix/87fc13_adb56c71648b421998e77dbea4ec5fb8~mv2.jpg',
    focal: '50% 35%',
    area: 'c5',
    offset: 28,
    delay: 200,
  },
  {
    title: 'Anti-Cellulite',
    subtitle: 'Lymphatic drainage to smooth dimpled skin and reduce fluid retention.',
    href: '/packages/anti-cellulite',
    alt: 'Anti-cellulite and lymphatic drainage treatment in Malta',
    src: '/wix/87fc13_5dde946fd77046908ec6b65db211836a~mv2.jpg',
    focal: '50% 35%',
    area: 'c6',
    offset: 80,
    delay: 240,
  },
];

function TreatmentCard({ t }: { t: Treatment }) {
  return (
    <Reveal
      delay={t.delay}
      className="te-card"
      style={{
        gridArea: t.area,
        '--lg-offset': `${t.offset}px`,
      } as CSSProperties}
    >
      <Link href={t.href} className="te-card__link group">
        <div className="te-card__frame">
          <Image
            src={t.src}
            alt={t.alt}
            fill
            sizes="(max-width: 1023px) 92vw, 320px"
            style={{ objectFit: 'cover', objectPosition: t.focal }}
            className="te-card__img"
          />
        </div>
        <h3 className="te-card__title">{t.title}</h3>
        <span aria-hidden="true" className="te-card__rule" />
        <p className="te-card__subtitle">{t.subtitle}</p>
      </Link>
    </Reveal>
  );
}

export default function TreatmentsEditorial() {
  return (
    <div className="treatments-editorial mx-auto px-6">
      <div className="te-grid">
        {/* Centred heading — first in the DOM so it leads on mobile; placed in the
            central grid area on desktop. */}
        <Reveal className="te-heading" style={{ gridArea: 'h' }}>
          <h2 id="modalities-heading">
            Our Weight Loss &amp; Body
            <br />
            Contouring Treatments in Malta
          </h2>
          <span aria-hidden="true" className="te-heading__rule" />
          <p className="te-heading__sub">
            Six evidence-led modalities, combined into one doctor-led plan — chosen
            for your body, never one-size-fits-all.
          </p>
        </Reveal>

        {TREATMENTS.map((t) => (
          <TreatmentCard key={t.title} t={t} />
        ))}
      </div>
    </div>
  );
}
