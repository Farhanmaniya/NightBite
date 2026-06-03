const express = require("express");
const router = express.Router();

const {
  placeOrder,
//   getAllOrders,
  getAllOrders,
  updateOrderStatus,
  getMyOrders,
} = require("../controllers/orderController");
const { protect, adminOnly } = require("../middleware/auth");

// Customer Route
router.post("/", protect, placeOrder);
router.post("/my", protect, getMyOrders);

// Admin Route
router.get("/all", protect, adminOnly, getAllOrders);
router.put("/:id", protect, adminOnly, updateOrderStatus);

module.exports = router;