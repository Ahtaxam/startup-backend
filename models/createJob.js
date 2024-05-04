const mongoose = require("mongoose");

const createJobSchema = new mongoose.Schema({
  jobId: {
    type: Number,
    unique: true,
    default: 1,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
    min: 1,
  },
  salary: {
    type: String,
    required: true,
  },
  date: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  applications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
    },
  ],
});

createJobSchema.pre("save", async function (next) {
  try {
    const doc = this;

    const counter = await CreateJob.findOne(
      {},
      {},
      { sort: { jobId: -1 } }
    ).exec();

    if (counter) {
      doc.jobId = counter.jobId + 1;
    } else {
      doc.jobId = 1;
    }

    next();
  } catch (error) {
    next(error);
  }
});

const CreateJob = mongoose.model("CreateJob", createJobSchema);
module.exports = CreateJob;
