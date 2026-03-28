'use client'

import React from 'react'
import {
  Users,
  Search,
  Filter,
  TrendingUp,
  Clock
} from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const APPLICATIONS_DATA = [
  {
    id: 'A-2041',
    name: 'Eleanor Vance',
    property: 'Belgravia Modern Penthouse',
    status: 'Pending Review',
    creditScore: '920 (Excellent)',
    submittedAt: 'Today, 10:15 AM',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'A-2042',
    name: 'Marcus Thorne',
    property: 'Dubai Marina Residence',
    status: 'Verified',
    creditScore: '890 (High)',
    submittedAt: 'Yesterday',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
  }
]

export default function ApplicationsPage() {

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-1000">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h1 className="text-5xl font-black tracking-tight text-slate-900 mb-3 italic">Tenant Perimeters</h1>
          <p className="text-slate-500 font-bold text-lg leading-relaxed">Review and verify global tenant applications for your assets with <span className="text-[#0eaa99] font-black italic underline decoration-wavy underline-offset-4 decoration-[#0eaa99]/30">absolute precision</span>.</p>
        </div>
        
        <div className="flex items-center gap-5">
          <button className="flex items-center gap-2.5 px-8 py-4 bg-white border border-slate-200 rounded-[1.5rem] text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm hover:shadow-md active:scale-95 group">
            <Filter className="w-4 h-4 text-slate-400 group-hover:text-[#0eaa99] transition-colors" />
            Advanced Filters
          </button>
          <select className="bg-slate-950 text-white font-black rounded-[1.5rem] px-8 py-4 text-xs cursor-pointer shadow-2xl hover:bg-slate-900 transition-all focus:outline-none border-none uppercase tracking-widest">
            <option>Open Portals</option>
            <option>Closed Portals</option>
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="glass-card p-10 rounded-[2.5rem] border-blue-100 bg-blue-50/20 group relative overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500">
           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/30 rounded-bl-[4rem] -translate-y-4 translate-x-4 transition-transform group-hover:scale-125 duration-700 pointer-events-none" />
           <div className="flex items-center gap-8 mb-6 relative z-10">
             <div className="w-16 h-16 rounded-[1.5rem] bg-white shadow-xl flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-700">
                <Clock className="w-8 h-8" />
             </div>
             <div>
               <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">Active Pulse</p>
               <h3 className="text-4xl font-black text-slate-950 tracking-tighter">12 Pending</h3>
             </div>
           </div>
           <p className="text-xs text-blue-500 font-bold italic border-l-4 border-blue-500/20 pl-6 h-5 opacity-0 group-hover:opacity-100 transition-all duration-500">Applications require synchronization.</p>
        </div>

        <div className="glass-card p-10 rounded-[2.5rem] border-[#0eaa99]/20 bg-[#0eaa99]/5 group relative overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#0eaa99]/10 transition-all duration-500">
           <div className="absolute top-0 right-0 w-32 h-32 bg-[#0eaa99]/10 rounded-bl-[4rem] -translate-y-4 translate-x-4 transition-transform group-hover:scale-125 duration-700 pointer-events-none" />
           <div className="flex items-center gap-8 mb-6 relative z-10">
             <div className="w-16 h-16 rounded-[1.5rem] bg-white shadow-xl flex items-center justify-center text-[#0eaa99] group-hover:bg-[#0eaa99] group-hover:text-white transition-all duration-700">
                <TrendingUp className="w-8 h-8" />
             </div>
             <div>
               <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">Trust Metric</p>
               <h3 className="text-4xl font-black text-slate-950 tracking-tighter">84% Yield</h3>
             </div>
           </div>
           <p className="text-xs text-[#0eaa99] font-bold italic border-l-4 border-[#0eaa99]/20 pl-6 h-5 opacity-0 group-hover:opacity-100 transition-all duration-500">Global acceptance rate optimized.</p>
        </div>

        <div className="glass-card p-10 rounded-[2.5rem] border-purple-100 bg-purple-50/20 group relative overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500">
           <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100/30 rounded-bl-[4rem] -translate-y-4 translate-x-4 transition-transform group-hover:scale-125 duration-700 pointer-events-none" />
           <div className="flex items-center gap-8 mb-6 relative z-10">
             <div className="w-16 h-16 rounded-[1.5rem] bg-white shadow-xl flex items-center justify-center text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-all duration-700">
                <Users className="w-8 h-8" />
             </div>
             <div>
               <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">Asset Network</p>
               <h3 className="text-4xl font-black text-slate-950 tracking-tighter">1,204 Verified</h3>
             </div>
           </div>
           <p className="text-xs text-purple-500 font-bold italic border-l-4 border-purple-500/20 pl-6 h-5 opacity-0 group-hover:opacity-100 transition-all duration-500">Authenticated tenants in archive.</p>
        </div>
      </div>

      {/* Main Content: Applications Table */}
      <div className="glass-card rounded-[3rem] overflow-hidden border-white/60 bg-white/40 shadow-2xl shadow-gray-200/50">
        <div className="p-10 border-b border-slate-100 flex items-center justify-between bg-white/20 backdrop-blur-xl">
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
            <input 
              type="text" 
              placeholder="Search across your verified tenant network..."
              className="w-full bg-white border border-slate-100 rounded-[2rem] py-5 pl-16 pr-8 text-sm focus:outline-none focus:border-[#0eaa99] focus:ring-4 focus:ring-[#0eaa99]/5 transition-all font-bold shadow-inner"
            />
          </div>
        </div>

        <div className="overflow-x-auto px-10 pb-10">
          <table className="w-full text-left border-separate border-spacing-y-5">
            <thead>
              <tr className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                <th className="px-8 py-4">Applicant Profile</th>
                <th className="px-8 py-4">Property Perimeter</th>
                <th className="px-8 py-4 text-center">Credit Metric</th>
                <th className="px-8 py-4">Global Status</th>
                <th className="px-8 py-4 text-right">Perimeter Action</th>
              </tr>
            </thead>
            <tbody>
              {APPLICATIONS_DATA.map((app, idx) => (
                <motion.tr 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={app.id} 
                  className="group hover:scale-[1.005] transition-all duration-300"
                >
                  <td className="px-8 py-6 bg-white border border-slate-50 rounded-l-[2.5rem] shadow-sm group-hover:shadow-xl transition-all">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-full overflow-hidden relative border-4 border-white shadow-md ring-4 ring-transparent group-hover:ring-[#0eaa99]/20 transition-all duration-500">
                        <Image src={app.avatar} alt={app.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-black text-slate-950 text-base tracking-tighter leading-none mb-1">{app.name}</p>
                        <p className="text-[10px] text-slate-400 font-black tracking-widest uppercase">{app.submittedAt}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 bg-white border-y border-slate-50 shadow-sm group-hover:shadow-xl transition-all">
                    <p className="font-bold text-slate-800 text-sm italic tracking-tight mb-1">{app.property}</p>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Protocol ID: {app.id}</p>
                  </td>
                  <td className="px-8 py-6 bg-white border-y border-slate-50 shadow-sm group-hover:shadow-xl transition-all text-center">
                    <span className="text-xs font-black text-slate-950 uppercase tracking-widest bg-slate-50 border border-slate-100 px-5 py-2 rounded-xl shadow-inner">{app.creditScore}</span>
                  </td>
                  <td className="px-8 py-6 bg-white border-y border-slate-50 shadow-sm group-hover:shadow-xl transition-all">
                    <span className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm ${
                      app.status === 'Verified' ? 'bg-[#0eaa99]/10 text-[#0eaa99] border-[#0eaa99]/20' : 'bg-blue-50 text-blue-500 border-blue-100 shadow-blue-50'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 bg-white border border-slate-50 rounded-r-[2.5rem] shadow-sm group-hover:shadow-xl transition-all text-right">
                    <button className="px-10 py-4 bg-slate-950 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-slate-900 transition-all active:scale-95 shadow-2xl hover:shadow-slate-300">
                      Audit Dossier Protocol
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
