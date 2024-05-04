const Application = require("../models/jobApplication");
const CreateJob = require("../models/createJob");
const User = require("../models/user");

const applyJob = async (req, res, next) => {
  try {
    const { userId, jobId } = req.body;

    const job = await CreateJob.findById({_id:jobId});
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingApplication = await Application.findOne({
      user: userId,
      job: jobId,
    });
    if (existingApplication) {
      return res
        .status(400)
        .json({ message: "you have already applied for this job" });
    }

    const application = new Application({
      user: userId,
      job: jobId,
    });

    await application.save();
    // console.log(job.applications, user.applications);

    job.applications.push(application._id);
    await job.save();

    user.applications.push(application._id);
    await user.save();

    return res
      .status(200)
      .json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error("Error applying for job:", error);
    res.status(400).json(error.message);
  }
};

module.exports = applyJob;
