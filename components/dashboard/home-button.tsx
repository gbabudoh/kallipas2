'use client'

import { Globe, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function HomeButton({ label }: { label: string }) {
  return (
    <Link
      href="/"
      className="w-full h-14 flex items-center justify-center gap-3 bg-[#0eaa99] rounded-[1.5rem] text-sm font-black transition-all text-white hover:bg-[#0eaa99]/90 hover:shadow-2xl hover:shadow-[#0eaa99]/30 group relative overflow-hidden active:scale-95"
    >
      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      <Globe className="w-4 h-4 relative z-10" />
      <span className="relative z-10 tracking-tight">{label}</span>
      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
    </Link>
  )
}

