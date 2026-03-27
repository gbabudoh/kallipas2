import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#F2EAE0]/80 backdrop-blur-md">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-12 h-12 text-[#9AB17A] animate-spin" />
        <p className="text-[#9AB17A] font-bold animate-pulse uppercase tracking-widest text-sm">
          Loading Kallipas...
        </p>
      </div>
    </div>
  )
}
