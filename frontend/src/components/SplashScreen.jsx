import { useEffect, useState } from "react";

const SplashScreen = ({ onFinish }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onFinish, 500); // wait for fade out
    }, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{ backgroundColor: "#0F172A", fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-3 animate-bounce"
      >
        <span className="text-5xl">🌙</span>
        <span className="text-4xl font-bold text-[#F1F5F9]">
          Night<span style={{ color: "#FF6B35" }}>Bite</span>
        </span>
      </div>

      {/* Tagline */}
      <p className="text-[#94A3B8] text-sm tracking-widest uppercase">
        Good food, fast delivery
      </p>

      {/* Spinner */}
      <div className="w-8 h-8 border-4 border-[#334155] border-t-[#FF6B35] rounded-full animate-spin mt-4" />
    </div>
  );
};

export default SplashScreen;