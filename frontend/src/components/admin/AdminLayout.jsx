import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { Menu, X } from "lucide-react";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#0F0F0F" }}>
      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Drawer Container */}
      <div
        className={`fixed inset-y-0 left-0 z-50 md:sticky md:block transition-transform duration-300 ease-in-out shrink-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <AdminSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar for Mobile/Tablet */}
        <header className="md:hidden flex items-center justify-between px-6 py-4 bg-[#1A1A1A] border-b border-zinc-800 sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-white">
              Night<span style={{ color: "#FF6B35" }}>Bite</span>
            </span>
            <span className="text-zinc-500 text-xs px-2.5 py-0.5 rounded-full bg-zinc-800">
              Admin
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-zinc-800 transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;