import { useState } from "react";

const CategoryStrip = ({ onSelect }) => {
  const categories = [
    { id: 1, label: "All", emoji: "🍽️" },
    { id: 2, label: "Starters", emoji: "🥗" },
    { id: 3, label: "Main Course", emoji: "🍛" },
    { id: 4, label: "Burgers", emoji: "🍔" },
    { id: 5, label: "Drinks", emoji: "🥤" },
    { id: 6, label: "Desserts", emoji: "🍩" },
    { id: 7, label: "Pizza", emoji: "🍕" },
    { id: 8, label: "Sides", emoji: "🍟" },
  ];

  const [active, setActive] = useState(1);

  return (
    <div className="flex overflow-x-auto gap-3 px-1 py-2 no-scrollbar">
      {categories.map((cat) => {
        const isActive = active === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => {
              setActive(cat.id);
              onSelect(cat.label);
            }}
            className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-2xl whitespace-nowrap transition-all duration-300 relative ${
              isActive
                ? "bg-[#FF6B35] text-white shadow-lg shadow-[#FF6B35]/25 scale-105"
                : "bg-[#1E293B]/80 text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#334155]/60 border border-[#334155]/60 hover:border-[#FF6B35]/40"
            }`}
          >
            <span className="text-base">{cat.emoji}</span>
            {cat.label}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryStrip;
