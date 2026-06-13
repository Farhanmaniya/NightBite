import Hero from "../components/Hero";
import MenuCard from "../components/MenuCard";
import Footer from "../components/Footer";
import OfferBanner from "../components/OfferBanner";
import { useState, useEffect } from "react";
import { Flame, Sparkles, Star } from "lucide-react";
import API from "../api/axios";
import Loader from "../components/Loader";

const Home = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true); // Fixed: Init as true instead of empty array

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await API.get("/menu");
        setMenuItems(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (loading) return <Loader />;
  return (
    <main
      style={{ backgroundColor: "#0F172A", minHeight: "100vh" }}
      className="overflow-x-hidden"
    >
      {/* Hero Section */}
      <Hero />

      {/* 🛠️ Pulled OfferBanner UP using negative margin (-mt-16 to -mt-24) to close the gap */}
      <div className="-mt-16 sm:-mt-20 md:-mt-24 relative z-30">
        <OfferBanner />
      </div>

      {/* Popular Items Section — Reduced top margin from my-16 to mt-10 mb-16 */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 mt-10 mb-16 w-full">
        <h2 className="text-[#F1F5F9] font-bold text-2xl mb-8">
          <span className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-[#F6B835]" /> Popular Right Now
          </span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems
            .filter((item) => item.tag === "popular")
            .map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 my-16 w-full">
        <h2 className="text-[#F1F5F9] font-bold text-2xl mb-8">
          <span className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#F6B835]" /> New Arrivals
          </span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems
            .filter((item) => item.tag === "new")
            .map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 my-16 w-full">
        <h2 className="text-[#F1F5F9] font-bold text-2xl mb-8">
          <span className="flex items-center gap-2">
            <Star className="w-6 h-6 text-[#F6B835]" /> Chef's Picks
          </span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems
            .filter((item) => item.tag === "featured")
            .map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
        </div>
      </section>

      <div className="mt-20">
        <Footer />
      </div>
    </main>
  );
};

export default Home;
