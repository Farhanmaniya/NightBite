import { useState } from "react";

const CategoryStrip = ({ onSelect }) => {
  const categories = [
    { id: 1, label: "All", emoji: "" },
    { id: 2, label: "Starters", emoji: "🥗" },
    { id: 3, label: "Main Course", emoji: "🍽️" },
    { id: 4, label: "Burgers", emoji: "🍔" },
    { id: 5, label: "Drinks", emoji: "🥤" },
    { id: 6, label: "Desserts", emoji: "🍩" },
    { id: 7, label: "Pizza", emoji: "🍕" },
    { id: 8, label: "Sides", emoji: "🍟" },
  ];

  const [active, setActive] = useState(1);

  return (
    <div
      className="flex overflow-x-auto gap-3 px-4"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => {
            setActive(cat.id);
            onSelect(cat.label);
          }}
          className={`px-4 py-2 text-sm font-semibold rounded-full whitespace-nowrap transition-all duration-200 ${
            active === cat.id
              ? "bg-[#FF6B35] text-white"
              : "bg-[#1E293B] text-[#94A3B8] hover:text-white hover:bg-[#334155]"
          }`}
        >
          {cat.emoji} {cat.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryStrip;
