const User = require("../models/user");
const PublishProjects = require("../models/publishProject");
const mongoose = require("mongoose");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      message: "users fetched successfully!",
      data: users,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = getAllUsers;
