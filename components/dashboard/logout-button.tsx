'use client'

import { LogOut } from 'lucide-react'
import { useT } from '@/context/language-context'

export default function LogoutButton() {
  const t = useT()

  const handleLogout = () => {
    // Clear mock auth state
    localStorage.removeItem('kallipas_role')
    document.cookie = 'kallipas_role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    
    // Force a full refresh to clear current SPA state and trigger middleware redirect
    window.location.href = '/login'
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-3 px-4 py-3 rounded-xl w-full hover:bg-red-500/10 text-gray-400 hover:text-red-500 transition-all font-medium cursor-pointer"
    >
      <LogOut className="w-5 h-5" />
      {t.dashboard.signOut}
    </button>
  )
}

