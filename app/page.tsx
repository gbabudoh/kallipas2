import { Suspense } from "react";
import Navbar from "@/components/navigation/navbar";
import Hero from "@/components/home/hero";
import StatsBar from "@/components/home/stats-bar";
import Features from "@/components/home/features";
import HowItWorks from "@/components/home/how-it-works";
import Testimonials from "@/components/home/testimonials";
import CtaBanner from "@/components/home/cta-banner";
import Footer from "@/components/home/footer";
import { getSiteSettings } from "@/app/actions/settings";
import { Loader2 } from "lucide-react";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://kallipas.com/#organization",
      name: "Kallipas Global",
      url: "https://kallipas.com",
      logo: "https://kallipas.com/logo.png",
      description:
        "The first global real estate platform with zero translation barriers, verified private sellers, and instant video walkthroughs.",
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": "https://kallipas.com/#website",
      url: "https://kallipas.com",
      name: "Kallipas Global",
      publisher: { "@id": "https://kallipas.com/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://kallipas.com/listings?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-background text-foreground selection:bg-[#0eab9b]/30">
        <Navbar />
        <main>
          <Suspense fallback={<HeroSkeleton />}>
            <HeroWrapper />
          </Suspense>
          <StatsBar />
          <Features />
          <HowItWorks />
          <Testimonials />
          <CtaBanner />
          <Footer />
        </main>
      </div>
    </>
  );
}
