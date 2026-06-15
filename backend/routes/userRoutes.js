import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import multer from "multer";
import {
  getCurrentUser,
  updateProfile,
} from "../controllers/userController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/current", authMiddleware, getCurrentUser);

router.patch("/update", authMiddleware, upload.single("avatar"), updateProfile);

export default router;
