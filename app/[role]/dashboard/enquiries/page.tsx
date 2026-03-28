import { FileText, MapPin, Clock, CheckCircle2, XCircle, MessageSquare } from 'lucide-react'

const MOCK_ENQUIRIES = [
  {
    id: 'ENQ-001',
    property: 'Victorian Terrace House',
    address: '14 Elmwood Road, Manchester',
    price: '$485,000',
    message: 'Hi, I am very interested in this property. Could we arrange a viewing this weekend?',
    submitted: '2026-03-25',
    status: 'Under Review',
  },
  {
    id: 'ENQ-002',
    property: 'Modern City Apartment',
    address: '9th Floor, Harbour Tower, Liverpool',
    price: '$310,000',
    message: 'Please could you confirm if the parking space is included in the asking price?',
    submitted: '2026-03-22',
    status: 'Responded',
  },
  {
    id: 'ENQ-003',
    property: '4-Bed Detached Home',
    address: '7 Birchwood Close, Leeds',
    price: '$625,000',
    message: 'We are a cash buyer, chain-free. Is the seller open to offers?',
    submitted: '2026-03-18',
    status: 'Pending',
  },
  {
    id: 'ENQ-004',
    property: 'Corner Office Suite',
    address: 'Unit 12, Business Park, Sheffield',
    price: '$2,800 / mo',
    message: 'We would like to arrange a viewing for our team of 12.',
    submitted: '2026-03-10',
    status: 'Declined',
  },
]

const STATUS_STYLES: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
  Pending: {
    bg: 'bg-amber-50 border-amber-100',
    text: 'text-amber-500',
    icon: <Clock className="w-3.5 h-3.5" />,
  },
  'Under Review': {
    bg: 'bg-blue-50 border-blue-100',
    text: 'text-blue-500',
    icon: <FileText className="w-3.5 h-3.5" />,
  },
  Responded: {
    bg: 'bg-[#0eaa99]/10 border-[#0eaa99]/20',
    text: 'text-[#0eaa99]',
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
  },
  Declined: {
    bg: 'bg-rose-50 border-rose-100',
    text: 'text-rose-500',
    icon: <XCircle className="w-3.5 h-3.5" />,
  },
}

export default function EnquiriesPage() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-1000">
      <div>
        <h1 className="text-5xl font-black tracking-tight text-slate-900 italic mb-3">
          My <span className="text-[#0eaa99]">Enquiries</span>
        </h1>
        <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">
          {MOCK_ENQUIRIES.length} enquiries submitted
        </p>
      </div>

      <div className="space-y-6">
        {MOCK_ENQUIRIES.map((enq) => {
          const statusStyle = STATUS_STYLES[enq.status]
          return (
            <div
              key={enq.id}
              className="glass-card rounded-[2.5rem] p-10 hover:border-[#0eaa99]/30 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-[#0eaa99]/10"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{enq.id}</span>
                    <span
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${statusStyle.bg} ${statusStyle.text}`}
                    >
                      {statusStyle.icon}
                      {enq.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 tracking-tight mb-2">{enq.property}</h3>

                  <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mb-4">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{enq.address}</span>
                  </div>

                  <div className="flex items-start gap-3 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <MessageSquare className="w-4 h-4 text-slate-300 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-500 font-medium italic leading-relaxed">&ldquo;{enq.message}&rdquo;</p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-4 flex-shrink-0">
                  <span className="text-2xl font-black text-[#0eaa99] tracking-tighter">{enq.price}</span>
                  <span className="text-[10px] text-slate-300 font-black uppercase tracking-widest">
                    Submitted {enq.submitted}
                  </span>
                  {enq.status === 'Responded' && (
                    <button className="px-6 py-3 bg-slate-950 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-all">
                      View Reply
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
