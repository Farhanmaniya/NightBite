const express = require("express");
const router = express.Router();
const {UserLogin, UserRegister} = require("../controllers/authController");

// @route POST /api/auth/register
// @desc Register new user
router.post("/register", UserRegister);

// @route POST /api/auth/login
// @desc Login existing User
router.post("/login", UserLogin);

module.exports = router;