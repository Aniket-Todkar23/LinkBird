'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  children?: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {children}
          <div className="hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search..."
                className="pl-10 w-64"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <Bell className="h-5 w-5" />
          </Button>
          
          {user && (
            <div className="flex items-center space-x-2">
              {user.picture ? (
                <img
                  className="h-8 w-8 rounded-full"
                  src={user.picture}
                  alt={user.name}
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-gray-300" />
              )}
              <span className="hidden md:block text-sm font-medium text-gray-700">
                {user.name}
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}