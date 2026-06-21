'use client';

import { useRef, useState } from 'react';

/* ──────────────────────────────────────────────────────────────────────────
   HeroVideoPlayer — click-to-play video with sound controls.

   • Does NOT autoplay: shows the poster + a play button until the user presses it.
   • Pressing play ALWAYS starts unmuted at full volume (user gesture → allowed).
   • A mute/unmute button is shown while playing; clicking the frame pauses.
   • Reduced-motion safe; no native controls (custom play + sound buttons only).
   ────────────────────────────────────────────────────────────────────────── */

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
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  const start = () => {
    const v = ref.current;
    if (!v) return;
    // Every play press = full volume, sound on.
    v.muted = false;
    v.volume = 1;
    setMuted(false);
    v.play()
      .then(() => setPlaying(true))
      .catch(() => {
        // Extremely defensive: if an unmuted play is somehow blocked, retry muted.
        v.muted = true;
        setMuted(true);
        v.play().then(() => setPlaying(true)).catch(() => {});
      });
  };

  const toggleFrame = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) start();
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
    // borderRadius: inherit + overflow keeps the arch shape; the radius is also
    // set on the <video> itself so a PLAYING video (its own GPU layer) self-clips
    // to the arch instead of snapping back to a rectangle.
    <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 'inherit', overflow: 'hidden' }}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        playsInline
        preload="metadata"
        aria-label={alt || 'Carisma Slimming Malta'}
        onClick={toggleFrame}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        style={{ width: '100%', height: '100%', objectFit: fit, display: 'block', backgroundColor: '#0c0c0c', cursor: 'pointer', borderRadius: 'inherit' }}
      />

      {/* subtle bottom scrim so floating cards / sound button always read */}
      <span
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1,
          background: 'linear-gradient(to top, rgba(18,28,20,0.34) 0%, rgba(18,28,20,0.05) 30%, transparent 58%)',
        }}
      />

      {/* play button (poster state) */}
      {!playing && (
        <button
          type="button"
          onClick={start}
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#4f7256" aria-hidden style={{ marginLeft: 3 }}>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}

      {/* sound toggle (while playing) */}
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
    </div>
  );
}
