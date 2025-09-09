'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useUIStore } from '@/lib/stores/ui-store'
import { useSessionContext } from '@/components/providers/session-provider'
import { signOut } from '@/lib/auth-client'
import { 
  LayoutDashboard, 
  Users, 
  Folder,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { toast } from 'sonner'
import { ThemeToggle } from '@/components/layout/theme-toggle'

const navigation = [
  { name: 'Dashboard', href: '/auth/dashboard', icon: LayoutDashboard },
  { name: 'Leads', href: '/auth/leads', icon: Users },
  { name: 'Campaign', href: '/auth/campaigns', icon: Folder },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { sidebarCollapsed, toggleSidebar } = useUIStore()
  const { data: session } = useSessionContext()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await signOut()
      toast.success('Logged out successfully')
      router.push('/auth/login')
    } catch (error) {
      toast.error('Failed to log out')
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <div className={cn(
      "flex h-screen flex-col border-r bg-white dark:bg-gray-900 transition-all duration-300",
      sidebarCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
        {!sidebarCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-linkbird-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">LB</span>
            </div>
            <span className="text-xl font-bold text-linkbird-900 dark:text-white">LinkBird</span>
          </div>
        )}
        <div className="flex items-center space-x-2">
          {!sidebarCollapsed && <ThemeToggle />}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleSidebar}
            className={cn(
              "h-8 w-8 p-0",
              sidebarCollapsed && "mx-auto"
            )}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* User Profile */}
      {session?.user && (
        <div className="p-4 border-b dark:border-gray-700">
          <div className={cn(
            "flex items-center space-x-3",
            sidebarCollapsed && "justify-center"
          )}>
            <Avatar className="h-8 w-8">
              <AvatarImage src={session.user.image || undefined} />
              <AvatarFallback className="bg-linkbird-100 text-linkbird-700">
                {session.user.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{session.user.name}</p>
                <p className="text-xs text-gray-500 truncate">Personal</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Overview Section */}
      {!sidebarCollapsed && (
        <div className="px-4 py-3">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Overview
          </h3>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          
          return (
            <Link key={item.name} href={item.href}>
              <div className={cn(
                "flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                isActive 
                  ? "bg-linkbird-50 text-linkbird-700 border-r-2 border-linkbird-700 dark:bg-gray-800 dark:text-linkbird-400" 
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800",
                sidebarCollapsed && "justify-center px-2"
              )}>
                <item.icon className={cn(
                  "h-5 w-5 flex-shrink-0",
                  isActive ? "text-linkbird-700 dark:text-linkbird-400" : "text-gray-400"
                )} />
                {!sidebarCollapsed && <span>{item.name}</span>}
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Settings & Logout */}
      {!sidebarCollapsed && (
        <div className="px-4 py-3 border-t dark:border-gray-700">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Settings
          </h3>
        </div>
      )}

      <div className="p-4 border-t dark:border-gray-700">
        <Button
          variant="ghost"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className={cn(
            "w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-500 dark:hover:bg-gray-800",
            sidebarCollapsed && "justify-center px-2"
          )}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!sidebarCollapsed && <span className="ml-3">Sign out</span>}
        </Button>
      </div>
    </div>
  )
}
