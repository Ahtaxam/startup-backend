const User = require("../models/user");
const _ = require("lodash");
const joi = require("joi");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("../config/key");

const createUser = async (req, res) => {
  const result = validateUser(req.body);
  if (result.error) {
    res.status(400).json(result.error.details[0].message);
    return;
  }

  const user = await User.findOne({ email: req.body.email });
  if (user) {
    res.status(400).json({ message: "Email Already register " });
    return;
  } else {
    let user = new User(
      _.pick(req.body, ["firstName", "lastName", "email", "password", "role"])
    );
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const token = jwt.sign({ _id: user._id }, config.jwtPrivateKey);
    try {
      user = await user.save();
      res.status(200).json({
        message: "user created successfully",
        data: _.pick(user, [
          "_id",
          "firstName",
          "lastName",
          "email",
          "role",
          "profileImage",
        ]),
        token,
      });
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
};

function validateUser(user) {
  const { firstName, lastName, email, password, role } = user;

  const schema = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().required().email(),
    password: joi.string().min(8).required(),
    role: joi.string().required(),
    companyName: joi.string().allow("").optional(),
    ownerName: joi.string().allow("").optional(),
    address: joi.string().allow("").optional(),
    phoneNo: joi.string().allow("").optional(),
    // companyName: joi.when("role", {
    //   is: "Software house",
    //   then: joi.string().required(),
    //   otherwise: joi.string().allow("").optional(),
    // }),

    // ownerName: joi.when("role", {
    //   is: "Software house",
    //   then: joi.string().required(),
    //   otherwise: joi.string().allow("").optional(),
    // }),
    // address: joi.when("role", {
    //   is: "Software house",
    //   then: joi.string().required(),
    //   otherwise: joi.string().allow("").optional(),
    // }),
    // phoneNo: joi.when("role", {
    //   is: "Software house",
    //   then: joi.string().required(),
    //   otherwise: joi.string().allow("").optional(),
    // }),
  });

  return schema.validate({ firstName, lastName, role, email, password });
}

module.exports = createUser;
