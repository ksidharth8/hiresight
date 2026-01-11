import { Router } from "express";
import multer from "multer";
import {
	getResumeById,
	listMyResumes,
	uploadResume,
	deleteResume,
} from "./resume.controller";
import { authMiddleware } from "../auth/auth.middleware";

const router = Router();

const upload = multer({
	storage: multer.memoryStorage(),
	limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
	fileFilter: (_req, file, cb) => {
		if (file.mimetype !== "application/pdf") {
			cb(new Error("Only PDF files are allowed"));
		} else {
			cb(null, true);
		}
	},
});

// POST /api/resume/upload
router.post("/upload", authMiddleware, upload.single("resume"), uploadResume);
// GET /api/resume
router.get("/", authMiddleware, listMyResumes);
// GET /api/resume/:id
router.get("/:id", authMiddleware, getResumeById);
// DELETE /api/resume/:id
router.delete("/:id", authMiddleware, deleteResume);

export default router;
