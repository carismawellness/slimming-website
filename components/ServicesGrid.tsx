import Link from 'next/link';

export default function ServicesGrid() {
  const services = [
    {
      title: 'Weight Loss Program',
      description: 'Comprehensive medical weight loss program',
      href: '/weight-loss',
      icon: '⚖️',
    },
    {
      title: 'GLP-1 Medications',
      description: 'Medical-grade weight loss medications (Ozempic, Mounjaro)',
      href: '/glp1',
      icon: '💊',
    },
    {
      title: 'Fat Freezing',
      description: 'CoolSculpting - Non-invasive fat reduction',
      href: '/packages/fat-freezing',
      icon: '❄️',
    },
    {
      title: 'Muscle Stimulation',
      description: 'EMSculpt NEO - Build and tone muscle',
      href: '/packages/muscle-stimulation',
      icon: '💪',
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Link key={index} href={service.href}>
              <div className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:border-blue-600 hover:shadow-lg transition cursor-pointer h-full">
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <span className="text-blue-600 font-semibold">Learn More →</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/packages"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 inline-block"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
