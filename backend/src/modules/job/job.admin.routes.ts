import { Router } from "express";
import {
	createJob,
	getAllJobs,
	getJobById,
	updateJob,
	deleteJob,
} from "./job.admin.controller.js";
import { authMiddleware } from "../auth/auth.middleware.js";
import { requireAdmin } from "../auth/auth.middleware.js";

const router = Router();

// POST /api/admin/jobs
router.post("/", authMiddleware, requireAdmin, createJob);

// GET /api/admin/jobs
router.get("/", authMiddleware, requireAdmin, getAllJobs);

// GET /api/admin/jobs/:id
router.get("/:id", authMiddleware, requireAdmin, getJobById);

// PUT /api/admin/jobs/:id
router.put("/:id", authMiddleware, requireAdmin, updateJob);

// DELETE /api/admin/jobs/:id
router.delete("/:id", authMiddleware, requireAdmin, deleteJob);

export default router;
