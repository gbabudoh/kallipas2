'use client'

import { useState } from 'react'
import { Play, X, Video, Clock, Eye } from 'lucide-react'

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
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400 mb-1">Media</p>
            <h2 className="text-xl font-black tracking-tight text-slate-900">Virtual Tours & Videos</h2>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">
            {videos.length} video{videos.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="space-y-3">
          {videos.map((v) => (
            <button
              key={v.id}
              onClick={() => setPlaying(v)}
              className="w-full flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:border-[#0eaa99]/30 hover:bg-[#0eaa99]/5 transition-all group text-left"
            >
              {/* Thumb */}
              <div className="relative w-28 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={v.thumb} alt={v.label} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <Play className="w-3.5 h-3.5 text-slate-900 fill-slate-900 ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-black text-slate-900 tracking-tight mb-1 group-hover:text-[#0eaa99] transition-colors">
                  {v.label}
                </p>
                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{v.duration}</span>
                  <span className="flex items-center gap-1"><Video className="w-3 h-3" />HD Video</span>
                </div>
              </div>

              <div className="w-8 h-8 bg-slate-950 group-hover:bg-[#0eaa99] rounded-full flex items-center justify-center flex-shrink-0 transition-colors">
                <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Video modal ─────────────────────────────────────────────── */}
      {playing && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6"
          onClick={() => setPlaying(null)}
        >
          <button
            className="absolute top-5 right-5 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
            onClick={() => setPlaying(null)}
          >
            <X className="w-5 h-5" />
          </button>

          <div
            className="w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-4 text-center">
              {playing.label}
            </p>

            {playing.embedUrl ? (
              <div className="aspect-video rounded-2xl overflow-hidden bg-black">
                <iframe
                  src={playing.embedUrl}
                  className="w-full h-full"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              </div>
            ) : (
              /* Placeholder player */
              <div className="aspect-video rounded-2xl overflow-hidden bg-slate-900 relative flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={playing.thumb} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
                <div className="relative z-10 text-center space-y-4">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto border border-white/30">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-white font-black text-lg tracking-tight">Virtual Tour</p>
                  <p className="text-white/50 text-sm font-medium">
                    Full virtual tour available on request
                  </p>
                  <button
                    onClick={() => setPlaying(null)}
                    className="mx-auto mt-2 px-6 py-3 bg-[#0eaa99] text-white text-[10px] font-black uppercase tracking-widest rounded-xl flex items-center gap-2 hover:bg-[#0d9989] transition-colors"
                  >
                    Request Access
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
