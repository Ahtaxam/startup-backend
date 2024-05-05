const express = require("express");
const route = express.Router();
const isAuth = require("../middleware/isAuth");
const getAllSoftwareHouses = require("../controller/softwareHouse");

route.get("/all", isAuth , getAllSoftwareHouses);

module.exports = route;