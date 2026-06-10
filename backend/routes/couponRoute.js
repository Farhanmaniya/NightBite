const express = require("express");
const router = express.Router();
const {
  getAllCoupons,
  createCoupon,
  deleteCoupon,
  validateCoupon,
  toggleCoupon,
} = require("../controllers/couponController");
const { protect, adminOnly } = require("../middleware/auth");


// Customer route
router.post("/validate", protect, validateCoupon);

// Admin route
router.get("/", protect, adminOnly, getAllCoupons);
router.post("/", protect, adminOnly, createCoupon);
router.delete("/:id", protect, adminOnly, deleteCoupon);
router.put("/:id", protect, adminOnly, toggleCoupon);

module.exports = router;