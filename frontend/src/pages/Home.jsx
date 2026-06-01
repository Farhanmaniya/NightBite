import Hero from "../components/Hero";
import MenuCard from "../components/MenuCard";
import Footer from "../components/Footer";
import OfferBanner from "../components/OfferBanner";
import { Flame, Sparkles, Star } from "lucide-react";

const Home = () => {
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

  return (
    <main style={{ backgroundColor: "#0F172A", minHeight: "100vh" }}>
      <Hero />
      <OfferBanner />

      {/* Popular Items */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-[#F1F5F9] font-bold text-xl mb-6">
          <span className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-[#F6B835]" /> Popular Right Now
          </span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {menuItems
            .filter((item) => item.tag === "popular")
            .map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
        </div>
      </section>

      {/* Menu Items */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-[#F1F5F9] font-bold text-xl mb-6">
          <span className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#F6B835]" /> New Arrivals
          </span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {menuItems
            .filter((item) => item.tag === "new")
            .map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
        </div>
      </section>

      {/* Featured Items */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-[#F1F5F9] font-bold text-xl mb-6">
          <span className="flex items-center gap-2">
            <Star className="w-6 h-6 text-[#F6B835]" /> Chef's Picks
          </span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {menuItems
            .filter((item) => item.tag === "featured")
            .map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Home;
