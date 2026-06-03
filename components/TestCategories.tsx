'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TestTube2, Heart, Activity, Droplets, Microscope, Stethoscope,
  HeartPulse, Zap, Shield, Users, ArrowLeft, Clock, ChevronDown, ChevronUp,
  type LucideIcon,
} from 'lucide-react';
import { cfg } from '@/lib/config';
import { useBookTest } from '@/context/BookTestContext';

const ICON_MAP: Record<string, LucideIcon> = {
  TestTube2, Heart, Activity, Droplets, Microscope,
  Stethoscope, HeartPulse, Zap, Shield, Users,
};

const tc = cfg.testCatalogue;

export default function TestCategories() {
  const { openDialog } = useBookTest();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expandedTest, setExpandedTest] = useState<string | null>(null);

  const activeCategoryData = tc.allTests.find((g) => g.category === activeCategory);
  const activeCategoryConfig = tc.categories.find((c) => c.label === activeCategory);

  return (
    <section
      id="test-categories"
      className="section-pad"
      style={{ background: 'var(--cream)' }}
      aria-label="Test categories"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-12"
        >
          <p className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: 'var(--saffron)', fontFamily: 'var(--font-body)' }}>
            {tc.sectionTag}
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold" style={{ color: 'var(--navy)' }}>
            {tc.heading}{' '}
            <span className="italic font-light" style={{ color: 'var(--saffron)' }}>{tc.headingAccent}</span>
          </h2>
        </motion.div>

        {/* Category chips */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-14"
        >
          {tc.categories.map((cat, i) => {
            const Icon = ICON_MAP[cat.icon] ?? TestTube2;
            const isActive = activeCategory === cat.label;
            return (
              <motion.button
                key={cat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                onClick={() => {
                  setActiveCategory(isActive ? null : cat.label);
                  setExpandedTest(null);
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
                style={{
                  background: isActive ? cat.color : 'white',
                  border: `1px solid ${isActive ? cat.color : 'var(--border)'}`,
                  color: isActive ? '#fff' : 'var(--charcoal)',
                  fontFamily: 'var(--font-body)',
                  boxShadow: isActive ? `0 4px 16px ${cat.color}44` : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = cat.color;
                    e.currentTarget.style.color = cat.color;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.color = 'var(--charcoal)';
                  }
                }}
              >
                <span className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: isActive ? 'rgba(255,255,255,0.25)' : cat.bg }}>
                  <Icon className="w-3 h-3" color={isActive ? '#fff' : cat.color} />
                </span>
                {cat.label}
                {activeCategoryData && isActive && (
                  <span className="text-[10px] font-bold ml-0.5 opacity-80">
                    ({activeCategoryData.tests.length})
                  </span>
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* ── All Tests for selected category ──────────────────── */}
        <AnimatePresence mode="wait">
          {activeCategory && activeCategoryData && activeCategoryConfig ? (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {/* Section header */}
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: activeCategoryConfig.bg }}>
                    {(() => { const Icon = ICON_MAP[activeCategoryConfig.icon] ?? TestTube2; return <Icon className="w-5 h-5" color={activeCategoryConfig.color} />; })()}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-2xl" style={{ color: 'var(--navy)' }}>
                      {tc.allTestsHeading} — {activeCategory}
                    </h3>
                    <p className="text-xs" style={{ color: 'var(--muted)', fontFamily: 'var(--font-body)' }}>
                      {activeCategoryData.tests.length} {tc.allTestsSubtext}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => { setActiveCategory(null); setExpandedTest(null); }}
                  className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full transition-colors"
                  style={{ color: 'var(--navy)', background: 'var(--navy-pale)', fontFamily: 'var(--font-body)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#D5DCF0'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--navy-pale)'; }}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  {tc.backLabel}
                </button>
              </div>

              {/* Test cards */}
              <div className="space-y-2">
                {activeCategoryData.tests.map((test, i) => {
                  const isExpanded = expandedTest === test.name;
                  return (
                    <motion.div
                      key={test.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.03 }}
                      className="rounded-xl bg-white overflow-hidden transition-all duration-200"
                      style={{
                        border: `1px solid ${isExpanded ? activeCategoryConfig.color : 'var(--border)'}`,
                        boxShadow: isExpanded ? `0 4px 20px ${activeCategoryConfig.color}22` : 'none',
                      }}
                    >
                      {/* Main row */}
                      <div className="flex items-center gap-3 p-4">
                        {/* Name + tag */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold" style={{ color: 'var(--charcoal)', fontFamily: 'var(--font-body)' }}>
                            {test.name}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="inline-flex items-center gap-1 text-[10px]" style={{ color: 'var(--muted)', fontFamily: 'var(--font-body)' }}>
                              <Clock className="w-3 h-3" />
                              {test.turnaround}
                            </span>
                            {test.preparation && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'var(--cream)', color: 'var(--muted)', fontFamily: 'var(--font-body)' }}>
                                {test.preparation}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Price + actions */}
                        <div className="flex items-center gap-3 shrink-0">
                          <p className="text-base font-bold" style={{ color: 'var(--navy)', fontFamily: 'var(--font-display)' }}>
                            {test.price}
                          </p>
                          <button
                            onClick={openDialog}
                            className="text-[10px] font-semibold px-2.5 py-1 rounded-full transition-colors"
                            style={{ background: 'var(--navy-pale)', color: 'var(--navy)', fontFamily: 'var(--font-body)' }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--navy)'; e.currentTarget.style.color = '#fff'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--navy-pale)'; e.currentTarget.style.color = 'var(--navy)'; }}
                          >
                            {tc.bookLabel}
                          </button>
                          {test.parameters && (
                            <button
                              onClick={() => setExpandedTest(isExpanded ? null : test.name)}
                              className="w-7 h-7 rounded-full flex items-center justify-center transition-colors"
                              style={{ background: isExpanded ? activeCategoryConfig.color : 'var(--cream)', color: isExpanded ? '#fff' : 'var(--muted)' }}
                              aria-label={isExpanded ? 'Hide details' : 'Show details'}
                            >
                              {isExpanded
                                ? <ChevronUp className="w-3.5 h-3.5" />
                                : <ChevronDown className="w-3.5 h-3.5" />}
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Expandable parameters */}
                      <AnimatePresence initial={false}>
                        {isExpanded && test.parameters && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22, ease: 'easeOut' }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4 pt-1" style={{ borderTop: `1px dashed ${activeCategoryConfig.color}44` }}>
                              <p className="text-[10px] font-semibold uppercase tracking-wider mb-1"
                                style={{ color: activeCategoryConfig.color, fontFamily: 'var(--font-body)' }}>
                                {tc.parametersLabel}
                              </p>
                              <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)', fontFamily: 'var(--font-body)' }}>
                                {test.parameters}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

          ) : (
            /* ── Popular Tests (default view) ─────────────────── */
            <motion.div
              key="popular"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-display font-semibold text-2xl mb-6" style={{ color: 'var(--navy)' }}>
                {tc.popularTestsHeading}
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tc.popularTests.map((test, i) => (
                  <motion.div
                    key={test.name}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.07 }}
                    className="group flex items-center justify-between p-4 rounded-xl bg-white transition-all duration-200 hover:shadow-md"
                    style={{ border: '1px solid var(--border)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--navy)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; }}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                          style={{ background: 'var(--saffron-muted)', color: 'var(--saffron)' }}>
                          {test.tag}
                        </span>
                      </div>
                      <p className="text-sm font-semibold truncate" style={{ color: 'var(--charcoal)', fontFamily: 'var(--font-body)' }}>
                        {test.name}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--muted)', fontFamily: 'var(--font-body)' }}>
                        ⏱ {test.turnaround}
                      </p>
                    </div>
                    <div className="text-right shrink-0 ml-3">
                      <p className="text-base font-bold" style={{ color: 'var(--navy)', fontFamily: 'var(--font-display)' }}>
                        {test.price}
                      </p>
                      <button
                        onClick={openDialog}
                        className="text-[10px] font-semibold mt-0.5 px-2.5 py-1 rounded-full transition-colors"
                        style={{ background: 'var(--navy-pale)', color: 'var(--navy)', fontFamily: 'var(--font-body)' }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--navy)'; e.currentTarget.style.color = '#fff'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--navy-pale)'; e.currentTarget.style.color = 'var(--navy)'; }}
                      >
                        {tc.bookLabel}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
