'use client'

import React from 'react'
import { 
  Building, 
  PlusSquare,
  MapPin,
  ChevronRight
} from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const PROPERTIES = [
  {
    id: 'P-5021',
    name: 'Belgravia Modern Penthouse',
    address: 'London, SW1X 7JB',
    units: '1 Unit',
    occupancy: 'Occupied',
    monthlyRent: '£12,500',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 'P-5022',
    name: 'Dubai Marina Residence',
    address: 'Dubai, UAE',
    units: '24 Units',
    occupancy: '96%',
    monthlyRent: '$450,000 Total',
    image: 'https://images.unsplash.com/photo-1600585154340-be6199f7d009?q=80&w=2000&auto=format&fit=crop'
  }
]

export default function PropertiesPage() {

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-1000">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h1 className="text-5xl font-black tracking-tight text-slate-900 mb-3 italic">Asset Perimeters</h1>
          <p className="text-slate-500 font-bold text-lg leading-relaxed">Oversee your global property portfolio and occupancy perimeters with <span className="text-[#0eaa99] font-black italic underline decoration-wavy underline-offset-4 decoration-[#0eaa99]/30">absolute precision</span>.</p>
        </div>
        
        <button className="flex items-center gap-3 px-10 py-5 bg-slate-950 text-white font-black rounded-3xl transition-all shadow-2xl hover:bg-slate-900 hover:shadow-slate-300 hover:scale-[1.02] active:scale-95 group text-xs uppercase tracking-widest">
          <PlusSquare className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
          Onboard New Asset
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="glass-card p-10 rounded-[2.5rem] group hover:border-[#0eaa99]/40 transition-all duration-500 relative overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#0eaa99]/10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[4rem] -translate-y-4 translate-x-4 transition-transform group-hover:scale-125 duration-700 pointer-events-none" />
          <p className="text-[10px] text-slate-400 mb-1 font-black uppercase tracking-[0.2em]">Global Assets</p>
          <h3 className="text-4xl font-black text-slate-950 tracking-tighter">45</h3>
        </div>
        <div className="glass-card p-10 rounded-[2.5rem] group hover:border-blue-500/40 transition-all duration-500 relative overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-blue-500/10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[4rem] -translate-y-4 translate-x-4 transition-transform group-hover:scale-125 duration-700 pointer-events-none" />
          <p className="text-[10px] text-slate-400 mb-1 font-black uppercase tracking-[0.2em]">Avg. Occupancy</p>
          <h3 className="text-4xl font-black text-slate-950 tracking-tighter">96%</h3>
        </div>
        <div className="glass-card p-10 rounded-[2.5rem] group hover:border-purple-500/40 transition-all duration-500 relative overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-purple-500/10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[4rem] -translate-y-4 translate-x-4 transition-transform group-hover:scale-125 duration-700 pointer-events-none" />
          <p className="text-[10px] text-slate-400 mb-1 font-black uppercase tracking-[0.2em]">Monthly Yield</p>
          <h3 className="text-4xl font-black text-slate-950 tracking-tighter">$842k</h3>
        </div>
        <div className="glass-card p-10 rounded-[2.5rem] group hover:border-rose-500/40 transition-all duration-500 relative overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-rose-500/10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[4rem] -translate-y-4 translate-x-4 transition-transform group-hover:scale-125 duration-700 pointer-events-none" />
          <p className="text-[10px] text-slate-400 mb-1 font-black uppercase tracking-[0.2em]">Critical Pulse</p>
          <h3 className="text-4xl font-black text-rose-500 tracking-tighter">3 Issues</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {PROPERTIES.map((prop, idx) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.15 }}
            key={prop.id} 
            className="glass-card rounded-[3rem] overflow-hidden group cursor-pointer hover:border-[#0eaa99]/40 transition-all duration-700 hover:shadow-2xl hover:shadow-[#0eaa99]/10 border-white/60 relative"
          >
            <div className="h-72 relative overflow-hidden">
               <Image src={prop.image} alt={prop.name} fill className="object-cover group-hover:scale-110 transition-transform duration-[2000ms] ease-out" />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent" />
               <div className="absolute bottom-10 left-10">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0eaa99] mb-3 block drop-shadow-xl">Global Asset • {prop.id}</span>
                  <h3 className="text-4xl font-black text-white italic drop-shadow-2xl tracking-tighter">{prop.name}</h3>
               </div>
               <div className="absolute top-8 right-8 px-6 py-2.5 bg-white/10 backdrop-blur-2xl border border-white/20 text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-2xl">
                  {prop.occupancy}
               </div>
            </div>
            <div className="p-10 flex items-center justify-between bg-white/20 backdrop-blur-xl border-t border-white/20">
               <div className="space-y-4">
                  <div className="flex items-center gap-4 text-slate-400 group-hover:text-slate-600 transition-colors">
                     <MapPin className="w-5 h-5 text-[#0eaa99]" />
                     <span className="text-base font-bold italic tracking-tight">{prop.address}</span>
                  </div>
                  <div className="flex items-center gap-8 mt-3">
                     <span className="text-[10px] font-black text-slate-950 uppercase tracking-widest bg-white border border-slate-100 px-4 py-1.5 rounded-xl shadow-sm">{prop.units}</span>
                     <div className="w-2 h-2 rounded-full bg-slate-200" />
                     <span className="text-lg font-black text-[#0eaa99] italic tracking-tighter drop-shadow-sm">{prop.monthlyRent} / mo</span>
                  </div>
               </div>
               <button className="w-16 h-16 bg-white border border-slate-50 shadow-2xl shadow-gray-200/50 rounded-[2rem] flex items-center justify-center text-slate-300 group-hover:text-white group-hover:bg-[#0eaa99] group-hover:border-[#0eaa99] transition-all duration-500 active:scale-90 group-hover:shadow-[#0eaa99]/30">
                  <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="glass-card rounded-[4rem] p-20 flex flex-col items-center justify-center text-center space-y-8 relative overflow-hidden border-white/60 bg-white/40 shadow-2xl shadow-gray-200/50">
        <div className="absolute inset-0 bg-mesh-gradient opacity-40 pointer-events-none" />
        
        <div className="w-28 h-28 rounded-[2.5rem] bg-white shadow-2xl flex items-center justify-center mb-6 border border-slate-50 relative group transition-transform duration-700 hover:rotate-12">
           <div className="absolute inset-0 bg-[#0eaa99]/5 rounded-[2.5rem] scale-0 group-hover:scale-100 transition-all duration-500" />
           <Building className="w-14 h-14 text-slate-200 group-hover:text-[#0eaa99] transition-all duration-500 relative z-10" />
        </div>

        <h3 className="text-4xl font-black tracking-tighter text-slate-950 italic">Asset Perimeter Synchronized</h3>
        <p className="text-slate-500 max-w-xl font-bold text-lg leading-relaxed">Continue expanding your global portfolio by verifying new high-value assets and optimizing existing occupancy benchmarks across the liquidations perimeter.</p>
        
        <div className="pt-8">
          <button className="px-14 py-5 bg-white border border-slate-100 text-[#0eaa99] font-black uppercase text-[10px] tracking-[0.3em] rounded-2xl hover:border-[#0eaa99]/40 hover:shadow-2xl shadow-gray-200 transition-all active:scale-95 hover:ring-8 hover:ring-[#0eaa99]/5">
            Generate Yield Report Profile
          </button>
        </div>
      </div>
    </div>
  )
}
