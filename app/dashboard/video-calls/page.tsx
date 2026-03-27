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
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Video Calls</h1>
          <p className="text-gray-400">Manage your property viewing requests</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-900 rounded-xl">
          <Video className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-bold">{calls.length} Total</span>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      ) : calls.length === 0 ? (
        <div className="glass-card rounded-3xl p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-500/10 flex items-center justify-center">
            <Video className="w-8 h-8 text-blue-500" />
          </div>
          <h3 className="text-xl font-bold mb-2">No Video Calls Yet</h3>
          <p className="text-gray-400 max-w-md mx-auto">
            When buyers request a video call about one of your listings, they&apos;ll appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {calls.map((call) => (
            <div key={call.id} className="glass-card rounded-3xl p-6 flex items-center justify-between group hover:border-blue-500/30 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                  <Video className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-bold">{call.listing?.title || 'Unknown Property'}</h3>
                  <p className="text-sm text-gray-400">
                    From: {call.requester?.fullName || 'Anonymous'} • {new Date(call.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {getStatusBadge(call.status)}

                {call.status === 'requested' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAction(call.id, 'accepted')}
                      className="p-2 bg-green-500/10 hover:bg-green-500/20 text-green-500 rounded-xl transition-all"
                      title="Accept"
                    >
                      <Phone className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleAction(call.id, 'declined')}
                      className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition-all"
                      title="Decline"
                    >
                      <PhoneOff className="w-5 h-5" />
                    </button>
                  </div>
                )}

                {call.status === 'accepted' && (
                  <button
                    onClick={() => setActiveRoom(call.roomName)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-blue-500/20"
                  >
                    Join Call
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
