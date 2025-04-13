const express = require("express");
const Group = require("../models/GroupModel");
const groupRouter = express.Router();

// Create a new router

groupRouter.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;
    const group = await Group.create({
      name,
      description,
      //   admin: req.user._id,
      //   members: [req.user._id],
    });
    const populatedGroup = await group
      .findById(group._id)
      .populate("admin", "username email")
      .populate("members", "username email");
    res.status(201).json({ populatedGroup });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = groupRouter;
