'use client';

import { useState } from 'react';

const headingFont = 'Trajan Pro, serif';
const wideFont = 'Novecento Wide Book, sans-serif';
const bodyFont = 'Roboto, sans-serif';
const green = '#8EB093';
const greenDark = '#7ba587';
const taupe = '#9B8D83';
const taupeLight = '#AFA39D';

const leafCorners = {
  borderTopLeftRadius: '18px',
  borderTopRightRadius: '90px',
  borderBottomLeftRadius: '90px',
  borderBottomRightRadius: '18px',
};

type Item = { title: string; strength: string; image: string; label: string; body: string };

const ITEMS: Item[] = [
  {
    title: 'GLP-1 receptor agonists for weight management',
    strength: 'Moderate-High Evidence',
    image: '/wix/87fc13_7b41b585eeeb4a5f8ed8fb8330ca8a13~mv2.jpeg',
    label: 'What It Does',
    body: 'GLP-1 receptor agonists mimic a naturally occurring gut hormone involved in appetite regulation. They slow gastric emptying, increase feelings of fullness and reduce overall food intake — supporting steady, sustainable weight loss when combined with nutrition and movement.',
  },
  {
    title: 'GLP-1 and reduction of "food noise"',
    strength: 'Moderate-High Evidence',
    image: '/wix/a228c2ba08a24f07a7bad0599f5fed53.jpg',
    label: 'What It Does',
    body: 'GLP-1 receptor agonists act on appetite centres in the brain, helping reduce constant thoughts about food, cravings, and the urge to snack. Many patients describe this as the "food noise" finally going quiet, which makes consistency far easier to maintain.',
  },
  {
    title: 'Long-term weight regain prevention with GLP-1 support',
    strength: 'Moderate-High Evidence',
    image: '/wix/87fc13_56eec505c9f9433db5846a0aeae07c7f~mv2.jpg',
    label: 'What It Does',
    body: 'By supporting appetite regulation and metabolic signalling, GLP-1 therapies help address one of the main drivers of weight regain. Used as part of a structured maintenance plan, they make it easier to hold onto your results long after the initial fat-loss phase.',
  },
  {
    title: 'Safety and tolerability of medically supervised GLP-1 use',
    strength: 'High Evidence',
    image: '/wix/87fc13_59abc443a8274e1c90646831cbc819c5~mv2.jpg',
    label: 'What It Does',
    body: 'GLP-1 receptor agonists have been extensively studied for safety when prescribed appropriately and monitored by a doctor. Most side effects are mild and manageable with careful dose titration, nutrition support and regular follow-ups.',
  },
];

function EvidenceCard({ item }: { item: Item }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="flex flex-col items-center">
      <div className="relative z-10 w-11/12 overflow-hidden" style={{ ...leafCorners, aspectRatio: '16 / 10', boxShadow: '0 14px 30px rgba(0,0,0,0.12)' }}>
        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <span
          className="absolute"
          style={{ top: '14px', left: '14px', backgroundColor: '#ffffff', color: greenDark, fontFamily: wideFont, fontSize: '11px', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase', padding: '6px 14px', borderRadius: '9999px', boxShadow: '0 4px 12px rgba(0,0,0,0.12)' }}
        >
          {item.strength}
        </span>
      </div>
      <div className="w-full -mt-14 px-7 pb-9" style={{ paddingTop: '70px', background: 'linear-gradient(180deg, #FCFCFA 0%, #E4EBE2 100%)', borderTopLeftRadius: '18px', borderTopRightRadius: '18px', borderBottomLeftRadius: '18px', borderBottomRightRadius: '60px' }}>
        <h3 className="text-center" style={{ color: greenDark, fontFamily: headingFont, fontWeight: 400, fontSize: '21px', textTransform: 'uppercase', lineHeight: 1.3 }}>
          {item.title}
        </h3>
        <div className="mx-auto mt-3 mb-6" style={{ width: '90px', height: '1px', backgroundColor: taupeLight }} />
        <p className="mb-2" style={{ color: taupe, fontFamily: wideFont, fontSize: '12px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>
          {item.label}
        </p>
        <p style={{ color: taupe, fontFamily: bodyFont, fontSize: '14px', lineHeight: 1.7, ...(expanded ? {} : { display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }) }}>
          {item.body}
        </p>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-3"
          style={{ color: taupe, fontFamily: bodyFont, fontSize: '13px', fontStyle: 'italic', textDecoration: 'underline', cursor: 'pointer', background: 'transparent' }}
        >
          {expanded ? 'Read less' : 'Read more'}
        </button>
      </div>
    </div>
  );
}

export default function EvidenceCards() {
  return (
    <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center mb-2" style={{ color: taupe, fontFamily: wideFont, fontSize: '13px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase' }}>
          Clinical research: basis of our medical weight loss methodology
        </p>
        <div className="mx-auto mb-4" style={{ width: '110px', height: '1px', backgroundColor: '#B9A99E' }} />
        <h2 className="text-center mb-14" style={{ color: green, fontFamily: headingFont, fontWeight: 400, fontSize: '28px', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Evidence based approach
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {ITEMS.map((item) => (
            <EvidenceCard key={item.title} item={item} />
          ))}
        </div>
        <div className="text-center mt-14">
          <a
            href="https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2843963&eid=5009163&oiid=sv%3A25969858&share=true&pId=2708191"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-center rounded-lg font-bold text-white"
            style={{ backgroundColor: '#6f93a6', fontFamily: wideFont, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase', padding: '15px 44px' }}
          >
            Book your medical weight loss consultation
          </a>
        </div>
      </div>
    </section>
  );
}
