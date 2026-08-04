import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, ArrowRight } from "lucide-react";
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
      style={{ backgroundColor: "#0F172A" }}
    >
      {/* Background gradient mesh */}
      <div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.12] blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #FF6B35, transparent 70%)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.08] blur-[100px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #38BDF8, transparent 70%)" }}
      />

      <div className="max-w-[90%] 2xl:max-w-[85%] mx-auto px-4 sm:px-6 w-full py-24 md:py-32">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* LEFT */}
          <div className="flex-1 flex flex-col gap-6 w-full">
            {/* Location pill */}
            <div className="animate-fade-in-up flex items-center gap-2 w-fit px-4 py-2 rounded-full border border-[#FF6B35]/30 bg-[#1E293B]/70 backdrop-blur-md shadow-lg shadow-[#FF6B35]/5">
              <MapPin className="w-3.5 h-3.5 text-[#FF6B35]" />
              <span className="text-xs text-[#94A3B8]">
                Delivering to{" "}
                <span className="text-[#F1F5F9] font-semibold">
                  Nadiad, Gujarat
                </span>
              </span>
            </div>

            {/* Headline — stagger reveal */}
            <div className="flex flex-col gap-2">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#F1F5F9] leading-tight animate-fade-in-up stagger-1 tracking-tight">
                {settings.heroHeadline}
              </h1>
              <h1
                className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight animate-fade-in-up stagger-2 text-gradient tracking-tight"
              >
                {settings.heroSubheadline}
              </h1>
              <p className="text-[#94A3B8] text-base md:text-lg mt-2 leading-relaxed max-w-xl animate-fade-in-up stagger-3">
                {settings.heroDescription}
              </p>
            </div>

            {/* Search */}
            <div className="animate-fade-in-up stagger-4 flex items-center gap-2 bg-[#1E293B]/80 backdrop-blur-md border border-[#334155]/80 rounded-2xl px-4 py-3.5 max-w-xl focus-within:border-[#FF6B35] focus-within:ring-2 focus-within:ring-[#FF6B35]/20 focus-within:shadow-xl focus-within:shadow-[#FF6B35]/10 transition-all duration-300">
              <Search className="w-4 h-4 text-[#64748B] shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search food or restaurant..."
                className="bg-transparent text-sm text-[#F1F5F9] placeholder-[#64748B] outline-none flex-1 font-medium"
              />
              <button
                onClick={handleSearch}
                className="flex items-center gap-1.5 text-xs font-bold px-5 py-2.5 rounded-xl text-white bg-[#FF6B35] hover:bg-[#ff8255] transition-all duration-300 active:scale-95 hover:shadow-lg hover:shadow-[#FF6B35]/30"
              >
                Search <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Stats */}
            <div className="animate-fade-in-up stagger-5 flex items-center gap-8 mt-2">
              {[
                { value: `${settings.totalItems || 0}+`, label: "Menu Items" },
                { value: "20min", label: "Avg Delivery" },
                {
                  value: `${settings.avgRating || "4.8"}★`,
                  label: "Avg Rating",
                },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-2xl font-black text-[#F1F5F9]">
                    {stat.value}
                  </span>
                  <span className="text-xs font-medium text-[#64748B]">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Food Visual */}
          <div className="flex-1 flex items-center md:justify-end w-full max-w-full overflow-visible animate-fade-in stagger-3">
            <div className="relative w-72 h-72 md:w-80 md:h-80 scale-90 sm:scale-100">
              {/* Glow */}
              <div
                className="absolute inset-0 rounded-full opacity-30 animate-pulse"
                style={{
                  background: "radial-gradient(circle, #FF6B35 0%, transparent 70%)",
                }}
              />

              {/* Center circle */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-44 h-44 md:w-52 md:h-52 rounded-full bg-[#1E293B]/90 backdrop-blur-md border border-[#FF6B35]/30 shadow-2xl shadow-[#FF6B35]/10 flex items-center justify-center hover:scale-105 transition-transform duration-500">
                  <span className="text-7xl drop-shadow-lg">{settings.centerEmoji}</span>
                </div>
              </div>

              {/* Floating food cards */}
              {[
                { pos: "-top-2 -left-4", emoji: settings.foodEmojis?.[0] || "🍕", label: "Pizza", tag: "🔥 Popular", delay: "0s" },
                { pos: "-top-2 -right-4", emoji: settings.foodEmojis?.[1] || "🍜", label: "Noodles", tag: "⚡ 20 Min", delay: "0.3s" },
                { pos: "-bottom-2 -left-4", emoji: settings.foodEmojis?.[2] || "🌮", label: "Tacos", tag: "✨ Fresh", delay: "0.6s" },
                { pos: "-bottom-2 -right-4", emoji: settings.foodEmojis?.[3] || "🍣", label: "Sushi", tag: "⭐ 4.9★", delay: "0.9s" },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`absolute ${item.pos} z-20 flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-[#1E293B]/90 border border-[#334155]/80 backdrop-blur-md shadow-xl hover:border-[#FF6B35]/50 whitespace-nowrap hover:scale-110 transition-all duration-300`}
                  style={{
                    animation: "float 3.5s ease-in-out infinite",
                    animationDelay: item.delay,
                  }}
                >
                  <span className="text-2xl">{item.emoji}</span>
                  <div className="flex flex-col">
                    <span className="text-xs text-[#F1F5F9] font-bold leading-tight">
                      {item.label}
                    </span>
                    <span className="text-[10px] text-[#FF6B35] font-semibold">
                      {item.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
