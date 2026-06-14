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
    heroDescription:
      "Order from the best restaurants near you. Fast delivery, great food, every time.",
    foodEmojis: ["🍕", "🍜", "🌮", "🍣"],
    centerEmoji: "🍔",
    totalItems: 0,
    avgRating: "4.8",
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

  return (
    <section
      className="min-h-[90vh] md:min-h-screen flex items-center relative overflow-hidden w-full max-w-full"
      style={{
        backgroundColor: "#0F172A",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Background glow */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #FF6B35, transparent)" }}
      />

      <div className="max-w-[90%] 2xl:max-w-[85%] mx-auto px-4 sm:px-6 w-full py-24 md:py-32">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* LEFT */}
          <div className="flex-1 flex flex-col gap-6 w-full">
            {/* Location pill */}
            <div className="flex items-center gap-2 w-fit px-3 py-1.5 rounded-full border border-[#334155] bg-[#1E293B]">
              <MapPin className="w-3.5 h-3.5 text-[#FF6B35]" />
              <span className="text-xs text-[#94A3B8]">
                Delivering to{" "}
                <span className="text-[#F1F5F9] font-medium">
                  Nadiad, Gujarat
                </span>
              </span>
            </div>

            {/* Headline */}
            <div className="flex flex-col gap-2">
              <h1 className="text-5xl sm:text-6xl font-bold text-[#F1F5F9] leading-tight">
                {settings.heroHeadline}
              </h1>
              <h1
                className="text-5xl sm:text-6xl font-bold leading-tight"
                style={{ color: "#FF6B35" }}
              >
                {settings.heroSubheadline}
              </h1>
              <p className="text-[#94A3B8] text-base mt-2 leading-relaxed max-w-xl">
                {settings.heroDescription}
              </p>
            </div>

            {/* Search */}
            <div className="flex items-center gap-2 bg-[#1E293B] border border-[#334155] rounded-2xl px-4 py-3 max-w-xl focus-within:border-[#FF6B35] transition-all duration-200">
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
                {
                  value: `${settings.avgRating || "4.8"}★`,
                  label: "Avg Rating",
                },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-xl font-bold text-[#F1F5F9]">
                    {stat.value}
                  </span>
                  <span className="text-xs text-[#64748B]">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Food Visual */}
          <div className="flex-1 flex items-center md:justify-end w-full max-w-full overflow-visible">
            <div className="relative w-72 h-72 scale-90 sm:scale-100">
              {/* Glow */}
              <div
                className="absolute inset-0 rounded-full opacity-20"
                style={{
                  background: "radial-gradient(circle, #FF6B35, transparent)",
                }}
              />

              {/* Center circle */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-44 h-44 rounded-full bg-[#1E293B] border border-[#334155] shadow-2xl flex items-center justify-center">
                  <span className="text-7xl">{settings.centerEmoji}</span>
                </div>
              </div>

              {/* Top Left */}
              <div
                className="absolute top-0 -left-4 z-20 flex items-center gap-2 px-3 py-2 rounded-xl bg-[#1E293B] border border-[#334155] shadow-lg whitespace-nowrap"
                style={{
                  animation: "float 3s ease-in-out infinite",
                  animationDelay: "0s",
                }}
              >
                <span className="text-xl">
                  {settings.foodEmojis?.[0] || "🍕"}
                </span>
                <span className="text-xs text-[#94A3B8] font-medium">
                  Pizza
                </span>
              </div>

              {/* Top Right */}
              <div
                className="absolute top-0 -right-4 z-20 flex items-center gap-2 px-3 py-2 rounded-xl bg-[#1E293B] border border-[#334155] shadow-lg whitespace-nowrap"
                style={{
                  animation: "float 3s ease-in-out infinite",
                  animationDelay: "0.3s",
                }}
              >
                <span className="text-xl">
                  {settings.foodEmojis?.[1] || "🍜"}
                </span>
                <span className="text-xs text-[#94A3B8] font-medium">
                  Noodles
                </span>
              </div>

              {/* Bottom Left */}
              <div
                className="absolute bottom-0 -left-4 z-20 flex items-center gap-2 px-3 py-2 rounded-xl bg-[#1E293B] border border-[#334155] shadow-lg whitespace-nowrap"
                style={{
                  animation: "float 3s ease-in-out infinite",
                  animationDelay: "0.6s",
                }}
              >
                <span className="text-xl">
                  {settings.foodEmojis?.[2] || "🌮"}
                </span>
                <span className="text-xs text-[#94A3B8] font-medium">
                  Tacos
                </span>
              </div>

              {/* Bottom Right */}
              <div
                className="absolute bottom-0 -right-4 z-20 flex items-center gap-2 px-3 py-2 rounded-xl bg-[#1E293B] border border-[#334155] shadow-lg whitespace-nowrap"
                style={{
                  animation: "float 3s ease-in-out infinite",
                  animationDelay: "0.9s",
                }}
              >
                <span className="text-xl">
                  {settings.foodEmojis?.[3] || "🍣"}
                </span>
                <span className="text-xs text-[#94A3B8] font-medium">
                  Sushi
                </span>
              </div>
            </div>
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
