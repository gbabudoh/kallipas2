'use client'

import { motion } from 'framer-motion'
import { useT } from '@/context/language-context'

export default function StatsBar() {
  const h = useT().home

  const stats = [
    { label: h.statsLabel1, value: h.statsValue1 },
    { label: h.statsLabel2, value: h.statsValue2 },
    { label: h.statsLabel3, value: h.statsValue3 },
    { label: h.statsLabel4, value: h.statsValue4 },
  ]

  return (
    <section className="relative z-10 -mt-8 mb-0 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-card rounded-3xl grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-100/60"
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex flex-col items-center justify-center py-6 px-4 gap-1">
              <span className="text-3xl md:text-4xl font-black text-[#0eab9b] tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest text-center">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
