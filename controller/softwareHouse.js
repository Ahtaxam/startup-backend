const Review = require("../models/review");
const USER = require("../models/user")


// controller for getting all registered software house
const getAllSoftwareHouses = async (req, res, next) => {
  try {
    const softwareHouses = await USER.find({ role: "Software house" });

    const softwareHouseIds = softwareHouses.map((house) => house._id);

    const reviews = await Review.find({ company: { $in: softwareHouseIds } });

    const ratingMap = new Map();
    reviews.forEach((review) => {
      ratingMap.set(review.company.toString(), review.rating);
    });

    const softwareHousesWithRating = softwareHouses.map((house) => {
      const rating = ratingMap.get(house._id.toString()) || null; 
      return { ...house._doc, rating };
    });

    res.status(200).json({
      message: "Software houses fetched successfully",
      data: softwareHousesWithRating,
      status: 200,
    });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

module.exports = getAllSoftwareHouses;
