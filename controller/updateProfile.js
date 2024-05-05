const USER = require("../models/user");

const updateUserProfile = async (req, res, next) => {
  let profileImageUrl = "";
  let resumeUrl = "";

  try {
    if (req.files.length > 0) {
      req.files.forEach((file) => {
        const url = `${req.protocol}://${req.get("host")}/uploads/${
          file.filename
        }`;

        if (file.fieldname === "profileImage") {
          profileImageUrl = url;
        } else if (file.fieldname === "resume") {
          resumeUrl = url;
        }
      });
    }

    const result = await USER.findOne({ email: req.body.email });
    const user = await USER.findOneAndUpdate(
      { email: req.body.email },
      {
        ...req.body,
        profileImage: profileImageUrl || result.profileImage,
        resume: resumeUrl || result.resume,
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
