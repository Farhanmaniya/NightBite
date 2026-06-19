import Hero from "../components/Hero";
import MenuCard from "../components/MenuCard";
import Footer from "../components/Footer";
import OfferBanner from "../components/OfferBanner";
import { useState, useEffect } from "react";
import { Flame, Sparkles, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import Loader from "../components/Loader";

const SectionTitle = ({ icon: Icon, title, link }) => (
  <div className="flex items-center justify-between mb-8">
    <h2 className="text-[#F1F5F9] font-bold text-2xl animate-fade-in-up">
      <span className="flex items-center gap-2.5">
        <Icon className="w-6 h-6 text-[#FF6B35]" />
        {title}
      </span>
    </h2>
    {link && (
      <Link to={link} className="flex items-center gap-1.5 text-sm text-[#94A3B8] hover:text-[#FF6B35] transition-colors duration-200">
        View All <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    )}
  </div>
);

const Home = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const popularItems = menuItems.filter((item) => item.tag === "popular");
  const newItems = menuItems.filter((item) => item.tag === "new");
  const featuredItems = menuItems.filter((item) => item.tag === "featured");

  return (
    <main
      style={{ backgroundColor: "#0F172A", minHeight: "100vh" }}
      className="overflow-x-hidden"
    >
      {/* Hero Section */}
      <Hero />

      {/* Offer Banners */}
      <div className="-mt-16 sm:-mt-20 md:-mt-24 relative z-30">
        <OfferBanner />
      </div>

      {/* Popular Items */}
      {popularItems.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 mt-12 mb-16 w-full">
          <SectionTitle icon={Flame} title="Popular Right Now" link="/menu" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularItems.map((item, index) => (
              <div key={item.id || item._id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <MenuCard item={item} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* New Arrivals */}
      {newItems.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 my-16 w-full">
          <SectionTitle icon={Sparkles} title="New Arrivals" link="/menu" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {newItems.map((item, index) => (
              <div key={item.id || item._id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <MenuCard item={item} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Chef's Picks */}
      {featuredItems.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 my-16 w-full">
          <SectionTitle icon={Star} title="Chef's Picks" link="/menu" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredItems.map((item, index) => (
              <div key={item.id || item._id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <MenuCard item={item} />
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="mt-20">
        <Footer />
      </div>
    </main>
  );
};

export default Home;
