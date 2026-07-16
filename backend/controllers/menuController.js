const MenuItem = require("../models/MenuItem");
const uploadToCloudinary = require("../utils/uploadToCloudinary");

// @desc Get all menu items
const getMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.find({ isAvailable: true });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};

// @desc Get single menu item
const getMenuItemById = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};

// @desc Create menu item
const createMenuItem = async (req, res) => {
  try {
    // console.log("BODY:", req.body);
    // console.log("FILE:", req.file);

    const { name, description, price, category, image, tag } = req.body;
    let imageUrl = "";

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
    }
    const item = await MenuItem.create({
      name,
      description,
      price,
      category,
      tag,
      image: imageUrl,
    });
    res.status(201).json(item);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};

// @desc Update menu item
const updateMenuItem = async (req, res) => {
  try {
    const { name, description, price, category, tag } = req.body;

    const existingItem = await MenuItem.findById(req.params.id);

    if (!existingItem) {
      return re.status(404).json({
        message: "Item not found",
      });
    }

    let imageUrl = existingItem.image;

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);

      imageUrl = result.secure_url;
    }

    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        category,
        tag,
        image: imageUrl,
      },
      {
        new: true,
      },
    );

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong. Please try again.",
    });
  }
};

const deleteMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};

module.exports = {
  getMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
};
