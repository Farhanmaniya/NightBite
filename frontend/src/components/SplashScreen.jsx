import { useEffect, useState } from "react";
import logoOnly from "../assets/logo-only.svg";

const SplashScreen = ({ onFinish }) => {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState(0); // 0: logo, 1: text, 2: fade out

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 1800);
    const t3 = setTimeout(() => {
      setVisible(false);
      setTimeout(onFinish, 400);
    }, 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{ backgroundColor: "#0F172A" }}
    >
      {/* Ambient glow */}
      <div className="absolute w-64 h-64 rounded-full opacity-15 blur-[80px]" style={{ background: "radial-gradient(circle, #FF6B35, transparent)" }} />

      {/* Logo + Text */}
      <div className="flex items-center gap-4 relative z-10">
        <img 
          src={logoOnly} 
          alt="NightBite" 
          className={`h-14 transition-all duration-700 ${phase >= 0 ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
        />
        <span className={`text-4xl font-bold text-[#F1F5F9] transition-all duration-500 ${phase >= 1 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}>
          Night<span className="text-gradient">Bite</span>
        </span>
      </div>

      {/* Tagline */}
      <p className={`text-[#64748B] text-sm tracking-[0.15em] uppercase relative z-10 transition-all duration-500 delay-100 ${phase >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
        Good food, fast delivery
      </p>

      {/* Loading bar */}
      <div className={`w-32 h-1 bg-[#1E293B] rounded-full overflow-hidden relative z-10 transition-opacity duration-300 ${phase >= 1 ? "opacity-100" : "opacity-0"}`}>
        <div 
          className="h-full bg-gradient-to-r from-[#FF6B35] to-[#ff8255] rounded-full transition-all duration-[1500ms] ease-out"
          style={{ width: phase >= 1 ? "100%" : "0%" }}
        />
      </div>
    </div>
  );
};

export default SplashScreen;