import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";

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
      // Create order in backend
      const res = await API.post("/payment/create-order", {
        amount: finalTotal,
      });

      toast.dismiss(toastId);

      // Razorpay options
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: res.data.amount,
        currency: "INR",
        name: "NightBite",
        description: "Food Order Payment",
        order_id: res.data.id,
        handler: async (response) => {
          try {
            // Verify payment
            const verifyRes = await API.post("/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.data.verified) {
              // Place order after payment verified
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
    // If not address -> show modal
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
      // Save address to profile if it was entered in modal
      await API.put("/auth/profile", { address });

      // Success
      toast.dismiss(toastId);
      toast.success("Order placed successfully!");
      clearCart();
      setDiscount(0);
      setCouponCode("");
      setShowAddressModal(false);
    } catch (error) {
      //Error
      toast.dismiss(toastId);
      toast.error("Order Failed!");
    }
  };

  // Calculate total before return
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const finalTotal = total - discount;
  return (
    <div
      className="min-h-screen px-4 py-24"
      style={{
        backgroundColor: "#0F172A",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Page Title */}
        <h1 className="text-[#F1F5F9] font-bold text-2xl mb-8">🛒 Your Cart</h1>

        {/* Two column layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT — Cart Items */}
          <div className="flex-1 flex flex-col gap-4">
            {/* items will go here */}
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-3">
                <span className="text-6xl">🛒</span>
                <p className="text-zinc-500 text-sm">Your cart is empty.</p>
                <Link
                  to="/home"
                  className="text-[#FF6B35] text-sm hover:underline"
                >
                  Browser Menu
                </Link>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-[#1E293B] rounded-2xl p-4 border border-[#334155] flex items-center gap-4"
                >
                  {/* Image */}
                  <div className="w-16 h-16 bg-[#0F172A] rounded-xl flex items-center justify-center text-3xl shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="text-[#F1F5F9] font-semibold text-sm">
                      {item.name}
                    </h3>
                    <p className="text-zinc-500 text-xs">{item.category}</p>
                    <p className="text-[#FF6B35] font-bold text-sm mt-1">
                      ₹{item.price}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item._id, -1)}
                      className="w-7 h-7 rounded-lg bg-[#334155] text-[#F1F5F9] hover:bg-[#1E293B] flex items-center justify-center transition-all"
                    >
                      -
                    </button>
                    <span className="text-[#F1F5F9] text-sm font-semibold w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item._id, +1)}
                      className="w-7 h-7 rounded-lg bg-[#FF6B35] text-[#F1F5F9] hover:bg-[#FF8255] flex items-center justify-center transition-all"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-[#94A3B8] hover:text-red-400 transition-colors ml-2"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* RIGHT — Order Summary */}
          <div className="w-full lg:w-80 flex flex-col gap-4">
            {/* summary will go here */}
            <div className="bg-[#1E293B] rounded-2xl p-6 border border-[#334155] flex flex-col gap-4">
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
                    className="flex-1 bg-[#0F172A] border border-[#334155] rounded-xl px-3 py-2 text-sm text-[#F1F5F9] placeholder-[#64748B] outline-none focus:border-[#FF6B35] transition-all"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    disabled={couponLoading}
                    className="bg-[#FF6B35] hover:bg-[#ff8255] text-white text-xs font-bold px-4 rounded-xl transition-all disabled:opacity-50"
                  >
                    {couponLoading ? "..." : "Apply"}
                  </button>
                </div>

                {/* Error message */}
                {couponError && (
                  <p className="text-red-400 text-xs">{couponError}</p>
                )}

                {/* Success message */}
                {couponSuccess && (
                  <p className="text-green-400 text-xs">{couponSuccess}</p>
                )}
              </div>
              {/* Price Breakdown */}
              <div className="flex flex-col gap-3 border-t border-[#334155] pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-[#94A3B8]">Subtotal</span>
                  <span className="text-[#F1F5F9] font-medium">₹{total}</span>
                </div>

                {/* Discount - only show if applied */}
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-400">Discount</span>
                    <span className="text-green-400 font-medium">
                      -₹{discount}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-[#94A3B8]">Delivery</span>
                  <span className="font-medium text-[#22C55E]">Free</span>
                </div>
                <div className="flex justify-between text-sm border-t border-[#334155] pt-3">
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
                    className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${
                      paymentMethod === "COD"
                        ? "bg-[#FF6B35] text-white"
                        : "bg-[#0F172A] border border-[#334155] text-[#94A3B8]"
                    }`}
                  >
                    Cash on Delivery
                  </button>
                  <button
                    onClick={() => setPaymentMethod("Online")}
                    className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${
                      paymentMethod === "Online"
                        ? "bg-[#FF6B35] text-white"
                        : "bg-[#0F172A] border border-[#334155] text-[#94A3B8]"
                    }`}
                  >
                    Pay Online
                  </button>
                </div>
              </div>
              {/* Place Order Button */}
              <button
                className="w-full bg-[#FF6B35] hover:bg-[#FF8255] text-[#F1F5F9] font-bold py-3 rounded-xl transition-all duration-200 active:scale-95"
                onClick={handlePlaceOrder}
              >
                Place Order →
              </button>
            </div>
          </div>
        </div>
      </div>

      {showAddressModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
        >
          <div
            className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 w-full max-w-md flex flex-col gap-4"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-[#F1F5F9] font-bold text-lg">
                {" "}
                Delivery Address
              </h2>
              <button
                onClick={() => setShowAddressModal(false)}
                className="text-[#94A3B8] hover:text-[#F1F5F9] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-[#94A3B8] text-sm">
              No address found. Please enter your delivery{" "}
              <address className=""></address>
            </p>

            {/* Address Input */}
            <textarea
              rows={3}
              placeholder="Enter your full delivery address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="bg-[#0F172A] border border-[#334155] rounded-xl px-4 py-3 text-sm text-[#F1F5F9] placeholder-[#64748B] outline-none focus:border-[#FF6B35] transition-all resize-none"
            />

            {/* Button */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddressModal(false)}
                className="flex-1 border border-[#334155] text-[#94A38B] hover:text-[#F1F5F9] font-medium py-2.5 rounded-xl transition-all text-sm"
              >
                Cancel
              </button>
              <button
                onClick={submitOrder}
                disabled={!address.trim()}
                className="flex-1 bg-[#FF6B35] text-white font-bold py-2.5 rounded-xl transition-all text-sm active:scale-95 disabled: opacity-50"
              >
                Confirm Order →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
