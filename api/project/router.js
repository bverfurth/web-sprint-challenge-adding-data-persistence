const express = require("express");
const Projects = require("./model");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const projects = await Projects.getAll();
    const convertedProjects = projects.map((project) => {
      return {
        ...project,
        project_completed: Boolean(project.project_completed),
      };
    });
    res.status(200).json(convertedProjects);
  } catch (err) {
    next();
  }
});

router.post("/", async (req, res, next) => {
  try {
    if (!req.body.project_name) {
      next({
        status: 400,
        message: "Project name is required",
      });
    } else {
      const newProject = await Projects.insert(req.body);
      res.status(201).json({
        ...newProject,
        project_completed: Boolean(newProject.project_completed),
      });
    }
  } catch (err) {
    next();
  }
});

module.exports = router;
