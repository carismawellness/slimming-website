'use client';

import { useState } from 'react';

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Client Name',
      result: '10kg weight loss in 12 weeks',
      quote: 'Add your client testimonial here. Share their success story and transformation journey.',
      rating: 5,
    },
    {
      name: 'Client Name',
      result: '8kg weight loss in 8 weeks',
      quote: 'Add your client testimonial here. Share their success story and transformation journey.',
      rating: 5,
    },
    {
      name: 'Client Name',
      result: '15kg weight loss in 16 weeks',
      quote: 'Add your client testimonial here. Share their success story and transformation journey.',
      rating: 5,
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const testimonial = testimonials[currentIndex];

  return (
    <section className="py-16 bg-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">Real People, Real Results</h2>

        <div className="card-lift bg-white p-12">
          <div
            className="flex items-center justify-center gap-1 mb-4"
            role="img"
            aria-label={`Rated ${testimonial.rating} out of 5 stars`}
          >
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <span
                key={i}
                aria-hidden="true"
                className="text-2xl"
                style={{ color: 'var(--primary-gold-text)' }}
              >
                ★
              </span>
            ))}
            <span className="ml-2 text-base font-semibold" style={{ color: 'var(--text-dark)' }}>
              {testimonial.rating.toFixed(1)}
            </span>
          </div>

          <p className="text-2xl text-gray-700 text-center mb-8 italic">
            "{testimonial.quote}"
          </p>

          <div className="text-center mb-8">
            <p className="text-xl font-bold">{testimonial.name}</p>
            <p className="text-gray-600">{testimonial.result}</p>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={prevTestimonial}
              className="btn btn-secondary px-6 py-2"
            >
              ← Previous
            </button>
            <button
              onClick={nextTestimonial}
              className="btn btn-primary px-6 py-2"
            >
              Next →
            </button>
          </div>
        </div>

        <p className="text-center mt-12 text-gray-600">
          Over 200+ reviews with 5-star Google rating
        </p>
      </div>
    </section>
  );
}
