import { Router } from "express";
import { getJobMatches, listJobs } from "./job.controller";
import { authMiddleware } from "../auth/auth.middleware";

const router = Router();

// GET /api/job
router.get("/", authMiddleware, listJobs);

// GET /api/job/match/:resumeId
router.get("/match/:resumeId", authMiddleware, getJobMatches);

export default router;
