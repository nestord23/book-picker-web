"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { apiFetch } from "@/lib/api";
import type { AuthResponse, LoginCredentials, RegisterData, User } from "@/lib/types";

const TOKEN_KEY = "token";
const TOKEN_COOKIE = "auth_token";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function storeSession(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
  document.cookie = `${TOKEN_COOKIE}=${token}; path=/; max-age=86400; samesite=lax`;
}

function clearSession(): void {
  localStorage.removeItem(TOKEN_KEY);
  document.cookie = `${TOKEN_COOKIE}=; path=/; max-age=0`;
}

function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(() => getStoredToken() !== null);

  useEffect(() => {
    const token = getStoredToken();
    if (!token) return;

    (async () => {
      try {
        const profile = await apiFetch<User>("/api/users/me");
        setUser(profile);
      } catch {
        clearSession();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      const data = await apiFetch<AuthResponse>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      });
      storeSession(data.token);
      setUser(data.user);
      return { success: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error del servidor";
      return { success: false, error: message };
    }
  }, []);

  const register = useCallback(async (dataToSend: RegisterData) => {
    try {
      const data = await apiFetch<AuthResponse>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(dataToSend),
      });
      storeSession(data.token);
      setUser(data.user);
      return { success: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error del servidor";
      return { success: false, error: message };
    }
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(): AuthContextValue {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext debe usarse dentro de un AuthProvider");
  }
  return context;
}
