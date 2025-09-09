'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from '@/components/ui/card'
import { Mail, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isEmailLoading, setIsEmailLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const router = useRouter()

  // ---------------- Email Login ----------------
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsEmailLoading(true)
    try {
      const result = await signIn.email({ email, password })
      if (result.error) {
        toast.error(result.error.message || 'Login failed')
      } else {
        toast.success('Login successful!')
        router.push('/auth/dashboard')
        router.refresh()
      }
    } catch (err) {
      toast.error('An unexpected error occurred')
    } finally {
      setIsEmailLoading(false)
    }
  }

  // ---------------- Google OAuth ----------------
  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true)
    try {
      // Better Auth will redirect the user automatically
      signIn.social({
        provider: 'google',
        callbackURL: '/auth/dashboard', // user will land here after successful login
      })
    } catch (err) {
      toast.error('Google login failed')
      setIsGoogleLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-linkbird-50 to-linkbird-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-linkbird-900 mb-2">LinkBird</h1>
          <p className="text-linkbird-700">Welcome back to your dashboard</p>
        </div>

        <Card>
          <CardHeader className="space-y-4">
            <div>
              <CardTitle className="text-2xl text-center">Continue with an account</CardTitle>
              <CardDescription className="text-center">
                You must log in or register to continue.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Google Login */}
            <Button
              variant="outline"
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading}
              className="w-full h-12"
            >
              {isGoogleLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              )}
              Continue with Google
            </Button>

            {/* Email Login */}
            <form onSubmit={handleEmailLogin} className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isEmailLoading}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isEmailLoading}
              />
              <Button
                type="submit"
                className="w-full bg-linkbird-600 hover:bg-linkbird-700"
                disabled={isEmailLoading}
              >
                {isEmailLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  'Login with Email'
                )}
              </Button>
            </form>

            <div className="text-center text-sm text-muted-foreground">
              New User?{' '}
              <Link href="/auth/register" className="text-linkbird-600 hover:underline font-medium">
                Create Account
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
