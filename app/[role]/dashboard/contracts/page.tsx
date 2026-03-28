'use client'

import React, { useState } from 'react'
import { 
  FileText, 
  Scale, 
  Signature,
  Gavel,
  ShieldAlert,
  Fingerprint,
  Award,
  CheckCircle2
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'

export default function ContractsPage() {
  const params = useParams()
  const role = params?.role as string
  const isLegal = role === 'legal-agent'

  // Verification status simulation
  const [showStatus, setShowStatus] = useState(true)

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-1000 pb-20">
      
      {/* Verification HUD - Specialized for Solicitors */}
      {isLegal && showStatus && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[2rem] bg-slate-900 p-8 shadow-2xl border border-white/10"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#0eab9b]/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-[#0eab9b]/10 border border-[#0eab9b]/20 flex items-center justify-center text-[#0eab9b]">
                <Fingerprint className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-white font-black italic text-xl tracking-tight uppercase">Solicitor / Attorney / Lawyer Verification Pending</h4>
                <p className="text-slate-400 font-bold text-sm">Legal credentials and identity dossier are currently under global perimeter review.</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-black uppercase tracking-widest">Awaiting Bar Sync</span>
              <button 
                onClick={() => setShowStatus(false)}
                className="p-2 text-slate-500 hover:text-white transition-colors"
              >
                <ShieldAlert className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
             <Scale className="w-5 h-5 text-[#0eab9b]" />
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Professional Jurisdiction</span>
          </div>
          <h1 className="text-5xl font-black tracking-tight text-slate-900 mb-3 italic">Legal Dossier</h1>
          <p className="text-slate-500 font-bold text-lg leading-relaxed">
            Oversee {isLegal ? 'Attorney-grade' : 'global'} agreements and digital perimeters with <span className="text-[#0eab9b] font-black italic underline decoration-wavy underline-offset-4 decoration-[#0eab9b]/30">absolute precision</span>.
          </p>
        </div>
        
        <button className="flex items-center gap-3 px-10 py-5 bg-[#0eab9b] text-white font-black rounded-3xl transition-all shadow-2xl shadow-[#0eab9b]/30 hover:bg-[#0ca191] hover:shadow-[#0eab9b]/50 hover:scale-[1.02] active:scale-95 group text-[10px] uppercase tracking-[0.2em]">
          <Signature className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
          DRAFT Solicitor / Attorney / Lawyer Agreement
        </button>
      </div>

      {/* Stats Grid - Tailored for Solicitors */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="glass-card p-10 rounded-[2.5rem] group hover:border-[#0eab9b]/40 transition-all duration-500 relative overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#0eab9b]/10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[4rem] -translate-y-4 translate-x-4 transition-transform group-hover:scale-125 duration-700 pointer-events-none" />
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div className="w-16 h-16 rounded-[1.5rem] bg-white shadow-md flex items-center justify-center text-[#0eab9b] group-hover:bg-[#0eab9b] group-hover:text-white transition-all duration-500">
              <Gavel className="w-8 h-8" />
            </div>
            <span className="text-[10px] font-black px-4 py-1.5 rounded-full bg-[#0eab9b]/10 text-[#0eab9b] border border-[#0eab9b]/20 uppercase tracking-widest shadow-sm italic">Jurisdiction</span>
          </div>
          <p className="text-[10px] text-slate-400 mb-1 font-black uppercase tracking-[0.2em]">Active Dossiers</p>
          <h3 className="text-4xl font-black text-slate-950 tracking-tighter">08</h3>
        </div>

        <div className="glass-card p-10 rounded-[2.5rem] group hover:border-amber-500/40 transition-all duration-500 relative overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-amber-500/10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[4rem] -translate-y-4 translate-x-4 transition-transform group-hover:scale-125 duration-700 pointer-events-none" />
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div className="w-16 h-16 rounded-[1.5rem] bg-white shadow-md flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all duration-500">
              <Signature className="w-8 h-8" />
            </div>
            <span className="text-[10px] font-black px-4 py-1.5 rounded-full bg-amber-50 text-amber-500 border border-amber-100 uppercase tracking-widest shadow-sm">Attorney</span>
          </div>
          <p className="text-[10px] text-slate-400 mb-1 font-black uppercase tracking-[0.2em]">Signatures Pending</p>
          <h3 className="text-4xl font-black text-slate-950 tracking-tighter">02</h3>
        </div>

        <div className="glass-card p-10 rounded-[2.5rem] group hover:border-purple-500/40 transition-all duration-500 relative overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-purple-500/10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[4rem] -translate-y-4 translate-x-4 transition-transform group-hover:scale-125 duration-700 pointer-events-none" />
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div className="w-16 h-16 rounded-[1.5rem] bg-white shadow-md flex items-center justify-center text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-all duration-500">
              <Award className="w-8 h-8" />
            </div>
            <span className="text-[10px] font-black px-4 py-1.5 rounded-full bg-purple-50 text-purple-500 border border-purple-100 uppercase tracking-widest shadow-sm">Verified</span>
          </div>
          <p className="text-[10px] text-slate-400 mb-1 font-black uppercase tracking-[0.2em]">Success Rating</p>
          <h3 className="text-4xl font-black text-slate-950 italic tracking-tighter">100%</h3>
        </div>

        <div className="glass-card p-10 rounded-[2.5rem] group hover:border-[#0eab9b]/40 transition-all duration-500 relative overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#0eab9b]/10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[4rem] -translate-y-4 translate-x-4 transition-transform group-hover:scale-125 duration-700 pointer-events-none" />
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div className="w-16 h-16 rounded-[1.5rem] bg-white shadow-md flex items-center justify-center text-[#0eab9b] group-hover:bg-[#0eab9b] group-hover:text-white transition-all duration-500">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="text-[10px] font-black px-4 py-1.5 rounded-full bg-[#0eab9b]/10 text-[#0eab9b] border border-[#0eab9b]/20 uppercase tracking-widest shadow-sm">Escrow</span>
          </div>
          <p className="text-[10px] text-slate-400 mb-1 font-black uppercase tracking-[0.2em]">Closed Cases</p>
          <h3 className="text-4xl font-black text-slate-950 tracking-tighter">142</h3>
        </div>
      </div>

      {/* Vault / Archive Section */}
      <div className="glass-card rounded-[4rem] p-20 flex flex-col items-center justify-center text-center space-y-8 min-h-[550px] relative overflow-hidden border-white/60 bg-white/40 shadow-2xl shadow-gray-200/50">
        <div className="absolute inset-0 bg-mesh-gradient opacity-40 pointer-events-none" />
        
        <div className="w-28 h-28 rounded-[2.5rem] bg-white shadow-2xl flex items-center justify-center mb-6 border border-slate-50 relative group transition-transform duration-700 hover:rotate-12">
           <div className="absolute inset-0 bg-[#0eab9b]/5 rounded-[2.5rem] scale-0 group-hover:scale-100 transition-all duration-500" />
           <FileText className="w-14 h-14 text-slate-200 group-hover:text-[#0eab9b] transition-all duration-500 relative z-10" />
        </div>

        <h3 className="text-4xl font-black tracking-tighter text-slate-950 italic">Digital Legal Vault Secured</h3>
        <p className="text-slate-500 max-w-xl font-bold text-lg leading-relaxed">
          No new dossiers require your immediate solicitor signature or bar review today. All bilateral agreements are <span className="text-[#0eab9b]">synchronized</span> with global escrow perimeters.
        </p>
        
        <div className="pt-8">
          <button className="px-14 py-5 bg-white border border-slate-100 text-[#0eab9b] font-black uppercase text-[10px] tracking-[0.3em] rounded-2xl hover:border-[#0eab9b]/40 hover:shadow-2xl shadow-gray-200 transition-all active:scale-95 hover:ring-8 hover:ring-[#0eab9b]/5">
            Audit Personal Jurisdictional Profile
          </button>
        </div>
      </div>
    </div>
  )
}
