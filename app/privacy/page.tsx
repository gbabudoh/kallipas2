import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/home/footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Navbar />
      <main className="pt-32 pb-24 max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-[3rem] border border-slate-100 p-12 md:p-16 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0eaa99] mb-4">
            Legal Compliance
          </p>
          <h1 className="text-5xl font-black tracking-tight text-slate-900 italic mb-8">
            Privacy Policy
          </h1>
          
          <div className="prose prose-slate max-w-none space-y-6 text-slate-600 font-medium">
            <p className="text-lg text-slate-900 font-bold italic">Last Updated: April 2026</p>
            
            <section>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-3">1. Introduction</h2>
              <p>
                Kallipas Global (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our platform and use our global real estate services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-3">2. Data Collection</h2>
              <p>
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Personal identification (Name, Email, Phone Number).</li>
                <li>Professional credentials for Verified Members (Bar License, ID documents).</li>
                <li>Property data and transaction history.</li>
                <li>Communication data via our internal messaging and video tour systems.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-3">3. GDPR Compliance</h2>
              <p>
                For users within the European Economic Area (EEA), we process data in accordance with the General Data Protection Regulation (GDPR). You have the right to access, rectify, or erase your personal data at any time via your Kallipas Dashboard.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-3">4. Data Security</h2>
              <p>
                We implement robust security protocols, including AES-256 encryption for stored identity documents and TLS for all data in transit across our global network.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-3">5. Contact Us</h2>
              <p>
                If you have questions about this policy, please contact our Data Protection Officer at <strong>legal@kallipas.com</strong>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
