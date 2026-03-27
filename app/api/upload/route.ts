import { NextResponse } from 'next/server'
import { uploadImage } from '@/utils/minio'

export async function POST(req: Request) {
  try {
    // During migration: skip auth check, allow uploads
    const formData = await req.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`
    
    const url = await uploadImage(fileName, buffer, file.size)

    return NextResponse.json({ url })
  } catch (error: unknown) {
    console.error('Upload error:', error)
    const message = error instanceof Error ? error.message : 'Upload failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
