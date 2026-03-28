'use client'

import React from 'react'
import {
  Map, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  PlusSquare
} from 'lucide-react'

export default function InspectionsPage() {

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-1000">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h1 className="text-5xl font-black tracking-tight text-slate-900 mb-3 italic">Inspection Perimeters</h1>
          <p className="text-slate-500 font-bold text-lg leading-relaxed">Manage and oversee your global surveying schedule and asset reports with <span className="text-[#0eaa99] font-black italic underline decoration-wavy underline-offset-4 decoration-[#0eaa99]/30">absolute precision</span>.</p>
        </div>
        
        <button className="flex items-center gap-3 px-10 py-5 bg-[#0eaa99] text-white font-black rounded-3xl transition-all shadow-2xl shadow-[#0eaa99]/30 hover:bg-[#0c9485] hover:shadow-[#0eaa99]/50 hover:scale-[1.02] active:scale-95 group text-xs uppercase tracking-widest">
          <PlusSquare className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          Schedule New Survey
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="glass-card p-10 rounded-[2.5rem] border-[#0eaa99]/20 bg-gradient-to-br from-white to-[#0eaa99]/5 group relative overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#0eaa99]/10 transition-all duration-500">
           <div className="absolute top-0 right-0 w-32 h-32 bg-[#0eaa99]/5 rounded-bl-[4rem] -translate-y-4 translate-x-4 transition-transform group-hover:scale-125 duration-700 pointer-events-none" />
           <div className="flex items-center gap-8 mb-6 relative z-10">
             <div className="w-16 h-16 rounded-[1.5rem] bg-white shadow-xl flex items-center justify-center text-[#0eaa99] group-hover:bg-[#0eaa99] group-hover:text-white transition-all duration-700">
                <Clock className="w-8 h-8" />
             </div>
             <div>
               <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">Active Pulse</p>
               <h3 className="text-4xl font-black text-slate-950 tracking-tighter">4 Upcoming</h3>
             </div>
           </div>
           <p className="text-xs text-[#0eaa99] font-bold italic border-l-4 border-[#0eaa99]/20 pl-6 h-5 opacity-0 group-hover:opacity-100 transition-all duration-500">Global inspection perimeter active.</p>
        </div>

        <div className="glass-card p-10 rounded-[2.5rem] group relative overflow-hidden border-white/60 shadow-xl hover:shadow-2xl transition-all duration-500">
           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-[4rem] -translate-y-4 translate-x-4 transition-transform group-hover:scale-125 duration-700 pointer-events-none" />
           <div className="flex items-center gap-8 mb-6 relative z-10">
             <div className="w-16 h-16 rounded-[1.5rem] bg-white shadow-xl flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-700">
                <CheckCircle2 className="w-8 h-8" />
             </div>
             <div>
               <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">Trust Metrics</p>
               <h3 className="text-4xl font-black text-slate-950 tracking-tighter">128 Finalized</h3>
             </div>
           </div>
           <p className="text-[10px] text-slate-400 font-black italic h-5 opacity-0 group-hover:opacity-100 transition-all duration-500 uppercase tracking-widest border-l-4 border-slate-100 pl-6">Verified reports this quarter.</p>
        </div>

        <div className="glass-card p-10 rounded-[2.5rem] group relative overflow-hidden border-white/60 shadow-xl hover:shadow-2xl transition-all duration-500">
           <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50/50 rounded-bl-[4rem] -translate-y-4 translate-x-4 transition-transform group-hover:scale-125 duration-700 pointer-events-none" />
           <div className="flex items-center gap-8 mb-6 relative z-10">
             <div className="w-16 h-16 rounded-[1.5rem] bg-white shadow-xl flex items-center justify-center text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-all duration-700">
                <AlertCircle className="w-8 h-8" />
             </div>
             <div>
               <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">Precision Alerts</p>
               <h3 className="text-4xl font-black text-slate-950 tracking-tighter">2 Flagged</h3>
             </div>
           </div>
           <p className="text-xs text-rose-500 font-bold italic h-5 opacity-0 group-hover:opacity-100 transition-all duration-500 border-l-4 border-rose-500/20 pl-6">Critical discrepancies found.</p>
        </div>
      </div>

      {/* Empty State / Map Section */}
      <div className="glass-card rounded-[4rem] p-20 flex flex-col items-center justify-center text-center space-y-8 min-h-[550px] relative overflow-hidden border-white/60 bg-white/40 shadow-2xl shadow-gray-200/50">
        <div className="absolute inset-0 bg-mesh-gradient opacity-40 pointer-events-none" />
        
        <div className="w-28 h-28 rounded-[2.5rem] bg-white shadow-2xl flex items-center justify-center mb-6 border border-slate-50 relative group transition-transform duration-700 hover:rotate-12">
           <div className="absolute inset-0 bg-[#0eaa99]/5 rounded-[2.5rem] scale-0 group-hover:scale-100 transition-all duration-500" />
           <Map className="w-14 h-14 text-slate-200 group-hover:text-[#0eaa99] transition-all duration-500 relative z-10" />
        </div>

        <h3 className="text-4xl font-black tracking-tighter text-slate-950 italic">Surveyor Perimeter Synchronized</h3>
        <p className="text-slate-500 max-w-xl font-bold text-lg leading-relaxed">No pending inspections require your profile today. Continue maintaining your global excellence by browsing the <span className="text-[#0eaa99]">marketplace</span> for new opportunities.</p>
        
        <div className="pt-8">
          <button className="px-14 py-5 bg-white border border-slate-100 text-slate-950 font-black uppercase text-[10px] tracking-[0.3em] rounded-2xl hover:border-[#0eaa99]/40 hover:shadow-2xl shadow-gray-200 transition-all active:scale-95 hover:ring-8 hover:ring-[#0eaa99]/5">
            Audit Marketplace Opportunities Protocol
          </button>
        </div>
      </div>
    </div>
  )
}
