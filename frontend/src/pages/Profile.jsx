import { useState, useEffect } from "react";
import { User } from "lucide-react";
import API from "../api/axios";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
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

  // Load profile on mount
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
      // Update localStorage
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
    <div
      className="min-h-screen px-4 py-24"
      style={{ backgroundColor: "#0F172A", fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="max-w-2xl mx-auto flex flex-col gap-6">

        {/* Page Title */}
        <h1 className="text-[#F1F5F9] font-bold text-2xl flex items-center gap-2">
          <User className="w-6 h-6" /> My Profile
        </h1>

        {/* Avatar Card */}
        <div className="bg-[#1E293B] rounded-2xl p-6 border border-[#334155] flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#FF6B35] flex items-center justify-center text-white font-bold text-2xl">
            {form.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-[#F1F5F9] font-bold text-lg">{form.name}</h2>
            <p className="text-[#94A3B8] text-sm">{form.email}</p>
          </div>
        </div>

        {/* Edit Form */}
        <div className="bg-[#1E293B] rounded-2xl p-6 border border-[#334155] flex flex-col gap-4">
          <h3 className="text-[#F1F5F9] font-bold text-base">Edit Info</h3>

          {/* Full Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-[#94A3B8] uppercase tracking-widest font-semibold">Full Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-[#0F172A] border border-[#334155] rounded-xl px-4 py-2.5 text-sm text-[#F1F5F9] outline-none focus:border-[#FF6B35] transition-all"
            />
          </div>

          {/* Email — read only */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-[#94A3B8] uppercase tracking-widest font-semibold">Email</label>
            <input
              type="email"
              value={form.email}
              readOnly
              className="bg-[#0F172A] border border-[#334155] rounded-xl px-4 py-2.5 text-sm text-[#64748B] outline-none cursor-not-allowed"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-[#94A3B8] uppercase tracking-widest font-semibold">Phone</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="bg-[#0F172A] border border-[#334155] rounded-xl px-4 py-2.5 text-sm text-[#F1F5F9] outline-none focus:border-[#FF6B35] transition-all"
            />
          </div>

          {/* Address */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-[#94A3B8] uppercase tracking-widest font-semibold">Address</label>
            <textarea
              rows={3}
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="bg-[#0F172A] border border-[#334155] rounded-xl px-4 py-2.5 text-sm text-[#F1F5F9] outline-none focus:border-[#FF6B35] transition-all resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 bg-[#FF6B35] hover:bg-[#FF8255] text-white font-bold py-2.5 rounded-xl transition-all duration-200 active:scale-95 text-sm disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 border border-red-500 text-red-400 hover:bg-red-500/10 font-bold py-2.5 rounded-xl transition-all duration-200 text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;