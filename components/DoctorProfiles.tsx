export default function DoctorProfiles() {
  const doctors = [
    {
      name: 'Dr. Zaid Teebi',
      specialty: 'Medical Consultant',
      experience: '30+ years',
      description: 'General medicine, geriatrics, sports medicine and allergy training',
      image: '👨‍⚕️',
    },
    {
      name: 'Dr. Giovanni Scornavacca',
      specialty: 'Aesthetic Doctor',
      experience: '20+ years',
      description: 'Specialized in aesthetic medicine and body contouring treatments',
      image: '👨‍⚕️',
    },
    {
      name: 'Dr. Francesca Chircop',
      specialty: 'Medical Aesthetics',
      experience: '8+ years',
      description: 'London-trained in medical aesthetics and cosmetic treatments',
      image: '👩‍⚕️',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12" style={{ color: 'var(--primary-navy)' }}>Our Medical Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => (
            <div key={index} className="card overflow-hidden">
              <div
                className="h-40 flex items-center justify-center"
                style={{ backgroundColor: 'var(--brand-green-text)' }}
                role="img"
                aria-label={`Portrait placeholder for ${doctor.name}`}
              >
                <span className="text-7xl" aria-hidden="true">{doctor.image}</span>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-1" style={{ color: 'var(--primary-navy)' }}>{doctor.name}</h3>
                <p className="font-semibold mb-2" style={{ color: 'var(--brand-green-text)' }}>{doctor.specialty}</p>
                <p className="text-sm mb-4" style={{ color: 'var(--text-light)' }}>{doctor.experience}</p>
                <p style={{ color: 'var(--text-dark)' }}>{doctor.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
