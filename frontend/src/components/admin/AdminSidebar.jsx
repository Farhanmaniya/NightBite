import { useLocation, Link } from "react-router-dom";
import logoOnly from "../../assets/logo-only.svg";
import {
  LayoutDashboard,
  ShoppingBag,
  UtensilsCrossed,
  Users,
  Ticket,
  LogOut,
  Settings2,
  X,
} from "lucide-react";

const AdminSidebar = ({ onClose }) => {
  const location = useLocation();

  const navLinks = [
    { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Orders", path: "/admin/orders", icon: ShoppingBag },
    { label: "Menu", path: "/admin/menu", icon: UtensilsCrossed },
    { label: "Users", path: "/admin/users", icon: Users },
    { label: "Coupons", path: "/admin/coupons", icon: Ticket },
    { label: "Settings", path: "/admin/settings", icon: Settings2 },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const isActive = (path) => location.pathname === path;

  return (
    <aside
      className="w-64 h-screen bg-[#1A1A1A] border-r border-zinc-800 flex flex-col"
    >
      {/* Logo */}
      <div className="px-6 py-6 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex flex-col">
          <Link to="/admin/dashboard" onClick={onClose} className="flex items-center gap-2">
            <img src={logoOnly} alt="Logo" className="w-8 h-8" />
            <span className="text-xl font-bold text-white">
              Night<span style={{ color: "#FF6B35" }}>Bite</span>
            </span>
          </Link>
          <p className="text-zinc-400 text-xs mt-1">Admin Panel</p>
        </div>
        <button
          onClick={onClose}
          className="md:hidden p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col gap-1 px-2 py-4 flex-1 overflow-y-auto">
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.path}
              to={link.path}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive(link.path)
                  ? "bg-[#FF6B35] text-white shadow-md shadow-[#FF6B35]/25"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              <Icon className="w-4 h-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-zinc-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-zinc-800 transition-all w-full"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
