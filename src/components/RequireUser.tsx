import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/stores/auth-store";

export function RequireUser() {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    // not logged in at all
    return <Navigate to="/login" replace />;
  }

  // admins should be redirected to the admin panel instead of browsing customer pages
  if (user?.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  // render whatever nested routes are defined
  return <Outlet />;
}
