import Link from 'next/link'
import Image from 'next/image'
import prisma from '@/lib/prisma'
import { getServerT } from '@/lib/i18n/server'
import {
  BarChart3,
  Home,
  PlusSquare,
  MessageSquare,
  Video,
  Settings,
  Globe,
  User as UserIcon,
  Users,
  Building,
  Scale,
  Map,
  FileText,
  ArrowRight,
  Inbox,
  ChevronRight,
  Search,
  Heart,
  CalendarDays,
} from 'lucide-react'
import { redirect } from 'next/navigation'
import LogoutButton from '@/components/dashboard/logout-button'
import DashboardLangSwitcher from '@/components/dashboard/lang-switcher'
import type { Dict } from '@/lib/i18n'

const ROLE_TO_SEED_USER: Record<string, string> = {
  'private-seller': 'demo_seller',
  'independent-realtor': 'demo_realtor',
  'agency-agent': 'demo_agency',
  'private-landlord': 'demo_landlord',
  'property-manager': 'demo_manager',
  'letting-agent': 'demo_letting',
  'legal-agent': 'demo_legal',
  'surveyor': 'demo_surveyor',
  'buyer': 'demo_buyer',
}

const getRoleNavItems = (roleSlug: string, d: Dict['dashboard']) => {
  const basePrefix = `/${roleSlug}/dashboard`

  const commonNav = [
    { label: d.overview, icon: BarChart3, href: `${basePrefix}` },
    { label: d.messages, icon: MessageSquare, href: `${basePrefix}/messages` },
    { label: d.mailbox, icon: Inbox, href: `${basePrefix}/mailbox` },
  ]

  switch (roleSlug) {
    case 'surveyor':
      return [
        commonNav[0],
        { label: d.inspections, icon: Map, href: `${basePrefix}/inspections` },
        { label: d.valuationReports, icon: FileText, href: `${basePrefix}/reports` },
        commonNav[1],
        commonNav[2],
      ]
    case 'legal-agent':
      return [
        commonNav[0],
        { label: d.contracts, icon: FileText, href: `${basePrefix}/contracts` },
        { label: d.escrow, icon: Scale, href: `${basePrefix}/escrow` },
        commonNav[1],
        commonNav[2],
      ]
    case 'property-manager':
    case 'letting-agent':
    case 'private-landlord':
      return [
        commonNav[0],
        { label: d.properties, icon: Building, href: `${basePrefix}/properties` },
        { label: d.tenantApps, icon: Users, href: `${basePrefix}/applications` },
        { label: d.maintenance, icon: Settings, href: `${basePrefix}/maintenance` },
        commonNav[1],
        commonNav[2],
      ]
    case 'agency-agent':
    case 'independent-realtor':
      return [
        commonNav[0],
        { label: d.myListings, icon: Home, href: `${basePrefix}/listings` },
        { label: d.clientLeads, icon: Users, href: `${basePrefix}/leads` },
        { label: d.createListing, icon: PlusSquare, href: `${basePrefix}/listings/new` },
        commonNav[1],
        commonNav[2],
        { label: d.videoTours, icon: Video, href: `${basePrefix}/video-calls` },
      ]
    case 'buyer':
      return [
        commonNav[0],
        { label: d.browseProperties, icon: Search, href: `${basePrefix}/listings` },
        { label: d.savedProperties, icon: Heart, href: `${basePrefix}/saved` },
        { label: d.myEnquiries, icon: FileText, href: `${basePrefix}/enquiries` },
        { label: d.viewings, icon: CalendarDays, href: `${basePrefix}/viewings` },
        commonNav[1],
        commonNav[2],
      ]
    default: // private-seller
      return [
        commonNav[0],
        { label: d.myListing, icon: Home, href: `${basePrefix}/listings` },
        { label: d.createListing, icon: PlusSquare, href: `${basePrefix}/listings/new` },
        commonNav[1],
        commonNav[2],
      ]
  }
}

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ role: string }>
}) {
  const { role } = await params
  const username = ROLE_TO_SEED_USER[role]
  
  if (!username) {
    redirect('/dashboard')
  }

  const profile = await prisma.profile.findUnique({
    where: { username }
  })

  const t = await getServerT()
  const navItems = getRoleNavItems(role, t.dashboard)

  return (
    <div className="flex h-screen bg-mesh-gradient text-slate-900 font-sans selection:bg-[#0eaa99]/30">
      {/* Sidebar */}
      <aside className="w-80 premium-sidebar flex flex-col z-20">
        <div className="p-10 border-b border-slate-100 flex items-center justify-center relative group">
           <Link href={['private-seller', 'independent-realtor'].includes(role) ? `/${role}/dashboard` : "/"} className="cursor-pointer">
             <Image 
               src="/logo.png"
               alt="Kallipas Logo"
               width={160}
               height={46}
               priority
               className="w-40 h-auto object-contain transition-transform duration-700 group-hover:scale-110" 
               style={{ width: 'auto', height: 'auto' }}
             />
           </Link>
           <div className="absolute -bottom-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0eaa99]/30 to-transparent" />
        </div>

        <nav className="flex-1 p-8 space-y-2 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-400 relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-0 bg-[#0eaa99] rounded-r-full transition-all duration-500 group-hover:h-3/5" />
              
              <item.icon className="w-5 h-5 text-slate-400 group-hover:text-[#0eaa99] transition-colors relative z-10" />
              <span className="font-bold text-sm text-slate-500 group-hover:text-slate-900 relative z-10 tracking-tight">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-8 mt-auto border-t border-slate-100 space-y-6">
          <div className="flex items-center gap-4 p-5 bg-slate-50/50 rounded-[2rem] border border-slate-100 transition-all hover:border-[#0eaa99]/30">
            <div className="w-12 h-12 rounded-full bg-white relative flex items-center justify-center border border-slate-200 shadow-sm overflow-hidden p-0.5">
              <div className="w-full h-full rounded-full bg-[#0eaa99]/10 flex items-center justify-center overflow-hidden relative">
                {profile?.avatarUrl ? (
                  <Image src={profile.avatarUrl} alt="Avatar" fill sizes="48px" className="object-cover" unoptimized />
                ) : (
                  <UserIcon className="w-7 h-7 text-[#0eaa99]" />
                )}
              </div>
            </div>
            <div className="overflow-hidden">
              <p className="font-black truncate text-sm text-slate-900 tracking-tight">{profile?.fullName || 'Anonymous'}</p>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0eaa99] animate-pulse" />
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">{profile?.role || 'User'}</p>
              </div>
            </div>
          </div>

          {['private-seller', 'independent-realtor'].includes(role) && (
            <Link 
              href="http://localhost:3000/?view=main" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-14 flex items-center justify-center gap-3 bg-[#0eaa99] rounded-[1.5rem] text-sm font-black transition-all text-white hover:bg-[#0eaa99]/90 hover:shadow-2xl hover:shadow-[#0eaa99]/30 group relative overflow-hidden active:scale-95"
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Globe className="w-4 h-4 relative z-10" />
              <span className="relative z-10 tracking-tight">{t.dashboard.mainWebsite}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
            </Link>
          )}

          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative custom-scrollbar flex flex-col">
        <header className="h-24 bg-white/70 backdrop-blur-xl flex items-center justify-between px-12 sticky top-0 z-30 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#0eaa99] shadow-[0_0_15px_rgba(14,170,153,0.5)]" />
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">
              <span>{role.replace('-', ' ')}</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-slate-900">{t.dashboard.liveWorkspace}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            <DashboardLangSwitcher />
            <div className="w-px h-8 bg-slate-100" />
            <Settings className="w-6 h-6 text-slate-300 cursor-pointer hover:text-slate-900 transition-all hover:rotate-90 duration-500" />
          </div>
        </header>

        <div className="max-w-7xl w-full mx-auto p-12">
          {children}
        </div>
      </main>
    </div>
  )
}
