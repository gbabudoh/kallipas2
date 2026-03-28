'use client'

import { useState, useMemo } from 'react'
import Map, { Marker, Popup, NavigationControl, FullscreenControl } from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Home, Building, Globe, Info } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'

const DUMMY_PROPERTIES = [
  { id: '1', title: 'Modern Villa', price: '$1,200,000', lat: 40.7128, lng: -74.0060, type: 'residential' },
  { id: '2', title: 'Luxury Penthouse', price: '$3,500,000', lat: 40.7589, lng: -73.9851, type: 'residential' },
  { id: '3', title: 'Office Complex', price: '$12,000,000', lat: 40.7306, lng: -73.9352, type: 'commercial' },
  { id: '4', title: 'Coastal Estate', price: '$8,900,000', lat: 40.6782, lng: -73.9442, type: 'residential' },
]

import React, { Component, ReactNode } from 'react'

class MapErrorBoundary extends Component<{children: ReactNode, fallback: ReactNode}, {hasError: boolean}> {
  constructor(props: {children: ReactNode, fallback: ReactNode}) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(error: Error) {
    console.warn("Mapbox initialization failed (likely invalid token):", error.message)
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

// Sub-component for the interactive map content
// This is dynamically imported with ssr: false to avoid hydration errors
interface MapViewState {
  latitude: number
  longitude: number
  zoom: number
}

interface MapContentProps {
  mapToken: string
  viewState: MapViewState
  setViewState: (viewState: MapViewState) => void
  FallbackUI: React.ReactNode
}

function MapContent({ mapToken, viewState, setViewState, FallbackUI }: MapContentProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const activeProperty = useMemo(() => 
    DUMMY_PROPERTIES.find(p => p.id === selectedId), 
  [selectedId])

  return (
    <div className="w-full h-full relative border-l border-slate-100">
      <MapErrorBoundary fallback={FallbackUI}>
        <Map
          {...viewState}
          onMove={(evt: { viewState: MapViewState }) => setViewState(evt.viewState)}
          mapStyle="mapbox://styles/mapbox/light-v11"
          mapboxAccessToken={mapToken}
          style={{ width: '100%', height: '100%' }}
        >
          <NavigationControl position="bottom-right" />
          <FullscreenControl position="bottom-right" />

          {DUMMY_PROPERTIES.map(prop => (
            <Marker 
              key={prop.id} 
              latitude={prop.lat} 
              longitude={prop.lng} 
              anchor="bottom"
              onClick={e => {
                e.originalEvent.stopPropagation()
                setSelectedId(prop.id)
              }}
            >
              <motion.div 
                whileHover={{ scale: 1.15, rotate: 6 }}
                className={`p-3 rounded-[1.2rem] cursor-pointer shadow-2xl border-4 transition-all duration-500 ${
                  selectedId === prop.id 
                    ? 'bg-[#0eaa99] border-white text-white z-20 scale-125 shadow-[#0eaa99]/40' 
                    : 'bg-white/95 border-slate-50 text-[#0eaa99] z-10 shadow-slate-200/50 hover:border-[#0eaa99]/30'
                }`}
              >
                {prop.type === 'commercial' ? <Building className="w-6 h-6" /> : <Home className="w-6 h-6" />}
              </motion.div>
            </Marker>
          ))}

          <AnimatePresence>
            {selectedId && activeProperty && (
              <Popup
                latitude={activeProperty.lat}
                longitude={activeProperty.lng}
                anchor="top"
                offset={15}
                onClose={() => setSelectedId(null)}
                closeButton={false}
                className="custom-popup"
              >
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="p-6 bg-white/95 backdrop-blur-2xl border border-slate-100 rounded-[2rem] shadow-2xl min-w-[240px] relative overflow-hidden group/popup"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#0eaa99]/5 rounded-bl-[3rem] transition-transform duration-700 group-hover/popup:scale-125" />
                  
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <span className="text-[9px] font-black text-[#0eaa99] uppercase tracking-[0.3em] bg-[#0eaa99]/10 px-3 py-1 rounded-full">Asset Dossier</span>
                    <div className="w-2 h-2 rounded-full bg-[#0eaa99] animate-pulse" />
                  </div>
                  <h4 className="text-slate-950 font-black text-xl tracking-tighter mb-1 italic underline decoration-wavy decoration-[#0eaa99]/10 underline-offset-4">{activeProperty.title}</h4>
                  <p className="text-[#0eaa99] font-black text-2xl mb-6 tracking-tighter italic">{activeProperty.price}</p>
                  
                  <button className="w-full py-4 bg-slate-950 hover:bg-slate-900 text-white rounded-[1.2rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95 group/btn">
                    <Info className="w-4 h-4 text-[#0eaa99] group-hover/btn:rotate-12 transition-transform" />
                    Expand Perimeter
                  </button>
                </motion.div>
              </Popup>
            )}
          </AnimatePresence>
        </Map>
      </MapErrorBoundary>

      {/* Floating Controls Overlay */}
      <div className="absolute top-8 left-8 z-10 flex flex-col gap-4 scale-90 md:scale-100 origin-top-left">
        <div className="bg-white/80 backdrop-blur-3xl p-6 rounded-[2rem] border border-white/40 flex flex-col gap-5 shadow-2xl shadow-slate-200/50">
           <div className="flex items-center gap-2 mb-1 px-1">
              <Globe className="w-4 h-4 text-[#0eaa99]" />
              <span className="text-[10px] font-black text-slate-950 uppercase tracking-[0.4em]">Asset Index</span>
           </div>
           
           <div className="flex flex-col gap-3">
             <div className="flex items-center gap-4 group cursor-help">
               <div className="w-4 h-4 rounded-lg bg-[#0eaa99] shadow-lg shadow-[#0eaa99]/40 group-hover:scale-125 transition-transform" />
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Residential Core</span>
             </div>
             <div className="flex items-center gap-4 group cursor-help">
               <div className="w-4 h-4 rounded-lg bg-slate-100 border border-slate-200 group-hover:bg-[#0eaa99]/10 transition-colors" />
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Commercial Hub</span>
             </div>
           </div>

           <div className="pt-4 border-t border-slate-50 mt-1">
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/20" />
                 <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">Global Sync Active</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}

// Dynamically import the MapContent to ensure it only runs on the client
const DynamicMap = dynamic(() => Promise.resolve(MapContent), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-slate-50/50 animate-pulse" />
})

export default function PropertyMap() {
  const [viewState, setViewState] = useState({
    latitude: 40.7128,
    longitude: -74.0060,
    zoom: 12
  })

  const mapToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

  const FallbackUI = (
    <div className="w-full h-full bg-slate-50/50 backdrop-blur-3xl flex flex-col items-center justify-center p-12 text-center border-l border-slate-100 relative overflow-hidden group">
      {/* Decorative Background Assets */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0eaa99]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0eaa99]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      
      <div className="relative z-10 space-y-10 max-w-2xl">
        <div className="w-32 h-32 bg-white rounded-[2.5rem] shadow-2xl flex items-center justify-center text-[#0eaa99] border border-slate-50 mx-auto transition-transform duration-[2000ms] group-hover:rotate-12 group-hover:scale-110">
          <Globe className="w-16 h-16 opacity-80" />
        </div>
        
        <div>
          <h3 className="text-5xl font-black tracking-tighter text-slate-950 mb-4 italic underline decoration-wavy decoration-[#0eaa99]/20 underline-offset-8">Advanced Global Map</h3>
          <p className="text-slate-500 font-bold text-lg leading-relaxed max-w-lg mx-auto">
            Interactive marketplace indexing requires a verified <span className="text-[#0eaa99] font-black italic underline decoration-slate-200">Mapbox Perimeter Protocol</span> to be established in your environment.
          </p>
        </div>

        <div className="bg-white/40 backdrop-blur-md p-10 rounded-[3rem] border border-white shadow-[0_24px_48px_-12px_rgba(14,170,153,0.08)] relative group/card">
          <div className="flex items-center gap-4 mb-6 justify-center">
             <div className="w-2.5 h-2.5 rounded-full bg-[#0eaa99] animate-pulse shadow-lg shadow-[#0eaa99]/40" />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Technical Provisioning Required</span>
          </div>
          
          <div className="space-y-4 text-left">
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 font-mono text-[10px] text-[#0eaa99] font-black tracking-widest flex items-center justify-between group-hover/card:border-[#0eaa99]/30 transition-all">
               <span>NEXT_PUBLIC_MAPBOX_TOKEN</span>
               <div className="w-4 h-4 rounded-md bg-white border border-slate-100" />
            </div>
            <p className="text-xs text-slate-400 font-bold italic leading-relaxed px-2">
              Please manifest your Public Token in the <code className="text-[#0eaa99] font-black">.env.local</code> repository. If this HUD persists, your current token perimeter is invalid or missing.
            </p>
          </div>
        </div>
        
        <div className="pt-6">
           <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">System Ready • Peripheral Sync Pending</p>
        </div>
      </div>
    </div>
  )

  // Auto-detect Mapbox state — treat missing or placeholder tokens as invalid
  const isValidToken = mapToken && mapToken.startsWith('pk.') && mapToken.length > 10
  if (!isValidToken) {
    return FallbackUI
  }

  return (
    <DynamicMap 
      mapToken={mapToken} 
      viewState={viewState} 
      setViewState={setViewState} 
      FallbackUI={FallbackUI} 
    />
  )
}
