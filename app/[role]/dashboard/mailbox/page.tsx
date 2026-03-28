'use client'

import { useState, useEffect } from 'react'
import { 
  Inbox, 
  Send as SendIcon, 
  Edit as PenSquare, 
  Search, 
  Trash2, 
  MoreVertical, 
  ArrowLeft,
  Loader2,
  ShieldCheck,
  Fingerprint,
  Scale,
  Gavel,
  History,
  FileText,
  Award,
  Signature
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams } from 'next/navigation'

interface MailItem {
  id: string
  sender?: string
  recipient?: string
  subject: string
  preview: string
  content: string
  date: string
  isRead?: boolean
  priority?: string
  isPrivileged?: boolean
  isCertified?: boolean
}

export default function MailboxPage() {
  const params = useParams()
  const role = params?.role as string
  const isLegal = role === 'legal-agent'

  const [view, setView] = useState<'inbox' | 'sent' | 'compose'>('inbox')
  const [selectedMail, setSelectedMail] = useState<MailItem | null>(null)
  const [mailData, setMailData] = useState<{ inbox: MailItem[], sent: MailItem[] }>({ 
    inbox: [], 
    sent: [] 
  })
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  
  // Compose state
  const [to, setTo] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [isPrivileged, setIsPrivileged] = useState(false)
  const [isCertified, setIsCertified] = useState(false)

  useEffect(() => {
    const fetchMail = async () => {
      // For Legal Agents, we use specialized mock data if API is empty
      try {
        const res = await fetch('/api/mailbox')
        const data = await res.json()
        
        if (isLegal && data.inbox.length === 0) {
           setMailData({
             inbox: [
               {
                 id: 'leg-1',
                 sender: 'Bar Association Official',
                 subject: 'Bar Certification Synchronized',
                 preview: 'Your jurisdictional credentials have been successfully validated...',
                 content: 'Official Notice: Your professional solicitor profile is now synchronized with global escrow perimeters. You may begin drafting high-fidelity agreements.',
                 date: new Date().toISOString(),
                 isRead: false,
                 priority: 'high',
                 isCertified: true
               },
               {
                 id: 'leg-2',
                 sender: 'Chief Paralegal',
                 subject: 'Pending Escrow Release: Listing #1092',
                 preview: 'The bilateral agreement for Listing #1092 requires immediate attorney signature...',
                 content: 'Counselor, we have received the identity dossiers for both buyer and seller. Please review the escrow release perimeters before final signature.',
                 date: new Date(Date.now() - 3600000).toISOString(),
                 isRead: true,
                 isPrivileged: true
               }
             ],
             sent: []
           })
        } else {
           setMailData(data)
        }
      } catch (err) {
        console.error('Failed to fetch mail:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchMail()
  }, [isLegal])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    
    // Simulation: Professional Verification BEFORE send
    if (isLegal && !isCertified) {
       // Just a visual cue
    }

    try {
      await fetch('/api/mailbox', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, subject, body, isPrivileged, isCertified }),
      })
      
      setTimeout(() => {
        setSending(false)
        setView('sent')
        setTo('')
        setSubject('')
        setBody('')
        setIsPrivileged(false)
        setIsCertified(false)
      }, 1500)
    } catch (err) {
      console.error('Failed to send mail:', err)
      setSending(false)
    }
  }

  const currentMailList = view === 'inbox' ? mailData.inbox : mailData.sent

  return (
    <div className="h-[calc(100vh-160px)] flex gap-8 animate-in fade-in duration-1000">
      {/* Sidebar Navigation - Specialized for Attorneys */}
      <div className="w-80 flex flex-col gap-6">
        <button 
          onClick={() => { setView('compose'); setSelectedMail(null); }}
          className="w-full bg-[#0eab9b] hover:bg-[#0ca191] text-white font-black py-6 rounded-3xl transition-all shadow-2xl shadow-[#0eab9b]/30 flex items-center justify-center gap-3 group active:scale-95 uppercase text-xs tracking-[0.2em]"
        >
          <Fingerprint className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          Certified Dispatch
        </button>

        <div className="bg-white/60 backdrop-blur-3xl border border-white shadow-xl rounded-[2.5rem] p-6 flex flex-col gap-2">
           <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-4">Registry Perimeters</label>
           
          <button 
            onClick={() => { setView('inbox'); setSelectedMail(null); }}
            className={`w-full flex items-center justify-between px-5 py-4 rounded-3xl transition-all font-black text-xs uppercase tracking-tighter group ${view === 'inbox' ? 'bg-[#0eab9b]/10 text-[#0eab9b] shadow-inner' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            <div className="flex items-center gap-4">
              <Scale className={`w-5 h-5 ${view === 'inbox' ? 'text-[#0eab9b]' : 'group-hover:text-slate-600'}`} />
              Jurisdictional Inbox
            </div>
            {mailData.inbox.filter(m => !m.isRead).length > 0 && (
              <span className="bg-[#0eab9b] text-white text-[10px] px-2.5 py-0.5 rounded-full font-black shadow-lg shadow-[#0eab9b]/20">
                {mailData.inbox.filter(m => !m.isRead).length}
              </span>
            )}
          </button>
          
          <button 
            onClick={() => { setView('sent'); setSelectedMail(null); }}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-3xl transition-all font-black text-xs uppercase tracking-tighter group ${view === 'sent' ? 'bg-[#0eab9b]/10 text-[#0eab9b] shadow-inner' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            <SendIcon className={`w-5 h-5 ${view === 'sent' ? 'text-[#0eab9b]' : 'group-hover:text-slate-600'}`} />
            Official Transmissions
          </button>

          <div className="h-px bg-slate-100 my-4 mx-4" />

          <button className="w-full flex items-center gap-4 px-5 py-4 rounded-3xl text-slate-400 hover:bg-slate-50 transition-all font-black text-xs uppercase tracking-tighter group">
            <ShieldCheck className="w-5 h-5 group-hover:text-[#0eab9b]" />
            Privileged Vault
          </button>

          <button className="w-full flex items-center gap-4 px-5 py-4 rounded-3xl text-slate-400 hover:bg-slate-50 transition-all font-black text-xs uppercase tracking-tighter group">
            <Trash2 className="w-5 h-5 group-hover:text-rose-500" />
            Archive Destruction
          </button>
        </div>

        {/* Professional Tools Section */}
        <div className="bg-slate-900 rounded-[2.5rem] p-8 space-y-6 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-[#0eab9b]/10 rounded-full blur-3xl -translate-y-12 translate-x-12" />
           <p className="text-[10px] font-black uppercase tracking-widest text-[#0eab9b] relative z-10 italic">Professional Toolkit</p>
           <div className="space-y-4 relative z-10">
              <button className="w-full flex items-center gap-3 text-white/50 hover:text-white transition-all text-[10px] font-bold uppercase tracking-widest text-left">
                 <FileText className="w-4 h-4" /> Drafting Template: NDA
              </button>
              <button className="w-full flex items-center gap-3 text-white/50 hover:text-white transition-all text-[10px] font-bold uppercase tracking-widest text-left">
                 <History className="w-4 h-4" /> Audit Trait Lookup
              </button>
           </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white/80 backdrop-blur-3xl rounded-[4rem] border border-white overflow-hidden flex flex-col shadow-2xl relative">
        <div className="absolute inset-0 bg-mesh-gradient opacity-10 pointer-events-none" />
        
        <AnimatePresence mode="wait">
          {view === 'compose' ? (
            <motion.div 
              key="compose"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col p-12 relative z-10"
            >
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-[#0eab9b]/10 border border-[#0eab9b]/20 flex items-center justify-center text-[#0eab9b]">
                      <PenSquare className="w-6 h-6" />
                   </div>
                   <div>
                      <h2 className="text-4xl font-black italic tracking-tighter text-slate-950">Certified Dispatch</h2>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Solicitor Internal Registry</p>
                   </div>
                </div>
                <button onClick={() => setView('inbox')} className="p-4 hover:bg-slate-50 rounded-2xl transition-all text-slate-400 hover:text-slate-900 border border-transparent hover:border-slate-100">
                  <ArrowLeft className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSend} className="space-y-6 flex-1 flex flex-col">
                <div className="grid grid-cols-2 gap-6">
                  <div className="relative group">
                    <input 
                      type="text" 
                      placeholder="Recipient Identifier" 
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      required
                      className="w-full bg-slate-50 border border-slate-100 rounded-3xl py-5 px-8 text-sm focus:outline-none focus:border-[#0eab9b]/40 focus:ring-4 focus:ring-[#0eab9b]/5 transition-all text-slate-900 font-black placeholder-slate-300 shadow-inner"
                    />
                  </div>
                  <div className="relative group">
                    <input 
                      type="text" 
                      placeholder="Jurisdiction / Subject" 
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                      className="w-full bg-slate-50 border border-slate-100 rounded-3xl py-5 px-8 text-sm focus:outline-none focus:border-[#0eab9b]/40 focus:ring-4 focus:ring-[#0eab9b]/5 transition-all text-slate-900 font-black placeholder-slate-300 shadow-inner"
                    />
                  </div>
                </div>

                <div className="flex-1 relative group">
                  <textarea 
                    placeholder="Document your correspondence..." 
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                    className="w-full h-full bg-slate-50 border border-slate-100 rounded-[2.5rem] py-10 px-10 text-sm focus:outline-none focus:border-[#0eab9b]/40 focus:ring-4 focus:ring-[#0eab9b]/5 transition-all text-slate-900 font-bold placeholder-slate-300 resize-none shadow-inner leading-relaxed min-h-[300px]"
                  />
                  
                  {/* Certified Overlay Flag */}
                  {isCertified && (
                    <div className="absolute top-10 right-10 flex flex-col items-center gap-2 opacity-50 text-[#0eab9b]">
                       <Fingerprint className="w-12 h-12" />
                       <span className="text-[8px] font-black uppercase tracking-widest">Signed with Bar Sync</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-6">
                  <div className="flex items-center gap-8">
                     <button 
                       type="button" 
                       onClick={() => setIsPrivileged(!isPrivileged)}
                       className={`flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all duration-500 font-black text-[10px] uppercase tracking-widest ${isPrivileged ? 'bg-amber-500 border-amber-500 text-white shadow-xl shadow-amber-500/20' : 'bg-white border-slate-100 text-slate-400 whitespace-nowrap'}`}
                     >
                        <ShieldCheck className="w-4 h-4" /> Attorney-Client Privilege
                     </button>
                     <button 
                       type="button" 
                       onClick={() => setIsCertified(!isCertified)}
                       className={`flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all duration-500 font-black text-[10px] uppercase tracking-widest ${isCertified ? 'bg-[#0eab9b] border-[#0eab9b] text-white shadow-xl shadow-[#0eab9b]/20' : 'bg-white border-slate-100 text-slate-400 whitespace-nowrap'}`}
                     >
                        <Award className="w-4 h-4" /> Certification Stamp
                     </button>
                  </div>

                  <button 
                    type="submit"
                    disabled={sending}
                    className="bg-slate-950 hover:bg-slate-900 text-white font-black py-5 px-16 rounded-[1.5rem] transition-all shadow-2xl shadow-slate-900/40 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 uppercase text-[10px] tracking-widest"
                  >
                    {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                      <>
                        <span>Verify & Transmit</span>
                        <Fingerprint className="w-4 h-4 text-[#0eab9b]" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          ) : selectedMail ? (
            <motion.div 
              key="detail"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="flex-1 flex flex-col relative z-10"
            >
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white/40">
                <button onClick={() => setSelectedMail(null)} className="p-4 hover:bg-slate-50 rounded-2xl transition-all text-slate-400 hover:text-slate-900 border border-transparent hover:border-slate-100">
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="flex items-center gap-4">
                  {selectedMail.isCertified && (
                    <span className="flex items-center gap-2 px-4 py-2 bg-[#0eab9b]/5 border border-[#0eab9b]/10 text-[#0eab9b] text-[8px] font-black uppercase tracking-widest rounded-full italic">
                      <Award className="w-3 h-3" /> Certified Legal Record
                    </span>
                  )}
                  {selectedMail.isPrivileged && (
                    <span className="flex items-center gap-2 px-4 py-2 bg-amber-500/5 border border-amber-500/10 text-amber-500 text-[8px] font-black uppercase tracking-widest rounded-full italic">
                      <ShieldCheck className="w-3 h-3" /> Privileged Record
                    </span>
                  )}
                </div>
              </div>

              <div className="flex-1 p-12 overflow-y-auto custom-scrollbar">
                <div className="max-w-4xl mx-auto space-y-12">
                  <div className="space-y-6">
                    <h1 className="text-6xl font-black text-slate-950 tracking-tighter leading-tight italic underline decoration-wavy decoration-[#0eab9b]/10 underline-offset-[16px]">{selectedMail.subject}</h1>
                    <div className="flex items-center justify-between py-12 border-y border-slate-100 bg-slate-50/50 rounded-xl px-8">
                      <div className="flex items-center gap-8">
                        <div className="w-20 h-20 rounded-[2rem] bg-white shadow-2xl flex items-center justify-center text-[#0eab9b] font-black border border-slate-50 text-2xl">
                          {view === 'inbox' ? (selectedMail.sender?.[0] || 'K') : (selectedMail.recipient?.[0] || 'T')}
                        </div>
                        <div>
                          <p className="text-xl font-black text-slate-950">
                             {view === 'inbox' ? `Counsel: ${selectedMail.sender}` : `Correspondence To: ${selectedMail.recipient}`}
                          </p>
                          <p className="text-[10px] text-[#0eab9b] uppercase tracking-[0.4em] font-black flex items-center gap-2">
                            <Fingerprint className="w-3 h-3" /> Verified Dispatch ID: {selectedMail.id}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                         <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mb-1">
                           Record Date
                         </p>
                         <p className="text-lg font-black text-slate-950 italic">{new Date(selectedMail.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-slate-600 leading-[2.4] text-xl font-bold border-l-8 border-[#0eab9b]/10 pl-12 py-6 italic opacity-85">
                    {selectedMail.content}
                  </div>
                  
                  {/* Digital Signature Simulation */}
                  <div className="pt-20 flex flex-col items-center gap-4 opacity-10">
                    <div className="w-px h-24 bg-slate-200" />
                    <Signature className="w-16 h-16 text-slate-400" />
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Digitally Synchronized Record</p>
                  </div>
                </div>
              </div>

              <div className="p-12 border-t border-slate-100 flex justify-end gap-6 bg-slate-50/50 backdrop-blur-3xl">
                <button className="px-12 py-5 rounded-2xl border border-slate-200 bg-white hover:border-[#0eab9b]/40 transition-all font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-950 shadow-xl shadow-slate-200/50">Dossier Forward</button>
                <button 
                  onClick={() => {
                    setTo(view === 'inbox' ? (selectedMail.sender || '') : (selectedMail.recipient || ''))
                    setSubject(`RE: LEGAL // ${selectedMail.subject}`)
                    setBody(`\n\n--- LEGAL REFERENCE --- \nOn ${new Date(selectedMail.date).toLocaleString()}, ${selectedMail.sender} certified: \n"${selectedMail.preview}..."`)
                    setView('compose')
                    setSelectedMail(null)
                  }}
                  className="px-12 py-5 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white transition-all font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-slate-900/30 hover:scale-[1.02] active:scale-95"
                >
                  Attorney Response
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col relative z-10"
            >
              <div className="p-10 border-b border-slate-100 flex items-center justify-between bg-white/40">
                <div className="relative flex-1 max-w-xl group">
                   <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#0eab9b] transition-colors" />
                   <input 
                     type="text" 
                     placeholder={`Audit jurisdictional ${view} records...`}
                     className="w-full bg-slate-50 border border-slate-100 rounded-3xl py-4.5 pl-14 pr-8 text-xs focus:outline-none focus:border-[#0eab9b]/30 focus:ring-4 focus:ring-[#0eab9b]/5 transition-all font-bold text-slate-600 shadow-inner"
                   />
                </div>
                <div className="flex gap-10 items-center ml-10">
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] flex items-center gap-4">
                     <Gavel className="w-3 h-3" />
                     Registry Sequence
                   </span>
                   <button className="p-4 hover:bg-slate-50 rounded-2xl transition-all border border-transparent hover:border-slate-100"><MoreVertical className="w-6 h-6 text-slate-400" /></button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-48 gap-8">
                    <div className="relative">
                      <Loader2 className="w-24 h-24 animate-spin text-[#0eab9b] opacity-20" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Fingerprint className="w-8 h-8 text-[#0eab9b]" />
                      </div>
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] animate-pulse">Syncing Attorney Channel...</p>
                  </div>
                ) : currentMailList.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-48 gap-10 grayscale opacity-30">
                     <div className="w-40 h-40 rounded-[4rem] border-2 border-dashed border-slate-200 flex items-center justify-center">
                       <Inbox className="w-20 h-20 text-slate-300" />
                     </div>
                     <p className="text-4xl font-black italic tracking-tighter text-slate-900 underline decoration-wavy decoration-slate-100 underline-offset-8">No Legal Records Found</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-50">
                    {currentMailList.map((mail) => (
                      <div
                        key={mail.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => setSelectedMail(mail)}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedMail(mail); } }}
                        className={`w-full p-12 text-left hover:bg-slate-50/70 transition-all flex border-l-[8px] border-transparent cursor-pointer outline-none group ${mail.isRead === false ? 'bg-slate-50 border-l-[#0eab9b] shadow-inner' : ''}`}
                      >
                        <div className="w-20 h-20 rounded-[2rem] bg-white border border-slate-100 shadow-xl flex items-center justify-center text-slate-300 font-black group-hover:border-[#0eab9b]/40 group-hover:text-[#0eab9b] transition-all group-hover:-rotate-3 text-2xl">
                          {(view === 'inbox' ? mail.sender : mail.recipient)?.[0] || 'S'}
                        </div>

                        <div className="flex-1 min-w-0 flex flex-col justify-center ml-10">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-xl font-black text-slate-950 group-hover:text-[#0eab9b] transition-colors tracking-tight flex items-center gap-4">
                              {view === 'inbox' ? mail.sender : mail.recipient}
                              {mail.isRead === false && <span className="w-2.5 h-2.5 rounded-full bg-[#0eab9b] shadow-lg shadow-[#0eab9b]/50 animate-pulse" />}
                            </h4>
                            <div className="flex items-center gap-4">
                                {mail.isPrivileged && <ShieldCheck className="w-4 h-4 text-amber-500" />}
                                <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] bg-white border border-slate-100 px-4 py-1.5 rounded-full shadow-sm">
                                  {new Date(mail.date).toLocaleDateString()}
                                </span>
                            </div>
                          </div>
                          <p className="text-2xl font-black text-slate-900/90 truncate mb-1 italic tracking-tighter">
                             {mail.isCertified && '✓ '}{mail.subject}
                          </p>
                          <p className="text-sm text-slate-400 truncate font-bold opacity-70 leading-relaxed mb-1">{mail.preview}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
