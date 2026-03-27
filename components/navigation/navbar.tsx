'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Globe, Menu, X, ChevronDown, User, Users, Home, Building, Briefcase, Key } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const ACCOUNT_CATEGORIES = [
  { label: 'Private Sellers', href: '/agents?type=PRIVATE_SELLER', icon: User },
  { label: 'Independent Realtors', href: '/agents?type=INDEPENDENT_REALTOR', icon: Briefcase },
  { label: 'Agency Agents', href: '/agents?type=AGENCY_AGENT', icon: Users },
  { label: 'Private Landlords', href: '/agents?type=PRIVATE_LANDLORD', icon: Key },
  { label: 'Property Managers', href: '/agents?type=PROPERTY_MANAGER', icon: Home },
  { label: 'Letting Agents', href: '/agents?type=LETTING_AGENT', icon: Building },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDirectoryOpen, setIsDirectoryOpen] = useState(false)

  // TODO: Replace with real auth session check (NextAuth or custom)
  const user = null

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-4 bg-white/70 backdrop-blur-lg border-b border-[#9AB17A]/20 shadow-sm' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#9AB17A] rounded-xl flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-[#9AB17A]/30">
            K
          </div>
          <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-slate-800 to-slate-500 bg-clip-text text-transparent">
            Kallipas
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/listings" className="text-sm font-medium text-slate-600 hover:text-[#9AB17A] transition-colors">Marketplace</Link>
          
          {/* Sleek Directory Dropdown */}
          <div className="relative group">
            <button 
              onMouseEnter={() => setIsDirectoryOpen(true)}
              onMouseLeave={() => setIsDirectoryOpen(false)}
              className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-[#9AB17A] transition-colors py-2 outline-none"
            >
              Directory
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isDirectoryOpen ? 'rotate-180 text-[#9AB17A]' : 'text-slate-400'}`} />
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
                  className="absolute top-[calc(100%-0.25rem)] left-1/2 -translate-x-1/2 w-64 mt-1 p-2 bg-white/95 backdrop-blur-xl border border-slate-200/60 rounded-2xl shadow-xl shadow-[#9AB17A]/5"
                >
                  <div className="flex flex-col gap-1">
                    {ACCOUNT_CATEGORIES.map((cat) => (
                      <Link 
                        key={cat.label} 
                        href={cat.href}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#9AB17A]/10 transition-colors group/item"
                      >
                        <cat.icon className="w-4 h-4 text-slate-400 group-hover/item:text-[#9AB17A] transition-colors" />
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

          <Link href="/verification" className="text-sm font-medium text-slate-600 hover:text-[#9AB17A] transition-colors">Verification</Link>
          
          <div className="h-4 w-px bg-slate-200 mx-2" />
          
          <button className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-[#9AB17A] transition-colors">
            <Globe className="w-4 h-4" />
            EN
          </button>

          {user ? (
            <Link 
              href="/dashboard"
              className="px-6 py-2.5 rounded-full bg-slate-800 text-white font-bold text-sm hover:bg-slate-700 transition-all shadow-md"
            >
              Dashboard
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm font-bold text-slate-700 hover:text-[#9AB17A] transition-colors">
                Sign In
              </Link>
              <Link 
                href="/login?signup=true"
                className="px-6 py-2.5 rounded-full bg-[#9AB17A] text-white font-bold text-sm hover:bg-[#88a068] transition-all shadow-lg shadow-[#9AB17A]/20"
              >
                Get Started
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
            className="md:hidden bg-white/95 backdrop-blur-xl border-b border-[#9AB17A]/20 overflow-hidden shadow-lg"
          >
            <div className="p-6 flex flex-col gap-6">
              <Link href="/listings" className="text-lg font-medium text-slate-800">Marketplace</Link>
              
              <div className="flex flex-col gap-2">
                <span className="text-sm font-bold text-[#9AB17A] mb-2">Directory</span>
                <div className="flex flex-col gap-3 pl-4 border-l-2 border-slate-100">
                  {ACCOUNT_CATEGORIES.map((cat) => (
                    <Link key={cat.label} href={cat.href} className="flex items-center gap-3 text-slate-600 hover:text-[#9AB17A]">
                      <cat.icon className="w-4 h-4" />
                      <span className="text-base font-medium">{cat.label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <Link href="/verification" className="text-lg font-medium text-slate-800">Verification</Link>
              <hr className="border-slate-200" />
              {user ? (
                <Link href="/dashboard" className="text-lg font-bold text-[#9AB17A]">Dashboard</Link>
              ) : (
                <>
                  <Link href="/login" className="text-lg font-bold text-slate-800">Sign In</Link>
                  <Link href="/login?signup=true" className="text-lg font-bold text-[#9AB17A]">Get Started</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
