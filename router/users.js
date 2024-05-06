const express = require("express");
const route = express.Router();

const Students = require("../controller/users");
const {getAllStudents, getstudentAllProjects} = Students;

route.get("/all", getAllStudents);
route.get("/projects/:id", getstudentAllProjects)

module.exports = route;
