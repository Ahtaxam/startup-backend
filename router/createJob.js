const express = require("express");
const route = express.Router();
const CreateJob = require("../controller/createJob");
const {createjobController, getAllCreatedJobController, getSingleJobDetail, deleteJob}  = CreateJob
const isAuth = require("../middleware/isAuth");


route.post("/create", isAuth, createjobController);
route.get("/getAll", isAuth, getAllCreatedJobController );
route.get('/:id', isAuth, getSingleJobDetail);
route.delete('/:id', isAuth, deleteJob)

module.exports = route;
 