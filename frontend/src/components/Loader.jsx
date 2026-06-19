import logoOnly from "../assets/logo-only.svg";

const Loader = () => {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8"
      style={{ backgroundColor: "#0F172A" }}
    >
      {/* Glow behind logo */}
      <div className="absolute w-48 h-48 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #FF6B35, transparent)" }} />

      {/* Logo */}
      <div className="flex items-center gap-3 animate-fade-in relative z-10">
        <img src={logoOnly} alt="NightBite" className="h-12" />
        <span className="text-3xl font-bold text-[#F1F5F9]">
          Night<span className="text-gradient">Bite</span>
        </span>
      </div>

      {/* Animated dots instead of basic spinner */}
      <div className="flex items-center gap-2 relative z-10">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2.5 h-2.5 rounded-full bg-[#FF6B35]"
            style={{
              animation: "bounce 1.2s ease-in-out infinite",
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>

      {/* Text */}
      <p className="text-[#64748B] text-xs tracking-[0.2em] uppercase relative z-10 animate-fade-in stagger-2">
        Loading your cravings...
      </p>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-12px); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Loader;
