import { Router } from "express";
import { getJobMatches, listJobs } from "./job.controller.js";
import { authMiddleware } from "../auth/auth.middleware.js";

const router = Router();

// GET /api/job
router.get("/", authMiddleware, listJobs);

// GET /api/job/match/:resumeId
router.get("/match/:resumeId", authMiddleware, getJobMatches);

export default router;
