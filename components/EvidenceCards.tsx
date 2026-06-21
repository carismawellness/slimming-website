'use client';

import { useState } from 'react';

const headingFont = 'Trajan Pro, serif';
const wideFont = 'Novecento Wide Book, sans-serif';
const bodyFont = 'Roboto, sans-serif';
// Bright sage #8EB093 fails as text on white (2.39:1). Use the accessible
// --brand-green-text family value #4f7256 (5.42:1 on white) for all sage TEXT.
const green = '#4f7256';
// Deep sage #4f7256 for tag text/border (>=4.86:1 on the translucent tag fill).
const greenDark = '#4f7256';
// Taupe #9B8D83 fails (2.78-2.98:1) on the card's light gradient. Darkened taupe
// #6f6456 clears AA (>=4.99:1) for title and Read more/less control.
const taupe = '#6f6456';

const cardCorners = {
  borderTopLeftRadius: '18px',
  borderTopRightRadius: '18px',
  borderBottomLeftRadius: '18px',
  borderBottomRightRadius: '60px',
};

type KeyResult = { text: string; source: string };
type Item = {
  title: string;
  image: string;
  what: string;
  keyResults: KeyResult[];
  tags: string[];
};

const ITEMS: Item[] = [
  {
    title: 'GLP-1 receptor agonists for weight management',
    image: '/wix/87fc13_7b41b585eeeb4a5f8ed8fb8330ca8a13~mv2.jpeg',
    what: 'GLP-1 receptor agonists mimic a naturally occurring gut hormone involved in appetite regulation. They slow gastric emptying, increase satiety, and reduce hunger signals in the brain, helping patients feel full sooner and eat less without relying solely on willpower.',
    keyResults: [
      { text: 'A large randomized controlled trial published in The New England Journal of Medicine showed that patients using a GLP-1 receptor agonist alongside lifestyle intervention achieved significantly greater and more sustained weight loss compared to lifestyle changes alone, with improvements maintained over time.', source: 'NEJM' },
      { text: 'A systematic review of multiple clinical trials reported consistent reductions in body weight and appetite, with GLP-1 therapies demonstrating a favourable safety profile when medically supervised.', source: 'PMC' },
    ],
    tags: ['Doctor-prescribed medication', 'Appetite regulation support', 'Requires medical assessment and monitoring'],
  },
  {
    title: 'GLP-1 and reduction of "food noise"',
    image: '/wix/a228c2ba08a24f07a7bad0599f5fed53.jpg',
    what: 'GLP-1 receptor agonists act on appetite centres in the brain, helping reduce constant thoughts about food, cravings, and reward-driven eating behaviours often described as "food noise."',
    keyResults: [
      { text: 'Neuroimaging and behavioural studies have shown that GLP-1 therapies reduce activation in brain regions linked to food reward and impulsive eating, supporting better appetite control and eating behaviour regulation.', source: 'Nature Medicine' },
      { text: 'Clinical observations reported in peer-reviewed studies note improved dietary adherence and reduced emotional eating when GLP-1 medication is combined with structured lifestyle support.', source: 'PMC' },
    ],
    tags: ['Craving reduction', 'Behavioural support', 'Best used with nutrition guidance'],
  },
  {
    title: 'Long-term weight regain prevention with GLP-1 support',
    image: '/wix/87fc13_28e88260661c4e019e0d6587dcd1c0b6~mv2.png',
    what: 'By supporting appetite regulation and metabolic signalling, GLP-1 therapies help address one of the main drivers of weight regain after dieting: persistent hunger and reduced satiety.',
    keyResults: [
      { text: 'A long-term follow-up study found that patients who continued GLP-1 therapy alongside lifestyle changes maintained significantly more weight loss compared to those relying on lifestyle intervention alone, highlighting the biological role of appetite hormones in weight maintenance.', source: 'The Lancet' },
      { text: 'Additional research confirms that discontinuation without behavioural support may lead to appetite return, reinforcing the importance of structured, doctor-led programmes.', source: 'PMC' },
    ],
    tags: ['Weight maintenance support', 'Long-term planning', 'Lifestyle integration essential'],
  },
  {
    title: 'Safety and tolerability of medically supervised GLP-1 use',
    image: '/wix/87fc13_47c25306549d4b6e9322f160244d03b6~mv2.png',
    what: 'GLP-1 receptor agonists have been extensively studied for safety when prescribed appropriately and monitored by healthcare professionals, with dose titration used to improve tolerability.',
    keyResults: [
      { text: 'Large-scale clinical trials and post-marketing surveillance studies report that most side effects are mild to moderate and temporary, commonly gastrointestinal, and can be managed through gradual dose adjustments and medical follow-up.', source: 'FDA / PMC' },
      { text: 'A comprehensive safety review found no increased risk of serious adverse outcomes when GLP-1 medications are prescribed following clinical guidelines.', source: 'JAMA' },
    ],
    tags: ['Prescription-only', 'Requires eligibility screening', 'Ongoing medical monitoring'],
  },
];

