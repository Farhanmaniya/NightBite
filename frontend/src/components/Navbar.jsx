import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User, Menu, X, LogOut, Package } from "lucide-react";
import { useCart } from "../context/CartContext";
import logo from "../assets/logo.svg";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { cartItems } = useCart();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const token = localStorage.getItem("token");

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [cartAnimate, setCartAnimate] = useState(false);

  useEffect(() => {
    if (cartCount > 0) {
      setCartAnimate(true);
      setTimeout(() => setCartAnimate(false), 300);
    }
  }, [cartCount]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: "Home", path: "/home" },
    { label: "Menu", path: "/menu" },
    { label: "Contact", path: "/contact" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-strong shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/home" className="relative group">
          <img src={logo} alt="NightBite" className="h-12 transition-transform duration-300 group-hover:scale-105" />
        </Link>

        {/* NAV LINKS — Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-all duration-300 relative group ${
                isActive(link.path)
                  ? "text-[#FF6B35]"
                  : "text-[#94A3B8] hover:text-[#F1F5F9]"
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1.5 left-0 h-0.5 rounded-full bg-[#FF6B35] transition-all duration-300 ${
                  isActive(link.path) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}
        </div>

        {/* RIGHT SIDE — Cart + Profile */}
        {token ? (
          <div className="hidden md:flex items-center gap-3" ref={dropdownRef}>
            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2.5 rounded-xl text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#1E293B]/80 transition-all duration-300"
            >
              <ShoppingCart className="w-5 h-5" />
              <span
                className={`absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-[#FF6B35] text-white text-[10px] font-bold rounded-full flex items-center justify-center transition-all duration-300 ${
                  cartAnimate ? "animate-cart-bounce" : ""
                }`}
              >
                {cartCount}
              </span>
            </Link>

            {/* Profile Icon */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`p-2.5 rounded-xl text-[#94A3B8] hover:text-[#F1F5F9] border transition-all duration-300 relative ${
                dropdownOpen 
                  ? "bg-[#1E293B] border-[#FF6B35] text-[#F1F5F9]" 
                  : "border-[#334155] hover:border-[#FF6B35] hover:bg-[#1E293B]/80"
              }`}
            >
              <User className="w-5 h-5" />
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute top-16 right-4 w-56 glass rounded-2xl shadow-2xl shadow-black/50 z-50 overflow-hidden animate-scale-in">
                {/* User Info */}
                <div className="px-4 py-3 border-b border-[#334155]/60">
                  <p className="text-[#F1F5F9] font-semibold text-sm">
                    {user?.name}
                  </p>
                  <p className="text-[#64748B] text-xs mt-0.5">{user?.email}</p>
                </div>

                {/* Menu Items */}
                <div className="flex flex-col py-1">
                  <Link
                    to="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/5 transition-all duration-200"
                  >
                    <User className="w-4 h-4" /> Profile
                  </Link>
                  <Link
                    to="/orders"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/5 transition-all duration-200"
                  >
                    <Package className="w-4 h-4" />
                    My Orders
                  </Link>
                </div>

                {/* Logout */}
                <div className="border-t border-[#334155]/60 py-1">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-all duration-200 w-full"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/"
            className="hidden md:flex items-center gap-2 bg-[#FF6B35] hover:bg-[#ff8255] text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#FF6B35]/20 active:scale-95"
          >
            Login
          </Link>
        )}

        {/* MOBILE — Hamburger */}
        <button
          className="md:hidden p-2 text-[#94A3B8] hover:text-[#F1F5F9] transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="relative w-5 h-5">
            <X className={`w-5 h-5 absolute inset-0 transition-all duration-300 ${menuOpen ? "opacity-100 rotate-0" : "opacity-0 rotate-90"}`} />
            <Menu className={`w-5 h-5 absolute inset-0 transition-all duration-300 ${menuOpen ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"}`} />
          </div>
        </button>
      </div>

      {/* MOBILE MENU — Animated */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ease-out ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="glass-strong px-4 py-4 flex flex-col gap-4 border-t border-[#334155]/40">
          {navLinks.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium transition-all duration-300 ${
                isActive(link.path) ? "text-[#FF6B35]" : "text-[#94A3B8] hover:text-[#F1F5F9]"
              }`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-4 pt-2 border-t border-[#334155]/40">
            <Link
              to="/cart"
              className="flex items-center gap-2 text-[#94A3B8] text-sm hover:text-[#F1F5F9] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              <ShoppingCart className="w-4 h-4" /> Cart ({cartCount})
            </Link>
            <Link
              to="/profile"
              className="flex items-center gap-2 text-[#94A3B8] text-sm hover:text-[#F1F5F9] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              <User className="w-4 h-4" /> Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
