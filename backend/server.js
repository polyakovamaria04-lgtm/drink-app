import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import drinkRoutes from "./routes/drinkRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config({ path: "./.env" });

const app = express();
const allowedOrigin = process.env.FRONTEND_URL;

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      const allowedOrigins = [process.env.FRONTEND_URL, ""];
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  }),
);
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
