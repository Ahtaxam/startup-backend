const User = require("../models/user");

const getAllStudents = async (req, res, next) => {
  try {
    const users = await User.aggregate([
      { $match: { role: "Student" } },
      {
        $lookup: {
          from: "publishprojects",
          as: "Projects",
          localField: "_id",
          foreignField: "createdBy",
        },
      },
    ]);

    res.status(200).json({
      message: "students fetched successfully!",
      data: users,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = getAllStudents;
