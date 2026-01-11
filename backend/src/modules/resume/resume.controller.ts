import { Request, Response } from "express";
import { parseResumePDF } from "./resume.parser.js";
import { extractSkills } from "./skill.extractor.js";
import { scoreResume } from "./resume.scorer.js";
import { saveResume } from "./resume.service.js";
import cloudinary from "../../config/cloudinary.js";
import { Resume } from "./resume.model.js";
import { Readable } from "stream";
import mongoose from "mongoose";

declare global {
	namespace Express {
		interface Request {
			userId?: string;
		}
	}
}

export const uploadResume = async (req: Request, res: Response) => {
	try {
		if (!req.userId) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		const file = req.file;
		if (!file) {
			return res.status(400).json({ message: "No file uploaded" });
		}

		const originalName = file.originalname.replace(/\.pdf$/i, "");
		const uploadResult: any = await new Promise((resolve, reject) => {
			const uploadStream = cloudinary.uploader.upload_stream(
				{
					resource_type: "image",
					folder: "resumes",
					format: "pdf",
					public_id: originalName,
					use_filename: true,
					unique_filename: false,
				},
				(error, result) => {
					if (error) reject(error);
					else resolve(result);
				}
			);

			Readable.from(file.buffer).pipe(uploadStream);
		});

		const extractedText = await parseResumePDF(file.buffer);
		const skills = extractSkills(extractedText);
		const score = scoreResume(extractedText, skills);

		const resume = await saveResume({
			userId: req.userId,
			cloudinaryId: uploadResult.public_id,
			resumeUrl: uploadResult.secure_url,
			extractedText,
			skills,
			score,
		});

		return res.json({
			resumeId: resume._id.toString(),
			score,
			skills,
			resumeUrl: resume.resumeUrl,
		});
	} catch (error) {
		console.error("Resume upload error:", error);
		return res.status(500).json({
			message: "Resume upload failed",
		});
	}
};

export const listMyResumes = async (req: Request, res: Response) => {
	const resumes = await Resume.find({ userId: req.userId }).sort({
		createdAt: -1,
	});

	res.json(resumes);
};

export const getResumeById = async (req: Request, res: Response) => {
	const { id } = req.params;

	if (!id || typeof id !== "string" || !mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ message: "Invalid resume ID" });
	}

	const resume = await Resume.findOne({
		_id: req.params.id,
		userId: req.userId,
	});

	if (!resume) {
		return res.status(404).json({ message: "Resume not found" });
	}

	res.json(resume);
};

export const deleteResume = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		if (!id || typeof id !== "string" || !mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).json({ message: "Invalid resume ID" });
		}

		const resume = await Resume.findOne({
			_id: req.params.id,
			userId: req.userId,
		});

		if (!resume) {
			return res.status(404).json({ message: "Resume not found" });
		}

		await cloudinary.uploader.destroy(resume.cloudinaryId!, {
			resource_type: "raw",
		});

		await resume.deleteOne();

		res.json({ message: "Resume deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: "Resume deletion failed", error });
	}
};
