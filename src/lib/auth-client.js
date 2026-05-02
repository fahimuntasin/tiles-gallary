"use client";

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" ? window.location.origin : "https://tiles-gallary.vercel.app",
});

export const { useSession, signIn, signOut, updateUser } = authClient;