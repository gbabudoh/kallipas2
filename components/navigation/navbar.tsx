'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Globe, Menu, X, ChevronDown, User, Users, Home, Building, Briefcase, Key, Scale, Map, ExternalLink, Search, Sparkles, LayoutDashboard, MoreHorizontal } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'
import { SUPPORTED_LANGUAGES } from '@/lib/translate'
import { useLang, useT } from '@/context/language-context'

const ACCOUNT_CATEGORIES = [
  { label: 'Private Sellers', href: '/agents?type=PRIVATE_SELLER', icon: User },
  { label: 'Independent Realtors', href: '/agents?type=INDEPENDENT_REALTOR', icon: Briefcase },
  { label: 'Agency Agents', href: '/agents?type=AGENCY_AGENT', icon: Users },
  { label: 'Private Landlords', href: '/agents?type=PRIVATE_LANDLORD', icon: Key },
  { label: 'Property Managers', href: '/agents?type=Home', icon: Home },
  { label: 'Letting Agents', href: '/agents?type=LETTING_AGENT', icon: Building },
  { label: 'Legal Agents', href: '/agents?type=LEGAL_AGENT', icon: Scale },
  { label: 'Surveyors', href: '/agents?type=SURVEYOR', icon: Map },
  { label: 'Buyers', href: '/agents?type=BUYER', icon: Search },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDirectoryOpen, setIsDirectoryOpen] = useState(false)

  const [isLangOpen, setIsLangOpen] = useState(false)
  const [userRole, setUserRole]     = useState<string | null>(null)
  const { lang: activeLang, setLang } = useLang()
  const t = useT()
  const pathname = usePathname()
  const router   = useRouter()

  const selectLang = (code: string) => {
    setLang(code)
    setIsLangOpen(false)
    if (pathname.startsWith('/listings/')) {
      const params = new URLSearchParams(window.location.search)
      params.set('lang', code)
      router.push(`${pathname}?${params.toString()}`)
    }
  }

  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.code === activeLang) ?? SUPPORTED_LANGUAGES[0]

  useEffect(() => {
    // Sync role from cookie for client-side rendering logic
    const getCookie = (name: string) => {
      const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
      if (match) return match[2]
      return null
    }

    const role = getCookie('kallipas_role') || (typeof window !== 'undefined' ? localStorage.getItem('kallipas_role') : null)
    if (role && role !== userRole) {
      Promise.resolve().then(() => {
        setUserRole(role)
      })
    }
  }, [pathname, userRole])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* High-Visibility Dashboard Banner for Logged-in Users on Public Pages */}
      {userRole && !pathname.startsWith(`/${userRole}/dashboard`) && (
        <div className="bg-[#1c2312] text-white py-2 px-6 flex items-center justify-between border-b border-[#0eab9b]/30">
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-[#0eab9b] animate-pulse" />
             <span className="text-[10px] font-bold uppercase tracking-widest text-[#0eab9b]">
               {t.nav.workspaceActive} • {userRole.replace('-', ' ')}
             </span>
          </div>
          <Link
            href={`/${userRole}/dashboard`}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-[#0eab9b] text-white px-3 py-1 rounded-md hover:bg-[#0ca191] transition-all"
          >
            {t.nav.returnToDashboard} <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      )}

      <nav 
        className={`transition-all duration-300 ${
        isScrolled ? 'py-4 bg-white/80 backdrop-blur-lg border-b border-[#0eab9b]/20 shadow-sm' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
          <Image 
            src="/logo.png"
            alt="Kallipas Logo"
            width={128}
            height={32}
            priority
            className="w-32 h-8 object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/listings" className="text-sm font-medium text-slate-600 hover:text-[#0eab9b] transition-colors">{t.nav.marketplace}</Link>
          
          {/* Sleek Directory Dropdown */}
          <div className="relative group">
            <button 
              onMouseEnter={() => setIsDirectoryOpen(true)}
              onMouseLeave={() => setIsDirectoryOpen(false)}
              className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-[#0eab9b] transition-colors py-2 outline-none"
            >
              {t.nav.directory}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isDirectoryOpen ? 'rotate-180 text-[#0eab9b]' : 'text-slate-400'}`} />
            </button>
            
            <AnimatePresence>
              {isDirectoryOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  onMouseEnter={() => setIsDirectoryOpen(true)}
                  onMouseLeave={() => setIsDirectoryOpen(false)}
                  className="absolute top-[calc(100%-0.25rem)] left-1/2 -translate-x-1/2 w-64 mt-1 p-2 bg-white/95 backdrop-blur-xl border border-slate-200/60 rounded-2xl shadow-xl shadow-[#0eab9b]/5"
                >
                  <div className="flex flex-col gap-1">
                    {ACCOUNT_CATEGORIES.map((cat) => (
                      <Link 
                        key={cat.label} 
                        href={cat.href}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#0eab9b]/10 transition-colors group/item"
                      >
                        <cat.icon className="w-4 h-4 text-slate-400 group-hover/item:text-[#0eab9b] transition-colors" />
                        <span className="text-sm font-medium text-slate-600 group-hover/item:text-slate-900 transition-colors">
                          {cat.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="h-4 w-px bg-slate-200 mx-2" />

          {/* Language selector */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen((o) => !o)}
              onBlur={() => setTimeout(() => setIsLangOpen(false), 150)}
              className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-[#0eab9b] transition-colors py-2 outline-none"
            >
              <Globe className="w-4 h-4" />
              <span>{currentLang.flag}</span>
              <span>{currentLang.code}</span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isLangOpen ? 'rotate-180 text-[#0eab9b]' : 'text-slate-400'}`} />
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  className="absolute top-[calc(100%+4px)] right-0 w-52 bg-white/95 backdrop-blur-xl border border-slate-200/60 rounded-2xl shadow-xl shadow-[#0eab9b]/5 p-2 z-50"
                >
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 px-2.5 py-1.5">{t.nav.language}</p>
                  <div className="flex flex-col gap-0.5 max-h-72 overflow-y-auto">
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => selectLang(lang.code)}
                        className={`flex items-center gap-3 px-2.5 py-2 rounded-xl text-sm font-medium transition-colors text-left w-full ${
                          activeLang === lang.code
                            ? 'bg-[#0eab9b]/10 text-[#0eab9b] font-bold'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        <span className="text-base">{lang.flag}</span>
                        <span className="flex-1">{lang.name}</span>
                        <span className="text-[10px] font-black text-slate-300">{lang.code}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {userRole ? (
            <Link
              href={`/${userRole}/dashboard`}
              className="px-6 py-2.5 rounded-full bg-slate-800 text-white font-bold text-sm hover:bg-slate-700 transition-all shadow-md"
            >
              {t.nav.dashboard}
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm font-bold text-slate-700 hover:text-[#0eab9b] transition-colors">
                {t.nav.signIn}
              </Link>
              <Link
                href="/register"
                className="px-6 py-2.5 rounded-full bg-[#0eab9b] text-white font-bold text-sm hover:bg-[#0ca191] transition-all shadow-lg shadow-[#0eab9b]/20"
              >
                {t.nav.getStarted}
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-slate-800 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-b border-[#0eab9b]/20 overflow-hidden shadow-lg"
          >
            <div className="p-6 flex flex-col gap-6">
              <Link href="/listings" className="text-lg font-medium text-slate-800">{t.nav.marketplace}</Link>

              <div className="flex flex-col gap-2">
                <span className="text-sm font-bold text-[#0eab9b] mb-2">{t.nav.directory}</span>
                <div className="flex flex-col gap-3 pl-4 border-l-2 border-slate-100">
                  {ACCOUNT_CATEGORIES.map((cat) => (
                    <Link key={cat.label} href={cat.href} className="flex items-center gap-3 text-slate-600 hover:text-[#0eab9b]">
                      <cat.icon className="w-4 h-4" />
                      <span className="text-base font-medium">{cat.label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <hr className="border-slate-200" />

              {/* Mobile language picker */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">{t.nav.language}</p>
                <div className="grid grid-cols-2 gap-2">
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { selectLang(lang.code); setIsMobileMenuOpen(false) }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                        activeLang === lang.code
                          ? 'bg-[#0eab9b]/10 text-[#0eab9b] font-bold border border-[#0eab9b]/20'
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-transparent'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span className="truncate">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <hr className="border-slate-200" />
              {userRole ? (
                <Link href={`/${userRole}/dashboard`} className="text-lg font-bold text-[#0eab9b]">{t.nav.dashboard}</Link>
              ) : (
                <>
                  <Link href="/login" className="text-lg font-bold text-slate-800">{t.nav.signIn}</Link>
                  <Link href="/register" className="text-lg font-bold text-[#0eab9b]">{t.nav.getStarted}</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      </nav>
    </header>

    {/* Floating Bottom Nav for Mobile */}
    <nav className="md:hidden fixed bottom-6 left-6 right-6 z-[9999]">
      <div className="bg-white/95 backdrop-blur-2xl border border-slate-200/80 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.18)] rounded-[2rem] flex items-stretch h-[4.5rem] px-2 relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0eab9b]/40 to-transparent" />
        
        <Link href="/" className={`flex-1 flex flex-col items-center justify-center gap-1 transition-all ${pathname === '/' ? 'text-[#0eab9b]' : 'text-slate-400'}`}>
          <Home className="w-6 h-6" />
          <span className="text-[9px] font-black uppercase tracking-tighter">Home</span>
        </Link>

        <Link href="/listings" className={`flex-1 flex flex-col items-center justify-center gap-1 transition-all ${pathname === '/listings' ? 'text-[#0eab9b]' : 'text-slate-400'}`}>
          <Search className="w-6 h-6" />
          <span className="text-[9px] font-black uppercase tracking-tighter">{t.nav.marketplace}</span>
        </Link>

        {userRole ? (
          <Link href={`/${userRole}/dashboard`} className={`flex-1 flex flex-col items-center justify-center gap-1 transition-all ${pathname.includes('/dashboard') ? 'text-[#0eab9b]' : 'text-slate-400'}`}>
            <LayoutDashboard className="w-6 h-6" />
            <span className="text-[9px] font-black uppercase tracking-tighter">Dash</span>
          </Link>
        ) : (
          <>
            <Link href="/login" className={`flex-1 flex flex-col items-center justify-center gap-1 transition-all ${pathname === '/login' ? 'text-[#0eab9b]' : 'text-slate-400'}`}>
              <User className="w-6 h-6" />
              <span className="text-[9px] font-black uppercase tracking-tighter">{t.nav.signIn}</span>
            </Link>
            <Link href="/register" className={`flex-1 flex flex-col items-center justify-center gap-1 transition-all ${pathname === '/register' ? 'text-[#0eab9b]' : 'text-slate-400'}`}>
              <Sparkles className="w-6 h-6" />
              <span className="text-[9px] font-black uppercase tracking-tighter">Join</span>
            </Link>
          </>
        )}

        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`flex-1 flex flex-col items-center justify-center gap-1 transition-all ${isMobileMenuOpen ? 'text-[#0eab9b]' : 'text-slate-400'}`}
        >
          <MoreHorizontal className="w-6 h-6" />
          <span className="text-[9px] font-black uppercase tracking-tighter">Menu</span>
        </button>
      </div>
    </nav>
    </>
  )
}
