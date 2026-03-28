import { NextResponse } from 'next/server'

export async function GET() {
  // Mock data for the internal mailbox
  const mockMail = {
    inbox: [
      {
        id: 'mail-1',
        sender: 'Kallipas Administration',
        subject: 'Welcome to Kallipas',
        preview: 'We are thrilled to have you onboard. Your account is now active...',
        content: 'Dear User,\n\nWe are thrilled to have you onboard. Your account is now active. You now have access to listings and advanced analytics.\n\nBest regards,\nKallipas Team',
        date: new Date(Date.now() - 3600000).toISOString(),
        isRead: false,
        priority: 'high'
      },
      {
        id: 'mail-2',
        sender: 'Support Team',
        subject: 'Scheduled Maintenance Notice',
        preview: 'Please be advised that we will be performing scheduled maintenance...',
        content: 'Hi there,\n\nPlease be advised that we will be performing scheduled maintenance on Sunday, April 2nd, from 02:00 to 04:00 GMT. Some services may be temporarily unavailable.\n\nThank you for your patience.',
        date: new Date(Date.now() - 86400000).toISOString(),
        isRead: true,
        priority: 'normal'
      }
    ],
    sent: [
      {
        id: 'mail-sent-1',
        recipient: 'Legal Department',
        subject: 'Listing Verification Documents',
        preview: 'Attached are the required documents for the 123 Maple Street listing...',
        content: 'To whom it may concern,\n\nAttached are the required documents for the 123 Maple Street listing. Please let me know once they have been reviewed.\n\nRegards,\nSarah',
        date: new Date(Date.now() - 172800000).toISOString(),
      }
    ]
  }

  return NextResponse.json(mockMail)
}

export async function POST(request: Request) {
  const body = await request.json()
  // Simulate sending mail
  console.log('Sending internal mail:', body)
  return NextResponse.json({ success: true, message: 'Mail sent successfully' })
}
