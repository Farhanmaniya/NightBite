import { Home } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: "#0F172A",
      }}
    >
      <div className="flex flex-col items-center gap-6 text-center">
        {/* Big 404 */}
        <h1 className="text-8xl font-bold" style={{ color: "#FF6B35" }}>
          404
        </h1>

        {/* Food emoji */}
        <span className="text-6xl">🍔</span>

        {/* Message */}
        <div className="flex flex-col gap-2">
          <h2 className="text-[#F1F5F9] font-bold text-2xl">Page Not Found</h2>
          <p className="text-[#94A3B8] text-sm max-w-sm">
            Looks like this page went missing like the last slice of pizza. Let's get you back on track.
          </p>
        </div>

        {/* Back Button */}
        <Link to="/home" className="bg-[#FF6B35] hover:bg-[#FF8255] text-white font-bold px-6 py-3 rounded-xl transition-all duration-200 active:scale-95 text-sm">
            <span className="flex items-center gap-2">Back to Home <Home className="w-4 h-4" /></span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
