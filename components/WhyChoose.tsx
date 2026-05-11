'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Zap, BadgeCheck, Stethoscope, HeartHandshake, Microscope } from 'lucide-react';

const features = [
  {
    icon: CheckCircle2,
    title: 'Certified Accuracy',
    description: 'Our reports are cross-verified by qualified pathologists — zero compromise on precision.',
    iconColor: 'var(--forest)',
    iconBg: 'var(--forest-pale)',
  },
  {
    icon: Stethoscope,
    title: 'Expert Pathologists',
    description: 'A team of MD-qualified pathologists with 10–20 years of clinical experience.',
    iconColor: 'var(--navy)',
    iconBg: 'var(--navy-pale)',
  },
  {
    icon: Microscope,
    title: 'Modern Equipment',
    description: 'State-of-the-art analysers from globally recognized medical technology brands.',
    iconColor: 'var(--saffron)',
    iconBg: 'var(--saffron-muted)',
  },
  {
    icon: Zap,
    title: 'Fast Turnaround',
    description: 'Most routine tests delivered same day — within 4–6 hours from sample collection.',
    iconColor: 'var(--amber)',
    iconBg: '#FFF8E1',
  },
  {
    icon: HeartHandshake,
    title: 'Patient-First Care',
    description: "Warm, empathetic service — from booking to report delivery, we're with your family.",
    iconColor: 'var(--forest)',
    iconBg: 'var(--forest-pale)',
  },
  {
    icon: BadgeCheck,
    title: 'Hygienic Standards',
    description: 'Clinical-grade hygiene protocols: single-use supplies, sterilised environments.',
    iconColor: 'var(--navy)',
    iconBg: 'var(--navy-pale)',
  },
];

export default function WhyChoose() {
  return (
    <section
      id="why-choose"
      className="section-pad"
      style={{ background: 'var(--cream)' }}
      aria-label="Why choose MGPL"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-start">

          {/* ── Left: Sticky heading side ────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:sticky lg:top-32"
          >
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ color: 'var(--saffron)', fontFamily: 'var(--font-body)' }}
            >
              Why Families Trust Us
            </p>
            <h2
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ color: 'var(--navy)' }}
            >
              Precision.
              <span
                className="block italic font-light"
                style={{ color: 'var(--saffron)' }}
              >
                Compassion.
              </span>
              Trust.
            </h2>
            <p
              className="text-base leading-relaxed mb-8 max-w-sm"
              style={{ color: 'var(--muted)', fontFamily: 'var(--font-body)' }}
            >
              For over a decade, MGPL Diagnostics has been the trusted health partner for thousands of families — combining clinical excellence with genuine warmth.
            </p>

            {/* Decorative accent block */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: 'var(--navy)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <p
                className="font-display text-2xl font-semibold text-white leading-snug mb-2"
              >
                "Diagnostics with a human touch, not just a machine."
              </p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}>
                — Our founding philosophy
              </p>
            </div>
          </motion.div>

          {/* ── Right: Feature cards grid ─────────────────── */}
          <div className="grid sm:grid-cols-2 gap-4 lg:gap-5">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: 'easeOut' }}
                  className="group rounded-2xl p-5 bg-white transition-all duration-300 hover:-translate-y-1"
                  style={{
                    border: '1px solid var(--border)',
                    boxShadow: '0 2px 8px rgba(13,43,94,0.05)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(13,43,94,0.10)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(13,43,94,0.05)';
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: feature.iconBg }}
                  >
                    <Icon className="w-4.5 h-4.5" color={feature.iconColor} />
                  </div>
                  <h3
                    className="font-display font-semibold text-lg mb-2"
                    style={{ color: 'var(--navy)' }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--muted)', fontFamily: 'var(--font-body)' }}
                  >
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
