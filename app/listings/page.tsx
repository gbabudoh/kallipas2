import Navbar from "@/components/navigation/navbar";

export default function ListingsPage() {
  return (
    <div className="min-h-screen bg-[#F2EAE0]/10">
      <Navbar />
      <main className="pt-32 pb-20 max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-slate-800 mb-8">Property Marketplace</h1>
        <div className="bg-white/50 backdrop-blur-md rounded-[2rem] border border-[#9AB17A]/20 p-12 text-center">
          <p className="text-slate-500 font-medium">Marketplace listings are being synchronized...</p>
        </div>
      </main>
    </div>
  )
}
