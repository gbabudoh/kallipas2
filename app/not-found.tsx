import Link from 'next/link'
import Navbar from '@/components/navigation/navbar'
import Footer from '@/components/home/footer'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center pt-32 pb-24 px-6">
        <div className="text-center max-w-xl">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-[2rem] bg-[#0eaa99]/10 text-[#0eaa99] mb-8 animate-pulse">
            <span className="text-4xl font-black italic">404</span>
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tight italic mb-6">
            Listing Not Found
          </h1>
          <p className="text-lg text-slate-500 font-medium leading-relaxed mb-10">
            The property perimeter you are searching for is outside our current synchronized global network. Let&apos;s get you back to the marketplace.
          </p>
          <Link 
            href="/listings"
            className="inline-flex items-center px-8 py-4 bg-slate-950 hover:bg-[#0eaa99] text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl transition-all duration-300 shadow-xl shadow-slate-950/20 active:scale-[0.98] cursor-pointer"
          >
            Explore Listings
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
