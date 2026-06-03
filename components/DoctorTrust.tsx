'use client';

import { motion } from 'framer-motion';
import { BadgeCheck, Award } from 'lucide-react';
import { cfg } from '@/lib/config';

const d = cfg.doctors;

export default function DoctorTrust() {
  return (
    <section
      id="doctors"
      className="section-pad"
      style={{ background: 'var(--cream)' }}
      aria-label="Our expert pathologists"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-12 lg:mb-14"
        >
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--saffron)', fontFamily: 'var(--font-body)' }}>
            {d.sectionTag}
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold" style={{ color: 'var(--navy)' }}>
            {d.heading}{' '}
            <span className="italic font-light" style={{ color: 'var(--saffron)' }}>{d.headingAccent}</span>
          </h2>
          <p className="text-base leading-relaxed mt-4 max-w-xl mx-auto" style={{ color: 'var(--muted)', fontFamily: 'var(--font-body)' }}>
            {d.subtext}
          </p>
        </motion.div>

        {/* Doctor cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {d.items.map((doc, i) => (
            <motion.div
              key={doc.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group text-center bg-white rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1.5"
              style={{ border: '1px solid var(--border)', boxShadow: '0 2px 12px rgba(13,43,94,0.06)' }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 16px 40px rgba(13,43,94,0.12)'; e.currentTarget.style.borderColor = doc.color; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 2px 12px rgba(13,43,94,0.06)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
            >
              {/* Avatar */}
              <div className="relative inline-block mb-5">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-display font-bold text-2xl mx-auto" style={{ background: doc.color }}>
                  {doc.initials}
                </div>
                <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'var(--forest)', border: '2px solid white' }}>
                  <BadgeCheck className="w-3.5 h-3.5 text-white" />
                </div>
              </div>

              <h3 className="font-display font-semibold text-lg leading-tight mb-1" style={{ color: 'var(--navy)' }}>{doc.name}</h3>
              <p className="text-xs font-semibold mb-3" style={{ color: doc.color, fontFamily: 'var(--font-body)' }}>{doc.qualification}</p>
              <span className="inline-block text-xs px-3 py-1 rounded-full mb-3" style={{ background: doc.bg, color: doc.color, fontFamily: 'var(--font-body)', fontWeight: 500 }}>
                {doc.specialization}
              </span>
              <div className="flex items-center justify-center gap-1.5 text-xs" style={{ color: 'var(--muted)', fontFamily: 'var(--font-body)' }}>
                <Award className="w-3.5 h-3.5" color="var(--amber)" />
                <span>{doc.experience} Experience</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Credentials bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 rounded-2xl p-6"
          style={{ background: 'var(--navy-pale)', border: '1px solid rgba(13,43,94,0.12)' }}
        >
          <div className="flex flex-wrap justify-center gap-6 lg:gap-10 text-center">
            {d.stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display font-bold text-2xl" style={{ color: 'var(--navy)' }}>{stat.value}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--muted)', fontFamily: 'var(--font-body)' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
