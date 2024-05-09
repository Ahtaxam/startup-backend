const REVIEWS = require("../models/review");



// controller to process review given by student to software house
const postReviewsController = async (req, res, next) => {
  try {
    const existingReview = await REVIEWS.findOne({ givenBy: req.body.givenBy, company:req.body.company });

    if (existingReview) {
      existingReview.rating = req.body.rating;
      await existingReview.save();
    } else {
      const review = new REVIEWS({ ...req.body });
      await review.save();
    }

    res.status(200).json({
      message: "Reviews submitted successfully",
      status: 200,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = postReviewsController;
