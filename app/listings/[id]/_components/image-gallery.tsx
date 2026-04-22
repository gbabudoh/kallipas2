'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, X, Maximize2, Images } from 'lucide-react'

type Props = {
  images: string[]
  fallback: string   // real property photo used when any image fails to load
  title: string
}

export default function ImageGallery({ images, fallback, title }: Props) {
  const [active, setActive]     = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const thumbRef = useRef<HTMLDivElement>(null)

  const prev = useCallback(() => setActive((a) => (a - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setActive((a) => (a + 1) % images.length), [images.length])

  // Scroll active thumb into view
  useEffect(() => {
    const strip = thumbRef.current
    if (!strip) return
    const btn = strip.children[active] as HTMLElement | undefined
    btn?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [active])

  // Keyboard nav in lightbox
  useEffect(() => {
    if (!lightbox) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape')     setLightbox(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox, prev, next])

  const handleErr = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget
    if (img.src !== fallback) {
      console.log('ImageGallery: loading fallback for', img.src)
      img.src = fallback
    }
  }

  // Use fallback as image[0] if array is empty
  const allImages = images.length > 0 ? images : [fallback]

  return (
    <>
      {/* ── Gallery ─────────────────────────────────────────────────────── */}
      <div className="rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100">

        {/* Main image */}
        <div
          className="relative aspect-[16/9] overflow-hidden group cursor-zoom-in"
          onClick={() => setLightbox(true)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={allImages[active]}
            src={allImages[active] ?? fallback}
            alt={`${title} — photo ${active + 1}`}
            onError={handleErr}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />

          {/* Hover gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Prev / Next */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev() }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110 z-10"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5 text-slate-700" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next() }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110 z-10"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5 text-slate-700" />
              </button>
            </>
          )}

          {/* Expand */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <span className="bg-black/60 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <Maximize2 className="w-3 h-3" /> Expand
            </span>
          </div>

          {/* Photo counter */}
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg flex items-center gap-1.5 z-10">
            <Images className="w-3 h-3" />
            {active + 1} / {allImages.length}
          </div>
        </div>

        {/* Scrollable thumbnail strip — all images */}
        {allImages.length > 1 && (
          <div className="bg-slate-50 border-t border-slate-100 px-3 py-3">
            <div
              ref={thumbRef}
              className="flex gap-2 overflow-x-auto pb-1"
              style={{ scrollbarWidth: 'thin', scrollbarColor: '#e2e8f0 transparent' }}
            >
              {allImages.filter(Boolean).map((img, i) => (
                <button
                  key={`${img}-${i}`}
                  onClick={() => setActive(i)}
                  className={`relative flex-shrink-0 w-20 h-14 rounded-xl overflow-hidden transition-all duration-200 cursor-pointer ${
                    active === i
                      ? 'ring-2 ring-[#0eaa99] ring-offset-1 scale-105 opacity-100 z-10'
                      : 'opacity-60 hover:opacity-100 hover:scale-105'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={`Photo ${i + 1}`}
                    loading={i === 0 ? "eager" : "lazy"}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== fallback) {
                        target.src = fallback;
                      }
                    }}
                  />
                  <div className={`absolute bottom-1 right-1 text-[8px] font-black px-1 rounded cursor-pointer ${
                    active === i ? 'bg-[#0eaa99] text-white' : 'bg-black/40 text-white'
                  }`}>
                    {i + 1}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Lightbox ─────────────────────────────────────────────────────── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center"
          onClick={() => setLightbox(false)}
        >
          {/* Close */}
          <button
            className="absolute top-5 right-5 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
            onClick={() => setLightbox(false)}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Counter */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/60 text-[10px] font-black uppercase tracking-widest">
            {active + 1} / {allImages.length}
          </div>

          {/* Prev */}
          {allImages.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Main image */}
          <div
            className="w-full px-20 flex items-center justify-center"
            style={{ maxHeight: 'calc(100vh - 120px)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={allImages[active]}
              src={allImages[active]}
              alt={`${title} — photo ${active + 1}`}
              onError={handleErr}
              className="max-h-[70vh] max-w-full object-contain rounded-2xl"
            />
          </div>

          {/* Next */}
          {allImages.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Thumbnail strip */}
          <div
            className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm px-6 py-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex gap-2 overflow-x-auto justify-center" style={{ scrollbarWidth: 'none' }}>
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`relative flex-shrink-0 w-16 h-10 rounded-lg overflow-hidden transition-all duration-200 ${
                    i === active
                      ? 'ring-2 ring-[#0eaa99] ring-offset-1 opacity-100 scale-110'
                      : 'opacity-40 hover:opacity-80'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt="" onError={handleErr} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
