'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Building2, 
  MapPin, 
  DollarSign, 
  Image as ImageIcon, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Loader2,
  Plus
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
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Listing Title</label>
              <input 
                type="text" 
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                placeholder="e.g. Luxury Beachfront Villa"
                className="w-full bg-gray-900/50 border border-gray-800 rounded-2xl py-4 px-6 text-white focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Description</label>
              <textarea 
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="Describe your property..."
                rows={4}
                className="w-full bg-gray-900/50 border border-gray-800 rounded-2xl py-4 px-6 text-white focus:ring-2 focus:ring-blue-500/50 outline-none transition-all resize-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Property Type</label>
                <select 
                  value={formData.property_type}
                  onChange={e => setFormData({...formData, property_type: e.target.value as 'residential' | 'commercial' | 'land' | 'industrial'})}
                  className="w-full bg-gray-900/50 border border-gray-800 rounded-2xl py-4 px-6 text-white outline-none appearance-none"
                >
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="land">Land</option>
                  <option value="industrial">Industrial</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Listing Type</label>
                <select 
                   value={formData.listing_type}
                   onChange={e => setFormData({...formData, listing_type: e.target.value})}
                   className="w-full bg-gray-900/50 border border-gray-800 rounded-2xl py-4 px-6 text-white outline-none appearance-none"
                >
                  <option value="sale">For Sale</option>
                  <option value="rent">For Rent</option>
                </select>
              </div>
            </div>
          </motion.div>
        )
      case 1:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
             <div className="space-y-2">
              <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Address</label>
              <input 
                type="text" 
                value={formData.address}
                onChange={e => setFormData({...formData, address: e.target.value})}
                placeholder="Street address"
                className="w-full bg-gray-900/50 border border-gray-800 rounded-2xl py-4 px-6 text-white outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">City</label>
                <input 
                   type="text" 
                   value={formData.city}
                   onChange={e => setFormData({...formData, city: e.target.value})}
                   className="w-full bg-gray-900/50 border border-gray-800 rounded-2xl py-4 px-6 text-white outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Country</label>
                <input 
                   type="text" 
                   value={formData.country}
                   onChange={e => setFormData({...formData, country: e.target.value})}
                   className="w-full bg-gray-900/50 border border-gray-800 rounded-2xl py-4 px-6 text-white outline-none"
                />
              </div>
            </div>
          </motion.div>
        )
      case 2:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            {/* Currency selector */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Currency</label>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                {CURRENCIES.map(c => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => setFormData({...formData, currency: c.code})}
                    className={`p-3 rounded-xl text-left transition-all border ${
                      formData.currency === c.code
                        ? 'border-blue-500 bg-blue-500/10 shadow-[0_0_10px_rgba(59,130,246,0.2)]'
                        : 'border-gray-800 bg-gray-900/50 hover:border-gray-700'
                    }`}
                  >
                    <span className="text-lg">{c.flag}</span>
                    <p className="text-xs font-bold mt-1">{c.code}</p>
                    <p className="text-[10px] text-gray-500">{c.symbol}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Price input with dynamic symbol */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Price</label>
              <div className="relative">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 font-bold">
                  {selectedCurrency.symbol}
                </div>
                <input 
                  type="number" 
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: e.target.value})}
                  placeholder="0"
                  className="w-full bg-gray-900/50 border border-gray-800 rounded-2xl py-4 pl-14 pr-6 text-white outline-none text-xl font-bold"
                />
              </div>
              {formData.price && (
                <p className="text-sm text-gray-400">
                  Preview: {formatPrice(parseFloat(formData.price) || 0, formData.currency)}
                </p>
              )}
            </div>
          </motion.div>
        )
      case 3:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              {formData.images.map((url, i) => (
                <div key={i} className="aspect-square bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt="Property" className="w-full h-full object-cover" />
                </div>
              ))}
              <label className="aspect-square bg-gray-900 border-2 border-dashed border-gray-800 rounded-2xl flex items-center justify-center text-gray-500 hover:text-blue-500 hover:border-blue-500 cursor-pointer transition-all">
                <input type="file" className="hidden" onChange={handleImageUpload} disabled={loading} />
                <Plus className="w-8 h-8" />
              </label>
            </div>
            <p className="text-gray-400 text-center">Upload high-quality images of your property.</p>
          </motion.div>
        )
      case 4:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="glass-card p-6 rounded-3xl border-blue-500/20">
              <h4 className="font-bold text-lg mb-2">{formData.title || 'Untitled Listing'}</h4>
              <p className="text-gray-400 text-sm mb-4">{formData.city}{formData.country ? `, ${formData.country}` : ''}</p>
              <p className="text-2xl font-bold text-blue-500">
                {formatPrice(parseFloat(formData.price) || 0, formData.currency)}
              </p>
              <div className="flex gap-2 mt-3">
                <span className="text-[10px] font-bold px-2 py-1 rounded bg-gray-800 text-gray-400 uppercase">
                  {formData.property_type}
                </span>
                <span className="text-[10px] font-bold px-2 py-1 rounded bg-gray-800 text-gray-400 uppercase">
                  {formData.listing_type}
                </span>
                <span className="text-[10px] font-bold px-2 py-1 rounded bg-gray-800 text-gray-400 uppercase">
                  {formData.currency}
                </span>
              </div>
            </div>
            <div className="p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10">
               <p className="text-xs text-blue-400 font-medium">Standard listing fee: $25.00 USD (One-time, regardless of property currency)</p>
            </div>
            <div className="p-4 bg-green-500/5 rounded-2xl border border-green-500/10">
               <p className="text-xs text-green-400 font-medium">✨ After payment, your listing will be auto-translated to French, Spanish, and Arabic for global reach.</p>
            </div>
          </motion.div>
        )
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-12">
      {/* Stepper */}
      <div className="flex justify-between mb-12">
        {steps.map((s, i) => (
          <div key={s.id} className="flex flex-col items-center gap-2 group">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
              i <= currentStep ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-gray-900 text-gray-600'
            }`}>
              <s.icon className="w-5 h-5" />
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${
              i <= currentStep ? 'text-blue-500' : 'text-gray-600'
            }`}>
              {s.title}
            </span>
          </div>
        ))}
      </div>

      <div className="glass-card p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl -z-10" />
        
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>

        <div className="flex justify-between mt-12 pt-8 border-t border-gray-800">
          <button 
            onClick={handleBack}
            disabled={currentStep === 0 || loading}
            className="flex items-center gap-2 px-6 py-3 text-gray-400 hover:text-white transition-all disabled:opacity-0"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {currentStep === steps.length - 1 ? (
            <button 
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center gap-2 px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-500/20 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  Pay $25 & Publish
                  <CheckCircle2 className="w-5 h-5" />
                </>
              )}
            </button>
          ) : (
            <button 
              onClick={handleNext}
              className="flex items-center gap-2 px-10 py-4 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-2xl transition-all"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
