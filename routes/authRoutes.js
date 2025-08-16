import express from "express";
import { sendEmail } from "../utils/sendEmail.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newUser = new User({ username, email, password, verified: false });
    await newUser.save();

    const verifyUrl = `http://localhost:5002/api/auth/verify/${newUser._id}`;

    await sendEmail(email, "Verify your account", `Click here: ${verifyUrl}`);

    res.status(201).json({ message: "User created. Check your email!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
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
