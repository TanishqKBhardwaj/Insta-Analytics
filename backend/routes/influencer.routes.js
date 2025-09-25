import express from "express";
import {
  getInfluencerProfile,refreshInfluencerData,registerInfluencerProfile,
  checkInfluencerProfile
} from "../controllers/influencer.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * @route   GET /api/influencers/:username
 * @desc    Get influencer profile (basic info + analytics)
 */
router.post("/register/:username", authenticate,registerInfluencerProfile);
router.get("/:username",authenticate,getInfluencerProfile);
router.get("/check/:username",authenticate,checkInfluencerProfile)

/**
 * @route   POST /api/influencers/:username/refresh
 * @desc    Trigger scraper to refresh influencer data
 */
router.post("/:influencer/refresh",authenticate, refreshInfluencerData);

export default router;


