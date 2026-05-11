'use client';

import { motion } from 'framer-motion';
import { TestTube2, HeartPulse, Activity, Droplets, Home, Microscope, ArrowRight } from 'lucide-react';
import { fadeUpVariant, staggerContainer } from '@/lib/motion';

const services = [
  {
    icon: TestTube2,
    title: 'Blood Tests',
    description: 'Complete blood count, biochemistry panels, and comprehensive metabolic profiles with precision analysis.',
    color: 'saffron',
    iconBg: 'var(--saffron-muted)',
    iconColor: 'var(--saffron)',
  },
  {
    icon: HeartPulse,
    title: 'Full Body Checkup',
    description: 'Comprehensive wellness screening covering 60+ parameters — heart, liver, kidneys, and beyond.',
    color: 'navy',
    iconBg: 'var(--navy-pale)',
    iconColor: 'var(--navy)',
  },
  {
    icon: Activity,
    title: 'Thyroid Profile',
    description: 'Accurate TSH, T3, T4 and anti-TPO analysis with detailed expert interpretation and follow-up guidance.',
    color: 'forest',
    iconBg: 'var(--forest-pale)',
    iconColor: 'var(--forest)',
  },
  {
    icon: Droplets,
    title: 'Diabetes Screening',
    description: 'HbA1c, fasting glucose, insulin resistance panels — early detection saves lives and health complications.',
    color: 'amber',
    iconBg: '#FFF8E1',
    iconColor: 'var(--amber)',
  },
  {
    icon: Home,
    title: 'Home Collection',
    description: 'Certified phlebotomists come to you. Book in minutes, sample collected at your door, reports online.',
    color: 'saffron',
    iconBg: 'var(--saffron-muted)',
    iconColor: 'var(--saffron)',
  },
  {
    icon: Microscope,
    title: 'Advanced Diagnostics',
    description: 'Specialized genomic, immunology, and molecular testing for complex medical conditions.',
    color: 'navy',
    iconBg: 'var(--navy-pale)',
    iconColor: 'var(--navy)',
  },
];


export default function ServicesGrid() {
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
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: 'var(--saffron)', fontFamily: 'var(--font-body)' }}
          >
            What We Offer
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
              style={{ color: 'var(--navy)' }}
            >
              Diagnostic
              <span
                className="block italic font-light"
                style={{ color: 'var(--saffron)' }}
              >
                Services
              </span>
            </h2>
            <p
              className="text-base leading-relaxed max-w-sm"
              style={{ color: 'var(--muted)', fontFamily: 'var(--font-body)' }}
            >
              Every test we offer is conducted with precision equipment, expert oversight, and genuine care for your wellbeing.
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
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                variants={fadeUpVariant}
                className="group relative bg-white rounded-2xl p-7 cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
                style={{
                  border: '1px solid var(--border)',
                  boxShadow: '0 2px 8px rgba(13,43,94,0.06)',
                }}
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
                  style={{
                    background: `radial-gradient(ellipse at top left, ${service.iconBg} 0%, transparent 65%)`,
                  }}
                />

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 relative z-10"
                  style={{ background: service.iconBg }}
                >
                  <Icon className="w-5.5 h-5.5" color={service.iconColor} />
                </div>

                {/* Content */}
                <h3
                  className="font-display font-semibold text-xl mb-2 relative z-10"
                  style={{ color: 'var(--navy)' }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-5 relative z-10"
                  style={{ color: 'var(--muted)', fontFamily: 'var(--font-body)' }}
                >
                  {service.description}
                </p>

                {/* Learn more link */}
                <div
                  className="inline-flex items-center gap-1.5 text-xs font-semibold relative z-10 transition-colors group-hover:gap-2.5 duration-200"
                  style={{ color: service.iconColor, fontFamily: 'var(--font-body)' }}
                >
                  Book This Test
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 duration-200" />
                </div>
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
          <a
            href="#book"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-white text-sm font-semibold rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            style={{ background: 'var(--navy)', fontFamily: 'var(--font-body)' }}
          >
            View All Tests & Packages
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
