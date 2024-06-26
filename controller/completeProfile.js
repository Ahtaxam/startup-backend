const User = require("../models/user");
const _ = require("lodash");
const joi = require("joi");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { Promise } = require("mongoose");
const path = require("path");
const jwt = require("jsonwebtoken");
// const { config } = require("../config/key");
const config = require("../config/key");


// controller for complete profile of software house
const completeProfile = async (req, res) => {
  const result = validateUser(req.body);
  if (result.error) {
    res.status(400).json(result.error.details[0].message);
    return;
  }

  const { email, ownerName, companyName, phoneNo, address, images } = req.body;
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
          companyProfile: images,
        },
        { new: true }
      );

      const token = jwt.sign({ _id: user._id }, config.jwtPrivateKey);
      res.status(200).json({
        message: "Profile completed successfully!",
        status: 200,
        data: _.pick(result, [
          "_id",
          "firstName",
          "lastName",
          "email",
          "role",
          "companyName",
          "ownerName",
          "address",
          "phoneNo",
          "companyProfile"
        ]),
        token,
      });
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
};


// validate data before store into DB
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
