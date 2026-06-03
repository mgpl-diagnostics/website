'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Phone, ArrowRight } from 'lucide-react';
import { useBookTest } from '@/context/BookTestContext';
import { cfg } from '@/lib/config';

const d = cfg.bookTestDialog;

export default function BookTestDialog() {
  const { isOpen, closeDialog } = useBookTest();

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeDialog(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [closeDialog]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        /* Single overlay — clicking it (outside the card) closes the dialog */
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(13,43,94,0.55)', backdropFilter: 'blur(4px)' }}
          onClick={closeDialog}
          aria-hidden="true"
        >
          {/* Card — stop clicks from bubbling to the overlay */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={d.heading}
            initial={{ scale: 0.93, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.93, y: 20 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="relative w-full max-w-sm rounded-3xl bg-white overflow-hidden"
            style={{ boxShadow: '0 32px 80px rgba(13,43,94,0.22)' }}
            onClick={(e) => e.stopPropagation()}
          >
              {/* Header bar */}
              <div
                className="px-6 pt-6 pb-5 relative"
                style={{ background: 'var(--navy)' }}
              >
                {/* Decorative circle */}
                <div
                  className="absolute -top-10 -right-10 w-32 h-32 rounded-full"
                  style={{ background: 'rgba(230,81,0,0.18)' }}
                />

                {/* Close button */}
                <button
                  onClick={closeDialog}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{ background: 'rgba(255,255,255,0.12)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.22)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
                  aria-label="Close dialog"
                >
                  <X className="w-4 h-4 text-white" />
                </button>

                {/* Title */}
                <div className="relative z-10">
                  <p
                    className="text-xs font-semibold tracking-widest uppercase mb-1"
                    style={{ color: 'var(--saffron)', fontFamily: 'var(--font-body)' }}
                  >
                    Quick Connect
                  </p>
                  <h2
                    className="font-display font-bold text-2xl text-white"
                  >
                    {d.heading}
                  </h2>
                  <p
                    className="text-sm mt-1"
                    style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)' }}
                  >
                    {d.subtext}
                  </p>
                </div>
              </div>

              {/* Options */}
              <div className="p-5 space-y-3">

                {/* WhatsApp */}
                <a
                  href={cfg.contact.phone.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeDialog}
                  className="group flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 hover:-translate-y-0.5"
                  style={{ borderColor: '#25D366', background: '#F0FDF4' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#DCFCE7'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#F0FDF4'; }}
                >
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: '#25D366' }}
                  >
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-base" style={{ color: '#166534', fontFamily: 'var(--font-body)' }}>
                      {d.whatsapp.label}
                    </p>
                    <p className="text-sm" style={{ color: '#15803D', fontFamily: 'var(--font-body)' }}>
                      {d.whatsapp.description}
                    </p>
                    <span
                      className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1"
                      style={{ background: '#BBF7D0', color: '#166534' }}
                    >
                      {d.whatsapp.subtext}
                    </span>
                  </div>

                  <ArrowRight className="w-4 h-4 shrink-0 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" style={{ color: '#166534' }} />
                </a>

                {/* Call */}
                <a
                  href={cfg.contact.phone.primaryTel}
                  onClick={closeDialog}
                  className="group flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 hover:-translate-y-0.5"
                  style={{ borderColor: 'var(--navy)', background: 'var(--navy-pale)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#D5DCF0'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--navy-pale)'; }}
                >
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'var(--navy)' }}
                  >
                    <Phone className="w-5 h-5 text-white" />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-base" style={{ color: 'var(--navy)', fontFamily: 'var(--font-body)' }}>
                      {d.call.label}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--muted)', fontFamily: 'var(--font-body)' }}>
                      {cfg.contact.phone.primary}
                    </p>
                    <span
                      className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1"
                      style={{ background: 'var(--navy-pale)', color: 'var(--navy)', border: '1px solid rgba(13,43,94,0.2)' }}
                    >
                      {d.call.subtext}
                    </span>
                  </div>

                  <ArrowRight className="w-4 h-4 shrink-0 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" style={{ color: 'var(--navy)' }} />
                </a>
              </div>

              {/* Footer note */}
              <p
                className="text-center text-xs pb-5 px-6"
                style={{ color: 'var(--muted)', fontFamily: 'var(--font-body)' }}
              >
                Our team is available {cfg.hours.short}
              </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
