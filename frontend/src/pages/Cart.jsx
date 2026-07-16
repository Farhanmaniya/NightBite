import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { X, ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";
import Footer from "../components/Footer";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const [address, setAddress] = useState("");

  const [couponCode, setCouponCode] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");
  const [discount, setDiscount] = useState(0);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  // Load address from profile on mount
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await API.get("/auth/profile");
        if (res.data.address) {
          setAddress(res.data.address);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAddress();
  }, []);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;

    setCouponLoading(true);
    setCouponError("");
    setCouponSuccess("");

    try {
      const res = await API.post("/coupons/validate", {
        code: couponCode,
        orderTotal: total,
      });
      setDiscount(res.data.discount);
      toast.success(`Coupon applied! You got ₹${res.data.discount} off.`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid coupon code");
      setDiscount(0);
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRazorpayPayment = async () => {
    const toastId = toast.loading("Initiating payment...");
    try {
      const res = await API.post("/payment/create-order", {
        amount: finalTotal,
      });

      toast.dismiss(toastId);

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: res.data.amount,
        currency: "INR",
        name: "NightBite",
        description: "Food Order Payment",
        order_id: res.data.id,
        handler: async (response) => {
          try {
            const verifyRes = await API.post("/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.data.verified) {
              await submitOrder("Online");
            }
          } catch (error) {
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          name: JSON.parse(localStorage.getItem("user"))?.name || "",
          email: JSON.parse(localStorage.getItem("user"))?.email || "",
        },
        theme: {
          color: "#FF6B35",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Payment initiation failed");
    }
  };

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      setShowAddressModal(true);
      return;
    }
    if (paymentMethod === "Online") {
      await handleRazorpayPayment();
    } else {
      await submitOrder("COD");
    }
  };

  const submitOrder = async (method = "COD") => {
    const toastId = toast.loading("Placing your order...");
    try {
      const orderData = {
        items: cartItems.map((item) => ({
          menuItem: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        totalAmount: finalTotal,
        address,
        paymentMethod: method,
        couponCode,
        discount,
      };

      await API.post("/orders", orderData);
      await API.put("/auth/profile", { address });

      toast.dismiss(toastId);
      toast.success("Order placed successfully!");
      clearCart();
      setDiscount(0);
      setCouponCode("");
      setShowAddressModal(false);
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error.response?.data?.message || "Order Failed!");
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const finalTotal = total - discount;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0F172A" }}>
      <div className="max-w-6xl mx-auto px-4 py-24">
        {/* Page Title */}
        <div className="animate-fade-in-up mb-8">
          <h1 className="text-[#F1F5F9] font-bold text-3xl flex items-center gap-2.5">
            <ShoppingBag className="w-7 h-7 text-[#FF6B35]" /> Your Cart
          </h1>
          {cartItems.length > 0 && (
            <p className="text-[#64748B] text-sm mt-1">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
          )}
        </div>

        {/* Two column layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT — Cart Items */}
          <div className="flex-1 flex flex-col gap-3">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-5 animate-fade-in">
                <div className="w-24 h-24 rounded-3xl bg-[#1E293B] border border-[#334155] flex items-center justify-center">
                  <ShoppingBag className="w-10 h-10 text-[#64748B]" />
                </div>
                <div className="text-center">
                  <p className="text-[#F1F5F9] font-semibold text-lg mb-1">Your cart is empty</p>
                  <p className="text-[#64748B] text-sm">Looks like you haven't added anything yet</p>
                </div>
                <Link
                  to="/menu"
                  className="bg-[#FF6B35] hover:bg-[#ff8255] text-white font-bold px-6 py-3 rounded-xl transition-all duration-200 active:scale-95 text-sm hover:shadow-lg hover:shadow-[#FF6B35]/20"
                >
                  Browse Menu →
                </Link>
              </div>
            ) : (
              cartItems.map((item, index) => (
                <div
                  key={item._id}
                  className="bg-[#1E293B]/60 backdrop-blur-sm rounded-2xl p-4 border border-[#334155]/50 flex items-center gap-4 hover:border-[#334155] transition-all duration-200 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Image */}
                  <div className="w-16 h-16 bg-[#0F172A] rounded-xl flex items-center justify-center text-3xl shrink-0 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[#F1F5F9] font-semibold text-sm truncate">
                      {item.name}
                    </h3>
                    <p className="text-[#64748B] text-xs">{item.category}</p>
                    <p className="text-[#FF6B35] font-bold text-sm mt-1">
                      ₹{item.price}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => updateQuantity(item._id, -1)}
                      className="w-8 h-8 rounded-lg bg-[#334155]/60 text-[#F1F5F9] hover:bg-[#334155] flex items-center justify-center transition-all"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[#F1F5F9] text-sm font-bold w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item._id, +1)}
                      className="w-8 h-8 rounded-lg bg-[#FF6B35] text-white hover:bg-[#FF8255] flex items-center justify-center transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="p-2 text-[#64748B] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* RIGHT — Order Summary */}
          {cartItems.length > 0 && (
            <div className="w-full lg:w-80 flex flex-col gap-4 animate-fade-in-up stagger-2">
              <div className="bg-[#1E293B]/60 backdrop-blur-sm rounded-2xl p-6 border border-[#334155]/50 flex flex-col gap-4 lg:sticky lg:top-24">
                <h2 className="text-[#F1F5F9] font-bold text-lg">
                  Order Summary
                </h2>
                {/* Coupon Input */}
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) =>
                        setCouponCode(e.target.value.toUpperCase())
                      }
                      className="flex-1 bg-[#0F172A]/80 border border-[#334155]/60 rounded-xl px-3 py-2.5 text-sm text-[#F1F5F9] placeholder-[#64748B] outline-none focus:border-[#FF6B35] transition-all"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      disabled={couponLoading}
                      className="bg-[#FF6B35] hover:bg-[#ff8255] text-white text-xs font-bold px-4 rounded-xl transition-all disabled:opacity-50 active:scale-95"
                    >
                      {couponLoading ? "..." : "Apply"}
                    </button>
                  </div>

                  {couponError && (
                    <p className="text-red-400 text-xs">{couponError}</p>
                  )}
                  {couponSuccess && (
                    <p className="text-green-400 text-xs">{couponSuccess}</p>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="flex flex-col gap-3 border-t border-[#334155]/40 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#94A3B8]">Subtotal</span>
                    <span className="text-[#F1F5F9] font-medium">₹{total}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-emerald-400">Discount</span>
                      <span className="text-emerald-400 font-medium">
                        -₹{discount}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-[#94A3B8]">Delivery</span>
                    <span className="font-medium text-emerald-400">Free</span>
                  </div>
                  <div className="flex justify-between text-sm border-t border-[#334155]/40 pt-3">
                    <span className="text-[#F1F5F9] font-bold">Total</span>
                    <span className="text-[#FF6B35] font-bold text-lg">
                      ₹{finalTotal}
                    </span>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="flex flex-col gap-2">
                  <p className="text-[#94A3B8] text-xs font-semibold uppercase tracking-widest">
                    Payment Method
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPaymentMethod("COD")}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                        paymentMethod === "COD"
                          ? "bg-[#FF6B35] text-white shadow-md shadow-[#FF6B35]/20"
                          : "bg-[#0F172A]/80 border border-[#334155]/60 text-[#94A3B8] hover:border-[#FF6B35]/40"
                      }`}
                    >
                      Cash on Delivery
                    </button>
                    <button
                      onClick={() => setPaymentMethod("Online")}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                        paymentMethod === "Online"
                          ? "bg-[#FF6B35] text-white shadow-md shadow-[#FF6B35]/20"
                          : "bg-[#0F172A]/80 border border-[#334155]/60 text-[#94A3B8] hover:border-[#FF6B35]/40"
                      }`}
                    >
                      Pay Online
                    </button>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  className="w-full bg-[#FF6B35] hover:bg-[#FF8255] text-white font-bold py-3.5 rounded-xl transition-all duration-300 active:scale-[0.98] hover:shadow-lg hover:shadow-[#FF6B35]/20 text-sm"
                  onClick={handlePlaceOrder}
                >
                  Place Order →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Address Modal — with transition */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-backdrop-in"
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
        >
          <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 w-full max-w-md flex flex-col gap-4 animate-modal-in">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-[#F1F5F9] font-bold text-lg">
                📍 Delivery Address
              </h2>
              <button
                onClick={() => setShowAddressModal(false)}
                className="p-1.5 text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/5 rounded-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-[#94A3B8] text-sm">
              No address found. Please enter your delivery address.
            </p>

            {/* Address Input */}
            <textarea
              rows={3}
              placeholder="Enter your full delivery address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="bg-[#0F172A] border border-[#334155] rounded-xl px-4 py-3 text-sm text-[#F1F5F9] placeholder-[#64748B] outline-none focus:border-[#FF6B35] transition-all resize-none"
            />

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddressModal(false)}
                className="flex-1 border border-[#334155] text-[#94A3B8] hover:text-[#F1F5F9] hover:border-[#94A3B8] font-medium py-2.5 rounded-xl transition-all text-sm"
              >
                Cancel
              </button>
              <button
                onClick={submitOrder}
                disabled={!address.trim()}
                className="flex-1 bg-[#FF6B35] hover:bg-[#ff8255] text-white font-bold py-2.5 rounded-xl transition-all text-sm active:scale-95 disabled:opacity-50"
              >
                Confirm Order →
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Cart;
