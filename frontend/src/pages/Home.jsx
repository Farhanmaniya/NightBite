import Hero from "../components/Hero";
import MenuCard from "../components/MenuCard";
import Footer from "../components/Footer";
import OfferBanner from "../components/OfferBanner";
import { useState, useEffect } from "react";
import { Flame, Sparkles, Star } from "lucide-react";
import API from "../api/axios";
import Loader from "../components/Loader";

const Home = () => {
  const [menuItems, setMenuItems ] = useState([]);
  const [loading, setLoading ] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await API.get("/menu");
        setMenuItems(response.data);
      } catch(error) {
        console.log(error);
      }finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (loading) return <Loader />;
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
