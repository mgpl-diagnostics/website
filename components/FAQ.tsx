'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { siteConfig, cfg } from '@/lib/config';

const fq = cfg.faq;

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="section-pad"
      style={{ background: 'var(--warm-white)' }}
      aria-label="Frequently asked questions"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--saffron)', fontFamily: 'var(--font-body)' }}>
            {fq.sectionTag}
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold" style={{ color: 'var(--navy)' }}>
            {fq.heading}{' '}
            <span className="italic font-light" style={{ color: 'var(--saffron)' }}>{fq.headingAccent}</span>
          </h2>
          <p className="text-base leading-relaxed mt-4" style={{ color: 'var(--muted)', fontFamily: 'var(--font-body)' }}>
            {fq.subtext}
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3">
          {fq.items.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-2xl overflow-hidden"
              style={{ border: `1px solid ${open === i ? 'var(--saffron)' : 'var(--border)'}`, transition: 'border-color 0.2s ease' }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors duration-200"
                style={{ background: open === i ? 'var(--saffron-muted)' : 'white' }}
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span
                  className="text-sm font-semibold leading-snug pr-4"
                  style={{ color: open === i ? 'var(--saffron)' : 'var(--charcoal)', fontFamily: 'var(--font-body)' }}
                >
                  {faq.q}
                </span>
                <span className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: open === i ? 'var(--saffron)' : 'var(--cream)' }}>
                  {open === i
                    ? <Minus className="w-3.5 h-3.5 text-white" />
                    : <Plus className="w-3.5 h-3.5" color="var(--navy)" />
                  }
                </span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    id={`faq-answer-${i}`}
                    role="region"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="overflow-hidden"
                    style={{ background: 'white' }}
                  >
                    <p className="px-5 pb-5 text-sm leading-relaxed pt-1" style={{ color: 'var(--muted)', fontFamily: 'var(--font-body)' }}>
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center p-6 rounded-2xl"
          style={{ background: 'var(--navy-pale)', border: '1px solid rgba(13,43,94,0.12)' }}
        >
          <p className="font-display font-semibold text-xl mb-2" style={{ color: 'var(--navy)' }}>
            {fq.stillHaveQuestionsTitle}
          </p>
          <p className="text-sm mb-4" style={{ color: 'var(--muted)', fontFamily: 'var(--font-body)' }}>
            {fq.stillHaveQuestionsSubtext}
          </p>
          <a
            href={siteConfig.phone.primaryTel}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white text-sm font-semibold transition-all hover:-translate-y-0.5"
            style={{ background: 'var(--navy)', fontFamily: 'var(--font-body)' }}
          >
            {fq.callCtaLabel}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
