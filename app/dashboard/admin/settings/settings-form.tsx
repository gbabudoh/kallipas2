'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateSiteSettings } from '@/app/actions/settings'
import { type GlobalSiteSettings } from '@/types/settings'
import { Save, Loader2, Image as ImageIcon, Type, Baseline } from 'lucide-react'

export default function SettingsForm({ initialSettings }: { initialSettings: GlobalSiteSettings }) {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState<GlobalSiteSettings>(initialSettings)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage('')
    
    try {
      const res = await updateSiteSettings(formData)
      if (res.error) {
        setMessage(res.error)
      } else {
        setMessage('Settings updated successfully. Changes are now live on the homepage.')
        router.refresh()
      }
    } catch (_err) {
      setMessage('An unexpected error occurred.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {message && (
        <div className={`p-4 rounded-xl text-sm font-medium ${message.includes('error') ? 'bg-red-50 text-red-600' : 'bg-[#9AB17A]/10 text-[#7a8e61]'}`}>
          {message}
        </div>
      )}

      {/* Hero Title */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
          <Type className="w-4 h-4 text-[#9AB17A]" />
          Hero Headline
        </label>
        <input 
          type="text"
          value={formData.heroTitle}
          onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
          required
          className="w-full bg-white/70 border border-slate-200 focus:border-[#9AB17A] rounded-2xl p-4 text-slate-800 font-medium transition-all shadow-sm"
          placeholder="e.g. Own Property, Anywhere."
        />
      </div>

      {/* Hero Subtitle */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
          <Baseline className="w-4 h-4 text-[#9AB17A]" />
          Hero Subtitle
        </label>
        <textarea 
          value={formData.heroSubtitle}
          onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
          required
          rows={3}
          className="w-full bg-white/70 border border-slate-200 focus:border-[#9AB17A] rounded-2xl p-4 text-slate-800 font-medium transition-all shadow-sm resize-none"
          placeholder="e.g. The first global real estate platform..."
        />
      </div>

      {/* Hero Image URL */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-[#9AB17A]" />
          Background Image URL (Unsplash or Cloud Storage)
        </label>
        <input 
          type="url"
          value={formData.heroImageUrl}
          onChange={(e) => setFormData({ ...formData, heroImageUrl: e.target.value })}
          required
          className="w-full bg-white/70 border border-slate-200 focus:border-[#9AB17A] rounded-2xl p-4 text-slate-800 font-medium transition-all shadow-sm"
          placeholder="https://images.unsplash.com/photo-..."
        />
        {formData.heroImageUrl && (
          <div className="mt-4 relative w-full h-48 rounded-2xl overflow-hidden border border-slate-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={formData.heroImageUrl} 
              alt="Preview" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
              <span className="text-white text-sm font-medium drop-shadow-md">Live Preview</span>
            </div>
          </div>
        )}
      </div>

      <div className="pt-6 border-t border-slate-200">
        <button 
          type="submit"
          disabled={isSaving}
          className="px-8 py-4 bg-[#9AB17A] hover:bg-[#88a068] text-white font-bold rounded-2xl transition-all shadow-lg shadow-[#9AB17A]/30 flex items-center gap-2 disabled:opacity-70"
        >
          {isSaving ? (
            <><Loader2 className="w-5 h-5 animate-spin" /> Saving Changes...</>
          ) : (
            <><Save className="w-5 h-5" /> Save Global Settings</>
          )}
        </button>
      </div>
    </form>
  )
}
