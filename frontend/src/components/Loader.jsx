import logoOnly from "../assets/logo-only.svg";
const Loader = () => {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6"
      style={{
        backgroundColor: "#0F172A",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="text-3xl">
          <img src={logoOnly} alt="NightBite"/>
        </span>
        <span className="text-2xl font-bold text-[#F1F5F9]">
          Night<span style={{ color: "#FF6B35" }}>Bite</span>
        </span>
      </div>

      {/* Spinner */}
      <div className="w-10 h-10 border-4 border-[#334155] border-t-[#FF6B35] rounded-full animate-spin" />

      {/* Text */}
      <p className="text-[#94A3B8] text-sm tracking-widest uppercase">
        Loading...
      </p>
    </div>
  );
};

export default Loader;
