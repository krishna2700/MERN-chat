const express = require("express");
const Message = require("../models/ChatModel");
const { protect, isAdmin } = require("../middleware/authMiddleware");

const messageRouter = express.Router();

//send message
messageRouter.post("/", protect, async (req, res) => {
  try {
    const { content, groupId } = req.body;
    const message = await Message.create({
      sender: req.user._id,
      content,
      group: groupId,
    });
    const populatedMessage = await Message.findById(message._id).populate(
      "sender",
      "username email"
    );
    res.json(populatedMessage);
  } catch (error) {
    res.status(400).json({ message: error.Message });
  }
});

//get messages for a group
messageRouter.get("/:groupId", protect, async (req, res) => {
  try {
    const messages = await Message.find({ group: req.params.groupId })
      .populate("sender", "username email")
      .sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(400).json({ message: error.Message });
  }
});

// DELETE a single message by ID (sender or admin only)
messageRouter.delete("/:messageId", protect, async (req, res) => {
  try {
    const message = await Message.findById(req.params.messageId);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    const isSender = message.sender.toString() === req.user._id.toString();
    const admin = req.user.isAdmin;

    if (!isSender && !admin) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this message" });
    }

    await Message.findByIdAndDelete(req.params.messageId);
    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE all messages in a group (admin only)
messageRouter.delete("/group/:groupId", protect, isAdmin, async (req, res) => {
  try {
    const result = await Message.deleteMany({ group: req.params.groupId });
    res.json({
      message: "All messages in the group deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = messageRouter;
