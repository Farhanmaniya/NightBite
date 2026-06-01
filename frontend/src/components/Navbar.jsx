import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User, Menu, X, LogOut, Package } from "lucide-react";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { cartItems } = useCart();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { label: "Home", path: "/home" },
    { label: "Menu", path: "/menu" },
    { label: "Orders", path: "/orders" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0F172A]/80 backdrop-blur-md border-b border-[#334155]/60 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/home" className="flex items-center gap-2 group">
          <span className="text-2xl">🌙</span>
          <span className="text-xl font-bold text-[#F1F5F9] group-hover:text-[#FF6B35] transition-colors duration-200">
            Night<span style={{ color: "#FF6B35" }}>Bite</span>
          </span>
        </Link>

        {/* NAV LINKS — Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors duration-200 relative group ${
                isActive(link.path)
                  ? "text-[#FF6B35]"
                  : "text-[#94A3B8] hover:text-[#F1F5F9]"
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-[#FF6B35] transition-all duration-200 ${
                  isActive(link.path) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}
        </div>

        {/* RIGHT SIDE — Cart + Profile */}
        <div className="hidden md:flex items-center gap-3" ref={dropdownRef}>
          {/* Cart Icon */}
          <Link
            to="/cart"
            className="relative p-2 rounded-xl text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#1E293B] transition-all duration-200"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF6B35] text-[#F1F5F9] text-[10px] font-bold rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          </Link>

          {/* Profile Icon */}
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="p-2 rounded-xl text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#1E293B] border border-[#334155] hover:border-[#FF6B35] transition-all duration-200 relative"
          >
            <User className="w-5 h-5" />
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute top-14 right-0 w-56 bg-[#1E293B] border border-[#334155] rounded-2xl shadow-xl shadow-black/40 z-50 overflow-hidden">
              {/* User Info  */}
              <div className="px-4 py-3 border-b border-[#334155]">
                <p className="text-[#F1F5F9] font-semibold text-sm">John Doe</p>
                <p className="text-zinc-500 text-xs mt-0.5">
                  johndoe@example.com
                </p>
              </div>

              {/* Menu Items */}
              <div className="flex flex-col py-2">
                <Link
                  to="/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#1E293B] transition-all"
                >
                  <User className="w-4 h-4" /> Profile
                </Link>
                <Link
                  to="/orders"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#1E293B] transition-all"
                >
                  <span className="text-base"><Package className="w-4 h-4" /></span> My Orders
                </Link>
              </div>

              {/* Logout */}
              <div className="border-t border-[#334155] py-2">
                <button
                  onClick={() => {}}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-[#1E293B] transition-all w-full"
                >
                  <span className="text-base">
                    <LogOut className="w-4 h-4" />
                  </span>{" "}
                  Logout
                </button>
              </div>
            </div>
          )}

          {/* Login Button — uncomment when auth is ready */}
          {/* <Link
            to="/"
            className="text-sm font-semibold px-4 py-2 rounded-xl bg-[#FF6B35] hover:bg-[#ff8255] text-[#F1F5F9] transition-all duration-200"
          >
            Login
          </Link> */}
        </div>

        {/* MOBILE — Hamburger */}
        <button
          className="md:hidden p-2 text-[#94A3B8] hover:text-[#F1F5F9] transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-[#0F172A]/95 backdrop-blur-md border-t border-[#334155] px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive(link.path) ? "text-[#FF6B35]" : "text-zinc-400"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-4 pt-2 border-t border-[#334155]">
            <Link
              to="/cart"
              className="flex items-center gap-2 text-zinc-400 text-sm hover:text-[#F1F5F9] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              <ShoppingCart className="w-4 h-4" /> {cartCount}
            </Link>
            <Link
              to="/profile"
              className="flex items-center gap-2 text-zinc-400 text-sm hover:text-[#F1F5F9] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              <User className="w-4 h-4" /> Profile
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
