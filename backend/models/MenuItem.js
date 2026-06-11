const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ["Starters", "Main Course", "Burgers", "Drinks", "Pizza","Desserts", "Pizza", "Sides"],
    },
    image: {
        type: String,
        default: "",
    },
    tag: {
        type: String,
        enum: ["popular", "new", "featured"],
        default: "popular",
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    rating: {
        type: Number,
        default: 4.0,
        min: 1,
        max: 5,
    },
    isVeg: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const MenuItems = mongoose.model("MenuItem", menuItemSchema);

module.exports = MenuItems;