const USER = require("../models/user");


// controller to get all Investors
const getAllInvestors = async (req, res) => {
  try {
    const investors = await USER.find({ role: "Investor" });
    res.status(200).json({
      message: "investors fetched successfully",
      data: investors,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};


// controller to get detail of a single investor
const getSingleInvestor = async (req, res) => {
  try {
    const investor = await USER.find({ _id: req.params.id });
    if (investor.length === 0) {
      res.status(400).json({
        message: "Invalid Id",
        data: null,
      });
      return;
    }
    res.status(200).json({
      message: "investor fetched successfully",
      data: investor,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = { getAllInvestors, getSingleInvestor };
