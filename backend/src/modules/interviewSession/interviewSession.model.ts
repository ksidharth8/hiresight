import mongoose from "mongoose";

const InterviewSessionSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
		},

		contextType: {
			type: String,
			enum: ["ROLE", "JOB"],
			required: true,
		},

		role: {
			type: String,
			enum: [
				"Frontend Developer",
				"Backend Developer",
				"Fullstack Developer",
				"Software Engineer",
				"Cloud Engineer",
				"App Developer",
				"AI/ML Engineer",
			],
			required: function () {
				return this.contextType === "ROLE";
			},
		},

		jobId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Job",
			required: function () {
				return this.contextType === "JOB";
			},
		},

		questions: [
			{
				questionId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Question",
					required: true,
				},
				answerText: String,
				feedback: {
					correctness: Number,
					depth: Number,
					clarity: Number,
					relevance: Number,
					improvementNotes: String,
				},
				score: Number,
			},
		],

		overallScore: Number,
	},
	{ timestamps: true },
);

export const InterviewSession = mongoose.model(
	"InterviewSession",
	InterviewSessionSchema,
);
