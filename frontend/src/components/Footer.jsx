import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer
      className="bg-[#0F172A] border-t border-[#334155] px-4 py-12 text-[#F1F5F9]"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Top Section - 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Col 1 - Log+ + tagline */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">🌙</span>
          <span className="text-xl font-bold text-[#F1F5F9]">
            Night<span style={{ color: "#FF6B35" }}>Bite</span>
          </span>
        </div>
        <p className="text-[#94A3B8] text-sm leading-relaxed"></p>
        {/* Col 2 - Links */}
        <div>
          <h4 className="text-[#F1F5F9] font-semibold text-sm mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2">
            <Link
              className="text-[#94A3B8] text-sm hover:text-[#FF6B35] transition-colors duration-200"
              to="/home"
            >
              Home
            </Link>
            <Link
              className="text-[#94A3B8] text-sm hover:text-[#FF6B35] transition-colors duration-200"
              to="/menu"
            >
              Menu
            </Link>
            <Link
              className="text-[#94A3B8] text-sm hover:text-[#FF6B35] transition-colors duration-200"
              to="/about"
            >
              About Us
            </Link>
            <Link
              className="text-[#94A3B8] text-sm hover:text-[#FF6B35] transition-colors duration-200"
              to="/contact"
            ></Link>
          </div>
        </div>
        {/* Col 3 - Contact */}
        <div>
          <h4 className="text-[#F1F5F9] font-semibold text-sm mb-4">Contact</h4>
          <p className="text-[#94A3B8] text-sm flex items-center gap-2">
            📧 nightbite@gmail.com
          </p>
          <p className="text-[#94A3B8] text-sm flex items-center gap-2">
            📞 +91 98765 43210
          </p>
        </div>
      </div>

      <div className="border-t border-[#334155] pt-6 text-center text-zinc-400 text-xs">
        © 2024 NightBite. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
