const express = require("express");
const Tasks = require("./model");

const router = express.Router();

router.get("/", (req, res, next) => {
  Tasks.find()
    .then((tasks) => {
      res.status(200).json(trueOrFalse(tasks));
    })
    .catch(next);
});

router.post("/", (req, res, next) => {
  Tasks.add(req.body)
    .then((task) => {
      res.status(201).json(trueOrFalse(task)[0]);
    })
    .catch(next);
});

const trueOrFalse = (tasks) => {
  return tasks.map((proj) => ({
    ...proj,
    task_completed: proj.task_completed ? true : false,
  }));
};

module.exports = router;
