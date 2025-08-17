import express from "express";
import { sendEmail } from "../utils/sendEmail.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newUser = new User({ username, email, password, verified: false });
    await newUser.save();

    const verifyUrl = `http://localhost:5002/api/auth/verify/${newUser._id}`;

    await sendEmail(
      email,
      "Verify your email address",
      `Click here to verify: ${verifyUrl}`
    );

    res.status(201).json({ message: "User created. Check your email!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
});

// LOGIN (username + password)
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // JWT token for 24h
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/verify/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("User not found");

    user.verified = true;
    await user.save();

    res.send("User verified successfully! You can now login.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Verification failed");
  }
});

export default router;
