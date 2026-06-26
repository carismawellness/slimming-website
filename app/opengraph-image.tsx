import { ImageResponse } from 'next/og'

// Dynamic Open Graph image (same robust approach as the Pulse site): Next serves
// this at /opengraph-image as a correctly-sized 1200×630 PNG with the right
// headers, and metadataBase turns it into an absolute URL for social scrapers.
export const runtime = 'edge'
export const alt = 'Carisma Slimming | Doctor-Led Weight Loss Clinic Malta'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          // Deep forest green (brand --brand-green-deep #024c27)
          background: 'linear-gradient(135deg, #024c27 0%, #06351f 55%, #04211a 100%)',
          position: 'relative',
        }}
      >
        {/* Sage glow top-left (--brand-green-light #c9d8c1) */}
        <div style={{
          position: 'absolute', top: '-120px', left: '-120px',
          width: '520px', height: '520px', borderRadius: '50%', display: 'flex',
          background: 'radial-gradient(circle, rgba(201,216,193,0.18) 0%, rgba(201,216,193,0) 70%)',
        }} />
        {/* Bronze glow bottom-right (--accent-bronze #978063) */}
        <div style={{
          position: 'absolute', bottom: '-100px', right: '-100px',
          width: '440px', height: '440px', borderRadius: '50%', display: 'flex',
          background: 'radial-gradient(circle, rgba(151,128,99,0.35) 0%, rgba(151,128,99,0) 70%)',
        }} />

        {/* Eyebrow */}
        <div style={{
          display: 'flex', fontSize: '30px', letterSpacing: '0.42em', paddingLeft: '0.42em',
          color: '#c9d8c1', textTransform: 'uppercase', fontWeight: 600,
        }}>
          Carisma
        </div>

        {/* Wordmark */}
        <div style={{
          display: 'flex', fontSize: '104px', fontWeight: 700, color: '#f3f8f1',
          letterSpacing: '0.04em', marginTop: '6px',
        }}>
          Slimming
        </div>

        {/* Hairline */}
        <div style={{
          display: 'flex', width: '92px', height: '2px',
          background: 'rgba(151,128,99,0.8)', margin: '30px 0',
        }} />

        {/* Tagline */}
        <div style={{ display: 'flex', fontSize: '34px', color: '#dbe7d6', letterSpacing: '0.06em' }}>
          Doctor-led weight loss
        </div>
        {/* Location */}
        <div style={{
          display: 'flex', fontSize: '22px', color: 'rgba(219,231,214,0.7)',
          marginTop: '16px', letterSpacing: '0.08em',
        }}>
          Medical weight-loss clinic · Malta
        </div>
      </div>
    ),
    { ...size }
  )
}
