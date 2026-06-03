import { Pencil, Plus, Trash2, X } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import { useEffect, useState } from "react";
import API from "../../api/axios";
// import Button from "../../components/Button";
import Loader from "../../components/Loader";

const AdminMenu = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null,
    tag: "popular",
  });
  const [loading, setLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [preview, setPreview] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const openEditDrawer = (item) => {
    setForm({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      image: null,
      tag: item.tag,
    });

    setPreview(item.image);
    setEditingId(item._id);
    setIsEditing(true);
    setIsDrawerOpen(true);
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await API.get("/menu");

        setItems(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) return <Loader />

  const createItem = async () => {
    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("category", form.category);
      formData.append("tag", form.tag);

      if (form.image) {
        formData.append("image", form.image);
      }

      const response = await API.post("/menu", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setItems((prev) => [...prev, response.data]);

      setForm({
        name: "",
        description: "",
        price: "",
        category: "",
        image: null,
        tag: "popular",
      });

      setPreview("");

      setIsDrawerOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await API.delete(`/menu/${id}`);

      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {/* Drawer Backdrop */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[450px] bg-[#1A1A1A] border-l border-zinc-800 z-50 transform transition-transform duration-300 ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 flex flex-col h-full overflow-hidden">
          <div className="flex-1 overflow-y-auto pr-2">
            {/* All Inputs */}

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-xl font-bold">{isEditing ? "Edit Menu Item" : "Add Menu Item"}</h2>

              <button
                onClick={() => setIsDrawerOpen(false)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Food Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white"
              />

              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white"
              />

              <input
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white"
              />

              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white"
              >
                <option value="">Select Category</option>
                <option>Burgers</option>
                <option>Pizza</option>
                <option>Drinks</option>
                <option>Desserts</option>
                <option>Sides</option>
                <option>Starters</option>
              </select>

              <select
                value={form.tag}
                onChange={(e) => setForm({ ...form, tag: e.target.value })}
                className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white"
              >
                <option value="popular">Popular</option>
                <option value="new">New</option>
                <option value="featured">Featured</option>
              </select>

              <div className="flex flex-col gap-2">
                <label className="text-zinc-300 text-sm">Food Image</label>

                <input
                  type="file"
                  accept="image/"
                  onChange={(e) => {
                    const file = e.target.files[0];

                    if (!file) return;

                    setForm({ ...form, image: file });

                    setPreview(URL.createObjectURL(file));
                  }}
                  className="text-white text-sm"
                />

                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-xl border border-zinc-700"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-xl"
            >
              Cancel
            </button>
            <button
              onClick={createItem}
              className="flex-1 bg-[#FF6B35] hover:bg-[#FF8255] text-white font-semibold py-3 rounded-xl"
            >
              {isEditing ? "Update Item" : "Save Item"}
            </button>
          </div>
        </div>
      </div>

      <AdminLayout>
        <div
          className="flex flex-col gap-6"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          {/* Header row */}
          <div className="flex items-center justify-between">
            <h1 className="text-white font-bold text-2xl">Menu Items</h1>
            <button
              className="flex items-center gap-2 bg-[#FF6B35] hover:bg-[#FF8255] text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-all active:scale-95"
              onClick={() => setIsDrawerOpen(true)}
            >
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
            {items.map((item) => (
              <div
                key={item._id}
                className="grid grid-cols-5 px-6 py-4 border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-all items-center"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-xl object-cover"
                />
                <span className="text-white text-sm font-medium">
                  {item.name}
                </span>
                <span className="text-zinc-400 text-sm">{item.category}</span>
                <span className="text-white text-sm">₹{item.price}</span>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all" onClick={() => openEditDrawer(item)}>
                    <Pencil className="w-3.5 h-3.5"></Pencil>
                  </button>
                  <button
                    className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-red-400 hover:bg-zinc-700 transition-all"
                    onClick={() => deleteItem(item._id)}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminMenu;
