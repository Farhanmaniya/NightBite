import { useState } from "react";
import CategoryStrip from "../components/CategoryStrip";
import MenuCard from "../components/MenuCard";
import { Utensils } from "lucide-react";

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const menuItems = [
    {
      id: 1,
      name: "Crispy Fries",
      category: "Sides",
      price: 99,
      image: "🍟",
      tag: "popular",
    },
    {
      id: 2,
      name: "Chicken Burger",
      category: "Burgers",
      price: 199,
      image: "🍔",
      tag: "popular",
    },
    {
      id: 3,
      name: "Veg Spring Rolls",
      category: "Starters",
      price: 149,
      image: "🥗",
      tag: "new",
    },
    {
      id: 4,
      name: "Paneer Butter Masala",
      category: "Main Course",
      price: 249,
      image: "🍽️",
      tag: "featured",
    },
    {
      id: 5,
      name: "Margherita Pizza",
      category: "Pizza",
      price: 299,
      image: "🍕",
      tag: "featured",
    },
    {
      id: 6,
      name: "Mango Lassi",
      category: "Drinks",
      price: 79,
      image: "🥤",
      tag: "new",
    },
    {
      id: 7,
      name: "Chocolate Brownie",
      category: "Desserts",
      price: 149,
      image: "🍩",
      tag: "popular",
    },
    {
      id: 8,
      name: "Chicken Tikka",
      category: "Starters",
      price: 229,
      image: "🍗",
      tag: "featured",
    },
  ];

  const filteredItems = menuItems.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

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
        <h1 className="text-[#F1F5F9] font-bold text-2xl mb-6">
          <span className="flex items-center gap-2">
            <Utensils className="w-6 h-6" /> Our Menu
          </span>
        </h1>

        {/* Category Filter */}
        <div className="mb-6">
          <CategoryStrip onSelect={setSelectedCategory} />
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
          {filteredItems.length === 0 && (
            <div className="col-span-3 flex flex-col items-center justify-center py-16 gap-3">
              <span className="text-5xl">
                <Utensils className="w-6 h-6" />
              </span>
              <p className="text-[#94A3B8] text-sm">No items found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
