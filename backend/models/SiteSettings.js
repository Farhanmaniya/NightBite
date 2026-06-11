const mongoose = require("mongoose");

const siteSettingsSchema = new mongoose.Schema({
  heroHeadline: {
    type: String,
    default: "Hungry?",
  },
  heroSubheadline: {
    type: String,
    default: "We deliver.",
  },
  heroDescription: {
    type: String,
    default: "Order from the best restaurants near you. Fast delivery, great food, every time.",
  },
  foodEmojis: {
    type: [String],
    default: ["🍔", "🍕", "🍜", "🌮", "🍣"],
  },
  centerEmoji: {
    type: String,
    default: "🍔",
  },
}, { timestamps: true });

module.exports = mongoose.model("SiteSettings", siteSettingsSchema);