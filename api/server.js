const express = require("express");
const server = express();
const resourceRouter = require("./resource/router");
const projectRouter = require("./project/router");
const taskRouter = require("./task/router");

server.use(express.json());
server.use("/api/resources", resourceRouter);
server.use("/api/projects", projectRouter);
server.use("/api/tasks", taskRouter);

// eslint-disable-next-line
server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    custom: "Something went wrong with a router.",
    message: err.message,
    stack: err.stack,
  });
});

server.use("*", (req, res) => {
  res.json({
    message: "Something went wrong here! :(",
  });
});

module.exports = server;
