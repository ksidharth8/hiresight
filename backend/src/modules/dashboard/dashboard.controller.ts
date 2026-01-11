import { Request, Response } from "express";
import { Resume } from "../resume/resume.model.js";
import { matchJobsForResume } from "../job/job.service.js";

export const dashboard = async (req: Request, res: Response) => {
	const resume = await Resume.findOne({ userId: req.userId }).sort({
		createdAt: -1,
	});

	if (!resume) {
		return res.json({ resume: null, matches: [] });
	}

	const matches = await matchJobsForResume(resume.skills || []);

	res.json({
		resume: {
			id: resume.id,
			score: resume.score,
			skills: resume.skills,
		},
		matches,
	});
};
