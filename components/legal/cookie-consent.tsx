'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, X, ChevronRight, Check, Settings as SettingsIcon } from 'lucide-react'
import Link from 'next/link'

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: true,
    marketing: false
  })

  useEffect(() => {
    const consent = localStorage.getItem('kallipas-cookie-consent')
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleSave = (prefs: typeof preferences) => {
    localStorage.setItem('kallipas-cookie-consent', JSON.stringify(prefs))
    setIsVisible(false)
  }

  const handleAcceptAll = () => {
    const all = { necessary: true, analytics: true, marketing: true }
    handleSave(all)
  }

  const handleRejectAll = () => {
    const min = { necessary: true, analytics: false, marketing: false }
    handleSave(min)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-8 left-8 right-8 md:left-auto md:right-8 md:max-w-[440px] z-[100]"
        >
          <div className="bg-white/95 backdrop-blur-2xl rounded-[2.5rem] border border-white shadow-[0_32px_80px_-16px_rgba(0,0,0,0.2)] p-8 relative overflow-hidden group">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#0eaa99]/5 rounded-full -mr-24 -mt-24 transition-transform group-hover:scale-125 duration-1000" />
            
            <div className="relative">
              {!showSettings ? (
                /* ── Main View ────────────────────────────────────────── */
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#0eaa99]/10 flex items-center justify-center text-[#0eaa99] shadow-inner">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 tracking-tight text-lg italic">Privacy Guard</h4>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Security Perimeter</p>
                    </div>
                    <button 
                      onClick={() => setIsVisible(false)}
                      className="ml-auto w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 hover:text-slate-500 hover:bg-slate-100 transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-[13px] text-slate-500 font-medium leading-relaxed mb-8">
                    We use cookies to enhance your global property search and ensure secure transactions. 
                    Read our <Link href="/privacy" className="text-[#0eaa99] hover:underline font-bold italic">Privacy Policy</Link> for details.
                  </p>

                  <div className="flex flex-col gap-3">
                    <div className="flex gap-3">
                      <button
                        onClick={handleAcceptAll}
                        className="flex-1 py-4 bg-slate-950 hover:bg-[#0eaa99] text-white text-[11px] font-black uppercase tracking-[0.15em] rounded-2xl transition-all duration-300 shadow-xl shadow-slate-950/20 active:scale-[0.98] cursor-pointer"
                      >
                        Accept All
                      </button>
                      <button
                        onClick={handleRejectAll}
                        className="flex-1 py-4 bg-white border border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-100 hover:bg-rose-50/30 text-[11px] font-black uppercase tracking-[0.15em] rounded-2xl transition-all duration-300 active:scale-[0.98] cursor-pointer"
                      >
                        Reject
                      </button>
                    </div>
                    <button
                      onClick={() => setShowSettings(true)}
                      className="w-full py-3.5 bg-slate-50 hover:bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group/btn"
                    >
                      <SettingsIcon className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform duration-500" />
                      Customize Settings
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* ── Settings View ─────────────────────────────────────── */
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <button 
                      onClick={() => setShowSettings(false)}
                      className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all"
                    >
                      <ChevronRight className="w-4 h-4 rotate-180" />
                    </button>
                    <h4 className="font-black text-slate-900 tracking-tight italic">Privacy Settings</h4>
                  </div>

                  <div className="space-y-4 mb-8">
                    {/* Necessary */}
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
                      <div className="w-5 h-5 rounded-md bg-[#0eaa99] flex items-center justify-center text-white mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-black text-slate-900 uppercase tracking-widest mb-1">Essential</p>
                        <p className="text-[11px] text-slate-400 font-medium leading-tight">Required for secure authentication and core platform functions.</p>
                      </div>
                    </div>

                    {/* Analytics */}
                    <label className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-100 hover:border-[#0eaa99]/30 transition-all cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={preferences.analytics}
                        onChange={(e) => setPreferences(prev => ({ ...prev, analytics: e.target.checked }))}
                        className="w-5 h-5 rounded-md accent-[#0eaa99] mt-0.5"
                      />
                      <div className="flex-1">
                        <p className="text-xs font-black text-slate-900 uppercase tracking-widest mb-1">Analytics</p>
                        <p className="text-[11px] text-slate-400 font-medium leading-tight">Helps us optimize the global property discovery experience.</p>
                      </div>
                    </label>

                    {/* Marketing */}
                    <label className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-100 hover:border-[#0eaa99]/30 transition-all cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={preferences.marketing}
                        onChange={(e) => setPreferences(prev => ({ ...prev, marketing: e.target.checked }))}
                        className="w-5 h-5 rounded-md accent-[#0eaa99] mt-0.5"
                      />
                      <div className="flex-1">
                        <p className="text-xs font-black text-slate-900 uppercase tracking-widest mb-1">Marketing</p>
                        <p className="text-[11px] text-slate-400 font-medium leading-tight">Enables personalized global alerts and curated recommendations.</p>
                      </div>
                    </label>
                  </div>

                  <button
                    onClick={() => handleSave(preferences)}
                    className="w-full py-4 bg-slate-950 hover:bg-[#0eaa99] text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl transition-all duration-300 shadow-xl active:scale-[0.98] cursor-pointer"
                  >
                    Save Preferences
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
