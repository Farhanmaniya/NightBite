import { useState, useEffect } from "react";
import { User, Save, LogOut, Mail, Phone, MapPin } from "lucide-react";
import API from "../api/axios";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/auth/profile");
        setForm({
          name: res.data.name || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          address: res.data.address || "",
        });
      } catch (error) {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await API.put("/auth/profile", {
        name: form.name,
        phone: form.phone,
        address: form.address,
      });
      const user = JSON.parse(localStorage.getItem("user"));
      localStorage.setItem("user", JSON.stringify({ ...user, name: res.data.name }));
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully!");
    navigate("/");
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0F172A" }}>
      <div className="px-4 py-24">
        <div className="max-w-2xl mx-auto flex flex-col gap-6">

          {/* Page Title */}
          <div className="animate-fade-in-up">
            <h1 className="text-[#F1F5F9] font-bold text-3xl flex items-center gap-2.5">
              <User className="w-7 h-7 text-[#FF6B35]" /> My Profile
            </h1>
            <p className="text-[#64748B] text-sm mt-1">Manage your account details</p>
          </div>

          {/* Avatar Card */}
          <div className="bg-[#1E293B]/60 backdrop-blur-sm rounded-2xl p-6 border border-[#334155]/50 flex items-center gap-4 animate-fade-in-up stagger-1">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF6B35] to-[#ff8255] flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-[#FF6B35]/20">
              {form.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-[#F1F5F9] font-bold text-lg">{form.name}</h2>
              <p className="text-[#64748B] text-sm flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" /> {form.email}
              </p>
            </div>
          </div>

          {/* Edit Form */}
          <div className="bg-[#1E293B]/60 backdrop-blur-sm rounded-2xl p-6 border border-[#334155]/50 flex flex-col gap-5 animate-fade-in-up stagger-2">
            <h3 className="text-[#F1F5F9] font-bold text-base">Edit Info</h3>

            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-[#94A3B8] uppercase tracking-widest font-semibold flex items-center gap-1.5">
                <User className="w-3 h-3" /> Full Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="bg-[#0F172A]/80 border border-[#334155]/60 rounded-xl px-4 py-2.5 text-sm text-[#F1F5F9] outline-none focus:border-[#FF6B35] focus:shadow-md focus:shadow-[#FF6B35]/5 transition-all"
              />
            </div>

            {/* Email — read only */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-[#94A3B8] uppercase tracking-widest font-semibold flex items-center gap-1.5">
                <Mail className="w-3 h-3" /> Email
              </label>
              <input
                type="email"
                value={form.email}
                readOnly
                className="bg-[#0F172A]/80 border border-[#334155]/60 rounded-xl px-4 py-2.5 text-sm text-[#64748B] outline-none cursor-not-allowed"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-[#94A3B8] uppercase tracking-widest font-semibold flex items-center gap-1.5">
                <Phone className="w-3 h-3" /> Phone
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="bg-[#0F172A]/80 border border-[#334155]/60 rounded-xl px-4 py-2.5 text-sm text-[#F1F5F9] outline-none focus:border-[#FF6B35] focus:shadow-md focus:shadow-[#FF6B35]/5 transition-all"
              />
            </div>

            {/* Address */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-[#94A3B8] uppercase tracking-widest font-semibold flex items-center gap-1.5">
                <MapPin className="w-3 h-3" /> Address
              </label>
              <textarea
                rows={3}
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="bg-[#0F172A]/80 border border-[#334155]/60 rounded-xl px-4 py-2.5 text-sm text-[#F1F5F9] outline-none focus:border-[#FF6B35] focus:shadow-md focus:shadow-[#FF6B35]/5 transition-all resize-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-2">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 flex items-center justify-center gap-2 bg-[#FF6B35] hover:bg-[#FF8255] text-white font-bold py-3 rounded-xl transition-all duration-300 active:scale-[0.98] text-sm disabled:opacity-50 hover:shadow-lg hover:shadow-[#FF6B35]/20"
              >
                <Save className="w-4 h-4" />
                {saving ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 flex items-center justify-center gap-2 border border-red-500/40 text-red-400 hover:bg-red-500/10 hover:border-red-500/60 font-bold py-3 rounded-xl transition-all duration-300 text-sm"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
};

export default Profile;