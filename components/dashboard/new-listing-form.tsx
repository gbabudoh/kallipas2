'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Building2, 
  MapPin, 
  DollarSign, 
  Image as ImageIcon, 
  CircleCheckBig as CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Loader2,
  Plus,
  ChevronDown
} from 'lucide-react'
import { createListing } from '@/app/actions/listings'
import { CURRENCIES, getCurrency, formatPrice } from '@/lib/currencies'

const steps = [
  { id: 'basics', title: 'Basic Info', icon: Building2 },
  { id: 'location', title: 'Location', icon: MapPin },
  { id: 'details', title: 'Details & Price', icon: DollarSign },
  { id: 'media', title: 'Media', icon: ImageIcon },
  { id: 'review', title: 'Review', icon: CheckCircle2 },
]

export default function NewListingForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    property_type: 'residential' as 'residential' | 'commercial' | 'land' | 'industrial',
    listing_type: 'sale',
    price: '',
    currency: 'USD',
    address: '',
    city: '',
    country: '',
    amenities: [] as string[],
    images: [] as string[]
  })

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))
  const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 0))

  const selectedCurrency = getCurrency(formData.currency)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading(true)
    const formDataUpload = new FormData()
    formDataUpload.append('file', file)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload
      })
      const data = await res.json()
      if (data.url) {
        setFormData(prev => ({ ...prev, images: [...prev.images, data.url] }))
      }
    } catch (err) {
      console.error('Upload failed:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const tempUserId = "dev-user-001"

      const result = await createListing({
        ownerId: tempUserId,
        title: formData.title,
        description: formData.description || '',
        price: parseFloat(formData.price) || 0,
        currency: formData.currency || 'USD',
        propertyType: formData.property_type,
        listingType: formData.listing_type,
        address: formData.address || '',
        city: formData.city || '',
        country: formData.country || '',
        images: formData.images
      })

      if (!result.success) {
        throw new Error(result.error)
      }
      
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listingId: result.listingId })
      })
      const { url } = await res.json()
      if (url) window.location.href = url

    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred'
      alert(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Listing Asset Identity</label>
              <input 
                type="text" 
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                placeholder="e.g. Elite Skyline Tower Villa"
                className="w-full bg-white border border-slate-200 rounded-[1.5rem] py-5 px-8 text-slate-900 font-bold focus:border-[#0eaa99]/40 focus:ring-8 focus:ring-[#0eaa99]/5 outline-none transition-all placeholder-slate-200 shadow-sm"
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Strategic Description</label>
              <textarea 
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="Declare the specific perimeters and unique leverage points of the asset..."
                rows={5}
                className="w-full bg-white border border-slate-200 rounded-[2rem] py-6 px-8 text-slate-900 font-bold focus:border-[#0eaa99]/40 focus:ring-8 focus:ring-[#0eaa99]/5 outline-none transition-all resize-none shadow-sm leading-relaxed"
              />
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Asset Classification</label>
                <div className="relative">
                  <select 
                    value={formData.property_type}
                    onChange={e => setFormData({...formData, property_type: e.target.value as 'residential' | 'commercial' | 'land' | 'industrial'})}
                    className="w-full bg-white border border-slate-200 rounded-2xl py-5 px-8 text-slate-900 font-black outline-none appearance-none cursor-pointer focus:border-[#0eaa99]/40 transition-all shadow-sm"
                  >
                    <option value="residential">Residential Core</option>
                    <option value="commercial">Commercial Hub</option>
                    <option value="land">Raw Strategic Land</option>
                    <option value="industrial">Industrial Perimeter</option>
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Transaction Protocol</label>
                <div className="relative">
                  <select 
                     value={formData.listing_type}
                     onChange={e => setFormData({...formData, listing_type: e.target.value})}
                     className="w-full bg-white border border-slate-200 rounded-2xl py-5 px-8 text-slate-900 font-black outline-none appearance-none cursor-pointer focus:border-[#0eaa99]/40 transition-all shadow-sm"
                  >
                    <option value="sale">Direct Disposal (Sale)</option>
                    <option value="rent">Recurring Lease (Rent)</option>
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )
      case 1:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
             <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Global Meridian Address</label>
              <input 
                type="text" 
                value={formData.address}
                onChange={e => setFormData({...formData, address: e.target.value})}
                placeholder="Primary street address in the region"
                className="w-full bg-white border border-slate-200 rounded-[1.5rem] py-5 px-8 text-slate-900 font-bold focus:border-[#0eaa99]/40 focus:ring-8 focus:ring-[#0eaa99]/5 outline-none transition-all placeholder-slate-200 shadow-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Metropolitan Center</label>
                <input 
                   type="text" 
                   value={formData.city}
                   onChange={e => setFormData({...formData, city: e.target.value})}
                   placeholder="City / Settlement"
                   className="w-full bg-white border border-slate-200 rounded-2xl py-5 px-8 text-slate-900 font-bold focus:border-[#0eaa99]/40 focus:ring-8 focus:ring-[#0eaa99]/5 outline-none transition-all shadow-sm"
                />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Nation State Perimeters</label>
                <input 
                   type="text" 
                   value={formData.country}
                   onChange={e => setFormData({...formData, country: e.target.value})}
                   placeholder="Country / Sovereignty"
                   className="w-full bg-white border border-slate-200 rounded-2xl py-5 px-8 text-slate-900 font-bold focus:border-[#0eaa99]/40 focus:ring-8 focus:ring-[#0eaa99]/5 outline-none transition-all shadow-sm"
                />
              </div>
            </div>
          </motion.div>
        )
      case 2:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
            {/* Currency selector */}
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Monetary Foundation Protocol</label>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                {CURRENCIES.map(c => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => setFormData({...formData, currency: c.code})}
                    className={`p-5 rounded-2xl text-left transition-all border-2 group hover:scale-[1.02] active:scale-95 ${
                      formData.currency === c.code
                        ? 'border-[#0eaa99] bg-[#0eaa99]/5 shadow-xl shadow-[#0eaa99]/10'
                        : 'border-slate-50 bg-white hover:border-slate-100 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-2xl drop-shadow-md">{c.flag}</span>
                       <div className={`w-2 h-2 rounded-full ${formData.currency === c.code ? 'bg-[#0eaa99] shadow-lg shadow-[#0eaa99]/50 animate-pulse' : 'bg-slate-100'}`} />
                    </div>
                    <p className={`text-xs font-black tracking-widest uppercase ${formData.currency === c.code ? 'text-[#0eaa99]' : 'text-slate-400'}`}>{c.code}</p>
                    <p className="text-[9px] text-slate-400 font-bold mt-1 opacity-60 italic">{c.symbol === '$' ? 'Dollar System' : c.symbol === '€' ? 'Euro Perimeter' : 'Localized Capital'}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Price input with dynamic symbol */}
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Valuation Threshold</label>
              <div className="relative group">
                <div className="absolute left-8 top-1/2 -translate-y-1/2 text-[#0eaa99] font-black text-xl drop-shadow-sm">
                  {selectedCurrency.symbol}
                </div>
                <input 
                  type="number" 
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: e.target.value})}
                  placeholder="0.00"
                  className="w-full bg-white border border-slate-200 rounded-[2rem] py-8 pl-18 pr-12 text-slate-950 outline-none text-4xl font-black italic tracking-tighter focus:border-[#0eaa99]/40 focus:ring-8 focus:ring-[#0eaa99]/5 shadow-xl shadow-slate-200/20"
                />
              </div>
              {formData.price && (
                <div className="ml-4 flex items-center gap-3">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#0eaa99] shadow-lg shadow-[#0eaa99]/50 animate-pulse" />
                   <p className="text-sm text-slate-400 font-black uppercase tracking-widest italic">
                     Digital Audit Sync: {formatPrice(parseFloat(formData.price) || 0, formData.currency)}
                   </p>
                </div>
              )}
            </div>
          </motion.div>
        )
      case 3:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {formData.images.map((url, i) => (
                <div key={i} className="aspect-square bg-slate-50 rounded-[2rem] overflow-hidden border border-slate-100 relative shadow-xl hover:scale-105 transition-transform duration-500 group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt="Property" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
              <label className="aspect-square bg-slate-50 border-4 border-dashed border-slate-100 rounded-[2rem] flex flex-col items-center justify-center text-slate-300 hover:text-[#0eaa99] hover:border-[#0eaa99]/40 hover:bg-[#0eaa99]/5 cursor-pointer transition-all duration-500 group">
                <input type="file" className="hidden" onChange={handleImageUpload} disabled={loading} />
                <div className="w-16 h-16 rounded-3xl bg-white shadow-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                   <Plus className="w-8 h-8" />
                </div>
                <span className="text-[10px] font-black tracking-[0.3em] uppercase opacity-60">Initialize Stream</span>
              </label>
            </div>
            <div className="text-center p-8 bg-slate-50 border border-slate-100 rounded-[2rem] border-dashed">
               <ImageIcon className="w-8 h-8 text-[#0eaa99] mx-auto mb-4 opacity-30" />
               <p className="text-slate-400 font-bold italic">Upload high-resolution architectural perimeters to maximize global leverage.</p>
            </div>
          </motion.div>
        )
      case 4:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
            <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 shadow-inner relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#0eaa99]/5 rounded-bl-[4rem] group-hover:scale-125 transition-transform duration-700" />
              <div className="flex items-center justify-between mb-8">
                <h4 className="font-black text-3xl text-slate-950 tracking-tighter italic underline decoration-wavy decoration-[#0eaa99]/20 underline-offset-8">
                  {formData.title || 'Untitled Asset Dossier'}
                </h4>
                <div className="px-5 py-2 bg-white border border-slate-200 rounded-full shadow-sm text-[#0eaa99] font-black text-[10px] uppercase tracking-widest">In Review State</div>
              </div>
              <p className="text-slate-400 font-bold italic mb-8 border-l-4 border-[#0eaa99]/20 pl-6 leading-relaxed">
                {formData.address ? `${formData.address}, ${formData.city}` : 'Global coordinate perimeters pending final verification.'}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-950 to-[#0eaa99] tracking-tighter italic">
                  {formatPrice(parseFloat(formData.price) || 0, formData.currency)}
                </p>
                <div className="flex gap-4">
                  <span className="text-[9px] font-black px-4 py-2 rounded-xl bg-white border border-slate-100 text-slate-400 shadow-sm uppercase tracking-widest">
                    {formData.property_type}
                  </span>
                  <span className="text-[9px] font-black px-4 py-2 rounded-xl bg-white border border-slate-100 text-slate-400 shadow-sm uppercase tracking-widest">
                    {formData.listing_type}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="p-6 bg-[#0eaa99]/5 rounded-2xl border border-[#0eaa99]/10 flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-white shadow-md flex items-center justify-center text-[#0eaa99]">
                   <DollarSign className="w-5 h-5" />
                 </div>
                 <p className="text-xs text-slate-500 font-bold uppercase tracking-widest leading-relaxed">System overhead provision: <span className="text-[#0eaa99] font-black">$25.00 USD</span> (Fixed Flat Asset Intake)</p>
              </div>
              <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 flex items-center gap-4 group">
                 <div className="w-10 h-10 rounded-xl bg-[#0eaa99]/20 flex items-center justify-center text-[#0eaa99] group-hover:rotate-12 transition-all">
                   <CheckCircle2 className="w-5 h-5" />
                 </div>
                 <p className="text-xs text-slate-400 font-bold italic tracking-wide">Automated multi-sovereignty translation matrix with global reach indexing will manifest post-provision.</p>
              </div>
            </div>
          </motion.div>
        )
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Stepper HUD */}
      <div className="flex justify-between mb-16 px-10 relative">
        <div className="absolute top-6 left-20 right-20 h-px bg-slate-100 -z-10" />
        {steps.map((s, i) => (
          <div key={s.id} className="flex flex-col items-center gap-3 group relative">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 border-2 ${
              i <= currentStep 
                ? 'bg-[#0eaa99] text-white border-[#0eaa99] shadow-2xl shadow-[#0eaa99]/40 scale-110' 
                : 'bg-white text-slate-300 border-slate-100 shadow-sm'
            }`}>
              <s.icon className={`w-6 h-6 ${i <= currentStep ? 'animate-pulse' : ''}`} />
            </div>
            <span className={`text-[10px] font-black uppercase tracking-[0.3em] transition-colors ${
              i <= currentStep ? 'text-slate-950' : 'text-slate-400 opacity-50'
            }`}>
              {s.title}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-white/60 backdrop-blur-3xl p-12 rounded-[3.5rem] border border-white shadow-[0_32px_96px_-24px_rgba(0,0,0,0.08)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#0eaa99]/5 rounded-full blur-[100px] -z-10" />
        
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>

        <div className="flex justify-between mt-16 pt-10 border-t border-slate-100">
          <button 
            onClick={handleBack}
            disabled={currentStep === 0 || loading}
            className="flex items-center gap-3 px-10 py-4 text-slate-400 font-black uppercase text-[10px] tracking-widest hover:text-slate-950 transition-all disabled:opacity-0 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
            Previous Sector
          </button>

          {currentStep === steps.length - 1 ? (
            <button 
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center gap-4 px-14 py-5 bg-slate-950 text-white font-black rounded-2xl transition-all shadow-2xl hover:bg-slate-900 shadow-slate-200 active:scale-95 disabled:opacity-50 uppercase text-xs tracking-[0.2em]"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                <>
                  Commit Asset Provision
                  <CheckCircle2 className="w-6 h-6 text-[#0eaa99]" />
                </>
              )}
            </button>
          ) : (
            <button 
              onClick={handleNext}
              className="flex items-center gap-4 px-14 py-5 bg-[#0eaa99] hover:bg-[#0c9485] text-white font-black rounded-2xl transition-all shadow-2xl shadow-[#0eaa99]/30 hover:shadow-[#0eaa99]/50 active:scale-95 uppercase text-xs tracking-[0.2em] group"
            >
              Proceed To Phase {currentStep + 2}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
