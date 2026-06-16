const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { apiLimiter } = require("./middleware/rateLimiter");
// const routes = require("./routes/authRoute");

// Load env variables
dotenv.config();
connectDB();

const app = express();
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

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
