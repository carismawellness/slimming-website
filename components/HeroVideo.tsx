'use client';

import { useRef, useState } from 'react';

export default function HeroVideo({
  src,
  poster,
  playColor = '#7ba587',
  hideButton = false,
}: {
  src: string;
  poster: string;
  playColor?: string;
  hideButton?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
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
          style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'transparent', border: 0 }}
        >
          {!hideButton && (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '9999px', width: '64px', height: '64px', backgroundColor: 'rgba(255,255,255,0.85)' }}>
              <span style={{ marginLeft: '5px', width: 0, height: 0, borderLeft: `18px solid ${playColor}`, borderTop: '11px solid transparent', borderBottom: '11px solid transparent' }} />
            </span>
          )}
        </button>
      )}
    </div>
  );
}
