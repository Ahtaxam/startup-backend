const express = require("express");
const route = express.Router();

const getAllUsers = require("../controller/users");

route.get("/all", getAllUsers);

module.exports = route;
