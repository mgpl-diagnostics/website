'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { siteConfig } from '@/lib/config';

const buildFaqs = (phone: string) => [
  {
    q: 'How do I book a home sample collection?',
    a: `You can book through our website by clicking "Book a Test", or call us directly at ${phone}. Choose your preferred time slot, and our certified phlebotomist will arrive at your doorstep — typically within the same day.`,
  },
  {
    q: 'When will I receive my test reports?',
    a: 'Most routine tests (CBC, glucose, thyroid) are available within 4–6 hours of sample collection. Advanced tests may take 24–72 hours. Reports are shared via WhatsApp, email, and our secure online portal.',
  },
  {
    q: "Are MGPL's processes NABL certified?",
    a: 'MGPL Diagnostics follows NABL (National Accreditation Board for Testing and Calibration Laboratories) standard processes — ensuring the highest accuracy, traceability, and reliability in all diagnostic tests.',
  },
  {
    q: 'How do I download my reports online?',
    a: 'Visit our Report Portal section on this website. Enter your Patient ID (provided at booking) and your registered mobile number. An OTP will be sent for secure verification, after which your report can be viewed and downloaded in PDF.',
  },
  {
    q: 'Is fasting required for blood tests?',
    a: 'Fasting (8–12 hours water only) is required for tests like fasting glucose, lipid profile, and some liver function tests. Tests such as CBC, thyroid, HbA1c, and vitamin panels generally do not require fasting. Our team informs you at booking.',
  },
  {
    q: 'What is the home collection charge?',
    a: 'We currently offer home collection at no additional charge for most standard test panels. For remote addresses or after-hours collection, a nominal fee may apply — which is always disclosed upfront at the time of booking.',
  },
  {
    q: 'Can I get a consultation after my reports?',
    a: 'Yes. Our pathologists are available for brief report consultations. For detailed clinical advice, we recommend consulting your family physician or specialist with the MGPL report in hand — our reports include reference ranges and interpretation notes.',
  },
  {
    q: 'How are samples handled and transported?',
    a: 'All samples are collected in pre-labelled, sealed, medical-grade tubes and transported in temperature-controlled carriers within 2 hours of collection. Our chain-of-custody process ensures sample integrity from your home to the lab.',
  },
];

const faqs = buildFaqs(siteConfig.phone.primary);

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
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: 'var(--saffron)', fontFamily: 'var(--font-body)' }}
          >
            Common Questions
          </p>
          <h2
            className="font-display text-4xl sm:text-5xl font-bold"
            style={{ color: 'var(--navy)' }}
          >
            Questions &{' '}
            <span className="italic font-light" style={{ color: 'var(--saffron)' }}>
              Answers
            </span>
          </h2>
          <p
            className="text-base leading-relaxed mt-4"
            style={{ color: 'var(--muted)', fontFamily: 'var(--font-body)' }}
          >
            Everything you need to know about booking tests, collecting samples, and getting results.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
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
                style={{
                  background: open === i ? 'var(--saffron-muted)' : 'white',
                }}
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span
                  className="text-sm font-semibold leading-snug pr-4"
                  style={{
                    color: open === i ? 'var(--saffron)' : 'var(--charcoal)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {faq.q}
                </span>
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background: open === i ? 'var(--saffron)' : 'var(--cream)',
                  }}
                >
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
                    <p
                      className="px-5 pb-5 text-sm leading-relaxed pt-1"
                      style={{ color: 'var(--muted)', fontFamily: 'var(--font-body)' }}
                    >
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
          <p
            className="font-display font-semibold text-xl mb-2"
            style={{ color: 'var(--navy)' }}
          >
            Still have questions?
          </p>
          <p
            className="text-sm mb-4"
            style={{ color: 'var(--muted)', fontFamily: 'var(--font-body)' }}
          >
            Our team is available Mon–Sun, 7 AM – 8 PM.
          </p>
          <a
            href="tel:+911234567890"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white text-sm font-semibold transition-all hover:-translate-y-0.5"
            style={{ background: 'var(--navy)', fontFamily: 'var(--font-body)' }}
          >
            Call Us Now
          </a>
        </motion.div>
      </div>
    </section>
  );
}
