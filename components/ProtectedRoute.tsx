"use client";

import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) {
    return <div className="cargando">Cargando...</div>;
  }

  if (!isAuthenticated) {
    redirect("/");
  }

  return <>{children}</>;
}
