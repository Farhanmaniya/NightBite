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

// 👇 This component controls WHERE Navbar shows up
const Layout = ({ children }) => {
  const location = useLocation();

  // Pages where Navbar should NOT appear
  const hideNavbarOn = ["/", "/signup", "/admin", "/admin/dashboard", "/admin/orders", "/admin/menu", "/admin/users", "/admin/coupons"];

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
      <Layout>
        <Routes>
          {/* Auth pages — no Navbar */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* App pages — Navbar visible */}
          <Route path="/home" element={<Home />} />

          {/* Add more routes below as we build */}
          {/* <Route path="/restaurants" element={<Restaurants />} /> */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/menu" element={<AdminMenu />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/coupons" element={<AdminCoupons />} />
          <Route path="/menu" element={<Menu />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;