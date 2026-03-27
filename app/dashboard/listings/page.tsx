import PropertyMap from '@/components/discovery/property-map'
import { Search, SlidersHorizontal, Grid, List } from 'lucide-react'

export default function ListingsPage() {
  return (
    <div className="h-[calc(100vh-64px)] flex overflow-hidden">
      {/* Search & Results Panel */}
      <div className="w-full lg:w-[450px] flex flex-col border-r border-gray-800 bg-[#050505]">
        <div className="p-6 border-b border-gray-800 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-xl font-bold italic">Marketplace</h1>
            <div className="flex items-center gap-2 bg-gray-900 p-1 rounded-lg">
              <button className="p-1.5 bg-gray-800 rounded-md"><Grid className="w-4 h-4" /></button>
              <button className="p-1.5 text-gray-500"><List className="w-4 h-4" /></button>
            </div>
          </div>
          
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search properties..."
              className="w-full bg-gray-900 border border-gray-800 rounded-xl py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <button className="px-3 py-1.5 bg-blue-600 rounded-full text-xs font-bold whitespace-nowrap">All Homes</button>
            <button className="px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-full text-xs font-medium text-gray-400 hover:text-white transition-all whitespace-nowrap italic">New Luxury</button>
            <button className="px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-full text-xs font-medium text-gray-400 hover:text-white transition-all whitespace-nowrap">Verified Only</button>
            <button className="px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-full text-xs font-medium text-gray-400 hover:text-white transition-all whitespace-nowrap"><SlidersHorizontal className="w-3.5 h-3.5" /></button>
          </div>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">48 Featured Global Listings</p>
          
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-[16/10] bg-gray-900 rounded-2xl mb-3 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 left-4 px-2 py-1 bg-blue-600 rounded text-[10px] font-bold uppercase tracking-tighter shadow-lg shadow-blue-500/20">Featured</div>
                <div className="absolute bottom-4 left-4">
                  <p className="text-xl font-bold text-white">$2,450,000</p>
                </div>
              </div>
              <h3 className="font-bold text-lg mb-1 group-hover:text-blue-500 transition-colors">Elite Skyline View Villa</h3>
              <p className="text-sm text-gray-500 mb-2">New York City, USA</p>
              <div className="flex items-center gap-4 text-xs text-gray-400 font-medium">
                <span>3 Bed</span>
                <span>•</span>
                <span>2 Bath</span>
                <span>•</span>
                <span>2,400 sqft</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map Panel */}
      <div className="hidden lg:block flex-1">
        <PropertyMap />
      </div>
    </div>
  )
}
