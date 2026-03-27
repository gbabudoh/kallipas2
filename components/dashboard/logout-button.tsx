'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = () => {
    // TODO: Replace with real auth signout (NextAuth or custom)
    router.push('/login')
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-3 px-4 py-3 rounded-xl w-full hover:bg-red-500/10 text-gray-400 hover:text-red-500 transition-all font-medium"
    >
      <LogOut className="w-5 h-5" />
      Sign Out
    </button>
  )
}
