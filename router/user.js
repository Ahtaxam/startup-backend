const express = require("express");
const createUser = require("../controller/user");
const upload = require("../middleware/multer");
const route = express.Router();

route.post("/", upload.any(), createUser);

module.exports = route;