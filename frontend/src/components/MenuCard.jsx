import { Star, ShoppingCart, Plus } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useState } from "react";

const MenuCard = ({ item }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const displayPrice = item.price ?? "0";
  const displayRating = item.rating ?? "4.0";

  const handleAdd = () => {
    addToCart(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 600);
  };

  return (
    <div className="group w-full bg-[#1E293B]/40 backdrop-blur-sm border border-[#334155]/50 rounded-3xl overflow-hidden hover-glow hover:border-[#FF6B35]/30 transition-all duration-300 flex flex-col h-full">
      
      {/* IMAGE CONTAINER */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#0F172A]/50">
        <img
          src={item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500"}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/60 via-transparent to-transparent" />

        {/* Tag Badge */}
        {item.tag && (
          <span className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md backdrop-blur-md text-white ${
            item.tag === 'popular' ? 'bg-rose-500/80' : 
            item.tag === 'new' ? 'bg-emerald-500/80' : 'bg-amber-500/80'
          }`}>
            {item.tag === 'popular' ? '🔥 Popular' : item.tag === 'new' ? '✨ New' : '⭐ Chef\'s Pick'}
          </span>
        )}

        {/* Rating Badge */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-[#0F172A]/70 backdrop-blur-md px-2.5 py-1 rounded-xl border border-[#334155]/40 shadow-md">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs font-bold text-[#F1F5F9]">{displayRating}</span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5 flex flex-col flex-1 gap-1.5">
        <h3 className="text-[#F1F5F9] font-bold text-lg group-hover:text-[#FF6B35] transition-colors duration-300 line-clamp-1">
          {item.name || "Delicious Item"}
        </h3>

        <p className="text-[#94A3B8] text-xs leading-relaxed line-clamp-2 mb-3 min-h-[2rem]">
          {item.description || "No description available for this item."}
        </p>

        {/* FOOTER */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#334155]/40">
          <div className="flex flex-col">
            <span className="text-[10px] text-[#64748B] uppercase tracking-wider font-semibold">Price</span>
            <span className="text-xl font-extrabold text-[#F1F5F9] tracking-tight">
              ₹{displayPrice}
            </span>
          </div>

          {/* Add to Cart Button with feedback */}
          <button
            onClick={handleAdd}
            className={`flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl transition-all duration-300 active:scale-90 ${
              added
                ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20 scale-105"
                : "bg-[#FF6B35] hover:bg-[#ff8255] text-white shadow-md shadow-[#FF6B35]/10 hover:shadow-[#FF6B35]/25 hover:scale-[1.02]"
            }`}
          >
            {added ? (
              <>✓ Added</>
            ) : (
              <><Plus className="w-3.5 h-3.5" /> Add</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;