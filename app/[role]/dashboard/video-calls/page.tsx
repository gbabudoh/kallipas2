'use client'

import { useState, useEffect, useCallback } from 'react'
import { Video, Phone, PhoneOff, Clock, CheckCircle2, XCircle, Loader2 } from 'lucide-react'
import VideoRoom from '@/components/video/video-room'

interface VideoCallData {
  id: string
  roomName: string
  status: string
  createdAt: string
  scheduledAt: string | null
  listing: { title: string; city: string | null; country: string | null; images: string[] } | null
  requester: { fullName: string | null; avatarUrl: string | null } | null
  owner: { fullName: string | null; avatarUrl: string | null } | null
}

export default function VideoCallsPage() {
  const [calls, setCalls] = useState<VideoCallData[]>([])
  const [loading, setLoading] = useState(true)
  const [activeRoom, setActiveRoom] = useState<string | null>(null)
  const userId = 'dev-user-001'

  const fetchCalls = useCallback(async () => {
    try {
      const res = await fetch(`/api/video-calls?userId=${userId}`)
      const data = await res.json()
      setCalls(data.calls || [])
    } catch (err) {
      console.error('Failed to fetch calls:', err)
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    fetchCalls()
  }, [fetchCalls])

  const handleAction = async (callId: string, action: 'accepted' | 'declined') => {
    try {
      await fetch('/api/video-calls', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ callId, action }),
      })
      fetchCalls()
    } catch (err) {
      console.error('Action failed:', err)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'requested':
        return (
          <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-500 uppercase tracking-widest">
            <Clock className="w-3 h-3" /> Pending
          </span>
        )
      case 'accepted':
        return (
          <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full bg-green-500/10 text-green-500 uppercase tracking-widest">
            <CheckCircle2 className="w-3 h-3" /> Accepted
          </span>
        )
      case 'declined':
        return (
          <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full bg-red-500/10 text-red-500 uppercase tracking-widest">
            <XCircle className="w-3 h-3" /> Declined
          </span>
        )
      default:
        return null
    }
  }

  if (activeRoom) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setActiveRoom(null)}
          className="text-gray-400 hover:text-white text-sm font-medium transition-colors"
        >
          ← Back to Calls
        </button>
        <VideoRoom
          roomName={activeRoom}
          participantName={userId}
          onLeave={() => setActiveRoom(null)}
        />
      </div>
    )
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 bg-slate-50/50 p-8 rounded-[3rem]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-black mb-4 italic tracking-tighter text-slate-950 underline decoration-wavy decoration-[#0eaa99]/20 underline-offset-8">Visual Perimeters</h1>
          <p className="text-lg font-bold text-slate-400">Manage your property viewing dossiers and live syncs</p>
        </div>
        <div className="flex items-center gap-4 px-8 py-4 bg-white border border-slate-100 rounded-[1.5rem] shadow-xl shadow-slate-200/50">
          <Video className="w-6 h-6 text-[#0eaa99]" />
          <span className="text-sm font-black text-slate-950 uppercase tracking-[0.2em]">{calls.length} Active Channels</span>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-40 gap-6">
          <div className="relative">
            <Loader2 className="w-16 h-16 animate-spin text-[#0eaa99] opacity-30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Video className="w-6 h-6 text-[#0eaa99]" />
            </div>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] animate-pulse">Establishing Secure Uplink...</p>
        </div>
      ) : calls.length === 0 ? (
        <div className="bg-white/60 backdrop-blur-3xl rounded-[4rem] p-24 text-center border border-white shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-mesh-gradient opacity-10 pointer-events-none" />
          <div className="w-32 h-32 mx-auto mb-10 rounded-[3rem] bg-[#0eaa99]/5 border-2 border-dashed border-[#0eaa99]/20 flex items-center justify-center group-hover:rotate-12 transition-all duration-700">
            <Video className="w-16 h-16 text-[#0eaa99] opacity-40" />
          </div>
          <h3 className="text-4xl font-black mb-4 italic tracking-tighter text-slate-950">Visual Feed Inactive</h3>
          <p className="text-slate-400 max-w-md mx-auto font-bold text-lg leading-relaxed">
            When buyers request a direct visual perimeter viewing for one of your elite listings, the encrypted stream will manifest here.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {calls.map((call) => (
            <div key={call.id} className="bg-white/80 backdrop-blur-3xl rounded-[2.5rem] p-8 flex items-center justify-between group hover:border-[#0eaa99]/30 border border-slate-50 transition-all shadow-xl hover:shadow-2xl">
              <div className="flex items-center gap-8">
                <div className="w-20 h-20 rounded-[2rem] bg-[#0eaa99]/10 flex items-center justify-center border border-[#0eaa99]/20 shadow-lg group-hover:rotate-6 transition-all duration-500">
                  <Video className="w-8 h-8 text-[#0eaa99]" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-950 tracking-tight italic mb-2 group-hover:text-[#0eaa99] transition-colors">{call.listing?.title || 'Classified Asset'}</h3>
                  <p className="text-base font-bold text-slate-400 flex items-center gap-3">
                    <span className="text-[#0eaa99]">Initiator:</span> {call.requester?.fullName || 'Anonymous Agent'} 
                    <span className="text-slate-200">•</span> 
                    {new Date(call.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                {getStatusBadge(call.status)}

                {call.status === 'requested' && (
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleAction(call.id, 'accepted')}
                      className="p-4 bg-[#0eaa99]/10 hover:bg-[#0eaa99]/20 text-[#0eaa99] rounded-2xl transition-all shadow-lg shadow-[#0eaa99]/5 hover:scale-110 active:scale-95"
                      title="Authorize Stream"
                    >
                      <Phone className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => handleAction(call.id, 'declined')}
                      className="p-4 bg-rose-50 hover:bg-rose-100 text-rose-500 rounded-2xl transition-all shadow-lg shadow-rose-500/5 hover:scale-110 active:scale-95"
                      title="Decline Protocol"
                    >
                      <PhoneOff className="w-6 h-6" />
                    </button>
                  </div>
                )}

                {call.status === 'accepted' && (
                  <button
                    onClick={() => setActiveRoom(call.roomName)}
                    className="px-10 py-4 bg-slate-950 hover:bg-slate-900 text-white font-black rounded-[1.25rem] text-[10px] uppercase tracking-[0.2em] transition-all shadow-2xl shadow-slate-950/30 hover:scale-105 active:scale-95 flex items-center gap-3"
                  >
                    Establish Sync
                    <Video className="w-4 h-4 text-[#0eaa99]" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
