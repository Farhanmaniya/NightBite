const Coupon = require("../models/Coupon");

// @desc Get all coupons (admin)
const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.status(200).json(coupons);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};

// @desc Create coupon (admin)
const createCoupon = async (req, res) => {
  try {
    const couponData = { ...req.body };

    // Convert empty string numbers/dates to undefined to trigger schema defaults and validation
    if (couponData.minOrder === "") delete couponData.minOrder;
    if (couponData.maxUses === "") delete couponData.maxUses;
    if (couponData.discountValue === "") delete couponData.discountValue;
    if (couponData.expiryDate === "") delete couponData.expiryDate;

    const coupon = await Coupon.create(couponData);
    res.status(201).json(coupon);
  } catch (error) {
    console.error("Error creating coupon:", error);

    // Check for duplicate key error (code 11000)
    if (error.code === 11000) {
      return res.status(400).json({ message: "Coupon code already exists." });
    }

    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ message: messages.join(", ") });
    }

    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};

// @desc Delete coupon (admin)
const deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }
    res.status(200).json({ message: "Coupon deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};

// @desc Validate coupon (customer)
const validateCoupon = async (req, res) => {
  try {
    const { code, orderTotal } = req.body;

    // Prevent NoSQL Injection
    if (typeof code !== "string") {
      return res.status(400).json({ message: "Invalid input types" });
    }

    // Find coupon
    const coupon = await Coupon.findOne({ code, isActive: true });
    if (!coupon) {
      return res.status(404).json({ message: "Invalid coupon code" });
    }

    // Check expiry
    if (coupon.expiryDate < new Date()) {
      return res.status(400).json({ message: "Coupon expired" });
    }

    // Check min order
    if (coupon.minOrder !== null && coupon.minOrder !== undefined && orderTotal < coupon.minOrder) {
      return res.status(400).json({
        message: `Minimum order ₹${coupon.minOrder} required`,
      });
    }

    // Check max uses
    if (coupon.maxUses !== null && coupon.maxUses !== undefined && coupon.usedCount >= coupon.maxUses) {
      return res.status(400).json({ message: "Coupon usage limit reached" });
    }

    // Calculate Discount
    let discount = 0;
    if (coupon.discountType === "percentage") {
      discount = (orderTotal * coupon.discountValue) / 100;
    } else {
      discount = coupon.discountValue;
    }

    res.status(200).json({
      valid: true,
      discount,
      message: "Coupon applied successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};

const toggleCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }
    coupon.isActive = !coupon.isActive;
    await coupon.save();
    res.status(200).json(coupon);
  }catch (error) {
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};

module.exports = {
  getAllCoupons,
  createCoupon,
  deleteCoupon,
  validateCoupon,
  toggleCoupon,
};
