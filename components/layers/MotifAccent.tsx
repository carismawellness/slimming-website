// Decorative brand-motif accent. Recolored via CSS mask (see .layer-motif in
// globals.css) so color/opacity follow design tokens, not the asset's stroke.
// Purely presentational + aria-hidden — never conveys meaning.

type Props = {
  mode?: 'watermark' | 'divider';
  className?: string;
  style?: React.CSSProperties;
};

export default function MotifAccent({ mode = 'watermark', className = '', style }: Props) {
  const base: React.CSSProperties =
    mode === 'divider'
      ? { width: '100%', height: 28, ...style }
      : { width: 'min(60vw, 680px)', aspectRatio: '338 / 96', ...style };

  return (
    <span
      aria-hidden
      className={`layer-motif ${mode === 'divider' ? 'layer-motif--divider' : ''} ${className}`}
      style={{ display: 'block', pointerEvents: 'none', ...base }}
    />
  );
}
