import { Suspense } from "react";
import Navbar from "@/components/navigation/navbar";
import Hero from "@/components/home/hero";
import Features from "@/components/home/features";
import { getSiteSettings } from "@/app/actions/settings";
import { Loader2 } from "lucide-react";

async function HeroWrapper() {
  const settings = await getSiteSettings();
  return <Hero settings={settings} />;
}

function HeroSkeleton() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center pt-32 pb-20">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-10 h-10 text-[#0eab9b] animate-spin opacity-40" />
        <p className="text-[#0eab9b]/40 font-bold text-xs uppercase tracking-widest">
          Loading Hero...
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-[#0eab9b]/30">
      <Navbar />
      <main>
        <Suspense fallback={<HeroSkeleton />}>
          <HeroWrapper />
        </Suspense>
        <Features />
        
        {/* Footer */}
        <footer className="py-12 border-t border-[#0eab9b]/20 text-center">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#0eab9b] rounded-lg flex items-center justify-center font-bold text-white text-sm shadow-sm">K</div>
              <span className="font-bold tracking-tight text-slate-800">Kallipas</span>
            </div>
            <p className="text-slate-500 text-sm font-medium">
              © 2026 Kallipas Global. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-slate-500 hover:text-[#0eab9b] transition-colors text-sm font-medium">Privacy</a>
              <a href="#" className="text-slate-500 hover:text-[#0eab9b] transition-colors text-sm font-medium">Terms</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
