const PublishProject = require("../models/publishProject");
const joi = require("joi");

const publishProjectController = async (req, res, next) => {
  const result = validateProjects(req.body);
  if (result.error) {
    res.status(400).json(result.error.details[0].message);
    return;
  }

  try {
    const imageUrls = [];
    for (const file of req.files) {
      imageUrls.push(
        `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
      );
    }
    const project = new PublishProject({
      ...req.body,
      images: imageUrls,
      createdBy: req.user._id,
    });

    const data = await project.save();
    res.status(200).json({
      message: "Project published successfully",
      data,
      status: 200,
    });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const getAllProjectsController = async (req, res, next) => {
  try {
    const projects = await PublishProject.find({ createdBy: req.user._id });
    res.status(200).json({
      message: "Projects fetched successfully",
      data: projects,
      status: 200,
    });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const getSingleProjectController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await PublishProject.find({ projectId: id }).populate("createdBy");
    if (project.length <= 0) {
      res.status(200).json({
        message: "Invalid Id",
        data: null,
      });
      return;
    }
    res.status(200).json({
      message: "Project fetched successfully",
      data: project,
    });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const deleteProjectController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await PublishProject.deleteOne({ projectId: id });

    res.status(200).json({
      message: "Job Deleted successfully",
      data: project,
    });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const getAllPublishedProjects = async (req, res, next) => {
  try {
    const projects = await PublishProject.find({});
    res.status(200).json({
      message:"project fetched successfully",
      data:projects,
      status:200
    })
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message)
  }
}

function validateProjects(data) {
  const {
    title,
    description,
    category,
    keywords,
    projectLink,
    githubLink,
    studentName,
    universityName,
  } = data;

  const schema = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    category: joi.string().required(),
    githubLink: joi.string().allow("").optional(),
    projectLink: joi.string().allow("").optional(),
    keywords: joi.array().items(joi.string()).min(1).required(),
    studentName: joi.string().required(),
    universityName: joi.string().required(),
  });

  return schema.validate({
    title,
    description,
    category,
    keywords,
    projectLink,
    githubLink,
    studentName,
    universityName,
  });
}

module.exports = {
  publishProjectController,
  getAllProjectsController,
  getSingleProjectController,
  deleteProjectController,
  getAllPublishedProjects
};
