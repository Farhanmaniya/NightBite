import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    // No token -> redirect to login
    if (!token || !user) {
        return <Navigate to="/" replace />;
    }

    // Admin only route but user is not admin
    if (adminOnly && user.role !== "admin") {
        return <Navigate to="/home" replace />;
    }

    if (!adminOnly && user.role === "admin" && window.location.pathname === "/") {
        return <Navigate to="/admin/dashboard" replace />;
    }
    return children;
};

export default ProtectedRoute;