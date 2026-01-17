import { Router } from "express";
import { getJobById, getJobMatches, listJobs } from "./job.controller.js";
import { authMiddleware } from "../auth/auth.middleware.js";

const router = Router();

// GET /api/jobs
router.get("/", authMiddleware, listJobs);

// GET /api/jobs/:jobId
router.get("/:jobId", authMiddleware, getJobById);

// GET /api/jobs/match/:resumeId
router.get("/match/:resumeId", authMiddleware, getJobMatches);

export default router;
