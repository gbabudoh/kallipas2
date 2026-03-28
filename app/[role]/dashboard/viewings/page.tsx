import { CalendarDays, Clock, MapPin, User, CheckCircle2, XCircle, AlertCircle } from 'lucide-react'

const MOCK_VIEWINGS = [
  {
    id: 'VIEW-001',
    property: 'Victorian Terrace House',
    address: '14 Elmwood Road, Manchester',
    date: 'Saturday, 29 March 2026',
    time: '11:00 AM',
    agent: 'Rick (Independent Realtor)',
    status: 'Confirmed',
  },
  {
    id: 'VIEW-002',
    property: 'Modern City Apartment',
    address: '9th Floor, Harbour Tower, Liverpool',
    date: 'Tuesday, 1 April 2026',
    time: '2:30 PM',
    agent: 'Alice (Agency Agent)',
    status: 'Pending',
  },
  {
    id: 'VIEW-003',
    property: '4-Bed Detached Home',
    address: '7 Birchwood Close, Leeds',
    date: 'Thursday, 3 April 2026',
    time: '10:00 AM',
    agent: 'Sarah (Private Seller)',
    status: 'Confirmed',
  },
  {
    id: 'VIEW-004',
    property: 'Studio Flat — City Centre',
    address: 'Flat 3B, Central Quarter, Birmingham',
    date: 'Monday, 24 March 2026',
    time: '4:00 PM',
    agent: 'Linda (Letting Agent)',
    status: 'Cancelled',
  },
]

const STATUS_CONFIG: Record<string, { bg: string; text: string; icon: React.ReactNode; label: string }> = {
  Confirmed: {
    bg: 'bg-[#0eaa99]/10 border-[#0eaa99]/20',
    text: 'text-[#0eaa99]',
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    label: 'Confirmed',
  },
  Pending: {
    bg: 'bg-amber-50 border-amber-100',
    text: 'text-amber-500',
    icon: <AlertCircle className="w-3.5 h-3.5" />,
    label: 'Awaiting Confirmation',
  },
  Cancelled: {
    bg: 'bg-rose-50 border-rose-100',
    text: 'text-rose-500',
    icon: <XCircle className="w-3.5 h-3.5" />,
    label: 'Cancelled',
  },
}

export default function ViewingsPage() {
  const upcoming = MOCK_VIEWINGS.filter((v) => v.status !== 'Cancelled')
  const past = MOCK_VIEWINGS.filter((v) => v.status === 'Cancelled')

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-1000">
      <div>
        <h1 className="text-5xl font-black tracking-tight text-slate-900 italic mb-3">
          My <span className="text-[#0eaa99]">Viewings</span>
        </h1>
        <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">
          {upcoming.length} upcoming · {past.length} cancelled
        </p>
      </div>

      {/* Upcoming */}
      <div className="space-y-6">
        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Upcoming</h2>
        {upcoming.map((viewing) => {
          const config = STATUS_CONFIG[viewing.status]
          return (
            <div
              key={viewing.id}
              className="glass-card rounded-[2.5rem] p-10 hover:border-[#0eaa99]/30 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-[#0eaa99]/10"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{viewing.id}</span>
                    <span
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${config.bg} ${config.text}`}
                    >
                      {config.icon}
                      {config.label}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 tracking-tight">{viewing.property}</h3>

                  <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{viewing.address}</span>
                  </div>

                  <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-500">
                    <span className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-[#0eaa99]" />
                      {viewing.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#0eaa99]" />
                      {viewing.time}
                    </span>
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4 text-slate-300" />
                      {viewing.agent}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <button className="px-6 py-3 bg-slate-950 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-all">
                    Add to Calendar
                  </button>
                  <button className="px-6 py-3 border border-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-xl hover:border-rose-200 hover:text-rose-500 transition-all">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Cancelled */}
      {past.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Cancelled</h2>
          {past.map((viewing) => {
            const config = STATUS_CONFIG[viewing.status]
            return (
              <div
                key={viewing.id}
                className="glass-card rounded-[2.5rem] p-10 opacity-60 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{viewing.id}</span>
                      <span
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${config.bg} ${config.text}`}
                      >
                        {config.icon}
                        {config.label}
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-slate-600 tracking-tight">{viewing.property}</h3>
                    <p className="text-xs font-bold text-slate-400">{viewing.date} · {viewing.time}</p>
                  </div>
                  <button className="px-6 py-3 border border-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-xl hover:border-[#0eaa99]/30 hover:text-[#0eaa99] transition-all">
                    Rebook
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
