import NewListingForm from '@/components/dashboard/new-listing-form'

export default function NewListingPage() {
  return (
    <div className="min-h-full space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000 bg-slate-50/30 p-12 rounded-[3.5rem] border border-white shadow-inner">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-slate-100">
        <div>
          <h1 className="text-6xl font-black italic mb-4 tracking-tighter text-slate-950 underline decoration-wavy decoration-[#0eaa99]/20 underline-offset-[12px]">Property Genesis</h1>
          <p className="text-xl font-bold text-slate-400">Initialize a custom asset perimeter for the <span className="text-[#0eaa99] font-black italic underline decoration-slate-100 decoration-4">global marketplace</span>.</p>
        </div>
        <div className="bg-white border border-slate-100 px-8 py-4 rounded-[2rem] shadow-xl shadow-slate-200/50 flex items-center gap-4">
           <div className="w-3 h-3 rounded-full bg-[#0eaa99] shadow-lg shadow-[#0eaa99]/50 animate-pulse" />
           <span className="text-xs font-black text-slate-950 uppercase tracking-[0.3em]">Flat Provision: $25.00</span>
        </div>
      </div>

      <div className="relative">
        <NewListingForm />
      </div>
    </div>
  )
}
