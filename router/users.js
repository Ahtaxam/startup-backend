const express = require("express");
const route = express.Router();

const getAllStudents = require("../controller/users");

route.get("/all", getAllStudents);

module.exports = route;
