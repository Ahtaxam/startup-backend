const express = require("express");
const route = express.Router();
const isAuth = require("../middleware/isAuth");

const Investors = require("../controller/investors");
const { getAllInvestors, getSingleInvestor } = Investors;

route.get("/all", isAuth, getAllInvestors);

route.get("/:id", isAuth, getSingleInvestor);

module.exports = route;
