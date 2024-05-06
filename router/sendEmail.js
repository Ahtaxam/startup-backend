const express = require("express");
const route = express.Router();
const isAuth = require("../middleware/isAuth");
const Controllers = require("../controller/sendEmail");
const {sendEmailController, sendInvestorEmailController} = Controllers;

route.post("/send", isAuth, sendEmailController);
route.post("/investor/send", isAuth, sendInvestorEmailController);

module.exports = route;
