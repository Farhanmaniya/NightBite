import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import API from "../api/axios";
import toast from "react-hot-toast";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      await API.post("/contact", form);
      toast.success("Message sent successfully! We'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen px-4 py-24"
      style={{ backgroundColor: "#0F172A", fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="max-w-5xl mx-auto">

        {/* Page Title */}
        <div className="flex flex-col gap-2 mb-10">
          <h1 className="text-[#F1F5F9] font-bold text-3xl">Contact Us</h1>
          <p className="text-[#94A3B8] text-sm">
            Have a question or feedback? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* LEFT — Contact Info */}
          <div className="flex flex-col gap-6">

            {/* Info Cards */}
            {[
              {
                icon: Mail,
                label: "Email Us",
                value: "maniyafarhan287@gmail.com ",
                sub: "We reply within 24 hours",
              },
              {
                icon: Phone,
                label: "Call Us",
                value: "+91 98765 43210",
                sub: "Mon–Sat, 9AM to 6PM",
              },
              {
                icon: MapPin,
                label: "Location",
                value: "Anand, Gujarat, India",
                sub: "Serving locally",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-[#1E293B] border border-[#334155] rounded-2xl p-5 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FF6B35]/20 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-[#FF6B35]" />
                </div>
                <div>
                  <p className="text-[#94A3B8] text-xs font-semibold uppercase tracking-widest">
                    {item.label}
                  </p>
                  <p className="text-[#F1F5F9] font-semibold text-sm mt-1">
                    {item.value}
                  </p>
                  <p className="text-[#64748B] text-xs mt-0.5">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT — Contact Form */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 flex flex-col gap-4">
            <h2 className="text-[#F1F5F9] font-bold text-lg">Send a Message</h2>

            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-[#94A3B8] uppercase tracking-widest font-semibold">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="bg-[#0F172A] border border-[#334155] rounded-xl px-4 py-2.5 text-sm text-[#F1F5F9] placeholder-[#64748B] outline-none focus:border-[#FF6B35] transition-all"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-[#94A3B8] uppercase tracking-widest font-semibold">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="bg-[#0F172A] border border-[#334155] rounded-xl px-4 py-2.5 text-sm text-[#F1F5F9] placeholder-[#64748B] outline-none focus:border-[#FF6B35] transition-all"
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-[#94A3B8] uppercase tracking-widest font-semibold">
                Message
              </label>
              <textarea
                rows={5}
                placeholder="Write your message here..."
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
                className="bg-[#0F172A] border border-[#334155] rounded-xl px-4 py-2.5 text-sm text-[#F1F5F9] placeholder-[#64748B] outline-none focus:border-[#FF6B35] transition-all resize-none"
              />
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-[#FF6B35] hover:bg-[#ff8255] text-white font-bold py-3 rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-50 text-sm"
            >
              {loading ? "Sending..." : (
                <><Send className="w-4 h-4" /> Send Message</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;