const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const loginRoute = require("./router/auth");
const signupRoute = require("./router/user");
const softwareHouseProfileRoute = require("./router/completeProfile");
const createJobRoute = require("./router/createJob");
const updateProfileRoute = require("./router/updateProfile");
const publishProjectRoute = require("./router/publishProject");

const app = express();
const port = 3100;
const connectionString = "mongodb://localhost:27017/startUp";

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("connected to mongoDB");
  })
  .catch(() => {
    console.log("Error while connecting");
  });

app.use("/api/v1/login", loginRoute);
app.use("/api/v1/signup", signupRoute);
app.use("/api/v1/profile", softwareHouseProfileRoute);
app.use("/api/v1/job", createJobRoute);
app.use("/api/v1/profile", updateProfileRoute);
app.use("/api/v1/project", publishProjectRoute)


app.listen(port, () => {
  console.log(`server is listning on port ${port}`);
});
