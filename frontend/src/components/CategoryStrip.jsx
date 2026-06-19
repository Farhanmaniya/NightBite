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
    <div className="flex overflow-x-auto gap-2.5 px-1 py-1 no-scrollbar">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => {
            setActive(cat.id);
            onSelect(cat.label);
          }}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl whitespace-nowrap transition-all duration-300 ${
            active === cat.id
              ? "bg-[#FF6B35] text-white shadow-md shadow-[#FF6B35]/20 scale-[1.02]"
              : "bg-[#1E293B]/60 text-[#94A3B8] hover:text-white hover:bg-[#334155]/60 border border-[#334155]/40 hover:border-[#FF6B35]/30"
          }`}
        >
          <span className="text-base">{cat.emoji}</span>
          {cat.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryStrip;
