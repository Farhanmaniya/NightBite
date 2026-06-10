import AdminLayout from "../../components/admin/AdminLayout";
import { useEffect, useState } from "react";
import API from "../../api/axios";
import { IndianRupee } from "lucide-react";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";  

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const updateStatus = async (id, status) => {
    const toastId = toast.loading("Updating order status...");
    try {
      const response = await API.put(`/orders/${id}`, {
        status,
      });

      setOrders((prev) =>
        prev.map((order) => (order._id === id ? response.data : order)),
      );
      toast.dismiss(toastId);
      toast.success("Order status updated successfully!");
    } catch (error) {
      console.log(error);
      toast.dismiss(toastId);
      toast.error("Failed to update order status");
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await API.get("/orders/all");

        setOrders(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Loader />
    );
  }

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
          {orders.map((order) => (
            <div
              className="grid grid-cols-5 px-6 py-4 border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-all items-center"
              key={order._id.slice(-6)}
            >
              <span className="text-zinc-400 text-sm">
                #{order._id.slice(-6)}
              </span>
              <span className="text-white text-sm font-medium">
                {order.user?.name}
              </span>
              <span className="text-white text-sm flex items-center gap-0.25">
                <IndianRupee className="w-4 h-4" />
                {order.totalAmount}
              </span>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full w-fit ${
                  order.status === "Delivered"
                    ? "bg-green-500/20 text-green-400"
                    : order.status === "Preparing"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-red-500/20 text-red-400"
                }`}
              >
                {order.status}
              </span>
              {/* Action - change status */}
              <select
                className="bg-zinc-800 text-zinc-400 text-xs rounded-lg px-2 py-1.5 outline-none border border-zinc-700 hover:border-[#FF6B35] transition-all cursor-pointer w-fit"
                value={order.status}
                onChange={(e) => {
                  updateStatus(order._id, e.target.value);
                }}
              >
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
