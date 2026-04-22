'use client'

import { useState } from 'react'
import { Play, X, Video, Clock, Eye, ShieldCheck } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

type VideoItem = {
  id: string
  label: string
  duration: string
  thumb: string
  embedUrl?: string
}

type Props = {
  videos: VideoItem[]
  thumb: string
}

export default function VideoTour({ videos, thumb }: Props) {
  const [playing, setPlaying] = useState<VideoItem | null>(null)

  return (
    <>
      <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#0eaa99]" />
              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400">Media</p>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-slate-900 italic">Virtual Tours & Videos</h2>
          </div>
          <div className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 flex items-center gap-2">
            <Video className="w-3.5 h-3.5 text-[#0eaa99]" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
              {videos.length} videos
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {videos.map((v) => (
            <motion.button
              whileHover={{ x: 4 }}
              key={v.id}
              onClick={() => setPlaying(v)}
              className="w-full flex items-center gap-5 p-5 rounded-[1.5rem] border border-slate-100 hover:border-[#0eaa99]/30 hover:bg-[#0eaa99]/5 transition-all group text-left relative overflow-hidden cursor-pointer"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-[#0eaa99] opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Thumb */}
              <div className="relative w-32 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-100 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={v.thumb} alt={v.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/10 transition-colors flex items-center justify-center">
                  <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 text-slate-900 fill-slate-900 ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 py-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-black text-slate-900 tracking-tight text-lg group-hover:text-[#0eaa99] transition-colors">
                    {v.label}
                  </p>
                  {v.id === 'v3' && (
                    <span className="px-1.5 py-0.5 rounded-md bg-[#0eaa99] text-white text-[7px] font-black uppercase tracking-widest">
                      360° VR
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-lg">
                    <Clock className="w-3 h-3 text-slate-300" />
                    {v.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-slate-200" />
                    HD Video
                  </span>
                </div>
              </div>

              <div className="w-10 h-10 bg-slate-950 group-hover:bg-[#0eaa99] rounded-full flex items-center justify-center flex-shrink-0 transition-all shadow-lg group-hover:shadow-[#0eaa99]/20">
                <Play className="w-4 h-4 text-white fill-white ml-0.5" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* ── Video modal ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {playing && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPlaying(null)}
              className="absolute inset-0 bg-slate-900/90 backdrop-blur-xl"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative w-full max-w-5xl bg-black rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-10 bg-gradient-to-b from-black/80 to-transparent">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#0eaa99] flex items-center justify-center">
                    <Video className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-black tracking-tight text-lg italic">{playing.label}</p>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-[#0eaa99] animate-pulse" />
                      <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.2em]">Secure Stream Active</p>
                    </div>
                  </div>
                </div>
                <button
                  className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all hover:rotate-90"
                  onClick={() => setPlaying(null)}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="aspect-video w-full bg-slate-900 relative">
                {playing.embedUrl ? (
                  <iframe
                    src={playing.embedUrl}
                    className="w-full h-full"
                    allow="autoplay; fullscreen; xr-spatial-tracking"
                    allowFullScreen
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-6 max-w-sm px-6">
                      <div className="w-24 h-24 bg-[#0eaa99]/10 rounded-full flex items-center justify-center mx-auto border border-[#0eaa99]/20">
                        <ShieldCheck className="w-10 h-10 text-[#0eaa99]" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-white text-2xl font-black tracking-tight italic">Protected Content</h3>
                        <p className="text-slate-400 text-sm font-medium">
                          The virtual tour for this property is restricted to verified members.
                        </p>
                      </div>
                      <button
                        onClick={() => setPlaying(null)}
                        className="w-full py-4 bg-[#0eaa99] hover:bg-[#0d9989] text-white text-[11px] font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-[#0eaa99]/20"
                      >
                        Request Access Key
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Footer info */}
              <div className="bg-slate-900/50 p-6 flex items-center justify-between border-t border-white/5">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-white/40 text-[10px] font-black uppercase tracking-widest">
                    <Clock className="w-3.5 h-3.5" /> {playing.duration}
                  </div>
                  <div className="flex items-center gap-2 text-[#0eaa99] text-[10px] font-black uppercase tracking-widest">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified Tour
                  </div>
                </div>
                <div className="text-white/20 text-[9px] font-black uppercase tracking-[0.3em]">
                  Kallipas Virtual Engine v2.4
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

