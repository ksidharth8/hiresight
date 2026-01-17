import { Request, Response } from "express";
import { Job } from "./job.model.js";
import mongoose from "mongoose";

export const createJob = async (req: Request, res: Response) => {
	try {
		const { title, company, level, requiredSkills, optionalSkills } =
			req.body;

		if (!title || !company || !level || !requiredSkills?.length) {
			return res.status(400).json({ message: "Invalid payload" });
		}

		const job = await Job.create({
			title,
			company,
			level,
			requiredSkills,
			optionalSkills: optionalSkills || [],
		});

		res.status(201).json(job);
	} catch (err) {
		res.status(500).json({ message: "Failed to create job" });
	}
};

export const getAllJobs = async (_: Request, res: Response) => {
	try {
		const jobs = await Job.find().sort({ createdAt: -1 });
		res.json(jobs);
	} catch {
		res.status(500).json({ message: "Failed to fetch jobs" });
	}
};

export const getJobById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		if (
			!id ||
			typeof id !== "string" ||
			!mongoose.Types.ObjectId.isValid(id)
		) {
			return res.status(400).json({ message: "Invalid Job ID" });
		}

		const job = await Job.findOne({
			_id: id,
		});

		if (!job) {
			return res.status(404).json({ message: "Job not found" });
		}

		res.json(job);
	} catch {
		res.status(500).json({ message: "Failed to fetch job" });
	}
};

export const updateJob = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		if (
			!id ||
			typeof id !== "string" ||
			!mongoose.Types.ObjectId.isValid(id)
		) {
			return res.status(400).json({ message: "Invalid Job ID" });
		}

		const job = await Job.findOne({
			_id: id,
		});

		if (!job) {
			return res.status(404).json({ message: "Job not found" });
		}

		await job.updateOne(req.body, { new: true });

		if (!job) {
			return res.status(404).json({ message: "Job not found" });
		}

		res.json(job);
	} catch {
		res.status(500).json({ message: "Failed to update job" });
	}
};

export const deleteJob = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		if (
			!id ||
			typeof id !== "string" ||
			!mongoose.Types.ObjectId.isValid(id)
		) {
			return res.status(400).json({ message: "Invalid Job ID" });
		}

		const job = await Job.findOne({
			_id: id,
		});

		if (!job) {
			return res.status(404).json({ message: "Job not found" });
		}

		await job.deleteOne();

		res.json({ message: "Job deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: "Job deletion failed", error });
	}
};
