// components/providers/session-context.tsx
import { createContext } from "react";

// SessionContext will store the unwrapped session object
export const SessionContext = createContext<any | null>(null);
