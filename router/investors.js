const express = require("express");
const route = express.Router();
const isAuth = require("../middleware/isAuth");

const Investors = require("../controller/investors");
const {
  getAllInvestors,
  getSingleInvestor,
  approveStatus,
  getApprovedInvestor,
} = Investors;

route.get("/all", isAuth, getAllInvestors);
route.get("/approved", isAuth, getApprovedInvestor);
route.get("/:id", isAuth, getSingleInvestor);
route.post("/status/:id", isAuth, approveStatus);

module.exports = route;
