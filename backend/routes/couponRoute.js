const express = require("express");
const router = express.Router();
const {
  getAllCoupons,
  createCoupon,
  deleteCoupon,
  validateCoupon,
} = require("../controllers/couponController");
const { protect, adminOnly } = require("../middleware/auth");


// Customer route
router.post("/validate", protect, validateCoupon);

// Admin route
router.get("/", protect, adminOnly, getAllCoupons);
router.post("/", protect, adminOnly, createCoupon);
router.delete("/", protect, adminOnly, deleteCoupon);

module.exports = router;