'use client'

import Image from 'next/image'
import { useT } from '@/context/language-context'

export default function Footer() {
  const h = useT().home
  return (
    <footer className="py-12 border-t border-[#0eab9b]/20 text-center">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Kallipas" width={80} height={20} className="w-20 h-auto" />
        </div>
        <p className="text-slate-500 text-sm font-medium">{h.footerCopyright}</p>
        <div className="flex gap-6">
          <a href="#" className="text-slate-500 hover:text-[#0eab9b] transition-colors text-sm font-medium">{h.footerPrivacy}</a>
          <a href="#" className="text-slate-500 hover:text-[#0eab9b] transition-colors text-sm font-medium">{h.footerTerms}</a>
        </div>
      </div>
    </footer>
  )
}
