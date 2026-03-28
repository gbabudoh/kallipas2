'use client'

import { Languages, ShieldCheck, Video, CreditCard, LayoutDashboard, Search } from 'lucide-react'
import { motion } from 'framer-motion'
import { useT } from '@/context/language-context'

export default function Features() {
  const t = useT()
  const h = t.home

  const features = [
    { title: h.f1Title, description: h.f1Desc, icon: Languages, color: 'blue' },
    { title: h.f2Title, description: h.f2Desc, icon: ShieldCheck, color: 'indigo' },
    { title: h.f3Title, description: h.f3Desc, icon: Video, color: 'blue' },
    { title: h.f4Title, description: h.f4Desc, icon: CreditCard, color: 'indigo' },
    { title: h.f5Title, description: h.f5Desc, icon: LayoutDashboard, color: 'blue' },
    { title: h.f6Title, description: h.f6Desc, icon: Search, color: 'indigo' },
  ]

  return (
    <section className="py-24 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-800">{h.featuresHeading}</h2>
          <p className="text-slate-600 font-medium max-w-2xl mx-auto text-lg">
            {h.featuresSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-8 rounded-3xl hover:border-[#0eab9b]/50 hover:shadow-[0_15px_40px_-10px_rgba(14,171,155,0.2)] transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#0eab9b]/10 flex items-center justify-center mb-6 group-hover:bg-[#0eab9b] group-hover:text-white transition-all duration-300 text-[#0eab9b] shadow-inner">
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-800">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed font-medium">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
