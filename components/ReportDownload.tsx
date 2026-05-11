'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Shield, BadgeCheck, Lock, ArrowRight } from 'lucide-react';

export default function ReportDownload() {
  const [reportId, setReportId] = useState('');
  const [mobile, setMobile] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle report download logic
  };

  return (
    <section
      id="reports"
      className="section-pad relative overflow-hidden"
      style={{ background: 'var(--navy)' }}
      aria-label="Download your report"
    >
      {/* Atmospheric layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'rgba(230,81,0,0.08)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl"
          style={{ background: 'rgba(27,138,90,0.07)' }}
        />
        {/* Fine grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left: Copy ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ color: 'var(--saffron)', fontFamily: 'var(--font-body)' }}
            >
              Report Portal
            </p>
            <h2
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6"
            >
              Your Reports.
              <span
                className="block italic font-light"
                style={{ color: 'var(--saffron)' }}
              >
                Always Ready.
              </span>
            </h2>
            <p
              className="text-base leading-relaxed mb-10"
              style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-body)' }}
            >
              Access your diagnostic reports securely, anytime. Digitally verified and instantly downloadable — shared with your doctor in one click.
            </p>

            {/* Trust strip */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Shield, label: 'Encrypted Access', sub: 'OTP protected' },
                { icon: BadgeCheck, label: 'Verified Reports', sub: 'Doctor signed' },
                { icon: Lock, label: 'Private & Secure', sub: 'HIPAA aligned' },
              ].map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  className="text-center p-3 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2"
                    style={{ background: 'rgba(27,138,90,0.2)' }}
                  >
                    <Icon className="w-4 h-4" color="var(--forest)" />
                  </div>
                  <p className="text-xs font-semibold text-white mb-0.5">{label}</p>
                  <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.45)' }}>{sub}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Download form ──────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.15, ease: 'easeOut' }}
          >
            <div
              className="rounded-3xl p-8"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)' }}
            >
              {/* Mock report preview strip */}
              <div
                className="rounded-2xl p-4 mb-6 flex items-center gap-4"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(27,138,90,0.25)' }}
                >
                  <BadgeCheck className="w-5 h-5" color="var(--forest)" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">Fast. Secure. Verified.</p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    Digitally signed by our pathologist
                  </p>
                </div>
                <div
                  className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(27,138,90,0.25)', color: '#4ADE80' }}
                >
                  ✓ Live
                </div>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div>
                  <label
                    htmlFor="report-id"
                    className="block text-xs font-semibold mb-1.5"
                    style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-body)' }}
                  >
                    Patient / Report ID
                  </label>
                  <input
                    id="report-id"
                    type="text"
                    value={reportId}
                    onChange={(e) => setReportId(e.target.value)}
                    placeholder="e.g. MG-2024-08821"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      color: '#fff',
                      fontFamily: 'var(--font-body)',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--saffron)')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.15)')}
                    aria-label="Enter your Patient or Report ID"
                  />
                </div>

                <div>
                  <label
                    htmlFor="mobile"
                    className="block text-xs font-semibold mb-1.5"
                    style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-body)' }}
                  >
                    Registered Mobile Number
                  </label>
                  <input
                    id="mobile"
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="10-digit mobile number"
                    pattern="[6-9][0-9]{9}"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      color: '#fff',
                      fontFamily: 'var(--font-body)',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--saffron)')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.15)')}
                    aria-label="Enter your registered mobile number"
                  />
                </div>

                <button
                  type="submit"
                  className="group w-full flex items-center justify-center gap-2 py-4 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                  style={{ background: 'var(--saffron)', fontFamily: 'var(--font-body)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--saffron-light)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--saffron)')}
                >
                  <Download className="w-4 h-4" />
                  Download My Report
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <p
                  className="text-center text-xs pt-1"
                  style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-body)' }}
                >
                  An OTP will be sent to your registered mobile for verification.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
