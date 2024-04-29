const express = require("express");
const route = express.Router();
const authUser = require("../controller/Auth");
route.post("/", authUser);

module.exports = route;