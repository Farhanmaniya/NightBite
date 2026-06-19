import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminOrders from "./pages/admin/AdminOrders";
import Dashboard from "./pages/admin/Dashboard";
import AdminMenu from "./pages/admin/AdminMenu";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminCoupons from "./pages/admin/AdminCoupons";
import Menu from "./pages/Menu";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import AdminSettings from "./pages/admin/AdminSettings";

// 👇 This component controls WHERE Navbar shows up
const Layout = ({ children }) => {
  const location = useLocation();

  // Pages where Navbar should NOT appear
  const hideNavbarOn = [
    "/",
    "/signup",
    "/admin",
    "/admin/dashboard",
    "/admin/orders",
    "/admin/menu",
    "/admin/users",
    "/admin/coupons",
    "/admin/settings"
  ];

  const shouldShowNavbar = !hideNavbarOn.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      {children}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          {/* Auth pages — no Navbar */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          {/* Add more routes below as we build */}
          {/* <Route path="/restaurants" element={<Restaurants />} /> */}

          {/* User routes - wrap with ProtectedRoute */}
          <Route path="/home" element={<Home />} />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="/menu" element={<Menu />} />

          {/* Admin routes - wrap with adminOnly */}
          <Route path="/admin/settings" element={
            <ProtectedRoute adminOnly>
              <AdminSettings />
            </ProtectedRoute>
          } />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute adminOnly>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute adminOnly>
                <AdminOrders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/menu"
            element={
              <ProtectedRoute adminOnly>
                <AdminMenu />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <ProtectedRoute adminOnly>
                <AdminUsers />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/coupons"
            element={
              <ProtectedRoute adminOnly>
                <AdminCoupons />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
