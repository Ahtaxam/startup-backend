const express = require("express");
const PublishProjects = require("../controller/publishProjects");
const {publishProjectController, getAllProjectsController} = PublishProjects;
const upload = require("../middleware/multer");
const isAuth = require("../middleware/isAuth");
const route = express.Router();

route.post("/publish", isAuth, upload.any() ,publishProjectController);
route.get('/getAll', isAuth, getAllProjectsController);

module.exports = route;