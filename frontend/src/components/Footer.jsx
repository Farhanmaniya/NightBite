import { Link } from "react-router-dom";
import { FaInstagram, FaTwitter, FaFacebook, FaYoutube } from "react-icons/fa";
import logo from "../assets/logo.svg";
import logoOnly from "../assets/logo-only.svg";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#0A1628",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Top CTA Strip */}
      <div
        className="w-full py-10 px-4 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[#334155]"
        style={{ backgroundColor: "#0F172A" }}
      >
        <div className="flex flex-col gap-1">
          <h2 className="text-[#F1F5F9] font-bold text-xl flex items-center gap-2">
            <img src={logoOnly} alt="NightBite" className="h-12" /> Late night craving?
          </h2>
          <p className="text-[#94A3B8] text-sm">
            We deliver fast, fresh, and right to your door.
          </p>
        </div>
        <Link
          to="/menu"
          className="bg-[#FF6B35] hover:bg-[#ff8255] text-white font-bold px-6 py-3 rounded-xl transition-all duration-200 active:scale-95 text-sm whitespace-nowrap"
        >
          Order Now →
        </Link>
      </div>

      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col gap-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1 - Logo + About */}
          <div className="flex flex-col gap-3 md:col-span-1">
            <Link to="/home" className="flex items-center gap-2">
              <img src={logo} alt="NightBite" className="h-12" />
            </Link>
            <p className="text-[#64748B] text-sm leading-relaxed">
              Good food, fast delivery. Order your favourite meals from the
              comfort of your home.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-2">
              {[
                { icon: FaInstagram, href: "#" },
                { icon: FaTwitter, href: "#" },
                { icon: FaFacebook, href: "#" },
                { icon: FaYoutube, href: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-8 h-8 rounded-lg bg-[#1E293B] border border-[#334155] flex items-center justify-center text-[#94A3B8] hover:text-[#FF6B35] hover:border-[#FF6B35] transition-all duration-200"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 - Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[#F1F5F9] font-semibold text-sm">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "Home", path: "/home" },
                { label: "Menu", path: "/menu" },
                { label: "My Orders", path: "/orders" },
                { label: "Profile", path: "/profile" },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-[#64748B] text-sm hover:text-[#FF6B35] transition-colors duration-200 w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 3 - Legal */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[#F1F5F9] font-semibold text-sm">Legal</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "Terms & Conditions", path: "/terms" },
                { label: "Privacy Policy", path: "/terms" },
                { label: "Contact Us", path: "/contact" },
              ].map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className="text-[#64748B] text-sm hover:text-[#FF6B35] transition-colors duration-200 w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 4 - Contact */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[#F1F5F9] font-semibold text-sm">Contact</h4>
            <div className="flex flex-col gap-2">
              <p className="text-[#64748B] text-sm">📧 nightbite@gmail.com</p>
              <p className="text-[#64748B] text-sm">📞 +91 98765 43210</p>
              <p className="text-[#64748B] text-sm">📍 Nadiad, Gujarat, India</p>
            </div>
          </div>
        </div>

        {/* Bottom - Copyright */}
        <div className="border-t border-[#334155] pt-6 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-[#64748B] text-xs">
            © 2026 NightBite. All rights reserved.
          </p>
          <p className="text-[#64748B] text-xs">
            Made with ❤️ in Gujarat, India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
