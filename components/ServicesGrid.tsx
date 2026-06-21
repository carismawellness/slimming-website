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
              <div className="card p-8 cursor-pointer h-full">
                <div className="text-5xl mb-4" aria-hidden="true">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-[var(--text-light)] mb-4">{service.description}</p>
                <span className="text-[var(--brand-green-text)] font-semibold underline">Learn More →</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/packages"
            className="btn btn-primary px-8 py-3 font-semibold"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
