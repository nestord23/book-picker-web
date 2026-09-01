"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import type { LoginCredentials, RegisterData } from "@/lib/types";

export function useAuth() {
  return useAuthContext();
}

export type { LoginCredentials, RegisterData };
