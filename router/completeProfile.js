const express = require("express");
const completeProfile = require("../controller/completeProfile");
const upload = require("../middleware/multer");
const route = express.Router();

route.post("/software", upload.any(),completeProfile);

module.exports = route;