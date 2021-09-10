const express = require("express");
const Resources = require("./model");
const db = require("./../../data/dbConfig");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const resources = await Resources.getAll();
    res.status(200).json(resources);
  } catch (err) {
    next();
  }
});

router.post("/", async (req, res, next) => {
  try {
    const existingName = await db("resources")
      .where("resource_name", req.body.resource_name)
      .first();
    if (!existingName) {
      const newResource = await Resources.insert(req.body);
      res.status(201).json(newResource);
    } else {
      next({
        status: 400,
        message: "Resource name is already taken",
      });
    }
  } catch (err) {
    next();
  }
});

module.exports = router;
