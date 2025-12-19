import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing/LandingPage";
import ProductDetailPage from "./pages/landing/ProductDetailPage";
import BillingPage from "./pages/landing/BillingPage";
import ContactPage from "./pages/landing/contact";

import SignInPage from "./pages/auth/SignInPage";
import RegisterPage from "./pages/auth/RegisterPage";

import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardPage from "./pages/dashboard/DashboardPage";
import CategoriesPage from "./pages/dashboard/CategoriesPage";
import ProductsPage from "./pages/dashboard/ProductsPage";

import ProtectedRoute from "./auth/ProtectedRoute";
import PublicOnlyRoute from "./auth/PublicOnlyRoute";

export default function App() {
  return (
    <Routes>
      {/* Public pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="/billing/:productId" element={<BillingPage />} />
      <Route path="/contact" element={<ContactPage />} />

      {/* Auth pages */}
      <Route
        path="/signin"
        element={
          <PublicOnlyRoute>
            <SignInPage />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicOnlyRoute>
            <RegisterPage />
          </PublicOnlyRoute>
        }
      />

      {/* Dashboard protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="products" element={<ProductsPage />} />
      </Route>
    </Routes>
  );
}