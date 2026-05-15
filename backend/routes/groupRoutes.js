const express = require("express");
const Group = require("../models/GroupModel");
const Message = require("../models/ChatModel");
const { protect, isAdmin } = require("../middleware/authMiddleware");

const groupRouter = express.Router();

//Create a new group (any authenticated user)
groupRouter.post("/", protect, async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Group name is required" });
    }
    const group = await Group.create({
      name: name.trim(),
      description: description || "",
      admin: req.user._id,
      members: [req.user._id],
    });
    const populatedGroup = await Group.findById(group._id)
      .populate("admin", "username email")
      .populate("members", "username email");
    res.status(201).json({ populatedGroup });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

//get all groups
groupRouter.get("/", protect, async (req, res) => {
  try {
    const groups = await Group.find()
      .populate("admin", "username email")
      .populate("members", "username email");
    res.json(groups);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Join group
groupRouter.post("/:groupId/join", protect, async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    if (group.members.includes(req.user._id)) {
      return res.status(400).json({
        message: "Already a member of this group",
      });
    }
    group.members.push(req.user._id);
    await group.save();
    res.json({ message: "Successfully joined this group" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//leave a group
groupRouter.post("/:groupId/leave", protect, async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    if (!group.members.includes(req.user._id)) {
      return res.status(400).json({ message: "Not a member of this group" });
    }
    group.members = group.members.filter((memberId) => {
      return memberId.toString() !== req.user._id.toString();
    });
    await group.save();
    res.json({ message: "Successfully left the group" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//delete a group and all its messages (admin of the group only)
groupRouter.delete("/:groupId", protect, async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    // Only the group's admin or site admin can delete
    const userInfo = req.user;
    if (
      group.admin.toString() !== userInfo._id.toString() &&
      !userInfo.isAdmin
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this group" });
    }
    // Delete all messages belonging to this group
    await Message.deleteMany({ group: req.params.groupId });
    // Delete the group itself
    await Group.findByIdAndDelete(req.params.groupId);
    res.json({ message: "Group and all its messages deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = groupRouter;
