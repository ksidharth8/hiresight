import { InterviewSession } from "./interviewSession.model.js";
import { Question } from "../question/question.model.js";
import { generateFeedback } from "./interviewSession.ai.js";
import { json } from "stream/consumers";

export const startInterview = async (
	userId: string,
	params: {
		contextType: "ROLE" | "JOB";
		role?: string;
		jobId?: string;
	},
) => {
	const { contextType, role, jobId } = params;

	// Fetch questions based on context
	const questions = await Question.find({
		contextType,
		...(contextType === "ROLE" ? { role } : {}),
		...(contextType === "JOB" ? { jobId } : {}),
	})
		.sort({ difficulty: 1 })
		.limit(5)
		.lean();

	if (questions.length === 0) {
		throw new Error("No questions available for the selected context");
	}

	// Create session immediately (important)
	const session = await InterviewSession.create({
		userId,
		contextType,
		role,
		jobId,
		questions: questions.map((q) => ({
			questionId: q._id,
		})),
	});

	return {
		sessionId: session._id,
		contextType,
		role,
		jobId,
		questions: questions.map((q) => ({
			questionId: q._id,
			questionText: q.questionText,
			category: q.category,
			difficulty: q.difficulty,
		})),
	};
};

export const submitAnswers = async (
	userId: string,
	sessionId: string,
	answers: string[],
) => {
	const session = await InterviewSession.findOne({
		_id: sessionId,
		userId,
	}).populate("questions.questionId");

	if (!session) {
		throw new Error("Session not found");
	}

	if (answers.length !== session.questions.length) {
		throw new Error("Answers count mismatch");
	}

	// Prepare data for AI
	const questionsText = session.questions.map(
		(q: any) => q.questionId.questionText,
	);

	const feedback = await generateFeedback({
		contextType: session.contextType,
		role: session.role?.toString(),
		jobId: session.jobId?.toString(),
		questions: questionsText,
		answers,
	});

	// Attach feedback per question
	session.questions.forEach((q: any, idx: number) => {
		q.answerText = answers[idx];
		q.feedback = feedback.perQuestion[idx];
		q.score = feedback.perQuestion[idx].score;
	});

	session.overallScore = feedback.overallScore;

	await session.save();

	return session;
};
