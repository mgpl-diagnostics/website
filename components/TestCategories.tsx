'use client';

import { motion } from 'framer-motion';
import { TestTube2, Heart, Activity, Droplets, Microscope, Stethoscope, HeartPulse, Zap, Shield, Users } from 'lucide-react';

const categories = [
  { label: 'Haematology', icon: TestTube2, color: 'var(--saffron)', bg: 'var(--saffron-muted)' },
  { label: 'Biochemistry', icon: Activity, color: 'var(--navy)', bg: 'var(--navy-pale)' },
  { label: 'Endocrinology', icon: Zap, color: 'var(--amber)', bg: '#FFF8E1' },
  { label: 'Cardiology', icon: HeartPulse, color: 'var(--saffron)', bg: 'var(--saffron-muted)' },
  { label: 'Diabetology', icon: Droplets, color: 'var(--forest)', bg: 'var(--forest-pale)' },
  { label: 'Immunology', icon: Shield, color: 'var(--navy)', bg: 'var(--navy-pale)' },
  { label: 'Pathology', icon: Microscope, color: 'var(--saffron)', bg: 'var(--saffron-muted)' },
  { label: 'Gynaecology', icon: Heart, color: '#C44569', bg: '#FFE4F0' },
  { label: 'Paediatrics', icon: Users, color: 'var(--amber)', bg: '#FFF8E1' },
  { label: 'General', icon: Stethoscope, color: 'var(--forest)', bg: 'var(--forest-pale)' },
];

const popularTests = [
  { name: 'CBC (Complete Blood Count)', price: '₹ 350', turnaround: '4–6 hrs', tag: 'Popular' },
  { name: 'HbA1c (Glycated Haemoglobin)', price: '₹ 450', turnaround: '6 hrs', tag: 'Diabetes' },
  { name: 'Thyroid Stimulating Hormone (TSH)', price: '₹ 280', turnaround: '4 hrs', tag: 'Thyroid' },
  { name: 'Lipid Profile (Full)', price: '₹ 550', turnaround: '6 hrs', tag: 'Heart' },
  { name: 'Vitamin D (25-OH)', price: '₹ 750', turnaround: '24 hrs', tag: 'Deficiency' },
  { name: 'Kidney Function Test (KFT)', price: '₹ 500', turnaround: '6 hrs', tag: 'Kidney' },
];

export default function TestCategories() {
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
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: 'var(--saffron)', fontFamily: 'var(--font-body)' }}
          >
            Test Catalogue
          </p>
          <h2
            className="font-display text-4xl sm:text-5xl font-bold"
            style={{ color: 'var(--navy)' }}
          >
            Explore by{' '}
            <span className="italic font-light" style={{ color: 'var(--saffron)' }}>
              Category
            </span>
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
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.button
                key={cat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
                style={{
                  background: 'white',
                  border: '1px solid var(--border)',
                  color: 'var(--charcoal)',
                  fontFamily: 'var(--font-body)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = cat.color;
                  e.currentTarget.style.color = cat.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.color = 'var(--charcoal)';
                }}
              >
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: cat.bg }}
                >
                  <Icon className="w-3 h-3" color={cat.color} />
                </span>
                {cat.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Popular Tests List */}
        <div>
          <h3
            className="font-display font-semibold text-2xl mb-6"
            style={{ color: 'var(--navy)' }}
          >
            Most Booked Tests
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularTests.map((test, i) => (
              <motion.div
                key={test.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="group flex items-center justify-between p-4 rounded-xl bg-white transition-all duration-200 hover:shadow-md cursor-pointer"
                style={{ border: '1px solid var(--border)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--navy)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                }}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: 'var(--saffron-muted)', color: 'var(--saffron)' }}
                    >
                      {test.tag}
                    </span>
                  </div>
                  <p
                    className="text-sm font-semibold truncate"
                    style={{ color: 'var(--charcoal)', fontFamily: 'var(--font-body)' }}
                  >
                    {test.name}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: 'var(--muted)', fontFamily: 'var(--font-body)' }}
                  >
                    ⏱ {test.turnaround}
                  </p>
                </div>
                <div className="text-right shrink-0 ml-3">
                  <p
                    className="text-base font-bold"
                    style={{ color: 'var(--navy)', fontFamily: 'var(--font-display)' }}
                  >
                    {test.price}
                  </p>
                  <button
                    className="text-[10px] font-semibold mt-0.5 px-2.5 py-1 rounded-full transition-colors"
                    style={{
                      background: 'var(--navy-pale)',
                      color: 'var(--navy)',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Book
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
