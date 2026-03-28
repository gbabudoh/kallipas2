'use client'

import { Search, Globe, Shield, Zap, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import type { GlobalSiteSettings } from '@/types/settings'

export default function Hero({ settings }: { settings: GlobalSiteSettings }) {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#F2EAE0]/30 min-h-screen flex items-center">
      {/* Dynamic Background Accents */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#C3CC9B]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-[#E8F5BD]/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-[#0eab9b]/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-[#0eab9b]/20 text-[#0eab9b] text-xs font-bold mb-6 shadow-sm backdrop-blur-md uppercase tracking-wider">
              <Globe className="w-3.5 h-3.5" />
              Revolutionizing Global Real Estate
            </span>
            
            <h1 className="text-5xl md:text-7xl xl:text-8xl font-black tracking-tight mb-6 leading-[1.05] text-slate-900">
              {settings.heroTitle}
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 font-medium max-w-xl mb-10 leading-relaxed">
              {settings.heroSubtitle}
            </p>

            {/* Premium Search Capsule */}
            <div className="relative group max-w-2xl">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#0eab9b] to-[#0ca191] rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex flex-col md:flex-row items-center gap-2 p-2 bg-white/70 backdrop-blur-2xl border border-white/80 rounded-[2rem] shadow-xl">
                <div className="flex-1 w-full relative">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search city, country, or property..."
                    className="w-full bg-transparent border-none focus:ring-0 py-4 pl-12 pr-4 text-slate-800 text-lg placeholder:text-slate-400 font-medium"
                  />
                </div>
                <button className="w-full md:w-auto px-8 py-4 bg-[#0eab9b] hover:bg-[#0ca191] text-white font-bold text-lg rounded-[1.5rem] transition-all flex items-center justify-center gap-2 group/btn">
                  Search
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Feature Pills */}
            <div className="mt-12 flex flex-wrap gap-4">
              {[
                { icon: Shield, label: 'Verified Sellers' },
                { icon: Zap, label: 'Instant Video Tours' },
                { icon: Globe, label: 'Multi-Currency Support' }
              ].map((item, i) => (
                <motion.div 
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + (i * 0.1) }}
                  className="flex items-center gap-2 bg-white/50 hover:bg-white/80 px-4 py-2 rounded-xl border border-white/60 backdrop-blur-sm transition-colors cursor-default"
                >
                  <item.icon className="w-4 h-4 text-[#0eab9b]" />
                  <span className="text-sm font-bold text-slate-600">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Dynamic Image Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            {/* Geometric Accent behind image */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#C3CC9B]/30 rounded-full blur-3xl animate-pulse" />
            
            {/* The Main Image Frame */}
            <div className="relative z-10 p-4 bg-white/40 backdrop-blur-md rounded-[3rem] border border-white/60 shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0eab9b]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="aspect-[4/5] rounded-[2.2rem] overflow-hidden shadow-inner relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={settings.heroImageUrl} 
                  alt="Premium Property" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                
                {/* Floating Glass Tag on Image */}
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-lg">
                  <p className="text-white text-sm font-bold drop-shadow-md">
                    Featured Luxury Listing
                  </p>
                  <p className="text-white/80 text-xs font-medium">
                    Verified by Kallipas Global
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative Floating Elements */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-6 -left-6 p-4 bg-[#0eab9b] text-white rounded-2xl shadow-xl z-20 flex flex-col items-center"
            >
              <Zap className="w-6 h-6 mb-1" />
              <span className="text-[10px] font-black uppercase tracking-tighter">Live Now</span>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-10 -right-8 p-5 bg-white backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl z-20"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E8F5BD] flex items-center justify-center">
                  <Search className="w-5 h-5 text-[#0eab9b]" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-800 uppercase">A.I. Search</p>
                  <p className="text-[10px] text-slate-500 font-bold">Matching your vibe...</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

