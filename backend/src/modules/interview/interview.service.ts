import { InterviewSession } from "./interview.model.js";
import { QUESTIONS_BY_ROLE } from "./interview.questions.js";
import { generateFeedback } from "./interview.ai.js";

export const startInterview = async (userId: string, role: string) => {
	const questions = QUESTIONS_BY_ROLE[role.toLowerCase()];

	return {
		role,
		questions,
	};
};

export const submitAnswers = async (
	userId: string,
	role: string,
	questions: string[],
	answers: string[]
) => {
	const feedback = await generateFeedback(role, questions, answers);

	const session = await InterviewSession.create({
		userId,
		role,
		questions,
		answers,
		feedback,
	});

	return session;
};
