'use client';

import { useState } from 'react';
import Image from 'next/image';

const headingFont = 'Trajan Pro, serif';
const wideFont = 'Novecento Wide Book, sans-serif';
const bodyFont = 'Roboto, sans-serif';
const green = '#4f7256';
const taupe = '#6f6456';

type Item = {
  title: string;
  tag: string;
  image: string;
  what: string;
  keyResults: string[];
};

const ITEMS: Item[] = [
  {
    title: 'GLP-1 Receptor Agonists for Weight Management',
    tag: 'High Evidence',
    image: '/wix/87fc13_7b41b585eeeb4a5f8ed8fb8330ca8a13~mv2.jpeg',
    what: 'GLP-1 receptor agonists mimic a naturally occurring gut hormone involved in appetite regulation. They slow gastric emptying, increase satiety, and reduce hunger signals in the brain — helping patients eat less without relying solely on willpower.',
    keyResults: [
      'Large RCT published in The New England Journal of Medicine: GLP-1 plus lifestyle intervention achieved significantly greater and more sustained weight loss than lifestyle changes alone.',
      'Systematic review of multiple clinical trials reported consistent reductions in body weight and appetite, with a favourable safety profile when medically supervised.',
    ],
  },
  {
    title: 'GLP-1 and Reduction of "Food Noise"',
    tag: 'Emerging Evidence',
    image: '/wix/a228c2ba08a24f07a7bad0599f5fed53.jpg',
    what: 'GLP-1 receptor agonists act on appetite centres in the brain, helping reduce constant thoughts about food, cravings, and reward-driven eating — what patients commonly call "food noise."',
    keyResults: [
      'Neuroimaging and behavioural studies show GLP-1 therapies reduce activation in brain regions linked to food reward and impulsive eating. (Nature Medicine)',
      'Peer-reviewed studies note improved dietary adherence and reduced emotional eating when GLP-1 medication is combined with structured lifestyle support. (PMC)',
    ],
  },
  {
    title: 'Long-Term Weight Regain Prevention',
    tag: 'Long-Term Evidence',
    image: '/wix/87fc13_28e88260661c4e019e0d6587dcd1c0b6~mv2.webp',
    what: 'By supporting appetite regulation and metabolic signalling, GLP-1 therapies address one of the main drivers of weight regain: persistent hunger and reduced satiety after dieting.',
    keyResults: [
      'Long-term follow-up study: patients who continued GLP-1 therapy alongside lifestyle changes maintained significantly more weight loss than those on lifestyle intervention alone. (The Lancet)',
      'Research confirms that discontinuation without behavioural support may lead to appetite return — reinforcing the importance of a structured, doctor-led programme.',
    ],
  },
];

function EvidenceCard({ item }: { item: Item }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div style={{ position: 'relative', paddingTop: '16px', display: 'flex', flexDirection: 'column' }}>
      {/* Photo with floating badge */}
      <div style={{ position: 'relative', width: '92%', margin: '0 auto', zIndex: 2 }}>
        <div style={{ border: `2px solid ${green}`, borderRadius: '20px 80px', overflow: 'hidden', backgroundColor: '#eef3ea', position: 'relative', height: '186px' }}>
          <Image src={item.image} alt={item.title} fill style={{ objectFit: 'cover' }} loading="lazy" />
        </div>
        <span style={{ position: 'absolute', top: '-14px', left: '18px', backgroundColor: '#fff', color: green, fontFamily: wideFont, fontWeight: 600, fontSize: '12px', letterSpacing: '0.5px', textTransform: 'uppercase', padding: '7px 18px', borderRadius: '9999px', border: `2px solid ${green}`, whiteSpace: 'nowrap' }}>
          {item.tag}
        </span>
      </div>
      {/* Card body */}
      <div style={{ background: 'linear-gradient(180deg, #ffffff 0%, #F2F6EF 100%)', border: '1px solid #e8e2da', borderRadius: '16px', marginTop: '-70px', padding: '92px 30px 30px', position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ color: green, fontFamily: headingFont, fontWeight: 400, fontSize: '20px', lineHeight: 1.3, textTransform: 'uppercase', textAlign: 'center', margin: 0 }}>
          {item.title}
        </h3>
        <div style={{ width: '90px', height: '1px', backgroundColor: '#cfc8bf', margin: '16px auto 20px' }} />
        <p style={{ color: taupe, fontFamily: wideFont, fontWeight: 700, fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 8px' }}>What it does</p>
        <p style={{ color: taupe, fontFamily: bodyFont, fontSize: '14px', lineHeight: 1.6, margin: '0 0 6px', ...(expanded ? {} : { display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }) }}>
          {item.what}
        </p>
        {expanded && (
          <div>
            <p style={{ color: taupe, fontFamily: wideFont, fontWeight: 700, fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', margin: '14px 0 8px' }}>Key results</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {item.keyResults.map((r) => (
                <li key={r} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <span style={{ color: green, flexShrink: 0, marginTop: '4px' }}>•</span>
                  <span style={{ color: taupe, fontFamily: bodyFont, fontSize: '13.5px', lineHeight: 1.7 }}>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          style={{ marginTop: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: taupe, fontFamily: bodyFont, fontSize: '15px', fontStyle: 'italic', textDecoration: 'underline', padding: '8px 0', display: 'block', minHeight: '44px' }}
        >
          {expanded ? 'Read less' : 'Read more'}
        </button>
      </div>
    </div>
  );
}

export default function EvidenceCards() {
  return (
    <section aria-labelledby="evidence-heading" style={{ backgroundColor: '#ffffff', paddingTop: 'clamp(12px, 3vw, 96px)', paddingBottom: 'clamp(12px, 3vw, 96px)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center mb-2" aria-hidden="true" style={{ color: green, fontFamily: wideFont, fontSize: '13px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>
          Clinical research: basis of our medical weight loss methodology
        </p>
        <div className="mx-auto mb-4" aria-hidden="true" style={{ width: '210px', height: '1px', backgroundColor: '#B9A99E' }} />
        <h2 id="evidence-heading" className="text-center mb-14" style={{ color: green, fontFamily: headingFont, fontWeight: 400, fontSize: '25px', textTransform: 'uppercase', letterSpacing: '1px' }}>
          The clinical evidence behind GLP-1 weight loss treatment
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {ITEMS.map((item) => (
            <EvidenceCard key={item.title} item={item} />
          ))}
        </div>
        <div className="text-center mt-14">
          <a
            href="https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2843963&eid=5009163&oiid=sv%3A25969858&share=true&pId=2708191"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Book your medical weight loss consultation — opens in new tab"
            className="cta-glow inline-flex items-center justify-center font-bold text-white"
            style={{ fontFamily: wideFont, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase', padding: '14px 24px', minHeight: '48px', width: '590px', maxWidth: '100%' }}
          >
            Book your medical weight loss consultation
          </a>
        </div>
      </div>
    </section>
  );
}
