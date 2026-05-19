'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, ArrowRight, PlusCircle } from 'lucide-react'
import { useT } from '@/context/language-context'

export default function CtaBanner() {
  const h = useT().home

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background mesh */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-60 pointer-events-none" />
      <div className="absolute top-[-20%] right-[-5%] w-[40%] h-[80%] bg-[#0eab9b]/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[60%] bg-[#C3CC9B]/20 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight mb-6 tracking-tight">
            {h.ctaHeading}
          </h2>
          <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
            {h.ctaSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/listings"
              className="group flex items-center gap-2.5 px-8 py-4 bg-[#0eab9b] hover:bg-[#0ca191] text-white font-bold text-lg rounded-2xl transition-all shadow-lg shadow-[#0eab9b]/25 hover:shadow-[#0eab9b]/40 hover:scale-[1.02]"
            >
              <Search className="w-5 h-5" />
              {h.ctaPrimary}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/register"
              className="group flex items-center gap-2.5 px-8 py-4 bg-white hover:bg-slate-50 text-slate-800 font-bold text-lg rounded-2xl border border-slate-200 hover:border-[#0eab9b]/40 transition-all shadow-sm hover:shadow-md hover:scale-[1.02]"
            >
              <PlusCircle className="w-5 h-5 text-[#0eab9b]" />
              {h.ctaSecondary}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
