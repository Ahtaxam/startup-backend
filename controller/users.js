const User = require("../models/user");
const PublishProjects = require("../models/publishProject");
const mongoose = require("mongoose")

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

const getstudentAllProjects = async (req, res) => {
  try {
    const { id } = req.params;
    const stuId = new mongoose.Types.ObjectId(id)
    const users = await User.aggregate([
      { $match: { _id:stuId} },
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
      message: "project fetched successfully",
      data: users,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = { getAllStudents, getstudentAllProjects };
