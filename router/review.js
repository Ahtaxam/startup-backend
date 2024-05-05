const express = require("express");
const route = express.Router();
const isAuth = require("../middleware/isAuth");
const postReviewsController = require("../controller/reviews")

route.post("/", isAuth , postReviewsController);

module.exports = route;