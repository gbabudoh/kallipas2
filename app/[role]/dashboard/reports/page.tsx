'use client'

import React from 'react'
import {
  FileText,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  PlusSquare
} from 'lucide-react'

export default function ReportsPage() {

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-1000">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h1 className="text-5xl font-black tracking-tight text-slate-900 mb-3 italic">Valuation Archives</h1>
          <p className="text-slate-500 font-bold text-lg leading-relaxed">Finalized property valuations and structural analyses for the <span className="text-[#0eaa99] font-black italic underline decoration-wavy underline-offset-4 decoration-[#0eaa99]/30">global marketplace</span>.</p>
        </div>
        
        <button className="flex items-center gap-3 px-10 py-5 bg-[#0eaa99] text-white font-black rounded-3xl transition-all shadow-2xl shadow-[#0eaa99]/30 hover:bg-[#0c9485] hover:shadow-[#0eaa99]/50 hover:scale-[1.02] active:scale-95 group text-xs uppercase tracking-widest">
          <PlusSquare className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          Generate New Valuation
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="glass-card p-10 rounded-[2.5rem] group hover:border-[#0eaa99]/40 transition-all duration-500 relative overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#0eaa99]/10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[4rem] -translate-y-4 translate-x-4 transition-transform group-hover:scale-125 duration-700 pointer-events-none" />
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div className="w-16 h-16 rounded-[1.5rem] bg-white shadow-md flex items-center justify-center text-[#0eaa99] group-hover:bg-[#0eaa99] group-hover:text-white transition-all duration-500">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="text-[10px] font-black px-4 py-1.5 rounded-full bg-[#0eaa99]/10 text-[#0eaa99] border border-[#0eaa99]/20 uppercase tracking-widest shadow-sm">Active Pulse</span>
          </div>
          <p className="text-[10px] text-slate-400 mb-1 font-black uppercase tracking-[0.2em]">Total Finalized</p>
          <h3 className="text-4xl font-black text-slate-950 tracking-tighter">128</h3>
        </div>

        <div className="glass-card p-10 rounded-[2.5rem] group hover:border-blue-500/40 transition-all duration-500 relative overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-blue-500/10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[4rem] -translate-y-4 translate-x-4 transition-transform group-hover:scale-125 duration-700 pointer-events-none" />
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div className="w-16 h-16 rounded-[1.5rem] bg-white shadow-md flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
              <Clock className="w-8 h-8" />
            </div>
            <span className="text-[10px] font-black px-4 py-1.5 rounded-full bg-blue-50 text-blue-500 border border-blue-100 uppercase tracking-widest shadow-sm">Drafting</span>
          </div>
          <p className="text-[10px] text-slate-400 mb-1 font-black uppercase tracking-[0.2em]">In Progress</p>
          <h3 className="text-4xl font-black text-slate-950 tracking-tighter">3</h3>
        </div>

        <div className="glass-card p-10 rounded-[2.5rem] group hover:border-purple-500/40 transition-all duration-500 relative overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-purple-500/10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[4rem] -translate-y-4 translate-x-4 transition-transform group-hover:scale-125 duration-700 pointer-events-none" />
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div className="w-16 h-16 rounded-[1.5rem] bg-white shadow-md flex items-center justify-center text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-all duration-500">
              <TrendingUp className="w-8 h-8" />
            </div>
            <span className="text-[10px] font-black px-4 py-1.5 rounded-full bg-purple-50 text-purple-500 border border-purple-100 uppercase tracking-widest shadow-sm">+12% Gain</span>
          </div>
          <p className="text-[10px] text-slate-400 mb-1 font-black uppercase tracking-[0.2em]">Global Trust</p>
          <h3 className="text-4xl font-black text-slate-950 italic tracking-tighter">Verified</h3>
        </div>

        <div className="glass-card p-10 rounded-[2.5rem] group hover:border-rose-500/40 transition-all duration-500 relative overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-rose-500/10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[4rem] -translate-y-4 translate-x-4 transition-transform group-hover:scale-125 duration-700 pointer-events-none" />
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div className="w-16 h-16 rounded-[1.5rem] bg-white shadow-md flex items-center justify-center text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-all duration-500">
              <AlertCircle className="w-8 h-8" />
            </div>
            <span className="text-[10px] font-black px-4 py-1.5 rounded-full bg-rose-50 text-rose-500 border border-rose-100 uppercase tracking-widest shadow-sm">Zero Fault</span>
          </div>
          <p className="text-[10px] text-slate-400 mb-1 font-black uppercase tracking-[0.2em]">Revisions</p>
          <h3 className="text-4xl font-black text-slate-950 tracking-tighter">0</h3>
        </div>
      </div>

      {/* Archive / Empty State Section */}
      <div className="glass-card rounded-[4rem] p-20 flex flex-col items-center justify-center text-center space-y-8 min-h-[550px] relative overflow-hidden border-white/60 bg-white/40 shadow-2xl shadow-gray-200/50">
        <div className="absolute inset-0 bg-mesh-gradient opacity-40 pointer-events-none" />
        
        <div className="w-28 h-28 rounded-[2.5rem] bg-white shadow-2xl flex items-center justify-center mb-6 border border-slate-50 relative group transition-transform duration-700 hover:rotate-12">
           <div className="absolute inset-0 bg-[#0eaa99]/5 rounded-[2.5rem] scale-0 group-hover:scale-100 transition-all duration-500" />
           <FileText className="w-14 h-14 text-slate-200 group-hover:text-[#0eaa99] transition-all duration-500 relative z-10" />
        </div>

        <h3 className="text-4xl font-black tracking-tighter text-slate-950 italic">Global Archive Secured</h3>
        <p className="text-slate-500 max-w-xl font-bold text-lg leading-relaxed">No reports are currently pending finalized status within your profile. Explore your personal vault to audit historical structural analysis <span className="text-[#0eaa99]">data dossiers</span>.</p>
        
        <div className="pt-8">
          <button className="px-14 py-5 bg-white border border-slate-100 text-[#0eaa99] font-black uppercase text-[10px] tracking-[0.3em] rounded-2xl hover:border-[#0eaa99]/40 hover:shadow-2xl shadow-gray-200 transition-all active:scale-95 hover:ring-8 hover:ring-[#0eaa99]/5">
            Audit Personal Vault Protocol
          </button>
        </div>
      </div>
    </div>
  )
}
