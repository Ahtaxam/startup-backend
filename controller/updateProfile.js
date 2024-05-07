const USER = require("../models/user");

const updateUserProfile = async (req, res, next) => {
  try {
    const user = await USER.findOneAndUpdate(
      { email: req.body.email },
      {
        ...req.body,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Profile updated successfully",
      data: user,
    });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

module.exports = updateUserProfile;
