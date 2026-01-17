import { Request, Response } from "express";
import { startInterview, submitAnswers } from "./interviewSession.service.js";
import { InterviewSession } from "./interviewSession.model.js";
import mongoose from "mongoose";
import { Job } from "../job/job.model.js";
import { Question } from "../question/question.model.js";

export const start = async (req: Request, res: Response) => {
	try {
		const { contextType, role, jobId } = req.body;

		if (!contextType) {
			return res.status(400).json({ message: "contextType is required" });
		}

		if (contextType === "ROLE" && (!role || typeof role !== "string")) {
			return res.status(400).json({ message: "valid role is required" });
		}

		if (
			contextType === "JOB" &&
			(!jobId ||
				typeof jobId !== "string" ||
				!mongoose.Types.ObjectId.isValid(jobId))
		) {
			return res.status(400).json({ message: "valid jobId is required" });
		}

		const session = await startInterview(req.userId!, {
			contextType,
			role,
			jobId,
		});

		res.json({ session });
	} catch (error) {
		return res.status(500).json({
			message: (error as Error).message || "Internal server error",
		});
	}
};

export const submit = async (req: Request, res: Response) => {
	const { sessionId, answers } = req.body;

	if (!sessionId || !answers) {
		return res.status(400).json({ message: "Invalid payload" });
	}

	const session = await submitAnswers(req.userId!, sessionId, answers);

	res.json({
		feedback: session.questions.map((q) => q.feedback),
		overallScore: session.overallScore,
	});
};

export const listInterviews = async (req: Request, res: Response) => {
	const session = await InterviewSession.find({
		userId: req.userId,
		"questions.answerText": { $exists: true, $ne: null },
	})
		.populate({ path: "jobId", select: "title company" })
		.sort({ createdAt: -1 })
		.select("contextType role jobId overallScore createdAt")
		.lean();

	res.json(session);
};

export const getInterview = async (req: Request, res: Response) => {
	const { id } = req.params;

	if (!id || typeof id !== "string" || !mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ message: "Invalid interview id" });
	}

	const session = await InterviewSession.findOne({
		_id: id,
		userId: req.userId,
	})
		.populate({ path: "jobId", select: "title company" })
		.populate({
			path: "questions.questionId",
			select: "questionText category difficulty",
		})
		.lean();

	if (!session) {
		return res.status(404).json({ message: "Not found" });
	}

	res.json(session);
};
