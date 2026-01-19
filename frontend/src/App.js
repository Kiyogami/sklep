import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

// Store Pages
import StorePage from "@/pages/store/StorePage";
import ProductPage from "@/pages/store/ProductPage";
import CartPage from "@/pages/store/CartPage";
import CheckoutPage from "@/pages/store/CheckoutPage";
import VerificationPage from "@/pages/store/VerificationPage";
import OrderStatusPage from "@/pages/store/OrderStatusPage";

// Admin Pages
import AdminLayout from "@/pages/admin/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminOrders from "@/pages/admin/AdminOrders";
import AdminProducts from "@/pages/admin/AdminProducts";
import AdminVerifications from "@/pages/admin/AdminVerifications";
import AdminSettings from "@/pages/admin/AdminSettings";

// Context
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {/* Store Routes */}
            <Route path="/" element={<StorePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/verification/:orderId" element={<VerificationPage />} />
            <Route path="/order/:orderId" element={<OrderStatusPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="verifications" element={<AdminVerifications />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Routes>
          <Toaster position="top-right" richColors />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
