import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin } from "lucide-react";

const Hero = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) navigate(`/menu?search=${query}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const popularTags = ["🍔 Burger", "🍕 Pizza", "🍜 Noodles", "🌮 Tacos", "🍣 Sushi"];

  return (
    <section
      className="min-h-screen flex items-center relative overflow-hidden"
      style={{ backgroundColor: "#0F172A", fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Background glow effects */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #FF6B35, transparent)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #FF6B35, transparent)" }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full pt-24 pb-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">

          {/* LEFT — Text + Search */}
          <div className="flex-1 flex flex-col gap-6">

            {/* Location pill */}
            <div className="flex items-center gap-2 w-fit px-3 py-1.5 rounded-full border border-[#334155] bg-[#1E293B]">
              <MapPin className="w-3.5 h-3.5" style={{ color: "#FF6B35" }} />
              <span className="text-xs text-[#94A3B8]">Delivering to <span className="text-[#F1F5F9] font-medium">Anand, Gujarat</span></span>
            </div>

            {/* Headline */}
            <div className="flex flex-col gap-2">
              <h1 className="text-5xl sm:text-6xl font-bold text-[#F1F5F9] leading-tight">
                Hungry?
              </h1>
              <h1 className="text-5xl sm:text-6xl font-bold leading-tight" style={{ color: "#FF6B35" }}>
                We deliver.
              </h1>
              <p className="text-[#94A3B8] text-base mt-2 leading-relaxed max-w-md">
                Order from the best restaurants near you. Fast delivery, great food, every time.
              </p>
            </div>

            {/* Search Bar */}
            <div className="flex items-center gap-2 bg-[#1E293B] border border-[#334155] rounded-2xl px-4 py-3 max-w-md focus-within:border-[#FF6B35] transition-all duration-200">
              <Search className="w-4 h-4 text-[#94A3B8] shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search food or restaurant..."
                className="bg-transparent text-sm text-[#F1F5F9] placeholder-zinc-600 outline-none flex-1"
              />
              <button
                onClick={handleSearch}
                className="text-xs font-bold px-4 py-1.5 rounded-xl text-[#F1F5F9] transition-all duration-200 active:scale-95"
                style={{ backgroundColor: "#FF6B35" }}
              >
                Search
              </button>
            </div>

            {/* Popular Tags */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-[#94A3B8]">Popular:</span>
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag.split(" ")[1])}
                  className="text-xs px-3 py-1.5 rounded-full border border-[#334155] text-[#94A3B8] hover:border-[#FF6B35] hover:text-[#F1F5F9] bg-[#1E293B] hover:bg-zinc-800 transition-all duration-200"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 mt-2">
              {[
                { value: "500+", label: "Restaurants" },
                { value: "20min", label: "Avg Delivery" },
                { value: "4.8★", label: "Avg Rating" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-xl font-bold text-[#F1F5F9]">{stat.value}</span>
                  <span className="text-xs text-[#94A3B8]">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Food Visual */}
          <div className="flex-1 flex items-center justify-center relative">

            {/* Outer glow ring */}
            <div
              className="absolute w-72 h-72 rounded-full opacity-20"
              style={{ background: "radial-gradient(circle, #FF6B35, transparent)" }}
            />

            {/* Center food emoji */}
            <div className="relative z-10 flex flex-col items-center justify-center w-64 h-64 rounded-full bg-[#1E293B] border border-[#334155] shadow-2xl">
              <span className="text-8xl">🍔</span>
            </div>

            {/* Floating food cards */}
            {[
              { emoji: "🍕", label: "Pizza", top: "0%", left: "0%", delay: "0s" },
              { emoji: "🍜", label: "Noodles", top: "0%", right: "0%", delay: "0.3s" },
              { emoji: "🌮", label: "Tacos", bottom: "10%", left: "0%", delay: "0.6s" },
              { emoji: "🍣", label: "Sushi", bottom: "10%", right: "0%", delay: "0.9s" },
            ].map((item) => (
              <div
                key={item.label}
                className="absolute z-20 flex items-center gap-2 px-3 py-2 rounded-xl bg-[#1E293B] border border-[#334155] shadow-lg"
                style={{
                  top: item.top,
                  left: item.left,
                  right: item.right,
                  bottom: item.bottom,
                  animation: `float 3s ease-in-out infinite`,
                  animationDelay: item.delay,
                }}
              >
                <span className="text-xl">{item.emoji}</span>
                <span className="text-xs text-zinc-300 font-medium">{item.label}</span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Float animation */}
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