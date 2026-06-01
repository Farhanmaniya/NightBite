import AdminLayout from "../../components/admin/AdminLayout";

const AdminOrders = () => {
  return (
    <AdminLayout>
      <div
        className="flex flex-col gap-6"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {/* Page Title */}
        <h1 className="text-white font-bold text-2xl">Orders</h1>

        {/* Orders Table */}
        <div className="bg-[#1A1A1A] rounded-2xl border border-zinc-800 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-5 px-6 py-3 border-b border-zinc-800 bg-zinc-900">
            {["Order ID", "Customer", "Total", "Status", "Action"].map((h) => (
              <span
                key={h}
                className="text-zinc-500 text-xs font-semibold uppercase tracking-widest"
              >
                {h}
              </span>
            ))}
          </div>

          {/* Table Rows */}
          {[
            { id: 1001, name: "John Doe", total: 477, status: "Preparing" },
            { id: 1002, name: "Jane Smith", total: 99, status: "Delivered" },
            { id: 1003, name: "Raj Patel", total: 597, status: "Cancelled" },
            { id: 1004, name: "Sara Khan", total: 199, status: "Preparing" },
          ].map((order) => (
            <div className="grid grid-cols-5 px-6 py-4 border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-all items-center" key={order.id}>
                <span className="text-zinc-400 text-sm">#{order.id}</span>
                <span className="text-white text-sm font-medium">{order.name}</span>
                <span className="text-white text-sm">₹{order.total}</span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full w-fit ${
                    order.status === "Delivered" ? "bg-green-500/20 text-green-400" :
                    order.status === "Preparing" ? "bg-yellow-500/20 text-yellow-400" :
                    "bg-red-500/20 text-red-400"
                }`} >
                    {order.status}
                </span>
                {/* Action - change status */}
                <select className="bg-zinc-800 text-zinc-400 text-xs rounded-lg px-2 py-1.5 outline-none border border-zinc-700 hover:border-[#FF6B35] transition-all cursor-pointer w-fit">
                    <option>Preparing</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                </select>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
