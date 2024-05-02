const USER = require("../models/user");

const updateUserProfile = async (req, res, next) => {
  let url = "";
  try {
    if (req.files.length > 0) {
      const file = req.files[0];
      url = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
    }
    const result = await USER.findOne({ email: req.body.email });
    const user = await USER.findOneAndUpdate(
      { email: req.body.email },
      {
        ...req.body,
        profileImage: req.files.length > 0 ? url : result.profileImage,
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
