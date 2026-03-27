'use client'

import { useState } from 'react'
import {
  LiveKitRoom,
  VideoConference,
} from '@livekit/components-react'
import '@livekit/components-styles'
import { Loader2, X } from 'lucide-react'

interface VideoRoomProps {
  roomName: string
  participantName: string
  onLeave?: () => void
}

export default function VideoRoom({ roomName, participantName, onLeave }: VideoRoomProps) {
  const [token, setToken] = useState<string | null>(null)
  const [serverUrl, setServerUrl] = useState<string | null>(null)
  const [connecting, setConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const connect = async () => {
    setConnecting(true)
    setError(null)
    try {
      const res = await fetch('/api/livekit/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomName, participantName }),
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to get token')
      }

      setToken(data.token)
      setServerUrl(data.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Connection failed')
    } finally {
      setConnecting(false)
    }
  }

  const handleDisconnect = () => {
    setToken(null)
    setServerUrl(null)
    onLeave?.()
  }

  if (!token || !serverUrl) {
    return (
      <div className="glass-card rounded-3xl p-8 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-blue-500/10 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-blue-600 animate-pulse" />
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Ready to Join Call</h3>
          <p className="text-gray-400 text-sm">Room: {roomName}</p>
        </div>
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400">
            {error}
          </div>
        )}
        <button
          onClick={connect}
          disabled={connecting}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all disabled:opacity-50 flex items-center gap-2 mx-auto"
        >
          {connecting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Connecting...
            </>
          ) : (
            'Join Video Call'
          )}
        </button>
      </div>
    )
  }

  return (
    <div className="relative rounded-3xl overflow-hidden bg-black" style={{ height: '70vh' }}>
      <button
        onClick={handleDisconnect}
        className="absolute top-4 right-4 z-50 p-2 bg-red-600 hover:bg-red-500 rounded-full text-white transition-all"
      >
        <X className="w-5 h-5" />
      </button>
      <LiveKitRoom
        token={token}
        serverUrl={serverUrl}
        connect={true}
        onDisconnected={handleDisconnect}
        data-lk-theme="default"
        style={{ height: '100%' }}
      >
        <VideoConference />
      </LiveKitRoom>
    </div>
  )
}
