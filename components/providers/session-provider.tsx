'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getSession } from '@/lib/auth-client';

interface SessionContextType {
  data: any | null;
  refresh: () => Promise<void>;
}

const SessionContext = createContext<SessionContextType | null>(null);

interface SessionProviderProps {
  children: ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
  const [session, setSession] = useState<any | null>(null);

  const fetchSession = async () => {
    const s = await getSession();
    setSession(s);
  }

  useEffect(() => {
    fetchSession();
  }, []);

  return (
    <SessionContext.Provider value={{ data: session, refresh: fetchSession }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSessionContext(): SessionContextType {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSessionContext must be used within a SessionProvider');
  }
  return context;
}
