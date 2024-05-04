const express = require("express");
const route = express.Router();
const isAuth = require("../middleware/isAuth");
const sendEmailController = require("../controller/sendEmail");

route.post("/send", isAuth, sendEmailController);

module.exports = route;