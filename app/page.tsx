import { Suspense } from "react";
import Navbar from "@/components/navigation/navbar";
import Hero from "@/components/home/hero";
import Features from "@/components/home/features";
import Footer from "@/components/home/footer";
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
        
        <Footer />
      </main>
    </div>
  );
}
