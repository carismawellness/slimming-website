// Wraps a section that ALREADY has a colored gradient and adds restrained depth
// layers behind the content: one localized pulsing blob, a faint dot pattern, an
// optional subtle box grid, and an optional motif watermark. All decorative
// (aria-hidden, pointer-events:none) and behind the content via z-index.
//
// Keep the section's existing gradient on this wrapper (pass via `style`/`className`).
// Children render above the layers automatically.

import MotifAccent from './MotifAccent';

type BlobPos = { top?: string; left?: string; right?: string; bottom?: string };

type Props = {
  children: React.ReactNode;
  /** false (default) = no blob; object = blob position, e.g. { top:'10%', right:'-6%' }. Opt-in. */
  blob?: false | BlobPos;
  dots?: boolean;
  grid?: boolean;
  motif?: false | 'watermark';
  className?: string;
  style?: React.CSSProperties;
};

export default function GradientField({
  children,
  blob = false,
  dots = true,
  grid = false,
  motif = false,
  className = '',
  style,
}: Props) {
  return (
    <div
      className={className}
      style={{ position: 'relative', isolation: 'isolate', overflow: 'hidden', ...style }}
    >
      <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        {dots && <span className="layer-dots" style={{ position: 'absolute', inset: 0 }} />}
        {grid && <span className="layer-grid" style={{ position: 'absolute', inset: 0 }} />}
        {blob && <span className="layer-blob" style={{ position: 'absolute', ...blob }} />}
        {motif && (
          <MotifAccent
            mode="watermark"
            style={{ position: 'absolute', right: '-4%', bottom: '-8%' }}
          />
        )}
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
}
