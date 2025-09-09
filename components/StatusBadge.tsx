'use client';

import { cn } from '@/lib/utils';

export type StatusType = 'active' | 'inactive' | 'pending' | 'completed' | 'failed' | 'success' | 'warning';

interface StatusBadgeProps {
  status: StatusType;
  children: React.ReactNode;
}

const statusStyles: Record<StatusType, string> = {
  active: 'bg-green-100 text-green-800 border-green-200',
  inactive: 'bg-gray-100 text-gray-800 border-gray-200',
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  completed: 'bg-blue-100 text-blue-800 border-blue-200',
  failed: 'bg-red-100 text-red-800 border-red-200',
  success: 'bg-green-100 text-green-800 border-green-200',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
};

export function StatusBadge({ status, children }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        statusStyles[status]
      )}
    >
      {children}
    </span>
  );
}
