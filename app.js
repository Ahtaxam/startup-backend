const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config()

const loginRoute = require("./router/auth");
const signupRoute = require("./router/user");
const softwareHouseProfileRoute = require("./router/completeProfile");
const createJobRoute = require("./router/createJob");
const updateProfileRoute = require("./router/updateProfile");
const publishProjectRoute = require("./router/publishProject");
const sendEmailRoute = require("./router/sendEmail");
const jobApplicationRoute = require("./router/jobApplication");
const softwareHouseRoute = require("./router/softwareHouse");
const ReviewRoute = require("./router/review");
const usersRoute = require("./router/users")

const app = express();
const port = process.env.PORT || 3000;
const connectionString = process.env.MONGO_URL;

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("connected to mongoDB");
  })
  .catch((err) => {
    console.log(err);
    console.log("Error while connecting");
  });

app.use("/api/v1/login", loginRoute);
app.use("/api/v1/signup", signupRoute);
app.use("/api/v1/profile", softwareHouseProfileRoute);
app.use("/api/v1/job", createJobRoute);
app.use("/api/v1/profile", updateProfileRoute);
app.use("/api/v1/project", publishProjectRoute);
app.use("/api/v1/email", sendEmailRoute);
app.use("/api/v1/jobapply", jobApplicationRoute);
app.use("/api/v1/softwarehouse", softwareHouseRoute);
app.use("/api/v1/review", ReviewRoute);
app.use("/api/v1/users", usersRoute)

app.listen(port, () => {
  console.log(`server is listning on port ${port}`);
});
