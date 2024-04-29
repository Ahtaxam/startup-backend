const { required, types } = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  role: {
    type: String,
    required: true,
    enum: ["Software house", "Student", "Investor"],
  },
  profileImage: {
    type: String,
  },

  companyName: {
    type: String,
  },
  ownerName: {
    type: String,
  },
  phoneNo: {
    type: String,
  },
  address: {
    type: String,
  },
  companyProfile: [{ type: String }],
});

const users = mongoose.model("User", userSchema);
module.exports = users;
