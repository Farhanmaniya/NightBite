import { IndianRupee, Plus, Star } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const MenuCard = ({ item }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to add items to cart!");
      navigate("/");
      return;
    }
    addToCart(item);
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <div
      className="bg-[#1E293B] rounded-2xl overflow-hidden border border-[#334155] hover:border-[#FF6B35] hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Image Section */}
      <div className="h-40 bg-[#0F172A] overflow-hidden relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Tag Badge */}
        {item.tag && (
          <div className={`absolute top-2 left-2 px-2 py-1 rounded-lg text-xs font-bold ${
            item.tag === "popular" ? "bg-[#FF6B35] text-white" :
            item.tag === "new" ? "bg-blue-500 text-white" :
            "bg-purple-500 text-white"
          }`}>
            {item.tag === "popular" ? "🔥 Popular" :
             item.tag === "new" ? "✨ New" : "⭐ Featured"}
          </div>
        )}

        {/* Veg/Non-veg indicator */}
        <div className={`absolute top-2 right-2 w-6 h-6 rounded-md border-2 flex items-center justify-center ${
          item.isVeg
            ? "border-green-500 bg-green-500/20"
            : "border-red-500 bg-red-500/20"
        }`}>
          <div className={`w-2.5 h-2.5 rounded-full ${
            item.isVeg ? "bg-green-500" : "bg-red-500"
          }`} />
        </div>
      </div>

      {/* Info Section */}
      <div className="p-4 flex flex-col gap-2">

        {/* Name */}
        <h3 className="text-[#F1F5F9] font-semibold text-base leading-tight">
          {item.name}
        </h3>

        {/* Description */}
        <p className="text-[#64748B] text-xs leading-relaxed line-clamp-2">
          {item.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5 text-[#FF6B35] fill-[#FF6B35]" />
          <span className="text-[#F1F5F9] text-xs font-semibold">
            {item.rating?.toFixed(1) || "4.0"}
          </span>
          <span className="text-[#64748B] text-xs">rating</span>
        </div>

        {/* Bottom row — price + add button */}
        <div className="flex items-center justify-between mt-1">

          {/* Price */}
          <span className="flex items-center gap-0.5 text-[#F1F5F9] font-bold text-base">
            <IndianRupee className="w-3.5 h-3.5" />
            {item.price}
          </span>

          {/* Add Button */}
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1 bg-[#FF6B35] hover:bg-[#ff8255] text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-all duration-200 active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;