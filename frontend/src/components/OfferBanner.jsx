import { useState } from "react";
import { Copy, Check } from "lucide-react";

const banners = [
  {
    id: 1,
    emoji: "🎉",
    title: "20% off first order!",
    subtitle: "New users only. Limited time.",
    code: "NIGHTBITE20",
    gradient: "linear-gradient(135deg, #FF6B35, #ff8255)",
  },
  {
    id: 2,
    emoji: "🍕",
    title: "Free Pizza Friday!",
    subtitle: "Order above ₹499 today.",
    code: "FREEPIZZA",
    gradient: "linear-gradient(135deg, #7C3AED, #9F67FF)",
  },
  {
    id: 3,
    emoji: "🥤",
    title: "Buy 1 Get 1 Drinks",
    subtitle: "Every weekend, all drinks.",
    code: "BOGO50",
    gradient: "linear-gradient(135deg, #059669, #34D399)",
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
      className="rounded-2xl p-5 flex flex-col justify-between gap-4 h-full shadow-lg shadow-black/10"
      style={{ background: banner.gradient }}
    >
      <div className="flex flex-col gap-2">
        {/* Title */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">{banner.emoji}</span>
          <h3 className="text-white font-bold text-base">{banner.title}</h3>
        </div>

        {/* Subtitle */}
        <p className="text-white/80 text-xs">{banner.subtitle}</p>
      </div>

      {/* Coupon Code */}
      <div className="flex items-center gap-2 bg-black/20 rounded-xl px-3 py-2 mt-auto">
        <span className="text-white font-bold tracking-widest text-xs flex-1">
          {banner.code}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 bg-white text-xs font-bold px-3 py-1 rounded-lg hover:bg-zinc-100 transition-all active:scale-95 shrink-0"
          style={{ color: "#FF6B35" }}
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