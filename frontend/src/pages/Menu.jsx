import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CategoryStrip from "../components/CategoryStrip";
import MenuCard from "../components/MenuCard";
import Footer from "../components/Footer";
import { Utensils, Search } from "lucide-react";
import Loader from "../components/Loader";
import API from "../api/axios";

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const urlSearch = searchParams.get("search") || "";

  const [search, setSearch] = useState(urlSearch);
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

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#0F172A" }}
    >
      <div className="px-4 py-24">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <div className="animate-fade-in-up mb-8">
            <h1 className="text-[#F1F5F9] font-bold text-3xl mb-2">
              <span className="flex items-center gap-2.5">
                <Utensils className="w-7 h-7 text-[#FF6B35]" /> Our Menu
              </span>
            </h1>
            <p className="text-[#64748B] text-sm">Browse through our delicious collection</p>
          </div>

          {/* Search */}
          <div className="mb-6 animate-fade-in-up stagger-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
              <input
                type="text"
                placeholder="Search menu..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#1E293B]/60 backdrop-blur-sm border border-[#334155]/60 rounded-xl pl-11 pr-4 py-3.5 text-[#F1F5F9] text-sm outline-none focus:border-[#FF6B35] focus:shadow-lg focus:shadow-[#FF6B35]/5 transition-all duration-300 placeholder-[#64748B]"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-8 animate-fade-in-up stagger-2">
            <CategoryStrip onSelect={setSelectedCategory} />
          </div>

          {/* Results count */}
          <p className="text-[#64748B] text-xs mb-4 animate-fade-in">
            Showing {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''}
          </p>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <div key={item.id || item._id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
                <MenuCard item={item} />
              </div>
            ))}
            {filteredItems.length === 0 && (
              <div className="col-span-3 flex flex-col items-center justify-center py-20 gap-4 animate-fade-in">
                <div className="w-20 h-20 rounded-2xl bg-[#1E293B] border border-[#334155] flex items-center justify-center">
                  <Utensils className="w-8 h-8 text-[#64748B]" />
                </div>
                <div className="text-center">
                  <p className="text-[#F1F5F9] font-semibold mb-1">No items found</p>
                  <p className="text-[#64748B] text-sm">Try adjusting your search or category filter</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
};

export default Menu;
