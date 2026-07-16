import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, X } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import { useEffect, useState } from "react";
import API from "../../api/axios";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    code: "",
    discountType: "percentage",
    discountValue: "",
    minOrder: "",
    maxUses: "",
    expiryDate: "",
  });

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await API.get("/coupons");
        setCoupons(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  if (loading) return <Loader />;

  const totalCoupons = coupons.length;
  const activeCoupons = coupons.filter((c) => c.isActive).length;
  const expiredCoupons = coupons.filter(
    (c) => new Date(c.expiryDate) < new Date(),
  ).length;

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this coupon?")) return;
    try {
      await API.delete(`/coupons/${id}`);
      setCoupons(coupons.filter((c) => c._id !== id));
      toast.success("Coupon deleted successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete coupon");
    }
  };

  const handleToggle = async (id) => {
    try {
      const res = await API.put(`/coupons/${id}`);
      setCoupons(coupons.map((c) => (c._id === id ? res.data : c)));
      toast.success("Coupon status updated!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update coupon status");
    }
  };

  const handleCreate = async () => {
    if (!form.code.trim()) {
      toast.error("Coupon code is required");
      return;
    }
    if (!form.discountValue || isNaN(form.discountValue) || Number(form.discountValue) <= 0) {
      toast.error("Discount value must be a positive number");
      return;
    }
    if (!form.expiryDate) {
      toast.error("Expiry date is required");
      return;
    }

    const toastId = toast.loading("Creating coupon...");
    try {
      // Prepare sanitized payload
      const payload = {
        code: form.code.trim().toUpperCase(),
        discountType: form.discountType,
        discountValue: Number(form.discountValue),
        minOrder: form.minOrder ? Number(form.minOrder) : undefined,
        maxUses: form.maxUses ? Number(form.maxUses) : undefined,
        expiryDate: form.expiryDate,
      };

      const res = await API.post("/coupons", payload);
      setCoupons([...coupons, res.data]);
      setShowModal(false);
      setForm({
        code: "",
        discountType: "percentage",
        discountValue: "",
        minOrder: "",
        maxUses: "",
        expiryDate: "",
      });

      // On Success
      toast.dismiss(toastId);
      toast.success("Coupon created successfully!");
    } catch (error) {
      console.log(error);
      toast.dismiss(toastId);
      toast.error(error.response?.data?.message || "Failed to create coupon");
    }
  };
  return (
    <AdminLayout>
      <div
        className="flex flex-col gap-6"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-white font-bold text-2xl">Coupons</h1>
          <button
            className="flex items-center gap-2 bg-[#FF6B35] hover:bg-[#ff8255] text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-all active:scale-95"
            onClick={() => setShowModal(true)}
          >
            <Plus className="w-4 h-4" /> Add Coupon
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-[#1A1A1A] border border-zinc-800 rounded-2xl p-5">
            <p className="text-zinc-400 text-sm">Total Coupons</p>
            <h2 className="text-3xl font-bold text-white mt-2">
              {totalCoupons}
            </h2>
          </div>
          <div className="bg-[#1A1A1A] border border-zinc-800 rounded-2xl p-5">
            <p className="text-zinc-400 text-sm">Active</p>
            <h2 className="text-3xl font-bold text-green-400 mt-2">
              {activeCoupons}
            </h2>
          </div>
          <div className="bg-[#1A1A1A] border border-zinc-800 rounded-2xl p-5">
            <p className="text-zinc-400 text-sm">Expired</p>
            <h2 className="text-3xl font-bold text-red-400 mt-2">
              {expiredCoupons}
            </h2>
          </div>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by coupon code..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-[#FF6B35] transition-all"
        />

        {/* Table */}
        <div className="bg-[#1A1A1A] rounded-2xl border border-zinc-800 overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[950px]">
              {/* Header */}
              <div className="grid grid-cols-7 px-6 py-3 border-b border-zinc-800 bg-zinc-900">
                {[
                  "Code",
                  "Discount",
                  "Min Order",
                  "Expiry",
                  "Usage",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <span
                    key={h}
                    className="text-zinc-500 text-xs font-semibold uppercase tracking-widest"
                  >
                    {h}
                  </span>
                ))}
              </div>

              {/* Rows */}
              {coupons
                .filter((c) => c.code.toLowerCase().includes(search.toLowerCase()))
                .map((coupon) => (
                  <div
                    key={coupon._id}
                    className="grid grid-cols-7 px-6 py-4 border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-all items-center"
                  >
                    {/* Code */}
                    <span className="text-xs font-bold px-2 py-1 rounded-lg bg-zinc-800 text-[#FF6B35] tracking-widest border border-zinc-700 w-fit">
                      {coupon.code}
                    </span>

                    {/* Discount */}
                    <span className="text-white text-sm font-medium">
                      {coupon.discountType === "percentage"
                        ? `${coupon.discountValue}%`
                        : `₹${coupon.discountValue}`}
                    </span>

                    {/* Min Order */}
                    <span className="text-zinc-400 text-sm">
                      ₹{coupon.minOrder}
                    </span>

                    {/* Expiry */}
                    <span className="text-zinc-400 text-sm">
                      {new Date(coupon.expiryDate).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>

                    {/* Usage */}
                    <span className="text-zinc-400 text-sm">
                      {coupon.usedCount}/{coupon.maxUses}
                    </span>

                    {/* Status */}
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full w-fit ${
                        coupon.isActive
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {coupon.isActive ? "Active" : "Inactive"}
                    </span>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggle(coupon._id)}
                        className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all"
                      >
                        {coupon.isActive ? (
                          <ToggleRight className="w-4 h-4 text-green-400" />
                        ) : (
                          <ToggleLeft className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(coupon._id)}
                        className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-red-400 hover:bg-zinc-700 transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Empty state */}
          {coupons.filter((c) =>
            c.code.toLowerCase().includes(search.toLowerCase()),
          ).length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 gap-2">
              <p className="text-zinc-500 text-sm">No coupons found.</p>
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
          >
            <div
              className="bg-[#1A1A1A] border border-zinc-800 rounded-2xl p-6 w-full max-w-md flex flex-col gap-4"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-white font-bold text-lg">Add New Coupon</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-zinc-500 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Fields */}
              <div className="flex flex-col gap-3">
                {/* Code */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">
                    Coupon Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. SAVE20"
                    value={form.code}
                    onChange={(e) =>
                      setForm({ ...form, code: e.target.value.toUpperCase() })
                    }
                    className="bg-[#242424] border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#FF6B35] transition-all"
                  />
                </div>

                {/* Discount Type */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">
                    Discount Type
                  </label>
                  <select
                    value={form.discountType}
                    onChange={(e) =>
                      setForm({ ...form, discountType: e.target.value })
                    }
                    className="bg-[#242424] border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#FF6B35] transition-all"
                  >
                    <option value="percentage">Percentage</option>
                    <option value="flat">Flat</option>
                  </select>
                </div>

                {/* Discount Value */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">
                    Discount Value{" "}
                    {form.discountType === "percentage" ? "(%)" : "(₹)"}
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 20"
                    value={form.discountValue}
                    onChange={(e) =>
                      setForm({ ...form, discountValue: e.target.value })
                    }
                    className="bg-[#242424] border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#FF6B35] transition-all"
                  />
                </div>

                {/* Min Order + Max Uses — side by side */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">
                      Min Order (₹)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 200"
                      value={form.minOrder}
                      onChange={(e) =>
                        setForm({ ...form, minOrder: e.target.value })
                      }
                      className="bg-[#242424] border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#FF6B35] transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">
                      Max Uses
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 100"
                      value={form.maxUses}
                      onChange={(e) =>
                        setForm({ ...form, maxUses: e.target.value })
                      }
                      className="bg-[#242424] border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#FF6B35] transition-all"
                    />
                  </div>
                </div>

                {/* Expiry Date */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    value={form.expiryDate}
                    onChange={(e) =>
                      setForm({ ...form, expiryDate: e.target.value })
                    }
                    className="bg-[#242424] border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#FF6B35] transition-all"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 font-medium py-2.5 rounded-xl transition-all text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreate}
                  className="flex-1 bg-[#FF6B35] hover:bg-[#ff8255] text-white font-bold py-2.5 rounded-xl transition-all text-sm active:scale-95"
                >
                  Create Coupon
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminCoupons;
