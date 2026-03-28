import PropertyMap from '@/components/discovery/property-map'
import { Search, SlidersHorizontal, LayoutGrid as Grid, List } from 'lucide-react'

export default function ListingsPage() {
  return (
    <div className="h-[calc(100vh-64px)] flex overflow-hidden bg-slate-50/50">
      {/* Search & Results Panel */}
      <div className="w-full lg:w-[500px] flex flex-col border-r border-slate-200 bg-white/80 backdrop-blur-3xl shadow-2xl relative z-10">
        <div className="p-8 border-b border-slate-100 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-black italic tracking-tighter text-slate-900 underline decoration-wavy decoration-[#0eaa99]/30 underline-offset-8">Marketplace</h1>
            <div className="flex items-center gap-2 bg-slate-100/50 p-1.5 rounded-2xl border border-slate-100">
              <button className="p-2.5 bg-white shadow-xl shadow-slate-200/50 rounded-xl text-[#0eaa99]"><Grid className="w-4 h-4" /></button>
              <button className="p-2.5 text-slate-400 hover:text-slate-600 transition-colors"><List className="w-4 h-4" /></button>
            </div>
          </div>
          
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#0eaa99] transition-colors" />
            <input 
              type="text" 
              placeholder="Search global assets..."
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-14 pr-6 text-sm focus:outline-none focus:ring-4 focus:ring-[#0eaa99]/5 focus:border-[#0eaa99]/30 transition-all font-bold text-slate-800 placeholder-slate-400 shadow-inner"
            />
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <button className="px-6 py-2.5 bg-[#0eaa99] shadow-xl shadow-[#0eaa99]/20 rounded-full text-[10px] font-black uppercase tracking-widest text-white whitespace-nowrap hover:scale-105 transition-transform active:scale-95">All Assets</button>
            <button className="px-6 py-2.5 bg-white border border-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#0eaa99] hover:border-[#0eaa99]/30 transition-all whitespace-nowrap italic">New</button>
            <button className="px-6 py-2.5 bg-white border border-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#0eaa99] hover:border-[#0eaa99]/30 transition-all whitespace-nowrap">Verified</button>
            <button className="px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-all"><SlidersHorizontal className="w-4 h-4" /></button>
          </div>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
          <div className="flex items-center justify-between">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">48 Elite Assets Indexed</p>
            <span className="text-[10px] bg-[#0eaa99]/10 text-[#0eaa99] px-3 py-1 rounded-full font-black uppercase tracking-widest">Live Pulse</span>
          </div>
          
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="group cursor-pointer relative">
              <div className="aspect-[16/10] bg-slate-100 rounded-[2.5rem] mb-6 overflow-hidden relative shadow-xl group-hover:shadow-2xl transition-all duration-700">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute top-6 left-6 px-4 py-1.5 bg-[#0eaa99] rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-2xl shadow-[#0eaa99]/40 z-10 transition-transform group-hover:scale-110">Featured Asset</div>
                <div className="absolute bottom-6 left-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
                  <p className="text-2xl font-black text-white tracking-tighter drop-shadow-2xl">$2,450,000</p>
                </div>
                <div className="absolute inset-0 bg-mesh-gradient opacity-10 pointer-events-none" />
              </div>
              <h3 className="font-black text-xl mb-2 text-slate-900 tracking-tight group-hover:text-[#0eaa99] transition-colors flex items-center gap-2 italic">
                Elite Skyline View Villa
                <div className="w-1.5 h-1.5 rounded-full bg-[#0eaa99] opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-slate-500 mb-4 font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full border border-slate-300" />
                New York City, USA
              </p>
              <div className="flex items-center gap-6 text-[10px] text-slate-400 font-black uppercase tracking-widest border-t border-slate-50 pt-4">
                <span className="hover:text-slate-900 transition-colors">3 Bed</span>
                <span className="text-slate-200">•</span>
                <span className="hover:text-slate-900 transition-colors">2 Bath</span>
                <span className="text-slate-200">•</span>
                <span className="hover:text-slate-900 transition-colors font-black text-[#0eaa99]">2,400 sqft</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map Panel */}
      <div className="hidden lg:block flex-1 bg-slate-50 relative group">
        <PropertyMap />
        <div className="absolute inset-0 border-[24px] border-white/40 pointer-events-none rounded-[4rem] z-20 m-6" />
      </div>
    </div>
  )
}
