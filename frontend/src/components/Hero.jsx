import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin } from "lucide-react";
import API from "../api/axios";

const Hero = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    heroHeadline: "Hungry?",
    heroSubheadline: "We deliver.",
    heroDescription: "Order from the best restaurants near you. Fast delivery, great food, every time.",
    foodEmojis: ["🍔", "🍕", "🍜", "🌮", "🍣"],
    centerEmoji: "🍔",
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await API.get("/settings");
        setSettings(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSettings();
  }, []);

  const handleSearch = () => {
    if (query.trim()) navigate(`/menu?search=${query}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const floatingItems = [
    { emoji: settings.foodEmojis[0], label: "Pizza", top: "0%", left: "0%" },
    { emoji: settings.foodEmojis[1], label: "Noodles", top: "0%", right: "0%" },
    { emoji: settings.foodEmojis[2], label: "Tacos", bottom: "10%", left: "0%" },
    { emoji: settings.foodEmojis[3], label: "Sushi", bottom: "10%", right: "0%" },
  ];

  return (
    <section
      className="min-h-screen flex items-center relative overflow-hidden"
      style={{ backgroundColor: "#0F172A", fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #FF6B35, transparent)" }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full pt-24 pb-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">

          {/* LEFT */}
          <div className="flex-1 flex flex-col gap-6">

            <div className="flex items-center gap-2 w-fit px-3 py-1.5 rounded-full border border-[#334155] bg-[#1E293B]">
              <MapPin className="w-3.5 h-3.5 text-[#FF6B35]" />
              <span className="text-xs text-[#94A3B8]">Delivering to <span className="text-[#F1F5F9] font-medium">Anand, Gujarat</span></span>
            </div>

            {/* Dynamic headline */}
            <div className="flex flex-col gap-2">
              <h1 className="text-5xl sm:text-6xl font-bold text-[#F1F5F9] leading-tight">
                {settings.heroHeadline}
              </h1>
              <h1 className="text-5xl sm:text-6xl font-bold leading-tight" style={{ color: "#FF6B35" }}>
                {settings.heroSubheadline}
              </h1>
              <p className="text-[#94A3B8] text-base mt-2 leading-relaxed max-w-md">
                {settings.heroDescription}
              </p>
            </div>

            {/* Search */}
            <div className="flex items-center gap-2 bg-[#1E293B] border border-[#334155] rounded-2xl px-4 py-3 max-w-md focus-within:border-[#FF6B35] transition-all duration-200">
              <Search className="w-4 h-4 text-[#64748B] shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search food or restaurant..."
                className="bg-transparent text-sm text-[#F1F5F9] placeholder-[#64748B] outline-none flex-1"
              />
              <button
                onClick={handleSearch}
                className="text-xs font-bold px-4 py-1.5 rounded-xl text-white transition-all duration-200 active:scale-95"
                style={{ backgroundColor: "#FF6B35" }}
              >
                Search
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 mt-2">
              {[
                { value: `${settings.totalItems || 0}+`, label: "Menu Items" },
                { value: "20min", label: "Avg Delivery" },
                { value: `${settings.avgRating || "4.8"}★`, label: "Avg Rating" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-xl font-bold text-[#F1F5F9]">{stat.value}</span>
                  <span className="text-xs text-[#64748B]">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Food Visual */}
          <div className="flex-1 flex items-center justify-center relative">
            <div className="absolute w-72 h-72 rounded-full opacity-20"
              style={{ background: "radial-gradient(circle, #FF6B35, transparent)" }} />

            {/* Center emoji — dynamic */}
            <div className="relative z-10 flex flex-col items-center justify-center w-64 h-64 rounded-full bg-[#1E293B] border border-[#334155] shadow-2xl">
              <span className="text-8xl">{settings.centerEmoji}</span>
            </div>

            {/* Floating cards — dynamic emojis */}
            {floatingItems.map((item) => (
              <div
                key={item.label}
                className="absolute z-20 flex items-center gap-2 px-3 py-2 rounded-xl bg-[#1E293B] border border-[#334155] shadow-lg"
                style={{
                  top: item.top,
                  left: item.left,
                  right: item.right,
                  bottom: item.bottom,
                  animation: `float 3s ease-in-out infinite`,
                }}
              >
                <span className="text-xl">{item.emoji}</span>
                <span className="text-xs text-[#94A3B8] font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </section>
  );
};

export default Hero;