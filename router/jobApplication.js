const express = require("express");
const route = express.Router();
const isAuth = require("../middleware/isAuth");
const applyJob = require("../controller/jobApplication");

route.post("/", isAuth, applyJob);

module.exports = route;