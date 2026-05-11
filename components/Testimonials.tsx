'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sunita Agarwal',
    location: 'Varanasi, UP',
    initials: 'SA',
    rating: 5,
    testType: 'Full Body Checkup',
    text: "MGPL has been our family's go-to lab for years. The staff is incredibly courteous, reports are always accurate, and the home collection service is a true blessing — especially for my elderly mother-in-law.",
    color: 'var(--saffron)',
    bg: 'var(--saffron-muted)',
  },
  {
    name: 'Rajesh Kumar Singh',
    location: 'Lucknow, UP',
    initials: 'RK',
    rating: 5,
    testType: 'Diabetes Panel',
    text: "Got my HbA1c and fasting glucose done here. The report was ready within 5 hours and shared on WhatsApp. The doctor consultation after the report was an unexpected bonus. Highly recommend.",
    color: 'var(--navy)',
    bg: 'var(--navy-pale)',
  },
  {
    name: 'Priya Mehta',
    location: 'Allahabad, UP',
    initials: 'PM',
    rating: 5,
    testType: 'Thyroid Profile',
    text: "I was anxious about my thyroid results, but the staff was so warm and reassuring. The pathologist called personally to explain the values. That kind of care is rare today.",
    color: 'var(--forest)',
    bg: 'var(--forest-pale)',
  },
  {
    name: 'Anil Sharma',
    location: 'Kanpur, UP',
    initials: 'AS',
    rating: 5,
    testType: 'Lipid Profile',
    text: "Booked for my father — 78 years old — via home collection. The phlebotomist was gentle, professional, and on time. Reports were accurate and shared digitally. Superb service.",
    color: 'var(--saffron)',
    bg: 'var(--saffron-muted)',
  },
  {
    name: 'Nandini Tiwari',
    location: 'Prayagraj, UP',
    initials: 'NT',
    rating: 5,
    testType: 'CBC + Iron Studies',
    text: "Diagnosed early with iron deficiency thanks to MGPL's comprehensive iron panel suggestion. The team here thinks about your health holistically. I'm truly grateful.",
    color: 'var(--navy)',
    bg: 'var(--navy-pale)',
  },
  {
    name: 'Mohit Verma',
    location: 'Varanasi, UP',
    initials: 'MV',
    rating: 5,
    testType: 'Vitamin Panel',
    text: "Best diagnostics in the city. Clean facility, courteous staff, quick results. The digital reports make it effortless to share with multiple doctors. Will always return here.",
    color: 'var(--forest)',
    bg: 'var(--forest-pale)',
  },
];

const rotations = [-2, 1.5, -1, 2, -1.5, 1];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="section-pad"
      style={{ background: 'var(--warm-white)' }}
      aria-label="Patient testimonials"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14 lg:mb-16"
        >
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: 'var(--saffron)', fontFamily: 'var(--font-body)' }}
          >
            Patient Stories
          </p>
          <h2
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
            style={{ color: 'var(--navy)' }}
          >
            Trusted by
            <span
              className="block italic font-light"
              style={{ color: 'var(--saffron)' }}
            >
              50,000+ Families
            </span>
          </h2>
          <p
            className="text-base leading-relaxed mt-4 max-w-lg mx-auto"
            style={{ color: 'var(--muted)', fontFamily: 'var(--font-body)' }}
          >
            Real experiences from real patients across Uttar Pradesh — because trust is built one family at a time.
          </p>
        </motion.div>

        {/* Testimonial cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 28, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: rotations[i] * 0.5 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: 'easeOut' }}
              whileHover={{ rotate: 0, y: -4, scale: 1.01 }}
              className="relative bg-white rounded-3xl p-6 flex flex-col cursor-default transition-shadow duration-300"
              style={{
                border: '1px solid var(--border)',
                boxShadow: '0 4px 16px rgba(13,43,94,0.07)',
              }}
            >
              {/* Giant quote mark */}
              <Quote
                className="absolute top-4 right-5 w-10 h-10 opacity-[0.07]"
                color={t.color}
              />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star key={s} className="w-3.5 h-3.5" fill="var(--amber)" color="var(--amber)" />
                ))}
              </div>

              {/* Test tag */}
              <span
                className="inline-block text-[10px] font-semibold px-2.5 py-1 rounded-full mb-4 w-fit"
                style={{ background: t.bg, color: t.color, fontFamily: 'var(--font-body)' }}
              >
                {t.testType}
              </span>

              {/* Quote text */}
              <p
                className="text-sm leading-relaxed flex-1 mb-5"
                style={{ color: 'var(--charcoal)', fontFamily: 'var(--font-body)' }}
              >
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Divider */}
              <div className="h-px mb-4" style={{ background: 'var(--border)' }} />

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-display font-bold text-sm shrink-0"
                  style={{ background: t.color }}
                >
                  {t.initials}
                </div>
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: 'var(--charcoal)', fontFamily: 'var(--font-body)' }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: 'var(--muted)', fontFamily: 'var(--font-body)' }}
                  >
                    {t.location}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom rating bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full" style={{ background: 'var(--cream)', border: '1px solid var(--border)' }}>
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map((s) => (
                <Star key={s} className="w-4 h-4" fill="var(--amber)" color="var(--amber)" />
              ))}
            </div>
            <span className="text-sm font-semibold" style={{ color: 'var(--charcoal)' }}>
              4.9 / 5
            </span>
            <span className="text-sm" style={{ color: 'var(--muted)' }}>
              from 3,200+ Google reviews
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
