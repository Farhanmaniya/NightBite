const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.headers.authorization?.split(" ")[1];

        console.log("🔍 DEBUG [Auth Middleware]: Request path =", req.originalUrl, "| Token present =", !!token);

        // Check if token exists
        if (!token) {
            console.log("❌ DEBUG [Auth Middleware]: No token header found!");
            return res.status(401).json({ message: "No authentication token provided. Please log in." });
        } 

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ DEBUG [Auth Middleware]: Token verified successfully for user =", decoded.id);

        // Attach user to request
        req.user = decoded;

        // Move to next middleware
        next();
    } catch (error) {
        console.log("❌ DEBUG [Auth Middleware]: Token verification failed ->", error.message);
        res.status(401).json({ message: `Session invalid: ${error.message}. Please log in again.` });
    }
};

// Admin only middleware
const adminOnly = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Admin access only" });
    }
    next();
}

module.exports = { protect, adminOnly };

