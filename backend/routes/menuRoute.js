const express = require('express');
const router = express.Router();

const {
    getMenuItems,
    getMenuItemById,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
} = require("../controllers/menuController");

const upload = require("../middleware/upload");
const { protect, adminOnly } = require("../middleware/auth");

// Public Routes
router.get("/", getMenuItems);
router.get("/:id", getMenuItemById);

// Admin only routes
router.post("/", protect, adminOnly, upload.single("image"), createMenuItem);
router.put("/:id", protect, adminOnly, updateMenuItem);
router.delete("/:id", protect, adminOnly, deleteMenuItem);

module.exports = router;