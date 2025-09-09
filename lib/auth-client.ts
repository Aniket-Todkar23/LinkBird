'use client'

import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000"
});

export const { signIn, signOut, signUp } = authClient;

// Helper to fetch session manually
export async function getSession() {
  const session = await authClient.getSession();
  return session; // { data, error, isPending }
}
