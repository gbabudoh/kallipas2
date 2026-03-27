import { getSiteSettings } from '@/app/actions/settings'
import SettingsForm from './settings-form'

export default async function AdminSettingsPage() {
  // Fetch current site settings to pre-fill the form
  const settings = await getSiteSettings()

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white/50 backdrop-blur-xl border border-white p-8 rounded-[2rem] shadow-sm">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-500 bg-clip-text text-transparent mb-2">
          Global Site Settings
        </h1>
        <p className="text-slate-500 font-medium mb-8">
          Manage homepage content, hero images, and platform branding.
        </p>
        
        <SettingsForm initialSettings={settings} />
      </div>
    </div>
  )
}
