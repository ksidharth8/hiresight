import { Request, Response } from "express";
import { startInterview, submitAnswers } from "./interview.service";
import { InterviewSession } from "./interview.model";

export const start = async (req: Request, res: Response) => {
	const { role } = req.body;

	const session = await startInterview(req.userId!, role);

	res.json({ session });
};

export const submit = async (req: Request, res: Response) => {
	const { role, questions, answers } = req.body;

	const session = await submitAnswers(req.userId!, role, questions, answers);

	res.json({
		feedback: session.feedback,
	});
};

export const listInterviews = async (req: Request, res: Response) => {
	const sessions = await InterviewSession.find({ userId: req.userId })
		.sort({ createdAt: -1 })
		.select("role createdAt")
		.lean();

	res.json(sessions);
};

export const getInterview = async (req: Request, res: Response) => {
	const session = await InterviewSession.findOne({
		_id: req.params.id,
		userId: req.userId,
	}).lean();

	if (!session) {
		return res.status(404).json({ message: "Not found" });
	}

	res.json(session);
};
