'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { useT } from '@/context/language-context'

export default function Testimonials() {
  const h = useT().home

  const testimonials = [
    { quote: h.t1Quote, name: h.t1Name, role: h.t1Role, initials: 'AD' },
    { quote: h.t2Quote, name: h.t2Name, role: h.t2Role, initials: 'MR' },
    { quote: h.t3Quote, name: h.t3Name, role: h.t3Role, initials: 'SM' },
  ]

  const avatarColors = [
    'from-[#0eab9b] to-[#0ca191]',
    'from-slate-700 to-slate-800',
    'from-[#C3CC9B] to-[#a8b87a]',
  ]

  return (
    <section className="py-24 bg-[#F2EAE0]/20 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0eab9b]/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0eab9b]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-800">{h.testimonialsHeading}</h2>
          <p className="text-slate-500 font-medium max-w-xl mx-auto text-lg">
            {h.testimonialsSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="glass-card p-8 rounded-3xl flex flex-col gap-6 hover:shadow-[0_20px_50px_-10px_rgba(14,171,155,0.15)] transition-all duration-300"
            >
              <Quote className="w-8 h-8 text-[#0eab9b]/40 shrink-0" />
              <p className="text-slate-700 font-medium leading-relaxed flex-1 text-[0.95rem]">
                {t.quote}
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-slate-100/60">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarColors[i]} flex items-center justify-center text-white text-xs font-black shrink-0`}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{t.name}</p>
                  <p className="text-xs font-medium text-slate-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
