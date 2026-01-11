import { Router } from "express";
import {
	getInterview,
	listInterviews,
	start,
	submit,
} from "./interview.controller";
import { authMiddleware } from "../auth/auth.middleware";

const router = Router();

// POST /api/interview/start
router.post("/start", authMiddleware, start);
// POST /api/interview/submit
router.post("/submit", authMiddleware, submit);
// GET /api/interview
router.get("/", authMiddleware, listInterviews);
// GET /api/interview/:id
router.get("/:id", authMiddleware, getInterview);

export default router;
