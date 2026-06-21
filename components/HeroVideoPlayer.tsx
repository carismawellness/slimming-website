'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

/* ──────────────────────────────────────────────────────────────────────────
   HeroVideoPlayer — LCP-optimised click-to-play hero video.

   Strategy:
   • Before play: render a Next.js <Image priority> of the poster so the
     browser fetches it immediately as part of the initial HTML — this is
     the LCP element and should paint in <1 s with the preload hint in
     layout.tsx.
   • The <video> element is NOT mounted until the user clicks play, so the
     browser never wastes bandwidth downloading the video on page load.
   • On click: swap the static image for the video, auto-play at full volume.
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

/* Active video player — only mounts after user clicks play */
function ActiveVideo({
  src,
  poster,
  alt,
  fit,
}: {
  src: string;
  poster?: string;
  alt?: string;
  fit: 'cover' | 'contain';
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = false;
    v.volume = 1;
    v.play()
      .then(() => setPlaying(true))
      .catch(() => {
        v.muted = true;
        setMuted(true);
        v.play()
          .then(() => setPlaying(true))
          .catch(() => {});
      });
  }, []);

  const toggleFrame = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      v.pause();
    }
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
    <>
      <video
        ref={ref}
        src={src}
        poster={poster}
        playsInline
        preload="none"
        aria-label={alt || 'Carisma Slimming Malta'}
        onClick={toggleFrame}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        style={{
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
      {!playing && <PlayBtn onClick={() => ref.current?.play().then(() => setPlaying(true)).catch(() => {})} />}
      {playing && (
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? 'Unmute video' : 'Mute video'}
          title={muted ? 'Unmute' : 'Mute'}
          style={{
            position: 'absolute',
            bottom: 12,
            right: 12,
            zIndex: 3,
            width: 42,
            height: 42,
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
      )}
    </>
  );
}

/* ── Main export ─────────────────────────────────────────────────────────── */
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

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        borderRadius: 'inherit',
        overflow: 'hidden',
      }}
    >
      {active ? (
        <ActiveVideo src={src} poster={poster} alt={alt} fit={fit} />
      ) : (
        <>
          {/* LCP element — server-rendered immediately, no JS needed */}
          <Image
            src={poster || '/Thumbnail.png'}
            alt={alt || 'Carisma Slimming Malta — click to play'}
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 900px) 100vw, 45vw"
            style={{ objectFit: fit }}
          />
          <span aria-hidden style={SCRIM} />
          <PlayBtn onClick={() => setActive(true)} />
        </>
      )}
    </div>
  );
}
