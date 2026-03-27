'use client'

import { useState, useMemo } from 'react'
import Map, { Marker, Popup, NavigationControl, FullscreenControl } from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Home, Building, Globe, Info } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const DUMMY_PROPERTIES = [
  { id: '1', title: 'Modern Villa', price: '$1,200,000', lat: 40.7128, lng: -74.0060, type: 'residential' },
  { id: '2', title: 'Luxury Penthouse', price: '$3,500,000', lat: 40.7589, lng: -73.9851, type: 'residential' },
  { id: '3', title: 'Office Complex', price: '$12,000,000', lat: 40.7306, lng: -73.9352, type: 'commercial' },
  { id: '4', title: 'Coastal Estate', price: '$8,900,000', lat: 40.6782, lng: -73.9442, type: 'residential' },
]

export default function PropertyMap() {
  const [viewState, setViewState] = useState({
    latitude: 40.7128,
    longitude: -74.0060,
    zoom: 12
  })
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const mapToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

  const activeProperty = useMemo(() => 
    DUMMY_PROPERTIES.find(p => p.id === selectedId), 
  [selectedId])

  if (!mapToken || mapToken.includes('your-token-here')) {
    return (
      <div className="w-full h-full bg-gray-900 flex flex-col items-center justify-center p-8 text-center border-l border-gray-800">
        <Globe className="w-16 h-16 text-blue-500 mb-6 animate-pulse" />
        <h3 className="text-2xl font-bold mb-4 italic">Advanced Global Map</h3>
        <p className="text-gray-400 max-w-sm mb-8">
          The interactive global marketplace map requires a Mapbox API token to be configured in your environment.
        </p>
        <div className="glass p-6 rounded-2xl border border-blue-500/20 max-w-md">
          <p className="text-xs text-blue-400 font-mono mb-2">NEXT_PUBLIC_MAPBOX_TOKEN</p>
          <p className="text-xs text-gray-500 leading-relaxed">
            Please add your Mapbox Public Token to <code className="text-gray-300">.env.local</code> to enable real-time 
            geospatial property discovery.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full relative border-l border-gray-800">
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        mapboxAccessToken={mapToken}
        style={{ width: '100%', height: '100%' }}
      >
        <NavigationControl position="top-right" />
        <FullscreenControl position="top-right" />

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
              whileHover={{ scale: 1.1 }}
              className={`p-2 rounded-full cursor-pointer shadow-lg shadow-black/50 border transition-all ${
                selectedId === prop.id 
                  ? 'bg-blue-600 border-white text-white z-20 scale-110' 
                  : 'bg-black/80 border-blue-500/50 text-blue-500 z-10'
              }`}
            >
              {prop.type === 'commercial' ? <Building className="w-5 h-5" /> : <Home className="w-5 h-5" />}
            </motion.div>
          </Marker>
        ))}

        <AnimatePresence>
          {selectedId && activeProperty && (
            <Popup
              latitude={activeProperty.lat}
              longitude={activeProperty.lng}
              anchor="top"
              offset={10}
              onClose={() => setSelectedId(null)}
              closeButton={false}
              className="custom-popup"
            >
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl min-w-[200px]"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Property Details</span>
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                </div>
                <h4 className="text-white font-bold mb-1">{activeProperty.title}</h4>
                <p className="text-blue-400 font-bold text-lg mb-3">{activeProperty.price}</p>
                <button className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2">
                  <Info className="w-4 h-4" />
                  View Details
                </button>
              </motion.div>
            </Popup>
          )}
        </AnimatePresence>
      </Map>

      {/* Floating Controls Overlay */}
      <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
        <div className="glass p-4 rounded-2xl border border-white/10 flex items-center gap-4">
           <div className="flex items-center gap-2">
             <div className="w-3 h-3 rounded-full bg-blue-500" />
             <span className="text-xs font-medium text-gray-300">Residential</span>
           </div>
           <div className="flex items-center gap-2">
             <div className="w-3 h-3 rounded-full bg-indigo-500" />
             <span className="text-xs font-medium text-gray-300">Commercial</span>
           </div>
        </div>
      </div>
    </div>
  )
}
