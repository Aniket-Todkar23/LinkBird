'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Sidebar } from '@/components/layout/sidebar'; // Make sure the path is correct
import { Header } from '@/components/layouts/Header';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { ThemeProvider } from "@/components/providers/theme-provider";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-gray-50">
        <div className="flex h-screen">
          {/* Mobile sidebar backdrop */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 z-40 bg-black bg-opacity-25 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <div
            className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            {/* Pass onClose prop */}
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <Header>
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </Header>

            {/* Page content */}
            <main className="flex-1 overflow-y-auto p-6">
              {children}
            </main>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
