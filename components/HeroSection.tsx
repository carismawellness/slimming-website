import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Doctor-Led Slimming & Weight Loss in Malta
            </h1>
            <p className="text-xl mb-4">
              Achieve up to 1kg a week with our comprehensive medical program
            </p>
            <p className="text-lg text-blue-50 mb-8">
              Combining medical assessment, personalized nutrition, exercise, and non-invasive body contouring treatments
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/consultation"
                className="btn btn-primary px-8 py-3 font-semibold text-center"
              >
                Get Free Consultation
              </Link>
              <a
                href="tel:+35627802062"
                className="btn btn-secondary px-8 py-3 font-semibold text-center"
              >
                Call: +356 2780 2062
              </a>
            </div>
          </div>
          <div className="card bg-blue-700 h-96 flex items-center justify-center">
            <p className="text-white text-center">Hero Image Placeholder</p>
          </div>
        </div>
      </div>
    </section>
  );
}
