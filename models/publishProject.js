const mongoose = require("mongoose");

const publishProjectSchema = new mongoose.Schema({
  projectId: {
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
  category: {
    type: String,
    required: true,
  },
  keywords: [{ type: String }],
  projectLink: {
    type: String,
    default: "",
  },
  githubLink: {
    type: String,
    default: "",
  },
  images: [{ type: String }],
 
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

publishProjectSchema.pre("save", async function (next) {
  try {
    const doc = this;

    const counter = await PublishProjects.findOne(
      {},
      {},
      { sort: { projectId: -1 } }
    ).exec();

    if (counter) {
      doc.projectId = counter.projectId + 1;
    } else {
      doc.projectId = 1;
    }

    next();
  } catch (error) {
    next(error);
  }
});

const PublishProjects = mongoose.model("PublishProject", publishProjectSchema);
module.exports = PublishProjects;
