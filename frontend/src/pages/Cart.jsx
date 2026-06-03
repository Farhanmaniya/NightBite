import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { useState } from "react";
import API from "../api/axios";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart,  } = useCart();
  const [address, setAddress] = useState("");
  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        items: cartItems.map((item) => ({
          menuItem: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        totalAmount: total,
        address,
        paymentMethod: "COD",
      };

      const response = await API.post("/orders", orderData);

      console.log(response.data);

      alert("Order placed successfully!");
      clearCart();
      setAddress("");

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Order failed");
    }
  };

  // Calculate total before return
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
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
                    {item.image}
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
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  className="flex-1 bg-[#0F172A] border border-[#334155] rounded-xl px-3 py-2 text-sm text-[#F1F5F9] placeholder-[#64748B] outline-none focus:border-[#FF6B35] transition-all"
                />
                <button className="bg-[#FF6B35] hover:bg-[#FF8255] text-[#F1F5F9] text-xs font-bold px-4 rounded-xl transition-all">
                  Apply
                </button>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-[#F1F5F9] font-medium">
                  Delivery Address
                </label>

                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter delivery address"
                  rows={3}
                  className="bg-[#0f172A] border border-[#334155] rounded-xl px-3 py-2 text-sm text-[#F1F5F9] placeholder-[#64748B] outline-none focus:border-[#FF6B35] transition-all resize-none"
                />
              </div>
              {/* Price Breakdown */}
              <div className="flex flex-col gap-3 border-t border-[#334155] pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-[#94A3B8]">Subtotal</span>
                  <span className="text-[#F1F5F9] font-medium">₹{total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#94A3B8]">Delivery</span>
                  <span className="font-medium text-[#22C55E]">Free</span>
                </div>
                <div className="flex justify-between text-sm border-t border-[#334155] pt-3">
                  <span className="text-[#F1F5F9] font-bold">Total</span>
                  <span className="text-[#FF6B35] font-bold text-lg">
                    ₹{total}
                  </span>
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
    </div>
  );
};

export default Cart;
