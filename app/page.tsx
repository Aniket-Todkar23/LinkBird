import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export default async function HomePage() {
  // Await headers() because it returns a Promise
  const allHeaders = await headers() 

  const session = await auth.api.getSession({
    headers: allHeaders
  })

  if (session) {
    redirect('/auth/dashboard')
  }

  redirect('/auth/login')
}
