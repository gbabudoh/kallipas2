'use client'

import React from 'react'
import { 
  Users, 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  MessageSquare,
  TrendingUp,
  Clock,
  DollarSign,
  ExternalLink
} from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const LEADS_DATA = [
  {
    id: 'L-1024',
    name: 'Alexander Volkov',
    email: 'alex.v@globalcorp.net',
    phone: '+44 20 7946 0123',
    property: 'Elite Skyline View Villa',
    budget: '$2.5M - $3.0M',
    status: 'New',
    source: 'Website',
    lastContact: '2 hours ago',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'L-1025',
    name: 'Sarah Jenkins',
    email: 'sjenkins@techpulse.io',
    phone: '+1 212 555 0198',
    property: 'Modernist Glass Pavilion',
    budget: '$1.8M',
    status: 'In Progress',
    source: 'Referral',
    lastContact: '5 hours ago',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'L-1026',
    name: 'Chen Wei',
    email: 'c.wei@asiatop.com',
    phone: '+852 2345 6789',
    property: 'Coastal Sanctuary Estate',
    budget: '$5.0M+',
    status: 'Negotiating',
    source: 'Direct Enquiry',
    lastContact: 'Yesterday',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'L-1027',
    name: 'Isabella Rossi',
    email: 'rossi.isabella@luxury-living.it',
    phone: '+39 02 1234 5678',
    property: 'Renaissance Garden Penthouse',
    budget: '$4.2M',
    status: 'Closed',
    source: 'Marketplace',
    lastContact: '3 days ago',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop'
  }
]

const STATS = [
  { label: 'Total Leads', value: '142', icon: Users, trend: '+12% this month' },
  { label: 'Conversion Rate', value: '8.4%', icon: TrendingUp, trend: '+0.5% vs avg' },
  { label: 'Avg. Response', value: '14m', icon: Clock, trend: 'Fast' },
  { label: 'Pipeline Value', value: '$24.8M', icon: DollarSign, trend: 'High Priority' },
]

const ST_COLORS: Record<string, string> = {
  'New': 'bg-blue-50 text-blue-500 border-blue-100',
  'In Progress': 'bg-orange-50 text-orange-500 border-orange-100',
  'Negotiating': 'bg-purple-50 text-purple-500 border-purple-100',
  'Closed': 'bg-[#0eaa99]/10 text-[#0eaa99] border-[#0eaa99]/20',
}

export default function LeadsPage() {
  // role is available via useParams if needed

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-1000">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h1 className="text-5xl font-black tracking-tight text-slate-900 mb-3 italic">Client Perimeters</h1>
          <p className="text-slate-500 font-bold text-lg leading-relaxed">Manage and convert your global property enquiries with <span className="text-[#0eaa99] font-black italic underline decoration-wavy underline-offset-4 decoration-[#0eaa99]/30">absolute precision</span>.</p>
        </div>
        
        <div className="flex items-center gap-5">
          <button className="flex items-center gap-2.5 px-8 py-4 bg-white border border-slate-200 rounded-[1.5rem] text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm hover:shadow-md active:scale-95 group">
            <Filter className="w-4 h-4 text-slate-400 group-hover:text-[#0eaa99] transition-colors" />
            Advanced Filters
          </button>
          <button className="flex items-center gap-2.5 px-10 py-4 bg-slate-950 text-white font-black rounded-[1.5rem] transition-all shadow-2xl hover:bg-slate-900 hover:shadow-slate-300 active:scale-95 group text-xs uppercase tracking-widest">
            <ExternalLink className="w-4 h-4" />
            Export Portfolio
          </button>
        </div>
      </div>

      {/* Stats Quick Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {STATS.map((stat) => (
          <div key={stat.label} className="glass-card p-10 rounded-[2.5rem] border-white/60 hover:border-[#0eaa99]/40 transition-all duration-500 group relative overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#0eaa99]/10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[4rem] -translate-y-4 translate-x-4 transition-transform group-hover:scale-125 duration-700 pointer-events-none" />
            
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="w-16 h-16 rounded-[1.5rem] bg-white shadow-md flex items-center justify-center text-[#0eaa99] group-hover:bg-[#0eaa99] group-hover:text-white transition-all duration-700">
                <stat.icon className="w-8 h-8" />
              </div>
              <span className="text-[10px] font-black px-4 py-1.5 rounded-full bg-[#0eaa99]/10 text-[#0eaa99] border border-[#0eaa99]/20 uppercase tracking-widest shadow-sm">
                {stat.trend}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 mb-1 font-black uppercase tracking-[0.2em]">{stat.label}</p>
            <h3 className="text-4xl font-black tracking-tighter text-slate-950">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Main Content: Leads Table */}
      <div className="glass-card rounded-[3rem] overflow-hidden border-white/50 bg-white/40 shadow-2xl shadow-gray-200/50">
        <div className="p-10 border-b border-slate-100 flex items-center justify-between bg-white/20">
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
            <input 
              type="text" 
              placeholder="Search across your global network..."
              className="w-full bg-white border border-slate-100 rounded-[2rem] py-5 pl-16 pr-8 text-sm focus:outline-none focus:border-[#0eaa99] focus:ring-4 focus:ring-[#0eaa99]/5 transition-all font-bold shadow-inner"
            />
          </div>
          <div className="flex items-center gap-8">
            <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] whitespace-nowrap">View Perimeter:</span>
            <select className="bg-white border border-slate-100 rounded-2xl px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-600 focus:outline-none cursor-pointer shadow-sm hover:border-[#0eaa99]/50 hover:ring-4 hover:ring-[#0eaa99]/5 transition-all">
              <option>All Prospects</option>
              <option>High Precision</option>
              <option>Active Enquires</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto px-6 pb-6">
          <table className="w-full text-left border-separate border-spacing-y-4">
            <thead>
              <tr className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                <th className="px-8 py-4">Global Prospect</th>
                <th className="px-8 py-4">Property Perimeter</th>
                <th className="px-8 py-4">Capital Range</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {LEADS_DATA.map((lead, idx) => (
                <motion.tr 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={lead.id} 
                  className="group hover:scale-[1.005] transition-all duration-300"
                >
                  <td className="px-8 py-6 bg-white border border-slate-50 rounded-l-[2rem] shadow-sm group-hover:shadow-xl transition-all">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-full overflow-hidden relative border-4 border-white shadow-md ring-4 ring-transparent group-hover:ring-[#0eaa99]/20 transition-all duration-500">
                        <Image src={lead.avatar} alt={lead.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-black text-slate-950 text-base tracking-tighter leading-none mb-1">{lead.name}</p>
                        <p className="text-[10px] text-slate-400 font-black tracking-widest uppercase">{lead.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 bg-white border-y border-slate-50 shadow-sm group-hover:shadow-xl transition-all">
                    <p className="font-bold text-slate-800 text-sm tracking-tight mb-1">{lead.property}</p>
                    <p className="text-[10px] text-[#0eaa99] font-black uppercase tracking-[0.2em]">{lead.source}</p>
                  </td>
                  <td className="px-8 py-6 bg-white border-y border-slate-50 shadow-sm group-hover:shadow-xl transition-all">
                    <span className="text-base font-black text-slate-950 tracking-tighter">{lead.budget}</span>
                  </td>
                  <td className="px-8 py-6 bg-white border-y border-slate-50 shadow-sm group-hover:shadow-xl transition-all">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm ${ST_COLORS[lead.status]}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 bg-white border border-slate-50 rounded-r-[2rem] shadow-sm group-hover:shadow-xl transition-all text-right">
                    <div className="flex items-center justify-end gap-3">
                       <button className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-[#0eaa99] hover:bg-[#0eaa99]/10 transition-all active:scale-90 shadow-sm hover:shadow-md border border-transparent hover:border-[#0eaa99]/20">
                          <Phone className="w-4 h-4" />
                       </button>
                       <button className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-[#0eaa99] hover:bg-[#0eaa99]/10 transition-all active:scale-90 shadow-sm hover:shadow-md border border-transparent hover:border-[#0eaa99]/20">
                          <Mail className="w-4 h-4" />
                       </button>
                       <button className="p-3 bg-[#0eaa99] rounded-2xl text-white shadow-xl shadow-[#0eaa99]/20 hover:bg-[#0c9485] hover:shadow-[#0eaa99]/40 transition-all active:scale-95 group/btn">
                          <MessageSquare className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                       </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-10 border-t border-slate-100 flex items-center justify-between bg-white/30 backdrop-blur-2xl">
           <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">Synchronized: 4 of 142 Global Prospects <span className="mx-3 text-[#0eaa99]/30">|</span> <span className="text-slate-900">Perimeter Level 1</span></p>
           <div className="flex items-center gap-5">
              <button className="px-8 py-3.5 border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-white hover:text-slate-950 hover:shadow-2xl transition-all active:scale-95">Previous</button>
              <button className="px-8 py-3.5 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-950 shadow-2xl hover:border-[#0eaa99]/50 hover:ring-4 hover:ring-[#0eaa99]/5 transition-all active:scale-95">Next Perimeter</button>
           </div>
        </div>
      </div>
    </div>
  )
}
