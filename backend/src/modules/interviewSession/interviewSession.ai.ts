import { env } from "../../config/env.js";

const API_URL = "https://api.pawan.krd/v1/chat/completions";
const MODEL = "gpt-oss-20b";

type FeedbackInput = {
	contextType: "ROLE" | "JOB";
	role?: string;
	jobId?: string;
	questions: string[];
	answers: string[];
};

export const generateFeedback = async ({
	contextType,
	role,
	jobId,
	questions,
	answers,
}: FeedbackInput) => {
	const contextLine =
		contextType === "ROLE" ? `Role: ${role}` : `Target Job ID: ${jobId}`;

	const prompt = `
You are an expert technical interviewer and evaluator.

Context:
${contextLine}

For EACH question-answer pair, evaluate on a scale of 0 to 5:
- correctness
- depth
- clarity
- relevance

Then:
1. Give short improvement notes (1-2 lines).
2. Compute a score per question (average of 4 metrics).
3. Compute an overallScore (average of all question scores).

Respond ONLY in valid JSON with this exact shape:

{
  "perQuestion": [
    {
      "correctness": number,
      "depth": number,
      "clarity": number,
      "relevance": number,
      "improvementNotes": string,
      "score": number
    }
  ],
  "overallScore": number
}

Questions and Answers:
${questions
	.map(
		(q, i) => `
Q${i + 1}: ${q}
A${i + 1}: ${answers[i]}
`,
	)
	.join("\n")}
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
			messages: [{ role: "user", content: prompt }],
		}),
	});

	if (!response.ok) {
		console.error(
			"AI request failed:",
			response.status,
			await response.text(),
		);
		throw new Error("AI request failed");
	}

	const data = (await response.json()) as any;

	const raw = data?.choices?.[0]?.message?.content;

	if (!raw) {
		throw new Error("Empty AI response");
	}

	try {
		return JSON.parse(raw);
	} catch (err) {
		console.error("Invalid JSON from AI:", raw);
		throw new Error("AI returned invalid JSON");
	}
};
