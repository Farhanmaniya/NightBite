import { Star, Clock, IndianRupee } from "lucide-react";
const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="bg-[#1A1A1A] rounded-2xl overflow-hidden border border-zinc-800 hover:border-[#FF6B35] transition-all duration-200 cursor-pointer" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Image Section */}
      <div className="h-36 bg-[#F1F1F1] flex items-center justify-center text-6xl">
        {restaurant.image}
      </div>

      {/* Info Section */}
      <div className="p-4 flex flex-col gap-2">
        {/* Name */}
        <h3 className="text-white font-semibold text-base">
          {restaurant.name}
        </h3>
        {/* Cuisine */}
        <p className="text-zinc-500 text-xs">{restaurant.cuisine}</p>
        {/* Rating + Delivery Time */}
        <div className="flex items-center gap-3 text-xs text-zinc-400">
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-[#FF6B35]" /> {restaurant.rating}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {restaurant.deliveryTime}
          </span>
        </div>
        {/* Min Order */}
        <p className="text-xs text-zinc-400 flex items-center gap-1">
          Min Order: <IndianRupee className="w-3 h-3" />
          {restaurant.minOrder}
        </p>
      </div>
    </div>
  );
};

export default RestaurantCard;
