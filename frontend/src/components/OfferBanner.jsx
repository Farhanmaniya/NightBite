import { useState } from "react";
import { Copy, Check } from "lucide-react";

const banners = [
  {
    id: 1,
    emoji: "🎉",
    title: "20% off first order!",
    subtitle: "New users only. Limited time.",
    code: "NIGHTBITE20",
    badge: "Special Offer",
  },
  {
    id: 2,
    emoji: "🍕",
    title: "Free Pizza Friday!",
    subtitle: "Order above ₹499 today.",
    code: "FREEPIZZA",
    badge: "Weekend Deal",
  },
  {
    id: 3,
    emoji: "🥤",
    title: "Buy 1 Get 1 Drinks",
    subtitle: "Every weekend, all drinks.",
    code: "BOGO50",
    badge: "BOGO Offer",
  },
];

const BannerCard = ({ banner }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(banner.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="bg-[#1E293B]/70 backdrop-blur-md border border-[#FF6B35]/30 hover:border-[#FF6B35]/60 rounded-2xl p-5 flex flex-col justify-between gap-4 h-full shadow-xl shadow-black/20 hover:shadow-[#FF6B35]/10 transition-all duration-300 relative group overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF6B35]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#FF6B35]/20 transition-all" />

      <div className="flex flex-col gap-2 relative z-10">
        {/* Title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{banner.emoji}</span>
            <h3 className="text-[#F1F5F9] font-bold text-base">{banner.title}</h3>
          </div>
          <span className="text-[10px] font-bold text-[#FF6B35] bg-[#FF6B35]/10 px-2.5 py-1 rounded-full border border-[#FF6B35]/20">
            {banner.badge}
          </span>
        </div>

        {/* Subtitle */}
        <p className="text-[#94A3B8] text-xs">{banner.subtitle}</p>
      </div>

      {/* Coupon Code */}
      <div className="flex items-center gap-2 bg-[#0F172A]/80 border border-[#334155]/60 rounded-xl px-3 py-2 mt-auto relative z-10">
        <span className="text-[#FF6B35] font-black tracking-widest text-xs flex-1">
          {banner.code}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 bg-[#FF6B35] text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-[#ff8255] transition-all active:scale-95 shrink-0 shadow-md shadow-[#FF6B35]/20"
        >
          {copied ? (
            <><Check className="w-3 h-3" /> Copied!</>
          ) : (
            <><Copy className="w-3 h-3" /> Copy</>
          )}
        </button>
      </div>
    </div>
  );
};

const OfferBanner = () => {
  return (
    <section
      className="max-w-6xl mx-auto px-4 sm:px-6 py-8 w-full"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <h2 className="text-[#F1F5F9] font-bold text-xl mb-6">
        Offers & Coupons
      </h2>
      {/* 🛠️ Fixed layout spacing and breakpoints here 👇 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners.map((banner) => (
          <BannerCard key={banner.id} banner={banner} />
        ))}
      </div>
    </section>
  );
};

export default OfferBanner;