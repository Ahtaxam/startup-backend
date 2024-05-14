const express = require("express");
const getAllUsers = require("../controller/allUsers");
const route = express.Router();

route.get("/all", getAllUsers);

module.exports = route;