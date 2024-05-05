const CreateJob = require("../models/createJob");
const Application = require("../models/jobApplication");
const User = require("../models/user");
const Review = require("../models/review");
const joi = require("joi");

const createjobController = async (req, res, next) => {
  const result = validatejob(req.body);
  if (result.error) {
    res.status(400).json(result.error.details[0].message);
    return;
  }

  try {
    let created = new CreateJob({ ...req.body, createdBy: req.user._id });
    created = await created.save();
    res.status(200).json({
      message: "Job Created Successfully",
      data: created,
      status: 200,
    });
  } catch (err) {
    res.status(400).json(err.mrssage);
  }
};

const getAllCreatedJobController = async (req, res, next) => {
  try {
    const result = await CreateJob.find({ createdBy: req.user._id });

    res.status(200).json({
      message: "Job fetched successfully",
      data: result,
      status: 200,
    });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const getSingleJobDetail = async (req, res, next) => {
  const { id } = req.params;
  try {
    const job = await CreateJob.find({ jobId: id }).populate({
      path: "applications",
      populate: {
        path: "user",
      },
    });
    if (job.length <= 0) {
      res.status(200).json({
        message: "Invalid Id",
        data: null,
      });
      return;
    }
    res.status(200).json({
      message: "Job fetched successfully",
      data: job,
    });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const deleteJob = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    const job = await CreateJob.deleteOne({ jobId: id });

    res.status(200).json({
      message: "Job Deleted successfully",
      data: job,
    });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

// const getAllJobs = async (req, res, next) => {
//   try {
//     const jobs = await CreateJob.find({});
//     const user = await User.find({ _id: req.user._id }).populate(
//       "applications"
//     );

//     const jobApplicationStatusMap = new Map();
//     user.map((obj) => {
//       obj.applications.map((obj) =>
//         jobApplicationStatusMap.set(obj.job.toString(), true)
//       );
//     });

//     const companyIds = Array.from(new Set(jobs.map((job) => job.createdBy)));

//     const companyReviews = await Review.find({ company: { $in: companyIds } });

//     const companyRatingMap = new Map();
//     companyReviews.forEach((review) => {
//       companyRatingMap.set(review.company.toString(), review.rating);
//     });

//     const jobsWithApplicationStatus = jobs.map((job) => {
//       const hasApplied = jobApplicationStatusMap.has(job._id.toString());
//       const rating = companyRatingMap.get(job.createdBy.toString()) || null;
//       return { ...job._doc, hasApplied, rating };
//     });

//     res.status(200).json({
//       message: "jobs fetched successfully",
//       data: jobsWithApplicationStatus,
//       status: 200,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(400).json(err.message);
//   }
// };
const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await CreateJob.find({});
    const user = await User.find({ _id: req.user._id }).populate(
      "applications"
    );

    const jobApplicationStatusMap = new Map();
    user.forEach((obj) => {
      obj.applications.forEach((application) =>
        jobApplicationStatusMap.set(application.job.toString(), true)
      );
    });

    const companyIds = Array.from(new Set(jobs.map((job) => job.createdBy)));

    const companyReviews = await Review.aggregate([
      {
        $match: { company: { $in: companyIds } },
      },
      {
        $group: {
          _id: "$company",
          averageRating: { $avg: "$rating" },
        },
      },
    ]);
    const companyRatingMap = new Map();
    companyReviews.forEach((review) => {
      companyRatingMap.set(review._id.toString(), review.averageRating);
    });

    const jobsWithApplicationStatus = jobs.map((job) => {
      const hasApplied = jobApplicationStatusMap.has(job._id.toString());
      const rating = companyRatingMap.get(job.createdBy.toString()) || null;
      return { ...job._doc, hasApplied, rating };
    });

    res.status(200).json({
      message: "Jobs fetched successfully",
      data: jobsWithApplicationStatus,
      status: 200,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json(err.message);
  }
};

function validatejob(data) {
  const {
    title,
    description,
    type,
    experience,
    salary,
    date,
    companyName,
    address,
  } = data;

  const schema = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    type: joi.string().required(),
    salary: joi.string().required(),
    experience: joi.number().min(1).required(),
    date: joi.date().required(),
    companyName: joi.string().required(),
    address: joi.string().required(),
  });

  return schema.validate({
    title,
    description,
    type,
    experience,
    salary,
    date,
    companyName,
    address,
  });
}

module.exports = {
  createjobController,
  getAllCreatedJobController,
  getSingleJobDetail,
  deleteJob,
  getAllJobs,
};
