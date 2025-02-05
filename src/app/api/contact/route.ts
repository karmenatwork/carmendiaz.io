import { NextResponse } from 'next/server'
import { db } from '@/lib/firebase/client'
import { collection, doc, setDoc, addDoc } from 'firebase/firestore'

export async function POST (req: Request) {

  try {
    const { name, email, message } = await req.json()

    const contactRef = await addDoc(collection(db, 'contacts'), {
      name,
      email,
      message,
      createdAt: new Date(),
    })
    console.log('Document successfully written! ', contactRef.id)

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Error handling contact form:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

