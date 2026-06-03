'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { cfg } from '@/lib/config';

const t = cfg.testimonials;
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
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--saffron)', fontFamily: 'var(--font-body)' }}>
            {t.sectionTag}
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: 'var(--navy)' }}>
            {t.heading}
            <span className="block italic font-light" style={{ color: 'var(--saffron)' }}>{t.headingAccent}</span>
          </h2>
          <p className="text-base leading-relaxed mt-4 max-w-lg mx-auto" style={{ color: 'var(--muted)', fontFamily: 'var(--font-body)' }}>
            {t.subtext}
          </p>
        </motion.div>

        {/* Testimonial cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.items.map((item, i) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 28, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: rotations[i] * 0.5 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: 'easeOut' }}
              whileHover={{ rotate: 0, y: -4, scale: 1.01 }}
              className="relative bg-white rounded-3xl p-6 flex flex-col cursor-default transition-shadow duration-300"
              style={{ border: '1px solid var(--border)', boxShadow: '0 4px 16px rgba(13,43,94,0.07)' }}
            >
              {/* Giant quote mark */}
              <Quote className="absolute top-4 right-5 w-10 h-10 opacity-[0.07]" color={item.color} />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: item.rating }).map((_, s) => (
                  <Star key={s} className="w-3.5 h-3.5" fill="var(--amber)" color="var(--amber)" />
                ))}
              </div>

              {/* Test tag */}
              <span
                className="inline-block text-[10px] font-semibold px-2.5 py-1 rounded-full mb-4 w-fit"
                style={{ background: item.bg, color: item.color, fontFamily: 'var(--font-body)' }}
              >
                {item.testType}
              </span>

              {/* Quote text */}
              <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: 'var(--charcoal)', fontFamily: 'var(--font-body)' }}>
                &ldquo;{item.text}&rdquo;
              </p>

              {/* Divider */}
              <div className="h-px mb-4" style={{ background: 'var(--border)' }} />

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-display font-bold text-sm shrink-0"
                  style={{ background: item.color }}
                >
                  {item.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--charcoal)', fontFamily: 'var(--font-body)' }}>{item.name}</p>
                  <p className="text-xs" style={{ color: 'var(--muted)', fontFamily: 'var(--font-body)' }}>{item.location}</p>
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
              {t.rating.score} / {t.rating.maxScore}
            </span>
            <span className="text-sm" style={{ color: 'var(--muted)' }}>
              from {t.rating.reviewCount} Google reviews
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
