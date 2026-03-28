'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Loader2, ArrowRight, User, Phone, Briefcase, Users, Home, Building, Key, Scale, Map, Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useT } from '@/context/language-context'

const ACCOUNT_TYPES = [
  { value: 'PRIVATE_SELLER', label: 'Private Seller', icon: User },
  { value: 'INDEPENDENT_REALTOR', label: 'Independent Realtor / Agent', icon: Briefcase },
  { value: 'AGENCY_AGENT', label: 'Agency Agents', icon: Users },
  { value: 'PRIVATE_LANDLORD', label: 'Private Landlord', icon: Key },
  { value: 'PROPERTY_MANAGER', label: 'Property Manager', icon: Home },
  { value: 'LETTING_AGENT', label: 'Letting Agent', icon: Building },
  { value: 'LEGAL_AGENT', label: 'Legal (Attorney/Solicitor/Lawyer)', icon: Scale },
  { value: 'SURVEYOR', label: 'Surveyor', icon: Map },
  { value: 'BUYER', label: 'Buyer', icon: Search },
]

export default function RegisterPage() {
  const t = useT()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [accountType, setAccountType] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null)
  const [step, setStep] = useState(1) // Step 1: Basics, Step 2: Verification (Legal only)
  
  // Verification Fields (Legal Agent only)
  const [identityType, setIdentityType] = useState('PASSPORT')
  const [identityDocUrl, setIdentityDocUrl] = useState('')
  const [legalCredentialUrl, setLegalCredentialUrl] = useState('')
  
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // If Legal Agent and on step 1, move to step 2 instead of submitting
    if (accountType === 'LEGAL_AGENT' && step === 1) {
      setStep(2)
      return
    }

    setLoading(true)
    setMessage(null)

    if (!accountType) {
      setMessage({ type: 'error', text: t.register.errorNoType })
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          fullName, 
          email, 
          phone, 
          password, 
          role: accountType,
          identityType: accountType === 'LEGAL_AGENT' ? identityType : null,
          identityDocUrl: accountType === 'LEGAL_AGENT' ? identityDocUrl : null,
          legalCredentialUrl: accountType === 'LEGAL_AGENT' ? legalCredentialUrl : null
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setMessage({ type: 'error', text: data.error || t.register.errorDefault })
        setLoading(false)
        return
      }

      setMessage({ type: 'success', text: accountType === 'LEGAL_AGENT' ? t.register.legalSuccessMsg : t.register.successMsg })
      
      // Synchronize to cookie for middleware detection
      if (typeof window !== 'undefined') {
        const roleSlug = accountType.toLowerCase().replace('_', '-')
        document.cookie = `kallipas_role=${roleSlug}; path=/; max-age=86400; SameSite=Lax`
      }

      setTimeout(() => router.push('/login'), 2000)
    } catch {
      setMessage({ type: 'error', text: 'Network error. Please check your connection.' })
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#F2EAE0] flex overflow-hidden font-sans">
      
      {/* Left Column - Architectural Visual */}
      <div className="hidden lg:block w-1/3 relative h-screen">
        <Image 
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop"
          alt="Architecture"
          fill
          priority
          sizes="33vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-[#F2EAE0]/10" />
      </div>

      {/* Right Column */}
      <div className="w-full lg:w-2/3 flex items-center justify-center p-8 overflow-y-auto bg-white/30 backdrop-blur-sm">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="w-full max-w-2xl py-8"
        >
          <div className="bg-white/80 backdrop-blur-3xl p-10 rounded-[2.5rem] border border-white shadow-[0_40px_100px_-20px_rgba(28,35,18,0.08)] text-[#1c2312]">
            
            {/* Steps HUD */}
            <div className="flex items-center gap-4 mb-12 justify-center">
              <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-[#0eab9b]' : 'bg-slate-100'}`} />
              {accountType === 'LEGAL_AGENT' && (
                <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-[#0eab9b]' : 'bg-slate-100'}`} />
              )}
            </div>

            {/* Logo */}
            <div className="flex justify-center mb-8">
              <Link href="/" className="cursor-pointer">
                <Image 
                  src="/logo.png"
                  alt="Kallipas Logo"
                  width={160}
                  height={48}
                  priority
                  className="object-contain"
                  style={{ width: 'auto', height: 'auto' }}
                />
              </Link>
            </div>

            <div className="text-center mb-10">
               <h2 className="text-3xl font-semibold mb-2 tracking-tight uppercase">
                 {step === 1 ? t.register.createAccount : t.register.legalTitle}
               </h2>
               <p className="text-sm font-medium text-[#1c2312]/50">
                 {step === 1 ? t.register.subtitle : t.register.legalSubtitle}
               </p>
            </div>

            <AnimatePresence mode="wait">
              {message && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`text-[10px] font-bold uppercase tracking-widest p-4 rounded-xl mb-8 text-center shadow-sm ${
                    message.type === 'error' ? 'bg-rose-50 text-rose-500 border border-rose-100' : 'bg-[#0eab9b]/10 text-[#076d62] border border-[#0eab9b]/20'
                  }`}
                >
                  {message.text}
                </motion.div>
              )}
            </AnimatePresence>

            <form className="space-y-8" onSubmit={handleRegister}>
              {step === 1 ? (
                <>
                  {/* Account Type Grid */}
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#1c2312]/40 ml-1">{t.register.selectPillar}</label>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                      {ACCOUNT_TYPES.map((type) => {
                        const isSelected = accountType === type.value
                        return (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() => setAccountType(type.value)}
                            className={`group relative flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                              isSelected 
                                ? 'bg-[#0eab9b] border-[#0eab9b] shadow-lg shadow-[#0eab9b]/20' 
                                : 'bg-white/40 border-[#1c2312]/5 hover:border-[#0eab9b]/30 hover:bg-white/60'
                            }`}
                          >
                            <type.icon className={`w-6 h-6 mb-2 transition-colors ${isSelected ? 'text-white' : 'text-[#1c2312]/40 group-hover:text-[#0eab9b]'}`} />
                            <span className={`text-[10px] font-bold uppercase tracking-tighter text-center leading-tight transition-colors ${isSelected ? 'text-white' : 'text-[#1c2312]/60'}`}>
                              {t.register.accountTypes[type.value as keyof typeof t.register.accountTypes] ?? type.label}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1c2312]/20 group-focus-within:text-[#0eab9b] transition-colors cursor-pointer" />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        placeholder={t.register.fullName}
                        className="w-full bg-white/40 border border-[#1c2312]/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-[#0eab9b] focus:bg-white/80 transition-all placeholder-[#1c2312]/20 font-medium"
                      />
                    </div>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1c2312]/20 group-focus-within:text-[#0eab9b] transition-colors cursor-pointer" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder={t.register.email}
                        className="w-full bg-white/40 border border-[#1c2312]/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-[#0eab9b] focus:bg-white/80 transition-all placeholder-[#1c2312]/20 font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1c2312]/20 group-focus-within:text-[#0eab9b] transition-colors cursor-pointer" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={t.register.phone}
                        className="w-full bg-white/40 border border-[#1c2312]/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-[#0eab9b] focus:bg-white/80 transition-all placeholder-[#1c2312]/20 font-medium"
                      />
                    </div>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1c2312]/20 group-focus-within:text-[#0eab9b] transition-colors cursor-pointer" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={8}
                        placeholder={t.register.password}
                        className="w-full bg-white/40 border border-[#1c2312]/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-[#0eab9b] focus:bg-white/80 transition-all placeholder-[#1c2312]/20 font-medium"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#1c2312]/40 ml-1">{t.register.identitySelection}</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['PASSPORT', 'SSN', 'NATIONAL_ID'].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setIdentityType(type)}
                          className={`py-3 rounded-xl border text-[10px] font-bold transition-all ${
                            identityType === type 
                              ? 'bg-[#0eab9b] border-[#0eab9b] text-white shadow-lg shadow-[#0eab9b]/20' 
                              : 'bg-white/40 border-[#1c2312]/5 text-[#1c2312]/40 hover:border-[#0eab9b]/30'
                          }`}
                        >
                          {type.replace('_', ' ')}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                     <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#1c2312]/40 ml-1">{t.register.legalCredentials}</label>
                        <input
                          type="text"
                          value={legalCredentialUrl}
                          onChange={(e) => setLegalCredentialUrl(e.target.value)}
                          placeholder={t.register.docPlaceholder}
                          className="w-full mt-2 bg-white/40 border border-[#1c2312]/10 rounded-xl py-4 px-4 text-sm focus:outline-none focus:border-[#0eab9b] transition-all placeholder-[#1c2312]/20 font-medium"
                        />
                     </div>
                     <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#1c2312]/40 ml-1">{t.register.personIdentity}</label>
                        <input
                          type="text"
                          value={identityDocUrl}
                          onChange={(e) => setIdentityDocUrl(e.target.value)}
                          placeholder={t.register.idPlaceholder}
                          className="w-full mt-2 bg-white/40 border border-[#1c2312]/10 rounded-xl py-4 px-4 text-sm focus:outline-none focus:border-[#0eab9b] transition-all placeholder-[#1c2312]/20 font-medium"
                        />
                     </div>
                  </div>
                  
                  <button 
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-[10px] font-bold uppercase tracking-widest text-[#1c2312]/30 hover:text-[#0eab9b] transition-colors"
                  >
                    {t.register.backToPillar}
                  </button>
                </motion.div>
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0eab9b] hover:bg-[#0ca191] text-white font-bold py-4 rounded-xl transition-all shadow-xl shadow-[#0eab9b]/20 flex items-center justify-center gap-2 group active:scale-[0.98] cursor-pointer"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                    <>
                      <span>{accountType === 'LEGAL_AGENT' && step === 1 ? t.register.verifyProfessional : t.register.completeOnboarding}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-10 text-center pt-8 border-t border-[#1c2312]/5">
               <p className="text-[10px] font-bold tracking-widest items-center gap-2 flex justify-center uppercase">
                  <span className="text-[#1c2312]/30">{t.register.alreadyHaveAccount}</span>
                  <Link href="/login" className="text-[#0eab9b] hover:underline cursor-pointer">{t.register.signIn}</Link>
               </p>
            </div>
          </div>
          
          <div className="mt-12 flex justify-center">
             <Link href="/" className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#1c2312]/20 hover:text-[#0eab9b] transition-all flex items-center gap-2 group cursor-pointer">
                <ArrowRight className="w-3 h-3 rotate-180 group-hover:-translate-x-1 transition-transform cursor-pointer" /> {t.register.returnHome}
             </Link>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
