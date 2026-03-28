import prisma from '@/lib/prisma'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getServerT } from '@/lib/i18n/server'
import { 
  PlusSquare,
  TrendingUp,
  Users,
  Eye,
  Globe,
  Briefcase,
  Key,
  Home,
  Building,
  Scale,
  Map,
  FileText,
  Heart,
  CalendarDays,
  Search,
} from 'lucide-react'

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

export default async function DashboardPage({ params }: { params: Promise<{ role: string }> }) {
  const { role } = await params
  const username = ROLE_TO_SEED_USER[role]

  if (!username) {
    redirect('/dashboard')
  }

  const [profile, t] = await Promise.all([
    prisma.profile.findUnique({ where: { username } }),
    getServerT(),
  ])
  const s = t.dashboard.stats

  const getRoleStats = () => {
    switch (role) {
      case 'surveyor':
        return [
          { label: s.pendingInspections, value: '4', icon: Map, trend: '+1 New' },
          { label: s.completedReports, value: '128', icon: FileText, trend: '+12%' },
          { label: s.clientRating, value: '4.9', icon: TrendingUp, trend: 'Top 5%' },
          { label: s.profileViews, value: '342', icon: Eye, trend: '+8%' },
        ]
      case 'legal-agent':
        return [
          { label: s.activeContracts, value: '12', icon: FileText, trend: '+3' },
          { label: s.escrowHoldings, value: '$1.4M', icon: Scale, trend: '+5%' },
          { label: s.clientQueries, value: '8', icon: Users, trend: '-2' },
          { label: s.successRate, value: '99%', icon: TrendingUp, trend: 'High' },
        ]
      case 'property-manager':
      case 'letting-agent':
        return [
          { label: s.managedProperties, value: '45', icon: Building, trend: '+2' },
          { label: s.activeTenants, value: '112', icon: Users, trend: '+5' },
          { label: s.maintenanceIssues, value: '3', icon: Home, trend: '-1' },
          { label: s.occupancyRate, value: '96%', icon: TrendingUp, trend: '+2%' },
        ]
      case 'private-landlord':
        return [
          { label: s.ownedProperties, value: '4', icon: Key, trend: '0' },
          { label: s.totalEnquiries, value: '28', icon: Users, trend: '+12' },
          { label: s.monthlyYield, value: '+$8.2k', icon: TrendingUp, trend: '+4%' },
          { label: s.listingViews, value: '1,204', icon: Eye, trend: '+15%' },
        ]
      case 'agency-agent':
      case 'independent-realtor':
        return [
          { label: s.activeListings, value: '18', icon: PlusSquare, trend: '+4' },
          { label: s.clientLeadsCount, value: '42', icon: Users, trend: '+18%' },
          { label: s.closingRate, value: '8.4%', icon: Briefcase, trend: '+1.2%' },
          { label: s.totalSalesVol, value: '$4.2M', icon: TrendingUp, trend: 'Top 10%' },
        ]
      case 'buyer':
        return [
          { label: s.savedPropertiesCount, value: '12', icon: Heart, trend: '+3' },
          { label: s.activeEnquiries, value: '5', icon: Search, trend: '+2' },
          { label: s.viewingsBooked, value: '3', icon: CalendarDays, trend: 'This Week' },
          { label: s.budgetTracked, value: '$680k', icon: TrendingUp, trend: 'On Target' },
        ]
      default: // private-seller
        return [
          { label: s.activeListings, value: '1', icon: PlusSquare, trend: 'New' },
          { label: s.listingViews, value: '842', icon: Eye, trend: '+24%' },
          { label: s.totalEnquiries, value: '12', icon: Users, trend: '+3' },
          { label: s.clientRating, value: String(profile?.trustScore ?? '10'), icon: TrendingUp, trend: 'Global Avg' },
        ]
    }
  }

  const stats = getRoleStats()

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-1000">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h1 className="text-5xl font-black tracking-tight text-slate-900 mb-3 italic">
            {t.dashboard.welcomeBack} <span className="text-[#0eaa99] italic drop-shadow-sm">{profile?.fullName || 'User'}</span>
          </h1>
          <div className="flex items-center gap-4">
            <span className="px-4 py-1.5 rounded-full bg-[#0eaa99]/10 text-[#0eaa99] text-[10px] font-black uppercase tracking-[0.3em] border border-[#0eaa99]/20 shadow-sm">
              {role.replace('-', ' ')}
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#0eaa99] animate-pulse" />
            <span className="text-slate-400 text-xs font-black uppercase tracking-widest">{t.dashboard.networkActive}</span>
          </div>
        </div>
        
        {/* Dynamic CTA based on role */}
        {(role === 'private-seller' || role === 'independent-realtor' || role === 'agency-agent' || role === 'private-landlord') && (
          <Link 
            href={`/${role}/dashboard/listings/new`}
            className="flex items-center gap-3 px-10 py-5 bg-[#0eaa99] hover:bg-[#0c9485] text-white font-black rounded-3xl transition-all shadow-2xl shadow-[#0eaa99]/30 hover:shadow-[#0eaa99]/50 hover:scale-[1.05] active:scale-95 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <PlusSquare className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500 relative z-10" />
            <span className="text-lg tracking-tighter relative z-10">{t.dashboard.createNewListing}</span>
          </Link>
        )}
      </div>

      {/* Verification Banner - Enhanced */}
      {!profile?.isVerified && (
        <div className="glass-card p-12 border-[#0eaa99]/20 bg-gradient-to-br from-white via-white to-[#0eaa99]/5 flex flex-col md:flex-row items-center justify-between rounded-[3rem] relative overflow-hidden group shadow-2xl shadow-gray-200/50">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#0eaa99]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[80px] pointer-events-none" />
          
          <div className="flex items-center gap-10 relative z-10">
            <div className="w-24 h-24 rounded-[2.5rem] bg-white shadow-2xl shadow-[#0eaa99]/10 flex items-center justify-center text-[#0eaa99] border border-slate-50 transition-all duration-700 group-hover:rotate-6 group-hover:scale-110">
              <Globe className="w-12 h-12" />
            </div>
            <div>
              <h4 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">{t.dashboard.elevateTitle}</h4>
              <p className="text-slate-500 text-lg font-medium max-w-lg leading-relaxed">{t.dashboard.elevateDesc}</p>
            </div>
          </div>
          <button className="mt-8 md:mt-0 px-12 py-5 bg-slate-950 text-white font-black rounded-[2rem] hover:bg-slate-900 transition-all shadow-2xl hover:shadow-slate-300 active:scale-95 relative z-10 uppercase tracking-widest text-xs">
            {t.dashboard.startVerification}
          </button>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-card p-10 rounded-[2.5rem] border-white/60 hover:border-[#0eaa99]/40 transition-all duration-500 group overflow-hidden relative shadow-xl hover:shadow-2xl hover:shadow-[#0eaa99]/10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[4rem] -translate-y-4 translate-x-4 transition-transform group-hover:scale-125 duration-700 pointer-events-none" />
            
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="w-16 h-16 rounded-[1.5rem] bg-white shadow-md flex items-center justify-center text-[#0eaa99] group-hover:bg-[#0eaa99] group-hover:text-white transition-all duration-700">
                <stat.icon className="w-8 h-8" />
              </div>
              <span className={`text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border shadow-sm ${
                stat.trend.startsWith('-') ? 'bg-rose-50 text-rose-500 border-rose-100' : 'bg-[#0eaa99]/10 text-[#0eaa99] border-[#0eaa99]/20'
              }`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 mb-1 font-black uppercase tracking-[0.2em]">{stat.label}</p>
            <h3 className="text-4xl font-black tracking-tighter text-slate-950">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 glass-card rounded-[3rem] p-12 border-white/60">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-3xl font-black tracking-tighter text-slate-950 italic">{t.dashboard.globalPulse}</h3>
            <button className="px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#0eaa99] hover:bg-[#0eaa99]/10 transition-all border border-transparent hover:border-[#0eaa99]/20 active:scale-95 shadow-sm">{t.dashboard.auditLogs}</button>
          </div>
          <div className="space-y-8">
             <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center mb-8 shadow-inner">
                  <Briefcase className="w-12 h-12 text-slate-200" />
                </div>
                <p className="text-slate-400 font-bold italic text-lg leading-relaxed">{t.dashboard.globalSynced}<br/><span className="text-[10px] font-black uppercase tracking-widest opacity-60">{t.dashboard.zeroNotifications}</span></p>
             </div>
          </div>
        </div>

        <div className="glass-card rounded-[3rem] p-12 bg-gradient-to-b from-white via-white to-slate-50/30 border-white/60">
          <h3 className="text-3xl font-black tracking-tighter text-slate-950 italic mb-12">{t.dashboard.trustMetrics}</h3>
          <div className="space-y-10">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">{t.dashboard.liquidatorRating}</span>
              <span className={profile?.isVerified ? 'text-[#0eaa99] font-black uppercase text-[10px] tracking-widest' : 'text-orange-500 text-[10px] font-black uppercase tracking-widest'}>
                {profile?.isVerified ? t.dashboard.verifiedPartner : t.dashboard.identityPending}
              </span>
            </div>

            <div className="relative pt-2">
              <div className="flex mb-3 items-center justify-between">
                <div>
                  <span className="text-[10px] font-black inline-block py-2 px-4 uppercase rounded-full text-[#0eaa99] bg-[#0eaa99]/10 border border-[#0eaa99]/20 shadow-sm">
                    {t.dashboard.workspacePrecision}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black inline-block text-[#0eaa99] tracking-tighter">
                    {(profile?.trustScore ?? 1) * 20}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-4 mb-6 flex rounded-full bg-slate-100 shadow-inner p-1">
                <div 
                  style={{ width: `${(profile?.trustScore ?? 1) * 20}%` }}
                  className="shadow-xl flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#0eaa99] rounded-full transition-all duration-1000 ease-out"
                ></div>
              </div>
            </div>

            <p className="text-base text-slate-500 leading-relaxed font-bold italic border-l-4 border-[#0eaa99]/20 pl-6">
                {['realtor', 'agent', 'manager', 'legal', 'surveyor'].some(k => role.includes(k)) 
                  ? 'High precision scores ensure top priority in the global search perimeter.' 
                  : 'Establish absolute trust for faster, high-value asset liquidations.'}
            </p>
            
            {!profile?.isVerified && (
                <button className="w-full py-5 rounded-[1.5rem] bg-white border border-slate-100 shadow-2xl shadow-gray-200/50 hover:shadow-teal-brand/10 hover:border-[#0eaa99]/20 transition-all text-xs font-black uppercase tracking-widest text-[#0eaa99] mt-6 active:scale-95">
                    {t.dashboard.identityProtocol}
                </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

