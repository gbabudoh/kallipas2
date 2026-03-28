'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    localStorage.removeItem('kallipas_role')
  }, [])

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setMessage({ type: 'error', text: data.error || 'Login failed. Please try again.' })
        return
      }

      const { roleSlug } = data
      localStorage.setItem('kallipas_role', roleSlug)
      document.cookie = `kallipas_role=${roleSlug}; path=/; max-age=86400; SameSite=Lax`

      setMessage({ type: 'success', text: 'Identity verified. Entering Kallipas Ecosystem...' })
      setTimeout(() => router.push(`/${roleSlug}/dashboard`), 1500)
    } catch {
      setMessage({ type: 'error', text: 'Unable to connect. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#F2EAE0] flex overflow-hidden font-sans relative">
      
      {/* Left Column - High-End Architectural Visual */}
      <div className="hidden lg:block w-1/2 relative h-screen">
        <Image 
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop"
          alt="Luxury Architecture"
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-[#F2EAE0]/10" />
      </div>

      {/* Right Column - Interaction Area */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="w-full max-w-sm"
        >
          {/* Centered Glass Card */}
          <div className="bg-white/70 backdrop-blur-3xl p-10 rounded-[2.5rem] border border-white shadow-[0_40px_100px_-20px_rgba(28,35,18,0.08)] text-[#1c2312]">
            
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

            <div className="text-center mb-8">
               <h2 className="text-3xl font-semibold mb-2 tracking-tight">Welcome Back</h2>
               <p className="text-sm font-medium text-[#1c2312]/50">Log in to your Kallipas profile</p>
            </div>

            <AnimatePresence mode="wait">
              {message && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`text-[10px] font-bold uppercase tracking-widest p-4 rounded-xl mb-6 text-center shadow-sm ${
                    message.type === 'error' ? 'bg-rose-50 text-rose-500 border border-rose-100' : 'bg-[#0eab9b]/10 text-[#0eab9b] border border-[#0eab9b]/20'
                  }`}
                >
                  {message.text}
                </motion.div>
              )}
            </AnimatePresence>

            <form className="space-y-4" onSubmit={handleSignIn}>
              <div className="space-y-1">
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1c2312]/20 group-focus-within:text-[#0eab9b] transition-colors cursor-pointer" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Email Address"
                    className="w-full bg-white/40 border border-[#1c2312]/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-[#0eab9b] focus:bg-white/80 transition-all placeholder-[#1c2312]/20 font-medium shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1c2312]/20 group-focus-within:text-[#0eab9b] transition-colors cursor-pointer" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Password"
                    className="w-full bg-white/40 border border-[#1c2312]/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-[#0eab9b] focus:bg-white/80 transition-all placeholder-[#1c2312]/20 font-medium shadow-sm"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0eab9b] hover:bg-[#0ca191] text-white font-bold py-4 rounded-xl transition-all shadow-xl shadow-[#0eab9b]/20 flex items-center justify-center gap-2 group active:scale-[0.98] cursor-pointer"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-[#1c2312]/30 px-1">
              <Link href="#" className="hover:text-[#0eab9b] transition-colors cursor-pointer">Forgot Password?</Link>
              <Link href="/register" className="hover:text-[#0eab9b] transition-colors cursor-pointer">Create Account</Link>
            </div>

            <div className="mt-12 text-center pt-8 border-t border-[#1c2312]/5">
               <p className="text-[10px] font-bold tracking-widest items-center gap-2 flex justify-center uppercase">
                  <span className="text-[#1c2312]/30">New to Kallipas? Join Us</span>
                  <Link href="/register" className="text-[#0eab9b] hover:underline cursor-pointer">Create Account</Link>
               </p>
            </div>
          </div>
          
          <div className="mt-12 flex justify-center">
             <Link href="/" className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#1c2312]/20 hover:text-[#0eab9b] transition-all flex items-center gap-2 group cursor-pointer">
                <ArrowRight className="w-3 h-3 rotate-180 group-hover:-translate-x-1 transition-transform cursor-pointer" /> Return Home
             </Link>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
