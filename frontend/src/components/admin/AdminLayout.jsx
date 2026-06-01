import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen" style={{ backgroundColor: "#0F0F0F" }}>

            {/* Sidebar - always visible */}
            <AdminSidebar />

            {/* Main Content - change per page */}
            <main className="flex-1 p-6">
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;