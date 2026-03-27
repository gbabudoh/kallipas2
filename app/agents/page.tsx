import Navbar from "@/components/navigation/navbar";

const CATEGORY_LABELS: Record<string, string> = {
  PRIVATE_SELLER: 'Private Sellers',
  INDEPENDENT_REALTOR: 'Independent Realtors',
  AGENCY_AGENT: 'Agency Agents',
  PRIVATE_LANDLORD: 'Private Landlords',
  PROPERTY_MANAGER: 'Property Managers',
  LETTING_AGENT: 'Letting Agents',
};

export default async function AgentsPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ type?: string }> 
}) {
  const { type } = await searchParams;
  const label = type ? CATEGORY_LABELS[type] || 'Our Members' : 'Our Members';

  return (
    <div className="min-h-screen bg-[#F2EAE0]/10">
      <Navbar />
      <main className="pt-32 pb-20 max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-slate-800 mb-8">{label}</h1>
        <div className="bg-white/50 backdrop-blur-md rounded-[3rem] border border-[#9AB17A]/20 p-16 text-center shadow-xl shadow-[#9AB17A]/5">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-[#9AB17A]/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <div className="w-10 h-10 border-4 border-[#9AB17A] border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4 tracking-tight">Syncing Directory...</h2>
            <p className="text-slate-500 font-medium leading-relaxed">
              We are currently synchronizing the {label.toLowerCase()} directory for your region. 
              Verified listings and profiles will appear here shortly.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
