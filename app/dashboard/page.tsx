import prisma from '@/lib/prisma'
import Link from 'next/link'
import { 
  PlusSquare, 
  TrendingUp, 
  Users, 
  Eye, 
  Globe
} from 'lucide-react'

export default async function DashboardPage() {
  const profile = await prisma.profile.findUnique({
    where: { id: 'dev-user-001' }
  })

  const role = profile?.role || 'private'

  const getRoleStats = () => {
    const baseStats = [
      { label: 'Total Views', value: '1,284', icon: Eye, trend: '+12%' },
      { label: 'Call Requests', value: '0', icon: Users, trend: '0%' },
    ]

    switch (role) {
      case 'realtor':
      case 'agent':
        return [
          { label: 'Managed Listings', value: '12', icon: PlusSquare, trend: '+2' },
          ...baseStats,
          { label: 'Agency Rank', value: '#4', icon: TrendingUp, trend: 'Top 5%' },
        ]
      default:
        return [
          { label: 'Active Listings', value: '1', icon: PlusSquare, trend: 'New' },
          ...baseStats,
          { label: 'Trust Score', value: String(profile?.trustScore ?? '10'), icon: TrendingUp, trend: 'Global Avg' },
        ]
    }
  }

  const stats = getRoleStats()

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {profile?.fullName || 'User'}! 
            <span className="ml-3 text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 uppercase tracking-widest border border-blue-500/20">
              {role}
            </span>
          </h1>
          <p className="text-gray-400">Here&apos;s your specialized global overview for today.</p>
        </div>
        <Link 
          href="/dashboard/listings/new"
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20"
        >
          <PlusSquare className="w-5 h-5" />
          Create New Listing
        </Link>
      </div>

      {/* Verification Banner */}
      {!profile?.isVerified && (
        <div className="glass-card p-6 border-blue-500/20 bg-blue-500/5 flex items-center justify-between rounded-3xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400">
              <Globe className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h4 className="font-bold">Boost Your Global Visibility</h4>
              <p className="text-sm text-gray-400">Verified private sellers get 4x more views and higher trust from international buyers.</p>
            </div>
          </div>
          <button className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg text-sm hover:bg-blue-500 transition-all">
            Get Verified
          </button>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-card p-6 rounded-3xl group hover:border-blue-500/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <stat.icon className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                stat.trend.startsWith('+') ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'
              }`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-1 font-bold italic">{stat.label}</p>
            <h3 className="text-2xl font-bold tracking-tight">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card rounded-3xl p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold italic">Recent Activity</h3>
            <button className="text-sm text-blue-500 font-bold hover:underline">View All</button>
          </div>
          <div className="space-y-6">
             <p className="text-gray-500 text-center py-12 italic">No recent activity found. Start by listing your first property.</p>
          </div>
        </div>

        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-xl font-bold italic mb-8">Trust Profile</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm italic">Status</span>
              <span className={profile?.isVerified ? 'text-green-500 font-bold uppercase text-[10px] tracking-widest' : 'text-yellow-500 text-[10px] font-bold uppercase tracking-widest'}>
                {profile?.isVerified ? 'Verified' : 'Verification Required'}
              </span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-blue-600 transition-all duration-1000" 
                    style={{ width: `${profile?.trustScore ?? 10}%` }}
                ></div>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed italic">
                {role === 'realtor' ? 'Maintain high trust scores to keep your Agency badge.' : 'Complete your verification to reach more buyers globally.'}
            </p>
            {!profile?.isVerified && (
                <button className="w-full py-3 rounded-xl border border-blue-500/30 hover:bg-blue-600/10 hover:border-blue-500 transition-all text-sm font-bold text-blue-400">
                    Start Verification
                </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
