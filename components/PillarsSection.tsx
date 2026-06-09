export default function PillarsSection() {
  const pillars = [
    {
      title: 'Medical Assessment',
      description: 'Comprehensive body composition analysis and doctor consultation',
      icon: '🏥',
    },
    {
      title: 'Nutrition & Coaching',
      description: 'Personalized nutrition plans with ongoing accountability support',
      icon: '🥗',
    },
    {
      title: 'Exercise & Movement',
      description: 'Structured workout programs with gym access and training',
      icon: '💪',
    },
    {
      title: 'Body Contouring',
      description: 'Non-invasive treatments targeting stubborn areas',
      icon: '✨',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">Our Comprehensive Approach</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-5xl mb-4">{pillar.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{pillar.title}</h3>
              <p className="text-gray-600">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
