const PRODUCT_URL =
  'https://www.carismaslimming.com/product-page/the-carisma-slimming-weight-loss-guide-malta';

const heroFeatures = [
  { label: 'What to eat', text: 'and what to swap using local Maltese ingredients' },
  { label: 'When to eat', text: 'simple meal timing that fits your schedule' },
  { label: null, text: '30+ recipes built for the mediterranean kitchen' },
  { label: null, text: 'a structure that works around social dinners and busy days' },
];

const methodPillars = [
  {
    title: 'When to Eat',
    text: 'Timing builds rhythm. Rhythm reduces the number of decisions you have to make each day. The guide walks you through a simple default for your first meal, how to structure eating across the day, and two tracks to choose from based on your morning routine. Safety and practicality, both covered.',
  },
  {
    title: 'What to Eat',
    text: 'Protein comes first. Not because carbs are the enemy, but because protein builds satiety from the start of every meal. The guide uses a simple points system, one calorie equals one point, with non-starchy vegetables sitting outside it entirely. No forbidden foods. No obsessive counting.',
  },
  {
    title: 'How Much to Eat',
    text: 'Your daily points budget is built around you. The guide includes a visual rule that works without scales, without apps, and without measuring anything. One palm. Two palms. Straightforward.',
  },
  {
    title: 'Which Order to Eat',
    text: 'Protein first. Then vegetables. Then carbs. That sequence changes how hungry you feel, how steady your energy runs, and how you arrive at your next meal. It works at home. It works at restaurants. It works at family tables where the pasta arrives before anything else.',
  },
];

const outcomes = [
  {
    title: 'Weight Stability',
    text: 'You stop dreading Monday mornings. You stop stepping on the scale after a difficult weekend and writing off the week. You learn to read the trend, not the moment. One number on one day stops having power over you. You begin to trust the direction, not obsess over the distance.',
  },
  {
    title: 'Appetite Stability',
    text: 'You stop arriving at meals desperate. Hunger becomes something predictable, something you can read, something that arrives on schedule rather than ambushing you. You stop making decisions when you are already too hungry to make good ones. That alone changes everything.',
  },
  {
    title: 'Energy Stability',
    text: 'The 3pm crash becomes unfamiliar. You stop needing caffeine to get through the afternoon. Sleep improves without doing anything specific about sleep. Your body regulates. You notice it first in the small things: concentration, mood, the way evenings feel lighter.',
  },
  {
    title: 'Emotional Calm Around Food',
    text: 'You go to dinner and enjoy it. You come home and do not spiral. You stop the all-or-nothing arithmetic, the mental ledger of what you ate and what it cost you. Food becomes simpler. Less loaded. You leave the table satisfied, not negotiating with yourself.',
  },
];

const forYou = [
  "You've tried dieting before, and it didn't stick",
  "You don't want to count calories or track macros",
  'You want a method that fits around a real life, not a perfect one',
  "You're tired of starting over every Monday",
  'You want to understand food, not just follow rules',
  "You're ready for something that lasts, not just something that starts well",
];

const notForYou = [
  'You want a quick fix or a 7-day crash diet',
  "You're looking for a calorie-counting app or macro tracker",
  'You want someone to tell you exactly what to eat every single day',
  "You're not willing to change how you think about food",
  'You expect results without adjusting any habits',
  "You're looking for a meal plan, not a method",
  'You believe willpower should be enough',
];

const carismaCommitments = [
  'Visible inch loss and shape change, not vague promises',
  'Plans that work with your age, hormones and metabolism',
  'No crash diets, no banned foods, no endless hours of cardio',
  'Medical grade technology and treatments delivered by trained professionals',
];

const whyCarisma = [
  "Created by the team behind Malta's leading spa and medical aesthetics centres",
  'Doctor led medical slimming, not a beauty salon "diet program"',
  'All in one approach: assessment, nutrition, movement and treatments',
  'High touch support with weekly check ins and WhatsApp coaching',
];

const headingFont = 'Trajan Pro, serif';
const bodyFont = 'Roboto, sans-serif';

function Placeholder({
  label,
  className = '',
  style = {},
}: {
  label: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`flex items-center justify-center text-center px-4 ${className}`}
      style={{
        border: '2px dashed #AFA39D',
        backgroundColor: '#EEF3F0',
        color: '#9B8D83',
        fontFamily: bodyFont,
        fontSize: '14px',
        borderRadius: '12px',
        ...style,
      }}
    >
      {label}
    </div>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="uppercase mb-2"
      style={{ color: '#AFA39D', fontFamily: headingFont, fontSize: '14px', letterSpacing: '2px' }}
    >
      {children}
    </p>
  );
}

function SocialProof() {
  return (
    <div className="flex flex-col items-center gap-2">
      <img
        src="/wix/87fc13_c507b5f7e86f4eed970b757bc84a8ec4~mv2.png"
        alt="Google logo (google.png)"
        style={{ width: '120px', height: '40px', objectFit: 'contain' }}
      />
      <div style={{ color: '#8EB093', fontSize: '20px', letterSpacing: '2px' }}>★★★★★</div>
      <span style={{ color: '#8EB093', fontSize: '14px', fontWeight: 700 }}>Over 200+ Reviews</span>
    </div>
  );
}

export default function SlimmingGuidePage() {
  return (
    <main className="w-full" style={{ fontFamily: bodyFont, color: '#9B8D83' }}>
      {/* Hero Section */}
      <section
        className="py-20"
        style={{ background: 'linear-gradient(135deg, #3f5a44 0%, #5d7c5f 55%, #7a9a7d 100%)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div>
              <h1
                className="mb-6 leading-tight uppercase"
                style={{ color: '#F4F1E9', fontFamily: headingFont, fontWeight: 400, fontSize: '40px', letterSpacing: '1px' }}
              >
                the weight-loss guide built for maltese lifestyle
              </h1>
              <p className="mb-6" style={{ color: '#E5EBE2', fontSize: '16px' }}>
                Recipes, meal timing &amp; a structured plan. Designed around the Mediterranean diet, the festa
                season, &amp; busy Maltese weeks.
              </p>
              <p className="mb-8" style={{ color: '#E5EBE2', fontSize: '16px' }}>
                The Carisma Slimming Guide gives you a doctor-backed system you can actually follow, no crash
                diets, no calorie counting.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-8">
                {heroFeatures.map((f) => (
                  <div key={f.text} className="flex items-start gap-3">
                    <span style={{ color: '#F4F1E9', fontSize: '18px', lineHeight: '1.3' }}>✓</span>
                    <p style={{ color: '#E5EBE2', fontSize: '14px' }}>
                      {f.label ? (
                        <>
                          <span style={{ fontWeight: 700, color: '#F4F1E9' }}>{f.label}</span> | {f.text}
                        </>
                      ) : (
                        f.text
                      )}
                    </p>
                  </div>
                ))}
              </div>
              <p
                className="mb-6"
                style={{ color: '#F4F1E9', fontFamily: headingFont, fontSize: '22px', letterSpacing: '1px' }}
              >
                FOR ONLY €30
              </p>
              <a
                href={PRODUCT_URL}
                className="inline-block py-3 px-8 rounded font-bold text-white text-sm mb-6"
                style={{ backgroundColor: '#8EB093' }}
              >
                Get Slimming Guide
              </a>
              <div className="flex items-center gap-3">
                <div style={{ color: '#F4F1E9', fontSize: '18px', letterSpacing: '2px' }}>★★★★★</div>
                <span style={{ color: '#E5EBE2', fontSize: '14px' }}>Over 200+ Reviews</span>
              </div>
            </div>

            {/* Right - product mockup */}
            <div className="flex justify-center">
              <img
                src="/wix/f940f0_a2ae67089c094ea4a1ed8c7a81f3c315~mv2.png"
                alt="3D mockup of the Carisma Slimming Guide product (Guide 3D 01.jpg.png)"
                style={{ width: '360px', aspectRatio: '679 / 943', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Badge Section */}
      <section className="py-12" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-8">
            <SocialProof />
          </div>
          <div className="flex justify-center">
            <span
              className="inline-block px-5 py-2 rounded-full text-white text-sm font-bold"
              style={{ backgroundColor: '#8EB093' }}
            >
              #1 Voted Clinic in Malta
            </span>
          </div>
        </div>
      </section>

      {/* Main Narrative / Pain Point Section */}
      <section className="py-16" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="px-6 py-10 sm:px-12 sm:py-12"
            style={{ backgroundColor: '#F4F1E9', borderRadius: '16px' }}
          >
            <h2
              className="text-center mb-10 lowercase"
              style={{ color: '#7ba587', fontFamily: headingFont, fontWeight: 400, fontSize: '30px' }}
            >
              it was never about discipline.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div className="flex flex-col gap-6">
                <img
                  src="/wix/11062b_926c2ba259264b22bed8a16f8021e64b~mv2.jpg"
                  alt="Woman Eating Pizza"
                  style={{ width: '100%', aspectRatio: '338 / 386', objectFit: 'cover', objectPosition: 'center top', borderRadius: '12px' }}
                />
              </div>
              <div>
              <p className="mb-4" style={{ color: '#9B8D83', fontSize: '16px' }}>
                You started on a Monday. You were ready. The rules were clear. The commitment felt real.
              </p>
              <p className="mb-4" style={{ color: '#9B8D83', fontSize: '16px' }}>
                By Wednesday, life happened. A dinner you didn&apos;t plan for. A week that ran away from you. A
                moment where you were tired and hungry and the willpower just wasn&apos;t there.
              </p>
              <p className="mb-4" style={{ color: '#9B8D83', fontSize: '16px' }}>
                So you started again the following Monday.
              </p>
              <p className="mb-4" style={{ color: '#9B8D83', fontSize: '16px' }}>
                Then again. Then again.
              </p>
              <p className="mb-4" style={{ color: '#9B8D83', fontSize: '16px' }}>
                Here is what that pattern actually tells you: not that you lack discipline, but that the system
                you were following required too much of it. Every single day. Perfect decisions. Perfect
                portions. Perfect meals. On days that are never perfect.
              </p>
              <p className="mb-4" style={{ color: '#9B8D83', fontSize: '16px' }}>
                You know what happens when a difficult week meets a fragile plan. The plan breaks. And somehow,
                the story you end up telling yourself is that you broke it.
              </p>
              <p className="mb-4" style={{ color: '#9B8D83', fontSize: '16px' }}>
                You didn&apos;t.
              </p>
              <p className="mb-4" style={{ color: '#9B8D83', fontSize: '16px' }}>
                Not your effort. Not your intention. Not your character.
              </p>
              <p className="mb-2" style={{ color: '#9B8D83', fontSize: '16px' }}>
                The plan was fragile. That is where this starts.
              </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Built To Hold Band */}
      <section
        className="py-14"
        style={{ background: 'linear-gradient(135deg, #3f5a44 0%, #5d7c5f 60%, #7a9a7d 100%)' }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p
            className="uppercase"
            style={{ color: '#F4F1E9', fontFamily: headingFont, fontSize: '26px', letterSpacing: '1px', lineHeight: '1.5' }}
          >
            THIS IS A SYSTEM BUILT TO HOLD.
            <br />
            NOT A QUICK FIX.
          </p>
        </div>
      </section>

      {/* What This Is Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Kicker>WHAT THIS IS</Kicker>
          <h2
            className="mb-8 lowercase"
            style={{ color: '#7ba587', fontFamily: headingFont, fontWeight: 400, fontSize: '30px' }}
          >
            this is not a diet.
          </h2>
          <p className="mb-6" style={{ color: '#9B8D83', fontSize: '16px' }}>
            Not a challenge. Not a 30-day reset. Not a system that requires you to be a different person to use
            it. The Carisma Slimming Guide is a behaviour system. Built from real clinic practice. Designed for
            the life you actually have.
          </p>
          <p className="mb-6" style={{ color: '#9B8D83', fontSize: '16px' }}>
            The principle it runs on is this: what you can repeat consistently will always outperform what you
            can do once brilliantly. Not the perfect week. A structure stable enough to survive the imperfect
            one.
          </p>
          <p className="mb-8" style={{ color: '#9B8D83', fontSize: '16px' }}>
            Adherence over perfection. Structure over willpower. That is the whole system.
          </p>
          <img
            src="/wix/f940f0_04682b1e57084d5bb6306b1bb52d3534~mv2.png"
            alt="A4 paper mockup of the guide (A4 Papdfgfder Mockup V1.0.png)"
            style={{ width: '100%', aspectRatio: '771 / 618', objectFit: 'contain' }}
          />
          <p className="mt-8 mb-8" style={{ color: '#9B8D83', fontSize: '16px' }}>
            That is what this guide builds. And when that structure holds, weight loss stops being something you
            fight for. It becomes a result that follows.
          </p>
          <a
            href={PRODUCT_URL}
            className="inline-block py-3 px-8 rounded font-bold text-white text-sm"
            style={{ backgroundColor: '#8EB093' }}
          >
            Get Slimming Guide
          </a>
        </div>
      </section>

      {/* Method Section */}
      <section className="py-16" style={{ backgroundColor: '#EEF3F0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <Kicker>THE METHOD</Kicker>
            <h2
              className="mb-6 lowercase"
              style={{ color: '#7ba587', fontFamily: headingFont, fontWeight: 400, fontSize: '28px' }}
            >
              the reason other plans fell apart is not a mystery.
            </h2>
            <p style={{ color: '#9B8D83', fontSize: '16px' }}>
              Every plan that has ever failed you asked for too many decisions made under pressure. This method
              does the opposite. It reduces decisions. Four questions. One clear answer to each. That is the
              entire structure.
            </p>
          </div>
          <img
            src="/wix/f940f0_ba288e10728a451e8acef9cbbaeaf46a~mv2.png"
            alt="The Method flyer image (Freedfvvdfv Flyer 02.png)"
            style={{ width: '100%', aspectRatio: '771 / 708', objectFit: 'contain' }}
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {methodPillars.map((p) => {
              const [first, ...rest] = p.title.split(' ');
              return (
                <div
                  key={p.title}
                  className="p-8"
                  style={{ backgroundColor: '#DDE7DC', borderRadius: '12px' }}
                >
                  <h3
                    className="mb-4 uppercase"
                    style={{ color: '#5d7c5f', fontFamily: headingFont, fontSize: '20px', letterSpacing: '1px' }}
                  >
                    <span style={{ fontWeight: 600 }}>{first}</span>{' '}
                    <span style={{ color: '#9B8D83' }}>{rest.join(' ')}</span>
                  </h3>
                  <p style={{ color: '#9B8D83', fontSize: '14px' }}>{p.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Success Outcomes Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-center mb-12 lowercase"
            style={{ color: '#7ba587', fontFamily: headingFont, fontWeight: 400, fontSize: '28px' }}
          >
            What success actually looks like.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {outcomes.map((o, i) => (
              <div key={o.title} className="bg-white p-8 rounded-lg shadow-md" style={{ backgroundColor: '#EEF3F0' }}>
                <div className="flex items-center gap-4 mb-3">
                  <div
                    className="flex items-center justify-center text-white font-bold px-3"
                    style={{ backgroundColor: '#8EB093', height: '32px', borderRadius: '8px', fontSize: '13px', letterSpacing: '1px' }}
                  >
                    STEP {i + 1}
                  </div>
                  <h3 style={{ color: '#9B8D83', fontFamily: headingFont, fontSize: '18px' }}>{o.title}</h3>
                </div>
                <p style={{ color: '#9B8D83', fontSize: '15px' }}>{o.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stabilise Band */}
      <section
        className="py-14"
        style={{ background: 'linear-gradient(135deg, #3f5a44 0%, #5d7c5f 60%, #7a9a7d 100%)' }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p
            className="uppercase"
            style={{ color: '#F4F1E9', fontFamily: headingFont, fontSize: '24px', letterSpacing: '1px', lineHeight: '1.5' }}
          >
            WHEN THESE FOUR FOUNDATIONS STABILISE
            <br />
            WEIGHT LOSS BECOMES A NATURAL OUTCOME.
          </p>
        </div>
      </section>

      {/* Designed for Malta Section */}
      <section className="py-16" style={{ backgroundColor: '#EEF3F0' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Kicker>DESIGNED FOR MALTA</Kicker>
          <h2
            className="mb-8 lowercase"
            style={{ color: '#7ba587', fontFamily: headingFont, fontWeight: 400, fontSize: '28px' }}
          >
            it was built for malta. not for a version where nobody eats pasta.
          </h2>
          <p className="mb-4" style={{ color: '#9B8D83', fontSize: '16px' }}>
            Maltese life is specific. You know what it looks like.
          </p>
          <p className="mb-4" style={{ color: '#9B8D83', fontSize: '16px' }}>
            Sunday lunch that runs until four. Dinners that start late and finish later. Tables where plates are
            shared and seconds are expected. Restaurants where the bread arrives before you have time to decide.
            Weeks that collapse in on themselves before Thursday.
          </p>
          <p className="mb-4" style={{ color: '#9B8D83', fontSize: '16px' }}>
            This method was not built to fight that. It was built to design around it. The guide does not ask you
            to decline the dinner. It does not ask you to order a side salad while everyone else eats. It does
            not ask you to bring your own food, track the restaurant&apos;s macros, or explain yourself to the
            table.
          </p>
          <img
            src="/wix/87fc13_59346c1121b34e759ebf20eba3054c8c~mv2.png"
            alt="Designed for Malta image (Group 1707479766.png)"
            style={{ width: '100%', maxWidth: '320px', height: '220px', objectFit: 'contain', margin: '0 auto', display: 'block' }}
            className="my-8"
          />
          <div
            className="my-8 p-8"
            style={{ backgroundColor: '#DDE7DC', borderRadius: '12px' }}
          >
            <p
              className="uppercase mb-4"
              style={{ color: '#5d7c5f', fontFamily: headingFont, fontSize: '18px', letterSpacing: '1px' }}
            >
              FRIDAY EVENING, MALTA
            </p>
            <p className="mb-4" style={{ color: '#9B8D83', fontSize: '16px' }}>
              You sit down. You eat protein first when you can. You enjoy the pasta. You enjoy the conversation.
              You come home.
            </p>
            <p className="mb-4" style={{ color: '#9B8D83', fontSize: '16px' }}>
              Saturday morning you return at your next meal. No guilt. No compensation. No extra restriction. No
              mental negotiation about what you earned or owe. You simply return.
            </p>
            <p style={{ color: '#9B8D83', fontSize: '16px' }}>
              That is the system. Rhythm, interrupted and resumed. Not perfection. Just the structure, picked back
              up.
            </p>
          </div>
          <p className="mb-4" style={{ color: '#9B8D83', fontSize: '16px' }}>
            The guide includes recipes built for real Maltese kitchens. Practical, familiar dishes built within
            the method so they work without adaptation. Nothing aspirational. Nothing that requires ingredients
            you would not already have.
          </p>
          <p className="mb-8" style={{ color: '#7ba587', fontFamily: headingFont, fontSize: '17px' }}>
            We do not fight culture here. We design around it.
          </p>
          <p className="mb-4" style={{ color: '#9B8D83', fontSize: '16px' }}>
            Most people who come to us have already tried something. A diet that worked for a while. An app they
            stopped opening. A plan that felt right until life got in the way.
          </p>
          <p style={{ color: '#9B8D83', fontSize: '16px' }}>
            This guide was written for what comes after that.
          </p>
        </div>
      </section>

      {/* Is This For You Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Kicker>before you start</Kicker>
            <h2
              className="lowercase"
              style={{ color: '#7ba587', fontFamily: headingFont, fontWeight: 400, fontSize: '28px' }}
            >
              is this guide for you?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md" style={{ backgroundColor: '#EEF3F0' }}>
              <h3 className="mb-4" style={{ color: '#7ba587', fontFamily: headingFont, fontSize: '18px' }}>
                this guide is for you If
              </h3>
              <ul className="space-y-3">
                {forYou.map((item) => (
                  <li key={item} className="flex items-start gap-3" style={{ color: '#9B8D83', fontSize: '15px' }}>
                    <span style={{ color: '#8EB093', fontWeight: 700 }}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md" style={{ backgroundColor: '#EEF3F0' }}>
              <h3 className="mb-4" style={{ color: '#9B8D83', fontFamily: headingFont, fontSize: '18px' }}>
                this guide is not for you if
              </h3>
              <ul className="space-y-3">
                {notForYou.map((item) => (
                  <li key={item} className="flex items-start gap-3" style={{ color: '#AFA39D', fontSize: '15px' }}>
                    <span style={{ color: '#AFA39D', fontWeight: 700 }}>✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-center mt-12 max-w-3xl mx-auto" style={{ color: '#9B8D83', fontSize: '16px' }}>
            By the end, you will not have a list of rules to follow. You will have a way of thinking about food
            that holds, even on the weeks that don&apos;t.
          </p>
        </div>
      </section>

      {/* Final Call-to-Action Section */}
      <section className="py-16" style={{ backgroundColor: '#EEF3F0' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="mb-6 uppercase"
            style={{ color: '#7ba587', fontFamily: headingFont, fontWeight: 400, fontSize: '30px' }}
          >
            THE CARISMA
            <br />
            SLIMMING GUIDE
          </h2>
          <p className="mb-4" style={{ color: '#9B8D83', fontSize: '16px' }}>
            If you have read this far, you already know something is different here. This is not another plan
            asking you to be perfect. It is a structure asking you to return.
          </p>
          <p className="mb-8" style={{ color: '#9B8D83', fontSize: '16px' }}>
            Choosing this for yourself is not indulgent. It is practical. The structure you have been missing
            does not appear on its own. This is where it starts.
          </p>
          <a
            href={PRODUCT_URL}
            className="inline-block py-3 px-8 rounded font-bold text-white text-sm mb-10"
            style={{ backgroundColor: '#8EB093' }}
          >
            Get Slimming Guide
          </a>
          <div className="flex justify-center mb-10">
            <SocialProof />
          </div>
          <div className="flex justify-center">
            <img
              src="/wix/f940f0_05727f0f2b8049c69b8b60ee2cf16360~mv2.png"
              alt="Guide preview image (Guide 3fD 01.jpg.png)"
              style={{ width: '100%', maxWidth: '480px', aspectRatio: '964 / 752', objectFit: 'contain' }}
            />
          </div>
        </div>
      </section>

      {/* Carisma Difference Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-center mb-2 lowercase"
            style={{ color: '#7ba587', fontFamily: headingFont, fontWeight: 400, fontSize: '28px' }}
          >
            the carisma difference
          </h2>
          <p className="text-center mb-12 lowercase" style={{ color: '#AFA39D', fontSize: '16px' }}>
            malta&apos;s #1 leading wellness chain
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="bg-white p-8 rounded-lg shadow-md" style={{ backgroundColor: '#EEF3F0' }}>
              <h3 className="mb-4 lowercase" style={{ color: '#9B8D83', fontFamily: headingFont, fontSize: '18px' }}>
                our commitment
              </h3>
              <ul className="space-y-3">
                {carismaCommitments.map((item) => (
                  <li key={item} className="flex items-start gap-3" style={{ color: '#9B8D83', fontSize: '15px' }}>
                    <span style={{ color: '#8EB093', fontWeight: 700 }}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md" style={{ backgroundColor: '#EEF3F0' }}>
              <h3 className="mb-4 uppercase" style={{ color: '#9B8D83', fontFamily: headingFont, fontSize: '18px' }}>
                WHY MALTA CHOOSES Carisma
              </h3>
              <ul className="space-y-3">
                {whyCarisma.map((item) => (
                  <li key={item} className="flex items-start gap-3" style={{ color: '#9B8D83', fontSize: '15px' }}>
                    <span style={{ color: '#8EB093', fontWeight: 700 }}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="text-center mb-12">
            <a
              href={PRODUCT_URL}
              className="inline-block py-3 px-8 rounded font-bold text-white text-sm"
              style={{ backgroundColor: '#8EB093' }}
            >
              Get Slimming Guide
            </a>
          </div>
          <div className="flex flex-col items-center gap-3">
            <img
              src="/wix/87fc13_0426ba92e1fa4e9ebce44215146be031~mv2.png"
              alt="Parking sign icon (parking-sign (1).png)"
              style={{ width: '64px', height: '64px', objectFit: 'contain' }}
            />
            <p style={{ color: '#7ba587', fontFamily: headingFont, fontSize: '15px' }}>
              Complimentary on-site parking
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
