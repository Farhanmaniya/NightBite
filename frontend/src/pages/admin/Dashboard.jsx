import { Package, IndianRupee, Users, UtensilsCrossed } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-8">
        {/* Page Title */}
        <h1
          className="text-white font-bold text-2xl"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Dashboard
        </h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Orders", value: "120", icon: Package },
            { label: "Revenue", value: "₹45,000", icon: IndianRupee },
            { label: "Total Users", value: "80", icon: Users },
            { label: "Menu Items", value: "24", icon: UtensilsCrossed },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-[#1A1A1A] rounded-2xl p-5 border border-zinc-800 flex flex-col gap-2"
            >
              <stat.icon className="w-7 h-7 text-[#FF6B35]" />
              <p className="text-zinc-500 text-xs">{stat.label}</p>
              <p className="text-white font-bold text-xl">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="bg-[#1A1A1A] rounded-2xl border border-zinc-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-800">
            <h2
              className="text-white font-bold text-base"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Recent Orders
            </h2>
          </div>
          <div className="flex flex-col">
            {[
              { id: 1001, name: "John Doe", total: 477, status: "Preparing" },
              { id: 1002, name: "Jane Smith", total: 99, status: "Delivered" },
              { id: 1003, name: "Raj Patel", total: 597, status: "Cancelled" },
            ].map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-all"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                <span className="text-zinc-400 text-sm">#{order.id}</span>
                <span className="text-white text-sm font-medium">
                  {order.name}
                </span>
                <span className="text-white text-sm">₹{order.total}</span>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    order.status === "Delivered"
                      ? "bg-green-500/20 text-green-400"
                      : order.status === "Preparing"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
