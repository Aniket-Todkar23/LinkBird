'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Bell, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

interface HeaderProps {
  children?: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
  const { user } = useAuth();
  const pathname = usePathname();

  const breadcrumbs = pathname.split('/').filter(Boolean);

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-sm font-medium text-gray-600 dark:text-gray-300">
          {breadcrumbs.map((crumb, idx) => (
            <div key={idx} className="flex items-center">
              <span className="capitalize">{crumb}</span>
              {idx < breadcrumbs.length - 1 && (
                <ChevronRight className="h-4 w-4 mx-1 text-gray-400 dark:text-gray-500" />
              )}
            </div>
          ))}
        </div>

        {/* Right side: Notifications + User */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <Bell className="h-5 w-5" />
          </Button>

          {user && (
            <div className="flex items-center space-x-2">
              {user.picture ? (
                <Image
                  src={user.picture}
                  alt={user.name || 'User'}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700" />
              )}
              <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300">
                {user.name}
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
