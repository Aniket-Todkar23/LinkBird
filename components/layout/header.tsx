'use client'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useUIStore } from '@/lib/stores/ui-store'

interface HeaderProps {
  title: string
  description?: string
  children?: React.ReactNode
}

export function Header({ title, description, children }: HeaderProps) {
  const { searchQuery, setSearchQuery } = useUIStore()

  return (
    <div className="border-b bg-white px-6 py-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
          {description && (
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          )}
        </div>
        {children}
      </div>
    </div>
  )
}