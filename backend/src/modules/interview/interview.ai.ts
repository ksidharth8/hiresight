// import OpenAI from "openai";
import { env } from "../../config/env.js";

const API_URL = "https://api.pawan.krd/v1/chat/completions";
const MODEL = "gpt-oss-20b";

export const generateFeedback = async (
	role: string,
	questions: string[],
	answers: string[]
) => {
	const prompt = `
You are an interview coach.

Role: ${role}

Questions and Answers:
${questions.map((q, i) => `Q: ${q}\nA: ${answers[i]}`).join("\n\n")}

Give concise feedback on:
- clarity
- technical depth
- improvement suggestions
`;

	const response = await fetch(API_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${env.PAWAN_API_KEY}`,
		},
		body: JSON.stringify({
			model: MODEL,
			temperature: 0.8,
			messages: [
				{
					role: "user",
					content: prompt,
				},
			],
		}),
	});

	if (!response.ok) {
		console.error(
			"AI request failed with status:",
			response.status,
			await response.text()
		);
		throw new Error("AI request failed");
	}

	const data = (await response.json()) as {
		choices?: Array<{ message?: { content?: string } }>;
	};

	return data.choices?.[0]?.message?.content ?? "";
};
