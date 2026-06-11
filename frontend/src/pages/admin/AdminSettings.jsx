import { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import API from "../../api/axios";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";
import { Save } from "lucide-react";

const AdminSettings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    heroHeadline: "",
    heroSubheadline: "",
    heroDescription: "",
    centerEmoji: "",
    foodEmojis: ["", "", "", ""],
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await API.get("/settings");
        setForm({
          heroHeadline: res.data.heroHeadline,
          heroSubheadline: res.data.heroSubheadline,
          heroDescription: res.data.heroDescription,
          centerEmoji: res.data.centerEmoji,
          foodEmojis: res.data.foodEmojis.slice(0, 4),
        });
      } catch (error) {
        toast.error("Failed to load settings");
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await API.put("/settings", form);
      toast.success("Settings saved successfully!");
    } catch (error) {
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const handleEmojiChange = (index, value) => {
    const updated = [...form.foodEmojis];
    updated[index] = value;
    setForm({ ...form, foodEmojis: updated });
  };

  if (loading) return <Loader />;

  return (
    <AdminLayout>
      <div
        className="flex flex-col gap-6"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-white font-bold text-2xl">Site Settings</h1>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-[#FF6B35] hover:bg-[#ff8255] text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-all active:scale-95 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {/* Hero Section Settings */}
        <div className="bg-[#1A1A1A] rounded-2xl border border-zinc-800 p-6 flex flex-col gap-4">
          <h2 className="text-white font-bold text-base">Hero Section</h2>

          {/* Headline */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">
              Main Headline
            </label>
            <input
              type="text"
              value={form.heroHeadline}
              onChange={(e) => setForm({ ...form, heroHeadline: e.target.value })}
              className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#FF6B35] transition-all"
            />
          </div>

          {/* Subheadline */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">
              Sub Headline
            </label>
            <input
              type="text"
              value={form.heroSubheadline}
              onChange={(e) => setForm({ ...form, heroSubheadline: e.target.value })}
              className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#FF6B35] transition-all"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">
              Description
            </label>
            <textarea
              rows={3}
              value={form.heroDescription}
              onChange={(e) => setForm({ ...form, heroDescription: e.target.value })}
              className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#FF6B35] transition-all resize-none"
            />
          </div>
        </div>

        {/* Emoji Settings */}
        <div className="bg-[#1A1A1A] rounded-2xl border border-zinc-800 p-6 flex flex-col gap-4">
          <h2 className="text-white font-bold text-base">Food Emojis</h2>

          {/* Center Emoji */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">
              Center Emoji (main)
            </label>
            <input
              type="text"
              value={form.centerEmoji}
              onChange={(e) => setForm({ ...form, centerEmoji: e.target.value })}
              className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#FF6B35] transition-all w-32"
            />
          </div>

          {/* Floating Emojis */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">
              Floating Emojis (4)
            </label>
            <div className="grid grid-cols-4 gap-3">
              {form.foodEmojis.map((emoji, index) => (
                <input
                  key={index}
                  type="text"
                  value={emoji}
                  onChange={(e) => handleEmojiChange(index, e.target.value)}
                  className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#FF6B35] transition-all text-center text-2xl"
                />
              ))}
            </div>
            <p className="text-zinc-600 text-xs mt-1">
              Paste emojis directly — e.g. 🍕 🍔 🌮 🍜
            </p>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminSettings;