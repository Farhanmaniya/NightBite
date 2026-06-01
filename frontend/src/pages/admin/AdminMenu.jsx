import { Pencil, Plus, Trash2 } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";

const AdminMenu = () => {
  return (
    <AdminLayout>
      <div
        className="flex flex-col gap-6"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {/* Header row */}
        <div className="flex items-center justify-between">
          <h1 className="text-white font-bold text-2xl">Menu Items</h1>
          <button className="flex items-center gap-2 bg-[#FF6B35] hover:bg-[#FF8255] text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-all active:scale-95">
            <Plus className="w-4 h-4" /> Add Item
          </button>
        </div>

        {/* Menu Table */}
        <div className="bg-[#1A1A1A] rounded-2xl border border-zinc-800 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-5 px-6 py-3 border-b border-zinc-800 bg-zinc-900">
            {["Image", "Name", "Category", "Price", "Actions"].map((h) => (
              <span
                key={h}
                className="text-zinc-500 text-xs font-semibold uppercase tracking-widest"
              >
                {h}
              </span>
            ))}
          </div>

          {/* Table Rows */}
          {[
            {
              id: 1,
              name: "Crispy Fries",
              category: "Sides",
              price: 99,
              image: "🍟",
            },
            {
              id: 2,
              name: "Chicken Burger",
              category: "Burgers",
              price: 199,
              image: "🍔",
            },
            {
              id: 3,
              name: "Margherita Pizza",
              category: "Pizza",
              price: 299,
              image: "🍕",
            },
            {
              id: 4,
              name: "Mango Lassi",
              category: "Drinks",
              price: 79,
              image: "🥤",
            },
          ].map((item) => (
            <div key={item.id}
                className="grid grid-cols-5 px-6 py-4 border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-all items-center">
                    <span className="text-3xl">{item.image}</span>
                    <span className="text-white text-sm font-medium">{item.name}</span>
                    <span className="text-zinc-400 text-sm">{item.category}</span>
                    <span className="text-white text-sm">₹{item.price}</span>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <button className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all">
                            <Pencil className="w-3.5 h-3.5"></Pencil>
                        </button>
                        <button
                            className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-red-400 hover:bg-zinc-700 transition-all"
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                        </button>
                    </div>
            </div>     
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminMenu;
