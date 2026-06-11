const SiteSettings = require("../models/SiteSettings");

// Get settings
const getSettings = async (req, res) => {
  try {
    const MenuItem = require("../models/MenuItem");

    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create({});
    }

    // Real stats
    const totalItems = await MenuItem.countDocuments({ isAvailable: true });

    const ratingData = await MenuItem.aggregate([
      { $match: { isAvailable: true } },
      { $group: { _id: null, avgRating: { $avg: "$rating" } } }
    ]);

    const avgRating = ratingData[0]?.avgRating?.toFixed(1) || "4.8";

    res.status(200).json({
      ...settings.toObject(),
      totalItems,
      avgRating,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update settings
const updateSettings = async (req, res) => {
    try {
        let settings = await SiteSettings.findOne();

        if (!settings) {
            settings = await SiteSettings.create(req.body);
        } else {
            settings = await SiteSettings.findByIdAndUpdate(
                settings._id,
                req.body,
                { new: true}
            );
        }

        res.status(200).json(settings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getSettings, updateSettings};