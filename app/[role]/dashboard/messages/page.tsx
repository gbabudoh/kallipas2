'use client'

import { useState, useEffect } from 'react'
import { MessageSquare, Search, Filter, Loader2, User as UserIcon, Send, Clock } from 'lucide-react'
import Image from 'next/image'

interface Message {
  id: string
  sender: {
    fullName: string | null
    avatarUrl: string | null
  }
  content: string
  createdAt: string
  isRead: boolean
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [activeMessage, setActiveMessage] = useState<string | null>(null)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch('/api/messages')
        const data = await res.json()
        setMessages(data.messages || [])
        // Set first message active by default for desktop demo
        if (data.messages && data.messages.length > 0) {
          setActiveMessage(data.messages[0].id)
        }
      } catch (err) {
        console.error('Failed to fetch messages:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchMessages()
  }, [])

  const activeMsgData = messages.find(m => m.id === activeMessage)

  return (
    <div className="h-[calc(100vh-160px)] flex gap-8 animate-in fade-in duration-1000">
      {/* Messages List Panel */}
      <div className="w-full lg:w-[450px] flex flex-col bg-white/60 backdrop-blur-3xl rounded-[3rem] overflow-hidden border border-white shadow-2xl relative">
        <div className="absolute inset-0 bg-mesh-gradient opacity-5 pointer-events-none" />
        
        <div className="p-8 border-b border-slate-50 space-y-6 relative z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black italic tracking-tighter flex items-center gap-3 text-slate-950 underline decoration-wavy decoration-[#0eaa99]/20 underline-offset-8">
              <MessageSquare className="w-8 h-8 text-[#0eaa99]" />
              Conversations
            </h2>
            <button className="p-3 hover:bg-slate-50 rounded-2xl transition-all border border-transparent hover:border-slate-100">
              <Filter className="w-5 h-5 text-slate-400" />
            </button>
          </div>
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#0eaa99] transition-colors" />
            <input 
              type="text" 
              placeholder="Search correspondence..."
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-14 pr-6 text-sm focus:outline-none focus:border-[#0eaa99]/30 focus:ring-4 focus:ring-[#0eaa99]/5 transition-all font-black text-slate-600 shadow-inner"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-[#0eaa99] opacity-30" />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Syncing Channels...</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-32 px-10 grayscale opacity-30">
              <MessageSquare className="w-16 h-16 mx-auto mb-6 text-slate-300" />
              <p className="text-xl font-black italic text-slate-400 tracking-tight">No conversations found.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveMessage(msg.id)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveMessage(msg.id); } }}
                  className={`w-full p-8 text-left hover:bg-slate-50/50 transition-all flex gap-5 relative group border-l-[6px] border-transparent cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#0eaa99]/20 ${activeMessage === msg.id ? 'bg-slate-50 border-l-[#0eaa99] shadow-inner' : ''}`}
                >
                  {!msg.isRead && (
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#0eaa99] shadow-lg shadow-[#0eaa99]/50 animate-pulse" />
                  )}
                  <div className="w-16 h-16 rounded-3xl bg-[#0eaa99]/10 flex items-center justify-center border border-[#0eaa99]/20 shrink-0 relative overflow-hidden shadow-lg group-hover:rotate-6 transition-all duration-500">
                    {msg.sender.avatarUrl ? (
                      <Image src={msg.sender.avatarUrl} alt="Avatar" fill sizes="64px" className="object-cover" unoptimized />
                    ) : (
                      <UserIcon className="w-8 h-8 text-[#0eaa99]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-black text-base truncate text-slate-950 group-hover:text-[#0eaa99] transition-colors">{msg.sender.fullName}</span>
                      <span className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em] whitespace-nowrap ml-2 bg-white border border-slate-50 px-2 py-0.5 rounded-full">
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 line-clamp-1 leading-relaxed italic font-bold opacity-80">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Message Content Panel */}
      <div className="hidden lg:flex flex-1 bg-white/80 backdrop-blur-3xl rounded-[3rem] flex-col border border-white shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-gradient opacity-10 pointer-events-none" />
        
        {activeMessage ? (
          <>
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-white/40 relative z-10">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-[#0eaa99]/10 overflow-hidden relative border border-[#0eaa99]/20 shadow-xl group-hover:rotate-6 transition-all">
                  {activeMsgData?.sender.avatarUrl ? (
                    <Image 
                      src={activeMsgData.sender.avatarUrl} 
                      alt="Avatar" 
                      fill 
                      sizes="56px" 
                      className="object-cover"
                      unoptimized 
                    />
                  ) : (
                    <UserIcon className="w-7 h-7 text-[#0eaa99] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-950 tracking-tight italic">{activeMsgData?.sender.fullName}</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#0eaa99] shadow-lg shadow-[#0eaa99]/50 animate-pulse" />
                    <span className="text-[10px] text-slate-400 uppercase tracking-[0.3em] font-black">Secure Line Active</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 p-10 overflow-y-auto custom-scrollbar space-y-10 relative z-10">
              <div className="flex gap-6 max-w-3xl">
                <div className="w-10 h-10 rounded-2xl bg-[#0eaa99]/10 flex items-center justify-center text-[#0eaa99] shrink-0 overflow-hidden relative border border-[#0eaa99]/10 shadow-lg">
                   {activeMsgData?.sender.avatarUrl ? (
                    <Image 
                      src={activeMsgData.sender.avatarUrl} 
                      alt="Avatar" 
                      fill 
                      sizes="40px" 
                      className="object-cover"
                      unoptimized 
                    />
                  ) : (
                    <UserIcon className="w-5 h-5" />
                  )}
                </div>
                <div className="space-y-3">
                  <div className="p-6 bg-slate-50 border border-slate-100 rounded-[1.5rem] rounded-tl-none text-base leading-relaxed text-slate-700 italic font-bold shadow-xl shadow-slate-200/20">
                    {activeMsgData?.content}
                  </div>
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] ml-4 flex items-center gap-2">
                     <Clock className="w-3 h-3" />
                     Dossier Protocol Sync: {new Date(activeMsgData?.createdAt || '').toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-slate-50 bg-slate-50/50 backdrop-blur-3xl relative z-10">
              <div className="flex items-center gap-5 bg-white p-3 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 focus-within:border-[#0eaa99]/40 transition-all">
                <input 
                  type="text" 
                  placeholder="Draft encrypted response..."
                  className="flex-1 bg-transparent py-3 px-6 text-sm focus:outline-none placeholder-slate-300 font-bold text-slate-900"
                />
                <button className="p-4 bg-slate-950 hover:bg-slate-900 text-white rounded-2xl transition-all shadow-2xl shadow-slate-950/20 active:scale-95 group">
                  <Send className="w-5 h-5 text-[#0eaa99] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-16 text-center space-y-8 relative z-10 grayscale opacity-40">
            <div className="w-28 h-28 rounded-[3rem] bg-[#0eaa99]/5 flex items-center justify-center text-[#0eaa99] rotate-12 group hover:rotate-0 transition-all duration-700 border-2 border-dashed border-[#0eaa99]/20 shadow-2xl shadow-[#0eaa99]/5">
              <MessageSquare className="w-14 h-14" />
            </div>
            <div>
              <h3 className="text-4xl font-black italic mb-3 tracking-tighter text-slate-950 underline decoration-wavy decoration-slate-100 underline-offset-8">Correspondence Hub</h3>
              <p className="text-slate-500 max-w-sm mx-auto font-bold text-lg leading-relaxed">Select a high-priority conversation to access full interaction dossiers and maintain real-time strategic sync.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
