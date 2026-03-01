import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth-store";
import type { ReactNode } from "react";

export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, isAuthenticated } = useAuthStore();
  if (!isAuthenticated || user?.role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
}
