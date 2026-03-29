'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, MoreHorizontal,
  BarChart3, Home, PlusSquare, MessageSquare, Video,
  Settings, Users, Building, Scale, Map, FileText,
  Inbox, Search, Heart, CalendarDays, User as UserIcon,
  Bell,
} from 'lucide-react'
import HomeButton from './home-button'
import LogoutButton from './logout-button'
import DashboardLangSwitcher from './lang-switcher'

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  BarChart3, Home, PlusSquare, MessageSquare, Video, Settings,
  Users, Building, Scale, Map, FileText, Inbox, Search, Heart, CalendarDays,
}

export type SerializableNavItem = { label: string; href: string; iconName: string }

type Profile = { fullName: string | null; avatarUrl: string | null; role: string | null }

export default function MobileDashboardNav({
  navItems,
  role,
  profile,
  mainWebsiteLabel,
}: {
  navItems: SerializableNavItem[]
  role: string
  profile: Profile | null
  mainWebsiteLabel: string
}) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const bottomTabs = navItems.slice(0, 4)

  return (
    <>
      {/* ── Mobile Top Bar (Native Action Bar) ───────────────────── */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 h-16 bg-white/80 backdrop-blur-2xl border-b border-slate-100/50 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#0eaa99]/10 flex items-center justify-center overflow-hidden border border-[#0eaa99]/20 shadow-sm">
            {profile?.avatarUrl ? (
              <Image src={profile.avatarUrl} alt="Me" width={32} height={32} className="object-cover" unoptimized />
            ) : (
              <UserIcon className="w-4 h-4 text-[#0eaa99]" />
            )}
          </div>
          <div className="flex flex-col -space-y-0.5">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0eaa99]/60">
              {role.replace(/-/g, ' ')}
            </span>
            <span className="text-xs font-bold text-slate-900 truncate max-w-[120px]">
              {profile?.fullName || 'Dashboard'}
            </span>
          </div>
        </div>

        <Link href="/" className="absolute left-1/2 -translate-x-1/2 hover:opacity-80 transition-opacity">
          <Image src="/logo.png" alt="Kallipas" width={80} height={24} priority className="h-6 w-auto object-contain" />
        </Link>

        <div className="flex items-center gap-2">
          <button className="relative w-10 h-10 rounded-full flex items-center justify-center bg-slate-50 border border-slate-100 text-slate-400 hover:text-[#0eaa99] transition-all active:scale-95">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#0eaa99] rounded-full border-2 border-white shadow-sm" />
          </button>
        </div>
      </header>

      {/* ── Drawer Backdrop ────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="md:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 px-4"
          />
        )}
      </AnimatePresence>

      {/* ── Native Slide Drawer ────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="md:hidden fixed top-0 right-0 h-full w-[85%] bg-white z-[60] flex flex-col shadow-[-20px_0_60px_-15px_rgba(0,0,0,0.1)] rounded-l-[2.5rem] overflow-hidden"
          >
            {/* Drawer header */}
            <div className="p-8 pb-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#0eaa99]/10 flex items-center justify-center border border-[#0eaa99]/20 shadow-premium">
                  {profile?.avatarUrl ? (
                    <Image src={profile.avatarUrl} alt="Me" fill className="object-cover rounded-2xl p-1" unoptimized />
                  ) : (
                    <UserIcon className="w-6 h-6 text-[#0eaa99]" />
                  )}
                </div>
                <div>
                  <h3 className="font-black text-lg text-slate-900 tracking-tight">{profile?.fullName || 'Anonymous'}</h3>
                  <p className="text-[10px] text-[#0eaa99] font-black uppercase tracking-[0.2em]">{profile?.role || 'Guest'}</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 text-slate-400 active:scale-90 transition-transform"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Nav Area */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2 custom-scrollbar">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 pb-2 pl-2">All Sections</div>
              {navItems.map((item) => {
                const Icon = ICON_MAP[item.iconName] ?? BarChart3
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${
                      isActive
                        ? 'bg-[#0eaa99]/10 text-[#0eaa99] shadow-[0_10px_30px_-10px_rgba(14,170,153,0.15)]'
                        : 'text-slate-500 hover:bg-slate-50 active:scale-[0.98]'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-[#0eaa99]' : 'text-slate-400'}`} />
                    <span className="font-bold text-sm">{item.label}</span>
                    {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#0eaa99] shadow-[0_0_10px_rgba(14,170,153,0.5)]" />}
                  </Link>
                )
              })}
            </div>

            {/* Bottom Actions */}
            <div className="p-8 pt-4 border-t border-slate-50 space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-xs font-bold text-slate-500">Quick Settings</span>
                <DashboardLangSwitcher />
              </div>
              <HomeButton label={mainWebsiteLabel} />
              <LogoutButton />
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ── Premium Floating Bottom Tab Bar ────────────────── */}
      <nav className="md:hidden fixed bottom-6 left-6 right-6 z-[9999]">
        <div className="bg-white/95 backdrop-blur-2xl border border-slate-200/80 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.18)] rounded-[2rem] flex items-stretch h-[4.5rem] px-2 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0eaa99]/40 to-transparent" />
          
          {bottomTabs.map((item) => {
            const Icon = ICON_MAP[item.iconName] ?? BarChart3
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex-1 flex flex-col items-center justify-center gap-1.5 relative transition-all duration-300 ${
                  isActive ? 'text-[#0eaa99]' : 'text-slate-400 active:scale-90 hover:text-slate-600'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabMobile"
                    className="absolute inset-x-2 inset-y-2 bg-[#0eaa99]/10 rounded-2.5xl -z-10"
                    transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
                  />
                )}
                <Icon className={`w-6 h-6 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`} />
                <span className={`text-[10px] font-black uppercase tracking-tighter leading-none transition-all ${isActive ? 'opacity-100 scale-100' : 'opacity-60 scale-95'}`}>
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="indicator"
                    className="absolute -bottom-1 w-1.5 h-1.5 bg-[#0eaa99] rounded-full shadow-[0_0_10px_rgba(14,170,153,0.5)]"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            )
          })}

          {/* Native-style 'More' trigger */}
          <button
            onClick={() => setOpen(true)}
            className="flex-1 flex flex-col items-center justify-center gap-1.5 text-slate-400 active:scale-95 transition-all"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <MoreHorizontal className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-tighter leading-none opacity-60">
              Menu
            </span>
          </button>
        </div>
      </nav>
    </>
  )
}
