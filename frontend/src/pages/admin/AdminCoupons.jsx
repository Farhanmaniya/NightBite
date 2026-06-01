import { Plus, Pencil, Trash2 } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
const AdminCoupons = () => {
  const coupons = [
    {
      id: 1,
      code: "NIGHTBITE20",
      discount: "20%",
      type: "Percentage",
      expiry: "30 Jun 2026",
      status: "Active",
    },
    {
      id: 2,
      code: "FLAT50",
      discount: "₹50",
      type: "Flat",
      expiry: "15 Jun 2026",
      status: "Active",
    },
    {
      id: 3,
      code: "WELCOME10",
      discount: "10%",
      type: "Percentage",
      expiry: "01 Jun 2026",
      status: "Expired",
    },
  ];

  const tableHeader = [
    "Code",
    "Discount",
    "Type",
    "Expiry",
    "Status",
    "Action",
  ];
  return (
    <AdminLayout>
      <div
        className="flex flex-col gap-6"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {/* Header Row */}
        <div className="flex items-center justify-between">
          <h1 className="text-white font-bold text-2xl">Coupons</h1>
          <button className="flex items-center gap-2 bg-[#FF6B35] hover:bg-[#FF8255] text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-all active:scale-95">
            <Plus className="w-4 h-4" /> Add Coupon
          </button>
        </div>

        {/* Menu Table */}
        <div className="bg-[#1A1A1A] rounded-2xl border border-zinc-800 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-6 px-6 py-3 border-b border-zinc-800 bg-zinc-900">
            {tableHeader.map((header) => (
              <span
                key={header}
                className="text-zinc-500 text-xs font-semibold uppercase tracking-widest"
              >
                {header}
              </span>
            ))}
          </div>

          {/* Table Rows */}
          {coupons.map((coupon) => (
            <div
              key={coupon.id}
              className="grid grid-cols-6 px-6 py-4 border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-all items-center"
            >
              <span className="text-xs font-bold px-2 py-1 rounded-lg bg-zinc-800 text-[#FF6B35] tracking-widest border border-zinc-700">
                {coupon.code}
              </span>
              <span className="text-white text-sm font-medium">{coupon.discount}</span>
              <span className="text-zinc-400 text-sm ">{coupon.type}</span>
              <span className="text-zinc-400 text-sm ">{coupon.expiry}</span>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full w-fit ${
                    coupon.status === "Active"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-500"    
                }`}
              >{coupon.status}</span>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all">
                    <Pencil className="w-3.5 h-3.5"/>
                </button>
                <button className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all">
                    <Trash2 className="w-3.5 h-3.5"/>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCoupons;
