'use client'

import { motion } from 'framer-motion'
import { Search, Video, ShieldCheck } from 'lucide-react'
import { useT } from '@/context/language-context'

export default function HowItWorks() {
  const h = useT().home

  const steps = [
    {
      icon: Search,
      title: h.hiw1Title,
      desc: h.hiw1Desc,
      step: '01',
    },
    {
      icon: Video,
      title: h.hiw2Title,
      desc: h.hiw2Desc,
      step: '02',
    },
    {
      icon: ShieldCheck,
      title: h.hiw3Title,
      desc: h.hiw3Desc,
      step: '03',
    },
  ]

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0eab9b]/3 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#0eab9b]/10 text-[#0eab9b] text-xs font-black uppercase tracking-widest mb-4">
            {h.howItWorksHeading}
          </span>
          <p className="text-slate-500 font-medium max-w-xl mx-auto text-lg">
            {h.howItWorksSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-12 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-px bg-gradient-to-r from-[#0eab9b]/30 via-[#0eab9b]/60 to-[#0eab9b]/30" />

          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex flex-col items-center text-center gap-5"
            >
              {/* Step circle */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-white border-2 border-[#0eab9b]/20 shadow-lg flex items-center justify-center group hover:border-[#0eab9b]/60 transition-all duration-300">
                  <step.icon className="w-9 h-9 text-[#0eab9b]" />
                </div>
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#0eab9b] text-white text-[10px] font-black flex items-center justify-center shadow-md">
                  {step.step}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{step.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed text-sm max-w-xs mx-auto">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
