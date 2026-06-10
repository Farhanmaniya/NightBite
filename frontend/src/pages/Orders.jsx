import { useEffect, useState } from "react";
import API from "../api/axios";
import { Package } from "lucide-react";
import Loader from "../components/Loader";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const getOrderTotal = (items) => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await API.get("/orders/my");

        setOrders(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <Loader />

  return (
    <div
      className="min-h-screen px-4 py-24"
      style={{
        backgroundColor: "#0F172A",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Page title */}
        <h1 className="text-[#F1F5F9] font-bold text-2xl mb-8"><span className="flex gap-2 items-center"><Package className="text-[#F6B835] items-center" size={27}/> My Orders</span></h1>

        {/* Orders List */}
        <div className="flex flex-col gap-4">
          {orders.length === 0 ? (
            <div className="text-center text-zinc-500 py-20">
              No orders found.
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order._id}
                className="bg-[#1E293B] rounded-2xl p-6 border border-[#334155] flex flex-col gap-4"
              >
                {/* Order Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-[#F1F5F9] font-bold text-sm">
                      Order #{order._id.slice(-6)}
                    </h3>
                    <p className="text-[#94A3B8] text-xs mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  {/* Status Badge */}
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
                {/* Items */}
                <div className="flex flex-col gap-2 border-t border-[#334155] pt-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-[#94A3B8]">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="text-[#F1F5F9]">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
                {/* Total */}
                <div className="flex justify-between border-t border-[#334155] pt-3">
                  <span className="text-[#94A3B8] text-sm">Total</span>
                  <span className="text-[#FF6B35] font-bold">
                    ₹{getOrderTotal(order.items)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
