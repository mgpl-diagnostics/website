'use client';

import { motion } from 'framer-motion';
import { Truck, Clock, CheckCircle2, Phone, ArrowRight, type LucideIcon } from 'lucide-react';
import { siteConfig, cfg } from '@/lib/config';
import { useBookTest } from '@/context/BookTestContext';

const ICON_MAP: Record<string, LucideIcon> = { Phone, Truck, CheckCircle2 };

const hc = cfg.homeCollection;

export default function HomeCollection() {
  const { openDialog } = useBookTest();

  return (
    <section
      id="home-collection"
      className="section-pad overflow-hidden relative"
      style={{ background: 'var(--warm-white)' }}
      aria-label="Home sample collection"
    >
      {/* Background decorative shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 right-0 w-80 h-80 rounded-full blur-3xl" style={{ background: 'rgba(230,81,0,0.06)' }} />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full blur-3xl" style={{ background: 'rgba(13,43,94,0.05)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Section tag */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--saffron)', fontFamily: 'var(--font-body)' }}>
            {hc.sectionTag}
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: 'var(--navy)' }}>
            {hc.heading}
            <span className="block italic font-light" style={{ color: 'var(--saffron)' }}>{hc.headingAccent}</span>
          </h2>
          <p className="text-base leading-relaxed mt-4 max-w-xl mx-auto" style={{ color: 'var(--muted)', fontFamily: 'var(--font-body)' }}>
            {hc.subtext}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left: Steps ────────────────────────────────── */}
          <div className="space-y-6">
            {hc.steps.map((step, i) => {
              const Icon = ICON_MAP[step.icon] ?? Phone;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.14, ease: 'easeOut' }}
                  className="flex gap-5 items-start"
                >
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-display font-bold text-xl text-white shadow-md" style={{ background: 'var(--navy)' }}>
                      {step.number}
                    </div>
                    {i < hc.steps.length - 1 && (
                      <div className="w-px flex-1 mt-2" style={{ minHeight: '40px', background: 'linear-gradient(to bottom, var(--navy), transparent)', opacity: 0.25 }} />
                    )}
                  </div>

                  <div className="rounded-2xl p-5 flex-1 bg-white transition-all duration-200 hover:shadow-md" style={{ border: '1px solid var(--border)' }}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--saffron-muted)' }}>
                        <Icon className="w-4 h-4" color="var(--saffron)" />
                      </div>
                      <h3 className="font-display font-semibold text-lg" style={{ color: 'var(--navy)' }}>{step.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)', fontFamily: 'var(--font-body)' }}>{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ── Right: Visual Card ─────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative"
          >
            <div className="rounded-3xl p-8 lg:p-10 relative overflow-hidden" style={{ background: 'var(--navy)' }}>
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full" style={{ background: 'rgba(230,81,0,0.15)' }} />
              <div className="absolute -bottom-12 -left-12 w-36 h-36 rounded-full" style={{ background: 'rgba(255,143,0,0.1)' }} />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(230,81,0,0.2)' }}>
                    <Truck className="w-6 h-6" color="var(--saffron)" />
                  </div>
                  <div>
                    <p className="text-white font-display font-semibold text-lg">{hc.cardTitle}</p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{hc.cardSubtitle}</p>
                  </div>
                </div>

                {/* Features list */}
                <div className="space-y-3 mb-8">
                  {hc.features.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(27,138,90,0.3)' }}>
                        <CheckCircle2 className="w-3 h-3" color="#1B8A5A" />
                      </div>
                      <span className="text-sm" style={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-body)' }}>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Time indicators */}
                <div className="flex items-center gap-3 rounded-xl px-4 py-3 mb-8" style={{ background: 'rgba(255,255,255,0.08)' }}>
                  <Clock className="w-4 h-4 shrink-0" color="var(--amber)" />
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-body)' }}>
                    Available {siteConfig.hours.short}
                  </span>
                </div>

                {/* CTA Button */}
                <button
                  onClick={openDialog}
                  className="group inline-flex items-center justify-center gap-2 w-full py-4 rounded-full text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                  style={{ background: 'var(--saffron)', color: '#fff', fontFamily: 'var(--font-body)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--saffron-light)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--saffron)')}
                >
                  {hc.ctaLabel}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>

                {/* Floating pulse rings */}
                <div className="absolute top-8 right-8 z-20">
                  <div className="w-3 h-3 rounded-full" style={{ background: 'var(--saffron)', animation: 'pulse-cta 2.5s ease-in-out infinite' }} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
