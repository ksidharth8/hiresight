import { Request, Response } from "express";
import { Question } from "./question.model.js";
import mongoose from "mongoose";

export const addRoleQuestion = async (req: Request, res: Response) => {
	try {
		const { role, category, questionText, difficulty, expectedSkills } =
			req.body;

		if (!role) {
			return res.status(400).json({ message: "role is required" });
		}

		if (!category || !questionText || !difficulty) {
			return res.status(400).json({ message: "Invalid payload" });
		}

		const question = await Question.create({
			contextType: "ROLE",
			role,
			category,
			questionText,
			difficulty,
			expectedSkills,
		});

		res.status(201).json(question);
	} catch (err) {
		res.status(500).json({ message: "Failed to add question" });
	}
};

export const getRoleQuestions = async (req: Request, res: Response) => {
	try {
		const questions = await Question.find({
			contextType: "ROLE",
		}).sort({ createdAt: -1 });

		res.json(questions);
	} catch {
		res.status(500).json({ message: "Failed to fetch questions" });
	}
};

export const addJobQuestion = async (req: Request, res: Response) => {
	try {
		const { category, questionText, difficulty, expectedSkills } = req.body;
		if (!category || !questionText || !difficulty) {
			return res.status(400).json({ message: "Invalid payload" });
		}

		const { jobId } = req.params;
		if (
			!jobId ||
			typeof jobId !== "string" ||
			!mongoose.Types.ObjectId.isValid(jobId)
		) {
			return res.status(400).json({ message: "Invalid jobId" });
		}

		const question = await Question.create({
			contextType: "JOB",
			jobId,
			category,
			questionText,
			difficulty,
			expectedSkills,
		});

		res.status(201).json(question);
	} catch (err) {
		res.status(500).json({ message: "Failed to add question" });
	}
};

export const getJobQuestions = async (req: Request, res: Response) => {
	try {
		const { jobId } = req.params;

		if (
			!jobId ||
			typeof jobId !== "string" ||
			!mongoose.Types.ObjectId.isValid(jobId)
		) {
			return res.status(400).json({ message: "Invalid jobId" });
		}

		const query: any = { contextType: "JOB", jobId };

		const questions = await Question.find(query).sort({
			createdAt: -1,
		});

		res.json(questions);
	} catch {
		res.status(500).json({ message: "Failed to fetch questions" });
	}
};

export const getAllQuestions = async (req: Request, res: Response) => {
	try {
		const questions = await Question.find().sort({ createdAt: -1 });
		res.json(questions);
	} catch {
		res.status(500).json({ message: "Failed to fetch questions" });
	}
};

export const getQuestionById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		if (
			!id ||
			typeof id !== "string" ||
			!mongoose.Types.ObjectId.isValid(id)
		) {
			return res.status(400).json({ message: "Invalid Question ID" });
		}

		const question = await Question.findOne({
			_id: id,
		});

		if (!question) {
			return res.status(404).json({ message: "Question not found" });
		}

		res.json(question);
	} catch {
		res.status(500).json({ message: "Failed to fetch question" });
	}
};

export const updateQuestion = async (req: Request, res: Response) => {
	try {
		const question = await Question.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true },
		);

		if (!question) {
			return res.status(404).json({ message: "Question not found" });
		}

		res.json(question);
	} catch {
		res.status(500).json({ message: "Failed to update question" });
	}
};

export const deleteQuestion = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		if (
			!id ||
			typeof id !== "string" ||
			!mongoose.Types.ObjectId.isValid(id)
		) {
			return res.status(400).json({ message: "Invalid Question ID" });
		}

		const question = await Question.findOne({
			_id: id,
		});

		if (!question) {
			return res.status(404).json({ message: "Question not found" });
		}

		await question.deleteOne();

		res.json({ message: "Question deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: "Question deletion failed", error });
	}
};
