const Order = require("../models/Order");
const crypto = require("crypto");

const placeOrder = async (req, res) => {
  try {
    const { 
      items, 
      totalAmount, 
      address, 
      paymentMethod, 
      couponCode, 
      discount,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature 
    } = req.body;

    // Prevent NoSQL Injection / Type Tampering
    if (
      typeof address !== "string" || 
      typeof paymentMethod !== "string" ||
      (couponCode !== undefined && couponCode !== null && typeof couponCode !== "string")
    ) {
      return res.status(400).json({ message: "Invalid input types" });
    }

    // Verify online payment signature if paymentMethod is Online
    if (paymentMethod === "Online") {
      if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
        return res.status(400).json({ message: "Online payment details are missing" });
      }
      if (
        typeof razorpayOrderId !== "string" ||
        typeof razorpayPaymentId !== "string" ||
        typeof razorpaySignature !== "string"
      ) {
        return res.status(400).json({ message: "Invalid payment detail types" });
      }

      // Verify signature
      const body = razorpayOrderId + "|" + razorpayPaymentId;
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

      if (expectedSignature !== razorpaySignature) {
        return res.status(400).json({ message: "Payment verification failed. Order not placed." });
      }
    }

    const order = await Order.create({
      user: req.user.id,
      items,
      totalAmount,
      address,
      paymentMethod,
      couponCode,
      discount,
    });

    if (couponCode) {
      const Coupon = require("../models/Coupon");
      const updatedCoupon = await Coupon.findOneAndUpdate(
        { code: couponCode },
        { $inc: { usedCount: 1 } },
        { new: true },
      );

      if (updatedCoupon && updatedCoupon.usedCount >= updatedCoupon.maxUses) {
        await Coupon.findByIdAndUpdate(updatedCoupon._id, { isActive: false });
      }
    }
    res.status(201).json(order);
  } catch (error) {
    console.error("Error placing order:", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ message: messages.join(", ") });
    }

    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};

module.exports = {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
};
