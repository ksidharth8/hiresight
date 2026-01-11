import { Request, Response } from "express";
import { Resume } from "../resume/resume.model";
import { matchJobsForResume } from "./job.service";
import { Job } from "./job.model";

export const listJobs = async (_req: Request, res: Response) => {
	const jobs = await Job.find(
		{},
		{
			title: 1,
			company: 1,
			description: 1,
			requiredSkills: 1,
		}
	).lean();

	res.json(jobs);
};

export const getJobMatches = async (req: Request, res: Response) => {
	const resumeId = req.params.resumeId;

	const resume = await Resume.findById(resumeId);
	if (!resume) {
		return res.status(404).json({ message: "Resume not found" });
	}

	const matches = await matchJobsForResume(resume.skills);

	res.json(matches);
};
