import { IndianRupee, Plus } from "lucide-react";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const MenuCard = ({ item }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to add items to cart");
      navigate("/");
      return;
    }
    addToCart(item);
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <div
      className="bg-[#1E293B] rounded-2xl overflow-hidden border border-[#334155] hover:border-[#FF6B35] transition-all duration-200 cursor-pointer"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Image Section */}
      <div className="h-36 bg-[#0F172A] flex items-center justify-center text-6xl rounded-t-2xl overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info Section */}
      <div className="p-4 flex flex-col gap-2">
        {/* Name */}
        <h3 className="text-[#F1F5F9] font-semibold text-base">{item.name}</h3>

        {/* Description */}
        <div className="text-[#94A3B8] text-xs leading-relaxed">
          {item.description}
        </div>

        {/* Bottom row - price + add button */}
        <div className="flex items-center justify-between mt-2">
          {/* price */}
          <span className="flex items-center gap-0.5 text-[#F1F5F9] font-bold text-sm">
            <IndianRupee className="w-3.5 h-3.5" />
            {item.price}
          </span>

          {/* Add Button */}
          <button
            className="flex items-center gap-1 bg-[#FF6B35] hover:bg-[#FF8255] text-[#F1F5F9] text-xs font-bold px-3 py-1.5 rounded-xl transition-all duration-200 active:scale-95"
            onClick={handleAddToCart}
          >
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
