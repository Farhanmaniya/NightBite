import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import { 
  Package, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  MapPin, 
  CreditCard, 
  Tag, 
  ChevronRight, 
  Receipt, 
  ShoppingBag,
  ArrowLeft,
  X
} from "lucide-react";
import Loader from "../components/Loader";
import Footer from "../components/Footer";

const statusConfig = {
  Delivered: { bg: "bg-emerald-500/15", text: "text-emerald-400", border: "border-emerald-500/30", icon: CheckCircle2 },
  Preparing: { bg: "bg-amber-500/15", text: "text-amber-400", border: "border-amber-500/30", icon: Clock },
  Pending: { bg: "bg-blue-500/15", text: "text-blue-400", border: "border-blue-500/30", icon: Clock },
  Cancelled: { bg: "bg-red-500/15", text: "text-red-400", border: "border-red-500/30", icon: XCircle },
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMsg("Please log in to view your orders.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await API.get("/orders/my");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      if (error.response?.status === 401) {
        setErrorMsg("Your session expired. Please log in again.");
      } else {
        setErrorMsg("Failed to load your orders. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getSubtotal = (items = []) => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#0F172A" }}>
      <div className="flex-1 px-4 py-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="animate-fade-in-up mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-[#F1F5F9] font-bold text-3xl flex items-center gap-2.5">
                <Package className="w-8 h-8 text-[#FF6B35]" /> My Orders
              </h1>
              <p className="text-[#64748B] text-sm mt-1">
                Track your active orders and view past order receipts
              </p>
            </div>
            {orders.length > 0 && (
              <span className="self-start sm:self-auto bg-[#1E293B] border border-[#334155] text-[#FF6B35] font-semibold text-xs px-3.5 py-1.5 rounded-full shadow-sm">
                {orders.length} Order{orders.length > 1 ? "s" : ""} Placed
              </span>
            )}
          </div>

          {/* Error / Not Logged In State */}
          {errorMsg ? (
            <div className="bg-[#1E293B]/80 border border-[#334155] rounded-3xl p-10 text-center flex flex-col items-center gap-4 max-w-md mx-auto my-12 shadow-2xl">
              <div className="w-16 h-16 rounded-2xl bg-[#FF6B35]/10 border border-[#FF6B35]/20 flex items-center justify-center">
                <Package className="w-8 h-8 text-[#FF6B35]" />
              </div>
              <div>
                <h3 className="text-[#F1F5F9] font-bold text-lg mb-1">{errorMsg}</h3>
                <p className="text-[#64748B] text-sm">Log in to access your order history and track live deliveries.</p>
              </div>
              <Link
                to="/login"
                className="mt-2 bg-[#FF6B35] hover:bg-[#FF8255] text-white font-bold px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-[#FF6B35]/20 text-sm"
              >
                Log In Now
              </Link>
            </div>
          ) : orders.length === 0 ? (
            /* Empty Orders State */
            <div className="bg-[#1E293B]/60 border border-[#334155]/60 rounded-3xl p-12 text-center flex flex-col items-center justify-center gap-5 my-8 shadow-xl">
              <div className="w-20 h-20 rounded-3xl bg-[#0F172A] border border-[#334155] flex items-center justify-center">
                <ShoppingBag className="w-9 h-9 text-[#64748B]" />
              </div>
              <div>
                <h3 className="text-[#F1F5F9] font-bold text-xl mb-1">No orders yet</h3>
                <p className="text-[#64748B] text-sm max-w-sm">
                  You haven't placed any night-time food orders yet. Explore our delicious menu!
                </p>
              </div>
              <Link
                to="/menu"
                className="mt-2 bg-[#FF6B35] hover:bg-[#FF8255] text-white font-bold px-7 py-3 rounded-xl transition-all shadow-lg shadow-[#FF6B35]/20 text-sm flex items-center gap-2"
              >
                Browse Menu <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            /* Orders List */
            <div className="flex flex-col gap-5">
              {orders.map((order, index) => {
                const config = statusConfig[order.status] || statusConfig.Preparing;
                const StatusIcon = config.icon;
                const subtotal = getSubtotal(order.items);
                const discount = order.discount || 0;
                const finalTotal = order.totalAmount || (subtotal - discount);

                return (
                  <div
                    key={order._id}
                    className="bg-[#1E293B]/70 backdrop-blur-md rounded-2xl p-6 border border-[#334155]/60 hover:border-[#FF6B35]/40 transition-all duration-300 shadow-xl flex flex-col gap-5 group"
                  >
                    {/* Top Row: Order ID, Date & Status */}
                    <div className="flex items-center justify-between border-b border-[#334155]/50 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#F1F5F9] font-bold text-base">
                            Order #{order._id.slice(-6).toUpperCase()}
                          </span>
                          <span className="text-[#64748B] text-xs font-mono">
                            ({order._id})
                          </span>
                        </div>
                        <p className="text-[#64748B] text-xs mt-0.5">
                          {new Date(order.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>

                      {/* Status Badge */}
                      <span className={`flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-full border ${config.bg} ${config.text} ${config.border}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {order.status}
                      </span>
                    </div>

                    {/* Middle Section: Items Summary & Delivery Address */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Items Preview */}
                      <div className="flex flex-col gap-2 bg-[#0F172A]/60 p-4 rounded-xl border border-[#334155]/40">
                        <p className="text-[#94A3B8] text-xs font-semibold uppercase tracking-wider mb-1">
                          Items ({order.items.length})
                        </p>
                        {order.items.map((item, i) => (
                          <div key={i} className="flex justify-between items-center text-xs">
                            <span className="text-[#F1F5F9] font-medium truncate max-w-[200px]">
                              {item.name} <span className="text-[#FF6B35] font-bold">× {item.quantity}</span>
                            </span>
                            <span className="text-[#94A3B8]">₹{item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>

                      {/* Delivery Address & Payment Method */}
                      <div className="flex flex-col justify-between gap-2 bg-[#0F172A]/60 p-4 rounded-xl border border-[#334155]/40 text-xs">
                        <div>
                          <p className="text-[#94A3B8] font-semibold uppercase tracking-wider mb-1.5 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-[#FF6B35]" /> Delivery Address
                          </p>
                          <p className="text-[#F1F5F9] line-clamp-2 leading-relaxed">
                            {order.address || "No address specified"}
                          </p>
                        </div>
                        <div className="flex items-center justify-between border-t border-[#334155]/40 pt-2 mt-1">
                          <span className="text-[#94A3B8] flex items-center gap-1">
                            <CreditCard className="w-3.5 h-3.5 text-[#FF6B35]" /> Payment:
                          </span>
                          <span className="text-[#F1F5F9] font-semibold">
                            {order.paymentMethod === "Online" ? "Paid Online (Razorpay)" : "Cash on Delivery"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Stepper */}
                    <div className="bg-[#0F172A]/40 p-4 rounded-xl border border-[#334155]/30">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-[#94A3B8] font-medium">Delivery Status</span>
                        <span className="font-bold text-[#FF6B35]">{order.status}</span>
                      </div>
                      {order.status === "Cancelled" ? (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs px-3 py-2 rounded-lg text-center font-medium">
                          This order was cancelled.
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          {["Pending", "Preparing", "Delivered"].map((step, sIdx) => {
                            const stepsOrder = ["Pending", "Preparing", "Delivered"];
                            const currentIdx = stepsOrder.indexOf(order.status) !== -1 ? stepsOrder.indexOf(order.status) : 0;
                            const isDone = sIdx <= currentIdx;
                            return (
                              <div key={step} className="flex-1 flex flex-col items-center gap-1">
                                <div
                                  className={`h-1.5 w-full rounded-full transition-all duration-500 ${
                                    isDone ? "bg-[#FF6B35]" : "bg-[#334155]"
                                  }`}
                                />
                                <span className={`text-[10px] ${isDone ? "text-[#FF6B35] font-bold" : "text-[#64748B]"}`}>
                                  {step}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Bottom Bar: Total & Details Modal Button */}
                    <div className="flex items-center justify-between border-t border-[#334155]/50 pt-3">
                      <div>
                        <span className="text-[#94A3B8] text-xs">Total Amount</span>
                        <p className="text-[#FF6B35] font-bold text-xl">₹{finalTotal}</p>
                      </div>
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="bg-[#334155]/60 hover:bg-[#FF6B35] text-[#F1F5F9] hover:text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-1.5 shadow-md"
                      >
                        <Receipt className="w-4 h-4" /> Full Receipt
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Realistic Detailed Order Receipt Modal */}
      {selectedOrder && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
          style={{ backgroundColor: "rgba(15, 23, 42, 0.85)", backdropFilter: "blur(8px)" }}
        >
          <div className="bg-[#1E293B] border border-[#334155] rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl flex flex-col gap-6 relative animate-scale-up">
            {/* Close Button */}
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-5 right-5 p-2 text-[#94A3B8] hover:text-white bg-[#0F172A] hover:bg-[#334155] rounded-full transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Title */}
            <div className="flex items-center gap-3 border-b border-[#334155]/60 pb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FF6B35]/15 border border-[#FF6B35]/30 flex items-center justify-center">
                <Receipt className="w-6 h-6 text-[#FF6B35]" />
              </div>
              <div>
                <h3 className="text-[#F1F5F9] font-bold text-lg">Order Receipt</h3>
                <p className="text-[#94A3B8] text-xs font-mono">
                  #{selectedOrder._id}
                </p>
              </div>
            </div>

            {/* Items List */}
            <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-1">
              <p className="text-[#94A3B8] text-xs font-semibold uppercase tracking-wider">
                Order Items
              </p>
              {selectedOrder.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between bg-[#0F172A]/70 p-3 rounded-xl border border-[#334155]/40 text-xs">
                  <div>
                    <p className="text-[#F1F5F9] font-bold text-sm">{item.name}</p>
                    <p className="text-[#64748B] text-xs">₹{item.price} × {item.quantity}</p>
                  </div>
                  <span className="text-[#FF6B35] font-bold text-sm">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Delivery & Payment Details */}
            <div className="bg-[#0F172A]/60 p-4 rounded-xl border border-[#334155]/40 flex flex-col gap-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FF6B35] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#94A3B8] font-semibold">Delivery Address:</span>
                  <p className="text-[#F1F5F9] mt-0.5">{selectedOrder.address}</p>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-[#334155]/40 pt-2 mt-1">
                <span className="text-[#94A3B8]">Payment Method:</span>
                <span className="text-[#F1F5F9] font-bold">
                  {selectedOrder.paymentMethod === "Online" ? "Paid Online (Razorpay)" : "Cash on Delivery (COD)"}
                </span>
              </div>
            </div>

            {/* Financial Breakdown */}
            <div className="flex flex-col gap-2 border-t border-[#334155]/60 pt-4 text-xs">
              <div className="flex justify-between text-[#94A3B8]">
                <span>Items Subtotal</span>
                <span>₹{getSubtotal(selectedOrder.items)}</span>
              </div>
              {selectedOrder.couponCode && (
                <div className="flex justify-between text-emerald-400 font-medium">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" /> Coupon ({selectedOrder.couponCode})
                  </span>
                  <span>-₹{selectedOrder.discount || 0}</span>
                </div>
              )}
              <div className="flex justify-between text-[#94A3B8]">
                <span>Delivery Fee</span>
                <span className="text-emerald-400 font-bold">FREE</span>
              </div>
              <div className="flex justify-between items-center text-base font-bold border-t border-[#334155]/60 pt-3 text-[#F1F5F9]">
                <span>Total Amount Paid</span>
                <span className="text-[#FF6B35] text-xl">
                  ₹{selectedOrder.totalAmount || (getSubtotal(selectedOrder.items) - (selectedOrder.discount || 0))}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full bg-[#FF6B35] hover:bg-[#FF8255] text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-[#FF6B35]/20 text-sm"
            >
              Close Receipt
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Orders;
