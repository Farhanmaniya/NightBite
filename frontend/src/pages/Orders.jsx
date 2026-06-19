import { useEffect, useState } from "react";
import API from "../api/axios";
import { Package, Clock, CheckCircle2, XCircle } from "lucide-react";
import Loader from "../components/Loader";
import Footer from "../components/Footer";

const statusConfig = {
  Delivered: { bg: "bg-emerald-500/15", text: "text-emerald-400", icon: CheckCircle2 },
  Preparing: { bg: "bg-amber-500/15", text: "text-amber-400", icon: Clock },
  Cancelled: { bg: "bg-red-500/15", text: "text-red-400", icon: XCircle },
};

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

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0F172A" }}>
      <div className="px-4 py-24">
        <div className="max-w-3xl mx-auto">
          {/* Page title */}
          <div className="animate-fade-in-up mb-8">
            <h1 className="text-[#F1F5F9] font-bold text-3xl flex items-center gap-2.5">
              <Package className="w-7 h-7 text-[#FF6B35]" /> My Orders
            </h1>
            <p className="text-[#64748B] text-sm mt-1">Track all your orders here</p>
          </div>

          {/* Orders List */}
          <div className="flex flex-col gap-4">
            {orders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-5 animate-fade-in">
                <div className="w-24 h-24 rounded-3xl bg-[#1E293B] border border-[#334155] flex items-center justify-center">
                  <Package className="w-10 h-10 text-[#64748B]" />
                </div>
                <div className="text-center">
                  <p className="text-[#F1F5F9] font-semibold text-lg mb-1">No orders yet</p>
                  <p className="text-[#64748B] text-sm">Your order history will appear here</p>
                </div>
              </div>
            ) : (
              orders.map((order, index) => {
                const config = statusConfig[order.status] || statusConfig.Preparing;
                const StatusIcon = config.icon;
                return (
                  <div
                    key={order._id}
                    className="bg-[#1E293B]/60 backdrop-blur-sm rounded-2xl p-6 border border-[#334155]/50 flex flex-col gap-4 hover:border-[#334155] transition-all duration-200 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {/* Order Header */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-[#F1F5F9] font-bold text-sm">
                          Order #{order._id.slice(-6)}
                        </h3>
                        <p className="text-[#64748B] text-xs mt-1">
                          {new Date(order.createdAt).toLocaleDateString('en-IN', { 
                            day: 'numeric', month: 'short', year: 'numeric' 
                          })}
                        </p>
                      </div>
                      {/* Status Badge */}
                      <span className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${config.bg} ${config.text}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {order.status}
                      </span>
                    </div>

                    {/* Items */}
                    <div className="flex flex-col gap-2 border-t border-[#334155]/40 pt-4">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span className="text-[#94A3B8]">
                            {item.name} × {item.quantity}
                          </span>
                          <span className="text-[#F1F5F9] font-medium">
                            ₹{item.price * item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Total */}
                    <div className="flex justify-between border-t border-[#334155]/40 pt-3">
                      <span className="text-[#94A3B8] text-sm">Total</span>
                      <span className="text-[#FF6B35] font-bold">
                        ₹{getOrderTotal(order.items)}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
};

export default Orders;
