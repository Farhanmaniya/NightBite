import AdminLayout from "../../components/admin/AdminLayout";
import API from "../../api/axios";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await API.get("/auth/users");
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const totalUsers = users.length;
  const totalCustomers = users.filter((user) => user.role === "customer").length;

  if (loading) return <Loader />;

  return (
    <AdminLayout>
      <div
        className="flex flex-col gap-6"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {/* Header row */}
        <div className="flex items-center justify-between">
          <h1 className="text-white font-bold text-2xl">Users</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#1A1A1A] border border-zinc-800 rounded-2xl p-5">
            <p className="text-zinc-400 text-sm">Total Users</p>
            <h2 className="text-3xl font-bold text-white mt-2">{totalUsers}</h2>
          </div>
          <div className="bg-[#1A1A1A] border border-zinc-800 rounded-2xl p-5">
            <p className="text-zinc-400 text-sm">Customers</p>
            <h2 className="text-3xl font-bold text-[#FF6B35] mt-2">{totalCustomers}</h2>
          </div>
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-xl px-4 py-1 text-white outline-none focus:border-[#FF6B35] transition-all"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        />

        {/* User Table */}
        <div className="bg-[#1A1A1A] rounded-2xl border border-zinc-800 overflow-hidden">
          <div className="overflow-x-auto">
             <div className="min-w-[800px]">
              {/* Table Header */}
              <div className="grid grid-cols-5 px-6 py-3 border-b border-zinc-800 bg-zinc-900">
                {["ID", "Name", "Email", "Role", "Joined"].map((h) => (
                  <span
                    key={h}
                    className="text-zinc-500 text-xs font-semibold uppercase tracking-widest"
                  >
                    {h}
                  </span>
                ))}
              </div>

              {/* Table Rows */}
              {users
                .filter(
                  (user) =>
                    user.name.toLowerCase().includes(search.toLowerCase()) ||
                    user.email.toLowerCase().includes(search.toLowerCase())
                )
                .map((user) => (
                  <div
                    key={user._id}
                    className="grid grid-cols-5 px-6 py-4 border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-all items-center"
                  >
                    {/* ID */}
                    <span className="text-sm text-white">#{user._id.slice(-6)}</span>

                    {/* Name with Avatar */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#FF6B35] flex items-center justify-center text-white font-bold shrink-0">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-white text-sm font-medium">{user.name}</span>
                    </div>

                    {/* Email */}
                    <span className="text-zinc-400 text-sm">{user.email}</span>

                    {/* Role Badge */}
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full w-fit ${
                        user.role === "admin"
                          ? "bg-[#FF6B35]/20 text-[#FF6B35]"
                          : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      {user.role}
                    </span>

                    {/* Joined Date */}
                    <span className="text-zinc-400 text-sm">
                      {new Date(user.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* Empty state */}
          {users.filter(
            (user) =>
              user.name.toLowerCase().includes(search.toLowerCase()) ||
              user.email.toLowerCase().includes(search.toLowerCase())
          ).length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 gap-2">
              <p className="text-zinc-500 text-sm">No users found.</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;