import { NextResponse } from 'next/server'

export async function GET() {
  // Mock messages for the demo
  const mockMessages = [
    {
      id: 'msg-1',
      sender: {
        fullName: 'John Doe',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      },
      content: 'I am interested in your listing. Is it still available?',
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      isRead: false,
    },
    {
      id: 'msg-2',
      sender: {
        fullName: 'Jane Smith',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
      },
      content: 'Could we schedule a viewing for tomorrow afternoon?',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      isRead: true,
    },
    {
      id: 'msg-3',
      sender: {
        fullName: 'Kallipas Support',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Support',
      },
      content: 'Welcome to your new dashboard! Let us know if you have any questions.',
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      isRead: true,
    },
  ]

  return NextResponse.json({ messages: mockMessages })
}
