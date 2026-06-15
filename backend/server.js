import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import drinkRoutes from "./routes/drinkRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config({ path: "./.env" });

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/drinks", drinkRoutes);

app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.json({ message: "Server works" });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
