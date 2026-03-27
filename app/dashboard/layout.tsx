import Link from 'next/link'
import prisma from '@/lib/prisma'
import { 
  BarChart3, 
  Home, 
  PlusSquare, 
  MessageSquare, 
  Video, 
  Settings, 
  Globe,
  User as UserIcon
} from 'lucide-react'
import LogoutButton from '@/components/dashboard/logout-button'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // During migration: fetch the dev profile from Prisma
  const profile = await prisma.profile.findUnique({
    where: { id: 'dev-user-001' }
  })

  const navItems = [
    { label: 'Overview', icon: BarChart3, href: '/dashboard' },
    { label: 'My Listings', icon: Home, href: '/dashboard/listings' },
    { label: 'Create Listing', icon: PlusSquare, href: '/dashboard/listings/new' },
    { label: 'Messages', icon: MessageSquare, href: '/dashboard/messages' },
    { label: 'Video Calls', icon: Video, href: '/dashboard/video-calls' },
  ]

  return (
    <div className="flex h-screen bg-[#050505] text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-800 flex flex-col">
        <div className="p-6 border-b border-gray-800 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold">K</div>
          <span className="text-xl font-bold tracking-tight">Kallipas</span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-900 transition-all text-gray-400 hover:text-white group"
            >
              <item.icon className="w-5 h-5 group-hover:text-blue-500" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-xl mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
              <UserIcon className="w-5 h-5 text-blue-500" />
            </div>
            <div className="overflow-hidden">
              <p className="font-medium truncate">{profile?.fullName || 'Anonymous'}</p>
              <p className="text-xs text-gray-500 capitalize">{profile?.role || 'User'}</p>
            </div>
          </div>
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.03),transparent)]">
        <header className="h-16 border-b border-gray-800 flex items-center justify-between px-8 bg-gray-900/20 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-white">Overview</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-800 hover:bg-gray-700 transition-all text-xs font-medium">
              <Globe className="w-4 h-4" />
              English (Global)
            </button>
            <Settings className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white transition-all" />
          </div>
        </header>

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
