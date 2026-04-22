'use client'

import { useState } from 'react'
import { MessageSquare, Video, Car, CheckCircle2, Tag, Loader2, X, Send, Calendar } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { type Dict } from '@/lib/i18n'

type ContactSectionProps = {
  t: Dict
  listing: {
    id: string
    seller: string
    sellerRole: string
    sellerAvatar?: string | null
  }
}

export default function ListingContact({ t, listing }: ContactSectionProps) {
  const [activeModal, setActiveModal] = useState<'enquiry' | 'viewing' | 'visit' | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleAction = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const res = await fetch('/api/listings/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listingId: listing.id,
          type: activeModal,
          // We'd gather actual form data here
          message: activeModal === 'enquiry' ? 'Interested in this property' : undefined,
          date: activeModal !== 'enquiry' ? new Date().toISOString() : undefined,
        })
      })

      if (res.ok) {
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
          setActiveModal(null)
        }, 2000)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm space-y-5 sticky top-28">
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400 mb-3">{t.listings.listedBy}</p>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#0eaa99]/10 flex items-center justify-center flex-shrink-0 border border-[#0eaa99]/20 shadow-sm cursor-pointer hover:bg-[#0eaa99]/20 transition-all overflow-hidden group">
              {listing.sellerAvatar ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img 
                  src={listing.sellerAvatar} 
                  alt={listing.seller}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
              ) : (
                <Tag className="w-5 h-5 text-[#0eaa99] cursor-pointer" />
              )}
            </div>
            <div className="cursor-pointer">
              <p className="font-black text-slate-900 tracking-tight">{listing.seller}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#0eaa99] bg-[#0eaa99]/5 px-2 py-0.5 rounded-md inline-block cursor-pointer">
                {listing.sellerRole.replace(/_/g, ' ')}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 bg-slate-50/80 rounded-xl px-4 py-3 border border-slate-100/50 cursor-pointer hover:bg-slate-100 transition-colors">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#0eaa99] cursor-pointer" />
          {t.listings.typicallyResponds}
        </div>

        <div className="space-y-3">
          <button 
            onClick={() => setActiveModal('enquiry')}
            className="w-full py-4 bg-slate-950 hover:bg-[#0eaa99] text-white text-[10px] font-black uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-slate-900/10 active:scale-[0.98] cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 cursor-pointer" />
            {t.listings.sendEnquiry}
          </button>
          <button 
            onClick={() => setActiveModal('viewing')}
            className="w-full py-4 bg-white border border-slate-200 hover:border-[#0eaa99]/40 hover:text-[#0eaa99] text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:bg-slate-50/50 active:scale-[0.98] cursor-pointer"
          >
            <Video className="w-3.5 h-3.5 cursor-pointer" />
            {t.listings.requestViewing}
          </button>
          <button 
            onClick={() => setActiveModal('visit')}
            className="w-full py-4 bg-white border border-slate-200 hover:border-[#0eaa99]/40 hover:text-[#0eaa99] text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:bg-slate-50/50 active:scale-[0.98] cursor-pointer"
          >
            <Car className="w-3.5 h-3.5 cursor-pointer" />
            {t.listings.bookVisit}
          </button>
        </div>

        <p className="text-[9px] font-bold text-slate-300 text-center leading-relaxed px-4">
          By contacting, you agree to our <span className="text-slate-400 underline cursor-pointer">Terms &amp; Privacy Policy</span>.
        </p>
      </div>

      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-[0_32px_128px_-32px_rgba(0,0,0,0.3)] border border-white p-10 overflow-hidden"
            >
              {success ? (
                <div className="py-12 text-center space-y-6">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-[#0eaa99]/10 rounded-full flex items-center justify-center mx-auto"
                  >
                    <CheckCircle2 className="w-10 h-10 text-[#0eaa99]" />
                  </motion.div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight italic">Request Sent!</h3>
                    <p className="text-sm font-medium text-slate-500 max-w-[240px] mx-auto">
                      {listing.seller} has been notified and will get back to you shortly via the Kallipas dashboard.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-10">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0eaa99] animate-pulse" />
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0eaa99]">
                          {activeModal === 'enquiry' ? 'Enquiry Protocol' : activeModal === 'viewing' ? 'Virtual Viewing Request' : 'In-Person Booking'}
                        </p>
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight italic">Contact {listing.seller.split(' ')[0]}</h3>
                    </div>
                    <button 
                      onClick={() => setActiveModal(null)}
                      className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all hover:bg-slate-100"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleAction} className="space-y-8">
                    {activeModal === 'enquiry' ? (
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Secure Message</label>
                        <textarea
                          required
                          placeholder={`Hi ${listing.seller}, I&apos;m interested in this property and would like to learn more about the details...`}
                          className="w-full h-40 bg-slate-50 border border-slate-100 rounded-[2rem] p-6 text-sm font-medium focus:outline-none focus:border-[#0eaa99] focus:bg-white transition-all resize-none shadow-inner"
                        />
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Target Date</label>
                          <div className="relative group">
                            <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#0eaa99] transition-colors" />
                            <input
                              type="date"
                              required
                              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4.5 pl-14 pr-6 text-sm font-bold focus:outline-none focus:border-[#0eaa99] focus:bg-white transition-all shadow-inner"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Time Window</label>
                          <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4.5 px-6 text-sm font-bold focus:outline-none focus:border-[#0eaa99] focus:bg-white transition-all appearance-none shadow-inner cursor-pointer">
                            <option>Morning (9 AM - 12 PM)</option>
                            <option>Afternoon (12 PM - 4 PM)</option>
                            <option>Evening (4 PM - 7 PM)</option>
                            <option>Flexible Schedule</option>
                          </select>
                        </div>
                      </div>
                    )}

                    <div className="pt-2">
                      <button
                        disabled={loading}
                        type="submit"
                        className="w-full py-5 bg-slate-950 hover:bg-[#0eaa99] text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-slate-900/20 active:scale-[0.98] disabled:opacity-50"
                      >
                        {loading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Initialize Transmission
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
