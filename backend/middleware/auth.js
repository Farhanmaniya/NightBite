const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.headers.authorization?.split(" ")[1];

        // Check if token exists
        if (!token) {
            return res.status(401).json({ message: "No token, access denied" });
        } 

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user to request
        req.user = decoded;

        // Move to next middleware
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
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

