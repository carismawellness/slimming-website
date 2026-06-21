import DoctorShowcase from '@/components/doctors/DoctorShowcase';
import DoctorCarousel3DShowcase from '@/components/doctors/DoctorCarousel3DShowcase';

// Side-by-side comparison sandbox (noindexed via /preview layout).
// Lets you A/B the live flat card grid vs the 3D coverflow, then decide which to keep.
export default function DoctorsComparePage() {
  const label: React.CSSProperties = {
    textAlign: 'center',
    fontFamily: '"Novecento Wide Book", sans-serif',
    fontSize: 12,
    letterSpacing: 3,
    textTransform: 'uppercase',
    color: '#fff',
    background: '#4f7256',
    padding: '10px 16px',
  };

  return (
    <main style={{ background: '#fff' }}>
      <div style={{ padding: '28px 16px 8px', textAlign: 'center', fontFamily: 'Roboto, sans-serif', color: '#5a4f43' }}>
        <h1 style={{ fontFamily: '"Trajan Pro", serif', fontSize: 22, color: '#4f7256', textTransform: 'uppercase' }}>
          Doctors — A/B Comparison
        </h1>
        <p style={{ fontSize: 13, marginTop: 6 }}>Scroll to see both. Tell me which to keep.</p>
      </div>

      {/* Option A — current live version */}
      <div style={label}>Option A · Current (live): photo card grid</div>
      <DoctorShowcase />

      <div style={{ height: 1, background: '#e5ded7' }} />

      {/* Option B — 3D coverflow carousel */}
      <div style={label}>Option B · 3D coverflow carousel (drag / swipe)</div>
      <DoctorCarousel3DShowcase />
    </main>
  );
}
