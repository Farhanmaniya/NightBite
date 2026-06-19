import { Home, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
      style={{ backgroundColor: "#0F172A" }}
    >
      {/* Ambient glow */}
      <div className="absolute w-96 h-96 rounded-full opacity-10 blur-[100px]" style={{ background: "radial-gradient(circle, #FF6B35, transparent)" }} />

      <div className="flex flex-col items-center gap-8 text-center relative z-10">
        {/* Big 404 */}
        <h1 className="text-[120px] sm:text-[160px] font-extrabold leading-none text-gradient animate-fade-in">
          404
        </h1>

        {/* Food emoji with float */}
        <span className="text-6xl animate-float">🍔</span>

        {/* Message */}
        <div className="flex flex-col gap-3 animate-fade-in-up stagger-2">
          <h2 className="text-[#F1F5F9] font-bold text-2xl">Page Not Found</h2>
          <p className="text-[#94A3B8] text-sm max-w-sm leading-relaxed">
            Looks like this page went missing like the last slice of pizza. Let's get you back on track.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 animate-fade-in-up stagger-3">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 border border-[#334155] text-[#94A3B8] hover:text-[#F1F5F9] hover:border-[#94A3B8] font-medium px-5 py-3 rounded-xl transition-all duration-200 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
          <Link 
            to="/home" 
            className="flex items-center gap-2 bg-[#FF6B35] hover:bg-[#FF8255] text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 active:scale-95 text-sm hover:shadow-lg hover:shadow-[#FF6B35]/20"
          >
            <Home className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
