const express = require("express");
const route = express.Router();
const isAuth = require("../middleware/isAuth");
const updateUserProfile = require("../controller/updateProfile");
const upload = require("../middleware/multer");

route.post("/update", isAuth , updateUserProfile);

module.exports = route;