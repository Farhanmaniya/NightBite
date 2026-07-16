const Order = require("../models/Order");

const placeOrder = async (req, res) => {
  try {
    const { items, totalAmount, address, paymentMethod, couponCode, discount } =
      req.body;

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
