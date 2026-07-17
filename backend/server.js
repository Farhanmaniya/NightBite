const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const connectDB = require("./config/db");
const { apiLimiter } = require("./middleware/rateLimiter");
// const routes = require("./routes/authRoute");

// Load env variables
dotenv.config();
connectDB();

const app = express();
app.use(helmet());
app.use("/api", apiLimiter);

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://night-bite-azure.vercel.app",
      "https://night-bite-ciy5.vercel.app",
    ],
    credentials: true,
  }),
);


app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({ message: "NightBite API is running." });
});

// Routes — we'll add these later
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/menu", require("./routes/menuRoute"));
app.use("/api/orders", require("./routes/orderRoute"));
app.use("/api/coupons", require("./routes/couponRoute"));
app.use("/api/payment", require("./routes/paymentRoute"));
app.use("/api/contact", require("./routes/contactRoute"));
app.use("/api/settings", require("./routes/settingsRoute"));

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  if (err.name === "MulterError") {
    return res.status(400).json({ message: `Upload error: ${err.message}` });
  }
  if (err.message && err.message.includes("Only image files are allowed!")) {
    return res.status(400).json({ message: err.message });
  }
  res.status(500).json({ message: "Something went wrong. Please try again." });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
