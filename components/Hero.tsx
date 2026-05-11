'use client';

import type { Transition } from 'framer-motion';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shield, Clock, Award, ArrowRight, Star, BadgeCheck } from 'lucide-react';

const EASE_OUT = 'easeOut' as const satisfies Transition['ease'];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: EASE_OUT } as Transition,
});

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      style={{ backgroundColor: 'var(--cream)' }}
      aria-label="Hero section"
    >
      {/* ── Atmosphere ────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Saffron radial glow – top right */}
        <div
          className="absolute -top-20 -right-20 w-150 h-150 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(230,81,0,0.08) 0%, transparent 70%)' }}
        />
        {/* Navy glow – bottom left */}
        <div
          className="absolute -bottom-32 -left-32 w-125 h-125 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(13,43,94,0.07) 0%, transparent 70%)' }}
        />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: 'radial-gradient(circle, #0D2B5E 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
        {/* Saffron diagonal accent arc */}
        <svg
          className="absolute top-0 right-0 w-1/2 h-full opacity-[0.045]"
          viewBox="0 0 800 900"
          fill="none"
          aria-hidden="true"
          preserveAspectRatio="xMaxYMid slice"
        >
          <path
            d="M 400 -100 Q 900 400 400 900"
            stroke="url(#grad1)"
            strokeWidth="200"
            fill="none"
          />
          <defs>
            <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E65100" />
              <stop offset="100%" stopColor="#FF8F00" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-28">
        <div className="grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_500px] gap-12 lg:gap-16 items-center">

          {/* ── Left Column ───────────────────────────── */}
          <div className="max-w-xl">

            {/* Trust pill badge */}
            <motion.div {...fadeUp(0)} className="mb-8">
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
                style={{
                  background: 'var(--forest-pale)',
                  border: '1px solid rgba(27,138,90,0.35)',
                  color: 'var(--forest)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: 'var(--forest)', animation: 'pulse 2s ease-in-out infinite' }}
                />
                NABL Standard Processes
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 {...fadeUp(0.1)} className="font-display leading-[1.05] mb-8">
              <span
                className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light italic"
                style={{ color: 'var(--saffron)' }}
              >
                Accurate
              </span>
              <span
                className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold"
                style={{ color: 'var(--navy)' }}
              >
                Diagnostics.
              </span>
              <span
                className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light mt-1"
                style={{ color: 'var(--charcoal)' }}
              >
                Compassionate
              </span>
              <span className="relative block mt-1 w-fit">
                <span
                  className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold"
                  style={{ color: 'var(--navy)' }}
                >
                  Care.
                </span>
                <span
                  className="absolute -bottom-1 left-0 right-0 h-0.75 rounded-full"
                  style={{ background: 'var(--saffron)' }}
                />
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              {...fadeUp(0.22)}
              className="text-lg leading-relaxed mb-10 max-w-md"
              style={{ color: 'var(--muted)', fontFamily: 'var(--font-body)' }}
            >
              Your family's trusted diagnostic partner — from routine blood panels to advanced
              profiles, delivered with precision, warmth, and complete dignity.
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.32)} className="flex flex-wrap gap-4 mb-12">
              <Link
                href="#book"
                className="group inline-flex items-center gap-2 px-8 py-4 text-white text-sm font-semibold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-250"
                style={{
                  background: 'var(--saffron)',
                  fontFamily: 'var(--font-body)',
                  animation: 'pulse-cta 2.5s ease-in-out infinite',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--saffron-light)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--saffron)')}
              >
                Book a Test
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#reports"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 text-sm font-semibold rounded-full hover:-translate-y-0.5 hover:text-white transition-all duration-250"
                style={{
                  borderColor: 'var(--navy)',
                  color: 'var(--navy)',
                  fontFamily: 'var(--font-body)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--navy)';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--navy)';
                }}
              >
                Download Report
              </Link>
            </motion.div>

            {/* Social proof micro-strip */}
            <motion.div {...fadeUp(0.44)} className="flex items-center gap-6 flex-wrap">
              <div className="flex items-center gap-2.5">
                <div className="flex -space-x-2">
                  {['S', 'R', 'A', 'K'].map((initial) => (
                    <div
                      key={initial}
                      className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold text-white"
                      style={{ background: 'var(--navy)' }}
                    >
                      {initial}
                    </div>
                  ))}
                </div>
                <span className="text-sm font-medium" style={{ color: 'var(--muted)', fontFamily: 'var(--font-body)' }}>
                  50,000+ patients served
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3.5 h-3.5" fill="var(--amber)" color="var(--amber)" />
                  ))}
                </div>
                <span className="text-sm font-semibold" style={{ color: 'var(--charcoal)', fontFamily: 'var(--font-body)' }}>
                  4.9 / 5
                </span>
              </div>
            </motion.div>
          </div>

          {/* ── Right Column — Visual Composition ─────── */}
          <div className="relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.25, ease: 'easeOut' }}
              className="relative"
            >
              {/* Saffron blob behind card */}
              <div
                className="absolute inset-0 -m-6 rounded-[60%_40%_50%_50%/50%_60%_40%_50%]"
                style={{ background: 'rgba(230,81,0,0.06)' }}
              />

              {/* Main Report Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white">
                {/* Card header */}
                <div
                  className="px-6 py-5 flex items-center justify-between"
                  style={{ background: 'var(--navy)' }}
                >
                  <div>
                    <p className="text-xs mb-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>
                      Patient Report
                    </p>
                    <p className="text-white text-xl font-display font-semibold">Lipid Profile</p>
                    <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>
                      ID: MG-2024-08821
                    </p>
                  </div>
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ background: 'rgba(27,138,90,0.25)' }}
                  >
                    <BadgeCheck className="w-6 h-6" color="#1B8A5A" />
                  </div>
                </div>

                {/* Metrics */}
                <div className="p-5 space-y-2.5">
                  {[
                    { name: 'Total Cholesterol', value: '178 mg/dL', ref: '< 200', ok: true },
                    { name: 'HDL Cholesterol', value: '62 mg/dL', ref: '> 40', ok: true },
                    { name: 'Triglycerides', value: '145 mg/dL', ref: '< 150', ok: true },
                    { name: 'LDL Cholesterol', value: '98 mg/dL', ref: '< 100', ok: true },
                    { name: 'VLDL Cholesterol', value: '29 mg/dL', ref: '< 30', ok: true },
                  ].map((m) => (
                    <div
                      key={m.name}
                      className="flex items-center justify-between px-3.5 py-2.5 rounded-xl"
                      style={{ background: 'var(--cream)' }}
                    >
                      <div>
                        <p className="text-xs font-semibold" style={{ color: 'var(--charcoal)', fontFamily: 'var(--font-body)' }}>
                          {m.name}
                        </p>
                        <p className="text-xs" style={{ color: 'var(--muted)' }}>
                          Ref: {m.ref}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold" style={{ color: 'var(--navy)' }}>
                          {m.value}
                        </p>
                        <span
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                          style={{
                            background: 'var(--forest-pale)',
                            color: 'var(--forest)',
                          }}
                        >
                          ✓ Normal
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer strip */}
                <div
                  className="px-5 py-3 flex items-center justify-between"
                  style={{ borderTop: '1px solid var(--border)' }}
                >
                  <span
                    className="text-xs font-medium flex items-center gap-1.5"
                    style={{ color: 'var(--forest)' }}
                  >
                    <Shield className="w-3.5 h-3.5" />
                    Digitally Verified
                  </span>
                  <span className="text-xs" style={{ color: 'var(--muted)' }}>
                    Report ready in 6 hrs
                  </span>
                </div>
              </div>

              {/* Floating trust badge — top right */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-5 -right-5 bg-white rounded-2xl shadow-xl px-3.5 py-2.5 flex items-center gap-3 z-10"
                style={{ border: '1px solid var(--border)' }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'var(--saffron-muted)' }}
                >
                  <Award className="w-4.5 h-4.5" color="var(--saffron)" />
                </div>
                <div>
                  <p className="text-xs font-semibold" style={{ color: 'var(--charcoal)' }}>NABL Standard</p>
                  <p className="text-[10px]" style={{ color: 'var(--muted)' }}>Certified Processes</p>
                </div>
              </motion.div>

              {/* Floating card — bottom left */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-xl px-3.5 py-2.5 flex items-center gap-3 z-10"
                style={{ border: '1px solid var(--border)' }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'var(--forest-pale)' }}
                >
                  <Clock className="w-4.5 h-4.5" color="var(--forest)" />
                </div>
                <div>
                  <p className="text-xs font-semibold" style={{ color: 'var(--charcoal)' }}>Same Day</p>
                  <p className="text-[10px]" style={{ color: 'var(--muted)' }}>Reports Available</p>
                </div>
              </motion.div>

              {/* Floating mini badge — left center */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute top-1/2 -left-8 -translate-y-1/2 bg-white rounded-xl shadow-lg px-3 py-2 flex items-center gap-2 z-10"
                style={{ border: '1px solid var(--border)' }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: 'var(--forest)', animation: 'pulse 2s ease-in-out infinite' }}
                />
                <span className="text-[10px] font-semibold" style={{ color: 'var(--charcoal)' }}>
                  Expert Pathologist
                </span>
              </motion.div>

              {/* Decorative dots column */}
              <div className="absolute top-1/2 -right-10 -translate-y-1/2 flex flex-col gap-2.5">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: i % 2 === 0 ? 'var(--saffron)' : 'var(--navy)', opacity: 0.5 }}
                  />
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
        <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--muted)', fontFamily: 'var(--font-body)' }}>
          Scroll
        </span>
        <div
          className="w-px h-10"
          style={{
            background: 'linear-gradient(to bottom, var(--muted), transparent)',
            animation: 'shimmer 2s linear infinite',
          }}
        />
      </div>
    </section>
  );
}
