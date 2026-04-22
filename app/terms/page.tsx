import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/home/footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Navbar />
      <main className="pt-32 pb-24 max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-[3rem] border border-slate-100 p-12 md:p-16 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0eaa99] mb-4">
            Legal Compliance
          </p>
          <h1 className="text-5xl font-black tracking-tight text-slate-900 italic mb-8">
            Terms of Service
          </h1>
          
          <div className="prose prose-slate max-w-none space-y-6 text-slate-600 font-medium">
            <p className="text-lg text-slate-900 font-bold italic">Effective Date: April 2026</p>
            
            <section>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-3">1. Agreement to Terms</h2>
              <p>
                By accessing or using the Kallipas Global platform, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, you do not have permission to access the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-3">2. Service Description</h2>
              <p>
                Kallipas provides a global real estate marketplace. We facilitate connections between buyers, sellers, and professionals but are not a party to the actual property sale or lease agreements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-3">3. Flat Fee Policy</h2>
              <p>
                Kallipas operates on a flat-fee model for property listings. The fee ($25 USD or equivalent) is non-refundable once the listing is activated on our global network.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-3">4. Verification &amp; Trust</h2>
              <p>
                Users seeking &quot;Verified&quot; status must provide accurate legal credentials. Kallipas reserves the right to suspend any account found to be providing fraudulent or misleading information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-3">5. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Kallipas shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use of our platform.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
