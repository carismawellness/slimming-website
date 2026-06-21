'use client';

import { useEffect, useRef, useState } from 'react';

/* ──────────────────────────────────────────────────────────────────────────
   HeroVideoPlayer — click-to-play hero video overlay.

   LCP strategy: the poster image is server-rendered by PageHero.tsx (the
   parent server component) as a plain <img fetchPriority="high">. This
   component only renders the play-button overlay in the pre-play state, and
   the <video> element (with preload="none") after the user clicks play.
   Zero video bytes are downloaded until the user explicitly clicks.
   ────────────────────────────────────────────────────────────────────────── */

const SCRIM: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
  zIndex: 1,
  background:
    'linear-gradient(to top, rgba(18,28,20,0.34) 0%, rgba(18,28,20,0.05) 30%, transparent 58%)',
};

function PlayBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Play video"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 2,
        display: 'grid',
        placeItems: 'center',
        border: 0,
        cursor: 'pointer',
        background: 'rgba(0,0,0,0.18)',
      }}
    >
      <span
        style={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          background: '#ffffff',
          display: 'grid',
          placeItems: 'center',
          boxShadow: '0 10px 28px rgba(0,0,0,0.32)',
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#4f7256"
          aria-hidden
          style={{ marginLeft: 3 }}
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </button>
  );
}

export default function HeroVideoPlayer({
  src,
  poster,
  alt,
  fit = 'cover',
}: {
  src: string;
  poster?: string;
  alt?: string;
  fit?: 'cover' | 'contain';
}) {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (!active) return;
    const v = ref.current;
    if (!v) return;
    v.muted = false;
    v.volume = 1;
    v.play()
      .then(() => {})
      .catch(() => {
        v.muted = true;
        setMuted(true);
        v.play().catch(() => {});
      });
  }, [active]);

  const toggleFrame = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    if (!v.muted) v.volume = 1;
    setMuted(v.muted);
  };

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        borderRadius: 'inherit',
      }}
    >
      {active ? (
        <>
          <video
            ref={ref}
            src={src}
            poster={poster}
            playsInline
            preload="none"
            aria-label={alt || 'Carisma Slimming Malta'}
            onClick={toggleFrame}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: fit,
              display: 'block',
              backgroundColor: '#0c0c0c',
              cursor: 'pointer',
              borderRadius: 'inherit',
            }}
          />
          <span aria-hidden style={SCRIM} />
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? 'Unmute video' : 'Mute video'}
            style={{
              position: 'absolute',
              bottom: 12,
              right: 12,
              zIndex: 3,
              width: 44,
              height: 44,
              borderRadius: '50%',
              border: 0,
              cursor: 'pointer',
              background: 'rgba(20,28,22,0.62)',
              backdropFilter: 'blur(3px)',
              WebkitBackdropFilter: 'blur(3px)',
              display: 'grid',
              placeItems: 'center',
              color: '#fff',
            }}
          >
            {muted ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M11 5 6 9H2v6h4l5 4z" fill="currentColor" stroke="none" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M11 5 6 9H2v6h4l5 4z" fill="currentColor" stroke="none" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            )}
          </button>
        </>
      ) : (
        <>
          <span aria-hidden style={SCRIM} />
          <PlayBtn onClick={() => setActive(true)} />
        </>
      )}
    </div>
  );
}
