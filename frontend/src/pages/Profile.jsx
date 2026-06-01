import { User } from "lucide-react";
const Profile = () => {
  return (
    <div
      className="min-h-screen px-4 py-24"
      style={{
        backgroundColor: "#0F172A",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        {/* Page Title */}
        <h1 className="text-[#F1F5F9] font-bold text-2xl flex items-center gap-2">
          <User className="w-6 h-6" /> My Profile
        </h1>

        {/* Avatar Card */}
        <div className="bg-[#1E293B] rounded-2xl p-6 border border-[#334155] flex items-center gap-4">
          {/* Avatar Circle */}
          <div className="w-16 h-16 rounded-full bg-[#FF6B35] flex items-center justify-center text-[#F1F5F9] font-bold text-2xl">
            J
          </div>
          {/* Name + email */}
          <div>
            <h2 className="text-[#F1F5F9] font-bold text-lg">John Doe</h2>
            <p className="text-[#94A3B8] text-sm">john@example.com</p>
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
                    defaultValue="John Doe"
                    className="bg-[#0F172A] border border-[#334155] rounded-xl px-4 py-2.5 text-sm text-[#F1F5F9] outline-none focus:border-[#FF6B35] transition-all"
                />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
                <label className="text-xs text-[#94A3B8] uppercase tracking-widest font-semibold">Email</label>
                <input 
                    type="email"
                    defaultValue="john@example.com"
                    className="bg-[#0F172A] border border-[#334155] rounded-xl px-4 py-2.5 text-sm text-[#F1F5F9] outline-none focus:border-[#FF6B35] transition-all"
                />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1.5">
                <label className="text-xs text-[#94A3B8] uppercase tracking-widest font-semibold">Phone</label>
                <input 
                    type="tel"
                    defaultValue="+91 98765 43210"
                    className="bg-[#0F172A] border border-[#334155] rounded-xl px-4 py-2.5 text-sm text-[#F1F5F9] outline-none focus:border-[#FF6B35] transition-all"
                />
            </div>

            {/* Address */}
            <div className="flex flex-col gap-1.5">
                <label className="text-xs text-[#94A3B8] uppercase tracking-widest font-semibold">Address</label>
                <textarea 
                    rows={3}
                    defaultValue="123, Main Street, Anand, Gujarat"
                    className="bg-[#0F172A] border border-[#334155] rounded-xl px-4 py-2.5 text-sm text-[#F1F5F9] outline-none focus:border-[#FF6B35] transition-all resize-none"
                />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-2">
                <button className="flex-1 bg-[#FF6B35] hover:bg-[#FF8255] text-[#F1F5F9] font-bold py-2.5 rounded-xl transition-all duration-200 active:scale-95 text-sm">
                    Save Changes
                </button>
                <button className="flex-1 border border-red-500 text-red-400 hover:bg-red-500/10 font-bold py-2.5 rounded-xl transition-all duration-200 text-sm">
                    Logout
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
