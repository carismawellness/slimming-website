'use client';

import { useRef, useState } from 'react';

export default function HeroVideo({
  src,
  poster,
  // Accessible deep-sage (--brand-green-text). Clears WCAG 1.4.11 (>=3:1) as a
  // graphical play affordance even on the worst-case white circle composited
  // over dark video (3.84:1); 5.42:1 on near-white. The bright brand sage
  // (#7ba587/#8eb093) only reached 2.77:1 here and is decorative-only.
  playColor = '#4f7256',
  hideButton = false,
}: {
  src: string;
  poster: string;
  playColor?: string;
  hideButton?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls={started}
        playsInline
        preload="metadata"
        onPlay={() => setStarted(true)}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', backgroundColor: '#000' }}
      />
      {!started && (
        <button
          type="button"
          onClick={() => videoRef.current?.play()}
          aria-label="Play video"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'transparent', border: 0 }}
        >
          {!hideButton && (
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '9999px',
                width: '64px',
                height: '64px',
                // Solid white circle (was rgba 0.85). Guarantees the play
                // triangle's >=3:1 contrast regardless of the video frame
                // behind it; the 85% version composited to ~#d9d9d9 over dark
                // video and dropped the triangle to 1.96:1.
                backgroundColor: '#ffffff',
                // Visible focus indicator (>=3:1, WCAG 2.4.7/2.4.11): white ring
                // + deep-sage halo so it reads on both light and dark media.
                outline: focused ? '3px solid #ffffff' : 'none',
                outlineOffset: focused ? '2px' : 0,
                boxShadow: focused ? '0 0 0 6px #4f7256' : 'none',
              }}
            >
              <span style={{ marginLeft: '5px', width: 0, height: 0, borderLeft: `18px solid ${playColor}`, borderTop: '11px solid transparent', borderBottom: '11px solid transparent' }} />
            </span>
          )}
        </button>
      )}
    </div>
  );
}
