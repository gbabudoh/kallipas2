'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 rounded-[1.5rem] bg-rose-50 flex items-center justify-center text-rose-500 mb-8">
        <AlertTriangle className="w-10 h-10" />
      </div>
      <h1 className="text-4xl font-black text-slate-900 tracking-tight italic mb-4">
        System Desync Detected
      </h1>
      <p className="text-slate-500 font-medium max-w-md leading-relaxed mb-10">
        We encountered a temporary synchronization error with our global property network. 
        Please try refreshing the perimeter.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={() => reset()}
          className="px-8 py-4 bg-[#0eaa99] hover:bg-[#0eab9b] text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all active:scale-[0.98] cursor-pointer"
        >
          Reset Session
        </button>
        <Link
          href="/"
          className="px-8 py-4 bg-slate-950 hover:bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all active:scale-[0.98] cursor-pointer"
        >
          Return to Hub
        </Link>
      </div>
    </div>
  )
}
