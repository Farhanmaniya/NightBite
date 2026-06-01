import AdminLayout from "../../components/admin/AdminLayout";

const AdminUsers = () => {
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      orders: 5,
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      orders: 3,
      status: "Active",
    },
    {
      id: 3,
      name: "Raj Patel",
      email: "raj@example.com",
      orders: 1,
      status: "Blocked",
    },
  ];
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

        {/* User Table */}
        <div className="bg-[#1A1A1A] rounded-2xl border border-zinc-800 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-6 px-6 py-3 border-b border-zinc-800 bg-zinc-900">
            {["ID", "Name", "Email", "Orders", "Status", "Action"].map((h) => (
              <span
                key={h}
                className="text-zinc-500 text-xs font-semibold uppercase tracking-widest"
              >
                {h}
              </span>
            ))}
          </div>

          {/* Table Rows */}
          {users.map((user) => (
            <div
              key={user.id}
              className="grid grid-cols-6 px-6 py-4 border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-all items-center"
            >
              <span className="text-sm text-white">{user.id}</span>
              <span className="text-white text-sm font-medium">
                {user.name}
              </span>
              <span className="text-zinc-400 text-sm">{user.email}</span>
              <span className="text-sm text-white items-center">
                {user.orders}
              </span>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full w-fit ${
                  user.status === "Active"
                    ? "bg-green-500/20 text-green-400"
                    : user.status === "Blocked"
                      ? "bg-red-500/20 text-red-500"
                      : "bg-zinc-300/20 text-white"
                }`}
              >
                {user.status}
              </span>

              {/* Action - change status */}
              <button
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                  user.status === "Active"
                    ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                    : "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                }`}
              >
                {user.status === "Active" ? "Block" : "Unblock"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
