const Order = require("../models/Order");
const crypto = require("crypto");

const mongoose = require("mongoose");

const placeOrder = async (req, res) => {
  try {
    console.log("🔍 DEBUG [orderController]: Incoming order request for user =", req.user?.id);
    console.log("📦 DEBUG [orderController]: Payload =", JSON.stringify(req.body, null, 2));

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

    // Address validation
    if (!address || typeof address !== "string" || !address.trim()) {
      return res.status(400).json({ message: "Please provide a valid delivery address" });
    }

    // Payment method validation
    const validPaymentMethod = paymentMethod === "Online" ? "Online" : "COD";

    // Items array validation & sanitization
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Your cart is empty" });
    }

    const isValidObjectId = (id) => {
      if (!id || typeof id !== "string") return false;
      return mongoose.Types.ObjectId.isValid(id) && String(new mongoose.Types.ObjectId(id)) === String(id);
    };

    const sanitizedItems = items.map((item) => {
      const candidateId = item.menuItem || item._id || item.id;
      return {
        menuItem: isValidObjectId(candidateId) ? candidateId : undefined,
        name: item.name || "Food Item",
        price: Number(item.price) || 0,
        quantity: Math.max(1, Number(item.quantity) || 1),
      };
    });

    // Safe coupon code
    const safeCouponCode = (typeof couponCode === "string") ? couponCode.trim() : "";
    const safeDiscount = Math.max(0, Number(discount) || 0);
    const safeTotalAmount = Math.max(0, Number(totalAmount) || 0);

    // Verify online payment signature if paymentMethod is Online
    if (validPaymentMethod === "Online") {
      if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
        return res.status(400).json({ message: "Online payment details are missing" });
      }

      if (!process.env.RAZORPAY_KEY_SECRET) {
        console.error("RAZORPAY_KEY_SECRET is missing in server environment variables!");
        return res.status(500).json({ message: "Payment configuration error on server" });
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
      items: sanitizedItems,
      totalAmount: safeTotalAmount,
      address: address.trim(),
      paymentMethod: validPaymentMethod,
      couponCode: safeCouponCode,
      discount: safeDiscount,
    });

    if (safeCouponCode) {
      const Coupon = require("../models/Coupon");
      const updatedCoupon = await Coupon.findOneAndUpdate(
        { code: safeCouponCode },
        { 
          $inc: { usedCount: 1 },
          $addToSet: { usedBy: req.user.id }
        },
        { new: true },
      );

      if (updatedCoupon && updatedCoupon.usedCount >= updatedCoupon.maxUses) {
        await Coupon.findByIdAndUpdate(updatedCoupon._id, { isActive: false });
      }
    }

    // Send order confirmation email asynchronously in background (non-blocking)
    setImmediate(async () => {
      try {
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
          const User = require("../models/User");
          const userObj = await User.findById(req.user.id);
          if (userObj && userObj.email) {
            const transporter = require("../config/nodemailer");
            const itemsListHtml = sanitizedItems
              .map((item) => `<li>${item.name} x ${item.quantity} - ₹${item.price * item.quantity}</li>`)
              .join("");

            await transporter.sendMail({
              from: process.env.EMAIL_USER,
              to: userObj.email,
              subject: `Order Confirmation - NightBite #${order._id.toString().slice(-6)}`,
              html: `
                <h2>Thank you for your order, ${userObj.name}!</h2>
                <p>Your order has been placed successfully.</p>
                <h3>Order Details:</h3>
                <ul>${itemsListHtml}</ul>
                <p><strong>Total Amount:</strong> ₹${order.totalAmount}</p>
                <p><strong>Delivery Address:</strong> ${order.address}</p>
                <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
                <br/>
                <p>We are preparing your night-time bite right now! 🌙🍔</p>
              `,
            });
          }
        }
      } catch (emailErr) {
        console.error("Non-fatal background email error:", emailErr.message);
      }
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("Error placing order:", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ message: messages.join(", ") });
    }

    res.status(400).json({ message: error.message || "Order placement failed. Please try again." });
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
