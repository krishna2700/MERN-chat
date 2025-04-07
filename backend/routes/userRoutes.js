const express = require("express");
const userRouter = express.Router();
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

// register route
userRouter.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //  Check if user already exists
    const userExists = await userRouter.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Create new user
    const user = await User.create({
      username,
      email,
      password,
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
