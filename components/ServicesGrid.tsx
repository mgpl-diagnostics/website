'use client';

import { motion } from 'framer-motion';
import {
  TestTube2, HeartPulse, Activity, Droplets, Home, Microscope,
  ArrowRight, type LucideIcon,
} from 'lucide-react';
import { fadeUpVariant, staggerContainer } from '@/lib/motion';
import { cfg } from '@/lib/config';
import { useBookTest } from '@/context/BookTestContext';

const ICON_MAP: Record<string, LucideIcon> = {
  TestTube2, HeartPulse, Activity, Droplets, Home, Microscope,
};

const s = cfg.services;

export default function ServicesGrid() {
  const { openDialog } = useBookTest();

  return (
    <section
      id="services"
      className="section-pad"
      style={{ background: 'var(--warm-white)' }}
      aria-label="Our services"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 lg:mb-16"
        >
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--saffron)', fontFamily: 'var(--font-body)' }}>
            {s.sectionTag}
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: 'var(--navy)' }}>
              {s.heading}
              <span className="block italic font-light" style={{ color: 'var(--saffron)' }}>{s.headingAccent}</span>
            </h2>
            <p className="text-base leading-relaxed max-w-sm" style={{ color: 'var(--muted)', fontFamily: 'var(--font-body)' }}>
              {s.subtext}
            </p>
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-60px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {s.items.map((service) => {
            const Icon = ICON_MAP[service.icon] ?? TestTube2;
            return (
              <motion.article
                key={service.title}
                variants={fadeUpVariant}
                className="group relative bg-white rounded-2xl p-7 cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
                style={{ border: '1px solid var(--border)', boxShadow: '0 2px 8px rgba(13,43,94,0.06)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(13,43,94,0.13)';
                  e.currentTarget.style.borderColor = service.iconColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(13,43,94,0.06)';
                  e.currentTarget.style.borderColor = 'var(--border)';
                }}
                aria-label={service.title}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at top left, ${service.iconBg} 0%, transparent 65%)` }}
                />

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 relative z-10" style={{ background: service.iconBg }}>
                  <Icon className="w-5.5 h-5.5" color={service.iconColor} />
                </div>

                {/* Content */}
                <h3 className="font-display font-semibold text-xl mb-2 relative z-10" style={{ color: 'var(--navy)' }}>
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed mb-5 relative z-10" style={{ color: 'var(--muted)', fontFamily: 'var(--font-body)' }}>
                  {service.description}
                </p>

                {/* Book link */}
                <button
                  onClick={openDialog}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold relative z-10 transition-all group-hover:gap-2.5 duration-200"
                  style={{ color: service.iconColor, fontFamily: 'var(--font-body)' }}
                >
                  Book This Test
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 duration-200" />
                </button>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10"
        >
          <button
            onClick={openDialog}
            className="inline-flex items-center gap-2 px-8 py-3.5 text-white text-sm font-semibold rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            style={{ background: 'var(--navy)', fontFamily: 'var(--font-body)' }}
          >
            {s.viewAllLabel}
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
