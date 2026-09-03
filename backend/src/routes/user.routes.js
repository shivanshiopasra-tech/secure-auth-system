import express from "express";

import protect from "../middleware/auth.middleware.js";
import { getProfile } from "../controllers/user.controller.js";

const router = express.Router();

// Test route
router.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "User routes are working",
  });
});

// Get logged-in user profile
router.get("/profile", protect, getProfile);

export default router;