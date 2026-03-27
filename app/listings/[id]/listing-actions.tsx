'use client'

import { useState } from 'react'
import { Video, MessageSquare, Loader2, CheckCircle2 } from 'lucide-react'

export default function ListingActions({ listingId }: { listingId: string }) {
  const [requesting, setRequesting] = useState(false)
  const [requested, setRequested] = useState(false)

  const handleRequestCall = async () => {
    setRequesting(true)
    try {
      const res = await fetch('/api/video-calls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listingId,
          requesterId: 'dev-user-001',
        }),
      })

      if (res.ok) {
        setRequested(true)
      }
    } catch (err) {
      console.error('Failed to request call:', err)
    } finally {
      setRequesting(false)
    }
  }

  return (
    <div className="space-y-3">
      <button
        onClick={handleRequestCall}
        disabled={requesting || requested}
        className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
          requested
            ? 'bg-green-500/10 text-green-500 border border-green-500/20'
            : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20'
        } disabled:opacity-70`}
      >
        {requesting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Requesting...
          </>
        ) : requested ? (
          <>
            <CheckCircle2 className="w-4 h-4" />
            Call Requested!
          </>
        ) : (
          <>
            <Video className="w-4 h-4" />
            Request Video Call
          </>
        )}
      </button>

      <button className="w-full py-3 rounded-xl font-bold text-sm bg-gray-800 hover:bg-gray-700 text-white transition-all flex items-center justify-center gap-2">
        <MessageSquare className="w-4 h-4" />
        Send Message
      </button>
    </div>
  )
}
