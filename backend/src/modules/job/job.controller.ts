import { Request, Response } from "express";
import { Resume } from "../resume/resume.model.js";
import { matchJobsForResume } from "./job.service.js";
import { Job } from "./job.model.js";
import mongoose from "mongoose";

export const listJobs = async (_req: Request, res: Response) => {
	const jobs = await Job.find(
		{},
		{
			title: 1,
			company: 1,
			description: 1,
			requiredSkills: 1,
		},
	).lean();

	res.json(jobs);
};

export const getJobById = async (req: Request, res: Response) => {
	const { jobId } = req.params;

	if (
		!jobId ||
		typeof jobId !== "string" ||
		!mongoose.Types.ObjectId.isValid(jobId)
	) {
		return res.status(400).json({ message: "Invalid job ID" });
	}

	const job = await Job.findOne({
		_id: jobId,
	});

	if (!job) {
		return res.status(404).json({ message: "Job not found" });
	}

	res.json(job);
};

export const getJobMatches = async (req: Request, res: Response) => {
	const { resumeId } = req.params;

	if (
		!resumeId ||
		typeof resumeId !== "string" ||
		!mongoose.Types.ObjectId.isValid(resumeId)
	) {
		return res.status(400).json({ message: "Invalid Resume ID" });
	}

	const resume = await Resume.findById(resumeId);
	if (!resume) {
		return res.status(404).json({ message: "Resume not found" });
	}

	const matches = await matchJobsForResume(resume.skills);

	res.json(matches);
};
