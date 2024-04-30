const User = require("../models/user");
const _ = require("lodash");
const joi = require("joi");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { Promise } = require("mongoose");
const path = require("path");

const completeProfile = async (req, res) => {
  // console.log(req.body);
  console.log(req.files);
  // console.log(req.body);
  const result = validateUser(req.body);
  // if (result.error) {
  //   res.status(400).json(result.error.details[0].message);
  //   return;
  // }

  const imageUrls = [];
  for (const file of req.files) {
    imageUrls.push(`${req.protocol}://${req.get("host")}/uploads/${file.filename}`);
  }


  const { email, ownerName, companyName, phoneNo, address } = req.body;
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res
      .status(400)
      .json({ message: "Please Enter Correct Email", status: 400 });
    return;
  } else {
    try {
      const result = await User.findOneAndUpdate(
        { email },
        {
          ownerName,
          companyName,
          phoneNo,
          address,
          companyProfile: imageUrls,
        },
        { new: true }
      );
      res.status(200).json({
        message: "Profile completed successfully!",
        status: 200,
        data: _.pick(result, [
          "_id",
          "firstName",
          "email",
          "role",
          "companyName",
          "ownerName",
          "address",
          "phoneNo",
        ]),
      });
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
};

function validateUser(user) {
  const { email, companyName, ownerName, address, phoneNo } = user;

  const schema = joi.object({
    email: joi.string().required().email(),
    companyName: joi.string().required(),
    ownerName: joi.string().allow("").required(),
    address: joi.string().required(),
    phoneNo: joi.string().required(),
  });

  return schema.validate({ email, companyName, ownerName, address, phoneNo });
}

module.exports = completeProfile;