function EvidenceCard({ item }: { item: Item }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className="overflow-hidden"
      style={{ ...cardCorners, background: 'linear-gradient(180deg, #F8F6F2 0%, #EAF0E9 100%)' }}
    >
      <div className="w-full overflow-hidden" style={{ aspectRatio: '381 / 182' }}>
        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div className="px-7 pt-6 pb-7">
        <h3 className="text-center" style={{ color: taupe, fontFamily: wideFont, fontWeight: 400, fontSize: '24px', textTransform: 'lowercase', lineHeight: 1.3 }}>
          {item.title}
        </h3>
        <p className="mt-4 mb-2" style={{ color: '#1a1a1a', fontFamily: bodyFont, fontSize: '14px', fontWeight: 700 }}>WHAT IT DOES</p>
        <p style={{ color: '#333', fontFamily: bodyFont, fontSize: '14px', lineHeight: 1.6 }}>{item.what}</p>
        {expanded && (
          <>
            <p className="mt-4 mb-2" style={{ color: '#1a1a1a', fontFamily: bodyFont, fontSize: '14px', fontWeight: 700 }}>KEY RESULTS</p>
            {item.keyResults.map((kr, i) => (
              <p key={i} className="mb-2" style={{ color: '#333', fontFamily: bodyFont, fontSize: '14px', lineHeight: 1.6 }}>
                {kr.text}<strong style={{ fontWeight: 700 }}>{kr.source}</strong>
              </p>
            ))}
            <div className="flex flex-wrap gap-2 mt-4">
              {item.tags.map((t) => (
                <span key={t} style={{ backgroundColor: 'rgba(244,250,246,0.39)', color: greenDark, fontFamily: bodyFont, fontSize: '12px', border: '1px solid #4f7256', borderRadius: '999px', padding: '6px 15px' }}>{t}</span>
              ))}
            </div>
          </>
        )}
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 block"
          style={{ color: taupe, fontFamily: bodyFont, fontSize: '16px', fontStyle: 'italic', textDecoration: 'underline', cursor: 'pointer', background: 'transparent', padding: 0, border: 0 }}
        >
          {expanded ? 'Read less' : 'Read more'}
        </button>
      </div>
    </div>
  );
}

export default function EvidenceCards() {
  return (
    <section className="py-24" style={{ backgroundColor: '#ffffff' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center mb-2" style={{ color: green, fontFamily: wideFont, fontSize: '13px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>
          Clinical research: basis of our medical weight loss methodology
        </p>
        <div className="mx-auto mb-4" style={{ width: '210px', height: '1px', backgroundColor: '#B9A99E' }} />
        <h2 className="text-center mb-14" style={{ color: green, fontFamily: headingFont, fontWeight: 400, fontSize: '25px', textTransform: 'uppercase', letterSpacing: '1px' }}>
          The clinical evidence behind GLP-1 weight loss treatment
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
            className="cta-glow inline-block text-center font-bold text-white"
            style={{ fontFamily: wideFont, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase', padding: '12px 24px', width: '590px', maxWidth: '100%' }}
          >
            Book your medical weight loss consultation
          </a>
        </div>
      </div>
    </section>
  );
}
