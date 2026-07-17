const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/auth");
const { authLimiter } = require("../middleware/rateLimiter");
const {UserLogin, UserRegister, getAllUsers, updateProfile, getProfile, getDashboardStats} = require("../controllers/authController");

// @route POST /api/auth/register
// @desc Register new user
router.post("/register", authLimiter, UserRegister);

// @route POST /api/auth/login
// @desc Login existing User
router.post("/login", authLimiter, UserLogin);

router.get("/users", protect, adminOnly, getAllUsers);
router.get("/dashboard", protect, adminOnly, getDashboardStats);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

module.exports = router;