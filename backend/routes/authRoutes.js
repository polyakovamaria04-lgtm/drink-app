import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/current", authMiddleware, async (req, res) => {
  try {
    res.status(200).json({
      user: req.user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, birthdate } = req.body;

    if (!name || !birthdate || !email || !password) {
      return res.status(400).json({ message: "Please fill in all the fields" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "A user with this email address already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      birthdate,
    });

    res.status(201).json({
      message: "The user has been successfully registered!",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        birthdate: newUser.birthdate,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id },
      globalThis.process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      },
    );

    res.status(200).json({
      message: "Successfully logged in!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        birthdate: user.birthdate,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/logout", authMiddleware, async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, { token: null });
  res.status(204).send();
});

export default router;
