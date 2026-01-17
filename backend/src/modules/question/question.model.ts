import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
	{
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

		category: {
			type: String,
			enum: [
				"DSA",
				"Core-CS",
				"Role-Specific",
				"Behavioral",
				"System-Design",
			],
			required: true,
		},

		questionText: {
			type: String,
			required: true,
		},

		difficulty: {
			type: Number,
			enum: [1, 2, 3],
			required: true,
		},

		expectedSkills: {
			type: [String],
			default: [],
		},
	},
	{ timestamps: true },
);

export const Question = mongoose.model("Question", QuestionSchema);
