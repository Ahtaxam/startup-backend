const User = require("../models/user");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ role: "Student" });
    res.status(200).json({
      message: "users fetched successfully!",
      data: users,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = getAllUsers;
