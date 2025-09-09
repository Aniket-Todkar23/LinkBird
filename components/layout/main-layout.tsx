'use client'

import { Sidebar } from './sidebar'
import { Header } from './header'
import { ReactNode } from 'react'
import { SessionProvider } from '@/components/providers/session-provider'
import { AuthProvider } from '@/contexts/AuthContext'

interface MainLayoutProps {
  children: ReactNode
  title: string
  description?: string
  headerActions?: ReactNode
}

export function MainLayout({ 
  children, 
  title, 
  description, 
  headerActions 
}: MainLayoutProps) {
  return (
    // Wrap with AuthProvider first, then SessionProvider
    <AuthProvider>
      <SessionProvider>
        <div className="flex h-screen bg-gray-50">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header title={title} description={description}>
              {headerActions}
            </Header>
            <main className="flex-1 overflow-auto">
              {children}
            </main>
          </div>
        </div>
      </SessionProvider>
    </AuthProvider>
  )
}
