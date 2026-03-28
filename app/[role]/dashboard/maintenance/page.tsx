'use client'

import React from 'react'
import { 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Search,
  Filter,
  Hammer,
  TrendingUp
} from 'lucide-react'
import { motion } from 'framer-motion'

const MAINTENANCE_DATA = [
  {
    id: 'M-3051',
    property: 'Belgravia Modern Penthouse',
    issue: 'HVAC System Calibration',
    priority: 'High',
    status: 'In Progress',
    assignedTo: 'Elite Engineering Ltd',
    cost: '£850.00'
  },
  {
    id: 'M-3052',
    property: 'Dubai Marina Residence',
    issue: 'Global Facade Cleaning',
    priority: 'Medium',
    status: 'Scheduled',
    assignedTo: 'Global Clean Services',
    cost: '$1,200.00'
  }
]

export default function MaintenancePage() {
  // role is available via useParams if needed in the future

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-1000">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h1 className="text-5xl font-black tracking-tight text-slate-900 mb-3 italic">Maintenance Perimeter</h1>
          <p className="text-slate-500 font-bold text-lg leading-relaxed">Manage and oversee asset maintenance for your global portfolio with <span className="text-[#0eaa99] font-black italic underline decoration-wavy underline-offset-4 decoration-[#0eaa99]/30">absolute precision</span>.</p>
        </div>
        
        <button className="flex items-center gap-3 px-10 py-5 bg-[#0eaa99] text-white font-black rounded-3xl transition-all shadow-2xl shadow-[#0eaa99]/30 hover:bg-[#0c9485] hover:shadow-[#0eaa99]/50 hover:scale-[1.02] active:scale-95 group text-xs uppercase tracking-widest">
          <Hammer className="w-5 h-5 group-hover:-rotate-12 transition-transform duration-300" />
          Log Maintenance Issue
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="glass-card p-10 rounded-[2.5rem] group hover:border-rose-500/40 transition-all duration-500 relative overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-rose-500/10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-bl-[4rem] -translate-y-4 translate-x-4 transition-transform group-hover:scale-125 duration-700 pointer-events-none" />
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div className="w-16 h-16 rounded-[1.5rem] bg-white shadow-md flex items-center justify-center text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-all duration-500">
              <AlertCircle className="w-8 h-8" />
            </div>
            <span className="text-[10px] font-black px-4 py-1.5 rounded-full bg-rose-50 text-rose-500 border border-rose-100 uppercase tracking-widest shadow-sm">Urgent</span>
          </div>
          <p className="text-[10px] text-slate-400 mb-1 font-black uppercase tracking-[0.2em]">Critical Pulse</p>
          <h3 className="text-4xl font-black text-rose-500 tracking-tighter">3</h3>
        </div>

        <div className="glass-card p-10 rounded-[2.5rem] group hover:border-[#0eaa99]/40 transition-all duration-500 relative overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#0eaa99]/10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[4rem] -translate-y-4 translate-x-4 transition-transform group-hover:scale-125 duration-700 pointer-events-none" />
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div className="w-16 h-16 rounded-[1.5rem] bg-white shadow-md flex items-center justify-center text-[#0eaa99] group-hover:bg-[#0eaa99] group-hover:text-white transition-all duration-500">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="text-[10px] font-black px-4 py-1.5 rounded-full bg-[#0eaa99]/10 text-[#0eaa99] border border-[#0eaa99]/20 uppercase tracking-widest shadow-sm">Resolved</span>
          </div>
          <p className="text-[10px] text-slate-400 mb-1 font-black uppercase tracking-[0.2em]">Total Fixed</p>
          <h3 className="text-4xl font-black text-slate-950 tracking-tighter">42</h3>
        </div>

        <div className="glass-card p-10 rounded-[2.5rem] group hover:border-blue-500/40 transition-all duration-500 relative overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-blue-500/10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[4rem] -translate-y-4 translate-x-4 transition-transform group-hover:scale-125 duration-700 pointer-events-none" />
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div className="w-16 h-16 rounded-[1.5rem] bg-white shadow-md flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
              <Clock className="w-8 h-8" />
            </div>
            <span className="text-[10px] font-black px-4 py-1.5 rounded-full bg-blue-50 text-blue-500 border border-blue-100 uppercase tracking-widest shadow-sm">Pending</span>
          </div>
          <p className="text-[10px] text-slate-400 mb-1 font-black uppercase tracking-[0.2em]">Awaiting Quote</p>
          <h3 className="text-4xl font-black text-slate-950 tracking-tighter">12</h3>
        </div>

        <div className="glass-card p-10 rounded-[2.5rem] group hover:border-slate-900/10 transition-all duration-500 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[4rem] -translate-y-4 translate-x-4 transition-transform group-hover:scale-125 duration-700 pointer-events-none" />
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div className="w-16 h-16 rounded-[1.5rem] bg-white shadow-md flex items-center justify-center text-slate-950 transition-all duration-500">
              <TrendingUp className="w-8 h-8" />
            </div>
          </div>
          <p className="text-[10px] text-slate-400 mb-1 font-black uppercase tracking-[0.2em]">Annual Yield Impact</p>
          <h3 className="text-4xl font-black text-slate-950 tracking-tighter drop-shadow-sm">$12.4k</h3>
        </div>
      </div>

      {/* Maintenance Ledger List */}
      <div className="glass-card rounded-[3rem] overflow-hidden border-white/60 bg-white/40 shadow-2xl shadow-gray-200/50">
        <div className="p-10 border-b border-slate-100 flex items-center justify-between bg-white/20 backdrop-blur-xl">
          <h3 className="text-3xl font-black text-slate-950 italic tracking-tighter">Maintenance Ledger</h3>
          <div className="flex items-center gap-5">
             <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                <input type="text" placeholder="Search logs..." className="bg-white border border-slate-100 rounded-[1.5rem] py-3 pl-12 pr-6 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-[#0eaa99] transition-all shadow-inner" />
             </div>
            <button className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-[#0eaa99] hover:border-[#0eaa99]/30 transition-all shadow-xl hover:shadow-[#0eaa99]/10 active:scale-95"><Filter className="w-4 h-4" /></button>
          </div>
        </div>

        <div className="overflow-x-auto px-10 pb-10">
          <table className="w-full text-left border-separate border-spacing-y-5">
            <thead>
              <tr className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                <th className="px-8 py-4 text-center">Protocol ID</th>
                <th className="px-8 py-4">Asset Cluster</th>
                <th className="px-8 py-4">Issue Specific</th>
                <th className="px-8 py-4 text-center">Priority</th>
                <th className="px-8 py-4 text-right">Perimeter Action</th>
              </tr>
            </thead>
            <tbody>
              {MAINTENANCE_DATA.map((item, idx) => (
                <motion.tr 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={item.id} 
                  className="group hover:scale-[1.005] transition-all duration-300"
                >
                  <td className="px-8 py-6 bg-slate-50 border border-slate-100 rounded-l-[2.5rem] text-center">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">#{item.id}</span>
                  </td>
                  <td className="px-8 py-6 bg-white border-y border-slate-50 shadow-sm group-hover:shadow-xl transition-all">
                    <p className="font-black text-slate-950 text-base tracking-tighter leading-none mb-1">{item.property}</p>
                    <p className="text-[10px] text-[#0eaa99] font-black uppercase tracking-[0.2em]">Network Partner: {item.assignedTo}</p>
                  </td>
                  <td className="px-8 py-6 bg-white border-y border-slate-50 shadow-sm group-hover:shadow-xl transition-all">
                    <p className="font-bold text-slate-800 text-sm italic tracking-tight mb-1">{item.issue}</p>
                    <p className="text-[10px] text-rose-500 font-black uppercase tracking-widest">Budget Impact: {item.cost}</p>
                  </td>
                  <td className="px-8 py-6 bg-white border-y border-slate-50 shadow-sm group-hover:shadow-xl transition-all text-center">
                    <span className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm ${
                      item.priority === 'High' ? 'bg-rose-50 text-rose-500 border-rose-100 shadow-rose-100' : 'bg-[#0eaa99]/10 text-[#0eaa99] border-[#0eaa99]/20 shadow-teal-50'
                    }`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="px-8 py-6 bg-white border border-slate-50 rounded-r-[2.5rem] shadow-sm group-hover:shadow-xl transition-all text-right">
                    <button className="px-8 py-4 bg-slate-950 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-slate-900 transition-all active:scale-95 shadow-2xl hover:shadow-slate-300">
                      Audit Task Protocol
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
