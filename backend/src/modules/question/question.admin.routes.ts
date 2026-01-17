import { Router } from "express";
import {
	getRoleQuestions,
	addRoleQuestion,
	getJobQuestions,
	addJobQuestion,
	getAllQuestions,
	getQuestionById,
	updateQuestion,
	deleteQuestion,
} from "./question.admin.controller.js";
import { authMiddleware } from "../auth/auth.middleware.js";
import { requireAdmin } from "../auth/auth.middleware.js";

const router = Router();

// GET /api/admin/questions/all
router.get("/all", authMiddleware, requireAdmin, getAllQuestions);

// GET /api/admin/questions/:jobId
router.get("/job/:jobId", authMiddleware, requireAdmin, getJobQuestions);

// GET /api/admin/questions/
router.get("/", authMiddleware, requireAdmin, getRoleQuestions);

// GET /api/admin/questions/:id
router.get("/:id", authMiddleware, requireAdmin, getQuestionById);

// PUT /api/admin/questions/:id
router.put("/:id", authMiddleware, requireAdmin, updateQuestion);

// DELETE /api/admin/questions/:id
router.delete("/:id", authMiddleware, requireAdmin, deleteQuestion);

// POST /api/admin/questions/
router.post("/", authMiddleware, requireAdmin, addRoleQuestion);

// POST /api/admin/questions/:jobId
router.post("/job/:jobId", authMiddleware, requireAdmin, addJobQuestion);

export default router;
