'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  Folder,
  FileText,
  Settings,
  LogOut,
  X,
  LinkedinIcon,
  MessageSquare,
  Activity
} from 'lucide-react';

interface SidebarProps {
  onClose?: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/auth/dashboard', icon: LayoutDashboard },
  { name: 'Campaigns', href: '/auth/campaigns', icon: Folder },
  { name: 'Leads', href: '/auth/leads', icon: Users },
  { name: 'LinkedIn Accounts', href: '/linkedin-accounts', icon: LinkedinIcon },
  { name: 'Messages', href: '/messages', icon: MessageSquare },
  { name: 'Activity Logs', href: '/activity-logs', icon: Activity },
  { name: 'User Logs', href: '/user-logs', icon: FileText },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <div className="flex h-full flex-col bg-white border-r border-gray-200">
      {/* Logo and close button */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">Campaign Manager</h1>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose} className="lg:hidden">
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* User info */}
      {user && (
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            {user.picture ? (
              <img
                className="h-8 w-8 rounded-full"
                src={user.picture}
                alt={user.name}
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                <Users className="h-4 w-4 text-gray-600" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.name}
              </p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                isActive
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
              onClick={onClose}
            >
              <item.icon
                className={cn(
                  'mr-3 h-5 w-5',
                  isActive ? 'text-blue-700' : 'text-gray-400'
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout button */}
      <div className="px-3 py-4 border-t border-gray-200">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={logout}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Sign out
        </Button>
      </div>
    </div>
  );
}