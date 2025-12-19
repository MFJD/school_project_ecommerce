import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import type { JSX } from "react";

export default function PublicOnlyRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    if (user?.role === "superadmin") {
      return <Navigate to="/dashboard" replace />;
    }
    return <Navigate to="/dashboard/products" replace />;
  }

  return children;
}